import { Check, X, ArrowUpRight } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';
import { cn } from '@/lib/utils';

/**
 * Building Control guide — what work is notifiable, how to notify, what to
 * send. Grounded in Approved Document P (2013 edition, England) and
 * regulations 12 and 20 of the Building Regulations 2010.
 *
 * Renders flat inside the collapsible: neutral surfaces, the yellow accent
 * only where it means "notify". No tinted route cards — a brown box says
 * "warning", and there is nothing to warn about.
 */

const FACTS = [
  { value: '30 days', label: 'to notify after the work is finished' },
  { value: 'Dwellings', label: 'Part P applies to homes in England and Wales' },
  { value: 'No fee', label: 'when you self-certify through your scheme' },
];

// Approved Document P, section 1 — the three kinds of notifiable work.
const NOTIFIABLE = [
  { title: 'A new circuit', desc: 'Any new final or distribution circuit from the consumer unit.' },
  { title: 'A consumer unit change', desc: 'Replacing, or installing, a fuse board or consumer unit.' },
  {
    title: 'Work in a special location',
    desc: 'Adding to or altering a circuit inside the zones of a room with a bath or shower, or a room with a swimming pool or sauna heater.',
  },
];

// Everything else in a dwelling — still BS 7671, just not notified.
const NOT_NOTIFIABLE = [
  { title: 'Adding a socket, light or spur', desc: 'On an existing circuit, outside a special location.' },
  { title: 'Like-for-like replacements', desc: 'Sockets, switches, light fittings, a damaged cable.' },
  { title: 'Repairs and maintenance', desc: 'To existing accessories and circuits.' },
  { title: 'Non-domestic premises', desc: 'Part P does not apply to commercial or industrial work.' },
];

const ROUTES = [
  {
    label: 'Registered with a scheme',
    tag: 'Easiest',
    body: 'NAPIT, NICEIC, Stroma and the other competent person schemes let you self-certify. Log the job on the portal within 30 days of completion; the scheme tells Building Control and posts the occupier a Building Regulations compliance certificate. No council fee.',
  },
  {
    label: 'Not registered',
    tag: 'Fee applies',
    body: 'Give the council a Building Notice before the work starts (for an emergency repair, as soon as you reasonably can). Building Control charge a fee and may inspect or ask for your test results. Alternatively, arrange a registered third-party certifier before you start — they inspect and certify the work for you.',
  },
];

const SUBMIT_DIRECT = [
  'The Building Notice form, or the council’s online application',
  'The Electrical Installation Certificate (new circuits, consumer units)',
  'The Minor Works Certificate (additions and alterations in a special location)',
  'The Building Control fee — it varies by council and by job',
];

const surface =
  'rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4';

const Row = ({ ok, title, desc }: { ok: boolean; title: string; desc: string }) => (
  <div className="flex items-start gap-2.5">
    <span
      className={cn(
        'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
        ok ? 'bg-elec-yellow/15 text-elec-yellow' : 'bg-white/[0.08] text-white'
      )}
      aria-hidden
    >
      {ok ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
    </span>
    <div className="min-w-0">
      <p className="text-[13px] font-medium leading-snug text-white">{title}</p>
      <p className="text-[12px] leading-snug text-white">{desc}</p>
    </div>
  </div>
);

const LinkButton = ({ href, children }: { href: string; children: string }) => (
  <button
    type="button"
    onClick={() => openExternalUrl(href)}
    className="group inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.05] px-4 text-[12.5px] font-semibold text-white transition-colors hover:bg-white/[0.09] active:scale-[0.98] touch-manipulation"
  >
    {children}
    <ArrowUpRight className="h-3.5 w-3.5 text-elec-yellow transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </button>
);

export const BuildingControlFormGuide = () => (
  <div className="space-y-4">
    {/* The three facts */}
    <div className="grid grid-cols-3 gap-2">
      {FACTS.map((f) => (
        <div key={f.value} className={cn(surface, 'p-3 sm:p-4')}>
          <p className="text-[15px] font-bold tracking-tight text-white sm:text-[17px]">{f.value}</p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-white">{f.label}</p>
        </div>
      ))}
    </div>

    {/* Is it notifiable? */}
    <div className="grid gap-3 sm:grid-cols-2">
      <div className={surface}>
        <p className="mb-3 text-[13.5px] font-semibold tracking-tight text-white">Notify Building Control</p>
        <div className="space-y-2.5">
          {NOTIFIABLE.map((r) => (
            <Row key={r.title} ok title={r.title} desc={r.desc} />
          ))}
        </div>
      </div>
      <div className={surface}>
        <p className="mb-3 text-[13.5px] font-semibold tracking-tight text-white">No notification needed</p>
        <div className="space-y-2.5">
          {NOT_NOTIFIABLE.map((r) => (
            <Row key={r.title} ok={false} title={r.title} desc={r.desc} />
          ))}
        </div>
        <p className="mt-3 border-t border-white/[0.1] pt-3 text-[12px] leading-snug text-white">
          It still has to comply with BS 7671 and you still certify it — you just don't tell Building
          Control.
        </p>
      </div>
    </div>

    {/* How to notify */}
    <div>
      <p className="mb-2.5 px-0.5 text-[13px] font-semibold tracking-tight text-white">How to notify</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {ROUTES.map((route) => (
          <div key={route.label} className={surface}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[13.5px] font-semibold tracking-tight text-white">{route.label}</p>
              <span className="shrink-0 rounded-full border border-white/[0.14] px-2 py-0.5 text-[10.5px] font-semibold text-white">
                {route.tag}
              </span>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white">{route.body}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Going direct */}
    <div className={surface}>
      <p className="mb-2.5 text-[13px] font-semibold tracking-tight text-white">Going direct? The council will want</p>
      <div className="space-y-2">
        {SUBMIT_DIRECT.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-elec-yellow" aria-hidden />
            <p className="text-[12.5px] leading-snug text-white">{item}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Where it differs */}
    <div className={surface}>
      <p className="text-[12.5px] leading-relaxed text-white">
        <span className="font-semibold">England</span> follows the 2013 list above.{' '}
        <span className="font-semibold">Wales</span> kept the wider pre-2013 list, so kitchen, outdoor
        and garden work is notifiable there too. <span className="font-semibold">Scotland</span> and{' '}
        <span className="font-semibold">Northern Ireland</span> have no Part P — Scotland uses building
        warrants instead. Fees and forms vary by council; when in doubt, ring Building Control before
        you start.
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      <LinkButton href="https://www.labc.co.uk/">Find your council (LABC)</LinkButton>
      <LinkButton href="https://www.gov.uk/building-regulations-approval">Gov.uk guidance</LinkButton>
    </div>
  </div>
);
