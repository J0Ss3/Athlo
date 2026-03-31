import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  getAuthSession,
  setAuthSession,
  subscribeToAuthSession,
  type AuthSession,
} from "@/lib/auth-session";
import { AuthService } from "@/services/auth.service";

type AuthContextValue = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthSession>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(getAuthSession());

  useEffect(() => subscribeToAuthSession(setSession), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session?.token),
      async login(email: string, password: string) {
        const nextSession = await AuthService.login(email, password);
        setAuthSession(nextSession);
        return nextSession;
      },
      logout() {
        setAuthSession(null);
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
