// Lightweight local storage with AES-GCM encryption for satisfaction survey data.
// This is a frontend-only placeholder until a backend endpoint is available.

export type SurveyStatus = "pending" | "submitted" | "skipped"

export interface SurveyPayload {
  rating: number
  comment?: string
  status: SurveyStatus
  createdAt: string
}

const STORAGE_KEY = "courier-sync-survey"
const SECRET = (process.env.NEXT_PUBLIC_SURVEY_SECRET || "courier-survey-default-secret").padEnd(32, "0").slice(0, 32)

const encoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ""
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  return typeof btoa !== "undefined" ? btoa(binary) : ""
}

function fromBase64(base64: string) {
  const binary = typeof atob !== "undefined" ? atob(base64) : ""
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

async function getKey() {
  if (typeof window === "undefined" || !window.crypto?.subtle || !encoder) return null
  return window.crypto.subtle.importKey("raw", encoder.encode(SECRET), { name: "AES-GCM" }, false, ["encrypt", "decrypt"])
}

function scopedKey(key?: string) {
  return key ? `${STORAGE_KEY}:${key}` : STORAGE_KEY
}

export async function saveSurvey(payload: SurveyPayload, key?: string) {
  if (typeof window === "undefined") return
  const storageKey = scopedKey(key)

  try {
    const key = await getKey()
    if (!key || !encoder) {
      localStorage.setItem(storageKey, JSON.stringify(payload))
      return
    }

    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const cipher = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(JSON.stringify(payload)))

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        iv: toBase64(iv.buffer),
        cipher: toBase64(cipher),
      }),
    )
  } catch (error) {
    console.error("Error saving survey:", error)
  }
}

export async function readSurvey(key?: string): Promise<SurveyPayload | null> {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(scopedKey(key))
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)

    // Plain payload (fallback)
    if (parsed.status && parsed.rating) return parsed as SurveyPayload

    const key = await getKey()
    if (!key || !encoder) return null

    const iv = fromBase64(parsed.iv)
    const cipher = fromBase64(parsed.cipher)
    const decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(iv) }, key, cipher)
    const decoded = new TextDecoder().decode(decrypted)
    return JSON.parse(decoded) as SurveyPayload
  } catch (error) {
    console.error("Error reading survey:", error)
    return null
  }
}

export async function markSurveySkipped(key?: string) {
  await saveSurvey({ rating: 0, status: "skipped", createdAt: new Date().toISOString() }, key)
}

export async function clearSurvey(key?: string) {
  if (typeof window === "undefined") return
  localStorage.removeItem(scopedKey(key))
}
