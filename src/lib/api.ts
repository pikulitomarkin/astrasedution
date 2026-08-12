export type ApiUser = {
  id: string;
  email: string;
  name: string | null;
  email_verified: boolean;
  plan: string;
  credits: number;
  created_at: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type AuthPayload = {
  user: ApiUser;
  tokens: AuthTokens;
  verification_url?: string | null;
};

export type MessageResponse = {
  message: string;
};

export type WaitlistResponse = {
  message: string;
  already_registered: boolean;
};

export type CreditsInfo = {
  plan: string;
  credits: number;
  max_free_credits: number;
  email_verified: boolean;
};

export type DebitCreditsResponse = {
  credits: number;
  debited: number;
  message: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

async function parseError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data?.detail === "string") return data.detail;
    if (Array.isArray(data?.detail) && data.detail[0]?.msg) return data.detail[0].msg;
    if (typeof data?.error === "string") return data.error;
  } catch {
    // ignore
  }
  return `Erro HTTP ${response.status}`;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string | null
): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function registerUser(input: {
  name?: string;
  email: string;
  password: string;
}) {
  return apiRequest<AuthPayload>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function loginUser(input: { email: string; password: string }) {
  return apiRequest<AuthPayload>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function fetchMe(accessToken: string) {
  return apiRequest<ApiUser>("/auth/me", { method: "GET" }, accessToken);
}

export function refreshTokens(refreshToken: string) {
  return apiRequest<AuthTokens>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}

export function verifyEmailToken(token: string) {
  return apiRequest<MessageResponse>(
    `/auth/verify-email?token=${encodeURIComponent(token)}`,
    { method: "GET" }
  );
}

export function resendVerificationEmail(accessToken: string) {
  return apiRequest<MessageResponse>(
    "/auth/resend-verification",
    { method: "POST" },
    accessToken
  );
}

export function joinWaitlist(input: {
  email: string;
  name?: string;
  source?: string;
}) {
  return apiRequest<WaitlistResponse>("/waitlist", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function fetchCredits(accessToken: string) {
  return apiRequest<CreditsInfo>("/credits", { method: "GET" }, accessToken);
}

export function debitCredits(accessToken: string, amount = 1) {
  return apiRequest<DebitCreditsResponse>(
    "/credits/debit",
    { method: "POST", body: JSON.stringify({ amount }) },
    accessToken
  );
}
