import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/page4.css";
const { Backend_API } = require("../utils/Backend_API");

const Page4 = (props) => {
  const [dataSetName, setDataSetName] = useState("");
  let { userName } = props;
  const [userDatasetList, setUserDatasetList] = useState([]);
  const history = useHistory();

  const handleFilesUpload = async (e) => {
    e.preventDefault(); //Prevents page reload

    if (userDatasetList.includes(dataSetName)) {
      alert("A data-set with that name exists!");
      return;
    }

    let transactionsFile = document.getElementById("transactionsFile").files;
    let productsFile = document.getElementById("productsFile").files;
    let householdsFile = document.getElementById("householdsFile").files;

    //Now prepare the file for transfer
    const file_data = new FormData();
    file_data.append("csvFiles", transactionsFile[0]);
    file_data.append("csvFiles", productsFile[0]);
    file_data.append("csvFiles", householdsFile[0]);

    if (userName && dataSetName) {
      const { status } = await fetch(
        Backend_API + `csvupload/${userName}/${dataSetName}`,
        {
          method: "POST",
          body: file_data,
        }
      );
      if (status === 200) {
        console.log("Files inserted succesfully");
        history.push("/home/page1");
      }
    } else {
      console.log("user Name invalid");
      alert("An error occured");
    }
  };
  useEffect(() => {
    async function getUserDataSetNames() {
      console.log("Fetching records of", userName);
      const response = await fetch(Backend_API + "fetchDataSetNames", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ userName }),
      });
      let { status } = response;
      if (status === 200) {
        const { dataSetNames } = await response.json(response);
        setUserDatasetList(dataSetNames);
      }
    }
    getUserDataSetNames();
  }, []);
  return (
    <div id="mainContainer">
      <form
        onSubmit={(e) => handleFilesUpload(e)}
        id="uploadForm"
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Give a Name to the dataset
            </label>
            <input
              type="text"
              value={dataSetName}
              onChange={(e) => setDataSetName(e.target.value)}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Name"
              required
            />
          </div>
          <label htmlFor="csvFile" className="form-label">
            Upload <b>"Transactions CSV"</b> file below
          </label>
          <input
            type="file"
            id="transactionsFile"
            className="form-control"
            name="csvFiles"
            accept=".csv"
            required
          />
          <label htmlFor="csvFile" className="form-label">
            Upload <b>"Products CSV"</b> file below
          </label>
          <input
            type="file"
            id="productsFile"
            className="form-control"
            name="csvFiles"
            accept=".csv"
            required
          />
          <label htmlFor="csvFile" className="form-label">
            Upload <b>"HouseHolds CSV"</b> file below
          </label>
          <input
            type="file"
            id="householdsFile"
            className="form-control"
            name="csvFiles"
            accept=".csv"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page4;
