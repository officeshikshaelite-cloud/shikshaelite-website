export default function Industries() {
  const areas = [
    {
      number: "01",
      title: "Early Years & K–12",
      description:
        "Specialists for schools seeking exceptional educators across foundational, primary and secondary education.",
      roles: [
        "Montessori & Kindergarten",
        "PRT, TGT & PGT Faculty",
        "Special Educators & Counsellors",
        "CBSE, ICSE, IB & State Boards",
      ],
    },
    {
      number: "02",
      title: "PUC & Foundation",
      description:
        "Academic talent for senior secondary, competitive preparation and foundation programs.",
      roles: [
        "11th & 12th Grade Faculty",
        "JEE & NEET Faculty",
        "IIT / JEE Foundation Faculty",
        "Science, Commerce & Arts",
      ],
    },
    {
      number: "03",
      title: "Undergraduate Education",
      description:
        "Faculty and academic leadership across degree, engineering, medical and allied disciplines.",
      roles: [
        "BA, BSc & BCom",
        "B.Tech & Technology",
        "MBBS & BDS",
        "Nursing & Allied Health",
      ],
    },
    {
      number: "04",
      title: "Postgraduate Education",
      description:
        "Experienced professors and specialists for advanced academic programs and professional education.",
      roles: [
        "MA, MSc & MCom",
        "MBA & Management",
        "Medical Specializations",
        "M.Tech & Advanced IT",
      ],
    },
    {
      number: "05",
      title: "PhD & Research",
      description:
        "Academic leadership and research talent for institutions building stronger research ecosystems.",
      roles: [
        "PhD Research Guides",
        "Principal Investigators",
        "Deans & HoDs",
        "Research Specialists",
      ],
    },
    {
      number: "06",
      title: "EdTech & Global",
      description:
        "Specialist educators, trainers and academic professionals for international and digital learning environments.",
      roles: [
        "International School Faculty",
        "Online & Remote Instructors",
        "Corporate Trainers",
        "Subject Matter Experts",
      ],
    },
  ];

  return (
    <section className="bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">

          <div>

            <div className="flex items-center gap-4">

              <span className="h-[3px] w-14 bg-[#FFB400]" />

              <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                Faculties & Institutions We Serve
              </span>

            </div>

            <h2 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[#071B4D] md:text-6xl">
              Talent across the
              <span className="block text-[#FFB400]">
                entire academic lifecycle.
              </span>
            </h2>

          </div>

          <p className="max-w-xl text-base leading-8 text-gray-600 lg:justify-self-end md:text-lg">
            From early years educators to university professors, research
            specialists and global academic talent, ShikshaElite connects
            institutions with the people who move education forward.
          </p>

        </div>

        {/* =====================================================
            ACADEMIC GRID
        ====================================================== */}
        <div className="mt-16 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 md:grid-cols-2 xl:grid-cols-3">

          {areas.map((area) => (
            <article
              key={area.number}
              className="group relative min-h-[390px] bg-white p-8 transition duration-500 hover:bg-[#071B4D] md:p-10"
            >

              {/* Number */}
              <div className="flex items-center justify-between">

                <span className="text-xs font-bold tracking-[3px] text-[#FFB400]">
                  {area.number}
                </span>

                <span className="text-lg text-gray-300 transition group-hover:text-[#FFB400]">
                  ↗
                </span>

              </div>

              {/* Content */}
              <div className="mt-20">

                <h3 className="text-2xl font-bold leading-tight text-[#071B4D] transition group-hover:text-white md:text-3xl">
                  {area.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-gray-600 transition group-hover:text-gray-300">
                  {area.description}
                </p>

              </div>

              {/* Roles */}
              <div className="absolute bottom-8 left-8 right-8 space-y-2 md:bottom-10 md:left-10 md:right-10">

                {area.roles.map((role) => (
                  <div
                    key={role}
                    className="flex items-center gap-3 text-xs font-medium text-gray-500 transition group-hover:text-gray-300"
                  >
                    <span className="h-[5px] w-[5px] shrink-0 bg-[#FFB400]" />
                    {role}
                  </div>
                ))}

              </div>

            </article>
          ))}

        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ====================================================== */}
        <div className="mt-14 flex flex-col gap-6 border-t border-gray-200 pt-10 md:flex-row md:items-center md:justify-between">

          <p className="max-w-3xl text-lg font-medium leading-8 text-[#071B4D] md:text-xl">
            One network. Every academic level.
            <span className="text-[#FFB400]">
              {" "}From classroom to research.
            </span>
          </p>

          <a
            href="/hire-educators"
            className="inline-flex w-fit items-center gap-3 text-sm font-bold uppercase tracking-wide text-[#071B4D] transition hover:text-[#FFB400]"
          >
            Explore Educator Careers
            <span>→</span>
          </a>

        </div>

      </div>
    </section>
  );
}