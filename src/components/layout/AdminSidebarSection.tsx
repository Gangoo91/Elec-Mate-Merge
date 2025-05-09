
import { useAuth } from "@/contexts/AuthContext";
import SidebarNavSection from "./SidebarNavSection";
import { adminNavItems } from "./SidebarNavItems";

const AdminSidebarSection = () => {
  const { profile, isDevelopmentMode } = useAuth();
  
  // Show admin section if user is admin OR in development mode
  const isAdmin = profile?.role === "admin" || isDevelopmentMode;
  
  if (!isAdmin) return null;
  
  return (
    <SidebarNavSection 
      title="Administration" 
      items={adminNavItems} 
      userRole={profile?.role || "visitor"} 
    />
  );
};

export default AdminSidebarSection;
