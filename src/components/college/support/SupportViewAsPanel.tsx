/* ==========================================================================
   SupportViewAsPanel (ELE-1966): Elec-Mate support opens a college's hub AS a
   named staff member, to see exactly what they see ("my inbox is empty").

   - Only when the college admin has allowed it (College settings, Security
     and access). Otherwise the panel says so and offers nothing.
   - A reason is required (the support request); it goes into the college's
     own activity log with who, as whom and until when.
   - Read-only: while the session is open the server refuses every write
     (restrictive RLS via _viewing_as_now). One hour, then it lapses.
   ========================================================================== */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useActingControls } from '@/hooks/college/useCollegeAccess';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { COLLEGE_BTN_PRIMARY, chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

interface Person {
  user_id: string;
  name: string;
  role: string;
}

export function SupportViewAsPanel({
  collegeId,
  collegeName,
}: {
  collegeId: string;
  collegeName: string;
}) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { startViewAs } = useActingControls();
  const [consent, setConsent] = useState<boolean | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [who, setWho] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data, error: err } = await supabase.rpc(
        'admin_list_view_as_people' as never,
        { p_college: collegeId } as never
      );
      if (cancelled) return;
      if (err) {
        setError(err.message);
        setConsent(false);
        return;
      }
      const d = (data ?? {}) as { consent?: boolean; people?: Person[] };
      setConsent(!!d.consent);
      setPeople(d.people ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, [collegeId]);

  const start = async () => {
    if (!who) return;
    setBusy(true);
    setError(null);
    try {
      await startViewAs(collegeId, who, reason.trim());
      navigate('/college');
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      toast({ title: 'Could not open', description: msg, variant: 'destructive' });
      setBusy(false);
    }
  };

  if (consent === null) {
    return <p className="text-[13px] text-white">Checking {collegeName}&rsquo;s consent…</p>;
  }

  if (!consent) {
    return (
      <div className="space-y-1" data-testid="view-as-no-consent">
        <p className="text-[13.5px] font-semibold text-white">Not allowed by {collegeName}</p>
        <p className="text-[13px] leading-relaxed text-white">
          {error ??
            `Their college admin can allow it in College settings, under Security and access. Until then support works from what the staff member tells you.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="view-as-panel">
      <p className="text-[13px] leading-relaxed text-white">
        See {collegeName}&rsquo;s hub exactly as one of their staff sees it. Read only for one hour.
        The reason goes into the college&rsquo;s activity log.
      </p>
      <div>
        <p className={labelCn}>View as</p>
        {people.length === 0 ? (
          <p className="text-[13px] text-white">No signed-in staff at this college yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Staff member">
            {people.map((p) => (
              <button
                key={p.user_id}
                type="button"
                role="radio"
                aria-checked={who === p.user_id}
                onClick={() => setWho(p.user_id)}
                className={chipCn(who === p.user_id)}
              >
                {p.name} · {p.role.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <label htmlFor={`va-reason-${collegeId}`} className={labelCn}>
          Reason (for example the support request)
        </label>
        <input
          id={`va-reason-${collegeId}`}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Tutor says their inbox is empty"
          className={inputCn}
        />
      </div>
      {error && (
        <p role="alert" className="text-[13px] font-medium text-orange-300">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={() => void start()}
        disabled={busy || !who || reason.trim().length < 5}
        className={cn(COLLEGE_BTN_PRIMARY)}
      >
        {busy ? 'Opening…' : 'View as, read only'}
      </button>
    </div>
  );
}
