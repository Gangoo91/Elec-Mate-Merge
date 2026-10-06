import { cn } from '@/lib/utils';
import SidebarNavLink from './SidebarNavLink';
import { NavItem } from './SidebarNavItems';
import { useHasCollegeLink } from '@/hooks/useHasCollegeLink';

interface SidebarNavSectionProps {
  title?: string;
  items: NavItem[];
  userRole: string;
  userEmail?: string;
  /** Optional override; when omitted the section reads useHasCollegeLink()
      itself (the hook is cached, so this costs nothing extra). */
  hasCollegeLink?: boolean;
  /** Result of isEmployerUser() — computed once by the parent so the nav and
      EmployerGuard read the same predicate. */
  hasEmployerAccess?: boolean;
  adminRole?: 'super_admin' | 'admin' | null;
  className?: string;
  onItemClick?: () => void;
}

const SidebarNavSection = ({
  title,
  items,
  userRole,
  userEmail,
  hasCollegeLink,
  hasEmployerAccess,
  adminRole,
  className,
  onItemClick,
}: SidebarNavSectionProps) => {
  // Staff vs student decides WHERE the college item points, not just whether
  // it shows: a student-only link must not send them to the staff hub guard.
  const collegeLink = useHasCollegeLink();
  const linked = hasCollegeLink ?? collegeLink.hasCollegeLink;

  // Filter items based on user role, admin status, allowed emails, and
  // whether the user has a college_staff/college_students row.
  const filteredItems = items
    .filter((item) => {
      if (item.adminOnly && !adminRole) {
        return false;
      }
      if (item.allowedEmails && item.allowedEmails.length > 0) {
        if (!userEmail || !item.allowedEmails.includes(userEmail.toLowerCase())) {
          return false;
        }
      }
      if (item.requireEmployerAccess && !hasEmployerAccess) {
        return false;
      }
      if (item.requireCollegeLink && !linked) {
        return false;
      }
      return item.roles.includes(userRole);
    })
    .map((item): NavItem => {
      if (
        item.requireCollegeLink &&
        item.collegeStudentVariant &&
        !collegeLink.isStaff &&
        collegeLink.isStudent
      ) {
        return { ...item, ...item.collegeStudentVariant };
      }
      return item;
    });

  // If there are no items to display, don't render the section
  if (filteredItems.length === 0) return null;

  return (
    <div className={className}>
      {title && (
        <div className="mt-6 mb-3 px-3">
          <h3 className="text-xs font-semibold text-elec-yellow uppercase tracking-wider">
            {title}
          </h3>
        </div>
      )}
      <div className={cn('space-y-1', title ? '' : 'mt-1')}>
        {filteredItems.map((item) => (
          <div key={item.path}>
            <SidebarNavLink item={item} onItemClick={onItemClick} />
            {item.dividerAfter && <div className="border-t border-white/5 my-2 mx-3" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarNavSection;
