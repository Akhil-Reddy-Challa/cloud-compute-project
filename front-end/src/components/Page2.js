import BarChart from "../components/Charts/BarChart";
import ComboChart from "../components/Charts/ComboChart";
import LineChart from "../components/Charts/LineChart";
import PieChart1 from "../components/Charts/PieChart1";
import PieChart2 from "../components/Charts/PieChart2";

const Page2 = () => {
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

export default Page2;
