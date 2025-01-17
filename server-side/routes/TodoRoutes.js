const express = require("express");
const router = express.Router();

const {getTodos, createTodo, editTodo, bulkEditTodo, deleteTodo, bulkDeleteTodo} = require("../controllers/TodoController");

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.patch("/todos/:id", editTodo);
router.patch("/todos-bulkcompleted", bulkEditTodo);
router.delete("/todos/:id", deleteTodo);
router.delete("/todos-deleteAll", bulkDeleteTodo);

module.exports = router
