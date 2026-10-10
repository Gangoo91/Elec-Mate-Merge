/**
 * ELE-2067 — Bring your data across: the import wizard.
 *
 * Where from → files → match the columns → check (a dry run against the real
 * database, rolled back) → import with progress → done, with undo. Nothing
 * is written until the person presses Import, and every record the import
 * creates can be taken out again in one go.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ExternalLink, Loader2, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  PrimaryButton,
  SecondaryButton,
  selectTriggerClass,
} from '@/components/employer/editorial';
import {
  PanelHead,
  Row,
  Rows,
  StatusPill,
  panelShellClass,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { toast } from '@/hooks/use-toast';
import type { ImportKind, KindSummary, MappedFile, SourceSystem } from '@/lib/firmImport/types';
import { KIND_FIELDS, KIND_LABEL, KIND_ORDER } from '@/lib/firmImport/types';
import { SOURCES, autoMap, guessMap, sourceInfo, splitByDocType } from '@/lib/firmImport/sources';
import { ACCEPT, parseExportFile } from '@/lib/firmImport/parse';
import { cellText, invoicesNeedStatusAnswer, type DateOrder } from '@/lib/firmImport/normalise';
import {
  buildPayload,
  chooseDateOrder,
  dryRunImport,
  payloadTotal,
  runImport,
  undoImport,
  type InvoiceStatusAnswers,
  type UndoResult,
} from '@/lib/firmImport/run';

type Step = 'source' | 'files' | 'columns' | 'check' | 'import' | 'done';

const STEP_TITLE: Record<Step, string> = {
  source: 'Where are you coming from?',
  files: 'Add your export files',
  columns: 'Match the columns',
  check: 'Check before importing',
  import: 'Importing',
  done: 'Imported',
};

/** The four steps the person moves through; importing and done follow on. */
const STEP_NO: Partial<Record<Step, number>> = { source: 1, files: 2, columns: 3, check: 4 };

/** Where each record type lands, for the done screen. */
const LANDS_IN: Record<ImportKind, string> = {
  customers: 'Clients',
  sites: 'Clients, on each customer',
  jobs: 'Jobs. Finished ones are in Archived jobs',
  quotes: 'Quotes and invoices, marked Imported',
  invoices: 'Quotes and invoices, marked Imported',
  price_book: 'Price book, in a list named after your old system',
  staff: 'People, as not joined yet. Nobody is invited',
  assets: 'Kit',
};

/** The nearest scrolling box above an element (the sheet body). */
function scrollParent(el: HTMLElement | null): HTMLElement | null {
  for (let p = el?.parentElement ?? null; p; p = p.parentElement) {
    const o = getComputedStyle(p).overflowY;
    if ((o === 'auto' || o === 'scroll') && p.scrollHeight > p.clientHeight) return p;
  }
  return null;
}

const NONE = '__none__';

function Chip({
  on,
  children,
  onClick,
}: {
  on: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        'flex h-12 min-w-0 items-center justify-center rounded-xl border px-3 text-center text-[14px] font-semibold touch-manipulation transition-colors',
        on
          ? 'border-elec-yellow bg-elec-yellow text-black'
          : 'border-white/[0.14] bg-white/[0.04] text-white hover:bg-white/[0.08]'
      )}
    >
      <span className="truncate">{children}</span>
    </button>
  );
}

function Bar({ done, total }: { done: number; total: number }) {
  const pct = total ? Math.min(100, Math.round((done / total) * 100)) : 0;
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-elec-yellow transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ImportWizardSheet({
  open,
  onOpenChange,
  firmId,
  onAskMigration,
  onImported,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  firmId: string;
  /** Owner only: open the free move request. */
  onAskMigration?: () => void;
  onImported: () => void;
}) {
  const [step, setStep] = useState<Step>('source');
  const [source, setSource] = useState<SourceSystem | null>(null);
  const [files, setFiles] = useState<MappedFile[]>([]);
  const [reading, setReading] = useState(false);
  const [dateOrder, setDateOrder] = useState<DateOrder>('dmy');
  const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatusAnswers>({});
  const [preview, setPreview] = useState<KindSummary[] | null>(null);
  const [progress, setProgress] = useState<{
    done: number;
    total: number;
    label: string;
    kind?: ImportKind;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    batchId: string;
    summary: KindSummary[];
    stopped: boolean;
  } | null>(null);
  const [undone, setUndone] = useState<{
    deleted: number;
    kept: number;
    keptRows: UndoResult['keptRows'];
  } | null>(null);
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});
  const stopRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Each step opens at its top, not wherever the last one was scrolled to.
  useEffect(() => {
    const box = scrollParent(topRef.current);
    if (box) box.scrollTop = 0;
  }, [step, undone]);

  const info = source ? sourceInfo(source) : null;
  const usable = useMemo(() => files.filter((f) => f.kind), [files]);
  const payload = useMemo(
    () => buildPayload(usable, dateOrder, invoiceStatus),
    [usable, dateOrder, invoiceStatus]
  );
  /** Invoices files that say nothing about payment: the person tells us. */
  const needsPaidAnswer = usable.filter(
    (f) => f.kind === 'invoices' && invoicesNeedStatusAnswer(f.map)
  );
  const unansweredPaid = needsPaidAnswer.filter((f) => !invoiceStatus[f.file.id]);
  const total = payloadTotal(payload);
  const sum = (list: KindSummary[] | null | undefined, k: 'created' | 'matched' | 'skipped') =>
    (list ?? []).reduce((n, x) => n + x[k], 0);
  const willAdd = preview ? sum(preview, 'created') : total;
  /** A row repeated inside the export is not "already in Elec-Mate"; count it apart. */
  const repeats = (x: KindSummary) =>
    x.notes.filter((n) => n.reason === 'In your file twice').length;
  const alreadyHere = (list: KindSummary[] | null | undefined) =>
    (list ?? []).reduce((n, x) => n + Math.max(0, x.matched - repeats(x)), 0);
  const newFromOthers = (list: KindSummary[] | null | undefined) =>
    (list ?? []).reduce((n, x) => n + x.newCustomers, 0);
  const repeatedRows = (list: KindSummary[] | null | undefined) =>
    (list ?? []).reduce((n, x) => n + repeats(x), 0);
  const detailFor = (x: KindSummary, here: string, fallback: string) =>
    [
      x.matched - repeats(x) > 0 ? `${x.matched - repeats(x)} ${here}` : null,
      repeats(x) ? `${repeats(x)} repeated in your file` : null,
      x.skipped ? `${x.skipped} left out` : null,
    ]
      .filter(Boolean)
      .join(' · ') || fallback;
  /** Where each record type sits in the run, for the progress list. */
  const kindRanges = useMemo(() => {
    let at = 0;
    return KIND_ORDER.filter((k) => payload[k]?.length).map((k) => {
      const start = at;
      at += payload[k]!.length;
      return { kind: k, start, end: at };
    });
  }, [payload]);

  const reset = () => {
    setStep('source');
    setSource(null);
    setFiles([]);
    setInvoiceStatus({});
    setPreview(null);
    setProgress(null);
    setResult(null);
    setUndone(null);
    setShowAll({});
    setBusy(false);
  };

  const close = (o: boolean) => {
    if (!o && busy) return; // never close mid-import
    onOpenChange(o);
    if (!o) setTimeout(reset, 300);
  };

  const addFiles = async (list: FileList | null) => {
    if (!list || !source) return;
    setReading(true);
    const next: MappedFile[] = [];
    for (const f of Array.from(list)) {
      try {
        const parsed = await parseExportFile(f);
        if (!parsed.rows.length) {
          toast({ title: `${f.name} has no rows`, variant: 'destructive' });
          continue;
        }
        const split = splitByDocType(parsed);
        if (split) {
          for (const s of split.files)
            next.push({
              file: s.file,
              kind: s.kind,
              map: guessMap(s.kind, s.file.headers, source),
              confidence: 0.9,
            });
          if (split.dropped)
            toast({
              title: `${plural(split.dropped, 'row')} in ${f.name} left out`,
              description: 'Supplier bills, credit notes and expenses are not imported.',
            });
        } else {
          const a = autoMap(parsed, source);
          next.push({ file: parsed, kind: a.kind, map: a.map, confidence: a.confidence });
        }
      } catch (e) {
        toast({
          title: 'Could not read that file',
          description: e instanceof Error ? e.message : String(e),
          variant: 'destructive',
        });
      }
    }
    setFiles((prev) => {
      const all = [...prev, ...next];
      setDateOrder(chooseDateOrder(all, sourceInfo(source).dateOrder));
      return all;
    });
    setPreview(null);
    setReading(false);
  };

  const setKind = (id: string, kind: ImportKind | null) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.file.id === id
          ? { ...f, kind, map: kind && source ? guessMap(kind, f.file.headers, source) : {} }
          : f
      )
    );
    setPreview(null);
  };

  const setCol = (id: string, field: string, cols: string[]) => {
    setFiles((prev) =>
      prev.map((f) => (f.file.id === id ? { ...f, map: { ...f.map, [field]: cols } } : f))
    );
    setPreview(null);
  };

  const missingRequired = usable.flatMap((f) =>
    KIND_FIELDS[f.kind!]
      .filter((d) => d.required && !f.map[d.key]?.length)
      .map((d) => `${f.file.name}: ${d.label}`)
  );

  const runCheck = async () => {
    setBusy(true);
    setPreview(null);
    setProgress({ done: 0, total, label: 'Checking' });
    try {
      const res = await dryRunImport(firmId, source!, payload, (done, t, kind) =>
        setProgress({ done, total: t, label: `Checking ${KIND_LABEL[kind].many.toLowerCase()}` })
      );
      setPreview(res);
    } catch (e) {
      toast({
        title: 'The check did not finish',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const runReal = async () => {
    setStep('import');
    setBusy(true);
    stopRef.current = false;
    setProgress({ done: 0, total, label: 'Starting' });
    try {
      const res = await runImport(
        firmId,
        source!,
        files.map((f) => f.file.name),
        payload,
        (done, t, kind) =>
          setProgress({
            done,
            total: t,
            label: `Bringing in ${KIND_LABEL[kind].many.toLowerCase()}`,
            kind,
          }),
        () => stopRef.current
      );
      setResult({ ...res, stopped: stopRef.current });
      setStep('done');
      onImported();
    } catch (e) {
      const batchId = (e as { batchId?: string }).batchId;
      toast({
        title: 'The import stopped',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
      if (batchId) {
        setResult({ batchId, summary: [], stopped: true });
        setStep('done');
        onImported();
      } else setStep('check');
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const runUndo = async () => {
    if (!result) return;
    setBusy(true);
    setProgress({ done: 0, total: 1, label: 'Taking it out again' });
    try {
      const r = await undoImport(result.batchId, (deleted, remaining) =>
        setProgress({ done: deleted, total: deleted + remaining, label: 'Taking it out again' })
      );
      setUndone({ deleted: r.deleted, kept: r.kept, keptRows: r.keptRows });
      onImported();
    } catch (e) {
      toast({
        title: 'Undo did not finish',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  // ── Footer ──
  const back: Partial<Record<Step, Step>> = { files: 'source', columns: 'files', check: 'columns' };
  const footer = (() => {
    if (step === 'import') {
      return (
        <SecondaryButton fullWidth onClick={() => (stopRef.current = true)}>
          Stop after this batch
        </SecondaryButton>
      );
    }
    if (step === 'done') {
      return (
        <div className="flex gap-2">
          {!undone && (
            <SecondaryButton className="flex-1" disabled={busy} onClick={runUndo}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Undo this import'}
            </SecondaryButton>
          )}
          <PrimaryButton className="flex-1" disabled={busy} onClick={() => close(false)}>
            Done
          </PrimaryButton>
        </div>
      );
    }
    const primary =
      step === 'source'
        ? { label: 'Next', disabled: !source, go: () => setStep('files') }
        : step === 'files'
          ? { label: 'Next', disabled: !usable.length || reading, go: () => setStep('columns') }
          : step === 'columns'
            ? {
                label: 'Check it',
                disabled: !!missingRequired.length || !!unansweredPaid.length || !total,
                go: () => {
                  setStep('check');
                  void runCheck();
                },
              }
            : {
                label: preview && willAdd ? `Import ${plural(willAdd, 'record')}` : 'Import',
                disabled: busy || !preview || !willAdd,
                go: runReal,
              };
    return (
      <div className="flex gap-2">
        {back[step] && (
          <SecondaryButton
            className="flex-1 sm:flex-none"
            disabled={busy}
            onClick={() => setStep(back[step]!)}
          >
            Back
          </SecondaryButton>
        )}
        <PrimaryButton className="flex-1" disabled={primary.disabled} onClick={primary.go}>
          {busy && step === 'check' ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Checking
            </span>
          ) : (
            primary.label
          )}
        </PrimaryButton>
      </div>
    );
  })();

  const kindOptions = [
    { value: NONE, label: 'Leave this file out' },
    ...KIND_ORDER.map((k) => ({ value: k, label: KIND_LABEL[k].many })),
  ];

  return (
    <FormSheet
      open={open}
      onOpenChange={close}
      width="wide"
      eyebrow={
        STEP_NO[step]
          ? `Bring your data across · Step ${STEP_NO[step]} of 4`
          : 'Bring your data across'
      }
      title={step === 'done' && undone ? 'Import undone' : STEP_TITLE[step]}
      description={
        step === 'source'
          ? 'Pick the system you use now. We read its export files on this device, show you what will come across, and only save when you say so.'
          : step === 'files'
            ? 'Add every file you exported. We work out what is in each one; change it if we got it wrong.'
            : step === 'columns'
              ? 'We have matched what we could. Check the ones that matter: names, numbers, dates and money.'
              : step === 'check'
                ? preview
                  ? [
                      `${plural(willAdd, 'new record')}`,
                      alreadyHere(preview) ? `${alreadyHere(preview)} already in Elec-Mate` : null,
                      repeatedRows(preview)
                        ? `${repeatedRows(preview)} repeated in your file`
                        : null,
                      sum(preview, 'skipped') ? `${sum(preview, 'skipped')} left out` : null,
                      newFromOthers(preview)
                        ? `${plural(newFromOthers(preview), 'new customer')} from your other files`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(', ') + '. Nothing is saved until you press Import.'
                  : 'Checking your files against what is already in Elec-Mate. Nothing is saved yet.'
                : step === 'import'
                  ? 'Keep this open until it finishes. You can stop after the current batch.'
                  : step === 'done' && result
                    ? undone
                      ? `${plural(undone.deleted, 'record')} taken out.` +
                        (undone.kept
                          ? ` ${plural(undone.kept, 'record')} kept because they have been used or changed since.`
                          : '')
                      : result.stopped
                        ? 'Stopped part way. What got in is listed below and can be undone.'
                        : `${plural(sum(result.summary, 'created'), 'record')} added. Nothing was sent to your customers.`
                    : undefined
      }
      footer={footer}
    >
      <div ref={topRef} hidden />
      {/* ── 1. Source ── */}
      {step === 'source' && (
        <div className="lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
          <div className="grid grid-cols-2 content-start gap-2 self-start sm:grid-cols-3">
            {SOURCES.map((s) => (
              <Chip key={s.key} on={source === s.key} onClick={() => setSource(s.key)}>
                {s.key === 'generic' ? 'Something else' : s.label}
              </Chip>
            ))}
          </div>
          <div className="mt-5 lg:mt-0">
            {info ? (
              <div className={panelShellClass}>
                <PanelHead
                  title={`Getting your files out of ${info.key === 'generic' ? 'another system' : info.label}`}
                />
                <ol className="space-y-2 px-4 py-4 text-[14px] leading-snug text-white sm:px-5">
                  {info.steps.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="w-5 shrink-0 tabular-nums text-elec-yellow">{i + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                {info.helpUrl && (
                  <a
                    href={info.helpUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 items-center gap-1.5 border-t border-white/[0.07] px-4 text-[13px] font-semibold text-elec-yellow touch-manipulation sm:px-5"
                  >
                    {info.label} help on exporting{' '}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </div>
            ) : (
              <p className="text-[14px] text-white">
                Choose a system to see how to get your files out of it.
              </p>
            )}
            {onAskMigration ? (
              <button
                type="button"
                onClick={onAskMigration}
                className="mt-3 flex min-h-11 w-full items-center text-left text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
              >
                Rather we did it? We will move you across for free.
              </button>
            ) : (
              <p className="mt-3 text-[13px] text-white">
                Rather we did it? The account owner can ask us to move you across for free.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── 2. Files ── */}
      {step === 'files' && (
        <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
          <div className="min-w-0 space-y-4">
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              multiple
              className="hidden"
              data-testid="import-file-input"
              onChange={(e) => {
                void addFiles(e.target.files);
                e.target.value = '';
              }}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                void addFiles(e.dataTransfer.files);
              }}
              className="flex min-h-[96px] w-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/[0.2] bg-white/[0.02] px-4 text-white touch-manipulation hover:bg-white/[0.05]"
            >
              {reading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Upload className="h-5 w-5" aria-hidden />
              )}
              <span className="text-[15px] font-semibold">
                {reading ? 'Reading…' : 'Choose files'}
              </span>
              <span className="text-[13px]">
                CSV or Excel. Add as many as you have: customers, jobs, invoices and so on.
              </span>
            </button>

            {files.length > 0 && (
              <div className={panelShellClass}>
                <PanelHead
                  title="Your files"
                  meta={
                    <span className="text-[13px] text-white">{plural(files.length, 'file')}</span>
                  }
                />
                <Rows className="border-t border-white/[0.07]">
                  {files.map((f) => (
                    <div
                      key={f.file.id}
                      className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-semibold text-white">
                          {f.file.name}
                        </p>
                        <p className="text-[13px] text-white">
                          {plural(f.file.rows.length, 'row')} ·{' '}
                          {plural(f.file.headers.length, 'column')}
                          {f.kind && f.confidence < 0.7 ? ' · check what this is' : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 sm:w-[260px]">
                        <div className="min-w-0 flex-1">
                          <MobileSelectPicker
                            value={f.kind ?? NONE}
                            onValueChange={(v) =>
                              setKind(f.file.id, v === NONE ? null : (v as ImportKind))
                            }
                            options={kindOptions}
                            title="What is in this file?"
                            triggerClassName={selectTriggerClass}
                          />
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${f.file.name}`}
                          onClick={() => setFiles((p) => p.filter((x) => x.file.id !== f.file.id))}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </Rows>
              </div>
            )}
          </div>
          {info && (
            <div className={cn(panelShellClass, 'hidden lg:block')}>
              <PanelHead
                title={`Files from ${info.key === 'generic' ? 'your system' : info.label}`}
              />
              <ol className="space-y-2 px-4 py-4 text-[13.5px] leading-snug text-white sm:px-5">
                {info.steps.map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-5 shrink-0 tabular-nums text-elec-yellow">{i + 1}.</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {/* ── 3. Columns ── */}
      {step === 'columns' && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-[13px] font-semibold text-white">Dates in your files are</span>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              {(['dmy', 'mdy'] as DateOrder[]).map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setDateOrder(o)}
                  aria-pressed={dateOrder === o}
                  className={cn(
                    'h-11 rounded-full border px-4 text-[13px] font-semibold touch-manipulation',
                    dateOrder === o
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.14] bg-white/[0.04] text-white'
                  )}
                >
                  {o === 'dmy' ? 'Day first, 31/01' : 'Month first, 01/31'}
                </button>
              ))}
            </div>
          </div>
          {usable.map((f) => {
            const sample = f.file.rows.find((r) => Object.values(r).some((v) => cellText(v))) ?? {};
            const colOptions = [
              { value: NONE, label: 'Not in this file' },
              ...f.file.headers.map((h) => ({ value: h, label: h })),
            ];
            // Show what is needed or matched; the unmatched extras sit behind one button.
            const fields = KIND_FIELDS[f.kind!];
            const extra = fields.filter((d) => !d.required && !f.map[d.key]?.length);
            const shown = showAll[f.file.id]
              ? fields
              : fields.filter((d) => d.required || f.map[d.key]?.length);
            const matched = fields.filter((d) => f.map[d.key]?.length).length;
            return (
              <div key={f.file.id} className={panelShellClass}>
                <PanelHead
                  title={f.file.name}
                  meta={
                    <span className="text-[13px] text-white">
                      {KIND_LABEL[f.kind!].many} · {matched} of {fields.length} matched
                    </span>
                  }
                />
                <div className="grid gap-x-8 lg:grid-cols-2">
                  {shown.map((d) => {
                    const cols = f.map[d.key] ?? [];
                    const ex = cols
                      .map((c) => cellText(sample[c]))
                      .filter(Boolean)
                      .join(d.join === 'space' ? ' ' : ', ');
                    return (
                      <div key={d.key} className="border-b border-white/[0.07] px-4 py-3 sm:px-5">
                        <div className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                          <span className="shrink-0 text-[13px] font-semibold text-white">
                            {d.label}
                            {d.required && <span className="text-elec-yellow"> *</span>}
                          </span>
                          {ex && (
                            <span className="min-w-0 truncate text-[12.5px] text-white">
                              e.g. {ex}
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 space-y-1.5">
                          {(cols.length ? cols : ['']).map((c, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="min-w-0 flex-1">
                                <MobileSelectPicker
                                  value={c || NONE}
                                  onValueChange={(v) => {
                                    const next = [...cols];
                                    if (v === NONE) next.splice(i, 1);
                                    else next[i] = v;
                                    setCol(f.file.id, d.key, next.filter(Boolean));
                                  }}
                                  options={colOptions}
                                  title={d.label}
                                  triggerClassName={selectTriggerClass}
                                />
                              </div>
                            </div>
                          ))}
                          {d.join && cols.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setCol(f.file.id, d.key, [...cols, ''])}
                              className="h-11 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
                            >
                              Add another column
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {f.kind === 'invoices' && invoicesNeedStatusAnswer(f.map) && (
                  <div className="border-b border-white/[0.07] px-4 py-4 sm:px-5">
                    <p className="text-[13.5px] font-semibold text-white">
                      This file does not say which invoices are paid
                      <span className="text-elec-yellow"> *</span>
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-white">
                      There is no status, amount paid or amount due column. Tell us how to bring
                      them in. Invoices brought in as owed are shown as owed but are never chased or
                      sent from Elec-Mate.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:flex">
                      {(
                        [
                          ['paid', 'All paid'],
                          ['unpaid', 'All still owed'],
                        ] as const
                      ).map(([v, label]) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            setInvoiceStatus((m) => ({ ...m, [f.file.id]: v }));
                            setPreview(null);
                          }}
                          aria-pressed={invoiceStatus[f.file.id] === v}
                          className={cn(
                            'h-11 rounded-full border px-4 text-[13px] font-semibold touch-manipulation',
                            invoiceStatus[f.file.id] === v
                              ? 'border-elec-yellow bg-elec-yellow text-black'
                              : 'border-white/[0.14] bg-white/[0.04] text-white'
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {extra.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAll((m) => ({ ...m, [f.file.id]: !m[f.file.id] }))}
                    className="flex h-11 w-full items-center px-4 text-left text-[13px] font-semibold text-elec-yellow touch-manipulation sm:px-5"
                  >
                    {showAll[f.file.id]
                      ? 'Show only the matched fields'
                      : `${plural(extra.length, 'more field')} not found in this file. Show them`}
                  </button>
                )}
              </div>
            );
          })}
          {(missingRequired.length > 0 || unansweredPaid.length > 0) && (
            <p className="text-[13.5px] text-white">
              <span className="font-semibold text-elec-yellow">Still needed: </span>
              {[
                ...missingRequired,
                ...unansweredPaid.map((f) => `${f.file.name}: paid or still owed`),
              ].join(' · ')}
            </p>
          )}
        </div>
      )}

      {/* ── 4. Check ── */}
      {step === 'check' && (
        <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
          <div className="space-y-4">
            {progress && (
              <div className="space-y-2">
                <p className="text-[14px] text-white">
                  {progress.label} · {progress.done} of {progress.total}
                </p>
                <Bar done={progress.done} total={progress.total} />
              </div>
            )}
            {preview && (
              <div className={panelShellClass}>
                <PanelHead
                  title="What will come across"
                  meta={<span className="text-[13px] text-white">{plural(total, 'row')} read</span>}
                />
                {!willAdd && (
                  <p className="border-t border-white/[0.07] px-4 py-3 text-[13.5px] text-white sm:px-5">
                    Everything in these files is already here, so there is nothing to import.
                  </p>
                )}
                <Rows className="border-t border-white/[0.07]">
                  {preview.map((s) => (
                    <div key={s.kind}>
                      <Row
                        title={KIND_LABEL[s.kind].many}
                        detail={detailFor(
                          s,
                          'already in Elec-Mate',
                          `${plural(s.total, 'row')}, all new`
                        )}
                        trailing={
                          <StatusPill tone={s.skipped ? 'volt' : 'neutral'}>
                            {s.created} new
                          </StatusPill>
                        }
                      />
                      {s.notes.length > 0 && (
                        <ul className="space-y-1 px-4 pb-3 text-[12.5px] text-white sm:px-5">
                          {s.notes.slice(0, 5).map((n, i) => (
                            <li key={i}>
                              Row {n.row}: {n.reason}
                            </li>
                          ))}
                          {s.notes.length > 5 && <li>and {s.notes.length - 5} more</li>}
                        </ul>
                      )}
                    </div>
                  ))}
                </Rows>
              </div>
            )}
          </div>
          <div className={cn(panelShellClass, 'mt-4 lg:mt-0')}>
            <PanelHead title="How it comes across" />
            <ul className="space-y-2.5 px-4 py-4 text-[13.5px] leading-snug text-white sm:px-5">
              <li>
                Customers already in Elec-Mate are matched by email, phone, or name and postcode,
                not added twice.
              </li>
              <li>
                Quotes and invoices keep their own numbers and are marked as imported. Nothing is
                sent to your customers, and your own numbering carries on as it is.
              </li>
              <li>A quote or invoice whose number you already use is left out, not renumbered.</li>
              <li>Finished jobs go into Archived jobs, so your board shows only live work.</li>
              <li>Changed your mind? Undo takes the whole import out again.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ── 5. Import ── */}
      {step === 'import' && progress && (
        <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
          <div className={panelShellClass}>
            <div className="space-y-3 px-4 py-4 sm:px-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="min-w-0 truncate text-[15px] font-semibold text-white">
                  {(() => {
                    const now = kindRanges.find((r) => progress.done < r.end);
                    return now
                      ? `Bringing in ${KIND_LABEL[now.kind].many.toLowerCase()}`
                      : 'Finishing off';
                  })()}
                </p>
                <span className="shrink-0 text-[13px] tabular-nums text-white">
                  {progress.done} of {progress.total}
                </span>
              </div>
              <Bar done={progress.done} total={progress.total} />
            </div>
            <Rows className="border-t border-white/[0.07]">
              {kindRanges.map((r) => {
                const state =
                  progress.done >= r.end ? 'done' : progress.done >= r.start ? 'now' : 'waiting';
                return (
                  <Row
                    key={r.kind}
                    title={KIND_LABEL[r.kind].many}
                    detail={plural(r.end - r.start, 'row')}
                    trailing={
                      state === 'done' ? (
                        <StatusPill tone="green">
                          <Check className="h-3.5 w-3.5" aria-hidden />
                          In
                        </StatusPill>
                      ) : state === 'now' ? (
                        <StatusPill tone="volt">Now</StatusPill>
                      ) : (
                        <StatusPill>Waiting</StatusPill>
                      )
                    }
                  />
                );
              })}
            </Rows>
          </div>
          <div className={cn(panelShellClass, 'mt-4 lg:mt-0')}>
            <PanelHead title="While it runs" />
            <ul className="space-y-2.5 px-4 py-4 text-[13.5px] leading-snug text-white sm:px-5">
              <li>Nothing is sent to your customers, and no invoice is chased.</li>
              <li>Stop after this batch keeps what is in so far, and you can undo it.</li>
              <li>When it finishes you can still undo the whole import in one go.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ── 6. Done ── */}
      {step === 'done' && result && (
        <div className="space-y-4">
          {progress && (
            <div className={panelShellClass}>
              <div className="space-y-3 px-4 py-4 sm:px-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[15px] font-semibold text-white">{progress.label}</p>
                  <span className="shrink-0 text-[13px] tabular-nums text-white">
                    {progress.done} of {progress.total}
                  </span>
                </div>
                <Bar done={progress.done} total={progress.total} />
              </div>
            </div>
          )}
          {undone ? (
            <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
              <div className={panelShellClass}>
                <Rows>
                  <Row
                    title="Taken out"
                    wrapDetail
                    detail="Added by this import and not used since"
                    trailing={<StatusPill>{undone.deleted}</StatusPill>}
                  />
                  <Row
                    title="Kept"
                    wrapDetail
                    detail={
                      undone.kept
                        ? 'Used or changed since the import, such as a job with time on it'
                        : 'Nothing had been used, so nothing was kept'
                    }
                    trailing={
                      <StatusPill tone={undone.kept ? 'volt' : 'neutral'}>{undone.kept}</StatusPill>
                    }
                  />
                </Rows>
              </div>
              <div className="mt-4 space-y-4 lg:mt-0">
                {undone.keptRows.length > 0 && (
                  <div className={panelShellClass}>
                    <PanelHead title="Kept, and why" />
                    <Rows className="border-t border-white/[0.07]">
                      {Object.entries(
                        undone.keptRows.reduce<Record<string, { kind: ImportKind; n: number }>>(
                          (m, k) => {
                            const key = `${k.kind}|${k.reason}`;
                            m[key] = { kind: k.kind, n: (m[key]?.n ?? 0) + 1 };
                            return m;
                          },
                          {}
                        )
                      ).map(([key, v]) => (
                        <Row
                          key={key}
                          wrapDetail
                          title={`${v.n} ${v.n === 1 ? KIND_LABEL[v.kind].one : KIND_LABEL[v.kind].many.toLowerCase()}`}
                          detail={key.split('|')[1]}
                        />
                      ))}
                    </Rows>
                  </div>
                )}
                <p className="text-[13.5px] leading-snug text-white">
                  Customers and records that were in Elec-Mate before the import were not touched.
                  You can import the files again whenever you are ready.
                </p>
              </div>
            </div>
          ) : (
            result.summary.length > 0 && (
              <div className="lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
                <div className={panelShellClass}>
                  <Rows>
                    {result.summary.map((s) => (
                      <Row
                        key={s.kind}
                        title={KIND_LABEL[s.kind].many}
                        detail={detailFor(s, 'matched to what was here', 'All added')}
                        trailing={<StatusPill tone="green">{s.created} added</StatusPill>}
                      />
                    ))}
                  </Rows>
                </div>
                <div className={cn(panelShellClass, 'mt-4 lg:mt-0')}>
                  <PanelHead title="Where to find it" />
                  <Rows className="border-t border-white/[0.07]">
                    {result.summary
                      .filter((s) => s.created > 0)
                      .map((s) => (
                        <Row
                          key={s.kind}
                          wrapDetail
                          title={KIND_LABEL[s.kind].many}
                          detail={LANDS_IN[s.kind]}
                        />
                      ))}
                  </Rows>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </FormSheet>
  );
}
