// Enhanced File Uploader Component
'use client';

import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';

const FileUploader = ({ onTokensUpdate }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setTranscription('');

    try {
      const user = auth.currentUser;
      const storageRef = ref(storage, `uploads/${user.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const idToken = await user.getIdToken();

      const response = await fetch('http://localhost:8000/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ fileUrl: downloadURL }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setTranscription(data.transcription);
      onTokensUpdate(data.tokensRemaining);

      const docRef = doc(db, 'users', user.uid, 'transcriptions', Date.now().toString());
      await setDoc(docRef, {
        transcript: data.transcription,
        previewText: data.transcription.split(' ').slice(0, 5).join(' '),
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Transcription error:', error.message);
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <motion.h2 
          className="text-2xl font-bold text-white flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="mr-3 text-3xl">🎵</span>
          Audio & Video Transcription
        </motion.h2>
        <p className="text-indigo-100 mt-2">Upload your files and get AI-powered transcriptions instantly</p>
      </div>

      <div className="p-6">
        {/* File Upload Area */}
        <motion.div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <input 
            type="file" 
            accept="audio/*,video/*" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-upload"
          />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </motion.div>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {file ? 'File Selected!' : 'Drop your files here'}
          </h3>
          <p className="text-gray-600 mb-4">
            {file ? `${file.name} (${formatFileSize(file.size)})` : 'or click to browse'}
          </p>
          <p className="text-sm text-gray-500">Supports: MP3, WAV, MP4, MOV, AVI and more</p>
        </motion.div>

        {/* File Info */}
        {file && (
          <motion.div 
            className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-green-800">{file.name}</p>
                <p className="text-sm text-green-600">Size: {formatFileSize(file.size)}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Upload Button */}
        <motion.button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`w-full mt-6 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            uploading || !file
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
          }`}
          whileHover={!uploading && file ? { scale: 1.02 } : {}}
          whileTap={!uploading && file ? { scale: 0.98 } : {}}
        >
          {uploading ? (
            <div className="flex items-center justify-center">
              <motion.div 
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Processing your file...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="mr-2">🚀</span>
              Start Transcription
            </div>
          )}
        </motion.button>

        {/* Transcription Result */}
        {transcription && (
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <motion.h3 
                className="font-bold text-lg text-green-800 mb-4 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="mr-2">✨</span>
                Transcription Complete!
              </motion.h3>
              
              <motion.div 
                className="bg-white rounded-xl p-4 max-h-96 overflow-y-auto shadow-inner border border-green-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="space-y-4 text-sm leading-relaxed">
                  {transcription
                    .split(/(?<=[.?!])\s+/)
                    .filter(sentence => sentence.trim())
                    .map((sentence, idx) => (
                      <motion.div 
                        key={idx}
                        className="flex"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <div className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${
                          idx % 2 === 0 ? 'bg-indigo-400' : 'bg-purple-400'
                        }`}></div>
                        <div>
                          <span className={`font-semibold text-xs uppercase tracking-wide ${
                            idx % 2 === 0 ? 'text-indigo-600' : 'text-purple-600'
                          }`}>
                            Speaker {(idx % 2) + 1}:
                          </span>
                          <p className="text-gray-800 mt-1">{sentence.trim()}</p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-wrap gap-3 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center">
                  <span className="mr-2">📄</span>
                  Export PDF
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300 flex items-center">
                  <span className="mr-2">📝</span>
                  Export DOC
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(transcription)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center"
                >
                  <span className="mr-2">📋</span>
                  Copy Text
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FileUploader;