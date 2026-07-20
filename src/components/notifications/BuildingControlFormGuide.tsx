import { Check, X, ArrowUpRight, Info } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';
import { cn } from '@/lib/utils';

// Approved Document P (England, 2013) — the work that must be notified.
const NOTIFIABLE = [
  { title: 'A new circuit', desc: 'Any new final or distribution circuit run from the consumer unit.' },
  { title: 'A consumer unit replacement', desc: 'Replacing or installing a new fuse board / consumer unit.' },
  {
    title: 'Work in a special location',
    desc: 'Additions or alterations to circuits in a room with a bath or shower (within the zones), or a pool/sauna.',
  },
];

// Common work that is NOT notifiable — but still must comply with BS 7671.
const NOT_NOTIFIABLE = [
  { title: 'Adding a socket, light or spur', desc: 'Onto an existing circuit, outside a special location.' },
  { title: 'Like-for-like replacements', desc: 'Swapping sockets, switches, light fittings or a damaged cable.' },
  { title: 'Repairs and maintenance', desc: 'To existing accessories or circuits.' },
];

// The two routes to notify, in order of relevance.
const ROUTES = [
  {
    dot: 'bg-emerald-400',
    tint: 'border-emerald-400/20 bg-emerald-400/[0.05]',
    label: "You're scheme-registered",
    badge: 'Easiest',
    badgeColor: 'text-emerald-300 bg-emerald-400/10',
    body:
      'Self-certify through your NICEIC / NAPIT portal within 30 days of completion. Your scheme notifies Building Control for you and posts the homeowner a Building Regulations Compliance Certificate — no council fee.',
  },
  {
    dot: 'bg-amber-400',
    tint: 'border-amber-400/20 bg-amber-400/[0.05]',
    label: "You're not scheme-registered",
    badge: 'Fee applies',
    badgeColor: 'text-amber-300 bg-amber-400/10',
    body:
      'Submit a Building Notice to the local authority Building Control before work starts (or at completion for emergency work). They inspect and charge a fee. Alternatively, use a registered third-party certifier.',
  },
];

const SUBMIT_DIRECT = [
  'Building Notice application form',
  'Electrical Installation Certificate (EIC) — new circuits / consumer units',
  'Minor Works Certificate (MEIWC) — additions & alterations',
  'The Building Control fee (varies by council and job)',
];

const Row = ({
  ok,
  title,
  desc,
}: {
  ok: boolean;
  title: string;
  desc: string;
}) => (
  <div className="flex items-start gap-2.5">
    <span
      className={cn(
        'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
        ok ? 'bg-amber-400/15 text-amber-300' : 'bg-white/[0.06] text-white/40'
      )}
      aria-hidden
    >
      {ok ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
    </span>
    <div className="min-w-0">
      <p className="text-[13px] font-medium text-white leading-snug">{title}</p>
      <p className="text-[12px] leading-snug text-white/75">{desc}</p>
    </div>
  </div>
);

/**
 * Building Control guide — what work is notifiable, how to notify, and what to
 * send. Renders flat inside the collapsible's card surface (no outer card of its
 * own). Grounded in Approved Document P (England).
 */
export const BuildingControlFormGuide = () => {
  return (
    <div className="space-y-4">
      {/* Is the work notifiable? — the question every job starts with */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" aria-hidden />
            <p className="text-[13.5px] font-semibold tracking-tight text-white">Notify Building Control</p>
          </div>
          <div className="space-y-2.5">
            {NOTIFIABLE.map((r) => (
              <Row key={r.title} ok title={r.title} desc={r.desc} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" aria-hidden />
            <p className="text-[13.5px] font-semibold tracking-tight text-white">No notification needed</p>
          </div>
          <div className="space-y-2.5">
            {NOT_NOTIFIABLE.map((r) => (
              <Row key={r.title} ok={false} title={r.title} desc={r.desc} />
            ))}
          </div>
          <p className="mt-3 pt-3 border-t border-white/[0.06] text-[11.5px] leading-relaxed text-white/70">
            Still must comply with BS 7671 — you just don't tell Building Control.
          </p>
        </div>
      </div>

      {/* How to notify — the two routes */}
      <div>
        <p className="mb-2.5 px-0.5 text-[13px] font-semibold tracking-tight text-white">How to notify</p>
        <div className="space-y-2.5">
          {ROUTES.map((route) => (
            <div key={route.label} className={cn('rounded-2xl border p-4', route.tint)}>
              <div className="flex items-center gap-2">
                <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', route.dot)} aria-hidden />
                <p className="text-[13.5px] font-semibold tracking-tight text-white">{route.label}</p>
                <span className={cn('ml-auto text-[10px] font-semibold rounded px-1.5 py-0.5', route.badgeColor)}>
                  {route.badge}
                </span>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/85">{route.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submitting direct — the paperwork list */}
      <div className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4">
        <p className="text-[13px] font-semibold tracking-tight text-white mb-2.5">
          Submitting direct? You'll usually need
        </p>
        <div className="space-y-2">
          {SUBMIT_DIRECT.map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-elec-yellow/70 shrink-0" aria-hidden />
              <p className="text-[12.5px] leading-snug text-white/85">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Caveat */}
      <div className="flex items-start gap-2.5 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4">
        <Info className="h-4 w-4 text-white/40 shrink-0 mt-0.5" aria-hidden />
        <p className="text-[12px] leading-relaxed text-white/80">
          Scope and fees vary by local authority, and Wales notifies a wider range of work than England — check
          with your Building Control office if you're unsure. Notification is a legal duty under the Building
          Regulations.
        </p>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => openExternalUrl('https://www.labc.co.uk/')}
          className="group inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-[12.5px] font-medium text-white touch-manipulation transition-colors hover:border-elec-yellow/30 hover:bg-elec-yellow/[0.05] active:scale-[0.98]"
        >
          Find your council (LABC)
          <ArrowUpRight className="h-3.5 w-3.5 text-elec-yellow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
        <button
          onClick={() => openExternalUrl('https://www.gov.uk/building-regulations-approval')}
          className="group inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-[12.5px] font-medium text-white touch-manipulation transition-colors hover:border-elec-yellow/30 hover:bg-elec-yellow/[0.05] active:scale-[0.98]"
        >
          Gov.uk guidance
          <ArrowUpRight className="h-3.5 w-3.5 text-elec-yellow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
};
