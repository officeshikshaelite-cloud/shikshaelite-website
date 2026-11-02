"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const type = String(formData.get("type") || "");

    const payload = {
      formType: type === "institution" ? "Management" : "Educators",
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      location: "Website Contact Form",
      details: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      if (!response.ok) {
        console.error("Server response:", text);

        throw new Error(
          text.trim()
            ? `Server error (${response.status}): ${text.slice(0, 300)}`
            : `Server error (${response.status}): Empty response from server.`
        );
      }

      let result: {
        success?: boolean;
        message?: string;
        error?: string;
      };

      try {
        result = JSON.parse(text);
      } catch {
        console.error("Invalid JSON returned by server:", text);

        throw new Error(
          "The server returned an invalid response. Check the VS Code terminal."
        );
      }

      if (!result.success) {
        throw new Error(
          result.error || result.message || "Submission failed."
        );
      }

      setStatus(
        "Thank you. Your request has been submitted successfully."
      );

      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);

      setStatus(
        error instanceof Error
          ? error.message
          : "We couldn't submit your request right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071B4D] px-6 py-24 text-white md:px-10 md:py-32">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-[#FFB400]/10" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[410px] w-[410px] rounded-full border border-[#FFB400]/10" />

        <div className="pointer-events-none absolute -bottom-40 -left-20 h-[450px] w-[450px] rounded-full bg-[#FFB400]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-5xl">

            <div className="flex items-center gap-4">
              <span className="h-[3px] w-14 bg-[#FFB400]" />
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                Contact ShikshaElite
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
              Let&apos;s build something
              <span className="block text-[#FFB400]">
                great together.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-blue-100 md:text-xl">
              Whether you are an institution looking to build a stronger
              team, or an educator seeking your next great opportunity,
              our team is ready to connect.
            </p>

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-[#F8FAFC] px-6 py-20 md:px-10 md:py-28">

        <div className="mx-auto max-w-7xl">

          <div className="grid overflow-hidden border border-gray-200 bg-white lg:grid-cols-[0.9fr_1.1fr]">

            {/* LEFT */}
            <div className="bg-[#071B4D] p-8 text-white md:p-12 lg:p-14">

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />
                <span className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
                  Our Corporate Presence
                </span>
              </div>

              <p className="mt-6 text-base leading-8 text-blue-100">
                Operating globally from Karnataka, India. Delivering
                excellence. Building relationships. Creating impact.
              </p>

              <div className="mt-12 space-y-10">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[2px] text-[#FFB400]">
                    Call / WhatsApp
                  </p>

                  <div className="mt-4 space-y-2">
                    <a
                      href="tel:+919364878590"
                      className="block text-lg font-semibold text-white transition hover:text-[#FFB400]"
                    >
                      +91 93648 78590
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[2px] text-[#FFB400]">
                    Email Us
                  </p>

                  <div className="mt-4 space-y-2">
                    <a
                      href="mailto:info@shikshaelite.com"
                      className="block text-base font-semibold text-white transition hover:text-[#FFB400]"
                    >
                      info@shikshaelite.com
                    </a>

                    <a
                      href="mailto:officeshikshaelite@gmail.com"
                      className="block text-base font-semibold text-white transition hover:text-[#FFB400]"
                    >
                      officeshikshaelite@gmail.com
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[2px] text-[#FFB400]">
                    Registered Office
                  </p>

                  <p className="mt-4 text-base leading-7 text-blue-100">
                    Bengaluru, Karnataka, India
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[2px] text-[#FFB400]">
                    Business Hours
                  </p>

                  <p className="mt-4 text-base font-semibold text-white">
                    Monday – Saturday
                  </p>

                  <p className="mt-1 text-sm text-blue-200">
                    10:00 AM – 6:00 PM (IST)
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT */}
            <div className="p-8 md:p-12 lg:p-14">

              <div className="flex items-center gap-4">
                <span className="h-[3px] w-14 bg-[#FFB400]" />
                <span className="text-xs font-bold uppercase tracking-[3px] text-[#071B4D]">
                  Send Us a Message
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-extrabold text-[#071B4D] md:text-4xl">
                Start a conversation.
              </h2>

              <p className="mt-4 text-gray-600">
                Tell us about your requirement and our team will get back to
                you.
              </p>

              <form
                className="mt-10 space-y-6"
                onSubmit={handleSubmit}
              >

                <div>
                  <label
                    htmlFor="type"
                    className="mb-2 block text-sm font-semibold text-[#071B4D]"
                  >
                    I am representing
                  </label>

                  <select
                    id="type"
                    name="type"
                    defaultValue=""
                    required
                    className="w-full border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-[#FFB400]"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="institution">
                      An Institution
                    </option>
                    <option value="educator">
                      An Educator
                    </option>
                  </select>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#071B4D]"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#FFB400]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-[#071B4D]"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91"
                      className="w-full border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#FFB400]"
                    />
                  </div>

                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#071B4D]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#FFB400]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[#071B4D]"
                  >
                    How can we help?
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell us about your requirement..."
                    className="w-full resize-none border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#FFB400]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex bg-[#071B4D] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#FFB400] hover:text-[#071B4D] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Request →"}
                </button>

                {status && (
                  <p
                    className={`text-sm font-medium ${
                      status.includes("successfully")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {status}
                  </p>
                )}

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-24">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-xs font-bold uppercase tracking-[3px] text-[#FFB400]">
            ShikshaElite
          </p>

          <h2 className="mt-5 text-4xl font-extrabold text-[#071B4D] md:text-5xl">
            Empowering Education.
            <span className="text-[#FFB400]">
              {" "}Elevating Futures.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            We connect institutions, educators and opportunities to create
            stronger outcomes across the education ecosystem.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              href="/services"
              className="bg-[#071B4D] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#102F70]"
            >
              Explore Services →
            </Link>

            <Link
              href="/find-jobs"
              className="border-2 border-[#071B4D] px-8 py-4 text-sm font-bold text-[#071B4D] transition hover:bg-[#071B4D] hover:text-white"
            >
              Find Teaching Jobs →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}