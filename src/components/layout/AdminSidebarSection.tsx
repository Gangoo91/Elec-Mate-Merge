
import { useAuth } from "@/contexts/AuthContext";
import SidebarNavSection from "./SidebarNavSection";
import { adminNavItems } from "./SidebarNavItems";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

const AdminSidebarSection = () => {
  const { profile, isDevelopmentMode } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Show admin section if user is admin OR in development mode
  const isAdmin = profile?.role === "admin" || isDevelopmentMode;
  // Check if the current route is in admin area
  const isAdminRoute = location.pathname.includes('/admin');
  
  // On mobile, highlight the admin section if we're currently on an admin route
  const mobileHighlightClass = isMobile && isAdminRoute ? "bg-yellow-950/30 border-l-2 border-elec-yellow" : "";
  
  // Early return if not an admin and not in development mode
  if (!isAdmin) return null;
  
  // On mobile, if we're in the admin area, show admin section prominently
  if (isMobile && isAdminRoute) {
    return (
      <div className={`${mobileHighlightClass}`}>
        <SidebarNavSection 
          title="Administration" 
          items={adminNavItems} 
          userRole={profile?.role || "visitor"} 
          className="border-b border-elec-yellow/20 pb-4"
        />
      </div>
    );
  }
  
  return (
    <div className={`${mobileHighlightClass}`}>
      <SidebarNavSection 
        title="Administration" 
        items={adminNavItems} 
        userRole={profile?.role || "visitor"} 
      />
    </div>
  );
};

export default AdminSidebarSection;
