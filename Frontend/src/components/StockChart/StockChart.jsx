import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgCharts } from "ag-charts-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "../../State/Coin/Action";

const StockChart = ({ data }) => {
  const [options, setOptions] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ Prevent double fetching
  const dispatch = useDispatch();
  const chartRef = useRef(null);

  const chartData = useSelector((state) => state.coin.marketChart.data);
  const lastFetched = useRef({ id: null, days: null }); // ✅ Store last fetched values

  // ✅ Fetch only if data changes and not already fetched
  const fetchData = useCallback(() => {
    if (
      data.id &&
      data.days &&
      !isLoading &&
      (lastFetched.current.id !== data.id || lastFetched.current.days !== data.days)
    ) {
      setIsLoading(true);
      dispatch(fetchMarketChart({ coinId: data.id, days: data.days }))
        .finally(() => setIsLoading(false));

      // ✅ Update last fetched values
      lastFetched.current = { id: data.id, days: data.days };
    }
  }, [data.id, data.days, dispatch, isLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (chartData?.length) {
      const formattedData = chartData.map((item) => ({
        date: new Date(item[0]),
        price: item[1] ?? 0,
      }));

      setOptions({
        data: formattedData,
        series: [
          {
            type: "line",
            xKey: "date",
            yKey: "price",
            stroke: "#00ff00",
            marker: {
              size: 5,
              fill: "#00ff00",
            },
            title: "Price",
          },
        ],
        axes: [
          {
            type: "time",
            position: "bottom",
            label: {
              color: "#ccc",
            },
          },
          {
            type: "number",
            position: "left",
            label: {
              color: "#ccc",
            },
          },
        ],
        legend: {
          enabled: true,
          position: "bottom",
          item: {
            label: {
              color: "#fff",
            },
          },
        },
        background: {
          fill: "#000",
        },
      });
    }
  }, [chartData, data.id]);

  // ✅ Toggle Full Screen
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      chartRef.current?.requestFullscreen?.();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullScreen(false);
    }
  };

  // ✅ Close full screen on Escape key or exit
  useEffect(() => {
    const handleExitFullScreen = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleExitFullScreen);
    return () => {
      document.removeEventListener("fullscreenchange", handleExitFullScreen);
    };
  }, []);

  return (
    <div
      ref={chartRef}
      className={`w-full ${isFullScreen ? "h-screen" : "h-[400px]"} 
      bg-black text-white border border-green-400 rounded-lg p-4 relative flex flex-col`}
      onDoubleClick={handleFullScreen}
    >
      <h2 className="text-lg font-bold mb-4">Stock Chart</h2>

      {/* ✅ Chart Container */}
      <div className="flex-grow w-full h-full">
        {options ? (
          <AgCharts options={options} className="w-full h-full" />
        ) : isLoading ? (
          <div className="text-gray-400 flex items-center justify-center h-full">
            Loading chart data...
          </div>
        ) : (
          <div className="text-gray-400 flex items-center justify-center h-full">
            No data available.
          </div>
        )}
      </div>

      {/* ✅ Full-Screen Button */}
      <button
        onClick={handleFullScreen}
        className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md transition z-10"
      >
        {isFullScreen ? "Exit Full Screen" : "Full Screen"}
      </button>
    </div>
  );
};

export default StockChart;
