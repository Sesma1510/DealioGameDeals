
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as Joi from 'joi';
import { User } from './user.mongo';

// Input validation for registration
const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

async function registerUser(userData) {
  // Validate request body
  await registerSchema.validateAsync(userData);

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = new User({
    username: userData.username,
    email: userData.email,
    password: hashedPassword
  });

  await user.save();
  return user;
}

// Input validation for login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

async function authenticate(email, password) {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw error;

  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Incorrect password');

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h'
  });

  return token;
}

export { registerUser, authenticate };
