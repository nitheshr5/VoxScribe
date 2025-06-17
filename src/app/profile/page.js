'use client';

import { useEffect, useState } from 'react';
import { getAuth, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      router.push('/');
      return;
    }

    setUser(currentUser);
    setEmail(currentUser.email);

    const fetchProfile = async () => {
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || '');
        setOccupation(data.occupation || '');
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name,
        occupation,
        profileCompleted: true,
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    );
    if (!confirmDelete) return;

    try {
      await deleteUser(user);
      alert('Your account has been deleted.');
      router.push('/');
    } catch (err) {
      console.error('Failed to delete account:', err);
      alert('Account deletion failed. Please re-login and try again.');
    }
  };

  const handleBuyCoins = () => {
    router.push('/buycoins');
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold">Your Profile</h2>

      <div className="text-sm text-gray-600">Email: {email}</div>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Occupation"
        className="w-full p-2 border rounded"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>

      <button
        onClick={handleBuyCoins}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Buy Coins
      </button>

      <button
        onClick={handleDeleteAccount}
        className="bg-red-600 text-white px-4 py-2 rounded w-full"
      >
        Delete My Account
      </button>
    </div>
  );
}
