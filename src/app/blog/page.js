"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeInOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
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

// Logo Component
const VoxScribeLogo = () => (
  <motion.div 
    className="flex items-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
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

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Future of AI-Powered Transcription",
    excerpt: "Explore how artificial intelligence is revolutionizing the way we convert speech to text, making transcription more accurate and accessible than ever before.",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "AI Technology",
    gradient: "from-blue-400 to-indigo-600",
    emoji: "🤖"
  },
  {
    id: 2,
    title: "10 Ways VoxScribe Can Boost Your Productivity",
    excerpt: "Discover practical strategies to maximize your efficiency using VoxScribe's transcription features for meetings, lectures, and content creation.",
    date: "December 10, 2024",
    readTime: "7 min read",
    category: "Productivity",
    gradient: "from-green-400 to-emerald-600",
    emoji: "⚡"
  },
  {
    id: 3,
    title: "Security in Audio Transcription: What You Need to Know",
    excerpt: "Learn about the importance of data security in transcription services and how VoxScribe protects your sensitive audio content.",
    date: "December 5, 2024",
    readTime: "6 min read",
    category: "Security",
    gradient: "from-purple-400 to-pink-600",
    emoji: "🔒"
  },
  {
    id: 4,
    title: "From Podcast to Text: A Content Creator's Guide",
    excerpt: "Step-by-step guide on how content creators can leverage transcription to repurpose audio content and reach wider audiences.",
    date: "November 28, 2024",
    readTime: "8 min read",
    category: "Content Creation",
    gradient: "from-orange-400 to-red-600",
    emoji: "🎙️"
  },
  {
    id: 5,
    title: "Meeting Transcription Best Practices",
    excerpt: "Essential tips for getting the most accurate transcripts from your business meetings and important conversations.",
    date: "November 20, 2024",
    readTime: "4 min read",
    category: "Business",
    gradient: "from-cyan-400 to-blue-600",
    emoji: "💼"
  },
  {
    id: 6,
    title: "Student's Guide to Lecture Transcription",
    excerpt: "How students can use transcription technology to improve note-taking, study more effectively, and never miss important information.",
    date: "November 15, 2024",
    readTime: "6 min read",
    category: "Education",
    gradient: "from-yellow-400 to-orange-600",
    emoji: "📚"
  }
];

export default function Blog() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation bar */}
      <motion.header 
        className="w-full bg-white/80 backdrop-blur-md py-4 px-6 flex justify-between items-center shadow-lg border-b border-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Link href="/">
          <VoxScribeLogo />
        </Link>
        <motion.nav 
          className="hidden md:flex space-x-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {['About', 'Features', 'Applications', 'Pricing'].map((item) => (
            <motion.div key={item} variants={fadeInUp}>
              <Link 
                href={`/${item.toLowerCase()}`} 
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <motion.div
          className="flex space-x-3"
          variants={fadeInLeft}
          initial="initial"
          animate="animate"
        >
          <Link 
            href="/login" 
            className="text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-full border border-indigo-600 hover:bg-indigo-50 transition-all duration-300 font-medium"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium"
          >
            Sign Up
          </Link>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-10 left-10 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-20 right-10 w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-3xl mx-auto"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4"
            variants={fadeInUp}
          >
            VoxScribe 
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8 max-w-xl mx-auto"
            variants={fadeInUp}
          >
            Insights, tips, and updates about AI transcription, productivity, and the future of audio-to-text technology
          </motion.p>
        </motion.div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-8 px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-2xl p-6 mb-12">
            <div className="flex items-center justify-center mb-3">
              <span className="text-3xl mr-3">🚀</span>
              <h2 className="text-xl font-bold text-orange-800">Coming Soon!</h2>
            </div>
            <p className="text-orange-700">
              Our blog is currently under development. Stay tuned for exciting content about transcription technology, productivity tips, and industry insights!
            </p>
          </div>
        </motion.div>
      </section>

      {/* Blog Posts Preview */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            What's Coming Next
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                variants={fadeInUp}
                {...scaleOnHover}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`h-32 bg-gradient-to-r ${post.gradient} flex items-center justify-center`}>
                  <span className="text-4xl">{post.emoji}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <span className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Stay Updated
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 mb-8"
            variants={fadeInUp}
          >
            Be the first to know when we publish new articles about transcription technology and productivity tips.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
            variants={fadeInUp}
          >
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <motion.button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold whitespace-nowrap hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12 px-4 mt-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Link href="/">
                <VoxScribeLogo />
              </Link>
              <p className="text-gray-300 mt-4">
                Transform your audio into text with AI-powered precision.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'Features', 'Pricing', 'About'].map((link) => (
                  <li key={link}>
                    <Link 
                      href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h3 className="font-bold mb-4">Support</h3>
              <p className="text-gray-300">support@voxscribe.app</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="text-center pt-6 border-t border-gray-700"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-400">
              © 2024 VoxScribe. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}