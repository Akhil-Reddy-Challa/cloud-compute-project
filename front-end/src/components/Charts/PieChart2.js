import { Chart } from "react-google-charts";
const PieChart2 = () => {
  return (
    <div>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Commodities", "Expenditure"],
          ["DAIRY", 3440.86],
          ["ALCOHOL", 2043.15],
          ["SEAFOOD", 678.74],
          ["HOUSEHOLD", 3380.08],
          ["MEDICATION", 1229.26],
          ["FROZEN FOOD", 3464.9],
          ["GROCERY STAPLE", 9421.18],
          ["SPECIALTY FOOD", 317.79],
          ["BEVERAGE - WATER", 631.62],
          ["TOBACCO PRODUCTS", 394.31],
          ["INTERNATIONAL FOOD", 693.2],
          ["BEVERAGE - NON WATER", 2801.44],
          ["DELI", 939.13],
          ["IN STORE FOOD SERVICE", 1007.47],
          ["BAKERY", 2032.67],
          ["PRODUCE", 3782.6],
          ["COSMETICS", 118.82],
          ["CANNED GOODS", 764.52],
          ["FLORAL", 447.42],
          ["PERSONAL CARE", 1451.52],
          ["DRY GOODS", 815.34],
          ["MEAT - BEEF", 2235.41],
          ["MEAT - TURKEY", 154.23],
          ["PET", 756.91],
          ["MEAT - PORK", 581.11],
          ["MEAT - CHICKEN", 1452.9],
          ["MEAT - OTHER", 899.31],
          ["MEAT - SAUSAGE", 519.58],
          ["CLOTHING", 183.87],
          ["BULK PRODUCTS", 186.72],
          ["SEASONAL PRODUCTS", 9.07],
          ["GIFT", 245.26],
          ["ACTIVITY", 37.86],
          ["TOYS", 74.8],
          ["HOLIDAY", 21.1],
          ["BABY", 494.71],
          ["AUTO", 15.0],
          ["MISC", 89.59],
          ["ELECTRONICS", 6.5],
          ["OUTDOOR", 96.63],
          ["MEAT - POULTRY", 33.65],
          ["MEDICAL SUPPLIES", 18.78],
        ]}
        options={{
          title: "Commodities in Year 2020",
          width: 600,
          height: 600,
        }}
      />
    </div>
  );
};

export default PieChart2;
