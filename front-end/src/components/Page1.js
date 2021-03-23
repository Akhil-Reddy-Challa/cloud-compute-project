import "../styles/Page1.css";
const { Backend_API } = require("../utils/Backend_API");

const Page1 = () => {
  const fetchRecordsOfCustomer = async (event) => {
    event.preventDefault();
    let houseHoldNumber = document.getElementById("houseHoldNumber").value;
    if (!houseHoldNumber) return;

    const responseFromServer = await fetch(Backend_API + "fetchData/", {
      headers: { "Content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({
        houseHoldNumber,
      }),
    });
    let { status } = responseFromServer;
    if (status === 200) {
      const data = await responseFromServer.json(responseFromServer);
      console.log(data);
      writeDataToTable(data);
    } else {
      alert("An Error Occured!");
    }
    // let data = {
    //   HSHD_NUM: "0011",
    //   BASKET_NUM: "346420",
    //   PURCHASE: "13-APR-19",
    //   PRODUCT_NUM: "5290840",
    //   DEPARTMENT: "FOOD",
    // };
  };
  const writeDataToTable = (data) => {
    //Create the table Header's
    let tableHeader = document.getElementById("tableHeader");
    let tableRow = document.createElement("tr");
    for (let heading in data) {
      let cell = document.createElement("th");
      let textNode = document.createTextNode(heading);
      cell.appendChild(textNode);
      tableRow.appendChild(cell);
    }
    tableHeader.appendChild(tableRow);

    //Set the table rows
    let tableBody = document.getElementById("tableBody");
    tableRow = document.createElement("tr");
    for (let heading in data) {
      let cell = document.createElement("td");
      let value = data[heading];
      let textNode = document.createTextNode(value);
      cell.appendChild(textNode);
      tableBody.appendChild(cell);
    }
    tableBody.appendChild(tableRow);
  };
  return (
    <div>
      <div id="mainContainer">
        <h3>Data-Set "8451_The_Complete_Journey_2_Sample"</h3>
        <p>
          Enter the HSHD_NUM below to fetch all the data linked to the number
          from tables(household, transaction, and products)
        </p>
        <form>
          <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
            <div className="input-group">
              <input
                id="houseHoldNumber"
                type="search"
                placeholder="HSHD_NUM"
                aria-describedby="button-addon1"
                className="form-control border-0 bg-light"
              />
              <div className="input-group-append">
                <button
                  id="button-addon1"
                  type="submit"
                  className="btn btn-link text-primary"
                  onClick={(e) => fetchRecordsOfCustomer(e)}
                >
                  <i className="fa fa-search" style={{ fontSize: "18px" }}></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <table
        id="houseHoldDetails"
        className="table table-striped table-bordered table-sm"
      >
        <thead id="tableHeader" className="table-dark"></thead>
        <tbody id="tableBody"></tbody>
      </table>
    </div>
  );
};

export default Page1;
