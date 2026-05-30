/**
 * ObservationFeed — the observation list, grouped by day.
 * Editorial standard: hairline ListCard rows with a single colour dimension
 * (positive = green, improvement = severity/status) carried by a thin accent
 * bar + a small uppercase pill. No icon tiles, no rainbow.
 */

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { SafetyObservation, ObservationStatus } from '@/hooks/useSafetyObservations';
import { Eyebrow, ListCard, ListRow, EmptyState, type Tone } from '@/components/college/primitives';

interface ObservationFeedProps {
  observations: SafetyObservation[];
  onViewDetails: (obs: SafetyObservation) => void;
}

const STATUS_LABEL: Record<ObservationStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed',
};

const PILL: Record<'amber' | 'green' | 'red' | 'blue' | 'neutral', string> = {
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  neutral: 'bg-white/[0.05] text-white/55 border-white/10',
};

// The single colour dimension: positive observations read green; improvements
// inherit severity (high→red, medium→amber, low→green), falling back to status.
function rowTone(obs: SafetyObservation): Tone {
  if (obs.observation_type === 'positive') return 'green';
  if (obs.severity === 'high') return 'red';
  if (obs.severity === 'medium') return 'amber';
  if (obs.severity === 'low') return 'green';
  const status = obs.status || 'open';
  return status === 'closed' ? 'green' : status === 'in_progress' ? 'blue' : 'amber';
}

function Pill({ tone, children }: { tone: 'amber' | 'green' | 'red' | 'blue' | 'neutral'; children: React.ReactNode }) {
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
    return <EmptyState title="No matching observations" description="Try a different filter tab or clear your search." />;
  }

  return (
    <div className="space-y-6">
      {grouped.map(([date, items]) => (
        <div key={date}>
          <Eyebrow className="mb-2">{date}</Eyebrow>
          <ListCard>
            {items.map((obs) => {
              const isPositive = obs.observation_type === 'positive';
              const tone = rowTone(obs);
              const time = new Date(obs.created_at).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              });
              const overdue =
                !isPositive &&
                !!obs.due_date &&
                new Date(obs.due_date) < new Date() &&
                (obs.status || 'open') !== 'closed';
              return (
                <ListRow
                  key={obs.id}
                  onClick={() => onViewDetails(obs)}
                  accent={tone}
                  title={obs.description}
                  subtitle={
                    [obs.category, obs.location, obs.person_observed].filter(Boolean).join(' · ') || time
                  }
                  trailing={
                    <div className="flex flex-col items-end gap-1">
                      <Pill tone={isPositive ? 'green' : tone === 'green' ? 'green' : tone === 'red' ? 'red' : tone === 'blue' ? 'blue' : 'amber'}>
                        {isPositive ? 'Positive' : obs.severity ? obs.severity : STATUS_LABEL[obs.status || 'open']}
                      </Pill>
                      <span className={cn('text-[11px] tabular-nums', overdue ? 'text-red-400' : 'text-white/45')}>
                        {overdue ? 'Overdue' : time}
                      </span>
                    </div>
                  }
                />
              );
            })}
          </ListCard>
        </div>
      ))}
    </div>
  );
}

export default ObservationFeed;
