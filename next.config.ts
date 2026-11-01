import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/educator/login",
        permanent: true,
      },
      {
        source: "/leadership-hiring",
        destination: "/services/principal-leadership-placement",
        permanent: true,
      },
      {
        source: "/teacher-recruitment",
        destination: "/services/teacher-recruitment-placement",
        permanent: true,
      },
      {
        source: "/school-setup",
        destination: "/services/affiliation-compliance",
        permanent: true,
      },
      {
        source: "/technology-solutions",
        destination: "/services/technology-digital-solutions",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/about",
        permanent: false,
      },
      {
        source: "/educator/forgot-password",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/terms",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/privacy",
        destination: "/contact",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
