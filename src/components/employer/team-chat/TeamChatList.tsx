import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Hash,
  MessageSquare,
  Plus,
  Users,
  Lock,
  Globe,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  useMyTeamChannels,
  useTeamDMConversations,
  useCreateChannel,
} from "@/hooks/useTeamChat";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import type { TeamChannel, TeamDirectMessage } from "@/services/teamChatService";

interface TeamChatListProps {
  employerId: string;
  onSelectChannel: (channel: TeamChannel) => void;
  onSelectDM: (dm: TeamDirectMessage) => void;
}

export function TeamChatList({
  employerId,
  onSelectChannel,
  onSelectDM,
}: TeamChatListProps) {
  const { user } = useAuth();
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelDescription, setNewChannelDescription] = useState("");
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
        title: "Channel Created",
        description: `#${newChannelName.trim()} is ready to use.`,
      });

      setNewChannelName("");
      setNewChannelDescription("");
      setNewChannelPrivate(false);
      setShowCreateChannel(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create channel. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isLoading = channelsLoading || dmsLoading;

  return (
    <>
      <Tabs defaultValue="channels" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="channels" className="gap-2">
            <Hash className="h-4 w-4" />
            Channels
          </TabsTrigger>
          <TabsTrigger value="direct" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Direct
          </TabsTrigger>
        </TabsList>

        {/* Channels Tab */}
        <TabsContent value="channels" className="mt-0 space-y-3">
          {/* Create Channel Button */}
          <Button
            variant="outline"
            className="w-full gap-2 border-dashed"
            onClick={() => setShowCreateChannel(true)}
          >
            <Plus className="h-4 w-4" />
            Create Channel
          </Button>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : channels.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium">No channels yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Create a channel to start team conversations
                </p>
              </CardContent>
            </Card>
          ) : (
            channels.map((channel) => (
              <Card
                key={channel.id}
                className="cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-all touch-manipulation"
                onClick={() => onSelectChannel(channel)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      {channel.is_private ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Hash className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{channel.name}</p>
                        {channel.is_private && (
                          <Badge variant="outline" className="text-xs shrink-0">
                            Private
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {channel.description || 'No description'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Direct Messages Tab */}
        <TabsContent value="direct" className="mt-0 space-y-3">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : dms.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium">No direct messages</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start a conversation with a team member
                </p>
              </CardContent>
            </Card>
          ) : (
            dms.map((dm) => {
              const unreadCount = dm.user_1_id === user?.id ? dm.unread_1 : dm.unread_2;
              const otherUserId = dm.user_1_id === user?.id ? dm.user_2_id : dm.user_1_id;

              return (
                <Card
                  key={dm.id}
                  className="cursor-pointer hover:bg-muted/50 active:bg-muted/70 transition-all touch-manipulation"
                  onClick={() => onSelectDM(dm)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow">
                          {otherUserId.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium truncate">Team Member</p>
                          {dm.last_message_at && (
                            <span className="text-xs text-muted-foreground shrink-0">
                              {formatDistanceToNow(new Date(dm.last_message_at), {
                                addSuffix: false,
                              })}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm text-muted-foreground truncate">
                            {dm.last_message_preview || 'No messages yet'}
                          </p>
                          {unreadCount > 0 && (
                            <Badge className="bg-elec-yellow text-black shrink-0">
                              {unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>

      {/* Create Channel Sheet */}
      <Sheet open={showCreateChannel} onOpenChange={setShowCreateChannel}>
        <SheetContent side="bottom" className="h-auto max-h-[80vh]">
          <SheetHeader>
            <SheetTitle>Create Channel</SheetTitle>
          </SheetHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="channel-name">Channel Name</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="channel-name"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="general"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel-desc">Description (Optional)</Label>
              <Textarea
                id="channel-desc"
                value={newChannelDescription}
                onChange={(e) => setNewChannelDescription(e.target.value)}
                placeholder="What's this channel about?"
                rows={2}
              />
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant={newChannelPrivate ? "outline" : "default"}
                className="flex-1 gap-2"
                onClick={() => setNewChannelPrivate(false)}
              >
                <Globe className="h-4 w-4" />
                Public
              </Button>
              <Button
                variant={newChannelPrivate ? "default" : "outline"}
                className="flex-1 gap-2"
                onClick={() => setNewChannelPrivate(true)}
              >
                <Lock className="h-4 w-4" />
                Private
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              {newChannelPrivate
                ? "Only invited members can see and join this channel."
                : "Anyone in the team can see and join this channel."}
            </p>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCreateChannel(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
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
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
