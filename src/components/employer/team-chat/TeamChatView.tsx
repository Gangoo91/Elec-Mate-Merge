import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Hash,
  MoreVertical,
  Send,
  Loader2,
  Users,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useChannelMessages,
  useSendChannelMessage,
  useChannelMembers,
  useTeamDMMessages,
  useSendTeamDM,
  useMarkTeamDMAsRead,
} from "@/hooks/useTeamChat";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import type { TeamChannel, TeamDirectMessage } from "@/services/teamChatService";

interface TeamChatViewProps {
  channel?: TeamChannel | null;
  dmConversation?: TeamDirectMessage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeamChatView({
  channel,
  dmConversation,
  open,
  onOpenChange,
}: TeamChatViewProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Channel messages
  const {
    data: channelMessages = [],
    isLoading: channelMessagesLoading,
  } = useChannelMessages(channel?.id);

  // DM messages
  const {
    data: dmMessages = [],
    isLoading: dmMessagesLoading,
  } = useTeamDMMessages(dmConversation?.id);

  // Channel members
  const { data: members = [] } = useChannelMembers(channel?.id);

  // Mutations
  const sendChannelMessage = useSendChannelMessage();
  const sendDM = useSendTeamDM();
  const markDMRead = useMarkTeamDMAsRead();

  // Determine which mode we're in
  const isChannelMode = !!channel;
  const messages = isChannelMode ? channelMessages : dmMessages;
  const isLoading = isChannelMode ? channelMessagesLoading : dmMessagesLoading;

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark DM as read when opened
  useEffect(() => {
    if (open && dmConversation && user) {
      markDMRead.mutate(dmConversation.id);
    }
  }, [open, dmConversation?.id]);

  const handleSend = async () => {
    if (!message.trim() || !user) return;

    try {
      if (isChannelMode && channel) {
        await sendChannelMessage.mutateAsync({
          channelId: channel.id,
          content: message.trim(),
        });
      } else if (dmConversation) {
        await sendDM.mutateAsync({
          conversationId: dmConversation.id,
          content: message.trim(),
        });
      }
      setMessage("");
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Get header info
  const getHeaderInfo = () => {
    if (isChannelMode && channel) {
      return {
        name: channel.name,
        subtitle: channel.description || `${members.length} members`,
        icon: <Hash className="h-5 w-5 text-muted-foreground" />,
        avatar: null,
      };
    }
    if (dmConversation) {
      // Get the other user's info
      const otherUserId = dmConversation.user_1_id === user?.id
        ? dmConversation.user_2_id
        : dmConversation.user_1_id;
      return {
        name: 'Team Member', // Would need to fetch user details
        subtitle: 'Direct Message',
        icon: null,
        avatar: otherUserId,
      };
    }
    return { name: '', subtitle: '', icon: null, avatar: null };
  };

  const headerInfo = getHeaderInfo();
  const isSending = sendChannelMessage.isPending || sendDM.isPending;

  if (!channel && !dmConversation) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[95vh] rounded-t-2xl p-0 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {headerInfo.icon ? (
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              {headerInfo.icon}
            </div>
          ) : (
            <Avatar className="h-10 w-10">
              <AvatarImage src={undefined} />
              <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow">
                {headerInfo.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{headerInfo.name}</p>
            <p className="text-sm text-muted-foreground truncate">
              {headerInfo.subtitle}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isChannelMode && (
                <>
                  <DropdownMenuItem>
                    <Users className="h-4 w-4 mr-2" />
                    View Members
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Channel Settings
                  </DropdownMenuItem>
                </>
              )}
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
              <div className="flex justify-end">
                <Skeleton className="h-20 w-3/4 rounded-2xl" />
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-muted-foreground">No messages yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Be the first to say something!
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg: any) => {
              const isOwn = msg.sender_id === user?.id;

              return (
                <div
                  key={msg.id}
                  className={`flex mb-3 ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  {!isOwn && (
                    <Avatar className="h-8 w-8 mr-2 shrink-0">
                      <AvatarFallback className="text-xs bg-muted">
                        {msg.sender_id.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                      isOwn
                        ? 'bg-elec-yellow text-black rounded-br-md'
                        : 'bg-muted rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                    <p className={`text-[10px] mt-1 ${
                      isOwn ? 'text-black/60' : 'text-muted-foreground'
                    }`}>
                      {new Date(msg.sent_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

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
          >
            {isSending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
