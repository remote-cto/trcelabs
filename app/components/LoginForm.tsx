"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import {
  Mail,
  Lock,
  LogIn,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Authentication failed.");
          return;
        }

        toast.success(`Welcome back, ${data.user.fullname}!`);

        // Small delay so toast is visible before redirect
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 800);
      } catch {
        toast.error("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      style={{ fontFamily: "'Share Tech Mono', 'Courier New', monospace" }}
      className="bg-[#0B1828] flex items-center justify-center relative overflow-hidden min-h-screen"
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
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="text-xs text-[#05DE72] hover:text-[#119955] transition-all tracking-[0.2em] uppercase bg-gray-800 px-3 py-4 rounded-xl"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="absolute inset-0 grid-bg" />
      <div className="scanline" />
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #05DE72 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className={`relative z-10 w-full max-w-[420px] mx-4 ${mounted ? "card-animate" : "opacity-0"}`}
      >
        <div className="relative bg-[#0d1f30] border border-gray-700 rounded-2xl p-8 corner-tl corner-tr corner-bl corner-br">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center ">
              <div className="relative w-15 h-15">
                <Image
                  src="/images/Logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
                  TRCELABS
                </p>
                <p className="text-[#05DE72] text-xs tracking-widest">
                  SECURE ACCESS
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-600">SYS v2.4.1</p>
              <p className="text-[10px] text-[#05DE72]/60">● ONLINE</p>
            </div>
          </div>

          <div className="mb-7">
            <h2 className="text-white text-2xl font-bold tracking-tight title-flicker">
              AUTHENTICATE<span className="text-[#05DE72] cursor-blink">_</span>
            </h2>
            <p className="text-gray-500 text-xs mt-1 tracking-wider">
              ENTER CREDENTIALS TO PROCEED
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* --- Email --- */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Email is required" : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label className="text-[10px] text-gray-500 tracking-[0.15em] uppercase block mb-1.5">
                    USER IDENTIFIER
                  </label>
                  <div
                    className={`input-focus-glow relative flex items-center gap-3 bg-[#060f18] border rounded-lg px-4 py-3 transition-all duration-200 ${focused === "email" ? "border-[#05DE72]/60" : field.state.meta.errors?.length ? "border-red-500/60" : "border-gray-700"}`}
                  >
                    <Mail
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${focused === "email" ? "text-[#05DE72]" : "text-gray-600"}`}
                      strokeWidth={1.5}
                    />
                    <input
                      type="email"
                      placeholder="user@example.com"
                      value={field.state.value}
                      onFocus={() => setFocused("email")}
                      onBlur={() => {
                        setFocused(null);
                        field.handleBlur();
                      }}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 outline-none tracking-wide"
                    />
                    {field.state.value && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#05DE72]" />
                    )}
                  </div>
                  {field.state.meta.errors?.length > 0 && (
                    <p className="text-red-400 text-xs mt-1 tracking-wider">
                      ⚠ {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* --- Password --- */}
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Password is required" : undefined,
              }}
            >
              {(field) => (
                <div>
                  <label className="text-[10px] text-gray-500 tracking-[0.15em] uppercase block mb-1.5">
                    PASSWORD
                  </label>
                  <div
                    className={`input-focus-glow relative flex items-center gap-3 bg-[#060f18] border rounded-lg px-4 py-3 transition-all duration-200 ${focused === "password" ? "border-[#05DE72]/60" : field.state.meta.errors?.length ? "border-red-500/60" : "border-gray-700"}`}
                  >
                    <Lock
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${focused === "password" ? "text-[#05DE72]" : "text-gray-600"}`}
                      strokeWidth={1.5}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={field.state.value}
                      onFocus={() => setFocused("password")}
                      onBlur={() => {
                        setFocused(null);
                        field.handleBlur();
                      }}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 outline-none tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-600 hover:text-[#05DE72] transition-colors duration-150"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                      ) : (
                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                  {field.state.meta.errors?.length > 0 && (
                    <p className="text-red-400 text-xs mt-1 tracking-wider">
                      ⚠ {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <button
              type="submit"
              disabled={loading}
              className="btn-glow w-full bg-[#05DE72] text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 tracking-widest text-sm uppercase mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" strokeWidth={2} />
              )}
              {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-800">
            <p className="text-center text-gray-500 text-xs tracking-wider">
              NO ACCESS?{" "}
              <Link
                href="/register"
                className="text-[#05DE72] hover:text-white transition-colors duration-150 font-bold"
              >
                REQUEST CREDENTIALS
              </Link>
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-700 tracking-widest">
            <span>256-BIT ENC</span>
            <span className="text-gray-800">|</span>
            <span>ISO 27001</span>
            <span className="text-gray-800">|</span>
            <span>SOC 2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
