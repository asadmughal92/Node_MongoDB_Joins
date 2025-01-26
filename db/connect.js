const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017";

const connectDB = () => {
  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};


module.exports= connectDB;