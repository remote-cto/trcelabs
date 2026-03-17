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
    <div
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-6"
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
