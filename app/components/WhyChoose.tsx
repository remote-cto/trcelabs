import React from "react";
import { Shield, CloudCog, CheckCircle, Lock, Clock } from "lucide-react";

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
        "We help businesses meet industry standards such as ISO 27001, PCI-DSS, NIST, GDPR, and SOC 2.",
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
  ];

  return (
    <div className="bg-[#0B1828] py-16 font-mono">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-12 text-green-400 tracking-tight font-mono">
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