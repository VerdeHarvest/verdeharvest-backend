import User from '../models/UserModel.js';
import UnauthorizedError from '../errors/unauthorizedError.js';

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!(user.role === 'ADMIN')) {
    return next(
      new UnauthorizedError('You are not allowed to access this resource.')
    );
  }
  req.user = user;
}

export default isAdmin;
