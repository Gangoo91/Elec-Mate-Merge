import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Clock, Briefcase, Award, Shield, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Conversation } from "@/services/conversationService";

interface ConversationListItemProps {
  conversation: Conversation;
  onClick: () => void;
  onDelete?: (conversation: Conversation) => void;
}

const tierConfig: Record<string, { color: string; bg: string; icon: typeof Shield }> = {
  basic: { color: 'text-muted-foreground', bg: 'bg-muted', icon: Shield },
  verified: { color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', icon: Shield },
  premium: { color: 'text-elec-yellow', bg: 'bg-yellow-100 dark:bg-yellow-900/30', icon: Award },
};

export function ConversationListItem({ conversation, onClick, onDelete }: ConversationListItemProps) {
  const profile = conversation.electrician_profile;
  const employee = profile?.employee;
  const name = employee?.name || 'Unknown';
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const tier = tierConfig[profile?.verification_tier || 'basic'];
  const TierIcon = tier.icon;

  const hasUnread = conversation.unread_employer > 0;
  const lastMessageTime = conversation.last_message_at
    ? formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })
    : null;

  return (
    <Card
      className={`
        bg-elec-gray border-border overflow-hidden cursor-pointer
        transition-all duration-200 hover:border-elec-yellow/30 hover:shadow-md
        ${hasUnread ? 'border-l-4 border-l-elec-yellow' : ''}
      `}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="w-12 h-12 ring-2 ring-border">
              <AvatarImage src={employee?.avatar_url || undefined} alt={name} />
              <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Verification Badge */}
            {profile?.verification_tier && profile.verification_tier !== 'basic' && (
              <div className={`absolute -bottom-0.5 -right-0.5 ${tier.bg} p-0.5 rounded-full ring-2 ring-background`}>
                <TierIcon className={`h-3 w-3 ${tier.color}`} />
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
              <h3 className={`font-semibold truncate ${hasUnread ? 'text-foreground' : 'text-foreground/90'}`}>
                {name}
              </h3>
              {lastMessageTime && (
                <span className="text-xs text-muted-foreground shrink-0">
                  {lastMessageTime}
                </span>
              )}
            </div>

            {/* Vacancy context */}
            {conversation.vacancy && (
              <div className="flex items-center gap-1 mt-0.5 text-sm text-muted-foreground">
                <Briefcase className="h-3 w-3" />
                <span className="truncate">Re: {conversation.vacancy.title}</span>
              </div>
            )}

            {/* Last message preview */}
            {conversation.last_message_preview && (
              <p className={`text-sm mt-1 truncate ${hasUnread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {conversation.last_message_preview}
              </p>
            )}

            {/* Status badges */}
            <div className="flex items-center gap-2 mt-2">
              {profile?.verification_tier && (
                <Badge variant="outline" className={`text-xs px-1.5 py-0 ${tier.bg} ${tier.color} border-0`}>
                  {profile.verification_tier.charAt(0).toUpperCase() + profile.verification_tier.slice(1)}
                </Badge>
              )}

              {!conversation.electrician_can_reply && (
                <Badge variant="outline" className="text-xs px-1.5 py-0 bg-amber-500/10 text-amber-500 border-0">
                  <Clock className="h-3 w-3 mr-1" />
                  Awaiting Application
                </Badge>
              )}

              {conversation.application && (
                <Badge variant="outline" className="text-xs px-1.5 py-0 bg-success/10 text-success border-0">
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
            <MessageSquare className={`h-5 w-5 ${hasUnread ? 'text-elec-yellow' : 'text-muted-foreground'}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ConversationListItemSkeleton() {
  return (
    <Card className="bg-elec-gray border-border">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-5 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-16 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
