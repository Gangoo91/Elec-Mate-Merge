import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Shield,
  Clock,
  Users,
  Building,
  DoorOpen,
  Siren,
  HardHat,
  Accessibility,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "max-travel-distance-high-risk",
    question:
      "What is the maximum travel distance in a high-risk area where travel is possible in one direction only?",
    options: [
      "9 metres",
      "18 metres",
      "25 metres",
      "45 metres",
    ],
    correctIndex: 1,
    explanation:
      "The maximum travel distance in a high-risk area where travel is possible in one direction only is 18 metres. This is the most restrictive travel distance in the Building Regulations Approved Document B guidance. Where alternative escape routes are available in a high-risk area, the distance extends to 25 metres. Low-risk areas with alternative directions of travel allow up to 45 metres.",
  },
  {
    id: "hospital-evacuation-strategy",
    question:
      "Which evacuation strategy is most commonly used in hospitals and care homes?",
    options: [
      "Simultaneous evacuation",
      "Phased evacuation",
      "Progressive horizontal evacuation",
      "Defend-in-place",
    ],
    correctIndex: 2,
    explanation:
      "Progressive horizontal evacuation is the most common strategy in hospitals and care homes. Patients and residents are moved horizontally through fire doors into an adjacent fire compartment on the same floor, rather than being moved vertically via stairs. This approach recognises that many occupants may be non-ambulant or require significant assistance to move, making vertical evacuation impractical as a first response. Full vertical evacuation is only initiated if the fire spreads beyond the compartment of origin.",
  },
  {
    id: "minimum-fire-drill-frequency",
    question:
      "What is the minimum frequency for fire drills under the RRFSO?",
    options: [
      "Monthly",
      "Every 6 months",
      "Annually",
      "Every 2 years",
    ],
    correctIndex: 2,
    explanation:
      "The Regulatory Reform (Fire Safety) Order 2005 requires that fire drills are carried out at suitable intervals. Government guidance recommends a minimum of annually, although 6-monthly drills are considered best practice, particularly for premises with higher risk or a large number of occupants. In premises where shifts operate, drills should be conducted so that all shift patterns are covered over the course of a year.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between phased evacuation and progressive horizontal evacuation?",
    answer:
      "Phased (or staged) evacuation involves evacuating the fire floor first, then adjacent floors above and below, and finally the rest of the building in a controlled sequence. Occupants move vertically via staircases to exit the building entirely. This strategy is used in tall buildings with robust compartmentation and addressable fire alarm systems. Progressive horizontal evacuation, by contrast, moves occupants horizontally through fire doors into an adjacent fire compartment on the same floor. Occupants do not use stairs unless absolutely necessary. This strategy is specifically designed for premises where occupants may have limited mobility, such as hospitals and care homes. The key difference is the direction of initial movement: vertical in phased evacuation, horizontal in progressive horizontal evacuation.",
  },
  {
    question:
      "Has the stay-put (defend-in-place) strategy changed since the Grenfell Tower fire?",
    answer:
      "The Grenfell Tower fire in June 2017 prompted a fundamental review of the stay-put strategy for residential high-rise buildings. The Grenfell Tower Inquiry Phase 1 Report (October 2019) found that the stay-put advice was not revoked quickly enough as conditions deteriorated. Since then, several changes have been implemented. The Fire Safety Act 2021 and the Building Safety Act 2022 introduced new duties for building owners and managers. The development of building evacuation plans, including the provision of Personal Emergency Evacuation Plans (PEEPs) and Generic Emergency Evacuation Plans (GEEPs), became more prominent. The government mandated the installation of evacuation alert systems in high-rise residential buildings over 18 metres. The stay-put strategy remains valid in principle for buildings with adequate compartmentation, but it must now be supported by a clear trigger point for switching to full evacuation, effective communication systems to relay that change of strategy to residents, and regular review by the responsible person.",
  },
  {
    question:
      "In which direction must doors on escape routes open, and are there exceptions?",
    answer:
      "Under RRFSO Article 14 and Approved Document B, doors on escape routes must open in the direction of escape (i.e. outward from the building or towards the final exit). This ensures that a crowd pressing against a door can push it open rather than being trapped. Panic hardware (push-bars or touch-bars complying with BS EN 1125 or BS EN 179) must be fitted so that the door can be opened easily without prior knowledge or the use of a key. Exceptions exist for small rooms where the number of occupants is very low (typically fewer than 60 persons in the room) and where the door opening inward would not obstruct the escape route. Sliding doors and revolving doors on escape routes must either be capable of being opened in the direction of escape as a swing door or be positioned adjacent to a conventional hinged escape door. Electrically powered locks must release automatically on activation of the fire alarm and on failure of the power supply.",
  },
  {
    question:
      "Can lifts be used for evacuation during a fire?",
    answer:
      "Conventionally, lifts must not be used for evacuation during a fire because they may stop at the fire floor, become filled with smoke, or lose power. Standard lifts are designed to return to ground level and park with doors open when the fire alarm activates (fireman's recall). However, specially designed evacuation lifts (sometimes called firefighting lifts or assisted evacuation lifts) can be used as part of the evacuation strategy, particularly for persons with mobility impairments. These lifts must have an independent electrical supply (or dual supply), be located within a fire-protected lobby with a minimum 120-minute fire rating, have controls that allow operation by a trained evacuation team, and include a communication system between the lift car and the fire service. BS 9999 and Approved Document B provide guidance on the use of evacuation lifts. In tall residential buildings post-Grenfell, the provision of evacuation lifts is becoming increasingly common as part of the building safety strategy.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which evacuation strategy involves everyone leaving the building immediately on hearing the alarm?",
    options: [
      "Phased evacuation",
      "Simultaneous evacuation",
      "Progressive horizontal evacuation",
      "Defend-in-place",
    ],
    correctAnswer: 1,
    explanation:
      "Simultaneous evacuation is the simplest strategy: everyone evacuates the building immediately on hearing the alarm. It is the most common strategy and is suitable for small to medium premises where the building can be cleared quickly. All occupants respond to a single continuous alarm signal and move directly to the assembly point. The target evacuation time is typically 2.5 to 3 minutes.",
  },
  {
    id: 2,
    question:
      "What is the maximum travel distance for a normal-risk area with alternative escape routes (no sprinklers)?",
    options: [
      "18 metres",
      "25 metres",
      "35 metres",
      "45 metres",
    ],
    correctAnswer: 2,
    explanation:
      "The maximum travel distance for a normal-risk area with alternative escape routes is 35 metres (without sprinklers). Travel distances are specified in Approved Document B Table 2 and BS 9999. High-risk areas with a single direction of travel are limited to 18 metres, whilst low-risk areas with sprinklers and alternative routes can extend to 45 metres.",
  },
  {
    id: 3,
    question:
      "In a phased evacuation, what type of alarm signal is typically used?",
    options: [
      "A single continuous tone for all floors",
      "A two-stage alarm: alert tone then evacuate tone",
      "A voice alarm on the fire floor only",
      "A silent alarm sent to mobile devices",
    ],
    correctAnswer: 1,
    explanation:
      "Phased evacuation typically uses a two-stage alarm system. The first stage is an alert signal (often an intermittent tone or a voice message) on the fire floor and the floor immediately above, telling occupants to prepare to evacuate. The second stage is the full evacuate signal (continuous tone or voice command) instructing those floors to leave via the stairs. Floors further away receive the alert signal progressively. Voice alarm systems are strongly recommended for phased evacuation as they can deliver clear instructions specific to each zone.",
  },
  {
    id: 4,
    question:
      "Which of the following must be recorded following a fire drill?",
    options: [
      "Only the total evacuation time",
      "Only the names of persons who failed to evacuate",
      "The date, time, evacuation time, number of occupants, any issues identified, and corrective actions",
      "Only the name of the person who raised the alarm",
    ],
    correctAnswer: 2,
    explanation:
      "Fire drill records must be comprehensive. They should include the date and time of the drill, whether it was announced or unannounced, the total evacuation time, the number of occupants evacuated, any problems encountered (blocked exits, alarm audibility issues, persons unaccounted for), corrective actions taken, and the name of the person responsible for conducting the drill. These records must be kept as part of the fire safety management documentation and may be inspected by the fire authority.",
  },
  {
    id: 5,
    question:
      "What is the minimum clear width for an escape route serving up to 220 persons?",
    options: [
      "750 mm",
      "850 mm",
      "1050 mm",
      "1200 mm",
    ],
    correctAnswer: 1,
    explanation:
      "The minimum clear width for an escape route serving up to approximately 220 persons is 850 mm. Approved Document B Table 4 specifies minimum widths based on the maximum number of persons the route is expected to serve. Routes serving more than 220 persons typically require a minimum of 1050 mm. For routes serving very small numbers (fewer than 60), a minimum of 750 mm may be acceptable in some circumstances, but 850 mm is the standard baseline for most escape routes.",
  },
  {
    id: 6,
    question:
      "In which direction must doors on escape routes open?",
    options: [
      "Inward, towards the building interior",
      "In the direction of escape (outward towards the exit)",
      "In either direction, provided they are self-closing",
      "Upward, as roller shutters",
    ],
    correctAnswer: 1,
    explanation:
      "Doors on escape routes must open in the direction of escape, i.e. outward towards the final exit. This is required by RRFSO Article 14 and Approved Document B. Opening in the direction of escape prevents a crowd of people pressing against a door from being unable to open it. Panic hardware (push-bars complying with BS EN 1125) must be fitted so that the door can be opened without prior knowledge or the use of a key.",
  },
  {
    id: 7,
    question:
      "What does progressive horizontal evacuation involve?",
    options: [
      "Evacuating all floors simultaneously via the stairs",
      "Moving occupants horizontally through fire doors into an adjacent compartment on the same floor",
      "Keeping all occupants in their rooms until the fire service arrives",
      "Evacuating the fire floor first, then adjacent floors in sequence",
    ],
    correctAnswer: 1,
    explanation:
      "Progressive horizontal evacuation involves moving occupants horizontally through fire doors into an adjacent fire compartment on the same floor. This is the preferred strategy for hospitals and care homes where many occupants may be non-ambulant or require significant assistance. The compartment walls and doors must provide a minimum of 60 minutes' fire resistance, and each compartment must have an independent escape route for further evacuation if necessary.",
  },
  {
    id: 8,
    question:
      "What document should be prepared for a person with a disability to ensure their safe evacuation?",
    options: [
      "A Fire Risk Assessment only",
      "A Personal Emergency Evacuation Plan (PEEP)",
      "A Method Statement",
      "A CDM Phase Plan",
    ],
    correctAnswer: 1,
    explanation:
      "A Personal Emergency Evacuation Plan (PEEP) is an individual plan tailored to a specific person's needs, taking into account their disability or condition and the specific building layout. Under the Equality Act 2010, employers and building managers must make reasonable adjustments to ensure the safe evacuation of persons with disabilities. The PEEP should identify the assistance required, the designated escape route, the buddy or support arrangements, and any equipment needed (such as an evacuation chair). Since the Grenfell Tower Inquiry recommendations, Generic Emergency Evacuation Plans (GEEPs) have also been introduced for residential buildings to cover visitors and temporary residents.",
  },
];

export default function FireSafetyModule4Section2() {
  useSEO({
    title: "Evacuation Procedures | Fire Safety Module 4.2",
    description:
      "Evacuation strategies, escape routes, fire drills, disability evacuation, and construction site evacuation procedures for the Fire Safety & Fire Marshal course.",
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
            <Link to="../fire-safety-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <DoorOpen className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-500 text-xs font-semibold">
              MODULE 4 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Evacuation Procedures
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Evacuation strategies, escape routes and travel distances, fire
            drills, disability evacuation planning, and construction site
            evacuation under UK fire safety legislation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Strategies:</strong> Simultaneous, phased, progressive
                horizontal, defend-in-place
              </li>
              <li>
                <strong>Travel distances:</strong> 18m (high risk, single
                direction) to 45m (low risk with sprinklers)
              </li>
              <li>
                <strong>Fire drills:</strong> Minimum annually, 6-monthly
                recommended
              </li>
              <li>
                <strong>Disability:</strong> PEEPs and GEEPs required under
                Equality Act 2010
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Escape routes:</strong> RRFSO Article 14 requirements
              </li>
              <li>
                <strong>Doors:</strong> Must open in direction of escape with
                panic hardware
              </li>
              <li>
                <strong>Assembly points:</strong> Pre-designated, clearly signed
              </li>
              <li>
                <strong>Construction:</strong> CDM 2015 temporary arrangements
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify and compare the four main evacuation strategies and when each is appropriate",
              "Explain maximum travel distances for different risk categories under Approved Document B",
              "Describe the requirements for escape routes, exits, and door hardware under RRFSO Article 14",
              "Plan and conduct fire drills in accordance with RRFSO Article 15 and government guidance",
              "Prepare Personal Emergency Evacuation Plans (PEEPs) and Generic Emergency Evacuation Plans (GEEPs)",
              "Explain the legal obligations for evacuating persons with disabilities under the Equality Act 2010",
              "Identify the specific challenges of construction site evacuation under CDM 2015",
              "Apply the lessons of the Grenfell Tower Inquiry to evacuation planning and the defend-in-place strategy",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Evacuation Strategies Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Evacuation Strategies Overview
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The choice of evacuation strategy is one of the most important
                decisions in fire safety planning. It determines how occupants
                will be moved to safety in the event of a fire and directly
                influences the design of the fire alarm system, the building
                layout, and the level of structural fire protection required.
                There are <strong>four principal evacuation strategies</strong>{" "}
                recognised in UK fire safety guidance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Four Main Strategies
                </p>
                <div className="space-y-4">
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Siren className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-semibold text-rose-400">
                        1. Simultaneous Evacuation
                      </p>
                    </div>
                    <p className="text-sm text-white/80">
                      Everyone evacuates the building at the same time on hearing
                      the alarm. The simplest and most common strategy.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-semibold text-rose-400">
                        2. Phased / Staged Evacuation
                      </p>
                    </div>
                    <p className="text-sm text-white/80">
                      Fire floor evacuates first, then adjacent floors, then the
                      rest. Used in tall buildings with addressable alarm systems.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <DoorOpen className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-semibold text-rose-400">
                        3. Progressive Horizontal Evacuation
                      </p>
                    </div>
                    <p className="text-sm text-white/80">
                      Occupants move horizontally through fire doors into an
                      adjacent compartment. Common in hospitals and care homes.
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-semibold text-rose-400">
                        4. Defend-in-Place
                      </p>
                    </div>
                    <p className="text-sm text-white/80">
                      Occupants remain in their compartment unless directly
                      affected by fire. Common in purpose-built residential blocks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Factors Determining Strategy Choice
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Building type and use</strong> &mdash;
                      offices, hospitals, residential, retail, industrial, or
                      mixed-use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Occupancy profile</strong> &mdash;
                      ambulant vs non-ambulant, sleeping vs awake, familiar vs
                      unfamiliar with the building
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Building height and number of floors</strong> &mdash;
                      tall buildings require different strategies to low-rise
                      premises
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire detection and alarm system</strong> &mdash;
                      simultaneous requires a simple system, phased requires an
                      addressable zoned system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Structural fire protection</strong> &mdash;
                      compartmentation standards, fire door ratings, and
                      protected stairways
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Simultaneous Evacuation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Simultaneous Evacuation
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Simultaneous evacuation is the{" "}
                <strong>most common evacuation strategy</strong> in the UK. On
                hearing the fire alarm, <strong>all occupants leave the
                building immediately</strong> via the nearest available escape
                route and proceed to the designated assembly point. It is simple
                to understand, simple to manage, and requires the least
                sophisticated fire alarm system.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Characteristics
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Alarm type:</strong> Single-stage
                      continuous sounder throughout the building &mdash; one alarm
                      signal means &ldquo;evacuate now&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Suitable for:</strong> Small to
                      medium premises &mdash; offices, shops, restaurants,
                      warehouses, workshops, schools
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Target time:</strong> The building
                      should be fully evacuated within{" "}
                      <strong className="text-white">2.5 to 3 minutes</strong> of the
                      alarm sounding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Simplicity:</strong> No need for
                      phased sounders, zone panels, or voice alarm systems &mdash;
                      a conventional fire alarm system is sufficient
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Limitation:</strong> Not suitable
                      for very large or tall buildings where stairways would
                      become overcrowded if all floors evacuated simultaneously
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Fire Marshal Role:</strong>{" "}
                  During a simultaneous evacuation, fire marshals on each floor
                  or area carry out a sweep of their zone to confirm that all
                  occupants have left, check that fire doors are closed, and
                  report to the assembly point. They do not investigate the fire
                  &mdash; their role is to facilitate a swift and orderly
                  evacuation and account for all persons in their area.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Phased / Staged Evacuation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Phased / Staged Evacuation
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Phased evacuation (also known as staged evacuation) is used in{" "}
                <strong>taller buildings</strong> where simultaneous evacuation
                would overwhelm the stairways. Instead of evacuating the entire
                building at once, the <strong>fire floor is evacuated first</strong>,
                followed by adjacent floors, and then the remainder of the
                building in a controlled sequence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Requirements for Phased Evacuation
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Addressable fire alarm system:</strong> The
                      system must be able to identify the zone or floor of origin
                      and control alarm signals independently on different floors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Two-stage alarm:</strong> The first
                      stage is an <strong className="text-white">alert signal</strong> (intermittent
                      tone or voice message) on the fire floor and the floor
                      above, telling occupants to prepare to leave. The second
                      stage is the <strong className="text-white">evacuate signal</strong> (continuous
                      tone or voice command) instructing those floors to
                      evacuate via the stairs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Voice alarm recommended:</strong> Voice
                      alarm systems (BS 5839 Part 8) are strongly recommended
                      because they can deliver specific instructions to each zone,
                      reducing confusion and improving response times
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Compartmentation:</strong> A minimum
                      of <strong className="text-white">60 minutes&rsquo; fire resistance</strong> is
                      required for the floor structures and compartment walls to
                      allow occupants on non-fire floors to remain safely in place
                      while the fire floor evacuates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Protected stairways:</strong> Stairways
                      must be enclosed in fire-resisting construction and kept
                      clear of smoke by appropriate ventilation or smoke control
                      measures
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Typical Phased Evacuation Sequence
                </p>
                <div className="space-y-2">
                  {[
                    { phase: "Phase 1", desc: "Fire floor &mdash; immediate evacuation on alert signal" },
                    { phase: "Phase 2", desc: "Floor immediately above the fire floor" },
                    { phase: "Phase 3", desc: "Floor immediately below the fire floor" },
                    { phase: "Phase 4", desc: "Remaining floors above, working upward" },
                    { phase: "Phase 5", desc: "Remaining floors below, working downward" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded flex-shrink-0">
                        {item.phase}
                      </span>
                      <span
                        className="text-sm text-white/80 pt-0.5"
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-500">Critical Point:</strong>{" "}
                  If the fire is not controlled or the compartmentation is
                  breached, the phased evacuation must escalate to a full
                  simultaneous evacuation. The fire alarm system must have the
                  capability to switch from phased to simultaneous mode, and
                  all fire marshals and management must be trained in the
                  escalation procedure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Progressive Horizontal & Defend-in-Place */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Progressive Horizontal &amp; Defend-in-Place
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                These two strategies are used in premises where{" "}
                <strong>vertical evacuation via stairs is difficult or
                impossible</strong> for a significant proportion of occupants, or
                where the building design relies on robust compartmentation to
                protect occupants in place.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Progressive Horizontal Evacuation
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">How it works:</strong> Occupants
                      are moved <strong className="text-white">horizontally through fire
                      doors</strong> into an adjacent fire compartment on the{" "}
                      <strong className="text-white">same floor</strong>, away from the
                      fire. They do not use stairs unless absolutely necessary.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Common in:</strong> Hospitals,
                      care homes, nursing homes, and premises with non-ambulant
                      occupants who cannot use stairs independently
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Compartmentation:</strong> Each
                      compartment must provide a minimum of{" "}
                      <strong className="text-white">60 minutes&rsquo; fire
                      resistance</strong> and must have its own independent escape
                      route for further evacuation if the fire spreads
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Staff training:</strong> Staff
                      must be trained to move patients and residents quickly and
                      safely, including the use of evacuation sheets, ski pads,
                      and other transfer aids
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Vertical evacuation as last resort:</strong> Full
                      vertical evacuation is only initiated if the fire is not
                      contained and the adjacent compartment is also compromised
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Defend-in-Place (Stay Put)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">How it works:</strong> Occupants{" "}
                      <strong className="text-white">remain in their own
                      compartment</strong> (flat, room, or dwelling) unless the fire
                      directly affects their compartment or they are instructed
                      to leave by the fire service
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Common in:</strong> Purpose-built
                      blocks of flats with robust compartmentation between
                      individual dwellings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Relies on:</strong> Effective
                      compartmentation (walls, floors, fire doors, and service
                      penetration seals) containing the fire to the flat of
                      origin while the fire service extinguishes it
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Fire alarm:</strong> In many
                      stay-put buildings, the fire alarm only sounds in the
                      common areas and the flat of origin &mdash; there is no
                      building-wide alarm
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Post-Grenfell Review
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The Grenfell Tower fire (14 June 2017) exposed critical
                  failures in the defend-in-place strategy when compartmentation
                  is compromised. The fire spread externally via combustible
                  cladding, bypassing the compartmentation that the stay-put
                  strategy relied upon. The Grenfell Tower Inquiry recommended
                  that all high-rise residential buildings must have a clear{" "}
                  <strong className="text-white">trigger point for switching from
                  stay-put to full evacuation</strong>, an effective{" "}
                  <strong className="text-white">evacuation alert system</strong> to
                  communicate the change of strategy to all residents, and a{" "}
                  <strong className="text-white">building evacuation plan</strong> that
                  is regularly reviewed and tested. The{" "}
                  <strong className="text-white">Fire Safety Act 2021</strong> and the{" "}
                  <strong className="text-white">Building Safety Act 2022</strong>{" "}
                  implemented many of these recommendations into law.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Escape Routes & Exits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Escape Routes &amp; Exits
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>RRFSO Article 14</strong> requires the responsible person
                to ensure that routes to emergency exits and the exits themselves
                are kept clear at all times. Escape routes must be{" "}
                <strong>adequate for the number of persons</strong> likely to
                use them, lead to a <strong>place of safety</strong>, and be{" "}
                <strong>available for use at all material times</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Maximum Travel Distances (Approved Document B)
                </p>
                <div className="overflow-x-auto -mx-2 px-2">
                  <div className="space-y-2 min-w-[280px]">
                    {[
                      { risk: "High risk &mdash; single direction", dist: "18 m", sprinkler: "27 m" },
                      { risk: "High risk &mdash; alternative routes", dist: "25 m", sprinkler: "32 m" },
                      { risk: "Normal risk &mdash; single direction", dist: "25 m", sprinkler: "32 m" },
                      { risk: "Normal risk &mdash; alternative routes", dist: "35 m", sprinkler: "45 m" },
                      { risk: "Low risk &mdash; single direction", dist: "32 m", sprinkler: "40 m" },
                      { risk: "Low risk &mdash; alternative routes", dist: "45 m", sprinkler: "60 m*" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-3 gap-2 text-sm border-b border-white/5 pb-2 last:border-0"
                      >
                        <span
                          className="text-white/80 col-span-1"
                          dangerouslySetInnerHTML={{ __html: row.risk }}
                        />
                        <span className="text-white font-medium text-center">
                          {row.dist}
                        </span>
                        <span className="text-white/60 text-center">
                          {row.sprinkler} (sprinklers)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-3">
                  * Some guidance allows extended distances with sprinklers and
                  alternative routes in low-risk areas. Always refer to the
                  specific approved document and fire risk assessment.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Escape Route Width Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Minimum 750 mm:</strong> For
                      routes serving very small numbers of persons (fewer than 60
                      in certain circumstances)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Minimum 850 mm:</strong> Standard
                      baseline for most escape routes serving up to approximately
                      220 persons
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Minimum 1050 mm:</strong> For
                      routes serving more than 220 persons
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Width calculation:</strong> The
                      total escape width must be calculated based on the maximum
                      number of occupants, and the widest single exit must be
                      discounted (to account for one exit being blocked by fire)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Direction of Opening &amp; Door Hardware
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Direction:</strong> Doors on escape
                      routes must open <strong className="text-white">in the direction
                      of escape</strong> (outward towards the final exit). This
                      prevents a crowd pressing against a door from being unable
                      to open it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Panic hardware:</strong> Push-bars
                      or touch-bars complying with{" "}
                      <strong className="text-white">BS EN 1125</strong> (panic exit
                      devices) must be fitted to doors on escape routes in
                      premises open to the public. BS EN 179 covers emergency
                      exit devices for premises where occupants are familiar with
                      the building.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">No keys or special knowledge:</strong> Escape
                      doors must be openable without a key, without special
                      knowledge, and with a single action (one hand, one
                      movement)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Electrically locked doors:</strong> Must
                      release automatically on activation of the fire alarm{" "}
                      <strong className="text-white">and</strong> on failure of the
                      power supply (fail-safe / fail-unlocked)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Fire Drills */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Fire Drills
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>RRFSO Article 15</strong> requires the responsible person
                to establish and, where necessary, give effect to appropriate
                procedures, including safety drills, to be followed in the event
                of serious and imminent danger. Fire drills test the
                effectiveness of the evacuation plan and identify any weaknesses
                that need to be addressed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Fire Drill Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Frequency:</strong> Minimum{" "}
                      <strong className="text-white">annually</strong>. Government
                      guidance recommends{" "}
                      <strong className="text-white">6-monthly</strong> drills as best
                      practice, particularly for higher-risk premises
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Shift coverage:</strong> In
                      premises with shift patterns, drills must be scheduled so
                      that all shifts are covered over the course of a year
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">New starters:</strong> Fire safety
                      induction must be given on the first day of employment, and
                      new starters should participate in the next scheduled fire
                      drill
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Announced vs Unannounced Drills
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-semibold text-rose-400">
                        Announced
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Occupants know a drill will happen (but not the exact time)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Useful for first drills or after significant changes to layout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Reduces anxiety in premises with vulnerable occupants</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-rose-400" />
                      <p className="text-sm font-semibold text-rose-400">
                        Unannounced
                      </p>
                    </div>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>No advance warning &mdash; tests the genuine response</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Reveals actual behaviour patterns and weaknesses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                        <span>Recommended as the standard approach once initial drills are complete</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Record Keeping &amp; Debrief
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Date and time</strong> of the drill
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Total evacuation time</strong> &mdash;
                      from alarm activation to confirmation that all areas are
                      clear
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Number of occupants</strong> evacuated
                      and accounted for
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Problems identified</strong> &mdash;
                      blocked exits, poor alarm audibility, persons unaccounted
                      for, confusion about routes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Corrective actions</strong> taken or
                      planned, with responsibilities and target dates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Debrief:</strong> A post-drill
                      meeting with fire marshals and management to review
                      performance, share observations, and agree improvements
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Evacuation of Persons with Disabilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Evacuation of Persons with Disabilities
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Equality Act 2010</strong> requires employers and
                service providers to make reasonable adjustments to ensure that
                persons with disabilities are not placed at a substantial
                disadvantage. In the context of fire safety, this means that the
                evacuation plan must account for the needs of every individual
                who may have difficulty evacuating without assistance.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Personal Emergency Evacuation Plans (PEEPs)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">What is a PEEP?</strong> An
                      individual plan tailored to a specific person&rsquo;s needs,
                      taking into account their disability or condition and the
                      specific building layout
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Contents:</strong> The designated
                      escape route, the assistance required (physical support,
                      wheelchair transfer, guidance), the buddy or support
                      arrangements, any equipment needed (evacuation chair, ski
                      pad), and the refuge point to be used
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Review:</strong> PEEPs must be
                      reviewed regularly, whenever the person&rsquo;s condition
                      changes, or whenever the building layout or use changes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Confidentiality:</strong> The PEEP
                      should be shared only with those who need to know &mdash;
                      the individual, their buddy, and the fire safety manager
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Generic Emergency Evacuation Plans (GEEPs)
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Post-Grenfell requirement:</strong> GEEPs
                      were recommended by the Grenfell Tower Inquiry for
                      residential buildings where individual PEEPs may not be
                      practical for every resident
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Purpose:</strong> A general plan
                      that covers the evacuation needs of visitors, temporary
                      residents, or any person whose individual needs are not
                      known in advance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Approach:</strong> Identifies
                      available refuges, evacuation equipment locations, and the
                      general procedures for assisting a person with unknown
                      needs
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Refuges, Equipment &amp; Communication
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Refuges:</strong> A designated
                      area within a protected stairway or a fire-protected lobby
                      where a person can wait safely for assistance. Refuges must
                      have a communication system (typically an intercom or
                      two-way radio) linking to the main fire control point
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Evacuation chairs:</strong> Lightweight
                      chairs designed to carry a person down stairs. Must be
                      stored in accessible locations and staff must be trained in
                      their use
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Buddy systems:</strong> A designated
                      colleague is assigned to assist a specific person during
                      evacuation. At least two buddies should be identified to
                      cover absence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Visual and vibrating alarms:</strong> For
                      persons who are deaf or hard of hearing, visual alarm
                      devices (flashing beacons) and vibrating pagers or pillow
                      pads must be provided as part of the fire alarm system
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Accessibility className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Important
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Failure to provide a PEEP for an employee or a GEEP for a
                  residential building may constitute a breach of both the{" "}
                  <strong className="text-white">Equality Act 2010</strong> and the{" "}
                  <strong className="text-white">RRFSO</strong>. The responsible
                  person must proactively identify persons who may need
                  assistance and engage with them to develop an appropriate plan
                  &mdash; it is not sufficient to wait for the individual to
                  request one.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Construction Site Evacuation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Construction Site Evacuation
          </h2>
          <div className="border-l-2 border-rose-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites present unique evacuation challenges. The
                building is incomplete, escape routes change as the structure
                develops, and multiple contractors may be working on site
                simultaneously. The{" "}
                <strong>Construction (Design and Management) Regulations
                2015 (CDM 2015)</strong> require the principal contractor to
                plan, manage, and coordinate fire safety arrangements for the
                entire site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Key Challenges
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Multi-contractor sites:</strong> Multiple
                      employers on site means multiple workforces who must all
                      understand and follow the same evacuation plan. The
                      principal contractor is responsible for coordination
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Temporary alarm systems:</strong> Purpose-designed
                      temporary fire alarm systems (air horns, electric sirens,
                      or temporary sounder circuits) must be installed. The
                      system must be audible in all areas where work is being
                      carried out, including noisy environments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Changing escape routes:</strong> As
                      the building progresses, stairways may be incomplete,
                      corridors may be blocked, and temporary scaffolding or
                      hoarding may obstruct routes. Escape routes must be
                      reviewed and updated regularly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Working at height:</strong> Workers
                      on upper floors, scaffolding, or in excavations require
                      specific evacuation procedures, including designated escape
                      ladders and safe access points
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Hot works:</strong> Activities
                      involving naked flames, welding, cutting, or grinding
                      create additional fire risk and require specific fire
                      watch procedures and dedicated extinguishers
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  CDM 2015 Requirements
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Construction phase plan:</strong> Must
                      include a site-specific fire safety plan covering alarm
                      arrangements, escape routes, assembly points, fire
                      extinguisher locations, and responsibilities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Site induction:</strong> Every
                      person entering the site must receive a fire safety
                      induction covering the alarm signal, escape routes,
                      assembly point, and what to do on discovering a fire
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Roll call:</strong> A signing-in
                      and signing-out system must be maintained so that all
                      persons on site can be accounted for at the assembly point
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rose-400" />
                    <span>
                      <strong className="text-white">Regular review:</strong> The fire
                      safety plan must be reviewed and updated as the site
                      develops and the building layout changes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HardHat className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Practical Tip
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  As an electrician on a construction site, you must familiarise
                  yourself with the site fire safety plan on your first day and
                  after any significant changes. If you are installing the
                  temporary fire alarm system or the permanent system during
                  second fix, ensure that the temporary system remains fully
                  operational until the permanent system is commissioned and
                  handed over. Never disconnect or disable any part of the
                  temporary alarm without the principal contractor&rsquo;s
                  written authorisation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram: Evacuation Strategy Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">&mdash;</span>
            Evacuation Strategy Selection
          </h2>
          <div className="bg-white/5 border border-rose-500/30 rounded-xl p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[320px] space-y-4">
              {/* Header */}
              <div className="flex justify-center">
                <div className="bg-rose-500/20 border-2 border-rose-500/50 rounded-xl px-5 py-3 text-center">
                  <p className="text-sm font-semibold text-rose-400">
                    EVACUATION STRATEGY
                  </p>
                  <p className="text-white text-sm font-medium mt-1">
                    Selection Decision Flowchart
                  </p>
                </div>
              </div>

              {/* Question 1 */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-rose-500/40" />
                  <span className="text-xs font-bold text-rose-400 mb-1">
                    BUILDING TYPE
                  </span>
                  <div className="w-0.5 h-4 bg-rose-500/40" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-rose-400 mb-1">
                    SMALL / MEDIUM PREMISES
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm">
                    Single or low-rise buildings
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Offices, shops, restaurants
                  </p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-rose-400 mb-1">
                    TALL / LARGE / COMPLEX
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm">
                    Multi-storey or specialist use
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Towers, hospitals, flats
                  </p>
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-rose-500/40" />
                  <span className="text-xs font-bold text-rose-400 mb-1">
                    OCCUPANT MOBILITY
                  </span>
                  <div className="w-0.5 h-4 bg-rose-500/40" />
                </div>
              </div>

              {/* Strategies */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-rose-400 mb-1">
                    SIMULTANEOUS
                  </p>
                  <p className="text-white text-lg sm:text-xl font-bold">
                    <Siren className="h-5 w-5 mx-auto text-rose-400" />
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm mt-1">
                    All out at once
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Small/medium, ambulant occupants
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-rose-400 mb-1">
                    PHASED
                  </p>
                  <p className="text-white text-lg sm:text-xl font-bold">
                    <Building className="h-5 w-5 mx-auto text-rose-400" />
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm mt-1">
                    Fire floor first
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Tall buildings, addressable alarm
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-rose-400 mb-1">
                    PROGRESSIVE HORIZONTAL
                  </p>
                  <p className="text-white text-lg sm:text-xl font-bold">
                    <DoorOpen className="h-5 w-5 mx-auto text-rose-400" />
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm mt-1">
                    Move to next compartment
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Hospitals, care homes
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-rose-400 mb-1">
                    DEFEND-IN-PLACE
                  </p>
                  <p className="text-white text-lg sm:text-xl font-bold">
                    <Shield className="h-5 w-5 mx-auto text-rose-400" />
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm mt-1">
                    Stay in compartment
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    Purpose-built flats
                  </p>
                </div>
              </div>

              {/* Key requirements */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-rose-500/40" />
                  <span className="text-xs font-bold text-rose-400 mb-1">
                    KEY REQUIREMENTS
                  </span>
                  <div className="w-0.5 h-4 bg-rose-500/40" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-rose-400 mb-1">
                    ALARM SYSTEM
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm">
                    Conventional (simultaneous) or addressable with zoned
                    sounders &amp; voice alarm (phased)
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                  <p className="text-xs font-bold text-rose-400 mb-1">
                    COMPARTMENTATION
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm">
                    Minimum 60-minute fire resistance for phased, progressive
                    horizontal, and defend-in-place strategies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
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
            <Link to="../fire-safety-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: The Fire Marshal Role
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../fire-safety-module-4-section-3">
              Next: Assembly Points &amp; Roll Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
