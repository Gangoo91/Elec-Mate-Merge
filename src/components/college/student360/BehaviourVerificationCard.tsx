/**
 * BehaviourVerificationCard — Student 360 (EPA readiness): the employer's
 * per-behaviour verification for gateway (ELE-2040).
 *
 * Reads get_behaviour_verification: the behaviours of the learner's standard
 * version from the catalogue, the employer's current signed checklist (each
 * behaviour rated not yet / developing / consistently demonstrated, with their
 * example) and earlier versions. When the catalogue has no behaviours for the
 * learner's version it says so plainly; nothing is made up. The employer signs
 * in their portal (no account); this card only shows it. It is also in the
 * gateway pack.
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

type Rating = 'not_yet' | 'developing' | 'consistent';
interface Data {
  learner_name: string;
  standard: {
    code: string;
    version: string;
    title: string;
    version_match: string;
    effective_from: string | null;
    effective_to: string | null;
  } | null;
  behaviours: Array<{ code: string; title: string; description: string | null }> | null;
  behaviours_hash: string | null;
  gaps: string[];
  current: {
    standard_version: string;
    items: Array<{ code: string; rating: Rating; evidence: string }>;
    behaviours: Array<{ code: string; title: string }>;
    behaviours_hash: string;
    all_consistent: boolean;
    signer_name: string;
    signer_role: string;
    signer_company: string | null;
    signed_at: string;
  } | null;
  history: Array<{
    id: string;
    standard_version: string;
    signer_name: string;
    signed_at: string;
    superseded_at: string | null;
  }>;
}

const RATING: Record<Rating, string> = {
  not_yet: 'Not yet',
  developing: 'Developing',
  consistent: 'Consistently demonstrated',
};
const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function BehaviourVerificationCard({ collegeStudentId }: { collegeStudentId: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void supabase
      .rpc('get_behaviour_verification' as never, { p_student: collegeStudentId } as never)
      .then(({ data: d, error: e }) => {
        if (cancelled) return;
        if (e) setError(e.message);
        else setData(d as unknown as Data);
      });
    return () => {
      cancelled = true;
    };
  }, [collegeStudentId]);

  if (error || !data) return null;
  const cur = data.current;
  const stale = !!cur && cur.behaviours_hash !== data.behaviours_hash;

  return (
    <div
      className={cn(
        'overflow-hidden -mx-4 border-y border-white/[0.08] sm:mx-0 sm:rounded-3xl sm:border-x',
        CARD_SURFACE
      )}
      data-testid="behaviour-verification-card"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.10] px-4 py-3 sm:px-5">
        <h3 className="text-[13px] font-semibold text-white">Employer behaviour verification</h3>
        {data.standard && (
          <span className="text-[12px] text-white">
            {data.standard.code} version {data.standard.version}
          </span>
        )}
      </div>
      <div className="space-y-3 px-4 py-4 sm:px-5">
        {!data.behaviours ? (
          <p className="text-[13.5px] leading-snug text-white" data-testid="bv-missing">
            {data.gaps.includes('standard_version_for_date')
              ? `No behaviours are recorded for the version of the standard that applies to this learner's start date${data.standard ? ` (the catalogue holds ${data.standard.code} version ${data.standard.version}, ${data.standard.effective_from ?? ''} to ${data.standard.effective_to ?? ''})` : ''}. The employer is not offered a checklist until they are added.`
              : data.gaps.includes('no_standard')
                ? 'No apprenticeship standard is linked to this learner’s qualification, so there are no behaviours to verify.'
                : 'The catalogue has no behaviours for this standard yet. The employer is not offered a checklist until they are added.'}
          </p>
        ) : cur ? (
          <>
            <p className="text-[13.5px] text-white">
              Signed by {cur.signer_name}, {cur.signer_role}
              {cur.signer_company ? `, ${cur.signer_company}` : ''} on {fmt(cur.signed_at)}.{' '}
              {cur.all_consistent
                ? 'Every behaviour consistently demonstrated.'
                : `${cur.items.filter((i) => i.rating === 'consistent').length} of ${cur.items.length} consistently demonstrated.`}
              {stale
                ? ' The catalogue behaviours have changed since; ask the employer to check again.'
                : ''}
            </p>
            <ul className="divide-y divide-white/[0.08]">
              {cur.items.map((i) => {
                const b = cur.behaviours.find((x) => x.code === i.code);
                return (
                  <li key={i.code} className="py-2.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-[13px] font-semibold text-white">
                        <span className="font-mono">{i.code}</span> {b?.title ?? ''}
                      </p>
                      <span
                        className={cn(
                          'text-[12px] font-semibold',
                          i.rating === 'consistent' ? 'text-emerald-300' : 'text-orange-300'
                        )}
                      >
                        {RATING[i.rating]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-white">{i.evidence}</p>
                  </li>
                );
              })}
            </ul>
            {data.history.length > 1 && (
              <p className="text-[12px] text-white">
                {data.history.length - 1} earlier version{data.history.length - 1 === 1 ? '' : 's'}{' '}
                kept.
              </p>
            )}
          </>
        ) : (
          <p className="text-[13.5px] leading-snug text-white">
            Not verified yet. The employer rates each of the {data.behaviours.length} behaviours,
            with an example, from their portal link. It goes into the gateway pack.
          </p>
        )}
      </div>
    </div>
  );
}

export default BehaviourVerificationCard;
