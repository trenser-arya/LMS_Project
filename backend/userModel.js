const mongoose = require("mongoose");

let Schema = mongoose.Schema;

//Schema Creation of User Details
const userSchema = new Schema({
  username:
  {
    type: String,
    unique:true,
    required:true
  },
  name: String,
  email:
  {
    type: String,
    unique:true,
    required:true
  },
  phone: Number,
  password: {
    type:String,
    required:true
  },
  access:{
    type:Boolean,
    default:true
  }
});

const userModel = mongoose.model("user", userSchema);

module.exports =userModel;
