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
    } else {
      alert("An Error Occured!");
    }
  };
  return (
    <div id="mainContainer">
      <h3>Data-Set "8451_The_Complete_Journey_2_Sample"</h3>
      <p>
        Enter the HSHD_NUM below to fetch all the data linked to the number from
        tables(household, transaction, and products)
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
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page1;
