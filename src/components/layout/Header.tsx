
import { Menu, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import RecordingIndicator from "../apprentice/timer/RecordingIndicator";
import NotificationDropdown from "../notifications/NotificationDropdown";
import UserProfileDropdown from "../auth/UserProfileDropdown";
import { Link } from "react-router-dom";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-[#1e1e1e] border-b border-elec-yellow/10 py-3 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4 pl-1">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <div className="flex items-center gap-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-elec-yellow">Elec</span>
            <span className="text-white">Mate</span>
          </h1>
          <RecordingIndicator className="mt-0.5" />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        <Link to="/messenger">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/10 transition-all flex items-center gap-2 px-3 py-1 rounded-full ml-auto"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Messages</span>
          </Button>
        </Link>
        <NotificationDropdown />
        <UserProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
