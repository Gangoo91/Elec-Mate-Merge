
import { cn } from "@/lib/utils";
import SidebarNavLink from "./SidebarNavLink";
import { NavItem } from "./SidebarNavItems";

interface SidebarNavSectionProps {
  title?: string;
  items: NavItem[];
  userRole: string;
  className?: string;
}

const SidebarNavSection = ({ 
  title, 
  items, 
  userRole,
  className 
}: SidebarNavSectionProps) => {
  // Filter items based on user role
  const filteredItems = items.filter((item) => 
    item.roles.includes(userRole)
  );
  
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
          <SidebarNavLink key={item.path} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SidebarNavSection;
