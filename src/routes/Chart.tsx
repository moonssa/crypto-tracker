import { useQuery } from "react-query";
import { fetchCoinHostory } from "./api";
import ApexChart from "react-apexcharts";
interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHostory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart .."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => +price.close) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "monotoneCubic",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              /*
              categories: data
                ? data.map((price) => new Date(price.time_close * 1000))
                : [],
                */
              /*
              categories:
                data?.map((price) => new Date(price.time_close * 1000)) ?? [],
                */
              categories:
                data?.map((price) => {
                  const date = new Date(price.time_close * 1000).toISOString();
                  return date.split("T")[0]; // 'T'를 기준으로 분리하여 날짜 부분만 반환
                }) ?? [],
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#44bd32"],
                stops: [0, 100],
              },
            },
            colors: ["#00a8ff"],
            tooltip: {
              y: {
                /*
                formatter: function (value, {}) {
                  return `$${value.toFixed(3)}`;
                },
                */
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
