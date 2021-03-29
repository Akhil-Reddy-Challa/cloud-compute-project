import { Chart } from "react-google-charts";

const BarChart = () => {
  return (
    <div>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          [
            "Element",
            "Amount spent",
            { role: "style" },
            {
              sourceColumn: 0,
              role: "annotation",
              type: "string",
              calc: "stringify",
            },
          ],
          ["2018", 29174.86, "dodgerblue", null],
          ["2019", 75784.09, "dodgerblue", null],
          ["2020", 47969.01, "dodgerblue", null],
        ]}
        options={{
          title: "Expenditure For Last Three Years",
          width: 600,
          height: 400,
          bar: { groupWidth: "95%" },
          legend: { position: "none" },
        }}
      />
    </div>
  );
};

export default BarChart;
