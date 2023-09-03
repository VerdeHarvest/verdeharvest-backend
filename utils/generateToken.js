import jwt from 'jsonwebtoken';

class tokenGenerator {
  static accessToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });
    return token;
  }
}

export default tokenGenerator;
