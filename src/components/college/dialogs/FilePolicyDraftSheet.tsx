import { useEffect, useRef, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  checkboxCn,
  checkRowCn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { cn } from '@/lib/utils';

/* ==========================================================================
   FilePolicyDraftSheet — tutor-side. Confirm-and-file an AI-drafted college
   policy into college_policies as a v1 draft. Mirrors the AddPolicyDialog
   schema so policies arrive consistent with manually-created ones, then
   the tutor lands on the policy detail page to review + publish.
   ========================================================================== */

interface Prefill {
  title?: string;
  description?: string;
  content_md?: string;
  category?: string;
  code?: string | null;
  owner_role?: string | null;
  requires_acknowledgement?: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fired after a successful insert. Receives the new row's id so callers
      can persist filed-state on the AI write-back proposal. */
  onSubmitted?: (insertedId: string | null) => void;
  prefill?: Prefill;
}

const CATEGORIES: Array<{ value: string; label: string }> = [
  { value: 'safeguarding', label: 'Safeguarding' },
  { value: 'prevent', label: 'Prevent' },
  { value: 'edi', label: 'EDI' },
  { value: 'whistleblowing', label: 'Whistleblowing' },
  { value: 'complaints', label: 'Complaints' },
  { value: 'code_of_conduct', label: 'Code of conduct' },
  { value: 'acceptable_use', label: 'Acceptable use / IT' },
  { value: 'disciplinary', label: 'Disciplinary' },
  { value: 'health_safety', label: 'Health and safety' },
  { value: 'gdpr', label: 'GDPR' },
  { value: 'send', label: 'SEND' },
  { value: 'assessment', label: 'Assessment' },
  { value: 'iqa', label: 'IQA' },
  { value: 'appeals', label: 'Appeals' },
  { value: 'rarpa', label: 'RARPA' },
  { value: 'apprenticeship', label: 'Apprenticeship' },
  { value: 'quality', label: 'Quality' },
  { value: 'other', label: 'Other' },
];

/** Radix Select cannot hold an empty value, so "No specific owner" uses a sentinel. */
const NO_OWNER = '__none';

const OWNER_ROLES: Array<{ value: string; label: string }> = [
  { value: '', label: 'No specific owner' },
  { value: 'DSL', label: 'DSL' },
  { value: 'Prevent Lead', label: 'Prevent Lead' },
  { value: 'H&S Lead', label: 'H&S Lead' },
  { value: 'Quality Nominee', label: 'Quality Nominee' },
  { value: 'Mental Health Lead', label: 'Mental Health Lead' },
  { value: 'Principal', label: 'Principal' },
  { value: 'HR', label: 'HR' },
];

interface FormState {
  title: string;
  code: string;
  category: string;
  owner_role: string;
  requires_acknowledgement: boolean;
  content_md: string;
}

function emptyForm(): FormState {
  return {
    title: '',
    code: '',
    category: 'safeguarding',
    owner_role: '',
    requires_acknowledgement: true,
    content_md: '',
  };
}

export function FilePolicyDraftSheet({ open, onOpenChange, onSubmitted, prefill }: Props) {
  const [form, setForm] = useState<FormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const { toast } = useToast();

  // Single open-time effect — gated by wasOpenRef so it fires only on the
  // false → true transition. Protects the tutor's edits from being wiped
  // by parent re-renders (NotebookShell re-renders on every streaming token).
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (open && !wasOpenRef.current) {
      if (prefill) {
        setForm({
          title: prefill.title ?? '',
          code: prefill.code ?? '',
          category: prefill.category ?? 'safeguarding',
          owner_role: prefill.owner_role ?? '',
          requires_acknowledgement: prefill.requires_acknowledgement ?? true,
          content_md: prefill.content_md ?? '',
        });
      } else {
        setForm(emptyForm());
      }
      setSavedTick(false);
    }
    wasOpenRef.current = open;
  }, [open, prefill]);

  const handleSubmit = async () => {
    if (saving) return;
    if (!form.title.trim() || !form.content_md.trim()) {
      toast({
        title: 'Title and body required',
        description: 'Add a title and policy body before saving the draft.',
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const uid = userRes?.user?.id;
      if (!uid) throw new Error('Not signed in');

      const collegeId = await getMyCollegeId(uid);
      if (!collegeId) {
        toast({
          title: 'No college on profile',
          description: "Your account isn't linked to a college yet.",
          variant: 'destructive',
        });
        setSaving(false);
        return;
      }

      const { data: inserted, error: insErr } = await supabase
        .from('college_policies')
        .insert({
          college_id: collegeId,
          title: form.title.trim().slice(0, 200),
          code: form.code.trim() || null,
          category: form.category,
          owner_role: form.owner_role || null,
          requires_acknowledgement: form.requires_acknowledgement,
          content_md: form.content_md.trim(),
          version: 1,
          status: 'draft',
          created_by: uid,
          // ELE-1926: this sheet files drafts written by the policy-drafting
          // assistant (AI author sheet, notebook); a person has reviewed it here.
          content_source: prefill ? 'ai_draft_confirmed' : 'staff',
        } as never)
        .select('id')
        .maybeSingle();
      if (insErr) throw insErr;

      setSavedTick(true);
      toast({
        title: 'Draft saved',
        description: 'Edit the body, then publish v1 when ready.',
      });
      onSubmitted?.((inserted as { id?: string } | null)?.id ?? null);
      setTimeout(() => {
        setSavedTick(false);
        onOpenChange(false);
      }, 800);
    } catch (e) {
      toast({
        title: 'Could not save draft',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const canSave = !saving && Boolean(form.title.trim()) && Boolean(form.content_md.trim());

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="File as draft policy"
      title="Review and save draft"
      description="Lands as a v1 draft in your compliance vault. Edit the body on the next screen, then publish when it's ready for staff acknowledgement."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSave}
            className={buttonPrimaryCn}
          >
            {savedTick ? 'Saved' : saving ? 'Saving…' : 'Save draft'}
          </button>
        </div>
      }
    >
      {/* Left — the register details */}
      <div className="space-y-5">
        <div>
          <label className={labelCn} htmlFor="fpd-title">
            Policy title
          </label>
          <input
            id="fpd-title"
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="e.g. Safeguarding and Child Protection Policy"
            maxLength={200}
            className={inputCn}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6">
          <div>
            <label className={labelCn} htmlFor="fpd-code">
              Code (optional)
            </label>
            <input
              id="fpd-code"
              type="text"
              value={form.code}
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
              placeholder="KCSIE"
              maxLength={40}
              className={cn(inputCn, 'font-mono')}
            />
          </div>
          <div>
            <div className={labelCn}>Category</div>
            <MobileSelectPicker
              value={form.category}
              onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              options={CATEGORIES}
              title="Category"
              triggerClassName={selectTriggerCn}
            />
          </div>
        </div>

        <div>
          <div className={labelCn}>Owner role</div>
          <MobileSelectPicker
            value={form.owner_role || NO_OWNER}
            onValueChange={(v) => setForm((f) => ({ ...f, owner_role: v === NO_OWNER ? '' : v }))}
            options={OWNER_ROLES.map((r) => ({ value: r.value || NO_OWNER, label: r.label }))}
            title="Owner role"
            triggerClassName={selectTriggerCn}
          />
          <p className="mt-1.5 text-[12px] text-white">Who keeps this policy current.</p>
        </div>

        <label htmlFor="fpd-ack" className={cn(checkRowCn, 'items-start')}>
          <Checkbox
            id="fpd-ack"
            checked={form.requires_acknowledgement}
            onCheckedChange={(v) =>
              setForm((f) => ({ ...f, requires_acknowledgement: v === true }))
            }
            className={cn(checkboxCn, 'mt-0.5')}
          />
          <span className="text-[13.5px] font-medium leading-snug text-white">
            Requires staff acknowledgement
            <span className="mt-0.5 block text-[12px] font-normal text-white">
              Every member of staff signs this policy off when it's published, and again for each
              new version.
            </span>
          </span>
        </label>
      </div>

      {/* Right — the body */}
      <div>
        <label className={labelCn} htmlFor="fpd-body">
          Policy body
        </label>
        <textarea
          id="fpd-body"
          value={form.content_md}
          onChange={(e) => setForm((f) => ({ ...f, content_md: e.target.value }))}
          rows={16}
          maxLength={30_000}
          className={cn(
            textareaCn,
            'min-h-[320px] font-mono text-[13px] leading-relaxed md:text-[13px]'
          )}
        />
        <p className="mt-1.5 text-[12px] text-white">
          Markdown. You can keep editing on the next screen before publishing.
        </p>
      </div>
    </FormSheet>
  );
}
