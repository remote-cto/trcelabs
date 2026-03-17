import React from "react";
import {
  Shield,
  CloudCog,
  CheckCircle,
  Lock,
  Clock,
  ShieldCheck,
} from "lucide-react";

const WhyChoose = () => {
  const features = [
    {
      icon: Shield,
      title: "Industry-Leading Expertise",
      description:
        "Our cybersecurity specialists have extensive experience in tackling real-world cyber threats.",
      color: "text-blue-400",
    },
    {
      icon: CloudCog,
      title: "Advanced Technology Stack",
      description:
        "We leverage AI-driven analytics, next-gen firewalls, and cloud-native security tools.",
      color: "text-green-400",
    },
    {
      icon: CheckCircle,
      title: "Compliance-Ready Solutions",
      description:
        "We help businesses meet industry standards such as ISO 27001, DPDPA, PCI-DSS, NIST, GDPR, and SOC 2.",
      color: "text-purple-400",
    },
    {
      icon: Lock,
      title: "Customized Security Approach",
      description:
        "Tailored security strategies designed to meet your organization's unique challenges.",
      color: "text-red-400",
    },
    {
      icon: Clock,
      title: "24/7 Cybersecurity Support",
      description:
        "Immediate response to cyber incidents, ensuring minimal downtime and maximum protection.",
      color: "text-orange-400",
    },
    {
      icon: ShieldCheck,
      title: "Vendor & Third-Party Risk Management",
      description:
        "Assess, onboard, and monitor vendors with structured security checks and DPAs to reduce supply-chain risk.",
      color: "text-orange-400",
    },
  ];

  return (
    <div
      style={{ fontFamily: "'Share Tech Mono', 'Courier New', monospace" }}
      className="bg-[#0B1828] py-16 "
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
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-12 text-green-400 tracking-tight ">
          Why Choose TRCELABS?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 flex flex-col border border-gray-500"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-4">
                  <feature.icon
                    className={`w-12 h-12 mr-4 ${feature.color}`}
                    strokeWidth={1.5}
                  />
                  <h2 className="text-xl font-bold text-green-400">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
