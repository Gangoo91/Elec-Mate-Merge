import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  Zap,
  ClipboardCheck,
  FileCheck2,
  HardHat,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Health & Safety', href: '/guides/electrical-safety-guide' },
  { label: 'Lockout Tagout Guide', href: '/lockout-tagout-guide' },
];

const tocItems = [
  { id: 'legal-basis', label: 'Legal Basis' },
  { id: 'safe-isolation', label: 'Safe Isolation Procedure' },
  { id: 'proving-dead', label: 'Proving Dead — Test Before Touch' },
  { id: 'loto-devices', label: 'LOTO Device Types' },
  { id: 'permit-to-work', label: 'Permit to Work Systems' },
  { id: 'multi-trade', label: 'Multi-Trade Isolation' },
  { id: 'isolation-points', label: 'Identifying Isolation Points' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electricity at Work Regulations 1989 (Regulation 12) require that every electrical circuit be capable of being made dead before work begins. Failure to isolate before working on electrical systems is one of the most common causes of fatal accidents in the UK electrical industry.',
  'Safe isolation follows a defined sequence: identify the correct isolation point, isolate, apply lockout/tagout devices, prove dead with a calibrated voltage indicator, prove the voltage indicator works on a known live source, then confirm dead — this is the "test before touch" principle.',
  'A voltage indicator alone is not sufficient proof. The approved voltage indicator must be proved on a known live source before and after testing. Many electricians use a proving unit (such as the Fluke PRV240 or Kewtech KT230) to prove the indicator.',
  'Lockout tagout (LOTO) devices include padlocks, hasp-and-staple devices, MCB lockouts, plug lockouts, fuse lockout boxes, and lockout stations. Each person working on an isolated circuit must apply their own personal padlock.',
  'Permit to work (PTW) systems provide a formal, documented authorisation for high-risk electrical work. They are mandatory on many industrial sites and are required under the Electricity at Work Regulations 1989 for work near live systems.',
];

const faqs = [
  {
    question: 'What does the Electricity at Work Regulations 1989 say about isolation?',
    answer:
      'Regulation 12 of the Electricity at Work Regulations 1989 requires that where necessary to prevent danger, suitable means shall be available to cut off the supply of electrical energy to any electrical equipment. Regulation 13 requires that adequate precautions be taken to prevent electrical equipment, which has been made dead in order to prevent danger while work is carried out on or near that equipment, from becoming electrically charged during that work. These regulations apply to all workplaces in Great Britain and impose duties on both employers and employees.',
  },
  {
    question: 'What is the correct safe isolation procedure for a domestic consumer unit?',
    answer:
      'The approved sequence is: (1) Identify the correct circuit breaker or fuse for the circuit to be worked on. (2) Switch off the breaker or remove the fuse. (3) Apply a MCB lockout clip and your personal padlock, or place the fuse in your pocket. (4) Prove your approved voltage indicator (AVI) on a known live source. (5) Test the circuit at the point of work — between L-E, L-N, and N-E. (6) Prove the AVI again on the known live source. All six tests must read zero volts or the installation is not dead. Only then is it safe to begin work.',
  },
  {
    question: 'What voltage indicator should I use for safe isolation?',
    answer:
      'You must use an approved voltage indicator (AVI) that complies with GS38 — the Health and Safety Executive guidance note on test equipment for electricians. A compliant AVI will have: fused test leads with shrouded probes, finger barriers or adequately shrouded tips, leads rated for the voltage being tested, and a clear indication of live/dead status. Common compliant AVIs include the Fluke 1AC-A1-II, Martindale VP1, and Kewtech KT100. A multimeter alone is not an approved voltage indicator for safe isolation purposes in the UK.',
  },
  {
    question: 'What is the difference between lockout and tagout?',
    answer:
      'Lockout involves physically locking an isolation device in the off position with a padlock so that the circuit cannot be re-energised without the key. Tagout involves attaching a warning tag to the isolation device, but without a physical lock. UK electrical safety guidance strongly prefers lockout over tagout wherever the isolation point accepts a lock. Tagout alone is only acceptable where the isolation point cannot physically be locked — and even then, additional precautions must be taken. The HSE and UK industry best practice require personal padlocks so that each worker controls their own safety.',
  },
  {
    question: 'When is a permit to work required?',
    answer:
      'A permit to work (PTW) is required whenever the consequences of an error in isolation could be catastrophic — for example, on high-voltage systems, in confined spaces with electrical equipment, on process plant where re-energisation could cause injury to multiple people, or on any system where more than one trade is working simultaneously. Many industrial and commercial clients specify PTW systems for all electrical work regardless of voltage. The permit defines the scope of work, confirms that isolation is complete, specifies safety precautions, and must be signed off by an authorised person before work begins and when it is complete.',
  },
  {
    question: 'What happens when multiple trades are working on the same isolated system?',
    answer:
      'Each person working on an isolated circuit must apply their own personal padlock to the isolation device using a multi-lock hasp. This hasp (also called a hasp-and-staple device) accepts multiple padlocks so that the circuit cannot be re-energised until every worker has removed their padlock. The last padlock is removed by the authorising person when work is complete and all workers have confirmed they are clear. This system ensures that no single person can inadvertently restore power while others are still working.',
  },
  {
    question: 'Can I work live if isolation is not possible?',
    answer:
      'Live working is only permitted in exceptional circumstances under the Electricity at Work Regulations 1989 (Regulation 14). To work live, it must be unreasonable in all the circumstances for the conductor to be dead, and suitable precautions must be taken to prevent injury. Live working requires specific employer authorisation, risk assessment, use of insulated tools complying with IEC 60900, appropriate PPE (insulated gloves, face shield), a second competent person present, and a rescue plan. Live working is not a routine alternative to safe isolation — it should be the last resort.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrical-rescue-procedure',
    title: 'Electrical Rescue Procedure',
    description: 'What to do if someone receives an electric shock — safe isolation, 999, CPR.',
    icon: AlertTriangle,
    category: 'Safety',
  },
  {
    href: '/insulated-tools-guide',
    title: 'Insulated Tools Guide',
    description: 'IEC 60900 rated tools for electricians — when they are required and what to buy.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/confined-space-electrical',
    title: 'Confined Space Electrical Work',
    description:
      'Safety requirements for electrical work in confined spaces under the 1997 Regulations.',
    icon: HardHat,
    category: 'Safety',
  },
  {
    href: '/guides/electrical-safety-guide',
    title: 'Electrical Safety Guide',
    description: 'Complete UK electrical safety reference for qualified electricians.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/rams',
    title: 'RAMS Generator',
    description: 'Generate site-specific risk assessments and method statements instantly.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'legal-basis',
    heading: 'Legal Basis — Electricity at Work Regulations 1989',
    content: (
      <>
        <p>
          The Electricity at Work Regulations 1989 are the primary legislation governing safe
          isolation in the UK. They impose absolute duties on both employers and employees — there
          are no qualifications such as "so far as is reasonably practicable" in many of the key
          regulations.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 12 — Means for cutting off the supply and for isolation</strong>{' '}
                — where necessary to prevent danger, suitable means shall be available to cut off
                the supply of electrical energy to any electrical equipment. Every isolation point
                must be identified and capable of being made dead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 13 — Precautions for work on equipment made dead</strong> —
                adequate precautions must be taken to prevent electrical equipment that has been
                made dead from becoming electrically charged during the work. This is the legal
                foundation for lockout tagout procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 14 — Work on or near live conductors</strong> — no person shall
                work on or near a live conductor (other than one suitably insulated) unless it is
                unreasonable in all the circumstances for it to be dead, suitable precautions are
                taken, and it is reasonable in all the circumstances to work on or near it live.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Breach is a criminal offence</strong> — failure to comply with the
                Electricity at Work Regulations 1989 is a criminal offence under the Health and
                Safety at Work etc. Act 1974. Convictions can result in unlimited fines and
                imprisonment for up to two years.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The HSE publication HSG85 (Electricity at Work — Safe Working Practices) provides detailed
          guidance on implementing the regulations. It is freely available from the HSE website and
          should be on every electrical contractor's bookshelf.
        </p>
      </>
    ),
  },
  {
    id: 'safe-isolation',
    heading: 'Safe Isolation Procedure — Step by Step',
    content: (
      <>
        <p>
          Safe isolation is a defined sequence of steps that must be followed every time before
          working on an electrical circuit. Skipping any step — even once — can be fatal.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">
                1
              </span>
              <span>
                <strong>Identify the circuit</strong> — confirm which circuit serves the equipment
                to be worked on. Check the distribution board schedule. Test with an approved
                voltage indicator at the point of work to confirm which circuit is which before
                isolating. Never assume the schedule is accurate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">
                2
              </span>
              <span>
                <strong>Isolate</strong> — switch off the MCB, withdraw the fuse, or operate the
                isolator. Confirm the device is in the off or open position visually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">
                3
              </span>
              <span>
                <strong>Secure the isolation point</strong> — apply your MCB lockout clip and
                personal padlock, or place the fuse in your personal possession. Attach a warning
                tag stating your name, the date, and the work being carried out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">
                4
              </span>
              <span>
                <strong>Prove the voltage indicator on a known live source</strong> — before testing
                the isolated circuit, confirm your approved voltage indicator (AVI) is working
                correctly by testing it on a known live supply or proving unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">
                5
              </span>
              <span>
                <strong>Test the circuit — prove dead</strong> — at the point of work, test between
                all conductors: L-E, L-N, and N-E. All must read zero volts. On three-phase systems,
                test all combinations: L1-L2, L2-L3, L3-L1, L1-E, L2-E, L3-E, N-E.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">
                6
              </span>
              <span>
                <strong>Prove the voltage indicator again on the known live source</strong> —
                confirm the AVI is still working after testing the isolated circuit. Only when this
                final check passes can you be confident the circuit is dead.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This six-step sequence is sometimes called the "prove-test-prove" method. It is the
          approved UK method for safe isolation and is endorsed by the HSE, NICEIC, and industry
          training bodies.
        </p>
      </>
    ),
  },
  {
    id: 'proving-dead',
    heading: 'Proving Dead — Test Before Touch',
    content: (
      <>
        <p>
          "Test before touch" is the fundamental principle of electrical safe isolation. It means
          you must prove that a circuit is dead before touching any conductors — even if you
          isolated it yourself. Never assume a circuit is dead; always test.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>GS38 compliant voltage indicator</strong> — the HSE guidance note GS38
                specifies the requirements for electrical test equipment used by electricians. Your
                approved voltage indicator (AVI) must have adequately rated and fused test leads,
                finger barriers or shrouded probes, and a clear live/dead indication.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a proving unit</strong> — a proving unit (such as the Fluke PRV240,
                Kewtech KT230, or Martindale PD690) generates a known safe voltage that can be used
                to prove your AVI is functioning correctly both before and after testing the
                isolated circuit. This eliminates the risk of using a faulty indicator.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-pole indicators are not sufficient</strong> — testing only line to
                earth is not adequate. You must test all combinations of conductors at the point of
                work. Some circuits have capacitive stored charge or parallel feeds that can
                re-energise a circuit after isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Discharge capacitors</strong> — capacitors in motor starters, VSD drives,
                and power factor correction equipment can retain a dangerous charge for several
                minutes after isolation. Follow manufacturer discharge procedures before working on
                this equipment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The proven dead state only applies at the time of testing and at the point of work. If you
          move to a different part of the circuit, or if time passes, you must test again before
          touching conductors.
        </p>
      </>
    ),
  },
  {
    id: 'loto-devices',
    heading: 'LOTO Device Types — Padlocks, Hasps, and Lockout Stations',
    content: (
      <>
        <p>
          Lockout tagout devices physically prevent an isolation point from being re-energised while
          work is in progress. Selecting the correct device for each type of isolation point is
          essential.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Personal padlocks</strong> — each worker must have their own padlock with a
                unique key. Safety padlocks are typically brightly coloured and have a non-
                conductive shackle. Each person retains their key for the duration of the work.
                Common brands include Master Lock, ABUS, and Brady.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-lock hasps (hasp-and-staple devices)</strong> — a hasp accepts
                multiple padlocks simultaneously. It is applied to the isolation point and each
                worker applies their own padlock. The circuit cannot be re-energised until all
                padlocks are removed. Essential for multi-trade working.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB lockout clips</strong> — snap-on devices that fit over a miniature
                circuit breaker in the off position and accept a padlock shackle. Available for most
                common MCB profiles including DIN-rail types. A padlock must also be applied — the
                clip alone is not lockout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plug lockouts</strong> — lockout devices that encase a plug so that it
                cannot be inserted into a socket. Used when the isolation point is a plug and socket
                rather than a fixed device. Available for 13A, industrial (BS EN 60309), and CEE
                plug types.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fuse lockout boxes</strong> — a box that retains a withdrawn fuse and
                accepts a padlock. Prevents the fuse from being re-inserted until the box is
                unlocked. Used where fuse withdrawal is the method of isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lockout stations</strong> — shadow boards or cabinets mounted near high-
                risk equipment containing all required LOTO devices, padlocks, tags, and permit
                documentation. Required on industrial sites where multiple isolation points are
                managed simultaneously.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Warning tags (danger tags) must accompany lockout devices. They should state the reason
          for isolation, the name of the person who applied the lock, and the date. Tags alone
          without a physical lock do not constitute lockout.
        </p>
      </>
    ),
  },
  {
    id: 'permit-to-work',
    heading: 'Permit to Work Systems',
    content: (
      <>
        <p>
          A permit to work (PTW) is a formal documented system for controlling high-risk electrical
          work. It provides a written authorisation from a responsible person that the equipment has
          been isolated, tested dead, and is safe to work on.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>When PTW is required</strong> — high-voltage systems (above 1,000V AC), work
                in confined spaces with electrical equipment, complex industrial plant, any
                situation where multiple trades share the same isolation, and wherever the client's
                safety management system requires it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Authorised person (AP)</strong> — the AP is responsible for issuing the PTW.
                They must be competent to understand the electrical hazards and confirm that
                isolation is complete. The AP countersigns the permit when work is complete and
                authorises re-energisation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permit contents</strong> — scope of work, equipment identification,
                isolation method and points, tests carried out and results, additional precautions
                (earthing, barriers, PPE), names of all workers covered by the permit, duration of
                validity, and sign-off procedures.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cancellation and reinstatement</strong> — a PTW must be formally cancelled
                before equipment is re-energised. If work is interrupted (end of shift, emergency),
                the permit must be suspended and a new permit issued when work resumes. Equipment
                must be re-tested before work recommences even under a reinstated permit.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Generate RAMS and permit documentation with Elec-Mate"
          description="Elec-Mate's AI RAMS generator creates site-specific risk assessments and method statements for electrical work including safe isolation procedures. Compliant with UK health and safety regulations. 7-day free trial."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'multi-trade',
    heading: 'Multi-Trade Isolation',
    content: (
      <>
        <p>
          When multiple trades or individuals work on the same isolated system simultaneously, each
          person must independently control their own safety. The multi-lock hasp system is the
          approved UK method for managing this.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Each worker applies their own padlock</strong> — after the authorising
                person has confirmed isolation and applied the first lock, each additional worker
                applies their own personal padlock to the hasp. No single person can remove all
                locks — including the authorising person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shift handover</strong> — when shifts change, the outgoing worker removes
                their padlock and the incoming worker applies theirs. There must be no period when
                the isolation point has no lock applied during the handover.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lost key procedure</strong> — if a worker loses their padlock key, a
                documented emergency procedure must be followed. This typically involves confirming
                the worker is clear of the circuit, cutting the lock under supervision of the
                authorising person, and recording the incident. Never remove someone else's padlock
                without following this procedure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contractors on site</strong> — visiting contractors must apply their own
                padlocks to any LOTO device before starting work. Do not rely on the host site's
                isolation alone. The host should issue a PTW confirming isolation, and the
                contractor applies their personal lock as additional protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'isolation-points',
    heading: 'Identifying Isolation Points',
    content: (
      <>
        <p>
          Before any electrical work begins, the correct isolation point must be positively
          identified. Isolating the wrong circuit is as dangerous as not isolating at all.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the distribution board schedule</strong> — confirm the circuit
                description matches the equipment to be worked on. Board schedules are often
                inaccurate, particularly in older or modified installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test at the point of work before isolating</strong> — use your AVI to
                confirm the circuit is live at the point of work, then switch off the suspected MCB
                and confirm the circuit goes dead at the point of work. This positively identifies
                the correct isolation device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Parallel feeds and sub-distribution</strong> — in complex installations, a
                piece of equipment may be fed from more than one source. Check for sub-boards, local
                isolators, and UPS systems. Test the equipment terminals for voltage after isolating
                at the main board before assuming it is dead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Buried and concealed cables</strong> — when chasing walls or cutting into
                floors, use a cable detection device before starting. Cables do not always follow
                expected routes, particularly in older buildings.{' '}
                <SEOInternalLink href="/guides/electrical-safety-guide">
                  Consult the full electrical safety guide
                </SEOInternalLink>{' '}
                for detection device guidance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: RAMS and Safe Isolation Documentation',
    content: (
      <>
        <p>
          Documenting safe isolation procedures in your RAMS (Risk Assessment and Method Statement)
          protects you legally and demonstrates to clients that you operate to the highest
          professional standards. It is also a requirement under the Construction (Design and
          Management) Regulations 2015 for notifiable projects.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Generate Safe Isolation RAMS Instantly</h4>
              <p className="text-white text-sm leading-relaxed">
                Use the{' '}
                <SEOInternalLink href="/tools/rams">Elec-Mate RAMS generator</SEOInternalLink> to
                create site-specific risk assessments and method statements for electrical work
                including safe isolation procedures, permit to work requirements, and multi-trade
                coordination. Compliant with UK health and safety regulations and ready to share
                with clients in minutes.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional RAMS and H&S documentation with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site risk assessments, method statements, and health and safety documentation. AI-generated, site-specific, and ready in minutes. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LockoutTagoutGuidePage() {
  return (
    <GuideTemplate
      title="Lockout Tagout (LOTO) Guide UK | Electrical Isolation Procedures"
      description="Complete UK guide to lockout tagout (LOTO) and safe isolation procedures for electrical systems. Electricity at Work Regulations 1989, prove dead procedures, LOTO device types, permit to work, and multi-trade isolation."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Lock}
      heroTitle={
        <>
          Lockout Tagout (LOTO) Guide UK:{' '}
          <span className="text-yellow-400">Safe Electrical Isolation</span>
        </>
      }
      heroSubtitle="The complete UK guide to lockout tagout and safe isolation procedures. Covers the Electricity at Work Regulations 1989, the prove-dead sequence, LOTO device types, permit to work systems, and multi-trade isolation — everything qualified electricians need to work safely."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Lockout Tagout and Safe Isolation"
      relatedPages={relatedPages}
      ctaHeading="Generate RAMS and Safe Isolation Documentation"
      ctaSubheading="Elec-Mate's AI RAMS generator creates site-specific risk assessments and method statements for electrical work including LOTO procedures. Compliant with UK regulations. 7-day free trial."
    />
  );
}
