const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { loginSignupRoute } = require("./routes/loginSignup.routes");
const { todoRoutes } = require("./routes/Todo.routes");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use("/todos",todoRoutes);
app.use("/login", loginSignupRoute);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
  console.log(`listening on PORT ${PORT}`);
});
