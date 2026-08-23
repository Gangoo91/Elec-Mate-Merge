import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Zap,
  Gauge,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared surface classes — cards go edge-to-edge on phones, inset from sm:
// -------------------------------------------------------------------

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const tableWrapCn =
  '-mx-4 my-5 overflow-x-auto rounded-none border-y border-white/[0.14] bg-white/[0.04] ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x';

const thCn = 'px-4 py-3 text-left font-semibold text-white';
const tdCn = 'px-4 py-3 align-top text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  {
    label: 'Electrical Fault Finding Methodology',
    href: '/guides/electrical-fault-finding-methodology',
  },
];

const tocItems = [
  { id: 'overview', label: 'The Six-Step Sequence' },
  { id: 'gather-info', label: '1. Gather Information' },
  { id: 'visual-inspection', label: '2. Visual Inspection' },
  { id: 'test', label: '3. Test' },
  { id: 'diagnose', label: '4. Diagnose' },
  { id: 'fix-verify', label: '5–6. Fix and Verify' },
  { id: 'methods', label: 'Half-Split, Elimination, and Experience-Based Methods' },
  { id: 'safe-isolation', label: 'Safe Isolation — BS 7671 Section 537' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The six-step sequence is: gather information, visual inspection, test, diagnose, fix, verify. Each step narrows the possibilities before the next one starts — that is why it beats picking up a test instrument and measuring at random.',
  'BS 7671 does not prescribe a fault finding methodology. It sets the requirements for the tests you use along the way (Chapter 64) and for isolation (Section 462 and Section 537); the sequence itself is taught practice, not a regulation.',
  'The half-split method tests at the midpoint and eliminates half the circuit with each test. Fastest for a single unknown fault on a long run or a large distribution system.',
  'The elimination method disconnects items one at a time until the fault disappears. Best when the fault is likely to sit in a load or accessory rather than in the fixed wiring.',
  'Safe isolation comes before any hands-on work. Regulation 462.2 requires a means of isolation for all live conductors of every circuit, Regulation 462.3 (and 537.2.4) requires it to be secured against inadvertent closure, and Regulation 537.2.7 requires it to be identified. Working dead is a legal duty under Regulation 14 of the Electricity at Work Regulations 1989 — prove dead with a voltage indicator that complies with HSE Guidance Note GS38.',
];

const faqs = [
  {
    question: 'What is the six-step approach to electrical fault finding?',
    answer:
      'The six steps are: (1) Gather information — what is the symptom, when did it start, what happened just before, has any work been done recently? (2) Visual inspection — look before you touch. Check for scorch marks, burning smell, mechanical damage, water ingress, loose connections and tripped devices. (3) Test — use appropriate instruments to measure voltage, continuity, insulation resistance, earth fault loop impedance and leakage current at key points. (4) Diagnose — analyse the test results alongside the symptom and the visual findings to identify the probable cause. (5) Fix — rectify the cause, not just the visible damage. (6) Verify — repeat the relevant tests to confirm the fault is resolved and the installation is safe before re-energising. Some training providers combine fix and verify and teach it as five steps; the logic is identical. Skipping steps is the most common reason fault finding takes longer than expected.',
  },
  {
    question: 'What is the half-split method and when should I use it?',
    answer:
      'The half-split method (also called binary search or dichotomy) works by testing at the midpoint first, so each test eliminates half the remaining circuit. On a distribution board with sixteen circuits and one fault, the first test narrows it to eight, the second to four, the third to two and the fourth identifies it — four tests instead of up to sixteen. Half-split is most efficient when the fault could be anywhere along a long circuit or system, each test takes significant time so it is worth minimising the number of tests, and the fault is roughly equally likely at any point. It is less useful when you already have a strong reason to suspect one particular item.',
  },
  {
    question: 'When is the elimination method better than half-split?',
    answer:
      'The elimination method — disconnecting or removing items one by one until the fault disappears — is better when the fault is almost certainly in a load or accessory (appliance, luminaire, socket-outlet) rather than in the fixed wiring, when there are only a few possible sources, and when each test is quick. For example, if an RCD trips and you suspect an appliance, unplugging appliances one at a time and resetting the RCD is faster than half-split testing of the wiring. Elimination is also the practical choice where the circuit has to stay live, because removing items from a live circuit is safer than making multiple cuts and joins to test midpoints.',
  },
  {
    question: 'What tools do I need for electrical fault finding?',
    answer:
      'A GS38-compliant two-pole voltage indicator and a proving unit for safe isolation; a calibrated multimeter for voltage, continuity and resistance; a low-resistance ohmmeter or combined installation tester for R1+R2 and R2 continuity; an insulation resistance tester capable of the Table 64 test voltages (500 V DC for most low voltage circuits, 250 V DC for SELV and PELV and for the post-connection test required by Regulation 643.3.3); an earth fault loop impedance tester; an RCD tester; a clamp meter capable of milliamp AC measurement for earth leakage; a non-contact voltage detector for rapid live indication; a socket-outlet tester for a quick polarity check; and a torch and inspection mirror for enclosed spaces. A thermal imaging camera is a strong addition for finding hot spots at connections and in switchgear.',
  },
  {
    question: 'What information should I gather before starting fault finding?',
    answer:
      'Before touching anything: what exactly is the symptom (no power, nuisance tripping, heating, arcing, burning smell)? When did it start, and was it sudden or gradual? What was happening immediately before — any work done, new appliance installed, unusual weather? Has it happened before, and what was done last time? What type of installation and earthing arrangement is it (domestic, commercial, industrial; TN-C-S, TN-S, TT)? How old is it and when was it last inspected? Who else has access and might have made changes? Has the supply itself been checked — are neighbouring properties affected? This information often points straight at the likely cause and saves a great deal of testing.',
  },
  {
    question: 'How does experience-based fault finding work?',
    answer:
      'Experience-based fault finding uses pattern recognition — knowledge of which faults occur most often on a given type of equipment, installation or circuit — to go straight to the most likely cause. An electrician called to RCD nuisance tripping in a domestic kitchen will typically check the wet appliances and any electric shower first, because those are the most frequent culprits, rather than working methodically along the circuit. It is fast when the pattern is familiar and misleading when it is not. The safe way to use it is as a first guess: if the first two or three hunches do not hold up against the test results, revert to half-split or elimination and work the problem systematically.',
  },
  {
    question: 'What does BS 7671 say about safe isolation for fault finding?',
    answer:
      'BS 7671:2018+A4:2026 sets requirements for the isolation devices, not for the procedure. Every circuit must be provided with a means of isolation for all live conductors (Regulation 462.2); the device must be designed and installed to prevent unintentional or inadvertent closure, for example by a lockable space or enclosure or by padlocking (Regulation 462.3, and Regulation 537.2.4 for the device itself); and each device used for isolation must be clearly identified by position or durable marking to indicate the circuit it isolates (Regulation 537.2.7). The standard contains no step-by-step "safe isolation procedure" — identify, isolate and secure, prove dead, maintain isolation comes from HSE guidance, with HSE Guidance Note GS38 covering the test equipment and HSR25 giving guidance on the regulations. Working dead is a legal duty under Regulation 14 of the Electricity at Work Regulations 1989; live working is only permitted where it is unreasonable in all the circumstances for the conductor to be dead and suitable precautions are taken.',
  },
  {
    question: 'How do I test an RCD when I suspect it is the fault?',
    answer:
      'Regulation 643.8 requires the effectiveness of automatic disconnection by RCDs used for additional protection to be verified with test equipment to BS EN 61557-6. The note to that regulation states that, regardless of RCD type, effectiveness is deemed verified where the RCD disconnects within the stated time on an alternating current test at its rated residual operating current (IΔn) — 300 ms maximum for a general non-delay type. Table 3A, which previously set out the half-times and five-times tripping criteria, was deleted at A4:2026, so those are no longer installation verification requirements in BS 7671. If the RCD trips within that time on test but still trips in service, the RCD is doing its job and the fault is earth leakage on the circuit — chase it with a milliamp clamp meter on the live circuit, then insulation resistance testing after isolation.',
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
    href: '/inspection-testing-course',
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
    heading: 'The Six-Step Fault Finding Sequence',
    content: (
      <>
        <p>
          Fault finding is commonly taught as six steps. The names vary between training providers
          and some combine the last two into a single &ldquo;fix and verify&rdquo; step, but the
          logic does not change: establish what you are looking for before you look, and prove the
          circuit safe before you leave it.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Step</th>
                <th className={thCn}>What you do</th>
                <th className={thCn}>What it should tell you</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>1. Gather information</td>
                <td className={tdCn}>
                  Symptom, timing, recent changes, installation and earthing arrangement.
                </td>
                <td className={tdCn}>
                  The likely family of causes, before an instrument comes out of the bag.
                </td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>2. Visual inspection</td>
                <td className={tdCn}>
                  Look for scorching, damage, water ingress, loose terminals, tripped devices.
                </td>
                <td className={tdCn}>Whether the fault is already visible without testing.</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>3. Test</td>
                <td className={tdCn}>
                  Voltage, continuity, insulation resistance, loop impedance, leakage current.
                </td>
                <td className={tdCn}>Numbers that confirm or rule out each candidate cause.</td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>4. Diagnose</td>
                <td className={tdCn}>
                  Reconcile the symptom, the visual findings and the readings.
                </td>
                <td className={tdCn}>
                  One cause consistent with all the evidence — not just the first one found.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>5. Fix</td>
                <td className={tdCn}>
                  Rectify the cause, and any damage the fault caused downstream.
                </td>
                <td className={tdCn}>
                  That the repair addresses the cause, not only the symptom.
                </td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>6. Verify</td>
                <td className={tdCn}>
                  Repeat the relevant tests on disturbed wiring before re-energising.
                </td>
                <td className={tdCn}>
                  That the circuit is safe and no second fault was masked by the first.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="pt-2 text-lg font-semibold text-white">Why the order matters</h3>
        <p>
          The most common mistake is to grab a test instrument and start measuring without a plan.
          That generates data without insight, takes longer, and risks missing the actual fault while
          looking busy. A systematic sequence makes each test narrow the possibilities rather than
          simply add another reading.
        </p>
        <p>
          The order also underpins safe working. Testing before gathering information increases the
          risk of working on the wrong circuit, selecting the wrong test range, or missing a hazard
          that a visual inspection would have caught in seconds.
        </p>
        <h3 className="pt-2 text-lg font-semibold text-white">What BS 7671 does and does not cover</h3>
        <p>
          BS 7671:2018+A4:2026 does not prescribe a fault finding methodology — the sequence is
          taught practice, not a regulation. What the standard does set is the requirements for the
          tests you use along the way (Chapter 64, Inspection and testing) and for the isolation
          devices you rely on to work dead (Section 462 and Section 537). The legal duty to work dead
          sits in the Electricity at Work Regulations 1989.
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
          the most undervalued step in fault finding — it frequently points directly at the cause and
          removes the need for extensive testing.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Describe the symptom precisely.</strong> No power? Nuisance tripping? Burning
              smell? Flickering lights? Each symptom carries its own characteristic set of likely
              causes.
            </li>
            <li>
              <strong>When did it start?</strong> Sudden failure during an event suggests a specific
              trigger. Gradual deterioration suggests progressive insulation breakdown or a
              connection loosening over time.
            </li>
            <li>
              <strong>What happened immediately before?</strong> New appliance installed? Work
              carried out? A storm? Unusually high load? This is often the single most revealing
              question you can ask.
            </li>
            <li>
              <strong>Has it happened before?</strong> Intermittent and recurring faults have
              different causes from a sudden single failure, and the previous repair is a strong
              clue.
            </li>
            <li>
              <strong>What is the earthing arrangement?</strong> TN-C-S, TN-S or TT changes which
              readings are plausible and which protective device behaviour is normal.
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
          Visual inspection comes before testing. Many faults are visible to the naked eye, and
          finding them that way is faster than finding them with instruments.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Scorch marks or discolouration</strong> on accessories, terminals or cable
              insulation — evidence of overheating at a connection, or of arcing.
            </li>
            <li>
              <strong>Physical damage</strong> to cables (a nail or staple through a cable),
              accessories (a cracked faceplate) or equipment (mechanical impact).
            </li>
            <li>
              <strong>Water ingress</strong> in junction boxes, conduit or fitting bodies — a common
              cause of insulation failure and of RCD tripping.
            </li>
            <li>
              <strong>Loose connections.</strong> Open junction boxes and accessory back boxes and
              check the terminals. Loose connections cause voltage drop, heating and arcing.
            </li>
            <li>
              <strong>Tripped devices</strong> — MCBs, RCDs, and thermal overloads on equipment.
              Check these before reaching for a test instrument.
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Document fault findings with photos on your phone"
          description="Elec-Mate's EICR app lets you attach photos directly to coded observations, creating a full visual record of the fault and its location."
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
          Testing supplies the numbers that confirm or eliminate each candidate cause. Which tests
          you reach for depends on the symptom.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Symptom</th>
                <th className={thCn}>Tests to run</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-semibold`}>No power / circuit dead</td>
                <td className={tdCn}>
                  Voltage at the consumer unit and at the affected accessory. Continuity of line and
                  neutral conductors. Insulation resistance, to establish whether insulation failure
                  is what operated the protective device.
                </td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className={`${tdCn} font-semibold`}>RCD tripping</td>
                <td className={tdCn}>
                  Milliamp clamp meter on the live circuit to measure standing earth leakage.
                  Insulation resistance after safe isolation and load disconnection. RCD test to
                  Regulation 643.8 to establish whether the device itself is at fault.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-semibold`}>MCB tripping under load</td>
                <td className={tdCn}>
                  Load current with a clamp meter to confirm or rule out genuine overload. Earth
                  fault loop impedance to confirm the device will disconnect in time on a real fault.
                  Insulation resistance to rule out breakdown between conductors.
                </td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className={`${tdCn} font-semibold`}>Overheating or burning smell</td>
                <td className={tdCn}>
                  Load current with a clamp meter. Thermal imaging to locate hot spots. Continuity
                  and resistance at suspect connections to identify high-resistance joints.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="pt-2 text-lg font-semibold text-white">
          Insulation resistance — test voltages and minimum values
        </h3>
        <p>
          Regulation 643.3.2 requires insulation resistance to be measured at the test voltages in
          Table 64, with all final circuits connected but current-using equipment disconnected. The
          result is satisfactory if it is not less than the corresponding minimum value.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Circuit nominal voltage</th>
                <th className={thCn}>Test voltage (DC)</th>
                <th className={thCn}>Minimum insulation resistance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className={tdCn}>SELV and PELV</td>
                <td className={tdCn}>250 V</td>
                <td className={tdCn}>0.5 MΩ</td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className={tdCn}>Up to and including 500 V, except the above systems</td>
                <td className={tdCn}>500 V</td>
                <td className={tdCn}>1.0 MΩ</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={tdCn}>Above 500 V</td>
                <td className={tdCn}>1000 V</td>
                <td className={tdCn}>1.0 MΩ</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          A reading below the minimum points to insulation breakdown — but account for connected
          loads before you conclude that. Surge protective devices, electronic equipment and simple
          damp will all drag a reading down on otherwise sound wiring. Where connected equipment
          would influence the result or be damaged, Regulation 643.3.3 requires the Table 64 test to
          be applied before that equipment is connected, followed by a 250 V DC test between live
          conductors and the protective conductor once it is connected, with a minimum value of 1 MΩ.
          The{' '}
          <SEOInternalLink href="/guides/insulation-resistance-testing-bs7671">
            insulation resistance testing guide
          </SEOInternalLink>{' '}
          sets out the full procedure.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-white">Core diagnostic instruments</h3>
        <div className={cardCn}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">Voltage indicator (GS38)</p>
              <p className="mt-1 text-sm text-white">
                Two-pole approved indicator for proving dead and confirming live voltage. Prove it on
                a known source or proving unit before and after use.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">Low-resistance ohmmeter</p>
              <p className="mt-1 text-sm text-white">
                Continuity of protective conductors and ring final circuits (R1+R2, R2). Null the
                leads before measuring.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">Insulation resistance tester</p>
              <p className="mt-1 text-sm text-white">
                Detects breakdown between live conductors, and between live conductors and Earth, at
                the Table 64 test voltage above.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">Loop impedance tester</p>
              <p className="mt-1 text-sm text-white">
                Measures Ze and Zs to confirm the protective device will disconnect within the
                maximum time that Regulation 411.3.2.2 applies to the circuit.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">RCD tester</p>
              <p className="mt-1 text-sm text-white">
                Verifies disconnection on an AC test at the rated residual operating current (IΔn),
                separating a faulty device from genuine earth leakage on the circuit.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">Clamp meter (mA AC)</p>
              <p className="mt-1 text-sm text-white">
                Load current for overload checks, and standing earth leakage on a live circuit to
                chase down nuisance tripping.
              </p>
            </div>
          </div>
        </div>
        <p>
          For RCDs used for additional protection, Regulation 643.8 requires verification with
          equipment to BS EN 61557-6. Its note states that, regardless of RCD type, effectiveness is
          deemed verified where the device disconnects within the stated time on an alternating
          current test at IΔn — a maximum of 300 ms for a general non-delay type. Table 3A, which
          previously gave the half-times and five-times criteria, was deleted at A4:2026.
        </p>
      </>
    ),
  },
  {
    id: 'diagnose',
    heading: 'Step 4 — Diagnose',
    content: (
      <>
        <p>
          Diagnosis combines the gathered information, the visual findings and the test results into
          a conclusion. The question to ask is: do all the findings point to a single explanation? If
          not, which explanation is consistent with the most evidence — and what would you have to
          measure to break the tie?
        </p>
        <h3 className="pt-2 text-lg font-semibold text-white">Three errors that cost the most time</h3>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Fixing the first thing you find.</strong> Visible damage is often a consequence
              of the fault rather than its cause. A burnt terminal in a junction box may be the
              result of a high-resistance joint elsewhere.
            </li>
            <li>
              <strong>Assuming there is only one fault.</strong> In older installations, one fault
              can mask another. After the identified fault is fixed, verify that nothing else is
              present before declaring the installation safe.
            </li>
            <li>
              <strong>Not re-reading the results.</strong> Confirm your interpretation before acting
              on it. A misread range on an ohmmeter — 0.5 Ω against 5 Ω — sends the whole diagnosis
              the wrong way.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fix-verify',
    heading: 'Steps 5 and 6 — Fix and Verify',
    content: (
      <>
        <p>
          Rectify the cause, not only the damage it left behind. Then verify before re-energising:
          repeat, as a minimum, insulation resistance and continuity on any disturbed wiring, plus a
          functional test of any repaired or replaced device. Where a circuit previously failed on
          Zs, re-measure Zs after the repair and check it against the limit for that device.
        </p>
        <p>
          Issue the appropriate documentation for the remedial work: a{' '}
          <SEOInternalLink href="/minor-works-certificate">Minor Works Certificate</SEOInternalLink>{' '}
          for a simple repair or replacement, or an updated{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> schedule where
          significant work was needed to bring the installation to a satisfactory standard. Record
          what was found, what was done, and the verification results — a verified repair backed by a
          certificate is defensible; an unverified one is not.
        </p>
        <p>
          Keeping your own record of every fault you diagnose — symptom, tests, findings, repair —
          builds a personal database of failure patterns within a year. That is what makes
          experience-based fault finding work, and it is worth more than any single training course.
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
          Within step 3 you choose how to search. The three methods each have an optimal
          application, and the skill is switching between them rather than committing to one.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Method</th>
                <th className={thCn}>How it works</th>
                <th className={thCn}>Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>Half-split</td>
                <td className={tdCn}>
                  Test at the midpoint; the result tells you which half holds the fault. Repeat on
                  that half, halving the search area each time.
                </td>
                <td className={tdCn}>
                  Long runs with a single unknown fault, and large distribution systems. The most
                  efficient method when nothing else narrows the field.
                </td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>Elimination</td>
                <td className={tdCn}>
                  Remove or disconnect items one at a time until the fault disappears, isolating the
                  culprit by exclusion.
                </td>
                <td className={tdCn}>
                  Multiple loads on one circuit, faults that look like they sit in a load rather than
                  the fixed wiring, and situations where the circuit has to stay live.
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>Experience-based</td>
                <td className={tdCn}>
                  Go straight to the most common cause for this symptom and installation type, guided
                  by known failure patterns.
                </td>
                <td className={tdCn}>
                  Familiar symptoms — a shower element, a failed capacitor in a fitting. Fastest when
                  right; abandon it once two guesses have been wrong.
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
          Safe isolation applies whenever hands-on work is carried out on a circuit, and the
          procedure cannot be abbreviated for a short task. BS 7671 sets the requirements for the
          devices; the Electricity at Work Regulations 1989 make working dead a legal duty, with live
          working permitted only where it is unreasonable in all the circumstances for the conductor
          to be dead and suitable precautions are taken.
        </p>
        <div className={tableWrapCn}>
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-white/[0.06]">
                <th className={thCn}>Stage</th>
                <th className={thCn}>What it involves</th>
                <th className={thCn}>Requirement</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>1. Identify</td>
                <td className={tdCn}>
                  Identify the correct isolation point and confirm the circuit labelling is right
                  before you switch anything off.
                </td>
                <td className={tdCn}>
                  Each device used for isolation must be clearly identified by position or durable
                  marking to indicate the circuit it isolates (Regulation 537.2.7).
                </td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>2. Isolate and secure</td>
                <td className={tdCn}>
                  Switch off at the correct device, lock off, and apply a warning notice.
                </td>
                <td className={tdCn}>
                  Every circuit must have a means of isolation for all live conductors (Regulation
                  462.2), designed and installed to prevent unintentional or inadvertent closure —
                  lockable space or enclosure, or padlocking (Regulation 462.3; Regulation 537.2.4).
                </td>
              </tr>
              <tr className="border-t border-white/10">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>3. Prove dead</td>
                <td className={tdCn}>
                  Prove the indicator on a known live source or proving unit, test the isolated
                  circuit, then prove the indicator again.
                </td>
                <td className={tdCn}>
                  The proving sequence is HSE guidance, not BS 7671. HSE Guidance Note GS38 covers
                  the test equipment.
                </td>
              </tr>
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className={`${tdCn} font-semibold whitespace-nowrap`}>4. Maintain isolation</td>
                <td className={tdCn}>
                  Keep the lock and notice in place for the whole job, and confirm the circuit cannot
                  be back-fed from a generator, battery storage or a parallel circuit.
                </td>
                <td className={tdCn}>
                  Do not rely on a verbal assurance from anyone else. Where residual energy may be
                  present, provide for its discharge (Regulation 462.4).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Note that BS 7671 contains no step-by-step safe isolation procedure. The identify, isolate,
          prove dead sequence comes from HSE guidance — GS38 for the test equipment, and HSR25 for
          guidance on the Electricity at Work Regulations themselves.
        </p>
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
      title="Electrical Fault Finding: The Six-Step Method"
      description="The six-step approach to electrical fault finding: gather information, visual inspection, test, diagnose, fix and verify — plus half-split and elimination."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Search}
      answerBox={{
        question: 'What is the six-step approach to electrical fault finding?',
        answer:
          'Gather information, visual inspection, test, diagnose, fix, verify. Each step narrows the possibilities before the next begins. Within testing you choose half-split, elimination or experience-based searching. BS 7671 does not prescribe the sequence — it sets the test requirements (Chapter 64) and the isolation requirements (Sections 462 and 537) you use along the way.',
      }}
      heroTitle={
        <>
          Electrical Fault Finding Methodology:{' '}
          <span className="text-elec-yellow">The Six-Step Approach</span>
        </>
      }
      heroSubtitle="A systematic approach to electrical fault finding for UK electricians. The six steps — gather information, visual inspection, test, diagnose, fix and verify — plus the half-split, elimination and experience-based methods, and safe isolation under BS 7671 Section 537 and the Electricity at Work Regulations 1989."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Fault Finding"
      relatedPages={relatedPages}
      ctaHeading="Document Fault Investigations and Certify Repairs on Your Phone"
      ctaSubheading="Elec-Mate's AI fault diagnosis and certification tools help you record findings, attach photos, and issue professional reports and certificates on site. Join 1,600+ UK electricians. 7-day free trial."
    />
  );
}
