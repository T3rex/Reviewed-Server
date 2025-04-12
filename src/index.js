const express = require("express");
const connect = require("./config/database");
const bodyParser = require("body-parser");
const { ServerConfig, Logger } = require("./config/index");
const apiRoutes = require("./routes/index");

const app = express();
app.use(bodyParser.json());
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
  try {
    await connect();
    console.log("Mongo db connected successfuly");
  } catch (error) {
    console.log("Mongo db connection failed: ", error);
  }
});
