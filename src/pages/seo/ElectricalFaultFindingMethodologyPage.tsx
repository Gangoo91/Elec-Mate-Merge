import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  ShieldCheck,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Zap,
  Wrench,
  Gauge,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  {
    label: 'Electrical Fault Finding Methodology',
    href: '/guides/electrical-fault-finding-guide',
  },
];

const tocItems = [
  { id: 'overview', label: 'Why Methodology Matters' },
  { id: 'gather-info', label: '1. Gather Information' },
  { id: 'visual-inspection', label: '2. Visual Inspection' },
  { id: 'test', label: '3. Test' },
  { id: 'diagnose', label: '4. Diagnose' },
  { id: 'fix-verify', label: '5. Fix and Verify' },
  { id: 'methods', label: 'Half-Split, Elimination, and Experience-Based Methods' },
  { id: 'safe-isolation', label: 'Safe Isolation — BS 7671 Section 537' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A systematic fault finding approach — gather information, visual inspection, test, diagnose, fix, verify — is more reliable and faster than random testing. Every step has a purpose.',
  'The half-split method divides the circuit at its midpoint and tests there first, eliminating half the circuit with each test. This is the fastest approach for long circuits with a single fault.',
  'The elimination method disconnects items one by one until the fault disappears. Best used when the fault is likely in a load (appliance or accessory) rather than the fixed wiring.',
  'Experience-based fault finding uses knowledge of failure patterns (which components fail most commonly on this type of circuit or equipment) to go directly to the most likely cause first. Effective when the pattern matches known failure modes.',
  'Safe isolation must be carried out before any hands-on work on the circuit. BS 7671 Section 537 (and Regulation 462) governs the devices for isolation, and the Electricity at Work Regulations 1989 make working dead a legal requirement. Always prove dead with an approved voltage indicator that complies with HSE Guidance Note GS38 before touching conductors.',
];

const faqs = [
  {
    question: 'What is the correct order for electrical fault finding?',
    answer:
      'The correct systematic order is: (1) Gather information — what is the symptom, when did it start, what happened just before, has any work been done recently? (2) Visual inspection — look before you touch. Check for obvious signs: scorch marks, burning smell, mechanical damage, water ingress, loose connections, tripped devices. (3) Test — use appropriate instruments to measure voltages, continuity, insulation resistance, and loop impedance at key points. (4) Diagnose — analyse the test results alongside the symptoms and visual findings to identify the probable cause. (5) Fix — rectify the identified fault. (6) Verify — repeat the relevant tests to confirm the fault is resolved and the installation is safe before re-energising. Skipping steps is the most common reason fault finding takes longer than expected.',
  },
  {
    question: 'What is the half-split method and when should I use it?',
    answer:
      'The half-split method (also called binary search or dichotomy method) works by testing at the midpoint of the circuit first, eliminating half the circuit with each test. For example, on a 10-circuit distribution board with a fault on one circuit, testing circuits 1 to 5 first determines which half the fault is in, then you test within that half, and so on. Each test eliminates half the remaining possibilities. After ten faults were possible, after one test only five are possible, after two tests only two or three are possible. The half-split method is most efficient when: the fault location is unknown and could be anywhere in a long circuit or system; each test takes significant time (making it worth minimising the number of tests); and the probability of the fault is roughly uniform along the circuit.',
  },
  {
    question: 'When is the elimination method better than half-split?',
    answer:
      'The elimination method — disconnecting or removing items one by one until the fault disappears — is better when: the fault is almost certainly in a load or accessory (appliance, luminaire, socket outlet) rather than in the fixed wiring; there are only a few possible sources of the fault; and each test (disconnecting an item) is quick. For example, if an RCD trips and you suspect a faulty appliance, disconnecting appliances one by one and resetting the RCD is faster than half-split testing of the wiring. The elimination method is also used when testing live is required — eliminating items from a live circuit is safer than making multiple cuts and joins to test midpoints.',
  },
  {
    question: 'What tools do I need for electrical fault finding?',
    answer:
      'Essential tools for electrical fault finding include: an approved voltage indicator (GS38 compliant) for safe isolation verification and live voltage detection; a calibrated multimeter for measuring voltages, continuity, and resistance; a low-resistance ohmmeter or combined installation tester for continuity (R1+R2, R2) measurements; an insulation resistance tester for IR testing at 500V DC; an earth fault loop impedance tester; an RCD tester; a clamp meter capable of milliamp AC measurement for earth leakage; a non-contact voltage detector for rapid live/dead indication; a socket outlet tester for quick polarity and RCD checks; and a torch and inspection mirror for accessing enclosed spaces. A thermal imaging camera (see separate guide) is a powerful addition for detecting hot spots in switchboards and connections.',
  },
  {
    question: 'What information should I gather before starting fault finding?',
    answer:
      'Before touching anything, gather as much information as possible: What exactly is the symptom? (No power, nuisance tripping, heating, sparking, burning smell?) When did it start — was it sudden or gradual? What was happening just before it occurred — any work done, new appliances installed, unusual weather? Has this happened before, and if so, what was done last time? What type of installation is it (domestic, commercial, industrial, TN-C-S, TN-S, TT)? How old is the installation and when was it last inspected? Who else has access and might have made changes? Has the supply been checked (are neighbouring properties affected)? This information often points directly to the likely cause and can save significant testing time.',
  },
  {
    question: 'How does experience-based fault finding work?',
    answer:
      'Experience-based fault finding uses pattern recognition — knowledge of which faults occur most frequently on specific types of equipment, installations, and circuits — to go directly to the most likely cause without working through every possibility. For example, an experienced electrician called to an RCD nuisance trip in a domestic kitchen will check the electric shower first (the most common single cause of RCD tripping in domestic premises), then the washing machine, then the dishwasher, in that order — not because this is the most logical sequence, but because experience shows these are the most frequent causes. Experience-based fault finding is fast when the pattern is familiar, but can lead you astray on unusual faults. The safest approach is to use experience to identify the most likely cause first, but revert to systematic half-split or elimination if the first few experience-based guesses are wrong.',
  },
  {
    question: 'What does BS 7671 say about safe isolation for fault finding?',
    answer:
      'BS 7671:2018+A4:2026 Section 537 (Isolation and switching) and Regulation 462 set the requirements for the devices used to isolate a circuit — every circuit must have a means of isolation for all live conductors (Regulation 462.2), devices must be secured against unintentional or inadvertent closure by a lockable enclosure or padlocking (Regulation 462.3 / 537.2.4), and each isolation device must be clearly identified to show the circuit it isolates (Regulation 537.2.7). The standard does not contain a step-by-step "safe isolation procedure" — that procedure (identify, isolate, secure, prove dead) comes from HSE guidance, with HSE Guidance Note GS38 covering the test equipment and proving units. Working dead is a legal requirement under the Electricity at Work Regulations 1989; live working is only permitted where it is unreasonable for the conductor to be dead and suitable precautions are taken.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/method-statement-fault-finding',
    title: 'Method Statement — Fault Finding',
    description: 'Fault-finding method statement for live installations.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/partial-power-loss-fault-finding',
    title: 'Partial Power Loss Fault Finding',
    description: 'Diagnosing missing phase, open circuit neutral, and failed MCB.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/troubleshooting-high-earth-leakage',
    title: 'Troubleshooting High Earth Leakage',
    description: 'RCD nuisance tripping, clamp meter method, and common culprits.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Testing',
    description: 'IR testing as a diagnostic tool for fault finding on fixed wiring.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/earth-fault-loop-impedance-testing',
    title: 'Earth Fault Loop Impedance Testing',
    description: 'Zs testing procedure and Appendix 3 table values for diagnostics.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Record fault findings with coded observations and generate professional reports.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'C&G 2391 training covering fault finding methodology and safe isolation.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Fault Finding Methodology Matters',
    content: (
      <>
        <p>
          Electrical fault finding is as much a mental process as a physical one. The most common
          mistake is to grab a test instrument and start measuring without a clear plan — this
          approach generates data without insight, takes longer, and risks missing the actual fault
          while appearing active. A systematic methodology ensures that each test provides
          information that narrows the possibilities, and that the correct fault is identified
          efficiently.
        </p>
        <p>
          Good fault finding methodology also underpins safe working. Rushing to test without first
          gathering information increases the risk of working on the wrong circuit, using the wrong
          test range, or missing a hazard that was visible during visual inspection. The sequence —
          gather, inspect, test, diagnose, fix, verify — is designed to maximise safety as well as
          efficiency.
        </p>
        <p>
          This guide covers the five-step systematic approach, the three main fault finding methods
          (half-split, elimination, and experience-based), and the safe isolation requirements of BS
          7671 Section 537 and the Electricity at Work Regulations 1989.
        </p>
      </>
    ),
  },
  {
    id: 'gather-info',
    heading: 'Step 1 — Gather Information',
    content: (
      <>
        <p>
          Before touching any equipment, gather all available information about the fault. This is
          the most undervalued step in fault finding — it frequently points directly to the cause
          and eliminates the need for extensive testing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Describe the symptom precisely</strong> — no power? Nuisance tripping?
                Burning smell? Flickering lights? Each symptom has a characteristic set of likely
                causes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When did it start?</strong> — sudden failure (during an event) suggests a
                specific trigger. Gradual deterioration suggests progressive insulation breakdown or
                a loose connection developing over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What happened immediately before?</strong> — new appliance installed? Work
                carried out? A storm? High loads? This is often the most revealing question.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Has it happened before?</strong> — intermittent or recurring faults have
                different causes from sudden single failures.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'visual-inspection',
    heading: 'Step 2 — Visual Inspection',
    content: (
      <>
        <p>
          Visual inspection must come before testing. Many faults are visible to the naked eye, and
          identifying them visually is faster than finding them with instruments. Key things to look
          for:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scorch marks or discolouration</strong> — on accessories, terminals, or
                cable insulation. Indicates overheating at a connection or arcing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Physical damage</strong> — to cables (nail or staple through a cable),
                accessories (cracked faceplate), or equipment (mechanical impact).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water ingress</strong> — moisture in junction boxes, conduit, or fitting
                bodies. A common cause of insulation failure and RCD tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose connections</strong> — open junction boxes and accessory back boxes
                and check for loose terminals. Loose connections cause voltage drop, heating, and
                arcing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tripped devices</strong> — MCBs, RCDs, thermal overloads on equipment.
                Always check these before reaching for a test instrument.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Document fault findings with photos on your phone"
          description="Elec-Mate's EICR app allows you to attach photos directly to coded observations, creating a full visual record of the fault and its location."
          icon={Search}
        />
      </>
    ),
  },
  {
    id: 'test',
    heading: 'Step 3 — Test',
    content: (
      <>
        <p>
          Testing provides quantitative data to supplement the visual findings and confirm or
          eliminate potential causes. The choice of test depends on the symptom:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">No Power / Circuit Dead</h3>
            <p className="text-white text-sm leading-relaxed">
              Voltage measurement at the consumer unit and at the affected accessory. Continuity of
              line and neutral conductors. Insulation resistance to rule out insulation failure as
              the cause of the MCB or RCD operating.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">RCD Tripping</h3>
            <p className="text-white text-sm leading-relaxed">
              Milliamp clamp meter on live circuit to measure earth leakage. Insulation resistance
              test after safe isolation and load disconnection. RCD test to verify RCD operation
              characteristics.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">MCB Tripping Under Load</h3>
            <p className="text-white text-sm leading-relaxed">
              Load current measurement with clamp meter to verify overload. Earth fault loop
              impedance to confirm the MCB will operate within the correct time for a genuine fault.
              Insulation resistance to rule out insulation breakdown causing the fault.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Overheating / Burning Smell</h3>
            <p className="text-white text-sm leading-relaxed">
              Load current with clamp meter (overloading?). Thermal imaging to locate hot spots (see
              separate thermal imaging guide). Continuity and resistance measurements at suspect
              connections to identify high-resistance joints.
            </p>
          </div>
        </div>
        <p>
          When you reach for the insulation resistance tester, apply the correct DC test voltage for
          the circuit. The minimum acceptable values and test voltages are set out in BS 7671 Table
          64:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Circuit nominal voltage</th>
                <th className="px-4 py-3 font-semibold">Test voltage (DC)</th>
                <th className="px-4 py-3 font-semibold">Minimum insulation resistance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3">SELV and PELV</td>
                <td className="px-4 py-3">250 V</td>
                <td className="px-4 py-3">0.5 MΩ</td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-4 py-3">
                  Up to and including 500 V (except SELV/PELV)
                </td>
                <td className="px-4 py-3">500 V</td>
                <td className="px-4 py-3">1.0 MΩ</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3">Above 500 V</td>
                <td className="px-4 py-3">1000 V</td>
                <td className="px-4 py-3">1.0 MΩ</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          A reading below the minimum points to insulation breakdown — but disconnect or account for
          connected loads first, because surge protection, electronic equipment and even damp can
          drag a reading down on an otherwise sound circuit. See the{' '}
          <SEOInternalLink href="/guides/insulation-resistance-testing-bs7671">
            insulation resistance testing guide
          </SEOInternalLink>{' '}
          for the full procedure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-400" />
            Core diagnostic instruments
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <p className="font-semibold text-white text-sm">Voltage indicator (GS38)</p>
              <p className="text-white/80 text-sm mt-1">
                Two-pole approved indicator for proving dead and confirming live voltage. Prove on a
                known source before and after use.
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <p className="font-semibold text-white text-sm">Low-resistance ohmmeter</p>
              <p className="text-white/80 text-sm mt-1">
                Continuity of protective conductors and ring final circuits (R1+R2, R2). Null the
                leads before measuring.
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <p className="font-semibold text-white text-sm">Insulation resistance tester</p>
              <p className="text-white/80 text-sm mt-1">
                Detects insulation breakdown between live conductors and Earth at the test voltage
                from Table 64 above.
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <p className="font-semibold text-white text-sm">Loop impedance tester</p>
              <p className="text-white/80 text-sm mt-1">
                Measures Ze and Zs to confirm the protective device will disconnect within the
                required time for an earth fault.
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <p className="font-semibold text-white text-sm">RCD tester</p>
              <p className="text-white/80 text-sm mt-1">
                Verifies trip current and disconnection time, separating a faulty RCD from a genuine
                earth leakage fault on the circuit.
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
              <p className="font-semibold text-white text-sm">Clamp meter (mA AC)</p>
              <p className="text-white/80 text-sm mt-1">
                Measures load current for overload checks and earth leakage current on a live circuit
                to chase down nuisance tripping.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'diagnose',
    heading: 'Step 4 — Diagnose',
    content: (
      <>
        <p>
          Diagnosis is the process of combining the gathered information, visual findings, and test
          results into a conclusion about the cause of the fault. Good diagnosis asks: do all the
          findings point to a single explanation? If not, which explanation is most consistent with
          the majority of the evidence?
        </p>
        <p>Common diagnostic errors to avoid:</p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixing the first thing you find</strong> — the visible damage may be a
                consequence of the fault, not the cause. A burnt terminal in a junction box may have
                been caused by a loose connection elsewhere that generated excess current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assuming one fault</strong> — in older installations, one fault can mask
                another. After fixing the identified fault, always verify that no other faults are
                present before certifying the installation safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not re-reading test results</strong> — confirm your interpretation of the
                test data before acting on it. A misread ohmmeter (0.5Ω vs 5Ω) can lead to incorrect
                conclusions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fix-verify',
    heading: 'Step 5 — Fix and Verify',
    content: (
      <>
        <p>
          After repairing the identified fault, verification is essential before re-energising the
          circuit. Repeat the relevant tests — at minimum, insulation resistance and continuity on
          any disturbed wiring, and a functional test of any repaired device. For circuits that
          previously failed Zs, re-measure Zs after repair to confirm compliance.
        </p>
        <p>
          Issue appropriate documentation for any remedial work: a{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          for simple repairs or replacements, or an updated{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> schedule if
          significant work was required to bring the installation to a satisfactory standard. Always
          record what was found, what was done, and the results of verification testing.
        </p>
      </>
    ),
  },
  {
    id: 'methods',
    heading: 'Half-Split, Elimination, and Experience-Based Methods',
    content: (
      <>
        <p>
          The three main fault finding methods each have their optimal application. The table below
          summarises when to reach for each:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Method</th>
                <th className="px-4 py-3 font-semibold">How it works</th>
                <th className="px-4 py-3 font-semibold">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3 font-semibold align-top">Half-split</td>
                <td className="px-4 py-3 align-top">
                  Test at the midpoint; the result tells you which half holds the fault. Repeat on
                  the faulty half, halving the search each time.
                </td>
                <td className="px-4 py-3 align-top">
                  Long cables with an unknown single fault and large distribution systems. The most
                  efficient method when no other information is available.
                </td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-4 py-3 font-semibold align-top">Elimination</td>
                <td className="px-4 py-3 align-top">
                  Remove or disconnect items one at a time until the fault disappears, isolating the
                  culprit by exclusion.
                </td>
                <td className="px-4 py-3 align-top">
                  Multiple loads on one circuit, live testing where halving is impractical, and
                  faults that appear to sit in a load rather than the fixed wiring.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3 font-semibold align-top">Experience-based</td>
                <td className="px-4 py-3 align-top">
                  Go straight to the most common cause for this fault and installation type, guided
                  by known failure patterns.
                </td>
                <td className="px-4 py-3 align-top">
                  Familiar symptoms (electric shower element, fitting capacitor). Fastest when
                  correct — abandon quickly if the first two guesses are wrong.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'safe-isolation',
    heading: 'Safe Isolation Throughout — BS 7671 Section 537',
    content: (
      <>
        <p>
          Safe isolation must be applied whenever hands-on work is carried out on a circuit. BS 7671
          Section 537 and Regulation 462 set the requirements for isolation devices, and the
          Electricity at Work Regulations 1989 make working dead a legal duty — live working is only
          permitted where it is unreasonable for the conductor to be dead and suitable precautions
          are taken. The procedure cannot be abbreviated, even for short tasks.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-300 font-bold text-sm shrink-0">
                1
              </span>
              <h4 className="font-bold text-white">Identify</h4>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Identify the correct isolation point for the circuit to be worked on. Confirm the
              circuit labelling is correct by testing before isolation — each isolation device must
              be clearly marked to show the circuit it isolates (Regulation 537.2.7).
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-300 font-bold text-sm shrink-0">
                2
              </span>
              <h4 className="font-bold text-white">Isolate and secure</h4>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Switch off at the correct MCB, fuse, or isolator and secure the device against
              inadvertent re-closure by a lockable enclosure or padlock (Regulation 462.3 / 537.2.4).
              Apply a warning notice.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-300 font-bold text-sm shrink-0">
                3
              </span>
              <h4 className="font-bold text-white">Prove dead</h4>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Use a voltage indicator that complies with HSE Guidance Note GS38 to prove the circuit
              is dead. Prove the indicator on a known live source (or proving unit) before and after
              testing the isolated circuit.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 text-red-300 font-bold text-sm shrink-0">
                4
              </span>
              <h4 className="font-bold text-white">Maintain isolation</h4>
            </div>
            <p className="text-white text-sm leading-relaxed">
              Keep the lock and notice in place throughout the work, and confirm the circuit cannot
              be back-fed from another supply (generator, battery storage, or parallel circuit). Do
              not rely on verbal assurance from others.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building Fault Finding Skills',
    content: (
      <>
        <p>
          Fault finding is a skill that improves with deliberate practice. Here is how to develop it
          systematically:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document Every Fault You Find</h4>
                <p className="text-white text-sm leading-relaxed">
                  Keep a record of every fault you diagnose — what the symptom was, what tests you
                  did, what you found, and what you did to fix it. After a year, you will have a
                  personal database of failure patterns that is worth more than any training course.
                  The Elec-Mate app makes it easy to capture this information as part of job
                  records.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Always Verify — Never Assume Fixed</h4>
                <p className="text-white text-sm leading-relaxed">
                  After every repair, run through a verification sequence before re-energising. This
                  catches secondary faults that were hidden by the primary fault, and gives you
                  confidence that the installation is safe. It also protects you legally — a
                  verified repair with a certificate is defensible; an unverified repair is not.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalFaultFindingMethodologyPage() {
  return (
    <GuideTemplate
      title="Electrical Fault Finding Methodology | Systematic Approach"
      description="Complete guide to electrical fault finding methodology for UK electricians. Covers the systematic approach (gather info, visual inspection, test…"
      datePublished="2026-03-27"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Search}
      answerBox={{
        question: 'What is the methodology for electrical fault finding?',
        answer:
          'Electrical fault finding follows a five-step systematic sequence: gather information about the symptom, carry out a visual inspection, test with appropriate instruments, diagnose the cause from the evidence, then fix and verify. Within testing you choose half-split, elimination, or experience-based methods depending on the fault. Safe isolation is proved dead with a GS38-compliant voltage indicator before any hands-on work.',
      }}
      heroTitle={
        <>
          Electrical Fault Finding Methodology:{' '}
          <span className="text-yellow-400">Systematic Approach for UK Electricians</span>
        </>
      }
      heroSubtitle="A complete guide to systematic electrical fault finding. Covers the five-step approach (gather information, visual inspection, test, diagnose, fix and verify), the half-split method, elimination method, experience-based method, and BS 7671 Section 537 safe isolation throughout."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Fault Finding"
      relatedPages={relatedPages}
      ctaHeading="Document Fault Investigations and Certify Repairs on Your Phone"
      ctaSubheading="Elec-Mate's AI fault diagnosis and certification tools help you record findings, attach photos, and issue professional reports and certificates on site. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
