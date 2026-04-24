import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type {
  CollegeResource,
  ResourceVisibility,
} from '@/hooks/useCollegeResources';

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
  { value: 'private', label: 'Only me', hint: 'Draft / personal — no-one else sees it' },
  { value: 'tutors', label: 'All tutors at college', hint: 'Default — shared across the teaching team' },
  { value: 'cohort_members', label: 'Cohort members', hint: 'Apprentices in linked cohorts can view' },
  { value: 'college', label: 'Whole college', hint: 'Anyone at the college' },
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
        .update(update)
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
    <Dialog open={open} onOpenChange={(v) => !v && !saving && onOpenChange(false)}>
      <DialogContent
        className={cn(
          'w-[min(100vw-1rem,600px)] max-h-[92vh] bg-[hsl(0_0%_10%)] border-white/[0.08] p-0 gap-0 flex flex-col overflow-hidden',
          'sm:w-[min(100vw-2rem,600px)]'
        )}
      >
        <DialogHeader className="border-b border-white/[0.06] px-6 py-5 space-y-2 text-left shrink-0">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/85">
            Edit resource
          </div>
          <DialogTitle className="text-xl font-semibold text-white tracking-tight leading-tight">
            {resource.title}
          </DialogTitle>
          <DialogDescription className="text-[12.5px] text-white/70 leading-relaxed">
            Update metadata. The file itself can be replaced via re-upload (coming
            next).
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60"
            />
          </Field>

          {isLink && (
            <Field label="URL">
              <input
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                className="h-11 w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 font-mono"
              />
            </Field>
          )}

          <Field label="Description">
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this for?"
              className="w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 py-3 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 resize-y"
            />
          </Field>

          <Field label="Tags (comma-separated)">
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="BS 7671, AFDD, Level 3"
              className="h-11 w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60"
            />
          </Field>

          <Field label="Visibility">
            <div className="space-y-1.5">
              {VISIBILITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setVisibility(opt.value)}
                  className={cn(
                    'w-full text-left rounded-xl px-4 py-3 border transition-colors',
                    visibility === opt.value
                      ? 'border-elec-yellow/40 bg-elec-yellow/[0.06]'
                      : 'border-white/[0.08] bg-[hsl(0_0%_13%)] hover:border-white/[0.15]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center',
                        visibility === opt.value
                          ? 'border-elec-yellow'
                          : 'border-white/25'
                      )}
                    >
                      {visibility === opt.value && (
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          'text-[13px] font-medium',
                          visibility === opt.value ? 'text-elec-yellow' : 'text-white'
                        )}
                      >
                        {opt.label}
                      </div>
                      <div className="text-[11.5px] text-white/55 mt-0.5">
                        {opt.hint}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="border-t border-white/[0.06] px-6 py-4 flex items-center justify-end gap-2 flex-col-reverse sm:flex-row shrink-0">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className="h-11 w-full sm:w-auto px-5 rounded-full border border-white/[0.12] text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave || saving}
            className="h-11 w-full sm:w-auto px-6 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[13px] font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}
