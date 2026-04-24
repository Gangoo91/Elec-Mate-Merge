import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface LinkInput {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (input: LinkInput) => Promise<void>;
}

export function AddResourceLinkDialog({ open, onOpenChange, onSave }: Props) {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle('');
    setUrl('');
    setDescription('');
    setTagsInput('');
  }, [open]);

  const canSave = Boolean(title.trim() && /^https?:\/\//i.test(url.trim()));

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        url: url.trim(),
        description: description.trim() || undefined,
        tags: tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      });
      toast({ title: 'Link added', description: title.trim() });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not add link',
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
          'w-[min(100vw-1rem,560px)] bg-[hsl(0_0%_10%)] border-white/[0.08] p-0 gap-0 flex flex-col overflow-hidden',
          'sm:w-[min(100vw-2rem,560px)]'
        )}
      >
        <DialogHeader className="border-b border-white/[0.06] px-6 py-5 space-y-2 text-left">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/85">
            Add external resource
          </div>
          <DialogTitle className="text-xl font-semibold text-white tracking-tight">
            Link a YouTube video, website or doc
          </DialogTitle>
          <DialogDescription className="text-[12.5px] text-white/70 leading-relaxed">
            Anything with a URL. It'll sit alongside your uploaded files and be
            searchable.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-5 space-y-4">
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. BS 7671 A4:2026 — the key changes"
              className="h-11 w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60"
            />
          </Field>
          <Field label="URL">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://…"
              className="h-11 w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 font-mono"
            />
          </Field>
          <Field label="Description (optional)">
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short note on what this is for."
              className="w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 py-3 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60 resize-y"
            />
          </Field>
          <Field label="Tags (comma-separated, optional)">
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="BS 7671, AFDD, Level 3"
              className="h-11 w-full bg-[hsl(0_0%_13%)] border border-white/[0.08] rounded-xl px-4 text-[13.5px] text-white placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/60"
            />
          </Field>
        </div>

        <div className="border-t border-white/[0.06] px-6 py-4 flex items-center justify-end gap-2 flex-col-reverse sm:flex-row">
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
            {saving ? 'Adding…' : 'Add link'}
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
