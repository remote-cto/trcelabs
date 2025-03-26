"use client";
import React, { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
      ref={ref}
      className="bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
    >
      <motion.section initial="hidden" animate="visible" className="pt-10 pb-6">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center font-mono overflow-hidden">
          <div className="mx-auto max-w-xl text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center text-4xl md:text-5xl font-extrabold mb-2 text-green-400 tracking-tight font-mono"
            >
              Securing Your Digital Future
            </motion.h1>
          </div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
        {/* Image now on the left */}
        <div className="lg:w-1/2 lg:pr-10 order-1 lg:order-first">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg overflow-hidden"
          >
            <Image
              src="/images/LandingPageLogo.png"
              alt="Remote CTO Security"
              width={500}
              height={400}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        {/* Text now on the right */}
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-gray-300 leading-relaxed font-mono"
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
              Our mission is to utilize technology to solve crimes, protect your
              digital footprint, and empower your business for the future.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
});

LandingPage.displayName = "LandingPage";
export default LandingPage;
