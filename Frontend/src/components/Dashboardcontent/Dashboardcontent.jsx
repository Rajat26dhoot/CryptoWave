import { useEffect, useState } from 'react';
import StockChart from '../StockChart/StockChart';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinList } from '../../State/Coin/Action';
import { useNavigate } from 'react-router-dom';

const Dashboardcontent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoinId, setSelectedCoinId] = useState('bitcoin');
  const [selectedDays, setSelectedDays] = useState(30);

  const { coinList = [] } = useSelector((state) => state.coin);

  useEffect(() => {
    dispatch(getCoinList(currentPage));
  }, [dispatch, currentPage]);

  const coinArray = Array.isArray(coinList) 
    ? coinList 
    : Object.values(coinList || {});

  // Handle page change
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      const newPage = Math.max(prevPage + direction, 1);
      dispatch(getCoinList(newPage));
      return newPage;
    });
  };

  // Handle row click (to update chart)
  const handleRowClick = (id) => {
    setSelectedCoinId(id);
  };

  // Handle day range change
  const handleDayChange = (days) => {
    setSelectedDays(days);
  };

  return (
    <div className="flex min-h-screen bg-black text-white ml-20 mt-20 mr-10 border border-white">
      {/* Left Panel */}
      <div className="w-1/2 p-4 overflow-y-auto h-[1000px]">
        {/* Arrow buttons for pagination */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handlePageChange(-1)}
            className={`px-4 py-2 border rounded-full ${
              currentPage === 1
                ? 'text-gray-500 border-gray-500 cursor-not-allowed'
                : 'text-white border-white hover:bg-gray-700'
            }`}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          <span className="text-gray-400">Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 border rounded-full text-white border-white hover:bg-gray-700"
          >
            ▶
          </button>
        </div>

        {/* Table */}
        <table className="w-full border-collapse text-sm border rounded-lg">
          <thead>
            <tr className="text-green-400">
              <th className="p-3 text-left">COIN</th>
              <th className="p-3 text-left">SYMBOL</th>
              <th className="p-3 text-left">VOLUME</th>
              <th className="p-3 text-left">MARKET CAP</th>
              <th className="p-3 text-left">24H</th>
              <th className="p-3 text-left">PRICE</th>
            </tr>
          </thead>
          <tbody>
            {coinArray.length > 0 ? (
              coinArray.map((coin) => (
                <tr
                  key={coin.id}
                  onClick={() => handleRowClick(coin.id)}
                  className={`border-b border-gray-700 cursor-pointer ${
                    selectedCoinId === coin.id ? 'bg-gray-800' : 'hover:bg-gray-700'
                  }`}
                >
                  <td className="p-3">
                    <img
                      src={coin.image}
                      className="w-6 h-6 inline-block mr-2"
                      alt={coin.name}
                    />
                    {coin.name}
                  </td>
                  <td className="p-3">{coin.symbol.toUpperCase()}</td>
                  <td className="p-3">{coin.total_volume?.toLocaleString()}</td>
                  <td className="p-3">{coin.market_cap?.toLocaleString()}</td>
                  <td
                    className={`p-3 ${
                      coin.price_change_percentage_24h < 0
                        ? 'text-red-500'
                        : 'text-green-400'
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className="p-3">${coin.current_price?.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No coins available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-4 border-l border-white">
        {/* Day Range Buttons */}
        <div className="flex justify-center mb-4 space-x-2">
          {[1, 30, 180, 360].map((days) => (
            <button
              key={days}
              onClick={() => handleDayChange(days)}
              className={`px-4 py-2 rounded-full border ${
                selectedDays === days
                  ? 'bg-green-500 text-black border-green-500'
                  : 'text-white border-white hover:bg-gray-700'
              }`}
            >
              {days === 1 ? '1D' : `${days}D`}
            </button>
          ))}
        </div>

        {/* Chart */}
        <StockChart data={{ id: selectedCoinId, days: selectedDays }} />

        {/* Trade Button */}
        <button
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
          onClick={() =>
            navigate('/trade', {
              state: { coin: coinArray.find((c) => c.id === selectedCoinId) },
            })
          }
        >
          Trade
        </button>
      </div>
    </div>
  );
};

export default Dashboardcontent;
