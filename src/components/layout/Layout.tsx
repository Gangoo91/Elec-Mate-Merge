
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
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
      {/* Sidebar navigation - mobile-ready */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 relative min-w-0">
        {/* Header with mobile menu toggle */}
        <Header toggleSidebar={toggleSidebar} />
        
        <main 
          className="flex-1 overflow-y-auto overflow-x-hidden mt-6 pt-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8"
          style={{ paddingTop: 'var(--header-height, 64px)' }}
        >
          <div className={cn("mobile-container mobile-safe-area p-0 min-w-0")}>
            <Outlet />
          </div>
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Layout;
