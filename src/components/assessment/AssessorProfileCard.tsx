/**
 * AssessorProfileCard — "Your assessor profile" at the top of /assessor (ELE-1870).
 *
 * One row in assessor_profiles per assessor: name, organisation, assessing
 * qualifications and the year they qualified. Learners see the
 * qualifications next to the assessor's name, and every decision snapshots
 * them (portfolio_assessment_decisions.assessor_qualifications), so a
 * decision always shows what the assessor held when they made it.
 *
 * No row yet: the form shows open. Saved: a compact summary with Edit.
 */
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { PublicCard } from '@/components/public/PublicPageShell';
import { ASSESSOR_QUALIFICATIONS, qualificationsLine } from '@/lib/assessorQualifications';

interface Profile {
  display_name: string | null;
  organisation: string | null;
  qualifications: string[];
  qualified_since: string | null;
}

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';
const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

export function AssessorProfileCard({
  userId,
  defaultName,
}: {
  userId: string;
  defaultName?: string | null;
}) {
  const { toast } = useToast();
  const [saved, setSaved] = useState<Profile | null | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Profile>({
    display_name: defaultName ?? '',
    organisation: '',
    qualifications: [],
    qualified_since: null,
  });

  useEffect(() => {
    supabase
      .from('assessor_profiles' as never)
      .select('display_name, organisation, qualifications, qualified_since')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        // Could not read it: show nothing rather than a blank form whose save
        // would overwrite the profile the assessor already has.
        if (error) return;
        const row = (data as unknown as Profile | null) ?? null;
        setSaved(row);
        if (row) setForm({ ...row, qualifications: row.qualifications ?? [] });
      });
  }, [userId]);

  // Prefill the name from the account once it arrives, if nothing is typed yet.
  useEffect(() => {
    if (defaultName && !saved)
      setForm((f) => (f.display_name ? f : { ...f, display_name: defaultName }));
  }, [defaultName, saved]);

  const toggle = (q: string) =>
    setForm((f) => ({
      ...f,
      qualifications: f.qualifications.includes(q)
        ? f.qualifications.filter((x) => x !== q)
        : [...f.qualifications, q],
    }));

  const save = async () => {
    setSaving(true);
    const row = {
      user_id: userId,
      display_name: form.display_name?.trim() || null,
      organisation: form.organisation?.trim() || null,
      qualifications: form.qualifications,
      qualified_since: form.qualified_since || null,
    };
    const { error } = await supabase
      .from('assessor_profiles' as never)
      .upsert(row as never, { onConflict: 'user_id' });
    setSaving(false);
    if (error) {
      toast({
        title: 'Could not save your profile',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }
    setSaved({ ...form, qualifications: [...form.qualifications] });
    setEditing(false);
    toast({
      title: 'Profile saved',
      description: 'Learners see your qualifications next to your decisions.',
    });
  };

  if (saved === undefined) return null;

  // Compact summary once saved.
  if (saved && !editing) {
    const quals = qualificationsLine(saved.qualifications);
    const since = saved.qualified_since ? new Date(saved.qualified_since).getFullYear() : null;
    return (
      <PublicCard className="mb-8 flex items-center gap-4 border-white/[0.12]">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-elec-yellow">Your assessor profile</p>
          <p className="truncate text-[16px] font-bold text-white">
            {saved.display_name || 'Assessor'}
            {saved.organisation ? `, ${saved.organisation}` : ''}
          </p>
          <p className="text-[14px] text-white">
            {quals ?? 'No qualifications listed'}
            {since ? ` · qualified ${since}` : ''}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex h-11 shrink-0 items-center rounded-full border border-white/[0.2] px-4 text-[14px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
        >
          Edit
        </button>
      </PublicCard>
    );
  }

  return (
    <PublicCard className="mb-8 space-y-5 border-white/[0.12]">
      <div>
        <p className="text-[13px] font-semibold text-elec-yellow">Your assessor profile</p>
        <p className="mt-1 text-[15px] leading-snug text-white">
          Learners see your qualifications next to your name, and each decision you record keeps a
          copy of them.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[12px] font-medium text-white">Name</span>
          <input
            className={inputCn}
            value={form.display_name ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, display_name: e.target.value }))}
            placeholder="Your name"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[12px] font-medium text-white">Organisation</span>
          <input
            className={inputCn}
            value={form.organisation ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, organisation: e.target.value }))}
            placeholder="Training provider or company"
            autoComplete="organization"
          />
        </label>
      </div>

      <div>
        <span className="mb-2 block text-[12px] font-medium text-white">
          Assessing qualifications
        </span>
        <div className="flex flex-wrap gap-2">
          {ASSESSOR_QUALIFICATIONS.map((q) => {
            const on = form.qualifications.includes(q);
            return (
              <button
                key={q}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(q)}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-left text-[14px] touch-manipulation',
                  on ? chipOn : chipOff
                )}
              >
                {q}
              </button>
            );
          })}
        </div>
      </div>

      <label className="block sm:max-w-[16rem]">
        <span className="mb-1 block text-[12px] font-medium text-white">Qualified since</span>
        <input
          type="date"
          className={inputCn}
          value={form.qualified_since ?? ''}
          onChange={(e) => setForm((f) => ({ ...f, qualified_since: e.target.value || null }))}
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[15px] font-semibold text-black touch-manipulation disabled:opacity-60 sm:w-auto"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save profile
        </button>
        {saved && (
          <button
            type="button"
            onClick={() => {
              setForm({ ...saved, qualifications: saved.qualifications ?? [] });
              setEditing(false);
            }}
            className="inline-flex h-11 items-center rounded-full border border-white/[0.2] px-5 text-[15px] font-semibold text-white touch-manipulation"
          >
            Cancel
          </button>
        )}
      </div>
    </PublicCard>
  );
}
