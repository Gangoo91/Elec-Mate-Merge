/**
 * Day route order in the Diary (ELE-2072). For anyone with two or more jobs
 * on a day: the order to drive them in (nearest next stop, from the office
 * when the firm has set one) and the total drive, with real drive minutes
 * per leg from google-travel-time once they load.
 */
import { useMemo } from 'react';
import {
  panel,
  PanelTitle,
  Rows,
  Row,
  StatusPill,
} from '@/components/employer/pageParts/PageParts';
import {
  useDiaryRoutes,
  useDriveMinutes,
  placeFor,
  legKey,
  type DayRoute,
} from '@/hooks/useSmartScheduling';
import type { DispatchPerson } from '@/hooks/useDispatchBoard';
import { fmtDay, niceFirstName, placeOf } from '@/components/employer/diary/dispatchModel';

interface Props {
  firm: string | undefined;
  from: string;
  to: string;
  people: DispatchPerson[];
  /** Phone: just the day on screen. */
  day?: string;
}

const legsOf = (r: DayRoute): Array<[string, string]> => {
  const out: Array<[string, string]> = [];
  for (let i = 1; i < r.stops.length; i++) {
    const a = placeFor(r.stops[i - 1]);
    const b = placeFor(r.stops[i]);
    if (a && b) out.push([a, b]);
  }
  return out;
};

export function DiaryRoutesPanel({ firm, from, to, people, day }: Props) {
  const { data = [] } = useDiaryRoutes(firm, from, to);
  const routes = useMemo(() => (day ? data.filter((r) => r.day === day) : data), [data, day]);
  const pairs = useMemo(() => routes.flatMap(legsOf), [routes]);
  const drive = useDriveMinutes(pairs, routes.length > 0);
  const name = (id: string) => niceFirstName(people.find((p) => p.id === id)?.name) || 'Someone';

  if (routes.length === 0) return null;

  return (
    <section data-help="diary.routes">
      <PanelTitle
        title="Driving order"
        meta={day ? fmtDay(day, { weekday: 'long' }) : 'People with two or more jobs on a day'}
      />
      <div className={panel}>
        <Rows>
          {routes.map((r) => {
            const legs = legsOf(r);
            const real = legs.map(([a, b]) => drive.get(legKey(a, b)));
            const allReal = legs.length > 0 && real.every((m) => m != null);
            const total = allReal ? real.reduce<number>((s, m) => s + (m ?? 0), 0) : r.est_minutes;
            const order = r.stops.map((s) => placeOf(s.location) ?? s.title).join(', then ');
            return (
              <Row
                key={`${r.employee_id}-${r.day}`}
                title={`${name(r.employee_id)} · ${fmtDay(r.day, { weekday: 'short', day: 'numeric', month: 'short' })}`}
                detail={order}
                wrapDetail
                meta={
                  total != null
                    ? allReal
                      ? `${total} min driving between jobs`
                      : `About ${total} min driving${r.from_office ? ', starting from the office' : ' between jobs'}`
                    : undefined
                }
                status={
                  r.reordered ? (
                    <StatusPill tone="volt">Suggested order</StatusPill>
                  ) : (
                    <StatusPill>As booked</StatusPill>
                  )
                }
              />
            );
          })}
        </Rows>
      </div>
    </section>
  );
}
