
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import RecordingIndicator from "../apprentice/timer/RecordingIndicator";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-elec-gray border-b border-elec-yellow/10 py-2 px-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium text-elec-yellow">ElecMate</h1>
          <RecordingIndicator className="mt-0.5" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Other header items can go here */}
      </div>
    </header>
  );
};

export default Header;
