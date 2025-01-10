import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PieChart, DollarSign, FileText, TrendingUp, Shield, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    icon: <PieChart className="h-8 w-8 text-primary-600" />,
    title: 'Smart Analytics',
    description: 'Visualize spending patterns with interactive charts',
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary-600" />,
    title: 'Budget Control',
    description: 'Set and track budgets with real-time updates',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary-600" />,
    title: 'Detailed Reports',
    description: 'Generate professional PDF expense reports',
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary-600" />,
    title: 'Growth Tracking',
    description: 'Monitor your financial growth over time',
  },
  {
    icon: <Shield className="h-8 w-8 text-primary-600" />,
    title: 'Secure Data',
    description: 'Your financial data is always protected',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary-600" />,
    title: 'Real-time Updates',
    description: 'Instant sync across all your devices',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  const handleSignIn = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.100),white)] dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.900),theme(colors.gray.900))] opacity-20" />
          
          <motion.div 
            className="mx-auto max-w-7xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Smart Money Management
              <span className="block text-primary-600">Made Simple</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Take control of your finances with our intelligent expense tracking solution.
              Monitor spending, achieve goals, and grow your wealth.
            </motion.p>

            <motion.div 
              className="mt-10 flex items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="group relative overflow-hidden rounded-full px-8 py-4 transition-transform hover:scale-105"
              >
                {user ? 'Go to Dashboard' : 'Get Started Free'}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              {!user && (
                <Button 
                  onClick={handleSignIn}
                  variant="outline" 
                  size="lg"
                  className="rounded-full px-8 py-4 transition-transform hover:scale-105"
                >
                  Sign In
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
              >
                <div className="mb-4 inline-block rounded-lg bg-primary-50 p-3 dark:bg-primary-900/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}