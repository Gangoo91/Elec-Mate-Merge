import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Hash, MessageSquare, Plus, Users, Lock, Globe, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useMyTeamChannels, useTeamDMConversations, useCreateChannel } from '@/hooks/useTeamChat';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { TeamChannel, TeamDirectMessage } from '@/services/teamChatService';
import {
  FormCard,
  Field,
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Pill,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';

interface TeamChatListProps {
  employerId: string;
  onSelectChannel: (channel: TeamChannel) => void;
  onSelectDM: (dm: TeamDirectMessage) => void;
}

export function TeamChatList({ employerId, onSelectChannel, onSelectDM }: TeamChatListProps) {
  const { user } = useAuth();
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelDescription, setNewChannelDescription] = useState('');
  const [newChannelPrivate, setNewChannelPrivate] = useState(false);

  // Fetch channels and DMs
  const { data: channels = [], isLoading: channelsLoading } = useMyTeamChannels();
  const { data: dms = [], isLoading: dmsLoading } = useTeamDMConversations(employerId);

  // Create channel mutation
  const createChannel = useCreateChannel();

  const handleCreateChannel = async () => {
    if (!newChannelName.trim() || !user) return;

    try {
      await createChannel.mutateAsync({
        employer_id: employerId,
        name: newChannelName.trim(),
        description: newChannelDescription.trim() || undefined,
        is_private: newChannelPrivate,
        created_by: user.id,
      });

      toast({
        title: 'Channel Created',
        description: `#${newChannelName.trim()} is ready to use.`,
      });

      setNewChannelName('');
      setNewChannelDescription('');
      setNewChannelPrivate(false);
      setShowCreateChannel(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create channel. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const isLoading = channelsLoading || dmsLoading;

  return (
    <>
      <Tabs defaultValue="channels" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full p-1 h-auto">
          <TabsTrigger
            value="channels"
            className="gap-2 rounded-full text-white data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            <Hash className="h-4 w-4" />
            Channels
          </TabsTrigger>
          <TabsTrigger
            value="direct"
            className="gap-2 rounded-full text-white data-[state=active]:bg-elec-yellow data-[state=active]:text-black"
          >
            <MessageSquare className="h-4 w-4" />
            Direct
          </TabsTrigger>
        </TabsList>

        {/* Channels Tab */}
        <TabsContent value="channels" className="mt-0 space-y-3">
          {/* Create Channel Button */}
          <SecondaryButton fullWidth onClick={() => setShowCreateChannel(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Channel
          </SecondaryButton>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full bg-white/[0.04] rounded-2xl" />
              ))}
            </div>
          ) : channels.length === 0 ? (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-6 text-center">
              <Users className="h-10 w-10 text-white mx-auto mb-3" />
              <p className="text-[14px] font-semibold text-white">No channels yet</p>
              <p className="text-[12px] text-white mt-1">
                Create a channel to start team conversations
              </p>
            </div>
          ) : (
            channels.map((channel) => (
              <button
                key={channel.id}
                type="button"
                onClick={() => onSelectChannel(channel)}
                className="w-full text-left bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-3 hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                    {channel.is_private ? (
                      <Lock className="h-5 w-5 text-white" />
                    ) : (
                      <Hash className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[14px] font-semibold text-white truncate">
                        {channel.name}
                      </p>
                      {channel.is_private && <Pill tone="amber">Private</Pill>}
                    </div>
                    <p className="text-[12px] text-white truncate mt-0.5">
                      {channel.description || 'No description'}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </TabsContent>

        {/* Direct Messages Tab */}
        <TabsContent value="direct" className="mt-0 space-y-3">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full bg-white/[0.04] rounded-2xl" />
              ))}
            </div>
          ) : dms.length === 0 ? (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-6 text-center">
              <MessageSquare className="h-10 w-10 text-white mx-auto mb-3" />
              <p className="text-[14px] font-semibold text-white">No direct messages</p>
              <p className="text-[12px] text-white mt-1">
                Start a conversation with a team member
              </p>
            </div>
          ) : (
            dms.map((dm) => {
              const unreadCount = dm.user_1_id === user?.id ? dm.unread_1 : dm.unread_2;
              const otherUserId = dm.user_1_id === user?.id ? dm.user_2_id : dm.user_1_id;

              return (
                <button
                  key={dm.id}
                  type="button"
                  onClick={() => onSelectDM(dm)}
                  className="w-full text-left bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-3 hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow">
                        {otherUserId.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[14px] font-semibold text-white truncate">
                          Team Member
                        </p>
                        {dm.last_message_at && (
                          <span className="text-[11px] text-white shrink-0">
                            {formatDistanceToNow(new Date(dm.last_message_at), {
                              addSuffix: false,
                            })}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <p className="text-[12px] text-white truncate">
                          {dm.last_message_preview || 'No messages yet'}
                        </p>
                        {unreadCount > 0 && (
                          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-elec-yellow text-black text-[11px] font-semibold shrink-0">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </TabsContent>
      </Tabs>

      {/* Create Channel Sheet */}
      <Sheet open={showCreateChannel} onOpenChange={setShowCreateChannel}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[80vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)] border-t border-white/[0.06]"
        >
          <SheetShell
            eyebrow="New channel"
            title="Create Channel"
            description="Open a space for your team to talk about specific projects or topics."
            footer={
              <>
                <SecondaryButton fullWidth onClick={() => setShowCreateChannel(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  fullWidth
                  onClick={handleCreateChannel}
                  disabled={!newChannelName.trim() || createChannel.isPending}
                >
                  {createChannel.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Channel
                    </>
                  )}
                </PrimaryButton>
              </>
            }
          >
            <FormCard eyebrow="Channel details">
              <Field label="Channel name" required>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                  <Input
                    id="channel-name"
                    value={newChannelName}
                    onChange={(e) =>
                      setNewChannelName(e.target.value.toLowerCase().replace(/\s+/g, '-'))
                    }
                    placeholder="general"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </Field>

              <Field label="Description" hint="Optional">
                <Textarea
                  id="channel-desc"
                  value={newChannelDescription}
                  onChange={(e) => setNewChannelDescription(e.target.value)}
                  placeholder="What's this channel about?"
                  rows={2}
                  className={`${textareaClass} min-h-[60px]`}
                />
              </Field>
            </FormCard>

            <FormCard eyebrow="Visibility">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setNewChannelPrivate(false)}
                  className={`flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full font-medium text-[13px] transition-colors touch-manipulation ${
                    !newChannelPrivate
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1]'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  Public
                </button>
                <button
                  type="button"
                  onClick={() => setNewChannelPrivate(true)}
                  className={`flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full font-medium text-[13px] transition-colors touch-manipulation ${
                    newChannelPrivate
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1]'
                  }`}
                >
                  <Lock className="h-4 w-4" />
                  Private
                </button>
              </div>

              <p className="text-[11.5px] text-white">
                {newChannelPrivate
                  ? 'Only invited members can see and join this channel.'
                  : 'Anyone in the team can see and join this channel.'}
              </p>
            </FormCard>
          </SheetShell>
        </SheetContent>
      </Sheet>
    </>
  );
}
