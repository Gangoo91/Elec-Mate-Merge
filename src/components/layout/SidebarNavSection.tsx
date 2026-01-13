
import { cn } from "@/lib/utils";
import SidebarNavLink from "./SidebarNavLink";
import { NavItem } from "./SidebarNavItems";

interface SidebarNavSectionProps {
  title?: string;
  items: NavItem[];
  userRole: string;
  adminRole?: 'super_admin' | 'admin' | null;
  className?: string;
  onItemClick?: () => void;
}

const SidebarNavSection = ({
  title,
  items,
  userRole,
  adminRole,
  className,
  onItemClick
}: SidebarNavSectionProps) => {
  // Filter items based on user role and admin status
  const filteredItems = items.filter((item) => {
    // Check if item requires admin access
    if (item.adminOnly && !adminRole) {
      return false;
    }
    return item.roles.includes(userRole);
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
      <div className={cn("space-y-1", title ? "" : "mt-6")}>
        {filteredItems.map((item) => (
          <SidebarNavLink key={item.path} item={item} onItemClick={onItemClick} />
        ))}
      </div>
    </div>
  );
};

export default SidebarNavSection;
