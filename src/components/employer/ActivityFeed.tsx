import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
  iconColor?: string;
}

interface ActivityFeedProps {
  title?: string;
  activities: Activity[];
  className?: string;
}

export function ActivityFeed({ title = "Recent Activity", activities, className }: ActivityFeedProps) {
  return (
    <Card className={cn("card-hover", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={activity.id} className="flex gap-4">
            <div className={cn(
              "p-2 rounded-lg h-fit",
              activity.iconColor || "bg-elec-yellow/10"
            )}>
              <activity.icon className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}