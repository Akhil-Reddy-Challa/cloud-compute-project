import { useState } from "react";

const { Backend_API } = require("../utils/Backend_API");

const Page4 = () => {
  const [dataSetName, setDataSetName] = useState("");

  const handleFilesUpload = async (e) => {
    e.preventDefault(); //Prevents page reload

    let transactionsFile = document.getElementById("transactionsFile").files;
    let productsFile = document.getElementById("productsFile").files;
    let householdsFile = document.getElementById("householdsFile").files;

    //Now prepare the file for transfer
    const file_data = new FormData();
    file_data.append("csvFiles", transactionsFile[0]);
    file_data.append("csvFiles", productsFile[0]);
    file_data.append("csvFiles", householdsFile[0]);

    const { status } = await fetch(Backend_API + "csvupload", {
      method: "POST",
      body: file_data,
    });
    if (status === 200) {
      console.log("Files inserted succesfully");
    }
  };
  return (
    <div id="mainContainer">
      <form
        onSubmit={(e) => handleFilesUpload(e)}
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <div class="form-group">
            <label for="exampleInputEmail1">Give a Name to the dataset</label>
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
