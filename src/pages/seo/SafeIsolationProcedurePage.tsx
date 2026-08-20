import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ShieldAlert,
  Lock,
  AlertTriangle,
  ShieldCheck,
  ClipboardCheck,
  Brain,
  ListOrdered,
  FileCheck2,
  Scale,
  HardHat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Safe Isolation Procedure: Prove-Test-Prove';
const PAGE_DESCRIPTION =
  '10-step safe isolation: prove the indicator, lock off with your own padlock, test L-N, L-E and N-E for 0 V, then prove again. GS 38 and EAWR 1989 rules.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Safe Isolation Procedure', href: '/guides/safe-isolation-procedure' },
];

const tocItems = [
  { id: 'what-is-safe-isolation', label: 'What Is Safe Isolation?' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'gs38-requirements', label: 'GS 38 Requirements' },
  { id: 'voltage-indicators', label: 'Voltage Indicators' },
  { id: 'how-to', label: 'Step-by-Step Procedure' },
  { id: 'lock-off-loto', label: 'Lock-Off and LOTO' },
  { id: 'neutral-isolation', label: 'Does the Neutral Have to Be Isolated?' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'three-phase', label: 'Three-Phase Isolation' },
  { id: 'solar-pv-isolation', label: 'Solar PV and Battery Isolation' },
  { id: 'semiconductor-isolators', label: 'Semiconductor Devices' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Safe isolation is a legal requirement under the Electricity at Work Regulations 1989: Reg 12 requires a means of cutting off and isolating supply, Reg 13 requires precautions (lock-off, prove dead) before working on equipment made dead, and Reg 14 makes dead working the default over live work.',
  'The prove-test-prove method is the standard: prove your voltage indicator works, test the circuit is dead, prove the indicator still works.',
  'HSE Guidance Note GS 38 specifies the requirements for test equipment — HBC fused leads, finger guards, maximum 4 mm exposed probe tips, and a proving unit.',
  'Lock-off with a personal padlock is not optional — it prevents inadvertent re-energisation and is the physical guarantee of your safety.',
  'BS 7671 Reg 462.2 requires isolation means for all live conductors "except as detailed in Regulation 461.2" — and 461.2 permits the neutral to be left unswitched in TN-S and TN-C-S. Table 537.4 note (d) is explicit that it is TT and IT systems where isolation requires disconnection of every live conductor.',
  'Reg 537.2.2 prohibits semiconductor devices (smart dimmers, relay modules, EVSE controller relays) from serving as the means of isolation. Reg 537.3.1.3 explains why: a semiconductor device can interrupt the current without opening the poles.',
  'On solar PV installations, Reg 712.514.102 requires a permanent warning notice at every DC access point and Reg 712.514.103 a notice on every inverter reading "WARNING Isolate both AC and DC sides before servicing".',
  'Elec-Mate includes guided safe isolation checklists, AI Health and Safety agents that generate RAMS with safe isolation procedures, and testing tools that validate results against BS 7671.',
];

const faqs = [
  {
    question: 'What is GS 38 and why does it matter for safe isolation?',
    answer:
      'GS 38 is a Guidance Note published by the Health and Safety Executive (HSE) titled "Electrical test equipment for use by electricians." It covers the test equipment and test leads used for proving circuits dead — it is not itself the isolation procedure, which sits under the Electricity at Work Regulations 1989 (HSE guidance HSR25). While GS 38 is guidance rather than regulation, following it is considered best practice and is expected by all competent person scheme providers. The key GS 38 requirements are: test probes must have finger barriers to prevent accidental contact with live parts, test leads must be protected by an HBC fuse of low current rating (usually not exceeding 500 mA), probe tips must expose no more than 4 mm of metal — with a strong recommendation to reduce this to 2 mm or less, or use spring-loaded screened probes — and the voltage indicator must be clearly marked with its voltage rating and conform to a recognised standard such as BS EN 61243-3. Using non-GS 38 compliant equipment is dangerous and could result in electric shock, arc flash, or a false dead reading that leads an electrician to work on a live circuit.',
  },
  {
    question: 'Can I use a multimeter instead of a voltage indicator for safe isolation?',
    answer:
      'GS 38 strongly recommends using a dedicated two-pole voltage indicator rather than a multimeter for proving circuits dead. The reason is that a multimeter can give a false dead reading in several ways: the battery may be flat, the range selector may be on the wrong setting (for example, set to current instead of voltage), the internal fuse may have blown, or the leads may be damaged. A two-pole voltage indicator is a simpler, more reliable instrument that gives a clear live or dead indication without relying on batteries — it is powered by the circuit being tested. Two-pole indicators also typically have a solenoid display (a physical needle movement) that cannot be affected by induced voltages or stray capacitance, which can give misleading readings on high-impedance digital multimeters. If you do use a multimeter, it must comply with GS 38 requirements and you must prove it works on a known live source before and after testing.',
  },
  {
    question: 'What is the prove-test-prove method?',
    answer:
      'The prove-test-prove method is the standard safe isolation procedure. Step 1 (Prove): Prove that your voltage indicator is working correctly by testing it on a known live source — either a dedicated proving unit or another circuit you know is energised. The indicator must give a clear, positive indication of voltage. Step 2 (Test): Test the circuit you have isolated at the point of work. Check between all conductor combinations — Line to Neutral (L-N), Line to Earth (L-E), and Neutral to Earth (N-E). All three must show zero volts. Step 3 (Prove): Prove that your voltage indicator still works by testing it again on the same known live source. This final step is the most critical because it confirms that your indicator did not fail between the first prove and the test. If the indicator had failed silently (broken lead, blown fuse, flat battery), the dead reading you got in Step 2 would be meaningless. Skipping the final prove step has been a contributing factor in multiple fatal electrical accidents.',
  },
  {
    question: 'Do I need to lock off every circuit I work on?',
    answer:
      'Yes. Regulation 13 of the Electricity at Work Regulations 1989 requires that adequate precautions are taken to prevent equipment made dead becoming live while work is being carried out, and Regulation 12 requires a means of cutting off and isolating the supply in the first place. BS 7671:2018+A4:2026 Regulation 462.3 requires devices for isolation to be designed and installed so as to prevent unintentional or inadvertent closure, and names padlocking as one of its examples of adequate precautions. In practice, this means physically locking off the means of isolation using a padlock and lock-off device on the circuit breaker or fuse carrier, and attaching a caution notice. The padlock must be a personal padlock with a unique key that only you hold. On multi-person jobs, each person working on the circuit must apply their own padlock using a multi-lock hasp. Simply switching off a circuit breaker without locking it is not sufficient — another person could switch it back on. This has been a factor in serious and fatal accidents where a colleague, building manager, or occupant switched a circuit back on while someone was working on it.',
  },
  {
    question: 'What are the legal requirements for safe isolation?',
    answer:
      'Safe isolation is a legal requirement under multiple pieces of legislation. The Electricity at Work Regulations 1989 — specifically Regulation 12 (means of cutting off supply and isolation) and Regulation 13 (precautions for work on equipment made dead) — require that circuits are isolated and proved dead before work begins, and that precautions are taken to prevent re-energisation. The Health and Safety at Work etc. Act 1974 imposes a general duty on employers and employees to ensure the safety of themselves and others. Regulation 16 requires persons to be competent to prevent danger and injury — BS 7671 itself points to it, and to HSE guidance HSR25, in its definition of a skilled person. The Management of Health and Safety at Work Regulations 1999 require risk assessments that must include consideration of electrical hazards. BS 7671:2018+A4:2026 Section 462 specifies the requirements for isolation, and Reg 641.4 requires precautions to be taken to avoid danger to persons during inspection and testing. HSE Guidance Note GS 38 provides specific guidance on the test equipment to use. Failure to carry out safe isolation can result in criminal prosecution, particularly if someone is injured or killed. In fatal electrical accident investigations, one of the first things the HSE examines is whether safe isolation was carried out correctly.',
  },
  {
    question: 'What should I do if my voltage indicator shows dead but I am not confident?',
    answer:
      'If you have any doubt whatsoever, treat the circuit as live and do not work on it until you have resolved your uncertainty. Repeat the full prove-test-prove procedure from the beginning. Check that your voltage indicator is functioning correctly on a known live source. Verify that you have isolated the correct circuit — circuit labelling can be wrong, especially in older installations or installations that have been modified without updating the circuit chart. Test at the point of work, not just at the consumer unit — a fault could re-energise conductors downstream of the isolation point. If necessary, use a second independent voltage indicator to cross-check the reading. Consider whether there could be alternative supplies — solar PV inverters, UPS systems, standby generators, or other sources of back-feed. In commercial and industrial settings, check whether there are multiple supply sources or ring main units that could energise the circuit from a different direction. Never rely solely on a single test or a single instrument. The consequences of working on a live circuit that you believed was dead are potentially fatal.',
  },
  {
    question: 'Does the neutral have to be isolated as well as the line?',
    answer:
      'It depends on the earthing system, and this is the point most often quoted the wrong way round. BS 7671 Regulation 462.2 requires isolation means for all live conductors, but adds "except as detailed in Regulation 461.2". Regulation 461.2 says that in TN-C-S and TN-S systems, isolation or switching of the neutral conductor is not required if protective equipotential bonding is installed and either the neutral is reliably connected to Earth by a low resistance sufficient to meet the Chapter 41 disconnection times, or the distributor declares that the PEN or neutral of the supply is. In TN-C and TN-C-S systems the PEN conductor shall not be isolated or switched at all. Where every live conductor must be broken is in TT and IT systems — note (d) to Table 537.4 says so directly and refers back to Regulation 462.2. Separately, Regulation 462.1.201 requires that a main switch intended for operation by ordinary persons, for example in a household installation, interrupts both live conductors of a single-phase supply, and Regulation 132.14.2 requires any device inserted in an earthed neutral to be linked and arranged to break all the related line conductors. None of this changes what you do with the tester: you still prove L-N, L-E and N-E all read zero at the point of work, because an unswitched neutral can still be at a dangerous potential if it is borrowed, cross-connected or open-circuit upstream.',
  },
  {
    question: 'How does safe isolation differ for three-phase supplies?',
    answer:
      'Three-phase safe isolation follows the same prove-test-prove principle but requires additional tests because there are more conductors. After isolating the circuit and locking off, you must test between all conductor combinations: L1 to L2, L1 to L3, L2 to L3 (phase-to-phase), L1 to Neutral, L2 to Neutral, L3 to Neutral (phase-to-neutral), and L1 to Earth, L2 to Earth, L3 to Earth, Neutral to Earth (all conductors to earth). This gives a total of 10 tests rather than the 3 tests needed for single-phase. The reason for testing between all phases is that isolation devices can fail partially — for example, a three-phase isolator may have one pole that does not open fully, leaving one phase still energised. You must also consider the possibility of back-feed from motor loads (a motor can act as a generator for a short time after being disconnected from the supply if it is still spinning) and from stored energy. Regulation 462.4 requires suitable means of discharge where residual electrical energy is potentially present, and a warning label stating the discharge time required before the enclosure can be safely opened — read that label and wait it out before opening capacitor banks, drives or inverter enclosures.',
  },
];

const howToSteps = [
  {
    name: 'Obtain permission and notify the client or occupant',
    text: 'Before touching the distribution board, inform the client or building occupant of the circuit you are about to isolate, the duration of the outage, and any services that will be affected (for example, alarms, refrigeration, or other trades on site). Obtain permission to turn off the power. This step is required practice — it prevents disputes, protects people who may be relying on the supply (medical equipment, heating systems), and is explicitly identified in practical work intelligence as a preparation requirement before isolation is carried out.',
  },
  {
    name: 'Identify the circuit to be worked on',
    text: 'Identify the correct circuit at the distribution board or consumer unit. Check the circuit chart and labelling, but never rely solely on labels — they may be incorrect or out of date. Verify the circuit identity by switching the load on and off at the consumer unit and observing the result at the point of work. For example, switch off the MCB and confirm that the light or socket at the work location goes off. This prevents you from isolating the wrong circuit — a surprisingly common error.',
  },
  {
    name: 'Select a GS 38 compliant voltage indicator',
    text: 'Choose a two-pole voltage indicator that complies with HSE Guidance Note GS 38. The instrument must be rated to at least CAT III (for distribution-level testing) or CAT IV (for origin-level testing). Check that test leads are protected by an HBC fuse of low current rating (usually not exceeding 500 mA), that probes have finger barriers to prevent contact with live parts, and that no more than 4 mm of metal is exposed at the tip — GS 38 strongly recommends reducing this to 2 mm or less, or using spring-loaded screened probes. Verify the instrument is within its calibration date. Have a proving unit (battery-powered device that outputs a known voltage) available for the prove steps.',
  },
  {
    name: 'Prove the voltage indicator works (first prove)',
    text: 'Test your voltage indicator on a known live source — either a dedicated proving unit or another circuit you know is energised. The indicator must give a clear, positive indication that voltage is present. If the indicator does not respond to the known live source, it is faulty. Do not use it. Replace the instrument, battery, or fuses and re-test. This step confirms that the instrument you are about to rely on for your safety is actually working.',
  },
  {
    name: 'Isolate and lock off',
    text: 'Switch off the circuit breaker or remove the fuse carrier for the identified circuit. Apply a lock-off device and your personal padlock to the circuit breaker or fuse carrier to prevent re-energisation — BS 7671 Reg 462.3 requires devices for isolation to be installed so as to prevent unintentional or inadvertent closure, and gives padlocking as one of its examples. Attach a clearly visible caution notice on the distribution board, typically worded "DANGER — DO NOT SWITCH ON — WORK IN PROGRESS", with your name, the date and a contact number. If multiple people are working on the same circuit, each person must apply their own padlock using a multi-lock hasp. Keep the key in your personal possession at all times.',
  },
  {
    name: 'Prove the circuit is dead at the point of work',
    text: 'At the point where you will be working (not at the consumer unit), use your proved voltage indicator to test between all conductor combinations. For single-phase: Line to Neutral (L-N), Line to Earth (L-E), and Neutral to Earth (N-E). All three tests must show zero volts. If any test shows voltage, the circuit is not properly isolated — stop immediately, investigate, and do not proceed until all conductors are confirmed dead. For three-phase circuits, test between all phase combinations (L1-L2, L1-L3, L2-L3) plus each phase to neutral and each phase to earth.',
  },
  {
    name: 'Prove the voltage indicator still works (second prove)',
    text: 'Immediately after confirming the circuit is dead, return to the known live source and test your voltage indicator again. It must give the same clear, positive indication of voltage as it did in Step 4. This final step confirms that your instrument did not fail between the first prove and the test — if it had failed silently, the dead reading you got in Step 6 would be meaningless. If the indicator fails the second prove, treat the circuit as live and repeat the entire procedure with a different instrument.',
  },
  {
    name: 'Consider alternative supplies and assess remaining risks',
    text: 'Before beginning work, consider whether any alternative supply sources could re-energise the circuit: solar PV inverters, battery storage, UPS systems, standby generators, or back-feed from interconnected circuits. Isolate any such sources independently. Where equipment or an enclosure contains live parts fed from more than one supply, BS 7671 Reg 537.1.2 requires a durable warning notice positioned so that anyone gaining access is warned to isolate from every supply (unless interlocking does it for them) — but never assume the notice is there. On installations with solar PV, DC conductors between the panels and the inverter remain live even after AC isolation; Reg 712.514.102 requires a permanent warning notice at every DC access point. Check too for a discharge-time label under Reg 462.4 where stored energy may be present. Satisfy yourself that all energisation risks have been addressed before touching any conductors.',
  },
  {
    name: 'Carry out the work and maintain isolation throughout',
    text: 'Carry out the intended work with your lock-off and tag in place throughout. Do not remove the lock until all work is complete, tools are clear, and all personnel are away from the circuit. On multi-person jobs, no one removes their padlock until they personally confirm they are clear. Never hand your padlock key to another person or allow the lock to be removed on your behalf.',
  },
  {
    name: 'Reinstate supply and record the isolation',
    text: 'Once work is complete, restore all covers and enclosures. Remove warning labels and lock-off devices. Restore supply in a controlled manner, confirming with the client or occupant before energising. Record the isolation in your method statement or site log: circuit reference, time isolated, time reinstated, and the name of the person who performed the isolation. A written record protects you and provides evidence that the correct procedure was followed.',
  },
];

const sections = [
  {
    id: 'what-is-safe-isolation',
    heading: 'What Is Safe Isolation?',
    content: (
      <>
        <p>
          Safe isolation is the process of disconnecting an electrical circuit from its supply and
          confirming that it is dead before any work begins. It is the single most important safety
          procedure for any electrician, and it is the procedure that prevents electrical
          fatalities. Every year in the UK, electricians and other workers are killed or seriously
          injured by contact with electricity that they believed was dead but was not.
        </p>
        <p>
          The procedure involves three core elements: isolation (physically disconnecting the
          circuit from all sources of supply), proving dead (using a tested voltage indicator to
          confirm that no voltage is present on any conductor), and securing (locking off the means
          of isolation to prevent anyone from re-energising the circuit while work is in progress).
          These three elements together form the safe isolation procedure.
        </p>
        <p>
          Safe isolation is required before any work on or near electrical conductors — not just
          major rewiring jobs but any task that involves touching or working near conductors,
          including changing a socket outlet, replacing a light fitting, adding a circuit, or
          carrying out{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">dead testing</SEOInternalLink> as
          part of an EICR. The only exception is live working, which is permitted under the
          Electricity at Work Regulations 1989 only when it is unreasonable for the work to be done
          dead and suitable precautions are taken — a rare situation that most domestic and
          commercial electricians should never encounter.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Prove–Test–Prove at a Glance
          </h3>
          <div className="grid gap-3 sm:grid-cols-5">
            {[
              {
                n: '1',
                t: 'Prove',
                d: 'Confirm your voltage indicator reads live on a proving unit or known source.',
                tint: 'bg-green-500/10 border-green-500/20',
              },
              {
                n: '2',
                t: 'Isolate',
                d: 'Switch off, then lock off the means of isolation with your personal padlock.',
                tint: 'bg-gradient-to-b from-white/[0.08] to-white/[0.04] border-white/[0.14]',
              },
              {
                n: '3',
                t: 'Test',
                d: 'Test the dead circuit at the point of work — every conductor combination.',
                tint: 'bg-blue-900/30 border-blue-700/40',
              },
              {
                n: '4',
                t: 'Prove',
                d: 'Re-test the indicator on the known source to confirm it did not fail mid-test.',
                tint: 'bg-green-500/10 border-green-500/20',
              },
              {
                n: '5',
                t: 'Work',
                d: 'Keep the lock and caution notice on throughout — remove only when clear.',
                tint: 'bg-white/[0.04] border-white/10',
              },
            ].map((s) => (
              <div key={s.n} className={`rounded-xl border ${s.tint} p-4`}>
                <div className="text-yellow-400 font-bold text-2xl leading-none mb-1">{s.n}</div>
                <div className="font-bold text-white text-sm mb-1">{s.t}</div>
                <p className="text-white text-xs leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="text-white text-xs mt-4">
            Every pair must read <strong className="text-white">0 V</strong> — three pairs on single
            phase (L–N, L–E, N–E), ten on three phase. Full detail in the{' '}
            <SEOInternalLink href="/how-to-do-safe-isolation">
              GS 38 proving-dead guide
            </SEOInternalLink>{' '}
            and the 10-step procedure below.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for Safe Isolation',
    content: (
      <>
        <p>
          Safe isolation is not optional — it is a legal requirement backed by criminal law. The
          primary legislation governing safe isolation is the Electricity at Work Regulations 1989,
          which apply to all workplaces and all work activities involving electricity.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Regulation 12 — Means of Cutting Off Supply and Isolation
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Requires that where necessary to prevent danger, suitable means shall be available for
              cutting off the supply of electrical energy to any equipment, and for the isolation of
              any equipment. This means every circuit must have a means of isolation — a switch,
              circuit breaker, or removable fuse — that can be used to disconnect it from the
              supply. The means of isolation must be clearly identified and readily accessible.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Regulation 13 — Precautions for Work on Equipment Made Dead
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Requires that adequate precautions shall be taken to prevent electrical equipment that
              has been made dead from becoming live while any work is being carried out on or near
              it. This is the regulation that mandates locking off, applying warning labels, and
              proving dead. "Adequate precautions" means using a lock-off device and personal
              padlock — not just switching off and hoping no one turns it back on.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Regulation 14 — Work on or Near Live Conductors
            </h3>
            <p className="text-white text-sm leading-relaxed">
              States that no person shall work on or so near to a live conductor that danger may
              arise unless all three of its conditions are met: it is unreasonable in all the
              circumstances for the conductor to be dead; it is reasonable in all the circumstances
              for that person to be at work on or near it while it is live; and suitable precautions
              (including, where necessary, suitable protective equipment) are taken to prevent
              injury. Competence is a separate duty under Regulation 16. This is the regulation that
              makes dead working the default — live working is permitted only as an exception, not a
              routine practice.
            </p>
          </div>
        </div>
        <p className="mt-6">
          Breach of the Electricity at Work Regulations is a criminal offence. If an accident occurs
          and the HSE investigation reveals that safe isolation was not properly carried out, the
          electrician and/or their employer can face criminal prosecution, unlimited fines, and
          imprisonment. In fatal cases, charges of manslaughter by gross negligence may be brought.
        </p>
        <SEOAppBridge
          title="10 Step Safe Isolation Procedure | Elec-Mate"
          description="Elec-Mate's AI Health and Safety agent creates risk assessments and method statements (RAMS) that include safe isolation procedures tailored to your…"
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'gs38-requirements',
    heading: 'GS 38 Test Equipment Requirements',
    content: (
      <>
        <p>
          HSE Guidance Note GS 38 ("Electrical test equipment for use by electricians") is the key
          reference document for the test equipment used during safe isolation. Although it is
          guidance rather than regulation, compliance with GS 38 is the accepted industry standard
          and is expected by all competent person scheme providers, training bodies, and the HSE
          itself.
        </p>
        <p>
          GS 38 covers the equipment, not the procedure. The duty to isolate and work dead comes from
          the Electricity at Work Regulations 1989 (HSE guidance HSR25); GS 38 tells you what the
          instrument in your hand has to be. Its requirements exist because poorly designed or
          damaged test equipment has been a contributing factor in serious and fatal accidents.
        </p>
        <div className="-mx-5 my-6 border-y border-white/10 bg-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
          <h3 className="font-bold text-white text-lg mb-3">GS 38 at a Glance</h3>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-white/[0.06] text-left">
                  <th className="px-4 py-2.5 font-bold text-white">Item</th>
                  <th className="px-4 py-2.5 font-bold text-white">What GS 38 asks for</th>
                  <th className="px-4 py-2.5 font-bold text-white">Why</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {[
                  [
                    'Probe tips',
                    'No more than 4 mm of exposed metal; 2 mm or less, or spring-loaded screened probes, strongly recommended',
                    'Stops the probe bridging between live conductors or slipping onto adjacent live parts',
                  ],
                  [
                    'Finger barriers',
                    'Substantial barriers on the probe body, not a decorative moulding',
                    "Stops the user's fingers sliding forward onto live parts",
                  ],
                  [
                    'Fused leads',
                    'HBC fuse of low current rating (usually not exceeding 500 mA), as close to the probe as practicable',
                    'Limits the energy let through if the probes short a circuit. Carry spares — a blown fuse reads as dead',
                  ],
                  [
                    'Lead insulation',
                    'Fully insulated over the whole length, no exposed metal except the tip, no cracks or cuts',
                    'A damaged lead is both a shock risk and a source of false readings',
                  ],
                  [
                    'Marking and category',
                    'Clearly marked voltage rating and measurement category — CAT IV at the origin, CAT III at distribution level',
                    'Matches the instrument to the transient energy present at the point of use',
                  ],
                  [
                    'Indicator standard',
                    'Two-pole voltage indicator to a recognised standard such as BS EN 61243-3',
                    'Purpose-built for proving dead, with far fewer silent failure modes than a multimeter',
                  ],
                ].map(([item, req, why], i) => (
                  <tr
                    key={item}
                    className={`border-t border-white/10 ${i % 2 === 1 ? 'bg-white/[0.02]' : ''}`}
                  >
                    <td className="px-4 py-3 font-semibold text-white align-top whitespace-nowrap">
                      {item}
                    </td>
                    <td className="px-4 py-3 text-white align-top leading-relaxed">{req}</td>
                    <td className="px-4 py-3 text-white align-top leading-relaxed">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p>
          Before every use, visually inspect your test equipment for damage. Check that probe tips
          are intact, leads are not cracked or frayed, fuses are present, and the instrument is
          within its calibration date. Never use test equipment that shows any sign of damage. The
          cost of replacing a set of test leads is trivial compared to the cost of a serious
          electrical accident.
        </p>
      </>
    ),
  },
  {
    id: 'voltage-indicators',
    heading: 'Voltage Indicators vs Multimeters',
    content: (
      <>
        <p>
          GS 38 strongly recommends the use of a dedicated two-pole voltage indicator for safe
          isolation rather than a general-purpose multimeter. Understanding why is critical for
          every electrician.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Two-Pole Voltage Indicators</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>No batteries required — powered by the circuit being tested</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>No range selector to set incorrectly</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Simple live/dead indication — no interpretation needed</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Low impedance — not affected by ghost voltages or induced EMFs</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Purpose-built for safety-critical proving</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <h3 className="font-bold text-white text-lg mb-3">Multimeter Risks</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Flat battery gives a false dead reading</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Wrong range setting (amps instead of volts) gives false dead</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Blown internal fuse gives false dead reading</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>High impedance picks up ghost voltages (false live)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Multiple failure modes that a user may not detect</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-6">
          The key advantage of a two-pole voltage indicator is reliability through simplicity. It
          has fewer things that can go wrong, and when it does fail, the failure is typically
          obvious (no indication at all rather than a misleading reading). For the purpose of
          proving a circuit dead — which is a life-safety decision — simplicity and reliability
          outweigh the versatility of a multimeter.
        </p>
      </>
    ),
  },
  {
    id: 'lock-off-loto',
    heading: 'Lock-Off and LOTO Procedures',
    content: (
      <>
        <p>
          Lock-Off / Tag-Out (LOTO) is the physical control measure that prevents a circuit from
          being re-energised while work is in progress. It is not a supplement to safe isolation —
          it is an integral part of it. Isolation without lock-off is incomplete isolation.
        </p>
        <p>
          BS 7671 backs this directly. Regulation 462.3 requires devices for isolation to be designed
          and/or installed so as to prevent unintentional or inadvertent closure, and gives three
          examples of how: located within a lockable space or lockable enclosure, padlocking, or
          located adjacent to the associated equipment. Regulation 537.2.4 repeats the requirement
          for the device itself. Padlocking is the one you can apply on any board, on any job.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-1">Personal padlock</h3>
            <p className="text-white text-sm leading-relaxed">
              Every electrician must have their own personal padlock with a unique key. This padlock
              is used exclusively for locking off isolation points. It must not be a combination lock
              (someone could guess the code), a master-keyed lock (management could override it), or
              a shared lock. The principle is that only you hold the key, so only you can remove the
              lock and re-energise the circuit. Your padlock should be distinctively coloured or
              labelled with your name.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-1">Lock-off devices</h3>
            <p className="text-white text-sm leading-relaxed">
              Lock-off devices are mechanical devices that fit over circuit breakers, isolator
              handles, or fuse carriers to prevent them from being operated. Different devices are
              available for different types of switchgear: MCB lock-off devices clamp over the MCB
              toggle, isolator lock-off devices fit over the handle or keyhole, and fuse carrier
              lock-off devices prevent the carrier from being reinserted. Universal lock-off kits are
              available that include devices for the most common switchgear types. Always carry your
              lock-off kit on site.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-1">Multi-lock hasps</h3>
            <p className="text-white text-sm leading-relaxed">
              When multiple people are working on the same isolated circuit, a multi-lock hasp allows
              each person to apply their own padlock to the same isolation point. The isolation
              cannot be removed until every person has removed their padlock — which means every
              person must confirm they are clear of the circuit before it can be re-energised. This
              is essential on multi-person jobs and is a standard requirement on commercial and
              industrial sites.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-1">Caution notices</h3>
            <p className="text-white text-sm leading-relaxed">
              A caution notice must be attached to the isolated switchgear, clearly visible to anyone
              approaching the distribution board. Typical wording is &ldquo;DANGER — DO NOT SWITCH ON
              — WORK IN PROGRESS&rdquo;. The notice should carry the name of the person who applied
              the lock-off, the date, and a contact number. Notices alone are not sufficient — they
              must be used in conjunction with physical lock-off. A label without a lock can be
              ignored; a lock without a label does not communicate the reason for the lock-off.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <h3 className="font-bold text-white mb-1">
              Stored energy — Reg 462.4 and the discharge-time label
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Locking off does not empty a capacitor. Where residual electrical energy is potentially
              present, Regulation 462.4 requires suitable means to be provided for its discharge and,
              where relevant, a warning label indicating the discharge time required before the
              enclosure can be safely opened. Inverters, variable-speed drives, power factor
              correction gear and UPS units all fall into this bracket. Find the label, wait the
              stated time, then prove dead — in that order.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'neutral-isolation',
    heading: 'Does the Neutral Have to Be Isolated?',
    content: (
      <>
        <p>
          This is the most commonly misquoted point in safe isolation, and it is worth getting right,
          because the answer depends on the earthing system. Regulation 462.2 says that every circuit
          shall be provided with isolation means for all live conductors —{' '}
          <strong className="text-white">
            &ldquo;except as detailed in Regulation 461.2&rdquo;
          </strong>
          . It is that exception that does the work.
        </p>
        <p>
          Regulation 461.2 permits the neutral to be left unswitched in TN-S and TN-C-S systems where
          protective equipotential bonding is installed and either the neutral is reliably connected
          to Earth by a low resistance sufficient to meet the Chapter 41 disconnection times, or the
          distributor declares that the PEN or neutral conductor of the supply is. In a TN-C or
          TN-C-S system the PEN conductor shall not be isolated or switched at all. The requirement
          to break every live conductor bites in TT and IT systems — Table 537.4 note (d) states it
          in terms, cross-referring back to Regulation 462.2.
        </p>
        <div className="-mx-5 my-6 border-y border-white/10 bg-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
          <h3 className="font-bold text-white text-lg mb-3">Isolation of the Neutral by System</h3>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-white/[0.06] text-left">
                  <th className="px-4 py-2.5 font-bold text-white">Earthing system</th>
                  <th className="px-4 py-2.5 font-bold text-white">Neutral isolation</th>
                  <th className="px-4 py-2.5 font-bold text-white">Reference</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3 font-semibold text-white align-top">TN-S, TN-C-S</td>
                  <td className="px-4 py-3 align-top leading-relaxed text-white">
                    Not required, provided protective equipotential bonding is installed and the
                    neutral is reliably earthed to meet Chapter 41 disconnection times (or the
                    distributor declares that it is)
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap text-white">461.2</td>
                </tr>
                <tr className="border-t border-white/10 bg-white/[0.02]">
                  <td className="px-4 py-3 font-semibold text-white align-top">TT, IT</td>
                  <td className="px-4 py-3 align-top leading-relaxed text-white">
                    Required — isolation must disconnect all live conductors, neutral included
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap text-white">
                    462.2, Table 537.4 note (d)
                  </td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="px-4 py-3 font-semibold text-white align-top">
                    PEN conductor (TN-C, TN-C-S)
                  </td>
                  <td className="px-4 py-3 align-top leading-relaxed text-white">
                    Shall <strong className="text-white">not</strong> be isolated or switched
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap text-white">461.2</td>
                </tr>
                <tr className="border-t border-white/10 bg-white/[0.02]">
                  <td className="px-4 py-3 font-semibold text-white align-top">
                    Household main switch
                  </td>
                  <td className="px-4 py-3 align-top leading-relaxed text-white">
                    A main switch intended for operation by ordinary persons shall interrupt both
                    live conductors of a single-phase supply
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap text-white">462.1.201</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white text-xs mt-4 leading-relaxed">
            Any device inserted in an earthed neutral must be linked and arranged to break all the
            related line conductors (Reg 132.14.2); a single-pole fuse, switch or circuit-breaker
            goes in the line conductor only (Reg 132.14.1).
          </p>
        </div>
        <p>
          None of this changes what you do on site. Whatever the system, you still test between every
          conductor pair at the point of work and expect 0 V on all of them — including neutral to
          earth. A neutral that is not switched can still be at a dangerous potential if it is
          borrowed, cross-connected, or open-circuit upstream, which is exactly why the N–E test is
          part of the procedure and not an optional extra.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Safe Isolation Mistakes',
    content: (
      <>
        <p>
          Safe isolation accidents are almost always caused by shortcuts, complacency, or failure to
          follow the full procedure. These are the mistakes that kill electricians.
        </p>
        <div className="space-y-4 mt-6">
          {[
            {
              t: 'Skipping the second prove',
              d: 'The most dangerous shortcut. If you skip the final prove step and your voltage indicator had failed during the test, you have no way of knowing whether the dead reading was genuine or the result of a faulty instrument. HSE accident investigations have identified this as a contributing factor in multiple fatalities.',
            },
            {
              t: 'Relying on circuit labels',
              d: 'Circuit labels can be wrong. Previous electricians may have modified circuits without updating the chart. Labels fade and become illegible. In older installations, there may be no labels at all. Always verify the circuit identity independently by switching the load and observing the result at the point of work.',
            },
            {
              t: 'Not locking off',
              d: '“I’ll only be a minute” and “No one else is here” are the two most dangerous phrases in electrical work. It takes seconds for someone to walk past and flip a switch back on. Building managers, caretakers, tenants, and other trades all have access to distribution boards. Lock off every time, no exceptions.',
            },
            {
              t: 'Testing only L–N',
              d: 'Testing only between line and neutral is insufficient. A borrowed neutral, a cross-connection to another circuit, or a fault in the earthing system could leave a conductor at a dangerous potential that an L–N test alone would not detect. Test all three pairs: L–N, L–E and N–E. This matters most where the neutral has not been switched — which Reg 461.2 permits in TN-S and TN-C-S.',
            },
            {
              t: 'Proving dead at the board, not at the point of work',
              d: 'A dead reading at the consumer unit tells you about the consumer unit. Borrowed neutrals, shared circuits, back-feed and mis-identified circuits all show up downstream. Test at the point where your hands will be.',
            },
            {
              t: 'Not considering alternative supplies',
              d: 'Solar PV inverters, battery storage systems, UPS units, standby generators and other sources can energise circuits from the load side even when the main supply is isolated. Reg 537.1.2 requires a durable warning notice where an enclosure contains live parts fed from more than one supply — but never assume it is present. Identify and isolate every source before confirming dead.',
            },
          ].map((m) => (
            <div
              key={m.t}
              className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5"
            >
              <h3 className="font-bold text-white mb-1">{m.t}</h3>
              <p className="text-white text-sm leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: 'Three-Phase Safe Isolation',
    content: (
      <>
        <p>
          Three-phase safe isolation follows the same prove-test-prove principle as single-phase but
          requires additional tests due to the greater number of conductors. On a three-phase
          system, there are three line conductors (L1, L2, L3), a neutral, and an earth — five
          conductors that must all be confirmed dead.
        </p>
        <div className="-mx-5 my-6 border-y border-white/10 bg-white/[0.04] p-5 sm:mx-0 sm:rounded-2xl sm:border-x">
          <h3 className="font-bold text-white text-lg mb-1">
            Every Pair to Prove — Single Phase vs Three Phase
          </h3>
          <p className="text-white text-sm mb-4 leading-relaxed">
            Three pairs on a single-phase circuit, ten on a three-phase circuit. Every one must read
            0 V at the point of work.
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="bg-white/[0.06] text-left">
                  <th className="px-4 py-2.5 font-bold text-white">Group</th>
                  <th className="px-4 py-2.5 font-bold text-white">Pairs to test</th>
                  <th className="px-4 py-2.5 font-bold text-white">Count</th>
                  <th className="px-4 py-2.5 font-bold text-white">Expected</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {[
                  ['Single phase', 'L–N, L–E, N–E', '3'],
                  ['Three phase — line to line', 'L1–L2, L1–L3, L2–L3', '3'],
                  ['Three phase — line to neutral', 'L1–N, L2–N, L3–N', '3'],
                  ['Three phase — to earth', 'L1–E, L2–E, L3–E, N–E', '4'],
                ].map(([group, pairs, count], i) => (
                  <tr
                    key={group}
                    className={`border-t border-white/10 ${i % 2 === 1 ? 'bg-white/[0.02]' : ''}`}
                  >
                    <td className="px-4 py-3 font-semibold text-white align-top">{group}</td>
                    <td className="px-4 py-3 text-white align-top whitespace-nowrap">{pairs}</td>
                    <td className="px-4 py-3 text-white align-top">{count}</td>
                    <td className="px-4 py-3 font-medium text-green-400 align-top">0 V</td>
                  </tr>
                ))}
                <tr className="border-t border-white/[0.2] bg-white/[0.06]">
                  <td className="px-4 py-3 font-bold text-white" colSpan={2}>
                    Three-phase total
                  </td>
                  <td className="px-4 py-3 font-bold text-yellow-400">10</td>
                  <td className="px-4 py-3 font-medium text-green-400">0 V</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white text-xs mt-4 leading-relaxed">
            Any reading other than zero on any pair means the circuit is not isolated — stop,
            investigate, and do not proceed until every conductor is confirmed dead.
          </p>
        </div>
        <p>
          The type of isolator matters as much as the tests. Regulation 462.1.201 requires a main
          linked switch or linked circuit-breaker as near as practicable to the origin of every
          installation, as the means of switching the supply on load and as the means of isolation —
          &ldquo;linked&rdquo; being the operative word. Some older installations use separate
          single-pole devices on each phase; those must all be opened and locked off individually.
          Regulation 462.4 also applies at this scale: where residual energy may be present, look for
          the discharge-time label before opening an enclosure. On commercial and industrial sites,
          permit-to-work systems are often used alongside safe isolation as an additional layer of
          administrative control.
        </p>
        <SEOAppBridge
          title="Elec-Mate's testing tools validate every result"
          description="Enter your test results on site and the app validates them against BS 7671 maximum permitted values automatically."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'solar-pv-isolation',
    heading: 'Solar PV, Battery Storage, and EV Isolation',
    content: (
      <>
        <p>
          Installations with solar PV panels, battery storage, or EV charge points introduce
          additional isolation hazards that are not present in conventional circuits. The
          prove-test-prove procedure still applies, but these systems require extra steps before
          work can be considered safe — see the dedicated{' '}
          <SEOInternalLink href="/guides/solar-panel-installation">solar PV guide</SEOInternalLink>{' '}
          for full DC-side isolation detail.
        </p>
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <h3 className="font-bold text-white mb-1">
              Solar PV panels cannot be switched off
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Isolating the AC supply at the inverter disconnects the inverter output, but the DC
              cabling between the array and the inverter input remains live at panel voltage
              whenever there is daylight. The DC conductors between the array, combiner boxes and
              inverter DC terminals stay energised even after the AC isolator is open and locked
              off. Working on these conductors without understanding and managing the DC risk has
              caused serious electrical burns and fatalities.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <h3 className="font-bold text-white mb-1">
              Reg 712.514.102 — permanent DC warning notice
            </h3>
            <p className="text-white text-sm leading-relaxed">
              BS 7671:2018+A4:2026 Regulation 712.514.102 requires that each point of access to live
              parts on the DC side — such as distribution boards and combiner boxes — has a permanent
              warning notice indicating that live parts may still be energised after isolation. The
              regulation gives example wording: &ldquo;SOLAR DC — Live parts can remain energised
              after isolation&rdquo;. Because the requirement is for a permanent notice, a paper or
              handwritten label does not meet it. Record a missing or non-permanent notice as an
              observation on the EICR and apply your own judgement to the classification code —
              BS 7671 does not assign codes.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5">
            <h3 className="font-bold text-white mb-1">
              Reg 712.514.103 — the notice on the inverter itself
            </h3>
            <p className="text-white text-sm leading-relaxed">
              A separate warning notice is required on all inverters, with words similar to
              &ldquo;WARNING Isolate both AC and DC sides before servicing&rdquo;. That is the
              procedure in one line: two isolations, two lock-offs, then prove dead. Reg 537.1.2
              applies here too — where an enclosure contains live parts fed from more than one
              supply, a durable warning notice must be positioned so that anyone gaining access is
              warned to isolate from every supply, unless interlocking does it for them.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white mb-1">Battery storage and EV charge points</h3>
            <p className="text-white text-sm leading-relaxed">
              Battery storage systems can supply energy to circuits from the load side even when the
              DNO supply is isolated. Isolate the battery system at its dedicated isolator before
              working on any circuit the battery could energise, and prove dead at the point of work
              after isolating both the DNO supply and the battery output. EV charge points with
              on-board energy management may have control circuitry that remains energised after the
              supply MCB is switched off — identify the dedicated EVSE isolator and lock that off in
              addition to the circuit breaker. On both, check for a Reg 462.4 discharge-time label
              before opening any enclosure.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'semiconductor-isolators',
    heading: 'Semiconductor Devices Cannot Be Used as Isolators',
    content: (
      <>
        <p>
          As smart-home retrofits, energy management systems, and automated lighting become more
          common, electricians are increasingly encountering circuits where the only apparent
          switching device is a semiconductor-based module rather than a mechanical switch. These
          devices cannot legally serve as the means of isolation.
        </p>
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-6">
          <h3 className="font-bold text-white mb-1">
            Reg 537.2.2 — semiconductor devices shall not be used as isolating devices
          </h3>
          <p className="text-white text-sm leading-relaxed">
            The wording of Regulation 537.2.2 is one line long and admits no exception:
            &ldquo;Semiconductor devices shall not be used as isolating devices.&rdquo; Regulation
            537.3.1.3 explains why. Its note records that functional switching devices may control
            the current without necessarily opening the corresponding poles, and names semiconductor
            switching devices as an example of exactly that — a device capable of interrupting the
            current in the circuit but not opening the poles. Off, in other words, is not the same as
            disconnected.
          </p>
          <p className="text-white text-sm leading-relaxed mt-3">
            Regulation 537.2.1 sets the positive test: a device for isolation shall be of a type for
            which the isolation function is explicitly recognised by the relevant product standard,
            or is identified as suitable for isolation in Table 537.4. Reg 537.2.3 adds that devices
            for isolation shall be designed for overvoltage category III or IV, except the plug of a
            plug and socket-outlet combination identified in Table 537.4 as suitable for isolation.
          </p>
        </div>
        <p>
          Practical examples of Reg 537.2.2 breaches that are becoming common EICR observations:
        </p>
        <ul className="space-y-2 mt-4 text-white text-sm leading-relaxed list-disc list-inside">
          <li>
            <strong>Smart dimmer modules:</strong> Trailing-edge and leading-edge dimmers fitted
            behind standard faceplates — the mechanical rocker operates the dimmer's control input,
            not a mechanical isolation contact. Switching the dimmer off does not isolate the
            circuit.
          </li>
          <li>
            <strong>Relay-switch modules:</strong> Wireless relay modules installed in back-boxes or
            ceiling roses to control lighting. The relay coil may de-energise on command, but the
            semiconductor switching element remains connected across the load terminals.
          </li>
          <li>
            <strong>EVSE controller relays:</strong> Some EV charge point designs use solid state
            switching inside the charge point enclosure. The dedicated EVSE isolator upstream of the
            charge point is the correct means of isolation — not the charge point's own internal
            switching.
          </li>
        </ul>
        <p className="mt-4">
          When carrying out an EICR or working on any circuit where the only switching device is
          semiconductor-based, identify and use a compliant isolating device upstream — one
          recognised for isolation by its product standard or listed as suitable in Table 537.4.
          Where no such isolation point exists, the installation does not satisfy Reg 462.2 read with
          Reg 537.2.2, and that belongs on the schedule of observations.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order for dead and live testing per GN3 and BS 7671.',
    icon: ListOrdered,
    category: 'Guide',
  },
  {
    href: '/how-to-do-safe-isolation',
    title: 'GS 38 Proving Dead Guide',
    description: 'Detailed guide to the prove-test-prove procedure and voltage indicator use.',
    icon: ShieldAlert,
    category: 'Guide',
  },
  {
    href: '/guides/lock-off-loto-procedure',
    title: 'Lock-Off and LOTO Guide',
    description: 'Comprehensive guide to lockout/tagout procedures for electrical work.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/permit-to-work-electrician',
    title: 'Permit to Work Systems',
    description: 'How permit-to-work systems integrate with safe isolation on commercial sites.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/risk-assessment-electricians',
    title: 'Risk Assessment for Electricians',
    description:
      'Creating effective risk assessments for electrical work including safe isolation.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/guides/ppe-for-electricians',
    title: 'PPE for Electricians',
    description: 'Personal protective equipment requirements for electrical work on site.',
    icon: HardHat,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SafeIsolationProcedurePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2024-10-01"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Hub"
      badgeIcon={ShieldAlert}
      heroTitle={
        <>
          Safe Isolation Procedure:{' '}
          <span className="text-yellow-400">Prove, Test, Prove — Step by Step</span>
        </>
      }
      heroSubtitle="The complete guide to safe electrical isolation: the prove-test-prove method, lock-off and LOTO, GS 38 voltage indicator requirements, which systems need the neutral isolated, legal duties under the Electricity at Work Regulations 1989, and the mistakes that kill electricians."
      readingTime={17}
      answerBox={{
        question: 'What is the safe isolation procedure?',
        answer:
          'Safe isolation is the prove–test–prove method for confirming a circuit is dead before work: (1) identify the correct circuit; (2) prove your voltage indicator works on a proving unit or known live source; (3) switch off, then lock off with your personal padlock and apply a caution notice so the circuit cannot be re-energised; (4) test the circuit dead at the point of work between every conductor pair — L-N, L-E and N-E on single phase, all ten pairs on three phase; (5) prove the indicator again on the known source to confirm it did not fail mid-test. The voltage indicator must comply with HSE Guidance Note GS 38, and working dead rather than live is a legal duty under the Electricity at Work Regulations 1989.',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="Safe Isolation Procedure: 10-Step Guide"
      howToDescription="The complete 10-step safe isolation procedure following HSE Guidance Note GS 38, covering client notification, prove-test-prove, lock-off and LOTO, alternative supplies, and reinstatement."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Safe isolation tools built for site"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for safe isolation checklists, AI RAMS generation, testing tools, and 19 certificate types. 7-day free trial, cancel anytime."
    />
  );
}
