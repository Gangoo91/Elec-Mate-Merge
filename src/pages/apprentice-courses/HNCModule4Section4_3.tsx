import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Emergency Lighting Design - HNC Module 4 Section 4.3";
const DESCRIPTION = "Master emergency lighting design to BS 5266: escape route lighting, open area anti-panic lighting, high-risk task areas, maintained and non-maintained systems, and duration requirements.";

const quickCheckQuestions = [
  {
    id: "escape-route-lux",
    question: "What is the minimum illuminance required on the centre line of an escape route to BS 5266?",
    options: ["0.2 lux", "0.5 lux", "1 lux", "2 lux"],
    correctIndex: 2,
    explanation: "BS 5266 requires a minimum of 1 lux on the centre line of escape routes up to 2m wide. For wider routes, 50% of the route width must be illuminated to at least 1 lux."
  },
  {
    id: "standard-duration",
    question: "What is the standard minimum duration for emergency lighting in most UK buildings?",
    options: ["1 hour", "2 hours", "3 hours", "4 hours"],
    correctIndex: 2,
    explanation: "3 hours is the standard minimum emergency lighting duration for most buildings in the UK. This allows time for evacuation and search by emergency services. Shorter durations (1 hour) may be acceptable where immediate evacuation is possible."
  },
  {
    id: "maintained-definition",
    question: "What does 'maintained' emergency lighting mean?",
    options: ["Luminaires require maintenance annually", "Luminaires operate continuously on mains and battery", "Luminaires have extended battery life", "Luminaires include self-test function"],
    correctIndex: 1,
    explanation: "Maintained emergency lighting operates continuously - both on mains supply during normal conditions and on battery during power failure. This contrasts with non-maintained which only operates during mains failure."
  },
  {
    id: "open-area-illuminance",
    question: "What minimum illuminance is required for open area (anti-panic) emergency lighting?",
    options: ["0.2 lux", "0.5 lux", "1 lux", "5 lux"],
    correctIndex: 1,
    explanation: "Open area (anti-panic) lighting requires 0.5 lux minimum at floor level. This lower level is acceptable as people are not following defined routes, but need sufficient light to orientate themselves and move safely."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary UK standard for emergency lighting design?",
    options: [
      "BS 7671",
      "BS 5266",
      "BS EN 60598",
      "BS EN 1838"
    ],
    correctAnswer: 1,
    explanation: "BS 5266 is the primary UK standard for emergency lighting. Part 1 covers code of practice, and it references BS EN 1838 for photometric requirements. BS 7671 covers electrical installation, not emergency lighting design specifically."
  },
  {
    id: 2,
    question: "What is the maximum spacing between emergency luminaires on an escape route (2m wide)?",
    options: ["20m", "30m", "40m", "Depends on luminaire output"],
    correctAnswer: 3,
    explanation: "Spacing depends on the luminaire's emergency output and distribution. Manufacturers provide spacing tables for their products. Maximum spacing is determined by maintaining 1 lux minimum on the centre line throughout the route."
  },
  {
    id: 3,
    question: "Which locations require emergency lighting to BS 5266?",
    options: [
      "Only stairways and corridors",
      "Only areas with no natural light",
      "All escape routes and specified safety features",
      "Only exit points"
    ],
    correctAnswer: 2,
    explanation: "Emergency lighting is required on all escape routes, open areas over 60m², at exit signs, fire fighting equipment, call points, lift cars, disabled refuges, first aid points, and other specified locations."
  },
  {
    id: 4,
    question: "What is the minimum requirement for emergency lighting uniformity on escape routes?",
    options: [
      "Uniformity ratio 40:1 maximum",
      "No uniformity requirement",
      "Uniformity ratio 10:1 maximum",
      "Uniformity ratio 3:1 maximum"
    ],
    correctAnswer: 0,
    explanation: "BS EN 1838 requires maximum uniformity ratio of 40:1 (Emax/Emin) on escape routes. This ensures no dark spots that could cause trips or falls, while allowing practical luminaire spacing."
  },
  {
    id: 5,
    question: "When is maintained emergency lighting required?",
    options: [
      "In all commercial buildings",
      "Where normal lighting may be dimmed or switched off",
      "Only in healthcare buildings",
      "Where battery duration exceeds 3 hours"
    ],
    correctAnswer: 1,
    explanation: "Maintained emergency lighting is required where the normal lighting may be dimmed or extinguished while the area is occupied, such as cinemas, theatres, nightclubs, and some restaurants or entertainment venues."
  },
  {
    id: 6,
    question: "What is high-risk task area emergency lighting designed for?",
    options: [
      "Areas with high fire risk",
      "Areas where sudden loss of light creates danger",
      "Plant rooms only",
      "Areas requiring 24/7 operation"
    ],
    correctAnswer: 1,
    explanation: "High-risk task area lighting provides illumination where sudden darkness would create immediate danger, such as operating machinery, working at height, or handling hazardous materials. It requires higher illuminance (10% of normal, minimum 15 lux)."
  },
  {
    id: 7,
    question: "What minimum illuminance is required for high-risk task area emergency lighting?",
    options: [
      "1 lux",
      "5 lux",
      "10% of normal illuminance, minimum 15 lux",
      "50 lux"
    ],
    correctAnswer: 2,
    explanation: "High-risk task areas require 10% of the normal task illuminance, with a minimum of 15 lux on the task area. This enables safe shutdown of potentially dangerous processes."
  },
  {
    id: 8,
    question: "What is the minimum colour rendering index (Ra) required for emergency lighting?",
    options: ["Ra 20", "Ra 40", "Ra 60", "Ra 80"],
    correctAnswer: 1,
    explanation: "Emergency lighting requires minimum Ra 40 (CRI). This is lower than normal lighting requirements because the primary purpose is safe evacuation, not accurate colour perception. Most modern LED emergency luminaires exceed this."
  },
  {
    id: 9,
    question: "How should emergency lighting be designed for disabled refuges?",
    options: [
      "Same as corridors (1 lux)",
      "Higher illuminance and intercom visibility",
      "No specific requirement",
      "Flashing beacon only"
    ],
    correctAnswer: 1,
    explanation: "Disabled refuges require adequate illuminance for communication equipment (intercom) to be visible and usable. BS 5266 recommends illuminating the refuge to enable safe waiting and communication with rescue teams."
  },
  {
    id: 10,
    question: "What testing regime is required for emergency lighting to BS 5266?",
    options: [
      "Annual full duration test only",
      "Monthly function test, annual full duration test",
      "Weekly function test only",
      "Six-monthly inspection"
    ],
    correctAnswer: 1,
    explanation: "BS 5266 requires monthly function tests (brief operation check) and annual full duration tests (3 hour or specified duration). Records must be maintained. Self-test systems can automate function testing."
  }
];

const faqs = [
  {
    question: "What is the difference between maintained and non-maintained emergency lighting?",
    answer: "Non-maintained luminaires only illuminate during mains failure, remaining off during normal operation. Maintained luminaires operate continuously - providing normal lighting on mains power and switching to battery during failure. Sustained emergency luminaires contain two lamps - one maintained for emergency, one non-maintained for normal lighting."
  },
  {
    question: "How do I determine emergency lighting duration requirements?",
    answer: "Standard duration is 3 hours for most UK buildings. 1 hour may be acceptable where immediate evacuation is possible and the building will not be reoccupied without restored power. Extended durations (to 8 hours) may be needed for sleeping accommodation or where delayed evacuation is expected. The fire risk assessment determines requirements."
  },
  {
    question: "Can I use the normal lighting installation for emergency lighting?",
    answer: "Yes, but the luminaires must be specifically designed and supplied for emergency operation with battery backup or central battery system. Simply having luminaires on an essential supply (generator) is not compliant unless changeover is instantaneous (within 0.5 seconds for escape routes)."
  },
  {
    question: "What is self-contained emergency lighting?",
    answer: "Self-contained units have their own battery, charger and control gear within each luminaire. They operate independently without external wiring for emergency supply. This contrasts with central battery systems where multiple luminaires are supplied from a common battery room."
  },
  {
    question: "How do I design emergency lighting for very large open areas?",
    answer: "Open areas over 60m² require anti-panic lighting at 0.5 lux minimum across the core area (excluding 0.5m perimeter). Calculate luminaire positions using manufacturer spacing data. Consider obstruction by furniture/equipment. Software can optimise layouts for large spaces."
  },
  {
    question: "What records must be kept for emergency lighting?",
    answer: "BS 5266 requires a log book recording: commissioning certificate, design information, luminaire locations, test results (monthly function and annual duration), repairs/replacements, and any changes to the system. Electronic records are acceptable. The responsible person must ensure testing is carried out."
  }
];

const HNCModule4Section4_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4">
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
            <AlertTriangle className="h-4 w-4" />
            <span>Module 4.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Lighting Design
          </h1>
          <p className="text-white/80">
            Designing life safety systems to BS 5266 for safe evacuation during power failure
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Escape routes:</strong> 1 lux minimum on centre line</li>
              <li className="pl-1"><strong>Open areas:</strong> 0.5 lux anti-panic lighting</li>
              <li className="pl-1"><strong>High risk:</strong> 10% of normal, min 15 lux</li>
              <li className="pl-1"><strong>Duration:</strong> 3 hours standard</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 5266:</strong> Emergency lighting code of practice</li>
              <li className="pl-1"><strong>BS EN 1838:</strong> Applied photometry requirements</li>
              <li className="pl-1"><strong>BS EN 50172:</strong> Emergency escape schemes</li>
              <li className="pl-1"><strong>RRO:</strong> Regulatory Reform (Fire Safety) Order</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design escape route emergency lighting to BS 5266",
              "Apply illuminance requirements for different areas",
              "Select appropriate system types (maintained/non-maintained)",
              "Determine correct duration for building types",
              "Position luminaires for required coverage",
              "Specify testing and maintenance requirements"
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

        {/* Section 1: Escape Route Lighting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Escape Route Lighting Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Escape route lighting ensures occupants can safely evacuate a building during mains failure.
              Routes must be illuminated to enable recognition of obstacles, direction changes and exit points.
              BS 5266 and BS EN 1838 specify the requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Escape route requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Illuminance:</strong> Minimum 1 lux on centre line of route</li>
                <li className="pl-1"><strong>Uniformity:</strong> Maximum 40:1 ratio (Emax/Emin)</li>
                <li className="pl-1"><strong>Width:</strong> Central band of at least 50% of route width</li>
                <li className="pl-1"><strong>Response:</strong> 50% output within 5 seconds, 100% within 60 seconds</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Locations Requiring Escape Route Lighting</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridors</td>
                      <td className="border border-white/10 px-3 py-2">1 lux on centre line, luminaires at direction changes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stairways</td>
                      <td className="border border-white/10 px-3 py-2">1 lux on treads, each flight illuminated</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Exit doors</td>
                      <td className="border border-white/10 px-3 py-2">Illuminated exit sign, 1 lux at door position</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Changes of direction</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire within 2m of change</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Changes of level</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire to illuminate each change</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Intersections</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire at or near each intersection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Emergency lighting must also illuminate fire safety signs, fire alarm call points, fire fighting equipment locations, and first aid points.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Open Area and High-Risk Lighting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Open Area and High-Risk Task Lighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Open area (anti-panic) lighting and high-risk task area lighting serve different purposes
              from escape routes. Anti-panic lighting prevents panic in large spaces, while high-risk
              lighting enables safe shutdown of dangerous processes.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Open Area (Anti-Panic)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Required in areas &gt;60m² floor area</li>
                  <li className="pl-1">Minimum 0.5 lux at floor level</li>
                  <li className="pl-1">Core area (excluding 0.5m perimeter band)</li>
                  <li className="pl-1">Uniformity maximum 40:1</li>
                  <li className="pl-1">Enable occupants to reach escape routes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">High-Risk Task Areas</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Required where sudden darkness is dangerous</li>
                  <li className="pl-1">Minimum 10% of normal task illuminance</li>
                  <li className="pl-1">Never less than 15 lux on task area</li>
                  <li className="pl-1">Uniformity maximum 10:1</li>
                  <li className="pl-1">Response: 0.5 seconds for escape routes</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Lighting Summary Table</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Illuminance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Uniformity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Escape route</td>
                      <td className="border border-white/10 px-3 py-2">1 lux (centre line)</td>
                      <td className="border border-white/10 px-3 py-2">40:1 max</td>
                      <td className="border border-white/10 px-3 py-2">5s (50%), 60s (100%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open area</td>
                      <td className="border border-white/10 px-3 py-2">0.5 lux (floor)</td>
                      <td className="border border-white/10 px-3 py-2">40:1 max</td>
                      <td className="border border-white/10 px-3 py-2">5s (50%), 60s (100%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-risk task</td>
                      <td className="border border-white/10 px-3 py-2">10% of normal, min 15 lux</td>
                      <td className="border border-white/10 px-3 py-2">10:1 max</td>
                      <td className="border border-white/10 px-3 py-2">0.5s (100%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Examples of high-risk areas:</strong> Operating machinery, laboratories, electrical switchrooms, kitchens with hot equipment, working at height.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 3: System Types and Duration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Maintained vs Non-Maintained Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between maintained and non-maintained systems depends on how the space is used.
              Where lighting may be deliberately switched off while occupied, maintained systems are required.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Types Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Operation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Non-maintained</td>
                      <td className="border border-white/10 px-3 py-2">Only operates on mains failure</td>
                      <td className="border border-white/10 px-3 py-2">Offices, shops, factories where lights always on when occupied</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintained</td>
                      <td className="border border-white/10 px-3 py-2">Operates continuously (mains or battery)</td>
                      <td className="border border-white/10 px-3 py-2">Cinemas, theatres, nightclubs, some restaurants</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sustained</td>
                      <td className="border border-white/10 px-3 py-2">Two lamps - one maintained, one not</td>
                      <td className="border border-white/10 px-3 py-2">Combined normal and emergency function</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Contained Systems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Battery in each luminaire</li>
                  <li className="pl-1">Simple installation (no battery room)</li>
                  <li className="pl-1">Each unit independent</li>
                  <li className="pl-1">Batteries require replacement (5-10 years)</li>
                  <li className="pl-1">Self-test options available</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Central Battery Systems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Single battery location</li>
                  <li className="pl-1">Easier maintenance monitoring</li>
                  <li className="pl-1">Fire-rated distribution required</li>
                  <li className="pl-1">More complex cabling</li>
                  <li className="pl-1">Suitable for larger buildings</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Duration Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>3 hours:</strong> Standard for most buildings (offices, retail, industrial)</li>
                <li className="pl-1"><strong>1 hour:</strong> Where immediate evacuation possible and no reoccupation without power</li>
                <li className="pl-1"><strong>Extended (to 8 hours):</strong> Sleeping accommodation, hospitals, premises with delayed evacuation</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Duration is determined by the fire risk assessment, not chosen arbitrarily. The responsible person must justify any deviation from 3 hours.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Testing and Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Testing, Maintenance and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting is a life safety system requiring regular testing and maintenance.
              BS 5266 specifies the test regime and documentation requirements. Self-test systems
              can automate some requirements but manual verification remains essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Regime (BS 5266)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daily check</td>
                      <td className="border border-white/10 px-3 py-2">Daily (visual)</td>
                      <td className="border border-white/10 px-3 py-2">Indicator lights functioning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Function test</td>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Brief operation, check all luminaires function</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Full duration test</td>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Full rated duration (1 or 3 hours)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Battery replacement</td>
                      <td className="border border-white/10 px-3 py-2">As required</td>
                      <td className="border border-white/10 px-3 py-2">When duration test fails (typically 4-6 years)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Required</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Completion certificate (initial)</li>
                  <li className="pl-1">As-built drawings showing luminaire positions</li>
                  <li className="pl-1">Design basis and calculations</li>
                  <li className="pl-1">Test log book with all test records</li>
                  <li className="pl-1">Maintenance records and replacements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Test Systems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Automatic function testing</li>
                  <li className="pl-1">Fault indication (local or central)</li>
                  <li className="pl-1">Reduced manual testing burden</li>
                  <li className="pl-1">Still requires annual duration test</li>
                  <li className="pl-1">DALI-compatible options available</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recharge Time After Testing</p>
              <p className="text-sm text-white">
                After any discharge test, batteries require 24 hours to fully recharge. Testing should be
                scheduled to ensure the system is fully charged during normal occupied periods. Avoid testing
                on consecutive days or before weekends/holidays when the building is occupied.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Legal responsibility:</strong> The Regulatory Reform (Fire Safety) Order 2005 places responsibility on the 'responsible person' (usually building owner/employer) to maintain emergency lighting in working order.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Escape Route Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Design emergency lighting for a 30m corridor, 2m wide, with exit at one end and a change of direction midway.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Requirements (BS 5266):</p>
                <p>- Minimum 1 lux on centre line</p>
                <p>- Uniformity maximum 40:1</p>
                <p>- Luminaire at each end (exits)</p>
                <p>- Luminaire within 2m of direction change</p>
                <p className="mt-2"><strong>Solution:</strong></p>
                <p>- Exit luminaire at 0m (illuminated exit sign)</p>
                <p>- Corridor luminaire at 15m (direction change point)</p>
                <p>- Exit luminaire at 30m (exit door)</p>
                <p className="mt-2">Using 8W LED emergency with 15m spacing capability:</p>
                <p><strong>Total: 3 emergency luminaires + signage</strong></p>
                <p className="mt-2 text-white/60">Verify with manufacturer spacing data for 1 lux compliance</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Open Area Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An open plan office is 20m × 15m (300m²). Determine emergency lighting requirements.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Area = 300m² &gt; 60m² threshold</p>
                <p className="text-green-400">✓ Anti-panic lighting required</p>
                <p className="mt-2">Core area (excluding 0.5m perimeter):</p>
                <p>Core = (20 - 1) × (15 - 1) = 19 × 14 = 266m²</p>
                <p className="mt-2">Requirement: 0.5 lux minimum across core</p>
                <p className="mt-2">Using 3W LED bulkhead with 8m × 8m spacing (0.5 lux):</p>
                <p>Grid: 3 across × 2 along = <strong>6 luminaires</strong></p>
                <p className="mt-2 text-white/60">Plus escape route lighting to exits</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: High-Risk Task Area</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> A machine workshop operates at 500 lux. Calculate emergency lighting requirement for safe shutdown.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>High-risk task area requirement:</p>
                <p>10% of normal = 500 × 0.1 = 50 lux</p>
                <p className="mt-2">Check against minimum:</p>
                <p>50 lux &gt; 15 lux (minimum) ✓</p>
                <p className="mt-2"><strong>Required: 50 lux on machine task areas</strong></p>
                <p>Uniformity maximum 10:1</p>
                <p>Response time: 0.5 seconds to full output</p>
                <p className="mt-2 text-white/60">Self-contained may not achieve 0.5s response.</p>
                <p className="text-white/60">Consider central battery or UPS-backed system.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Summary</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Escape routes: 1 lux centre line, uniformity 40:1</li>
                <li className="pl-1">Open areas (&gt;60m²): 0.5 lux, uniformity 40:1</li>
                <li className="pl-1">High-risk: 10% of normal, min 15 lux, 10:1 uniformity</li>
                <li className="pl-1">Standard duration: 3 hours</li>
                <li className="pl-1">Test: monthly function, annual duration</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Luminaire Positioning</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">At or near each exit door</li>
                <li className="pl-1">Within 2m of direction changes</li>
                <li className="pl-1">At each stairway flight and landing</li>
                <li className="pl-1">Near fire alarm call points</li>
                <li className="pl-1">Near fire extinguisher locations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Excessive spacing:</strong> Always check manufacturer data for actual coverage</li>
                <li className="pl-1"><strong>Forgetting open areas:</strong> Spaces &gt;60m² need anti-panic lighting</li>
                <li className="pl-1"><strong>Missing safety equipment:</strong> Fire extinguishers and call points need illumination</li>
                <li className="pl-1"><strong>Poor test scheduling:</strong> Allow 24h recharge before occupied periods</li>
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
                <p className="font-medium text-white mb-1">Illuminance Requirements</p>
                <ul className="space-y-0.5">
                  <li>Escape routes: 1 lux (centre line)</li>
                  <li>Open areas: 0.5 lux (floor)</li>
                  <li>High-risk: 10% of normal, min 15 lux</li>
                  <li>Colour rendering: Ra 40 minimum</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Testing Requirements</p>
                <ul className="space-y-0.5">
                  <li>Daily: Visual check of indicators</li>
                  <li>Monthly: Function test (brief)</li>
                  <li>Annual: Full duration test</li>
                  <li>Recharge: 24 hours after test</li>
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
            <Link to="../h-n-c-module4-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Interior Calculations
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4-4">
              Next: Lighting Controls
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section4_3;
