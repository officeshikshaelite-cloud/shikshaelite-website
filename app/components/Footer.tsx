import Link from "next/link";

const platformLinks = [
  { label: "Who We Are", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Educator Careers", href: "/hire-educators" },
  { label: "Find Jobs", href: "/find-jobs" },
];

const expertiseLinks = [
  {
    label: "Leadership Placement",
    href: "/services/principal-leadership-placement",
  },
  {
    label: "Teacher Recruitment",
    href: "/services/teacher-recruitment-placement",
  },
  {
    label: "School Affiliation",
    href: "/services/affiliation-compliance",
  },
  {
    label: "Technology Solutions",
    href: "/services/technology-digital-solutions",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">

        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">

          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="inline-block text-3xl font-extrabold tracking-[-1px] text-white"
            >
              Shiksha<span className="text-[#FFB400]">Elite</span>
            </Link>

            <div className="mt-5 h-[3px] w-14 bg-[#FFB400]" />

            <p className="mt-7 max-w-sm text-sm leading-7 text-gray-400">
              Empowering Education. Elevating Futures. We are a trusted
              educational consulting company providing end-to-end solutions
              for institutions and educators across India and around the
              world.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#FFB400] transition hover:gap-5"
            >
              Start a Conversation
              <span>→</span>
            </Link>
          </div>

          {/* PLATFORM */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
              Platform
            </p>

            <div className="mt-7 space-y-4">
              {platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-gray-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* EXPERTISE */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
              Expertise
            </p>

            <div className="mt-7 space-y-4">
              {expertiseLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-gray-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
              Contact Us
            </p>

            <div className="mt-7 space-y-7">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[1px] text-gray-500">
                  Registered Office
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Kalaburagi, Karnataka, India
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[1px] text-gray-500">
                  Email
                </p>

                <div className="mt-2 space-y-1">
                  <a
                    href="mailto:info@shikshaelite.com"
                    className="block text-sm text-gray-300 transition hover:text-[#FFB400]"
                  >
                    info@shikshaelite.com
                  </a>

                  <a
                    href="mailto:officeshikshaelite@gmail.com"
                    className="block text-sm text-gray-300 transition hover:text-[#FFB400]"
                  >
                    officeshikshaelite@gmail.com
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[1px] text-gray-500">
                  Call / WhatsApp
                </p>

                <div className="mt-2 space-y-1">
                  <a
                    href="tel:+917760917509"
                    className="block text-sm text-gray-300 transition hover:text-[#FFB400]"
                  >
                    +91 77609 17509
                  </a>

                  <a
                    href="tel:+919364878590"
                    className="block text-sm text-gray-300 transition hover:text-[#FFB400]"
                  >
                    +91 93648 78590
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* GOLD DIVIDER */}
      <div className="h-[2px] w-full bg-[#FFB400]" />

      {/* BOTTOM BAR */}
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10">

        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} ShikshaElite. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/contact"
            className="text-xs text-gray-500 transition hover:text-white"
          >
            Contact
          </Link>

          <Link
            href="/about"
            className="text-xs text-gray-500 transition hover:text-white"
          >
            About
          </Link>

          <Link
            href="/services"
            className="text-xs text-gray-500 transition hover:text-white"
          >
            Services
          </Link>
        </div>

      </div>

    </footer>
  );
}