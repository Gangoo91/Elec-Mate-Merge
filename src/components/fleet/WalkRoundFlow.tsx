/**
 * WalkRoundFlow (ELE-1984): the daily vehicle walk-round as a tap-through,
 * built for one thumb in a car park.
 *
 *   Mileage → Outside → Under the bonnet → In the cab → Send
 *
 * Every item is OK or Problem. A problem needs a photo (the server enforces
 * it too) and can carry a note. On the last step the driver says whether the
 * van is safe to drive; "No" takes it off the road and the office is told.
 *
 * mode="defect" is the one-off "Report a problem" path: pick what, photo,
 * safe to drive or not, send.
 *
 * Used by Worker Tools → My van and by the office's Daily check sheet, both
 * through submit_vehicle_check(). The footer is sticky so it works on a page
 * (window scroll) and inside a sheet's scrolling body.
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Camera, Check, Loader2, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  WALK_STAGES,
  WALK_ITEMS,
  walkLabel,
  uploadVehiclePhoto,
  removeVehiclePhoto,
  useSubmitVehicleCheck,
  walkroundError,
  type WalkItemKey,
  type DefectDraft,
} from '@/hooks/useFleetWalkround';

export interface WalkRoundVehicle {
  id: string;
  registration: string;
  make?: string | null;
  model?: string | null;
  mileage?: number | null;
}

export interface WalkRoundResult {
  status: string;
  defects: number;
  offRoad: boolean;
  kind: 'daily' | 'defect';
}

interface Props {
  vehicle: WalkRoundVehicle;
  mode?: 'daily' | 'defect';
  onDone: (result: WalkRoundResult) => void;
  onCancel?: () => void;
  /** Wider layout (two columns of items) for the office's desktop sheet. */
  wide?: boolean;
}

type Answer = boolean | undefined;
interface DefectState {
  note: string;
  photos: string[];
  uploading: number;
}

const card = 'rounded-2xl border border-white/[0.08] bg-white/[0.04]';
const inputCn =
  'h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 [color-scheme:dark] touch-manipulation';
const textareaCn =
  'w-full min-h-[72px] rounded-xl border border-white/[0.12] bg-white/[0.03] px-3 py-2.5 text-[15px] text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none touch-manipulation';

const emptyDefect = (): DefectState => ({ note: '', photos: [], uploading: 0 });

export function WalkRoundFlow({ vehicle, mode = 'daily', onDone, onCancel, wide }: Props) {
  const submit = useSubmitVehicleCheck();

  // Steps: daily = mileage, 3 stages, send. defect = one step.
  const steps = mode === 'daily' ? ['mileage', ...WALK_STAGES.map((s) => s.id), 'send'] : ['report'];
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd');
  const [mileage, setMileage] = useState('');
  const [answers, setAnswers] = useState<Partial<Record<WalkItemKey, Answer>>>({});
  const [defects, setDefects] = useState<Record<string, DefectState>>({});
  const [otherOpen, setOtherOpen] = useState(mode === 'defect');
  const [reportKey, setReportKey] = useState<WalkItemKey | 'other' | null>(null);
  const [safe, setSafe] = useState<boolean | null>(null);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const sentRef = useRef(false);
  const uploadedRef = useRef<string[]>([]);
  const topRef = useRef<HTMLDivElement>(null);

  // Abandoned photos: remove anything uploaded if the flow closes unsent.
  useEffect(
    () => () => {
      if (!sentRef.current) uploadedRef.current.forEach((p) => void removeVehiclePhoto(p));
    },
    []
  );
  // Free the local previews.
  useEffect(
    () => () => {
      Object.values(previews).forEach((u) => URL.revokeObjectURL(u));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const current = steps[step];
  const stage = WALK_STAGES.find((s) => s.id === current);

  const failedKeys = useMemo(
    () => WALK_ITEMS.filter((i) => answers[i.key] === false).map((i) => i.key),
    [answers]
  );
  const defectKeys: (WalkItemKey | 'other')[] =
    mode === 'daily'
      ? [...failedKeys, ...(otherOpen ? (['other'] as const) : [])]
      : reportKey
        ? [reportKey]
        : [];
  const problemCount = defectKeys.length;
  const anyUploading = Object.values(defects).some((d) => d.uploading > 0);

  const defectOf = (k: string) => defects[k] ?? emptyDefect();
  const setDefect = (k: string, patch: Partial<DefectState>) =>
    setDefects((prev) => ({ ...prev, [k]: { ...(prev[k] ?? emptyDefect()), ...patch } }));

  const dropDefectPhotos = (k: string) => {
    const d = defects[k];
    if (!d) return;
    d.photos.forEach((p) => void removeVehiclePhoto(p));
    uploadedRef.current = uploadedRef.current.filter((p) => !d.photos.includes(p));
    setDefects((prev) => {
      const next = { ...prev };
      delete next[k];
      return next;
    });
  };

  const answer = (key: WalkItemKey, ok: boolean) => {
    setError(null);
    setAnswers((prev) => ({ ...prev, [key]: ok }));
    if (ok) dropDefectPhotos(key);
  };

  const addPhotos = async (k: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    const list = Array.from(files).slice(0, 6 - defectOf(k).photos.length);
    setDefects((prev) => ({
      ...prev,
      [k]: { ...(prev[k] ?? emptyDefect()), uploading: (prev[k]?.uploading ?? 0) + list.length },
    }));
    for (const f of list) {
      try {
        const path = await uploadVehiclePhoto(vehicle.id, f);
        uploadedRef.current.push(path);
        setPreviews((p) => ({ ...p, [path]: URL.createObjectURL(f) }));
        setDefects((prev) => {
          const d = prev[k] ?? emptyDefect();
          return { ...prev, [k]: { ...d, photos: [...d.photos, path], uploading: d.uploading - 1 } };
        });
      } catch {
        setDefects((prev) => {
          const d = prev[k] ?? emptyDefect();
          return { ...prev, [k]: { ...d, uploading: Math.max(0, d.uploading - 1) } };
        });
        setError('A photo did not upload. Check your signal and take it again.');
      }
    }
  };

  const removePhoto = (k: string, path: string) => {
    void removeVehiclePhoto(path);
    uploadedRef.current = uploadedRef.current.filter((p) => p !== path);
    setDefect(k, { photos: defectOf(k).photos.filter((p) => p !== path) });
  };

  /* ── What stops Next ─────────────────────────────────────────────── */
  const blocker = (): string | null => {
    if (current === 'mileage') {
      const n = Number(mileage);
      if (!mileage.trim()) return 'Enter the mileage';
      if (!Number.isFinite(n) || n < 0 || n > 2000000) return 'That mileage does not look right';
      return null;
    }
    if (stage) {
      const left = stage.items.filter((i) => answers[i.key] === undefined).length;
      if (left > 0) return `${left} still to check`;
      const noPhoto = stage.items.find((i) => answers[i.key] === false && defectOf(i.key).photos.length === 0);
      if (noPhoto) return `Add a photo of the ${noPhoto.label.toLowerCase()}`;
      return null;
    }
    if (current === 'send' || current === 'report') {
      if (mode === 'defect' && !reportKey) return 'Pick what is wrong';
      for (const k of defectKeys) {
        if (k === 'other' && !defectOf('other').note.trim()) return 'Say what the other problem is';
        if (defectOf(k).photos.length === 0) return `Add a photo of the ${walkLabel(k).toLowerCase()}`;
      }
      if (problemCount > 0 && safe === null) return 'Say if it is safe to drive';
      return null;
    }
    return null;
  };
  const block = anyUploading ? 'Uploading photo…' : blocker();

  const go = (delta: 1 | -1) => {
    setError(null);
    setDir(delta > 0 ? 'fwd' : 'back');
    setStep((s) => Math.max(0, Math.min(steps.length - 1, s + delta)));
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }));
  };

  const send = async () => {
    setError(null);
    const drafts: DefectDraft[] = defectKeys.map((k) => ({
      key: k,
      note: defectOf(k).note,
      photos: defectOf(k).photos,
    }));
    const results: Partial<Record<WalkItemKey, boolean>> = {};
    WALK_ITEMS.forEach((i) => {
      results[i.key] = answers[i.key] !== false;
    });
    try {
      const res = await submit.mutateAsync({
        vehicleId: vehicle.id,
        kind: mode,
        mileage: mode === 'daily' ? Number(mileage) : null,
        results,
        defects: drafts,
        offRoad: problemCount > 0 && safe === false,
        notes,
      });
      sentRef.current = true;
      onDone({ status: res.status, defects: res.defects, offRoad: res.off_road, kind: mode });
    } catch (e) {
      setError(walkroundError(e));
    }
  };

  const isLast = step === steps.length - 1;
  const lastMileage = vehicle.mileage ?? 0;
  const mileageLow = mileage.trim() !== '' && Number(mileage) < lastMileage;

  return (
    <div className="flex flex-col min-h-full">
      <div ref={topRef} className="scroll-mt-24" />

      {/* Progress */}
      {mode === 'daily' && (
        <div className="mb-5">
          <div className="flex items-center justify-between text-[12px] font-medium text-white">
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <span className="tabular-nums">{vehicle.registration}</span>
          </div>
          <div className="mt-2 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((s, i) => (
              <span
                key={s}
                className={cn(
                  'h-1.5 rounded-full transition-colors',
                  i < step ? 'bg-emerald-400' : i === step ? 'bg-elec-yellow' : 'bg-white/[0.12]'
                )}
              />
            ))}
          </div>
        </div>
      )}

      <div
        key={current}
        className={cn('flex-1 space-y-4', dir === 'fwd' ? 'animate-mw-step-in' : 'animate-mw-step-back')}
      >
        {current === 'mileage' && (
          <section className={cn(card, 'p-4 sm:p-5')}>
            <h3 className="text-[20px] font-semibold tracking-tight text-white">What does the clock say?</h3>
            <p className="mt-1 text-[14px] text-white">
              The mileage on the dash, to the nearest mile.
              {lastMileage > 0 && ` Last recorded: ${lastMileage.toLocaleString('en-GB')}.`}
            </p>
            <input
              data-help="van.mileage"
              type="number"
              inputMode="numeric"
              autoFocus
              value={mileage}
              onChange={(e) => setMileage(e.target.value.replace(/[^\d]/g, ''))}
              placeholder="Type the mileage"
              className={cn(
                inputCn,
                'mt-4 h-14 text-[28px] font-semibold tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
              )}
              aria-label="Mileage"
            />
            {mileageLow && (
              <p className="mt-2 text-[13px] text-orange-300">
                That is lower than last time. Double check the clock.
              </p>
            )}
          </section>
        )}

        {stage && (
          <>
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-[20px] font-semibold tracking-tight text-white">{stage.title}</h3>
                <p className="mt-0.5 text-[14px] text-white">{stage.lead}</p>
              </div>
              <button
                type="button"
                data-help="van.allok"
                onClick={() =>
                  setAnswers((prev) => {
                    const next = { ...prev };
                    stage.items.forEach((i) => {
                      if (next[i.key] === undefined) next[i.key] = true;
                    });
                    return next;
                  })
                }
                className="h-11 shrink-0 rounded-xl border border-white/[0.14] bg-white/[0.06] px-3.5 text-[13.5px] font-semibold text-white touch-manipulation active:scale-[0.98]"
              >
                Rest all OK
              </button>
            </div>
            <div className={cn('grid gap-2.5', wide && 'lg:grid-cols-2')}>
              {stage.items.map((item, idx) => (
                <ItemCard
                  key={item.key}
                  first={idx === 0}
                  label={item.label}
                  hint={item.hint}
                  value={answers[item.key]}
                  onAnswer={(ok) => answer(item.key, ok)}
                >
                  {answers[item.key] === false && (
                    <DefectEditor
                      what={item.label}
                      state={defectOf(item.key)}
                      previews={previews}
                      onNote={(note) => setDefect(item.key, { note })}
                      onAdd={(files) => void addPhotos(item.key, files)}
                      onRemove={(p) => removePhoto(item.key, p)}
                    />
                  )}
                </ItemCard>
              ))}
            </div>
          </>
        )}

        {current === 'report' && (
          <section className={cn(card, 'p-4 sm:p-5 space-y-4')}>
            <div>
              <h3 className="text-[20px] font-semibold tracking-tight text-white">What’s wrong?</h3>
              <p className="mt-0.5 text-[14px] text-white">Pick the closest, or Something else.</p>
            </div>
            <div className="flex flex-wrap gap-2" data-help="van.report-what">
              {[...WALK_ITEMS.map((i) => ({ key: i.key as WalkItemKey | 'other', label: i.label })), { key: 'other' as const, label: 'Something else' }].map(
                (o) => (
                  <button
                    key={o.key}
                    type="button"
                    onClick={() => {
                      if (reportKey && reportKey !== o.key) {
                        // Keep any photos already taken: move them to the new pick.
                        const prev = defectOf(reportKey);
                        setDefects({ [o.key]: prev });
                      }
                      setReportKey(o.key);
                    }}
                    className={cn(
                      'h-11 rounded-full border px-4 text-[14px] touch-manipulation',
                      reportKey === o.key
                        ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                        : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
                    )}
                  >
                    {o.label}
                  </button>
                )
              )}
            </div>
            {reportKey && (
              <DefectEditor
                what={reportKey === 'other' ? 'the problem' : walkLabel(reportKey)}
                noteRequired={reportKey === 'other'}
                state={defectOf(reportKey)}
                previews={previews}
                onNote={(note) => setDefect(reportKey, { note })}
                onAdd={(files) => void addPhotos(reportKey, files)}
                onRemove={(p) => removePhoto(reportKey, p)}
              />
            )}
          </section>
        )}

        {current === 'send' && (
          <section className="space-y-4">
            <div className={cn(card, 'p-4 sm:p-5')}>
              <h3 className="text-[20px] font-semibold tracking-tight text-white">
                {failedKeys.length === 0 ? 'All good' : `${failedKeys.length} ${failedKeys.length === 1 ? 'problem' : 'problems'} found`}
              </h3>
              <p className="mt-1 text-[14px] text-white">
                {Number(mileage).toLocaleString('en-GB')} miles ·{' '}
                {WALK_ITEMS.length - failedKeys.length} of {WALK_ITEMS.length} OK
              </p>
              {failedKeys.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {failedKeys.map((k) => (
                    <li
                      key={k}
                      className="rounded-full border border-red-400/40 bg-red-500/15 px-3 py-1 text-[13px] font-medium text-white"
                    >
                      {walkLabel(k)}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={cn(card, 'p-4 sm:p-5')}>
              {!otherOpen ? (
                <button
                  type="button"
                  onClick={() => setOtherOpen(true)}
                  className="h-11 w-full rounded-xl border border-white/[0.14] bg-white/[0.04] text-[14px] font-semibold text-white touch-manipulation"
                >
                  Something else wrong?
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[15px] font-semibold text-white">Something else</h4>
                    <button
                      type="button"
                      onClick={() => {
                        dropDefectPhotos('other');
                        setOtherOpen(false);
                      }}
                      className="h-11 px-3 text-[13px] font-medium text-white underline underline-offset-4 touch-manipulation"
                    >
                      Remove
                    </button>
                  </div>
                  <DefectEditor
                    what="the problem"
                    noteRequired
                    state={defectOf('other')}
                    previews={previews}
                    onNote={(note) => setDefect('other', { note })}
                    onAdd={(files) => void addPhotos('other', files)}
                    onRemove={(p) => removePhoto('other', p)}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {(current === 'send' || current === 'report') && problemCount > 0 && (
          <section className={cn(card, 'p-4 sm:p-5')} data-help="van.safe">
            <h3 className="text-[16px] font-semibold text-white">Is it safe to drive?</h3>
            <p className="mt-0.5 text-[13.5px] text-white">
              If in doubt, don’t. The office will sort it.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setSafe(true)}
                className={cn(
                  'min-h-[52px] rounded-xl border px-4 text-left text-[15px] font-semibold touch-manipulation',
                  safe === true
                    ? 'bg-emerald-500 border-emerald-500 text-black'
                    : 'bg-white/[0.06] border-white/[0.12] text-white'
                )}
              >
                Yes, safe to drive
              </button>
              <button
                type="button"
                onClick={() => setSafe(false)}
                className={cn(
                  'min-h-[52px] rounded-xl border px-4 text-left text-[15px] font-semibold touch-manipulation',
                  safe === false
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'bg-white/[0.06] border-white/[0.12] text-white'
                )}
              >
                No, take it off the road
              </button>
            </div>
          </section>
        )}

        {(current === 'send' || current === 'report') && (
          <section className={cn(card, 'p-4 sm:p-5')}>
            <label className="block text-[12px] font-medium text-white mb-1.5" htmlFor="walk-notes">
              Anything else for the office? (optional)
            </label>
            <textarea
              id="walk-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Rear door sticks in the cold"
              className={textareaCn}
            />
          </section>
        )}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 z-10 -mx-4 mt-5 border-t border-white/[0.08] bg-[hsl(0_0%_8%)]/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur sm:mx-0 sm:rounded-2xl sm:border">
        {error && (
          <p role="alert" className="mb-2 flex items-start gap-2 text-[13.5px] text-red-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </p>
        )}
        {!error && block && <p className="mb-2 text-[13px] text-white">{block}</p>}
        <div className="flex gap-2">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => go(-1)}
              className="h-12 w-28 shrink-0 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[15px] font-semibold text-white touch-manipulation"
            >
              Back
            </button>
          ) : onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="h-12 w-28 shrink-0 rounded-xl border border-white/[0.14] bg-white/[0.06] text-[15px] font-semibold text-white touch-manipulation"
            >
              Cancel
            </button>
          ) : null}
          {isLast ? (
            <button
              type="button"
              data-help="van.send"
              disabled={!!block || submit.isPending}
              onClick={() => void send()}
              className={cn(
                'h-12 flex-1 rounded-xl text-[15px] font-semibold touch-manipulation inline-flex items-center justify-center gap-2 disabled:opacity-40',
                problemCount > 0 && safe === false ? 'bg-red-500 text-white' : 'bg-elec-yellow text-black'
              )}
            >
              {submit.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : mode === 'defect' ? (
                'Send to the office'
              ) : problemCount > 0 && safe === false ? (
                'Send and take off the road'
              ) : (
                'Send check'
              )}
            </button>
          ) : (
            <button
              type="button"
              data-help="van.next"
              disabled={!!block}
              onClick={() => go(1)}
              className="h-12 flex-1 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black touch-manipulation disabled:opacity-40"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── One item: OK or Problem ─────────────────────────────────────────── */

function ItemCard({
  label,
  hint,
  value,
  onAnswer,
  first,
  children,
}: {
  label: string;
  hint: string;
  value: Answer;
  onAnswer: (ok: boolean) => void;
  first?: boolean;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        card,
        'p-3.5 sm:p-4 transition-colors',
        value === false && 'border-red-400/40 bg-red-500/[0.06]',
        value === true && 'border-emerald-400/30'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-semibold text-white">{label}</p>
          <p className="mt-0.5 text-[13px] leading-snug text-white">{hint}</p>
        </div>
        <div className="flex shrink-0 gap-1.5" data-help={first ? 'van.item' : undefined}>
          <button
            type="button"
            aria-pressed={value === true}
            aria-label={`${label} OK`}
            onClick={() => onAnswer(true)}
            className={cn(
              'h-12 min-w-[60px] rounded-xl border px-3 text-[14px] font-semibold touch-manipulation inline-flex items-center justify-center gap-1 active:scale-[0.97]',
              value === true
                ? 'bg-emerald-500 border-emerald-500 text-black'
                : 'bg-white/[0.06] border-white/[0.12] text-white'
            )}
          >
            {value === true && <Check className="h-4 w-4" />}OK
          </button>
          <button
            type="button"
            aria-pressed={value === false}
            aria-label={`${label} problem`}
            onClick={() => onAnswer(false)}
            className={cn(
              'h-12 min-w-[76px] rounded-xl border px-3 text-[14px] font-semibold touch-manipulation active:scale-[0.97]',
              value === false
                ? 'bg-red-500 border-red-500 text-white'
                : 'bg-white/[0.06] border-white/[0.12] text-white'
            )}
          >
            Problem
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── Photo + note for one problem ────────────────────────────────────── */

function DefectEditor({
  what,
  state,
  previews,
  onNote,
  onAdd,
  onRemove,
  noteRequired,
}: {
  what: string;
  state: DefectState;
  previews: Record<string, string>;
  onNote: (note: string) => void;
  onAdd: (files: FileList | null) => void;
  onRemove: (path: string) => void;
  noteRequired?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const full = state.photos.length + state.uploading >= 6;
  return (
    <div className="mt-3 space-y-3 border-t border-white/[0.08] pt-3">
      <div className="flex flex-wrap items-center gap-2">
        {state.photos.map((p) => (
          <div key={p} className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04]">
            {previews[p] ? (
              <img src={previews[p]} alt={`Photo of ${what}`} className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full items-center justify-center text-[11px] text-white">Photo</span>
            )}
            <button
              type="button"
              aria-label="Remove photo"
              onClick={() => onRemove(p)}
              className="absolute right-0.5 top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-white touch-manipulation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {Array.from({ length: state.uploading }).map((_, i) => (
          <div
            key={`up-${i}`}
            className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04]"
          >
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          </div>
        ))}
        {!full && (
          <button
            type="button"
            data-help="van.photo"
            onClick={() => inputRef.current?.click()}
            className={cn(
              'h-16 rounded-xl border px-4 text-[14px] font-semibold touch-manipulation inline-flex items-center gap-2',
              state.photos.length === 0
                ? 'bg-elec-yellow border-elec-yellow text-black'
                : 'bg-white/[0.06] border-white/[0.12] text-white'
            )}
          >
            <Camera className="h-5 w-5" />
            {state.photos.length === 0 ? 'Take a photo' : 'Add another'}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={(e) => {
            onAdd(e.target.files);
            e.target.value = '';
          }}
        />
      </div>
      <div>
        <label className="sr-only" htmlFor={`note-${what}`}>
          What is wrong with {what}
        </label>
        <textarea
          id={`note-${what}`}
          value={state.note}
          onChange={(e) => onNote(e.target.value)}
          placeholder={noteRequired ? 'What is wrong? (needed)' : 'What is wrong? (optional)'}
          className={textareaCn}
        />
      </div>
    </div>
  );
}
