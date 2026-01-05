
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/layout/Header";
import { useState, useEffect } from "react";

const Layout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, sidebarOpen]);

  return (
    <div className="flex h-screen bg-elec-dark text-slate-50 overflow-hidden">
      {/* Sidebar navigation - mobile-ready with glass morphism */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 relative min-w-0">
        {/* Header with glass morphism */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main content area with proper spacing for fixed header */}
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ paddingTop: 'var(--header-height, 56px)' }}
        >
          {/* Reduced padding for more native feel - minimal on mobile, moderate on desktop */}
          <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
            <div className={cn("min-w-0")}>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
