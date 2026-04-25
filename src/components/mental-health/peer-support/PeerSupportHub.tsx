import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Loader2,
  ArrowLeft,
  Send,
  Zap,
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
  PageFrame,
  PageHero,
  StatStrip,
  SectionHeader,
  HubGrid,
  HubCard,
  ListCard,
  ListRow,
  Pill,
  Eyebrow,
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  TextAction,
  inputClass,
  itemVariants,
} from '@/components/college/primitives';

interface PeerSupportHubProps {
  onClose?: () => void;
}

type ViewState = 'hub' | 'become-supporter' | 'chat' | 'supporter-detail';
type TabState = 'browse' | 'chats';

// ─── Initials helper ──────────────────────────────────────────────────────
const getInitials = (name?: string | null) => {
  if (!name) return '–';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || '–';
};

interface InitialsAvatarProps {
  name?: string | null;
  imageUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
  className?: string;
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({
  name,
  imageUrl,
  size = 'md',
  online,
  className,
}) => {
  const dim =
    size === 'lg'
      ? 'h-20 w-20 text-[24px]'
      : size === 'sm'
        ? 'h-10 w-10 text-[12px]'
        : 'h-12 w-12 text-[13px]';
  const dot = size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';
  return (
    <div className={cn('relative shrink-0', className)}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name ?? 'avatar'}
          className={cn(dim, 'rounded-full object-cover border border-white/[0.08]')}
        />
      ) : (
        <div
          className={cn(
            dim,
            'rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center font-semibold text-white tracking-tight tabular-nums'
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {online && (
        <span
          aria-hidden
          className={cn(
            'absolute -bottom-0.5 -right-0.5 rounded-full bg-emerald-400 border-[3px] border-[hsl(0_0%_8%)]',
            dot
          )}
        />
      )}
    </div>
  );
};

// ─── Conversation row skeleton ────────────────────────────────────────────
const ConversationSkeleton = () => (
  <ListCard>
    {[1, 2].map((i) => (
      <div key={i} className="flex items-center gap-4 px-5 sm:px-6 py-5">
        <Skeleton className="h-12 w-12 rounded-full bg-white/[0.06]" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32 bg-white/[0.06]" />
          <Skeleton className="h-3 w-48 bg-white/[0.06]" />
        </div>
      </div>
    ))}
  </ListCard>
);

// ─── Component ────────────────────────────────────────────────────────────
const PeerSupportHub: React.FC<PeerSupportHubProps> = ({ onClose }) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const [viewState, setViewState] = useState<ViewState>('hub');
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabState>('browse');
  const [isToggling, setIsToggling] = useState(false);

  const [selectedConversation, setSelectedConversation] = useState<PeerConversation | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const [selectedSupporter, setSelectedSupporter] = useState<PeerSupporter | null>(null);

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
  const { data: chatMessages = [] } = usePeerMessages(selectedConversation?.id);
  const sendMessage = useSendPeerMessage();
  const markAsRead = useMarkPeerMessagesAsRead();

  const { isOtherTyping, setTyping } = usePeerTyping(selectedConversation?.id);

  const partnerId = selectedConversation
    ? selectedConversation.supporter?.user_id === user?.id
      ? (selectedConversation as any).seeker_id
      : selectedConversation.supporter?.user_id
    : undefined;
  const { data: partnerPresence } = usePeerPresence(partnerId);
  const partnerPresenceStatus = partnerPresence
    ? calculateStatus(partnerPresence.last_seen)
    : 'offline';

  const unreadCount = conversations.filter(
    (c) => c.status === 'active' && (c as any).unread_count > 0
  ).length;
  const activeChats = conversations.filter((c) => c.status === 'active').length;

  const handleConnect = async (supporterId: string) => {
    setConnectingId(supporterId);
    try {
      const { peerConversationService } = await import('@/services/peerSupportService');
      await peerConversationService.startConversation(supporterId);
      toast({
        title: 'Connected',
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
        title: myProfile.is_available ? "You're now offline" : "You're now available",
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

  const handleOpenChat = (conversation: PeerConversation) => {
    setSelectedConversation(conversation);
    setViewState('chat');
    markAsRead.mutate(conversation.id);
  };

  const handleSendMessage = () => {
    if (!selectedConversation || !messageInput.trim() || sendMessage.isPending) return;
    sendMessage.mutate(
      { conversationId: selectedConversation.id, content: messageInput.trim() },
      {
        onSuccess: () => setMessageInput(''),
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

  const handleCloseChat = () => {
    setViewState('hub');
    setTimeout(() => {
      setSelectedConversation(null);
    }, 300);
  };

  const getChatPartnerName = () => {
    if (!selectedConversation) return '';
    const isSupporter = selectedConversation.supporter?.user_id === user?.id;
    if (isSupporter) {
      const seekerName = selectedConversation.seeker?.full_name;
      if (seekerName) return seekerName.split(' ')[0];
      return 'Mate';
    }
    return selectedConversation.supporter?.display_name || 'Peer Supporter';
  };

  const formatConversationTime = (timestamp: string | null) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    if (diffHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
  };

  const handleViewProfile = (supporter: PeerSupporter) => {
    setSelectedSupporter(supporter);
    setViewState('supporter-detail');
  };

  const handleConnectFromDetail = async () => {
    if (!selectedSupporter) return;
    await handleConnect(selectedSupporter.id);
    setViewState('hub');
    setSelectedSupporter(null);
  };

  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchProfile(), refetchConversations()]);
  }, [refetchProfile, refetchConversations]);

  // ─── Not logged in ──────────────────────────────────────────────────────
  if (!user) {
    return (
      <NativePageWrapper
        title="Mental Health Mates"
        subtitle="Connect with someone who understands"
        icon={<Heart />}
        showBackButton={false}
      >
        <PageFrame>
          <EmptyState
            title="Sign in required"
            description="Please sign in to access Mental Health Mates and connect with peer supporters."
          />
        </PageFrame>
      </NativePageWrapper>
    );
  }

  // ─── Become Supporter View ──────────────────────────────────────────────
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

  // ─── Supporter Detail View ──────────────────────────────────────────────
  if (viewState === 'supporter-detail' && selectedSupporter) {
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
    const trainingTone =
      selectedSupporter.training_level === 'mhfa_certified'
        ? 'yellow'
        : selectedSupporter.training_level === 'trained'
          ? 'emerald'
          : 'blue';

    return (
      <NativePageWrapper
        title={selectedSupporter.display_name}
        subtitle="Peer Supporter"
        hideHeader
        showBackButton={false}
        collapsingHeader={false}
      >
        <PageFrame>
          <motion.div variants={itemVariants}>
            <TextAction
              onClick={() => {
                setViewState('hub');
                setSelectedSupporter(null);
              }}
              className="inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </TextAction>
          </motion.div>

          <motion.div variants={itemVariants}>
            <PageHero
              eyebrow="Peer supporter"
              title={selectedSupporter.display_name}
              description={
                responseTime ?? trainingLevelLabels[selectedSupporter.training_level]
              }
              tone="yellow"
              actions={
                <Pill tone={trainingTone}>
                  {trainingLevelLabels[selectedSupporter.training_level]}
                </Pill>
              }
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
              <InitialsAvatar
                name={selectedSupporter.display_name}
                imageUrl={selectedSupporter.avatar_url}
                size="lg"
                online
              />
              <div className="flex-1 min-w-0 space-y-4">
                {responseTime && (
                  <div className="inline-flex items-center gap-1.5 text-[12px] text-emerald-400">
                    <Zap className="w-3.5 h-3.5" />
                    {responseTime}
                  </div>
                )}
                {selectedSupporter.bio && (
                  <div>
                    <Eyebrow>About</Eyebrow>
                    <p className="mt-1.5 text-[13.5px] text-white/85 leading-relaxed">
                      {selectedSupporter.bio}
                    </p>
                  </div>
                )}
                {topics.length > 0 && (
                  <div>
                    <Eyebrow>Comfortable discussing</Eyebrow>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-[12px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/85"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatStrip
              columns={2}
              stats={[
                {
                  value: selectedSupporter.total_conversations,
                  label: 'Chats completed',
                  sub: 'Lifetime conversations',
                },
                {
                  value: 'Verified',
                  label: 'Status',
                  sub: 'Profile reviewed',
                },
              ]}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="border-l-2 border-amber-500/40 bg-[hsl(0_0%_12%)] rounded-r-xl px-5 py-4">
              <Eyebrow className="text-amber-400">Note</Eyebrow>
              <p className="mt-1.5 text-[13px] text-white/85 leading-relaxed">
                This is peer support, not professional therapy. All conversations are confidential.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="sticky bottom-0 pt-4 pb-safe bg-[hsl(0_0%_8%)]"
          >
            <PrimaryButton
              size="lg"
              fullWidth
              disabled={connectingId === selectedSupporter.id}
              onClick={handleConnectFromDetail}
            >
              {connectingId === selectedSupporter.id ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                `Start chat with ${selectedSupporter.display_name.split(' ')[0]}`
              )}
            </PrimaryButton>
          </motion.div>
        </PageFrame>
      </NativePageWrapper>
    );
  }

  // ─── Full-Page Chat View ────────────────────────────────────────────────
  if (viewState === 'chat' && selectedConversation) {
    return (
      <NativePageWrapper
        title={getChatPartnerName()}
        subtitle="Peer Support Chat"
        hideHeader
        showBackButton={false}
        collapsingHeader={false}
        contentClassName="p-0"
      >
        <div className="flex flex-col h-[calc(100vh-56px)] mx-auto max-w-3xl">
          {/* Editorial header */}
          <div className="px-4 pt-4 pb-4 bg-[hsl(0_0%_8%)] border-b border-white/[0.06]">
            <button
              onClick={handleCloseChat}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation mb-3"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <InitialsAvatar name={getChatPartnerName()} size="sm" />
              <div className="flex-1 min-w-0">
                <Eyebrow>Peer support chat</Eyebrow>
                <h2 className="mt-1 text-[18px] font-semibold tracking-tight text-white truncate leading-tight">
                  {getChatPartnerName()}
                </h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <PresenceIndicator
                    status={partnerPresenceStatus}
                    lastSeen={partnerPresence?.last_seen}
                    size="sm"
                  />
                  <span className="text-[10.5px] uppercase tracking-[0.14em] text-white/55">
                    {partnerPresenceStatus === 'online'
                      ? 'Online now'
                      : partnerPresenceStatus === 'away'
                        ? 'Away'
                        : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto momentum-scroll-y px-4 py-4 space-y-3 bg-[hsl(0_0%_8%)]">
            {chatMessages.length === 0 ? (
              <div className="text-center py-12">
                <InitialsAvatar
                  name={getChatPartnerName()}
                  size="md"
                  className="mx-auto mb-4"
                />
                <Eyebrow>Start the conversation</Eyebrow>
                <p className="mt-2 text-[13px] text-white/70 max-w-xs mx-auto leading-relaxed">
                  Say hello with a warm, supportive message.
                </p>
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
                            'text-[10px] tabular-nums',
                            isOwn ? 'text-black/60' : 'text-white/50'
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
            {isOtherTyping && (
              <div className="flex justify-start">
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                  <TypingIndicatorWithName
                    userName={getChatPartnerName()}
                    className="text-white/70"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
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

  // ─── Main Hub View ──────────────────────────────────────────────────────
  return (
    <NativePageWrapper
      title="Mental Health Mates"
      subtitle="Connect with someone who understands"
      hideHeader
      showBackButton={false}
      onRefresh={handleRefresh}
      collapsingHeader
      compactTitle
    >
      <PageFrame>
        {/* Back link */}
        <motion.div variants={itemVariants}>
          <TextAction
            onClick={() => (onClose ? onClose() : window.history.back())}
            className="inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </TextAction>
        </motion.div>

        {/* HERO */}
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Peer support"
            title="Mental Health Mates"
            description="A quiet space to talk to someone who gets it. No referrals, no waiting lists — just a conversation."
            tone="yellow"
          />
        </motion.div>

        {/* PUSH NOTIFICATIONS */}
        <motion.div variants={itemVariants}>
          <PushNotificationPrompt
            compact
            context="Get notified when your Mental Health Mate replies"
            delay={3000}
          />
        </motion.div>

        {/* STAT STRIP — only when registered */}
        {!profileLoading && myProfile && (
          <motion.div variants={itemVariants}>
            <StatStrip
              columns={3}
              stats={[
                {
                  value: myProfile.is_available ? 'Online' : 'Offline',
                  label: 'Your status',
                  sub: myProfile.is_available ? 'Available to help' : 'Not receiving requests',
                  tone: myProfile.is_available ? 'emerald' : undefined,
                },
                {
                  value: myProfile.total_conversations,
                  label: 'Total chats',
                  sub: 'Lifetime conversations',
                },
                {
                  value: activeChats,
                  label: 'Active now',
                  sub: unreadCount > 0 ? `${unreadCount} unread` : 'All caught up',
                  accent: unreadCount > 0,
                  onClick: () => setActiveTab('chats'),
                },
              ]}
            />
          </motion.div>
        )}

        {/* YOUR PROFILE — toggle row */}
        {!profileLoading && myProfile && (
          <motion.section variants={itemVariants} className="space-y-5">
            <SectionHeader eyebrow="Your profile" title="Availability" />
            <ListCard>
              <div className="flex items-center gap-4 px-5 sm:px-6 py-5">
                <InitialsAvatar
                  name={myProfile.display_name}
                  imageUrl={myProfile.avatar_url}
                  online={myProfile.is_available}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold tracking-tight text-white truncate">
                    {myProfile.display_name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={cn(
                        'inline-block w-1.5 h-1.5 rounded-full',
                        myProfile.is_available ? 'bg-emerald-400' : 'bg-white/30'
                      )}
                    />
                    <span className="text-[12px] text-white/70">
                      {myProfile.is_available ? 'Available to help' : 'Currently offline'}
                      {myProfile.last_active_at && (
                        <>
                          {' · last active '}
                          {formatDistanceToNow(new Date(myProfile.last_active_at), {
                            addSuffix: false,
                          })}
                        </>
                      )}
                    </span>
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
            </ListCard>
          </motion.section>
        )}

        {/* PROFILE SKELETON */}
        {profileLoading && (
          <motion.div variants={itemVariants}>
            <ListCard>
              <div className="flex items-center gap-4 px-5 sm:px-6 py-5">
                <Skeleton className="h-12 w-12 rounded-full bg-white/[0.06]" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 bg-white/[0.06]" />
                  <Skeleton className="h-3 w-48 bg-white/[0.06]" />
                </div>
                <Skeleton className="h-6 w-11 rounded-full bg-white/[0.06]" />
              </div>
            </ListCard>
          </motion.div>
        )}

        {/* BECOME A MATE — HubCard for non-supporters */}
        {!profileLoading && !myProfile && (
          <motion.section variants={itemVariants} className="space-y-5">
            <SectionHeader eyebrow="Get involved" title="Help others, when you can" />
            <HubGrid columns={1}>
              <HubCard
                number="01"
                eyebrow="Set up your profile"
                title="Become a Mental Health Mate"
                description="A short profile, the topics you're comfortable with, and you're set up to support others. No counselling experience needed."
                tone="yellow"
                meta="Takes ~2 minutes"
                cta="Get started"
                onClick={() => setViewState('become-supporter')}
              />
            </HubGrid>
          </motion.section>
        )}

        {/* TABS */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full w-fit">
            <button
              onClick={() => setActiveTab('browse')}
              className={cn(
                'px-4 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation',
                activeTab === 'browse'
                  ? 'bg-elec-yellow text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              Find support
            </button>
            <button
              onClick={() => setActiveTab('chats')}
              className={cn(
                'px-4 py-1.5 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation inline-flex items-center gap-1.5',
                activeTab === 'chats'
                  ? 'bg-elec-yellow text-black'
                  : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
              )}
            >
              My chats
              {unreadCount > 0 && (
                <span
                  className={cn(
                    'tabular-nums text-[11px] px-1.5 rounded-full',
                    activeTab === 'chats' ? 'bg-black/15 text-black' : 'bg-elec-yellow text-black'
                  )}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* TAB CONTENT — Find support */}
        {activeTab === 'browse' && (
          <motion.div variants={itemVariants}>
            <AvailableSupporters
              onConnect={handleConnect}
              onViewProfile={handleViewProfile}
              connectingId={connectingId}
              excludeUserId={user?.id}
            />
          </motion.div>
        )}

        {/* TAB CONTENT — My chats */}
        {activeTab === 'chats' && (
          <motion.section variants={itemVariants} className="space-y-5">
            <SectionHeader
              eyebrow={`My chats · ${activeChats}`}
              title="Your conversations"
            />
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
                description="Connect with a Mental Health Mate from the Find support tab to start chatting."
                action="Find someone to chat with"
                onAction={() => setActiveTab('browse')}
              />
            ) : (
              <ListCard>
                {conversations.map((convo) => {
                  const isActive = convo.status === 'active';
                  const partnerName =
                    convo.supporter?.user_id === user?.id
                      ? convo.seeker?.full_name?.split(' ')[0] || 'Mate'
                      : convo.supporter?.display_name || 'Supporter';
                  const partnerAvatar =
                    convo.supporter?.user_id === user?.id
                      ? null
                      : convo.supporter?.avatar_url;
                  const unread = (convo as any).unread_count > 0;
                  return (
                    <ListRow
                      key={convo.id}
                      onClick={isActive ? () => handleOpenChat(convo) : undefined}
                      className={!isActive ? 'opacity-50 pointer-events-none' : undefined}
                      lead={
                        <InitialsAvatar
                          name={partnerName}
                          imageUrl={partnerAvatar}
                          online={isActive}
                        />
                      }
                      title={
                        <span className="flex items-center gap-2">
                          <span className="truncate">{partnerName}</span>
                          {unread && <Pill tone="yellow">{(convo as any).unread_count} new</Pill>}
                        </span>
                      }
                      subtitle={
                        <span className="block truncate text-white/65">
                          {(convo as any).last_message ||
                            (isActive ? 'Start chatting…' : 'Conversation ended')}
                        </span>
                      }
                      trailing={
                        <span className="text-[10.5px] uppercase tracking-[0.12em] text-white/50 tabular-nums">
                          {formatConversationTime((convo as any).last_message_at)}
                        </span>
                      }
                    />
                  );
                })}
              </ListCard>
            )}
          </motion.section>
        )}

        {/* CRISIS LINE — left-rule editorial card */}
        <motion.div variants={itemVariants}>
          <div className="border-l-2 border-amber-500/40 bg-[hsl(0_0%_12%)] rounded-r-xl px-5 py-5">
            <Eyebrow className="text-amber-400">If you're in crisis</Eyebrow>
            <p className="mt-2 text-[13px] text-white/85 leading-relaxed">
              Mental Health Mates are peer supporters, not professional counsellors. Call{' '}
              <a href="tel:116123" className="text-elec-yellow font-semibold">
                116 123
              </a>{' '}
              (Samaritans) or text SHOUT to{' '}
              <span className="text-elec-yellow font-semibold">85258</span>.
            </p>
          </div>
        </motion.div>
      </PageFrame>
    </NativePageWrapper>
  );
};

export default PeerSupportHub;
