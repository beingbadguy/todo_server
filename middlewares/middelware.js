import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

const authenticateUserTodos = (req, res, next) => {
  const token = req.cookies.todoCookie;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
    }

    req.user = decodedToken;

    const requestedUserId = req.params.userId;
    if (requestedUserId !== decodedToken.userId) {
      return res.status(403).json({ success: false, message: 'Forbidden: Access denied' });
    }

    next();
  });
};

export default authenticateUserTodos;
