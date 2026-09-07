"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

type Job = {
  id: number;
  title: string;
  institution: string;
  location: string;
  type: string;
  posted: string;
  salary: string;
  category: "Leadership" | "STEM" | "Humanities" | "International";
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Head of Physics — IB Curriculum",
    institution: "Confidential Premier International School",
    location: "Bengaluru, Karnataka",
    type: "Full-Time",
    posted: "2 Days Ago",
    salary: "₹18L - ₹24L",
    category: "STEM",
  },
  {
    id: 2,
    title: "Dean of Academics",
    institution: "Global Heritage Academy",
    location: "Dubai, UAE",
    type: "Executive",
    posted: "1 Week Ago",
    salary: "Competitive Expat Package",
    category: "Leadership",
  },
  {
    id: 3,
    title: "Senior Mathematics Faculty",
    institution: "Delhi Public School Society",
    location: "New Delhi",
    type: "Full-Time",
    posted: "3 Days Ago",
    salary: "₹12L - ₹16L",
    category: "STEM",
  },
  {
    id: 4,
    title: "Primary Years Programme (PYP) Coordinator",
    institution: "Confidential Tier-1 School",
    location: "Hyderabad, Telangana",
    type: "Full-Time",
    posted: "Just Now",
    salary: "₹10L - ₹14L",
    category: "International",
  },
];

const filters = [
  "All",
  "Leadership",
  "STEM",
  "Humanities",
  "International",
] as const;

export default function FindJobs() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return jobs.filter((job) => {
      const filterMatch =
        activeFilter === "All" || job.category === activeFilter;

      const searchMatch =
        query === "" ||
        job.title.toLowerCase().includes(query) ||
        job.institution.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.type.toLowerCase().includes(query);

      return filterMatch && searchMatch;
    });
  }, [activeFilter, searchQuery]);

  const clearFilters = () => {
    setActiveFilter("All");
    setSearchQuery("");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Navbar */}
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-black px-6 py-20 text-white md:px-10 md:py-28">

        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[#FFB400]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-4xl">

            <div className="flex items-center gap-4">
              <span className="h-[3px] w-14 bg-[#FFB400]" />

              <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                Careers at ShikshaElite
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-extrabold leading-[1.05] md:text-7xl">
              Exclusive{" "}
              <span className="text-[#FFB400]">
                academic opportunities.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
              Discover teaching, academic leadership and institutional
              opportunities with leading educational organizations.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          JOB BOARD
      ====================================================== */}
      <section className="px-6 py-16 md:px-10 md:py-24">

        <div className="mx-auto max-w-7xl">

          {/* Search and Filters */}
          <div className="border border-gray-200 bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              {/* Search */}
              <div className="relative w-full lg:max-w-md">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ⌕
                </span>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search jobs, institutions or locations..."
                  className="w-full border border-gray-200 bg-[#F8FAFC] py-4 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-[#071B4D] focus:bg-white"
                />

              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">

                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`border px-5 py-3 text-xs font-bold uppercase tracking-[1.5px] transition ${
                      activeFilter === filter
                        ? "border-[#071B4D] bg-[#071B4D] text-[#FFB400]"
                        : "border-gray-200 bg-white text-gray-500 hover:border-[#071B4D] hover:text-[#071B4D]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}

              </div>

            </div>
          </div>

          {/* Result Header */}
          <div className="mt-10 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                Open Opportunities
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#071B4D]">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1
                  ? "Opportunity"
                  : "Opportunities"}
              </h2>
            </div>

            {(searchQuery !== "" || activeFilter !== "All") && (
              <button
                type="button"
                onClick={clearFilters}
                className="w-fit text-sm font-semibold text-[#071B4D] underline underline-offset-4 hover:text-[#FFB400]"
              >
                Clear filters
              </button>
            )}

          </div>

          {/* =================================================
              JOB LIST
          ================================================== */}
          <div className="mt-8 space-y-4">

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <article
                  key={job.id}
                  className="group border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#FFB400]/50 hover:shadow-xl md:p-8"
                >

                  <div className="grid gap-8 lg:grid-cols-[1fr_180px] lg:items-center">

                    {/* Job Information */}
                    <div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[1.5px]">

                        <span className="text-[#FFB400]">
                          {job.type}
                        </span>

                        <span className="text-gray-300">
                          •
                        </span>

                        <span className="text-gray-400">
                          {job.posted}
                        </span>

                        <span className="border border-gray-200 px-3 py-1 text-gray-500">
                          {job.category}
                        </span>

                      </div>

                      <h3 className="mt-4 text-2xl font-bold text-[#071B4D] md:text-3xl">
                        {job.title}
                      </h3>

                      <p className="mt-3 text-sm font-medium text-gray-600">
                        {job.institution}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">

                        <span>
                          📍 {job.location}
                        </span>

                        <span className="font-semibold text-[#071B4D]">
                          {job.salary}
                        </span>

                      </div>

                    </div>

                    {/* View Details */}
                    <div>

                      <Link
                        href="/job-details"
                        className="flex w-full items-center justify-center gap-2 bg-[#071B4D] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#15366F]"
                      >
                        View Details
                        <span>→</span>
                      </Link>

                    </div>

                  </div>

                </article>
              ))
            ) : (
              <div className="border border-gray-200 bg-white px-6 py-16 text-center">

                <div className="text-4xl">
                  🔎
                </div>

                <h3 className="mt-5 text-2xl font-bold text-[#071B4D]">
                  No opportunities found
                </h3>

                <p className="mx-auto mt-3 max-w-lg text-gray-500">
                  Try another keyword or clear the filters to see all
                  available opportunities.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-7 bg-[#071B4D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#15366F]"
                >
                  Reset Search
                </button>

              </div>
            )}

          </div>

          {/* =================================================
              TALENT NETWORK CTA
          ================================================== */}
          <div className="mt-12 bg-[#071B4D] p-8 text-white md:p-10">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                  Don&apos;t see the right role?
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  Join the ShikshaElite talent network.
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                  Share your profile with us and stay connected to relevant
                  opportunities.
                </p>
              </div>

              <Link
                href="/contact"
                className="w-fit shrink-0 bg-[#FFB400] px-7 py-4 text-sm font-bold text-[#071B4D] transition hover:bg-yellow-400"
              >
                Join Talent Network →
              </Link>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}