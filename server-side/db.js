const mongoose = require("mongoose");

const connectDb = () => {
  const url = "mongodb://localhost:27017/todoDB";
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Mongo Db database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDb
