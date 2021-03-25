const express = require("express");
const router = express.Router();
const {
  host,
  port,
  user,
  password,
  query2,
  query3,
  query4,
} = require("../utils/mysqlConfig");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "server/uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.originalname.split(".").slice(0, -1).join(".") +
        "_" +
        Date.now() +
        ".csv"
    );
  },
});
var upload = multer({ storage: storage }).array("csvFiles", 3);
router.post("/", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.sendStatus(400);
    }
    let status = processFiles(req.files);
    return status ? res.sendStatus(200) : res.sendStatus(500);
  });
});
function processFiles(filesObj) {
  files = [];
  for (let file of filesObj) files.push(file.path);
  parseCSVFiles(files);
  return true;
}
function parseCSVFiles(files) {
  const csv = require("csv-parser");
  const fs = require("fs");

  for (let file of files) {
    const csvRows = [];
    fs.createReadStream(file)
      .pipe(csv())
      .on("data", (data) => csvRows.push(data))
      .on("end", () => {
        insertIntoDB(file, csvRows);
        //Delete The File
        fs.unlinkSync(file);
      });
  }
}
function insertIntoDB(file, csvRows) {
  function extractHeaders() {
    return Object.keys(csvRows[0]);
  }
  function extractValues() {
    let allTheData = [];
    let data = [];
    for (let row of csvRows) {
      data = [];
      for (let header of headersOfCSV) {
        data.push(row[header].trim());
      }
      allTheData.push(data);
    }

    return allTheData;
  }
  function findTableName() {
    let tableName = "HOUSEHOLDS";
    if (file.toUpperCase().includes("TRANSACTION")) tableName = "TRANSACTIONS";
    else if (file.toUpperCase().includes("PRODUCT")) tableName = "PRODUCTS";
    return tableName;
  }

  let headersOfCSV = extractHeaders();
  let dataOfCSV = extractValues();
  //Find table name using the uploaded file_name
  let tableName = findTableName();

  console.log("request to Push data to table", tableName);
  // pushToDB(values, tableName, headersOfCSV);
}
async function pushToDB(values, tableName, nameOfCSVRows) {
  const mysql = require("mysql");
  const pool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    port: port,
    user: user,
    password: password,
    database: "UserFiles",
  });
  createTable = (query, nameOfCSVRows) => {
    return new Promise((resolve, reject) => {
      pool.query(query, nameOfCSVRows, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };
  executeQuery = (query, nameOfCSVRows) => {
    return new Promise((resolve, reject) => {
      pool.query(query, nameOfCSVRows, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };
  //Create Table
  await createTable();
  let query = "";
  if ((tableName = "PRODUCTS")) query = query2;
  else if ((tableName = "TRANSACTIONS")) query = query3;
  else query = query4;
  console.log(nameOfCSVRows);
  return;
  let op = await executeQuery(query, nameOfCSVRows);
  console.log(op);
}

module.exports = router;
