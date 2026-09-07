import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  useMyPendingAcknowledgements,
  type PendingPolicy,
} from '@/hooks/useMyPendingAcknowledgements';
import { PolicyAcknowledgeSheet } from '@/components/college/sheets/PolicyAcknowledgeSheet';

/* ==========================================================================
   MyAcknowledgementsWidget — live policies the user hasn't signed yet.
   Hidden when the user isn't a staff member. Says "Nothing to sign" rather
   than vanishing when the list is empty, so the Compliance section never
   looks like it failed to load.
   ========================================================================== */

export function MyAcknowledgementsWidget() {
  const { pending, loading, linked } = useMyPendingAcknowledgements();
  const [openId, setOpenId] = useState<string | null>(null);

  if (linked === false) return null;
  if (loading) return null;

  const total = pending.length;

  return (
    <>
      <section
        className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}
      >
        <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
          <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
            Policies to sign
          </h3>
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              total > 0 ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {total} {total === 1 ? 'policy' : 'policies'}
          </span>
        </div>

        {total === 0 ? (
          <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
            Nothing to sign. You are up to date with every live policy.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
            {pending.map((p) => (
              <li key={p.id}>
                <PolicyRow policy={p} onOpen={() => setOpenId(p.id)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <PolicyAcknowledgeSheet
        open={!!openId}
        onOpenChange={(o) => {
          if (!o) setOpenId(null);
        }}
        policyId={openId}
      />
    </>
  );
}

/* ──────────────────────────────────────────────────────── */

function PolicyRow({ policy, onOpen }: { policy: PendingPolicy; onOpen: () => void }) {
  const reason = [
    policy.category.replace(/_/g, ' '),
    policy.code,
    `v${policy.version}`,
    policy.effective_from
      ? `Effective ${new Date(policy.effective_from).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
        })}`
      : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
    >
      <span aria-hidden="true" className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
          {policy.title}
        </span>
        <span className="mt-0.5 block truncate text-[12px] capitalize leading-tight text-white">
          {reason}
        </span>
      </span>
      <span className="shrink-0 text-[12px] font-bold text-elec-yellow">Read &amp; sign</span>
      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
    </button>
  );
}
