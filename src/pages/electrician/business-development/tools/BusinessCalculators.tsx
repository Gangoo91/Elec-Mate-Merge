/**
 * Business calculators index.
 *
 * Rebuilt on the shared hub shell so it speaks the same language as the
 * Business Hub and Inspection & Testing.
 *
 * What was here: fourteen identical tiles, each an icon over a title and
 * nothing else. No description, no grouping, no indication of what any of them
 * did — so choosing between "Business Cost Calculator" and "Break-even &
 * Margin Guard" meant opening both. The header icon was blue on an otherwise
 * volt-and-graphite page, the icon tiles used translucent volt (which goes
 * muddy brown on this ground — the card recipe warns about exactly this), and
 * a centred marketing paragraph sat between the title and the tools. Every
 * entry also carried `status: 'available'`, so the unavailable branch had
 * never rendered in its life.
 *
 * Now: four groups that match how the work actually breaks down, and every
 * card says what the tool answers rather than what it is called.
 */
import { Helmet } from 'react-helmet';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubToolGrid,
  type HubTool,
} from '@/components/hub/HubPrimitives';

const BASE = '/electrician/business-development/tools';

/** Price the work. */
const pricing: HubTool[] = [
  {
    id: 'hourly-rate',
    title: 'Hourly Rate',
    description: 'What you must charge an hour to cover costs and pay yourself.',
    to: `${BASE}/hourly-rate`,
    meta: 'Start here',
  },
  {
    id: 'pricing-strategy',
    title: 'Pricing Strategy',
    description: 'Build a quote from materials, labour, overhead and margin.',
    to: `${BASE}/pricing-strategy`,
    meta: 'Quote a job',
  },
  {
    id: 'minimum-charge',
    title: 'Minimum Charge',
    description: 'The least a call-out can be worth before it costs you money.',
    to: `${BASE}/minimum-charge`,
    meta: 'Call-out floor',
  },
  {
    id: 'break-even',
    title: 'Break-even & Margin',
    description: 'The rate below which every hour loses money.',
    to: `${BASE}/break-even`,
    meta: 'Know your floor',
  },
];

/** Did the work make money? */
const profit: HubTool[] = [
  {
    id: 'job-profitability',
    title: 'Job Profitability',
    description: 'True profit on a job once labour, materials and overhead land.',
    to: `${BASE}/job-profitability`,
    meta: 'Per job',
  },
  {
    id: 'quote-variance',
    title: 'Quote vs Actual',
    description: 'Where jobs drift from what you quoted, and by how much.',
    to: `${BASE}/quote-variance`,
    meta: 'Track drift',
  },
];

/** What HMRC wants. */
const tax: HubTool[] = [
  {
    id: 'tax-estimator',
    eyebrow: 'Self-employed',
    title: 'Tax & NI',
    description: 'Income tax and Class 4 NI on your profit, with what to set aside.',
    to: `${BASE}/tax-estimator`,
    meta: '2026/27 rates',
  },
  {
    id: 'vat-scheme',
    eyebrow: 'VAT',
    title: 'Scheme Comparison',
    description: 'Flat rate against standard — which leaves you better off.',
    to: `${BASE}/vat-scheme`,
    meta: '£90k threshold',
  },
  {
    id: 'cis-drc',
    eyebrow: 'Subcontracting',
    title: 'CIS & Reverse Charge',
    description: 'CIS deductions and when the domestic reverse charge applies.',
    to: `${BASE}/cis-drc`,
    meta: '20% / 30%',
  },
];

/** Running the business. */
const running: HubTool[] = [
  {
    id: 'business-cost',
    title: 'Business Costs',
    description: 'Every overhead you carry, totalled and per working hour.',
    to: `${BASE}/business-cost`,
    meta: 'Your overhead',
  },
  {
    id: 'cash-flow',
    title: 'Cash Flow',
    description: 'Money in and out month by month, including the tax bills.',
    to: `${BASE}/cash-flow`,
    meta: 'Plan ahead',
  },
  {
    id: 'capacity-planner',
    title: 'Capacity',
    description: 'How many billable hours you actually have to sell.',
    to: `${BASE}/capacity-planner`,
    meta: '37.5h week',
  },
  {
    id: 'staff-cost',
    eyebrow: 'Employing',
    title: 'Fully Loaded Staff Cost',
    description: 'What someone really costs once NI, holiday and pension land.',
    to: `${BASE}/staff-cost`,
    meta: 'Per head',
  },
  {
    id: 'roi-calculator',
    eyebrow: 'Buying',
    title: 'Equipment ROI',
    description: 'Whether a van, tool or machine pays for itself.',
    to: `${BASE}/roi-calculator`,
    meta: 'Payback',
  },
];

const BusinessCalculators = () => (
  <HubPage>
    <Helmet>
      <title>Electrician Business Calculators UK | Pricing, ROI, Tax</title>
      <meta
        name="description"
        content="UK electrician calculators: hourly rate, pricing, ROI, cash flow, capacity and tax. Mobile-first, fast and accurate."
      />
      <link rel="canonical" href="/electrician/business-development/tools" />
    </Helmet>

    <HubMasthead
      section="Business"
      title="Calculators"
      backTo="/electrician/business-development"
    />

    <HubBody>
      <HubToolGrid label="Price the work" cards={pricing} columns="four" />
      <HubToolGrid label="Did it make money?" cards={profit} columns="two" />
      <HubToolGrid label="Tax & VAT" cards={tax} columns="three" />
      <HubToolGrid label="Running the business" cards={running} columns="four" />
    </HubBody>
  </HubPage>
);

export default BusinessCalculators;
