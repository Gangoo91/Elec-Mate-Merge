
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
    <div className="flex min-h-screen bg-elec-dark text-slate-50">
      {/* Sidebar navigation - overlay on mobile, aside on desktop */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className={cn("flex flex-col flex-1 relative overflow-hidden", 
        isMobile ? "w-full" : "md:ml-64"
      )}>
        {/* Header with mobile menu toggle */}
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 relative pb-4 md:pb-0 pt-16 overflow-x-hidden">
          <div className={cn(
            "py-4 md:py-8 overflow-x-hidden",
            isMobile ? "px-2 max-w-full" : "container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl"
          )}>
            <Outlet />
          </div>
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Layout;
