import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  User,
  Award,
  MessageCircle,
  Clock,
  Settings,
  Edit2,
  CheckCircle,
  Power,
  Loader2,
} from 'lucide-react';
import {
  PeerSupporter,
  peerSupporterService,
  trainingLevelLabels,
} from '@/services/peerSupportService';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface SupporterDashboardProps {
  profile: PeerSupporter;
  onProfileUpdated: () => void;
  onEditProfile?: () => void;
}

const SupporterDashboard: React.FC<SupporterDashboardProps> = ({
  profile,
  onProfileUpdated,
  onEditProfile,
}) => {
  const { toast } = useToast();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleAvailability = async () => {
    setIsToggling(true);
    try {
      await peerSupporterService.toggleAvailability();
      toast({
        title: profile.is_available ? "You're now offline" : "You're now available!",
        description: profile.is_available
          ? "You won't receive new connection requests"
          : 'Others can now see you and connect',
      });
      onProfileUpdated();
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

  const lastActive = profile.last_active_at
    ? formatDistanceToNow(new Date(profile.last_active_at), { addSuffix: true })
    : 'Unknown';

  const trainingBadgeColors: Record<string, string> = {
    peer: 'bg-white/[0.02] text-white/85 border-white/[0.06]',
    trained: 'bg-white/[0.02] text-white/85 border-white/[0.06]',
    mhfa_certified: 'bg-white/[0.02] text-white/85 border-white/[0.06]',
  };

  return (
    <Card
      className={`
      relative overflow-hidden transition-all duration-500
      ${
        profile.is_available
          ? 'bg-white/[0.02] border-white/[0.06]'
          : 'bg-white/[0.02] border-white/10'
      }
    `}
    >
      {/* Glow Effect when available */}
      {profile.is_available && (
        <div className="absolute inset-0 bg-white/[0.02] animate-pulse" />
      )}

      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-lg ${profile.is_available ? 'bg-white/[0.02]' : 'bg-white/10'}`}
            >
              <Power
                className={`h-5 w-5 ${profile.is_available ? 'text-white/85' : 'text-white'}`}
              />
            </div>
            <div>
              <CardTitle className="text-base">Your Status</CardTitle>
              <p className={`text-sm ${profile.is_available ? 'text-white/85' : 'text-white'}`}>
                {profile.is_available ? 'Available to help' : 'Currently offline'}
              </p>
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3">
            {isToggling ? (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            ) : (
              <Switch
                checked={profile.is_available}
                onCheckedChange={handleToggleAvailability}
                disabled={isToggling}
              />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Profile Summary */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20">
          {/* Avatar */}
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.display_name}
              className="w-12 h-12 rounded-xl object-cover border border-white/20"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
              <User className="w-6 h-6 text-white/85" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white">{profile.display_name}</h4>
            <Badge
              variant="outline"
              className={`mt-1 text-xs ${trainingBadgeColors[profile.training_level] || trainingBadgeColors.peer}`}
            >
              <Award className="w-3 h-3 mr-1" />
              {trainingLevelLabels[profile.training_level]}
            </Badge>
          </div>

          {onEditProfile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEditProfile}
              className="text-white hover:text-white"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="p-3 rounded-lg bg-white/5">
            <p className="text-sm text-white italic">"{profile.bio}"</p>
          </div>
        )}

        {/* Topics */}
        {profile.topics_comfortable_with && profile.topics_comfortable_with.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-white uppercase tracking-wide">Comfortable discussing</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.topics_comfortable_with.map((topic, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded-full bg-white/[0.02] text-white/85 border border-white/[0.06]"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
            <MessageCircle className="w-4 h-4 text-white/85" />
            <div>
              <p className="text-lg font-bold text-white">{profile.total_conversations}</p>
              <p className="text-xs text-white">Total chats</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5">
            <Clock className="w-4 h-4 text-white/85" />
            <div>
              <p className="text-sm font-medium text-white">{lastActive}</p>
              <p className="text-xs text-white">Last active</p>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div
          className={`
          flex items-center gap-2 p-3 rounded-lg
          ${
            profile.is_available
              ? 'bg-white/[0.02] border border-white/[0.06]'
              : 'bg-white/5 border border-white/10'
          }
        `}
        >
          {profile.is_available ? (
            <>
              <CheckCircle className="w-4 h-4 text-white/85" />
              <p className="text-sm text-white/85">You're visible to people looking for support</p>
            </>
          ) : (
            <>
              <Settings className="w-4 h-4 text-white" />
              <p className="text-sm text-white">
                Toggle on when you're ready to receive connections
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupporterDashboard;
