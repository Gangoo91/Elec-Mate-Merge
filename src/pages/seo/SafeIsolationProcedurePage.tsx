import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  ShieldAlert,
  Zap,
  Lock,
  AlertTriangle,
  ShieldCheck,
  ClipboardCheck,
  BookOpen,
  Brain,
  ListOrdered,
  Calculator,
  FileCheck2,
  Scale,
  HardHat,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Safe Isolation Procedure | Step by Step Guide GS 38';
const PAGE_DESCRIPTION =
  'Complete safe isolation procedure following HSE Guidance Note GS 38. Step-by-step prove-test-prove method, lock-off LOTO procedures, voltage indicator requirements, legal requirements under Electricity at Work Regulations 1989. For UK electricians.';

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
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'three-phase', label: 'Three-Phase Isolation' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Safe isolation is a legal requirement under the Electricity at Work Regulations 1989 (Regulation 12) and must be carried out before any work on or near live conductors.',
  'The prove-test-prove method is the standard: prove your voltage indicator works, test the circuit is dead, prove the indicator still works.',
  'HSE Guidance Note GS 38 specifies the requirements for test equipment — fused leads, finger guards, maximum 4 mm exposed probe tips, and a proving unit.',
  'Lock-off with a personal padlock is not optional — it prevents inadvertent re-energisation and is the physical guarantee of your safety.',
  'Elec-Mate includes guided safe isolation checklists, AI Health and Safety agents that generate RAMS with safe isolation procedures, and testing tools that validate results against BS 7671.',
];

const faqs = [
  {
    question: 'What is GS 38 and why does it matter for safe isolation?',
    answer:
      'GS 38 is a Guidance Note published by the Health and Safety Executive (HSE) titled "Electrical test equipment for use by electricians." It sets out the requirements for test equipment and test leads used for proving circuits dead before working on them. While GS 38 is guidance rather than regulation, following it is considered best practice and is expected by all competent person scheme providers. The key GS 38 requirements are: test probes must have finger guards to prevent accidental contact with live parts, test leads must be fused (with a fuse no greater than 500 mA), probe tips must be spring-loaded and no more than 4 mm of exposed metal, and the voltage indicator must be clearly marked with its voltage rating and conform to a recognised standard such as BS EN 61243-3. Using non-GS 38 compliant equipment is dangerous and could result in electric shock, arc flash, or a false dead reading that leads an electrician to work on a live circuit.',
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
      'Yes. Regulation 12 of the Electricity at Work Regulations 1989 requires that adequate precautions are taken to prevent equipment being inadvertently re-energised while work is being carried out. BS 7671:2018+A3:2024 Regulation 462 reinforces this requirement. In practice, this means physically locking off the means of isolation using a padlock and lock-off device on the circuit breaker or fuse carrier, and attaching a warning label ("Danger — Do Not Switch On — Men at Work"). The padlock must be a personal padlock with a unique key that only you hold. On multi-person jobs, each person working on the circuit must apply their own padlock using a multi-lock hasp. Simply switching off a circuit breaker without locking it is not sufficient — another person could switch it back on. This has been a factor in serious and fatal accidents where a colleague, building manager, or occupant switched a circuit back on while someone was working on it.',
  },
  {
    question: 'What are the legal requirements for safe isolation?',
    answer:
      'Safe isolation is a legal requirement under multiple pieces of legislation. The Electricity at Work Regulations 1989 — specifically Regulation 12 (means of cutting off supply and isolation) and Regulation 13 (precautions for work on equipment made dead) — require that circuits are isolated and proved dead before work begins, and that precautions are taken to prevent re-energisation. The Health and Safety at Work etc. Act 1974 imposes a general duty on employers and employees to ensure the safety of themselves and others. The Management of Health and Safety at Work Regulations 1999 require risk assessments that must include consideration of electrical hazards. BS 7671:2018+A3:2024 Regulation 462 specifies the requirements for isolation and switching. HSE Guidance Note GS 38 provides specific guidance on the test equipment to use. Failure to carry out safe isolation can result in criminal prosecution, particularly if someone is injured or killed. In fatal electrical accident investigations, one of the first things the HSE examines is whether safe isolation was carried out correctly.',
  },
  {
    question: 'What should I do if my voltage indicator shows dead but I am not confident?',
    answer:
      'If you have any doubt whatsoever, treat the circuit as live and do not work on it until you have resolved your uncertainty. Repeat the full prove-test-prove procedure from the beginning. Check that your voltage indicator is functioning correctly on a known live source. Verify that you have isolated the correct circuit — circuit labelling can be wrong, especially in older installations or installations that have been modified without updating the circuit chart. Test at the point of work, not just at the consumer unit — a fault could re-energise conductors downstream of the isolation point. If necessary, use a second independent voltage indicator to cross-check the reading. Consider whether there could be alternative supplies — solar PV inverters, UPS systems, standby generators, or other sources of back-feed. In commercial and industrial settings, check whether there are multiple supply sources or ring main units that could energise the circuit from a different direction. Never rely solely on a single test or a single instrument. The consequences of working on a live circuit that you believed was dead are potentially fatal.',
  },
  {
    question: 'How does safe isolation differ for three-phase supplies?',
    answer:
      'Three-phase safe isolation follows the same prove-test-prove principle but requires additional tests because there are more conductors. After isolating the circuit and locking off, you must test between all conductor combinations: L1 to L2, L1 to L3, L2 to L3 (phase-to-phase), L1 to Neutral, L2 to Neutral, L3 to Neutral (phase-to-neutral), and L1 to Earth, L2 to Earth, L3 to Earth, Neutral to Earth (all conductors to earth). This gives a total of 10 tests rather than the 3 tests needed for single-phase. The reason for testing between all phases is that isolation devices can fail partially — for example, a three-phase isolator may have one pole that does not open fully, leaving one phase still energised. You must also consider the possibility of back-feed from motor loads (a motor can act as a generator for a short time after being disconnected from the supply if it is still spinning) and from capacitor banks that may retain a charge after isolation.',
  },
];

const howToSteps = [
  {
    name: 'Select a GS 38 compliant voltage indicator',
    text: 'Choose a two-pole voltage indicator that complies with HSE Guidance Note GS 38. The instrument must be rated to at least CAT III (for distribution-level testing) or CAT IV (for origin-level testing). Check that test leads have fused probes (maximum 500 mA fuse), finger guards to prevent contact with live parts, and spring-loaded tips with no more than 4 mm of exposed metal. Verify the instrument is within its calibration date. Have a proving unit (battery-powered device that outputs a known voltage) available for the prove steps.',
  },
  {
    name: 'Prove the voltage indicator works (first prove)',
    text: 'Test your voltage indicator on a known live source — either a dedicated proving unit or another circuit you know is energised. The indicator must give a clear, positive indication that voltage is present. If the indicator does not respond to the known live source, it is faulty. Do not use it. Replace the instrument, battery, or fuses and re-test. This step confirms that the instrument you are about to rely on for your safety is actually working.',
  },
  {
    name: 'Identify the correct circuit',
    text: 'Identify the correct circuit at the distribution board or consumer unit. Check the circuit chart and labelling, but never rely solely on labels — they may be incorrect or out of date. Verify the circuit identity by switching the load on and off at the consumer unit and observing the result at the point of work. For example, switch off the MCB and confirm that the light or socket at the work location goes off. This prevents you from isolating the wrong circuit — a surprisingly common error.',
  },
  {
    name: 'Isolate and lock off',
    text: 'Switch off the circuit breaker or remove the fuse carrier for the identified circuit. Apply a lock-off device and your personal padlock to the circuit breaker or fuse carrier to prevent re-energisation. Attach a warning label reading "Danger — Do Not Switch On — Men at Work" on the distribution board, clearly visible. If multiple people are working on the same circuit, each person must apply their own padlock using a multi-lock hasp. Keep the key in your personal possession at all times.',
  },
  {
    name: 'Test the circuit is dead at the point of work',
    text: 'At the point where you will be working (not at the consumer unit), use your proved voltage indicator to test between all conductor combinations. For single-phase: Line to Neutral (L-N), Line to Earth (L-E), and Neutral to Earth (N-E). All three tests must show zero volts. If any test shows voltage, the circuit is not properly isolated — stop immediately, investigate, and do not proceed until all conductors are confirmed dead. For three-phase circuits, test between all phase combinations (L1-L2, L1-L3, L2-L3) plus each phase to neutral and each phase to earth.',
  },
  {
    name: 'Prove the voltage indicator still works (second prove)',
    text: 'Immediately after confirming the circuit is dead, return to the known live source and test your voltage indicator again. It must give the same clear, positive indication of voltage as it did in Step 2. This final step confirms that your instrument did not fail between the first prove and the test — if it had failed silently, the dead reading you got in Step 5 would be meaningless. If the indicator fails the second prove, treat the circuit as live and repeat the entire procedure with a different instrument.',
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
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
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
          <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-2">
              Regulation 14 — Work on or Near Live Conductors
            </h3>
            <p className="text-white text-sm leading-relaxed">
              States that no person shall work on or so near to a live conductor that danger may
              arise, unless it is unreasonable in all the circumstances for it to be dead, suitable
              precautions (including PPE) are taken, and the person is competent to work on live
              equipment. This is the regulation that makes dead working the default — live working
              is permitted only as an exception, not a routine practice.
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
          title="AI Health and Safety agent generates RAMS with safe isolation"
          description="Elec-Mate's AI Health and Safety agent creates risk assessments and method statements (RAMS) that include safe isolation procedures tailored to your specific job. GS 38 compliant, legally defensible, ready to submit to clients."
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
          GS 38 specifies detailed requirements for the design and condition of test probes, test
          leads, and voltage indicators used by electricians. The requirements exist because poorly
          designed or damaged test equipment has been a contributing factor in serious and fatal
          accidents.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">Key GS 38 Requirements</h3>
          <ul className="space-y-3 text-white text-sm leading-relaxed">
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Probe tips:</strong> Must have no more than 4 mm of exposed metal. Must be
                spring-loaded to retract when not in use. This prevents accidental bridging between
                live conductors and limits the risk of the probe slipping and touching adjacent live
                parts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Finger guards:</strong> Test probes must have finger guards or barriers that
                prevent the user's fingers from slipping forward and touching live parts. The guard
                must be substantial enough to provide real protection, not just a decorative
                moulding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused leads:</strong> Test leads must contain a fuse — no greater than 500
                mA — as close as possible to the test probe. The fuse limits the energy available in
                the event of an accidental short circuit. Spare fuses should be carried at all times
                because a blown fuse can give a false dead reading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead insulation:</strong> Test leads must be fully insulated along their
                entire length, with no exposed metal except at the probe tip. Leads must be in good
                condition with no cracks, cuts, or exposed conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage rating:</strong> The instrument must be clearly marked with its
                voltage rating and category (CAT III or CAT IV). The category must be appropriate
                for the point of use — CAT IV at the supply origin, CAT III at distribution level.
              </span>
            </li>
          </ul>
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
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
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
        <div className="space-y-4 mt-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Personal Padlock</h3>
                <p className="text-white text-sm leading-relaxed">
                  Every electrician must have their own personal padlock with a unique key. This
                  padlock is used exclusively for locking off isolation points. It must not be a
                  combination lock (someone could guess the code), a master-keyed lock (management
                  could override it), or a shared lock. The principle is that only you hold the key,
                  so only you can remove the lock and re-energise the circuit. Your padlock should
                  be distinctively coloured or labelled with your name.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Lock-Off Devices</h3>
                <p className="text-white text-sm leading-relaxed">
                  Lock-off devices are mechanical devices that fit over circuit breakers, isolator
                  handles, or fuse carriers to prevent them from being operated. Different devices
                  are available for different types of switchgear: MCB lock-off devices clamp over
                  the MCB toggle, isolator lock-off devices fit over the handle or keyhole, and fuse
                  carrier lock-off devices prevent the carrier from being reinserted. Universal
                  lock-off kits are available that include devices for the most common switchgear
                  types. Always carry your lock-off kit on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Multi-Lock Hasps</h3>
                <p className="text-white text-sm leading-relaxed">
                  When multiple people are working on the same isolated circuit, a multi-lock hasp
                  allows each person to apply their own padlock to the same isolation point. The
                  isolation cannot be removed until every person has removed their padlock — which
                  means every person must confirm they are clear of the circuit before it can be
                  re-energised. This is essential on multi-person jobs and is a standard requirement
                  on commercial and industrial sites.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Warning Labels</h3>
                <p className="text-white text-sm leading-relaxed">
                  A warning label must be attached to the isolated switchgear, clearly visible to
                  anyone approaching the distribution board. The standard wording is "Danger — Do
                  Not Switch On — Men at Work." The label should include the name of the person who
                  applied the lock-off, the date, and a contact number. Warning labels alone are not
                  sufficient — they must be used in conjunction with physical lock-off. A label
                  without a lock can be ignored; a lock without a label does not communicate the
                  reason for the lock-off.
                </p>
              </div>
            </div>
          </div>
        </div>
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
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Skipping the second prove</h3>
                <p className="text-white text-sm leading-relaxed">
                  The most dangerous shortcut. If you skip the final prove step and your voltage
                  indicator had failed during the test, you have no way of knowing whether the dead
                  reading was genuine or the result of a faulty instrument. HSE accident
                  investigations have identified this as a contributing factor in multiple
                  fatalities.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Relying on circuit labels</h3>
                <p className="text-white text-sm leading-relaxed">
                  Circuit labels can be wrong. Previous electricians may have modified circuits
                  without updating the chart. Labels fade and become illegible. In older
                  installations, there may be no labels at all. Always verify the circuit identity
                  independently by switching the load and observing the result at the point of work.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Not locking off</h3>
                <p className="text-white text-sm leading-relaxed">
                  "I'll only be a minute" and "No one else is here" are the two most dangerous
                  phrases in electrical work. It takes seconds for someone to walk past and flip a
                  switch back on. Building managers, caretakers, tenants, and other trades all have
                  access to distribution boards. Lock off every time, no exceptions.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Testing only L-N</h3>
                <p className="text-white text-sm leading-relaxed">
                  Testing only between Line and Neutral is insufficient. A borrowed neutral, a
                  cross-connection to another circuit, or a fault in the earthing system could leave
                  a conductor at a dangerous potential that would not be detected by an L-N test
                  alone. You must test all three combinations: L-N, L-E, and N-E.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Not considering alternative supplies</h3>
                <p className="text-white text-sm leading-relaxed">
                  Solar PV inverters, battery storage systems, UPS units, standby generators, and
                  other sources can energise circuits from the load side even when the main supply
                  is isolated. Always consider whether there are alternative sources of supply and
                  isolate them all before confirming dead. This is increasingly relevant with the
                  growth of domestic solar and battery installations.
                </p>
              </div>
            </div>
          </div>
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
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
          <h3 className="font-bold text-white text-lg mb-3">
            Required Tests for Three-Phase Isolation
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 text-white text-sm leading-relaxed">
            <div>
              <h4 className="font-bold text-yellow-400 mb-2">Phase-to-Phase</h4>
              <ul className="space-y-1">
                <li>L1 to L2</li>
                <li>L1 to L3</li>
                <li>L2 to L3</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-yellow-400 mb-2">Phase-to-Neutral</h4>
              <ul className="space-y-1">
                <li>L1 to N</li>
                <li>L2 to N</li>
                <li>L3 to N</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-yellow-400 mb-2">All to Earth</h4>
              <ul className="space-y-1">
                <li>L1 to Earth</li>
                <li>L2 to Earth</li>
                <li>L3 to Earth</li>
                <li>N to Earth</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-yellow-400 mb-2">Total: 10 tests</h4>
              <p>
                All 10 tests must show zero volts. Any voltage on any conductor combination means
                the circuit is not fully isolated.
              </p>
            </div>
          </div>
        </div>
        <p>
          Three-phase isolation also requires special attention to the type of isolator used.
          Three-phase isolators must disconnect all poles simultaneously. Some older installations
          use single-pole devices on each phase — these must all be opened and locked off
          individually. On commercial and industrial sites, permit-to-work systems are often used
          alongside safe isolation to provide an additional layer of administrative control.
        </p>
        <SEOAppBridge
          title="Elec-Mate's testing tools validate every result"
          description="Enter your test results on site and the app validates them against BS 7671 maximum permitted values automatically. Continuity, insulation resistance, Zs, prospective fault current, RCD times — all checked in real time."
          icon={ClipboardCheck}
        />
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
    href: '/guides/how-to-do-safe-isolation',
    title: 'GS 38 Proving Dead Guide',
    description: 'Detailed guide to the prove-test-prove procedure and voltage indicator use.',
    icon: ShieldAlert,
    category: 'Guide',
  },
  {
    href: '/guides/lock-off-loto',
    title: 'Lock-Off and LOTO Guide',
    description: 'Comprehensive guide to lockout/tagout procedures for electrical work.',
    icon: Lock,
    category: 'Guide',
  },
  {
    href: '/guides/permit-to-work',
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
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Hub"
      badgeIcon={ShieldAlert}
      heroTitle={
        <>
          Safe Isolation Procedure:{' '}
          <span className="text-yellow-400">GS 38 Step-by-Step Guide</span>
        </>
      }
      heroSubtitle="The complete guide to safe electrical isolation following HSE Guidance Note GS 38. Prove-test-prove method, lock-off and LOTO procedures, voltage indicator requirements, legal obligations under the Electricity at Work Regulations 1989, and common mistakes that kill electricians."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="Safe Isolation Procedure: Step by Step"
      howToDescription="The complete prove-test-prove safe isolation procedure following HSE Guidance Note GS 38, with lock-off and LOTO requirements."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Safe isolation tools built for site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for safe isolation checklists, AI RAMS generation, testing tools, and 8 certificate types. 7-day free trial, cancel anytime."
    />
  );
}
