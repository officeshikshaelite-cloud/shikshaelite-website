import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-6 py-24 text-center">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#071B4D] text-[#F4B400] text-3xl font-black mb-6">
          404
        </div>
        
        <h1 className="text-3xl font-extrabold text-[#071B4D] mb-3">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
          The page you are looking for doesn&apos;t exist, has been removed, or was moved to another location.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-[#071B4D] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#15366F] transition-colors text-sm"
          >
            ← Return to Homepage
          </Link>

          <Link
            href="/services"
            className="block w-full border border-gray-200 text-[#071B4D] font-bold py-3.5 px-6 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Explore Services
          </Link>
          
          <Link
            href="/contact"
            className="block w-full text-xs text-gray-500 hover:text-[#071B4D] py-2 transition-colors"
          >
            Need Help? Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
