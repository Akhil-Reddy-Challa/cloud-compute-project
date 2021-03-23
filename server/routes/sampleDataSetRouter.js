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

  let result = await fetchRecordsOfHouseHold(houseHoldNumber);
  return res.send(result);
});
async function fetchRecordsOfHouseHold(houseHoldNumber) {
  const mysql = require("mysql");
  const pool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
  });
  executeQuery = () => {
    return new Promise((resolve, reject) => {
      pool.query(query, [houseHoldNumber], (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };
  let recordsOfHouseHold = await executeQuery();

  return recordsOfHouseHold.length > 0 ? recordsOfHouseHold : [];
}

module.exports = router;
