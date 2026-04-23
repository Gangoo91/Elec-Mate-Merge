import { LucideIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ListCard, ListCardHeader } from './editorial';

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
  title = 'Recent Activity',
  activities,
  className,
  onViewAll,
  maxItems = 5,
}: ActivityFeedProps) {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <ListCard className={className}>
      <ListCardHeader
        title={title}
        action={onViewAll ? 'View all' : undefined}
        onAction={onViewAll}
      />
      <div className="px-4 pb-4 pt-3">
        <div className="space-y-1">
          {displayActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <button
                key={activity.id}
                onClick={activity.onClick}
                disabled={!activity.onClick}
                className={cn(
                  'w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 text-left',
                  activity.onClick
                    ? 'hover:bg-white/[0.08] active:scale-[0.99] cursor-pointer'
                    : 'cursor-default'
                )}
              >
                <div
                  className={cn('p-2 rounded-xl shrink-0', activity.bgColor || 'bg-elec-yellow/10')}
                >
                  <Icon className={cn('h-4 w-4', activity.iconColor || 'text-elec-yellow')} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{activity.title}</p>
                  <p className="text-xs text-white truncate">{activity.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] sm:text-xs text-white whitespace-nowrap">
                    {activity.time}
                  </p>
                </div>
                {activity.onClick && (
                  <ChevronRight className="h-3.5 w-3.5 text-white shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-6">
            <p className="text-sm text-white">No recent activity</p>
          </div>
        )}
      </div>
    </ListCard>
  );
}
