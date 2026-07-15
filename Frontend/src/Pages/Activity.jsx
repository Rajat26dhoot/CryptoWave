import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "../State/Order/Action";
import { calculateProfit } from "../utils/calculateProfit";
import { Activity as ActivityIcon, Clock3, History } from "lucide-react";
import { formatCurrency } from "../utils/currency";

const safeNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const getTradeProfit = (trade) => {
  if (trade?.orderType !== "SELL") return 0;

  const quantity = safeNumber(trade?.orderItem?.quantity);
  const buyPrice = safeNumber(trade?.orderItem?.buyPrice);
  const sellPrice = safeNumber(trade?.orderItem?.sellPrice);

  if (quantity <= 0 || buyPrice <= 0 || sellPrice <= 0) return 0;
  return (sellPrice - buyPrice) * quantity;
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
                    const profit = getTradeProfit(trade);

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
                          {formatCurrency(trade?.price, 6)}
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
