import { usePresenceChannel, colourFor } from '@/hooks/usePresenceChannel';
import { cn } from '@/lib/utils';

/* ==========================================================================
   PresenceBadges — shows up to N other tutors viewing the same resource
   right now. Drop into any review page to stop double-marking.

   <PresenceBadges channelKey={`portfolio:submission:${id}`} />
   ========================================================================== */

interface PresenceBadgesProps {
  channelKey: string | null;
  /** Max avatars to render before showing "+N more". */
  max?: number;
  /** Smaller variant for tight spaces. */
  compact?: boolean;
  /** Override label text — "viewing" / "reviewing" / "marking". */
  verb?: string;
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function PresenceBadges({
  channelKey,
  max = 3,
  compact = false,
  verb = 'viewing',
}: PresenceBadgesProps) {
  const { others } = usePresenceChannel(channelKey);
  if (others.length === 0) return null;

  const shown = others.slice(0, max);
  const overflow = others.length - shown.length;
  const size = compact ? 'h-5 w-5 text-[8.5px]' : 'h-6 w-6 text-[10px]';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/[0.08] pl-1 pr-2.5 py-0.5',
        compact && 'py-px'
      )}
      title={`${others.map((o) => o.display_name).join(', ')} ${verb} this`}
      aria-label={`${others.length} other${others.length === 1 ? '' : 's'} ${verb} this`}
    >
      <div className="flex -space-x-1.5">
        {shown.map((o) => (
          <span
            key={o.user_id}
            className={cn(
              'inline-flex items-center justify-center rounded-full text-white font-semibold ring-1 ring-amber-400/40',
              colourFor(o.user_id),
              size
            )}
          >
            {initials(o.display_name)}
          </span>
        ))}
        {overflow > 0 && (
          <span
            className={cn(
              'inline-flex items-center justify-center rounded-full bg-white/[0.08] text-white font-semibold ring-1 ring-amber-400/40',
              size
            )}
          >
            +{overflow}
          </span>
        )}
      </div>
      <span
        className={cn(
          'font-semibold text-amber-200 uppercase tracking-[0.06em]',
          compact ? 'text-[9.5px]' : 'text-[10.5px]'
        )}
      >
        {others.length === 1
          ? `${others[0].display_name.split(' ')[0]} ${verb}`
          : `${others.length} ${verb}`}
      </span>
    </div>
  );
}
