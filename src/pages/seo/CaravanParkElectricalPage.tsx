import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Caravan,
  ShieldCheck,
  AlertTriangle,
  Zap,
  FileCheck2,
  Calculator,
  GraduationCap,
  ClipboardCheck,
  Brain,
  Search,
  Plug,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Caravan Park Electrical', href: '/guides/caravan-park-electrical' },
];

const tocItems = [
  { id: 'section-708-overview', label: 'BS 7671 Section 708 Overview' },
  { id: 'hook-up-points', label: 'Hook-Up Point Requirements' },
  { id: 'pme-restrictions', label: 'PME Restrictions and Earth Rods' },
  { id: 'distribution-design', label: 'Distribution System Design' },
  { id: 'testing-caravan-parks', label: 'Testing Caravan Park Installations' },
  { id: 'seasonal-considerations', label: 'Seasonal and Weather Considerations' },
  { id: 'common-defects', label: 'Common Defects on Caravan Parks' },
  { id: 'for-electricians', label: 'For Electricians on Caravan Park Projects' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Section 708 sets out the requirements for electrical installations in caravan and camping parks, covering hook-up points, distribution systems, and protective measures.',
  'PME (TN-C-S) earthing must not be used to supply caravan hook-up points — a TT earthing system with earth rods is required to prevent dangerous voltages reaching the caravan chassis.',
  'Each hook-up point must provide a socket-outlet to BS EN 60309-2 (blue industrial 16 A), protected by a 30 mA RCD, with the supply available at the pitch without the use of extension leads.',
  'Earth rod resistance must be tested and verified to ensure the 30 mA RCD will disconnect within the required time — typically requiring an earth electrode resistance of 1667 ohms or less.',
  'Elec-Mate allows electricians to complete EICR certificates for caravan parks on site, with support for multi-distribution-board installations and instant PDF delivery to the park operator.',
];

const faqs = [
  {
    question: 'What standard governs caravan park electrical installations?',
    answer:
      'Caravan and camping park electrical installations are governed by Section 708 of BS 7671:2018+A2:2022 (the IET Wiring Regulations, 18th Edition). This section applies to the fixed electrical installation within the caravan park — the distribution system from the main supply intake to the individual pitch hook-up points. It does not apply to the internal wiring of the caravans themselves (which is covered by BS EN 1648). Section 708 supplements the general rules of BS 7671 with specific requirements for earthing (TT system required), socket-outlets (BS EN 60309-2 blue industrial type), RCD protection (30 mA on every hook-up circuit), cable installation (underground or overhead with specific clearance heights), and distribution board design (outdoor-rated enclosures with IP ratings suitable for the environment). The section also cross-references BS 7375 (Distribution of Electricity on Construction and Building Sites), which provides additional guidance relevant to temporary or semi-permanent outdoor electrical installations. Park operators must also comply with the Caravan Sites and Control of Development Act 1960 and any conditions attached to the site licence, which often include specific requirements for electrical safety and periodic inspection.',
  },
  {
    question: 'Why is PME earthing prohibited for caravan hook-up points?',
    answer:
      'PME (Protective Multiple Earthing), also known as TN-C-S, is prohibited for caravan hook-up points because of the risk of a dangerous voltage appearing on the caravan chassis. In a PME system, the neutral and earth conductors are combined (PEN conductor) in the supply cable. If the PEN conductor breaks or becomes disconnected — an open PEN fault — the full supply voltage can appear on all metalwork connected to the PME earth, including the caravan chassis. A caravan is particularly vulnerable because it is effectively an isolated metallic structure connected to the earth only through the supply cable. A person touching the caravan chassis while standing on the ground (especially wet grass) would be exposed to a dangerous touch voltage. This risk is considered unacceptable by BS 7671, which prohibits the use of PME earthing for the supply to caravan hook-up points under Regulation 708.411.4. Instead, a TT earthing system must be used, with the earth electrode (typically one or more earth rods) installed at or near the distribution point serving the hook-up circuits. The earth rod provides a direct connection to the general mass of earth, independent of the supply neutral.',
  },
  {
    question: 'What type of socket-outlet is required at each caravan pitch?',
    answer:
      'Each caravan pitch hook-up point must be fitted with a socket-outlet conforming to BS EN 60309-2 — the blue industrial-type connector rated at 16 A, 230 V, single-phase. This is the standard "blue commando" socket that is universally used across European caravan parks. The socket-outlet must be mounted in a weatherproof enclosure (minimum IP44 when the lid is closed) at a height of between 0.5 m and 1.5 m above ground level. Each socket-outlet must be individually protected by a 30 mA RCD — either an individual RCBO or a socket on a dedicated circuit protected by a single RCD. The RCD must be of Type A (or Type F) to detect both sinusoidal and pulsating DC fault currents. Each hook-up point must be individually isolatable without affecting the supply to adjacent pitches. The socket-outlet must be located so that the caravan supply cable can reach it without the use of extension leads — the standard caravan supply cable (BS 7671 Appendix C) is 25 metres long, so the hook-up point must be within 20 metres of the nearest point of the pitch boundary to allow for routing. Multiple socket-outlets may be grouped in a single pillar or post, but each must have its own RCD protection and isolation.',
  },
  {
    question: 'How do you test earth rod resistance on a caravan park?',
    answer:
      'Earth rod (electrode) resistance is tested using a dedicated earth electrode resistance tester (such as a Megger DET4TC or similar). The standard method is the fall-of-potential (three-point) test. The test instrument is connected to the earth rod under test, and two temporary test stakes are driven into the ground at measured distances from the electrode. The test instrument passes a known current through the earth and measures the resistance. For a reliable result, the test stakes must be positioned correctly — the standard arrangement is the "62% rule," where the current stake is placed at a distance of at least 10 times the length of the electrode being tested, and the potential stake is placed at 62% of the distance between the electrode and the current stake. Multiple readings should be taken with the potential stake at different positions to verify the result is in the "resistance plateau." For caravan park hook-up circuits protected by a 30 mA RCD, the maximum earth electrode resistance can be calculated from the formula Ra x Ia is less than or equal to 50 V, where Ra is the earth electrode resistance and Ia is the RCD rated operating current. For a 30 mA RCD: Ra is less than or equal to 50/0.03 = 1667 ohms. In practice, most earth rods on caravan parks achieve a resistance well below this — typically 20 to 200 ohms depending on soil type and moisture content.',
  },
  {
    question: 'How often should a caravan park electrical installation be inspected?',
    answer:
      'The recommended maximum interval between periodic inspections for caravan and camping park electrical installations is 1 year for the hook-up points and distribution system, and 3 years for the main fixed installation (sub-stations, main distribution boards, and underground cabling). These intervals are recommended in IET Guidance Note 3 (Inspection and Testing) and reflect the harsh outdoor environment, high usage rates during the season, and the transient nature of the users (who may connect faulty equipment). Many site licence conditions also specify inspection intervals — the local authority licensing team may require annual EICR inspections as a condition of the site licence. Insurance providers often require annual electrical inspections as well. The annual inspection should include testing of all RCDs (at the board and by integral test button), visual inspection of all hook-up pillars and enclosures, earth electrode resistance testing, insulation resistance testing of distribution circuits, and verification that all labelling and safety notices are in place and legible.',
  },
  {
    question: 'Can I use standard domestic sockets for caravan hook-ups?',
    answer:
      'No. Standard 13 A domestic socket-outlets (BS 1363) must not be used for caravan hook-up points. The correct socket-outlet is the blue industrial-type conforming to BS EN 60309-2, rated at 16 A, 230 V, single-phase. There are several reasons for this requirement. The BS EN 60309-2 connector is designed for outdoor use and can achieve a high IP rating (typically IP44 or IP67) when connected. The keying arrangement prevents connection to incompatible supplies (different voltages or frequencies). The design provides a positive earth connection that is made before the live contacts engage and broken after them — ensuring the caravan chassis is always earthed when the supply is connected. The connector is mechanically robust and designed for repeated connection and disconnection. Standard 13 A domestic sockets are not weatherproof, do not provide positive earth-first connection, and are not mechanically suitable for the outdoor environment of a caravan park. Using domestic sockets for caravan hook-ups would be a breach of BS 7671 Section 708 and would likely be classified as a C2 (Potentially Dangerous) defect on an EICR.',
  },
  {
    question: 'What cable types are suitable for underground distribution on caravan parks?',
    answer:
      'The standard cable choice for underground distribution on caravan parks is steel wire armoured (SWA) cable. SWA cable provides mechanical protection from the steel wire armour layer, protection against moisture and chemical ingress, and suitability for direct burial (with appropriate bedding and cable covers). For single-phase distribution circuits, 2.5 mm² to 6 mm² SWA is typically used for individual pitch supplies, with larger sizes (10 mm² to 25 mm²) for sub-main cables between distribution points. For three-phase supplies, 4-core or 5-core SWA is used. Underground cables must be installed at a minimum depth of 500 mm below finished ground level, increasing to 1000 mm where vehicular traffic may cross the cable route. Cable covers (yellow plastic strips) and marker tape must be installed above the cable to warn of its presence during future excavation. At each end, the SWA cable must be terminated with an appropriate cable gland that maintains the IP rating of the enclosure. PVC-insulated cables without armour (such as twin-and-earth or flex) must not be used underground. Where cables are installed overhead (for example, between posts), they must be at a minimum height of 3.5 m above ground level (or 6 m above any road or track) and must be supported by a catenary wire if not self-supporting.',
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
    href: '/guides/earthing-arrangements-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'In-depth guide to TN-S, TN-C-S (PME), and TT earthing systems with practical guidance for each type.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-testing-guide',
    title: 'RCD Testing Guide',
    description:
      'Step-by-step guide to RCD testing including trip times, test currents, and recording results correctly.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/earth-loop-impedance-calculator',
    title: 'Earth Loop Impedance Calculator',
    description:
      'Calculate maximum Zs values and verify disconnection times for circuits protected by MCBs and RCDs.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/construction-site-temporary-supply',
    title: 'Construction Site Temporary Supply',
    description:
      'Guide to 110V CTE supplies, temporary distribution boards, and RCD protection on building sites.',
    icon: Plug,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training modules on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'section-708-overview',
    heading: 'BS 7671 Section 708: Caravan and Camping Parks',
    content: (
      <>
        <p>
          Section 708 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A2:2022
          </SEOInternalLink>{' '}
          applies to the fixed electrical installation within caravan and camping parks. It covers
          the distribution system from the park's main supply intake to the individual pitch hook-up
          points where touring caravans, motorhomes, and tent campers connect their equipment.
        </p>
        <p>
          The scope is specific: Section 708 covers the park's infrastructure — the underground or
          overhead cables, distribution boards, hook-up pillars, and earth electrodes. It does not
          cover the internal wiring of the caravans themselves (governed by BS EN 1648) or the
          flexible supply cables between the hook-up point and the caravan inlet (covered by BS 7671
          Appendix C). However, the park installation must be designed to safely supply any
          compliant caravan that connects to it.
        </p>
        <p>
          Caravan parks present unique electrical challenges. The users are not electrically trained
          and may connect faulty equipment. The installation is outdoors, exposed to weather, and
          subject to seasonal flooding, frost damage, and wildlife interference. The load demand
          varies dramatically between peak season and off-season. And the earthing arrangement is
          critical because caravans are isolated metallic structures that require a reliable and
          safe earth connection.
        </p>
        <p>
          For park operators, maintaining a compliant electrical installation is both a legal
          requirement (under site licensing conditions) and a duty of care to their guests. For
          electricians, caravan park work is specialist, well-paid, and repeat — annual inspections
          and regular maintenance provide a steady workload.
        </p>
      </>
    ),
  },
  {
    id: 'hook-up-points',
    heading: 'Hook-Up Point Requirements',
    content: (
      <>
        <p>
          The hook-up point is where the touring caravan or motorhome connects to the park's
          electrical supply. The requirements for each hook-up point are specific and non-negotiable
          under Section 708:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket-outlet type.</strong> Each pitch must have a BS EN 60309-2 socket-
                outlet — the blue industrial 16 A, 230 V, single-phase connector. This is the
                universal European standard for caravan park hook-ups.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection.</strong> Each socket-outlet must be protected by an
                individual 30 mA RCD. This can be an RCBO (combined MCB and RCD) or a dedicated RCD
                protecting a single circuit. The RCD must be Type A or Type F to detect pulsating DC
                fault currents from modern electronic equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Individual isolation.</strong> Each hook-up point must be individually
                isolatable — switching off one pitch must not affect adjacent pitches. This is
                essential for maintenance and emergency disconnection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mounting height.</strong> The socket-outlet must be mounted between 0.5 m
                and 1.5 m above ground level, within a weatherproof enclosure achieving a minimum of
                IP44 when the cover is closed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable reach.</strong> The hook-up point must be positioned so that the
                standard 25-metre caravan supply cable can reach from the pitch to the socket-outlet
                without extension leads. The socket should be within 20 metres of the nearest point
                of the pitch boundary.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Hook-up points are typically installed in purpose-built pillars or posts — either
          individual units or grouped pillars serving 2 to 4 pitches. The pillar must be robust
          enough to withstand accidental impact from vehicles and must be securely anchored to
          prevent displacement by wind or ground movement.
        </p>
      </>
    ),
  },
  {
    id: 'pme-restrictions',
    heading: 'PME Restrictions and Earth Rod Requirements',
    content: (
      <>
        <p>
          The earthing arrangement for caravan hook-up points is one of the most critical aspects of
          Section 708. The rules are clear and strict:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME (TN-C-S) earthing is prohibited.</strong> Regulation 708.411.4 prohibits
                the use of PME earthing for the supply to caravan hook-up points. The reason is
                simple: if the PEN conductor in the supply cable breaks (an "open PEN" fault), the
                supply voltage can appear on the caravan chassis via the PME earth connection. A
                person touching the caravan while standing on the ground could receive a lethal
                shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT earthing system required.</strong> A TT earthing system must be used,
                with one or more earth rods driven into the ground at or near the distribution point
                serving the hook-up circuits. The earth rod provides a direct connection to the
                general mass of earth, independent of the supply neutral.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth rod resistance.</strong> The earth electrode resistance (Ra) must be
                low enough to ensure the 30 mA RCD operates within the required disconnection time.
                The maximum value is calculated as: Ra = 50 V / 0.03 A = 1667 ohms. In practice,
                values of 20 to 200 ohms are typical, depending on soil conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple earth rods.</strong> Large caravan parks may require multiple earth
                rods connected in parallel to achieve a sufficiently low combined resistance,
                particularly on sandy or gravelly sites where individual rod resistance is high.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the park's incoming supply is PME (which is common in the UK), the PME earth can be
          used for the park's own fixed buildings (reception, toilet blocks, maintenance buildings)
          but must not be extended to the caravan hook-up circuits. A separate TT earth system must
          be installed for the hook-up distribution. The{' '}
          <SEOInternalLink href="/guides/earthing-arrangements-explained">
            earthing arrangement
          </SEOInternalLink>{' '}
          must be clearly documented on the EICR and the installation schematic.
        </p>
        <SEOAppBridge
          title="Document earthing arrangements accurately"
          description="Elec-Mate's EICR template includes dedicated fields for earthing type, earth electrode resistance readings, and PME/TT arrangements. Record everything on site and include it in the professional PDF certificate."
          icon={Zap}
        />
      </>
    ),
  },
  {
    id: 'distribution-design',
    heading: 'Distribution System Design for Caravan Parks',
    content: (
      <>
        <p>
          The distribution system for a caravan park must be designed to safely and reliably supply
          power to potentially hundreds of pitches, with variable and unpredictable load demand. Key
          design considerations include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum demand assessment.</strong> Each 16 A hook-up point has a maximum
                demand of 3.68 kW (16 A x 230 V). However, not all pitches will be at full load
                simultaneously. A diversity factor is applied — typically 0.3 to 0.5 for large parks
                — to calculate the actual maximum demand on the distribution system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground distribution.</strong> SWA (steel wire armoured) cable is the
                standard for underground distribution on caravan parks. Cables must be buried at a
                minimum depth of 500 mm (1000 mm under roads and tracks) with cable covers and
                marker tape above.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop.</strong> Cable runs on large caravan parks can be considerable
                — 100 m or more from the main distribution board to the furthest pitch. Voltage drop
                must be calculated for the worst-case scenario (full load on the most distant pitch)
                and must not exceed 5% of the nominal voltage (11.5 V for a 230 V supply).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-distribution boards.</strong> Larger parks use sub-distribution boards
                at strategic points, each serving a group of pitches. Each sub-distribution board
                must be housed in an IP-rated weatherproof enclosure and must be accessible for
                operation and testing.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Three-phase supplies are common on larger parks, with single-phase distribution to
          individual pitches balanced across the three phases. The phase balance should be checked
          annually and adjusted if necessary to prevent overloading of any single phase.
        </p>
      </>
    ),
  },
  {
    id: 'testing-caravan-parks',
    heading: 'Testing Caravan Park Installations',
    content: (
      <>
        <p>
          Testing a caravan park installation is a substantial undertaking. A park with 100 pitches
          may have 10 or more distribution boards, 100+ RCDs, and kilometres of underground cable.
          The testing sequence follows the standard BS 7671 pattern, with particular attention to
          the following:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode resistance.</strong> Every earth rod must be tested using
                the fall-of-potential method. Record the resistance and verify it is within limits
                for the RCD operating current. Seasonal variation in soil moisture can significantly
                affect earth rod resistance — test during dry periods for the worst-case result.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing.</strong> Every 30 mA RCD protecting a hook-up circuit must be
                tested at 1x and 5x the rated operating current. Record the trip time for each. With
                100+ RCDs to test, efficiency is critical — voice entry of test results saves
                significant time compared with writing them down and typing them up later.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance.</strong> Test each distribution circuit and each
                hook-up circuit. Disconnect all socket-outlets before testing (no caravans
                connected). Low insulation resistance readings may indicate moisture ingress in
                underground cable joints or hook-up pillar enclosures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection.</strong> Inspect every hook-up pillar for physical
                damage, water ingress, correct labelling, and the condition of the socket-outlets.
                Check all underground cable route markers are in place. Verify that all distribution
                board enclosures maintain their IP rating.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The recommended inspection interval for caravan park hook-up points and distribution
          systems is 1 year. Many site licence conditions require annual inspection, and insurance
          providers typically require an annual EICR as a condition of cover.
        </p>
      </>
    ),
  },
  {
    id: 'seasonal-considerations',
    heading: 'Seasonal and Weather Considerations',
    content: (
      <>
        <p>
          Caravan parks are outdoor installations exposed to every weather condition the UK can
          produce. The electrical installation must be designed and maintained to withstand these
          conditions year-round, even if the park is only open seasonally.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Wet and Flooding</h3>
            <p className="text-white text-sm leading-relaxed">
              Parks in low-lying areas or near rivers are vulnerable to flooding. Hook-up pillars in
              flood-risk areas should be mounted higher than the expected flood level. Underground
              cable joints must be watertight (heat-shrink or resin-filled). Distribution boards in
              areas at risk of standing water should be mounted above the expected water level and
              fitted with IP65 or IP66 enclosures. After any flooding event, the affected circuits
              must be inspected and tested before being re-energised — insulation resistance testing
              is essential to detect moisture ingress.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Winter and Frost</h3>
            <p className="text-white text-sm leading-relaxed">
              Frost can damage enclosure seals, crack plastic components, and cause ground movement
              that displaces earth rods or underground cables. Parks that remain open during winter
              (for static caravans or winter touring) must ensure that the electrical installation
              is maintained throughout the cold months. Earth electrode resistance may increase
              during prolonged dry frost as the soil moisture content drops. Regular RCD testing
              during winter is important — RCDs can become sluggish in extreme cold if moisture has
              entered the mechanism.
            </p>
          </div>
        </div>
        <p>
          Pre-season inspection — typically in March or April — is standard practice for seasonal
          parks. This inspection should cover all hook-up points, distribution boards, earth rods,
          RCDs, and cable routes. Any damage from the winter months must be repaired before the park
          opens for the season.
        </p>
      </>
    ),
  },
  {
    id: 'common-defects',
    heading: 'Common Defects Found on Caravan Parks',
    content: (
      <>
        <p>
          Caravan park electrical installations are subject to constant use, outdoor exposure, and
          occasional abuse by users. Common defects found during periodic inspections include:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>PME earth connected to hook-up circuits.</strong> The most serious defect —
                a PME earth extended to caravan hook-up points in breach of Regulation 708.411.4.
                This is a C1 (Danger Present) defect requiring immediate disconnection and
                installation of a TT earth system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damaged hook-up pillars.</strong> Broken enclosure lids, missing covers,
                cracked sockets, and exposed wiring. Vehicle impacts and weather damage are common
                causes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCDs not tested or not tripping.</strong> RCDs that fail to trip within the
                required time, or that have never been tested since installation. Annual RCD testing
                is essential.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic sockets used instead of BS EN 60309-2.</strong> Standard 13 A
                domestic sockets installed at hook-up points instead of the correct blue industrial
                16 A sockets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>High earth rod resistance.</strong> Earth rods with excessive resistance due
                to dry or sandy soil conditions, corroded connections, or rods that have been
                displaced by ground movement.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each defect should be documented with a photograph, a clear description, and the correct{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code
          </SEOInternalLink>{' '}
          (C1, C2, or C3). Park operators are generally responsive to EICR recommendations because
          their site licence depends on maintaining a safe electrical installation.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Caravan Park Work with Elec-Mate',
    content: (
      <>
        <p>
          Caravan park electrical work is specialist, seasonal, and often involves large numbers of
          circuits and distribution boards. The annual EICR for a 200-pitch park can involve testing
          200+ RCDs, checking 200+ socket-outlets, measuring multiple earth rod resistances, and
          producing a comprehensive report. Efficiency is everything.
        </p>
        <p>Elec-Mate is built for exactly this type of high-volume testing and certification:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Voice Test Entry</h4>
                <p className="text-white text-sm leading-relaxed">
                  Testing 200 RCDs? Speak the results as you go: "Pitch 47, RCD trip time 18
                  milliseconds, earth electrode resistance 85 ohms." Elec-Mate fills in the schedule
                  of test results while you work. No clipboard, no writing in the rain.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Multi-Board EICR Support</h4>
                <p className="text-white text-sm leading-relaxed">
                  Caravan parks have multiple distribution boards. Elec-Mate supports multi-board
                  EICR certificates with separate schedules for each distribution point. Add boards,
                  circuits, and test results as you work through the park.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Built-In Calculators</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use Elec-Mate's{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop calculator
                  </SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/tools/max-demand-calculator">
                    maximum demand calculator
                  </SEOInternalLink>{' '}
                  to verify distribution design and cable sizing for long cable runs across the
                  park.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Caravan park contracts are gold dust for electricians. Annual inspections, pre-season
          maintenance, new pitch installations, and emergency call-outs during peak season add up to
          a substantial and predictable income stream. The electrician who delivers a professional,
          comprehensive EICR on time — every year — keeps the contract.
        </p>
        <SEOAppBridge
          title="Streamline caravan park EICRs"
          description="Join 430+ UK electricians creating professional certificates on their phones. Voice entry, multi-board support, and instant PDF delivery to park operators. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CaravanParkElectricalPage() {
  return (
    <GuideTemplate
      title="Caravan Park Electrical | BS 7671 Section 708"
      description="Complete guide to caravan park electrical installations under BS 7671 Section 708. Hook-up point requirements, PME restrictions, earth rod testing, distribution design, and annual inspection requirements for touring and static caravan parks."
      datePublished="2025-08-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Caravan Park Guide"
      badgeIcon={Caravan}
      heroTitle={
        <>
          Caravan Park Electrical:{' '}
          <span className="text-yellow-400">BS 7671 Section 708 Explained</span>
        </>
      }
      heroSubtitle="Caravan park hook-up points must use TT earthing (never PME), BS EN 60309-2 blue industrial sockets, and individual 30 mA RCD protection on every pitch. This guide covers the complete requirements of Section 708, from distribution design to annual testing."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Caravan Park Electrical"
      relatedPages={relatedPages}
      ctaHeading="Complete Caravan Park EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians creating professional certificates with voice test entry, multi-board support, and instant PDF delivery. Built for high-volume testing. 7-day free trial, cancel anytime."
    />
  );
}
