require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 5000;
const ENV = process.env.ENV || "development";
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { getSpecificUserDB } = require("./bin/helpers/dbHelpers.js");

// PG database client/connection setup
const db = require("./db/db");
db.connect();

app.set("view engine", "ejs");
app.use(express.json({ extended: true }));

app.use(express.static(__dirname + "/public"));

// ***** routes *****
const apiRoutes = require("./routes/api");
const defaultRoutes = require("./routes/default");
app.use("/api", apiRoutes);
app.use("/", defaultRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
http.listen(80);

io.on("connection", socket => {
  // ***** functions *****
  const receiveUserData = async user_num => {
    try {
      const data = await getSpecificUserDB(user_num);
      socket.emit("test 1 data", data);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const receiveUserDataAPI = async user_num => {
    try {
      const data = await getSpecificUserDB(user_num);
      socket.emit("test 2 data", data);
    } catch (error) {
      console.log("error :", error);
    }
  };
  // ***** end of functions *****

  socket.on("test 1 click", user_num => {
    receiveUserData(user_num);
  });

  socket.on("test 2 click", user_num => {
    receiveUserDataAPI(user_num);
  });
});
