// components/auth/LoginForm.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to sign in with Google.');
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
      
      {/* Right Section - Login Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-2/3">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          
          <form onSubmit={handleEmailLogin}>
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
            
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded p-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white rounded p-3 mb-2"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="text-center my-2">
            <p>
              Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Sign Up</Link>
            </p>
            <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
          </div>
          
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full border border-gray-300 rounded p-3 flex items-center justify-center mt-4"
          >
            <img src="/google-icon.svg" alt="Google" className="h-5 mr-2" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;