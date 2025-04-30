// components/auth/RegisterForm.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await createUserWithEmailAndPassword(auth, email, 'tempPassword'); // You'll need to modify this to include a proper password field
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to create account. Email might be already in use.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to sign up with Google.');
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
      
      {/* Right Section - Register Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-2/3">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          
          <form onSubmit={handleEmailSignUp}>
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
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          
          <div className="text-center my-2">
            <p>
              Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign In</Link>
            </p>
          </div>
          
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full border border-gray-300 rounded p-3 flex items-center justify-center mt-4"
          >
            <img src="/google-icon.svg" alt="Google" className="h-5 mr-2" />
            Continue with Google
          </button>
          
          <div className="text-center text-xs mt-6">
            <p>
              By creating an account you agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;