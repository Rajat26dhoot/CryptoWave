import { useEffect, useState, useCallback } from 'react';
import StockChart from '../StockChart/StockChart';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinList } from '../../State/Coin/Action';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  Gem,
  Layers3,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { formatCompactCurrency, formatCurrency } from '../../utils/currency';

const formatCompact = (value, options = {}) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return '--';
  }

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
};

const Dashboardcontent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoinId, setSelectedCoinId] = useState('bitcoin');
  const [selectedDays, setSelectedDays] = useState(30);

  const { coinList = [] } = useSelector((state) => state.coin);

  const debouncedGetCoinList = useCallback(() => {
    const handler = setTimeout(() => {
      dispatch(getCoinList(currentPage));
    }, 500);

    return () => clearTimeout(handler);
  }, [currentPage, dispatch]);

  useEffect(() => {
    debouncedGetCoinList();
  }, [debouncedGetCoinList]);

  const coinArray = Array.isArray(coinList)
    ? coinList
    : Object.values(coinList || {});

  const selectedCoin =
    coinArray.find((coin) => coin.id === selectedCoinId) || coinArray[0];

  const totalVolume = coinArray.reduce(
    (sum, coin) => sum + (Number(coin.total_volume) || 0),
    0
  );

  const totalMarketCap = coinArray.reduce(
    (sum, coin) => sum + (Number(coin.market_cap) || 0),
    0
  );

  const gainers = coinArray.filter(
    (coin) => Number(coin.price_change_percentage_24h) >= 0
  ).length;

  const statCards = [
    {
      label: 'Total market cap',
      value: formatCompactCurrency(totalMarketCap),
      icon: Layers3,
      accent: 'emerald',
    },
    {
      label: '24h volume',
      value: formatCompactCurrency(totalVolume),
      icon: BarChart3,
      accent: 'cyan',
    },
    {
      label: 'Advancing assets',
      value: `${gainers}/${coinArray.length || 0}`,
      icon: Sparkles,
      accent: 'gold',
    },
  ];

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => Math.max(prevPage + direction, 1));
  };

  const handleRowClick = (id) => {
    setSelectedCoinId(id);
  };

  const handleDayChange = (days) => {
    setSelectedDays(days);
  };

  return (
    <main className="mx-auto grid w-full max-w-[1720px] grid-cols-1 gap-5 px-4 pb-16 pt-7 text-white sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:px-8">
      <section className="glass-panel market-panel">
        <div className="panel-toolbar">
          <div>
            <p className="section-kicker">Markets</p>
            <h2 className="section-title">Top Tokens</h2>
          </div>
          <div className="page-controls">
            <button
              onClick={() => handlePageChange(-1)}
              className="icon-button"
              disabled={currentPage === 1}
              aria-label="Previous page"
              title="Previous page"
            >
              <ArrowLeft size={18} />
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => handlePageChange(1)}
              className="icon-button"
              aria-label="Next page"
              title="Next page"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="market-search">
          <Search size={17} />
          <span>Search markets, symbols, pairs</span>
          <kbd>/</kbd>
        </div>

        <div className="stat-grid">
          {statCards.map(({ label, value, icon: Icon, accent }) => (
            <div className={`stat-card stat-card-${accent}`} key={label}>
              <div className="stat-icon">
                <Icon size={18} />
              </div>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="market-table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Symbol</th>
                <th>Volume</th>
                <th>Market Cap</th>
                <th>24h</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {coinArray.length > 0 ? (
                coinArray.map((coin) => {
                  const isPositive =
                    Number(coin.price_change_percentage_24h) >= 0;
                  const isSelected = selectedCoinId === coin.id;

                  return (
                    <tr
                      key={coin.id}
                      onClick={() => handleRowClick(coin.id)}
                      className={isSelected ? 'selected-row' : ''}
                    >
                      <td>
                        <div className="asset-cell">
                          <img src={coin.image} alt={coin.name} />
                          <div>
                            <strong>{coin.name}</strong>
                            <span>INR spot</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="symbol-pill">
                          {coin.symbol?.toUpperCase()}
                        </span>
                      </td>
                      <td>{formatCompact(coin.total_volume)}</td>
                      <td>{formatCompact(coin.market_cap)}</td>
                      <td>
                        <span className={isPositive ? 'change-up' : 'change-down'}>
                          {isPositive ? '+' : ''}
                          {coin.price_change_percentage_24h?.toFixed(2) ?? '--'}%
                        </span>
                      </td>
                      <td className="price-cell">
                        {formatCurrency(coin.current_price)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">
                    Loading market data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="trade-stack">
        <section className="glass-panel selected-asset-panel">
          <div className="selected-asset-top">
            <div className="asset-cell">
              {selectedCoin?.image ? (
                <img src={selectedCoin.image} alt={selectedCoin.name} />
              ) : (
                <span className="coin-fallback">
                  <Gem size={18} />
                </span>
              )}
              <div>
                <span className="section-kicker">Selected Pair</span>
                <strong>{selectedCoin?.name || 'Bitcoin'} / INR</strong>
              </div>
            </div>
            <span
              className={
                Number(selectedCoin?.price_change_percentage_24h) >= 0
                  ? 'change-up'
                  : 'change-down'
              }
            >
              {Number(selectedCoin?.price_change_percentage_24h) >= 0 ? '+' : ''}
              {selectedCoin?.price_change_percentage_24h?.toFixed(2) ?? '--'}%
            </span>
          </div>

          <div className="selected-price-row">
            <div>
              <span>Last price</span>
              <strong>{formatCurrency(selectedCoin?.current_price)}</strong>
            </div>
            <button
              className="primary-trade-button"
              onClick={() =>
                navigate('/trade', {
                  state: { coin: selectedCoin },
                })
              }
            >
              <Wallet size={18} />
              Trade
              <ArrowUpRight size={17} />
            </button>
          </div>
        </section>

        <section className="glass-panel chart-panel">
          <div className="range-row">
            <div>
              <p className="section-kicker">Price Action</p>
              <h2 className="section-title">Live Market Chart</h2>
            </div>
            <div className="range-tabs">
              {[1, 30, 180, 360].map((days) => (
                <button
                  key={days}
                  onClick={() => handleDayChange(days)}
                  className={selectedDays === days ? 'active' : ''}
                >
                  {days === 1 ? '1D' : `${days}D`}
                </button>
              ))}
            </div>
          </div>

          <StockChart
            data={{
              id: selectedCoin?.id || selectedCoinId,
              days: selectedDays,
              name: selectedCoin?.name,
              price: selectedCoin?.current_price,
            }}
          />
        </section>

        <section className="glass-panel execution-panel">
          <div className="execution-item">
            <ShieldCheck size={18} />
            <div>
              <strong>Protected execution</strong>
              <span>Risk checks and authenticated wallet routing.</span>
            </div>
            <ChevronRight size={18} />
          </div>
          <div className="execution-item">
            <LineChart size={18} />
            <div>
              <strong>Deep liquidity</strong>
              <span>Aggregated volume snapshot from the market list.</span>
            </div>
            <ChevronRight size={18} />
          </div>
        </section>
      </aside>
    </main>
  );
};

export default Dashboardcontent;
