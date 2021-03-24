import "../styles/Page1.css";
import { useState } from "react";
const { Backend_API } = require("../utils/Backend_API");

const Page1 = () => {
  const [totalTransaction, setTotalTransaction] = useState("");
  //Fix bug in Page reload, change login to home
  const fetchRecordsOfCustomer = async (event) => {
    event.preventDefault();
    let houseHoldNumber = document.getElementById("houseHoldNumber").value;
    if (!houseHoldNumber) {
      alert("Enter an household number");
      return;
    }

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
      writeDataToTable(data);
    } else {
      alert("An Error Occured!");
    }
  };
  const writeDataToTable = (data) => {
    function createTableHeaders(packet) {
      let tableHeader = document.getElementById("tableHeader");
      let tableRow = document.createElement("tr");
      for (let heading in packet) {
        let cell = document.createElement("th");
        let textNode = document.createTextNode(heading);
        cell.appendChild(textNode);
        tableRow.appendChild(cell);
      }
      tableHeader.appendChild(tableRow);
    }
    function createTableRows(packet) {
      let tableBody = document.getElementById("tableBody");
      let tableRow = document.createElement("tr");
      for (let heading in packet) {
        let cell = document.createElement("td");
        let value = packet[heading];
        let textNode = document.createTextNode(value);
        cell.appendChild(textNode);
        tableBody.appendChild(cell);
      }
      tableBody.appendChild(tableRow);
    }
    function cleanPreviousHouseHoldRecords() {
      let tableHead = document.getElementById("tableHeader");
      let tableBody = document.getElementById("tableBody");
      tableHead.querySelectorAll("*").forEach((n) => n.remove());
      tableBody.querySelectorAll("*").forEach((n) => n.remove());
    }
    function validateDataPacket() {
      const messageBanner = document.getElementById("messageDisplayArea");
      if (data.length === 0) {
        messageBanner.style.display = "block";
        messageBanner.innerHTML = "HouseHold Number does not exist!";
      } else {
        messageBanner.style.display = "none";
      }
    }
    function handleDataInsertion() {
      //Check if there are multiple transactions
      if (data.length > 1) {
        createTableHeaders(data[0]);
      } else createTableHeaders(data);
      //Now insert the table rows
      for (let packet of data) {
        createTableRows(packet);
      }
      //Display Total transactions count
      setTotalTransaction("Total Transactions: " + data.length);
    }
    validateDataPacket();
    cleanPreviousHouseHoldRecords();
    handleDataInsertion();
  };
  return (
    <div>
      <div id="mainContainer">
        <h4>Data-Set "8451_The_Complete_Journey_2_Sample"</h4>
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
        <div id="messageDisplayArea">
          Transactions List of the House-Hold would be displayed here.
        </div>
      </div>
      <table
        id="houseHoldDetails"
        className="table table-striped table-bordered table-sm"
      >
        <caption
          id="tableCaption"
          style={{ "caption-side": "top", "text-align": "center" }}
        >
          {totalTransaction}
        </caption>
        <thead id="tableHeader" className="table-dark"></thead>
        <tbody id="tableBody"></tbody>
      </table>
    </div>
  );
};

export default Page1;
