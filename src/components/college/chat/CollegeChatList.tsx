import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GraduationCap,
  Building2,
  UserCog,
  MessageSquare,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useCollegeConversations } from "@/hooks/useCollegeChat";
import { useAuth } from "@/contexts/AuthContext";
import type { CollegeConversation } from "@/services/collegeChatService";

interface CollegeChatListProps {
  onSelectConversation: (conversation: CollegeConversation) => void;
  currentUserType: 'student' | 'staff' | 'employer';
}

export function CollegeChatList({
  onSelectConversation,
  currentUserType,
}: CollegeChatListProps) {
  const { user } = useAuth();
  // Always enabled in college chat view
  const { data: conversations = [], isLoading, totalUnread } = useCollegeConversations(true);

  const getConversationDisplay = (conv: CollegeConversation) => {
    const type = conv.conversation_type;
    const other = conv.other_participant;

    // Determine which icon to show based on conversation type
    let icon = <MessageSquare className="h-4 w-4" />;
    let badge = null;

    if (type === 'student_tutor') {
      if (currentUserType === 'student') {
        icon = <UserCog className="h-4 w-4 text-blue-500" />;
        badge = <Badge variant="outline" className="text-xs">Tutor</Badge>;
      } else {
        icon = <GraduationCap className="h-4 w-4 text-green-500" />;
        badge = <Badge variant="outline" className="text-xs">Student</Badge>;
      }
    } else if (type === 'college_employer') {
      if (currentUserType === 'employer') {
        icon = <UserCog className="h-4 w-4 text-blue-500" />;
        badge = <Badge variant="outline" className="text-xs">College</Badge>;
      } else {
        icon = <Building2 className="h-4 w-4 text-orange-500" />;
        badge = <Badge variant="outline" className="text-xs">Employer</Badge>;
      }
    }

    // Get unread count for current user
    const isParticipant1 = conv.participant_1_id === user?.id;
    const unreadCount = isParticipant1 ? conv.unread_1 : conv.unread_2;

    return {
      name: other?.name || 'Unknown',
      avatar: other?.avatar_url,
      role: other?.role,
      icon,
      badge,
      unreadCount,
      lastMessage: conv.last_message_preview,
      lastMessageAt: conv.last_message_at,
      student: conv.student,
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-8 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No conversations yet</h3>
          <p className="text-muted-foreground">
            {currentUserType === 'student'
              ? "Your conversations with tutors will appear here"
              : currentUserType === 'staff'
              ? "Conversations with students and employers will appear here"
              : "Conversations with college staff will appear here"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {/* Unread indicator */}
      {totalUnread > 0 && (
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-sm text-muted-foreground">
            {totalUnread} unread message{totalUnread > 1 ? 's' : ''}
          </span>
        </div>
      )}

      {conversations.map((conv) => {
        const display = getConversationDisplay(conv);

        return (
          <Card
            key={conv.id}
            className="cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-all touch-manipulation"
            onClick={() => onSelectConversation(conv)}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={display.avatar || undefined} />
                    <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow">
                      {display.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                    {display.icon}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <p className={`font-medium truncate ${display.unreadCount > 0 ? 'text-foreground' : ''}`}>
                        {display.name}
                      </p>
                      {display.badge}
                    </div>
                    {display.lastMessageAt && (
                      <span className="text-xs text-muted-foreground shrink-0">
                        {formatDistanceToNow(new Date(display.lastMessageAt), {
                          addSuffix: false,
                        })}
                      </span>
                    )}
                  </div>

                  {/* Role / Student context */}
                  {(display.role || display.student) && (
                    <p className="text-xs text-muted-foreground truncate">
                      {display.role}
                      {display.student && (
                        <span className="inline-flex items-center gap-1 ml-1">
                          <GraduationCap className="h-3 w-3" />
                          {display.student.first_name} {display.student.last_name}
                        </span>
                      )}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-2 mt-1">
                    <p className={`text-sm truncate ${
                      display.unreadCount > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}>
                      {display.lastMessage || 'No messages yet'}
                    </p>
                    {display.unreadCount > 0 && (
                      <Badge className="bg-elec-yellow text-black shrink-0">
                        {display.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
