import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Search,
  Shield,
  AlertTriangle,
  Zap,
  FileCheck2,
  ClipboardCheck,
  GraduationCap,
  Home,
  Camera,
  Send,
  Wrench,
  Brain,
  Activity,
  BookOpen,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Fault Finding Guide', href: '/guides/electrical-fault-finding-guide' },
];

const tocItems = [
  { id: 'systematic-approach', label: 'The Systematic Approach' },
  { id: 'common-fault-types', label: 'Common Fault Types' },
  { id: 'half-split-method', label: 'The Half-Split Method' },
  { id: 'logical-process', label: 'Logical Fault Finding Process' },
  { id: 'test-equipment', label: 'Test Equipment for Fault Finding' },
  { id: 'insulation-faults', label: 'Finding Insulation Resistance Faults' },
  { id: 'earth-faults', label: 'Finding Earth Faults' },
  { id: 'recording-findings', label: 'Recording Your Findings' },
  { id: 'for-electricians', label: 'For Electricians: Efficient Fault Finding' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Effective fault finding follows a systematic, logical process — not random testing. Start with information gathering (symptoms, history, what changed), then form a hypothesis, test it, and narrow down the location.',
  'The half-split method is the most efficient technique for locating faults on long circuits: disconnect at the midpoint, test both halves, then repeat on the faulty half until the fault location is isolated.',
  'Common domestic fault types include insulation breakdown (low IR readings), open circuits (broken conductors), high-resistance joints (overheating connections), short circuits, and earth faults.',
  'Always carry out safe isolation before any fault finding work — follow the GS38 procedure with a proving unit and lock-off, as outlined in the Safe Isolation Procedure.',
  'Elec-Mate helps electricians record fault finding results, generate Minor Works Certificates for repairs, and price remedial work — all on site, all on your phone.',
];

const faqs = [
  {
    question: 'What is the half-split method in electrical fault finding?',
    answer:
      'The half-split method (also called the binary search method) is the most efficient technique for locating a fault on a circuit. Instead of testing from one end of the circuit to the other (which could take many tests), you disconnect the circuit at its approximate midpoint and test each half separately. The fault will be in one half. You then split that half again at its midpoint and test both quarters. The fault will be in one quarter. You repeat this process until the fault is isolated to a specific section of cable or a specific accessory. For a ring circuit with 20 sockets, for example, testing from one end to the other sequentially could take up to 20 tests. Using the half-split method, you can locate the fault in as few as 4 or 5 tests. The method works for any type of fault — open circuits, short circuits, earth faults, and insulation resistance faults. It requires disconnecting the circuit from both ends at the consumer unit, which is why safe isolation is essential before you begin.',
  },
  {
    question: 'Why does my RCD keep tripping and how do I find the cause?',
    answer:
      'An RCD trips when it detects an imbalance between the live and neutral conductors — meaning current is leaking to earth somewhere in the circuit. Common causes include: a faulty appliance (damaged cable, internal insulation breakdown, or water ingress); damaged cable insulation in the fixed wiring (caused by physical damage, rodent damage, or deterioration over time); moisture in an accessory (particularly outdoor sockets, bathrooms, or kitchens); a neutral-to-earth fault (where the neutral conductor is inadvertently connected to earth); or a faulty RCD itself. To find the cause: first, unplug all appliances on the affected circuits and try resetting the RCD. If it stays on, plug appliances back in one at a time — the faulty appliance will trip the RCD when reconnected. If the RCD still trips with all appliances unplugged, the fault is in the fixed wiring. Carry out insulation resistance testing on each circuit individually to find the circuit with the fault, then use the half-split method to locate the fault on that circuit.',
  },
  {
    question: 'What test equipment do I need for electrical fault finding?',
    answer:
      'The essential test instruments for fault finding are: a multifunction tester (MFT) that can measure insulation resistance, continuity, earth fault loop impedance, and RCD trip times — this is the primary instrument for most fault finding work; a proving unit (voltage indicator tester) compliant with GS38 for safe isolation verification; a clamp meter for measuring load current and detecting current imbalance without disconnecting conductors; and a non-contact voltage detector for quick identification of live conductors. Additional useful tools include: a megger (high-voltage insulation resistance tester) for testing cables at higher test voltages; a thermal imaging camera for detecting hot spots caused by high-resistance joints; and a cable tracer for identifying cable routes where the wiring layout is unknown. All test instruments should be calibrated and within their calibration date. The proving unit must be used before and after every safe isolation to confirm the instrument is working correctly.',
  },
  {
    question: 'How do I find a high-resistance joint?',
    answer:
      'A high-resistance joint is a connection where the contact area has deteriorated — through corrosion, loosening, or mechanical damage — creating resistance that generates heat under load. High-resistance joints are dangerous because they can cause overheating, arcing, and fire. They may not be detected by standard overcurrent protection. Finding a high-resistance joint requires a combination of techniques: visual inspection (look for scorch marks, discolouration, melted insulation, or signs of overheating at accessories and junction boxes); thermal imaging (a thermal camera will show the hot spot clearly — the joint will be significantly hotter than surrounding connections); voltage drop testing (measure the voltage at the consumer unit and at the affected accessory under load — an excessive voltage drop indicates a high-resistance path); and continuity testing (measure the resistance of the conductor and compare it to the expected value for the cable size and length — a higher-than-expected reading indicates a high-resistance joint). Once located, the joint must be remade or the affected section of cable replaced.',
  },
  {
    question: 'What is the difference between a short circuit and an earth fault?',
    answer:
      'A short circuit occurs when the live conductor makes direct contact with the neutral conductor, creating a low-resistance path that bypasses the load. This causes a very high current flow — the prospective fault current — which should be detected and disconnected by the MCB within milliseconds. Short circuits are typically caused by physical damage to cables (nail through a cable, crushed cable), deteriorated insulation, or incorrect wiring at an accessory. An earth fault occurs when the live conductor makes contact with the earth conductor, the metallic enclosure of equipment, or any earthed metalwork. This causes current to flow through the earth path rather than the neutral return. Earth faults are detected by RCDs (which sense the current imbalance) and also by overcurrent protection if the fault current is high enough. Earth faults are typically caused by insulation breakdown, moisture ingress, or cable damage. An earth fault is more dangerous to people because the fault current flows through metalwork that a person could touch.',
  },
  {
    question: 'How do I test insulation resistance during fault finding?',
    answer:
      'Insulation resistance testing during fault finding follows the same principles as during a periodic inspection, but with a more targeted approach. First, isolate the circuit at the consumer unit and confirm isolation with a proving unit. Disconnect all loads and accessories that could give misleading readings (electronic dimmers, RCDs, SPDs, etc.). Set your MFT to insulation resistance mode at the appropriate test voltage (500V DC for standard 230V circuits). Test between live and neutral, live and earth, and neutral and earth. A reading below 1 megohm indicates a fault. For a standard domestic circuit, you would expect readings well above 2 megohms — typically 100 megohms or more for healthy cable insulation. If you get a low reading, use the half-split method to narrow down the location. Disconnect the circuit at its midpoint (usually by disconnecting at an intermediate accessory) and test each half separately. The half with the low reading contains the fault. Continue splitting until you isolate the fault to a specific section of cable or accessory.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'Why your RCD trips, how to identify the faulty circuit, and systematic troubleshooting steps.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-test',
    title: 'Insulation Resistance Testing',
    description:
      'How to carry out insulation resistance testing, test voltages, minimum values, and common issues.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/safe-isolation-procedure',
    title: 'Safe Isolation Procedure',
    description: 'Step-by-step safe isolation procedure — GS38, proving units, and lock-off.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanner and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/continuity-testing-r1-r2',
    title: 'Continuity Testing (R1+R2)',
    description: 'How to carry out R1+R2 continuity testing on ring and radial circuits.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'systematic-approach',
    heading: 'The Systematic Approach to Fault Finding',
    content: (
      <>
        <p>
          Effective electrical fault finding is a skill that separates competent electricians from
          the rest. It is not about random testing or guesswork — it is a systematic, logical
          process that starts with gathering information and ends with a confirmed diagnosis and
          repair.
        </p>
        <p>The systematic approach follows a simple framework:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Gather information.</strong> What are the symptoms? When did the problem
              start? Has anything changed recently (new appliance, building work, weather event)?
              What has the customer already tried? What does the consumer unit look like (any
              tripped devices)?
            </li>
            <li>
              <strong>Inspect visually.</strong> Before picking up test instruments, look. Check the
              consumer unit for tripped devices, scorch marks, or signs of overheating. Inspect
              accessible wiring, accessories, and junction boxes. Many faults are visible before you
              start testing.
            </li>
            <li>
              <strong>Form a hypothesis.</strong> Based on the symptoms and visual inspection, what
              type of fault is most likely? An RCD tripping suggests an earth fault or insulation
              breakdown. An MCB tripping suggests an overload or short circuit. No power to a
              circuit suggests an open circuit.
            </li>
            <li>
              <strong>Test systematically.</strong> Use the appropriate test to confirm or disprove
              your hypothesis. If confirmed, narrow down the location using the half-split method.
            </li>
            <li>
              <strong>Repair and verify.</strong> Fix the fault, then test the circuit to confirm
              the repair is successful. Carry out a full test on the affected circuit and issue the
              appropriate certificate.
            </li>
          </ol>
        </div>
        <p>
          This approach minimises wasted time and ensures you find the root cause — not just a
          symptom. An electrician who follows a systematic process will typically locate a fault
          faster than one who starts testing randomly.
        </p>
      </>
    ),
  },
  {
    id: 'common-fault-types',
    heading: 'Common Fault Types in Domestic Installations',
    content: (
      <>
        <p>
          Understanding the different types of electrical faults helps you form the right hypothesis
          and choose the right test. Here are the most common fault types in domestic installations:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Short Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Live conductor contacts neutral conductor directly. Causes very high current flow
                  and trips the MCB instantly. Common causes: nail or screw through a cable, damaged
                  flex on an appliance, incorrect wiring at an accessory. Tested with insulation
                  resistance (live to neutral) — a very low reading confirms the short.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Earth Fault</h4>
                <p className="text-white text-sm leading-relaxed">
                  Live conductor contacts earth conductor or earthed metalwork. Trips the RCD (and
                  possibly the MCB if fault current is high enough). Common causes: insulation
                  breakdown, moisture ingress, cable damage. Tested with insulation resistance (live
                  to earth) — a low reading confirms the earth fault.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Activity className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Open Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  A break in the conductor — no current can flow. Causes a dead circuit (no power at
                  some or all accessories). Common causes: broken conductor, disconnected terminal,
                  blown fuse. Tested with continuity testing — an infinite reading confirms the open
                  circuit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">High-Resistance Joint</h4>
                <p className="text-white text-sm leading-relaxed">
                  A deteriorated connection that creates resistance and generates heat under load.
                  May cause flickering, intermittent faults, or overheating. May not trip protection
                  devices. Common causes: corroded terminals, loose screws, damaged conductors.
                  Found with thermal imaging, voltage drop testing, or continuity measurement
                  comparison.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Search className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Transient / Intermittent Fault</h4>
                <p className="text-white text-sm leading-relaxed">
                  A fault that comes and goes — often temperature-dependent, moisture-dependent, or
                  load-dependent. The most difficult type to diagnose because the fault may not be
                  present when you test. Requires monitoring, load testing, or environmental
                  simulation to reproduce the fault condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'half-split-method',
    heading: 'The Half-Split Method: Finding Faults Fast',
    content: (
      <>
        <p>
          The half-split method (also called the binary search or bisection method) is the single
          most important technique for locating faults efficiently. It works on a simple principle:
          instead of testing every point on a circuit sequentially, you split the circuit in half
          and test each half.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Isolate the circuit</strong> at the consumer unit. Carry out{' '}
              <SEOInternalLink href="/guides/safe-isolation-procedure">
                safe isolation
              </SEOInternalLink>{' '}
              with a proving unit and lock-off.
            </li>
            <li>
              <strong>Disconnect the circuit at its midpoint.</strong> For a radial circuit, this
              means disconnecting at the middle accessory. For a ring circuit, open the ring at a
              convenient point to create two halves.
            </li>
            <li>
              <strong>Test each half.</strong> Carry out the appropriate test (insulation
              resistance, continuity, etc.) on each half of the circuit. The faulty half will give
              the abnormal reading.
            </li>
            <li>
              <strong>Split the faulty half again.</strong> Disconnect at the midpoint of the faulty
              half and test both quarters. The fault is in the quarter with the abnormal reading.
            </li>
            <li>
              <strong>Continue until isolated.</strong> Keep splitting until you have narrowed the
              fault to a specific section of cable or a specific accessory.
            </li>
          </ol>
        </div>
        <p>
          The mathematical advantage of the half-split method is significant. For a circuit with 20
          accessories, sequential testing could take up to 20 tests. The half-split method will
          locate the fault in a maximum of 5 tests (log2 of 20, rounded up). For larger circuits,
          the time saving is even more dramatic.
        </p>
        <p>
          The half-split method works for all fault types: short circuits (test insulation
          resistance live-to-neutral), earth faults (test insulation resistance live-to-earth), open
          circuits (test continuity end-to-end), and high-resistance joints (test continuity and
          compare to expected values).
        </p>
      </>
    ),
  },
  {
    id: 'logical-process',
    heading: 'The Logical Fault Finding Process',
    content: (
      <>
        <p>
          Beyond the half-split method, effective fault finding requires a logical thinking process.
          Here is a step-by-step approach that works for the majority of domestic faults:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: What is the symptom?</strong> RCD tripping = earth fault or
                insulation breakdown. MCB tripping = overload or short circuit. No power = open
                circuit or upstream problem. Intermittent = loose connection, temperature or
                moisture dependent fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: What changed?</strong> New appliance plugged in? Building work
                (nails, screws)? Recent weather (rain, flooding)? Change in usage (higher load)?
                Recent electrical work by someone else?
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Eliminate appliances first.</strong> Unplug all appliances on the
                affected circuit. If the fault clears, reconnect appliances one at a time to find
                the faulty one. This eliminates the most common cause without any test equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4: Isolate and test the circuit.</strong> If eliminating appliances
                does not clear the fault, isolate the circuit, carry out insulation resistance and
                continuity testing, and use the half-split method to locate the fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 5: Fix and verify.</strong> Repair the fault, then carry out a full
                test on the circuit (continuity, insulation resistance, earth fault loop impedance,
                RCD operation) to confirm the repair is successful. Issue the appropriate
                certificate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-equipment',
    heading: 'Test Equipment for Fault Finding',
    content: (
      <>
        <p>
          Having the right test equipment — and knowing how to use it correctly — is fundamental to
          effective fault finding. Here is what you need:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multifunction Tester (MFT)</strong> — the primary instrument. Measures
                insulation resistance (at 250V, 500V, and 1000V DC), continuity (low resistance),
                earth fault loop impedance (Zs), prospective fault current (PSCC/PEFC), and RCD trip
                times. Essential for all fault finding work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage Indicator / Proving Unit</strong> — GS38 compliant. Used for safe
                isolation verification. Must be proved against a known source before and after every
                isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clamp Meter</strong> — measures current without disconnecting the circuit.
                Essential for checking load current, detecting current imbalance (which causes RCD
                tripping), and verifying circuit loading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-Contact Voltage Detector</strong> — for quick identification of live
                conductors. A preliminary check only — always confirm with a contact voltage
                indicator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable Tracer / Tone Generator</strong> — for identifying cable routes where
                the wiring layout is unknown. Sends a signal along the conductor that can be
                detected through walls and floors.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All test instruments must be within their calibration date. Calibration is typically
          required annually. Using an uncalibrated instrument risks inaccurate readings and can
          undermine the validity of your test results and certificates.
        </p>
      </>
    ),
  },
  {
    id: 'insulation-faults',
    heading: 'Finding Insulation Resistance Faults',
    content: (
      <>
        <p>
          Low{' '}
          <SEOInternalLink href="/guides/insulation-resistance-test">
            insulation resistance
          </SEOInternalLink>{' '}
          is one of the most common fault types. It indicates that the insulation around the
          conductors has deteriorated, allowing current to leak between conductors or to earth.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolate and disconnect.</strong> Isolate the circuit, disconnect all loads,
                and remove any electronic devices (dimmers, timers, SPDs) that could be damaged by
                the test voltage or give misleading readings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test at 500V DC.</strong> Apply the test voltage between live-earth,
                neutral-earth, and live-neutral. Record each reading. The minimum acceptable value
                is 1 megohm, but healthy insulation will typically read well above 2 megohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Low reading? Half-split.</strong> If any reading is below the minimum,
                disconnect the circuit at its midpoint and test each half. The faulty half will have
                the low reading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check accessories.</strong> Sometimes the fault is in an accessory (a damp
                socket, a faulty FCU, or a damaged light fitting) rather than the cable.
                Disconnecting each accessory and retesting will reveal if the fault is in the
                accessory or the cable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Common causes of low insulation resistance include: ageing cable insulation (rubber
          insulation in older installations becomes brittle and cracks); moisture ingress
          (particularly in outdoor circuits, basements, and bathrooms); physical damage to cables
          (nails, screws, rodent damage); and heat damage (cables run too close to hot surfaces or
          undersized cables running hot under load).
        </p>
      </>
    ),
  },
  {
    id: 'earth-faults',
    heading: 'Finding Earth Faults',
    content: (
      <>
        <p>
          An earth fault occurs when the live conductor makes unwanted contact with the earth
          conductor, earthed metalwork, or the general mass of earth. Earth faults are the most
          common cause of{' '}
          <SEOInternalLink href="/guides/rcd-keeps-tripping">RCD tripping</SEOInternalLink>.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Confirm the symptom.</strong> An RCD tripping repeatedly indicates an earth
              fault on one of the circuits it protects. Identify which circuits are on the tripping
              RCD.
            </li>
            <li>
              <strong>Isolate individual circuits.</strong> Switch off all MCBs on the affected RCD.
              Reset the RCD. Switch on MCBs one at a time. The circuit that causes the RCD to trip
              is the faulty circuit.
            </li>
            <li>
              <strong>Unplug appliances on the faulty circuit.</strong> If the RCD holds with
              appliances unplugged, reconnect them one at a time to find the faulty appliance.
            </li>
            <li>
              <strong>If the fault is in the fixed wiring,</strong> isolate the circuit, carry out
              insulation resistance testing (live to earth), and use the half-split method to locate
              the fault.
            </li>
            <li>
              <strong>Check for neutral-to-earth faults.</strong> A crossed neutral-earth connection
              will cause an RCD to trip under load. Test insulation resistance between neutral and
              earth with the neutral disconnected at the consumer unit.
            </li>
          </ol>
        </div>
        <p>
          Earth faults can be intermittent — for example, moisture-related faults may only appear in
          wet weather. If you cannot reproduce the fault during testing, advise the customer to
          monitor the situation and call you back when the fault occurs so you can test under the
          fault condition.
        </p>
      </>
    ),
  },
  {
    id: 'recording-findings',
    heading: 'Recording Your Fault Finding Results',
    content: (
      <>
        <p>
          Proper documentation of fault finding work is important for several reasons: compliance
          with BS 7671, evidence for the customer and their insurance, demonstration of your
          competence at NICEIC or NAPIT assessment, and your own records for future reference.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the symptoms</strong> — what the customer reported, what you observed
                on arrival.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the tests carried out</strong> — which tests, on which circuits, with
                what results. Include both the faulty readings and the post-repair readings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the fault</strong> — what you found, where it was, and what caused
                it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Record the repair</strong> — what work you carried out to fix the fault.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Issue the appropriate certificate</strong> — a{' '}
                <SEOInternalLink href="/guides/minor-works-certificate">
                  Minor Works Certificate
                </SEOInternalLink>{' '}
                for the repair work, with the schedule of test results for the affected circuit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Photographs are particularly valuable — photograph the fault before repair and the
          completed repair. These provide evidence for insurance claims and demonstrate the quality
          of your work at assessment.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Efficient Fault Finding with Elec-Mate',
    content: (
      <>
        <p>
          Fault finding call-outs require you to diagnose, repair, document, certify, and invoice —
          ideally in a single visit. Elec-Mate streamlines this entire workflow:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document the Fault Visually</h4>
                <p className="text-white text-sm leading-relaxed">
                  Photograph the fault, the consumer unit, and the affected area. All photos are
                  stored with the job record and can be attached to the certificate for the
                  customer's records and insurance.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Send className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate and Invoice on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the Minor Works Certificate on your phone with voice-entered test
                  results. Send the professional PDF to the customer by email or WhatsApp. Generate
                  and send the invoice. All done before you leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete fault finding jobs end-to-end on your phone"
          description="Join 430+ UK electricians using Elec-Mate for on-site certificates, fault documentation, and instant invoicing. Diagnose, repair, certify, and get paid — all in one visit. 7-day free trial."
          icon={Search}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalFaultFindingGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Fault Finding Guide | Systematic Approach"
      description="Complete guide to electrical fault finding. Systematic approach, half-split method, common fault types, test equipment, insulation resistance faults, earth faults, and recording your findings."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting Guide"
      badgeIcon={Search}
      heroTitle={
        <>
          Electrical Fault Finding: <span className="text-yellow-400">The Systematic Approach</span>
        </>
      }
      heroSubtitle="Effective fault finding is not guesswork — it is a systematic, logical process. This guide covers the half-split method, common fault types, the test equipment you need, and how to document your findings. Whether you are an apprentice learning the basics or an experienced electrician refining your technique, this is the complete reference."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Fault Finding"
      relatedPages={relatedPages}
      ctaHeading="Fault Finding Documentation on Your Phone"
      ctaSubheading="Join 430+ UK electricians documenting fault finding work, completing certificates, and invoicing on site. Voice test entry, AI defect coding, and instant PDF delivery. 7-day free trial."
    />
  );
}
