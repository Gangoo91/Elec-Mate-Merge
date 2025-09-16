/**
 * Validates if a string is a valid URL
 * @param url The string to validate
 * @returns True if the string is a valid URL
 */
export const isValidUrl = (url?: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  // Filter out placeholder text
  const placeholders = ['link in bio', 'see bio', 'link below', 'coming soon', 'tbc', 'tba'];
  if (placeholders.some(placeholder => url.toLowerCase().includes(placeholder))) {
    return false;
  }
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};