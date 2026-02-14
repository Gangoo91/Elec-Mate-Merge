import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Cable,
  Zap,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  CircuitBoard,
  Wrench,
  FileCheck2,
  Home,
  Flame,
  Gauge,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-installation' },
  { label: 'Cooker Circuit', href: '/guides/cooker-circuit-guide' },
];

const tocItems = [
  { id: 'cooker-circuit-basics', label: 'Cooker Circuit Basics' },
  { id: 'cable-sizing', label: 'Cable Sizing for Cookers' },
  { id: 'diversity-factor', label: 'Diversity Factor Explained' },
  { id: 'cooker-control-unit', label: 'Cooker Control Unit Requirements' },
  { id: 'hob-and-oven', label: 'Hob and Oven on the Same Circuit' },
  { id: 'circuit-protection', label: 'Circuit Protection' },
  { id: 'installation-method', label: 'Installation Method and Cable Route' },
  { id: 'voltage-drop', label: 'Voltage Drop Considerations' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A cooker circuit is a dedicated radial circuit from the distribution board to the cooker control unit, typically using 6mm\u00B2 twin and earth cable protected by a 32A MCB or RCBO.',
  'Diversity can be applied to cooker circuits using the IET On-Site Guide formula: first 10A at 100% plus 30% of the remainder plus 5A if the cooker control unit includes a socket outlet.',
  'A single circuit can supply both a hob and an oven provided they are in the same room and the total load after diversity does not exceed the cable and protective device ratings.',
  'The cooker control unit must be positioned within 2 metres of the cooker and must include a double-pole switch for isolation.',
  "Elec-Mate's cable sizing calculator and diversity factor calculator handle the cooker circuit design calculations automatically, including correction factors and voltage drop verification.",
];

const faqs = [
  {
    question: 'What cable size do I need for a cooker circuit?',
    answer:
      "The standard cable size for a domestic cooker circuit is 6mm\u00B2 twin and earth (6242Y) protected by a 32A MCB. This is suitable for most domestic cookers up to approximately 13kW after diversity is applied. For larger cookers or where correction factors reduce the cable's current-carrying capacity (for example, if the cable passes through insulation), you may need to increase to 10mm\u00B2 cable with a 40A or 45A MCB. Always calculate the design current by applying diversity to the cooker rating, then select the cable using the Appendix 4 tables for the actual installation method and correction factors. Check voltage drop at the design current to ensure it does not exceed 5% of the supply voltage (11.5V for a 230V supply).",
  },
  {
    question: 'How do I calculate the diversity factor for a cooker?',
    answer:
      "The IET On-Site Guide and Table 1A of Appendix 1 provide the standard domestic cooker diversity calculation. The formula is: take the first 10A of the cooker's rated current at 100%, then add 30% of the remaining current, then add 5A if the cooker control unit includes a socket outlet. For example, a 12kW cooker draws approximately 52A at 230V. The diversity calculation is: first 10A (100%) = 10A, plus remaining 42A at 30% = 12.6A, giving a design current of 22.6A. If the cooker control unit has a socket, add 5A for a total of 27.6A. This design current (27.6A) is comfortably within the 32A rating of a standard cooker circuit on 6mm\u00B2 cable. The diversity factor is justified because a cooker rarely has all rings, oven, grill, and hotplates running simultaneously at full power.",
  },
  {
    question: 'Can a hob and oven be on the same circuit?',
    answer:
      'Yes. A built-in hob and a built-in oven can share a single cooker circuit, provided they are in the same room and the total load after applying diversity does not exceed the cable and protective device ratings. The combined rated current of both appliances is used in the diversity calculation. For example, a 7kW hob (30.4A) and a 3kW oven (13A) have a combined rating of approximately 43.4A. After diversity: first 10A at 100% = 10A, plus remaining 33.4A at 30% = 10A, giving a design current of 20A — well within a 32A circuit. Both appliances connect to the same cooker control unit, with the hob typically hardwired and the oven connected via a plug and socket or flex outlet plate behind the appliance.',
  },
  {
    question: 'Where should the cooker control unit be positioned?',
    answer:
      'The cooker control unit (also called a cooker switch or cooker isolator) must be within 2 metres of the cooker, measured horizontally, and must be readily accessible for emergency switching. BS 7671 Regulation 537.5.2.2 requires the switch to be in a location where it can be operated by a person standing near the cooker — this means it should not be behind the cooker or in a position where you would need to reach across the hob to operate it. The standard mounting height is between 450mm and 1200mm from the finished floor level (within the accessible zone). If the cooker control unit includes a 13A socket outlet, the socket must not be positioned directly above the hob where a kettle lead could trail across the cooking surface.',
  },
  {
    question: 'Do cooker circuits need RCD protection?',
    answer:
      'Under BS 7671:2018+A3:2024, a dedicated cooker circuit supplying a fixed cooker via a cooker control unit does not automatically require 30mA RCD protection in all cases. However, Regulation 411.3.4 requires RCD protection for cables concealed in walls at a depth less than 50mm that do not have earthed metallic covering or are not enclosed in earthed conduit or trunking. In practice, most domestic cooker circuit cables are concealed in walls, so 30mA RCD protection is usually required. If the cooker control unit includes a 13A socket outlet, that socket is a socket outlet rated up to 32A and requires 30mA RCD protection under Regulation 411.3.3. In a modern RCBO consumer unit, every circuit gets individual RCD protection by default, so this is not usually a separate design consideration.',
  },
  {
    question: 'What MCB type should I use for a cooker circuit?',
    answer:
      'A Type B MCB (or Type B RCBO) is the standard choice for a domestic cooker circuit. Type B MCBs trip at 3 to 5 times their rated current for magnetic (instantaneous) tripping, which is appropriate for resistive loads like cooker elements. A 32A Type B MCB will trip instantaneously at fault currents of 96A to 160A, and will disconnect within 0.4 seconds at the maximum Zs value given in Table 41.3 of BS 7671 (1.37 ohms for a 32A Type B). Type C MCBs are not required for cooker circuits because cooker elements do not have high inrush currents. Using a Type C unnecessarily would mean the prospective fault current must be higher to achieve the same disconnection time, which could be a problem on installations with higher earth fault loop impedance.',
  },
  {
    question: 'Can I use a 45A circuit for a cooker instead of 32A?',
    answer:
      "Yes, if the cooker load after diversity exceeds the 32A circuit capacity, or if correction factors reduce the cable's current-carrying capacity below 32A. A 45A cooker circuit uses 10mm\u00B2 twin and earth cable. This is more common for larger range cookers (14kW+), dual-fuel range cookers where the electric element is high-rated, or situations where the cable route passes through significant thermal insulation. A 45A circuit gives more headroom but costs more in cable and the RCBO or MCB may be more expensive. For most standard domestic cookers (up to about 13kW), a 32A circuit on 6mm\u00B2 cable is adequate after diversity is applied.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate the correct cable size for cooker circuits with diversity, correction factors, and voltage drop.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/diversity-factor-calculator',
    title: 'Diversity Factor Calculator',
    description:
      'Apply the IET On-Site Guide diversity formula to cooker circuits and other domestic loads.',
    icon: BarChart3,
    category: 'Tool',
  },
  {
    href: '/guides/radial-circuit-explained',
    title: 'Radial Circuit Explained',
    description:
      'How radial circuits work, when to use them, and cable sizing for all common domestic radial circuits.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/electric-shower-installation',
    title: 'Electric Shower Installation',
    description:
      'Cable sizing, MCB rating, and installation guide for electric shower dedicated circuits.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/voltage-drop-guide-bs7671',
    title: 'Voltage Drop Guide',
    description:
      'How to calculate and verify voltage drop for cooker circuits and other high-current radials.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/correction-factors-guide',
    title: 'Correction Factors Guide',
    description:
      'BS 7671 Appendix 4 correction factors for grouping, ambient temperature, and thermal insulation.',
    icon: Calculator,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'cooker-circuit-basics',
    heading: 'Cooker Circuit Basics',
    content: (
      <>
        <p>
          A cooker circuit is a dedicated{' '}
          <SEOInternalLink href="/guides/radial-circuit-explained">radial circuit</SEOInternalLink>{' '}
          that runs from the distribution board (consumer unit) to a cooker control unit, which in
          turn supplies the cooker. It is one of the highest-current circuits in a domestic
          installation, and getting the cable sizing and protection right is essential for safety
          and compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>.
        </p>
        <p>
          The standard domestic cooker circuit uses 6mm{'\u00B2'} twin and earth cable (6242Y)
          protected by a 32A MCB or RCBO at the distribution board. The circuit runs from the board
          to a cooker control unit (a double-pole switch, with or without a 13A socket outlet)
          mounted on the wall adjacent to the cooker. From the cooker control unit, a cable or flex
          connects to the cooker itself.
        </p>
        <p>
          Unlike socket circuits, cooker circuits benefit from a diversity factor — you do not need
          to size the cable for the full rated current of the cooker, because not all elements run
          at full power simultaneously. This diversity calculation is one of the most important
          skills in domestic circuit design.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing',
    heading: 'Cable Sizing for Cooker Circuits',
    content: (
      <>
        <p>
          The <SEOInternalLink href="/guides/cable-sizing-guide-bs7671">cable size</SEOInternalLink>{' '}
          for a cooker circuit is determined by the design current (after diversity), the
          installation method (
          <SEOInternalLink href="/guides/reference-methods-guide">reference method</SEOInternalLink>
          ), and the applicable{' '}
          <SEOInternalLink href="/guides/correction-factors-guide">
            correction factors
          </SEOInternalLink>{' '}
          from Appendix 4 of BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Typical Cooker Circuit Cable Sizes</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard domestic cooker (up to ~13kW)</strong> — 6mm{'\u00B2'} twin and
                earth, 32A MCB. Design current after diversity is typically 22A to 28A.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large range cooker (13kW to 18kW)</strong> — 10mm{'\u00B2'} twin and earth,
                40A or 45A MCB. Design current after diversity may exceed 32A for larger appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hob and oven combined</strong> — typically 6mm{'\u00B2'} on 32A MCB. The
                combined load of a separate hob and oven is usually lower than a freestanding cooker
                after diversity is applied.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always verify the cable\'s current-carrying capacity against the actual installation
          conditions. A 6mm{'\u00B2'} cable clipped direct (Reference Method C) has a higher
          current-carrying capacity than the same cable enclosed in an insulated wall (Reference
          Method A). If the cable passes through loft insulation, the thermal insulation correction
          factor (Ci) can significantly reduce the capacity — you may need to increase to 10mm
          {'\u00B2'}.
        </p>
        <SEOAppBridge
          title="Calculate cooker circuit cable size instantly"
          description="Enter the cooker rating, cable length, and installation method. Elec-Mate's cable sizing calculator applies diversity, correction factors, and checks voltage drop against BS 7671 limits automatically."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'diversity-factor',
    heading: 'Diversity Factor for Cooker Circuits Explained',
    content: (
      <>
        <p>
          Diversity is a design allowance that recognises that a cooker will not operate all its
          elements at full power simultaneously. The standard domestic cooker diversity formula from
          the IET On-Site Guide (Table 1A) is:
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Cooker Diversity Formula</h3>
          <div className="space-y-2 text-white">
            <p>
              <strong>Design current = First 10A at 100% + 30% of the remainder</strong>
            </p>
            <p>
              <strong>Add 5A if the cooker control unit includes a 13A socket outlet</strong>
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Worked Example</h3>
          <div className="space-y-3 text-white">
            <p>
              <strong>Cooker rated at 12kW (52.2A at 230V)</strong>
            </p>
            <p>
              First 10A at 100% = <strong>10.0A</strong>
            </p>
            <p>
              Remaining 42.2A at 30% = <strong>12.7A</strong>
            </p>
            <p>
              Subtotal = <strong>22.7A</strong>
            </p>
            <p>
              Add 5A for socket in cooker control unit = <strong>27.7A</strong>
            </p>
            <p className="pt-2 border-t border-white/10">
              <strong>Design current = 27.7A</strong> — well within the 32A rating of a standard 6mm
              {'\u00B2'} cooker circuit.
            </p>
          </div>
        </div>
        <p>
          This diversity calculation applies only when the cooker is the sole appliance on the
          circuit. If a hob and oven share the circuit, use the combined rated current of both
          appliances in the diversity calculation. The{' '}
          <SEOInternalLink href="/tools/diversity-factor-calculator">
            Elec-Mate diversity calculator
          </SEOInternalLink>{' '}
          handles this automatically.
        </p>
      </>
    ),
  },
  {
    id: 'cooker-control-unit',
    heading: 'Cooker Control Unit Requirements',
    content: (
      <>
        <p>
          The cooker control unit provides a means of local isolation for the cooker. BS 7671
          requires every cooker to have a means of switching off within easy reach of the person
          using the cooker (Regulation 537.5.2.2).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Position</strong> — within 2 metres horizontal distance from the cooker.
                Must be accessible without reaching over or across the cooking surface. Standard
                mounting height is between 450mm and 1200mm from finished floor level.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type</strong> — a 45A double-pole switch with a neon indicator. Available
                with or without a 13A socket outlet. If the socket is included, it must not be
                positioned directly above the hob.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rated current</strong> — the cooker control unit must be rated for the full
                load of the cooker (before diversity). A 45A-rated unit is standard for domestic
                cookers. For large range cookers, check that the control unit rating is adequate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connection</strong> — the circuit cable terminates at the cooker control
                unit. A separate cable or heat-resistant flex runs from the control unit to the
                cooker terminal block. The connection at the cooker must be accessible for
                maintenance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For built-in hobs and ovens, the cooker control unit can serve both appliances. The hob is
          typically hardwired via a cable to the control unit, while the oven may connect via a plug
          and socket or a flex outlet plate positioned behind the appliance within the cabinetry.
        </p>
      </>
    ),
  },
  {
    id: 'hob-and-oven',
    heading: 'Hob and Oven on the Same Circuit',
    content: (
      <>
        <p>
          A common question is whether a separate hob and a built-in oven can share a single cooker
          circuit. The answer is yes, provided:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Both appliances are in the same room</strong> — they must be in the kitchen
                or cooking area served by the cooker control unit. You cannot run a circuit from the
                kitchen to a separate room.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The combined load after diversity is within the circuit rating</strong> —
                calculate the combined rated current of the hob and oven, then apply the diversity
                formula. A 7kW hob (30.4A) and a 3kW oven (13A) have a combined rating of 43.4A.
                After diversity: 10A + (33.4A x 0.3) = 20A design current — easily within a 32A
                circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Both appliances connect through the cooker control unit</strong> — the hob
                is hardwired at the cooker control unit, and the oven connects via a flex outlet
                plate or plug and socket behind the appliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the combined load after diversity exceeds 32A (which is rare for a standard domestic
          hob and oven), you have two options: upgrade the circuit to 45A with 10mm{'\u00B2'} cable,
          or install separate dedicated circuits for the hob and oven. Separate circuits are also
          preferred when the hob and oven are in different locations within a large kitchen or when
          the client specifically wants independent circuits for each appliance.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-protection',
    heading: 'Circuit Protection for Cooker Circuits',
    content: (
      <>
        <p>
          The cooker circuit is protected at the distribution board by an MCB or RCBO. The
          requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB rating</strong> — 32A for a standard 6mm{'\u00B2'} circuit. 40A or 45A
                for a 10mm{'\u00B2'} circuit. The MCB rating must be equal to or greater than the
                design current and equal to or less than the cable's tabulated current-carrying
                capacity after correction factors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB type</strong> — Type B for resistive cooker loads. Type B trips at 3 to
                5 times rated current, which is suitable for heating elements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — required if the cable is concealed in a wall at
                less than 50mm depth without earthed metallic covering (Regulation 411.3.4). Also
                required if the cooker control unit includes a socket outlet (Regulation 411.3.3).
                In modern RCBO boards, this is provided automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Disconnection time</strong> — 0.4 seconds for circuits supplying socket
                outlets, 5 seconds for circuits supplying fixed equipment only. A cooker circuit
                with a cooker control unit that includes a socket must achieve 0.4 seconds. The
                maximum Zs for a 32A Type B MCB at 0.4 seconds is 1.37 ohms.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'installation-method',
    heading: 'Installation Method and Cable Route',
    content: (
      <>
        <p>
          The cable route for a cooker circuit typically runs from the{' '}
          <SEOInternalLink href="/guides/distribution-board-wiring">
            distribution board
          </SEOInternalLink>{' '}
          through the building structure to the kitchen, then to the cooker control unit position.
          The installation method determines the cable's current-carrying capacity and must be
          identified using the reference methods in Appendix 4 of BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reference Method C (clipped direct)</strong> — cable clipped to a surface or
                on cable tray. This gives the highest current-carrying capacity for a given cable
                size. 6mm{'\u00B2'} twin and earth carries 47A under this method.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reference Method A (enclosed in insulation)</strong> — cable in conduit in a
                thermally insulating wall. 6mm{'\u00B2'} carries 32A under this method. This is the
                most restrictive common installation method for domestic wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Passing through insulation</strong> — if the cable passes through loft
                insulation or cavity wall insulation, the thermal insulation correction factor (Ci)
                applies. A cable surrounded by thermal insulation on all sides has Ci = 0.5,
                reducing its capacity by half. For 6mm{'\u00B2'}, this could reduce the capacity
                below 32A, requiring an upgrade to 10mm{'\u00B2'}.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When routing the cable, observe the safe zones defined in BS 7671 for cables concealed in
          walls — within 150mm of the top of the wall, within 150mm of the corner, or running
          horizontally or vertically from an accessory. Cables outside these zones at a depth of
          less than 50mm must have 30mA RCD protection or mechanical protection (such as metal
          capping).
        </p>
      </>
    ),
  },
  {
    id: 'voltage-drop',
    heading: 'Voltage Drop on Cooker Circuits',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/voltage-drop-guide-bs7671">Voltage drop</SEOInternalLink>{' '}
          must be checked for every cooker circuit. The limit under BS 7671 is 5% of the nominal
          supply voltage — that is 11.5V for a 230V supply. The voltage drop depends on the cable
          size, the cable length, and the design current.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Voltage Drop Calculation</h3>
          <div className="space-y-3 text-white">
            <p>
              <strong>
                Voltage drop (V) = mV/A/m x Design current (A) x Cable length (m) / 1000
              </strong>
            </p>
            <p className="text-white text-sm">
              For 6mm{'\u00B2'} twin and earth, the mV/A/m value is 7.3 (from Appendix 4, Table 4D5,
              column 3).
            </p>
            <p className="pt-2 border-t border-white/10">
              <strong>Example:</strong> 6mm{'\u00B2'} cable, 15m run, 27.7A design current (after
              diversity) = 7.3 x 27.7 x 15 / 1000 = <strong>3.03V</strong> — well within the 11.5V
              limit.
            </p>
          </div>
        </div>
        <p>
          Voltage drop is rarely a problem on domestic cooker circuits because the cable run is
          usually short (under 20 metres). However, for properties where the distribution board is a
          long distance from the kitchen (large houses, barn conversions, outbuildings), voltage
          drop may dictate a larger cable size even though the current-carrying capacity of the
          smaller cable is adequate.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Cooker Circuit Mistakes',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not applying diversity.</strong> Sizing the cable for the full rated current
                of the cooker without diversity. This often leads to an unnecessarily large cable
                size and increased cost. Diversity is standard practice for domestic cooker
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker control unit too far from the cooker.</strong> The control unit must
                be within 2 metres of the cooker. Positioning it on the opposite side of the kitchen
                fails the BS 7671 requirement for accessible emergency switching.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlet above the hob.</strong> If the cooker control unit includes a
                13A socket, it must not be directly above the hob where appliance leads could trail
                across the cooking surface. Position it to one side.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring correction factors for insulated cable routes.</strong> A 6mm
                {'\u00B2'} cable passing through loft insulation may have its capacity reduced below
                32A. This makes the 32A MCB overprotective and could damage the cable in a sustained
                overload.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection where required.</strong> Cables concealed in walls at less
                than 50mm depth without earthed metallic covering require 30mA RCD protection. This
                is often missed when a cooker circuit is installed without an RCBO.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Design cooker circuits with confidence"
          description="Elec-Mate's cable sizing calculator handles diversity, correction factors, voltage drop, and Zs verification for cooker circuits. Get the cable size right first time and avoid EICR defects."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CookerCircuitGuidePage() {
  return (
    <GuideTemplate
      title="Cooker Circuit Guide | Cable Size, Fuse & Wiring UK"
      description="Complete guide to cooker circuit design and installation in the UK. Cable sizing with diversity factor, cooker control unit positioning, hob and oven on the same circuit, MCB rating, correction factors, and voltage drop calculation under BS 7671."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Flame}
      heroTitle={
        <>
          Cooker Circuit Guide:{' '}
          <span className="text-yellow-400">Cable Size, Fuse and Wiring UK</span>
        </>
      }
      heroSubtitle="The cooker circuit is one of the highest-current circuits in a domestic installation. This guide covers cable sizing with the diversity factor, cooker control unit requirements, running a hob and oven on the same circuit, circuit protection, and the common mistakes that lead to EICR defects."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Cooker Circuits"
      relatedPages={relatedPages}
      ctaHeading="Size Cooker Circuits on Your Phone"
      ctaSubheading="Elec-Mate's cable sizing calculator, diversity calculator, and voltage drop checker handle every cooker circuit calculation. Plus digital EIC and Minor Works certificates on site. 7-day free trial."
    />
  );
}
