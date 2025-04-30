// components/dashboard/FileUploader.js
import React, { useState, useRef } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const FileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile) => {
    // Check file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'video/mp4', 'video/mpeg'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a valid audio or video file (MP3, WAV, MP4, MPEG)');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const uploadAndTranscribe = async () => {
    if (!file) return;

    setIsUploading(true);
    setError('');
    
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        setError('You must be logged in to upload files');
        setIsUploading(false);
        return;
      }

      // Upload file to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `uploads/${user.uid}/${Date.now()}_${file.name}`);
      
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error('Upload error:', error);
          setError('Error uploading file');
          setIsUploading(false);
        },
        async () => {
          // Upload completed successfully
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Send to transcription backend
          const response = await fetch('/transcribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileUrl: downloadURL }),
          });
          
          const data = await response.json();
          
          if (data.error) {
            setError(data.error);
          } else {
            setTranscription(data.transcription);
            
            // Save to Firestore
            const db = getFirestore();
            await addDoc(collection(db, 'transcriptions'), {
              userId: user.uid,
              fileName: file.name,
              fileUrl: downloadURL,
              transcription: data.transcription,
              createdAt: serverTimestamp(),
            });
          }
          
          setFile(null);
          setProgress(0);
          setIsUploading(false);
        }
      );
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred');
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8">
      <div className="text-center mb-8">
        <img src="/logo.svg" alt="VoxScribe Logo" className="h-16 mx-auto mb-2" />
        <h1 className="text-2xl font-bold">VoxScribe</h1>
      </div>
      
      <p className="text-center text-gray-500 mb-4">
        Supports MP3, M4A, MPEG and WAV file
      </p>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition duration-300 ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept="audio/*, video/*"
        />
        
        <div className="flex items-center justify-center">
          <span className="mr-2">
            {file ? file.name : 'Drag and drop or select a file to upload'}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
          </svg>
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 mt-2 text-center">
          {error}
        </div>
      )}
      
      {file && !isUploading && (
        <div className="mt-4 text-center">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg"
            onClick={uploadAndTranscribe}
          >
            Transcribe
          </button>
        </div>
      )}
      
      {isUploading && (
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">
            {progress < 100 ? 'Uploading...' : 'Processing transcription...'}
          </p>
        </div>
      )}
      
      {transcription && (
        <div className="mt-8 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Transcription</h2>
          <p className="whitespace-pre-wrap">{transcription}</p>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-gray-200 text-gray-800 px-4 py-1 rounded-lg text-sm"
              onClick={() => {
                const element = document.createElement('a');
                const file = new Blob([transcription], {type: 'text/plain'});
                element.href = URL.createObjectURL(file);
                element.download = 'transcription.txt';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
            >
              Download
            </button>
          </div>
        </div>
      )}
      
      <p className="text-center text-xs text-gray-500 mt-6">
        VoxScribe may make errors, so please double-check important details. Also, it only supports English currently.
      </p>
    </div>
  );
};

export default FileUploader;