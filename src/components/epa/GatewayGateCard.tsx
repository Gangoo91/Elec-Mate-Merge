/**
 * GatewayGateCard — the real gateway gate (ELE-1872), the same lines for the
 * learner and their tutor. Green = met, amber = in hand or waiting on someone
 * else, red = missing. Every line that is not met opens the place to fix it:
 * the screen passes onLink and maps the link key to its own route. Where
 * this viewer has nowhere to fix a line (the learner cannot record English
 * and maths or file NET's checklist), the screen passes null as its label
 * and a note saying who does it instead.
 *
 * Not a score and never "Ready for EPA": the employer makes the gateway
 * decision, and the card says so.
 */
import { Check, ChevronRight, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useGatewayReadiness,
  type GateItem,
  type GateLink,
  type GateState,
} from '@/hooks/epa/useGatewayReadiness';

const STATE_WORD: Record<GateState, string> = { green: 'Met', amber: 'In hand', red: 'Missing' };

function StateDot({ state }: { state: GateState }) {
  return (
    <span
      className={cn(
        'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
        state === 'green' && 'border-emerald-400 bg-emerald-400 text-black',
        state === 'amber' && 'border-amber-400 text-amber-300',
        state === 'red' && 'border-red-400 text-red-300'
      )}
      aria-label={STATE_WORD[state]}
      role="img"
    >
      {state === 'green' ? (
        <Check className="h-3.5 w-3.5" />
      ) : state === 'amber' ? (
        <Clock className="h-3.5 w-3.5" />
      ) : (
        <X className="h-3.5 w-3.5" />
      )}
    </span>
  );
}

export function GatewayGateCard({
  learnerId,
  audience,
  firstName,
  onLink,
  linkLabel,
  linkNote,
  className,
}: {
  learnerId: string | null | undefined;
  audience: 'learner' | 'tutor';
  /** The learner's first name, for the tutor's wording. */
  firstName?: string;
  onLink: (link: GateLink, item: GateItem) => void;
  /** Button text per link key; defaults to "Show me". null: no button. */
  linkLabel?: Partial<Record<GateLink, string | null>>;
  /** A line under a line not yet met, e.g. who records it. */
  linkNote?: Partial<Record<GateLink, string>>;
  className?: string;
}) {
  const { data, loading, error, reload } = useGatewayReadiness(learnerId);
  const who = audience === 'learner' ? 'you' : firstName || 'this learner';

  if (!learnerId) return null;
  if (loading && !data)
    return (
      <section className={className}>
        <p className="text-[13px] text-white">Checking the gateway requirements…</p>
      </section>
    );
  if (error && !data)
    return (
      <section className={className}>
        <p className="text-[13px] text-white">
          The gateway check did not load.{' '}
          <button
            type="button"
            onClick={() => void reload()}
            className="h-11 font-semibold underline touch-manipulation"
          >
            Try again
          </button>
        </p>
      </section>
    );
  if (!data) return null;

  const red = data.items.filter((i) => i.state === 'red').length;
  const amber = data.items.filter((i) => i.state === 'amber').length;
  const title = data.gateway_passed
    ? 'Gateway passed'
    : data.overall === 'green'
      ? 'Every gateway requirement is met'
      : data.overall === 'amber'
        ? `Nothing missing, ${amber} ${amber === 1 ? 'thing' : 'things'} in hand`
        : `${red} ${red === 1 ? 'thing stands' : 'things stand'} between ${who} and gateway`;
  const what = [
    data.assessment,
    data.standard_code && data.standard_title
      ? `${data.standard_title} (${data.standard_code})`
      : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <section className={className} aria-labelledby="gateway-gate-title">
      <div className="flex items-start gap-3">
        <StateDot state={data.gateway_passed ? 'green' : data.overall} />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
            Gateway readiness
          </p>
          <h3
            id="gateway-gate-title"
            className="mt-1 text-[17px] font-semibold leading-snug text-white"
          >
            {title}
          </h3>
          <p className="mt-1 text-[12.5px] leading-snug text-white">
            {data.met} of {data.total} met{what ? ` · ${what}` : ''}. The employer makes the gateway
            decision; this is what the record says today.
          </p>
        </div>
      </div>
      <ul className="mt-4 divide-y divide-white/[0.06]">
        {data.items.map((i) => (
          <li key={i.key} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
            <StateDot state={i.state} />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-white">
                {i.label}
                <span className="sr-only">: {STATE_WORD[i.state]}</span>
              </p>
              <p className="mt-0.5 text-[12.5px] leading-snug text-white">{i.sentence}</p>
              {i.state !== 'green' && linkNote?.[i.link] && (
                <p className="mt-0.5 text-[12.5px] font-medium leading-snug text-white">
                  {linkNote[i.link]}
                </p>
              )}
            </div>
            {i.state !== 'green' && linkLabel?.[i.link] !== null && (
              <button
                type="button"
                onClick={() => onLink(i.link, i)}
                className="-my-2 inline-flex h-11 shrink-0 items-center gap-1 px-1 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
              >
                {linkLabel?.[i.link] ?? 'Show me'}
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
