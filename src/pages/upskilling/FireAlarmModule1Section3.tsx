import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "M Category Systems (Manual) - Fire Alarm Module 1 Section 3";
const DESCRIPTION = "Learn about BS 5839-1 M category manual fire alarm systems: when they are appropriate, limitations, and compliance requirements.";

const quickCheckQuestions = [
  {
    id: "m-category-components",
    question: "What does an M category fire alarm system consist of?",
    options: [
      "Automatic smoke detectors throughout",
      "Manual call points and alarm sounders only",
      "Heat detectors on escape routes",
      "Beam detectors in open spaces"
    ],
    correctIndex: 1,
    explanation: "M category systems rely on manual call points (MCPs) and sounders only, with no automatic detection."
  },
  {
    id: "m-category-appropriate",
    question: "A small office has 6 staff working 9-5 in an open-plan layout. At night and weekends the office is empty. Is M category appropriate?",
    options: [
      "Yes, it is a small low-risk office",
      "No, the premises are unoccupied outside working hours",
      "Yes, if manual call points are provided at exits",
      "Only if the fire brigade agrees"
    ],
    correctIndex: 1,
    explanation: "M alone may not be appropriate as the premises are unoccupied outside working hours. An L category with automatic detection would provide protection when the building is empty."
  },
  {
    id: "m-upgrade-required",
    question: "An office with M category is converting to a boutique hotel with 8 bedrooms. What action is required?",
    options: [
      "No change needed",
      "Add more call points only",
      "Upgrade to at least L2 with automatic detection for sleeping accommodation",
      "Remove the system entirely"
    ],
    correctIndex: 2,
    explanation: "The M system must be upgraded to at least L2 (probably L1) to provide automatic detection for sleeping accommodation. The existing MCPs can remain as part of the upgraded system."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does an M category fire alarm system consist of?",
    options: [
      "Automatic smoke detectors throughout",
      "Manual call points and alarm sounders only",
      "Heat detectors on escape routes",
      "Beam detectors in open spaces"
    ],
    correctAnswer: 1,
    explanation: "M category systems rely on manual call points (MCPs) and sounders only, with no automatic detection."
  },
  {
    id: 2,
    question: "In which type of premises might M category be acceptable?",
    options: [
      "Hotels with sleeping accommodation",
      "Continuously occupied, low-risk, small premises",
      "Large warehouses with high-value stock",
      "Care homes with vulnerable occupants"
    ],
    correctAnswer: 1,
    explanation: "M category may be suitable where risk is low, space is continuously occupied, and occupants can quickly raise the alarm."
  },
  {
    id: 3,
    question: "M category is NOT suitable where:",
    options: [
      "Occupants are continuously present",
      "The fire risk is low",
      "Sleeping accommodation exists",
      "The building is single-storey"
    ],
    correctAnswer: 2,
    explanation: "Sleeping risk requires automatic detection as occupants may not be awake to discover and report a fire."
  },
  {
    id: 4,
    question: "What is the main limitation of M category systems?",
    options: [
      "Too expensive to install",
      "Relies on human detection and action to raise alarm",
      "Cannot include sounders",
      "Not permitted under Building Regulations"
    ],
    correctAnswer: 1,
    explanation: "M systems depend entirely on humans noticing a fire and activating a call point, delaying warning until discovery."
  },
  {
    id: 5,
    question: "Manual call points in M systems should be located:",
    options: [
      "Only at the main entrance",
      "On escape routes, especially near exits and floor landings",
      "In plant rooms only",
      "Outside the building"
    ],
    correctAnswer: 1,
    explanation: "MCPs should be positioned on escape routes so occupants can raise the alarm while evacuating."
  },
  {
    id: 6,
    question: "What maximum travel distance to a call point does BS 5839-1 recommend?",
    options: [
      "15 metres",
      "30 metres",
      "45 metres",
      "60 metres"
    ],
    correctAnswer: 2,
    explanation: "BS 5839-1 recommends MCPs be positioned so that no one needs to travel more than 45m to reach one."
  },
  {
    id: 7,
    question: "For M category, what audibility level should sounders achieve?",
    options: [
      "55 dB(A)",
      "60 dB(A)",
      "65 dB(A) minimum, 75 dB(A) for sleeping risk",
      "No specific requirement"
    ],
    correctAnswer: 2,
    explanation: "Sounders must achieve 65 dB(A) minimum throughout, or 75 dB(A) at bed head level where sleeping risk exists."
  },
  {
    id: 8,
    question: "Can M category be combined with other categories?",
    options: [
      "No, M must be used alone",
      "Yes, often combined with L or P for additional automatic detection",
      "Only with P1",
      "Only in industrial premises"
    ],
    correctAnswer: 1,
    explanation: "M is often combined with L or P categories - MCPs supplement automatic detection for manual alarm raising."
  },
  {
    id: 9,
    question: "Weekly testing of M category systems should include:",
    options: [
      "Testing all call points at once",
      "Testing at least one different call point each week on rotation",
      "No testing is required",
      "Only testing sounders"
    ],
    correctAnswer: 1,
    explanation: "At least one MCP should be tested weekly, rotating through all call points over time."
  },
  {
    id: 10,
    question: "If a building currently has M category but changes to sleeping use, what is required?",
    options: [
      "No change needed",
      "Upgrade to an appropriate L category with automatic detection",
      "Add more call points only",
      "Remove the system entirely"
    ],
    correctAnswer: 1,
    explanation: "Sleeping accommodation requires automatic detection - the system must be upgraded to L1, L2, or appropriate L category."
  }
];

const faqs = [
  {
    question: "Is M category ever used on its own in modern buildings?",
    answer: "Rarely - most buildings now require some automatic detection. M is often combined with L or P categories."
  },
  {
    question: "Can I add a few smoke detectors to an M system?",
    answer: "Yes - this would make it a combined category. Document clearly which areas have automatic detection."
  },
  {
    question: "Do MCPs need to be glass break type?",
    answer: "Not necessarily - resettable MCPs are available. Glass break remains common and familiar to users."
  },
  {
    question: "What is the minimum number of MCPs for M category?",
    answer: "No fixed minimum - positioning is based on travel distance (45m max) and exit/landing locations."
  },
  {
    question: "If my building is M category, does weekly testing apply?",
    answer: "Yes - all fire alarm categories require weekly testing of at least one call point."
  },
  {
    question: "Can B&B accommodation use M category?",
    answer: "No - any sleeping accommodation requires automatic detection (L category)."
  }
];

const FireAlarmModule1Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-module-1">
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
            <span>Module 1 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            M Category Systems (Manual)
          </h1>
          <p className="text-white/80">
            Understanding when manual-only fire alarm systems are appropriate
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>M category:</strong> Manual call points + sounders only</li>
              <li><strong>No automatic:</strong> Detection relies on humans</li>
              <li><strong>Suitable:</strong> Low-risk, continuously occupied premises</li>
              <li><strong>Not suitable:</strong> Sleeping accommodation or unoccupied periods</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Sleeping risk = M not suitable</li>
              <li><strong>Use:</strong> 45m max travel to any MCP</li>
              <li><strong>Apply:</strong> Review when building use changes</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define the components of an M category system",
              "Identify when M category is appropriate",
              "Explain the limitations of manual-only systems",
              "Understand MCP positioning requirements",
              "Apply sounder audibility requirements",
              "Recognise when M must be upgraded to L category"
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

        {/* Section 01: What Is M Category? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Is M Category?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              M category is a manual-only fire alarm system consisting of manual call points (MCPs), alarm sounders, and a fire alarm control panel. There is no automatic detection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">M Category Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Manual Call Points (MCPs) - break glass units</li>
                <li>Alarm sounders throughout the building</li>
                <li>Fire alarm control panel</li>
                <li>NO automatic detection (smoke/heat detectors)</li>
              </ul>
            </div>

            <p>
              The system relies entirely on human detection - someone must see, smell, or otherwise notice a fire and then manually activate a call point.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: When Is M Category Appropriate? */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            When Is M Category Appropriate?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              M category may be acceptable where all of the following apply:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Suitability Criteria:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Low fire risk</strong> - minimal fire load and ignition sources</li>
                <li><strong>Continuously occupied</strong> - people present to detect fire</li>
                <li><strong>Simple layout</strong> - fire visible from occupied areas</li>
                <li><strong>No sleeping</strong> - occupants awake and alert</li>
                <li><strong>Trained occupants</strong> - know how to raise alarm</li>
              </ul>
            </div>

            <p>
              Typical examples include small single-storey offices with open-plan layout and constant staff presence.
            </p>
          </div>
        </section>

        {/* Section 03: When M Category Is NOT Suitable */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            When M Category Is NOT Suitable
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">M Category Is NOT Suitable When:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Sleeping accommodation exists (hotels, care homes, HMOs)</li>
                <li>Premises are unoccupied for periods</li>
                <li>High fire risk areas are not visible</li>
                <li>Phased evacuation is required</li>
                <li>Vulnerable occupants who need early warning</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: MCP Positioning Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            MCP Positioning Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Manual call points must be positioned so occupants can easily reach one while evacuating.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Positioning Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maximum 45m travel distance to nearest MCP</li>
                <li>At each final exit from the building</li>
                <li>At each floor level landing of stairways</li>
                <li>Mounted at 1.4m height (centre of device)</li>
                <li>Clearly visible and accessible</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: Sounder Audibility Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Sounder Audibility Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Alarm sounders must achieve adequate sound levels throughout the building.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Audibility Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>65 dB(A) minimum throughout occupied areas</li>
                <li>75 dB(A) at bed head level (sleeping risk)</li>
                <li>5 dB above ambient background noise</li>
                <li>VADs for hearing-impaired where required</li>
              </ul>
            </div>

            <p>
              Even M systems with no sleeping risk must achieve 65 dB(A) minimum throughout.
            </p>
          </div>
        </section>

        {/* Section 06: When M Must Be Upgraded */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            When M Must Be Upgraded
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              M category must be upgraded to an L category when:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Upgrade Triggers:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Building use changes to include sleeping</li>
                <li>Risk assessment identifies higher fire risk</li>
                <li>Premises become unoccupied for periods</li>
                <li>Building layout changes with hidden fire risks</li>
                <li>Fire strategy or insurer requires automatic detection</li>
              </ul>
            </div>

            <p>
              Any upgrade must be formally designed, certified, and documented.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Suitability</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always question whether M is truly appropriate - err on the side of automatic detection</li>
                <li>Document the justification for M category clearly in design documentation</li>
                <li>Review M category suitability whenever building use or occupancy changes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Weekly test - activate one MCP (rotate through all)</li>
                <li>Record in logbook - date, time, MCP tested, result</li>
                <li>6-monthly service by competent person</li>
                <li>Annual inspection of all components</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Specifying M to save cost</strong> - when automatic detection is needed</li>
                <li><strong>Not upgrading when building use changes</strong> - to include sleeping</li>
                <li><strong>Assuming small or simple means M is suitable</strong> - always assess properly</li>
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
                <p className="font-medium text-white mb-1">M Category Summary</p>
                <ul className="space-y-0.5">
                  <li>MCPs + sounders only</li>
                  <li>No automatic detection</li>
                  <li>45m max travel to MCP</li>
                  <li>65 dB(A) minimum audibility</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Points</p>
                <ul className="space-y-0.5">
                  <li>Sleeping risk = upgrade required</li>
                  <li>Weekly testing mandatory</li>
                  <li>Review when use changes</li>
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

export default FireAlarmModule1Section3;
