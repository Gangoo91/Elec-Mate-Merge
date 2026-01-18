import { ArrowLeft, Bell, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Manual Call Points - Fire Alarm Module 2 Section 3";
const DESCRIPTION = "Learn about manual call point types, siting requirements per BS 5839-1, exit route positioning, and accessibility considerations.";

const quickCheckQuestions = [
  {
    id: "mcp-height",
    question: "At what height should a manual call point be mounted?",
    options: [
      "At shoulder height (approximately 1.6 m)",
      "Between 1.2 m and 1.4 m from finished floor level",
      "At 1.0 m from finished floor level",
      "Any convenient height"
    ],
    correctIndex: 1,
    explanation: "BS 5839-1 specifies MCPs should be mounted between 1.2 m and 1.4 m from finished floor level, typically at 1.4 m for consistency and accessibility."
  },
  {
    id: "mcp-distance-exit",
    question: "What is the maximum recommended travel distance to reach a manual call point?",
    options: [
      "15 metres",
      "30 metres",
      "45 metres",
      "60 metres"
    ],
    correctIndex: 2,
    explanation: "BS 5839-1 recommends that no person should have to travel more than 45 metres on any single level to reach a manual call point."
  },
  {
    id: "mcp-resettable",
    question: "What is the main advantage of resettable manual call points over break glass types?",
    options: [
      "Cheaper to install",
      "Can be tested and reset without replacement parts",
      "Do not require any maintenance",
      "More visible to occupants"
    ],
    correctIndex: 1,
    explanation: "Resettable MCPs can be activated for testing and then reset with a key without needing replacement glass elements, reducing maintenance costs and delays."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "At what height should a manual call point typically be mounted?",
    options: ["1.0 m", "1.2 m to 1.4 m", "1.5 m to 1.8 m", "2.0 m"],
    correctAnswer: 1,
    explanation: "BS 5839-1 specifies MCPs should be mounted between 1.2 m and 1.4 m from finished floor level."
  },
  {
    id: 2,
    question: "What is the maximum travel distance to reach a manual call point?",
    options: ["25 metres", "30 metres", "45 metres", "60 metres"],
    correctAnswer: 2,
    explanation: "BS 5839-1 recommends no more than 45 metres travel distance on any single level to reach an MCP."
  },
  {
    id: 3,
    question: "Where should manual call points be positioned in relation to exits?",
    options: [
      "At least 5 m from exit doors",
      "Adjacent to exit doors on the exit route",
      "In the centre of the building",
      "Only in corridors"
    ],
    correctAnswer: 1,
    explanation: "MCPs should be positioned adjacent to exit doors on the exit route side so people can raise the alarm as they leave."
  },
  {
    id: 4,
    question: "What colour are standard fire alarm manual call points?",
    options: ["Yellow", "Green", "Red", "Blue"],
    correctAnswer: 2,
    explanation: "Standard fire alarm MCPs are red. Yellow is used for gas release, green for emergency door release."
  },
  {
    id: 5,
    question: "Which type of manual call point can be reset after activation without replacement parts?",
    options: ["Break glass", "Resettable (plastic element)", "Both types equally", "Neither type"],
    correctAnswer: 1,
    explanation: "Resettable MCPs use a plastic element that can be pushed and reset with a key, avoiding the need for replacement glass."
  },
  {
    id: 6,
    question: "What must be provided for each manual call point zone?",
    options: [
      "A sounder",
      "An indicator showing which MCP was activated",
      "A test button",
      "A battery backup"
    ],
    correctAnswer: 1,
    explanation: "Each zone should have indication of which device activated, either at the control panel or via zone plan location."
  },
  {
    id: 7,
    question: "For wheelchair users, what height range should MCPs be mounted at?",
    options: [
      "0.75 m to 1.0 m",
      "1.0 m to 1.2 m",
      "1.2 m standard height is acceptable",
      "2.0 m with pull cord"
    ],
    correctAnswer: 2,
    explanation: "The standard 1.2 m to 1.4 m range is accessible for most wheelchair users. Lower mounting may be considered in specific cases."
  },
  {
    id: 8,
    question: "What is the purpose of protective covers on manual call points?",
    options: [
      "To prevent dust damage",
      "To deter accidental or malicious activation",
      "Required by BS 5839-1 for all MCPs",
      "To make the MCP more visible"
    ],
    correctAnswer: 1,
    explanation: "Protective covers deter accidental or malicious false alarms while still allowing genuine activation. They also provide an audible warning when lifted."
  },
  {
    id: 9,
    question: "In an M category system, what is the primary detection method?",
    options: [
      "Smoke detectors throughout",
      "Heat detectors throughout",
      "Manual call points only (no automatic detection)",
      "Beam detectors"
    ],
    correctAnswer: 2,
    explanation: "M category systems rely solely on manual call points for fire alarm activation, with no automatic detection."
  },
  {
    id: 10,
    question: "What action should be taken when a break glass MCP is activated?",
    options: [
      "Simply reset the panel",
      "Replace the glass element before resetting",
      "Leave activated until fire service arrives",
      "Cover with tape temporarily"
    ],
    correctAnswer: 1,
    explanation: "Break glass MCPs require the glass element to be replaced before the system can be properly reset and returned to service."
  }
];

const faqs = [
  {
    question: "Do I need MCPs if I have full automatic detection?",
    answer: "Yes - manual call points are required in all categories (L and P) to allow anyone discovering a fire to raise the alarm immediately."
  },
  {
    question: "Can MCPs be mounted on columns instead of walls?",
    answer: "Yes - provided they are clearly visible, accessible, and at the correct height. Ensure adequate signage directs people to them."
  },
  {
    question: "What about outdoor MCPs for loading bays?",
    answer: "Weatherproof MCPs are available for external use. Ensure they are clearly visible and protected from physical damage."
  },
  {
    question: "How often should MCPs be tested?",
    answer: "Weekly functional testing on rotation per BS 5839-1, with annual inspection and servicing of all units."
  },
  {
    question: "Are break glass MCPs still acceptable?",
    answer: "Yes - both break glass and resettable types comply with standards. Many organisations prefer resettable for maintenance convenience."
  },
  {
    question: "Can I use different coloured MCPs for different purposes?",
    answer: "Yes - red for fire, yellow for gas release, green for emergency door release. Ensure clear labelling and staff training."
  }
];

const FireAlarmModule2Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-2">
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
            <Bell className="h-4 w-4" />
            <span>Module 2 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Manual Call Points
          </h1>
          <p className="text-white">
            Understanding MCP types, siting requirements, and accessibility per BS 5839-1
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Height:</strong> 1.2 m to 1.4 m from finished floor level</li>
              <li><strong>Max travel distance:</strong> 45 metres on any single level</li>
              <li><strong>Position:</strong> Adjacent to exit doors on exit route side</li>
              <li><strong>Colour:</strong> Red for fire alarm activation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Every final exit must have adjacent MCP</li>
              <li><strong>Use:</strong> Resettable types reduce maintenance costs</li>
              <li><strong>Apply:</strong> Protective covers deter false alarms</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the two main types of manual call point",
              "Apply BS 5839-1 height and positioning requirements",
              "Calculate appropriate MCP distribution based on travel distance",
              "Understand colour coding for different functions",
              "Consider accessibility requirements for all users",
              "Specify appropriate protection against false alarms"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Introduction to Manual Call Points */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">01</span>
            Introduction to Manual Call Points
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Manual call points (MCPs) allow anyone who discovers a fire to immediately raise the alarm without waiting for automatic detection. They are required in all fire alarm system categories.
            </p>
            <p>
              MCPs provide a simple, recognisable means of activation that requires no training - the "break glass and push" or "lift and push" action is intuitive for building occupants.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Key Principle:</strong> MCPs allow human detection to supplement or replace automatic detection. Even in fully automatic systems, a person may discover a fire before detectors activate.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: MCP Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">02</span>
            MCP Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow mb-2">Break Glass (Traditional)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Glass element broken to activate</li>
                  <li>Requires replacement glass after use</li>
                  <li>Clear visual indication of activation</li>
                  <li>Lower initial cost</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow mb-2">Resettable (Plastic Element)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Plastic element pushed to activate</li>
                  <li>Reset with key - no replacement needed</li>
                  <li>Ideal for regular testing</li>
                  <li>Lower long-term maintenance cost</li>
                </ul>
              </div>
            </div>

            <p>
              Both types comply with BS EN 54-11. The choice often depends on maintenance considerations and false alarm risk in the environment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Siting Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">03</span>
            Siting Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5839-1 provides clear guidance on MCP positioning to ensure they are accessible, visible, and positioned where people will naturally pass during evacuation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Key Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Height:</strong> 1.2 m to 1.4 m from finished floor level</li>
                <li><strong>Travel distance:</strong> Maximum 45 m on any single level</li>
                <li><strong>Exit position:</strong> Adjacent to exit doors on exit route side</li>
                <li><strong>Floor level changes:</strong> At each storey exit point</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Exit Door Rule:</strong> Position the MCP on the exit route side of the door, so people can activate it as they leave - not on the side they are evacuating from.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Travel Distance Calculation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">04</span>
            Travel Distance Calculation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 45 metre maximum travel distance ensures that anyone on a floor level can reach an MCP without excessive travel. This is measured as walking distance, not straight-line distance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Planning MCP Distribution:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start from final exit doors - each requires an adjacent MCP</li>
                <li>Work back into the building checking 45 m coverage</li>
                <li>Add intermediate MCPs where gaps exceed 45 m travel</li>
                <li>Consider dead ends and areas with restricted routes</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Practical Note:</strong> In open plan areas, 45 m radius coverage is often achievable. In areas with partitions and corridors, the walking route must be calculated.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Colour Coding */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">05</span>
            Colour Coding and Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different coloured call points serve different functions. This colour coding is essential to prevent confusion and ensure correct response.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 pr-4 text-white font-medium">Colour</th>
                    <th className="text-left py-2 pr-4 text-white font-medium">Function</th>
                    <th className="text-left py-2 text-white font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-red-400 font-medium">Red</td>
                    <td className="py-2 pr-4">Fire alarm activation</td>
                    <td className="py-2">Sounds fire alarm throughout</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-yellow-400 font-medium">Yellow</td>
                    <td className="py-2 pr-4">Gas/suppression release</td>
                    <td className="py-2">Activates extinguishing system</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 text-green-400 font-medium">Green</td>
                    <td className="py-2 pr-4">Emergency door release</td>
                    <td className="py-2">Releases mag-lock or exit device</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-blue-400 font-medium">Blue</td>
                    <td className="py-2 pr-4">Special functions</td>
                    <td className="py-2">Varies by application</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Always ensure clear labelling accompanies colour coding to prevent confusion in emergency situations.
            </p>
          </div>
        </section>

        {/* Section 06: Protective Measures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow text-sm font-normal">06</span>
            Protective Measures Against False Alarms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In areas prone to accidental or malicious activation, protective measures can reduce unwanted alarms whilst maintaining accessibility.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Protection Options:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Hinged covers:</strong> Must be lifted before activation - provides audible warning</li>
                <li><strong>Lockable covers:</strong> For high-risk areas - staff carry keys</li>
                <li><strong>CCTV monitoring:</strong> Deters malicious activation</li>
                <li><strong>Double-knock activation:</strong> Two-stage operation required</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
              <p className="text-sm text-white">
                <strong>Warning:</strong> Protective measures must not prevent genuine activation. Any cover must be easily operated without tools by anyone, including those with limited dexterity.
              </p>
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
              <h3 className="text-sm font-medium text-elec-yellow mb-2">Pro Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always position MCPs where people will naturally pass during evacuation - not tucked away in corners</li>
                <li>Consider sightlines - an MCP hidden behind an open door or column is ineffective</li>
                <li>Use consistent height throughout the building for familiarity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong side of door:</strong> MCP should be on exit route side, not the side people evacuate from</li>
                <li><strong>Exceeding travel distance:</strong> Always check worst-case walking routes, not straight lines</li>
                <li><strong>Overly restrictive covers:</strong> Protection should deter, not prevent, activation</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
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
                <p className="font-medium text-white mb-1">Siting Requirements</p>
                <ul className="space-y-0.5">
                  <li>Height = 1.2 m to 1.4 m</li>
                  <li>Max travel distance = 45 m</li>
                  <li>Adjacent to final exits</li>
                  <li>On exit route side of doors</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Colour Coding</p>
                <ul className="space-y-0.5">
                  <li>Red = Fire alarm</li>
                  <li>Yellow = Gas release</li>
                  <li>Green = Door release</li>
                  <li>Blue = Special functions</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule2Section3;
