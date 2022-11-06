const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
require("dotenv").config();
const loginSignupRoute = express.Router();

loginSignupRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 5, async (err, hashed_password) => {
    if (err) {
      res.send("Something went wrong, please signup later");
    }
    const new_user = new UserModel({
      email,
      password: hashed_password,
    });
    await new_user.save();
    res.send("Sign up successfull");
  });
});

loginSignupRoute.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if(user){
      const hashed_password = user.password;
       bcrypt.compare(password, hashed_password, (err, result) => {
         if (result) {
           const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
           res.send({ msg: "Login successfull", token: token });
         } else {
           res.send("Login failed");
         }
       });
  }else{
    res.send("Please signup")
  }
 
});

module.exports = { loginSignupRoute };
