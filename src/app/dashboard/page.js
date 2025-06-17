'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import FileUploader from '@/components/dashboard/FileUploader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import BuyCoins from '@/components/dashboard/BuyCoins';
import TranscriptionViewer from '@/components/dashboard/TranscriptionViewer';
import Sidebar from '@/components/layout/Sidebar';
import ProfileDrawer from '@/components/dashboard/ProfileDrawer';
import ProfileModal from '@/components/dashboard/ProfileModal';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showBuyCoins, setShowBuyCoins] = useState(false);
  const [selectedTranscriptionId, setSelectedTranscriptionId] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchUserProfile = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const userDocRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      setUserProfile(data);
      setTokens(data.tokens || 0);

      if (!data.profileCompleted) {
        setShowProfileModal(true);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/');
        return;
      }

      setUser(currentUser);
      await fetchUserProfile();
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const updateTokenCount = (newCount) => setTokens(newCount);

  const handleSelectTranscription = (id) => {
    setSelectedTranscriptionId(id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <motion.div 
          className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar onSelectTranscription={handleSelectTranscription} />

      <main className="flex-1 overflow-y-auto">
        {/* Header Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-6 shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center">
            <motion.div variants={fadeInRight}>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome back, {userProfile?.name || user.displayName?.split(' ')[0] || 'User'}! 👋
              </h1>
              <p className="text-gray-600 mt-1">Ready to transcribe some audio today?</p>
            </motion.div>
            
            <motion.div 
              className="flex gap-3"
              variants={fadeInRight}
              initial="initial"
              animate="animate"
            >
              <motion.button
                onClick={() => setIsDrawerOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Edit Profile
              </motion.button>
              <motion.button 
                onClick={handleLogout} 
                className="text-red-600 hover:text-red-800 px-4 py-3 rounded-full border border-red-200 hover:bg-red-50 transition-all duration-300 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="p-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            {/* Dashboard Stats */}
            <motion.div variants={fadeInUp}>
              <DashboardStats tokens={tokens} />
            </motion.div>

            {/* Buy Coins Section */}
            <motion.div 
              className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Need More Credits?</h3>
                  <p className="text-gray-600">Get more transcription minutes with our affordable packages</p>
                </div>
                <motion.button
                  onClick={() => setShowBuyCoins(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Buy Credits
                </motion.button>
              </div>
            </motion.div>

            {/* File Uploader */}
            <motion.div variants={fadeInUp}>
              <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  Upload & Transcribe
                </h2>
                <FileUploader onTokensUpdate={updateTokenCount} />
              </div>
            </motion.div>

            {/* Transcription Viewer */}
            {selectedTranscriptionId && (
              <motion.div 
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 relative"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <motion.button
                  onClick={() => setSelectedTranscriptionId(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 bg-gray-100 hover:bg-red-50 rounded-full p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Transcription Result
                </h3>
                <TranscriptionViewer transcriptionId={selectedTranscriptionId} />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Profile Drawer */}
        <ProfileDrawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onProfileUpdated={fetchUserProfile}
        />

        {/* Initial Profile Completion Modal */}
        {showProfileModal && user && (
          <ProfileModal
            user={user}
            onComplete={() => {
              setShowProfileModal(false);
              setShowBuyCoins(true);
            }}
          />
        )}

        {/* Buy Coins Modal */}
        {showBuyCoins && (
          <BuyCoins
            user={user}
            onClose={() => setShowBuyCoins(false)}
            onPurchaseSuccess={(newTokenCount) => {
              updateTokenCount(newTokenCount);
              setShowBuyCoins(false);
            }}
          />
        )}
      </main>
    </div>
  );
}