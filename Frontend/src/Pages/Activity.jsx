import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "../State/Order/Action";
import { calculateProfit } from "../utils/calculateProfit";

const Activity = () => {
  const dispatch = useDispatch();
  
  const tradesData = useSelector((state) => state.order.orders || []);
  
  const [trades, setTrades] = useState([]);

  const jwt = localStorage.getItem("jwt"); 
  useEffect(() => {
    // Fetch trades from the backend
    dispatch(getAllOrdersForUser(jwt));
  }, [dispatch, jwt]);

  console.log("data", tradesData);

  useEffect(() => {
    if (tradesData.length > 0) {
      setTrades(tradesData);
    }
  }, [tradesData]);

  // Calculate total profit/loss
  const totalProfitLoss = trades.reduce((acc, trade) => acc + trade.profitLoss, 0);
  const totalProfitLossMonth = totalProfitLoss * 4;
  const totalProfitLossYear = totalProfitLoss * 52;

  return (
    <div className="p-6 bg-black text-white">
      {/* Total Profit/Loss Summary */}
      <div className="grid grid-cols-3 gap-4 mb-20 mt-20 h-40">
        <div className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm">Today's Profit/Loss</h3>
          <p className={`text-lg font-semibold ${totalProfitLoss >= 0 ? "text-[#09b6a2]" : "text-red-500"}`}>
            ${totalProfitLoss.toFixed(2)}
          </p>
        </div>

        <div className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm">This Month's Profit/Loss</h3>
          <p className={`text-lg font-semibold ${totalProfitLossMonth >= 0 ? "text-[#09b6a2]" : "text-red-500"}`}>
            ${totalProfitLossMonth.toFixed(2)}
          </p>
        </div>

        <div className="bg-[#0a0a0a] p-4 rounded-xl border border-gray-700">
          <h3 className="text-gray-400 text-sm">This Year's Profit/Loss</h3>
          <p className={`text-lg font-semibold ${totalProfitLossYear >= 0 ? "text-[#09b6a2]" : "text-red-500"}`}>
            ${totalProfitLossYear.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Trading History Table */}
      <h1 className="mb-4 ml-2 text-green-400 text-2xl">Trading History</h1>
      <div className="overflow-x-auto">
        <table className="w-full mr-3 ml-3 border-collapse">
          <thead>
            <tr className="bg-[rgb(10,10,10)]">
              <th className="p-2 border-b border-gray-700 text-left">Date & Time</th>
              <th className="p-2 border-b border-gray-700 text-left">Trading Coin</th>
              <th className="p-2 border-b border-gray-700 text-left">Buy Price</th>
              <th className="p-2 border-b border-gray-700 text-left">Selling Price</th>
              <th className="p-2 border-b border-gray-700 text-left">Order Type</th>
              <th className="p-2 border-b border-gray-700 text-left">Profit/Loss</th>
              <th className="p-2 border-b border-gray-700 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
          {trades.map((trade, index) => (
  <tr key={index} className="hover:bg-[#111] transition-all duration-200 hover:scale-[1.02] h-[60px]">
    {/* Timestamp */}
    <td className="p-3 border-b border-gray-700">{trade?.timestamp || '-'}</td>

    {/* Coin Name */}
    <td className="p-3 border-b border-gray-700">{trade?.orderItem?.coin?.name || '-'}</td>

    {/* Buy Price */}
    <td className="p-3 border-b border-gray-700">
      ${trade?.orderItem?.buyPrice?.toFixed(6) ?? '-'}
    </td>

    {/* Selling Price */}
    <td className="p-3 border-b border-gray-700">
      {trade?.orderItem?.sellPrice > 0
        ? `$${trade?.orderItem?.sellPrice?.toFixed(6) ?? '-'}`
        : '-'}
    </td>

    {/* Order Type */}
    <td className="p-3 border-b border-gray-700">
      <span className={`${trade?.orderType === "BUY" ? "text-[#09b6a2]" : "text-red-500"} font-semibold`}>
        {trade?.orderType || '-'}
      </span>
    </td>

    {/* Profit/Loss */}
    <td className="p-3 border-b border-gray-700">
  {trade?.orderItem?.sellPrice > 0 ? (
    <span className={`${trade?.profitLoss >= 0 ? "text-[#09b6a2]" : "text-red-500"}`}>
      {calculateProfit(trade) || '-'}
    </span>
  ) : '-'}
</td>


    {/* Value */}
    <td className="p-3 border-b border-gray-700">${trade?.orderItem?.coin?.current_price ?? '-'}</td>
  </tr>
))}

          


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activity;
