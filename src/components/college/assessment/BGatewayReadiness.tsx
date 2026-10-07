import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CohortLearner } from '@/hooks/useCohortEpaReadiness';
import type { GatewayItemKey } from '@/lib/epa/readiness';

/* ==========================================================================
   BGatewayReadiness (ELE-1872). One learner's gateway, readable at a glance:
   every item the gateway needs, done in green, still to do in orange, and
   every orange item is a button to the place it gets fixed.

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

export function readinessItems(l: CohortLearner): ReadinessItem[] {
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
      detail: `${r.am2.ready} of ${r.am2.of} sections ready`,
      done: r.am2.ready >= r.am2.of,
      fix: { kind: 'area', hash: 'quizzes' },
    });
  }
  if (r.portfolio.known) {
    items.push({
      key: 'acs',
      label: 'Portfolio criteria',
      detail: `${r.portfolio.pct}% evidenced`,
      done: r.portfolio.pct >= 100,
      fix: { kind: 'area', hash: 'assess' },
    });
  }
  for (const g of r.gateway.items) {
    items.push({
      key: g.key,
      label: g.label,
      detail: g.detail,
      done: g.done,
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

export function BGatewayReadiness({
  learner,
  onFix,
  compact,
}: {
  learner: CohortLearner;
  onFix: (fix: GatewayFix, item: ReadinessItem) => void;
  compact?: boolean;
}) {
  const items = readinessItems(learner);
  const todo = items.filter((i) => !i.done);
  const done = items.filter((i) => i.done);
  return (
    <div className="space-y-2">
      <p className="text-[12px] font-semibold text-white">
        {todo.length === 0
          ? 'Every gateway item is done'
          : `${todo.length} of ${items.length} still to do`}
      </p>
      <ul className={cn('flex flex-wrap gap-1.5', compact && 'gap-1')}>
        {todo.map((i) => (
          <li key={i.key}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFix(i.fix, i);
              }}
              title={i.detail}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-orange-400/60 px-3 text-left text-[12px] font-semibold text-white touch-manipulation hover:border-orange-300 hover:bg-orange-500/[0.08]"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400"
                aria-hidden="true"
              />
              {i.label}
              {i.detail && (i.key === 'am2' || i.key === 'acs') && (
                <span className="font-normal">· {i.detail}</span>
              )}
              <span className="text-elec-yellow" aria-hidden="true">
                →
              </span>
            </button>
          </li>
        ))}
        {done.map((i) => (
          <li key={i.key}>
            <span
              title={i.detail}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-emerald-400/30 px-3 text-[12px] font-medium text-white"
            >
              <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
              {i.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
