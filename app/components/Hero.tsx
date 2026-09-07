"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-92px)] overflow-hidden bg-black text-white">

      {/* =====================================================
          ANIMATION STYLES
      ====================================================== */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .hero-fade-1 {
          opacity: 0;
          animation: fadeUp 700ms ease-out forwards;
          animation-delay: 150ms;
        }

        .hero-fade-2 {
          opacity: 0;
          animation: fadeUp 700ms ease-out forwards;
          animation-delay: 350ms;
        }

        .hero-fade-3 {
          opacity: 0;
          animation: fadeUp 700ms ease-out forwards;
          animation-delay: 600ms;
        }

        .hero-fade-4 {
          opacity: 0;
          animation: fadeUp 700ms ease-out forwards;
          animation-delay: 850ms;
        }

        .hero-spin {
          animation: slowSpin 90s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade-1,
          .hero-fade-2,
          .hero-fade-3,
          .hero-fade-4 {
            opacity: 1;
            animation: none;
          }

          .hero-spin {
            animation: none;
          }
        }
      `}</style>

      {/* =====================================================
          AMBIENT GEOMETRIC BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2">

        {/* Outer circles */}
        <div className="absolute inset-0 rounded-full border border-[#F4B400]/10" />

        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F4B400]/10" />

        <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F4B400]/15" />

        <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F4B400]/20" />

        {/* Rotating lines */}
        <div className="hero-spin absolute inset-0">

          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-px w-[280px] origin-left bg-[#F4B400]/20"
              style={{
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}

        </div>

        {/* Central core */}
        <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[0_0_80px_rgba(244,180,0,0.05)]" />

      </div>

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}
      <div className="relative z-10 flex min-h-[calc(100vh-92px)] items-start justify-center px-6 pb-32 pt-[72px] md:px-10 md:pt-[78px]">

        <div className="mx-auto w-full max-w-[900px] text-center">

          {/* Badge */}
          <div className="hero-fade-1 inline-flex rounded-full border border-white/20 bg-white/[0.02] px-6 py-2.5">

            <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#F4B400] md:text-xs">
              Empowering Education. Elevating Futures.
            </span>

          </div>

          {/* Main Headline */}
          <h1 className="hero-fade-2 mt-8 text-[54px] font-extrabold leading-[0.96] tracking-[-2px] sm:text-[64px] md:text-[78px] lg:text-[84px]">

            <span className="block text-white">
              Connecting
            </span>

            <span className="block text-[#F4B400]">
              people.
            </span>

            <span className="block text-white">
              Transforming
            </span>

            <span className="block text-[#9CA3AF]">
              education.
            </span>

          </h1>

          {/* Description */}
          <p className="hero-fade-3 mx-auto mt-8 max-w-[780px] text-sm leading-7 text-gray-300 md:text-[15px] md:leading-8">
            ShikshaElite is a trusted educational consulting company
            providing end-to-end solutions for schools, colleges,
            universities, teachers, and educational organizations across
            India and around the world. We don&apos;t just fill positions.
            We build partnerships that transform education.
          </p>

          {/* Buttons */}
          <div className="hero-fade-4 mt-9 flex flex-wrap justify-center gap-4">

            <Link
              href="/institutional-solutions"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-[#F4B400]"
            >
              For Institutions
            </Link>

            <Link
              href="/hire-educators"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-[#F4B400]"
            >
              For Educators
            </Link>

            <Link
              href="/services"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:bg-[#F4B400]"
            >
              Explore Services
            </Link>

          </div>

        </div>

      </div>

      {/* =====================================================
          GOLD TRANSITION BAR
      ====================================================== */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#F4B400]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 md:px-10">

          <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#071B4D] md:text-xs">
            Explore our complete service portfolio
          </span>

          <Link
            href="/services"
            className="text-xs font-bold text-[#071B4D] transition hover:underline"
          >
            Explore →
          </Link>

        </div>

      </div>

    </section>
  );
}