import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { supabase } from '@/integrations/supabase/client';
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
  LoadingState,
  selectContentClass,
} from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { choiceCn } from '@/components/college/teaching/TeachingKit';
import {
  NameBadge,
  PEOPLE_CARD,
  StatusChip,
  TOP_LINE,
} from '@/components/college/people/peopleKit';
import { useCollegeCan } from '@/hooks/useCollegeCan';

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
 * College Hub kit (7 Oct 2026): header with "?" (counts in its sentence) → one card per
 * course with its enrolments and off-the-job target → the course form as a
 * wide FormSheet.
 */

const HELP: PageHelpContent = {
  id: 'college-course-setup',
  title: 'Course setup',
  what: 'The courses your college runs: what learners enrol on. Each course carries the off-the-job hours its apprenticeship standard needs, and every learner enrolled on it inherits that target.',
  steps: [
    {
      title: 'Add a course',
      body: 'Pick its qualification first: that fills in the name, code, awarding body and level for you.',
    },
    {
      title: 'Set the standard',
      body: 'Choose the apprenticeship standard it delivers. That sets the off-the-job hours. Choose Custom to type hours yourself.',
    },
    {
      title: 'Keep it tidy',
      body: 'Mark a course Inactive when you stop running it. Learners already on it keep their record.',
    },
  ],
  notes: [
    {
      title: 'Off-the-job target not set',
      body: 'Learners on a course with no target have nothing to measure their hours against. Set it once here.',
    },
  ],
  source: 'Off-the-job hours per standard: DfE apprenticeship funding rules, Annex C.',
};

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
        .select('course_id, status')
        .eq('college_id', collegeId!);
      const m: Record<string, number> = {};
      // Only learners still on the programme: withdrawn, completed and break
      // in learning rows are not "enrolled". Case-insensitive, the data mixes.
      for (const r of (data ?? []) as { course_id: string | null; status: string | null }[]) {
        if (r.course_id && ((r.status ?? '').trim().toLowerCase() || 'active') === 'active')
          m[r.course_id] = (m[r.course_id] ?? 0) + 1;
      }
      return m;
    },
  });

  const [editing, setEditing] = useState<CollegeCourse | null>(null);
  const [creating, setCreating] = useState(false);
  // ELE-1898: courses are managed by admins / heads of department
  // (college_can 'cohorts.manage', the same check the courses policy makes).
  const { can } = useCollegeCan();
  const canManage = can('cohorts.manage');

  const active = courses.filter((c) => isActiveStatus(c.status));
  const archived = courses.filter((c) => !isActiveStatus(c.status));
  const enrolledTotal = active.reduce((s, c) => s + (enrolment[c.id] ?? 0), 0);
  const otjUnset = active.filter((c) => c.otj_required_hours == null).length;

  const openCreate = () => {
    setEditing(null);
    setCreating(true);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      <CollegePageHeader
        eyebrow="Courses and admin"
        title="Course setup"
        description={
          courses.length === 0
            ? 'The courses your college runs. Each one sets the off-the-job hours its learners need. None added yet.'
            : `${active.length} course${active.length === 1 ? '' : 's'} running${archived.length > 0 ? ` (${archived.length} inactive)` : ''}, with ${enrolledTotal} learner${enrolledTotal === 1 ? '' : 's'} enrolled. ` +
              (otjUnset > 0
                ? `${otjUnset} running course${otjUnset === 1 ? ' has' : 's have'} no off-the-job target, so their learners have nothing to measure against.`
                : 'Every running course has its off-the-job target set.')
        }
        help={HELP}
        actions={
          canManage ? (
            <button
              type="button"
              onClick={openCreate}
              className={cn(COLLEGE_BTN_PRIMARY, 'w-full sm:w-auto')}
            >
              Add course
            </button>
          ) : undefined
        }
      />

      {isLoading ? (
        <LoadingState />
      ) : courses.length === 0 ? (
        <CollegeEmpty
          title="No courses yet"
          body={
            canManage
              ? 'Add the courses your college delivers. A course comes first: cohorts sit on a course, and learners enrolled on it inherit its off-the-job hours target.'
              : 'Your college admin or head of department adds courses. Once they have, they show here with their enrolments and off-the-job target.'
          }
          action={
            canManage ? (
              <button type="button" onClick={openCreate} className={COLLEGE_BTN_PRIMARY}>
                Add course
              </button>
            ) : undefined
          }
        />
      ) : (
        <>
          <section className="space-y-3">
            <CollegeSectionTitle
              title="Running"
              sub={`${active.length} course${active.length === 1 ? '' : 's'}`}
            />
            {active.length === 0 ? (
              <CollegeEmpty
                title="Nothing running"
                body="Every course is inactive. Open one below and set it to Active."
              />
            ) : (
              <div className="grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3">
                {active.map((c) => (
                  <CourseRow
                    key={c.id}
                    course={c}
                    enrolled={enrolment[c.id] ?? 0}
                    onClick={canManage ? () => setEditing(c) : undefined}
                  />
                ))}
              </div>
            )}
          </section>

          {archived.length > 0 && (
            <section className="space-y-3">
              <CollegeSectionTitle title="Inactive" sub={`${archived.length}`} />
              <div className="grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3">
                {archived.map((c) => (
                  <CourseRow
                    key={c.id}
                    course={c}
                    enrolled={enrolment[c.id] ?? 0}
                    onClick={canManage ? () => setEditing(c) : undefined}
                  />
                ))}
              </div>
            </section>
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
    </motion.div>
  );
}

function CourseRow({
  course,
  enrolled,
  onClick,
}: {
  course: CollegeCourse;
  enrolled: number;
  /** Absent when the viewer cannot edit courses: the card is then not a button. */
  onClick?: () => void;
}) {
  const needsOtj = course.otj_required_hours == null && isActiveStatus(course.status);
  const fig = (label: string, value: string, warn?: boolean) => (
    <div className="min-w-0">
      <dd
        className={cn(
          'text-[20px] font-bold leading-none tabular-nums',
          warn ? 'text-orange-400' : 'text-white'
        )}
      >
        {value}
      </dd>
      <dt className="mt-1 text-[12px] text-white">{label}</dt>
    </div>
  );
  const body = (
    <>
      <span aria-hidden className={TOP_LINE} />
      <span className="flex w-full items-start justify-between gap-3">
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-semibold leading-snug text-white">{course.name}</span>
            {!isActiveStatus(course.status) && <NameBadge>{course.status ?? 'Inactive'}</NameBadge>}
            {needsOtj && <StatusChip tone="action">Hours target not set</StatusChip>}
          </span>
          <span className="mt-1 block text-[12.5px] leading-snug text-white">
            {[course.code, course.level, course.awarding_body].filter(Boolean).join(' · ') ||
              'No details yet'}
          </span>
        </span>
        {onClick && (
          <ChevronRight
            className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow"
            aria-hidden
          />
        )}
      </span>
      <dl className="mt-auto grid grid-cols-3 gap-3 pt-4">
        {fig('enrolled', String(enrolled))}
        {fig(
          'off-the-job',
          course.otj_required_hours != null ? `${course.otj_required_hours}h` : 'Not set',
          needsOtj
        )}
        {fig(
          'long',
          course.duration_months != null ? `${course.duration_months} months` : 'Not set'
        )}
      </dl>
    </>
  );
  return onClick ? (
    <motion.button
      variants={itemVariants}
      type="button"
      onClick={onClick}
      aria-label={`Edit ${course.name}`}
      className={cn(PEOPLE_CARD, 'p-4 sm:p-5')}
    >
      {body}
    </motion.button>
  ) : (
    <motion.div variants={itemVariants} className={cn(PEOPLE_CARD, 'p-4 sm:p-5')}>
      {body}
    </motion.div>
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
    otj_required_hours: course.otj_required_hours != null ? String(course.otj_required_hours) : '',
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
      {hint && <p className="mb-1.5 text-[12px] leading-snug text-white">{hint}</p>}
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
    <FormSheet
      open
      onOpenChange={(v) => !v && onClose()}
      width="wide"
      eyebrow="Course setup"
      title={course ? course.name || 'Edit course' : 'Add a course'}
      description="What learners enrol on. The off-the-job hours flow to every learner enrolled on this course."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={onClose} className={cn(COLLEGE_BTN, 'w-full')}>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!valid || saving}
            className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}
          >
            {saving ? 'Saving…' : course ? 'Save changes' : 'Add course'}
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-2 [&>*]:min-w-0">
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
          <FieldLabel hint="Links the course to its qualification, so its units and criteria are there for learners and lesson plans. Picking one fills in any blank details below.">
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
              {form.qualification_id && !quals.some((q) => q.id === form.qualification_id) && (
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
                  className={cn(choiceCn(form.status === s), 'h-11 flex-1')}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FormSheet>
  );
}
