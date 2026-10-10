import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, selectTriggerCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';

/* ==========================================================================
   Apprenticeship units (ELE-2053, 10 Oct 2026). STRUCTURE ONLY.

   A unit programme is a course marked as an Apprenticeship Unit (ILR
   programme type 34, new in 2026/27): short, with planned hours, the unit's
   criteria set (the course's qualification) and a LARS learning aim
   reference the college supplies. Progress reviews and gateway are switched
   off for its learners (server: get_review_board; profile: hidden). This page
   shows each programme, what it still needs, and each learner's criteria and
   hours, and records completion (end date + ILR CompStatus 2).

   No unit content is stored or invented here: a unit's criteria come from
   the awarding organisation's unit specification, loaded as a qualification.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-units',
  title: 'Apprenticeship units',
  what: 'Short Apprenticeship Units (ILR programme type 34) next to your full apprenticeships: their own criteria, planned hours and completion, without progress reviews or gateway.',
  steps: [
    {
      title: 'Set up a unit programme',
      body: 'Name it, pick its criteria set and enter the planned hours and the LARS learning aim reference from the unit specification.',
    },
    {
      title: 'Put learners on it',
      body: 'Add a cohort for the course as usual. Learners on it use the same portfolio and hours log.',
    },
    {
      title: 'Record completion',
      body: 'When every criterion is achieved, record the end date. The ILR export shows CompStatus 2 and programme type 34.',
    },
  ],
  notes: [
    {
      title: 'What is switched off',
      body: 'Progress reviews (and their inbox items and counts) and gateway and EPA readiness. Everything else stays: portfolio, assessment, IQA, hours, attendance.',
    },
    {
      title: 'What you supply',
      body: 'The unit criteria from your awarding organisation, the learning aim reference, the planned hours, and how your MIS records the outcome. Elec-Mate does not write unit content.',
    },
  ],
};

interface UnitLearner {
  student_id: string;
  name: string | null;
  cohort: string | null;
  status: string | null;
  start_date: string | null;
  planned_end_date: string | null;
  actual_end_date: string | null;
  criteria_total: number;
  criteria_achieved: number;
  criteria_submitted: number;
  criteria_referred: number;
  hours_verified: number;
  criteria_met: boolean;
  hours_met: boolean;
  completed: boolean;
}

interface Programme {
  course_id: string;
  name: string;
  code: string | null;
  qualification_id: string | null;
  qualification_code: string | null;
  qualification_title: string | null;
  criteria_count: number;
  planned_hours: number | null;
  aim_ref: string | null;
  duration_weeks: number | null;
  cohorts: number;
  missing: Array<'criteria_set' | 'criteria_content' | 'aim_ref' | 'planned_hours'>;
  learners: UnitLearner[];
}

interface Overview {
  programmes: Programme[];
  courses: Array<{ id: string; name: string; code: string | null; course_type: string | null }>;
}

const MISSING: Record<string, string> = {
  criteria_set: 'No criteria set chosen',
  criteria_content:
    'Its criteria set has no criteria loaded: send us the unit specification from the awarding organisation',
  aim_ref: 'No learning aim reference yet (from LARS, for the ILR)',
  planned_hours: 'No planned hours yet (from the unit specification)',
};

export default function CollegeUnitsPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { collegeId, can, loading: capsLoading } = useCollegeCan();
  const canManage = can('cohorts.manage');
  const canEdit = can('learners.edit');

  const [data, setData] = useState<Overview | null>(null);
  const [quals, setQuals] = useState<
    Array<{ id: string; code: string; title: string; ac_count: number | null }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [armed, setArmed] = useState<string | null>(null);

  // Sheet.
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'new' | 'convert'>('new');
  const [courseId, setCourseId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [qual, setQual] = useState('');
  const [hours, setHours] = useState('');
  const [weeks, setWeeks] = useState('');
  const [aim, setAim] = useState('');

  const load = useCallback(async () => {
    if (!collegeId) return;
    setLoading(true);
    const [o, q] = await Promise.all([
      supabase.rpc('college_unit_overview' as never, { p_college: collegeId } as never),
      supabase.from('qualifications').select('id, code, title, ac_count').order('title'),
    ]);
    if (o.error)
      toast({
        title: 'Could not load units',
        description: o.error.message,
        variant: 'destructive',
      });
    setData((o.data as unknown as Overview) ?? { programmes: [], courses: [] });
    setQuals(
      (q.data ?? []) as Array<{ id: string; code: string; title: string; ac_count: number | null }>
    );
    setLoading(false);
  }, [collegeId, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const programmes = data?.programmes ?? [];
  const learners = programmes.flatMap((p) => p.learners);
  const complete = learners.filter((l) => l.completed).length;
  const ready = learners.filter((l) => !l.completed && l.criteria_met).length;
  const otherCourses = useMemo(
    () => (data?.courses ?? []).filter((c) => c.course_type !== 'apprenticeship_unit'),
    [data]
  );

  const openSheet = (p: Programme | null) => {
    setMode(p ? 'convert' : 'new');
    setCourseId(p?.course_id ?? null);
    setName(p?.name ?? '');
    setCode(p?.code ?? '');
    setQual(p?.qualification_id ?? '');
    setHours(p?.planned_hours != null ? String(p.planned_hours) : '');
    setWeeks(p?.duration_weeks != null ? String(p.duration_weeks) : '');
    setAim(p?.aim_ref ?? '');
    setOpen(true);
  };

  const hoursN = hours ? Number(hours) : null;
  const weeksN = weeks ? Number(weeks) : null;
  const aimOk = !aim || /^[A-Za-z0-9]{1,8}$/.test(aim.trim());
  const hoursOk = hoursN === null || (hoursN >= 1 && hoursN <= 1000);
  const canSave =
    aimOk &&
    hoursOk &&
    (weeksN === null || (weeksN >= 1 && weeksN <= 104)) &&
    (mode === 'convert' ? !!courseId : name.trim().length >= 2);

  const save = async () => {
    if (!collegeId) return;
    setBusy('save');
    const { error } = await supabase.rpc(
      'college_unit_programme_save' as never,
      {
        p_college: collegeId,
        p_course: mode === 'convert' ? courseId : null,
        p_name: name.trim() || null,
        p_code: code.trim() || null,
        p_qualification: qual || null,
        p_planned_hours: hoursN,
        p_aim_ref: aim.trim() || null,
        p_duration_weeks: weeksN,
      } as never
    );
    setBusy(null);
    if (error)
      return toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
    setOpen(false);
    toast({
      title: 'Unit programme saved',
      description: 'Progress reviews and gateway are off for its learners.',
    });
    void load();
  };

  const unset = async (p: Programme) => {
    if (armed !== `unset-${p.course_id}`) {
      setArmed(`unset-${p.course_id}`);
      setTimeout(() => setArmed(null), 5000);
      return;
    }
    setArmed(null);
    const { error } = await supabase.rpc(
      'college_unit_programme_unset' as never,
      { p_course: p.course_id } as never
    );
    if (error)
      return toast({ title: 'Not changed', description: error.message, variant: 'destructive' });
    toast({ title: `${p.name} is a full apprenticeship again` });
    void load();
  };

  const completeLearner = async (l: UnitLearner) => {
    if (armed !== `done-${l.student_id}`) {
      setArmed(`done-${l.student_id}`);
      setTimeout(() => setArmed(null), 5000);
      return;
    }
    setArmed(null);
    setBusy(l.student_id);
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
    const { error } = await supabase.rpc(
      'college_unit_complete' as never,
      { p_student: l.student_id, p_date: today } as never
    );
    setBusy(null);
    if (error)
      return toast({ title: 'Not recorded', description: error.message, variant: 'destructive' });
    toast({
      title: `${l.name ?? 'Learner'} recorded as complete`,
      description: 'End date set and ILR CompStatus 2.',
    });
    void load();
  };

  if (!capsLoading && !collegeId) {
    return (
      <HubPage ground="landing">
        <HubMasthead section="College" title="Apprenticeship units" backTo="/college" />
        <HubBody hidePushPrompt>
          <CollegeEmpty title="No college found" body="This page is for college staff." />
        </HubBody>
      </HubPage>
    );
  }

  const qualOptions = [
    { value: '', label: 'Choose later' },
    ...quals.map((q) => ({
      value: q.id,
      label: `${q.title} (${q.code})`,
      description: q.ac_count ? `${q.ac_count} criteria loaded` : 'No criteria loaded',
    })),
  ];

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Apprenticeship units" backTo="/college" />
      <HubBody hidePushPrompt>
        <QualityScreen>
          <QualityHeader
            eyebrow="Apprenticeship units"
            title="Short units, without the full machinery"
            summary={
              loading
                ? 'Apprenticeship Units (ILR programme type 34): their own criteria, hours and completion.'
                : `${programmes.length} unit ${programmes.length === 1 ? 'programme' : 'programmes'}, ${learners.length} ${learners.length === 1 ? 'learner' : 'learners'} on ${programmes.length === 1 ? 'it' : 'them'}, ${complete} complete and ${ready} ready to record. Progress reviews and gateway are off for these learners.`
            }
            help={HELP}
            primary={
              canManage ? (
                <button
                  type="button"
                  className={QBTN_PRIMARY}
                  onClick={() => openSheet(null)}
                  data-testid="unit-new"
                >
                  Set up a unit programme
                </button>
              ) : undefined
            }
          />

          {loading ? (
            <div className="h-40 animate-pulse rounded-2xl bg-white/[0.04]" />
          ) : programmes.length === 0 ? (
            <CollegeEmpty
              title="No unit programmes yet"
              body="Set one up for an Apprenticeship Unit such as EV charge points, solar PV or electrical fitting once you have the unit specification from your awarding organisation."
            />
          ) : (
            programmes.map((p) => (
              <section key={p.course_id} className="space-y-3" data-testid="unit-programme">
                <CollegeSectionTitle
                  title={p.name}
                  sub={[
                    p.code,
                    p.planned_hours != null ? `${p.planned_hours} planned hours` : null,
                    p.duration_weeks ? `${p.duration_weeks} weeks` : null,
                    p.aim_ref ? `aim ${p.aim_ref}` : null,
                    'ILR programme type 34',
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                  action={
                    canManage ? (
                      <button type="button" className={QBTN} onClick={() => openSheet(p)}>
                        Edit
                      </button>
                    ) : undefined
                  }
                />
                <QPanel>
                  <div className="space-y-2 text-[13px] leading-relaxed text-white">
                    <p>
                      <span className="font-semibold">Criteria set:</span>{' '}
                      {p.qualification_title
                        ? `${p.qualification_title} (${p.qualification_code}), ${p.criteria_count} ${p.criteria_count === 1 ? 'criterion' : 'criteria'} loaded.`
                        : 'not chosen yet.'}
                    </p>
                    {p.missing.length > 0 ? (
                      <div data-testid="unit-missing">
                        <p className="font-semibold">Still needed before learners start:</p>
                        <ul className="mt-1 list-disc space-y-1 pl-5">
                          {p.missing.map((m) => (
                            <li key={m}>{MISSING[m]}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p>Everything the structure needs is in place.</p>
                    )}
                    <p>
                      {p.cohorts} {p.cohorts === 1 ? 'cohort' : 'cohorts'} on this course. Progress
                      reviews and gateway are off; portfolio, assessment, IQA, hours and attendance
                      work as usual.
                    </p>
                  </div>
                  {canManage && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className={QBTN}
                        onClick={() => navigate('/college?section=cohorts')}
                      >
                        Add a cohort
                      </button>
                      <button type="button" className={QBTN} onClick={() => void unset(p)}>
                        {armed === `unset-${p.course_id}`
                          ? 'Tap again to confirm'
                          : 'Make it a full apprenticeship'}
                      </button>
                    </div>
                  )}
                </QPanel>
                {p.learners.length === 0 ? (
                  <CollegeEmpty
                    title="No learners yet"
                    body="Add a cohort for this course and put learners on it."
                  />
                ) : (
                  <ul className={QLIST}>
                    {p.learners.map((l) => (
                      <li
                        key={l.student_id}
                        className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5"
                        data-testid="unit-learner"
                      >
                        <button
                          type="button"
                          className="min-w-0 flex-1 text-left touch-manipulation"
                          onClick={() =>
                            navigate(`/college?section=student360&studentId=${l.student_id}`)
                          }
                        >
                          <p className="truncate text-[14px] font-semibold text-white">
                            {l.name ?? 'Unnamed learner'}
                          </p>
                          <p className="text-[12.5px] text-white">
                            {[
                              l.cohort,
                              l.criteria_total > 0
                                ? `criteria ${l.criteria_achieved} of ${l.criteria_total}`
                                : 'no criteria loaded yet',
                              `${l.hours_verified}h${p.planned_hours != null ? ` of ${p.planned_hours}h` : ''} verified`,
                            ]
                              .filter(Boolean)
                              .join(' · ')}
                          </p>
                        </button>
                        <span
                          className={cn(
                            'inline-flex h-6 shrink-0 items-center self-start rounded-full border px-2.5 text-[12px] font-semibold sm:self-center',
                            l.completed
                              ? 'border-emerald-400/60 text-emerald-300'
                              : l.criteria_met
                                ? 'border-orange-400/60 text-orange-300'
                                : 'border-white/[0.18] text-white'
                          )}
                        >
                          {l.completed
                            ? `Complete${l.actual_end_date ? ` ${new Date(`${l.actual_end_date}T12:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : ''}`
                            : l.criteria_met
                              ? 'Ready to record'
                              : 'In progress'}
                        </span>
                        {canEdit && !l.completed && l.criteria_met && (
                          <button
                            type="button"
                            className={QBTN}
                            disabled={busy === l.student_id}
                            onClick={() => void completeLearner(l)}
                            data-testid="unit-complete"
                          >
                            {armed === `done-${l.student_id}`
                              ? 'Tap again to record'
                              : l.hours_met || p.planned_hours == null
                                ? 'Record complete'
                                : 'Record complete (hours short)'}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))
          )}

          <section className="space-y-3">
            <CollegeSectionTitle
              title="What your college supplies"
              sub="Elec-Mate builds the structure; the content and the rules come from the source."
            />
            <QPanel>
              <ul className="list-disc space-y-1.5 pl-5 text-[13px] leading-relaxed text-white">
                <li>
                  The unit&rsquo;s criteria, from the awarding organisation&rsquo;s unit
                  specification, loaded as a criteria set.
                </li>
                <li>The LARS learning aim reference for each unit, for the ILR LearnAimRef.</li>
                <li>The planned hours and length of each unit, from the unit specification.</li>
                <li>
                  How completion and achievement are recorded under the funding rules for units: the
                  hub records the end date and CompStatus 2 and leaves Outcome and AchDate to your
                  MIS.
                </li>
              </ul>
            </QPanel>
          </section>
        </QualityScreen>

        <FormSheet
          open={open}
          onOpenChange={setOpen}
          width="wide"
          eyebrow="Apprenticeship unit"
          title={courseId ? 'Edit the unit programme' : 'Set up a unit programme'}
          description="ILR programme type 34. Progress reviews and gateway are off for its learners."
          footer={
            <div className="flex w-full gap-2">
              <button type="button" className={QBTN} onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className={cn(QBTN_PRIMARY, 'flex-1')}
                disabled={!canSave || busy === 'save'}
                onClick={() => void save()}
                data-testid="unit-save"
              >
                {busy === 'save' ? 'Saving…' : 'Save'}
              </button>
            </div>
          }
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="space-y-4">
              {!courseId && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={chipCn(mode === 'new')}
                    onClick={() => setMode('new')}
                  >
                    A new course
                  </button>
                  <button
                    type="button"
                    className={chipCn(mode === 'convert')}
                    onClick={() => setMode('convert')}
                    disabled={otherCourses.length === 0}
                  >
                    One of my courses
                  </button>
                </div>
              )}
              {mode === 'convert' && !data?.programmes.some((p) => p.course_id === courseId) && (
                <div>
                  <p className={labelCn}>Course</p>
                  <MobileSelectPicker
                    value={courseId ?? ''}
                    onValueChange={(v) => setCourseId(v || null)}
                    options={otherCourses.map((c) => ({
                      value: c.id,
                      label: c.code ? `${c.name} (${c.code})` : c.name,
                    }))}
                    title="Course"
                    placeholder="Choose a course"
                    triggerClassName={selectTriggerCn}
                  />
                </div>
              )}
              <div>
                <label className={labelCn} htmlFor="unit-name">
                  Name {mode === 'convert' ? '(leave empty to keep it)' : ''}
                </label>
                <input
                  id="unit-name"
                  className={inputCn}
                  value={name}
                  maxLength={120}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="For example EV charge point installation unit"
                  data-testid="unit-name"
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="unit-code">
                  Course code
                </label>
                <input
                  id="unit-code"
                  className={inputCn}
                  value={code}
                  maxLength={30}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div>
                <p className={labelCn}>Criteria set</p>
                <MobileSelectPicker
                  value={qual}
                  onValueChange={setQual}
                  options={qualOptions}
                  title="Criteria set"
                  triggerClassName={selectTriggerCn}
                />
                <p className="mt-1 text-[12px] text-white">
                  The unit&rsquo;s criteria from its awarding organisation. Not listed yet? Send us
                  the unit specification and choose it later.
                </p>
              </div>
            </section>
            <section className="space-y-4">
              <div>
                <label className={labelCn} htmlFor="unit-hours">
                  Planned hours
                </label>
                <input
                  id="unit-hours"
                  className={inputCn}
                  inputMode="numeric"
                  value={hours}
                  onChange={(e) => setHours(e.target.value.replace(/[^0-9.]/g, ''))}
                  data-testid="unit-hours"
                />
                <p className="mt-1 text-[12px] text-white">
                  {hoursN !== null && (hoursN < 30 || hoursN > 140)
                    ? 'The first units announced run 30 to 140 hours. Check this against the unit specification.'
                    : 'From the unit specification.'}
                </p>
              </div>
              <div>
                <label className={labelCn} htmlFor="unit-weeks">
                  Length in weeks
                </label>
                <input
                  id="unit-weeks"
                  className={inputCn}
                  inputMode="numeric"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </div>
              <div>
                <label className={labelCn} htmlFor="unit-aim">
                  Learning aim reference (LARS)
                </label>
                <input
                  id="unit-aim"
                  className={inputCn}
                  value={aim}
                  maxLength={8}
                  onChange={(e) => setAim(e.target.value.toUpperCase())}
                  data-testid="unit-aim"
                />
                <p className="mt-1 text-[12px] text-white">
                  {aimOk
                    ? 'Up to 8 letters and digits. Goes into the ILR export as LearnAimRef when a learner has none of their own.'
                    : 'Up to 8 letters and digits only.'}
                </p>
              </div>
            </section>
          </div>
        </FormSheet>
      </HubBody>
    </HubPage>
  );
}
