const extractToken = async (req, res) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return await req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return await req.query.token;
  }
  return null;
};

export default extractToken;
