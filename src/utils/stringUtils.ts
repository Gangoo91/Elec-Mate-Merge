
/**
 * Extracts the initials from a name string
 * @param name The name to extract initials from
 * @returns The uppercase initials
 */
export const getInitials = (name?: string): string => {
  if (!name) return "U";
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};
