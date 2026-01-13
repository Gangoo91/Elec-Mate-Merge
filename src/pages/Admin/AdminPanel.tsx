import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const adminNavItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Offers", path: "/admin/offers", icon: Gift },
  { name: "Elec-IDs", path: "/admin/elec-ids", icon: IdCard },
  { name: "Subscriptions", path: "/admin/subscriptions", icon: CreditCard },
  { name: "Chats", path: "/admin/conversations", icon: MessageSquare },
  { name: "System", path: "/admin/system", icon: Activity },
];

export default function AdminPanel() {
  const { profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Protect admin routes
  useEffect(() => {
    if (!isLoading && !profile?.admin_role) {
      navigate("/dashboard", { replace: true });
    }
  }, [profile, isLoading, navigate]);

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

  return (
    <div className="min-h-screen bg-background">
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

        {/* Admin Navigation - Horizontal scroll on mobile */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {adminNavItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/admin" && location.pathname.startsWith(item.path));
              const Icon = item.icon;

              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "shrink-0 gap-2 touch-manipulation",
                    isActive
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}
