
import { 
  Home, 
  GraduationCap, 
  Wrench, 
  Video, 
  Trophy, 
  CreditCard, 
  Settings,
  MessageSquare,
  Heart,
  Users
} from "lucide-react";

export type NavItem = {
  name: string;
  path: string;
  icon: JSX.Element;
  roles: string[];
};

export const mainNavItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <Home className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "Apprentice Hub",
    path: "/apprentice",
    icon: <GraduationCap className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "Chat Forum",
    path: "/apprentice/chat",
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "Mental Health Hub",
    path: "/apprentice/mental-health",
    icon: <Heart className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "Mentor Connect",
    path: "/apprentice/mentor",
    icon: <Users className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "Electrical Hub",
    path: "/electrician",
    icon: <Wrench className="h-5 w-5" />,
    roles: ["visitor", "electrician", "employer", "admin"],
  },
  {
    name: "Video Lessons",
    path: "/videos",
    icon: <Video className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "Leaderboards",
    path: "/leaderboards",
    icon: <Trophy className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "Subscriptions",
    path: "/subscriptions",
    icon: <CreditCard className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
];
