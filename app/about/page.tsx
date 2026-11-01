import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | ShikshaElite",
  description:
    "Learn about ShikshaElite's vision, mission, and core values in transforming educational institutions and empowering educators globally.",
};

const values = [
  {
    number: "01",
    title: "Integrity",
    description:
      "We uphold the highest standards of honesty, ethics, and transparency in everything we do.",
  },
  {
    number: "02",
    title: "Collaboration",
    description:
      "We believe in the power of teamwork and strong partnerships to achieve shared success.",
  },
  {
    number: "03",
    title: "Excellence",
    description:
      "We are committed to delivering quality and continuous improvement in all our services.",
  },
  {
    number: "04",
    title: "Innovation",
    description:
      "We embrace creative solutions to address evolving educational needs and challenges.",
  },
  {
    number: "05",
    title: "Commitment",
    description:
      "We are dedicated to empowering education and enriching lives across the global ecosystem.",
  },
];

const highlights = [
  {
    title: "Pan India & Global",
    description:
      "Serving institutions across India and internationally.",
  },
  {
    title: "Multi-Domain",
    description:
      "Comprehensive solutions across the entire education ecosystem.",
  },
  {
    title: "Trusted Partner",
    description:
      "Committed to quality, transparency & long-term relationships.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          1. HERO / WHO WE ARE
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#071B4D] px-6 py-24 text-white md:px-10 md:py-32">

        {/* Geometric background */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-[#FFB400]/10" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-[410px] w-[410px] rounded-full border border-[#FFB400]/10" />

        <div className="pointer-events-none absolute -bottom-48 -left-20 h-[500px] w-[500px] rounded-full bg-[#FFB400]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-5xl">

            <div className="flex items-center gap-4">

              <span className="h-[3px] w-14 bg-[#FFB400]" />

              <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                About ShikshaElite
              </span>

            </div>

            <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">

              Empowering education.
              <span className="block text-[#FFB400]">
                Elevating futures.
              </span>

            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-blue-100 md:text-xl">
              ShikshaElite is a professional educational consulting company
              dedicated to empowering institutions through complete, reliable
              and innovative solutions.
            </p>

          </div>

          {/* Who We Are / Purpose */}
          <div className="mt-16 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">

            <article className="bg-[#071B4D] p-8 md:p-10">

              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                Who We Are
              </p>

              <p className="mt-6 text-base leading-8 text-blue-100">
                ShikshaElite is a professional educational consulting company
                dedicated to empowering institutions through complete,
                reliable and innovative solutions. We partner with schools,
                colleges, universities, and educational organizations to build
                strong foundations for academic excellence, operational
                efficiency and sustainable growth.
              </p>

            </article>

            <article className="bg-[#071B4D] p-8 md:p-10">

              <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                Our Purpose
              </p>

              <p className="mt-6 text-base leading-8 text-blue-100">
                To simplify challenges faced by educational institutions by
                providing end-to-end solutions in recruitment, consultancy,
                technology, training and institutional support. With a deep
                understanding of the education ecosystem, we bridge the gap
                between talent and opportunity.
              </p>

            </article>

          </div>

        </div>
      </section>

      {/* =====================================================
          2. VISION & MISSION
      ====================================================== */}
      <section className="bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2">

            {/* Vision */}
            <article className="group bg-white p-10 transition duration-300 hover:bg-[#071B4D] md:p-14">

              <div className="flex items-center gap-4">
                <span className="text-sm font-bold tracking-[2px] text-[#FFB400]">
                  01
                </span>

                <span className="h-px w-16 bg-[#FFB400]" />
              </div>

              <h2 className="mt-10 text-4xl font-extrabold text-[#071B4D] transition group-hover:text-white md:text-5xl">
                Our Vision
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600 transition group-hover:text-gray-300">
                To be a globally trusted leader in educational consulting,
                recognized for transforming institutions and empowering
                communities through innovative and sustainable solutions.
              </p>

            </article>

            {/* Mission */}
            <article className="group bg-white p-10 transition duration-300 hover:bg-[#071B4D] md:p-14">

              <div className="flex items-center gap-4">
                <span className="text-sm font-bold tracking-[2px] text-[#FFB400]">
                  02
                </span>

                <span className="h-px w-16 bg-[#FFB400]" />
              </div>

              <h2 className="mt-10 text-4xl font-extrabold text-[#071B4D] transition group-hover:text-white md:text-5xl">
                Our Mission
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600 transition group-hover:text-gray-300">
                To deliver end-to-end educational solutions that enhance
                learning environments, strengthen institutional capabilities,
                and connect the right talent with the right opportunities.
              </p>

            </article>

          </div>

        </div>
      </section>

      {/* =====================================================
          3. CORE VALUES
      ====================================================== */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="flex items-center gap-4">

                <span className="h-[3px] w-14 bg-[#FFB400]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                  Our Core Values
                </span>

              </div>

              <h2 className="mt-6 text-4xl font-extrabold text-[#071B4D] md:text-5xl">
                Guiding our purpose.
                <span className="block text-[#FFB400]">
                  Driving meaningful change.
                </span>
              </h2>

            </div>

            <p className="max-w-md text-lg leading-8 text-gray-600">
              Our values shape the way we work with institutions, educators,
              partners and communities.
            </p>

          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2 xl:grid-cols-5">

            {values.map((value) => (
              <article
                key={value.number}
                className="group bg-white p-8 transition duration-300 hover:bg-[#071B4D]"
              >

                <span className="text-sm font-bold tracking-[2px] text-[#FFB400]">
                  {value.number}
                </span>

                <h3 className="mt-8 text-2xl font-bold text-[#071B4D] transition group-hover:text-white">
                  {value.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-gray-600 transition group-hover:text-gray-300">
                  {value.description}
                </p>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          4. AT A GLANCE
      ====================================================== */}
      <section className="bg-black px-6 py-20 text-white md:px-10 md:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="flex items-center gap-4">

            <span className="h-[3px] w-14 bg-[#FFB400]" />

            <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
              At a Glance
            </span>

          </div>

          <h2 className="mt-6 text-4xl font-extrabold md:text-5xl">
            Built for education.
            <span className="text-[#FFB400]">
              {" "}Designed for impact.
            </span>
          </h2>

          <div className="mt-14 grid border border-white/10 md:grid-cols-3">

            {highlights.map((item, index) => (
              <article
                key={item.title}
                className={`p-8 md:p-10 ${
                  index !== highlights.length - 1
                    ? "border-b border-white/10 md:border-b-0 md:border-r"
                    : ""
                }`}
              >

                <h3 className="text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {item.description}
                </p>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          5. FINAL CTA
      ====================================================== */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
            The ShikshaElite Approach
          </p>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
            Let&apos;s shape the future of
            <span className="text-[#FFB400]">
              {" "}education together.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Whether you are building an institution, strengthening your
            leadership team, or searching for the right opportunity, our team
            is ready to help.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              href="/contact"
              className="bg-[#071B4D] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#102F70]"
            >
              Partner With Us →
            </Link>

            <Link
              href="/services"
              className="border-2 border-[#071B4D] px-8 py-4 text-sm font-bold text-[#071B4D] transition hover:bg-[#071B4D] hover:text-white"
            >
              Explore Services →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}