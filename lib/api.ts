import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚙️ Prioridad: Usa la variable de entorno, si no existe, usa tu IP local manual
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ??;

export const API_URL = API_BASE_URL;

type RequestConfig = {
  requiresAuth?: boolean;
};

// --- GESTIÓN DE TOKEN CON ASYNC STORAGE ---

export async function saveToken(token: string) {
  await AsyncStorage.setItem('authToken', token);
}

export async function getToken(): Promise<string | null> {
  return await AsyncStorage.getItem('authToken');
}

export async function clearToken() {
  await AsyncStorage.removeItem('authToken');
}

// --- UTILIDADES INTERNAS ---

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
    (payload as any).meta?.message
  ) {
    return (payload as any).meta.message;
  }
  if (payload && typeof payload === "object" && "message" in payload) {
    return (payload as any).message;
  }
  return fallback || "Request failed";
}

// --- NÚCLEO DE LA PETICIÓN (Lógica unificada) ---

async function performRequest(
  endpoint: string,
  options: RequestInit = {},
  config: RequestConfig = {},
) {
  const token = await getToken();
  const headers = new Headers(options.headers ?? {});

  // Configurar JSON por defecto
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Agregar Token automáticamente si existe y la ruta lo requiere
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

// --- FUNCIONES EXPORTADAS PARA USO EN LA APP ---

/**
 * Realiza una petición y devuelve directamente los datos (T)
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  config: RequestConfig = {},
): Promise<T> {
  const result = await performRequest(endpoint, options, config);
  return result.data as T;
}

/**
 * Realiza una petición y devuelve datos + headers + status
 */
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

/**
 * Alias para apiFetch (mantiene compatibilidad)
 */
export async function authenticatedFetch<T>(
  endpoint: string,
  options: RequestInit = {},
) {
  return apiFetch<T>(endpoint, options);
}
