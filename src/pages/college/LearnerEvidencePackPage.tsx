import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HowItWorks, PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  cardCn,
  chipBase,
  chipOff,
  chipOn,
  fieldFullCn,
  grid2Cn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import {
  KIND_LABEL,
  STATUS_LABEL,
  STATUS_PILL,
  addEpisode,
  isApplicable,
  openEvidenceFile,
  updateLearnerFacts,
  useCollegeRequirements,
  useLearnerPack,
  type EvidenceRow,
  type ItemGroup,
  type LearnerPack,
  type PackItem,
} from '@/hooks/useEvidencePack';
import { FileEvidenceSheet, type FileEvidenceTarget } from '@/components/college/evidence/FileEvidenceSheet';

/* ==========================================================================
   LearnerEvidencePackPage — /college/evidence-pack/:studentId

   One apprentice's funding evidence pack (ELE-1908), live from the record:
   every item the funding rules ask a provider to hold, plus the college's
   own requirements, each with its status, the paragraph it comes from, the
   documents filed (every version kept) and what to do next. ?print=1 gives
   the A4 pack to hand an auditor or inspector.
   ========================================================================== */

const GROUPS: Array<{ key: ItemGroup | 'custom'; title: string }> = [
  { key: 'start', title: 'At the start' },
  { key: 'during', title: 'During the apprenticeship' },
  { key: 'end', title: 'At gateway and the end' },
  { key: 'custom', title: 'Your college’s requirements' },
];

const fmt = (iso: string | null | undefined) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '—';

const EPISODE_LABEL: Record<LearnerPack['episodes'][number]['kind'], string> = {
  start: 'Started',
  break: 'Break in learning',
  return: 'Returned from a break',
  employer_change: 'Changed employer',
  withdrawal: 'Withdrew',
  completion: 'Completed',
};

const HELP: PageHelpContent = {
  id: 'college-learner-evidence-pack',
  title: 'A learner’s evidence pack',
  what: 'Everything the funding rules need on file for this apprentice, plus your college’s own requirements, checked live against the record.',
  steps: [
    { title: 'Work down the red', body: 'Each item says what is needed, which paragraph of the rules asks for it, and its status.' },
    { title: 'File or fix', body: 'Tap File to add the document and who signed it, Edit details for the ULN, NI number and dates, or open reviews and hours where those items live.' },
    { title: 'Print for an audit', body: 'Print the pack gives an A4 copy with every document, version and signature, ready to hand over.' },
    { title: 'Record breaks and changes', body: 'A break in learning, a new employer, withdrawal or completion goes in the programme history, with the last day of evidenced learning.' },
  ],
  notes: [
    { title: 'New versions, never overwrites', body: 'Filing again keeps the old document and marks it replaced. Every file keeps a fingerprint showing it has not been altered.' },
  ],
  source: 'Apprenticeship funding rules, August 2025 to July 2026, paragraphs 309 to 318 and the evidence requirements throughout.',
};

export default function LearnerEvidencePackPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { pack, loading, error, reload } = useLearnerPack(studentId);
  const { rows: requirements } = useCollegeRequirements(pack?.learner.college_id);
  const [target, setTarget] = useState<FileEvidenceTarget | null>(null);
  const [factsOpen, setFactsOpen] = useState(false);
  const [episodeOpen, setEpisodeOpen] = useState(false);
  const printing = params.get('print') === '1';

  useEffect(() => {
    if (!printing || !pack) return;
    const t = window.setTimeout(() => window.print(), 700);
    return () => window.clearTimeout(t);
  }, [printing, pack]);

  const grouped = useMemo(() => {
    const g: Record<string, PackItem[]> = { start: [], during: [], end: [], custom: [] };
    for (const it of pack?.items ?? []) g[it.custom ? 'custom' : it.group].push(it);
    return g;
  }, [pack]);

  const applicable = (pack?.items ?? []).filter((i) => isApplicable(i.status));
  const inPlace = applicable.filter((i) => i.status === 'ok').length;
  const open = (path: string) =>
    openEvidenceFile(path)
      .then((url) => window.open(url, '_blank', 'noopener'))
      .catch((e) => toast({ title: 'Could not open it', description: (e as Error).message, variant: 'destructive' }));

  const act = (it: PackItem) => {
    if (it.link === 'reviews') return navigate(`/college/reviews`);
    if (it.link === 'otj') return navigate(`/college/otj`);
    if (it.link === 'episodes') return setEpisodeOpen(true);
    if (it.field) return setFactsOpen(true);
    if (!it.kind) return;
    const req = it.requirement_id ? requirements.find((r) => r.id === it.requirement_id) : null;
    setTarget({
      kind: it.kind,
      title: it.title,
      requirementId: it.requirement_id ?? null,
      needsSignatureFrom: req?.needs_signature_from,
      employerLevel: !!it.employer_level,
      current: it.evidence?.[0] ?? null,
    });
  };

  if (printing && pack) return <PrintPack pack={pack} />;

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="Evidence pack"
        title={pack?.learner.name ?? 'Learner'}
        backTo="/college/evidence-pack"
        trailing={<PageHelpButton help={HELP} compact />}
      />
      <HubBody>
        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
          </div>
        ) : error || !pack ? (
          <p className="py-10 text-center text-[14px] text-white">Could not load the pack. {error}</p>
        ) : (
          <div className="space-y-5">
            <HowItWorks help={HELP} />
            <section className={cardCn}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] text-white">
                    {[pack.learner.course, pack.learner.cohort, pack.learner.employer].filter(Boolean).join(' · ')}
                  </p>
                  <p className="mt-1 text-[28px] font-semibold tabular-nums leading-none text-white">
                    {inPlace}
                    <span className="text-[16px] font-medium"> of {applicable.length} in place</span>
                  </p>
                </div>
                <span className="shrink-0 text-[12px] text-white">Live · {fmt(pack.generated_at)}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.1]">
                <div
                  className="h-full rounded-full bg-elec-yellow"
                  style={{ width: `${applicable.length ? Math.round((100 * inPlace) / applicable.length) : 0}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-2 text-[12.5px] text-white">
                {(['missing', 'attention', 'due', 'not_yet_due'] as const).map((s) =>
                  pack.counts[s] ? (
                    <span key={s} className={cn('rounded-full px-2.5 py-1 font-semibold', STATUS_PILL[s])}>
                      {pack.counts[s]} {STATUS_LABEL[s].toLowerCase()}
                    </span>
                  ) : null
                )}
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
                <button type="button" onClick={() => setFactsOpen(true)} className={neutral}>
                  Learner details
                </button>
                <button type="button" onClick={() => setEpisodeOpen(true)} className={neutral}>
                  Record a break or change
                </button>
                <button
                  type="button"
                  onClick={() => setTarget({ kind: 'other', title: 'Another document' })}
                  className={neutral}
                >
                  File another document
                </button>
                <button
                  type="button"
                  onClick={() => window.open(`/college/evidence-pack/${pack.learner.id}?print=1`, '_blank', 'noopener')}
                  className={neutral}
                >
                  Print the pack
                </button>
              </div>
            </section>

            {GROUPS.map((g) =>
              grouped[g.key].length ? (
                <section key={g.key}>
                  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{g.title}</h2>
                  <ul
                    className={cn(
                      '-mx-4 divide-y divide-white/[0.1] border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x',
                      'bg-gradient-to-b from-white/[0.08] to-white/[0.04]'
                    )}
                  >
                    {grouped[g.key].map((it) => (
                      <ItemRow key={it.key} item={it} onAct={() => act(it)} onOpenFile={open} />
                    ))}
                  </ul>
                </section>
              ) : null
            )}

            {pack.episodes.length > 0 && (
              <section className={cardCn}>
                <h2 className="text-[15px] font-semibold text-white">Programme history</h2>
                <ul className="divide-y divide-white/[0.1]">
                  {pack.episodes.map((e) => (
                    <li key={e.id} className="py-2.5 text-[14px] text-white">
                      <span className="font-semibold">{fmt(e.effective_date)}</span> · {EPISODE_LABEL[e.kind]}
                      {e.last_evidenced_learning_date ? ` · last learning ${fmt(e.last_evidenced_learning_date)}` : ''}
                      {e.reason ? ` · ${e.reason}` : ''}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <History rows={pack.history} onOpenFile={open} />

            <p className="text-[12px] leading-relaxed text-white">
              Built from the record each time it opens: apprenticeship funding rules 2025/26, paragraphs 309 to 318 and
              the evidence requirements throughout, plus your college’s own requirements. Documents are never
              overwritten; a new version replaces the old one and both are kept.
            </p>
          </div>
        )}
      </HubBody>

      {pack && (
        <>
          <FileEvidenceSheet
            open={!!target}
            onOpenChange={(o) => !o && setTarget(null)}
            target={target}
            collegeId={pack.learner.college_id}
            studentId={pack.learner.id}
            employerId={pack.learner.employer_id}
            learnerName={pack.learner.name}
            onFiled={() => void reload()}
          />
          <LearnerFactsSheet open={factsOpen} onOpenChange={setFactsOpen} pack={pack} onSaved={() => void reload()} />
          <EpisodeSheet open={episodeOpen} onOpenChange={setEpisodeOpen} pack={pack} onSaved={() => void reload()} />
        </>
      )}
    </HubPage>
  );
}

const neutral =
  'inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.10]';

function ItemRow({
  item,
  onAct,
  onOpenFile,
}: {
  item: PackItem;
  onAct: () => void;
  onOpenFile: (path: string) => void;
}) {
  const ev = item.evidence ?? [];
  const actionLabel =
    item.link === 'reviews'
      ? 'Open reviews'
      : item.link === 'otj'
        ? 'Open hours'
        : item.link === 'episodes'
          ? 'Record'
          : item.field
            ? 'Edit details'
            : ev.length
              ? 'New version'
              : 'File';
  const quiet = item.status === 'not_yet_due' || item.status === 'not_applicable';
  return (
    <li className="px-4 py-4 sm:px-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold leading-snug text-white">{item.title}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-white">{item.detail}</p>
          <p className="mt-1 text-[11.5px] text-white">{item.custom ? 'College requirement' : `Funding rules ${item.para}`}</p>
        </div>
        <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold', STATUS_PILL[item.status])}>
          {STATUS_LABEL[item.status]}
        </span>
      </div>

      {item.months && item.months.length > 0 && (
        <div className="mt-3 flex items-end gap-1" aria-label="Training each month">
          {item.months.map((m) => (
            <div key={m.month} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div
                className={cn('w-full rounded-sm', m.minutes > 0 ? 'bg-elec-yellow' : 'bg-red-500')}
                style={{ height: `${m.minutes > 0 ? Math.max(6, Math.min(36, Math.round(m.minutes / 60) * 2)) : 4}px` }}
                title={`${m.month}: ${Math.round(m.minutes / 60)}h`}
              />
              <span className="text-[9.5px] text-white">
                {new Date(`${m.month}T12:00:00`).toLocaleDateString('en-GB', { month: 'narrow' })}
              </span>
            </div>
          ))}
        </div>
      )}

      {ev.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {ev.map((e) => (
            <li key={e.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.12] px-3 py-2">
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-semibold text-white">
                  {e.title || KIND_LABEL[e.kind]} · v{e.version}
                </span>
                <span className="block truncate text-[12px] text-white">
                  {[
                    e.document_date && `dated ${fmt(e.document_date)}`,
                    e.signatures?.length ? `signed by ${e.signatures.map((s) => s.name).join(', ')}` : 'no signatures recorded',
                    e.uploaded_by_name && `filed by ${e.uploaded_by_name}`,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              </span>
              {e.file_path && (
                <button
                  type="button"
                  onClick={() => onOpenFile(e.file_path as string)}
                  className="h-11 shrink-0 rounded-lg px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  Open
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {!quiet && (item.kind || item.link || item.field) && (
        <button
          type="button"
          onClick={onAct}
          className={cn(
            'mt-3 inline-flex h-11 items-center gap-1.5 rounded-xl px-4 text-[13px] font-semibold touch-manipulation',
            item.status === 'ok' ? 'border border-white/[0.14] text-white' : 'bg-elec-yellow text-black'
          )}
        >
          {actionLabel}
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </li>
  );
}

function History({ rows, onOpenFile }: { rows: EvidenceRow[]; onOpenFile: (path: string) => void }) {
  const [open, setOpen] = useState(false);
  if (rows.length === 0) return null;
  return (
    <section className={cardCn}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 w-full items-center justify-between text-left touch-manipulation"
      >
        <h2 className="text-[15px] font-semibold text-white">Every document filed ({rows.length})</h2>
        <span className="text-[13px] font-semibold text-elec-yellow">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && (
        <ul className="divide-y divide-white/[0.1]">
          {rows.map((e) => (
            <li key={e.id} className="flex items-center justify-between gap-3 py-2.5">
              <span className="min-w-0">
                <span className="block truncate text-[13.5px] font-semibold text-white">
                  {e.title || KIND_LABEL[e.kind]} · v{e.version}
                </span>
                <span className="block truncate text-[12px] text-white">
                  Filed {fmt(e.created_at)}
                  {e.uploaded_by_name ? ` by ${e.uploaded_by_name}` : ''}
                  {e.superseded_at ? ` · replaced ${fmt(e.superseded_at)}` : ' · current'}
                  {e.file_hash ? ` · SHA-256 ${e.file_hash.slice(0, 10)}…` : ''}
                </span>
              </span>
              {e.file_path && (
                <button
                  type="button"
                  onClick={() => onOpenFile(e.file_path as string)}
                  className="h-11 shrink-0 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  Open
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function LearnerFactsSheet({
  open,
  onOpenChange,
  pack,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  pack: LearnerPack;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const l = pack.learner;
  const [f, setF] = useState({ uln: '', ni: '', dob: '', hours: '', model: '', start: '', end: '' });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!open) return;
    setF({
      uln: l.uln ?? '',
      ni: l.ni_number ?? '',
      dob: l.date_of_birth ?? '',
      hours: l.weekly_contracted_hours != null ? String(l.weekly_contracted_hours) : '',
      model: l.delivery_model ?? '',
      start: l.start_date ?? '',
      end: l.expected_end_date ?? '',
    });
  }, [open, l]);
  const niOk = !f.ni || /^[A-CEGHJ-PR-TW-Z]{2}\d{6}[A-D]$/i.test(f.ni.replace(/\s/g, ''));
  const ulnOk = !f.uln || /^\d{10}$/.test(f.uln.trim());

  const save = async () => {
    if (!niOk || !ulnOk || saving) return;
    setSaving(true);
    try {
      await updateLearnerFacts(l.id, {
        uln: f.uln.trim() || null,
        ni_number: f.ni.replace(/\s/g, '').toUpperCase() || null,
        date_of_birth: f.dob || null,
        weekly_contracted_hours: f.hours ? Number(f.hours) : null,
        delivery_model: f.model || null,
        start_date: f.start || null,
        expected_end_date: f.end || null,
      });
      toast({ title: 'Saved' });
      onSaved();
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Not saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormSheet
      width="wide"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Learner details"
      title={l.name}
      description="The facts the funding rules ask you to hold accurately (paras 309 and 315). They must match the ILR."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button type="button" onClick={save} disabled={!niOk || !ulnOk || saving} className={buttonPrimaryCn}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      }
    >
      <div className={cn(grid2Cn, 'lg:grid-cols-4')}>
        <div>
          <label className={labelCn} htmlFor="lf-uln">
            ULN
          </label>
          <input id="lf-uln" inputMode="numeric" value={f.uln} onChange={(e) => setF({ ...f, uln: e.target.value })} className={inputCn} />
          {!ulnOk && <p className="mt-1 text-[12px] text-orange-300">10 digits</p>}
        </div>
        <div>
          <label className={labelCn} htmlFor="lf-ni">
            National Insurance number
          </label>
          <input id="lf-ni" value={f.ni} onChange={(e) => setF({ ...f, ni: e.target.value })} className={inputCn} autoCapitalize="characters" />
          {!niOk && <p className="mt-1 text-[12px] text-orange-300">For example QQ123456C</p>}
        </div>
        <div>
          <label className={labelCn} htmlFor="lf-dob">
            Date of birth
          </label>
          <input id="lf-dob" type="date" value={f.dob} onChange={(e) => setF({ ...f, dob: e.target.value })} className={inputCn} />
        </div>
        <div>
          <label className={labelCn} htmlFor="lf-hours">
            Contracted hours a week
          </label>
          <input id="lf-hours" inputMode="decimal" value={f.hours} onChange={(e) => setF({ ...f, hours: e.target.value })} className={inputCn} />
        </div>
        <div>
          <label className={labelCn} htmlFor="lf-start">
            Start date
          </label>
          <input id="lf-start" type="date" value={f.start} onChange={(e) => setF({ ...f, start: e.target.value })} className={inputCn} />
        </div>
        <div>
          <label className={labelCn} htmlFor="lf-end">
            Planned end date
          </label>
          <input id="lf-end" type="date" value={f.end} onChange={(e) => setF({ ...f, end: e.target.value })} className={inputCn} />
        </div>
        <div className={fieldFullCn}>
          <p className={labelCn}>How training is delivered</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              ['day_release', 'Day release'],
              ['block_release', 'Block release'],
              ['front_loaded', 'Front-loaded'],
            ].map(([v, label]) => (
              <button
                key={v}
                type="button"
                aria-pressed={f.model === v}
                onClick={() => setF({ ...f, model: f.model === v ? '' : v })}
                className={cn(chipBase, 'px-2 text-[13px]', f.model === v ? chipOn : chipOff)}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-white">
            Block release and front-loaded programmes need training at least every 3 months; others every month
            (paras 88 and 89).
          </p>
        </div>
      </div>
    </FormSheet>
  );
}

function EpisodeSheet({
  open,
  onOpenChange,
  pack,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  pack: LearnerPack;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [kind, setKind] = useState<LearnerPack['episodes'][number]['kind']>('break');
  const [date, setDate] = useState('');
  const [last, setLast] = useState('');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (open) {
      setKind('break');
      setDate('');
      setLast('');
      setReason('');
    }
  }, [open]);
  const needsLast = kind === 'break' || kind === 'withdrawal' || kind === 'completion';
  const valid = !!date && (!needsLast || !!last) && reason.trim().length >= 3;

  const save = async () => {
    if (!valid || saving) return;
    setSaving(true);
    try {
      await addEpisode({
        collegeId: pack.learner.college_id,
        studentId: pack.learner.id,
        kind,
        effectiveDate: date,
        lastEvidencedLearningDate: last || null,
        reason: reason.trim(),
      });
      toast({ title: 'Recorded' });
      onSaved();
      onOpenChange(false);
    } catch (e) {
      toast({ title: 'Not recorded', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormSheet
      width="wide"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Programme history"
      title="Record a break or change"
      description="The end date of a break, withdrawal or completion is the last day of evidenced learning (paras 270 and 277.1). After a break, file a revised agreement and training plan."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button type="button" onClick={save} disabled={!valid || saving} className={buttonPrimaryCn}>
            {saving ? 'Saving…' : 'Record'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {(Object.keys(EPISODE_LABEL) as Array<keyof typeof EPISODE_LABEL>)
          .filter((k) => k !== 'start')
          .map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={cn(chipBase, 'px-2 text-[13px]', kind === k ? chipOn : chipOff)}
            >
              {EPISODE_LABEL[k]}
            </button>
          ))}
      </div>
      <div className={cn(grid2Cn, 'lg:grid-cols-4')}>
        <div>
          <label className={labelCn} htmlFor="ep-date">
            Date
          </label>
          <input id="ep-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCn} />
        </div>
        {needsLast && (
          <div>
            <label className={labelCn} htmlFor="ep-last">
              Last day of evidenced learning
            </label>
            <input id="ep-last" type="date" value={last} onChange={(e) => setLast(e.target.value)} className={inputCn} />
          </div>
        )}
      </div>
      <div>
        <label className={labelCn} htmlFor="ep-reason">
          Reason
        </label>
        <textarea id="ep-reason" rows={2} value={reason} onChange={(e) => setReason(e.target.value)} className={textareaCn} />
      </div>
    </FormSheet>
  );
}

/* ── The A4 pack for an auditor or inspector ───────────────────────────── */

function PrintPack({ pack }: { pack: LearnerPack }) {
  const l = pack.learner;
  const groups: Array<[string, PackItem[]]> = [
    ['At the start', pack.items.filter((i) => !i.custom && i.group === 'start')],
    ['During the apprenticeship', pack.items.filter((i) => !i.custom && i.group === 'during')],
    ['At gateway and the end', pack.items.filter((i) => !i.custom && i.group === 'end')],
    ['College requirements', pack.items.filter((i) => i.custom)],
  ];
  return (
    <div className="min-h-screen bg-white p-10 text-black print:p-0">
      <style>{'@page { size: A4; margin: 14mm; } body { background: #fff; }'}</style>
      <header className="border-b-2 border-black pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">Apprenticeship evidence pack</p>
        <h1 className="mt-1 text-[26px] font-bold leading-tight">{l.name}</h1>
        <p className="mt-1 text-[12px]">
          {[l.course, l.cohort, l.employer && `Employer: ${l.employer}`, l.uln && `ULN ${l.uln}`].filter(Boolean).join(' · ')}
        </p>
        <p className="mt-1 text-[12px]">
          {l.start_date ? `Started ${fmt(l.start_date)}` : 'No start date'}
          {l.expected_end_date ? ` · planned end ${fmt(l.expected_end_date)}` : ''} · generated {fmt(pack.generated_at)} from the
          live record
        </p>
      </header>
      {groups.map(([title, items]) =>
        items.length ? (
          <section key={title} className="mt-6" style={{ breakInside: 'avoid' }}>
            <h2 className="text-[14px] font-bold uppercase tracking-[0.12em]">{title}</h2>
            <table className="mt-2 w-full border-collapse text-left text-[11px]">
              <thead>
                <tr className="border-b border-black">
                  <th className="py-1.5 pr-2">Item</th>
                  <th className="py-1.5 pr-2">Status</th>
                  <th className="py-1.5 pr-2">Detail and documents</th>
                  <th className="py-1.5">Para</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.key} className="border-b border-gray-300 align-top">
                    <td className="py-1.5 pr-2 font-semibold">{it.title}</td>
                    <td className="py-1.5 pr-2">{STATUS_LABEL[it.status]}</td>
                    <td className="py-1.5 pr-2">
                      {it.detail}
                      {(it.evidence ?? []).map((e) => (
                        <div key={e.id} className="mt-0.5">
                          {e.title || KIND_LABEL[e.kind]} v{e.version}
                          {e.document_date ? `, dated ${fmt(e.document_date)}` : ''}
                          {e.signatures?.length ? `, signed by ${e.signatures.map((s) => `${s.name} (${s.role})`).join(', ')}` : ''}
                          {e.file_hash ? `, SHA-256 ${e.file_hash.slice(0, 16)}` : ''}
                        </div>
                      ))}
                    </td>
                    <td className="py-1.5">{it.custom ? 'College' : it.para}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null
      )}
      {pack.history.length > 0 && (
        <section className="mt-6" style={{ breakInside: 'avoid' }}>
          <h2 className="text-[14px] font-bold uppercase tracking-[0.12em]">Document history</h2>
          <ul className="mt-2 text-[11px]">
            {pack.history.map((e) => (
              <li key={e.id}>
                {e.title || KIND_LABEL[e.kind]} v{e.version} · filed {fmt(e.created_at)}
                {e.uploaded_by_name ? ` by ${e.uploaded_by_name}` : ''}
                {e.superseded_at ? ` · replaced ${fmt(e.superseded_at)}` : ' · current'}
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="mt-8 border-t border-gray-300 pt-3 text-[10px]">
        Generated by Elec-Mate from the live record against the Apprenticeship funding rules August 2025 to July 2026
        (paras 309–318 and the evidence requirements throughout), plus the college’s own requirements. Documents are held
        unaltered; each file’s SHA-256 fingerprint is shown so a copy can be checked against the original.
      </p>
    </div>
  );
}
