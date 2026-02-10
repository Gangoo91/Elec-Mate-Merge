/**
 * Helper for user-scoped localStorage keys.
 * Prevents quiz/progress data from leaking between users on shared devices.
 */
export function userKey(userId: string | undefined, key: string): string {
  return userId ? `user_${userId}_${key}` : key;
}
