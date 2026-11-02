export type OrganizationType = "An Institution" | "An Educator";

export type SubmissionStatus = "RECEIVED" | "FAILED";
export type DeliveryStatus = "SENT" | "FAILED" | "PENDING" | "SKIPPED";
export type ExcelSyncStatus = "SYNCED" | "FAILED" | "PENDING" | "NOT_CONFIGURED";
export type GoogleSheetsSyncStatus = "SYNCED" | "FAILED" | "PENDING" | "NOT_CONFIGURED";

export interface ContactFormInput {
  type: string; // "institution" | "educator" | "An Institution" | "An Educator"
  name: string;
  phone: string;
  email: string;
  message: string;
  honeypot?: string; // Hidden spam-trap field
  submissionTimeToken?: number; // Optional timestamp to detect instant bot submissions
}

export interface SanitizedContactData {
  organizationType: OrganizationType;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  requirementMessage: string;
}

export interface ContactSubmissionRecord {
  submissionId: string; // UUID v4
  submissionDate: string; // DD/MM/YYYY in IST
  submissionTime: string; // hh:mm:ss A IST
  submissionTimestampIso: string; // ISO 8601 string
  organizationType: OrganizationType;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  requirementMessage: string;
  submissionStatus: SubmissionStatus;
  adminEmailStatus: DeliveryStatus;
  customerEmailStatus: DeliveryStatus;
  excelSyncStatus: ExcelSyncStatus;
  googleSheetsSyncStatus?: GoogleSheetsSyncStatus;
  googleSheetsRowIndex?: number;
  sourceWebsite?: string;
  ipAddress?: string;
  userAgent?: string;
  adminEmailId?: string;
  customerEmailId?: string;
  excelRowId?: string;
  errors?: {
    adminEmail?: string;
    customerEmail?: string;
    excelSync?: string;
    googleSheets?: string;
    storage?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GoogleAppsScriptPayload {
  submission_id: string;
  submission_date?: string;
  submission_time?: string;
  organization_type: string;
  full_name: string;
  phone_number: string;
  email_address: string;
  requirement_message: string;
  admin_email_status: string;
  customer_email_status: string;
  submission_status: string;
  source_website: string;
  secret: string;
}

export interface SubmissionResponse {
  success: boolean;
  submissionId?: string;
  message: string;
  errors?: string[];
  statuses?: {
    submission: SubmissionStatus;
    adminEmail: DeliveryStatus;
    customerEmail: DeliveryStatus;
    excelSync?: ExcelSyncStatus;
    googleSheets?: GoogleSheetsSyncStatus;
  };
}
