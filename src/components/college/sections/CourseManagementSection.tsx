import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  useCollegeCourses,
  useCreateCollegeCourse,
  useUpdateCollegeCourse,
} from '@/hooks/college/useCollegeCourses';
import type { CollegeCourse } from '@/services/college';
import { OTJ_STANDARDS, getOtjStandard } from '@/data/otjStandards';
import { useQualifications } from '@/hooks/useCurriculum';
import {
  PageFrame,
  PageHero,
  ListCard,
  ListRow,
  Pill,
  EmptyState,
  LoadingState,
  SheetShell,
  Field,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  itemVariants,
} from '@/components/college/primitives';

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
 */
export function CourseManagementSection() {
  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? undefined;
  const { data: courses = [], isLoading } = useCollegeCourses(collegeId);

  // Per-course enrolment counts (RLS scopes to this college anyway).
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

  const active = courses.filter((c) => c.status === 'Active');
  const archived = courses.filter((c) => c.status !== 'Active');

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Curriculum Hub · Course setup"
          title="Courses you run"
          description="Set up the courses learners enrol on — apprenticeship standard, off-the-job training hours and status. Learners inherit the OTJ target from their course automatically."
          tone="emerald"
          actions={
            <button
              onClick={() => setCreating(true)}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Add course →
            </button>
          }
        />
      </motion.div>

      {isLoading ? (
        <LoadingState />
      ) : courses.length === 0 ? (
        <EmptyState
          title="No courses yet"
          description="Add the courses your college delivers so learners can be enrolled and inherit their off-the-job training target."
          action="Add your first course"
          onAction={() => setCreating(true)}
        />
      ) : (
        <div className="space-y-7">
          <motion.div variants={itemVariants}>
            <ListCard>
              {active.map((c) => (
                <CourseRow
                  key={c.id}
                  course={c}
                  enrolled={enrolment[c.id] ?? 0}
                  onClick={() => setEditing(c)}
                />
              ))}
            </ListCard>
          </motion.div>

          {archived.length > 0 && (
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                Inactive
              </div>
              <ListCard>
                {archived.map((c) => (
                  <CourseRow
                    key={c.id}
                    course={c}
                    enrolled={enrolment[c.id] ?? 0}
                    onClick={() => setEditing(c)}
                  />
                ))}
              </ListCard>
            </motion.div>
          )}
        </div>
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
    </PageFrame>
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
  const bits = [
    course.code,
    course.level,
    course.otj_required_hours != null ? `${course.otj_required_hours}h OTJ` : 'OTJ not set',
    `${enrolled} enrolled`,
  ].filter(Boolean);
  return (
    <ListRow
      onClick={onClick}
      accent={course.status === 'Active' ? 'emerald' : undefined}
      title={course.name}
      subtitle={bits.join('  ·  ')}
      trailing={
        course.otj_required_hours == null ? (
          <Pill tone="amber">Set OTJ</Pill>
        ) : course.status === 'Active' ? (
          <span className="text-white/60 text-[16px]">→</span>
        ) : (
          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-white/[0.04] text-white/55 border-white/[0.1]">
            Inactive
          </span>
        )
      }
    />
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
        side="bottom"
        className="h-[90vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08] bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow={course ? 'Edit course' : 'New course'}
          title={course ? course.name || 'Edit course' : 'Add a course'}
          description="What learners enrol on. The off-the-job hours flow to every learner enrolled on this course."
          footer={
            <>
              <SecondaryButton onClick={onClose} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleSave} disabled={!valid || saving} fullWidth>
                {saving ? 'Saving…' : course ? 'Save changes' : 'Add course'}
              </PrimaryButton>
            </>
          }
        >
          <Field label="Course name" required>
            <input
              className={inputClass}
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Level 3 Electrical Installation"
              autoFocus
            />
          </Field>

          <Field
            label="Qualification"
            hint="Links the course to its qualification — drives AC coverage and BS 7671 matching. Picking one fills in any blank details below."
          >
            <Select
              value={form.qualification_id || 'none'}
              onValueChange={(v) => onPickQualification(v === 'none' ? '' : v)}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Link a qualification…" />
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
          </Field>

          <FormGrid cols={2}>
            <Field label="Course code" hint="Your internal or awarding-body code.">
              <input
                className={inputClass}
                value={form.code}
                onChange={(e) => set('code', e.target.value)}
                placeholder="e.g. 2365-03"
              />
            </Field>
            <Field label="Awarding body">
              <input
                className={inputClass}
                value={form.awarding_body}
                onChange={(e) => set('awarding_body', e.target.value)}
                placeholder="e.g. City & Guilds"
              />
            </Field>
          </FormGrid>

          <Field
            label="Apprenticeship standard"
            hint="Sets the off-the-job training target. Pick the standard this course delivers, or choose Custom to enter hours directly."
          >
            <Select value={form.standardCode} onValueChange={onPickStandard}>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select a standard…" />
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
          </Field>

          <FormGrid cols={2}>
            <Field
              label="OTJ hours"
              hint="Inherited by enrolled learners (an individual override is still respected)."
            >
              <input
                className={inputClass}
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
            </Field>
            <Field label="Level">
              <input
                className={inputClass}
                value={form.level}
                onChange={(e) => set('level', e.target.value)}
                placeholder="e.g. Level 3"
              />
            </Field>
          </FormGrid>

          <FormGrid cols={2}>
            <Field label="Duration (months)">
              <input
                className={inputClass}
                type="number"
                inputMode="numeric"
                min={0}
                value={form.duration_months}
                onChange={(e) => set('duration_months', e.target.value)}
                placeholder="e.g. 48"
              />
            </Field>
            <Field label="Status">
              <Select value={form.status} onValueChange={(v) => set('status', v)}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FormGrid>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
