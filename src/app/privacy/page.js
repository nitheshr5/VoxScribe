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

export default function Privacy() {
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
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 font-medium"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, x: 60 }}
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
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4"
            variants={fadeInUp}
          >
            Privacy Policy
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            variants={fadeInUp}
          >
            Your privacy is our priority. Here's how we protect your data.
          </motion.p>
          
          <motion.p 
            className="text-sm text-gray-500"
            variants={fadeInUp}
          >
            Last updated: December 2024
          </motion.p>
        </motion.div>
      </section>

      {/* Privacy Content */}
      <section className="py-12 px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {[
              {
                title: "Information We Collect",
                content: "We collect information you provide directly to us, such as when you create an account, upload audio files, or contact us for support. This includes your email address, audio files, and transcription data."
              },
              {
                title: "How We Use Your Information",
                content: "We use your information to provide our transcription services, improve our platform, communicate with you about your account, and ensure the security of our services. We never sell your personal data to third parties."
              },
              {
                title: "Data Security",
                content: "Your data is protected with advanced 256-bit AES encryption and SSL/TLS protocols. All files are securely stored in AWS S3 buckets with enterprise-grade security measures."
              },
              {
                title: "Data Retention",
                content: "We retain your audio files and transcriptions for the duration specified in your plan. Free users get 60 minutes of storage, while Dollar Deal users get 2400 minutes. You can delete your data at any time from your dashboard."
              },
              {
                title: "Third-Party Services",
                content: "We use trusted third-party services like AWS for storage and Google for authentication. These services have their own privacy policies and security measures that complement our own."
              },
              {
                title: "Your Rights",
                content: "You have the right to access, update, or delete your personal information. You can also request a copy of your data or ask us to stop processing it. Contact us at support@voxscribe.app for any privacy-related requests."
              },
              {
                title: "Contact Us",
                content: "If you have any questions about this Privacy Policy, please contact us at support@voxscribe.app. We're committed to addressing your privacy concerns promptly."
              }
            ].map((section, index) => (
              <motion.div 
                key={index}
                className="mb-8 last:mb-0"
                variants={fadeInUp}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-4"
            variants={fadeInUp}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            variants={fadeInUp}
          >
            Experience secure, affordable transcription with VoxScribe.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link 
              href="/register" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
            >
              Start Transcribing Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-16 px-4 mt-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-4 gap-8 mb-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <VoxScribeLogo />
              <p className="text-gray-300 mt-4">
                Transform your audio into text with AI-powered precision.
              </p>
            </motion.div>
            
            {[
              {
                title: "Company",
                links: [
                  { name: "About", href: "/about" },
                  { name: "Blog Coming Soon", href: "/blog" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Privacy Policy", href: "/privacy" }
                ]
              },
              {
                title: "Product",
                links: [
                  { name: "Features", href: "/features" },
                  { name: "Pricing", href: "/pricing" },
                  { name: "Security", href: "/security" }
                ]
              },
              {
                title: "Applications",
                links: [
                  { name: "Applications", href: "/applications" }
                ]
              }
            ].map((section, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <h3 className="font-bold mb-4 text-lg">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href} 
                        className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center pt-8 border-t border-gray-700"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-lg font-semibold mb-2">Contact & Help</p>
            <p className="text-gray-300">support@voxscribe.app</p>
            <p className="text-sm text-gray-400 mt-4">
              © 2024 VoxScribe. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}