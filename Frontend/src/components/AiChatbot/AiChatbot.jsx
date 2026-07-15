import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Bot,
  ChevronDown,
  ExternalLink,
  LoaderCircle,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

const quickPrompts = [
  'Summarize the market',
  'How is my wallet?',
  'Review my portfolio',
  'What can I do here?',
];

const normalizeList = (value) => (Array.isArray(value) ? value : Object.values(value || {}));

const compactNumber = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return '--';

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(number);
};

const getPageName = (pathname) => {
  if (pathname === '/') return 'Dashboard';
  return pathname
    .replace('/', '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const buildMarketInsight = (coins) => {
  if (!coins.length) {
    return 'Market data is still loading. Once the coin table is available, I can summarize top movers, volume, and price direction from the live list.';
  }

  const sortedByCap = [...coins].sort(
    (a, b) => (Number(b.market_cap) || 0) - (Number(a.market_cap) || 0)
  );
  const sortedByChange = [...coins].sort(
    (a, b) =>
      (Number(b.price_change_percentage_24h) || -Infinity) -
      (Number(a.price_change_percentage_24h) || -Infinity)
  );
  const gainers = coins.filter((coin) => Number(coin.price_change_percentage_24h) >= 0);
  const totalVolume = coins.reduce((sum, coin) => sum + (Number(coin.total_volume) || 0), 0);
  const leader = sortedByCap[0];
  const topMover = sortedByChange[0];

  return [
    `${leader?.name || 'The leading asset'} is currently the largest visible market by cap at ${formatCurrency(leader?.current_price)}.`,
    `${gainers.length}/${coins.length} listed assets are green over 24h, with ${topMover?.name || 'the top mover'} showing ${Number(topMover?.price_change_percentage_24h || 0).toFixed(2)}%.`,
    `Visible 24h volume across this page is about ${compactNumber(totalVolume)}. Treat this as a market snapshot, not financial advice.`,
  ].join(' ');
};

const buildPortfolioInsight = (assets) => {
  if (!assets.length) {
    return 'I do not see any portfolio assets loaded right now. After you buy assets or refresh Portfolio, I can compare holdings, value, and unrealized P/L.';
  }

  const totalValue = assets.reduce(
    (sum, asset) =>
      sum + (Number(asset.quantity) || 0) * (Number(asset.coin?.current_price) || 0),
    0
  );
  const totalCost = assets.reduce(
    (sum, asset) => sum + (Number(asset.quantity) || 0) * (Number(asset.buyPrice) || 0),
    0
  );
  const pnl = totalValue - totalCost;
  const bestHolding = [...assets].sort(
    (a, b) =>
      (Number(b.quantity) || 0) * (Number(b.coin?.current_price) || 0) -
      (Number(a.quantity) || 0) * (Number(a.coin?.current_price) || 0)
  )[0];

  return [
    `Your visible portfolio value is ${formatCurrency(totalValue, 4)} across ${assets.length} position${assets.length === 1 ? '' : 's'}.`,
    `Unrealized P/L is ${formatCurrency(pnl, 4)}${totalCost > 0 ? ` (${pnl >= 0 ? '+' : ''}${((pnl / totalCost) * 100).toFixed(2)}%)` : ''}.`,
    bestHolding?.coin?.name
      ? `${bestHolding.coin.name} is the largest visible holding by current value.`
      : 'I can give sharper allocation notes once each holding has live coin details.',
  ].join(' ');
};

const buildWalletInsight = (wallet, transactions) => {
  const balance = Number(wallet?.balance) || 0;
  const txCount = transactions.length;
  const lastTx = transactions[0];

  return [
    `Your INR wallet balance is ${formatCurrency(balance)}.`,
    txCount
      ? `I can see ${txCount} wallet transaction${txCount === 1 ? '' : 's'} loaded${lastTx?.type ? `, with the latest marked ${String(lastTx.type).replaceAll('_', ' ').toLowerCase()}` : ''}.`
      : 'No wallet transactions are loaded in the current session yet.',
    'For safety, I can explain balances and flows, but I will not ask for passwords, OTPs, or private keys.',
  ].join(' ');
};

const buildNavigationHelp = (pageName) =>
  `You are on ${pageName}. I can help you read the market dashboard, understand wallet activity, review portfolio positions, or decide which CryptoWave page to open next.`;

const createReply = ({ message, context }) => {
  const text = message.toLowerCase();

  if (text.includes('wallet') || text.includes('balance') || text.includes('transaction')) {
    return buildWalletInsight(context.wallet, context.transactions);
  }

  if (
    text.includes('portfolio') ||
    text.includes('holding') ||
    text.includes('asset') ||
    text.includes('p/l') ||
    text.includes('profit') ||
    text.includes('loss')
  ) {
    return buildPortfolioInsight(context.assets);
  }

  if (
    text.includes('market') ||
    text.includes('coin') ||
    text.includes('price') ||
    text.includes('token') ||
    text.includes('crypto') ||
    text.includes('volume')
  ) {
    return buildMarketInsight(context.coins);
  }

  if (text.includes('risk') || text.includes('safe') || text.includes('advice')) {
    return 'I can help explain market and account data, but I do not provide guaranteed investment advice. A safer workflow is to check liquidity, 24h movement, position size, wallet balance, and only trade amounts you are prepared to risk.';
  }

  if (text.includes('where') || text.includes('page') || text.includes('help') || text.includes('do here')) {
    return buildNavigationHelp(context.pageName);
  }

  return `${buildNavigationHelp(context.pageName)} ${buildMarketInsight(context.coins)}`;
};

const AiChatbot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi, I am Wave AI. Ask me about markets, wallet balance, portfolio holdings, or what to do on this page.',
    },
  ]);

  const { coinList = [] } = useSelector((state) => state.coin);
  const { userWallet = {}, transaction = [] } = useSelector((state) => state.wallet);
  const { userAsset = [] } = useSelector((state) => state.asset);

  const context = useMemo(
    () => ({
      coins: normalizeList(coinList),
      wallet: userWallet || {},
      transactions: normalizeList(transaction),
      assets: normalizeList(userAsset),
      pageName: getPageName(location.pathname),
    }),
    [coinList, location.pathname, transaction, userAsset, userWallet]
  );

  const sendMessage = (value = input) => {
    const trimmed = value.trim();
    if (!trimmed || isThinking) return;

    setMessages((current) => [...current, { role: 'user', text: trimmed }]);
    setInput('');
    setIsThinking(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: createReply({ message: trimmed, context }),
        },
      ]);
      setIsThinking(false);
    }, 420);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const openChat = () => {
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 120);
  };

  return (
    <div className={`ai-chatbot ${isOpen ? 'is-open' : ''}`}>
      {isOpen && (
        <section className="ai-chat-panel" aria-label="Wave AI chatbot">
          <header className="ai-chat-header">
            <div className="ai-chat-title">
              <span className="ai-chat-mark">
                <Sparkles size={18} />
              </span>
              <div>
                <span>Wave AI</span>
                <small>Context-aware assistant</small>
              </div>
            </div>
            <button
              className="ai-chat-icon-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              title="Close chatbot"
            >
              <X size={18} />
            </button>
          </header>

          <div className="ai-chat-context">
            <span className="status-pulse" />
            <span>{context.pageName}</span>
            <button onClick={() => navigate('/trade')}>
              Trade <ExternalLink size={13} />
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div className={`ai-message ai-message-${message.role}`} key={`${message.role}-${index}`}>
                <span className="ai-message-avatar">
                  {message.role === 'assistant' ? <Bot size={15} /> : <User size={15} />}
                </span>
                <p>{message.text}</p>
              </div>
            ))}
            {isThinking && (
              <div className="ai-message ai-message-assistant">
                <span className="ai-message-avatar">
                  <LoaderCircle className="ai-spin" size={15} />
                </span>
                <p>Reading your CryptoWave context...</p>
              </div>
            )}
          </div>

          <div className="ai-chat-prompts">
            {quickPrompts.map((prompt) => (
              <button key={prompt} onClick={() => sendMessage(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <form className="ai-chat-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask Wave AI..."
              aria-label="Ask Wave AI"
            />
            <button type="submit" aria-label="Send message" title="Send message">
              <Send size={17} />
            </button>
          </form>
        </section>
      )}

      <button
        className="ai-chat-fab"
        onClick={isOpen ? () => setIsOpen(false) : openChat}
        aria-label={isOpen ? 'Minimize Wave AI' : 'Open Wave AI'}
        title={isOpen ? 'Minimize Wave AI' : 'Open Wave AI'}
      >
        {isOpen ? <ChevronDown size={22} /> : <Bot size={23} />}
      </button>
    </div>
  );
};

export default AiChatbot;
