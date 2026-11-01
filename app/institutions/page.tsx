import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Institutions | ShikshaElite",
  description:
    "Partner with ShikshaElite to build stronger educational institutions through verified talent acquisition, leadership search, and operational support.",
};

const advantages = [
  {
    number: "01",
    title: "Domain Expertise",
    description:
      "Deep understanding of the education ecosystem with years of on-ground experience.",
  },
  {
    number: "02",
    title: "Verified Talent Pool",
    description:
      "Rigorous screening and verification for quality assurance and compliance.",
  },
  {
    number: "03",
    title: "Faster Turnaround",
    description:
      "Efficient processes to meet urgent hiring needs without compromising quality.",
  },
];

const services = [
  {
    number: "01",
    title: "Leadership Recruitment",
    description:
      "We identify and place transformational leaders—Principals, Coordinators, and HODs—who drive academic excellence.",
  },
  {
    number: "02",
    title: "Teacher Placement",
    description:
      "Connecting schools with passionate, qualified, and reliable educators across all subjects and grade levels.",
  },
  {
    number: "03",
    title: "School Setup & Affiliation",
    description:
      "End-to-end solutions to establish and scale CBSE, ICSE, State Board, and International Schools with confidence.",
  },
  {
    number: "04",
    title: "Technology Solutions",
    description:
      "Intelligent ERPs, HRMS, and CRM systems designed to streamline your institutional operations.",
  },
];

const impact = [
  {
    value: "10+",
    label: "Schools Partnered",
  },
  {
    value: "25+",
    label: "Candidates Placed",
  },
  {
    value: "100%",
    label: "Quality Commitment",
  },
];

export default function InstitutionsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          1. HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#071B4D] px-6 py-24 text-white md:px-10 md:py-32">

        <div className="pointer-events-none absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full border border-[#FFB400]/10" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full border border-[#FFB400]/10" />
        <div className="pointer-events-none absolute -bottom-48 -left-20 h-[500px] w-[500px] rounded-full bg-[#FFB400]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-5xl">

            <div className="flex items-center gap-4">
              <span className="h-[3px] w-14 bg-[#FFB400]" />

              <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                For Institutions
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
              Your partner in building{" "}
              <span className="block text-[#FFB400]">
                stronger institutions.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-blue-100 md:text-xl">
              ShikshaElite is a trusted educational consulting company
              providing end-to-end solutions for schools, colleges,
              universities, and educational organizations across India and
              around the world.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/contact"
                className="bg-[#FFB400] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:bg-yellow-400"
              >
                Partner With Us →
              </Link>

              <Link
                href="/services"
                className="border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#071B4D]"
              >
                Explore Services →
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          2. WHY CHOOSE SHIKSHAELITE
      ====================================================== */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">

            {/* Left */}
            <div>

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                  The ShikshaElite Advantage
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
                Expertise that works for{" "}
                <span className="text-[#FFB400]">
                  education.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                We combine domain expertise, advanced technology, and a
                people-first approach to deliver exceptional results.
              </p>

            </div>

            {/* Right Advantage Cards */}
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
          3. CORE SERVICES
      ====================================================== */}
      <section className="bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                  Our Services in Focus
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-extrabold text-[#071B4D] md:text-5xl">
                Solutions built around{" "}
                <span className="text-[#FFB400]">
                  your institution.
                </span>
              </h2>

            </div>

            <Link
              href="/services"
              className="inline-flex w-fit items-center gap-3 border-b-2 border-[#071B4D] pb-2 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:border-[#FFB400] hover:text-[#FFB400]"
            >
              View all services
              <span>→</span>
            </Link>

          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2">

            {services.map((service) => (
              <article
                key={service.number}
                className="group bg-white p-8 transition duration-300 hover:bg-[#071B4D] md:p-10"
              >

                <div className="flex items-start justify-between">
                  <span className="text-sm font-bold tracking-[2px] text-[#FFB400]">
                    {service.number}
                  </span>

                  <span className="text-gray-300 transition group-hover:text-white">
                    ↗
                  </span>
                </div>

                <h3 className="mt-10 text-2xl font-bold text-[#071B4D] transition-colors duration-300 group-hover:text-white">
                  {service.title}
                </h3>

                <p className="mt-5 min-h-[95px] text-sm leading-7 text-gray-600 transition-colors duration-300 group-hover:text-gray-300">
                  {service.description}
                </p>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#071B4D] transition-colors duration-300 group-hover:text-[#FFB400]"
                >
                  Discuss this service
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          4. IMPACT
      ====================================================== */}
      <section className="bg-black px-6 py-20 text-white md:px-10 md:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                Our Impact. Real Results.
              </p>

              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                Building trust through{" "}
                <span className="text-[#FFB400]">
                  results.
                </span>
              </h2>

            </div>

            <p className="max-w-md text-sm leading-7 text-gray-400">
              Every engagement is approached with a focus on quality,
              responsiveness and long-term institutional value.
            </p>

          </div>

          <div className="mt-14 grid border border-white/10 md:grid-cols-3">

            {impact.map((item, index) => (
              <div
                key={item.label}
                className={`p-8 md:p-10 ${
                  index !== impact.length - 1
                    ? "border-b border-white/10 md:border-b-0 md:border-r"
                    : ""
                }`}
              >

                <p className="text-5xl font-extrabold tracking-tight md:text-6xl">
                  {item.value}
                </p>

                <p className="mt-4 text-sm font-bold uppercase tracking-[2px] text-[#FFB400]">
                  {item.label}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-4xl text-center">

          <div className="inline-flex rounded-full border border-gray-200 px-6 py-2">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#071B4D]">
              Institutional Partnership
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
            Ready to build a stronger{" "}
            <span className="text-[#FFB400]">
              institution?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Tell us about your institution, your priorities, and where you
            want to go next.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex bg-[#071B4D] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#102F70]"
          >
            Partner With ShikshaElite →
          </Link>

        </div>
      </section>

    </main>
  );
}