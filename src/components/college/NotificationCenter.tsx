import { useState, useMemo } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCollege } from '@/contexts/CollegeContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Pill, toneDot, type Tone } from '@/components/college/primitives';

interface NotificationCenterProps {
  onNavigate?: (section: string) => void;
}

export function NotificationCenter({ onNavigate }: NotificationCenterProps) {
  const { comments, workAssignments, assessments } = useCollege();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const notifications = useMemo(() => {
    const items: Array<{
      id: string;
      type: 'mention' | 'action' | 'deadline' | 'update';
      title: string;
      description: string;
      contextType: string;
      contextId: string;
      authorName?: string;
      authorInitials?: string;
      authorRole?: string;
      timestamp: string;
      isRead: boolean;
      requiresAction: boolean;
      isResolved: boolean;
    }> = [];

    comments
      .filter(
        (c) => (c.mentions.includes('staff-1') || c.actionOwner === 'staff-1') && !c.isResolved
      )
      .forEach((comment) => {
        items.push({
          id: `comment-${comment.id}`,
          type: comment.mentions.includes('staff-1') ? 'mention' : 'action',
          title: comment.mentions.includes('staff-1')
            ? `${comment.authorName} mentioned you`
            : 'Action required',
          description:
            comment.content.substring(0, 100) + (comment.content.length > 100 ? '...' : ''),
          contextType: comment.contextType,
          contextId: comment.contextId,
          authorName: comment.authorName,
          authorInitials: comment.authorInitials,
          authorRole: comment.authorRole,
          timestamp: comment.createdAt,
          isRead: false,
          requiresAction: comment.requiresAction,
          isResolved: comment.isResolved,
        });
      });

    workAssignments
      .filter((w) => w.assignedTo === 'staff-1' && w.status !== 'Completed')
      .forEach((work) => {
        items.push({
          id: `work-${work.id}`,
          type: 'action',
          title: `${work.itemTitle}`,
          description: `Assigned by ${work.assignedByName} · ${work.priority} priority`,
          contextType: work.itemType,
          contextId: work.itemId,
          timestamp: work.createdAt,
          isRead: false,
          requiresAction: true,
          isResolved: false,
        });
      });

    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    assessments
      .filter((a) => {
        if (!a.dueDate || a.status === 'Graded') return false;
        const due = new Date(a.dueDate);
        return due >= today && due <= nextWeek;
      })
      .forEach((assessment) => {
        items.push({
          id: `deadline-${assessment.id}`,
          type: 'deadline',
          title: `Assessment due soon`,
          description: `${assessment.unitTitle} · Due ${new Date(
            assessment.dueDate!
          ).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`,
          contextType: 'assessment',
          contextId: assessment.id,
          timestamp: assessment.dueDate!,
          isRead: false,
          requiresAction: false,
          isResolved: false,
        });
      });

    return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [comments, workAssignments, assessments]);

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') return notifications;
    if (activeTab === 'mentions') return notifications.filter((n) => n.type === 'mention');
    if (activeTab === 'actions') return notifications.filter((n) => n.requiresAction);
    return notifications;
  }, [notifications, activeTab]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const mentionCount = notifications.filter((n) => n.type === 'mention').length;
  const actionCount = notifications.filter((n) => n.requiresAction && !n.isResolved).length;

  const typeTone = (type: string): Tone =>
    type === 'mention'
      ? 'blue'
      : type === 'action'
        ? 'amber'
        : type === 'deadline'
          ? 'red'
          : 'yellow';

  const roleTone = (role?: string): Tone =>
    role === 'tutor'
      ? 'blue'
      : role === 'assessor'
        ? 'emerald'
        : role === 'iqa'
          ? 'amber'
          : role === 'student'
            ? 'yellow'
            : 'yellow';

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const handleNotificationClick = (notification: (typeof notifications)[0]) => {
    if (onNavigate) {
      switch (notification.contextType) {
        case 'evidence':
        case 'portfolio':
          onNavigate('portfolio');
          break;
        case 'assessment':
          onNavigate('grading');
          break;
        case 'ilp':
          onNavigate('ilpmanagement');
          break;
      }
    }
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'text-[12.5px] font-medium transition-colors touch-manipulation whitespace-nowrap inline-flex items-center gap-1.5',
              open ? 'text-elec-yellow' : 'text-white/70 hover:text-white'
            )}
          >
            Alerts
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-elec-yellow text-black text-[10px] font-semibold tabular-nums">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[calc(100vw-1rem)] sm:w-96 p-0 z-50 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-2xl"
          align="end"
        >
          <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                Notifications
              </div>
              <div className="mt-0.5 text-[13px] font-semibold text-white">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button className="text-[11.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation">
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-[11.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
              >
                Close
              </button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start gap-0 h-auto p-0 bg-transparent rounded-none border-b border-white/[0.06]">
              <TabsTrigger
                value="all"
                className="flex-1 h-10 touch-manipulation text-[12px] font-medium text-white/60 data-[state=active]:text-elec-yellow data-[state=active]:bg-transparent rounded-none inline-flex items-center gap-1.5"
              >
                All
                {unreadCount > 0 && (
                  <span className="text-[10px] tabular-nums opacity-70">{unreadCount}</span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="mentions"
                className="flex-1 h-10 touch-manipulation text-[12px] font-medium text-white/60 data-[state=active]:text-elec-yellow data-[state=active]:bg-transparent rounded-none inline-flex items-center gap-1.5"
              >
                Mentions
                {mentionCount > 0 && (
                  <span className="text-[10px] tabular-nums opacity-70">{mentionCount}</span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="actions"
                className="flex-1 h-10 touch-manipulation text-[12px] font-medium text-white/60 data-[state=active]:text-elec-yellow data-[state=active]:bg-transparent rounded-none inline-flex items-center gap-1.5"
              >
                Actions
                {actionCount > 0 && (
                  <span className="text-[10px] font-semibold text-amber-400 tabular-nums">
                    {actionCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="max-h-[420px]">
              <TabsContent value={activeTab} className="m-0">
                {filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="text-[13px] font-medium text-white">All caught up</div>
                    <div className="mt-1 text-[11.5px] text-white/50">No notifications right now</div>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.06]">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          'px-5 py-4 hover:bg-white/[0.03] cursor-pointer transition-colors touch-manipulation',
                          !notification.isRead && 'bg-elec-yellow/[0.03]'
                        )}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex gap-3">
                          {notification.authorInitials ? (
                            <Avatar className="h-9 w-9 shrink-0 ring-1 ring-white/[0.08]">
                              <AvatarFallback
                                className={cn(
                                  'text-[11px] font-semibold',
                                  roleTone(notification.authorRole) === 'blue' &&
                                    'bg-blue-500/10 text-blue-400',
                                  roleTone(notification.authorRole) === 'emerald' &&
                                    'bg-emerald-500/10 text-emerald-400',
                                  roleTone(notification.authorRole) === 'amber' &&
                                    'bg-amber-500/10 text-amber-400',
                                  roleTone(notification.authorRole) === 'yellow' &&
                                    'bg-elec-yellow/10 text-elec-yellow'
                                )}
                              >
                                {notification.authorInitials}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-9 w-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                              <span
                                aria-hidden
                                className={cn(
                                  'h-1.5 w-1.5 rounded-full',
                                  toneDot[typeTone(notification.type)]
                                )}
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-[13px] font-medium text-white line-clamp-1">
                                {notification.title}
                              </p>
                              <span className="text-[11px] text-white/40 shrink-0 tabular-nums">
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                            <p className="text-[11.5px] text-white/50 line-clamp-2 mt-0.5 leading-relaxed">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2">
                              <Pill tone="yellow">{notification.contextType}</Pill>
                              {notification.requiresAction && !notification.isResolved && (
                                <Pill tone="amber">Action needed</Pill>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>

          {notifications.length > 0 && (
            <div className="border-t border-white/[0.06] px-5 py-3">
              <button
                onClick={() => setOpen(false)}
                className="w-full text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation text-center"
              >
                View all notifications →
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
