import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Building2,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Wrench,
  Home,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'New Build Electrical Cost', href: '/guides/new-build-electrical-cost-per-m2' },
];

const tocItems = [
  { id: 'overview', label: 'New Build Electrical Installation Overview' },
  { id: 'first-fix', label: 'First Fix Costs and Scope' },
  { id: 'second-fix', label: 'Second Fix Costs and Scope' },
  { id: 'per-m2', label: 'Cost Per Square Metre by Specification' },
  { id: 'specification-levels', label: 'Specification Levels Explained' },
  { id: 'nhbc', label: 'NHBC Standards and Housebuilder Requirements' },
  { id: 'regulations', label: 'Regulations and Certification' },
  { id: 'for-electricians', label: 'For Electricians: Quoting New Build Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'New build electrical installation costs in the UK range from £35 to £85 per square metre depending on specification level, with a typical 3-bedroom house (90m²) costing £4,500 to £8,000 for the full electrical package.',
  'First fix (carcass wiring, containment, back boxes) accounts for approximately 55% to 65% of the total electrical cost. Second fix (accessories, consumer unit, testing, certification) accounts for the remaining 35% to 45%.',
  'Specification levels range from basic (builder standard with minimum outlets) through mid-range (additional sockets, USB charging, downlights) to premium (home automation, structured wiring, underfloor heating controls, EV charger pre-wire).',
  'NHBC Standards Chapter 8.1 sets minimum requirements for electrical installations in new build homes registered with NHBC. The installation must also comply with BS 7671:2018+A3:2024.',
  'An Electrical Installation Certificate (EIC) must be issued for each dwelling, and the work must be notified under Part P of the Building Regulations.',
];

const faqs = [
  {
    question: 'How much does electrical installation cost per square metre for a new build in 2026?',
    answer:
      'New build electrical installation costs range from £35 to £85 per square metre in 2026. A basic builder-standard specification with minimum socket outlets and pendant lighting costs £35 to £45 per square metre. A mid-range specification with additional sockets, downlights, USB charging points, and outdoor lighting costs £50 to £65 per square metre. A premium specification with home automation, structured data wiring, underfloor heating controls, and EV charger installation costs £70 to £85 per square metre. These rates include first fix, second fix, consumer unit, testing, and the EIC.',
  },
  {
    question: 'What is included in first fix electrical for a new build?',
    answer:
      'First fix electrical includes all the wiring and back boxes installed before plastering. This covers running cables from the consumer unit position to each outlet, switch, and light position; fitting galvanised metal back boxes for switches and sockets; installing ceiling plates and loop-in boxes; running cables for smoke detectors, doorbells, and external lighting; and temporarily making off cables for safe plastering. First fix also includes coordination with other trades to ensure cable routes do not conflict with plumbing, heating, and structural elements.',
  },
  {
    question: 'What is included in second fix electrical for a new build?',
    answer:
      'Second fix electrical is carried out after plastering and decoration. It includes fitting the consumer unit and all protective devices; installing all socket outlets, light switches, light fittings, and other accessories; connecting smoke detectors, doorbells, extractor fans, and cooker connections; testing every circuit to BS 7671 standards; completing the Electrical Installation Certificate (EIC); and submitting Part P notification. Second fix is typically the last trade on site before handover.',
  },
  {
    question: 'What are NHBC standards for electrical installations?',
    answer:
      'NHBC Standards Chapter 8.1 covers electrical installations in new homes. Key requirements include compliance with BS 7671:2018+A3:2024, provision of adequate socket outlets in all habitable rooms (minimum 4 doubles in living rooms, 2 doubles in bedrooms), smoke and heat detection to BS 5839-6, energy-efficient lighting (minimum 75% of fixed lighting outlets must be energy efficient), and an SPD (surge protection device) at the consumer unit. The electrical installation must be inspected and tested before the NHBC final inspection.',
  },
  {
    question: 'How many socket outlets are needed in a new build?',
    answer:
      'There is no regulatory minimum in BS 7671, but NHBC Standards and good practice guidelines recommend minimum provisions: living room 4 to 6 double sockets, kitchen 6 to 8 doubles (including dedicated circuits for oven, hob, fridge, dishwasher, and washing machine), bedrooms 2 to 4 doubles each, hallway 1 to 2 doubles, bathroom 1 shaver socket (no standard sockets unless supplied via an isolating transformer or located in Zone 3 outside the splash zone). Most mid-range specifications exceed these minimums significantly.',
  },
  {
    question: 'Do new builds need EV charger pre-wiring?',
    answer:
      'Since June 2022, the Building Regulations (Approved Document S) require new dwellings with associated parking to have an EV charge point installed — not just pre-wired. The minimum requirement is a 7kW Mode 3 smart charge point. The electrical installation must include a dedicated 32A radial circuit from the consumer unit to the charge point location, with appropriate RCD protection per Regulation 411.3.3 of BS 7671. Budget £800 to £1,200 per dwelling for the charge point, cable run, and dedicated circuit.',
  },
  {
    question: 'How long does electrical installation take on a new build house?',
    answer:
      'For a standard 3-bedroom house, first fix electrical takes 2 to 3 days and second fix takes 2 to 3 days. There is typically a gap of 4 to 8 weeks between first and second fix whilst plastering and decoration are completed. Testing and certification adds half a day to a full day. For a development of multiple plots, the electrician will usually work across several plots simultaneously, completing first fix on one plot whilst waiting for others to be ready for second fix.',
  },
  {
    question: 'What smoke detection is required in new build homes?',
    answer:
      'New build homes must have smoke and heat detection installed to BS 5839-6, Category LD1 (recommended) or LD2 (minimum). This requires interlinked smoke detectors in all habitable rooms, landings, and hallways, plus heat detectors in kitchens. Since June 2022, Approved Document B requires all alarms to be interlinked — either hard-wired or via radio frequency. Mains-powered detectors with battery backup are standard. A typical 3-bedroom house requires 6 to 8 interlinked detectors at a material cost of £150 to £250.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rewire-cost-uk',
    title: 'Rewire Cost UK 2026',
    description: 'Domestic rewire costs for comparison with new build rates.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Consumer unit costs that form part of the new build electrical package.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for new build handovers.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote new build electrical packages with per-plot pricing and specification levels.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'New Build Electrical Installation Overview',
    content: (
      <>
        <p>
          Electrical installation in new build homes is structured around the two-fix system that
          aligns with the construction programme. First fix goes in after the building is
          weathertight but before plastering. Second fix completes the installation after
          decoration and before handover.
        </p>
        <p>
          Whether you are a developer pricing the electrical package for a new development, a
          project manager comparing electrical tenders, or a domestic subcontractor quoting new
          build plots, this guide provides realistic per-square-metre costs and specification
          breakdowns based on current UK market rates.
        </p>
        <p>
          New build work offers predictable, repeatable installations — especially on developments
          with multiple plots of the same house type. This makes it attractive for electrical
          contractors who can optimise their labour and material costs across the programme.
        </p>
      </>
    ),
  },
  {
    id: 'first-fix',
    heading: 'First Fix Costs and Scope',
    content: (
      <>
        <p>
          First fix is the carcass wiring stage. All cables are run, back boxes are installed, and
          the installation is prepared for the plasterer. First fix typically accounts for 55% to
          65% of the total electrical cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">First Fix Cost Breakdown</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable and wiring</strong> — £800 to £2,000 per plot depending on size and
                specification. Twin and earth, 3-core and earth, data cable, coaxial, and fire
                alarm cable. A standard 3-bed house uses approximately 400 to 600 metres of cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back boxes and accessories</strong> — £150 to £350 per plot. Galvanised
                metal back boxes (35mm and 47mm depth), ceiling plates, junction boxes, and cable
                clips.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labour (first fix)</strong> — £1,200 to £2,500 per plot. 2 to 3 days at
                day rates of £250 to £350 per electrician, typically with a mate at £150 to £200
                per day.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total first fix cost for a standard 3-bedroom house: £2,500 to £4,500. On a multi-plot
          development with repeated house types, first fix labour can be optimised through
          familiarity and pre-cut cable lengths.
        </p>
      </>
    ),
  },
  {
    id: 'second-fix',
    heading: 'Second Fix Costs and Scope',
    content: (
      <>
        <p>
          Second fix is the completion stage — fitting accessories, the consumer unit, testing, and
          certification. Second fix accounts for 35% to 45% of the total electrical cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Second Fix Cost Breakdown</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit with RCBOs and SPD</strong> — £350 to £600 per plot. A
                10 to 12-way board is standard for a 3-bedroom house.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accessories</strong> — £200 to £600 per plot depending on specification.
                Basic white plastic accessories: £200 to £300. Brushed steel or chrome: £400 to
                £600.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light fittings</strong> — £200 to £1,500 per plot depending on
                specification. Builder-standard pendants and battens: £200 to £400. LED
                downlights throughout: £600 to £1,000. Designer fittings: £1,000+.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labour (second fix, testing, certification)</strong> — £1,000 to £2,000
                per plot. 2 to 3 days including testing and EIC completion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'per-m2',
    heading: 'Cost Per Square Metre by Specification',
    content: (
      <>
        <p>
          Here are realistic per-square-metre rates for new build electrical installations in 2026,
          covering both first and second fix, consumer unit, testing, and EIC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic specification: £35 to £45/m²</strong> — Builder standard. Minimum
                socket outlets per NHBC guidelines, pendant lighting, standard white accessories,
                basic smoke detection, no downlights, no external lighting beyond a single
                bulkhead. Typical for volume housebuilder affordable housing plots.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-range specification: £50 to £65/m²</strong> — Additional socket
                outlets (6+ doubles in living areas), LED downlights in kitchen and bathroom, USB
                charging sockets in bedrooms and kitchen, external lighting (2 to 4 fittings),
                extractor fans, shaver socket, TV and data points in living room and bedrooms.
                Typical for mid-market housebuilder private sale plots.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Premium specification: £70 to £85/m²</strong> — High-density socket
                provision, LED downlights throughout, structured Cat6A data wiring, underfloor
                heating controls (wiring only), multi-room audio pre-wire, comprehensive external
                and garden lighting, EV charger installation, brushed steel or chrome accessories.
                Typical for premium developers and self-build projects.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a 90m² 3-bedroom house: basic specification costs approximately £3,150 to £4,050,
          mid-range costs £4,500 to £5,850, and premium costs £6,300 to £7,650. These are the
          electrical subcontract costs — the developer's selling price will include overheads and
          margin on top.
        </p>
      </>
    ),
  },
  {
    id: 'specification-levels',
    heading: 'Specification Levels Explained',
    content: (
      <>
        <p>
          The specification level is agreed between the developer and the electrical contractor
          before first fix begins. It defines exactly what is included in the electrical package
          for each house type.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Outlet Schedule</h3>
            <p className="text-white text-sm leading-relaxed">
              The outlet schedule defines the exact number and type of socket outlets, lighting
              points, switches, and data points in each room of each house type. It is the
              contract document that the electrician prices against. Any extras requested by the
              buyer are charged as variations.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Buyer Upgrades</h3>
            <p className="text-white text-sm leading-relaxed">
              Many developers offer electrical upgrade packages to buyers — additional sockets,
              downlights, USB charging, external lighting, and EV charger pre-wiring. These
              upgrades are priced per item and typically carry a 30% to 50% margin for the
              developer. The electrician receives the net cost plus a reasonable markup.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'nhbc',
    heading: 'NHBC Standards and Housebuilder Requirements',
    content: (
      <>
        <p>
          Most new build homes in the UK are registered with NHBC (National House Building Council)
          or an equivalent warranty provider. NHBC Standards Chapter 8.1 sets requirements for
          electrical installations that go beyond the minimum in BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum outlet provision</strong> — NHBC requires adequate socket outlets
                in all habitable rooms. Whilst BS 7671 does not specify minimum numbers, NHBC
                Standards effectively set the baseline that builders must meet.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Energy efficiency</strong> — At least 75% of fixed lighting outlets must
                have energy-efficient light fittings (LED or equivalent). This is an NHBC and
                Building Regulations requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke and heat detection</strong> — Interlinked smoke and heat detection
                to BS 5839-6. NHBC requires mains-powered detectors with battery backup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charging</strong> — Approved Document S requires an EV charge point
                for each new dwelling with associated parking. NHBC inspectors verify compliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          NHBC inspectors check the electrical installation at key stages — typically at first fix
          (before plastering) and at completion. Ensure your work will pass these inspections to
          avoid delays to the developer's programme.
        </p>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Certification',
    content: (
      <>
        <p>
          New build electrical installations must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , the Building Regulations (Part P in England and Wales), and NHBC Standards (if
          applicable).
        </p>
        <p>
          An Electrical Installation Certificate (EIC) must be issued for each dwelling. The EIC
          must cover the complete installation including the consumer unit, all final circuits,
          smoke detection, and the EV charger circuit. RCD protection is required for socket
          outlets up to 32A per Regulation 411.3.3 of BS 7671.
        </p>
        <p>
          Part P notification is required for each dwelling. If you are registered with a
          competent person scheme (NICEIC, NAPIT, ELECSA), you can self-certify. The Building
          Regulations Compliance Certificate should be provided to the developer for inclusion
          in the handover pack to the buyer.
        </p>
        <p>
          SPD (surge protection device) installation is required under Regulation 443.4 of
          BS 7671. This should be included in every new build consumer unit as standard.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting New Build Work',
    content: (
      <>
        <p>
          New build electrical work is high-volume, predictable work that rewards efficient
          organisation and tight material procurement. Here are tips for pricing new build
          contracts profitably:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Price Per Plot, Quote Per Phase</h4>
                <p className="text-white text-sm leading-relaxed">
                  Calculate your cost per house type (based on the outlet schedule), then quote
                  the development in phases. Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build per-plot pricing templates that you can replicate across the
                  development.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Templates for Each House Type</h4>
                <p className="text-white text-sm leading-relaxed">
                  Create an{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC template</SEOInternalLink>
                  {' '}for each house type on the development. Pre-populate the circuit schedule,
                  design current, and protective device details. On second fix, you only need to
                  enter the test results for each plot — saving significant administration time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Material Procurement</h4>
                <p className="text-white text-sm leading-relaxed">
                  Bulk-buy cables and accessories for the full development. Negotiate trade
                  account terms with your wholesaler based on the total order value. Pre-cut cable
                  lengths for each house type to reduce waste and speed up first fix.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote new build electrical packages efficiently"
          description="Elec-Mate's quoting app handles per-plot pricing, outlet schedules, and specification levels. AI cost engineering validates your rates against current market data. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NewBuildElectricalCostPage() {
  return (
    <GuideTemplate
      title="New Build Electrical Cost Per m² 2026 | UK Price Guide"
      description="How much does new build electrical installation cost per square metre in 2026? UK guide covering first fix, second fix, specification levels, NHBC standards, and realistic per m² rates from £35 to £85."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          New Build Electrical Cost:{' '}
          <span className="text-yellow-400">UK Per m² Guide 2026</span>
        </>
      }
      heroSubtitle="What does new build electrical installation cost per square metre? This guide covers first fix, second fix, specification levels from basic to premium, NHBC standards, and realistic pricing — for developers comparing tenders and electricians quoting new build contracts."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About New Build Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote New Build Electrical Packages with Per-Plot Pricing"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for new build quoting with outlet schedules, specification levels, and EIC templates. 7-day free trial."
    />
  );
}
