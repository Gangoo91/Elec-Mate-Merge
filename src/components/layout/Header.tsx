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
    <header className="bg-elec-gray border-b border-elec-yellow/10 py-2 px-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-medium text-elec-yellow">Electlearn</h1>
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
