import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/:id', auth, async (req, res) => {
  try {
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to access this user data' });
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});

// Update user
router.patch('/:id', auth, async (req, res) => {
  try {
    const { monthlySalary } = req.body;
    
    if (req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    if (monthlySalary !== undefined && monthlySalary < 0) {
      return res.status(400).json({ message: 'Salary cannot be negative' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { monthlySalary: Number(monthlySalary) } },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

export default router;