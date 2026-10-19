// Thin API client. Uses the Vite dev proxy in development and
// VITE_API_URL (when provided) in production.

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    const networkError = new Error(
      "Could not reach the server. Please make sure the API is running.",
    );
    networkError.isNetworkError = true;
    throw networkError;
  }

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const body = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(
      body?.error || `Request failed with status ${response.status}.`,
    );
    error.status = response.status;
    error.fields = body?.fields || null;
    throw error;
  }

  return body;
}

export function getProjects() {
  return request("/api/projects");
}

export function sendContactMessage(payload) {
  return request("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Formspree endpoint. Override per environment with VITE_FORMSPREE_ENDPOINT.
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mkoybewq";

/**
 * Submits the contact form to Formspree. Works without the local backend,
 * so the form keeps working on a static deployment.
 */
async function submitToFormspree(payload) {
  let response;
  try {
    response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    const networkError = new Error(
      "Could not send your message. Please check your connection and try again.",
    );
    networkError.isNetworkError = true;
    throw networkError;
  }

  if (response.ok) {
    return { message: "Thanks for reaching out! Your message has been sent." };
  }

  let body = null;
  try {
    body = await response.json();
  } catch {
    /* non-JSON response, fall through to a generic message */
  }

  const fieldErrors = {};
  if (Array.isArray(body?.errors)) {
    for (const item of body.errors) {
      if (item?.field) fieldErrors[item.field] = item.message;
    }
  }

  const error = new Error(
    body?.errors?.[0]?.message ||
      body?.error ||
      "Something went wrong while sending your message. Please try again.",
  );
  error.status = response.status;
  error.fields = Object.keys(fieldErrors).length ? fieldErrors : null;
  throw error;
}

/**
 * Sends the message to Formspree, and falls back to the local API when the
 * Formspree request is blocked (e.g. by an ad blocker or offline network).
 * If both fail, the original Formspree error is surfaced.
 */
export async function submitContactMessage(payload) {
  try {
    return await submitToFormspree(payload);
  } catch (error) {
    if (!error.isNetworkError) throw error;

    try {
      await sendContactMessage(payload);
      return { message: "Thanks for reaching out! Your message has been sent." };
    } catch {
      throw error;
    }
  }
}
