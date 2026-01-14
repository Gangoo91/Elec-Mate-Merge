import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageSquare, ArrowLeft, Building2, Briefcase, Heart, Hash, GraduationCap, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Hooks
import { useConversations, useElectricianConversations } from "@/hooks/useConversations";
import { useMessages, useSendMessage, useMarkAllAsRead, useTypingIndicator } from "@/hooks/useMessages";
import { useAuth } from "@/contexts/AuthContext";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

// Team chat hooks
import { useMyTeamChannels, useTeamDMConversations, useTeamChatUnread } from "@/hooks/useTeamChat";

// College chat hooks
import { useCollegeConversations } from "@/hooks/useCollegeChat";

// Employer components
import { ConversationList } from "@/components/employer/vacancies/ConversationList";
import { MessageList } from "@/components/employer/messaging/MessageList";
import { MessageInput } from "@/components/employer/messaging/MessageInput";

// Electrician components
import { ElectricianConversationList } from "@/components/electrician/messaging/ElectricianConversationList";

// Team chat components
import { TeamChatList, TeamChatView } from "@/components/employer/team-chat";

// College chat components
import { CollegeChatList, CollegeChatView } from "@/components/college/chat";

// Peer support
import { peerConversationService, peerMessageService, PeerConversation, PeerMessage } from "@/services/peerSupportService";
import { PeerChatActions } from "@/components/mental-health/peer-support/PeerChatActions";

// Types
import type { Conversation, ElectricianConversation } from "@/services/conversationService";
import type { TeamChannel, TeamDirectMessage } from "@/services/teamChatService";
import type { CollegeConversation } from "@/services/collegeChatService";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

type ActiveConversation = Conversation | ElectricianConversation;
type ChatMode = 'job' | 'team' | 'college' | 'peer';

interface MessagesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Peer Support Conversation List Item (simplified from MessagesDropdown)
function PeerConversationListItem({
  conversation,
  currentUserId,
  onClick,
}: {
  conversation: PeerConversation;
  currentUserId: string;
  onClick: (conv: PeerConversation) => void;
}) {
  const isSupporter = conversation.supporter?.user_id === currentUserId;
  const otherName = isSupporter ? 'Anonymous Seeker' : (conversation.supporter?.display_name || 'Peer Supporter');
  const initials = otherName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const timeAgo = conversation.last_message_at
    ? formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: false })
    : null;

  return (
    <Card
      className="cursor-pointer transition-all duration-200 border-border hover:border-pink-500/50 hover:shadow-md"
      onClick={() => onClick(conversation)}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-pink-200 dark:border-pink-900">
            <AvatarImage src={conversation.supporter?.avatar_url || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-pink-500 font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold truncate text-foreground">{otherName}</h3>
              {timeAgo && (
                <span className="text-xs text-muted-foreground shrink-0">{timeAgo}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs px-2 py-0 bg-pink-500/10 text-pink-500 border-pink-500/30">
                <Heart className="h-3 w-3 mr-1" />
                {isSupporter ? 'Supporting' : 'Peer Support'}
              </Badge>
            </div>
          </div>
          <MessageSquare className="h-5 w-5 text-pink-500" />
        </div>
      </CardContent>
    </Card>
  );
}

// Peer Conversation List
function PeerConversationList({ onSelect }: { onSelect: (conv: PeerConversation) => void }) {
  const { user } = useAuth();
  const { data: conversations, isLoading } = useQuery({
    queryKey: ['peer-conversations'],
    queryFn: () => peerConversationService.getMyConversations(),
  });

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="p-4 rounded-full bg-pink-500/10 mb-4">
          <Heart className="h-10 w-10 text-pink-500" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">No Support Chats</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
          Connect with a trained peer supporter for confidential support
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {conversations.map((conv) => (
        <PeerConversationListItem
          key={conv.id}
          conversation={conv}
          currentUserId={user?.id || ''}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}

// Peer Chat View Component
function PeerChatView({
  conversation,
  currentUserId,
  onBack,
}: {
  conversation: PeerConversation;
  currentUserId: string;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<PeerMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Load messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const msgs = await peerMessageService.getMessages(conversation.id);
        setMessages(msgs);
        await peerMessageService.markAsRead(conversation.id);
      } catch (error) {
        console.error("Error loading peer messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();

    // Subscribe to new messages
    const unsubscribe = peerMessageService.subscribeToMessages(
      conversation.id,
      (newMsg) => {
        setMessages((prev) => [...prev, newMsg]);
      }
    );

    return () => unsubscribe();
  }, [conversation.id]);

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      await peerMessageService.sendMessage(conversation.id, newMessage.trim());
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-pink-500/30 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Start the conversation with a message
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.sender_id === currentUserId;
              return (
                <div
                  key={msg.id}
                  className={cn("flex", isMine ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2",
                      isMine
                        ? "bg-pink-500 text-white"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p
                      className={cn(
                        "text-[10px] mt-1",
                        isMine ? "text-pink-200" : "text-muted-foreground"
                      )}
                    >
                      {formatDistanceToNow(new Date(msg.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border shrink-0">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isSending}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim() || isSending}
            size="icon"
            className="bg-pink-500 hover:bg-pink-600 text-white shrink-0"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MessagesSheet({ open, onOpenChange }: MessagesSheetProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<ChatMode>('job');
  const [selectedConversation, setSelectedConversation] = useState<ActiveConversation | null>(null);
  const [selectedPeerConversation, setSelectedPeerConversation] = useState<PeerConversation | null>(null);
  const [selectedTeamChannel, setSelectedTeamChannel] = useState<TeamChannel | null>(null);
  const [selectedTeamDM, setSelectedTeamDM] = useState<TeamDirectMessage | null>(null);
  const [selectedCollegeConversation, setSelectedCollegeConversation] = useState<CollegeConversation | null>(null);
  const [peerMessages, setPeerMessages] = useState<PeerMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Determine context based on path
  const isEmployerContext = location.pathname.startsWith('/employer');
  const isCollegeContext = location.pathname.startsWith('/college');

  // Get electrician profile
  const { profile: elecIdProfile } = useElecIdProfile();

  // Get employer ID for team chat
  const employerId = isEmployerContext ? user?.id : undefined;

  // Conversations data
  const { data: employerConversations = [], isLoading: employerLoading, totalUnread: employerUnread } = useConversations();
  const { data: electricianConversations = [], isLoading: electricianLoading, totalUnread: electricianUnread } = useElectricianConversations(elecIdProfile?.id);
  const { data: peerConversations = [] } = useQuery({
    queryKey: ['peer-conversations'],
    queryFn: () => peerConversationService.getMyConversations(),
  });
  const teamChatUnread = useTeamChatUnread(employerId);

  // College chat - only fetch when in college context to avoid 400 errors
  const { data: collegeConversations = [], totalUnread: collegeUnread } = useCollegeConversations(isCollegeContext);

  // Calculate unreads
  const jobConversations = isEmployerContext ? employerConversations : electricianConversations;
  const jobLoading = isEmployerContext ? employerLoading : electricianLoading;
  const jobUnread = isEmployerContext ? employerUnread : electricianUnread;
  const userType = isEmployerContext ? 'employer' : 'electrician';
  const peerUnread = peerConversations?.filter(c => c.status === 'active').length || 0;
  const totalUnread = jobUnread + teamChatUnread + collegeUnread + peerUnread;

  // Messages for selected job conversation
  const { data: messages = [], isLoading: messagesLoading } = useMessages(selectedConversation?.id || '');
  const sendMessage = useSendMessage();

  // Reset state when sheet closes
  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedConversation(null);
      setSelectedPeerConversation(null);
      setSelectedTeamChannel(null);
      setSelectedTeamDM(null);
      setSelectedCollegeConversation(null);
      setPeerMessages([]);
    }
    onOpenChange(isOpen);
  };

  // Handle back to list
  const handleBack = () => {
    setSelectedConversation(null);
    setSelectedPeerConversation(null);
    setSelectedTeamChannel(null);
    setSelectedTeamDM(null);
    setSelectedCollegeConversation(null);
    setPeerMessages([]);
  };

  // Handle sending job messages
  const handleSendJobMessage = async (content: string) => {
    if (!selectedConversation || !user) return;

    // For electrician: check if they can reply
    if (!isEmployerContext && 'electrician_can_reply' in selectedConversation && !selectedConversation.electrician_can_reply) {
      toast({
        title: "Cannot Reply Yet",
        description: "Apply to a vacancy from this employer to unlock messaging.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      await sendMessage.mutateAsync({
        conversation_id: selectedConversation.id,
        sender_type: userType,
        sender_id: user.id,
        content,
        message_type: 'text',
      });
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const isInChat = selectedConversation || selectedPeerConversation || selectedTeamChannel || selectedTeamDM || selectedCollegeConversation;
  const isInTeamChat = selectedTeamChannel || selectedTeamDM;
  const isInCollegeChat = !!selectedCollegeConversation;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={cn(
          "p-0 flex flex-col bg-background",
          isMobile ? "h-[95vh] rounded-t-2xl" : "w-[420px] max-w-[420px]"
        )}
      >
        {/* List View */}
        {!isInChat ? (
          <>
            <SheetHeader className="p-4 border-b border-border shrink-0">
              <SheetTitle className="flex items-center gap-2 text-foreground">
                <MessageSquare className="h-5 w-5 text-elec-yellow" />
                Messages
                {totalUnread > 0 && (
                  <Badge className="bg-elec-yellow text-black ml-auto">
                    {totalUnread}
                  </Badge>
                )}
              </SheetTitle>
            </SheetHeader>

            {/* Tabs for different message types */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ChatMode)} className="flex-1 flex flex-col overflow-hidden">
              <TabsList className={cn("mx-4 mt-2 grid shrink-0", isEmployerContext ? "grid-cols-3" : isCollegeContext ? "grid-cols-2" : "grid-cols-2")}>
                <TabsTrigger value="job" className="gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Jobs</span>
                  {jobUnread > 0 && (
                    <Badge variant="secondary" className="h-5 w-5 p-0 text-[10px] justify-center">
                      {jobUnread}
                    </Badge>
                  )}
                </TabsTrigger>
                {isEmployerContext && (
                  <TabsTrigger value="team" className="gap-1.5">
                    <Hash className="h-4 w-4" />
                    <span className="hidden sm:inline">Team</span>
                    {teamChatUnread > 0 && (
                      <Badge variant="secondary" className="h-5 w-5 p-0 text-[10px] justify-center bg-blue-500/20 text-blue-500">
                        {teamChatUnread}
                      </Badge>
                    )}
                  </TabsTrigger>
                )}
                {isCollegeContext && (
                  <TabsTrigger value="college" className="gap-1.5">
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden sm:inline">College</span>
                    {collegeUnread > 0 && (
                      <Badge variant="secondary" className="h-5 w-5 p-0 text-[10px] justify-center bg-green-500/20 text-green-500">
                        {collegeUnread}
                      </Badge>
                    )}
                  </TabsTrigger>
                )}
                {!isCollegeContext && (
                  <TabsTrigger value="peer" className="gap-1.5">
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">Mates</span>
                    {peerUnread > 0 && (
                      <Badge variant="secondary" className="h-5 w-5 p-0 text-[10px] justify-center bg-pink-500/20 text-pink-500">
                        {peerUnread}
                      </Badge>
                    )}
                  </TabsTrigger>
                )}
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <TabsContent value="job" className="m-0 p-4">
                    {isEmployerContext ? (
                      <ConversationList
                        conversations={employerConversations}
                        isLoading={employerLoading}
                        onSelect={(conv) => setSelectedConversation(conv)}
                      />
                    ) : (
                      <ElectricianConversationList
                        conversations={electricianConversations}
                        isLoading={electricianLoading}
                        onSelect={(conv) => setSelectedConversation(conv)}
                      />
                    )}
                  </TabsContent>

                  {isEmployerContext && (
                    <TabsContent value="team" className="m-0">
                      <TeamChatList
                        employerId={employerId || ''}
                        onSelectChannel={setSelectedTeamChannel}
                        onSelectDM={setSelectedTeamDM}
                      />
                    </TabsContent>
                  )}

                  {isCollegeContext && (
                    <TabsContent value="college" className="m-0">
                      <CollegeChatList
                        conversations={collegeConversations}
                        onSelect={setSelectedCollegeConversation}
                        userType="staff"
                      />
                    </TabsContent>
                  )}

                  {!isCollegeContext && (
                    <TabsContent value="peer" className="m-0">
                      <PeerConversationList onSelect={setSelectedPeerConversation} />
                    </TabsContent>
                  )}
                </ScrollArea>
              </div>
            </Tabs>
          </>
        ) : (
          // Chat View
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b border-border shrink-0">
              <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {selectedConversation && ('company_name' in selectedConversation ? selectedConversation.company_name : selectedConversation.vacancy_title)}
                  {selectedTeamChannel && `#${selectedTeamChannel.name}`}
                  {selectedTeamDM && 'Direct Message'}
                  {selectedCollegeConversation && selectedCollegeConversation.title}
                  {selectedPeerConversation && (
                    selectedPeerConversation.supporter?.user_id === user?.id
                      ? 'Anonymous Seeker'
                      : (selectedPeerConversation.supporter?.display_name || 'Peer Supporter')
                  )}
                </h3>
              </div>
              {/* Peer Chat Actions */}
              {selectedPeerConversation && (
                <PeerChatActions
                  otherUserId={
                    selectedPeerConversation.supporter?.user_id === user?.id
                      ? selectedPeerConversation.seeker_id
                      : (selectedPeerConversation.supporter?.user_id || '')
                  }
                  otherUserName={
                    selectedPeerConversation.supporter?.user_id === user?.id
                      ? 'Anonymous Seeker'
                      : (selectedPeerConversation.supporter?.display_name || 'Peer Supporter')
                  }
                  conversationId={selectedPeerConversation.id}
                  onBlocked={() => {
                    handleBack();
                    queryClient.invalidateQueries({ queryKey: ['peer-conversations'] });
                  }}
                />
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              {isInTeamChat && (
                <TeamChatView
                  channel={selectedTeamChannel}
                  directMessage={selectedTeamDM}
                  employerId={employerId || ''}
                  onBack={handleBack}
                />
              )}
              {isInCollegeChat && selectedCollegeConversation && (
                <CollegeChatView
                  conversation={selectedCollegeConversation}
                  userType="staff"
                  onBack={handleBack}
                />
              )}
              {selectedConversation && (
                <div className="flex flex-col h-full">
                  <ScrollArea className="flex-1 p-4">
                    <MessageList
                      messages={messages}
                      isLoading={messagesLoading}
                      currentUserId={user?.id || ''}
                    />
                  </ScrollArea>
                  <div className="p-4 border-t border-border shrink-0">
                    <MessageInput
                      onSend={handleSendJobMessage}
                      isSending={isSending}
                      disabled={!isEmployerContext && 'electrician_can_reply' in selectedConversation && !selectedConversation.electrician_can_reply}
                    />
                  </div>
                </div>
              )}
              {/* Peer Chat View */}
              {selectedPeerConversation && (
                <PeerChatView
                  conversation={selectedPeerConversation}
                  currentUserId={user?.id || ''}
                  onBack={handleBack}
                />
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
