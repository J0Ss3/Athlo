import { getAuthSession } from "@/lib/auth-session";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

type RequestConfig = {
  requiresAuth?: boolean;
};

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getErrorMessage(payload: unknown, fallback: string) {
  if (
    payload &&
    typeof payload === "object" &&
    "meta" in payload &&
    payload.meta &&
    typeof payload.meta === "object" &&
    "message" in payload.meta &&
    typeof payload.meta.message === "string"
  ) {
    return payload.meta.message;
  }

  return fallback || "Request failed";
}

async function performRequest(
  endpoint: string,
  options: RequestInit = {},
  config: RequestConfig = {},
) {
  if (!API_BASE_URL) {
    throw new Error("EXPO_PUBLIC_API_BASE_URL is not configured");
  }

  const headers = new Headers(options.headers ?? {});
  const token = getAuthSession()?.token;

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (config.requiresAuth !== false && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const payload = text ? safeJsonParse(text) : null;

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, text));
  }

  return {
    data: payload,
    headers: response.headers,
    status: response.status,
  };
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  config: RequestConfig = {},
) {
  const result = await performRequest(endpoint, options, config);
  return result.data as T;
}

export async function apiFetchWithHeaders<T>(
  endpoint: string,
  options: RequestInit = {},
  config: RequestConfig = {},
) {
  const result = await performRequest(endpoint, options, config);
  return {
    ...result,
    data: result.data as T,
  };
}

export async function authenticatedFetch<T>(
  endpoint: string,
  options: RequestInit = {},
) {
  return apiFetch<T>(endpoint, options);
}



// CAMBIA ESTA IP por la IP de tu PC en la red local
// Windows: CMD → ipconfig → "Dirección IPv4"
export const API_URL =  process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

// Guardar token JWT
export async function saveToken(token: string) {
  await AsyncStorage.setItem('authToken', token);
}

// Obtener token guardado
export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem('authToken');
}

// Borrar token (logout)
export async function clearToken() {
  await AsyncStorage.removeItem('authToken');
}

// Fetch con token automático
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getToken();
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
}
```
