
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { NavItem } from "./SidebarNavItems";
import SafeLink from "@/components/common/SafeLink";
import { prefetchPeerSupportData } from "@/hooks/usePeerChat";

interface SidebarNavLinkProps {
  item: NavItem;
  onItemClick?: () => void;
}

const SidebarNavLink = ({ item, onItemClick }: SidebarNavLinkProps) => {
  try {
    const location = useLocation();
    const queryClient = useQueryClient();
    const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

    const handleClick = () => {
      // Call the onItemClick prop if provided (for closing mobile sidebar)
      onItemClick?.();
    };

    const handleMouseEnter = () => {
      // Prefetch data for specific routes on hover
      if (item.path === '/mental-health') {
        prefetchPeerSupportData(queryClient);
      }
    };

    return (
      <SafeLink
        to={item.path}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
          "transition-all duration-200 ease-out",
          "hover:translate-x-1",
          isActive
            ? "bg-gradient-to-r from-elec-yellow/20 to-transparent border-l-2 border-elec-yellow text-white"
            : "text-white/70 hover:bg-white/5 hover:text-white"
        )}
      >
        <div
          className={cn(
            "p-2 rounded-lg transition-colors duration-200",
            isActive ? "bg-elec-yellow/20" : "bg-white/5"
          )}
        >
          {item.icon}
        </div>
        <span className={isActive ? "font-semibold" : ""}>{item.name}</span>
      </SafeLink>
    );
  } catch (error) {
    console.warn('SidebarNavLink: Router context not available', error);
    // Fallback: render without Link functionality
    return (
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
          "text-white/70 hover:bg-white/5 hover:text-white"
        )}
      >
        <div className="p-2 rounded-lg bg-white/5">
          {item.icon}
        </div>
        <span>{item.name}</span>
      </div>
    );
  }
};

export default SidebarNavLink;
