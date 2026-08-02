import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import {
  PageFrame,
  SectionHeader,
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
} from '@/components/employer/editorial';
import { getLedger, getProfitAndLoss } from '@/services/employerAccountsService';

type PeriodKey = 'this_month' | 'last_month' | 'this_quarter' | 'this_year';

/** Period bounds as yyyy-MM-dd. Local dates — a UK contractor's books run to
 *  their calendar, not UTC, so avoid toISOString() which shifts the boundary. */
function periodRange(key: PeriodKey): { from: string; to: string; label: string } {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`;

  switch (key) {
    case 'last_month':
      return { from: fmt(new Date(y, m - 1, 1)), to: fmt(new Date(y, m, 0)), label: 'Last month' };
    case 'this_quarter': {
      const qStart = Math.floor(m / 3) * 3;
      return {
        from: fmt(new Date(y, qStart, 1)),
        to: fmt(new Date(y, qStart + 3, 0)),
        label: 'This quarter',
      };
    }
    case 'this_year':
      return { from: fmt(new Date(y, 0, 1)), to: fmt(new Date(y, 11, 31)), label: 'This year' };
    case 'this_month':
    default:
      return { from: fmt(new Date(y, m, 1)), to: fmt(new Date(y, m + 1, 0)), label: 'This month' };
  }
}

const money = (n: number) =>
  n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const AccountsSection = () => {
  const [period, setPeriod] = useState<PeriodKey>('this_month');
  const [tab, setTab] = useState<'summary' | 'ledger'>('summary');
  const range = useMemo(() => periodRange(period), [period]);

  const { data: pnl, isLoading: pnlLoading } = useQuery({
    queryKey: ['employer-pnl', range.from, range.to],
    queryFn: () => getProfitAndLoss(range.from, range.to),
  });

  const { data: ledger = [], isLoading: ledgerLoading } = useQuery({
    queryKey: ['employer-ledger', range.from, range.to],
    queryFn: () => getLedger(range.from, range.to),
  });

  const totals = useMemo(() => {
    const moneyIn = ledger
      .filter((e) => e.direction === 'in')
      .reduce((s, e) => s + e.amount, 0);
    const moneyOut = ledger
      .filter((e) => e.direction === 'out')
      .reduce((s, e) => s + e.amount, 0);
    return { moneyIn, moneyOut, net: moneyIn - moneyOut };
  }, [ledger]);

  const periodOptions = [
    { value: 'this_month', label: 'This month' },
    { value: 'last_month', label: 'Last month' },
    { value: 'this_quarter', label: 'This quarter' },
    { value: 'this_year', label: 'This year' },
  ];

  return (
    <PageFrame>
      <SectionHeader eyebrow="Money" title="Accounts" meta={range.label} />

      <FilterBar
        tabs={periodOptions}
        activeTab={period}
        onTabChange={(v) => setPeriod(v as PeriodKey)}
      />

      <div className="mt-4">
        <FilterBar
          tabs={[
            { value: 'summary', label: 'Profit & loss' },
            { value: 'ledger', label: 'Ledger', count: ledger.length },
          ]}
          activeTab={tab}
          onTabChange={(v) => setTab(v as 'summary' | 'ledger')}
        />
      </div>

      {tab === 'summary' ? (
        pnlLoading ? (
          <LoadingBlocks className="mt-5" />
        ) : (
          <div className="mt-5 space-y-5">
            <StatStrip
              columns={3}
              stats={[
                { label: 'Invoiced', value: `£${money(pnl?.revenueInvoiced ?? 0)}`, tone: 'blue' },
                { label: 'Paid', value: `£${money(pnl?.revenuePaid ?? 0)}`, tone: 'emerald' },
                {
                  label: 'Outstanding',
                  value: `£${money(pnl?.revenueOutstanding ?? 0)}`,
                  tone: (pnl?.revenueOutstanding ?? 0) > 0 ? 'amber' : 'green',
                },
              ]}
            />

            <ListCard>
              <ListCardHeader title="Profit & loss" meta={range.label} />
              <ListBody>
                <ListRow title="Revenue invoiced" trailing={`£${money(pnl?.revenueInvoiced ?? 0)}`} />
                <Divider label="Costs" />
                <ListRow title="Materials" trailing={`£${money(pnl?.materials ?? 0)}`} />
                <ListRow
                  title="Supplier invoices"
                  trailing={`£${money(pnl?.supplierInvoices ?? 0)}`}
                />
                <ListRow title="Expenses" trailing={`£${money(pnl?.expenses ?? 0)}`} />
                <ListRow
                  title="Labour"
                  subtitle="Gross, from approved timesheets — overtime included"
                  trailing={`£${money(pnl?.labour ?? 0)}`}
                />
                <Divider />
                <ListRow
                  title="Gross profit"
                  subtitle={`${(pnl?.grossMarginPct ?? 0).toFixed(1)}% margin`}
                  trailing={
                    <Pill tone={(pnl?.grossProfit ?? 0) >= 0 ? 'emerald' : 'red'}>
                      £{money(pnl?.grossProfit ?? 0)}
                    </Pill>
                  }
                />
              </ListBody>
            </ListCard>

            <p className="text-xs text-white px-1 leading-relaxed">
              Figures come from your invoices, purchase orders, expense claims and approved
              timesheets. Labour is gross pay before PAYE, National Insurance and pension —
              Elec-Mate is not a payroll or accounting package. Use the payroll export on
              Timesheets to feed Xero, Sage or QuickBooks.
            </p>
          </div>
        )
      ) : ledgerLoading ? (
        <LoadingBlocks className="mt-5" />
      ) : ledger.length === 0 ? (
        <EmptyState
          title="Nothing in this period"
          description="Paid invoices, purchase orders and expense claims will appear here as they happen."
        />
      ) : (
        <div className="mt-5 space-y-5">
          <StatStrip
            columns={3}
            stats={[
              { label: 'Money in', value: `£${money(totals.moneyIn)}`, tone: 'emerald' },
              { label: 'Money out', value: `£${money(totals.moneyOut)}`, tone: 'orange' },
              {
                label: 'Net',
                value: `£${money(totals.net)}`,
                tone: totals.net >= 0 ? 'green' : 'red',
              },
            ]}
          />

          <ListCard>
            <ListCardHeader title="Ledger" meta={`${ledger.length} entries · ${range.label}`} />
            <ListBody>
              {ledger.map((e) => (
                <ListRow
                  key={`${e.direction}-${e.source_id}`}
                  lead={
                    e.direction === 'in' ? (
                      <ArrowDownLeft className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-orange-400" />
                    )
                  }
                  title={`${e.reference || e.category} — ${e.counterparty || ''}`.trim()}
                  subtitle={`${e.category} · ${new Date(e.entry_date).toLocaleDateString('en-GB')}`}
                  trailing={
                    <span
                      className={
                        e.direction === 'in' ? 'text-emerald-400' : 'text-orange-400'
                      }
                    >
                      {e.direction === 'in' ? '+' : '−'}£{money(e.amount)}
                    </span>
                  }
                />
              ))}
            </ListBody>
          </ListCard>
        </div>
      )}
    </PageFrame>
  );
};

export default AccountsSection;
