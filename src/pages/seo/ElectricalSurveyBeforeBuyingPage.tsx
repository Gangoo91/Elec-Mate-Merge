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
  CheckCircle2,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Buying a House Guides', href: '/buying-house-electrical-guide' },
  { label: 'Electrical Survey When Buying', href: '/electrical-survey-before-buying' },
];

const tocItems = [
  { id: 'do-you-need-eicr', label: 'Do You Need an EICR?' },
  { id: 'properties-over-25-years', label: 'Properties Over 25 Years Old' },
  { id: 'eicr-cost', label: 'EICR Cost for House Purchase' },
  { id: 'what-eicr-reveals', label: 'What an EICR Reveals' },
  { id: 'c1-c2-explained', label: 'C1 and C2 Observations Explained' },
  { id: 'negotiating-on-results', label: 'Negotiating on EICR Results' },
  { id: 'satisfactory-eicr', label: 'What a Satisfactory EICR Means' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An EICR (Electrical Installation Condition Report) is not legally required when buying a property — but it is strongly recommended for any property over 25 years old, any property with a rewirable fuse board, or any property where the vendor cannot produce a recent EICR.',
  'The cost of an EICR for a house purchase is typically £150 to £400 depending on property size. This is a small cost relative to the potential expense of undisclosed electrical defects.',
  'A C1 observation means danger is present and requires immediate action. A C2 observation means the installation is potentially dangerous. Both make the EICR Unsatisfactory and give strong grounds for renegotiation.',
  'EICR findings are quantifiable — get quotes for the remedial work and use them to negotiate a price reduction or require the vendor to complete the work before exchange.',
  'Mortgage lenders and insurers increasingly ask for evidence of a satisfactory EICR for older properties. Some lenders will withhold mortgage funds if an EICR reveals significant defects.',
];

const faqs = [
  {
    question: 'Is an EICR legally required when buying a house?',
    answer:
      "No. There is no legal requirement for a vendor to provide an EICR when selling a residential property. However, a standard homebuyer's survey does not include electrical testing. Without commissioning your own EICR, you have no reliable information about the condition of the electrical installation. For properties over 25 years old, or where you can see signs of old wiring or a rewirable fuse board, commissioning an EICR before exchange of contracts is strongly recommended.",
  },
  {
    question: 'How much does an electrical survey cost when buying a house?',
    answer:
      'An EICR for a house purchase typically costs £150 to £200 for a one-bedroom flat, £175 to £275 for a two-bedroom property, £250 to £400 for a three-bedroom house, and £350 to £550 for a four-bedroom house. Prices are higher in London and the South East. The cost is non-refundable if you withdraw from the purchase, but it is a small sum compared to the cost of an undisclosed rewire (£4,500 to £10,000) or consumer unit replacement (£400 to £900).',
  },
  {
    question: 'What is the difference between a C1 and C2 observation on an EICR?',
    answer:
      'C1 means danger present — the inspecting electrician has found a condition that poses an immediate risk of injury. C2 means potentially dangerous — the condition is not immediately dangerous but could become so. Both C1 and C2 observations make the EICR Unsatisfactory. A C1 finding might be an exposed live conductor, a damaged cable, or no earthing on a metal enclosure. A C2 finding might be the absence of RCD protection, inadequate bonding, or deteriorated insulation that has not yet failed. Both give strong grounds for renegotiation.',
  },
  {
    question: 'Should I withdraw from a purchase if the EICR is Unsatisfactory?',
    answer:
      'Not necessarily. An Unsatisfactory EICR gives you information — and information is power in a negotiation. The key question is: how much will the remedial work cost, and is the property still good value at the current offer price once you factor in that cost? Get quotes from electricians for the remedial work, then either request a price reduction or ask the vendor to carry out and certify the work before exchange. Withdrawal is appropriate only if the vendor refuses all concessions and the cost of remediation is prohibitive.',
  },
  {
    question: 'Will my mortgage lender ask for an EICR?',
    answer:
      'Some lenders, particularly for older properties or buy-to-let purchases, require evidence of a satisfactory EICR before releasing mortgage funds. Even where a lender does not specifically require an EICR, their surveyor may flag electrical concerns that trigger a further investigation condition on the mortgage offer. Check with your mortgage broker or lender whether an EICR will be required for your specific purchase.',
  },
  {
    question: 'Does the vendor have to let me have an EICR done?',
    answer:
      "The vendor is not legally obliged to allow a pre-purchase EICR, but virtually all will do so. It is a reasonable request and refusal would raise concerns in most buyers' minds. If a vendor actively refuses to allow an electrical inspection, treat this as a significant red flag. You may wish to make allowing an EICR a condition of your offer.",
  },
  {
    question: 'What does an EICR not cover?',
    answer:
      'An EICR covers the fixed electrical installation — wiring, consumer unit, sockets, switches, and the main earthing and bonding system. It does not cover portable appliances (which require a PAT test), the condition of the electricity meter (which belongs to the distribution network operator), or the incoming supply cable from the street. Solar PV systems and EV chargers may or may not be included — confirm the scope with the inspector before booking.',
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
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-issues-house-value',
    title: 'How Electrical Issues Affect House Value',
    description:
      'How rewires, consumer unit upgrades, and EICR failures affect property value and mortgage lending.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/new-home-electrical-checklist',
    title: 'New Home Electrical Checklist',
    description:
      'What to do when you move into a new property — RCD tests, smoke detectors, emergency procedures.',
    icon: CheckCircle2,
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
    id: 'do-you-need-eicr',
    heading: 'Do You Need an EICR When Buying a House?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is not a legal requirement for a
          residential property sale. Unlike a Gas Safety Record (which must be provided for rented
          properties), there is no obligation on a vendor to commission or provide an EICR to a
          buyer. However, a standard RICS homebuyer's survey explicitly excludes electrical testing,
          meaning that without a separate EICR, buyers have no reliable information about the
          condition of the wiring.
        </p>
        <p>
          For most properties, commissioning an EICR before exchange of contracts is strongly
          recommended. The cost (typically £150 to £400) is modest relative to the protection it
          provides. An EICR is particularly important if:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>The property is over 25 years old</strong> — installations from before the
                year 2000 may lack RCD protection on socket circuits (Regulation 411.3.3 of BS
                7671), have non-compliant bonding, or have wiring nearing the end of its design
                life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>The consumer unit is a rewirable fuse board</strong> — rewirable ceramic
                fuse holders without MCBs or RCDs indicate the installation has not been
                significantly updated since at least the 1970s.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>The vendor cannot produce a recent EICR</strong> — if the vendor has no EICR
                from the past five years, there is no documentary evidence of the installation's
                condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>You can see signs of DIY work or old wiring at viewing</strong> — dark
                rubber-insulated cables, fabric-braided wiring, or non-standard fittings are all
                reasons to commission an inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Even for newer properties, an EICR can uncover defects from poor installation work. It is
          one of the most cost-effective due diligence steps available to a property buyer.
        </p>
      </>
    ),
  },
  {
    id: 'properties-over-25-years',
    heading: 'Why Properties Over 25 Years Old Need Extra Scrutiny',
    content: (
      <>
        <p>
          The 18th Edition of BS 7671 (the Wiring Regulations) was published in 2018 and updated in
          2022 (Amendment 2) and 2024 (Amendment 3). Properties wired before 2000 were designed to
          earlier standards and may not comply with current requirements in several important ways.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on socket circuits</strong> — required under Regulation
                411.3.3. Properties wired before the 16th Edition (1991) commonly have no RCD
                protection at all. This is one of the most common C2 observations in older
                properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No supplementary bonding in bathrooms</strong> — while the 17th Edition
                (2008) made supplementary bonding in bathrooms optional where RCD protection was
                present, older properties without RCDs may require supplementary bonding to
                metalwork in bathroom zones under Regulation 701.415.2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Original wiring at end of life</strong> — PVC-insulated cable has a design
                life of approximately 25 to 40 years. Wiring from the 1980s and early 1990s is
                approaching or past this range. Rubber-insulated wiring from pre-1966 is well beyond
                its serviceable life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-compliant consumer unit casing</strong> — since BS 7671:2008+A3:2015,
                consumer units in domestic premises must have a metal enclosure (non-combustible
                material). White plastic consumer units installed before 2016 may be noted as a C3
                (improvement recommended) observation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-cost',
    heading: 'EICR Cost for a House Purchase (2026 Prices)',
    content: (
      <>
        <p>
          The cost of an EICR commissioned during a house purchase depends primarily on the size of
          the property (number of circuits) and your location. These are typical 2026 prices across
          the UK:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £150 to £200. Typically 2 to 3 hours. Usually 3
                to 5 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £175 to £275. Typically 3 to 4 hours.
                Usually 5 to 8 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £250 to £400. Typically 3 to 5 hours. Usually
                8 to 12 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom house</strong> — £350 to £550. Typically 4 to 6 hours. Usually
                10 to 16 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>London and South East premium</strong> — add 20 to 30 per cent to the
                figures above. Inner London prices are typically at the top of these ranges or above
                due to higher labour rates, parking, and congestion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR cost is not refundable if you withdraw from the purchase, but it is a sound
          investment. A single C2 observation can justify a price reduction that is many times the
          cost of the inspection.
        </p>
      </>
    ),
  },
  {
    id: 'what-eicr-reveals',
    heading: 'What an EICR Reveals About a Property',
    content: (
      <>
        <p>
          An EICR is a comprehensive assessment of the fixed electrical installation. During the
          inspection, a qualified electrician will carry out both a visual inspection and a series
          of electrical tests. Here is what the report covers:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit and protective devices</strong> — condition, age, type of
                protection (MCBs, RCDs, RCBOs), and compliance with current standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — main earthing terminal, main protective
                bonding to gas and water services (Regulation 411.3.1.2), and supplementary bonding
                where required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit testing</strong> — insulation resistance, continuity of protective
                conductors, polarity, earth fault loop impedance (Ze and Zs), and RCD operating
                times. These tests reveal the condition of hidden wiring that cannot be assessed
                visually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sockets, switches, and accessories</strong> — condition and compliance,
                including socket locations in kitchen zones and bathroom zones where BS 7671 places
                restrictions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Special locations</strong> — bathrooms, garages, outbuildings, and garden
                electrical installations each have specific requirements under BS 7671 Part 7 that
                the inspector will check.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'c1-c2-explained',
    heading: 'C1 and C2 Observations — What They Mean for Your Purchase',
    content: (
      <>
        <p>
          The EICR uses a classification system defined in BS 7671 Section 631 to categorise
          observations. Understanding the difference between codes is essential for assessing the
          seriousness of any findings.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger Present</strong> — there is immediate risk of injury. The
                inspector may recommend that the circuit or installation be isolated (turned off)
                immediately. Examples include an exposed live conductor, a broken socket with live
                parts accessible, or a cable with damaged insulation. A C1 finding is the most
                serious possible outcome and requires urgent remedial action. It provides strong
                grounds for significant renegotiation or withdrawal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially Dangerous</strong> — the installation is not immediately
                dangerous but could become so. This is the most commonly found serious code in older
                properties. Examples include the absence of RCD protection on socket circuits
                (Regulation 411.3.3), inadequate main bonding, or deteriorated insulation that has
                not yet failed. A C2 finding makes the EICR Unsatisfactory and provides grounds for
                renegotiation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement Recommended</strong> — not classified as dangerous, but the
                inspector considers the installation would benefit from improvement. Examples
                include a non-compliant (pre-2016 plastic) consumer unit casing, or circuits that
                are not RCD-protected but where RCDs are not strictly required. C3 observations do
                not make the EICR Unsatisfactory. They are useful for planning future upgrades but
                do not provide the same negotiating leverage as C1 or C2 findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further Investigation Required</strong> — the inspector cannot fully
                assess part of the installation without further investigation (for example, where
                access is restricted, or where test results are borderline). FI observations require
                follow-up testing and should be resolved before exchange.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The overall EICR result is Satisfactory only where there are no C1, C2, or FI
          observations. An Unsatisfactory EICR does not mean the property is uninhabitable — it
          means there is documented evidence of work that needs to be done.
        </p>
      </>
    ),
  },
  {
    id: 'negotiating-on-results',
    heading: 'Negotiating on EICR Results',
    content: (
      <>
        <p>
          An Unsatisfactory EICR is one of the clearest grounds for renegotiating a property
          purchase. Electrical remedial work is quantifiable and quotable — unlike damp or
          structural issues, where costs are harder to pin down, an electrician can give a firm
          quote for the remedial work identified by the EICR.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get written quotes before negotiating</strong> — obtain two or three written
                quotes for the remedial work from NICEIC or NAPIT registered electricians. Present
                these to the vendor's solicitor as evidence. A quote is far more persuasive than a
                verbal estimate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Price reduction is usually preferable</strong> — asking the vendor to manage
                and pay for remedial work before completion risks rushed or poor-quality work. A
                price reduction of the mid-point between your quotes gives you control over
                contractor selection and quality.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Factor in disruption costs</strong> — a rewire is not just about the
                electrician's fee. Redecoration, replastering, temporary accommodation, and the
                practical disruption of living through a rewire all add cost. Factor these into your
                negotiation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solicitor's retention</strong> — for significant remedial works, your
                solicitor can arrange a contractual retention — part of the purchase price held
                until the work is completed and certified. This is particularly useful if the vendor
                agrees to carry out the work but you want assurance it will actually be done.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'satisfactory-eicr',
    heading: 'What a Satisfactory EICR Means',
    content: (
      <>
        <p>
          A Satisfactory EICR is the result you are hoping for. It means the inspector has found no
          C1, C2, or FI observations. There may be C3 (improvement recommended) observations — these
          are not defects, they are suggestions for future improvement.
        </p>
        <p>
          A Satisfactory EICR does not mean the installation is perfect or will never need
          attention. It means that at the time of inspection, the installation was found to be in a
          condition where it did not pose a danger. The inspector will recommend a next inspection
          date, typically in one to five years depending on the age and condition of the
          installation.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep the EICR</strong> — a Satisfactory EICR is a document you will want to
                keep. It demonstrates the condition of the installation at the time of purchase and
                will be useful when you come to sell, let the property, or make an insurance claim.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Note the next inspection date</strong> — the EICR will specify a recommended
                next inspection date. Diarise this and commission a follow-up EICR when due. The
                recommended interval for a domestic property is typically 10 years for a new
                installation and up to 5 years for an older one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review C3 observations</strong> — while C3 findings do not make the EICR
                Unsatisfactory, they identify areas for improvement. Review these with your
                electrician and plan upgrades as budget allows.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician for a House Purchase EICR',
    content: (
      <>
        <p>
          For a house purchase EICR to be meaningful, it must be carried out by a competent,
          independent electrician. Here is what to look for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC, NAPIT, or ELECSA registered</strong> — registration with a competent
                person scheme guarantees minimum qualifications and carries independent assessment.
                Check registration on the scheme's online register before booking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City and Guilds 2391 or equivalent</strong> — the inspector should hold a
                qualification specifically in inspection and testing, not just installation work.
                C&amp;G 2391 (Inspection and Testing of Electrical Installations) is the standard
                qualification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Independence</strong> — use a different electrician from the one who carried
                out any recent work on the property. An independent inspector has no interest in
                concealing previous defects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Turnaround time</strong> — house purchases often move quickly. Confirm how
                quickly the inspector can complete the inspection and issue the written report. A
                report delivered electronically on the same day as the inspection is ideal.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building Your House Purchase EICR Business',
    content: (
      <>
        <p>
          House purchase EICRs are a high-volume, repeatable source of work with a predictable fee
          structure. Buyers are commissioning them increasingly as awareness grows, and a referral
          network with mortgage brokers, conveyancers, and estate agents can generate a consistent
          flow of bookings.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Deliver Reports Before You Leave</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the full EICR on your phone during the inspection and send the PDF to
                  the buyer before you drive away. Speed is a competitive advantage in house
                  purchases — buyers need the report to progress the transaction.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 findings are identified, quote the remedial work immediately using
                  the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Buyers need quotes quickly to negotiate with vendors. The electrician who
                  provides a quote on the day of the EICR almost always wins the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete house purchase EICRs faster with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. Send reports to buyers before you leave the property. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalSurveyBeforeBuyingPage() {
  return (
    <GuideTemplate
      title="Electrical Survey When Buying a House UK | EICR for House Purchase"
      description="Do you need an EICR when buying a house? Not legally required but strongly recommended for properties over 25 years old. Cost £150-400, what it reveals, C1 and C2 observations explained, and how to negotiate on results."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Buyer's Guide"
      badgeIcon={Search}
      heroTitle={
        <>
          Electrical Survey When Buying a House:{' '}
          <span className="text-yellow-400">EICR for House Purchase UK</span>
        </>
      }
      heroSubtitle="An EICR is not legally required when buying a house — but for any property over 25 years old, it is one of the most valuable pieces of due diligence you can commission. This guide explains what an EICR costs, what it reveals, how to interpret C1 and C2 observations, and how to use the findings to negotiate."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Surveys When Buying a House"
      relatedPages={relatedPages}
      ctaHeading="Deliver House Purchase EICRs Before You Leave the Property"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning and instant PDF export. Speed wins house purchase work. 7-day free trial, cancel anytime."
    />
  );
}
