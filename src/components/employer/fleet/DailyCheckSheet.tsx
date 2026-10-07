/**
 * Daily check, office side (ELE-1984).
 *
 * New check runs the same tap-through walk-round the driver uses on their
 * phone (WalkRoundFlow → submit_vehicle_check), so a check is the same record
 * whoever does it, a problem always has a photo, and photos sit in the
 * private vehicle-check-photos bucket. History shows every check with its
 * photos and how each problem was fixed.
 */
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { toast } from '@/hooks/use-toast';
import type { Vehicle } from '@/hooks/useFleet';
import { useVehicleCheckHistory, londonToday, type FleetCheckRow } from '@/hooks/useFleetWalkround';
import { WalkRoundFlow } from '@/components/fleet/WalkRoundFlow';
import { VehiclePhotoStrip } from '@/components/fleet/VehiclePhotoStrip';

interface DailyCheckSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

type ViewMode = 'check' | 'history';

const card = 'rounded-2xl border border-white/[0.08] bg-white/[0.04]';

const statusChip = (r: FleetCheckRow) => {
  if (r.defects_found && r.resolved_at) return { text: 'Fixed', cls: 'bg-emerald-500 text-black' };
  switch (r.status) {
    case 'pass':
      return { text: 'All OK', cls: 'bg-emerald-500 text-black' };
    case 'fail':
      return { text: 'Off the road', cls: 'bg-red-500 text-white' };
    case 'major_defects':
      return { text: 'Several problems', cls: 'bg-orange-400 text-black' };
    default:
      return { text: 'Problem', cls: 'bg-orange-400 text-black' };
  }
};

export function DailyCheckSheet({ open, onOpenChange, vehicle }: DailyCheckSheetProps) {
  const { data: checks = [] } = useVehicleCheckHistory(open ? vehicle.id : undefined);
  const today = londonToday();
  const doneToday = checks.find((c) => c.check_kind === 'daily' && c.check_date === today);
  const [viewMode, setViewMode] = useState<ViewMode>('check');
  // Remount the flow after each send so the next check starts clean.
  const [flowKey, setFlowKey] = useState(0);

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Daily check"
      title={vehicle.registration}
      description={[vehicle.make, vehicle.model].filter(Boolean).join(' ') || undefined}
      subheader={
        <div className="flex gap-1 py-2" role="tablist">
          {(['check', 'history'] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={viewMode === m}
              onClick={() => setViewMode(m)}
              className={cn(
                'h-11 flex-1 rounded-full text-[14px] font-semibold touch-manipulation sm:flex-none sm:px-6',
                viewMode === m ? 'bg-elec-yellow text-black' : 'bg-white/[0.06] text-white'
              )}
            >
              {m === 'check' ? 'New check' : `History (${checks.length})`}
            </button>
          ))}
        </div>
      }
    >
      {viewMode === 'check' ? (
        <>
          {doneToday && (
            <div className={cn(card, 'p-3.5 border-emerald-400/30')}>
              <p className="text-[14px] text-white">
                Already checked today at {doneToday.check_time?.slice(0, 5)} by{' '}
                {doneToday.driver?.name ?? 'the office'}. You can still do another.
              </p>
            </div>
          )}
          <WalkRoundFlow
            key={flowKey}
            wide
            vehicle={vehicle}
            onCancel={() => onOpenChange(false)}
            onDone={(r) => {
              toast({
                title: r.offRoad ? 'Check saved. Off the road' : 'Check saved',
                description:
                  r.defects > 0
                    ? `${r.defects} ${r.defects === 1 ? 'problem' : 'problems'} recorded with photos.`
                    : 'Everything was OK.',
              });
              setFlowKey((k) => k + 1);
              setViewMode('history');
            }}
          />
        </>
      ) : checks.length === 0 ? (
        <div className={cn(card, 'p-6 text-center')}>
          <p className="text-[15px] font-semibold text-white">No checks yet</p>
          <p className="mt-1 text-[13.5px] text-white">
            Checks the driver does in Worker Tools land here too.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {checks.map((c) => {
            const chip = statusChip(c);
            return (
              <div key={c.id} className={cn(card, 'p-4 space-y-3')}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-white">
                      {format(parseISO(c.check_date), 'EEE d MMM yyyy')}
                      {c.check_time && ` · ${c.check_time.slice(0, 5)}`}
                    </p>
                    <p className="text-[13px] text-white">
                      {c.check_kind === 'defect' ? 'Problem report' : 'Daily check'} by{' '}
                      {c.driver?.name ?? 'the office'}
                      {c.mileage ? ` · ${c.mileage.toLocaleString('en-GB')} miles` : ''}
                    </p>
                  </div>
                  <span className={cn('shrink-0 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold', chip.cls)}>
                    {chip.text}
                  </span>
                </div>
                {(c.defect_items ?? []).map((i, idx) => (
                  <div key={`${i.key}-${idx}`} className="space-y-2">
                    <p className="text-[14px] font-semibold text-white">
                      {i.label}
                      {i.note && <span className="font-normal">: {i.note}</span>}
                    </p>
                    <VehiclePhotoStrip paths={i.photos ?? []} label={i.label} />
                  </div>
                ))}
                {(c.defect_items ?? []).length === 0 && c.defect_details && (
                  <p className="text-[14px] text-white">{c.defect_details}</p>
                )}
                {c.notes && <p className="text-[13px] text-white">Note: {c.notes}</p>}
                {c.resolved_at && (
                  <p className="text-[13px] text-emerald-300">
                    Fixed {format(parseISO(c.resolved_at), 'd MMM')}
                    {c.resolution_note ? `: ${c.resolution_note}` : ''}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </FormSheet>
  );
}
