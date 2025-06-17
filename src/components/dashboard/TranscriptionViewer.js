// TranscriptionViewer.js
import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

const TranscriptionViewer = ({ transcriptionId }) => {
  const [transcription, setTranscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleOnHover = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  };

  const buttonHover = {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 10 }
  };

  const handleCopyToClipboard = async () => {
    if (!transcription?.transcript) return;
    
    try {
      await navigator.clipboard.writeText(transcription.transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadTxt = () => {
    if (!transcription?.transcript) return;
    const element = document.createElement('a');
    const file = new Blob([transcription.transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${transcription.fileName || 'transcription'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPdf = () => {
    if (!transcription?.transcript) return;
    const docPdf = new jsPDF();
    
    // Add title
    docPdf.setFontSize(16);
    docPdf.setFont(undefined, 'bold');
    docPdf.text(`VoxScribe Transcription`, 20, 20);
    
    if (transcription.fileName) {
      docPdf.setFontSize(12);
      docPdf.setFont(undefined, 'normal');
      docPdf.text(`File: ${transcription.fileName}`, 20, 30);
    }
    
    if (transcription.createdAt) {
      const date = new Date(transcription.createdAt.seconds * 1000).toLocaleDateString();
      docPdf.text(`Date: ${date}`, 20, 40);
    }
    
    // Add content
    docPdf.setFontSize(10);
    const lines = docPdf.splitTextToSize(transcription.transcript, 170);
    docPdf.text(lines, 20, 55);
    
    docPdf.save(`${transcription.fileName || 'transcription'}.pdf`);
  };

  useEffect(() => {
    const fetchTranscription = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user || !transcriptionId) {
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid, 'transcriptions', transcriptionId);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setTranscription(snapshot.data());
        } else {
          setTranscription(null);
        }
      } catch (error) {
        console.error('Error fetching transcription:', error);
        setTranscription(null);
      }

      setLoading(false);
    };

    fetchTranscription();
  }, [transcriptionId]);

  if (loading) {
    return (
      <motion.div 
        className="flex items-center justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mr-3"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <span className="text-gray-600 font-medium">Loading transcription...</span>
      </motion.div>
    );
  }

  if (!transcription) {
    return (
      <motion.div 
        className="text-center py-12"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Content Found</h3>
        <p className="text-gray-600">The requested transcription could not be found.</p>
      </motion.div>
    );
  }

  const createdDate = transcription.createdAt 
    ? new Date(transcription.createdAt.seconds * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null;

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      {...scaleOnHover}
    >
      {/* Header */}
      <motion.div 
        className="mb-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="flex items-center mb-4"
          variants={fadeInUp}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Transcription Results
            </h2>
            {transcription.fileName && (
              <p className="text-gray-600 mt-1">
                <span className="font-medium">File:</span> {transcription.fileName}
              </p>
            )}
            {createdDate && (
              <p className="text-sm text-gray-500 mt-1">{createdDate}</p>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-wrap gap-3"
          variants={fadeInUp}
        >
          <motion.button
            onClick={handleDownloadTxt}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            {...buttonHover}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download TXT
          </motion.button>

          <motion.button
            onClick={handleDownloadPdf}
            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            {...buttonHover}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Download PDF
          </motion.button>

          <motion.button
            onClick={handleCopyToClipboard}
            className={`${
              copied 
                ? 'bg-gradient-to-r from-green-500 to-green-400' 
                : 'bg-gradient-to-r from-purple-600 to-purple-500'
            } text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center`}
            {...buttonHover}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              )}
            </svg>
            {copied ? 'Copied!' : 'Copy Text'}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Transcription Content */}
      <motion.div 
        className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6"
        variants={fadeInUp}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          Transcript
        </h3>
        
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 max-h-96 overflow-y-auto">
          {transcription?.transcript ? (
            <motion.div 
              className="space-y-4 text-gray-700 leading-relaxed"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {transcription.transcript
                .split(/(?<=[.?!])\s+/)
                .filter(sentence => sentence.trim().length > 0)
                .map((sentence, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      idx % 2 === 0 ? 'bg-indigo-500' : 'bg-purple-500'
                    }`} />
                    <div>
                      <span className={`font-semibold ${
                        idx % 2 === 0 ? 'text-indigo-600' : 'text-purple-600'
                      }`}>
                        Speaker {idx % 2 === 0 ? '1' : '2'}:
                      </span>
                      <span className="ml-2 text-gray-700">{sentence.trim()}</span>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-500">No transcription content available.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats Footer */}
      {transcription?.transcript && (
        <motion.div 
          className="mt-6 flex justify-between items-center text-sm text-gray-500 bg-gray-50 rounded-lg p-4"
          variants={fadeInUp}
        >
          <div className="flex items-center space-x-4">
            <span>
              <strong className="text-indigo-600">{transcription.transcript.split(' ').length}</strong> words
            </span>
            <span>
              <strong className="text-purple-600">{transcription.transcript.length}</strong> characters
            </span>
          </div>
          <div className="flex items-center text-green-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Transcription Complete
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TranscriptionViewer;