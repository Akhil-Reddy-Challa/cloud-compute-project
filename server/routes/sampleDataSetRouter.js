const express = require("express");
const router = express.Router();
let { host, port, user, password, database } = require("../utils/mysqlConfig");
const defaultDB = "8451_The_Complete_Journey_2_Sample";

router.post("/", async (req, res) => {
  const { houseHoldNumber, selectedDataSet, userName } = req.body;
  if (selectedDataSet === defaultDB) {
    database = defaultDB;
  } else {
    database = `USER_${userName}_DATASET_${selectedDataSet}`;
  }
  let result = await fetchRecordsOfHouseHold(
    houseHoldNumber,
    selectedDataSet,
    userName
  );
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
  let query =
    "SELECT * from HOUSEHOLDS h JOIN TRANSACTIONS t ON h.HSHD_NUM = t.HSHD_NUM JOIN PRODUCTS p ON p.PRODUCT_NUM = t.PRODUCT_NUM WHERE h.HSHD_NUM = ? ORDER BY 1,2,3,4,5,6;";
  let recordsOfHouseHold = await executeQuery();
  return recordsOfHouseHold.length > 0 ? recordsOfHouseHold : [];
}

module.exports = router;
