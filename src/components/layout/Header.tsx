
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import UserProfileDropdown from "@/components/auth/UserProfileDropdown";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="flex h-16 items-center justify-between border-b border-elec-yellow/30 px-4 md:px-6">
      <div className="flex items-center">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2 md:hidden"
            aria-label="Toggle Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-elec-yellow">Elec-Mate</span>
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <UserProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
