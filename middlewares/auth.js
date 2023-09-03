import asyncErrorHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import util from 'util';
import User from '../models/UserModel.js'
import UnauthorizedError from '../errors/unauthorizedError.js';
import logger from '../utils/logger.js';

export default asyncErrorHandler(async (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  let token;
  if (tokenHeader && tokenHeader.startsWith('Bearer ')) {
    token = tokenHeader.split(' ')[1];
  }

  if  (!token) {
    next(new UnauthorizedError('You are not logged in!'));
  }

  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // logger.info(decoded.id);

  const user = await User.findById(decoded.id);
  if (!user) {
    next(new UnauthorizedError('The user does not exist!'))
  }

  req.user = user;
  logger.info(`User authenticated: ${req.user.username}`);

  next();
});