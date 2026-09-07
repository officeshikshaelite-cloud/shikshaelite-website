"use client";

import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, auth, db } from "../../../lib/firebase";

type EducatorFormData = {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;

  designation: string;
  subjects: string[];
  classes: string[];
  qualification: string;
  additionalQualification: string;
  experience: string;
  currentInstitution: string;
  currentLocation: string;
  preferredLocations: string;
  board: string;

  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  lookingFor: string;
  willingToRelocate: string;

  teachingSpecialisation: string;
  competitiveExamExperience: string;
  leadershipExperience: string;
  languages: string;
  professionalSummary: string;

  cv: File | null;
  photo: File | null;

  agreeTerms: boolean;
  allowRecruitmentSharing: boolean;
};

const initialForm: EducatorFormData = {
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",

  designation: "",
  subjects: [],
  classes: [],
  qualification: "",
  additionalQualification: "",
  experience: "",
  currentInstitution: "",
  currentLocation: "",
  preferredLocations: "",
  board: "",

  currentSalary: "",
  expectedSalary: "",
  noticePeriod: "",
  lookingFor: "Full-Time",
  willingToRelocate: "Yes",

  teachingSpecialisation: "",
  competitiveExamExperience: "",
  leadershipExperience: "",
  languages: "",
  professionalSummary: "",

  cv: null,
  photo: null,

  agreeTerms: false,
  allowRecruitmentSharing: false,
};

const steps = [
  { number: "01", title: "Account" },
  { number: "02", title: "Professional" },
  { number: "03", title: "Career" },
  { number: "04", title: "Profile" },
  { number: "05", title: "Documents" },
];

const subjectOptions = [
  "English",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Social Science",
  "History",
  "Geography",
  "Economics",
  "Commerce",
  "Accountancy",
  "Business Studies",
  "Hindi",
  "Kannada",
  "Other",
];

const classOptions = [
  "Pre-Primary",
  "Grade 1–2",
  "Grade 3–5",
  "Grade 6–8",
  "Grade 9–10",
  "Grade 11–12",
  "Undergraduate",
  "Postgraduate",
];

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-bold text-[#071B4D]">
      {children}
      {required && <span className="ml-1 text-[#F5A900]">*</span>}
    </label>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#F5A900] focus:ring-4 focus:ring-[#F5A900]/10"
      />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs font-bold uppercase tracking-[3px] text-[#F5A900]">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#071B4D]">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
        {description}
      </p>
    </div>
  );
}

function FileUpload({
  title,
  description,
  required = false,
  file,
  accept,
  onChange,
}: {
  title: string;
  description: string;
  required?: boolean;
  file: File | null;
  accept: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <FieldLabel required={required}>{title}</FieldLabel>

      <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 bg-[#FAFBFD] p-6 transition hover:border-[#0756C8] hover:bg-blue-50/30">
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="sr-only"
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0756C8] shadow-sm">
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 16V4" />
              <path d="M7 9l5-5 5 5" />
              <path d="M5 20h14" />
            </svg>
          </div>

          <p className="mt-4 break-all text-sm font-bold text-[#071B4D]">
            {file ? file.name : "Click to upload"}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {file ? "File selected successfully" : description}
          </p>
        </div>
      </label>
    </div>
  );
}

export default function EducatorSignupPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<EducatorFormData>(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  function updateField<K extends keyof EducatorFormData>(
    field: K,
    value: EducatorFormData[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleArrayValue(
    field: "subjects" | "classes",
    value: string,
  ) {
    setForm((current) => {
      const exists = current[field].includes(value);

      return {
        ...current,
        [field]: exists
          ? current[field].filter((item) => item !== value)
          : [...current[field], value],
      };
    });
  }

  function validateCurrentStep() {
    setError("");

    if (step === 0) {
      if (
        !form.fullName.trim() ||
        !form.email.trim() ||
        !form.mobile.trim() ||
        !form.password ||
        !form.confirmPassword
      ) {
        setError("Please complete all required account fields.");
        return false;
      }

      if (form.password.length < 6) {
        setError("Password must contain at least 6 characters.");
        return false;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }

    if (step === 1) {
      if (
        !form.designation.trim() ||
        form.subjects.length === 0 ||
        form.classes.length === 0 ||
        !form.qualification.trim() ||
        !form.experience
      ) {
        setError(
          "Please complete designation, subjects, classes, qualification and experience.",
        );
        return false;
      }
    }

    if (step === 2) {
      if (!form.currentSalary.trim() || !form.preferredLocations.trim()) {
        setError("Please enter your current salary and preferred location.");
        return false;
      }
    }

    if (step === 3) {
      if (!form.professionalSummary.trim()) {
        setError("Please add a short professional summary.");
        return false;
      }
    }

    if (step === 4) {
      if (!form.cv) {
        setError("Please upload your CV / Resume.");
        return false;
      }

      if (!form.agreeTerms) {
        setError("Please accept the Terms & Privacy Policy.");
        return false;
      }

      if (!form.allowRecruitmentSharing) {
        setError(
          "Please allow ShikshaElite to share your profile with relevant institutions for recruitment.",
        );
        return false;
      }
    }

    return true;
  }

  function handleNext() {
    if (!validateCurrentStep()) return;

    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    setError("");

    if (step > 0) {
      setStep((current) => current - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function uploadFile(
    file: File,
    folder: string,
    uid: string,
  ): Promise<string> {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `educators/${uid}/${folder}/${Date.now()}_${safeName}`;

    const storage = getStorage(app);
    const storageRef = ref(storage, path);

    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateCurrentStep()) return;

    setSubmitting(true);
    setError("");

    let createdUserId = "";

    try {
      /*
       * 1. Create Firebase Authentication account
       */
      const credential = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password,
      );

      const user = credential.user;
      createdUserId = user.uid;

      /*
       * 2. Add display name to Firebase Authentication
       */
      await updateProfile(user, {
        displayName: form.fullName.trim(),
      });

      /*
       * 3. Upload CV
       */
      const cvUrl = await uploadFile(form.cv as File, "cv", user.uid);

      /*
       * 4. Upload photo when provided
       */
      let photoUrl = "";

      if (form.photo) {
        photoUrl = await uploadFile(form.photo, "photo", user.uid);
      }

      /*
       * 5. Save complete educator profile in Firestore
       */
      await setDoc(doc(db, "educators", user.uid), {
        uid: user.uid,

        account: {
          fullName: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
          mobile: form.mobile.trim(),
        },

        professional: {
          designation: form.designation.trim(),
          subjects: form.subjects,
          classes: form.classes,
          qualification: form.qualification.trim(),
          additionalQualification:
            form.additionalQualification.trim(),
          experience: form.experience,
          currentInstitution: form.currentInstitution.trim(),
          currentLocation: form.currentLocation.trim(),
          preferredLocations: form.preferredLocations.trim(),
          board: form.board,
        },

        career: {
          currentSalary: form.currentSalary.trim(),
          expectedSalary: form.expectedSalary.trim(),
          noticePeriod: form.noticePeriod,
          lookingFor: form.lookingFor,
          willingToRelocate: form.willingToRelocate,
        },

        profile: {
          teachingSpecialisation:
            form.teachingSpecialisation.trim(),
          competitiveExamExperience:
            form.competitiveExamExperience.trim(),
          leadershipExperience:
            form.leadershipExperience.trim(),
          languages: form.languages.trim(),
          professionalSummary:
            form.professionalSummary.trim(),
        },

        documents: {
          cvUrl,
          cvFileName: form.cv?.name || "",
          photoUrl,
          photoFileName: form.photo?.name || "",
        },

        consent: {
          agreedToTerms: form.agreeTerms,
          recruitmentSharing:
            form.allowRecruitmentSharing,
        },

        role: "educator",
        status: "active",
        profileCompleted: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      /*
       * 6. Registration complete
       */
      window.location.href = "/educator/login?registered=true";
    } catch (err: unknown) {
      console.error("Educator signup error:", err);

      const firebaseError = err as {
        code?: string;
        message?: string;
      };

      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          setError(
            "An account with this email already exists. Please sign in instead.",
          );
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError(
            "Your password is too weak. Please use at least 6 characters.",
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection and try again.",
          );
          break;

        case "storage/unauthorized":
          setError(
            "Account creation started, but file upload was not permitted. Please check Firebase Storage rules.",
          );
          break;

        case "storage/quota-exceeded":
          setError(
            "Storage quota has been exceeded. Please contact ShikshaElite support.",
          );
          break;

        case "permission-denied":
          setError(
            "Account was created, but Firestore rejected the profile save. Please check your Firestore rules.",
          );
          break;

        default:
          setError(
            firebaseError.message ||
              "Something went wrong while creating your educator account. Please try again.",
          );
      }

      /*
       * If Firebase Auth created the account but a later step failed,
       * keep the user informed instead of silently pretending everything worked.
       */
      if (createdUserId) {
        console.warn(
          "Firebase Auth account created, but profile setup did not finish.",
          createdUserId,
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleFileChange(
    field: "cv" | "photo",
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null;

    if (!file) return;

    if (field === "cv") {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        setError("CV must be a PDF, DOC or DOCX file.");
        event.target.value = "";
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("CV size must be 10 MB or less.");
        event.target.value = "";
        return;
      }
    }

    if (field === "photo") {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image.");
        event.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Photo size must be 5 MB or less.");
        event.target.value = "";
        return;
      }
    }

    setError("");
    updateField(field, file);
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-[#071B4D] sm:text-3xl"
          >
            Shiksha<span className="text-[#F5A900]">Elite</span>
          </Link>

          <Link
            href="/educator/login"
            className="text-sm font-bold text-[#0756C8] hover:text-[#071B4D]"
          >
            Already have an account? Sign In
          </Link>
        </div>

        {/* Main card */}
        <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_25px_80px_rgba(7,27,77,0.10)]">

          {/* Brand */}
          <div className="bg-[#071B4D] px-6 py-10 text-white sm:px-10 lg:px-14">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#F5A900]">
                Educator Network
              </p>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Create your educator account.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Build your professional profile once and use it to discover
                and apply for relevant education opportunities.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="border-b border-gray-200 px-6 py-6 sm:px-10 lg:px-14">
            <div className="mx-auto max-w-5xl">
              <div className="mb-4 flex items-center justify-between gap-2">
                {steps.map((item, index) => (
                  <div
                    key={item.number}
                    className="flex min-w-0 flex-1 items-center"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
                        index <= step
                          ? "bg-[#0756C8] text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {index < step ? "✓" : item.number}
                    </div>

                    <div className="ml-2 hidden min-w-0 sm:block">
                      <p
                        className={`truncate text-xs font-bold ${
                          index <= step
                            ? "text-[#071B4D]"
                            : "text-gray-400"
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>

                    {index < steps.length - 1 && (
                      <div
                        className={`mx-2 h-px flex-1 ${
                          index < step
                            ? "bg-[#0756C8]"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#F5A900] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mx-auto max-w-5xl px-6 py-8 sm:px-10 lg:px-14 lg:py-12">

              {/* STEP 1 */}
              {step === 0 && (
                <section>
                  <SectionHeading
                    eyebrow="01 — Account"
                    title="Let's get started."
                    description="Create your secure ShikshaElite educator account."
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <TextInput
                      label="Full Name"
                      value={form.fullName}
                      onChange={(value) =>
                        updateField("fullName", value)
                      }
                      placeholder="Your full name"
                      required
                    />

                    <TextInput
                      label="Email Address"
                      value={form.email}
                      onChange={(value) =>
                        updateField("email", value)
                      }
                      placeholder="name@example.com"
                      type="email"
                      required
                    />

                    <TextInput
                      label="Mobile Number"
                      value={form.mobile}
                      onChange={(value) =>
                        updateField("mobile", value)
                      }
                      placeholder="+91 XXXXX XXXXX"
                      type="tel"
                      required
                    />

                    <div>
                      <FieldLabel required>
                        Create Password
                      </FieldLabel>

                      <input
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                          updateField("password", e.target.value)
                        }
                        placeholder="Minimum 6 characters"
                        required
                        className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-[#F5A900] focus:ring-4 focus:ring-[#F5A900]/10"
                      />
                    </div>

                    <div>
                      <FieldLabel required>
                        Confirm Password
                      </FieldLabel>

                      <input
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) =>
                          updateField(
                            "confirmPassword",
                            e.target.value,
                          )
                        }
                        placeholder="Re-enter your password"
                        required
                        className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-[#F5A900] focus:ring-4 focus:ring-[#F5A900]/10"
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 2 */}
              {step === 1 && (
                <section>
                  <SectionHeading
                    eyebrow="02 — Professional"
                    title="Tell us about your teaching profile."
                    description="These details help us match you with relevant opportunities."
                  />

                  <div className="space-y-6">
                    <TextInput
                      label="Current Designation"
                      value={form.designation}
                      onChange={(value) =>
                        updateField("designation", value)
                      }
                      placeholder="e.g. PGT Mathematics / Primary Teacher / Lecturer"
                      required
                    />

                    <div>
                      <FieldLabel required>
                        Subject(s) Teaching
                      </FieldLabel>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {subjectOptions.map((subject) => (
                          <label
                            key={subject}
                            className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                              form.subjects.includes(subject)
                                ? "border-[#0756C8] bg-blue-50 text-[#0756C8]"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={form.subjects.includes(subject)}
                              onChange={() =>
                                toggleArrayValue(
                                  "subjects",
                                  subject,
                                )
                              }
                            />

                            {subject}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <FieldLabel required>
                        Classes / Grades Teaching
                      </FieldLabel>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {classOptions.map((item) => (
                          <label
                            key={item}
                            className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                              form.classes.includes(item)
                                ? "border-[#0756C8] bg-blue-50 text-[#0756C8]"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={form.classes.includes(item)}
                              onChange={() =>
                                toggleArrayValue(
                                  "classes",
                                  item,
                                )
                              }
                            />

                            {item}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <TextInput
                        label="Academic Qualification"
                        value={form.qualification}
                        onChange={(value) =>
                          updateField("qualification", value)
                        }
                        placeholder="e.g. M.Sc, B.Ed, M.Com"
                        required
                      />

                      <TextInput
                        label="Additional Qualification / Certification"
                        value={form.additionalQualification}
                        onChange={(value) =>
                          updateField(
                            "additionalQualification",
                            value,
                          )
                        }
                        placeholder="Optional"
                      />

                      <div>
                        <FieldLabel required>
                          Total Teaching Experience
                        </FieldLabel>

                        <select
                          value={form.experience}
                          onChange={(e) =>
                            updateField(
                              "experience",
                              e.target.value,
                            )
                          }
                          required
                          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#F5A900]"
                        >
                          <option value="">
                            Select experience
                          </option>
                          <option value="Fresher">
                            Fresher
                          </option>
                          <option value="1–2 Years">
                            1–2 Years
                          </option>
                          <option value="3–5 Years">
                            3–5 Years
                          </option>
                          <option value="6–10 Years">
                            6–10 Years
                          </option>
                          <option value="11–15 Years">
                            11–15 Years
                          </option>
                          <option value="15+ Years">
                            15+ Years
                          </option>
                        </select>
                      </div>

                      <TextInput
                        label="Current Institution"
                        value={form.currentInstitution}
                        onChange={(value) =>
                          updateField(
                            "currentInstitution",
                            value,
                          )
                        }
                        placeholder="School / College / Organisation"
                      />

                      <TextInput
                        label="Current Location"
                        value={form.currentLocation}
                        onChange={(value) =>
                          updateField(
                            "currentLocation",
                            value,
                          )
                        }
                        placeholder="City, State"
                      />

                      <TextInput
                        label="Preferred Job Location(s)"
                        value={form.preferredLocations}
                        onChange={(value) =>
                          updateField(
                            "preferredLocations",
                            value,
                          )
                        }
                        placeholder="e.g. Bengaluru, Hyderabad, Karnataka"
                        required
                      />
                    </div>

                    <div>
                      <FieldLabel>
                        Preferred Board
                      </FieldLabel>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {[
                          "CBSE",
                          "ICSE",
                          "State Board",
                          "IB",
                          "Cambridge",
                          "Any",
                        ].map((board) => (
                          <label
                            key={board}
                            className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                              form.board === board
                                ? "border-[#0756C8] bg-blue-50 text-[#0756C8]"
                                : "border-gray-200 text-gray-600"
                            }`}
                          >
                            <input
                              type="radio"
                              name="board"
                              value={board}
                              checked={form.board === board}
                              onChange={(e) =>
                                updateField(
                                  "board",
                                  e.target.value,
                                )
                              }
                              className="sr-only"
                            />

                            {board}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 3 */}
              {step === 2 && (
                <section>
                  <SectionHeading
                    eyebrow="03 — Career"
                    title="Tell us where your career stands."
                    description="We'll use this information to improve vacancy matching."
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <TextInput
                      label="Current Salary"
                      value={form.currentSalary}
                      onChange={(value) =>
                        updateField(
                          "currentSalary",
                          value,
                        )
                      }
                      placeholder="e.g. ₹35,000 per month"
                      required
                    />

                    <TextInput
                      label="Expected Salary"
                      value={form.expectedSalary}
                      onChange={(value) =>
                        updateField(
                          "expectedSalary",
                          value,
                        )
                      }
                      placeholder="e.g. ₹45,000 per month"
                    />

                    <div>
                      <FieldLabel>
                        Notice Period
                      </FieldLabel>

                      <select
                        value={form.noticePeriod}
                        onChange={(e) =>
                          updateField(
                            "noticePeriod",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#F5A900]"
                      >
                        <option value="">
                          Select notice period
                        </option>
                        <option value="Immediate">
                          Immediate
                        </option>
                        <option value="15 Days">
                          15 Days
                        </option>
                        <option value="30 Days">
                          30 Days
                        </option>
                        <option value="45 Days">
                          45 Days
                        </option>
                        <option value="60 Days">
                          60 Days
                        </option>
                        <option value="90 Days">
                          90 Days
                        </option>
                      </select>
                    </div>

                    <div>
                      <FieldLabel>
                        Looking For
                      </FieldLabel>

                      <select
                        value={form.lookingFor}
                        onChange={(e) =>
                          updateField(
                            "lookingFor",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#F5A900]"
                      >
                        <option value="Full-Time">
                          Full-Time
                        </option>
                        <option value="Part-Time">
                          Part-Time
                        </option>
                        <option value="Contract">
                          Contract
                        </option>
                        <option value="Immediate Joining">
                          Immediate Joining
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <FieldLabel>
                      Willing to Relocate?
                    </FieldLabel>

                    <div className="grid grid-cols-2 gap-3 sm:max-w-md">
                      {["Yes", "No"].map((value) => (
                        <label
                          key={value}
                          className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                            form.willingToRelocate === value
                              ? "border-[#0756C8] bg-blue-50 text-[#0756C8]"
                              : "border-gray-200 text-gray-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name="relocate"
                            value={value}
                            checked={
                              form.willingToRelocate ===
                              value
                            }
                            onChange={(e) =>
                              updateField(
                                "willingToRelocate",
                                e.target.value,
                              )
                            }
                            className="sr-only"
                          />

                          {value}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
                    <p className="text-sm font-bold text-[#071B4D]">
                      Salary privacy
                    </p>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      Your salary information is collected to
                      improve opportunity matching and will not be
                      publicly displayed on your educator profile.
                    </p>
                  </div>
                </section>
              )}

              {/* STEP 4 */}
              {step === 3 && (
                <section>
                  <SectionHeading
                    eyebrow="04 — Profile"
                    title="Make your profile stand out."
                    description="Give institutions a quick understanding of your strengths."
                  />

                  <div className="space-y-5">
                    <div>
                      <FieldLabel>
                        Teaching Specialisation
                      </FieldLabel>

                      <textarea
                        value={form.teachingSpecialisation}
                        onChange={(e) =>
                          updateField(
                            "teachingSpecialisation",
                            e.target.value,
                          )
                        }
                        placeholder="e.g. STEM education, foundational literacy, NEET coaching, activity-based learning..."
                        rows={4}
                        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-[#F5A900] focus:ring-4 focus:ring-[#F5A900]/10"
                      />
                    </div>

                    <div>
                      <FieldLabel>
                        Competitive Exam Experience
                      </FieldLabel>

                      <input
                        value={form.competitiveExamExperience}
                        onChange={(e) =>
                          updateField(
                            "competitiveExamExperience",
                            e.target.value,
                          )
                        }
                        placeholder="NEET / JEE / Olympiad / K-CET / Other"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-[#F5A900] focus:ring-4 focus:ring-[#F5A900]/10"
                      />
                    </div>

                    <div>
                      <FieldLabel>
                        Leadership Experience
                      </FieldLabel>

                      <input
                        value={form.leadershipExperience}
                        onChange={(e) =>
                          updateField(
                            "leadershipExperience",
                            e.target.value,
                          )
                        }
                        placeholder="Coordinator / HOD / Principal / Academic Leader / Other"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-[#F5A900] focus:ring-4 focus:ring-[#F5A900]/10"
                      />
                    </div>

                    <div>
                      <FieldLabel>
                        Languages Known
                      </FieldLabel>

                      <input
                        value={form.languages}
                        onChange={(e) =>
                          updateField(
                            "languages",
                            e.target.value,
                          )
                        }
                        placeholder="e.g. English, Hindi, Kannada"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-[#F5A900] focus:ring-4 focus:ring-[#F5A900]/10"
                      />
                    </div>

                    <div>
                      <FieldLabel required>
                        Professional Summary
                      </FieldLabel>

                      <textarea
                        value={form.professionalSummary}
                        onChange={(e) =>
                          updateField(
                            "professionalSummary",
                            e.target.value,
                          )
                        }
                        placeholder="Write a short professional introduction..."
                        rows={7}
                        required
                        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-[#F5A900] focus:ring-4 focus:ring-[#F5A900]/10"
                      />

                      <p className="mt-2 text-xs text-gray-400">
                        Aim for 3–6 sentences highlighting your
                        experience, strengths and teaching approach.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 5 */}
              {step === 4 && (
                <section>
                  <SectionHeading
                    eyebrow="05 — Documents"
                    title="Complete your profile."
                    description="Upload the documents institutions will need when you apply."
                  />

                  <div className="space-y-6">
                    <FileUpload
                      title="Upload CV / Resume"
                      description="PDF, DOC or DOCX • Maximum 10 MB"
                      required
                      file={form.cv}
                      accept=".pdf,.doc,.docx"
                      onChange={(event) =>
                        handleFileChange("cv", event)
                      }
                    />

                    <FileUpload
                      title="Upload Profile Photo"
                      description="JPG, PNG or WEBP • Maximum 5 MB"
                      file={form.photo}
                      accept="image/*"
                      onChange={(event) =>
                        handleFileChange("photo", event)
                      }
                    />

                    <div className="space-y-4 border-t border-gray-200 pt-6">
                      <label className="flex cursor-pointer gap-3">
                        <input
                          type="checkbox"
                          checked={form.agreeTerms}
                          onChange={(e) =>
                            updateField(
                              "agreeTerms",
                              e.target.checked,
                            )
                          }
                          className="mt-1 h-4 w-4 rounded border-gray-300"
                        />

                        <span className="text-sm leading-6 text-gray-600">
                          I agree to the{" "}
                          <span className="font-bold text-[#0756C8]">
                            Terms of Service
                          </span>{" "}
                          and{" "}
                          <span className="font-bold text-[#0756C8]">
                            Privacy Policy
                          </span>
                          .
                        </span>
                      </label>

                      <label className="flex cursor-pointer gap-3">
                        <input
                          type="checkbox"
                          checked={
                            form.allowRecruitmentSharing
                          }
                          onChange={(e) =>
                            updateField(
                              "allowRecruitmentSharing",
                              e.target.checked,
                            )
                          }
                          className="mt-1 h-4 w-4 rounded border-gray-300"
                        />

                        <span className="text-sm leading-6 text-gray-600">
                          I allow ShikshaElite to share my
                          professional profile with relevant
                          educational institutions for recruitment
                          opportunities.
                        </span>
                      </label>
                    </div>
                  </div>
                </section>
              )}

              {/* Error */}
              {error && (
                <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* Bottom actions */}
              <div className="mt-10 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={submitting}
                    className="rounded-xl border-2 border-[#071B4D] px-6 py-3.5 text-sm font-bold text-[#071B4D] transition hover:bg-[#071B4D] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {step < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={submitting}
                    className="rounded-xl bg-[#0756C8] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#06469F] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-[#F5A900] px-8 py-3.5 text-sm font-bold text-[#071B4D] transition hover:bg-[#E39B00] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting
                      ? "Creating Account..."
                      : "Create Educator Account →"}
                  </button>
                )}
              </div>

              <p className="mt-6 text-center text-xs text-gray-400">
                Already registered?{" "}
                <Link
                  href="/educator/login"
                  className="font-bold text-[#0756C8]"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}