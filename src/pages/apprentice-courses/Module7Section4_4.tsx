import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Dividing the Circuit into Zones (Split and Isolate) - Module 7.4.4 | Level 2 Electrical Course";
const DESCRIPTION = "Systematic approach to fault location by dividing circuits into manageable sections for efficient diagnosis.";

// Inline check questions
const quickCheckQuestions = [
  {
        id: "1",
    question: "What does splitting and isolating a circuit mean?",
    options: ["Testing everything at once", "Dividing the circuit into sections and testing each separately", "Replacing all components", "Using different test equipment"],
    correctIndex: 1,
    explanation: "Splitting and isolating means dividing the circuit into sections or 'zones' and testing each separately to quickly narrow down fault locations."
  },
  {
        id: "2",
    question: "How can this method be applied to a ring final circuit?",
    options: ["Test all sockets simultaneously", "Disconnect at mid-point and test each half separately", "Replace all sockets", "Test only at consumer unit"],
    correctIndex: 1,
    explanation: "In a ring final circuit, disconnect at the mid-point and test each half separately. The faulty half is then divided again until the exact fault location is found."
  },
  {
        id: "3",
    question: "How should zones be created in large commercial installations?",
    options: ["Random sections", "Using distribution boards and sub-boards as natural division points", "Equal length sections only", "Single component divisions"],
    correctIndex: 1,
    explanation: "In large installations, use distribution boards or sub-boards as natural points for dividing and testing sections, as they provide logical circuit separation points."
  },
  {
        id: "4",
    question: "Why is accurate labelling essential during split-and-isolate testing?",
    options: ["For decoration", "To track which sections have been tested and avoid confusion", "To meet regulations", "To use more equipment"],
    correctIndex: 1,
    explanation: "Accurate labelling is essential to track which sections have been tested and which remain unchecked, preventing confusion and ensuring systematic progression."
  }
];

const Module7Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What does splitting and isolating a circuit mean?",
      options: [
        "Testing all components together",
        "Testing parts of a circuit separately instead of all at once",
        "Replacing faulty components",
        "Using multiple test instruments"
      ],
      correctAnswer: 1,
      explanation: "Splitting and isolating means testing parts of a circuit separately instead of all at once, which helps narrow down fault locations systematically."
    },
    {
      id: 2,
      question: "Why does dividing the circuit help in fault diagnosis?",
      options: [
        "It uses less equipment",
        "It halves the problem each time, quickly narrowing down the fault location",
        "It's required by regulations",
        "It prevents damage to components"
      ],
      correctAnswer: 1,
      explanation: "Dividing the circuit halves the problem each time, quickly narrowing down the fault location by eliminating sections that test correctly."
    },
    {
      id: 3,
      question: "How can this method be applied to a ring final circuit?",
      options: [
        "Test all sockets at once",
        "Disconnect at mid-point and test each half separately",
        "Replace all socket outlets",
        "Test only the consumer unit"
      ],
      correctAnswer: 1,
      explanation: "In a ring final circuit, disconnect at the mid-point and test each half separately. The faulty half is then divided again until the exact location is found."
    },
    {
      id: 4,
      question: "What fault was found in the real-world housing site example?",
      options: [
        "Faulty consumer unit",
        "Broken cable in the wall",
        "CPC not connected properly at a socket",
        "Damaged socket outlet"
      ],
      correctAnswer: 2,
      explanation: "The fault was a CPC (circuit protective conductor) that had not been connected properly at a socket, discovered through systematic splitting and testing."
    },
    {
      id: 5,
      question: "Why is record-keeping important during split-and-isolate testing?",
      options: [
        "For regulatory compliance only",
        "To avoid confusion and track which areas have been tested",
        "To increase testing time",
        "To use more paperwork"
      ],
      correctAnswer: 1,
      explanation: "Record-keeping is essential to avoid confusion and track which areas have been tested and which remain unchecked during systematic fault location."
    },
    {
      id: 6,
      question: "Can this method be applied to lighting circuits?",
      options: [
        "No, only for power circuits",
        "Yes, by splitting at junction boxes or isolating groups of lights",
        "Only in commercial installations",
        "Only for emergency lighting"
      ],
      correctAnswer: 1,
      explanation: "Yes, this method applies to lighting circuits by splitting the run at junction boxes or isolating groups of lights to narrow down fault locations."
    },
    {
      id: 7,
      question: "True or False: Splitting and isolating only works on small domestic installations.",
      options: [
        "True - only for small installations",
        "False - it works on installations of all sizes",
        "True - large installations need different methods",
        "False - only for industrial systems"
      ],
      correctAnswer: 1,
      explanation: "False. Splitting and isolating works effectively on installations of all sizes, from small domestic circuits to large industrial systems."
    },
    {
      id: 8,
      question: "How should zones be created in large commercial installations?",
      options: [
        "Random equal sections",
        "Using distribution boards or sub-boards as natural division points",
        "Single component zones only",
        "Based on cable length only"
      ],
      correctAnswer: 1,
      explanation: "In large installations, use distribution boards or sub-boards as natural points for dividing and testing sections, as they provide logical circuit separation."
    },
    {
      id: 9,
      question: "What is the main advantage of splitting circuits into zones?",
      options: [
        "Uses less test equipment",
        "Quickly narrows down fault location by halving the problem",
        "Eliminates the need for documentation",
        "Reduces safety requirements"
      ],
      correctAnswer: 1,
      explanation: "The main advantage is quickly narrowing down fault location by halving the problem each time, leading to efficient fault diagnosis."
    },
    {
      id: 10,
      question: "In the warehouse example, what fault was located using this method?",
      options: [
        "Faulty distribution board",
        "Loose neutral conductor in a junction box",
        "Damaged light fittings",
        "Incorrect cable sizing"
      ],
      correctAnswer: 1,
      explanation: "The fault was a loose neutral conductor in a junction box, quickly located by dividing the warehouse lighting into zones and testing systematically."
    }
  ];

  const faqs = [
    {
      question: "What does dividing a circuit into zones mean?",
      answer: "Testing parts of a circuit separately instead of all at once."
    },
    {
      question: "Why is this method effective?",
      answer: "It halves the problem each time, quickly narrowing down the fault location."
    },
    {
      question: "Is it only used for ring circuits?",
      answer: "No. It applies to all circuits, including lighting and large installations."
    },
    {
      question: "What is essential when using this method?",
      answer: "Accurate labelling and recording of test results to avoid confusion."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 4</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Search className="w-4 h-4" />
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 4.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Dividing the Circuit into Zones
            </h1>
            <p className="text-white/70 text-lg">
              Split and Isolate Method
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Splitting circuits into zones quickly narrows down fault locations</li>
              <li>• Halving the problem each time leads to efficient diagnosis</li>
              <li>• Essential for ring final circuits and large installations</li>
              <li>• Use clear labelling and systematic record-keeping</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2">
              <li>• Describe what it means to split a circuit into zones</li>
              <li>• Explain how this method helps locate faults efficiently</li>
              <li>• Apply the principle to both small and large installations</li>
              <li>• Demonstrate proper labelling and recording techniques</li>
              <li>• Identify natural division points in various circuit types</li>
            </ul>
          </section>

          {/* Block 1: Concept - Halving Method */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              The Halving Method: Divide and Conquer
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Dividing circuits into zones is essentially about halving the problem repeatedly. Instead of testing an entire circuit, electricians isolate sections and test each half separately, quickly determining which contains the fault.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Mathematical Efficiency of Zone Division</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Halving Progression</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• 1st division: 50% of circuit eliminated</li>
                      <li>• 2nd division: 75% eliminated</li>
                      <li>• 3rd division: 87.5% eliminated</li>
                      <li>• 4th division: 93.75% eliminated</li>
                      <li>• Each step dramatically reduces search area</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Time Efficiency Benefits</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Exponential reduction in testing time</li>
                      <li>• Prevents exhaustive component checking</li>
                      <li>• Focuses effort on fault-containing sections</li>
                      <li>• Eliminates large portions quickly</li>
                      <li>• Suitable for circuits of any complexity</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Strategic Zone Selection Principles</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Logical Division Points</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Junction boxes and connection points</li>
                      <li>• Distribution board outgoing ways</li>
                      <li>• Mid-point accessible locations</li>
                      <li>• Natural circuit break positions</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Testing Strategy</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Test both halves to confirm fault location</li>
                      <li>• Isolate faulty half for further division</li>
                      <li>• Repeat process until exact fault found</li>
                      <li>• Document results at each stage</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm text-white/80">
                  <strong className="text-white">Core principle:</strong> By halving the search area with each test, electricians can locate faults in large, complex circuits with remarkably few testing steps, making this the most efficient diagnostic method available.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="m7-4-4-b1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Block 2: Ring Final Application */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Ring Final Circuit Application
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Ring final circuits are ideal for zone division testing. By disconnecting at strategic mid-points and testing each half independently, faults can be located with precision and minimal disruption.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Strategic Mid-Point Selection</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Optimal Division Points</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Socket outlet roughly halfway around ring</li>
                      <li>• Accessible junction boxes or connection points</li>
                      <li>• FCU (fused connection unit) locations</li>
                      <li>• Easily disconnectable termination points</li>
                      <li>• Avoid inconvenient or hard-to-reach locations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Testing Procedure</p>
                    <ol className="text-sm text-white/70 space-y-1 list-decimal pl-4">
                      <li>Isolate circuit at consumer unit</li>
                      <li>Disconnect at chosen mid-point</li>
                      <li>Test continuity of each half separately</li>
                      <li>Identify which half contains the fault</li>
                      <li>Subdivide faulty half and repeat</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Interpreting Ring Final Test Results</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Healthy Half Results</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Continuity present on all conductors</li>
                      <li>• Resistance values within expected range</li>
                      <li>• No indication of damage or deterioration</li>
                      <li>• Can be eliminated from further investigation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Faulty Half Indicators</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Open circuit readings on one or more conductors</li>
                      <li>• Abnormally high resistance values</li>
                      <li>• Intermittent continuity readings</li>
                      <li>• Requires further subdivision for precise location</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Progressive Fault Narrowing Process</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• <strong className="text-white/90">First division:</strong> Fault located to specific half of ring (50% reduction)</li>
                  <li>• <strong className="text-white/90">Second division:</strong> Faulty half subdivided again (75% total elimination)</li>
                  <li>• <strong className="text-white/90">Third division:</strong> Further subdivision narrows to small section (87.5% elimination)</li>
                  <li>• <strong className="text-white/90">Final location:</strong> Fault pinpointed to specific cable run or connection</li>
                  <li>• <strong className="text-white/90">Verification:</strong> Final testing confirms exact fault location and type</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm text-white/80">
                  <strong className="text-white">Ring final advantage:</strong> The loop nature of ring circuits makes them ideal for zone division, as each half can be tested independently while maintaining circuit integrity for progressive fault location.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="m7-4-4-b2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Block 3: Lighting and Large Installations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Lighting Circuits and Large Installations
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Zone division extends beyond ring finals to lighting circuits and large installations. Junction boxes, distribution boards, and sub-boards provide natural splitting points for systematic fault location.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Lighting Circuit Zone Division</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Natural Division Points</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Junction boxes between groups of lights</li>
                      <li>• Intermediate switch positions in two-way circuits</li>
                      <li>• Emergency lighting control points</li>
                      <li>• Floor or area distribution positions</li>
                      <li>• Isolator switch locations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Testing Strategy</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Isolate groups of lighting points</li>
                      <li>• Test each group independently</li>
                      <li>• Identify non-functioning group</li>
                      <li>• Subdivide faulty group further</li>
                      <li>• Test individual circuits within group</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Large Installation Hierarchical Approach</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Distribution System Levels</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• <strong className="text-white/90">Level 1:</strong> Main distribution board zones</li>
                      <li>• <strong className="text-white/90">Level 2:</strong> Sub-distribution board areas</li>
                      <li>• <strong className="text-white/90">Level 3:</strong> Floor or wing sections</li>
                      <li>• <strong className="text-white/90">Level 4:</strong> Individual final circuits</li>
                      <li>• <strong className="text-white/90">Level 5:</strong> Component-level testing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Progressive Testing Method</p>
                    <ol className="text-sm text-white/70 space-y-1 list-decimal pl-4">
                      <li>Test at highest level first (main DB)</li>
                      <li>Identify affected sub-distribution area</li>
                      <li>Isolate and test sub-board sections</li>
                      <li>Narrow to specific final circuit</li>
                      <li>Apply component-level fault location</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Commercial and Industrial Zone Planning</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• <strong className="text-white/90">Office buildings:</strong> Floor-by-floor or department-based zones</li>
                  <li>• <strong className="text-white/90">Factories:</strong> Production line or process area divisions</li>
                  <li>• <strong className="text-white/90">Retail spaces:</strong> Trading area or department zones</li>
                  <li>• <strong className="text-white/90">Hospitals:</strong> Ward or department-based isolation</li>
                  <li>• <strong className="text-white/90">Schools:</strong> Building or teaching area sections</li>
                  <li>• <strong className="text-white/90">Data centres:</strong> Rack row or hall-based divisions</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm text-white/80">
                  <strong className="text-white">Large installation benefit:</strong> Natural hierarchical structure of large installations provides multiple logical division points, making zone-based fault location highly efficient for complex systems.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="m7-4-4-b3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Block 4: Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Practical Guidance and Safety Considerations
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Successful zone division requires meticulous labelling, careful record-keeping, and proper safety procedures. Working systematically with clear documentation prevents confusion and ensures safety.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Essential Labelling and Documentation</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Labelling Requirements</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Mark each zone clearly with tape or labels</li>
                      <li>• Use consistent numbering or lettering system</li>
                      <li>• Indicate tested/untested status visually</li>
                      <li>• Label isolation points and connections</li>
                      <li>• Document division points on circuit diagrams</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Record-Keeping System</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Zone identification and boundaries</li>
                      <li>• Test results for each zone (pass/fail)</li>
                      <li>• Time and sequence of testing</li>
                      <li>• Personnel involved in each test</li>
                      <li>• Isolation and reconnection details</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Working in Pairs for Complex Systems</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Role Division</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• <strong className="text-white/90">Tester:</strong> Carries out measurements and tests</li>
                      <li>• <strong className="text-white/90">Recorder:</strong> Documents results and progress</li>
                      <li>• <strong className="text-white/90">Both:</strong> Verify isolation and safety procedures</li>
                      <li>• <strong className="text-white/90">Communication:</strong> Constant liaison on progress</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Benefits of Pair Working</p>
                    <ul className="text-sm text-white/70 space-y-1">
                      <li>• Reduces errors and oversight</li>
                      <li>• Ensures systematic progression</li>
                      <li>• Provides safety backup and verification</li>
                      <li>• Improves accuracy of documentation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Safety and Isolation Procedures</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• <strong className="text-white/90">Safe isolation:</strong> Verify each zone is properly isolated before testing</li>
                  <li>• <strong className="text-white/90">Proving unit:</strong> Test voltage indicators before and after each measurement</li>
                  <li>• <strong className="text-white/90">Lockout/tagout:</strong> Secure isolation points to prevent accidental re-energisation</li>
                  <li>• <strong className="text-white/90">PPE requirements:</strong> Appropriate protective equipment for each testing phase</li>
                  <li>• <strong className="text-white/90">Communication:</strong> Clear communication with other personnel about testing activities</li>
                  <li>• <strong className="text-white/90">Emergency procedures:</strong> Establish emergency stop and rescue procedures</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm text-white/80">
                  <strong className="text-white">Critical success factor:</strong> The effectiveness of zone division depends entirely on systematic approach, clear labelling, and accurate record-keeping - these administrative tasks are as important as the technical testing itself.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="m7-4-4-b4"
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Real-World Examples
            </h2>
            <div className="space-y-6">
              {/* Case Study 1 */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Case Study 1: New-Build Housing Site Ring Final Circuit</h3>
                <p className="text-sm text-white/60 mb-4">CPC fault located through systematic halving</p>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Scenario</p>
                    <p className="text-sm text-white/70">
                      On a new-build housing site, a ring final circuit failed continuity testing during commissioning. The circuit served multiple socket outlets across a large property, making visual inspection impractical.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Zone Division Process</p>
                    <ol className="text-sm text-white/70 space-y-1 list-decimal pl-4">
                      <li><strong className="text-white/90">Initial division:</strong> Split circuit into two halves at consumer unit - one half tested correctly, other showed open circuit on CPC</li>
                      <li><strong className="text-white/90">Second division:</strong> Faulty half split again at socket roughly midway along run - second half tested fine</li>
                      <li><strong className="text-white/90">Final location:</strong> Fault narrowed to specific section between two sockets</li>
                      <li><strong className="text-white/90">Fault identified:</strong> CPC not connected properly at one socket outlet</li>
                      <li><strong className="text-white/90">Repair completed:</strong> Proper connection restored, full circuit retested successfully</li>
                    </ol>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Time and Efficiency Benefits</p>
                    <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
                      <li>Fault located in under one hour using systematic division</li>
                      <li>Avoided testing every socket individually (would have taken much longer)</li>
                      <li>Prevented unnecessary damage to walls or installations</li>
                      <li>Clear documentation provided for quality control records</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-2">Case Study 2: Commercial Warehouse Lighting Failures</h3>
                <p className="text-sm text-white/60 mb-4">Zone isolation locates neutral conductor fault</p>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Scenario</p>
                    <p className="text-sm text-white/70">
                      A commercial warehouse reported frequent lighting failures affecting dozens of fittings across a large space. Random failures made pattern identification difficult.
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Systematic Zone Approach</p>
                    <ol className="text-sm text-white/70 space-y-1 list-decimal pl-4">
                      <li><strong className="text-white/90">Level 1 division:</strong> Isolated one half of warehouse lighting at distribution board</li>
                      <li><strong className="text-white/90">Fault identification:</strong> Problems only occurred in isolated half, confirming fault location</li>
                      <li><strong className="text-white/90">Level 2 division:</strong> Further divided faulty half into smaller zones using sub-circuits</li>
                      <li><strong className="text-white/90">Final location:</strong> Narrowed fault to specific junction box serving affected area</li>
                      <li><strong className="text-white/90">Root cause:</strong> Loose neutral conductor in junction box caused intermittent failures</li>
                    </ol>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white/90 mb-2">Benefits</p>
                    <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
                      <li>Testing each individual light fitting would have taken days</li>
                      <li>Zone division identified fault area within hours</li>
                      <li>Prevented extensive disruption to warehouse operations</li>
                      <li>Clear methodology provided confidence in repair effectiveness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80">
                Dividing the circuit into zones, or splitting and isolating, is a methodical way of locating faults in large or complex installations. By testing each half of the circuit separately, electricians can quickly determine which part contains the fault. The process is repeated, narrowing down the faulty zone until the exact fault location is found. This approach saves time, avoids unnecessary work, and ensures accuracy in diagnosis.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test Your Knowledge: Zone Division and Fault Isolation" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Previous: Testing Components</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-5">
                <span className="hidden sm:inline">Next: Interpreting Test Readings</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section4_4;
