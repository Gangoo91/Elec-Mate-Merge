import React, { useState, useCallback } from 'react';
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
import { Switch } from '@/components/ui/switch';
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
import {
  ReadReceipt,
  getReceiptStatus,
  TypingIndicatorWithName,
} from '@/components/messaging/ReadReceipt';
import { PresenceIndicator } from '@/components/messaging/PresenceIndicator';
import { calculateStatus } from '@/services/presenceService';
import { NativePageWrapper } from '@/components/native/NativePageWrapper';
import AvailableSupporters from './AvailableSupporters';
import BecomeSupporter from './BecomeSupporter';
import PushNotificationPrompt from '@/components/notifications/PushNotificationPrompt';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  EmptyState,
  inputClass,
} from '@/components/college/primitives';

interface PeerSupportHubProps {
  onClose?: () => void;
}

type ViewState = 'hub' | 'become-supporter' | 'chat' | 'supporter-detail';

// Skeleton for conversation items
const ConversationSkeleton = () => (
  <div className="space-y-3">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="flex items-center gap-4 p-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]"
      >
        <Skeleton className="w-12 h-12 rounded-xl bg-white/[0.06]" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32 bg-white/[0.06]" />
          <Skeleton className="h-3 w-48 bg-white/[0.06]" />
        </div>
      </div>
    ))}
  </div>
);

// Skeleton for Your Status section
const StatusSkeleton = () => (
  <div className="mb-6">
    <div className="flex items-center justify-between p-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-xl bg-white/[0.06]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-white/[0.06]" />
          <Skeleton className="h-3 w-20 bg-white/[0.06]" />
        </div>
      </div>
      <Skeleton className="h-6 w-11 rounded-full bg-white/[0.06]" />
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
  const {
    data: conversations = [],
    isLoading: conversationsLoading,
    isError: conversationsError,
    refetch: refetchConversations,
  } = usePeerConversations();
  const {
    data: myProfile,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = usePeerSupporterProfile();
  const { data: chatMessages = [], isLoading: messagesLoading } = usePeerMessages(
    selectedConversation?.id
  );
  const sendMessage = useSendPeerMessage();
  const markAsRead = useMarkPeerMessagesAsRead();

  // Typing indicator
  const { isOtherTyping, setTyping } = usePeerTyping(selectedConversation?.id);

  // Presence - get partner's user ID
  const partnerId = selectedConversation
    ? selectedConversation.supporter?.user_id === user?.id
      ? (selectedConversation as any).seeker_id
      : selectedConversation.supporter?.user_id
    : undefined;
  const { data: partnerPresence } = usePeerPresence(partnerId);
  const partnerPresenceStatus = partnerPresence
    ? calculateStatus(partnerPresence.last_seen)
    : 'offline';

  // Count unread messages
  const unreadCount = conversations.filter(
    (c) => c.status === 'active' && (c as any).unread_count > 0
  ).length;

  const handleConnect = async (supporterId: string) => {
    setConnectingId(supporterId);
    try {
      const { peerConversationService } = await import('@/services/peerSupportService');
      await peerConversationService.startConversation(supporterId);
      toast({
        title: 'Connected!',
        description: 'You can now start chatting. Be kind to each other.',
      });
      refetchConversations();
      setActiveTab('chats');
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        title: 'Connection failed',
        description: 'Please try again',
        variant: 'destructive',
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
          : 'Others can now see you and connect',
      });
      handleProfileUpdated();
    } catch (error) {
      console.error('Toggle error:', error);
      toast({
        title: 'Failed to update status',
        description: 'Please try again',
        variant: 'destructive',
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
            title: 'Failed to send',
            description: 'Please try again',
            variant: 'destructive',
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
        <EmptyState
          title="Sign in required"
          description="Please sign in to access Mental Health Mates and connect with peer supporters."
        />
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
    const trainingBadgeTone: Record<string, string> = {
      peer: 'bg-[hsl(0_0%_12%)] text-white border-white/[0.08]',
      trained: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
      mhfa_certified: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25',
    };

    const getResponseTime = () => {
      if (!selectedSupporter.last_active_at) return null;
      const diffMins = Math.floor(
        (Date.now() - new Date(selectedSupporter.last_active_at).getTime()) / 60000
      );
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
                className="w-24 h-24 rounded-2xl object-cover border border-white/[0.08]"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.08] flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            )}
            {/* Online indicator */}
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-[3px] border-[hsl(0_0%_8%)] flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full" />
            </span>
          </div>

          {/* Name and Badge */}
          <Eyebrow>Peer supporter</Eyebrow>
          <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight mb-2">
            {selectedSupporter.display_name}
          </h2>
          <span
            className={cn(
              'inline-flex items-center text-[12px] font-medium px-3 py-1 rounded-full border',
              trainingBadgeTone[selectedSupporter.training_level] || trainingBadgeTone.peer
            )}
          >
            <Award className="w-3.5 h-3.5 mr-1.5" />
            {trainingLevelLabels[selectedSupporter.training_level]}
          </span>

          {/* Response time */}
          {responseTime && (
            <div className="flex items-center gap-1.5 mt-3 text-emerald-400">
              <Zap className="w-4 h-4" />
              <span className="text-[13px]">{responseTime}</span>
            </div>
          )}
        </div>

        {/* Bio Section */}
        {selectedSupporter.bio && (
          <div className="mb-6 p-5 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
            <Eyebrow>About</Eyebrow>
            <p className="mt-2 text-[13px] text-white leading-relaxed">{selectedSupporter.bio}</p>
          </div>
        )}

        {/* Topics Section */}
        {topics.length > 0 && (
          <div className="mb-6">
            <Eyebrow>Comfortable discussing</Eyebrow>
            <div className="mt-3 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="text-[12.5px] px-3 py-1.5 rounded-full bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/25"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden mb-6">
          <div className="bg-[hsl(0_0%_12%)] px-5 py-5 text-center">
            <Eyebrow>Chats completed</Eyebrow>
            <MessageCircle className="h-5 w-5 text-elec-yellow mx-auto mt-2" />
            <p className="mt-1 text-2xl font-semibold text-white tabular-nums">
              {selectedSupporter.total_conversations}
            </p>
          </div>
          <div className="bg-[hsl(0_0%_12%)] px-5 py-5 text-center">
            <Eyebrow>Peer supporter</Eyebrow>
            <Shield className="h-5 w-5 text-emerald-400 mx-auto mt-2" />
            <p className="mt-1 text-2xl font-semibold text-white">Verified</p>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="p-5 rounded-2xl bg-[hsl(0_0%_12%)] border border-amber-500/25 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[13px] text-white leading-relaxed">
              This is peer support, not professional therapy. All conversations are confidential.
            </p>
          </div>
        </div>

        {/* Start Chat Button - Fixed at Bottom */}
        <div className="sticky bottom-0 pt-4 pb-safe bg-[hsl(0_0%_8%)]">
          <PrimaryButton
            onClick={handleConnectFromDetail}
            disabled={connectingId === selectedSupporter.id}
            size="lg"
            fullWidth
          >
            {connectingId === selectedSupporter.id ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <MessageCircle className="mr-2 h-5 w-5" />
                Start chat with {selectedSupporter.display_name.split(' ')[0]}
              </>
            )}
          </PrimaryButton>
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
          <div className="px-4 py-2 bg-[hsl(0_0%_12%)] border-b border-white/[0.06] flex items-center gap-2">
            <PresenceIndicator
              status={partnerPresenceStatus}
              lastSeen={partnerPresence?.last_seen}
              size="sm"
            />
            <span className="text-[11px] text-white">
              {partnerPresenceStatus === 'online'
                ? 'Online now'
                : partnerPresenceStatus === 'away'
                  ? 'Away'
                  : 'Offline'}
            </span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto momentum-scroll-y px-4 py-3 space-y-3 bg-[hsl(0_0%_8%)]">
            {chatMessages.length === 0 ? (
              <div className="text-center text-white text-sm py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] flex items-center justify-center">
                  <Heart className="h-8 w-8 text-elec-yellow" />
                </div>
                <p className="font-medium text-white mb-1">Start a conversation</p>
                <p className="text-[13px] text-white">Say hello with a warm, supportive message</p>
              </div>
            ) : (
              chatMessages.map((msg) => {
                const isOwn = msg.sender_id === user?.id;
                const isOptimistic = msg.id.startsWith('temp-');
                return (
                  <div key={msg.id} className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-3',
                        isOwn
                          ? 'bg-elec-yellow text-black rounded-br-md'
                          : 'bg-[hsl(0_0%_12%)] border border-white/[0.06] text-white rounded-bl-md'
                      )}
                    >
                      <p
                        className={cn(
                          'text-[13.5px] whitespace-pre-wrap leading-relaxed',
                          isOwn ? 'text-black' : 'text-white'
                        )}
                      >
                        {msg.content}
                      </p>
                      <div
                        className={cn(
                          'flex items-center gap-1.5 mt-1.5',
                          isOwn ? 'justify-end' : ''
                        )}
                      >
                        <span
                          className={cn(
                            'text-[10px]',
                            isOwn ? 'text-black/60' : 'text-white'
                          )}
                        >
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {isOwn && (
                          <ReadReceipt
                            status={getReceiptStatus(
                              msg.created_at,
                              (msg as any).delivered_at,
                              (msg as any).read_at,
                              isOptimistic
                            )}
                            className={isOptimistic ? 'text-black/60' : 'text-black/70'}
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
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                  <TypingIndicatorWithName
                    userName={getChatPartnerName()}
                    className="text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Message Input - Fixed at Bottom */}
          <div className="sticky bottom-0 p-4 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-t border-white/[0.06] pb-safe">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-3"
            >
              <input
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
                className={cn(inputClass, 'flex-1 h-12')}
                disabled={sendMessage.isPending}
              />
              <button
                type="submit"
                disabled={!messageInput.trim() || sendMessage.isPending}
                aria-label="Send message"
                className="h-12 w-12 rounded-full bg-elec-yellow text-black flex items-center justify-center hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-40 transition-all touch-manipulation"
              >
                {sendMessage.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
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
      hideHeader={true}
      onRefresh={handleRefresh}
      collapsingHeader={true}
      compactTitle={true}
    >
      <div className="space-y-6">
        <div className="pt-1">
          <button
            onClick={() => (onClose ? onClose() : window.history.back())}
            className="inline-flex items-center gap-2 text-[13px] text-white hover:text-white transition-colors touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <div className="border-b border-white/[0.06] pb-5">
          <Eyebrow>Peer support</Eyebrow>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Mental Health Mates
          </h1>
          <p className="mt-2 max-w-xl text-[13px] leading-6 text-white">
            Connect with someone who understands. Start with a conversation, not a complicated
            process.
          </p>
        </div>

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
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.08] flex items-center justify-center">
                  {myProfile.avatar_url ? (
                    <img
                      src={myProfile.avatar_url}
                      alt={myProfile.display_name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{myProfile.display_name}</h3>
                  <p
                    className={cn(
                      'text-[13px]',
                      myProfile.is_available ? 'text-emerald-400' : 'text-white'
                    )}
                  >
                    {myProfile.is_available ? 'Available to help' : 'Currently offline'}
                  </p>
                </div>
              </div>
              {isToggling ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <Switch
                  checked={myProfile.is_available}
                  onCheckedChange={handleToggleAvailability}
                  disabled={isToggling}
                />
              )}
            </div>

            <div className="mt-4 flex items-center gap-6 border-t border-white/[0.06] pt-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-elec-yellow" />
                <div>
                  <p className="text-lg font-semibold text-white tabular-nums">
                    {myProfile.total_conversations}
                  </p>
                  <Eyebrow>Total chats</Eyebrow>
                </div>
              </div>
              <div className="h-8 w-px bg-white/[0.06]" />
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-elec-yellow" />
                <div>
                  <p className="text-[13px] font-medium text-white">
                    {myProfile.last_active_at
                      ? formatDistanceToNow(new Date(myProfile.last_active_at), {
                          addSuffix: false,
                        })
                      : 'Never'}
                  </p>
                  <Eyebrow>Last active</Eyebrow>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex gap-6 border-b border-white/[0.06]">
          <button
            onClick={() => setActiveTab('browse')}
            className={cn(
              'inline-flex items-center justify-center gap-2 border-b-2 px-1 pb-3 text-[13px] font-medium transition-all touch-manipulation',
              activeTab === 'browse'
                ? 'border-elec-yellow text-white'
                : 'border-transparent text-white'
            )}
          >
            <Users className="h-4 w-4" />
            Find support
          </button>
          <button
            onClick={() => setActiveTab('chats')}
            className={cn(
              'inline-flex items-center justify-center gap-2 border-b-2 px-1 pb-3 text-[13px] font-medium transition-all touch-manipulation',
              activeTab === 'chats'
                ? 'border-elec-yellow text-white'
                : 'border-transparent text-white'
            )}
          >
            <MessageCircle className="h-4 w-4" />
            My chats
            {unreadCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-[11px] bg-elec-yellow text-black rounded-full font-semibold tabular-nums">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content: Find Support */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {!profileLoading && !myProfile && (
              <PrimaryButton
                onClick={() => setViewState('become-supporter')}
                size="lg"
                fullWidth
              >
                <Heart className="mr-2 h-5 w-5" />
                Become a Mental Health Mate
              </PrimaryButton>
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
              <EmptyState
                title="Couldn't load chats"
                description="There was an error loading your conversations. Please try again."
                action="Try again"
                onAction={() => refetchConversations()}
              />
            ) : conversations.length === 0 ? (
              <EmptyState
                title="No conversations yet"
                description="Connect with a Mental Health Mate to start chatting."
                action="Find someone to chat with"
                onAction={() => setActiveTab('browse')}
              />
            ) : (
              <div className="space-y-2">
                {conversations.map((convo) => (
                  <button
                    key={convo.id}
                    onClick={() => convo.status === 'active' && handleOpenChat(convo)}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-transform touch-manipulation',
                      convo.status === 'active'
                        ? 'bg-[hsl(0_0%_12%)] border border-white/[0.06] active:scale-[0.98] hover:bg-[hsl(0_0%_15%)]'
                        : 'bg-[hsl(0_0%_10%)] border border-white/[0.04] opacity-50'
                    )}
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-[hsl(0_0%_15%)] border border-white/[0.08] flex items-center justify-center relative shrink-0">
                      <User className="w-6 h-6 text-elec-yellow" />
                      {convo.status === 'active' && (
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[hsl(0_0%_8%)]" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-medium text-white truncate">
                          {convo.supporter?.user_id === user?.id
                            ? convo.seeker?.full_name?.split(' ')[0] || 'Mate'
                            : convo.supporter?.display_name || 'Supporter'}
                        </h4>
                        <span className="text-[11px] text-white shrink-0">
                          {formatConversationTime((convo as any).last_message_at)}
                        </span>
                      </div>
                      <p className="text-[13px] text-white truncate mt-0.5">
                        {(convo as any).last_message ||
                          (convo.status === 'active' ? 'Start chatting...' : 'Conversation ended')}
                      </p>
                    </div>

                    {/* Unread Badge */}
                    {(convo as any).unread_count > 0 && (
                      <span className="w-6 h-6 rounded-full bg-elec-yellow text-black text-[11px] flex items-center justify-center font-semibold tabular-nums">
                        {(convo as any).unread_count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[hsl(0_0%_12%)] border border-amber-500/25 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <Eyebrow className="text-amber-400">Important</Eyebrow>
              <p className="mt-2 text-[13px] text-white leading-relaxed">
                Mental Health Mates are peer supporters, not professional counsellors. If you're in
                crisis, call{' '}
                <a href="tel:116123" className="text-elec-yellow font-semibold">
                  116 123
                </a>{' '}
                (Samaritans) or text SHOUT to{' '}
                <span className="text-elec-yellow font-semibold">85258</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </NativePageWrapper>
  );
};

export default PeerSupportHub;
