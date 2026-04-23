import { useState, useMemo, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import {
  Plus,
  Send,
  Pin,
  PinOff,
  Calendar as CalendarIcon,
  Loader2,
  RefreshCw,
  Trash2,
  Eye,
  EyeOff,
  MessageSquare,
  X,
} from 'lucide-react';
import {
  useCommunications,
  useCommunicationStats,
  useCommunicationRecipients,
  useCreateCommunication,
  usePinCommunication,
  useMarkAsRead,
  useAcknowledgeMessage,
  useDeleteCommunication,
} from '@/hooks/useCommunications';
import { useActiveEmployees } from '@/hooks/useEmployees';
import {
  Communication,
  CommunicationType,
  CommunicationPriority,
  TargetAudience,
} from '@/services/communicationService';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  GroupHeader,
  Divider,
  PrimaryButton,
  SecondaryButton,
  FormCard,
  Field,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  checkboxClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

const typeMapping: Record<CommunicationType, string> = {
  announcement: 'Team Broadcast',
  message: 'Job Message',
  alert: 'Safety Warning',
};

const reverseTypeMapping: Record<string, CommunicationType> = {
  'Team Broadcast': 'announcement',
  'Job Message': 'message',
  'Safety Warning': 'alert',
  'Mandatory Reading': 'announcement',
};

const templates = [
  { id: 'safety', name: 'Safety Alert', type: 'Safety Warning', preview: 'Important safety notice regarding...' },
  { id: 'brief', name: 'Team Brief', type: 'Team Broadcast', preview: 'Weekly update from management...' },
  { id: 'job', name: 'Job Update', type: 'Job Message', preview: 'Update on job progress...' },
  { id: 'mandatory', name: 'Policy Update', type: 'Mandatory Reading', preview: 'Please review and acknowledge...' },
];

const typeLabels: Record<string, string> = {
  'Job Message': 'Job',
  'Safety Warning': 'Safety',
  'Team Broadcast': 'Brief',
  'Mandatory Reading': 'Required',
};

const getDisplayType = (comm: Communication): string => {
  if (comm.priority === 'urgent' || comm.priority === 'high') {
    if (comm.type === 'alert') return 'Safety Warning';
    return 'Mandatory Reading';
  }
  return typeMapping[comm.type] || 'Team Broadcast';
};

const getInitials = (str: string): string => {
  if (!str) return '?';
  const parts = str.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const CommunicationsSection = () => {
  const isMobile = useIsMobile();

  const { data: communications = [], isLoading, refetch, isRefetching } = useCommunications();
  const { data: stats } = useCommunicationStats();
  const { data: employees = [] } = useActiveEmployees();
  const createCommunication = useCreateCommunication();
  const pinCommunication = usePinCommunication();
  const markAsReadMutation = useMarkAsRead();
  const acknowledgeMutation = useAcknowledgeMessage();
  const deleteCommunication = useDeleteCommunication();

  const [recipientsMessageId, setRecipientsMessageId] = useState<string | null>(null);
  const { data: recipients = [] } = useCommunicationRecipients(recipientsMessageId || '');

  const [localReadIds, setLocalReadIds] = useState<Set<string>>(new Set());
  const [localAcknowledgedIds, setLocalAcknowledgedIds] = useState<Set<string>>(new Set());

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('inbox');
  const [filterUnread, setFilterUnread] = useState(false);
  const [pinnedOpen, setPinnedOpen] = useState(true);

  const [selectedMessage, setSelectedMessage] = useState<Communication | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReplySheet, setShowReplySheet] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const [showCompose, setShowCompose] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('Team Broadcast');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>();
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [priority, setPriority] = useState<'normal' | 'high'>('normal');
  const [recipientMode, setRecipientMode] = useState<'all' | 'specific'>('all');

  const [swipingId, setSwipingId] = useState<string | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleRefresh = async () => {
    await refetch();
    toast({ title: 'Refreshed', description: 'Messages updated' });
  };

  const filteredComms = useMemo(() => {
    let filtered = communications.filter((comm) => {
      const matchesSearch =
        comm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.content.toLowerCase().includes(searchQuery.toLowerCase());

      const displayType = getDisplayType(comm);

      if (activeTab === 'inbox') return matchesSearch;
      if (activeTab === 'briefs') return matchesSearch && displayType === 'Team Broadcast';
      if (activeTab === 'safety') return matchesSearch && displayType === 'Safety Warning';
      if (activeTab === 'mandatory')
        return matchesSearch && (displayType === 'Mandatory Reading' || comm.priority === 'urgent');
      return matchesSearch;
    });

    if (filterUnread) {
      filtered = filtered.filter((c) => !localReadIds.has(c.id));
    }

    return filtered;
  }, [communications, searchQuery, activeTab, filterUnread, localReadIds]);

  const groupedMessages = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];

    const groups: { label: string; messages: Communication[] }[] = [
      { label: 'Today', messages: [] },
      { label: 'Yesterday', messages: [] },
      { label: 'This week', messages: [] },
      { label: 'Earlier', messages: [] },
    ];

    const pinnedMessages = activeTab === 'inbox' ? filteredComms.filter((c) => c.is_pinned) : [];
    const unpinnedMessages = filteredComms.filter((c) => !c.is_pinned || activeTab !== 'inbox');

    unpinnedMessages.forEach((comm) => {
      const commDate = comm.created_at.split('T')[0];
      if (commDate >= today) groups[0].messages.push(comm);
      else if (commDate >= yesterday) groups[1].messages.push(comm);
      else if (commDate >= weekAgo) groups[2].messages.push(comm);
      else groups[3].messages.push(comm);
    });

    return { pinned: pinnedMessages, groups: groups.filter((g) => g.messages.length > 0) };
  }, [filteredComms, activeTab]);

  const displayStats = useMemo(
    () => ({
      total: stats?.totalAnnouncements ?? communications.length,
      unread: stats?.unreadCount ?? communications.filter((c) => !localReadIds.has(c.id)).length,
      mandatoryPending: communications.filter(
        (c) => (c.priority === 'urgent' || c.priority === 'high') && !localAcknowledgedIds.has(c.id)
      ).length,
      safetyWarnings: communications.filter((c) => c.type === 'alert').length,
    }),
    [stats, communications, localReadIds, localAcknowledgedIds]
  );

  const togglePin = useCallback(
    async (id: string, currentPinned: boolean) => {
      try {
        await pinCommunication.mutateAsync({ id, isPinned: !currentPinned });
        toast({ title: currentPinned ? 'Unpinned' : 'Pinned' });
      } catch {
        toast({
          title: 'Error',
          description: 'Failed to update pin status',
          variant: 'destructive',
        });
      }
    },
    [pinCommunication]
  );

  const toggleRead = useCallback((id: string) => {
    setLocalReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast({ title: 'Marked unread' });
      } else {
        next.add(id);
        toast({ title: 'Marked read' });
      }
      return next;
    });
  }, []);

  const deleteMessage = useCallback(
    async (id: string) => {
      try {
        await deleteCommunication.mutateAsync(id);
        setShowDetail(false);
        toast({ title: 'Deleted' });
      } catch {
        toast({ title: 'Error', description: 'Failed to delete message', variant: 'destructive' });
      }
    },
    [deleteCommunication]
  );

  const signOff = useCallback((id: string) => {
    setLocalAcknowledgedIds((prev) => new Set([...prev, id]));
    setLocalReadIds((prev) => new Set([...prev, id]));
    toast({ title: 'Signed off', description: 'Acknowledged' });
  }, []);

  const handleReply = useCallback(async () => {
    if (!selectedMessage || !replyContent.trim()) return;

    try {
      const isReplyToSpecific = selectedMessage.sender_id != null;

      await createCommunication.mutateAsync({
        type: 'message',
        title: `Re: ${selectedMessage.title}`,
        content: replyContent,
        priority: 'normal',
        target_audience: isReplyToSpecific ? 'specific' : selectedMessage.target_audience,
        target_employee_ids:
          isReplyToSpecific && selectedMessage.sender_id
            ? [selectedMessage.sender_id]
            : selectedMessage.target_employee_ids,
        is_pinned: false,
        expires_at: null,
        sender_id: null,
        attachments: null,
      });

      toast({
        title: 'Reply sent',
        description: 'Your reply has been sent.',
      });
      setReplyContent('');
      setShowReplySheet(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send reply. Please try again.',
        variant: 'destructive',
      });
    }
  }, [selectedMessage, replyContent, createCommunication]);

  const openMessage = useCallback((comm: Communication) => {
    setSelectedMessage(comm);
    setRecipientsMessageId(comm.id);
    setShowDetail(true);
    setLocalReadIds((prev) => new Set([...prev, comm.id]));
  }, []);

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setSwipingId(id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipingId) return;

    const diffX = e.touches[0].clientX - touchStartX.current;
    const diffY = e.touches[0].clientY - touchStartY.current;

    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 10) {
      setSwipingId(null);
      setSwipeOffset(0);
      return;
    }

    const resistance = Math.abs(diffX) > 80 ? 0.3 : 1;
    const newOffset = diffX * resistance;
    setSwipeOffset(Math.max(-120, Math.min(120, newOffset)));
  };

  const handleTouchEnd = () => {
    if (!swipingId) return;

    if (swipeOffset > 70) {
      toggleRead(swipingId);
    } else if (swipeOffset < -70) {
      deleteMessage(swipingId);
    }

    setSwipingId(null);
    setSwipeOffset(0);
  };

  const handleSendMessage = async () => {
    if (!messageTitle.trim() || !messageContent.trim()) {
      toast({
        title: 'Missing info',
        description: 'Add a title and message',
        variant: 'destructive',
      });
      return;
    }

    const recipientCount = recipientMode === 'all' ? employees.length : selectedRecipients.length;
    if (recipientCount === 0) {
      toast({ title: 'No recipients', description: 'Select at least one', variant: 'destructive' });
      return;
    }

    try {
      const targetAudience: TargetAudience = recipientMode === 'all' ? 'all' : 'specific';
      const commType: CommunicationType = reverseTypeMapping[selectedType] || 'announcement';
      const commPriority: CommunicationPriority =
        selectedType === 'Mandatory Reading'
          ? 'urgent'
          : selectedType === 'Safety Warning'
            ? 'high'
            : priority;

      await createCommunication.mutateAsync({
        type: commType,
        title: messageTitle,
        content: messageContent,
        priority: commPriority,
        target_audience: targetAudience,
        target_employee_ids: recipientMode === 'specific' ? selectedRecipients : null,
        is_pinned: isPinned,
        expires_at: isScheduled && scheduleDate ? scheduleDate.toISOString() : null,
        sender_id: null,
        attachments: null,
      });

      const scheduleInfo =
        isScheduled && scheduleDate
          ? ` for ${format(scheduleDate, 'dd MMM')} at ${scheduleTime}`
          : '';

      toast({
        title: isScheduled ? 'Scheduled' : 'Sent',
        description: `${recipientCount} recipients${scheduleInfo}`,
      });
      setShowCompose(false);
      resetCompose();
    } catch {
      toast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' });
    }
  };

  const resetCompose = () => {
    setSelectedRecipients([]);
    setMessageTitle('');
    setMessageContent('');
    setSelectedType('Team Broadcast');
    setIsPinned(false);
    setIsScheduled(false);
    setScheduleDate(undefined);
    setScheduleTime('09:00');
    setPriority('normal');
    setRecipientMode('all');
  };

  const handleUseTemplate = (template: (typeof templates)[0]) => {
    setSelectedType(template.type);
    setMessageContent(template.preview);
    setMessageTitle(template.name);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const commDate = dateStr.split('T')[0];

    if (commDate === today) return format(date, 'HH:mm');
    if (commDate === yesterday) return 'Yesterday';
    return format(date, 'dd MMM');
  };

  const tabs = [
    { value: 'inbox', label: 'Inbox' },
    { value: 'briefs', label: 'Briefs' },
    { value: 'safety', label: 'Safety' },
    { value: 'mandatory', label: 'Sign' },
  ];

  const renderRow = (comm: Communication) => {
    const displayType = getDisplayType(comm);
    const isRead = localReadIds.has(comm.id);
    const isPinnedMsg = comm.is_pinned;
    const isSignedOff = localAcknowledgedIds.has(comm.id);
    const isHighPriority = comm.priority === 'high' || comm.priority === 'urgent';

    const trailing = (
      <>
        {isHighPriority && <Pill tone="red">Urgent</Pill>}
        {displayType === 'Mandatory Reading' && !isSignedOff && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              signOff(comm.id);
            }}
            className="h-9 px-3 rounded-full bg-elec-yellow text-black text-[12px] font-semibold touch-manipulation"
          >
            Sign
          </button>
        )}
        {displayType === 'Mandatory Reading' && isSignedOff && <Pill tone="emerald">Done</Pill>}
        <span className="text-[11px] text-white tabular-nums">{formatTime(comm.created_at)}</span>
      </>
    );

    const titleNode = (
      <span className="flex items-center gap-1.5">
        {isPinnedMsg && <Pin className="h-3 w-3 text-elec-yellow shrink-0" />}
        <span className="truncate">{comm.title}</span>
      </span>
    );

    return (
      <div
        key={comm.id}
        className="relative overflow-hidden"
        onTouchStart={(e) => handleTouchStart(e, comm.id)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{ transform: swipingId === comm.id ? `translateX(${swipeOffset}px)` : undefined }}
        >
          <ListRow
            accent={!isRead ? 'yellow' : undefined}
            lead={
              <Avatar
                initials={getInitials(comm.title)}
              />
            }
            title={titleNode}
            subtitle={`${typeLabels[displayType] ?? displayType} \u00B7 ${comm.content.slice(0, 80)}`}
            trailing={trailing}
            onClick={() => openMessage(comm)}
          />
        </div>
      </div>
    );
  };

  const heroActions = (
    <>
      <PrimaryButton onClick={() => setShowCompose(true)}>New announcement</PrimaryButton>
      <IconButton onClick={handleRefresh} disabled={isRefetching} aria-label="Refresh">
        <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
      </IconButton>
    </>
  );

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="People"
          title="Communications"
          description="Team chat, channels and announcements."
          tone="purple"
          actions={heroActions}
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="People"
        title="Communications"
        description="Team chat, channels and announcements."
        tone="purple"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Unread', value: displayStats.unread, tone: 'yellow' },
          { label: 'Briefs', value: displayStats.total, tone: 'purple' },
          { label: 'Safety', value: displayStats.safetyWarnings, tone: 'blue' },
          { label: 'To sign', value: displayStats.mandatoryPending, tone: 'emerald' },
        ]}
      />

      <FilterBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search messages..."
        actions={
          <button
            onClick={() => setFilterUnread(!filterUnread)}
            className={`h-10 px-4 rounded-full border text-[13px] font-medium touch-manipulation transition-colors ${
              filterUnread
                ? 'bg-elec-yellow text-black border-elec-yellow'
                : 'bg-[hsl(0_0%_12%)] text-white border-white/[0.08]'
            }`}
          >
            Unread only
          </button>
        }
      />

      {filteredComms.length === 0 ? (
        <EmptyState
          title="All caught up"
          description="Your inbox is empty. Send a new announcement to keep the team in the loop."
          action="New announcement"
          onAction={() => setShowCompose(true)}
        />
      ) : (
        <div className="space-y-6">
          {groupedMessages.pinned.length > 0 && (
            <ListCard>
              <GroupHeader
                tone="yellow"
                label="Pinned"
                count={groupedMessages.pinned.length}
                open={pinnedOpen}
                onClick={() => setPinnedOpen(!pinnedOpen)}
              />
              {pinnedOpen && <ListBody>{groupedMessages.pinned.map(renderRow)}</ListBody>}
            </ListCard>
          )}

          {groupedMessages.groups.map((group) => (
            <ListCard key={group.label}>
              <ListCardHeader
                tone="purple"
                title={group.label}
                meta={<Pill tone="purple">{group.messages.length}</Pill>}
              />
              <ListBody>{group.messages.map(renderRow)}</ListBody>
            </ListCard>
          ))}
        </div>
      )}

      {isMobile ? (
        <button
          onClick={() => setShowCompose(true)}
          aria-label="New announcement"
          className="h-14 w-14 rounded-full shadow-lg fixed bottom-20 right-4 z-50 bg-elec-yellow text-black flex items-center justify-center touch-manipulation"
        >
          <Plus className="h-6 w-6" />
        </button>
      ) : null}

      <MessageDetailSheet
        open={showDetail}
        onOpenChange={setShowDetail}
        selectedMessage={selectedMessage}
        recipients={recipients}
        localReadIds={localReadIds}
        localAcknowledgedIds={localAcknowledgedIds}
        togglePin={togglePin}
        toggleRead={toggleRead}
        deleteMessage={deleteMessage}
        signOff={signOff}
        openReply={() => setShowReplySheet(true)}
        pinPending={pinCommunication.isPending}
        deletePending={deleteCommunication.isPending}
      />

      <ComposeSheet
        open={showCompose}
        onOpenChange={setShowCompose}
        templates={templates}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        messageTitle={messageTitle}
        setMessageTitle={setMessageTitle}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        recipientMode={recipientMode}
        setRecipientMode={setRecipientMode}
        selectedRecipients={selectedRecipients}
        setSelectedRecipients={setSelectedRecipients}
        employees={employees}
        priority={priority}
        setPriority={setPriority}
        isPinned={isPinned}
        setIsPinned={setIsPinned}
        isScheduled={isScheduled}
        setIsScheduled={setIsScheduled}
        scheduleDate={scheduleDate}
        setScheduleDate={setScheduleDate}
        scheduleTime={scheduleTime}
        setScheduleTime={setScheduleTime}
        handleSendMessage={handleSendMessage}
        sendPending={createCommunication.isPending}
        handleUseTemplate={handleUseTemplate}
      />

      <ReplySheet
        open={showReplySheet}
        onOpenChange={setShowReplySheet}
        selectedMessage={selectedMessage}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
        handleReply={handleReply}
        sendPending={createCommunication.isPending}
      />
    </PageFrame>
  );
};

interface MessageDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMessage: Communication | null;
  recipients: Array<{
    id: string;
    read_at: string | null;
    acknowledged_at: string | null;
    employee?: { name?: string; photo_url?: string | null } | null;
  }>;
  localReadIds: Set<string>;
  localAcknowledgedIds: Set<string>;
  togglePin: (id: string, currentPinned: boolean) => void;
  toggleRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  signOff: (id: string) => void;
  openReply: () => void;
  pinPending: boolean;
  deletePending: boolean;
}

const MessageDetailSheet = ({
  open,
  onOpenChange,
  selectedMessage,
  recipients,
  localReadIds,
  localAcknowledgedIds,
  togglePin,
  toggleRead,
  deleteMessage,
  signOff,
  openReply,
  pinPending,
  deletePending,
}: MessageDetailSheetProps) => {
  if (!selectedMessage) return null;

  const displayType = getDisplayType(selectedMessage);
  const isPinnedMsg = selectedMessage.is_pinned;
  const isRead = localReadIds.has(selectedMessage.id);
  const isSignedOff = localAcknowledgedIds.has(selectedMessage.id);
  const isHighPriority =
    selectedMessage.priority === 'high' || selectedMessage.priority === 'urgent';

  const readCount = recipients.filter((r) => r.read_at).length;
  const signedCount = recipients.filter((r) => r.acknowledged_at).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[95vh] p-0 rounded-t-3xl bg-[hsl(0_0%_10%)] border-white/[0.06]"
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="px-5 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              {typeLabels[displayType] ?? displayType}
            </span>
            {isHighPriority && <Pill tone="red">Urgent</Pill>}
            {isPinnedMsg && <Pill tone="yellow">Pinned</Pill>}
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mt-2 leading-tight tracking-tight">
            {selectedMessage.title}
          </h2>
          <div className="flex items-center gap-2 mt-2 text-[12px] text-white">
            <span>{format(new Date(selectedMessage.created_at), "dd MMM yyyy 'at' HH:mm")}</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(95vh-220px)]">
          <div className="p-5 space-y-5">
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4">
              <p className="text-[14px] text-white leading-relaxed whitespace-pre-wrap">
                {selectedMessage.content}
              </p>
            </div>

            {displayType === 'Mandatory Reading' && !isSignedOff && (
              <ListCard>
                <ListCardHeader tone="amber" title="Acknowledgement required" />
                <div className="p-5 space-y-3">
                  <p className="text-[13px] text-white">
                    Confirm you have read and understood this message.
                  </p>
                  <button
                    onClick={() => signOff(selectedMessage.id)}
                    className="h-11 w-full rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation"
                  >
                    I acknowledge
                  </button>
                </div>
              </ListCard>
            )}

            {isSignedOff && displayType === 'Mandatory Reading' && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                <Pill tone="emerald">Signed</Pill>
                <span className="text-[13px] text-white">You have signed off</span>
              </div>
            )}

            <ListCard>
              <ListCardHeader
                tone="blue"
                title="Audience"
                meta={
                  <Pill tone="blue">
                    {selectedMessage.target_audience === 'all'
                      ? 'All team'
                      : selectedMessage.target_audience === 'managers'
                        ? 'Managers'
                        : `${selectedMessage.target_employee_ids?.length || 0} selected`}
                  </Pill>
                }
              />
            </ListCard>

            {recipients.length > 0 && (
              <ListCard>
                <ListCardHeader
                  tone="emerald"
                  title="Recipients"
                  meta={
                    <div className="flex items-center gap-2">
                      <Pill tone="emerald">{readCount} read</Pill>
                      <Pill tone="blue">{signedCount} signed</Pill>
                    </div>
                  }
                />
                <ListBody>
                  {recipients.map((recipient) => (
                    <ListRow
                      key={recipient.id}
                      lead={<Avatar initials={getInitials(recipient.employee?.name || '?')} />}
                      title={recipient.employee?.name || 'Unknown'}
                      trailing={
                        recipient.acknowledged_at ? (
                          <Pill tone="blue">Signed</Pill>
                        ) : recipient.read_at ? (
                          <Pill tone="emerald">Read</Pill>
                        ) : (
                          <Pill tone="amber">Sent</Pill>
                        )
                      }
                    />
                  ))}
                </ListBody>
              </ListCard>
            )}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[hsl(0_0%_10%)]/95 backdrop-blur-sm border-t border-white/[0.06] pb-safe">
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => togglePin(selectedMessage.id, isPinnedMsg)}
              disabled={pinPending}
              className="h-12 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] text-white flex flex-col items-center justify-center gap-0.5 hover:bg-[hsl(0_0%_15%)] transition-colors disabled:opacity-50 touch-manipulation"
            >
              {isPinnedMsg ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
              <span className="text-[10px] font-medium">{isPinnedMsg ? 'Unpin' : 'Pin'}</span>
            </button>
            <button
              onClick={() => toggleRead(selectedMessage.id)}
              className="h-12 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] text-white flex flex-col items-center justify-center gap-0.5 hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
            >
              {isRead ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="text-[10px] font-medium">{isRead ? 'Unread' : 'Read'}</span>
            </button>
            <button
              onClick={openReply}
              className="h-12 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] text-white flex flex-col items-center justify-center gap-0.5 hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-[10px] font-medium">Reply</span>
            </button>
            <button
              onClick={() => deleteMessage(selectedMessage.id)}
              disabled={deletePending}
              className="h-12 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] text-white flex flex-col items-center justify-center gap-0.5 hover:bg-[hsl(0_0%_15%)] transition-colors disabled:opacity-50 touch-manipulation"
            >
              {deletePending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              <span className="text-[10px] font-medium">Delete</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface ComposeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: typeof templates;
  selectedType: string;
  setSelectedType: (v: string) => void;
  messageTitle: string;
  setMessageTitle: (v: string) => void;
  messageContent: string;
  setMessageContent: (v: string) => void;
  recipientMode: 'all' | 'specific';
  setRecipientMode: (v: 'all' | 'specific') => void;
  selectedRecipients: string[];
  setSelectedRecipients: (v: string[]) => void;
  employees: Array<{ id: string; name: string }>;
  priority: 'normal' | 'high';
  setPriority: (v: 'normal' | 'high') => void;
  isPinned: boolean;
  setIsPinned: (v: boolean) => void;
  isScheduled: boolean;
  setIsScheduled: (v: boolean) => void;
  scheduleDate: Date | undefined;
  setScheduleDate: (v: Date | undefined) => void;
  scheduleTime: string;
  setScheduleTime: (v: string) => void;
  handleSendMessage: () => void;
  sendPending: boolean;
  handleUseTemplate: (template: (typeof templates)[0]) => void;
}

const ComposeSheet = ({
  open,
  onOpenChange,
  templates,
  selectedType,
  setSelectedType,
  messageTitle,
  setMessageTitle,
  messageContent,
  setMessageContent,
  recipientMode,
  setRecipientMode,
  selectedRecipients,
  setSelectedRecipients,
  employees,
  priority,
  setPriority,
  isPinned,
  setIsPinned,
  isScheduled,
  setIsScheduled,
  scheduleDate,
  setScheduleDate,
  scheduleTime,
  setScheduleTime,
  handleSendMessage,
  sendPending,
  handleUseTemplate,
}: ComposeSheetProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      side="bottom"
      className="h-[100vh] p-0 bg-[hsl(0_0%_10%)] border-white/[0.06]"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <button
          onClick={() => onOpenChange(false)}
          className="h-10 px-3 rounded-full text-white text-[13px] font-medium touch-manipulation"
        >
          Cancel
        </button>
        <h3 className="text-[14px] font-semibold text-white">New announcement</h3>
        <button
          onClick={handleSendMessage}
          disabled={sendPending}
          className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:opacity-50 flex items-center gap-1.5"
        >
          {sendPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send
        </button>
      </div>

      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.18em] text-white">
              Quick start
            </Label>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4">
              {templates.map((template) => {
                const isSelected =
                  selectedType === template.type && messageTitle === template.name;
                return (
                  <button
                    key={template.id}
                    className={`flex-shrink-0 h-11 px-4 rounded-full border text-[13px] font-medium touch-manipulation transition-colors ${
                      isSelected
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-[hsl(0_0%_12%)] text-white border-white/[0.08]'
                    }`}
                    onClick={() => handleUseTemplate(template)}
                  >
                    {template.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.18em] text-white">Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {(['Job Message', 'Safety Warning', 'Team Broadcast', 'Mandatory Reading'] as const).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`h-12 rounded-2xl border text-[13px] font-medium touch-manipulation transition-colors ${
                      selectedType === type
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-[hsl(0_0%_12%)] text-white border-white/[0.06]'
                    }`}
                  >
                    {typeLabels[type]}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.18em] text-white">Title</Label>
            <Input
              placeholder="Message title..."
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] uppercase tracking-[0.18em] text-white">Message</Label>
              <span className="text-[11px] text-white tabular-nums">
                {messageContent.length}/500
              </span>
            </div>
            <Textarea
              placeholder="Write your message..."
              className={`${textareaClass} min-h-[140px]`}
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value.slice(0, 500))}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] uppercase tracking-[0.18em] text-white">
                Recipients
              </Label>
              {(recipientMode === 'all' || selectedRecipients.length > 0) && (
                <Pill tone="purple">
                  {recipientMode === 'all' ? employees.length : selectedRecipients.length} selected
                </Pill>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setRecipientMode('all');
                  setSelectedRecipients([]);
                }}
                className={`h-11 rounded-2xl border text-[13px] font-medium touch-manipulation transition-colors ${
                  recipientMode === 'all'
                    ? 'bg-elec-yellow text-black border-elec-yellow'
                    : 'bg-[hsl(0_0%_12%)] text-white border-white/[0.06]'
                }`}
              >
                All team
              </button>
              <button
                onClick={() => setRecipientMode('specific')}
                className={`h-11 rounded-2xl border text-[13px] font-medium touch-manipulation transition-colors ${
                  recipientMode === 'specific'
                    ? 'bg-elec-yellow text-black border-elec-yellow'
                    : 'bg-[hsl(0_0%_12%)] text-white border-white/[0.06]'
                }`}
              >
                Select
              </button>
            </div>

            {recipientMode === 'specific' && (
              <ListCard>
                <ListBody>
                  {employees.length === 0 ? (
                    <div className="px-5 py-6 text-center text-[13px] text-white">
                      No employees found
                    </div>
                  ) : (
                    employees.map((emp) => {
                      const isChecked = selectedRecipients.includes(emp.id);
                      return (
                        <ListRow
                          key={emp.id}
                          lead={
                            <Checkbox
                              id={`recipient-${emp.id}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedRecipients([...selectedRecipients, emp.id]);
                                } else {
                                  setSelectedRecipients(
                                    selectedRecipients.filter((id) => id !== emp.id)
                                  );
                                }
                              }}
                              className={checkboxClass}
                            />
                          }
                          title={emp.name}
                          onClick={() => {
                            if (isChecked) {
                              setSelectedRecipients(selectedRecipients.filter((id) => id !== emp.id));
                            } else {
                              setSelectedRecipients([...selectedRecipients, emp.id]);
                            }
                          }}
                        />
                      );
                    })
                  )}
                </ListBody>
              </ListCard>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] uppercase tracking-[0.18em] text-white">Options</Label>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
              <span className="text-[13px] font-medium text-white">High priority</span>
              <Checkbox
                checked={priority === 'high'}
                onCheckedChange={(checked) => setPriority(checked ? 'high' : 'normal')}
                className={checkboxClass}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
              <span className="text-[13px] font-medium text-white">Pin message</span>
              <Checkbox
                checked={isPinned}
                onCheckedChange={(checked) => setIsPinned(!!checked)}
                className={checkboxClass}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                <span className="text-[13px] font-medium text-white">Schedule</span>
                <Checkbox
                  checked={isScheduled}
                  onCheckedChange={(checked) => setIsScheduled(!!checked)}
                  className={checkboxClass}
                />
              </div>

              {isScheduled && (
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-11 justify-start gap-2 rounded-2xl bg-[hsl(0_0%_10%)] border-white/[0.08] text-white hover:bg-[hsl(0_0%_14%)] hover:text-white touch-manipulation"
                      >
                        <CalendarIcon className="h-4 w-4" />
                        {scheduleDate ? format(scheduleDate, 'dd MMM') : 'Date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={scheduleDate}
                        onSelect={setScheduleDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Select value={scheduleTime} onValueChange={setScheduleTime}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {[
                        '06:00',
                        '07:00',
                        '08:00',
                        '09:00',
                        '10:00',
                        '11:00',
                        '12:00',
                        '13:00',
                        '14:00',
                        '15:00',
                        '16:00',
                        '17:00',
                        '18:00',
                      ].map((time) => (
                        <SelectItem key={time} value={time} className="text-white">
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          <div className="h-8" />
        </div>
      </ScrollArea>
    </SheetContent>
  </Sheet>
);

interface ReplySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMessage: Communication | null;
  replyContent: string;
  setReplyContent: (v: string) => void;
  handleReply: () => void;
  sendPending: boolean;
}

const ReplySheet = ({
  open,
  onOpenChange,
  selectedMessage,
  replyContent,
  setReplyContent,
  handleReply,
  sendPending,
}: ReplySheetProps) => (
  <Sheet open={open} onOpenChange={onOpenChange}>
    <SheetContent
      side="bottom"
      className="h-[55vh] p-0 rounded-t-3xl bg-[hsl(0_0%_10%)] border-white/[0.06]"
    >
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-10 h-1 rounded-full bg-white/20" />
      </div>

      <div className="flex items-center justify-between px-4 pb-3 border-b border-white/[0.06]">
        <button
          onClick={() => onOpenChange(false)}
          className="h-10 px-3 rounded-full text-white text-[13px] font-medium touch-manipulation"
        >
          Cancel
        </button>
        <h3 className="text-[14px] font-semibold text-white truncate max-w-[60%]">
          Reply: {selectedMessage?.title}
        </h3>
        <button
          onClick={handleReply}
          disabled={!replyContent.trim() || sendPending}
          className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold touch-manipulation disabled:opacity-50 flex items-center gap-1.5"
        >
          {sendPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-[0.18em] text-white mb-2">
            Replying to
          </div>
          <p className="text-[13px] text-white line-clamp-3">{selectedMessage?.content}</p>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-[0.18em] text-white">Your reply</Label>
          <Textarea
            placeholder="Type your reply..."
            className={`${textareaClass} min-h-[120px]`}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            autoFocus
          />
        </div>
      </div>
    </SheetContent>
  </Sheet>
);
