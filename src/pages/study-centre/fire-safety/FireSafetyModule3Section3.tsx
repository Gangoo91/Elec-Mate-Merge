import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CheckCircle,
  AlertTriangle,
  Radio,
  Shield,
  Settings,
  MapPin,
  Ban,
  Mic,
  Link2,
  MonitorSpeaker,
  Eye,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'call-point-height',
    question: 'At what height should manual call points be mounted?',
    options: [
      '1.0 m above floor level',
      '1.2 m above floor level',
      '1.4 m above floor level',
      '1.6 m above floor level',
    ],
    correctIndex: 2,
    explanation:
      'Manual call points should be mounted at 1.4 m above floor level. This height is specified in BS 5839 Part 1 and is chosen so that the device is easily accessible to both standing adults and wheelchair users. The call point should be located on escape routes, near exits, and within 45 m travel distance from any point in the building.',
  },
  {
    id: 'sounder-sleeping-risk',
    question:
      'What is the minimum sound level for fire alarm sounders in areas where people sleep?',
    options: [
      '55 dB at bed head',
      '65 dB at bed head (75 dB if a door is closed between the sounder and the bed)',
      '75 dB at bed head',
      '85 dB at bed head',
    ],
    correctIndex: 1,
    explanation:
      'The minimum sound level for fire alarm sounders in sleeping areas is 65 dB at bed head, increasing to 75 dB if there is a closed door between the sounder and the bed. People who are asleep are much less responsive to audible warnings, so higher sound levels are required to ensure they are woken reliably. BS 5839 Part 1 provides detailed guidance on sounder sound levels for different premises.',
  },
  {
    id: 'vad-colour',
    question: 'What colour beacon is used for fire alarm visual alarm devices?',
    options: [
      'Blue',
      'Amber',
      'Red',
      'White',
    ],
    correctIndex: 2,
    explanation:
      'Red beacons are used for fire alarm visual alarm devices (VADs). The colour red is universally associated with fire and danger, making it immediately recognisable. This is specified in BS 5839 Part 1. Other colours of beacon are used for different purposes — for example, amber for fault indication and blue for emergency services — so it is important that red is reserved exclusively for fire alarms to avoid confusion.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a staged alarm and a phased evacuation alarm?',
    answer:
      'A staged alarm (also called a two-stage alarm) uses two different signals: an "alert" signal followed by an "evacuate" signal. The alert signal warns designated staff to investigate, and if the alarm is confirmed as genuine, the evacuate signal is then sounded for all occupants. A phased evacuation alarm evacuates different parts of the building in sequence — typically starting with the floor of origin and the floor immediately above, then progressively evacuating other floors. Phased evacuation is used in tall buildings where simultaneous evacuation of all floors would be impractical and could cause dangerous overcrowding on stairways. Both systems aim to avoid unnecessary full evacuations while ensuring safety.',
  },
  {
    question: 'Why are voice alarm systems preferred in large or complex buildings?',
    answer:
      'Voice alarm systems provide spoken instructions rather than just a tone or bell. In large or complex buildings, occupants may not know the layout well and may not understand what a simple alarm tone requires them to do. Spoken messages can give clear, specific instructions — such as which exits to use, which floors to evacuate, and where to assemble. Voice alarms also reduce panic because a calm, authoritative spoken message is less alarming than a continuous loud tone. They are essential for phased evacuation because different messages can be sent to different zones simultaneously. BS 5839 Part 8 covers voice alarm systems, and BS 7443 addresses voice intelligibility requirements.',
  },
  {
    question:
      'What should happen to fire doors with hold-open devices when the fire alarm activates?',
    answer:
      'Fire doors fitted with electromagnetic hold-open devices must release automatically when the fire alarm activates, allowing the doors to close under the action of their self-closing device. This is a critical fire safety measure because fire doors compartmentalise the building, preventing the spread of fire and smoke. The hold-open devices are connected to the fire alarm system so that activation of any detector or call point in the relevant zone causes the doors to release. It is essential that these devices are included in the weekly fire alarm test and that the doors are checked to confirm they close fully when released. Doors that do not close properly must be repaired immediately.',
  },
  {
    question: 'How do you reduce false alarms during construction or refurbishment work?',
    answer:
      'False alarms during construction work can be managed through several strategies: isolating or disabling detectors in the work area (with a formal management protocol and risk assessment), fitting temporary covers or caps over detector heads, using appropriate detector types for the environment (e.g. heat detectors instead of smoke detectors in dusty areas), increasing detector sensitivity thresholds on analogue-addressable systems, implementing an investigation delay at the control panel (allowing a set time for staff to investigate before sounders activate), using call point covers to prevent accidental activation, and maintaining a log of all isolations and alterations. All temporary measures must be documented, reviewed daily, and reversed as soon as the work is complete. The fire risk assessment must be updated to reflect any reduced level of detection.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'At what height above floor level should manual call points be mounted according to BS 5839 Part 1?',
    options: [
      '1.0 m',
      '1.2 m',
      '1.4 m',
      '1.8 m',
    ],
    correctAnswer: 2,
    explanation:
      'Manual call points must be mounted at 1.4 m above floor level. This height ensures accessibility for standing adults and wheelchair users. They should be sited on escape routes near exits, with a maximum travel distance of 45 m from any point in the building to the nearest call point.',
  },
  {
    id: 2,
    question:
      'What is the minimum sound level that fire alarm sounders must achieve in areas other than sleeping areas?',
    options: [
      '55 dB or 5 dB above background noise',
      '65 dB or 5 dB above background noise',
      '75 dB or 5 dB above background noise',
      '85 dB or 5 dB above background noise',
    ],
    correctAnswer: 2,
    explanation:
      'In areas other than sleeping areas, fire alarm sounders must achieve a minimum of 75 dB or 5 dB above the ambient background noise level, whichever is greater. In sleeping areas, the minimum is 65 dB at bed head (75 dB with a closed door between the sounder and the bed). These levels are specified in BS 5839 Part 1.',
  },
  {
    id: 3,
    question:
      'Which of the following is a function of the fire alarm control and indicating equipment (CIE)?',
    options: [
      'Suppressing the fire automatically with water',
      'Receiving signals from detectors and call points, processing them, and activating sounders',
      'Providing emergency lighting in the event of a power failure',
      'Ventilating the building to remove smoke',
    ],
    correctAnswer: 1,
    explanation:
      'The fire alarm control and indicating equipment (CIE) — commonly called the fire alarm control panel — is the central brain of the fire alarm system. It receives signals from detectors and manual call points, processes those signals according to its cause-and-effect programming, and activates the appropriate outputs: sounders, VADs, door release mechanisms, HVAC shutdown, lift recall, and remote monitoring. It also displays fault, fire, disable, and test indications.',
  },
  {
    id: 4,
    question:
      'What is the maximum search area for a single fire alarm zone according to BS 5839 Part 1?',
    options: [
      '500 m²',
      '1,000 m²',
      '2,000 m²',
      '5,000 m²',
    ],
    correctAnswer: 2,
    explanation:
      'The maximum floor area for a single fire alarm zone is 2,000 m². This limit ensures that the fire brigade or building staff can quickly locate the source of an alarm. If a zone is too large, finding the activated device takes too long, delaying fire-fighting operations. Buildings should be zoned floor by floor where practical, and zone plans must be displayed at the fire alarm control panel.',
  },
  {
    id: 5,
    question:
      'Which of the following is the MOST common cause of false fire alarms in buildings?',
    options: [
      'Detector failure due to age',
      'Lightning strikes on the building',
      'Environmental factors such as cooking fumes, steam, dust, or insects',
      'Faulty wiring in the alarm circuit',
    ],
    correctAnswer: 2,
    explanation:
      'The most common causes of false alarms are environmental factors: cooking fumes, steam from bathrooms or kitchens, dust from construction work, and insects entering detector chambers. False alarms desensitise occupants (who begin to ignore alarm activations), waste fire and rescue service time, and can result in charges from the fire authority. Appropriate detector selection, siting, and the use of analogue-addressable systems with adjustable sensitivity are key measures for reducing false alarms.',
  },
  {
    id: 6,
    question: 'What is a key advantage of voice alarm systems over conventional alarm sounders?',
    options: [
      'They are cheaper to install and maintain',
      'They do not require any wiring',
      'They provide clear spoken instructions that reduce confusion and panic, and support phased evacuation messaging',
      'They are louder than conventional sounders',
    ],
    correctAnswer: 2,
    explanation:
      'Voice alarm systems provide clear spoken instructions rather than just a tone or bell. This reduces panic, provides specific guidance (such as which exits to use), and is essential for phased evacuation where different zones receive different messages. Voice alarm systems are governed by BS 5839 Part 8 and must meet the intelligibility requirements of BS 7443.',
  },
  {
    id: 7,
    question:
      'Visual alarm devices (VADs) in a fire alarm system are primarily provided for which group of building occupants?',
    options: [
      'People with visual impairments',
      'People with hearing impairments',
      'People working in noisy environments only',
      'People in management or supervisory roles',
    ],
    correctAnswer: 1,
    explanation:
      'Visual alarm devices (VADs), also known as beacons, are primarily provided for people with hearing impairments who may not be able to hear audible fire alarm sounders. VADs use red flashing or pulsating beacons to provide a visual warning of fire. BS 5839 Part 1 provides guidance on VAD provision, including wall-mounted and ceiling-mounted options. VADs are also useful in noisy environments where sounders alone may not be heard.',
  },
  {
    id: 8,
    question:
      'When the fire alarm activates, which of the following should happen automatically via system integration?',
    options: [
      'All windows should open to ventilate smoke',
      'Electromagnetic hold-open devices release fire doors, HVAC shuts down, and lifts recall to ground floor',
      'Emergency lighting switches off to conserve power',
      'The sprinkler system deactivates to prevent water damage',
    ],
    correctAnswer: 1,
    explanation:
      'When the fire alarm activates, the cause-and-effect programming triggers integrated responses: electromagnetic hold-open devices release fire doors (allowing them to close and compartmentalise the building), HVAC systems shut down (to prevent the spread of smoke through ductwork), lifts recall to the ground floor and go out of service, smoke control systems activate, and security access control systems unlock doors on escape routes. These actions are defined in the cause-and-effect matrix and must be tested during commissioning.',
  },
];

export default function FireSafetyModule3Section3() {
  useSEO({
    title: 'Fire Alarm Systems | Fire Safety Module 3.3',
    description:
      'Fire alarm system components, manual call points, sounders, visual alarm devices, control panels, zoning, false alarm management, voice alarm systems, and system integration.',
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
            <Bell className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fire Alarm Systems
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Components, manual call points, sounders, visual alarm devices, control panels, zoning,
            false alarm management, voice alarm systems, and system integration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Control panel:</strong> The brain of the system &mdash; receives, processes, outputs
              </li>
              <li>
                <strong>Call points:</strong> 1.4 m height, on escape routes, max 45 m travel
              </li>
              <li>
                <strong>Sounders:</strong> 75 dB general, 65 dB sleeping (at bed head)
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400/90 text-base font-medium mb-2">Key Standards</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>BS 5839 Part 1:</strong> Fire detection and alarm systems
              </li>
              <li>
                <strong>BS 5839 Part 8:</strong> Voice alarm systems
              </li>
              <li>
                <strong>BS 7443:</strong> Voice intelligibility requirements
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the main components of a fire alarm system and describe their functions',
              'Explain the siting requirements for manual call points and alarm sounders',
              'Describe the purpose and provision of visual alarm devices (VADs)',
              'Explain the functions of fire alarm control and indicating equipment (CIE)',
              'Describe fire alarm zoning principles and phased evacuation strategies',
              'Identify common causes of false alarms and explain management strategies',
              'Explain the advantages of voice alarm systems and their regulatory framework',
              'Describe how fire alarm systems integrate with other building systems',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Purpose & Components of Fire Alarm Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">01</span>
            Purpose &amp; Components of Fire Alarm Systems
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The primary purpose of a fire alarm system is to <strong>warn all occupants to evacuate</strong> in
                the event of a fire. A well-designed fire alarm system detects fire at the earliest possible stage,
                raises the alarm throughout the building, and provides clear indication of the location of the fire
                to aid fire-fighting operations. The design, installation, commissioning, and maintenance of fire
                alarm systems in the UK is governed by <strong>BS 5839 Part 1: Fire detection and fire alarm
                systems for buildings &mdash; Code of practice for design, installation, commissioning and
                maintenance of systems in non-domestic premises</strong>.
              </p>

              <p>
                A fire alarm system comprises several interconnected components, each with a specific role. The
                reliability of the entire system depends on every component functioning correctly. Understanding
                each component and its purpose is essential for anyone involved in fire safety management.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core System Components</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Control and indicating equipment (CIE):</strong> The
                      &ldquo;brain&rdquo; of the system &mdash; receives signals from detectors and call points,
                      processes them, and activates the appropriate outputs (sounders, VADs, door releases, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Manual call points:</strong> Break-glass devices that allow
                      any person discovering a fire to raise the alarm manually
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Automatic detectors:</strong> Smoke detectors, heat detectors,
                      flame detectors, and multi-sensor detectors that detect fire automatically without human
                      intervention
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Alarm sounders:</strong> Devices that produce audible warnings
                      &mdash; bells, electronic sounders, or voice alarm speakers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Visual alarm devices (VADs):</strong> Red beacons that
                      provide a visual warning for hearing-impaired persons or noisy environments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Cabling:</strong> Fire-resistant cables connecting all devices
                      to the control panel, designed to maintain circuit integrity during a fire
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Power supplies:</strong> Mains supply with battery backup
                      (minimum 24 hours standby plus 30 minutes in alarm condition) to ensure the system operates
                      during a mains failure
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">BS 5839 Part 1:</strong> This is the primary British Standard
                  for fire detection and alarm systems in non-domestic premises. It covers system categories (L1
                  to L5 for life protection, M for manual systems, P1/P2 for property protection), system design,
                  device selection and siting, installation, commissioning, maintenance, and false alarm management.
                  Every fire alarm system should be designed, installed, and maintained in accordance with this
                  standard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Manual Call Points */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">02</span>
            Manual Call Points
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Manual call points (MCPs) &mdash; commonly known as <strong>break-glass units</strong> &mdash; are
                the most familiar component of a fire alarm system. They allow any person who discovers a fire to
                raise the alarm immediately by pressing or breaking the front element of the device. The break-glass
                type is the most common type in the UK, identified by its red colour and the instruction &ldquo;BREAK
                GLASS &mdash; PRESS HERE&rdquo;.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Resettable Type</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Plastic front element that flexes when pressed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Can be reset using a special key after activation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>More common in modern installations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Lower ongoing replacement cost</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Frangible Glass Type</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Thin glass element that shatters when pressed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Requires replacement glass after each activation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>The original and still widely installed type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Clear evidence of activation (broken glass)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Siting Requirements</p>
                <div className="space-y-2">
                  {[
                    'Mount at 1.4 m above floor level — accessible for standing adults and wheelchair users',
                    'Position on escape routes, particularly near exits and stairway entrances',
                    'Maximum travel distance of 45 m from any point in the building to the nearest call point',
                    'Do not site behind doors, obstructed by furniture, or in locations that are difficult to access',
                    'Clearly visible and unobstructed — the red colour makes them identifiable at a distance',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Green vs Red &mdash; Avoid Confusion
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">Red</strong> break-glass units are for fire alarm activation.{' '}
                  <strong className="text-white">Green</strong> break-seal units are for emergency door release
                  (allowing people to exit through security-locked doors in an emergency). It is essential
                  that building occupants understand the difference. The two types should never be sited
                  immediately adjacent to each other, and clear signage must distinguish their purposes.
                  Activating a green break-seal releases a door lock; activating a red break-glass raises
                  the fire alarm. Confusion between the two can delay evacuation or cause unnecessary alarm
                  activations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Alarm Sounders & Visual Alarm Devices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">03</span>
            Alarm Sounders &amp; Visual Alarm Devices
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fire alarm sounders are the audible warning devices that alert building occupants to evacuate.
                The type of sounder, its location, and its sound level are all critical to ensuring that every
                person in the building hears the alarm and understands that they must evacuate. Visual alarm
                devices (VADs) provide an additional visual warning for persons who are hearing-impaired or who
                are in environments where ambient noise may mask the audible alarm.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Bell className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Bells</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Traditional alarm sounder type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Electromechanical operation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Still found in many older installations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Recognisable sound, but limited frequency range</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MonitorSpeaker className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Electronic Sounders</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Most common type in modern systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Variety of tones: continuous, pulsating, sweeping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Higher sound output for their size</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Can be combined with VAD beacons</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Mic className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Voice Alarm Speakers</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Deliver spoken evacuation messages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Can also produce conventional alarm tones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Essential for phased evacuation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Required in complex buildings and high-rise</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Minimum Sound Levels (BS 5839 Part 1)</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">General areas:</strong> Minimum 75 dB, or 5 dB above the
                      ambient background noise level, whichever is greater
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Sleeping areas (no closed door):</strong> Minimum 65 dB at
                      bed head
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Sleeping areas (closed door between sounder and bed):</strong> Minimum
                      75 dB at bed head
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Background noise consideration:</strong> The alarm must always
                      be at least 5 dB above the typical background noise in the area to be clearly distinguishable
                    </span>
                  </li>
                </ul>
              </div>

              {/* VADs */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Visual Alarm Devices (VADs / Beacons)
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    VADs are provided primarily for <strong className="text-white">hearing-impaired persons</strong> who
                    may not be able to hear audible sounders. They use <strong className="text-white">red</strong> flashing
                    or pulsating beacons to provide a visual fire warning. BS 5839 Part 1 provides guidance on their
                    provision and siting.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong className="text-white">Pulsating:</strong> Flashing beacons are more attention-grabbing
                        and are the standard type for fire alarm VADs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong className="text-white">Red colour:</strong> Red is reserved exclusively for fire
                        alarm beacons to avoid confusion with other visual signals
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong className="text-white">Wall-mounted:</strong> Positioned to be visible from all
                        areas of the room, typically at high level
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>
                        <strong className="text-white">Ceiling-mounted:</strong> Used where wall mounting is not
                        practical, or in open-plan spaces to achieve wide coverage
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Control & Indicating Equipment (CIE) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">04</span>
            Control &amp; Indicating Equipment (CIE)
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The fire alarm control and indicating equipment (CIE) &mdash; commonly referred to as the
                fire alarm control panel &mdash; is the central hub of the fire alarm system. It receives
                signals from all detection and manual activation devices, processes those signals according
                to pre-programmed logic, and activates the appropriate outputs. The panel also provides
                indications to building management and the fire and rescue service about the status of the
                system and the location of any fire condition.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Operating Modes</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Day Mode</p>
                    <p className="text-xs text-white/80">
                      Normal daytime operation. An investigation delay may be active, allowing staff a set
                      time to investigate before full alarm activation. Appropriate when trained staff are
                      present to respond quickly.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Night Mode</p>
                    <p className="text-xs text-white/80">
                      Automatic activation with no investigation delay. Used when the building is unoccupied
                      or when staff are sleeping. Ensures the fastest possible alarm response.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-rose-400 mb-1">Walk Test</p>
                    <p className="text-xs text-white/80">
                      Allows individual devices to be tested without activating the full alarm system.
                      Used during weekly testing and maintenance. Each device activation produces only a
                      brief local indication.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Indicators</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire:</strong> A detector or call point has been activated.
                      The panel identifies the zone and (on addressable systems) the specific device. Red LED or
                      display indication.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fault:</strong> A wiring fault, device failure, or
                      communication problem has been detected. Amber/yellow LED indication. Requires investigation
                      and repair.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Disable:</strong> A zone, device, or output has been deliberately
                      disabled (e.g. during maintenance or building works). Must be recorded in the log book and
                      reversed as soon as possible.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Test:</strong> The system or a zone is in test mode (walk test).
                      Prevents full alarm activation during testing.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Repeat &amp; Mimic Panels</p>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">Repeat panels</strong> duplicate the information displayed
                    on the main control panel and are located at secondary positions &mdash; typically at
                    building entrances used by the fire service.{' '}
                    <strong className="text-white">Mimic panels</strong> display a graphical representation of
                    the building showing the location of each zone and indicating which zones are in alarm. Zone
                    plans at the panel location help fire-fighters quickly identify where in the building the
                    alarm has originated.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Remote Monitoring</p>
                  <p className="text-sm text-white/80">
                    Fire alarm systems can be connected to an alarm receiving centre (ARC) for remote
                    monitoring, in accordance with <strong className="text-white">BS 5979</strong> and{' '}
                    <strong className="text-white">EN 54-21</strong>. Remote monitoring ensures that fire alarm
                    activations and fault conditions are reported to a manned centre even when the building is
                    unoccupied. The ARC can then alert the fire and rescue service, the responsible person, or
                    a keyholder as appropriate.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Cause and Effect Programming</p>
                </div>
                <p className="text-sm text-white/80">
                  The <strong className="text-white">cause-and-effect programme</strong> defines what happens when
                  each detector or call point activates. It specifies which sounders operate, which VADs flash,
                  which fire doors are released, which HVAC systems shut down, which lifts recall to the ground
                  floor, and which suppression systems activate. This programming is unique to each building and
                  must be designed by a competent fire alarm engineer. It is documented in a{' '}
                  <strong className="text-white">cause-and-effect matrix</strong> that forms a key part of the
                  system commissioning documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Fire Alarm Zoning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">05</span>
            Fire Alarm Zoning
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fire alarm zoning divides a building into smaller, identifiable areas so that when a detector or
                call point activates, the control panel can indicate <strong>where</strong> in the building the
                fire has been detected. Without zoning, the fire brigade would know only that there was an alarm
                somewhere in the building, making it much harder to locate and fight the fire quickly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Zoning Principles</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Zone size limit:</strong> The search area for a single zone
                      must not exceed <strong className="text-white">2,000 m²</strong>, ensuring the fire can be
                      located quickly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Floor-by-floor:</strong> Each floor of a multi-storey building
                      should generally be a separate zone (or multiple zones if the floor area is large)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Zone plans:</strong> Clear zone plans must be displayed at the
                      fire alarm control panel location, showing the extent of each zone and the position of
                      detection devices within it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Detection vs sounder zones:</strong> Detection zones identify
                      where the fire is; sounder zones define where the alarm sounds. In a simple system, all
                      sounders activate simultaneously. In a phased system, only certain sounder zones activate initially
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Phased Evacuation &amp; Staged Alarms</p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    In large or complex buildings &mdash; particularly tall buildings &mdash; it may be neither
                    practical nor safe to evacuate all occupants simultaneously. Two strategies are used to manage
                    evacuation more effectively:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white mb-1">Phased Evacuation</p>
                      <p className="text-xs text-white/80">
                        The building is evacuated in phases: typically the fire floor and the floor immediately
                        above are evacuated first, then adjacent floors progressively. This prevents dangerous
                        overcrowding on stairways and allows the fire service to use dedicated fire-fighting
                        lifts and lobbies without being impeded by large numbers of evacuating occupants.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white mb-1">Two-Stage Alarm (Staged)</p>
                      <p className="text-xs text-white/80">
                        Uses two different signals. The first signal (&ldquo;alert&rdquo;) warns designated staff
                        to investigate. If the alarm is confirmed as genuine, the second signal
                        (&ldquo;evacuate&rdquo;) sounds throughout the building. This approach reduces
                        unnecessary evacuations caused by false alarms while maintaining safety.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: False Alarm Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">06</span>
            False Alarm Management
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                False alarms are one of the most significant problems in fire safety management. They
                desensitise building occupants, who begin to ignore or respond slowly to alarm activations.
                They waste fire and rescue service time and resources, diverting appliances from genuine
                emergencies. Persistent false alarms can result in the fire service charging the responsible
                person for attendance, and in extreme cases, the fire service may decide not to respond
                automatically to repeat offender premises.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Ban className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Common Causes of False Alarms</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      cause: 'Cooking fumes and steam',
                      detail: 'Kitchens, canteens, and areas adjacent to cooking appliances',
                    },
                    {
                      cause: 'Steam from bathrooms and showers',
                      detail: 'Hotel rooms, care homes, changing facilities',
                    },
                    {
                      cause: 'Dust from construction work',
                      detail: 'Drilling, sanding, cutting, demolition activity',
                    },
                    {
                      cause: 'Insects entering detector chambers',
                      detail: 'Particularly during warm weather — can trigger optical detectors',
                    },
                    {
                      cause: 'Building works and maintenance',
                      detail: 'Hot works, welding, soldering, paint fumes, adhesive vapours',
                    },
                    {
                      cause: 'Equipment or detector failure',
                      detail: 'End-of-life detectors, contaminated sensor chambers, wiring faults',
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                      <p className="text-sm font-medium text-red-300 mb-1">{item.cause}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">False Alarm Reduction Strategies</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Appropriate detector selection:</strong> Use heat detectors in
                      kitchens and dusty environments where smoke detectors would cause false alarms. Use
                      multi-sensor detectors for better discrimination.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Correct siting:</strong> Ensure detectors are positioned away
                      from cooking appliances, steam sources, ventilation outlets, and other potential false alarm
                      sources.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Analogue-addressable sensitivity:</strong> Modern
                      analogue-addressable systems allow individual detector sensitivity to be adjusted. Detectors
                      in areas prone to false alarms can have their threshold increased (with careful risk assessment).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Investigation delays:</strong> A programmed delay at the
                      control panel gives staff time to investigate before the full alarm sounds. This must be
                      supported by a formal risk assessment and trained staff.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Call point covers:</strong> Transparent hinged covers over
                      manual call points deter accidental or malicious activation while still allowing genuine use.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Management protocols:</strong> Formal procedures for managing
                      alarm activations, investigation, and recording in the fire alarm log book. Regular review
                      of false alarm data to identify patterns and take corrective action.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Log Book:</strong> Every fire alarm activation &mdash; whether
                  genuine or false &mdash; must be recorded in the fire alarm log book. The log should include the
                  date, time, zone, device, cause (if known), action taken, and who investigated. This data is
                  invaluable for identifying patterns, tracking repeat problem areas, and demonstrating compliance
                  during fire safety audits. The log book forms part of the premises&rsquo; fire safety records
                  under the Regulatory Reform (Fire Safety) Order 2005.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Voice Alarm Systems (BS 5839 Part 8) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Voice Alarm Systems (BS 5839 Part 8)
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Voice alarm systems use spoken messages &mdash; either pre-recorded or delivered live via a
                microphone &mdash; instead of or alongside conventional alarm sounders. They are governed by{' '}
                <strong>BS 5839 Part 8</strong> and must meet the voice intelligibility requirements of{' '}
                <strong>BS 7443</strong>. Voice alarm systems are increasingly specified in complex
                buildings where conventional sounders alone would not provide sufficiently clear guidance to
                occupants.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Mic className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Voice Alarm Features</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Pre-recorded messages:</strong> Standardised evacuation
                      instructions that play automatically when the alarm activates. Messages are typically
                      recorded by a professional voice artist for clarity and authority.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Live microphone capability:</strong> Allows trained staff or
                      the fire service to make live announcements, providing real-time instructions that adapt to
                      the developing situation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Phased evacuation messaging:</strong> Different messages can
                      be sent to different zones simultaneously &mdash; essential for tall buildings using phased
                      evacuation. The fire floor receives an &ldquo;evacuate now&rdquo; message while other floors
                      receive an &ldquo;alert &mdash; await further instruction&rdquo; message.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Multi-language support:</strong> In buildings with occupants
                      who speak different languages, messages can be delivered in multiple languages sequentially.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">Where Voice Alarm is Required</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Complex buildings with multiple escape routes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>High-rise buildings using phased evacuation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Buildings with sleeping risk (hotels, care homes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Large public assembly buildings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Buildings where occupants are unfamiliar with the layout</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Advantages Over Conventional Sounders</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Clearer instruction &mdash; occupants know what to do</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Reduced panic &mdash; calm, authoritative spoken voice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Phased messaging &mdash; different zones, different messages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Adaptable &mdash; live announcements for changing situations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                      <span>Intelligibility testing ensures messages are understood</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">BS 7443 &mdash; Voice Intelligibility:</strong> It is not
                  enough for a voice alarm message to be loud enough. It must also be{' '}
                  <strong>intelligible</strong> &mdash; the words must be clearly understood by the listener.
                  BS 7443 sets out methods for measuring and verifying voice intelligibility in buildings.
                  Factors that affect intelligibility include reverberation, background noise, speaker placement,
                  and the frequency response of the speaker system. Voice intelligibility must be tested during
                  commissioning and periodically thereafter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: System Integration & Interfaces */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400/80 text-sm font-normal">08</span>
            System Integration &amp; Interfaces
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A fire alarm system does not operate in isolation. In modern buildings, the fire alarm system
                integrates with a range of other building systems to ensure a co-ordinated and effective response
                to a fire. These interfaces are defined in the{' '}
                <strong>cause-and-effect matrix</strong> and must be designed, installed, and commissioned by
                competent persons. Failures in system integration can have serious consequences &mdash; a fire
                door that does not release, a ventilation system that continues to spread smoke, or a lift that
                does not recall to the ground floor.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Link2 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Integrated Systems</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Door hold-open devices:</strong> Electromagnetic devices
                      that hold fire doors open during normal use. On alarm activation, the magnets de-energise,
                      releasing the doors to close under their self-closing mechanism. This compartmentalises the
                      building and prevents the spread of fire and smoke.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Smoke control systems:</strong> Smoke ventilation systems,
                      pressurisation systems, and smoke curtains that activate on alarm to control the movement
                      of smoke and maintain tenable conditions on escape routes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">HVAC shutdown:</strong> Heating, ventilation, and air
                      conditioning systems are shut down on alarm to prevent the spread of smoke through
                      ductwork. Dampers close to compartmentalise the duct system.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Security and access control:</strong> Security-locked doors
                      on escape routes must unlock automatically on alarm to allow free egress. Turnstiles and
                      barriers must fail-safe to the open position.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Lift recall:</strong> Lifts are recalled to the ground floor
                      (or a designated level) and taken out of service on alarm. This prevents occupants from
                      using lifts during a fire and ensures the lifts are available for fire service use if
                      required.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Suppression systems:</strong> In some installations, the fire
                      alarm system interfaces with automatic suppression systems (sprinklers, gas suppression,
                      water mist) to provide co-ordinated detection and suppression.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Fire Alarm System Architecture Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Fire Alarm System Architecture
                </p>
                <div className="flex flex-col items-center gap-3">
                  {/* Input devices */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-md">
                    {[
                      { label: 'Smoke Detectors', icon: '🔍' },
                      { label: 'Heat Detectors', icon: '🌡' },
                      { label: 'Manual Call Points', icon: '🔴' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-2 text-center"
                      >
                        <p className="text-[10px] sm:text-xs text-rose-400 font-medium">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Arrows down */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-rose-400/40" />
                    <div className="text-rose-400/60 text-xs">Input signals</div>
                    <div className="w-0.5 h-4 bg-rose-400/40" />
                  </div>

                  {/* Control Panel */}
                  <div className="bg-rose-500/20 border-2 border-rose-400/50 rounded-xl p-4 w-full max-w-sm text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Radio className="h-5 w-5 text-rose-400" />
                      <p className="text-sm font-bold text-rose-400">Fire Alarm Control Panel (CIE)</p>
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/60">
                      Receives &bull; Processes &bull; Activates &bull; Indicates
                    </p>
                  </div>

                  {/* Arrows down */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-rose-400/40" />
                    <div className="text-rose-400/60 text-xs">Output signals</div>
                    <div className="w-0.5 h-4 bg-rose-400/40" />
                  </div>

                  {/* Output devices */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-lg">
                    {[
                      'Sounders / Voice Alarm',
                      'VADs (Beacons)',
                      'Door Hold-Open Release',
                      'HVAC Shutdown',
                      'Lift Recall',
                      'Remote Monitoring (ARC)',
                    ].map((label, i) => (
                      <div
                        key={i}
                        className="bg-white/5 border border-white/20 rounded-lg p-2 text-center"
                      >
                        <p className="text-[10px] sm:text-xs text-white/80 font-medium">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Cause-and-Effect Matrix</p>
                <p className="text-sm text-white/80 mb-2">
                  The cause-and-effect matrix is a document that defines exactly what happens when each input
                  device activates. It is typically presented as a table or spreadsheet showing:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Which detectors and call points are in each zone (causes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Which outputs are triggered by each zone (effects)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Specific sounders, VADs, door releases, HVAC, lifts, and suppression for each scenario</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>Any time delays, phasing, or conditional logic</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Competent Design &amp; Commissioning
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The integration of fire alarm systems with other building systems is safety-critical. It must
                  be designed by a competent fire alarm engineer who understands both the fire alarm system and
                  the interfaced systems. All interfaces must be thoroughly tested during commissioning, with
                  each cause-and-effect scenario verified. The commissioning certificate and the cause-and-effect
                  matrix must be retained as part of the building&rsquo;s fire safety documentation. Any
                  subsequent changes to the building, its use, or its systems must be reflected in an updated
                  cause-and-effect matrix.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Fire Detection Systems
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-3-section-4">
              Emergency Lighting
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
