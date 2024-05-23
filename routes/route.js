import express from 'express';
const router = express.Router();
import signinController from '../controllers/signinController.js';
import loginController from '../controllers/loginController.js';
import todoController from '../controllers/TodoController.js';
import alltodoController from '../controllers/alltodoController.js';
import authenticateToken from '../middlewares/middelware.js';

router.get('/aman', (req, res) => {
  res.json({
    sucess: true,
  });
});
router.post('/signin', signinController);
router.post('/login', loginController);
router.post('/createTodo', todoController);
router.get('/viewTodo/:id', alltodoController);
router.post('/logout', (req, res) => {
  res.clearCookie('todoCookie', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });

  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

import User from '../model/userModel.js';
router.get('/protected', authenticateToken, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username });
    user.password = undefined;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User data fetched successfully',
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;
