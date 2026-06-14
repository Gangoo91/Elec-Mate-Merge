import { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  { value: 'code_of_conduct', label: 'Code of Conduct' },
  { value: 'acceptable_use', label: 'Acceptable Use / IT' },
  { value: 'disciplinary', label: 'Disciplinary' },
  { value: 'health_safety', label: 'Health & Safety' },
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

      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', uid)
        .maybeSingle();
      const collegeId = (profile as { college_id?: string | null } | null)?.college_id ?? null;
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
        })
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[92vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <SheetTitle className="sr-only">File policy draft</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-white/[0.06]">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-amber-300">
              File as draft policy
            </div>
            <h2 className="mt-1 text-[18px] font-semibold text-white tracking-tight leading-tight">
              Review &amp; save draft
            </h2>
            <p className="mt-1 text-[12px] text-white leading-snug">
              Lands as a v1 draft in your compliance vault. Edit the body on the next screen, then
              publish when it's ready for staff acknowledgement.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4">
            <Field label="Policy title">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Safeguarding & Child Protection Policy"
                maxLength={200}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white placeholder:text-white/45 focus:outline-none focus:border-white/30 touch-manipulation"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Code" hint='Optional, e.g. "KCSIE"'>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                  placeholder="—"
                  maxLength={40}
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white placeholder:text-white/45 focus:outline-none focus:border-white/30 font-mono touch-manipulation"
                />
              </Field>
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white focus:outline-none focus:border-white/30 touch-manipulation"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value} className="bg-[hsl(0_0%_10%)]">
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Owner role" hint="Who keeps this current">
              <select
                value={form.owner_role}
                onChange={(e) => setForm((f) => ({ ...f, owner_role: e.target.value }))}
                className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14.5px] text-white focus:outline-none focus:border-white/30 touch-manipulation"
              >
                {OWNER_ROLES.map((r) => (
                  <option key={r.value || 'none'} value={r.value} className="bg-[hsl(0_0%_10%)]">
                    {r.label}
                  </option>
                ))}
              </select>
            </Field>

            <label className="flex items-start gap-3 cursor-pointer touch-manipulation py-1.5">
              <input
                type="checkbox"
                checked={form.requires_acknowledgement}
                onChange={(e) =>
                  setForm((f) => ({ ...f, requires_acknowledgement: e.target.checked }))
                }
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[hsl(0_0%_9%)] checked:bg-amber-300 cursor-pointer touch-manipulation"
              />
              <span className="text-[12.5px] text-white leading-snug">
                Requires staff acknowledgement
                <span className="block text-[11px] text-white mt-0.5">
                  Every member of staff must sign-off this policy when published. Re-signed each new
                  version.
                </span>
              </span>
            </label>

            <Field
              label="Policy body"
              hint="Markdown. You can keep editing on the next screen before publishing."
            >
              <textarea
                value={form.content_md}
                onChange={(e) => setForm((f) => ({ ...f, content_md: e.target.value }))}
                rows={16}
                maxLength={30_000}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-white placeholder:text-white/45 leading-relaxed focus:outline-none focus:border-white/30 font-mono touch-manipulation resize-none"
              />
            </Field>
          </div>

          <div className="px-4 sm:px-5 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_10%)] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={saving}
              className="h-11 px-4 rounded-lg text-[13px] font-medium text-white hover:text-white hover:bg-white/[0.04] transition-colors touch-manipulation disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving || !form.title.trim() || !form.content_md.trim()}
              className={cn(
                'inline-flex items-center h-11 px-4 rounded-lg text-[13px] font-semibold text-black transition-colors touch-manipulation',
                saving || !form.title.trim() || !form.content_md.trim()
                  ? 'bg-white/[0.05] text-white'
                  : 'bg-amber-300 hover:bg-amber-200'
              )}
            >
              {savedTick ? 'Saved ✓' : saving ? 'Saving…' : 'Save draft →'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white">
        {label}
      </span>
      {hint && <span className="block mt-0.5 text-[11.5px] text-white">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
