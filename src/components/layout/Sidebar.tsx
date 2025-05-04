
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  GraduationCap, 
  Wrench, 
  Video, 
  Trophy, 
  CreditCard, 
  X,
  User,
  Settings,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const location = useLocation();
  
  // Mock user role - will be replaced with actual auth
  const userRole = "visitor"; // Could be visitor, apprentice, electrician, or employer
  
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-5 w-5" />,
      roles: ["visitor", "apprentice", "electrician", "employer"],
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User className="h-5 w-5" />,
      roles: ["visitor", "apprentice", "electrician", "employer"],
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      roles: ["visitor", "apprentice", "electrician", "employer"],
    },
    {
      name: "Apprentice Hub",
      path: "/apprentice",
      icon: <GraduationCap className="h-5 w-5" />,
      roles: ["visitor", "apprentice", "electrician", "employer"],
    },
    {
      name: "Electrical Hub",
      path: "/electrician",
      icon: <Wrench className="h-5 w-5" />,
      roles: ["visitor", "electrician", "employer"],
    },
    {
      name: "Video Lessons",
      path: "/videos",
      icon: <Video className="h-5 w-5" />,
      roles: ["visitor", "apprentice", "electrician", "employer"],
    },
    {
      name: "Leaderboards",
      path: "/leaderboards",
      icon: <Trophy className="h-5 w-5" />,
      roles: ["visitor", "apprentice", "electrician", "employer"],
    },
    {
      name: "Subscriptions",
      path: "/subscriptions",
      icon: <CreditCard className="h-5 w-5" />,
      roles: ["visitor", "apprentice", "electrician", "employer"],
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
      roles: ["visitor", "apprentice", "electrician", "employer"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-elec-gray border-r border-elec-yellow/20 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-elec-yellow/20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">
              <span className="text-elec-yellow">Elec</span>
              <span>Mate</span>
            </span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                    : "text-elec-light hover:bg-elec-gray-light hover:text-elec-yellow"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-elec-yellow/20">
          <div className="rounded-md bg-elec-yellow/10 p-3">
            <h3 className="font-medium text-elec-yellow">Free Trial</h3>
            <p className="mt-1 text-xs">
              Enhance your electrical skills with premium features.
            </p>
            <Button 
              variant="default" 
              className="mt-2 w-full text-sm h-8"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
