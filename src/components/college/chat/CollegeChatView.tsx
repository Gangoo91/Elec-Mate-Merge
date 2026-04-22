import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Pill } from '@/components/college/primitives';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  useCollegeMessages,
  useSendCollegeMessage,
  useMarkCollegeMessagesAsRead,
} from '@/hooks/useCollegeChat';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { CollegeConversation, CollegeMessage } from '@/services/collegeChatService';

interface CollegeChatViewProps {
  conversation: CollegeConversation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUserType: 'student' | 'staff' | 'employer';
}

export function CollegeChatView({
  conversation,
  open,
  onOpenChange,
  currentUserType,
}: CollegeChatViewProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isConfidential, setIsConfidential] = useState(false);
  const [visibleToStudent, setVisibleToStudent] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch messages
  const { data: messages = [], isLoading } = useCollegeMessages(conversation?.id);

  // Mutations
  const sendMessage = useSendCollegeMessage();
  const markAsRead = useMarkCollegeMessagesAsRead();

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark as read when opened
  useEffect(() => {
    if (open && conversation && user) {
      markAsRead.mutate(conversation.id);
    }
  }, [open, conversation?.id]);

  const handleSend = async () => {
    if (!message.trim() || !user || !conversation) return;

    try {
      await sendMessage.mutateAsync({
        conversation_id: conversation.id,
        content: message.trim(),
        message_type: 'text',
        is_confidential: isConfidential,
        visible_to_student: visibleToStudent,
      });
      setMessage('');
      setIsConfidential(false);
    } catch (error) {
      toast({
        title: 'Failed to Send',
        description: "Your message couldn't be sent. Please try again.",
        variant: 'destructive',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Get conversation type info
  const getConversationInfo = () => {
    if (!conversation) return { name: '', subtitle: '', icon: null };

    const type = conversation.conversation_type;
    const otherParticipant = conversation.other_participant;

    if (type === 'student_tutor') {
      if (currentUserType === 'student') {
        return {
          name: otherParticipant?.name || 'Tutor',
          subtitle: otherParticipant?.role || 'College Staff',
          icon: null,
        };
      } else {
        return {
          name: otherParticipant?.name || 'Student',
          subtitle: 'Student',
          icon: null,
        };
      }
    }

    if (type === 'college_employer') {
      if (currentUserType === 'employer') {
        return {
          name: otherParticipant?.name || 'College Staff',
          subtitle: otherParticipant?.role || 'Staff Member',
          icon: null,
        };
      } else {
        return {
          name: otherParticipant?.name || 'Employer',
          subtitle: 'Employer',
          icon: null,
        };
      }
    }

    return {
      name: otherParticipant?.name || 'Unknown',
      subtitle: '',
      icon: null,
    };
  };

  const info = getConversationInfo();
  const isSending = sendMessage.isPending;

  // Can send confidential messages (staff only)
  const canSendConfidential = currentUserType === 'staff';

  // Show student visibility toggle (for college-employer conversations about a student)
  const showStudentVisibility =
    conversation?.conversation_type === 'college_employer' &&
    conversation?.student_id &&
    currentUserType !== 'student';

  if (!conversation) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] rounded-t-2xl p-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} aria-label="Back">
            <span className="text-[18px]">‹</span>
          </Button>

          <Avatar className="h-10 w-10">
            <AvatarImage src={conversation.other_participant?.avatar_url || undefined} />
            <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow">
              {info.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold truncate">{info.name}</p>
            </div>
            <p className="text-sm text-muted-foreground truncate">{info.subtitle}</p>
          </div>

          {/* Student context badge */}
          {conversation.student && (
            <Pill tone="yellow" className="shrink-0">
              {conversation.student.first_name} {conversation.student.last_name}
            </Pill>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="More options">
                <span className="text-[18px] leading-none">⋯</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              {conversation.student && <DropdownMenuItem>View Student Progress</DropdownMenuItem>}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Archive Conversation</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Skeleton className="h-16 w-3/4 rounded-2xl" />
              </div>
              <div className="flex justify-start">
                <Skeleton className="h-12 w-2/3 rounded-2xl" />
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-muted-foreground">No messages yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Send a message to start the conversation
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg: CollegeMessage) => {
              const isOwn = msg.sender_id === user?.id;

              // Progress update message
              if (msg.message_type === 'progress_update') {
                const metadata = msg.metadata as any;
                return (
                  <div key={msg.id} className="flex justify-center my-4">
                    <div className="bg-muted rounded-lg px-4 py-3 max-w-[80%]">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                        Progress Update
                      </div>
                      <p className="text-sm mt-1">{metadata?.title || msg.content}</p>
                      {metadata?.details && (
                        <p className="text-xs text-muted-foreground mt-1">{metadata.details}</p>
                      )}
                      {metadata?.score !== undefined && (
                        <Pill tone="yellow" className="mt-2">
                          {metadata.score}%
                        </Pill>
                      )}
                    </div>
                  </div>
                );
              }

              // System message
              if (msg.message_type === 'system') {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {msg.content}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex mb-3 ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  {!isOwn && (
                    <Avatar className="h-8 w-8 mr-2 shrink-0">
                      <AvatarFallback className="text-xs bg-muted">
                        {msg.sender?.name?.slice(0, 2).toUpperCase() || '??'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="max-w-[75%]">
                    {/* Confidential indicator */}
                    {msg.is_confidential && (
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-500 mb-1">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                        Confidential
                      </div>
                    )}
                    {/* Not visible to student indicator */}
                    {!msg.visible_to_student && currentUserType !== 'student' && (
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-1">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/30" />
                        Hidden from student
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2.5 ${
                        isOwn ? 'bg-elec-yellow text-black rounded-br-md' : 'bg-muted rounded-bl-md'
                      } ${msg.is_confidential ? 'border-2 border-amber-500/50' : ''}`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          isOwn ? 'text-black/60' : 'text-muted-foreground'
                        }`}
                      >
                        {new Date(msg.sent_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Message Options (for staff) */}
        {(canSendConfidential || showStudentVisibility) && (
          <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center gap-4 flex-wrap">
            {canSendConfidential && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="confidential"
                  checked={isConfidential}
                  onCheckedChange={(checked) => setIsConfidential(checked as boolean)}
                />
                <Label htmlFor="confidential" className="text-xs cursor-pointer">
                  Confidential
                </Label>
              </div>
            )}
            {showStudentVisibility && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="visible-student"
                  checked={visibleToStudent}
                  onCheckedChange={(checked) => setVisibleToStudent(checked as boolean)}
                />
                <Label htmlFor="visible-student" className="text-xs cursor-pointer">
                  Visible to student
                </Label>
              </div>
            )}
          </div>
        )}

        {/* Input */}
        <div className="flex items-end gap-2 p-3 border-t border-border bg-background">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={isSending}
            className="flex-1 h-11 bg-muted border-border"
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            size="icon"
            className="h-11 w-11 shrink-0 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
            aria-label="Send message"
          >
            <span className="text-[16px] font-semibold">→</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
