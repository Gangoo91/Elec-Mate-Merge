import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  onClick?: () => void;
}

interface ActivityFeedProps {
  title?: string;
  activities: Activity[];
  className?: string;
  onViewAll?: () => void;
  maxItems?: number;
}

export function ActivityFeed({
  title = "Recent Activity",
  activities,
  className,
  onViewAll,
  maxItems = 5
}: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <Card className={cn("border-elec-yellow/20 bg-elec-gray", className)}>
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold">{title}</CardTitle>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs text-elec-yellow hover:text-elec-yellow/80 font-medium flex items-center gap-0.5 transition-colors"
            >
              View all
              <ChevronRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-1">
          {displayActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <button
                key={activity.id}
                onClick={activity.onClick}
                disabled={!activity.onClick}
                className={cn(
                  "w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 text-left",
                  activity.onClick
                    ? "hover:bg-muted/50 active:scale-[0.99] cursor-pointer"
                    : "cursor-default"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl shrink-0",
                  activity.bgColor || "bg-elec-yellow/10"
                )}>
                  <Icon className={cn(
                    "h-4 w-4",
                    activity.iconColor || "text-elec-yellow"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">{activity.time}</p>
                </div>
              </button>
            );
          })}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}