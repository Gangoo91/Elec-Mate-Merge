import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   CurriculumStatusBadge — small chip that tells the tutor whether the
   learner's qualification has its LO/AC catalogue loaded. When unseeded the
   AI surfaces (next-best-action, ILP goals, quiz authoring) can only ground
   themselves at the high level — the tutor needs to know that.

   Self-contained: takes a courseId or courseCode, looks up qualification
   status via the `ac_count` + `is_curriculum_seeded` columns we maintain on
   the qualifications table.
   ========================================================================== */

interface Props {
  /** college_courses.id — preferred when on a Student 360. */
  courseId?: string | null;
  /** Direct qualification_code — use when courseId isn't to hand. */
  qualificationCode?: string | null;
  /** Inline 'compact' for hero strips, 'full' for quiz authoring sheets. */
  variant?: 'compact' | 'full';
  className?: string;
}

interface Status {
  qualificationCode: string;
  ac_count: number;
  is_curriculum_seeded: boolean;
}

export function CurriculumStatusBadge({
  courseId,
  qualificationCode,
  variant = 'compact',
  className,
}: Props) {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let code = qualificationCode ?? null;
      if (!code && courseId) {
        const { data: course } = await supabase
          .from('college_courses')
          .select('code')
          .eq('id', courseId)
          .maybeSingle();
        code = (course as { code?: string | null } | null)?.code ?? null;
      }
      if (!code) {
        if (!cancelled) {
          setStatus(null);
          setLoading(false);
        }
        return;
      }
      const { data: qual } = await supabase
        .from('qualifications')
        .select('code, ac_count, is_curriculum_seeded')
        .eq('code', code)
        .maybeSingle();
      if (cancelled) return;
      if (qual) {
        const q = qual as Status & { code: string };
        setStatus({
          qualificationCode: q.code,
          ac_count: q.ac_count,
          is_curriculum_seeded: q.is_curriculum_seeded,
        });
      } else {
        setStatus(null);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [courseId, qualificationCode]);

  if (loading || !status) return null;

  const seeded = status.is_curriculum_seeded;
  const tone = seeded ? 'emerald' : 'amber';
  const label = seeded
    ? `${status.ac_count} ACs grounded`
    : 'AC catalogue not loaded';

  if (variant === 'compact') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 h-5 px-2 rounded-full text-[10px] font-medium tracking-tight tabular-nums',
          tone === 'emerald'
            ? 'bg-emerald-500/[0.08] border border-emerald-400/30 text-emerald-200'
            : 'bg-amber-500/[0.10] border border-amber-400/30 text-amber-200',
          className
        )}
        title={
          seeded
            ? `AI grounding for ${status.qualificationCode}: ${status.ac_count} ACs available for citation, semantic search active.`
            : `${status.qualificationCode}: no AC catalogue loaded yet — AI surfaces will produce general guidance only, not AC-cited recommendations.`
        }
      >
        {label}
      </span>
    );
  }

  // full
  return (
    <div
      className={cn(
        'rounded-2xl border px-4 py-3',
        seeded
          ? 'border-emerald-500/[0.18] bg-emerald-500/[0.04]'
          : 'border-amber-500/[0.30] bg-amber-500/[0.05]',
        className
      )}
    >
      <div
        className={cn(
          'text-[10px] font-medium uppercase tracking-[0.18em]',
          tone === 'emerald' ? 'text-emerald-200' : 'text-amber-200'
        )}
      >
        AI grounding
      </div>
      <p className="mt-1 text-[12.5px] text-white leading-snug">
        {seeded ? (
          <>
            <span className="text-emerald-300 font-medium">{status.ac_count} ACs</span> from{' '}
            <span className="font-medium">{status.qualificationCode}</span> are loaded for AI
            citation. Recommendations and quizzes will cite real AC codes.
          </>
        ) : (
          <>
            <span className="text-amber-300 font-medium">No AC catalogue loaded</span> for{' '}
            <span className="font-medium">{status.qualificationCode}</span>. The AI will produce
            general guidance only — recommendations won't cite specific ACs until the catalogue is
            seeded.
          </>
        )}
      </p>
    </div>
  );
}
