"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: "easeInOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1 }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
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

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation bar - Updated with full navigation menu */}
      <motion.header 
        className="w-full bg-white/80 backdrop-blur-md py-4 px-8 flex justify-between items-center shadow-lg border-b border-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Link href="/">
          <VoxScribeLogo />
        </Link>
        <motion.nav 
          className="hidden md:flex space-x-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {['About', 'Features', 'Applications', 'Pricing'].map((item, index) => (
            <motion.div key={item} variants={fadeInUp}>
              <Link 
                href={`/${item.toLowerCase()}`} 
                className={`text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium ${
                  item === 'About' ? 'text-indigo-600 font-semibold' : ''
                }`}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
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
      <section className="py-16 px-4 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6"
            variants={fadeInUp}
          >
            Transforming Audio into
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Accessible Text
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Discover the story behind VoxScribe and our mission to make AI transcription accessible to everyone
          </motion.p>
        </motion.div>
      </section>

      {/* About Section */}
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Mission Section */}
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInLeft}>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                VoxScribe was born from a simple belief: everyone should have access to powerful, 
                accurate audio transcription without breaking the bank. We're making AI transcription 
                technology accessible to students, professionals, and creators everywhere.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our goal is to eliminate the barriers between you and your content, allowing you to focus 
                on what truly matters—creating, learning, and growing.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex justify-center"
              variants={fadeInRight}
            >
              <motion.div 
                className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-6xl">🎯</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Core Values */}
          <motion.div 
            className="mb-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold text-center mb-12 text-gray-800"
              variants={fadeInUp}
            >
              What Sets Us Apart
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
            >
              {[
                {
                  icon: "🚀",
                  title: "Simple & Fast",
                  description: "Upload your audio and get transcripts in minutes, not hours. Our streamlined process eliminates complexity while delivering exceptional results."
                },
                {
                  icon: "💰",
                  title: "Unbeatable Value",
                  description: "Get 40 hours of transcription for just $1. No hidden fees, no subscriptions—just honest, transparent pricing that works for everyone."
                },
                {
                  icon: "🔒",
                  title: "Enterprise Security",
                  description: "Your data is protected with bank-level 256-bit AES encryption and stored securely in AWS S3 buckets. Privacy is our priority."
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <motion.div 
                    className="text-5xl mb-6"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* The Story Behind VoxScribe */}
          <motion.div 
            className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="max-w-4xl mx-auto text-center">
              <motion.h2 
                className="text-3xl font-bold text-gray-800 mb-6"
                variants={fadeInUp}
              >
                The Story Behind VoxScribe
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed mb-6"
                variants={fadeInUp}
              >
                We started VoxScribe because we experienced firsthand the frustration of expensive, 
                complicated transcription services. As students and professionals ourselves, we knew 
                there had to be a better way.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                variants={fadeInUp}
              >
                Today, VoxScribe serves thousands of users worldwide—from students transcribing lectures 
                to entrepreneurs documenting meetings, from content creators building their next project 
                to researchers analyzing interviews. We're proud to be part of your journey.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Experience VoxScribe?</h2>
            <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of users who trust VoxScribe for their transcription needs. 
              Start with 60 minutes free, then unlock unlimited potential.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
              >
                Start Your Free Trial
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer - Updated with complete footer from Features page */}
      <motion.footer 
        className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12 px-4 mt-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <VoxScribeLogo />
          <p className="text-gray-300 mt-4 mb-8">
            Transform your audio into text with AI-powered precision.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { name: "About", href: "/about" },
              { name: "Features", href: "/features" },
              { name: "Applications", href: "/applications" },
              { name: "Pricing", href: "/pricing" },
              { name: "Terms", href: "/terms" },
              { name: "Privacy", href: "/privacy" }
            ].map((link, index) => (
              <Link 
                key={index}
                href={link.href} 
                className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-lg font-semibold mb-2">Contact & Help</p>
            <p className="text-gray-300 mb-4">support@voxscribe.app</p>
            <p className="text-sm text-gray-400">
              © 2024 VoxScribe. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}