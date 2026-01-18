import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, Crown, Zap, Gift } from "lucide-react";
import { getInitials } from "@/utils/adminUtils";

interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  role: string | null;
  admin_role: string | null;
  subscribed: boolean;
  free_access_granted?: boolean;
  elec_id_enabled: boolean;
  email?: string | null;
  isOnline?: boolean;
}

interface RoleStyle {
  bg: string;
  text: string;
  border: string;
}

interface AdminUserCardProps {
  user: UserProfile;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onClick: (user: UserProfile) => void;
  roleStyle: RoleStyle;
}

const AdminUserCardComponent: React.FC<AdminUserCardProps> = ({
  user,
  isSelected,
  onToggleSelection,
  onClick,
  roleStyle,
}) => {
  return (
    <Card
      className={`touch-manipulation transition-all duration-150 cursor-pointer ${
        isSelected
          ? "border-yellow-500/50 bg-yellow-500/5"
          : "border-transparent hover:border-primary/20"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* Checkbox */}
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelection(user.id)}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 border-muted-foreground/50 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
          />

          {/* Clickable area for user details */}
          <div
            className="flex items-center gap-4 flex-1 min-w-0"
            onClick={() => onClick(user)}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <Avatar className="h-12 w-12 rounded-xl border-2 border-muted">
                <AvatarImage src={user.avatar_url || undefined} />
                <AvatarFallback
                  className={`rounded-xl text-base font-bold ${roleStyle.bg} ${roleStyle.text}`}
                >
                  {getInitials(user.full_name)}
                </AvatarFallback>
              </Avatar>
              {/* Online indicator */}
              {user.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
              )}
              {/* Admin crown */}
              {user.admin_role && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <Crown className="h-2.5 w-2.5 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm truncate">
                  {user.full_name || "No name"}
                </p>
                {user.subscribed && (
                  <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                )}
                {user.free_access_granted && (
                  <Gift className="h-3.5 w-3.5 text-green-400 shrink-0" />
                )}
              </div>
              {user.email ? (
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground truncate">
                  @{user.username || "unknown"}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-1">
                <Badge
                  variant="outline"
                  className={`text-[10px] px-1.5 py-0 h-4 ${roleStyle.bg} ${roleStyle.text} ${roleStyle.border}`}
                >
                  {user.role || "visitor"}
                </Badge>
                {user.elec_id_enabled && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 h-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                  >
                    ID
                  </Badge>
                )}
                {user.admin_role && (
                  <Badge className="text-[10px] px-1.5 py-0 h-4 bg-red-500/20 text-red-400 border-red-500/30">
                    {user.admin_role === "super_admin" ? "Super" : "Admin"}
                  </Badge>
                )}
              </div>
            </div>

            {/* Chevron */}
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const AdminUserCard = memo(AdminUserCardComponent);
