import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserAssets } from "../State/Asset/Action";

const Portfolio = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUserAssets(jwt));
    }
  }, [dispatch, jwt]);

  const userAsset = useSelector((state) => state.asset.userAsset || []);

  console.log("an", userAsset);

  // Function to calculate Change (%)
  const calculateChangePercent = (buyPrice, currentPrice) => {
    if (!buyPrice || !currentPrice) return "-"; // Handle invalid or missing data
    return (((currentPrice - buyPrice) / buyPrice) * 100).toFixed(2);
  };

  return (
    <div className="overflow-x-auto px-4">
      <div className="px-8 mb-20 mt-25">
        <h1 className="mb-4 ml-2 text-green-400 text-4xl font-bold">
          Portfolio
        </h1>
        <table className="w-full mx-auto border-collapse text-white">
          <thead>
            <tr className="bg-black">
              <th className="p-2 border-b border-[#09b6a2] text-left w-[200px]">
                Coin
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[150px]">
                Buy Price
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[150px]">
                Current Price
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[150px]">
                Quantity
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[150px]">
                Change (%)
              </th>
              <th className="p-2 border-b border-[#09b6a2] text-left w-[150px]">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userAsset.length > 0 ? (
              userAsset.map((asset, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#0f0f0f] transition-all duration-200 hover:scale-[1.02] h-[60px]"
                >
                  <td className="p-3 border-b border-[#09b6a2] align-middle">
                    {asset.coin?.name || "-"}
                  </td>
                  <td className="p-3 border-b border-[#09b6a2] align-middle">
                    ${asset.buyPrice?.toLocaleString() || "-"}
                  </td>
                  <td className="p-3 border-b border-[#09b6a2] align-middle">
                    ${asset.coin?.current_price?.toLocaleString() || "-"}
                  </td>
                  <td className="p-3 border-b border-[#09b6a2] align-middle">
                    {asset.quantity?.toFixed(6) || "-"}
                  </td>
                  <td className="p-3 border-b border-[#09b6a2] align-middle">
                    <span
                      className={`${
                        calculateChangePercent(
                          asset.buyPrice,
                          asset.coin?.current_price
                        ) >= 0
                          ? "text-[#09b6a2]"
                          : "text-red-500"
                      } font-semibold`}
                    >
                      {calculateChangePercent(
                        asset.buyPrice,
                        asset.coin?.current_price
                      ) || "-"}%
                    </span>
                  </td>
                  <td className="p-3 border-b border-[#09b6a2] align-middle">
                    ${(
                      (asset.quantity || 0) *
                      (asset.coin?.current_price || 0)
                    ).toFixed(6) || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-4 text-gray-400 border-b border-[#09b6a2]"
                >
                  No assets available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
