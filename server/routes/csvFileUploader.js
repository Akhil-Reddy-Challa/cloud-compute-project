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
let status = null;

router.post("/", async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      res.sendStatus(400);
    }
    await processFiles(req.files);
    return status ? res.sendStatus(200) : res.sendStatus(500);
  });
});

async function processFiles(filesObj) {
  parseCSVFiles = async (files) => {
    const csv = require("csv-parser");
    const fs = require("fs");

    let fileNameFinder = 0;
    //If fNF === 0 : file = Transactions.csv
    //elif fNF === 1: file = Products.csv
    //else file = HouseHolds.csv
    for (let file of files) {
      const processFile = async () => {
        let csvRows = [];
        const parser = fs.createReadStream(file).pipe(
          csv({
            mapHeaders: ({ header }) => header.trim(),
            mapValues: ({ value }) => value.trim(),
          })
        );
        for await (const record of parser) {
          csvRows.push(record);
        }
        return csvRows;
      };
      const records = await processFile();
      await insertIntoDB(records, fileNameFinder);
      fileNameFinder++;
      fs.unlinkSync(file);
    }
  };
  let files = [];
  for (let file of filesObj) files.push(file.path);
  await parseCSVFiles(files);
}

async function insertIntoDB(csvRows, fileNameFinder) {
  let headersOfCSV = extractHeaders();
  let dataOfCSV = extractValues();
  let tableName = findTableName();

  await transmitRecords(headersOfCSV, dataOfCSV, tableName);
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
    const tableNames = ["TRANSACTIONS", "PRODUCTS", "HOUSEHOLDS"];
    return tableNames[fileNameFinder];
  }
}

async function transmitRecords(csvHeaders, csvValues, tableName) {
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
  deleteTable = (query) => {
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };
  insertData = (query, values) => {
    return new Promise((resolve, reject) => {
      pool.query(query, [values], (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };

  try {
    //Create-Table query
    let tableCreateStatement = `CREATE TABLE ${tableName}(`;
    for (let i = 0; i < csvHeaders.length; i++) {
      if (i === csvHeaders.length - 1)
        tableCreateStatement += `${csvHeaders[i]} varchar(200));`;
      else tableCreateStatement += `${csvHeaders[i]} varchar(200),`;
    }
    // console.log("Table creation Statement: \n" + tableCreateStatement + "\n");
    await createTable(tableCreateStatement);

    let insertStatement = `INSERT INTO ${tableName} VALUES ?`;
    //console.log(insertStatement);
    await insertData(insertStatement, csvValues);
    status = "Success";
  } catch (err) {
    console.error(err);
  } finally {
    return status;
  }
}

module.exports = router;
