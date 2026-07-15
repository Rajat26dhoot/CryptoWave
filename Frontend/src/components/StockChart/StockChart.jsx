import { useState, useEffect, useRef, useCallback } from "react";
import { AgCharts } from "ag-charts-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "../../State/Coin/Action";
import { Expand, Minimize2, Radio } from "lucide-react";
import { formatCurrency } from "../../utils/currency";

const StockChart = ({ data }) => {
  const [options, setOptions] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const chartRef = useRef(null);

  const chartData = useSelector((state) => state.coin.marketChart.data);
  const lastFetched = useRef({ id: null, days: null });

  const fetchData = useCallback(() => {
    if (
      data.id &&
      data.days &&
      !isLoading &&
      (lastFetched.current.id !== data.id ||
        lastFetched.current.days !== data.days)
    ) {
      setIsLoading(true);
      dispatch(fetchMarketChart({ coinId: data.id, days: data.days })).finally(
        () => setIsLoading(false)
      );

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
        padding: {
          top: 18,
          right: 24,
          bottom: 12,
          left: 12,
        },
        series: [
          {
            type: "line",
            xKey: "date",
            yKey: "price",
            title: data.name || "Price",
            stroke: "#00e676",
            strokeWidth: 3,
            interpolation: {
              type: "smooth",
            },
            marker: {
              enabled: false,
              size: 5,
              fill: "#00e676",
              stroke: "#07110b",
              strokeWidth: 2,
            },
            highlightStyle: {
              item: {
                fill: "#f7d046",
                stroke: "#0df28a",
                strokeWidth: 3,
              },
              series: {
                strokeWidth: 4,
              },
            },
            tooltip: {
              renderer: ({ datum }) => ({
                title: new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(datum.date),
                content: formatCurrency(datum.price, datum.price > 100 ? 0 : 4),
              }),
            },
          },
        ],
        axes: [
          {
            type: "time",
            position: "bottom",
            line: {
              enabled: false,
            },
            tick: {
              enabled: false,
            },
            label: {
              color: "#8e9aab",
              fontSize: 12,
            },
          },
          {
            type: "number",
            position: "right",
            line: {
              enabled: false,
            },
            tick: {
              enabled: false,
            },
            label: {
              color: "#8e9aab",
              fontSize: 12,
              formatter: ({ value }) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 2,
                }).format(value),
            },
            gridLine: {
              style: [
                {
                  stroke: "rgba(255,255,255,0.09)",
                  lineDash: [4, 8],
                },
              ],
            },
          },
        ],
        legend: {
          enabled: false,
        },
        background: {
          fill: "transparent",
        },
      });
    }
  }, [chartData, data.id, data.name]);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      chartRef.current?.requestFullscreen?.();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullScreen(false);
    }
  };

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
      className={`stock-chart-surface ${isFullScreen ? "is-fullscreen" : ""}`}
      onDoubleClick={handleFullScreen}
    >
      <div className="chart-meta-row">
        <div className="live-chip">
          <Radio size={14} />
          Streaming
        </div>
        <button
          onClick={handleFullScreen}
          className="chart-action-button"
          aria-label={isFullScreen ? "Exit full screen" : "Open full screen"}
          title={isFullScreen ? "Exit full screen" : "Open full screen"}
        >
          {isFullScreen ? <Minimize2 size={17} /> : <Expand size={17} />}
        </button>
      </div>

      <div className="chart-canvas">
        {options ? (
          <AgCharts options={options} className="h-full w-full" />
        ) : isLoading ? (
          <div className="chart-state">
            <span className="loading-ring" />
            Loading chart data...
          </div>
        ) : (
          <div className="chart-state">No data available.</div>
        )}
      </div>
    </div>
  );
};

export default StockChart;
