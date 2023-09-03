import bcrypt from 'bcryptjs';


const comparePassword = async function comparePassword(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw new Error('password does not match');
  }
};

export default comparePassword;
