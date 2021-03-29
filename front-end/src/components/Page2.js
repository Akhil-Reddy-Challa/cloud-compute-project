import BarChart from "../components/Charts/BarChart";
import ComboChart from "../components/Charts/ComboChart";
import LineChart from "../components/Charts/LineChart";
import PieChart_1 from "../components/Charts/PieChart_1";
import PieChart_2 from "../components/Charts/PieChart_2";

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
            <PieChart_1 />
          </td>
          <td>
            <PieChart_2 />
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Page2;
