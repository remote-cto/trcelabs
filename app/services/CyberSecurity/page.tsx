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
            SIEM (Security Information & Event Management) Services
            </h2>
          </div>
          <ul className="space-y-3 pl-6">
            {[
              "24/7 Threat Monitoring & Response",
              "Real-time Log Analysis & Correlation",
              "Incident Detection & Forensic Investigation",
              "Customizable SIEM Deployment & Tuning",
            ].map((item, index) => (
              <li key={index} className="flex items-center text-green-200">
                <span className="text-green-500 mr-2">📌</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 italic text-green-300">
          Stay ahead of threats with proactive security monitoring!
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-green-900/30">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3 text-green-400">✔</span>
            <h2 className="text-2xl font-bold text-green-400">
            VAPT (Vulnerability Assessment & Penetration Testing)
            </h2>
          </div>
          <ul className="space-y-3 pl-6">
            {[
              "Network, Web & Mobile App Security Testing",
              "Red Team & Blue Team Exercises",
              " Cloud Security Assessments",
              "Compliance & Risk Management",
            ].map((item, index) => (
              <li key={index} className="flex items-center text-green-200">
                <span className="text-green-500 mr-2">📌</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 italic text-green-300">
          Identify and fix security gaps before hackers do!
          </p>
        </div>


        <div className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-green-900/30 mt-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3 text-green-400">✔</span>
            <h2 className="text-2xl font-bold text-green-400">
            IT Auditing & Compliance
            </h2>
          </div>
          <ul className="space-y-3 pl-6">
            {[
              "Security Posture Assessments",
              "ISO 27001, DPDPA, PCI-DSS, NIST, GDPR & SOC 2 Compliance",
              "Risk Management & Governance Frameworks",
              "Security Policy Review & Implementation",
            ].map((item, index) => (
              <li key={index} className="flex items-center text-green-200">
                <span className="text-green-500 mr-2">📌</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 italic text-green-300">
          Strengthen your defenses with a proactive cybersecurity approach!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
