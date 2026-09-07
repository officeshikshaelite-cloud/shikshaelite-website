"use client";

import React from "react";
import Link from "next/link";

export default function JobDetails() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* =====================================================
          EXECUTIVE HEADER
      ====================================================== */}
      <section className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-10 md:py-24">

        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[450px] w-[450px] rounded-full bg-[#FFB400]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          {/* Back */}
          <Link
            href="/find-jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 transition hover:text-[#FFB400]"
          >
            ← Back to Opportunities
          </Link>

          {/* Heading */}
          <div className="mt-10 max-w-4xl">

            <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
              Executive Opportunity
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
              Head of Physics{" "}
              <span className="text-[#FFB400]">
                — IB Curriculum.
              </span>
            </h1>

          </div>

          {/* Meta strip */}
          <div className="mt-12 grid border border-white/10 bg-white/5 md:grid-cols-3">

            <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
              <p className="text-xs font-bold uppercase tracking-[2px] text-gray-400">
                Institution
              </p>

              <p className="mt-2 font-semibold text-white">
                Confidential Premier International School
              </p>
            </div>

            <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r">
              <p className="text-xs font-bold uppercase tracking-[2px] text-gray-400">
                Location
              </p>

              <p className="mt-2 font-semibold text-white">
                Bengaluru, Karnataka
              </p>
            </div>

            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[2px] text-gray-400">
                Package
              </p>

              <p className="mt-2 font-semibold text-[#FFB400]">
                ₹18L - ₹24L
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <section className="px-6 py-16 md:px-10 md:py-24">

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.5fr_0.75fr]">

          {/* =================================================
              LEFT — JOB BRIEF
          ================================================= */}
          <div className="space-y-8">

            {/* Institution */}
            <article className="border border-gray-200 bg-white p-8 shadow-sm md:p-10">

              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                01 // The Institution
              </p>

              <h2 className="mt-4 text-2xl font-bold text-[#071B4D]">
                About the Institution
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-600">
                Our client is one of South India&apos;s prestigious
                International Baccalaureate continuum schools. With a
                strong commitment to academic standards, the institution
                focuses on preparing students for global opportunities.
              </p>

              <div className="mt-6 border-l-4 border-[#FFB400] bg-[#F8FAFC] px-5 py-4">
                <p className="text-sm leading-7 text-gray-600">
                  Due to confidentiality agreements during this executive
                  search, the exact name of the institution will be disclosed
                  to shortlisted candidates during the interview process.
                </p>
              </div>

            </article>

            {/* Role */}
            <article className="border border-gray-200 bg-white p-8 shadow-sm md:p-10">

              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                02 // The Role
              </p>

              <h2 className="mt-4 text-2xl font-bold text-[#071B4D]">
                Head of Physics
              </h2>

              <p className="mt-5 text-base leading-8 text-gray-600">
                The Head of Physics will lead the department and oversee
                curriculum delivery, faculty development, laboratory
                practices, STEM initiatives and student academic outcomes.
              </p>

              <div className="mt-7 space-y-4">

                <div className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[#FFB400]" />

                  <p className="text-sm leading-7 text-gray-600">
                    Direct and evaluate the pedagogical strategies of the
                    Physics department.
                  </p>
                </div>

                <div className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[#FFB400]" />

                  <p className="text-sm leading-7 text-gray-600">
                    Lead STEM initiatives across Middle and High School.
                  </p>
                </div>

                <div className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[#FFB400]" />

                  <p className="text-sm leading-7 text-gray-600">
                    Manage departmental budgets, laboratory procurement and
                    safety compliance.
                  </p>
                </div>

              </div>

            </article>

            {/* Requirements */}
            <article className="border border-gray-200 bg-white p-8 shadow-sm md:p-10">

              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                03 // Requirements
              </p>

              <h2 className="mt-4 text-2xl font-bold text-[#071B4D]">
                What We&apos;re Looking For
              </h2>

              <div className="mt-7 space-y-4">

                <div className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[#FFB400]" />

                  <p className="text-sm leading-7 text-gray-600">
                    Master&apos;s Degree in Physics or a related field.
                    Ph.D. preferred.
                  </p>
                </div>

                <div className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[#FFB400]" />

                  <p className="text-sm leading-7 text-gray-600">
                    Minimum 8 years of teaching experience with at least
                    3 years in a leadership role.
                  </p>
                </div>

                <div className="flex gap-4">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[#FFB400]" />

                  <p className="text-sm leading-7 text-gray-600">
                    Experience with IB curriculum and demonstrated academic
                    leadership.
                  </p>
                </div>

              </div>

            </article>

          </div>

          {/* =================================================
              RIGHT — APPLICATION
          ================================================== */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">

            <div className="border border-gray-200 bg-[#071B4D] p-8 text-white shadow-xl md:p-9">

              <div className="h-1 w-14 bg-[#FFB400]" />

              <p className="mt-7 text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                Confidential Application
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                Submit Credentials
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Your information will be reviewed confidentially by our
                recruitment team.
              </p>

              <form className="mt-8 space-y-5">

                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-[#FFB400]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-[#FFB400]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91"
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-[#FFB400]"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    LinkedIn Profile URL
                    <span className="ml-1 text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <input
                    type="url"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/..."
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-[#FFB400]"
                  />
                </div>

                {/* Resume */}
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Upload CV / Resume
                  </label>

                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-gray-300 file:mr-4 file:border-0 file:bg-[#FFB400] file:px-4 file:py-2 file:font-semibold file:text-[#071B4D] hover:file:bg-yellow-400"
                  />

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#FFB400] px-6 py-4 font-bold text-[#071B4D] transition hover:bg-yellow-400"
                >
                  Apply Confidentially →
                </button>

              </form>

              <p className="mt-5 text-center text-xs leading-5 text-gray-400">
                Strict confidentiality assured.
              </p>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}