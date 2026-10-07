/**
 * Fleet → Today (ELE-1984): problems first, then the vans whose driver has
 * not done today's walk-round, then the ones that have. One tap opens the van.
 */
import { cn } from '@/lib/utils';
import type { Vehicle } from '@/hooks/useFleet';
import type { FleetCheckRow } from '@/hooks/useFleetWalkround';

const card = 'rounded-2xl border border-white/[0.08] bg-white/[0.04]';

interface Driver {
  id: string;
  name: string;
  user_id: string | null;
}

export function FleetTodayCard({
  vehicles,
  drivers,
  checkedToday,
  openDefects,
  onOpen,
}: {
  vehicles: Vehicle[];
  drivers: Driver[];
  checkedToday: Map<string, FleetCheckRow>;
  openDefects: FleetCheckRow[];
  onOpen: (v: Vehicle) => void;
}) {
  if (vehicles.length === 0) return null;
  const byId = new Map(vehicles.map((v) => [v.id, v]));
  const driverOf = (v: Vehicle) => drivers.find((d) => d.id === v.driver_id) ?? null;

  const onRoad = vehicles.filter((v) => v.status !== 'Off Road');
  const expected = onRoad.filter((v) => !!v.driver_id);
  const notChecked = expected.filter((v) => !checkedToday.has(v.id));
  const checked = vehicles.filter((v) => checkedToday.has(v.id));
  const noDriver = onRoad.filter((v) => !v.driver_id);

  // One row per vehicle with open problems, newest report first.
  const problemVans: { v: Vehicle; rows: FleetCheckRow[] }[] = [];
  openDefects.forEach((r) => {
    const v = byId.get(r.vehicle_id);
    if (!v) return;
    const hit = problemVans.find((p) => p.v.id === v.id);
    if (hit) hit.rows.push(r);
    else problemVans.push({ v, rows: [r] });
  });
  problemVans.sort((a, b) => Number(b.v.status === 'Off Road') - Number(a.v.status === 'Off Road'));

  const headline =
    expected.length === 0
      ? vehicles.some((v) => !!v.driver_id)
        ? 'Nothing to check today'
        : 'No drivers assigned'
      : notChecked.length === 0
        ? 'Every van checked'
        : `${expected.length - notChecked.length} of ${expected.length} checked`;

  return (
    <section className="space-y-2" data-help="fleet.today">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Today</h2>
        <span
          className={cn(
            'text-[13px] font-semibold',
            expected.length > 0 && notChecked.length === 0 ? 'text-emerald-400' : 'text-white'
          )}
        >
          {headline}
        </span>
      </div>

      <div className={cn(card, 'divide-y divide-white/[0.08] overflow-hidden')}>
        {problemVans.map(({ v, rows }) => {
          const items = rows.flatMap((r) => r.defect_items ?? []).map((i) => i.label);
          const off = v.status === 'Off Road';
          return (
            <Row
              key={`p-${v.id}`}
              onClick={() => onOpen(v)}
              dot={off ? 'bg-red-500' : 'bg-orange-400'}
              title={`${v.registration}${off ? ' · off the road' : ' · problem reported'}`}
              sub={[items.slice(0, 3).join(', ') || 'See the photos', rows[0]?.driver?.name].filter(Boolean).join(' · ')}
              action="Look"
              actionTone="volt"
            />
          );
        })}

        {notChecked.map((v) => {
          const d = driverOf(v);
          const onApp = !!d?.user_id;
          return (
            <Row
              key={`n-${v.id}`}
              onClick={() => onOpen(v)}
              dot="bg-white/40"
              title={`${v.registration} · not checked yet`}
              sub={
                onApp
                  ? `${d?.name ?? v.assigned_to ?? 'Driver'} has not done the walk-round`
                  : `${d?.name ?? v.assigned_to ?? 'The driver'} is not on the app yet, so cannot check it on their phone`
              }
            />
          );
        })}

        {checked
          .filter((v) => !problemVans.some((p) => p.v.id === v.id))
          .map((v) => {
            const c = checkedToday.get(v.id)!;
            return (
              <Row
                key={`c-${v.id}`}
                onClick={() => onOpen(v)}
                dot="bg-emerald-400"
                title={`${v.registration} · checked ${c.check_time?.slice(0, 5) ?? ''}`.trim()}
                sub={`${c.driver?.name ?? 'Office'} · ${c.defects_found ? 'problem fixed since' : 'all OK'}`}
              />
            );
          })}

        {noDriver.length > 0 && (
          <div className="px-4 py-3">
            <p className="text-[13px] text-white">
              {noDriver.length === 1
                ? `${noDriver[0].registration} has no driver. `
                : `${noDriver.length} vans have no driver. `}
              Assign one in Edit vehicle so they can do the check on their phone.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({
  title,
  sub,
  dot,
  onClick,
  action,
  actionTone,
}: {
  title: string;
  sub: string;
  dot: string;
  onClick: () => void;
  action?: string;
  actionTone?: 'volt';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3 text-left touch-manipulation hover:bg-white/[0.03] min-h-[56px]"
    >
      <span aria-hidden className={cn('h-2.5 w-2.5 shrink-0 rounded-full', dot)} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14.5px] font-semibold text-white">{title}</span>
        <span className="block text-[12.5px] leading-snug text-white line-clamp-2">{sub}</span>
      </span>
      {action && (
        <span
          className={cn(
            'shrink-0 rounded-lg px-3 py-2 text-[13px] font-semibold',
            actionTone === 'volt' ? 'bg-elec-yellow text-black' : 'text-white'
          )}
        >
          {action}
        </span>
      )}
    </button>
  );
}
