import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageSquare, ArrowLeft, Lock, Building2, Briefcase, Heart, Users, Hash, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Hooks
import { useConversations, useElectricianConversations } from "@/hooks/useConversations";
import { useMessages, useSendMessage, useMarkAllAsRead, useTypingIndicator } from "@/hooks/useMessages";
import { useArchiveConversation } from "@/hooks/useConversations";
import { useAuth } from "@/contexts/AuthContext";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

// Team chat hooks
import { useMyTeamChannels, useTeamDMConversations, useTeamChatUnread } from "@/hooks/useTeamChat";

// College chat hooks
import { useCollegeConversations, useCollegeChatStats } from "@/hooks/useCollegeChat";

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
import { PeerConversation, peerConversationService } from "@/services/peerSupportService";
import { usePeerConversations, usePeerMessages, useSendPeerMessage, useMarkPeerMessagesAsRead, usePeerTyping, usePeerPresence } from "@/hooks/usePeerChat";
import { ReadReceipt, getReceiptStatus, TypingIndicatorWithName } from "@/components/messaging/ReadReceipt";
import { PresenceIndicator } from "@/components/messaging/PresenceIndicator";
import { calculateStatus } from "@/services/presenceService";

// Types
import type { Conversation, ElectricianConversation } from "@/services/conversationService";
import type { TeamChannel, TeamDirectMessage } from "@/services/teamChatService";
import type { CollegeConversation } from "@/services/collegeChatService";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

type ActiveConversation = Conversation | ElectricianConversation;
type ChatMode = 'job' | 'team' | 'college' | 'peer';

// Peer Support Conversation List Item
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
  const otherName = isSupporter
    ? ((conversation as any).seeker?.full_name?.split(' ')[0] || 'Mate')
    : (conversation.supporter?.display_name || 'Peer Supporter');
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
              {conversation.status === 'ended' && (
                <Badge variant="outline" className="text-xs">Ended</Badge>
              )}
            </div>
          </div>

          <MessageSquare className="h-5 w-5 text-pink-500" />
        </div>
      </CardContent>
    </Card>
  );
}

// Peer Support Conversation List
function PeerConversationList({
  onSelect,
  onFindSupporter,
}: {
  onSelect: (conv: PeerConversation) => void;
  onFindSupporter?: () => void;
}) {
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
        {onFindSupporter && (
          <Button onClick={onFindSupporter} className="gap-2 bg-pink-500 hover:bg-pink-600">
            <Users className="h-4 w-4" />
            Find a Supporter
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="p-3 space-y-2">
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

export function MessagesDropdown() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ChatMode>('job');
  const [selectedConversation, setSelectedConversation] = useState<ActiveConversation | null>(null);
  const [selectedPeerConversation, setSelectedPeerConversation] = useState<PeerConversation | null>(null);
  const [selectedTeamChannel, setSelectedTeamChannel] = useState<TeamChannel | null>(null);
  const [selectedTeamDM, setSelectedTeamDM] = useState<TeamDirectMessage | null>(null);
  const [selectedCollegeConversation, setSelectedCollegeConversation] = useState<CollegeConversation | null>(null);
  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Determine context based on path
  const isEmployerContext = location.pathname.startsWith('/employer');
  const isCollegeContext = location.pathname.startsWith('/college');

  // Get electrician profile (for electrician view)
  const { profile: elecIdProfile } = useElecIdProfile();

  // Get employer ID for team chat (if in employer context)
  // In a real app, you'd get this from the user's employer association
  const employerId = isEmployerContext ? user?.id : undefined;

  // Employer conversations
  const {
    data: employerConversations = [],
    isLoading: employerLoading,
    totalUnread: employerUnread
  } = useConversations();

  // Electrician conversations
  const {
    data: electricianConversations = [],
    isLoading: electricianLoading,
    totalUnread: electricianUnread
  } = useElectricianConversations(elecIdProfile?.id);

  // Peer support conversations - using centralised hook
  const { data: peerConversations = [] } = usePeerConversations();

  // Team chat (for employer context)
  const teamChatUnread = useTeamChatUnread(employerId);

  // College chat - only fetch when in college context to avoid 400 errors
  const { data: collegeConversations = [], totalUnread: collegeUnread } = useCollegeConversations(isCollegeContext);

  // Determine college user type
  const collegeUserType: 'student' | 'staff' | 'employer' = isCollegeContext
    ? 'staff' // Simplified - would need to determine from user profile
    : 'student';

  // Determine which job data to use based on context
  const jobConversations = isEmployerContext ? employerConversations : electricianConversations;
  const jobLoading = isEmployerContext ? employerLoading : electricianLoading;
  const jobUnread = isEmployerContext ? employerUnread : electricianUnread;
  const userType = isEmployerContext ? 'employer' : 'electrician';

  // Total unread across all message types
  const peerUnread = peerConversations?.filter(c => c.status === 'active').length || 0;
  const totalUnread = jobUnread + teamChatUnread + collegeUnread + peerUnread;

  // Messages for selected job conversation
  const { data: messages = [], isLoading: messagesLoading } = useMessages(
    selectedConversation?.id || ''
  );

  // Peer messages - using centralised hook (shared cache with PeerSupportHub)
  const { data: peerMessages = [] } = usePeerMessages(selectedPeerConversation?.id);
  const sendPeerMessage = useSendPeerMessage();
  const markPeerAsRead = useMarkPeerMessagesAsRead();

  // Peer typing indicator
  const peerPartnerName = selectedPeerConversation
    ? (selectedPeerConversation.supporter?.user_id === user?.id
        ? ((selectedPeerConversation as any).seeker?.full_name?.split(' ')[0] || 'Mate')
        : (selectedPeerConversation.supporter?.display_name || 'Peer Supporter'))
    : '';
  const { isOtherTyping: isPeerTyping, setTyping: setPeerTyping } = usePeerTyping(selectedPeerConversation?.id);

  // Peer presence - get partner's user ID
  const peerPartnerId = selectedPeerConversation
    ? (selectedPeerConversation.supporter?.user_id === user?.id
        ? (selectedPeerConversation as any).seeker_id
        : selectedPeerConversation.supporter?.user_id)
    : undefined;
  const { data: peerPresence } = usePeerPresence(peerPartnerId);
  const peerPresenceStatus = peerPresence ? calculateStatus(peerPresence.last_seen) : 'offline';

  // Mutations for job messages
  const sendMessage = useSendMessage();
  const archiveConversation = useArchiveConversation();
  const markAllAsRead = useMarkAllAsRead();

  // Typing indicator
  const { setTyping, isOtherTyping } = useTypingIndicator(
    selectedConversation?.id || '',
    user?.id || '',
    userType
  );

  // Mark messages as read when conversation is selected
  useEffect(() => {
    if (selectedConversation && user) {
      markAllAsRead.mutate({
        conversationId: selectedConversation.id,
        userType,
      });
    }
  }, [selectedConversation?.id, user?.id, userType]);

  // Mark peer messages as read
  useEffect(() => {
    if (selectedPeerConversation) {
      markPeerAsRead.mutate(selectedPeerConversation.id);
    }
  }, [selectedPeerConversation?.id]);

  const handleSelectJobConversation = (conversation: ActiveConversation) => {
    setSelectedConversation(conversation);
    setSelectedPeerConversation(null);
    setSelectedTeamChannel(null);
    setSelectedTeamDM(null);
    setSelectedCollegeConversation(null);
  };

  const handleSelectPeerConversation = (conversation: PeerConversation) => {
    setSelectedPeerConversation(conversation);
    setSelectedConversation(null);
    setSelectedTeamChannel(null);
    setSelectedTeamDM(null);
    setSelectedCollegeConversation(null);
  };

  const handleSelectTeamChannel = (channel: TeamChannel) => {
    setSelectedTeamChannel(channel);
    setSelectedTeamDM(null);
    setSelectedConversation(null);
    setSelectedPeerConversation(null);
    setSelectedCollegeConversation(null);
  };

  const handleSelectTeamDM = (dm: TeamDirectMessage) => {
    setSelectedTeamDM(dm);
    setSelectedTeamChannel(null);
    setSelectedConversation(null);
    setSelectedPeerConversation(null);
    setSelectedCollegeConversation(null);
  };

  const handleSelectCollegeConversation = (conversation: CollegeConversation) => {
    setSelectedCollegeConversation(conversation);
    setSelectedConversation(null);
    setSelectedPeerConversation(null);
    setSelectedTeamChannel(null);
    setSelectedTeamDM(null);
  };

  const handleBack = () => {
    setSelectedConversation(null);
    setSelectedPeerConversation(null);
    setSelectedTeamChannel(null);
    setSelectedTeamDM(null);
    setSelectedCollegeConversation(null);
  };

  const handleClose = () => {
    setSheetOpen(false);
    setTimeout(() => {
      setSelectedConversation(null);
      setSelectedPeerConversation(null);
      setSelectedTeamChannel(null);
      setSelectedTeamDM(null);
      setSelectedCollegeConversation(null);
    }, 300);
  };

  const handleSendJobMessage = async (content: string) => {
    if (!selectedConversation || !user) return;

    // For electrician: check if they can reply
    if (!isEmployerContext && !selectedConversation.electrician_can_reply) {
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

  const handleSendPeerMessage = async (content: string) => {
    if (!selectedPeerConversation) return;

    sendPeerMessage.mutate(
      { conversationId: selectedPeerConversation.id, content },
      {
        onError: () => {
          toast({
            title: "Failed to Send",
            description: "Your message couldn't be sent. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleFindSupporter = () => {
    handleClose();
    navigate('/electrician/mental-health');
  };

  // Get conversation display info
  const getJobConversationInfo = () => {
    if (!selectedConversation) return { name: '', subtitle: '', canReply: true };

    if (isEmployerContext) {
      const conv = selectedConversation as Conversation;
      return {
        name: conv.electrician_profile?.employee?.name || 'Unknown',
        subtitle: conv.vacancy?.title ? `Re: ${conv.vacancy.title}` : undefined,
        tier: conv.electrician_profile?.verification_tier,
        canReply: true,
      };
    } else {
      const conv = selectedConversation as ElectricianConversation;
      return {
        name: conv.employer?.company_name || 'Unknown Company',
        subtitle: conv.vacancy?.title ? `Re: ${conv.vacancy.title}` : conv.employer?.contact_name,
        canReply: conv.electrician_can_reply,
      };
    }
  };

  const getPeerConversationInfo = () => {
    if (!selectedPeerConversation) return { name: '', isSupporter: false };
    const isSupporter = selectedPeerConversation.supporter?.user_id === user?.id;
    const seekerName = (selectedPeerConversation as any).seeker?.full_name?.split(' ')[0];
    return {
      name: isSupporter ? (seekerName || 'Mate') : (selectedPeerConversation.supporter?.display_name || 'Peer Supporter'),
      isSupporter,
    };
  };

  const jobInfo = getJobConversationInfo();
  const peerInfo = getPeerConversationInfo();
  const isInChat = selectedConversation || selectedPeerConversation || selectedTeamChannel || selectedTeamDM || selectedCollegeConversation;
  const isInTeamChat = selectedTeamChannel || selectedTeamDM;
  const isInCollegeChat = !!selectedCollegeConversation;

  return (
    <>
      {/* Messages Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSheetOpen(true)}
        className={cn(
          "relative h-10 w-10 hover:bg-white/10 touch-target mobile-tap-highlight rounded-xl",
          totalUnread > 0 && "text-elec-yellow"
        )}
        aria-label={`Messages${totalUnread > 0 ? ` (${totalUnread} unread)` : ''}`}
      >
        <MessageSquare className="h-5 w-5" />
        {totalUnread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-elec-yellow text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
            {totalUnread > 99 ? '99+' : totalUnread}
          </span>
        )}
      </Button>

      {/* Messages Sheet */}
      <Sheet open={sheetOpen} onOpenChange={handleClose}>
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
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ChatMode)} className="flex-1 flex flex-col">
                <TabsList className={cn("mx-4 mt-2 grid", isEmployerContext ? "grid-cols-3" : isCollegeContext ? "grid-cols-2" : "grid-cols-2")}>
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

                <TabsContent value="job" className="flex-1 overflow-y-auto pb-safe m-0">
                  <p className="text-xs text-muted-foreground flex items-center gap-1 px-4 py-2">
                    {isEmployerContext ? (
                      <><Building2 className="h-3 w-3" /> Employer messages</>
                    ) : (
                      <><Briefcase className="h-3 w-3" /> Job opportunities</>
                    )}
                  </p>
                  {isEmployerContext ? (
                    <ConversationList
                      conversations={jobConversations as Conversation[]}
                      isLoading={jobLoading}
                      onSelect={handleSelectJobConversation}
                      emptyMessage="No messages yet"
                    />
                  ) : (
                    <ElectricianConversationList
                      conversations={jobConversations as ElectricianConversation[]}
                      isLoading={jobLoading}
                      onSelect={handleSelectJobConversation}
                      emptyMessage="No messages from employers yet"
                    />
                  )}
                </TabsContent>

                {/* Team Chat Tab (Employer only) */}
                {isEmployerContext && (
                  <TabsContent value="team" className="flex-1 overflow-y-auto pb-safe m-0">
                    <p className="text-xs text-muted-foreground flex items-center gap-1 px-4 py-2">
                      <Hash className="h-3 w-3 text-blue-500" /> Team channels and DMs
                    </p>
                    <div className="px-4">
                      <TeamChatList
                        employerId={employerId || ''}
                        onSelectChannel={handleSelectTeamChannel}
                        onSelectDM={handleSelectTeamDM}
                      />
                    </div>
                  </TabsContent>
                )}

                {/* College Chat Tab */}
                {isCollegeContext && (
                  <TabsContent value="college" className="flex-1 overflow-y-auto pb-safe m-0">
                    <p className="text-xs text-muted-foreground flex items-center gap-1 px-4 py-2">
                      <GraduationCap className="h-3 w-3 text-green-500" /> College conversations
                    </p>
                    <div className="px-4">
                      <CollegeChatList
                        onSelectConversation={handleSelectCollegeConversation}
                        currentUserType={collegeUserType}
                      />
                    </div>
                  </TabsContent>
                )}

                {/* Peer Support Tab (not in college context) */}
                {!isCollegeContext && (
                  <TabsContent value="peer" className="flex-1 overflow-y-auto pb-safe m-0">
                    <p className="text-xs text-muted-foreground flex items-center gap-1 px-4 py-2">
                      <Heart className="h-3 w-3 text-pink-500" /> Mental Health Mates
                    </p>
                    <PeerConversationList
                      onSelect={handleSelectPeerConversation}
                      onFindSupporter={handleFindSupporter}
                    />
                  </TabsContent>
                )}
              </Tabs>
            </>
          ) : selectedConversation ? (
            /* Job Chat View */
            <>
              <div className="flex items-center gap-3 p-4 border-b border-border bg-background shrink-0">
                <Button variant="ghost" size="icon" onClick={handleBack} className="shrink-0 -ml-2 h-9 w-9">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-foreground truncate">{jobInfo.name}</h2>
                    {!jobInfo.canReply && <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
                  </div>
                  {jobInfo.subtitle && <p className="text-xs text-muted-foreground truncate">{jobInfo.subtitle}</p>}
                </div>
                {isEmployerContext && jobInfo.tier && jobInfo.tier !== 'basic' && (
                  <Badge variant="outline" className={cn("shrink-0 text-xs", jobInfo.tier === 'premium' ? "bg-yellow-100 dark:bg-yellow-900/30 text-elec-yellow border-0" : "bg-blue-100 dark:bg-blue-900/30 text-blue-500 border-0")}>
                    {jobInfo.tier.charAt(0).toUpperCase() + jobInfo.tier.slice(1)}
                  </Badge>
                )}
              </div>

              {!jobInfo.canReply && (
                <div className="mx-4 mt-2 shrink-0">
                  <Card className="bg-amber-500/10 border-amber-500/30">
                    <CardContent className="p-3 flex items-start gap-2">
                      <Lock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-amber-600 dark:text-amber-400">Replies Locked</p>
                        <p className="text-muted-foreground text-xs mt-0.5">Apply to a vacancy from this employer to unlock replies.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <MessageList messages={messages} currentUserId={user?.id || ''} isLoading={messagesLoading} isTyping={isOtherTyping} />

              <div className="shrink-0 pb-safe">
                <MessageInput
                  onSend={handleSendJobMessage}
                  onTyping={setTyping}
                  isSending={isSending}
                  disabled={!isEmployerContext && !jobInfo.canReply}
                  placeholder={!isEmployerContext && !jobInfo.canReply ? "Apply to unlock replies" : "Type a message..."}
                />
              </div>
            </>
          ) : selectedPeerConversation ? (
            /* Peer Support Chat View */
            <>
              <div className="flex items-center gap-3 p-4 border-b border-border bg-background shrink-0">
                <Button variant="ghost" size="icon" onClick={handleBack} className="shrink-0 -ml-2 h-9 w-9">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10 border-2 border-pink-200 dark:border-pink-900">
                  <AvatarImage src={selectedPeerConversation.supporter?.avatar_url || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-pink-500 font-semibold">
                    {peerInfo.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-foreground truncate">{peerInfo.name}</h2>
                    <PresenceIndicator status={peerPresenceStatus} lastSeen={peerPresence?.last_seen} size="sm" />
                  </div>
                  <p className="text-xs text-pink-500 flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {peerInfo.isSupporter ? 'You are supporting' : 'Peer Support Chat'}
                  </p>
                </div>
              </div>

              {/* Peer Messages with read receipts */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {peerMessages.length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    Start the conversation with a warm greeting
                  </div>
                ) : (
                  peerMessages.map((msg) => {
                    const isOwn = msg.sender_id === user?.id;
                    const isOptimistic = msg.id.startsWith('temp-');
                    return (
                      <div key={msg.id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
                        <div className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2",
                          isOwn
                            ? "bg-pink-500 text-white rounded-br-sm"
                            : "bg-muted rounded-bl-sm"
                        )}>
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          <div className={cn("flex items-center gap-1 mt-1", isOwn ? "justify-end" : "")}>
                            <span className={cn("text-[10px]", isOwn ? "text-pink-100" : "text-muted-foreground")}>
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {isOwn && (
                              <ReadReceipt
                                status={getReceiptStatus(
                                  msg.created_at,
                                  (msg as any).delivered_at,
                                  (msg as any).read_at,
                                  isOptimistic
                                )}
                                className={isOptimistic ? "text-pink-200" : "text-pink-100"}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                {/* Typing indicator */}
                {isPeerTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2">
                      <TypingIndicatorWithName userName={peerPartnerName} className="text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>

              <div className="shrink-0 pb-safe">
                <MessageInput
                  onSend={handleSendPeerMessage}
                  onTyping={(isTyping) => setPeerTyping(isTyping, peerInfo.name)}
                  isSending={sendPeerMessage.isPending}
                  placeholder="Type a supportive message..."
                />
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>

      {/* Team Chat View (rendered as separate sheet) */}
      {isInTeamChat && (
        <TeamChatView
          channel={selectedTeamChannel}
          dmConversation={selectedTeamDM}
          open={true}
          onOpenChange={(open) => {
            if (!open) handleBack();
          }}
        />
      )}

      {/* College Chat View (rendered as separate sheet) */}
      {isInCollegeChat && (
        <CollegeChatView
          conversation={selectedCollegeConversation}
          open={true}
          onOpenChange={(open) => {
            if (!open) handleBack();
          }}
          currentUserType={collegeUserType}
        />
      )}
    </>
  );
}
