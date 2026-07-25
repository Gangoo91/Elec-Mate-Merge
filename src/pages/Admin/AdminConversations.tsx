import { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import PullToRefresh from '@/components/admin/PullToRefresh';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { RefreshCw, Trash2, ThumbsUp, AlertTriangle, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
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
  LoadingBlocks,
  EmptyState,
  type Tone,
} from '@/components/admin/editorial';

const CATEGORY_TONE: Record<string, Tone> = {
  general: 'blue',
  technical: 'yellow',
  jobs: 'green',
  study: 'amber',
};

const categoryTone = (category: string | null): Tone => CATEGORY_TONE[category || ''] || 'cyan';

function getInitials(name?: string | null): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface ChatMessage {
  id: string;
  author_id: string;
  author_name: string;
  author_avatar: string | null;
  content: string;
  category: string | null;
  upvotes: number;
  created_at: string;
  updated_at: string;
}

export default function AdminConversations() {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  // Inline two-step confirm in the sheet footer. Deliberately NOT a nested
  // AlertDialog — stacking a second Radix modal over the open Sheet froze the
  // whole app in Elec-ID moderation (2026-07-25).
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const isSuperAdmin = profile?.admin_role === 'super_admin';

  // Fetch chat stats via edge function
  const { data: stats } = useQuery({
    queryKey: ['admin-chat-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-manage-conversations', {
        body: { action: 'stats' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as { total: number; today: number; categories: number };
    },
    staleTime: 2 * 60 * 1000,
    refetchInterval: 30000,
  });

  // Fetch messages via edge function
  const {
    data: messages,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['admin-chat-messages', search, categoryFilter],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('admin-manage-conversations', {
        body: { action: 'list', category: categoryFilter, limit: 100 },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      let filtered = (data?.messages || []) as ChatMessage[];
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.content?.toLowerCase().includes(searchLower) ||
            m.author_name?.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
    },
    staleTime: 2 * 60 * 1000,
  });

  // Get unique categories from messages - memoized to avoid recreation
  const categories = useMemo(
    () => [...new Set(messages?.map((m) => m.category).filter(Boolean))] as string[],
    [messages]
  );

  // Delete message mutation via edge function
  const deleteMessageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke('admin-manage-conversations', {
        body: { action: 'delete', messageId: id },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-chat-messages'] });
      queryClient.invalidateQueries({ queryKey: ['admin-chat-stats'] });
      setConfirmingDelete(false);
      setSelectedMessage(null);
      toast({
        title: 'Message deleted',
        description: 'The message has been removed.',
      });
    },
    onError: (error) => {
      haptic.error();
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Memoized callback for message click
  const handleMessageClick = useCallback((message: ChatMessage) => {
    setSelectedMessage(message);
    setConfirmingDelete(false);
  }, []);

  const filterTabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: messages?.length },
      ...categories.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) })),
    ],
    [categories, messages?.length]
  );

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Moderation"
          title="Conversations"
          description="Global chat messages across the community."
          tone="blue"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Refresh messages">
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
            </IconButton>
          }
        />

        <StatStrip
          columns={3}
          stats={[
            { label: 'Total messages', value: stats?.total || 0, accent: true },
            { label: 'Today', value: stats?.today || 0, tone: 'emerald' },
            { label: 'Categories', value: stats?.categories || 0, tone: 'amber' },
          ]}
        />

        <FilterBar
          tabs={filterTabs}
          activeTab={categoryFilter}
          onTabChange={setCategoryFilter}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search messages or authors…"
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : !messages || messages.length === 0 ? (
          <EmptyState
            title="No messages found"
            description="Chat messages will appear here as the community talks."
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Messages"
              meta={<Pill tone="blue">{messages.length}</Pill>}
            />
            <ListBody>
              {messages.map((message) => (
                <ListRow
                  key={message.id}
                  lead={<Avatar initials={getInitials(message.author_name)} />}
                  title={message.author_name || 'Unknown'}
                  subtitle={
                    <span className="flex items-center gap-2">
                      <span className="truncate">{message.content}</span>
                      <span className="text-white/30">·</span>
                      <span className="shrink-0">
                        {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                      </span>
                    </span>
                  }
                  trailing={
                    <>
                      {message.upvotes > 0 && (
                        <span className="hidden sm:flex items-center gap-1 text-[12px] text-white/70 tabular-nums">
                          <ThumbsUp className="h-3 w-3" />
                          {message.upvotes}
                        </span>
                      )}
                      <Pill tone={categoryTone(message.category)}>
                        {message.category || 'none'}
                      </Pill>
                    </>
                  }
                  onClick={() => handleMessageClick(message)}
                />
              ))}
            </ListBody>
          </ListCard>
        )}

        {/* Message Detail Sheet */}
        <Sheet
          open={!!selectedMessage}
          onOpenChange={() => {
            setSelectedMessage(null);
            setConfirmingDelete(false);
          }}
        >
          <SheetContent
            side="bottom"
            className="h-[75vh] rounded-t-2xl p-0 border-t border-white/[0.06] bg-[hsl(0_0%_8%)]"
          >
            <div className="flex flex-col h-full">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <SheetHeader className="px-5 pb-4 border-b border-white/[0.06]">
                <SheetTitle className="flex items-center gap-3 text-left">
                  <Avatar initials={getInitials(selectedMessage?.author_name)} />
                  <div>
                    <p className="text-white">{selectedMessage?.author_name}</p>
                    <p className="text-[12px] font-normal text-white/60">
                      {selectedMessage?.created_at &&
                        formatDistanceToNow(new Date(selectedMessage.created_at), {
                          addSuffix: true,
                        })}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {/* Message Content */}
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] p-4">
                  <p className="text-[13.5px] text-white whitespace-pre-wrap leading-relaxed">
                    {selectedMessage?.content}
                  </p>
                </div>

                {/* Message Meta */}
                <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] divide-y divide-white/[0.06]">
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] text-white/70">Category</span>
                    <Pill tone={categoryTone(selectedMessage?.category || null)}>
                      {selectedMessage?.category || 'none'}
                    </Pill>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] text-white/70">Upvotes</span>
                    <span className="text-[13px] text-white font-medium flex items-center gap-1.5 tabular-nums">
                      <ThumbsUp className="h-3 w-3" />
                      {selectedMessage?.upvotes || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-[12px] text-white/70">Author ID</span>
                    <span className="text-[12px] font-mono text-white/60">
                      {selectedMessage?.author_id?.slice(0, 8)}…
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Footer — inline two-step confirm, no nested modal */}
              {isSuperAdmin && (
                <SheetFooter className="p-4 border-t border-white/[0.06]">
                  {confirmingDelete ? (
                    <div className="w-full space-y-3">
                      <p className="text-[13px] text-white flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                        Permanently delete this message? This cannot be undone.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 h-12 touch-manipulation bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]"
                          onClick={() => setConfirmingDelete(false)}
                          disabled={deleteMessageMutation.isPending}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1 h-12 touch-manipulation gap-2"
                          onClick={() =>
                            selectedMessage && deleteMessageMutation.mutate(selectedMessage.id)
                          }
                          disabled={deleteMessageMutation.isPending}
                        >
                          {deleteMessageMutation.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            'Confirm delete'
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="destructive"
                      className="w-full h-12 touch-manipulation gap-2"
                      onClick={() => setConfirmingDelete(true)}
                      disabled={deleteMessageMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Message
                    </Button>
                  )}
                </SheetFooter>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </PageFrame>
    </PullToRefresh>
  );
}
