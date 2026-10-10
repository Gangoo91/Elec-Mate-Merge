import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Download } from 'lucide-react';
import JSZip from 'jszip';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { useCollegeNation } from '@/hooks/college/useCollegeNation';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeEmpty, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { JoinedToggle } from '@/components/college/quality/QualityChoices';
import {
  QBTN,
  QBTN_PRIMARY,
  QLIST,
  QPanel,
  QROW,
  QualityHeader,
  QualityScreen,
} from '@/components/college/quality/QualityHubKit';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { ApiKeysPanel } from '@/components/college/interchange/ApiKeysPanel';
import { PowerBiGuide } from '@/components/college/interchange/PowerBiGuide';
import { IlrFieldsSheet, type IlrLearner } from '@/components/college/interchange/IlrFieldsSheet';
import { IlrReturnPanel } from '@/components/college/interchange/IlrReturnPanel';
import {
  DATA_API_BASE,
  ILR_CORE_FIELDS,
  INTERCHANGE_DATASETS,
  REPORTING_DATASETS,
  ROW_DATASETS,
  checkIlrRow,
  type IlrIssue,
  downloadText,
  toInterchangeCsv,
  type InterchangeDataset,
} from '@/lib/college/interchange';

/* ==========================================================================
   Data and API (ELE-1884, 10 Oct 2026). How a college gets its data out:

   - Exports: every dataset as CSV or JSON, or all of them in one ZIP, built
     by college_export() (capability 'exports'; each export is logged).
   - ILR fields: what each learner's record holds against the ILR 2026/27
     fields an apprenticeship needs, edited in IlrFieldsSheet. Not an ILR
     submission: we stay the learning and portfolio layer beside the MIS.
   - API keys: read-only, per college, scoped, rate limited, revocable, hashed
     at rest (ApiKeysPanel; settings.manage).
   - The API documented on the page itself, columns from the same dictionary
     the export uses (src/lib/college/interchange.ts).
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-data-api',
  title: 'Data and API',
  what: 'Get your college data out of Elec-Mate for your MIS: download it, or give your MIS team a read-only key. Every export and API call is logged.',
  steps: [
    {
      title: 'Download a dataset',
      body: 'Pick CSV for a spreadsheet or JSON for a developer. Download everything gives one ZIP with every dataset and a manifest.',
    },
    {
      title: 'Fill the ILR fields',
      body: 'Tap a learner to add their ULN, learner reference and the other ILR fields, so the ILR export is ready for your MIS team.',
    },
    {
      title: 'Report in Power BI',
      body: 'The reporting datasets give one row per learner for criteria progress, hours, reviews, risk and attendance. The Power BI guide on this page connects them with a read-only key and refreshes on a schedule.',
    },
    {
      title: 'Create a key',
      body: 'A college admin creates a key, ticks what it can read and sends it to the MIS team securely. It is shown once.',
    },
  ],
  notes: [
    {
      title: 'Two ILR outputs',
      body: 'The ILR CSV uses ILR 2026/27 field names for your MIS team to map. The ILR return builds the 2026/27 XML file itself and checks it against the published schema and the validation rules our data can trigger. Submit learner data still runs every rule when you upload, so we never call the file DfE validated.',
    },
    {
      title: 'Keys are never stored',
      body: 'We keep a fingerprint of each key, never the key itself. A lost key cannot be recovered, only revoked and replaced.',
    },
  ],
};

type LearnerRow = Omit<IlrLearner, 'ilr'> & { status: string | null };

function ilrDone(l: IlrLearner): number {
  const all: Record<string, unknown> = {
    ...(l.ilr ?? {}),
    uln: l.uln,
    date_of_birth: l.date_of_birth,
    ni_number: l.ni_number,
  };
  return ILR_CORE_FIELDS.filter((k) => all[k] != null && all[k] !== '').length;
}

export default function CollegeDataPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { collegeId, can, loading: capsLoading } = useCollegeCan();
  const canExport = can('exports');
  const canManage = can('settings.manage');
  const canEdit = can('learners.edit');
  const { nation, terms } = useCollegeNation(collegeId);

  const [learners, setLearners] = useState<IlrLearner[]>([]);
  const [ukprn, setUkprn] = useState('');
  const [ukprnSaved, setUkprnSaved] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [editing, setEditing] = useState<IlrLearner | null>(null);
  // ELE-2087: the field an ILR return error points at.
  const [focusField, setFocusField] = useState<string | null>(null);
  const [openDoc, setOpenDoc] = useState<InterchangeDataset | null>(null);
  const [showAll, setShowAll] = useState(false);
  // "Changes since" for monthly returns: blank means everything.
  const [since, setSince] = useState('');
  const [lastIlrExport, setLastIlrExport] = useState<string | null>(null);
  const [ilrCheck, setIlrCheck] = useState<Array<{
    name: string;
    id: string;
    issues: IlrIssue[];
  }> | null>(null);
  const [checking, setChecking] = useState(false);

  const load = useCallback(async () => {
    if (!collegeId) return;
    setLoading(true);
    const [s, i, c] = await Promise.all([
      supabase
        .from('college_students')
        .select(
          'id, name, uln, date_of_birth, ni_number, start_date, expected_end_date, otj_required_hours, status'
        )
        .eq('college_id', collegeId)
        .order('name'),
      supabase
        .from('college_student_ilr' as never)
        .select('*')
        .eq('college_id', collegeId),
      supabase
        .from('colleges')
        .select('ukprn' as never)
        .eq('id', collegeId)
        .maybeSingle(),
    ]);
    const ilrBy = new Map<string, Record<string, string | number | null>>();
    for (const r of (i.data as unknown as Record<string, string | number | null>[]) ?? [])
      ilrBy.set(String(r.student_id), r);
    const rows = ((s.data as unknown as LearnerRow[]) ?? []).map((l) => ({
      ...l,
      ilr: ilrBy.get(l.id) ?? null,
    }));
    setLearners(rows);
    const u = ((c.data as unknown as { ukprn: string | null } | null)?.ukprn ?? '') || '';
    setUkprn(u);
    setUkprnSaved(u);
    setLoading(false);
  }, [collegeId]);

  useEffect(() => {
    void load();
  }, [load]);

  // The last ILR export (readable by college admins), for "changes since my last return".
  useEffect(() => {
    if (!collegeId || !canManage) return;
    void supabase
      .from('college_data_access_log' as never)
      .select('created_at')
      .eq('college_id', collegeId)
      .eq('dataset', 'ilr')
      .eq('status_code', 200)
      .is('detail', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        const at =
          (data as unknown as Array<{ created_at: string }> | null)?.[0]?.created_at ?? null;
        setLastIlrExport(at);
      });
  }, [collegeId, canManage]);

  const runIlrCheck = async () => {
    setChecking(true);
    try {
      const { data, error } = await supabase.rpc(
        'college_ilr_check_rows' as never,
        { p_college: collegeId } as never
      );
      if (error) throw new Error(error.message);
      const rows = ((data as unknown as Record<string, unknown>[]) ?? []) as Record<
        string,
        unknown
      >[];
      setIlrCheck(
        rows
          .map((r) => ({
            id: String(r.elecmate_learner_id),
            name: [r.GivenNames, r.FamilyName].filter(Boolean).join(' ') || 'Unnamed learner',
            issues: checkIlrRow(r),
          }))
          .sort((a, b) => b.issues.length - a.issues.length)
      );
    } catch (e) {
      toast({ title: 'Check failed', description: (e as Error).message, variant: 'destructive' });
    }
    setChecking(false);
  };

  const fetchRows = async (d: InterchangeDataset, sinceOverride?: string | null) => {
    const sinceIso = (sinceOverride === undefined ? since : sinceOverride) || null;
    const { data, error } = await supabase.rpc(
      'college_export' as never,
      {
        p_college: collegeId,
        p_dataset: d,
        p_since: sinceIso ? new Date(`${sinceIso}T00:00:00`).toISOString() : null,
      } as never
    );
    if (error) throw new Error(error.message);
    return ((data as unknown as Record<string, unknown>[]) ?? []) as Record<string, unknown>[];
  };

  const stamp = () => new Date().toISOString().slice(0, 10);

  const exportOne = async (d: InterchangeDataset, fmt: 'csv' | 'json') => {
    setBusy(`${d}-${fmt}`);
    try {
      const rows = await fetchRows(d);
      if (fmt === 'csv')
        downloadText(
          `elec-mate-${d}-${stamp()}.csv`,
          toInterchangeCsv(d, rows),
          'text/csv;charset=utf-8'
        );
      else
        downloadText(
          `elec-mate-${d}-${stamp()}.json`,
          JSON.stringify(rows, null, 2),
          'application/json'
        );
      toast({ title: `${rows.length} ${rows.length === 1 ? 'row' : 'rows'} exported` });
    } catch (e) {
      toast({ title: 'Export failed', description: (e as Error).message, variant: 'destructive' });
    }
    setBusy(null);
  };

  const exportAll = async () => {
    setBusy('all');
    try {
      const zip = new JSZip();
      const manifest: Record<string, unknown> = {
        source: 'Elec-Mate College Hub',
        college_id: collegeId,
        generated_at: new Date().toISOString(),
        note: 'CSV files use the documented columns in order. ilr.csv uses ILR 2026/27 field names; it is not an ILR XML file.',
        files: [] as unknown[],
      };
      for (const d of INTERCHANGE_DATASETS) {
        const rows = await fetchRows(d.key);
        zip.file(`${d.key}.csv`, toInterchangeCsv(d.key, rows));
        (manifest.files as unknown[]).push({
          file: `${d.key}.csv`,
          rows: rows.length,
          columns: d.columns.map((c) => c.key),
        });
      }
      zip.file('manifest.json', JSON.stringify(manifest, null, 2));
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `elec-mate-college-data-${stamp()}.zip`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast({ title: `All ${INTERCHANGE_DATASETS.length} datasets downloaded` });
    } catch (e) {
      toast({ title: 'Export failed', description: (e as Error).message, variant: 'destructive' });
    }
    setBusy(null);
  };

  const saveUkprn = async () => {
    const { error } = await supabase.rpc(
      'set_college_ukprn' as never,
      { p_college: collegeId, p_ukprn: ukprn } as never
    );
    if (error)
      return toast({
        title: 'UKPRN not saved',
        description: error.message,
        variant: 'destructive',
      });
    setUkprnSaved(ukprn);
    toast({ title: 'UKPRN saved' });
  };

  const withUln = learners.filter((l) => !!l.uln).length;
  const complete = learners.filter((l) => ilrDone(l) === ILR_CORE_FIELDS.length).length;
  const sorted = useMemo(() => [...learners].sort((a, b) => ilrDone(a) - ilrDone(b)), [learners]);
  const shown = showAll ? sorted : sorted.slice(0, 8);

  if (!capsLoading && !collegeId) {
    return (
      <HubPage ground="landing">
        <HubMasthead section="College" title="Data and API" backTo="/college" />
        <HubBody hidePushPrompt>
          <CollegeEmpty title="No college found" body="This page is for college staff." />
        </HubBody>
      </HubPage>
    );
  }

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Data and API" backTo="/college" />
      <HubBody hidePushPrompt>
        <QualityScreen>
          <QualityHeader
            eyebrow="Data and API"
            title="Your data, out to your MIS"
            summary={
              loading
                ? `${ROW_DATASETS.length} datasets and ${REPORTING_DATASETS.length} reporting views as CSV or JSON, ILR fields on every learner and a read-only API for your MIS and Power BI.`
                : `${learners.length} learners on record, ${withUln} with a ULN and ${complete} with every core ILR field filled. Export ${ROW_DATASETS.length} datasets and ${REPORTING_DATASETS.length} reporting views as CSV or JSON, or give your MIS or Power BI a read-only key.`
            }
            help={HELP}
            actions={
              <button
                type="button"
                className={QBTN}
                onClick={() => navigate('/college/settings/mis')}
                data-testid="open-mis-sync"
              >
                MIS sync
              </button>
            }
            primary={
              canExport ? (
                <button
                  type="button"
                  className={QBTN_PRIMARY}
                  disabled={!!busy}
                  onClick={() => void exportAll()}
                >
                  <Download className="h-4 w-4" aria-hidden />
                  {busy === 'all' ? 'Building the ZIP…' : 'Download everything'}
                </button>
              ) : undefined
            }
          />

          {/* Exports */}
          <section className="space-y-3">
            <CollegeSectionTitle
              title="Exports"
              sub={
                canExport
                  ? 'Each download is logged with who took it and how many rows.'
                  : 'Your role cannot export college data.'
              }
            />
            {canExport && (
              <QPanel>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                  <div className="lg:w-56">
                    <label className={labelCn} htmlFor="export-since">
                      Only changes since
                    </label>
                    <input
                      id="export-since"
                      type="date"
                      className={inputCn}
                      value={since}
                      max={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setSince(e.target.value)}
                      data-testid="export-since"
                    />
                  </div>
                  {(() => {
                    const monthStart = new Date().toISOString().slice(0, 8) + '01';
                    const ilr = lastIlrExport ? lastIlrExport.slice(0, 10) : null;
                    const key = !since
                      ? 'all'
                      : since === monthStart
                        ? 'month'
                        : ilr && since === ilr
                          ? 'ilr'
                          : 'custom';
                    const opts: Array<{ key: string; label: string }> = [
                      { key: 'all', label: 'Everything' },
                      { key: 'month', label: 'This month' },
                    ];
                    if (ilr && lastIlrExport)
                      opts.push({
                        key: 'ilr',
                        label: `Since ILR ${new Date(lastIlrExport).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}`,
                      });
                    return (
                      <JoinedToggle
                        className="lg:mb-0.5"
                        label="Which rows to export"
                        options={opts}
                        value={key}
                        onChange={(k) =>
                          setSince(k === 'month' ? monthStart : k === 'ilr' && ilr ? ilr : '')
                        }
                      />
                    );
                  })()}
                </div>
                <p className="mt-2 text-[12.5px] leading-snug text-white">
                  {since
                    ? `Exports hold only rows created or changed on or after ${new Date(`${since}T12:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}. Use this for a monthly return.`
                    : 'Exports hold every row. Pick a date to send only what changed for a monthly return.'}
                </p>
              </QPanel>
            )}
            {[
              { label: null as string | null, list: ROW_DATASETS },
              {
                label:
                  'Reporting views: one row per learner, as at now. The Power BI guide below connects them.',
                list: REPORTING_DATASETS,
              },
            ].map((grp) => (
              <div key={grp.label ?? 'rows'} className="space-y-2">
                {grp.label && (
                  <p
                    className="pt-2 text-[13px] font-semibold text-white"
                    data-testid="reporting-label"
                  >
                    {grp.label}
                  </p>
                )}
                <ul className={QLIST}>
                  {grp.list.map((d) => (
                    <li key={d.key} className="px-4 py-3.5 sm:px-5">
                      {/* Name and the two downloads on one line; what it holds underneath. */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 pt-2.5">
                          <span className="text-[14.5px] font-semibold leading-tight text-white">
                            {d.title}
                          </span>
                          <span className="text-[12.5px] text-white">
                            {d.columns.length} columns
                          </span>
                          {d.sensitive && (
                            <span className="inline-flex h-6 items-center rounded-full border border-orange-400/60 px-2.5 text-[12px] font-semibold text-orange-300">
                              Personal data
                            </span>
                          )}
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            type="button"
                            className={cn(QBTN, 'min-w-[64px] px-3')}
                            disabled={!canExport || !!busy}
                            onClick={() => void exportOne(d.key, 'csv')}
                            data-testid={`export-${d.key}-csv`}
                          >
                            {busy === `${d.key}-csv` ? 'Exporting…' : 'CSV'}
                          </button>
                          <button
                            type="button"
                            className={cn(QBTN, 'min-w-[64px] px-3')}
                            disabled={!canExport || !!busy}
                            onClick={() => void exportOne(d.key, 'json')}
                            data-testid={`export-${d.key}-json`}
                          >
                            {busy === `${d.key}-json` ? 'Exporting…' : 'JSON'}
                          </button>
                        </div>
                      </div>
                      <p className="mt-1.5 text-[13px] leading-snug text-white">{d.about}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* ILR fields */}
          <section className="space-y-3">
            <CollegeSectionTitle
              title="ILR fields"
              sub={`${complete} of ${learners.length} learners have all ${ILR_CORE_FIELDS.length} core fields. Least complete first.`}
              action={
                canExport ? (
                  <button
                    type="button"
                    className={cn(QBTN, 'hidden sm:inline-flex')}
                    disabled={checking}
                    onClick={() => void runIlrCheck()}
                    data-testid="ilr-check"
                  >
                    {checking ? 'Checking…' : 'Check the ILR export'}
                  </button>
                ) : undefined
              }
            />
            {canExport && (
              <button
                type="button"
                className={cn(QBTN, 'w-full sm:hidden')}
                disabled={checking}
                onClick={() => void runIlrCheck()}
              >
                {checking ? 'Checking…' : 'Check the ILR export'}
              </button>
            )}
            {ilrCheck && (
              <QPanel
                title={`${ilrCheck.filter((r) => r.issues.length === 0).length} of ${ilrCheck.length} learners pass the format checks`}
                sub="Checks from the ILR 2026/27 field definitions: completeness, formats and codes. They are not the DfE validation rules, which your MIS runs when it builds the return."
              >
                <ul className="space-y-2" data-testid="ilr-check-results">
                  {ilrCheck
                    .filter((r) => r.issues.length > 0)
                    .slice(0, 12)
                    .map((r) => (
                      <li key={r.id} className="text-[13px] leading-snug text-white">
                        <span className="font-semibold">{r.name}</span>: {r.issues.length}{' '}
                        {r.issues.length === 1 ? 'issue' : 'issues'}.{' '}
                        {r.issues
                          .slice(0, 4)
                          .map((i) => i.message)
                          .join('; ')}
                        {r.issues.length > 4 ? '; and more' : ''}.
                      </li>
                    ))}
                </ul>
              </QPanel>
            )}
            {nation !== 'england' && (
              <QPanel>
                <p className="text-[13px] leading-relaxed text-white" data-testid="ilr-nation-note">
                  The ILR is England&rsquo;s learner return. Your college is set to {terms.name},
                  where apprenticeships are funded by {terms.funder}, which sets its own learner
                  data return. These columns are still a useful starting point for your MIS team,
                  but they are named for the English ILR.
                </p>
              </QPanel>
            )}
            <QPanel>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="sm:w-64">
                  <label className={labelCn} htmlFor="ukprn">
                    College UKPRN
                  </label>
                  <input
                    id="ukprn"
                    className={inputCn}
                    inputMode="numeric"
                    maxLength={8}
                    value={ukprn}
                    disabled={!canManage}
                    onChange={(e) => setUkprn(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                </div>
                {canManage && (
                  <button
                    type="button"
                    className={QBTN}
                    disabled={ukprn === ukprnSaved || (!!ukprn && !/^[1-9][0-9]{7}$/.test(ukprn))}
                    onClick={() => void saveUkprn()}
                  >
                    Save UKPRN
                  </button>
                )}
                <p className="text-[12.5px] leading-snug text-white sm:flex-1">
                  8 digits, from the UK Register of Learning Providers. Goes out on every ILR export
                  row.
                </p>
              </div>
            </QPanel>
            {loading ? (
              <div className="h-40 animate-pulse rounded-2xl bg-white/[0.04]" />
            ) : learners.length === 0 ? (
              <CollegeEmpty
                title="No learners yet"
                body="Add learners and their ILR fields appear here."
              />
            ) : (
              <ul className={QLIST}>
                {shown.map((l) => {
                  const n = ilrDone(l);
                  return (
                    <li key={l.id}>
                      <button
                        type="button"
                        className={QROW}
                        disabled={!canEdit}
                        onClick={() => setEditing(l)}
                        data-testid="ilr-learner-row"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-semibold text-white">
                            {l.name ?? 'Unnamed learner'}
                          </p>
                          <p className="text-[12.5px] text-white">
                            ULN {l.uln ?? 'not set'} · reference{' '}
                            {(l.ilr?.learn_ref_number as string) ?? 'not set'}
                          </p>
                        </div>
                        <span
                          className={cn(
                            'inline-flex h-6 shrink-0 items-center rounded-full border px-2.5 text-[12px] font-semibold tabular-nums',
                            n === ILR_CORE_FIELDS.length
                              ? 'border-emerald-400/60 text-emerald-300'
                              : n === 0
                                ? 'border-orange-400/60 text-orange-300'
                                : 'border-white/[0.18] text-white'
                          )}
                        >
                          {n} of {ILR_CORE_FIELDS.length}
                        </span>
                        {canEdit && (
                          <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {learners.length > 8 && (
              <button type="button" className={QBTN} onClick={() => setShowAll((v) => !v)}>
                {showAll ? 'Show fewer' : `Show all ${learners.length}`}
              </button>
            )}
          </section>

          {/* ILR return (ELE-2087) */}
          {collegeId && (
            <section className="space-y-3" id="ilr-return">
              <CollegeSectionTitle
                title="ILR return"
                sub="The ILR 2026/27 XML file, checked against the published schema and validation rules before you submit."
              />
              <IlrReturnPanel
                collegeId={collegeId}
                canExport={canExport}
                onFix={(learnerId, fix) => {
                  if (fix === 'college:ukprn') {
                    const el = document.getElementById('ukprn');
                    el?.scrollIntoView({ block: 'center' });
                    el?.focus({ preventScroll: true });
                    return;
                  }
                  if (!learnerId) return;
                  if (fix.startsWith('record:')) {
                    navigate(`/college/students/${learnerId}`);
                    return;
                  }
                  const l = learners.find((x) => x.id === learnerId);
                  if (!l) return;
                  if (!canEdit) {
                    toast({ title: 'Your role cannot edit learner records' });
                    return;
                  }
                  setFocusField(fix);
                  setEditing(l);
                }}
              />
            </section>
          )}

          {/* API keys */}
          {collegeId && (
            <section className="space-y-3">
              <CollegeSectionTitle
                title="Read API"
                sub="For your MIS team or developer. Read-only; nothing can be changed through it."
              />
              <ApiKeysPanel collegeId={collegeId} canManage={canManage} />
            </section>
          )}

          {/* API documentation */}
          <section className="space-y-3" id="api-docs">
            <CollegeSectionTitle
              title="API reference"
              sub="Version 1. Everything an MIS developer needs; send them this page."
            />
            <QPanel>
              <div className="space-y-4 text-[13px] leading-relaxed text-white">
                <div>
                  <h4 className="text-[13.5px] font-semibold">Authentication</h4>
                  <p>
                    Send the key on every request. Keys start with emk_ and belong to one college.
                  </p>
                  <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-black/40 p-3 font-mono text-[12px]">
                    {`curl -H "Authorization: Bearer emk_..." \\\n  "${DATA_API_BASE}/v1/learners?since=2026-09-01&limit=500"`}
                  </pre>
                </div>
                <div>
                  <h4 className="text-[13.5px] font-semibold">Endpoints</h4>
                  <ul className="mt-1 space-y-1">
                    <li>
                      <code className="font-mono text-[12px]">GET /v1</code>: the datasets and
                      columns this key can read.
                    </li>
                    <li>
                      <code className="font-mono text-[12px]">GET /v1/&lt;dataset&gt;</code>: rows,
                      oldest first. Datasets: {ROW_DATASETS.map((d) => d.key).join(', ')}.
                    </li>
                    <li>
                      Reporting views, one row per learner as at now:{' '}
                      {REPORTING_DATASETS.map((d) => `${d.key} (${d.scope} scope)`).join(', ')}.
                      Each needs the scope shown, so an existing key reads them with nothing new.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13.5px] font-semibold">Parameters</h4>
                  <ul className="mt-1 space-y-1">
                    <li>
                      since: ISO 8601 date or date-time; only rows changed since then. Not applied
                      to the reporting views, which are snapshots (their as_at column says when).
                    </li>
                    <li>
                      limit: 1 to 1000 rows a page (default 500). offset: where the page starts; use
                      next_offset from the last page until it is null.
                    </li>
                    <li>format=csv: the same rows as CSV with the documented header.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13.5px] font-semibold">Responses</h4>
                  <ul className="mt-1 space-y-1">
                    <li>
                      200: {'{ dataset, count, limit, offset, next_offset, columns, data: [...] }'}
                    </li>
                    <li>
                      401: no key, unknown key, revoked or expired. 403: the key cannot read that
                      dataset. 404: unknown dataset.
                    </li>
                    <li>
                      429: over the key&rsquo;s calls a minute; wait for Retry-After seconds. Every
                      call, allowed or refused, is logged.
                    </li>
                  </ul>
                </div>
              </div>
            </QPanel>
            <ul className={QLIST}>
              {INTERCHANGE_DATASETS.map((d) => {
                const open = openDoc === d.key;
                return (
                  <li key={d.key}>
                    <button
                      type="button"
                      className={QROW}
                      aria-expanded={open}
                      onClick={() => setOpenDoc(open ? null : d.key)}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-semibold text-white">
                          <code className="font-mono">{d.key}</code> · {d.title}
                        </p>
                        <p className="text-[12.5px] text-white">
                          {d.columns.length} columns ·{' '}
                          {d.reporting
                            ? `snapshot, needs the ${d.scope} scope`
                            : `since filters on ${d.since}`}
                        </p>
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 shrink-0 text-white transition-transform',
                          open && 'rotate-180'
                        )}
                        aria-hidden
                      />
                    </button>
                    {open && (
                      <dl className="grid grid-cols-1 gap-x-6 gap-y-2 px-4 pb-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:px-5">
                        {d.columns.map((c) => (
                          <div key={c.key} className="contents">
                            <dt className="font-mono text-[12.5px] font-semibold text-white">
                              {c.key}
                            </dt>
                            <dd className="text-[12.5px] leading-snug text-white">{c.about}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
          {/* ELE-2057 Power BI */}
          <section className="space-y-3" id="power-bi">
            <CollegeSectionTitle
              title="Power BI and Excel"
              sub="Connect the reporting views to Power BI or Excel with a read-only key, and refresh on a schedule."
            />
            <PowerBiGuide />
          </section>
        </QualityScreen>

        <IlrFieldsSheet
          learner={editing}
          open={!!editing}
          onOpenChange={(v) => {
            if (!v) {
              setEditing(null);
              setFocusField(null);
            }
          }}
          onSaved={() => void load()}
          focusField={focusField}
        />
      </HubBody>
    </HubPage>
  );
}
