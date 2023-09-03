import User from '../models/UserModel.js';

const roleChecker = (roles) => async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!roles.includes(user.role)) {
    return next(
      new ForbiddenError('You do not have permission to access this resource')
    );
  }
  req.user = user;
  next();
};

export default roleChecker;
