import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import hashPassword from '../utils/hashPassword.js';
import comparePassword from '../utils/comparePassword.js';
import signToken from '../utils/signToken.js';
import extractToken from '../utils/extractToken.js';
import ConflictError from '../errors/conflictError.js';
import ClientError from '../errors/clientError.js';
import UnauthorizedError from '../errors/unauthorizedError.js';
import NotFoundError from '../errors/notFoundError.js';
// import logger from '../utils/logger.js';

export default class AuthController {
  static signup = asyncHandler(async (req, res, next) => {
    const { email, username, password, firstName, lastName, phoneNumber, location } = req.body;
    
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new ConflictError('User already exists');
      return next(error);
    }

    const passwordHash = await hashPassword(password);
    const user = new User({
      email,
      username,
      firstName,
      lastName,
      phoneNumber,
      location,
      password: passwordHash,
    });

    const token = signToken(user._id);
    // logger.info(`token: ${token}`);

    await user.save();
    
    return res.status(200).json({
      status: 'success',
      message: 'User successfully created!',
      token,
      data: {
        user
      }
    });
  });

  static logIn = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      const error = new ClientError('Please enter a username and password');
      return next(error);
    }
    
    const user = await User.findOne({ username }).select('+password');

    const isMatch = await comparePassword(password, user.password);
  
    if (!user || !isMatch) {
      const error = new UnauthorizedError('Invalid username or password');
      return next(error);
    }
    
    const token = signToken(user._id);

    return res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      token,
      data: {
        user
      }
    });
  });

  static logout = asyncHandler(async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
      const error = new NotFoundError('Token not found');
      return next(error);
    }

    return res.status(200).json({
      status: 'success',
      message: 'User logged out successfully',
    });
  })
}
