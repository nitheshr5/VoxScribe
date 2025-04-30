// components/dashboard/TranscriptionsList.js
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import Spinner from '../common/Spinner';

const TranscriptionsList = () => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      const q = query(
        collection(db, 'transcriptions'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const transcriptionsData = [];
      
      querySnapshot.forEach((doc) => {
        transcriptionsData.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
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
    if (!confirm('Are you sure you want to delete this transcription?')) {
      return;
    }
    
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'transcriptions', id));
      
      // Update the state to remove the deleted transcription
      setTranscriptions(transcriptions.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting transcription:', err);
      alert('Failed to delete transcription');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (transcriptions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No transcriptions found. Upload an audio or video file to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Your Transcriptions</h2>
      
      {transcriptions.map((transcription) => (
        <div key={transcription.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{transcription.fileName}</h3>
              <p className="text-sm text-gray-500">{formatDate(transcription.createdAt)}</p>
            </div>
            
            <div className="flex space-x-2">
              <Link href={`/transcriptions/${transcription.id}`}>
                <a className="text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </a>
              </Link>
              
              <button
                onClick={() => handleDelete(transcription.id)}
                className="text-red-600 hover:text-red-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-gray-700 line-clamp-2">
              {transcription.transcription.substring(0, 150)}
              {transcription.transcription.length > 150 ? '...' : ''}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TranscriptionsList;