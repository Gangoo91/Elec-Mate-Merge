import { useEffect, useState } from 'react';
import { Award, Wand2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { EpaBriefSheet } from '@/components/college/sheets/EpaBriefSheet';

/* ==========================================================================
   MyEpaBriefCard — apprentice-side gateway to their personalised pre-EPA
   brief. Looks up the learner's college_students row, only renders if
   they're linked to a college. Opens the same EpaBriefSheet as tutors use.
   ========================================================================== */

export function MyEpaBriefCard() {
  const { user } = useAuth();
  const [linked, setLinked] = useState<{ id: string; name: string } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('college_students')
        .select('id, name')
        .eq('user_id', user.id)
        .maybeSingle();
      if (cancelled) return;
      setLinked((data as { id: string; name: string } | null) ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!linked) return null;

  return (
    <>
      <div className="rounded-2xl border border-elec-yellow/[0.18] bg-elec-yellow/[0.04] px-5 py-4 flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-elec-yellow/[0.14] border border-elec-yellow/30 flex items-center justify-center flex-shrink-0">
          <Award className="h-5 w-5 text-elec-yellow" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Personalised brief
          </div>
          <h3 className="mt-0.5 text-[15px] font-semibold text-white leading-tight">
            Get ready for your EPA
          </h3>
          <p className="mt-1 text-[12px] text-white/65 leading-snug">
            5 likely viva topics, BS 7671 hot zones, weak ACs to revise — written for you.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation flex-shrink-0"
        >
          <Wand2 className="h-3.5 w-3.5" strokeWidth={2.5} />
          Get my brief
        </button>
      </div>

      <EpaBriefSheet
        open={open}
        onOpenChange={setOpen}
        collegeStudentId={linked.id}
        studentName={linked.name}
      />
    </>
  );
}
