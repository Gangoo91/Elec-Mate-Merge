/**
 * MOET · Module 1 · Section 1.4 · Subsection 4 — PUWER (Provision and Use of
 * Work Equipment Regulations 1998)
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
 *   Knowledge  · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and calibration
 *                 requirements."
 *              · "Health and safety regulations – key features and impact on
 *                 role."
 *   Skills     · "Apply health, safety, and environmental procedures in
 *                 compliance with regulations, standards, and guidance."
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
  RegsCallout,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'PUWER - Provision and Use of Work Equipment Regulations 1998 - MOET Module 1 Section 4.4';
const DESCRIPTION =
  'Comprehensive guide to PUWER 1998 for electrical maintenance technicians: suitability, maintenance, inspection, specific risks, controls, isolation, and application to test instruments, power tools and lifting equipment.';

const quickCheckQuestions = [
  {
    id: 'puwer-scope',
    question:
      'PUWER 1998 applies to which of the following used by an electrical maintenance technician?',
    options: [
      'Any equipment provided for or used at work — hand tools, power tools, test instruments and ladders',
      'Only fixed machinery that is installed permanently in the workplace by the employer',
      'Only equipment supplied directly by the employer, not the technician’s personal tools',
      'Only powered equipment, excluding hand tools, test instruments and access equipment',
    ],
    correctIndex: 0,
    explanation:
      "PUWER has a very broad scope. 'Work equipment' is defined as any machinery, appliance, apparatus, tool or installation for use at work. This includes a screwdriver, a multifunction tester, a cordless drill, a ladder, and a cable pulling winch. If you use it for work, PUWER applies to it.",
  },
  {
    id: 'puwer-maintenance',
    question: 'Regulation 5 of PUWER requires that work equipment is:',
    options: [
      'Inspected by an external competent person every twelve months',
      'Replaced with new equipment at fixed intervals set by the HSE',
      'Maintained in an efficient state, in efficient working order and in good repair',
      'Marked with a UKCA or CE label before it can be used at work',
    ],
    correctIndex: 2,
    explanation:
      'Regulation 5 requires work equipment to be maintained in an efficient state, in efficient working order and in good repair. Where a maintenance log is required, this must be kept up to date. The regulation does not prescribe specific intervals — the duty holder must determine what is necessary based on risk and manufacturer guidance.',
  },
  {
    id: 'puwer-inspection',
    question: 'Under Regulation 6 of PUWER, when must work equipment be inspected?',
    options: [
      'Only once, at the point the equipment is first purchased',
      'After installation, before first use, and at suitable intervals thereafter — or after exceptional circumstances that could affect safety',
      'Only when a defect has already caused an accident or injury',
      'Every working day before the equipment may be switched on',
    ],
    correctIndex: 1,
    explanation:
      'Regulation 6 requires inspection after installation and before first use (where safety depends on installation conditions), at suitable intervals determined by risk assessment, and after exceptional circumstances (such as damage, prolonged disuse, or modification) that could jeopardise safety.',
  },
  {
    id: 'puwer-isolation',
    question: 'Regulation 19 of PUWER requires work equipment to have:',
    options: [
      'A permanent connection that cannot be disconnected on site',
      'Isolation only from the electrical supply, not other energy forms',
      'A written record of every isolation made during its working life',
      'Clearly identifiable means of isolating it from all sources of energy',
    ],
    correctIndex: 3,
    explanation:
      'Regulation 19 requires that work equipment is provided with clearly identifiable and readily accessible means of isolating it from all sources of energy. The isolation must be confirmed — reconnection must not expose any person to risk. This directly supports safe isolation procedures for electrical maintenance.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'PUWER 1998 was made under which Act?',
    options: [
      'The Factories Act 1961',
      'The Health and Safety at Work Act 1974',
      'The Consumer Protection Act 1987',
      'The Supply of Machinery (Safety) Regulations 2008',
    ],
    correctAnswer: 1,
    explanation:
      'PUWER 1998 is a statutory instrument made under the Health and Safety at Work Act 1974. It implements the European Use of Work Equipment Directive (2009/104/EC, originally 89/655/EEC) and remains in force as retained UK law.',
  },
  {
    id: 2,
    question: 'Under Regulation 4 of PUWER, work equipment must be:',
    options: [
      'Replaced with a brand new item at the start of every project',
      'Owned outright by the employer rather than hired or leased',
      'Suitable for the purpose for which it is provided, having regard to the working conditions and health and safety risks',
      'Tested by the manufacturer on the day before each use',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 4 (Suitability) requires employers to ensure work equipment is suitable for the purpose for which it is used or provided. Suitability considers the working conditions, the nature of the work, and the health and safety risks. Equipment must be used only for operations and under conditions for which it is suitable.',
  },
  {
    id: 3,
    question: "A maintenance technician's multifunction tester is covered by PUWER because:",
    options: [
      'It contains a battery and therefore counts as a portable appliance',
      'It is only covered while it is connected to a live circuit',
      'It is exempt unless it is used on three-phase installations',
      "It is 'work equipment' — any apparatus or tool provided for use at work",
    ],
    correctAnswer: 3,
    explanation:
      "The definition of 'work equipment' in PUWER is extremely broad — it includes any machinery, appliance, apparatus, tool or installation for use at work. A multifunction tester, voltage indicator, insulation resistance tester, or even a basic screwdriver are all work equipment subject to PUWER requirements.",
  },
  {
    id: 4,
    question: 'Regulation 7 of PUWER addresses specific risks. This requires that:',
    options: [
      'Where use involves a specific risk, use is restricted to designated persons and maintenance is carried out by specifically designated persons',
      'All work equipment must be fitted with an emergency stop button',
      'Equipment presenting a specific risk must be withdrawn from use entirely',
      'Specific risks must always be eliminated rather than controlled',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 7 requires that where work equipment involves a specific risk to health or safety, its use is restricted to those designated persons who have been given the task of using it, and that repairs, modifications, maintenance or servicing are restricted to specifically designated persons.',
  },
  {
    id: 5,
    question: 'Regulations 8 and 9 of PUWER require employers to provide:',
    options: [
      'Personal protective equipment for every task without exception',
      'Adequate information, instruction and training on the use of work equipment',
      'A written permit to work before any equipment is used',
      'Free replacement tools whenever an employee requests them',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 8 requires adequate health and safety information (and written instructions where appropriate) on the use of work equipment. Regulation 9 requires adequate training for persons who use, supervise or manage the use of work equipment. This includes training on the risks involved, precautions to be taken, and the correct methods of use.',
  },
  {
    id: 6,
    question: 'Regulation 10 of PUWER requires that work equipment conforms to:',
    options: [
      'The internal quality standards set by the employer alone',
      'The British Standard for the trade in which it is used',
      'Essential requirements of relevant EU/UK product supply legislation (e.g., UKCA/CE marking)',
      'A minimum age and condition before it may be used at work',
    ],
    correctAnswer: 2,
    explanation:
      'Regulation 10 requires work equipment to comply with the essential requirements of relevant product supply legislation. For electrical equipment, this means conformity with the Electrical Equipment (Safety) Regulations 2016 and the Supply of Machinery (Safety) Regulations 2008 where applicable — evidenced by UKCA or CE marking.',
  },
  {
    id: 7,
    question:
      'Regulations 11 to 13 of PUWER cover protection against dangerous parts of machinery. Which measures are required?',
    options: [
      'A single fixed enclosing guard is sufficient on its own in every situation',
      'Only signage warning of the dangerous parts of the machinery is required',
      'Workers must simply be instructed to keep clear of the moving parts at all times',
      'A hierarchy of measures: guards, protection devices, then information, training and supervision',
    ],
    correctAnswer: 3,
    explanation:
      'Regulations 11–13 require a hierarchy of measures to prevent contact with dangerous parts: (1) fixed enclosing guards where practicable, (2) other guards or protection devices, (3) protection appliances (jigs, holders), and (4) provision of information, instruction, training and supervision. These are applied in descending order of preference.',
  },
  {
    id: 8,
    question:
      'Regulation 14 of PUWER requires controls for starting and stopping work equipment. For electrical maintenance equipment, this means:',
    options: [
      'Suitable controls for starting, stopping and emergency stop where needed — clearly visible and identifiable',
      'Equipment may only be started by a supervisor, and never directly by the operator using it',
      'All controls must be locked off the whole time the equipment is in use on site',
      'A single combined control should perform every function on the piece of equipment',
    ],
    correctAnswer: 0,
    explanation:
      'Regulations 14–18 require work equipment to have suitable and sufficient controls for starting, stopping (including emergency stop where there is a risk). Controls must be clearly visible, identifiable, and arranged so that inadvertent operation is prevented. For power tools, this means dead-man switches, trigger locks, and accessible stop controls.',
  },
  {
    id: 9,
    question:
      'Under PUWER, which of the following is an example of a maintenance record that should be kept?',
    options: [
      'A copy of the UKCA or CE declaration of conformity for the equipment',
      'A log of maintenance activities, inspections and any defects found — as required by Regulation 5(2)',
      'The original purchase receipt and warranty for the equipment',
      'A signed risk assessment for every task the equipment is used on',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 5(2) states that where a maintenance log is appropriate for the type of work equipment, it must be kept up to date. This should record inspection dates, maintenance carried out, defects found and remedied, and the name of the person carrying out the maintenance. For test instruments, this includes calibration records.',
  },
  {
    id: 10,
    question: 'How does PUWER 1998 interact with the EAWR 1989 for electrical maintenance?',
    options: [
      'PUWER fully replaces the EAWR for any electrical maintenance task',
      'The EAWR only applies once PUWER duties have been discharged',
      'They are complementary — PUWER covers the equipment itself, while the EAWR cover the electrical system being worked on and the safe system of work',
      'Only one of the two regulations can apply to any given task at a time',
    ],
    correctAnswer: 2,
    explanation:
      'PUWER and the EAWR are complementary. PUWER governs the suitability, maintenance, inspection and safe use of the equipment you use (your tools and instruments). The EAWR govern the electrical system you are working on and the safe systems of work. Both apply simultaneously — a maintenance technician must comply with both.',
  },
  {
    id: 11,
    question:
      'A power tool used for electrical maintenance has a damaged guard. Under PUWER, the maintenance technician should:',
    options: [
      'Continue using it carefully until the job in hand has been finished, then report it',
      'Remove the damaged guard completely so it cannot cause confusion during use',
      'Use it only for low-risk tasks until a replacement guard can be sourced and fitted',
      'Stop using it immediately, report the defect, and not use it until repaired or replaced',
    ],
    correctAnswer: 3,
    explanation:
      "Under Regulation 5 (maintenance), Regulation 11 (dangerous parts) and the employee's Section 7 HSWA duty, a damaged guard makes the equipment unsafe. It must be taken out of service immediately, the defect reported, and the equipment not used until properly repaired or replaced. Using damaged equipment is both a PUWER breach and a personal safety failure.",
  },
  {
    id: 12,
    question: 'Under ST1426, knowledge of PUWER is relevant because:',
    options: [
      'PUWER governs the provision, use and maintenance of all a technician’s equipment, from hand tools to test instruments',
      'PUWER removes the need to follow the manufacturer’s instructions for the tools in use',
      'PUWER applies only to office and administrative staff, and not to maintenance technicians',
      'PUWER sets out the detailed syllabus content for the apprenticeship qualification itself',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to understand the regulations governing their work equipment. PUWER directly governs every tool, instrument and piece of access equipment you use. Knowledge of PUWER requirements for suitability, maintenance, inspection, training and safe use is essential for regulatory compliance and for your End Point Assessment.',
  },
];

const faqs = [
  {
    question: 'Does PUWER apply to my personal tools that I bring to site?',
    answer:
      "If you use personal tools for work, they become 'work equipment' under PUWER and must meet the same standards of suitability, maintenance and safety. However, the primary duty under PUWER is on the employer to provide suitable work equipment. If your employer requires you to use your own tools, they must ensure those tools are suitable and safe. Many employers prohibit the use of personal tools for this reason.",
  },
  {
    question: "What counts as 'inspection' under PUWER Regulation 6?",
    answer:
      'Inspection can range from a simple visual check before use to a detailed examination by a competent person. The level of inspection depends on the risk. For a voltage indicator, a pre-use visual check for damage and a functional test is appropriate. For a portable appliance, combined inspection and testing (PAT) may be needed. For lifting equipment, a thorough examination under LOLER may be required (LOLER provides more specific requirements for lifting equipment).',
  },
  {
    question: 'How does PUWER relate to the Supply of Machinery (Safety) Regulations 2008?',
    answer:
      'The Supply of Machinery Regulations govern the design, manufacture and supply of new machinery — they impose duties on manufacturers and suppliers. PUWER governs the provision and use of equipment in the workplace — it imposes duties on employers and users. They are complementary: the manufacturer must ensure the machine is safe when supplied (UKCA/CE marking); the employer must ensure it is suitable, maintained and used safely in the workplace.',
  },
  {
    question: 'Do I need to keep records of every tool inspection?',
    answer:
      'PUWER Regulation 6(3) requires that inspections are recorded and kept until the next inspection. Regulation 5(2) requires maintenance logs where appropriate. In practice, most employers maintain an equipment register with inspection records for powered tools and test instruments. For simple hand tools, a pre-use visual check is normally sufficient without formal documentation, though company policies may require more.',
  },
  {
    question: 'What if my employer provides equipment that I believe is unsuitable or unsafe?',
    answer:
      'You should report your concerns to your supervisor or employer immediately. Under HSWA Section 7, you have a duty to take reasonable care — using equipment you know to be unsuitable could breach this duty. Under PUWER Regulation 4, your employer has a duty to provide suitable equipment. If the issue is not resolved, you can raise a concern with the HSE or your trade union safety representative.',
  },
];

const MOETModule1Section4_4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.4 · Subsection 4"
        title="PUWER — Provision and Use of Work Equipment Regulations 1998"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Legal requirements for all work equipment used by maintenance technicians.
          </p>

          <TLDR
            points={[
              'PUWER: Governs all work equipment — from hand tools to plant',
              'Reg 4: Equipment must be suitable for the purpose',
              'Reg 5: Maintained in efficient state and good repair',
              'Reg 19: Means of isolation from energy sources',
            ]}
          />

          <ConceptBlock title="Electrical Maintenance Context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Test instruments:</strong> GS38-compliant, calibrated, maintained
              </li>
              <li>
                <strong>Power tools:</strong> Suitable, guarded, inspected (110 V on site)
              </li>
              <li>
                <strong>Access equipment:</strong> Ladders, platforms, MEWPs — PUWER applies
              </li>
              <li>
                <strong>ST1426:</strong> Knowledge of equipment regulations for maintenance
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              "Explain the scope and purpose of PUWER 1998 and its definition of 'work equipment'",
              'Describe the suitability requirement (Reg 4) and how it applies to electrical tools',
              'Explain the maintenance and inspection requirements (Regs 5 and 6)',
              'Identify the information, instruction and training duties (Regs 8 and 9)',
              'Describe the controls and isolation requirements (Regs 14–19)',
              'Apply PUWER to test instruments, power tools and access equipment',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Scope of PUWER and suitability (Regulation 4)</ContentEyebrow>

          <ConceptBlock title="Scope of PUWER and Suitability (Regulation 4)">
            <p>
              The Provision and Use of Work Equipment Regulations 1998 (PUWER) implement the
              European Work Equipment Directive and were made under the Health and Safety at Work
              Act 1974. They apply to all work equipment provided for use or used at work — an
              extremely broad scope that covers everything from a simple screwdriver to a complex
              CNC machine.
            </p>
            <p>
              For electrical maintenance technicians, PUWER governs every tool and instrument you
              use daily: your voltage indicator, multifunction tester, insulation resistance tester,
              power tools, hand tools, ladders, steps, cable pulling equipment, torque wrenches, and
              crimping tools. Understanding PUWER is not optional — it is the law that governs the
              equipment you depend on for your safety.
            </p>
          </ConceptBlock>

          <ConceptBlock title='Definition of "Work Equipment" (Regulation 2)'>
            <p>
              &quot;Work equipment&quot; means any machinery, appliance, apparatus, tool or
              installation for use at work (whether exclusively or not). This includes:
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Hand tools — screwdrivers, pliers, cable strippers, spanners</li>
              <li>Power tools — drills, grinders, saws, crimping machines</li>
              <li>
                Test instruments — voltage indicators, MFTs, loop impedance testers, thermal cameras
              </li>
              <li>Access equipment — ladders, stepladders, scaffold towers, platforms</li>
              <li>Lifting equipment — chain hoists, cable winches (also subject to LOLER)</li>
              <li>PPE ancillary equipment — insulating mats, barriers, screening</li>
              <li>
                Installations — fixed plant such as compressors, generators, workshop equipment
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Regulation 4 — Suitability"
            onSite="Example: Using a standard multimeter (not GS38 compliant) to prove dead on a 230 V distribution board breaches Regulation 4 — the equipment is not suitable for the purpose. A GS38-compliant voltage indicator with fused probes, finger guards, and suitable CAT rating is required."
          >
            <p>
              Regulation 4 requires that work equipment is suitable for the purpose for which it is
              provided. Suitability must consider:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The initial integrity:</strong> Equipment must be constructed or adapted to
                be suitable — this includes selecting the correct rating, category, and
                specification
              </li>
              <li>
                <strong>The working conditions:</strong> The place where the equipment will be used
                (e.g., a damp cable tunnel, a dusty factory, an explosive atmosphere) must be
                considered
              </li>
              <li>
                <strong>Health and safety risks:</strong> Selection must account for the risks
                created by the use of the equipment and ensure they are eliminated or controlled
              </li>
              <li>
                <strong>Used only for suitable operations:</strong> Equipment must be used only for
                operations and under conditions for which it is suitable
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="PUWER Duties and Duty Holders">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Duty Holder</th>
                    <th className="border border-white/10 px-3 py-2 text-left">PUWER Duty</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Electrical Maintenance Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Employer</td>
                    <td className="border border-white/10 px-3 py-2">
                      Provide suitable equipment, maintain, inspect, train
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Provide calibrated MFT, maintain power tools, train on new instruments
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Self-employed</td>
                    <td className="border border-white/10 px-3 py-2">
                      Same duties as employer for own equipment
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Maintain own test instruments, keep calibration records
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Employee</td>
                    <td className="border border-white/10 px-3 py-2">
                      Use equipment correctly, report defects
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Pre-use checks, report damaged leads, do not misuse tools
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>
            Maintenance (Reg 5), inspection (Reg 6) and specific risks (Reg 7)
          </ContentEyebrow>

          <ConceptBlock title="Maintenance (Reg 5), Inspection (Reg 6) and Specific Risks (Reg 7)">
            <p>
              Regulations 5, 6 and 7 address the ongoing management of work equipment throughout its
              life. For maintenance technicians, these regulations are doubly relevant — they govern
              both the equipment you use and (in many cases) the equipment you maintain for others.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="PUWER 1998 — Regulation 5"
            clause="Every employer shall ensure that work equipment is maintained in an efficient state, in efficient working order and in good repair."
            meaning={
              <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Efficient state:</strong> The equipment functions as intended — test
                  instruments read accurately, power tools operate at correct speed
                </li>
                <li>
                  <strong>Efficient working order:</strong> All safety features are operational —
                  guards in place, dead-man switches functional, insulation intact
                </li>
                <li>
                  <strong>Good repair:</strong> No damage, wear or deterioration that could affect
                  safety or function
                </li>
                <li>
                  <strong>Maintenance log:</strong> Where appropriate to the nature of the
                  equipment, a maintenance log must be kept up to date
                </li>
              </ul>
            }
            cite="Reference: Provision and Use of Work Equipment Regulations 1998, Regulation 5"
          />

          <ConceptBlock title="Regulation 6 — Inspection">
            <p>Regulation 6 requires inspection at specific trigger points:</p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>After installation/assembly:</strong> Where safety depends on how the
                equipment is installed — check it is installed correctly before first use
              </li>
              <li>
                <strong>At suitable intervals:</strong> Regular inspections determined by risk
                assessment, manufacturer guidance, and operating conditions
              </li>
              <li>
                <strong>After exceptional circumstances:</strong> Following significant damage,
                prolonged disuse, modification, or any event that could have affected safety
              </li>
            </ul>
            <p>
              Inspection results must be recorded and kept available until the next inspection is
              recorded. The records must show the date, findings, and any actions taken.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Regulation 7 — Specific Risks">
            <p>
              Where the use of work equipment involves a specific risk to health or safety, the
              employer must restrict its use to designated persons who have received specific
              training. Maintenance and repair must also be restricted to designated persons. For
              electrical maintenance, this applies to specialised equipment such as HV phasing
              sticks, portable earthing equipment, cable fault locators used on energised systems,
              and live line tools.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Application to Electrical Test Instruments">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Instrument</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      PUWER Requirement
                    </th>
                    <th className="border border-white/10 px-3 py-2 text-left">Practical Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Voltage indicator</td>
                    <td className="border border-white/10 px-3 py-2">
                      Suitable (Reg 4), maintained (Reg 5)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      GS38 compliant, pre-use visual check, proving unit test
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Multifunction tester</td>
                    <td className="border border-white/10 px-3 py-2">
                      Suitable, maintained, calibrated
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Annual calibration, pre-use check, intact leads with fused probes
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Insulated tools</td>
                    <td className="border border-white/10 px-3 py-2">
                      Suitable (VDE rated), maintained
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Pre-use check for damaged insulation, replace if compromised
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Thermal imaging camera</td>
                    <td className="border border-white/10 px-3 py-2">Suitable, training (Reg 9)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Trained user, calibrated, suitable for voltage rating of panels
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Lock-off kit</td>
                    <td className="border border-white/10 px-3 py-2">
                      Suitable, maintained (Reg 5)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Correct type for isolation devices on site, locks in good condition
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Information, training and conformity (Regs 8–10)</ContentEyebrow>

          <ConceptBlock title="Information, Training and Conformity (Regs 8–10)">
            <p>
              Regulations 8, 9 and 10 ensure that persons using work equipment have the knowledge
              needed to use it safely, and that the equipment itself meets required product safety
              standards. These regulations are complementary to the EAWR Regulation 16 (competence)
              and the HSWA Section 2(2)(c) (training).
            </p>
          </ConceptBlock>

          <ConceptBlock title="Regulation 8 — Information and Instructions">
            <p>
              Employers must ensure that all persons who use, supervise or manage work equipment
              have adequate health and safety information, including written instructions where
              appropriate. This covers:
            </p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Conditions in which the equipment may be used</li>
              <li>Foreseeable abnormal situations and the action to take</li>
              <li>Conclusions from experience of using the equipment (lessons learned)</li>
              <li>Manufacturer&apos;s instructions where relevant</li>
            </ul>
            <p>
              For test instruments, this means access to the operating manual, understanding of
              measurement categories (CAT I–IV), and knowledge of the limitations of each
              instrument.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Regulation 9 — Training"
            onSite="Example: Before using a new type of insulation resistance tester, you should receive training on its operation, its safety features, and any differences from the previous model. For complex equipment like HV test sets, formal manufacturer training may be required."
          >
            <p>Employers must ensure adequate training is provided for:</p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>Persons who use the equipment — methods of use, risks, precautions</li>
              <li>
                Persons who supervise or manage the use — knowledge to ensure safe use by others
              </li>
              <li>
                Training must be adequate — proportionate to the risk and complexity of the
                equipment
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Regulation 10 — Conformity with Community Requirements">
            <p>
              Work equipment must conform to relevant product supply legislation. For electrical
              equipment, this includes the Electrical Equipment (Safety) Regulations 2016 (LVD), the
              Electromagnetic Compatibility Regulations 2016 (EMC), and the Supply of Machinery
              (Safety) Regulations 2008 where applicable. Conformity is normally demonstrated by
              UKCA or CE marking and a Declaration of Conformity. As a maintenance technician, you
              should verify that test instruments and power tools carry the appropriate markings.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Dangerous parts, controls and isolation (Regs 11–19)</ContentEyebrow>

          <ConceptBlock title="Dangerous Parts, Controls and Isolation (Regs 11–19)">
            <p>
              Regulations 11 to 19 address the physical safety features of work equipment — guarding
              against dangerous parts, controls for operation, and means of isolation. Regulation 19
              (isolation from energy sources) is particularly relevant to electrical maintenance, as
              it complements the safe isolation requirements of EAWR Regulations 12 and 13.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Regulations 11–13 — Dangerous Parts of Machinery">
            <p>A hierarchy of measures must be applied to prevent access to dangerous parts:</p>
            <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Priority 1:</strong> Fixed enclosing guards (most effective — e.g., guards
                on bench grinders)
              </li>
              <li>
                <strong>Priority 2:</strong> Other guards or protection devices (e.g., interlocked
                guards, light curtains)
              </li>
              <li>
                <strong>Priority 3:</strong> Protection appliances (jigs, holders, push sticks)
              </li>
              <li>
                <strong>Priority 4:</strong> Information, instruction, training and supervision
                (least effective — last resort)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Regulations 14–18 — Controls">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reg 14 — Controls:</strong> Suitable and sufficient controls for starting,
                stopping and changing operating conditions. Controls must be clearly visible and
                identifiable
              </li>
              <li>
                <strong>Reg 15 — Stop controls:</strong> Readily accessible, bringing equipment to a
                safe condition as quickly as possible
              </li>
              <li>
                <strong>Reg 16 — Emergency stop:</strong> Where there is a risk, emergency stop
                controls must be provided — readily accessible, coloured red on yellow background
              </li>
              <li>
                <strong>Reg 17 — Controls (additional):</strong> Controls positioned so the operator
                can see that no person is at risk. Audible/visual warnings where necessary
              </li>
              <li>
                <strong>Reg 18 — Control systems:</strong> Must be safe — failure of the control
                system must not create additional risks. Control systems should be designed to fail
                safe
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="PUWER 1998 — Regulation 19"
            clause="Every employer shall ensure that where appropriate work equipment is provided with suitable means to isolate it from all its sources of energy."
            meaning={
              <>
                <ul className="list-disc space-y-1 pl-5 marker:text-elec-yellow/70">
                  <li>
                    Applies to all energy sources — electrical, pneumatic, hydraulic, mechanical
                    (stored energy), thermal
                  </li>
                  <li>
                    The means of isolation must be clearly identifiable and readily accessible
                  </li>
                  <li>Reconnection must not expose any person to risk</li>
                  <li>Complements EAWR Regs 12 and 13 for electrical isolation specifically</li>
                </ul>
                <p>
                  For maintenance technicians working on motor-driven equipment, you must isolate
                  both the electrical supply (EAWR) and any other energy sources (PUWER Reg 19) —
                  pneumatic, hydraulic, gravitational (raised loads), or stored mechanical energy
                  (springs, flywheels).
                </p>
              </>
            }
            cite="Reference: Provision and Use of Work Equipment Regulations 1998, Regulation 19"
          />

          <ConceptBlock title="Records and Documentation">
            <p>
              PUWER requires maintenance logs (Regulation 5(2)) where appropriate, and inspection
              records (Regulation 6(3)) to be kept until the next inspection. For electrical
              maintenance technicians, good practice includes maintaining: a tool and instrument
              register, calibration certificates for test instruments, records of PAT testing for
              portable power tools, pre-use check records for access equipment, and training records
              for specialised equipment. These records demonstrate compliance and support a defence
              of due diligence.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Relevance to your ST1426 assessment">
            <p>
              <em>
                PUWER is one of the &quot;six-pack&quot; regulations that every maintenance
                technician must understand. Your EPA will expect you to demonstrate knowledge of
                equipment suitability, maintenance, inspection, and safe use — particularly as they
                apply to the specific tools and instruments you use in electrical maintenance.
              </em>
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 4 — Suitability for purpose',
              'Reg 5 — Maintenance in efficient state',
              'Reg 6 — Inspection at suitable intervals',
              'Reg 7 — Specific risks — designated persons',
              'Regs 8/9 — Information, instruction, training',
              'Reg 10 — Product conformity (UKCA/CE)',
              'Regs 11–13 — Guarding dangerous parts',
              'Regs 14–18 — Controls and emergency stop',
              'Reg 19 — Isolation from energy sources',
              'Voltage indicators — GS38, pre-use check',
              'MFTs — calibrated, intact leads',
              'Power tools — guarded, 110 V on site, PAT tested',
              'Insulated tools — VDE rated, inspect insulation',
              'Lock-off kits — correct type, good condition',
              'Access equipment — inspected, suitable height',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section4-3')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  BS 7671 Wiring Regulations
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section4-5')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">LOLER 1998</div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section4_4;
