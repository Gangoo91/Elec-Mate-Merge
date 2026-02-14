import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Gauge,
  Calculator,
  Zap,
  Activity,
  BookOpen,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Cable,
  Thermometer,
  GraduationCap,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Calculators', href: '/tools/electrical-testing-calculators' },
  { label: 'Earth Fault Loop Impedance', href: '/guides/earth-fault-loop-impedance-calculation' },
];

const tocItems = [
  { id: 'what-is-zs', label: 'What Is Earth Fault Loop Impedance?' },
  { id: 'the-formula', label: 'The Formula: Zs = Ze + (R1+R2)' },
  { id: 'ze-explained', label: 'Ze Explained' },
  { id: 'r1-r2-explained', label: 'R1+R2 Explained' },
  { id: 'temperature-correction', label: 'Temperature Correction' },
  { id: 'maximum-zs-values', label: 'Maximum Zs Values' },
  { id: 'worked-examples', label: 'Worked Examples' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'using-elec-mate', label: 'Using the Elec-Mate Zs Calculator' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Earth fault loop impedance (Zs) is the total impedance of the fault loop path from the point of fault, through the protective conductor, back to the transformer, and via the phase conductor to the point of fault: Zs = Ze + (R1+R2).',
  'Zs must be low enough to ensure the protective device (MCB, RCBO, or fuse) operates within the required disconnection time — 0.4 seconds for final circuits and 5 seconds for distribution circuits under BS 7671.',
  'The measured Zs at the furthest point of each circuit must not exceed the maximum Zs value listed in BS 7671 Tables 41.2 to 41.5 for the type and rating of the protective device.',
  'Temperature correction must be applied when comparing designed (calculated) Zs values with the maximum permitted values, because conductor resistance increases as temperature rises during normal operation.',
  'Elec-Mate includes a Zs calculator that checks measured values against the BS 7671 maximum Zs tables, plus 50+ other calculators including cable sizing, voltage drop, PFC, max demand, and adiabatic equation.',
];

const faqs = [
  {
    question: 'What does Zs mean in electrical testing?',
    answer:
      'Zs stands for earth fault loop impedance, measured in ohms. It is the total impedance of the complete fault loop path that current would follow during an earth fault. The loop goes from the point of fault along the circuit protective conductor (CPC) to the main earthing terminal, through the earthing conductor to the means of earthing (earth electrode or supply company earth), through the earth return path back to the transformer star point, through the transformer winding, along the phase conductor of the supply cable and installation to the point of fault. Every component in this loop adds impedance. Zs is critical because it determines how much fault current flows during an earth fault — and therefore how quickly the protective device operates to disconnect the supply. A lower Zs means a higher fault current and faster disconnection. A higher Zs means a lower fault current and slower disconnection. BS 7671 sets maximum Zs values for each type and rating of protective device to ensure the disconnection time is fast enough to prevent electric shock.',
  },
  {
    question: 'How is Zs measured on site?',
    answer:
      'Zs is measured using a multifunction tester or a dedicated loop impedance meter. The instrument is connected between the phase and earth terminals at the furthest point of the circuit being tested (for example, at the last socket on a ring or radial circuit). The instrument injects a brief test current, measures the voltage drop, and calculates the impedance using Ohm law. The result is displayed in ohms. Zs must be measured at every circuit during initial verification and at representative points during periodic inspection. The test should be performed with the circuit energised and all connections made. A no-trip loop impedance test mode is available on most modern instruments — this is essential for circuits protected by RCDs, because a standard loop test may trip the RCD. The measured Zs must be compared with the maximum Zs value from BS 7671 Tables 41.2 to 41.5 for the specific protective device type and rating.',
  },
  {
    question: 'What is Ze and how is it different from Zs?',
    answer:
      'Ze is the external earth fault loop impedance — the impedance of the supply-side portion of the fault loop, measured at the origin of the installation with the main earthing conductor disconnected from the MET (main earthing terminal). Ze includes the impedance of the supply transformer, the supply phase conductor, and the supply earth return path. It does not include any impedance from the installation itself. Zs is the total earth fault loop impedance at any point in the installation, which includes Ze plus the impedance of the installation cables: Zs = Ze + (R1+R2), where R1 is the resistance of the phase conductor and R2 is the resistance of the protective conductor from the origin to the point of measurement. Ze is typically 0.2 to 0.8 ohms for a TN-S supply and 0.35 to 0.8 ohms for a TN-C-S (PME) supply. The DNO provides a maximum Ze value for each supply.',
  },
  {
    question: 'What is R1+R2 and how do I measure it?',
    answer:
      'R1+R2 is the combined resistance of the phase conductor (R1) and the circuit protective conductor (R2) from the origin of the installation (the distribution board) to the furthest point of the circuit. R1+R2 is measured during the dead tests as part of the continuity of protective conductors test (BS 7671 Regulation 612.2). The standard method uses a low-resistance ohmmeter: the phase and CPC are linked together at the distribution board, and the resistance is measured at the furthest point of the circuit. The reading gives R1+R2 directly. For ring final circuits, the R1+R2 value at each socket should be approximately one-quarter of the total end-to-end resistance (for a properly wired ring). R1+R2 depends on the cable length and the conductor cross-sectional area — longer circuits and thinner conductors give higher R1+R2 values.',
  },
  {
    question: 'Why do I need to apply temperature correction to Zs?',
    answer:
      'The resistance of copper and aluminium conductors increases as temperature rises. When you measure R1+R2 during dead testing, the cable is cold (approximately 10 to 20 degrees Celsius ambient). When you measure Zs during live testing, the cable may be slightly warm from the test current but is still not at its normal operating temperature. However, when a real fault occurs, the cable will be at its normal operating temperature (which could be 70 degrees Celsius for PVC insulated cables). At this higher temperature, the resistance — and therefore Zs — is higher than the cold measured value. BS 7671 Appendix 3 provides a correction factor of 1.2 for PVC cables (to convert from 10 degrees to 70 degrees). When comparing a calculated or measured Zs with the maximum permitted value, you must apply this correction to ensure the Zs will still be within limits at the worst-case operating temperature. The rule is: Zs (corrected) = Zs (measured) x 1.2 for thermoplastic cables or x 1.28 for thermosetting cables.',
  },
  {
    question: 'Where do I find the maximum Zs values in BS 7671?',
    answer:
      'The maximum Zs values are listed in BS 7671 Chapter 41, specifically in Tables 41.2 (BS 88 fuses), 41.3 (BS 3036 fuses), 41.4 (Type B MCBs), and 41.5 (Type C MCBs). Additional tables cover Type D MCBs and RCBOs. Each table lists the maximum Zs value for each protective device rating (6 A, 10 A, 16 A, 20 A, 32 A, etc.) that will ensure the required disconnection time. For final circuits (0.4 second disconnection), the maximum Zs values are lower (requiring lower impedance and therefore higher fault current). For distribution circuits (5 second disconnection), the maximum Zs values are higher (allowing more impedance). The IET On-Site Guide also reproduces these tables with additional guidance. When using these tables, remember that the tabulated maximum Zs values are at the maximum conductor operating temperature — so you must apply the temperature correction factor when comparing measured or calculated values taken at ambient temperature.',
  },
  {
    question: 'What happens if Zs is too high?',
    answer:
      'If the measured Zs at any point on a circuit exceeds the maximum Zs value from the BS 7671 tables for that protective device, the protective device may not operate quickly enough during an earth fault. This means the fault could persist long enough to cause electric shock (the whole purpose of the disconnection time limit is to prevent lethal electric shock). On an EICR, this would be classified as a C2 (Potentially Dangerous) observation — or C1 (Danger Present) if the risk is immediate. The remedial action depends on the cause: if Zs is high because R1+R2 is high (long cable run, thin CPC), the solution may be to use a cable with a larger CPC, reduce the circuit length, or change the protective device to one with a higher maximum Zs (for example, fitting an RCD or RCBO, which has a much higher maximum Zs of approximately 1667 ohms at 30 mA). If Zs is high because Ze is high, the issue is with the supply and should be reported to the DNO.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/earth-loop-impedance-calculator',
    title: 'Zs Calculator',
    description: 'Calculate earth fault loop impedance and compare with BS 7671 maximum Zs values.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/prospective-fault-current-explained',
    title: 'PFC Explained',
    description:
      'Understanding prospective fault current, its relationship to Zs, and protective device breaking capacity.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables with automatic Zs verification to ensure disconnection times are met.',
    icon: Cable,
    category: 'Calculator',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description:
      'The correct order for electrical testing including continuity (R1+R2) and loop impedance (Zs).',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing R1+R2',
    description:
      'Step-by-step guide to measuring R1+R2 for protective conductor continuity and Zs calculation.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements',
    title: 'Earthing Arrangements',
    description:
      'TN-S, TN-C-S (PME), and TT earthing systems and how they affect Ze and Zs values.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-zs',
    heading: 'What Is Earth Fault Loop Impedance?',
    content: (
      <>
        <p>
          Earth fault loop impedance (Zs) is the total impedance of the path that fault current
          follows during an earth fault. It is measured in ohms and is one of the most important
          values in electrical installation design and testing.
        </p>
        <p>
          When a fault occurs between a live conductor and an exposed-conductive-part (such as a
          metal appliance enclosure or a conduit), the fault current flows in a complete loop: from
          the point of fault, along the circuit protective conductor (CPC) back to the distribution
          board, through the main earthing conductor to the means of earthing, through the earth
          return path back to the supply transformer, through the transformer winding, and along the
          phase conductor of the supply and installation cables back to the point of fault.
        </p>
        <p>
          The total impedance of this loop determines the magnitude of the fault current — and
          therefore how quickly the protective device (MCB, RCBO, or fuse) operates to disconnect
          the supply. A lower Zs means higher fault current and faster disconnection.{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> sets
          maximum Zs values for each protective device type and rating to ensure the disconnection
          time is fast enough to prevent electric shock (0.4 seconds for final circuits and 5
          seconds for distribution circuits).
        </p>
      </>
    ),
  },
  {
    id: 'the-formula',
    heading: 'The Formula: Zs = Ze + (R1+R2)',
    content: (
      <>
        <p>The earth fault loop impedance at any point in the installation is calculated using:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 text-center">
          <p className="text-white text-2xl font-mono font-bold">Zs = Ze + (R1+R2)</p>
          <div className="mt-4 text-left max-w-md mx-auto">
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>Zs</strong> = total earth fault loop impedance at the point of measurement
                (ohms)
              </li>
              <li>
                <strong>Ze</strong> = external earth fault loop impedance — the supply-side portion
                (ohms)
              </li>
              <li>
                <strong>R1</strong> = resistance of the phase conductor from the origin to the point
                (ohms)
              </li>
              <li>
                <strong>R2</strong> = resistance of the protective conductor from the origin to the
                point (ohms)
              </li>
            </ul>
          </div>
        </div>
        <p>
          This formula shows that Zs increases as you move further from the origin of the
          installation. At the origin, R1+R2 is zero (or negligible), so Zs approximately equals Ze.
          At the furthest point of a long circuit, R1+R2 can be significant, making Zs much higher
          than Ze. This is why the Zs measurement is taken at the furthest point of the circuit — it
          is the worst case.
        </p>
        <p>
          The formula can be used in two ways: during design (calculating Zs from known cable data
          and Ze to verify that the maximum Zs will not be exceeded) and during testing (measuring
          Ze and R1+R2 separately, then adding them to predict Zs, or measuring Zs directly with a
          loop impedance tester to verify the result).
        </p>
      </>
    ),
  },
  {
    id: 'ze-explained',
    heading: 'Ze Explained: The External Loop Impedance',
    content: (
      <>
        <p>
          Ze is the external earth fault loop impedance — the portion of the fault loop that is
          outside the installation, belonging to the supply company. It includes the impedance of
          the supply transformer winding, the phase conductor of the supply cable from the
          transformer to the property, and the earth return path (which varies depending on the{' '}
          <SEOInternalLink href="/guides/earthing-arrangements">
            earthing arrangement
          </SEOInternalLink>
          ).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-S (separate earth):</strong> Ze is typically 0.2 to 0.8 ohms. The earth
                return path is via the metallic cable sheath or a separate earth conductor in the
                supply cable. This provides a reliable, low-impedance earth return.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TN-C-S (PME):</strong> Ze is typically 0.35 to 0.8 ohms. The earth return
                path uses the combined neutral/earth conductor (PEN) of the supply cable. This is
                the most common supply arrangement in the UK for newer installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>TT (earth electrode):</strong> Ze can be very high — typically 20 ohms or
                more — because the earth return path is through the general mass of earth via an
                earth rod. TT systems almost always require RCD protection because the high Ze means
                Zs will exceed the maximum values for MCBs and fuses alone.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Ze is measured at the origin of the installation with the main earthing conductor
          disconnected from the MET (main earthing terminal), so that only the external portion of
          the loop is measured. This value is recorded on the EICR and EIC. The DNO also declares a
          maximum Ze value for each supply — the measured value should not exceed this.
        </p>
      </>
    ),
  },
  {
    id: 'r1-r2-explained',
    heading: 'R1+R2 Explained: The Installation Loop Impedance',
    content: (
      <>
        <p>
          R1+R2 is the combined resistance of the phase conductor (R1) and the circuit protective
          conductor (R2) from the origin of the installation to the furthest point of the circuit.
          It represents the installation's contribution to the total earth fault loop impedance.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">How R1+R2 Is Measured</h4>
                <p className="text-white text-sm leading-relaxed">
                  During dead testing, the phase and CPC are linked together at the distribution
                  board (using a long lead or a wander lead method). A low-resistance ohmmeter is
                  then used to measure the resistance at the furthest point of the circuit. This
                  gives R1+R2 directly. For ring final circuits, the figure-of-eight test method
                  measures R1+R2 at each socket to verify the ring is continuous and correctly
                  wired.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">What Affects R1+R2</h4>
                <p className="text-white text-sm leading-relaxed">
                  R1+R2 depends on the cable length, the conductor cross-sectional area, and the
                  conductor material. Longer circuits have higher R1+R2. Thinner conductors (1.0 mm²
                  CPC in a 2.5 mm² T+E cable) have higher R2 than thicker ones. The R1+R2 value per
                  metre for common cables is published in the IET On-Site Guide (Table I3) — for
                  example, 2.5/1.5 mm² T+E cable has an R1+R2/m of 19.51 milliohms per metre at
                  20°C.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          A high R1+R2 value means a high Zs — which may cause the circuit to exceed the maximum Zs
          for the protective device. This is particularly common on long lighting circuits with 1.0
          mm² conductors or long radial circuits to remote sockets. The solution is to use a cable
          with a larger CPC, reduce the circuit length, or use a protective device with a higher
          maximum Zs (such as an RCD or RCBO).
        </p>
        <SEOAppBridge
          title="Check Zs against BS 7671 tables instantly"
          description="Enter your measured Ze and R1+R2 values into the Elec-Mate Zs calculator. It adds them, applies temperature correction, and checks the result against the maximum Zs tables for your protective device type and rating."
          icon={Gauge}
        />
      </>
    ),
  },
  {
    id: 'temperature-correction',
    heading: 'Temperature Correction: Why It Matters',
    content: (
      <>
        <p>
          Conductor resistance increases with temperature. Copper has a positive temperature
          coefficient — at 70°C (the maximum operating temperature for PVC insulated cables), the
          resistance is approximately 20% higher than at 10°C (a typical ambient temperature when
          cold measurements are taken).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">
            Temperature Correction Factors (BS 7671 Appendix 3)
          </h4>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PVC (thermoplastic) cables:</strong> Multiply measured R1+R2 by{' '}
                <strong>1.20</strong> to correct from ambient to 70°C operating temperature.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>XLPE (thermosetting) cables:</strong> Multiply measured R1+R2 by{' '}
                <strong>1.28</strong> to correct from ambient to 90°C operating temperature.
              </span>
            </li>
          </ul>
        </div>
        <p>When you calculate Zs at the design stage, you must use the corrected R1+R2 value:</p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4 text-center">
          <p className="text-white text-lg font-mono">Zs (design) = Ze + (R1+R2) x 1.20</p>
          <p className="text-white text-sm mt-2">For PVC cables. Use 1.28 for XLPE cables.</p>
        </div>
        <p>
          When comparing a <strong>measured</strong> Zs (taken during live testing at ambient
          temperature) against the BS 7671 maximum values, you should check that the measured value
          does not exceed 80% of the tabulated maximum (the IET On-Site Guide provides "rule of
          thumb" 80% values). This accounts for the fact that the measured Zs will increase when the
          cable reaches operating temperature under normal load.
        </p>
      </>
    ),
  },
  {
    id: 'maximum-zs-values',
    heading: 'Maximum Zs Values from BS 7671',
    content: (
      <>
        <p>
          BS 7671 Chapter 41 (Tables 41.2 to 41.5) lists the maximum earth fault loop impedance (Zs)
          for each type and rating of protective device. These values ensure the device disconnects
          within the required time — 0.4 seconds for final circuits and 5 seconds for distribution
          circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <h4 className="font-bold text-white mb-4">
            Maximum Zs for MCBs (0.4s Disconnection, 230V)
          </h4>
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-semibold">Rating (A)</th>
                <th className="text-left py-3 pr-4 font-semibold">Type B (ohms)</th>
                <th className="text-left py-3 pr-4 font-semibold">Type C (ohms)</th>
                <th className="text-left py-3 pr-4 font-semibold">Type D (ohms)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 pr-4">6</td>
                <td className="py-3 pr-4">7.67</td>
                <td className="py-3 pr-4">3.83</td>
                <td className="py-3 pr-4">1.92</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">10</td>
                <td className="py-3 pr-4">4.60</td>
                <td className="py-3 pr-4">2.30</td>
                <td className="py-3 pr-4">1.15</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">16</td>
                <td className="py-3 pr-4">2.87</td>
                <td className="py-3 pr-4">1.44</td>
                <td className="py-3 pr-4">0.72</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">20</td>
                <td className="py-3 pr-4">2.30</td>
                <td className="py-3 pr-4">1.15</td>
                <td className="py-3 pr-4">0.57</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">32</td>
                <td className="py-3 pr-4">1.44</td>
                <td className="py-3 pr-4">0.72</td>
                <td className="py-3 pr-4">0.36</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">40</td>
                <td className="py-3 pr-4">1.15</td>
                <td className="py-3 pr-4">0.57</td>
                <td className="py-3 pr-4">0.29</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">50</td>
                <td className="py-3 pr-4">0.92</td>
                <td className="py-3 pr-4">0.46</td>
                <td className="py-3 pr-4">0.23</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          For circuits protected by a 30 mA RCD (in addition to the overcurrent device), the maximum
          Zs is approximately 1667 ohms (calculated from 50V / 0.03A). This much higher limit means
          that circuits with high Zs values — such as long runs on TT systems — can still achieve
          the required disconnection time when RCD protection is provided.
        </p>
        <p>
          The IET On-Site Guide provides "80% of maximum Zs" values for field comparison — these
          account for temperature correction and are the values you should compare your measured Zs
          against during testing.
        </p>
      </>
    ),
  },
  {
    id: 'worked-examples',
    heading: 'Worked Examples',
    content: (
      <>
        <div className="space-y-6 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6">
            <h4 className="font-bold text-white mb-4">Example 1: Domestic Ring Final Circuit</h4>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>Circuit:</strong> 32 A ring final circuit, Type B MCB
              </li>
              <li>
                <strong>Cable:</strong> 2.5/1.5 mm² T+E, total ring length 50 m
              </li>
              <li>
                <strong>Ze (measured):</strong> 0.35 ohms (TN-C-S supply)
              </li>
              <li>
                <strong>R1+R2 (measured at furthest socket):</strong> 0.56 ohms
              </li>
              <li>
                <strong>Zs (calculated):</strong> 0.35 + 0.56 = <strong>0.91 ohms</strong>
              </li>
              <li>
                <strong>Maximum Zs (32 A Type B, 0.4s):</strong> 1.44 ohms
              </li>
              <li>
                <strong>80% of maximum:</strong> 1.15 ohms
              </li>
              <li>
                <strong>Result:</strong> 0.91 ohms is less than 1.15 ohms — <strong>PASS</strong>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6">
            <h4 className="font-bold text-white mb-4">Example 2: Lighting Circuit (Long Run)</h4>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>Circuit:</strong> 6 A Type B MCB, lighting radial
              </li>
              <li>
                <strong>Cable:</strong> 1.5/1.0 mm² T+E, 35 m run
              </li>
              <li>
                <strong>Ze (measured):</strong> 0.45 ohms
              </li>
              <li>
                <strong>R1+R2/m (from On-Site Guide):</strong> 30.20 milliohms/m
              </li>
              <li>
                <strong>R1+R2 (calculated at 20°C):</strong> 0.03020 x 35 = 1.057 ohms
              </li>
              <li>
                <strong>R1+R2 (corrected to 70°C):</strong> 1.057 x 1.20 ={' '}
                <strong>1.268 ohms</strong>
              </li>
              <li>
                <strong>Zs (design):</strong> 0.45 + 1.268 = <strong>1.718 ohms</strong>
              </li>
              <li>
                <strong>Maximum Zs (6 A Type B, 0.4s):</strong> 7.67 ohms
              </li>
              <li>
                <strong>Result:</strong> 1.718 ohms is well within 7.67 ohms — <strong>PASS</strong>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6">
            <h4 className="font-bold text-white mb-4">
              Example 3: Shower Circuit (Close to Limit)
            </h4>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <strong>Circuit:</strong> 40 A Type B MCB, shower radial
              </li>
              <li>
                <strong>Cable:</strong> 10/4 mm² T+E, 18 m run
              </li>
              <li>
                <strong>Ze (measured):</strong> 0.50 ohms
              </li>
              <li>
                <strong>R1+R2/m:</strong> 6.44 milliohms/m (10/4 mm² from tables)
              </li>
              <li>
                <strong>R1+R2 (calculated):</strong> 0.00644 x 18 = 0.116 ohms
              </li>
              <li>
                <strong>R1+R2 (corrected):</strong> 0.116 x 1.20 = 0.139 ohms
              </li>
              <li>
                <strong>Zs (design):</strong> 0.50 + 0.139 = <strong>0.639 ohms</strong>
              </li>
              <li>
                <strong>Maximum Zs (40 A Type B, 0.4s):</strong> 1.15 ohms
              </li>
              <li>
                <strong>80% of maximum:</strong> 0.92 ohms
              </li>
              <li>
                <strong>Result:</strong> 0.639 ohms is within 0.92 ohms — <strong>PASS</strong>
              </li>
            </ul>
            <p className="text-white text-sm mt-3">
              Note: If Ze were higher (for example, 0.80 ohms on a property far from the
              transformer), Zs would be 0.939 ohms — still within the maximum but above the 80% rule
              of thumb. This shows why{' '}
              <SEOInternalLink href="/guides/earthing-arrangements">Ze values</SEOInternalLink>{' '}
              matter for high-current circuits.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes in Zs Calculations',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Forgetting temperature correction.</strong> Comparing a cold-measured Zs
                directly with the BS 7671 maximum values without applying the 1.20 correction factor
                can give a false pass. The cable resistance at operating temperature is higher — if
                the measured value is close to the limit, it may exceed it when hot.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using the wrong table.</strong> Using the maximum Zs value for a Type B MCB
                when the circuit is actually protected by a Type C MCB (or vice versa) gives the
                wrong limit. Type C MCBs require a higher fault current to trip, so their maximum Zs
                values are lower (more restrictive).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not testing at the furthest point.</strong> Zs must be measured at the
                furthest point of the circuit — not at the first socket or a convenient mid-point.
                The furthest point has the highest R1+R2 and therefore the highest Zs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ignoring the CPC size.</strong> In a 2.5/1.5 mm² T+E cable, R2 (the CPC
                resistance) is higher than R1 (the phase resistance) because the CPC is 1.5 mm²
                while the phase is 2.5 mm². The CPC size has a significant impact on R1+R2 and
                therefore Zs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Not considering the{' '}
                  <SEOInternalLink href="/guides/prospective-fault-current-explained">
                    PFC
                  </SEOInternalLink>{' '}
                  relationship.
                </strong>{' '}
                Zs and PFC are inversely related. A high Zs means a low earth fault current. While
                this may still be within limits for disconnection time (especially with RCD
                protection), it should be considered alongside the{' '}
                <SEOInternalLink href="/tools/adiabatic-equation-calculator">
                  adiabatic equation
                </SEOInternalLink>{' '}
                check.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'using-elec-mate',
    heading: 'Using the Elec-Mate Zs Calculator',
    content: (
      <>
        <p>
          Elec-Mate includes a dedicated Zs calculator as part of its suite of 50+ electrical
          calculators for UK electricians:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Gauge className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Automatic Zs Verification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Enter Ze, R1+R2, the protective device type (B, C, or D), and the device rating.
                  The calculator applies temperature correction, computes Zs, and checks it against
                  the BS 7671 maximum values — giving a clear pass or fail result.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Built-In BS 7671 Tables</h4>
                <p className="text-white text-sm leading-relaxed">
                  All the maximum Zs values from Tables 41.2 to 41.5 are built into the calculator.
                  No need to look up the tables in the regulation book — select the device type and
                  rating and the correct maximum Zs is applied automatically.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">50+ Calculators in One App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Zs is one of over 50 calculators on Elec-Mate. Others include{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/voltage-drop-guide-bs-7671">
                    voltage drop
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/prospective-fault-current-explained">
                    PFC
                  </SEOInternalLink>
                  ,{' '}
                  <SEOInternalLink href="/guides/max-demand-calculation-guide">
                    max demand
                  </SEOInternalLink>
                  , adiabatic equation, conduit fill, trunking fill, power factor, diversity factor,
                  and{' '}
                  <SEOInternalLink href="/guides/three-phase-calculations">
                    three-phase power
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="All BS 7671 tables in your pocket"
          description="Stop flipping through the regulation book on site. Elec-Mate's Zs calculator has all the maximum Zs tables built in, plus temperature correction and 50+ other calculators. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EarthFaultLoopImpedancePage() {
  return (
    <GuideTemplate
      title="Earth Fault Loop Impedance Calculation | Zs Guide"
      description="Complete guide to earth fault loop impedance (Zs) calculation. The formula Zs = Ze + (R1+R2), temperature correction factors, maximum Zs values from BS 7671, worked examples for domestic circuits, and common mistakes to avoid."
      datePublished="2025-05-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Gauge}
      heroTitle={
        <>
          Earth Fault Loop Impedance:{' '}
          <span className="text-yellow-400">The Zs Calculation Explained</span>
        </>
      }
      heroSubtitle="Zs determines whether the protective device will disconnect fast enough to prevent electric shock. If it is too high, the circuit is unsafe. This guide walks through the formula, Ze, R1+R2, temperature correction, the maximum Zs tables from BS 7671, and worked examples for real circuits."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Earth Fault Loop Impedance"
      relatedPages={relatedPages}
      ctaHeading="Zs Calculator on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's 50+ calculators including Zs with automatic BS 7671 table lookup, cable sizing, voltage drop, PFC, and more. 7-day free trial, cancel anytime."
    />
  );
}
