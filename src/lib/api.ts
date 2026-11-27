/**
 * API client. All lead / CRM traffic goes through these functions so the
 * backend can change (own API, CRM, serverless) without touching UI code.
 */
export interface LeadSubmissionResult {
  id: string;
  receivedAt: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fieldErrors?: Record<string, string>,
  ) {
    super(message);
  }
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '';

export async function submitLead(form: FormData): Promise<LeadSubmissionResult> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/leads`, { method: 'POST', body: form, headers: { Accept: 'application/json' } });
  } catch {
    throw new ApiError('We could not reach our server. Please check your connection and try again.', 0);
  }
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok) {
    const d = (data ?? {}) as { error?: string; fieldErrors?: Record<string, string> };
    throw new ApiError(d.error ?? 'Your request could not be submitted. Please try again shortly.', res.status, d.fieldErrors);
  }
  return data as LeadSubmissionResult;
}
