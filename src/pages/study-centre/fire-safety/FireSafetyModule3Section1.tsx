import {
  ArrowLeft,
  ArrowRight,
  Flame,
  CheckCircle,
  AlertTriangle,
  Shield,
  Zap,
  HardHat,
  Building,
  ClipboardCheck,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'fs-hot-work-watch',
    question:
      'What is the minimum fire watch period recommended after hot works are completed?',
    options: [
      '15 minutes',
      '30 minutes',
      '60 minutes',
      '120 minutes',
    ],
    correctIndex: 2,
    explanation:
      'The recommended minimum fire watch period after hot works is 60 minutes. This allows time for any smouldering materials to be detected before they develop into a fire. Some organisations specify 30 minutes as a minimum, but 60 minutes is the widely accepted best practice under most hot work permit systems.',
  },
  {
    id: 'fs-fire-door-rating',
    question: 'What fire door rating means it will resist fire for 30 minutes?',
    options: [
      'FD15',
      'FD30',
      'FD60',
      'FD90',
    ],
    correctIndex: 1,
    explanation:
      'FD30 stands for Fire Door 30 minutes. The number indicates the period in minutes that the door assembly has been tested to resist the passage of fire and smoke. FD30 doors are commonly used in most commercial and residential buildings, while FD60 doors are required in higher-risk areas such as stairwells and corridors serving sleeping accommodation.',
  },
  {
    id: 'fs-afdd-meaning',
    question: 'What does AFDD stand for and what does it detect?',
    options: [
      'Automatic Fire Detection Device — detects smoke and heat',
      'Arc Fault Detection Device — detects dangerous electrical arcing that could cause fire',
      'Advanced Flame Detection Device — detects open flames in electrical panels',
      'Auxiliary Fire Dampening Device — prevents fire spread through ductwork',
    ],
    correctIndex: 1,
    explanation:
      'AFDD stands for Arc Fault Detection Device. AFDDs detect dangerous electrical arcing — such as series arcing caused by damaged cables, loose connections, or insulation breakdown — that can generate enough heat to ignite surrounding materials. They were introduced in BS 7671 18th Edition (Amendment 2) and provide an additional layer of fire protection beyond RCDs and MCBs.',
  },
];

const faqs = [
  {
    question:
      'What is fire stopping and why is it essential when running cables through fire walls?',
    answer:
      'Fire stopping is the process of sealing openings and gaps in fire-rated walls, floors, and barriers to prevent the passage of fire, smoke, and hot gases between compartments. When electricians run cables, pipes, or ducts through fire-rated barriers, they create penetrations that compromise the fire resistance of the barrier. These penetrations must be sealed using approved fire-stopping materials — such as intumescent sealants, fire-rated pillows, fire batts, or proprietary collar systems — that restore the original fire rating of the barrier. Without proper fire stopping, fire can spread rapidly through cable routes, defeating the entire purpose of compartmentation and potentially leading to catastrophic building failure.',
  },
  {
    question: 'How often should PAT testing be carried out?',
    answer:
      'The frequency of PAT (Portable Appliance Testing) depends on the type of equipment, its environment, and how it is used. The IET Code of Practice for In-Service Inspection and Testing of Electrical Equipment provides guidance rather than fixed legal intervals. For construction sites and industrial environments, more frequent testing is required — typically every 3 months for 110V equipment and monthly visual inspections for 230V equipment. In offices and lower-risk environments, annual PAT testing is common, with more frequent user checks. The employer must carry out a risk assessment to determine appropriate intervals. The key principle is that all portable electrical equipment must be maintained in a safe condition, and regular inspection and testing is the primary way to demonstrate this.',
  },
  {
    question:
      'What are the DSEAR requirements for storing flammable liquids in a workplace?',
    answer:
      'The Dangerous Substances and Explosive Atmospheres Regulations 2002 (DSEAR) require employers to assess the risks from dangerous substances, eliminate or reduce those risks, and put controls in place. For flammable liquids, this means: quantities kept in the workroom must be limited to the minimum needed for the day or shift; bulk stocks must be stored in dedicated, fire-resistant stores or cabinets; containers must be kept closed when not in use; adequate ventilation must be provided to prevent the build-up of flammable vapours; ignition sources must be eliminated from storage and handling areas; bunding (secondary containment) must be provided for liquid stores to contain spills; and appropriate signage must be displayed. The regulations apply to all workplaces where dangerous substances are present, including construction sites.',
  },
  {
    question: 'Should fire doors ever be propped open?',
    answer:
      'Fire doors must never be propped open using wedges, fire extinguishers, or other makeshift devices. Propping open a fire door completely defeats its purpose — it cannot prevent the spread of fire and smoke if it is held open. However, fire doors can be fitted with electromagnetic hold-open devices that are linked to the fire alarm system. These devices hold the door open during normal use but release it automatically when the fire alarm activates, allowing the self-closer to shut the door. This is the only acceptable method for holding a fire door in an open position. Any person who props open a fire door is committing a serious fire safety offence that could endanger lives and may result in prosecution under the Regulatory Reform (Fire Safety) Order 2005.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A hot work permit is required before which of the following activities?',
    options: [
      'Painting a wall in a new extension',
      'Drilling a hole through a concrete wall',
      'Using an angle grinder to cut metal brackets near combustible materials',
      'Installing a new consumer unit on a plasterboard wall',
    ],
    correctAnswer: 2,
    explanation:
      'Grinding, welding, soldering, and any work producing sparks, flames, or high temperatures near combustible materials requires a hot work permit. The permit system ensures that fire risks are formally assessed, combustibles are removed or protected, fire extinguishers are on standby, and a fire watch is maintained for at least 60 minutes after the work is completed.',
  },
  {
    id: 2,
    question:
      'Under DSEAR 2002, flammable liquids stored in a workroom must be:',
    options: [
      'Stored in any available cupboard away from doors',
      'Limited to the minimum quantity needed for the day or shift and kept in approved containers',
      'Kept near heating equipment so they remain at a consistent temperature',
      'Stored in cardboard boxes on the floor to absorb any spills',
    ],
    correctAnswer: 1,
    explanation:
      'DSEAR requires that only the minimum quantity of flammable liquids needed for immediate use is kept in the workroom. Bulk stocks must be stored in dedicated fire-resistant stores or cabinets. Containers must be kept closed when not in use, and the storage area must be adequately ventilated and free from ignition sources.',
  },
  {
    id: 3,
    question:
      'A fire door rated FD60 will resist fire for:',
    options: [
      '30 minutes',
      '45 minutes',
      '60 minutes',
      '90 minutes',
    ],
    correctAnswer: 2,
    explanation:
      'FD60 means the fire door assembly has been tested to resist the passage of fire and smoke for 60 minutes. FD60 doors are typically used in higher-risk areas such as stairwells, corridors serving sleeping accommodation, and areas where longer evacuation times may be required.',
  },
  {
    id: 4,
    question:
      'When cables penetrate a fire-rated wall, what must be done to maintain the fire rating?',
    options: [
      'Nothing — cables are non-combustible so they do not affect the fire rating',
      'Wrap the cables in aluminium foil where they pass through the wall',
      'Seal the penetration with approved fire-stopping materials to restore the original fire rating',
      'Leave a 10 mm air gap around each cable for ventilation',
    ],
    correctAnswer: 2,
    explanation:
      'Any penetration through a fire-rated barrier — for cables, pipes, or ducts — must be sealed with approved fire-stopping materials such as intumescent sealants, fire batts, or proprietary collar systems. The fire stopping must restore the original fire resistance rating of the barrier. Failing to fire-stop cable penetrations is one of the most common fire safety failings found during inspections.',
  },
  {
    id: 5,
    question:
      'An Arc Fault Detection Device (AFDD) protects against fire risk by:',
    options: [
      'Detecting smoke particles in the air near the consumer unit',
      'Monitoring for dangerous electrical arcing caused by damaged cables or loose connections',
      'Measuring the temperature of cables and tripping if they overheat',
      'Detecting earth leakage currents above 30 mA',
    ],
    correctAnswer: 1,
    explanation:
      'AFDDs detect dangerous series and parallel arc faults in electrical circuits — such as those caused by damaged cable insulation, crushed conductors, or loose terminal connections. These arcs can generate localised temperatures exceeding 6,000 degrees Celsius, which is more than sufficient to ignite surrounding combustible materials. AFDDs provide fire protection that RCDs and MCBs alone cannot offer.',
  },
  {
    id: 6,
    question:
      'Which of the following is the most important housekeeping measure for fire prevention?',
    options: [
      'Painting walls in fire-retardant colours',
      'Regular clearing of combustible waste and keeping escape routes unobstructed',
      'Ensuring all furniture is made from metal',
      'Installing carpet throughout the building to reduce static electricity',
    ],
    correctAnswer: 1,
    explanation:
      'Regular clearing of combustible waste and maintaining clear escape routes is the single most important housekeeping measure for fire prevention. Accumulated waste provides fuel for fire, and blocked escape routes prevent safe evacuation. Poor housekeeping is consistently identified as a leading cause of workplace fires in the UK.',
  },
  {
    id: 7,
    question:
      'Under DSEAR 2002, the first step an employer must take regarding dangerous substances is to:',
    options: [
      'Install fire suppression sprinkler systems',
      'Carry out a risk assessment to identify dangerous substances and the risks they present',
      'Replace all flammable substances with water-based alternatives',
      'Train all employees in the use of breathing apparatus',
    ],
    correctAnswer: 1,
    explanation:
      'The DSEAR hierarchy requires employers to first carry out a risk assessment to identify all dangerous substances present in the workplace and assess the risks they present. Only after the risks are assessed can appropriate control measures be selected and implemented. This follows the standard UK health and safety approach of assess first, then control.',
  },
  {
    id: 8,
    question:
      'On a construction site, which of the following is a key fire prevention requirement during refurbishment works?',
    options: [
      'All workers must carry personal fire extinguishers',
      'Temporary fire detection systems must be installed and escape routes maintained throughout the works',
      'Work should only take place during daylight hours to reduce fire risk',
      'All timber must be treated with fire-retardant paint before installation',
    ],
    correctAnswer: 1,
    explanation:
      'The FPA Joint Code of Practice for fire prevention on construction sites requires that temporary fire detection and alarm systems are installed during construction and refurbishment works, and that escape routes are maintained and clearly signed throughout all phases. Fire risk on construction sites is significantly elevated due to hot works, temporary electrical installations, combustible building materials, and limited fire protection systems.',
  },
];

export default function FireSafetyModule3Section1() {
  useSEO({
    title: 'Fire Prevention Measures | Fire Safety Module 3.1',
    description:
      'Ignition source control, flammable material storage, housekeeping, compartmentation, electrical fire prevention, construction site fire safety, and fire prevention culture for UK fire marshals.',
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
            <Link to="../fire-safety-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Flame className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fire Prevention Measures
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Proactive strategies for eliminating fire risks &mdash; from ignition source control and
            flammable material storage to structural compartmentation and electrical safety
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Prevention hierarchy:</strong> Eliminate &rarr; Substitute &rarr; Engineer &rarr; Administrate
              </li>
              <li>
                <strong>Hot works:</strong> Permit + fire watch + 60-min cool-down
              </li>
              <li>
                <strong>Fire doors:</strong> FD30/FD60, self-closing, never propped open
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>DSEAR 2002:</strong> Risk-assess all flammable substances
              </li>
              <li>
                <strong>Fire stopping:</strong> Seal every cable/pipe penetration
              </li>
              <li>
                <strong>AFDDs:</strong> Detect arcing faults that RCDs/MCBs miss
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify and control common ignition sources in the workplace',
              'Explain DSEAR requirements for storing flammable materials safely',
              'Describe housekeeping practices that reduce fire risk',
              'Explain compartmentation, fire doors, and fire stopping',
              'Describe electrical safety measures including AFDDs and thermal imaging',
              'Apply fire prevention principles during construction and refurbishment works',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 — Eliminating & Controlling Ignition Sources */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Eliminating &amp; Controlling Ignition Sources
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The most effective way to prevent fire is to{' '}
                <strong>eliminate or control ignition sources</strong> before they can interact with
                fuel and oxygen. In the workplace, ignition sources include electrical faults,
                hot work activities, smoking materials, heating equipment, and deliberate
                fire-setting (arson). Each must be systematically identified and managed.
              </p>

              {/* Electrical Safety */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Electrical Safety</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Electrical faults are the single largest cause of fires in UK commercial and
                  industrial premises. Faulty wiring, overloaded circuits, damaged cables, and
                  poorly maintained equipment can all produce enough heat or arcing to ignite
                  surrounding materials.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Regular inspections:</strong> All fixed
                      electrical installations must be periodically inspected and tested in
                      accordance with BS 7671. The interval depends on the type of installation
                      and its environment — typically every 5 years for commercial premises and
                      every 3 years for industrial sites.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">PAT testing:</strong> Portable Appliance
                      Testing ensures that plugged-in equipment (kettles, power tools, extension
                      leads, chargers) is safe for continued use. Frequency depends on the
                      equipment type and environment — more frequent on construction sites.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Correct fuse ratings:</strong> Using the
                      wrong fuse rating can allow excessive current to flow without the fuse
                      blowing, leading to overheating and potential fire. Always match fuse
                      ratings to the equipment and cable ratings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Avoiding overloaded sockets:</strong> Never
                      daisy-chain extension leads or plug adaptors into other adaptors. Each
                      socket outlet has a maximum rated load — exceeding it causes overheating of
                      connections and cables.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Maintaining equipment:</strong> Damaged
                      cables, cracked plugs, loose connections, and worn insulation must be
                      reported and repaired immediately. Equipment with visible damage must be
                      taken out of service and labelled &ldquo;Do Not Use&rdquo;.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Hot Work Controls */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Hot Work Controls</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Hot work — including welding, brazing, soldering, grinding, and the use of
                  blowtorches — is one of the most common causes of workplace fires. A formal
                  hot work permit system is essential wherever hot work is carried out.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Permits:</strong> A written hot work permit
                      must be issued before any hot work begins. The permit specifies the
                      location, duration, precautions required, and the person responsible for
                      the fire watch.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire watch:</strong> A dedicated person must
                      remain on site during the hot work and for a minimum of{' '}
                      <strong className="text-rose-300">60 minutes</strong> after work is
                      completed to watch for smouldering or delayed ignition.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Removing combustibles:</strong> All
                      combustible materials within a minimum radius of 10 metres must be removed
                      or covered with fire-resistant sheeting before hot work begins.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire blankets and extinguishers:</strong> A
                      suitable fire extinguisher (minimum 9 litre water or 2 kg CO2, depending on
                      the materials present) and fire blanket must be immediately available at the
                      hot work location.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">60-minute cool-down:</strong> The hot work
                      area must be monitored for at least 60 minutes after the work is completed.
                      Many hot-work fires start well after the work itself has finished, when
                      smouldering materials finally reach ignition temperature.
                    </span>
                  </li>
                </ul>
              </div>

              {/* No Smoking, Heating, Arson */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">No-Smoking Policies</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Enforce strict no-smoking policy across all work areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Provide designated smoking areas away from buildings and combustible materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Supply metal ash bins with self-closing lids</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Heating Equipment</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Maintain minimum clearances from combustible materials (typically 1 metre)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Follow manufacturer maintenance schedules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Never dry clothing on or near heaters</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Arson Prevention</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Maintain perimeter security — fencing, locked gates, access control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Ensure external lighting covers all vulnerable areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Remove waste, pallets, and combustibles from the building perimeter</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Point</p>
                </div>
                <p className="text-sm text-white/80">
                  Arson accounts for approximately{' '}
                  <strong className="text-white">45% of all fires in commercial premises</strong>{' '}
                  in the UK. Many arson fires are opportunistic — the arsonist uses waste or
                  materials already present outside the building. Simply removing combustible
                  waste from the perimeter of your building significantly reduces the risk of
                  deliberate fire-setting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02 — Safe Storage of Flammable Materials */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Safe Storage of Flammable Materials
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Dangerous Substances and Explosive Atmospheres Regulations 2002
                (DSEAR)</strong> require employers to assess, eliminate, or control the risks
                from dangerous substances — including flammable liquids, gases, dusts, and
                aerosols. DSEAR applies to all workplaces where dangerous substances are used
                or stored, including construction sites and electrical workshops.
              </p>

              {/* Flammable Liquids */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Flammable Liquids</p>
                <p className="text-sm text-white/80 mb-3">
                  Solvents, adhesives, paints, thinners, cleaning fluids, and many other
                  substances commonly found on electrical and construction sites are classified
                  as flammable liquids. Their vapours are heavier than air and can travel
                  significant distances to find an ignition source.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire-resistant cabinets:</strong> Flammable
                      liquids must be stored in purpose-built, fire-resistant storage cabinets
                      that meet BS EN 14470-1. These cabinets provide a minimum of 15 or 30
                      minutes fire resistance and are equipped with self-closing doors, liquid-tight
                      sumps, and ventilation connections.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Maximum quantities in workrooms:</strong> Only
                      the minimum quantity needed for the current day or shift should be kept in
                      the workroom. Bulk supplies must be stored in separate, dedicated stores.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Separate stores:</strong> For larger
                      quantities, a dedicated flammable liquids store must be provided — a
                      fire-resistant enclosure separate from the main building, with direct
                      external ventilation, no ignition sources, and appropriate signage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Bunding:</strong> Secondary containment
                      (bunding) must be provided for liquid stores to contain spills and prevent
                      flammable liquids from spreading. The bund must hold at least 110% of the
                      volume of the largest container stored.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Ventilation:</strong> Adequate ventilation
                      must be provided in storage and use areas to prevent the accumulation of
                      flammable vapours to dangerous concentrations. Natural ventilation at low
                      level is preferred for flammable liquid stores.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Gas Cylinders */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-400 mb-3">Gas Cylinders</p>
                <p className="text-sm text-white/80 mb-3">
                  Compressed gas cylinders (propane, acetylene, oxygen, LPG) present significant
                  fire and explosion risks if stored or handled incorrectly. Heat exposure can
                  cause catastrophic cylinder failure.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Upright storage:</strong> All gas cylinders
                      must be stored in an upright position with the valve uppermost
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Secured:</strong> Cylinders must be secured
                      with chains, straps, or purpose-built stands to prevent them falling over
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Separated by type:</strong> Flammable gases
                      (acetylene, propane) must be stored separately from oxidising gases (oxygen)
                      — minimum 3 metres separation or a fire-resistant partition
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">External storage preferred:</strong> Outdoor
                      storage in a well-ventilated, secure compound is always preferred over
                      indoor storage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Signage:</strong> Clear &ldquo;Highly
                      Flammable&rdquo; and &ldquo;No Smoking&rdquo; signs must be displayed at
                      all gas cylinder storage locations
                    </span>
                  </li>
                </ul>
              </div>

              {/* Aerosols & Dusts */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Aerosols</p>
                  <p className="text-sm text-white/80 mb-3">
                    Aerosol cans (spray paints, lubricants, foam cleaners) contain flammable
                    propellants that can explode if heated. They must be stored away from heat
                    sources and direct sunlight, in cool, ventilated areas, and never punctured
                    or thrown into fires.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Combustible Dusts</p>
                  <p className="text-sm text-white/80 mb-3">
                    Fine dusts from wood, metal, flour, and other materials can form explosive
                    atmospheres when suspended in air. Dust extraction systems, regular cleaning,
                    and elimination of ignition sources in dusty environments are essential.
                    DSEAR specifically covers explosive atmospheres created by combustible dusts.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-amber-300">
                  <strong>COSHH Overlap:</strong> Many flammable substances are also hazardous to
                  health and are covered by the Control of Substances Hazardous to Health
                  Regulations 2002 (COSHH). The COSHH assessment and the DSEAR assessment are
                  separate requirements — a substance may require controls under both sets of
                  regulations. Always check both the health hazards (COSHH) and fire/explosion
                  hazards (DSEAR) for every dangerous substance on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 — Housekeeping & Waste Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Housekeeping &amp; Waste Management
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Poor housekeeping is one of the <strong>leading causes of workplace fires</strong>{' '}
                in the UK. Accumulated combustible waste provides fuel for fire, while cluttered
                corridors and blocked exits prevent safe evacuation. A disciplined approach to
                housekeeping is one of the simplest and most effective fire prevention measures
                available.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Key Housekeeping Measures</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Regular clearing of combustible waste:</strong>{' '}
                      Waste paper, cardboard, packaging, offcuts, and general rubbish must be
                      cleared from work areas at least daily — more frequently in high-risk
                      environments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Controlled waste storage areas:</strong>{' '}
                      Designated waste storage areas must be fire-resistant, well away from the
                      main building, and emptied regularly before waste accumulates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">External bin placement:</strong> Bins and
                      skips must be positioned away from the building — a minimum of 6 metres is
                      recommended. Bins placed against building walls are a common arson target
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Oily rag disposal:</strong> Rags
                      contaminated with oil, solvents, or other flammable substances must be
                      placed in metal containers with self-closing lids. Oily rags left in piles
                      can spontaneously combust through exothermic oxidation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Dust and lint removal:</strong> Regular
                      cleaning of dust accumulations on surfaces, equipment, cable trays, and
                      within enclosures — dust deposits provide easily ignitable fuel
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Clear corridors and escape routes:</strong>{' '}
                      Corridors, stairways, and fire exits must be kept completely clear of
                      stored materials, furniture, and obstructions at all times
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">No storage under stairways:</strong> The
                      space under stairways is a protected escape route and must never be used
                      for storage — fire in this location blocks the primary means of vertical
                      escape
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Housekeeping Audits &amp; 5S Methodology
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Regular housekeeping audits should be conducted to verify that fire prevention
                  standards are maintained. The <strong className="text-white">5S methodology</strong>{' '}
                  — originally developed for manufacturing — provides an excellent framework for
                  fire-safe housekeeping:
                </p>
                <div className="grid sm:grid-cols-5 gap-2">
                  {[
                    { label: 'Sort', desc: 'Remove unnecessary items from the work area' },
                    { label: 'Set in Order', desc: 'Organise remaining items with designated places' },
                    { label: 'Shine', desc: 'Clean the work area thoroughly and regularly' },
                    { label: 'Standardise', desc: 'Create consistent housekeeping procedures' },
                    { label: 'Sustain', desc: 'Maintain standards through audits and discipline' },
                  ].map((s, i) => (
                    <div key={i} className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg text-center">
                      <p className="text-xs font-bold text-rose-400 mb-1">{i + 1}. {s.label}</p>
                      <p className="text-xs text-white/70">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 — Structural Fire Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Structural Fire Prevention
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Compartmentation</strong> is the division of a building into discrete
                fire-resistant sections (compartments) using fire walls, fire floors, and fire
                doors. The purpose is to contain a fire within the compartment of origin for
                long enough to allow safe evacuation and for the fire service to mount an
                effective response. Every element that breaches a compartment boundary — doors,
                cables, pipes, ducts — must maintain the fire rating of that boundary.
              </p>

              {/* Fire Doors */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Fire Doors</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Fire doors are the most common — and most commonly compromised — element of
                  compartmentation. They are tested to resist the passage of fire and smoke for
                  a specified period and are critical life-safety elements.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-3">
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-bold text-rose-400 mb-1">FD30</p>
                    <p className="text-xs text-white/70">
                      Resists fire for 30 minutes. Used in most commercial and residential
                      buildings — offices, corridors, storerooms.
                    </p>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-sm font-bold text-rose-400 mb-1">FD60</p>
                    <p className="text-xs text-white/70">
                      Resists fire for 60 minutes. Used in higher-risk areas — stairwells,
                      corridors serving sleeping accommodation, plant rooms.
                    </p>
                  </div>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Self-closing:</strong> All fire doors must
                      be fitted with an approved self-closing device that fully closes the door
                      into its frame and engages the latch
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Signage:</strong> Fire doors must display
                      &ldquo;Fire Door — Keep Shut&rdquo; signs on both sides. Doors on escape
                      routes must also display &ldquo;Fire Exit&rdquo; signage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Never propped open:</strong> Fire doors must
                      never be propped open with wedges, extinguishers, or other objects. The
                      only acceptable hold-open device is an{' '}
                      <strong className="text-rose-300">
                        electromagnetic hold-open device connected to the fire alarm system
                      </strong>{' '}
                      — these release the door automatically when the alarm activates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Intumescent strips and smoke seals:</strong>{' '}
                      Fire doors incorporate intumescent strips that expand when heated, sealing
                      the gap between the door and frame. Cold smoke seals prevent smoke migration
                      before the fire reaches the door
                    </span>
                  </li>
                </ul>
              </div>

              {/* Fire Stopping */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">Fire Stopping</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Fire stopping is the process of sealing penetrations through fire-rated barriers
                  to maintain their fire resistance. This is <strong className="text-white">
                  critically important for electricians</strong> — every cable, trunking, conduit,
                  or busbar that passes through a fire wall or fire floor creates a penetration
                  that must be fire-stopped.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Intumescent products:</strong> Sealants,
                      wraps, and collars that expand when heated to fill gaps and seal around
                      cable penetrations. Intumescent sealants are the most commonly used
                      fire-stopping material for small cable penetrations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire-rated sealants:</strong> Specialist
                      sealants that maintain fire resistance and flexibility. Must be third-party
                      certified to BS EN 1366-3 for the specific penetration configuration.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire batts:</strong> Mineral fibre boards
                      used to fill larger openings before sealing with intumescent sealant. Used
                      for multiple cable penetrations through a single opening.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Cavity barriers:</strong> Fire-resistant
                      barriers installed within concealed spaces (above suspended ceilings, within
                      cavity walls) to prevent hidden fire spread. Must be provided at compartment
                      lines and at intervals within large concealed spaces.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Dampers in ductwork:</strong> Fire dampers
                      are installed where ventilation ducts pass through fire-rated barriers. They
                      close automatically when the surrounding temperature reaches a set point
                      (typically 72&deg;C), preventing fire and smoke from spreading through the
                      duct system.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Critical Warning</p>
                </div>
                <p className="text-sm text-white/80">
                  Inadequate fire stopping is one of the{' '}
                  <strong className="text-white">most common fire safety failings</strong>{' '}
                  found during building inspections. Electricians, plumbers, and other trades
                  frequently create penetrations through fire barriers during installation
                  and refurbishment work. Every single penetration must be fire-stopped using
                  approved materials and methods — there are no exceptions. Failure to fire-stop
                  penetrations can result in{' '}
                  <strong className="text-red-300">
                    enforcement action, prosecution, and catastrophic loss of life
                  </strong>{' '}
                  in the event of a fire.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 — Electrical Safety as Fire Prevention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Electrical Safety as Fire Prevention
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electrical faults are responsible for a significant proportion of workplace fires.
                As electricians, understanding how electrical safety measures prevent fire is
                fundamental to your professional role. The requirements of{' '}
                <strong>BS 7671 (the IET Wiring Regulations)</strong> are designed not only to
                prevent electric shock but also to minimise the risk of fire from electrical
                installations.
              </p>

              {/* Periodic Inspection */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Periodic Inspection &amp; Testing (BS 7671)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  All electrical installations deteriorate over time. Periodic inspection and
                  testing identifies faults before they become dangerous. The resulting Electrical
                  Installation Condition Report (EICR) classifies any defects by severity and
                  provides recommendations for remedial work.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Commercial premises: every 5 years (or at change of occupancy)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Industrial premises: every 3 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Construction site installations: every 3 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Swimming pools and special installations: annually</span>
                  </li>
                </ul>
              </div>

              {/* Earth Fault Protection */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Earth Fault Protection: RCDs, MCBs &amp; AFDDs
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Multiple layers of electrical protection work together to prevent fire:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-bold text-white mb-1">
                      RCDs (Residual Current Devices)
                    </p>
                    <p className="text-xs text-white/70">
                      Detect imbalances between live and neutral currents, indicating current is
                      leaking to earth through an unintended path. Trip at 30 mA for personal
                      protection, 300 mA for fire protection. Effective against earth faults but
                      do not detect series arc faults.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-bold text-white mb-1">
                      MCBs (Miniature Circuit Breakers)
                    </p>
                    <p className="text-xs text-white/70">
                      Protect against overcurrent (overload and short circuit). Trip when current
                      exceeds the rated value, preventing cables from overheating. Do not detect
                      earth faults or arc faults — they only respond to excessive current flow.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-bold text-rose-400 mb-1">
                      AFDDs (Arc Fault Detection Devices) — BS 7671 18th Edition
                    </p>
                    <p className="text-xs text-white/80">
                      AFDDs represent the latest advancement in electrical fire prevention. They
                      detect dangerous electrical arcing — both series arcs (caused by damaged
                      conductors, loose connections, or insulation breakdown) and parallel arcs
                      (caused by short circuits between conductors). Arc faults can generate
                      localised temperatures exceeding{' '}
                      <strong className="text-white">6,000&deg;C</strong> — more than sufficient
                      to ignite surrounding combustible materials. AFDDs provide a level of fire
                      protection that RCDs and MCBs alone cannot offer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cable Selection & Thermal Imaging */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Cable Selection</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Correct current rating for the load and protective device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Derating factors: ambient temperature, grouping, thermal insulation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Appropriate installation methods to allow heat dissipation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Fire-resistant cables (BS 8519) for critical circuits</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Thermal Imaging &amp; Maintenance
                  </p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Thermal imaging cameras detect hot spots in electrical panels, connections, and cables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Identifies loose connections, overloaded circuits, and failing components before fire occurs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Emergency lighting must be regularly tested and maintained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Regular maintenance schedules for all electrical systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06 — Fire Prevention in Construction & Refurbishment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            Fire Prevention in Construction &amp; Refurbishment
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction and refurbishment sites present significantly elevated fire risks
                due to the combination of hot work activities, temporary electrical installations,
                large quantities of combustible building materials, incomplete fire protection
                systems, and constantly changing site layouts. The{' '}
                <strong>
                  FPA Joint Code of Practice for fire prevention on construction sites
                </strong>{' '}
                provides the industry standard for managing these risks.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Construction Site Fire Prevention</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Temporary buildings:</strong> Site offices,
                      welfare facilities, and storage containers must be positioned with adequate
                      separation from the building under construction. LPG cylinders for temporary
                      heating must be stored externally in secure compounds.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Site security:</strong> The site must be
                      secured against unauthorised access to prevent arson and vandalism —
                      perimeter fencing, locked gates, CCTV, and security patrols for high-value
                      or high-risk sites.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Hot work permits:</strong> Construction-specific
                      hot work permits must include consideration of the unique risks on site —
                      incomplete fire barriers, combustible insulation, temporary covers, and
                      other trades working nearby.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Temporary fire detection:</strong> Temporary
                      fire detection and alarm systems must be installed during construction and
                      refurbishment works. These systems must be extended and modified as the
                      works progress through different phases.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Escape routes maintained:</strong> Safe
                      escape routes must be established, maintained, signed, and communicated to
                      all workers throughout every phase of the construction works. Routes will
                      change as the building develops — regular review is essential.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Phased handover:</strong> When sections of a
                      building are handed over for occupation while other sections remain under
                      construction, the fire strategy must address both the occupied and
                      construction zones — including fire separation between them, separate alarm
                      systems, and coordinated evacuation procedures.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07 — Fire Prevention Culture */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Fire Prevention Culture
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Technical measures alone are insufficient to prevent fire. A strong{' '}
                <strong>fire prevention culture</strong> — where every person in the organisation
                understands fire risks, takes personal responsibility for prevention, and actively
                participates in maintaining fire safety standards — is essential for long-term
                fire prevention success.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Building a Fire Prevention Culture</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Management commitment:</strong> Senior
                      management must visibly prioritise fire safety, allocate adequate resources,
                      and lead by example. Fire prevention must be embedded in the
                      organisation&rsquo;s values, not treated as an afterthought.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire safety policy:</strong> A written fire
                      safety policy that sets out the organisation&rsquo;s approach to fire
                      prevention, roles and responsibilities, and arrangements for managing fire
                      risk.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Employee engagement:</strong> All employees
                      should be encouraged to identify and report fire hazards, contribute to risk
                      assessments, and take ownership of fire safety in their work area.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Regular training and toolbox talks:</strong>{' '}
                      Fire safety training must be provided at induction and refreshed regularly.
                      Short, focused toolbox talks are effective for reinforcing specific fire
                      prevention topics on site.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Reporting near-misses:</strong> A
                      no-blame reporting system for fire-related near-misses and hazard
                      observations. Near-miss data is invaluable for identifying weaknesses in
                      fire prevention before an actual fire occurs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Learning from incidents:</strong> Every fire
                      incident, false alarm, and near-miss must be investigated and the lessons
                      shared across the organisation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Continuous improvement:</strong> Fire
                      prevention standards must be regularly reviewed and updated in response to
                      changes in the workplace, new legislation, industry best practice, and
                      lessons learned from incidents.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Fire Prevention Hierarchy Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Fire Prevention Hierarchy</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
            <p className="text-sm text-white/60 mb-4 text-center">
              The hierarchy of fire prevention controls — most effective at the top
            </p>
            <div className="max-w-lg mx-auto space-y-2">
              {/* Elimination */}
              <div className="bg-green-500/15 border border-green-500/30 rounded-lg p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-green-400 text-xs font-bold uppercase tracking-wider">1. Elimination</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Remove the hazard entirely &mdash; eliminate the ignition source or the
                  flammable material from the workplace
                </p>
              </div>

              {/* Substitution */}
              <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">2. Substitution</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Replace the dangerous substance with a less flammable alternative &mdash;
                  e.g. water-based paint instead of solvent-based
                </p>
              </div>

              {/* Engineering Controls */}
              <div className="bg-blue-500/15 border border-blue-500/30 rounded-lg p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">3. Engineering Controls</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Physical measures &mdash; fire-resistant storage, ventilation systems,
                  compartmentation, AFDDs, fire detection systems
                </p>
              </div>

              {/* Administrative Controls */}
              <div className="bg-amber-500/15 border border-amber-500/30 rounded-lg p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">4. Administrative Controls</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Policies, procedures, training, permits to work, housekeeping audits,
                  signage, and management systems
                </p>
              </div>

              {/* PPE / Emergency */}
              <div className="bg-rose-500/15 border border-rose-500/30 rounded-lg p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-rose-400 text-xs font-bold uppercase tracking-wider">5. PPE &amp; Emergency Response</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Last resort &mdash; fire extinguishers, fire blankets, fire-resistant PPE,
                  evacuation procedures, emergency plans
                </p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-white/50">
                &uarr; Most effective &mdash; always start at the top of the hierarchy and work
                downwards &darr;
              </p>
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
            <Link to="../fire-safety-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-3-section-2">
              Fire Detection Systems
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
