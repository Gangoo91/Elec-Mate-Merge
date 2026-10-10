import { useCallback, useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeEmpty, CollegeSectionTitle, chipCn } from '@/components/college/ui/CollegeUi';
import {
  QBTN,
  QBTN_PRIMARY,
  QLIST,
  QPanel,
  QualityHeader,
  QualityScreen,
} from '@/components/college/quality/QualityHubKit';
import { labelCn, selectTriggerCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  EVIDENCE_TYPES_LINE,
  IMPORT_FIELDS,
  IMPORT_SOURCES,
  evidenceMime,
  guessColumns,
  matchLearner,
  parseCriterion,
  parseUkDate,
  splitList,
  type ColumnMap,
  type ImportSource,
  type RosterLearner,
} from '@/lib/college/evidenceImport';

/* ==========================================================================
   Bring evidence across (ELE-1974, 10 Oct 2026).

   "Our current learners' evidence is in there" is the reason a college stays
   on its incumbent. This takes the export a college can already get out of
   its old e-portfolio, as a CSV of evidence rows plus the files (loose or in a
   ZIP), and stages it for each learner:

     1. Where it came from (a label only) and the files.
     2. Match the CSV's columns to ours (guessed from the headers).
     3. Check: learners matched, criteria read, files found. Import.

   Each learner then checks every item on their Today page before it joins
   their record (ImportedEvidenceReviewCard). Accepted items whose original
   outcome was a pass can then have an "imported" decision recorded, which
   keeps the original assessor and date in its feedback.

   No vendor integration is claimed. OneFile, Bud, Smart Assessor and Aptem
   are only names for where the export came from.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-evidence-import',
  title: 'Bring evidence across',
  what: 'Import learners’ evidence from another e-portfolio’s export, so switching mid-programme loses nothing. Each learner checks their items before they join their record.',
  steps: [
    {
      title: 'Export from the old system',
      body: 'Get a CSV with one row per evidence item (learner, title, criteria, assessor, date, outcome, file names), and the files themselves, loose or in a ZIP.',
    },
    {
      title: 'Match the columns',
      body: 'We guess which column is which from the headers. Check each one; only learner and title are required.',
    },
    {
      title: 'Check and import',
      body: 'You see which rows matched a learner, which criteria were read and which files were found, before anything is saved.',
    },
    {
      title: 'Learners confirm',
      body: 'Each learner sees the items on their Today page and adds or leaves out each one.',
    },
  ],
  notes: [
    {
      title: 'Not a connection to the old system',
      body: 'We read a file you export. We do not connect to OneFile, Bud, Smart Assessor, Aptem or any other system.',
    },
    {
      title: 'Decisions carried over',
      body: 'For items the learner adds whose original outcome was a pass, an assessor can record an imported decision. It names who recorded it, and keeps the original assessor, date and outcome in its feedback.',
    },
  ],
};

type Row = Record<string, string>;

interface ImportRow {
  index: number;
  learner: RosterLearner | null;
  learnerKey: string;
  title: string;
  description: string;
  criteriaRaw: string[];
  criteria: Array<{ unit_code: string; ac_code: string }>;
  unread: string[];
  assessor: string;
  assessedOn: string | null;
  outcome: string;
  reference: string;
  fileNames: string[];
  filesFound: File[];
  filesMissing: string[];
  /** Found, but a type the learner's portfolio cannot hold: left behind. */
  filesUnsupported: string[];
}

interface ImportSummary {
  id: string;
  source: string;
  source_label: string | null;
  file_name: string | null;
  item_count: number;
  created_at: string;
  awaiting: number;
  accepted: number;
  declined: number;
  recorded: number;
}

const NONE = '__none__';

export default function CollegeEvidenceImportPage() {
  const { toast } = useToast();
  const { collegeId, can, loading: capsLoading } = useCollegeCan();
  const canImport = can('learners.edit');
  const canDecide = can('assess.decide');

  const [source, setSource] = useState<ImportSource>('other');
  const [csvName, setCsvName] = useState<string | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [map, setMap] = useState<ColumnMap>({});
  const [roster, setRoster] = useState<RosterLearner[]>([]);
  const [importing, setImporting] = useState(false);
  const [history, setHistory] = useState<ImportSummary[]>([]);
  const [recording, setRecording] = useState<string | null>(null);

  const loadRoster = useCallback(async () => {
    if (!collegeId) return;
    const [s, i] = await Promise.all([
      supabase
        .from('college_students')
        .select('id, user_id, name, email, uln')
        .eq('college_id', collegeId),
      supabase
        .from('college_student_ilr' as never)
        .select('student_id, learn_ref_number')
        .eq('college_id', collegeId),
    ]);
    const refs = new Map<string, string | null>();
    for (const r of (i.data as unknown as Array<{
      student_id: string;
      learn_ref_number: string | null;
    }>) ?? [])
      refs.set(r.student_id, r.learn_ref_number);
    setRoster(
      (
        ((s.data as unknown as Omit<RosterLearner, 'learn_ref_number'>[]) ?? []) as Omit<
          RosterLearner,
          'learn_ref_number'
        >[]
      ).map((r) => ({ ...r, learn_ref_number: refs.get(r.id) ?? null }))
    );
  }, [collegeId]);

  const loadHistory = useCallback(async () => {
    if (!collegeId) return;
    const { data: imps } = await supabase
      .from('college_evidence_imports' as never)
      .select('id, source, source_label, file_name, item_count, created_at')
      .eq('college_id', collegeId)
      .order('created_at', { ascending: false })
      .limit(10);
    const list = ((imps as unknown as Omit<
      ImportSummary,
      'awaiting' | 'accepted' | 'declined' | 'recorded'
    >[]) ?? []) as Omit<ImportSummary, 'awaiting' | 'accepted' | 'declined' | 'recorded'>[];
    if (!list.length) return setHistory([]);
    const { data: items } = await supabase
      .from('college_evidence_import_items' as never)
      .select('import_id, status')
      .in(
        'import_id',
        list.map((x) => x.id)
      );
    const counts = new Map<string, Record<string, number>>();
    for (const it of (items as unknown as Array<{ import_id: string; status: string }>) ?? []) {
      const c = counts.get(it.import_id) ?? {};
      c[it.status] = (c[it.status] ?? 0) + 1;
      counts.set(it.import_id, c);
    }
    setHistory(
      list.map((x) => {
        const c = counts.get(x.id) ?? {};
        return {
          ...x,
          awaiting: c.awaiting_learner ?? 0,
          accepted: c.accepted ?? 0,
          declined: c.declined ?? 0,
          recorded: c.recorded ?? 0,
        };
      })
    );
  }, [collegeId]);

  useEffect(() => {
    void loadRoster();
    void loadHistory();
  }, [loadRoster, loadHistory]);

  const onCsv = (f: File) => {
    Papa.parse<Row>(f, {
      header: true,
      skipEmptyLines: 'greedy',
      complete: (res) => {
        const hs = (res.meta.fields ?? []).filter(Boolean);
        setCsvName(f.name);
        setHeaders(hs);
        setRows(res.data.filter((r) => Object.values(r).some((v) => String(v ?? '').trim())));
        setMap(guessColumns(hs));
      },
      error: (err) =>
        toast({
          title: 'Could not read that CSV',
          description: err.message,
          variant: 'destructive',
        }),
    });
  };

  const onFiles = async (list: FileList | null) => {
    if (!list) return;
    const out: File[] = [];
    for (const f of Array.from(list)) {
      if (/\.zip$/i.test(f.name)) {
        try {
          const zip = await JSZip.loadAsync(f);
          const entries = Object.values(zip.files).filter(
            (e) => !e.dir && !/(^|\/)(__MACOSX|\.DS_Store)/.test(e.name)
          );
          for (const e of entries) {
            if (/\.csv$/i.test(e.name) && !csvName) {
              const text = await e.async('string');
              onCsv(
                new File([text], e.name.split('/').pop() ?? 'export.csv', { type: 'text/csv' })
              );
              continue;
            }
            const blob = await e.async('blob');
            out.push(new File([blob], e.name.split('/').pop() ?? e.name));
          }
        } catch {
          toast({ title: `Could not open ${f.name}`, variant: 'destructive' });
        }
      } else if (/\.csv$/i.test(f.name) && !csvName) {
        onCsv(f);
      } else {
        out.push(f);
      }
    }
    setFiles((cur) => [...cur, ...out]);
  };

  const prepared: ImportRow[] = useMemo(() => {
    const byName = new Map(files.map((f) => [f.name.toLowerCase(), f]));
    return rows.map((r, index) => {
      const get = (k: keyof ColumnMap) => (map[k] ? String(r[map[k] as string] ?? '').trim() : '');
      const raw = splitList(get('criteria'));
      const parsed = raw.map((c) => ({ c, p: parseCriterion(c) }));
      const names = splitList(get('files')).map((n) => n.split(/[\\/]/).pop() ?? n);
      const present = names.map((n) => byName.get(n.toLowerCase())).filter(Boolean) as File[];
      const found = present.filter((f) => !!evidenceMime(f.name));
      return {
        index,
        learnerKey: get('learner'),
        learner: matchLearner(get('learner'), roster),
        title: get('title'),
        description: get('description'),
        criteriaRaw: raw,
        criteria: parsed.filter((x) => x.p).map((x) => x.p!),
        unread: parsed.filter((x) => !x.p).map((x) => x.c),
        assessor: get('assessor'),
        assessedOn: parseUkDate(get('assessed_on')),
        outcome: get('outcome'),
        reference: get('reference'),
        fileNames: names,
        filesFound: found,
        filesMissing: names.filter((n) => !byName.has(n.toLowerCase())),
        filesUnsupported: present.filter((f) => !evidenceMime(f.name)).map((f) => f.name),
      };
    });
  }, [rows, map, roster, files]);

  const ready = prepared.filter((r) => r.learner?.user_id && r.title);
  const noLearner = prepared.filter((r) => !r.learner);
  const notLinked = prepared.filter((r) => r.learner && !r.learner.user_id);
  const noTitle = prepared.filter((r) => r.learner?.user_id && !r.title);
  const critRead = ready.reduce((n, r) => n + r.criteria.length, 0);
  const critUnread = ready.reduce((n, r) => n + r.unread.length, 0);
  const filesMissing = ready.reduce((n, r) => n + r.filesMissing.length, 0);
  const filesFound = ready.reduce((n, r) => n + r.filesFound.length, 0);
  const filesUnsupported = ready.reduce((n, r) => n + r.filesUnsupported.length, 0);
  const mappedOk = !!map.learner && !!map.title;

  const runImport = async () => {
    if (!collegeId || !ready.length) return;
    setImporting(true);
    try {
      const importId = crypto.randomUUID();
      const items = [];
      for (const r of ready) {
        const staged = [];
        for (const f of r.filesFound) {
          const safe = f.name.replace(/[^A-Za-z0-9._-]+/g, '-').slice(-80);
          const path = `${collegeId}/imports/${importId}/${r.learner!.user_id}/${r.index}-${safe}`;
          const type = evidenceMime(f.name) ?? f.type;
          const { error } = await supabase.storage
            .from('college-learner-evidence')
            .upload(path, f, { upsert: true, contentType: type });
          if (error) throw new Error(`Could not upload ${f.name}: ${error.message}`);
          staged.push({ path, name: f.name, size: f.size, type });
        }
        items.push({
          student_id: r.learner!.id,
          title: r.title,
          description: r.description,
          criteria_raw: r.criteriaRaw,
          criteria: r.criteria,
          original_assessor: r.assessor,
          original_assessed_on: r.assessedOn ?? '',
          original_outcome: r.outcome,
          original_ref: r.reference,
          files: staged,
        });
      }
      const { data, error } = await supabase.rpc(
        'create_evidence_import' as never,
        {
          p_import_id: importId,
          p_college: collegeId,
          p_source: source,
          p_source_label: IMPORT_SOURCES.find((s) => s.key === source)?.label ?? null,
          p_file_name: csvName,
          p_column_map: map,
          p_items: items,
        } as never
      );
      if (error) throw new Error(error.message);
      const out = data as unknown as { items: number; criteria: number; criteria_found: number };
      toast({
        title: `${out.items} ${out.items === 1 ? 'item' : 'items'} sent to learners to check`,
        description: `${out.criteria_found} of ${out.criteria} criteria matched the learners' qualifications.`,
      });
      setRows([]);
      setHeaders([]);
      setFiles([]);
      setCsvName(null);
      setMap({});
      void loadHistory();
    } catch (e) {
      toast({ title: 'Import failed', description: (e as Error).message, variant: 'destructive' });
    }
    setImporting(false);
  };

  const recordDecisions = async (id: string) => {
    setRecording(id);
    const { data, error } = await supabase.rpc(
      'record_imported_decisions' as never,
      { p_import: id } as never
    );
    setRecording(null);
    if (error)
      return toast({ title: 'Not recorded', description: error.message, variant: 'destructive' });
    const out = data as unknown as { items: number; decisions: number; evidence_only: number };
    toast({
      title: `${out.decisions} carried-over ${out.decisions === 1 ? 'decision' : 'decisions'} recorded`,
      description: out.evidence_only
        ? `${out.evidence_only} kept as evidence only (no pass outcome).`
        : undefined,
    });
    void loadHistory();
  };

  if (!capsLoading && (!collegeId || !canImport)) {
    return (
      <HubPage ground="landing">
        <HubMasthead
          section="College"
          title="Bring evidence across"
          backTo="/college?section=collegesettings"
        />
        <HubBody hidePushPrompt>
          <CollegeEmpty
            title="Not available"
            body="Importing evidence needs permission to edit learners at your college."
          />
        </HubBody>
      </HubPage>
    );
  }

  const fieldOptions = [
    { value: NONE, label: 'Not in this file' },
    ...headers.map((h) => ({ value: h, label: h })),
  ];
  const awaitingTotal = history.reduce((n, h) => n + h.awaiting, 0);

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Bring evidence across"
        backTo="/college?section=collegesettings"
      />
      <HubBody hidePushPrompt>
        <QualityScreen>
          <QualityHeader
            eyebrow="Bring evidence across"
            title="Import evidence from another e-portfolio"
            summary={
              history.length
                ? `${history.length} ${history.length === 1 ? 'import' : 'imports'} so far, ${awaitingTotal} ${awaitingTotal === 1 ? 'item' : 'items'} waiting for learners to check. Learners confirm every item before it joins their record.`
                : 'Bring a CSV of evidence and its files from your old system. Learners confirm every item before it joins their record.'
            }
            help={HELP}
            primary={
              <button
                type="button"
                className={QBTN_PRIMARY}
                disabled={!ready.length || importing || !mappedOk}
                onClick={() => void runImport()}
                data-testid="run-import"
              >
                {importing
                  ? 'Importing…'
                  : ready.length
                    ? `Import ${ready.length} ${ready.length === 1 ? 'item' : 'items'}`
                    : 'Import'}
              </button>
            }
          />

          {/* 1 */}
          <section className="space-y-3">
            <CollegeSectionTitle
              title="1. Where it came from"
              sub="A label for your records only. We read the file you export; we do not connect to any of these systems."
            />
            <QPanel>
              <div className="flex flex-wrap gap-2" data-testid="import-source">
                {IMPORT_SOURCES.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    className={chipCn(source === s.key)}
                    onClick={() => setSource(s.key)}
                    aria-pressed={source === s.key}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className={cn(QBTN, 'cursor-pointer justify-start')}>
                  <Upload className="h-4 w-4" aria-hidden />
                  {csvName ? `CSV: ${csvName} (${rows.length} rows)` : 'Choose the CSV'}
                  <input
                    type="file"
                    accept=".csv,text/csv"
                    className="sr-only"
                    data-testid="import-csv"
                    onChange={(e) => e.target.files?.[0] && onCsv(e.target.files[0])}
                  />
                </label>
                <label className={cn(QBTN, 'cursor-pointer justify-start')}>
                  <Upload className="h-4 w-4" aria-hidden />
                  {files.length
                    ? `${files.length} ${files.length === 1 ? 'file' : 'files'} added`
                    : 'Add the files or a ZIP (optional)'}
                  <input
                    type="file"
                    multiple
                    className="sr-only"
                    data-testid="import-files"
                    onChange={(e) => void onFiles(e.target.files)}
                  />
                </label>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-white">
                One row per evidence item. A ZIP can hold the CSV and the files together. Files stay
                private to your college until the learner adds them to their portfolio. A portfolio
                holds {EVIDENCE_TYPES_LINE}.
              </p>
            </QPanel>
          </section>

          {/* 2 */}
          {headers.length > 0 && (
            <section className="space-y-3">
              <CollegeSectionTitle
                title="2. Match the columns"
                sub="Guessed from your headers. Learner and title are required."
              />
              <QPanel>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                  {IMPORT_FIELDS.map((f) => (
                    <div key={f.key} data-testid={`map-${f.key}`}>
                      <span className={labelCn}>
                        {f.label}
                        {f.required ? ' (required)' : ''}
                      </span>
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
              </QPanel>
            </section>
          )}

          {/* 3 */}
          {headers.length > 0 && mappedOk && (
            <section className="space-y-3">
              <CollegeSectionTitle
                title="3. Check before you import"
                sub={`${ready.length} of ${prepared.length} ${prepared.length === 1 ? 'row' : 'rows'} ready. ${critRead} ${critRead === 1 ? 'criterion' : 'criteria'} read${critUnread ? `, ${critUnread} not readable` : ''}; ${filesFound} ${filesFound === 1 ? 'file' : 'files'} found${filesMissing ? `, ${filesMissing} missing` : ''}${filesUnsupported ? `, ${filesUnsupported} of a type a portfolio cannot hold` : ''}.`}
              />
              {(noLearner.length > 0 || notLinked.length > 0 || noTitle.length > 0) && (
                <QPanel>
                  <ul
                    className="space-y-1.5 text-[13px] leading-snug text-white"
                    data-testid="import-problems"
                  >
                    {noLearner.length > 0 && (
                      <li className="text-orange-300">
                        {noLearner.length} {noLearner.length === 1 ? 'row does' : 'rows do'} not
                        match a learner by ULN, email or learner reference (
                        {noLearner
                          .slice(0, 3)
                          .map((r) => r.learnerKey || 'blank')
                          .join(', ')}
                        {noLearner.length > 3 ? '…' : ''}). Left out.
                      </li>
                    )}
                    {notLinked.length > 0 && (
                      <li className="text-orange-300">
                        {notLinked.length} {notLinked.length === 1 ? 'row is' : 'rows are'} for
                        learners not yet signed in to Elec-Mate, so they cannot check them. Left
                        out; import again once they join.
                      </li>
                    )}
                    {noTitle.length > 0 && (
                      <li className="text-orange-300">
                        {noTitle.length} rows have no title. Left out.
                      </li>
                    )}
                  </ul>
                </QPanel>
              )}
              <ul className={QLIST} data-testid="import-preview">
                {ready.slice(0, 12).map((r) => (
                  <li key={r.index} className="px-4 py-3 sm:px-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[14px] font-semibold text-white">{r.title}</span>
                      <span className="text-[12.5px] text-white">
                        for {r.learner?.name ?? r.learnerKey}
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-snug text-white">
                      {r.assessor ? `Assessed by ${r.assessor}` : 'No assessor'}
                      {r.assessedOn
                        ? ` on ${new Date(`${r.assessedOn}T12:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                        : ''}
                      {r.outcome ? `, outcome ${r.outcome}` : ''}.{' '}
                      {r.criteria.length
                        ? `Criteria ${r.criteria.map((c) => `${c.unit_code} AC ${c.ac_code}`).join(', ')}.`
                        : 'No criteria read.'}
                      {r.unread.length ? ` Not readable: ${r.unread.join(', ')}.` : ''}
                      {r.fileNames.length
                        ? ` Files ${r.filesFound.length} of ${r.fileNames.length} found.`
                        : ''}
                      {r.filesUnsupported.length
                        ? ` Left behind (type not accepted): ${r.filesUnsupported.join(', ')}.`
                        : ''}
                    </p>
                  </li>
                ))}
                {ready.length > 12 && (
                  <li className="px-4 py-3 text-[12.5px] text-white sm:px-5">
                    {ready.length - 12} more rows.
                  </li>
                )}
                {ready.length === 0 && (
                  <li className="px-4 py-6 text-center text-[13px] text-white">
                    No rows are ready yet.
                  </li>
                )}
              </ul>
              <p className="text-[12.5px] leading-relaxed text-white">
                Criteria are checked against each learner&rsquo;s qualification when you import; any
                that do not exist there are kept as written but not mapped.
              </p>
            </section>
          )}

          {/* History */}
          <section className="space-y-3">
            <CollegeSectionTitle title="Imports" sub="What learners have done with each import." />
            {history.length === 0 ? (
              <CollegeEmpty
                title="Nothing imported yet"
                body="Your imports and what learners did with them appear here."
              />
            ) : (
              <ul className={QLIST} data-testid="import-history">
                {history.map((h) => (
                  <li
                    key={h.id}
                    className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                  >
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-white">
                        {h.source_label ?? h.source} · {h.file_name ?? 'CSV'}
                      </p>
                      <p className="mt-0.5 text-[12.5px] text-white">
                        {new Date(h.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        · {h.item_count} {h.item_count === 1 ? 'item' : 'items'}: {h.awaiting}{' '}
                        waiting, {h.accepted} added, {h.declined} left out, {h.recorded} carried
                        over
                      </p>
                    </div>
                    {canDecide && h.accepted > 0 && (
                      <button
                        type="button"
                        className={cn(QBTN, 'shrink-0')}
                        disabled={recording === h.id}
                        onClick={() => void recordDecisions(h.id)}
                      >
                        {recording === h.id ? 'Recording…' : `Record ${h.accepted} carried-over`}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </QualityScreen>
      </HubBody>
    </HubPage>
  );
}
