import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  CircuitBoard,
  ToggleRight,
  Tag,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Regulation 418', href: '/guides/regulation-418-supplementary-protection' },
];

const tocItems = [
  { id: 'overview', label: 'What is Supplementary Protection?' },
  { id: 'regulation-411-3-3', label: 'Regulation 411.3.3 — Additional Protection' },
  { id: 'mandatory-circuits', label: 'Which Circuits Must Have RCD Protection?' },
  { id: 'exemptions', label: 'Exemptions (Regulation 411.3.4)' },
  { id: 'rcd-types', label: 'RCD Types: AC, A, F and B' },
  { id: 'rcbo-vs-split-load', label: 'RCBO vs Split-Load Boards' },
  { id: 'nuisance-tripping', label: 'Nuisance Tripping: Causes and Solutions' },
  { id: 'testing-rcds', label: 'Testing RCDs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Regulation 411.3.3 requires additional protection by an RCD with a rated residual operating current (I delta n) not exceeding 30mA for socket outlets with a rated current not exceeding 32A and for mobile equipment with a rated current not exceeding 32A for use outdoors.',
  'Since Amendment 3 to BS 7671, additional protection by 30mA RCD is also required for all AC final circuits supplying luminaires within domestic premises (Regulation 411.3.4).',
  'Regulation 411.3.4 provides a specific exemption: a socket outlet may be excluded from 30mA RCD protection where a documented risk assessment determines that the socket is for connection of a specific item of equipment and is suitably labelled.',
  'Type AC RCDs detect sinusoidal AC fault currents only. Type A detects AC and pulsating DC fault currents. Type F adds protection against fault currents from frequency-controlled equipment. Type B detects all fault current types including smooth DC.',
  'Nuisance tripping is the most common complaint with RCD-protected installations. The main causes are accumulated earth leakage from multiple circuits on one RCD, faulty appliances, damp or moisture in outdoor circuits, and long cable runs with high capacitive leakage.',
];

const faqs = [
  {
    question: 'What is the difference between fault protection and additional protection by RCD?',
    answer:
      'Fault protection (Regulation 411.3.2) is the primary protective measure — it disconnects the supply when an earth fault occurs, using an overcurrent device (MCB or fuse) or an RCD where Zs is too high for the overcurrent device. Additional protection (Regulation 411.3.3) is a supplementary measure — it provides a second line of defence against electric shock, particularly in situations where fault protection alone may not be sufficient (for example, if the equipment earthing is compromised, or if direct contact with live parts occurs due to insulation failure in a flexible cable). A 30mA RCD operating within 40ms provides this additional protection by detecting very small earth leakage currents that would not trip an MCB but which could be flowing through a person.',
  },
  {
    question: 'Do all socket outlets need 30mA RCD protection?',
    answer:
      'All socket outlets with a rated current not exceeding 32A require additional protection by a 30mA RCD (Regulation 411.3.3). This includes 13A ring and radial circuits, dedicated 20A radial circuits for specific appliances, and any other socket outlet rated up to 32A. The requirement applies regardless of the location — kitchen, bedroom, garage, or office. The only exemption is under Regulation 411.3.4, which allows a socket outlet to be excluded from 30mA RCD protection where it is labelled or identified for connection of a specific item of equipment, and a risk assessment determines that the exemption is appropriate. This exemption is typically applied to sockets supplying freezers, fish tanks, or IT servers where nuisance tripping would cause greater harm than the reduced shock protection.',
  },
  {
    question: 'What is the difference between an RCD and an RCBO?',
    answer:
      'An RCD (Residual Current Device) provides earth fault protection only — it detects imbalance between line and neutral currents and disconnects when the imbalance exceeds its rated sensitivity (for example, 30mA). An RCD does not provide overcurrent protection. An RCBO (Residual Current Circuit Breaker with Overcurrent protection) combines an RCD and an MCB in a single device. It provides both earth fault protection (like an RCD) and overcurrent protection (like an MCB). In a consumer unit, you can either use a split-load arrangement (one or more RCDs each protecting a group of MCBs) or a fully populated RCBO board (each circuit has its own RCBO). The RCBO approach means a fault on one circuit does not affect other circuits — only the faulty circuit trips.',
  },
  {
    question: 'When should I use a Type A RCD instead of Type AC?',
    answer:
      'Type AC RCDs detect only sinusoidal (pure AC) earth fault currents. Type A RCDs detect sinusoidal AC and pulsating DC fault currents. In modern domestic installations, many appliances contain electronic circuits that rectify the mains supply — washing machines, dishwashers, EV chargers, LED drivers, and variable-speed motors all produce pulsating DC fault currents. A Type AC RCD may not detect these faults. BS 7671 Regulation 531.3.3 requires that the type of RCD is selected according to the characteristics of the installation. For most modern domestic installations, Type A is the minimum recommendation. For circuits supplying equipment with inverters or frequency converters (such as EV chargers, heat pumps, and solar PV inverters), Type F or Type B may be required — check the equipment manufacturer instructions.',
  },
  {
    question: 'How do I stop nuisance tripping on RCD-protected circuits?',
    answer:
      'Nuisance tripping is usually caused by accumulated earth leakage from multiple circuits sharing one RCD. Every circuit has some natural earth leakage (typically 1 to 5mA per circuit from filters in electronic equipment). If ten circuits share one 30mA RCD, the total standing leakage may approach 30mA, causing random tripping. Solutions include: distributing circuits across multiple RCDs so each RCD has fewer circuits; using individual RCBOs instead of a split-load arrangement; identifying and replacing faulty appliances with high earth leakage; improving outdoor circuit weatherproofing (IP-rated enclosures, drip loops on cables); and checking for damp in junction boxes, socket outlets, and light fittings. On new installations, Regulation 314.2 requires that circuits are arranged so that a single fault does not result in loss of the entire installation.',
  },
  {
    question: 'Do lighting circuits need 30mA RCD protection?',
    answer:
      'Since Amendment 3 to BS 7671, Regulation 411.3.4 requires additional protection by a 30mA RCD for all AC final circuits supplying luminaires within domestic (household) premises. This was a significant change — previously, only socket outlets and outdoor equipment were explicitly covered. The requirement reflects the increased use of LED luminaires with electronic drivers and the risk of electric shock during lamp replacement. For non-domestic premises, lighting circuits do not automatically require 30mA RCD protection unless they fall under another applicable regulation (for example, circuits in bathrooms under Section 701, or circuits in locations containing a bath or shower).',
  },
  {
    question: 'Can I use the freezer socket exemption on any circuit?',
    answer:
      'The exemption in Regulation 411.3.4 is not limited to freezer sockets, but it is most commonly applied there. The regulation allows a socket outlet to be excluded from 30mA RCD protection where the socket is for connection of a particular item of equipment, the socket is suitably labelled or identified, and a documented risk assessment determines that the exemption is appropriate. The risk assessment must weigh the risk of nuisance tripping (and the consequence — spoiled food in a freezer, for example) against the reduced shock protection. The socket must be clearly labelled (for example, "FREEZER ONLY — NOT RCD PROTECTED") so that the exemption is not misused. This exemption should be used sparingly and only where there is a genuine and documented reason.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/regulation-411-automatic-disconnection',
    title: 'Regulation 411 — ADS Explained',
    description: 'The primary fault protection measure that RCD additional protection supplements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size circuits and verify protective device coordination for RCD/RCBO-protected circuits.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Record RCD test results and protective device details on Electrical Installation Certificates.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'Consumer unit selection and compliance including RCD/RCBO configuration requirements.',
    icon: CircuitBoard,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study RCD testing procedures, trip times, and fault diagnosis for C&G 2391.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What is Supplementary Protection by RCDs?',
    content: (
      <>
        <p>
          Supplementary protection — formally called "additional protection" in{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          — is a second layer of defence against electric shock. It does not replace fault
          protection (ADS via MCBs and earthing); it supplements it.
        </p>
        <p>
          The concept is simple: even with a correctly designed ADS system, there are scenarios
          where the primary protection may not prevent a dangerous shock. A person might touch a
          live conductor directly (bypassing the earth fault path entirely), or the equipment earth
          might be compromised. A 30mA RCD detects current flowing through an unintended path (for
          example, through a person to earth) and disconnects within milliseconds — fast enough to
          prevent a fatal shock in most circumstances.
        </p>
        <p>
          Section 418 of BS 7671 covers additional protection, but the key requirements for RCD
          additional protection are found in Regulation 411.3.3 and 411.3.4. Understanding which
          circuits require RCD protection, which RCD type to use, and how to avoid nuisance tripping
          is essential for every electrician working on new installations, additions, and
          alterations.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-411-3-3',
    heading: 'Regulation 411.3.3 — The Core Requirement',
    content: (
      <>
        <p>
          Regulation 411.3.3 is the regulation most electricians associate with RCD protection. It
          states that additional protection shall be provided for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets with a rated current not exceeding 32A</strong> — this covers
                all standard 13A socket outlets (both ring and radial circuits), 16A industrial
                sockets, and 20A dedicated sockets. The 30mA RCD must be installed regardless of the
                location or intended use of the socket.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Mobile equipment with a rated current not exceeding 32A for use outdoors
                </strong>{' '}
                — any portable or transportable equipment intended for outdoor use. This includes
                garden power tools, outdoor lighting connected via a plug and socket, and
                construction site equipment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The additional protection must be provided by an RCD with a rated residual operating
          current (I delta n) not exceeding 30mA. This is not optional — it is a mandatory
          requirement for all new installations, additions, and alterations.
        </p>
        <p>
          Amendment 3 to BS 7671 (effective January 2024) extended the requirement further.
          Regulation 411.3.4 now requires additional protection by a 30mA RCD for all AC final
          circuits supplying luminaires within domestic (household) premises. This was a major
          change that affected consumer unit design for domestic installations.
        </p>
      </>
    ),
  },
  {
    id: 'mandatory-circuits',
    heading: 'Which Circuits Must Have 30mA RCD Protection?',
    content: (
      <>
        <p>
          Combining Regulation 411.3.3, Regulation 411.3.4, and the special location requirements in
          Part 7 of BS 7671, the following circuits require 30mA RCD protection:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>All socket-outlet circuits rated up to 32A (Regulation 411.3.3)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Mobile equipment up to 32A for outdoor use (Regulation 411.3.3)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All AC final circuits supplying luminaires in domestic premises (Regulation 411.3.4,
                Amendment 3)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All circuits in bathrooms and shower rooms — zones 0, 1 and 2 (Section 701,
                Regulation 701.411.3.3)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Circuits in swimming pools and hot tubs (Section 702)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Circuits in caravans, caravan parks, and marinas (Sections 708, 709, 710)</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                All circuits in TT installations where the RCD provides fault protection (Regulation
                411.5.2)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cables concealed in walls at a depth less than 50mm (Regulation 522.6.202) — must be
                protected by a 30mA RCD or have earthed metallic covering or be enclosed in earthed
                steel conduit or trunking
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, for a new domestic installation, virtually every circuit requires 30mA RCD
          protection. The question is not "which circuits need RCDs?" but "which circuits can be
          exempted?" — and the answer is very few.
        </p>
      </>
    ),
  },
  {
    id: 'exemptions',
    heading: 'Exemptions from 30mA RCD Protection (Regulation 411.3.4)',
    content: (
      <>
        <p>
          Regulation 411.3.4 provides a narrow exemption from the 30mA RCD requirement for socket
          outlets. A socket outlet may be excluded from additional protection where:
        </p>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                The socket outlet is for connection of a{' '}
                <strong>particular item of equipment</strong> (not general use)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                The socket outlet is <strong>suitably labelled or otherwise identified</strong> to
                indicate the specific equipment it supplies
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                A <strong>documented risk assessment</strong> determines that the exclusion is
                appropriate — weighing the risk of loss of supply (nuisance tripping) against the
                reduced level of shock protection
              </span>
            </li>
          </ul>
        </div>
        <p>
          The most common application of this exemption is the "freezer socket." If a freezer is on
          a 30mA RCD-protected circuit and the RCD trips due to a fault on another circuit (or due
          to accumulated leakage), the freezer loses power and the food spoils. By placing the
          freezer socket on a non-RCD circuit (protected by an MCB only), nuisance tripping is
          eliminated.
        </p>
        <p>
          However, this exemption must be documented and justified. The risk assessment should
          consider whether the socket could realistically be used for other equipment (defeating the
          purpose), whether the freezer cable is likely to be damaged (creating a shock risk), and
          whether the consumer understands the reduced protection. The socket must be clearly
          labelled — for example, "FREEZER ONLY — NOT RCD PROTECTED."
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm">
              <strong>Important:</strong> The exemption does not apply to general-purpose socket
              outlets. You cannot omit RCD protection from a kitchen socket circuit simply because
              the customer finds tripping inconvenient. The exemption is for a specific socket
              supplying a specific item of equipment, with a documented risk assessment. Misapplying
              this exemption is a non-compliance.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-types',
    heading: 'RCD Types: AC, A, F and B',
    content: (
      <>
        <p>
          Not all earth fault currents are sinusoidal. Modern electronic equipment rectifies the
          mains supply, meaning fault currents can be pulsating DC or even smooth DC. The type of
          RCD determines which fault current waveforms it can detect:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Type AC</h3>
            <p className="text-white text-sm leading-relaxed">
              Detects sinusoidal AC fault currents only. This is the most basic type. It will not
              reliably detect pulsating DC or smooth DC fault currents. Type AC is now considered
              insufficient for most modern installations because of the prevalence of electronic
              equipment that produces non-sinusoidal fault currents. Identified by the symbol ~.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Type A</h3>
            <p className="text-white text-sm leading-relaxed">
              Detects sinusoidal AC and pulsating DC fault currents (with or without a 6mA smooth DC
              component). Type A is the minimum recommended for most modern domestic installations.
              Suitable for circuits supplying washing machines, dishwashers, LED lighting with
              electronic drivers, and most consumer electronics. Identified by the symbol ~ with a
              pulsating waveform.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Type F</h3>
            <p className="text-white text-sm leading-relaxed">
              Detects all Type A fault currents plus composite fault currents from single-phase
              frequency-controlled equipment (variable speed drives). Required where the connected
              equipment uses a variable-frequency motor controller — for example, some heat pump
              systems and certain washing machine models with inverter motors. Check the equipment
              manufacturer instructions for the RCD type requirement.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Type B</h3>
            <p className="text-white text-sm leading-relaxed">
              Detects all Type A and Type F fault currents plus smooth DC fault currents. Required
              for three-phase rectifier circuits, some{' '}
              <SEOInternalLink href="/guides/ev-charger-installation">EV chargers</SEOInternalLink>{' '}
              (those with three-phase or DC charging), and some inverter-driven equipment. Type B
              RCDs are significantly more expensive than Type A. Always check the EV charger or
              equipment manufacturer instructions for the required RCD type.
            </p>
          </div>
        </div>
        <p>
          Regulation 531.3.3 requires that the type of RCD is selected in accordance with the
          characteristics of the installation and the type of fault currents likely to occur. In
          practice, for a standard domestic installation, Type A RCDs or RCBOs are the minimum
          recommendation. For specific equipment (EV chargers, heat pumps, solar PV inverters),
          check the manufacturer instructions — they will specify the required RCD type.
        </p>
      </>
    ),
  },
  {
    id: 'rcbo-vs-split-load',
    heading: 'RCBO Boards vs Split-Load Consumer Units',
    content: (
      <>
        <p>
          There are two main approaches to providing RCD protection in a consumer unit: split-load
          (dual RCD) and fully populated RCBO boards. Each has advantages and trade-offs.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <ToggleRight className="w-5 h-5 text-blue-400" />
              Split-Load (Dual RCD)
            </h3>
            <div className="text-white text-sm leading-relaxed space-y-2">
              <p>
                Two (or more) RCDs, each protecting a group of MCBs. Circuits are distributed across
                the RCDs so that a trip on one side does not affect circuits on the other side.
              </p>
              <p>
                <strong>Advantages:</strong> Lower cost. Simpler to specify and install. Easier to
                source components.
              </p>
              <p>
                <strong>Disadvantages:</strong> A fault on one circuit trips the RCD, disconnecting
                all circuits on that side. If circuits are poorly distributed, a single trip can
                take out lighting and power together. Higher accumulated earth leakage per RCD
                increases nuisance tripping risk.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <CircuitBoard className="w-5 h-5 text-green-400" />
              Full RCBO Board
            </h3>
            <div className="text-white text-sm leading-relaxed space-y-2">
              <p>
                Every circuit has its own RCBO, providing individual overcurrent and earth fault
                protection. A fault on one circuit affects only that circuit.
              </p>
              <p>
                <strong>Advantages:</strong> Maximum discrimination — only the faulty circuit trips.
                Lower nuisance tripping (each RCBO sees only its own circuit leakage). Easier to
                identify which circuit has a fault. Better compliance with Regulation 314.2
                (avoiding danger from loss of supply).
              </p>
              <p>
                <strong>Disadvantages:</strong> Higher cost (RCBOs cost more than MCBs). Must ensure
                RCBO type is matched to the load (Type A, F, or B as required). Some consumer units
                have limited RCBO compatibility.
              </p>
            </div>
          </div>
        </div>
        <p>
          For new domestic installations, the trend is strongly towards RCBO boards. The higher
          initial cost is offset by better discrimination, fewer nuisance trips, and easier fault
          diagnosis. For additions and alterations to existing split-load boards, individual RCBOs
          can be fitted for new circuits without replacing the entire board.
        </p>
        <SEOAppBridge
          title="Design consumer unit layouts with AI"
          description="Elec-Mate's AI circuit designer helps you allocate circuits, select RCD/RCBO configurations, and produce professional schedules of circuits. Get the board design right before you start the installation."
          icon={CircuitBoard}
        />
      </>
    ),
  },
  {
    id: 'nuisance-tripping',
    heading: 'Nuisance Tripping: Causes and Solutions',
    content: (
      <>
        <p>
          Nuisance tripping — where an RCD trips without an actual fault — is the most common
          complaint from customers and the most common reason electricians are called back to
          RCD-protected installations. Understanding the causes is essential for both installation
          design and fault diagnosis.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accumulated earth leakage</strong> — every electrical appliance and cable
                has some natural earth leakage current (typically 0.5 to 5mA per appliance). If many
                circuits share one RCD, the total standing leakage can approach the 30mA trip
                threshold. A transient event (appliance switching on, a surge) pushes the total over
                30mA and the RCD trips. Solution: reduce the number of circuits per RCD, or use
                individual RCBOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faulty appliances</strong> — a single appliance with degraded insulation can
                leak enough current to trip the RCD. This is particularly common with old washing
                machines, dishwashers, and immersion heaters. Solution: disconnect appliances one at
                a time to identify the culprit, or measure individual appliance earth leakage with a
                leakage clamp meter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damp and moisture</strong> — water ingress into outdoor sockets, light
                fittings, junction boxes, or buried cables causes earth leakage. Particularly common
                in autumn and winter when condensation and rain increase. Solution: check IP ratings
                of outdoor accessories, ensure drip loops on cable entries, replace damaged gaskets
                and seals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Long cable runs</strong> — very long cables (particularly in agricultural or
                rural installations) have higher capacitive leakage to earth. This is a distributed
                leakage across the entire cable length. Solution: split the load across multiple
                RCDs, or use 100mA time-delayed RCDs for distribution circuits (where 30mA is not
                required for additional protection).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surge events</strong> — lightning strikes or switching surges on the supply
                network can cause brief earth leakage spikes that trip RCDs. Solution: install surge
                protection devices (
                <SEOInternalLink href="/guides/chapter-44-overvoltage-protection">
                  SPDs
                </SEOInternalLink>
                ) to clamp transient voltages, or use RCDs with enhanced surge immunity (marked with
                the surge immunity symbol).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'testing-rcds',
    heading: 'Testing RCDs on Site',
    content: (
      <>
        <p>
          RCD testing is required during both initial verification (Regulation 643.8) and periodic
          inspection. The tests confirm that the RCD operates at the correct current and within the
          required time.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-3">RCD Test Sequence (for a 30mA RCD)</h4>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>50% rated current (15mA)</strong> — the RCD must NOT trip. This confirms the
                RCD does not have an excessively low trip threshold (which would cause nuisance
                tripping). Apply for approximately 2 seconds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>100% rated current (30mA)</strong> — the RCD must trip within 300ms (for a
                general-purpose RCD without intentional time delay). Record the actual trip time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>5x rated current (150mA)</strong> — the RCD must trip within 40ms. This
                confirms the RCD provides additional protection against electric shock. The 40ms
                trip time at 150mA is the critical test — it confirms the RCD will disconnect fast
                enough to prevent fibrillation at higher fault currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test button</strong> — press the integral test button on the RCD. It must
                trip. This is a functional test only (it does not confirm the trip current or time)
                but verifies the mechanical mechanism operates.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For time-delayed (Type S) RCDs, the tests are the same but the maximum trip times are
          longer — 200ms to 500ms at rated current, depending on the delay setting. Time-delayed
          RCDs are used for discrimination between upstream and downstream devices.
        </p>
        <SEOAppBridge
          title="Record RCD test results digitally"
          description="Elec-Mate auto-populates RCD test fields on your EIC and EICR certificates. Enter trip times on site and get instant pass/fail validation against BS 7671 requirements."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Regulation418SupplementaryProtectionPage() {
  return (
    <GuideTemplate
      title="Regulation 418 | Supplementary Protection by RCDs"
      description="Complete guide to supplementary protection by RCDs in BS 7671. Regulation 411.3.3 additional protection, mandatory RCD circuits, exemptions, Type AC/A/F/B RCDs, RCBO vs split-load boards, and nuisance tripping solutions."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation Deep-Dive"
      badgeIcon={BookOpen}
      heroTitle={
        <>
          Regulation 418: <span className="text-yellow-400">Supplementary Protection by RCDs</span>
        </>
      }
      heroSubtitle="Additional protection by 30mA RCD is mandatory for most circuits in modern installations. This guide covers which circuits need RCDs, the exemptions, RCD types AC/A/F/B, RCBO vs split-load boards, nuisance tripping causes and solutions, and RCD testing procedures."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About RCD Additional Protection"
      relatedPages={relatedPages}
      ctaHeading="Record RCD Tests and Issue Certificates on Site"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for RCD test recording, automatic validation, and on-site EIC/EICR certificates. 7-day free trial, cancel anytime."
    />
  );
}
