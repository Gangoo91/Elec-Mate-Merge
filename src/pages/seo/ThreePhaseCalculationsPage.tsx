import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  BookOpen,
  Calculator,
  ShieldCheck,
  Zap,
  ClipboardCheck,
  AlertTriangle,
  Cable,
  Layers,
  Activity,
  Gauge,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Three Phase Calculations | Power, Current & Voltage';
const PAGE_DESCRIPTION =
  'Complete guide to three-phase electrical calculations. Three-phase power formula (P = root 3 x VL x IL x cos phi), line vs phase values, star vs delta, calculating line current, power factor, phase balancing, three-phase voltage drop, and cable sizing with worked examples.';

const breadcrumbs = [
  { label: 'Calculators', href: '/tools/electrical-testing-calculators' },
  { label: 'Three Phase Calculations', href: '/guides/three-phase-calculations' },
];

const tocItems = [
  { id: 'three-phase-basics', label: 'Three-Phase Basics' },
  { id: 'power-formula', label: 'Three-Phase Power Formula' },
  { id: 'line-vs-phase', label: 'Line vs Phase Values' },
  { id: 'star-delta', label: 'Star vs Delta Configurations' },
  { id: 'calculating-current', label: 'Calculating Line Current' },
  { id: 'power-factor', label: 'Power Factor in Three-Phase' },
  { id: 'phase-balancing', label: 'Phase Balancing' },
  { id: 'voltage-drop', label: 'Three-Phase Voltage Drop' },
  { id: 'cable-sizing', label: 'Cable Sizing for Three-Phase' },
  { id: 'worked-examples', label: 'Worked Examples' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The three-phase power formula is P = root 3 x VL x IL x cos phi — where VL is the line voltage (400V in the UK), IL is the line current, and cos phi is the power factor.',
  'Line voltage (VL = 400V) is measured between any two phases. Phase voltage (Vp = 230V) is measured between any phase and neutral. In a star configuration, VL = root 3 x Vp.',
  'To calculate line current from total three-phase power: IL = P / (root 3 x VL x cos phi). This is the current each line conductor must carry and the basis for cable sizing.',
  'Three-phase voltage drop uses the three-phase mV/A/m values from the Appendix 4 (now Appendix 12) tables: VD = mV/A/m x Ib x L / 1000.',
  'Elec-Mate has a three-phase power calculator, cable sizing calculator in three-phase mode, voltage drop calculator for three-phase circuits, and star-delta calculator — all working offline.',
];

const faqs = [
  {
    question: 'What is the three-phase power formula?',
    answer:
      'The three-phase power formula for a balanced load is P = root 3 x VL x IL x cos phi, where P is the total three-phase power in watts, VL is the line voltage (400V in the UK standard supply), IL is the line current in amperes, and cos phi is the power factor (a dimensionless number between 0 and 1 representing the ratio of real power to apparent power). Root 3 (approximately 1.732) is the mathematical constant that relates line and phase values in a three-phase system. This formula gives the total power consumed by all three phases combined. For apparent power (in volt-amperes, VA), remove the power factor: S = root 3 x VL x IL. For reactive power (in volt-amperes reactive, VAr): Q = root 3 x VL x IL x sin phi. These three relationships — real power (P), apparent power (S), and reactive power (Q) — form the power triangle, which is fundamental to three-phase power analysis.',
  },
  {
    question: 'What is the difference between line voltage and phase voltage?',
    answer:
      'Line voltage (VL) is the voltage measured between any two of the three phase conductors — L1 to L2, L2 to L3, or L3 to L1. In the UK standard three-phase supply, the line voltage is 400V. Phase voltage (Vp) is the voltage measured between any phase conductor and the neutral — L1 to N, L2 to N, or L3 to N. In the UK, the phase voltage is 230V. The relationship between line and phase voltage depends on the load configuration. In a star (Y) connected system, VL = root 3 x Vp, so 400 = 1.732 x 230 (approximately). In a delta connected system, the phase voltage equals the line voltage (Vp = VL = 400V). This distinction is critical because it determines the voltage across each individual load and therefore the current flowing through each load element.',
  },
  {
    question: 'How do I calculate the line current for a three-phase load?',
    answer:
      'To calculate the line current from the total three-phase power, rearrange the power formula: IL = P / (root 3 x VL x cos phi). For example, a 30kW three-phase load with a power factor of 0.85 on a 400V supply: IL = 30,000 / (1.732 x 400 x 0.85) = 30,000 / 588.9 = 50.9A. This is the current flowing in each line conductor and is the design current (Ib) used for cable sizing. If the power factor is unknown, it is common to assume a power factor of 0.8 for general industrial loads or 1.0 for resistive loads (heaters, immersion heaters). For motor loads, the power factor is typically 0.8 to 0.9 at full load but can drop to 0.3 or less at light load. Using the wrong power factor will give an incorrect line current — too low a power factor assumption will give an unnecessarily high current (oversized cable), while too high a power factor assumption will give a low current (undersized cable).',
  },
  {
    question: 'What is the difference between star and delta configurations?',
    answer:
      'Star (Y) and delta configurations are the two ways of connecting loads or transformer windings in a three-phase system. In a star configuration, one end of each load element (or winding) is connected to a common neutral point, and the other end is connected to a phase conductor. The voltage across each load element is the phase voltage (230V), and the current through each element is the line current. Star connection is the standard for UK domestic and commercial three-phase supplies — the neutral is available, allowing both 230V single-phase loads (connected between one phase and neutral) and 400V three-phase loads (connected across all three phases). In a delta configuration, the load elements are connected in a triangle between each pair of phase conductors. There is no neutral point. The voltage across each element is the line voltage (400V), and the current through each element is the line current divided by root 3 (IL / 1.732). Delta connection is common for three-phase motors, where the motor windings can be connected in star for starting (reduced voltage) and then switched to delta for running (full voltage) — this is the star-delta starter.',
  },
  {
    question: 'How do I calculate voltage drop for a three-phase circuit?',
    answer:
      'Voltage drop for a three-phase circuit is calculated using the same formula as single-phase but with three-phase mV/A/m values from the BS 7671 Appendix 4 (now Appendix 12) tables. The formula is: VD = mV/A/m (three-phase) x Ib x L / 1000, where mV/A/m is the three-phase voltage drop value for the cable type and size, Ib is the design current per phase (the line current), and L is the cable length in metres. The three-phase mV/A/m values in the tables are lower than the single-phase values for the same cable because the three-phase voltage drop calculation already accounts for the phase relationships in a balanced three-phase system. BS 7671 limits voltage drop to 3 percent for lighting and 5 percent for other loads. From a 400V three-phase supply, 3 percent is 12V and 5 percent is 20V. It is important to use the correct (three-phase) mV/A/m values — using the single-phase values for a three-phase circuit will give an incorrect (too high) voltage drop.',
  },
  {
    question: 'What is phase balancing and why does it matter?',
    answer:
      'Phase balancing is the process of distributing single-phase loads as equally as possible across the three phases of a three-phase supply, so that each phase carries approximately the same current. Perfect balance is rarely achievable because loads switch on and off independently, but the goal is to minimise the imbalance. Phase balancing matters for several reasons. First, an unbalanced load causes current to flow in the neutral conductor — in a perfectly balanced three-phase system, the neutral current is zero because the three phase currents cancel out. As the imbalance increases, neutral current increases, and the neutral conductor must be sized to carry this current. Second, an unbalanced load causes unequal voltage drops across the phases, meaning different single-phase loads receive different voltages — loads on the heaviest phase get lower voltage, which can affect performance. Third, unbalanced loads can cause issues with three-phase equipment, particularly motors, which can overheat if the supply voltage is unbalanced. The phase schedule on an EIC records which circuits are connected to which phase, allowing the balance to be assessed.',
  },
  {
    question: 'Does Elec-Mate handle three-phase calculations?',
    answer:
      'Yes. Elec-Mate includes a dedicated three-phase power calculator that computes line current from total power and power factor, converts between line and phase values, and handles both star and delta configurations. The cable sizing calculator has a three-phase mode that uses the correct three-phase columns from the Appendix 4 tables and applies the three-phase mV/A/m values for voltage drop verification. The voltage drop calculator handles both single-phase and three-phase circuits, using the correct table values for each. There is also a star-delta calculator for motor starting calculations. All three-phase tools work offline and are built to BS 7671:2018+A3:2024.',
  },
];

const sections = [
  {
    id: 'three-phase-basics',
    heading: 'Three-Phase Basics',
    content: (
      <>
        <p>
          A three-phase electrical supply consists of three alternating current conductors (L1, L2,
          L3), each carrying a sinusoidal voltage that is offset by 120 electrical degrees from the
          other two. This arrangement has significant advantages over a single-phase supply: it can
          deliver more power for the same conductor size, it can power three-phase motors directly
          (which are simpler, more efficient, and more reliable than single-phase motors), and in a
          balanced system the power delivery is constant (whereas single-phase power pulsates at
          twice the supply frequency).
        </p>
        <p>
          In the UK, the standard three-phase supply provides a line voltage of 400V (between any
          two phases) and a phase voltage of 230V (between any phase and neutral). Most domestic
          properties have a single-phase supply (one phase and neutral from the three-phase
          distribution network), but larger domestic properties, commercial premises, and industrial
          installations typically have a full three-phase supply.
        </p>
        <p>
          Three-phase calculations are essential for{' '}
          <SEOInternalLink href="/guides/how-to-size-cables-bs-7671">cable sizing</SEOInternalLink>,
          protective device selection, and voltage drop verification on commercial and industrial
          installations. They are also needed for{' '}
          <SEOInternalLink href="/guides/prospective-fault-current-explained">
            prospective fault current
          </SEOInternalLink>{' '}
          calculations on three-phase supplies.
        </p>
      </>
    ),
  },
  {
    id: 'power-formula',
    heading: 'The Three-Phase Power Formula',
    content: (
      <>
        <p>The fundamental three-phase power formula for a balanced load is:</p>
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 my-4">
          <p className="text-white font-mono text-sm">
            P = &radic;3 &times; V<sub>L</sub> &times; I<sub>L</sub> &times; cos&phi;
          </p>
          <p className="text-white text-xs mt-2">
            P = total three-phase power (W) | V<sub>L</sub> = line voltage (400V) | I<sub>L</sub> =
            line current (A) | cos&phi; = power factor
          </p>
        </div>
        <p>
          The root 3 factor (approximately 1.732) appears because of the 120-degree phase
          relationship between the three phases. It is a mathematical constant that relates the line
          values (measured between phases) to the individual phase contributions.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Related formulae</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
              <p className="text-white font-mono text-sm">
                <strong>Real power:</strong> P = &radic;3 &times; V<sub>L</sub> &times; I
                <sub>L</sub> &times; cos&phi; (watts)
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
              <p className="text-white font-mono text-sm">
                <strong>Apparent power:</strong> S = &radic;3 &times; V<sub>L</sub> &times; I
                <sub>L</sub> (volt-amperes)
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
              <p className="text-white font-mono text-sm">
                <strong>Reactive power:</strong> Q = &radic;3 &times; V<sub>L</sub> &times; I
                <sub>L</sub> &times; sin&phi; (VAr)
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10">
              <p className="text-white font-mono text-sm">
                <strong>Line current:</strong> I<sub>L</sub> = P &divide; (&radic;3 &times; V
                <sub>L</sub> &times; cos&phi;)
              </p>
            </div>
          </div>
        </div>
        <p>
          The line current formula — rearranged from the power formula — is the most commonly used
          form in practice. You know the load power (from the equipment nameplate, circuit design,
          or diversity calculation), the supply voltage (400V), and the power factor (from the
          equipment data or assumed), and you need to calculate the current for cable sizing and
          device selection.
        </p>
        <SEOAppBridge
          title="Three-phase power calculator"
          description="Enter total power and power factor. Elec-Mate calculates line current, apparent power, and reactive power instantly. Switch between star and delta configurations. Works offline."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'line-vs-phase',
    heading: 'Line Values vs Phase Values',
    content: (
      <>
        <p>
          One of the most common sources of confusion in three-phase calculations is the difference
          between line values and phase values. Getting these mixed up results in calculations that
          are wrong by a factor of root 3 (1.732), leading to cables that are massively oversized or
          dangerously undersized.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Line Values</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-yellow-400">Line voltage (VL)</strong> is measured between any
              two phase conductors: L1 to L2, L2 to L3, or L3 to L1. In the UK, VL = 400V.{' '}
              <strong className="text-yellow-400">Line current (IL)</strong> is the current flowing
              in each phase conductor of the supply cable. This is the current you measure with a
              clamp meter on any one of the three phase conductors. Line current is the value used
              for cable sizing and protective device selection.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Phase Values</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-yellow-400">Phase voltage (Vp)</strong> is measured between
              any phase conductor and the neutral: L1 to N, L2 to N, or L3 to N. In the UK, Vp =
              230V. <strong className="text-yellow-400">Phase current (Ip)</strong> is the current
              flowing through each individual load element or winding. In a star configuration, the
              phase current equals the line current (Ip = IL). In a delta configuration, the phase
              current is the line current divided by root 3 (Ip = IL / 1.732).
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Summary of relationships</h3>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="p-2 rounded bg-white/[0.06] text-center font-bold text-white">
              Quantity
            </div>
            <div className="p-2 rounded bg-white/[0.06] text-center font-bold text-white">
              Star (Y)
            </div>
            <div className="p-2 rounded bg-white/[0.06] text-center font-bold text-white">
              Delta (&Delta;)
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Voltage</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              V<sub>L</sub> = &radic;3 &times; V<sub>p</sub>
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              V<sub>L</sub> = V<sub>p</sub>
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">Current</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              I<sub>L</sub> = I<sub>p</sub>
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              I<sub>L</sub> = &radic;3 &times; I<sub>p</sub>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'star-delta',
    heading: 'Star vs Delta Configurations',
    content: (
      <>
        <p>
          Star and delta are the two fundamental ways of connecting three-phase loads or transformer
          windings. Understanding the difference is essential for motor installations, transformer
          connections, and three-phase load analysis.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Star (Y) Configuration</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              In a star configuration, one end of each of the three load elements (or windings) is
              connected together at a central "star point" (also called the neutral point). The
              other end of each element is connected to one of the three phase conductors.
            </p>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  Phase voltage across each element: V<sub>p</sub> = V<sub>L</sub> / &radic;3 = 400
                  / 1.732 = 230V
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  Line current equals phase current: I<sub>L</sub> = I<sub>p</sub>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Neutral available — allows connection of single-phase 230V loads</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  Standard for UK distribution — domestic and commercial supplies are star-connected
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Delta (&Delta;) Configuration</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              In a delta configuration, the three load elements are connected end-to-end in a closed
              triangle. Each element is connected between two phase conductors. There is no neutral
              point.
            </p>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  Phase voltage across each element: V<sub>p</sub> = V<sub>L</sub> = 400V
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  Line current = &radic;3 x phase current: I<sub>L</sub> = &radic;3 &times; I
                  <sub>p</sub>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>No neutral — only three-phase and line-to-line loads can be connected</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <span>Common for three-phase motors at running speed (star-delta starting)</span>
              </li>
            </ul>
          </div>
        </div>
        <p>
          The star-delta starter is a common motor starting method. The motor windings are first
          connected in star (reducing the voltage across each winding to 230V and the starting
          current to approximately one-third of the delta starting current), and then switched to
          delta for normal running (full 400V across each winding). This reduces the mechanical
          stress on the drive train and the electrical stress on the supply during starting.
        </p>
        <SEOAppBridge
          title="Star-delta calculator"
          description="Elec-Mate's star-delta calculator computes line and phase currents for both configurations, calculates the current reduction from star starting, and helps size the cable and protective device."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'calculating-current',
    heading: 'Calculating Line Current from Load',
    content: (
      <>
        <p>
          The most common three-phase calculation in practice is determining the line current from
          the total load power. This line current is the design current (Ib) used for cable sizing
          and protective device selection.
        </p>
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 my-4">
          <p className="text-white font-mono text-sm">
            I<sub>L</sub> = P &divide; (&radic;3 &times; V<sub>L</sub> &times; cos&phi;)
          </p>
        </div>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Quick reference: current per kW at different power factors
          </h3>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="p-2 rounded bg-white/[0.06] text-center font-bold text-white">
              Power Factor
            </div>
            <div className="p-2 rounded bg-white/[0.06] text-center font-bold text-white">
              A per kW
            </div>
            <div className="p-2 rounded bg-white/[0.06] text-center font-bold text-white">
              Example (30kW)
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">1.0</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              1.44A
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">43.3A</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">0.9</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              1.60A
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">48.1A</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">0.85</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              1.70A
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">50.9A</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">0.8</div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-yellow-400 font-bold">
              1.80A
            </div>
            <div className="p-2 rounded bg-white/[0.04] text-center text-white">54.1A</div>
          </div>
          <p className="text-white text-xs mt-3">
            Based on V<sub>L</sub> = 400V, balanced three-phase load
          </p>
        </div>
        <p>
          A useful rule of thumb for three-phase at 400V with unity power factor: approximately 1.44
          amperes per kilowatt. At power factor 0.8 (typical for motors), it is approximately 1.80
          amperes per kilowatt. These quick estimates are useful for on-site sanity checks but
          should not replace a proper calculation for cable sizing.
        </p>
      </>
    ),
  },
  {
    id: 'power-factor',
    heading: 'Power Factor in Three-Phase Systems',
    content: (
      <>
        <p>
          Power factor (cos phi) is the ratio of real power (watts) to apparent power
          (volt-amperes). A power factor of 1.0 (unity) means all the current drawn from the supply
          is doing useful work. A power factor less than 1.0 means additional current is flowing to
          supply the reactive power demand, without contributing to useful work.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-2">Typical power factors by load type</h3>
            <div className="space-y-2 text-white text-sm">
              <p>
                <strong className="text-yellow-400">Resistive loads (heaters, kettles):</strong> cos
                phi = 1.0 (unity)
              </p>
              <p>
                <strong className="text-yellow-400">Fluorescent lighting:</strong> cos phi = 0.5 to
                0.9 (varies with ballast type)
              </p>
              <p>
                <strong className="text-yellow-400">LED lighting (with driver):</strong> cos phi =
                0.9 to 0.95
              </p>
              <p>
                <strong className="text-yellow-400">Induction motors (full load):</strong> cos phi =
                0.8 to 0.9
              </p>
              <p>
                <strong className="text-yellow-400">Induction motors (light load):</strong> cos phi
                = 0.3 to 0.5
              </p>
              <p>
                <strong className="text-yellow-400">Welding equipment:</strong> cos phi = 0.4 to 0.6
              </p>
              <p>
                <strong className="text-yellow-400">Computer loads:</strong> cos phi = 0.65 to 0.9
                (depends on PSU type)
              </p>
            </div>
          </div>
        </div>
        <p>
          Power factor matters in three-phase calculations because a low power factor increases the
          line current for the same real power output. This means larger cables, larger protective
          devices, and higher electricity costs (commercial consumers are often penalised for poor
          power factor by the DNO). Power factor correction — typically using capacitor banks —
          reduces the reactive current and brings the power factor closer to unity.
        </p>
        <p>
          For cable sizing purposes, the design current must be calculated using the actual power
          factor of the load. Using cos phi = 1.0 when the actual power factor is 0.8 will give a
          design current that is 20% too low, potentially resulting in an undersized cable.
        </p>
      </>
    ),
  },
  {
    id: 'phase-balancing',
    heading: 'Phase Balancing Calculations',
    content: (
      <>
        <p>
          When a three-phase supply feeds a mixture of single-phase and three-phase loads, the
          single-phase loads must be distributed across the three phases as evenly as possible.
          Perfect balance is rarely achievable because loads vary throughout the day, but the design
          should aim for the best possible balance at the expected peak demand.
        </p>
        <p>
          In a perfectly balanced three-phase system, the neutral current is zero because the three
          phase currents cancel each other out. As the imbalance increases, the neutral current
          increases. The neutral current can be calculated from the three phase currents using
          vector addition, but for practical purposes on a distribution board with predominantly
          resistive loads, a reasonable approximation is that the neutral current does not exceed
          the current of the most heavily loaded phase.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Phase balancing in practice</h3>
          <ul className="space-y-2 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>List all single-phase circuits with their maximum demand (Ib)</span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Allocate the largest loads first, assigning each to the phase with the lowest total
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continue allocating smaller loads to equalise the phase totals</span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>Record the phase allocation on the circuit schedule (EIC Section 7)</span>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Three-phase loads are inherently balanced and do not need phase allocation
              </span>
            </li>
          </ul>
        </div>
        <p>
          The <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          does not specify a maximum permissible imbalance, but good practice aims for the
          difference between the most and least loaded phases to be no more than 10-15% of the total
          load per phase.
        </p>
        <SEOAppBridge
          title="Phase balancing built into the circuit schedule"
          description="Elec-Mate's EIC circuit schedule lets you assign each circuit to a phase (L1, L2, L3) and automatically calculates the load per phase, showing the balance percentage. Helps you achieve the best distribution."
          icon={BarChart3}
        />
      </>
    ),
  },
  {
    id: 'voltage-drop',
    heading: 'Three-Phase Voltage Drop',
    content: (
      <>
        <p>
          Voltage drop for three-phase circuits is calculated using the same formula as single-phase
          but with the three-phase mV/A/m values from the{' '}
          <SEOInternalLink href="/guides/appendix-4-tables-bs-7671">Appendix 4</SEOInternalLink>{' '}
          (now Appendix 12) tables:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 my-4">
          <p className="text-white font-mono text-sm">
            VD = mV/A/m (three-phase) &times; I<sub>b</sub> &times; L &divide; 1000
          </p>
          <p className="text-white text-xs mt-2">
            VD = voltage drop (volts) | mV/A/m = three-phase value | I<sub>b</sub> = line current
            (A) | L = cable length (m)
          </p>
        </div>
        <p>
          The three-phase mV/A/m values in the tables are different from (and lower than) the
          single-phase values for the same cable. This is because the three-phase voltage drop
          formula inherently accounts for the phase relationships in a balanced three-phase system.
          You must always use the three-phase column when calculating voltage drop for a three-phase
          circuit — using the single-phase values would give an incorrect result.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            BS 7671 voltage drop limits (three-phase 400V)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">Lighting circuits</p>
              <p className="text-yellow-400 text-lg font-bold">12V</p>
              <p className="text-white text-xs">3% of 400V</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-center">
              <p className="text-white text-sm font-bold">Other circuits</p>
              <p className="text-yellow-400 text-lg font-bold">20V</p>
              <p className="text-white text-xs">5% of 400V</p>
            </div>
          </div>
        </div>
        <p>
          On long three-phase cable runs — such as submain feeds to remote distribution boards in
          large commercial buildings or external supplies to outbuildings — voltage drop is often
          the governing factor in cable selection, requiring a larger cable than would be needed for
          current-carrying capacity alone.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing',
    heading: 'Cable Sizing for Three-Phase Circuits',
    content: (
      <>
        <p>
          Cable sizing for three-phase circuits follows the same{' '}
          <SEOInternalLink href="/guides/how-to-size-cables-bs-7671">
            six-step process
          </SEOInternalLink>{' '}
          as single-phase, but with three-phase-specific values at each step.
        </p>
        <div className="space-y-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white mb-2">1. Design current (Ib)</h3>
            <p className="text-white text-sm leading-relaxed">
              Calculate using the three-phase formula: Ib = P / (&radic;3 &times; VL &times;
              cos&phi;). This gives the current per line conductor.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white mb-2">2. Protective device (In)</h3>
            <p className="text-white text-sm leading-relaxed">
              Select a three-phase MCB, MCCB, or fuse with In greater than or equal to Ib.
              Three-phase devices have linked poles that disconnect all three phases simultaneously.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white mb-2">3. Correction factors and It</h3>
            <p className="text-white text-sm leading-relaxed">
              Apply{' '}
              <SEOInternalLink href="/guides/correction-factors-bs-7671">
                Ca, Cg, Ci, and Cf
              </SEOInternalLink>{' '}
              exactly as for single-phase. It = In / (Ca &times; Cg &times; Ci &times; Cf).
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white mb-2">4. Select cable from Appendix 4</h3>
            <p className="text-white text-sm leading-relaxed">
              Use the three-phase (three loaded conductors) column of the appropriate{' '}
              <SEOInternalLink href="/guides/appendix-4-tables-bs-7671">
                Appendix 4 table
              </SEOInternalLink>
              . The three-conductor column gives lower capacity than the two-conductor column
              because three current-carrying conductors generate more heat than two.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white mb-2">5. Verify voltage drop</h3>
            <p className="text-white text-sm leading-relaxed">
              Use the three-phase mV/A/m values from Appendix 12. Check against 12V (lighting) or
              20V (other) limits for a 400V supply.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white mb-2">6. Verify fault current withstand</h3>
            <p className="text-white text-sm leading-relaxed">
              Apply the adiabatic equation (k&sup2;S&sup2; &ge; I&sup2;t) using the three-phase
              prospective fault current at the point of installation.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Three-phase cable sizing calculator"
          description="Elec-Mate's cable sizing calculator has a three-phase mode. Enter the total load, power factor, and cable route details. The calculator uses the correct three-phase tables for capacity and voltage drop. Works offline."
          icon={Cable}
        />
      </>
    ),
  },
  {
    id: 'worked-examples',
    heading: 'Worked Examples',
    content: (
      <>
        <div className="space-y-6">
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Example 1: Three-Phase Motor</h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              An 11kW three-phase induction motor with a power factor of 0.85 at full load. 400V
              supply, cable run of 25 metres, clipped direct (Method C), ambient 30 degrees Celsius,
              no grouping.
            </p>
            <div className="space-y-2 text-white text-sm">
              <p>
                <strong>Line current:</strong> I<sub>L</sub> = 11,000 &divide; (1.732 &times; 400
                &times; 0.85) = 11,000 &divide; 588.9 ={' '}
                <strong className="text-yellow-400">18.7A</strong>
              </p>
              <p>
                <strong>Protective device:</strong> 20A Type C MCB (Type C for motor inrush)
              </p>
              <p>
                <strong>Correction factors:</strong> Ca = 1.0 | Cg = 1.0 | Ci = 1.0 | Cf = 1.0
              </p>
              <p>
                <strong>
                  Required I<sub>t</sub>:
                </strong>{' '}
                20 &divide; 1.0 = 20A
              </p>
              <p>
                <strong>From Table 4D5A (3 loaded conductors, Method C):</strong> 2.5mm&sup2; has I
                <sub>z</sub> = 24A
              </p>
              <p>
                <strong>Voltage drop:</strong> mV/A/m (3-phase) for 2.5mm&sup2; = 16 mV/A/m
              </p>
              <p>
                VD = 16 &times; 18.7 &times; 25 &divide; 1000 ={' '}
                <strong className="text-yellow-400">7.5V</strong> (1.9% of 400V — within 5% limit)
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Example 2: Commercial Distribution Board
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              A submain feed to a three-phase distribution board with a total demand of 60kW after
              diversity. Power factor 0.9, cable run of 40 metres in trunking (Method B), 4 circuits
              grouped in the trunking, ambient 30 degrees Celsius.
            </p>
            <div className="space-y-2 text-white text-sm">
              <p>
                <strong>Line current:</strong> I<sub>L</sub> = 60,000 &divide; (1.732 &times; 400
                &times; 0.9) = 60,000 &divide; 623.5 ={' '}
                <strong className="text-yellow-400">96.2A</strong>
              </p>
              <p>
                <strong>Protective device:</strong> 100A TP MCCB
              </p>
              <p>
                <strong>Correction factors:</strong> Ca = 1.0 | Cg = 0.65 (4 circuits) | Ci = 1.0 |
                Cf = 1.0
              </p>
              <p>
                <strong>
                  Required I<sub>t</sub>:
                </strong>{' '}
                100 &divide; 0.65 = <strong className="text-yellow-400">153.8A</strong>
              </p>
              <p>
                <strong>Cable selection:</strong> 70mm&sup2; multicore SWA required for this current
                rating
              </p>
              <p>
                <strong>Voltage drop check:</strong> Must verify using three-phase mV/A/m values for
                the selected cable
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Example 3: Three-Phase Heating Load
            </h3>
            <p className="text-white text-sm leading-relaxed mb-3">
              A 24kW three-phase heating element (resistive load, cos phi = 1.0). 400V supply, cable
              run 15 metres, clipped direct.
            </p>
            <div className="space-y-2 text-white text-sm">
              <p>
                <strong>Line current:</strong> I<sub>L</sub> = 24,000 &divide; (1.732 &times; 400
                &times; 1.0) = 24,000 &divide; 692.8 ={' '}
                <strong className="text-yellow-400">34.6A</strong>
              </p>
              <p>
                <strong>Protective device:</strong> 40A Type B MCB (three-pole)
              </p>
              <p>
                <strong>No derating factors apply.</strong> I<sub>t</sub> = 40A
              </p>
              <p>
                <strong>Cable:</strong> 6mm&sup2; four-core SWA (I<sub>z</sub> = 41A for 3 loaded
                conductors, Method C)
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/tools/three-phase-power-calculator',
    title: 'Three Phase Power Calculator',
    description:
      'Calculate line current, apparent power, and reactive power for balanced three-phase loads.',
    icon: Calculator,
    category: 'Tool' as const,
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Three-phase mode with correct Appendix 4 tables, correction factors, and voltage drop verification.',
    icon: Cable,
    category: 'Tool' as const,
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Three-phase voltage drop calculation using mV/A/m values from Appendix 12.',
    icon: Zap,
    category: 'Tool' as const,
  },
  {
    href: '/guides/correction-factors-bs-7671',
    title: 'Correction Factors Guide',
    description:
      'Ca, Cg, Ci, and Cf correction factors for cable derating — applies to both single and three-phase.',
    icon: Activity,
    category: 'Guide' as const,
  },
  {
    href: '/guides/appendix-4-tables-bs-7671',
    title: 'Appendix 4 Tables Guide',
    description: 'How to read the current-carrying capacity tables including three-phase columns.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/guides/prospective-fault-current-explained',
    title: 'Prospective Fault Current Guide',
    description: 'PFC on three-phase supplies — measurement, typical values, and device selection.',
    icon: Gauge,
    category: 'Guide' as const,
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ThreePhaseCalculationsPage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Calculations"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Three Phase Calculations{' '}
          <span className="text-yellow-400">Power, Current &amp; Voltage</span>
        </>
      }
      heroSubtitle="The complete guide to three-phase electrical calculations. Power formula (P = root 3 x VL x IL x cos phi), line vs phase values, star vs delta configurations, phase balancing, three-phase voltage drop, and cable sizing — with worked examples for motors, distribution boards, and commercial loads."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Three-phase calculations, one tap away"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for three-phase power, cable sizing, and voltage drop calculations. 70 calculators, 8 certificate types — all BS 7671:2018+A3:2024. 7-day free trial."
    />
  );
}
