import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  useCollegeConversations,
  useCollegeLearnerThreads,
  type CollegeLearnerThread,
} from '@/hooks/useCollegeChat';
import { useAuth } from '@/contexts/AuthContext';
import type { CollegeConversation } from '@/services/collegeChatService';
import { Pill, EmptyState, toneDot, type Tone } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { keyLabel } from '@/lib/college/labels';

interface CollegeChatListProps {
  onSelectConversation: (conversation: CollegeConversation) => void;
  currentUserType: 'student' | 'staff' | 'employer';
  /** Called before leaving for a learner's Messages area, so a sheet can close. */
  onLeave?: () => void;
}

export function CollegeChatList({
  onSelectConversation,
  currentUserType,
  onLeave,
}: CollegeChatListProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: conversations = [], isLoading, totalUnread } = useCollegeConversations(true);
  // ELE-1889: learner messages come from the canonical tables, for staff.
  const isStaff = currentUserType === 'staff';
  const { data: learnerThreads = [], isLoading: threadsLoading } =
    useCollegeLearnerThreads(isStaff);
  const openThread = (t: CollegeLearnerThread) => {
    onLeave?.();
    navigate(`/college?section=student360&studentId=${encodeURIComponent(t.studentId)}#messages`);
  };

  const getConversationDisplay = (conv: CollegeConversation) => {
    const type = conv.conversation_type;
    const other = conv.other_participant;

    let dotTone: Tone = 'yellow';
    let badgeLabel: string | null = null;
    let badgeTone: Tone = 'yellow';

    if (type === 'student_tutor') {
      // Older learner chats only: learner messages now live in the learner's
      // Messages area (student_message_threads).
      if (currentUserType === 'student') {
        dotTone = 'blue';
        badgeLabel = 'Tutor';
        badgeTone = 'blue';
      } else {
        dotTone = 'emerald';
        badgeLabel = 'Older chat';
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

  if (isLoading || (isStaff && threadsLoading)) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full bg-white/[0.04]" />
        ))}
      </div>
    );
  }

  const learnerSection =
    isStaff && learnerThreads.length > 0 ? (
      <div className="space-y-2">
        <div className="px-1 text-[13px] font-medium text-white">Learner messages</div>
        <div className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)]">
          {learnerThreads.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => openThread(t)}
              className="w-full px-5 py-4 text-left transition-colors touch-manipulation hover:bg-[hsl(0_0%_15%)] sm:px-6"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-11 w-11 shrink-0 ring-1 ring-white/[0.08]">
                  <AvatarFallback className="bg-white/[0.1] text-sm font-semibold text-white">
                    {t.learner.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="line-clamp-1 break-words text-[14px] font-medium text-white">
                      {t.learner}
                    </p>
                    {t.lastMessageAt && (
                      <span className="shrink-0 text-[12px] tabular-nums text-white">
                        {formatDistanceToNow(new Date(t.lastMessageAt), { addSuffix: false })}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    {/* line-clamp, not truncate: the sheet's scroll area sizes to its widest line. */}
                    <p
                      className={cn(
                        'line-clamp-1 break-words text-[12.5px] text-white',
                        t.unread > 0 && 'font-medium'
                      )}
                    >
                      {t.preview || t.subject || 'No messages yet'}
                    </p>
                    {t.unread > 0 && (
                      <span className="inline-flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full bg-elec-yellow px-1 text-[12px] font-semibold tabular-nums text-black">
                        {t.unread > 9 ? '9+' : t.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    ) : null;

  if (conversations.length === 0 && learnerSection)
    return <div className="space-y-3">{learnerSection}</div>;

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
      {learnerSection}
      {totalUnread > 0 && (
        <div className="text-[13px] font-medium text-white px-1">
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
                    <AvatarFallback className="bg-white/[0.1] text-white text-sm font-semibold">
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
                          display.unreadCount > 0 ? 'text-white' : 'text-white'
                        )}
                      >
                        {display.name}
                      </p>
                      {display.badgeLabel && (
                        <Pill tone={display.badgeTone}>{display.badgeLabel}</Pill>
                      )}
                    </div>
                    {display.lastMessageAt && (
                      <span className="text-[12px] text-white shrink-0 tabular-nums">
                        {formatDistanceToNow(new Date(display.lastMessageAt), {
                          addSuffix: false,
                        })}
                      </span>
                    )}
                  </div>

                  {(display.role || display.student) && (
                    <p className="mt-0.5 text-[12px] text-white truncate">
                      {keyLabel(display.role)}
                      {display.student && <span className="ml-1">· {display.student.name}</span>}
                    </p>
                  )}

                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        'text-[12.5px] truncate',
                        display.unreadCount > 0 ? 'text-white font-medium' : 'text-white'
                      )}
                    >
                      {display.lastMessage || 'No messages yet'}
                    </p>
                    {display.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-elec-yellow text-black text-[12px] font-semibold tabular-nums shrink-0">
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
