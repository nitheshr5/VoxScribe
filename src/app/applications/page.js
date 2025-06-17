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

export default function Applications() {
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
                  item === 'Applications' ? 'text-indigo-600 font-semibold' : ''
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
            Transform Your Workflow with
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              VoxScribe Applications
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Discover how VoxScribe transforms workflows across different industries and use cases
          </motion.p>
        </motion.div>
      </section>

      {/* Applications Section */}
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {[
            {
              icon: "👩‍🎓",
              title: "Academics",
              subtitle: "Say goodbye to manual note-taking. Save Time!",
              description: "VoxScribe simplifies the process of converting lectures into searchable notes effortlessly. With our innovative technology, you can focus on learning, not note-taking. Experience the freedom to move without the burden of note-taking.",
              bgColor: "from-yellow-100 to-orange-100",
              direction: "left",
              features: ["Lecture transcription", "Study notes generation", "Research interview analysis"]
            },
            {
              icon: "👨‍💼",
              title: "Business & Sales",
              subtitle: "Transcribe your insights. Grow business, increase revenue!",
              description: "Maximize productivity and boost profits with our meeting transcription service. Capture valuable insights, share concise summaries, and propel your business forward effortlessly.",
              bgColor: "from-blue-100 to-indigo-100",
              direction: "right",
              features: ["Meeting transcription", "Sales call analysis", "Client consultation records"]
            },
            {
              icon: "👩‍🎨",
              title: "Content Creation",
              subtitle: "Your content capturing genie - Create with ease!",
              description: "Effortlessly transcribe podcasts and interviews with our seamless solution. We understand the value of your time and content. Focus on what truly matters—creating engaging, impactful content.",
              bgColor: "from-pink-100 to-purple-100",
              direction: "left",
              features: ["Podcast transcription", "Interview documentation", "Video content subtitles"]
            }
          ].map((app, index) => (
            <motion.div 
              key={index}
              className="grid md:grid-cols-2 gap-12 items-start"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div 
                className={`${app.direction === 'right' ? 'order-2 md:order-1' : ''}`}
                variants={app.direction === 'left' ? fadeInLeft : fadeInRight}
              >
                <motion.div 
                  className={`w-24 h-24 bg-gradient-to-br ${app.bgColor} rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-6 shadow-lg`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-4xl">{app.icon}</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className={`${app.direction === 'right' ? 'order-1 md:order-2' : ''}`}
                variants={app.direction === 'left' ? fadeInRight : fadeInLeft}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">{app.title}</h3>
                <p className="text-lg text-indigo-600 mb-4 font-semibold">{app.subtitle}</p>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{app.description}</p>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-800 mb-3">Perfect for:</h4>
                  <ul className="space-y-2">
                    {app.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/register" 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                  >
                    Start Transcribing Now!
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            variants={fadeInUp}
          >
            Ready to Transform Your Workflow?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            variants={fadeInUp}
          >
            Join thousands of users across different industries who trust VoxScribe
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/register" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
            >
              Get Started for Just $1
            </Link>
          </motion.div>
        </motion.div>
      </section>

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