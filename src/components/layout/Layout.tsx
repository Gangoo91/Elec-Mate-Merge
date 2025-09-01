
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
    <div className="flex h-screen bg-elec-dark text-slate-50 overflow-x-hidden">
      {/* Sidebar navigation - mobile-ready */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 relative min-w-0">
        {/* Header with mobile menu toggle */}
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-20">
          <div className={cn("container mx-auto py-6 md:py-8 px-1.5 md:px-6 lg:px-8 max-w-7xl min-w-0")}>
            <Outlet />
          </div>
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Layout;
