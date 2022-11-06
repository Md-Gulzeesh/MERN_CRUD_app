const express = require("express");
const { authentication } = require("../middlewares/authentication.middleware");
const { TodoModel } = require("../models/Todo.model");
require("dotenv").config();
const todoRoutes = express.Router();

todoRoutes.get("/",authentication, async (req, res) => {
  const todo = await TodoModel.find();
  res.send(todo);
});
todoRoutes.post(
  "/add",
  authentication,
  async (req, res) => {
    const newTodo = new TodoModel(req.body);
    try {
      await newTodo.save();
      res.send({ message: "Todo added!" });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
      console.log({ error });
    }
  }
);
todoRoutes.post(
  "/delete/:id",
  authentication,
  async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await TodoModel.findOne({ _id: id });
      if (todo) {
        await TodoModel.deleteOne({ _id: id });
        res.send({ message: "Todo Delete successfully" });
      } else {
        res.status(404).send({ message: `Todo with id ${id} not found!` });
      }
    } catch (error) {
      res
        .status(404)
        .send({ message: `Todo with id ${id} not found!`, error });
    }
  }
);
todoRoutes.post(
  "/update/:id",
  authentication,
  async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await TodoModel.findOne({ _id: id });
      if (todo) {
        await TodoModel.updateOne({ _id: id }, req.body);
        res.send({ message: "Todo updated successfully" });
      } else {
        res.status(404).send({ message: `Todo with id ${id} not found!` });
      }
    } catch (error) {
      res
        .status(404)
        .send({ message: `Todo with id ${id} not found!`, error });
    }
  }
);

module.exports = { todoRoutes };
