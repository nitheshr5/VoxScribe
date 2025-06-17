import React, { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query as firestoreQuery,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '../common/Spinner';

const TranscriptionsList = () => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [deleteLoading, setDeleteLoading] = useState('');

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  const fetchTranscriptions = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError('You must be logged in to view transcriptions');
        setLoading(false);
        return;
      }

      const db = getFirestore();
      const q = firestoreQuery(
        collection(db, 'transcriptions'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const transcriptionsData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const tokenCost = Math.ceil((data.transcription?.length || 0) / 5);

        transcriptionsData.push({
          id: doc.id,
          ...data,
          tokenCost,
          createdAt: data.createdAt?.toDate() || new Date(),
        });
      });

      setTranscriptions(transcriptionsData);
    } catch (err) {
      console.error('Error fetching transcriptions:', err);
      setError('Failed to fetch transcriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this transcription?')) return;

    setDeleteLoading(id);
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'transcriptions', id));
      setTranscriptions(transcriptions.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error deleting transcription:', err);
      alert('Failed to delete transcription');
    } finally {
      setDeleteLoading('');
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext)) {
      return '🎵';
    } else if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) {
      return '🎬';
    }
    return '📄';
  };

  const filteredTranscriptions = transcriptions.filter((t) =>
    t.fileName.toLowerCase().includes(query.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  const searchVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 font-medium">Loading your transcriptions...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center">
          <div className="text-red-500 text-2xl mr-3">⚠️</div>
          <div>
            <h3 className="text-red-800 font-semibold">Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Your Transcriptions
        </h2>
        <p className="text-gray-600">Manage and view all your audio transcriptions</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        className="relative max-w-md"
        variants={searchVariants}
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search transcriptions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
        />
      </motion.div>

      {/* Transcriptions Grid */}
      <AnimatePresence mode="popLayout">
        {filteredTranscriptions.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No transcriptions found</h3>
            <p className="text-gray-500">
              {query ? 'Try adjusting your search terms' : 'Upload your first audio file to get started'}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid gap-6"
            variants={containerVariants}
          >
            {filteredTranscriptions.map((transcription, index) => (
              <motion.div
                key={transcription.id}
                className="group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-indigo-200"
                variants={itemVariants}
                layout
                whileHover={{ y: -2 }}
                exit="exit"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-xl"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {getFileIcon(transcription.fileName)}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors">
                        {transcription.fileName}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDate(transcription.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link href={`/transcriptions/${transcription.id}`}>
                      <motion.div
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </motion.div>
                    </Link>
                    <motion.button
                      onClick={() => handleDelete(transcription.id)}
                      disabled={deleteLoading === transcription.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {deleteLoading === transcription.id ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Token Usage */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Tokens used: <span className="font-semibold text-indigo-600">{transcription.tokenCost}</span>
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Completed
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {transcription.transcription?.substring(0, 200)}
                    {transcription.transcription?.length > 200 ? '...' : ''}
                  </p>
                </div>

                {/* Action Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {transcription.transcription?.length || 0} characters
                  </div>
                  <Link href={`/transcriptions/${transcription.id}`}>
                    <motion.span
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      View Details →
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TranscriptionsList;