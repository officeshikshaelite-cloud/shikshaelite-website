import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Complete Educational Services | ShikshaElite",
  description:
    "Explore comprehensive institutional solutions: faculty placement, leadership recruitment, school setup & affiliation, technology systems, and operational consulting.",
};

const managementServices = [
  {
    number: "01",
    title: "Teacher Recruitment & Placement",
    description:
      "Connecting schools, colleges and educational institutions with qualified, verified and dedicated teaching professionals.",
    href: "/services/teacher-recruitment-placement",
  },
  {
    number: "02",
    title: "Principal & Leadership Placement",
    description:
      "Finding Principals, Vice Principals, Deans, HODs and academic leaders aligned with institutional vision.",
    href: "/services/principal-leadership-placement",
  },
  {
    number: "03",
    title: "Institutional Operations Support",
    description:
      "Improving processes, documentation, HR operations, compliance and day-to-day institutional efficiency.",
    href: "/services/institutional-operations",
  },
  {
    number: "04",
    title: "Admissions & Enrollment Consulting",
    description:
      "Strategic admissions solutions designed to strengthen outreach, enquiry conversion and student enrollment.",
    href: "/services/admissions-enrollment",
  },
  {
    number: "05",
    title: "Technology & Digital Solutions",
    description:
      "ERP, HRMS, CRM, websites, applications and digital transformation solutions for modern institutions.",
    href: "/services/technology-digital-solutions",
  },
  {
    number: "06",
    title: "Training & Capacity Building",
    description:
      "Teacher development, leadership training and professional capability-building programs.",
    href: "/services/training-capacity-building",
  },
  {
    number: "07",
    title: "Branding & Marketing Solutions",
    description:
      "Institutional positioning, digital presence, social media, communication and growth marketing.",
    href: "/services/branding-marketing",
  },
  {
    number: "08",
    title: "Affiliation & Compliance Assistance",
    description:
      "Support for CBSE, ICSE, State Board and international affiliation and institutional readiness.",
    href: "/services/affiliation-compliance",
  },
  {
    number: "09",
    title: "Uniforms, Books & Resources",
    description:
      "Coordinated sourcing of uniforms, books, learning materials and essential institutional resources.",
    href: "/services/uniforms-books-resources",
  },
  {
    number: "10",
    title: "International Placement Solutions",
    description:
      "Connecting institutions with international academic talent and supporting global recruitment requirements.",
    href: "/services/international-placement",
  },
];

const educatorServices = [
  {
    number: "01",
    title: "Teaching Job Opportunities",
    description:
      "Explore verified teaching vacancies across schools, colleges, coaching institutions and universities.",
    href: "/find-jobs",
  },
  {
    number: "02",
    title: "Academic Leadership Opportunities",
    description:
      "Discover opportunities for Principals, Coordinators, HODs, Deans and experienced academic leaders.",
    href: "/find-jobs",
  },
  {
    number: "03",
    title: "International Careers",
    description:
      "Explore international school and overseas teaching opportunities with structured placement support.",
    href: "/services/international-placement",
  },
  {
    number: "04",
    title: "Career Advisory",
    description:
      "Guidance on role selection, institution fit, career positioning and long-term academic growth.",
    href: "/hire-educators",
  },
  {
    number: "05",
    title: "Profile & Portfolio Support",
    description:
      "Present your academic experience, achievements and specializations more effectively to institutions.",
    href: "/hire-educators",
  },
  {
    number: "06",
    title: "Interview & Joining Support",
    description:
      "Structured coordination from profile submission through interviews, selection and joining.",
    href: "/hire-educators",
  },
];

const academicLevels = [
  {
    number: "01",
    title: "Early Years & K–12",
    roles: "Montessori • PRT • TGT • PGT • Special Educators",
  },
  {
    number: "02",
    title: "PUC & Foundation",
    roles: "11th–12th • JEE • NEET • Foundation Faculty",
  },
  {
    number: "03",
    title: "Undergraduate",
    roles: "BA • BSc • BCom • B.Tech • MBBS • BDS • Nursing",
  },
  {
    number: "04",
    title: "Postgraduate",
    roles: "MA • MSc • MCom • MBA • M.Tech • Medical Specializations",
  },
  {
    number: "05",
    title: "PhD & Research",
    roles: "Research Guides • PI • Deans • HODs • Research Specialists",
  },
  {
    number: "06",
    title: "EdTech & Global",
    roles: "International Faculty • Online Faculty • Trainers • SMEs",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#071B4D] px-6 py-24 text-white md:px-10 md:py-32">

        <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-[#FFB400]/10" />

        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[450px] w-[450px] rounded-full bg-[#FFB400]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-5xl">

            <div className="flex items-center gap-4">
              <span className="h-[3px] w-14 bg-[#FFB400]" />

              <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                Complete Educational Solutions
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
              Solutions for
              <span className="block text-[#FFB400]">
                institutions and educators.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-blue-100 md:text-xl">
              From building exceptional academic teams to helping educators
              find the right opportunity, ShikshaElite connects the entire
              education ecosystem.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/contact"
                className="bg-[#FFB400] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:bg-yellow-400"
              >
                Start a Conversation →
              </Link>

              <Link
                href="/find-jobs"
                className="border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:border-[#FFB400] hover:text-[#FFB400]"
              >
                Find Opportunities →
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TWO AUDIENCES
      ====================================================== */}
      <section className="bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2">

            {/* INSTITUTIONS */}
            <div className="bg-white p-10 md:p-14">

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                  For Institutions
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-extrabold text-[#071B4D]">
                Build stronger
                <span className="block text-[#FFB400]">
                  institutions.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-gray-600">
                Recruitment, leadership, operations, admissions, technology,
                training, branding, affiliation and complete institutional
                support.
              </p>

              <Link
                href="#management-services"
                className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:text-[#FFB400]"
              >
                Explore Management Services
                <span>→</span>
              </Link>

            </div>

            {/* EDUCATORS */}
            <div className="bg-[#071B4D] p-10 text-white md:p-14">

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                  For Educators
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-extrabold">
                Build your
                <span className="block text-[#FFB400]">
                  next career move.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-blue-100">
                Verified opportunities, career advisory, international
                placements and structured interview and joining support.
              </p>

              <Link
                href="#educator-services"
                className="mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-[#FFB400]"
              >
                Explore Educator Services
                <span>→</span>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MANAGEMENT SERVICES
      ====================================================== */}
      <section
        id="management-services"
        className="bg-white px-6 py-20 md:px-10 md:py-28"
      >

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                  For Institutions & Management
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
                Everything your
                <span className="block text-[#FFB400]">
                  institution needs.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                From talent acquisition and leadership search to technology,
                admissions and operational support.
              </p>

            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:text-[#FFB400]"
            >
              Discuss Your Requirement
              <span>→</span>
            </Link>

          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2 xl:grid-cols-3">

            {managementServices.map((service, index) => (
              <article
                key={service.href}
                className={`group bg-white p-8 transition duration-300 hover:bg-[#071B4D] md:p-10 ${
                  index === managementServices.length - 1
                    ? "xl:col-span-3"
                    : ""
                }`}
              >

                <div className="flex items-center justify-between">

                  <span className="text-xs font-bold tracking-[3px] text-[#FFB400]">
                    {service.number}
                  </span>

                  <span className="text-gray-300 transition group-hover:text-[#FFB400]">
                    ↗
                  </span>

                </div>

                <h3 className="mt-10 text-2xl font-bold leading-tight text-[#071B4D] transition-colors group-hover:text-white">
                  {service.title}
                </h3>

                <p className="mt-5 min-h-[100px] text-sm leading-7 text-gray-600 transition-colors group-hover:text-gray-300">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#071B4D] transition-colors group-hover:text-[#FFB400]"
                >
                  Explore in Detail
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          EDUCATOR SERVICES
      ====================================================== */}
      <section
        id="educator-services"
        className="bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28"
      >

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            <div>

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />

                <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                  For Educators
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
                Your career.
                <span className="block text-[#FFB400]">
                  Our network.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                Opportunities and support designed around where you are
                today and where you want your career to go.
              </p>

            </div>

            <Link
              href="/hire-educators"
              className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:text-[#FFB400]"
            >
              Join Our Educator Network
              <span>→</span>
            </Link>

          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2 xl:grid-cols-3">

            {educatorServices.map((service) => (
              <article
                key={service.number}
                className="group bg-white p-8 transition duration-300 hover:bg-[#071B4D] md:p-10"
              >

                <span className="text-xs font-bold tracking-[3px] text-[#FFB400]">
                  {service.number}
                </span>

                <h3 className="mt-10 text-2xl font-bold text-[#071B4D] transition-colors group-hover:text-white">
                  {service.title}
                </h3>

                <p className="mt-5 min-h-[100px] text-sm leading-7 text-gray-600 transition-colors group-hover:text-gray-300">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#071B4D] transition-colors group-hover:text-[#FFB400]"
                >
                  Explore
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          ACADEMIC LIFECYCLE
      ====================================================== */}
      <section className="bg-black px-6 py-20 text-white md:px-10 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="flex items-center gap-4">
            <span className="h-[3px] w-14 bg-[#FFB400]" />

            <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
              Academic Network
            </span>
          </div>

          <h2 className="mt-6 max-w-4xl text-4xl font-extrabold md:text-5xl">
            Talent across the
            <span className="text-[#FFB400]">
              {" "}entire academic lifecycle.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            From early years educators to university professors, research
            specialists and global academic talent.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-3">

            {academicLevels.map((level) => (
              <div
                key={level.number}
                className="bg-black p-8 transition duration-300 hover:bg-[#071B4D] md:p-10"
              >

                <span className="text-xs font-bold tracking-[3px] text-[#FFB400]">
                  {level.number}
                </span>

                <h3 className="mt-7 text-2xl font-bold">
                  {level.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {level.roles}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-24">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
            One ecosystem. Two paths.
          </p>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
            Building stronger institutions.
            <span className="block text-[#FFB400]">
              Elevating educator careers.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Whether you are hiring exceptional talent or looking for your next
            opportunity, ShikshaElite connects the right people with the right
            possibilities.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">

            <Link
              href="/contact"
              className="bg-[#071B4D] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#FFB400] hover:text-[#071B4D]"
            >
              For Institutions →
            </Link>

            <Link
              href="/hire-educators"
              className="border-2 border-[#071B4D] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:bg-[#071B4D] hover:text-white"
            >
              For Educators →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}