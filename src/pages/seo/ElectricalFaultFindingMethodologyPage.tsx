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
  { id: 'safe-isolation', label: 'Safe Isolation — BS 7671 Appendix 2' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A systematic fault finding approach — gather information, visual inspection, test, diagnose, fix, verify — is more reliable and faster than random testing. Every step has a purpose.',
  'The half-split method divides the circuit at its midpoint and tests there first, eliminating half the circuit with each test. This is the fastest approach for long circuits with a single fault.',
  'The elimination method disconnects items one by one until the fault disappears. Best used when the fault is likely in a load (appliance or accessory) rather than the fixed wiring.',
  'Experience-based fault finding uses knowledge of failure patterns (which components fail most commonly on this type of circuit or equipment) to go directly to the most likely cause first. Effective when the pattern matches known failure modes.',
  'Safe isolation must be carried out before any hands-on work on the circuit. BS 7671 Appendix 2 sets out the requirements, and the Electricity at Work Regulations 1989 make it a legal requirement. Always prove dead with an approved GS38-compliant voltage indicator before touching conductors.',
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
    question: 'What does BS 7671 Appendix 2 say about safe isolation?',
    answer:
      'BS 7671:2018+A3:2024 Appendix 2 (Safe Isolation Procedure) sets out the procedure for safely isolating an electrical circuit before carrying out inspection and testing or fault finding work. The procedure requires: identification of the circuit to be isolated; switching off the circuit at the appropriate point (MCB, fuse, or isolator); preventing re-energisation (lockout and warning sign); verifying that the circuit is dead using an approved voltage indicator (compliant with HSE GS38) that has been proved on a known live source before and after testing; and confirming that the circuit cannot be inadvertently energised from any other source (e.g., a generator, battery backup, or parallel circuit). The Electricity at Work Regulations 1989, Regulation 12, makes safe isolation a legal requirement — working on live conductors without specific justification and appropriate precautions is a criminal offence.',
  },
];

const relatedPages: RelatedPage[] = [
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
          7671 Appendix 2 and the Electricity at Work Regulations 1989.
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
          description="Elec-Mate's EICR app allows you to attach photos directly to coded observations, creating a full visual record of the fault and its location. Professional reports generated instantly."
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
        <p>The three main fault finding methods each have their optimal application:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-6 text-white">
            <li>
              <h4 className="font-bold text-white mb-2">Half-Split Method</h4>
              <p className="text-sm leading-relaxed">
                Test at the midpoint of the circuit or system. The result tells you which half
                contains the fault. Repeat on the faulty half. Best for: long cables with an unknown
                single fault, large distribution systems with many possible fault locations.
                Mathematically the most efficient method when no other information is available.
              </p>
            </li>
            <li>
              <h4 className="font-bold text-white mb-2">Elimination Method</h4>
              <p className="text-sm leading-relaxed">
                Remove or disconnect items one at a time until the fault disappears. Best for:
                multiple potential sources (appliances on a circuit), live testing where halving is
                impractical, and faults that appear to be in a load rather than fixed wiring.
              </p>
            </li>
            <li>
              <h4 className="font-bold text-white mb-2">Experience-Based Method</h4>
              <p className="text-sm leading-relaxed">
                Go directly to the most common cause for this type of fault and installation. Best
                for: well-known failure patterns (electric shower element, fluorescent fitting
                capacitor), situations where the symptom matches a familiar pattern. Fastest when
                correct, but should be abandoned quickly if the first two guesses are wrong.
              </p>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'safe-isolation',
    heading: 'Safe Isolation Throughout — BS 7671 Appendix 2',
    content: (
      <>
        <p>
          Safe isolation must be applied whenever hands-on work is carried out on a circuit. BS 7671
          Appendix 2 and the Electricity at Work Regulations 1989 Regulation 12 make this a legal
          requirement. The procedure cannot be abbreviated, even for short tasks.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Identify</strong> — identify the correct isolation point for the circuit to
                be worked on. Confirm the circuit labelling is correct by testing before isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolate</strong> — switch off at the correct MCB, fuse, or isolator. Apply a
                lock and warning notice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prove</strong> — use a GS38-compliant voltage indicator to prove the circuit
                is dead. Test the indicator on a known live source before and after testing the
                isolated circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintain</strong> — keep the lockout in place throughout the work. Do not
                rely on verbal assurance from others.
              </span>
            </li>
          </ul>
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
      title="Electrical Fault Finding Methodology | Systematic Approach for Electricians"
      description="Complete guide to electrical fault finding methodology for UK electricians. Covers the systematic approach (gather info, visual inspection, test, diagnose, fix, verify), the half-split method, elimination method, experience-based method, and BS 7671 Appendix 2 safe isolation."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={Search}
      heroTitle={
        <>
          Electrical Fault Finding Methodology:{' '}
          <span className="text-yellow-400">Systematic Approach for UK Electricians</span>
        </>
      }
      heroSubtitle="A complete guide to systematic electrical fault finding. Covers the five-step approach (gather information, visual inspection, test, diagnose, fix and verify), the half-split method, elimination method, experience-based method, and BS 7671 Appendix 2 safe isolation throughout."
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
