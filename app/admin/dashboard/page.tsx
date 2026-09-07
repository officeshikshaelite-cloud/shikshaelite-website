"use client";
import Link from "next/link";

export default function AdminDashboard() {
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    alert("In the next phase, this will save to your database and appear on the Find Jobs page!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0A1F44] text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-[#F4B400] mb-8">ShikshaElite</h2>
        <nav className="space-y-4">
          <Link href="#" className="block p-3 bg-white/10 rounded-lg font-medium">➕ Post Vacancy</Link>
          <Link href="#" className="block p-3 hover:bg-white/5 rounded-lg text-gray-300">📋 Manage Jobs</Link>
          <Link href="/" className="block p-3 hover:bg-white/5 rounded-lg text-gray-300 mt-auto pt-10">⬅ Back to Website</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Post a New Vacancy</h1>
          <p className="text-gray-500 mb-8">Fill out the details below to push a new job to the public portal.</p>

          <form onSubmit={handlePostJob} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
                <input type="text" placeholder="e.g. Senior Physics PGT" className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Institution Type</label>
                <select className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20">
                  <option>CBSE School</option>
                  <option>ICSE School</option>
                  <option>PU / Degree College</option>
                  <option>International School</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                <input type="text" placeholder="e.g. Bangalore, Karnataka" className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range</label>
                <input type="text" placeholder="e.g. ₹40,000 - ₹60,000 / month" className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description & Requirements *</label>
              <textarea rows={5} placeholder="Describe the role, required qualifications (e.g. B.Ed, M.Sc), and experience..." className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20 resize-none" required></textarea>
            </div>

            <button type="submit" className="w-full bg-[#F4B400] text-[#0A1F44] font-bold py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-sm">
              Publish Vacancy Live
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
}