import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowDownLeft, ArrowUpRight, RefreshCw } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  EmptyState,
  LoadingBlocks,
  FilterBar,
  Divider,
  IconButton,
  SecondaryButton,
} from '@/components/employer/editorial';
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

  return (
    <PageFrame>
      <PageHero
        eyebrow="Money"
        title="Accounts"
        description="Profit and loss and a ledger of money in and out. The same figures as Reports and Job financials."
        tone="emerald"
        actions={
          <>
          <IconButton onClick={refresh} aria-label="Refresh accounts">
            <RefreshCw
              className={pnlQuery.isFetching || ledgerQuery.isFetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'}
            />
          </IconButton>
          <PageHelpButton help={ACCOUNTS_HELP} askContext={{ page: 'accounts', tab }} />
          </>
        }
      />

      <HowItWorks help={ACCOUNTS_HELP} askContext={{ page: 'accounts', tab }} />

      <div data-help="accounts.periods">
      <FilterBar
        tabs={FINANCE_PERIODS}
        activeTab={periodKey}
        onTabChange={(v) => setPeriodKey(v as FinancePeriodKey)}
      />
      </div>

      <div className="mt-4" data-help="accounts.views">
        <FilterBar
          tabs={[
            { value: 'summary', label: 'Profit & loss' },
            { value: 'ledger', label: 'Ledger', count: ledger.length },
          ]}
          activeTab={tab}
          onTabChange={(v) => setTab(v as 'summary' | 'ledger')}
        />
      </div>

      {!hidden && (
        <div className="mt-4 grid grid-cols-3 gap-2" data-help="accounts.export">
          <SecondaryButton
            onClick={() => runExport('pnl-csv')}
            disabled={!canExport}
            className="h-11 px-2 text-[12.5px]"
          >
            P&amp;L CSV
          </SecondaryButton>
          <SecondaryButton
            onClick={() => runExport('ledger-csv')}
            disabled={!canExport || ledger.length === 0}
            className="h-11 px-2 text-[12.5px]"
          >
            Ledger CSV
          </SecondaryButton>
          <SecondaryButton
            onClick={() => runExport('pdf')}
            disabled={!canExport}
            className="h-11 px-2 text-[12.5px]"
          >
            {exporting ? 'Preparing…' : 'PDF'}
          </SecondaryButton>
        </div>
      )}

      {hidden ? (
        <EmptyState
          className="mt-5"
          title="Accounts are for the owner and admins"
          description="Your role can see invoices and what's outstanding (Quotes & Invoices), but not costs, labour or profit. Ask the owner to make you an admin if you need the books."
        />
      ) : loadError ? (
        <EmptyState
          className="mt-5"
          title="Couldn't load your accounts"
          description={`The figures didn't load, so nothing is shown rather than £0.00. ${
            loadError instanceof Error ? loadError.message : ''
          }`}
          action="Try again"
          onAction={refresh}
        />
      ) : tab === 'summary' ? (
        pnlQuery.isLoading || !pnl ? (
          <LoadingBlocks className="mt-5" />
        ) : (
          <div className="mt-5 space-y-5">
            <StatStrip
              columns={4}
              stats={[
                { label: FINANCE_LABELS.invoiced, value: formatGBPCompact(pnl.invoiced), tone: 'blue' },
                { label: FINANCE_LABELS.costs, value: formatGBPCompact(pnl.totalCosts), tone: 'orange' },
                {
                  label: `${FINANCE_LABELS.grossProfit} · invoiced less costs`,
                  value: formatGBPCompact(pnl.grossProfit),
                  tone: pnl.grossProfit >= 0 ? 'emerald' : 'red',
                  accent: true,
                },
                { label: FINANCE_LABELS.margin, value: formatMargin(pnl.marginPct), tone: 'emerald' },
              ]}
            />

            <ListCard>
              <ListCardHeader title="Profit & loss" meta={period.label} />
              <ListBody>
                <ListRow
                  title="Invoiced"
                  subtitle={`${pnl.invoiceCount} invoice${pnl.invoiceCount === 1 ? '' : 's'} sent, overdue or paid · drafts excluded`}
                  trailing={formatGBP(pnl.invoiced)}
                />
                <Divider label="Costs" />
                <ListRow title="Materials" subtitle="Purchase orders, at order date" trailing={formatGBP(pnl.materials)} />
                {pnl.supplierInvoices !== 0 && (
                  <ListRow
                    title="Supplier invoices"
                    subtitle="Bills not matched to a purchase order"
                    trailing={formatGBP(pnl.supplierInvoices)}
                  />
                )}
                <ListRow title="Expenses" subtitle="Approved and paid claims" trailing={formatGBP(pnl.expenses)} />
                <ListRow
                  title="Labour"
                  subtitle="Gross pay from approved timesheets, overtime included"
                  trailing={formatGBP(pnl.labour)}
                />
                {pnl.otherCosts !== 0 && (
                  <ListRow
                    title="Other job costs"
                    subtitle="Equipment, overheads and other costs logged on jobs"
                    trailing={formatGBP(pnl.otherCosts)}
                  />
                )}
                <ListRow title="Total costs" trailing={formatGBP(pnl.totalCosts)} />
                <Divider />
                <ListRow
                  title="Gross profit"
                  subtitle={pnl.marginPct === null ? 'Invoiced less costs · no margin until something is invoiced' : `Invoiced less costs · ${formatMargin(pnl.marginPct)} margin`}
                  trailing={
                    <Pill tone={pnl.grossProfit >= 0 ? 'emerald' : 'red'}>{formatGBP(pnl.grossProfit)}</Pill>
                  }
                />
              </ListBody>
            </ListCard>

            <ListCard>
              <ListCardHeader title="Cash" meta="Money received and owed" />
              <ListBody>
                <ListRow
                  title={FINANCE_LABELS.paidIn}
                  subtitle={`${pnl.paidCount} invoice${pnl.paidCount === 1 ? '' : 's'} paid in ${period.label.toLowerCase()}`}
                  trailing={formatGBP(pnl.paidIn)}
                />
                <ListRow
                  title={`${FINANCE_LABELS.outstanding} today`}
                  subtitle={`${pnl.outstandingCount} sent or overdue invoice${pnl.outstandingCount === 1 ? '' : 's'} not yet paid`}
                  trailing={formatGBP(pnl.outstanding)}
                />
                <ListRow
                  title="Of which overdue"
                  subtitle={`${pnl.overdueCount} past their due date`}
                  trailing={
                    <span className={pnl.overdue > 0 ? 'text-red-400' : 'text-white'}>
                      {formatGBP(pnl.overdue)}
                    </span>
                  }
                />
                {pnl.draftCount > 0 && (
                  <ListRow
                    title="Draft invoices"
                    subtitle="Not sent, so not counted anywhere above"
                    trailing={formatGBP(pnl.draftValue)}
                  />
                )}
              </ListBody>
            </ListCard>

            <p className="text-xs text-white px-1 leading-relaxed">
              Gross profit is invoiced less costs. The same figure Reports and Job financials show
              for this period. Cash in counts invoices on the day they were paid. Labour is gross pay
              before PAYE, National Insurance and pension; Elec-Mate is not a payroll or accounting
              package. Use the exports to feed Xero, Sage or QuickBooks.
            </p>
          </div>
        )
      ) : ledgerQuery.isLoading || !ledgerQuery.data ? (
        <LoadingBlocks className="mt-5" />
      ) : ledger.length === 0 ? (
        <EmptyState
          className="mt-5"
          title="Nothing in this period"
          description="Paid invoices, purchase orders, expense claims, approved timesheets and job costs appear here as they happen."
        />
      ) : (
        <div className="mt-5 space-y-5">
          <StatStrip
            columns={3}
            stats={[
              { label: 'Money in · paid invoices', value: formatGBPCompact(totals.moneyIn), tone: 'emerald' },
              { label: 'Money out · costs', value: formatGBPCompact(totals.moneyOut), tone: 'orange' },
              {
                label: 'Net cash',
                value: formatGBPCompact(totals.net),
                tone: totals.net >= 0 ? 'green' : 'red',
              },
            ]}
          />

          <ListCard>
            <ListCardHeader title="Ledger" meta={`${ledger.length} entries · ${period.label}`} />
            <ListBody>
              {ledger.map((e) => (
                <ListRow
                  key={`${e.direction}-${e.category}-${e.source_id}`}
                  lead={
                    e.direction === 'in' ? (
                      <ArrowDownLeft className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-orange-400" />
                    )
                  }
                  title={[e.reference || e.category, e.counterparty].filter(Boolean).join(' — ')}
                  subtitle={`${e.category} · ${new Date(`${e.entry_date}T12:00:00`).toLocaleDateString('en-GB')}`}
                  trailing={
                    <span className={e.direction === 'in' ? 'text-emerald-400' : 'text-orange-400'}>
                      {e.direction === 'in' ? '+' : '−'}
                      {formatGBP(e.amount)}
                    </span>
                  }
                />
              ))}
            </ListBody>
          </ListCard>
          <p className="text-xs text-white px-1 leading-relaxed">
            Money out is every cost in the P&amp;L for this period, so it always matches total costs.
            Labour shows one line per person.
          </p>
        </div>
      )}
    </PageFrame>
  );
};

export default AccountsSection;
