import { useEffect, useMemo, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { SuccessCheckmark } from '@/components/college/primitives';
import { useVerifierAuthority } from '@/hooks/useVerifierAuthority';
import { getActingCollegeId } from '@/hooks/college/useCollegeAccess';

/* ==========================================================================
   StaffOnboardingWizard — 7-step guided flow that creates the staff row,
   then walks the admin through statutory compliance evidence so the new
   starter goes from "added" to "audit-ready" in one sitting.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: (staffId: string) => void;
}

type StaffRoleValue = 'tutor' | 'head_of_department' | 'support' | 'admin';

interface IdentityState {
  name: string;
  email: string;
  phone: string;
  role: StaffRoleValue;
  department: string;
}

interface ComplianceStepState {
  skipped: boolean;
  reference_no: string;
  issued_at: string;
  expires_at: string;
  notes: string;
  pending_file: File | null;
  done: boolean;
}

const EMPTY_STEP: ComplianceStepState = {
  skipped: false,
  reference_no: '',
  issued_at: '',
  expires_at: '',
  notes: '',
  pending_file: null,
  done: false,
};

const DEPARTMENTS = [
  'Electrical Installation',
  'Electrical Engineering',
  'Building Services',
  'Plumbing',
  'Construction',
  'Health & Safety',
  'General Studies',
];

const ROLES: { value: StaffRoleValue; label: string }[] = [
  { value: 'tutor', label: 'Tutor' },
  { value: 'head_of_department', label: 'Head of department' },
  { value: 'support', label: 'Support staff' },
  { value: 'admin', label: 'Admin' },
];

const sectionTitleCn = 'text-[15px] font-semibold text-white';
const hintCn = 'mt-1.5 text-[12px] leading-snug text-white';

interface StepDef {
  code: string;
  label: string;
  hint: string;
  validityMonths: number | null;
  /** Only show this step if predicate matches the new staff's role. */
  applies?: (role: StaffRoleValue) => boolean;
}

const COMPLIANCE_STEPS: StepDef[] = [
  {
    code: 'DBS_ENHANCED',
    label: 'Enhanced DBS',
    hint: 'Cert number, issue date, and a scan if you have it. Default validity 36 months. Colleges can renew sooner via the Update Service.',
    validityMonths: 36,
  },
  {
    code: 'RIGHT_TO_WORK',
    label: 'Right to work',
    hint: 'Passport / Settled Status / Share Code verified. No expiry by default. Keep the scan on file.',
    validityMonths: null,
  },
  {
    code: 'REFERENCES',
    label: 'References (×2)',
    hint: 'Confirm both references have been received. Notes can capture referees.',
    validityMonths: null,
  },
  {
    code: 'HEALTH_DECLARATION',
    label: 'Health declaration',
    hint: 'Pre-employment health questionnaire signed and on file.',
    validityMonths: null,
  },
  {
    code: 'DISQUALIFICATION_DECL',
    label: 'Disqualification declaration',
    hint: 'Section 128 / disqualification by association declaration. Renew annually.',
    validityMonths: 12,
  },
  {
    code: 'PROHIBITION_CHECK',
    label: 'Prohibition from teaching (TRA)',
    hint: 'Teaching Regulation Agency check. Only for tutoring roles.',
    validityMonths: null,
    applies: (role) => role === 'tutor' || role === 'head_of_department',
  },
];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function addMonthsIso(iso: string, months: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1 + months, d));
  return date.toISOString().slice(0, 10);
}

function fileExt(filename: string): string {
  const m = filename.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1].toLowerCase() : 'bin';
}

function deriveStatus(expires_at: string): 'valid' | 'expiring' | 'expired' {
  if (!expires_at) return 'valid';
  const exp = new Date(expires_at);
  const today = new Date();
  exp.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const days = Math.round((exp.getTime() - today.getTime()) / 86_400_000);
  if (days < 0) return 'expired';
  if (days <= 60) return 'expiring';
  return 'valid';
}

/* ──────────────────────────────────────────────────────── */

export function StaffOnboardingWizard({ open, onOpenChange, onComplete }: Props) {
  const { toast } = useToast();
  const { isVerifier } = useVerifierAuthority();
  const [stepIndex, setStepIndex] = useState(0);
  const [identity, setIdentity] = useState<IdentityState>({
    name: '',
    email: '',
    phone: '',
    role: 'tutor',
    department: '',
  });
  const [createdStaffId, setCreatedStaffId] = useState<string | null>(null);
  const [steps, setSteps] = useState<Record<string, ComplianceStepState>>(() =>
    Object.fromEntries(COMPLIANCE_STEPS.map((s) => [s.code, { ...EMPTY_STEP }]))
  );
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset on open
  useEffect(() => {
    if (open) {
      setStepIndex(0);
      setIdentity({
        name: '',
        email: '',
        phone: '',
        role: 'tutor',
        department: '',
      });
      setCreatedStaffId(null);
      setSteps(Object.fromEntries(COMPLIANCE_STEPS.map((s) => [s.code, { ...EMPTY_STEP }])));
      setShowSuccess(false);
    }
  }, [open]);

  // Filter steps that apply to this role
  const applicableSteps = useMemo(
    () => COMPLIANCE_STEPS.filter((s) => !s.applies || s.applies(identity.role)),
    [identity.role]
  );

  // 0 = identity, 1..N = compliance, N+1 = done summary
  const totalSlides = 1 + applicableSteps.length + 1;
  const currentStep =
    stepIndex === 0
      ? null
      : stepIndex <= applicableSteps.length
        ? applicableSteps[stepIndex - 1]
        : null;
  const isDoneSlide = stepIndex === totalSlides - 1;

  const updateStep = (code: string, patch: Partial<ComplianceStepState>) =>
    setSteps((prev) => ({
      ...prev,
      [code]: { ...prev[code], ...patch },
    }));

  /* ─── Step 0: Identity ─── */

  const canSubmitIdentity = identity.name.trim().length > 0 && identity.email.trim().length > 0;

  const handleSubmitIdentity = async () => {
    if (!canSubmitIdentity) {
      toast({
        title: 'Name and email required',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    try {
      // Resolve the current user's college so the new staff is RLS-visible
      // and downstream compliance records / evidence uploads pass the
      // _ch_same_college check.
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      let collegeId: string | null = null;
      if (userId) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('college_id')
          .eq('id', userId)
          .maybeSingle();
        // White-glove: acting for a college adds staff to THAT college.
        collegeId = getActingCollegeId() ?? (profile?.college_id as string | null) ?? null;
      }

      const { data: inserted, error: insErr } = await supabase
        .from('college_staff')
        .insert({
          name: identity.name.trim(),
          email: identity.email.trim(),
          phone: identity.phone.trim() || null,
          role: identity.role,
          department: identity.department || null,
          status: 'Active',
          specialisations: [],
          teaching_qual: null,
          assessor_qual: null,
          iqa_qual: null,
          max_teaching_hours: null,
          college_id: collegeId,
          user_id: null,
          photo_url: null,
        })
        .select('id')
        .single();
      if (insErr) throw insErr;
      setCreatedStaffId((inserted as { id: string }).id);
      // Realtime on college_staff publication invalidates the list cache.
      setStepIndex(1);
    } catch (e) {
      toast({
        title: 'Could not create staff',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Compliance step save ─── */

  const saveCurrentComplianceStep = async (skip: boolean) => {
    if (!currentStep || !createdStaffId) return;
    const state = steps[currentStep.code];

    if (skip) {
      updateStep(currentStep.code, { skipped: true, done: false });
      setStepIndex((i) => i + 1);
      return;
    }

    setSubmitting(true);
    try {
      let evidencePath: string | null = null;
      if (state.pending_file) {
        const ext = fileExt(state.pending_file.name);
        const path = `${createdStaffId}/${currentStep.code}-${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('compliance-evidence')
          .upload(path, state.pending_file, { upsert: false });
        if (upErr) throw upErr;
        evidencePath = path;
      }

      const userRes = await supabase.auth.getUser();
      const userId = userRes.data.user?.id ?? null;
      const expiry = state.expires_at;
      const verifying = isVerifier; // admin onboarding generally verifies as they go
      const status = !verifying ? 'pending_verification' : deriveStatus(expiry);

      const { error: upsertErr } = await supabase.from('staff_compliance_records').upsert(
        {
          college_staff_id: createdStaffId,
          requirement_code: currentStep.code,
          issued_at: state.issued_at || null,
          expires_at: expiry || null,
          reference_no: state.reference_no.trim() || null,
          evidence_path: evidencePath,
          status,
          notes: state.notes.trim() || null,
          verified_by: verifying ? userId : null,
          verified_at: verifying ? new Date().toISOString() : null,
          created_by: userId,
        },
        { onConflict: 'college_staff_id,requirement_code' }
      );
      if (upsertErr) throw upsertErr;

      updateStep(currentStep.code, { done: true, skipped: false });
      setStepIndex((i) => i + 1);
    } catch (e) {
      toast({
        title: 'Save failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Done slide ─── */

  const handleFinish = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onOpenChange(false);
      if (createdStaffId) onComplete?.(createdStaffId);
    }, 600);
  };

  /* ─── Render ─── */

  const progressPct = Math.round((stepIndex / (totalSlides - 1)) * 100);

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 pt-5 lg:grid-cols-[minmax(0,1fr)_20rem]"
        eyebrow={
          stepIndex === 0
            ? `Onboard a new starter · Step 1 of ${totalSlides - 1}`
            : isDoneSlide
              ? 'Onboarding complete'
              : `Compliance · Step ${stepIndex + 1} of ${totalSlides - 1}`
        }
        title={
          stepIndex === 0
            ? 'Who are we adding?'
            : isDoneSlide
              ? `${identity.name.split(' ')[0] || 'Done'} is set up`
              : (currentStep?.label ?? '')
        }
        description={
          stepIndex === 0
            ? 'Identity first. Compliance steps follow.'
            : isDoneSlide
              ? 'Review what was captured. Anything skipped can be picked up later from the vault.'
              : currentStep?.hint
        }
        subheader={
          <div className="pb-3">
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-elec-yellow transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        }
        footer={
          stepIndex === 0 ? (
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
                className={buttonSecondaryCn}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitIdentity}
                disabled={!canSubmitIdentity || submitting}
                className={buttonPrimaryCn}
              >
                {submitting ? 'Creating…' : 'Continue'}
              </button>
            </div>
          ) : isDoneSlide ? (
            <button type="button" onClick={handleFinish} className={cn(buttonPrimaryCn, 'w-full')}>
              Open their vault
            </button>
          ) : (
            <div className="grid grid-cols-[auto_1fr_1fr] gap-2.5">
              <button
                type="button"
                onClick={() => stepIndex > 1 && setStepIndex((i) => i - 1)}
                disabled={submitting || stepIndex <= 1}
                className={cn(buttonSecondaryCn, 'px-4')}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => saveCurrentComplianceStep(true)}
                disabled={submitting}
                className={buttonSecondaryCn}
              >
                Skip
              </button>
              <button
                type="button"
                onClick={() => saveCurrentComplianceStep(false)}
                disabled={submitting}
                className={buttonPrimaryCn}
              >
                {submitting ? 'Saving…' : 'Save and next'}
              </button>
            </div>
          )
        }
      >
        <div className="min-w-0 space-y-6">
          {stepIndex === 0 ? (
            <IdentityForm identity={identity} onChange={setIdentity} />
          ) : isDoneSlide ? (
            <DoneSummary identity={identity} steps={steps} applicableSteps={applicableSteps} />
          ) : currentStep ? (
            <ComplianceStepForm
              key={currentStep.code}
              step={currentStep}
              state={steps[currentStep.code]}
              onChange={(patch) => updateStep(currentStep.code, patch)}
              isVerifier={isVerifier}
            />
          ) : null}
        </div>

        <aside className="hidden lg:block lg:border-l lg:border-white/[0.08] lg:pl-8">
          <h3 className={sectionTitleCn}>Steps</h3>
          <ol className="mt-3 space-y-0.5">
            {[{ code: '__identity', label: 'Identity' }, ...applicableSteps].map((s, i) => {
              const st = s.code === '__identity' ? null : steps[s.code];
              const isCurrent = i === stepIndex;
              const done = s.code === '__identity' ? !!createdStaffId : !!st?.done;
              const skipped = !!st?.skipped;
              return (
                <li
                  key={s.code}
                  className={cn(
                    'flex items-baseline justify-between gap-3 border-b border-white/[0.06] py-2.5 text-[13.5px] last:border-b-0',
                    isCurrent ? 'font-semibold text-elec-yellow' : 'text-white'
                  )}
                >
                  <span className="min-w-0 truncate">
                    <span className="mr-2 tabular-nums">{i + 1}.</span>
                    {s.label}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[12px] font-medium',
                      done ? 'text-emerald-400' : skipped ? 'text-orange-300' : 'text-white'
                    )}
                  >
                    {done ? 'Done' : skipped ? 'Skipped' : isCurrent ? 'Now' : ''}
                  </span>
                </li>
              );
            })}
          </ol>
        </aside>
      </FormSheet>
      <SuccessCheckmark show={showSuccess} />
    </>
  );
}

/* ──────────────────────────────────────────────────────── */

function IdentityForm({
  identity,
  onChange,
}: {
  identity: IdentityState;
  onChange: (next: IdentityState) => void;
}) {
  const update = (patch: Partial<IdentityState>) => onChange({ ...identity, ...patch });

  return (
    <section className="space-y-5">
      <div>
        <label className={labelCn} htmlFor="sow-name">
          Full name *
        </label>
        <input
          id="sow-name"
          value={identity.name}
          onChange={(e) => update({ name: e.target.value })}
          className={inputCn}
          placeholder="e.g. Sarah Patel"
          autoFocus
        />
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div>
          <label className={labelCn} htmlFor="sow-email">
            Email *
          </label>
          <input
            id="sow-email"
            type="email"
            value={identity.email}
            onChange={(e) => update({ email: e.target.value })}
            className={inputCn}
            placeholder="sarah.patel@college.ac.uk"
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="sow-phone">
            Phone
          </label>
          <input
            id="sow-phone"
            type="tel"
            value={identity.phone}
            onChange={(e) => update({ phone: e.target.value })}
            className={inputCn}
          />
        </div>
      </div>
      <div>
        <p className={labelCn}>Role</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Role">
          {ROLES.map((r) => (
            <button
              key={r.value}
              type="button"
              aria-pressed={identity.role === r.value}
              onClick={() => update({ role: r.value })}
              className={chipCn(identity.role === r.value)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className="sm:max-w-md">
        <p className={labelCn}>Department</p>
        <MobileSelectPicker
          value={identity.department}
          onValueChange={(v) => update({ department: v })}
          options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
          title="Department"
          placeholder="Select…"
          triggerClassName={selectTriggerCn}
        />
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────── */

function ComplianceStepForm({
  step,
  state,
  onChange,
  isVerifier,
}: {
  step: StepDef;
  state: ComplianceStepState;
  onChange: (patch: Partial<ComplianceStepState>) => void;
  isVerifier: boolean;
}) {
  const autofillExpiry = () => {
    if (!step.validityMonths || !state.issued_at) return;
    onChange({
      expires_at: addMonthsIso(state.issued_at, step.validityMonths),
    });
  };

  return (
    <>
      <section className="space-y-4">
        <h3 className={sectionTitleCn}>Details</h3>
        <div>
          <label className={labelCn} htmlFor="sow-ref">
            Reference or certificate number
          </label>
          <input
            id="sow-ref"
            value={state.reference_no}
            onChange={(e) => onChange({ reference_no: e.target.value })}
            className={inputCn}
            placeholder="—"
          />
          <p className={hintCn}>DBS cert no, share code, certificate ID, etc.</p>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-6">
          <div>
            <label className={labelCn} htmlFor="sow-issued">
              Issued or verified date
            </label>
            <input
              id="sow-issued"
              type="date"
              value={state.issued_at}
              max={todayIso()}
              onChange={(e) => onChange({ issued_at: e.target.value })}
              onBlur={() => {
                if (!state.expires_at) autofillExpiry();
              }}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="sow-expires">
              Expiry date
            </label>
            <input
              id="sow-expires"
              type="date"
              value={state.expires_at}
              min={state.issued_at || undefined}
              onChange={(e) => onChange({ expires_at: e.target.value })}
              className={inputCn}
            />
            <p className={hintCn}>
              {step.validityMonths ? `Default validity ${step.validityMonths} months` : 'No expiry'}
            </p>
          </div>
        </div>
        {step.validityMonths && state.issued_at && (
          <button
            type="button"
            onClick={autofillExpiry}
            className="h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Use default expiry ({step.validityMonths} months)
          </button>
        )}
      </section>

      <section className="space-y-3 border-t border-white/[0.08] pt-5">
        <h3 className={sectionTitleCn}>Evidence</h3>
        <FileDrop file={state.pending_file} onChange={(file) => onChange({ pending_file: file })} />
      </section>

      <section className="space-y-2 border-t border-white/[0.08] pt-5">
        <label className={labelCn} htmlFor="sow-notes">
          Anything to flag for an inspector?
        </label>
        <textarea
          id="sow-notes"
          value={state.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          rows={3}
          className={cn(textareaCn, 'min-h-[70px]')}
          placeholder="e.g. references received from Acme Ltd and Northgate Academy"
        />
        <p className={hintCn}>
          {isVerifier
            ? "You're signing this off as you save it (you have verifier authority)."
            : 'A DSL or admin will verify this once saved.'}
        </p>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────────────── */

function FileDrop({
  file,
  onChange,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
}) {
  const { toast } = useToast();
  const [dragOver, setDragOver] = useState(false);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  const onPick = (f: File | null) => {
    if (!f) return;
    if (f.size > 25 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Max 25MB.',
        variant: 'destructive',
      });
      return;
    }
    onChange(f);
  };

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        onPick(e.dataTransfer.files?.[0] ?? null);
      }}
      className={cn(
        'rounded-xl border border-dashed px-4 py-4 transition-colors touch-manipulation',
        dragOver ? 'border-elec-yellow bg-white/[0.05]' : 'border-white/[0.15]'
      )}
    >
      {file ? (
        <div className="flex items-center gap-3 text-left">
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-medium text-white">{file.name}</div>
            <div className="text-[12px] tabular-nums text-emerald-400">
              {file.size < 1024 * 1024
                ? `${(file.size / 1024).toFixed(1)} KB`
                : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="h-11 shrink-0 text-[13px] font-medium text-white hover:text-red-300 touch-manipulation"
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef?.click()}
          className="flex w-full items-center justify-between gap-3 text-left touch-manipulation"
        >
          <span className="min-w-0">
            <span className="block text-[14px] text-white">Drop a file here or choose one</span>
            <span className="mt-0.5 block text-[12px] text-white">
              PDF, JPG, PNG · max 25MB · stored privately
            </span>
          </span>
          <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">Choose</span>
        </button>
      )}
      <input
        ref={setInputRef}
        type="file"
        className="hidden"
        accept="application/pdf,image/*"
        onChange={(e) => {
          onPick(e.target.files?.[0] ?? null);
          e.target.value = '';
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function DoneSummary({
  identity,
  steps,
  applicableSteps,
}: {
  identity: IdentityState;
  steps: Record<string, ComplianceStepState>;
  applicableSteps: StepDef[];
}) {
  const captured = applicableSteps.filter((s) => steps[s.code]?.done);
  const skipped = applicableSteps.filter((s) => steps[s.code]?.skipped);

  return (
    <>
      <section>
        <h3 className={sectionTitleCn}>Identity</h3>
        <div className="mt-2 text-[15px] font-medium text-white">{identity.name}</div>
        <div className="mt-0.5 text-[13px] text-white">
          {ROLES.find((r) => r.value === identity.role)?.label ?? identity.role}
          {identity.department && ` · ${identity.department}`}
          {' · '}
          {identity.email}
        </div>
      </section>

      <section className="border-t border-white/[0.08] pt-5">
        <h3 className={sectionTitleCn}>Captured ({captured.length})</h3>
        {captured.length === 0 ? (
          <p className="mt-2 text-[13px] text-white">
            Nothing captured during onboarding. Everything is left for later.
          </p>
        ) : (
          <ul className="mt-2">
            {captured.map((s) => (
              <li
                key={s.code}
                className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] py-2.5 text-[14px] text-white last:border-b-0"
              >
                {s.label}
                <span className="text-[12px] font-medium text-emerald-400">Recorded</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {skipped.length > 0 && (
        <section className="border-t border-white/[0.08] pt-5">
          <h3 className={sectionTitleCn}>Skipped ({skipped.length})</h3>
          <p className="mt-1 text-[13px] text-white">
            These will show as missing in the vault. Open the staff drawer any time to add them.
          </p>
          <ul className="mt-2">
            {skipped.map((s) => (
              <li
                key={s.code}
                className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] py-2.5 text-[14px] text-white last:border-b-0"
              >
                {s.label}
                <span className="text-[12px] font-medium text-orange-300">Skipped</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
