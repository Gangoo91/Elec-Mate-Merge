/**
 * ELE-2067 — "We'll move you across for free". The owner sends their export
 * files (private bucket, owner and Elec-Mate admins only) and the times that
 * suit a call; it lands as a task in Admin → Migrations.
 */
import { useRef, useState } from 'react';
import { Loader2, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import { plural } from '@/components/employer/pageParts/PageParts';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { SOURCES } from '@/lib/firmImport/sources';
import { KIND_LABEL, KIND_ORDER } from '@/lib/firmImport/types';

const BUCKET = 'firm-migration-files';
const MAX_BYTES = 50 * 1024 * 1024;
const TIMES = ['Weekday mornings', 'Weekday afternoons', 'Weekday evenings', 'Saturday'];

function Toggle({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        'h-11 rounded-full border px-3.5 text-[13px] font-semibold touch-manipulation transition-colors',
        on
          ? 'border-elec-yellow bg-elec-yellow text-black'
          : 'border-white/[0.14] bg-white/[0.04] text-white hover:bg-white/[0.08]'
      )}
    >
      {children}
    </button>
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
    <div className="min-w-0">
      <p className="text-[13px] font-semibold text-white">{label}</p>
      {hint && <p className="mt-0.5 text-[12.5px] leading-snug text-white">{hint}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function MigrationRequestSheet({
  open,
  onOpenChange,
  firmId,
  defaultEmail,
  defaultPhone,
  defaultName,
  onSent,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  firmId: string;
  defaultEmail?: string;
  defaultPhone?: string;
  defaultName?: string;
  onSent: () => void;
}) {
  const [system, setSystem] = useState<string>('');
  const [what, setWhat] = useState<string[]>(['customers', 'jobs', 'quotes', 'invoices']);
  const [times, setTimes] = useState<string[]>([]);
  const [timeNote, setTimeNote] = useState('');
  const [name, setName] = useState(defaultName ?? '');
  const [phone, setPhone] = useState(defaultPhone ?? '');
  const [email, setEmail] = useState(defaultEmail ?? '');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const toggle = (list: string[], v: string) =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
  const canSend = !!system && (!!phone.trim() || !!email.trim()) && !sending;

  const send = async () => {
    setSending(true);
    const id = crypto.randomUUID();
    const uploaded: { path: string; name: string; size: number }[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        setProgress(`Sending file ${i + 1} of ${files.length}`);
        const safe = f.name.replace(/[^a-z0-9._-]+/gi, '_').slice(-120);
        const path = `${firmId}/${id}/${safe}`;
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(path, f, { upsert: false, contentType: f.type || undefined });
        if (error) throw new Error(`${f.name}: ${error.message}`);
        uploaded.push({ path, name: f.name, size: f.size });
      }
      setProgress('Sending the request');
      const { error } = await supabase.from('employer_migration_requests' as never).insert({
        id,
        employer_id: firmId,
        requested_by: firmId,
        source_system: system,
        contact_name: name.trim() || null,
        contact_phone: phone.trim() || null,
        contact_email: email.trim() || null,
        preferred_times: times,
        preferred_note: timeNote.trim() || null,
        what_to_move: what,
        notes: notes.trim() || null,
        files: uploaded,
      } as never);
      if (error) throw new Error(error.message);
      toast({
        title: 'Sent',
        description: 'We will call you at a time you picked to plan the move.',
      });
      onSent();
      onOpenChange(false);
      setFiles([]);
      setNotes('');
    } catch (e) {
      // Tidy up any files that went before the failure.
      if (uploaded.length) await supabase.storage.from(BUCKET).remove(uploaded.map((u) => u.path));
      toast({
        title: 'Not sent',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    } finally {
      setSending(false);
      setProgress('');
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => !sending && onOpenChange(o)}
      width="wide"
      eyebrow="Bring your data across"
      title="We will move you across for free"
      description="Send us your export files and when suits you for a call. We bring your customers, jobs, quotes, invoices and price book in for you, and you check it before you start."
      footer={
        <div className="flex gap-2">
          <SecondaryButton
            className="flex-1 sm:flex-none"
            disabled={sending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton className="flex-1" disabled={!canSend} onClick={send}>
            {sending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> {progress}
              </span>
            ) : (
              'Send request'
            )}
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-6">
          <Field label="What do you use now?">
            <div className="flex flex-wrap gap-2">
              {SOURCES.map((s) => (
                <Toggle key={s.key} on={system === s.key} onClick={() => setSystem(s.key)}>
                  {s.key === 'generic' ? 'Something else' : s.label}
                </Toggle>
              ))}
            </div>
          </Field>
          <Field label="What should come across?">
            <div className="flex flex-wrap gap-2">
              {KIND_ORDER.map((k) => (
                <Toggle key={k} on={what.includes(k)} onClick={() => setWhat((w) => toggle(w, k))}>
                  {KIND_LABEL[k].many}
                </Toggle>
              ))}
            </div>
          </Field>
          <Field
            label="Your export files"
            hint="Optional now, you can send them on the call. Up to 50 MB each. Only you and the Elec-Mate team can open them."
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const picked = Array.from(e.target.files ?? []);
                const big = picked.filter((f) => f.size > MAX_BYTES);
                if (big.length)
                  toast({
                    title: `${big[0].name} is over 50 MB`,
                    description: 'Send it on the call instead.',
                    variant: 'destructive',
                  });
                setFiles((prev) => [...prev, ...picked.filter((f) => f.size <= MAX_BYTES)]);
                e.target.value = '';
              }}
            />
            <SecondaryButton onClick={() => inputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" aria-hidden /> Add files
            </SecondaryButton>
            {files.length > 0 && (
              <ul className="mt-2 divide-y divide-white/[0.07] rounded-xl border border-white/[0.08]">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex items-center gap-2 px-3 py-2">
                    <span className="min-w-0 flex-1 truncate text-[14px] text-white">{f.name}</span>
                    <span className="shrink-0 text-[12.5px] tabular-nums text-white">
                      {f.size >= 1024 * 1024
                        ? `${(f.size / 1024 / 1024).toFixed(1)} MB`
                        : `${Math.max(1, Math.round(f.size / 1024))} KB`}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${f.name}`}
                      onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}
                      className="flex h-11 w-11 items-center justify-center text-white touch-manipulation"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Field>
        </div>
        <div className="space-y-6">
          <Field label="When suits you for a call?">
            <div className="flex flex-wrap gap-2">
              {TIMES.map((t) => (
                <Toggle
                  key={t}
                  on={times.includes(t)}
                  onClick={() => setTimes((x) => toggle(x, t))}
                >
                  {t}
                </Toggle>
              ))}
            </div>
            <Input
              value={timeNote}
              onChange={(e) => setTimeNote(e.target.value)}
              placeholder="Anything else, e.g. not Mondays"
              className={cn(inputClass, 'mt-2')}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Phone">
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Email">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className={inputClass}
            />
          </Field>
          <Field label="Anything we should know?">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How many customers and jobs, a date you want to switch by"
              className={textareaClass}
              rows={3}
            />
          </Field>
          {files.length > 0 && (
            <p className="text-[13px] text-white">{plural(files.length, 'file')} ready to send.</p>
          )}
        </div>
      </div>
    </FormSheet>
  );
}
