
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
  // Adding console log to debug
  console.log("Admin sidebar rendering:", { 
    profile, 
    role: profile?.role, 
    isDevelopmentMode,
    shouldShowAdmin: profile?.role === "admin" || isDevelopmentMode 
  });
  
  const isAdmin = profile?.role === "admin" || isDevelopmentMode;
  // Check if the current route is in admin area
  const isAdminRoute = location.pathname.includes('/admin');
  
  // On mobile, highlight the admin section if we're currently on an admin route
  const mobileHighlightClass = isMobile && isAdminRoute ? "bg-yellow-950/30 border-l-2 border-elec-yellow" : "";
  
  // REMOVING early return to debug - we'll always render the admin section for now
  // if (!isAdmin) return null;
  
  // On mobile, if we're in the admin area, show admin section prominently
  if (isMobile && isAdminRoute) {
    return (
      <div className={`${mobileHighlightClass}`}>
        <SidebarNavSection 
          title="Administration" 
          items={adminNavItems} 
          userRole={profile?.role || "admin"} // Force admin role for testing
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
        userRole={profile?.role || "admin"} // Force admin role for testing 
      />
    </div>
  );
};

export default AdminSidebarSection;
