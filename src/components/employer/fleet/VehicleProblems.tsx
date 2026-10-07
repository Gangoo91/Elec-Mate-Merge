/**
 * Open problems on one vehicle (ELE-1984): what the driver reported, the
 * photos, and Mark fixed (with Back on the road when it was taken off).
 */
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { VehiclePhotoStrip } from '@/components/fleet/VehiclePhotoStrip';
import { useResolveVehicleDefect, type FleetCheckRow } from '@/hooks/useFleetWalkround';

const card = 'rounded-2xl border border-white/[0.08] bg-white/[0.04]';

export function VehicleProblems({
  rows,
  vehicleOffRoad,
  offRoadReason,
}: {
  rows: FleetCheckRow[];
  vehicleOffRoad: boolean;
  offRoadReason?: string | null;
}) {
  if (rows.length === 0 && !vehicleOffRoad) return null;
  return (
    <div className="space-y-2" data-help="fleet.problems">
      <h3 className="text-[15px] font-semibold tracking-tight text-white">
        {rows.length > 0 ? `Problems (${rows.length})` : 'Off the road'}
      </h3>
      {vehicleOffRoad && rows.length === 0 && (
        <div className={cn(card, 'p-4 border-red-400/40 bg-red-500/[0.08]')}>
          <p className="text-[14px] text-white">
            {offRoadReason ?? 'Marked off the road.'} Change the status in Edit vehicle once it is
            fixed.
          </p>
        </div>
      )}
      {rows.map((r) => (
        <ProblemCard key={r.id} row={r} vehicleOffRoad={vehicleOffRoad} onlyOne={rows.length === 1} />
      ))}
    </div>
  );
}

function ProblemCard({
  row,
  vehicleOffRoad,
  onlyOne,
}: {
  row: FleetCheckRow;
  vehicleOffRoad: boolean;
  onlyOne: boolean;
}) {
  const resolve = useResolveVehicleDefect();
  const [fixing, setFixing] = useState(false);
  const [note, setNote] = useState('');
  const [backOn, setBackOn] = useState(vehicleOffRoad && onlyOne);
  const items = row.defect_items?.length
    ? row.defect_items
    : [{ key: 'other' as const, label: 'Problem', note: row.defect_details, photos: [] }];

  const confirm = async () => {
    try {
      await resolve.mutateAsync({ checkId: row.id, note, backOnRoad: vehicleOffRoad && backOn });
      toast({
        title: 'Marked fixed',
        description: vehicleOffRoad && backOn ? 'The vehicle is back on the road.' : undefined,
      });
    } catch {
      toast({ title: 'That did not save', description: 'Try again.', variant: 'destructive' });
    }
  };

  return (
    <div className={cn(card, 'p-4 space-y-3', row.off_road ? 'border-red-400/40' : 'border-orange-400/30')}>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold',
            row.off_road ? 'bg-red-500 text-white' : 'bg-orange-400 text-black'
          )}
        >
          {row.off_road ? 'Off the road' : 'Still driving'}
        </span>
        <span className="text-[12.5px] text-white">
          {row.driver?.name ?? 'Office'} · {format(parseISO(row.created_at), 'EEE d MMM, HH:mm')}
          {row.check_kind === 'defect' ? ' · problem report' : ' · daily check'}
        </span>
      </div>
      {items.map((i, idx) => (
        <div key={`${i.key}-${idx}`} className="space-y-2">
          <p className="text-[15px] font-semibold text-white">
            {i.label}
            {i.note && <span className="font-normal">: {i.note}</span>}
          </p>
          <VehiclePhotoStrip paths={i.photos ?? []} label={i.label} />
        </div>
      ))}
      {row.notes && <p className="text-[13px] text-white">Note: {row.notes}</p>}

      {!fixing ? (
        <button
          type="button"
          data-help="fleet.fix"
          onClick={() => setFixing(true)}
          className="h-11 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black touch-manipulation sm:w-auto sm:px-5"
        >
          Mark fixed
        </button>
      ) : (
        <div className="space-y-3 border-t border-white/[0.08] pt-3">
          <label className="block text-[12px] font-medium text-white" htmlFor={`fix-${row.id}`}>
            What was done? (optional)
          </label>
          <input
            id={`fix-${row.id}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. New tyre fitted at Kwik Fit"
            className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
          />
          {vehicleOffRoad && (
            <label className="flex min-h-[44px] items-center gap-3 touch-manipulation">
              <input
                type="checkbox"
                checked={backOn}
                onChange={(e) => setBackOn(e.target.checked)}
                className="h-5 w-5 accent-[#F7D117]"
              />
              <span className="text-[14px] text-white">Put it back on the road</span>
            </label>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFixing(false)}
              className="h-11 flex-1 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[14px] font-semibold text-white touch-manipulation sm:flex-none sm:px-5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void confirm()}
              disabled={resolve.isPending}
              className="h-11 flex-1 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black touch-manipulation disabled:opacity-50 sm:flex-none sm:px-5 inline-flex items-center justify-center"
            >
              {resolve.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirm fixed'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
