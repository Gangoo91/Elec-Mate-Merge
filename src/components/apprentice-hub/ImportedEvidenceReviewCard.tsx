import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';

/* ==========================================================================
   ImportedEvidenceReviewCard (ELE-1974): evidence your college brought across
   from your previous e-portfolio, waiting for you to check before it joins
   your record.

   Accept: the files are copied from the college's private import folder into
   your own portfolio, and a portfolio item is created with where it came
   from (original assessor, date, outcome). Decline: it is left out, with your
   reason for the college. Renders nothing when there is nothing to review.
   ========================================================================== */

interface ImportFile {
  path: string;
  name: string;
  size?: number;
  type?: string;
}

interface Item {
  id: string;
  title: string;
  description: string | null;
  criteria: Array<{ unit_code: string; ac_code: string; found: boolean }>;
  criteria_raw: string[];
  original_assessor: string | null;
  original_assessed_on: string | null;
  original_outcome: string | null;
  files: ImportFile[];
  created_at: string;
}

const BUCKET = 'college-learner-evidence';

export function ImportedEvidenceReviewCard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [declining, setDeclining] = useState<string | null>(null);
  const [reason, setReason] = useState('');

  const load = useCallback(async () => {
    if (!user?.id) return;
    const { data } = await supabase
      .from('college_evidence_import_items' as never)
      .select(
        'id, title, description, criteria, criteria_raw, original_assessor, original_assessed_on, original_outcome, files, created_at'
      )
      .eq('learner_user_id', user.id)
      .eq('status', 'awaiting_learner')
      .order('created_at');
    setItems(((data as unknown as Item[]) ?? []) as Item[]);
  }, [user?.id]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!user?.id || items.length === 0) return null;

  const accept = async (it: Item) => {
    setBusy(it.id);
    try {
      // Copy each staged file into the learner's own portfolio folder.
      const storage: Array<Record<string, unknown>> = [];
      for (const f of it.files ?? []) {
        const { data: blob, error: dErr } = await supabase.storage.from(BUCKET).download(f.path);
        if (dErr || !blob) throw new Error(`Could not open ${f.name}`);
        const safe = f.name.replace(/[^A-Za-z0-9._-]+/g, '-').slice(-80);
        const dest = `${user.id}/imported/${it.id}/${safe}`;
        const { error: uErr } = await supabase.storage
          .from('portfolio-evidence')
          .upload(dest, blob, { upsert: true, contentType: f.type || blob.type || undefined });
        if (uErr) throw new Error(`Could not copy ${f.name}`);
        const { data: pub } = supabase.storage.from('portfolio-evidence').getPublicUrl(dest);
        storage.push({
          id: crypto.randomUUID(),
          name: f.name,
          size: f.size ?? blob.size,
          type: f.type || blob.type,
          url: pub.publicUrl,
          uploadDate: new Date().toISOString(),
          evidenceType: 'imported',
        });
      }
      const { error } = await supabase.rpc(
        'review_imported_evidence' as never,
        { p_item: it.id, p_accept: true, p_note: null, p_storage: storage } as never
      );
      if (error) throw new Error(error.message);
      toast({ title: 'Added to your portfolio' });
      void load();
    } catch (e) {
      toast({ title: 'Not added', description: (e as Error).message, variant: 'destructive' });
    }
    setBusy(null);
  };

  const decline = async (it: Item) => {
    setBusy(it.id);
    const { error } = await supabase.rpc(
      'review_imported_evidence' as never,
      { p_item: it.id, p_accept: false, p_note: reason || null } as never
    );
    setBusy(null);
    if (error)
      return toast({ title: 'Not saved', description: error.message, variant: 'destructive' });
    setDeclining(null);
    setReason('');
    toast({ title: 'Left out. Your college can see why.' });
    void load();
  };

  return (
    <section
      aria-label="Evidence to check"
      className={cn(CARD_BASE, CARD_NEUTRAL, 'gap-3 p-4 active:scale-100')}
      data-testid="imported-evidence-card"
    >
      <div>
        <h2 className="text-[16px] font-semibold text-white">
          {items.length} {items.length === 1 ? 'piece' : 'pieces'} of evidence from your old
          portfolio
        </h2>
        <p className="mt-1 text-[13px] leading-snug text-white">
          Your college brought these across. Check each one is yours and right before it joins your
          record.
        </p>
      </div>
      <ul className="space-y-3">
        {items.slice(0, 5).map((it) => (
          <li key={it.id} className="rounded-xl border border-white/[0.1] p-3">
            <p className="text-[14px] font-semibold text-white">{it.title}</p>
            {it.description && (
              <p className="mt-1 text-[13px] leading-snug text-white">{it.description}</p>
            )}
            <p className="mt-1.5 text-[12.5px] leading-snug text-white">
              {it.original_assessor ? `Assessed by ${it.original_assessor}` : 'Assessor not given'}
              {it.original_assessed_on
                ? ` on ${new Date(`${it.original_assessed_on}T12:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                : ''}
              {it.original_outcome ? `, outcome ${it.original_outcome}` : ''}.
              {it.criteria?.length
                ? ` Criteria: ${it.criteria.map((c) => `${c.unit_code} AC ${c.ac_code}`).join(', ')}.`
                : ''}
              {it.files?.length
                ? ` ${it.files.length} ${it.files.length === 1 ? 'file' : 'files'}.`
                : ''}
            </p>
            {declining === it.id ? (
              <div className="mt-3 space-y-2">
                <input
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Why leave it out? (optional)"
                  className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busy === it.id}
                    onClick={() => void decline(it)}
                    className="h-11 flex-1 rounded-xl border border-white/[0.18] px-4 text-[13px] font-semibold text-white touch-manipulation"
                  >
                    Leave it out
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeclining(null)}
                    className="h-11 flex-1 rounded-xl border border-white/[0.18] px-4 text-[13px] font-semibold text-white touch-manipulation"
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  disabled={busy === it.id}
                  onClick={() => void accept(it)}
                  className="h-11 flex-1 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation disabled:bg-white/[0.08] disabled:text-white"
                >
                  {busy === it.id ? 'Adding…' : 'Yes, add it'}
                </button>
                <button
                  type="button"
                  onClick={() => setDeclining(it.id)}
                  className="h-11 flex-1 rounded-xl border border-white/[0.18] px-4 text-[13px] font-semibold text-white touch-manipulation"
                >
                  Not mine or wrong
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {items.length > 5 && (
        <p className="text-[12.5px] text-white">{items.length - 5} more after these.</p>
      )}
    </section>
  );
}
