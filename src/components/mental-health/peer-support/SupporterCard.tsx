import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, User, Award, Clock } from 'lucide-react';
import { PeerSupporter, trainingLevelLabels } from '@/services/peerSupportService';
import { formatDistanceToNow } from 'date-fns';

interface SupporterCardProps {
  supporter: PeerSupporter;
  onConnect: (supporterId: string) => void;
  onViewProfile?: (supporter: PeerSupporter) => void;
  isConnecting?: boolean;
}

const SupporterCard: React.FC<SupporterCardProps> = ({
  supporter,
  onConnect,
  onViewProfile,
  isConnecting = false,
}) => {
  const lastActive = supporter.last_active_at
    ? formatDistanceToNow(new Date(supporter.last_active_at), { addSuffix: true })
    : 'Unknown';

  const trainingBadgeColors: Record<string, string> = {
    peer: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    trained: 'bg-green-500/20 text-green-300 border-green-500/30',
    mhfa_certified: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  };

  return (
    <div className="group relative bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-400/40 p-4 sm:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5">
      {/* Availability Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span className="text-xs text-green-400 font-medium">Online</span>
      </div>

      {/* Avatar & Name */}
      <div className="flex items-start gap-4">
        <div className="relative">
          {supporter.avatar_url ? (
            <img
              src={supporter.avatar_url}
              alt={supporter.display_name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-purple-500/30"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/30 flex items-center justify-center">
              <User className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-lg truncate pr-16">
            {supporter.display_name}
          </h3>

          {/* Training Level Badge */}
          <Badge
            variant="outline"
            className={`mt-1 text-xs ${trainingBadgeColors[supporter.training_level] || trainingBadgeColors.peer}`}
          >
            <Award className="w-3 h-3 mr-1" />
            {trainingLevelLabels[supporter.training_level]}
          </Badge>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-2 text-xs text-white">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              {supporter.total_conversations} chats
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Active {lastActive}
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      {supporter.bio && (
        <p className="text-sm text-white mt-4 line-clamp-2 leading-relaxed">
          "{supporter.bio}"
        </p>
      )}

      {/* Topics */}
      {supporter.topics_comfortable_with && supporter.topics_comfortable_with.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {supporter.topics_comfortable_with.slice(0, 4).map((topic, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
            >
              {topic}
            </span>
          ))}
          {supporter.topics_comfortable_with.length > 4 && (
            <span className="text-xs px-2 py-0.5 text-white">
              +{supporter.topics_comfortable_with.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
        {onViewProfile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewProfile(supporter)}
            className="flex-1 text-white hover:text-white hover:bg-white/10"
          >
            View Profile
          </Button>
        )}
        <Button
          size="sm"
          onClick={() => onConnect(supporter.id)}
          disabled={isConnecting}
          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          {isConnecting ? 'Connecting...' : 'Connect'}
        </Button>
      </div>
    </div>
  );
};

export default SupporterCard;
