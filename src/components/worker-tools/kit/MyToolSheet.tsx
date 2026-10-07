import { useEffect, useRef, useState } from 'react';
import { Camera, Loader2, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { dueInfo } from '@/components/worker-tools/kit/kitDates';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  labelCn,
  textareaCn,
  cardCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import {
  useConfirmTool,
  useReportTool,
  useReturnTool,
  useTransferPeople,
  useTransferTool,
  uploadKitPhoto,
  type MyKitTool,
  type ToolEvent,
} from '@/hooks/useKit';
import { toast } from 'sonner';

/* One item of kit on the worker's name (or their van): confirm it, report a
   fault or loss with a photo, pass it to a colleague, or hand it back. */

type Mode = null | 'fault' | 'lost' | 'pass' | 'return';

const fmt = (iso: string | null) => (iso ? format(parseISO(iso), 'd MMM yyyy') : 'Not set');


const toneText = { red: 'text-red-300', orange: 'text-orange-300', white: 'text-white' } as const;

function eventLine(e: ToolEvent): string {
  switch (e.kind) {
    case 'issued':
      return `Issued to ${e.to_label ?? 'you'}`;
    case 'confirmed':
      return `${e.actor_name ?? 'Holder'} confirmed`;
    case 'transferred':
      return `Passed from ${e.from_label ?? 'someone'} to ${e.to_label ?? 'someone'}`;
    case 'returned':
      return 'Handed back to the office';
    case 'fault':
      return 'Fault reported';
    case 'lost':
      return 'Reported lost';
    case 'repaired':
      return 'Back in use';
    default:
      return e.kind;
  }
}

export function MyToolSheet({
  tool,
  onOpenChange,
}: {
  tool: MyKitTool | null;
  onOpenChange: (o: boolean) => void;
}) {
  const [mode, setMode] = useState<Mode>(null);
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState<{ path: string; preview: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [toEmployee, setToEmployee] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const confirm = useConfirmTool();
  const report = useReportTool();
  const giveBack = useReturnTool();
  const transfer = useTransferTool();
  const { data: people = [], isLoading: loadingPeople } = useTransferPeople(tool?.id, mode === 'pass');

  useEffect(() => {
    setMode(null);
    setNote('');
    setPhoto(null);
    setToEmployee(null);
  }, [tool?.id]);

  if (!tool) return null;
  const pat = dueInfo(tool.pat_due);
  const cal = dueInfo(tool.next_calibration);
  const busy = confirm.isPending || report.isPending || giveBack.isPending || transfer.isPending || uploading;
  const broken = tool.status === 'Under Repair' || tool.status === 'Lost';

  const pickPhoto = async (f: File | undefined) => {
    if (!f) return;
    setUploading(true);
    try {
      const path = await uploadKitPhoto(f);
      setPhoto({ path, preview: URL.createObjectURL(f) });
    } catch {
      toast.error('Could not upload the photo. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const send = async () => {
    try {
      if (mode === 'fault' || mode === 'lost') {
        await report.mutateAsync({ toolId: tool.id, kind: mode, note, photoPath: photo?.path ?? null });
      } else if (mode === 'pass' && toEmployee) {
        await transfer.mutateAsync({ toolId: tool.id, toEmployeeId: toEmployee, note });
        onOpenChange(false);
        return;
      } else if (mode === 'return') {
        await giveBack.mutateAsync({ toolId: tool.id, note });
        onOpenChange(false);
        return;
      }
      setMode(null);
      setNote('');
      setPhoto(null);
    } catch {
      /* hook toasts */
    }
  };

  const canSend =
    mode === 'fault' ? note.trim().length >= 3 : mode === 'pass' ? !!toEmployee : mode === 'lost' || mode === 'return';

  const footer =
    mode === null ? (
      tool.issue_state === 'pending' ? (
        <button
          type="button"
          data-help="wt-equipment.confirm-one"
          onClick={() => confirm.mutate(tool.id)}
          disabled={busy}
          className={cn(buttonPrimaryCn, 'w-full')}
        >
          {confirm.isPending ? 'Confirming…' : 'I have it'}
        </button>
      ) : (
        <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'w-full')}>
          Done
        </button>
      )
    ) : (
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode(null)} className={cn(buttonSecondaryCn, 'px-5')}>
          Back
        </button>
        <button type="button" onClick={send} disabled={!canSend || busy} className={cn(buttonPrimaryCn, 'flex-1 px-5')}>
          {busy
            ? 'Sending…'
            : mode === 'fault'
              ? 'Send fault report'
              : mode === 'lost'
                ? 'Report it lost'
                : mode === 'pass'
                  ? 'Pass it on'
                  : 'Hand it back'}
        </button>
      </div>
    );

  return (
    <FormSheet
      open={!!tool}
      onOpenChange={onOpenChange}
      eyebrow={tool.on_van ? `On your van ${tool.vehicle_registration ?? ''}`.trim() : 'On your name'}
      title={tool.name}
      description={[tool.category, tool.serial_number ? `S/N ${tool.serial_number}` : null, tool.status].filter(Boolean).join(' · ')}
      width="wide"
      footer={footer}
    >
      {mode === null ? (
        <div className="space-y-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0">
          <div className="space-y-5">
            {tool.issue_state === 'pending' && (
              <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
                <p className="text-[14px] font-semibold text-white">Check you have it, then tap I have it</p>
                <p className="mt-1 text-[13px] text-white">
                  The office issued it {tool.issued_at ? format(parseISO(tool.issued_at), 'd MMM') : ''}. Until you confirm, it shows as not received.
                </p>
              </div>
            )}
            {broken && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-[14px] font-semibold text-white">
                  {tool.status === 'Lost' ? 'Reported lost' : 'Out of use until the office says it is fixed'}
                </p>
              </div>
            )}
            {(pat.tone === 'red' || cal.tone === 'red') && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-[14px] font-semibold text-white">Do not use it until it has been tested</p>
                <p className="mt-1 text-[13px] text-white">Its PAT test or calibration has run out. The office has been told.</p>
              </div>
            )}
            <section className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">Testing</h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[14px] text-white">
                <dt>PAT test due</dt>
                <dd className={cn('text-right font-medium', toneText[pat.tone])}>{pat.label}</dd>
                <dt>Calibration due</dt>
                <dd className={cn('text-right font-medium', toneText[cal.tone])}>{cal.label}</dd>
                <dt>Last calibrated</dt>
                <dd className="text-right">{fmt(tool.last_calibration)}</dd>
              </dl>
            </section>

            <section className={cardCn} data-help="wt-equipment.actions">
              <h2 className="text-[15px] font-semibold text-white">Something to tell the office?</h2>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setMode('fault')} disabled={tool.status === 'Lost'} className={cn(buttonSecondaryCn, 'px-3')}>
                  Report a fault
                </button>
                <button type="button" onClick={() => setMode('lost')} disabled={tool.status === 'Lost'} className={cn(buttonSecondaryCn, 'px-3')}>
                  Report it lost
                </button>
                <button type="button" onClick={() => setMode('pass')} disabled={broken} className={cn(buttonSecondaryCn, 'px-3')}>
                  Pass to someone
                </button>
                <button type="button" onClick={() => setMode('return')} className={cn(buttonSecondaryCn, 'px-3')}>
                  Hand it back
                </button>
              </div>
            </section>
          </div>

          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">History</h2>
            {tool.events.length === 0 ? (
              <p className="text-[14px] text-white">Nothing yet.</p>
            ) : (
              <ul className="divide-y divide-white/[0.08]">
                {tool.events.map((e) => (
                  <li key={e.id} className="py-2.5">
                    <p className="text-[14px] font-medium text-white">{eventLine(e)}</p>
                    <p className="text-[12.5px] text-white">
                      {[format(parseISO(e.created_at), 'd MMM, HH:mm'), e.actor_name].filter(Boolean).join(' · ')}
                    </p>
                    {e.note && <p className="text-[12.5px] text-white">{e.note}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      ) : (
        <div className="space-y-5 lg:max-w-2xl">
          {mode === 'pass' && (
            <section className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">Who are you giving it to?</h2>
              {loadingPeople ? (
                <div className="h-16 animate-pulse rounded-xl bg-white/[0.05]" />
              ) : people.length === 0 ? (
                <p className="text-[14px] text-white">Nobody else is on the team yet.</p>
              ) : (
                <ul className="-mx-1 space-y-1">
                  {people.map((p) => (
                    <li key={p.employee_id}>
                      <button
                        type="button"
                        onClick={() => setToEmployee(p.employee_id)}
                        className={cn(
                          'flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left touch-manipulation',
                          toEmployee === p.employee_id
                            ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                            : 'border-white/[0.12] bg-white/[0.06] text-white'
                        )}
                      >
                        <span className="truncate text-[14.5px]">{p.name}</span>
                        <span className="shrink-0 text-[12px]">{p.role ?? ''}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-[12.5px] text-white">They are asked to confirm they have it, and the office is told.</p>
            </section>
          )}

          {mode === 'return' && (
            <p className="text-[14px] text-white">
              Hand it to the office or leave it where they asked. It comes off your name and the office is told.
            </p>
          )}
          {mode === 'lost' && (
            <p className="text-[14px] text-white">Say where you last had it. The office is told straight away.</p>
          )}

          <div>
            <label className={labelCn} htmlFor="kit-note">
              {mode === 'fault' ? 'What is wrong with it?' : mode === 'lost' ? 'Where did you last have it? (optional)' : 'Note (optional)'}
            </label>
            <textarea
              id="kit-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={1000}
              placeholder={mode === 'fault' ? 'e.g. Test lead insulation split near the probe' : ''}
              className={textareaCn}
            />
          </div>

          {(mode === 'fault' || mode === 'lost') && (
            <div>
              <span className={labelCn}>Photo (helps the office)</span>
              {photo ? (
                <div className="relative inline-block">
                  <img src={photo.preview} alt="Your photo" className="h-28 w-28 rounded-xl object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhoto(null)}
                    aria-label="Remove the photo"
                    className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white touch-manipulation"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className={cn(buttonSecondaryCn, 'inline-flex w-full items-center justify-center gap-2 sm:w-auto sm:px-6')}
                >
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  {uploading ? 'Uploading…' : 'Take a photo'}
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  void pickPhoto(e.target.files?.[0]);
                  e.target.value = '';
                }}
              />
            </div>
          )}
        </div>
      )}
    </FormSheet>
  );
}
