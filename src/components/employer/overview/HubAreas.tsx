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
import { ChevronRight, Settings as SettingsIcon } from 'lucide-react';
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
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 xl:grid-cols-6 xl:gap-2.5">
        {areas.map((ar) => {
          const Icon = ar.icon;
          return (
            <div key={ar.key} className={cn(surface, 'flex min-w-0 flex-col overflow-hidden')}>
              <button
                type="button"
                data-area={ar.key}
                onClick={() => onGo(ar.section)}
                className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1.5 px-3.5 pt-3.5 pb-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-4 xl:gap-x-1.5 xl:px-3.5"
              >
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.06]"
                >
                  <Icon className="h-4 w-4 text-elec-yellow" />
                </span>
                <span className="min-w-0 truncate whitespace-nowrap text-[14.5px] font-semibold leading-tight text-white">
                  {ar.name}
                </span>
                <ChevronRight
                  className="hidden h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 sm:block"
                  aria-hidden
                />
                <span
                  className={cn(
                    'col-span-3 block min-h-[34px] text-[12.5px] font-medium leading-snug line-clamp-2',
                    ar.warn ? 'text-red-300' : 'text-white'
                  )}
                >
                  {ar.line}
                </span>
              </button>
              <ul className="mt-auto border-t border-white/[0.07] divide-y divide-white/[0.06]">
                {ar.shortcuts.map((sc, i) => (
                  <li key={sc.key} className={cn(i === 3 && 'hidden sm:block')}>
                    <button
                      type="button"
                      data-shortcut={`${ar.key}:${sc.key}`}
                      onClick={() => onGo(sc.section, sc.params)}
                      className="flex h-11 w-full items-center gap-2 px-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-4 xl:px-3.5"
                    >
                      <span className="min-w-0 flex-1 truncate text-[13.5px] text-white">{sc.label}</span>
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

        <button
          type="button"
          data-area="settings"
          onClick={() => onGo('settings')}
          className={cn(
            surface,
            'col-span-2 flex min-h-[52px] w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:col-span-3 sm:px-4 xl:col-span-6'
          )}
        >
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.06]"
          >
            <SettingsIcon className="h-4 w-4 text-elec-yellow" />
          </span>
          <span className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-3">
            <span className="block shrink-0 text-[15px] font-semibold text-white">Settings</span>
            <span className="block truncate text-[12.5px] text-white">{settings.line}</span>
          </span>
          {settings.left > 0 && (
            <span className="shrink-0 rounded-full bg-elec-yellow px-2.5 py-1 text-[12px] font-bold text-black">
              {settings.left} to finish
            </span>
          )}
          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
        </button>
      </div>
    </section>
  );
}
