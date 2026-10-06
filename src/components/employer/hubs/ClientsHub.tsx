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

interface ClientsHubProps {
  onNavigate: (section: Section) => void;
}

export function ClientsHub({ onNavigate }: ClientsHubProps) {
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
      stats={[
        {
          label: 'Clients',
          value: clients.length,
          tone: 'cyan',
          onClick: () => onNavigate('clients'),
        },
        {
          label: 'Outstanding £',
          value: fmt(outstanding),
          tone: (outstanding ?? 0) > 0 ? 'amber' : 'emerald',
          onClick: () => onNavigate('quotes'),
        },
        {
          label: 'Open quotes £',
          value: fmt(pipeline),
          tone: 'blue',
          onClick: () => onNavigate('quotes'),
        },
        {
          label: 'Paid to date £',
          value: fmt(lifetime),
          tone: 'emerald',
          accent: true,
          onClick: () => onNavigate('clients'),
        },
      ]}
    >
      <SectionHeader eyebrow="Win & keep customers" title="From enquiry to repeat business" />

      <HubGrid columns={2}>
        <HubCard
          number="01"
          eyebrow="Get work"
          title="Quote Page"
          description="Your own branded web page and QR code. Customers request a quote and it lands straight in your Leads."
          tone="cyan"
          onClick={() => onNavigate('quotepage')}
        />
        <HubCard
          number="02"
          eyebrow="Pipeline"
          title="Leads"
          description="Track enquiries from first contact to won, before they become a client."
          tone="cyan"
          onClick={() => onNavigate('leads')}
        />
        <HubCard
          number="03"
          eyebrow="Directory"
          title="Clients"
          description="Every customer in one place — their jobs, quotes, invoices and balance."
          tone="yellow"
          meta={clients.length > 0 ? `${clients.length} on record` : 'Add your first client'}
          onClick={() => onNavigate('clients')}
        />
        <HubCard
          number="04"
          eyebrow="Billing"
          title="Quotes & Invoices"
          description="Raise, send and chase quotes and invoices for your clients."
          tone="emerald"
          meta={
            money
              ? money.outstanding > 0
                ? `${fmt(money.outstanding)} outstanding · ${money.outstandingCount} unpaid`
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
          description="A branded view where clients follow job progress, photos and updates."
          tone="blue"
          onClick={() => onNavigate('clientportal')}
        />
      </HubGrid>
    </HubLanding>
  );
}
