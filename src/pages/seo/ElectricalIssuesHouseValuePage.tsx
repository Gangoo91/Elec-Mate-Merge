import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Search,
  ShieldCheck,
  Scale,
  TrendingDown,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Buying a House Guides', href: '/buying-house-electrical-guide' },
  { label: 'Electrical Issues and House Value', href: '/electrical-issues-house-value' },
];

const tocItems = [
  { id: 'how-electrics-affect-value', label: 'How Electrics Affect Property Value' },
  { id: 'mortgage-surveyors', label: 'What Mortgage Surveyors Flag' },
  { id: 'lender-withholding', label: 'When Lenders Withhold Mortgage Funds' },
  { id: 'rewire-effect', label: 'Effect of a Rewire on Property Value' },
  { id: 'consumer-unit-upgrade', label: 'Consumer Unit Upgrade and Value' },
  { id: 'eicr-failure-effect', label: 'EICR Failure and Property Value' },
  { id: 'offer-reduction', label: 'How Much to Reduce Your Offer' },
  { id: 'remedial-costs', label: 'Typical Costs for Common Remedial Works' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "Electrical issues rarely affect a property's asking price at listing stage — vendors and their agents often underestimate them. However, they become a major negotiating factor once discovered during surveys or a buyer-commissioned EICR.",
  'Mortgage surveyors (RICS valuers acting for the lender) flag electrical defects that affect safety or lendability. A report noting "full rewire required" can lead to a mortgage being offered subject to completion of the works.',
  'Some lenders will withhold a retention from the mortgage advance (typically the cost of the work plus 10%) until a satisfactory completion certificate is provided. This affects the amount of money available to the buyer at completion.',
  'A full rewire does not add pound-for-pound value to a property — but the absence of a modern, certified electrical installation reduces the pool of buyers who can finance the purchase and reduces achievable sale price.',
  'For a property requiring a full rewire, a reduction of the mid-point of two or three quotes for the rewire, plus a reasonable allowance for redecoration, is a defensible negotiating position supported by documented evidence.',
];

const faqs = [
  {
    question: 'Do electrical issues reduce house value?',
    answer:
      'Electrical issues do not reduce the official market valuation of a property in the way that structural defects do, but they significantly affect the realistic achievable sale price. A property requiring a full rewire appeals to a much smaller pool of buyers — cash buyers, developers, and investors — because most mortgage lenders will not advance funds on a property where the electrical installation is considered unsafe. This reduced demand typically forces a price reduction equivalent to at least the cost of the remedial work.',
  },
  {
    question: 'Will a mortgage lender refuse to lend on a property with electrical issues?',
    answer:
      'Lenders do not routinely refuse mortgages purely because of electrical issues, but they may impose conditions. If the mortgage surveyor notes significant electrical defects — such as rubber-insulated wiring, absence of RCD protection, or an overall recommendation for a full rewire — the lender may offer the mortgage subject to a retention. The retention is typically the estimated cost of the work held back from the advance until a satisfactory completion certificate is provided. In severe cases, the lender may decline to advance until the work is completed.',
  },
  {
    question: 'Does a rewire add value to a house?',
    answer:
      'A rewire does not typically add pound-for-pound value in the way that a kitchen renovation or loft conversion might. However, it removes a significant negative that suppresses value and restricts the buyer pool. A property with a modern, certified electrical installation (evidenced by a current EICR and an Electrical Installation Certificate for the rewire) can be marketed to any buyer, including those using high loan-to-value mortgages, and will achieve a higher sale price than an equivalent property requiring electrical work.',
  },
  {
    question: 'How much should I reduce my offer for a rewire?',
    answer:
      "A reasonable offer reduction for a required rewire is the mid-point of two or three written quotes from NICEIC or NAPIT registered electricians, plus a realistic allowance for redecoration (typically 30 to 50 per cent of the rewire cost for a full redecoration, or 15 to 25 per cent for a basic making-good). For a three-bedroom house, this might mean a rewire quote of £5,500 plus £1,500 for redecoration — a total reduction request of £7,000. Some negotiation is expected; the final reduction may be £5,000 to £6,500 depending on the vendor's position.",
  },
  {
    question: "What does a mortgage surveyor look for in a property's electrics?",
    answer:
      'A RICS mortgage surveyor is not a qualified electrician and will not carry out electrical testing. They will note visible indicators of condition: the age and type of consumer unit, presence of rewirable fuse holders, visible wiring type, and any obvious damage or non-standard installations. If they see a rewirable fuse board, rubber-insulated wiring, or note that an EICR has not been provided, they will typically flag this in their report and recommend a specialist electrical inspection. This recommendation can then be used by the buyer to commission an EICR.',
  },
  {
    question: 'Does a consumer unit upgrade add value?',
    answer:
      'A modern consumer unit with RCD or RCBO protection is a prerequisite for mortgage lending and a basic safety requirement. Replacing an old rewirable fuse board with a modern metal-clad RCBO consumer unit (cost £400 to £900) removes a common mortgage condition and makes the property lendable to a wider pool of buyers. It is not a value-adding improvement in the traditional sense, but it removes a value-suppressing defect. The return on investment is essentially the full cost of the purchase price reduction that the old board would have forced.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/buying-house-electrical-guide',
    title: 'Buying a House Electrical Checklist',
    description:
      'What to check at viewing, signs of DIY work, and rewire costs to factor into your offer.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/electrical-survey-before-buying',
    title: 'Electrical Survey When Buying',
    description: 'Do you need an EICR when buying? Costs, what it reveals, and how to negotiate.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'how-electrics-affect-value',
    heading: 'How Electrical Issues Affect House Value in the UK',
    content: (
      <>
        <p>
          The relationship between electrical condition and property value is more nuanced than many
          buyers and vendors realise. An estate agent's valuation is typically based on comparable
          sales and does not factor in the cost of electrical remediation unless the issues are
          blatant. However, once electrical defects are identified during the purchase process, they
          become a significant negotiating factor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reduced buyer pool</strong> — a property requiring significant electrical
                work is effectively restricted to cash buyers, developers, and investors who can
                absorb the remediation cost. Most owner-occupier buyers using standard residential
                mortgages cannot purchase a property where the lender has imposed a retention or
                declined to advance. This reduced competition suppresses achievable price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extended marketing periods</strong> — properties with undisclosed electrical
                issues that surface during survey often fall through at the survey stage. Multiple
                abortive sales increase marketing time and typically result in eventual price
                reductions. Vendors who disclose electrical issues upfront and price accordingly
                tend to achieve faster sales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance implications</strong> — insurers increasingly ask about the age
                and condition of the electrical installation. A property with original
                rubber-insulated wiring or no consumer unit may be uninsurable or attract
                significantly higher premiums. This is a material consideration for mortgage lenders
                and buyers alike.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EPC implications</strong> — while the EPC (Energy Performance Certificate)
                primarily focuses on thermal performance, significant electrical issues may indicate
                an installation that is not energy-efficient (older wiring with higher resistance
                losses, lack of smart controls). Poor EPC ratings increasingly affect mortgage
                availability and buyer appetite.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mortgage-surveyors',
    heading: 'What Mortgage Surveyors Flag About Electrical Installations',
    content: (
      <>
        <p>
          A RICS mortgage valuation surveyor is not an electrician and will not carry out electrical
          testing. Their role is to assess whether the property is suitable security for the
          mortgage advance, not to provide a detailed condition survey. However, they will note
          visible electrical concerns that may affect lendability.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse board</strong> — a surveyor who notes a rewirable ceramic
                fuse board (pre-MCB) will almost certainly flag this and recommend a specialist
                electrical inspection. This is among the most common electrical notes in mortgage
                valuation reports.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visible rubber-insulated or fabric-braided wiring</strong> — wiring in these
                materials, visible in the loft, under stairs, or in accessible cable runs, will be
                noted as evidence of an old installation. The surveyor will recommend further
                investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No recent EICR</strong> — some lenders instruct surveyors to note whether a
                valid EICR is available. Where no EICR exists and the property is older than a
                certain age (often 25 or 30 years), the surveyor may recommend one as a condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-standard electrical installations</strong> — garden rooms with unmarked
                sub-mains, non-standard wiring, or evidence of significant DIY electrical work will
                be flagged. Uncertified Part P work is a concern for insurers and lenders.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When a surveyor's report contains an electrical observation, the lender will usually
          require either an EICR before advancing the mortgage or impose a retention until remedial
          work is completed and certified.
        </p>
      </>
    ),
  },
  {
    id: 'lender-withholding',
    heading: 'When Lenders Withhold Mortgage Funds',
    content: (
      <>
        <p>
          A mortgage retention is an amount the lender holds back from the mortgage advance until
          specified conditions are met. Electrical issues are one of the most common triggers for
          retentions in residential mortgage transactions.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>How retentions work</strong> — the lender offers the mortgage but withholds
                a sum (typically the cost of the works plus 10% contingency) from the advance. This
                money is released once a satisfactory completion certificate (Electrical
                Installation Certificate) is provided. The buyer must fund the gap between the
                reduced advance and the purchase price from other funds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical impact on buyers</strong> — if a buyer is using a high
                loan-to-value mortgage and does not have additional cash to cover the retention
                shortfall, the purchase may become impossible without a price reduction from the
                vendor. This is a strong negotiating position for buyers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>When lenders decline entirely</strong> — in rare cases where the electrical
                installation is considered immediately dangerous (C1 observations, no earthing,
                rubber-insulated wiring throughout), the lender may decline to advance until the
                work is completed. The vendor would need to carry out the work at their cost before
                exchange.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Help to Buy and shared ownership</strong> — government-backed schemes such
                as Help to Buy have specific property condition requirements. Properties requiring
                significant electrical remediation may not qualify for these schemes, further
                restricting the buyer pool.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rewire-effect',
    heading: 'Effect of a Rewire on Property Value',
    content: (
      <>
        <p>
          A full rewire is the most significant electrical improvement that can be made to a
          property. Its effect on value is real but indirect — it removes a major obstacle to sale
          rather than adding to the perceived desirability of the property.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a rewire</strong> — effectively priced as a property with a known
                cost to remedy, accessible mainly to cash buyers and developers. Achievable price is
                typically the market value minus the cost of the rewire, minus a further discount
                for disruption, uncertainty, and risk — often a total discount of 1.5 to 2 times the
                cost of the work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After a rewire</strong> — priced as a standard property with no material
                electrical issues. Accessible to the full buyer pool including high LTV mortgage
                buyers. Achieves market rate without electrical discount. The rewire cost (including
                redecoration) is typically recovered in full through the higher achievable price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation matters</strong> — a rewire is only fully valuable to a buyer
                if it is properly documented. Ensure the electrician provides an Electrical
                Installation Certificate (EIC) and that all Building Regulations notifications under
                Part P have been made. An undocumented rewire creates legal and insurance
                uncertainty for future buyers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit-upgrade',
    heading: 'Consumer Unit Upgrade and Property Value',
    content: (
      <>
        <p>
          A consumer unit upgrade (replacing an old rewirable fuse board or a non-compliant MCB-only
          board with a modern metal-clad RCBO or dual RCD unit) is a smaller but significant
          improvement with a favourable return on investment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost</strong> — a consumer unit replacement by a qualified electrician
                typically costs £400 to £900, including the unit, labour, minor associated works,
                and an Electrical Installation Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Effect on lendability</strong> — a modern consumer unit with RCD protection
                removes the most common electrical mortgage condition. Many mortgage surveyors will
                not flag the installation if a modern compliant consumer unit is present, even if
                the underlying wiring is older PVC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Effective return on investment</strong> — if a vendor pays £700 for a
                consumer unit upgrade and avoids a £3,000 price reduction request from a buyer, the
                return on that investment is excellent. Vendors facing a buyer negotiation should
                consider whether pre-sale remediation is more cost-effective than accepting a price
                reduction.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-failure-effect',
    heading: 'EICR Failure and Its Effect on Property Value',
    content: (
      <>
        <p>
          An Unsatisfactory{' '}
          <SEOInternalLink href="/electrical-survey-before-buying">EICR</SEOInternalLink> (one
          containing C1 or C2 observations) provides buyers with documented evidence of defects and
          quantifiable remediation costs. This is the strongest possible position for price
          negotiation.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations</strong> — danger present. A C1 finding (such as an exposed
                live conductor or failed earthing on a metal enclosure) is the most serious EICR
                outcome. It typically requires immediate action and may result in the inspector
                recommending isolation of affected circuits. A C1 finding gives buyers the strongest
                grounds for price reduction — typically the full cost of remediation plus a risk
                premium.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 observations</strong> — potentially dangerous. Common C2 findings in
                older properties include absence of RCD protection (Regulation 411.3.3 of BS 7671),
                inadequate main bonding, and deteriorated insulation. A C2 finding makes the EICR
                Unsatisfactory and provides grounds for negotiation of the cost of the specific
                remedial work identified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 observations only</strong> — the EICR is Satisfactory. C3 observations
                (improvement recommended but not dangerous) do not provide the same negotiating
                leverage and are generally accepted by buyers without price adjustment, as the EICR
                result is technically Satisfactory.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'offer-reduction',
    heading: 'How Much to Reduce Your Offer for Electrical Issues',
    content: (
      <>
        <p>
          When an EICR reveals electrical defects, calculating a fair offer reduction requires
          combining the actual cost of remediation with reasonable allowances for disruption, risk,
          and the time value of carrying out the work after completion.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire required</strong> — reduce by the mid-point of two or three
                quotes, plus 20 to 30 per cent for redecoration, plus a modest risk premium (5 to 10
                per cent) for unforeseen complications. Example: rewire quotes of £5,000, £5,500,
                and £6,000 → mid-point £5,500. Plus £1,500 redecoration. Total reduction request:
                £7,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement only</strong> — quote typically £400 to £900.
                Reduction request: full quote amount. This is a minor and easily quantifiable cost —
                vendors rarely dispute it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD retrofit and bonding</strong> — quote typically £300 to £700. Reduction
                request: full quote amount. This is a standard, widely quoted piece of remedial
                work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple C2 observations without a full rewire</strong> — sum the individual
                quotes for each item of remedial work. Present these as a schedule with individual
                costs supported by quotes, then request the total as a price reduction.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A well-documented, evidence-based negotiation position (EICR report plus written quotes)
          is far more effective than a round-number request without supporting evidence. Vendors and
          their solicitors respond to documented costs.
        </p>
      </>
    ),
  },
  {
    id: 'remedial-costs',
    heading: 'Typical Costs for Common Electrical Remedial Works (2026)',
    content: (
      <>
        <p>
          Use these 2026 indicative costs when assessing the value impact of electrical defects and
          when preparing negotiation positions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire — two-bedroom property</strong> — £3,500 to £5,500 plus VAT at
                5%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire — three-bedroom property</strong> — £4,500 to £7,000 plus VAT at
                5%. Add £1,500 to £3,000 for redecoration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire — four-bedroom property</strong> — £6,000 to £10,000 plus VAT at
                5%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement (standard domestic)</strong> — £400 to £900
                including unit, labour, and certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD retrofit to existing consumer unit</strong> — £200 to £400. Where the
                consumer unit can be upgraded rather than replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main equipotential bonding — gas and water</strong> — £150 to £300. Fitting
                bonding conductors to incoming gas and water services.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode installation (TT system)</strong> — £300 to £600. Installing
                or testing and replacing the earth electrode for a TT earthing system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewiring outbuilding or garage</strong> — £500 to £1,500 depending on
                distance from the house and complexity.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All prices are indicative. Always obtain multiple written quotes from NICEIC or NAPIT
          registered electricians before negotiating. Prices vary significantly by region and by the
          complexity of the specific installation.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: House Purchase and Remedial EICR Work',
    content: (
      <>
        <p>
          The house purchase market generates excellent remedial work opportunities. Buyers who
          commission an EICR and discover defects need both the EICR report quickly (for
          negotiation) and written quotes for the remedial work. The electrician who provides both
          on the same day wins the remedial work almost every time.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue the EICR Before You Leave</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the full EICR on site and email the PDF to the buyer before you leave
                  the property. Speed is critical — the buyer needs the report to support their
                  negotiation with the vendor, and time is often short before exchange.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work Immediately</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 findings are identified, produce a written quote for the remedial
                  work using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  and send it to the buyer with the EICR. This quote becomes their evidence in the
                  price negotiation. Buyers who get the quote quickly use that electrician for the
                  work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win house purchase EICR and remedial work with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion and instant quoting. Deliver both the EICR report and remedial work quote to buyers before you leave. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalIssuesHouseValuePage() {
  return (
    <GuideTemplate
      title="How Electrical Issues Affect House Value UK | Rewire Effect on Price"
      description="How rewires, consumer unit upgrades, and EICR failures affect property value in the UK. What mortgage surveyors flag, when lenders withhold mortgage funds, how much to reduce your offer, and typical costs for common electrical remedial works."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Property Buyer Guide"
      badgeIcon={Scale}
      heroTitle={
        <>
          How Electrical Issues Affect House Value:{' '}
          <span className="text-yellow-400">Rewires, EICR Failures & Offer Reductions</span>
        </>
      }
      heroSubtitle="Electrical defects are rarely priced into a vendor's asking price — but once discovered, they become a powerful negotiating tool. This guide covers how rewires, consumer unit upgrades, and EICR failures affect property value, what mortgage surveyors flag, when lenders withhold funds, and how to calculate a fair offer reduction."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Issues and House Value"
      relatedPages={relatedPages}
      ctaHeading="Deliver EICRs and Quotes to Buyers Before You Leave"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, instant PDF export, and same-day quoting. 7-day free trial, cancel anytime."
    />
  );
}
