import { useMemo } from 'react';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { useExpenseClaims, useMaterialOrders, usePriceBookStats } from '@/hooks/useFinance';
import { useEmployerHubCounts, useFinanceSummary } from '@/hooks/useFinanceModel';
import { financePeriod, formatGBPCompact } from '@/lib/financeDefinitions';
import {
  HubLanding,
  SectionHeader,
  HubGrid,
  HubCard,
  LoadingBlocks,
} from '@/components/employer/editorial';

interface FinanceHubProps {
  onNavigate: (section: Section) => void;
}

/**
 * Finance landing. Every money figure comes from the shared finance model
 * (get_finance_summary), so Outstanding here equals Outstanding on Quotes &
 * Invoices, Clients, Reports and Accounts: sent + overdue invoices' unpaid
 * balance, never drafts or paid.
 */
export function FinanceHub({ onNavigate }: FinanceHubProps) {
  const thisMonth = useMemo(() => financePeriod('this_month'), []);
  const allTime = useFinanceSummary(null, null);
  const month = useFinanceSummary(thisMonth.from, thisMonth.to);
  const { data: hub } = useEmployerHubCounts();
  const { data: expenseClaims = [] } = useExpenseClaims();
  const { data: materialOrders = [] } = useMaterialOrders();
  const { data: priceBook } = usePriceBookStats();

  const pendingExpenses = expenseClaims.filter((e) => e.status === 'Pending').length;
  const openOrders = materialOrders.filter(
    (o) => !['Draft', 'Received', 'Cancelled'].includes(o.status)
  ).length;

  const s = allTime.data;
  const m = month.data;
  const money = (v: number | undefined) => (v === undefined ? '—' : formatGBPCompact(v));

  const priceBookMeta = !priceBook
    ? undefined
    : priceBook.totalItems === 0
      ? 'No items yet'
      : priceBook.lowStock > 0
        ? `${priceBook.lowStock} low on stock`
        : `${priceBook.totalItems} items · none low on stock`;

  if (allTime.isLoading) {
    return (
      <HubLanding
        eyebrow="Money"
        title="Finance"
        description="Quotes, invoices, costs and reporting."
        tone="emerald"
      >
        <LoadingBlocks />
      </HubLanding>
    );
  }

  return (
    <HubLanding
      eyebrow="Money"
      title="Finance"
      description="Quotes, invoices, costs and reporting."
      tone="emerald"
      stats={[
        {
          label: 'Outstanding £',
          value: money(s?.outstanding),
          tone: 'amber',
          onClick: () => onNavigate('quotes'),
        },
        {
          label: 'Overdue £',
          value: money(s?.overdue),
          tone: 'red',
          onClick: () => onNavigate('quotes'),
        },
        {
          label: 'Cash in · 30 days',
          value: money(s?.paidLast30d),
          tone: 'emerald',
          onClick: () => onNavigate('accounts'),
        },
        {
          label: 'Open quotes',
          value: s ? s.openQuoteCount : '—',
          tone: 'blue',
          accent: true,
          onClick: () => onNavigate('quotes'),
        },
      ]}
    >
      {allTime.error && (
        <p className="text-[12.5px] text-white">
          Money figures didn't load — they show as — rather than £0. Pull to refresh or try again
          shortly.
        </p>
      )}

      <SectionHeader eyebrow="Money flows" title="Quote, invoice, report" />

      <HubGrid columns={2}>
        <HubCard
          number="01"
          eyebrow="Customers"
          title="Clients"
          description="Every customer in one place — their quotes, invoices, jobs and balance."
          tone="yellow"
          onClick={() => onNavigate('clients')}
        />
        <HubCard
          number="02"
          eyebrow="Documents"
          title="Quotes & Invoices"
          description="Create, send and chase quotes and invoices."
          meta={
            s
              ? `${s.outstandingCount} unpaid · ${formatGBPCompact(s.outstanding)} · ${s.openQuoteCount} open quote${s.openQuoteCount === 1 ? '' : 's'}`
              : undefined
          }
          tone="yellow"
          onClick={() => onNavigate('quotes')}
        />
        <HubCard
          number="03"
          eyebrow="Books"
          title="Accounts"
          description="Profit and loss and a ledger of money in and out, with CSV and PDF export."
          meta={m?.moneyVisible ? `Gross profit this month ${formatGBPCompact(m.grossProfit)}` : m ? 'Owner and admins only' : undefined}
          tone="emerald"
          onClick={() => onNavigate('accounts')}
        />
        <HubCard
          number="04"
          eyebrow="Insight"
          title="Reports"
          description="Invoiced, costs, gross profit, debtor aging and job profitability."
          meta={m ? `Invoiced this month ${formatGBPCompact(m.invoiced)}` : undefined}
          tone="blue"
          onClick={() => onNavigate('reports')}
        />
        <HubCard
          number="05"
          eyebrow="Profitability"
          title="Job Financials"
          description="Profit per job from invoices, approved timesheets, purchase orders and expenses."
          meta={
            hub
              ? hub.jobs.jobs_gross_profit === null
                ? 'Owner and admins only'
                : hub.jobs.jobs_invoiced > 0
                  ? `${hub.jobs.jobs_invoiced} job${hub.jobs.jobs_invoiced === 1 ? '' : 's'} invoiced · ${formatGBPCompact(hub.jobs.jobs_gross_profit)} gross profit`
                  : 'No jobs invoiced yet'
              : undefined
          }
          tone="emerald"
          onClick={() => onNavigate('financials')}
        />
        <HubCard
          number="06"
          eyebrow="Outgoings"
          title="Expenses"
          description="Review, approve and reimburse team expense claims."
          meta={pendingExpenses > 0 ? `${pendingExpenses} awaiting approval` : 'None awaiting approval'}
          tone="orange"
          onClick={() => onNavigate('expenses')}
        />
        <HubCard
          number="07"
          eyebrow="Materials"
          title="Purchase orders"
          description="Raise POs, track suppliers and deliveries."
          meta={openOrders > 0 ? `${openOrders} open order${openOrders === 1 ? '' : 's'}` : 'No open orders'}
          tone="cyan"
          onClick={() => onNavigate('procurement')}
        />
        <HubCard
          number="08"
          eyebrow="Sign-off"
          title="Signatures"
          description="Capture digital signatures on quotes and certificates."
          tone="indigo"
          onClick={() => onNavigate('signatures')}
        />
        <HubCard
          number="09"
          eyebrow="Pricing"
          title="Price Book"
          description="Materials catalogue, markup and stock levels."
          meta={priceBookMeta}
          tone="amber"
          onClick={() => onNavigate('pricebook')}
        />
      </HubGrid>
    </HubLanding>
  );
}
