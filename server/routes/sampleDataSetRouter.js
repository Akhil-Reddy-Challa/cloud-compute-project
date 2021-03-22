const express = require("express");
const router = express.Router();
const {
  host,
  port,
  user,
  password,
  database,
  query,
} = require("../utils/mysqlConfig");

router.post("/", async (req, res) => {
  const { houseHoldNumber } = req.body;
  console.log(houseHoldNumber);

  if (houseHoldNumber) fetchRecordsOfHouseHold(houseHoldNumber);
  else res.send({});
});
function fetchRecordsOfHouseHold(houseHoldNumber) {
  const mysql = require("mysql");
  const connection = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
  });
  let recordsOfHouseHold = "";
  try {
    connection.connect();
    newQuery = query + `${houseHoldNumber} ORDER BY 1,2,3,4,5,6;`;
    connection.query(newQuery, (err, rows) => {
      if (err) throw err;
      else if (rows.length > 0) {
        console.log(rows, rows[0]);
      }
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    connection.end();
  }
}

module.exports = router;
