import { Chart } from "react-google-charts";
const LineChart = () => {
  return (
    <div>
      <Chart
        width={"600px"}
        height={"600px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Income Group", "House Hold Size", "Expenditure"],
          ["100-150K", 1, 1416.6],
          ["100-150K", 2, 6654.18],
          ["100-150K", 3, 1999.94],
          ["100-150K", 4, 2362.9],
          ["100-150K", 5, 5860.6],
          ["150K+", 1, 2629.05],
          ["150K+", 2, 5325.29],
          ["150K+", 3, 4668.77],
          ["150K+", 4, 2161.93],
          ["150K+", 5, 1615.12],
          ["35-49K", 1, 7030.91],
          ["35-49K", 2, 5851.24],
          ["35-49K", 3, 3402.74],
          ["35-49K", 4, 322.56],
          ["35-49K", 5, 5563.53],
          ["50-74K", 1, 8586.85],
          ["50-74K", 2, 9357.41],
          ["50-74K", 3, 8065.0],
          ["50-74K", 4, 1740.1],
          ["50-74K", 5, 2783.21],
          ["75-99K", 1, 4741.94],
          ["75-99K", 2, 3786.79],
          ["75-99K", 3, 4131.89],
          ["75-99K", 4, 3855.09],
          ["75-99K", 5, 2533.23],
          ["UNDER 35K", 1, 7028.73],
          ["UNDER 35K", 2, 8307.21],
          ["UNDER 35K", 3, 2853.55],
          ["UNDER 35K", 4, 2638.3],
          ["UNDER 35K", 5, 127.64],
        ]}
        options={{
          curveType: "function",
          legend: { position: "bottom" },
          title: "Spending Curve",
        }}
      />
    </div>
  );
};

export default LineChart;
