import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToWatchlist } from '../State/Watchlist/Action'; // Import the action
import StockChart from '../components/StockChart/StockChart';
import TradingForm from '../components/TradingForm/TradingForm';

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
        <div className="bg-black text-white min-h-screen">
            {/* Header Section */}
            <div className="flex items-center justify-between p-4 pt-30">
                <div className="flex items-center gap-2">
                    {/* Display coin details */}
                    <div className="text-xl font-bold">{coin?.name}</div>
                    <span className="text-gray-400">{coin?.symbol?.toUpperCase()}</span>
                    <span className="text-green-400">
                        ${coin?.current_price?.toLocaleString()}
                    </span>
                    <span
                        className={`${
                            coin?.price_change_percentage_24h < 0
                                ? 'text-red-500'
                                : 'text-green-400'
                        }`}
                    >
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button 
                        className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800"
                        onClick={handleAddToWatchlist}
                    >
                        Watchlist
                    </button>
                    <button 
                        className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Trade
                    </button>
                </div>
            </div>

            {/* Day Range Buttons */}
            <div className="flex justify-center mb-4 space-x-2">
                {[1, 30, 180, 360].map((value) => (
                    <button
                        key={value}
                        onClick={() => setDays(value)}
                        className={`px-4 py-2 rounded-full border ${
                            days === value
                                ? 'bg-green-500 text-black border-green-500'
                                : 'text-white border-white hover:bg-gray-700'
                        }`}
                    >
                        {value === 1 ? '1D' : `${value}D`}
                    </button>
                ))}
            </div>

            {/* Chart Section */}
            <div className="p-4">
                <StockChart data={{ id: coin?.id, days }} />
            </div>

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
