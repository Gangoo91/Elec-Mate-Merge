import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldAlert,
  Lock,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  Zap,
  FileText,
  BookOpen,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  {
    label: 'Safe Isolation Procedure',
    href: '/guides/safe-isolation-procedure-electricians',
  },
];

const tocItems = [
  { id: 'overview', label: 'Legal Basis for Safe Isolation' },
  { id: 'gs38', label: 'HSE Guidance Note GS38' },
  { id: 'procedure', label: 'Safe Isolation Procedure: Step by Step' },
  { id: 'test-instruments', label: 'Test Instruments and GS38 Requirements' },
  { id: 'proving-dead', label: 'Proving Dead' },
  { id: 'locking-off', label: 'Locking Off and Multi-Lock Hasps' },
  { id: 'complex-isolations', label: 'Complex Isolations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The legal requirement for safe isolation comes from the Electricity at Work Regulations 1989, specifically Regulation 12 (means for cutting off the supply) and Regulation 13 (precautions for work on equipment made dead).',
  'HSE Guidance Note GS38 specifies the requirements for test equipment used during safe isolation — test leads with CAT III or CAT IV rating, fused probes, shrouded connectors, and insulated shaft with only the probe tip exposed.',
  'The safe isolation procedure follows the prove-isolate-prove sequence: prove the voltage indicator is working on a known live source, isolate the circuit, then prove dead at the point of work.',
  'After isolation, the isolation point must be secured against re-energisation using a lock, locking-off device, or multi-lock hasp where multiple operatives are working simultaneously.',
  'The HSE specifies that a GS38-compliant voltage indicator (not a multimeter used alone) must be used for proving dead — a single approved voltage indicator with CAT rating appropriate to the voltage.',
];

const faqs = [
  {
    question: 'What are Regulations 12 and 13 of the Electricity at Work Regulations 1989?',
    answer:
      'Regulation 12 requires that electrical equipment that may give rise to danger shall not be used unless suitable means exist to cut off the supply of electrical energy to that equipment safely. This requires that a means of isolation is available for every piece of equipment — a means that can be operated without risk to the operator. Regulation 13 requires that adequate precautions shall be taken to prevent electrical equipment from becoming electrically charged, or being re-energised, while work is carried out on or near it. This is the legal basis for the prove-isolate-prove sequence and the use of locks, permits to work, and physical barriers. Both regulations are absolute — there is no qualification that the duties apply "where reasonably practicable." Compliance is mandatory.',
  },
  {
    question: 'What does GS38 require for electrical test equipment?',
    answer:
      'HSE Guidance Note GS38 "Electrical test equipment for use by electricians" specifies that test leads, probes, and clips used for electrical testing should: be rated at the voltage and category of the circuit being tested (CAT III 1000V or CAT IV 600V for most fixed installation work); have test leads with good insulation, an acceptable current-carrying capacity, and fused clips where appropriate; have probes with insulated shafts with only a small tip of conductor exposed (no more than 4mm of bare metal at the tip); and have shrouded connectors to prevent accidental contact with adjacent live terminals. GS38 also covers the requirements for voltage detectors used for proving dead — they should be the GS38-compliant type with integral test facility.',
  },
  {
    question: 'Can I use a multimeter alone to prove dead?',
    answer:
      'A multimeter can be used as part of the proving-dead process but should not be the only instrument used. The HSE strongly recommends using a dedicated voltage indicator (a two-pole tester designed for this purpose) as the primary proving-dead instrument. Multimeters can give misleading readings in some circumstances — for example, on a high-impedance input they may indicate a low voltage on a capacitively coupled circuit that appears dead but is not truly isolated. An approved two-pole voltage indicator, used in conjunction with a proving unit (to confirm the tester is working before and after proving dead), provides the most reliable indication of a dead circuit. The HSE guidance is clear: prove with an approved indicator, not a multimeter alone.',
  },
  {
    question: 'What is a proving unit and why is it needed?',
    answer:
      'A proving unit (also called a test lamp or test instrument proving device) is a small battery-powered unit that provides a known voltage (typically 50V to 240V AC) so that the voltage indicator can be verified as working before and after proving dead. The prove-test-prove sequence requires: proving the voltage indicator works by testing on a known live source (which can be the circuit itself before isolation, or a proving unit), then testing for dead at the isolation point and at the point of work, then proving the voltage indicator still works afterwards using the proving unit again. This confirms that a negative (dead) reading was not caused by a faulty instrument.',
  },
  {
    question: 'What is a multi-lock hasp and when is it used?',
    answer:
      'A multi-lock hasp is a device that allows multiple padlocks to be fitted to a single isolation point, so that no single individual can remove all the locks and re-energise the circuit. It is used when multiple operatives are working simultaneously on a circuit or piece of equipment. Each operative fits their own padlock to the hasp when they start work and removes it only when they are clear. The isolation cannot be re-energised until all padlocks are removed, which means all operatives must have finished and confirmed they are clear before the circuit can be re-energised. Multi-lock hasps are essential on larger commercial and industrial sites where multiple trades work on the same plant.',
  },
  {
    question: 'What should I do if I cannot lock off the isolation point?',
    answer:
      'Where a physical lock cannot be fitted to the isolation point (for example, where the consumer unit does not have provision for a lock), alternative precautions must be taken. Options include: removing the fuse or MCB and keeping it in your possession (the most common approach for domestic work — carry the fuse in your pocket); placing a warning label and barrier notice on the consumer unit clearly stating the circuit is isolated and work is in progress; posting a colleague to guard the consumer unit while work is carried out; or using a temporary insulating cover over the isolation device. For MCB-only consumer units without fuse removal, an MCB lock-off device (a clamp that physically prevents the MCB from being switched on) can be fitted. Simply turning off the MCB is not sufficient — it must be secured against accidental re-energisation.',
  },
  {
    question: 'Does safe isolation apply to domestic electrical work?',
    answer:
      'Yes. The Electricity at Work Regulations 1989 apply to all electrical work, including domestic electrical work carried out by electricians. There is no domestic exemption. For domestic work, the practical approach is: switch off the circuit MCB at the consumer unit, remove the fuse carrier (if rewireable fuse board) or use an MCB lock-off device, carry the fuse or lock in your pocket, place a warning label on the consumer unit, and prove dead at the point of work before starting. For work at the consumer unit itself, the supply to the consumer unit must be isolated at the meter tails (by the DNO or meter operator in most cases, as consumer units are live at the meter tails even when the main switch is off). Under no circumstances should work be carried out on live conductors in domestic premises.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-safety-checks-new-home',
    title: 'Electrical Safety Checks for a New Home',
    description: 'Safe isolation is essential before any inspection work on an unfamiliar installation.',
    icon: ShieldAlert,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue Electrical Installation Certificates on site after safe isolation and testing.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete Electrical Installation Condition Reports on your phone.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'C&G 2391 training including safe isolation procedures and test instrument use.',
    icon: BookOpen,
    category: 'Training',
  },
  {
    href: '/guides/electrical-fire-prevention-uk',
    title: 'Electrical Fire Prevention Guide',
    description: 'The consequences of unsafe electrical work — why safe isolation matters.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations-electrical',
    title: 'Part P Building Regulations Guide',
    description: 'Regulatory framework for domestic electrical work in the UK.',
    icon: Scale,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Legal Basis for Safe Isolation',
    content: (
      <>
        <p>
          Safe isolation is not a recommendation — it is a legal requirement. The Electricity at
          Work Regulations 1989 (EAW Regulations) place absolute duties on employers and employees
          to ensure that electrical work is carried out safely, and safe isolation is the
          foundation of safe electrical working practice.
        </p>
        <p>
          Two regulations are specifically relevant:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Regulation 12 — Means of Isolation</h3>
            <p className="text-white text-sm leading-relaxed">
              Regulation 12 requires that adequate means shall exist to cut off the supply of
              electrical energy to any equipment. This means every circuit must have a means of
              isolation — a switch, MCB, isolator, or fuse — that can be operated safely without
              exposing the operator to risk. The means of isolation must be accessible and capable
              of being secured against unintentional re-energisation.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Regulation 13 — Precautions for Dead Working</h3>
            <p className="text-white text-sm leading-relaxed">
              Regulation 13 requires that adequate precautions shall be taken to prevent equipment
              that has been made dead from becoming electrically charged while work is in progress.
              This requires locking off, tagging, and testing. The regulation is absolute — there
              is no "where reasonably practicable" qualification. Non-compliance is a criminal
              offence.
            </p>
          </div>
        </div>
        <p>
          Breaches of the EAW Regulations that result in an accident can lead to prosecution under
          the Health and Safety at Work etc. Act 1974, potentially resulting in an unlimited fine
          and up to 2 years' imprisonment for individuals. Beyond the legal consequences, an
          electrical accident — particularly a fatality — has devastating personal consequences.
          Safe isolation is non-negotiable.
        </p>
      </>
    ),
  },
  {
    id: 'gs38',
    heading: 'HSE Guidance Note GS38',
    content: (
      <>
        <p>
          HSE Guidance Note GS38 ("Electrical test equipment for use by electricians") sets out the
          requirements for the test equipment used during safe isolation and electrical testing. GS38
          is not a legal standard in itself, but it represents the HSE's interpretation of what
          constitutes suitable test equipment under the EAW Regulations, and failure to comply with
          GS38 in the event of an accident will make it very difficult to demonstrate that adequate
          precautions were taken.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-semibold text-white text-base mb-4">GS38 Requirements for Test Equipment</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>CAT rating</strong> — test instruments must be rated for the installation
                category in which they are used. For fixed domestic and commercial installations,
                CAT III 1000V or CAT IV 600V is required. CAT rating indicates the instrument's
                ability to withstand transient overvoltages (voltage spikes) without being damaged
                or causing a flashover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fused test leads</strong> — test leads should be fused at an appropriate
                rating (typically 500mA or 1A) to limit the energy released in the event of an
                accidental short circuit. Unfused test leads connected to a voltage source can
                draw very large fault currents in the event of a short.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shrouded connectors</strong> — the connectors where the test leads plug
                into the instrument must be shrouded (insulated) to prevent accidental contact
                with adjacent live terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulated probes</strong> — probe shafts must be insulated with only a
                small tip of metal exposed — no more than 4mm of bare metal at the probe tip.
                Long bare metal probe shafts create a risk of bridging adjacent terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integral prove facility</strong> — voltage indicators used for proving
                dead should have an integral test facility (proving unit function) or should be
                used with a separate proving unit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'procedure',
    heading: 'Safe Isolation Procedure: Step by Step',
    content: (
      <>
        <p>
          The safe isolation procedure follows a defined sequence that must not be shortened or
          modified. The sequence is sometimes described as "prove-isolate-secure-prove" and is
          based on the principle that the voltage indicator must be demonstrated to be working
          before it is used to prove a circuit dead.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-5 text-white">
            <li className="flex items-start gap-4">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div>
                <strong>Identify the circuit</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Identify the circuit to be isolated and confirm which protective device controls
                  it. In a well-labelled consumer unit this is straightforward; in an unlabelled or
                  poorly labelled board, plug-in circuit tracers or careful load testing is required.
                  Never assume a label is correct — verify.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div>
                <strong>Select and prove the voltage indicator</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Select a GS38-compliant voltage indicator. Prove that it is functioning by
                  testing on a known live source — this can be a proving unit, or by testing at
                  the circuit itself before switching off. The indicator must give a positive
                  reading on a known live source before being used to confirm dead.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div>
                <strong>Isolate the circuit</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Switch off the MCB, remove the fuse, open the isolator, or operate the relevant
                  isolation device. For single-pole MCBs in a domestic consumer unit, this switches
                  off only the live conductor — the neutral may still be connected to the circuit.
                  A double-pole switch ensures both live and neutral are isolated.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">4</span>
              <div>
                <strong>Secure the isolation point</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Lock off the isolation device, remove the fuse and carry it, fit an MCB lock-off
                  device, or post a colleague to guard the isolation point. Place warning notices.
                  For multi-operative working, use a multi-lock hasp so each operative has their
                  own lock.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">5</span>
              <div>
                <strong>Prove dead at the point of work</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  Test at the actual point of work — not just at the consumer unit — to confirm
                  the circuit is dead. Test all conductors: live to earth, live to neutral, neutral
                  to earth. A positive reading on any combination indicates the circuit is not dead
                  — stop and investigate before proceeding.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 mt-0.5">6</span>
              <div>
                <strong>Prove the indicator is still working</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  After proving dead, re-test the voltage indicator on a known live source (proving
                  unit or adjacent live circuit) to confirm it is still functioning. If it does not
                  respond, the "dead" reading in step 5 may have been caused by a faulty instrument
                  — stop work and re-prove with a functioning instrument.
                </p>
              </div>
            </li>
          </ol>
        </div>
        <p>
          The procedure is now complete. Work can proceed on the isolated circuit. Do not remove
          the locking device or warning notice until work is complete and the circuit is ready to
          be re-energised.
        </p>
      </>
    ),
  },
  {
    id: 'test-instruments',
    heading: 'Test Instruments and GS38 Requirements in Practice',
    content: (
      <>
        <p>
          Choosing the right test instruments is not just about compliance — it is about safety.
          Substandard test leads are one of the most common causes of electrical accidents in the
          trade.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the CAT rating on your test leads</strong> — not just the instrument.
                Many electricians have CAT III or CAT IV rated instruments but use cheap test leads
                with no CAT rating, which voids the GS38 compliance of the entire setup. Replace
                leads that do not display a CAT rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspect leads before each use</strong> — test leads deteriorate with use.
                Check for cracked insulation, exposed conductors near the probe or connector,
                damaged fuses (if the lead has a fuse in the probe body), and bent or damaged
                probe tips. Damaged leads must be replaced immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carry a proving unit</strong> — a proving unit is a small, inexpensive
                device that allows you to verify the voltage indicator is working on any job
                site where there may not be a convenient adjacent live source to test on. They
                cost less than £20 and could save your life.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'proving-dead',
    heading: 'Proving Dead: The HSE Guidance',
    content: (
      <>
        <p>
          "Proving dead" — confirming that a circuit is not live at the point of work — is the
          most critical step in safe isolation. The HSE is specific about how this must be done.
        </p>
        <p>
          An approved voltage indicator (a two-pole voltage tester designed for proving dead) is
          the correct instrument. A multimeter can be used as a secondary check but should not be
          the primary proving instrument. The reasons are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multimeter high input impedance</strong> — a multimeter on the voltage
                range has a very high input impedance (typically 10 megohms). This means it can
                display a significant voltage reading from capacitive coupling in adjacent cables,
                even when the circuit is truly isolated. A two-pole voltage indicator has a lower
                impedance and will not give false readings from capacitive coupling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multimeter auto-ranging delays</strong> — some multimeters have an
                auto-ranging function that takes a moment to settle on the correct range. If
                voltage is applied suddenly, the reading may be incorrect during the settling
                period.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The HSE approved voltage indicator must be used in accordance with the prove-test-prove
          sequence. This confirms both that the circuit is dead and that the instrument used to
          make that determination was functioning correctly.
        </p>
      </>
    ),
  },
  {
    id: 'locking-off',
    heading: 'Locking Off and Warning Notices',
    content: (
      <>
        <p>
          After isolating the circuit, the isolation point must be secured against re-energisation.
          Simply switching off the MCB is not sufficient — another person could switch it back on
          without being aware that work is in progress.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remove the fuse</strong> — for rewireable fuse boards and old fuse carriers,
                remove the fuse carrier and carry it in your pocket. No fuse = no current. This is
                the most common approach for domestic work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB lock-off device</strong> — a plastic clip that fits over the MCB and
                prevents it from being switched on. Available with a padlock hole so the device
                can be locked. Suitable for any MCB in a standard consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Padlock on an isolator or switch</strong> — purpose-designed isolators
                and switch-disconnectors often have provisions for a padlock. A padlock provides
                positive security — the circuit cannot be re-energised without the key.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning notice</strong> — a warning notice ("Do not switch on — work in
                progress") should be attached to the consumer unit or isolation point in all
                cases, even when a physical locking device is also used. Warning notices alert
                others to the situation and provide a clear indication of who is responsible for
                the isolation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'complex-isolations',
    heading: 'Complex Isolations and Multi-Lock Hasps',
    content: (
      <>
        <p>
          For larger commercial and industrial installations where multiple operatives work
          simultaneously on the same plant or equipment, a more structured approach to isolation
          and lock-off is required. A permit to work system and multi-lock hasps are the standard
          approach.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Multi-lock hasp</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  A multi-lock hasp is a steel bar with multiple padlock holes. It is fitted to
                  the isolation point (preventing re-energisation), and each operative working on
                  the circuit fits their own padlock to the hasp. The isolation cannot be removed
                  until all padlocks are removed — which requires every operative to confirm they
                  are clear. Each operative carries their own key; no single person can re-energise
                  the circuit while other padlocks remain.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong>Permit to work</strong>
                <p className="text-white text-sm mt-1 leading-relaxed">
                  A permit to work is a formal document that identifies the equipment to be worked
                  on, the isolation points that have been locked off, the persons authorised to
                  carry out the work, and the precautions in place. It is signed off by a competent
                  person (the permit issuer) and by the person receiving the permit. Permits to
                  work are required for high-voltage work and are best practice for complex low-
                  voltage work on large installations.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Issue method statements and risk assessments on site"
          description="Elec-Mate's AI health and safety tools can generate method statements and risk assessments for complex electrical work, including safe isolation procedures, on your phone. Professional H&S documentation in minutes."
          icon={FileText}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Safe Isolation on Every Job',
    content: (
      <>
        <p>
          Safe isolation must be carried out on every job, every time — there are no exceptions
          for "quick jobs" or for circuits that appear dead because a switch is off. The switch
          might be wrong, the circuit might be double-switched, or there might be a borrowing
          arrangement. Always prove dead before touching.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Essential Kit for Safe Isolation</h4>
                <ul className="text-white text-sm space-y-1 mt-1">
                  <li>GS38-compliant voltage indicator (two-pole tester)</li>
                  <li>Proving unit to verify the indicator is working</li>
                  <li>GS38-compliant test leads with CAT III or CAT IV rating</li>
                  <li>MCB lock-off devices (carry several)</li>
                  <li>Warning notices ("Do not switch on")</li>
                  <li>Multi-lock hasp for multi-operative jobs</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Record Safe Isolation in Your Certificate</h4>
                <p className="text-white text-sm leading-relaxed">
                  The{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>{' '}
                  and{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>{' '}
                  certificates include sections for recording the test instruments used, including
                  the voltage indicator and multimeter details. Always complete these sections —
                  they provide a record that GS38-compliant instruments were used.
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

export default function SafeIsolationProcedureGuidePage() {
  return (
    <GuideTemplate
      title="Safe Isolation Procedure for Electricians | GS38 and EAW Regulations"
      description="Complete safe isolation procedure guide for UK electricians. Legal basis in Electricity at Work Regulations 1989 Regulations 12 and 13, HSE GS38 requirements for test instruments, prove-isolate-secure-prove sequence, multi-lock hasps, and proving dead correctly."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Procedure Guide"
      badgeIcon={ShieldAlert}
      heroTitle={
        <>
          Safe Isolation Procedure:{' '}
          <span className="text-yellow-400">GS38, EAW Regulations, and Proving Dead</span>
        </>
      }
      heroSubtitle="Safe isolation is a legal requirement under the Electricity at Work Regulations 1989. This guide covers the prove-isolate-secure-prove sequence, HSE GS38 requirements for test instruments, locking off, multi-lock hasps, and the correct method for proving dead."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Safe Isolation"
      relatedPages={relatedPages}
      ctaHeading="Record Test Instruments and Certify Work On Site"
      ctaSubheading="Elec-Mate's EIC and EICR certificate apps include full test instrument recording. Complete compliant certificates on your phone, issue PDFs on site, and keep GS38 instrument records in every certificate. 7-day free trial."
    />
  );
}
