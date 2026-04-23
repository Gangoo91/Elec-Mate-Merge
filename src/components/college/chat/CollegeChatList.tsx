import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { useCollegeConversations } from '@/hooks/useCollegeChat';
import { useAuth } from '@/contexts/AuthContext';
import type { CollegeConversation } from '@/services/collegeChatService';
import { Pill, EmptyState, toneDot, type Tone } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface CollegeChatListProps {
  onSelectConversation: (conversation: CollegeConversation) => void;
  currentUserType: 'student' | 'staff' | 'employer';
}

export function CollegeChatList({ onSelectConversation, currentUserType }: CollegeChatListProps) {
  const { user } = useAuth();
  const { data: conversations = [], isLoading, totalUnread } = useCollegeConversations(true);

  const getConversationDisplay = (conv: CollegeConversation) => {
    const type = conv.conversation_type;
    const other = conv.other_participant;

    let dotTone: Tone = 'yellow';
    let badgeLabel: string | null = null;
    let badgeTone: Tone = 'yellow';

    if (type === 'student_tutor') {
      if (currentUserType === 'student') {
        dotTone = 'blue';
        badgeLabel = 'Tutor';
        badgeTone = 'blue';
      } else {
        dotTone = 'emerald';
        badgeLabel = 'Student';
        badgeTone = 'emerald';
      }
    } else if (type === 'college_employer') {
      if (currentUserType === 'employer') {
        dotTone = 'blue';
        badgeLabel = 'College';
        badgeTone = 'blue';
      } else {
        dotTone = 'orange';
        badgeLabel = 'Employer';
        badgeTone = 'orange';
      }
    }

    const isParticipant1 = conv.participant_1_id === user?.id;
    const unreadCount = isParticipant1 ? conv.unread_1 : conv.unread_2;

    return {
      name: other?.name || 'Unknown',
      avatar: other?.avatar_url,
      role: other?.role,
      dotTone,
      badgeLabel,
      badgeTone,
      unreadCount,
      lastMessage: conv.last_message_preview,
      lastMessageAt: conv.last_message_at,
      student: conv.student,
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <EmptyState
        title="No conversations yet"
        description={
          currentUserType === 'student'
            ? 'Your conversations with tutors will appear here.'
            : currentUserType === 'staff'
              ? 'Conversations with students and employers will appear here.'
              : 'Conversations with college staff will appear here.'
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      {totalUnread > 0 && (
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55 px-1">
          {totalUnread} unread message{totalUnread > 1 ? 's' : ''}
        </div>
      )}

      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
        {conversations.map((conv) => {
          const display = getConversationDisplay(conv);

          return (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv)}
              className="w-full px-5 sm:px-6 py-4 hover:bg-[hsl(0_0%_15%)] transition-colors text-left touch-manipulation"
            >
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <Avatar className="h-11 w-11 ring-1 ring-white/[0.08]">
                    <AvatarImage src={display.avatar || undefined} />
                    <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-sm font-semibold">
                      {display.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    aria-hidden
                    className={cn(
                      'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[hsl(0_0%_12%)]',
                      toneDot[display.dotTone]
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <p
                        className={cn(
                          'text-[14px] font-medium truncate',
                          display.unreadCount > 0 ? 'text-white' : 'text-white/80'
                        )}
                      >
                        {display.name}
                      </p>
                      {display.badgeLabel && <Pill tone={display.badgeTone}>{display.badgeLabel}</Pill>}
                    </div>
                    {display.lastMessageAt && (
                      <span className="text-[11px] text-white/70 shrink-0 tabular-nums">
                        {formatDistanceToNow(new Date(display.lastMessageAt), {
                          addSuffix: false,
                        })}
                      </span>
                    )}
                  </div>

                  {(display.role || display.student) && (
                    <p className="mt-0.5 text-[11px] text-white/75 truncate">
                      {display.role}
                      {display.student && (
                        <span className="ml-1">
                          · {display.student.first_name} {display.student.last_name}
                        </span>
                      )}
                    </p>
                  )}

                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        'text-[12.5px] truncate',
                        display.unreadCount > 0 ? 'text-white/80 font-medium' : 'text-white/75'
                      )}
                    >
                      {display.lastMessage || 'No messages yet'}
                    </p>
                    {display.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-elec-yellow text-black text-[10px] font-semibold tabular-nums shrink-0">
                        {display.unreadCount > 9 ? '9+' : display.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
