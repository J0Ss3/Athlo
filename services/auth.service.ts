import { apiFetchWithHeaders } from "@/lib/api";
import { type AuthSession } from "@/lib/auth-session";

type LoginResponse = {
  data: {
    idUser: number;
    idRole?: number;
    roleName?: string;
    email: string;
    userName?: string;
  };
  meta: {
    message: string;
    status: number;
  };
  hasError: boolean;
};

export const AuthService = {
  async login(email: string, password: string) {
    const response = await apiFetchWithHeaders<LoginResponse>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
      {
        requiresAuth: false,
      },
    );

    const authorization = response.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      throw new Error("No se recibió un token de autenticación");
    }

    return {
      token: authorization.replace("Bearer ", "").trim(),
      user: response.data.data,
    } satisfies AuthSession;
  },

  async logout() {
    return Promise.resolve();
  },
};
