export function resolveUrl(pathlike) {
  if (!pathlike) return '';
  if (/^https?:\/\//i.test(pathlike)) return pathlike;
  const apiBase = (import.meta.env.VITE_API_BASE || 'http://localhost:4000/api').replace(/\/api\/?$/, '/');
  const clean = pathlike.replace(/^\//, '');
  return new URL(clean, apiBase).toString();
}