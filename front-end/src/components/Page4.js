const { Backend_API } = require("../utils/Backend_API");

const Page4 = () => {
  const handleFilesUpload = (e) => {
    e.preventDefault(); //Prevents page reload

    let uploadedFiles = document.getElementById("csvFiles");
    uploadedFiles = uploadedFiles.files;

    //Now prepare the file for transfer
    const file_data = new FormData();
    file_data.append("csvFiles", uploadedFiles[0]);
    file_data.append("csvFiles", uploadedFiles[1]);
    file_data.append("csvFiles", uploadedFiles[2]);

    const response = fetch(Backend_API + "csvupload", {
      method: "POST",
      body: file_data,
    });
  };
  return (
    <div id="mainContainer">
      <form
        onSubmit={(e) => handleFilesUpload(e)}
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label htmlFor="csvFile" className="form-label">
            Upload Three CSV Files using below link
          </label>
          <input
            type="file"
            id="csvFiles"
            className="form-control"
            name="csvFiles"
            accept=".csv"
            multiple
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Page4;
