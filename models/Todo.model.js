const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title:{type:String,required:true},
  status:{type:Boolean,default:false}
});
const TodoModel = mongoose.model("todos", todoSchema);

module.exports = { TodoModel };
