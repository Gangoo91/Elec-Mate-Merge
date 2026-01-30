import { useEffect, useState, useCallback } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useAdminPrefetch } from "@/hooks/useAdminPrefetch";
import {
  LayoutDashboard,
  Users,
  Gift,
  IdCard,
  CreditCard,
  MessageSquare,
  Activity,
  Shield,
  ShieldCheck,
  Megaphone,
  DollarSign,
  HeadphonesIcon,
  History,
  Mail,
  BarChart3,
  Flag,
  Settings,
  CheckSquare,
  Briefcase,
  Download,
  ChevronDown,
  ChevronUp,
  PoundSterling,
  Crown,
  FileCheck,
  Camera,
  ArrowLeft,
  Rocket,
  Inbox,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Primary navigation items - always visible
const primaryNavItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Trials", path: "/admin/trials", icon: Timer },
  { name: "Revenue", path: "/admin/revenue", icon: DollarSign },
  { name: "Messages", path: "/admin/user-messages", icon: Inbox },
];

// Secondary navigation items - in expandable section (More)
const secondaryNavItems = [
  { name: "Founders", path: "/admin/founders", icon: Crown },
  { name: "Early Access", path: "/admin/early-access", icon: Rocket },
  { name: "Elec-IDs", path: "/admin/elec-ids", icon: IdCard },
  { name: "Verification", path: "/admin/verification", icon: CheckSquare },
  { name: "Doc Review", path: "/admin/document-review", icon: FileCheck },
  { name: "Subscriptions", path: "/admin/subscriptions", icon: CreditCard },
];

// Admin tools - in expandable section (rarely used)
const adminToolItems = [
  { name: "Announcements", path: "/admin/announcements", icon: Megaphone },
  { name: "Emails", path: "/admin/emails", icon: Mail },
  { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { name: "System", path: "/admin/system", icon: Activity },
];

export default function AdminPanel() {
  const { profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { handlePrefetch } = useAdminPrefetch(queryClient);
  const [showMore, setShowMore] = useState(false);
  const [showTools, setShowTools] = useState(false);

  // Protect admin routes
  useEffect(() => {
    if (!isLoading && !profile?.admin_role) {
      navigate("/dashboard", { replace: true });
    }
  }, [profile, isLoading, navigate]);

  // Auto-expand sections based on current path
  useEffect(() => {
    const isInSecondary = secondaryNavItems.some(
      (item) => location.pathname === item.path || location.pathname.startsWith(item.path + "/")
    );
    const isInTools = adminToolItems.some(
      (item) => location.pathname === item.path || location.pathname.startsWith(item.path + "/")
    );
    if (isInSecondary) setShowMore(true);
    if (isInTools) setShowTools(true);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow" />
      </div>
    );
  }

  if (!profile?.admin_role) {
    return null;
  }

  const isSuperAdmin = profile.admin_role === "super_admin";

  // Prefetch data on hover/touch for faster navigation
  const onPrefetch = useCallback(
    (path: string) => handlePrefetch(path),
    [handlePrefetch]
  );

  const renderNavItem = (item: { name: string; path: string; icon: any }) => {
    const isActive =
      location.pathname === item.path ||
      (item.path !== "/admin" && location.pathname.startsWith(item.path + "/"));
    const Icon = item.icon;

    return (
      <Button
        key={item.path}
        variant={isActive ? "default" : "ghost"}
        size="sm"
        onClick={() => navigate(item.path)}
        onMouseEnter={() => onPrefetch(item.path)}
        onTouchStart={() => onPrefetch(item.path)}
        className={cn(
          "shrink-0 gap-1.5 sm:gap-2 touch-manipulation h-10 sm:h-9 px-2.5 sm:px-4 text-xs sm:text-sm",
          isActive
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
        {item.name}
      </Button>
    );
  };

  return (
    <div className="bg-background">
      {/* Back Button */}
      <div className="px-4 pt-4">
        <Button
          variant="ghost"
          className="text-white/70 hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Button>
      </div>

      {/* Admin Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
                <div className="flex items-center gap-1.5">
                  {isSuperAdmin ? (
                    <ShieldCheck className="h-3.5 w-3.5 text-red-400" />
                  ) : (
                    <Shield className="h-3.5 w-3.5 text-orange-400" />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {isSuperAdmin ? "Super Admin" : "Admin"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {primaryNavItems.map(renderNavItem)}

            {/* More Button */}
            <Button
              variant={showMore ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowMore(!showMore)}
              className="shrink-0 gap-1 touch-manipulation h-10 sm:h-9 px-3 text-xs sm:text-sm text-muted-foreground"
            >
              More
              {showMore ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>

            {/* Tools Button */}
            <Button
              variant={showTools ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowTools(!showTools)}
              className="shrink-0 gap-1 touch-manipulation h-10 sm:h-9 px-3 text-xs sm:text-sm text-muted-foreground"
            >
              Tools
              {showTools ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        {/* Secondary Navigation - Expandable */}
        {showMore && (
          <div className="px-4 pb-2 border-t border-border/50 pt-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {secondaryNavItems.map(renderNavItem)}
            </div>
          </div>
        )}

        {/* Tools Navigation - Expandable */}
        {showTools && (
          <div className="px-4 pb-2 border-t border-border/50 pt-2">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {adminToolItems.map(renderNavItem)}
            </div>
          </div>
        )}
      </div>

      {/* Admin Content */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
