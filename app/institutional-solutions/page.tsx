import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Institutional Solutions | ShikshaElite",
  description:
    "End-to-end solutions for institutional growth: leadership & principal recruitment, faculty hiring, school setup, and digital education technology.",
};

const services = [
  {
    number: "01",
    title: "Leadership & Principal Recruitment",
    description:
      "We identify and place transformational leaders—Principals, Coordinators, and HODs—who drive academic excellence, operational efficiency, and institutional growth.",
    href: "/services/principal-leadership-placement",
    linkText: "Explore Leadership",
  },
  {
    number: "02",
    title: "Teacher Recruitment Solutions",
    description:
      "Connecting schools with passionate, qualified, and reliable educators. From Pre-Primary to Post Graduate Teachers across all academic subjects.",
    href: "/services/teacher-recruitment-placement",
    linkText: "Explore Faculty",
  },
  {
    number: "03",
    title: "School Setup & Affiliation",
    description:
      "Turn your vision into a world-class institution. We provide end-to-end support for CBSE, ICSE, and State Board affiliation from concept to campus.",
    href: "/services/affiliation-compliance",
    linkText: "Explore Setup",
  },
  {
    number: "04",
    title: "Technology & Digital Solutions",
    description:
      "Intelligent systems for better education. We implement advanced ERP, HRMS, CRM, website, and digital solutions to streamline institutional operations.",
    href: "/services/technology-digital-solutions",
    linkText: "Explore Tech",
  },
];

const impact = [
  {
    value: "10+",
    title: "Schools Partnered",
    description:
      "Trusted by educational institutions for recruitment, consulting, and long-term growth.",
  },
  {
    value: "25+",
    title: "Candidates Placed",
    description:
      "Connecting the right academic talent with the right institutional opportunities.",
  },
  {
    value: "100%",
    title: "Commitment to Quality",
    description:
      "Focused on quality, alignment, and measurable value in every engagement.",
  },
];

export default function InstitutionsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#071B4D] px-6 py-24 text-white md:px-10 md:py-32">

        {/* Background geometry */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full border border-[#FFB400]/10" />
        <div className="pointer-events-none absolute -top-20 right-20 h-[360px] w-[360px] rounded-full border border-[#FFB400]/10" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-[#FFB400]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-5xl">

            <div className="flex items-center gap-4">
              <span className="h-[3px] w-14 bg-[#FFB400]" />

              <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                For Institutions
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
              Building stronger institutions.
              <span className="block text-[#FFB400]">
                Brighter futures.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-blue-100 md:text-xl">
              We empower schools and educational institutions with strategic
              guidance, operational excellence, talent solutions, technology,
              and sustainable growth strategies.
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
          SERVICES
      ====================================================== */}
      <section className="bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                  Our Services in Focus
                </span>
              </div>

              <h2 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
                End-to-end solutions for{" "}
                <span className="text-[#FFB400]">
                  institutional growth.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                From leadership and faculty recruitment to school setup,
                academic systems and technology, we support institutions at
                every stage of their journey.
              </p>

            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-3 border-b-2 border-[#071B4D] pb-2 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:border-[#FFB400] hover:text-[#FFB400]"
            >
              Start a Conversation
              <span>→</span>
            </Link>

          </div>

          {/* Service cards */}
          <div className="mt-16 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2">

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

                <h3 className="mt-12 max-w-md text-2xl font-bold leading-tight text-[#071B4D] transition group-hover:text-white">
                  {service.title}
                </h3>

                <p className="mt-5 min-h-[105px] max-w-xl text-sm leading-7 text-gray-600 transition group-hover:text-gray-300">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#071B4D] transition group-hover:text-[#FFB400]"
                >
                  {service.linkText}
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
          IMPACT / RESULTS
      ====================================================== */}
      <section className="bg-black px-6 py-20 text-white md:px-10 md:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                Our Impact. Real Results.
              </p>

              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                Measurable value for
                <span className="text-[#FFB400]">
                  {" "}educational institutions.
                </span>
              </h2>

            </div>

            <p className="max-w-md text-sm leading-7 text-gray-400">
              We focus on outcomes that strengthen people, processes,
              academic quality and institutional performance.
            </p>

          </div>

          <div className="mt-14 grid border border-white/10 md:grid-cols-3">

            {impact.map((item, index) => (
              <div
                key={item.title}
                className={`p-8 md:p-10 ${
                  index !== impact.length - 1
                    ? "border-b border-white/10 md:border-b-0 md:border-r"
                    : ""
                }`}
              >

                <p className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
                  {item.value}
                </p>

                <h3 className="mt-4 text-lg font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-5xl text-center">

          <div className="inline-flex rounded-full border border-gray-200 px-6 py-2">
            <span className="text-xs font-bold uppercase tracking-[2px] text-[#071B4D]">
              Institutional Partnership
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-extrabold text-[#071B4D] md:text-5xl">
            Ready to build a stronger
            <span className="text-[#FFB400]">
              {" "}institution?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Tell us about your institution, your current priorities, and
            where you want to go next.
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