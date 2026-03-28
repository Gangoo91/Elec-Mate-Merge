/**
 * passwordCheck.ts
 *
 * Client-side password breach check using the HaveIBeenPwned Passwords API.
 * Uses k-anonymity: only sends the first 5 chars of the SHA-1 hash to the API,
 * then checks the full hash locally. No plaintext password ever leaves the device.
 *
 * This prevents Supabase from creating a zombie user row when it rejects
 * a breached password server-side.
 */

async function sha1(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

/**
 * Check if a password has been found in known data breaches.
 * Returns true if the password is breached (should be rejected).
 * Returns false if the password is safe or if the check fails (fail-open).
 */
export async function isPasswordBreached(password: string): Promise<boolean> {
  try {
    const hash = await sha1(password);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { 'Add-Padding': 'true' },
    });

    if (!response.ok) {
      // Fail open — don't block signup if HIBP is down
      console.warn('[passwordCheck] HIBP API returned', response.status);
      return false;
    }

    const text = await response.text();
    const lines = text.split('\n');

    for (const line of lines) {
      const [hashSuffix] = line.split(':');
      if (hashSuffix.trim() === suffix) {
        return true; // Password found in breach database
      }
    }

    return false; // Password is safe
  } catch (err) {
    // Fail open — network error, HIBP unreachable, etc.
    console.warn('[passwordCheck] HIBP check failed (non-fatal):', err);
    return false;
  }
}
