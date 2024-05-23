import express from 'express';
import { configDotenv } from 'dotenv';
configDotenv();
import dbConnect from './config/database.js';
import router from './routes/route.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// app instatiated
const app = express();
const port = process.env.PORT || 3000;
dbConnect();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// mouting of route
app.use('/v1', router);

// app listening
app.listen(port, () => {
  console.log(`App is listening at ${port}`);
});

app.get('/', (req, res) => {
  res.json({
    sucess: true,
    message: 'Welcome to the home route of this website',
  });
});
