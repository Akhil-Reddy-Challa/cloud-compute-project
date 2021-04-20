import BarChart from "./Charts/BarChart";
import ComboChart from "./Charts/ComboChart";
import LineChart from "./Charts/LineChart";
import PieChart1 from "./Charts/PieChart1";
import PieChart2 from "./Charts/PieChart2";

const Dashboard = () => {
  return (
    <div>
      <table style={{ width: "50%" }}>
        <tr>
          <td>
            <BarChart />
          </td>
          <td>
            <ComboChart />
          </td>
        </tr>
        <tr>
          <td>
            <LineChart />
          </td>
        </tr>
        <tr>
          <td>
            <PieChart1 />
          </td>
          <td>
            <PieChart2 />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Dashboard;
