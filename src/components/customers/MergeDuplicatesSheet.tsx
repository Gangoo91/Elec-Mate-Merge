import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Customer } from '@/hooks/inspection/useCustomers';
import { Pill } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

export interface DuplicateGroup {
  /** What the group shares — a phone number or email address */
  matchedOn: string;
  customers: Customer[];
}

interface MergeDuplicatesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: DuplicateGroup[];
  /** Merge source into target. Returns true on success. */
  onMerge: (sourceId: string, targetId: string) => Promise<boolean>;
}

const formatLastActivity = (date?: string) => {
  if (!date) return 'No activity';
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000);
  if (days === 0) return 'Today';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};

/**
 * Review & merge duplicate customers (ELE-1292). For each group sharing a
 * phone/email, the user picks the record to KEEP; the others are merged into
 * it one by one — certs, quotes, properties and reminders all follow.
 */
export const MergeDuplicatesSheet = ({
  open,
  onOpenChange,
  groups,
  onMerge,
}: MergeDuplicatesSheetProps) => {
  // groupKey -> chosen keeper id
  const [keepChoice, setKeepChoice] = useState<Record<string, string>>({});
  const [mergingGroup, setMergingGroup] = useState<string | null>(null);

  const handleMergeGroup = async (group: DuplicateGroup) => {
    const keepId = keepChoice[group.matchedOn];
    if (!keepId) return;
    setMergingGroup(group.matchedOn);
    try {
      for (const c of group.customers) {
        if (c.id === keepId) continue;
        const ok = await onMerge(c.id, keepId);
        if (!ok) break;
      }
    } finally {
      setMergingGroup(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] rounded-t-2xl p-0 border-0 bg-[#1c1c1e] flex flex-col"
      >
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-9 h-1 rounded-full bg-white/20" />
        </div>

        <div className="px-4 pb-3 border-b border-white/[0.08] flex-shrink-0">
          <h2 className="text-[17px] font-semibold text-white">Review duplicates</h2>
          <p className="text-[13px] text-white/65 mt-0.5">
            Choose which record to keep — certificates, quotes, invoices and properties from the
            others move across, then the duplicates are deleted.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-5 pb-10">
          {groups.length === 0 ? (
            <p className="text-sm text-white/70 text-center py-8">
              No duplicates left — all clean.
            </p>
          ) : (
            groups.map((group) => {
              const keepId = keepChoice[group.matchedOn];
              const merging = mergingGroup === group.matchedOn;
              return (
                <div
                  key={group.matchedOn}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
                >
                  <div className="px-4 py-2.5 border-b border-white/[0.06]">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-400">
                      Share {group.matchedOn}
                    </span>
                  </div>
                  <div className="p-3 space-y-2">
                    {group.customers.map((c) => {
                      const chosen = keepId === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() =>
                            setKeepChoice((prev) => ({ ...prev, [group.matchedOn]: c.id }))
                          }
                          disabled={merging}
                          className={cn(
                            'w-full flex items-center gap-3 p-3 rounded-xl border text-left touch-manipulation transition-all active:scale-[0.99]',
                            chosen
                              ? 'border-elec-yellow/50 bg-elec-yellow/[0.06]'
                              : 'border-white/[0.06] bg-white/[0.03]'
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                            <p className="text-[12px] text-white/60 truncate">
                              {[c.email, c.phone].filter(Boolean).join(' · ') || 'No contact info'}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            {(c.certificateCount || 0) > 0 && (
                              <Pill tone="green">{c.certificateCount} certs</Pill>
                            )}
                            <span className="text-[10.5px] text-white/50">
                              {formatLastActivity(c.lastActivityAt)}
                            </span>
                          </div>
                          <span
                            className={cn(
                              'shrink-0 text-[11px] font-semibold px-2 py-1 rounded-full',
                              chosen ? 'bg-elec-yellow text-black' : 'bg-white/[0.06] text-white/60'
                            )}
                          >
                            {chosen ? 'Keep' : 'Keep?'}
                          </span>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => handleMergeGroup(group)}
                      disabled={!keepId || merging}
                      className="w-full h-11 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                      {merging ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        `Merge ${group.customers.length - 1} into selected`
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
