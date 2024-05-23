import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log('database se connect ho gya hai brother');
    })
    .catch((error) => {
      console.log(error);
    });
};

export default dbConnect;
