import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, User, Award, Zap, Loader2 } from 'lucide-react';
import { PeerSupporter, trainingLevelLabels } from '@/services/peerSupportService';

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
  const trainingBadgeColors: Record<string, string> = {
    peer: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    trained: 'bg-green-500/20 text-green-300 border-green-500/30',
    mhfa_certified: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  };

  // Estimate response time based on last active
  const getResponseTime = () => {
    if (!supporter.last_active_at) return null;
    const lastActive = new Date(supporter.last_active_at);
    const now = new Date();
    const diffMins = Math.floor((now.getTime() - lastActive.getTime()) / 60000);

    if (diffMins < 5) return 'Usually responds instantly';
    if (diffMins < 30) return 'Usually responds in ~5 mins';
    if (diffMins < 60) return 'Usually responds in ~30 mins';
    return 'Usually responds within hours';
  };

  const responseTime = getResponseTime();

  return (
    <div
      className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-purple-500/20 overflow-hidden touch-manipulation active:scale-[0.98] transition-transform duration-150"
      onClick={() => onViewProfile?.(supporter)}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />

      {/* Card content */}
      <div className="relative p-5">
        {/* Avatar with online indicator overlay */}
        <div className="relative w-16 h-16 mx-auto mb-3">
          {supporter.avatar_url ? (
            <img
              src={supporter.avatar_url}
              alt={supporter.display_name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/30"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/40 to-pink-500/40 border-2 border-purple-500/30 flex items-center justify-center">
              <User className="w-8 h-8 text-purple-300" />
            </div>
          )}

          {/* Online indicator - positioned on avatar */}
          <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-background"></span>
            </span>
          </div>
        </div>

        {/* Name - centered */}
        <h3 className="font-bold text-white text-lg text-center truncate px-2">
          {supporter.display_name}
        </h3>

        {/* Training Badge - centered */}
        <div className="flex justify-center mt-2">
          <Badge
            variant="outline"
            className={`text-xs ${trainingBadgeColors[supporter.training_level] || trainingBadgeColors.peer}`}
          >
            <Award className="w-3 h-3 mr-1" />
            {trainingLevelLabels[supporter.training_level]}
          </Badge>
        </div>

        {/* Response time indicator */}
        {responseTime && (
          <p className="text-center text-xs text-green-400 mt-2 flex items-center justify-center gap-1">
            <Zap className="w-3 h-3" />
            {responseTime}
          </p>
        )}

        {/* Bio */}
        {supporter.bio && (
          <p className="text-sm text-white/80 mt-3 text-center line-clamp-2 leading-relaxed italic">
            "{supporter.bio}"
          </p>
        )}

        {/* Topics - horizontal scroll */}
        {supporter.topics_comfortable_with && supporter.topics_comfortable_with.length > 0 && (
          <div className="flex gap-2 overflow-x-auto py-3 -mx-2 px-2 mt-2 snap-x scrollbar-hide">
            {supporter.topics_comfortable_with.map((topic, idx) => (
              <span
                key={idx}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20 snap-start"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Stats row */}
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" />
            {supporter.total_conversations} chats
          </span>
        </div>

        {/* Single CTA Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onConnect(supporter.id);
          }}
          disabled={isConnecting}
          className="w-full h-12 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 touch-manipulation active:scale-[0.97] transition-all duration-150"
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <MessageCircle className="w-4 h-4" />
              Start Chat
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SupporterCard;
