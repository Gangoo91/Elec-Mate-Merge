import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Clock, Briefcase, Award, Shield, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Conversation } from '@/services/conversationService';
import { cn } from '@/lib/utils';

interface ConversationListItemProps {
  conversation: Conversation;
  onClick: () => void;
  onDelete?: (conversation: Conversation) => void;
}

const tierConfig: Record<string, { color: string; bg: string; icon: typeof Shield }> = {
  basic: { color: 'text-white', bg: 'bg-white/[0.06]', icon: Shield },
  verified: { color: 'text-blue-400', bg: 'bg-blue-500/15', icon: Shield },
  premium: { color: 'text-elec-yellow', bg: 'bg-elec-yellow/15', icon: Award },
};

export function ConversationListItem({
  conversation,
  onClick,
  onDelete,
}: ConversationListItemProps) {
  const profile = conversation.electrician_profile;
  const employee = profile?.employee;
  const name = employee?.name || 'Unknown';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  const tier = tierConfig[profile?.verification_tier || 'basic'];
  const TierIcon = tier.icon;

  const hasUnread = conversation.unread_employer > 0;
  const lastMessageTime = conversation.last_message_at
    ? formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })
    : null;

  return (
    <div
      className={cn(
        'group bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer',
        'transition-all duration-200 hover:bg-[hsl(0_0%_15%)]',
        hasUnread && 'border-l-4 border-l-elec-yellow'
      )}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="w-12 h-12 ring-2 ring-white/[0.08]">
              <AvatarImage src={employee?.avatar_url || undefined} alt={name} />
              <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Verification Badge */}
            {profile?.verification_tier && profile.verification_tier !== 'basic' && (
              <div
                className={cn(
                  'absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full ring-2 ring-[hsl(0_0%_12%)]',
                  tier.bg
                )}
              >
                <TierIcon className={cn('h-3 w-3', tier.color)} />
              </div>
            )}

            {/* Unread indicator */}
            {hasUnread && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-elec-yellow text-black text-xs font-bold rounded-full flex items-center justify-center">
                {conversation.unread_employer > 9 ? '9+' : conversation.unread_employer}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold truncate text-white">{name}</h3>
              {lastMessageTime && (
                <span className="text-[11px] text-white shrink-0">{lastMessageTime}</span>
              )}
            </div>

            {/* Vacancy context */}
            {conversation.vacancy && (
              <div className="flex items-center gap-1 mt-0.5 text-[13px] text-white">
                <Briefcase className="h-3 w-3" />
                <span className="truncate">Re: {conversation.vacancy.title}</span>
              </div>
            )}

            {/* Last message preview */}
            {conversation.last_message_preview && (
              <p
                className={cn(
                  'text-[13px] mt-1 truncate text-white',
                  hasUnread && 'font-medium'
                )}
              >
                {conversation.last_message_preview}
              </p>
            )}

            {/* Status badges */}
            <div className="flex items-center gap-2 mt-2">
              {profile?.verification_tier && (
                <Badge
                  variant="outline"
                  className={cn('text-[11px] px-1.5 py-0 border-0', tier.bg, tier.color)}
                >
                  {profile.verification_tier.charAt(0).toUpperCase() +
                    profile.verification_tier.slice(1)}
                </Badge>
              )}

              {!conversation.electrician_can_reply && (
                <Badge
                  variant="outline"
                  className="text-[11px] px-1.5 py-0 bg-amber-500/10 text-amber-400 border-0"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  Awaiting Application
                </Badge>
              )}

              {conversation.application && (
                <Badge
                  variant="outline"
                  className="text-[11px] px-1.5 py-0 bg-emerald-500/10 text-emerald-400 border-0"
                >
                  Applied
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="shrink-0 flex items-center gap-2">
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(conversation);
                }}
                className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 flex items-center justify-center text-red-400 touch-manipulation"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <MessageSquare
              className={cn('h-5 w-5', hasUnread ? 'text-elec-yellow' : 'text-white')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConversationListItemSkeleton() {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-white/[0.06] animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-5 w-32 bg-white/[0.06] rounded animate-pulse" />
            <div className="h-4 w-16 bg-white/[0.06] rounded animate-pulse" />
          </div>
          <div className="h-4 w-48 bg-white/[0.06] rounded animate-pulse" />
          <div className="h-4 w-full bg-white/[0.06] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
