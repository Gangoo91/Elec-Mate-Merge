import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useVerifierAuthority } from '@/hooks/useVerifierAuthority';
import { useVerifierInbox, type InboxRow } from '@/hooks/useVerifierInbox';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   VerifierInboxWidget — DSL/admin queue of records awaiting sign-off.
   Renders only for users with verifier authority (DSL / Dep DSL / QN /
   admin / head_of_department).
   ========================================================================== */

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

  // Empty state — nice-to-have when nothing is pending
  if (!loading && total === 0) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-emerald-500/20 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-7 w-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 inline-flex items-center justify-center text-[11px] font-bold"
          >
            ✓
          </span>
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Your inbox
            </div>
            <div className="mt-0.5 text-[14px] font-medium text-white">
              Nothing awaiting your sign-off
            </div>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <>
      <div className="bg-[hsl(0_0%_12%)] border border-purple-500/25 rounded-2xl overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-purple-300/85">
              Your inbox
            </div>
            <div className="mt-0.5 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
              {total} record{total === 1 ? '' : 's'} awaiting your sign-off
            </div>
          </div>
          <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-purple-500/[0.12] border border-purple-500/30 text-[12px] font-semibold tabular-nums text-purple-200">
            {total}
          </span>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => <RowSkeleton key={i} />)
            : grouped.map((g) => (
                <StaffGroup
                  key={g.staffId}
                  staffName={g.staffName}
                  staffRole={g.staffRole}
                  items={g.items}
                  busyId={busyId}
                  onOpen={() => setOpenStaffId(g.staffId)}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onView={async (path) => {
                    const { data } = await supabase.storage
                      .from('compliance-evidence')
                      .createSignedUrl(path, 60);
                    if (data?.signedUrl) {
                      window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                />
              ))}
        </div>
      </div>

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
  const initials = staffName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="px-5 sm:px-6 py-4">
      <button
        type="button"
        onClick={onOpen}
        className="group flex items-center gap-3 mb-3 text-left touch-manipulation"
      >
        <Avatar className="h-9 w-9 ring-1 ring-white/[0.08] shrink-0">
          <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-[11px] font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="text-[13px] font-medium text-white truncate group-hover:underline underline-offset-2">
            {staffName}
          </div>
          <div className="text-[11px] text-white/55 capitalize truncate">
            {staffRole.replace(/_/g, ' ')} · {items.length} pending
          </div>
        </div>
      </button>
      <div className="space-y-2 pl-12">
        {items.map((it) => (
          <RecordRow
            key={it.id}
            item={it}
            staffName={staffName}
            disabled={busyId === it.id}
            onApprove={() => onApprove(it.id, it.requirement_label, staffName)}
            onReject={() => onReject(it.id, it.requirement_label, staffName)}
            onView={() => it.evidence_path && onView(it.evidence_path)}
          />
        ))}
      </div>
    </div>
  );
}

function RecordRow({
  item,
  staffName: _staffName,
  disabled,
  onApprove,
  onReject,
  onView,
}: {
  item: InboxRow;
  staffName: string;
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

  return (
    <div className="bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-xl px-3.5 py-2.5">
      <div className="flex items-start gap-2 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="text-[12.5px] font-medium text-white truncate">
            {item.requirement_label}
          </div>
          <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white/55 tabular-nums">
            <span className="capitalize">{item.requirement_category}</span>
            {item.reference_no && (
              <>
                <span className="text-white/25">·</span>
                <span className="font-mono truncate max-w-[120px]">{item.reference_no}</span>
              </>
            )}
            {expiry && (
              <>
                <span className="text-white/25">·</span>
                <span>Expires {expiry}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 flex-wrap">
        {item.evidence_path && (
          <button
            type="button"
            onClick={onView}
            className="h-7 px-2.5 rounded-full bg-[hsl(0_0%_14%)] border border-white/[0.08] text-[11px] font-medium text-white/80 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation"
          >
            View evidence
          </button>
        )}
        <div className="flex-1" />
        <button
          type="button"
          onClick={onReject}
          disabled={disabled}
          className={cn(
            'h-7 px-3 rounded-full border text-[11px] font-medium transition-colors touch-manipulation',
            'border-white/[0.1] text-white/65 hover:border-amber-500/40 hover:text-amber-200 hover:bg-amber-500/[0.04]',
            disabled && 'opacity-40 cursor-wait'
          )}
        >
          Return
        </button>
        <button
          type="button"
          onClick={onApprove}
          disabled={disabled}
          className={cn(
            'h-7 px-3.5 rounded-full text-[11px] font-semibold transition-colors touch-manipulation',
            'bg-emerald-500/[0.12] border border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/[0.18]',
            disabled && 'opacity-40 cursor-wait'
          )}
        >
          Approve →
        </button>
      </div>
    </div>
  );
}

function RowSkeleton() {
  return (
    <div className="px-5 sm:px-6 py-4 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-full bg-white/[0.06] shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-1/3 bg-white/[0.06] rounded" />
          <div className="h-2 w-1/4 bg-white/[0.04] rounded" />
        </div>
      </div>
      <div className="pl-12 space-y-2">
        <div className="h-12 bg-white/[0.04] rounded-xl" />
      </div>
    </div>
  );
}
