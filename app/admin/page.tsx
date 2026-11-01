"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expectedUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "EliteAdmin123!";

    if (username === expectedUsername && password === expectedPassword) {
      // Success! Send them to the dashboard
      router.push("/admin/dashboard");
    } else {
      // Failed login
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Image src="/logo1.png" alt="Logo" width={60} height={60} className="mx-auto mb-4" />
        <h2 className="text-3xl font-extrabold text-[#0A1F44]">Admin Portal</h2>
        <p className="mt-2 text-sm text-gray-600">Authorized personnel only.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Username</label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-md">
                Invalid credentials. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#0A1F44] hover:bg-[#15366F] focus:outline-none transition-all"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}