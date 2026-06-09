import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  Wrench,
  FileCheck2,
  PoundSterling,
  ClipboardCheck,
  GraduationCap,
  Home,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Consumer Unit Replacement Cost', href: '/guides/consumer-unit-replacement-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Why Replace a Consumer Unit?' },
  { id: 'material-costs', label: 'Material Costs Breakdown' },
  { id: 'device-types', label: 'MCB vs RCD vs RCBO' },
  { id: 'labour-costs', label: 'Labour and Installation Costs' },
  { id: 'total-costs', label: 'Total Cost by Type' },
  { id: 'factors', label: 'Factors Affecting Price' },
  { id: 'when-needed', label: 'When Is Replacement Needed?' },
  { id: 'part-p', label: 'Part P and Building Regulations' },
  { id: 'choosing-electrician', label: 'Choosing an Electrician' },
  { id: 'for-electricians', label: 'For Electricians: Quoting CU Replacements' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A consumer unit replacement in the UK typically costs between £450 and £2,500 including materials, labour, Part P notification, and an Electrical Installation Certificate (EIC).',
  'Material costs range from around £90 for a basic 6-way enclosure to over £930 for a high-integrity 14-way unit with SPD and Type A RCBOs (trade prices from Wylex, BG Electrical, and Crabtree).',
  'Consumer unit replacement is notifiable work under Part P of the Building Regulations and must be carried out by a registered competent person or inspected by Building Control.',
  'BS 7671:2018+A4:2026 Regulation 421.1.201 requires that consumer units in domestic premises shall comply with BS EN 61439-3 and have their enclosure manufactured from non-combustible material (or be enclosed in a non-combustible cabinet complying with Regulation 132.12). Since January 2016, following Amendment 3 to BS 7671:2008, all new domestic consumer units must use a non-combustible (metal) enclosure.',
  'An Electrical Installation Certificate (EIC) must be issued after every consumer unit replacement. Regulation 644.1 of BS 7671:2018+A4:2026 requires an EIC, based on the model in Appendix 6, upon completion of verification of a new installation, addition or alteration — including the replacement of a distribution board or consumer unit.',
  'Under BS 7671:2018+A4:2026 (Regulation 421.1.7), arc fault detection devices (AFDDs) conforming to BS EN 62606 are now required for single-phase socket-outlet final circuits rated up to 32 A in high-rise residential buildings, houses in multiple occupation, purpose-built student accommodation and care homes. For all other premises, AFDDs are recommended for those circuits.',
];

const faqs = [
  {
    question: 'How much does it cost to replace a consumer unit in 2026?',
    answer:
      'The total cost to replace a consumer unit in 2026 ranges from approximately £450 for a basic 6-way board in a straightforward installation to £2,500 or more for a large high-integrity unit with SPD, Type A RCBOs, and complex rewiring. The average domestic replacement with a 10 to 12-way board, RCBOs, and SPD costs between £750 and £1,200. This includes the consumer unit, protective devices, sundries, labour, testing, Part P notification, and the EIC.',
  },
  {
    question: 'Is a consumer unit replacement notifiable under Part P?',
    answer:
      'Yes. Replacing a consumer unit in a domestic dwelling is notifiable work under Part P of the Building Regulations (England and Wales). The work must be carried out by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent) who can self-certify the work, or it must be inspected and approved by the local Building Control body. Failure to notify can cause problems when selling the property and may invalidate your home insurance.',
  },
  {
    question: 'Do I need an SPD when replacing a consumer unit?',
    answer:
      'Surge protection against transient overvoltages is governed by Regulation 443.4 of BS 7671:2018+A4:2026. Protection shall be provided where the consequence of an overvoltage could result in serious injury to, or loss of, human life, or in significant financial or data loss. For all other cases, protection shall be provided unless the owner of the installation declares it is not required because any loss or damage is tolerable and they accept the risk. In practice this means that for most domestic consumer unit replacements an SPD should be fitted by default, and it is omitted only where the owner makes that documented declaration. The additional cost is modest — approximately £80 to £150 — versus the protection it provides against transient overvoltages from indirect lightning strokes and switching surges.',
  },
  {
    question: 'How long does a consumer unit replacement take?',
    answer:
      'A straightforward like-for-like consumer unit replacement typically takes 4 to 6 hours. This includes isolating the supply, removing the old board, installing the new consumer unit, reconnecting and labelling all circuits, installing the SPD, testing every circuit, and completing the EIC. More complex installations — where additional circuits are being added, the meter tails need replacing, or the earthing arrangements need upgrading — can take a full day or occasionally two days.',
  },
  {
    question: 'Can I replace a consumer unit myself?',
    answer:
      'While there is no law preventing a homeowner from carrying out electrical work in their own property, consumer unit replacement is notifiable work under Part P. If you are not registered with a competent person scheme, you must notify Building Control before starting the work and have the installation inspected and tested by a qualified person afterwards. In practice, the complexity of the work — safe isolation of the incoming supply, correct selection of protective devices, testing to BS 7671 standards — means this is not a suitable DIY project. An incorrectly wired consumer unit can cause electric shock or fire.',
  },
  {
    question: 'What is the difference between RCDs, RCBOs, and MCBs in a consumer unit?',
    answer:
      'An MCB (miniature circuit breaker) provides overcurrent protection — it trips if a circuit draws too much current due to overload or short circuit. An RCD (residual current device) detects earth leakage current and trips to prevent electric shock. An RCBO combines both functions in a single device, providing overcurrent and earth leakage protection for an individual circuit. RCBOs are preferred in modern installations because a fault on one circuit does not affect other circuits — with split-load RCD boards, a single earth fault trips the RCD and disconnects all circuits on that bank.',
  },
  {
    question: 'Should I upgrade from RCDs to RCBOs when replacing a consumer unit?',
    answer:
      'Yes, upgrading to RCBOs is strongly recommended. A board fitted with individual RCBOs per circuit means that a fault on one circuit only trips that circuit, leaving all other circuits live. With a traditional split-load RCD arrangement, a single earth fault trips the RCD and disconnects all circuits on that bank — potentially half the house. The additional material cost for RCBOs versus an RCD split-load configuration is approximately £150 to £300, but the improvement in fault discrimination and continuity of supply is significant.',
  },
  {
    question: 'What happens to my electricity supply during a consumer unit replacement?',
    answer:
      'The electricity supply to the entire property must be switched off at the main fuse (DNO cutout) during the consumer unit replacement. There will be no power to any circuits for the duration of the work. A competent electrician will coordinate with you to minimise disruption — ensuring freezers are kept closed, medical equipment users have alternative arrangements, and the work is completed within a single day wherever possible.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations UK',
    description:
      'Detailed guide to the regulations governing consumer units including Amendment 4 changes.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-upgrade',
    title: 'Consumer Unit Upgrade Guide',
    description: 'When and why to upgrade a consumer unit, including signs of an outdated board.',
    icon: Settings,
    category: 'Guide',
  },
  {
    href: '/guides/spd-surge-protection',
    title: 'SPD Surge Protection Guide',
    description:
      'Everything about surge protection devices, BS 7671 requirements, and SPD selection.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for consumer unit replacements on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote consumer unit replacements with itemised materials, labour, and professional PDF output.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/rewire-cost-uk',
    title: 'Rewire Cost UK 2026',
    description:
      'Full house rewire costs including consumer unit replacement as part of a larger project.',
    icon: Home,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Replace a Consumer Unit?',
    content: (
      <>
        <p>
          The consumer unit — also called the fuse board or distribution board — is the nerve centre
          of every domestic electrical installation. It distributes power to every circuit in the
          property and houses the protective devices that prevent electric shock and fire. When it
          fails or falls behind current standards, the entire installation is compromised.
        </p>
        <p>
          Consumer unit replacement is one of the most common jobs in domestic electrical work, and
          one of the most frequently quoted. Whether you are a homeowner trying to understand the
          costs, or an electrician looking to sharpen your pricing, this guide breaks down every
          element of the cost — materials, labour, certification, and the factors that push the
          price up or down.
        </p>
        <p>
          Under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>
          , Regulation 421.1.201 requires that consumer units in domestic premises shall comply with
          BS EN 61439-3 and have their enclosure manufactured from non-combustible material — or,
          alternatively, be enclosed in a cabinet of non-combustible material complying with
          Regulation 132.12. This non-combustible enclosure requirement has applied to all new
          domestic consumer units since January 2016, when it was introduced by Amendment 3 to BS
          7671:2008 (BS 7671:2008+A3:2015) — a critical fire safety improvement that the current
          18th Edition carries forward.
        </p>
        <p>
          If your property still has an old plastic consumer unit, a rewirable fuse board, or a
          board without RCD protection, replacement is not just recommended — in many cases it is
          the single most impactful safety upgrade you can make to the electrical installation.
        </p>
      </>
    ),
  },
  {
    id: 'material-costs',
    heading: 'Material Costs Breakdown: What Goes Into a Consumer Unit Replacement',
    content: (
      <>
        <p>
          The material cost of a consumer unit replacement depends on the board size, the type of
          protective devices fitted, and whether additional components such as an SPD are included.
          Here is a breakdown based on current trade prices from major UK wholesalers.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-4 overflow-hidden">
          <h3 className="font-bold text-white text-lg mb-4">
            Consumer Unit Enclosure (Indicative Trade Prices)
          </h3>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-white/60">
                  <th className="py-2 pr-3 font-medium">Board</th>
                  <th className="py-2 pr-3 font-medium whitespace-nowrap">Trade price</th>
                  <th className="py-2 font-medium">Typical use</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">6-way metal unit</td>
                  <td className="py-3 pr-3 text-yellow-400 font-semibold whitespace-nowrap">£90–£120</td>
                  <td className="py-3 text-white/80">Small flats or properties with few circuits.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">10–12-way metal unit</td>
                  <td className="py-3 pr-3 text-yellow-400 font-semibold whitespace-nowrap">£93–£130</td>
                  <td className="py-3 text-white/80">Most common size for average homes with 8–10 circuits.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">14-way high-integrity with SPD</td>
                  <td className="py-3 pr-3 text-yellow-400 font-semibold whitespace-nowrap">£630–£940</td>
                  <td className="py-3 text-white/80">Pre-populated with protective devices; larger properties.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-3 font-semibold">12-way, Type A RCBOs + SPD</td>
                  <td className="py-3 pr-3 text-yellow-400 font-semibold whitespace-nowrap">£690–£935</td>
                  <td className="py-3 text-white/80">Full individual circuit protection, premium fit-out.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white/50 text-xs mt-3">
            Indicative wholesaler prices (Crabtree, Wylex, BG Electrical, Eaton, Dorman Smith) — for
            guidance only, not a quote. Prices vary by supplier, account and date.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-4 overflow-hidden">
          <h3 className="font-bold text-white text-lg mb-4">Additional Materials</h3>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-white/60">
                  <th className="py-2 pr-3 font-medium">Component</th>
                  <th className="py-2 pr-3 font-medium whitespace-nowrap">Trade price</th>
                  <th className="py-2 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">MCB</td>
                  <td className="py-3 pr-3 text-yellow-400 font-semibold whitespace-nowrap">£10–£15 ea</td>
                  <td className="py-3 text-white/80">One per circuit on an unpopulated board.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">RCBO (Type A)</td>
                  <td className="py-3 pr-3 text-yellow-400 font-semibold whitespace-nowrap">£35–£55 ea</td>
                  <td className="py-3 text-white/80">Detects AC and pulsating DC residual currents.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">SPD</td>
                  <td className="py-3 pr-3 text-yellow-400 font-semibold whitespace-nowrap">£80–£150</td>
                  <td className="py-3 text-white/80">Including the dedicated MCB for the SPD circuit.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">AFDD (BS EN 62606)</td>
                  <td className="py-3 pr-3 text-yellow-400 font-semibold whitespace-nowrap">£40–£70 ea</td>
                  <td className="py-3 text-white/80">Required on socket circuits ≤32 A in HRRBs, HMOs, student accommodation and care homes; recommended elsewhere.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-3 font-semibold">Sundries</td>
                  <td className="py-3 pr-3 text-yellow-400 font-semibold whitespace-nowrap">£20–£50</td>
                  <td className="py-3 text-white/80">Cable tails, earth/neutral bars, labels, glands, fixings.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          For a typical 10-way board with RCBOs and SPD, total material cost to the electrician is
          approximately £350 to £550 at trade prices. Pre-populated boards from BG Electrical or
          Wylex reduce on-site assembly time but cost more upfront.
        </p>
      </>
    ),
  },
  {
    id: 'device-types',
    heading: 'MCB vs RCD vs RCBO: Which Protective Devices Drive the Cost',
    content: (
      <>
        <p>
          The single biggest factor in the price of a consumer unit — after board size — is the type
          of protective device fitted. The choice between a split-load RCD board and an all-RCBO
          board changes both the material cost and the level of protection. Here is how the three
          common devices compare.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-4 overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-white/60">
                  <th className="py-2 pr-3 font-medium">Device</th>
                  <th className="py-2 pr-3 font-medium">Protects against</th>
                  <th className="py-2 font-medium">On a fault…</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">MCB</td>
                  <td className="py-3 pr-3 text-white/80">Overload and short circuit (overcurrent) only</td>
                  <td className="py-3 text-white/80">Trips that circuit on overcurrent; no earth-leakage protection.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">RCD</td>
                  <td className="py-3 pr-3 text-white/80">Earth leakage (residual current) only</td>
                  <td className="py-3 text-white/80">Trips and disconnects every circuit on its bank — often half the house.</td>
                </tr>
                <tr className="bg-green-900/20">
                  <td className="py-3 pr-3 font-semibold">RCBO</td>
                  <td className="py-3 pr-3 text-white/80">Both overcurrent <em>and</em> earth leakage, per circuit</td>
                  <td className="py-3 text-white/80">Trips only the faulty circuit; the rest of the installation stays live.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p>
          A board fitted with individual RCBOs per circuit gives the best fault discrimination: a
          fault on one circuit leaves every other circuit running. With a traditional split-load RCD
          arrangement, a single earth fault trips the RCD and disconnects all the circuits on that
          bank. The material premium for an all-RCBO board is roughly £150 to £300 over a split-load
          RCD configuration, which is why most modern domestic replacements specify RCBOs. For more
          detail on selecting and fitting an SPD alongside these devices, see the{' '}
          <SEOInternalLink href="/guides/spd-surge-protection">
            SPD surge protection guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'labour-costs',
    heading: 'Labour and Installation Costs',
    content: (
      <>
        <p>
          Labour is typically the largest single element of a consumer unit replacement cost. The
          job involves safe isolation of the mains supply, removal of the old board, installation
          and wiring of the new board, testing every circuit, and completing the certification
          paperwork.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Standard Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              A straightforward like-for-like replacement where the existing wiring terminates
              correctly, the earthing arrangements are adequate, and no additional circuits are
              being added. Typical labour time: 4 to 6 hours. Labour cost: £250 to £450 depending on
              region and electrician rates.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Complex Replacement</h3>
            <p className="text-white text-sm leading-relaxed">
              Where additional work is needed — upgrading meter tails, replacing the earthing
              conductor, adding new circuits, relocating the board, or upgrading from TT to TN-C-S
              earthing. Typical labour time: 6 to 10 hours. Labour cost: £400 to £750. Some complex
              replacements may require a return visit.
            </p>
          </div>
        </div>
        <p>
          Electrician day rates in 2026 range from £250 to £400 depending on location. London and
          the South East sit at the higher end; the North of England and rural areas are typically
          lower. Most electricians price consumer unit replacements as a fixed-price job rather than
          a day rate, which gives the customer certainty and the electrician an incentive to work
          efficiently.
        </p>
        <p>
          In addition to the installation labour, the cost should include Part P notification
          (typically £35 to £80 through the electrician's competent person scheme) and the time to
          complete the{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'total-costs',
    heading: 'Total Cost by Consumer Unit Type',
    content: (
      <>
        <p>
          Here are realistic total costs for consumer unit replacements in 2026, covering materials,
          labour, testing, Part P notification, and the EIC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-4 overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-white/60">
                  <th className="py-2 pr-3 font-medium">Job type</th>
                  <th className="py-2 pr-3 font-medium whitespace-nowrap">Materials</th>
                  <th className="py-2 pr-3 font-medium whitespace-nowrap">Labour</th>
                  <th className="py-2 pr-3 font-medium whitespace-nowrap">Cert + notify</th>
                  <th className="py-2 font-medium whitespace-nowrap">Total</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">Basic 6-way, split-load RCDs</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£150–£250</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£250–£350</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£50–£80</td>
                  <td className="py-3 text-yellow-400 font-semibold whitespace-nowrap">£450–£650</td>
                </tr>
                <tr className="border-b border-white/10 bg-blue-900/30">
                  <td className="py-3 pr-3 font-semibold">
                    Standard 10-way, RCBOs + SPD
                    <span className="block text-xs text-blue-300 font-normal">Most common</span>
                  </td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£350–£550</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£300–£500</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£50–£80</td>
                  <td className="py-3 text-yellow-400 font-semibold whitespace-nowrap">£750–£1,200</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 pr-3 font-semibold">14–16-way high-integrity + SPD</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£650–£950</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£400–£650</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£50–£80</td>
                  <td className="py-3 text-yellow-400 font-semibold whitespace-nowrap">£1,200–£1,800</td>
                </tr>
                <tr>
                  <td className="py-3 pr-3 font-semibold">Three-phase consumer unit</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£800–£1,200</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£600–£900</td>
                  <td className="py-3 pr-3 text-white/80 whitespace-nowrap">£50–£80</td>
                  <td className="py-3 text-yellow-400 font-semibold whitespace-nowrap">£1,800–£2,500+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white/50 text-xs mt-3">
            Indicative 2026 market guidance for England and Wales — not a quote. Standard 10-way
            suits homes with 8–10 circuits; large boards suit 12+ circuits with EV charger or solar
            PV; three-phase is for properties on a three-phase supply.
          </p>
        </div>
        <SEOAppBridge
          title="Price consumer unit replacements accurately"
          description="Elec-Mate's quoting app lets you itemise every component, apply your margins, and send a professional PDF quote to the customer."
          icon={Calculator}
        />
        <p>
          These prices are for the consumer unit replacement itself. If the job involves additional
          work such as upgrading meter tails, replacing an earth rod, or adding new circuits, the
          additional work should be quoted separately.
        </p>
      </>
    ),
  },
  {
    id: 'factors',
    heading: 'Factors That Affect Consumer Unit Replacement Cost',
    content: (
      <>
        <p>
          No two consumer unit replacements are identical. Here are the main factors that push the
          cost up or down:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of circuits</strong> — more circuits mean a larger board, more
                protective devices, and more testing time. A 6-circuit flat costs significantly less
                than a 14-circuit detached house.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type of protective devices</strong> — an all-RCBO board costs £150 to £300
                more in materials than a split-load RCD arrangement, but provides superior fault
                discrimination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condition of existing wiring</strong> — if the existing circuit cables are
                too short to reach the new board, extensions or junction boxes may be needed. Cables
                terminated with ferrules and correctly labelled save time; a tangled mess of
                unlabelled cables adds hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding</strong> — if the main earth conductor, bonding
                conductors, or the earthing arrangement itself need upgrading, this is additional
                work. Upgrading from a TT earth electrode system may require a new earth rod and
                testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter tail replacement</strong> — if the existing meter tails are
                undersized, damaged, or use old ferrules, they should be replaced. Meter tails are
                not within the scope of the installation controlled by the electrician (the DNO fuse
                and meter equipment is network property), so tail replacement typically requires
                coordination with the DNO or meter operator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location</strong> — London and South East prices are 15% to 30% higher than
                the national average due to higher overheads and operating costs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-needed',
    heading: 'When Is a Consumer Unit Replacement Needed?',
    content: (
      <>
        <p>
          Not every old consumer unit needs immediate replacement, but there are clear signs that
          the board is no longer adequate:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuses</strong> — boards with rewirable fuses (BS 3036) provide no
                RCD protection and rely on correctly rated fuse wire. These boards are typically 30+
                years old and should be replaced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plastic enclosure</strong> — since January 2016, domestic consumer units
                must be metal (non-combustible). A plastic consumer unit is a fire risk if an arc
                fault or overheated connection occurs inside the enclosure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — if the board has no RCDs or RCBOs, there is no
                earth leakage protection. This is a significant electric shock and fire risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Signs of overheating</strong> — discolouration, burning smell, melted
                plastic, or warm connections indicate a potentially dangerous condition that
                requires immediate attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR recommendation</strong> — if an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> has
                identified a C2 (potentially dangerous) observation at the consumer unit,
                replacement is strongly recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient capacity</strong> — if new circuits are needed (EV charger,
                solar PV, kitchen renovation) and the board has no spare ways, a larger board is
                required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Arc fault detection (AFDD)</strong> — under Regulation 421.1.7 of BS
                7671:2018+A4:2026, AFDDs conforming to BS EN 62606 are now required on single-phase
                socket-outlet final circuits rated up to 32 A in high-rise residential buildings,
                houses in multiple occupation, purpose-built student accommodation and care homes;
                in all other premises they are recommended for those circuits. AFDDs detect the
                signature of hazardous arc faults and disconnect the affected circuit to reduce fire
                risk. Where used, they must be placed at the origin of the circuit and add
                approximately £40 to £70 per circuit at trade price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P and Building Regulations',
    content: (
      <>
        <p>
          Consumer unit replacement is classified as notifiable work under Part P of the Building
          Regulations in England and Wales. This means the work must either be carried out by an
          electrician registered with a competent person scheme (such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA), or
          the homeowner must notify Building Control before the work starts and have it inspected
          afterwards.
        </p>
        <p>
          Regulation 644.1 of BS 7671:2018+A4:2026 requires that an Electrical Installation
          Certificate (EIC) — based on the model in Appendix 6 — shall be issued upon completion of
          the verification of a new installation, or an addition or alteration to an existing
          installation, including the replacement of a distribution board or consumer unit. A Minor
          Electrical Installation Works Certificate is not an acceptable alternative for a consumer
          unit replacement: Regulation 644.4.201 only permits a Minor Works Certificate where the
          work does <em>not</em> include a new circuit or the replacement of a distribution board or
          consumer unit. The EIC documents the design, construction, inspection and testing of the
          installation and gives the homeowner proof of compliance.
        </p>
        <p>
          A registered electrician will self-certify the work and submit notification to the local
          authority through their scheme provider. The homeowner should receive a copy of the EIC
          and a Building Regulations Compliance Certificate within 30 days of the work being
          completed.
        </p>
        <p>
          In Scotland, the Building Standards system applies rather than Part P, and an approved
          certifier of construction (electrical installations) can self-certify. In Northern
          Ireland, Part P does not apply but the work must still comply with BS 7671 and be carried
          out by a competent person.
        </p>
      </>
    ),
  },
  {
    id: 'choosing-electrician',
    heading: 'Choosing an Electrician for a Consumer Unit Replacement',
    content: (
      <>
        <p>When selecting an electrician for a consumer unit replacement, check the following:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — verify they are registered
                with NICEIC, NAPIT, ELECSA, or equivalent. This is essential for Part P
                self-certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Itemised quote</strong> — the quote should break down the cost into
                materials (board, protective devices, SPD, sundries), labour, testing, Part P
                notification, and VAT. Avoid electricians who give a single figure with no
                breakdown.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC confirmation</strong> — confirm that the quote includes an Electrical
                Installation Certificate and Part P notification. Some cheaper quotes exclude these
                essential items.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — a minimum of £2 million public
                liability insurance is standard for domestic electrical contractors.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Get at least three quotes and compare them on a like-for-like basis. The cheapest quote is
          not always the best value — check what board they are specifying, whether RCBOs are
          included, and whether SPD is part of the installation.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Consumer Unit Replacements',
    content: (
      <>
        <p>
          Consumer unit replacements are bread-and-butter domestic work. They are straightforward to
          quote, predictable to install, and deliver good margins when priced correctly. Here are
          some tips for profitable CU replacement quoting:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Cost Engineer</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink> to
                  build itemised quotes with real trade pricing data. The AI cost engineer checks
                  your material costs against current wholesaler prices and flags anything that
                  looks too high or too low.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the{' '}
                  <SEOInternalLink href="/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  on site using the board scanner to auto-populate circuit details. Voice-entry for
                  test results. PDF export and email to the customer before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Take a photo of the existing board during your survey. Elec-Mate's AI board
                  scanner identifies the devices, circuit configuration, and recommends the
                  appropriate replacement board specification.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify CU replacements faster"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, cable sizing, and on-site EIC certification. Everything you need for consumer unit replacements."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ConsumerUnitReplacementCostPage() {
  return (
    <GuideTemplate
      title="Consumer Unit Replacement Cost 2026 | UK Price Guide"
      description="How much does a consumer unit replacement cost in 2026? Complete UK price guide covering material costs, labour, Part P notification, EIC certification…"
      datePublished="2026-03-27"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      answerBox={{
        question: 'How much does it cost to replace a consumer unit in the UK?',
        answer:
          'A consumer unit replacement in the UK typically costs £450 to £2,500 in 2026, including the board, protective devices, labour, Part P notification and the Electrical Installation Certificate. The most common job — a 10-way board with RCBOs and an SPD — runs £750 to £1,200. The work is notifiable under Part P and must be certified.',
        detail:
          'Final price depends on board size, RCBOs versus split-load RCDs, the condition of the existing wiring and earthing, and your region.',
      }}
      heroTitle={
        <>
          Consumer Unit Replacement Cost:{' '}
          <span className="text-yellow-400">UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="How much does a consumer unit replacement really cost? This guide breaks down material costs from UK wholesalers, labour rates, Part P notification fees, and everything that affects the final price — whether you are a homeowner getting quotes or an electrician pricing the job."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Consumer Unit Replacement Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Consumer Unit Replacements with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI board scanning. 7-day free trial, cancel anytime."
    />
  );
}
