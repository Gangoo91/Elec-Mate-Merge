import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Emergency Procedures - HNC Module 1 Section 3.5";
const DESCRIPTION = "Master emergency planning, response procedures, evacuation, first aid, fire safety, and building services emergencies in commercial and industrial environments.";

const quickCheckQuestions = [
  {
    id: "emergency-planning",
    question: "What is the primary purpose of emergency planning?",
    options: ["To satisfy insurance requirements", "To minimise harm and enable rapid, effective response", "To create paperwork", "To delegate responsibility"],
    correctIndex: 1,
    explanation: "Emergency planning aims to minimise harm to people, property and the environment by ensuring everyone knows what to do before, during and after emergencies through planned, practised procedures."
  },
  {
    id: "first-aider-ratio",
    question: "What is the minimum first aid provision for a low-risk workplace with 25-50 employees?",
    options: ["Nothing required", "First aid box only", "Appointed person plus first aid box", "First aider at work plus first aid box"],
    correctIndex: 2,
    explanation: "For low-risk workplaces with 25-50 employees, minimum provision is an appointed person (to take charge of first aid arrangements) plus an adequately stocked first aid box. Higher risk or larger numbers require qualified first aiders."
  },
  {
    id: "fire-extinguisher",
    question: "What colour band identifies a CO2 fire extinguisher?",
    options: ["Red", "Blue", "Cream", "Black"],
    correctIndex: 3,
    explanation: "CO2 extinguishers have a black band. Red = water, cream = foam, blue = dry powder. CO2 is suitable for electrical fires and leaves no residue, making it ideal for building services switchrooms."
  },
  {
    id: "electrical-rescue",
    question: "What is the first action when finding someone receiving an electric shock from a low voltage source?",
    options: ["Pull them away immediately", "Isolate the supply if safe to do so", "Apply first aid", "Wait for emergency services"],
    correctIndex: 1,
    explanation: "The first priority is to isolate the supply if it can be done quickly and safely. Never touch the casualty while they're still in contact with the electrical source. If isolation isn't possible, use non-conductive material to separate them."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Under which regulation must employers assess fire risks and provide appropriate fire safety measures?",
    options: [
      "Health and Safety at Work Act 1974",
      "Regulatory Reform (Fire Safety) Order 2005",
      "Management of Health and Safety at Work Regulations",
      "Construction (Design and Management) Regulations"
    ],
    correctAnswer: 1,
    explanation: "The Regulatory Reform (Fire Safety) Order 2005 requires the 'responsible person' (usually the employer) to carry out fire risk assessments and implement appropriate fire safety measures."
  },
  {
    id: 2,
    question: "How often should fire evacuation drills be conducted in most workplaces?",
    options: [
      "Once a year",
      "Every 6 months minimum",
      "Monthly",
      "Only when new staff join"
    ],
    correctAnswer: 1,
    explanation: "Fire drills should be conducted at least every 6 months, or more frequently in high-risk premises or where staff turnover is high. Records must be kept of all drills."
  },
  {
    id: 3,
    question: "What is the role of a 'Fire Warden' or 'Fire Marshal'?",
    options: [
      "To fight fires",
      "To assist with evacuation and ensure areas are clear",
      "To call the fire brigade only",
      "To maintain fire extinguishers"
    ],
    correctAnswer: 1,
    explanation: "Fire wardens/marshals assist with evacuation by directing people to exits, checking that their designated areas are clear, reporting to the assembly point, and liaising with emergency services."
  },
  {
    id: 4,
    question: "What first aid qualification is required to be a 'First Aider at Work'?",
    options: [
      "No formal qualification needed",
      "Completion of HSE approved First Aid at Work course",
      "Medical degree",
      "One-day emergency aid certificate only"
    ],
    correctAnswer: 1,
    explanation: "A First Aider at Work (FAW) must hold a valid certificate from an HSE approved First Aid at Work training course (usually 3 days). This is different from an Emergency First Aider (1 day course)."
  },
  {
    id: 5,
    question: "What should be included in an emergency plan?",
    options: [
      "Fire procedures only",
      "All foreseeable emergencies, roles, actions, communications, and recovery",
      "Contact numbers only",
      "Insurance details"
    ],
    correctAnswer: 1,
    explanation: "Emergency plans should cover all foreseeable emergencies (fire, flood, gas leak, chemical spill, etc.), define roles and responsibilities, specify actions, establish communication methods, and include recovery procedures."
  },
  {
    id: 6,
    question: "When should you NOT attempt to use a fire extinguisher?",
    options: [
      "When the fire is small and contained",
      "When you have been trained in extinguisher use",
      "When the fire is too large or your escape route may be blocked",
      "When the extinguisher is within reach"
    ],
    correctAnswer: 2,
    explanation: "Never attempt to fight a fire if it's too large, spreading rapidly, produces toxic smoke, or if tackling it might block your escape route. Personal safety always comes first - evacuate if in doubt."
  },
  {
    id: 7,
    question: "What is the maximum travel distance to an exit in a normal-risk premises?",
    options: [
      "100m",
      "60m (or 30m if only one exit available)",
      "45m (or 25m if only one exit available)",
      "No limit specified"
    ],
    correctAnswer: 2,
    explanation: "In normal-risk premises, maximum travel distance is 45m where alternative exits exist, or 25m if there's only one direction of travel. High-risk areas have shorter maximum distances."
  },
  {
    id: 8,
    question: "What action should be taken if a refrigerant leak is detected in a plant room?",
    options: [
      "Continue working with windows open",
      "Evacuate, ventilate, and do not re-enter until safe",
      "Ignore if it's a small leak",
      "Repair immediately without breathing apparatus"
    ],
    correctAnswer: 1,
    explanation: "Refrigerant leaks can displace oxygen and may be toxic. Evacuate the area, increase ventilation from outside, do not re-enter until levels are confirmed safe, and only approach with appropriate RPE if essential."
  },
  {
    id: 9,
    question: "What is the purpose of an emergency assembly point?",
    options: [
      "To provide shelter during emergencies",
      "To account for all personnel and prevent re-entry",
      "To store emergency equipment",
      "To meet with visitors"
    ],
    correctAnswer: 1,
    explanation: "The assembly point enables roll call to account for all personnel, prevents uncontrolled re-entry, provides a location for communication, and allows emergency services to be informed of anyone missing."
  },
  {
    id: 10,
    question: "For an electrical burn, after ensuring safety, what is the first aid priority?",
    options: [
      "Apply burn cream immediately",
      "Cool the burn with cool running water for at least 20 minutes",
      "Cover with cotton wool",
      "Burst any blisters"
    ],
    correctAnswer: 1,
    explanation: "After ensuring the casualty is safe from electrical contact, cool burns with cool running water for at least 20 minutes (ideally within 3 hours). Do not apply creams or burst blisters. Cover loosely and seek medical attention."
  },
  {
    id: 11,
    question: "What information should be given when calling 999 for an electrical incident?",
    options: [
      "Name and company only",
      "Location, nature of incident, number of casualties, current condition, hazards present",
      "Time of incident only",
      "Insurance policy number"
    ],
    correctAnswer: 1,
    explanation: "Provide: exact location, nature of the incident (electrical), number and condition of casualties, whether power is isolated, any ongoing hazards, access arrangements, and have someone meet the ambulance."
  },
  {
    id: 12,
    question: "How should emergency procedures be communicated to temporary workers and contractors?",
    options: [
      "Not required for short visits",
      "During site induction before work begins",
      "Only if they ask",
      "By email after they leave"
    ],
    correctAnswer: 1,
    explanation: "All workers, including temporary workers and contractors, must receive emergency procedure information during induction before starting work. This includes alarm sounds, exits, assembly points, and any specific hazards."
  }
];

const faqs = [
  {
    question: "How many first aiders do we need on a construction site?",
    answer: "Construction sites are high-risk, so requirements are higher. Generally 1 first aider per 5-50 workers for high-risk sites. Consider shift patterns, site spread, and ensure cover during breaks and absences. The first aid needs assessment should consider specific hazards present."
  },
  {
    question: "Can we use water extinguishers on electrical fires?",
    answer: "No - water conducts electricity and is dangerous on electrical fires. Use CO2 (black band) for electrical fires. If the power is isolated and confirmed dead, other extinguisher types may then be appropriate for the burning material. CO2 is preferred in switchrooms."
  },
  {
    question: "What should we do if the fire alarm activates during work on a live system?",
    answer: "Stop work immediately if safe to do so. If you cannot safely make the area safe quickly, leave as the alarm requires - personal safety comes first. If you can safely isolate within seconds, do so. Report to the assembly point and inform the fire warden about any live work in progress."
  },
  {
    question: "How do we handle emergencies in confined spaces?",
    answer: "Never enter a confined space to rescue without proper equipment and training. Raise the alarm, attempt communication with the casualty, prepare rescue equipment for trained rescuers, and guide emergency services to the location. Untrained rescue attempts often result in multiple casualties."
  },
  {
    question: "What records need to be kept for emergency preparedness?",
    answer: "Keep records of: fire drills (date, time, evacuation time, issues identified), first aid training certificates and refresher dates, first aid incidents, equipment inspections (extinguishers, alarms, emergency lighting), emergency plan reviews, and any emergency incidents and lessons learned."
  },
  {
    question: "How often should emergency lighting be tested?",
    answer: "Under BS 5266: monthly function tests (brief operation to confirm lamps illuminate), quarterly 1-hour duration tests (or annually for 3-hour test), and annual full-rated duration test. All tests must be recorded. Replace batteries typically every 4 years."
  }
];

const HNCModule1Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Procedures
          </h1>
          <p className="text-white/80">
            Planning for and responding to emergencies in building services environments
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Planning:</strong> Identify emergencies, assign roles, practice response</li>
              <li className="pl-1"><strong>Fire:</strong> Raise alarm, evacuate, assemble, do not re-enter</li>
              <li className="pl-1"><strong>First aid:</strong> Appropriate provision based on risk assessment</li>
              <li className="pl-1"><strong>Electrical:</strong> Isolate, rescue safely, apply first aid</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Electrical shock:</strong> Isolation and safe rescue procedures</li>
              <li className="pl-1"><strong>Refrigerant leaks:</strong> Evacuation and ventilation</li>
              <li className="pl-1"><strong>Gas incidents:</strong> No ignition sources, evacuate, ventilate</li>
              <li className="pl-1"><strong>Water leaks:</strong> Isolation, electrical safety, flood response</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Develop emergency plans covering foreseeable incidents",
              "Implement effective fire safety and evacuation procedures",
              "Determine appropriate first aid provision for workplaces",
              "Apply first aid principles for electrical incidents",
              "Respond to building services specific emergencies",
              "Maintain emergency equipment and conduct drills"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Emergency Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Emergency Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective emergency planning ensures everyone knows what to do when things go wrong.
              The key is to identify potential emergencies, plan responses, train personnel, and
              practice regularly so that response becomes automatic.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Emergency plan elements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Foreseeable emergencies:</strong> Fire, flood, gas leak, chemical spill, structural failure, medical emergency</li>
                <li className="pl-1"><strong>Roles and responsibilities:</strong> Who does what - coordinators, wardens, first aiders</li>
                <li className="pl-1"><strong>Warning systems:</strong> How alarm is raised - sounders, voice alarm, PA</li>
                <li className="pl-1"><strong>Evacuation routes:</strong> Primary and alternative routes, assembly points</li>
                <li className="pl-1"><strong>Emergency contacts:</strong> Emergency services, key personnel, utilities</li>
                <li className="pl-1"><strong>Recovery:</strong> Re-entry criteria, incident investigation, continuity</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Emergencies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Emergency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Immediate Actions</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Hazards</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical shock</td>
                      <td className="border border-white/10 px-3 py-2">Isolate supply, safe rescue, call 999, first aid</td>
                      <td className="border border-white/10 px-3 py-2">Secondary contact, cardiac arrest</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Gas leak</td>
                      <td className="border border-white/10 px-3 py-2">No ignition sources, evacuate, ventilate, call National Grid</td>
                      <td className="border border-white/10 px-3 py-2">Explosion, asphyxiation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Refrigerant leak</td>
                      <td className="border border-white/10 px-3 py-2">Evacuate plant room, ventilate, do not re-enter</td>
                      <td className="border border-white/10 px-3 py-2">Oxygen displacement, toxicity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Major water leak</td>
                      <td className="border border-white/10 px-3 py-2">Isolate water, assess electrical risk, evacuate if needed</td>
                      <td className="border border-white/10 px-3 py-2">Electrical hazard, slip, structural</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lift entrapment</td>
                      <td className="border border-white/10 px-3 py-2">Reassure occupants, call lift engineer, do not attempt rescue</td>
                      <td className="border border-white/10 px-3 py-2">Falls, crushing, panic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practice makes perfect:</strong> Emergency procedures must be practised regularly
              through drills. An untested plan is unlikely to work when actually needed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fire Safety */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fire Safety and Evacuation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire remains one of the most significant workplace hazards. The Regulatory Reform (Fire Safety)
              Order 2005 requires employers to assess fire risks and implement appropriate measures including
              detection, warning, means of escape, and firefighting equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Response - RACE Protocol</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-red-400 mb-1">R - Rescue</p>
                  <p className="text-sm">Remove people from immediate danger (only if safe)</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-amber-400 mb-1">A - Alarm</p>
                  <p className="text-sm">Raise the alarm - break glass, shout "Fire!"</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-yellow-400 mb-1">C - Contain</p>
                  <p className="text-sm">Close doors to limit fire spread</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-green-400 mb-1">E - Evacuate/Extinguish</p>
                  <p className="text-sm">Leave via nearest exit / tackle if small and safe</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Extinguisher Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Colour Band</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Suitable For</th>
                      <th className="border border-white/10 px-3 py-2 text-left">NOT For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water</td>
                      <td className="border border-white/10 px-3 py-2 text-red-400">Red (all red)</td>
                      <td className="border border-white/10 px-3 py-2">Paper, wood, textiles (Class A)</td>
                      <td className="border border-white/10 px-3 py-2">Electrical, liquids, metals</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Foam (AFFF)</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-200">Cream</td>
                      <td className="border border-white/10 px-3 py-2">Liquids, solids (Class A, B)</td>
                      <td className="border border-white/10 px-3 py-2">Electrical, cooking fat</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dry Powder</td>
                      <td className="border border-white/10 px-3 py-2 text-blue-400">Blue</td>
                      <td className="border border-white/10 px-3 py-2">Multi-purpose (A, B, C, electrical)</td>
                      <td className="border border-white/10 px-3 py-2">Enclosed spaces (visibility)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CO2</td>
                      <td className="border border-white/10 px-3 py-2 text-gray-400">Black</td>
                      <td className="border border-white/10 px-3 py-2">Electrical, liquids (Class B)</td>
                      <td className="border border-white/10 px-3 py-2">Outdoor (wind dispersal)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wet Chemical</td>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400">Yellow</td>
                      <td className="border border-white/10 px-3 py-2">Cooking oils and fats (Class F)</td>
                      <td className="border border-white/10 px-3 py-2">Electrical</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Evacuation Essentials</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Leave immediately when alarm sounds</li>
                  <li className="pl-1">Use nearest available exit</li>
                  <li className="pl-1">Do not use lifts</li>
                  <li className="pl-1">Close doors behind you</li>
                  <li className="pl-1">Go to assembly point</li>
                  <li className="pl-1">Do not re-enter until authorised</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Warden Duties</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Guide people to exits</li>
                  <li className="pl-1">Check designated areas are clear</li>
                  <li className="pl-1">Assist those needing help</li>
                  <li className="pl-1">Report to assembly point coordinator</li>
                  <li className="pl-1">Provide information to fire brigade</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>For electrical work:</strong> CO2 extinguishers (black band) are preferred in
              switchrooms as they leave no residue. Ensure power is isolated before using water or foam.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 3: First Aid */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            First Aid Provision
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Health and Safety (First Aid) Regulations 1981 require employers to provide adequate
              first aid equipment, facilities and personnel. What's "adequate" depends on the nature of
              work, hazards present, number of employees, and access to emergency services.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">First Aid Provision Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Workplace Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Employees</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Provision</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low risk (office)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;25</td>
                      <td className="border border-white/10 px-3 py-2">First aid kit + appointed person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low risk (office)</td>
                      <td className="border border-white/10 px-3 py-2">25-50</td>
                      <td className="border border-white/10 px-3 py-2">First aid kit + EFAW or appointed person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Low risk (office)</td>
                      <td className="border border-white/10 px-3 py-2">50+</td>
                      <td className="border border-white/10 px-3 py-2">First aid kit + FAW (1 per 100)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Higher risk (construction)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;5</td>
                      <td className="border border-white/10 px-3 py-2">First aid kit + appointed person</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Higher risk (construction)</td>
                      <td className="border border-white/10 px-3 py-2">5-50</td>
                      <td className="border border-white/10 px-3 py-2">First aid kit + EFAW/FAW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Higher risk (construction)</td>
                      <td className="border border-white/10 px-3 py-2">50+</td>
                      <td className="border border-white/10 px-3 py-2">First aid kit + FAW (1 per 50)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">EFAW = Emergency First Aid at Work (1 day). FAW = First Aid at Work (3 days).</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">First aid kit contents (minimum):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Guidance leaflet on first aid</li>
                <li className="pl-1">Individually wrapped sterile plasters (assorted sizes)</li>
                <li className="pl-1">Sterile eye pads</li>
                <li className="pl-1">Triangular bandages</li>
                <li className="pl-1">Safety pins</li>
                <li className="pl-1">Sterile wound dressings (medium and large)</li>
                <li className="pl-1">Disposable gloves</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Consider:</strong> For electrical work, consider additional burn dressings.
              AED (defibrillator) access is recommended - cardiac arrest is a risk with electrical shock.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Electrical Emergency Response */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Electrical Emergency Response
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical emergencies require specific knowledge to respond safely. The rescuer must
              protect themselves from becoming a second casualty while providing rapid assistance
              to the victim.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electric Shock Response Sequence</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">Ensure safety</td>
                      <td className="border border-white/10 px-3 py-2">Do not touch casualty if still in contact with live source</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">Isolate supply</td>
                      <td className="border border-white/10 px-3 py-2">Switch off at source if quick and safe, or disconnect plug</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">If cannot isolate</td>
                      <td className="border border-white/10 px-3 py-2">Use non-conductive material to separate casualty from source</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">Call 999</td>
                      <td className="border border-white/10 px-3 py-2">State electrical incident - location, condition, whether isolated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">Assess casualty</td>
                      <td className="border border-white/10 px-3 py-2">Check response, breathing, circulation (DR ABC)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">CPR if needed</td>
                      <td className="border border-white/10 px-3 py-2">30 compressions : 2 breaths. Use AED if available</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">Treat burns</td>
                      <td className="border border-white/10 px-3 py-2">Cool with water 20+ mins. Cover loosely. Do not burst blisters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">High Voltage Warning</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">High voltage (above 1000V AC) can arc significant distances</li>
                <li className="pl-1">Do not approach within the safe distance until confirmed isolated</li>
                <li className="pl-1">Call emergency services and the network operator immediately</li>
                <li className="pl-1">Keep others away from the area</li>
                <li className="pl-1">Never attempt rescue from overhead lines or substations</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signs of Electrical Injury</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Entry and exit burns</li>
                  <li className="pl-1">Unconsciousness</li>
                  <li className="pl-1">Muscle spasm / rigidity</li>
                  <li className="pl-1">Cardiac arrhythmia or arrest</li>
                  <li className="pl-1">Breathing difficulties</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AED (Defibrillator) Use</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Turn on and follow voice prompts</li>
                  <li className="pl-1">Attach pads as shown</li>
                  <li className="pl-1">Ensure no one touching casualty</li>
                  <li className="pl-1">Let AED analyse and shock if advised</li>
                  <li className="pl-1">Continue CPR when prompted</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Remember:</strong> All casualties of electric shock should be assessed at hospital,
              even if they appear unharmed. Internal injuries and cardiac effects may not be immediately apparent.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Application</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Responding to Electrical Contact</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A colleague is found unconscious, still holding a faulty 230V portable tool.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Response Sequence:</strong></p>
                <p className="ml-4 text-red-400">1. STOP - Do not touch them directly</p>
                <p className="ml-4">2. Shout for help - alert others to call 999</p>
                <p className="ml-4">3. Isolate supply - unplug at wall socket or switch off DB</p>
                <p className="ml-4">4. If cannot isolate - use non-conductive item (dry wood, plastic) to push tool away</p>
                <p className="ml-4">5. Once safe - check response: "Are you OK?" + tap shoulders</p>
                <p className="ml-4">6. If no response - open airway, check breathing</p>
                <p className="ml-4">7. If not breathing - start CPR, send for AED</p>
                <p className="ml-4">8. Continue until paramedics arrive or casualty recovers</p>
                <p className="mt-2 text-green-400">Key: Your safety first - you can't help if you become a casualty too</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Fire During Electrical Work</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Fire breaks out in switchroom while working on distribution board.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p><strong>Response:</strong></p>
                <p className="ml-4">1. Stop work immediately if safe to do so</p>
                <p className="ml-4">2. If small fire and CO2 extinguisher available - consider tackling</p>
                <p className="ml-4">3. If fire spreading or uncertain - leave immediately</p>
                <p className="ml-4">4. Close door behind you to contain fire</p>
                <p className="ml-4">5. Raise alarm - operate nearest call point</p>
                <p className="ml-4">6. Evacuate via nearest safe route</p>
                <p className="ml-4">7. Report to assembly point</p>
                <p className="ml-4">8. Inform fire warden: "Fire in first floor switchroom, electrical fire"</p>
                <p className="mt-2"><strong>Do NOT:</strong> Use water or foam extinguisher on electrical fire</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Key Points Summary</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Preparedness</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Plan for foreseeable emergencies before they happen</li>
                <li className="pl-1">Assign and train personnel for emergency roles</li>
                <li className="pl-1">Practice through regular drills - at least 6-monthly</li>
                <li className="pl-1">Maintain equipment - extinguishers, alarms, emergency lighting</li>
                <li className="pl-1">Review and update plans after drills and incidents</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Safety Essentials</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">RACE: Rescue, Alarm, Contain, Evacuate/Extinguish</li>
                <li className="pl-1">CO2 (black band) for electrical fires</li>
                <li className="pl-1">Never tackle fire if unsafe or escape route threatened</li>
                <li className="pl-1">Do not re-enter until authorised</li>
                <li className="pl-1">Account for all personnel at assembly point</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Electrical Emergency Critical Points</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Never touch:</strong> Someone in contact with live electricity</li>
                <li className="pl-1"><strong>Isolate first:</strong> Then rescue</li>
                <li className="pl-1"><strong>All casualties:</strong> Should be assessed at hospital</li>
                <li className="pl-1"><strong>AED:</strong> Use if available for cardiac arrest</li>
                <li className="pl-1"><strong>High voltage:</strong> Keep clear, call emergency services</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Fire Extinguishers</p>
                <ul className="space-y-0.5">
                  <li>Water (Red) - Paper, wood, textiles</li>
                  <li>Foam (Cream) - Liquids, solids</li>
                  <li>CO2 (Black) - Electrical, liquids</li>
                  <li>Powder (Blue) - Multi-purpose</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Emergency Numbers</p>
                <ul className="space-y-0.5">
                  <li>Emergency Services: 999 / 112</li>
                  <li>National Gas Emergency: 0800 111 999</li>
                  <li>Electricity Emergency: 105</li>
                  <li>NHS Non-emergency: 111</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Audits and Inspections
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module1-section3-6">
              Next: Contractor Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule1Section3_5;
