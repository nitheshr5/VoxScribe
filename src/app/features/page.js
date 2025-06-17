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

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
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

export default function Features() {
  const features = [
    {
      icon: "🎯",
      title: "AI-Powered Accuracy",
      description: "Achieve over 95% transcription accuracy with our advanced AI technology that understands context and nuance.",
      bgColor: "from-blue-100 to-indigo-100"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Get your transcriptions in minutes, not hours. Our optimized processing delivers results at incredible speed.",
      bgColor: "from-yellow-100 to-orange-100"
    },
    {
      icon: "🔒",
      title: "Bank-Level Security",
      description: "Your data is protected with 256-bit AES encryption and stored securely in AWS S3 buckets.",
      bgColor: "from-green-100 to-emerald-100"
    },
    {
      icon: "📄",
      title: "Multiple Export Formats",
      description: "Export your transcriptions as PDF, DOC, or copy directly to clipboard for maximum flexibility.",
      bgColor: "from-purple-100 to-pink-100"
    },
    {
      icon: "🎧",
      title: "Multi-Format Support",
      description: "Upload audio in various formats including MP3, WAV, M4A, and more. We handle the technical stuff.",
      bgColor: "from-teal-100 to-cyan-100"
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      description: "Get 40 hours of transcription for just $1. No hidden fees, no subscriptions, just honest pricing.",
      bgColor: "from-rose-100 to-red-100"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation bar */}
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
                  item === 'Features' ? 'text-indigo-600 font-semibold' : ''
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
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6"
            variants={fadeInUp}
          >
            Powerful Features for
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Transcription
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Discover what makes VoxScribe the best choice for your audio transcription needs.
          </motion.p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-br ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-3xl">{feature.icon}</span>
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose VoxScribe Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Why Choose VoxScribe?
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInLeft}>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Built for Simplicity & Performance
              </h3>
              <div className="space-y-4">
                {[
                  "No complex setup - just upload and transcribe",
                  "Minimal interface that focuses on what matters",
                  "Blazing fast processing powered by cutting-edge AI",
                  "Transparent pricing with no hidden costs"
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center"
                    whileHover={{ x: 10 }}
                  >
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-xl"
              variants={fadeInRight}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-xl font-bold mb-4 text-center text-gray-800">
                The Dollar Deal Advantage
              </h4>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-indigo-600">$1</span>
                <span className="text-gray-600 ml-2">for 40 hours</span>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  2400 minutes of transcription
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Premium accuracy guarantee
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  All export formats included
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with 60 minutes free, then upgrade to unlock the full potential.
          </p>
          <motion.div {...scaleOnHover}>
            <Link 
              href="/register" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
            >
              Start Transcribing Free
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
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