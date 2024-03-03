
import { Request, Response } from 'express';
import { registerUser, authenticateUser } from '../../models/user.model';

async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;
  try {
    const newUser = await registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
}

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const token = await authenticateUser(email, password);
    res.json({ message: 'User authenticated successfully', token });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Failed to authenticate user' });
  }
}

export { register, login };
