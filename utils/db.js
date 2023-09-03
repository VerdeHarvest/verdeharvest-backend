import mongoose from 'mongoose';
import logger from './logger.js';

const dbConnect = async () => {
  const MONGO_URL = process.env.DB_URL;

  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`Connected to MongoDB succesfully!`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

export default dbConnect;
