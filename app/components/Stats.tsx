export default function Stats() {
  const stats = [
    {
      id: 1,
      value: "15,000+",
      label: "Educators Placed",
      desc: "Transforming careers across the globe.",
    },
    {
      id: 2,
      value: "500+",
      label: "Partner Institutions",
      desc: "From K-12 schools to Medical Universities.",
    },
    {
      id: 3,
      value: "28+",
      label: "States & UTs Covered",
      desc: "A truly Pan-India recruitment network.",
    },
    {
      id: 4,
      value: "9+",
      label: "Countries Served",
      desc: "Delivering global talent solutions.",
    },
  ];

  return (
    <section className="relative py-24 bg-[#0A1F44] overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F4B400] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-[#F4B400] uppercase mb-3">
            Our Global Impact
          </h2>
          <h3 className="text-3xl font-extrabold text-white sm:text-4xl">
            Numbers That Speak for Themselves
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="relative flex flex-col items-center p-8 text-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-transform hover:-translate-y-2 hover:border-[#F4B400]/50 hover:bg-white/10"
            >
              {/* Golden Accent Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#FDB813] rounded-b-md"></div>
              
              <dt className="order-2 mt-4 text-xl font-bold text-white">
                {stat.label}
              </dt>
              <dd className="order-1 text-5xl font-black tracking-tight text-[#F4B400] drop-shadow-md">
                {stat.value}
              </dd>
              <p className="order-3 mt-3 text-sm text-blue-200">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}