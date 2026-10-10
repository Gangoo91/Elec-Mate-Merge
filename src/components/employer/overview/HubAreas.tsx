/**
 * "Your hub" on the Employer Overview (7 Oct 2026). Andrew: "we need to be
 * able to navigate to each of the main parts within too."
 *
 * One card per area of the hub. The top of the card is the area itself (its
 * name, an icon as a tap affordance, and one live line from
 * get_employer_home); below it are the three or four screens people open
 * most, each with its own count when there is something to do there.
 * Settings closes the grid as a slim full-width row.
 *
 * No queries of its own: every figure comes from the Overview's one RPC
 * (plus the client inbox, which the Overview already loads).
 */
import { ChevronRight } from 'lucide-react';
import { SettingsIcon } from '@/components/employer/overview/HubIcons';
import { cn } from '@/lib/utils';
import type { Params } from '@/components/employer/overview/HomeSections';
import type { HubArea, Tone } from '@/components/employer/overview/hubAreasModel';

const badgeCn = (tone: Tone = 'action') =>
  cn(
    'shrink-0 min-w-[22px] h-[22px] rounded-full px-1.5 text-[11.5px] font-bold tabular-nums flex items-center justify-center',
    tone === 'urgent'
      ? 'bg-red-500 text-white'
      : tone === 'info'
        ? 'bg-white/[0.12] text-white'
        : 'bg-elec-yellow text-black'
  );

const surface =
  'rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.04]';

/** What's waiting in an area: the sum of its shortcut counts, at the most urgent tone. */
function waiting(ar: HubArea): { count: number; tone: Tone } {
  const live = ar.shortcuts.filter((sc) => (sc.count ?? 0) > 0);
  const count = live.reduce((n, sc) => n + (sc.count ?? 0), 0);
  const tone: Tone = live.some((sc) => sc.tone === 'urgent')
    ? 'urgent'
    : live.some((sc) => (sc.tone ?? 'action') === 'action')
      ? 'action'
      : 'info';
  return { count, tone };
}

export function HubAreas({
  areas,
  settings,
  onGo,
}: {
  areas: HubArea[];
  settings: { line: string; left: number };
  onGo: (section: string, params?: Params) => void;
}) {
  return (
    <section aria-labelledby="your-hub">
      <h2 id="your-hub" className="mb-3 text-[16px] font-semibold tracking-tight text-white">
        Your hub
      </h2>
      {/* Phone: a launcher, one tile per area with what's waiting there. The
          area's own page lists every screen in it. */}
      <div className="grid grid-cols-3 gap-2 sm:hidden">
        {areas.map((ar) => {
          const Icon = ar.icon;
          const { count, tone } = waiting(ar);
          return (
            <button
              key={ar.key}
              type="button"
              data-area-tile={ar.key}
              onClick={() => onGo(ar.section)}
              aria-label={count ? `${ar.name}, ${count} waiting` : ar.name}
              className={cn(
                surface,
                'relative flex min-h-[96px] flex-col items-start justify-between px-3 pt-3 pb-2.5 text-left transition-colors touch-manipulation active:bg-white/[0.08]'
              )}
            >
              <Icon className="h-8 w-8" />
              <span className="block w-full truncate text-[14px] font-semibold leading-tight text-white">
                {ar.name}
              </span>
              {count > 0 && (
                <span className={cn(badgeCn(tone), 'absolute right-2 top-2')}>
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="hidden grid-cols-2 gap-2.5 sm:grid sm:grid-cols-3 sm:gap-3 xl:grid-cols-6">
        {areas.map((ar) => {
          const Icon = ar.icon;
          return (
            <div key={ar.key} className={cn(surface, 'flex min-w-0 flex-col overflow-hidden')}>
              <button
                type="button"
                data-area={ar.key}
                onClick={() => onGo(ar.section)}
                className="group flex w-full flex-col items-start gap-0 px-4 pt-4 pb-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
              >
                <span className="flex w-full items-center justify-between">
                  <Icon className="h-8 w-8" />
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
                <span className="mt-3 block w-full truncate text-[16px] font-semibold leading-tight tracking-tight text-white">
                  {ar.name}
                </span>
                <span
                  className={cn(
                    'mt-1 block min-h-[36px] w-full text-[13px] leading-snug line-clamp-2',
                    ar.warn ? 'font-medium text-red-300' : 'text-white'
                  )}
                >
                  {ar.line}
                </span>
              </button>
              <ul className="mt-auto border-t border-white/[0.07] divide-y divide-white/[0.06]">
                {ar.shortcuts.map((sc) => (
                  <li key={sc.key}>
                    <button
                      type="button"
                      data-shortcut={`${ar.key}:${sc.key}`}
                      onClick={() => onGo(sc.section, sc.params)}
                      className="flex h-11 w-full items-center gap-2 px-4 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07]"
                    >
                      <span className="min-w-0 flex-1 truncate text-[13.5px] text-white">
                        {sc.label}
                      </span>
                      {sc.count ? (
                        <span className={badgeCn(sc.tone)} aria-label={`${sc.count} to do`}>
                          {sc.count > 99 ? '99+' : sc.count}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        data-area="settings"
        onClick={() => onGo('settings')}
        className={cn(
          surface,
          'mt-2 flex min-h-[60px] w-full sm:mt-3 items-center gap-3.5 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04]'
        )}
      >
        <SettingsIcon className="h-7 w-7" />
        <span className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-3">
          <span className="block shrink-0 text-[15px] font-semibold text-white">Settings</span>
          <span className="block text-[13px] leading-snug text-white sm:truncate">
            {settings.line}
          </span>
        </span>
        {settings.left > 0 && (
          <span className="shrink-0 rounded-full bg-elec-yellow px-2.5 py-1 text-[12px] font-bold text-black">
            {settings.left} to finish
          </span>
        )}
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
      </button>
    </section>
  );
}
