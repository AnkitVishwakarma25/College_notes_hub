const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Message", messageSchema);
