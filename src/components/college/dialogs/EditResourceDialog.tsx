import { useEffect, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { CHOICE_OFF, CHOICE_ON } from '@/components/college/teaching/TeachingKit';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { CollegeResource, ResourceVisibility } from '@/hooks/useCollegeResources';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  resource: CollegeResource | null;
  onSaved?: (updated: CollegeResource) => void;
}

const VISIBILITY_OPTIONS: {
  value: ResourceVisibility;
  label: string;
  hint: string;
}[] = [
  { value: 'private', label: 'Only me', hint: 'A draft or personal copy. No one else sees it.' },
  {
    value: 'tutors',
    label: 'All tutors',
    hint: 'Shared across the teaching team at your college. The usual choice.',
  },
  {
    value: 'cohort_members',
    label: 'Cohort members',
    hint: 'Apprentices in the linked cohorts can view it.',
  },
  { value: 'college', label: 'Whole college', hint: 'Anyone at the college can view it.' },
];

export function EditResourceDialog({ open, onOpenChange, resource, onSaved }: Props) {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [visibility, setVisibility] = useState<ResourceVisibility>('tutors');
  const [externalUrl, setExternalUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !resource) return;
    setTitle(resource.title);
    setDescription(resource.description ?? '');
    setTagsInput((resource.tags ?? []).join(', '));
    setVisibility(resource.visibility);
    setExternalUrl(resource.external_url ?? '');
  }, [open, resource]);

  if (!resource) return null;
  const isLink = resource.kind === 'link';

  const canSave = Boolean(title.trim()) && (!isLink || /^https?:\/\//i.test(externalUrl.trim()));

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      const update: Record<string, unknown> = {
        title: title.trim(),
        description: description.trim() || null,
        tags: tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        visibility,
      };
      if (isLink) update.external_url = externalUrl.trim();

      const { data, error } = await supabase
        .from('college_resources')
        .update(update as never)
        .eq('id', resource.id)
        .select(
          'id, college_id, uploader_id, title, description, kind, file_path, external_url, mime_type, size_bytes, duration_seconds, thumbnail_path, tags, visibility, views_count, downloads_count, created_at, updated_at'
        )
        .maybeSingle();
      if (error || !data) throw error ?? new Error('Update failed');
      onSaved?.(data as CollegeResource);
      toast({ title: 'Resource updated' });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={(v) => !v && !saving && onOpenChange(false)}
      width="wide"
      eyebrow="Edit resource"
      title={resource.title}
      description="Update the details. To replace the file itself, upload it again."
      bodyClassName="grid grid-cols-1 items-start gap-x-6 gap-y-5 lg:grid-cols-2"
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
            onClick={handleSave}
            disabled={!canSave || saving}
            className={buttonPrimaryCn}
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      }
    >
      <div>
        <label className={labelCn} htmlFor="er-title">
          Title
        </label>
        <input
          id="er-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputCn}
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="er-tags">
          Tags, separated by commas
        </label>
        <input
          id="er-tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="BS 7671, AFDD, Level 3"
          className={inputCn}
        />
      </div>

      {isLink && (
        <div className="lg:col-span-2">
          <label className={labelCn} htmlFor="er-url">
            Web address
          </label>
          <input
            id="er-url"
            type="url"
            inputMode="url"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            placeholder="https://"
            className={cn(inputCn, 'font-mono')}
          />
          {externalUrl.trim() && !/^https?:\/\//i.test(externalUrl.trim()) && (
            <p className="mt-1.5 text-[12px] text-orange-300">Start the address with https://</p>
          )}
        </div>
      )}

      <div className="lg:col-span-2">
        <label className={labelCn} htmlFor="er-desc">
          Description
        </label>
        <textarea
          id="er-desc"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this for?"
          className={textareaCn}
        />
      </div>

      <div className="border-t border-white/[0.08] pt-4 lg:col-span-2">
        <p className={labelCn}>Who can see it</p>
        <div className="mt-1 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {VISIBILITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={visibility === opt.value}
              onClick={() => setVisibility(opt.value)}
              className={cn(
                chipBase,
                'px-3 text-[13px]',
                visibility === opt.value ? CHOICE_ON : CHOICE_OFF
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-white">
          {VISIBILITY_OPTIONS.find((o) => o.value === visibility)?.hint}
        </p>
      </div>
    </FormSheet>
  );
}
