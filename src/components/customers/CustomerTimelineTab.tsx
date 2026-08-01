import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCustomerActivity,
  ActivityType,
  activityTypeConfig,
} from '@/hooks/inspection/useCustomerActivity';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerTimelineTabProps {
  customerId: string;
}

export const CustomerTimelineTab = ({ customerId }: CustomerTimelineTabProps) => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<ActivityType | 'all'>('all');

  const { activities, isLoading, deleteActivity, isDeleting } = useCustomerActivity(customerId, {
    activityType: filterType,
  });

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
        <span className="text-sm text-white">Filter:</span>
        <MobileSelectPicker
          value={filterType}
          onValueChange={(value) => setFilterType(value as ActivityType | 'all')}
          options={[
            { value: 'all', label: 'All Activities' },
            { value: 'note', label: 'Notes' },
            { value: 'call', label: 'Calls' },
            { value: 'email', label: 'Emails' },
            { value: 'certificate', label: 'Certificates' },
            { value: 'visit', label: 'Site Visits' },
            { value: 'property_added', label: 'Properties' },
          ]}
          placeholder="All activities"
          title="Filter Activities"
        />
      </div>

      {/* Timeline */}
      {activities.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] px-6 py-10 text-center">
          <p className="text-[15px] font-semibold text-white">No activity yet</p>
          <p className="mt-1 text-[12.5px] text-white/55">
            {filterType === 'all'
              ? 'Activities appear here as you work with this customer.'
              : `No ${activityTypeConfig[filterType as ActivityType]?.label.toLowerCase()} activities.`}
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-white/[0.1]" />

          {/* Timeline items */}
          <div className="space-y-3">
            {activities.map((activity) => {
              const config = activityTypeConfig[activity.activityType];
              const openable =
                activity.activityType === 'certificate' && activity.metadata?.reportId;

              return (
                <div key={activity.id} className="relative flex gap-4">
                  {/* Node */}
                  <span className="z-10 mt-4 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-[hsl(0_0%_10%)] bg-elec-yellow" />

                  {/* Content */}
                  <div
                    className={cn(
                      'flex-1 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-3 sm:p-4',
                      openable &&
                        'cursor-pointer transition-all hover:border-white/[0.22] active:scale-[0.99] touch-manipulation'
                    )}
                    onClick={() => {
                      if (openable) {
                        const reportType = activity.metadata.reportType || 'eicr';
                        navigate(
                          `/electrician/inspection-testing/${reportType}/${activity.metadata.reportId}`
                        );
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <span className="rounded bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold text-white/75">
                            {config?.label}
                          </span>
                          <span className="text-[11.5px] text-white/55">
                            {formatDateTime(activity.createdAt)}
                          </span>
                          <span className="hidden text-[11.5px] text-white/45 sm:inline">
                            at {formatTime(activity.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-white">{activity.title}</p>
                        {activity.description && (
                          <p className="mt-1 whitespace-pre-wrap text-[12.5px] text-white/70">
                            {activity.description}
                          </p>
                        )}
                        {/* Certificate metadata */}
                        {activity.activityType === 'certificate' && activity.metadata && (
                          <div className="mt-2 flex items-center gap-2 text-[11.5px] text-white/60">
                            {activity.metadata.certificateNumber && (
                              <span>#{activity.metadata.certificateNumber}</span>
                            )}
                            {activity.metadata.status && (
                              <span
                                className={cn(
                                  'rounded px-1.5 py-0.5 text-[10px] font-semibold',
                                  activity.metadata.status === 'completed'
                                    ? 'bg-green-500/15 text-green-400'
                                    : 'bg-white/[0.08] text-white/60'
                                )}
                              >
                                {activity.metadata.status}
                              </span>
                            )}
                            {activity.metadata.reportId && (
                              <span className="ml-auto text-[12px] font-semibold text-elec-yellow">
                                Open
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Delete action for manual activities */}
                      {['note', 'call', 'email', 'visit'].includes(activity.activityType) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteActivity(activity.id);
                          }}
                          disabled={isDeleting}
                          className="flex h-8 shrink-0 items-center px-1.5 text-[11.5px] font-medium text-white/40 transition-colors hover:text-red-400 disabled:opacity-40 touch-manipulation"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
