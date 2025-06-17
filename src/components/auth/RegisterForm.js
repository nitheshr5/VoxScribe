// components/auth/RegisterForm.js
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import bcrypt from 'bcryptjs';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeInOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeInOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeInOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// VoxScribe Logo Component
const VoxScribeLogo = () => (
  <motion.div 
    className="flex items-center justify-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
        <path d="M9 2C7.9 2 7 2.9 7 4v12c0 1.1.9 2 2 2h1v3h2v-3h1c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H9zm0 2h4v12H9V4z"/>
        <path d="M12 6h1v2h-1V6zm0 3h1v2h-1V9zm0 3h1v2h-1v-2z"/>
        <circle cx="18" cy="8" r="3"/>
        <path d="M15.5 8c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5z"/>
      </svg>
    </div>
    <span className="font-bold text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      VoxScribe
    </span>
  </motion.div>
);

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Password confirmation check
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the main user profile with tokens + tracking fields
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
        tokens: 5000,
        totalTranscriptions: 0,
        wordsTranscribed: 0,
      });

      // Create subcollection for credentials (optional)
      const credentialsRef = doc(collection(db, 'users', user.uid, 'credentials'));
      await setDoc(credentialsRef, {
        email: user.email,
        hashedPassword,
        createdAt: serverTimestamp(),
      });


      router.push('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Email is already registered.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user profile with tokens + tracking fields
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        tokens: 5000,
        totalTranscriptions: 0,
        wordsTranscribed: 0,
      });

      router.push('/dashboard');
    } catch (err) {
      console.error('Google signup error:', err);
      setError('Failed to sign up with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Left Section - Logo & Branding */}
      <motion.div 
        className="w-1/2 flex flex-col items-center justify-center relative"
        variants={fadeInLeft}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="text-center z-10"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <VoxScribeLogo />
          </motion.div>
          
          <motion.div 
            className="mt-8 space-y-4"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-semibold text-gray-700">
              Join VoxScribe today
            </h2>
            <p className="text-lg text-gray-600 max-w-md">
              Start transforming your audio into text with AI-powered precision
            </p>
          </motion.div>

          <motion.div 
            className="mt-8 space-y-4"
            variants={fadeInUp}
          >
            <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
              <p className="text-sm text-emerald-600 font-semibold mb-2">
                🎉 New User Bonus
              </p>
              <p className="text-sm text-gray-700">
                Get <span className="font-bold text-emerald-600">5,000 free tokens</span> to start transcribing immediately
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-indigo-200/30">
              <p className="text-xs text-indigo-700 font-medium">
                ⚡ Premium offer: 40 hours of transcription for just $1
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Right Section - Register Form */}
      <motion.div 
        className="w-1/2 flex items-center justify-center relative"
        variants={fadeInRight}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="w-full max-w-md p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20"
          variants={staggerContainer}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Sign up to get started with VoxScribe</p>
          </motion.div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </motion.div>
          )}
          
          <motion.form onSubmit={handleEmailSignUp} variants={staggerContainer}>
            <motion.div className="mb-6" variants={fadeInUp}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>
            
            <motion.div className="mb-6" variants={fadeInUp}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>

            <motion.div className="mb-6" variants={fadeInUp}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </motion.div>
            
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              variants={fadeInUp}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </motion.form>
          
          <motion.div className="text-center my-6" variants={fadeInUp}>
            <div className="flex items-center mb-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            
            <motion.button
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full border-2 border-gray-200 rounded-xl p-4 flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed bg-white/70 backdrop-blur-sm"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Please wait...' : 'Continue with Google'}
            </motion.button>
          </motion.div>
          
          <motion.div className="text-center space-y-3" variants={fadeInUp}>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors duration-300">
                Sign In
              </Link>
            </p>
            
            <p className="text-xs text-gray-500 leading-relaxed">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors duration-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700 hover:underline transition-colors duration-300">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;