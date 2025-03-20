import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserWatchlist, addItemToWatchlist } from "../State/Watchlist/Action"; // Import the action


const Watchlist = () => {
  const dispatch = useDispatch();

  

  useEffect(() => {
    const jwt = localStorage.getItem('jwt'); 
    if (jwt) {
        dispatch(getUserWatchlist(jwt));
    }
}, [dispatch]);

const watchlist = useSelector((state) => state.watchlist?.items || []);

  console.log("last", watchlist);

  const handleRemove = (coinId) => {
    const jwt = localStorage.getItem('jwt'); 
    if (jwt) {
        dispatch(addItemToWatchlist({ coinId, jwt })); 
    }
};


  return (
    <div className="overflow-x-auto px-4">
    
      <div className="px-8 mb-20 mt-25">
        <h1 className="mb-4 ml-2 text-green-400 text-4xl font-bold">
          Watchlist
        </h1>
        <table className="w-full mx-auto border-collapse text-white">
          <thead>
            <tr className="bg-black">
              <th className="p-2 border-b border-[#09b6a2] text-left w-[200px]">
                Coin
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[150px]">
                Symbol
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[200px]">
                Volume
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[200px]">
                Market Cap
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[150px]">
                24H
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[150px]">
                Price
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[100px]">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {watchlist.length > 0 ? (
              watchlist.map((coin, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#0f0f0f] transition-all duration-200 hover:scale-[1.02] h-[60px]"
                >
                  <td className="p-3 border-b border-[#09b6a2]">
                    {coin.name || "-"}
                  </td>
                  <td className="p-3 border-b border-[#09b6a2]">
                    {coin.symbol || "-"}
                  </td>
                  <td className="p-3 border-b border-[#09b6a2]">
                    {coin.total_volume?.toLocaleString() || "-"}
                  </td>
                  <td className="p-3 border-b border-[#09b6a2]">
                    {coin.market_cap?.toLocaleString() || "-"}
                  </td>
                  <td className="p-3 border-b border-[#09b6a2]">
                    <span
                      className={`${
                        coin.price_change_percentage_24h >= 0
                          ? "text-[#09b6a2]"
                          : "text-red-500"
                      } font-semibold`}
                    >
                      {coin.price_change_percentage_24h?.toFixed(2) || "-"}%
                    </span>
                  </td>
                  <td className="p-3 border-b border-[#09b6a2]">
                    ${coin.current_price?.toLocaleString() || "-"}
                  </td>
                  <td className="p-3 border-b border-[#09b6a2] text-center">
                    <button onClick={() => handleRemove(coin.id)}>
                      <img
                        src="https://cdn.create.vista.com/api/media/small/470881556/stock-vector-bookmark-blue-gradient-vector-icon"
                        alt="Remove"
                        className="w-8 h-8 hover:scale-110 transition mr-5"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-4 text-gray-400 border-b border-[#09b6a2]"
                >
                  No assets in watchlist
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
   
    </div>
  );
};

export default Watchlist;
