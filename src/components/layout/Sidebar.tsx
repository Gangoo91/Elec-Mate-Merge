
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import SidebarNavSection from "./SidebarNavSection";
import SidebarFooter from "./SidebarFooter";
import { mainNavItems } from "./SidebarNavItems";
import { useEffect } from "react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { profile } = useAuth();
  const location = useLocation();
  
  // Get the user role from the profile, defaulting to "visitor" if not available
  const userRole = profile?.role || "visitor";

  // Close sidebar on Escape key press (mobile)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, setOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [open]);
  
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-elec-gray border-r border-elec-yellow/20 transition-transform duration-300 ease-in-out",
          "md:relative md:translate-x-0 md:z-auto",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-elec-yellow/20">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={() => setOpen(false)}>
            <span className="font-bold text-xl">
              <span className="text-elec-yellow">Elec</span>
              <span>Mate</span>
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden hover:bg-elec-yellow/10"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <SidebarNavSection 
            items={mainNavItems} 
            userRole={userRole}
            onItemClick={() => setOpen(false)}
          />
        </nav>

        {/* Footer with premium upgrade CTA */}
        <SidebarFooter />
      </aside>
    </>
  );
};

export default Sidebar;
