
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import TrainingActivityMonitor from "@/components/apprentice/TrainingActivityMonitor";
import MainNavigation from "@/components/layout/MainNavigation";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-elec-dark text-slate-50">
      {/* Only show side nav when not mobile */}
      {!isMobile && <MainNavigation />}

      <main className="flex-1 relative pb-16 md:pb-0">
        <div className={cn("container mx-auto py-4 md:py-8 px-2 md:px-4 lg:px-8")}>
          <Outlet />
        </div>
        {/* Mobile navigation at bottom of screen */}
        {isMobile && <MobileNavigation />}
      </main>
      
      {/* Add the training activity monitor */}
      <TrainingActivityMonitor />
      
      <Toaster />
    </div>
  );
};

export default Layout;
