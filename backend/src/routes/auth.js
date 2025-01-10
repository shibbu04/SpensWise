import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, monthlySalary, mobileNumber } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      monthlySalary: Number(monthlySalary),
      mobileNumber
    });

    await user.save();
    
    // Return user data without password
    const userData = {
      id: user._id,
      email: user.email,
      fullName: user.fullName
    };

    res.status(201).json({ message: 'User created successfully', user: userData });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);
    
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        fullName: user.fullName
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // console.log('Token generated:', token); // Debug log

    // Return user data and token
    const userData = {
      id: user._id,
      email: user.email,
      fullName: user.fullName
    };

    console.log('Sending response with token and user:', { userData, hasToken: !!token });

    return res.status(200).json({
      success: true,
      token: token,
      user: userData
    });
  } catch (error) {
    console.error('Login error details:', error);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

export default router;