export default function WhyChoose() {
  const differentiators = [
    {
      title: "Vast Global Talent Pool",
      desc: "Access to thousands of verified educators, from K-12 subject experts to PhD-level professors, across India and internationally.",
      icon: (
        <svg className="w-8 h-8 text-[#F4B400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      title: "Lightning-Fast Turnaround",
      desc: "Our AI-driven screening and dedicated recruitment teams ensure you get high-quality shortlists in record time to meet urgent hiring needs.",
      icon: (
        <svg className="w-8 h-8 text-[#F4B400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "100% Ethical & Transparent",
      desc: "We practice zero-fee placements for educators and maintain complete transparency with our partner institutions at every step.",
      icon: (
        <svg className="w-8 h-8 text-[#F4B400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Rigorous Verification",
      desc: "Every candidate undergoes a strict background check, credential verification, and pedagogical evaluation before reaching your desk.",
      icon: (
        <svg className="w-8 h-8 text-[#F4B400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Replacement Guarantee",
      desc: "We stand by our quality. If a candidate leaves due to unforeseen circumstances, we provide reliable replacement support.",
      icon: (
        <svg className="w-8 h-8 text-[#F4B400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: "End-to-End Partnership",
      desc: "From drafting the initial job description to post-placement onboarding, we act as an extension of your institution's HR team.",
      icon: (
        <svg className="w-8 h-8 text-[#F4B400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-[#0A1F44]">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-[#15366F] px-4 py-1.5 text-sm font-bold tracking-widest text-[#FDB813] uppercase mb-4">
            The ShikshaElite Advantage
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Why Premier Institutions Trust Us
          </h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            We deliver uncompromising quality, speed, and ethical recruitment practices to build the educational workforce of tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl border border-blue-900 bg-blue-900/20 p-8 transition-all hover:bg-blue-900/40 hover:border-[#F4B400]"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-blue-100 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}