const express = require("express");
const cors = require("cors");

var app = express();
app.use(cors());
app.use(express.json());

// const authenticateUserRouter = require("./routes/authenticateUser");
// const newUserCreationRouter = require("./routes/newUserCreation");

// app.use("/authenticateUser", authenticateUserRouter);
// app.use("/newuser", newUserCreationRouter);

var server = app.listen(3000, () => {
  console.log("Express Server Listening on Port 3000");
});

//Error Handling statements
function handleTermination(signal) {
  // If a termination signal is received.
  console.info(signal + "*******  received. *******");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    process.exit(1);
  });
}
process.on("SIGTERM", handleTermination);
process.on("SIGINT", handleTermination);
process.on("uncaughtException", handleTermination);
