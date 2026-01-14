import React, { useState } from 'react';
import { useCustomerActivity, ActivityType, activityTypeConfig } from '@/hooks/inspection/useCustomerActivity';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  StickyNote,
  Phone,
  Mail,
  FileText,
  MapPin,
  Home,
  MoreVertical,
  Loader2,
  Clock,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerTimelineTabProps {
  customerId: string;
}

const activityIcons: Record<ActivityType, React.ReactNode> = {
  note: <StickyNote className="h-4 w-4" />,
  call: <Phone className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  certificate: <FileText className="h-4 w-4" />,
  visit: <MapPin className="h-4 w-4" />,
  property_added: <Home className="h-4 w-4" />,
};

export const CustomerTimelineTab = ({ customerId }: CustomerTimelineTabProps) => {
  const [filterType, setFilterType] = useState<ActivityType | 'all'>('all');

  const { activities, isLoading, deleteActivity, isDeleting } = useCustomerActivity(
    customerId,
    { activityType: filterType }
  );

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Filter:</span>
        <Select
          value={filterType}
          onValueChange={(value) => setFilterType(value as ActivityType | 'all')}
        >
          <SelectTrigger className="w-[160px] h-10 touch-manipulation">
            <SelectValue placeholder="All activities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="note">Notes</SelectItem>
            <SelectItem value="call">Calls</SelectItem>
            <SelectItem value="email">Emails</SelectItem>
            <SelectItem value="certificate">Certificates</SelectItem>
            <SelectItem value="visit">Site Visits</SelectItem>
            <SelectItem value="property_added">Properties</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timeline */}
      {activities.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">No activity yet</p>
            <p className="text-sm text-muted-foreground">
              {filterType === 'all'
                ? 'Activities will appear here as you interact with this customer'
                : `No ${activityTypeConfig[filterType as ActivityType]?.label.toLowerCase()} activities`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

          {/* Timeline items */}
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const config = activityTypeConfig[activity.activityType];
              const isFirst = index === 0;
              const isLast = index === activities.length - 1;

              return (
                <div key={activity.id} className="relative flex gap-4">
                  {/* Icon */}
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10',
                      'bg-card border-2 border-border',
                      config?.color
                    )}
                  >
                    {activityIcons[activity.activityType]}
                  </div>

                  {/* Content */}
                  <Card className="flex-1">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <Badge variant="outline" className="text-[10px]">
                              {config?.label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDateTime(activity.createdAt)}
                            </span>
                            <span className="text-xs text-muted-foreground hidden sm:inline">
                              at {formatTime(activity.createdAt)}
                            </span>
                          </div>
                          <p className="font-medium text-sm">{activity.title}</p>
                          {activity.description && (
                            <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">
                              {activity.description}
                            </p>
                          )}
                          {/* Certificate metadata */}
                          {activity.activityType === 'certificate' && activity.metadata && (
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              {activity.metadata.certificateNumber && (
                                <span>#{activity.metadata.certificateNumber}</span>
                              )}
                              {activity.metadata.status && (
                                <Badge
                                  variant={
                                    activity.metadata.status === 'completed'
                                      ? 'default'
                                      : 'secondary'
                                  }
                                  className="text-[10px]"
                                >
                                  {activity.metadata.status}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Delete action for manual activities */}
                        {['note', 'call', 'email', 'visit'].includes(activity.activityType) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 flex-shrink-0"
                                disabled={isDeleting}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => deleteActivity(activity.id)}
                                className="text-red-500 focus:text-red-500"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
