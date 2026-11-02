import { ContactFormInput, OrganizationType, SanitizedContactData } from "./types";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData?: SanitizedContactData;
}

// RFC 5322 compliant regex simplified for practical production email validation
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// E.164 and standard national phone format: allow +, spaces, parentheses, dashes, 7-15 digits
const PHONE_CHARS_REGEX = /^[\d\s+\-().]{7,20}$/;

export function validateAndSanitizeContactInput(
  input: Partial<ContactFormInput>
): ValidationResult {
  const errors: string[] = [];

  // Check Honeypot spam field
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return {
      isValid: false,
      errors: ["Spam detected."],
    };
  }

  // 1. Organization Type Validation
  const rawType = (input.type || "").trim().toLowerCase();
  let organizationType: OrganizationType;

  if (rawType === "institution" || rawType === "an institution") {
    organizationType = "An Institution";
  } else if (rawType === "educator" || rawType === "an educator") {
    organizationType = "An Educator";
  } else {
    errors.push("Please select whether you represent An Institution or An Educator.");
    organizationType = "An Institution";
  }

  // 2. Full Name Validation
  const rawName = (input.name || "").trim().replace(/\s+/g, " ");
  if (!rawName) {
    errors.push("Full Name is required.");
  } else if (rawName.length < 2) {
    errors.push("Full Name must be at least 2 characters.");
  } else if (rawName.length > 100) {
    errors.push("Full Name cannot exceed 100 characters.");
  } else if (!/^[\p{L}\s.'-]+$/u.test(rawName)) {
    errors.push("Full Name contains invalid characters.");
  }

  // 3. Email Validation
  const rawEmail = (input.email || "").trim().toLowerCase();
  if (!rawEmail) {
    errors.push("Email address is required.");
  } else if (rawEmail.length > 254) {
    errors.push("Email address is too long.");
  } else if (!EMAIL_REGEX.test(rawEmail)) {
    errors.push("Please provide a valid email address.");
  }

  // 4. Phone Validation
  const rawPhone = (input.phone || "").trim().replace(/\s+/g, " ");
  const digitsOnly = rawPhone.replace(/\D/g, "");

  if (!rawPhone) {
    errors.push("Phone number is required.");
  } else if (!PHONE_CHARS_REGEX.test(rawPhone) || digitsOnly.length < 7 || digitsOnly.length > 15) {
    errors.push("Please provide a valid phone number (7 to 15 digits).");
  }

  // 5. Message Validation
  const rawMessage = (input.message || "").trim();
  if (!rawMessage) {
    errors.push("Requirement message is required.");
  } else if (rawMessage.length < 5) {
    errors.push("Requirement message should be at least 5 characters.");
  } else if (rawMessage.length > 3000) {
    errors.push("Requirement message cannot exceed 3000 characters.");
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    errors: [],
    sanitizedData: {
      organizationType,
      fullName: rawName,
      phoneNumber: rawPhone,
      emailAddress: rawEmail,
      requirementMessage: rawMessage,
    },
  };
}
