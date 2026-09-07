"use client";

import Link from "next/link";
import { useState } from "react";

type MenuType = "who" | "what" | null;
type WhoTab = "overview" | "leadership";
type WhatTab = "services" | "tech";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuType>(null);
  const [activeTab, setActiveTab] = useState<WhoTab | WhatTab>("overview");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const closeMenus = () => {
    setOpenMenu(null);
    setJoinOpen(false);
    setIsMobileOpen(false);
  };

  const goHome = () => {
    closeMenus();

    if (window.location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-[9999] w-full bg-white shadow-sm"
      onMouseLeave={() => {
        setOpenMenu(null);
        setJoinOpen(false);
      }}
    >
      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}
      <div className="mx-auto flex h-[92px] w-full max-w-[1500px] items-center justify-between px-6 lg:px-10">

        {/* LOGO */}
        <Link
          href="/"
          onClick={goHome}
          className="shrink-0 text-[30px] font-extrabold tracking-[-1.5px] text-[#071B4D]"
        >
          Shiksha<span className="text-[#F4B400]">Elite</span>
        </Link>

        {/* =================================================
            DESKTOP NAV
        ================================================== */}
        <nav className="hidden items-center gap-8 lg:flex">

          {/* WHO WE ARE */}
          <button
            type="button"
            onMouseEnter={() => {
              setOpenMenu("who");
              setJoinOpen(false);
              setActiveTab("overview");
            }}
            onClick={() => {
              setOpenMenu(openMenu === "who" ? null : "who");
              setJoinOpen(false);
              setActiveTab("overview");
            }}
            className={`flex items-center gap-1 text-[15px] font-semibold transition ${
              openMenu === "who"
                ? "text-[#F4B400]"
                : "text-[#071B4D] hover:text-[#F4B400]"
            }`}
          >
            Who we are
            <span className="text-[11px]">⌄</span>
          </button>

          {/* WHAT WE DO */}
          <button
            type="button"
            onMouseEnter={() => {
              setOpenMenu("what");
              setJoinOpen(false);
              setActiveTab("services");
            }}
            onClick={() => {
              setOpenMenu(openMenu === "what" ? null : "what");
              setJoinOpen(false);
              setActiveTab("services");
            }}
            className={`flex items-center gap-1 text-[15px] font-semibold transition ${
              openMenu === "what"
                ? "text-[#F4B400]"
                : "text-[#071B4D] hover:text-[#F4B400]"
            }`}
          >
            What we do
            <span className="text-[11px]">⌄</span>
          </button>

          {/* EDUCATOR CAREERS */}
          <Link
            href="/hire-educators"
            onClick={closeMenus}
            className="text-[15px] font-semibold text-[#071B4D] transition hover:text-[#F4B400]"
          >
            Educator Careers
          </Link>

          {/* ABOUT */}
          <Link
            href="/about"
            onClick={closeMenus}
            className="text-[15px] font-semibold text-[#071B4D] transition hover:text-[#F4B400]"
          >
            About Us
          </Link>

          {/* CONTACT */}
          <Link
            href="/contact"
            onClick={closeMenus}
            className="text-[15px] font-semibold text-[#071B4D] transition hover:text-[#F4B400]"
          >
            Contact
          </Link>

        </nav>

        {/* =================================================
            RIGHT ACTIONS
        ================================================== */}
        <div className="hidden items-center gap-5 lg:flex">

          {/* SEARCH */}
          <Link
            href="/find-jobs"
            onClick={closeMenus}
            className="flex items-center gap-2 text-[15px] font-semibold text-[#071B4D] transition hover:text-[#F4B400]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>

            Search
          </Link>

          {/* LANGUAGE */}
          <span className="text-[15px] font-semibold text-[#071B4D]">
            IN - EN
          </span>

          {/* JOIN US */}
          <div
            className="relative"
            onMouseEnter={() => {
              setJoinOpen(true);
              setOpenMenu(null);
            }}
          >
            <button
              type="button"
              onClick={() => {
                setJoinOpen(!joinOpen);
                setOpenMenu(null);
              }}
              className="flex items-center gap-2 bg-[#071B4D] px-5 py-3.5 text-[15px] font-bold text-white transition hover:bg-[#F4B400] hover:text-[#071B4D]"
            >
              Join Us
              <span className="text-xs">⌄</span>
            </button>

            {joinOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-64 border border-gray-200 bg-white p-2 shadow-2xl"
                onMouseEnter={() => setJoinOpen(true)}
              >
                <Link
                  href="/hire-educators"
                  onClick={closeMenus}
                  className="block px-4 py-4 text-sm font-semibold text-[#071B4D] transition hover:bg-gray-50 hover:text-[#F4B400]"
                >
                  <span className="block">For Educators</span>
                  <span className="mt-1 block text-xs font-normal text-gray-500">
                    Explore teaching opportunities
                  </span>
                </Link>

                <Link
                  href="/institutional-solutions"
                  onClick={closeMenus}
                  className="block px-4 py-4 text-sm font-semibold text-[#071B4D] transition hover:bg-gray-50 hover:text-[#F4B400]"
                >
                  <span className="block">For Institutions</span>
                  <span className="mt-1 block text-xs font-normal text-gray-500">
                    Build your institution
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* USER LOGIN */}
          <Link
            href="/login"
            onClick={closeMenus}
            aria-label="Login"
            title="Login"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-[#071B4D] transition hover:border-[#F4B400] hover:bg-[#F4B400]"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
            </svg>
          </Link>

          {/* ADMIN */}
          <Link
            href="/admin"
            onClick={closeMenus}
            aria-label="Admin Login"
            title="Admin Login"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-sm font-extrabold text-[#071B4D] transition hover:border-[#F4B400] hover:bg-[#F4B400]"
          >
            A
          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex h-11 w-11 items-center justify-center border border-gray-200 text-xl text-[#071B4D] transition hover:border-[#F4B400] hover:text-[#F4B400] lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? "×" : "☰"}
        </button>

      </div>

      {/* =====================================================
          WHO WE ARE MEGA MENU
      ====================================================== */}
      {openMenu === "who" && (
        <div
          className="absolute left-0 right-0 top-full border-t border-white/10 bg-[#050505] text-white shadow-2xl"
          onMouseEnter={() => setOpenMenu("who")}
        >
          <div className="mx-auto grid min-h-[430px] max-w-[1500px] grid-cols-[290px_1fr_1.5fr]">

            {/* LEFT */}
            <div className="border-r border-white/10 py-8">

              <button
                type="button"
                onMouseEnter={() => setActiveTab("overview")}
                onClick={() => setActiveTab("overview")}
                className={`flex w-full items-center justify-between border-l-4 px-8 py-5 text-left text-sm font-bold uppercase tracking-widest transition ${
                  activeTab === "overview"
                    ? "border-[#F4B400] bg-[#071B4D] text-[#F4B400]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Purpose & Values
                <span>→</span>
              </button>

              <button
                type="button"
                onMouseEnter={() => setActiveTab("leadership")}
                onClick={() => setActiveTab("leadership")}
                className={`flex w-full items-center justify-between border-l-4 px-8 py-5 text-left text-sm font-bold uppercase tracking-widest transition ${
                  activeTab === "leadership"
                    ? "border-[#F4B400] bg-[#071B4D] text-[#F4B400]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Leadership Team
                <span>→</span>
              </button>

            </div>

            {/* MIDDLE */}
            <div className="border-r border-white/10 px-12 py-12">

              {activeTab === "overview" && (
                <div className="space-y-8">

                  <Link
                    href="/about"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    What we believe in
                  </Link>

                  <Link
                    href="/about"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    Our Vision & Mission
                  </Link>

                  <Link
                    href="/about"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    Core Values
                  </Link>

                </div>
              )}

              {activeTab === "leadership" && (
                <div className="space-y-8">

                  <Link
                    href="/about"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    Leadership Team
                  </Link>

                  <Link
                    href="/about"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    Executive Leadership
                  </Link>

                  <Link
                    href="/about"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    Our Approach
                  </Link>

                </div>
              )}

            </div>

            {/* FEATURED */}
            <div className="relative overflow-hidden px-14 py-12">

              <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#F4B400]">
                Featured
              </p>

              <div className="mt-7 h-[2px] w-12 bg-[#F4B400]" />

              <h2 className="mt-8 text-[44px] font-light leading-[1.08] tracking-[-1px]">
                WHAT&apos;S NEXT
                <span className="block">
                  FOR EDUCATION?
                </span>
              </h2>

              <div className="mt-8 h-[2px] w-14 bg-[#F4B400]" />

              <p className="mt-7 max-w-[420px] text-lg leading-8 text-gray-400">
                We partner with institutions to build stronger teams,
                smarter systems, and the future of learning.
              </p>

              <Link
                href="/about"
                onClick={closeMenus}
                className="mt-9 inline-flex items-center gap-3 text-base font-semibold text-[#F4B400] transition hover:gap-5"
              >
                Discover our approach
                <span>→</span>
              </Link>

            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          WHAT WE DO MEGA MENU
      ====================================================== */}
      {openMenu === "what" && (
        <div
          className="absolute left-0 right-0 top-full border-t border-white/10 bg-[#050505] text-white shadow-2xl"
          onMouseEnter={() => setOpenMenu("what")}
        >
          <div className="mx-auto grid min-h-[430px] max-w-[1500px] grid-cols-[290px_1fr_1.5fr]">

            {/* LEFT */}
            <div className="border-r border-white/10 py-8">

              <button
                type="button"
                onMouseEnter={() => setActiveTab("services")}
                onClick={() => setActiveTab("services")}
                className={`flex w-full items-center justify-between border-l-4 px-8 py-5 text-left text-sm font-bold uppercase tracking-widest transition ${
                  activeTab === "services"
                    ? "border-[#F4B400] bg-[#071B4D] text-[#F4B400]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Consulting
                <span>→</span>
              </button>

              <button
                type="button"
                onMouseEnter={() => setActiveTab("tech")}
                onClick={() => setActiveTab("tech")}
                className={`flex w-full items-center justify-between border-l-4 px-8 py-5 text-left text-sm font-bold uppercase tracking-widest transition ${
                  activeTab === "tech"
                    ? "border-[#F4B400] bg-[#071B4D] text-[#F4B400]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Technology
                <span>→</span>
              </button>

            </div>

            {/* MIDDLE */}
            <div className="border-r border-white/10 px-12 py-12">

              {activeTab === "services" && (
                <div className="space-y-7">

                  <Link
                    href="/services"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    All Services
                  </Link>

                  <Link
                    href="/services/principal-leadership-placement"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    Leadership Recruitment
                  </Link>

                  <Link
                    href="/services/teacher-recruitment-placement"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    Teacher Placement
                  </Link>

                  <Link
                    href="/services/affiliation-compliance"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    School Setup & Affiliation
                  </Link>

                  <Link
                    href="/services/branding-marketing"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    Branding & Marketing
                  </Link>

                </div>
              )}

              {activeTab === "tech" && (
                <div className="space-y-7">

                  <Link
                    href="/services/technology-digital-solutions"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    ERP Implementation
                  </Link>

                  <Link
                    href="/services/technology-digital-solutions"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    HRMS Solutions
                  </Link>

                  <Link
                    href="/services/technology-digital-solutions"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    Digital Classrooms
                  </Link>

                  <Link
                    href="/services/technology-digital-solutions"
                    onClick={closeMenus}
                    className="block text-lg font-light text-gray-300 transition hover:text-[#F4B400]"
                  >
                    Digital Transformation
                  </Link>

                </div>
              )}

            </div>

            {/* FEATURED */}
            <div className="relative overflow-hidden px-14 py-12">

              <p className="text-[11px] font-bold uppercase tracking-[4px] text-[#F4B400]">
                Featured Service
              </p>

              <div className="mt-7 h-[2px] w-12 bg-[#F4B400]" />

              <h2 className="mt-8 text-[44px] font-light leading-[1.08]">
                Digital
                <span className="block text-[#F4B400]">
                  Transformation
                </span>
              </h2>

              <div className="mt-8 h-[2px] w-14 bg-[#F4B400]" />

              <p className="mt-7 max-w-[420px] text-lg leading-8 text-gray-400">
                Streamline your institutional operations with intelligent
                systems built for modern education.
              </p>

              <Link
                href="/services/technology-digital-solutions"
                onClick={closeMenus}
                className="mt-9 inline-flex items-center gap-3 text-base font-semibold text-[#F4B400] transition hover:gap-5"
              >
                Explore solution
                <span>→</span>
              </Link>

            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      {isMobileOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">

          <nav className="space-y-1 px-5 py-5">

            <Link
              href="/about"
              onClick={closeMenus}
              className="block px-4 py-3 font-semibold text-[#071B4D]"
            >
              Who we are
            </Link>

            <Link
              href="/services"
              onClick={closeMenus}
              className="block px-4 py-3 font-semibold text-[#071B4D]"
            >
              What we do
            </Link>

            <Link
              href="/hire-educators"
              onClick={closeMenus}
              className="block px-4 py-3 font-semibold text-[#071B4D]"
            >
              Educator Careers
            </Link>

            <Link
              href="/about"
              onClick={closeMenus}
              className="block px-4 py-3 font-semibold text-[#071B4D]"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              onClick={closeMenus}
              className="block px-4 py-3 font-semibold text-[#071B4D]"
            >
              Contact
            </Link>

            <Link
              href="/find-jobs"
              onClick={closeMenus}
              className="block px-4 py-3 font-semibold text-[#071B4D]"
            >
              Search
            </Link>

            <div className="mt-3 border-t border-gray-200 pt-3">

              <p className="px-4 pb-2 text-xs font-bold uppercase tracking-[2px] text-gray-400">
                Join Us
              </p>

              <Link
                href="/hire-educators"
                onClick={closeMenus}
                className="block px-4 py-3 font-semibold text-[#071B4D]"
              >
                For Educators
              </Link>

              <Link
                href="/institutional-solutions"
                onClick={closeMenus}
                className="block px-4 py-3 font-semibold text-[#071B4D]"
              >
                For Institutions
              </Link>

            </div>

            <Link
              href="/login"
              onClick={closeMenus}
              className="flex items-center gap-3 px-4 py-3 font-semibold text-[#071B4D]"
            >
              Login
            </Link>

            <Link
              href="/admin"
              onClick={closeMenus}
              className="flex items-center gap-3 px-4 py-3 font-semibold text-[#071B4D]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#071B4D] text-xs font-bold">
                A
              </span>
              Admin Login
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}