
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import SidebarNavSection from "./SidebarNavSection";
import AdminSidebarSection from "./AdminSidebarSection";
import SidebarFooter from "./SidebarFooter";
import { mainNavItems } from "./SidebarNavItems";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { profile } = useAuth();
  const location = useLocation();
  
  // Get the user role from the profile, defaulting to "visitor" if not available
  const userRole = profile?.role || "visitor";
  
  // Check if the current route is in admin area
  const isAdminRoute = location.pathname.includes('/admin');
  
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-elec-gray border-r border-elec-yellow/20 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-elec-yellow/20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">
              <span className="text-elec-yellow">Elec</span>
              <span>Mate</span>
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          {/* Show admin section first on mobile when in admin routes */}
          {isAdminRoute && (
            <>
              <AdminSidebarSection />
              <div className="my-6"></div>
              <SidebarNavSection 
                items={mainNavItems} 
                userRole={userRole} 
              />
            </>
          )}
          
          {/* Normal order (main nav first, then admin) when not in admin routes */}
          {!isAdminRoute && (
            <>
              <SidebarNavSection 
                items={mainNavItems} 
                userRole={userRole} 
              />
              <div className="my-6"></div>
              <AdminSidebarSection />
            </>
          )}
        </nav>

        {/* Footer with premium upgrade CTA */}
        <SidebarFooter />
      </aside>
    </>
  );
};

export default Sidebar;
