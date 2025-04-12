const mongoose = require("mongoose");
const { DB_CONNECTION } = require("./server-config");
const connect = async function main() {
  await mongoose.connect(DB_CONNECTION);
};
console.log(connect);

module.exports = connect;
