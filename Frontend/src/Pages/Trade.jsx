import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToWatchlist } from '../State/Watchlist/Action'; // Import the action
import StockChart from '../components/StockChart/StockChart';
import TradingForm from '../components/TradingForm/TradingForm';
import { formatCurrency } from '../utils/currency';

const Trade = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [days, setDays] = useState(30); // Default to 30 days
    
    const dispatch = useDispatch();
    const location = useLocation();
    const { coin = {} } = location.state || {}; // Default to empty object if no data

    const handleAddToWatchlist = () => {
        const jwt = localStorage.getItem('jwt'); // Get token from local storage
        if (jwt && coin?.id) {
            dispatch(addItemToWatchlist({ coinId: coin.id, jwt }));
        } else {
            console.log("User not authenticated or missing coinId");
        }
    };

    return (
        <div className="trade-page min-h-screen text-white">
            <main className="trade-page-container">
                <section className="trade-header-panel">
                    <div className="trade-coin-meta">
                        <div className="trade-coin-name">{coin?.name || "Select coin"}</div>
                        <span className="trade-symbol">{coin?.symbol?.toUpperCase() || "SPOT"}</span>
                        <span className="trade-price">
                            {formatCurrency(coin?.current_price)}
                        </span>
                        <span
                            className={
                                coin?.price_change_percentage_24h < 0
                                    ? 'trade-change trade-change-down'
                                    : 'trade-change trade-change-up'
                            }
                        >
                            {coin?.price_change_percentage_24h === undefined
                                ? "--"
                                : `${coin.price_change_percentage_24h > 0 ? "+" : ""}${coin.price_change_percentage_24h.toFixed(2)}%`}
                        </span>
                    </div>

                    <div className="trade-actions">
                        <button
                            className="trade-secondary-button"
                            onClick={handleAddToWatchlist}
                        >
                            Watchlist
                        </button>
                        <button
                            className="trade-primary-button"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Trade
                        </button>
                    </div>
                </section>

                <section className="trade-range-row">
                    {[1, 30, 180, 360].map((value) => (
                        <button
                            key={value}
                            onClick={() => setDays(value)}
                            className={days === value ? 'active' : ''}
                        >
                            {value === 1 ? '1D' : `${value}D`}
                        </button>
                    ))}
                </section>

                <section className="trade-chart-wrap">
                    <StockChart data={{ id: coin?.id, days, name: coin?.name }} />
                </section>
            </main>

            {/* Modal */}
            <TradingForm 
                coinId={coin?.id}
                coinName={coin?.name}
                currentPrice={coin?.current_price}
                priceChangePercentage24h={coin?.price_change_percentage_24h}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Trade;
