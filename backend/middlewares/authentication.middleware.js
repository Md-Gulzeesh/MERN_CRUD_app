const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req.headers?.authorization;
  try {
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.email = decoded.email;
    next();
  } catch (err) {
    res.send({ message: "Please login again", err }).redirect("/");
  }
};

module.exports = { authentication };
