"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import {
  User,
  Phone,
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle2,
  KeyRound,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // OTP Modal state
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      fullname: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Registration failed.");
          return;
        }

        setPendingEmail(value.email);
        setShowOTPModal(true);
        toast.success("OTP sent! Check your email.");
      } catch {
        toast.error("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otp = otpDigits.join("");
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    setOtpLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: pendingEmail, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Verification failed.");
        return;
      }
      toast.success("🎉 Registration successful! Welcome to TRCELABS.");
      setShowOTPModal(false);
      form.reset();
      router.push("/login");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'Share Tech Mono', 'Courier New', monospace" }}
      className="min-h-screen bg-[#0B1828] flex items-center justify-center relative overflow-hidden py-10"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes flicker { 0%, 100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.4; } 94% { opacity: 1; } 96% { opacity: 0.6; } 97% { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes grid-drift { 0% { background-position: 0 0; } 100% { background-position: 40px 40px; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.93) translateY(16px); } to { opacity: 1; transform: scale(1) translateY(0); } }

        .scanline { position: absolute; width: 100%; height: 2px; background: linear-gradient(to bottom, transparent, rgba(5,222,114,0.05), transparent); animation: scanline 7s linear infinite; pointer-events: none; z-index: 0; }
        .grid-bg { background-image: linear-gradient(rgba(5,222,114,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(5,222,114,0.035) 1px, transparent 1px); background-size: 40px 40px; animation: grid-drift 8s linear infinite; }
        .card-animate { animation: fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) both; }
        .title-flicker { animation: flicker 5s infinite; }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .input-focus-glow:focus-within { box-shadow: 0 0 0 2px rgba(5,222,114,0.35), 0 0 16px rgba(5,222,114,0.08); }
        .btn-glow { transition: all 0.2s ease; }
        .btn-glow:hover { box-shadow: 0 0 24px rgba(5,222,114,0.4), 0 0 48px rgba(5,222,114,0.12); transform: translateY(-1px); }
        .btn-glow:active { transform: translateY(0); }
        .corner-wrap::before { content: ''; position: absolute; top: -1px; left: -1px; width: 16px; height: 16px; border-top: 2px solid #05DE72; border-left: 2px solid #05DE72; }
        .corner-wrap::after { content: ''; position: absolute; top: -1px; right: -1px; width: 16px; height: 16px; border-top: 2px solid #05DE72; border-right: 2px solid #05DE72; }
        .corner-wrap-b::before { content: ''; position: absolute; bottom: -1px; left: -1px; width: 16px; height: 16px; border-bottom: 2px solid #05DE72; border-left: 2px solid #05DE72; }
        .corner-wrap-b::after { content: ''; position: absolute; bottom: -1px; right: -1px; width: 16px; height: 16px; border-bottom: 2px solid #05DE72; border-right: 2px solid #05DE72; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; background: #05DE72; box-shadow: 0 0 6px #05DE72; }
        .row-in { animation: fadeUp 0.35s ease both; }
        .progress-bar { height: 2px; background: linear-gradient(to right, #05DE72, #00ff88); border-radius: 999px; transition: width 0.4s ease; }
        .modal-in { animation: modalIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }
        .otp-input { width: 44px; height: 52px; text-align: center; font-size: 20px; font-weight: bold; background: #060f18; border: 1px solid #1f3347; border-radius: 8px; color: #05DE72; outline: none; font-family: 'Share Tech Mono', monospace; transition: all 0.15s ease; caret-color: #05DE72; }
        .otp-input:focus { border-color: #05DE72; box-shadow: 0 0 0 2px rgba(5,222,114,0.25); }
        .otp-input:not(:placeholder-shown) { border-color: #05DE72; }
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
        className="absolute top-1/3 left-1/5 w-72 h-72 rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #05DE72 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-56 h-56 rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div
        className={`relative z-10 w-full max-w-[440px] mx-4 ${mounted ? "card-animate" : "opacity-0"}`}
      >
        <div className="relative bg-[#0d1f30] border border-gray-700 rounded-2xl p-8 corner-wrap corner-wrap-b">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center">
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
                  SECURE PORTAL
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-600">REG v2.4.1</p>
              <p className="text-[10px] text-[#05DE72]/60">● OPEN</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-white text-2xl font-bold tracking-tight title-flicker">
              NEW USER<span className="text-[#05DE72] cursor-blink">_</span>
            </h2>
            <p className="text-gray-500 text-xs mt-1 tracking-wider">
              CREATE YOUR SECURE ACCOUNT
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {/* --- Full Name --- */}
            <form.Field
              name="fullname"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Full name is required" : undefined,
              }}
            >
              {(field) => (
                <div className="row-in" style={{ animationDelay: "0.05s" }}>
                  <label className="text-[10px] text-gray-500 tracking-[0.15em] uppercase block mb-1.5">
                    FULL NAME
                  </label>
                  <div
                    className={`input-focus-glow relative flex items-center gap-3 bg-[#060f18] border rounded-lg px-4 py-3 transition-all duration-200 ${focused === "fullname" ? "border-[#05DE72]/60" : field.state.meta.errors?.length ? "border-red-500/60" : "border-gray-700"}`}
                  >
                    <User
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${focused === "fullname" ? "text-[#05DE72]" : "text-gray-600"}`}
                      strokeWidth={1.5}
                    />
                    <input
                      placeholder="John Doe"
                      value={field.state.value}
                      onFocus={() => setFocused("fullname")}
                      onBlur={() => {
                        setFocused(null);
                        field.handleBlur();
                      }}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 outline-none tracking-wide"
                    />
                    {field.state.value && (
                      <CheckCircle2
                        className="w-4 h-4 text-[#05DE72] shrink-0"
                        strokeWidth={1.5}
                      />
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

            {/* --- Contact --- */}
            <form.Field
              name="contact"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Contact number required" : undefined,
              }}
            >
              {(field) => (
                <div className="row-in" style={{ animationDelay: "0.1s" }}>
                  <label className="text-[10px] text-gray-500 tracking-[0.15em] uppercase block mb-1.5">
                    CONTACT NUMBER
                  </label>
                  <div
                    className={`input-focus-glow relative flex items-center gap-3 bg-[#060f18] border rounded-lg px-4 py-3 transition-all duration-200 ${focused === "contact" ? "border-[#05DE72]/60" : field.state.meta.errors?.length ? "border-red-500/60" : "border-gray-700"}`}
                  >
                    <Phone
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${focused === "contact" ? "text-[#05DE72]" : "text-gray-600"}`}
                      strokeWidth={1.5}
                    />
                    <input
                      placeholder="+91 98765 43210"
                      value={field.state.value}
                      onFocus={() => setFocused("contact")}
                      onBlur={() => {
                        setFocused(null);
                        field.handleBlur();
                      }}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 outline-none tracking-wide"
                    />
                    {field.state.value && (
                      <CheckCircle2
                        className="w-4 h-4 text-[#05DE72] shrink-0"
                        strokeWidth={1.5}
                      />
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

            {/* --- Email --- */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Email is required" : undefined,
              }}
            >
              {(field) => (
                <div className="row-in" style={{ animationDelay: "0.15s" }}>
                  <label className="text-[10px] text-gray-500 tracking-[0.15em] uppercase block mb-1.5">
                    EMAIL ADDRESS
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
                      placeholder="you@trcelabs.com"
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
                      <CheckCircle2
                        className="w-4 h-4 text-[#05DE72] shrink-0"
                        strokeWidth={1.5}
                      />
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
                  !value ? "Password required" : undefined,
              }}
            >
              {(field) => {
                const pw = field.state.value;
                const strength = !pw
                  ? 0
                  : pw.length < 6
                    ? 1
                    : pw.length < 10
                      ? 2
                      : /[A-Z]/.test(pw) &&
                          /[0-9]/.test(pw) &&
                          /[^a-zA-Z0-9]/.test(pw)
                        ? 4
                        : 3;
                const strengthLabel = ["", "WEAK", "FAIR", "STRONG", "ELITE"];
                const strengthColor = [
                  "",
                  "#ef4444",
                  "#f59e0b",
                  "#05DE72",
                  "#05DE72",
                ];
                const strengthPct = ["0%", "25%", "50%", "75%", "100%"];
                return (
                  <div className="row-in" style={{ animationDelay: "0.2s" }}>
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
                    {pw && (
                      <div className="mt-2">
                        <div className="w-full h-[2px] bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="progress-bar"
                            style={{
                              width: strengthPct[strength],
                              background: strengthColor[strength],
                            }}
                          />
                        </div>
                        <p
                          className="text-[10px] mt-1 tracking-widest"
                          style={{ color: strengthColor[strength] }}
                        >
                          KEY STRENGTH: {strengthLabel[strength]}
                        </p>
                      </div>
                    )}
                    {field.state.meta.errors?.length > 0 && (
                      <p className="text-red-400 text-xs mt-1 tracking-wider">
                        ⚠ {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                );
              }}
            </form.Field>

            {/* --- Confirm Password --- */}
            <form.Field
              name="confirmPassword"
              validators={{
                onChange: ({ value, fieldApi }) =>
                  value !== fieldApi.form.getFieldValue("password")
                    ? "Passwords do not match"
                    : undefined,
              }}
            >
              {(field) => (
                <div className="row-in" style={{ animationDelay: "0.25s" }}>
                  <label className="text-[10px] text-gray-500 tracking-[0.15em] uppercase block mb-1.5">
                    CONFIRM PASSWORD
                  </label>
                  <div
                    className={`input-focus-glow relative flex items-center gap-3 bg-[#060f18] border rounded-lg px-4 py-3 transition-all duration-200 ${focused === "confirmPassword" ? "border-[#05DE72]/60" : field.state.meta.errors?.length ? "border-red-500/60" : "border-gray-700"}`}
                  >
                    <ShieldCheck
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${focused === "confirmPassword" ? "text-[#05DE72]" : "text-gray-600"}`}
                      strokeWidth={1.5}
                    />
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={field.state.value}
                      onFocus={() => setFocused("confirmPassword")}
                      onBlur={() => {
                        setFocused(null);
                        field.handleBlur();
                      }}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 outline-none tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-gray-600 hover:text-[#05DE72] transition-colors duration-150"
                    >
                      {showConfirm ? (
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
                <UserPlus className="w-4 h-4" strokeWidth={2} />
              )}
              {loading ? "INITIATING..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-800">
            <p className="text-center text-gray-500 text-xs tracking-wider">
              ALREADY REGISTERED?{" "}
              <Link
                href="/login"
                className="text-[#05DE72] hover:text-white transition-colors duration-150 font-bold"
              >
                ACCESS PORTAL
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

      {/* ─── OTP MODAL ─── */}
      {showOTPModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="modal-in relative bg-[#0d1f30] border border-[#05DE72]/30 rounded-2xl p-8 w-full max-w-sm mx-4 corner-wrap corner-wrap-b">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#05DE72]/10 border border-[#05DE72]/30 flex items-center justify-center">
                <KeyRound
                  className="w-5 h-5 text-[#05DE72]"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <p className="text-white font-bold tracking-widest text-sm">
                  OTP VERIFICATION
                </p>
                <p className="text-gray-500 text-[10px] tracking-wider">
                  CHECK YOUR EMAIL
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-xs tracking-wider mb-1">
              CODE SENT TO:
            </p>
            <p className="text-[#05DE72] text-sm tracking-wide mb-6 truncate">
              {pendingEmail}
            </p>

            <div className="flex gap-2 justify-center mb-6">
              {otpDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el;
                  }}
                  className="otp-input"
                  maxLength={1}
                  value={digit}
                  placeholder="·"
                  onChange={(e) => handleOTPChange(i, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(i, e)}
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={otpLoading}
              className="btn-glow w-full bg-[#05DE72] text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 tracking-widest text-sm uppercase cursor-pointer disabled:opacity-60"
            >
              {otpLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" strokeWidth={2} />
              )}
              {otpLoading ? "VERIFYING..." : "CONFIRM IDENTITY"}
            </button>

            <button
              onClick={() => setShowOTPModal(false)}
              className="mt-3 w-full text-gray-600 hover:text-gray-400 text-xs tracking-widest py-2 transition-colors duration-150"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
