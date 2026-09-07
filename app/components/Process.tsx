export default function Process() {
  const steps = [
    {
      id: "01",
      title: "Requirement Analysis",
      desc: "We conduct a deep dive into your institution's specific needs, academic culture, and role expectations—whether for a Kindergarten teacher or a Medical College Dean.",
    },
    {
      id: "02",
      title: "AI & Global Sourcing",
      desc: "Leveraging our vast digital talent network and AI-powered matching, we source top-tier educators from across India and international borders.",
    },
    {
      id: "03",
      title: "Rigorous Screening",
      desc: "Every candidate undergoes strict evaluation, including subject knowledge testing, pedagogical assessments, and comprehensive background verification.",
    },
    {
      id: "04",
      title: "Curated Shortlisting",
      desc: "We save your HR team countless hours by presenting only the most highly qualified and perfectly matched candidates for your review.",
    },
    {
      id: "05",
      title: "Interviews & Onboarding",
      desc: "We coordinate the entire interview process, assist with final selections, and ensure smooth documentation and offer rollouts.",
    },
    {
      id: "06",
      title: "Post-Placement Support",
      desc: "Our commitment doesn't end at hiring. We maintain continuous follow-ups to ensure long-term candidate retention and institutional satisfaction.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-[#FFF9E8] px-4 py-1.5 text-sm font-bold tracking-widest text-[#F4B400] uppercase mb-4">
            How It Works
          </div>
          <h2 className="text-4xl font-extrabold text-[#0A1F44] tracking-tight sm:text-5xl">
            Our Elite Recruitment Methodology
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A systematic, transparent, and technology-driven process to connect premier institutions with exceptional academic talent.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:bg-[#0A1F44] hover:shadow-xl cursor-default hover:-translate-y-1"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-5xl font-black text-gray-100 transition-colors group-hover:text-[#15366F]">
                  {step.id}
                </span>
                <div className="h-12 w-12 rounded-full bg-[#F4B400] opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-[#0A1F44]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-[#0A1F44] mb-3 transition-colors group-hover:text-white">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed transition-colors group-hover:text-blue-100">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}