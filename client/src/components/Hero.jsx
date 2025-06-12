import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-[#f1ee4f] w-full h-[620px] flex items-center justify-center px-8 shadow-[0_20px_30px_rgba(0,0,0,0.25)]">
      
      {/* Bottom Gradient Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black/20 to-transparent z-0" />

      {/* Content */}
      <div className="text-center max-w-4xl relative z-10">

        {/* Heading */}
        <motion.h1
          className="font-playfair font-bold text-6xl md:text-7xl lg:text-8xl text-slate-900 leading-tight tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Complete <span className="text-pink-700">Legal</span>
          </motion.span>
          <motion.span
            className="block mt-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Solution
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-inter font-medium text-lg md:text-xl text-slate-800 mt-6 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Professional legal services tailored to your needs with expertise you can trust.
        </motion.p>

        {/* Button */}
        <button className="mt-6 pt-2 bg-red-950 text-red-400 text-lg border border-red-400 border-b-4 font-medium overflow-hidden relative px-6 py-3 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
          <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-96 h-[24px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          Get Started
        </button>

      </div>
    </div>
  );
};

export default Hero;
