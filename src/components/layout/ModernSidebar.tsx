import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Star, CheckCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { mainNavItems, NavItem } from "./SidebarNavItems";
import { Button } from "@/components/ui/button";

const ModernSidebar = () => {
  const { profile, isTrialActive, isSubscribed, subscriptionTier } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const [searchQuery] = useState("");
  
  const userRole = profile?.role || "visitor";
  const isCollapsed = state === "collapsed";

  // Filter items based on user role
  const filteredItems = mainNavItems.filter((item) => 
    item.roles.includes(userRole)
  );

  const isItemActive = (item: NavItem) => {
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  };

  return (
    <Sidebar 
      collapsible="icon" 
      className="bg-elec-gray border-r border-elec-yellow/20 group-data-[collapsible=icon]:w-12 md:group-data-[collapsible=icon]:w-14"
    >
      <SidebarHeader className="border-b border-elec-yellow/20 bg-elec-gray">
        <div className={cn(
          "flex items-center gap-2 px-2 py-3 transition-all duration-200",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <div className="w-8 h-8 bg-elec-yellow rounded-lg flex items-center justify-center">
            <span className="text-elec-dark font-bold text-sm">E</span>
          </div>
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <span className="font-bold text-lg">
                <span className="text-elec-yellow">Elec</span>
                <span className="text-white">Mate</span>
              </span>
            </Link>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-elec-gray">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-elec-yellow/70 font-semibold text-xs uppercase tracking-wider">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => {
                const isActive = isItemActive(item);
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={isCollapsed ? item.name : undefined}
                      className={cn(
                        "transition-all duration-200 hover:bg-elec-yellow/10 hover:text-elec-yellow",
                        "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-1",
                        isActive && "!bg-elec-yellow !text-elec-dark font-semibold hover:!bg-elec-yellow/90"
                      )}
                    >
                      <Link to={item.path} className="flex items-center gap-3 w-full">
                        <div className={cn(
                          "transition-all duration-200",
                          isActive ? "text-elec-dark" : "text-white"
                        )}>
                          {item.icon}
                        </div>
                        {!isCollapsed && (
                          <span className={cn(
                            "transition-all duration-200",
                            isActive ? "text-elec-dark" : "text-white"
                          )}>
                            {item.name}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section */}
        {profile && !isCollapsed && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <div className="px-2 py-3 border-t border-elec-yellow/20">
                <div className="flex items-center gap-3 p-2 rounded-md bg-elec-gray-light">
                  <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      User
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {profile.role || 'User'}
                    </p>
                  </div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-elec-yellow/20 bg-elec-gray">
        {profile && (
          <div className="p-2">
            {isSubscribed ? (
              <div className={cn(
                "flex items-center gap-2 text-xs text-green-400 bg-green-400/10 py-2 rounded-md transition-all duration-200",
                isCollapsed ? "justify-center px-2" : "justify-center px-3"
              )}>
                <CheckCircle className="h-3 w-3 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{subscriptionTier || 'Active'}</span>
                )}
              </div>
            ) : (
              <Button 
                variant="outline"
                asChild
                size={isCollapsed ? "icon" : "sm"}
                className={cn(
                  "bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark font-medium border-elec-yellow/50 hover:border-elec-yellow transition-all duration-200",
                  isCollapsed ? "w-8 h-8 p-0" : "w-full h-8"
                )}
              >
                <Link to="/subscriptions" className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span className="text-xs font-medium">Upgrade</span>}
                </Link>
              </Button>
            )}
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default ModernSidebar;