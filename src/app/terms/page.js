"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeInOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
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

export default function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using VoxScribe ('Service'), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "2. Service Description",
      content: "VoxScribe provides AI-powered audio transcription services that convert audio files into text format. Our service includes both free and paid subscription tiers with varying features and usage limits."
    },
    {
      title: "3. User Accounts",
      content: "To access certain features of our service, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account."
    },
    {
      title: "4. Acceptable Use",
      content: "You agree to use VoxScribe only for lawful purposes and in accordance with these Terms. You may not use our service to transcribe content that is illegal, harmful, threatening, abusive, defamatory, or violates any third party's rights including intellectual property rights."
    },
    {
      title: "5. Privacy and Data Protection",
      content: "Your privacy is important to us. We collect, use, and protect your personal information in accordance with our Privacy Policy. By using our service, you consent to the collection and use of your information as described in our Privacy Policy."
    },
    {
      title: "6. Subscription and Payment",
      content: "Paid subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to change our pricing at any time, with notice provided to existing subscribers."
    },
    {
      title: "7. Usage Limits",
      content: "Free accounts are limited to 60 minutes of transcription and storage per month. Paid accounts receive additional credits as specified in their subscription plan. Unused credits do not roll over to the next billing period."
    },
    {
      title: "8. Content Ownership and Rights",
      content: "You retain ownership of all audio content you upload to our service. By uploading content, you grant us a limited license to process and transcribe your audio files. We do not claim ownership of your original content or the resulting transcriptions."
    },
    {
      title: "9. Service Availability",
      content: "While we strive to maintain high service availability, we do not guarantee uninterrupted access to our service. We may temporarily suspend or restrict access for maintenance, security, or other operational reasons."
    },
    {
      title: "10. Limitation of Liability",
      content: "VoxScribe's liability is limited to the maximum extent permitted by law. We are not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business interruption."
    },
    {
      title: "11. Termination",
      content: "Either party may terminate this agreement at any time. Upon termination, your access to the service will cease, and any data stored on our servers may be deleted after a reasonable notice period."
    },
    {
      title: "12. Changes to Terms",
      content: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through our service. Continued use of the service after changes constitutes acceptance of the new terms."
    },
    {
      title: "13. Governing Law",
      content: "These terms are governed by and construed in accordance with applicable laws. Any disputes arising from these terms or the use of our service will be resolved through binding arbitration."
    },
    {
      title: "14. Contact Information",
      content: "If you have any questions about these Terms of Service, please contact us at support@voxscribe.app."
    }
  ];

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
      <section className="py-12 px-4 text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
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
            Terms of 
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Service
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 mb-6"
            variants={fadeInUp}
          >
            Last updated: December 15, 2024
          </motion.p>

          <motion.div 
            className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-2xl p-6"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-center mb-3">
              <span className="text-2xl mr-3">📋</span>
              <h2 className="text-lg font-bold text-blue-800">Important Legal Information</h2>
            </div>
            <p className="text-blue-700 text-sm">
              Please read these Terms of Service carefully before using VoxScribe. By using our service, you agree to be bound by these terms.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Terms Content */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                variants={fadeInUp}
                whileHover={{ y: -2, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div 
            className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl mr-3">💬</span>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Questions?
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms of Service, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="mailto:support@voxscribe.app"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Contact Support
              </a>
              <Link 
                href="/privacy"
                className="text-indigo-600 hover:text-indigo-800 px-6 py-3 rounded-full border border-indigo-600 hover:bg-indigo-50 transition-all duration-300 font-medium"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>
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
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Terms of Service', 'Privacy Policy', 'Security'].map((link) => (
                  <li key={link}>
                    <Link 
                      href={`/${link.toLowerCase().replace(' ', '-')}`}
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
              <Link 
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300 block mt-2"
              >
                Back to Home
              </Link>
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