/**
 * Module 1 · Section 3 · Subsection 5 — Emergency Procedures
 * HNC Electrical Engineering for Building Services (Pearson U4001 + Building Services context)
 *   Fire, electrical injury, confined-space rescue, flood, evacuation. Engineer-in-training
 *   perspective: how an HNC supervisor designs site emergency procedures that mesh with the
 *   building&rsquo;s own life-safety systems and the local emergency services.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  ContentEyebrow,
  SectionRule,
  LearningOutcomes,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Emergency Procedures - HNC Module 1 Section 3.5';
const DESCRIPTION =
  'Master emergency planning, response procedures, evacuation, first aid, fire safety, and building services emergencies in commercial and industrial environments.';

const quickCheckQuestions = [
  {
    id: 'emergency-planning',
    question: 'What is the primary purpose of emergency planning?',
    options: [
      'To satisfy insurance requirements',
      'To minimise harm and enable rapid, effective response',
      'To create paperwork',
      'To delegate responsibility',
    ],
    correctIndex: 1,
    explanation:
      'Emergency planning aims to minimise harm to people, property and the environment by ensuring everyone knows what to do before, during and after emergencies through planned, practised procedures.',
  },
  {
    id: 'first-aider-ratio',
    question:
      'What is the minimum first aid provision for a low-risk workplace with 25-50 employees?',
    options: [
      'Nothing required',
      'First aid box only',
      'Appointed person plus first aid box',
      'First aider at work plus first aid box',
    ],
    correctIndex: 2,
    explanation:
      'For low-risk workplaces with 25-50 employees, minimum provision is an appointed person (to take charge of first aid arrangements) plus an adequately stocked first aid box. Higher risk or larger numbers require qualified first aiders.',
  },
  {
    id: 'fire-extinguisher',
    question: 'What colour band identifies a CO2 fire extinguisher?',
    options: ['Red', 'Blue', 'Cream', 'Black'],
    correctIndex: 3,
    explanation:
      'CO2 extinguishers have a black band. Red = water, cream = foam, blue = dry powder. CO2 is suitable for electrical fires and leaves no residue, making it ideal for building services switchrooms.',
  },
  {
    id: 'electrical-rescue',
    question:
      'What is the first action when finding someone receiving an electric shock from a low voltage source?',
    options: [
      'Pull them away immediately',
      'Isolate the supply if safe to do so',
      'Apply first aid',
      'Wait for emergency services',
    ],
    correctIndex: 1,
    explanation:
      "The first priority is to isolate the supply if it can be done quickly and safely. Never touch the casualty while they're still in contact with the electrical source. If isolation isn't possible, use non-conductive material to separate them.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under which regulation must employers assess fire risks and provide appropriate fire safety measures?',
    options: [
      'Health and Safety at Work Act 1974',
      'Regulatory Reform (Fire Safety) Order 2005',
      'Management of Health and Safety at Work Regulations',
      'Construction (Design and Management) Regulations',
    ],
    correctAnswer: 1,
    explanation:
      "The Regulatory Reform (Fire Safety) Order 2005 requires the 'responsible person' (usually the employer) to carry out fire risk assessments and implement appropriate fire safety measures.",
  },
  {
    id: 2,
    question: 'How often should fire evacuation drills be conducted in most workplaces?',
    options: ['Once a year', 'Every 6 months minimum', 'Monthly', 'Only when new staff join'],
    correctAnswer: 1,
    explanation:
      'Fire drills should be conducted at least every 6 months, or more frequently in high-risk premises or where staff turnover is high. Records must be kept of all drills.',
  },
  {
    id: 3,
    question: "What is the role of a 'Fire Warden' or 'Fire Marshal'?",
    options: [
      'To fight fires',
      'To assist with evacuation and ensure areas are clear',
      'To call the fire brigade only',
      'To maintain fire extinguishers',
    ],
    correctAnswer: 1,
    explanation:
      'Fire wardens/marshals assist with evacuation by directing people to exits, checking that their designated areas are clear, reporting to the assembly point, and liaising with emergency services.',
  },
  {
    id: 4,
    question: "What first aid qualification is required to be a 'First Aider at Work'?",
    options: [
      'No formal qualification needed',
      'Completion of HSE approved First Aid at Work course',
      'Medical degree',
      'One-day emergency aid certificate only',
    ],
    correctAnswer: 1,
    explanation:
      'A First Aider at Work (FAW) must hold a valid certificate from an HSE approved First Aid at Work training course (usually 3 days). This is different from an Emergency First Aider (1 day course).',
  },
  {
    id: 5,
    question: 'What should be included in an emergency plan?',
    options: [
      'Fire procedures only',
      'All foreseeable emergencies, roles, actions, communications, and recovery',
      'Contact numbers only',
      'Insurance details',
    ],
    correctAnswer: 1,
    explanation:
      'Emergency plans should cover all foreseeable emergencies (fire, flood, gas leak, chemical spill, etc.), define roles and responsibilities, specify actions, establish communication methods, and include recovery procedures.',
  },
  {
    id: 6,
    question: 'When should you NOT attempt to use a fire extinguisher?',
    options: [
      'When the fire is small and contained',
      'When you have been trained in extinguisher use',
      'When the fire is too large or your escape route may be blocked',
      'When the extinguisher is within reach',
    ],
    correctAnswer: 2,
    explanation:
      "Never attempt to fight a fire if it's too large, spreading rapidly, produces toxic smoke, or if tackling it might block your escape route. Personal safety always comes first - evacuate if in doubt.",
  },
  {
    id: 7,
    question: 'What is the maximum travel distance to an exit in a normal-risk premises?',
    options: [
      '100m',
      '60m (or 30m if only one exit available)',
      '45m (or 25m if only one exit available)',
      'No limit specified',
    ],
    correctAnswer: 2,
    explanation:
      "In normal-risk premises, maximum travel distance is 45m where alternative exits exist, or 25m if there's only one direction of travel. High-risk areas have shorter maximum distances.",
  },
  {
    id: 8,
    question: 'What action should be taken if a refrigerant leak is detected in a plant room?',
    options: [
      'Continue working with windows open',
      'Evacuate, ventilate, and do not re-enter until safe',
      "Ignore if it's a small leak",
      'Repair immediately without breathing apparatus',
    ],
    correctAnswer: 1,
    explanation:
      'Refrigerant leaks can displace oxygen and may be toxic. Evacuate the area, increase ventilation from outside, do not re-enter until levels are confirmed safe, and only approach with appropriate RPE if essential.',
  },
  {
    id: 9,
    question: 'What is the purpose of an emergency assembly point?',
    options: [
      'To provide shelter during emergencies',
      'To account for all personnel and prevent re-entry',
      'To store emergency equipment',
      'To meet with visitors',
    ],
    correctAnswer: 1,
    explanation:
      'The assembly point enables roll call to account for all personnel, prevents uncontrolled re-entry, provides a location for communication, and allows emergency services to be informed of anyone missing.',
  },
  {
    id: 10,
    question: 'For an electrical burn, after ensuring safety, what is the first aid priority?',
    options: [
      'Apply burn cream immediately',
      'Cool the burn with cool running water for at least 20 minutes',
      'Cover with cotton wool',
      'Burst any blisters',
    ],
    correctAnswer: 1,
    explanation:
      'After ensuring the casualty is safe from electrical contact, cool burns with cool running water for at least 20 minutes (ideally within 3 hours). Do not apply creams or burst blisters. Cover loosely and seek medical attention.',
  },
  {
    id: 11,
    question: 'What information should be given when calling 999 for an electrical incident?',
    options: [
      'Name and company only',
      'Location, nature of incident, number of casualties, current condition, hazards present',
      'Time of incident only',
      'Insurance policy number',
    ],
    correctAnswer: 1,
    explanation:
      'Provide: exact location, nature of the incident (electrical), number and condition of casualties, whether power is isolated, any ongoing hazards, access arrangements, and have someone meet the ambulance.',
  },
  {
    id: 12,
    question:
      'How should emergency procedures be communicated to temporary workers and contractors?',
    options: [
      'Not required for short visits',
      'During site induction before work begins',
      'Only if they ask',
      'By email after they leave',
    ],
    correctAnswer: 1,
    explanation:
      'All workers, including temporary workers and contractors, must receive emergency procedure information during induction before starting work. This includes alarm sounds, exits, assembly points, and any specific hazards.',
  },
];

const faqs = [
  {
    question: 'How many first aiders do we need on a construction site?',
    answer:
      'Construction sites are high-risk, so requirements are higher. Generally 1 first aider per 5-50 workers for high-risk sites. Consider shift patterns, site spread, and ensure cover during breaks and absences. The first aid needs assessment should consider specific hazards present.',
  },
  {
    question: 'Can we use water extinguishers on electrical fires?',
    answer:
      'No - water conducts electricity and is dangerous on electrical fires. Use CO2 (black band) for electrical fires. If the power is isolated and confirmed dead, other extinguisher types may then be appropriate for the burning material. CO2 is preferred in switchrooms.',
  },
  {
    question: 'What should we do if the fire alarm activates during work on a live system?',
    answer:
      'Stop work immediately if safe to do so. If you cannot safely make the area safe quickly, leave as the alarm requires - personal safety comes first. If you can safely isolate within seconds, do so. Report to the assembly point and inform the fire warden about any live work in progress.',
  },
  {
    question: 'How do we handle emergencies in confined spaces?',
    answer:
      'Never enter a confined space to rescue without proper equipment and training. Raise the alarm, attempt communication with the casualty, prepare rescue equipment for trained rescuers, and guide emergency services to the location. Untrained rescue attempts often result in multiple casualties.',
  },
  {
    question: 'What records need to be kept for emergency preparedness?',
    answer:
      'Keep records of: fire drills (date, time, evacuation time, issues identified), first aid training certificates and refresher dates, first aid incidents, equipment inspections (extinguishers, alarms, emergency lighting), emergency plan reviews, and any emergency incidents and lessons learned.',
  },
  {
    question: 'How often should emergency lighting be tested?',
    answer:
      'Under BS 5266: monthly function tests (brief operation to confirm lamps illuminate), quarterly 1-hour duration tests (or annually for 3-hour test), and annual full-rated duration test. All tests must be recorded. Replace batteries typically every 4 years.',
  },
];

const HNCModule1Section3_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../h-n-c-module1-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 1.3.5"
            title="Emergency Procedures"
            description="Planning for and responding to emergencies in building services environments"
            tone="purple"
          />

          <TLDR
            points={[
              'You will plan for the foreseeable emergencies on a building services project — fire, electrical injury, confined-space rescue, flood, structural collapse, gas release.',
              'You can write an emergency procedure that names the trigger, the call sequence, the muster point, the roles and the rescue method.',
              'You apply MHSWR Reg 8, the Regulatory Reform (Fire Safety) Order 2005 and the Confined Spaces Regulations 1997 — and know which takes precedence.',
              'You drill the procedure — exercise it, debrief, revise. Untested procedures are presumed inadequate.',
            ]}
          />

          <RegsCallout
            source="MHSWR 1999 — Regulation 8(1)(a)"
            clause="Every employer shall establish and where necessary give effect to appropriate procedures to be followed in the event of serious and imminent danger to persons at work in his undertaking."
            meaning={
              <>
                Reg 8 makes emergency procedures a statutory duty. As an HNC engineer your
                site-specific procedures must integrate with the building owner&rsquo;s fire
                strategy and the principal contractor&rsquo;s evacuation plan — they cannot
                stand alone.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999, Reg 8(1)(a) — legislation.gov.uk"
          />

          <LearningOutcomes
            outcomes={[
              "Develop emergency plans covering foreseeable incidents",
              "Implement effective fire safety and evacuation procedures",
              "Determine appropriate first aid provision for workplaces",
              "Apply first aid principles for electrical incidents",
              "Respond to building services specific emergencies",
              "Maintain emergency equipment and conduct drills",
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ContentEyebrow>Emergency Planning</ContentEyebrow>

          <ConceptBlock title="Emergency Planning">
            <p>
            Effective emergency planning ensures everyone knows what to do when things go wrong.
            The key is to identify potential emergencies, plan responses, train personnel, and
            practice regularly so that response becomes automatic.
            </p>

            
            <p className="text-sm font-medium text-white mb-2">Emergency plan elements:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Foreseeable emergencies:</strong> Fire, flood, gas leak, chemical spill,
            structural failure, medical emergency
            </li>
            <li>
            <strong>Roles and responsibilities:</strong> Who does what - coordinators,
            wardens, first aiders
            </li>
            <li>
            <strong>Warning systems:</strong> How alarm is raised - sounders, voice alarm, PA
            </li>
            <li>
            <strong>Evacuation routes:</strong> Primary and alternative routes, assembly
            points
            </li>
            <li>
            <strong>Emergency contacts:</strong> Emergency services, key personnel, utilities
            </li>
            <li>
            <strong>Recovery:</strong> Re-entry criteria, incident investigation, continuity
            </li>
            </ul>
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Building Services Emergencies
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Electrical shock</strong> — Immediate Actions: Isolate supply, safe rescue, call 999, first aid. Key Hazards: Secondary contact, cardiac arrest</li>
            <li><strong>Gas leak</strong> — Immediate Actions: No ignition sources, evacuate, ventilate, call National Grid. Key Hazards: Explosion, asphyxiation</li>
            <li><strong>Refrigerant leak</strong> — Immediate Actions: Evacuate plant room, ventilate, do not re-enter. Key Hazards: Oxygen displacement, toxicity</li>
            <li><strong>Major water leak</strong> — Immediate Actions: Isolate water, assess electrical risk, evacuate if needed. Key Hazards: Electrical hazard, slip, structural</li>
            <li><strong>Lift entrapment</strong> — Immediate Actions: Reassure occupants, call lift engineer, do not attempt rescue. Key Hazards: Falls, crushing, panic</li>
            </ul>
            
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Practice makes perfect:</strong> Emergency procedures must be practised
            regularly through drills. An untested plan is unlikely to work when actually needed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Fire Safety and Evacuation</ContentEyebrow>

          <ConceptBlock title="Fire Safety and Evacuation">
            <p>
            Fire remains one of the most significant workplace hazards. The Regulatory Reform
            (Fire Safety) Order 2005 requires employers to assess fire risks and implement
            appropriate measures including detection, warning, means of escape, and firefighting
            equipment.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Fire Response - RACE Protocol
            </p>
            
            
            <p className="font-bold text-red-400 mb-1">R - Rescue</p>
            <p className="text-sm">Remove people from immediate danger (only if safe)</p>
            
            
            <p className="font-bold text-amber-400 mb-1">A - Alarm</p>
            <p className="text-sm">Raise the alarm - break glass, shout "Fire!"</p>
            
            
            <p className="font-bold text-yellow-400 mb-1">C - Contain</p>
            <p className="text-sm">Close doors to limit fire spread</p>
            
            
            <p className="font-bold text-green-400 mb-1">E - Evacuate/Extinguish</p>
            <p className="text-sm">Leave via nearest exit / tackle if small and safe</p>
            
            
            

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Fire Extinguisher Types
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Water</strong> — Colour Band: Red (all red). Suitable For: Paper, wood, textiles (Class A). NOT For: Electrical, liquids, metals</li>
            <li><strong>Foam (AFFF)</strong> — Colour Band: Cream. Suitable For: Liquids, solids (Class A, B). NOT For: Electrical, cooking fat</li>
            <li><strong>Dry Powder</strong> — Colour Band: Blue. Suitable For: Multi-purpose (A, B, C, electrical). NOT For: Enclosed spaces (visibility)</li>
            <li><strong>CO2</strong> — Colour Band: Black. Suitable For: Electrical, liquids (Class B). NOT For: Outdoor (wind dispersal)</li>
            <li><strong>Wet Chemical</strong> — Colour Band: Yellow. Suitable For: Cooking oils and fats (Class F). NOT For: Electrical</li>
            </ul>
            
            

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Evacuation Essentials
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Leave immediately when alarm sounds</li>
            <li>Use nearest available exit</li>
            <li>Do not use lifts</li>
            <li>Close doors behind you</li>
            <li>Go to assembly point</li>
            <li>Do not re-enter until authorised</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Warden Duties</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Guide people to exits</li>
            <li>Check designated areas are clear</li>
            <li>Assist those needing help</li>
            <li>Report to assembly point coordinator</li>
            <li>Provide information to fire brigade</li>
            </ul>
            </div>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>For electrical work:</strong> CO2 extinguishers (black band) are preferred in
            switchrooms as they leave no residue. Ensure power is isolated before using water or
            foam.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>First Aid Provision</ContentEyebrow>

          <ConceptBlock title="First Aid Provision">
            <p>
            The Health and Safety (First Aid) Regulations 1981 require employers to provide
            adequate first aid equipment, facilities and personnel. What's "adequate" depends on
            the nature of work, hazards present, number of employees, and access to emergency
            services.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            First Aid Provision Requirements
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>Low risk (office)</strong> — Employees: &lt;25. Minimum Provision: First aid kit + appointed person</li>
            <li><strong>Low risk (office)</strong> — Employees: 25-50. Minimum Provision: First aid kit + EFAW or appointed person</li>
            <li><strong>Low risk (office)</strong> — Employees: 50+. Minimum Provision: First aid kit + FAW (1 per 100)</li>
            <li><strong>Higher risk (construction)</strong> — Employees: &lt;5. Minimum Provision: First aid kit + appointed person</li>
            <li><strong>Higher risk (construction)</strong> — Employees: 5-50. Minimum Provision: First aid kit + EFAW/FAW</li>
            <li><strong>Higher risk (construction)</strong> — Employees: 50+. Minimum Provision: First aid kit + FAW (1 per 50)</li>
            </ul>
            
            <p className="text-xs text-white mt-2">
            EFAW = Emergency First Aid at Work (1 day). FAW = First Aid at Work (3 days).
            </p>
            

            
            <p className="text-sm font-medium text-white mb-2">
            First aid kit contents (minimum):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Guidance leaflet on first aid</li>
            <li>Individually wrapped sterile plasters (assorted sizes)</li>
            <li>Sterile eye pads</li>
            <li>Triangular bandages</li>
            <li>Safety pins</li>
            <li>Sterile wound dressings (medium and large)</li>
            <li>Disposable gloves</li>
            </ul>
            

            <p className="text-sm text-elec-yellow/70">
            <strong>Consider:</strong> For electrical work, consider additional burn dressings.
            AED (defibrillator) access is recommended - cardiac arrest is a risk with electrical
            shock.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Electrical Emergency Response</ContentEyebrow>

          <ConceptBlock title="Electrical Emergency Response">
            <p>
            Electrical emergencies require specific knowledge to respond safely. The rescuer must
            protect themselves from becoming a second casualty while providing rapid assistance to
            the victim.
            </p>

            
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Electric Shock Response Sequence
            </p>
            
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li><strong>1</strong> — Action: Ensure safety. Key Points: Do not touch casualty if still in contact with live source</li>
            <li><strong>2</strong> — Action: Isolate supply. Key Points: Switch off at source if quick and safe, or disconnect plug</li>
            <li><strong>3</strong> — Action: If cannot isolate. Key Points: Use non-conductive material to separate casualty from source</li>
            <li><strong>4</strong> — Action: Call 999. Key Points: State electrical incident - location, condition, whether isolated</li>
            <li><strong>5</strong> — Action: Assess casualty. Key Points: Check response, breathing, circulation (DR ABC)</li>
            <li><strong>6</strong> — Action: CPR if needed. Key Points: 30 compressions : 2 breaths. Use AED if available</li>
            <li><strong>7</strong> — Action: Treat burns. Key Points: Cool with water 20+ mins. Cover loosely. Do not burst blisters</li>
            </ul>
            
            

            <CommonMistake
            title="High Voltage Warning"
            whatHappens={<><ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            High voltage (above 1000V AC) can arc significant distances
            </li>
            <li>
            Do not approach within the safe distance until confirmed isolated
            </li>
            <li>
            Call emergency services and the network operator immediately
            </li>
            <li>Keep others away from the area</li>
            <li>Never attempt rescue from overhead lines or substations</li>
            </ul></>}
            doInstead={<>Follow the safe-system procedure: stop work, escalate, document, and only resume once controls are verified.</>}
            />

            
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            Signs of Electrical Injury
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Entry and exit burns</li>
            <li>Unconsciousness</li>
            <li>Muscle spasm / rigidity</li>
            <li>Cardiac arrhythmia or arrest</li>
            <li>Breathing difficulties</li>
            </ul>
            </div>
            <div>
            <p className="text-sm font-medium text-elec-yellow/80 mb-2">
            AED (Defibrillator) Use
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Turn on and follow voice prompts</li>
            <li>Attach pads as shown</li>
            <li>Ensure no one touching casualty</li>
            <li>Let AED analyse and shock if advised</li>
            <li>Continue CPR when prompted</li>
            </ul>
            </div>
            

            <p className="text-sm text-white italic">
            <strong>Remember:</strong> All casualties of electric shock should be assessed at
            hospital, even if they appear unharmed. Internal injuries and cardiac effects may not
            be immediately apparent.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical Application">
            <p><strong>Example 1: Responding to Electrical Contact</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> A colleague is found unconscious, still holding a faulty
            230V portable tool.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Response Sequence:</strong>
            </p>
            <p className="ml-4 text-red-400">1. STOP - Do not touch them directly</p>
            <p className="ml-4">2. Shout for help - alert others to call 999</p>
            <p className="ml-4">3. Isolate supply - unplug at wall socket or switch off DB</p>
            <p className="ml-4">
            4. If cannot isolate - use non-conductive item (dry wood, plastic) to push tool
            away
            </p>
            <p className="ml-4">5. Once safe - check response: "Are you OK?" + tap shoulders</p>
            <p className="ml-4">6. If no response - open airway, check breathing</p>
            <p className="ml-4">7. If not breathing - start CPR, send for AED</p>
            <p className="ml-4">8. Continue until paramedics arrive or casualty recovers</p>
            <p className="mt-2 text-green-400">
            Key: Your safety first - you can't help if you become a casualty too
            </p>
            </div>
            

            
            <p><strong>Example 2: Fire During Electrical Work</strong></p>
            <p className="text-sm text-white mb-2">
            <strong>Scenario:</strong> Fire breaks out in switchroom while working on
            distribution board.
            </p>
            <div className="bg-black/30 p-3 rounded text-sm text-white">
            <p>
            <strong>Response:</strong>
            </p>
            <p className="ml-4">1. Stop work immediately if safe to do so</p>
            <p className="ml-4">
            2. If small fire and CO2 extinguisher available - consider tackling
            </p>
            <p className="ml-4">3. If fire spreading or uncertain - leave immediately</p>
            <p className="ml-4">4. Close door behind you to contain fire</p>
            <p className="ml-4">5. Raise alarm - operate nearest call point</p>
            <p className="ml-4">6. Evacuate via nearest safe route</p>
            <p className="ml-4">7. Report to assembly point</p>
            <p className="ml-4">
            8. Inform fire warden: "Fire in first floor switchroom, electrical fire"
            </p>
            <p className="mt-2">
            <strong>Do NOT:</strong> Use water or foam extinguisher on electrical fire
            </p>
            </div>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Key Points Summary">
            <div>
            <p><strong>Emergency Preparedness</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>Plan for foreseeable emergencies before they happen</li>
            <li>Assign and train personnel for emergency roles</li>
            <li>Practice through regular drills - at least 6-monthly</li>
            <li>
            Maintain equipment - extinguishers, alarms, emergency lighting
            </li>
            <li>Review and update plans after drills and incidents</li>
            </ul>
            </div>

            <div>
            <p><strong>Fire Safety Essentials</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>RACE: Rescue, Alarm, Contain, Evacuate/Extinguish</li>
            <li>CO2 (black band) for electrical fires</li>
            <li>Never tackle fire if unsafe or escape route threatened</li>
            <li>Do not re-enter until authorised</li>
            <li>Account for all personnel at assembly point</li>
            </ul>
            </div>

            <div>
            <p><strong>Electrical Emergency Critical Points</strong></p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
            <li>
            <strong>Never touch:</strong> Someone in contact with live electricity
            </li>
            <li>
            <strong>Isolate first:</strong> Then rescue
            </li>
            <li>
            <strong>All casualties:</strong> Should be assessed at hospital
            </li>
            <li>
            <strong>AED:</strong> Use if available for cardiac arrest
            </li>
            <li>
            <strong>High voltage:</strong> Keep clear, call emergency services
            </li>
            </ul>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Electrical injury in a basement plant room"
            situation={
              <>
                An operative receives an electric shock while working on a sub-distribution
                board in a basement plant room. They are conscious but disorientated, and the
                board is still energised.
              </>
            }
            whatToDo={
              <>
                Apply the rehearsed sequence. Do not touch the casualty until the supply is
                isolated upstream. Send a second person to call 999 and meet the ambulance.
                Once isolated, follow first-aid (DRSABCD), administer oxygen if trained, do
                not move the casualty unless still in danger. Apply RIDDOR &mdash; an electric
                shock causing more than 24-hour absence is a reportable injury under Schedule 1.
                Preserve the scene. Engage the AED if cardiac arrest follows. Brief HSE the
                same day.
              </>
            }
            whyItMatters={
              <>
                Electrical shock victims can suffer delayed cardiac arrest hours after the
                event. Procedures must include hospital escort, follow-up monitoring and
                incident investigation, not just the immediate rescue.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'MHSWR Reg 8 makes emergency procedures a statutory duty for foreseeable serious and imminent danger.',
              'Site procedures integrate with the building&rsquo;s fire strategy and the principal contractor&rsquo;s evacuation plan — never stand alone.',
              'Foreseeable emergencies on building services work: fire, electrical shock, confined-space casualty, flood, structural collapse, gas release.',
              'Each procedure names: trigger, call sequence, muster point, roles, rescue method, communication channel.',
              'Confined Spaces Regulations 1997 require a rescue plan before entry — not after a casualty.',
              'Drill and exercise — untested procedures are presumed inadequate.',
              'Casualty handling for electrical shock includes follow-up cardiac monitoring (delayed arrhythmias).',
              'RIDDOR reporting follows the procedure — not the other way around.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('../h-n-c-module1-section3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 3
              </div>
            </button>
            <button
              onClick={() => navigate('../h-n-c-module1-section3-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Contractor Management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule1Section3_5;
