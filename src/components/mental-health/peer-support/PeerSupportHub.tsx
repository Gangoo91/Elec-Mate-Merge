import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Users,
  Heart,
  MessageCircle,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Plus,
  Send,
} from 'lucide-react';
import {
  PeerSupporter,
  PeerConversation,
  peerSupporterService,
} from '@/services/peerSupportService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  usePeerConversations,
  usePeerMessages,
  useSendPeerMessage,
  useMarkPeerMessagesAsRead,
  usePeerTyping,
  usePeerPresence,
  usePeerSupporterProfile,
} from '@/hooks/usePeerChat';
import { ReadReceipt, getReceiptStatus, TypingIndicatorWithName } from '@/components/messaging/ReadReceipt';
import { PresenceIndicator } from '@/components/messaging/PresenceIndicator';
import { calculateStatus } from '@/services/presenceService';
import AvailableSupporters from './AvailableSupporters';
import SupporterDashboard from './SupporterDashboard';
import BecomeSupporter from './BecomeSupporter';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface PeerSupportHubProps {
  onClose?: () => void;
}

type ViewState = 'hub' | 'become-supporter' | 'chat';

// Skeleton for conversation items
const ConversationSkeleton = () => (
  <div className="space-y-3 pb-4">
    {[1, 2].map((i) => (
      <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-purple-500/20">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-xl bg-white/10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32 bg-white/10" />
            <Skeleton className="h-3 w-24 bg-white/10" />
          </div>
          <Skeleton className="h-10 w-16 rounded-md bg-white/10" />
        </div>
      </div>
    ))}
  </div>
);

const PeerSupportHub: React.FC<PeerSupportHubProps> = ({ onClose }) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const [viewState, setViewState] = useState<ViewState>('hub');
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('browse');

  // Chat sheet state
  const [selectedConversation, setSelectedConversation] = useState<PeerConversation | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Use centralised hooks for conversations, messages, and profile (all cached)
  const { data: conversations = [], isLoading: conversationsLoading, isError: conversationsError, error: conversationsErrorDetails, refetch: refetchConversations } = usePeerConversations();
  const { data: myProfile, refetch: refetchProfile } = usePeerSupporterProfile();
  const { data: chatMessages = [], isLoading: messagesLoading } = usePeerMessages(selectedConversation?.id);
  const sendMessage = useSendPeerMessage();
  const markAsRead = useMarkPeerMessagesAsRead();

  // Typing indicator
  const { isOtherTyping, setTyping } = usePeerTyping(selectedConversation?.id);

  // Presence - get partner's user ID
  const partnerId = selectedConversation
    ? (selectedConversation.supporter?.user_id === user?.id
        ? (selectedConversation as any).seeker_id
        : selectedConversation.supporter?.user_id)
    : undefined;
  const { data: partnerPresence } = usePeerPresence(partnerId);
  const partnerPresenceStatus = partnerPresence ? calculateStatus(partnerPresence.last_seen) : 'offline';

  const handleConnect = async (supporterId: string) => {
    setConnectingId(supporterId);
    try {
      const { peerConversationService } = await import('@/services/peerSupportService');
      await peerConversationService.startConversation(supporterId);
      toast({
        title: "Connected!",
        description: "You can now start chatting. Be kind to each other.",
      });
      refetchConversations();
      setActiveTab('chats');
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        title: "Connection failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setConnectingId(null);
    }
  };

  const handleProfileUpdated = () => {
    refetchProfile();
    refetchConversations();
  };

  // Open chat with a conversation - messages are loaded automatically by usePeerMessages hook
  const handleOpenChat = (conversation: PeerConversation) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
    // Mark as read when opening
    markAsRead.mutate(conversation.id);
  };

  // Send a message using the centralised hook
  const handleSendMessage = () => {
    if (!selectedConversation || !messageInput.trim() || sendMessage.isPending) return;

    sendMessage.mutate(
      { conversationId: selectedConversation.id, content: messageInput.trim() },
      {
        onSuccess: () => {
          setMessageInput('');
        },
        onError: () => {
          toast({
            title: "Failed to send",
            description: "Please try again",
            variant: "destructive",
          });
        },
      }
    );
  };

  // Close chat
  const handleCloseChat = () => {
    setIsChatOpen(false);
    setTimeout(() => {
      setSelectedConversation(null);
    }, 300);
  };

  // Get other person's name in conversation
  const getChatPartnerName = () => {
    if (!selectedConversation) return '';
    const isSupporter = selectedConversation.supporter?.user_id === user?.id;
    if (isSupporter) {
      // Current user is the supporter - show seeker's first name
      const seekerName = selectedConversation.seeker?.full_name;
      if (seekerName) {
        // Get first name only
        return seekerName.split(' ')[0];
      }
      return 'Mate';
    }
    return selectedConversation.supporter?.display_name || 'Peer Supporter';
  };

  // Not logged in
  if (!user) {
    return (
      <Card className="bg-white/[0.02] border-white/10">
        <CardContent className="py-12 text-center">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-2">Sign in Required</h3>
          <p className="text-sm text-white max-w-xs mx-auto">
            Please sign in to access Mental Health Mates and connect with peer supporters.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Become Supporter View
  if (viewState === 'become-supporter') {
    return (
      <BecomeSupporter
        onSuccess={() => {
          refetchProfile();
          refetchConversations();
          setViewState('hub');
        }}
        onBack={() => setViewState('hub')}
      />
    );
  }

  // Main Hub View
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Card */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent">
        {/* Centered Header with Icon Above */}
        <div className="text-center p-4 border-b border-white/10">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
            <Users className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Mental Health Mates</h2>
          <p className="text-sm text-white mt-1">Connect with someone who understands</p>
        </div>

        {/* Status Bar */}
        <div className="px-4 py-3 bg-white/5 flex items-center justify-between">
          <span className="text-white text-sm">Your Status</span>
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
            Available
          </Badge>
        </div>

        <CardContent className="p-0">
          {/* Supporter Dashboard (if registered) */}
          {myProfile && (
            <div className="p-4">
              <SupporterDashboard
                profile={myProfile}
                onProfileUpdated={handleProfileUpdated}
              />
            </div>
          )}

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 mx-4 mt-4">
              <TabsTrigger value="browse" className="gap-2 data-[state=active]:bg-purple-500/20 text-white">
                <Users className="w-4 h-4" />
                Find Support
              </TabsTrigger>
              <TabsTrigger value="chats" className="gap-2 data-[state=active]:bg-purple-500/20 text-white">
                <MessageCircle className="w-4 h-4" />
                My Chats
                {conversations.filter(c => c.status === 'active').length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-purple-500 text-white rounded-full">
                    {conversations.filter(c => c.status === 'active').length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Browse Supporters Tab */}
            <TabsContent value="browse" className="mt-4 space-y-4">
              {/* Premium CTA Button (if not registered) */}
              {!myProfile && (
                <div className="px-4">
                  <Button
                    onClick={() => setViewState('become-supporter')}
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Become a Mental Health Mate
                  </Button>
                </div>
              )}

              {/* Available Supporters - Horizontal Scroll on Mobile */}
              <div className="px-4">
                <h3 className="text-white font-semibold mb-3">Available Support</h3>
              </div>
              <AvailableSupporters
                onConnect={handleConnect}
                connectingId={connectingId}
                excludeUserId={user?.id}
              />
            </TabsContent>

            {/* My Chats Tab */}
            <TabsContent value="chats" className="mt-4 px-4">
              {conversationsLoading ? (
                <ConversationSkeleton />
              ) : conversationsError ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Couldn't load chats</h3>
                  <p className="text-sm text-white max-w-xs mx-auto mb-4">
                    There was an error loading your conversations. Please try again.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => refetchConversations()}
                    className="gap-2 text-white border-white/20 hover:bg-white/10 h-11 touch-manipulation"
                  >
                    Try Again
                  </Button>
                </div>
              ) : conversations.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-purple-400/50" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">No conversations yet</h3>
                  <p className="text-sm text-white max-w-xs mx-auto mb-4">
                    Connect with a Mental Health Mate to start chatting
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('browse')}
                    className="gap-2 text-white border-white/20 hover:bg-white/10"
                  >
                    <Users className="w-4 h-4" />
                    Find Someone to Chat With
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pb-4">
                  {conversations.map((convo) => (
                    <div
                      key={convo.id}
                      onClick={() => convo.status === 'active' && handleOpenChat(convo)}
                      className={`
                        cursor-pointer transition-all hover:scale-[1.01] p-4 rounded-xl touch-manipulation
                        ${convo.status === 'active'
                          ? 'bg-white/[0.03] border border-purple-500/30 hover:border-purple-400/50 active:scale-[0.99]'
                          : 'bg-white/[0.01] border border-white/10 opacity-60 cursor-not-allowed'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white truncate">
                              {convo.supporter?.user_id === user?.id
                                ? (convo.seeker?.full_name?.split(' ')[0] || 'Mate')
                                : (convo.supporter?.display_name || 'Supporter')}
                            </h4>
                            {convo.status === 'active' && (
                              <span className="flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white">
                            {convo.status === 'active' ? 'Active conversation' : 'Conversation ended'}
                          </p>
                        </div>

                        <Button
                          size="sm"
                          disabled={convo.status !== 'active'}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenChat(convo);
                          }}
                          className="bg-purple-500/20 hover:bg-purple-500/30 text-white border border-purple-500/30 h-11 touch-manipulation"
                        >
                          <MessageCircle className="w-4 h-4 mr-1.5" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Safety Notice */}
      <Card className="bg-amber-500/10 border-amber-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-300 mb-1">Important</p>
              <p className="text-white">
                Mental Health Mates are peer supporters, not professional counsellors.
                If you're in crisis, please call <a href="tel:116123" className="text-amber-300 font-medium hover:underline">116 123</a> (Samaritans)
                or text SHOUT to <span className="font-medium text-amber-300">85258</span>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Sheet */}
      <Sheet open={isChatOpen} onOpenChange={(open) => !open && handleCloseChat()}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <div className="flex flex-col h-full bg-background">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border bg-gradient-to-r from-purple-500/10 to-pink-500/10 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseChat}
                className="shrink-0 -ml-2 h-10 w-10 text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10 border-2 border-pink-500/30">
                <AvatarImage src={selectedConversation?.supporter?.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 font-semibold">
                  {getChatPartnerName().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-white truncate">{getChatPartnerName()}</h2>
                  <PresenceIndicator status={partnerPresenceStatus} lastSeen={partnerPresence?.last_seen} size="sm" />
                </div>
                <p className="text-xs text-pink-400 flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  Peer Support Chat
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 ? (
                <div className="text-center text-white/60 text-sm py-8">
                  <Heart className="h-10 w-10 text-pink-400/30 mx-auto mb-3" />
                  <p>Start the conversation with a warm greeting</p>
                </div>
              ) : (
                chatMessages.map((msg) => {
                  const isOwn = msg.sender_id === user?.id;
                  const isOptimistic = msg.id.startsWith('temp-');
                  return (
                    <div key={msg.id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2",
                        isOwn
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-br-sm"
                          : "bg-white/10 text-white rounded-bl-sm"
                      )}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <div className={cn("flex items-center gap-1 mt-1", isOwn ? "justify-end" : "")}>
                          <span className={cn("text-[10px]", isOwn ? "text-white/70" : "text-white/50")}>
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
                              className={isOptimistic ? "text-white/50" : "text-white/70"}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              {/* Typing indicator */}
              {isOtherTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-2">
                    <TypingIndicatorWithName userName={getChatPartnerName()} className="text-white/60" />
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-background shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <Input
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                    // Broadcast typing indicator
                    if (e.target.value.length > 0) {
                      setTyping(true, getChatPartnerName());
                    } else {
                      setTyping(false);
                    }
                  }}
                  onBlur={() => setTyping(false)}
                  placeholder="Type a supportive message..."
                  className="flex-1 h-11 bg-white/5 border-white/20 text-white placeholder:text-white/50 touch-manipulation"
                  disabled={sendMessage.isPending}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!messageInput.trim() || sendMessage.isPending}
                  className="h-11 w-11 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white touch-manipulation"
                >
                  {sendMessage.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PeerSupportHub;
