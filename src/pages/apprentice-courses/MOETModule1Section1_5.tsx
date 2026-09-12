/**
 * MOET · Module 1 · Section 1.1 · Subsection 5 — Working in Confined Spaces
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
 *   Knowledge  · "Safe systems of work."
 *              · "Work environment hazards and risks. Risk assessments."
 *              · "Individual maintenance technician's roles and
 *                 responsibilities. Escalation procedures."
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
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Working in Confined Spaces - MOET Module 1.1.5';
const DESCRIPTION =
  'Comprehensive guide to the Confined Spaces Regulations 1997 for electrical maintenance technicians: hazard identification, atmospheric monitoring, entry permits, rescue arrangements, and electrical work in cable tunnels, manholes and switchrooms.';

const quickCheckQuestions = [
  {
    id: 'confined-space-definition',
    question:
      "Which of the following correctly defines a 'confined space' under the Confined Spaces Regulations 1997?",
    options: [
      'A space that is substantially enclosed AND has a reasonably foreseeable risk of serious injury from hazardous conditions',
      'Any room below ground level, regardless of the hazards present or the means of access',
      'A space that can only be entered through an opening of less than 600 mm diameter',
      'Any enclosed space in which a worker must work alone for more than one hour',
    ],
    correctIndex: 0,
    explanation:
      'Under the Confined Spaces Regulations 1997, a confined space has two defining characteristics: (1) it is substantially (but not necessarily entirely) enclosed, AND (2) there is a reasonably foreseeable risk of serious injury from hazardous conditions within the space or nearby. Both conditions must be met. A small room is not a confined space if there are no foreseeable hazards; a large tank IS a confined space if there is a risk of toxic atmosphere.',
  },
  {
    id: 'atmospheric-monitoring',
    question: 'When must atmospheric monitoring be carried out for confined space entry?',
    options: [
      'Only when the space smells unusual',
      'Only when gas cylinders are present nearby',
      'Only at the start of the working day',
      'Before entry AND continuously throughout the work',
    ],
    correctIndex: 3,
    explanation:
      'Atmospheric monitoring must be carried out before entry to confirm the atmosphere is safe, and then continuously throughout the work. Conditions can change during the work — oxygen can be depleted by work processes, toxic gases can accumulate, and ventilation can fail. Continuous monitoring with an audible alarm is essential. Never rely on a single pre-entry test.',
  },
  {
    id: 'rescue-arrangements',
    question:
      'Under the Confined Spaces Regulations 1997, when must rescue arrangements be in place?',
    options: [
      "Only when the space is classified as 'high risk'",
      'Only when more than two people are entering the space',
      'Before any person enters the confined space',
      'Only when requested by the site safety officer',
    ],
    correctIndex: 2,
    explanation:
      'Regulation 5 of the Confined Spaces Regulations 1997 requires that suitable and sufficient rescue arrangements are in place BEFORE any person enters a confined space. This includes rescue equipment, trained rescuers, communication systems, and emergency services notification. Rescue is the most critical element — more people die attempting rescues in confined spaces than are killed by the initial incident.',
  },
  {
    id: 'oxygen-levels',
    question:
      'What is the normal oxygen concentration in air, and at what level must entry be prevented?',
    options: [
      'Normal is 21%; entry prevented below 23%',
      'Normal is 20.9%; entry prevented only below 16%',
      'Normal is 25%; entry prevented below 20%',
      'Normal is 20.9%; entry prevented below 19.5% or above 23.5%',
    ],
    correctIndex: 3,
    explanation:
      'Normal atmospheric oxygen concentration is approximately 20.9%. Entry must be prevented when oxygen levels fall below 19.5% (oxygen-deficient — risk of impaired judgement, unconsciousness, death) or rise above 23.5% (oxygen-enriched — greatly increased fire and explosion risk). Both conditions are dangerous. Many confined space fatalities involve oxygen depletion, which can occur without warning because the human senses cannot detect falling oxygen levels.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under the Confined Spaces Regulations 1997, the FIRST principle employers must apply is:',
    options: [
      'Provide respiratory protective equipment for all workers',
      'Avoid entry into confined spaces where reasonably practicable',
      'Install permanent ventilation in all confined spaces',
      'Employ a dedicated confined space rescue team',
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 4(1) states: 'No person at work shall enter a confined space to carry out work for any purpose unless it is not reasonably practicable to achieve that purpose without such entry.' Avoidance is always the first priority. If the work can be done from outside — using remote tools, CCTV, extended equipment, or by redesigning the task — entry must be avoided.",
  },
  {
    id: 2,
    question:
      'Which of the following is a confined space hazard that can kill WITHOUT any warning?',
    options: [
      'Water ingress — the rising level is visible and gives time to evacuate before it becomes critical',
      'Heat stress — the rising temperature is felt by the worker well before it becomes dangerous',
      'Oxygen depletion — the atmosphere becomes oxygen-deficient without any detectable change in smell or visibility',
      'Restricted egress — the narrow access point is obvious and assessed before any entry is made',
    ],
    correctAnswer: 2,
    explanation:
      'Oxygen depletion is one of the most insidious confined space hazards because human senses cannot detect it. There is no smell, no visible change, and no warning sensation. As oxygen drops below 16%, the victim experiences impaired judgement, then rapid loss of consciousness, then death — often in seconds. This is why atmospheric monitoring with calibrated instruments is essential.',
  },
  {
    id: 3,
    question: 'A safe system of work for confined space entry must include:',
    options: [
      'A single pre-entry atmospheric test, after which continuous monitoring is not required',
      'Forced (mechanical) ventilation using explosion-proof fans, providing a continuous supply of clean air',
      'A generic confined space risk assessment that covers all spaces on the site',
      'A written risk assessment, entry permit, atmospheric monitoring, ventilation, communication, and rescue arrangements',
    ],
    correctAnswer: 3,
    explanation:
      'A safe system of work for confined space entry is comprehensive: it includes a written risk assessment specific to the space and task, a formal entry permit, pre-entry and continuous atmospheric monitoring, forced ventilation, communication systems, rescue equipment and trained rescuers, PPE/RPE where needed, and defined roles and responsibilities. No single element is sufficient alone.',
  },
  {
    id: 4,
    question: "What is the role of the 'top man' (attendant/banksman) during confined space entry?",
    options: [
      'To remain at the entry point, maintain communication, monitor conditions, and initiate rescue if needed',
      'To enter the space first to confirm it is safe, then signal the others to follow',
      'To carry out the atmospheric testing and then leave once entry has been authorised',
      'To be the first to enter the space and perform a hands-on rescue if a colleague collapses',
    ],
    correctAnswer: 0,
    explanation:
      'The top man (attendant) remains at the entry point throughout the entry. They must never enter the space. Their duties include: maintaining constant communication with the entrants, monitoring atmospheric conditions, controlling access to the space, keeping a log of entrants, and — critically — raising the alarm and initiating the rescue procedure if an emergency occurs. The top man is the link between the confined space and the outside world.',
  },
  {
    id: 5,
    question: 'A multi-gas detector used for confined space entry should monitor for a minimum of:',
    options: [
      'Oxygen and carbon dioxide only',
      'Oxygen, flammable gases (LEL), carbon monoxide, and hydrogen sulphide',
      'Flammable gases (LEL) and temperature only',
      'Carbon monoxide and humidity only',
    ],
    correctAnswer: 1,
    explanation:
      'A standard 4-gas detector monitors: oxygen (O2) for depletion or enrichment, flammable gases measured as a percentage of the Lower Explosive Limit (LEL), carbon monoxide (CO) — a common toxic gas from combustion or chemical reaction, and hydrogen sulphide (H2S) — toxic gas from decomposing organic matter. Additional sensors may be required depending on the specific hazards identified in the risk assessment.',
  },
  {
    id: 6,
    question:
      'Before entering an electrical cable tunnel for maintenance, which additional hazard must be specifically assessed?',
    options: [
      'Wind chill from the through-draught created by the tunnel acting as a flue',
      'Static electricity build-up on the worker’s clothing from walking along the tunnel',
      'Electromagnetic fields from energised cables, heat from cable runs, and the risk of arc flash in an enclosed space',
      'Ultraviolet exposure from the cable insulation degrading under load',
    ],
    correctAnswer: 2,
    explanation:
      'Electrical cable tunnels present specific hazards beyond the standard confined space risks: electromagnetic fields from high-current cables, radiated heat from loaded cable runs (which can also deplete oxygen and increase temperature), arc flash risk in a confined environment (where blast pressure has nowhere to dissipate), and the presence of potentially damaged or degraded cable insulation. These must be specifically assessed and controlled.',
  },
  {
    id: 7,
    question:
      'What is the maximum recommended concentration of carbon monoxide (CO) for confined space entry?',
    options: [
      '500 ppm, the level at which symptoms first appear',
      '100 ppm, matching the 15-minute short-term exposure limit',
      '100 ppm, with no alarm required below this level',
      '20 ppm (the 8-hour WEL), with detectors typically alarming at or below it',
    ],
    correctAnswer: 3,
    explanation:
      'Under the current HSE EH40 Workplace Exposure Limits, carbon monoxide is 20 ppm as an 8-hour TWA and 100 ppm as a 15-minute STEL. (The older 30 ppm / 200 ppm figures were transitional limits that applied to underground mining and tunnelling only, and lapsed on 21 August 2023 — they are still widely misquoted.) For confined space work, detectors are set to alarm at or below the 8-hour limit to give an early warning margin. CO is particularly dangerous because it is odourless and colourless — it binds to haemoglobin 200 times more strongly than oxygen, causing rapid suffocation at the cellular level.',
  },
  {
    id: 8,
    question: 'Ventilation in a confined space should be:',
    options: [
      'Forced (mechanical) ventilation using explosion-proof fans, providing a continuous supply of clean air',
      'Natural ventilation through the open entry hatch, which is sufficient for most spaces',
      'Provided only if the pre-entry atmospheric test shows the air is unsafe',
      'Supplied from an oxygen cylinder to raise the oxygen level well above 21%',
    ],
    correctAnswer: 0,
    explanation:
      'Natural ventilation through the entry point is rarely sufficient for confined spaces. Forced (mechanical) ventilation using fans rated for the environment (explosion-proof/ATEX if flammable atmospheres are possible) must provide a continuous supply of clean air. The air intake must be positioned away from any contamination source (vehicle exhausts, process vents). The ventilation rate must achieve adequate air changes per hour for the space volume.',
  },
  {
    id: 9,
    question:
      'More people die attempting rescues in confined spaces than are killed by the initial incident. This is because:',
    options: [
      'Rescuers disturb the contaminated atmosphere, releasing trapped gases that were previously settled',
      'Would-be rescuers enter without protection and are overcome by the same hazard that affected the first person',
      'Rescuers are usually less experienced than the original entrant and make more mistakes',
      'The extra body heat from the rescuers accelerates the depletion of the remaining oxygen',
    ],
    correctAnswer: 1,
    explanation:
      "The phenomenon of 'multiple-casualty confined space incidents' occurs when well-meaning colleagues enter a confined space to rescue a fallen worker — without breathing apparatus or atmospheric monitoring — and are overcome by the same hazardous atmosphere. In many documented incidents, 2-3 additional people have died trying to rescue the first victim. This is why planned rescue arrangements with proper equipment and training are essential — and why untrained, spontaneous rescue attempts must be prevented.",
  },
  {
    id: 10,
    question: 'An entry permit for a confined space must include:',
    options: [
      'Only the name of the entrant and the expected duration of the work',
      'The contractor’s insurance details and the client’s method statement reference',
      'Identification of the space, hazards, controls, atmospheric readings, entrant names, time limits, communication, and rescue arrangements',
      'A general statement that the space has been deemed safe by the site manager',
    ],
    correctAnswer: 2,
    explanation:
      'A confined space entry permit is a detailed document specific to the particular space and task. It must include: precise identification of the space, identified hazards, control measures in place, atmospheric monitoring readings (pre-entry and ongoing), names of all entrants and the top man, time limits, communication arrangements, rescue arrangements, PPE/RPE requirements, and authorisation signatures. A generic permit does not provide adequate protection.',
  },
  {
    id: 11,
    question:
      'When carrying out electrical work in a manhole or cable pit, what specific electrical hazard exists that does not apply in open-air situations?',
    options: [
      'The supply voltage is automatically doubled when working below ground level',
      'Earth fault loop impedance cannot be measured in any below-ground location',
      'RCDs will not operate when the installation is in a damp underground environment',
      'Arc flash energy in a confined space has nowhere to dissipate, increasing blast pressure and thermal exposure',
    ],
    correctAnswer: 3,
    explanation:
      'In an open-air environment, the energy from an arc flash can dissipate in all directions. In a confined space such as a manhole, the blast pressure wave is contained and reflected by the walls, greatly amplifying the pressure and thermal effects on anyone inside. The confined space acts like a pressure vessel during the arc event. This means that arc flash risk assessments for confined spaces must account for the containment effect, and PPE requirements may be more stringent.',
  },
  {
    id: 12,
    question:
      'Under the Confined Spaces Regulations 1997, who is responsible for ensuring a safe system of work is in place?',
    options: [
      'The employer (or self-employed person), who must ensure no employee enters a confined space without a safe system of work',
      'The individual entrant, who must devise their own safe system before each entry',
      'The HSE inspector, who must approve the safe system of work before any entry',
      'The emergency services, who set the safe system of work when they are notified',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 4 places the duty on the employer to ensure that no employee enters a confined space to carry out work unless a safe system of work has been established. The employer must provide the risk assessment, the safe system of work, the equipment, the training, and the rescue arrangements. Employees have a duty to cooperate with these arrangements and not to enter without authorisation.',
  },
];

const faqs = [
  {
    question: 'Is a switchroom a confined space?',
    answer:
      'It depends. A standard walk-in switchroom with adequate ventilation and normal access is generally not a confined space. However, a switchroom can become a confined space if it has limited access (e.g., accessed via a manhole or restricted hatch), poor ventilation, or foreseeable hazards such as gas accumulation from battery rooms or SF6 leaks from switchgear. The key question is always: does the space meet BOTH criteria — substantially enclosed AND foreseeable risk of serious injury from hazardous conditions?',
  },
  {
    question:
      "Can I enter a confined space 'just for a quick look' without a full entry procedure?",
    answer:
      "No. There is no exemption for brief entry. The hazards in a confined space — particularly atmospheric hazards — can incapacitate and kill in seconds. An oxygen-depleted atmosphere will cause loss of consciousness within 1-2 breaths. Every entry, regardless of duration or purpose, requires atmospheric monitoring, a risk assessment, and rescue arrangements. A 'quick look' without these controls has killed many workers.",
  },
  {
    question: 'What qualifications do I need to enter a confined space?',
    answer:
      'At minimum, you need confined space entry training covering: hazard recognition, atmospheric monitoring, use of gas detectors, emergency procedures, and the use of any required RPE. Many employers require training to a standard such as City & Guilds 6150 or equivalent. The level of training depends on your role — entrants need a different level of competence to supervisors or rescue team members. Competence must be specific to the type of confined space you will be entering.',
  },
  {
    question: 'What is an ATEX zone and how does it affect electrical work in confined spaces?',
    answer:
      "ATEX (from the French 'ATmospheres EXplosibles') zones classify areas where explosive atmospheres may exist. Zone 0: continuously explosive; Zone 1: likely during normal operations; Zone 2: unlikely but possible. Confined spaces that may contain flammable gases or vapours must be classified under the Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR). All electrical equipment used within ATEX zones must be certified for that zone — standard tools, phones, and torches can provide an ignition source.",
  },
  {
    question:
      'How does SF6 (sulphur hexafluoride) gas affect confined space entry near HV switchgear?',
    answer:
      'SF6 is used as an insulating and arc-quenching gas in HV switchgear. It is five times heavier than air and will accumulate at low points — cable pits, basements, and trenches below SF6 switchgear. While pure SF6 is non-toxic, it displaces oxygen and can cause rapid asphyxiation. Additionally, when SF6 is decomposed by electrical arcs, it produces toxic byproducts including sulphur dioxide and hydrogen fluoride. Any confined space near SF6 switchgear must be monitored for both oxygen depletion and SF6 decomposition products.',
  },
];

const MOETModule1Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.1 · Subsection 5"
        title="Working in Confined Spaces"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Safe entry, atmospheric monitoring, and rescue planning for electrical maintenance in
            enclosed environments
          </p>

          <TLDR
            points={[
              'Law: Confined Spaces Regulations 1997 — avoid entry where possible',
              'Hazards: Toxic atmosphere, O2 depletion, flooding, entrapment, fire/explosion',
              'Controls: Risk assessment, entry permit, monitoring, ventilation, rescue plan',
              'Rule: Never enter without atmospheric monitoring and rescue arrangements',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define a confined space under the Confined Spaces Regulations 1997',
              'Identify the principal hazards associated with confined space entry',
              'Describe the safe system of work required for confined space entry',
              'Explain atmospheric monitoring requirements and alarm thresholds',
              'State the requirements for entry permits and rescue arrangements',
              'Apply confined space procedures to electrical maintenance scenarios',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What is a confined space?</ContentEyebrow>

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable tunnels:</strong> O2 depletion, heat, arc flash containment
              </li>
              <li>
                <strong>Manholes:</strong> Water ingress, gas accumulation, cramped access
              </li>
              <li>
                <strong>Switchrooms:</strong> SF6 gas, battery fumes, limited ventilation
              </li>
              <li>
                <strong>ST1426:</strong> Confined space awareness is a core safety competency
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Two conditions, both must be met">
            <p>
              The Confined Spaces Regulations 1997 define a confined space by two characteristics
              that must both be present: the space is substantially (but not necessarily entirely)
              enclosed, AND there is a reasonably foreseeable risk of serious injury from hazardous
              conditions within the space or in connection with it. This definition is deliberately
              broad — it is based on risk, not physical dimensions.
            </p>
            <p>
              A large warehouse with open doors is not a confined space. A small utility cupboard
              with good ventilation and no hazardous conditions is not a confined space. But a cable
              tunnel beneath a substation — even if it is 50 metres long — IS a confined space if
              there is a foreseeable risk of oxygen depletion, toxic gas accumulation, or flooding.
              The key is always the combination of enclosure and hazard.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The statistics">
            <p>
              HSE data shows that approximately 15 workers are killed in confined space incidents in
              the UK each year, with a further significant number suffering serious injuries. A
              critical finding is that over 60% of deaths in confined spaces are of people
              attempting to rescue the first victim — would-be rescuers who enter without protection
              and are overcome by the same hazard. Planned, equipped, and trained rescue
              arrangements are the single most important control measure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common confined spaces in electrical maintenance">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Space</th>
                    <th className="py-2 pr-4 font-medium text-white">Typical work</th>
                    <th className="py-2 font-medium text-white">Specific hazards</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Cable tunnels</td>
                    <td className="py-2 pr-4">Cable installation, jointing, fault repair</td>
                    <td className="py-2">
                      O2 depletion, heat from cables, flooding, limited egress, arc flash
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Manholes and cable pits</td>
                    <td className="py-2 pr-4">Cable pulling, jointing, testing</td>
                    <td className="py-2">
                      Gas accumulation (methane, CO, H2S), water ingress, cramped access
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Transformer chambers</td>
                    <td className="py-2 pr-4">Transformer maintenance, oil sampling</td>
                    <td className="py-2">
                      Oil fumes, heat, SF6 (if gas-insulated), restricted egress
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Battery rooms</td>
                    <td className="py-2 pr-4">UPS battery replacement, testing</td>
                    <td className="py-2">
                      Hydrogen gas from charging, sulphuric acid, poor ventilation
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Underground substations</td>
                    <td className="py-2 pr-4">HV switchgear maintenance</td>
                    <td className="py-2">SF6 gas, O2 depletion, flooding, limited access/egress</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Risers and ducts</td>
                    <td className="py-2 pr-4">Vertical cable runs, containment</td>
                    <td className="py-2">Fall hazard, restricted movement, poor ventilation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Legal framework"
            onSite="Key principle: Regulation 4(1) is absolute — you must not enter a confined space if the work can be done without entry. Always explore alternatives first: remote monitoring, CCTV inspection, mechanical handling, or redesigning the task."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Legislation</th>
                    <th className="py-2 font-medium text-white">Relevance to confined spaces</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Confined Spaces Regulations 1997</td>
                    <td className="py-2">
                      Primary legislation — avoid entry, safe system of work, rescue
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">HSWA 1974, s.2</td>
                    <td className="py-2">General duty to provide safe systems of work</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">MHSWR 1999, Reg 3</td>
                    <td className="py-2">Risk assessment for all work activities</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">EAWR 1989</td>
                    <td className="py-2">
                      Electrical safety requirements for work in confined electrical spaces
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">DSEAR 2002</td>
                    <td className="py-2">ATEX zoning for flammable atmospheres</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">ACoP L101</td>
                    <td className="py-2">
                      HSE Approved Code of Practice for the Confined Spaces Regulations
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Confined space hazards</ContentEyebrow>

          <ConceptBlock title="Hazards amplified by enclosure and restricted escape">
            <p>
              Confined space hazards are particularly dangerous because they are often invisible,
              the enclosed environment amplifies their effects, and escape routes are typically
              restricted. A hazard that might be manageable in an open environment can be
              immediately lethal in a confined space. Understanding each hazard type and its
              mechanisms is essential for risk assessment and control.
            </p>
          </ConceptBlock>

          <ConceptBlock title="1. Toxic atmosphere">
            <p>
              Toxic gases and vapours can accumulate in confined spaces from multiple sources:
              decomposing organic matter (produces methane, hydrogen sulphide, carbon dioxide),
              chemical reactions, industrial processes, vehicle exhausts, and work activities
              (soldering fumes, adhesive vapours).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Gas</th>
                    <th className="py-2 pr-4 font-medium text-white">Source</th>
                    <th className="py-2 pr-4 font-medium text-white">WEL (8-hr TWA)</th>
                    <th className="py-2 font-medium text-white">Danger level</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Carbon monoxide (CO)</td>
                    <td className="py-2 pr-4">Combustion, engines, welding</td>
                    <td className="py-2 pr-4">20 ppm</td>
                    <td className="py-2">400 ppm dangerous; 1,200+ ppm fatal</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Hydrogen sulphide (H2S)</td>
                    <td className="py-2 pr-4">Decomposition, sewers, drains</td>
                    <td className="py-2 pr-4">5 ppm</td>
                    <td className="py-2">100 ppm paralyses smell; 500+ ppm fatal</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Methane (CH4)</td>
                    <td className="py-2 pr-4">Decomposition, natural gas leaks</td>
                    <td className="py-2 pr-4">n/a (asphyxiant)</td>
                    <td className="py-2">5-15% LEL explosive range</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Sulphur hexafluoride (SF6)</td>
                    <td className="py-2 pr-4">HV switchgear</td>
                    <td className="py-2 pr-4">1,000 ppm</td>
                    <td className="py-2">Displaces O2; decomposition products toxic</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Hydrogen (H2)</td>
                    <td className="py-2 pr-4">Battery charging</td>
                    <td className="py-2 pr-4">n/a</td>
                    <td className="py-2">4-75% explosive range; ignites easily</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="2. Oxygen depletion and enrichment">
            <p>
              Oxygen depletion occurs when oxygen is consumed by chemical reactions (rusting,
              fermentation), displaced by other gases, or absorbed by materials. Oxygen enrichment
              occurs from leaking oxygen cylinders or oxygen-using processes.
            </p>
            <p>
              <strong>Oxygen depletion effects:</strong> 20.9% — normal atmosphere; 19.5% — minimum
              safe level for entry; 16% — impaired judgement, rapid breathing; 12% — loss of
              consciousness in seconds; 6% — death within minutes.
            </p>
            <p>
              <strong>Oxygen enrichment risks:</strong> 23.5% — maximum safe level for entry; above
              23.5% — greatly increased fire risk; materials that do not normally burn will ignite;
              clothing becomes highly flammable; even a small spark can cause fierce fire.
            </p>
          </ConceptBlock>

          <ConceptBlock title="3. Flooding and ingress">
            <p>
              Underground confined spaces — cable tunnels, manholes, pits — are at risk of water
              ingress from groundwater, broken pipes, surface drainage, and tidal flooding. Water
              levels can rise rapidly and without warning. Electrical work in a flooded or wet
              confined space creates an additional electrocution risk, even at low voltages. Pumping
              arrangements and water level monitoring must be established before entry.
            </p>
          </ConceptBlock>

          <ConceptBlock title="4. Entrapment and limited egress">
            <p>
              Confined spaces often have narrow access points — manholes, hatches, ducts — that
              restrict rapid exit in an emergency. If a worker is injured or overcome by fumes,
              rescue through a narrow opening is extremely difficult. Free-flowing materials (sand,
              grain, water) can engulf a worker, and converging walls or machinery can trap them.
              Access and egress routes must be assessed and kept clear at all times.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="5. Fire and explosion"
            onSite="Critical warning: many confined space hazards are invisible and odourless. You cannot smell oxygen depletion. Carbon monoxide is odourless. Hydrogen sulphide paralyses the sense of smell at dangerous concentrations. Never rely on your senses — always use calibrated instruments."
          >
            <p>
              Flammable gases (methane, hydrogen, solvents) can accumulate in confined spaces to
              reach explosive concentrations. In a confined space, an explosion is magnified by the
              containment effect — the blast pressure has nowhere to escape and is amplified
              dramatically. Electrical sparks, hot work, and non-ATEX-rated equipment can provide
              the ignition source. All electrical equipment used in potentially explosive confined
              spaces must be certified to the appropriate ATEX category.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Safe system of work and entry permits</ContentEyebrow>

          <ConceptBlock title="A comprehensive, documented procedure">
            <p>
              When entry to a confined space cannot be avoided, Regulation 4(2) of the Confined
              Spaces Regulations requires that a safe system of work is established. This is a
              comprehensive, documented procedure that addresses every identified hazard and
              provides verifiable controls. The safe system of work is typically documented through
              a confined space entry permit — a formal authorisation document similar in principle
              to the permit to work systems covered in Module 1.1.1.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Elements of a safe system of work">
            <ul className="list-disc space-y-2 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Risk assessment.</strong> A specific risk assessment for the particular
                confined space and task. This must identify all foreseeable hazards, the persons at
                risk, and the control measures required. A generic &apos;confined space risk
                assessment&apos; is not sufficient — each entry must be individually assessed.
              </li>
              <li>
                <strong>2. Atmospheric monitoring.</strong> Pre-entry testing using a calibrated
                multi-gas detector (minimum: O2, LEL, CO, H2S). The detector must be lowered into
                the space before anyone enters — conditions at the top of a space may differ from
                the bottom. Continuous monitoring throughout the work with audible and visual alarms
                set at action levels.
              </li>
              <li>
                <strong>3. Ventilation.</strong> Forced mechanical ventilation to provide a
                continuous supply of clean air. The ventilation rate must be sufficient to maintain
                safe atmospheric conditions throughout the work. Air intakes must be positioned away
                from contamination sources (exhausts, process vents, road traffic). Explosion-proof
                (ATEX) fans where flammable atmospheres are possible.
              </li>
              <li>
                <strong>4. Isolation of hazards.</strong> Pipework blanked or disconnected (not just
                valved off). Electrical supplies isolated and locked out. Mechanical equipment
                secured. Chemical feeds disconnected. This goes beyond the standard LOTO procedure —
                in confined spaces, valves alone are not acceptable isolation because they can leak
                or be opened inadvertently.
              </li>
              <li>
                <strong>5. Communication.</strong> Constant communication between the entrant(s) and
                the top man. Methods include: visual contact, voice communication, radio, rope
                signals, or closed-circuit TV. The communication method must work reliably in the
                specific space — radio may not work in some metallic enclosures.
              </li>
              <li>
                <strong>6. Personal protective equipment.</strong> Appropriate PPE and RPE as
                identified by the risk assessment. This may include: breathing apparatus
                (self-contained or airline), harness for rescue, head protection, eye protection,
                knee pads, and appropriate clothing. RPE must be face-fit tested for the individual
                wearer.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Confined space entry permit — key contents">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Precise identification of the confined space</li>
              <li>Description of the work to be carried out</li>
              <li>Hazards identified and controls in place</li>
              <li>Atmospheric monitoring readings (pre-entry)</li>
              <li>Ventilation arrangements</li>
              <li>Isolation details (electrical, mechanical, chemical)</li>
              <li>Names of all entrants and the top man</li>
              <li>PPE/RPE requirements</li>
              <li>Communication method</li>
              <li>Rescue arrangements and equipment</li>
              <li>Time limits and review intervals</li>
              <li>Authorisation signature and cancellation section</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Roles and responsibilities"
            onSite="Remember: the top man's most critical duty is to NOT enter the space. The natural human instinct to help a fallen colleague is what causes multiple-casualty incidents. The top man must raise the alarm and initiate the planned rescue — never attempt an unplanned, unequipped entry."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Role</th>
                    <th className="py-2 font-medium text-white">Responsibilities</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Authorising Person</td>
                    <td className="py-2">
                      Assesses hazards, verifies controls, issues and cancels the entry permit
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Entrant</td>
                    <td className="py-2">
                      Enters the space, carries out the work, monitors their own gas detector,
                      evacuates immediately on alarm
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Top Man (Attendant)</td>
                    <td className="py-2">
                      Remains at entry point, maintains communication, logs entrants, controls
                      access, raises alarm, initiates rescue — must NEVER enter the space
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Rescue Team</td>
                    <td className="py-2">
                      Trained and equipped to perform rescue, on standby throughout the entry,
                      practised in the specific rescue method
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Atmospheric monitoring and rescue arrangements</ContentEyebrow>

          <ConceptBlock title="The two most critical controls">
            <p>
              Atmospheric monitoring and rescue arrangements are the two most critical control
              measures for confined space entry. Monitoring provides early warning of deteriorating
              conditions, allowing evacuation before injury occurs. Rescue arrangements ensure that
              if someone is incapacitated, they can be recovered rapidly — within minutes, not
              hours.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Multi-gas detector requirements">
            <p>
              A 4-gas (or more) portable detector is the standard instrument for confined space
              atmospheric monitoring. The detector must be calibrated, bump-tested, and maintained
              in accordance with the manufacturer&apos;s instructions.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Parameter</th>
                    <th className="py-2 pr-4 font-medium text-white">Safe range</th>
                    <th className="py-2 pr-4 font-medium text-white">Low alarm</th>
                    <th className="py-2 font-medium text-white">High alarm</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Oxygen (O2)</td>
                    <td className="py-2 pr-4">19.5% - 23.5%</td>
                    <td className="py-2 pr-4">19.5%</td>
                    <td className="py-2">23.5%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Flammable Gas (LEL)</td>
                    <td className="py-2 pr-4">0% LEL</td>
                    <td className="py-2 pr-4">10% LEL</td>
                    <td className="py-2">20% LEL</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Carbon Monoxide (CO)</td>
                    <td className="py-2 pr-4">0 ppm</td>
                    <td className="py-2 pr-4">20 ppm</td>
                    <td className="py-2">100 ppm</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Hydrogen Sulphide (H2S)</td>
                    <td className="py-2 pr-4">0 ppm</td>
                    <td className="py-2 pr-4">5 ppm</td>
                    <td className="py-2">10 ppm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Note: These are typical alarm settings. The actual settings must be determined by the
              risk assessment and may be more stringent depending on the specific hazards
              identified.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Monitoring procedure — step by step">
            <ul className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Calibration check</strong> — verify detector is within calibration date and
                bump test passes
              </li>
              <li>
                <strong>Pre-entry monitoring</strong> — lower detector into the space (top, middle,
                bottom) without anyone entering
              </li>
              <li>
                <strong>Record readings</strong> — document all readings on the entry permit before
                authorising entry
              </li>
              <li>
                <strong>Ventilate</strong> — if readings are outside safe range, ventilate and
                re-test. Do NOT enter until safe
              </li>
              <li>
                <strong>Continuous monitoring</strong> — each entrant wears a personal gas detector
                throughout the entry
              </li>
              <li>
                <strong>Alarm response</strong> — on ANY alarm, all entrants evacuate immediately.
                Do not investigate
              </li>
              <li>
                <strong>Re-test after breaks</strong> — if the space is left unattended (e.g.,
                during a break), re-test before re-entry
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Rescue arrangements — the most critical control">
            <p>
              Regulation 5 of the Confined Spaces Regulations requires suitable and sufficient
              arrangements for rescue before any person enters a confined space. The rescue plan
              must be specific to the space, practised, and immediately available — not a
              theoretical document filed in the office.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Self-rescue:</strong> The entrant evacuates under their own power on alarm —
                the simplest and fastest rescue method
              </li>
              <li>
                <strong>Non-entry rescue:</strong> Entrant is attached to a rescue line and can be
                pulled out by the top man without anyone entering the space — e.g., using a tripod
                and winch over a manhole
              </li>
              <li>
                <strong>Entry rescue:</strong> A trained rescue team enters the space with breathing
                apparatus to recover the casualty — the most complex and slowest method
              </li>
              <li>
                <strong>Emergency services:</strong> Fire and rescue service notified in advance
                that confined space work is taking place — but NOT relied upon as the primary rescue
                method (response times are too long)
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Rescue equipment">
            <p>
              <strong>Standard equipment:</strong> tripod and winch for vertical entry points;
              rescue harness with attachment point for lifting; self-contained breathing apparatus
              (SCBA); airline breathing apparatus (for extended duration); escape sets
              (short-duration emergency breathing); stretcher suitable for confined space
              extraction.
            </p>
            <p>
              <strong>Communication &amp; first aid:</strong> two-way radio (intrinsically safe if
              ATEX zone); emergency whistle or audible alarm; first aid kit including oxygen
              therapy; AED (defibrillator) on standby; trauma blankets; emergency lighting
              (intrinsically safe).
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Warning: untrained rescue kills"
            whatHappens={
              <>
                More than 60% of confined space fatalities are would-be rescuers. When a colleague
                collapses in a confined space, the natural instinct is to rush in and help. But the
                atmosphere that incapacitated the first person will incapacitate the rescuer too —
                often within seconds.
              </>
            }
            doInstead={
              <>
                This is why the top man must NEVER enter, why rescue teams must have breathing
                apparatus, and why the rescue plan must be established and practised BEFORE any
                entry begins.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Electrical work in confined spaces</ContentEyebrow>

          <ConceptBlock title="Two sets of hazards, one compounded risk">
            <p>
              Electrical maintenance in confined spaces presents a unique combination of hazards:
              the standard confined space risks (atmosphere, flooding, entrapment) are compounded by
              electrical hazards (electrocution, arc flash, burns). Furthermore, the confined
              environment amplifies the effects of electrical incidents — arc flash blast pressure
              in a cable tunnel is far more devastating than in an open switchroom, and the
              restricted space limits the worker&apos;s ability to escape.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Cable tunnels and ducts">
            <p>
              Cable tunnels are one of the most common confined spaces encountered by electrical
              maintenance technicians. They present a complex combination of hazards:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Oxygen depletion:</strong> Heat from loaded cables promotes oxidation of
                materials, consuming oxygen. Poor ventilation means depleted air is not replaced.
              </li>
              <li>
                <strong>Heat stress:</strong> Heavily loaded cables radiate heat, raising ambient
                temperatures to 40-50+°C in poorly ventilated tunnels. This causes fatigue,
                confusion, and collapse.
              </li>
              <li>
                <strong>Arc flash containment:</strong> An arc flash in a cable tunnel creates a
                blast wave confined by the tunnel walls. The pressure and thermal effects are
                greatly amplified compared to an open environment.
              </li>
              <li>
                <strong>Egress:</strong> Cable tunnels may have access points hundreds of metres
                apart. In an emergency, the distance to the nearest exit may be significant.
              </li>
              <li>
                <strong>Flooding:</strong> Underground cable tunnels are prone to water ingress,
                creating electrocution risk even from low-voltage cables.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Manholes and cable pits">
            <p>
              Manholes and cable pits are typically vertical-entry confined spaces with restricted
              openings. The vertical orientation means that heavy gases accumulate at the bottom and
              oxygen-depleted air cannot easily escape.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Gas accumulation:</strong> Methane and CO2 from surrounding soil; H2S from
                drainage; CO from traffic above
              </li>
              <li>
                <strong>Water:</strong> Groundwater and surface water collect in pits — must be
                pumped before entry
              </li>
              <li>
                <strong>Access:</strong> Narrow openings restrict rescue — tripod and winch
                essential for vertical entry points
              </li>
              <li>
                <strong>Cable jointing:</strong> Heat sources from jointing (gas torches, heat
                shrink) can alter the atmosphere and increase fire risk
              </li>
              <li>
                <strong>Reduced voltage:</strong> Use 110V CTE (centre-tapped earth) or
                battery-powered tools to reduce electrocution risk in wet conditions
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Switchrooms and transformer chambers">
            <p>
              Some switchrooms and transformer chambers meet the definition of confined spaces,
              particularly underground or basement installations with limited access and
              ventilation:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>SF6 gas:</strong> HV switchgear containing SF6 can leak — the gas is five
                times heavier than air and accumulates at low levels, displacing oxygen
              </li>
              <li>
                <strong>SF6 decomposition:</strong> When SF6 passes through an arc, it produces
                toxic byproducts (SO2, HF) that are acutely dangerous
              </li>
              <li>
                <strong>Battery fumes:</strong> Lead-acid batteries produce hydrogen gas during
                charging — explosive at 4% concentration
              </li>
              <li>
                <strong>Oil mist:</strong> Oil-filled transformers and switchgear can produce oil
                mist or vapour, particularly if overheated
              </li>
              <li>
                <strong>Arc flash:</strong> The containment effect of an enclosed switchroom
                amplifies arc flash blast pressure and thermal hazard
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical controls for confined space work">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Reduced voltage:</strong> Use 110V CTE supplies or battery-powered tools in
                wet or damp confined spaces
              </li>
              <li>
                <strong>RCD protection:</strong> 30mA RCD on all portable equipment — no exceptions
                in confined spaces
              </li>
              <li>
                <strong>ATEX equipment:</strong> All electrical equipment in spaces with flammable
                atmospheres must be ATEX-rated (intrinsically safe)
              </li>
              <li>
                <strong>Task lighting:</strong> Low-voltage (12V or 25V) task lighting, or
                intrinsically safe rechargeable lighting
              </li>
              <li>
                <strong>Full isolation:</strong> Isolate and prove dead ALL electrical circuits in
                the confined space before entry, using the full Prove-Test-Prove procedure
              </li>
              <li>
                <strong>Arc flash assessment:</strong> Where circuits cannot be isolated (e.g., the
                supply cables you are working on are energised from both ends), conduct an arc flash
                risk assessment that accounts for the containment effect
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Competence requirements"
            onSite="ST1426 link: the Maintenance and Operations Engineering Technician standard requires awareness of confined space hazards, the ability to recognise when work constitutes confined space entry, and knowledge of the controls required. While not all technicians will be qualified confined space entrants, all must understand when the Confined Spaces Regulations apply and ensure that appropriate procedures are followed before any entry takes place."
          >
            <p>
              Electrical work in confined spaces requires a combination of competencies that goes
              beyond either confined space entry training or electrical competence alone:
            </p>
            <p>
              <strong>Confined space competence:</strong> hazard recognition and risk assessment;
              atmospheric monitoring equipment use; emergency escape procedures; communication
              protocols; RPE use and face-fit testing.
            </p>
            <p>
              <strong>Electrical competence:</strong> safe isolation procedures (Module 1.1.2); LOTO
              procedures (Module 1.1.3); arc flash awareness and PPE selection; reduced voltage
              system use; ATEX equipment selection.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Confined space definition: substantially enclosed AND foreseeable risk of serious injury from hazardous conditions within/nearby — both conditions must be met.',
              'Atmospheric limits: O2 19.5%-23.5% (normal 20.9%); LEL — alarm at 10%, evacuate at 20%; CO — alarm at 20 ppm, evacuate at 100 ppm; H2S — alarm at 5 ppm, evacuate at 10 ppm.',
              'Safe system of work — 6 elements: risk assessment (space-specific), atmospheric monitoring (pre + continuous), ventilation (forced, mechanical), entry permit (formal authorisation), communication (constant contact), rescue arrangements (before entry).',
              'Key legislation: Confined Spaces Regulations 1997; ACoP L101 — Approved Code of Practice; HSWA 1974 — general safety duties; EAWR 1989 — electrical safety; DSEAR 2002 — explosive atmospheres.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section1-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Safe Access and Work at Height
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section2-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Dangers of Electricity
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section1_5;
