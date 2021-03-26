const express = require("express");
const router = express.Router();
const { host, port, user, password } = require("../utils/mysqlConfig");

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
  function parseCSVFiles(files) {
    const csv = require("csv-parser");
    const fs = require("fs");

    let fileNameFinder = 0;
    //If fNF === 0 : file = Transactions.csv
    //elif fNF === 1: file = Products.csv
    //el file = HouseHolds.csv
    for (let file of files) {
      const csvRows = [];
      fs.createReadStream(file)
        .pipe(
          csv({
            mapHeaders: ({ header }) => header.trim(),
            mapValues: ({ value }) => value.trim(),
          })
        )
        .on("data", (data) => csvRows.push(data))
        .on("end", () => {
          insertIntoDB(csvRows, fileNameFinder);
          fileNameFinder++;
          //Delete The File
          fs.unlinkSync(file);
        });
    }
  }
  let files = [];
  for (let file of filesObj) files.push(file.path);
  parseCSVFiles(files);
  return true;
}
function insertIntoDB(csvRows, fileNameFinder) {
  function extractHeaders() {
    return Object.keys(csvRows[0]);
  }
  function extractValues() {
    let allTheData = [];
    for (let row of csvRows) {
      let data = [];

      for (let header of headersOfCSV) {
        data.push(row[header]);
      }
      allTheData.push(data);
    }

    return allTheData;
  }
  function findTableName() {
    let tableName = "HOUSEHOLDS";
    if (fileNameFinder === 0) tableName = "TRANSACTIONS";
    else if (fileNameFinder === 1) tableName = "PRODUCTS";
    return tableName;
  }

  let headersOfCSV = extractHeaders();
  let dataOfCSV = extractValues();
  // //Find table name using the uploaded file_name
  let tableName = findTableName();

  //console.log("request to Push data to table", tableName);
  pushToDB(headersOfCSV, dataOfCSV, tableName);
}

async function pushToDB(csvHeaders, csvValues, tableName) {
  const mysql = require("mysql");
  const pool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    port: port,
    user: user,
    password: password,
    database: "UserFiles",
  });
  createTable = (query) => {
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };
  deleteTables = (query) => {
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };
  insertDataintoTable = (query, nameOfCSVRows) => {
    return new Promise((resolve, reject) => {
      pool.query(query, nameOfCSVRows, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };
  //Create Table creation query
  let tableCreateStatement = `CREATE TABLE ${tableName}(`;
  for (let i = 0; i < csvHeaders.length; i++) {
    if (i === csvHeaders.length - 1)
      tableCreateStatement += `${csvHeaders[i]} varchar(200));`;
    else tableCreateStatement += `${csvHeaders[i]} varchar(200),`;
  }
  console.log("Table creation Statement: \n" + tableCreateStatement + "\n");
  await createTable(tableCreateStatement);
  //await deleteTables(`DROP TABLE ${tableName}`);
  //console.log("Data to be inserted", csvValues);
  // for (let value of csvValues) {
  //   await insertDataintoTable();
  // }
  // let query = "";
  // if ((tableName = "PRODUCTS")) query = query2;
  // else if ((tableName = "TRANSACTIONS")) query = query3;
  // else query = query4;
  // console.log(nameOfCSVRows);
  // return;
  // let op = await executeQuery(query, nameOfCSVRows);
  // console.log(op);
}

module.exports = router;
