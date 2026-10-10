/**
 * SectionStartingPoint — ELE-1977, 8 Oct 2026.
 *
 * The learner's starting point on their college record, as Ofsted and the
 * apprenticeship funding rules expect it:
 *   - Initial assessment: starting levels in English, maths and digital, prior
 *     qualifications and experience (college_learner_starting_points).
 *   - English and maths towards the level 2 requirement
 *     (college_functional_skills). get_gateway_readiness reads this, so a pass
 *     or exemption recorded here turns the gateway's English and maths lines
 *     green. Nothing in the app wrote it before.
 *   - Recognition of prior learning: a decision that REDUCES the planned
 *     off-the-job hours (record_rpl_decision sets otj_required_hours from the
 *     course target), with who decided, when and why.
 * Support needs and adjustments live in "Support needs" beside this.
 */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import {
  chipCn,
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeHeading,
} from '@/components/college/ui/CollegeUi';
import {
  useFunctionalSkills,
  type FsLevel,
  type FsRecord,
  type FsStatus,
  type FsSubject,
} from '@/hooks/useFunctionalSkills';
import { useToast } from '@/hooks/use-toast';
import { KsbScanSheet, RplPriceSheet } from '@/components/college/student360/RplScanAndPrice';
import { cn } from '@/lib/utils';

const CARD = '-mx-4 card-surface max-sm:!rounded-none max-sm:!border-x-0 p-5 sm:mx-0';

interface StartingPoint {
  student_id: string;
  assessed_on: string | null;
  english_level: string | null;
  maths_level: string | null;
  digital_level: string | null;
  prior_learning: string | null;
  assessment_notes: string | null;
  rpl_decision: 'not_decided' | 'none' | 'reduced';
  rpl_hours_reduced: number;
  rpl_base_hours: number | null;
  rpl_reason: string | null;
  rpl_decided_at: string | null;
  // ELE-2042
  ksb_scan: Array<{ level: string }> | null;
  ksb_scan_on: string | null;
  funding_band_max: number | null;
  rpl_percent: number | null;
  max_price: number | null;
  agreed_price: number | null;
}

const LEVELS = ['Entry 1', 'Entry 2', 'Entry 3', 'Level 1', 'Level 2', 'Level 3 or above'];
const FS_LEVELS: Array<{ v: FsLevel; label: string }> = [
  { v: 'entry_3', label: 'Entry 3' },
  { v: 'level_1', label: 'Level 1' },
  { v: 'level_2', label: 'Level 2' },
];
const FS_STATUS: Array<{ v: FsStatus; label: string }> = [
  { v: 'not_started', label: 'Not started' },
  { v: 'in_progress', label: 'Working towards it' },
  { v: 'pending_results', label: 'Sat, waiting for results' },
  { v: 'passed', label: 'Passed' },
  { v: 'resit', label: 'Resitting' },
  { v: 'failed', label: 'Not passed' },
  { v: 'exempt', label: 'Exempt (already holds it)' },
];
const statusLabel = (s: FsStatus | undefined) =>
  FS_STATUS.find((x) => x.v === s)?.label ?? 'Nothing recorded';
const tone = (s: FsStatus | undefined) =>
  s === 'passed' || s === 'exempt'
    ? 'border-emerald-400/40 text-emerald-300'
    : s === 'in_progress' || s === 'pending_results' || s === 'resit'
      ? 'border-white/[0.2] text-white'
      : 'border-orange-500/40 text-orange-300';
const fmtDate = (d: string | null) =>
  d
    ? new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

export function SectionStartingPoint({
  studentId,
  studentName,
}: {
  studentId: string;
  studentName: string;
}) {
  const first = studentName.split(' ')[0] || 'the learner';
  const { toast } = useToast();
  const fs = useFunctionalSkills(studentId);
  const [sp, setSp] = useState<StartingPoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [sheet, setSheet] = useState<null | 'ia' | 'rpl' | 'scan' | 'price' | FsSubject>(null);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from('college_learner_starting_points' as never)
      .select('*')
      .eq('student_id', studentId)
      .maybeSingle();
    setSp((data as unknown as StartingPoint | null) ?? null);
    setLoading(false);
  }, [studentId]);
  useEffect(() => {
    void load();
  }, [load]);

  const fsOf = (s: FsSubject) => fs.records.find((r) => r.subject === s);

  return (
    <section id="starting-point" className="scroll-mt-20 space-y-3">
      <div>
        <CollegeHeading>Starting point</CollegeHeading>
        <p className="mt-1 text-[13px] leading-relaxed text-white">
          Where {first} started, English and maths towards level 2, and any prior learning that
          reduces their hours.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {/* Initial assessment */}
        <div className={CARD}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-white">Initial assessment</h3>
            <button
              type="button"
              className={cn(COLLEGE_BTN, 'h-11 shrink-0 px-3 text-[12.5px]')}
              onClick={() => setSheet('ia')}
            >
              {sp?.assessed_on ? 'Edit' : 'Record'}
            </button>
          </div>
          {loading ? (
            <div className="mt-3 h-16 animate-pulse rounded-xl bg-white/[0.06]" />
          ) : sp?.assessed_on ? (
            <dl className="mt-3 space-y-1.5 text-[13px] text-white">
              <div className="flex justify-between gap-3">
                <dt>Assessed</dt>
                <dd className="font-semibold">{fmtDate(sp.assessed_on)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>English</dt>
                <dd className="font-semibold">{sp.english_level ?? 'Not recorded'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Maths</dt>
                <dd className="font-semibold">{sp.maths_level ?? 'Not recorded'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt>Digital</dt>
                <dd className="font-semibold">{sp.digital_level ?? 'Not recorded'}</dd>
              </div>
              {sp.prior_learning && (
                <p className="pt-1.5 leading-snug">Prior learning: {sp.prior_learning}</p>
              )}
            </dl>
          ) : (
            <p className="mt-3 text-[13px] leading-relaxed text-orange-300">
              Not recorded. Ofsted expects each learner&apos;s starting point on file.
            </p>
          )}
        </div>

        {/* English and maths */}
        <div className={CARD}>
          <h3 className="text-[15px] font-semibold text-white">English and maths</h3>
          <p className="mt-1 text-[12.5px] text-white">
            The level 2 requirement. A pass or exemption clears these gateway lines.
          </p>
          <ul className="mt-3 space-y-2">
            {(['english', 'maths'] as FsSubject[]).map((s) => {
              const r = fsOf(s);
              return (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => setSheet(s)}
                    className="flex min-h-[56px] w-full items-center gap-3 rounded-xl border border-white/[0.08] px-3 py-2 text-left touch-manipulation hover:border-white/[0.16]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-semibold capitalize text-white">
                        {s}
                      </span>
                      <span className="block text-[12px] text-white">
                        {[
                          r?.level ? FS_LEVELS.find((l) => l.v === r.level)?.label : null,
                          r?.exam_date ? `exam ${fmtDate(r.exam_date)}` : null,
                        ]
                          .filter(Boolean)
                          .join(' · ') || 'Tap to record'}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'shrink-0 rounded-full border px-2 py-0.5 text-[12px] font-semibold',
                        tone(r?.status)
                      )}
                    >
                      {statusLabel(r?.status)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Prior learning */}
        <div className={CARD}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[15px] font-semibold text-white">Prior learning</h3>
            <button
              type="button"
              className={cn(COLLEGE_BTN, 'h-11 shrink-0 px-3 text-[12.5px]')}
              onClick={() => setSheet('rpl')}
            >
              {sp?.rpl_decision && sp.rpl_decision !== 'not_decided' ? 'Change' : 'Decide'}
            </button>
          </div>
          {loading ? (
            <div className="mt-3 h-16 animate-pulse rounded-xl bg-white/[0.06]" />
          ) : sp?.rpl_decision === 'reduced' ? (
            <div className="mt-3 text-[13px] text-white">
              <p className="font-semibold">
                Hours reduced by {Math.round(sp.rpl_hours_reduced)}:{' '}
                {Math.round(sp.rpl_base_hours ?? 0)}h to{' '}
                {Math.round((sp.rpl_base_hours ?? 0) - sp.rpl_hours_reduced)}h
              </p>
              {sp.rpl_reason && <p className="mt-1 leading-snug">{sp.rpl_reason}</p>}
              <p className="mt-1">Decided {fmtDate(sp.rpl_decided_at)}</p>
            </div>
          ) : sp?.rpl_decision === 'none' ? (
            <p className="mt-3 text-[13px] text-white">
              No reduction. Recorded {fmtDate(sp.rpl_decided_at)}.
            </p>
          ) : (
            <p className="mt-3 text-[13px] leading-relaxed text-orange-300">
              No decision yet. Record one, even if it is &quot;no reduction&quot;.
            </p>
          )}
          {/* ELE-2042: skills scan and price reduction */}
          {!loading && (
            <div
              className="mt-3 space-y-2 border-t border-white/[0.1] pt-3 text-[13px] text-white"
              data-testid="rpl-scan-price"
            >
              <p>
                {sp?.ksb_scan?.length
                  ? `Skills scan ${fmtDate(sp.ksb_scan_on)}: ${sp.ksb_scan.filter((r) => r.level !== 'none').length} of ${sp.ksb_scan.length} with prior learning.`
                  : 'No skills scan against the knowledge, skills and behaviours yet.'}
              </p>
              {sp?.rpl_decision === 'reduced' && (
                <p className={sp.agreed_price == null ? 'text-orange-300' : undefined}>
                  {sp.agreed_price != null
                    ? `Price £${Number(sp.agreed_price).toLocaleString('en-GB')} (most allowed £${Number(sp.max_price ?? 0).toLocaleString('en-GB')}, ${sp.rpl_percent ?? 0}% prior learning).`
                    : 'Price reduction not recorded yet.'}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={cn(COLLEGE_BTN, 'h-11 px-3 text-[12.5px]')}
                  onClick={() => setSheet('scan')}
                  data-testid="rpl-open-scan"
                >
                  {sp?.ksb_scan?.length ? 'Edit skills scan' : 'Skills scan'}
                </button>
                {sp?.rpl_decision === 'reduced' && (
                  <button
                    type="button"
                    className={cn(COLLEGE_BTN, 'h-11 px-3 text-[12.5px]')}
                    onClick={() => setSheet('price')}
                    data-testid="rpl-open-price"
                  >
                    Price reduction
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <InitialAssessmentSheet
        open={sheet === 'ia'}
        onOpenChange={(o) => !o && setSheet(null)}
        studentId={studentId}
        first={first}
        sp={sp}
        onSaved={() => {
          setSheet(null);
          void load();
          toast({ title: 'Initial assessment saved' });
        }}
      />
      <RplSheet
        open={sheet === 'rpl'}
        onOpenChange={(o) => !o && setSheet(null)}
        studentId={studentId}
        first={first}
        sp={sp}
        onSaved={(msg) => {
          setSheet(null);
          void load();
          toast({ title: 'Prior learning decision saved', description: msg });
        }}
      />
      <KsbScanSheet
        open={sheet === 'scan'}
        onOpenChange={(o) => !o && setSheet(null)}
        studentId={studentId}
        first={first}
        onSaved={(msg) => {
          setSheet(null);
          void load();
          toast({ title: 'Skills scan saved', description: msg });
        }}
      />
      <RplPriceSheet
        open={sheet === 'price'}
        onOpenChange={(o) => !o && setSheet(null)}
        studentId={studentId}
        first={first}
        hoursReduced={sp?.rpl_hours_reduced ?? 0}
        baseHours={sp?.rpl_base_hours ?? null}
        current={{
          funding_band_max: sp?.funding_band_max ?? null,
          agreed_price: sp?.agreed_price ?? null,
        }}
        onSaved={(msg) => {
          setSheet(null);
          void load();
          toast({ title: 'Price reduction recorded', description: msg });
        }}
      />
      {(sheet === 'english' || sheet === 'maths') && (
        <FsSheet
          subject={sheet}
          first={first}
          record={fsOf(sheet)}
          onClose={() => setSheet(null)}
          onSave={async (patch) => {
            await fs.upsert(sheet, patch);
            setSheet(null);
            toast({ title: `${sheet === 'english' ? 'English' : 'Maths'} saved` });
          }}
        />
      )}
    </section>
  );
}

function LevelChips({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
      {LEVELS.map((l) => (
        <button
          key={l}
          type="button"
          className={cn(chipCn(value === l), 'shrink-0')}
          onClick={() => onChange(value === l ? '' : l)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function InitialAssessmentSheet({
  open,
  onOpenChange,
  studentId,
  first,
  sp,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  studentId: string;
  first: string;
  sp: StartingPoint | null;
  onSaved: () => void;
}) {
  const [date, setDate] = useState('');
  const [en, setEn] = useState('');
  const [ma, setMa] = useState('');
  const [di, setDi] = useState('');
  const [prior, setPrior] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    if (!open) return;
    setDate(sp?.assessed_on ?? new Date().toISOString().slice(0, 10));
    setEn(sp?.english_level ?? '');
    setMa(sp?.maths_level ?? '');
    setDi(sp?.digital_level ?? '');
    setPrior(sp?.prior_learning ?? '');
    setNotes(sp?.assessment_notes ?? '');
    setErr(null);
  }, [open, sp]);

  const save = async () => {
    setBusy(true);
    setErr(null);
    const { error } = await supabase.rpc(
      'upsert_learner_starting_point' as never,
      {
        p_student: studentId,
        p_assessed_on: date || null,
        p_english_level: en,
        p_maths_level: ma,
        p_digital_level: di,
        p_prior_learning: prior,
        p_notes: notes,
      } as never
    );
    setBusy(false);
    if (error) setErr(error.message);
    else onSaved();
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Starting point"
      title={`${first}'s initial assessment`}
      description="Their starting levels and what they already know. This is what progress is measured from."
      footer={
        <div className="flex justify-end gap-2">
          <button type="button" className={COLLEGE_BTN} onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button
            type="button"
            className={COLLEGE_BTN_PRIMARY}
            disabled={busy || !date}
            onClick={() => void save()}
          >
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <span className={labelCn}>Date assessed</span>
            <input
              type="date"
              className={inputCn}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <div>
            <span className={labelCn}>English</span>
            <LevelChips value={en} onChange={setEn} />
          </div>
          <div>
            <span className={labelCn}>Maths</span>
            <LevelChips value={ma} onChange={setMa} />
          </div>
          <div>
            <span className={labelCn}>Digital</span>
            <LevelChips value={di} onChange={setDi} />
          </div>
        </div>
        <div className="space-y-5">
          <label className="block">
            <span className={labelCn}>Prior qualifications and experience</span>
            <textarea
              className={cn(textareaCn, 'min-h-[110px]')}
              value={prior}
              onChange={(e) => setPrior(e.target.value)}
              placeholder="e.g. Level 2 Diploma (2365-02), two years as an electrician's mate"
            />
          </label>
          <label className="block">
            <span className={labelCn}>Notes</span>
            <textarea
              className={cn(textareaCn, 'min-h-[90px]')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          {err && <p className="text-[12.5px] font-medium text-orange-300">{err}</p>}
        </div>
      </div>
    </FormSheet>
  );
}

function RplSheet({
  open,
  onOpenChange,
  studentId,
  first,
  sp,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  studentId: string;
  first: string;
  sp: StartingPoint | null;
  onSaved: (msg: string) => void;
}) {
  const [hours, setHours] = useState('0');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    if (!open) return;
    setHours(String(Math.round(sp?.rpl_hours_reduced ?? 0)));
    setReason(sp?.rpl_reason ?? '');
    setErr(null);
  }, [open, sp]);
  const n = Math.max(0, Number(hours) || 0);
  const base = sp?.rpl_base_hours ?? null;

  const save = async () => {
    setBusy(true);
    setErr(null);
    const { data, error } = await supabase.rpc(
      'record_rpl_decision' as never,
      {
        p_student: studentId,
        p_hours_reduced: n,
        p_reason: reason,
      } as never
    );
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    const r = data as unknown as { base_hours: number; required_hours: number };
    onSaved(
      n > 0
        ? `Off-the-job target is now ${Math.round(r.required_hours)} hours (from ${Math.round(r.base_hours)}).`
        : `No reduction. Target stays at ${Math.round(r.base_hours)} hours.`
    );
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Starting point"
      title={`Prior learning for ${first}`}
      description="If what they already know or can do covers part of the programme, reduce their off-the-job hours. Record the decision either way. A reduction needs a skills scan first, and cannot leave fewer than 187 hours or a practical period under the minimum."
      footer={
        <div className="flex justify-end gap-2">
          <button type="button" className={COLLEGE_BTN} onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button
            type="button"
            className={COLLEGE_BTN_PRIMARY}
            disabled={busy || (n > 0 && !reason.trim())}
            onClick={() => void save()}
          >
            {busy ? 'Saving…' : n > 0 ? `Reduce by ${n} hours` : 'Record no reduction'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <label className="block">
            <span className={labelCn}>Hours to take off the off-the-job target</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              className={inputCn}
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </label>
          {base != null && n > 0 && base - n < 187 && (
            <p
              className="text-[13px] font-medium leading-relaxed text-orange-300"
              data-testid="rpl-floor-warning"
            >
              That leaves {Math.max(0, Math.round(base - n))} hours. No programme may fall below 187
              hours of evidenced delivery, so the most you can take off is{' '}
              {Math.max(0, Math.floor(base - 187))} hours.
            </p>
          )}
          <p className="text-[13px] leading-relaxed text-white">
            {base
              ? `Target before prior learning: ${Math.round(base)} hours. After this: ${Math.max(0, Math.round(base - n))} hours.`
              : 'The new target is worked out from the course target when you save.'}{' '}
            0 records that you checked and there is no reduction.
          </p>
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className={labelCn}>What prior learning justifies it{n > 0 ? ' *' : ''}</span>
            <textarea
              className={cn(textareaCn, 'min-h-[130px]')}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Holds Level 2 Diploma 2365-02; units 201 to 204 already achieved"
            />
          </label>
          {err && <p className="text-[12.5px] font-medium text-orange-300">{err}</p>}
        </div>
      </div>
    </FormSheet>
  );
}

function FsSheet({
  subject,
  first,
  record,
  onClose,
  onSave,
}: {
  subject: FsSubject;
  first: string;
  record: FsRecord | undefined;
  onClose: () => void;
  onSave: (patch: Partial<FsRecord>) => Promise<void>;
}) {
  const [status, setStatus] = useState<FsStatus>(record?.status ?? 'not_started');
  const [level, setLevel] = useState<FsLevel | null>(record?.level ?? 'level_2');
  const [exam, setExam] = useState(record?.exam_date ?? '');
  const [why, setWhy] = useState(record?.exemption_reason ?? '');
  const [notes, setNotes] = useState(record?.notes ?? '');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const label = subject === 'english' ? 'English' : 'Maths';

  const save = async () => {
    if (status === 'exempt' && !why.trim()) {
      setErr('Say why they are exempt, e.g. GCSE grade 4 or above.');
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      await onSave({
        status,
        level,
        exam_date: exam || null,
        exemption_reason: status === 'exempt' ? why.trim() : null,
        notes: notes.trim() || null,
      });
    } catch (e) {
      setErr((e as Error).message);
      setBusy(false);
    }
  };

  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      width="wide"
      eyebrow="English and maths"
      title={`${first}'s ${label === 'English' ? 'English' : 'maths'}`}
      description="Where they are towards the level 2 requirement. Passed or exempt clears this line on the EPA gateway."
      footer={
        <div className="flex justify-end gap-2">
          <button type="button" className={COLLEGE_BTN} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={COLLEGE_BTN_PRIMARY}
            disabled={busy}
            onClick={() => void save()}
          >
            {busy ? 'Saving…' : 'Save'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <span className={labelCn}>Where they are</span>
            <div className="flex flex-wrap gap-2">
              {FS_STATUS.map((s) => (
                <button
                  key={s.v}
                  type="button"
                  className={chipCn(status === s.v)}
                  onClick={() => setStatus(s.v)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className={labelCn}>Level</span>
            <div className="flex flex-wrap gap-2">
              {FS_LEVELS.map((l) => (
                <button
                  key={l.v}
                  type="button"
                  className={chipCn(level === l.v)}
                  onClick={() => setLevel(l.v)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-5">
          {status === 'exempt' && (
            <label className="block">
              <span className={labelCn}>Why they are exempt *</span>
              <input
                className={inputCn}
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                placeholder="e.g. GCSE grade 4 or above"
              />
            </label>
          )}
          {status !== 'exempt' && (
            <label className="block">
              <span className={labelCn}>Exam date (if booked or sat)</span>
              <input
                type="date"
                className={inputCn}
                value={exam ?? ''}
                onChange={(e) => setExam(e.target.value)}
              />
            </label>
          )}
          <label className="block">
            <span className={labelCn}>Notes</span>
            <textarea
              className={cn(textareaCn, 'min-h-[90px]')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          {err && <p className="text-[12.5px] font-medium text-orange-300">{err}</p>}
        </div>
      </div>
    </FormSheet>
  );
}
