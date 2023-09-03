
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const expiresIn = process.env.EXPIRES_IN;

const signToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn });
};


export default signToken;
