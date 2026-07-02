import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import MaximumDemandCalculator from '@/components/apprentice/calculators/MaximumDemandCalculator';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Zap,
  Shield,
  Cable,
  Gauge,
  Activity,
  CheckCircle2,
  Timer,
  Flame,
  ShowerHead,
  BarChart3,
} from 'lucide-react';

export default function CookerCircuitCalculatorPage() {
  return (
    <ToolTemplate
      title="Cooker Circuit Calculator: Diversity + Cable Size (UK)"
      description="Free cooker circuit calculator applying the standard UK diversity allowance. Work out cooker current, cable size and MCB rating to BS 7671 in seconds."
      datePublished="2026-07-02"
      dateModified="2026-07-02"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Cooker Circuit Calculator', href: '/tools/cooker-circuit-calculator' },
      ]}
      tocItems={[
        { id: 'cooker-circuits', label: 'Cooker Circuits Explained' },
        { id: 'cooker-diversity', label: 'The Cooker Diversity Rule' },
        { id: 'worked-example', label: 'Worked Example: 14.4kW Cooker' },
        { id: 'cable-and-mcb', label: 'Cable Size and MCB Rating' },
        { id: 'cooker-control', label: 'Cooker Switches and Sockets' },
        { id: 'hobs-and-ovens', label: 'Induction Hobs and Built-In Ovens' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Kitchen Circuit Design"
      badgeIcon={Flame}
      heroTitle={
        <>
          <span className="text-yellow-400">Cooker Circuit Calculator</span> — Diversity, Cable
          Size, and MCB Rating for Cooking Appliances
        </>
      }
      calculator={<MaximumDemandCalculator />}
      heroSubtitle="Enter the cooker rating and the calculator applies the standard household cooking-appliance diversity allowance — first 10A in full, 30% of the remainder, plus 5A if the control unit has a socket — then shows the assessed current for sizing the circuit. Add the rest of the installation's loads to see the whole-board picture."
      heroFeaturePills={[
        { icon: Flame, label: 'Cooker Diversity' },
        { icon: Cable, label: 'Cable Sizing' },
        { icon: Shield, label: 'MCB Selection' },
        { icon: BarChart3, label: 'Whole-Board Demand' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'A cooker\'s full-load current overstates what the circuit really carries — thermostats cycle and rings are rarely all on at once, which is why a diversity allowance applies to household cooking appliances.',
        'The standard diversity allowance is: the first 10A of the cooker\'s rated current in full, plus 30% of the remainder, plus 5A if the cooker control unit incorporates a socket outlet.',
        'A 14.4kW freestanding cooker has a full-load current of 62.6A, but assesses to just 30.8A after diversity — which is why a 32A circuit in 6mm² cable is the typical answer for most domestic cookers.',
        'The diversity allowance applies to household cookers — commercial catering equipment is assessed differently and usually with little or no diversity.',
        'Very large range cookers can exceed a 32A circuit even after diversity — always run the numbers rather than assuming, which is exactly what the calculator is for.',
      ]}
      sections={[
        {
          id: 'cooker-circuits',
          heading: 'Cooker Circuits Explained',
          content: (
            <>
              <p>
                A freestanding electric cooker or a hob-and-oven combination is normally fed by a
                dedicated radial circuit from the consumer unit to a cooker control unit or
                connection unit, then on to the appliance. On paper the loads look enormous — a
                large range cooker can total 14kW or more, a nominal 60A+ at 230V — yet cooker
                circuits have run happily on 30A and 32A protective devices for decades.
              </p>
              <p>
                The reason is how cooking appliances actually behave. Every ring, oven, and grill
                is thermostatically controlled: elements heat up at full power, then cycle on and
                off to hold temperature. And it is rare for every element to be on together even at
                the peak of cooking a family meal. The sustained current the circuit really sees is
                far below the appliance's rated maximum.
              </p>
              <p>
                Circuit design recognises this with a diversity allowance for household cooking
                appliances — a standard method for converting the rated current into a realistic
                assessed current for sizing the circuit. The calculator above applies it
                automatically when you add a cooker as a load.
              </p>
            </>
          ),
        },
        {
          id: 'cooker-diversity',
          heading: 'The Cooker Diversity Rule: 10A + 30% + 5A',
          content: (
            <>
              <p>
                The standard diversity allowance used for household cooking appliances works like
                this:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-3 text-white text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">The first 10A</strong> of the appliance's
                      rated current is taken in full
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Plus 30%</strong> of the remainder of the
                      rated current
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Plus 5A</strong> if the cooker control
                      unit incorporates a socket outlet
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Two important boundaries. First, this is a household allowance — commercial
                kitchens and catering equipment are assessed on their actual duty, usually with
                little or no diversity. Second, the allowance is for cooking appliances fed from
                the circuit: where a hob and oven share one cooker circuit, the diversity applies
                to their combined rated current.
              </p>
              <p>
                Diversity for the cooker is one part of assessing the whole installation — the
                same exercise covers sockets, water heating, and showers (which get{' '}
                <em>no</em> diversity). The{' '}
                <SEOInternalLink href="/tools/diversity-factor-calculator">
                  diversity factor calculator
                </SEOInternalLink>{' '}
                and{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand calculator
                </SEOInternalLink>{' '}
                handle the full picture.
              </p>
            </>
          ),
          appBridge: {
            title: 'Apply Cooker Diversity Automatically',
            description:
              'Add the cooker rating, tick whether the control unit has a socket, and the calculator applies the standard allowance and shows the assessed current.',
            icon: Flame,
          },
        },
        {
          id: 'worked-example',
          heading: 'Worked Example: 14.4kW Freestanding Cooker',
          content: (
            <>
              <p>
                A customer's new range cooker is rated 14.4kW, and the cooker control unit has a
                socket outlet. Here is the full assessment:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ol className="space-y-3 text-white text-sm list-decimal pl-5">
                  <li>
                    <strong className="text-yellow-400">Full-load current:</strong> I = P / V =
                    14400 / 230 = <strong>62.6A</strong>
                  </li>
                  <li>
                    <strong className="text-yellow-400">First 10A in full:</strong> 10A
                  </li>
                  <li>
                    <strong className="text-yellow-400">30% of the remainder:</strong> 0.30 x (62.6
                    − 10) = 0.30 x 52.6 = <strong>15.8A</strong>
                  </li>
                  <li>
                    <strong className="text-yellow-400">Socket on the control unit:</strong> +5A
                  </li>
                  <li>
                    <strong className="text-yellow-400">Assessed current:</strong> 10 + 15.8 + 5 ={' '}
                    <strong>30.8A</strong>
                  </li>
                </ol>
              </div>
              <p>
                So a cooker with a nominal current of 62.6A assesses to 30.8A — and a 32A device
                with cable sized accordingly is the typical result. That is the whole story of why
                most domestic cookers, even large ones, sit on 32A circuits.
              </p>
              <p>
                The same cooker without a socket on the control unit assesses to 25.8A, and a
                smaller 10kW cooker (43.5A full load) with a socket assesses to 10 + 0.30 x 33.5 +
                5 = 25.1A. Run your own appliance through the calculator above.
              </p>
            </>
          ),
        },
        {
          id: 'cable-and-mcb',
          heading: 'Cable Size and MCB Rating for Cooker Circuits',
          content: (
            <>
              <p>
                Once the assessed current is known, the circuit is designed like any other radial:
                the protective device is rated at or above the assessed current, and the cable
                carries at least the device rating after correction factors.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-2 text-white text-sm">
                  <li>
                    <strong className="text-yellow-400">Assessed up to 32A</strong> (most domestic
                    cookers): 32A MCB or RCBO with 6mm² twin and earth as the typical choice —
                    confirm against the tabulated capacity for the installation method
                  </li>
                  <li>
                    <strong className="text-yellow-400">Assessed 32-40A</strong> (large range
                    cookers, or hob + oven combinations on one circuit): 40A device with 10mm²
                    cable as the typical pairing
                  </li>
                  <li>
                    <strong className="text-yellow-400">Long kitchen runs:</strong> check voltage
                    drop against the 5% limit with the{' '}
                    <SEOInternalLink href="/tools/voltage-drop-calculator">
                      voltage drop calculator
                    </SEOInternalLink>{' '}
                    — rarely the governing factor on domestic cooker runs, but cheap to verify
                  </li>
                </ul>
              </div>
              <p>
                Derating is the usual trap in kitchens: cooker cables routed behind ovens, through
                insulated walls, or bunched with other circuits lose capacity. The{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                applies the correction factors so the 6mm²-or-10mm² decision is based on the actual
                route.
              </p>
            </>
          ),
        },
        {
          id: 'cooker-control',
          heading: 'Cooker Switches, Control Units, and That +5A Socket',
          content: (
            <>
              <p>Practical points on the control end of the circuit:</p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>A means of isolation</strong> — accepted practice is a double-pole cooker
                  switch or control unit within easy reach of the appliance but not directly above
                  a hob, so it can be operated in an emergency without reaching over hot pans.
                </li>
                <li>
                  <strong>The socket on the control unit</strong> — older cooker control units
                  often include a 13A socket. If it is there, the diversity assessment adds 5A for
                  it. Modern installations frequently use a plain double-pole switch instead, with
                  kitchen sockets on their own circuits.
                </li>
                <li>
                  <strong>RCD protection</strong> — BS 7671 requires 30mA RCD additional protection
                  for socket outlets rated up to 32A, which covers a control unit incorporating a
                  socket. In a modern consumer unit the cooker circuit will typically be on an RCBO
                  in any case.
                </li>
                <li>
                  <strong>Connection to the appliance</strong> — freestanding cookers connect via a
                  cooker outlet plate with enough slack to pull the appliance out for cleaning;
                  built-in ovens and hobs follow the manufacturer's connection instructions.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'hobs-and-ovens',
          heading: 'Induction Hobs, Built-In Ovens, and Shared Circuits',
          content: (
            <>
              <p>
                Modern kitchens split cooking across separate appliances, which raises the "one
                circuit or two?" question:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>Induction hobs</strong> — ratings of 7.4kW are common. Many models
                  offer power management that caps total draw, but the circuit should be designed
                  for the appliance's connected rating unless it is configured and documented
                  otherwise. Follow the manufacturer's instructions on the required supply.
                </li>
                <li>
                  <strong>Single built-in ovens</strong> — many are under 3kW and designed for
                  connection to a 13A supply; check the manufacturer's instructions. Larger
                  double ovens need their own dedicated circuit.
                </li>
                <li>
                  <strong>Hob and oven on one cooker circuit</strong> — a long-standing accepted
                  approach where both are within the same kitchen: the diversity allowance is
                  applied to the combined rated current, and each appliance connects via a suitable
                  outlet from the shared circuit. Run the combined figure through the calculator.
                </li>
                <li>
                  <strong>Separate circuits</strong> — the cleaner modern choice where board space
                  allows: hob on one circuit sized for its rating with diversity, oven on another.
                </li>
              </ul>
              <p>
                Whichever arrangement you choose, the assessed demand feeds into the installation's
                overall maximum demand — check the whole board with the{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand calculator
                </SEOInternalLink>{' '}
                before adding other large loads like a{' '}
                <SEOInternalLink href="/tools/shower-cable-size-calculator">
                  shower
                </SEOInternalLink>{' '}
                or an{' '}
                <SEOInternalLink href="/tools/ev-charger-cable-size-calculator">
                  EV charger
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Find the appliance rating',
          text: 'Check the rating plate or specification for the cooker (or the combined hob + oven rating if they share a circuit). Convert to current: I = P / 230.',
        },
        {
          name: 'Apply the diversity allowance',
          text: 'Take the first 10A in full, add 30% of the remainder, and add 5A if the cooker control unit incorporates a socket outlet. The calculator does this automatically.',
        },
        {
          name: 'Select the protective device',
          text: 'Choose an MCB or RCBO rated at or above the assessed current — 32A covers most domestic cookers; large ranges may need 40A.',
        },
        {
          name: 'Size the cable',
          text: 'The cable must carry at least the device rating after correction factors for the route — 6mm² is typical for 32A, 10mm² for 40A. Confirm with the cable sizing calculator.',
        },
        {
          name: 'Check the whole board',
          text: 'Add the cooker\'s assessed demand to the installation\'s maximum demand to confirm the main switch and supply can take it alongside showers, EV chargers, and other large loads.',
        },
      ]}
      howToHeading="How to Size a Cooker Circuit"
      howToDescription="Five steps from appliance rating plate to a verified circuit design."
      features={[
        {
          icon: Flame,
          title: 'Cooker Diversity Built In',
          description:
            'The standard household cooking-appliance allowance — first 10A, 30% of the remainder, +5A for a control-unit socket — applied automatically.',
        },
        {
          icon: BarChart3,
          title: 'Whole-Installation Demand',
          description:
            'Add sockets, water heating, showers, and heating to see the full maximum demand alongside the cooker.',
        },
        {
          icon: Shield,
          title: 'Device Recommendations',
          description:
            'Suggests the protective device rating for the assessed current, with RCD guidance for control units with sockets.',
        },
        {
          icon: Cable,
          title: 'Cable Sizing Workflow',
          description:
            'Carry the assessed current into the cable sizing calculator for correction factors and voltage drop on the actual route.',
        },
        {
          icon: Gauge,
          title: 'Voltage Drop Checks',
          description:
            'Verify long kitchen runs against the 5% BS 7671 limit with the voltage drop tool in the same app.',
        },
        {
          icon: Calculator,
          title: '70+ Calculators in One App',
          description:
            'Diversity, maximum demand, cable sizing, and earth fault loop impedance — the whole design chain.',
        },
      ]}
      featuresHeading="Cooker Circuit Calculator Features"
      featuresSubheading="From rating plate to assessed current to circuit spec — without guessing."
      faqs={[
        {
          question: 'What size cable do I need for an electric cooker?',
          answer:
            'For most domestic cookers the answer is 6mm² twin and earth on a 32A circuit — because after the standard diversity allowance (first 10A in full, plus 30% of the remainder, plus 5A for a control-unit socket), even a 14.4kW cooker assesses to about 30.8A. Very large range cookers or shared hob-and-oven circuits can assess above 32A, needing a 40A device and typically 10mm² cable. Always confirm the cable against the tabulated capacity for the installation method — routes through insulation lose capacity fast.',
        },
        {
          question: 'How does cooker diversity work?',
          answer:
            'The standard diversity allowance used for household cooking appliances takes the first 10A of the appliance\'s rated current in full, adds 30% of the remainder, and adds 5A if the cooker control unit incorporates a socket outlet. For example, a 10kW cooker has a full-load current of 43.5A (10000 / 230); with a socketed control unit it assesses to 10 + 0.30 x 33.5 + 5 = 25.1A. The allowance reflects how thermostatic cycling and normal cooking behaviour keep the real sustained current far below the rated maximum. It applies to household cookers, not commercial catering equipment.',
        },
        {
          question: 'Can a 14.4kW range cooker really run on a 32A circuit?',
          answer:
            'Usually, yes. A 14.4kW cooker has a nominal full-load current of 62.6A, but the standard diversity allowance assesses it at 10 + 0.30 x 52.6 + 5 = 30.8A (with a socketed control unit) — inside a 32A device. The physics behind the allowance is thermostatic cycling: elements only draw full power while heating up. That said, always check the manufacturer\'s installation instructions, and if a particular appliance specifies a larger supply, follow it.',
        },
        {
          question: 'Do a hob and oven need separate circuits?',
          answer:
            'Not necessarily. A hob and oven in the same kitchen can share one suitably sized cooker circuit — the diversity allowance is applied to their combined rated current, and each connects via an appropriate outlet. Separate circuits are the cleaner modern approach where board space allows, and some appliances\' instructions require a dedicated supply. Note that many single built-in ovens under 3kW are designed for a 13A connection and do not need a cooker circuit at all — check the manufacturer\'s instructions.',
        },
        {
          question: 'Does a cooker circuit need RCD protection?',
          answer:
            'If the cooker control unit incorporates a socket outlet, 30mA RCD additional protection is required — BS 7671 requires it for socket outlets rated up to 32A (Regulation 411.3.3). Beyond that, cooker circuits wired in cables concealed in walls at depths that trigger the general RCD requirements will need it too, and in practice a modern consumer unit puts the cooker on a 30mA RCBO as standard.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/max-demand-calculator',
          title: 'Maximum Demand Calculator',
          description:
            'The full installation demand assessment — cooker diversity plus every other load.',
          icon: BarChart3,
          category: 'Calculators',
        },
        {
          href: '/tools/diversity-factor-calculator',
          title: 'Diversity Factor Calculator',
          description: 'Apply diversity across multiple loads and circuit types.',
          icon: Calculator,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'Size the cooker cable with correction factors for the actual installation route.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/tools/shower-cable-size-calculator',
          title: 'Shower Cable Size Calculator',
          description:
            'The other big kitchen-adjacent load — showers get no diversity at all.',
          icon: ShowerHead,
          category: 'Calculators',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description: 'Check kitchen circuit runs against the BS 7671 voltage drop limits.',
          icon: Gauge,
          category: 'Calculators',
        },
        {
          href: '/tools/disconnection-time-calculator',
          title: 'Disconnection Time Calculator',
          description: 'Verify earth fault loop impedance and disconnection times for the circuit.',
          icon: Timer,
          category: 'Calculators',
        },
      ]}
      ctaHeading="Size cooker circuits with confidence"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for diversity, cable sizing, and certification. 7-day free trial, cancel anytime."
      toolPath="/tools/cooker-circuit-calculator"
    />
  );
}
