import DOMPurify from 'dompurify';

/**
 * Input Sanitization Utilities
 * Protects against XSS, script injection, and malformed input
 */

/**
 * Sanitises plain text input by stripping ALL HTML/scripts
 * Use for: Real-time onChange handlers - allows natural typing with spaces
 */
export const sanitizeTextInput = (input: string | null | undefined): string => {
  if (!input) return '';
  
  // Strip all HTML tags and scripts but allow natural spacing during typing
  const cleaned = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [], // No HTML allowed
    ALLOWED_ATTR: []
  });
  
  // NO TRIM - allow users to type spaces freely
  return cleaned;
};

/**
 * Sanitises plain text input and normalises whitespace for final output
 * Use for: PDF generation, database saves, API calls
 */
export const sanitizeTextInputForDisplay = (input: string | null | undefined): string => {
  if (!input) return '';
  
  // Strip all HTML tags and scripts
  const cleaned = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [], // No HTML allowed
    ALLOWED_ATTR: []
  });
  
  // Trim and normalise whitespace for final output
  return cleaned.trim().replace(/\s+/g, ' ');
};

/**
 * Sanitises HTML content by allowing only safe HTML tags
 * Use for: Rich text content (if needed)
 */
export const sanitizeHtmlSafe = (input: string | null | undefined): string => {
  if (!input) return '';
  
  // Allow only safe HTML tags
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: []
  });
  
  return cleaned.trim();
};

/**
 * Sanitises email addresses
 * Use for: Email input fields
 */
export const sanitizeEmail = (email: string | null | undefined): string => {
  if (!email) return '';
  
  // Remove all HTML, convert to lowercase, trim
  const cleaned = DOMPurify.sanitize(email, { 
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: [] 
  });
  
  return cleaned.toLowerCase().trim();
};

/**
 * Sanitises phone numbers - allows only numbers, spaces, +, -, (, )
 * Use for: Phone number fields
 */
export const sanitizePhone = (phone: string | null | undefined): string => {
  if (!phone) return '';
  
  // First strip any HTML
  const cleaned = DOMPurify.sanitize(phone, { 
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: [] 
  });
  
  // Allow only phone-safe characters: digits, spaces, +, -, (, )
  return cleaned.replace(/[^\d\s+\-()]/g, '').trim();
};

/**
 * Sanitises numeric input - strips everything except digits and decimal point
 * Use for: Numeric fields (resistance, voltage, current)
 */
export const sanitizeNumeric = (input: string | null | undefined): string => {
  if (!input) return '';
  
  // Strip HTML first
  const cleaned = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: [] 
  });
  
  // Allow only digits, decimal point, and minus sign
  return cleaned.replace(/[^\d.\-]/g, '').trim();
};

/**
 * Sanitises a filename - removes path traversal and special characters
 * Use for: File uploads
 */
export const sanitizeFilename = (filename: string | null | undefined): string => {
  if (!filename) return 'untitled';
  
  // Strip HTML
  const cleaned = DOMPurify.sanitize(filename, { 
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: [] 
  });
  
  // Remove path traversal attempts
  let safe = cleaned.replace(/\.\./g, '');
  
  // Allow only alphanumeric, underscore, hyphen, dot
  safe = safe.replace(/[^a-zA-Z0-9_\-\.]/g, '_');
  
  // Ensure it doesn't start with a dot (hidden file)
  if (safe.startsWith('.')) {
    safe = 'file_' + safe;
  }
  
  return safe.trim().substring(0, 255); // Max filename length
};

/**
 * Sanitises an entire object recursively for final output
 * Use for: Form data before PDF generation or API calls
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      sanitized[key as keyof T] = value;
    } else if (Array.isArray(value)) {
      sanitized[key as keyof T] = value.map(item => 
        typeof item === 'object' ? sanitizeObject(item) : sanitizeTextInputForDisplay(String(item))
      ) as any;
    } else if (typeof value === 'object') {
      sanitized[key as keyof T] = sanitizeObject(value);
    } else if (typeof value === 'string') {
      // Apply appropriate sanitization based on field name (use Display version for final output)
      if (key.toLowerCase().includes('email')) {
        sanitized[key as keyof T] = sanitizeEmail(value) as any;
      } else if (key.toLowerCase().includes('phone')) {
        sanitized[key as keyof T] = sanitizePhone(value) as any;
      } else if (key.toLowerCase().includes('filename')) {
        sanitized[key as keyof T] = sanitizeFilename(value) as any;
      } else {
        sanitized[key as keyof T] = sanitizeTextInputForDisplay(value) as any;
      }
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
};

/**
 * Validates and sanitises a URL
 * Use for: External links, image URLs
 */
export const sanitizeUrl = (url: string | null | undefined): string => {
  if (!url) return '';
  
  const cleaned = DOMPurify.sanitize(url, { 
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: [] 
  }).trim();
  
  // Only allow http/https protocols
  if (!cleaned.match(/^https?:\/\//i)) {
    return '';
  }
  
  try {
    const urlObj = new URL(cleaned);
    return urlObj.href;
  } catch {
    return '';
  }
};
