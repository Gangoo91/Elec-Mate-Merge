import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  useMyPendingAcknowledgements,
  type PendingPolicy,
} from '@/hooks/useMyPendingAcknowledgements';
import { PolicyAcknowledgeSheet } from '@/components/college/sheets/PolicyAcknowledgeSheet';

/* ==========================================================================
   MyAcknowledgementsWidget — surfaces live policies the user hasn't signed
   yet. Hidden when the user isn't a staff member or has nothing pending.
   ========================================================================== */

export function MyAcknowledgementsWidget() {
  const { pending, loading, linked } = useMyPendingAcknowledgements();
  const [openId, setOpenId] = useState<string | null>(null);

  if (linked === false) return null;
  if (loading || pending.length === 0) return null;

  const total = pending.length;

  return (
    <>
      <div className="bg-[hsl(0_0%_12%)] border border-amber-500/30 rounded-2xl overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-300/85">
              Sign off
            </div>
            <div className="mt-0.5 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
              {total} polic{total === 1 ? 'y' : 'ies'} awaiting your sign-off
            </div>
          </div>
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-amber-500/[0.12] border border-amber-500/30 text-[12px] font-semibold tabular-nums text-amber-200">
            {total}
          </span>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {pending.map((p) => (
            <PolicyRow key={p.id} policy={p} onOpen={() => setOpenId(p.id)} />
          ))}
        </div>
      </div>

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
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'group w-full text-left px-5 sm:px-6 py-3.5 flex items-center gap-3',
        'hover:bg-white/[0.02] active:bg-white/[0.04] transition-colors touch-manipulation'
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-medium text-white truncate">{policy.title}</div>
        <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white/55">
          <span className="capitalize">{policy.category.replace(/_/g, ' ')}</span>
          {policy.code && (
            <>
              <span className="text-white/25">·</span>
              <span className="font-mono">{policy.code}</span>
            </>
          )}
          <span className="text-white/25">·</span>
          <span className="tabular-nums">v{policy.version}</span>
          {policy.effective_from && (
            <>
              <span className="text-white/25">·</span>
              <span>
                Effective{' '}
                {new Date(policy.effective_from).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
            </>
          )}
        </div>
      </div>
      <span className="shrink-0 h-8 px-3 rounded-full bg-elec-yellow/[0.1] border border-elec-yellow/40 text-[11.5px] font-semibold text-elec-yellow group-hover:bg-elec-yellow/[0.18] transition-colors inline-flex items-center">
        Read & sign →
      </span>
    </button>
  );
}
