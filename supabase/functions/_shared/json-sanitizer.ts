/**
 * Comprehensive JSON Sanitization for AI Responses
 * Handles contractions, Unicode escapes, and malformed JSON from LLMs
 */

export function sanitizeAIJson(raw: string): string {
  let cleaned = raw;
  
  // 1. Fix all English contractions in JSON strings (most common cause of parse failures)
  const contractions: [string, string][] = [
    ["we\\'re", "we are"],
    ["we're", "we are"],
    ["it\\'s", "it is"],
    ["it's", "it is"],
    ["that\\'s", "that is"],
    ["that's", "that is"],
    ["you\\'re", "you are"],
    ["you're", "you are"],
    ["won\\'t", "will not"],
    ["won't", "will not"],
    ["can\\'t", "cannot"],
    ["can't", "cannot"],
    ["don\\'t", "do not"],
    ["don't", "do not"],
    ["doesn\\'t", "does not"],
    ["doesn't", "does not"],
    ["hasn\\'t", "has not"],
    ["hasn't", "has not"],
    ["haven\\'t", "have not"],
    ["haven't", "have not"],
    ["isn\\'t", "is not"],
    ["isn't", "is not"],
    ["aren\\'t", "are not"],
    ["aren't", "are not"],
    ["wasn\\'t", "was not"],
    ["wasn't", "was not"],
    ["weren\\'t", "were not"],
    ["weren't", "were not"],
    ["I\\'ll", "I will"],
    ["I'll", "I will"],
    ["we\\'ll", "we will"],
    ["we'll", "we will"],
    ["you\\'ll", "you will"],
    ["you'll", "you will"],
    ["they\\'ll", "they will"],
    ["they'll", "they will"],
    ["I\\'m", "I am"],
    ["I'm", "I am"],
    ["client\\'s", "clients"],
    ["property\\'s", "property"],
    ["house\\'s", "house"],
    ["home\\'s", "home"],
    ["system\\'s", "system"],
    ["let\\'s", "let us"],
    ["let's", "let us"],
    ["there\\'s", "there is"],
    ["there's", "there is"],
    ["here\\'s", "here is"],
    ["here's", "here is"],
    ["what\\'s", "what is"],
    ["what's", "what is"],
    ["where\\'s", "where is"],
    ["where's", "where is"]
  ];
  
  contractions.forEach(([pattern, replacement]) => {
    const regex = new RegExp(pattern, 'gi');
    cleaned = cleaned.replace(regex, replacement);
  });
  
  // 2. Fix Unicode escape sequences
  cleaned = cleaned.replace(/\\u0026/g, '&');
  cleaned = cleaned.replace(/\\u0027/g, "'");
  cleaned = cleaned.replace(/\\u0022/g, '"');
  cleaned = cleaned.replace(/\\u003c/g, '<');
  cleaned = cleaned.replace(/\\u003e/g, '>');
  
  // 3. Remove any trailing commas before closing braces/brackets
  cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');
  
  // 4. Fix common AI mistakes with newlines in strings (but preserve intentional line breaks)
  cleaned = cleaned.replace(/(?<!\\)\n/g, ' ');  // Replace unescaped newlines with spaces
  cleaned = cleaned.replace(/\r/g, '');
  
  // 5. Remove any remaining single quotes that aren't part of contractions (should already be handled)
  // This is a last resort cleanup
  cleaned = cleaned.replace(/([^\\])'/g, '$1');
  
  return cleaned;
}

/**
 * Safe JSON parse with automatic sanitization and repair
 */
export function safeJsonParse<T = any>(raw: string, context: string = 'unknown'): T {
  try {
    // First attempt: direct parse
    return JSON.parse(raw);
  } catch (firstError) {
    try {
      // Second attempt: sanitize then parse
      const sanitized = sanitizeAIJson(raw);
      return JSON.parse(sanitized);
    } catch (secondError) {
      // Third attempt: use parseJsonWithRepair (from v3-core)
      console.warn(`⚠️ JSON parse failed for ${context}, attempting repair`, {
        error: (secondError as Error).message,
        sample: raw.substring(0, 200)
      });
      
      // Try one more time with aggressive cleaning
      const aggressive = sanitizeAIJson(raw)
        .replace(/'/g, '') // Remove all single quotes
        .replace(/\\"/g, '"') // Fix escaped quotes
        .trim();
      
      return JSON.parse(aggressive);
    }
  }
}
