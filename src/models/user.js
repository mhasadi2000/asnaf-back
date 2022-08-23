const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  nationalcode : {
    type: String,
    required: true,
  }
});

module.exports = global.writeConnection.model('User', userSchema);