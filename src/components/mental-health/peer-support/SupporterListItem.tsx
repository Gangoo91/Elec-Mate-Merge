import React from 'react';
import { Loader2 } from 'lucide-react';
import { PeerSupporter, trainingLevelLabels } from '@/services/peerSupportService';
import { Pill, PrimaryButton } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface SupporterListItemProps {
  supporter: PeerSupporter;
  onConnect: (supporterId: string) => void;
  onViewProfile?: (supporter: PeerSupporter) => void;
  isConnecting?: boolean;
}

const getInitials = (name?: string | null) => {
  if (!name) return '–';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || '–';
};

const trainingTone: Record<string, 'yellow' | 'emerald' | 'blue'> = {
  peer: 'blue',
  trained: 'emerald',
  mhfa_certified: 'yellow',
};

const SupporterListItem: React.FC<SupporterListItemProps> = ({
  supporter,
  onConnect,
  onViewProfile,
  isConnecting = false,
}) => {
  const topics = supporter.topics_comfortable_with || [];
  const tone = trainingTone[supporter.training_level] ?? 'blue';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onViewProfile?.(supporter)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewProfile?.(supporter);
        }
      }}
      className="group w-full flex items-start gap-4 px-5 sm:px-6 py-5 text-left hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation cursor-pointer focus:outline-none focus-visible:bg-[hsl(0_0%_15%)]"
    >
      {/* Initials avatar — college pattern */}
      <div className="relative shrink-0">
        {supporter.avatar_url ? (
          <img
            src={supporter.avatar_url}
            alt={supporter.display_name}
            className="h-12 w-12 rounded-full object-cover border border-white/[0.08]"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
            <span className="text-[13px] font-semibold text-white tracking-tight tabular-nums">
              {getInitials(supporter.display_name)}
            </span>
          </div>
        )}
        <span
          aria-hidden
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-[3px] border-[hsl(0_0%_12%)]"
        />
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-[15px] font-semibold text-white tracking-tight truncate">
            {supporter.display_name}
          </h3>
          <Pill tone={tone}>{trainingLevelLabels[supporter.training_level]}</Pill>
        </div>

        {supporter.bio && (
          <p className="mt-1 text-[12.5px] text-white/70 leading-relaxed line-clamp-2">
            {supporter.bio}
          </p>
        )}

        {topics.length > 0 && (
          <div className="mt-2.5 flex gap-1.5 flex-wrap">
            {topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/80 tabular-nums"
              >
                {topic}
              </span>
            ))}
            {topics.length > 3 && (
              <span className="text-[11px] px-2 py-0.5 text-white/55 tabular-nums">
                +{topics.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Chat action — restrained */}
      <div className="shrink-0 self-center">
        <PrimaryButton
          size="sm"
          disabled={isConnecting}
          onClick={(e) => {
            e.stopPropagation();
            onConnect(supporter.id);
          }}
          className={cn(isConnecting && 'min-w-[80px]')}
        >
          {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Chat'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SupporterListItem;
