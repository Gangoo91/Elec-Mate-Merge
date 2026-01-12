import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "./StatusBadge";
import { MapPin, Calendar, Users, PoundSterling, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AssignedWorker {
  id: string;
  name: string;
  avatar_initials: string;
  photo_url?: string | null;
}

interface JobCardProps {
  title: string;
  client: string;
  location: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  workersCount: number;
  value?: number | null;
  description?: string | null;
  assignedWorkers?: AssignedWorker[];
  onClick?: () => void;
  className?: string;
}

const getStatusColour = (status: string) => {
  switch (status) {
    case "Active":
      return "border-l-success";
    case "Pending":
      return "border-l-warning";
    case "Completed":
      return "border-l-muted-foreground";
    case "On Hold":
      return "border-l-info";
    case "Cancelled":
      return "border-l-destructive";
    default:
      return "border-l-border";
  }
};

const getProgressColour = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-success";
    case "Pending":
      return "bg-warning";
    case "Completed":
      return "bg-muted-foreground";
    default:
      return "bg-elec-yellow";
  }
};

export function JobCard({
  title,
  client,
  location,
  status,
  progress,
  startDate,
  endDate,
  workersCount,
  value,
  description,
  assignedWorkers = [],
  onClick,
  className
}: JobCardProps) {
  const formatValue = (val: number | null | undefined) => {
    if (!val) return null;
    if (val >= 1000) {
      const kValue = val / 1000;
      // Show decimal only if not a whole number
      return kValue % 1 === 0 ? `£${kValue}k` : `£${kValue.toFixed(1)}k`;
    }
    return `£${val.toLocaleString()}`;
  };

  const displayValue = formatValue(value);
  const hasValidDates = startDate !== "-" && endDate !== "-";

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 border-l-4 overflow-hidden touch-manipulation",
        "hover:border-elec-yellow/40 hover:shadow-lg hover:shadow-elec-yellow/5",
        "active:border-elec-yellow/40 active:shadow-lg active:shadow-elec-yellow/5 active:scale-[0.98]",
        getStatusColour(status),
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        {/* Header - Title, Client & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground truncate text-base leading-tight">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5 truncate">{client}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <StatusBadge status={status} />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-elec-yellow/70" />
          <span className="truncate">{location}</span>
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-bold text-foreground">{progress}%</span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
            <div 
              className={cn("h-full rounded-full transition-all duration-300", getProgressColour(status))}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Footer - Dates, Workers, Value */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            {hasValidDates && (
              <>
                <Calendar className="h-3.5 w-3.5 shrink-0 text-elec-yellow/70" />
                <span>{startDate}</span>
                {endDate !== startDate && (
                  <>
                    <span className="text-muted-foreground/50">→</span>
                    <span>{endDate}</span>
                  </>
                )}
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Worker Avatars or Count */}
            <div className="flex items-center gap-1">
              {assignedWorkers.length > 0 ? (
                <div className="flex items-center">
                  <div className="flex -space-x-1.5">
                    {assignedWorkers.slice(0, 3).map((worker) => (
                      <Avatar 
                        key={worker.id} 
                        className="h-5 w-5 border-2 border-background ring-0"
                      >
                        {worker.photo_url ? (
                          <AvatarImage src={worker.photo_url} alt={worker.name} />
                        ) : null}
                        <AvatarFallback className="text-[8px] bg-elec-yellow/10 text-elec-yellow font-medium">
                          {worker.avatar_initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  {workersCount > 3 && (
                    <span className="ml-1 text-muted-foreground font-medium">
                      +{workersCount - 3}
                    </span>
                  )}
                </div>
              ) : (
                <>
                  <Users className="h-3.5 w-3.5 text-muted-foreground/70" />
                  <span className="text-muted-foreground">0</span>
                </>
              )}
            </div>
            
            {displayValue && (
              <div className="flex items-center gap-0.5 text-elec-yellow font-bold text-sm">
                <span>{displayValue}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
