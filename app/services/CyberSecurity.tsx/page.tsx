"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-6 font-mono">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={handleGoBack}
          className="absolute top-4 right-4 bg-white rounded-full p-2 transition-all duration-300"
        >
          <ChevronLeft className="text-black" size={24} />
        </button>

        <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-2xl border border-green-900/30">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3 text-green-400">✔</span>
            <h2 className="text-2xl font-bold text-green-400">
              DFIR - Digital Forensics & Incident Response
            </h2>
          </div>
          <ul className="space-y-3 pl-6">
            {[
              "Cybercrime Investigation & Evidence Collection",
              "Ransomware & Malware Analysis",
              "Data Breach Response & Recovery",
              "Forensic Reports for Legal & Compliance Needs",
            ].map((item, index) => (
              <li key={index} className="flex items-center text-green-200">
                <span className="text-green-500 mr-2">📌</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 italic text-green-300">
            Get to the root of cyber incidents with forensic precision!
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-green-900/30">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3 text-green-400">✔</span>
            <h2 className="text-2xl font-bold text-green-400">
              OSINT (Open-Source Intelligence)
            </h2>
          </div>
          <ul className="space-y-3 pl-6">
            {[
              "Deep & Dark Web Investigations",
              "Social Media & Digital Footprint Analysis",
              "Corporate & Individual Profiling for Threat Intelligence",
              "Tracking Cybercriminal Activities",
            ].map((item, index) => (
              <li key={index} className="flex items-center text-green-200">
                <span className="text-green-500 mr-2">📌</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 italic text-green-300">
            Uncover hidden threats and digital traces with forensic precision!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
