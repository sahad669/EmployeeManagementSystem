

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col-reverse md:flex-row items-center justify-center bg-gradient-to-br from-[#0A2540] via-[#274472] to-[#82E0FA] relative overflow-hidden px-4 sm:px-6 lg:px-10">
      
    
      <div className="flex flex-col justify-center gap-8 items-center md:items-start text-center md:text-left w-full md:w-1/2 z-10 mt-6 md:mt-0">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-[#7DE3FF] drop-shadow-xl leading-tight"
        >
          Employee Management System
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-2xl text-[#B4DCF9] italic max-w-xl mb-4"
        >
          "Great employees don’t just work for you, they grow with you."
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-1 px-10 py-4 rounded-full bg-[#7DE3FF] text-[#1A2D49] text-xl font-semibold shadow-xl transition hover:bg-[#82E0FA] hover:text-[#1A2D49] hover:scale-105 duration-200"
          onClick={() => navigate("/login")}
        >
          Get Started
        </motion.button>
      </div>

    
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex items-center justify-center w-full md:w-1/2 md:mb-0"
      >
        <img
          src="/images/1606.m00.i125.n016.S.c12.Business people team work managment structure vector illustration (1).png"
          alt="Employee management illustration"
          className="object-contain max-h-[40vh] md:max-h-[65vh] mx-auto border-none drop-shadow-lg"
        />
      </motion.div>

      <div className="absolute -top-36 -left-36 w-96 h-96 bg-[#7DE3FF] opacity-10 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#82E0FA] opacity-10 rounded-full blur-3xl pointer-events-none z-0"></div>
    </div>
  );
};

export default Home;
