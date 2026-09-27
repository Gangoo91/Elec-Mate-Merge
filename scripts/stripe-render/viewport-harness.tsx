/**
 * Mounts the two surfaces that ask an electrician to connect Stripe, in the
 * not-connected state, so they can be measured on a real phone viewport.
 */
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StripeConnectBanner from '@/components/electrician/StripeConnectBanner';
import { InvoiceSendDropdown } from '@/components/electrician/invoice-builder/InvoiceSendDropdown';
import UninvoicedQuotesCard from '@/components/electrician/UninvoicedQuotesCard';
import EnhancedTestResultDesktopTable from '@/components/EnhancedTestResultDesktopTable';
import { MobileQuoteItemCard } from '@/components/electrician/quote-builder/MobileQuoteItemCard';
import { EnhancedQuoteItemsStep } from '@/components/electrician/quote-builder/steps/EnhancedQuoteItemsStep';
import type { QuoteItem } from '@/types/quote';
import type { TestResult } from '@/types/testResult';
import type { Quote } from '@/types/quote';

const invoice = {
  id: 'harness-1',
  invoice_number: 'INV-0042',
  total: 1480,
  invoice_status: 'draft',
  client: { name: 'A Client', email: 'client@example.com', phone: '07700900000' },
  items: [],
} as unknown as Quote;

const which = new URLSearchParams(location.search).get('which') ?? 'banner';

/*
 * ELE-1770 — the schedule of tests, the shared table behind EIC, EICR AND
 * Testing-Only. A typecheck cannot see an undefined component here, and a
 * crash in this table takes out all three certificate types at once, so it is
 * rendered for real rather than trusted.
 */
const circuit = (over: Partial<TestResult>): TestResult =>
  ({
    id: over.id ?? 'c1', circuitNumber: '1', circuitDescription: 'Ring final',
    referenceMethod: 'C', pointsServed: '8', circuitType: 'Ring', liveSize: '2.5',
    cpcSize: '1.5', bsStandard: 'BS EN 61009', protectiveDeviceType: 'RCBO',
    protectiveDeviceRating: '32', protectiveDeviceKaRating: '6', maxZs: '1.37',
    protectiveDeviceLocation: '', r1r2: '0.42', r2: '', ringContinuityLive: '',
    ringContinuityNeutral: '', rcdRating: '30mA', ringR1: '', ringRn: '', ringR2: '',
    insulationTestVoltage: '500', insulationLiveNeutral: '>299',
    insulationLiveEarth: '>299', insulationResistance: '', insulationNeutralEarth: '',
    polarity: 'Correct', zs: '0.38', rcdOneX: '24', rcdTestButton: '✓', afddTest: 'N/A',
    pfc: '1.2', pfcLiveNeutral: '', pfcLiveEarth: '', functionalTesting: '✓', notes: '',
    circuitDesignation: 'C1', type: '', cableSize: '2.5', protectiveDevice: '',
    ...over,
  }) as TestResult;

const schedule: TestResult[] = [
  circuit({ id: 'c1', circuitNumber: '10', circuitDescription: 'EV charger', phaseType: '3P', phaseAssignment: 'L1,L2,L3' }),
  circuit({ id: 'c2', circuitNumber: '11', circuitDescription: '', isSpare: true }),
  circuit({ id: 'c3', circuitNumber: '12', circuitDescription: '', isSpare: true }),
];

/* ELE-1780 — a material line carrying a time allowance. */
const quoteItem: QuoteItem = {
  id: 'qi1',
  description: 'Double socket outlet, MK Logic Plus white',
  quantity: 10,
  unit: 'each',
  unitPrice: 12.4,
  totalPrice: 124,
  category: 'materials',
  timeAllowance: [{ grade: 'electrician', hours: 0.5 }],
};

const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={qc}>
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0a] p-4">
        {which === 'banner' && <StripeConnectBanner outstandingAmount={1480} />}
        {which === 'dropdown' && (
          <div className="flex justify-end">
            <InvoiceSendDropdown invoice={invoice} />
          </div>
        )}
        {which === 'uninvoiced' && <UninvoicedQuotesCard />}
        {which === 'quotestep' && (
          <EnhancedQuoteItemsStep
            items={[quoteItem]}
            onAdd={() => {}}
            onUpdate={() => {}}
            onRemove={() => {}}
          />
        )}
        {which === 'quoteitem' && (
          <MobileQuoteItemCard
            item={quoteItem}
            onUpdate={() => {}}
            onRemove={() => {}}
            onDuplicate={() => {}}
          />
        )}
        {which === 'schedule' && (
          <EnhancedTestResultDesktopTable
            testResults={schedule}
            allResults={schedule}
            onUpdate={() => {}}
            onRemove={() => {}}
            onBulkUpdate={() => {}}
            onAddCircuit={() => {}}
            earthingArrangement="TN-S"
          />
        )}
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);
