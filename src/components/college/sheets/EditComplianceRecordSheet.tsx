import { useEffect, useMemo, useRef, useState } from 'react';
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
import type { RequirementType, VaultRow } from '@/hooks/useStaffComplianceVault';
import { useVerifierAuthority } from '@/hooks/useVerifierAuthority';

/* ==========================================================================
   EditComplianceRecordSheet — add OR edit a single staff_compliance_records
   row with optional file upload to compliance-evidence bucket.
   Mobile-first 90vh bottom sheet, same chrome as the rest of the college hub.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffId: string;
  staffName: string;
  /** Pre-selected row to edit (record may be null for add-with-context). */
  initialItem: VaultRow | null;
  /** Types not yet recorded — used when initialItem is null (blank-add picker). */
  availableTypes: RequirementType[];
  /** Called on successful save. */
  onSaved?: () => void;
}

interface FormState {
  requirement_code: string;
  reference_no: string;
  issued_at: string;
  expires_at: string;
  notes: string;
  mark_verified: boolean;
  /** Locally-selected file before upload. */
  pending_file: File | null;
  /** Existing evidence_path from a saved record (if editing). */
  existing_evidence_path: string | null;
  /** Toggled on if the user removes the existing evidence. */
  remove_existing_evidence: boolean;
}

const EMPTY: FormState = {
  requirement_code: '',
  reference_no: '',
  issued_at: '',
  expires_at: '',
  notes: '',
  mark_verified: false,
  pending_file: null,
  existing_evidence_path: null,
  remove_existing_evidence: false,
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function addMonthsIso(iso: string, months: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1 + months, d));
  return date.toISOString().slice(0, 10);
}

function deriveStatus(
  issuedAt: string,
  expiresAt: string
): 'valid' | 'expiring' | 'expired' | 'pending' {
  if (!issuedAt && !expiresAt) return 'pending';
  if (!expiresAt) return 'valid';
  const expDate = new Date(expiresAt);
  const todayDate = new Date();
  expDate.setHours(0, 0, 0, 0);
  todayDate.setHours(0, 0, 0, 0);
  const days = Math.round((expDate.getTime() - todayDate.getTime()) / 86_400_000);
  if (days < 0) return 'expired';
  if (days <= 60) return 'expiring';
  return 'valid';
}

interface ValidationResult {
  ok: boolean;
  message?: string;
}

function validateDates(issuedAt: string, expiresAt: string): ValidationResult {
  const today = todayIso();
  if (issuedAt && issuedAt > today) {
    return { ok: false, message: "Issued date can't be in the future." };
  }
  if (issuedAt && expiresAt && expiresAt < issuedAt) {
    return { ok: false, message: 'Expiry date must be on or after the issued date.' };
  }
  return { ok: true };
}

function fileExt(filename: string): string {
  const m = filename.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1].toLowerCase() : 'bin';
}

function humanFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ──────────────────────────────────────────────────────── */

export function EditComplianceRecordSheet({
  open,
  onOpenChange,
  staffId,
  staffName,
  initialItem,
  availableTypes,
  onSaved,
}: Props) {
  const { toast } = useToast();
  const { isVerifier } = useVerifierAuthority();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [allTypesIfNoneAvailable, setAllTypesIfNoneAvailable] = useState<RequirementType[]>([]);

  const isEdit = !!initialItem?.record;
  const lockedType = !!initialItem; // true when opened from a row (existing or add)
  const pickerTypes = availableTypes.length > 0 ? availableTypes : allTypesIfNoneAvailable;

  // When sheet opens, prefill from initialItem.
  useEffect(() => {
    if (!open) return;
    setShowSuccess(false);
    if (initialItem) {
      const r = initialItem.record;
      setForm({
        requirement_code: initialItem.type.code,
        reference_no: r?.reference_no ?? '',
        issued_at: r?.issued_at ?? '',
        expires_at: r?.expires_at ?? '',
        notes: r?.notes ?? '',
        mark_verified: !!r?.verified_at,
        pending_file: null,
        existing_evidence_path: r?.evidence_path ?? null,
        remove_existing_evidence: false,
      });
    } else {
      setForm(EMPTY);
    }
  }, [open, initialItem]);

  // If picker mode and no available types, fetch all types as fallback so
  // the dropdown isn't empty. (Edge case: every requirement already recorded.)
  useEffect(() => {
    if (!open || initialItem || availableTypes.length > 0) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('compliance_requirement_types')
        .select(
          'code, label, description, category, default_validity_months, applies_to_role, is_scr_required, sort_order'
        )
        .eq('is_active', true)
        .order('sort_order');
      if (!cancelled && data) {
        setAllTypesIfNoneAvailable(data as RequirementType[]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, initialItem, availableTypes.length]);

  const selectedType = useMemo(() => {
    if (initialItem) return initialItem.type;
    return pickerTypes.find((t) => t.code === form.requirement_code) ?? null;
  }, [initialItem, pickerTypes, form.requirement_code]);

  // Auto-fill expiry when issued_at changes (only if not previously set or
  // user hasn't edited expiry independently).
  const autofillExpiry = () => {
    if (!selectedType?.default_validity_months) return;
    if (!form.issued_at) return;
    const next = addMonthsIso(form.issued_at, selectedType.default_validity_months);
    setForm((p) => ({ ...p, expires_at: next }));
  };

  const update = (patch: Partial<FormState>) => setForm((p) => ({ ...p, ...patch }));

  /* ─── File upload handlers ─── */

  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onPickFile = (file: File | null) => {
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Max 25MB per evidence file. Compress or trim and try again.',
        variant: 'destructive',
      });
      return;
    }
    update({ pending_file: file, remove_existing_evidence: false });
  };

  const removeAttached = () => {
    if (form.pending_file) {
      update({ pending_file: null });
    } else if (form.existing_evidence_path) {
      update({ remove_existing_evidence: true });
    }
  };

  const viewEvidence = async () => {
    if (!form.existing_evidence_path) return;
    const { data, error } = await supabase.storage
      .from('compliance-evidence')
      .createSignedUrl(form.existing_evidence_path, 60);
    if (error || !data?.signedUrl) {
      toast({
        title: 'Could not open evidence',
        description: error?.message ?? 'Try again in a moment.',
        variant: 'destructive',
      });
      return;
    }
    window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
  };

  // Local thumbnail for newly-attached image files
  const [localThumb, setLocalThumb] = useState<string | null>(null);
  useEffect(() => {
    if (!form.pending_file || !form.pending_file.type.startsWith('image/')) {
      setLocalThumb(null);
      return;
    }
    const url = URL.createObjectURL(form.pending_file);
    setLocalThumb(url);
    return () => URL.revokeObjectURL(url);
  }, [form.pending_file]);

  /* ─── Save ─── */

  const handleSave = async () => {
    if (!selectedType) {
      toast({
        title: 'Pick a requirement',
        description: 'Choose which compliance item you want to record.',
        variant: 'destructive',
      });
      return;
    }
    const dateCheck = validateDates(form.issued_at, form.expires_at);
    if (!dateCheck.ok) {
      toast({
        title: 'Check the dates',
        description: dateCheck.message,
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);

    try {
      // 1. Upload new file if selected
      let evidencePath: string | null = form.existing_evidence_path;
      if (form.remove_existing_evidence) {
        evidencePath = null;
      }
      if (form.pending_file) {
        const ext = fileExt(form.pending_file.name);
        const newPath = `${staffId}/${selectedType.code}-${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from('compliance-evidence')
          .upload(newPath, form.pending_file, { upsert: false });
        if (uploadErr) throw uploadErr;
        evidencePath = newPath;
      }

      // 2. Upsert record (UNIQUE on staff_id + requirement_code)
      const userRes = await supabase.auth.getUser();
      const userId = userRes.data.user?.id ?? null;

      // Verification gate — non-verifiers can never sign records off,
      // regardless of the toggle state. This closes the "tutor self-verifies
      // own DBS" audit gap.
      const verifying = isVerifier && form.mark_verified;
      const hasData = !!form.issued_at || !!form.expires_at;
      const status =
        !verifying && hasData
          ? 'pending_verification'
          : deriveStatus(form.issued_at, form.expires_at);

      const payload = {
        college_staff_id: staffId,
        requirement_code: selectedType.code,
        issued_at: form.issued_at || null,
        expires_at: form.expires_at || null,
        reference_no: form.reference_no.trim() || null,
        evidence_path: evidencePath,
        status,
        notes: form.notes.trim() || null,
        verified_by: verifying ? userId : null,
        verified_at: verifying ? new Date().toISOString() : null,
        created_by: isEdit ? undefined : userId,
      };

      const { error: upsertErr } = await supabase
        .from('staff_compliance_records')
        .upsert(payload, { onConflict: 'college_staff_id,requirement_code' });
      if (upsertErr) throw upsertErr;

      // 3. Cleanup: if we uploaded new + had old, delete old. If user
      // removed existing without replacement, delete the old file too.
      const oldPath = form.existing_evidence_path;
      const replacingFile = !!form.pending_file && !!oldPath;
      const removingFile = form.remove_existing_evidence && !!oldPath;
      if (oldPath && (replacingFile || removingFile)) {
        await supabase.storage.from('compliance-evidence').remove([oldPath]);
      }

      setShowSuccess(true);
      toast({
        title: isEdit ? 'Record updated' : 'Record saved',
        description: `${selectedType.label} recorded for ${staffName}.`,
      });
      onSaved?.();
      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 700);
    } catch (e) {
      console.error('Compliance save failed', e);
      toast({
        title: 'Save failed',
        description: (e as Error).message ?? 'Try again or contact support.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const recordId = initialItem?.record?.id;
    if (!recordId) return;
    const confirmed = window.confirm(
      `Delete the ${selectedType?.label ?? 'compliance'} record for ${staffName}? This is logged in the audit trail and cannot be undone from here.`
    );
    if (!confirmed) return;
    setSubmitting(true);
    try {
      const oldPath = form.existing_evidence_path;
      const { error: delErr } = await supabase
        .from('staff_compliance_records')
        .delete()
        .eq('id', recordId);
      if (delErr) throw delErr;
      if (oldPath) {
        await supabase.storage.from('compliance-evidence').remove([oldPath]);
      }
      toast({
        title: 'Record deleted',
        description: 'The audit log has captured this change.',
      });
      onSaved?.();
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Delete failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Render ─── */

  const attachedLabel =
    form.pending_file?.name ??
    (form.existing_evidence_path && !form.remove_existing_evidence
      ? (form.existing_evidence_path.split('/').pop() ?? 'Existing evidence')
      : null);

  const attachedSize = form.pending_file ? humanFileSize(form.pending_file.size) : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:h-[88vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow={isEdit ? 'Edit record' : 'Add record'}
          title={selectedType?.label ?? 'Compliance record'}
          description={`For ${staffName}`}
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)} disabled={submitting}>
                Cancel
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={handleSave} disabled={submitting || !selectedType}>
                {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Save record →'}
              </PrimaryButton>
            </>
          }
        >
          {!lockedType && (
            <FormCard eyebrow="Requirement">
              <Field label="Choose what you're recording" required>
                <Select
                  value={form.requirement_code}
                  onValueChange={(v) => update({ requirement_code: v })}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Pick a requirement…" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {(['statutory', 'qualification', 'training', 'declaration'] as const).map(
                      (cat) => {
                        const inCat = pickerTypes.filter((t) => t.category === cat);
                        if (inCat.length === 0) return null;
                        return (
                          <div key={cat}>
                            <div className="px-3 pt-2.5 pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                              {cat === 'statutory'
                                ? 'Statutory'
                                : cat === 'qualification'
                                  ? 'Qualifications'
                                  : cat === 'training'
                                    ? 'Training'
                                    : 'Declarations'}
                            </div>
                            {inCat.map((t) => (
                              <SelectItem key={t.code} value={t.code}>
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-[13px]">
                                    {t.label}
                                    {t.is_scr_required && (
                                      <span className="ml-1.5 text-[9.5px] tracking-[0.06em] uppercase text-white">
                                        SCR
                                      </span>
                                    )}
                                  </span>
                                  {t.default_validity_months && (
                                    <span className="text-[10.5px] text-white tabular-nums">
                                      Renews every {t.default_validity_months} mo
                                    </span>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </div>
                        );
                      }
                    )}
                  </SelectContent>
                </Select>
              </Field>
              {selectedType?.description && (
                <p className="text-[11px] text-white leading-snug">{selectedType.description}</p>
              )}
            </FormCard>
          )}

          {selectedType && (
            <>
              <FormCard eyebrow="Details">
                <Field
                  label="Reference number"
                  hint="e.g. DBS certificate number, qualification cert ID"
                >
                  <input
                    value={form.reference_no}
                    onChange={(e) => update({ reference_no: e.target.value })}
                    className={inputClass}
                    placeholder="—"
                  />
                </Field>
                <FormGrid cols={2}>
                  <Field label="Issued date">
                    <input
                      type="date"
                      value={form.issued_at}
                      max={todayIso()}
                      onChange={(e) => update({ issued_at: e.target.value })}
                      onBlur={() => {
                        if (!form.expires_at) autofillExpiry();
                      }}
                      className={inputClass}
                    />
                  </Field>
                  <Field
                    label="Expiry date"
                    hint={
                      selectedType.default_validity_months
                        ? `Default validity ${selectedType.default_validity_months} months`
                        : undefined
                    }
                  >
                    <input
                      type="date"
                      value={form.expires_at}
                      min={form.issued_at || undefined}
                      onChange={(e) => update({ expires_at: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                </FormGrid>
                {(() => {
                  const v = validateDates(form.issued_at, form.expires_at);
                  if (v.ok) return null;
                  return <p className="text-[11.5px] text-red-300 leading-snug">{v.message}</p>;
                })()}
                {selectedType.default_validity_months && form.issued_at && (
                  <button
                    type="button"
                    onClick={autofillExpiry}
                    className="text-[11.5px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors touch-manipulation"
                  >
                    Use default expiry ({selectedType.default_validity_months} mo) →
                  </button>
                )}
              </FormCard>

              <FormCard eyebrow="Evidence file">
                <div
                  ref={dropZoneRef}
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
                    onPickFile(e.dataTransfer.files?.[0] ?? null);
                  }}
                  className={cn(
                    'border border-dashed rounded-xl px-4 py-5 text-center transition-colors touch-manipulation',
                    dragOver
                      ? 'border-elec-yellow/60 bg-elec-yellow/[0.04]'
                      : 'border-white/[0.12] bg-[hsl(0_0%_9%)]'
                  )}
                >
                  {attachedLabel ? (
                    <div className="flex items-center gap-3 text-left">
                      {localThumb ? (
                        <img
                          src={localThumb}
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover border border-emerald-500/30 shrink-0"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                          <span aria-hidden className="text-[14px]">
                            📄
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-medium text-white truncate">
                          {attachedLabel}
                        </div>
                        <div className="text-[11px] text-white tabular-nums">
                          {form.pending_file ? `New · ${attachedSize}` : 'On file'}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {!form.pending_file && form.existing_evidence_path && (
                          <button
                            type="button"
                            onClick={viewEvidence}
                            className="text-[11.5px] font-medium text-elec-yellow/85 hover:text-elec-yellow transition-colors touch-manipulation"
                          >
                            View
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={removeAttached}
                          className="text-[11.5px] font-medium text-white/65 hover:text-red-300 transition-colors touch-manipulation"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-[12.5px] text-white">
                        Drop a file or
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="ml-1 font-medium text-elec-yellow hover:text-elec-yellow/80 underline-offset-2 hover:underline touch-manipulation"
                        >
                          browse
                        </button>
                      </div>
                      <div className="mt-1 text-[10.5px] text-white">
                        PDF, JPG, PNG · max 25MB · stored privately per college
                      </div>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="application/pdf,image/*"
                    onChange={(e) => {
                      onPickFile(e.target.files?.[0] ?? null);
                      e.target.value = '';
                    }}
                  />
                </div>
              </FormCard>

              <FormCard eyebrow="Notes & verification">
                <Field
                  label="Notes (optional)"
                  hint="e.g. issuing body, course provider, conditions"
                >
                  <textarea
                    value={form.notes}
                    onChange={(e) => update({ notes: e.target.value })}
                    rows={3}
                    className={cn(textareaClass, 'min-h-[80px]')}
                    placeholder="Anything an Ofsted inspector would want to see at a glance"
                  />
                </Field>
                {isVerifier ? (
                  <label className="flex items-center gap-3 cursor-pointer touch-manipulation py-1.5">
                    <input
                      type="checkbox"
                      checked={form.mark_verified}
                      onChange={(e) => update({ mark_verified: e.target.checked })}
                      className="h-4 w-4 rounded border-white/20 bg-[hsl(0_0%_9%)] checked:bg-elec-yellow"
                    />
                    <span className="text-[12.5px] text-white">
                      Mark as verified
                      <span className="block text-[10.5px] text-white/55 mt-0.5">
                        You're signing this off. Logged with your name + timestamp.
                      </span>
                    </span>
                  </label>
                ) : (
                  <div className="rounded-xl border border-blue-500/25 bg-blue-500/[0.04] px-4 py-3 text-[11.5px] text-blue-200/85 leading-relaxed">
                    <span className="font-semibold uppercase tracking-[0.06em] text-[10px] mr-2 text-blue-200">
                      Pending verification
                    </span>
                    Once saved, your DSL or admin will review and sign this off. Until then it shows
                    as <em>pending</em> in your vault.
                  </div>
                )}
              </FormCard>

              {isEdit && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={submitting}
                    className="w-full h-10 rounded-xl border border-red-500/25 bg-red-500/[0.04] text-[12.5px] font-medium text-red-300 hover:bg-red-500/[0.08] hover:border-red-500/40 transition-colors touch-manipulation disabled:opacity-40"
                  >
                    Delete record
                  </button>
                  <p className="mt-1.5 text-[10.5px] text-white leading-snug text-center">
                    Logged in the compliance audit trail.
                  </p>
                </div>
              )}
            </>
          )}
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
