import User from '../model/userModel.js';
import bcrypt from 'bcrypt';

const signinController = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Enter your name, username and password carefully',
      });
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(500).json({
        success: false,
        message: 'user already exits',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, username, password: hashedPassword });
    res.status(200).json({
      success: true,
      message: 'user has been created successfully',
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'internal server error',
    });
  }
};

export default signinController;
