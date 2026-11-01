import Link from "next/link";

export default function Impact() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-10 md:py-28">

      {/* Background architectural lines */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-[8%] top-0 h-full w-px bg-gray-100" />
        <div className="absolute left-[25%] top-0 h-full w-px bg-gray-100" />
        <div className="absolute left-[50%] top-0 h-full w-px bg-gray-100" />
        <div className="absolute left-[75%] top-0 h-full w-px bg-gray-100" />
        <div className="absolute right-[8%] top-0 h-full w-px bg-gray-100" />

        <div className="absolute left-0 right-0 top-[25%] h-px bg-gray-100" />
        <div className="absolute left-0 right-0 top-[50%] h-px bg-gray-100" />
        <div className="absolute left-0 right-0 top-[75%] h-px bg-gray-100" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div>

            <div className="flex items-center gap-4">
              <span className="h-[3px] w-14 bg-[#FFB400]" />

              <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                Proof of Impact
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-[#071B4D] md:text-5xl lg:text-6xl">
              Delivering measurable{" "}
              <span className="text-[#FFB400]">
                academic excellence.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Real outcomes from institutions and educators that have
              partnered with ShikshaElite.
            </p>

          </div>

          <Link
            href="/case-studies"
            className="inline-flex w-fit items-center gap-3 border-b-2 border-[#071B4D] pb-2 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:border-[#FFB400] hover:text-[#FFB400]"
          >
            View all case studies
            <span>→</span>
          </Link>

        </div>

        {/* ================= FEATURED GRID ================= */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">

          {/* Featured */}
          <article className="relative overflow-hidden bg-[#071B4D] p-8 text-white shadow-xl md:p-10 lg:row-span-2">

            {/* Gold accent */}
            <div className="absolute left-0 top-0 h-full w-1 bg-[#FFB400]" />

            <div className="flex items-start justify-between gap-6">

              <div>
                <p className="text-6xl font-extrabold tracking-tight text-[#FFB400] md:text-7xl">
                  40%
                </p>

                <p className="mt-3 text-lg font-semibold text-white">
                  Increase in Faculty Retention
                </p>
              </div>

              <span className="text-xs font-bold uppercase tracking-[2px] text-blue-200">
                Featured Case
              </span>

            </div>

            <div className="mt-10">

              <h3 className="text-2xl font-bold">
                International School of Bangalore
              </h3>

              <p className="mt-5 max-w-xl text-base leading-8 text-blue-100">
                Restructured the science department leadership, sourcing
                12 educators and a new Head of Department within 45 days.
                By aligning educational philosophies, the institution
                strengthened faculty stability and improved student
                testing outcomes.
              </p>

            </div>

            <Link
              href="/case-studies"
              className="mt-10 inline-flex items-center gap-2 font-bold text-[#FFB400] transition hover:text-white"
            >
              Read the full report
              <span>→</span>
            </Link>

          </article>

          {/* Standard cards */}
          <div className="grid gap-6">

            {/* Card 2 */}
            <article className="group bg-[#F8FAFC] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <p className="text-4xl font-extrabold text-[#071B4D]">
                    14
                    <span className="text-[#FFB400]"> Days</span>
                  </p>

                  <p className="mt-2 text-base font-semibold text-gray-700">
                    Time-to-Hire Accelerated
                  </p>
                </div>

                <span className="text-sm text-gray-300 group-hover:text-[#071B4D]">
                  02
                </span>

              </div>

              <h3 className="mt-7 text-xl font-bold text-[#071B4D]">
                Delhi Public School Society
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Deployed a strategic talent acquisition model to secure
                5 senior administrative leaders ahead of the academic
                calendar.
              </p>

              <Link
                href="/case-studies"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#071B4D] transition hover:text-[#FFB400]"
              >
                Read brief
                <span>→</span>
              </Link>

            </article>

            {/* Card 3 */}
            <article className="group bg-[#F8FAFC] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <p className="text-4xl font-extrabold text-[#071B4D]">
                    100
                    <span className="text-[#FFB400]">%</span>
                  </p>

                  <p className="mt-2 text-base font-semibold text-gray-700">
                    Compliance &amp; Audit Pass Rate
                  </p>
                </div>

                <span className="text-sm text-gray-300 group-hover:text-[#071B4D]">
                  03
                </span>

              </div>

              <h3 className="mt-7 text-xl font-bold text-[#071B4D]">
                Premium Global Academy
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Conducted a comprehensive academic audit, resulting in
                stronger regulatory compliance and improved institutional
                standards.
              </p>

              <Link
                href="/case-studies"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#071B4D] transition hover:text-[#FFB400]"
              >
                Read brief
                <span>→</span>
              </Link>

            </article>

          </div>

        </div>

        {/* ================= BOTTOM STATEMENT ================= */}
        <div className="mt-10 border-t border-gray-200 pt-8">

          <p className="text-sm uppercase tracking-[2px] text-gray-500">
            From recruitment velocity to institutional quality,
            <span className="font-bold text-[#071B4D]">
              {" "}we measure what matters.
            </span>
          </p>

        </div>

      </div>
    </section>
  );
}