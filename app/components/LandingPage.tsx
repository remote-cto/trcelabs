"use client";
import React, { forwardRef, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Matrix from "./Matrix"; // Import the Matrix component

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
      className="bg-[#0B1828] overflow-hidden relative min-h-screen"
    >
      {/* Matrix component as background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Matrix />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <motion.section
          initial="hidden"
          animate="visible"
          className="pt-10 pb-6"
        >
          <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center font-mono overflow-hidden">
          <div className="mx-auto px-4 overflow-hidden">
  <motion.h1
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="text-lg sm:text-2xl md:text-4xl lg:text-4xl  mb-2 text-white tracking-tight font-['Montserrat'] text-center"
  >
    ADVANCED SECURITY SOLUTIONS FOR MODERN TIMES
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
              className="text-white   leading-relaxed font-mono bg-opacity-50 p-4 rounded"
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
