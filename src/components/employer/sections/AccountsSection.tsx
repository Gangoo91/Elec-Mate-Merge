import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  PageColumn,
  TwoColumn,
  FigureStrip,
  FilterRow,
  Segments,
  HeroActions,
  HeroPrimary,
  RefreshIcon,
  Rows,
  Row,
  PlainEmpty,
  panel,
  PanelTitle,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { getLedger } from '@/services/employerAccountsService';
import { useFinanceSummary } from '@/hooks/useFinanceModel';
import {
  FINANCE_LABELS,
  FINANCE_PERIODS,
  financePeriod,
  formatGBP,
  formatGBPCompact,
  formatMargin,
  type FinancePeriodKey,
} from '@/lib/financeDefinitions';
import { exportAccountsPdf, exportLedgerCsv, exportPnlCsv } from '@/utils/accountsExport';
import { useToast } from '@/hooks/use-toast';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { ACCOUNTS_HELP } from '@/components/employer/help/finance';

/**
 * Accounts — P&L and ledger for a period, from the shared finance model.
 * Reports reads the same get_finance_summary call, so the two pages always
 * agree for the same period.
 */
export const AccountsSection = () => {
  const { toast } = useToast();
  const [periodKey, setPeriodKey] = useState<FinancePeriodKey>('this_month');
  const [tab, setTab] = useState<'summary' | 'ledger'>('summary');
  const period = useMemo(() => financePeriod(periodKey), [periodKey]);
  const [exporting, setExporting] = useState(false);

  // The P&L and ledger are owner/admin only (ELE-1831); the server refuses
  // them for office managers, so don't ask.
  const { data: roleInfo } = useEmployerRole();
  const moneyAllowed = roleInfo ? roleInfo.canSeeMoney : true;
  const pnlQuery = useFinanceSummary(period.from, period.to);
  const ledgerQuery = useQuery({
    queryKey: ['finance-model', 'ledger', period.from, period.to],
    queryFn: () => getLedger(period.from, period.to),
    // Wait for the role: the ledger is refused (403) for office managers.
    enabled: roleInfo?.canSeeMoney === true,
  });
  const pnl = pnlQuery.data;
  const ledger = useMemo(() => ledgerQuery.data ?? [], [ledgerQuery.data]);

  const totals = useMemo(() => {
    const moneyIn = ledger.filter((e) => e.direction === 'in').reduce((s, e) => s + e.amount, 0);
    const moneyOut = ledger.filter((e) => e.direction === 'out').reduce((s, e) => s + e.amount, 0);
    return { moneyIn, moneyOut, net: moneyIn - moneyOut };
  }, [ledger]);

  const loadError = pnlQuery.error || ledgerQuery.error;
  const hidden = !moneyAllowed || (pnl ? !pnl.moneyVisible : false);
  const refresh = () => {
    pnlQuery.refetch();
    ledgerQuery.refetch();
  };

  const runExport = async (kind: 'pnl-csv' | 'ledger-csv' | 'pdf') => {
    if (!pnl) return;
    try {
      setExporting(true);
      if (kind === 'pnl-csv') exportPnlCsv(pnl, period);
      else if (kind === 'ledger-csv') exportLedgerCsv(ledger, period);
      else await exportAccountsPdf(pnl, ledger, period);
      toast({ title: 'Export ready', description: `${period.label} has downloaded.` });
    } catch (e) {
      toast({
        title: 'Export failed',
        description: e instanceof Error ? e.message : 'Try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setExporting(false);
    }
  };

  const canExport = !!pnl && !loadError && !exporting && !hidden;

  const fetching = pnlQuery.isFetching || ledgerQuery.isFetching;

  // Live status line: where this period stands, in one sentence.
  const statusLine =
    hidden || !pnl || loadError
      ? 'Profit and loss and a ledger of money in and out, the same figures as Reports and Job financials.'
      : `${period.label}: ${formatGBPCompact(pnl.invoiced)} invoiced, ${formatGBPCompact(pnl.totalCosts)} costs, ${
          pnl.grossProfit < 0
            ? `${formatGBPCompact(Math.abs(pnl.grossProfit))} loss`
            : `${formatGBPCompact(pnl.grossProfit)} gross profit`
        }.`;

  const exportPanel = !hidden && (
    <section data-help="accounts.export">
      <PanelTitle title="Export" meta={period.label} />
      <div className={cn(panel, 'overflow-hidden')}>
        <Rows>
          <ExportRow
            title="Accounts PDF"
            detail="P&L, cash and ledger for your accountant"
            label={exporting ? 'Preparing…' : 'PDF'}
            disabled={!canExport}
            onClick={() => runExport('pdf')}
          />
          <ExportRow
            title="Profit and loss"
            detail="For Xero, Sage or QuickBooks"
            label="CSV"
            disabled={!canExport}
            onClick={() => runExport('pnl-csv')}
          />
          <ExportRow
            title="Ledger"
            detail={`${ledger.length} entr${ledger.length === 1 ? 'y' : 'ies'}`}
            label="CSV"
            disabled={!canExport || ledger.length === 0}
            onClick={() => runExport('ledger-csv')}
          />
        </Rows>
      </div>
    </section>
  );

  return (
    <PageColumn>
      <PageHero
        title="Accounts"
        description={statusLine}
        actions={
          <HeroActions>
            {!hidden && (
              <HeroPrimary onClick={() => runExport('pdf')} disabled={!canExport}>
                {exporting ? 'Preparing…' : 'Download PDF'}
              </HeroPrimary>
            )}
            <RefreshIcon onClick={refresh} spinning={fetching} />
            <PageHelpButton help={ACCOUNTS_HELP} askContext={{ page: 'accounts', tab }} />
          </HeroActions>
        }
      />

      <HowItWorks help={ACCOUNTS_HELP} askContext={{ page: 'accounts', tab }} />

      <FilterRow>
        <div data-help="accounts.periods" className="min-w-0">
          <Segments
            items={FINANCE_PERIODS as { value: FinancePeriodKey; label: string }[]}
            value={periodKey}
            onChange={setPeriodKey}
          />
        </div>
        <div data-help="accounts.views" className="min-w-0">
          <Segments
            items={[
              { value: 'summary' as const, label: 'Profit & loss' },
              { value: 'ledger' as const, label: 'Ledger', count: ledger.length },
            ]}
            value={tab}
            onChange={setTab}
          />
        </div>
      </FilterRow>

      {hidden ? (
        <div className={panel}>
          <PlainEmpty
            bare
            text="Accounts are for the owner and admins. Your role can see invoices and what is owed in Quotes & invoices, but not costs, labour or profit. Ask the owner to make you an admin if you need the books."
          />
        </div>
      ) : loadError ? (
        <div className={panel}>
          <PlainEmpty
            bare
            text={`Your accounts didn't load, so nothing is shown rather than £0.00. ${
              loadError instanceof Error ? loadError.message : ''
            }`}
            action="Try again"
            onAction={refresh}
          />
        </div>
      ) : tab === 'summary' ? (
        pnlQuery.isLoading || !pnl ? (
          <LoadingBlocks />
        ) : (
          <>
            <FigureStrip
              figures={[
                {
                  label: FINANCE_LABELS.invoiced,
                  value: formatGBPCompact(pnl.invoiced),
                  sub: `${pnl.invoiceCount} invoice${pnl.invoiceCount === 1 ? '' : 's'}`,
                },
                {
                  label: FINANCE_LABELS.costs,
                  value: formatGBPCompact(pnl.totalCosts),
                  sub: 'Materials, expenses, labour',
                },
                {
                  label: FINANCE_LABELS.grossProfit,
                  value: formatGBPCompact(pnl.grossProfit),
                  sub: 'Invoiced less costs',
                  tone: pnl.grossProfit < 0 ? 'red' : undefined,
                },
                {
                  label: FINANCE_LABELS.margin,
                  value: formatMargin(pnl.marginPct),
                  sub: pnl.marginPct === null ? 'Nothing invoiced yet' : 'Of invoiced',
                },
              ]}
            />

            <TwoColumn
              main={
                <section>
                  <PanelTitle title="Profit and loss" meta={period.label} />
                  <div className={cn(panel, 'overflow-hidden')}>
                    <Rows>
                      <Line
                        title="Invoiced"
                        detail={`${pnl.invoiceCount} invoice${pnl.invoiceCount === 1 ? '' : 's'} sent, overdue or paid. Drafts excluded.`}
                        amount={formatGBP(pnl.invoiced)}
                      />
                      <SubHead>Costs</SubHead>
                      <Line
                        title="Materials"
                        detail="Purchase orders, at order date"
                        amount={formatGBP(pnl.materials)}
                      />
                      {pnl.supplierInvoices !== 0 && (
                        <Line
                          title="Supplier invoices"
                          detail="Bills not matched to a purchase order"
                          amount={formatGBP(pnl.supplierInvoices)}
                        />
                      )}
                      <Line
                        title="Expenses"
                        detail="Approved and paid claims"
                        amount={formatGBP(pnl.expenses)}
                      />
                      <Line
                        title="Labour"
                        detail="Gross pay from approved timesheets, overtime included"
                        amount={formatGBP(pnl.labour)}
                      />
                      {pnl.otherCosts !== 0 && (
                        <Line
                          title="Other job costs"
                          detail="Equipment, overheads and other costs logged on jobs"
                          amount={formatGBP(pnl.otherCosts)}
                        />
                      )}
                      <Line title="Total costs" amount={formatGBP(pnl.totalCosts)} strong />
                      <Line
                        title="Gross profit"
                        detail={
                          pnl.marginPct === null
                            ? 'Invoiced less costs. No margin until something is invoiced.'
                            : `Invoiced less costs, ${formatMargin(pnl.marginPct)} margin`
                        }
                        amount={formatGBP(pnl.grossProfit)}
                        strong
                        red={pnl.grossProfit < 0}
                      />
                    </Rows>
                  </div>
                </section>
              }
              side={
                <>
                  <section>
                    <PanelTitle title="Cash" meta="Received and owed" />
                    <div className={cn(panel, 'overflow-hidden')}>
                      <Rows>
                        <Line
                          title={FINANCE_LABELS.paidIn}
                          detail={`${pnl.paidCount} invoice${pnl.paidCount === 1 ? '' : 's'} paid in ${period.label.toLowerCase()}`}
                          amount={formatGBP(pnl.paidIn)}
                        />
                        <Line
                          title={`${FINANCE_LABELS.outstanding} today`}
                          detail={`${pnl.outstandingCount} sent or overdue, not yet paid`}
                          amount={formatGBP(pnl.outstanding)}
                        />
                        <Line
                          title="Of which overdue"
                          detail={`${pnl.overdueCount} past their due date`}
                          amount={formatGBP(pnl.overdue)}
                          red={pnl.overdue > 0}
                        />
                        {pnl.draftCount > 0 && (
                          <Line
                            title="Draft invoices"
                            detail="Not sent, so not counted above"
                            amount={formatGBP(pnl.draftValue)}
                          />
                        )}
                      </Rows>
                    </div>
                  </section>
                  {exportPanel}
                  <p className="text-[13px] leading-relaxed text-white">
                    Gross profit is invoiced less costs, the same figure Reports and Job financials
                    show for this period. Cash in counts invoices on the day they were paid. Labour
                    is gross pay before PAYE, National Insurance and pension. Elec-Mate is not a
                    payroll or accounting package, so use the exports to feed Xero, Sage or
                    QuickBooks.
                  </p>
                </>
              }
            />
          </>
        )
      ) : ledgerQuery.isLoading || !ledgerQuery.data ? (
        <LoadingBlocks />
      ) : (
        <>
          {ledger.length > 0 && (
            <FigureStrip
              figures={[
                {
                  label: 'Money in',
                  value: formatGBPCompact(totals.moneyIn),
                  sub: 'Paid invoices',
                },
                { label: 'Money out', value: formatGBPCompact(totals.moneyOut), sub: 'Costs' },
                {
                  label: 'Net cash',
                  value: formatGBPCompact(totals.net),
                  sub: period.label,
                  tone: totals.net < 0 ? 'red' : undefined,
                },
              ]}
            />
          )}
          <TwoColumn
            main={
              <section>
                <PanelTitle
                  title="Ledger"
                  meta={`${ledger.length} entr${ledger.length === 1 ? 'y' : 'ies'} · ${period.label}`}
                />
                <div className={cn(panel, 'overflow-hidden')}>
                  {ledger.length === 0 ? (
                    <PlainEmpty
                      bare
                      text="Nothing in this period. Paid invoices, purchase orders, expense claims, approved timesheets and job costs show here as they happen."
                    />
                  ) : (
                    <Rows>
                      {ledger.map((e) => (
                        <Row
                          key={`${e.direction}-${e.category}-${e.source_id}`}
                          title={[e.reference || e.category, e.counterparty]
                            .filter(Boolean)
                            .join(' · ')}
                          detail={`${e.direction === 'in' ? 'In' : 'Out'} · ${e.category} · ${new Date(`${e.entry_date}T12:00:00`).toLocaleDateString('en-GB')}`}
                          amount={
                            <span
                              className={e.direction === 'in' ? 'text-emerald-400' : 'text-white'}
                            >
                              {e.direction === 'in' ? '+' : '−'}
                              {formatGBP(e.amount)}
                            </span>
                          }
                        />
                      ))}
                    </Rows>
                  )}
                </div>
              </section>
            }
            side={
              <>
                {exportPanel}
                <p className="text-[13px] leading-relaxed text-white">
                  Money out is every cost in the P&amp;L for this period, so it always matches total
                  costs. Labour shows one line per person.
                </p>
              </>
            }
          />
        </>
      )}
    </PageColumn>
  );
};

/** One line of a statement: label and note on the left, amount on the right. */
function Line({
  title,
  detail,
  amount,
  strong,
  red,
}: {
  title: string;
  detail?: string;
  amount: string;
  strong?: boolean;
  red?: boolean;
}) {
  return (
    <div className="flex min-h-[56px] items-center gap-3 px-4 py-3 sm:px-5">
      <div className="min-w-0 flex-1">
        <div className={cn('text-[15px] text-white', strong ? 'font-semibold' : 'font-medium')}>
          {title}
        </div>
        {detail && <div className="mt-0.5 text-[13px] text-white">{detail}</div>}
      </div>
      <span
        className={cn(
          'shrink-0 tabular-nums text-[15px]',
          strong ? 'font-semibold' : 'font-medium',
          red ? 'text-red-400' : 'text-white'
        )}
      >
        {amount}
      </span>
    </div>
  );
}

function SubHead({ children }: { children: string }) {
  return (
    <div className="bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-white sm:px-5">
      {children}
    </div>
  );
}

function ExportRow({
  title,
  detail,
  label,
  disabled,
  onClick,
}: {
  title: string;
  detail: string;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex min-h-[64px] items-center gap-3 px-4 py-2.5 sm:px-5">
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-semibold text-white">{title}</div>
        <div className="mt-0.5 truncate text-[13px] text-white">{detail}</div>
      </div>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="inline-flex h-11 min-w-[72px] shrink-0 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.08] disabled:opacity-40"
      >
        {label}
      </button>
    </div>
  );
}

export default AccountsSection;
