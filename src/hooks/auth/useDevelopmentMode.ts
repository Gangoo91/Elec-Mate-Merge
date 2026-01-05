/**
 * Development mode hook - DISABLED for security
 *
 * Previously allowed bypassing subscription checks via localStorage.
 * This has been disabled to prevent security bypass.
 *
 * Development mode is now ONLY available when:
 * 1. Running in actual development environment (import.meta.env.DEV)
 * 2. Cannot be toggled by users in production
 */
export function useDevelopmentMode() {
  // Development mode is ONLY enabled in actual dev environment
  // Cannot be toggled via localStorage or UI in production
  const isDevelopmentMode = import.meta.env.DEV === true;

  // Toggle is a no-op in production for security
  const toggleDevelopmentMode = () => {
    if (import.meta.env.DEV) {
      console.log('[Dev Mode] Toggle requested - only affects dev environment');
    }
    // No-op: Cannot toggle in production
  };

  return {
    isDevelopmentMode,
    toggleDevelopmentMode,
  };
}
