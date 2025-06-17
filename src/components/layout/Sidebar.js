'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import ProfileDrawer from '@/components/dashboard/ProfileDrawer';

// VoxScribe Logo Component
const VoxScribeLogo = () => (
  <motion.div 
    className="flex items-center mb-8"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
        <path d="M9 2C7.9 2 7 2.9 7 4v12c0 1.1.9 2 2 2h1v3h2v-3h1c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H9zm0 2h4v12H9V4z"/>
        <path d="M12 6h1v2h-1V6zm0 3h1v2h-1V9zm0 3h1v2h-1v-2z"/>
        <circle cx="18" cy="8" r="3"/>
        <path d="M15.5 8c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5z"/>
      </svg>
    </div>
    <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      VoxScribe
    </span>
  </motion.div>
);

const Sidebar = ({ onSelectTranscription }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [transcriptions, setTranscriptions] = useState([]);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const authInstance = getAuth();
    const user = authInstance.currentUser;
    if (!user) return;

    const db = getFirestore();
    const transcriptionsRef = collection(db, 'users', user.uid, 'transcriptions');
    const q = query(transcriptionsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          const transcript = data.transcript || '';
          const preview = data.previewText || transcript;

          return {
            id: doc.id,
            previewText:
              preview.split(' ').slice(0, 5).join(' ') + (preview ? '...' : ''),
            hasTranscript: !!transcript.trim(),
            createdAt: data.createdAt
          };
        })
        .filter((item) => item.hasTranscript);

      setTranscriptions(items);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const authInstance = getAuth();
      const user = authInstance.currentUser;
      if (!user) return;

      const db = getFirestore();
      const docRef = doc(db, 'users', user.uid, 'transcriptions', id);
      await deleteDoc(docRef);
      setTranscriptions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete transcription:', err);
    }
  };

  return (
    <motion.div 
      className="w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 h-screen flex flex-col py-8 px-6 text-white shadow-2xl border-r border-gray-700/50"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
      <VoxScribeLogo />

      {/* Navigation */}
      <motion.nav 
        className="mb-8 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <SidebarLink href="/dashboard" pathname={pathname} icon="home" label="Dashboard" />
        <motion.button
          onClick={() => setShowProfileDrawer(true)}
          className="flex items-center gap-3 p-3 text-sm w-full text-left hover:bg-white/10 rounded-xl transition-all duration-300 group backdrop-blur-sm"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
            <SidebarIcon icon="user" />
          </div>
          <span className="font-medium">Profile</span>
        </motion.button>
      </motion.nav>

      {/* Transcription History */}
      <div className="flex-1 overflow-hidden border-t border-gray-700/50 pt-6">
        <motion.h4 
          className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your Transcriptions
        </motion.h4>
        
        <div className="overflow-y-auto h-full custom-scrollbar">
          {transcriptions.length === 0 ? (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">No transcriptions yet</p>
              <p className="text-gray-600 text-xs mt-1">Upload an audio file to get started</p>
            </motion.div>
          ) : (
            <motion.ul 
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatePresence>
                {transcriptions.map((item, index) => (
                  <motion.li 
                    key={item.id}
                    className="group relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <motion.button
                      onClick={() => onSelectTranscription(item.id)}
                      className="block w-full text-left p-3 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate font-medium">
                            {item.previewText}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {item.createdAt?.toDate?.()?.toLocaleDateString() || 'Recent'}
                          </p>
                        </div>
                        
                        <motion.button
                          onClick={(e) => handleDelete(item.id, e)}
                          className={`ml-2 p-1.5 rounded-lg transition-all duration-200 ${
                            hoveredItem === item.id 
                              ? 'bg-red-500/20 text-red-400 opacity-100' 
                              : 'text-gray-500 opacity-0 group-hover:opacity-100'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete transcription"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </motion.button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </div>

      {/* Sign out */}
      <motion.div 
        className="mt-6 border-t border-gray-700/50 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button 
          onClick={handleSignOut} 
          className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors duration-300 text-sm font-medium p-3 rounded-xl hover:bg-red-500/10 w-full"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </motion.button>
      </motion.div>

      {/* Profile Drawer Modal */}
      <ProfileDrawer open={showProfileDrawer} onClose={() => setShowProfileDrawer(false)} />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #8b5cf6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #7c3aed);
        }
      `}</style>
    </motion.div>
  );
};

const SidebarLink = ({ href, pathname, icon, label }) => {
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <motion.div
        className={`flex items-center gap-3 p-3 text-sm rounded-xl transition-all duration-300 group ${
          isActive 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg' 
            : 'hover:bg-white/10 backdrop-blur-sm'
        }`}
        whileHover={{ x: isActive ? 0 : 5 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
          isActive 
            ? 'bg-white/20 shadow-lg' 
            : 'bg-gradient-to-br from-indigo-500 to-purple-500 group-hover:shadow-lg'
        }`}>
          <SidebarIcon icon={icon} />
        </div>
        <span className="font-medium">{label}</span>
      </motion.div>
    </Link>
  );
};

const SidebarIcon = ({ icon }) => {
  const icons = {
    home: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    user: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  };

  return icons[icon] || null;
};

export default Sidebar;