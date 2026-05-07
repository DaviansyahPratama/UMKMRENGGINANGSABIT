import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type OwnerSession = {
  token: string;
  username: string;
  name: string;
};

type AuthContextValue = {
  owner: OwnerSession | null;
  isOwnerAuthenticated: boolean;
  login: (params: { username: string; password: string }) => boolean;
  logout: () => void;
};

const AUTH_KEY = "umkm_owner_auth_v1";

// NOTE: Untuk kebutuhan prototype/skripsi, kredensial diset secara lokal.
// Anda bisa ubah sesuai kebutuhan dosen/owner.
// Kredensial Admin sederhana (hanya username & password).
const DEFAULT_OWNER_CREDENTIALS = {
  username: ["admin"],
  password: "admin123",
  name: "Admin",
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readSession(): OwnerSession | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OwnerSession;
    if (!parsed?.token || !parsed?.username) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(session: OwnerSession) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [owner, setOwner] = useState<OwnerSession | null>(null);

  useEffect(() => {
    setOwner(readSession());
  }, []);

  const isOwnerAuthenticated = !!owner;

  const value: AuthContextValue = useMemo(
    () => ({
      owner,
      isOwnerAuthenticated,
      login: ({ username, password }) => {
        const normalized = username.trim().toLowerCase();
        const okUsername = DEFAULT_OWNER_CREDENTIALS.username.some(
          (u) => u.toLowerCase() === normalized
        );
        const okPassword = password === DEFAULT_OWNER_CREDENTIALS.password;

        if (!okUsername || !okPassword) return false;

        const session: OwnerSession = {
          token:
            typeof crypto !== "undefined" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : String(Math.random()).slice(2),
          username: username.trim(),
          name: DEFAULT_OWNER_CREDENTIALS.name,
        };

        writeSession(session);
        setOwner(session);
        return true;
      },
      logout: () => {
        localStorage.removeItem(AUTH_KEY);
        setOwner(null);
      },
    }),
    [owner, isOwnerAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam <AuthProvider>.");
  }
  return ctx;
}

