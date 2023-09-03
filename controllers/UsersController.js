import User from '../models/UserModel.js';
import asyncHandler from 'express-async-handler';

export default class UserController {
  static getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();

    return res.status(200).json({
      status: 'success',
      message: 'Users successfully fetched',
      data: {
        users
      }
    });
  });
}
