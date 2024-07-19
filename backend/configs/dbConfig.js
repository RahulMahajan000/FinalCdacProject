const mongoose = require("mongoose");
async function connectDB(DbUrl) {
  return mongoose.connect(DbUrl);
}
module.exports = connectDB;
