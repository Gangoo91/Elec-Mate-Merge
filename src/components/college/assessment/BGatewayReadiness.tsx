import { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CohortLearner } from '@/hooks/useCohortEpaReadiness';
import type { GatewayItemKey } from '@/lib/epa/readiness';
import { weakestSectionLabel } from '@/components/epa/Am2TaskReadiness';

/* ==========================================================================
   BGatewayReadiness (ELE-1872). One learner's gateway, readable at a glance:
   every item the gateway needs, done in green, still to do in orange, and
   every orange item is a row that opens the place it gets fixed.

   Where each item is fixed:
     AM2 practice          Student 360 → Quizzes and EPA readiness (#quizzes)
     Portfolio criteria    Student 360 → Criteria and assessment (#assess)
     Qualification / NVQ   Student 360 → Portfolio and evidence (#portfolio)
     Off-the-job hours     Student 360 → Off-the-job hours (#otj)
     English, maths,
     employer, provider    the gateway meeting sheet (the checklist lives
                           there), or the EPA area when there is no EPA record
     Tutor verdict         Student 360 → Quizzes and EPA readiness (#epa)
     No account linked     Student 360 overview (invite them from there)

   ELE-1872: the gateway items are the real gate (get_gateway_readiness), so
   each carries a link key. Where each is fixed:
     coverage              Student 360 → Criteria and assessment (#assess)
     hours                 Student 360 → Off-the-job hours (#otj)
     start_date            the learner's evidence pack, Learner details sheet
     english_maths         the gateway meeting sheet (its checklist records
                           Level 2 achieved, or the employer's decision)
     declaration_*         Student 360 → the gateway pack sheet
     net_checklist         the learner's evidence pack, filing NET's checklist
   ========================================================================== */

export type GatewayFix =
  { kind: 'area'; hash: string } | { kind: 'gateway' } | { kind: 'path'; to: string };

export interface ReadinessItem {
  key: string;
  label: string;
  detail?: string;
  done: boolean;
  fix: GatewayFix;
  /** NET: a gateway signature over 6 months old, or within 30 days of it. */
  signatureAge?: 'expired' | 'expiring' | null;
}

const GATEWAY_FIX: Record<GatewayItemKey, GatewayFix> = {
  qualification: { kind: 'area', hash: 'portfolio' },
  otj: { kind: 'area', hash: 'otj' },
  english: { kind: 'gateway' },
  maths: { kind: 'gateway' },
  employer: { kind: 'gateway' },
  provider: { kind: 'gateway' },
};

/** A gate line's link key → the place to fix it, for one learner. */
function fixForLink(link: string, studentId: string): GatewayFix {
  const pack = `/college/evidence-pack/${encodeURIComponent(studentId)}`;
  if (link === 'coverage') return { kind: 'area', hash: 'assess' };
  if (link === 'hours') return { kind: 'area', hash: 'otj' };
  if (link === 'start_date') return { kind: 'path', to: `${pack}?open=facts` };
  if (link === 'net_checklist') return { kind: 'path', to: `${pack}?open=net_readiness_checklist` };
  if (link.startsWith('declaration_')) return { kind: 'area', hash: 'export-gateway' };
  return { kind: 'gateway' };
}

/** Criteria passed out of the qualification total, from get_portfolio_ac_state. */
export interface CriteriaPassed {
  passed: number;
  total: number;
}

/**
 * 8 Oct 2026: the portfolio item reads criteria PASSED from
 * get_portfolio_ac_state (via college_portfolio_overview) when the caller
 * passes it, otherwise the readiness model's passed count, which comes from
 * the same function. Never a percentage evidenced.
 */
export function readinessItems(
  l: CohortLearner,
  criteria?: CriteriaPassed | null
): ReadinessItem[] {
  const r = l.readiness;
  if (!r) {
    return [
      {
        key: 'account',
        label: 'Learner account linked',
        detail: 'Readiness reads their app record. Invite them from their page.',
        done: false,
        fix: { kind: 'area', hash: '' },
      },
    ];
  }
  const items: ReadinessItem[] = [];
  if (r.am2.of > 0) {
    items.push({
      key: 'am2',
      label: `${r.route.assessment || 'AM2'} practice`,
      // ELE-1907: name the weakest section, so the gateway talk starts there.
      detail: `${r.am2.ready} of ${r.am2.of} sections ready${
        weakestSectionLabel(r.am2.sections)
          ? `; weakest ${weakestSectionLabel(r.am2.sections)}`
          : ''
      }`,
      done: r.am2.ready >= r.am2.of,
      fix: { kind: 'area', hash: 'quizzes' },
    });
  }
  if (criteria && criteria.total > 0) {
    items.push({
      key: 'acs',
      label: 'Portfolio criteria',
      detail: `${criteria.passed} of ${criteria.total} passed`,
      done: criteria.passed >= criteria.total,
      fix: { kind: 'area', hash: 'assess' },
    });
  } else if (r.portfolio.known) {
    items.push({
      key: 'acs',
      label: 'Portfolio criteria',
      detail: `${r.portfolio.signedOff} of ${r.portfolio.totalACs} passed`,
      done: r.portfolio.signedOff >= r.portfolio.totalACs,
      fix: { kind: 'area', hash: 'assess' },
    });
  }
  for (const g of r.gateway.items) {
    items.push({
      key: g.key,
      label: g.label,
      detail: g.detail,
      done: g.done,
      signatureAge: g.signatureAge ?? null,
      fix: g.link
        ? fixForLink(g.link, l.id)
        : (GATEWAY_FIX[g.key as GatewayItemKey] ?? { kind: 'gateway' }),
    });
  }
  if (l.needs_sign_off) {
    items.push({
      key: 'verdict',
      label: 'Tutor verdict signed off',
      detail: 'The assisted prediction is newer than your verdict.',
      done: false,
      fix: { kind: 'area', hash: 'epa' },
    });
  }
  return items;
}

/** Open items shown before "and N more", so a long gate does not fill the page. */
const FIRST = 3;

/**
 * 10 Oct 2026 (phone standard): the gate as a short list, not a cloud of
 * orange pills. Each open item is a 44px row (orange dot, what is missing,
 * how far along, a chevron to where it is fixed); finished items collapse to
 * one green line.
 */
export function BGatewayReadiness({
  learner,
  onFix,
  compact,
  criteria,
}: {
  learner: CohortLearner;
  onFix: (fix: GatewayFix, item: ReadinessItem) => void;
  compact?: boolean;
  criteria?: CriteriaPassed | null;
}) {
  const [all, setAll] = useState(false);
  const items = readinessItems(learner, criteria);
  // A signature about to pass NET's 6 months is still done, but flagged here too.
  const todo = items.filter((i) => !i.done || i.signatureAge === 'expiring');
  const done = items.filter((i) => i.done && i.signatureAge !== 'expiring');
  const shownTodo = all ? todo : todo.slice(0, FIRST);
  const hidden = todo.length - shownTodo.length;
  return (
    <div className="space-y-1.5">
      {/* Showcase pass (10 Oct): done out of total as a figure and one small
          block per item, then the open items as plain rows, not a box. */}
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[13px] font-semibold text-white">
          {todo.length === 0
            ? 'Every gateway item is done'
            : `${done.length} of ${items.length} gateway items done`}
        </p>
        {todo.length > 0 && (
          <p className="text-[12.5px] tabular-nums text-white">{todo.length} to do</p>
        )}
      </div>
      <div className="flex gap-1 pb-1" aria-hidden="true">
        {[...done, ...todo].map((i) => (
          <span
            key={i.key}
            className={cn(
              'h-1.5 flex-1 rounded-full',
              i.done && i.signatureAge !== 'expiring' ? 'bg-emerald-400' : 'bg-white/[0.12]'
            )}
          />
        ))}
      </div>
      {todo.length > 0 && (
        <ul className="-mx-1 divide-y divide-white/[0.06]">
          {shownTodo.map((i) => (
            <li key={i.key}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFix(i.fix, i);
                }}
                title={i.detail}
                className={cn(
                  'flex min-h-11 w-full items-center gap-2.5 rounded-lg px-1 text-left touch-manipulation transition-colors hover:bg-white/[0.04] active:bg-white/[0.07]',
                  compact ? 'py-1.5' : 'py-2'
                )}
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-orange-400" aria-hidden="true" />
                <span className="min-w-0 flex-1 text-[13px] leading-snug text-white">
                  <span className="font-semibold">{i.label}</span>
                  {i.detail && (i.key === 'am2' || i.key === 'acs') && (
                    <span className="block sm:inline">
                      <span className="hidden sm:inline"> · </span>
                      {i.detail}
                    </span>
                  )}
                  {i.signatureAge && (
                    <span className="block font-medium text-orange-300">
                      {i.signatureAge === 'expired'
                        ? 'Signed over 6 months ago. NET needs it signed again.'
                        : 'Signature turns 6 months old within 30 days. NET needs it signed again after that.'}
                    </span>
                  )}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
              </button>
            </li>
          ))}
          {hidden > 0 && (
            <li>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAll(true);
                }}
                className="flex min-h-11 w-full items-center px-1 pl-[18px] text-left text-[13px] font-semibold text-elec-yellow touch-manipulation active:bg-white/[0.07]"
              >
                and {hidden} more
              </button>
            </li>
          )}
        </ul>
      )}
      {(all || hidden === 0) && done.length > 0 && (
        <p className="flex items-start gap-1.5 pt-1 text-[13px] leading-snug text-white">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
          <span>
            <span className="font-semibold">Done:</span> {done.map((i) => i.label).join(', ')}
          </span>
        </p>
      )}
    </div>
  );
}
