/**
 * MOET · Module 4 · Section 2 · Subsection 1 — Visual and Sensory Inspection
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Inspect and test electrical aspects of plant. For
 *     example, visual checks, insulation and continuity checks,
 *     thermographic surveys, and voltage levels."
 *   · "Record information."
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Visual and Sensory Inspection - MOET Module 4.2.1';
const DESCRIPTION =
  'Look, listen, smell and feel techniques for condition monitoring: signs of overheating, discolouration, vibration, unusual noise, burning smell, water damage, corrosion, vermin damage and systematic walkthrough for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'visual-signs-overheating',
    question: 'Which of the following is a visual sign of overheating in an electrical connection?',
    options: [
      'A bright, clean, shiny copper surface at the terminal connection',
      'Condensation forming on the outside surface of the metal enclosure',
      'A green powdery deposit spreading along the length of the busbar',
      'Brown or black discolouration of the insulation near the connection',
    ],
    correctIndex: 3,
    explanation:
      'Overheating causes thermal degradation of insulation materials and plastics, producing brown or black discolouration. The discolouration pattern often indicates the heat source — a brown ring around a terminal indicates a loose connection, while general discolouration on a cable suggests overloading. This is one of the most reliable visual indicators of a developing fault.',
  },
  {
    id: 'unusual-noise',
    question:
      'A loud humming or buzzing from a contactor that normally operates quietly indicates:',
    options: [
      'Normal operation, because all AC contactors hum continuously in service',
      'That the contactor is carrying rather less than its rated load current',
      'That the control circuit voltage is slightly higher than normal for the coil',
      'A fault such as a damaged shading ring, dirty pole faces or low coil voltage',
    ],
    correctIndex: 3,
    explanation:
      "A contactor should operate with a clean, quiet 'click'. Excessive buzzing or humming indicates that the armature is not seating properly — caused by damaged shading rings (which prevent AC-induced vibration), contaminated pole faces, misalignment, or low coil voltage. If not corrected, the coil will overheat and the contacts will arc excessively.",
  },
  {
    id: 'burning-smell',
    question: 'You detect a faint burning or acrid smell near a motor control centre. You should:',
    options: [
      'Ignore it, since electrical equipment always smells slightly when it is warm',
      'Open every panel door at once to locate the source of the smell quickly',
      'Report it, investigate safely, and de-energise the section if it worsens',
      'Wait until the next scheduled inspection before investigating the smell',
    ],
    correctIndex: 2,
    explanation:
      'A burning smell from electrical equipment indicates overheating, arcing or insulation breakdown — all potentially dangerous conditions. The smell should be investigated immediately but safely. Never open panel doors to investigate without appropriate PPE if a live fault is suspected. Thermal imaging through IR windows is the safest initial investigation method. If the smell is strong or worsening, the risk assessment may require immediate de-energisation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The four senses used in sensory inspection are:',
    options: [
      'Sight, hearing, taste and touch',
      'Sight, hearing, smell and touch (feel)',
      'Sight, hearing, smell and taste',
      'Only sight is used — the others are unreliable',
    ],
    correctAnswer: 1,
    explanation:
      'Visual and sensory inspection uses sight (looking for discolouration, damage, contamination), hearing (listening for unusual noise, buzzing, arcing), smell (detecting burning, ozone, overheated insulation) and touch/feel (sensing vibration, temperature differences, loose components). Taste is never used in electrical inspection for obvious safety reasons.',
  },
  {
    id: 2,
    question: 'A systematic walkthrough inspection of an electrical installation should:',
    options: [
      'Cover only the items that were found to have failed at the last inspection',
      'Be carried out as quickly as possible to minimise disruption to production',
      'Follow a planned route and checklist, recording all findings as you go',
      'Focus solely on the main switchboard and ignore the final circuits below it',
    ],
    correctAnswer: 2,
    explanation:
      'A systematic walkthrough follows a planned route (typically starting at the main intake and working through the distribution system to final circuits), uses a structured checklist to ensure nothing is missed, and records all findings including both satisfactory and unsatisfactory items. It should cover all accessible electrical infrastructure including distribution boards, cable routes, motors, control panels, lighting and socket outlets.',
  },
  {
    id: 3,
    question: 'White or green deposits on copper busbars or terminals indicate:',
    options: [
      'A protective anti-oxidant coating deliberately applied at manufacture',
      'The normal natural colour of copper, which requires no further action',
      'Heat damage caused by sustained overloading of the copper busbar',
      'Corrosion — white from galvanic action, green from copper plus moisture',
    ],
    correctAnswer: 3,
    explanation:
      'White deposits on copper typically indicate galvanic corrosion where dissimilar metals are in contact (e.g., copper and aluminium, or zinc-plated hardware on copper bars). Green deposits (verdigris) indicate copper reacting with moisture and atmospheric contaminants. Both increase contact resistance and degrade the connection. The root cause (moisture, dissimilar metals) must be addressed.',
  },
  {
    id: 4,
    question: 'Evidence of vermin activity in an electrical panel includes:',
    options: [
      'Droppings, nesting material, gnawed cable insulation and urine staining',
      'A fine, evenly spread film of dust on every surface with no other marks',
      'A uniform brown discolouration across all of the cable insulation present',
      'Bright, clean copper terminals with a freshly applied coat of protective grease',
    ],
    correctAnswer: 0,
    explanation:
      'Vermin (rats, mice, squirrels) cause significant damage to electrical installations. Signs include droppings, nesting material (shredded insulation, paper, fabric), gnawed cable sheathing exposing conductors, and urine staining which is corrosive and conductive. Vermin damage is a fire risk and an electric shock risk. The entry points must be sealed and damaged cables replaced.',
  },
  {
    id: 5,
    question: 'When feeling for vibration on a motor bearing housing, you should:',
    options: [
      'Grip the bearing housing firmly with your palm while the motor runs',
      'Use the back of your hand first, then a vibration pen or stethoscope',
      'Stop the motor before checking, as vibration cannot be felt while running',
      'Place your ear directly against the bearing housing to listen to it run',
    ],
    correctAnswer: 1,
    explanation:
      'Before touching any running equipment, approach carefully and use the back of your hand at a safe distance to sense radiated heat — this avoids burns and the grasp reflex. For vibration assessment, a vibration pen or electronic stethoscope provides quantifiable data. Changes in vibration character (roughness, grinding, rhythmic pulsing) indicate developing bearing, alignment or balance problems.',
  },
  {
    id: 6,
    question: 'An audible crackling or spitting sound from inside an HV switchboard indicates:',
    options: [
      'Normal expansion noise as the busbars warm under load',
      'A cooling fan blade fouling its guard inside the panel',
      'Possible partial discharge or arcing — a potentially dangerous condition requiring immediate investigation',
      'Loose mounting bolts vibrating against the panel frame',
    ],
    correctAnswer: 2,
    explanation:
      'Crackling, spitting or buzzing sounds from HV switchgear may indicate partial discharge — localised electrical breakdown of insulation that has not yet progressed to full flashover. This is a serious and potentially dangerous condition. The area should be evacuated, the finding reported immediately, and the equipment investigated by a competent HV engineer using PD detection equipment.',
  },
  {
    id: 7,
    question:
      'Water staining or evidence of moisture ingress in an electrical panel should be classified as:',
    options: [
      'A cosmetic issue that needs no action if the panel still works normally',
      'A normal result of condensation that always clears on its own in time',
      'An improvement that usefully helps cool the equipment inside the panel',
      'A dangerous condition — it lowers insulation resistance and aids corrosion',
    ],
    correctAnswer: 3,
    explanation:
      'Moisture in electrical equipment is always a concern. It reduces insulation resistance (potentially to dangerous levels), promotes corrosion of conductors and contacts, creates conductive surface films that can lead to tracking and flashover, and in freezing conditions can cause mechanical damage to components. The source of moisture must be identified and eliminated, and affected components must be tested and replaced if necessary.',
  },
  {
    id: 8,
    question:
      'During a walkthrough, you notice a distribution board with its door hanging open and no lock fitted. This is:',
    options: [
      'A safety concern — an open board risks contact with live parts and loses IP rating',
      'Acceptable, and beneficial, since the open door improves cooling airflow inside',
      'A minor cosmetic fault only, as the protective devices still work with it open',
      'A deliberate maintenance setting to leave as found for the next inspector',
    ],
    correctAnswer: 0,
    explanation:
      'Distribution board doors must be closed and secured at all times. An open door exposes live parts to accidental contact (electric shock risk), reduces the IP rating (allowing dust and moisture ingress), and permits unauthorised access or interference. This should be recorded as a defect and the door repaired or replaced. If live parts are exposed, immediate action is needed.',
  },
  {
    id: 9,
    question:
      'A motor that previously ran smoothly but now has an audible metallic scraping sound is likely experiencing:',
    options: [
      'A slightly high supply voltage causing the windings to hum more loudly than usual',
      'Rotor-to-stator contact caused by bearing wear, shaft deflection or mounting problems',
      'Normal running-in noise from a recently lubricated bearing that will fade after a few hours',
      'Magnetostriction of the stator core, a harmless effect that produces a faint twice-mains-frequency hum',
    ],
    correctAnswer: 1,
    explanation:
      'A metallic scraping sound from a motor indicates physical contact between rotating and stationary parts — most commonly the rotor rubbing against the stator bore. This can be caused by severe bearing wear (allowing shaft to drop), broken bearing cage, shaft deflection under load, or mounting/alignment problems. This requires immediate investigation as continued operation will cause catastrophic damage.',
  },
  {
    id: 10,
    question: 'The smell of ozone near HV equipment may indicate:',
    options: [
      'Overheated transformer oil reacting with the air to give off a sweet, oily odour',
      'Battery gassing from a nearby UPS releasing a sharp sulphur smell',
      'Partial discharge or corona discharge — electrical breakdown producing ozone from oxygen in the air',
      'A harmless smell of warm dust burning off the busbars as they reach operating temperature',
    ],
    correctAnswer: 2,
    explanation:
      'Ozone has a distinctive sharp, chlorine-like smell. In electrical environments, it is produced by corona discharge or partial discharge — both forms of electrical breakdown. The presence of ozone near HV equipment indicates that insulation is being stressed beyond its capability, and electrical discharge is occurring. This requires urgent investigation by a competent HV engineer.',
  },
  {
    id: 11,
    question: 'When conducting a visual inspection, the most effective approach is to:',
    options: [
      'Scan as quickly as you can to cover the maximum amount of equipment',
      'Rely on memory afterwards rather than keeping a written record of findings',
      'Inspect only the components that are already known to have failed before',
      'Use a checklist, work top-to-bottom systematically, and document everything',
    ],
    correctAnswer: 3,
    explanation:
      'Effective visual inspection requires a systematic, disciplined approach. Using a structured checklist prevents items being missed. Working systematically (top to bottom, left to right, or following a logical equipment sequence) ensures complete coverage. Taking time is essential — experienced inspectors often find more by looking carefully for subtle signs than by rushing through a checklist.',
  },
  {
    id: 12,
    question: 'Discoloured or melted cable insulation near a motor terminal box indicates:',
    options: [
      'Excessive heat, likely from a loose connection, overload or poor ventilation',
      'A harmless colour change from ageing of the PVC, needing no further action',
      'Normal sun-fading of the insulation that occurs on every motor whatever its load',
      'A factory heat-resistant coating that is meant to darken once commissioned',
    ],
    correctAnswer: 0,
    explanation:
      'Melted or discoloured cable insulation near a motor terminal box indicates excessive heat. Common causes include loose terminal connections (high resistance generates heat), overloaded circuits (current exceeding cable rating), poor ventilation (heat from motor conducted to cable), or a combination of factors. The root cause must be identified and corrected, and the affected cable section replaced.',
  },
];

const faqs = [
  {
    question: 'How often should visual and sensory inspections be carried out?',
    answer:
      'This depends on the criticality and environment of the installation. For critical electrical infrastructure (main switchboards, motor control centres, transformer rooms), weekly or fortnightly walkthroughs are recommended. For general distribution boards, monthly or quarterly inspections may be sufficient. In harsh environments (dusty, humid, corrosive), more frequent inspections are needed. The inspection schedule should be defined in the PPM plan and carried out consistently.',
  },
  {
    question: 'What training is needed to carry out effective visual inspections?',
    answer:
      "Effective visual inspection requires understanding what 'normal' looks like so that abnormalities can be recognised. This comes from a combination of formal training (understanding failure mechanisms and their visible signs), mentoring (learning from experienced colleagues), and practice. For the ST1426 standard, you should be able to identify common signs of deterioration, damage and overheating, and know when to escalate findings for further investigation.",
  },
  {
    question: 'Should I touch equipment during a sensory inspection?',
    answer:
      "Exercise extreme caution. Never touch energised conductors or terminal. Use the back of your hand at a safe distance to sense radiated heat before touching any equipment casing. Use tools (vibration pens, thermometers, stethoscopes) rather than direct touch where possible. If equipment is abnormally hot, do not touch it — use an infrared thermometer to measure the temperature safely. Always follow your organisation's safe working procedures.",
  },
  {
    question: 'What should I do if I find a serious defect during a walkthrough?',
    answer:
      'If the defect presents an immediate danger (exposed live conductors, arcing, fire risk), take immediate action to make the situation safe — this may include isolating the supply if you are competent to do so. Report the finding immediately to your supervisor and raise an emergency work order. If the defect is serious but not immediately dangerous, record it in detail, raise a high-priority work order, and ensure your supervisor is aware. Always err on the side of caution.',
  },
  {
    question: 'How do I record findings from a visual inspection?',
    answer:
      "Use your organisation's inspection form or CMMS mobile app. Record: date and time, equipment identifier, what you found (describing the condition factually), photographs where possible, any measurements taken (e.g., temperature from an IR thermometer), comparison to previous inspection findings, your assessment of severity, and any recommended follow-up actions. Be specific — 'DB-07, Phase L3 main bus connection shows brown discolouration on insulation, estimated 40°C above ambient by IR gun, recommend thermal imaging and re-torque at next shutdown' is far more useful than 'DB-07 — OK'.",
  },
];

const MOETModule4Section2_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.2 · Subsection 1"
        title="Visual and Sensory Inspection"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Using look, listen, smell and feel to detect deterioration, damage and developing
            faults.
          </p>

          <TLDR
            points={[
              'Look: Discolouration, damage, corrosion, contamination.',
              'Listen: Buzzing, crackling, grinding, unusual noise.',
              'Smell: Burning, ozone, overheated insulation.',
              'Feel: Vibration changes, excessive heat (back of hand safely).',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Overheating:</strong> Brown marks on insulation, melted plastic.
              </li>
              <li>
                <strong>Vermin:</strong> Droppings, nesting, gnawed cables.
              </li>
              <li>
                <strong>Moisture:</strong> Staining, condensation, corrosion.
              </li>
              <li>
                <strong>Walkthrough:</strong> Systematic route with structured checklist.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Apply systematic visual and sensory inspection techniques to electrical installations',
              'Recognise visual signs of overheating, arcing, moisture damage and corrosion',
              'Identify audible indicators of developing faults in contactors, motors and switchgear',
              'Detect olfactory signs of electrical faults including burning and ozone',
              'Conduct structured walkthrough inspections using appropriate checklists',
              'Record and escalate findings appropriately based on severity',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The power of observation</ContentEyebrow>

          <ConceptBlock title="The first line of defence in condition monitoring">
            <p>
              Before any test instrument is connected, before any panel door is opened, a skilled
              maintenance technician can gather an enormous amount of information about equipment
              condition using their senses. Visual and sensory inspection is the first line of
              defence in condition monitoring — it costs nothing, requires no special equipment and
              can be performed during routine site visits.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The four senses in electrical inspection">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Sense
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      What to look/listen/smell/feel for
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Possible indication
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Sight</td>
                    <td className="border border-white/10 px-3 py-2">
                      Discolouration, melting, cracks, corrosion, damage, contamination, water
                      staining
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Overheating, mechanical damage, moisture ingress, ageing
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Hearing</td>
                    <td className="border border-white/10 px-3 py-2">
                      Buzzing, humming, crackling, scraping, squealing, irregular rhythm
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Loose components, partial discharge, bearing wear, misalignment
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Smell</td>
                    <td className="border border-white/10 px-3 py-2">
                      Burning, acrid fumes, ozone (chlorine-like), hot oil, electrical smell
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Insulation breakdown, arcing, corona discharge, overheated lubricant
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Touch</td>
                    <td className="border border-white/10 px-3 py-2">
                      Excessive heat, unusual vibration, looseness (back of hand for heat, vibration
                      pen for quantified data)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Overloading, bearing defect, loose mounting, imbalance
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Safety first">
            <p>
              Sensory inspection must always be conducted safely. Never touch energised conductors.
              Use the back of your hand at a safe distance to sense heat before touching equipment
              casings. Approach carefully when investigating unusual sounds — arcing and partial
              discharge can escalate to flashover. If you smell burning and the source is not
              immediately obvious, do not open panel doors without appropriate PPE and a safe system
              of work.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Signs of overheating and electrical damage</ContentEyebrow>

          <ConceptBlock title="The most common precursor to electrical failure and fire">
            <p>
              Overheating is the most common precursor to electrical failure and fire. Learning to
              recognise the visual signs of overheating is one of the most valuable skills a
              maintenance technician can develop.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Visual signs of overheating">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Insulation discolouration:</strong> White PVC turns yellow, then brown, then
                black as temperature increases
              </li>
              <li>
                <strong>Melting:</strong> Deformed plastic enclosures, melted cable sheathing,
                softened insulation
              </li>
              <li>
                <strong>Charring:</strong> Blackened areas around connections indicate sustained
                high temperature
              </li>
              <li>
                <strong>Conductor discolouration:</strong> Copper turns dark brown/black when
                overheated; aluminium shows white oxide
              </li>
              <li>
                <strong>Arc damage:</strong> Pitting, cratering, metal spatter on contacts and
                busbars
              </li>
              <li>
                <strong>Tracking:</strong> Carbon paths across insulating surfaces — a precursor to
                flashover
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Environmental damage indicators">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Corrosion:</strong> Green verdigris on copper, white powder on aluminium,
                rust on steel
              </li>
              <li>
                <strong>Water damage:</strong> Tide marks, staining, calcium deposits, corrosion
                patterns
              </li>
              <li>
                <strong>UV degradation:</strong> Brittle, cracking cable sheath on outdoor
                installations
              </li>
              <li>
                <strong>Chemical attack:</strong> Softened or swollen insulation near chemical
                stores or processes
              </li>
              <li>
                <strong>Vermin damage:</strong> Gnawed insulation, droppings, nesting material,
                urine staining
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Audible and olfactory indicators</ContentEyebrow>

          <ConceptBlock title="Diagnosing faults you cannot see">
            <p>
              Sound and smell can alert you to faults that are not visible. Many experienced
              technicians can diagnose equipment problems simply by listening to the operating sound
              or detecting a characteristic smell. Developing this skill requires exposure to both
              normal and abnormal operating conditions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Sounds to listen for">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Buzzing contactor:</strong> Damaged shading ring or dirty pole faces
              </li>
              <li>
                <strong>Crackling in panel:</strong> Partial discharge or loose connection arcing
              </li>
              <li>
                <strong>Motor grinding:</strong> Bearing failure or rotor-to-stator contact
              </li>
              <li>
                <strong>Squealing belt:</strong> Loose or worn V-belt slipping
              </li>
              <li>
                <strong>Transformer hum increase:</strong> Core looseness or overloading
              </li>
              <li>
                <strong>Rhythmic thumping:</strong> Motor imbalance or loose coupling
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Smells to recognise">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Burning plastic:</strong> Overheating insulation or cable sheath
              </li>
              <li>
                <strong>Acrid/sharp smell:</strong> Electrical arcing or overheated contacts
              </li>
              <li>
                <strong>Ozone (chlorine-like):</strong> Corona or partial discharge
              </li>
              <li>
                <strong>Fish-like smell:</strong> Overheated bakelite or phenolic resin (older
                equipment)
              </li>
              <li>
                <strong>Sweet chemical smell:</strong> Overheated transformer oil or coolant
              </li>
              <li>
                <strong>Sulphur smell:</strong> Battery gassing from UPS or emergency lighting
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>The systematic walkthrough</ContentEyebrow>

          <ConceptBlock title="Converting ad-hoc observation into a repeatable process">
            <p>
              A systematic walkthrough converts ad-hoc observation into a structured, repeatable
              process. It follows a planned route, uses a checklist to ensure completeness, and
              produces documented records that can be compared over time.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Walkthrough procedure">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plan the route:</strong> Start at the main intake and work through the
                distribution hierarchy
              </li>
              <li>
                <strong>Use a checklist:</strong> Structured list covering every item to be
                inspected
              </li>
              <li>
                <strong>Be systematic:</strong> Work top to bottom, left to right, inside to outside
              </li>
              <li>
                <strong>Take time:</strong> Rushing defeats the purpose — slow down and observe
                carefully
              </li>
              <li>
                <strong>Record everything:</strong> Satisfactory and unsatisfactory findings both
                have value
              </li>
              <li>
                <strong>Photograph anomalies:</strong> Visual record supports the written findings
              </li>
              <li>
                <strong>Compare to previous:</strong> Has anything changed since the last
                walkthrough?
              </li>
              <li>
                <strong>Escalate promptly:</strong> Do not wait until the end of the walkthrough to
                report urgent findings
              </li>
            </ul>
          </ConceptBlock>

          <p className="text-[13.5px] leading-relaxed text-elec-yellow/90">
            <span className="mr-1.5 font-semibold text-elec-yellow">ST1426 link: </span>
            The ability to carry out systematic visual and sensory inspections, identify
            abnormalities, and report findings accurately is a fundamental competency for
            maintenance technicians. This is assessed through practical observation and the
            professional discussion at end-point assessment.
          </p>

          <SectionRule />

          <KeyTakeaways
            title="Visual warning signs"
            points={[
              'Brown/black discolouration = overheating.',
              'Green deposits on copper = corrosion + moisture.',
              'Melted plastic = sustained high temperature.',
              'Carbon tracks = tracking/flashover risk.',
              'Gnawed cables = vermin damage.',
            ]}
          />

          <KeyTakeaways
            title="Sensory warning signs"
            points={[
              'Buzzing contactor = shading ring/pole face fault.',
              'Crackling = partial discharge or arcing.',
              'Burning smell = insulation overheating.',
              'Ozone smell = corona/partial discharge.',
              'Changed vibration = bearing/alignment fault.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Section 4.2 hub
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Thermal Imaging
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section2_1;
