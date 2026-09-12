/**
 * MOET · Module 1 · Section 1.4 · Subsection 5 — LOLER (Lifting Operations
 * and Lifting Equipment Regulations 1998)
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
 *   Knowledge  · "Health and safety regulations – key features and impact on
 *                 role."
 *              · "Work environment hazards and risks. Risk assessments."
 *   Skills     · "Identify environmental and health and safety  hazards and
 *                 risks and apply control measures."
 *   Behaviours · "Prioritise safe working practices.."
 *
 * Content preserved from the original page; structure, shell and reading
 * measure rebuilt on the study-centre learning kit.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'LOLER - Lifting Operations and Lifting Equipment Regulations 1998 - MOET Module 1 Section 4.5';
const DESCRIPTION =
  'Comprehensive guide to LOLER 1998 for electrical maintenance technicians: lifting operations, thorough examination, MEWPs, chain hoists, cable pulling equipment, and application to switchgear and transformer maintenance.';

const quickCheckQuestions = [
  {
    id: 'loler-scope',
    question:
      'Which of the following items of equipment used by an electrical maintenance technician is subject to LOLER?',
    options: [
      'A two-pole voltage indicator used to prove a circuit dead before work',
      'A cordless hand drill used to fix cable containment to a wall',
      'A mobile elevating work platform (MEWP) used to access high-level cable tray',
      'An insulation resistance tester used during periodic inspection',
    ],
    correctIndex: 2,
    explanation:
      'A MEWP is lifting equipment used for lifting persons — it is subject to LOLER. Voltage indicators, drills and insulation resistance testers are work equipment subject to PUWER, but they are not lifting equipment. LOLER applies to equipment used for lifting or lowering loads (including persons).',
  },
  {
    id: 'loler-thorough-exam',
    question:
      'How often must lifting equipment used for lifting persons (such as a MEWP) undergo a thorough examination under LOLER?',
    options: ['Every 6 months', 'Every 3 months', 'Every 12 months', 'Every 24 months'],
    correctIndex: 0,
    explanation:
      'Under LOLER Regulation 9, lifting equipment used for lifting persons must undergo a thorough examination by a competent person at least every 6 months. Other lifting equipment (not used for lifting persons) requires thorough examination at least every 12 months. More frequent examinations may be required based on risk assessment.',
  },
  {
    id: 'loler-planning',
    question: 'Regulation 8 of LOLER requires that every lifting operation shall be:',
    options: [
      'Carried out only between certified slingers without any written plan',
      'Recorded on an Electrical Installation Certificate before the lift starts',
      'Approved verbally by the site manager on the day of the lift',
      'Properly planned by a competent person, appropriately supervised and carried out in a safe manner',
    ],
    correctIndex: 3,
    explanation:
      'Regulation 8 requires every lifting operation to be properly planned by a competent person, appropriately supervised, and carried out in a safe manner. The plan must address the risks specific to the lift, the equipment to be used, the load weight and centre of gravity, the ground conditions, and the environmental factors.',
  },
  {
    id: 'loler-defects',
    question:
      'Under Regulation 11 of LOLER, if a thorough examination reveals a defect that involves an existing or imminent risk of serious personal injury, the competent person must:',
    options: [
      'Send a report to the HSE (or relevant enforcing authority) as soon as practicable',
      'Allow the equipment to remain in use until the next scheduled examination',
      'Note the defect on the report but take no further action until renewal',
      'Inform only the equipment operator and leave the decision to them',
    ],
    correctIndex: 0,
    explanation:
      'Regulation 10(1)(c) requires the competent person carrying out the thorough examination to send a copy of the report to the relevant enforcing authority (usually the HSE) as soon as is practicable where, in their opinion, a defect involves an existing or imminent risk of serious personal injury. The equipment must not be used until the defect is remedied.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'LOLER 1998 was made under which Act?',
    options: [
      'The Factories Act 1961',
      'The Health and Safety at Work Act 1974',
      'The Lifting Equipment Act 1998',
      'The Consumer Protection Act 1987',
    ],
    correctAnswer: 1,
    explanation:
      'LOLER 1998 is a statutory instrument made under the Health and Safety at Work Act 1974. It implements EU Directive 95/63/EC (amending the Work Equipment Directive) and remains in force as retained UK law.',
  },
  {
    id: 2,
    question: "The definition of 'lifting equipment' under LOLER includes:",
    options: [
      'Any portable hand tool used while working at height above ground level',
      'Only fixed cranes that are permanently installed within a building structure',
      'Work equipment for lifting or lowering loads, plus the accessories used to attach them',
      'Access equipment such as ladders, scaffolds, towers and step stools',
    ],
    correctAnswer: 2,
    explanation:
      'LOLER defines lifting equipment broadly as work equipment for lifting or lowering loads, including the load and anything attached for that purpose. This covers cranes, hoists, chain blocks, MEWPs, scissor lifts, gin wheels, cable pulling winches, lifting slings, shackles, and eyebolts.',
  },
  {
    id: 3,
    question: 'Regulation 4 of LOLER requires that lifting equipment shall be of adequate:',
    options: [
      'Brightness and visibility for night-time use',
      'Speed and efficiency for the lifting operation',
      'Electrical insulation for use near live parts',
      'Strength and stability for each load',
    ],
    correctAnswer: 3,
    explanation:
      'Regulation 4 requires lifting equipment to be of adequate strength and stability for each load, having regard in particular to the stress induced at its mounting or fixing point. This means the equipment and its supporting structure must be capable of withstanding the loads imposed during lifting operations.',
  },
  {
    id: 4,
    question:
      'Regulation 5 of LOLER provides additional requirements for lifting equipment used for lifting persons. Which of the following is required?',
    options: [
      'Measures to prevent persons being crushed, trapped, struck or falling from the carrier',
      'A high-visibility colour finish on the carrier and supporting structure',
      'A fixed seat with a restraint provided for every occupant of the carrier',
      'A strict limit of no more than two persons in the carrier at any time',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 5 requires that where lifting equipment is used for lifting persons, measures must be taken to prevent the carrier (platform/cage) falling, the person being crushed/trapped/struck, and the person falling from the carrier. There must also be a means of rescue in case of emergency.',
  },
  {
    id: 5,
    question:
      'Regulation 6 of LOLER covers the positioning and installation of lifting equipment. This requires consideration of:',
    options: [
      'The colour scheme and signage applied to the equipment',
      'The risk of the equipment or the load striking a person, the risk of the load drifting, falling freely or being released unintentionally, and adequate clearances',
      'The training records of every operator on site',
      'The fuel efficiency and running costs of the equipment',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 6 requires that lifting equipment is positioned or installed to reduce the risk of the equipment or load striking a person, the load drifting/falling/being released unintentionally. It also requires adequate clearances and consideration of the operating environment.',
  },
  {
    id: 6,
    question: 'Regulation 7 of LOLER requires lifting equipment to be clearly marked with:',
    options: [
      'The date it was purchased and its unique serial number only',
      'The name and full contact details of the equipment manufacturer',
      'Its safe working load (SWL), for each configuration where this varies',
      'The maximum height to which the equipment can be raised in use',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 7 requires lifting equipment to be clearly marked with its safe working load (SWL). Where the SWL varies with the configuration (e.g., boom length, radius of operation), the SWL for each configuration must be marked. Equipment designed for lifting persons must be appropriately and clearly marked to that effect.',
  },
  {
    id: 7,
    question:
      "Under Regulation 9, a 'thorough examination' of lifting equipment must be carried out by:",
    options: [
      'The equipment operator, as part of a pre-use check before each lift',
      'Any qualified electrician working on the site at the time',
      'The original equipment manufacturer, as a legal requirement',
      'A competent person, independent and with sufficient knowledge and experience',
    ],
    correctAnswer: 3,
    explanation:
      'A thorough examination must be carried out by a competent person who has sufficient practical and theoretical knowledge and experience of the equipment to detect defects and assess their significance. The competent person should be independent — typically from an insurance company engineering inspection body or specialist inspection company.',
  },
  {
    id: 8,
    question:
      'The maximum interval between thorough examinations for lifting equipment NOT used for lifting persons is:',
    options: ['12 months', '24 months', '3 months', '6 months'],
    correctAnswer: 0,
    explanation:
      'For lifting equipment not used for lifting persons, the maximum interval between thorough examinations is 12 months. For equipment used for lifting persons (e.g., MEWPs), the maximum interval is 6 months. These are maximum intervals — more frequent examinations may be required based on risk assessment, intensity of use, or operating environment.',
  },
  {
    id: 9,
    question: 'Regulation 10 of LOLER requires that reports of thorough examinations are:',
    options: [
      'Made verbally to the operator before each lift',
      'Made by the competent person and contain specified information including any defects found and the next examination date',
      'Kept secret from the equipment owner for commercial reasons',
      'Required only when a defect has actually been found',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 10 requires the competent person to make a report of every thorough examination as soon as practicable. The report must contain specified information including: identification of the equipment, date of the examination, any defects found, whether it is or will become a danger, the date by which defects must be remedied, and the date of the next examination.',
  },
  {
    id: 10,
    question:
      'An electrical maintenance technician uses a chain hoist to remove a transformer from a substation. Under LOLER, this operation requires:',
    options: [
      'No special precautions, since the substation is already safely isolated',
      'Only a verbal agreement reached between the two technicians involved',
      'A planned lift using examined, SWL-marked equipment of adequate strength',
      'An Electrical Installation Certificate completed before the lift begins',
    ],
    correctAnswer: 2,
    explanation:
      'Removing a transformer is a lifting operation under LOLER. It requires: planning by a competent person (Reg 8), equipment of adequate strength (Reg 4), correctly positioned (Reg 6), marked with SWL (Reg 7), with a current thorough examination report (Reg 9), and carried out safely under appropriate supervision.',
  },
  {
    id: 11,
    question:
      'A MEWP is being used by an electrical maintenance technician to access high-level cable containment. Under LOLER, the MEWP must:',
    options: [
      'Be re-painted in the company livery colours before it is used',
      'Carry an onboard fire extinguisher rated for electrical fires',
      'Have a thorough examination report no older than 12 months',
      'Have a current 6-month examination, a trained operator and a planned lift',
    ],
    correctAnswer: 3,
    explanation:
      'A MEWP used for lifting persons must have a current thorough examination report (maximum 6-month intervals under Reg 9), be of adequate strength and stability (Reg 4), have measures to prevent falls (Reg 5), be operated by a person trained in its safe use (PUWER Reg 9), and the operation must be planned (Reg 8).',
  },
  {
    id: 12,
    question: 'Under ST1426, knowledge of LOLER is relevant to maintenance technicians because:',
    options: [
      'Maintenance work frequently involves lifting operations with MEWPs and hoists',
      'Lifting equipment is the most common cause of electric shock on site',
      'LOLER replaces the need to comply with BS 7671 during maintenance work',
      'Maintenance technicians are legally required to design their own lifting gear',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical maintenance frequently involves lifting operations: using MEWPs to access high-level equipment, chain hoists to remove transformers and switchgear, cable pulling winches, and lifting slings and shackles. ST1426 requires maintenance technicians to understand the regulations governing these activities.',
  },
];

const faqs = [
  {
    question: "What is the difference between a 'thorough examination' and an 'inspection'?",
    answer:
      'A thorough examination under LOLER is a detailed examination by a competent person (typically an independent engineer) at statutory intervals (6 or 12 months). An inspection under PUWER Regulation 6 is a broader term covering visual checks, pre-use inspections, and periodic inspections at intervals determined by risk assessment. Both may be required — a thorough examination satisfies the LOLER requirement, while regular inspections satisfy PUWER requirements between thorough examinations.',
  },
  {
    question: 'Does LOLER apply to a ladder?',
    answer:
      'Generally no — a ladder is access equipment, not lifting equipment. It is covered by PUWER and the Work at Height Regulations 2005. However, if a ladder is used as part of a lifting operation (e.g., a ladder hoist used to raise materials), the hoist mechanism is subject to LOLER. The distinction is whether the equipment is used for lifting or lowering a load.',
  },
  {
    question: 'Who can carry out a thorough examination?',
    answer:
      'A thorough examination must be carried out by a competent person with sufficient practical and theoretical knowledge to detect defects and assess their significance. In practice, this is typically an engineer employed by an insurance company inspection body (such as Zurich, Allianz, or RSA), a specialist inspection company (such as BSRIA), or an independent competent person. The key requirement is competence and independence.',
  },
  {
    question: 'Do I need to keep thorough examination reports, and for how long?',
    answer:
      'Yes. Reports must be kept until the next report is made, or for at least 2 years — whichever is longer. For equipment used for lifting persons, the initial report (before first use) must be kept for as long as the equipment is in use. In practice, many organisations keep all reports for the life of the equipment plus a period for potential litigation (typically 6 years).',
  },
  {
    question: 'What lifting equipment might I encounter as an electrical maintenance technician?',
    answer:
      'Common lifting equipment in electrical maintenance includes: mobile elevating work platforms (MEWPs/cherry pickers), scissor lifts, chain hoists and chain blocks (for removing transformers, switchgear, motors), cable pulling winches, gin wheels, lifting beams in substations, panel lifters for switchboard sections, and lifting slings, shackles and eyebolts. All are subject to LOLER requirements.',
  },
];

const MOETModule1Section4_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.4 · Subsection 5"
        title="LOLER — Lifting Operations and Lifting Equipment Regulations 1998"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Safe lifting operations for electrical maintenance activities.
          </p>

          <TLDR
            points={[
              'LOLER: Governs all lifting operations and lifting equipment',
              'Reg 8: Every lift must be planned, supervised, carried out safely',
              'Reg 9: Thorough examination — 6 months (persons) / 12 months (loads)',
              'SWL: Safe working load must be clearly marked',
            ]}
          />

          <ConceptBlock title="Electrical Maintenance Context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MEWPs:</strong> Cherry pickers, scissor lifts for high-level access
              </li>
              <li>
                <strong>Chain hoists:</strong> Removing transformers, switchgear, motors
              </li>
              <li>
                <strong>Cable winches:</strong> Pulling heavy cables through ducts
              </li>
              <li>
                <strong>ST1426:</strong> Lifting operations in maintenance work activities
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the scope and purpose of LOLER 1998 and what constitutes lifting equipment',
              'Describe the strength and stability requirements (Reg 4) and lifting persons provisions (Reg 5)',
              'Explain the requirements for planning lifting operations (Reg 8)',
              'Understand the thorough examination regime (Reg 9) and examination intervals',
              'Describe reporting requirements (Reg 10) and defect notification (Reg 11)',
              'Apply LOLER to MEWPs, chain hoists and cable pulling in electrical maintenance',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Scope, strength and stability (Regs 4–7)</ContentEyebrow>

          <ConceptBlock title="Scope, Strength and Stability (Regs 4–7)">
            <p>
              The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER) provide specific
              requirements for lifting equipment and lifting operations, supplementing the general
              requirements of PUWER 1998. Where PUWER applies to all work equipment, LOLER adds more
              specific and stringent requirements for equipment and operations that involve lifting
              or lowering loads — including persons.
            </p>
            <p>
              For electrical maintenance technicians, LOLER is directly relevant because your work
              frequently involves lifting operations: using mobile elevating work platforms (MEWPs)
              to access high-level cable tray and containment, chain hoists to remove heavy
              transformers and switchgear, cable pulling winches, and lifting slings and shackles
              for handling heavy electrical components.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Definition of Lifting Equipment">
            <p>
              &quot;Lifting equipment&quot; means work equipment for lifting or lowering loads, and
              includes its attachments used for anchoring, fixing or supporting it. &quot;Load&quot;
              includes any person or animal lifted by the equipment.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equipment:</strong> Cranes, hoists, chain blocks, MEWPs, scissor lifts, tail
                lifts, forklifts, gin wheels, cable winches, panel lifters, lifting beams
              </li>
              <li>
                <strong>Accessories:</strong> Slings (chain, wire rope, webbing), shackles,
                eyebolts, hooks, spreader beams, lifting clamps
              </li>
              <li>
                <strong>Not lifting equipment:</strong> Ladders (access only), escalators (in normal
                use), stacker trucks below a certain threshold (depending on risk)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Regulation 4 — Strength and Stability"
            onSite="Maintenance example: Before using a ceiling-mounted lifting beam in a substation to remove a transformer, you must verify the beam's SWL and confirm the building structure can support the load. A competent structural assessment may be required."
          >
            <p>
              Every employer must ensure lifting equipment is of adequate strength and stability for
              each load, having regard in particular to the stress induced at its mounting or fixing
              point.
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                The equipment must be strong enough for the intended load — including dynamic forces
                during lifting
              </li>
              <li>
                The supporting structure (floor, ceiling, beam) must be adequate for the loads
                imposed
              </li>
              <li>
                Stability must be maintained throughout the lifting operation — including during
                slewing, luffing and travel
              </li>
              <li>
                For mobile equipment (MEWPs, mobile cranes), ground conditions must be suitable
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Regulation 5 — Lifting Equipment for Lifting Persons">
            <p>
              Where lifting equipment is used for lifting persons, additional requirements apply to
              protect the persons being lifted:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                The carrier (platform, cage) must be prevented from falling — by reliable means such
                as redundant suspension
              </li>
              <li>
                The person must be prevented from being crushed, trapped, or struck by objects
              </li>
              <li>
                The person must be prevented from falling from the carrier — guardrails, gates,
                harness points
              </li>
              <li>Means of evacuation must be provided in case the carrier becomes stranded</li>
              <li>
                The equipment must have suitable devices to prevent the carrier falling (overspeed
                governors, check valves)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Regulation 6 — Positioning and Installation">
            <p>
              Lifting equipment must be positioned or installed to reduce the risk of the equipment
              or load striking a person, and to reduce the risk of the load drifting, falling
              freely, or being released unintentionally. For electrical maintenance, this means
              positioning MEWPs and hoists so that loads do not travel over occupied areas, and
              ensuring adequate clearances from live equipment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Regulation 7 — Marking">
            <p>
              All lifting equipment must be clearly marked with its safe working load (SWL).
              Additional marking requirements include:
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>SWL for each configuration (e.g., different boom lengths, radii)</li>
              <li>Equipment designed for lifting persons must be marked accordingly</li>
              <li>Equipment NOT designed for lifting persons must be marked to that effect</li>
              <li>
                Lifting accessories (slings, shackles) must show their SWL and identifying markings
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Planning lifting operations (Regulation 8)</ContentEyebrow>

          <ConceptBlock title="Planning Lifting Operations (Regulation 8)">
            <p>
              Regulation 8 is one of the most important requirements in LOLER. It establishes that
              every lifting operation must be properly planned, appropriately supervised, and
              carried out in a safe manner. The level of planning required is proportionate to the
              risk and complexity of the lift.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What must be planned?">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The load:</strong> Weight, dimensions, centre of gravity, fragility, sling
                attachment points
              </li>
              <li>
                <strong>The equipment:</strong> Type of lifting equipment, SWL verification,
                accessories required, condition and thorough examination status
              </li>
              <li>
                <strong>The route:</strong> Travel path from pick-up to set-down, overhead
                obstructions, proximity to live electrical equipment
              </li>
              <li>
                <strong>The environment:</strong> Ground conditions, weather (for outdoor lifts),
                confined spaces, other activities in the area
              </li>
              <li>
                <strong>The people:</strong> Competent persons to plan, supervise and carry out the
                lift; slingers, signallers, banksmen as required
              </li>
              <li>
                <strong>Emergency procedures:</strong> What to do if the lift goes wrong, load
                becomes unstable, or equipment fails
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Routine Lifts">
            <p>
              For routine, repetitive lifts (e.g., regularly using a MEWP to access cable tray at a
              known location), the plan may be a generic method statement covering the standard
              procedure. However, site-specific conditions must always be checked before each lift —
              ground conditions may have changed, other activities may be in progress, or the
              equipment status may have changed.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Complex or Non-Routine Lifts">
            <p>
              For complex lifts (e.g., removing a 2-tonne transformer from a basement substation
              using a chain hoist and gantry), a specific lift plan is required. This should include
              a detailed method statement, engineering calculations (or reference to the equipment
              load charts), and a risk assessment. The plan must be prepared by a competent person —
              typically an Appointed Person (Lifting) or an engineer with lifting experience.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Proximity to Live Electrical Equipment">
            <p>
              When lifting operations take place near live electrical equipment (which is common in
              electrical maintenance), the lift plan must address the risk of the load, equipment,
              or personnel coming into contact with or approaching live conductors. For HV systems,
              minimum approach distances must be maintained. Barriers, exclusion zones, and earthing
              arrangements may be required. This is where LOLER and the EAWR 1989 overlap — the lift
              plan must comply with both sets of regulations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Thorough examination and reports (Regs 9–10)</ContentEyebrow>

          <ConceptBlock title="Thorough Examination and Reports (Regs 9–10)">
            <p>
              The thorough examination regime is the centrepiece of LOLER&apos;s ongoing safety
              assurance. It requires independent, competent examination of all lifting equipment at
              statutory intervals, with detailed reporting and record-keeping. This is more rigorous
              than the general inspection requirements of PUWER Regulation 6 and provides a higher
              level of assurance appropriate to the risks of lifting.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Regulation 9 — Thorough Examination Requirements">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">When Required</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Equipment for Lifting Persons
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Other Lifting Equipment
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Lifting Accessories
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Before first use</td>
                    <td className="border border-white/10 px-3 py-2">
                      Yes (unless EC Declaration of Conformity &lt; 12 months)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Yes (unless EC/UKCA Declaration &lt; 12 months)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Yes (unless Declaration &lt; 12 months)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">After installation</td>
                    <td className="border border-white/10 px-3 py-2">
                      Yes — where safety depends on installation
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Yes — where safety depends on installation
                    </td>
                    <td className="border border-white/10 px-3 py-2">N/A</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Periodic</td>
                    <td className="border border-white/10 px-3 py-2 font-medium">Every 6 months</td>
                    <td className="border border-white/10 px-3 py-2 font-medium">
                      Every 12 months
                    </td>
                    <td className="border border-white/10 px-3 py-2 font-medium">Every 6 months</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      After exceptional circumstances
                    </td>
                    <td className="border border-white/10 px-3 py-2">Yes</td>
                    <td className="border border-white/10 px-3 py-2">Yes</td>
                    <td className="border border-white/10 px-3 py-2">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Regulation 10 — Reports">
            <p>
              The competent person must make a written report of every thorough examination. The
              report must contain:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Identification of the equipment examined (make, model, serial number, location)
              </li>
              <li>Date of the examination and date of the previous examination</li>
              <li>The SWL of the equipment (or range of SWLs for different configurations)</li>
              <li>Whether the equipment is safe to operate or has defects</li>
              <li>
                Details of any defects found and whether they are, or could become, a danger to
                persons
              </li>
              <li>The latest date by which the next thorough examination must take place</li>
              <li>Particulars of any tests carried out</li>
              <li>Name, qualifications and address of the competent person</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="What to check before using lifting equipment">
            <p>
              As a maintenance technician, before using any lifting equipment you should verify: (1)
              the equipment has a current thorough examination report within the required interval,
              (2) the SWL is clearly marked and adequate for your load, (3) there are no visible
              defects (damage, wear, corrosion, missing pins), (4) the equipment is suitable for the
              task and environment. If any of these cannot be confirmed, do not use the equipment —
              report the issue to your supervisor.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>
            Defects (Reg 11) and application to electrical maintenance
          </ContentEyebrow>

          <ConceptBlock title="Defects (Reg 11) and Application to Electrical Maintenance">
            <p>
              Regulation 10(1)(c) imposes the duty to send the report to the enforcing authority
              where a defect involves an existing or imminent risk of serious personal injury.
              Regulation 11 is separate: it governs how long reports and the EC declaration of
              conformity must be kept. This provides an additional safety net — ensuring that
              dangerous equipment is not only taken out of service but that the regulatory body is
              informed, enabling wider action if a systemic problem is identified.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Regulation 11 — Keeping of information">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                If a thorough examination reveals an{' '}
                <strong>existing or imminent risk of serious personal injury</strong>, the competent
                person must immediately inform the employer and the relevant enforcing authority
                (usually the HSE)
              </li>
              <li>The equipment must not be used until the defect is remedied</li>
              <li>
                The employer must ensure the defect is remedied before the equipment is used again
              </li>
              <li>The report must be sent to the enforcing authority as soon as is practicable</li>
              <li>
                Where the defect is not imminent but needs remedying within a specified timescale,
                the report will state the date by which the defect must be rectified
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common Lifting Equipment in Electrical Maintenance">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Thorough Exam Interval
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">Key Checks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">MEWP (cherry picker)</td>
                    <td className="border border-white/10 px-3 py-2">
                      High-level cable tray, lighting, containment
                    </td>
                    <td className="border border-white/10 px-3 py-2">6 months (lifting persons)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Hydraulics, guardrails, controls, outriggers
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Scissor lift</td>
                    <td className="border border-white/10 px-3 py-2">
                      Ceiling work, busbar access
                    </td>
                    <td className="border border-white/10 px-3 py-2">6 months (lifting persons)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Platform integrity, guardrails, descent safety
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Chain hoist / block</td>
                    <td className="border border-white/10 px-3 py-2">
                      Transformer, switchgear, motor removal
                    </td>
                    <td className="border border-white/10 px-3 py-2">12 months</td>
                    <td className="border border-white/10 px-3 py-2">
                      Chain wear, hook latch, brake, SWL marking
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Cable pulling winch</td>
                    <td className="border border-white/10 px-3 py-2">
                      Pulling heavy cables through ducts
                    </td>
                    <td className="border border-white/10 px-3 py-2">12 months</td>
                    <td className="border border-white/10 px-3 py-2">
                      Drum, brake, rope/cable condition, SWL
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Lifting slings</td>
                    <td className="border border-white/10 px-3 py-2">
                      Attaching loads for hoisting
                    </td>
                    <td className="border border-white/10 px-3 py-2">6 months (accessories)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cuts, abrasion, deformation, stitching, labels
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Shackles and eyebolts</td>
                    <td className="border border-white/10 px-3 py-2">Rigging connections</td>
                    <td className="border border-white/10 px-3 py-2">6 months (accessories)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Thread condition, pin security, SWL marking
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="LOLER and PUWER Together">
            <p>
              Lifting equipment is subject to both LOLER and PUWER simultaneously. PUWER provides
              the general requirements (suitability, maintenance, inspection, training, controls,
              isolation). LOLER adds specific requirements for lifting (strength and stability,
              thorough examination, lift planning, SWL marking, reporting). You must comply with
              both. Think of PUWER as the baseline and LOLER as the additional layer for
              lifting-specific risks.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Your Role as a Technician">
            <p>
              As a maintenance technician, you may not be the appointed person who plans complex
              lifts, but you will use lifting equipment regularly. Your responsibilities include:
              checking thorough examination certificates are current, verifying SWL markings,
              carrying out pre-use visual inspections, not exceeding the SWL, reporting defects
              immediately, and not using equipment that appears damaged or lacks documentation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Relevance to your ST1426 assessment">
            <p>
              <em>
                LOLER is one of the key regulations covered in the maintenance technician standard.
                You should be able to explain the thorough examination requirements, identify
                lifting equipment you use, and describe the planning requirements for lifting
                operations. In your EPA, you may be asked about a scenario involving a lifting
                operation as part of electrical maintenance.
              </em>
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 4 — Strength and stability',
              'Reg 5 — Lifting persons (additional requirements)',
              'Reg 6 — Positioning and installation',
              'Reg 7 — SWL marking',
              'Reg 8 — Planning of lifting operations',
              'Reg 9 — Thorough examination',
              'Reg 10 — Reports of examinations',
              'Reg 11 — Defects — notify enforcing authority',
              'Lifting persons: every 6 months maximum',
              'Other lifting equipment: every 12 months maximum',
              'Lifting accessories: every 6 months maximum',
              'Before first use (unless recent Declaration)',
              'After exceptional circumstances (damage, disuse)',
              'Records kept until next examination or 2 years',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section4-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  PUWER — Provision and Use of Work Equipment Regulations 1998
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section4-6')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Other Industry-Specific Guidance
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section4_5;
