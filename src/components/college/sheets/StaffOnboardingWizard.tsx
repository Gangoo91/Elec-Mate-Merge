import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Field,
  FormCard,
  FormGrid,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  SuccessCheckmark,
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useVerifierAuthority } from '@/hooks/useVerifierAuthority';

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
    hint: 'Cert number, issue date, and a scan if you have it. Default validity 36 months — colleges can renew sooner via the Update Service.',
    validityMonths: 36,
  },
  {
    code: 'RIGHT_TO_WORK',
    label: 'Right to Work',
    hint: 'Passport / Settled Status / Share Code verified. No expiry by default — keep the scan on file.',
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
    label: 'Health Declaration',
    hint: 'Pre-employment health questionnaire signed and on file.',
    validityMonths: null,
  },
  {
    code: 'DISQUALIFICATION_DECL',
    label: 'Disqualification Declaration',
    hint: 'Section 128 / disqualification by association declaration. Renew annually.',
    validityMonths: 12,
  },
  {
    code: 'PROHIBITION_CHECK',
    label: 'Prohibition from Teaching (TRA)',
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
        collegeId = (profile?.college_id as string | null) ?? null;
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:h-[88vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow={
            stepIndex === 0
              ? 'Onboard a new starter · Step 1'
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
          footer={
            stepIndex === 0 ? (
              <>
                <SecondaryButton
                  fullWidth
                  onClick={() => onOpenChange(false)}
                  disabled={submitting}
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  fullWidth
                  onClick={handleSubmitIdentity}
                  disabled={!canSubmitIdentity || submitting}
                >
                  {submitting ? 'Creating…' : 'Continue →'}
                </PrimaryButton>
              </>
            ) : isDoneSlide ? (
              <PrimaryButton fullWidth onClick={handleFinish}>
                Open their vault →
              </PrimaryButton>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => stepIndex > 1 && setStepIndex((i) => i - 1)}
                  disabled={submitting || stepIndex <= 1}
                  className="h-12 px-4 rounded-xl border border-white/[0.08] text-[12.5px] font-medium text-white/65 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:text-white/65 shrink-0"
                >
                  ← Back
                </button>
                <SecondaryButton
                  fullWidth
                  onClick={() => saveCurrentComplianceStep(true)}
                  disabled={submitting}
                >
                  Skip
                </SecondaryButton>
                <PrimaryButton
                  fullWidth
                  onClick={() => saveCurrentComplianceStep(false)}
                  disabled={submitting}
                >
                  {submitting ? 'Saving…' : 'Save & next →'}
                </PrimaryButton>
              </>
            )
          }
        >
          {/* Progress bar */}
          <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {stepIndex === 0 ? (
            <IdentityForm identity={identity} onChange={setIdentity} />
          ) : isDoneSlide ? (
            <DoneSummary identity={identity} steps={steps} applicableSteps={applicableSteps} />
          ) : currentStep ? (
            <ComplianceStepForm
              step={currentStep}
              state={steps[currentStep.code]}
              onChange={(patch) => updateStep(currentStep.code, patch)}
              isVerifier={isVerifier}
            />
          ) : null}
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
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
    <FormCard eyebrow="Identity">
      <Field label="Full name" required>
        <input
          value={identity.name}
          onChange={(e) => update({ name: e.target.value })}
          className={inputClass}
          placeholder="e.g. Sarah Patel"
          autoFocus
        />
      </Field>
      <FormGrid cols={2}>
        <Field label="Email" required>
          <input
            type="email"
            value={identity.email}
            onChange={(e) => update({ email: e.target.value })}
            className={inputClass}
            placeholder="sarah.patel@college.ac.uk"
          />
        </Field>
        <Field label="Phone">
          <input
            type="tel"
            value={identity.phone}
            onChange={(e) => update({ phone: e.target.value })}
            className={inputClass}
          />
        </Field>
      </FormGrid>
      <FormGrid cols={2}>
        <Field label="Role">
          <Select
            value={identity.role}
            onValueChange={(v) => update({ role: v as StaffRoleValue })}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem value="tutor">Tutor</SelectItem>
              <SelectItem value="head_of_department">Head of department</SelectItem>
              <SelectItem value="support">Support staff</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Department">
          <Select value={identity.department} onValueChange={(v) => update({ department: v })}>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              {DEPARTMENTS.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </FormGrid>
    </FormCard>
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
      <FormCard eyebrow="Details">
        <Field label="Reference / cert number" hint="DBS cert no, share code, certificate ID, etc.">
          <input
            value={state.reference_no}
            onChange={(e) => onChange({ reference_no: e.target.value })}
            className={inputClass}
            placeholder="—"
          />
        </Field>
        <FormGrid cols={2}>
          <Field label="Issued / verified date">
            <input
              type="date"
              value={state.issued_at}
              max={todayIso()}
              onChange={(e) => onChange({ issued_at: e.target.value })}
              onBlur={() => {
                if (!state.expires_at) autofillExpiry();
              }}
              className={inputClass}
            />
          </Field>
          <Field
            label="Expiry date"
            hint={
              step.validityMonths ? `Default validity ${step.validityMonths} months` : 'No expiry'
            }
          >
            <input
              type="date"
              value={state.expires_at}
              min={state.issued_at || undefined}
              onChange={(e) => onChange({ expires_at: e.target.value })}
              className={inputClass}
            />
          </Field>
        </FormGrid>
        {step.validityMonths && state.issued_at && (
          <button
            type="button"
            onClick={autofillExpiry}
            className="text-[11.5px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            Use default expiry ({step.validityMonths} mo) →
          </button>
        )}
      </FormCard>

      <FormCard eyebrow="Evidence">
        <FileDrop file={state.pending_file} onChange={(file) => onChange({ pending_file: file })} />
      </FormCard>

      <FormCard eyebrow="Notes">
        <Field
          label="Anything to flag for an inspector?"
          hint={
            isVerifier
              ? "You're signing this off as you save it (you have verifier authority)."
              : 'A DSL or admin will verify this once saved.'
          }
        >
          <textarea
            value={state.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            rows={3}
            className={cn(textareaClass, 'min-h-[70px]')}
            placeholder="e.g. references received from Acme Ltd and Northgate Academy"
          />
        </Field>
      </FormCard>
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
        'border border-dashed rounded-xl px-4 py-4 text-center transition-colors touch-manipulation',
        dragOver
          ? 'border-elec-yellow/60 bg-elec-yellow/[0.04]'
          : 'border-white/[0.12] bg-[hsl(0_0%_9%)]'
      )}
    >
      {file ? (
        <div className="flex items-center gap-3 text-left">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
            <span aria-hidden className="text-[13px]">
              📄
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-white truncate">{file.name}</div>
            <div className="text-[10.5px] text-white/55 tabular-nums">
              {file.size < 1024 * 1024
                ? `${(file.size / 1024).toFixed(1)} KB`
                : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-[11.5px] font-medium text-white/65 hover:text-red-300 transition-colors touch-manipulation"
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <div className="text-[12px] text-white">
            Drop a file or
            <button
              type="button"
              onClick={() => inputRef?.click()}
              className="ml-1 font-medium text-elec-yellow hover:text-elec-yellow/80 underline-offset-2 hover:underline touch-manipulation"
            >
              browse
            </button>
          </div>
          <div className="mt-1 text-[10.5px] text-white/55">
            PDF, JPG, PNG · max 25MB · stored privately
          </div>
        </>
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
      <FormCard eyebrow="Identity">
        <div className="text-[14.5px] font-medium text-white">{identity.name}</div>
        <div className="text-[11.5px] text-white/65">
          <span className="capitalize">{identity.role.replace(/_/g, ' ')}</span>
          {identity.department && ` · ${identity.department}`}
          {' · '}
          {identity.email}
        </div>
      </FormCard>

      <FormCard eyebrow={`Captured · ${captured.length}`}>
        {captured.length === 0 ? (
          <p className="text-[11.5px] text-white/55">
            Nothing captured during onboarding — everything's left for later.
          </p>
        ) : (
          <div className="space-y-1.5">
            {captured.map((s) => (
              <div key={s.code} className="flex items-center gap-2 text-[12.5px] text-white">
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold"
                >
                  ✓
                </span>
                {s.label}
              </div>
            ))}
          </div>
        )}
      </FormCard>

      {skipped.length > 0 && (
        <FormCard eyebrow={`Skipped · ${skipped.length}`}>
          <p className="text-[11.5px] text-white/65 mb-2">
            These will show as "Missing" in the vault. Open the staff drawer anytime to add them.
          </p>
          <div className="space-y-1.5">
            {skipped.map((s) => (
              <div key={s.code} className="flex items-center gap-2 text-[12.5px] text-white/80">
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold"
                >
                  ·
                </span>
                {s.label}
              </div>
            ))}
          </div>
        </FormCard>
      )}
    </>
  );
}
