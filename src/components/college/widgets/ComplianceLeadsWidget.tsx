import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useComplianceLeads, type LeadStaff, type LeadRoleKey } from '@/hooks/useComplianceLeads';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';

/* ==========================================================================
   ComplianceLeadsWidget — "Who to ask" directory of college's safeguarding
   & compliance leads. Surfaces names + contact for the staff with role flags
   set on college_staff. Public-to-college (RLS-scoped via college_staff).
   ========================================================================== */

interface RoleDef {
  key: LeadRoleKey;
  label: string;
  short: string;
  tone: 'red' | 'amber' | 'emerald' | 'blue';
  fallbackHelp: string;
}

const ROLES: RoleDef[] = [
  {
    key: 'is_dsl',
    label: 'Designated Safeguarding Lead',
    short: 'DSL',
    tone: 'red',
    fallbackHelp: 'Statutory — every college needs one.',
  },
  {
    key: 'is_deputy_dsl',
    label: 'Deputy DSL',
    short: 'Dep. DSL',
    tone: 'red',
    fallbackHelp: 'Cover when the DSL is unavailable.',
  },
  {
    key: 'is_prevent_lead',
    label: 'Prevent Lead',
    short: 'Prevent',
    tone: 'amber',
    fallbackHelp: 'Owns Prevent duty implementation.',
  },
  {
    key: 'is_h_and_s_lead',
    label: 'Health & Safety Lead',
    short: 'H&S',
    tone: 'emerald',
    fallbackHelp: 'First point of call for safety incidents.',
  },
  {
    key: 'is_mental_health_lead',
    label: 'Mental Health Lead',
    short: 'MH Lead',
    tone: 'emerald',
    fallbackHelp: 'Senior mental health champion.',
  },
  {
    key: 'is_quality_nominee',
    label: 'Quality Nominee',
    short: 'QN',
    tone: 'blue',
    fallbackHelp: 'EQA / awarding body quality lead.',
  },
];

export function ComplianceLeadsWidget() {
  const { leads, loading } = useComplianceLeads();
  const [openStaffId, setOpenStaffId] = useState<string | null>(null);

  const byRole = useMemo(() => {
    const map = new Map<LeadRoleKey, LeadStaff[]>();
    for (const def of ROLES) map.set(def.key, []);
    for (const lead of leads) {
      for (const def of ROLES) {
        if (lead[def.key]) map.get(def.key)!.push(lead);
      }
    }
    return map;
  }, [leads]);

  const totalAssigned = leads.length;
  const rolesUnassigned = ROLES.filter((def) => (byRole.get(def.key)?.length ?? 0) === 0).length;

  if (loading) return <Skeleton />;

  // Empty state: nothing assigned yet — show a single soft prompt instead of
  // 6 stacked "Not set" rows.
  if (totalAssigned === 0) {
    return (
      <>
        <div className="bg-[hsl(0_0%_12%)] border border-amber-500/20 rounded-2xl overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06]">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Need help?
            </div>
            <div className="mt-0.5 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
              Your safeguarding & compliance leads
            </div>
          </div>
          <div className="px-5 sm:px-6 py-6">
            <p className="text-[12.5px] text-white leading-relaxed max-w-prose">
              No leads assigned yet. Open a staff member from{' '}
              <span className="font-medium text-white">People → Tutors</span> and toggle the right
              roles (DSL, Prevent, H&amp;S etc.) inside their compliance vault.
            </p>
            <p className="mt-2 text-[11.5px] text-amber-300/85 leading-relaxed">
              DSL is statutory — every UK FE college needs at least one named Designated
              Safeguarding Lead.
            </p>
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

  return (
    <>
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Need help?
            </div>
            <div className="mt-0.5 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
              Your safeguarding & compliance leads
            </div>
          </div>
          <div className="text-[10.5px] tabular-nums text-white/55">
            <span className="text-white font-medium">{totalAssigned}</span>
            <span className="text-white/45"> people</span>
            {rolesUnassigned > 0 && (
              <>
                <span className="text-white/30"> · </span>
                <span className="text-amber-300/85">
                  {rolesUnassigned} role{rolesUnassigned === 1 ? '' : 's'} unset
                </span>
              </>
            )}
          </div>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {ROLES.map((def) => {
            const holders = byRole.get(def.key) ?? [];
            return (
              <RoleRow
                key={def.key}
                def={def}
                holders={holders}
                onOpenLead={(id) => setOpenStaffId(id)}
              />
            );
          })}
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

function RoleRow({
  def,
  holders,
  onOpenLead,
}: {
  def: RoleDef;
  holders: LeadStaff[];
  onOpenLead: (id: string) => void;
}) {
  return (
    <div className="px-5 sm:px-6 py-4 flex items-start gap-4 flex-wrap sm:flex-nowrap">
      <div className="shrink-0 sm:w-[180px]">
        <div
          className={cn(
            'inline-flex items-center h-6 px-2 rounded-md border text-[10.5px] font-semibold tracking-[0.06em] uppercase',
            def.tone === 'red' && 'bg-red-500/[0.08] border-red-500/30 text-red-200',
            def.tone === 'amber' && 'bg-amber-500/[0.08] border-amber-500/30 text-amber-200',
            def.tone === 'emerald' &&
              'bg-emerald-500/[0.08] border-emerald-500/30 text-emerald-200',
            def.tone === 'blue' && 'bg-blue-500/[0.08] border-blue-500/30 text-blue-200'
          )}
        >
          {def.short}
        </div>
        <div className="mt-1 text-[12px] text-white/80 leading-snug">{def.label}</div>
      </div>
      <div className="flex-1 min-w-0">
        {holders.length === 0 ? (
          <div className="text-[12px] text-white/55 leading-snug">
            <span className="text-white/65 italic">Not set.</span> {def.fallbackHelp}
          </div>
        ) : (
          <div className="space-y-2.5">
            {holders.map((h) => (
              <LeadCard key={h.id} lead={h} onOpen={() => onOpenLead(h.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LeadCard({ lead, onOpen }: { lead: LeadStaff; onOpen: () => void }) {
  const initials = lead.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      className="flex items-center gap-3 -mx-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-white/[0.03] active:bg-white/[0.05] transition-colors touch-manipulation"
    >
      <Avatar className="h-10 w-10 ring-1 ring-white/[0.08] shrink-0">
        <AvatarImage src={lead.photo_url ?? undefined} />
        <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-[11px] font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-white truncate">{lead.name}</div>
        <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white/55">
          <span className="capitalize truncate">{lead.role.replace(/_/g, ' ')}</span>
          {lead.department && (
            <>
              <span className="text-white/25">·</span>
              <span className="truncate">{lead.department}</span>
            </>
          )}
        </div>
      </div>
      <div className="shrink-0 flex items-center gap-1.5">
        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            onClick={(e) => e.stopPropagation()}
            className="h-8 px-3 rounded-full bg-[hsl(0_0%_14%)] border border-white/[0.08] text-[11.5px] font-medium text-white/80 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation"
            title={lead.email}
          >
            Email
          </a>
        )}
        {lead.phone && (
          <a
            href={`tel:${lead.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="h-8 px-3 rounded-full bg-[hsl(0_0%_14%)] border border-white/[0.08] text-[11.5px] font-medium text-white/80 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation"
            title={lead.phone}
          >
            Call
          </a>
        )}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden animate-pulse">
      <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06]">
        <div className="h-2 w-16 bg-white/[0.06] rounded" />
        <div className="mt-2 h-4 w-2/3 bg-white/[0.06] rounded" />
      </div>
      <div className="divide-y divide-white/[0.04]">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="px-5 sm:px-6 py-4 flex items-start gap-4 flex-wrap sm:flex-nowrap"
          >
            <div className="shrink-0 sm:w-[180px] space-y-2">
              <div className="h-5 w-16 bg-white/[0.06] rounded" />
              <div className="h-2 w-32 bg-white/[0.04] rounded" />
            </div>
            <div className="flex-1 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/[0.06]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/3 bg-white/[0.06] rounded" />
                <div className="h-2 w-1/2 bg-white/[0.04] rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
