/**
 * StaffNotificationPrefsCard (ELE-1913): what the College Hub pushes to YOU.
 *
 * Per-person, not per-college. Each switch is a notification_preferences row
 * (user_id, category); notify_user skips the push when it is off, and the
 * notification still lands in the bell. Safeguarding cannot be switched off:
 * the server ignores an opt-out for it, and the switch here is locked on.
 * Quiet hours (21:00 to 07:00 UK) hold pushes until morning; safeguarding
 * still comes through.
 */
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PEOPLE_LIST, StatusChip } from '@/components/college/people/peopleKit';

type Key =
  | 'college_marking'
  | 'college_hours'
  | 'college_messages'
  | 'college_reviews'
  | 'college_safeguarding'
  | 'quiet_hours';

const ROWS: Array<{ key: Key; label: string; body: string; locked?: boolean }> = [
  {
    key: 'college_marking',
    label: 'Marking and evidence',
    body: 'A quiz handed in, a witness statement signed, and new evidence in your morning summary.',
  },
  {
    key: 'college_hours',
    label: 'Off-the-job hours',
    body: 'Hours waiting to verify and app learning to approve, once a day at 08:00. Never one per entry.',
  },
  {
    key: 'college_messages',
    label: 'Messages',
    body: 'A learner messages you, asks a question in their site diary, or replies on a learning plan target.',
  },
  {
    key: 'college_reviews',
    label: 'Reviews, gateway and risk',
    body: 'An employer adds their view, a learner signs their review, a gateway declaration is signed, or a learner’s risk turns critical.',
  },
  {
    key: 'college_safeguarding',
    label: 'Safeguarding and welfare',
    body: 'Safeguarding concerns, re-alerts when one is not acknowledged, and pastoral flags. This one stays on.',
    locked: true,
  },
  {
    key: 'quiet_hours',
    label: 'Quiet hours, 21:00 to 07:00',
    body: 'Holds pushes overnight and delivers them in the morning. Safeguarding concerns still come through.',
  },
];

export function StaffNotificationPrefsCard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [prefs, setPrefs] = useState<Partial<Record<Key, boolean>>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    void (async () => {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('category, enabled')
        .eq('user_id', user.id)
        .in(
          'category',
          ROWS.map((r) => r.key)
        );
      if (cancelled) return;
      if (!error) {
        const next: Partial<Record<Key, boolean>> = {};
        for (const row of (data ?? []) as Array<{ category: string; enabled: boolean }>) {
          next[row.category as Key] = row.enabled;
        }
        setPrefs(next);
      }
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const set = async (key: Key, enabled: boolean) => {
    if (!user?.id) return;
    const before = prefs[key];
    setPrefs((p) => ({ ...p, [key]: enabled }));
    const { error } = await supabase
      .from('notification_preferences')
      .upsert(
        { user_id: user.id, category: key, enabled, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,category' }
      );
    if (error) {
      setPrefs((p) => ({ ...p, [key]: before }));
      toast({ title: 'Could not save', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <div className={PEOPLE_LIST}>
      {ROWS.map((r) => {
        const checked = r.locked ? true : prefs[r.key] !== false;
        return (
          // The whole row is the tap target (64px tall), not just the 24px switch.
          <label
            key={r.key}
            htmlFor={`staff-notif-${r.key}`}
            className={`flex min-h-[64px] items-center gap-4 px-5 py-3.5 touch-manipulation sm:px-6 ${
              r.locked || !loaded
                ? 'cursor-default'
                : 'cursor-pointer hover:bg-white/[0.03] active:bg-white/[0.05]'
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="text-[14.5px] font-semibold text-white">{r.label}</div>
              <div className="mt-0.5 text-[12.5px] leading-relaxed text-white">{r.body}</div>
            </div>
            {r.locked ? (
              <StatusChip tone="done">Always on</StatusChip>
            ) : (
              <Switch
                id={`staff-notif-${r.key}`}
                checked={checked}
                disabled={r.locked || !loaded}
                onCheckedChange={(v) => void set(r.key, v)}
                aria-label={r.label}
                className="relative touch-manipulation after:absolute after:-inset-x-2 after:-inset-y-2.5 after:content-['']"
              />
            )}
          </label>
        );
      })}
    </div>
  );
}
