"use client";

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase'; // relative path

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <Image src="/logo.svg" alt="VoxScribe Logo" width={100} height={100} className="mx-auto" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Let's get started with VoxScribe</h1>
        <p className="text-gray-600 mb-8">
          VoxScribe makes transcribing effortless. So you can transcribe, maintain and share great transcriptions fast!
        </p>

        <div className="space-y-4">
          <button
            onClick={() => {
              const provider = new GoogleAuthProvider();
              signInWithPopup(auth, provider)
                .then(() => router.push('/dashboard'))
                .catch(err => console.error(err));
            }}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg p-3"
          >
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
            Continue with Google
          </button>

          <Link href="/login/email" className="flex items-center justify-center w-full bg-black text-white rounded-lg p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Continue with Email
          </Link>
        </div>

        <p className="mt-6 text-sm">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Sign In</Link>
        </p>

        <p className="mt-10 text-xs text-gray-500">
          By creating an account you agree to the 
          <Link href="/terms" className="text-blue-600 hover:underline mx-1">Terms of Service</Link>
          and
          <Link href="/privacy" className="text-blue-600 hover:underline ml-1">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
