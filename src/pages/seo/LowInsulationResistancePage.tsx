import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  AlertTriangle,
  Zap,
  ShieldCheck,
  ClipboardCheck,
  Calculator,
  Activity,
  CheckCircle2,
  Search,
  Cable,
  FileText,
  Gauge,
  Mic,
  ThermometerSun,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Low Insulation Resistance | Causes & Solutions';
const PAGE_DESCRIPTION =
  'Why is your insulation resistance low? Complete guide covering BS 7671 minimum values (1 MΩ), what counts as concerning (below 2 MΩ), causes including moisture, damaged cable, aged insulation, carbonised insulation, rodent damage, how to diagnose and fix, temperature effects, and three-phase considerations.';

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides/troubleshooting' },
  { label: 'Low Insulation Resistance', href: '/guides/low-insulation-resistance' },
];

const tocItems = [
  { id: 'what-counts-low', label: 'What Counts as Low?' },
  { id: 'causes', label: 'Causes of Low Insulation Resistance' },
  { id: 'how-to-diagnose', label: 'How to Diagnose' },
  { id: 'fixing-low-ir', label: 'Fixing Low Insulation Resistance' },
  { id: 'temperature-humidity', label: 'Temperature and Humidity Effects' },
  { id: 'three-phase', label: 'Three-Phase Considerations' },
  { id: 'elec-mate', label: 'Record Results with Elec-Mate' },
  { id: 'faq', label: 'FAQs' },
  { id: 'related', label: 'Related Guides' },
];

const keyTakeaways = [
  'Any insulation resistance reading below 1 MΩ is a failure per BS 7671 Table 61 and the circuit must not be energised until the fault is identified and corrected.',
  'Readings between 1 MΩ and 2 MΩ on older installations, while technically passing, indicate significant insulation deterioration and should be investigated further and monitored closely.',
  'Moisture ingress is the most common and most easily reversible cause of low insulation resistance — drying out affected enclosures and resealing cable entries often restores acceptable readings without cable replacement.',
  'Carbonised insulation from arcing or persistent overheating is a serious fire risk and cannot be repaired — the affected cable must be replaced entirely.',
  "Elec-Mate's schedule of tests auto-validates every insulation resistance reading against the BS 7671 Table 61 minimum and suggests the appropriate EICR observation code for failures.",
];

const faqs = [
  {
    question: 'What is the minimum acceptable insulation resistance per BS 7671?',
    answer:
      'BS 7671 Table 61 specifies minimum insulation resistance based on circuit voltage. For SELV/PELV circuits (up to 50 V), the test voltage is 250 V DC and the minimum is 0.5 MΩ. For standard circuits up to and including 500 V — which covers all domestic (230 V single-phase) and most commercial (400 V three-phase) installations — the test voltage is 500 V DC and the minimum is 1.0 MΩ. For circuits above 500 V, the test voltage is 1000 V DC and the minimum is 1.0 MΩ. These are absolute minimums. A healthy new installation should return readings of 200 MΩ or higher, and even older wiring in good condition should read above 2 MΩ.',
  },
  {
    question: 'Can moisture cause a low insulation resistance reading?',
    answer:
      'Yes, moisture is the single most common cause of low insulation resistance readings. Water is an excellent conductor, and even small amounts of moisture inside an electrical enclosure, conduit, or cable entry can create a conductive path between conductors and earth. This is particularly common in outdoor circuits, bathroom installations, circuits running through unheated loft spaces, underground cables with compromised outer sheathing, and circuits serving garden buildings or outbuildings. The key indicator is that the reading improves after the affected area is dried out. If you obtain a low reading, inspect all enclosures, junction boxes, and cable entries on the circuit for evidence of moisture. Drying the affected area with a heat gun (carefully) and resealing enclosures often restores acceptable readings without any cable replacement.',
  },
  {
    question: 'What is carbonised insulation and why is it dangerous?',
    answer:
      'Carbonised insulation occurs when PVC or rubber cable insulation has been subjected to persistent overheating or electrical arcing. The heat breaks down the polymer chains in the insulation material, converting it from an insulator into a partially conductive carbon track. This carbon track allows leakage current to flow between conductors, and the leakage current itself generates more heat, creating a positive feedback loop. Carbonised insulation is a serious fire risk because it can sustain arcing that ignites surrounding materials. Unlike moisture damage, carbonised insulation cannot be repaired — the affected cable section must be replaced entirely. Common locations include cables near halogen downlighters, cables routed close to heating pipes, and cables inside poorly ventilated enclosures that have been subjected to sustained high loads.',
  },
  {
    question: 'How do I locate where the insulation fault is on a circuit?',
    answer:
      'Locating an insulation fault requires systematic circuit splitting. Start by testing the entire circuit at the distribution board — if the reading is low, you know the fault exists but not where. Next, disconnect the circuit at the first junction box or accessory point, splitting it into two sections. Test each section independently. The section with the low reading contains the fault. Continue splitting that section at the next junction box or accessory point, testing each sub-section until you narrow the fault to a specific cable run between two known points. Visual inspection of that cable run often reveals the cause — water in a junction box, heat damage near a spotlight, a nail through the cable, or rodent damage. For long cable runs with no intermediate access points, an insulation fault locator instrument can help pinpoint the distance along the cable where the fault occurs.',
  },
  {
    question: 'Should I condemn a circuit with an insulation resistance of 1.5 MΩ?',
    answer:
      'A reading of 1.5 MΩ technically passes the BS 7671 Table 61 minimum of 1 MΩ, so it does not require immediate disconnection. However, 1.5 MΩ on its own is cause for concern and warrants further investigation. For a new installation, this reading would be very poor — new wiring should read 200 MΩ or higher. For an older installation (25+ years), 1.5 MΩ suggests significant insulation deterioration. The correct approach is to record the value on the EICR schedule of test results, assign an appropriate observation code (likely C3 — improvement recommended, or potentially C2 — potentially dangerous if trending downward from previous inspections), and recommend further investigation or rewiring of the affected circuit. Compare with previous test results if available — if the reading was 5 MΩ at the last inspection, the insulation is deteriorating and intervention is needed before it drops below 1 MΩ.',
  },
  {
    question: 'Does temperature affect insulation resistance readings?',
    answer:
      'Yes, temperature has a significant and well-documented effect on insulation resistance. As a widely accepted rule of thumb, insulation resistance approximately halves for every 10 degrees Celsius increase in temperature. A cable that reads 100 MΩ at 20 degrees Celsius might read only 50 MΩ at 30 degrees Celsius and 25 MΩ at 40 degrees Celsius. This happens because higher temperatures increase the mobility of charge carriers within the insulating material, allowing more leakage current to flow for a given applied voltage. This is important when testing in extreme conditions — a borderline reading taken on a hot summer day in an unventilated loft may pass comfortably when retested in cooler conditions. BS 7671 does not mandate temperature correction for insulation resistance, but experienced electricians always note ambient temperature when recording borderline results and consider retesting under more favourable conditions before recommending expensive remedial work.',
  },
];

const sections = [
  {
    id: 'what-counts-low',
    heading: 'What Counts as Low Insulation Resistance?',
    content: (
      <>
        <p>
          "Low" insulation resistance is defined by BS 7671 Table 61, which sets the absolute
          minimum acceptable value for circuits to be considered safe. However, there is a
          significant difference between the bare minimum pass value and what constitutes a
          genuinely healthy circuit. Understanding these thresholds is essential for accurate EICR
          reporting and for advising clients on the condition of their installation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Insulation Resistance Thresholds</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-red-400">Below 1 MΩ — Failure.</strong> The circuit does not
                meet the BS 7671 Table 61 minimum. It must not be energised until the fault is
                identified and corrected. This is a Code C1 (danger present) or C2 (potentially
                dangerous) observation on an EICR, depending on the severity and context.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">1 MΩ to 2 MΩ — Concerning.</strong> Technically
                passes the minimum, but in older installations this indicates significant insulation
                deterioration. For wiring over 25 years old, readings in this range suggest the
                insulation is approaching end of life. Likely a C3 (improvement recommended)
                observation, or C2 if trending downward from previous inspections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">
                  2 MΩ to 50 MΩ — Acceptable for aged wiring.
                </strong>{' '}
                Typical range for installations 15 to 40 years old in reasonable condition. PVC
                insulation degrades naturally over decades, and readings in this range indicate
                functional insulation with normal age-related deterioration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-green-400">Above 200 MΩ — Excellent.</strong> Expected for
                new installations and relatively new wiring (under 10 years). Readings this high
                indicate insulation in excellent condition.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Trend analysis is invaluable. If a circuit read 150 MΩ five years ago and now reads 8 MΩ,
          the insulation is deteriorating rapidly even though 8 MΩ is well above the minimum. This
          trend should be noted on the{' '}
          <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> as it may indicate
          an underlying issue such as persistent moisture ingress, overheating, or chemical
          degradation.
        </p>
      </>
    ),
  },
  {
    id: 'causes',
    heading: 'Causes of Low Insulation Resistance',
    content: (
      <>
        <p>
          A low insulation resistance reading means current can leak through the insulation between
          conductors or between a conductor and earth. Understanding the cause determines whether
          the fix is simple (dry out moisture) or substantial (replace cable). Here are the most
          common causes, in order of frequency.
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">1. Moisture Ingress</h3>
                <p className="text-white text-sm leading-relaxed">
                  The most common cause and the most easily reversible. Water inside junction boxes,
                  back boxes, conduit systems, trunking, or cable glands creates a conductive path
                  between conductors. Particularly prevalent in outdoor circuits, bathroom
                  installations, circuits routed through unheated lofts or cellars, underground
                  cables with damaged outer sheathing, and circuits serving garden buildings. Signs
                  include visible water droplets, corrosion on terminals, and readings that improve
                  in dry weather. Drying out the enclosure and resealing cable entries typically
                  restores acceptable readings.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">2. Damaged Cable</h3>
                <p className="text-white text-sm leading-relaxed">
                  Physical damage to cable insulation from nails, screws, staples, or drilling
                  during construction or DIY work. The conductor may still function perfectly — the
                  circuit carries current and everything appears to work — but the insulation
                  barrier is compromised. The damaged point creates a leakage path to earth through
                  the metallic fixing or surrounding building materials. Common in cables under
                  floorboards, behind plasterboard, and in loft spaces. A cable fault locator can
                  help identify the distance to the fault on long runs without visible access.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">3. Aged Insulation</h3>
                <p className="text-white text-sm leading-relaxed">
                  All insulation materials degrade over time. PVC insulation becomes brittle and
                  cracks after several decades, particularly in warm or UV-exposed environments.
                  Rubber insulation (found in pre-1970s installations) degrades faster than PVC,
                  becoming powdery and losing its insulating properties entirely. The TLC (tough
                  rubber-sheathed, lead-alloy covered) and VIR (vulcanised india rubber) cables
                  found in very old installations are particularly prone to deterioration. Aged
                  insulation typically shows as a gradual decline in IR readings across multiple
                  circuits, rather than a single circuit failure.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">4. Carbonised Insulation from Arcing</h3>
                <p className="text-white text-sm leading-relaxed">
                  When insulation is subjected to persistent overheating or electrical arcing, the
                  polymer chains break down and the material converts to carbon. Carbon is partially
                  conductive, creating a tracking path for leakage current. The leakage generates
                  further heat, accelerating the carbonisation in a dangerous positive feedback
                  loop. This is a serious fire risk. Carbonised insulation cannot be repaired — the
                  cable must be replaced. Common near halogen downlighters, immersion heaters, and
                  at loose connections where arcing has occurred over extended periods.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">5. Rodent Damage</h3>
                <p className="text-white text-sm leading-relaxed">
                  Mice and rats gnaw on cable insulation, exposing conductors and creating leakage
                  paths. This is common in loft spaces, floor voids, behind kitchen units, and in
                  garages or outbuildings. The damage may be intermittent — the exposed conductor
                  only creates a leakage path when it contacts a damp surface or the rodent itself
                  bridges the gap. Look for droppings and gnaw marks on cables during visual
                  inspection. All damaged cable sections must be replaced, and rodent proofing
                  should be recommended to prevent recurrence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'how-to-diagnose',
    heading: 'How to Diagnose Low Insulation Resistance',
    content: (
      <>
        <p>
          Diagnosing the cause and location of low insulation resistance requires a systematic
          approach. A blanket "the insulation is bad" conclusion is insufficient — you need to
          identify which circuit, which section of cable, and which cause, so that the remedial work
          is targeted and cost-effective.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              1
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Isolate the circuit and prove dead.</strong> Follow the{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                safe isolation procedure
              </SEOInternalLink>{' '}
              per HSE GS 38. Lock off the MCB and verify dead at the point of work.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              2
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Disconnect all equipment.</strong> Remove all
              appliances, luminaires, LED drivers, dimmer switches, SPDs, and any electronic
              equipment. The 500 V DC test voltage can damage these devices, and connected equipment
              provides parallel leakage paths that produce falsely low readings.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              3
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">
                Test the full circuit at the distribution board.
              </strong>{' '}
              Test between L-E, N-E, and L-N at 500 V DC. Record the readings. If all readings are
              above 1 MΩ, the circuit passes. If any reading is low, proceed to the next step.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              4
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Test individual circuits.</strong> If the combined test
              fails, disconnect circuits individually at the distribution board and test each one.
              Identify which specific circuit has the low reading.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              5
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Split the faulty circuit into sections.</strong>{' '}
              Disconnect at junction boxes or accessory positions to divide the circuit. Test each
              section separately. The section with the low reading contains the fault. Continue
              splitting until the fault is narrowed to a specific cable run.
            </p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
              6
            </span>
            <p className="text-white text-sm leading-relaxed">
              <strong className="text-white">Test between conductors.</strong> Once you have
              isolated the faulty section, test between all conductor combinations (L-E, N-E, L-N)
              to determine which conductors are affected. This helps identify the type of fault — an
              L-E fault suggests damage to the live insulation contacting the CPC or building
              fabric, while an L-N fault suggests direct damage between the two current-carrying
              conductors.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Schedule of Tests with Auto-Validation"
          description="Enter insulation resistance readings into Elec-Mate's schedule of test results and the app instantly validates every value against the BS 7671 Table 61 minimum of 1 MΩ. Failures are flagged in red, borderline readings are highlighted, and the app suggests the appropriate EICR observation code."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'fixing-low-ir',
    heading: 'Fixing Low Insulation Resistance',
    content: (
      <>
        <p>
          The correct fix depends entirely on the cause. Applying the wrong fix wastes time and
          money, so accurate diagnosis (as described above) is essential before starting remedial
          work.
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Moisture — Dry Out and Reseal</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              If moisture ingress is the cause, the fix is straightforward: dry out the affected
              enclosure, junction box, or cable entry using a heat gun (keep the temperature
              moderate to avoid further insulation damage), then reseal with appropriate IP-rated
              enclosures, cable glands, or sealant. Retest after drying to confirm readings have
              returned to an acceptable level. Address the source of the moisture ingress — a
              leaking roof, failed damp-proof course, missing weatherproof cover, or condensation in
              an unventilated space. Without addressing the root cause, the moisture will return and
              the readings will drop again.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Cable className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                Damaged Cable — Replace the Affected Section
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              If a cable has been damaged by a nail, screw, rodent, or mechanical impact, the
              damaged section must be replaced. For accessible cables (surface-mounted, in trunking,
              or in conduit), replace the damaged cable. For concealed cables behind plasterboard or
              under floors, expose the damaged section, replace or joint it using an appropriate BS
              7671-compliant junction box, and protect against future mechanical damage with cable
              covers or metal protective devices per Regulation 522.6.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">
                Aged or Carbonised Insulation — Rewire
              </h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              When the insulation has degraded due to age (rubber insulation in pre-1970s wiring) or
              carbonised from arcing/overheating, replacement is the only option. There is no way to
              repair degraded insulation in situ. For localised damage (e.g., carbonised cable near
              a single downlighter), replacing just the affected cable run may suffice. For
              widespread age-related degradation showing low readings across multiple circuits, a
              full or partial rewire is the appropriate recommendation. Record this on the{' '}
              <SEOInternalLink href="/guides/eicr-certificate">EICR</SEOInternalLink> with the
              appropriate observation code and classification.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'temperature-humidity',
    heading: 'Temperature and Humidity Effects on Readings',
    content: (
      <>
        <p>
          Environmental conditions significantly affect insulation resistance measurements, and
          understanding this is important for interpreting borderline readings and avoiding
          unnecessary condemnation of circuits.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Temperature Effect</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Insulation resistance approximately halves for every 10 degrees Celsius increase in
              temperature. This is because higher temperatures increase the mobility of charge
              carriers within the insulating material, allowing more leakage current to flow. A
              cable reading 200 MΩ at 20 degrees Celsius might read only 100 MΩ at 30 degrees
              Celsius, 50 MΩ at 40 degrees Celsius, and 25 MΩ at 50 degrees Celsius. Cables in warm
              environments — loft spaces in summer, behind boilers, near heating pipes — will always
              give lower readings than the same cable in a cool environment.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="w-5 h-5 text-yellow-400" />
              <h3 className="font-bold text-white text-lg">Humidity Effect</h3>
            </div>
            <p className="text-white text-sm leading-relaxed">
              High humidity deposits a thin film of moisture on cable surfaces and inside
              enclosures, creating surface leakage paths that reduce the measured insulation
              resistance. This is distinct from bulk moisture ingress — surface humidity affects
              readings even when there is no visible water. Readings taken on a hot, humid summer
              day in an unventilated loft will be measurably lower than readings taken on a cool,
              dry winter day on the same circuit. For borderline readings, note the ambient
              conditions on the schedule of test results and consider retesting under more
              favourable conditions.
            </p>
          </div>
        </div>
        <p>
          BS 7671 does not specify temperature or humidity correction factors for insulation
          resistance testing. However, experienced electricians always note ambient conditions when
          recording borderline results and use professional judgement when interpreting readings
          close to the 1 MΩ minimum. A reading of 1.2 MΩ taken at 35 degrees Celsius in high
          humidity may well be 3 MΩ or higher under standard conditions.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: 'Three-Phase Considerations',
    content: (
      <>
        <p>
          Three-phase circuits require additional conductor combinations and present some unique
          diagnostic challenges when low insulation resistance is found.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Three-Phase Testing Sequence for Low IR
          </h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 1 — Combined test to earth:</strong> Link
                L1, L2, L3, and N together. Test to earth. If this passes with a high reading, all
                four conductors have good insulation to earth. If low, proceed to individual tests.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 2 — Individual conductor to earth:</strong>{' '}
                Test L1-E, L2-E, L3-E, and N-E independently. This identifies which specific
                conductor has the insulation fault to earth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 3 — Between conductors:</strong> Test
                L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N. A low reading between two specific conductors
                indicates insulation breakdown between those conductors — often caused by mechanical
                damage where both cores are in the same cable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Three-phase motors and drives must always be disconnected before insulation resistance
          testing. Motor windings have their own insulation resistance characteristics and provide
          low-impedance parallel paths that mask cable insulation faults. Test motor windings
          separately from the circuit cabling.
        </p>
        <p>
          In three-phase installations, a low reading on a single phase may indicate localised
          damage to one core of a multi-core cable, while low readings across all phases suggest a
          more general problem such as moisture ingress into the cable tray or conduit system
          serving all three phases.
        </p>
      </>
    ),
  },
  {
    id: 'elec-mate',
    heading: 'Record and Validate Results with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate is built for on-site electrical testing and certification. For insulation
          resistance testing, the app provides several features that save time, reduce errors, and
          ensure BS 7671 compliance.
        </p>
        <SEOAppBridge
          title="Auto-validated Schedule of Tests"
          description="Enter insulation resistance readings into the schedule of test results and Elec-Mate instantly validates every value against the BS 7671 Table 61 minimum of 1 MΩ. Failures are flagged automatically and the app suggests the appropriate EICR observation code (C1, C2, or C3) based on the severity."
          icon={ClipboardCheck}
        />
        <SEOAppBridge
          title="Voice to Test Results"
          description="On site with probes in one hand and your test instrument in the other? Just speak: 'Ring 1, insulation resistance, 200 meg.' Elec-Mate fills in the schedule for you. Hands-free data entry designed for how electricians actually work."
          icon={Mic}
        />
        <p>
          The <SEOInternalLink href="/guides/eicr-certificate">EICR form</SEOInternalLink> records
          insulation resistance results per circuit alongside all other test results. The{' '}
          <SEOInternalLink href="/guides/ai-tools-for-electricians">Defect Code AI</SEOInternalLink>{' '}
          classifies the severity of low insulation resistance findings and suggests the appropriate
          observation code and remedial action. No need to memorise the BS 7671 tables or manually
          cross-reference observation codes.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description:
      'Full guide to performing IR tests — test voltages, conductor combinations, procedure.',
    icon: Gauge,
    category: 'Testing',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description: 'Low IR causes earth leakage that trips RCDs — diagnosis and solutions.',
    icon: ShieldCheck,
    category: 'Troubleshooting',
  },
  {
    href: '/guides/earth-fault-loop-impedance-too-high',
    title: 'Earth Fault Loop Impedance Too High',
    description: 'When Zs exceeds the maximum for the protective device — related fault scenarios.',
    icon: Activity,
    category: 'Testing',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description:
      'The correct dead and live testing order per GN3 — IR testing is test number three.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Certificate',
    description:
      'Complete guide to Electrical Installation Condition Reports and observation codes.',
    icon: FileText,
    category: 'Certification',
  },
  {
    href: '/tools/electrical-testing-calculators',
    title: '70+ Electrical Calculators',
    description: 'Zs lookup, R1+R2, cable sizing, voltage drop, and more built-in calculators.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LowInsulationResistancePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-09-05"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Low Insulation Resistance?
          <br />
          <span className="text-yellow-400">Causes, Diagnosis & How to Fix</span>
        </>
      }
      heroSubtitle="A low insulation resistance reading means current can leak where it should not — creating a risk of electric shock, fire, and nuisance RCD tripping. This guide covers what counts as low per BS 7671, every common cause (moisture, damage, aged insulation, carbonisation, rodent damage), how to diagnose and locate the fault, and how to fix it."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Auto-Validate Insulation Resistance on Site"
      ctaSubheading="Schedule of tests with BS 7671 validation, voice test entry, defect code AI, and digital EICR forms. Join 430+ UK electricians. 7-day free trial, cancel anytime."
    />
  );
}
