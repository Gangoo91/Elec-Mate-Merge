import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Papa from 'papaparse';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { Switch } from '@/components/ui/switch';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeEmpty, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { ChoiceGrid } from '@/components/college/quality/QualityChoices';
import {
  QBTN,
  QBTN_PRIMARY,
  QLIST,
  QPanel,
  QualityHeader,
  QualityScreen,
} from '@/components/college/quality/QualityHubKit';
import { inputCn, labelCn, selectTriggerCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  CHANGE_LABEL,
  MIS_FIELDS,
  MIS_SYSTEMS,
  guessMisColumns,
  parseIlrXml,
  toMisRow,
  type DateOrder,
  type MisColumnMap,
  type MisRow,
  type MisSystem,
} from '@/lib/college/misImport';
import { CONNECTOR_DESIGNS } from '@/lib/college/misConnectors';

/* ==========================================================================
   MIS sync (ELE-2058, 10 Oct 2026). Step 1: saved, re-runnable mappings for
   MIS export files. A CSV from ebs, ProSolution, UNIT-e or another MIS is
   mapped once (the columns, the date order, group codes to cohorts) and
   saved; next month the same mapping runs on the new file. The ILR XML file
   needs no mapping. Every run is checked first (college_mis_apply dry run):
   who it matches, what would change, who is new. Applying updates matched
   learners; new learners go through the roster import (college-roster-import),
   which makes or invites their login, then their dates are applied.
   Step 2 (Maytas, ebs) is shown as what each connector needs from the college.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-mis-sync',
  title: 'MIS sync',
  what: 'Keep learner references, ULNs and programme dates in step with your MIS by importing its export file. Map a file once, save it, and re-run it each time.',
  steps: [
    {
      title: 'Bring a file',
      body: 'A CSV export of learners or enrolments from ebs, ProSolution, UNIT-e or another MIS, or the ILR XML file your MIS builds.',
    },
    {
      title: 'Map it once',
      body: 'Say which column is which, how dates are written, and which group code is which cohort. Save it with a name.',
    },
    {
      title: 'Check, then apply',
      body: 'The check shows who each row matches, exactly what would change and who is new. Nothing changes until you apply.',
    },
  ],
  notes: [
    {
      title: 'What it changes',
      body: 'Only fields the file has a value for and that differ: ULN, learner reference, date of birth, NI number, start, planned end and actual end. A learner in a different cohort is reported, never moved.',
    },
    {
      title: 'Matching',
      body: 'By learner reference first, then ULN, then email. A row that matches nobody becomes a new learner only if it has a name and an email.',
    },
  ],
};

interface Mapping {
  id: string;
  name: string;
  mis_system: MisSystem;
  file_kind: 'csv' | 'ilr_xml';
  column_map: MisColumnMap;
  date_order: DateOrder;
  cohort_map: Record<string, string>;
  options: { send_email?: boolean };
  last_run_at: string | null;
  last_run_summary: {
    rows?: number;
    updated?: number;
    unchanged?: number;
    new?: number;
    skipped?: number;
    file?: string;
  } | null;
}

interface PlanItem {
  row: number;
  outcome: 'updated' | 'unchanged' | 'new' | 'skipped';
  student_id?: string;
  name?: string;
  email?: string;
  uln?: string | null;
  cohort_id?: string | null;
  planned_end_date?: string | null;
  changes?: Record<string, [unknown, unknown]>;
  notes?: string[];
  detail?: string;
}

interface Plan {
  dry_run: boolean;
  summary: {
    rows: number;
    matched: number;
    updated: number;
    unchanged: number;
    new: number;
    skipped: number;
  };
  items: PlanItem[];
}

interface Run {
  id: string;
  file_name: string | null;
  rows_total: number;
  updated: number;
  new_learners: number;
  skipped: number;
  created_at: string;
}

const NONE = '__none__';
const fmtDate = (v: unknown) =>
  typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)
    ? new Date(`${v.slice(0, 10)}T12:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : v == null || v === ''
      ? 'empty'
      : String(v);

export default function CollegeMisSyncPage() {
  const { toast } = useToast();
  const { collegeId, can, loading: capsLoading } = useCollegeCan();
  const canEdit = can('learners.edit');
  const fileRef = useRef<HTMLInputElement>(null);
  const importRef = useRef<HTMLDivElement>(null);

  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [runs, setRuns] = useState<Run[]>([]);
  const [cohorts, setCohorts] = useState<Array<{ id: string; name: string; code: string | null }>>(
    []
  );
  const [rollCount, setRollCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // The import in hand.
  const [editing, setEditing] = useState<Mapping | null>(null);
  const [system, setSystem] = useState<MisSystem>('ebs');
  const [fileName, setFileName] = useState('');
  const [kind, setKind] = useState<'csv' | 'ilr_xml'>('csv');
  const [headers, setHeaders] = useState<string[]>([]);
  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [xmlRows, setXmlRows] = useState<MisRow[]>([]);
  const [xmlNote, setXmlNote] = useState('');
  const [map, setMap] = useState<MisColumnMap>({});
  const [order, setOrder] = useState<DateOrder>('dmy');
  const [cohortMap, setCohortMap] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!collegeId) return;
    setLoading(true);
    const [m, r, c, n] = await Promise.all([
      supabase
        .from('college_mis_mappings' as never)
        .select('*')
        .eq('college_id', collegeId)
        .order('updated_at', { ascending: false }),
      supabase
        .from('college_mis_runs' as never)
        .select('id, file_name, rows_total, updated, new_learners, skipped, created_at')
        .eq('college_id', collegeId)
        .order('created_at', { ascending: false })
        .limit(8),
      supabase
        .from('college_cohorts')
        .select('id, name, code' as never)
        .eq('college_id', collegeId)
        .order('name'),
      supabase
        .from('college_students')
        .select('id', { count: 'exact', head: true })
        .eq('college_id', collegeId),
    ]);
    setMappings(((m.data as unknown as Mapping[]) ?? []) as Mapping[]);
    setRuns(((r.data as unknown as Run[]) ?? []) as Run[]);
    setCohorts(
      (c.data ?? []) as unknown as Array<{ id: string; name: string; code: string | null }>
    );
    setRollCount(n.count ?? null);
    setLoading(false);
  }, [collegeId]);

  useEffect(() => {
    void load();
  }, [load]);

  const reset = () => {
    setEditing(null);
    setFileName('');
    setHeaders([]);
    setRecords([]);
    setXmlRows([]);
    setXmlNote('');
    setMap({});
    setCohortMap({});
    setName('');
    setPlan(null);
    setResult(null);
  };

  const startWith = (m: Mapping | null) => {
    reset();
    if (m) {
      setEditing(m);
      setSystem(m.mis_system);
      setKind(m.file_kind);
      setMap(m.column_map ?? {});
      setOrder(m.date_order ?? 'dmy');
      setCohortMap(m.cohort_map ?? {});
      setName(m.name);
      setSendEmail(!!m.options?.send_email);
    }
    setTimeout(() => {
      importRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      fileRef.current?.click();
    }, 50);
  };

  const onFile = async (f: File) => {
    setPlan(null);
    setResult(null);
    setFileName(f.name);
    const text = await f.text();
    if (/\.xml$/i.test(f.name) || /^\s*<\?xml|<Message[\s>]/.test(text.slice(0, 400))) {
      try {
        const p = parseIlrXml(text);
        setKind('ilr_xml');
        setXmlRows(p.rows);
        setHeaders([]);
        setRecords([]);
        setXmlNote(
          `ILR XML${p.year ? ` for ${p.year.replace(/^(\d{2})(\d{2})$/, '20$1/$2')}` : ''}${p.ukprn ? `, UKPRN ${p.ukprn}` : ''}: ${p.learners} learners. Field names come from the ILR specification, so there is nothing to map.`
        );
        if (!name) setName(`${MIS_SYSTEMS.find((s) => s.key === system)?.label ?? 'MIS'} ILR file`);
      } catch (e) {
        toast({
          title: 'Could not read that file',
          description: (e as Error).message,
          variant: 'destructive',
        });
      }
      return;
    }
    Papa.parse<Record<string, unknown>>(text, {
      header: true,
      skipEmptyLines: 'greedy',
      complete: (res) => {
        const hs = (res.meta.fields ?? []).filter(Boolean);
        setKind('csv');
        setXmlRows([]);
        setXmlNote('');
        setHeaders(hs);
        setRecords(res.data.filter((r) => Object.values(r).some((v) => String(v ?? '').trim())));
        // A saved mapping keeps its columns; only fill what it does not name.
        setMap((cur) => {
          const guessed = guessMisColumns(hs);
          const kept = Object.fromEntries(
            Object.entries(cur).filter(([, h]) => h && hs.includes(h as string))
          ) as MisColumnMap;
          return Object.keys(kept).length ? { ...guessed, ...kept } : guessed;
        });
        if (!name) setName(`${MIS_SYSTEMS.find((s) => s.key === system)?.label ?? 'MIS'} learners`);
      },
      error: (err: Error) =>
        toast({
          title: 'Could not read that CSV',
          description: err.message,
          variant: 'destructive',
        }),
    });
  };

  const missingHeaders = useMemo(
    () =>
      editing && kind === 'csv' && headers.length
        ? Object.entries(editing.column_map ?? {})
            .filter(([, h]) => h && !headers.includes(h as string))
            .map(([, h]) => h as string)
        : [],
    [editing, headers, kind]
  );

  const rows: MisRow[] = useMemo(
    () => (kind === 'ilr_xml' ? xmlRows : records.map((r, i) => toMisRow(r, i, map, order))),
    [kind, xmlRows, records, map, order]
  );
  const badDates = rows.filter((r) => r.bad_dates?.length).length;
  const codes = useMemo(
    () => [...new Set(rows.map((r) => r.cohort_code).filter(Boolean) as string[])].sort(),
    [rows]
  );
  const cohortByCode = (code: string) =>
    cohortMap[code] === NONE
      ? undefined
      : (cohorts.find((c) => c.id === cohortMap[code]) ??
        cohorts.find((c) => (c.code ?? '').toUpperCase() === code.toUpperCase()));
  const canMatch = kind === 'ilr_xml' || !!(map.learner_ref || map.uln || map.email);

  const payload = () =>
    rows.map(({ bad_dates: _b, ...r }) => {
      const c = r.cohort_code ? cohortByCode(r.cohort_code) : undefined;
      return c ? { ...r, cohort_id: c.id } : r;
    });

  const check = async () => {
    if (!collegeId) return;
    setBusy('check');
    setResult(null);
    const { data, error } = await supabase.rpc(
      'college_mis_apply' as never,
      {
        p_college: collegeId,
        p_mapping: editing?.id ?? null,
        p_rows: payload(),
        p_dry_run: true,
        p_file_name: fileName,
      } as never
    );
    setBusy(null);
    if (error)
      return toast({ title: 'Check failed', description: error.message, variant: 'destructive' });
    setPlan(data as unknown as Plan);
  };

  const saveMapping = async (): Promise<string | null> => {
    if (!collegeId) return null;
    const cm = Object.fromEntries(Object.entries(cohortMap).filter(([, v]) => v && v !== NONE));
    const { data, error } = await supabase.rpc(
      'college_mis_mapping_save' as never,
      {
        p_college: collegeId,
        p_id: editing?.id ?? null,
        p_name: name.trim() || 'MIS import',
        p_system: system,
        p_file_kind: kind,
        p_column_map: kind === 'csv' ? map : {},
        p_date_order: order,
        p_cohort_map: cm,
        p_options: { send_email: sendEmail },
      } as never
    );
    if (error) {
      toast({ title: 'Mapping not saved', description: error.message, variant: 'destructive' });
      return null;
    }
    const id = data as unknown as string;
    setEditing((cur) =>
      cur
        ? { ...cur, name, mis_system: system, column_map: map, date_order: order, cohort_map: cm }
        : ({
            id,
            name,
            mis_system: system,
            file_kind: kind,
            column_map: map,
            date_order: order,
            cohort_map: cm,
            options: { send_email: sendEmail },
            last_run_at: null,
            last_run_summary: null,
          } as Mapping)
    );
    return id;
  };

  const onSave = async () => {
    setBusy('save');
    const id = await saveMapping();
    setBusy(null);
    if (id) {
      toast({
        title: 'Mapping saved',
        description: 'Run it again with next month’s file from Saved mappings.',
      });
      void load();
    }
  };

  const apply = async () => {
    if (!collegeId || !plan) return;
    setBusy('apply');
    try {
      const mappingId = (await saveMapping()) ?? editing?.id ?? null;
      const fresh = plan.items.filter((i) => i.outcome === 'new');
      let added = 0;
      let notAdded = 0;
      for (let i = 0; i < fresh.length; i += 200) {
        const chunk = fresh.slice(i, i + 200).map((r, k) => ({
          index: i + k,
          name: r.name,
          email: r.email,
          uln: r.uln ?? undefined,
          cohort_id: r.cohort_id ?? null,
          expected_end_date: r.planned_end_date ?? null,
        }));
        const { data, error } = await supabase.functions.invoke('college-roster-import', {
          body: { kind: 'learners', rows: chunk, send_email: sendEmail, dry_run: false },
        });
        if (error) throw new Error(`New learners not added: ${error.message}`);
        const s = (
          data as {
            summary?: {
              created: number;
              matched: number;
              already: number;
              skipped: number;
              failed: number;
            };
          }
        ).summary;
        added += (s?.created ?? 0) + (s?.matched ?? 0) + (s?.already ?? 0);
        notAdded += (s?.skipped ?? 0) + (s?.failed ?? 0);
      }
      const { data, error } = await supabase.rpc(
        'college_mis_apply' as never,
        {
          p_college: collegeId,
          p_mapping: mappingId,
          p_rows: payload(),
          p_dry_run: false,
          p_file_name: fileName,
        } as never
      );
      if (error) throw new Error(error.message);
      const done = data as unknown as Plan;
      setPlan(done);
      const msg = `${done.summary.updated} ${done.summary.updated === 1 ? 'learner' : 'learners'} updated, ${done.summary.unchanged} already up to date${
        fresh.length
          ? `, ${added} new added through the roster import${notAdded ? ` (${notAdded} not added, see the roster import report)` : ''}`
          : ''
      }.`;
      setResult(msg);
      toast({ title: 'Import applied', description: msg });
      void load();
    } catch (e) {
      toast({
        title: 'Import not applied',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
    setBusy(null);
  };

  const remove = async (m: Mapping) => {
    const { error } = await supabase.rpc(
      'college_mis_mapping_delete' as never,
      { p_id: m.id } as never
    );
    if (error)
      return toast({ title: 'Not deleted', description: error.message, variant: 'destructive' });
    toast({ title: `${m.name} deleted` });
    if (editing?.id === m.id) reset();
    void load();
  };

  if (!capsLoading && !collegeId) {
    return (
      <HubPage ground="landing">
        <HubMasthead section="College" title="MIS sync" backTo="/college/settings/data" />
        <HubBody hidePushPrompt>
          <CollegeEmpty title="No college found" body="This page is for college staff." />
        </HubBody>
      </HubPage>
    );
  }

  const lastRun = runs[0];
  const fieldOptions = [
    { value: NONE, label: 'Not in this file' },
    ...headers.map((h) => ({ value: h, label: h })),
  ];
  const listed = plan ? plan.items.filter((i) => i.outcome !== 'unchanged').slice(0, 40) : [];

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="MIS sync" backTo="/college/settings/data" />
      <HubBody hidePushPrompt>
        <QualityScreen>
          <QualityHeader
            eyebrow="MIS sync"
            title="Keep in step with your MIS"
            summary={
              loading
                ? 'Map your MIS export once, save it, and re-run it each month.'
                : `${mappings.length} saved ${mappings.length === 1 ? 'mapping' : 'mappings'} and ${rollCount ?? 0} learners on your roll. ${
                    lastRun
                      ? `Last run ${new Date(lastRun.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}: ${lastRun.updated} updated, ${lastRun.new_learners} new.`
                      : 'No imports run yet.'
                  }`
            }
            help={HELP}
            primary={
              canEdit ? (
                <button
                  type="button"
                  className={QBTN_PRIMARY}
                  onClick={() => startWith(null)}
                  data-testid="mis-new"
                >
                  <Upload className="h-4 w-4" aria-hidden />
                  Import a file
                </button>
              ) : undefined
            }
          />

          {!canEdit && !capsLoading && (
            <QPanel>
              <p className="text-[13px] text-white">
                Your role cannot change learner records, so imports are not available to you.
              </p>
            </QPanel>
          )}

          {/* Saved mappings */}
          <section className="space-y-3">
            <CollegeSectionTitle
              title="Saved mappings"
              sub="Each one remembers the columns, date order and group codes. Run it again with the new file."
            />
            {loading ? (
              <div className="h-24 animate-pulse rounded-2xl bg-white/[0.04]" />
            ) : mappings.length === 0 ? (
              <CollegeEmpty
                title="No saved mappings yet"
                body="Import a file and save its mapping to re-run it next time."
              />
            ) : (
              <ul className={QLIST} data-testid="mis-mappings">
                {mappings.map((m) => (
                  <li
                    key={m.id}
                    className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[14.5px] font-semibold text-white">{m.name}</span>
                        <span className="inline-flex h-6 items-center rounded-full border border-white/[0.18] px-2.5 text-[12px] font-semibold text-white">
                          {MIS_SYSTEMS.find((s) => s.key === m.mis_system)?.label}
                        </span>
                        <span className="inline-flex h-6 items-center rounded-full border border-white/[0.18] px-2.5 text-[12px] font-semibold text-white">
                          {m.file_kind === 'ilr_xml'
                            ? 'ILR XML'
                            : `CSV, ${Object.keys(m.column_map ?? {}).length} columns`}
                        </span>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-snug text-white">
                        {m.last_run_at && m.last_run_summary
                          ? `Last run ${new Date(m.last_run_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} on ${m.last_run_summary.file ?? 'a file'}: ${m.last_run_summary.rows ?? 0} rows, ${m.last_run_summary.updated ?? 0} updated, ${m.last_run_summary.new ?? 0} new, ${m.last_run_summary.skipped ?? 0} skipped.`
                          : 'Not run yet.'}
                      </p>
                    </div>
                    {canEdit && (
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          className={cn(QBTN, 'flex-1 sm:flex-none')}
                          onClick={() => startWith(m)}
                          data-testid="mis-rerun"
                        >
                          Run with a new file
                        </button>
                        <button
                          type="button"
                          className={cn(QBTN, 'flex-1 sm:flex-none')}
                          onClick={() => void remove(m)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Import */}
          {canEdit && (
            <section className="space-y-3" ref={importRef} id="import">
              <CollegeSectionTitle
                title={editing ? `Run ${editing.name}` : 'Import a file'}
                sub="Nothing changes until you check the file and apply it."
              />
              <QPanel>
                <div className="space-y-4">
                  <div>
                    <p className={labelCn}>Which MIS made the file</p>
                    <div className="mt-2" data-testid="mis-system">
                      <ChoiceGrid<MisSystem>
                        className="min-[400px]:grid-cols-2 lg:grid-cols-5"
                        label="Which MIS made the file"
                        options={MIS_SYSTEMS.map((m) => ({ key: m.key, label: m.label }))}
                        selected={system}
                        onToggle={setSystem}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".csv,.xml,text/csv,application/xml,text/xml"
                      className="hidden"
                      data-testid="mis-file"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) void onFile(f);
                        e.target.value = '';
                      }}
                    />
                    <button type="button" className={QBTN} onClick={() => fileRef.current?.click()}>
                      <Upload className="h-4 w-4" aria-hidden />
                      {fileName ? 'Choose another file' : 'Choose a CSV or ILR XML file'}
                    </button>
                    <p className="text-[13px] text-white" data-testid="mis-file-summary">
                      {fileName
                        ? `${fileName}: ${rows.length} ${rows.length === 1 ? 'row' : 'rows'}${kind === 'csv' ? `, ${headers.length} columns` : ''}.`
                        : 'Learners or enrolments exported as CSV, or the ILR XML file.'}
                    </p>
                  </div>
                  {xmlNote && <p className="text-[13px] leading-relaxed text-white">{xmlNote}</p>}
                  {missingHeaders.length > 0 && (
                    <p
                      className="text-[13px] leading-relaxed text-white"
                      data-testid="mis-missing-headers"
                    >
                      This file does not have {missingHeaders.length === 1 ? 'a column' : 'columns'}{' '}
                      the saved mapping uses: {missingHeaders.join(', ')}. Check the mapping below
                      before you run it.
                    </p>
                  )}
                </div>
              </QPanel>

              {kind === 'csv' && headers.length > 0 && (
                <QPanel
                  title="Which column is which"
                  sub="Guessed from the headers and the ILR field names. Match on learner reference, ULN or email; a new learner needs a name and an email."
                >
                  <div
                    className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
                    data-testid="mis-map"
                  >
                    {MIS_FIELDS.map((f) => (
                      <div key={f.key}>
                        <p className={labelCn}>{f.label}</p>
                        <MobileSelectPicker
                          value={map[f.key] ?? NONE}
                          onValueChange={(v) =>
                            setMap((m) => ({ ...m, [f.key]: v === NONE ? undefined : v }))
                          }
                          options={fieldOptions}
                          title={f.label}
                          triggerClassName={selectTriggerCn}
                        />
                        <p className="mt-1 text-[12px] text-white">{f.hint}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5">
                    <p className={labelCn}>Dates in this file are written</p>
                    <ChoiceGrid<DateOrder>
                      className="mt-2"
                      label="Dates in this file are written"
                      options={[
                        { key: 'dmy', label: 'Day first', sub: '14/03/2026' },
                        { key: 'ymd', label: 'Year first', sub: '2026-03-14' },
                        { key: 'mdy', label: 'Month first', sub: '03/14/2026' },
                      ]}
                      selected={order}
                      onToggle={setOrder}
                    />
                    {badDates > 0 && (
                      <p className="mt-2 text-[13px] text-white" data-testid="mis-bad-dates">
                        {badDates} {badDates === 1 ? 'row has a date' : 'rows have dates'} that
                        cannot be read this way. Those dates are left out.
                      </p>
                    )}
                  </div>
                </QPanel>
              )}

              {codes.length > 0 && (
                <QPanel
                  title="Group codes to cohorts"
                  sub="Codes that match a cohort code already are filled in. A cohort is set only for learners who have none."
                >
                  <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                    {codes.slice(0, 30).map((code) => (
                      <div key={code}>
                        <p className={labelCn}>{code}</p>
                        <MobileSelectPicker
                          value={cohortByCode(code)?.id ?? NONE}
                          onValueChange={(v) => setCohortMap((m) => ({ ...m, [code]: v }))}
                          options={[
                            { value: NONE, label: 'No cohort' },
                            ...cohorts.map((c) => ({
                              value: c.id,
                              label: c.code ? `${c.name} (${c.code})` : c.name,
                            })),
                          ]}
                          title={`Cohort for ${code}`}
                          triggerClassName={selectTriggerCn}
                        />
                      </div>
                    ))}
                  </div>
                </QPanel>
              )}

              {rows.length > 0 && (
                <QPanel>
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className={labelCn} htmlFor="mis-name">
                          Save this mapping as
                        </label>
                        <input
                          id="mis-name"
                          className={inputCn}
                          value={name}
                          maxLength={80}
                          onChange={(e) => setName(e.target.value)}
                          data-testid="mis-name"
                        />
                      </div>
                      <div className="flex min-h-[56px] items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <label
                            htmlFor="mis-email"
                            className="text-[13.5px] font-semibold text-white"
                          >
                            Email new learners their login
                          </label>
                          <p className="text-[12.5px] leading-snug text-white">
                            Off: they are added and you hand out join codes.
                          </p>
                        </div>
                        <Switch
                          id="mis-email"
                          checked={sendEmail}
                          onCheckedChange={setSendEmail}
                          className="touch-manipulation"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className={QBTN}
                        disabled={!!busy || name.trim().length < 2}
                        onClick={() => void onSave()}
                        data-testid="mis-save"
                      >
                        {busy === 'save' ? 'Saving…' : 'Save mapping'}
                      </button>
                      <button
                        type="button"
                        className={QBTN}
                        disabled={!!busy || !canMatch}
                        onClick={() => void check()}
                        data-testid="mis-check"
                      >
                        {busy === 'check' ? 'Checking…' : 'Check the file'}
                      </button>
                    </div>
                  </div>
                  {!canMatch && (
                    <p className="mt-2 text-[13px] text-white">
                      Map a learner reference, ULN or email column so rows can be matched.
                    </p>
                  )}
                </QPanel>
              )}

              {plan && (
                <QPanel
                  title={
                    plan.dry_run
                      ? `${plan.summary.rows} ${plan.summary.rows === 1 ? 'row' : 'rows'} checked: ${plan.summary.updated} to update, ${plan.summary.unchanged} already up to date, ${plan.summary.new} new, ${plan.summary.skipped} skipped`
                      : `Applied: ${plan.summary.updated} updated, ${plan.summary.unchanged} already up to date, ${plan.summary.new} new, ${plan.summary.skipped} skipped`
                  }
                  sub={
                    plan.dry_run
                      ? 'Nothing has changed yet. New learners are added through the roster import, then their dates are applied.'
                      : (result ?? undefined)
                  }
                  action={
                    plan.dry_run && (plan.summary.updated > 0 || plan.summary.new > 0) ? (
                      <button
                        type="button"
                        className={QBTN_PRIMARY}
                        disabled={!!busy}
                        onClick={() => void apply()}
                        data-testid="mis-apply"
                      >
                        {busy === 'apply' ? 'Applying…' : 'Apply'}
                      </button>
                    ) : undefined
                  }
                >
                  <ul className="space-y-2" data-testid="mis-plan">
                    {listed.map((i) => (
                      <li
                        key={`${i.row}-${i.outcome}`}
                        className="text-[13px] leading-snug text-white"
                        data-testid="mis-plan-row"
                      >
                        <span className="font-semibold">Row {i.row}</span>{' '}
                        {i.outcome === 'updated' && (
                          <>
                            {i.name}:{' '}
                            {Object.entries(i.changes ?? {})
                              .map(
                                ([k, [a, b]]) =>
                                  `${CHANGE_LABEL[k] ?? k} ${fmtDate(a)} to ${fmtDate(b)}`
                              )
                              .join('; ')}
                          </>
                        )}
                        {i.outcome === 'new' && (
                          <>
                            new learner {i.name} ({i.email})
                          </>
                        )}
                        {i.outcome === 'skipped' && <>skipped: {i.detail}</>}
                        {i.notes?.length ? `. ${i.notes.join('. ')}` : ''}.
                      </li>
                    ))}
                    {plan.items.filter((i) => i.outcome !== 'unchanged').length > listed.length && (
                      <li className="text-[13px] text-white">
                        And{' '}
                        {plan.items.filter((i) => i.outcome !== 'unchanged').length - listed.length}{' '}
                        more.
                      </li>
                    )}
                  </ul>
                </QPanel>
              )}
            </section>
          )}

          {/* Step 2 */}
          <section className="space-y-3">
            <CollegeSectionTitle
              title="Direct connections"
              sub="A live link to your MIS instead of a file. Each one is built and tested with your credentials before it is switched on."
            />
            <ul className={QLIST} data-testid="mis-connectors">
              {CONNECTOR_DESIGNS.map((c) => (
                <li key={c.system} className="px-4 py-4 sm:px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[14.5px] font-semibold text-white">{c.name}</span>
                    <span className="inline-flex h-6 items-center rounded-full border border-white/[0.18] px-2.5 text-[12px] font-semibold text-white">
                      {c.status === 'needs_credentials'
                        ? 'Needs your credentials'
                        : c.status === 'design'
                          ? 'File import only'
                          : c.status}
                    </span>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-snug text-white">
                    {c.reads.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  {c.collegeSupplies.length > 0 && (
                    <>
                      <p className="mt-3 text-[13px] font-semibold text-white">
                        What we need from you
                      </p>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] leading-snug text-white">
                        {c.collegeSupplies.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {c.limits.map((l) => (
                    <p key={l} className="mt-2 text-[12.5px] leading-snug text-white">
                      {l}.
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </section>

          {runs.length > 0 && (
            <section className="space-y-3">
              <CollegeSectionTitle
                title="Recent runs"
                sub="Every applied import, with who ran it and what it changed."
              />
              <ul className={QLIST} data-testid="mis-runs">
                {runs.map((r) => (
                  <li key={r.id} className="px-4 py-3 text-[13px] text-white sm:px-5">
                    <span className="font-semibold">
                      {new Date(r.created_at).toLocaleString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>{' '}
                    {r.file_name ?? 'file'}: {r.rows_total} rows, {r.updated} updated,{' '}
                    {r.new_learners} new, {r.skipped} skipped.
                  </li>
                ))}
              </ul>
            </section>
          )}
        </QualityScreen>
      </HubBody>
    </HubPage>
  );
}
