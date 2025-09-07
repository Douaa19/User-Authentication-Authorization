const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

module.exports = mongoose;
