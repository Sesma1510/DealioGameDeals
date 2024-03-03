import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from './user.mongo';
import 'dotenv/config';

async function registerUser(username: string, email: string, password: string): Promise<any> {
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  await newUser.save();
  return newUser;
}

const secretKey = process.env.SECRET_KEY;

async function authenticateUser(email: string, password: string): Promise<string> {
const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('User not found');
  }

  // Check if user password is undefined
  if (!user.password) {
    throw new Error('User password not found');
  }

  // Check if provided password is a valid string
  if (!password || typeof password !== 'string') {
    throw new Error('Invalid password');
  }

  // Compare passwords using bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password is incorrect');
  }

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  return token;
}


export { registerUser, authenticateUser };
