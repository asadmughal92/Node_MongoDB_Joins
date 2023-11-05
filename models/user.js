const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is Required"],
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "Last Name is Required"],
  },
  password: {
    type: String,
  },
  tokens: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
