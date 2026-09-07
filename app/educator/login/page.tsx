"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export default function EducatorLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email.trim(), password);

      // Successful login
      window.location.href = "/educator/dashboard";
    } catch (error: unknown) {
      console.error("Educator login error:", error);

      if (
        error &&
        typeof error === "object" &&
        "code" in error
      ) {
        const firebaseError = error as { code?: string };

        switch (firebaseError.code) {
          case "auth/invalid-credential":
          case "auth/user-not-found":
          case "auth/wrong-password":
            setError("Invalid email or password.");
            break;

          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;

          case "auth/too-many-requests":
            setError(
              "Too many unsuccessful attempts. Please try again later."
            );
            break;

          default:
            setError("Unable to sign in. Please try again.");
        }
      } else {
        setError("Unable to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC] px-4 py-8 md:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_25px_80px_rgba(7,27,77,0.10)] lg:grid-cols-2">

          {/* =====================================================
              LEFT BRAND PANEL
          ===================================================== */}
          <section className="relative hidden min-h-[720px] overflow-hidden bg-[#071B4D] p-10 text-white lg:flex lg:flex-col lg:justify-between">

            {/* Decorative elements */}
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#FFB400]/20" />

            <div className="absolute -bottom-40 -left-20 h-[430px] w-[430px] rounded-full border border-white/10" />

            <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#FFB400]/10 blur-3xl" />

            <div className="relative z-10">

              {/* Logo */}
              <Link
                href="/"
                className="text-3xl font-black tracking-tight"
              >
                Shiksha<span className="text-[#FFB400]">Elite</span>
              </Link>

              {/* Main message */}
              <div className="mt-24 max-w-xl">

                <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                  Educator Network
                </p>

                <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight">
                  Your career.
                  <span className="block text-[#FFB400]">
                    Your next opportunity.
                  </span>
                </h1>

                <p className="mt-7 max-w-lg text-lg leading-8 text-blue-100">
                  Discover teaching opportunities, connect with leading
                  educational institutions and take your career forward
                  with ShikshaElite.
                </p>

              </div>

              {/* Highlights */}
              <div className="mt-12 grid max-w-lg grid-cols-2 gap-4">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-2xl font-extrabold">
                    Pan India
                  </p>

                  <p className="mt-1 text-sm text-blue-200">
                    Opportunities
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-2xl font-extrabold">
                    Verified
                  </p>

                  <p className="mt-1 text-sm text-blue-200">
                    Education Network
                  </p>
                </div>

              </div>

            </div>

            <p className="relative z-10 text-sm text-blue-200">
              © {new Date().getFullYear()} ShikshaElite. All rights reserved.
            </p>

          </section>

          {/* =====================================================
              RIGHT LOGIN PANEL
          ===================================================== */}
          <section className="flex items-center p-6 sm:p-10 lg:p-16">

            <div className="mx-auto w-full max-w-md">

              {/* Mobile logo */}
              <div className="lg:hidden">
                <Link
                  href="/"
                  className="text-2xl font-black text-[#071B4D]"
                >
                  Shiksha<span className="text-[#FFB400]">Elite</span>
                </Link>
              </div>

              {/* Header */}
              <div className="mt-10 lg:mt-0">

                <div className="flex items-center gap-3">
                  <span className="h-[3px] w-12 bg-[#FFB400]" />

                  <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                    Educator Access
                  </span>
                </div>

                <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[#071B4D]">
                  Welcome back.
                </h2>

                <p className="mt-3 text-gray-500">
                  Sign in to your ShikshaElite educator account.
                </p>

              </div>

              {/* Account badge */}
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0756C8] shadow-sm">

                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M3 9l9-5 9 5-9 5-9-5Z" />
                    <path d="M7 11.5V16c2.5 2 7.5 2 10 0v-4.5" />
                    <path d="M21 10v6" />
                  </svg>

                </div>

                <div>
                  <p className="font-bold text-[#071B4D]">
                    Educator Account
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    For teachers, faculty and education professionals
                  </p>
                </div>

              </div>

              {/* Login form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-[#071B4D]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-[#FFB400] focus:ring-4 focus:ring-[#FFB400]/10"
                    required
                  />

                </div>

                {/* Password */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-sm font-bold text-[#071B4D]"
                    >
                      Password
                    </label>

                    <Link
                      href="/educator/forgot-password"
                      className="text-xs font-bold text-[#0756C8] transition hover:text-[#FFB400]"
                    >
                      Forgot Password?
                    </Link>

                  </div>

                  <div className="relative">

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 pr-20 text-sm text-gray-800 outline-none transition focus:border-[#FFB400] focus:ring-4 focus:ring-[#FFB400]/10"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 transition hover:text-[#071B4D]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-[#0756C8]"
                  />

                  Remember me

                </label>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#0756C8] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#06469F] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

              </form>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-400">
                  New to ShikshaElite?
                </span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Signup */}
              <Link
                href="/educator/signup"
                className="block w-full rounded-xl border-2 border-[#071B4D] px-6 py-4 text-center text-sm font-bold text-[#071B4D] transition hover:bg-[#071B4D] hover:text-white"
              >
                Create Educator Account
              </Link>

              {/* Terms */}
              <p className="mt-6 text-center text-xs leading-5 text-gray-400">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-[#0756C8]"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[#0756C8]"
                >
                  Privacy Policy
                </Link>
                .
              </p>

            </div>

          </section>

        </div>
      </div>
    </main>
  );
}