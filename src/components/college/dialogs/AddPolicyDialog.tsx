import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
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
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* ==========================================================================
   AddPolicyDialog — create a draft policy and navigate to its detail page
   for the markdown editor.
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
  { value: 'safeguarding', label: 'Safeguarding' },
  { value: 'prevent', label: 'Prevent' },
  { value: 'edi', label: 'Equality, Diversity & Inclusion' },
  { value: 'whistleblowing', label: 'Whistleblowing' },
  { value: 'complaints', label: 'Complaints' },
  { value: 'code_of_conduct', label: 'Code of Conduct' },
  { value: 'acceptable_use', label: 'Acceptable Use / IT' },
  { value: 'disciplinary', label: 'Disciplinary' },
  { value: 'health_safety', label: 'Health & Safety' },
  { value: 'gdpr', label: 'GDPR / Data Protection' },
  { value: 'send', label: 'SEND / Reasonable Adjustments' },
  { value: 'assessment', label: 'Assessment & Malpractice' },
  { value: 'iqa', label: 'Internal Quality Assurance' },
  { value: 'appeals', label: 'Appeals' },
  { value: 'rarpa', label: 'RARPA' },
  { value: 'apprenticeship', label: 'Apprenticeship' },
  { value: 'quality', label: 'Quality Improvement' },
  { value: 'other', label: 'Other' },
];

const OWNER_ROLES = [
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
  initial_content: string;
}

const EMPTY: FormState = {
  title: '',
  code: '',
  category: 'safeguarding',
  owner_role: '',
  requires_acknowledgement: true,
  initial_content: '',
};

export function AddPolicyDialog({ open, onOpenChange }: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) setForm(EMPTY);
  }, [open]);

  const update = (patch: Partial<FormState>) => setForm((p) => ({ ...p, ...patch }));

  const handleCreate = async () => {
    if (!form.title.trim()) {
      toast({
        title: 'Title required',
        variant: 'destructive',
      });
      return;
    }
    setSubmitting(true);
    try {
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

      if (!collegeId) {
        toast({
          title: 'No college on profile',
          description: "Your account isn't linked to a college yet. Ask an admin to set it up.",
          variant: 'destructive',
        });
        setSubmitting(false);
        return;
      }

      const { data: inserted, error: insErr } = await supabase
        .from('college_policies')
        .insert({
          college_id: collegeId,
          title: form.title.trim(),
          code: form.code.trim() || null,
          category: form.category,
          owner_role: form.owner_role && form.owner_role !== '__none' ? form.owner_role : null,
          requires_acknowledgement: form.requires_acknowledgement,
          content_md: form.initial_content.trim() || null,
          version: 1,
          status: 'draft',
          created_by: userId,
        })
        .select('id')
        .single();
      if (insErr) throw insErr;

      toast({
        title: 'Draft created',
        description: 'Edit the body, then publish v1 when ready.',
      });
      onOpenChange(false);
      navigate(`/college/policies/${(inserted as { id: string }).id}`);
    } catch (e) {
      toast({
        title: 'Could not create policy',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="New policy"
          title="Add a policy"
          description="Creates a draft. You'll edit the body next, then publish v1 when it's ready."
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)} disabled={submitting}>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleCreate}
                disabled={submitting || !form.title.trim()}
              >
                {submitting ? 'Creating…' : 'Create draft →'}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Identification">
            <Field label="Policy title" required>
              <input
                value={form.title}
                onChange={(e) => update({ title: e.target.value })}
                className={inputClass}
                placeholder="e.g. Safeguarding & Child Protection Policy"
                autoFocus
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Code" hint='Short reference, e.g. "KCSIE", "PREVENT", "EDI-001"'>
                <input
                  value={form.code}
                  onChange={(e) => update({ code: e.target.value })}
                  className={inputClass}
                  placeholder="—"
                />
              </Field>
              <Field label="Category">
                <Select value={form.category} onValueChange={(v) => update({ category: v })}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Ownership & sign-off">
            <Field label="Owner role" hint="Who's responsible for keeping this policy current">
              <Select value={form.owner_role} onValueChange={(v) => update({ owner_role: v })}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Pick a role…" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {OWNER_ROLES.map((r) => (
                    <SelectItem key={r.value || 'none'} value={r.value || '__none'}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <label className="flex items-center gap-3 cursor-pointer touch-manipulation py-1.5">
              <input
                type="checkbox"
                checked={form.requires_acknowledgement}
                onChange={(e) => update({ requires_acknowledgement: e.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-[hsl(0_0%_9%)] checked:bg-elec-yellow"
              />
              <span className="text-[12.5px] text-white">
                Requires staff acknowledgement
                <span className="block text-[10.5px] text-white/55 mt-0.5">
                  Every member of staff must sign-off this policy when it's published. Re-signed
                  each new version.
                </span>
              </span>
            </label>
          </FormCard>

          <FormCard eyebrow="Initial draft (optional)">
            <Field
              label="Body"
              hint="Markdown supported. You'll get a richer editor on the next screen."
            >
              <textarea
                value={form.initial_content}
                onChange={(e) => update({ initial_content: e.target.value })}
                rows={6}
                className={cn(textareaClass, 'min-h-[140px] font-mono text-[12px]')}
                placeholder="# Section heading\n\nWrite or paste your policy content…"
              />
            </Field>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
