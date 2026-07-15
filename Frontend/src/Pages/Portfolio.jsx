import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAssets } from "../State/Asset/Action";
import { BriefcaseBusiness, Coins, Gem, LineChart, ShieldCheck } from "lucide-react";
import { formatCurrency } from "../utils/currency";

const formatNumber = (value, digits = 6) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  return number.toFixed(digits);
};

const Portfolio = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUserAssets(jwt));
    }
  }, [dispatch, jwt]);

  const userAsset = useSelector((state) => state.asset.userAsset || []);

  const calculateChangePercent = (buyPrice, currentPrice) => {
    const buy = Number(buyPrice);
    const current = Number(currentPrice);
    if (!Number.isFinite(buy) || !Number.isFinite(current) || buy === 0) {
      return null;
    }
    return ((current - buy) / buy) * 100;
  };

  const totalValue = userAsset.reduce(
    (sum, asset) =>
      sum + (Number(asset.quantity) || 0) * (Number(asset.coin?.current_price) || 0),
    0
  );

  const totalCost = userAsset.reduce(
    (sum, asset) =>
      sum + (Number(asset.quantity) || 0) * (Number(asset.buyPrice) || 0),
    0
  );

  const pnl = totalValue - totalCost;
  const pnlPercent = totalCost > 0 ? (pnl / totalCost) * 100 : 0;

  const statCards = [
    {
      label: "Portfolio value",
      value: formatCurrency(totalValue, 4),
      icon: BriefcaseBusiness,
      tone: "green",
    },
    {
      label: "Open positions",
      value: userAsset.length,
      icon: Coins,
      tone: "blue",
    },
    {
      label: "Unrealized P/L",
      value: formatCurrency(pnl, 4),
      sub: `${pnlPercent >= 0 ? "+" : ""}${pnlPercent.toFixed(2)}%`,
      icon: LineChart,
      tone: pnl >= 0 ? "green" : "red",
    },
  ];

  return (
    <div className="finance-shell min-h-screen text-white">
      <main className="finance-container">
        <section className="finance-hero">
          <div>
            <p className="finance-kicker">Portfolio</p>
            <h1>Asset Intelligence</h1>
            <span>Track allocations, current value, and live unrealized performance.</span>
          </div>
          <div className="finance-live-badge">
            <span className="status-pulse" />
            Live holdings
          </div>
        </section>

        <section className="finance-stat-grid">
          {statCards.map(({ label, value, sub, icon: Icon, tone }) => (
            <article className={`finance-stat-card finance-tone-${tone}`} key={label}>
              <span className="finance-stat-icon">
                <Icon size={22} />
              </span>
              <div>
                <span>{label}</span>
                <strong>{value}</strong>
                {sub && <small>{sub}</small>}
              </div>
            </article>
          ))}
        </section>

        <section className="finance-table-panel">
          <div className="finance-section-header">
            <div>
              <p className="finance-kicker">Positions</p>
              <h2>Holdings Overview</h2>
            </div>
            <div className="finance-security-chip">
              <ShieldCheck size={16} />
              Synced
            </div>
          </div>

          <div className="finance-table-wrap">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Buy Price</th>
                  <th>Current Price</th>
                  <th>Quantity</th>
                  <th>Change</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {userAsset.length > 0 ? (
                  userAsset.map((asset, index) => {
                    const change = calculateChangePercent(
                      asset.buyPrice,
                      asset.coin?.current_price
                    );
                    const isPositive = Number(change) >= 0;
                    const value =
                      (Number(asset.quantity) || 0) *
                      (Number(asset.coin?.current_price) || 0);

                    return (
                      <tr key={asset.id || index}>
                        <td>
                          <div className="finance-asset-cell">
                            {asset.coin?.image ? (
                              <img src={asset.coin.image} alt={asset.coin?.name || "Coin"} />
                            ) : (
                              <span className="finance-coin-fallback">
                                <Gem size={18} />
                              </span>
                            )}
                            <div>
                              <strong>{asset.coin?.name || "-"}</strong>
                              <span>{asset.coin?.symbol?.toUpperCase() || "SPOT"}</span>
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(asset.buyPrice, 6)}</td>
                        <td>{formatCurrency(asset.coin?.current_price, 6)}</td>
                        <td>{formatNumber(asset.quantity)}</td>
                        <td>
                          <span className={isPositive ? "finance-change-up" : "finance-change-down"}>
                            {change === null
                              ? "--"
                              : `${isPositive ? "+" : ""}${change.toFixed(2)}%`}
                          </span>
                        </td>
                        <td className="finance-value-cell">{formatCurrency(value, 6)}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="finance-empty-state">
                      No assets available
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

export default Portfolio;
