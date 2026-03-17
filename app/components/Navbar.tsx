import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-black border-b border-gray-800">
      <div
        style={{ fontFamily: "'Share Tech Mono', 'Courier New', monospace" }}
        className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between "
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/Logo.png"
            alt="Logo"
            width={100}
            height={100}
            priority
          />
          <span className="text-xl font-semibold text-[#05DE72]">
            TRACELABS
          </span>
        </Link>

        <Link
          href="/login"
          className="px-5 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition cursor-pointer"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
