import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  useCollegeCourses,
  useCreateCollegeCourse,
  useUpdateCollegeCourse,
} from '@/hooks/college/useCollegeCourses';
import type { CollegeCourse } from '@/services/college';
import { OTJ_STANDARDS, getOtjStandard } from '@/data/otjStandards';
import { useQualifications } from '@/hooks/useCurriculum';
import {
  containerVariants,
  itemVariants,
  EmptyState,
  LoadingState,
  selectContentClass,
} from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';

/**
 * Course setup — the courses a college actually RUNS (what learners enrol on),
 * distinct from the read-only qualifications/LO-AC browser (CoursesSection).
 *
 * Why this exists: nothing in the UI could create or edit a college_course, so
 * courses were only ever seeded directly in the DB — and crucially their
 * otj_required_hours was never set. That target is a fixed property of the
 * apprenticeship standard (DfE Annex C, src/data/otjStandards.ts) and learners
 * INHERIT it on enrolment via the tg_set_otj_required_hours trigger. So the
 * college sets it once here, per course, by picking the standard.
 *
 * RLS: same-college staff insert/update (scoped by _ch_same_college(college_id)),
 * so college_id must be the staff's own college — taken from the profile.
 *
 * Renders CONTENT ONLY under the CollegeDashboard masthead, on the shared hub
 * language: KPI row → one solid volt "Add course" → work-list rows.
 */

const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[filter,transform] touch-manipulation hover:brightness-105 active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white disabled:opacity-60 sm:w-auto';
const SECONDARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full border border-white/[0.14] px-5 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:scale-[0.98] sm:w-auto';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);
const ROW =
  'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5';
const INPUT =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';
const SELECT_TRIGGER =
  'h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white shadow-none focus:border-elec-yellow focus:ring-0 focus:outline-none data-[state=open]:border-elec-yellow touch-manipulation';

const isActiveStatus = (s: string | null | undefined) => (s ?? '').toLowerCase() === 'active';

export function CourseManagementSection() {
  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? undefined;
  const { data: courses = [], isLoading } = useCollegeCourses(collegeId);

  // Per-course enrolment counts. college_students.course_id → college_courses.id.
  const { data: enrolment = {} } = useQuery({
    queryKey: ['course-enrolment-counts', collegeId],
    enabled: !!collegeId,
    queryFn: async () => {
      const { data } = await supabase
        .from('college_students')
        .select('course_id')
        .eq('college_id', collegeId!);
      const m: Record<string, number> = {};
      for (const r of (data ?? []) as { course_id: string | null }[]) {
        if (r.course_id) m[r.course_id] = (m[r.course_id] ?? 0) + 1;
      }
      return m;
    },
  });

  const [editing, setEditing] = useState<CollegeCourse | null>(null);
  const [creating, setCreating] = useState(false);

  const active = courses.filter((c) => isActiveStatus(c.status));
  const archived = courses.filter((c) => !isActiveStatus(c.status));
  const enrolledTotal = active.reduce((s, c) => s + (enrolment[c.id] ?? 0), 0);
  const otjUnset = active.filter((c) => c.otj_required_hours == null).length;

  const openCreate = () => {
    setEditing(null);
    setCreating(true);
  };

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {!isLoading && courses.length > 0 && (
          <HubKpiRow>
            <HubKpi
              accent
              label="Courses running"
              value={String(active.length)}
              verdict={active.length > 0 ? 'What learners enrol on' : 'Nothing running'}
              context={archived.length > 0 ? `${archived.length} inactive` : undefined}
            />
            <HubKpi
              label="Learners enrolled"
              value={String(enrolledTotal)}
              verdict={enrolledTotal > 0 ? 'Across running courses' : 'No enrolments yet'}
            />
            <HubKpi
              label="OTJ target not set"
              value={String(otjUnset)}
              sentiment={otjUnset > 0 ? 'bad' : 'neutral'}
              verdict={
                otjUnset > 0
                  ? 'Learners on these inherit no hours target'
                  : 'Every running course has a target'
              }
            />
          </HubKpiRow>
        )}

        <motion.div variants={itemVariants}>
          <button type="button" onClick={openCreate} className={PRIMARY}>
            Add course
          </button>
        </motion.div>
      </motion.section>

      {isLoading ? (
        <LoadingState />
      ) : courses.length === 0 ? (
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <EmptyState
            title="No courses yet"
            description="Add the courses your college delivers so learners can be enrolled and inherit their off-the-job training target."
          />
        </motion.div>
      ) : (
        <>
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
              <HubSectionHeading>Running</HubSectionHeading>
              <span
                className={cn(
                  'text-[11px] font-semibold tabular-nums',
                  otjUnset > 0 ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {active.length} course{active.length === 1 ? '' : 's'}
              </span>
            </motion.div>
            <motion.div variants={itemVariants} className={LIST_CARD}>
              {active.length === 0 ? (
                <p className="px-4 py-5 text-[12.5px] text-white sm:px-5">
                  Nothing running — every course is inactive.
                </p>
              ) : (
                <ul className="divide-y divide-white/[0.10]">
                  {active.map((c) => (
                    <CourseRow
                      key={c.id}
                      course={c}
                      enrolled={enrolment[c.id] ?? 0}
                      onClick={() => setEditing(c)}
                    />
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.section>

          {archived.length > 0 && (
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
                <HubSectionHeading>Inactive</HubSectionHeading>
                <span className="text-[11px] font-semibold tabular-nums text-white">
                  {archived.length}
                </span>
              </motion.div>
              <motion.div variants={itemVariants} className={LIST_CARD}>
                <ul className="divide-y divide-white/[0.10]">
                  {archived.map((c) => (
                    <CourseRow
                      key={c.id}
                      course={c}
                      enrolled={enrolment[c.id] ?? 0}
                      onClick={() => setEditing(c)}
                    />
                  ))}
                </ul>
              </motion.div>
            </motion.section>
          )}
        </>
      )}

      {(creating || editing) && collegeId && (
        <CourseFormSheet
          collegeId={collegeId}
          course={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}
    </>
  );
}

function CourseRow({
  course,
  enrolled,
  onClick,
}: {
  course: CollegeCourse;
  enrolled: number;
  onClick: () => void;
}) {
  const needsOtj = course.otj_required_hours == null && isActiveStatus(course.status);
  const bits = [
    course.code,
    course.level,
    course.awarding_body,
    course.otj_required_hours != null ? `${course.otj_required_hours}h off-the-job` : null,
  ].filter(Boolean);
  return (
    <li>
      <button type="button" onClick={onClick} className={ROW}>
        <span
          aria-hidden="true"
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            needsOtj ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {course.name}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {needsOtj
              ? ['Off-the-job target not set', ...bits].join(' · ')
              : bits.length > 0
                ? bits.join(' · ')
                : 'No details yet'}
          </span>
        </span>
        <span
          className={cn(
            'shrink-0 text-[13px] font-semibold tabular-nums',
            needsOtj ? 'text-elec-yellow' : 'text-white'
          )}
        >
          {needsOtj ? 'Set OTJ' : `${enrolled} enrolled`}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );
}

interface FormState {
  name: string;
  code: string;
  level: string;
  awarding_body: string;
  duration_months: string;
  otj_required_hours: string;
  status: string;
  standardCode: string; // '' = none, 'custom' = manual hours
  qualification_id: string; // '' = none
}

function courseToForm(course: CollegeCourse | null): FormState {
  if (!course) {
    return {
      name: '',
      code: '',
      level: '',
      awarding_body: '',
      duration_months: '',
      otj_required_hours: '',
      status: 'Active',
      standardCode: '',
      qualification_id: '',
    };
  }
  // reverse-map the standard from the stored hours (best-effort — an RPL
  // override won't match any standard, which is fine: shows as custom)
  const matched = OTJ_STANDARDS.find((s) => s.otjHours === course.otj_required_hours);
  return {
    name: course.name ?? '',
    code: course.code ?? '',
    level: course.level ?? '',
    awarding_body: course.awarding_body ?? '',
    duration_months: course.duration_months != null ? String(course.duration_months) : '',
    otj_required_hours:
      course.otj_required_hours != null ? String(course.otj_required_hours) : '',
    status: course.status ?? 'Active',
    standardCode: matched ? matched.code : course.otj_required_hours != null ? 'custom' : '',
    qualification_id: course.qualification_id ?? '',
  };
}

function FieldLabel({
  children,
  required,
  hint,
}: {
  children: ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <>
      <label className="mb-1 block text-[12px] font-medium text-white">
        {children}
        {required && <span className="ml-1 text-elec-yellow">*</span>}
      </label>
      {hint && <p className="mb-1.5 text-[11px] leading-snug text-white">{hint}</p>}
    </>
  );
}

function CourseFormSheet({
  collegeId,
  course,
  onClose,
}: {
  collegeId: string;
  course: CollegeCourse | null;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const createMut = useCreateCollegeCourse();
  const updateMut = useUpdateCollegeCourse();
  const { data: quals = [] } = useQualifications();
  const [form, setForm] = useState<FormState>(() => courseToForm(course));

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onPickQualification = (qid: string) => {
    const q = quals.find((x) => x.id === qid);
    // The qualification is the primary selector (ELE-1089): picking one drives
    // name / code / awarding body / level from the catalogue (and links the
    // LO/AC via qualification_id). The college can still edit any field after.
    // OTJ hours stay on the apprenticeship-standard picker — OTJ is a property
    // of the standard, and qualifications carry no OTJ/standard data to infer it.
    setForm((f) => ({
      ...f,
      qualification_id: qid,
      name: q?.title ?? f.name,
      code: q?.code ?? f.code,
      awarding_body: q?.awarding_body ?? f.awarding_body,
      level: q?.level ?? f.level,
    }));
  };

  const onPickStandard = (code: string) => {
    if (code === 'custom') {
      set('standardCode', 'custom');
      return;
    }
    const std = getOtjStandard(code);
    setForm((f) => ({
      ...f,
      standardCode: code,
      otj_required_hours: std ? String(std.otjHours) : f.otj_required_hours,
      // helpfully prefill level when empty, never overwrite a typed value
      level: f.level || (std ? `Level ${std.level}` : f.level),
    }));
  };

  const hours = form.otj_required_hours.trim() === '' ? null : Number(form.otj_required_hours);
  const months = form.duration_months.trim() === '' ? null : Number(form.duration_months);
  const valid =
    form.name.trim().length > 0 &&
    (hours === null || (Number.isFinite(hours) && hours >= 0)) &&
    (months === null || (Number.isFinite(months) && months >= 0));
  const saving = createMut.isPending || updateMut.isPending;

  const handleSave = async () => {
    if (!valid) return;
    const payload = {
      name: form.name.trim(),
      code: form.code.trim() || null,
      level: form.level.trim() || null,
      awarding_body: form.awarding_body.trim() || null,
      duration_months: months,
      otj_required_hours: hours,
      status: form.status,
      qualification_id: form.qualification_id || null,
    };
    try {
      if (course) {
        const res = await updateMut.mutateAsync({ id: course.id, updates: payload });
        if (!res) throw new Error('update failed');
        toast({ title: 'Course updated' });
      } else {
        await createMut.mutateAsync({
          ...payload,
          college_id: collegeId,
        });
        toast({ title: 'Course added' });
      }
      onClose();
    } catch (e) {
      toast({
        title: 'Could not save course',
        description: e instanceof Error ? e.message : 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Sheet open onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        hideCloseButton
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.10] bg-elec-dark p-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 justify-center pb-1 pt-2.5">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <div className="shrink-0 border-b border-white/[0.10] px-4 pb-4 sm:px-5">
            <SheetTitle asChild>
              <h2 className="text-[19px] font-semibold leading-tight tracking-tight text-white">
                {course ? course.name || 'Edit course' : 'Add a course'}
              </h2>
            </SheetTitle>
            <SheetDescription asChild>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                What learners enrol on. The off-the-job hours flow to every learner enrolled on
                this course.
              </p>
            </SheetDescription>
          </div>

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5">
            <div>
              <FieldLabel required>Course name</FieldLabel>
              <input
                className={INPUT}
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. Level 3 Electrical Installation"
                autoFocus
              />
            </div>

            <div>
              <FieldLabel hint="Links the course to its qualification — drives AC coverage and BS 7671 matching. Picking one fills in any blank details below.">
                Qualification
              </FieldLabel>
              <Select
                value={form.qualification_id || 'none'}
                onValueChange={(v) => onPickQualification(v === 'none' ? '' : v)}
              >
                <SelectTrigger className={SELECT_TRIGGER}>
                  <SelectValue placeholder="Link a qualification" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="none">Not linked</SelectItem>
                  {/* Keep an existing link visible even if that qualification isn't
                      in the pickable catalogue (e.g. no LO/AC data loaded yet). */}
                  {form.qualification_id &&
                    !quals.some((q) => q.id === form.qualification_id) && (
                      <SelectItem value={form.qualification_id}>
                        Currently linked qualification
                      </SelectItem>
                    )}
                  {quals.map((q) => (
                    <SelectItem key={q.id} value={q.id}>
                      {q.awarding_body} · {q.code} · {q.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
              <div>
                <FieldLabel hint="Your internal or awarding-body code.">Course code</FieldLabel>
                <input
                  className={INPUT}
                  value={form.code}
                  onChange={(e) => set('code', e.target.value)}
                  placeholder="e.g. 2365-03"
                />
              </div>
              <div>
                <FieldLabel>Awarding body</FieldLabel>
                <input
                  className={INPUT}
                  value={form.awarding_body}
                  onChange={(e) => set('awarding_body', e.target.value)}
                  placeholder="e.g. City & Guilds"
                />
              </div>
            </div>

            <div>
              <FieldLabel hint="Sets the off-the-job training target. Pick the standard this course delivers, or choose Custom to enter hours directly.">
                Apprenticeship standard
              </FieldLabel>
              <Select value={form.standardCode} onValueChange={onPickStandard}>
                <SelectTrigger className={SELECT_TRIGGER}>
                  <SelectValue placeholder="Select a standard" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {OTJ_STANDARDS.map((s) => (
                    <SelectItem key={s.code} value={s.code}>
                      {s.name} · {s.code} · {s.otjHours}h
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Custom / other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
              <div>
                <FieldLabel hint="Inherited by enrolled learners (an individual override is still respected).">
                  Off-the-job hours
                </FieldLabel>
                <input
                  className={INPUT}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={form.otj_required_hours}
                  onChange={(e) => {
                    set('otj_required_hours', e.target.value);
                    set('standardCode', 'custom');
                  }}
                  placeholder="e.g. 1066"
                />
              </div>
              <div>
                <FieldLabel>Level</FieldLabel>
                <input
                  className={INPUT}
                  value={form.level}
                  onChange={(e) => set('level', e.target.value)}
                  placeholder="e.g. Level 3"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
              <div>
                <FieldLabel>Duration (months)</FieldLabel>
                <input
                  className={INPUT}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={form.duration_months}
                  onChange={(e) => set('duration_months', e.target.value)}
                  placeholder="e.g. 48"
                />
              </div>
              <div>
                <FieldLabel>Status</FieldLabel>
                <div className="flex gap-2">
                  {['Active', 'Inactive'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set('status', s)}
                      className={cn(
                        'inline-flex h-11 flex-1 items-center justify-center rounded-full border text-[12.5px] font-medium transition-colors touch-manipulation',
                        form.status === s
                          ? 'border-white bg-white text-black'
                          : 'border-white/[0.14] text-white hover:bg-white/[0.06]'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex shrink-0 flex-row gap-2 border-t border-white/[0.10] px-4 pt-3 sm:px-5"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <button type="button" onClick={onClose} className={cn(SECONDARY, 'flex-1 sm:w-auto')}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!valid || saving}
              className={cn(PRIMARY, 'flex-1 sm:w-auto')}
            >
              {saving ? 'Saving…' : course ? 'Save changes' : 'Add course'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
