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
    peer: 'bg-white/[0.02] text-white/85 border-white/[0.06]',
    trained: 'bg-white/[0.02] text-white/85 border-white/[0.06]',
    mhfa_certified: 'bg-white/[0.02] text-white/85 border-white/[0.06]',
  };

  // Shorter response time labels for compact display
  const getResponseTime = () => {
    if (!supporter.last_active_at) return null;
    const diffMins = Math.floor(
      (Date.now() - new Date(supporter.last_active_at).getTime()) / 60000
    );
    if (diffMins < 5) return 'Instant';
    if (diffMins < 30) return '~5 min';
    if (diffMins < 60) return '~30 min';
    return '~1 hr+';
  };

  const responseTime = getResponseTime();
  const topics = supporter.topics_comfortable_with || [];

  return (
    <div
      className="relative bg-white/[0.02] backdrop-blur-xl rounded-xl border border-white/[0.06] overflow-hidden p-3 touch-manipulation active:scale-[0.98] transition-transform duration-150"
      onClick={() => onViewProfile?.(supporter)}
    >
      {/* Top section: Avatar + Info - horizontal layout */}
      <div className="flex gap-3">
        {/* Avatar - compact */}
        <div className="relative w-11 h-11 shrink-0">
          {supporter.avatar_url ? (
            <img
              src={supporter.avatar_url}
              alt={supporter.display_name}
              className="w-11 h-11 rounded-xl object-cover border border-white/[0.06]"
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
              <User className="w-5 h-5 text-white/85" />
            </div>
          )}
        </div>

        {/* Info column */}
        <div className="flex-1 min-w-0">
          {/* Name + Online indicator */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-white text-sm truncate">{supporter.display_name}</h3>
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute h-full w-full rounded-full bg-white/[0.02] opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-white/[0.02]" />
            </span>
          </div>

          {/* Badge + Response time - compact row */}
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge
              variant="outline"
              className={`text-[10px] px-1.5 py-0 h-4 ${trainingBadgeColors[supporter.training_level] || trainingBadgeColors.peer}`}
            >
              <Award className="w-2.5 h-2.5 mr-0.5" />
              {trainingLevelLabels[supporter.training_level]}
            </Badge>
            {responseTime && (
              <span className="text-[10px] text-white/85 flex items-center gap-0.5">
                <Zap className="w-2.5 h-2.5" />
                {responseTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio - 2 lines max */}
      {supporter.bio && (
        <p className="text-xs text-white mt-2 line-clamp-2 leading-relaxed">"{supporter.bio}"</p>
      )}

      {/* Topics - compact with +N overflow indicator */}
      {topics.length > 0 && (
        <div className="flex gap-1 mt-2 flex-wrap">
          {topics.slice(0, 3).map((topic, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.02] text-white/85 border border-white/[0.06]"
            >
              {topic}
            </span>
          ))}
          {topics.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white">
              +{topics.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Bottom: Stats + Compact CTA */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
        <span className="text-[10px] text-white flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          {supporter.total_conversations} chats
        </span>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onConnect(supporter.id);
          }}
          disabled={isConnecting}
          className="h-8 px-3 text-xs bg-white/[0.02] hover:from-purple-600 hover:to-pink-600 text-white font-medium gap-1.5 shadow-lg touch-manipulation active:scale-[0.97]"
        >
          {isConnecting ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <MessageCircle className="w-3 h-3" />
          )}
          Chat
        </Button>
      </div>
    </div>
  );
};

export default SupporterCard;
