/**
 * Mounts the two surfaces that ask an electrician to connect Stripe, in the
 * not-connected state, so they can be measured on a real phone viewport.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StripeConnectBanner from '@/components/electrician/StripeConnectBanner';
import { InvoiceSendDropdown } from '@/components/electrician/invoice-builder/InvoiceSendDropdown';
import UninvoicedQuotesCard from '@/components/electrician/UninvoicedQuotesCard';
import EnhancedTestResultDesktopTable from '@/components/EnhancedTestResultDesktopTable';
import { MobileQuoteItemCard } from '@/components/electrician/quote-builder/MobileQuoteItemCard';
import { EnhancedQuoteItemsStep } from '@/components/electrician/quote-builder/steps/EnhancedQuoteItemsStep';
import CreditNoteSheet from '@/components/electrician/invoice-builder/CreditNoteSheet';
import { InvoiceCard } from '@/components/electrician/invoice-builder/InvoiceCard';
import type { Quote, QuoteItem } from '@/types/quote';
import type { TestResult } from '@/types/testResult';

const invoice = {
  id: 'harness-1',
  invoice_number: 'INV-0042',
  total: 1480,
  invoice_status: 'draft',
  client: { name: 'A Client', email: 'client@example.com', phone: '07700900000' },
  items: [],
} as unknown as Quote;

/*
 * ELE-1704 — a SENT, part-paid, synced invoice that has been part credited.
 * Deliberately the busiest badge row the card can produce, so the credited
 * badge is measured against the worst case rather than an empty one.
 */
const creditedInvoice = {
  id: 'harness-credited',
  invoice_number: 'INV-0043',
  total: 1480,
  total_paid: 500,
  invoice_status: 'sent',
  external_invoice_provider: 'xero',
  client: { name: 'Longish Client Name Ltd', email: 'c@example.com' },
  items: [{ id: 'i1', description: 'Consumer unit', quantity: 1, unitPrice: 1480 }],
  updatedAt: new Date().toISOString(),
} as unknown as Quote;

const which = new URLSearchParams(location.search).get('which') ?? 'banner';
const kase = new URLSearchParams(location.search).get('case') ?? '';

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

/* ELE-1704 — an invoice with two lines, £600 inc VAT. */
const creditableInvoice = {
  id: 'inv-1',
  invoice_number: 'Invoice/042',
  invoice_date: new Date('2026-09-14T00:00:00Z'),
  total: 600,
  settings: { overheadPercentage: 0, profitMargin: 0, vatRate: 20, vatRegistered: true },
  items: [
    { id: 'a', description: 'Consumer unit change', quantity: 1, unit: 'each',
      unitPrice: 400, totalPrice: 400, category: 'materials' },
    { id: 'b', description: 'Second circuit — not carried out', quantity: 1, unit: 'each',
      unitPrice: 100, totalPrice: 100, category: 'labour' },
  ],
} as unknown as Quote;

/*
 * ELE-1704 — a SECOND invoice, with different line ids.
 *
 * The ids are what matter. `CreditNoteSheet` is mounted permanently by
 * InvoicesPage, so its `selected` set survived a change of invoice and was
 * then filtered against lines it could never match — a creditable invoice
 * refused as "already credited in full". Different ids reproduce that.
 */
const otherInvoice = {
  id: 'inv-2',
  invoice_number: 'Invoice/043',
  invoice_date: new Date('2026-09-20T00:00:00Z'),
  total: 300,
  settings: { overheadPercentage: 0, profitMargin: 0, vatRate: 20, vatRegistered: true },
  items: [
    /*
     * Priced so the whole line is creditable against the stub's £120 of
     * existing credits: £100 + 20% VAT = £120, inside the £180 remaining on
     * a £300 invoice. Otherwise the sheet refuses for a legitimate reason
     * (exceeds-remaining) and the leak check cannot tell the two apart.
     */
    { id: 'x', description: 'EICR — 3 bed semi', quantity: 1, unit: 'each',
      unitPrice: 100, totalPrice: 100, category: 'labour' },
  ],
} as unknown as Quote;

/** Lets the check untick a line on one invoice, then switch to another. */
const SwitchHarness: React.FC = () => {
  const [which, setWhich] = React.useState(0);
  return (
    <>
      <button data-switch className="h-11 touch-manipulation" onClick={() => setWhich((w) => (w === 0 ? 1 : 0))}>
        Switch invoice
      </button>
      <CreditNoteSheet
        invoice={which === 0 ? creditableInvoice : otherInvoice}
        open
        onOpenChange={() => {}}
      />
    </>
  );
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
        {which === 'creditnote' &&
          (kase === 'switch' ? (
            <SwitchHarness />
          ) : (
            <CreditNoteSheet invoice={creditableInvoice} open onOpenChange={() => {}} />
          ))}
        {/*
          ELE-1704 — an invoice card carrying a PART credit. Rendered because
          the badge sits in a row that already holds status, part-paid, the
          read receipt and the provider name: the thing worth proving is that
          a fifth item does not push the row out of a 390px card.
        */}
        {which === 'invoicecard' && (
          <div className="w-[190px]">
            <InvoiceCard
              invoice={creditedInvoice}
              onTap={() => {}}
              onMarkPaid={() => {}}
              onDownloadPDF={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
              onCreditNote={() => {}}
              /*
               * A FULL credit is £1,480, so this is deliberately partial: the
               * partial and full states render differently (a figure vs the
               * word "Credited") and only one of them can be the default.
               */
              credited={
                kase === 'full' ? { total: 1480, count: 1 } : { total: 420.5, count: 2 }
              }
            />
          </div>
        )}
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
