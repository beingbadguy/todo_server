import mongoose from 'mongoose';
import Todo from '../model/todoModel.js';

const alltodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.find({ user: id });
    res.status(200).json({
      success: true,
      message: 'todos fetched successfully',
      data: todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default alltodoController;
