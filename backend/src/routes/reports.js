import express from 'express';
import auth from '../middleware/auth.js';
import Expense from '../models/Expense.js';
import User from '../models/User.js';

const router = express.Router();

// Get expense report
router.get('/:type', auth, async (req, res) => {
  try {
    const { type } = req.params;
    const userId = req.user.id;
    let startDate;
    const now = new Date();

    // Get date range based on report type
    if (type === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (type === 'yearly') {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else {
      return res.status(400).json({ message: 'Invalid report type' });
    }

    // Get user data
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get expenses for the period
    const expenses = await Expense.find({
      userId,
      date: { $gte: startDate, $lte: now }
    }).sort({ date: -1 });

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.json({
      period: type === 'monthly' ? 'Monthly' : 'Yearly',
      user,
      totalExpenses,
      expenses,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Generate report error:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
});

// Get expense analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get all expenses for the current month
    const expenses = await Expense.find({
      userId,
      date: { $gte: startOfMonth, $lte: now }
    });

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Get unique categories
    const categories = [...new Set(expenses.map(exp => exp.category))];

    // Calculate category breakdown
    const categoryBreakdown = categories.reduce((acc, category) => {
      const categoryExpenses = expenses.filter(exp => exp.category === category);
      const total = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      const percentage = (total / totalExpenses) * 100;

      acc[category] = {
        total,
        percentage
      };

      return acc;
    }, {});

    // Calculate daily expenses
    const dailyExpenses = expenses.reduce((acc, exp) => {
      const date = exp.date.toISOString().split('T')[0];
      const existing = acc.find(item => item.date === date);
      
      if (existing) {
        existing.amount += exp.amount;
      } else {
        acc.push({ date, amount: exp.amount });
      }

      return acc;
    }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    res.json({
      totalExpenses,
      categories,
      categoryBreakdown,
      dailyExpenses
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Error getting analytics' });
  }
});

export default router;