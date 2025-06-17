"use client";
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuthContext } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
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

const DashboardStats = () => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState({
    coins: 0,
    total: 0,
    words: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStats({
          coins: data.tokens || 0,
          total: data.totalTranscriptions || 0,
          words: data.wordsTranscribed || 0,
        });
      } else {
        setStats({ coins: 0, total: 0, words: 0 });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div 
          className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <span className="ml-3 text-gray-600 font-medium">Loading your stats...</span>
      </div>
    );
  }

  const statsData = [
    {
      icon: "🪙",
      label: "Available Tokens",
      value: stats.coins.toLocaleString(),
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      textColor: "text-orange-600"
    },
    {
      icon: "📝",
      label: "Total Transcriptions",
      value: stats.total.toLocaleString(),
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      icon: "🔠",
      label: "Words Transcribed",
      value: stats.words.toLocaleString(),
      color: "from-purple-400 to-indigo-500",
      bgColor: "from-purple-50 to-indigo-50",
      textColor: "text-indigo-600"
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300`}
          variants={fadeInUp}
          {...scaleOnHover}
        >
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">{stat.icon}</span>
            </motion.div>
            <div className="text-right">
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
              <motion.p 
                className={`text-3xl font-bold ${stat.textColor}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.p>
            </div>
          </div>
          <div className={`h-2 bg-gradient-to-r ${stat.color} rounded-full opacity-20`}></div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DashboardStats;