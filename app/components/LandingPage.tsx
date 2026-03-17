"use client";
import React, { forwardRef, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Matrix from "./Matrix";

const LandingPage = forwardRef<HTMLDivElement>((props, ref) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  return (
    <div
      style={{ fontFamily: "'Share Tech Mono', 'Courier New', monospace" }}
      ref={ref}
      className="bg-[#0B1828] overflow-hidden relative min-h-screen"
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
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Matrix />
      </div>

      <div className="relative z-10">
        <motion.section
          initial="hidden"
          animate="visible"
          className="pt-10 pb-6"
        >
          <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center overflow-hidden">
            <div className="mx-auto px-4 overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-lg sm:text-2xl md:text-4xl lg:text-4xl mb-2 text-[#05DE72] tracking-tight  font-bold text-center"
              >
                ADVANCED SECURITY SOLUTIONS FOR MODERN TIMES
              </motion.h1>
            </div>
          </div>
        </motion.section>

        <section className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
          <div className="lg:w-1/2 lg:pr-10 order-1 lg:order-first">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg overflow-hidden  bg-opacity-50 p-2"
            >
              <Image
                src="/images/LandingPageLogo.png"
                alt="Remote CTO Security"
                width={300}
                height={200}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>

          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              className="text-white leading-relaxed  bg-opacity-50 p-4 rounded"
            >
              <p className="mb-4">
                In an era where cyber threats are evolving at an alarming pace,{" "}
                <span className="text-green-400 hover:underline ml-1">
                  TRCELABS
                </span>{" "}
                stands as your trusted partner in cyber defense, digital
                forensics, and security education. We help businesses safeguard
                their critical assets through cutting-edge SIEM solutions, VAPT
                audits, digital forensics, and cybersecurity training.
              </p>
              <p>
                Our mission is to utilize technology to solve crimes, protect
                your digital footprint, and empower your business for the
                future.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
});

LandingPage.displayName = "LandingPage";
export default LandingPage;
