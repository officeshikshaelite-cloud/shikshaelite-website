import fs from "fs";
import path from "path";
import { doc, setDoc, updateDoc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { ContactSubmissionRecord } from "./types";

// Fallback local journal path
const BACKUP_DIR = path.resolve(process.cwd(), ".data");
const BACKUP_FILE = path.join(BACKUP_DIR, "contact_submissions.json");

function ensureBackupDirectory() {
  try {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("Could not create local backup directory:", err);
  }
}

function saveToLocalJournal(record: ContactSubmissionRecord): void {
  try {
    ensureBackupDirectory();
    let records: Record<string, ContactSubmissionRecord> = {};
    if (fs.existsSync(BACKUP_FILE)) {
      try {
        const content = fs.readFileSync(BACKUP_FILE, "utf-8");
        records = JSON.parse(content);
      } catch {
        records = {};
      }
    }
    records[record.submissionId] = record;
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("Local journal write error:", err);
  }
}

function updateLocalJournal(
  submissionId: string,
  updates: Partial<ContactSubmissionRecord>
): void {
  try {
    if (!fs.existsSync(BACKUP_FILE)) return;
    const content = fs.readFileSync(BACKUP_FILE, "utf-8");
    const records = JSON.parse(content);
    if (records[submissionId]) {
      records[submissionId] = {
        ...records[submissionId],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(BACKUP_FILE, JSON.stringify(records, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Local journal update error:", err);
  }
}

export async function persistNewSubmission(
  record: ContactSubmissionRecord
): Promise<{ persisted: boolean; storageMethod: "firestore" | "local_journal" | "both" }> {
  let firestoreSuccess = false;
  let localSuccess = false;

  // 1. Always write to local durable journal as immediate guard
  try {
    saveToLocalJournal(record);
    localSuccess = true;
  } catch (localErr) {
    console.warn("Failed saving to local journal:", localErr);
  }

  // 2. Persist to Firestore if available
  try {
    const hasFirebaseKey =
      Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY) ||
      Boolean(process.env.FIREBASE_API_KEY);

    if (hasFirebaseKey) {
      // Save in "contact_enquiries" collection keyed by UUID
      const contactDocRef = doc(db, "contact_enquiries", record.submissionId);
      await setDoc(contactDocRef, {
        ...record,
        firestoreCreatedAt: serverTimestamp(),
      });

      // Also mirror to legacy "leads" collection to maintain backward compatibility with existing dashboard
      try {
        await addDoc(collection(db, "leads"), {
          submissionId: record.submissionId,
          formType: record.organizationType === "An Institution" ? "Management" : "Educators",
          name: record.fullName,
          email: record.emailAddress,
          phone: record.phoneNumber,
          location: "Website Contact Form",
          details: record.requirementMessage,
          source: "website",
          status: "New",
          createdAt: serverTimestamp(),
        });
      } catch (mirrorErr) {
        console.warn("Mirroring lead to legacy collection failed (non-fatal):", mirrorErr);
      }

      firestoreSuccess = true;
    } else {
      console.warn("Firebase API key not set, relying on local journal storage.");
    }
  } catch (firestoreErr) {
    console.error("Firestore persistence error:", firestoreErr);
    if (record.errors) {
      record.errors.storage = firestoreErr instanceof Error ? firestoreErr.message : "Firestore write error";
    }
  }

  const persisted = firestoreSuccess || localSuccess;
  const storageMethod =
    firestoreSuccess && localSuccess
      ? "both"
      : firestoreSuccess
      ? "firestore"
      : "local_journal";

  return { persisted, storageMethod };
}

export async function updateSubmissionStatus(
  submissionId: string,
  updates: Partial<ContactSubmissionRecord>
): Promise<void> {
  const updatedAt = new Date().toISOString();
  const fullUpdates = { ...updates, updatedAt };

  // Update local journal
  updateLocalJournal(submissionId, fullUpdates);

  // Update Firestore if configured
  try {
    const hasFirebaseKey =
      Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY) ||
      Boolean(process.env.FIREBASE_API_KEY);

    if (hasFirebaseKey) {
      const contactDocRef = doc(db, "contact_enquiries", submissionId);
      await updateDoc(contactDocRef, {
        ...fullUpdates,
        firestoreUpdatedAt: serverTimestamp(),
      });
    }
  } catch (err) {
    console.error(`Firestore update error for ${submissionId}:`, err);
  }
}

export async function getSubmissionById(
  submissionId: string
): Promise<ContactSubmissionRecord | null> {
  // Check local journal first
  try {
    if (fs.existsSync(BACKUP_FILE)) {
      const content = fs.readFileSync(BACKUP_FILE, "utf-8");
      const records = JSON.parse(content);
      if (records[submissionId]) {
        return records[submissionId];
      }
    }
  } catch (err) {
    console.error("Error reading from local journal:", err);
  }

  // Fallback to Firestore if configured
  try {
    const hasFirebaseKey =
      Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY) ||
      Boolean(process.env.FIREBASE_API_KEY);

    if (hasFirebaseKey) {
      const contactDocRef = doc(db, "contact_enquiries", submissionId);
      const snap = await getDoc(contactDocRef);
      if (snap.exists()) {
        return snap.data() as ContactSubmissionRecord;
      }
    }
  } catch (err) {
    console.error("Error reading from Firestore:", err);
  }

  return null;
}
