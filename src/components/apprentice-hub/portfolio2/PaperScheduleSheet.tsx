/**
 * "Photo of a paper schedule" — the learner photographs a schedule of test
 * results they filled in on paper; read-paper-test-schedule reads the
 * readings; the learner checks EVERY value against the photo (side by side),
 * corrects anything wrong and confirms. Only then is the same PDF summary as
 * an Elec-Mate schedule made, with the photo attached, and the criteria are
 * suggested (suggest_work_evidence_criteria). Nothing is claimed or passed
 * here: the learner ticks claims in the capture sheet and the assessor decides.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, Camera, Images, Loader2, Plus, ScanLine, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { useAuth } from '@/contexts/AuthContext';
import { compressImageForUpload } from '@/utils/imageUploadUtils';
import {
  preparePaperSchedule,
  readPaperSchedule,
  type PaperCircuit,
  type PreparedExtraFile,
  type PreparedWorkEvidence,
} from '@/lib/portfolio/workEvidence';
import { P_BTN, P_BTN_PRIMARY, P_CARD } from './ui';

type Key = Exclude<keyof PaperCircuit, 'unclear'>;

const FIELDS: { key: Key; label: string; unit?: string; wide?: boolean }[] = [
  { key: 'circuitNumber', label: 'Circuit' },
  { key: 'circuitDescription', label: 'Description', wide: true },
  { key: 'bsStandard', label: 'Device BS (EN)' },
  { key: 'protectiveDeviceCurve', label: 'Type' },
  { key: 'protectiveDeviceRating', label: 'Rating', unit: 'A' },
  { key: 'liveSize', label: 'Live', unit: 'mm²' },
  { key: 'cpcSize', label: 'cpc', unit: 'mm²' },
  { key: 'ringR1', label: 'Ring r1', unit: 'Ω' },
  { key: 'ringRn', label: 'Ring rn', unit: 'Ω' },
  { key: 'ringR2', label: 'Ring r2', unit: 'Ω' },
  { key: 'r1r2', label: 'R1+R2', unit: 'Ω' },
  { key: 'r2', label: 'R2', unit: 'Ω' },
  { key: 'insulationLiveNeutral', label: 'IR L-N', unit: 'MΩ' },
  { key: 'insulationLiveEarth', label: 'IR L-E', unit: 'MΩ' },
  { key: 'polarity', label: 'Polarity' },
  { key: 'zs', label: 'Zs', unit: 'Ω' },
  { key: 'maxZs', label: 'Max Zs', unit: 'Ω' },
  { key: 'rcdOneX', label: 'RCD', unit: 'ms' },
];

const blankRow = (): PaperCircuit =>
  ({
    ...Object.fromEntries(FIELDS.map((f) => [f.key, ''])),
    unclear: [],
  }) as unknown as PaperCircuit;

type Step = 'photo' | 'reading' | 'confirm' | 'making';

export function PaperScheduleSheet({
  open,
  onOpenChange,
  onPrepared,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onPrepared: (p: PreparedWorkEvidence) => void;
}) {
  const { user, profile } = useAuth();
  const [step, setStep] = useState<Step>('photo');
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<PaperCircuit[]>([]);
  const [photos, setPhotos] = useState<PreparedExtraFile[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [rowsSeen, setRowsSeen] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [workDate, setWorkDate] = useState('');
  const cameraRef = useRef<HTMLInputElement | null>(null);
  const pickRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setStep('photo');
    setError(null);
    setRows([]);
    setPhotos([]);
    setPreviews((old) => {
      old.forEach((u) => URL.revokeObjectURL(u));
      return [];
    });
    setRowsSeen(0);
    setConfirmed(false);
    setWorkDate(new Date().toISOString().slice(0, 10));
  }, [open]);

  const unclearLeft = useMemo(() => rows.reduce((n, r) => n + r.unclear.length, 0), [rows]);

  const onFiles = async (list: FileList | null) => {
    if (!list || !user) return;
    const files = Array.from(list).slice(0, 3);
    if (!files.length) return;
    setError(null);
    setStep('reading');
    try {
      const blobs = await Promise.all(
        files.map(async (f) => {
          if (f.type === 'application/pdf') return f as Blob;
          try {
            return await compressImageForUpload(f);
          } catch {
            return f as Blob;
          }
        })
      );
      setPreviews(blobs.map((b) => (b.type.startsWith('image/') ? URL.createObjectURL(b) : '')));
      const { read, photos: uploaded } = await readPaperSchedule(user.id, blobs);
      setPhotos(uploaded);
      setRowsSeen(read.rowsSeen);
      if (!read.circuits.length) {
        setRows([blankRow()]);
        setError(
          read.found
            ? 'We found the schedule but could not read any rows. Type the readings in below, or try a clearer photo.'
            : 'We could not find a schedule of test results in that photo. Type the readings in below, or try again.'
        );
      } else {
        setRows(read.circuits);
      }
      setStep('confirm');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not read that photo.');
      setStep('photo');
    }
  };

  const setCell = (i: number, key: Key, value: string) =>
    setRows((prev) =>
      prev.map((r, j) =>
        j === i ? { ...r, [key]: value, unclear: r.unclear.filter((k) => k !== key) } : r
      )
    );

  const use = async () => {
    if (!user || !confirmed) return;
    setStep('making');
    setError(null);
    try {
      const prepared = await preparePaperSchedule(
        rows,
        photos,
        { userId: user.id, name: (profile?.full_name as string | undefined) ?? '' },
        workDate || null
      );
      onPrepared(prepared);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
      setStep('confirm');
    }
  };

  const busy = step === 'reading' || step === 'making';

  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => {
        if (busy) return;
        onOpenChange(o);
      }}
      width="wide"
      eyebrow="Capture · From your work"
      title="Photo of a paper schedule"
      description="Photograph a schedule of test results you filled in on paper. We read the readings, you check every one against your sheet, then it becomes evidence with your photo attached."
      footer={
        step === 'confirm' || step === 'making' ? (
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              className={P_BTN}
              onClick={() => setStep('photo')}
              disabled={busy}
            >
              Retake
            </button>
            <button
              type="button"
              className={P_BTN_PRIMARY}
              onClick={() => void use()}
              disabled={!confirmed || busy || rows.length === 0}
            >
              {step === 'making' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Use as evidence
            </button>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-5 py-2">
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-[13px] text-white"
          >
            {error}
          </p>
        )}

        {step === 'photo' && (
          <div className={cn(P_CARD, 'space-y-4')}>
            <div className="flex items-start gap-3">
              <ScanLine className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" aria-hidden />
              <p className="text-[14px] leading-relaxed text-white">
                Lay the sheet flat in good light and fill the frame with the table. Up to 3 photos
                if it runs over more than one page. Client names and addresses are not read.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                className={P_BTN_PRIMARY}
                onClick={() => cameraRef.current?.click()}
              >
                <Camera className="h-4 w-4" /> Take a photo
              </button>
              <button type="button" className={P_BTN} onClick={() => pickRef.current?.click()}>
                <Images className="h-4 w-4" /> Choose photos
              </button>
            </div>
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                void onFiles(e.target.files);
                e.target.value = '';
              }}
            />
            <input
              ref={pickRef}
              type="file"
              accept="image/*,application/pdf"
              multiple
              className="hidden"
              onChange={(e) => {
                void onFiles(e.target.files);
                e.target.value = '';
              }}
            />
          </div>
        )}

        {step === 'reading' && (
          <div className={cn(P_CARD, 'flex items-center gap-3')}>
            <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" aria-hidden />
            <p className="text-[14px] text-white">
              Reading your schedule. This takes about 10 to 30 seconds.
            </p>
          </div>
        )}

        {(step === 'confirm' || step === 'making') && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
            <div className="min-w-0 space-y-4">
              <div className="flex gap-3 rounded-2xl border border-amber-400/40 bg-amber-500/[0.1] p-3.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden />
                <p className="text-[13px] leading-snug text-white">
                  Check every reading against your paper sheet and fix anything that is wrong. Cells
                  marked Check were hard to read.
                  {rowsSeen > rows.length
                    ? ` We saw ${rowsSeen} rows but read ${rows.length}. Add the missing ones below.`
                    : ''}
                </p>
              </div>

              <ul className="space-y-3">
                {rows.map((r, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-white/[0.12] bg-white/[0.03] p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="text-[14px] font-semibold text-white">
                        Circuit {r.circuitNumber || i + 1}
                        {r.circuitDescription ? `: ${r.circuitDescription}` : ''}
                      </p>
                      <button
                        type="button"
                        onClick={() => setRows((prev) => prev.filter((_, j) => j !== i))}
                        aria-label={`Remove circuit ${r.circuitNumber || i + 1}`}
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation active:bg-white/[0.08]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4 xl:grid-cols-6">
                      {FIELDS.map((f) => {
                        const unclear = r.unclear.includes(f.key);
                        const id = `ps-${i}-${f.key}`;
                        return (
                          <div key={f.key} className={cn(f.wide && 'col-span-2')}>
                            <label
                              htmlFor={id}
                              className="flex items-center gap-1.5 text-[12.5px] font-medium text-white"
                            >
                              {f.label}
                              {f.unit ? <span className="font-normal">({f.unit})</span> : null}
                              {unclear && (
                                <span className="rounded bg-amber-400 px-1 text-[12px] font-bold text-black">
                                  Check
                                </span>
                              )}
                            </label>
                            <input
                              id={id}
                              value={r[f.key]}
                              onChange={(e) => setCell(i, f.key, e.target.value)}
                              placeholder="blank"
                              inputMode={f.unit && f.unit !== 'mm²' ? 'decimal' : undefined}
                              className={cn(
                                'h-11 w-full rounded-lg border bg-white/[0.05] px-2.5 text-[14px] text-white placeholder:text-white/25 focus:border-elec-yellow focus:outline-none',
                                unclear ? 'border-amber-400' : 'border-white/[0.14]'
                              )}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={P_BTN}
                onClick={() => setRows((prev) => [...prev, blankRow()])}
              >
                <Plus className="h-4 w-4" /> Add a circuit
              </button>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="ps-date" className="text-[12px] font-medium text-white">
                    Date of the tests
                  </label>
                  <input
                    id="ps-date"
                    type="date"
                    value={workDate}
                    onChange={(e) => setWorkDate(e.target.value)}
                    className="h-11 w-full rounded-lg border border-white/[0.14] bg-white/[0.05] px-2.5 text-[14px] text-white focus:border-elec-yellow focus:outline-none"
                  />
                </div>
              </div>

              <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-2xl border border-white/[0.12] p-3.5">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#FFD100]"
                />
                <span className="text-[13.5px] leading-snug text-white">
                  I have checked every reading against my paper schedule, and these are tests I did.
                  {unclearLeft > 0
                    ? ` ${unclearLeft} cell${unclearLeft === 1 ? ' is' : 's are'} still marked Check.`
                    : ''}
                </span>
              </label>
            </div>

            <aside className="space-y-3 lg:sticky lg:top-0 lg:self-start">
              <h3 className="text-[13px] font-semibold text-white">Your photo</h3>
              {previews.filter(Boolean).length === 0 ? (
                <p className="text-[13px] text-white">Attached as a PDF.</p>
              ) : (
                previews.filter(Boolean).map((u, i) => (
                  <a key={u} href={u} target="_blank" rel="noreferrer" className="block">
                    <img
                      src={u}
                      alt={`Paper schedule photo ${i + 1}`}
                      className="w-full rounded-xl border border-white/[0.12] object-contain"
                    />
                  </a>
                ))
              )}
              <p className="text-[12.5px] leading-snug text-white">
                The photo goes with the evidence so your assessor can compare. Suggested criteria
                come next; you tick only what the work really shows, and only your assessor can pass
                one.
              </p>
            </aside>
          </div>
        )}
      </div>
    </FormSheet>
  );
}

export default PaperScheduleSheet;
