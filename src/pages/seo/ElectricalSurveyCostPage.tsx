import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Home,
  Building2,
  Factory,
  FileCheck2,
  ClipboardCheck,
  Search,
  Calculator,
  GraduationCap,
  ShieldCheck,
  Receipt,
  Send,
  AlertTriangle,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Survey Cost', href: '/guides/electrical-survey-cost' },
];

const tocItems = [
  { id: 'what-is-electrical-survey', label: 'What Is an Electrical Survey?' },
  { id: 'pre-purchase-survey', label: 'Pre-Purchase Survey Costs' },
  { id: 'commercial-survey', label: 'Commercial Survey Costs' },
  { id: 'large-installation', label: 'Large Installation Assessment' },
  { id: 'whats-included', label: 'What Is Included' },
  { id: 'factors-affecting-cost', label: 'Factors Affecting Cost' },
  { id: 'how-to-save', label: 'How to Save on Survey Costs' },
  { id: 'for-electricians', label: 'For Electricians: Pricing Your Surveys' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A domestic electrical survey (EICR) typically costs between £120 and £350 in the UK, depending on property size, location, and the number of circuits.',
  'Pre-purchase electrical surveys for homebuyers range from £150 to £400 and can reveal hidden defects that affect the sale price or negotiations.',
  'Commercial electrical surveys cost from £300 to £2,000+ depending on the size and complexity of the installation, and are required under the Electricity at Work Regulations 1989.',
  'Large installation assessments for industrial or multi-site properties are priced per distribution board or per day, typically £500 to £1,500 per day.',
  'Elec-Mate helps electricians complete surveys faster and produce professional reports on site, turning every inspection into a priced remedial quote before leaving the property.',
];

const faqs = [
  {
    question: 'How much does an electrical survey cost for a 3-bedroom house?',
    answer:
      'A standard EICR for a 3-bedroom house in the UK typically costs between £150 and £250. This covers a full inspection and testing of the fixed electrical installation, including all circuits from the consumer unit to the final outlets. The price depends on the age of the wiring, the number of circuits (usually 8 to 12 in a 3-bedroom house), your location, and whether the electrician needs to remove consumer unit covers or access difficult areas. Some electricians include minor remedial work in the price (such as tightening loose connections found during testing), while others price the inspection and remedials separately. Always confirm what is included before booking.',
  },
  {
    question: 'Is an electrical survey the same as an EICR?',
    answer:
      'In most contexts, yes. When people refer to an "electrical survey," they usually mean an Electrical Installation Condition Report (EICR), which is the formal inspection and testing of the fixed wiring in a property. The EICR follows the procedures set out in BS 7671 and Guidance Note 3 (GN3). However, "electrical survey" can sometimes refer to a broader scope of work — for example, a pre-purchase survey might include an assessment of the consumer unit age, cable types, earthing arrangement, and an estimate of rewiring costs, in addition to the formal EICR testing. If you are buying a property, ask the electrician specifically whether they will produce a full EICR or a more general condition assessment.',
  },
  {
    question: 'Do I need an electrical survey before buying a house?',
    answer:
      'There is no legal requirement to obtain an electrical survey before buying a house. However, it is strongly recommended. A standard homebuyer survey or building survey does not include detailed electrical testing — the surveyor will note visible defects (such as an old fuse box or surface-mounted wiring) but will not test the circuits. A pre-purchase EICR gives you a full picture of the electrical installation condition, identifies any defects coded C1, C2, or C3, and provides an estimated cost for any remedial work. This information can be used in price negotiations or to plan the cost of bringing the installation up to standard after purchase. Properties with older wiring (pre-1970s) or properties with DIY electrical work are particularly worth surveying before exchange.',
  },
  {
    question: 'How long does an electrical survey take?',
    answer:
      'A domestic EICR for a typical 3-bedroom house takes 2 to 4 hours. This includes visual inspection, dead testing (continuity, insulation resistance, polarity), and live testing (earth fault loop impedance, prospective fault current, RCD operation). Larger properties, HMOs, or properties with multiple distribution boards take longer — a 5-bedroom house with 2 consumer units might take 4 to 6 hours. Commercial surveys vary widely depending on the size of the installation: a small shop might take half a day, while a large office building or factory could take several days. The electrician should give you a time estimate when quoting.',
  },
  {
    question: 'Can I claim the cost of an electrical survey on tax?',
    answer:
      'If you are a landlord, the cost of an EICR is a deductible expense against your rental income for tax purposes. It falls under the category of property maintenance and compliance costs. If you are a business owner, the cost of a commercial electrical survey is a business expense and is fully deductible. For homebuyers, a pre-purchase survey is not tax-deductible as it relates to capital expenditure (the purchase of the property). If you are a self-employed electrician carrying out surveys, your business expenses (test equipment, calibration, insurance, vehicle costs) are deductible. Keep all receipts and invoices — Elec-Mate stores every certificate and invoice digitally for easy retrieval at tax time.',
  },
  {
    question: 'What happens if the electrical survey finds problems?',
    answer:
      'If the EICR is classified as Unsatisfactory (any C1 or C2 observation codes), remedial work is required. For rented properties, the landlord must complete the remedial work within 28 days under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. For homebuyers, the defects can be used to negotiate on price or to request the seller carry out the work before completion. For commercial properties, the duty holder must address the defects to comply with the Electricity at Work Regulations 1989. C3 (Improvement Recommended) observations are advisory and do not make the report Unsatisfactory, but addressing them brings the installation closer to current standards. FI (Further Investigation) codes mean the inspector could not fully assess a part of the installation — further investigation is needed before a final classification can be given.',
  },
  {
    question: 'How do I find a qualified electrician for an electrical survey?',
    answer:
      'The electrician carrying out the survey must be qualified and competent. In practice, this means they should hold the C&G 2391 (or equivalent) inspection and testing qualification, the 18th Edition qualification (C&G 2382), and be registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. You can search for registered electricians on each scheme provider website. Check that they have current public liability insurance (at least £2 million for domestic work) and ask for references or reviews. Avoid extremely cheap quotes — a thorough EICR takes time, and a rushed inspection can miss defects.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK 2026',
    description: 'Average EICR prices by property type, region, and number of circuits.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Legal requirements, penalties up to £30,000, and deadlines landlords must meet.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/house-rewire-guide',
    title: 'House Rewire Guide',
    description: 'Full rewire cost, process, and what to expect during a domestic rewire project.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'In-depth guide to C1, C2, C3, and FI classification codes with real examples.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-electrical-survey',
    heading: 'What Is an Electrical Survey?',
    content: (
      <>
        <p>
          An electrical survey is a comprehensive inspection and testing of the fixed electrical
          installation in a property. In the UK, this is formally known as an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Condition Report (EICR)
          </SEOInternalLink>
          . The survey covers everything from the incoming supply and earthing arrangement through
          the consumer unit (fuse box), all circuits, and every socket, switch, and light fitting in
          the property.
        </p>
        <p>
          The inspection follows the procedures set out in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and Guidance Note 3 (GN3) from the IET. It includes both dead testing (with the supply
          isolated) and live testing, covering continuity of protective conductors, insulation
          resistance, polarity, earth fault loop impedance, prospective fault current, and RCD
          operation.
        </p>
        <p>
          The result is a detailed report that classifies the overall condition of the installation
          as either Satisfactory or Unsatisfactory, with individual defects coded as C1 (Danger
          Present), C2 (Potentially Dangerous), C3 (Improvement Recommended), or FI (Further
          Investigation Required).
        </p>
      </>
    ),
  },
  {
    id: 'pre-purchase-survey',
    heading: 'Pre-Purchase Electrical Survey Costs',
    content: (
      <>
        <p>
          A pre-purchase electrical survey is one of the smartest investments a homebuyer can make.
          Standard homebuyer surveys and building surveys do not include detailed electrical testing
          — they note visible defects but do not test the circuits. A dedicated electrical survey
          reveals the true condition of the wiring, earthing, and protective devices.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Typical Pre-Purchase Survey Costs</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1-2 bedroom flat:</strong> £150 to £220. Typically 4 to 6 circuits, single
                consumer unit, inspection takes 1.5 to 2.5 hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-bedroom house:</strong> £180 to £300. Usually 8 to 12 circuits, may have
                older wiring alongside newer additions. Inspection takes 2 to 4 hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4-5 bedroom house:</strong> £250 to £400. More circuits, possibly 2 consumer
                units, outbuildings with separate supplies. Inspection takes 3 to 5 hours.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Pre-purchase surveys are particularly important for older properties. If the house was
          built before 1970, the wiring may be the original rubber-insulated or lead-sheathed cable,
          which has a limited lifespan and may need a{' '}
          <SEOInternalLink href="/guides/house-rewire-guide">full rewire</SEOInternalLink>.
          Properties from the 1970s and 1980s may have PVC wiring that is still serviceable but may
          lack RCD protection, proper earthing, or adequate circuit protection.
        </p>
        <p>
          The findings from a pre-purchase survey can be used to negotiate on the asking price. If
          the survey reveals that a consumer unit replacement (£800 to £1,500) or partial rewire
          (£2,000 to £5,000) is needed, the buyer can factor this into their offer.
        </p>
      </>
    ),
  },
  {
    id: 'commercial-survey',
    heading: 'Commercial Electrical Survey Costs',
    content: (
      <>
        <p>
          Commercial electrical surveys are required under the{' '}
          <SEOInternalLink href="/guides/electricity-at-work-regulations">
            Electricity at Work Regulations 1989
          </SEOInternalLink>
          . The duty holder (usually the employer or building owner) must ensure the electrical
          installation is maintained in a safe condition. A periodic EICR is the standard method of
          demonstrating compliance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Typical Commercial Survey Costs</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small retail unit or office:</strong> £300 to £600. Single distribution
                board, 10 to 20 circuits. Half-day inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium commercial premises:</strong> £500 to £1,200. Multiple distribution
                boards, 20 to 50 circuits, three-phase supply. Full-day inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large office building or multi-tenanted:</strong> £1,000 to £2,500+.
                Multiple floors, sub-distribution boards, emergency lighting, fire alarm
                integration. Multi-day inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Commercial surveys are typically more complex than domestic ones. Three-phase supplies,
          larger distribution boards, busbar trunking, and industrial equipment all require
          additional testing time. The inspection must also consider the operational requirements of
          the business — shutting down power to an office full of computers or a restaurant kitchen
          requires careful planning and may need to be done outside business hours, which can
          increase the cost.
        </p>
        <p>
          IET Guidance Note 3 recommends a maximum interval of 5 years for commercial installations,
          but some environments (such as construction sites, cinemas, and petrol stations) require
          more frequent inspection — typically every 1 to 3 years.
        </p>
      </>
    ),
  },
  {
    id: 'large-installation',
    heading: 'Large Installation Assessment Costs',
    content: (
      <>
        <p>
          Large installations — factories, warehouses, hospitals, schools, and multi-site portfolios
          — are typically priced per distribution board or per day rather than as a fixed fee per
          property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day rate for large installations:</strong> £500 to £1,500 per day per
                electrician. Complex three-phase installations with hundreds of circuits may require
                a team of 2 to 3 inspectors working for several days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Per distribution board:</strong> £50 to £150 per board, depending on the
                number of ways and the complexity of the circuits fed from it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-site portfolio:</strong> Facilities management companies often
                negotiate volume discounts for inspecting multiple properties. A portfolio of 20
                retail units might be priced at £250 to £350 per unit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For large installations, the survey often needs to be carried out in sections to avoid
          disrupting operations. This requires careful planning and coordination with the site
          manager to schedule shutdowns for each section of the installation.
        </p>
        <SEOAppBridge
          title="Price surveys accurately with AI cost engineering"
          description="Elec-Mate's AI Cost Engineer analyses the scope of work and generates accurate survey pricing based on distribution board count, circuit quantity, and site complexity. Stop underquoting — price every survey for profit."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'whats-included',
    heading: 'What Is Included in an Electrical Survey',
    content: (
      <>
        <p>
          A properly conducted electrical survey includes both a visual inspection and a full
          schedule of tests. Here is what the electrician should be doing:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — checking the condition of the consumer unit,
                cable types, earthing and bonding, socket outlets, switches, light fittings,
                accessories, and any visible signs of damage, overheating, or DIY work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity testing</strong> — testing the continuity of protective
                conductors (R1+R2) and main/supplementary bonding conductors to confirm the earthing
                path is intact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/how-to-test-insulation-resistance">
                    Insulation resistance testing
                  </SEOInternalLink>
                </strong>{' '}
                — testing between live conductors and earth at 500V DC to confirm the cable
                insulation is not breaking down.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Polarity checks</strong> — confirming that live and neutral conductors are
                correctly connected at every point in the installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth fault loop impedance (Zs)</strong> — measuring the impedance of the
                earth fault loop at each circuit to confirm the protective device will disconnect in
                the required time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prospective fault current (PSCC/PEFC)</strong> — measuring the maximum fault
                current at the origin to confirm the protective devices have adequate breaking
                capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing</strong> — testing each RCD at 1x, 5x, and (where applicable)
                1/2x rated residual operating current to confirm it disconnects within the required
                time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The survey produces a formal EICR document with a schedule of inspections and a schedule
          of test results. All{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observations are coded
          </SEOInternalLink>{' '}
          and the overall condition is classified as Satisfactory or Unsatisfactory.
        </p>
      </>
    ),
  },
  {
    id: 'factors-affecting-cost',
    heading: 'Factors That Affect Electrical Survey Cost',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of circuits:</strong> More circuits means more testing. A 6-circuit
                flat is quicker than a 15-circuit house. Each circuit requires individual dead and
                live tests.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of distribution boards:</strong> Properties with multiple consumer
                units (common in extensions, loft conversions, or outbuildings) take longer to
                inspect and test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Age and condition of wiring:</strong> Older installations with deteriorating
                insulation, mixed cable types, or poorly labelled circuits require more time to
                inspect and test safely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Access difficulties:</strong> Consumer units behind furniture, loft wiring
                with no boarding, or circuits in ceiling voids without access hatches add time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location:</strong> London and the South East command higher rates than the
                North of England, Scotland, or Wales. Expect 20-40% higher prices in central London.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Out-of-hours work:</strong> Commercial surveys requiring evening or weekend
                shutdowns typically attract a premium of 25-50% on the standard rate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-save',
    heading: 'How to Save on Electrical Survey Costs',
    content: (
      <>
        <p>
          While you should never choose an electrician solely on price — a rushed or incomplete
          survey can miss dangerous defects — there are legitimate ways to reduce the cost:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clear access to the consumer unit.</strong> Move furniture, clear cupboards,
                and ensure the electrician can reach the fuse box without delay. Time saved is money
                saved.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide previous reports.</strong> If you have a previous EICR or any
                electrical certificates, provide them. This gives the inspector context and can
                speed up the process.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bundle with remedial work.</strong> If you know remedials will be needed,
                ask the electrician to quote for the survey and remedials together. Many will offer
                a discount on the survey if they carry out the remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlords: schedule surveys at tenant changeover.</strong> Inspecting an
                empty property is faster than working around furniture and tenants.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Pricing Your Surveys for Profit',
    content: (
      <>
        <p>
          If you are an electrician carrying out electrical surveys, your pricing should reflect the
          value of the work, not just the time on site. The survey itself is the start of a
          pipeline: every Unsatisfactory result generates remedial work, and every property needs a
          repeat survey in 5 years or less.
        </p>
        <p>Here is how Elec-Mate helps you maximise the profitability of every survey:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Defect-to-Quote Pipeline</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every C1, C2, and FI observation feeds directly into the remedial works estimator.
                  Elec-Mate prices each fix — materials, labour, and margin — and generates a
                  professional quote. Hand the client the EICR and a priced remedial quote in the
                  same visit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Same-Day Delivery</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send the EICR, remedial quote, and invoice to the client by email or WhatsApp
                  before you leave the property. No going home to type up reports. No chasing. The
                  client has everything within minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Cost Engineer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Not sure what to charge? The AI Cost Engineer analyses the property type, circuit
                  count, and location to suggest a competitive but profitable survey price. It uses
                  live trade pricing data to keep your rates current.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start completing surveys faster"
          description="Join 430+ UK electricians using Elec-Mate to complete EICR certificates on site, generate remedial quotes from defects, and send everything to the client before leaving. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSurveyCostPage() {
  return (
    <GuideTemplate
      title="Electrical Survey Cost UK 2026 | What to Expect"
      description="Complete guide to electrical survey costs in the UK for 2026. Pre-purchase survey prices, commercial EICR costs, large installation assessments, what is included, and how to find a qualified electrician."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrical Survey Cost UK 2026:{' '}
          <span className="text-yellow-400">What to Expect and How to Budget</span>
        </>
      }
      heroSubtitle="How much does an electrical survey cost? From pre-purchase domestic surveys at £150 to commercial assessments at £2,000+, this guide breaks down every factor that affects the price — and shows electricians how to price their surveys for maximum profit."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Survey Costs"
      relatedPages={relatedPages}
      ctaHeading="Complete Surveys Faster with Elec-Mate"
      ctaSubheading="AI board scanner, voice test entry, defect-to-quote pipeline, and instant delivery. Join 430+ UK electricians completing professional EICR certificates on their phones. 7-day free trial."
    />
  );
}
