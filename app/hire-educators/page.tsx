import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Educator Careers & Talent Network | ShikshaElite",
  description:
    "Join the ShikshaElite Educator Network. Discover verified teaching and academic leadership opportunities with top institutions across India and abroad.",
};

const advantages = [
  {
    number: "01",
    title: "Global Reach",
    description:
      "Access a broad network of schools, colleges, and universities across India and selected international markets.",
  },
  {
    number: "02",
    title: "Strict Confidentiality",
    description:
      "Your professional information is handled with discretion, respect, and a strong commitment to privacy.",
  },
  {
    number: "03",
    title: "Long-Term Partnership",
    description:
      "We focus on the right career fit and provide guidance throughout the recruitment and placement journey.",
  },
];

const roles = [
  {
    number: "01",
    title: "Leadership Roles",
    items: [
      "Principals & Vice Principals",
      "Directors & Administrators",
      "Heads of Department (HODs)",
      "Academic Coordinators",
    ],
  },
  {
    number: "02",
    title: "Teaching Roles",
    items: [
      "Post Graduate Teachers (PGT)",
      "Trained Graduate Teachers (TGT)",
      "Primary Teachers (PRT)",
      "Pre-Primary Educators",
    ],
  },
  {
    number: "03",
    title: "Academic Support",
    items: [
      "Curriculum Developers",
      "Special Educators",
      "Student Counselors",
      "Librarians & Lab Assistants",
    ],
  },
  {
    number: "04",
    title: "Administrative",
    items: [
      "HR & Operations Managers",
      "Admission Counselors",
      "Accountants & Finance",
      "IT & System Administrators",
    ],
  },
];

export default function EducatorsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          1. HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#071B4D] px-6 py-24 text-white md:px-10 md:py-32">

        {/* Background geometry */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full border border-[#FFB400]/10" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full border border-[#FFB400]/10" />
        <div className="pointer-events-none absolute -bottom-48 -left-20 h-[500px] w-[500px] rounded-full bg-[#FFB400]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-5xl">

            <div className="flex items-center gap-4">

              <span className="h-[3px] w-14 bg-[#FFB400]" />

              <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                For Educators
              </span>

            </div>

            <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">

              Your dream school.
              <span className="block text-[#FFB400]">
                Our commitment.
              </span>

            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-blue-100 md:text-xl">
              Empowering educators and inspiring generations. We connect
              exceptional academic talent with leading institutions across
              India and internationally through a confidential, ethical, and
              career-focused approach.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/contact"
                className="bg-[#FFB400] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:bg-yellow-400"
              >
                Submit Portfolio →
              </Link>

              <Link
                href="/find-jobs"
                className="border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#071B4D]"
              >
                Explore Roles →
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          2. SHIKSHAELITE ADVANTAGE
      ====================================================== */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">

            {/* Intro */}
            <div>

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                  Why Choose ShikshaElite?
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
                Right talent.
                <span className="text-[#FFB400]">
                  {" "}Right fit.
                </span>
                <br />
                Better future.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                We help educators find opportunities that align with their
                expertise, aspirations, and long-term career goals.
              </p>

            </div>

            {/* Advantages */}
            <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-3">

              {advantages.map((item) => (
                <article
                  key={item.number}
                  className="group bg-white p-7 transition duration-300 hover:bg-[#071B4D] md:p-8"
                >

                  <span className="text-sm font-bold tracking-[2px] text-[#FFB400]">
                    {item.number}
                  </span>

                  <h3 className="mt-8 text-xl font-bold text-[#071B4D] transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-600 transition-colors duration-300 group-hover:text-gray-300">
                    {item.description}
                  </p>

                </article>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          3. ROLES & SUBJECTS
      ====================================================== */}
      <section className="bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                  Positions We Recruit
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-extrabold text-[#071B4D] md:text-5xl">
                Find the role that fits your{" "}
                <span className="text-[#FFB400]">
                  expertise.
                </span>
              </h2>

            </div>

            <Link
              href="/find-jobs"
              className="inline-flex w-fit items-center gap-3 border-b-2 border-[#071B4D] pb-2 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:border-[#FFB400] hover:text-[#FFB400]"
            >
              View Current Roles
              <span>→</span>
            </Link>

          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2">

            {roles.map((role) => (
              <article
                key={role.number}
                className="group bg-white p-8 transition duration-300 hover:bg-[#071B4D] md:p-10"
              >

                <div className="flex items-start justify-between">

                  <span className="text-sm font-bold tracking-[2px] text-[#FFB400]">
                    {role.number}
                  </span>

                  <span className="text-gray-300 transition group-hover:text-white">
                    ↗
                  </span>

                </div>

                <h3 className="mt-10 text-2xl font-bold text-[#071B4D] transition-colors duration-300 group-hover:text-white">
                  {role.title}
                </h3>

                <div className="mt-6 space-y-3">

                  {role.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#FFB400]" />

                      <p className="text-sm leading-6 text-gray-600 transition-colors duration-300 group-hover:text-gray-300">
                        {item}
                      </p>
                    </div>
                  ))}

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          4. PROMISE BANNER
      ====================================================== */}
      <section className="bg-black px-6 py-20 text-white md:px-10 md:py-24">

        <div className="mx-auto max-w-6xl">

          <div className="border-l-4 border-[#FFB400] pl-6 md:pl-10">

            <p className="max-w-4xl text-2xl font-medium leading-10 text-white md:text-4xl md:leading-[1.25]">
              &ldquo;We are committed to delivering excellence, fostering
              trust and creating lasting impact in the education ecosystem.&rdquo;
            </p>

            <div className="mt-8">

              <Link
                href="/contact"
                className="inline-flex bg-[#FFB400] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:bg-yellow-400"
              >
                Begin Your Journey →
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          5. FINAL CTA
      ====================================================== */}
      <section className="bg-white px-6 py-20 md:px-10">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
            Your Next Opportunity
          </p>

          <h2 className="mt-5 text-4xl font-extrabold text-[#071B4D] md:text-5xl">
            Ready to take the next step?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Explore current vacancies or share your profile with our
            recruitment team for future opportunities.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              href="/find-jobs"
              className="bg-[#071B4D] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#102F70]"
            >
              Find Teaching Jobs →
            </Link>

            <Link
              href="/contact"
              className="border-2 border-[#071B4D] px-8 py-4 text-sm font-bold text-[#071B4D] transition hover:bg-[#071B4D] hover:text-white"
            >
              Submit Your Profile →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}