import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FounderCount {
  count: number;
  cap: number;
  slots_left: number;
}

/**
 * Live counter banner for the Mate Founder programme — first 100 customers
 * lock in £29.99/month forever. Reads via the public mate_founder_count() RPC,
 * cached for the page's lifetime. Hides itself once slots are full.
 */
export function FounderBanner({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<FounderCount | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: rows, error } = await supabase.rpc('mate_founder_count');
      if (!alive || error) return;
      const row = Array.isArray(rows) ? rows[0] : rows;
      if (row && typeof row.count === 'number') setData(row as FounderCount);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!data || data.slots_left <= 0) return null;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-elec-yellow/30 bg-elec-yellow/[0.08] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-elec-yellow">
        <Sparkles className="h-3 w-3" />
        Founder pricing · {data.slots_left} of {data.cap} left
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/[0.10] via-amber-500/[0.06] to-orange-500/[0.06] p-5 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400" />
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-elec-yellow/15 items-center justify-center shrink-0">
          <Sparkles className="h-6 w-6 text-elec-yellow" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
            Founder pricing
          </div>
          <h3 className="mt-1.5 text-lg sm:text-xl font-bold text-white tracking-[-0.01em]">
            £29.99/month forever — only {data.slots_left} of {data.cap} spots left.
          </h3>
          <p className="mt-2 text-sm text-white/70 leading-relaxed">
            The first {data.cap} Mate customers lock in the founder price for life. After
            that the price goes back to £39.99/month for new sign-ups. Discount applied
            automatically at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Small inline pill for use inside the user's own dashboard / settings tab to
 * show their founder status. Only renders when `isFounder` is true.
 */
export function FounderBadge({ isFounder }: { isFounder?: boolean }) {
  if (!isFounder) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-elec-yellow/30 bg-elec-yellow/[0.08] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow">
      <Sparkles className="h-2.5 w-2.5" />
      Founder
    </span>
  );
}
