"use client";

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div 
          className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation bar */}
      <motion.header 
        className="w-full bg-white/80 backdrop-blur-md py-4 px-8 flex justify-between items-center shadow-lg border-b border-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <VoxScribeLogo />
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
          variants={fadeInRight}
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
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5}}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6"
            variants={fadeInUp}
          >
            TRANSCRIBE AUDIO TO TEXT 
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AFFORDABLY
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            VoxScribe is a minimal AI audio transcriber for your simple needs
          </motion.p>
          
          <motion.p 
            className="mb-8 text-lg font-semibold text-indigo-600"
            variants={fadeInUp}
          >
            Get 40 hours of transcription credits for just ONE dollar
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            variants={fadeInUp}
          >
            <motion.div {...scaleOnHover}>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
              </Link>
            </motion.div>
            <span className="text-sm text-gray-500 font-medium">No Credit Card Required</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Dollar Deal Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInLeft}>
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6">
                THE <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  DOLLAR DEAL!
                </span>
              </h2>
              <div className="flex items-start mt-8">
                <motion.div 
                  className="mr-6"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">👤</span>
                  </div>
                </motion.div>
                <div>
                  <p className="text-xl text-gray-700 font-semibold">
                    Exclusive features for the exclusive YOU!
                  </p>
                  <p className="text-gray-600 mt-2">
                    Transform your audio into text with premium features at an unbeatable price.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInRight}>
              <motion.ul 
                className="space-y-4"
                variants={staggerContainer}
              >
                {[
                  { text: "Whopping 2400 Monthly Transcription Minutes", highlight: "2400" },
                  { text: "Store up to 2400 minutes of content", highlight: "2400" },
                  { text: "Minimal Features, Clear Interface" },
                  { text: "Achieve over 95% accuracy in your transcriptions", highlight: "95%" },
                  { text: "Swiftly export transcripts as PDF/DOC at ease" }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center bg-white p-4 rounded-lg shadow-sm"
                    variants={fadeInUp}
                    whileHover={{ x: 10, backgroundColor: "#f8fafc" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">
                      {item.highlight ? (
                        <>
                          {item.text.split(item.highlight)[0]}
                          <span className="font-bold text-indigo-600">{item.highlight}</span>
                          {item.text.split(item.highlight)[1]}
                        </>
                      ) : (
                        item.text
                      )}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
              
              <motion.p 
                className="text-sm text-gray-500 mt-6 italic"
                variants={fadeInUp}
              >
                Stay tuned for upcoming exciting features!
              </motion.p>
              
              <motion.div 
                className="mt-8"
                variants={fadeInUp}
              >
                <motion.div {...scaleOnHover}>
                  <Link 
                    href="/register" 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                  >
                    Get Started Now
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Simple. Neat. Affordable. AI Audio Transcriber
        </motion.h2>
        
        {/* Applications Grid */}
        <div className="max-w-6xl mx-auto space-y-20">
          {[
            {
              icon: "👩‍🎓",
              title: "Academics",
              subtitle: "Say goodbye to manual note-taking. Save Time!",
              description: "VoxScribe simplifies the process of converting lectures into searchable notes effortlessly. With our innovative technology, you can focus on learning, not note-taking. Experience the freedom to move without the burden of note-taking.",
              bgColor: "from-yellow-100 to-orange-100",
              direction: "left"
            },
            {
              icon: "👨‍💼",
              title: "Business & Sales",
              subtitle: "Transcribe your insights. Grow business, increase revenue!",
              description: "Maximize productivity and boost profits with our meeting transcription service. Capture valuable insights, share concise summaries, and propel your business forward effortlessly.",
              bgColor: "from-blue-100 to-indigo-100",
              direction: "right"
            },
            {
              icon: "👩‍🎨",
              title: "Content Creation",
              subtitle: "Your content capturing genie - Create with ease!",
              description: "Effortlessly transcribe podcasts and interviews with our seamless solution. We understand the value of your time and content. Focus on what truly matters—creating engaging, impactful content.",
              bgColor: "from-pink-100 to-purple-100",
              direction: "left"
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
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">{app.description}</p>
                <motion.div {...scaleOnHover}>
                  <Link 
                    href="/register" 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                  >
                    Transcribe Now!
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security & Pricing Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-8 text-gray-800"
              variants={fadeInUp}
            >
              Safety First: Our Unyielding Priority
            </motion.h2>
            
            <motion.div 
              className="space-y-4 mb-12"
              variants={staggerContainer}
            >
              {[
                "Protected with advanced 256-bit AES and SSL/TLS encryption for enhanced security.",
                "Your data is securely stored in AWS S3 buckets, ensuring utmost safety."
              ].map((text, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm max-w-3xl mx-auto"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <svg className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-gray-700">{text}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              variants={fadeInUp}
            >
              Swap Sound for Script.
            </motion.h2>
            <motion.p 
              className="mb-16 text-xl text-gray-600"
              variants={fadeInUp}
            >
              Quick and Easy Transcription!
            </motion.p>
          </motion.div>

          {/* Pricing cards */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Free",
                subtitle: "For individuals starting out",
                price: "$0",
                period: "Free Forever",
                features: [
                  "60 mins of transcription credits",
                  "60 mins of storage total per person",
                  "Export results as PDF/DOC/Copy"
                ]
              },
              {
                title: "The Dollar Deal",
                subtitle: "For exclusive benefits",
                price: "$1",
                period: "No Hidden Charges",
                features: [
                  "Everything in FREE, plus:",
                  "2400 mins of transcription credits",
                  "2400 mins of storage total per person"
                ],
                featured: true
              }
            ].map((plan, index) => (
              <motion.div 
                key={index}
                className={`relative bg-white rounded-2xl p-8 shadow-xl ${plan.featured ? 'ring-4 ring-indigo-500 ring-opacity-50' : ''}`}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.title}</h3>
                <p className="text-gray-600 mb-6">{plan.subtitle}</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                
                <motion.div {...scaleOnHover} className="mb-8">
                  <Link 
                    href="/register" 
                    className={`block w-full text-center py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                      plan.featured 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </motion.div>
                
                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
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