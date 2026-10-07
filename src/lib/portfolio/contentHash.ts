/**
 * SHA-256 of an evidence file's bytes (ELE-1865).
 *
 * Computed in the browser at upload and stored on the file entry
 * (portfolio_items.storage_urls[].sha256). The database folds these into the
 * item's content_hash, which declarations and witnesses sign against, so a
 * changed file is provable later. Returns null where WebCrypto is missing
 * (very old webviews) rather than blocking the save.
 */
export async function sha256OfBlob(blob: Blob): Promise<string | null> {
  try {
    if (!globalThis.crypto?.subtle) return null;
    const buf = await blob.arrayBuffer();
    const digest = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  } catch {
    return null;
  }
}

/** First 8 + last 4 hex characters, for display ("a1b2c3d4…9f0e"). */
export const shortHash = (h: string | null | undefined) =>
  h ? `${h.slice(0, 8)}…${h.slice(-4)}` : null;
