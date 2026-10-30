const mongoose = require("mongoose");

function mongodbConfig() {
  return mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log("Database Connection error", error);
    });
}

module.exports = mongodbConfig
