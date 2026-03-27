import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Zap,
  ShieldCheck,
  FileCheck2,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Property Guides', href: '/period-property-electrical' },
  { label: 'Period Property Electrical Guide', href: '/period-property-electrical' },
];

const tocItems = [
  { id: 'what-is-period', label: 'What Is a Period Property?' },
  { id: 'survey-checklist', label: 'Survey Checklist' },
  { id: 'common-hazards', label: 'Common Hazards in Period Homes' },
  { id: 'eicr-importance', label: 'Why EICR Matters' },
  { id: 'c2-c3-observations', label: 'Common C2 and C3 Observations' },
  { id: 'buying-period-property', label: 'Buying a Period Property' },
  { id: 'upgrade-options', label: 'Upgrade Options and Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Any property built before 1966 is likely to have wiring that predates the modern ring main standard and current earthing requirements. The older the property, the greater the probability of significant electrical hazards.',
  'The most universal hazard in pre-1966 properties is the absence of RCD protection on socket-outlet circuits, required by Regulation 411.3.3 of BS 7671. This alone makes the installation Unsatisfactory in an EICR.',
  'An EICR should be carried out on any period property before purchase and every 10 years thereafter (or more frequently if the property is rented). Owner-occupiers are not legally required to have an EICR, but it is strongly recommended.',
  'The most common C2 observations in period homes are: absence of RCD protection, missing earth conductors on circuits, inadequate main equipotential bonding, and deteriorated cable insulation.',
  'Electricians carrying out EICR inspections in period properties should allow more time than for modern equivalents — the installation is more complex, access is more difficult, and the findings are typically more extensive.',
];

const faqs = [
  {
    question: 'What counts as a period property for electrical purposes?',
    answer:
      'For practical electrical purposes, a period property is generally one built before 1966. Before this date, wiring regulations did not require protective earthing on all circuits or RCD protection. The 1966 IEE Wiring Regulations introduced the requirement for a protective earth conductor in all new circuits. Properties built before this date may have partial or no earthing on their circuits. Victorian (pre-1901), Edwardian (1901–1910), interwar (1918–1939), and early post-war (1945–1965) all fall within this category.',
  },
  {
    question: 'How often should a period property have an EICR?',
    answer:
      'The recommended maximum interval for a periodic inspection of a domestic installation is 10 years, or at change of occupancy (whichever is sooner). For period properties with older wiring, a shorter interval — 5 years — is often appropriate. For rented period properties, the 2020 Regulations require an EICR at least every 5 years. If the previous EICR recommended a shorter re-inspection interval, that interval should be followed.',
  },
  {
    question: 'Can a period property with old wiring get buildings insurance?',
    answer:
      'Buildings insurance is generally available for period properties, but insurers increasingly ask about the age and condition of the electrical installation. Some insurers require a recent satisfactory EICR as a condition of cover. If the property has rubber-insulated wiring, a cast iron fuse board, or no RCD protection, some insurers will either refuse cover or charge significantly higher premiums. A satisfactory EICR demonstrating the installation has been modernised is the most effective way to obtain competitive insurance.',
  },
  {
    question: 'What is the difference between a C2 and a C3 EICR observation?',
    answer:
      'A C2 observation is a "potentially dangerous" finding that requires remedial action to make the installation safe. The presence of any C2 observation makes the EICR outcome Unsatisfactory. A C3 is an "improvement recommended" observation — the installation is not immediately dangerous but does not meet current best practice. C3 observations do not make the EICR Unsatisfactory on their own. In period properties, C2 observations typically include absent RCD protection, missing earth conductors, and inadequate bonding. C3 observations often include insufficient socket outlets and outdated switch or socket types.',
  },
  {
    question: 'Do I need an electrician for a pre-purchase survey of a period property?',
    answer:
      'A standard RICS homebuyer survey or building survey will comment on the visible condition of the electrical installation but will not carry out an EICR. For a period property, a specialist pre-purchase EICR by a qualified electrician is a worthwhile additional investment (typically £150 to £400). This gives you a detailed assessment of the installation condition, identifies specific hazards, and provides a basis for negotiating the purchase price or requiring the seller to carry out remedial work before completion.',
  },
  {
    question: 'Is it safe to buy a period property with an unsatisfactory EICR?',
    answer:
      'An unsatisfactory EICR does not make a property uninhabitable, but it does indicate that the electrical installation has faults that need attention. Many period properties change hands with outstanding EICR observations — the key is to understand what the observations are, what remedial work is required, and what that work will cost. Use this information to negotiate the purchase price or require the seller to complete the work before exchange. Do not simply ignore an unsatisfactory EICR.',
  },
  {
    question: 'What should I prioritise if I cannot afford a full rewire immediately?',
    answer:
      'If a full rewire is not immediately affordable, prioritise in this order: first, replace any rewirable fuse board with a modern consumer unit incorporating RCD protection (C2 — most urgent after C1 items); second, install missing main equipotential bonding to gas and water services (C2); third, address any C1 observations (danger present — these must be addressed immediately and may require circuits to be taken out of service). C3 observations are lower priority but should be planned for. Always obtain a full EICR first so that all findings are documented and prioritised.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/victorian-house-rewire',
    title: 'Victorian House Rewire Guide',
    description: 'Rubber wiring, knob-and-tube, cast iron consumer units, and solid wall rewiring challenges.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/edwardian-house-electrical',
    title: 'Edwardian House Electrical Guide',
    description: 'VIR cable hazards, early consumer units, and rewiring 1901–1910 properties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/interwar-property-electrical',
    title: '1920s/1930s Property Electrical Guide',
    description: 'Interwar rubber wiring degradation, round pin sockets, and WWII-era property issues.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/post-war-property-electrical',
    title: '1940s/1950s Property Electrical Guide',
    description: 'Early PVC wiring, rewirable fuse boxes, and earthing issues in post-war properties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/listed-building-electrical',
    title: 'Listed Building Electrical Guide',
    description: 'Listed building consent, conservation officers, and sympathetic installation methods.',
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
    id: 'what-is-period',
    heading: 'What Is a Period Property? Electrical Definition',
    content: (
      <>
        <p>
          The term "period property" covers a broad range of building ages and types, from
          Georgian townhouses to interwar semis. For electrical safety purposes, the most
          meaningful threshold is 1966 — the year the IEE Wiring Regulations first required
          a protective earth conductor in all new circuits. Properties built before this date
          may lack earthing on some or all of their circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-1901 (Victorian and earlier)</strong> — rubber insulation, lead
                sheathing, knob-and-tube systems, cast iron or Bakelite fuse boards. No
                earthing as standard. Round pin sockets. Highest risk category.
                See our{' '}
                <SEOInternalLink href="/victorian-house-rewire">
                  Victorian house rewire guide
                </SEOInternalLink>
                {' '}for full details.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1901–1918 (Edwardian and WWI-era)</strong> — VIR (Vulcanised India
                Rubber) cables, early radial circuits, wooden or Bakelite switchboards. Some
                properties had earthing via metal conduit; many had none. See our{' '}
                <SEOInternalLink href="/edwardian-house-electrical">
                  Edwardian house electrical guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1918–1939 (Interwar)</strong> — rubber-insulated radial circuits,
                5-amp round pin sockets, rewirable fuse boards. The National Grid era.
                See our{' '}
                <SEOInternalLink href="/interwar-property-electrical">
                  interwar property electrical guide
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1945–1966 (Early post-war)</strong> — introduction of the ring main
                (1947) and 13-amp sockets. Early PVC insulation. Rewirable fuse boards.
                Better than earlier periods but still significantly out of date. See our{' '}
                <SEOInternalLink href="/post-war-property-electrical">
                  post-war property electrical guide
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
        <p>
          Properties built after 1966 are not "period properties" in the electrical sense,
          though those built before 1985 will have wiring that predates the widespread adoption
          of RCD protection and may still benefit from an EICR and consumer unit upgrade.
        </p>
      </>
    ),
  },
  {
    id: 'survey-checklist',
    heading: 'Pre-Purchase Electrical Survey Checklist for Period Properties',
    content: (
      <>
        <p>
          When viewing a period property with a view to purchase, there are several things
          you can look for before commissioning a formal EICR. These visible indicators do
          not replace a professional inspection but can help you assess the likely scale of
          any electrical issues.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit type</strong> — locate the fuse board (usually under
                the stairs, in the hallway, or in a utility room). A cast iron box, a Bakelite
                unit, or a unit with rewirable fuses rather than MCBs indicates a significant
                upgrade is needed. A modern metal consumer unit with MCBs and RCDs is a
                positive indicator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket types</strong> — are the sockets modern 13-amp square pin
                (BS 1363) type? The presence of round pin sockets (5A or 15A) indicates
                unmodernised wiring. Sockets with discolouration or scorch marks indicate
                a fault history.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable types in loft</strong> — if you can access the loft, look at
                the cables. Cables with woven cotton or jute braid covering, or rubber
                insulation that crumbles when touched, are pre-1960s. PVC cables in good
                condition are from the 1950s onwards. Modern twin-and-earth cable has
                grey PVC sheathing with brown and blue conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of sockets</strong> — count the sockets in each room. Fewer
                than 4 double sockets in a living room or kitchen is an indicator of
                original or little-modernised wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Age of last EICR</strong> — ask the vendor when the last EICR was
                carried out and whether there are outstanding observations. A satisfactory
                EICR less than 5 years old is a positive indicator; no EICR on record
                should prompt you to commission one before exchange.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-hazards',
    heading: 'Common Electrical Hazards in Period Homes',
    content: (
      <>
        <p>
          The following hazards are commonly identified in period properties during EICR
          inspections. They are not exclusive to any single era — a property that is partly
          original and partly modernised may exhibit hazards from multiple periods.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deteriorated cable insulation</strong> — rubber and early PVC
                insulation degrades over time. Cracked, brittle, or carbonised insulation
                allows tracking currents between conductors or to earthed metalwork, creating
                shock and fire risks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent earth conductors</strong> — circuits without a protective
                earth cannot provide adequate fault protection. Without an earth, a fault
                in an appliance can put the appliance case at mains voltage. Touching the
                case while in contact with earth (a wet floor, a metal pipe) can be fatal.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — RCD protection at 30mA significantly
                reduces the risk of fatal electric shock by interrupting the circuit within
                40 milliseconds of a fault current of 30mA or more. Without RCD protection,
                the overcurrent device (fuse or MCB) is the only protection — and fuses
                do not operate quickly enough to prevent a fatal shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate bonding</strong> — equipotential bonding to gas and water
                pipework ensures that all metalwork in the property is at the same electrical
                potential. Without bonding, a fault on a gas appliance could put the gas
                pipework at mains voltage — potentially fatal for anyone touching a pipe
                while also in contact with earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIY additions</strong> — decades of unskilled electrical work by
                previous occupants create unpredictable hazards. Non-standard connections,
                incorrect cable types, absent earth conductors on added circuits, and
                overloaded ring mains are all commonly found in period properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-importance',
    heading: 'Why an EICR Is Essential for Period Properties',
    content: (
      <>
        <p>
          An{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            Electrical Installation Condition Report (EICR)
          </SEOInternalLink>{' '}
          is the only way to properly assess the safety of a period property's electrical
          installation. Visual inspection alone is not sufficient — many serious hazards are
          hidden inside walls, under floors, or within the consumer unit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance testing</strong> — the EICR includes insulation
                resistance tests (1000V DC for circuits rated up to 500V) that reveal
                deterioration in cable insulation not visible to the naked eye. A reading
                below 1MΩ indicates insulation failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth continuity and loop impedance</strong> — the inspector measures
                the continuity of protective earth conductors and the earth fault loop impedance.
                High loop impedance (indicating a poor earth path) means that fault protection
                devices may not operate quickly enough in the event of an earth fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing</strong> — where RCDs are present, the inspector tests
                their operating time using a calibrated RCD tester. An RCD that takes more
                than 40 milliseconds to operate at 30mA is defective and should be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — the inspector opens a representative
                sample of accessories (sockets, switches, light fittings) to inspect the
                condition of cables, connections, and earthing arrangements. Evidence of
                arcing, overheating, or DIY modifications is documented.
              </span>
            </li>
          </ul>
        </div>
        <p>
          EICR costs for period properties are typically £150 to £450 for a domestic property.
          Larger period houses may cost more due to additional circuits and greater inspection
          complexity. This represents excellent value given the potential cost of undetected
          electrical faults — both in human terms and in property damage.
        </p>
      </>
    ),
  },
  {
    id: 'c2-c3-observations',
    heading: 'Common C2 and C3 Observations in Period Homes',
    content: (
      <>
        <p>
          The following observations are the most frequently recorded in EICR inspections
          of period properties. C2 observations make the EICR Unsatisfactory and require
          remedial action. C3 observations are recommendations that do not affect the
          overall EICR outcome.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Absence of RCD protection (Regulation 411.3.3)</strong> — by
                far the most common C2 in period homes. Remedied by fitting a new consumer
                unit with RCD or RCBO protection on all socket circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — No protective earth conductor on circuits</strong> — missing
                earth wires on lighting and/or socket circuits. Remedied by rewiring affected
                circuits in modern twin-and-earth cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Inadequate main equipotential bonding</strong> — missing or
                undersized bonding conductors to gas and water services. Relatively
                inexpensive to rectify (typically £80 to £200).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Deteriorated cable insulation</strong> — insulation resistance
                below 1MΩ, or visible cracking and deterioration at inspection points.
                Requires rewiring of affected circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Insufficient socket outlets</strong> — recommendation to
                increase socket provision. Does not make the EICR Unsatisfactory but
                is associated with the hazard of extension lead overuse.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Old wiring colours without labels</strong> — pre-harmonisation
                wiring colours (red/black) should be labelled where new work in brown/blue
                colours has been added. A C3 recommendation to add warning labels.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'buying-period-property',
    heading: 'Buying a Period Property — Electrical Due Diligence',
    content: (
      <>
        <p>
          Purchasing a period property without understanding the electrical installation
          is a common and costly mistake. A few hundred pounds spent on a pre-purchase EICR
          can save thousands in unexpected remedial work after completion.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commission your own EICR</strong> — do not rely on an EICR
                commissioned by the vendor. Commission your own EICR from a NICEIC-
                or NAPIT-registered electrician before exchange of contracts. The cost
                (£150 to £450) is trivial relative to the purchase price. The electrician
                reports to you and has no commercial interest in the transaction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use the EICR to negotiate</strong> — if the EICR identifies
                significant remedial work, obtain quotes for the work and use this to
                negotiate a reduction in the purchase price. A full rewire costing £5,000
                is a legitimate basis for a price reduction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan the work before completion</strong> — if you know a rewire
                is needed, get quotes and book an electrician before you complete on the
                purchase. Good electricians are often booked weeks in advance, and having
                the work booked reduces the temptation to move in and delay.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inform your insurer</strong> — disclose the electrical condition
                to your buildings insurer before completion. Insurers need accurate
                information about the property at inception of cover. Failure to disclose
                a known hazard could affect a future claim.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'upgrade-options',
    heading: 'Upgrade Options and Costs for Period Properties',
    content: (
      <>
        <p>
          The appropriate electrical upgrade for a period property depends on the EICR findings.
          The options range from targeted remedial work through to a full rewire. The following
          gives typical cost ranges for each approach.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Targeted remedials only</strong> — £200 to £800. Install missing
                bonding, label old-colour wiring, fit missing earth sleeving. Does not
                address the absence of RCD protection or deteriorated insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit replacement</strong> — £450 to £1,000. Modern
                metal-clad consumer unit with RCD or RCBO protection. Addresses the
                absence of RCD protection. Appropriate where the existing wiring has been
                assessed as adequate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Partial rewire</strong> — £1,000 to £3,500. Rewire the most
                problematic circuits (typically those with deteriorated insulation or
                absent earthing) while leaving the remainder. Requires the existing circuits
                to be adequate for connection to a new consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full rewire</strong> — £2,500 to £12,000+ depending on property
                size and type. Replaces all wiring, consumer unit, accessories. The definitive
                solution for a period property with widespread original wiring. Cost varies
                significantly by property type — see our specific guides for Victorian,
                Edwardian, interwar, and post-war properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Period Property EICR Work',
    content: (
      <>
        <p>
          Period property EICRs are among the most technically demanding domestic inspections.
          Allow more time than for modern properties — typically 50 to 100 per cent more time
          per circuit. Document everything thoroughly, as findings in period properties are
          often complex and require clear explanation to the client.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site with Photographs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the full report on site. Photograph all significant findings —
                  deteriorated insulation, absent bonding, round pin sockets, and original
                  consumer units. Clients and insurers benefit from photographic evidence,
                  and it protects you if findings are later questioned.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Convert Inspections to Upgrade Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  Period property EICRs almost always identify significant work. Quote the
                  consumer unit replacement, bonding, and any rewire work on the day using
                  the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Clients who have just received a detailed EICR showing the hazards in
                  their property are motivated to act — the moment to present the quote
                  is now, not in a follow-up email.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete period property EICRs professionally with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, photographic documentation, and professional quoting. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PeriodPropertyElectricalPage() {
  return (
    <GuideTemplate
      title="Period Property Electrical Guide | Old House Electrical Safety UK"
      description="Complete guide to electrical safety in period properties — all pre-1966 homes. What to look for at survey, EICR importance, common C2 and C3 observations, buying due diligence, and upgrade costs from £450 to £12,000+."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Property Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Period Property Electrical Guide:{' '}
          <span className="text-yellow-400">Old House Electrical Safety UK</span>
        </>
      }
      heroSubtitle="This guide covers the electrical safety considerations for all period properties built before 1966 — from Victorian terraces to post-war semis. What to look for at the survey stage, why an EICR is essential, the most common C2 and C3 observations in old houses, and how to approach electrical upgrades cost-effectively."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Period Property Electrical Safety"
      relatedPages={relatedPages}
      ctaHeading="Complete Period Property EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
