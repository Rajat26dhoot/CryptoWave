import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addItemToWatchlist, getUserWatchlist } from "../State/Watchlist/Action";
import { BellRing, BookmarkX, Eye, Gem, LineChart, Radar, Star } from "lucide-react";
import { formatCompactCurrency, formatCurrency } from "../utils/currency";

const formatCompact = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);
};

const Watchlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserWatchlist(jwt));
    }
  }, [dispatch]);

  const watchlist = useSelector((state) => state.watchlist?.items || []);

  const handleRemove = (coinId) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(addItemToWatchlist({ coinId, jwt }));
    }
  };

  const gainers = watchlist.filter(
    (coin) => Number(coin.price_change_percentage_24h) >= 0
  ).length;

  const totalMarketCap = watchlist.reduce(
    (sum, coin) => sum + (Number(coin.market_cap) || 0),
    0
  );

  return (
    <div className="finance-shell min-h-screen text-white">
      <main className="finance-container">
        <section className="finance-hero">
          <div>
            <p className="finance-kicker">Watchlist</p>
            <h1>Signal Radar</h1>
            <span>Monitor favorite assets, volatility, and liquidity in one refined view.</span>
          </div>
          <div className="finance-live-badge">
            <span className="status-pulse" />
            Price alerts ready
          </div>
        </section>

        <section className="finance-stat-grid">
          <article className="finance-stat-card finance-tone-green">
            <span className="finance-stat-icon">
              <Eye size={22} />
            </span>
            <div>
              <span>Tracked assets</span>
              <strong>{watchlist.length}</strong>
            </div>
          </article>
          <article className="finance-stat-card finance-tone-blue">
            <span className="finance-stat-icon">
              <Radar size={22} />
            </span>
            <div>
              <span>Advancing today</span>
              <strong>{gainers}/{watchlist.length || 0}</strong>
            </div>
          </article>
          <article className="finance-stat-card finance-tone-gold">
            <span className="finance-stat-icon">
              <LineChart size={22} />
            </span>
            <div>
              <span>Combined market cap</span>
              <strong>{formatCompactCurrency(totalMarketCap)}</strong>
            </div>
          </article>
        </section>

        <section className="finance-table-panel">
          <div className="finance-section-header">
            <div>
              <p className="finance-kicker">Favorites</p>
              <h2>Market Watch</h2>
            </div>
            <div className="finance-security-chip">
              <BellRing size={16} />
              Smart alerts
            </div>
          </div>

          <div className="finance-table-wrap">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Symbol</th>
                  <th>Volume</th>
                  <th>Market Cap</th>
                  <th>24h</th>
                  <th>Price</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.length > 0 ? (
                  watchlist.map((coin, index) => {
                    const isPositive = Number(coin.price_change_percentage_24h) >= 0;

                    return (
                      <tr key={coin.id || index}>
                        <td>
                          <div className="finance-asset-cell">
                            {coin.image ? (
                              <img src={coin.image} alt={coin.name || "Coin"} />
                            ) : (
                              <span className="finance-coin-fallback">
                                <Gem size={18} />
                              </span>
                            )}
                            <div>
                              <strong>{coin.name || "-"}</strong>
                              <span>Watched pair</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="finance-symbol-pill">
                            {coin.symbol?.toUpperCase() || "-"}
                          </span>
                        </td>
                        <td>{formatCompact(coin.total_volume)}</td>
                        <td>{formatCompact(coin.market_cap)}</td>
                        <td>
                          <span className={isPositive ? "finance-change-up" : "finance-change-down"}>
                            {isPositive ? "+" : ""}
                            {coin.price_change_percentage_24h?.toFixed(2) ?? "--"}%
                          </span>
                        </td>
                        <td className="finance-value-cell">
                          {formatCurrency(coin.current_price)}
                        </td>
                        <td>
                          <button
                            className="finance-remove-button"
                            onClick={() => handleRemove(coin.id)}
                            aria-label={`Remove ${coin.name || "coin"} from watchlist`}
                            title="Remove from watchlist"
                          >
                            <BookmarkX size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="finance-empty-state">
                      <Star size={22} />
                      No assets in watchlist
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

export default Watchlist;
