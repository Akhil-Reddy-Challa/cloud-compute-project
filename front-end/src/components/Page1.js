import "../styles/Page1.css";

const Page1 = (props) => {
  console.log(props);

  const handleSearchBtnClick = (event) => {
    event.preventDefault();
    let houseHoldNumber = document.getElementById("houseHoldNumber").value;
    console.log("Fetch records of" + houseHoldNumber);
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
                onClick={(e) => handleSearchBtnClick(e)}
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
