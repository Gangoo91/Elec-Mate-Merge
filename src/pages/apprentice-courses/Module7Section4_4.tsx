import { ArrowLeft, ArrowRight, Search, CheckCircle, AlertTriangle, FileText, Users, Wrench, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="p-2 rounded-lg w-fit">
              <Search className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow w-fit">
              Section 7.4.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Dividing the Circuit into Zones (Split and Isolate)
          </h1>
          <p className="text-white text-sm sm:text-base">
            Systematic approach to fault location by dividing circuits into manageable sections for efficient diagnosis
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Splitting circuits into zones quickly narrows down fault locations.</li>
                <li>Halving the problem each time leads to efficient diagnosis.</li>
                <li>Essential for ring final circuits and large installations.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Spot it / Use it / Check</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Natural division points like junction boxes and distribution boards.</li>
                <li><strong>Use:</strong> Clear labelling and systematic record-keeping.</li>
                <li><strong>Check:</strong> Each zone individually to isolate faulty sections.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-white">
            <li>Describe what it means to split a circuit into zones.</li>
            <li>Explain how this method helps locate faults efficiently.</li>
            <li>Apply the principle to both small and large installations.</li>
            <li>Demonstrate proper labelling and recording techniques.</li>
            <li>Identify natural division points in various circuit types.</li>
          </ul>
        </Card>

        {/* Content - 4 main blocks with inline checks after each */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Content / Learning</h2>

          {/* Block 1: Concept - Halving Method */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-elec-yellow ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-4 text-base sm:text-lg">The Halving Method: Divide and Conquer</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    Dividing circuits into zones is essentially about halving the problem repeatedly. Instead of testing an entire circuit, electricians isolate sections and test each half separately, quickly determining which contains the fault.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Mathematical Efficiency of Zone Division</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Halving Progression</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• 1st division: 50% of circuit eliminated</li>
                            <li>• 2nd division: 75% eliminated (25% remaining)</li>
                            <li>• 3rd division: 87.5% eliminated (12.5% remaining)</li>
                            <li>• 4th division: 93.75% eliminated (6.25% remaining)</li>
                            <li>• Each step dramatically reduces search area</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Time Efficiency Benefits</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Exponential reduction in testing time</li>
                            <li>• Prevents exhaustive component checking</li>
                            <li>• Focuses effort on fault-containing sections</li>
                            <li>• Eliminates large portions quickly</li>
                            <li>• Suitable for circuits of any complexity</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Strategic Zone Selection Principles</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Logical Division Points</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Junction boxes and connection points</li>
                              <li>• Distribution board outgoing ways</li>
                              <li>• Mid-point accessible locations</li>
                              <li>• Natural circuit break positions</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Testing Strategy</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Test both halves to confirm fault location</li>
                              <li>• Isolate faulty half for further division</li>
                              <li>• Repeat process until exact fault found</li>
                              <li>• Document results at each stage</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Core principle:</strong> By halving the search area with each test, electricians can locate faults in large, complex circuits with remarkably few testing steps, making this the most efficient diagnostic method available.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />

          {/* Block 2: Ring Final Application */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-green-500 ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 text-base sm:text-lg">Ring Final Circuit Application</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    Ring final circuits are ideal for zone division testing. By disconnecting at strategic mid-points and testing each half independently, faults can be located with precision and minimal disruption.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Strategic Mid-Point Selection</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Optimal Division Points</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Socket outlet roughly halfway around ring</li>
                              <li>• Accessible junction boxes or connection points</li>
                              <li>• FCU (fused connection unit) locations</li>
                              <li>• Easily disconnectable termination points</li>
                              <li>• Avoid inconvenient or hard-to-reach locations</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Testing Procedure</p>
                            <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                              <li>Isolate circuit at consumer unit</li>
                              <li>Disconnect at chosen mid-point</li>
                              <li>Test continuity of each half separately</li>
                              <li>Identify which half contains the fault</li>
                              <li>Subdivide faulty half and repeat</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Interpreting Ring Final Test Results</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Healthy Half Results</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Continuity present on all conductors</li>
                            <li>• Resistance values within expected range</li>
                            <li>• No indication of damage or deterioration</li>
                            <li>• Can be eliminated from further investigation</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Faulty Half Indicators</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Open circuit readings on one or more conductors</li>
                            <li>• Abnormally high resistance values</li>
                            <li>• Intermittent continuity readings</li>
                            <li>• Requires further subdivision for precise location</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Progressive Fault Narrowing Process</p>
                      <div className="bg-[#121212]/30 p-3 rounded-lg">
                        <ul className="text-xs text-white space-y-1">
                          <li>• <strong>First division:</strong> Fault located to specific half of ring (50% reduction)</li>
                          <li>• <strong>Second division:</strong> Faulty half subdivided again (75% total elimination)</li>
                          <li>• <strong>Third division:</strong> Further subdivision narrows to small section (87.5% elimination)</li>
                          <li>• <strong>Final location:</strong> Fault pinpointed to specific cable run or connection</li>
                          <li>• <strong>Verification:</strong> Final testing confirms exact fault location and type</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Ring final advantage:</strong> The loop nature of ring circuits makes them ideal for zone division, as each half can be tested independently while maintaining circuit integrity for progressive fault location.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />

          {/* Block 3: Lighting and Large Installations */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-orange-500 ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-600 dark:text-elec-yellow mb-4 text-base sm:text-lg">Lighting Circuits and Large Installations</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    Zone division extends beyond ring finals to lighting circuits and large installations. Junction boxes, distribution boards, and sub-boards provide natural splitting points for systematic fault location.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Lighting Circuit Zone Division</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Natural Division Points</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Junction boxes between groups of lights</li>
                            <li>• Intermediate switch positions in two-way circuits</li>
                            <li>• Emergency lighting control points</li>
                            <li>• Floor or area distribution positions</li>
                            <li>• Isolator switch locations</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Testing Strategy</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Isolate groups of lighting points</li>
                            <li>• Test each group independently</li>
                            <li>• Identify non-functioning group</li>
                            <li>• Subdivide faulty group further</li>
                            <li>• Test individual circuits within group</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Large Installation Hierarchical Approach</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Distribution System Levels</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• <strong>Level 1:</strong> Main distribution board zones</li>
                              <li>• <strong>Level 2:</strong> Sub-distribution board areas</li>
                              <li>• <strong>Level 3:</strong> Floor or wing sections</li>
                              <li>• <strong>Level 4:</strong> Individual final circuits</li>
                              <li>• <strong>Level 5:</strong> Component-level testing</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Progressive Testing Method</p>
                            <ol className="text-xs text-white space-y-1 list-decimal pl-4">
                              <li>Test at highest level first (main DB)</li>
                              <li>Identify affected sub-distribution area</li>
                              <li>Isolate and test sub-board sections</li>
                              <li>Narrow to specific final circuit</li>
                              <li>Apply component-level fault location</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Commercial and Industrial Zone Planning</p>
                      <div className="bg-[#121212]/30 p-3 rounded-lg">
                        <ul className="text-xs text-white space-y-1">
                          <li>• <strong>Office buildings:</strong> Floor-by-floor or department-based zones</li>
                          <li>• <strong>Factories:</strong> Production line or process area divisions</li>
                          <li>• <strong>Retail spaces:</strong> Trading area or department zones</li>
                          <li>• <strong>Hospitals:</strong> Ward or department-based isolation</li>
                          <li>• <strong>Schools:</strong> Building or teaching area sections</li>
                          <li>• <strong>Data centres:</strong> Rack row or hall-based divisions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Large installation benefit:</strong> Natural hierarchical structure of large installations provides multiple logical division points, making zone-based fault location highly efficient for complex systems.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />

          {/* Block 4: Practical Guidance */}
          <section className="mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-purple-500 ">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-purple-600 dark:text-elec-yellow mb-4 text-base sm:text-lg">Practical Guidance and Safety Considerations</h3>
                  <p className="text-sm sm:text-base text-white mb-4">
                    Successful zone division requires meticulous labelling, careful record-keeping, and proper safety procedures. Working systematically with clear documentation prevents confusion and ensures safety.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-white mb-3">Essential Labelling and Documentation</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Labelling Requirements</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Mark each zone clearly with tape or labels</li>
                            <li>• Use consistent numbering or lettering system</li>
                            <li>• Indicate tested/untested status visually</li>
                            <li>• Label isolation points and connections</li>
                            <li>• Document division points on circuit diagrams</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/30 p-3 rounded-lg">
                          <p className="font-medium text-sm mb-2">Record-Keeping System</p>
                          <ul className="text-xs text-white space-y-1">
                            <li>• Zone identification and boundaries</li>
                            <li>• Test results for each zone (pass/fail)</li>
                            <li>• Time and sequence of testing</li>
                            <li>• Personnel involved in each test</li>
                            <li>• Isolation and reconnection details</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Working in Pairs for Complex Systems</p>
                      <div className="bg-[#121212]/30 p-4 rounded-lg">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-sm mb-2">Role Division</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• <strong>Tester:</strong> Carries out measurements and tests</li>
                              <li>• <strong>Recorder:</strong> Documents results and progress</li>
                              <li>• <strong>Both:</strong> Verify isolation and safety procedures</li>
                              <li>• <strong>Communication:</strong> Constant liaison on progress</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-sm mb-2">Benefits of Pair Working</p>
                            <ul className="text-xs text-white space-y-1">
                              <li>• Reduces errors and oversight</li>
                              <li>• Ensures systematic progression</li>
                              <li>• Provides safety backup and verification</li>
                              <li>• Improves accuracy of documentation</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-white mb-3">Safety and Isolation Procedures</p>
                      <div className="bg-[#121212]/30 p-3 rounded-lg">
                        <ul className="text-xs text-white space-y-1">
                          <li>• <strong>Safe isolation:</strong> Verify each zone is properly isolated before testing</li>
                          <li>• <strong>Proving unit:</strong> Test voltage indicators before and after each measurement</li>
                          <li>• <strong>Lockout/tagout:</strong> Secure isolation points to prevent accidental re-energisation</li>
                          <li>• <strong>PPE requirements:</strong> Appropriate protective equipment for each testing phase</li>
                          <li>• <strong>Communication:</strong> Clear communication with other personnel about testing activities</li>
                          <li>• <strong>Emergency procedures:</strong> Establish emergency stop and rescue procedures</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-xs sm:text-sm text-white bg-[#121212]/50 p-3 rounded border mt-4">
                    <strong>Critical success factor:</strong> The effectiveness of zone division depends entirely on systematic approach, clear labelling, and accurate record-keeping - these administrative tasks are as important as the technical testing itself.
                  </div>
                </div>
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
          <Separator className="my-6 sm:my-8" />
        </div>

        {/* Real-World Examples */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Real-World Examples</h2>
          
          <div className="grid gap-6 sm:gap-8">
            {/* Case Study 1 */}
            <div className="rounded-lg p-4 sm:p-6 border border-white/10 bg-[#121212]/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg ">
                  <FileText className="w-5 h-5 text-elec-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base sm:text-lg">Case Study 1: New-Build Housing Site Ring Final Circuit</h3>
                  <p className="text-sm text-white">CPC fault located through systematic halving</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Scenario</h4>
                  <p className="text-xs sm:text-sm text-white">
                    On a new-build housing site, a ring final circuit failed continuity testing during commissioning. The circuit served multiple socket outlets across a large property, making visual inspection impractical.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Zone Division Process</h4>
                  <div className="bg-[#121212]/50 p-3 rounded">
                    <ol className="text-xs sm:text-sm text-white space-y-1 list-decimal pl-4">
                      <li><strong>Initial division:</strong> Split circuit into two halves at consumer unit - one half tested correctly, other showed open circuit on CPC</li>
                      <li><strong>Second division:</strong> Faulty half split again at socket roughly midway along run - second half tested fine</li>
                      <li><strong>Final location:</strong> Fault narrowed to specific section between two sockets</li>
                      <li><strong>Fault identified:</strong> CPC not connected properly at one socket outlet</li>
                      <li><strong>Repair completed:</strong> Proper connection restored, full circuit retested successfully</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Time and Efficiency Benefits</h4>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-6">
                    <li>Fault located in under one hour using systematic division</li>
                    <li>Avoided testing every socket individually (would have taken much longer)</li>
                    <li>Prevented unnecessary damage to walls or installations</li>
                    <li>Clear documentation provided for quality control records</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="rounded-lg p-4 sm:p-6 border border-white/10 bg-[#121212]/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg ">
                  <Wrench className="w-5 h-5 text-elec-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base sm:text-lg">Case Study 2: Commercial Warehouse Lighting Failures</h3>
                  <p className="text-sm text-white">Zone isolation locates neutral conductor fault</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Scenario</h4>
                  <p className="text-xs sm:text-sm text-white">
                    A commercial warehouse reported frequent lighting failures affecting dozens of fittings across a large space. Random failures made pattern identification difficult.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Systematic Zone Approach</h4>
                  <div className="bg-[#121212]/50 p-3 rounded">
                    <ol className="text-xs sm:text-sm text-white space-y-1 list-decimal pl-4">
                      <li><strong>Level 1 division:</strong> Isolated one half of warehouse lighting at distribution board</li>
                      <li><strong>Fault identification:</strong> Problems only occurred in isolated half, confirming fault location</li>
                      <li><strong>Level 2 division:</strong> Further divided faulty half into smaller zones using sub-circuits</li>
                      <li><strong>Final location:</strong> Narrowed fault to specific junction box serving affected area</li>
                      <li><strong>Root cause:</strong> Loose neutral conductor in junction box caused intermittent failures</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Alternative Scenario Without Zone Division</h4>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-6">
                    <li>Testing each individual light fitting would have taken days</li>
                    <li>Random fault pattern made visual inspection ineffective</li>
                    <li>Zone division identified fault area within hours</li>
                    <li>Prevented extensive disruption to warehouse operations</li>
                    <li>Clear methodology provided confidence in repair effectiveness</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-medium text-white mb-2 text-sm sm:text-base">{faq.question}</h3>
                <p className="text-white text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="mb-8 p-4 sm:p-6 border border-border/40">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Dividing the circuit into zones, or splitting and isolating, is a methodical way of locating faults in large or complex installations. By testing each half of the circuit separately, electricians can quickly determine which part contains the fault. The process is repeated, narrowing down the faulty zone until the exact fault location is found. This approach saves time, avoids unnecessary work, and ensures accuracy in diagnosis.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Knowledge: Zone Division and Fault Isolation" />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="sm:hidden">Previous</span>
              <span className="hidden sm:inline">Previous: Testing One Component at a Time</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../4-5">
              <span className="sm:hidden">Next</span>
              <span className="hidden sm:inline">Next: Section 4.5</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section4_4;