import { Request, Response } from 'express';
import { authenticate, registerUser } from '../../models/user.model';

async function register(req: Request, res: Response) {
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    const newUser = await registerUser(userData);
    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser._id
    });
  } catch (error) {
    const statusCode = error.message.includes('already exists') ? 409 : 500;
    console.error('Registration error:', error);
    res.status(statusCode).json({
      error: error.message
    });
  }
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const token = await authenticate(email, password);
    res.json({ message: 'User authenticated successfully', token });
  } catch (error) {
    console.error('Authentication error:', error);
    // Map specific errors to user-friendly messages
    let errorMessage = 'Authentication failed';
    if (error.message === 'User not found' || error.message === 'Incorrect password') {
      errorMessage = error.message;
    } else if (error.isJoi) {
      errorMessage = 'Invalid email or password format';
    }
    res.status(401).json({ error: errorMessage });
  }
}

export { register, login };
