import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Link from "next/link";

const academicLevels = [
  {
    number: "01",
    title: "Early Years & K-12",
    roles: "Montessori • PRT • TGT • PGT • Special Educators",
  },
  {
    number: "02",
    title: "PUC & Foundation",
    roles: "11th-12th • JEE • NEET • Foundation Faculty",
  },
  {
    number: "03",
    title: "Undergraduate",
    roles: "BA • BSc • BCom • B.Tech • MBBS • BDS • Nursing",
  },
  {
    number: "04",
    title: "Postgraduate",
    roles: "MA • MSc • MCom • MBA • M.Tech • Medical",
  },
  {
    number: "05",
    title: "PhD & Research",
    roles: "Research Guides • PI • Deans • HODs",
  },
  {
    number: "06",
    title: "EdTech & Global",
    roles: "International Faculty • Online Faculty • SMEs",
  },
];

const educatorFeatures = [
  {
    number: "01",
    title: "Verified Opportunities",
    description:
      "Access curated opportunities across schools, colleges, coaching institutions and universities.",
  },
  {
    number: "02",
    title: "Career Advisory",
    description:
      "Guidance on roles, institutions, positioning and long-term career growth.",
  },
  {
    number: "03",
    title: "Global Careers",
    description:
      "Explore international teaching and academic opportunities with structured placement support.",
  },
  {
    number: "04",
    title: "Interview & Joining",
    description:
      "Support from profile submission through interviews, selection and joining.",
  },
];

const advantages = [
  {
    number: "01",
    title: "Domain Expertise",
    description:
      "Deep understanding of the education ecosystem with practical on-ground experience.",
  },
  {
    number: "02",
    title: "Trusted Network",
    description:
      "Access to a growing, verified network of academic and institutional talent.",
  },
  {
    number: "03",
    title: "Customized Solutions",
    description:
      "Solutions designed around each institution's specific requirements and goals.",
  },
  {
    number: "04",
    title: "Quality & Transparency",
    description:
      "A strong commitment to quality, professionalism and transparent execution.",
  },
];

const stats = [
  {
    value: "10+",
    label: "Schools Partnered",
  },
  {
    value: "25+",
    label: "Candidates Placed",
  },
  {
    value: "Pan India",
    label: "Global Reach",
  },
  {
    value: "100%",
    label: "Quality Commitment",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-[92px]">

        {/* =====================================================
            HERO
        ====================================================== */}
        <Hero />

        {/* =====================================================
            INSTITUTIONAL PARTNERSHIP
        ====================================================== */}
        <section className="bg-black px-6 py-16 text-white md:px-10 md:py-20">
          <div className="mx-auto max-w-7xl text-center">

            <p className="text-xs font-bold uppercase tracking-[4px] text-[#F4B400]">
              Institutional Partnership
            </p>

            <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">
              Your Partner in Building Stronger
              <span className="block">
                Institutions
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
              Together, let&apos;s build institutions that inspire and
              futures that shine.
            </p>

          </div>
        </section>

        {/* =====================================================
            OUR EXPERTISE
            BIG 4 ACCENT CARD STYLE
        ====================================================== */}
        <section className="bg-white px-6 py-20 md:px-10 md:py-28">

          <div className="mx-auto max-w-7xl">

            {/* HEADER */}
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

              <div>

                <div className="flex items-center gap-4">

                  <span className="h-[3px] w-14 bg-[#F4B400]" />

                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#071B4D]">
                    Our Expertise
                  </span>

                </div>

                <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-[#071B4D] md:text-5xl">
                  Complete{" "}
                  <span className="text-[#F4B400]">
                    Educational Solutions.
                  </span>
                </h2>

              </div>

              <Link
                href="/services"
                className="inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#071B4D] transition-colors hover:text-[#F4B400]"
              >
                View All Services
                <span>→</span>
              </Link>

            </div>

            {/* BIG 4 ACCENT GRID */}
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* CARD 1 */}
              <Link
                href="/services/teacher-recruitment-placement"
                className="group flex h-full flex-col justify-between border-t-4 border-transparent bg-[#051024] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-[#F4B400] hover:shadow-2xl md:p-14"
              >
                <div>

                  <div className="mb-10 flex items-center justify-between">

                    <span className="text-sm font-bold tracking-[0.2em] text-gray-500 transition-colors group-hover:text-white">
                      01
                    </span>

                    <span className="translate-x-[-10px] text-2xl text-[#F4B400] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>

                  </div>

                  <h3 className="mb-6 text-3xl font-bold tracking-tight text-white">
                    Leadership & Faculty Placement
                  </h3>

                  <p className="font-light leading-relaxed text-gray-400">
                    Connecting schools and colleges with visionary leaders,
                    verified administrators, and dedicated teaching
                    professionals from across India and abroad.
                  </p>

                </div>

                <div className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-hover:text-[#F4B400]">
                  Explore in Detail
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>

              </Link>

              {/* CARD 2 */}
              <Link
                href="/services/affiliation-compliance"
                className="group flex h-full flex-col justify-between border-t-4 border-transparent bg-[#051024] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-[#F4B400] hover:shadow-2xl md:p-14"
              >
                <div>

                  <div className="mb-10 flex items-center justify-between">

                    <span className="text-sm font-bold tracking-[0.2em] text-gray-500 transition-colors group-hover:text-white">
                      02
                    </span>

                    <span className="translate-x-[-10px] text-2xl text-[#F4B400] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>

                  </div>

                  <h3 className="mb-6 text-3xl font-bold tracking-tight text-white">
                    School Setup & Affiliation
                  </h3>

                  <p className="font-light leading-relaxed text-gray-400">
                    End-to-end solutions to establish and scale CBSE, ICSE,
                    State Board, and International Schools with complete
                    compliance and documentation support.
                  </p>

                </div>

                <div className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-hover:text-[#F4B400]">
                  Explore in Detail
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>

              </Link>

              {/* CARD 3 */}
              <Link
                href="/services/institutional-operations"
                className="group flex h-full flex-col justify-between border-t-4 border-transparent bg-[#051024] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-[#F4B400] hover:shadow-2xl md:p-14"
              >
                <div>

                  <div className="mb-10 flex items-center justify-between">

                    <span className="text-sm font-bold tracking-[0.2em] text-gray-500 transition-colors group-hover:text-white">
                      03
                    </span>

                    <span className="translate-x-[-10px] text-2xl text-[#F4B400] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>

                  </div>

                  <h3 className="mb-6 text-3xl font-bold tracking-tight text-white">
                    Institutional Operations Support
                  </h3>

                  <p className="font-light leading-relaxed text-gray-400">
                    Strategic guidance, process optimization, branding, and
                    day-to-day operational support to ensure smooth
                    institutional functioning.
                  </p>

                </div>

                <div className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-hover:text-[#F4B400]">
                  Explore in Detail
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>

              </Link>

              {/* CARD 4 */}
              <Link
                href="/services/technology-digital-solutions"
                className="group flex h-full flex-col justify-between border-t-4 border-transparent bg-[#051024] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-[#F4B400] hover:shadow-2xl md:p-14"
              >
                <div>

                  <div className="mb-10 flex items-center justify-between">

                    <span className="text-sm font-bold tracking-[0.2em] text-gray-500 transition-colors group-hover:text-white">
                      04
                    </span>

                    <span className="translate-x-[-10px] text-2xl text-[#F4B400] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>

                  </div>

                  <h3 className="mb-6 text-3xl font-bold tracking-tight text-white">
                    Technology & Digital Solutions
                  </h3>

                  <p className="font-light leading-relaxed text-gray-400">
                    Implementing advanced ERP systems, HRMS, CRM, and digital
                    transformation strategies for modern, data-driven
                    educational institutions.
                  </p>

                </div>

                <div className="mt-12 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 transition-colors group-hover:text-[#F4B400]">
                  Explore in Detail
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>

              </Link>

            </div>

          </div>
        </section>

        {/* =====================================================
            ACADEMIC NETWORK
        ====================================================== */}
        <section className="bg-[#F5F7FA] px-6 py-20 md:px-10 md:py-28">

          <div className="mx-auto max-w-7xl">

            <div className="flex items-center gap-4">
              <span className="h-[3px] w-14 bg-[#F4B400]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#071B4D]">
                Academic Network
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

              <h2 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-[#071B4D] md:text-5xl">
                Talent across the
                <span className="block text-[#F4B400]">
                  entire academic lifecycle.
                </span>
              </h2>

              <p className="max-w-md text-base leading-7 text-gray-600">
                From early years educators to university professors,
                research specialists and global academic talent.
              </p>

            </div>

            <div className="mt-14 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2 xl:grid-cols-3">

              {academicLevels.map((level) => (
                <article
                  key={level.number}
                  className="group bg-white p-8 transition-colors duration-300 hover:bg-[#071B4D] md:p-10"
                >

                  <span className="text-xs font-bold tracking-[0.2em] text-[#F4B400]">
                    {level.number}
                  </span>

                  <h3 className="mt-8 text-2xl font-bold text-[#071B4D] transition-colors group-hover:text-white">
                    {level.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-500 transition-colors group-hover:text-gray-300">
                    {level.roles}
                  </p>

                </article>
              ))}

            </div>

            <div className="mt-10">

              <Link
                href="/hire-educators"
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-[#071B4D] transition-colors hover:text-[#F4B400]"
              >
                Explore Educator Network
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>

          </div>
        </section>

        {/* =====================================================
            FOR EDUCATORS
        ====================================================== */}
        <section className="bg-[#071B4D] px-6 py-20 text-white md:px-10 md:py-28">

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

              <div>

                <div className="flex items-center gap-4">

                  <span className="h-[3px] w-14 bg-[#F4B400]" />

                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4B400]">
                    For Educators
                  </span>

                </div>

                <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
                  Your career.
                  <span className="block text-[#F4B400]">
                    Our network.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
                  Discover verified opportunities, connect with leading
                  educational institutions, and get the support you need to
                  make your next career move with confidence.
                </p>

                <Link
                  href="/hire-educators"
                  className="mt-9 inline-flex items-center gap-3 bg-[#F4B400] px-7 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#071B4D] transition hover:bg-white"
                >
                  Join Educator Network
                  <span>→</span>
                </Link>

              </div>

              <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">

                {educatorFeatures.map((item) => (
                  <article
                    key={item.number}
                    className="bg-[#071B4D] p-8 transition-colors duration-300 hover:bg-[#102B64]"
                  >

                    <span className="text-xs font-bold tracking-[0.2em] text-[#F4B400]">
                      {item.number}
                    </span>

                    <h3 className="mt-7 text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-blue-100/70">
                      {item.description}
                    </p>

                  </article>
                ))}

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            THE ADVANTAGE
        ====================================================== */}
        <section className="bg-white px-6 py-20 md:px-10 md:py-28">

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.4fr]">

              <div>

                <div className="flex items-center gap-4">

                  <span className="h-[3px] w-14 bg-[#F4B400]" />

                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#071B4D]">
                    Why Partner With Us
                  </span>

                </div>

                <h2 className="mt-6 text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
                  The ShikshaElite{" "}
                  <span className="text-[#F4B400]">
                    Advantage.
                  </span>
                </h2>

                <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
                  We combine educational expertise, a trusted network,
                  tailored consulting and transparent execution to create
                  stronger outcomes for institutions.
                </p>

                <Link
                  href="/about"
                  className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-[#071B4D] transition-colors hover:text-[#F4B400]"
                >
                  Discover ShikshaElite
                  <span>→</span>
                </Link>

              </div>

              <div className="grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2">

                {advantages.map((item) => (
                  <article
                    key={item.number}
                    className="group bg-white p-8 transition-colors duration-300 hover:bg-[#071B4D]"
                  >

                    <span className="text-xs font-bold tracking-[0.2em] text-[#F4B400]">
                      {item.number}
                    </span>

                    <h3 className="mt-8 text-xl font-bold text-[#071B4D] transition-colors group-hover:text-white md:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-gray-600 transition-colors group-hover:text-gray-300">
                      {item.description}
                    </p>

                  </article>
                ))}

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            REAL IMPACT
        ====================================================== */}
        <section className="bg-[#071B4D] px-6 py-20 text-white md:px-10 md:py-24">

          <div className="mx-auto max-w-7xl">

            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

              <div>

                <div className="flex items-center gap-4">

                  <span className="h-[3px] w-14 bg-[#F4B400]" />

                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4B400]">
                    Real Impact
                  </span>

                </div>

                <h2 className="mt-6 text-4xl font-extrabold md:text-5xl">
                  Building outcomes that{" "}
                  <span className="text-[#F4B400]">
                    matter.
                  </span>
                </h2>

              </div>

              <p className="max-w-md text-base leading-7 text-blue-100">
                Every relationship we build is designed around quality,
                long-term value and meaningful educational impact.
              </p>

            </div>

            <div className="mt-14 grid border border-white/10 sm:grid-cols-2 lg:grid-cols-4">

              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-8 md:p-10 ${
                    index < stats.length - 1
                      ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >

                  <p className="text-4xl font-extrabold md:text-5xl">
                    {stat.value}
                  </p>

                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#F4B400]">
                    {stat.label}
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

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F4B400]">
              One Ecosystem. Two Paths.
            </p>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl">
              Building stronger institutions.
              <span className="block text-[#F4B400]">
                Elevating educator careers.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Whether you are hiring exceptional talent or looking for your
              next opportunity, ShikshaElite connects the right people with
              the right possibilities.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">

              <Link
                href="/contact"
                className="bg-[#071B4D] px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#F4B400] hover:text-[#071B4D]"
              >
                For Institutions →
              </Link>

              <Link
                href="/hire-educators"
                className="border-2 border-[#071B4D] px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#071B4D] transition hover:bg-[#071B4D] hover:text-white"
              >
                For Educators →
              </Link>

            </div>

          </div>
        </section>

      </main>
    </>
  );
}