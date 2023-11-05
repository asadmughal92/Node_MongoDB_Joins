const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017";

const connectDB = () => {
  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};


module.exports= connectDB;