/**
 * Single source of truth for who may access the Employer Hub.
 *
 * Used by both the route guard (EmployerGuard) and the sidebar nav item
 * (SidebarNavItems) so the two can never drift apart. Access is granted to
 * employer-tier users, admins, or any email on the pre-launch allowlist.
 */

/** Pre-launch allowlist — partner/test accounts that get Employer Hub access
    regardless of subscription tier. Kept here so guard + nav stay in sync. */
export const EMPLOYER_ALLOWED_EMAILS = [
  'founder@elec-mate.com',
  'andrewgangoo91@gmail.com',
  'info@precisionei.co.uk',
];

/** Minimal shape of the fields we read from the auth profile. */
type EmployerAccessProfile =
  | {
      role?: string | null;
      subscription_tier?: string | null;
      admin_role?: string | null;
    }
  | null
  | undefined;

/**
 * Returns true if the given user may access the Employer Hub.
 * Passes on: employer tier, employer role, any admin, or allowlisted email.
 */
export function isEmployerUser(profile: EmployerAccessProfile, email?: string | null): boolean {
  if (
    profile?.subscription_tier === 'employer' ||
    profile?.role === 'employer' ||
    !!profile?.admin_role
  ) {
    return true;
  }
  return !!email && EMPLOYER_ALLOWED_EMAILS.includes(email.toLowerCase());
}
