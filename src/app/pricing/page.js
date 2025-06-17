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

export default function Pricing() {
  const pricingPlans = [
    {
      title: "Free",
      subtitle: "Perfect for trying out VoxScribe",
      price: "$0",
      period: "Free Forever",
      features: [
        "60 minutes of transcription credits",
        "60 minutes of storage space",
        "Export as PDF/DOC/Copy",
        "Basic transcription accuracy",
        "Email support"
      ],
      buttonText: "Get Started Free",
      popular: false
    },
    {
      title: "The Dollar Deal",
      subtitle: "Incredible value for serious users",
      price: "$1",
      period: "One-time payment",
      features: [
        "Everything in Free, plus:",
        "2400 minutes of transcription credits",
        "2400 minutes of storage space",
        "Premium transcription accuracy (95%+)",
        "Priority email support",
        "Advanced export options"
      ],
      buttonText: "Get The Dollar Deal",
      popular: true
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
                  item === 'Pricing' ? 'text-indigo-600 font-semibold' : ''
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
            Simple Pricing for
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Everyone
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Choose the plan that works best for you. Start free, upgrade when you need more.
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index}
                className={`relative bg-white rounded-2xl p-8 shadow-xl ${
                  plan.popular ? 'ring-4 ring-indigo-500 ring-opacity-50 transform scale-105' : ''
                }`}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      🔥 Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.title}</h3>
                  <p className="text-gray-600 mb-6">{plan.subtitle}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-600 ml-2 block text-sm mt-1">{plan.period}</span>
                  </div>
                </div>
                
                <motion.div {...scaleOnHover} className="mb-8">
                  <Link 
                    href="/register" 
                    className={`block w-full text-center py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </motion.div>
                
                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className={`text-gray-700 ${feature.includes('Everything in') ? 'font-semibold text-indigo-600' : ''}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                question: "What happens after I use my free minutes?",
                answer: "You can upgrade to The Dollar Deal to get 2400 additional minutes, or wait for the next billing cycle if you're on a subscription plan."
              },
              {
                question: "Is The Dollar Deal really just $1?",
                answer: "Yes! It's a one-time payment of $1 that gives you 2400 minutes of transcription credits. No hidden fees or recurring charges."
              },
              {
                question: "How accurate is the transcription?",
                answer: "Our AI achieves over 95% accuracy for clear audio. The Dollar Deal includes premium accuracy features for even better results."
              },
              {
                question: "Can I export my transcriptions?",
                answer: "Yes! All plans include export options for PDF, DOC, and copy-to-clipboard functionality."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
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
            Ready to Transform Your Audio?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who trust VoxScribe for their transcription needs.
          </p>
          <motion.div {...scaleOnHover}>
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