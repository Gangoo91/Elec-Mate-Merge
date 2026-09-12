/**
 * MOET · Module 1 · Section 1.6 · Subsection 1 — Fire Safety and Extinguishers
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
 *   Knowledge  · "Emergency incident and response procedures."
 *              · "Work environment hazards and risks. Risk assessments."
 *   Skills     · "Follow emergency incident and response procedures."
 *   Behaviours · "Prioritise safe working practices.."
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
  AppendixTable,
  VideoCard,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Fire Safety and Extinguishers - MOET Module 1 Section 6.1';
const DESCRIPTION =
  'Comprehensive guide to fire safety for electrical maintenance technicians: the fire triangle, classes of fire, extinguisher types and colour coding, electrical fire procedures, fire detection systems, alarm categories, BS 5839 and fire risk assessment.';

const quickCheckQuestions = [
  {
    id: 'fire-triangle',
    question: 'What three elements make up the fire triangle?',
    options: [
      'Heat, fuel and oxygen',
      'Fuel, water and oxygen',
      'Electricity, fuel and oxygen',
      'Heat, fuel and nitrogen',
    ],
    correctIndex: 0,
    explanation:
      'The fire triangle consists of heat, fuel and oxygen. All three must be present for a fire to start and continue burning. Removing any one element will extinguish the fire — this is the principle behind all firefighting methods.',
  },
  {
    id: 'electrical-fire-extinguisher',
    question:
      'Which extinguisher types are safe to use on an electrical fire once the supply has been isolated?',
    options: [
      'Water and foam only',
      'Wet chemical only',
      'CO2 and dry powder',
      'Any extinguisher type',
    ],
    correctIndex: 2,
    explanation:
      'CO2 (carbon dioxide) and dry powder extinguishers are safe to use on electrical fires. CO2 is preferred as it leaves no residue. Water, foam and wet chemical extinguishers must never be used on live electrical equipment as they conduct electricity. Always isolate the supply first if it is safe to do so.',
  },
  {
    id: 'fire-alarm-category-l',
    question: 'What does an L-category fire alarm system protect?',
    options: [
      'Property and building contents from fire damage',
      'Life safety — protection of occupants',
      'Sensitive electronic equipment from smoke contamination',
      'The means of escape from smoke logging only',
    ],
    correctIndex: 1,
    explanation:
      'L-category fire alarm systems are designed for the protection of life. They range from L1 (detection throughout the building) to L5 (bespoke system engineered to satisfy specific fire safety objectives). L-categories focus on giving early warning to enable safe evacuation.',
  },
  {
    id: 'electrical-fire-cause',
    question: 'Which of the following is the most common electrical cause of fire?',
    options: [
      'Overloaded circuits and loose connections',
      'Correctly rated protective devices operating as designed',
      "Cables installed with the manufacturer's recommended bend radius",
      'RCD protection fitted to socket-outlet final circuits',
    ],
    correctIndex: 0,
    explanation:
      'Overloaded circuits and loose connections are the most common electrical causes of fire. Overloading causes conductors to overheat beyond their rated capacity, while loose connections create high-resistance joints that generate localised heat — both can ignite surrounding combustible materials.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The fire triangle consists of which three elements?',
    options: [
      'Electricity, fuel and water',
      'Heat, fuel and oxygen',
      'Heat, fuel and carbon dioxide',
      'Oxygen, fuel and nitrogen',
    ],
    correctAnswer: 1,
    explanation:
      'The fire triangle requires heat, fuel and oxygen. All three must be present simultaneously for combustion to occur. Remove any one element and the fire will be extinguished.',
  },
  {
    id: 2,
    question: 'A Class B fire involves which type of material?',
    options: [
      'Flammable gases such as propane and methane',
      'Solid combustible materials such as wood and paper',
      'Flammable liquids such as petrol and solvents',
      'Cooking oils and fats',
    ],
    correctAnswer: 2,
    explanation:
      'Class B fires involve flammable liquids such as petrol, diesel, solvents and paints. They require extinguishing agents that can smother the liquid surface — foam, CO2 or dry powder are appropriate.',
  },
  {
    id: 3,
    question: 'What colour band identifies a CO2 fire extinguisher?',
    options: [
      'Cream band on a red body',
      'Red band on a red body',
      'Blue band on a red body',
      'Black band on a red body',
    ],
    correctAnswer: 3,
    explanation:
      'CO2 extinguishers have a black band on a red body, in accordance with BS EN 3. The all-red body is standard for all extinguisher types; the coloured band identifies the extinguishing agent.',
  },
  {
    id: 4,
    question:
      'Before tackling an electrical fire, what should you do first if it is safe to do so?',
    options: [
      'Isolate the electrical supply',
      'Open windows to ventilate the area',
      'Apply water to cool the equipment',
      'Cover the fire with a fire blanket',
    ],
    correctAnswer: 0,
    explanation:
      'The first action for an electrical fire is to isolate the electrical supply if it is safe to do so. This removes the ignition source, makes the area safer for firefighting, and reduces the risk of electric shock to anyone tackling the fire.',
  },
  {
    id: 5,
    question: 'An aspirating smoke detection system works by:',
    options: [
      'Measuring room temperature with thermocouples',
      'Continuously drawing air samples through a pipe network to a central detector',
      'Using water sprinklers that activate on smoke',
      'Detecting visible flames using infrared sensors',
    ],
    correctAnswer: 1,
    explanation:
      'Aspirating smoke detection (ASD) systems, such as VESDA, continuously draw air samples through a pipe network to a highly sensitive central detector. They provide very early warning of smoke and are used in critical environments such as server rooms, switchrooms and data centres.',
  },
  {
    id: 6,
    question: 'Under BS 5839, a P1 fire alarm category provides:',
    options: [
      'Manual call points only, with no automatic detection',
      'Automatic detection in escape routes only, for life protection',
      'Automatic detection throughout the building for property protection',
      'Automatic detection in high-risk rooms only, for life protection',
    ],
    correctAnswer: 2,
    explanation:
      'A P1 system provides automatic fire detection throughout all areas of the building for the purpose of property protection. This is distinct from L-categories which focus on life safety. P1 and P2 (selected areas) categories ensure early detection to minimise property damage.',
  },
  {
    id: 7,
    question: 'Fire doors are required to provide a minimum fire resistance of:',
    options: ['10 minutes (FD10)', '20 minutes (FD20)', '60 minutes (FD60)', '30 minutes (FD30)'],
    correctAnswer: 3,
    explanation:
      'The minimum fire resistance for a fire door is typically 30 minutes (FD30), although FD60 doors are required in certain locations such as staircase enclosures in buildings over 18 metres. Fire doors must be properly maintained with intumescent strips and self-closing devices intact.',
  },
  {
    id: 8,
    question: 'Which regulation places a duty on employers to carry out fire risk assessments?',
    options: [
      'The Regulatory Reform (Fire Safety) Order 2005',
      'The Electricity at Work Regulations 1989',
      'The Health and Safety at Work etc. Act 1974',
      'The Building Regulations 2010 Part B',
    ],
    correctAnswer: 0,
    explanation:
      "The Regulatory Reform (Fire Safety) Order 2005 (RRFSO) requires the 'responsible person' (usually the employer or building owner) to carry out a fire risk assessment and implement appropriate fire safety measures. It applies to virtually all non-domestic premises in England and Wales.",
  },
  {
    id: 9,
    question: "A fire marshal's responsibilities include:",
    options: [
      'Carrying out the annual service of fire extinguishers on site',
      'Sweeping their designated area and guiding occupants to the assembly point during an evacuation',
      'Designing the fire detection system for the building',
      'Re-entering the building to retrieve valuable equipment during a fire',
    ],
    correctAnswer: 1,
    explanation:
      'Fire marshals (also called fire wardens) are responsible for sweeping their designated area during an evacuation, ensuring everyone has left, assisting persons with mobility difficulties, guiding occupants to the assembly point, and reporting to the chief fire marshal.',
  },
  {
    id: 10,
    question: 'Arcing at a loose terminal connection can cause a fire because:',
    options: [
      'The loose joint reduces the circuit current below the protective device rating',
      'The increased contact area improves heat dissipation at the terminal',
      'The high-resistance joint generates localised heat that can ignite surrounding combustible materials',
      'The arc immediately trips the upstream RCD, removing the supply',
    ],
    correctAnswer: 2,
    explanation:
      'A loose connection creates a high-resistance joint. Current flowing through this high resistance generates significant localised heat (P = I²R). Over time, this heat can carbonise insulation, melt plastic enclosures, and ignite surrounding combustible materials. This is one of the most common electrical causes of fire.',
  },
  {
    id: 11,
    question: 'BS 5839-1 covers the design, installation and maintenance of:',
    options: [
      'Emergency lighting systems for escape routes',
      'Portable fire extinguishers and fire blankets',
      'Sprinkler and water mist suppression systems',
      'Fire detection and fire alarm systems for buildings',
    ],
    correctAnswer: 3,
    explanation:
      'BS 5839-1 is the code of practice for the design, installation, commissioning and maintenance of fire detection and fire alarm systems in non-domestic buildings. It defines system categories (L and P), detector types, spacing requirements, and maintenance schedules.',
  },
  {
    id: 12,
    question: 'When installing cables through a fire compartment wall, you must:',
    options: [
      'Ensure fire stopping is applied to maintain the fire resistance of the wall',
      'Leave the opening unsealed to allow smoke to vent during a fire',
      'Use only the largest possible opening to ease future cable additions',
      'Fill the opening with expanding foam regardless of its fire rating',
    ],
    correctAnswer: 0,
    explanation:
      'When cables penetrate a fire compartment wall or floor, the openings must be sealed with approved fire stopping materials to maintain the fire resistance rating of the barrier. Failure to firestop penetrations is a major cause of fire spread in buildings and a common deficiency found during fire risk assessments.',
  },
];

const faqs = [
  {
    question: 'Can I use a water extinguisher on an electrical fire?',
    answer:
      'Never use a water extinguisher on live electrical equipment — water conducts electricity and you could receive a fatal electric shock. If you can safely isolate the supply first, the fire becomes a Class A, B or C fire depending on the materials involved. On live or potentially live electrical equipment, use only CO2 or dry powder extinguishers. CO2 is preferred as it leaves no residue that could damage sensitive electrical equipment.',
  },
  {
    question: 'How often should fire extinguishers be serviced?',
    answer:
      'Under the Regulatory Reform (Fire Safety) Order 2005 and BS 5306-3, fire extinguishers must receive a basic annual service by a competent person (typically a specialist contractor). Additionally, they should be visually inspected monthly by a responsible person on site to check for damage, correct pressure and accessibility. Extended service intervals apply depending on the extinguisher type — for example, CO2 extinguishers require a 10-year overhaul.',
  },
  {
    question: 'What is the difference between a fire alarm L3 and L1 system?',
    answer:
      'An L1 system provides automatic fire detection in all areas of the building — rooms, corridors, roof voids and floor voids. An L3 system provides detection only in escape routes (corridors, stairwells, landings) and rooms opening onto escape routes. L1 gives the highest level of life protection with earliest warning; L3 protects the means of escape but may not detect fires in remote rooms until smoke reaches the escape route.',
  },
  {
    question: 'As a maintenance electrician, what fire safety checks should I carry out?',
    answer:
      'During maintenance work, you should check for signs of overheating at connections (discolouration, melted insulation, burning smells), verify that circuit breakers and fuses are correctly rated, ensure fire stopping is intact where cables pass through compartment walls, confirm that fire alarm cables are undamaged, and report any electrical hazards that could pose a fire risk. You are not expected to carry out formal fire risk assessments, but you have a duty to report hazards.',
  },
  {
    question: 'What are the main electrical causes of fire in buildings?',
    answer:
      'The main electrical causes of fire include: overloaded circuits (cables carrying more current than their rated capacity), loose connections creating high-resistance joints, damaged or deteriorated insulation, arcing faults, misuse of extension leads and adaptors, faulty or poorly maintained equipment, and incorrect fuse/MCB ratings. Regular inspection, testing and maintenance — as required by BS 7671 — is the primary defence against electrical fires.',
  },
];

const MOETModule1Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1.6 · Subsection 1"
        title="Fire Safety and Extinguishers"
        backTo="/study-centre/apprentice/m-o-e-t-module1-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Understanding fire hazards, prevention and response for electrical maintenance
            technicians.
          </p>

          <TLDR
            points={[
              'Fire triangle: Heat + fuel + oxygen = fire',
              'Classes: A (solids), B (liquids), C (gases), D (metals), F (cooking oils)',
              'Electrical fires: Isolate first, CO2 or dry powder only',
              'Standards: BS 5839, RRFSO 2005, BS EN 3',
              'Common causes: Overloaded circuits, loose connections, arcing',
              'Detection: Smoke, heat, flame and aspirating detectors',
              'Alarm categories: L1-L5 (life), P1-P2 (property)',
              'ST1426: Maps to fire safety awareness KSBs',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the fire triangle and how removing each element extinguishes fire',
              'Identify the six classes of fire (A-F) and appropriate extinguisher types',
              'Describe the colour coding system for fire extinguishers under BS EN 3',
              'Apply correct procedures for tackling electrical fires safely',
              'Differentiate between fire alarm categories L1-L5 and P1-P2 under BS 5839',
              'Recognise common electrical causes of fire and preventive maintenance measures',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The fire triangle and classes of fire</ContentEyebrow>

          <ConceptBlock title="The Fire Triangle">
            <p>
              Understanding how fire starts, sustains and spreads is fundamental to fire safety. The
              fire triangle model explains the three elements required for combustion: heat (an
              ignition source), fuel (a combustible material) and oxygen (from the air). All three
              must be present simultaneously for a fire to burn. Remove any one element and the fire
              will be extinguished — this principle underpins all firefighting strategies.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heat (ignition source):</strong> Electrical arcing, overheated connections,
                sparks from grinding, hot surfaces, naked flames. In electrical work, heat is most
                commonly generated by high-resistance joints, overloaded conductors and arcing
                faults
              </li>
              <li>
                <strong>Fuel (combustible material):</strong> Cable insulation (PVC, XLPE, LSF),
                wooden trunking, cardboard packaging, dust accumulation, flammable liquids used for
                cleaning, building materials. Switchrooms often contain significant quantities of
                combustible material
              </li>
              <li>
                <strong>Oxygen (air):</strong> Normal atmospheric air contains approximately 21%
                oxygen — more than sufficient to support combustion. Forced ventilation systems in
                buildings can supply additional oxygen to a fire, accelerating its growth
              </li>
            </ul>
            <p>
              For electrical maintenance technicians, the most relevant aspect of the fire triangle
              is the heat element. Electrical faults — particularly loose connections, overloaded
              circuits and arcing — generate sufficient heat to ignite surrounding combustible
              materials. Your role in preventing electrical fires is to identify and rectify these
              heat sources through proper installation, maintenance and testing.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Classes of Fire">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Class</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Examples</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Suitable Extinguishers
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">A</td>
                    <td className="border border-white/10 px-3 py-2">
                      Solid combustible materials
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Wood, paper, textiles, plastics
                    </td>
                    <td className="border border-white/10 px-3 py-2">Water, foam, dry powder</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">B</td>
                    <td className="border border-white/10 px-3 py-2">Flammable liquids</td>
                    <td className="border border-white/10 px-3 py-2">
                      Petrol, diesel, solvents, paints
                    </td>
                    <td className="border border-white/10 px-3 py-2">Foam, CO2, dry powder</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">C</td>
                    <td className="border border-white/10 px-3 py-2">Flammable gases</td>
                    <td className="border border-white/10 px-3 py-2">
                      Propane, butane, methane, natural gas
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Dry powder (isolate gas supply first)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">D</td>
                    <td className="border border-white/10 px-3 py-2">Combustible metals</td>
                    <td className="border border-white/10 px-3 py-2">
                      Magnesium, aluminium, sodium, lithium
                    </td>
                    <td className="border border-white/10 px-3 py-2">Specialist dry powder only</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">F</td>
                    <td className="border border-white/10 px-3 py-2">Cooking oils and fats</td>
                    <td className="border border-white/10 px-3 py-2">Deep fat fryers, chip pans</td>
                    <td className="border border-white/10 px-3 py-2">Wet chemical only</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="mb-2 text-sm font-medium text-red-400">
                Electrical Fires — Special Considerations
              </p>
              <p className="text-sm text-white">
                Electrical fires are not a separate class under BS EN 2. Instead, once the
                electrical supply is isolated, the fire is classified according to the material that
                is burning (typically Class A — plastics and insulation). However, if the equipment
                is still live or potentially live, only CO2 or dry powder extinguishers may be used.
                Never use water, foam or wet chemical on live electrical equipment — these agents
                conduct electricity and will cause electric shock. The priority is always to isolate
                the supply first if it is safe to do so.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> As a maintenance electrician, you are likely to encounter
              Class A fires (burning insulation) caused by electrical faults. Your first action
              should always be to isolate the supply, then use a CO2 extinguisher if safe to do so.
              Never attempt to fight a fire that is beyond the initial stages — evacuate and call
              the fire brigade.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Fire extinguishers — types and colour coding</ContentEyebrow>

          <ConceptBlock title="Extinguisher Types and Colour Codes">
            <p>
              Under BS EN 3, all fire extinguishers in the UK have a red body with a coloured band
              or label identifying the extinguishing agent. Understanding which extinguisher to use
              in each situation is critical — using the wrong type can be ineffective at best and
              dangerous at worst. For electrical maintenance technicians, this knowledge could save
              your life or the lives of your colleagues.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Colour Band</th>
                    <th className="border border-white/10 px-3 py-2 text-left">How It Works</th>
                    <th className="border border-white/10 px-3 py-2 text-left">
                      Safe on Electrics?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Water</td>
                    <td className="border border-white/10 px-3 py-2">All red (no band)</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cools the fuel below ignition temperature
                    </td>
                    <td className="border border-white/10 px-3 py-2">No — conducts electricity</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Foam (AFFF)</td>
                    <td className="border border-white/10 px-3 py-2">Cream</td>
                    <td className="border border-white/10 px-3 py-2">
                      Forms a film that smothers the fire, sealing vapours
                    </td>
                    <td className="border border-white/10 px-3 py-2">No — conducts electricity</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">CO2</td>
                    <td className="border border-white/10 px-3 py-2">Black</td>
                    <td className="border border-white/10 px-3 py-2">
                      Displaces oxygen; does not leave residue
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Yes — preferred for electrics
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Dry powder</td>
                    <td className="border border-white/10 px-3 py-2">Blue</td>
                    <td className="border border-white/10 px-3 py-2">
                      Chemical reaction interrupts the combustion chain
                    </td>
                    <td className="border border-white/10 px-3 py-2">Yes — but leaves residue</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">Wet chemical</td>
                    <td className="border border-white/10 px-3 py-2">Yellow</td>
                    <td className="border border-white/10 px-3 py-2">
                      Cools and forms a soap-like film (saponification)
                    </td>
                    <td className="border border-white/10 px-3 py-2">No — conducts electricity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <AppendixTable
            caption="Extinguisher selection and the electrical restriction"
            source="BS EN 3 — all bodies red, the band identifies the agent"
            headers={['Agent', 'Band colour', 'Use on', 'On live electrical equipment']}
            rows={[
              ['Water', 'Red', 'Solids — wood, paper, textiles', 'NEVER — it conducts'],
              ['Foam', 'Cream', 'Solids and flammable liquids', 'NEVER — it conducts'],
              ['Dry powder', 'Blue', 'Solids, liquids and gases', 'Safe'],
              ['CO₂', 'Black', 'Flammable liquids', 'Safe'],
              ['Wet chemical', 'Yellow', 'Cooking oils and fats', 'NEVER — it conducts'],
            ]}
            notes={
              <>
                Isolate the supply first if it is safe to do so — an isolated fire stops being an
                electrical fire, which widens what you may use on it.
              </>
            }
          />

          <ConceptBlock title="CO2 Extinguishers — The Electrician's Choice">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Safe on live electrical equipment up to 1000 V</li>
              <li>Leaves no residue — important for protecting sensitive equipment</li>
              <li>Horn becomes extremely cold during discharge — never hold it</li>
              <li>Rapid dissipation — fire may re-ignite if heat source not removed</li>
              <li>Not effective outdoors due to wind dispersal</li>
              <li>Risk of asphyxiation in confined spaces — use with caution</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Dry Powder Extinguishers">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Multi-purpose — effective on Class A, B and C fires</li>
              <li>Safe on electrical equipment</li>
              <li>Leaves significant powder residue — damages equipment</li>
              <li>Reduces visibility — can cause disorientation in enclosed spaces</li>
              <li>Does not cool effectively — re-ignition risk</li>
              <li>Not recommended for use indoors in occupied buildings</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical Fire Procedure">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Step 1:</strong> Raise the alarm — activate the nearest manual call point
              </li>
              <li>
                <strong>Step 2:</strong> Isolate the electrical supply if it is safe to do so (use
                the local isolator, distribution board or emergency stop)
              </li>
              <li>
                <strong>Step 3:</strong> Only if the fire is small and you are trained, use a CO2 or
                dry powder extinguisher
              </li>
              <li>
                <strong>Step 4:</strong> If the fire cannot be controlled, evacuate immediately and
                close doors behind you
              </li>
              <li>
                <strong>Step 5:</strong> Call 999 and report to the assembly point
              </li>
              <li>
                <strong>Step 6:</strong> Do not re-enter the building until authorised by the fire
                brigade
              </li>
            </ol>
            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> You should only attempt to fight a fire if it is small (no
              bigger than a waste bin), you have a clear escape route behind you, and you have been
              trained in extinguisher use. Your life is worth more than any piece of equipment. If
              in doubt, get out.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Fire detection systems and alarm categories</ContentEyebrow>

          <ConceptBlock title="Types of Fire Detector">
            <p>
              As an electrical maintenance technician, you will install, maintain and test fire
              detection and alarm systems. BS 5839-1 is the code of practice for fire detection and
              fire alarm systems in non-domestic buildings, and BS 5839-6 covers domestic premises.
              Understanding detector types, system categories and maintenance requirements is
              essential for your role.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Optical smoke detector:</strong> Uses a light source and photosensor;
                detects visible smoke particles from smouldering fires. Suitable for most general
                areas. Can be triggered by dust, steam or aerosols — consider the environment
              </li>
              <li>
                <strong>Ionisation smoke detector:</strong> Contains a small radioactive source;
                very sensitive to fast-flaming fires producing small smoke particles. Being phased
                out due to disposal concerns but still found in many existing installations
              </li>
              <li>
                <strong>Heat detector:</strong> Activates when temperature reaches a fixed threshold
                (typically 57°C or 90°C) or when temperature rises rapidly (rate of rise). Less
                prone to false alarms than smoke detectors. Used in kitchens, garages, boiler rooms
                and dusty environments
              </li>
              <li>
                <strong>Multi-sensor detector:</strong> Combines optical smoke and heat detection in
                a single unit. Uses algorithms to reduce false alarms while maintaining sensitivity.
                Increasingly common in modern installations
              </li>
              <li>
                <strong>Flame detector:</strong> Detects infrared (IR) or ultraviolet (UV) radiation
                from flames. Used in high-ceiling areas, outdoor installations and petrochemical
                facilities where smoke detection is impractical
              </li>
              <li>
                <strong>Aspirating smoke detection (ASD):</strong> Continuously draws air samples
                through a pipe network to a central laser-based detector. Extremely sensitive — can
                detect smoke at pre-combustion stage. Used in server rooms, switchrooms, data
                centres and heritage buildings
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="BS 5839-1 Fire Alarm Categories">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-white">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    <th className="border border-white/10 px-3 py-2 text-left">Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">L1</td>
                    <td className="border border-white/10 px-3 py-2">Life protection</td>
                    <td className="border border-white/10 px-3 py-2">
                      Detection throughout the entire building including roof voids and floor voids
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">L2</td>
                    <td className="border border-white/10 px-3 py-2">Life protection</td>
                    <td className="border border-white/10 px-3 py-2">
                      Detection in escape routes plus rooms opening onto escape routes, plus
                      high-risk areas
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">L3</td>
                    <td className="border border-white/10 px-3 py-2">Life protection</td>
                    <td className="border border-white/10 px-3 py-2">
                      Detection in escape routes and rooms that open onto escape routes
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">L4</td>
                    <td className="border border-white/10 px-3 py-2">Life protection</td>
                    <td className="border border-white/10 px-3 py-2">
                      Detection in escape routes only (corridors, stairwells)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">L5</td>
                    <td className="border border-white/10 px-3 py-2">Life protection</td>
                    <td className="border border-white/10 px-3 py-2">
                      Bespoke system designed to satisfy specific fire engineering objectives
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">P1</td>
                    <td className="border border-white/10 px-3 py-2">Property protection</td>
                    <td className="border border-white/10 px-3 py-2">
                      Automatic detection throughout the entire building
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium">P2</td>
                    <td className="border border-white/10 px-3 py-2">Property protection</td>
                    <td className="border border-white/10 px-3 py-2">
                      Automatic detection in defined high-risk areas only
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Manual Call Points (Break Glass)">
            <p>
              In addition to automatic detection, all fire alarm systems include manual call points
              (MCPs) — the familiar red &quot;break glass&quot; units. BS 5839-1 requires MCPs to be
              installed on every storey at every exit point leading to a place of safety, at a
              height of 1.4 m from floor level. They must be clearly visible and accessible, with a
              maximum travel distance of 45 m from any point in the building to the nearest MCP.
            </p>
            <p>
              An M-category system consists of manual call points only, with no automatic detection.
              This is the minimum standard for most non-domestic premises but may not be sufficient
              for buildings with sleeping risk or unattended operation.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> As a maintenance technician, you must understand fire
              detection systems well enough to carry out routine testing (weekly call point tests,
              monthly detector checks) and to identify faults. You are not expected to design fire
              alarm systems, but you must understand the categories and be able to follow BS 5839-1
              maintenance schedules.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Fire prevention — compartmentation, doors and escape</ContentEyebrow>

          <ConceptBlock title="Fire Compartmentation and Fire Doors">
            <p>
              Passive fire protection — fire compartmentation, fire doors and maintained escape
              routes — is as important as detection and suppression. As an electrical maintenance
              technician, your work directly impacts the integrity of fire compartments every time
              you route cables through walls and floors. Understanding fire stopping requirements is
              an essential part of your competence.
            </p>
            <p>
              <strong>Fire Compartmentation</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                Buildings are divided into fire compartments by fire-resisting walls and floors
              </li>
              <li>Compartments limit fire spread, giving occupants time to evacuate</li>
              <li>Typical compartment walls provide 30, 60 or 120 minutes fire resistance</li>
              <li>Any penetration through a compartment wall or floor must be fire-stopped</li>
              <li>
                Cable penetrations are a major source of compartment breach — always fire-stop
              </li>
              <li>Fire stopping must match the fire resistance period of the wall or floor</li>
            </ul>
            <p>
              <strong>Fire Doors</strong>
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Fire doors are rated FD30 (30 min) or FD60 (60 min)</li>
              <li>Must have intumescent strips (expand in heat to seal gaps)</li>
              <li>Cold smoke seals prevent smoke spread at ambient temperature</li>
              <li>Must be self-closing — never wedge open unless held by automatic release</li>
              <li>Electromagnetic holders release doors on fire alarm activation</li>
              <li>Regular inspection: check strips, seals, closers, gaps (max 3 mm)</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Means of Escape">
            <p>
              Every building must have adequate means of escape — safe routes from any point in the
              building to a place of safety outside. Approved Document B of the Building Regulations
              sets out the requirements for means of escape, including maximum travel distances,
              minimum corridor and stairway widths, and the number of exits required.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Travel distances:</strong> Maximum distance from any point to the nearest
                exit varies by building type — typically 18 m in one direction, 45 m if alternative
                routes are available
              </li>
              <li>
                <strong>Escape routes:</strong> Must be clear of obstructions at all times — never
                store materials or equipment in corridors or stairways
              </li>
              <li>
                <strong>Emergency lighting:</strong> Required on all escape routes to provide
                illumination if the normal supply fails (BS 5266-1)
              </li>
              <li>
                <strong>Exit signage:</strong> Illuminated or photoluminescent exit signs to BS ISO
                7010 / BS 5499 at every exit and change of direction
              </li>
              <li>
                <strong>Final exit doors:</strong> Must open in the direction of escape and be
                operable without a key from the inside
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Fire Risk Assessment">
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <p className="mb-2 text-sm font-medium text-red-400">Fire Risk Assessment</p>
              <p className="mb-2 text-sm text-white">
                The Regulatory Reform (Fire Safety) Order 2005 requires the responsible person to
                carry out a fire risk assessment for all non-domestic premises. The assessment must
                identify fire hazards, identify persons at risk, evaluate the risks, record findings
                and implement appropriate fire safety measures. It must be reviewed regularly and
                whenever there is a significant change in the premises.
              </p>
              <p className="text-sm text-white">
                As a maintenance electrician, you should be aware that your work can introduce new
                fire hazards (e.g., hot work during cable installation) and that you may identify
                existing fire hazards during your work (e.g., damaged fire stopping, overloaded
                circuits, combustible materials stored near electrical equipment). Report all fire
                hazards through the appropriate channels.
              </p>
            </div>
            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Fire marshals (fire wardens) are trained employees
              responsible for implementing the evacuation plan. Their duties include sweeping their
              designated area, checking rooms and toilets, guiding occupants to assembly points,
              assisting persons with disabilities, and reporting to the chief fire marshal. Fire
              marshals receive specific training and should be identifiable (e.g., hi-vis vest).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Electrical causes of fire and prevention</ContentEyebrow>

          <ConceptBlock title="Common Electrical Causes of Fire">
            <p>
              Electrical faults are one of the leading causes of fire in commercial and industrial
              buildings. As an electrical maintenance technician, you are on the front line of fire
              prevention. Understanding how electrical faults cause fires — and how proper
              installation, maintenance and testing can prevent them — is a core competence under
              ST1426.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Overloaded circuits:</strong> When conductors carry more current than their
                rated capacity, they overheat. The insulation degrades, softens and eventually
                ignites. Overloading is often caused by adding loads without upgrading the circuit,
                daisy-chaining extension leads, or bypassing protective devices
              </li>
              <li>
                <strong>Loose connections:</strong> A loose terminal or crimped connection creates a
                high-resistance joint. The power dissipated at the joint (P = I²R) generates
                localised heat. Over time, this heat carbonises the insulation, creating a
                conducting carbon track that can eventually ignite. Loose connections are the most
                insidious fire hazard because they develop gradually and may not trip protective
                devices
              </li>
              <li>
                <strong>Arcing faults:</strong> Arcing occurs when current jumps across a gap —
                typically at a damaged conductor, a corroded connection or a broken cable. Arc
                faults generate temperatures of several thousand degrees Celsius, easily igniting
                surrounding materials. Arc fault detection devices (AFDDs) are now recommended in BS
                7671 for certain locations
              </li>
              <li>
                <strong>Damaged insulation:</strong> Cables that are physically damaged (by nails,
                screws, rodents or age) can develop insulation faults that lead to short circuits
                and arcing. Cables installed in thermal insulation without de-rating are also at
                risk of overheating
              </li>
              <li>
                <strong>Incorrect protective device ratings:</strong> If a fuse or MCB is rated
                higher than the cable's current-carrying capacity, it will not disconnect the supply
                before the cable overheats. Using 30 A fuse wire in a 5 A circuit is a classic
                example
              </li>
              <li>
                <strong>Faulty equipment:</strong> Poorly maintained equipment with worn bearings,
                blocked ventilation or internal faults can overheat and ignite. Regular PAT testing
                and maintenance programmes reduce this risk
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Preventive Measures for Maintenance Technicians">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thermal imaging:</strong> Use infrared thermography during maintenance to
                identify hot spots at connections, busbars and cable joints before they become fire
                hazards. This is increasingly standard practice during periodic inspection
              </li>
              <li>
                <strong>Torque tightening:</strong> Use a torque screwdriver to tighten terminals to
                the manufacturer's specified torque. BS 7671 Regulation 526.1 requires every
                connection to provide durable electrical continuity and adequate mechanical strength
              </li>
              <li>
                <strong>Visual inspection:</strong> Look for signs of overheating — discolouration
                of conductors, melted insulation, burning smells, brown marks on enclosures. Report
                and rectify immediately
              </li>
              <li>
                <strong>Correct cable selection:</strong> Ensure cables are rated for the installed
                conditions — ambient temperature, grouping, thermal insulation, installation method
                (Appendix 4 of BS 7671)
              </li>
              <li>
                <strong>Fire stopping:</strong> After routing cables through compartment walls and
                floors, always apply appropriate fire stopping materials. Use approved proprietary
                systems — not expanding foam or general-purpose sealant
              </li>
              <li>
                <strong>AFDDs:</strong> Consider recommending arc fault detection devices for
                vulnerable locations — timber-framed buildings, premises with sleeping
                accommodation, locations with combustible construction
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Thermography Example and BS 7671 Requirements">
            <p>
              <strong>Thermography Example</strong>
            </p>
            <p>
              During a periodic inspection of a distribution board, a maintenance technician used
              thermal imaging to identify a connection running at 85°C — well above the normal
              operating temperature. Investigation revealed a loose busbar connection that had been
              gradually degrading for months. If left unchecked, this would likely have resulted in
              a fire. The connection was re-torqued and the board returned to service safely.
            </p>
            <p>
              <strong>BS 7671 Requirements</strong>
            </p>
            <p>
              BS 7671:2018+A4:2026 includes specific requirements related to fire prevention:
              Regulation 421 covers protection against fire caused by electrical equipment;
              Regulation 422 addresses precautions where particular risks of fire exist; and Section
              527 covers measures to minimise the spread of fire through wiring systems (fire
              barriers, fire stopping, selection of cable types).
            </p>
            <p className="italic text-white">
              <strong>Note:</strong> The Fire Statistics Monitor published by the Home Office shows
              that approximately 14,000 fires per year in England are caused by electrical faults —
              representing around 50% of all accidental dwelling fires. Proper electrical
              installation, inspection and maintenance is the primary defence. As a maintenance
              technician, your work directly contributes to fire prevention.
            </p>
          </ConceptBlock>

          <SectionRule />

          <VideoCard
            url="https://www.youtube.com/watch?v=uATqqgdO7PY"

            title="House Fire Causes — And the Solution"

            channel="Toolbox Talk For Electricians"

            duration="4:28"

            topic="Where electrical fires actually start, and what prevents them"

            caption="Connects the fire theory on this page back to the loose connections and overloads you meet on site."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A (solids) — Water, foam, dry powder',
              'B (liquids) — Foam, CO2, dry powder',
              'C (gases) — Dry powder (isolate supply)',
              'D (metals) — Specialist dry powder',
              'F (cooking oils) — Wet chemical',
              'Electrical — CO2 or dry powder (isolate first)',
              'BS 5839-1 — Fire detection and alarm systems',
              'BS EN 3 — Fire extinguisher colour coding',
              'RRFSO 2005 — Fire risk assessment duty',
              'BS 7671 — Regs 421, 422, Section 527',
              'Approved Document B — Means of escape',
              'ST1426 — Fire safety awareness KSBs',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section5-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Sustainable Work Practices
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module1-section6-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  First Aid for Electrical Incidents
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule1Section6_1;
