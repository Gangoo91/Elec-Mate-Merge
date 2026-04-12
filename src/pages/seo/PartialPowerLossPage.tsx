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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Partial Power Loss Fault Finding', href: '/guides/partial-power-loss-fault-finding' },
];

const tocItems = [
  { id: 'overview', label: 'What Causes Partial Power Loss?' },
  { id: 'missing-phase', label: 'Missing Phase (Three-Phase Premises)' },
  { id: 'open-neutral', label: 'Open Circuit Neutral' },
  { id: 'failed-mcb', label: 'Failed MCB' },
  { id: 'multimeter-checks', label: 'Checking with a Multimeter' },
  { id: 'safe-isolation', label: 'Safe Isolation Procedure' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Partial power loss — where some circuits in an installation lose power but others remain live — is most commonly caused by a failed MCB, a tripped RCD, an open circuit neutral, or a missing phase in a three-phase supply.',
  'On three-phase premises, loss of one phase causes all circuits on that phase to lose power while circuits on the other two phases remain fully energised. This affects approximately one third of the installation.',
  'An open circuit neutral is one of the most dangerous faults in a single-phase installation. Under load, the voltage on the affected circuits can rise above or fall below 230V, potentially damaging appliances and creating shock risks.',
  'A failed MCB (one that appears to be in the on position but is internally open circuit) causes loss of power to a specific circuit with no visible indication of the fault. The MCB appears healthy but does not close the circuit.',
  'All live voltage testing must be carried out with appropriate personal protective equipment (PPE) including insulated gloves and approved voltage indicators compliant with GS38. Safe isolation of circuits before hands-on work is a legal requirement under the Electricity at Work Regulations 1989.',
];

const faqs = [
  {
    question: 'Why have some sockets stopped working but others are fine?',
    answer:
      'The most common causes of partial socket loss in a domestic installation are: a tripped MCB on a ring final circuit (resetting will restore power); a tripped RCD protecting a section of circuits (resetting restores all circuits on that RCD); a failed MCB that appears on but is internally broken (replace the MCB); or an open circuit neutral on a specific circuit (requires investigation with a multimeter). In older installations with rewireable fuses, a blown fuse element is a common cause. Check the consumer unit first — look for any MCBs in the tripped (mid or down) position, and try resetting the RCDs one at a time to identify which one is off.',
  },
  {
    question: 'What is an open circuit neutral and how dangerous is it?',
    answer:
      'An open circuit neutral is a break or disconnection in the neutral conductor supplying a circuit or the entire installation. On a single-phase final circuit, an open neutral causes the circuit to go dead — no current can flow because the circuit is incomplete. This is a nuisance but not immediately dangerous. However, an open circuit on the supply neutral (the neutral conductor from the transformer to the installation) is extremely dangerous on a three-phase supply. In a three-phase installation with a broken supply neutral, the normally balanced phase voltages become unbalanced. Circuits with light loads may experience voltages well above 230V, potentially destroying all connected appliances. Circuits with heavy loads may experience voltages well below 230V. This is known as a lost neutral event and can cause severe damage across an entire premises in seconds.',
  },
  {
    question: 'How do I identify which MCB has failed without a multimeter?',
    answer:
      'A failed MCB (internally open circuit while in the on position) is unusual but does occur — particularly with older devices, devices that have experienced repeated fault currents, or devices of poor quality. Without a multimeter, the best approach is: identify which circuits have lost power by testing sockets and lights; identify the MCBs controlling those circuits from the consumer unit labelling; switch each suspect MCB off then on again firmly — this sometimes restores contact if the MCB is in an intermediate position; if power is not restored, try the same circuits with a different known-good MCB (if you have a spare) by temporarily swapping them. With a multimeter: measure voltage at the load terminals of each MCB with the MCB in the on position — a functioning MCB should show the same voltage on both terminals. If the line terminal shows voltage but the load terminal shows zero, the MCB has failed internally.',
  },
  {
    question: 'What does a missing phase feel like in a three-phase commercial premises?',
    answer:
      'In a three-phase commercial or industrial premises, loss of one phase (L1, L2, or L3) causes one third of the circuits to lose power simultaneously. All the circuits on the affected phase go dead at the same time. In a balanced three-phase distribution board, roughly every third MCB will be on the missing phase. In practice, the fault presents as: the premises has power in some areas but not others; specific three-phase equipment (motors, ovens, large HVAC units) may still run but with reduced performance or tripped thermal protection; three-phase sockets show correct voltage on two pins but zero on the third. The distributor should be notified immediately for a loss of supply phase — this is a network fault and the distributor is responsible for restoring it.',
  },
  {
    question: 'Can a partial power loss be caused by a problem outside my installation?',
    answer:
      "Yes. Partial power loss can be caused by a fault in the distribution network rather than in the internal installation. Common external causes include: loss of one phase on the distributor's LV network (affects all three-phase premises supplied from the affected phase); a blown cut-out fuse in the service head (the distributor's sealed fuse at the intake point — this requires the distributor to attend); a fault in the service cable between the street and the premises; and — on rural properties — a broken overhead line conductor. If testing at the consumer unit shows that the incoming supply voltage is incorrect (below 207V or above 253V, or missing on one phase), the fault is upstream of the installation and the distributor must be notified.",
  },
  {
    question: 'How do I check if the incoming supply is correct?',
    answer:
      'To check the incoming supply voltage, measure between the line and neutral terminals of the main switch or the line side of the consumer unit main switch. This must be done with live conductors exposed — only qualified persons using appropriate PPE and GS38-compliant test equipment should do this. On a single-phase supply, the voltage should be 230V ±10% (207V to 253V). On a three-phase supply, measure each phase to neutral (should be 230V each) and each phase pair to phase (should be 400V each). Low voltage on all phases suggests a network overload or transformer issue. Zero voltage on one phase while others are normal confirms a missing phase at supply level. If the incoming supply is faulty, do not attempt to repair — contact the distributor.',
  },
  {
    question: 'Is it safe to reset an MCB or RCD that has tripped?',
    answer:
      'An MCB or RCD trips for a reason — to protect the circuit from a fault or overload. Before resetting a tripped device, try to identify why it tripped. For an MCB: check whether the circuit is overloaded (too many appliances on a circuit that is rated for a lower current); check whether a single appliance has developed a fault (unplug all appliances before resetting and reconnect one by one). For an RCD: check whether any appliance has developed earth leakage (unplug all appliances from the affected circuits before resetting). If the device trips again immediately after resetting with all loads removed, there is a fault in the fixed wiring — carry out safe isolation and insulation resistance testing. Never tape an MCB or RCD in the on position — this defeats the protective function and is dangerous.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-fault-finding-guide',
    title: 'Electrical Fault Finding Methodology',
    description:
      'Systematic approach: gather info, visual inspection, test, diagnose, fix, verify.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/troubleshooting-high-earth-leakage',
    title: 'Troubleshooting High Earth Leakage',
    description: 'Why RCDs nuisance trip and how to find the leaking circuit.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Testing',
    description: 'IR testing to diagnose wiring faults after partial power loss.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Record fault findings and issue coded observations on inspection reports.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/earthing-system-fault-finding',
    title: 'Earthing System Fault Finding',
    description: 'Open circuit earth, poor electrode connections, and PME lost neutral dangers.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with modules on fault finding and safe isolation.',
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
    heading: 'What Causes Partial Power Loss?',
    content: (
      <>
        <p>
          Partial power loss — where an installation loses power on some circuits but retains it on
          others — is one of the most common electrical fault calls. Unlike a complete power failure
          (which is almost always a supply issue or main switch fault), partial loss requires
          systematic diagnosis because several different faults can produce similar symptoms.
        </p>
        <p>The most common causes are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tripped MCB</strong> — the most common cause. An overloaded or faulted
                circuit trips its MCB, cutting power to that circuit only.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tripped RCD</strong> — an RCD protecting a bank of circuits trips, cutting
                power to all circuits behind it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Failed MCB</strong> — an MCB that appears to be on but has failed internally
                (open circuit). Less common but easily missed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open circuit neutral</strong> — a broken neutral conductor in the fixed
                wiring or supply. Dangerous in three-phase premises.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing phase</strong> — loss of one phase on a three-phase supply, causing
                all circuits on that phase to lose power.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Always begin with the simplest, most likely cause — check the consumer unit for tripped
          devices — before moving to more complex diagnostic work. This saves significant time on
          the majority of partial power loss calls.
        </p>
      </>
    ),
  },
  {
    id: 'missing-phase',
    heading: 'Missing Phase — Three-Phase Premises',
    content: (
      <>
        <p>
          On three-phase commercial or industrial premises, loss of a single phase from the supply
          is a relatively common occurrence. The distributor's network can lose a phase due to a
          blown fuse in a substation, a conductor failure on the overhead network, or a cable fault.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Symptoms</strong> — approximately one third of circuits lose power
                simultaneously. Three-phase motors may continue to run but with reduced torque
                (single-phasing) and risk of overheating if the thermal protection does not operate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Diagnosis</strong> — measure line-to-neutral voltage at the main switch. One
                phase will read zero. Confirm this is a supply issue, not an internal distribution
                fault, by checking that the missing phase is absent at the incoming terminals of the
                main switch (before the switch contacts).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Action</strong> — notify the distributor. This is a network fault and
                outside the scope of the internal electrical installation. While waiting for the
                distributor, switch off any three-phase motors and equipment that may be damaged by
                single-phase operation.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Document fault investigation findings on your phone"
          description="Elec-Mate's AI fault diagnosis tool and EICR app help you record fault findings, generate reports, and issue certificates — all from your phone on site."
          icon={Zap}
        />
      </>
    ),
  },
  {
    id: 'open-neutral',
    heading: 'Open Circuit Neutral — A Dangerous Fault',
    content: (
      <>
        <p>
          An open circuit neutral on a final circuit makes that circuit dead — no current can
          complete its return path. This is a nuisance but not immediately dangerous in a final
          circuit. However, an open neutral in the supply conductors of a three-phase installation
          is a serious emergency.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lost neutral in three-phase premises (PME)</strong> — on a TN-C-S (PME)
                supply, the neutral and protective earth are combined in the supply cable. If the
                supply neutral breaks, all PME earthed metalwork in the premises rises to a
                dangerous voltage. This is a life-safety emergency — evacuate the premises and
                contact the distributor immediately. Do not touch any metalwork.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open neutral on a final circuit</strong> — safe but requires repair. The
                circuit will be completely dead. Identify the break by systematic{' '}
                <SEOInternalLink href="/guides/continuity-testing-electricians-guide">
                  continuity testing
                </SEOInternalLink>{' '}
                of the neutral conductor from the consumer unit to each accessory.
              </span>
            </li>
          </ul>
        </div>
        <p>
          To diagnose a neutral fault on a final circuit: measure voltage between L and E at the
          affected sockets — if voltage is present between L and E but not between L and N, the
          neutral is open. Carry out safe isolation and then continuity test the neutral conductor
          to find the break.
        </p>
      </>
    ),
  },
  {
    id: 'failed-mcb',
    heading: 'Failed MCB — The Hidden Fault',
    content: (
      <>
        <p>
          An MCB that has failed internally while remaining in the on position is a fault that can
          puzzle even experienced electricians. The MCB handle is in the up (on) position, there is
          no visible indication of a fault, but the circuit is dead.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to test</strong> — with appropriate PPE, use a multimeter to measure
                voltage at the load terminal of the MCB (the bottom terminal) with the MCB switched
                on. The line terminal (top) should show 230V. If the load terminal shows zero, the
                MCB has failed internally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why it happens</strong> — MCBs can fail after repeated fault current
                interruptions, which cause pitting and erosion of the internal contact surfaces.
                They can also fail due to overheating from persistent overloading, or simply from
                age-related deterioration of the bi-metallic strip or magnetic trip mechanism.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Action</strong> — replace the MCB with a device of the same type and rating.
                Carry out safe isolation of the affected circuit before removing the old MCB.
                Investigate why the MCB may have failed to determine whether there is an underlying
                circuit fault.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'multimeter-checks',
    heading: 'Checking with a Multimeter — Step by Step',
    content: (
      <>
        <p>
          A multimeter is essential for diagnosing partial power loss. Here is a systematic sequence
          of measurements:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                1
              </span>
              <span>
                <strong>Check the incoming supply</strong> — at the main switch, measure L to N and
                L to E. Should be 230V. If missing, contact the distributor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                2
              </span>
              <span>
                <strong>Check each MCB load terminal</strong> — with all MCBs on, measure L to N at
                the load terminal of each MCB. Should be 230V. Zero on load terminal with 230V on
                line terminal = failed MCB.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                3
              </span>
              <span>
                <strong>Check at the affected accessory</strong> — measure L to N, L to E, and N to
                E at a dead socket or light switch. Voltage present on L to E but not L to N
                indicates an open neutral. No voltage on L to E indicates an open line or failed
                MCB.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                4
              </span>
              <span>
                <strong>Carry out safe isolation before hands-on work</strong> — always isolate the
                circuit, verify dead with an approved voltage indicator, lock off, and prove safe
                before touching conductors or removing accessories.
              </span>
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'safe-isolation',
    heading: 'Safe Isolation Procedure',
    content: (
      <>
        <p>
          Safe isolation is the process of making an electrical circuit dead and verifying that it
          cannot be re-energised before carrying out hands-on work. It is a legal requirement under
          the Electricity at Work Regulations 1989 (Regulation 12) and HSE GS38 guidance. Here is
          the correct procedure:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-none">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                1
              </span>
              <span>
                Identify the circuit to be isolated and confirm it is the correct circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                2
              </span>
              <span>
                Switch off the MCB or disconnect the fuse. Apply a lockout device and warning sign.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                3
              </span>
              <span>
                Prove the voltage indicator is working on a known live source before and after
                testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                4
              </span>
              <span>
                Test all conductors (L, N, E) at the point of work with the approved voltage
                indicator. All should read zero.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-bold text-sm flex items-center justify-center">
                5
              </span>
              <span>
                Confirm safe and begin work. Maintain the lockout throughout — do not rely on verbal
                confirmation from others that the circuit remains isolated.
              </span>
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Efficient Partial Power Loss Diagnosis',
    content: (
      <>
        <p>
          Partial power loss calls need to be diagnosed quickly and accurately, particularly in
          commercial premises where downtime has a direct cost. Here is a practical first-response
          approach:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Start at the Consumer Unit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ninety per cent of partial power loss calls are resolved at the consumer unit — a
                  tripped MCB or RCD. Check every device before picking up a multimeter. Look for
                  any MCB in an intermediate position, any RCD switched down, and any fuse carrier
                  out of its holder.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Map the Affected Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before touching anything, ask the occupant which areas have lost power and which
                  still have power. This immediately tells you whether the fault pattern is
                  consistent with a single MCB, an RCD bank, a missing phase, or something else. On
                  a three-phase premises, if power loss is patchy across the building, think phase
                  loss. If it is a single room or area, think local MCB or RCD.
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

export default function PartialPowerLossPage() {
  return (
    <GuideTemplate
      title="Partial Power Loss Fault Finding | Missing Phase, Open Neutral, Failed MCB"
      description="Complete guide to diagnosing partial power loss for UK electricians. Covers missing phase in three-phase premises, open circuit neutral dangers, failed MCBs, multimeter diagnostic checks, and safe isolation procedure."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fault Finding Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Partial Power Loss Fault Finding:{' '}
          <span className="text-yellow-400">Missing Phase, Open Neutral, and Failed MCBs</span>
        </>
      }
      heroSubtitle="A complete guide to diagnosing and resolving partial power loss in UK electrical installations. Covers missing phase in three-phase premises, the dangers of an open circuit neutral, failed MCBs, multimeter diagnostic checks, and safe isolation."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Partial Power Loss"
      relatedPages={relatedPages}
      ctaHeading="Document Fault Findings and Issue Certificates on Your Phone"
      ctaSubheading="Elec-Mate's AI fault diagnosis and EICR app help you record findings, generate reports, and issue certificates on site. Join 1,000+ UK electricians. 7-day free trial."
    />
  );
}
