export type AuthUser = {
  idUser: number;
  idRole?: number;
  roleName?: string;
  email: string;
  userName?: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

type SessionListener = (session: AuthSession | null) => void;

let currentSession: AuthSession | null = null;
const listeners = new Set<SessionListener>();

export function getAuthSession() {
  return currentSession;
}

export function setAuthSession(session: AuthSession | null) {
  currentSession = session;
  listeners.forEach((listener) => listener(currentSession));
}

export function subscribeToAuthSession(listener: SessionListener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}
