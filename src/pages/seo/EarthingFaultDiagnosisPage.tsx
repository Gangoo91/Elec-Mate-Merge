import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Search,
  ShieldCheck,
  GraduationCap,
  FileCheck2,
  Cable,
  Brain,
  Wrench,
  Activity,
  Ruler,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Earthing Faults', href: '/guides/earthing-fault-diagnosis' },
];

const tocItems = [
  { id: 'what-is-earth-fault', label: 'What Is an Earth Fault?' },
  { id: 'symptoms', label: 'Symptoms of Earth Faults' },
  { id: 'insulation-resistance', label: 'Insulation Resistance Testing' },
  { id: 'half-split-method', label: 'The Half-Split Method' },
  { id: 'clamp-meter', label: 'Earth Leakage Clamp Meter Technique' },
  { id: 'common-locations', label: 'Common Earth Fault Locations' },
  { id: 'intermittent-faults', label: 'Dealing with Intermittent Earth Faults' },
  { id: 'recording-results', label: 'Recording and Reporting Results' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An earth fault is current flowing from a live conductor to earth through an unintended path — typically caused by insulation breakdown in cables, accessories, or appliances.',
  'Insulation resistance testing at 500V DC is the primary method for detecting earth faults. The minimum acceptable reading is 1M ohm, but readings below 2M ohm should be investigated.',
  'The half-split method is the fastest way to locate an earth fault on a circuit — disconnect at the midpoint and test each half separately, narrowing down the fault location.',
  'An earth leakage clamp meter can detect earth faults on live circuits without disconnecting, measuring the imbalance between line and neutral currents.',
  'Elec-Mate AI fault diagnosis helps electricians interpret insulation resistance readings, identify the most likely fault location, and generate the correct observation codes.',
];

const faqs = [
  {
    question: 'What causes an earth fault in electrical wiring?',
    answer:
      'An earth fault occurs when current flows from a live conductor to earth through a path other than the intended circuit. The most common causes are: deteriorated cable insulation (due to age, heat, UV exposure, or physical damage), moisture ingress into junction boxes, back boxes, or outdoor enclosures, a nail or screw driven through a cable during building work, insulation failure in an appliance connected to the circuit, rats or mice chewing through cable insulation, and heat damage from cables in contact with hot pipes or running through insulation without adequate derating. The earth fault allows current to flow to earth, which is detected by the RCD as an imbalance between the line and neutral currents, causing it to trip.',
  },
  {
    question: 'How do you test for an earth fault?',
    answer:
      'The primary test is insulation resistance testing using a dedicated insulation resistance tester (often called a megger). The test applies 500V DC between the live conductors and earth, and measures the resistance of the insulation. For a circuit to be considered satisfactory, the insulation resistance must be at least 1M ohm (1,000,000 ohms). A reading significantly below this indicates insulation breakdown — the lower the reading, the more severe the fault. Before testing, the circuit must be isolated, all loads disconnected, all switches closed (to test the entire circuit), and any electronic equipment or surge protection devices disconnected (as the 500V DC test voltage can damage them). The test is carried out between Line and Earth, Neutral and Earth, and Line and Neutral.',
  },
  {
    question: 'What is the half-split method for finding earth faults?',
    answer:
      'The half-split method is a systematic technique for locating a fault on a circuit by progressively narrowing down the fault location. Start by disconnecting the circuit at its approximate midpoint (for example, at a junction box or accessory halfway along the cable run). Test the insulation resistance of each half separately. The half with the low reading contains the fault. Then split that half in two and repeat. Each step eliminates 50% of the circuit, so even a long circuit with many accessories can be narrowed down to a specific section in just 3-4 steps. For a ring final circuit, the fault can be located by disconnecting one leg of the ring at the consumer unit and testing each leg separately, then applying the half-split to the faulty leg.',
  },
  {
    question: 'Can an earth fault be intermittent?',
    answer:
      'Yes, and intermittent earth faults are among the most frustrating to diagnose. The fault may only appear under specific conditions: when the property is warm (thermal expansion of cables causes a damaged section to make contact with metalwork), when it rains (moisture ingress into an outdoor junction box or a crack in conduit), when a specific appliance is in a certain mode (for example, a washing machine only faults during the spin cycle when vibration moves a damaged cable), or when the humidity is high (moisture lowers the insulation resistance of aged cables without an obvious water ingress point). If insulation resistance testing when you arrive on site shows satisfactory readings, but the RCD has been tripping, consider leaving the circuit live and monitoring with an earth leakage clamp meter over a period of time to catch the fault when it occurs.',
  },
  {
    question: 'What insulation resistance readings mean a fault?',
    answer:
      'Under BS 7671 (Table 61), the minimum acceptable insulation resistance is 1M ohm for circuits operating at 500V or below (which includes all standard domestic circuits tested at 500V DC). However, this is the absolute minimum — a new installation should give readings of 200M ohm or higher. In practice, readings between 1M and 2M ohm should be investigated, as they indicate deteriorating insulation that will likely fail in the future. Readings between 0.5M and 1M ohm are a C2 (Potentially Dangerous) defect. Readings below 0.5M ohm or a dead short (close to 0 ohm) are a C1 (Danger Present) defect requiring immediate action. A reading that is lower on the Line-Earth test than the Neutral-Earth test (or vice versa) helps identify which conductor has the insulation breakdown.',
  },
  {
    question: 'How does an earth leakage clamp meter work?',
    answer:
      'An earth leakage clamp meter measures the difference between the current flowing in the line conductor and the current returning in the neutral conductor. In a healthy circuit, these should be equal — all current that flows out through the line should return through the neutral. If some current is leaking to earth through a fault, the line current will be higher than the neutral current. The clamp meter detects this imbalance. To use it, clamp around both the line and neutral conductors together (not the earth). In a healthy circuit, the reading should be 0mA or very close to it. Any reading indicates earth leakage. An RCD will trip at 30mA (or 50% of its rated sensitivity, so potentially 15mA), so readings above 10-15mA on a 30mA RCD circuit explain tripping behaviour. The advantage of this method is that it can be used on a live circuit — you do not need to isolate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'In-depth guide to RCD tripping causes — earth faults are the primary reason an RCD trips.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-test-insulation-resistance',
    title: 'How to Test Insulation Resistance',
    description:
      'Step-by-step guide to insulation resistance testing including test voltages, pass criteria, and recording.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/electric-shock-from-tap',
    title: 'Electric Shock from Tap',
    description:
      'Earth faults on water-connected appliances can energise pipework — diagnosis and emergency response.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'TN-S, TN-C-S, and TT systems — understanding earthing is essential for earth fault diagnosis.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Record insulation resistance results and generate EICR certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with structured courses covering all testing methods including insulation resistance.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-earth-fault',
    heading: 'What Is an Earth Fault?',
    content: (
      <>
        <p>
          An earth fault is an unintended current path from a live conductor to earth. In a healthy
          circuit, all current flows from the supply through the line conductor, through the load,
          and back through the neutral conductor. No current flows through the earth conductor — it
          is there purely as a safety path.
        </p>
        <p>
          When the insulation on a cable breaks down, or when a live conductor comes into contact
          with earthed metalwork, some or all of the current takes a shortcut to earth. This is an
          earth fault. The consequences depend on the magnitude of the fault current and the
          protection in place:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-impedance earth fault</strong> — a small leakage current flows to earth
                through partially degraded insulation. The RCD detects the imbalance and trips. This
                is the most common type and causes{' '}
                <SEOInternalLink href="/guides/rcd-keeps-tripping">RCD tripping</SEOInternalLink>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low-impedance earth fault</strong> — a solid connection between live and
                earth (for example, a nail through a cable). A large fault current flows, which
                should trip the MCB or fuse rapidly. The earth fault loop impedance (Zs) determines
                how much current flows and how quickly the protective device operates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth leakage without tripping</strong> — if the leakage is below the RCD
                sensitivity (for example, 10mA on a 30mA RCD), the RCD does not trip. The leakage
                may still pose a shock risk and waste energy. Cumulative leakage from multiple
                circuits on the same RCD can cause nuisance tripping.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Understanding the type and severity of the earth fault determines the diagnostic approach
          and the urgency of the repair.
        </p>
      </>
    ),
  },
  {
    id: 'symptoms',
    heading: 'Symptoms of Earth Faults',
    content: (
      <>
        <p>
          Earth faults manifest in several ways, depending on the severity of the insulation
          breakdown and the protection in place:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD tripping repeatedly.</strong> The most common symptom. The RCD detects
                earth leakage and disconnects. If the fault is intermittent, the tripping appears
                random.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB tripping.</strong> A low-impedance earth fault (solid connection to
                earth) draws enough current to trip the MCB. The MCB will not reset or trips
                immediately on reset.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/electric-shock-from-tap">
                    Tingling or shock from metalwork
                  </SEOInternalLink>
                  .
                </strong>{' '}
                If the earth fault energises exposed metalwork (appliance casings, pipework), anyone
                touching it may receive a shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell or discolouration at an accessory.</strong> A high-resistance
                earth fault can generate heat at the point of contact, potentially leading to arcing
                and fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher than expected electricity bills.</strong> Earth leakage current
                flowing to earth is wasted energy. On larger installations, cumulative earth leakage
                can add measurably to energy costs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'insulation-resistance',
    heading: 'Insulation Resistance Testing: The Primary Diagnostic Tool',
    content: (
      <>
        <p>
          Insulation resistance (IR) testing is the most important test for detecting and
          quantifying earth faults. The test applies a DC voltage between the conductors and
          measures the resistance of the insulation separating them.
        </p>
        <p>
          For standard domestic circuits (230V), the test voltage is 500V DC. The minimum acceptable
          insulation resistance under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> Table
          61 is 1M ohm. However, a new installation should read 200M ohm or higher — the 1M ohm
          minimum is a threshold below which the insulation is considered unsafe.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Above 2M ohm:</strong> satisfactory. The insulation is in good condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1M to 2M ohm:</strong> marginal. The insulation is deteriorating and should
                be monitored. Consider a C3 (Improvement Recommended) observation on the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>0.5M to 1M ohm:</strong> unsatisfactory. The insulation is failing. This is
                a C2 (Potentially Dangerous) defect. The circuit should be investigated and the
                fault rectified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ruler className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Below 0.5M ohm:</strong> dangerous. The insulation has failed. This is a C1
                (Danger Present) defect requiring immediate action. The circuit should be isolated
                until the fault is repaired.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Before testing, ensure: the circuit is{' '}
          <SEOInternalLink href="/guides/safe-isolation-procedure">safely isolated</SEOInternalLink>
          , all loads and appliances are disconnected, all switches are in the closed (on) position
          to include as much of the circuit as possible, neon indicators and dimmer switches are
          disconnected (the 500V test voltage can damage them), and SPDs (surge protection devices)
          are disconnected.
        </p>
        <p>
          Test between: Line and Earth, Neutral and Earth, and Line and Neutral. Record all three
          readings. The lowest reading identifies the worst insulation and indicates which conductor
          pair has the fault.
        </p>
      </>
    ),
  },
  {
    id: 'half-split-method',
    heading: 'The Half-Split Method: Finding the Fault Fast',
    content: (
      <>
        <p>
          Once insulation resistance testing has identified a faulty circuit, the half-split method
          is the fastest way to locate the exact position of the fault. The principle is simple:
          divide the circuit in half, test each half, and the faulty half contains the fault. Then
          divide that half in two and repeat.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Identify the midpoint of the circuit.</strong> For a radial circuit, this is
              the junction box or accessory approximately halfway along the cable run. For a ring
              final circuit, open the ring at the consumer unit and test each leg separately first.
            </li>
            <li>
              <strong>Disconnect at the midpoint.</strong> Open the connection at the midpoint
              accessory or junction box.
            </li>
            <li>
              <strong>Test each half.</strong> Apply the insulation resistance test to each half
              separately (consumer unit end and far end). The half with the low reading contains the
              fault.
            </li>
            <li>
              <strong>Repeat.</strong> Find the midpoint of the faulty half, disconnect, and test
              again. Each step eliminates 50% of the remaining circuit.
            </li>
            <li>
              <strong>Narrow down to the section.</strong> In 3-4 steps, you can typically identify
              the specific cable section or accessory with the fault. On a circuit with 8
              accessories, you can locate the fault in just 3 splits.
            </li>
          </ol>
        </div>
        <p>
          The half-split method is far more efficient than the alternative approach of disconnecting
          every accessory one at a time. For a circuit with 12 accessories, the sequential approach
          could take 12 tests; the half-split takes 4.
        </p>
        <SEOAppBridge
          title="AI guides you through earth fault diagnosis"
          description="Enter your insulation resistance readings and circuit details. Elec-Mate AI suggests the most efficient half-split strategy, identifies the likely fault type, and generates the correct observation code for the EICR."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'clamp-meter',
    heading: 'Earth Leakage Clamp Meter Technique',
    content: (
      <>
        <p>
          An earth leakage clamp meter is an invaluable tool for diagnosing earth faults on live
          circuits. Unlike insulation resistance testing, which requires the circuit to be isolated,
          a clamp meter works with the circuit energised and under load — making it ideal for
          intermittent faults that only appear under specific conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How it works:</strong> clamp around both the line and neutral conductors of
                the circuit together (not the earth). In a healthy circuit, the magnetic fields from
                the line and neutral cancel out (because the currents are equal and opposite), and
                the meter reads zero. Any imbalance — line current not equalling neutral current —
                means current is leaking to earth through a fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interpreting readings:</strong> a healthy circuit should read 0mA or very
                close (typically less than 3.5mA for a standard domestic circuit). Readings above
                3.5mA indicate leakage. Readings above 10mA on a 30mA RCD circuit explain tripping
                (the RCD may trip at as little as 15mA — 50% of rated sensitivity). Readings above
                30mA indicate a significant fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Using it at the consumer unit:</strong> clamp each circuit in turn at the
                consumer unit to identify which circuit has the highest leakage. Then follow the
                faulty circuit to its accessories, clamping at each point to narrow down where the
                leakage is entering the earth path.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Earth leakage clamp meters with mA resolution (0.1mA or better) are available from major
          test equipment manufacturers. Some multifunction testers include an earth leakage clamp as
          an accessory. For intermittent faults, a clamp meter with data logging capability is ideal
          — leave it clamped on the circuit and record the leakage over 24-48 hours.
        </p>
      </>
    ),
  },
  {
    id: 'common-locations',
    heading: 'Common Earth Fault Locations',
    content: (
      <>
        <p>
          Experience teaches you where earth faults are most likely to occur. Knowing the common
          locations speeds up diagnosis:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Outdoor Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Garden lighting, external sockets, and outbuilding supplies are exposed to
                  moisture, UV, and physical damage. Junction boxes with degraded seals are a common
                  entry point for water. Check IP ratings and the condition of all outdoor
                  enclosures.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Under-Floor and Ceiling Voids</h4>
                <p className="text-white text-sm leading-relaxed">
                  Cables in floor voids are vulnerable to rodent damage and to screws driven through
                  floorboards. Cables in ceiling voids can be damaged by storage (items placed on
                  cables in loft spaces) or by insulation being packed tightly against cables,
                  causing overheating and eventual insulation breakdown.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Kitchens and Bathrooms</h4>
                <p className="text-white text-sm leading-relaxed">
                  Moisture and steam cause insulation degradation over time. Back boxes behind
                  kitchen splashbacks can accumulate moisture. Bathroom extract fan connections and
                  shower isolator switches are common fault points.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Entry Points</h4>
                <p className="text-white text-sm leading-relaxed">
                  Where cables pass through walls, floors, or ceilings, the cable can chafe against
                  masonry or steelwork, wearing through the sheath and insulation over time. Cables
                  without grommets through metal back boxes are particularly vulnerable.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          For aged installations (20+ years), the insulation resistance of the entire circuit may be
          deteriorating rather than there being a single point fault. In these cases, a general low
          IR reading across the whole circuit (for example, 3-5M ohm on every section) suggests the
          cable insulation is reaching the end of its serviceable life and a rewire should be
          recommended.
        </p>
      </>
    ),
  },
  {
    id: 'intermittent-faults',
    heading: 'Dealing with Intermittent Earth Faults',
    content: (
      <>
        <p>
          Intermittent earth faults are the most challenging to diagnose. You arrive on site, test
          everything, get satisfactory readings — but the customer insists the RCD keeps tripping.
          The fault is real; it is just not present when you test.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Temperature-dependent faults.</strong> The insulation resistance of PVC
                cable decreases as temperature rises. A cable that tests at 5M ohm at 15 degrees C
                may drop to 1M ohm at 40 degrees C (for example, in an insulated loft during
                summer). Test under the conditions that trigger the fault if possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Moisture-dependent faults.</strong> Water ingress during rain can lower
                insulation resistance temporarily. Once the water dries, the readings recover. Check
                outdoor junction boxes, cable entries, and any areas where water could reach the
                wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load-dependent faults.</strong> Some faults only manifest when the circuit
                is under load — for example, vibration from a washing machine spin cycle moves a
                damaged cable into contact with earthed metalwork. The fault clears when the machine
                stops.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use data logging.</strong> Leave an earth leakage clamp meter with data
                logging on the suspect circuit for 24-48 hours. This captures the leakage when the
                fault occurs, even if you are not on site. The timestamp helps correlate the fault
                with environmental conditions (weather, appliance usage, time of day).
              </span>
            </li>
          </ul>
        </div>
        <p>
          When dealing with intermittent faults, communicate clearly with the customer. Explain that
          the fault exists but is not present during your visit, and outline the plan (data logging,
          revisit under fault conditions, or systematic elimination of possible causes).
          Intermittent faults can require multiple visits — price accordingly.
        </p>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording and Reporting Earth Fault Test Results',
    content: (
      <>
        <p>
          Whether you are carrying out a periodic inspection (EICR) or a fault-finding visit,
          accurate recording of insulation resistance results is essential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On the EICR:</strong> record insulation resistance readings for every
                circuit in the Schedule of Test Results (Schedule C). Record the readings for L-E,
                N-E, and L-N. Any reading below 1M ohm requires an observation code — C2 for
                readings between 0.5M and 1M ohm, C1 for readings below 0.5M ohm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Observation description:</strong> describe the fault clearly — for example,
                "Insulation resistance on circuit 4 (ring final, kitchen) L-E = 0.3M ohm at consumer
                unit. Half-split method identified fault between JB at point X and double socket at
                point Y. Cable insulation damaged by nail penetration."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After remedial work:</strong> retest and record the improved insulation
                resistance. The post-repair reading confirms the fault has been fixed. Issue an
                Electrical Installation Certificate (EIC) or Minor Works Certificate for the
                remedial work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate makes recording straightforward — speak your test results using voice entry, and
          the app fills in the schedule of test results. The AI automatically flags any readings
          below the minimum threshold and suggests the correct{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code
          </SEOInternalLink>
          .
        </p>
        <SEOAppBridge
          title="Record test results by voice, on site"
          description="Elec-Mate voice entry lets you speak insulation resistance readings while your hands are on the test leads. AI flags low readings, suggests observation codes, and generates the EICR automatically. 7-day free trial."
          icon={Brain}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EarthingFaultDiagnosisPage() {
  return (
    <GuideTemplate
      title="Earthing Fault Diagnosis | Finding Earth Faults"
      description="How to find earth faults in electrical installations. Expert guide covering insulation resistance testing, the half-split method, earth leakage clamp meter technique, common fault locations, and intermittent faults. For qualified electricians."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Search}
      heroTitle={
        <>
          Earthing Fault Diagnosis:{' '}
          <span className="text-yellow-400">Finding Earth Faults Systematically</span>
        </>
      }
      heroSubtitle="Earth faults cause RCD tripping, electric shock, and fire risk. This guide covers the systematic approach to finding them — insulation resistance testing, the half-split method, earth leakage clamp metering, and dealing with intermittent faults that disappear when you arrive on site."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Earth Fault Diagnosis"
      relatedPages={relatedPages}
      ctaHeading="AI-Powered Fault Diagnosis on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for AI fault diagnosis, voice test entry, and digital EICR certificates. 7-day free trial, cancel anytime."
    />
  );
}
