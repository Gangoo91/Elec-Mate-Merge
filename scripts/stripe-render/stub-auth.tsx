/** Enough of AuthContext for the harness: a signed-in user, nothing else. */
export const useAuth = () => ({ user: { id: 'harness-user' } });
export default { useAuth };
