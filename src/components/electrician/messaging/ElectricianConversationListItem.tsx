import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Clock, Briefcase, MapPin, Building2, Lock, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { ElectricianConversation } from "@/services/conversationService";
import { cn } from "@/lib/utils";

interface ElectricianConversationListItemProps {
  conversation: ElectricianConversation;
  onClick: (conversation: ElectricianConversation) => void;
  onDelete?: (conversation: ElectricianConversation) => void;
}

export function ElectricianConversationListItem({
  conversation,
  onClick,
  onDelete,
}: ElectricianConversationListItemProps) {
  const employer = conversation.employer;
  const vacancy = conversation.vacancy;
  const hasUnread = (conversation.unread_electrician || 0) > 0;
  const canReply = conversation.electrician_can_reply;

  // Format time
  const timeAgo = conversation.last_message_at
    ? formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: false })
    : null;

  // Get company initials
  const companyInitials = employer?.company_name
    ? employer.company_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  // Format salary if available
  const salaryRange = vacancy?.salary_min && vacancy?.salary_max
    ? `£${(vacancy.salary_min / 1000).toFixed(0)}k - £${(vacancy.salary_max / 1000).toFixed(0)}k`
    : vacancy?.salary_min
      ? `From £${(vacancy.salary_min / 1000).toFixed(0)}k`
      : null;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 border-border hover:border-elec-yellow/50 hover:shadow-md",
        hasUnread && "border-l-4 border-l-elec-yellow bg-elec-yellow/5"
      )}
      onClick={() => onClick(conversation)}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-3">
          {/* Company Avatar */}
          <div className="relative shrink-0">
            <Avatar className="h-12 w-12 border-2 border-border">
              <AvatarImage src={employer?.logo_url || undefined} alt={employer?.company_name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-500 font-semibold text-sm">
                {companyInitials}
              </AvatarFallback>
            </Avatar>
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-elec-yellow text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                {conversation.unread_electrician > 9 ? '9+' : conversation.unread_electrician}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={cn(
                    "font-semibold truncate text-foreground",
                    hasUnread && "text-elec-yellow"
                  )}>
                    {employer?.company_name || 'Unknown Company'}
                  </h3>
                  {!canReply && (
                    <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  )}
                </div>
                {employer?.contact_name && (
                  <p className="text-xs text-muted-foreground truncate">
                    {employer.contact_name}
                  </p>
                )}
              </div>

              {/* Time */}
              {timeAgo && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <Clock className="h-3 w-3" />
                  <span>{timeAgo}</span>
                </div>
              )}
            </div>

            {/* Vacancy info */}
            {vacancy && (
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="outline" className="text-xs px-2 py-0 bg-primary/10 text-primary border-primary/30">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {vacancy.title}
                </Badge>
                {vacancy.location && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {vacancy.location}
                  </span>
                )}
                {salaryRange && (
                  <span className="text-xs text-success font-medium">
                    {salaryRange}
                  </span>
                )}
              </div>
            )}

            {/* Message preview */}
            {conversation.last_message_preview && (
              <p className={cn(
                "text-sm line-clamp-1",
                hasUnread ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {conversation.last_message_preview}
              </p>
            )}

            {/* Can't reply notice */}
            {!canReply && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                <Lock className="h-3 w-3" />
                <span>Apply to a vacancy to unlock replies</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="shrink-0 self-center flex items-center gap-2">
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
            <MessageSquare className={cn(
              "h-5 w-5",
              hasUnread ? "text-elec-yellow" : "text-muted-foreground"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
