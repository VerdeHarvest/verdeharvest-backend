import mongoose from 'mongoose';
import validator from 'validator';
import ROLES from '../utils/constants.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email address'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please enter a valid email address']
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  businesses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  }],
  role: {
    type: String,
    enum: [ROLES.ADMIN, ROLES.USER],
    default: ROLES.USER,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
