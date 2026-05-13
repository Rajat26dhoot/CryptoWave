import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "../State/Order/Action";
import { calculateProfit } from "../utils/calculateProfit";
import { Activity as ActivityIcon, CalendarDays, Clock3, History, TrendingUp } from "lucide-react";

const safeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const formatCurrency = (value, digits = 2) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
  }).format(number);
};

const Activity = () => {
  const dispatch = useDispatch();

  const tradesData = useSelector((state) => state.order.orders || []);
  const [trades, setTrades] = useState([]);

  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      dispatch(getAllOrdersForUser(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    setTrades(Array.isArray(tradesData) ? tradesData : []);
  }, [tradesData]);

  const realizedProfit = trades.reduce(
    (acc, trade) => acc + safeNumber(trade?.profitLoss),
    0
  );
  const monthlyProjection = realizedProfit * 4;
  const yearlyProjection = realizedProfit * 52;

  const summaryCards = [
    {
      label: "Today's Profit/Loss",
      value: realizedProfit,
      icon: TrendingUp,
    },
    {
      label: "This Month's Projection",
      value: monthlyProjection,
      icon: CalendarDays,
    },
    {
      label: "This Year's Projection",
      value: yearlyProjection,
      icon: ActivityIcon,
    },
  ];

  return (
    <div className="finance-shell min-h-screen text-white">
      <main className="finance-container">
        <section className="finance-hero">
          <div>
            <p className="finance-kicker">Activity</p>
            <h1>Execution Ledger</h1>
            <span>Review orders, realized outcomes, and projected trading performance.</span>
          </div>
          <div className="finance-live-badge">
            <span className="status-pulse" />
            Order sync active
          </div>
        </section>

        <section className="finance-stat-grid">
          {summaryCards.map(({ label, value, icon: Icon }) => {
            const isPositive = value >= 0;
            return (
              <article
                className={`finance-stat-card ${
                  isPositive ? "finance-tone-green" : "finance-tone-red"
                }`}
                key={label}
              >
                <span className="finance-stat-icon">
                  <Icon size={22} />
                </span>
                <div>
                  <span>{label}</span>
                  <strong>{formatCurrency(value)}</strong>
                  <small>{isPositive ? "Positive momentum" : "Risk drawdown"}</small>
                </div>
              </article>
            );
          })}
        </section>

        <section className="finance-table-panel">
          <div className="finance-section-header">
            <div>
              <p className="finance-kicker">Trading History</p>
              <h2>Order Timeline</h2>
            </div>
            <div className="finance-security-chip">
              <History size={16} />
              {trades.length} orders
            </div>
          </div>

          <div className="finance-table-wrap">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Trading Coin</th>
                  <th>Buy Price</th>
                  <th>Selling Price</th>
                  <th>Order Type</th>
                  <th>Profit/Loss</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {trades.length > 0 ? (
                  trades.map((trade, index) => {
                    const isBuy = trade?.orderType === "BUY";
                    const hasSellPrice = Number(trade?.orderItem?.sellPrice) > 0;
                    const profit = safeNumber(trade?.profitLoss);

                    return (
                      <tr key={trade?.id || index}>
                        <td>
                          <div className="finance-time-cell">
                            <Clock3 size={16} />
                            <span>{trade?.timestamp || "-"}</span>
                          </div>
                        </td>
                        <td>
                          <div className="finance-asset-cell">
                            {trade?.orderItem?.coin?.image ? (
                              <img
                                src={trade.orderItem.coin.image}
                                alt={trade?.orderItem?.coin?.name || "Coin"}
                              />
                            ) : (
                              <span className="finance-coin-fallback">
                                <ActivityIcon size={18} />
                              </span>
                            )}
                            <div>
                              <strong>{trade?.orderItem?.coin?.name || "-"}</strong>
                              <span>{trade?.orderItem?.coin?.symbol?.toUpperCase() || "SPOT"}</span>
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(trade?.orderItem?.buyPrice, 6)}</td>
                        <td>
                          {hasSellPrice
                            ? formatCurrency(trade?.orderItem?.sellPrice, 6)
                            : "--"}
                        </td>
                        <td>
                          <span className={isBuy ? "finance-order-buy" : "finance-order-sell"}>
                            {trade?.orderType || "-"}
                          </span>
                        </td>
                        <td>
                          {hasSellPrice ? (
                            <span
                              className={
                                profit >= 0 ? "finance-change-up" : "finance-change-down"
                              }
                            >
                              {calculateProfit(trade) || "--"}
                            </span>
                          ) : (
                            "--"
                          )}
                        </td>
                        <td className="finance-value-cell">
                          {formatCurrency(trade?.orderItem?.coin?.current_price, 6)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="finance-empty-state">
                      No trading activity yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Activity;
