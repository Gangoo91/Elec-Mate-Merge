import {
  Home,
  GraduationCap,
  Wrench,
  CreditCard,
  Settings,
  Heart,
  Briefcase,
  Database,
  BookOpen,
  Zap,
  School,
  Shield
} from "lucide-react";

export type NavItem = {
  name: string;
  path: string;
  icon: JSX.Element;
  roles: string[];
  adminOnly?: boolean; // Requires admin_role to be set
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
    name: "Electrical Hub",
    path: "/electrician",
    icon: <Zap className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "Employer Hub",
    path: "/employer",
    icon: <Briefcase className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "College Hub",
    path: "/college",
    icon: <School className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "college", "tutor", "admin"],
  },
  {
    name: "Study Centre",
    path: "/study-centre",
    icon: <BookOpen className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
  },
  {
    name: "Mental Health Hub",
    path: "/mental-health",
    icon: <Heart className="h-5 w-5" />,
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
  {
    name: "Knowledge Uploader",
    path: "/admin/knowledge-uploader",
    icon: <Database className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    name: "Admin Panel",
    path: "/admin",
    icon: <Shield className="h-5 w-5" />,
    roles: ["visitor", "apprentice", "electrician", "employer", "admin"],
    adminOnly: true,
  },
];
