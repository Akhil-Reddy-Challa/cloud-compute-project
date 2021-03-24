const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  host: process.env.MYSQL_HOST_NAME,
  port: process.env.MYSQL_PORT_NUM,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_NAME,
  query: process.env.MYSQL_QUERY,
};
