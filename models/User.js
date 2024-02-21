const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  idNumber: String,
  phoneNumber: String,
  line1: String,
  line2: String,
  line3: String,
  email: String,
  identifier: String,
  verificationType: String,
  isCriminalRecord: Boolean,
  selfieFileName: String,
  idFileName: String,
  createdAt: String,
});

module.exports = model("User", userSchema);
