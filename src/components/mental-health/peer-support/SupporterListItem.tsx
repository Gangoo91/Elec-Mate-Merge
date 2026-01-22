import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, User, Award, Loader2 } from 'lucide-react';
import { PeerSupporter, trainingLevelLabels } from '@/services/peerSupportService';

interface SupporterListItemProps {
  supporter: PeerSupporter;
  onConnect: (supporterId: string) => void;
  onViewProfile?: (supporter: PeerSupporter) => void;
  isConnecting?: boolean;
}

const SupporterListItem: React.FC<SupporterListItemProps> = ({
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

  const topics = supporter.topics_comfortable_with || [];

  return (
    <div
      onClick={() => onViewProfile?.(supporter)}
      className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-purple-500/20 active:scale-[0.98] transition-transform touch-manipulation"
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        {supporter.avatar_url ? (
          <img
            src={supporter.avatar_url}
            alt={supporter.display_name}
            className="w-14 h-14 rounded-xl object-cover border border-purple-500/30"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/40 to-pink-500/40 border border-purple-500/30 flex items-center justify-center">
            <User className="w-7 h-7 text-purple-300" />
          </div>
        )}
        {/* Online indicator */}
        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Name + Badge row */}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-white truncate">{supporter.display_name}</h3>
          <Badge
            variant="outline"
            className={`text-[10px] px-1.5 py-0 h-5 ${trainingBadgeColors[supporter.training_level] || trainingBadgeColors.peer}`}
          >
            <Award className="w-2.5 h-2.5 mr-0.5" />
            {trainingLevelLabels[supporter.training_level]}
          </Badge>
        </div>

        {/* Bio preview */}
        {supporter.bio && (
          <p className="text-sm text-white/60 line-clamp-1 mt-0.5">{supporter.bio}</p>
        )}

        {/* Topics preview - larger touch targets */}
        {topics.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {topics.slice(0, 2).map((topic) => (
              <span
                key={topic}
                className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50"
              >
                {topic}
              </span>
            ))}
            {topics.length > 2 && (
              <span className="text-xs px-2 py-1 text-white/40">
                +{topics.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Chat Button - 48px minimum touch target */}
      <Button
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onConnect(supporter.id);
        }}
        disabled={isConnecting}
        className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 touch-manipulation active:scale-[0.95]"
      >
        {isConnecting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default SupporterListItem;
