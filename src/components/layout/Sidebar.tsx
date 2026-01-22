
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import SidebarNavSection from "./SidebarNavSection";
import SidebarFooter from "./SidebarFooter";
import { mainNavItems } from "./SidebarNavItems";
import { useEffect } from "react";
import { useScrollLock } from "@/hooks/use-scroll-lock";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { profile } = useAuth();
  const location = useLocation();

  // Get the user role from the profile, defaulting to "visitor" if not available
  const userRole = profile?.role || "visitor";
  const adminRole = profile?.admin_role;

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
  useScrollLock(open);

  return (
    <>
      {/* Mobile overlay with enhanced blur */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar with glass morphism */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col",
          "backdrop-blur-xl bg-elec-dark/90 border-r border-white/10",
          "shadow-2xl shadow-black/50",
          "transition-transform duration-300 ease-in-out",
          "md:relative md:translate-x-0 md:z-auto",
          open ? "translate-x-0" : "-translate-x-full",
          // Hide completely on mobile when closed
          !open && "max-md:invisible"
        )}
      >
        {/* Logo section with gradient styling */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setOpen(false)}
          >
            <div className="rounded-xl overflow-hidden border border-elec-yellow/20 group-hover:border-elec-yellow/40 transition-all duration-200 shadow-lg shadow-elec-yellow/5">
              <img
                src="/logo.jpg"
                alt="Elec-Mate"
                className="h-10 w-10 object-cover"
              />
            </div>
            <span className="font-bold text-lg">
              <span className="bg-gradient-to-r from-elec-yellow to-amber-400 bg-clip-text text-transparent">Elec</span>
              <span className="text-white">Mate</span>
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-white/10 rounded-xl h-10 w-10"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation with custom scrollbar */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <SidebarNavSection
            items={mainNavItems}
            userRole={userRole}
            adminRole={adminRole}
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
