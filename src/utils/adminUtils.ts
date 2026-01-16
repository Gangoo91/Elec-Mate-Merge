/**
 * Shared utilities for admin panel components
 */

/**
 * Get initials from a name (first + last initial)
 * @example getInitials("John Doe") => "JD"
 * @example getInitials("John") => "J"
 * @example getInitials(null) => "?"
 */
export const getInitials = (name: string | null): string => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Role color configuration for consistent styling across admin components
 */
export const ROLE_COLORS: Record<string, { bg: string; text: string; badge: string }> = {
  apprentice: {
    bg: "bg-purple-500/20",
    text: "text-purple-400",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  electrician: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
    badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  employer: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  college: {
    bg: "bg-green-500/20",
    text: "text-green-400",
    badge: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  visitor: {
    bg: "bg-gray-500/20",
    text: "text-gray-400",
    badge: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  },
};

/**
 * Get role color configuration with fallback to visitor colors
 */
export const getRoleColor = (role: string | null | undefined) =>
  ROLE_COLORS[role?.toLowerCase() || ""] || ROLE_COLORS.visitor;

/**
 * Default role color for unknown/missing roles
 */
export const DEFAULT_ROLE_COLOR = ROLE_COLORS.visitor;
