/**
 * RoleAccessGuide (ELE-1831): "Why can't I see this?"
 *
 * Top: the viewer's own role in one sentence ("You're Office: you can see …
 * but not …, because …"). Below: every role and what it can and can't see.
 * Desktop shows all seven side by side in two columns; a phone shows one row
 * per role that opens in place. The words come from src/lib/roleAccess.ts,
 * which mirrors the rules the database enforces.
 */
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEmployerRole, type EmployerRole } from '@/hooks/useEmployerRole';
import { ROLE_ACCESS, ROLE_ORDER, youSentence, type RoleAccess } from '@/lib/roleAccess';
import {
  panel,
  PanelHead,
  PanelTitle,
  StatusPill,
  panelShellClass,
} from '@/components/employer/pageParts/PageParts';

function Lists({ r }: { r: RoleAccess }) {
  return (
    <div className="divide-y divide-white/[0.07]">
      <div className="px-4 py-3 sm:px-5">
        <p className="text-[13px] font-semibold text-white">Can see</p>
        <ul className="mt-1.5 space-y-1">
          {r.can.map((l) => (
            <li key={l.text} className="flex gap-2 text-[14px] leading-snug text-white">
              <span
                aria-hidden
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
              />
              {l.text}
            </li>
          ))}
        </ul>
      </div>
      {r.cannot.length > 0 && (
        <div className="px-4 py-3 sm:px-5">
          <p className="text-[13px] font-semibold text-white">Can&rsquo;t see</p>
          <ul className="mt-1.5 space-y-1">
            {r.cannot.map((l) => (
              <li key={l.text} className="flex gap-2 text-[14px] leading-snug text-white">
                <span
                  aria-hidden
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"
                />
                {l.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="px-4 py-3 text-[13px] leading-snug text-white sm:px-5">
        <span className="font-semibold">Why: </span>
        {r.because} {r.howToGet}
      </div>
    </div>
  );
}

export function RoleAccessGuide({ focusRole }: { focusRole?: EmployerRole | null }) {
  const { data, isLoading } = useEmployerRole();
  const mine = data?.role ?? null;
  const [open, setOpen] = useState<EmployerRole | null>(focusRole ?? mine);
  useEffect(() => {
    if (focusRole) setOpen(focusRole);
    else if (mine) setOpen((o) => o ?? mine);
  }, [focusRole, mine]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <section>
        <div className={panelShellClass}>
          <PanelHead
            title="Your access"
            meta={mine ? <StatusPill tone="volt">{ROLE_ACCESS[mine].label}</StatusPill> : undefined}
          />
          <p className="px-4 py-4 text-[15px] leading-relaxed text-white sm:px-5">
            {isLoading
              ? 'Checking your role.'
              : mine
                ? youSentence(mine)
                : "You're not part of a firm on Elec-Mate, so there is nothing hidden from you."}
          </p>
        </div>
      </section>

      <section>
        <PanelTitle title="What each role can see" meta="Enforced by the app" />

        {/* Phone: one row per role, opens in place */}
        <div className="space-y-3 lg:hidden">
          {ROLE_ORDER.map((role) => {
            const r = ROLE_ACCESS[role];
            const isOpen = open === role;
            return (
              <div key={role} className={cn(panel, 'overflow-hidden')}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : role)}
                  className="flex min-h-[60px] w-full items-center gap-3 px-4 py-2.5 text-left touch-manipulation sm:px-5"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold text-white">{r.label}</span>
                    <span className="block text-[13px] leading-snug text-white">{r.who}</span>
                  </span>
                  {role === mine && <StatusPill tone="volt">You</StatusPill>}
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      'h-4 w-4 shrink-0 text-white transition-transform',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-white/[0.07]">
                    <Lists r={r} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: every role, two columns */}
        <div className="hidden gap-4 lg:grid lg:grid-cols-2 lg:items-start">
          {ROLE_ORDER.map((role) => {
            const r = ROLE_ACCESS[role];
            return (
              <div
                key={role}
                id={`access-${role}`}
                className={cn(panelShellClass, focusRole === role && 'ring-1 ring-elec-yellow')}
              >
                <PanelHead
                  title={r.label}
                  meta={
                    <>
                      <span className="truncate text-[13px] text-white">{r.who}</span>
                      {role === mine && <StatusPill tone="volt">You</StatusPill>}
                    </>
                  }
                />
                <Lists r={r} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default RoleAccessGuide;
