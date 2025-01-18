const express = require("express");
const Todo = require("../models/TodoModel");
const mongoose = require("mongoose");

// GET API to get all the Todos
const getTodos = async (req, res) => {
  const todos = await Todo.find().sort({completed: 1});
  res.json(todos);
};

// POST API to Add a Todo
const createTodo = async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    description: req.body.description,
  });

  todo.save();

  res.json(todo);
};

// PATCH API to Update a Todo
const editTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    res.send(updatedTodo);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating todo", error: error.message });
  }
};

// PATCH API to update a Todo
const bulkEditTodo = async (req, res) => {
  const { ids } = req.body;

  // Validate input
  if (!Array.isArray(ids)) {
    return res.status(400).json({
      success: false,
      message: "Please provide an array of todo IDs",
    });
  }

  if (ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one todo ID",
    });
  }

  try {
    // Convert and validate all IDs
    const objectIds = ids.map((id) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ID format: ${id}`);
      }
      return new mongoose.Types.ObjectId(id);
    });

    // Update all matching documents
    const result = await Todo.updateMany(
      { _id: { $in: objectIds } },
      { $set: { completed: true } }
    );

    return res.status(200).json({
      success: true,
      message: `Successfully updated ${result.modifiedCount} todos`,
      result: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error) {
    console.error("Bulk update error:", error); // Added for debugging
    return res.status(400).json({
      success: false,
      message: "Error updating todos",
      error: error.message,
    });
  }
};

// DELETE API to remove a Todo by ID
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    } 

    res.send({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error deleting todo", error: error.message });
  }
};

// Bulk DELETE API to remove multiple Todos by IDs
const bulkDeleteTodo = async (req, res) => {
  const { ids } = req.body;

  // Input validation
  if (!Array.isArray(ids)) {
    return res.status(400).json({
      success: false,
      message: "Please provide an array of todo IDs",
    });
  }

  if (ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one todo ID",
    });
  }

  try {
    // Convert and validate all IDs
    const objectIds = ids.map((id) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ID format: ${id}`);
      }
      return new mongoose.Types.ObjectId(id);
    });

    // Delete all matching documents
    const result = await Todo.deleteMany({ _id: { $in: objectIds } });

    // Check if any documents were found and deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No todos found with the provided IDs",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} todos`,
      result: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    console.error("Bulk delete error:", error);
    return res.status(400).json({
      success: false,
      message: "Error deleting todos",
      error: error.message,
    });
  }
};

exports.getTodos = getTodos;
exports.createTodo = createTodo;
exports.editTodo = editTodo;
exports.bulkEditTodo = bulkEditTodo;
exports.deleteTodo = deleteTodo;
exports.bulkDeleteTodo = bulkDeleteTodo;
