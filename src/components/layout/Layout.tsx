
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/layout/Header";
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import AnnouncementBanner from "@/components/announcements/AnnouncementBanner";

const Layout = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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
    <div className="bg-elec-dark text-slate-50">
      {/* Sidebar navigation - mobile-ready with glass morphism */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Header with glass morphism */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Main content area - no flex constraints, natural document flow for mobile scroll */}
      <main
        className="min-h-screen pb-6"
        style={{ paddingTop: 'var(--header-height, 56px)' }}
      >
        {/* Reduced padding for more native feel - minimal on mobile, moderate on desktop */}
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
          {/* Announcements Banner */}
          <AnnouncementBanner />

          <div className={cn("min-w-0")}>
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
