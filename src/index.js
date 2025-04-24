const express = require("express");
const cors = require("cors");
const connect = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { ServerConfig, Logger } = require("./config/index");
const apiRoutes = require("./routes/index");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
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
