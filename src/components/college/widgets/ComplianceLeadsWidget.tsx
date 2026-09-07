import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useComplianceLeads, type LeadStaff, type LeadRoleKey } from '@/hooks/useComplianceLeads';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';

/* ==========================================================================
   ComplianceLeadsWidget — "Who to ask": the college's safeguarding and
   compliance leads. Surfaces names + contact for the staff with role flags
   set on college_staff. Public-to-college (RLS-scoped via college_staff).

   Hub card language: one row per named lead (rule · name · role · Email /
   Call), and one row per role nobody holds, which taps through to the
   staff list. "Not set" on the statutory safeguarding roles is the one
   thing on this card that stays red.
   ========================================================================== */

interface RoleDef {
  key: LeadRoleKey;
  label: string;
  /** Statutory — a gap here is a real problem, not a to-do. */
  statutory: boolean;
  fallbackHelp: string;
}

const ROLES: RoleDef[] = [
  {
    key: 'is_dsl',
    label: 'Designated Safeguarding Lead',
    statutory: true,
    fallbackHelp: 'Statutory — every college needs one.',
  },
  {
    key: 'is_deputy_dsl',
    label: 'Deputy DSL',
    statutory: true,
    fallbackHelp: 'Cover when the DSL is unavailable.',
  },
  {
    key: 'is_prevent_lead',
    label: 'Prevent Lead',
    statutory: false,
    fallbackHelp: 'Owns Prevent duty implementation.',
  },
  {
    key: 'is_h_and_s_lead',
    label: 'Health & Safety Lead',
    statutory: false,
    fallbackHelp: 'First point of call for safety incidents.',
  },
  {
    key: 'is_mental_health_lead',
    label: 'Mental Health Lead',
    statutory: false,
    fallbackHelp: 'Senior mental health champion.',
  },
  {
    key: 'is_quality_nominee',
    label: 'Quality Nominee',
    statutory: false,
    fallbackHelp: 'EQA / awarding body quality lead.',
  },
];

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);
const ROW =
  'flex min-h-11 w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5';
const LINK =
  'flex h-11 shrink-0 items-center px-3 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation hover:bg-white/[0.06]';

export function ComplianceLeadsWidget() {
  const navigate = useNavigate();
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

  const drawer = (
    <StaffComplianceDrawer
      open={!!openStaffId}
      onOpenChange={(o) => {
        if (!o) setOpenStaffId(null);
      }}
      staffId={openStaffId}
    />
  );

  // Nothing assigned yet — one prompt instead of six stacked "Not set" rows.
  if (totalAssigned === 0) {
    return (
      <>
        <section className={CARD}>
          <div className="px-4 py-3.5 sm:px-5">
            <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">Who to ask</h3>
          </div>
          <div className="border-t border-white/[0.10] px-4 py-4 sm:px-5">
            <p className="max-w-prose text-[12.5px] leading-relaxed text-white">
              No safeguarding or compliance leads assigned yet. Open a staff member's compliance
              vault and set their roles (DSL, Prevent, H&amp;S and so on). A named Designated
              Safeguarding Lead is statutory for every FE college.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate('/college?section=tutors')}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-elec-yellow/35 px-4 text-[12.5px] font-bold text-elec-yellow transition-colors touch-manipulation hover:border-elec-yellow/60 hover:bg-white/[0.06] sm:w-auto"
              >
                Assign leads
              </button>
              <button
                type="button"
                onClick={() => navigate('/college?section=compliancedocs')}
                className="inline-flex h-11 w-full items-center justify-center px-4 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] sm:w-auto"
              >
                View policies
              </button>
            </div>
          </div>
        </section>
        {drawer}
      </>
    );
  }

  return (
    <>
      <section className={CARD}>
        <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
          <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">Who to ask</h3>
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {totalAssigned} {totalAssigned === 1 ? 'person' : 'people'}
            {rolesUnassigned > 0 && (
              <span className="text-elec-yellow">
                {' '}
                · {rolesUnassigned} role{rolesUnassigned === 1 ? '' : 's'} unset
              </span>
            )}
          </span>
        </div>

        <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
          {ROLES.flatMap((def) => {
            const holders = byRole.get(def.key) ?? [];
            if (holders.length === 0) {
              return [
                <li key={def.key}>
                  <button
                    type="button"
                    onClick={() => navigate('/college?section=tutors')}
                    className={ROW}
                  >
                    <span
                      aria-hidden="true"
                      className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                        {def.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                        <span className={cn('font-semibold', def.statutory && 'text-red-300')}>
                          Not set
                        </span>
                        {' · '}
                        {def.fallbackHelp}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  </button>
                </li>,
              ];
            }
            return holders.map((lead) => (
              <li key={`${def.key}:${lead.id}`} className="flex items-stretch">
                <button
                  type="button"
                  onClick={() => setOpenStaffId(lead.id)}
                  className={cn(ROW, 'min-w-0 flex-1')}
                >
                  <span
                    aria-hidden="true"
                    className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                      {lead.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                      {def.label}
                      {' · '}
                      <span className="capitalize">{lead.role.replace(/_/g, ' ')}</span>
                      {lead.department ? ` · ${lead.department}` : ''}
                    </span>
                  </span>
                  {!lead.email && !lead.phone && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  )}
                </button>
                {/* Contact is external (mailto/tel), so a plain anchor is
                    right here. Sits beside the row button rather than
                    inside it — a link inside a button is invalid HTML. */}
                {lead.email && (
                  <a href={`mailto:${lead.email}`} className={cn(LINK, 'self-center')} title={lead.email}>
                    Email
                  </a>
                )}
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className={cn(LINK, 'self-center pr-4 sm:pr-5')}
                    title={lead.phone}
                  >
                    Call
                  </a>
                )}
              </li>
            ));
          })}
        </ul>
      </section>
      {drawer}
    </>
  );
}

function Skeleton() {
  return (
    <section className={cn(CARD, 'animate-pulse')}>
      <div className="px-4 py-3.5 sm:px-5">
        <div className="h-4 w-24 rounded bg-white/[0.10]" />
      </div>
      <div className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
            <div className="h-8 w-[3px] rounded-full bg-white/[0.10]" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded bg-white/[0.10]" />
              <div className="h-2.5 w-1/2 rounded bg-white/[0.10]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
