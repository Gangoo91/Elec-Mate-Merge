import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Emergency Lighting Design - HNC Module 7 Section 2.1";
const DESCRIPTION = "Master emergency lighting design to BS 5266: lux level requirements, escape routes, open areas, high-risk task areas, maintained and non-maintained systems, duration requirements, and luminaire spacing.";

const quickCheckQuestions = [
  {
    id: "bs5266-purpose",
    question: "What is the primary purpose of BS 5266-1?",
    options: ["To specify general lighting levels", "To provide recommendations for emergency escape lighting", "To define fire alarm installation requirements", "To regulate standby power systems"],
    correctIndex: 1,
    explanation: "BS 5266-1 is the British Standard that provides recommendations for the emergency escape lighting of premises. It covers design, installation, wiring, and servicing of emergency lighting systems to ensure safe evacuation during power failure."
  },
  {
    id: "escape-route-lux",
    question: "What is the minimum illuminance required on the centre line of an escape route up to 2m wide?",
    options: ["0.5 lux", "1 lux", "5 lux", "10 lux"],
    correctIndex: 1,
    explanation: "BS 5266-1 requires a minimum of 1 lux at floor level on the centre line of a defined escape route up to 2m wide. The central band must be at least half the route width, with a minimum of 0.5 lux at the edges."
  },
  {
    id: "maintained-definition",
    question: "What defines a maintained emergency luminaire?",
    options: ["It only operates during mains failure", "Its lamp operates continuously during normal and emergency conditions", "It requires monthly maintenance", "It has a minimum 3-hour duration"],
    correctIndex: 1,
    explanation: "A maintained emergency luminaire has its lamp(s) illuminated at all times when the premises are occupied. This contrasts with non-maintained luminaires which only illuminate during mains failure."
  },
  {
    id: "high-risk-task",
    question: "What percentage of normal task illuminance is required for high-risk task areas during emergency lighting operation?",
    options: ["1%", "5%", "10%", "50%"],
    correctIndex: 2,
    explanation: "High-risk task areas require emergency lighting to provide at least 10% of the normal task illuminance, with a minimum of 15 lux. This ensures potentially dangerous activities can be safely terminated."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "According to BS 5266-1, what is the minimum duration for emergency lighting in most premises?",
    options: [
      "30 minutes",
      "1 hour",
      "2 hours",
      "3 hours"
    ],
    correctAnswer: 2,
    explanation: "BS 5266-1 specifies a minimum 1-hour duration for most premises. However, 3 hours is required for sleeping accommodation, premises not evacuated immediately, or where recharge may take longer than normal working hours."
  },
  {
    id: 2,
    question: "What illuminance is required in open areas greater than 60m2?",
    options: ["0.2 lux", "0.5 lux", "1 lux", "5 lux"],
    correctAnswer: 1,
    explanation: "Open areas (anti-panic areas) greater than 60m2 require a minimum of 0.5 lux at floor level across the core area, excluding a 0.5m border around the perimeter."
  },
  {
    id: 3,
    question: "At what height should escape route signs be illuminated to a minimum luminance?",
    options: ["1.8m above floor level", "2.0m above floor level", "2.5m above floor level", "At the ceiling"],
    correctAnswer: 1,
    explanation: "Exit signs should be positioned at least 2.0m above floor level. BS 5266-1 requires signs to have a minimum luminance of 2 cd/m2 for internally illuminated signs."
  },
  {
    id: 4,
    question: "What is the maximum spacing between emergency luminaires on an escape route, as a general rule?",
    options: ["Equal to the mounting height", "Twice the mounting height", "Four times the mounting height", "10 metres"],
    correctAnswer: 2,
    explanation: "As a general rule, luminaire spacing should not exceed four times the mounting height above floor level on escape routes. This ensures adequate uniformity of illumination along the route."
  },
  {
    id: 5,
    question: "Which type of emergency lighting system uses a central battery with distribution wiring?",
    options: [
      "Self-contained system",
      "Central battery system",
      "Maintained system",
      "Slave luminaire system"
    ],
    correctAnswer: 1,
    explanation: "A central battery system uses a single battery installation that supplies all emergency luminaires via distribution wiring. This contrasts with self-contained systems where each luminaire has its own battery."
  },
  {
    id: 6,
    question: "What is the uniformity ratio requirement for open area (anti-panic) lighting?",
    options: ["40:1 maximum", "20:1 maximum", "10:1 maximum", "No requirement"],
    correctAnswer: 0,
    explanation: "The ratio of maximum to minimum illuminance in open areas must not exceed 40:1. This prevents dark spots that could cause panic or falls during evacuation."
  },
  {
    id: 7,
    question: "Emergency lighting must reach what percentage of required illuminance within how many seconds?",
    options: ["50% within 5 seconds", "50% within 10 seconds", "100% within 5 seconds", "100% within 60 seconds"],
    correctAnswer: 0,
    explanation: "Emergency lighting must reach 50% of required illuminance within 5 seconds and full required illuminance within 60 seconds. This ensures immediate basic visibility during the critical initial evacuation phase."
  },
  {
    id: 8,
    question: "Where must emergency lighting be provided according to BS 5266-1?",
    options: [
      "Only at exit doors",
      "Only on main corridors",
      "At all safety signs, changes of level, and intersection points",
      "Only in high-risk areas"
    ],
    correctAnswer: 2,
    explanation: "Emergency lighting must illuminate all escape routes, exit doors, safety signs, stairs, changes of direction, intersection points, final exits, first aid points, fire-fighting equipment, and call points."
  },
  {
    id: 9,
    question: "What category of emergency lighting is required in a cinema or theatre?",
    options: ["Escape route lighting only", "Open area (anti-panic) lighting", "High-risk task area lighting", "Standby lighting only"],
    correctAnswer: 1,
    explanation: "Cinemas and theatres require open area (anti-panic) lighting because they contain large spaces where people gather and may not be familiar with the escape routes."
  },
  {
    id: 10,
    question: "A combined emergency luminaire provides:",
    options: [
      "Only emergency lighting",
      "Normal and emergency lighting from separate lamps",
      "Both maintained and non-maintained operation",
      "Lighting and fire alarm functions"
    ],
    correctAnswer: 1,
    explanation: "A combined emergency luminaire contains separate lamps for normal lighting and emergency lighting. The emergency lamp may be maintained or non-maintained, while the normal lighting lamp operates from mains supply."
  },
  {
    id: 11,
    question: "What is the minimum recharge period before a subsequent emergency must not result in a duration below specification?",
    options: ["4 hours", "12 hours", "24 hours", "48 hours"],
    correctAnswer: 2,
    explanation: "BS 5266-1 requires that after a full rated discharge, the system must be capable of providing rated duration again after a maximum 24-hour recharge period."
  },
  {
    id: 12,
    question: "For a high-risk task area with normal illumination of 500 lux, what minimum emergency illuminance is required?",
    options: ["5 lux", "15 lux", "50 lux", "100 lux"],
    correctAnswer: 2,
    explanation: "High-risk task areas require 10% of normal task illuminance, which would be 50 lux (10% of 500 lux). Since this exceeds the minimum requirement of 15 lux, the 50 lux figure applies."
  }
];

const faqs = [
  {
    question: "When should maintained emergency lighting be used instead of non-maintained?",
    answer: "Maintained emergency lighting is required in premises where the normal lighting may be dimmed, such as cinemas, theatres, and entertainment venues. It is also recommended where emergency lighting must be clearly distinguishable at all times, in sleeping accommodation, and where maintaining constant awareness of escape route locations is important. BS 5266-1 provides specific guidance on which premises require maintained operation."
  },
  {
    question: "How do I calculate the number of emergency luminaires required for an escape route?",
    answer: "First, measure the escape route dimensions. For routes up to 2m wide, apply the 4x mounting height spacing rule as a starting point. Then verify using photometric data that 1 lux minimum is achieved on the centre line and 0.5 lux minimum at the edges. Consider luminaire light output, beam angle, and uniformity requirements. Always use manufacturer's spacing tables based on specific luminaire photometrics."
  },
  {
    question: "What testing regime is required for emergency lighting systems?",
    answer: "BS 5266-1 requires daily visual checks of central systems, monthly functional tests (brief operation on battery), 6-monthly brief tests with lamp/battery checks, and annual full-duration discharge tests. All tests must be recorded in a log book. Self-testing luminaires with automatic test functionality can reduce manual testing requirements."
  },
  {
    question: "Can LED emergency luminaires meet BS 5266-1 requirements?",
    answer: "Yes, LED emergency luminaires can fully comply with BS 5266-1 when properly designed. They offer advantages including longer lamp life, lower energy consumption, instant full output, and often self-testing capabilities. Ensure LED luminaires are specifically designed for emergency lighting applications and meet the photometric and duration requirements."
  },
  {
    question: "What is the difference between escape route lighting and standby lighting?",
    answer: "Escape route lighting is part of emergency escape lighting, providing illumination to enable safe evacuation during mains failure. Standby lighting enables normal activities to continue during power failure - it provides a higher illuminance level but is not specifically for evacuation. A building may have both systems, but standby lighting cannot substitute for emergency escape lighting."
  },
  {
    question: "How do I determine if an area qualifies as high-risk for emergency lighting purposes?",
    answer: "High-risk task areas are locations where activities being undertaken could become dangerous if lighting fails suddenly. Examples include operating machinery, working at height, working with hazardous materials, and medical procedures. The risk assessment should consider what happens if lighting fails during the activity - if immediate danger results, it qualifies as high-risk."
  }
];

const HNCModule7Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Lighting Design
          </h1>
          <p className="text-white/80">
            BS 5266 requirements, lux levels, duration, escape routes, open areas, and high-risk task areas
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 5266-1:</strong> Primary standard for emergency escape lighting</li>
              <li className="pl-1"><strong>Escape routes:</strong> Minimum 1 lux on centre line</li>
              <li className="pl-1"><strong>Open areas:</strong> Minimum 0.5 lux (anti-panic)</li>
              <li className="pl-1"><strong>High-risk:</strong> 10% of task illuminance, minimum 15 lux</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Requirements</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Duration:</strong> 1 hour minimum, 3 hours for sleeping risk</li>
              <li className="pl-1"><strong>Response:</strong> 50% output within 5 seconds</li>
              <li className="pl-1"><strong>Uniformity:</strong> Max 40:1 ratio in open areas</li>
              <li className="pl-1"><strong>Spacing:</strong> Max 4x mounting height on escape routes</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BS 5266-1 requirements to emergency lighting design",
              "Calculate illuminance levels for escape routes and open areas",
              "Distinguish between maintained and non-maintained systems",
              "Design high-risk task area emergency lighting",
              "Determine appropriate emergency lighting duration",
              "Apply luminaire spacing rules for adequate coverage"
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

        {/* Section 1: BS 5266-1 Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BS 5266-1 Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1 is the British Standard that provides recommendations for the emergency escape lighting
              of premises. It forms the basis for designing, installing, and maintaining emergency lighting
              systems that enable safe evacuation during mains power failure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Emergency lighting categories:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Emergency escape lighting:</strong> Enables safe evacuation from premises during power failure</li>
                <li className="pl-1"><strong>Escape route lighting:</strong> Identifies and illuminates escape routes to final exits</li>
                <li className="pl-1"><strong>Open area lighting:</strong> Provides illumination in large areas to prevent panic</li>
                <li className="pl-1"><strong>High-risk task area lighting:</strong> Enables safe shutdown of dangerous activities</li>
                <li className="pl-1"><strong>Standby lighting:</strong> Enables normal activities to continue (not part of emergency escape lighting)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Luminaire Classification</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Normal Operation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Emergency Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Non-maintained</td>
                      <td className="border border-white/10 px-3 py-2">Lamp off, battery charging</td>
                      <td className="border border-white/10 px-3 py-2">Lamp illuminated from battery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintained</td>
                      <td className="border border-white/10 px-3 py-2">Lamp on from mains</td>
                      <td className="border border-white/10 px-3 py-2">Lamp remains on from battery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Combined</td>
                      <td className="border border-white/10 px-3 py-2">Normal lamp on, emergency lamp off/on</td>
                      <td className="border border-white/10 px-3 py-2">Emergency lamp from battery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Self-contained</td>
                      <td className="border border-white/10 px-3 py-2">Battery within luminaire</td>
                      <td className="border border-white/10 px-3 py-2">Individual battery powers lamp</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Central battery</td>
                      <td className="border border-white/10 px-3 py-2">Remote battery system</td>
                      <td className="border border-white/10 px-3 py-2">Central battery powers all luminaires</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Emergency lighting must provide sufficient illumination for occupants to identify escape routes and evacuate safely, even if they are unfamiliar with the building layout.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Illuminance Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Illuminance Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1 specifies minimum illuminance levels for different areas based on the risk
              and nature of evacuation. These levels must be achieved at floor level and maintained
              throughout the rated duration.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Escape Routes</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>1 lux minimum</strong> centre line</li>
                  <li className="pl-1">0.5 lux at edges</li>
                  <li className="pl-1">Routes up to 2m wide</li>
                  <li className="pl-1">Central band &gt; half width</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Open Areas (&gt;60m2)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>0.5 lux minimum</strong> floor level</li>
                  <li className="pl-1">Anti-panic lighting</li>
                  <li className="pl-1">Exclude 0.5m border</li>
                  <li className="pl-1">40:1 max uniformity</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">High-Risk Task Areas</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>10% task illuminance</strong></li>
                  <li className="pl-1">Minimum 15 lux</li>
                  <li className="pl-1">Enable safe shutdown</li>
                  <li className="pl-1">Risk assessment required</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Illuminance Values Summary</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Area Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Lux</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Uniformity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Escape route centre</td>
                      <td className="border border-white/10 px-3 py-2">1 lux</td>
                      <td className="border border-white/10 px-3 py-2">40:1 max</td>
                      <td className="border border-white/10 px-3 py-2">Measured at floor level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Escape route edges</td>
                      <td className="border border-white/10 px-3 py-2">0.5 lux</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">Within central band</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open areas</td>
                      <td className="border border-white/10 px-3 py-2">0.5 lux</td>
                      <td className="border border-white/10 px-3 py-2">40:1 max</td>
                      <td className="border border-white/10 px-3 py-2">Core area, 0.5m border excluded</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-risk task</td>
                      <td className="border border-white/10 px-3 py-2">10% or 15 lux</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">Whichever is greater</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety signs</td>
                      <td className="border border-white/10 px-3 py-2">2 cd/m2</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                      <td className="border border-white/10 px-3 py-2">Luminance, not illuminance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical timing:</strong> Emergency lighting must reach 50% of required illuminance within 5 seconds and full illuminance within 60 seconds of mains failure.
            </p>
          </div>
        </section>

        {/* Section 3: Duration and Response Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Duration and Response Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting must operate for a specified duration to ensure occupants have
              adequate time to evacuate safely. The required duration depends on the building
              type, occupancy, and evacuation characteristics.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Duration Requirements</p>
              <div className="text-sm space-y-2">
                <p><span className="text-white/60">1 hour minimum:</span> <span className="text-white">Most premises where evacuation is immediate and recharge occurs during normal working hours</span></p>
                <p><span className="text-white/60">3 hours required:</span> <span className="text-white">Sleeping accommodation, premises not evacuated immediately, areas where recharge period exceeds normal working hours</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Response Time Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Within 0.5 seconds:</strong> Emergency lighting circuit must activate</li>
                <li className="pl-1"><strong>Within 5 seconds:</strong> 50% of required illuminance must be achieved</li>
                <li className="pl-1"><strong>Within 60 seconds:</strong> Full required illuminance must be achieved</li>
                <li className="pl-1"><strong>Throughout duration:</strong> Minimum illuminance must be maintained</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Duration Selection Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Premises Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Duration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Offices (day use)</td>
                      <td className="border border-white/10 px-3 py-2">1 hour</td>
                      <td className="border border-white/10 px-3 py-2">Immediate evacuation, daytime recharge</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hotels</td>
                      <td className="border border-white/10 px-3 py-2">3 hours</td>
                      <td className="border border-white/10 px-3 py-2">Sleeping accommodation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospitals</td>
                      <td className="border border-white/10 px-3 py-2">3 hours</td>
                      <td className="border border-white/10 px-3 py-2">Sleeping risk, slow evacuation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Entertainment venues</td>
                      <td className="border border-white/10 px-3 py-2">3 hours</td>
                      <td className="border border-white/10 px-3 py-2">Often not evacuated immediately</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial (24-hour)</td>
                      <td className="border border-white/10 px-3 py-2">3 hours</td>
                      <td className="border border-white/10 px-3 py-2">Recharge may exceed shift patterns</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Recharge requirement:</strong> Following a full rated discharge, the system must be capable of providing rated duration again after a maximum 24-hour recharge period.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Luminaire Spacing and Positioning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Luminaire Spacing and Positioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct positioning of emergency luminaires is essential to achieve required illuminance
              levels with adequate uniformity. BS 5266-1 provides general guidance, but specific
              spacing must be verified using manufacturer photometric data.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Luminaire Locations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Near each exit door and at final exit doors</li>
                <li className="pl-1">On or near stairs so each tread receives direct light</li>
                <li className="pl-1">At each change of direction along escape routes</li>
                <li className="pl-1">At each intersection of corridors</li>
                <li className="pl-1">At each change of floor level</li>
                <li className="pl-1">Outside and near each final exit</li>
                <li className="pl-1">At each first aid post</li>
                <li className="pl-1">At each piece of fire-fighting equipment and call point</li>
                <li className="pl-1">At all fire safety signs</li>
                <li className="pl-1">Near disabled refuges and call points</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Escape Route Spacing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Maximum 4x mounting height</li>
                  <li className="pl-1">Verify with photometric data</li>
                  <li className="pl-1">Consider beam angle</li>
                  <li className="pl-1">Account for obstructions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Open Area Spacing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Based on photometric layout</li>
                  <li className="pl-1">Achieve 0.5 lux minimum</li>
                  <li className="pl-1">40:1 uniformity ratio</li>
                  <li className="pl-1">Exclude 0.5m perimeter</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Spacing Calculation Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Mounting Height</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Spacing (4x rule)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Verified Spacing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.5m</td>
                      <td className="border border-white/10 px-3 py-2">10m maximum</td>
                      <td className="border border-white/10 px-3 py-2">6-8m (luminaire dependent)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3.0m</td>
                      <td className="border border-white/10 px-3 py-2">12m maximum</td>
                      <td className="border border-white/10 px-3 py-2">8-10m (luminaire dependent)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4.0m</td>
                      <td className="border border-white/10 px-3 py-2">16m maximum</td>
                      <td className="border border-white/10 px-3 py-2">10-14m (luminaire dependent)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sign Visibility Requirements</p>
              <div className="text-sm space-y-2">
                <p><strong>Viewing distance:</strong> Maximum viewing distance = 200 x sign height (for externally illuminated signs)</p>
                <p><strong>Internally illuminated:</strong> Maximum viewing distance = sign height x distance factor (typically 100-200)</p>
                <p><strong>Minimum luminance:</strong> 2 cd/m2 for internally illuminated signs</p>
                <p><strong>Sign illumination:</strong> Externally illuminated signs require at least 5 lux on the sign face</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design verification:</strong> Always verify spacing using manufacturer photometric data and lighting design software. The 4x mounting height rule is a starting point, not a guaranteed solution.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Escape Route Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design emergency lighting for a 1.5m wide corridor, 30m long, with 2.8m ceiling height.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Determine requirements</p>
                <p className="ml-4">Route width: 1.5m (&lt;2m, so standard escape route requirements)</p>
                <p className="ml-4">Minimum illuminance: 1 lux centre line, 0.5 lux edges</p>
                <p className="mt-2">Step 2: Calculate maximum spacing</p>
                <p className="ml-4">Mounting height: 2.8m</p>
                <p className="ml-4">Maximum spacing = 4 x 2.8m = 11.2m</p>
                <p className="mt-2">Step 3: Apply to corridor length</p>
                <p className="ml-4">Corridor length: 30m</p>
                <p className="ml-4">Luminaires required: 30m / 11.2m = 2.68, round up to 3</p>
                <p className="ml-4">Plus luminaires at each end = 5 minimum positions</p>
                <p className="mt-2 text-green-400">Step 4: Verify with photometric data</p>
                <p className="ml-4 text-green-400">Check actual luminaire output achieves 1 lux at calculated spacing</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: High-Risk Task Area</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine emergency lighting for a machine workshop with 400 lux task lighting.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Calculate 10% requirement</p>
                <p className="ml-4">Normal task illuminance: 400 lux</p>
                <p className="ml-4">10% = 40 lux</p>
                <p className="mt-2">Step 2: Check against minimum</p>
                <p className="ml-4">Minimum for high-risk: 15 lux</p>
                <p className="ml-4">40 lux &gt; 15 lux, so 40 lux applies</p>
                <p className="mt-2 text-green-400">Result: Emergency lighting must provide 40 lux at task level</p>
                <p className="ml-4 text-green-400">Design luminaires to achieve this at the machinery positions</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Open Area Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design anti-panic lighting for a 15m x 12m open plan office (180m2).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Verify open area classification</p>
                <p className="ml-4">Area: 180m2 (&gt;60m2, qualifies as open area)</p>
                <p className="ml-4">Minimum illuminance: 0.5 lux</p>
                <p className="mt-2">Step 2: Define core area (exclude 0.5m border)</p>
                <p className="ml-4">Core area: (15-1) x (12-1) = 14m x 11m = 154m2</p>
                <p className="mt-2">Step 3: Uniformity requirement</p>
                <p className="ml-4">Maximum:minimum ratio must not exceed 40:1</p>
                <p className="mt-2 text-green-400">Step 4: Lighting layout</p>
                <p className="ml-4 text-green-400">Use photometric software to design grid achieving 0.5 lux minimum</p>
                <p className="ml-4 text-green-400">with adequate uniformity across the 154m2 core area</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify all escape routes, exits, and high-risk areas</li>
                <li className="pl-1">Determine maintained or non-maintained requirement</li>
                <li className="pl-1">Calculate required illuminance levels for each area type</li>
                <li className="pl-1">Select appropriate duration (1 hour or 3 hours)</li>
                <li className="pl-1">Position luminaires at mandatory locations first</li>
                <li className="pl-1">Calculate spacing using 4x rule as starting point</li>
                <li className="pl-1">Verify design with photometric calculations</li>
                <li className="pl-1">Ensure sign visibility distances are adequate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Escape route centre line: <strong>1 lux minimum</strong></li>
                <li className="pl-1">Open areas: <strong>0.5 lux minimum</strong></li>
                <li className="pl-1">High-risk task: <strong>10% of task illuminance, minimum 15 lux</strong></li>
                <li className="pl-1">Response time: <strong>50% within 5 seconds, 100% within 60 seconds</strong></li>
                <li className="pl-1">Uniformity: <strong>40:1 maximum ratio</strong></li>
                <li className="pl-1">Sign luminance: <strong>2 cd/m2 minimum</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using 4x rule without verification</strong> - Always check with photometric data</li>
                <li className="pl-1"><strong>Forgetting mandatory locations</strong> - Changes of direction, fire equipment, signs</li>
                <li className="pl-1"><strong>Wrong duration selection</strong> - Check sleeping risk and evacuation time</li>
                <li className="pl-1"><strong>Ignoring uniformity</strong> - Dark spots cause panic and accidents</li>
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
                  <li>Escape route centre: 1 lux minimum</li>
                  <li>Escape route edges: 0.5 lux minimum</li>
                  <li>Open areas (&gt;60m2): 0.5 lux minimum</li>
                  <li>High-risk: 10% task or 15 lux minimum</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Duration and Response</p>
                <ul className="space-y-0.5">
                  <li>Standard duration: 1 hour minimum</li>
                  <li>Sleeping risk: 3 hours minimum</li>
                  <li>50% output: within 5 seconds</li>
                  <li>Full output: within 60 seconds</li>
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
            <Link to="../h-n-c-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2-2">
              Next: Fire Alarm System Design
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section2_1;
