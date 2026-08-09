/**
 * ObservationFeed — the observation list, grouped by day.
 * Editorial standard: hairline SafetyListCard rows with a single colour dimension
 * (positive = green, improvement = severity) carried by a thin accent bar + a
 * small uppercase pill on a neutral surface. No icon tiles, no rainbow.
 */

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { SafetyObservation } from '@/hooks/useSafetyObservations';
import { Eyebrow, EmptyState, type Tone } from '@/components/college/primitives';
import { SafetyListCard, SafetyListRow } from '../common/SafetyList';

interface ObservationFeedProps {
  observations: SafetyObservation[];
  onViewDetails: (obs: SafetyObservation) => void;
}

/**
 * One surface, coloured text — the convention the Document Hub, Permit to Work,
 * Safe Isolation and Fire Watch already use.
 *
 * A 10% tint over near-black muddies every hue towards the same brown-grey, so
 * four "distinguishable" pills stopped being distinguishable at arm's length in
 * daylight. The label carries the meaning; the surface stays out of the way.
 */
const PILL: Record<'amber' | 'green' | 'red' | 'neutral', string> = {
  amber: 'bg-white/[0.05] text-amber-400 border-white/10',
  green: 'bg-white/[0.05] text-emerald-400 border-white/10',
  red: 'bg-white/[0.05] text-red-400 border-white/10',
  neutral: 'bg-white/[0.05] text-white border-white/10',
};

/**
 * The single colour dimension: positive observations read green; improvements
 * inherit severity (high→red, medium→amber, low→green).
 *
 * This used to fall back to `obs.status`. `safety_observations` has no `status`
 * column (verified against the live schema), so that branch read `undefined`,
 * defaulted to 'open' and painted every unrated improvement amber by accident
 * rather than by decision. Unrated now says so.
 */
function rowTone(obs: SafetyObservation): Tone {
  if (obs.observation_type === 'positive') return 'green';
  if (obs.severity === 'high') return 'red';
  if (obs.severity === 'medium') return 'amber';
  if (obs.severity === 'low') return 'green';
  return 'amber';
}

function Pill({
  tone,
  children,
}: {
  tone: 'amber' | 'green' | 'red' | 'neutral';
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        PILL[tone]
      )}
    >
      {children}
    </span>
  );
}

function groupByDate(observations: SafetyObservation[]): [string, SafetyObservation[]][] {
  const groups = new Map<string, SafetyObservation[]>();
  for (const obs of observations) {
    const dateKey = new Date(obs.created_at).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const bucket = groups.get(dateKey);
    if (bucket) bucket.push(obs);
    else groups.set(dateKey, [obs]);
  }
  return Array.from(groups.entries());
}

export function ObservationFeed({ observations, onViewDetails }: ObservationFeedProps) {
  const grouped = useMemo(() => groupByDate(observations), [observations]);

  if (observations.length === 0) {
    return (
      <EmptyState
        title="No matching observations"
        description="Try a different filter tab or clear your search."
      />
    );
  }

  return (
    <div className="space-y-6">
      {grouped.map(([date, items]) => (
        <div key={date}>
          <Eyebrow className="mb-2">{date}</Eyebrow>
          <SafetyListCard>
            {items.map((obs) => {
              const isPositive = obs.observation_type === 'positive';
              const tone = rowTone(obs);
              const time = new Date(obs.created_at).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              });
              return (
                <SafetyListRow
                  key={obs.id}
                  onClick={() => onViewDetails(obs)}
                  accent={tone}
                  title={obs.description}
                  subtitle={
                    [obs.category, obs.location, obs.person_observed].filter(Boolean).join(' · ') ||
                    time
                  }
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <Pill
                        tone={
                          isPositive
                            ? 'green'
                            : tone === 'green'
                              ? 'green'
                              : tone === 'red'
                                ? 'red'
                                : 'amber'
                        }
                      >
                        {isPositive ? 'Positive' : (obs.severity ?? 'Improvement')}
                      </Pill>
                      <span className="text-[11px] tabular-nums text-white">{time}</span>
                    </div>
                  }
                />
              );
            })}
          </SafetyListCard>
        </div>
      ))}
    </div>
  );
}

export default ObservationFeed;
