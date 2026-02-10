import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Building2,
  Siren,
  Phone,
  ClipboardList,
  Shield,
  HeartPulse,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'demolition-survey-requirement',
    question:
      'Before any demolition work begins, which two surveys must be completed as part of the planning process?',
    options: [
      'A fire risk assessment and a noise survey',
      'A structural survey and an asbestos refurbishment/demolition survey',
      'A ground contamination survey and a wildlife survey',
      'A topographical survey and a drainage survey',
    ],
    correctIndex: 1,
    explanation:
      'BS 6187 requires both a structural survey (to determine the condition and construction method of the building) and an asbestos refurbishment/demolition survey (to identify and plan for the safe removal of any asbestos-containing materials) before demolition work begins. These surveys inform the method statement and sequence of operations for the demolition.',
  },
  {
    id: 'exclusion-zone-purpose',
    question:
      'What is the primary purpose of establishing exclusion zones around a demolition site?',
    options: [
      'To prevent theft of materials from the site',
      'To ensure workers take regular breaks away from the demolition area',
      'To prevent unauthorised persons from entering areas where they could be struck by falling debris or affected by dust and noise',
      'To mark out the area where new construction will take place',
    ],
    correctIndex: 2,
    explanation:
      'Exclusion zones are established around demolition sites to prevent unauthorised persons — including members of the public, other site workers, and visitors — from entering areas where they could be struck by falling debris, exposed to harmful dust (including asbestos fibres), or affected by excessive noise. The size of the exclusion zone depends on the height of the structure being demolished and the method of demolition being used.',
  },
  {
    id: 'emergency-assembly-point',
    question:
      'During a site evacuation, what must happen once all persons have reached the assembly point?',
    options: [
      'Workers should return to collect their personal belongings',
      'A roll call must be carried out to account for every person who was on site',
      'Workers should attempt to fight any fire before the fire service arrives',
      'The site manager should immediately begin investigating the cause of the alarm',
    ],
    correctIndex: 1,
    explanation:
      'Once all persons have reached the assembly point, a roll call must be carried out by fire wardens or marshals to account for every person who was on site — including employees, subcontractors, visitors, and delivery drivers. The results of the roll call must be reported to the emergency services on their arrival. No person should re-enter the site until the emergency services have confirmed it is safe to do so.',
  },
];

const faqs = [
  {
    question: 'Who is responsible for preparing the demolition method statement?',
    answer:
      'The demolition method statement must be prepared by the demolition contractor in consultation with a competent engineer. Under BS 6187 (Code of Practice for Full and Partial Demolition), the method statement must detail the sequence of operations, the plant and equipment to be used, the safety precautions, the exclusion zones, and the arrangements for dealing with hazardous materials such as asbestos. The principal contractor under CDM 2015 must ensure that the method statement is in place before any demolition work begins and that all workers have been briefed on its contents.',
  },
  {
    question: 'How many first aiders does a construction site need?',
    answer:
      'The number of first aiders depends on the size of the workforce and the level of risk. HSE guidance suggests that for low-risk workplaces, at least one appointed person should be present for fewer than 25 workers, and at least one first aider for 25 to 50 workers. For higher-risk environments such as construction sites, at least one first aider should be present for every 5 to 50 workers, with an additional first aider for every 50 workers thereafter. The employer must carry out a first aid needs assessment to determine the exact provision required, taking into account the nature of the work, the site layout, and the distance from emergency medical services.',
  },
  {
    question: 'What should I do if I discover a fire on a construction site?',
    answer:
      'If you discover a fire on a construction site, you should follow the RACE procedure: Rescue anyone in immediate danger (only if it is safe to do so), Alarm — raise the alarm by activating the nearest fire alarm call point or shouting "Fire!", Contain — close doors and windows if safe to do so to slow the spread, and Evacuate — leave the building by the nearest safe exit route and proceed to the assembly point. Do NOT attempt to fight the fire unless you have been trained to use the fire extinguisher provided, the fire is small and contained, and you have a clear escape route behind you. Call 999 or 112 immediately.',
  },
  {
    question: 'What is the difference between a fire warden and a first aider on site?',
    answer:
      'A fire warden (also called a fire marshal) is responsible for ensuring the safe evacuation of their designated area during a fire or emergency. Their duties include checking that everyone has left the area, closing doors and windows, directing people to the correct exit route, and reporting to the assembly point that their area is clear. A first aider is trained to provide immediate medical assistance to anyone who is injured or becomes ill on site. They are responsible for administering first aid, maintaining the first aid kit, and recording treatments in the accident book. Some individuals may be trained in both roles, but the responsibilities are distinct.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which British Standard covers the code of practice for full and partial demolition?',
    options: ['BS 5228', 'BS 6187', 'BS 7671', 'BS 8110'],
    correctAnswer: 1,
    explanation:
      'BS 6187 is the Code of Practice for Full and Partial Demolition. It sets out the requirements for planning, managing, and carrying out demolition work safely, including the need for structural surveys, method statements, exclusion zones, and competent contractors. BS 5228 covers noise and vibration control, BS 7671 is the Wiring Regulations, and BS 8110 covers structural concrete.',
  },
  {
    id: 2,
    question:
      'What type of asbestos survey is required before demolition work begins?',
    options: [
      'A management survey',
      'A refurbishment and demolition survey',
      'A visual inspection only',
      'An air quality survey',
    ],
    correctAnswer: 1,
    explanation:
      'A refurbishment and demolition survey is required before any demolition work begins. This is more invasive than a management survey and involves destructive inspection to locate all asbestos-containing materials within the structure, including those that are hidden behind walls, above ceilings, and within floor voids. All identified asbestos must be safely removed by a licensed contractor before demolition can proceed.',
  },
  {
    id: 3,
    question:
      'Which demolition method involves systematically removing a structure from the top downwards?',
    options: [
      'Deliberate controlled collapse',
      'Demolition ball',
      'Piece-by-piece demolition',
      'Explosive demolition',
    ],
    correctAnswer: 2,
    explanation:
      'Piece-by-piece demolition (also known as top-down demolition) involves systematically removing the structure from the top downwards, reversing the order of construction. It is used where the structure is close to other buildings, near public areas, or where the building contains hazardous materials that must be carefully removed. It is the safest method but also the slowest and most expensive.',
  },
  {
    id: 4,
    question:
      'What is the minimum distance from a demolition site that an exclusion zone should typically extend?',
    options: [
      'Equal to the height of the structure',
      'Half the height of the structure',
      'At least 1.5 times the height of the structure',
      '10 metres regardless of building height',
    ],
    correctAnswer: 2,
    explanation:
      'As a general rule, the exclusion zone around a demolition site should extend to at least 1.5 times the height of the structure being demolished. This accounts for the potential fall radius of debris during demolition. The exact distance may be increased depending on the demolition method used, wind conditions, the proximity of public areas, and the recommendations in the demolition method statement.',
  },
  {
    id: 5,
    question:
      'On a construction site with 80 workers, how many first aiders should be available as a minimum according to HSE guidance?',
    options: [
      'One first aider',
      'Two first aiders',
      'Three first aiders',
      'Four first aiders',
    ],
    correctAnswer: 1,
    explanation:
      'For a higher-risk workplace such as a construction site with 80 workers, HSE guidance recommends at least one first aider for the first 50 workers, plus an additional first aider for every additional 50 workers (or part thereof). Therefore, 80 workers would require a minimum of two first aiders. The employer should carry out a first aid needs assessment, which may indicate that more are needed depending on site-specific factors.',
  },
  {
    id: 6,
    question:
      'During a site evacuation, who is responsible for conducting the roll call at the assembly point?',
    options: [
      'The most senior worker present',
      'The fire wardens or fire marshals',
      'The health and safety executive inspector',
      'The emergency services on arrival',
    ],
    correctAnswer: 1,
    explanation:
      'Fire wardens (also called fire marshals) are responsible for conducting the roll call at the assembly point. Each warden is assigned a designated area of the site and must check that their area is clear during evacuation, then report to the assembly point. They use the site register (including the signing-in book for visitors and subcontractors) to account for every person. The results are reported to the emergency services on their arrival.',
  },
  {
    id: 7,
    question:
      'What TWO numbers can be used to contact the emergency services in the UK?',
    options: [
      '999 and 111',
      '999 and 112',
      '112 and 101',
      '999 and 0800',
    ],
    correctAnswer: 1,
    explanation:
      'In the UK, you can contact the emergency services by dialling 999 (the traditional UK emergency number) or 112 (the European emergency number, which also works in the UK). Both numbers connect to the same emergency call centre and can be used to request police, fire, or ambulance services. The 112 number works from any mobile phone, even without a SIM card or credit, and can be useful if 999 is not available.',
  },
  {
    id: 8,
    question:
      'After an emergency evacuation, when is it safe for workers to re-enter the site?',
    options: [
      'Once the fire alarm has stopped sounding',
      'After 15 minutes have passed',
      'Only when the emergency services or the responsible person has confirmed it is safe',
      'Once the roll call has been completed',
    ],
    correctAnswer: 2,
    explanation:
      'Workers must NOT re-enter the site after an evacuation until the emergency services or the responsible person (such as the site manager or senior fire warden) has confirmed that it is safe to do so. Simply completing the roll call or the alarm stopping does not mean the site is safe. There may be structural damage, residual gas leaks, electrical hazards, or other dangers that must be assessed before re-entry is permitted.',
  },
];

export default function CscsCardModule5Section4() {
  useSEO({
    title: 'Demolition & Emergency Procedures | CSCS Card Module 5.4',
    description:
      'Demolition hazards and planning under BS 6187, safe demolition methods, exclusion zones, first aid arrangements, emergency procedures, working with emergency services, and site evacuation and roll call procedures.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-400/20 border border-green-500/30 mb-4">
            <AlertTriangle className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Demolition &amp; Emergency Procedures
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Safe demolition planning and methods, exclusion zones, first aid arrangements,
            emergency procedures, working with emergency services, and site evacuation and
            roll call processes
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Demolition requires</strong> a structural survey, asbestos survey, and method statement before work begins
              </li>
              <li>
                <strong>Exclusion zones</strong> must be at least 1.5&times; the height of the structure
              </li>
              <li>
                <strong>Every worker</strong> must know the emergency procedures, assembly point, and nearest first aider
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>BS 6187</strong> is the code of practice for full and partial demolition
              </li>
              <li>
                <strong>999 and 112</strong> both reach UK emergency services
              </li>
              <li>
                <strong>Never re-enter</strong> a site after evacuation until the all-clear is given
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the main hazards associated with demolition work on construction sites',
              'Describe the planning requirements under BS 6187 including surveys and method statements',
              'Explain the different methods of demolition and when each is appropriate',
              'State the requirements for exclusion zones and public protection during demolition',
              'Describe the first aid arrangements required on a construction site',
              'Explain the emergency procedures for fire, chemical spill, structural collapse, and other emergencies',
              'Describe how to work effectively with the emergency services during an incident',
              'Explain the site evacuation and roll call process including the role of fire wardens',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Demolition Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">01</span>
            Demolition Hazards
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Demolition is one of the most hazardous activities on any construction site. The
                process of dismantling or destroying structures creates a wide range of risks that
                must be carefully identified, assessed, and controlled before any work begins.
                Failure to properly plan and manage demolition work can result in catastrophic
                consequences including structural collapse, serious injury, and death.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Critical Fact:</strong> Demolition work accounts
                  for a disproportionately high number of fatal and serious injuries in the
                  construction industry. The HSE classifies demolition as a high-risk activity
                  requiring specialist planning, competent supervision, and strict adherence to
                  approved method statements.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Principal Demolition Hazards</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Structural collapse</strong> &mdash; premature or
                      uncontrolled collapse of all or part of the structure, potentially burying workers
                      or members of the public beneath falling debris
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Falling materials</strong> &mdash; bricks, concrete,
                      steelwork, timber, roof tiles, and other structural elements falling from height
                      during the demolition process
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Dust exposure</strong> &mdash; silica dust from
                      concrete and masonry, general construction dust, and potentially hazardous
                      substances released during demolition
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Asbestos</strong> &mdash; many buildings constructed
                      before 2000 contain asbestos-containing materials (ACMs) in insulation, floor
                      tiles, roof sheets, pipe lagging, and other locations that must be identified and
                      safely removed before demolition
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Noise</strong> &mdash; extremely high noise levels
                      from hydraulic breakers, crushers, and the impact of falling materials, causing
                      hearing damage without adequate protection
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Underground services</strong> &mdash; gas mains,
                      electricity cables, water pipes, telecommunications cables, and sewers that may
                      run beneath or adjacent to the structure being demolished
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Adjacent properties</strong> &mdash; risk of damage
                      to neighbouring buildings, party walls, and shared structural elements during
                      demolition work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Premature collapse</strong> &mdash; the removal of
                      key structural elements (such as load-bearing walls or steel beams) in the wrong
                      sequence can cause unintended collapse of remaining sections
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Hidden voids and hazards</strong> &mdash; basements,
                      cellars, underground tanks, wells, service ducts, and other concealed spaces that
                      may not be immediately apparent from visual inspection
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                All of these hazards must be identified during the pre-demolition planning phase
                and addressed in the demolition method statement. Workers must be made aware of
                every identified hazard during their site-specific briefing before demolition
                work begins.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Demolition Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">02</span>
            Demolition Planning
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Demolition work must never be undertaken without thorough planning. BS 6187 (Code
                of Practice for Full and Partial Demolition) sets out the requirements for planning,
                managing, and carrying out demolition work safely. The planning process involves
                multiple surveys, a detailed method statement, and the appointment of competent
                persons to oversee every stage of the work.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">BS 6187 Planning Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Structural survey</strong> &mdash; a thorough
                      examination of the building to determine its construction type, condition, and
                      structural stability. This must be carried out by a competent structural engineer
                      and must identify all load-bearing elements, the materials used, and any signs of
                      structural deterioration or previous modification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Asbestos refurbishment/demolition survey</strong> &mdash;
                      a fully invasive survey to locate and identify all asbestos-containing materials
                      within the structure. This is more comprehensive than a standard management survey
                      and involves destructive inspection behind walls, above ceilings, and within floor
                      and service voids. All asbestos must be removed by a licensed contractor before
                      demolition proceeds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Method statement</strong> &mdash; a detailed
                      document setting out exactly how the demolition will be carried out, step by step.
                      It must include the sequence of operations, the plant and equipment to be used,
                      the safety precautions, temporary works and propping requirements, and the
                      arrangements for dealing with hazardous materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Sequence of operations</strong> &mdash; the precise
                      order in which elements of the structure will be removed. The sequence is critical
                      to preventing premature collapse and must be determined by a competent engineer
                      based on the structural survey findings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Exclusion zones</strong> &mdash; the areas around
                      the demolition site where access must be restricted to protect workers, members
                      of the public, and adjacent properties from falling debris and other hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Competent contractor</strong> &mdash; demolition
                      work must only be carried out by a contractor who is competent in demolition
                      operations. Membership of the National Federation of Demolition Contractors (NFDC)
                      provides evidence of competence. The contractor must demonstrate experience,
                      training, and the necessary plant and equipment for the specific type of demolition
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">CDM 2015 Requirement:</strong> Under the
                  Construction (Design and Management) Regulations 2015, demolition is classified
                  as construction work. The principal contractor must ensure that a construction
                  phase plan is in place that covers the demolition, and that all workers have been
                  provided with site-specific induction training covering the hazards and controls
                  identified in the method statement.
                </p>
              </div>

              <p>
                No demolition work should commence until all surveys have been completed, the
                method statement has been approved, all hazardous materials (particularly asbestos)
                have been safely removed, services have been disconnected and capped, and all
                workers have been briefed on the method statement and emergency procedures. Any
                deviation from the approved method statement must be authorised by the competent
                engineer before work continues.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Safe Demolition Methods */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">03</span>
            Safe Demolition Methods
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The method of demolition selected depends on the type and condition of the
                structure, its location, the proximity of adjacent buildings, public areas, and
                underground services, and the presence of hazardous materials. The competent
                engineer specifies the method in the demolition method statement, and it must not
                be changed without their approval.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Deliberate Controlled Collapse</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The structure is weakened in a pre-planned sequence and then pulled or pushed
                    over in a controlled direction using wire ropes attached to mechanical plant.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Requires large exclusion zone (minimum 1.5&times; building height)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Suitable for isolated structures with adequate space around them</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Creates significant dust and noise &mdash; requires dust suppression and hearing protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Relatively fast but requires careful structural engineering to ensure the collapse direction is controlled</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Piece-by-Piece Demolition</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The structure is dismantled systematically from the top downwards, essentially
                    reversing the order of construction. Elements are removed one at a time and
                    lowered to the ground using cranes or placed in skips.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Safest method &mdash; maximum control over the process at every stage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Used where the structure is close to occupied buildings, roads, or public areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Allows for the careful removal and segregation of hazardous materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Slowest and most expensive method, but often the only option in confined or sensitive locations</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Machine Demolition</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Uses heavy plant machinery to demolish the structure. This includes high-reach
                    excavators (with long booms that can reach the top of tall buildings) and
                    hydraulic breakers mounted on excavators for breaking up concrete and masonry.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">High-reach excavators</strong> &mdash; can demolish structures up to 60 metres in height from ground level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span><strong className="text-white">Hydraulic breakers</strong> &mdash; mounted on excavator arms for breaking up concrete foundations, floors, and structural elements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Operators must hold CPCS certification for the specific plant being used</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Ground conditions must be assessed to ensure the plant can operate safely without sinking or overturning</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Siren className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Demolition Ball</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    A heavy steel ball (wrecking ball) is swung from a crane into the structure to
                    break it apart. This is one of the oldest demolition methods.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Rarely used in modern UK demolition due to the difficulty of controlling the ball&rsquo;s path</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Requires a very large exclusion zone due to the unpredictable trajectory of debris</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Generates extreme noise and vibration, potentially damaging adjacent structures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Largely replaced by high-reach excavators which offer much greater precision and control</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">Hand Demolition</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Manual demolition using hand tools and small power tools. Workers physically
                    dismantle the structure by removing individual elements.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Used for small structures, internal strip-outs, or where machine access is not possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Maximum control but very labour-intensive and slow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Workers at height must be protected from falls &mdash; scaffolding, safety nets, or harnesses required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>High risk of manual handling injuries, vibration exposure from power tools, and dust inhalation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Method Selection:</strong> The choice of
                  demolition method is not made by the site worker &mdash; it is determined by the
                  competent engineer based on the structural survey, the location, the proximity of
                  other buildings and public areas, and the presence of hazardous materials. The
                  selected method is documented in the method statement and must be followed exactly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Exclusion Zones & Public Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">04</span>
            Exclusion Zones &amp; Public Protection
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Exclusion zones are areas around a demolition site where access is restricted to
                protect workers, members of the public, and adjacent properties from falling debris,
                dust, noise, and other hazards. The size and extent of the exclusion zone depends on
                the height and type of the structure being demolished, the method of demolition, and
                the surrounding environment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Exclusion Zone Requirements</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Minimum distance</strong> &mdash; the exclusion zone
                      should extend at least 1.5 times the height of the structure being demolished in
                      all directions. This may be increased based on the demolition method, wind
                      conditions, and site-specific risk assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Hoarding</strong> &mdash; solid hoarding must be
                      erected around the perimeter of the demolition site to prevent unauthorised access
                      and to contain debris. Hoarding must be at least 2 metres high and must be
                      maintained in good condition throughout the works
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Warning signs</strong> &mdash; clear signage must be
                      displayed at all entry points warning of demolition in progress, the hazards
                      present, and that unauthorised entry is prohibited. Signs must include pictograms
                      for those who may not read English
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Traffic management</strong> &mdash; where the
                      demolition site is adjacent to public roads, a traffic management plan must be
                      implemented. This may include road closures, diversions, temporary traffic lights,
                      banksmen, and protection barriers to prevent vehicles from entering the exclusion
                      zone
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Scaffold debris netting</strong> &mdash; where
                      scaffolding is erected around the perimeter of a building being demolished,
                      debris netting (also known as monofilament sheeting) must be fixed to the
                      scaffold to prevent small debris, dust, and materials from escaping the
                      demolition area and falling onto people below
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Working near public areas</strong> &mdash;
                      additional measures are required when demolition takes place near public
                      footpaths, roads, schools, hospitals, or residential properties. These may include
                      dedicated lookouts (banksmen), temporary covered walkways for pedestrians, and
                      restricted working hours
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Noise and dust controls</strong> &mdash; water
                      suppression systems must be used to control dust during demolition. Noise levels
                      must be monitored and controlled in accordance with BS 5228 (Code of Practice for
                      Noise and Vibration Control on Construction and Open Sites). Working hours may be
                      restricted by the local authority
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Legal Requirement:</strong> Under the
                  Construction (Design and Management) Regulations 2015, the principal contractor
                  has a duty to prevent unauthorised access to the construction site. Failure to
                  adequately secure a demolition site can result in prosecution by the HSE and, in
                  the event of injury to a member of the public, criminal charges under the Health
                  and Safety at Work etc. Act 1974.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: First Aid Arrangements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">05</span>
            First Aid Arrangements
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every construction site must have adequate first aid provision. The Health and
                Safety (First-Aid) Regulations 1981 require employers to provide equipment,
                facilities, and trained personnel to ensure that employees receive immediate
                attention if they are injured or become ill at work. The level of provision depends
                on the size of the workforce, the nature of the work, and the distance from
                emergency medical services.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">First Aiders and Appointed Persons</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">First aider</strong> &mdash; a person who has
                      completed an HSE-approved first aid at work (FAW) course. They are trained to
                      provide emergency treatment including CPR, treating burns, controlling bleeding,
                      managing fractures, and dealing with unconscious casualties. The FAW certificate
                      is valid for 3 years
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Appointed person</strong> &mdash; someone nominated
                      to take charge of the first aid arrangements. They are not fully trained first
                      aiders but have completed an Emergency First Aid at Work (EFAW) course. They can
                      call the emergency services and look after the first aid equipment. They act as a
                      first point of contact until a qualified first aider or paramedic arrives
                    </span>
                  </li>
                </ul>
              </div>

              {/* First Aid Requirements Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  First Aid Requirements by Workforce Size
                </p>
                <p className="text-xs text-white/50 text-center mb-6">
                  HSE guidance for higher-risk workplaces (including construction sites)
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="w-12 h-10 rounded bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-green-400">&lt;5</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">Fewer than 5 workers</p>
                      <p className="text-xs text-white/60">
                        At least 1 appointed person + first aid kit
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="w-12 h-10 rounded bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-green-400">5-50</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">5 to 50 workers</p>
                      <p className="text-xs text-white/60">
                        At least 1 qualified first aider (FAW) + first aid kit
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="w-12 h-10 rounded bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-green-400">50+</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">More than 50 workers</p>
                      <p className="text-xs text-white/60">
                        1 first aider per 50 workers (or part thereof) + additional first aid kits
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="w-12 h-10 rounded bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                      <HeartPulse className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">Remote or high-risk sites</p>
                      <p className="text-xs text-white/60">
                        Additional provision may be needed &mdash; employer must complete a first aid needs assessment
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4 italic">
                  These are minimum requirements. The employer&rsquo;s first aid needs assessment may
                  identify the need for additional first aiders based on site-specific factors.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">First Aid Kit Contents &amp; Location</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      First aid kits must be clearly marked with a white cross on a green background
                      and kept in an accessible location known to all workers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Contents should include: assorted sterile dressings, eye pads, triangular
                      bandages, safety pins, disposable gloves, conforming bandages, plasters
                      (individually wrapped), microporous tape, resuscitation face shield, foil
                      blanket, and a first aid guidance leaflet
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Kits must be regularly checked and restocked by the appointed person or first
                      aider. Expired items must be replaced immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      On larger sites, additional first aid kits should be distributed across different
                      work areas so that treatment is available within a short walking distance
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Every Worker Must Know</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Emergency contact numbers</strong> &mdash; the
                      numbers for the emergency services (999/112) and the site emergency contact must
                      be displayed prominently on site notice boards and in welfare facilities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Accident book location</strong> &mdash; under
                      RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations
                      2013), all accidents must be recorded in the accident book. Every worker must
                      know where the accident book is kept
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Nearest first aider</strong> &mdash; every worker
                      must know who the first aiders are on site and how to contact them. First aiders
                      should be identifiable (e.g., by wearing a distinctive armband or having their
                      name and location displayed on the site notice board)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Site Induction Requirement:</strong> The location
                  of first aid kits, the names of first aiders, emergency contact numbers, and the
                  location of the accident book must all be covered during the site-specific
                  induction. If you are unsure about any of these on your site, ask your supervisor
                  or check the site notice board immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Emergency Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">06</span>
            Emergency Procedures
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every construction site must have a site emergency plan that covers a range of
                foreseeable emergency scenarios. The emergency plan must be communicated to all
                workers during site induction and must be regularly reviewed and practised through
                drills. The plan must be displayed on the site notice board and copies must be
                available in welfare facilities.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Types of Emergency Covered by the Site Plan</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Fire evacuation</strong> &mdash; the most common
                      type of site emergency. The plan must include the location of fire alarm call
                      points, the alarm signal (which may differ from building site alarms), primary
                      and alternative escape routes, the location of fire extinguishers and their types,
                      and the assembly point. Workers must know the difference between the evacuation
                      alarm and any other site signals (such as crane movement warnings)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Chemical spill response</strong> &mdash;
                      construction sites may store fuels, oils, solvents, adhesives, and other
                      hazardous substances. The plan must include spill containment procedures, the
                      location of spill kits, the COSHH safety data sheets for all substances on
                      site, and the correct PPE to be worn during clean-up. Large spills that could
                      enter watercourses must be reported to the Environment Agency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Structural instability/collapse</strong> &mdash;
                      if a structure shows signs of instability (cracking, movement, bulging walls),
                      the area must be evacuated immediately, the exclusion zone established or
                      extended, and a competent structural engineer called to assess the situation.
                      No one must re-enter the affected area until it has been declared safe
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Severe weather</strong> &mdash; high winds,
                      lightning, heavy rain, snow, or extreme heat may all require work to stop and
                      workers to seek shelter. Cranes and other lifting operations must cease in
                      high winds (typically above 38 mph, though the specific limit depends on the
                      crane type and the load being lifted). The plan must include trigger points for
                      stopping work and shelter locations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Bomb threat</strong> &mdash; if a bomb threat is
                      received, the site must be evacuated immediately using the standard evacuation
                      procedure. Do not use mobile phones or radios near the site. Assemble at the
                      designated point (which may be different from the standard fire assembly point
                      depending on the nature of the threat) and await the police
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Lost or missing person</strong> &mdash; if a
                      person who is recorded as being on site cannot be located, a search must be
                      initiated immediately. This is particularly critical on demolition sites where
                      a worker may have become trapped or fallen into a void. The emergency services
                      must be called if the person is not located quickly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Medical emergency</strong> &mdash; heart attack,
                      stroke, severe allergic reaction, electrocution, fall from height, crush injury,
                      or any other serious medical event. The first aider must be called immediately,
                      and 999/112 dialled without delay. Do not move the casualty unless they are in
                      immediate danger (e.g., from fire or further collapse)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Emergency Procedure Flowchart */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Emergency Procedure Flowchart
                </p>
                <p className="text-xs text-white/50 text-center mb-6">
                  Standard response sequence for any site emergency
                </p>

                <div className="flex flex-col items-center gap-0">
                  {/* Step 1: Discovery */}
                  <div className="w-full max-w-[320px] bg-gradient-to-r from-red-500/20 to-red-400/10 border border-red-500/30 rounded-t-xl p-3 text-center">
                    <p className="text-xs font-bold text-red-400">1. DISCOVERY</p>
                    <p className="text-[11px] text-white/70">
                      An emergency is discovered or a hazard is identified
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-0.5 h-3 bg-white/20" />
                    <div className="w-2 h-2 rotate-45 bg-white/20 -mt-1" />
                  </div>

                  {/* Step 2: Assess */}
                  <div className="w-full max-w-[320px] bg-gradient-to-r from-amber-500/20 to-amber-400/10 border border-amber-500/30 p-3 text-center">
                    <p className="text-xs font-bold text-amber-400">2. ASSESS</p>
                    <p className="text-[11px] text-white/70">
                      Quickly assess the situation &mdash; is it safe to approach? Are others in danger?
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-0.5 h-3 bg-white/20" />
                    <div className="w-2 h-2 rotate-45 bg-white/20 -mt-1" />
                  </div>

                  {/* Step 3: Alert */}
                  <div className="w-full max-w-[320px] bg-gradient-to-r from-orange-500/20 to-orange-400/10 border border-orange-500/30 p-3 text-center">
                    <p className="text-xs font-bold text-orange-400">3. ALERT</p>
                    <p className="text-[11px] text-white/70">
                      Raise the alarm &mdash; activate call point, shout &ldquo;Fire!&rdquo;, or call 999/112
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-0.5 h-3 bg-white/20" />
                    <div className="w-2 h-2 rotate-45 bg-white/20 -mt-1" />
                  </div>

                  {/* Step 4: Evacuate */}
                  <div className="w-full max-w-[320px] bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 border border-yellow-500/30 p-3 text-center">
                    <p className="text-xs font-bold text-yellow-400">4. EVACUATE</p>
                    <p className="text-[11px] text-white/70">
                      Leave by the nearest safe exit route &mdash; do NOT collect belongings or use lifts
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-0.5 h-3 bg-white/20" />
                    <div className="w-2 h-2 rotate-45 bg-white/20 -mt-1" />
                  </div>

                  {/* Step 5: Assemble */}
                  <div className="w-full max-w-[320px] bg-gradient-to-r from-blue-500/20 to-blue-400/10 border border-blue-500/30 p-3 text-center">
                    <p className="text-xs font-bold text-blue-400">5. ASSEMBLE</p>
                    <p className="text-[11px] text-white/70">
                      Proceed to the designated assembly point and report to the fire warden
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-0.5 h-3 bg-white/20" />
                    <div className="w-2 h-2 rotate-45 bg-white/20 -mt-1" />
                  </div>

                  {/* Step 6: Account */}
                  <div className="w-full max-w-[320px] bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-500/30 rounded-b-xl p-3 text-center">
                    <p className="text-xs font-bold text-green-400">6. ACCOUNT</p>
                    <p className="text-[11px] text-white/70">
                      Roll call to account for every person &mdash; report results to emergency services
                    </p>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4 italic">
                  Do NOT re-enter the site until the emergency services or responsible person has
                  confirmed it is safe to do so.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Assembly Point Location &amp; Procedures</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The assembly point must be located at a safe distance from the site &mdash;
                      far enough away to avoid any risk from the emergency (fire, explosion, collapse)
                      but accessible to all workers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The assembly point must be clearly marked with a green and white sign showing
                      the running figure and assembly point symbol
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Workers must remain at the assembly point until the roll call has been
                      completed and the all-clear has been given &mdash; do NOT leave the assembly
                      point to go home, move vehicles, or collect belongings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      If the primary assembly point is compromised (e.g., downwind of a chemical
                      spill), an alternative assembly point must be identified in the emergency plan
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Key Point:</strong> Every worker must know the
                  emergency procedures for their site BEFORE they start work. This information must
                  be covered during the site induction. If you start work on a new site and have not
                  been told the emergency procedures, the location of the assembly point, or the
                  alarm signal, you must raise this with your supervisor immediately &mdash; do NOT
                  commence work until you know how to respond in an emergency.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Working with Emergency Services */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">07</span>
            Working with Emergency Services
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When an emergency occurs on a construction site, the ability to communicate
                effectively with the emergency services can be the difference between life and
                death. Every worker should know how to contact the emergency services and what
                information to provide. On larger sites, designated personnel are appointed to
                liaise directly with the emergency services on their arrival.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Calling 999 or 112</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">999</strong> is the traditional UK emergency
                      number. <strong className="text-white">112</strong> is the European emergency
                      number and also works in the UK. Both connect to the same emergency call centre
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      112 works from any mobile phone, even without a SIM card or credit, and can
                      connect to the nearest available network if your own provider has no signal
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      When you call, you will be asked which service you require: police, fire,
                      ambulance, or coastguard. State the service you need clearly
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Providing Clear Location and Information</p>
                <p className="text-sm text-white/80 mb-3">
                  When calling the emergency services, provide the following information clearly and
                  calmly:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Your exact location</strong> &mdash; the site
                      name, full postal address, and the nearest road or landmark. On large sites,
                      also state which area of the site the emergency is in (e.g., &ldquo;Block C,
                      third floor&rdquo;)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">What has happened</strong> &mdash; describe the
                      nature of the emergency (fire, collapse, injury, chemical spill, etc.) as clearly
                      as possible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">How many casualties</strong> &mdash; state the
                      number of people injured and the nature of their injuries if known
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Any specific hazards</strong> &mdash; mention
                      asbestos, chemicals, gas leaks, electrical hazards, or structural instability so
                      that the emergency services can prepare appropriately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Your name and callback number</strong> &mdash; so
                      the emergency services can contact you if they need further information or
                      directions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Do NOT hang up until the operator tells you to. They may need to give you
                      instructions (e.g., CPR guidance) whilst the ambulance is on its way
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Site Access for Emergency Vehicles</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The site emergency plan must identify the access route for emergency vehicles
                      (fire engines, ambulances, police vehicles). This route must be kept clear of
                      obstructions at all times &mdash; no parking, no material storage, no skips
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      On large sites, a designated meeting point should be established where a
                      nominated person will meet the emergency services and guide them to the scene
                      of the incident
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Gates and barriers must be able to be opened quickly &mdash; do not padlock
                      emergency access gates during working hours. Keys must be held by the site
                      manager or gatekeeper and must be available 24/7 if work is in progress
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The access route must be wide enough for a fire engine (minimum 3.7 metres
                      wide) and strong enough to support the weight of emergency vehicles (minimum
                      carrying capacity of 12.5 tonnes)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Designated Emergency Access Routes</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Emergency access routes must be marked on the site layout plan and indicated
                      on the ground with clear signage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Routes must be maintained in a suitable condition &mdash; no potholes, adequate
                      compaction, appropriate surface material for heavy vehicles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Adequate turning space must be provided so that emergency vehicles can enter
                      and leave the site without reversing long distances
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      On multi-storey buildings, dry risers (or wet risers) must be installed to
                      allow the fire service to connect hoses on upper floors without carrying water
                      up stairwells
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Important:</strong> The site emergency plan
                  should be shared with the local fire service, particularly on large or complex
                  sites. Some fire services carry out familiarisation visits to major construction
                  sites so that they can plan their response in advance. This can significantly
                  reduce response times and improve outcomes in a real emergency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Site Evacuation & Roll Call */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">08</span>
            Site Evacuation &amp; Roll Call
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A well-practised evacuation procedure is essential for ensuring the safety of
                everyone on site during an emergency. The evacuation plan must account for all
                persons on site &mdash; including employees, subcontractors, visitors, delivery
                drivers, and any other persons who have signed in. The plan must be tested
                regularly through practice drills.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Fire Alarm Signals</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Construction sites may use a variety of alarm types: electric bells, air horns,
                      klaxons, or PA systems. The specific alarm signal must be communicated to all
                      workers during site induction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Workers must be able to distinguish the fire alarm from other site signals
                      (such as crane movement warnings, reversing alarms, or lunch break signals)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      On large or noisy sites, multiple alarm points must be positioned so that the
                      alarm can be heard in all working areas. Where noise levels are very high
                      (e.g., during piling or demolition), visual alarms such as flashing beacons
                      may be used in addition to audible alarms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Manual call points (break glass points) must be positioned at exits, on each
                      floor of multi-storey structures, and at regular intervals throughout the site
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Evacuation Routes</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Primary routes</strong> &mdash; the main escape
                      routes from each working area. These must be kept clear of obstructions at all
                      times and must be wide enough for all workers to pass through without delay.
                      Exit signs must be clearly visible and illuminated (or photoluminescent)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Alternative routes</strong> &mdash; secondary
                      escape routes must be available in case the primary route is blocked by fire,
                      smoke, or debris. Workers must know both the primary and alternative routes
                      from their working area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      On multi-storey buildings, at least two stairwells should be available for
                      evacuation. Lifts must NEVER be used during a fire evacuation as they may stop
                      at the fire floor or become trapped due to power failure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Temporary scaffolding stairways and ladders may form part of the evacuation
                      route on construction sites. These must be maintained in safe condition and
                      must not be obstructed by materials or tools
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Fire Warden/Marshal Roles</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Fire wardens (also known as fire marshals) are appointed for each area or floor
                      of the site. They are responsible for ensuring that their designated area is
                      fully evacuated when the alarm sounds
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      They must check all rooms, toilets, welfare facilities, and any areas where
                      workers might not hear the alarm (e.g., plant rooms, below-ground areas)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Fire wardens should close doors and windows behind them as they sweep their
                      area (if it is safe to do so) to slow the spread of fire and smoke
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      They must report to the assembly point and confirm whether their area is clear
                      or whether anyone is unaccounted for. This information is critical for the
                      emergency services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      Fire wardens should wear high-visibility identification (e.g., a coloured
                      armband or tabard) so they are easily recognisable during an evacuation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Roll Call Procedure</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The roll call is conducted at the assembly point by the senior fire warden or
                      site manager using the site signing-in register. Every person who was on site
                      must be accounted for
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Employees</strong> &mdash; checked against the
                      workforce register or electronic signing-in system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Subcontractors</strong> &mdash; all subcontract
                      workers must sign in and out of the site. Their presence must be accounted for
                      during the roll call
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Visitors and delivery drivers</strong> &mdash;
                      the visitors&rsquo; book must be checked. Anyone who signed in as a visitor
                      must be accounted for at the assembly point
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      If anyone is unaccounted for, this must be reported to the emergency services
                      IMMEDIATELY. The fire service will then prioritise a search for the missing
                      person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      The roll call results &mdash; confirming all persons accounted for or
                      identifying those missing &mdash; must be formally reported to the senior
                      fire officer on their arrival
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-red-400">CRITICAL &mdash; Do NOT Re-enter:</strong> Under
                  no circumstances should any person re-enter the site after an evacuation until the
                  emergency services or the responsible person has confirmed it is safe to do so.
                  This applies even if you believe the emergency is over, even if you have left
                  personal belongings inside, and even if you think someone may still be inside. The
                  risk of secondary collapse, toxic fumes, re-ignition of fire, or other hidden
                  dangers is too great. Let the trained emergency services carry out any rescue or
                  search operations.
                </p>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Practice Makes Perfect:</strong> Evacuation
                  drills should be carried out at regular intervals (at least every six months on
                  most construction sites, and more frequently on large or complex sites). Drills
                  allow workers to practise the procedure, identify problems with escape routes or
                  alarm audibility, and ensure that fire wardens are confident in their roles. The
                  results of each drill should be recorded, and any issues identified must be
                  corrected before the next drill.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-green-500 text-white hover:bg-green-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cscs-card-module-6">
              Next: Module 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
