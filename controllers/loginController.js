import User from '../model/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'enter your credentials carefully',
      });
    }

    const userExits = await User.findOne({ username });
    if (!userExits) {
      return res.status(400).json({
        success: false,
        message: "User Doesn't exits",
      });
    }
    const userMatch = await bcrypt.compare(password, userExits.password);
    if (!userMatch) {
      return res.status(400).json({
        success: false,
        message: "passwod didn't match",
      });
    }

    const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: '1h' });

    // Set JWT token as a cookie
    res.cookie('todoCookie', token, {
      httpOnly: true,
      secure: false, // Enable for HTTPS
      sameSite: 'strict', // Adjust according to your requirements
      maxAge: 3600000, // 1 hour expiration
    });

    res.status(200).json({
      success: true,
      message: 'user logged in successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
};

export default loginController;
