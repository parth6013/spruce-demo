const mongoose = require("mongoose");






const userSchema = new mongoose.Schema({
  name: {
    type: String,

    min: 2,
    max: 255,
  },
  twitter_id:{
    type: String,
    required: true,
    max: 1024,
    min: 6,

  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  
  verification:{
    type: String,
    default:"0"
  }

  
});






module.exports = mongoose.model("User", userSchema);