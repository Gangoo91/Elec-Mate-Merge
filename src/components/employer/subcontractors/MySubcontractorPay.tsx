/**
 * Worker Tools → My pay for a subcontractor (ELE-1830).
 * "Your days for October: 14. Statement SB-0003 sent." No PAYE estimate, no
 * holiday: a subbie is paid by the firm's self-bill statement, CIS deducted on
 * labour only. Figures come from get_my_subcontractor_summary (their own rows).
 */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FormSheet from '@/components/forms/FormSheet';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { GroupLabel, SolidBadge, Verdict, WorkerPanel } from '@/components/worker-tools/WorkerUi';
import { EmptyState, LoadingBlocks, StatStrip } from '@/components/employer/editorial';
import { CisBreakdown } from '@/components/employer/subcontractors/SubcontractorSheets';
import {
  cisLabel,
  fmtDay,
  fmtDays,
  gbp,
  useMySubcontractorSummary,
  type SubcontractorStatement,
} from '@/hooks/useSubcontractors';
import type { PageHelpContent } from '@/components/hub/PageHelp';

const HELP: PageHelpContent = {
  id: 'wt-pay-subcontractor',
  title: 'My pay (subcontractor)',
  what: 'Your approved days for each firm you work for and the self-bill statements they send you, with the CIS they deducted.',
  steps: [
    { title: 'Submit your days', body: 'Clock in and out, or add your days in Timesheets, like the rest of the team.' },
    { title: 'The firm approves them', body: 'Only approved days go on a statement. Waiting days show here.' },
    {
      title: 'Get your statement',
      body: 'Each tax month (6th to 5th) the firm sends a statement: labour, materials, CIS deducted and net paid. Keep it for your tax return.',
    },
  ],
  notes: [
    {
      title: 'CIS',
      body: 'CIS is taken off labour and other costs only, never materials. What was deducted counts towards your tax bill on your Self Assessment.',
    },
  ],
};

export function MySubcontractorPay() {
  const { data: firms = [], isLoading } = useMySubcontractorSummary();
  const [open, setOpen] = useState<(SubcontractorStatement & { company: string }) | null>(null);

  // Deep link: ?statement=<id> (the "statement issued" notification) opens it.
  const [params, setParams] = useSearchParams();
  const statementParam = params.get('statement');
  useEffect(() => {
    if (!statementParam || isLoading) return;
    for (const f of firms) {
      const s = f.statements.find((x) => x.id === statementParam);
      if (s) setOpen({ ...s, company: f.company_name });
    }
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('statement');
        return next;
      },
      { replace: true }
    );
  }, [statementParam, isLoading, firms, setParams]);

  const month = new Date().toLocaleDateString('en-GB', { month: 'long' });

  return (
    <WorkerToolPage
      eyebrow="Earnings"
      title="My pay"
      description="Your days and the self-bill statements firms send you."
      actions={<SolidBadge tone="neutral">Subcontractor</SolidBadge>}
      help={HELP}
    >
      {isLoading ? (
        <LoadingBlocks />
      ) : firms.length === 0 ? (
        <EmptyState
          title="Not set up yet"
          description="Your firm hasn't added you as a subcontractor yet."
        />
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {firms.map((f) => {
            const latest = f.statements[0];
            return (
              <section key={f.roster_id} className="space-y-4" data-help="wt-pay.subcontractor">
                <Verdict
                  headline={`Your days for ${month}: ${f.month_days}`}
                  detail={
                    latest
                      ? `${f.company_name}. Statement ${latest.statement_number} sent ${fmtDay(latest.issued_at)}.`
                      : `${f.company_name}. No statement yet.`
                  }
                />
                <StatStrip
                  columns={3}
                  stats={[
                    { label: 'Approved this month', value: f.month_days },
                    { label: 'Not billed yet', value: f.month_unbilled_days },
                    {
                      label: 'Waiting for approval',
                      value: f.awaiting_days,
                      tone: f.awaiting_days > 0 ? 'orange' : undefined,
                    },
                  ]}
                />
                <WorkerPanel>
                  <GroupLabel>Statements</GroupLabel>
                  {f.statements.length === 0 ? (
                    <p className="px-4 pb-4 sm:px-5 text-[13px] text-white">
                      None yet. {f.company_name} sends one each tax month for your approved days.
                    </p>
                  ) : (
                    <ul className="divide-y divide-white/[0.08]">
                      {f.statements.map((s) => (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => setOpen({ ...s, company: f.company_name })}
                            className="w-full min-h-11 px-4 py-3 sm:px-5 flex items-center justify-between gap-3 text-left touch-manipulation active:bg-white/[0.06]"
                          >
                            <span className="min-w-0">
                              <span className="block text-[14px] font-semibold text-white">
                                {s.statement_number}
                              </span>
                              <span className="block text-[12.5px] text-white">
                                {fmtDay(s.period_start)} to {fmtDay(s.period_end)} ·{' '}
                                {fmtDays(Number(s.day_count))}
                              </span>
                            </span>
                            <span className="text-right shrink-0">
                              <span className="block text-[14px] font-semibold text-white tabular-nums">
                                {gbp(s.net_payable)}
                              </span>
                              <span className="block text-[12px] text-white tabular-nums">
                                CIS {gbp(s.cis_deduction)}
                              </span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </WorkerPanel>
              </section>
            );
          })}
          <p className="text-[12.5px] text-white">
            As a subcontractor you have no holiday allowance and you are not on PAYE. Keep your
            statements: the CIS deducted counts towards your Self Assessment tax bill.
          </p>
        </div>
      )}

      <FormSheet
        open={!!open}
        onOpenChange={(o) => !o && setOpen(null)}
        eyebrow={open?.company ?? 'Statement'}
        title={open?.statement_number ?? ''}
        description={
          open ? `${fmtDay(open.period_start)} to ${fmtDay(open.period_end)}` : undefined
        }
      >
        {open && (
          <>
            <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4">
              <CisBreakdown
                rateBasis={open.rate_basis ?? 'day'}
                rate={Number(open.rate ?? 0)}
                days={Number(open.day_count)}
                hours={Number(open.hours)}
                labour={Number(open.labour_amount ?? 0)}
                other={Number(open.other_costs ?? 0)}
                materials={Number(open.materials_amount ?? 0)}
                cisStatus={open.cis_status ?? 'unverified'}
                cisRate={Number(open.cis_rate ?? 0)}
                deduction={Number(open.cis_deduction ?? 0)}
                net={Number(open.net_payable ?? 0)}
              />
            </div>
            <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4 space-y-1 text-[13px] text-white">
              <p>CIS status: {cisLabel(open.cis_status)}</p>
              <p>UTR on the statement: {open.utr || 'Not recorded. Give your firm your UTR.'}</p>
              <p>Issued {fmtDay(open.issued_at)}</p>
            </div>
            {(open.lines ?? []).filter((l) => l.kind === 'day').length > 0 && (
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4">
                <p className="text-[14px] font-semibold text-white mb-2">Days billed</p>
                <ul className="divide-y divide-white/[0.08]">
                  {(open.lines ?? [])
                    .filter((l) => l.kind === 'day')
                    .map((l) => (
                      <li key={l.date ?? ''} className="py-2 flex justify-between gap-3 text-[13px] text-white">
                        <span className="min-w-0 truncate">
                          {fmtDay(l.date)}
                          {l.jobs ? ` · ${l.jobs}` : ''}
                        </span>
                        <span className="tabular-nums">{Number(l.hours ?? 0).toFixed(1)} h</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </>
        )}
      </FormSheet>
    </WorkerToolPage>
  );
}
