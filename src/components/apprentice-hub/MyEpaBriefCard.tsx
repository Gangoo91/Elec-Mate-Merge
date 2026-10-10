import { LC_FRAME } from '@/components/apprentice-hub/college-hub/learnerUi';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { EpaBriefSheet } from '@/components/college/sheets/EpaBriefSheet';

/* ==========================================================================
   MyEpaBriefCard — editorial. No icons. Single neutral panel matching the
   college-hub editorial pattern. CTA wraps to its own line on mobile so the
   description never gets crushed.
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
      <section className={cn(LC_FRAME, 'px-4 sm:px-5 py-4 sm:py-5')}>
        <div className="text-[15px] font-semibold tracking-tight text-white">
          Personalised brief
        </div>
        <h3 className="mt-2 text-[16px] sm:text-[17px] font-semibold text-white leading-tight tracking-tight">
          Get ready for your end-point assessment
        </h3>
        <p className="mt-2 text-[13px] text-white leading-relaxed max-w-prose">
          Five likely viva topics, BS 7671 hot zones, and the ACs you should revise hardest, written
          for you, grounded in your portfolio and mock results.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow"
        >
          Write my brief
        </button>
      </section>

      <EpaBriefSheet
        open={open}
        onOpenChange={setOpen}
        collegeStudentId={linked.id}
        studentName={linked.name}
      />
    </>
  );
}
