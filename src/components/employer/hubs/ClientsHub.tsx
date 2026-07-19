import type { Section } from '@/pages/employer/EmployerDashboard';
import { useClientSummaries } from '@/hooks/useEmployerClients';
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

  const fmtMoney = (v: number) =>
    v >= 1000 ? `£${(v / 1000).toFixed(1).replace(/\.0$/, '')}k` : `£${Math.round(v)}`;
  const outstanding = clients.reduce((s, c) => s + (c.outstanding || 0), 0);
  const pipeline = clients.reduce((s, c) => s + (c.open_quote_value || 0), 0);
  const lifetime = clients.reduce((s, c) => s + (c.total_paid || 0), 0);

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
          value: fmtMoney(outstanding),
          tone: outstanding > 0 ? 'amber' : 'emerald',
          onClick: () => onNavigate('quotes'),
        },
        {
          label: 'Pipeline £',
          value: fmtMoney(pipeline),
          tone: 'blue',
          onClick: () => onNavigate('quotes'),
        },
        {
          label: 'Lifetime £',
          value: fmtMoney(lifetime),
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
          meta="Share link & QR"
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
          meta={outstanding > 0 ? `${fmtMoney(outstanding)} outstanding` : 'All settled'}
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
