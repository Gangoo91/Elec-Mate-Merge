import {
  ArrowLeft,
  CheckCircle,
  DoorOpen,
  AlertTriangle,
  ShieldAlert,
  Flame,
  Wind,
  Droplets,
  Thermometer,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'confined-space-definition',
    question:
      'Under the Confined Spaces Regulations 1997, which TWO conditions must both be present for a space to be classified as a confined space?',
    options: [
      'It must be underground and have poor lighting',
      'It must be substantially enclosed and have a foreseeable risk of serious injury from hazardous conditions',
      'It must be smaller than 2 metres wide and require a permit to enter',
      'It must have restricted access and be located on a construction site',
    ],
    correctIndex: 1,
    explanation:
      'Under the Confined Spaces Regulations 1997, a confined space must be substantially (but not necessarily entirely) enclosed AND there must be a reasonably foreseeable risk of serious injury from hazardous conditions within the space or from substances or conditions within it. Both conditions must be met. Size alone does not determine whether a space is confined.',
  },
  {
    id: 'rescuer-fatalities',
    question:
      'What percentage of confined space fatalities involve would-be rescuers who enter without proper equipment or training?',
    options: [
      'Approximately 20%',
      'Approximately 40%',
      'Approximately 60%',
      'Approximately 80%',
    ],
    correctIndex: 2,
    explanation:
      'Approximately 60% of confined space fatalities involve would-be rescuers. This shocking statistic underlines why emergency rescue plans must be in place before entry, why non-entry rescue methods are preferred, and why untrained persons must never attempt rescue by entering a confined space. Proper rescue equipment such as tripods and winches allows extraction without additional persons entering the hazardous atmosphere.',
  },
  {
    id: 'fire-extinguisher-types',
    question:
      'Which type of fire extinguisher should be used on a fire involving live electrical equipment?',
    options: [
      'Water extinguisher (red band)',
      'Foam extinguisher (cream band)',
      'CO2 extinguisher (black band)',
      'Wet chemical extinguisher (yellow band)',
    ],
    correctIndex: 2,
    explanation:
      'CO2 (carbon dioxide) extinguishers, identified by a black band on the red body, are safe to use on fires involving live electrical equipment because CO2 is a non-conductive gas. Water, foam, and wet chemical extinguishers must NEVER be used on live electrical equipment as they conduct electricity and could cause electrocution. Once the electrical supply is isolated, other extinguisher types may be appropriate depending on what is burning.',
  },
];

const faqs = [
  {
    question: 'Can I enter a confined space without a permit to work?',
    answer:
      'No. The Confined Spaces Regulations 1997 require that where entry to a confined space is necessary, a safe system of work must be in place. In practice, this almost always means a formal permit to work must be issued. The permit ensures that all hazards have been identified, controls are in place, atmospheric monitoring has been carried out, rescue arrangements are ready, and all personnel involved understand the risks and procedures. Entering without a permit is a serious breach of health and safety law and could result in prosecution under the Health and Safety at Work etc. Act 1974.',
  },
  {
    question: 'What should I do if the fire alarm sounds on a construction site?',
    answer:
      'Stop work immediately and make your area safe (shut down equipment, close gas valves if safe to do so). Proceed calmly to the nearest fire exit following the designated escape route. Do not use lifts. Do not stop to collect personal belongings. Go directly to the designated assembly point for your area of the site. Report to the fire warden for a roll call. Do not re-enter the building or site until the all-clear is given by the fire warden or emergency services. If you are the first to discover the fire, activate the nearest fire alarm call point and call 999 if necessary.',
  },
  {
    question: 'What are the three elements of the fire triangle?',
    answer:
      'The fire triangle consists of three elements that must all be present for a fire to start and continue burning: heat (an ignition source such as a spark, flame, or hot surface), fuel (any combustible material such as wood, paper, flammable liquids, or gases), and oxygen (present in the air at approximately 21%). Removing any one of these three elements will extinguish the fire. Fire prevention strategies focus on controlling these elements, particularly keeping ignition sources away from combustible materials and ensuring good housekeeping to minimise fuel sources on site.',
  },
  {
    question: 'What is atmospheric monitoring and why is it required for confined space entry?',
    answer:
      'Atmospheric monitoring is the continuous measurement of the air quality inside a confined space using calibrated gas detection equipment. It measures oxygen levels (normal is 20.9%), flammable gas concentrations (measured as a percentage of the Lower Explosive Limit), and toxic gas levels (such as hydrogen sulphide or carbon monoxide). Monitoring must be carried out before entry and continuously throughout the work. This is required because atmospheric conditions in confined spaces can change rapidly and without warning. A space that tests safe before entry may become dangerous within minutes due to the work being carried out, chemical reactions, or displacement of oxygen.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is an example of a confined space on a construction site?',
    options: [
      'An open-plan office on the third floor',
      'A cable duct running beneath the floor with restricted access',
      'A fenced storage compound in the car park',
      'A scaffolded external wall with sheeting',
    ],
    correctAnswer: 1,
    explanation:
      'A cable duct running beneath the floor is a confined space because it is substantially enclosed and there is a foreseeable risk of serious injury from hazardous conditions such as oxygen depletion, toxic gases, or restricted movement. Open offices, fenced compounds, and scaffolded walls are not confined spaces as they are not substantially enclosed or do not present the specific confined space hazards.',
  },
  {
    id: 2,
    question:
      'What is the FIRST priority when work needs to be done in a confined space?',
    options: [
      'Ensure all workers have the correct PPE',
      'Set up atmospheric monitoring equipment',
      'Avoid entry altogether if the work can be done from outside',
      'Prepare a rescue plan and brief the entry team',
    ],
    correctAnswer: 2,
    explanation:
      'The hierarchy of control under the Confined Spaces Regulations 1997 places avoidance of entry as the first and most important consideration. If the work can be achieved without entering the confined space (for example, by using remote tools, CCTV inspection, or extending equipment from outside), then entry must not take place. Only when entry cannot reasonably be avoided should a safe system of work be established.',
  },
  {
    id: 3,
    question:
      'Why are an estimated 60% of confined space fatalities among rescuers?',
    options: [
      'Rescuers are usually less physically fit than the original workers',
      'Rescue equipment is often faulty',
      'Untrained rescuers enter the hazardous atmosphere without proper protection',
      'Emergency services take too long to arrive',
    ],
    correctAnswer: 2,
    explanation:
      'The majority of rescuer fatalities occur because well-meaning colleagues rush into a confined space to help a casualty without understanding the hazard, without breathing apparatus, and without proper rescue equipment. They are then overcome by the same toxic or oxygen-depleted atmosphere that affected the original casualty. This is why rescue plans must be in place before entry, non-entry rescue methods are preferred, and only trained rescue teams with breathing apparatus should carry out entry rescue.',
  },
  {
    id: 4,
    question: 'What does the fire triangle consist of?',
    options: [
      'Heat, fuel, and oxygen',
      'Smoke, flame, and carbon dioxide',
      'Electricity, gas, and water',
      'Ignition, combustion, and ventilation',
    ],
    correctAnswer: 0,
    explanation:
      'The fire triangle consists of heat (ignition source), fuel (combustible material), and oxygen (present in air). All three elements must be present for a fire to start and sustain itself. Remove any one element and the fire is extinguished. Fire prevention focuses on keeping these elements apart, whilst fire-fighting works by removing one or more elements.',
  },
  {
    id: 5,
    question:
      'A foam extinguisher (cream band) is suitable for which classes of fire?',
    options: [
      'Class A (solids) and Class B (flammable liquids)',
      'Class B (flammable liquids) and Class C (flammable gases)',
      'Class A (solids) and Class F (cooking oils)',
      'Electrical fires and Class D (metals)',
    ],
    correctAnswer: 0,
    explanation:
      'Foam extinguishers (identified by a cream-coloured band) are effective on Class A fires (solid combustible materials such as wood, paper, and textiles) and Class B fires (flammable liquids such as petrol, oil, and solvents). The foam creates a blanket over the burning material, smothering the fire and preventing re-ignition. Foam must NOT be used on live electrical equipment, cooking oil fires, or metal fires.',
  },
  {
    id: 6,
    question:
      'What is the purpose of a hot works permit on a construction site?',
    options: [
      'To record the temperature on site each day',
      'To control fire risk from activities involving heat or flame such as welding, cutting, or soldering',
      'To monitor the heating system in temporary site cabins',
      'To certify that the building fire alarm system is working correctly',
    ],
    correctAnswer: 1,
    explanation:
      'A hot works permit is a formal document that controls fire risk from any work involving heat sources, open flames, or sparks. This includes welding, cutting, grinding, soldering, brazing, and the use of bitumen boilers or hot-air guns. The permit specifies precautions such as removal of combustible materials, provision of fire extinguishers, fire watch duties during and after the work (typically 60 minutes), and ensures the area is checked before work begins.',
  },
  {
    id: 7,
    question:
      'During an emergency evacuation of a construction site, which of the following should you do?',
    options: [
      'Collect your tools and personal belongings before leaving',
      'Use the lift to evacuate quickly from upper floors',
      'Proceed to the designated assembly point and report for roll call',
      'Return to your work area to check that no one has been left behind',
    ],
    correctAnswer: 2,
    explanation:
      'During an emergency evacuation, you should proceed calmly to the designated assembly point using the nearest safe escape route and report to the fire warden for roll call. You must NOT stop to collect belongings, use lifts (which may fail or fill with smoke), or re-enter the building. Checking for missing persons is the responsibility of fire wardens and the emergency services, not individual workers.',
  },
  {
    id: 8,
    question:
      'What type of fire extinguisher has a yellow band and is specifically designed for Class F fires (cooking oils and fats)?',
    options: [
      'Dry powder extinguisher',
      'CO2 extinguisher',
      'Foam extinguisher',
      'Wet chemical extinguisher',
    ],
    correctAnswer: 3,
    explanation:
      'The wet chemical extinguisher is identified by a yellow band on the red body and is specifically designed for Class F fires involving cooking oils and fats. It works by creating a chemical reaction with the burning oil to form a soapy layer (saponification) that seals the surface, preventing oxygen from reaching the fire and stopping re-ignition. Wet chemical extinguishers are most commonly found in commercial kitchens and canteens on construction sites.',
  },
];

export default function CscsCardModule5Section2() {
  useSEO({
    title: 'Confined Spaces & Fire Safety | CSCS Card Module 5.2',
    description:
      'Confined space identification, safe entry procedures, permit to work, fire prevention on construction sites, fire extinguisher types, emergency evacuation, and the fire triangle for the CSCS HS&E test.',
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
            <DoorOpen className="h-7 w-7 text-green-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-3 mx-auto">
            <span className="text-green-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Confined Spaces &amp; Fire Safety
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to identify confined spaces, safe entry procedures and permit-to-work systems,
            fire prevention on construction sites, fire extinguisher types and selection, and
            emergency evacuation procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Confined Spaces Regulations 1997</strong> &mdash; substantially enclosed + foreseeable risk
              </li>
              <li>
                <strong>60%</strong> of confined space fatalities are rescuers
              </li>
              <li>
                <strong>Fire triangle:</strong> heat + fuel + oxygen
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
            <p className="text-green-400/90 text-base font-medium mb-2">Key Facts</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Avoid entry</strong> wherever reasonably practicable
              </li>
              <li>
                <strong>Atmospheric monitoring</strong> must be continuous during entry
              </li>
              <li>
                <strong>5 extinguisher types</strong> &mdash; each for different fire classes
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Define a confined space under the Confined Spaces Regulations 1997 and give construction site examples',
              'Identify the main hazards associated with confined spaces including toxic gas, oxygen depletion, and engulfment',
              'Describe the safe system of work for confined space entry, including permits and atmospheric monitoring',
              'Explain emergency and rescue procedures, including non-entry rescue methods and the role of breathing apparatus',
              'Identify the three elements of the fire triangle and common fire causes on construction sites',
              'Select the correct fire extinguisher type for each class of fire and explain when NOT to fight a fire',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-green-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Confined Space Definition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">01</span>
            Confined Space Definition
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Confined Spaces Regulations 1997</strong> define a confined space as any
                place that is <strong>substantially (but not necessarily entirely) enclosed</strong> and
                where there is a <strong>reasonably foreseeable risk of serious injury</strong> from
                hazardous conditions within the space or from substances or conditions within it. Both
                elements must be present for a space to be classified as confined.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Critical Point:</strong> Size alone does not
                  determine whether a space is confined. A large underground chamber can be a confined
                  space, and a small cupboard may not be. The key test is whether the space is
                  substantially enclosed AND presents a foreseeable risk of serious injury from
                  hazardous conditions such as toxic gas, oxygen depletion, flooding, or engulfment.
                </p>
              </div>

              <p>
                Confined spaces are found throughout construction sites and are not always immediately
                obvious. Workers must be trained to recognise confined spaces and to understand that
                entry should only occur when absolutely necessary and with a proper safe system of work
                in place.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Confined Spaces on Construction Sites
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Tanks and vessels</strong> &mdash; water tanks,
                        fuel storage tanks, chemical vessels
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Manholes and inspection chambers</strong> &mdash;
                        drainage, sewerage, and utility access points
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Cable ducts and trenches</strong> &mdash;
                        service runs beneath floors and underground
                      </span>
                    </li>
                  </ul>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Ceiling voids and roof spaces</strong> &mdash;
                        particularly in refurbishment and retrofit work
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Silos and hoppers</strong> &mdash; storage
                        containers for bulk materials such as cement or aggregate
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Chambers and pits</strong> &mdash; valve
                        chambers, pump stations, lift pits
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Legal Basis:</strong> The Confined Spaces
                  Regulations 1997 are made under the Health and Safety at Work etc. Act 1974. They
                  place duties on employers to assess the risks from confined spaces, avoid entry
                  wherever reasonably practicable, and where entry is unavoidable, to have a safe
                  system of work and adequate emergency arrangements in place. The associated Approved
                  Code of Practice (ACOP L101) provides detailed guidance on compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Confined Space Hazards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">02</span>
            Confined Space Hazards
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confined spaces present a range of serious and often fatal hazards. These hazards may
                exist before entry, may develop during the work, or may arise from the work activities
                themselves. The enclosed nature of the space means that hazardous conditions can
                develop rapidly and without warning, making confined spaces one of the most dangerous
                environments on any construction site.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">Toxic Gas or Vapour</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Gases such as hydrogen sulphide (H2S), carbon monoxide (CO), methane, and
                    solvent vapours can accumulate in enclosed spaces. Many toxic gases are
                    odourless and colourless, making them undetectable without monitoring equipment.
                    Even brief exposure to high concentrations can cause unconsciousness or death
                    within seconds.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">
                      Oxygen Depletion or Enrichment
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Normal air contains approximately 20.9% oxygen. Oxygen levels below 19.5% can
                    cause impaired judgement, confusion, and loss of consciousness. Below 16%, death
                    can occur rapidly. Oxygen may be displaced by other gases, consumed by rusting
                    metal, or absorbed by the ground. Conversely, oxygen enrichment (above 23.5%)
                    dramatically increases fire and explosion risk, as materials that would not
                    normally ignite may catch fire easily in oxygen-enriched air.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="h-5 w-5 text-orange-400" />
                    <p className="text-sm font-medium text-orange-400">Flammable Atmosphere</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Flammable gases, vapours, or dusts can accumulate in confined spaces, creating
                    an explosive atmosphere. Any ignition source &mdash; a spark from a tool, a
                    static discharge, or even a mobile phone &mdash; can trigger an explosion. The
                    Lower Explosive Limit (LEL) is the minimum concentration at which a gas can
                    ignite; atmospheric monitoring measures this continuously.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Flooding and Engulfment</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Confined spaces near watercourses, drainage systems, or storage containers can
                    flood suddenly. Silos and hoppers present an engulfment risk from bulk materials
                    such as grain, sand, or cement, which can collapse and bury a worker in seconds.
                    Free-flowing solids behave similarly to liquids and can make escape impossible.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">Temperature Extremes</p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Enclosed spaces can trap heat, particularly when hot work (welding, cutting) is
                    being carried out. Extreme heat leads to heat exhaustion and heat stroke, which
                    impairs judgement and reduces the ability to self-rescue. Cold environments,
                    such as refrigerated chambers, present hypothermia risks.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-red-400">Critical Statistic:</strong> Approximately{' '}
                  <strong>60% of confined space fatalities are rescuers</strong> who enter the space
                  to help a colleague without proper equipment or training. Well-meaning but
                  untrained rescuers are overcome by the same hazardous atmosphere that affected the
                  original casualty. This is why pre-planned rescue arrangements, non-entry rescue
                  methods, and strict training requirements are so important.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Safe Entry Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">03</span>
            Safe Entry Procedures
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Confined Spaces Regulations 1997 establish a clear hierarchy: first, avoid entry
                altogether if the work can be done from outside. If entry is unavoidable, a
                comprehensive safe system of work must be in place before anyone enters. This is not
                optional &mdash; it is a legal requirement enforceable under the Health and Safety at
                Work etc. Act 1974.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Regulation 4 &mdash; Avoidance of Entry:</strong>{' '}
                  No person at work shall enter a confined space to carry out work for any purpose
                  unless it is not reasonably practicable to achieve that purpose without such entry.
                  This means employers must first explore every alternative before permitting entry.
                </p>
              </div>

              <p>
                When entry cannot be avoided, the following measures must be in place as part of the
                safe system of work:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Permit to work</strong> &mdash; a formal written
                    document that authorises entry, specifies hazards, controls, and emergency
                    procedures, and must be signed by both the issuer and the entrant
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Atmospheric monitoring</strong> &mdash; continuous
                    monitoring of oxygen, flammable gas, and toxic gas levels before and throughout the
                    entry using calibrated multi-gas detectors
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Trained and competent persons</strong> &mdash;
                    everyone involved in the entry (entrants, attendants, supervisors) must have
                    received specific confined space training appropriate to their role
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Communication systems</strong> &mdash; reliable
                    two-way communication between the entrant and the top person (attendant), which may
                    include radios, hard-wired intercoms, or visual signals
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Emergency arrangements</strong> &mdash; rescue
                    equipment on standby, rescue plan briefed to all team members, and emergency
                    services informed if the space presents elevated risk
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Isolation of services</strong> &mdash; all
                    pipework, electrical supplies, mechanical equipment, and other services connected to
                    the confined space must be physically isolated and locked off to prevent
                    accidental energisation, flooding, or release of substances
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Ventilation</strong> &mdash; where possible,
                    mechanical ventilation should be provided to maintain a safe atmosphere, ensuring
                    clean air is supplied and contaminated air is extracted
                  </span>
                </li>
              </ul>

              {/* Confined Space Entry Procedure Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Confined Space Entry Procedure
                </p>
                <p className="text-xs text-white/50 text-center mb-6">
                  Step-by-step flowchart from identification to completion
                </p>

                <div className="flex flex-col items-center gap-0">
                  {/* Step 1 */}
                  <div className="w-full max-w-[380px] bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-500/30 rounded-t-xl p-3 text-center">
                    <p className="text-xs font-bold text-green-400">STEP 1</p>
                    <p className="text-[11px] text-white">Identify the confined space and assess hazards</p>
                  </div>
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-0.5 h-3 bg-green-400/30" />
                    <div className="w-2 h-2 border-b-2 border-r-2 border-green-400/30 rotate-45 -mt-1" />
                  </div>

                  {/* Step 2 */}
                  <div className="w-full max-w-[380px] bg-gradient-to-r from-amber-500/20 to-amber-400/10 border border-amber-500/30 p-3 text-center">
                    <p className="text-xs font-bold text-amber-400">STEP 2</p>
                    <p className="text-[11px] text-white">Can the work be done WITHOUT entering?</p>
                    <p className="text-[10px] text-white/50 mt-1">If YES &rarr; do not enter. Use remote methods.</p>
                  </div>
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-0.5 h-3 bg-green-400/30" />
                    <div className="w-2 h-2 border-b-2 border-r-2 border-green-400/30 rotate-45 -mt-1" />
                  </div>

                  {/* Step 3 */}
                  <div className="w-full max-w-[380px] bg-gradient-to-r from-blue-500/20 to-blue-400/10 border border-blue-500/30 p-3 text-center">
                    <p className="text-xs font-bold text-blue-400">STEP 3</p>
                    <p className="text-[11px] text-white">Prepare safe system of work &amp; permit to work</p>
                    <p className="text-[10px] text-white/50 mt-1">Isolate services, set up ventilation, brief team</p>
                  </div>
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-0.5 h-3 bg-green-400/30" />
                    <div className="w-2 h-2 border-b-2 border-r-2 border-green-400/30 rotate-45 -mt-1" />
                  </div>

                  {/* Step 4 */}
                  <div className="w-full max-w-[380px] bg-gradient-to-r from-purple-500/20 to-purple-400/10 border border-purple-500/30 p-3 text-center">
                    <p className="text-xs font-bold text-purple-400">STEP 4</p>
                    <p className="text-[11px] text-white">Test atmosphere &amp; confirm rescue plan ready</p>
                    <p className="text-[10px] text-white/50 mt-1">O2, LEL, toxic gases &mdash; all within safe limits</p>
                  </div>
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-0.5 h-3 bg-green-400/30" />
                    <div className="w-2 h-2 border-b-2 border-r-2 border-green-400/30 rotate-45 -mt-1" />
                  </div>

                  {/* Step 5 */}
                  <div className="w-full max-w-[380px] bg-gradient-to-r from-orange-500/20 to-orange-400/10 border border-orange-500/30 p-3 text-center">
                    <p className="text-xs font-bold text-orange-400">STEP 5</p>
                    <p className="text-[11px] text-white">Enter with continuous monitoring &amp; communication</p>
                    <p className="text-[10px] text-white/50 mt-1">Top person (attendant) remains at entry point at all times</p>
                  </div>
                  <div className="flex flex-col items-center py-0.5">
                    <div className="w-0.5 h-3 bg-green-400/30" />
                    <div className="w-2 h-2 border-b-2 border-r-2 border-green-400/30 rotate-45 -mt-1" />
                  </div>

                  {/* Step 6 */}
                  <div className="w-full max-w-[380px] bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-500/30 rounded-b-xl p-3 text-center">
                    <p className="text-xs font-bold text-green-400">STEP 6</p>
                    <p className="text-[11px] text-white">Exit, close permit, debrief, and record</p>
                    <p className="text-[10px] text-white/50 mt-1">Confirm all persons out, cancel permit, reinstate barriers</p>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4 italic">
                  If atmosphere deteriorates at any stage &rarr; evacuate immediately and do not re-enter
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Emergency & Rescue */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">04</span>
            Emergency &amp; Rescue
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 5 of the Confined Spaces Regulations 1997 requires that adequate emergency
                arrangements must be in place <strong>before</strong> any person enters a confined
                space. The rescue plan must never be an afterthought &mdash; it is an integral part of
                the safe system of work and must be rehearsed and ready before the permit is issued.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-red-400">Never Improvise Rescue:</strong> The single most
                  dangerous response to a confined space emergency is for untrained persons to rush in
                  to help. This instinctive reaction has killed more people than the original incident
                  in many cases. Always follow the pre-planned rescue procedure.
                </p>
              </div>

              <p>
                There are two main approaches to confined space rescue, and the preferred method
                should always be non-entry rescue where this is feasible:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Non-Entry Rescue (Preferred)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Uses a <strong className="text-white">tripod and winch system</strong> positioned
                        over the entry point
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        The entrant wears a <strong className="text-white">full-body harness</strong>{' '}
                        connected to the winch line before entry
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        In an emergency, the casualty can be winched out from above without anyone else
                        entering the hazardous atmosphere
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        This is the safest method as it eliminates the risk to rescuers
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Entry Rescue (Last Resort)</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Only carried out by <strong className="text-white">trained rescue teams</strong>{' '}
                        wearing breathing apparatus (BA)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Rescuers must be fully equipped with BA, harnesses, communication equipment,
                        and first aid capability
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        Entry rescue is only used when non-entry methods are not feasible due to the
                        configuration of the space
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-white">Suspension trauma awareness</strong> &mdash;
                        a casualty suspended in a harness may develop suspension intolerance
                        (orthostatic shock) if not rescued promptly
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                In all cases, the emergency services (999) should be called at the earliest
                opportunity. Even when on-site rescue teams are available, the fire service has
                specialist confined space rescue capability and should be alerted. When calling,
                provide the exact location, the nature of the confined space, the number of casualties,
                and any known atmospheric hazards.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Suspension Trauma:</strong> When a casualty is
                  suspended in a harness (for example, after a fall or during a winch rescue), blood
                  can pool in the legs due to the harness straps compressing the veins. This can lead
                  to suspension intolerance (orthostatic shock), which can be fatal within 30 minutes.
                  Rescue must be carried out as quickly as possible, and once the casualty is
                  recovered, they should not be laid flat immediately but placed in a semi-upright
                  position to prevent reflow syndrome.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Fire Prevention on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">05</span>
            Fire Prevention on Site
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites are classified as <strong>high-risk environments</strong> for fire.
                The combination of combustible materials, ignition sources, temporary electrical
                installations, and incomplete fire protection systems means that fires on construction
                sites can develop quickly and spread rapidly. The Regulatory Reform (Fire Safety) Order
                2005 applies to all workplaces including construction sites, and places a duty on the
                responsible person to carry out a fire risk assessment and implement appropriate
                controls.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Fire Causes on Construction Sites
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Hot works</strong> &mdash; welding, cutting,
                      grinding, soldering, and brazing produce sparks and intense heat that can ignite
                      nearby combustible materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Electrical faults</strong> &mdash; overloaded
                      circuits, damaged cables, poor connections, and temporary wiring are all common
                      on construction sites and can cause electrical fires
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Smoking</strong> &mdash; discarded cigarettes
                      and matches are a significant ignition source, particularly near stored materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Arson</strong> &mdash; construction sites are
                      particularly vulnerable to deliberate fire-setting, especially when unoccupied
                      overnight or at weekends
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Poor housekeeping</strong> &mdash; accumulation
                      of waste materials, packaging, offcuts, and general debris provides fuel for fires
                      and allows them to spread rapidly
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">The Fire Triangle:</strong> Fire requires three
                  elements to start and sustain itself &mdash;{' '}
                  <strong>heat</strong> (ignition source), <strong>fuel</strong> (combustible material),
                  and <strong>oxygen</strong> (present in air at approximately 21%). Remove any one
                  element and the fire cannot exist. Fire prevention focuses on keeping these elements
                  apart; fire-fighting works by removing one or more of them.
                </p>
              </div>

              {/* Fire Triangle Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  The Fire Triangle
                </p>
                <div className="flex flex-col items-center">
                  {/* Top: Heat */}
                  <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl px-6 py-3 text-center mb-2">
                    <Flame className="h-5 w-5 text-red-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-red-400">HEAT</p>
                    <p className="text-[10px] text-white/60">Ignition source</p>
                  </div>

                  {/* Connecting lines */}
                  <div className="flex items-center justify-center gap-8 sm:gap-16 w-full max-w-[300px] py-1">
                    <div className="w-12 h-0.5 bg-white/10 rotate-[30deg]" />
                    <div className="w-12 h-0.5 bg-white/10 -rotate-[30deg]" />
                  </div>

                  {/* Bottom: Fuel and Oxygen */}
                  <div className="flex items-start justify-center gap-4 sm:gap-8 w-full">
                    <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-xl px-5 py-3 text-center flex-1 max-w-[140px]">
                      <Wind className="h-5 w-5 text-amber-400 mx-auto mb-1" />
                      <p className="text-xs font-bold text-amber-400">FUEL</p>
                      <p className="text-[10px] text-white/60">Combustible material</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl px-5 py-3 text-center flex-1 max-w-[140px]">
                      <Droplets className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                      <p className="text-xs font-bold text-blue-400">OXYGEN</p>
                      <p className="text-[10px] text-white/60">~21% in air</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-white/40 text-center mt-4 italic">
                  Remove any one element and the fire is extinguished
                </p>
              </div>

              <p>
                Construction sites are high-risk because fire protection systems (sprinklers, fire
                doors, fire-stopping, compartmentation) are often incomplete during the build. Escape
                routes may not yet be fully formed, alarm systems may not be operational, and large
                quantities of combustible materials (timber, insulation, packaging, solvents) are
                present throughout the site. The Joint Code of Practice on the Protection from Fire of
                Construction Sites (developed by the FPA and the Construction Confederation) provides
                industry guidance on managing fire risk during construction.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Fire Safety Measures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">06</span>
            Fire Safety Measures
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A comprehensive approach to fire safety on construction sites involves multiple layers
                of protection. The responsible person (typically the principal contractor or site
                manager) must ensure that a fire risk assessment has been carried out and that
                appropriate measures are in place to prevent fire, detect fire, warn people, and enable
                safe evacuation.
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Fire risk assessment</strong> &mdash; must be
                    carried out before work begins and reviewed regularly as the site changes. It
                    identifies fire hazards, people at risk, existing controls, and additional
                    measures needed. On construction sites, the assessment must be dynamic and
                    updated as the building progresses
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Means of escape</strong> &mdash; clear, signed
                    escape routes must be maintained at all times. Routes must be kept free from
                    obstruction, adequately lit (including emergency lighting where natural light is
                    insufficient), and lead to a place of safety. On multi-storey sites, alternative
                    escape routes may be needed for each floor
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Fire detection and alarm</strong> &mdash; an
                    appropriate alarm system must be in place. On construction sites this may range
                    from simple manual call points and sounders to temporary automatic detection
                    systems in areas of higher risk. All workers must be able to hear the alarm from
                    their work location
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Fire-fighting equipment</strong> &mdash; suitable
                    and sufficient fire extinguishers must be provided throughout the site. The type and
                    number of extinguishers depends on the fire risk assessment and the materials
                    present. Extinguishers must be regularly inspected and maintained
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Emergency lighting</strong> &mdash; must be
                    provided along escape routes and in areas without natural light to ensure safe
                    evacuation if the main power supply fails
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Fire safety signs</strong> &mdash; fire exit
                    signs, fire action notices, fire extinguisher location signs, and fire assembly
                    point signs must be displayed prominently throughout the site
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                  <span>
                    <strong className="text-white">Hot works permits</strong> &mdash; formal
                    written authorisation required for any work involving heat sources, open flames, or
                    sparks. The permit specifies precautions including removal of combustibles, fire
                    extinguisher provision, fire watch during work and for a minimum of 60 minutes
                    afterwards, and checking the area before and after work
                  </span>
                </li>
              </ul>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Hot Works &mdash; The 60-Minute Rule:</strong>{' '}
                  After any hot work is completed, the area must be monitored by a designated fire
                  watch for a minimum of <strong>60 minutes</strong>. Many construction site fires
                  start hours after hot work has finished, when smouldering material finally ignites.
                  The fire watch person must have a suitable fire extinguisher and know how to use it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Fire Extinguisher Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">07</span>
            Fire Extinguisher Types
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In the UK, all fire extinguishers have a <strong>red body</strong> (to BS EN 3) with a{' '}
                <strong>coloured band</strong> indicating the type of extinguishing agent. Selecting
                the correct extinguisher for the type of fire is critical &mdash; using the wrong type
                can be ineffective or, worse, can spread the fire or endanger the user.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Fire Classes</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-white/80">
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-white">Class A</p>
                    <p className="text-[11px]">Solid combustibles (wood, paper, textiles)</p>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-white">Class B</p>
                    <p className="text-[11px]">Flammable liquids (petrol, oil, solvents)</p>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-white">Class C</p>
                    <p className="text-[11px]">Flammable gases (propane, butane, natural gas)</p>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-white">Class D</p>
                    <p className="text-[11px]">Metals (magnesium, aluminium, sodium)</p>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-white">Electrical</p>
                    <p className="text-[11px]">Live electrical equipment</p>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <p className="text-xs font-bold text-white">Class F</p>
                    <p className="text-[11px]">Cooking oils and fats</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {/* Water Extinguisher */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-12 rounded-sm bg-red-600 border border-red-500/50 flex flex-col items-center justify-between py-1">
                      <div className="w-6 h-3 rounded-sm bg-red-700" />
                      <span className="text-[8px] font-bold text-white leading-none">ALL RED</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Water Extinguisher</p>
                      <p className="text-xs text-white/60">Red band (or all red body) &bull; Class A</p>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Effective on Class A fires (solids: wood, paper, textiles, plastics)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Works by cooling the burning material below its ignition temperature</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-red-400">NEVER</strong> use on electrical fires, flammable
                        liquid fires, or cooking oil fires
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Foam Extinguisher */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-12 rounded-sm bg-red-600 border border-red-500/50 flex flex-col items-center justify-between py-1">
                      <div className="w-6 h-3 rounded-sm bg-[#fffdd0]" />
                      <span className="text-[8px] font-bold text-white leading-none">CREAM</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Foam Extinguisher</p>
                      <p className="text-xs text-white/60">Cream band &bull; Class A and B</p>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Effective on Class A (solids) and Class B (flammable liquids) fires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Works by smothering the fire with a foam blanket that seals the surface and prevents re-ignition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-red-400">NEVER</strong> use on live electrical equipment
                        or cooking oil fires
                      </span>
                    </li>
                  </ul>
                </div>

                {/* CO2 Extinguisher */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-12 rounded-sm bg-red-600 border border-red-500/50 flex flex-col items-center justify-between py-1">
                      <div className="w-6 h-3 rounded-sm bg-gray-900" />
                      <span className="text-[8px] font-bold text-white leading-none">BLACK</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">CO2 Extinguisher</p>
                      <p className="text-xs text-white/60">Black band &bull; Electrical and Class B</p>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Safe on live electrical equipment (CO2 is non-conductive)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Also effective on Class B fires (flammable liquids)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Works by displacing oxygen around the fire &mdash; leaves no residue</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-amber-400">Caution:</strong> the horn becomes extremely cold
                        during use &mdash; do not hold. Risk of re-ignition as CO2 dissipates quickly
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Dry Powder Extinguisher */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-12 rounded-sm bg-red-600 border border-red-500/50 flex flex-col items-center justify-between py-1">
                      <div className="w-6 h-3 rounded-sm bg-blue-500" />
                      <span className="text-[8px] font-bold text-white leading-none">BLUE</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Dry Powder Extinguisher</p>
                      <p className="text-xs text-white/60">Blue band &bull; Class A, B, C and Electrical</p>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Multi-purpose &mdash; effective on Class A, B, and C fires, and safe on electrical fires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Works by smothering the fire with a chemical powder that interrupts the chemical reaction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>
                        <strong className="text-amber-400">Caution:</strong> creates a cloud of powder that
                        reduces visibility and can cause breathing difficulties &mdash; not recommended for
                        enclosed spaces. Does not cool the fire, so re-ignition is possible
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Wet Chemical Extinguisher */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-12 rounded-sm bg-red-600 border border-red-500/50 flex flex-col items-center justify-between py-1">
                      <div className="w-6 h-3 rounded-sm bg-yellow-400" />
                      <span className="text-[8px] font-bold text-white leading-none">YELLOW</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Wet Chemical Extinguisher</p>
                      <p className="text-xs text-white/60">Yellow band &bull; Class F (and some Class A)</p>
                    </div>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Specifically designed for Class F fires (cooking oils and fats)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Works by saponification &mdash; creates a soapy layer on the surface that seals the oil and prevents re-ignition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Also effective on Class A fires (solids) as a secondary capability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                      <span>Commonly found in site canteens and kitchen areas on construction sites</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Fire Extinguisher Selection Guide Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Fire Extinguisher Selection Guide
                </p>
                <p className="text-xs text-white/50 text-center mb-4">
                  Match the fire class to the correct extinguisher type
                </p>

                <div className="overflow-x-auto">
                  <div className="min-w-[360px]">
                    {/* Header Row */}
                    <div className="grid grid-cols-6 gap-1 mb-1">
                      <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                        <p className="text-[10px] font-bold text-white/60">EXTINGUISHER</p>
                      </div>
                      <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                        <p className="text-[10px] font-bold text-white">A</p>
                        <p className="text-[8px] text-white/50">Solids</p>
                      </div>
                      <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                        <p className="text-[10px] font-bold text-white">B</p>
                        <p className="text-[8px] text-white/50">Liquids</p>
                      </div>
                      <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                        <p className="text-[10px] font-bold text-white">C</p>
                        <p className="text-[8px] text-white/50">Gases</p>
                      </div>
                      <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                        <p className="text-[10px] font-bold text-white">Elec</p>
                        <p className="text-[8px] text-white/50">Electrical</p>
                      </div>
                      <div className="p-2 rounded bg-white/5 border border-white/10 text-center">
                        <p className="text-[10px] font-bold text-white">F</p>
                        <p className="text-[8px] text-white/50">Oils/Fats</p>
                      </div>
                    </div>

                    {/* Water Row */}
                    <div className="grid grid-cols-6 gap-1 mb-1">
                      <div className="p-2 rounded bg-red-600/20 border border-red-500/30 text-center">
                        <p className="text-[10px] font-bold text-red-400">Water</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                    </div>

                    {/* Foam Row */}
                    <div className="grid grid-cols-6 gap-1 mb-1">
                      <div className="p-2 rounded bg-[#fffdd0]/10 border border-[#fffdd0]/30 text-center">
                        <p className="text-[10px] font-bold text-[#fffdd0]">Foam</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                    </div>

                    {/* CO2 Row */}
                    <div className="grid grid-cols-6 gap-1 mb-1">
                      <div className="p-2 rounded bg-gray-800/40 border border-gray-600/30 text-center">
                        <p className="text-[10px] font-bold text-white">CO2</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                    </div>

                    {/* Dry Powder Row */}
                    <div className="grid grid-cols-6 gap-1 mb-1">
                      <div className="p-2 rounded bg-blue-500/20 border border-blue-500/30 text-center">
                        <p className="text-[10px] font-bold text-blue-400">Powder</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                    </div>

                    {/* Wet Chemical Row */}
                    <div className="grid grid-cols-6 gap-1">
                      <div className="p-2 rounded bg-yellow-400/20 border border-yellow-400/30 text-center">
                        <p className="text-[10px] font-bold text-yellow-400">Wet Chem</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30 text-center">
                        <p className="text-[10px] text-red-400 font-bold">NO</p>
                      </div>
                      <div className="p-2 rounded bg-green-500/20 border border-green-500/30 text-center">
                        <p className="text-[10px] text-green-400 font-bold">YES</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/40 text-center mt-4 italic">
                  GREEN = Safe to use &bull; RED = Do NOT use on this fire class
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-red-400">When NOT to Fight a Fire:</strong> Only attempt to
                  fight a fire if it is small and contained, you have the correct extinguisher, you
                  have a clear escape route behind you, and you have been trained in fire extinguisher
                  use. If the fire is large, spreading, producing thick smoke, or involves hazardous
                  materials, <strong>do not attempt to fight it</strong>. Raise the alarm, evacuate
                  immediately, and call 999. Your safety is always the priority &mdash; no piece of
                  equipment or property is worth risking your life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Emergency Evacuation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-green-400/80 text-sm font-normal">08</span>
            Emergency Evacuation
          </h2>
          <div className="border-l-2 border-green-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every person on a construction site must know what to do in the event of a fire or
                other emergency requiring evacuation. This information should be provided during the
                site induction and reinforced through regular fire drills. Construction sites present
                unique evacuation challenges compared to completed buildings, including incomplete
                escape routes, missing fire doors, temporary stairways, and multiple levels of work
                activity.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Emergency Evacuation Procedure
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Know your escape routes</strong> &mdash; familiarise
                      yourself with at least two escape routes from your work area during induction. Escape
                      routes on construction sites change as the build progresses, so stay updated
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">On hearing the alarm</strong> &mdash; stop work
                      immediately. Make your area safe if you can do so quickly (turn off equipment, close
                      gas valves). Leave the area by the nearest safe escape route
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Assembly points</strong> &mdash; proceed directly to
                      the designated assembly point for your area of the site. Assembly points are clearly
                      signed and located at a safe distance from the building
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Roll calls</strong> &mdash; report to the fire warden
                      at the assembly point for a roll call. This is essential to confirm that everyone has
                      been safely evacuated. Do not leave the assembly point until the all-clear is given
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Fire warden duties</strong> &mdash; fire wardens are
                      responsible for sweeping their designated area to check for remaining personnel,
                      closing fire doors (where fitted), conducting the roll call at the assembly point, and
                      liaising with the emergency services on arrival
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Do NOT use lifts</strong> &mdash; lifts may fail,
                      fill with smoke, or stop at the fire floor. Always use stairways for evacuation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Do NOT re-enter</strong> &mdash; never re-enter the
                      building until the fire warden or emergency services confirm it is safe. Even if you
                      believe the fire is out, there may be structural damage, toxic fumes, or hidden
                      hotspots that could re-ignite
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-green-400" />
                    <span>
                      <strong className="text-white">Calling emergency services</strong> &mdash; call
                      999 immediately if you discover a fire. Provide the exact site address, the location
                      of the fire within the site, what is burning, and whether anyone is trapped or injured
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-green-400">Construction Site Considerations:</strong>{' '}
                  Unlike completed buildings, construction sites may have open edges, unfinished
                  stairways, temporary ladders, and scaffolding as part of escape routes. Workers at
                  height must have a planned means of descent in an emergency. Welfare facilities,
                  site cabins, and temporary structures must also have fire detection and escape
                  provisions. The site fire plan must be reviewed and updated regularly as the
                  building progresses and escape routes change.
                </p>
              </div>

              <p>
                Regular fire drills must be conducted on construction sites to ensure that all workers
                are familiar with the alarm, escape routes, and assembly procedures. New workers
                arriving on site between drills must receive specific fire safety information during
                their site induction. Records of all fire drills and training must be kept on site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  If You Discover a Fire
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                    <span className="text-green-400 font-bold text-sm min-w-[24px]">1.</span>
                    <span className="text-sm text-white/80">
                      Raise the alarm immediately &mdash; activate the nearest fire alarm call point
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                    <span className="text-green-400 font-bold text-sm min-w-[24px]">2.</span>
                    <span className="text-sm text-white/80">
                      Call 999 and provide the site address, fire location, and details of what is burning
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                    <span className="text-green-400 font-bold text-sm min-w-[24px]">3.</span>
                    <span className="text-sm text-white/80">
                      Only attempt to fight the fire if it is small, you have the correct extinguisher,
                      and you have a clear escape route behind you
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-2 rounded bg-white/5">
                    <span className="text-green-400 font-bold text-sm min-w-[24px]">4.</span>
                    <span className="text-sm text-white/80">
                      If in doubt, leave the area and evacuate to the assembly point &mdash; do not risk
                      your safety
                    </span>
                  </div>
                </div>
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../cscs-card-module-5-section-3">
              Next: Electrical Safety on Site
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
