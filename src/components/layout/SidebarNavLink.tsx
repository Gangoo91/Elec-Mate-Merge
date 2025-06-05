
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem } from "./SidebarNavItems";

interface SidebarNavLinkProps {
  item: NavItem;
}

const SidebarNavLink = ({ item }: SidebarNavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  
  const handleClick = () => {
    console.log('Sidebar navigation clicked:', { 
      from: location.pathname, 
      to: item.path, 
      itemName: item.name 
    });
  };
  
  return (
    <Link
      to={item.path}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          : "text-elec-light hover:bg-elec-gray-light hover:text-elec-yellow"
      )}
    >
      {item.icon}
      {item.name}
    </Link>
  );
};

export default SidebarNavLink;
