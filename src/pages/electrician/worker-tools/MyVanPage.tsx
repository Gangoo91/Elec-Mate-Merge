/**
 * MyVanPage (ELE-1984) — Worker Tools → My van.
 *
 * The van the office has assigned to this worker (vehicles.driver_id → their
 * active roster row), read through get_my_vans(). Nothing else of the fleet
 * is visible here. From this page the driver:
 *
 *   - does the daily walk-round (WalkRoundFlow, about a minute)
 *   - reports a problem mid-day with a photo
 *   - sees whether the van is off the road, open problems, and when the MOT,
 *     tax, insurance and service fall due
 *
 * Deep links: ?run=daily|defect&vehicle=<id> opens the flow directly.
 */
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { Check, AlertTriangle, Loader2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { WT_MY_VAN_HELP } from '@/components/worker-tools/help/worker-help-van';
import { useMyVans, type MyVan } from '@/hooks/useFleetWalkround';
import { WalkRoundFlow, type WalkRoundResult } from '@/components/fleet/WalkRoundFlow';
import { VehiclePhotoStrip } from '@/components/fleet/VehiclePhotoStrip';

const card = 'rounded-2xl border border-white/[0.08] bg-white/[0.04]';

const due = (iso: string | null) => {
  if (!iso) return { text: 'Not set', tone: 'text-white' };
  const d = differenceInCalendarDays(parseISO(iso), new Date());
  if (d < 0) return { text: `Overdue · ${format(parseISO(iso), 'd MMM')}`, tone: 'text-red-300' };
  if (d <= 30) return { text: `${d === 0 ? 'Today' : `In ${d} day${d === 1 ? '' : 's'}`} · ${format(parseISO(iso), 'd MMM')}`, tone: 'text-orange-300' };
  return { text: format(parseISO(iso), 'd MMM yyyy'), tone: 'text-white' };
};

const statusWord = (s: string) =>
  s === 'pass' ? 'All OK' : s === 'fail' ? 'Off the road' : s === 'major_defects' ? 'Several problems' : 'Problem reported';

export default function MyVanPage() {
  useSEO({ title: 'My van', description: 'Daily walk-round check for your work van.', noindex: true });
  const { data: vans = [], isLoading, error, refetch } = useMyVans();
  const [params, setParams] = useSearchParams();
  const run = params.get('run') as 'daily' | 'defect' | null;
  const runVehicle = params.get('vehicle');
  const [done, setDone] = useState<(WalkRoundResult & { reg: string }) | null>(null);

  const active = useMemo(
    () => (run && runVehicle ? vans.find((v) => v.id === runVehicle) ?? null : null),
    [run, runVehicle, vans]
  );

  const start = (v: MyVan, mode: 'daily' | 'defect') => {
    setDone(null);
    setParams({ run: mode, vehicle: v.id });
  };
  const close = () => setParams({}, { replace: true });

  /* ── The flow ─────────────────────────────────────────────────────── */
  if (active && run) {
    return (
      <WorkerToolPage
        eyebrow={active.registration}
        title={run === 'daily' ? 'Daily check' : 'Report a problem'}
        maxWidth="2xl"
      >
        <WalkRoundFlow
          vehicle={active}
          mode={run}
          onCancel={close}
          onDone={(r) => {
            setDone({ ...r, reg: active.registration });
            close();
          }}
        />
      </WorkerToolPage>
    );
  }

  return (
    <WorkerToolPage
      eyebrow="Kit and records"
      title="My van"
      description="Your daily walk-round, and anything wrong with the van."
      maxWidth="3xl"
      help={WT_MY_VAN_HELP}
    >
      {done && <DoneBanner done={done} onClose={() => setDone(null)} />}

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" />
        </div>
      ) : error ? (
        <div className={cn(card, 'p-5 text-center')}>
          <p className="text-[15px] font-semibold text-white">Couldn’t load your van</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black touch-manipulation"
          >
            Try again
          </button>
        </div>
      ) : vans.length === 0 ? (
        <div className={cn(card, 'p-5 sm:p-6')}>
          <p className="text-[17px] font-semibold text-white">No van on your name</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-white">
            If you drive a firm van, ask the office to assign it to you in Fleet. It shows here
            straight away, ready for your daily check.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {vans.map((v) => (
            <VanCard key={v.id} van={v} onStart={(mode) => start(v, mode)} />
          ))}
        </div>
      )}
    </WorkerToolPage>
  );
}

function DoneBanner({
  done,
  onClose,
}: {
  done: WalkRoundResult & { reg: string };
  onClose: () => void;
}) {
  const bad = done.defects > 0;
  return (
    <div
      role="status"
      className={cn(
        'flex items-start gap-3 rounded-2xl border p-4',
        done.offRoad
          ? 'border-red-400/40 bg-red-500/10'
          : bad
            ? 'border-orange-400/40 bg-orange-500/10'
            : 'border-emerald-400/40 bg-emerald-500/10'
      )}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          done.offRoad ? 'bg-red-500 text-white' : bad ? 'bg-orange-400 text-black' : 'bg-emerald-500 text-black'
        )}
      >
        {bad ? <AlertTriangle className="h-5 w-5" /> : <Check className="h-5 w-5" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-white">
          {done.offRoad
            ? `${done.reg} is off the road`
            : bad
              ? 'Sent. The office has been told'
              : done.kind === 'daily'
                ? 'Check done. Drive safe'
                : 'Sent to the office'}
        </p>
        <p className="mt-0.5 text-[13.5px] text-white">
          {done.offRoad
            ? 'Do not drive it. The office has been told and will be in touch.'
            : bad
              ? `${done.defects} ${done.defects === 1 ? 'problem' : 'problems'} with photos, ready for them to sort.`
              : 'Your check is saved with today’s date and time.'}
        </p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="h-11 shrink-0 px-2 text-[13px] font-medium text-white underline underline-offset-4 touch-manipulation"
      >
        OK
      </button>
    </div>
  );
}

function VanCard({ van, onStart }: { van: MyVan; onStart: (mode: 'daily' | 'defect') => void }) {
  const offRoad = van.status === 'Off Road';
  const makeModel = [van.colour, van.make, van.model].filter(Boolean).join(' ');
  const dates: Array<[string, string | null]> = [
    ['MOT', van.mot_expiry],
    ['Road tax', van.tax_expiry],
    ['Insurance', van.insurance_expiry],
    ['Service', van.next_service],
  ];

  return (
    <section className="space-y-4">
      <div className={cn(card, 'overflow-hidden')}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 p-4 sm:p-5">
          {/* A UK rear plate: solid yellow, black type. */}
          <span className="shrink-0 rounded-md border-2 border-black/80 bg-[#F7D117] px-3 py-1.5 font-mono text-[19px] font-bold tracking-wider text-black shadow-sm">
            {van.registration}
          </span>
          <div className="min-w-[10rem] flex-1">
            <p className="text-[15px] font-semibold leading-snug text-white">{makeModel || 'Vehicle'}</p>
            <p className="text-[13px] text-white">
              {[van.firm_name, van.mileage ? `${van.mileage.toLocaleString('en-GB')} miles` : null]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        </div>

        {/* Today */}
        <div className="border-t border-white/[0.08] p-4 sm:p-5">
          {offRoad ? (
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[16px] font-semibold text-white">Off the road. Don’t drive it</p>
                <p className="mt-0.5 text-[13.5px] text-white">
                  {van.off_road_reason
                    ? `${van.off_road_reason.replace(/[.\s]+$/, '')}.`
                    : 'A problem was reported.'}{' '}
                  The office puts it back on the road once it is fixed.
                </p>
              </div>
            </div>
          ) : van.today ? (
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  van.today.defects > 0 ? 'bg-orange-400 text-black' : 'bg-emerald-500 text-black'
                )}
              >
                {van.today.defects > 0 ? <AlertTriangle className="h-5 w-5" /> : <Check className="h-5 w-5" />}
              </span>
              <div>
                <p className="text-[16px] font-semibold text-white">Checked today at {van.today.time}</p>
                <p className="mt-0.5 text-[13.5px] text-white">
                  {van.today.defects > 0
                    ? `${van.today.defects} ${van.today.defects === 1 ? 'problem' : 'problems'} sent to the office.`
                    : 'Everything was OK.'}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-[16px] font-semibold text-white">Not checked today</p>
              <p className="mt-0.5 text-[13.5px] text-white">Do it before you set off. About a minute.</p>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {!van.today && !offRoad && (
              <button
                type="button"
                data-help="van.start"
                onClick={() => onStart('daily')}
                className="h-12 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation active:scale-[0.98]"
              >
                Start today’s check
              </button>
            )}
            <button
              type="button"
              data-help="van.report"
              onClick={() => onStart('defect')}
              className="h-12 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[15px] font-semibold text-white touch-manipulation active:scale-[0.98]"
            >
              Report a problem
            </button>
            {(van.today || offRoad) && (
              <button
                type="button"
                onClick={() => onStart('daily')}
                className="h-12 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[15px] font-semibold text-white touch-manipulation active:scale-[0.98]"
              >
                Check again
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Open problems */}
      {van.open_defects.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Waiting for the office
          </h3>
          <div className={cn(card, 'divide-y divide-white/[0.08]')}>
            {van.open_defects.map((d) => (
              <div key={d.check_id} className="space-y-3 p-4">
                <p className="text-[13px] text-white">
                  Reported {format(parseISO(d.date), 'EEE d MMM')} at {d.time}
                  {d.off_road && ' · off the road'}
                </p>
                {d.items.map((i, idx) => (
                  <div key={`${i.key}-${idx}`} className="space-y-2">
                    <p className="text-[15px] font-semibold text-white">
                      {i.label}
                      {i.note && <span className="font-normal">: {i.note}</span>}
                    </p>
                    <VehiclePhotoStrip paths={i.photos} label={i.label} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dates */}
      <div className="space-y-2">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">Coming up</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {dates.map(([label, iso]) => {
            const d = due(iso);
            return (
              <div key={label} className={cn(card, 'p-3.5')}>
                <p className="text-[12px] font-semibold text-white">{label}</p>
                <p className={cn('mt-1 text-[14px] font-semibold', d.tone)}>{d.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent */}
      {van.recent.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">Last checks</h3>
          <ul className={cn(card, 'divide-y divide-white/[0.08]')}>
            {van.recent.map((r) => (
              <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                <span
                  aria-hidden
                  className={cn(
                    'h-2.5 w-2.5 shrink-0 rounded-full',
                    r.status === 'pass' ? 'bg-emerald-400' : r.status === 'fail' ? 'bg-red-400' : 'bg-orange-400'
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-white">
                    {format(parseISO(r.date), 'EEE d MMM')} · {r.time}
                  </p>
                  <p className="text-[12.5px] text-white">
                    {r.kind === 'defect' ? 'Problem report' : 'Daily check'} by {r.by}
                  </p>
                </div>
                <span className="shrink-0 text-[12.5px] font-medium text-white">
                  {r.defects > 0 && r.resolved ? 'Fixed' : statusWord(r.status)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
