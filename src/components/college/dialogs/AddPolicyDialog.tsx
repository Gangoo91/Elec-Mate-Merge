import { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { cn } from '@/lib/utils';

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
  { value: 'edi', label: 'Equality, diversity and inclusion' },
  { value: 'whistleblowing', label: 'Whistleblowing' },
  { value: 'complaints', label: 'Complaints' },
  { value: 'code_of_conduct', label: 'Code of conduct' },
  { value: 'acceptable_use', label: 'Acceptable use / IT' },
  { value: 'disciplinary', label: 'Disciplinary' },
  { value: 'health_safety', label: 'Health and safety' },
  { value: 'gdpr', label: 'GDPR / data protection' },
  { value: 'send', label: 'SEND / reasonable adjustments' },
  { value: 'assessment', label: 'Assessment and malpractice' },
  { value: 'iqa', label: 'Internal quality assurance' },
  { value: 'appeals', label: 'Appeals' },
  { value: 'rarpa', label: 'RARPA' },
  { value: 'apprenticeship', label: 'Apprenticeship' },
  { value: 'quality', label: 'Quality improvement' },
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
        collegeId = await getMyCollegeId(userId);
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
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="New policy"
      title="Add a policy"
      description="Creates a draft. You'll edit the body next, then publish v1 when it's ready."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-2"
      footer={
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
            onClick={handleCreate}
            disabled={submitting || !form.title.trim()}
            className={buttonPrimaryCn}
          >
            {submitting ? 'Creating…' : 'Create draft'}
          </button>
        </div>
      }
    >
      <div className="lg:col-span-2">
        <label className={labelCn} htmlFor="ap-title">
          Policy title
        </label>
        <input
          id="ap-title"
          value={form.title}
          onChange={(e) => update({ title: e.target.value })}
          className={inputCn}
          placeholder="e.g. Safeguarding and Child Protection Policy"
          autoFocus
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="ap-code">
          Code
        </label>
        <input
          id="ap-code"
          value={form.code}
          onChange={(e) => update({ code: e.target.value })}
          className={inputCn}
          placeholder="KCSIE, PREVENT, EDI-001"
        />
        <p className="mt-1.5 text-[12px] text-white">A short reference for the register.</p>
      </div>

      <div>
        <div className={labelCn}>Category</div>
        <MobileSelectPicker
          value={form.category}
          onValueChange={(v) => update({ category: v })}
          options={CATEGORIES}
          title="Category"
          triggerClassName={selectTriggerCn}
        />
        <p className="mt-1.5 text-[12px] text-white">
          Groups it in the policy register. Pick the closest area.
        </p>
      </div>

      <div>
        <div className={labelCn}>Owner role</div>
        <MobileSelectPicker
          value={form.owner_role || '__none'}
          onValueChange={(v) => update({ owner_role: v === '__none' ? '' : v })}
          options={OWNER_ROLES.map((r) => ({ value: r.value || '__none', label: r.label }))}
          title="Owner role"
          placeholder="Pick a role…"
          triggerClassName={selectTriggerCn}
        />
        <p className="mt-1.5 text-[12px] text-white">
          Who is responsible for keeping this policy current.
        </p>
      </div>

      <label htmlFor="ap-ack" className={cn(checkRowCn, 'items-start')}>
        <Checkbox
          id="ap-ack"
          checked={form.requires_acknowledgement}
          onCheckedChange={(v) => update({ requires_acknowledgement: v === true })}
          className={cn(checkboxCn, 'mt-0.5')}
        />
        <span className="text-[13.5px] font-medium text-white">
          Requires staff acknowledgement
          <span className="mt-0.5 block text-[12px] font-normal leading-snug text-white">
            Every member of staff signs this policy off when it's published, and again for each new
            version.
          </span>
        </span>
      </label>

      <div className="lg:col-span-2">
        <label className={labelCn} htmlFor="ap-body">
          Initial draft (optional)
        </label>
        <textarea
          id="ap-body"
          value={form.initial_content}
          onChange={(e) => update({ initial_content: e.target.value })}
          rows={8}
          className={cn(textareaCn, 'min-h-[160px] font-mono text-[13px] md:text-[13px]')}
          placeholder={'# Section heading\n\nWrite or paste your policy content…'}
        />
        <p className="mt-1.5 text-[12px] text-white">
          Markdown supported. You'll get a richer editor on the next screen.
        </p>
      </div>
    </FormSheet>
  );
}
