/**
 * MOET · Module 1 · Section 1.1 · Subsection 3 — Lock-Out / Tag-Out (LOTO)
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Electrical. Electrical isolation and deisolation
 *                 requirements: lockout tagout and testing for dead."
 *              · "Safe systems of work."
 *              · "Work environment hazards and risks. Risk assessments."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
 *   Behaviours · "Prioritise safe working practices."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  Scenario,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Lock-Out / Tag-Out (LOTO) - MOET Module 1.1.3';
const DESCRIPTION =
  'Complete guide to Lock-Out / Tag-Out (LOTO) procedures for electrical engineering maintenance technicians: energy isolation, LOTO equipment, the 6-step procedure, group lockout, HSE/OSHA requirements and common failures.';

const quickCheckQuestions = [
  {
    id: 'loto-purpose',
    question: 'What is the PRIMARY purpose of a Lock-Out / Tag-Out (LOTO) procedure?',
    options: [
      'To provide an auditable record of who isolated the equipment and when',
      'To mark equipment as faulty so that it is not returned to service',
      'To prevent the unexpected release of hazardous energy during maintenance or servicing',
      'To satisfy the insurer following a reportable workplace incident',
    ],
    correctIndex: 2,
    explanation:
      'The primary purpose of LOTO is to prevent the unexpected energisation, start-up, or release of stored energy that could cause injury or death during maintenance, servicing, or repair activities. It is a life-critical control measure, not merely a paperwork exercise.',
  },
  {
    id: 'energy-sources',
    question:
      'Which of the following is an example of stored energy that must be addressed during LOTO?',
    options: [
      'Ambient lighting in the work area',
      'The colour of warning labels on equipment',
      'A compressed spring in a circuit breaker mechanism',
      'The temperature of the surrounding air',
    ],
    correctIndex: 2,
    explanation:
      'A compressed spring — such as the closing mechanism in a circuit breaker — stores mechanical energy that can be released unexpectedly. During LOTO, all forms of stored energy must be identified and controlled, including springs, elevated components (gravitational), charged capacitors (electrical), pressurised systems (hydraulic/pneumatic), and thermal energy.',
  },
  {
    id: 'personal-lock-rule',
    question:
      'Under a LOTO system, who is permitted to remove a personal safety lock from an energy isolating device?',
    options: [
      'Only the person who applied the lock',
      'The shift supervisor at the end of the shift',
      'Any competent person on site',
      'The equipment owner or manufacturer',
    ],
    correctIndex: 0,
    explanation:
      "A fundamental principle of LOTO is that only the person who applied a lock may remove it. This 'one person, one lock, one key' rule ensures that no individual can be exposed to hazardous energy by another person's actions. Emergency removal procedures exist but require senior management authorisation and strict safeguards.",
  },
  {
    id: 'group-lockout',
    question:
      'In a group lockout situation, what device allows multiple workers to secure the same energy isolating point?',
    options: [
      'A multi-lock hasp (scissor hasp)',
      'A circuit breaker lockout clamp',
      'A danger tag signed by every member of the working party',
      'A cable lockout device',
    ],
    correctIndex: 0,
    explanation:
      'A multi-lock hasp (also called a scissor hasp or lockout hasp) is a device that accepts multiple padlocks. Each worker attaches their own personal lock to the hasp, preventing the isolating device from being operated until every individual has removed their lock. The hasp ensures that the isolation cannot be defeated while any worker remains at risk.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Lock-Out / Tag-Out procedures are required to protect workers from:',
    options: [
      'Electric shock only, from the mains electrical supply',
      'The unexpected release of hazardous energy during maintenance or servicing',
      'Slips, trips and falls in the plant room',
      'Exposure to asbestos in older switchrooms',
    ],
    correctAnswer: 1,
    explanation:
      'LOTO specifically protects workers from the unexpected energisation, start-up, or release of stored energy during maintenance, servicing, or repair. Without LOTO, equipment could start unexpectedly, exposing workers to electrical shock, crushing, amputation, or burns.',
  },
  {
    id: 2,
    question: 'Which of the following energy sources must be considered during a LOTO procedure?',
    options: [
      'Electrical energy only, as it is the most dangerous',
      'Electrical and mechanical energy only',
      'Electrical, mechanical, hydraulic, pneumatic, thermal, chemical and gravitational energy',
      'Only the energy sources listed on the equipment nameplate',
    ],
    correctAnswer: 2,
    explanation:
      'LOTO must address ALL forms of hazardous energy, not just electrical. A motor control centre (MCC) may have electrical supply, pneumatic actuators, hydraulic systems, spring-loaded mechanisms, and thermal energy from hot components. Every energy source must be identified, isolated, and verified as de-energised.',
  },
  {
    id: 3,
    question: 'Which of the following is NOT an approved energy isolating device for LOTO?',
    options: [
      'A circuit breaker with a lock-off facility',
      'A switch-disconnector with lockable handle',
      'A manual valve with a lockable handle',
      'A push-button start/stop station',
    ],
    correctAnswer: 3,
    explanation:
      'A push-button start/stop station is a control device, not an energy isolating device. It does not provide a physical break in the energy supply and can be bypassed by control system faults. LOTO must always use true isolating devices that provide a positive, physical disconnection of the energy source — such as switch-disconnectors, circuit breakers, or lockable valves.',
  },
  {
    id: 4,
    question: 'The correct sequence for the six-step LOTO procedure is:',
    options: [
      'Prepare, shut down, isolate, lock out/tag out, verify isolation, perform work',
      'Isolate, lock out/tag out, shut down, prepare, perform work, verify isolation',
      'Shut down, perform work, isolate, verify isolation, lock out/tag out, prepare',
      'Lock out/tag out, isolate, shut down, prepare, verify isolation, perform work',
    ],
    correctAnswer: 0,
    explanation:
      'The six-step LOTO procedure follows a logical sequence: (1) Prepare — identify all energy sources; (2) Shut down — stop the equipment using normal procedures; (3) Isolate — operate energy isolating devices; (4) Lock out/Tag out — apply personal locks and tags; (5) Verify isolation — prove energy sources are de-energised; (6) Perform the work safely.',
  },
  {
    id: 5,
    question: 'A LOTO tag (danger tag) is used to:',
    options: [
      'Replace a padlock when one is not available',
      'Provide a written warning identifying who applied the lockout, why, and when',
      'Authorise the equipment to be returned to service',
      'Indicate that equipment has passed its annual inspection',
    ],
    correctAnswer: 1,
    explanation:
      'LOTO tags are informational warning devices that supplement padlocks. They identify the person who applied the lockout, the date and time, the reason for the lockout, and contact information. Tags alone do not provide physical restraint — they must always be used in conjunction with padlocks, not as a substitute.',
  },
  {
    id: 6,
    question:
      'When performing LOTO on a motor control centre (MCC), which of the following stored energy sources must be specifically addressed?',
    options: [
      'Only the main incoming three-phase supply',
      'The incoming supply and the motor mechanical drive only',
      'Incoming supply, control voltages, capacitor banks, and spring-charged mechanisms',
      'The incoming supply and any pneumatic actuators only',
    ],
    correctAnswer: 2,
    explanation:
      'An MCC presents multiple energy sources: the main incoming supply, separate control voltage supplies (often from a different source), power factor correction capacitor banks (which retain charge after isolation), and spring-charged circuit breaker mechanisms. Each must be individually identified, isolated, and verified as de-energised.',
  },
  {
    id: 7,
    question: 'During a shift changeover, the correct LOTO procedure requires:',
    options: [
      'The outgoing worker removes their lock so the incoming worker can apply theirs',
      'The supervisor removes all locks and re-applies a single master lock',
      'The incoming worker relies on the existing lock until they fit their own later',
      'The incoming worker applies their lock before the outgoing worker removes theirs, maintaining continuous lockout',
    ],
    correctAnswer: 3,
    explanation:
      'Shift changeover is a critical period for LOTO safety. The correct procedure requires the incoming worker to apply their personal lock BEFORE the outgoing worker removes theirs. This ensures continuous lockout protection with no gap in isolation. The equipment is never in an unlocked state during the transition.',
  },
  {
    id: 8,
    question: 'How often should LOTO procedures be formally inspected and reviewed?',
    options: [
      'At least annually, by an authorised person not involved in the procedure being inspected',
      'Only when an incident or near-miss has occurred',
      'Every five years, by the original equipment manufacturer',
      'Monthly, by the person who normally carries out the procedure',
    ],
    correctAnswer: 0,
    explanation:
      'LOTO procedures must be formally inspected at least annually. The inspection should be carried out by an authorised person who is not involved in the procedure being reviewed. The inspection verifies that workers understand and correctly follow the procedure, that equipment is adequate, and that the written procedure matches actual practice.',
  },
  {
    id: 9,
    question:
      'A variable speed drive (VSD) has been isolated at its incoming supply. What additional LOTO consideration is essential?',
    options: [
      'The drive may be worked on immediately once the incoming isolator is locked off',
      'The DC bus capacitors may retain lethal voltage and must be verified as discharged',
      'Only the motor terminal box needs proving dead, since the drive itself is now isolated',
      'The internal discharge resistor guarantees the drive is safe within two seconds',
    ],
    correctAnswer: 1,
    explanation:
      "Variable speed drives contain large DC bus capacitors that can retain lethal voltage (typically 300-800V DC) for several minutes after the supply is isolated. The LOTO procedure must include verification that the DC bus has discharged to a safe level. Many drives have a 'charge' indicator LED — this must be confirmed as extinguished, and a voltage test performed at the DC bus terminals.",
  },
  {
    id: 10,
    question: 'Under the Health and Safety at Work Act 1974, employers must:',
    options: [
      'Allow workers to provide their own padlocks and tags at their own cost',
      'Report every lockout to the HSE within ten days',
      'Provide adequate LOTO equipment, procedures, training and supervision free of charge',
      'Appoint a single nominated person to apply all locks on site',
    ],
    correctAnswer: 2,
    explanation:
      'The HSWA 1974 (Sections 2 and 3) places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare of employees. This includes providing adequate LOTO equipment (locks, hasps, tags, lockout devices), written procedures, competence-based training, and effective supervision — all provided free of charge.',
  },
  {
    id: 11,
    question: 'Which statement about LOTO tags is correct?',
    options: [
      'Tags provide the same level of protection as padlocks',
      'Tags should be used alone when padlocks are not available',
      'Tags are only required for electrical isolation',
      'Tags are supplementary warnings — they must be used with locks, not instead of them',
    ],
    correctAnswer: 3,
    explanation:
      'LOTO tags are supplementary warning devices. They do not provide physical restraint and can be removed by anyone. They must always be used in conjunction with padlocks, not as a substitute. Tags provide critical information (who, what, when, why) but only a padlock provides the physical barrier that prevents operation of the energy isolating device.',
  },
  {
    id: 12,
    question: 'A common cause of LOTO-related fatalities is:',
    options: [
      'Failure to identify and isolate all energy sources, particularly stored energy and alternative supplies',
      'Using a padlock that is too small for the isolating device',
      'Applying more than one lock to a single isolation point',
      'Recording the wrong time on the danger tag',
    ],
    correctAnswer: 0,
    explanation:
      'The most common cause of LOTO fatalities is incomplete energy isolation — typically failing to identify all sources of energy. Stored energy (capacitors, springs, elevated loads), alternative supplies (UPS, generators, solar PV), and interconnected systems are frequently overlooked. A thorough energy survey during the preparation step is essential to preventing these deaths.',
  },
];

const faqs = [
  {
    question: 'What is the difference between lockout and tagout?',
    answer:
      'Lockout is the physical securing of an energy isolating device using a padlock, preventing the device from being operated. Tagout is the attachment of a warning tag providing information about who applied the lockout, when, and why. Lockout provides physical restraint; tagout provides information and warning. Both must be used together — tags alone are never an acceptable substitute for locks.',
  },
  {
    question: 'Can I use a cable tie instead of a padlock for LOTO?',
    answer:
      "No. Cable ties, tape, wire, and similar improvised devices do not provide adequate physical restraint. They can be easily cut, broken, or removed without tools. Only purpose-designed LOTO padlocks with unique keys should be used. These are typically lightweight, brightly coloured (often red or yellow), and engraved or labelled with the owner's identity.",
  },
  {
    question: "What should I do if someone else's lock is on equipment I need to operate?",
    answer:
      "You must never cut, remove, or tamper with another person's lock. Contact the lock owner and request that they remove it when they have confirmed it is safe to do so. If the lock owner cannot be contacted (e.g., they have left site or are absent), a formal emergency lock removal procedure must be followed — this requires senior management authorisation, verification of safety, and documentation.",
  },
  {
    question: "Do I need LOTO for 'quick' jobs that only take a few minutes?",
    answer:
      "Yes, absolutely. There is no time exemption for LOTO. Equipment can start unexpectedly in a fraction of a second — far faster than any human reaction time. Many serious LOTO incidents involve workers who thought the job would 'only take a minute' and did not apply locks. The full LOTO procedure must be followed regardless of the expected duration of the work.",
  },
  {
    question: 'How does LOTO relate to the safe isolation procedure taught in Module 1.1.2?',
    answer:
      'LOTO and safe isolation are complementary procedures. Safe isolation (switch off, isolate, secure, prove dead) addresses the electrical circuit specifically. LOTO extends this to cover ALL energy sources — not just electrical — and adds formal documentation, tagging, and management controls. In practice, the safe isolation procedure for electrical energy is performed as part of the wider LOTO procedure. An electrical maintenance technician must be competent in both.',
  },
];

const MOETModule1Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.1 · Subsection 3"
        title="Lock-Out / Tag-Out (LOTO)"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Controlling hazardous energy through systematic isolation, locking and tagging
            procedures
          </p>

          <TLDR
            points={[
              'LOTO: Prevents unexpected release of hazardous energy during maintenance',
              '7 energy types: Electrical, mechanical, hydraulic, pneumatic, thermal, chemical, gravitational',
              '6 steps: Prepare, shut down, isolate, lock/tag, verify, work',
              'Rule: One person, one lock, one key — only you remove your lock',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Safe isolation',
                gist: 'Identify the source of supply and switch off, isolate, secure with a personal lock and danger notice, prove the voltage indicator on a known live source, test for dead at the point of work, then prove the indicator again. LOTO extends this six-step electrical procedure to every energy source on the equipment.',
                where: '1.1.2',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the purpose and legal basis of Lock-Out / Tag-Out procedures',
              'Identify all seven categories of hazardous energy requiring LOTO',
              'Select appropriate LOTO equipment for different isolation scenarios',
              'Carry out the six-step LOTO procedure from preparation to safe work',
              'Apply group lockout and shift changeover procedures correctly',
              'Recognise common LOTO failures and describe how to prevent them',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What LOTO is and why it matters</ContentEyebrow>

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MCCs:</strong> Multiple energy sources — supply, control, capacitors,
                springs
              </li>
              <li>
                <strong>VSDs:</strong> DC bus capacitors retain lethal voltage after isolation
              </li>
              <li>
                <strong>Switchgear:</strong> Spring-charged mechanisms store mechanical energy
              </li>
              <li>
                <strong>ST1426:</strong> Core competency for maintenance technicians
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Lock-out, tag-out — two actions, one system">
            <p>
              Lock-Out / Tag-Out (LOTO) is a safety procedure used to ensure that equipment is
              properly shut down, isolated from all energy sources, and secured before maintenance,
              servicing, or repair work begins. The &apos;lock-out&apos; element involves applying a
              physical lock to an energy isolating device, preventing it from being operated. The
              &apos;tag-out&apos; element involves attaching a warning tag that identifies who
              applied the lock, when, and why.
            </p>
            <p>
              LOTO procedures are essential because modern industrial and commercial equipment can
              contain multiple forms of hazardous energy — electrical, mechanical, hydraulic,
              pneumatic, thermal, chemical, and gravitational. The unexpected release of any of
              these energy forms during maintenance work can cause serious injury or death. LOTO
              provides a systematic, verifiable method of controlling all energy sources before work
              begins.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The human cost of LOTO failure">
            <p>
              HSE data consistently shows that failure to control hazardous energy is one of the
              leading causes of workplace fatalities in the UK. Across all industries, LOTO-related
              incidents cause significant numbers of deaths and major injuries annually. In the
              electrical sector specifically, failures include electrocution from unexpected
              energisation, burns from arc flash on supposedly isolated switchgear, and injuries
              from machinery restarting during maintenance.
            </p>
            <p>
              The common thread in most incidents is not a lack of equipment or knowledge — it is a
              failure to follow the procedure. Shortcuts, complacency, and time pressure are the
              real killers.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Legal framework for LOTO in the UK"
            onSite="ST1426 link: the Maintenance and Operations Engineering Technician standard requires you to demonstrate competence in energy isolation and LOTO procedures as part of the safe working practices knowledge and skills requirements. This is assessed during your End-Point Assessment."
          >
            <p>
              Unlike the United States, where OSHA 29 CFR 1910.147 provides a specific
              lockout/tagout standard, the UK does not have a single dedicated LOTO regulation.
              Instead, LOTO requirements are derived from several overlapping pieces of legislation:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Legislation</th>
                    <th className="py-2 font-medium text-white">LOTO relevance</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">HSWA 1974, s.2</td>
                    <td className="py-2">
                      General duty to provide safe systems of work and safe plant/equipment
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">EAWR 1989, Regs 12-13</td>
                    <td className="py-2">
                      Duty to work dead; precautions to prevent becoming live during work
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">PUWER 1998, Regs 19-22</td>
                    <td className="py-2">
                      Isolation from energy sources; measures to prevent inadvertent reconnection
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">MHSWR 1999, Reg 3</td>
                    <td className="py-2">
                      Suitable and sufficient risk assessment for all work activities
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">HSG85</td>
                    <td className="py-2">
                      Guidance on safe working practices including isolation and locking off
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">BS 7671:2018+A4:2026</td>
                    <td className="py-2">
                      Section 537 — requirements for isolating and switching devices
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Identifying hazardous energy sources</ContentEyebrow>

          <ConceptBlock
            title="Seven energy types, one thorough survey"
            onSite="Never assume you know all the energy sources from memory alone. Always consult the equipment manual, site documentation, and plant drawings. If in doubt, ask — it is far better to delay the work than to miss a hidden energy source."
          >
            <p>
              The first and most critical step in any LOTO procedure is identifying all sources of
              hazardous energy associated with the equipment. This requires a thorough understanding
              of the equipment&apos;s design, operation, and interconnections. Missing even one
              energy source can be fatal. For electrical maintenance technicians, the challenge is
              that modern equipment often combines multiple energy types in a single system.
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Electrical energy.</strong> Mains supplies (single-phase, three-phase),
                control voltages, battery-backed systems (UPS), solar PV arrays, standby generators,
                stored charge in capacitors, electromagnetic energy in inductors and transformers.
                Electrical energy can cause electrocution, burns, and arc flash.
              </li>
              <li>
                <strong>2. Mechanical energy.</strong> Rotating machinery (motors, fans, pumps),
                moving parts (conveyors, lifts), compressed springs (circuit breaker mechanisms),
                flywheels, and gears. Mechanical energy can cause crushing, entanglement,
                amputation, and impact injuries.
              </li>
              <li>
                <strong>3. Hydraulic energy.</strong> Pressurised hydraulic fluid in actuators,
                cylinders, accumulators, and pipework. Hydraulic systems can operate at pressures
                exceeding 200 bar (2,900 psi). A hydraulic fluid injection injury — where
                pressurised fluid penetrates the skin — is a medical emergency.
              </li>
              <li>
                <strong>4. Pneumatic energy.</strong> Compressed air in cylinders, receivers,
                pipework, and actuators. Pneumatic energy can cause unexpected movement of
                actuators, ejection of components, and blast injuries. Air receivers may retain
                pressure long after the compressor is isolated.
              </li>
              <li>
                <strong>5. Thermal energy.</strong> Heat from electrical equipment (transformers,
                motors, resistors), steam systems, hot surfaces, and process fluids. Cold can also
                be hazardous — cryogenic systems and refrigeration plant. Thermal energy causes
                burns, scalds, and cold injuries.
              </li>
              <li>
                <strong>6. Chemical energy.</strong> Hazardous substances in pipework, vessels, and
                processes — acids, solvents, gases, and reactive chemicals. Battery electrolyte
                (sulphuric acid in lead-acid, lithium compounds in Li-ion) is a common chemical
                hazard in electrical maintenance. Chemical energy can cause burns, poisoning, and
                asphyxiation.
              </li>
              <li>
                <strong>7. Gravitational energy.</strong> Elevated loads, raised platforms,
                suspended components, and counterweights. Any object that is raised above its rest
                position stores gravitational potential energy. Cable drums, transformer lifting
                gear, and elevated switchgear compartments are common examples in electrical
                maintenance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Energy source identification for common electrical equipment">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Equipment</th>
                    <th className="py-2 pr-4 font-medium text-white">Energy sources</th>
                    <th className="py-2 font-medium text-white">Stored energy risk</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Motor Control Centre</td>
                    <td className="py-2 pr-4">
                      Electrical (mains + control), mechanical (motor), pneumatic (actuators)
                    </td>
                    <td className="py-2">Capacitor banks, spring-charged breakers</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Variable Speed Drive</td>
                    <td className="py-2 pr-4">Electrical (AC supply + DC bus)</td>
                    <td className="py-2">DC bus capacitors (300-800V DC for several minutes)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">HV Switchgear</td>
                    <td className="py-2 pr-4">Electrical (HV + LV control), mechanical</td>
                    <td className="py-2">Spring mechanisms, cable capacitance</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">UPS System</td>
                    <td className="py-2 pr-4">Electrical (mains + battery + output)</td>
                    <td className="py-2">Battery bank, DC bus capacitors</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Hydraulic Press</td>
                    <td className="py-2 pr-4">Electrical (motor), hydraulic, gravitational</td>
                    <td className="py-2">Pressurised accumulator, raised ram</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>LOTO equipment and the six-step procedure</ContentEyebrow>

          <ConceptBlock title="Equipment and procedure — neither works without the other">
            <p>
              Effective LOTO requires both the correct equipment and a systematic procedure. The
              equipment provides the physical barrier that prevents energy release; the procedure
              ensures the equipment is applied correctly, consistently, and completely. Neither
              element works without the other — locks without procedure lead to incomplete
              isolation; procedure without locks provides no physical protection.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Essential LOTO equipment">
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Personal safety padlocks.</strong> Purpose-designed LOTO padlocks —
                lightweight, brightly coloured, with unique keys. Each worker has their own
                individually keyed lock. Must be durable, corrosion-resistant, and clearly
                identifiable. Never use standard commercial padlocks.
              </li>
              <li>
                <strong>Multi-lock hasps.</strong> Scissor hasps or jaw hasps that accept multiple
                padlocks. Allow several workers to secure the same isolation point simultaneously.
                Available in 4-lock, 6-lock, 8-lock, and 12-lock configurations.
              </li>
              <li>
                <strong>Lockout devices.</strong> Purpose-designed devices that fit specific types
                of energy isolating equipment: MCB lockouts, fuse carrier lockouts, valve lockouts,
                plug lockouts, gate valve lockouts, and universal lockout devices. Must be matched
                to the equipment.
              </li>
              <li>
                <strong>Danger tags.</strong> Durable, weather-resistant tags with spaces for: name
                of person, date, time, reason for lockout, and contact information. Attached to the
                lock or hasp with a non-reusable cable tie or self-locking nylon tie.
              </li>
              <li>
                <strong>Lockout kits and stations.</strong> Portable kits containing a selection of
                lockout devices, padlocks, hasps, and tags for field use. Lockout stations provide
                wall-mounted storage near equipment with a visual display showing which locks are in
                use.
              </li>
              <li>
                <strong>Group lockout boxes.</strong> Secure boxes that hold the keys for all
                isolation point locks. The box itself is then locked with each worker&apos;s
                personal padlock. Used for complex isolations involving many isolation points.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The six-step LOTO procedure">
            <ul className="list-decimal space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Prepare.</strong> Identify the equipment to be worked on, all energy sources
                (use the equipment&apos;s Energy Isolation Procedure or create one), and all
                isolation points. Gather the required LOTO equipment. Notify all affected personnel
                that the equipment will be shut down and locked out. Review the risk assessment and
                method statement.
              </li>
              <li>
                <strong>Shut down.</strong> Stop the equipment using the normal operating procedures
                and controls. This controlled shutdown prevents additional hazards that could arise
                from an abrupt stop — for example, a sudden stop of a pump could cause water hammer,
                or an uncontrolled motor stop could damage the drive system. Never start the LOTO
                process by going directly to the isolation devices.
              </li>
              <li>
                <strong>Isolate.</strong> Operate all energy isolating devices to disconnect the
                equipment from every energy source. This includes electrical isolators, valve
                shut-offs, pneumatic disconnects, and any other isolation points identified in Step
                1. Ensure each device provides a positive, physical break in the energy supply.
                Address stored energy: discharge capacitors, relieve pressure, block raised loads,
                allow hot surfaces to cool.
              </li>
              <li>
                <strong>Lock out and tag out.</strong> Apply your personal safety padlock to each
                energy isolating device. Attach a completed danger tag to each lock identifying you
                as the person who applied it. If multiple workers are involved, apply a multi-lock
                hasp first, then each worker applies their own lock. For complex isolations with
                many points, use a group lockout box system.
              </li>
              <li>
                <strong>Verify isolation.</strong> This is the critical step that confirms the
                isolation is effective. For electrical energy: follow the Prove-Test-Prove sequence
                using a GS38-compliant voltage indicator. For mechanical energy: attempt to operate
                the equipment using normal controls. For hydraulic/pneumatic: check pressure gauges
                read zero. For stored energy: verify capacitors are discharged, springs are
                released, loads are lowered or blocked.
              </li>
              <li>
                <strong>Perform the work.</strong> Only after all energy sources have been isolated,
                locked, tagged, and verified may the maintenance work begin. Throughout the work,
                the locks and tags must remain in place. If the scope of work changes, stop and
                reassess whether additional energy sources need to be isolated. When work is
                complete, follow the controlled re-energisation procedure.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Verification is non-negotiable">
            <p>
              Step 5 — Verify Isolation — is the step that saves lives. Without verification, you
              are trusting that you operated the correct isolation devices, that they functioned
              properly, and that no other energy source exists. Verification removes this trust and
              replaces it with physical evidence. Never skip this step.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Group lockout, shift changeover and inspection</ContentEyebrow>

          <ConceptBlock title="When jobs cross workers, shifts and time">
            <p>
              Many maintenance activities involve multiple workers, extend across shift changes, or
              require complex isolations with numerous energy sources. These situations introduce
              additional risks that must be managed through specific LOTO procedures. Getting these
              right is essential — they represent the scenarios where LOTO failures most commonly
              occur.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Group lockout procedures">
            <p>
              When multiple workers need to work on the same equipment, a group lockout system
              ensures that every individual is protected. There are two primary methods:
            </p>
            <p>
              <strong>Method 1: Multi-lock hasp.</strong> For simple isolations with few isolation
              points:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>A multi-lock hasp is fitted to each isolation point</li>
              <li>Each worker applies their personal lock to the hasp</li>
              <li>The isolation cannot be removed until all locks are removed</li>
              <li>Best suited for 2-6 workers on a single isolation point</li>
            </ul>
            <p>
              <strong>Method 2: Group lockout box.</strong> For complex isolations with many
              isolation points:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>An authorised person isolates and locks all isolation points</li>
              <li>The keys to these locks are placed in a lockout box</li>
              <li>The box is locked — each worker applies their personal lock to the box</li>
              <li>No one can access the isolation keys until all personal locks are removed</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Shift changeover — the critical gap"
            whatHappens={
              <>
                Shift changeover is one of the most dangerous periods for LOTO. If the outgoing
                worker removes their lock before the incoming worker applies theirs, there is a
                window during which the equipment is not locked out — and could be re-energised.
              </>
            }
            doInstead={
              <>
                <p>Safe shift changeover procedure:</p>
                <ol className="mt-2 list-decimal space-y-1.5 pl-5 marker:text-green-400/70">
                  <li>Outgoing worker briefs incoming worker on the status of the work and LOTO</li>
                  <li>Incoming worker inspects the isolation and verifies it is still effective</li>
                  <li>Incoming worker applies their personal lock</li>
                  <li>Outgoing worker removes their personal lock</li>
                  <li>Incoming worker verifies that they have sole control of the isolation</li>
                  <li>Outgoing worker signs off the LOTO log; incoming worker signs on</li>
                </ol>
                <p className="mt-2">
                  The incoming lock is always applied BEFORE the outgoing lock is removed. This
                  ensures continuous lockout protection with no unprotected gap.
                </p>
              </>
            }
          />

          <ConceptBlock title="Periodic inspection of LOTO procedures">
            <p>
              LOTO procedures must be formally inspected at regular intervals to ensure they remain
              effective and are being correctly followed. Best practice requires annual inspections,
              though more frequent reviews may be appropriate for high-risk activities.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Frequency:</strong> At least annually for each energy isolation procedure
              </li>
              <li>
                <strong>Inspector:</strong> An authorised person who is NOT routinely involved in
                the procedure being inspected
              </li>
              <li>
                <strong>Scope:</strong> Observe the procedure being carried out, interview workers,
                check equipment condition
              </li>
              <li>
                <strong>Verification:</strong> Confirm workers understand each step, can identify
                all energy sources, and know emergency procedures
              </li>
              <li>
                <strong>Documentation:</strong> Record the inspection findings, corrective actions,
                and date of next review
              </li>
              <li>
                <strong>Corrective action:</strong> Any deficiencies must be corrected before the
                next LOTO activity on that equipment
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Emergency lock removal procedure">
            <p>
              In exceptional circumstances, it may be necessary to remove a lock when the person who
              applied it is not available. This is a last resort and must follow a formal,
              documented procedure:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>All reasonable efforts to contact the lock owner have been exhausted</li>
              <li>A senior authorised person has assessed that it is safe to remove the lock</li>
              <li>A thorough check of the work area confirms no one is at risk</li>
              <li>The removal is authorised in writing by a named senior manager</li>
              <li>
                The lock owner is notified at the earliest opportunity that their lock has been
                removed
              </li>
              <li>The incident is documented and reviewed to prevent recurrence</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>LOTO for electrical maintenance and common failures</ContentEyebrow>

          <ConceptBlock title="Where LOTO gets harder — real electrical equipment">
            <p>
              Electrical maintenance presents unique LOTO challenges. Equipment such as motor
              control centres, switchgear, variable speed drives, and UPS systems combine multiple
              energy types and often have hidden stored energy sources. Understanding these specific
              challenges is essential for safe working.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Motor Control Centres (MCCs)">
            <p>
              MCCs are among the most complex equipment for LOTO because they contain multiple
              independent energy sources within a single assembly:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main incoming supply:</strong> Isolate at the incoming switch-disconnector
                and lock off
              </li>
              <li>
                <strong>Control voltage supplies:</strong> Often fed from a separate source —
                isolate independently
              </li>
              <li>
                <strong>Power factor correction capacitors:</strong> Retain charge after isolation —
                verify discharge (wait for bleed-down time, typically 1-5 minutes)
              </li>
              <li>
                <strong>Spring-charged circuit breaker mechanisms:</strong> Release stored
                mechanical energy before working inside compartments
              </li>
              <li>
                <strong>Pneumatic actuators:</strong> Depressurise and lock out air supply
              </li>
              <li>
                <strong>Back-feeds:</strong> Check for inter-bus connections, emergency tie
                switches, or alternative feeds from other sections
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Variable Speed Drives (VSDs)">
            <p>VSDs present a particular stored energy hazard from their DC bus capacitors:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>DC bus voltage:</strong> Typically 300-800V DC — potentially lethal
              </li>
              <li>
                <strong>Discharge time:</strong> Can take 5-15 minutes after supply isolation,
                depending on drive size
              </li>
              <li>
                <strong>Verification:</strong> Check the &apos;DC bus active&apos; or
                &apos;charge&apos; indicator LED; measure DC bus voltage with an approved instrument
              </li>
              <li>
                <strong>Never assume:</strong> Even if the display is blank, the DC bus may still be
                charged — always measure
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="HV switchgear">
            <p>
              High voltage switchgear requires the most rigorous LOTO, typically combined with a
              formal permit to work system:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolation:</strong> Withdraw circuit breakers, open disconnectors, apply
                safety earths
              </li>
              <li>
                <strong>Locking:</strong> Lock off all disconnectors and earth switches in their
                safe position
              </li>
              <li>
                <strong>Spring mechanisms:</strong> Discharge stored energy in spring-charged
                mechanisms
              </li>
              <li>
                <strong>Cable capacitance:</strong> Long HV cables can retain charge — apply
                temporary earths
              </li>
              <li>
                <strong>Interlocks:</strong> Verify that all mechanical and key interlocks are
                engaged
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Incomplete energy survey"
            whatHappens={
              <>
                Failing to identify all energy sources — especially stored energy in capacitors,
                springs, and elevated loads.
              </>
            }
            doInstead={
              <>Always use a documented Energy Isolation Procedure specific to the equipment.</>
            }
          />

          <CommonMistake
            title="Tags without locks"
            whatHappens={
              <>
                Using danger tags as the sole means of protection, without padlocks. Tags can be
                ignored or removed.
              </>
            }
            doInstead={<>Always use locks AND tags together.</>}
          />

          <CommonMistake
            title="Skipping verification"
            whatHappens={<>Failing to verify that isolation is effective after applying locks.</>}
            doInstead={
              <>
                Always perform the Prove-Test-Prove sequence for electrical energy, and physical
                verification for all other energy types.
              </>
            }
          />

          <CommonMistake
            title="Improper lockout devices"
            whatHappens={
              <>
                Using cable ties, tape, or ill-fitting devices that do not properly secure the
                isolating device.
              </>
            }
            doInstead={
              <>Use only purpose-designed LOTO devices matched to the specific equipment.</>
            }
          />

          <CommonMistake
            title="Complacency on routine tasks"
            whatHappens={
              <>
                Believing that familiar equipment does not need full LOTO because &quot;I&apos;ve
                done this a hundred times.&quot;
              </>
            }
            doInstead={<>Follow the full procedure every time, without exception.</>}
          />

          <CommonMistake
            title="Poor shift handover"
            whatHappens={
              <>
                Removing locks at shift end without ensuring continuity of lockout by the incoming
                shift.
              </>
            }
            doInstead={<>Incoming lock applied before outgoing lock removed.</>}
          />

          <ConceptBlock title="Case study: the hidden energy source">
            <p>
              A maintenance technician was tasked with replacing a contactor in a motor starter
              within an MCC. The technician correctly isolated the incoming supply to the MCC
              section and applied a personal lock. However, the control circuit for the starter was
              fed from a separate 110V control transformer, located in a different section of the
              MCC. When the technician disconnected the contactor coil wires, they received a 110V
              shock. The investigation found that the Energy Isolation Procedure for the MCC had not
              been updated after a modification that added the separate control supply. The
              technician survived, but the incident highlighted the critical importance of verifying
              that documented procedures reflect the current state of the installation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="LOTO is a legal requirement, not a recommendation">
            <p>
              Under the Electricity at Work Regulations 1989, Regulation 13 requires adequate
              precautions to prevent conductors becoming electrically charged during work. A
              properly implemented LOTO procedure is the primary means of demonstrating compliance
              with this regulation. LOTO is not optional — it is a legal requirement for electrical
              maintenance.
            </p>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A lock-off with one lock and three people working"

            situation={
              <>
                <p>
                  A conveyor is isolated for a bearing change. The fitter applies his lock to the
                  isolator, then two more people join the job — an electrician to disconnect the
                  motor and a second fitter to help lift.
                </p>

                <p>
                  The first fitter finishes early, takes his lock off and goes to another job. The
                  isolator is now unlocked with two people still working on the machine.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Use a multi-lock hasp from the start. Every person working on the plant fits their
                  own lock, and the isolation cannot be reversed until the last one is removed. That
                  is the entire point of the device.
                </p>

                <p>
                  Brief it when the second and third person arrive, not at the start. People join
                  jobs late and nobody thinks to hand them a lock.
                </p>

                <p>
                  Make removal personal. Your lock comes off when you are finished and clear — never
                  on someone else’s behalf, and never because a shift is ending and the lock is in
                  the way.
                </p>

                <p>
                  If a lock genuinely has to be cut off because someone has gone home with the key,
                  that is a formal, authorised procedure with the plant proved safe first — not a
                  decision taken at the isolator.
                </p>
              </>
            }

            whyItMatters={
              <p>
                One lock protects one person. The moment a second worker relies on someone else’s
                lock, their safety depends on a stranger’s judgement about when the job is finished.
                The hasp exists precisely so that nobody has to make that assumption, and it costs
                nothing to fit. This is also why tags alone will not do: a tag tells you the plant
                should not be energised, a lock means it cannot be.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'LOTO procedure — 6 steps: prepare (identify energy sources) → shut down (normal stop procedures) → isolate (operate all isolating devices) → lock out/tag out (personal lock + tag) → verify isolation (prove all energy sources are zero) → perform the work (maintain LOTO throughout).',
              'Seven energy types: electrical (mains, stored charge, batteries), mechanical (rotation, springs, flywheels), hydraulic (pressurised fluid, accumulators), pneumatic (compressed air, receivers), thermal (heat, steam, cold), chemical (acids, gases, reactive substances), gravitational (elevated loads, counterweights).',
              'Key legislation: HSWA 1974 — safe systems of work; EAWR 1989 Regs 12, 13 — isolation, dead working; PUWER 1998 Regs 19-22 — energy isolation; BS 7671:2018+A4:2026 Section 537; HSG85 — safe working practices.',
              'LOTO equipment: personal safety padlocks (unique key), multi-lock hasps (group lockout), MCB/fuse/valve lockout devices, danger tags (supplementary to locks), group lockout boxes (complex isolations).',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section1-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Isolation Procedures
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section1-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Safe Access and Work at Height
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section1_3;
