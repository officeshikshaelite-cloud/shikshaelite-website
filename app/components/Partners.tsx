export default function Partners() {
  // Placeholder data - replace these with actual image paths when you have client logos
  const partners = [
    { name: "Top International Schools", type: "K-12 Education" },
    { name: "Leading Medical Colleges", type: "Higher Education" },
    { name: "Premier Engineering Institutes", type: "Technical Education" },
    { name: "Global Pre-Schools", type: "Early Childhood" },
    { name: "Renowned Degree Colleges", type: "Undergraduate" },
    { name: "Advanced Research Universities", type: "PhD & PG" },
    { name: "EdTech Platforms", type: "Digital Learning" },
    { name: "Overseas Institutions", type: "Global Partners" },
  ];

  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-[#F4B400] uppercase mb-3">
            Our Network
          </h2>
          <h3 className="text-3xl font-extrabold text-[#0A1F44] sm:text-4xl">
            Trusted by 500+ Institutions Worldwide
          </h3>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            From regional K-12 schools to prestigious international medical universities, top institutions rely on ShikshaElite for their talent needs.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="flex h-32 flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 px-4 text-center transition-all hover:border-[#F4B400] hover:bg-white hover:shadow-lg"
            >
              {/* This is where you will add <Image src="..." /> later */}
              <div className="h-10 w-10 mb-2 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-sm font-bold text-[#0A1F44]">{partner.name}</span>
              <span className="text-xs text-gray-500 mt-1">{partner.type}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}