import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Users,
  Heart,
  MessageCircle,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Send,
  User,
  Clock,
  Award,
  Zap,
  Shield,
} from 'lucide-react';
import {
  PeerSupporter,
  PeerConversation,
  peerSupporterService,
  trainingLevelLabels,
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
import { NativePageWrapper } from '@/components/native/NativePageWrapper';
import AvailableSupporters from './AvailableSupporters';
import BecomeSupporter from './BecomeSupporter';
import PushNotificationPrompt from '@/components/notifications/PushNotificationPrompt';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

interface PeerSupportHubProps {
  onClose?: () => void;
}

type ViewState = 'hub' | 'become-supporter' | 'chat' | 'supporter-detail';

// Skeleton for conversation items
const ConversationSkeleton = () => (
  <div className="space-y-3">
    {[1, 2].map((i) => (
      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        <Skeleton className="w-12 h-12 rounded-xl bg-white/10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32 bg-white/10" />
          <Skeleton className="h-3 w-48 bg-white/10" />
        </div>
      </div>
    ))}
  </div>
);

// Skeleton for Your Status section
const StatusSkeleton = () => (
  <div className="mb-6">
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-xl bg-white/10" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-white/10" />
          <Skeleton className="h-3 w-20 bg-white/10" />
        </div>
      </div>
      <Skeleton className="h-6 w-11 rounded-full bg-white/10" />
    </div>
  </div>
);

const PeerSupportHub: React.FC<PeerSupportHubProps> = ({ onClose }) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const [viewState, setViewState] = useState<ViewState>('hub');
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'browse' | 'chats'>('browse');
  const [isToggling, setIsToggling] = useState(false);

  // Chat state
  const [selectedConversation, setSelectedConversation] = useState<PeerConversation | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // Supporter detail state
  const [selectedSupporter, setSelectedSupporter] = useState<PeerSupporter | null>(null);

  // Use centralised hooks for conversations, messages, and profile (all cached)
  const { data: conversations = [], isLoading: conversationsLoading, isError: conversationsError, refetch: refetchConversations } = usePeerConversations();
  const { data: myProfile, isLoading: profileLoading, refetch: refetchProfile } = usePeerSupporterProfile();
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

  // Count unread messages
  const unreadCount = conversations.filter(c => c.status === 'active' && (c as any).unread_count > 0).length;

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

  const handleToggleAvailability = async () => {
    if (!myProfile) return;
    setIsToggling(true);
    try {
      await peerSupporterService.toggleAvailability();
      toast({
        title: myProfile.is_available ? "You're now offline" : "You're now available!",
        description: myProfile.is_available
          ? "You won't receive new connection requests"
          : "Others can now see you and connect",
      });
      handleProfileUpdated();
    } catch (error) {
      console.error('Toggle error:', error);
      toast({
        title: "Failed to update status",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  // Open chat with a conversation
  const handleOpenChat = (conversation: PeerConversation) => {
    setSelectedConversation(conversation);
    setViewState('chat');
    markAsRead.mutate(conversation.id);
  };

  // Send a message
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

  // Close chat and return to hub
  const handleCloseChat = () => {
    setViewState('hub');
    setTimeout(() => {
      setSelectedConversation(null);
    }, 300);
  };

  // Get other person's name in conversation
  const getChatPartnerName = () => {
    if (!selectedConversation) return '';
    const isSupporter = selectedConversation.supporter?.user_id === user?.id;
    if (isSupporter) {
      const seekerName = selectedConversation.seeker?.full_name;
      if (seekerName) {
        return seekerName.split(' ')[0];
      }
      return 'Mate';
    }
    return selectedConversation.supporter?.display_name || 'Peer Supporter';
  };

  // Format conversation time
  const formatConversationTime = (timestamp: string | null) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (diffHours < 48) {
      return 'Yesterday';
    }
    return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
  };

  // View supporter profile
  const handleViewProfile = (supporter: PeerSupporter) => {
    setSelectedSupporter(supporter);
    setViewState('supporter-detail');
  };

  // Connect from detail view
  const handleConnectFromDetail = async () => {
    if (!selectedSupporter) return;
    await handleConnect(selectedSupporter.id);
    // After connecting, go back to hub and switch to chats tab
    setViewState('hub');
    setSelectedSupporter(null);
  };

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchProfile(), refetchConversations()]);
  }, [refetchProfile, refetchConversations]);

  // Not logged in
  if (!user) {
    return (
      <NativePageWrapper
        title="Mental Health Mates"
        subtitle="Connect with someone who understands"
        icon={<Heart />}
        headerColor="purple"
        showBackButton={false}
      >
        <div className="py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="font-semibold text-white mb-2">Sign in Required</h3>
          <p className="text-sm text-white/60 max-w-xs mx-auto">
            Please sign in to access Mental Health Mates and connect with peer supporters.
          </p>
        </div>
      </NativePageWrapper>
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

  // Supporter Detail View
  if (viewState === 'supporter-detail' && selectedSupporter) {
    const trainingBadgeColors: Record<string, string> = {
      peer: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      trained: 'bg-green-500/20 text-green-300 border-green-500/30',
      mhfa_certified: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    };

    const getResponseTime = () => {
      if (!selectedSupporter.last_active_at) return null;
      const diffMins = Math.floor((Date.now() - new Date(selectedSupporter.last_active_at).getTime()) / 60000);
      if (diffMins < 5) return 'Usually responds instantly';
      if (diffMins < 30) return 'Usually responds in ~5 minutes';
      if (diffMins < 60) return 'Usually responds in ~30 minutes';
      return 'Usually responds within an hour';
    };

    const responseTime = getResponseTime();
    const topics = selectedSupporter.topics_comfortable_with || [];

    return (
      <NativePageWrapper
        title={selectedSupporter.display_name}
        subtitle="Peer Supporter"
        icon={<Heart />}
        headerColor="purple"
        showBackButton={true}
        onBack={() => {
          setViewState('hub');
          setSelectedSupporter(null);
        }}
        collapsingHeader={false}
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-6">
          {/* Large Avatar */}
          <div className="relative mb-4">
            {selectedSupporter.avatar_url ? (
              <img
                src={selectedSupporter.avatar_url}
                alt={selectedSupporter.display_name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-500/30"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/40 to-pink-500/40 border-2 border-purple-500/30 flex items-center justify-center">
                <User className="w-12 h-12 text-purple-300" />
              </div>
            )}
            {/* Online indicator */}
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-background flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full" />
            </span>
          </div>

          {/* Name and Badge */}
          <h2 className="text-xl font-bold text-white mb-2">{selectedSupporter.display_name}</h2>
          <Badge
            variant="outline"
            className={`text-sm px-3 py-1 ${trainingBadgeColors[selectedSupporter.training_level] || trainingBadgeColors.peer}`}
          >
            <Award className="w-3.5 h-3.5 mr-1.5" />
            {trainingLevelLabels[selectedSupporter.training_level]}
          </Badge>

          {/* Response time */}
          {responseTime && (
            <div className="flex items-center gap-1.5 mt-3 text-green-400">
              <Zap className="w-4 h-4" />
              <span className="text-sm">{responseTime}</span>
            </div>
          )}
        </div>

        {/* Bio Section */}
        {selectedSupporter.bio && (
          <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="text-sm font-medium text-white/60 mb-2">About</h3>
            <p className="text-white leading-relaxed">{selectedSupporter.bio}</p>
          </div>
        )}

        {/* Topics Section */}
        {topics.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white/60 mb-3">Comfortable discussing</h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="text-sm px-3 py-1.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <MessageCircle className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{selectedSupporter.total_conversations}</p>
            <p className="text-xs text-white/60">Chats completed</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
            <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">Verified</p>
            <p className="text-xs text-white/60">Peer supporter</p>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/80">
              This is peer support, not professional therapy. All conversations are confidential.
            </p>
          </div>
        </div>

        {/* Start Chat Button - Fixed at Bottom */}
        <div className="sticky bottom-0 pt-4 pb-safe bg-background">
          <Button
            onClick={handleConnectFromDetail}
            disabled={connectingId === selectedSupporter.id}
            className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-base rounded-2xl touch-manipulation shadow-lg shadow-purple-500/25"
          >
            {connectingId === selectedSupporter.id ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chat with {selectedSupporter.display_name.split(' ')[0]}
              </>
            )}
          </Button>
        </div>
      </NativePageWrapper>
    );
  }

  // Full-Page Chat View
  if (viewState === 'chat' && selectedConversation) {
    return (
      <NativePageWrapper
        title={getChatPartnerName()}
        subtitle="Peer Support Chat"
        icon={<Heart />}
        headerColor="purple"
        showBackButton={true}
        onBack={handleCloseChat}
        collapsingHeader={false}
        contentClassName="p-0"
      >
        <div className="flex flex-col h-[calc(100vh-56px)]">
          {/* Partner Status Bar */}
          <div className="px-4 py-2 bg-purple-500/10 border-b border-purple-500/20 flex items-center gap-2">
            <PresenceIndicator status={partnerPresenceStatus} lastSeen={partnerPresence?.last_seen} size="sm" />
            <span className="text-xs text-white/60">
              {partnerPresenceStatus === 'online' ? 'Online now' :
               partnerPresenceStatus === 'away' ? 'Away' : 'Offline'}
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto momentum-scroll-y px-4 py-3 space-y-3">
            {chatMessages.length === 0 ? (
              <div className="text-center text-white/60 text-sm py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-pink-500/10 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-pink-400/50" />
                </div>
                <p className="font-medium text-white/80 mb-1">Start a conversation</p>
                <p className="text-sm text-white/50">Say hello with a warm, supportive message</p>
              </div>
            ) : (
              chatMessages.map((msg) => {
                const isOwn = msg.sender_id === user?.id;
                const isOptimistic = msg.id.startsWith('temp-');
                return (
                  <div key={msg.id} className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      isOwn
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-br-md"
                        : "bg-white/10 text-white rounded-bl-md"
                    )}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      <div className={cn("flex items-center gap-1.5 mt-1.5", isOwn ? "justify-end" : "")}>
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
                <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                  <TypingIndicatorWithName userName={getChatPartnerName()} className="text-white/60" />
                </div>
              </div>
            )}
          </div>

          {/* Message Input - Fixed at Bottom */}
          <div className="sticky bottom-0 p-4 bg-background/95 backdrop-blur-xl border-t border-white/10 pb-safe">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-3"
            >
              <Input
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                  if (e.target.value.length > 0) {
                    setTyping(true, getChatPartnerName());
                  } else {
                    setTyping(false);
                  }
                }}
                onBlur={() => setTyping(false)}
                placeholder="Type a supportive message..."
                className="flex-1 h-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 touch-manipulation"
                disabled={sendMessage.isPending}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!messageInput.trim() || sendMessage.isPending}
                className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white touch-manipulation"
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
      </NativePageWrapper>
    );
  }

  // Main Hub View
  return (
    <NativePageWrapper
      title="Mental Health Mates"
      subtitle="Connect with someone who understands"
      headerColor="purple"
      showBackButton={false}
      onRefresh={handleRefresh}
      collapsingHeader={true}
      compactTitle={true}
    >
      {/* Push Notification Prompt */}
      <PushNotificationPrompt
        compact
        context="Get notified when your Mental Health Mate replies"
        delay={3000}
      />

      {/* Your Status Section (if registered) */}
      {profileLoading ? (
        <StatusSkeleton />
      ) : myProfile ? (
        <div className="mb-6">
          {/* Status Toggle Row */}
          <div className={cn(
            "flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
            myProfile.is_available
              ? "bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20"
              : "bg-white/[0.03] border border-white/10"
          )}>
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                myProfile.is_available
                  ? "bg-gradient-to-br from-purple-500 to-pink-500"
                  : "bg-white/10"
              )}>
                {myProfile.avatar_url ? (
                  <img
                    src={myProfile.avatar_url}
                    alt={myProfile.display_name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                ) : (
                  <User className={cn("h-6 w-6", myProfile.is_available ? "text-white" : "text-white/60")} />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">{myProfile.display_name}</h3>
                <p className={cn(
                  "text-sm",
                  myProfile.is_available ? "text-green-400" : "text-white/50"
                )}>
                  {myProfile.is_available ? "Available to help" : "Currently offline"}
                </p>
              </div>
            </div>
            {isToggling ? (
              <Loader2 className="w-5 h-5 animate-spin text-white/50" />
            ) : (
              <Switch
                checked={myProfile.is_available}
                onCheckedChange={handleToggleAvailability}
                disabled={isToggling}
              />
            )}
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <MessageCircle className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-lg font-bold text-white">{myProfile.total_conversations}</p>
                <p className="text-xs text-white/60">Total chats</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <Clock className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm font-medium text-white">
                  {myProfile.last_active_at
                    ? formatDistanceToNow(new Date(myProfile.last_active_at), { addSuffix: false })
                    : 'Never'}
                </p>
                <p className="text-xs text-white/60">Last active</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Native Segment Control */}
      <div className="flex p-1 bg-white/5 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab('browse')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation",
            activeTab === 'browse'
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : "text-white/60"
          )}
        >
          <Users className="h-4 w-4" />
          Find Support
        </button>
        <button
          onClick={() => setActiveTab('chats')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation",
            activeTab === 'chats'
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
              : "text-white/60"
          )}
        >
          <MessageCircle className="h-4 w-4" />
          My Chats
          {unreadCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-pink-500 rounded-full">{unreadCount}</span>
          )}
        </button>
      </div>

      {/* Tab Content: Find Support */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Become a Mate CTA (if not registered) */}
          {!profileLoading && !myProfile && (
            <Button
              onClick={() => setViewState('become-supporter')}
              className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-base rounded-2xl touch-manipulation"
            >
              <Heart className="mr-2 h-5 w-5" />
              Become a Mental Health Mate
            </Button>
          )}

          {/* Available Supporters */}
          <AvailableSupporters
            onConnect={handleConnect}
            onViewProfile={handleViewProfile}
            connectingId={connectingId}
            excludeUserId={user?.id}
          />
        </div>
      )}

      {/* Tab Content: My Chats */}
      {activeTab === 'chats' && (
        <div>
          {conversationsLoading ? (
            <ConversationSkeleton />
          ) : conversationsError ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Couldn't load chats</h3>
              <p className="text-sm text-white/60 max-w-xs mx-auto mb-4">
                There was an error loading your conversations. Please try again.
              </p>
              <Button
                variant="outline"
                onClick={() => refetchConversations()}
                className="gap-2 text-white border-white/20 hover:bg-white/10 h-12 touch-manipulation"
              >
                Try Again
              </Button>
            </div>
          ) : conversations.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-purple-400/50" />
              </div>
              <h3 className="font-semibold text-white mb-2">No conversations yet</h3>
              <p className="text-sm text-white/60 max-w-xs mx-auto mb-4">
                Connect with a Mental Health Mate to start chatting
              </p>
              <Button
                variant="outline"
                onClick={() => setActiveTab('browse')}
                className="gap-2 text-white border-white/20 hover:bg-white/10 h-12 touch-manipulation"
              >
                <Users className="w-4 h-4" />
                Find Someone to Chat With
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((convo) => (
                <div
                  key={convo.id}
                  onClick={() => convo.status === 'active' && handleOpenChat(convo)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl transition-transform touch-manipulation",
                    convo.status === 'active'
                      ? "bg-white/[0.03] border border-white/10 active:scale-[0.98]"
                      : "bg-white/[0.01] border border-white/5 opacity-50"
                  )}
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center relative">
                    <User className="w-6 h-6 text-purple-400" />
                    {convo.status === 'active' && (
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white truncate">
                        {convo.supporter?.user_id === user?.id
                          ? (convo.seeker?.full_name?.split(' ')[0] || 'Mate')
                          : (convo.supporter?.display_name || 'Supporter')}
                      </h4>
                      <span className="text-xs text-white/40">
                        {formatConversationTime((convo as any).last_message_at)}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 truncate mt-0.5">
                      {(convo as any).last_message || (convo.status === 'active' ? 'Start chatting...' : 'Conversation ended')}
                    </p>
                  </div>

                  {/* Unread Badge */}
                  {(convo as any).unread_count > 0 && (
                    <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
                      {(convo as any).unread_count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Safety Notice */}
      <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="font-medium text-amber-300 mb-1">Important</p>
            <p className="text-sm text-white/80 leading-relaxed">
              Mental Health Mates are peer supporters, not professional counsellors.
              If you're in crisis, call{' '}
              <a href="tel:116123" className="text-amber-300 font-semibold">116 123</a>
              {' '}(Samaritans) or text SHOUT to{' '}
              <span className="text-amber-300 font-semibold">85258</span>.
            </p>
          </div>
        </div>
      </div>
    </NativePageWrapper>
  );
};

export default PeerSupportHub;
