const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const UserModel = mongoose.model("todousers", userSchema);

module.exports = { UserModel };
