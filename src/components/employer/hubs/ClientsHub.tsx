import type { Section } from '@/pages/employer/EmployerDashboard';
import { useClientSummaries } from '@/hooks/useEmployerClients';
import { useFinanceSummary } from '@/hooks/useFinanceModel';
import { formatGBPCompact } from '@/lib/financeDefinitions';
import {
  HubLanding,
  SectionHeader,
  HubGrid,
  HubCard,
  LoadingBlocks,
} from '@/components/employer/editorial';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { CLIENTS_HUB_HELP } from '@/components/employer/help/clients';
import { useEmployerRole } from '@/hooks/useEmployerRole';

interface ClientsHubProps {
  onNavigate: (section: Section) => void;
}

export function ClientsHub({ onNavigate }: ClientsHubProps) {
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = !!roleInfo?.canSeeMoney;
  const { data: clients = [], isLoading } = useClientSummaries();
  // Money figures come from the shared finance model so they match Finance,
  // Quotes & Invoices, Reports and Accounts exactly (outstanding = sent +
  // overdue unpaid balance; drafts never count).
  const { data: money } = useFinanceSummary(null, null);

  if (isLoading) {
    return (
      <HubLanding
        eyebrow="Sales"
        title="Clients"
        description="Your customers, their pipeline, and what they see."
        tone="cyan"
      >
        <LoadingBlocks />
      </HubLanding>
    );
  }

  const fmt = (v: number | undefined) => (v === undefined ? '—' : formatGBPCompact(v));
  const outstanding = money?.outstanding;
  const pipeline = money?.openQuoteValue;
  const lifetime = money?.paidIn;

  return (
    <HubLanding
      eyebrow="Sales"
      title="Clients"
      description="Your customers, their pipeline, and what they see."
      tone="cyan"
      actions={<PageHelpButton help={CLIENTS_HUB_HELP} askContext={{ page: 'clientshub' }} />}
      stats={[
        {
          label: 'Clients',
          value: clients.length,
          tone: 'cyan',
          onClick: () => onNavigate('clients'),
        },
        ...(canSeeMoney
          ? [
              {
                label: 'Outstanding £',
                value: fmt(outstanding),
                tone: (outstanding ?? 0) > 0 ? ('amber' as const) : ('emerald' as const),
                onClick: () => onNavigate('quotes'),
              },
              {
                label: 'Open quotes £',
                value: fmt(pipeline),
                tone: 'blue' as const,
                onClick: () => onNavigate('quotes'),
              },
              {
                label: 'Paid to date £',
                value: fmt(lifetime),
                tone: 'emerald' as const,
                accent: true,
                onClick: () => onNavigate('clients'),
              },
            ]
          : []),
      ]}
    >
      <HowItWorks help={CLIENTS_HUB_HELP} askContext={{ page: 'clientshub' }} />

      <SectionHeader eyebrow="Win & keep customers" title="From enquiry to repeat business" />

      <HubGrid columns={2}>
        <div data-help="clientshub.quotepage" className="contents">
        <HubCard
          number="01"
          eyebrow="Get work"
          title="Quote Page"
          description="Your own branded web page and QR code. Customers request a quote and it lands straight in your Leads."
          tone="cyan"
          onClick={() => onNavigate('quotepage')}
        />
        </div>
        <div data-help="clientshub.leads" className="contents">
        <HubCard
          number="02"
          eyebrow="Pipeline"
          title="Leads"
          description="Track enquiries from first contact to won, before they become a client."
          tone="cyan"
          onClick={() => onNavigate('leads')}
        />
        </div>
        <div data-help="clientshub.clients" className="contents">
        <HubCard
          number="03"
          eyebrow="Directory"
          title="Clients"
          description="Every customer in one place. Their jobs, quotes, invoices and balance."
          tone="yellow"
          meta={clients.length > 0 ? `${clients.length} on record` : 'Add your first client'}
          onClick={() => onNavigate('clients')}
        />
        </div>
        <HubCard
          number="04"
          eyebrow="Billing"
          title="Quotes & Invoices"
          description="Raise, send and chase quotes and invoices for your clients."
          tone="emerald"
          meta={
            money
              ? money.outstanding > 0
                ? canSeeMoney
                  ? `${fmt(money.outstanding)} outstanding · ${money.outstandingCount} unpaid`
                  : `${money.outstandingCount} unpaid`
                : 'Nothing outstanding'
              : undefined
          }
          onClick={() => onNavigate('quotes')}
        />
        <HubCard
          number="05"
          eyebrow="Bidding"
          title="Tenders"
          description="AI-assisted estimating and bid responses to win new work."
          tone="purple"
          onClick={() => onNavigate('tenders')}
        />
        <HubCard
          number="06"
          eyebrow="Client-facing"
          title="Client Portal"
          description="One private page per client: their jobs, who is coming, certificates, invoices with Pay now, and messages to you."
          tone="blue"
          onClick={() => onNavigate('clientportal')}
        />
      </HubGrid>
    </HubLanding>
  );
}
