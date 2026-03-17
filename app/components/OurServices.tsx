"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const OurServices = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const services = [
    {
      image: "/images/CyberSecurity.png",
      title: "Cyber Security",
      description:
        "In a world rife with cyber threats, we stand as your vigilant guardians. Our team of experts is dedicated to fortifying your digital defenses, ensuring that your data remains secure against evolving threats.",
      link: "/services/CyberSecurity",
    },
    {
      image: "/images/Forensic.png",
      title: "Digital Forensic",
      description:
        "When incidents occur, our cyber forensics experts step in to uncover the truth. We meticulously investigate and analyze digital evidence, helping you understand the who, what, and why behind any cyber incident.",
      link: "/services/DigitalForensic",
    },

    {
      image: "/images/Training.png",
      title: "Training and Awareness",
      description:
        "TRCELABS offers top-tier cybersecurity training and awareness programs designed to equip individuals and organizations with the knowledge to protect against cyber threats. Our expert-led sessions cover the latest security risks and best practices, ensuring proactive defense strategies. Stay ahead of cybercriminals with our tailored training solutions that empower you to safeguard data, privacy, and digital assets.",
      link: "/services/Training",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#0B1828] py-16 "
      style={{ fontFamily: "'Share Tech Mono', 'Courier New', monospace" }}
    >
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes pulse-border { 0%, 100% { box-shadow: 0 0 0 0 rgba(5,222,114,0); } 50% { box-shadow: 0 0 0 4px rgba(5,222,114,0.15); } }
        @keyframes flicker { 0%, 100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.4; } 94% { opacity: 1; } 96% { opacity: 0.6; } 97% { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes grid-drift { 0% { background-position: 0 0; } 100% { background-position: 40px 40px; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes authScan { 0% { top: 0; opacity: 0.6; } 100% { top: 100%; opacity: 0; } }

        .scanline { position: absolute; width: 100%; height: 2px; background: linear-gradient(to bottom, transparent, rgba(5,222,114,0.06), transparent); animation: scanline 6s linear infinite; pointer-events: none; z-index: 0; }
        .grid-bg { background-image: linear-gradient(rgba(5,222,114,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(5,222,114,0.04) 1px, transparent 1px); background-size: 40px 40px; animation: grid-drift 8s linear infinite; }
        .card-animate { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .title-flicker { animation: flicker 5s infinite; }
        .input-focus-glow:focus-within { box-shadow: 0 0 0 2px rgba(5,222,114,0.4), 0 0 18px rgba(5,222,114,0.1); }
        .btn-glow { transition: all 0.2s ease; }
        .btn-glow:hover { box-shadow: 0 0 24px rgba(5,222,114,0.4), 0 0 48px rgba(5,222,114,0.15); transform: translateY(-1px); }
        .btn-glow:active { transform: translateY(0px); }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .corner-tl::before { content: ''; position: absolute; top: -1px; left: -1px; width: 14px; height: 14px; border-top: 2px solid #05DE72; border-left: 2px solid #05DE72; }
        .corner-tr::after { content: ''; position: absolute; top: -1px; right: -1px; width: 14px; height: 14px; border-top: 2px solid #05DE72; border-right: 2px solid #05DE72; }
        .corner-bl::before { content: ''; position: absolute; bottom: -1px; left: -1px; width: 14px; height: 14px; border-bottom: 2px solid #05DE72; border-left: 2px solid #05DE72; }
        .corner-br::after { content: ''; position: absolute; bottom: -1px; right: -1px; width: 14px; height: 14px; border-bottom: 2px solid #05DE72; border-right: 2px solid #05DE72; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #05DE72; box-shadow: 0 0 6px #05DE72; animation: pulse-border 2s ease-in-out infinite; }
      `}</style>
      <div className="container mx-auto px-4">
        <motion.h1
          variants={titleVariants}
          className="text-center text-4xl md:text-5xl font-extrabold mb-12 text-green-400 tracking-tight"
        >
          Our Services
        </motion.h1>

        <div 
       
        
        className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-gray-8900 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 flex flex-col border border-gray-500"
            >
              <div className="relative w-full h-70 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain object-center"
                />
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-xl font-bold text-green-400 mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href={service.link}
                    className="group relative block w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out"
                    >
                      <span className="mr-2 font-bold tracking-tight">Learn More</span>

                      <motion.span
                        initial={{ x: 0 }}
                        animate={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="inline-block"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default OurServices;
