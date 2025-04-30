// components/auth/ForgotPasswordForm.js
import React, { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link has been sent to your email!');
    } catch (err) {
      setError('Failed to send password reset email. Please check if the email is correct.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Logo */}
      <div className="w-1/2 flex items-center justify-center border-r">
        <div className="text-center">
          <div className="mb-4">
            <img src="/logo.svg" alt="VoxScribe Logo" className="h-24 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold">VoxScribe</h1>
        </div>
      </div>
      
      {/* Right Section - Forgot Password Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-2/3">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
          
          <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
          <p className="mb-4 text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
          
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full border border-gray-300 rounded p-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white rounded p-3 mb-2"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          
          <div className="text-center mt-4">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;