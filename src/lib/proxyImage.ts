const PROXY_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/proxy-image`;

/** Wrap an external image URL through our proxy to bypass CORS/hotlink protection */
export function proxyImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return `${PROXY_BASE}?url=${encodeURIComponent(url)}`;
}
