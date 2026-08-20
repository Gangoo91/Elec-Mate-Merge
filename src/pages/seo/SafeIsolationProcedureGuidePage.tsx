import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  FileText,
  BookOpen,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared presentation classes
// -------------------------------------------------------------------

/** Edge-to-edge on phones, inset card from sm: up. */
const cardCn =
  '-mx-4 my-5 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] ' +
  'p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

/** Same shell, but the child is a horizontally scrolling table. */
const tableShellCn =
  '-mx-4 my-5 overflow-x-auto border-y border-white/[0.14] ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x';

const thCn = 'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white';
const tdCn = 'px-4 py-3 align-top text-sm text-white';

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
  { id: 'procedure', label: 'Safe Isolation Procedure: 6 Steps' },
  { id: 'key-references', label: 'Key References for Safe Isolation' },
  { id: 'test-instruments', label: 'Test Instruments in Practice' },
  { id: 'proving-dead', label: 'Proving Dead' },
  { id: 'locking-off', label: 'Locking Off and Warning Notices' },
  { id: 'bs7671-isolation', label: 'How BS 7671 Supports Safe Isolation' },
  { id: 'complex-isolations', label: 'Complex Isolations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The legal requirement comes from the Electricity at Work Regulations 1989 — Regulation 12 (means for cutting off the supply and for isolation) and Regulation 13 (precautions for work on equipment made dead). Neither is qualified by "so far as is reasonably practicable".',
  'Regulation 12(2) defines isolation as disconnection and separation from every source of electrical energy in such a way that the disconnection and separation is secure. Securing the isolation point is part of the legal definition, not an optional extra.',
  'GS38 is HSE guidance, not statute. It carries no legal force of its own, but it is the HSE’s account of what "suitable" test equipment means under Regulation 4(4) of the EAW Regulations — so departing from it means proving suitability another way.',
  'The sequence is prove — isolate — secure — prove dead — prove again: demonstrate the voltage indicator works on a known live source, isolate, lock off, prove dead at the point of work, then re-prove the indicator.',
  'The HSE prefers a dedicated two-pole voltage indicator over a multimeter for proving dead. A multimeter’s high input impedance can display a phantom voltage from capacitive coupling on a circuit that really is dead.',
  'BS 7671 does not set the safe isolation procedure — it provides the means. Section 462 requires an isolator for every circuit, Regulation 462.3 recognises padlocking and lockable enclosures, and Regulation 514.11.1 requires a warning notice wherever live parts cannot be isolated by a single device.',
  'For inspection and testing, IET Guidance Note 3 (Regulation 1.1) is explicit: where testing does not require the installation to be live, it shall be made dead and safely isolated before the test. BS 7671 Regulation 642.1 adds that inspection shall normally be done with that part disconnected from the supply.',
];

const faqs = [
  {
    question: 'Is GS38 statutory?',
    answer:
      'No. HSE Guidance Note GS38 is guidance, not law, and it is not an Approved Code of Practice — it carries no special legal status of its own. What is statutory is Regulation 4(4) of the Electricity at Work Regulations 1989: any equipment provided for the purpose of protecting people working on or near electrical equipment shall be suitable for the use for which it is provided, be maintained in a condition suitable for that use, and be properly used. GS38 is the HSE’s own published account of what "suitable" means for test leads, probes and voltage indicators. Following it is the straightforward way to show the duty has been met; departing from it is not automatically an offence, but it leaves you having to demonstrate suitability by some other route — typically after an incident, to an HSE inspector. IET Guidance Note 3 reinforces the point, stating that the safety procedures in GS38 shall be observed when using electrical test equipment.',
  },
  {
    question: 'What are Regulations 12 and 13 of the Electricity at Work Regulations 1989?',
    answer:
      'Regulation 12 requires that, where necessary to prevent danger, suitable means shall be available for cutting off the supply of electrical energy to any electrical equipment and for the isolation of any electrical equipment — including, where appropriate, methods of identifying circuits. Regulation 12(2) then defines isolation as the disconnection and separation of the equipment from every source of electrical energy in such a way that the disconnection and separation is secure. Regulation 13 requires that adequate precautions shall be taken to prevent equipment made dead for work from becoming electrically charged during that work, where danger may thereby arise. Neither regulation is qualified by "so far as is reasonably practicable" — both are absolute duties. Regulation 29 provides a defence of having taken all reasonable steps and exercised all due diligence, but that is a defence raised at trial, not a relaxation of the duty on site.',
  },
  {
    question: 'What does GS38 require for electrical test equipment?',
    answer:
      'GS38 "Electrical test equipment for use by electricians" sets out what the HSE regards as suitable test leads, probes, clips and voltage indicators. In outline: leads and probes should be rated for the measurement category and voltage of the circuit being tested (CAT III or CAT IV for fixed installation work); leads should have adequate insulation, adequate current-carrying capacity and, where the instrument manufacturer advises it, fuses; probes should have insulated shafts with only a short length of exposed metal tip; and connectors should be shrouded so they cannot bridge adjacent live terminals. GS38 also covers voltage detectors used for proving dead, which should either have an integral proving facility or be used with a separate proving unit. IET Guidance Note 3 notes that GS38 requires leads and probes to suit the insulation overvoltage category in which the test is being carried out, and cross-refers to BS EN 61010-1 for how CAT markings are interpreted.',
  },
  {
    question: 'Can I use a multimeter alone to prove dead?',
    answer:
      'A multimeter can be used as a secondary check but should not be the only instrument used. The HSE prefers a dedicated two-pole voltage indicator designed for the purpose as the primary proving-dead instrument. Multimeters can mislead: on the voltage range the input impedance is very high, typically around 10 megohms, so capacitive coupling from adjacent cables can produce a reading on a circuit that really is dead — and, conversely, an unnoticed range or function selection can produce no reading on a circuit that is live. An approved two-pole voltage indicator used with a proving unit, so the tester is confirmed working before and after, gives the most reliable indication.',
  },
  {
    question: 'What is a proving unit and why is it needed?',
    answer:
      'A proving unit is a small battery-powered device that generates a known voltage so the voltage indicator can be shown to be working before and after proving dead. The sequence is: prove the indicator on a known live source — a proving unit, or the circuit itself before it is switched off; test for dead at the point of work; then prove the indicator again. The final step is the one people skip and the one that matters, because it is what rules out the possibility that the "dead" reading came from an instrument that had failed between the two tests. IET Guidance Note 3 requires the absence of voltage to be verified after isolation, using a suitable voltage indicator in line with GS38.',
  },
  {
    question: 'What is a multi-lock hasp and when is it used?',
    answer:
      'A multi-lock hasp is a device that allows several padlocks to be fitted to one isolation point, so no single individual can remove all the locks and re-energise the circuit. It is used where more than one operative is working on the same circuit or item of plant. Each operative fits their own padlock when they start and removes it only when they are clear, so the isolation cannot be released until everyone has confirmed they are finished. Multi-lock hasps are standard on larger commercial and industrial sites where several trades work on the same plant. BS 7671 Regulation 462.3 lists padlocking as one of the recognised ways of preventing unintentional or inadvertent closure of an isolating device.',
  },
  {
    question: 'What should I do if I cannot lock off the isolation point?',
    answer:
      'Where a padlock cannot be fitted, other precautions must be taken so the isolation is still secure — Regulation 12(2) of the EAW Regulations makes security part of the definition of isolation. Options include: removing the fuse or fuse carrier and keeping it in your possession, which is the usual approach on domestic rewireable and cartridge fuse boards; fitting an MCB lock-off clip, which physically prevents the breaker being switched back on and normally takes a padlock; placing a warning notice on the board stating that the circuit is isolated and work is in progress; or posting someone to guard the isolation point where nothing else is available. BS 7671 Regulation 462.3 also recognises locating the device within a lockable space or enclosure, or adjacent to the equipment being worked on. Simply switching the MCB off is not sufficient on its own.',
  },
  {
    question: 'Does safe isolation apply during EICR inspection and testing work?',
    answer:
      'Yes. IET Guidance Note 3, Regulation 1.1, is explicit: where testing does not require the equipment or part of an installation to be live, the installation or part shall be made dead and safely isolated before the test is performed. BS 7671 Regulation 642.1 makes the same point for the inspection itself — inspection shall precede testing and shall normally be done with that part of the installation under inspection disconnected from the supply — and Regulation 641.4 requires precautions to be taken to avoid danger to persons and livestock, and damage to property and installed equipment, during inspection and testing. So continuity, insulation resistance and ring final circuit testing all need safe isolation first. Only tests that inherently require a live supply, such as earth fault loop impedance and RCD operation, are carried out live, and Guidance Note 3 asks the inspector to consider in each case whether the live test is necessary at all. Record the test instruments used on the certificate so the GS38-compliant kit is documented.',
  },
  {
    question: 'Does safe isolation apply to domestic electrical work?',
    answer:
      'Yes. The Electricity at Work Regulations 1989 apply to all electrical work carried out at work, including domestic work carried out by an electrician. There is no domestic exemption. In practice: switch off the circuit breaker at the consumer unit, fit an MCB lock-off device or remove the fuse carrier and keep it on you, put a warning notice on the board, and prove dead at the point of work before starting. Note that a single-pole MCB breaks only the line conductor — on a TT installation, isolation requires all live conductors including the neutral to be disconnected. For work on the consumer unit itself, the meter tails and the supplier’s cut-out remain live even with the main switch off; withdrawing the service fuse is the distributor’s or meter operator’s job and must be arranged with them, not done on your own initiative. Working live is permitted only in the narrow circumstances of Regulation 14 of the EAW Regulations, and in domestic premises those conditions are almost never met.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-safety-checks-new-home',
    title: 'Electrical Safety Checks for a New Home',
    description:
      'Safe isolation is essential before any inspection work on an unfamiliar installation.',
    icon: ShieldAlert,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site after safe isolation and testing.',
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
    href: '/inspection-testing-course',
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
// Section content
// -------------------------------------------------------------------

const procedureSteps = [
  {
    title: 'Identify the circuit',
    body: 'Identify the circuit to be isolated and confirm which protective device controls it. In a well-labelled board this is straightforward; in an unlabelled one, use a plug-in circuit tracer or careful load switching. Never take a label at face value — verify it. Regulation 12 of the EAW Regulations specifically includes methods of identifying circuits within the "suitable means" it requires.',
  },
  {
    title: 'Select and prove the voltage indicator',
    body: 'Select a GS38-compliant two-pole voltage indicator. Prove it works on a known live source — a proving unit, or the circuit itself before you switch off. It must give a positive indication on a known live source before you can rely on it to confirm anything is dead.',
  },
  {
    title: 'Isolate the circuit',
    body: 'Switch off the breaker, withdraw the fuse, or open the isolator. A single-pole MCB breaks only the line conductor, leaving the neutral connected. BS 7671 Regulation 461.2 allows this in TN-S and TN-C-S systems where protective equipotential bonding is installed and the neutral is reliably connected to Earth; on a TT or IT system, isolation requires all live conductors to be disconnected.',
  },
  {
    title: 'Secure the isolation point',
    body: 'Lock off the device, fit an MCB lock-off clip, or withdraw the fuse and keep it on you, and add a warning notice. Regulation 12(2) of the EAW Regulations makes the security of the disconnection part of the definition of isolation. Where several operatives are working, use a multi-lock hasp so each holds their own lock.',
  },
  {
    title: 'Prove dead at the point of work',
    body: 'Test at the actual point of work, not just at the board. Test every conductor combination — line to neutral, line to earth, neutral to earth. Any indication on any combination means the circuit is not dead: stop and investigate before going any further.',
  },
  {
    title: 'Prove the indicator is still working',
    body: 'Re-test the voltage indicator on the proving unit or a known live source. If it no longer responds, the dead reading in step 5 proves nothing — stop, replace the instrument and start the proving sequence again.',
  },
];

const catRows = [
  {
    cat: 'CAT II',
    where: 'Appliances and equipment downstream of a socket-outlet',
    use: 'Plug-in loads',
  },
  {
    cat: 'CAT III',
    where: 'Fixed installation wiring — distribution boards, final circuits, socket-outlets',
    use: 'Most fixed-wiring work',
  },
  {
    cat: 'CAT IV',
    where: 'The origin of the installation — supply intake, meter tails and main switch',
    use: 'Origin / intake work',
  },
];

const instrumentRows = [
  {
    factor: 'Proving dead',
    vi: 'Designed for it — the HSE’s preferred instrument',
    mm: 'Secondary check only, never on its own',
  },
  {
    factor: 'Input impedance',
    vi: 'Lower — rejects capacitive coupling',
    mm: 'High, typically around 10 MΩ — can show a phantom voltage',
  },
  {
    factor: 'Range selection',
    vi: 'None — a clear go / no-go indication',
    mm: 'May auto-range, with a settling delay',
  },
  {
    factor: 'Prove before and after',
    vi: 'Integral prove facility or a separate proving unit',
    mm: 'Relies on a separate known live source',
  },
];

const lockOffRows = [
  {
    method: 'Withdraw the fuse or carrier and keep it',
    suited: 'Rewireable and cartridge fuse boards; single-operative domestic work',
  },
  {
    method: 'MCB lock-off clip with padlock',
    suited: 'Standard MCB consumer units where there is no fuse to remove',
  },
  {
    method: 'Padlock on the isolator or switch-disconnector',
    suited: 'Boards and equipment with built-in provision for a padlock',
  },
  {
    method: 'Multi-lock hasp',
    suited: 'More than one operative on the same circuit or item of plant',
  },
  {
    method: 'Lockable enclosure or cupboard',
    suited: 'Plant rooms and intake rooms — recognised by Regulation 462.3',
  },
];

const bs7671Rows = [
  {
    reg: '462.1.201',
    text: 'A main linked switch or linked circuit-breaker shall be provided as near as practicable to the origin of every installation as a means of switching the supply on load and as a means of isolation. A main switch intended for operation by ordinary persons, for example in a household installation, shall interrupt both live conductors of a single-phase supply.',
  },
  {
    reg: '462.2',
    text: 'Every circuit shall be provided with isolation means for all live conductors, except as detailed in Regulation 461.2. Provision may be made for isolating a group of circuits by a common means if the service conditions allow this.',
  },
  {
    reg: '462.3',
    text: 'Devices for isolation shall be designed and/or installed so as to prevent unintentional or inadvertent closure. The examples given are: located within a lockable space or lockable enclosure; padlocking; located adjacent to the associated equipment.',
  },
  {
    reg: '462.4',
    text: 'Where residual electrical energy is potentially present, suitable means shall be provided for its discharge, with a warning label giving the discharge time before the enclosure can be safely opened where relevant.',
  },
  {
    reg: '537.2.3',
    text: 'Devices for isolation shall be designed for overvoltage category III or IV — the exception being the plug of a plug and socket-outlet combination identified in Table 537.4 as suitable for isolation.',
  },
  {
    reg: '537.2.6',
    text: 'Means of isolation shall preferably be a multipole switching device disconnecting all applicable poles, although single-pole devices situated adjacent to each other are not excluded, subject to Regulation 461.2.',
  },
  {
    reg: '537.2.7',
    text: 'Each device used for isolation shall be clearly identified by position or durable marking to indicate the installation or circuit it isolates.',
  },
  {
    reg: '514.11.1',
    text: 'A durable warning notice shall be fixed in each position where there are live parts which are not capable of being isolated by a single device. The location of each disconnector shall be indicated unless there is no possibility of confusion.',
  },
];

const sections = [
  {
    id: 'overview',
    heading: 'Legal Basis for Safe Isolation',
    content: (
      <>
        <div className={cardCn}>
          <p className="text-xs font-semibold uppercase tracking-wide text-elec-yellow">
            The sequence, in one line
          </p>
          <p className="mt-2 text-base font-semibold leading-relaxed text-white">
            Identify → prove the indicator → isolate → secure → prove dead at the point of work →
            prove the indicator again.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white">
            Six steps, in that order, every time. The legal duty is Regulations 12 and 13 of the
            Electricity at Work Regulations 1989. BS 7671 makes sure a suitable means of isolation
            is there to use, and HSE Guidance Note GS38 covers the instrument you prove dead with.
          </p>
        </div>
        <p>
          Safe isolation is not a recommendation. The Electricity at Work Regulations 1989 (the EAW
          Regulations) place duties on employers, the self-employed and employees to ensure
          electrical work is carried out safely, and safe isolation is the foundation of working
          dead. Two regulations do most of the work:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-5">
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <h3 className="mb-3 text-lg font-bold text-white">
              Regulation 12 — cutting off the supply and isolation
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Where necessary to prevent danger, suitable means — including, where appropriate,
              methods of identifying circuits — shall be available for cutting off the supply of
              electrical energy to any equipment and for the isolation of any equipment. Regulation
              12(2) then defines isolation as disconnection and separation from every source of
              electrical energy{' '}
              <strong>in such a way that the disconnection and separation is secure</strong>.
              Locking off is not an add-on to isolation; it is part of what the word means.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <h3 className="mb-3 text-lg font-bold text-white">
              Regulation 13 — precautions for work on equipment made dead
            </h3>
            <p className="text-sm leading-relaxed text-white">
              Adequate precautions shall be taken to prevent equipment that has been made dead, in
              order to prevent danger while work is carried out on or near it, from becoming
              electrically charged during that work where danger may thereby arise. In practice that
              means locking off, warning notices and proving dead at the point of work.
            </p>
          </div>
        </div>
        <h3 className="mt-6 mb-2 text-base font-semibold text-white">
          These are absolute duties, and what that means
        </h3>
        <p>
          Neither regulation is qualified by &lsquo;so far as is reasonably practicable&rsquo;.
          Regulation 29 of the EAW Regulations does provide a defence of having taken all reasonable
          steps and exercised all due diligence — but that is a defence argued at trial, not a
          relaxation of the duty on site. A breach is prosecuted under the Health and Safety at Work
          etc. Act 1974: on indictment, an unlimited fine and up to two years&rsquo; imprisonment for
          an individual. Beyond that, an electrical accident — particularly a fatality — has
          consequences that no penalty describes.
        </p>
      </>
    ),
  },
  {
    id: 'gs38',
    heading: 'HSE Guidance Note GS38',
    content: (
      <>
        <div className={cardCn}>
          <p className="text-xs font-semibold uppercase tracking-wide text-elec-yellow">
            Is GS38 statutory?
          </p>
          <p className="mt-2 text-base font-semibold leading-relaxed text-white">
            No — GS38 is HSE guidance, not law. The duty it interprets is.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white">
            GS38 has no legal force of its own and is not an Approved Code of Practice. What is
            statutory is Regulation 4(4) of the EAW Regulations: equipment provided to protect
            people working on or near electrical equipment shall be suitable for the use for which
            it is provided, be maintained in a condition suitable for that use, and be properly
            used. GS38 is the HSE&rsquo;s published account of what &lsquo;suitable&rsquo; means for
            test leads, probes and voltage indicators — so working outside it is not automatically an
            offence, but it leaves you proving suitability some other way, usually after an incident.
          </p>
        </div>
        <p>
          GS38, &lsquo;Electrical test equipment for use by electricians&rsquo;, sets out what the
          HSE regards as suitable test equipment for use during safe isolation and electrical
          testing. IET Guidance Note 3 reinforces it directly, stating that the testing safety
          procedures detailed in GS38 shall be observed when using electrical test equipment.
        </p>
        <h3 className="mt-6 mb-2 text-base font-semibold text-white">
          What GS38 asks of your test kit
        </h3>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
              <span>
                <strong>Measurement category rating</strong> — instruments, leads and probes must be
                rated for the category and voltage of the circuit under test. For fixed domestic and
                commercial installations that means CAT III or CAT IV. The rating describes the
                transient overvoltage the equipment can withstand without breaking down.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
              <span>
                <strong>Fused leads where the manufacturer advises them</strong> — fuses limit the
                energy released if a probe bridges to a live part. Guidance Note 3 notes that some
                manufacturers permit non-fused leads where the instrument itself has built-in
                protection; follow the instrument instructions, and remember that internal protection
                does not extend to the leads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
              <span>
                <strong>Shrouded connectors</strong> — where the leads plug into the instrument, the
                connectors must be shrouded so they cannot be touched or bridge adjacent terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
              <span>
                <strong>Insulated probes with a short exposed tip</strong> — probe shafts insulated,
                with only a short length of metal exposed at the tip, plus finger barriers. Long bare
                shafts bridge adjacent terminals in a crowded board.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
              <span>
                <strong>A way of proving the indicator</strong> — a voltage indicator used for
                proving dead should have an integral prove facility, or be used with a separate
                proving unit.
              </span>
            </li>
          </ul>
        </div>
        <h3 className="mt-6 mb-2 text-base font-semibold text-white">
          Matching the CAT rating to where you are working
        </h3>
        <p>
          The measurement category tells you how close to the supply origin an instrument and its
          leads can safely be used. The closer to the origin, the larger the transient overvoltage
          the equipment has to survive.
        </p>
        <div className={tableShellCn}>
          <table className="w-full min-w-[560px] border-collapse text-left">
            <caption className="sr-only">
              Measurement category ratings and where each applies
            </caption>
            <thead>
              <tr className="border-b border-white/[0.14]">
                <th scope="col" className={thCn}>
                  CAT rating
                </th>
                <th scope="col" className={thCn}>
                  Where it applies
                </th>
                <th scope="col" className={thCn}>
                  Typical use
                </th>
              </tr>
            </thead>
            <tbody>
              {catRows.map((row) => (
                <tr key={row.cat} className="border-b border-white/[0.08] last:border-b-0">
                  <th scope="row" className={`${tdCn} whitespace-nowrap font-bold`}>
                    {row.cat}
                  </th>
                  <td className={tdCn}>{row.where}</td>
                  <td className={tdCn}>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm leading-relaxed text-white">
          For most fixed installation work a CAT III 1000&nbsp;V or CAT IV 600&nbsp;V instrument with
          matching leads is appropriate. The whole set-up carries the rating — instrument, leads and
          probes — and the lowest-rated component sets the safe limit. BS 7671 applies the same logic
          to the installation itself: Regulation 537.2.3 requires devices for isolation to be
          designed for overvoltage category III or IV.
        </p>
      </>
    ),
  },
  {
    id: 'procedure',
    heading: 'Safe Isolation Procedure: 6 Steps',
    content: (
      <>
        <p>
          The sequence must not be shortened or reordered. It rests on one principle: the voltage
          indicator has to be shown to be working, both before and after it is used to declare a
          circuit dead.
        </p>
        <div className={cardCn}>
          <ol className="space-y-5 text-white">
            {procedureSteps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-elec-yellow text-sm font-bold text-black">
                  {i + 1}
                </span>
                <div>
                  <strong>{step.title}</strong>
                  <p className="mt-1 text-sm leading-relaxed text-white">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <p>
          Work can now proceed. The locking device and warning notice stay in place until the work is
          finished and the circuit is ready to be re-energised — and it is re-energised by the person
          who isolated it, after checking nobody is still working on it.
        </p>
      </>
    ),
  },
  {
    id: 'key-references',
    heading: 'Key References for Safe Isolation',
    content: (
      <>
        <p>
          Safe isolation sits across statutory law, HSE guidance and the BS 7671 ecosystem. No single
          document holds all of it — BS 7671 itself does not set out a safe isolation procedure at
          all. These are the documents that do.
        </p>
        <div className={cardCn}>
          <ul className="space-y-5 text-white">
            <li>
              <strong>Electricity at Work Regulations 1989 — Regulations 12, 13 and 4(4)</strong>
              <p className="mt-1 text-sm leading-relaxed text-white">
                The statutory foundation. Regulation 12 requires suitable means for cutting off the
                supply and for isolation, and defines isolation as a secure disconnection and
                separation. Regulation 13 requires precautions to stop dead equipment becoming live
                during work. Regulation 4(4) requires the protective equipment you use — including
                test instruments — to be suitable, maintained and properly used.
              </p>
            </li>
            <li>
              <strong>
                HSE Guidance Note GS38 — Electrical test equipment for use by electricians
              </strong>
              <p className="mt-1 text-sm leading-relaxed text-white">
                The HSE&rsquo;s practical account of suitable test equipment: measurement category,
                fusing, insulated probes, shrouded connectors and the means of proving the indicator.
                Guidance, not law, but the reference point against which your kit will be judged.
              </p>
            </li>
            <li>
              <strong>HSE HSG85 — Electricity at work: Safe working practices</strong>
              <p className="mt-1 text-sm leading-relaxed text-white">
                The HSE&rsquo;s detailed guidance on safe electrical working, including the key
                principles of the working dead procedure. It also places responsibility on managers
                to establish a system of rules and procedures wherever electrical work is carried
                out — a duty that stays with the premises management even when contractors are
                engaged. Free to download from the HSE.
              </p>
            </li>
            <li>
              <strong>IET On-Site Guide — Appendix M, &lsquo;Safe working practices&rsquo;</strong>
              <p className="mt-1 text-sm leading-relaxed text-white">
                Appendix M is where the On-Site Guide puts its safe isolation guidance, reproducing
                the key principles of the working dead procedure from HSG85 and stressing that
                modern installations may have more than one source of supply. The Guide&rsquo;s
                requirements for the isolation devices themselves sit separately at Section 5.1.
              </p>
            </li>
            <li>
              <strong>IET Guidance Note 3 — Regulation 1.1</strong>
              <p className="mt-1 text-sm leading-relaxed text-white">
                For inspection and testing: where testing does not require the equipment or part of
                an installation to be live, the installation or part shall be made dead and safely
                isolated before the test is performed. Guidance Note 3 also requires the absence of
                voltage to be verified after isolation, and the GS38 procedures to be observed.
              </p>
            </li>
            <li>
              <strong>Electrical Safety First — Best Practice Guide 2</strong>
              <p className="mt-1 text-sm leading-relaxed text-white">
                Guidance on the management of electrical safety and safe isolation procedures for low
                voltage installations. Referenced by both the On-Site Guide and Guidance Note 3 as
                recognised best practice, and free to download.
              </p>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'test-instruments',
    heading: 'Test Instruments in Practice',
    content: (
      <>
        <p>
          Choosing the right instruments is not just about compliance. Substandard test leads are one
          of the most common causes of electrical accidents in the trade — and Guidance Note 3
          requires the condition of probes and leads to be checked before any live test.
        </p>
        <div className={cardCn}>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
              <span>
                <strong>Check the CAT rating on the leads, not just the instrument</strong> — a CAT
                IV meter on unrated leads is a CAT-nothing set-up. The lowest-rated component in the
                chain sets the limit. Replace any lead that does not display a rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
              <span>
                <strong>Inspect leads before every use</strong> — cracked insulation, exposed
                conductor near the probe or connector, a blown fuse in the probe body, a bent or
                loose tip. Damaged leads are replaced, not taped up.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
              <span>
                <strong>Carry a proving unit</strong> — it removes any dependence on finding a
                convenient adjacent live source, and it is the only way to complete the final prove
                once everything nearby has been isolated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
              <span>
                <strong>Ask whether the live test is needed at all</strong> — Guidance Note 3 asks
                the inspector to consider, in each case, whether a particular live test is necessary
                before undertaking it. The safest live test is the one you did not need to do.
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
          Proving dead — confirming a circuit is not live at the point of work — is the step that
          everything else exists to support. An approved two-pole voltage indicator is the correct
          instrument for it. A multimeter can be a secondary check, but not the primary one.
        </p>
        <div className={tableShellCn}>
          <table className="w-full min-w-[620px] border-collapse text-left">
            <caption className="sr-only">
              Two-pole voltage indicator compared with a multimeter for proving dead
            </caption>
            <thead>
              <tr className="border-b border-white/[0.14]">
                <th scope="col" className={thCn}>
                  Factor
                </th>
                <th scope="col" className={thCn}>
                  Two-pole voltage indicator
                </th>
                <th scope="col" className={thCn}>
                  Multimeter
                </th>
              </tr>
            </thead>
            <tbody>
              {instrumentRows.map((row) => (
                <tr key={row.factor} className="border-b border-white/[0.08] last:border-b-0">
                  <th scope="row" className={`${tdCn} font-semibold`}>
                    {row.factor}
                  </th>
                  <td className={`${tdCn} text-green-300`}>{row.vi}</td>
                  <td className={tdCn}>{row.mm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The two failure modes to understand are the reason for the preference. A multimeter on the
          voltage range has an input impedance of around 10 megohms, high enough that capacitive
          coupling from adjacent cables can produce a readable voltage on a conductor that is
          genuinely dead — which trains people to distrust a real warning. And an auto-ranging meter
          takes a moment to settle, so a reading taken immediately after the probes land can be
          wrong. A two-pole indicator has a lower impedance, no range to select and a clear go /
          no-go indication.
        </p>
        <h3 className="mt-6 mb-2 text-base font-semibold text-white">
          Test every conductor combination
        </h3>
        <div className={cardCn}>
          <p className="mb-3 text-sm leading-relaxed text-white">
            At the point of work, one test is not enough. For a single-phase circuit with line,
            neutral and earth, test all three combinations:
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {['Line to neutral', 'Line to earth', 'Neutral to earth'].map((combo) => (
              <div
                key={combo}
                className="rounded-xl border border-white/[0.14] bg-black/30 px-3 py-3 text-center text-sm font-semibold text-white"
              >
                {combo}
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white">
            Any indication on any combination means the circuit is not dead — stop and investigate.
            Borrowed neutrals, shared CPCs and second supplies all leave conductors live with the
            controlling device off. BS 7671 Regulation 537.1.2 requires a durable warning notice
            wherever an item of equipment or enclosure contains live parts connected to more than one
            supply; on an unfamiliar installation, do not assume that notice was ever fitted.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'locking-off',
    heading: 'Locking Off and Warning Notices',
    content: (
      <>
        <p>
          Once the circuit is isolated, the isolation point has to be secured. Switching the MCB off
          is not enough — someone else can switch it back on without knowing anyone is working.
          Regulation 12(2) of the EAW Regulations builds security into the definition of isolation,
          and BS 7671 Regulation 462.3 requires devices for isolation to be designed or installed so
          as to prevent unintentional or inadvertent closure.
        </p>
        <div className={tableShellCn}>
          <table className="w-full min-w-[520px] border-collapse text-left">
            <caption className="sr-only">Securing methods and what each suits</caption>
            <thead>
              <tr className="border-b border-white/[0.14]">
                <th scope="col" className={thCn}>
                  Method
                </th>
                <th scope="col" className={thCn}>
                  Best suited to
                </th>
              </tr>
            </thead>
            <tbody>
              {lockOffRows.map((row) => (
                <tr key={row.method} className="border-b border-white/[0.08] last:border-b-0">
                  <th scope="row" className={`${tdCn} font-semibold`}>
                    {row.method}
                  </th>
                  <td className={tdCn}>{row.suited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mt-6 mb-2 text-base font-semibold text-white">
          The warning notice is not optional decoration
        </h3>
        <p>
          A notice — &lsquo;Do not switch on, work in progress&rsquo;, with your name on it — goes on
          the board alongside whatever physical device you have fitted, every time. It tells the next
          person what is happening and who owns the isolation.
        </p>
        <p>
          BS 7671 requires notices in its own right, too. Regulation 514.11.1 requires a durable
          warning notice in each position where there are live parts that cannot be isolated by a
          single device, indicating the location of each disconnector. Regulation 537.1.2 requires a
          warning notice wherever an installation, item of equipment or enclosure contains live parts
          connected to more than one supply, positioned so that anyone about to gain access is warned
          of the need to isolate every supply. Those notices are your first clue that a board is not
          as simple as it looks.
        </p>
      </>
    ),
  },
  {
    id: 'bs7671-isolation',
    heading: 'How BS 7671 Supports Safe Isolation',
    content: (
      <>
        <p>
          The duty to isolate comes from the EAW Regulations; BS 7671 makes sure the means of
          isolation you rely on exists, is fit for the job and can be secured. BS 7671 defines
          isolation as the function intended to make dead, for reasons of safety, all or a discrete
          section of the installation by separating it from every source of electrical energy —
          wording that lines up closely with Regulation 12(2). Chapter 46 and Section 537 set out
          where isolation devices go and how they must behave.
        </p>
        <div className={tableShellCn}>
          <table className="w-full min-w-[600px] border-collapse text-left">
            <caption className="sr-only">
              BS 7671 regulations relevant to isolation and lock-off
            </caption>
            <thead>
              <tr className="border-b border-white/[0.14]">
                <th scope="col" className={thCn}>
                  Regulation
                </th>
                <th scope="col" className={thCn}>
                  Requirement
                </th>
              </tr>
            </thead>
            <tbody>
              {bs7671Rows.map((row) => (
                <tr key={row.reg} className="border-b border-white/[0.08] last:border-b-0">
                  <th scope="row" className={`${tdCn} whitespace-nowrap font-bold`}>
                    {row.reg}
                  </th>
                  <td className={`${tdCn} leading-relaxed`}>{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mt-6 mb-2 text-base font-semibold text-white">
          Not every switch is a device for isolation
        </h3>
        <p>
          Section 537 sets the device-level requirements, and Table 537.4 — &lsquo;Guidance on the
          selection of protective, isolation and switching devices&rsquo; — is the lookup that tells
          you which device does which job, against which product standard. Two points from it are
          worth carrying around. A device only counts as suitable for isolation where it is marked
          with the symbol for isolation, IEC 60617 identity number S00288. And on a TT or IT system,
          isolation requires disconnection of all the live conductors, neutral included — the
          single-pole allowance in Regulation 461.2 is a TN-S and TN-C-S concession, not a general
          one.
        </p>
        <p>
          The requirements do not stop at selection. Regulation 537.2.7 requires every isolating
          device to be clearly identified, by position or durable marking, to show what it isolates —
          which is exactly the circuit identification Regulation 12 of the EAW Regulations calls for,
          and the reason an unlabelled board is a safe isolation problem as well as a paperwork one.
        </p>
        <h3 className="mt-6 mb-2 text-base font-semibold text-white">
          Isolation during inspection and testing
        </h3>
        <p>
          Part 6 assumes dead working as the default. Regulation 642.1 states that inspection shall
          precede testing and shall normally be done with that part of the installation under
          inspection disconnected from the supply, and Regulation 641.4 requires precautions to be
          taken to avoid danger to persons and livestock, and damage to property and installed
          equipment, during inspection and testing. Guidance Note 3 puts the same duty in procedural
          terms at Regulation 1.1.
        </p>
        <p className="text-sm leading-relaxed text-white">
          Recording the isolation and the instruments used is part of completing an{' '}
          <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>. For the wider
          inspection workflow, see the{' '}
          <SEOInternalLink href="/inspection-testing-course">
            inspection and testing course
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'complex-isolations',
    heading: 'Complex Isolations and Multi-Lock Hasps',
    content: (
      <>
        <p>
          On larger commercial and industrial installations, where several operatives work on the
          same plant, isolation needs a structure around it: multi-lock hasps and a permit to work.
          The On-Site Guide makes the same point for modern domestic and small commercial work — an
          installation with solar PV, battery storage or a generator may have more than one source of
          supply, and isolating the incoming supply does not necessarily make the installation dead.
        </p>
        <div className={cardCn}>
          <ul className="space-y-5 text-white">
            <li>
              <strong>Multi-lock hasp</strong>
              <p className="mt-1 text-sm leading-relaxed text-white">
                A steel bar with multiple padlock holes, fitted to the isolation point. Every
                operative working on the circuit fits their own padlock and keeps their own key. The
                isolation cannot be released until the last lock comes off, so no one person can
                re-energise the circuit while anybody else is still working.
              </p>
            </li>
            <li>
              <strong>Permit to work</strong>
              <p className="mt-1 text-sm leading-relaxed text-white">
                A formal document identifying the equipment, the isolation points that have been
                locked off, the people authorised to do the work and the precautions in place, signed
                by the issuer and by the person receiving it. Required for high voltage work and
                standard practice for complex low voltage work on large installations.
              </p>
            </li>
            <li>
              <strong>Multiple supplies</strong>
              <p className="mt-1 text-sm leading-relaxed text-white">
                Where an installation, item of equipment or enclosure contains live parts connected
                to more than one supply, BS 7671 Regulation 537.1.2 requires a durable warning notice
                so that anyone gaining access is warned of the need to isolate every supply, unless
                an interlocking arrangement isolates all the circuits together. Prove dead after
                isolating each source, not after the first.
              </p>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Issue method statements and risk assessments on site"
          description="Elec-Mate's AI health and safety tools can generate method statements and risk assessments for complex electrical work…"
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
          Safe isolation happens on every job, every time. There is no exemption for a quick job, and
          a circuit is not dead because a switch is off — the switch may be the wrong one, the
          circuit may be fed from two places, or there may be a borrowed neutral. Prove it dead
          before you touch it.
        </p>
        <div className="my-5 space-y-4">
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <h4 className="mb-2 font-bold text-white">Essential kit for safe isolation</h4>
            <ul className="space-y-1 text-sm text-white">
              <li>GS38-compliant two-pole voltage indicator</li>
              <li>Proving unit, so the indicator can be proved anywhere</li>
              <li>GS38-compliant test leads rated CAT III or CAT IV</li>
              <li>MCB lock-off devices — carry several, in more than one pattern</li>
              <li>Padlocks with your own keys</li>
              <li>Warning notices (&lsquo;Do not switch on&rsquo;) and a marker pen</li>
              <li>Multi-lock hasp for multi-operative jobs</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-5">
            <h4 className="mb-2 font-bold text-white">Record the instruments in your certificate</h4>
            <p className="text-sm leading-relaxed text-white">
              The <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> and{' '}
              <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> both include
              sections for the test instruments used. Complete them — they are the record that
              suitable, GS38-compliant equipment was used on that job, on that date, and Regulation
              4(4) of the EAW Regulations puts the burden of showing suitability on you.
            </p>
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
      title="6 Step Safe Isolation Procedure: GS38"
      description="The 6 step safe isolation sequence for UK electrical work: prove-isolate-secure-prove, GS38 test instrument rules and lock-off methods."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
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
      answerBox={{
        question: 'What is the safe isolation procedure for electricians?',
        answer:
          'Safe isolation follows a prove-isolate-secure-prove sequence: identify the circuit, prove your GS38 voltage indicator works on a known live source, switch off and isolate, secure the isolation point with a lock or by removing the fuse, prove dead at the point of work testing all conductor combinations, then re-prove the indicator still works. It is a legal duty under Regulations 12 and 13 of the Electricity at Work Regulations 1989.',
      }}
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
