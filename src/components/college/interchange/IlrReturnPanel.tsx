import { useMemo, useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { inputCn, labelCn, selectTriggerCn } from '@/components/forms/fieldStyles';
import { QBTN, QPanel } from '@/components/college/quality/QualityHubKit';
import { downloadText } from '@/lib/college/interchange';
import {
  RETURN_PERIODS,
  type ReturnPeriod,
} from '../../../../supabase/functions/_shared/ilr/2627/codes.ts';
import type { Issue } from '../../../../supabase/functions/_shared/ilr/2627/rules.ts';

/* ==========================================================================
   IlrReturnPanel (ELE-2087): the ILR 2026/27 XML file for a return period.

   The college-ilr-return edge function builds the file, checks it against the
   published 2026/27 XSD and the validation rules our data can trigger (v4,
   10 Sep 2026), and lists what to fix per learner. Each fix opens the field:
   an ILR field in IlrFieldsSheet, the learner record, or the UKPRN box.

   Wording rule: never "DfE validated". The response's statement says exactly
   what the file was checked against.
   ========================================================================== */

interface ReturnResult {
  period: ReturnPeriod;
  file_name: string;
  prepared_at: string;
  xml: string;
  schema: {
    valid: boolean;
    errors: Array<{
      line: number | null;
      message: string;
      learner_id: string | null;
      learner_name: string | null;
      /** Plain English, with the field to fix (explainSchemaError). */
      plain: string;
      fix: string | null;
      spec: { field: string; url: string } | null;
    }>;
    file: string;
    sha256: string;
    validator: string;
  };
  rules: {
    version: string;
    file: string;
    published: number;
    implemented: string[];
    implemented_count: number;
    elec_mate_checks: Array<{ id: string; severity: string; about: string }>;
  };
  issues: Issue[];
  learners: Array<{
    learner_id: string;
    name: string;
    learn_ref_number: string | null;
    errors: number;
    warnings: number;
    schema_errors: number;
    assumed: Array<{ field: string; note: string }>;
    planned_otj_hours: number | null;
    verified_otj_hours: number;
  }>;
  out_of_scope: Array<{ learnerId: string; name: string; reason: string }>;
  summary: {
    learners: number;
    with_errors: number;
    errors: number;
    warnings: number;
    schema_valid: boolean;
    ready: boolean;
  };
  statement: string;
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

/** The period whose collection has not yet closed, else the last one. */
function currentPeriod(): string {
  const today = new Date().toISOString().slice(0, 10);
  return (RETURN_PERIODS.find((p) => p.closes >= today) ?? RETURN_PERIODS.at(-1)!).code;
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function Pill({ tone, children }: { tone: 'bad' | 'warn' | 'ok' | 'plain'; children: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center rounded-full border px-2.5 text-[12px] font-semibold tabular-nums',
        tone === 'bad' && 'border-red-400/60 text-red-300',
        tone === 'warn' && 'border-orange-400/60 text-orange-300',
        tone === 'ok' && 'border-emerald-400/60 text-emerald-300',
        tone === 'plain' && 'border-white/[0.18] text-white'
      )}
    >
      {children}
    </span>
  );
}

/** The field's page in the published ILR 2026/27 specification. */
function SpecLink({ spec }: { spec: { field: string; url: string } }) {
  return (
    <a
      href={spec.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center text-[12px] font-semibold text-white underline decoration-white/40 underline-offset-4 touch-manipulation hover:decoration-white"
    >
      {spec.field} in the ILR 2026/27 specification
    </a>
  );
}

export function IlrReturnPanel({
  collegeId,
  canExport,
  onFix,
}: {
  collegeId: string;
  canExport: boolean;
  /** Open the place to fix an issue. */
  onFix: (learnerId: string | null, fix: string) => void;
}) {
  const { toast } = useToast();
  const [period, setPeriod] = useState(currentPeriod);
  const [serial, setSerial] = useState('01');
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<ReturnResult | null>(null);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const options = useMemo(
    () =>
      RETURN_PERIODS.map((p) => ({
        value: p.code,
        label: `${p.code} · ${p.label}`,
        description: `Closes 6pm ${fmtDate(p.closes)}`,
      })),
    []
  );

  const run = async () => {
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke('college-ilr-return', {
        body: { college_id: collegeId, period, serial_no: serial || '01' },
      });
      if (error) {
        let msg = error.message;
        try {
          const ctx = (error as { context?: Response }).context;
          if (ctx) msg = ((await ctx.json()) as { error?: string }).error ?? msg;
        } catch {
          /* keep the generic message */
        }
        throw new Error(msg);
      }
      setRes(data as ReturnResult);
      setShowAll(false);
    } catch (e) {
      toast({
        title: 'Return not built',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
    setBusy(false);
  };

  const download = (anyway: boolean) => {
    if (!res) return;
    downloadText(res.file_name, res.xml, 'application/xml;charset=utf-8');
    toast({
      title: anyway ? 'Downloaded with errors' : 'ILR file downloaded',
      description: anyway
        ? 'Fix the errors before you upload it to Submit learner data, or it will be rejected.'
        : res.file_name,
    });
  };

  const fileIssues = res?.issues.filter((i) => !i.learnerId) ?? [];
  const byLearner = useMemo(() => {
    if (!res) return [];
    return res.learners
      .map((l) => ({
        ...l,
        issues: res.issues.filter((i) => i.learnerId === l.learner_id),
        schema: res.schema.errors.filter((e) => e.learner_id === l.learner_id),
      }))
      .filter((l) => l.issues.length || l.schema.length)
      .sort((a, b) => b.errors - a.errors || b.warnings - a.warnings);
  }, [res]);
  const assumedCount = res?.learners.filter((l) => l.assumed.length).length ?? 0;
  const shown = showAll ? byLearner : byLearner.slice(0, 10);
  const selected = RETURN_PERIODS.find((p) => p.code === period);

  return (
    <QPanel sub="Pick a return period, build the file, fix what it lists, then download it for Submit learner data.">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="lg:w-80">
          <span className={labelCn}>Return period</span>
          <MobileSelectPicker
            value={period}
            onValueChange={(v) => {
              setPeriod(v);
              setRes(null);
            }}
            options={options}
            title="Return period"
            triggerClassName={selectTriggerCn}
          />
        </div>
        <div className="w-28">
          <label className={labelCn} htmlFor="ilr-serial">
            File number
          </label>
          <input
            id="ilr-serial"
            className={inputCn}
            inputMode="numeric"
            maxLength={2}
            value={serial}
            onChange={(e) => setSerial(e.target.value.replace(/[^0-9]/g, ''))}
            data-testid="ilr-return-serial"
          />
        </div>
        <button
          type="button"
          className={cn(QBTN, 'lg:ml-auto')}
          disabled={!canExport || busy}
          onClick={() => void run()}
          data-testid="ilr-return-run"
        >
          {busy ? 'Checking the return…' : res ? 'Check again' : 'Build and check'}
        </button>
      </div>
      <p className="mt-2 text-[12.5px] leading-snug text-white">
        {selected
          ? `${selected.code} covers learning to ${fmtDate(selected.periodEnd)} and closes at 6pm on ${fmtDate(selected.closes)}. The file holds every learner whose learning is in the 2026/27 year by then.`
          : null}{' '}
        {!canExport && 'Your role cannot export college data.'}
      </p>

      {res && (
        <div className="mt-5 space-y-5" data-testid="ilr-return-result">
          {/* Summary */}
          <div className="space-y-2 border-t border-white/[0.1] pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone={res.summary.ready ? 'ok' : 'bad'}>
                {res.summary.ready ? 'Ready to submit' : 'Not ready'}
              </Pill>
              <Pill tone="plain">{plural(res.summary.learners, 'learner')}</Pill>
              {res.summary.errors > 0 && (
                <Pill tone="bad">{plural(res.summary.errors, 'error')}</Pill>
              )}
              {res.summary.warnings > 0 && (
                <Pill tone="warn">{plural(res.summary.warnings, 'warning')}</Pill>
              )}
              <Pill tone={res.schema.valid ? 'ok' : 'bad'}>
                {res.schema.valid ? 'Matches the schema' : 'Schema errors'}
              </Pill>
            </div>
            <p
              className="text-[13px] leading-relaxed text-white"
              data-testid="ilr-return-statement"
            >
              {res.statement}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {res.summary.ready ? (
                <button
                  type="button"
                  className={cn(QBTN, 'border-emerald-400/60')}
                  onClick={() => download(false)}
                  data-testid="ilr-return-download"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download {res.file_name}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className={QBTN}
                    onClick={() => download(true)}
                    data-testid="ilr-return-download-anyway"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Download anyway
                  </button>
                  <p className="text-[12.5px] leading-snug text-orange-300">
                    The file has {plural(res.summary.errors, 'error')}
                    {!res.schema.valid ? ' and does not match the schema' : ''}. Submit learner data
                    will reject it until they are fixed.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* File-level */}
          {fileIssues.length > 0 && (
            <ul className="space-y-2" data-testid="ilr-return-file-issues">
              {fileIssues.map((i, k) => (
                <li
                  key={`${i.rule}-${k}`}
                  className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="text-[13px] leading-snug text-white">
                    <span
                      className={cn(
                        'font-semibold',
                        i.severity === 'Error' ? 'text-red-300' : 'text-orange-300'
                      )}
                    >
                      {i.severity === 'Error' ? 'Error' : 'Warning'}:
                    </span>{' '}
                    {i.message}
                  </p>
                  {i.fix && (
                    <button
                      type="button"
                      className={cn(QBTN, 'shrink-0')}
                      onClick={() => onFix(null, i.fix!)}
                    >
                      Fix
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Per learner */}
          {byLearner.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-[14px] font-semibold text-white">
                Errors to fix before you submit
              </h4>
              <ul
                className="-mx-4 divide-y divide-white/[0.06] border-y border-white/[0.08] sm:mx-0 sm:rounded-xl sm:border"
                data-testid="ilr-return-learners"
              >
                {shown.map((l) => {
                  const isOpen = open[l.learner_id] ?? byLearner.length <= 3;
                  return (
                    <li key={l.learner_id} data-testid="ilr-return-learner">
                      <button
                        type="button"
                        className="flex min-h-[52px] w-full items-center gap-3 px-4 py-2 text-left touch-manipulation sm:px-4"
                        aria-expanded={isOpen}
                        onClick={() => setOpen((s) => ({ ...s, [l.learner_id]: !isOpen }))}
                      >
                        <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
                          {l.name}
                        </span>
                        {l.errors > 0 && <Pill tone="bad">{plural(l.errors, 'error')}</Pill>}
                        {l.warnings > 0 && <Pill tone="warn">{plural(l.warnings, 'warning')}</Pill>}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 shrink-0 text-white transition-transform',
                            isOpen && 'rotate-180'
                          )}
                          aria-hidden
                        />
                      </button>
                      {isOpen && (
                        <ul className="space-y-3 px-4 pb-4">
                          {l.issues.map((i, k) => (
                            <li
                              key={`${i.rule}-${k}`}
                              className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                              data-testid="ilr-return-issue"
                              data-rule={i.rule}
                            >
                              <div className="min-w-0">
                                <p className="text-[13px] leading-snug text-white">
                                  <span
                                    className={cn(
                                      'font-semibold',
                                      i.severity === 'Error' ? 'text-red-300' : 'text-orange-300'
                                    )}
                                  >
                                    {i.severity === 'Error' ? 'Error' : 'Warning'}:
                                  </span>{' '}
                                  {i.message}
                                </p>
                                <p className="mt-0.5 text-[12px] text-white">
                                  {i.official ? `Rule ${i.rule}` : 'Elec-Mate check'}
                                  {i.officialMessage ? `: ${i.officialMessage}` : ''}
                                </p>
                                {i.spec && <SpecLink spec={i.spec} />}
                              </div>
                              {i.fix && (
                                <button
                                  type="button"
                                  className={cn(QBTN, 'shrink-0')}
                                  onClick={() => onFix(l.learner_id, i.fix!)}
                                  data-testid="ilr-return-fix"
                                >
                                  {i.fix.startsWith('record:') ? 'Open record' : 'Fix'}
                                </button>
                              )}
                            </li>
                          ))}
                          {l.schema.slice(0, 5).map((e, k) => (
                            <li
                              key={`s-${k}`}
                              className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                              data-testid="ilr-return-schema-issue"
                            >
                              <div className="min-w-0">
                                <p className="text-[13px] leading-snug text-white">
                                  <span className="font-semibold text-red-300">Schema:</span>{' '}
                                  {e.plain}
                                </p>
                                {e.spec && <SpecLink spec={e.spec} />}
                              </div>
                              {e.fix && (
                                <button
                                  type="button"
                                  className={cn(QBTN, 'shrink-0')}
                                  onClick={() => onFix(l.learner_id, e.fix!)}
                                >
                                  {e.fix.startsWith('record:') ? 'Open record' : 'Fix'}
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
              {byLearner.length > 10 && (
                <button type="button" className={QBTN} onClick={() => setShowAll((v) => !v)}>
                  {showAll ? 'Show fewer' : `Show all ${byLearner.length} learners`}
                </button>
              )}
            </div>
          ) : res.summary.learners > 0 ? (
            <p className="text-[13px] text-white">No learner errors or warnings.</p>
          ) : null}

          {!res.schema.valid && (
            <details className="text-[12.5px] leading-snug text-white">
              <summary className="flex h-11 cursor-pointer items-center font-semibold touch-manipulation">
                Schema check: {plural(res.schema.errors.length, 'problem')}
              </summary>
              <p className="mb-2">
                The file does not match the published 2026/27 schema yet. Most of these clear when
                the errors above are fixed, because a required field is missing.
              </p>
              <ul className="space-y-1">
                {res.schema.errors.slice(0, 25).map((e, k) => (
                  <li key={k} className="break-words" data-testid="ilr-return-schema-line">
                    {e.line ? `Line ${e.line}` : 'File'}
                    {e.learner_name ? ` (${e.learner_name})` : ''}: {e.plain}{' '}
                    <span className="font-mono text-[12px]">
                      ({e.message.replace(/\{ILR\/2026-27\}/g, '')})
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}

          {assumedCount > 0 && (
            <details className="text-[12.5px] leading-snug text-white">
              <summary className="flex h-11 cursor-pointer items-center font-semibold touch-manipulation">
                Filled in for you: {plural(assumedCount, 'learner')}
              </summary>
              <p className="mb-2">
                These values are not recorded, so the file uses the usual default. Record the real
                value if it differs.
              </p>
              <ul className="space-y-2">
                {res.learners
                  .filter((l) => l.assumed.length)
                  .slice(0, 30)
                  .map((l) => (
                    <li key={l.learner_id}>
                      <span className="font-semibold">{l.name}</span>:{' '}
                      {l.assumed.map((a) => a.note).join('; ')}.
                    </li>
                  ))}
              </ul>
            </details>
          )}

          {res.out_of_scope.length > 0 && (
            <details className="text-[12.5px] leading-snug text-white">
              <summary className="flex h-11 cursor-pointer items-center font-semibold touch-manipulation">
                Not in this return: {plural(res.out_of_scope.length, 'learner')}
              </summary>
              <ul className="space-y-1">
                {res.out_of_scope.slice(0, 30).map((l) => (
                  <li key={l.learnerId}>
                    {l.name}: {l.reason}.
                  </li>
                ))}
              </ul>
            </details>
          )}

          <details className="text-[12.5px] leading-snug text-white">
            <summary className="flex h-11 cursor-pointer items-center font-semibold touch-manipulation">
              What was checked
            </summary>
            <div className="space-y-2">
              <p>
                Schema: {res.schema.file} (SHA-256 {res.schema.sha256.slice(0, 12)}), the published
                ILR 2026/27 schema, applied by {res.schema.validator}.
              </p>
              <p>
                Rules: {res.rules.implemented_count} of the {res.rules.published} rules in the ILR
                Validation Rules 2026 to 2027, {res.rules.version}. The others need DfE reference
                data (LARS, the Learner Register, postcode and organisation tables) or records
                Elec-Mate does not hold; Submit learner data runs them when you upload.
              </p>
              <p className="break-words font-mono text-[12px]">
                {res.rules.implemented.join(', ')}
              </p>
              <p>
                Elec-Mate checks (not DfE rules):{' '}
                {res.rules.elec_mate_checks.map((c) => c.about).join('; ')}.
              </p>
            </div>
          </details>
        </div>
      )}
    </QPanel>
  );
}
