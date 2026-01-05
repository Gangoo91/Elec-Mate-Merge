import { Phone, Mail, MessageSquare, Award, Briefcase, AlertTriangle, ChevronRight, CheckSquare, Square, IdCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TeamRole = "QS" | "Supervisor" | "Operative" | "Apprentice" | "Project Manager";
type AvailabilityStatus = "Available" | "On Job" | "On Leave" | "Unavailable";

interface TeamMemberCardProps {
  id: string;
  name: string;
  role: string;
  teamRole: TeamRole;
  avatar: string;
  photo?: string | null;
  availability: AvailabilityStatus;
  phone: string | null;
  email: string | null;
  certificationsCount: number;
  activeJobsCount: number;
  expiringCerts?: number;
  hasElecId?: boolean;
  isSelected?: boolean;
  multiSelectMode?: boolean;
  onClick: () => void;
  onCall?: (e: React.MouseEvent) => void;
  onEmail?: (e: React.MouseEvent) => void;
  onMessage?: (e: React.MouseEvent) => void;
}

const roleColors: Record<TeamRole, string> = {
  "QS": "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
  "Supervisor": "bg-info/20 text-info border-info/30",
  "Operative": "bg-success/20 text-success border-success/30",
  "Apprentice": "bg-warning/20 text-warning border-warning/30",
  "Project Manager": "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
};

const availabilityBorderColors: Record<AvailabilityStatus, string> = {
  "Available": "border-l-success",
  "On Job": "border-l-info",
  "On Leave": "border-l-warning",
  "Unavailable": "border-l-muted-foreground",
};

const availabilityRingColors: Record<AvailabilityStatus, string> = {
  "Available": "ring-success",
  "On Job": "ring-info",
  "On Leave": "ring-warning",
  "Unavailable": "ring-muted-foreground",
};

export function TeamMemberCard({
  name,
  role,
  teamRole,
  avatar,
  photo,
  availability,
  phone,
  email,
  certificationsCount,
  activeJobsCount,
  expiringCerts = 0,
  hasElecId = false,
  isSelected = false,
  multiSelectMode = false,
  onClick,
  onCall,
  onEmail,
  onMessage,
}: TeamMemberCardProps) {
  const initials = avatar || name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <Card 
      className={cn(
        "border-l-4 transition-all duration-200 cursor-pointer group",
        availabilityBorderColors[availability],
        isSelected 
          ? "ring-2 ring-elec-yellow bg-elec-yellow/5 shadow-md" 
          : "hover:shadow-md hover:bg-muted/30 active:scale-[0.99]"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Header Row: Avatar, Name, Role Badge, Chevron */}
        <div className="flex items-start gap-3">
          {/* Multi-select checkbox */}
          {multiSelectMode && (
            <div className="flex-shrink-0 pt-1">
              {isSelected ? (
                <CheckSquare className="h-5 w-5 text-elec-yellow" />
              ) : (
                <Square className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          )}

          {/* Avatar with availability ring */}
          <div className="flex-shrink-0">
            <div className={cn(
              "rounded-full p-0.5 ring-2",
              availabilityRingColors[availability]
            )}>
              <Avatar className="h-14 w-14 border-2 border-background">
                <AvatarImage src={photo || undefined} alt={name} />
                <AvatarFallback className="text-base bg-elec-yellow/10 text-elec-yellow font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Name & Role */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">{name}</h3>
              <Badge 
                variant="outline" 
                className={cn("text-[10px] shrink-0 border", roleColors[teamRole])}
              >
                {teamRole}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">{role}</p>
          </div>

          {/* Chevron */}
          {!multiSelectMode && (
            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
          )}
        </div>

        {/* Contact Row */}
        <div className="flex items-center gap-2 mt-4">
          {phone && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 gap-2 text-xs bg-success/5 border-success/20 hover:bg-success/10 hover:text-success"
              onClick={(e) => {
                e.stopPropagation();
                if (onCall) onCall(e);
                else window.location.href = `tel:${phone}`;
              }}
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="truncate">{phone}</span>
            </Button>
          )}
          {email && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9 gap-2 text-xs bg-info/5 border-info/20 hover:bg-info/10 hover:text-info"
              onClick={(e) => {
                e.stopPropagation();
                if (onEmail) onEmail(e);
                else window.location.href = `mailto:${email}`;
              }}
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate hidden sm:inline">{email}</span>
              <span className="sm:hidden">Email</span>
            </Button>
          )}
          {onMessage && (
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 flex-shrink-0 bg-elec-yellow/5 border-elec-yellow/20 hover:bg-elec-yellow/10 hover:text-elec-yellow"
              onClick={(e) => {
                e.stopPropagation();
                onMessage(e);
              }}
            >
              <MessageSquare className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>

        {/* Stats Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Award className="h-4 w-4 text-warning" />
              <span className="text-muted-foreground">{certificationsCount}</span>
              <span className="text-muted-foreground text-xs">Certs</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Briefcase className="h-4 w-4 text-info" />
              <span className="text-muted-foreground">{activeJobsCount}</span>
              <span className="text-muted-foreground text-xs">Jobs</span>
            </div>
          </div>

          {/* Status badges */}
          <div className="flex items-center gap-1.5">
            {!hasElecId && (
              <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30 text-[10px]">
                <IdCard className="h-3 w-3 mr-1" />
                No Elec-ID
              </Badge>
            )}
            {expiringCerts > 0 && (
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-[10px]">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {expiringCerts} Expiring
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
