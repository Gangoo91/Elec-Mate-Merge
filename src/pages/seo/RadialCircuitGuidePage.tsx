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
  GraduationCap,
  Home,
  ArrowLeftRight,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-installation' },
  { label: 'Radial Circuit', href: '/guides/radial-circuit-explained' },
];

const tocItems = [
  { id: 'what-is-radial', label: 'What Is a Radial Circuit?' },
  { id: 'how-radials-work', label: 'How Radial Circuits Work' },
  { id: 'when-to-use-radial', label: 'When to Use a Radial Circuit' },
  { id: 'radial-vs-ring', label: 'Radial vs Ring Final Circuit' },
  { id: 'cable-sizing', label: 'Cable Sizing for Radials' },
  { id: 'circuit-protection', label: 'Circuit Protection Requirements' },
  { id: 'common-applications', label: 'Common Radial Applications' },
  { id: 'testing-radial', label: 'Testing a Radial Circuit' },
  { id: 'common-mistakes', label: 'Common Mistakes to Avoid' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A radial circuit runs from the distribution board to each outlet in sequence, terminating at the last point — unlike a ring circuit which loops back to the board.',
  'Radial circuits are the preferred choice for dedicated appliance circuits (cookers, showers, immersion heaters) and lighting circuits throughout the UK.',
  'BS 7671 permits a 20A radial on 2.5mm\u00B2 cable serving up to 50m\u00B2 floor area, or a 32A radial on 4mm\u00B2 cable serving up to 75m\u00B2 floor area for socket outlets.',
  'Correct cable sizing depends on the protective device rating, installation method, grouping, ambient temperature, and thermal insulation — use the correction factors from Appendix 4 of BS 7671.',
  "Elec-Mate's cable sizing calculator applies all BS 7671 correction factors automatically and checks voltage drop against the 5% limit for radial circuits.",
];

const faqs = [
  {
    question: 'What is the maximum floor area for a 20A radial circuit?',
    answer:
      'Under BS 7671, a 20A radial circuit using 2.5mm\u00B2 cable can serve a floor area of up to 50m\u00B2 for general-purpose socket outlets. This makes it suitable for smaller rooms such as bedrooms, home offices, and utility rooms. If the floor area exceeds 50m\u00B2, you should either use a 32A radial on 4mm\u00B2 cable (which serves up to 75m\u00B2) or install a ring final circuit. The floor area limits are guidance figures from the IET On-Site Guide and Guidance Note 1 — they are not absolute regulation limits, but they represent accepted good practice and are the figures most competent person scheme assessors will expect you to follow.',
  },
  {
    question: 'Can I use a radial circuit instead of a ring circuit for sockets?',
    answer:
      'Yes. BS 7671 does not mandate ring final circuits for socket outlets. A radial circuit is a perfectly acceptable alternative, provided the cable size and protective device rating are appropriate for the load and floor area being served. In fact, many electricians and designers now prefer radial circuits because they are simpler to install, easier to test, and avoid the common faults associated with ring circuits (such as broken rings or cross-connections). A 32A radial on 4mm\u00B2 cable protected by a 32A MCB or RCBO can serve a floor area of up to 75m\u00B2 — comparable to a ring circuit. The key advantage of a ring circuit is that it provides two paths for current, which can allow smaller cable to carry a higher load. But modern consumer units with RCBOs make radial circuits a straightforward and reliable choice.',
  },
  {
    question: 'What cable size do I need for a radial circuit?',
    answer:
      'The cable size depends on the protective device rating, the installation method (reference method), and the applicable correction factors. For a 20A radial, 2.5mm\u00B2 twin and earth (6242Y) is standard when installed using Reference Method C (clipped direct) or Reference Method A (enclosed in conduit in a thermally insulating wall). For a 32A radial, 4mm\u00B2 twin and earth is the minimum. However, you must apply correction factors for grouping (Ca), ambient temperature (Ca), and thermal insulation (Ci) as set out in Appendix 4 of BS 7671. If the cable passes through insulation, you may need to increase the cable size. You must also check that the voltage drop does not exceed 5% of the nominal supply voltage (i.e., 11.5V for a 230V supply) under the design current.',
  },
  {
    question: 'Do radial circuits need RCD protection?',
    answer:
      'Under BS 7671:2018+A3:2024, socket outlet circuits rated up to 32A in domestic premises require 30mA RCD protection (Regulation 411.3.3). This applies to radial circuits serving socket outlets just as it does to ring circuits. Lighting circuits in domestic premises also require 30mA RCD protection where the circuit serves a zone where the risk of electric shock is increased (such as bathrooms) or where the cables are concealed in walls at a depth less than 50mm and do not have earthed metallic covering. In practice, most modern domestic installations provide 30mA RCD protection on all circuits using either a split-load consumer unit with RCDs or an RCBO board.',
  },
  {
    question: 'How do I test a radial circuit?',
    answer:
      'Testing a radial circuit follows the standard sequence set out in BS 7671 Chapter 64 and GN3 (Guidance Note 3: Inspection and Testing). The key tests are: continuity of protective conductors (R1+R2 method), insulation resistance (minimum 1M\u03A9 at 500V DC for a 230V circuit), polarity verification at every point, earth fault loop impedance (Zs) at the furthest point (which must not exceed the maximum Zs value for the protective device from Table 41.3 or 41.4 of BS 7671), and prospective fault current at the origin. For a radial circuit, the R1+R2 continuity test is simpler than for a ring circuit because there is only one path — you do not need to perform the ring circuit continuity test (the three-step method). The measured Zs at the furthest point must be checked against the tabulated maximum values to ensure disconnection within the required time (0.4 seconds for socket outlets, 5 seconds for fixed equipment circuits).',
  },
  {
    question: 'Is a spur allowed on a radial circuit?',
    answer:
      'Yes, spurs are permitted from radial circuits, subject to the same rules that apply to spurs from ring circuits. A fused spur (via a fused connection unit) can supply any load up to the rating of the fuse in the FCU. An unfused spur from a radial circuit is also permitted but should supply no more than one single or one twin socket outlet, or one item of fixed equipment. The total load on the radial circuit, including all spurs, must not exceed the rating of the protective device. In practice, spurs from radial circuits are common for supplying fixed appliances such as extractor fans, waste disposal units, or additional socket outlets in locations where extending the main radial cable would be impractical.',
  },
  {
    question: 'What is the advantage of radial circuits over ring circuits?',
    answer:
      'Radial circuits offer several practical advantages. They are simpler to design, install, and test. There is no risk of a broken ring going undetected (a common fault in ring circuits where one leg of the ring becomes disconnected, causing the remaining conductor to carry the full load). Testing is faster because the three-step ring circuit continuity test is not required. Fault finding is more straightforward because the circuit follows a single path. Modern RCBO boards provide individual circuit protection, which removes the main historical advantage of ring circuits (sharing current between two conductors). Many European countries have used radial circuits exclusively for decades without ring circuits. The trend in UK domestic installations is increasingly towards radial circuits, particularly in new-build properties.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate the correct cable size for any radial circuit with automatic BS 7671 correction factors and voltage drop check.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop for radial circuits against the 5% BS 7671 limit with cable length and load inputs.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/spur-socket-regulations',
    title: 'Spur Socket Regulations',
    description:
      'Fused and unfused spur rules for ring and radial circuits with connection methods and cable sizing.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/cooker-circuit-guide',
    title: 'Cooker Circuit Guide',
    description:
      'Cable sizing, diversity factor, and circuit protection for dedicated cooker radial circuits.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/cable-sizing-guide-bs7671',
    title: 'Cable Sizing Guide BS 7671',
    description:
      'Complete guide to cable selection using Appendix 4 tables, correction factors, and reference methods.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/distribution-board-wiring',
    title: 'Distribution Board Wiring',
    description:
      'Consumer unit layout, circuit arrangement, and split load vs RCBO board configurations.',
    icon: CircuitBoard,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-radial',
    heading: 'What Is a Radial Circuit?',
    content: (
      <>
        <p>
          A radial circuit is an electrical circuit that starts at the distribution board (consumer
          unit) and runs to each outlet or load point in sequence, terminating at the last point on
          the circuit. Current flows in one direction only — from the supply to the load and back
          through the neutral and protective conductors. This is the simplest and most common
          circuit configuration used in electrical installations worldwide.
        </p>
        <p>
          In the UK, radial circuits are used for lighting circuits, dedicated appliance circuits
          (cookers, showers, immersion heaters, electric vehicle chargers), and increasingly for
          general-purpose socket outlet circuits as an alternative to the traditional ring final
          circuit. The circuit is protected at the distribution board by a circuit breaker (MCB or
          RCBO) rated to match the cable current-carrying capacity.
        </p>
        <p>
          The term "radial" distinguishes this configuration from a{' '}
          <SEOInternalLink href="/guides/ring-circuit-calculator">
            ring final circuit
          </SEOInternalLink>
          , where the cable forms a loop starting and finishing at the same terminals in the
          distribution board. Both configurations are permitted under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>, and
          the choice between them depends on the load, floor area, cable routing, and design
          preference.
        </p>
      </>
    ),
  },
  {
    id: 'how-radials-work',
    heading: 'How Radial Circuits Work',
    content: (
      <>
        <p>
          In a radial circuit, the line conductor, neutral conductor, and circuit protective
          conductor (CPC) all run from the distribution board to the first outlet, then continue to
          the second outlet, and so on to the last outlet on the circuit. The circuit ends at the
          last point — there is no return path back to the board.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single path for current</strong> — all current flows through the same
                conductors from the distribution board to the load. The conductor nearest the board
                carries the total circuit current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Progressive voltage drop</strong> — voltage drop increases with distance
                from the board. The furthest outlet sees the highest voltage drop, which must be
                checked against the{' '}
                <SEOInternalLink href="/guides/voltage-drop-guide-bs7671">
                  BS 7671 voltage drop limits
                </SEOInternalLink>{' '}
                (5% for lighting, 5% for other circuits in domestic installations).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sized for full load</strong> — the cable must be rated to carry the
                full design current of the circuit because there is only one current path, unlike a
                ring circuit where current is shared between two legs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This single-path design makes radial circuits straightforward to install and test. There
          are no cross-connections to worry about, no ring continuity tests to perform, and fault
          finding follows the cable from one end to the other. For electricians, this simplicity
          translates directly into faster installation and testing times.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-use-radial',
    heading: 'When to Use a Radial Circuit',
    content: (
      <>
        <p>
          Radial circuits are the correct choice in several common scenarios. Understanding when to
          specify a radial rather than a ring circuit is a fundamental design skill.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated appliance circuits</strong> — cookers, electric showers, immersion
                heaters, electric vehicle chargers, and any other high-current fixed appliance
                should always be on a dedicated radial circuit with cable and protection sized for
                the specific load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits</strong> — all lighting circuits in the UK are radial
                circuits. A typical domestic lighting circuit uses 1.0mm{'\u00B2'} or 1.5mm
                {'\u00B2'} cable protected by a 6A or 10A MCB.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small floor areas</strong> — for rooms or areas up to 50m{'\u00B2'}, a 20A
                radial on 2.5mm{'\u00B2'} cable is simpler and more cost-effective than a ring
                circuit. For areas up to 75m{'\u00B2'}, a 32A radial on 4mm{'\u00B2'} cable is the
                equivalent alternative.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extensions and additions</strong> — when adding circuits to an existing
                installation, a radial circuit is often the simplest option because it only requires
                a single cable run from the distribution board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial and industrial installations</strong> — radial circuits are the
                standard configuration for commercial socket outlets, typically using 20A or 32A
                circuits on appropriately sized cable.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Size radial circuit cables in seconds"
          description="Elec-Mate's cable sizing calculator applies all BS 7671 correction factors for your radial circuit automatically. Enter the load, cable length, installation method, and get the correct cable size with voltage drop confirmation."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'radial-vs-ring',
    heading: 'Radial vs Ring Final Circuit: A Direct Comparison',
    content: (
      <>
        <p>
          The debate between radial and ring final circuits has been ongoing in the UK electrical
          industry for years. Here is a factual comparison to help you make the right design choice.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Radial Circuit</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Single cable path from board to last outlet</li>
              <li>Cable must carry full circuit current</li>
              <li>
                20A on 2.5mm{'\u00B2'} serves up to 50m{'\u00B2'}
              </li>
              <li>
                32A on 4mm{'\u00B2'} serves up to 75m{'\u00B2'}
              </li>
              <li>Simple to install, test, and fault-find</li>
              <li>No risk of broken ring faults</li>
              <li>Standard in commercial and European installations</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Ring Final Circuit</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Cable loops from board back to board</li>
              <li>Current shared between two legs of the ring</li>
              <li>
                32A on 2.5mm{'\u00B2'} serves up to 100m{'\u00B2'}
              </li>
              <li>Smaller cable for higher load rating</li>
              <li>Three-step ring continuity test required</li>
              <li>Risk of broken ring or cross-connection faults</li>
              <li>Unique to UK and Ireland</li>
            </ul>
          </div>
        </div>
        <p>
          The historical advantage of ring circuits was that they allowed 2.5mm{'\u00B2'} cable to
          be used on a 32A circuit — saving on copper cost when it was expensive. With modern cable
          prices and the widespread adoption of RCBO boards, the cost difference is minimal. Many
          designers and electricians now prefer radial circuits for their simplicity, reliability,
          and ease of testing.
        </p>
        <p>
          Neither configuration is inherently safer than the other when correctly installed and
          tested. The risk with ring circuits is that faults (such as a broken ring) can go
          undetected and cause overloading. Radial circuits do not have this failure mode because
          there is only one current path to monitor.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing',
    heading: 'Cable Sizing for Radial Circuits',
    content: (
      <>
        <p>
          Correct{' '}
          <SEOInternalLink href="/guides/cable-sizing-guide-bs7671">cable sizing</SEOInternalLink>{' '}
          is critical for radial circuits. The cable must be able to carry the design current
          continuously without exceeding its rated temperature, and the{' '}
          <SEOInternalLink href="/guides/voltage-drop-guide-bs7671">voltage drop</SEOInternalLink>{' '}
          at the furthest point must not exceed the BS 7671 limit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Standard Radial Circuit Cable Sizes</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6A lighting circuit</strong> — 1.0mm{'\u00B2'} twin and earth (6242Y).
                Suitable for most domestic lighting circuits with LED loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>16A immersion heater</strong> — 2.5mm{'\u00B2'} twin and earth. Dedicated
                radial to a 3kW immersion heater via a double-pole switch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>20A radial sockets</strong> — 2.5mm{'\u00B2'} twin and earth.
                General-purpose socket outlets serving up to 50m{'\u00B2'} floor area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>32A radial sockets</strong> — 4mm{'\u00B2'} twin and earth. General-purpose
                socket outlets serving up to 75m{'\u00B2'} floor area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>32A cooker circuit</strong> — 6mm{'\u00B2'} twin and earth. Dedicated radial
                to a cooker control unit with diversity applied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>40A or 45A shower circuit</strong> — 10mm{'\u00B2'} twin and earth for
                showers above 9.5kW. Cable size depends on the kW rating of the shower.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These are starting points for standard installation conditions. You must always apply the{' '}
          <SEOInternalLink href="/guides/correction-factors-guide">
            correction factors
          </SEOInternalLink>{' '}
          from Appendix 4 of BS 7671 for the actual installation conditions — grouping with other
          cables, ambient temperature, and thermal insulation. If any correction factor reduces the
          current-carrying capacity below the protective device rating, you must increase the cable
          size.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-protection',
    heading: 'Circuit Protection Requirements for Radial Circuits',
    content: (
      <>
        <p>
          Every radial circuit must be protected by an overcurrent protective device at the
          distribution board. The device must disconnect the circuit within the required time in the
          event of a fault. The key requirements under BS 7671 are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overload protection (Regulation 433)</strong> — the rated current of the
                protective device (In) must be greater than or equal to the design current (Ib) and
                less than or equal to the current-carrying capacity of the cable (Iz). The
                conventional operating current (I2) must not exceed 1.45 times Iz.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault current protection (Regulation 434)</strong> — the protective device
                must disconnect the circuit within 5 seconds for a circuit supplying fixed
                equipment, or 0.4 seconds for a circuit supplying socket outlets or portable
                equipment (Table 41.1). The earth fault loop impedance (Zs) at the furthest point
                must not exceed the maximum value for the device type and rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 411.3.3)</strong> — socket outlet circuits rated
                up to 32A in domestic premises require 30mA RCD protection. This is achieved using
                either an RCD upstream of the MCB or an RCBO combining both functions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/spd-surge-protection">
                    Surge protection (SPD)
                  </SEOInternalLink>
                </strong>{' '}
                — BS 7671:2018+A3:2024 requires a risk assessment for surge protection on all new
                installations and alterations. Where the consequence of an overvoltage would be
                serious, a Type 2 SPD must be installed at the origin.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The most common protective devices for domestic radial circuits are Type B MCBs (for
          resistive loads such as sockets and lighting) and Type C MCBs (for circuits with higher
          inrush currents such as motors or large transformers). RCBOs combine overcurrent and RCD
          protection in a single device and are the standard choice in modern RCBO consumer units.
        </p>
      </>
    ),
  },
  {
    id: 'common-applications',
    heading: 'Common Radial Circuit Applications in Domestic Installations',
    content: (
      <>
        <p>In a typical UK domestic installation, the following circuits are always radial:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Lighting Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  1.0mm{'\u00B2'} or 1.5mm{'\u00B2'} cable, 6A MCB. Each lighting circuit typically
                  serves one floor of a house. LED loads have reduced the current demand
                  significantly, but the cable size remains the same for voltage drop and fault
                  current disconnection times.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  <SEOInternalLink href="/guides/cooker-circuit-guide">
                    Cooker Circuits
                  </SEOInternalLink>
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  6mm{'\u00B2'} cable, 32A MCB. Dedicated radial to a cooker control unit. Diversity
                  factor applies: first 10A at 100% plus 30% of the remainder, plus 5A if the
                  control unit has a socket outlet.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  <SEOInternalLink href="/guides/electric-shower-installation">
                    Electric Shower Circuits
                  </SEOInternalLink>
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  6mm{'\u00B2'} to 16mm{'\u00B2'} cable depending on kW rating. Dedicated radial
                  with a pull-cord switch or ceiling-mounted double-pole isolator. 32A to 50A MCB
                  depending on shower rating.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Immersion Heater Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  2.5mm{'\u00B2'} cable, 16A MCB. Dedicated radial to a double-pole switch adjacent
                  to the hot water cylinder. A 3kW immersion heater draws approximately 13A at 230V.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/ai-circuit-designer">AI circuit designer</SEOInternalLink>{' '}
          can generate a complete circuit schedule for a domestic installation, specifying radial or
          ring circuits for each area based on the load, floor area, and your design preferences.
        </p>
      </>
    ),
  },
  {
    id: 'testing-radial',
    heading: 'Testing a Radial Circuit',
    content: (
      <>
        <p>
          Testing a radial circuit is simpler than testing a ring circuit because there is only one
          current path. The tests follow the sequence set out in Chapter 64 of BS 7671 and GN3:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Continuity of protective conductors.</strong> Using the R1+R2 method, measure
              the resistance of the line conductor and CPC from the distribution board to the
              furthest point. This confirms the circuit is continuous and gives the R1+R2 value
              needed for the Zs calculation.
            </li>
            <li>
              <strong>
                <SEOInternalLink href="/guides/insulation-resistance-test">
                  Insulation resistance.
                </SEOInternalLink>
              </strong>{' '}
              Test between line and neutral, line and earth, and neutral and earth at 500V DC. The
              minimum acceptable value is 1M{'\u03A9'} for a 230V circuit, but readings above 2M
              {'\u03A9'} are expected for a healthy installation.
            </li>
            <li>
              <strong>Polarity.</strong> Verify correct polarity at every outlet, switch, and
              connection point. The line conductor must be connected to the switch contact and the
              correct terminal at socket outlets.
            </li>
            <li>
              <strong>Earth fault loop impedance (Zs).</strong> Measure at the furthest point on the
              circuit. The measured value must not exceed the maximum Zs for the protective device
              type and rating (Table 41.3 or 41.4 of BS 7671). Apply the 0.8 correction factor if
              comparing with tabulated values at a higher conductor temperature.
            </li>
            <li>
              <strong>
                <SEOInternalLink href="/guides/rcd-testing-guide">RCD operation.</SEOInternalLink>
              </strong>{' '}
              If the circuit is RCD-protected, test the trip time at rated residual operating
              current (30mA for domestic circuits). The RCD must trip within 300ms at 1x and within
              40ms at 5x.
            </li>
          </ol>
        </div>
        <p>
          Record all test results on the schedule of test results, which forms part of the{' '}
          <SEOInternalLink href="/guides/electrical-certificate-types-uk">
            electrical certificate
          </SEOInternalLink>{' '}
          (EIC for new circuits, EICR for existing circuits, or Minor Works Certificate for small
          additions).
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes to Avoid with Radial Circuits',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Undersized cable for the installation method.</strong> A cable clipped
                direct to a joist has a different current-carrying capacity to the same cable
                enclosed in insulation. Always check the correct{' '}
                <SEOInternalLink href="/guides/reference-methods-guide">
                  reference method
                </SEOInternalLink>{' '}
                and apply the corresponding correction factors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring voltage drop on long runs.</strong> A 32A radial on 4mm{'\u00B2'}
                cable over 30 metres may exceed the 5% voltage drop limit under full load. Always
                calculate voltage drop for the actual cable length and design current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloading a 20A radial.</strong> A 20A radial on 2.5mm{'\u00B2'} cable is
                not suitable for heavy loads. If the area has multiple high-power appliances
                (kettles, heaters, tumble dryers), consider a 32A radial or a ring circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing RCD protection on socket circuits.</strong> All socket outlet
                circuits rated up to 32A in domestic premises must have 30mA RCD protection. This
                applies to radial circuits as well as ring circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not checking Zs at the furthest point.</strong> The earth fault loop
                impedance at the last outlet on a long radial can be significantly higher than at
                the distribution board. If Zs exceeds the maximum for the protective device, the
                circuit will not disconnect within the required time in the event of a fault.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Check voltage drop and Zs before you install"
          description="Elec-Mate's voltage drop calculator and cable sizing tool check your radial circuit design against BS 7671 limits before you run a single metre of cable. Avoid costly rework by getting it right at the design stage."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RadialCircuitGuidePage() {
  return (
    <GuideTemplate
      title="Radial Circuit Explained | When to Use Radial vs Ring"
      description="Complete guide to radial circuits in UK electrical installations. How radials work, when to use them instead of ring circuits, cable sizing, circuit protection, BS 7671 requirements, and common applications for domestic and commercial installations."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Cable}
      heroTitle={
        <>
          Radial Circuit Explained:{' '}
          <span className="text-yellow-400">When to Use Radial vs Ring</span>
        </>
      }
      heroSubtitle="Radial circuits are the simplest, most reliable circuit configuration in electrical installations. This guide covers how they work, when to choose a radial over a ring circuit, cable sizing from BS 7671, circuit protection requirements, and testing procedures for UK electricians."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Radial Circuits"
      relatedPages={relatedPages}
      ctaHeading="Design Radial Circuits Faster with Elec-Mate"
      ctaSubheading="Cable sizing calculator, voltage drop checker, AI circuit designer, and digital certificates — all on your phone. Join 430+ UK electricians using Elec-Mate on site. 7-day free trial."
    />
  );
}
