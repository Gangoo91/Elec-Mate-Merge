import {
  ArrowLeft,
  Construction,
  CheckCircle,
  AlertTriangle,
  Search,
  Layers,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cscs-m5s1-excavation-hazards',
    question:
      'A trench 2 metres deep has been dug on site without any support to the sides. What is the most significant hazard?',
    options: [
      'The trench may fill with rainwater overnight',
      'Collapse of the unsupported sides, which could bury workers and cause fatal crushing injuries',
      'Workers may trip over the spoil heap next to the trench',
      'The trench will make it difficult for vehicles to move around the site',
    ],
    correctIndex: 1,
    explanation:
      'Collapse of unsupported excavation sides is the most significant hazard and the leading cause of fatalities in excavation work. Even shallow trenches can collapse without warning, and the weight of soil is sufficient to cause fatal crushing injuries. All excavations must be assessed and, where necessary, supported by battering, stepping, shoring, or the use of trench boxes.',
  },
  {
    id: 'cscs-m5s1-cat-genny',
    question:
      'Before excavation begins, a CAT and Genny are used on site. What is the purpose of this equipment?',
    options: [
      'To measure the depth of the water table below ground level',
      'To detect and locate underground services such as electricity cables, gas pipes, and water mains before digging',
      'To check whether the soil is contaminated with hazardous substances',
      'To test the compressive strength of the ground for foundation design',
    ],
    correctIndex: 1,
    explanation:
      'A CAT (Cable Avoidance Tool) detects electromagnetic signals emitted by live cables and metallic pipes. A Genny (Signal Generator) is used alongside the CAT to apply a signal to specific services, making them easier to detect. Together, they help locate underground services before excavation to prevent accidental strikes on electricity cables, gas mains, water pipes, and telecoms infrastructure.',
  },
  {
    id: 'cscs-m5s1-hand-digging',
    question:
      'Underground service plans show a gas main running through the area to be excavated. At what distance from the known service must you switch to hand digging?',
    options: [
      'Within 2 metres of the known service',
      'Within 1 metre of the known service',
      'Within 500mm of the known service',
      'Hand digging is not required if a CAT scan has been carried out',
    ],
    correctIndex: 2,
    explanation:
      'HSG47 guidance requires that mechanical excavation must stop and hand digging must be used within 500mm of a known underground service. This applies to all service types. Hand digging must use insulated tools where electrical cables may be present. Even with careful CAT and Genny surveys, the exact position of services can vary from the plans, so extreme care is always required.',
  },
];

const faqs = [
  {
    question: 'What is the difference between battering, stepping, and shoring?',
    answer:
      'Battering means sloping the sides of the excavation back at a safe angle so they are less likely to collapse — the angle depends on the soil type. Stepping creates a series of horizontal steps down the excavation sides, reducing the height of each unsupported face. Shoring uses physical supports (hydraulic props, trench sheets, or timber) to hold the sides in place. The method chosen depends on the depth of the excavation, the soil type, the water table level, the duration of the work, and the available space on site. Trench boxes provide a prefabricated protective cage that is placed inside the trench.',
  },
  {
    question: 'How often must excavations be inspected, and by whom?',
    answer:
      'Under the Construction (Design and Management) Regulations 2015, all excavations must be inspected by a competent person: before work starts at the beginning of each shift, at the start of every subsequent shift, and after any event that could affect stability (such as heavy rain, nearby vibration from plant or traffic, or ground movement). The competent person must produce a written inspection report, and these reports must be kept on site for a minimum of 7 days. If a defect is found, no one may enter the excavation until it has been made safe.',
  },
  {
    question: 'What are the minimum safe distances from overhead power lines?',
    answer:
      'In the UK, the minimum safe clearance distances from overhead power lines depend on the voltage. For lines up to 33kV, a minimum clearance of 3 metres must be maintained. For 132kV lines, at least 3 metres clearance is required. For 275kV and 400kV lines, at least 6 metres clearance is required. These distances apply to all parts of plant, equipment, materials, and loads — including at maximum reach or extension. Where work must take place near overhead lines, goal posts or barriers must be erected to define a safe passage height, and a banksman should be appointed to guide tall plant.',
  },
  {
    question: 'What should I do if I accidentally strike an underground service while digging?',
    answer:
      'If you strike an electricity cable: stop work immediately, do NOT touch the cable, keep everyone away from the area, call the electricity network operator and your supervisor, and do not attempt to repair or move the cable. If you strike a gas pipe: stop work immediately, evacuate the area, do NOT use any ignition sources (phones, vehicles, naked flames), call the National Gas Emergency Service on 0800 111 999, and alert site management. For water mains: stop digging, move away if the ground becomes unstable due to water, and call the water company. In all cases, report the incident and do not resume work until the service has been made safe by the utility provider.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is the leading cause of death in excavation work?',
    options: [
      'Flooding of the excavation from groundwater',
      'Collapse of the sides of the excavation, burying workers',
      'Workers falling from ladders placed in the excavation',
      'Contact with contaminated soil or groundwater',
    ],
    correctAnswer: 1,
    explanation:
      'Collapse of the sides is the most common cause of fatal injuries in excavation work. Even a small volume of soil is extremely heavy — one cubic metre of soil weighs approximately 1.5 tonnes. An unsupported excavation can collapse without warning, trapping and crushing anyone inside. This is why all excavations must be assessed and, where necessary, supported.',
  },
  {
    id: 2,
    question: 'What does a CAT (Cable Avoidance Tool) detect?',
    options: [
      'The depth of bedrock below the surface',
      'Electromagnetic signals from live cables and radio frequency signals from metallic pipes',
      'The moisture content of the soil',
      'Whether the ground has been previously excavated',
    ],
    correctAnswer: 1,
    explanation:
      'A CAT detects electromagnetic signals emitted by live electricity cables (power mode), radio frequency signals re-radiated by metallic services such as gas and water pipes (radio mode), and signals applied to specific services by a Genny (signal generator mode). It should always be used in all three modes to maximise the chance of detecting all underground services.',
  },
  {
    id: 3,
    question:
      'Which method of excavation support involves sloping the sides of the trench at a safe angle?',
    options: [
      'Shoring with hydraulic props',
      'Trench box installation',
      'Battering (sloping the sides)',
      'Sheet piling',
    ],
    correctAnswer: 2,
    explanation:
      'Battering involves cutting the sides of the excavation at a slope (batter) rather than leaving them vertical. The angle of the slope depends on the soil type — cohesive soils like clay can support steeper angles than granular soils like sand. Battering requires more space than shoring or trench boxes and is most suitable for wider, open excavations.',
  },
  {
    id: 4,
    question:
      'How close to a known underground service must you switch from mechanical to hand digging?',
    options: [
      'Within 2 metres',
      'Within 1 metre',
      'Within 500mm',
      'Within 100mm',
    ],
    correctAnswer: 2,
    explanation:
      'HSG47 guidance states that mechanical excavation must stop and hand digging must be used within 500mm of a known underground service. This distance applies horizontally and vertically. Insulated hand tools should be used where electricity cables may be present, and operatives must be trained in safe digging practices.',
  },
  {
    id: 5,
    question: 'What colour are gas main covers and markings in the UK?',
    options: [
      'Blue',
      'Yellow',
      'Green',
      'Red',
    ],
    correctAnswer: 1,
    explanation:
      'In the UK, gas services are identified by yellow covers and markings. The standard colour coding for underground services is: red for electricity, blue for water, yellow for gas, green for telecoms/data, and brown or grey for sewers/drainage. Knowing these colours helps you identify which services may be present in an excavation area.',
  },
  {
    id: 6,
    question: 'When must a competent person inspect an excavation?',
    options: [
      'Once a week during the excavation work',
      'Only after the excavation has been completed',
      'Before work starts each shift and after any event likely to affect stability',
      'Only when a worker reports a problem',
    ],
    correctAnswer: 2,
    explanation:
      'A competent person must inspect the excavation before the start of work, at the start of every shift, and after any event that could affect stability — such as heavy rain, vibration from nearby plant or traffic, accidental surcharging, or ground movement. Written reports must be produced and kept on site for at least 7 days.',
  },
  {
    id: 7,
    question:
      'What is the minimum safe clearance distance from 275kV or 400kV overhead power lines?',
    options: [
      '1 metre',
      '3 metres',
      '6 metres',
      '10 metres',
    ],
    correctAnswer: 2,
    explanation:
      'For 275kV and 400kV overhead power lines, a minimum clearance of 6 metres must be maintained from all parts of plant, equipment, materials, and loads at maximum reach. For lines up to 132kV, the minimum clearance is 3 metres. Goal posts, barriers, and banksmen should be used where tall plant operates near overhead lines.',
  },
  {
    id: 8,
    question:
      'A worker has been buried in a trench collapse. What is the correct immediate action?',
    options: [
      'Jump into the trench and begin digging the worker out by hand',
      'Use an excavator to remove the soil as quickly as possible',
      'Do NOT enter the trench — call 999 immediately, as the sides may collapse further',
      'Lower a ladder into the trench and climb down to assess the worker',
    ],
    correctAnswer: 2,
    explanation:
      'You must NEVER enter a collapsed excavation to attempt a rescue. The sides may collapse further, burying the rescuer as well. Call 999 immediately and alert the site emergency services. Keep all personnel away from the trench edges. Only trained rescue teams with appropriate shoring equipment should attempt an excavation rescue. Entering the trench without proper support puts additional lives at risk.',
  },
];

export default function CscsCardModule5Section1() {
  useSEO({
    title: 'Excavations & Underground Services | CSCS Card Module 5.1',
    description:
      'Excavation hazards, supporting methods, underground service detection with CAT and Genny, safe digging practices, overhead power lines, and emergency procedures for the CSCS HS&E test.',
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
            <Construction className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Excavations &amp; Underground Services
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Excavation hazards and support methods, underground service detection using CAT and Genny,
            safe digging practices, overhead power lines, inspection requirements, and emergency
            procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Collapse kills:</strong> Unsupported trench sides can collapse without
                warning &mdash; 1m&sup3; of soil weighs ~1.5 tonnes
              </li>
              <li>
                <strong>CAT &amp; Genny:</strong> Always scan before digging &mdash; detect cables,
                pipes, and services
              </li>
              <li>
                <strong>Hand dig within 500mm:</strong> No mechanical excavation near known services
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Inspect every shift:</strong> Competent person must check before work starts
              </li>
              <li>
                <strong>Overhead lines:</strong> 6m clearance from 275kV/400kV, 3m from up to 132kV
              </li>
              <li>
                <strong>Never enter a collapse:</strong> Call 999 &mdash; further collapse will bury
                rescuers
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the main hazards associated with excavation work including collapse, underground services, and flooding',
              'Describe the planning process for excavation work including site investigation and service detection using CAT and Genny',
              'Explain the different methods of supporting excavations: battering, stepping, shoring, and trench boxes',
              'Identify underground services by their colour coding and describe safe approach distances',
              'State the inspection requirements for excavations under CDM 2015 and who must carry out inspections',
              'Describe safe working practices near overhead power lines and the correct emergency procedures for excavation incidents',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Excavation Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">01</span>
            Excavation Hazards
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Excavation work is one of the most dangerous activities on any construction site.
                Every year in the UK, workers are killed or seriously injured in excavation-related
                incidents. The Health and Safety Executive publishes guidance in{' '}
                <strong>HSG47 &mdash; Avoiding danger from underground services</strong>, which
                sets out the standards for safe excavation work.
              </p>

              <p>
                The hazards associated with excavation work are numerous and can be fatal. Every
                person working in or near an excavation must understand these risks before work
                begins.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Principal Excavation Hazards
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Collapse of sides</strong> &mdash; the most
                      common cause of death in excavation work. Even shallow trenches can collapse
                      without warning. One cubic metre of soil weighs approximately 1.5 tonnes,
                      which is more than enough to crush and suffocate a person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Falling into the excavation</strong> &mdash;
                      workers, members of the public, and children may fall into open trenches and
                      excavations, particularly if edge protection and barriers are inadequate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Contact with underground services</strong>{' '}
                      &mdash; striking electricity cables can cause electrocution and burns; hitting
                      gas mains can cause explosions and fires; damaging water mains can cause
                      flooding and ground instability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Flooding</strong> &mdash; from groundwater
                      ingress, burst water mains, heavy rain, or rising water tables. Flooding can
                      destabilise excavation sides and create drowning hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Hazardous atmosphere</strong> &mdash; deep
                      excavations may contain oxygen-depleted air, carbon dioxide, methane, or
                      hydrogen sulphide from natural ground conditions, contaminated land, or nearby
                      gas leaks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Falling materials</strong> &mdash; spoil heaps
                      placed too close to the edge may fall back into the excavation; tools,
                      materials, and debris can fall onto workers below
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Vehicles at the edge</strong> &mdash; plant
                      and vehicles operating near excavation edges can cause the sides to collapse
                      due to vibration and surcharge loading, or may topple into the excavation
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    HSG47 Key Principle
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    No excavation work should begin until a thorough assessment of the ground
                    conditions, underground services, and surrounding hazards has been completed.
                  </strong>{' '}
                  The risk assessment must consider the type of soil, the depth of the excavation,
                  the presence of underground services, groundwater conditions, the proximity of
                  existing structures and roads, and the methods of support required. This
                  assessment must be carried out or supervised by a competent person.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Spoil Heap Distance
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Excavated material (spoil) must be stored well away from the edge of the
                  excavation to prevent it from falling back in and to avoid placing additional
                  loading (surcharge) on the sides. As a general rule, spoil should be placed at
                  least{' '}
                  <strong className="text-white">
                    1 metre back from the edge of the excavation
                  </strong>
                  , though this distance may need to be greater for deep excavations or unstable
                  ground.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Planning Excavation Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">02</span>
            Planning Excavation Work
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Thorough planning is essential before any excavation work begins. The planning
                process involves understanding what lies beneath the ground, identifying all
                underground services, and establishing safe digging practices. Failure to plan
                properly has been a contributing factor in the majority of excavation-related
                fatalities.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Site Investigation &amp; Service Detection
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Obtain utility plans and drawings</strong>{' '}
                      &mdash; contact all utility providers (electricity, gas, water, telecoms) to
                      obtain up-to-date plans showing the location of their services. These plans
                      are a guide only and may not be accurate &mdash; services can be up to 500mm
                      from their indicated position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        Use a CAT (Cable Avoidance Tool) and Genny (Signal Generator)
                      </strong>{' '}
                      &mdash; the CAT detects electromagnetic signals from live cables and metallic
                      pipes; the Genny applies a known signal to a specific service, making it
                      easier to trace. The CAT must be used in all three modes: power, radio, and
                      genny
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Dig trial holes</strong> &mdash; hand-dug
                      trial holes (also called trial pits or slit trenches) are used to confirm the
                      exact location and depth of services before the main excavation begins. Trial
                      holes should be dug using insulated hand tools
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Visual survey of the area</strong> &mdash;
                      look for evidence of underground services: marker posts, valve covers,
                      manholes, hydrants, junction boxes, overhead lines (which must go underground
                      at some point), and recently disturbed ground
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Safe digging practices</strong> &mdash; use
                      hand digging within 500mm of known services, avoid the use of pickaxes and
                      sharp-pointed tools near cables, use insulated tools where electrical services
                      may be present, and never use a mechanical excavator within 500mm of a service
                    </span>
                  </li>
                </ul>
              </div>

              {/* Underground Service Detection Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-green-400">
                    Underground Service Detection &mdash; CAT &amp; Genny Procedure
                  </p>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {/* Step 1 */}
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 text-center">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-400 text-sm font-bold">1</span>
                      </div>
                      <p className="text-xs font-medium text-green-400 mb-1">Obtain Plans</p>
                      <p className="text-[11px] text-white/60 leading-relaxed">
                        Request up-to-date utility plans from all service providers. Mark expected
                        service routes on the ground.
                      </p>
                    </div>
                    {/* Step 2 */}
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 text-center">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-400 text-sm font-bold">2</span>
                      </div>
                      <p className="text-xs font-medium text-green-400 mb-1">CAT Scan (3 Modes)</p>
                      <p className="text-[11px] text-white/60 leading-relaxed">
                        Sweep the area using <strong className="text-white/80">Power</strong> mode
                        (detects live cables), <strong className="text-white/80">Radio</strong>{' '}
                        mode (metallic pipes), and{' '}
                        <strong className="text-white/80">Genny</strong> mode (applied signal).
                      </p>
                    </div>
                    {/* Step 3 */}
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 text-center">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-400 text-sm font-bold">3</span>
                      </div>
                      <p className="text-xs font-medium text-green-400 mb-1">Trial Holes</p>
                      <p className="text-[11px] text-white/60 leading-relaxed">
                        Hand dig trial holes using insulated tools to confirm the exact position and
                        depth of detected services.
                      </p>
                    </div>
                    {/* Step 4 */}
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 text-center">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-400 text-sm font-bold">4</span>
                      </div>
                      <p className="text-xs font-medium text-green-400 mb-1">Mark &amp; Protect</p>
                      <p className="text-[11px] text-white/60 leading-relaxed">
                        Mark all confirmed service locations clearly on the ground. Establish
                        500mm hand-dig exclusion zones around each service.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-xs text-white/80">
                      <strong className="text-amber-400">Important:</strong> The CAT and Genny must
                      be operated by a trained and competent person. The equipment must be checked
                      and calibrated before each use. A CAT scan alone is not sufficient &mdash;
                      it must be used alongside utility plans and trial holes. Not all services will
                      be detected by a CAT (e.g. plastic water pipes without a tracer wire).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Permit to Dig:</strong> Many sites require a{' '}
                  <strong>Permit to Dig</strong> before any excavation work can commence. This
                  permit confirms that service plans have been obtained, a CAT and Genny survey has
                  been carried out, trial holes have been dug where necessary, the method of
                  support has been determined, and the work area has been marked out. The permit
                  must be signed by a competent person and be available on site throughout the
                  excavation work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Supporting Excavations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">03</span>
            Supporting Excavations
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Excavation sides must be prevented from collapsing. The method of support selected
                depends on the depth of the excavation, the type of soil, the water table level,
                the expected duration of the work, and the available space on site. A competent
                person must determine the appropriate method.
              </p>

              {/* Excavation Support Methods Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-green-400">
                    Excavation Support Methods &mdash; Cross-Sections
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-0 md:gap-px bg-white/5">
                  {/* Battering Panel */}
                  <div className="p-4 sm:p-5 bg-[#1a1a1a]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <span className="text-emerald-400 text-xs font-bold">A</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-emerald-400">Battering (Sloping Sides)</p>
                        <p className="text-xs text-white/50">Angle depends on soil type</p>
                      </div>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-center py-4">
                        <div className="relative w-48 h-32">
                          {/* Ground level line */}
                          <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/30" />
                          <p className="absolute top-0 right-0 text-[9px] text-white/40">Ground level</p>
                          {/* Left slope */}
                          <div
                            className="absolute left-4 top-4 w-16 h-24 bg-emerald-400/10 border-l-2 border-b-2 border-emerald-400/40"
                            style={{ clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)' }}
                          />
                          {/* Right slope */}
                          <div
                            className="absolute right-4 top-4 w-16 h-24 bg-emerald-400/10 border-r-2 border-b-2 border-emerald-400/40"
                            style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)' }}
                          />
                          {/* Bottom of excavation */}
                          <div className="absolute bottom-4 left-20 right-20 h-0.5 bg-emerald-400/60" />
                          {/* Angle indicator */}
                          <p className="absolute bottom-0 inset-x-0 text-center text-[9px] text-white/40">
                            Sides sloped at safe angle
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      The sides are cut at an angle (batter) to reduce the risk of collapse.
                      Cohesive soils (clay) can sustain steeper angles than granular soils (sand,
                      gravel). Requires significantly more space than other methods.
                    </p>
                  </div>

                  {/* Stepping Panel */}
                  <div className="p-4 sm:p-5 bg-[#1a1a1a]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <span className="text-cyan-400 text-xs font-bold">B</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-cyan-400">Stepping</p>
                        <p className="text-xs text-white/50">Horizontal steps reduce face height</p>
                      </div>
                    </div>
                    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-center py-4">
                        <div className="relative w-48 h-32">
                          {/* Ground level line */}
                          <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/30" />
                          <p className="absolute top-0 right-0 text-[9px] text-white/40">Ground level</p>
                          {/* Left steps */}
                          <div className="absolute left-4 top-4 w-6 h-8 bg-cyan-400/10 border-l-2 border-b-2 border-cyan-400/40" />
                          <div className="absolute left-10 top-12 w-6 h-8 bg-cyan-400/10 border-l-2 border-b-2 border-cyan-400/40" />
                          <div className="absolute left-16 top-20 w-4 h-8 bg-cyan-400/10 border-l-2 border-b-2 border-cyan-400/40" />
                          {/* Right steps */}
                          <div className="absolute right-4 top-4 w-6 h-8 bg-cyan-400/10 border-r-2 border-b-2 border-cyan-400/40" />
                          <div className="absolute right-10 top-12 w-6 h-8 bg-cyan-400/10 border-r-2 border-b-2 border-cyan-400/40" />
                          <div className="absolute right-16 top-20 w-4 h-8 bg-cyan-400/10 border-r-2 border-b-2 border-cyan-400/40" />
                          {/* Bottom of excavation */}
                          <div className="absolute bottom-4 left-20 right-20 h-0.5 bg-cyan-400/60" />
                          {/* Label */}
                          <p className="absolute bottom-0 inset-x-0 text-center text-[9px] text-white/40">
                            Steps reduce unsupported face height
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      A series of horizontal steps are cut into the sides. Each step reduces the
                      unsupported face height, making collapse less likely. Also requires
                      additional space beyond the excavation footprint.
                    </p>
                  </div>

                  {/* Shoring Panel */}
                  <div className="p-4 sm:p-5 bg-[#1a1a1a]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                        <span className="text-amber-400 text-xs font-bold">C</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-400">Shoring</p>
                        <p className="text-xs text-white/50">
                          Props, trench sheets, or timber
                        </p>
                      </div>
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-center py-4">
                        <div className="relative w-48 h-32">
                          {/* Ground level line */}
                          <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/30" />
                          <p className="absolute top-0 right-0 text-[9px] text-white/40">Ground level</p>
                          {/* Left wall — trench sheet */}
                          <div className="absolute left-12 top-4 w-1.5 h-24 bg-amber-400/40 rounded-sm" />
                          {/* Right wall — trench sheet */}
                          <div className="absolute right-12 top-4 w-1.5 h-24 bg-amber-400/40 rounded-sm" />
                          {/* Hydraulic props */}
                          <div className="absolute left-14 top-10 right-14 h-1.5 bg-amber-400/60 rounded-full" />
                          <div className="absolute left-14 top-18 right-14 h-1.5 bg-amber-400/60 rounded-full" />
                          <div className="absolute left-14 top-[70px] right-14 h-1.5 bg-amber-400/60 rounded-full" />
                          {/* Bottom of excavation */}
                          <div className="absolute bottom-4 left-12 right-12 h-0.5 bg-amber-400/60" />
                          {/* Label */}
                          <p className="absolute bottom-0 inset-x-0 text-center text-[9px] text-white/40">
                            Trench sheets + hydraulic props
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Trench sheets (steel or aluminium panels) are driven into the ground and held
                      apart by hydraulic props. Timber shoring uses walings and struts. Suitable
                      for deeper trenches where space is limited.
                    </p>
                  </div>

                  {/* Trench Box Panel */}
                  <div className="p-4 sm:p-5 bg-[#1a1a1a]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                        <span className="text-violet-400 text-xs font-bold">D</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-violet-400">Trench Box</p>
                        <p className="text-xs text-white/50">Prefabricated protective cage</p>
                      </div>
                    </div>
                    <div className="bg-violet-500/5 border border-violet-500/20 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-center py-4">
                        <div className="relative w-48 h-32">
                          {/* Ground level line */}
                          <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/30" />
                          <p className="absolute top-0 right-0 text-[9px] text-white/40">Ground level</p>
                          {/* Box outline */}
                          <div className="absolute left-10 top-4 right-10 bottom-4 border-2 border-violet-400/50 rounded-sm bg-violet-400/5" />
                          {/* Spreader bars */}
                          <div className="absolute left-12 top-8 right-12 h-1 bg-violet-400/40 rounded-full" />
                          <div className="absolute left-12 top-[88px] right-12 h-1 bg-violet-400/40 rounded-full" />
                          {/* Worker silhouette */}
                          <div className="absolute left-1/2 -translate-x-1/2 top-12 w-4 h-12 bg-violet-400/20 rounded-t-full" />
                          {/* Label */}
                          <p className="absolute bottom-0 inset-x-0 text-center text-[9px] text-white/40">
                            Prefabricated box protects workers inside
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      A trench box is a prefabricated steel or aluminium cage placed into the
                      excavation. Workers operate inside the box, which protects them from side
                      collapse. Trench boxes can be dragged along the trench as work progresses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Factors Affecting Support Method Selection
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Depth</strong> &mdash; deeper excavations
                      require more robust support. All excavations over 1.2 metres deep should
                      generally be supported unless the ground is exceptionally stable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Soil type</strong> &mdash; granular soils
                      (sand, gravel) collapse more easily than cohesive soils (clay). Made ground
                      (fill) is particularly unstable and unpredictable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Water table</strong> &mdash; a high water
                      table weakens soil and increases the risk of collapse. Dewatering may be
                      needed before excavation can proceed safely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Duration</strong> &mdash; longer-duration
                      excavations are exposed to more weather changes and vibration, requiring more
                      robust support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Nearby structures and roads</strong> &mdash;
                      buildings, roads, and heavy plant near the excavation edge create surcharge
                      loading that increases the risk of collapse
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Underground Services */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">04</span>
            Underground Services
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Underground services are present beneath virtually every street, pavement, and
                developed area in the UK. Striking these services during excavation can have
                catastrophic consequences &mdash; from electrocution and explosions to flooding and
                major service disruption. Understanding the types of services, their identification,
                and safe approach distances is essential.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Types of Underground Services
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Electricity cables</strong> &mdash; high
                      voltage (HV) and low voltage (LV) power cables. Striking an HV cable can be
                      instantly fatal. Even LV cables carry sufficient current to kill
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Gas mains and services</strong> &mdash;
                      high-pressure and low-pressure gas pipes. Damage can cause gas leaks leading
                      to explosions and fires
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Water mains</strong> &mdash; pressurised water
                      supply pipes. Damage causes flooding, ground instability, and loss of water
                      supply
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Telecommunications cables</strong> &mdash;
                      copper and fibre optic cables for telephone and broadband. Damage causes
                      widespread service disruption
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Sewers and drains</strong> &mdash; foul and
                      surface water drainage. Damage can cause contamination and flooding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Data cables</strong> &mdash; fibre optic
                      cables carrying internet and data traffic. Damage can affect critical
                      infrastructure including hospitals and emergency services
                    </span>
                  </li>
                </ul>
              </div>

              {/* Colour Coding Grid */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-green-400">
                    UK Underground Service Colour Coding
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/5">
                  <div className="p-3 bg-[#1a1a1a] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/30 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-red-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-red-400">Red</p>
                      <p className="text-[11px] text-white/60">Electricity</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#1a1a1a] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/30 border border-yellow-500/40 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-yellow-400">Yellow</p>
                      <p className="text-[11px] text-white/60">Gas</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#1a1a1a] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/30 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                      <Layers className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-blue-400">Blue</p>
                      <p className="text-[11px] text-white/60">Water</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#1a1a1a] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/30 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                      <Search className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-green-400">Green</p>
                      <p className="text-[11px] text-white/60">Telecoms / Data</p>
                    </div>
                  </div>
                  <div className="p-3 bg-[#1a1a1a] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-500/30 border border-gray-500/40 flex items-center justify-center flex-shrink-0">
                      <Construction className="h-4 w-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400">Brown / Grey</p>
                      <p className="text-[11px] text-white/60">Sewers / Drainage</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    500mm Hand Digging Rule
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    All mechanical excavation must stop at 500mm from a known underground service.
                  </strong>{' '}
                  Within this 500mm exclusion zone, only hand digging is permitted. Use insulated
                  hand tools (spades and shovels with insulated handles) where electricity cables
                  may be present. Never use pickaxes, forks, or sharp-pointed tools near cables.
                  Dig alongside the service, not directly on top of it. Once exposed, support the
                  service to prevent damage from its own weight or backfill pressure.
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Safe Approach to Exposed Services
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Once underground services are exposed in an excavation, they must be treated with
                  extreme care. Electricity cables must not be touched, pulled, or levered with
                  tools &mdash; even if they appear to be de-energised, they may still be live. Gas
                  pipes must not be used as steps or supports. Exposed services must be clearly
                  marked, protected from further damage, and supported if they span the excavation.
                  All personnel working in the excavation must be briefed on the location and type
                  of exposed services.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Edge Protection & Access */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">05</span>
            Edge Protection &amp; Access
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                All open excavations present a falling hazard. Adequate edge protection must be
                provided to prevent workers, members of the public, and vehicles from falling in.
                Safe means of access and egress must also be provided so that workers can enter and
                leave the excavation safely and quickly in an emergency.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Edge Protection Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Barriers around all open excavations</strong>{' '}
                      &mdash; substantial barriers (not just tape) must be placed around every open
                      excavation. These must be visible, robust enough to prevent people from
                      falling in, and maintained throughout the work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Guard rails</strong> &mdash; where there is a
                      risk of falling 2 metres or more, a guard rail system is required. The top
                      rail must be at least 950mm above the edge, with an intermediate rail and a
                      toe board (at least 150mm high) to prevent materials from being kicked in
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Stop blocks for vehicles</strong> &mdash;
                      physical stop blocks (baulk timbers or concrete blocks) must be placed along
                      excavation edges where vehicles operate. These prevent vehicles from driving
                      or rolling into the excavation and reduce the surcharge loading on the edge
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Lighting and signage</strong> &mdash;
                      excavations must be clearly visible, especially in poor light. Warning signs,
                      reflective barriers, and hazard lighting should be used. Excavations left open
                      overnight must be securely covered or fenced
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Covering excavations</strong> &mdash; where
                      practicable, excavations should be covered when not being worked on. Covers
                      must be strong enough to support any loads that may be placed on them
                      (workers, materials, vehicles) and must be clearly marked or fixed in place to
                      prevent displacement
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Safe Access &amp; Egress
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Ladders</strong> &mdash; ladders must extend
                      at least 1 metre above the excavation edge to provide a secure handhold. They
                      must be securely tied or footed, set at the correct angle (1:4 ratio), and
                      placed on a firm, level base
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Ramps</strong> &mdash; for shallow
                      excavations, properly constructed ramps with non-slip surfaces may be used for
                      pedestrian and wheelbarrow access. Ramps must be secured to prevent movement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Maximum travel distance</strong> &mdash; the
                      maximum travel distance from any point in the excavation to the nearest exit
                      point must allow safe and rapid evacuation in an emergency. As a general
                      guide, an exit point should be provided at least every 25 metres along the
                      length of a trench
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Steps and stairways</strong> &mdash; for
                      large, deep, or long-duration excavations, purpose-built steps or stairways
                      may be more appropriate than ladders, providing safer and easier access
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Public Protection:</strong> Where excavations
                  are near public areas (footpaths, roads, school grounds), additional measures are
                  required. These include solid hoarding (not just barriers), safe pedestrian
                  diversions with ramps for wheelchair users, visible warning signs, and covering or
                  securely fencing all excavations outside working hours. Under the New Roads and
                  Street Works Act 1991, excavations in public highways must comply with specific
                  signing and guarding requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Inspection Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">06</span>
            Inspection Requirements
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Under the Construction (Design and Management) Regulations 2015 (CDM 2015), all
                excavations must be inspected by a competent person at specified intervals.
                Inspections are a legal requirement and are essential for identifying deterioration,
                water ingress, ground movement, or any other changes that could affect the stability
                of the excavation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  When Must Inspections Take Place?
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Before the start of work</strong> &mdash;
                      before anyone enters the excavation for the first time, a competent person
                      must inspect the support systems, edge protection, access arrangements, and
                      overall condition
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">At the start of every shift</strong> &mdash;
                      conditions can change overnight or between shifts due to weather, vibration,
                      or ground movement. A fresh inspection is required before each new shift
                      begins working in the excavation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">
                        After any event likely to affect stability
                      </strong>{' '}
                      &mdash; this includes heavy rain, flooding, nearby blasting or piling,
                      vibration from heavy plant, vehicles operating close to the edge, accidental
                      surcharging, or any observed ground movement or cracking
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Competent Person &amp; Written Reports
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Competent person</strong> &mdash; the person
                      carrying out the inspection must have sufficient training, experience, and
                      knowledge to identify defects and hazards in excavation support. They must
                      understand the type of ground, the support system in use, and the signs of
                      deterioration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Written reports</strong> &mdash; each
                      inspection must result in a written report completed on the same shift.
                      The report must include the date, time, location, name of the inspector,
                      conditions observed, any defects found, and actions taken
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">7-day records</strong> &mdash; inspection
                      reports must be kept on site and made available for at least 7 days after the
                      inspection. They must be available for review by the HSE or any other
                      enforcing authority
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Action on defects</strong> &mdash; if a defect
                      is identified, the competent person must take immediate action. This may
                      include stopping work, evacuating the excavation, carrying out repairs or
                      additional support, and only permitting re-entry once the defect has been
                      rectified
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    No Entry Without Inspection
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    No worker may enter an excavation until it has been inspected and declared safe
                    by a competent person.
                  </strong>{' '}
                  If conditions change during the shift &mdash; for example, if heavy rain begins
                  or vibration from nearby piling is felt &mdash; all workers must leave the
                  excavation and a fresh inspection must be carried out before work resumes. The
                  competent person has the authority to stop work at any time if they consider the
                  excavation to be unsafe.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Working Near Overhead Power Lines */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">07</span>
            Working Near Overhead Power Lines
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Excavation work often takes place in areas where overhead power lines are present.
                Contact with overhead lines &mdash; or even approaching too close &mdash; can
                cause fatal electrocution. Electricity can arc (jump) across air gaps, so direct
                contact is not necessary for a fatal incident to occur. HSG47 and the Energy
                Networks Association (ENA) guidance set out the requirements for working safely
                near overhead power lines.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-red-400">
                    Minimum Safe Clearance Distances (UK)
                  </p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-amber-400 mb-1">3m</p>
                      <p className="text-xs font-medium text-amber-400 mb-1">Up to 33kV</p>
                      <p className="text-[11px] text-white/60">
                        Most common distribution lines found in residential and commercial areas
                      </p>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-orange-400 mb-1">3m</p>
                      <p className="text-xs font-medium text-orange-400 mb-1">132kV</p>
                      <p className="text-[11px] text-white/60">
                        Regional transmission lines &mdash; larger pylons with greater clearance
                      </p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-red-400 mb-1">6m</p>
                      <p className="text-xs font-medium text-red-400 mb-1">275kV / 400kV</p>
                      <p className="text-[11px] text-white/60">
                        National Grid transmission lines &mdash; the highest voltages carried on
                        large steel pylons
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Control Measures for Overhead Power Lines
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Goal posts and barriers</strong> &mdash;
                      physical height restriction barriers (goal posts) must be erected on all
                      access routes to the work area where overhead lines are present. These define
                      a maximum safe passage height and prevent tall plant from approaching the
                      lines
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Banksman for tall plant</strong> &mdash; a
                      trained banksman must be appointed to guide excavators, cranes, concrete
                      pumps, and any other tall plant working near overhead lines. The banksman must
                      maintain constant visual contact with both the plant and the power lines
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Exclusion zones</strong> &mdash; define a
                      clear exclusion zone beneath and around overhead power lines where no work,
                      storage of materials, or movement of tall plant is permitted without specific
                      controls in place
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Avoid tipping and raising materials</strong>{' '}
                      &mdash; scaffold poles, steel reinforcement, long ladders, and other
                      conductive materials must not be raised or carried upright near overhead power
                      lines. Even materials that are not normally conductive can become so when wet
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Contact the network operator</strong> &mdash;
                      before starting work near overhead lines, contact the Distribution Network
                      Operator (DNO) or National Grid. They can advise on safe working distances,
                      provide on-site guidance, and in some cases arrange for lines to be
                      temporarily diverted or switched off
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    If Contact or Arcing Occurs
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If plant or equipment contacts or comes close to an overhead power line:{' '}
                  <strong className="text-white">
                    the operator must stay in the cab and not touch any metal parts.
                  </strong>{' '}
                  Everyone else must stay at least 5 metres away from the plant and any trailing
                  cables. Call 999 and the network operator immediately. The operator should only
                  leave the cab if there is an immediate risk of fire &mdash; in which case they
                  must jump clear (both feet together, not stepping) to avoid creating a path for
                  current to flow through their body to the ground (step potential).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Emergency Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">08</span>
            Emergency Procedures
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Despite all precautions, emergencies can occur during excavation work. Having
                clear, rehearsed emergency procedures is essential. Every worker involved in
                excavation work must understand the emergency plan before they start, including how
                to raise the alarm, where to assemble, and what actions to take for different
                scenarios.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Rescue from Collapsed Excavations
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    <strong className="text-white">
                      NEVER enter a collapsed excavation to attempt a rescue.
                    </strong>{' '}
                    This is the single most important rule in excavation emergency response. The
                    sides of a collapsed excavation are highly unstable and are very likely to
                    collapse again, burying the rescuer alongside the original casualty. Multiple
                    fatalities have occurred when well-meaning colleagues have entered collapsed
                    trenches to help.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Call 999 immediately</strong> &mdash;
                        request the fire service, who have specialist trench rescue teams and
                        equipment
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Keep everyone away</strong> &mdash;
                        establish a safe perimeter around the collapsed excavation. Do not allow
                        anyone near the edges
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Communicate with the casualty</strong>{' '}
                        &mdash; if the casualty is conscious, talk to them, reassure them, and tell
                        them help is on the way. Do this from a safe distance, not from the edge
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Account for all personnel</strong> &mdash;
                        carry out a headcount to determine how many workers were in the excavation
                        at the time of collapse
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Gas Detection &amp; Hazardous Atmospheres
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Test before entry</strong> &mdash; before
                      entering any deep excavation (generally 1.2 metres or more), the atmosphere
                      must be tested for oxygen levels, flammable gases, and toxic gases using a
                      calibrated multi-gas detector
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Continuous monitoring</strong> &mdash; in
                      excavations where gas may accumulate (near landfill sites, contaminated land,
                      or gas mains), continuous atmospheric monitoring should be carried out
                      throughout the working period
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Evacuate on alarm</strong> &mdash; if a gas
                      detector alarms, all workers must leave the excavation immediately using the
                      nearest exit point. Do not return until the source of the gas has been
                      identified and the atmosphere has been confirmed safe
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Oxygen depletion</strong> &mdash; normal
                      atmospheric oxygen is 20.9%. If levels drop below 19.5%, the excavation must
                      be evacuated. Oxygen can be depleted by biological decomposition, chemical
                      reactions in the soil, or displacement by other gases
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Flooding Response
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Evacuate immediately</strong> &mdash; if water
                      begins to enter the excavation unexpectedly, all workers must leave
                      immediately. Flooding destabilises the sides and creates a drowning hazard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Identify the source</strong> &mdash; determine
                      whether the water is from groundwater, a burst main, rainfall, or another
                      source. This determines the response
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Do not re-enter</strong> &mdash; the
                      excavation must not be re-entered until the water has been removed, the
                      support system has been inspected by a competent person, and the sides have
                      been confirmed as stable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Pumping</strong> &mdash; water may be pumped
                      from the excavation, but this must be done carefully. Rapid dewatering can
                      itself cause instability. Pumped water must be discharged to an appropriate
                      location, not back onto the excavation sides
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Reporting Incidents
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">RIDDOR reporting</strong> &mdash; excavation
                      collapses, strikes on underground services, and near-miss incidents must be
                      reported under the Reporting of Injuries, Diseases and Dangerous Occurrences
                      Regulations 2013 (RIDDOR). A collapse of an excavation is a dangerous
                      occurrence even if no one is injured
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Site accident book</strong> &mdash; all
                      incidents, injuries, and near misses must be recorded in the site accident
                      book. The record should include the date, time, location, names of those
                      involved, a description of what happened, and the actions taken
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Preserve the scene</strong> &mdash; after a
                      serious incident, the area must be preserved for investigation by the HSE or
                      other enforcing authority. Do not disturb the scene, move equipment, or
                      backfill the excavation until authorised to do so
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Service strikes</strong> &mdash; all strikes
                      on underground services must be reported to the utility provider immediately,
                      even if no damage is apparent. Hidden damage to cables and pipes can cause
                      delayed failures that are potentially more dangerous
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Emergency Plan Essentials:</strong> Before
                  excavation work begins, the site must have a documented emergency plan that
                  covers: the location of the nearest telephone or means of calling the emergency
                  services, the address and grid reference of the site (for directing ambulances),
                  the names and locations of trained first aiders, the location of first aid
                  equipment, the alarm signal and assembly point, specific procedures for trench
                  collapse, gas detection alarms, flooding, and service strikes, and the contact
                  details for all relevant utility providers. All workers must be briefed on this
                  plan before entering the excavation.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../cscs-card-module-5-section-2">
              Next: Confined Spaces &amp; Fire Safety
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}

