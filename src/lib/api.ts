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
  first_recharge_available?: boolean;
  recharge_bonus_credits?: number;
};

export type DebitCreditsResponse = {
  credits: number;
  debited: number;
  message: string;
};

export type RechargePack = {
  id: string;
  name: string;
  credits: number;
  price_brl_cents: number;
  description: string;
  first_recharge_only: boolean;
};

export type RechargeResponse = {
  recharge_id: string;
  credits: number;
  credits_granted: number;
  is_first_bonus: boolean;
  status: string;
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

export function forgotPassword(email: string) {
  return apiRequest<MessageResponse>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token: string, newPassword: string) {
  return apiRequest<MessageResponse>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, new_password: newPassword }),
  });
}

export function changePassword(
  accessToken: string,
  currentPassword: string,
  newPassword: string
) {
  return apiRequest<MessageResponse>(
    "/auth/change-password",
    {
      method: "POST",
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    },
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

export type GenerationItem = {
  id: string;
  style: string;
  image_url: string;
  watermarked: boolean;
  created_at: string;
  identity_id?: string | null;
  batch_id?: string | null;
  variant?: string | null;
  product_line?: string | null;
  provider?: string | null;
  model_id?: string | null;
  status?: string | null;
  cost_usd_cents?: number | null;
  latency_ms?: number | null;
};

export type TeaserGenerateResponse = {
  generation: GenerationItem;
  credits_remaining: number;
};

export type IdentityPassport = {
  id: string;
  name: string;
  product_line: string;
  tier: string;
  seed: string;
  attributes: Record<string, unknown>;
  consent_synthetic_only: boolean;
  consent_no_real_person: boolean;
  apparent_age: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ConsistencyBatteryResponse = {
  batch_id: string;
  identity_id: string;
  product_line: string;
  variant_count: number;
  success_count: number;
  fail_count: number;
  failure_rate: number;
  total_cost_usd_cents: number;
  total_latency_ms: number;
  credits_remaining: number;
  generations: GenerationItem[];
};

export function generateTeaser(
  accessToken: string,
  options: {
    style?: string;
    identity_id?: string;
    variant?: string;
    product_line?: string;
  } = {}
) {
  const body: Record<string, unknown> = {
    style: options.style ?? "solo_lifestyle",
    variant: options.variant ?? "front_neutral",
    reference_is_real_photo: false,
    has_real_person_consent: false,
  };
  if (options.identity_id) {
    body.identity_id = options.identity_id;
  }
  // Sem passport: Future-first. Com passport: respeitar product_line informado ou omitir
  // para o backend herdar do Identity Passport.
  if (options.product_line) {
    body.product_line = options.product_line;
  } else if (!options.identity_id) {
    body.product_line = "future";
  }
  return apiRequest<TeaserGenerateResponse>(
    "/generate/teaser",
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    accessToken
  );
}

export function fetchGenerations(accessToken: string) {
  return apiRequest<GenerationItem[]>("/generations", { method: "GET" }, accessToken);
}

export function listIdentities(accessToken: string) {
  return apiRequest<IdentityPassport[]>("/identities", { method: "GET" }, accessToken);
}

export function getIdentity(accessToken: string, identityId: string) {
  return apiRequest<IdentityPassport>(
    `/identities/${identityId}`,
    { method: "GET" },
    accessToken
  );
}

export function createIdentity(
  accessToken: string,
  payload: {
    name: string;
    product_line?: string;
    tier?: string;
    attributes?: Record<string, unknown>;
    apparent_age?: number;
    consent_synthetic_only?: boolean;
    consent_no_real_person?: boolean;
  }
) {
  return apiRequest<IdentityPassport>(
    "/identities",
    {
      method: "POST",
      body: JSON.stringify({
        name: payload.name,
        product_line: payload.product_line ?? "future",
        tier: payload.tier ?? "preferencial",
        attributes: payload.attributes ?? {},
        apparent_age: payload.apparent_age ?? 25,
        consent_synthetic_only: payload.consent_synthetic_only ?? true,
        consent_no_real_person: payload.consent_no_real_person ?? true,
      }),
    },
    accessToken
  );
}

export function updateIdentity(
  accessToken: string,
  identityId: string,
  payload: {
    name?: string;
    tier?: string;
    attributes?: Record<string, unknown>;
    apparent_age?: number;
  }
) {
  return apiRequest<IdentityPassport>(
    `/identities/${identityId}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
    accessToken
  );
}

export async function deleteIdentity(accessToken: string, identityId: string) {
  const response = await fetch(`${API_BASE}/identities/${identityId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok && response.status !== 204) {
    throw new Error(await parseError(response));
  }
}

export function runConsistencyBattery(
  accessToken: string,
  identityId: string,
  maxVariants = 12
) {
  return apiRequest<ConsistencyBatteryResponse>(
    `/identities/${identityId}/consistency-battery`,
    {
      method: "POST",
      body: JSON.stringify({ max_variants: maxVariants }),
    },
    accessToken
  );
}

export async function fetchGenerationImageBlob(
  accessToken: string,
  generationId: string
): Promise<Blob> {
  const response = await fetch(`${API_BASE}/generations/${generationId}/image`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
  return response.blob();
}
