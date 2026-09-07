import Link from "next/link";
import { notFound } from "next/navigation";

const services = {
  "teacher-recruitment-placement": {
    category: "FOR INSTITUTIONS",
    title: "Teacher Recruitment & Placement",
    intro:
      "Connecting educational institutions with qualified, verified and committed teaching professionals across India and international markets.",
    overview:
      "We help schools, colleges, coaching institutions and universities build stronger academic teams through structured sourcing, screening, evaluation and placement.",
    points: [
      "Primary, TGT, PGT and senior faculty recruitment",
      "JEE, NEET and foundation faculty",
      "Subject specialists across major disciplines",
      "Faculty screening and profile verification",
      "Interview coordination and candidate evaluation",
      "Joining and post-selection support",
    ],
  },

  "principal-leadership-placement": {
    category: "FOR INSTITUTIONS",
    title: "Principal & Leadership Placement",
    intro:
      "Finding transformational academic leaders who can strengthen institutional culture, academic outcomes and long-term growth.",
    overview:
      "Our leadership search connects institutions with Principals, Vice Principals, Deans, HODs, Coordinators and experienced academic administrators.",
    points: [
      "Principal and Vice Principal search",
      "Dean and HOD recruitment",
      "Academic Coordinator placement",
      "Leadership profile evaluation",
      "Confidential executive search",
      "Institution-leader fit assessment",
    ],
  },

  "institutional-operations": {
    category: "FOR INSTITUTIONS",
    title: "Institutional Operations Support",
    intro:
      "Helping educational institutions improve processes, documentation, compliance and operational efficiency.",
    overview:
      "We provide practical operational support designed around the institution's current challenges, growth plans and internal capabilities.",
    points: [
      "Operational process optimization",
      "HR and staffing support",
      "Documentation and workflow systems",
      "Compliance support",
      "Institutional process reviews",
      "Growth and scaling support",
    ],
  },

  "admissions-enrollment": {
    category: "FOR INSTITUTIONS",
    title: "Admissions & Enrollment Consulting",
    intro:
      "Strategic admissions solutions designed to improve outreach, conversion, enrollment and long-term student engagement.",
    overview:
      "We help institutions strengthen the complete admissions journey—from positioning and outreach to enquiry management and enrollment.",
    points: [
      "Admissions strategy",
      "Student enquiry management",
      "Enrollment process optimization",
      "Parent communication",
      "Outreach planning",
      "Retention-focused systems",
    ],
  },

  "technology-digital-solutions": {
    category: "FOR INSTITUTIONS",
    title: "Technology & Digital Solutions",
    intro:
      "Building smarter educational institutions through ERP, HRMS, CRM, websites, applications and digital transformation.",
    overview:
      "We help institutions modernize operations with technology solutions that improve visibility, communication, automation and decision-making.",
    points: [
      "School and college ERP implementation",
      "HRMS and employee management systems",
      "CRM and admissions systems",
      "Institutional websites",
      "Mobile application solutions",
      "Digital transformation consulting",
    ],
  },

  "training-capacity-building": {
    category: "FOR INSTITUTIONS",
    title: "Training & Capacity Building",
    intro:
      "Developing teachers, academic leaders and institutional teams for stronger performance and future-ready education.",
    overview:
      "Our training programs are designed around institutional requirements, professional development goals and measurable improvement.",
    points: [
      "Teacher development programs",
      "Leadership development",
      "Academic skill development",
      "Technology adoption training",
      "Professional development workshops",
      "Institution-specific training",
    ],
  },

  "branding-marketing": {
    category: "FOR INSTITUTIONS",
    title: "Branding & Marketing Solutions",
    intro:
      "Creating stronger institutional identities and digital presence that build trust, visibility and sustainable growth.",
    overview:
      "We combine strategic positioning, branding and digital communication to help educational institutions stand out in competitive markets.",
    points: [
      "Institutional brand strategy",
      "Website and digital presence",
      "Social media strategy",
      "Creative communication",
      "Admissions campaigns",
      "Digital marketing support",
    ],
  },

  "affiliation-compliance": {
    category: "FOR INSTITUTIONS",
    title: "Affiliation & Compliance Assistance",
    intro:
      "Supporting institutions through affiliation, documentation, regulatory requirements and institutional readiness.",
    overview:
      "We help institutions navigate the operational and documentation requirements involved in establishing and strengthening educational institutions.",
    points: [
      "CBSE affiliation support",
      "ICSE affiliation support",
      "State Board requirements",
      "Documentation assistance",
      "Compliance readiness",
      "Institutional preparation",
    ],
  },

  "uniforms-books-resources": {
    category: "FOR INSTITUTIONS",
    title: "Uniforms, Books & Resources",
    intro:
      "Supporting institutions with coordinated access to uniforms, books, learning materials and essential academic resources.",
    overview:
      "We work with trusted partners to simplify institutional sourcing and help schools manage essential resources efficiently.",
    points: [
      "School uniforms",
      "Textbooks and reference books",
      "Learning materials",
      "Institutional supplies",
      "Resource coordination",
      "Vendor support",
    ],
  },

  "international-placement": {
    category: "GLOBAL EDUCATION",
    title: "International Placement Solutions",
    intro:
      "Connecting educators and institutions across borders through structured international recruitment and placement support.",
    overview:
      "We support institutions seeking international academic talent and educators exploring global teaching opportunities.",
    points: [
      "International school recruitment",
      "Global faculty sourcing",
      "International educator opportunities",
      "Documentation coordination",
      "Interview and selection support",
      "Joining and relocation coordination",
    ],
  },
} as const;

type ServiceSlug = keyof typeof services;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in services)) {
    notFound();
  }

  const service = services[slug as ServiceSlug];

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071B4D] px-6 py-24 text-white md:px-10 md:py-32">

        <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-[#FFB400]/10" />

        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[450px] w-[450px] rounded-full bg-[#FFB400]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <Link
            href="/services"
            className="inline-flex items-center gap-3 text-sm font-semibold text-[#FFB400] transition hover:text-white"
          >
            ← Back to Services
          </Link>

          <p className="mt-12 text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
            {service.category}
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
            {service.title}
          </h1>

          <p className="mt-8 max-w-4xl text-lg leading-8 text-blue-100 md:text-xl">
            {service.intro}
          </p>

        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">

          <div>

            <div className="flex items-center gap-4">

              <span className="h-[3px] w-14 bg-[#FFB400]" />

              <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                Service Overview
              </span>

            </div>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
              Built around your
              <span className="block text-[#FFB400]">
                actual requirement.
              </span>
            </h2>

          </div>

          <div>

            <p className="text-lg leading-8 text-gray-600">
              {service.overview}
            </p>

            <div className="mt-10 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2">

              {service.points.map((point, index) => (
                <div
                  key={point}
                  className="bg-white p-7 transition hover:bg-[#071B4D] group"
                >

                  <span className="text-xs font-bold tracking-[2px] text-[#FFB400]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mt-4 text-sm font-semibold leading-6 text-[#071B4D] group-hover:text-white">
                    {point}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-black px-6 py-20 text-white md:px-10 md:py-24">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
            ShikshaElite
          </p>

          <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">
            Ready to take the
            <span className="text-[#FFB400]">
              {" "}next step?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Tell us what you are looking to achieve and our team will help
            shape the right solution.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">

            <Link
              href="/contact"
              className="bg-[#FFB400] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:bg-yellow-400"
            >
              Start a Conversation →
            </Link>

            <Link
              href="/services"
              className="border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:border-[#FFB400] hover:text-[#FFB400]"
            >
              All Services →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}