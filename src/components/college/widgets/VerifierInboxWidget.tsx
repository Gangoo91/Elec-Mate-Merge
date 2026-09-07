import { useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useToast } from '@/hooks/use-toast';
import { useVerifierAuthority } from '@/hooks/useVerifierAuthority';
import { useVerifierInbox, type InboxRow } from '@/hooks/useVerifierInbox';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   VerifierInboxWidget — DSL/admin queue of records awaiting sign-off.
   Renders only for users with verifier authority (DSL / Dep DSL / QN /
   admin / head_of_department).

   Hub card language: one row per staff member (rule · name · role · count
   · chevron → their vault), then their records indented beneath it with
   three h-11 text actions. Approve is the volt word; nothing here is a
   solid button, because the page already has its one.
   ========================================================================== */

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);
const ACTION =
  'flex h-11 items-center px-3 text-[12px] font-semibold transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] disabled:cursor-wait disabled:opacity-60';

export function VerifierInboxWidget() {
  const { isVerifier, loading: authLoading } = useVerifierAuthority();
  const { rows, loading, approve, reject } = useVerifierInbox(isVerifier);
  const { toast } = useToast();
  const [openStaffId, setOpenStaffId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Group by staff member so a tutor's 3 uploads aren't 3 separate cards
  const grouped = useMemo(() => {
    const map = new Map<string, { staffName: string; staffRole: string; items: InboxRow[] }>();
    for (const r of rows) {
      const key = r.college_staff_id;
      const g = map.get(key) ?? {
        staffName: r.staff_name,
        staffRole: r.staff_role,
        items: [],
      };
      g.items.push(r);
      map.set(key, g);
    }
    return Array.from(map.entries()).map(([staffId, g]) => ({
      staffId,
      ...g,
    }));
  }, [rows]);

  if (authLoading) return null;
  if (!isVerifier) return null;

  const total = rows.length;

  const handleApprove = async (recordId: string, label: string, who: string) => {
    setBusyId(recordId);
    try {
      await approve(recordId);
      toast({
        title: 'Approved',
        description: `${label} verified for ${who}.`,
      });
    } catch (e) {
      toast({
        title: 'Approve failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (recordId: string, label: string, who: string) => {
    const reason = window.prompt(
      `Return "${label}" to ${who} with a note explaining what's wrong (e.g. "scan unreadable", "wrong cert"):`
    );
    if (!reason || !reason.trim()) return;
    setBusyId(recordId);
    try {
      await reject(recordId, reason.trim());
      toast({
        title: 'Returned to staff',
        description: `${label} sent back with your note.`,
      });
    } catch (e) {
      toast({
        title: 'Action failed',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleView = async (path: string) => {
    const { data } = await supabase.storage.from('compliance-evidence').createSignedUrl(path, 60);
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <section className={CARD}>
        <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
          <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
            Awaiting your sign-off
          </h3>
          <span
            className={cn(
              'text-[11px] font-semibold tabular-nums',
              total > 0 ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {total} {total === 1 ? 'record' : 'records'}
          </span>
        </div>

        {loading ? (
          <div className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
            {Array.from({ length: 2 }).map((_, i) => (
              <RowSkeleton key={i} />
            ))}
          </div>
        ) : total === 0 ? (
          <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
            Nothing awaiting your sign-off.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
            {grouped.map((g) => (
              <li key={g.staffId}>
                <StaffGroup
                  staffName={g.staffName}
                  staffRole={g.staffRole}
                  items={g.items}
                  busyId={busyId}
                  onOpen={() => setOpenStaffId(g.staffId)}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onView={handleView}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <StaffComplianceDrawer
        open={!!openStaffId}
        onOpenChange={(o) => {
          if (!o) setOpenStaffId(null);
        }}
        staffId={openStaffId}
      />
    </>
  );
}

/* ──────────────────────────────────────────────────────── */

function StaffGroup({
  staffName,
  staffRole,
  items,
  busyId,
  onOpen,
  onApprove,
  onReject,
  onView,
}: {
  staffName: string;
  staffRole: string;
  items: InboxRow[];
  busyId: string | null;
  onOpen: () => void;
  onApprove: (id: string, label: string, who: string) => void;
  onReject: (id: string, label: string, who: string) => void;
  onView: (path: string) => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span aria-hidden="true" className="h-8 w-[3px] shrink-0 rounded-full bg-elec-yellow" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {staffName}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            <span className="capitalize">{staffRole.replace(/_/g, ' ')}</span> · {items.length}{' '}
            pending
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>

      <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
        {items.map((it) => (
          <li key={it.id} className="px-4 py-3 pl-[31px] sm:px-5 sm:pl-[35px]">
            <RecordRow
              item={it}
              disabled={busyId === it.id}
              onApprove={() => onApprove(it.id, it.requirement_label, staffName)}
              onReject={() => onReject(it.id, it.requirement_label, staffName)}
              onView={() => it.evidence_path && onView(it.evidence_path)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

function RecordRow({
  item,
  disabled,
  onApprove,
  onReject,
  onView,
}: {
  item: InboxRow;
  disabled: boolean;
  onApprove: () => void;
  onReject: () => void;
  onView: () => void;
}) {
  const expiry = item.expires_at
    ? new Date(item.expires_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

  const meta = [
    item.requirement_category,
    item.reference_no,
    expiry ? `Expires ${expiry}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div>
      <div className="truncate text-[13px] font-semibold leading-tight text-white">
        {item.requirement_label}
      </div>
      <div className="mt-0.5 truncate text-[12px] capitalize leading-tight text-white">{meta}</div>
      <div className="-mx-3 mt-1 flex items-center">
        {item.evidence_path && (
          <button type="button" onClick={onView} className={cn(ACTION, 'text-white')}>
            View evidence
          </button>
        )}
        <span className="flex-1" />
        <button
          type="button"
          onClick={onReject}
          disabled={disabled}
          className={cn(ACTION, 'text-white')}
        >
          Return
        </button>
        <button
          type="button"
          onClick={onApprove}
          disabled={disabled}
          className={cn(ACTION, 'font-bold text-elec-yellow')}
        >
          Approve
        </button>
      </div>
    </div>
  );
}

function RowSkeleton() {
  return (
    <div className="animate-pulse px-4 py-3.5 sm:px-5">
      <div className="flex items-center gap-3">
        <div className="h-8 w-[3px] rounded-full bg-white/[0.10]" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 rounded bg-white/[0.10]" />
          <div className="h-2.5 w-1/4 rounded bg-white/[0.10]" />
        </div>
      </div>
      <div className="mt-3 h-12 rounded-xl bg-white/[0.06]" />
    </div>
  );
}
