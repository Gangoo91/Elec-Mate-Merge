/**
 * PostgreSQL JSONB Sanitization
 * Removes invalid Unicode sequences that cause silent database save failures
 * 
 * CRITICAL: PostgreSQL JSONB columns reject null bytes (\u0000) and control characters
 * AI models (GPT-5, Gemini) frequently generate these in contractions/formatting
 */

/**
 * Sanitize any object/array for safe PostgreSQL JSONB storage
 * Removes null bytes, control characters, and other invalid Unicode
 */
export function sanitizeForPostgres(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Convert to JSON string
  const jsonString = JSON.stringify(obj);
  
  // Remove invalid Unicode sequences that PostgreSQL JSONB rejects:
  // - \u0000 (null byte) - most common cause
  // - \x00-\x08, \x0B, \x0C, \x0E-\x1F (control characters)
  const sanitized = jsonString
    .replace(/\\u0000/g, '')  // Remove null bytes
    .replace(/\u0000/g, '')   // Remove literal null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ''); // Remove control chars
  
  try {
    return JSON.parse(sanitized);
  } catch (parseError) {
    console.error('⚠️ Failed to parse sanitized JSON', {
      error: parseError,
      originalLength: jsonString.length,
      sanitizedLength: sanitized.length,
      sample: sanitized.substring(0, 200)
    });
    // Return original object as fallback (better than losing data)
    return obj;
  }
}

/**
 * More aggressive sanitization for retry scenarios
 * Use if first attempt fails with Unicode errors
 */
export function aggressiveSanitize(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  const jsonString = JSON.stringify(obj);
  
  // Remove ALL non-printable characters and extended Unicode
  const sanitized = jsonString
    .replace(/\\u0000/g, '')
    .replace(/\u0000/g, '')
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '')  // All control chars
    .replace(/\\u([0-9A-Fa-f]{4})/g, (match, hex) => {
      const code = parseInt(hex, 16);
      // Remove surrogates, private use, and other problematic ranges
      if (code >= 0xD800 && code <= 0xDFFF) return ''; // Surrogates
      if (code >= 0xE000 && code <= 0xF8FF) return ''; // Private use
      if (code >= 0xFFF0 && code <= 0xFFFF) return ''; // Specials
      return match;
    });
  
  try {
    return JSON.parse(sanitized);
  } catch (parseError) {
    console.error('⚠️ Aggressive sanitization failed', {
      error: parseError,
      sample: sanitized.substring(0, 200)
    });
    return obj;
  }
}

/**
 * Check if error is Unicode-related
 */
export function isUnicodeError(error: any): boolean {
  const message = error?.message?.toLowerCase() || '';
  return message.includes('unicode') || 
         message.includes('\\u0000') || 
         message.includes('null byte') ||
         message.includes('invalid byte');
}
