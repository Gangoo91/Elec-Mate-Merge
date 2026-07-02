import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import CableSizingCalculator from '@/components/apprentice/calculators/CableSizingCalculator';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Car,
  Zap,
  Shield,
  Cable,
  Gauge,
  Activity,
  CheckCircle2,
  Timer,
  Warehouse,
  BarChart3,
} from 'lucide-react';

export default function EVChargerCableSizeCalculatorPage() {
  return (
    <ToolTemplate
      title="EV Charger Cable Size Calculator: 7.4kW + 22kW Circuits"
      description="Free EV charger cable sizing calculator. Size the circuit for 7.4kW single-phase and 22kW three-phase chargers with voltage drop checks to BS 7671."
      datePublished="2026-07-02"
      dateModified="2026-07-02"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        {
          label: 'EV Charger Cable Size Calculator',
          href: '/tools/ev-charger-cable-size-calculator',
        },
      ]}
      tocItems={[
        { id: 'cable-sizing-vs-load', label: 'Cable Sizing vs Load Assessment' },
        { id: 'single-phase-74kw', label: '7.4kW Single-Phase Circuits' },
        { id: 'three-phase-22kw', label: '22kW Three-Phase Circuits' },
        { id: 'worked-example', label: 'Worked Example: Voltage Drop' },
        { id: 'protection', label: 'RCD and Circuit Protection' },
        { id: 'cable-routes', label: 'Cable Routes and SWA Runs' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="EV Circuit Design"
      badgeIcon={Car}
      heroTitle={
        <>
          <span className="text-yellow-400">EV Charger Cable Size Calculator</span> — Size the
          Circuit for 7.4kW and 22kW Chargers
        </>
      }
      calculator={<CableSizingCalculator />}
      heroSubtitle="Enter the charger current, run length, and installation method. The calculator sizes the cable for the sustained EV charging load, applies correction factors, and checks voltage drop to BS 7671. An EV charger runs at full current for hours — this page is about getting the cable right."
      heroFeaturePills={[
        { icon: Car, label: '7.4kW & 22kW Chargers' },
        { icon: Cable, label: 'Cable Sizing' },
        { icon: Gauge, label: 'Voltage Drop Check' },
        { icon: Shield, label: 'Type A RCD Guidance' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'A 7.4kW single-phase EV charger draws 32.2A at 230V (7400 / 230) and is installed as a dedicated 32A circuit — the cable must carry 32A continuously after all correction factors.',
        'A 22kW three-phase charger draws 31.8A per phase at 400V (22000 / (1.732 x 400)), so each phase conductor is sized for a 32A circuit — typically 4-core SWA for external runs.',
        '6mm² is the typical starting point for a 32A EV charger circuit, moving to 10mm² on longer runs where voltage drop or derating bites — confirm against the tabulated capacity for your installation method.',
        'EV charging is a continuous load with no diversity on a single charger: size the cable for the full circuit rating, and keep voltage drop within the 5% BS 7671 limit.',
        'This tool sizes the cable. For checking whether the property supply can support a charger at all, use the Elec-Mate EV charger load calculator alongside it.',
      ]}
      sections={[
        {
          id: 'cable-sizing-vs-load',
          heading: 'Cable Sizing vs Load Assessment: Two Different Jobs',
          content: (
            <>
              <p>
                Designing an EV charger installation involves two separate calculations, and it
                pays to keep them distinct:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-3 text-white text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Load assessment</strong> — can the
                      property's supply take the charger on top of the existing maximum demand? Is
                      load management needed? That is covered by the{' '}
                      <SEOInternalLink href="/tools/ev-charger-load-calculator">
                        EV charger load calculator
                      </SEOInternalLink>
                      .
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cable sizing</strong> — once the charger
                      is viable, what cable does the dedicated circuit need for the run length and
                      installation method? That is this page.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                The cable sizing question matters more for EV chargers than for most loads because
                the load profile is unusual: near-constant full current for 4-8 hours at a time.
                There is no diversity to apply on a single charger — the cable must be sized for
                the full circuit rating, with correction factors for how and where it is installed,
                and the voltage drop checked over what is often a long run to a driveway or
                detached garage.
              </p>
            </>
          ),
        },
        {
          id: 'single-phase-74kw',
          heading: '7.4kW Single-Phase Charger Circuits (32A)',
          content: (
            <>
              <p>
                The standard UK domestic EV charger is a 7.4kW single-phase unit. The design
                current is 7400 / 230 = <strong>32.2A</strong>, and the charger is built for a 32A
                dedicated circuit protected by a 32A device.
              </p>
              <p>Typical cable choices for a 32A EV circuit:</p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>6mm² twin and earth</strong> — the typical choice for shorter internal
                  runs in favourable installation methods. Check the derated capacity if the route
                  passes through insulation or is grouped with other cables.
                </li>
                <li>
                  <strong>10mm² twin and earth</strong> — the usual step-up for longer runs where
                  voltage drop approaches the limit, or where derating pulls 6mm² below 32A.
                </li>
                <li>
                  <strong>6mm² or 10mm² SWA</strong> — for external, buried, or surface-run
                  sections to a detached garage or driveway pillar. See the{' '}
                  <SEOInternalLink href="/tools/swa-cable-size-calculator">
                    SWA cable size calculator
                  </SEOInternalLink>{' '}
                  for armoured runs.
                </li>
              </ul>
              <p>
                Because the charger draws its full current for hours, treat marginal cases
                conservatively — a cable running at its exact tabulated capacity for a full
                overnight charge, every night, has no margin. The calculator above shows the
                derated capacity next to the design current so you can see the headroom.
              </p>
            </>
          ),
          appBridge: {
            title: 'Size an EV Circuit in Seconds',
            description:
              'Enter 32A (or the charger kW), the run length, and the installation method. The calculator recommends the cable size and verifies voltage drop.',
            icon: Car,
          },
        },
        {
          id: 'three-phase-22kw',
          heading: '22kW Three-Phase Charger Circuits',
          content: (
            <>
              <p>
                Where a three-phase supply is available — commercial premises, workplaces, and a
                minority of homes — a 22kW charger triples the charging speed. The per-phase
                current is:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <p className="text-white text-sm font-mono">
                  I = P / (√3 x V<sub>L</sub>) = 22000 / (1.732 x 400) = <strong>31.8A</strong> per
                  phase
                </p>
              </div>
              <p>
                So a 22kW charger is, from a cable perspective, a 32A three-phase circuit —
                typically wired in 4-core SWA (three phases plus neutral, with the armour as the
                protective conductor where it qualifies) for the external run, protected by a 32A
                three-pole device.
              </p>
              <p>
                Three-phase voltage drop uses the tabulated three-phase mV/A/m values against the
                400V line voltage, which the calculator handles when you select a three-phase
                circuit. Note that many EVs can only accept single-phase AC charging even when
                connected to a three-phase unit — that affects the customer conversation, not the
                cable sizing, which is always done for the full charger rating. The{' '}
                <SEOInternalLink href="/tools/three-phase-power-calculator">
                  three-phase power calculator
                </SEOInternalLink>{' '}
                covers the power and current relationships in more detail.
              </p>
            </>
          ),
        },
        {
          id: 'worked-example',
          heading: 'Worked Example: 7.4kW Charger, 25m Run',
          content: (
            <>
              <p>
                A 7.4kW charger is to be installed on a garage wall, 25 metres of cable from the
                consumer unit, run clipped and then through the garage in 6mm² twin and earth:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ol className="space-y-3 text-white text-sm list-decimal pl-5">
                  <li>
                    <strong className="text-yellow-400">Design current:</strong> 7400 / 230 ={' '}
                    <strong>32.2A</strong> → 32A circuit
                  </li>
                  <li>
                    <strong className="text-yellow-400">Cable capacity:</strong> 6mm² twin and
                    earth carries comfortably above 32A in favourable methods — confirm the derated
                    figure for the actual route in the calculator
                  </li>
                  <li>
                    <strong className="text-yellow-400">Voltage drop:</strong> using the published
                    figure of approximately 7.3 mV/A/m for 6mm² copper: 32A x 25m x 7.3 mV/A/m =
                    5,840mV = <strong>5.84V</strong>. As a percentage: 5.84 / 230 ={' '}
                    <strong>2.5%</strong> — within the 5% limit
                  </li>
                  <li>
                    <strong className="text-yellow-400">Same cable at 40m:</strong> 32 x 40 x 7.3 =
                    9,344mV = <strong>9.34V = 4.1%</strong> — still passing, but close enough to
                    the limit that 10mm² (approximately 4.4 mV/A/m, giving 5.63V = 2.4% at 40m) is
                    the safer specification, especially allowing for future supply voltage
                    variation
                  </li>
                </ol>
              </div>
              <p>
                The pattern to remember: on a 32A EV circuit, 6mm² starts to run out of voltage
                drop headroom at around 40-45 metres, and derating can rule it out much earlier.
                The calculator does both checks together for your exact conditions.
              </p>
            </>
          ),
        },
        {
          id: 'protection',
          heading: 'RCD and Circuit Protection for EV Chargers',
          content: (
            <>
              <p>
                EV charging circuits have specific protection requirements under BS 7671 Section
                722 (electric vehicle charging installations), and the practical points for the
                circuit design are:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>30mA RCD protection</strong> — the charging point requires RCD
                  protection, and because EV charging equipment can produce DC fault currents, a
                  Type A RCD (or better) is the standard specification rather than Type AC. Many
                  chargers include built-in 6mA DC fault detection which pairs with a Type A RCD.
                </li>
                <li>
                  <strong>Dedicated circuit</strong> — one circuit per charging point, protected by
                  a 32A device for a 7.4kW unit.
                </li>
                <li>
                  <strong>Earthing arrangement</strong> — on a PME (TN-C-S) supply, additional
                  measures are required for EV charging, such as a charger with PEN fault
                  detection or a local earth electrode. This is covered in depth on the{' '}
                  <SEOInternalLink href="/tools/ev-charger-load-calculator">
                    EV charger load calculator
                  </SEOInternalLink>{' '}
                  page.
                </li>
                <li>
                  <strong>Disconnection times</strong> — verify the earth fault loop impedance at
                  the charging point with the{' '}
                  <SEOInternalLink href="/tools/disconnection-time-calculator">
                    disconnection time calculator
                  </SEOInternalLink>
                  , particularly on long runs where Zs accumulates.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'cable-routes',
          heading: 'Cable Routes: Internal, External, and Buried Runs',
          content: (
            <>
              <p>
                Most EV charger installations involve a mixed route — twin and earth inside the
                house, then an external section to the charger position. Common approaches:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>Surface-run SWA on external walls</strong> — robust and straightforward;
                  clip at appropriate intervals and gland properly at both ends.
                </li>
                <li>
                  <strong>Buried SWA to a detached garage or driveway pillar</strong> — BS 7671
                  requires a buried cable to incorporate an earthed armour or metal sheath (or be
                  in a duct providing equivalent protection), to be marked by cable covers or
                  marker tape, and to be buried deep enough to avoid foreseeable disturbance.
                  Accepted practice is around 450-600mm depth depending on ground use.
                </li>
                <li>
                  <strong>Ducted runs</strong> — a duct makes future replacement or upgrade (say,
                  from a 32A circuit to something bigger) far easier, which is worth considering
                  given how quickly EV equipment is evolving.
                </li>
              </ul>
              <p>
                When the route changes installation method — clipped, in insulation, buried — the
                cable must be sized for the worst-case section. Run the calculator for the most
                onerous method on the route. For the armoured section specifics, see the{' '}
                <SEOInternalLink href="/tools/swa-cable-size-calculator">
                  SWA cable size calculator
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Confirm the charger rating and circuit current',
          text: 'A 7.4kW single-phase charger is a 32A circuit (7400 / 230 = 32.2A). A 22kW three-phase charger is 32A per phase (22000 / (1.732 x 400) = 31.8A).',
        },
        {
          name: 'Check the supply can take it',
          text: 'Run the load assessment first — existing maximum demand plus the charger must fit the supply capacity, or load management is needed. Use the EV charger load calculator for this step.',
        },
        {
          name: 'Measure the cable route',
          text: 'Measure the actual run length including vertical drops and note every installation method on the route — clipped, in insulation, buried, in duct. The worst-case method governs.',
        },
        {
          name: 'Size the cable',
          text: 'Enter the current, length, and method into the calculator. It applies correction factors and recommends the size — typically 6mm² for short runs, 10mm² for longer ones.',
        },
        {
          name: 'Verify voltage drop and protection',
          text: 'Check the run is within the 5% voltage drop limit, specify a Type A 30mA RCD (or RCBO), and confirm the earthing arrangement — PME supplies need additional measures for EV charging.',
        },
      ]}
      howToHeading="How to Size an EV Charger Cable"
      howToDescription="Five steps from charger rating to a verified circuit design."
      features={[
        {
          icon: Car,
          title: 'EV Circuit Presets',
          description:
            'Size from the charger kW rating or the circuit current directly — 7.4kW/32A single-phase and 22kW three-phase both covered.',
        },
        {
          icon: Cable,
          title: 'All Installation Methods',
          description:
            'Twin and earth, SWA, buried, ducted, in insulation — correction factors applied for the worst-case section of the route.',
        },
        {
          icon: Gauge,
          title: 'Voltage Drop on Long Runs',
          description:
            'EV chargers often sit a long way from the board. The calculator checks the 5% limit and shows when to step up a size.',
        },
        {
          icon: Shield,
          title: 'Protection Guidance',
          description:
            'Type A 30mA RCD specification and dedicated-circuit guidance for EV charging equipment.',
        },
        {
          icon: BarChart3,
          title: 'Pairs with Load Assessment',
          description:
            'Use the EV charger load calculator to verify supply capacity, then size the cable here — the full design workflow.',
        },
        {
          icon: Calculator,
          title: '70+ Calculators in One App',
          description:
            'Cable sizing, voltage drop, maximum demand, earth fault loop impedance, and more in Elec-Mate.',
        },
      ]}
      featuresHeading="EV Charger Cable Calculator Features"
      featuresSubheading="The cable-sizing half of EV charger design, done properly."
      faqs={[
        {
          question: 'What size cable do I need for a 7.4kW EV charger?',
          answer:
            'A 7.4kW charger draws 32.2A at 230V (7400 / 230) and is installed as a dedicated 32A circuit. 6mm² twin and earth is the typical choice for shorter runs in favourable installation methods, stepping up to 10mm² on longer runs where voltage drop approaches the 5% limit or where derating (insulation, grouping, high ambient) pulls 6mm² below 32A. For external or buried sections, 6mm² or 10mm² SWA is standard. Always confirm against the tabulated capacity for your installation method — the calculator applies the correction factors for you.',
        },
        {
          question: 'How far can I run 6mm² cable to an EV charger?',
          answer:
            'On voltage drop alone, a 32A circuit in 6mm² copper at approximately 7.3 mV/A/m reaches the 5% limit (11.5V at 230V) at about 49 metres — but good practice is to change up to 10mm² well before that, at roughly 40 metres, to leave margin. Current-carrying capacity can also rule out 6mm² earlier if the route passes through insulation or is grouped with other circuits. Enter your actual route into the calculator to see both checks.',
        },
        {
          question: 'What cable does a 22kW three-phase charger need?',
          answer:
            'A 22kW charger draws 31.8A per phase at 400V (22000 / (1.732 x 400)), making it a 32A three-phase circuit. The typical installation uses 6mm² or 10mm² 4-core SWA depending on run length, protected by a 32A three-pole device with Type A 30mA RCD protection. Three-phase voltage drop is calculated against the 400V line voltage using the tabulated three-phase mV/A/m values, which the calculator handles when you select three-phase.',
        },
        {
          question: 'Why does an EV charger need a Type A RCD?',
          answer:
            'EV charging equipment contains power electronics that can produce smooth DC fault currents. A standard Type AC RCD can be blinded by DC components and fail to trip. A Type A RCD detects pulsating DC as well as AC fault currents, and most EV chargers include built-in 6mA DC fault detection to cover the smooth DC case, pairing with a Type A RCD upstream. Check the charger manufacturer instructions — some units require a Type B RCD if they lack built-in DC detection.',
        },
        {
          question: 'Is this the same as the EV charger load calculator?',
          answer:
            'No — they are the two halves of the same design job. The EV charger load calculator answers "can this property supply a charger?" — maximum demand, supply capacity, diversity across multiple chargers, PME earthing measures, and load management. This page answers "what cable does the circuit need?" — current-carrying capacity, correction factors, and voltage drop for the actual route. Run the load assessment first, then size the cable.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/ev-charger-load-calculator',
          title: 'EV Charger Load Calculator',
          description:
            'The other half of the job: supply capacity, diversity, PME earthing, and load management.',
          icon: Car,
          category: 'Calculators',
        },
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'The full BS 7671 cable sizing tool with all installation methods and correction factors.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/tools/swa-cable-size-calculator',
          title: 'SWA Cable Size Calculator',
          description: 'Size steel wire armoured cable for buried and external EV charger runs.',
          icon: Shield,
          category: 'Calculators',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description: 'Check any circuit against the 3% and 5% BS 7671 voltage drop limits.',
          icon: Gauge,
          category: 'Calculators',
        },
        {
          href: '/tools/garage-supply-calculator',
          title: 'Garage Supply Calculator',
          description:
            'Feeding a garage that will house the charger? Assess the submain load first.',
          icon: Warehouse,
          category: 'Calculators',
        },
        {
          href: '/tools/disconnection-time-calculator',
          title: 'Disconnection Time Calculator',
          description:
            'Verify earth fault loop impedance and disconnection times on long EV circuit runs.',
          icon: Timer,
          category: 'Calculators',
        },
      ]}
      ctaHeading="Design EV charger circuits with confidence"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EV circuit design, cable sizing, and certification. 7-day free trial, cancel anytime."
      toolPath="/tools/ev-charger-cable-size-calculator"
    />
  );
}
