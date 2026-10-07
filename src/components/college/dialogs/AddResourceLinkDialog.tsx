import { useEffect, useState } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
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
    <FormSheet
      open={open}
      onOpenChange={(v) => !v && !saving && onOpenChange(false)}
      width="wide"
      eyebrow="Add external resource"
      title="Link a video, website or document"
      description="Anything with a web address. It sits alongside your uploaded files and can be searched."
      bodyClassName="grid grid-cols-1 items-start gap-x-6 gap-y-5 lg:grid-cols-2"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => onOpenChange(false)} disabled={saving} className={buttonSecondaryCn}>
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={!canSave || saving} className={buttonPrimaryCn}>
            {saving ? 'Adding…' : 'Add link'}
          </button>
        </div>
      }
    >
      <div>
        <label className={labelCn} htmlFor="arl-title">
          Title
        </label>
        <input
          id="arl-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. BS 7671 A4:2026, the key changes"
          className={inputCn}
        />
      </div>
      <div>
        <label className={labelCn} htmlFor="arl-url">
          Web address
        </label>
        <input
          id="arl-url"
          type="url"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://"
          className={cn(inputCn, 'font-mono')}
        />
        {url.trim() && !/^https?:\/\//i.test(url.trim()) && (
          <p className="mt-1.5 text-[12px] text-orange-300">Start the address with https://</p>
        )}
      </div>
      <div>
        <label className={labelCn} htmlFor="arl-desc">
          Description (optional)
        </label>
        <textarea
          id="arl-desc"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A short note on what this is for."
          className={textareaCn}
        />
      </div>
      <div>
        <label className={labelCn} htmlFor="arl-tags">
          Tags, separated by commas (optional)
        </label>
        <input
          id="arl-tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="BS 7671, AFDD, Level 3"
          className={inputCn}
        />
      </div>
    </FormSheet>
  );
}
