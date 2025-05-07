
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useState } from "react";
import { useUserActivity } from "@/hooks/useUserActivity";
import { TooltipProvider } from "@/components/ui/tooltip";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Track user activity when the app loads
  useUserActivity();
  
  return (
    <div className="flex h-screen bg-elec-dark text-elec-light overflow-hidden">
      <TooltipProvider>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="container max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
          
          <Footer />
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Layout;
