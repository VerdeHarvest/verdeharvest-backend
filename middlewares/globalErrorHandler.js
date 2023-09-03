import ApiError from '../errors/ApiError.js';
import logger from '../utils/logger.js';

const NODE_ENV = process.env.NODE_ENV;

export const devErrors = (error, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
      stackTrace: error.stack,
      error: error
    });
  }
}

export const prodErrors = (error, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (error instanceof ApiError && error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
      });
    }
    // unkownn error
    logger.error(`${error.message}`);
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong, please try again later!'
    })
  }
}

const castErrorHandler = (err) => {
  const message = `Invalid value for ${err.path}: ${err.value}`;
  return new ApiError(message, 400);
};

const duplicateKeyErrorHandler = (err) => {
  const name = err.keyValue.name;
  const message = `Duplicate field for: ${name}. Use another value`;
  return new ApiError(message, 400);
};

const tokenExpiredErrorHandler = (err) => {
  const message = `JWT token has expired. Please login again.`;
  return new ApiError(message, 401);
};

const jsonWebTokenErrorHandler = (err) => {
  const message = `JWT token is invalid. Please login again.`
  return new ApiError(message, 401);
};


const globalErrorHandler = ((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 500;

  if (NODE_ENV === 'development') {
    devErrors(error, req, res);
  } else if (NODE_ENV === 'production') {
    if (error.name === 'CastError') {
      error = castErrorHandler(error);
    }
    if (error.name === 'MongoError' && error.code === '11000') {
      error = duplicateKeyErrorHandler(error);
    }
    if (error.name === 'TokenExpiredError') {
      error = tokenExpiredErrorHandler(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = jsonWebTokenErrorHandler(error);
    }
    prodErrors(error, req, res);
  }
});

export default globalErrorHandler;
