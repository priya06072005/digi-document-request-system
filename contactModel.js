const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  mno: {
    type: Number,
    required: true
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
