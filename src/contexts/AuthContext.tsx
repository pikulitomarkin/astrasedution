'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  type ApiUser,
  type AuthPayload,
  fetchMe,
  loginUser,
  refreshTokens,
  registerUser,
  resendVerificationEmail,
} from '@/lib/api';

const ACCESS_COOKIE = 'astra_access_token';
const REFRESH_COOKIE = 'astra_refresh_token';
const USER_KEY = 'astra_user';

type AuthContextValue = {
  user: ApiUser | null;
  accessToken: string | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  resendVerification: () => Promise<string>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

function persistAuth(payload: AuthPayload) {
  setCookie(ACCESS_COOKIE, payload.tokens.access_token, 60 * 60 * 24);
  setCookie(REFRESH_COOKIE, payload.tokens.refresh_token, 60 * 60 * 24 * 30);
  localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
}

function clearAuthStorage() {
  clearCookie(ACCESS_COOKIE);
  clearCookie(REFRESH_COOKIE);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('astra_access_token');
  localStorage.removeItem('astra_refresh_token');
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.split('=').slice(1).join('='));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  const applyAuth = useCallback((payload: AuthPayload) => {
    persistAuth(payload);
    setUser(payload.user);
    setAccessToken(payload.tokens.access_token);
    setStatus('authenticated');
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    setUser(null);
    setAccessToken(null);
    setStatus('unauthenticated');
  }, []);

  const bootstrap = useCallback(async () => {
    const access = readCookie(ACCESS_COOKIE) || localStorage.getItem('astra_access_token');
    const refresh = readCookie(REFRESH_COOKIE) || localStorage.getItem('astra_refresh_token');

    if (!access && !refresh) {
      setStatus('unauthenticated');
      return;
    }

    try {
      if (access) {
        const me = await fetchMe(access);
        setUser(me);
        setAccessToken(access);
        setStatus('authenticated');
        localStorage.setItem(USER_KEY, JSON.stringify(me));
        return;
      }
    } catch {
      // try refresh
    }

    if (refresh) {
      try {
        const tokens = await refreshTokens(refresh);
        const me = await fetchMe(tokens.access_token);
        applyAuth({ user: me, tokens });
        return;
      } catch {
        clearAuthStorage();
      }
    }

    setStatus('unauthenticated');
  }, [applyAuth]);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  const login = useCallback(
    async (email: string, password: string) => {
      const payload = await loginUser({ email, password });
      applyAuth(payload);
    },
    [applyAuth]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const payload = await registerUser({ name, email, password });
      applyAuth(payload);
    },
    [applyAuth]
  );

  const refreshProfile = useCallback(async () => {
    if (!accessToken) return;
    const me = await fetchMe(accessToken);
    setUser(me);
    localStorage.setItem(USER_KEY, JSON.stringify(me));
  }, [accessToken]);

  const resendVerification = useCallback(async () => {
    if (!accessToken) {
      throw new Error('Faça login para reenviar a verificação');
    }
    const result = await resendVerificationEmail(accessToken);
    return result.message;
  }, [accessToken]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      status,
      login,
      register,
      logout,
      refreshProfile,
      resendVerification,
    }),
    [user, accessToken, status, login, register, logout, refreshProfile, resendVerification]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return ctx;
}
