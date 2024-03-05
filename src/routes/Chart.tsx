import { useQuery } from "react-query";
import { fetchCoinHostory } from "./api";

interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery(["ohlcv", coinId], () =>
    fetchCoinHostory(coinId)
  );
  console.log(data);
  return <div>Chart</div>;
}

export default Chart;
