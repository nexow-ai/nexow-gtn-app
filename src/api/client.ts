const baseURL = import.meta.env.VITE_GTN_AUTH_URL ?? 'http://localhost:8080'

export function getAuthBaseURL(): string {
  return baseURL.replace(/\/$/, '')
}

export async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${getAuthBaseURL()}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = (data as { error?: string })?.error ?? res.statusText
    throw new Error(msg)
  }
  return data as T
}
