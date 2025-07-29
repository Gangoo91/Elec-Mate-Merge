import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import ModernSidebar from "./ModernSidebar";
import { cn } from "@/lib/utils";

const ModernLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-elec-dark text-slate-50">
        <ModernSidebar />
        
        <SidebarInset className="flex flex-col flex-1">
          {/* Header with sidebar trigger */}
          <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-elec-yellow/20 bg-elec-dark px-4">
            <SidebarTrigger className="text-white hover:bg-elec-yellow/10 hover:text-elec-yellow" />
            <div className="flex-1" />
            
            {/* You can add header content like user menu, notifications here */}
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto py-4 md:py-8 px-4 md:px-6 lg:px-8 max-w-7xl">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
        
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default ModernLayout;