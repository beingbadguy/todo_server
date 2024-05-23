import mongoose from 'mongoose';
import Todo from '../model/todoModel.js';

const todoController = async (req, res) => {
  try {
    const { user, title, body } = req.body;
    const todo = await Todo.create({ user, title, body });
    res.status(200).json({
      success: true,
      message: 'todo created successfully',
      data: todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
};

export default todoController;
