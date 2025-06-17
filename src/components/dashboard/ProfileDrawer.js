'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { getAuth, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import BuyCoins from '@/components/dashboard/BuyCoins';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProfileDrawer = ({ open, onClose, onProfileUpdated }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBuyCoins, setShowBuyCoins] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) return;

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
      toast.success('Profile updated!');
      if (onProfileUpdated) onProfileUpdated();
      onClose();
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Update failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    const confirmed = confirm('Are you sure? This will permanently delete your account.');
    if (!confirmed) return;

    try {
      await deleteUser(user);
      toast.success('Account deleted.');
      onClose();
    } catch (err) {
      toast.error('Re-authentication needed before deletion.');
      console.error(err);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md">
                  <motion.div 
                    className="bg-gradient-to-br from-white to-slate-50 shadow-2xl h-full relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Animated background elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
                    <div className="absolute bottom-20 left-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -translate-x-12 opacity-40"></div>
                    
                    <div className="relative z-10 p-8 h-full flex flex-col">
                      {/* Header */}
                      <motion.div 
                        className="flex items-center justify-between mb-8"
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                      >
                        <div>
                          <Dialog.Title className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Your Profile
                          </Dialog.Title>
                          <p className="text-sm text-gray-500 mt-1">Manage your account settings</p>
                        </div>
                        <motion.button
                          onClick={onClose}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </motion.div>

                      {/* Profile Form */}
                      <motion.div 
                        className="flex-1 space-y-6"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                      >
                        {/* Email Display */}
                        <motion.div variants={fadeInUp}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-600">
                            {email}
                          </div>
                        </motion.div>

                        {/* Name Input */}
                        <motion.div variants={fadeInUp}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </motion.div>

                        {/* Occupation Input */}
                        <motion.div variants={fadeInUp}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                          <input
                            type="text"
                            placeholder="What do you do?"
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                          />
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div className="space-y-4" variants={fadeInUp}>
                          <motion.button
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                            onClick={handleSave}
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {loading ? (
                              <div className="flex items-center justify-center">
                                <motion.div 
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                Saving...
                              </div>
                            ) : (
                              'Save Changes'
                            )}
                          </motion.button>

                          <motion.button
                            onClick={() => setShowBuyCoins(true)}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              Buy Coins
                            </div>
                          </motion.button>
                        </motion.div>

                        {/* Danger Zone */}
                        <motion.div 
                          className="pt-8 border-t border-gray-200"
                          variants={fadeInUp}
                        >
                          {/* <h3 className="text-sm font-medium text-gray-700 mb-4">Danger Zone</h3> */}
                          <motion.button
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={handleDelete}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center justify-center">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete My Account
                            </div>
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>

        {/* Buy Coins Modal */}
        {showBuyCoins && (
          <BuyCoins
            onClose={() => setShowBuyCoins(false)}
            onPurchaseSuccess={(newTokenCount) => {
              toast.success('Coins purchased!');
              setShowBuyCoins(false);
            }}
          />
        )}
      </Dialog>
    </Transition>
  );
};

export default ProfileDrawer;