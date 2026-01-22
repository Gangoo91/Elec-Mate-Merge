/**
 * Level 3 Module 5 Section 6.2 - Investigating Faults Identified During Testing
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Investigating Faults Identified During Testing - Level 3 Module 5 Section 6.2";
const DESCRIPTION = "Master systematic fault investigation techniques including half-split methods, logical diagnosis, and safe investigation procedures for electrical faults.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the 'half-split' method of fault finding?",
    options: [
      "Testing half the circuits each day",
      "Dividing the circuit in half and testing each section to locate the fault",
      "Using half the test voltage",
      "Testing with two people"
    ],
    correctIndex: 1,
    explanation: "The half-split method involves disconnecting the circuit at its midpoint and testing each half. If the fault is in one half, subdivide that half and repeat. This rapidly narrows down fault location, especially on long cable runs."
  },
  {
    id: "check-2",
    question: "Before investigating a fault, what must you always confirm first?",
    options: [
      "The client is available",
      "You have the correct spare parts",
      "The circuit is safely isolated and proved dead",
      "The weather conditions"
    ],
    correctIndex: 2,
    explanation: "Safety first - always confirm the circuit is isolated and proved dead before investigating. Even if you isolated it earlier, re-prove before working. Use a voltage indicator, prove-test-prove methodology."
  },
  {
    id: "check-3",
    question: "A fault causes low insulation resistance between L and E. Where is the most likely fault location?",
    options: [
      "At the main switch",
      "At a point where the line conductor contacts earth - damaged cable, wet accessory, faulty equipment",
      "In the neutral conductor",
      "At the electricity meter"
    ],
    correctIndex: 1,
    explanation: "Low IR between L-E indicates insulation breakdown between the line conductor and earth. Common causes: damaged cable where line touches armouring/CPC, moisture in accessories, or connected equipment with internal faults to earth."
  },
  {
    id: "check-4",
    question: "When investigating an open circuit fault, what test would you use?",
    options: [
      "Insulation resistance",
      "Earth fault loop impedance",
      "Continuity testing",
      "RCD testing"
    ],
    correctIndex: 2,
    explanation: "An open circuit means a break in the conductor path. Continuity testing (low resistance ohmmeter) is used to identify where the path is broken. You can trace the cable and test sections to locate the break point."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What information should you gather before starting fault investigation?",
    options: [
      "Only the circuit number",
      "Symptoms, when fault occurred, what changed, circuit details, any patterns",
      "Just the address",
      "Only the test results"
    ],
    correctAnswer: 1,
    explanation: "Gather comprehensive information: what symptoms appeared, when did the fault start, did anything change recently, circuit details and history, any patterns (time-based, load-related). This guides your investigation strategy."
  },
  {
    id: 2,
    question: "A circuit trips its MCB immediately upon energisation. What type of fault does this typically indicate?",
    options: [
      "Open circuit",
      "High resistance joint",
      "Short circuit or earth fault",
      "Overload fault"
    ],
    correctAnswer: 2,
    explanation: "Immediate tripping indicates a short circuit (L-N) or earth fault (L-E) that draws sufficient current to trip the device instantly. Overloads typically cause tripping under load, and open circuits prevent operation but don't trip MCBs."
  },
  {
    id: 3,
    question: "How does the half-split method speed up fault location?",
    options: [
      "By using faster test equipment",
      "By reducing the search area by 50% with each test iteration",
      "By testing two circuits at once",
      "By using two testers"
    ],
    correctAnswer: 1,
    explanation: "Each test eliminates half the circuit from investigation. A 100m cable run needs at most 7 tests to locate a fault (100, 50, 25, 12.5, 6.25, 3.12, 1.56m). This is far faster than testing from one end incrementally."
  },
  {
    id: 4,
    question: "An intermittent fault only occurs when the installation is under load. How would you investigate?",
    options: [
      "Only test when isolated",
      "Simulate load conditions, check for loose connections that worsen under thermal expansion",
      "Assume the fault isn't real",
      "Replace all components"
    ],
    correctAnswer: 1,
    explanation: "Load-related intermittent faults often involve loose connections that conduct adequately when cold but fail when heated. Investigate connections, look for signs of overheating (discolouration), and consider thermal imaging if available."
  },
  {
    id: 5,
    question: "What safety precaution is essential when tracing cables?",
    options: [
      "Working alone",
      "Using a cable avoidance tool (CAT) before drilling or penetrating walls",
      "Assuming cable routes are obvious",
      "Only checking visible cables"
    ],
    correctAnswer: 1,
    explanation: "Before drilling or cutting into walls/floors to access cables, use a cable avoidance tool (CAT) to locate buried cables. Striking live cables can cause serious injury or death. Also check for other services (gas, water)."
  },
  {
    id: 6,
    question: "A ring circuit shows correct r1 and rn values but r2 is approximately double expected. What fault does this indicate?",
    options: [
      "Short circuit on line",
      "Open circuit on CPC (earth) ring - break in protective conductor",
      "Open circuit on line",
      "Short to earth"
    ],
    correctAnswer: 1,
    explanation: "In a complete ring, end-to-end resistance should be similar for all conductors. If r2 is double, the CPC ring is broken somewhere - current has to travel the full length rather than half. The L and N rings remain intact."
  },
  {
    id: 7,
    question: "What tool can help locate cable faults without exposing the entire cable?",
    options: [
      "A hammer",
      "A cable fault locator or time domain reflectometer (TDR)",
      "A standard multimeter",
      "A voltage tester"
    ],
    correctAnswer: 1,
    explanation: "Cable fault locators and TDRs can identify fault location distance along a cable by measuring signal reflection or impedance changes. This avoids exposing the entire cable run - you dig at the indicated fault location."
  },
  {
    id: 8,
    question: "When investigating, you find severe discolouration at a connection. What does this indicate?",
    options: [
      "Normal aging",
      "Overheating due to loose connection or overload",
      "Water damage",
      "Manufacturing defect"
    ],
    correctAnswer: 1,
    explanation: "Discolouration (browning, blackening) indicates overheating. This typically results from loose connections (high resistance generating heat) or sustained overloading. The connection and potentially cables need replacement."
  },
  {
    id: 9,
    question: "A fault is suspected in underground cable. What initial investigation can you perform?",
    options: [
      "Dig up the entire cable",
      "Insulation resistance and continuity tests, then fault location equipment if needed",
      "Assume the cable is fine",
      "Only visual inspection is possible"
    ],
    correctAnswer: 1,
    explanation: "Start with IR and continuity tests from accessible points to confirm and characterise the fault. If testing confirms a cable fault, use fault location equipment (TDR, fault locator) to pinpoint the location before excavating."
  },
  {
    id: 10,
    question: "What should you document during fault investigation?",
    options: [
      "Nothing - just fix it",
      "Tests performed, readings obtained, fault location, cause identified, actions taken",
      "Only the final fix",
      "Just the time spent"
    ],
    correctAnswer: 1,
    explanation: "Document the investigation process: tests performed and results, how the fault was located, what caused it, and what corrective action was taken. This provides an audit trail and helps if similar faults occur."
  },
  {
    id: 11,
    question: "An RCD trips sporadically with no obvious pattern. How would you investigate?",
    options: [
      "Replace the RCD immediately",
      "Check for earth leakage sources, moisture, connected equipment, and cumulative leakage",
      "Assume it's faulty",
      "Disconnect the RCD"
    ],
    correctAnswer: 1,
    explanation: "Sporadic RCD tripping suggests intermittent earth leakage. Investigate: moisture ingress (varies with weather), faulty connected equipment, cumulative leakage near the 30mA threshold, or the RCD itself. Disconnect loads systematically to identify the source."
  },
  {
    id: 12,
    question: "After locating a fault, what should you consider before repair?",
    options: [
      "Just fix it as quickly as possible",
      "Why the fault occurred - to prevent recurrence and identify any related issues",
      "Only cost of repair",
      "Whether the client can live with it"
    ],
    correctAnswer: 1,
    explanation: "Understanding why the fault occurred prevents recurrence. Was it installation error, environmental damage, overloading, or component failure? Address root causes. Also check if the fault could have caused damage elsewhere."
  }
];

const faqs = [
  {
    question: "How do I know if a fault is in the fixed wiring or connected equipment?",
    answer: "Disconnect all equipment and test the fixed wiring alone. If the fault persists, it's in the fixed wiring. If it clears, reconnect equipment one by one, testing each time, to identify the faulty equipment."
  },
  {
    question: "What causes nuisance tripping of MCBs?",
    answer: "Nuisance tripping can result from: inrush currents (motors, transformers, LEDs), circuits near their rated capacity, ambient temperature effects on MCBs, or faulty MCBs. Investigate the load profile and consider whether the circuit design is adequate."
  },
  {
    question: "How long should fault investigation take?",
    answer: "This varies greatly depending on fault complexity and accessibility. Simple faults may take minutes; complex intermittent faults in inaccessible locations may take hours. Communicate with the client about expected timescales and any additional costs."
  },
  {
    question: "What if I can't locate a fault?",
    answer: "Document your investigation, record all test results, and describe what you've ruled out. Seek assistance from more experienced colleagues or specialists. Never fabricate a 'fix' if you haven't found the real fault."
  },
  {
    question: "Should I repair a fault I find during testing of a new installation?",
    answer: "Generally yes - you're responsible for the installation being compliant. However, if the fault relates to work by others (previous electrician, other trades damaging cables), document this and discuss with the client about responsibility and additional costs."
  },
  {
    question: "How do I investigate faults in three-phase systems?",
    answer: "Apply the same principles but consider phase relationships. Check individual phases, test phase-to-phase and phase-to-neutral. Unbalanced loads, single-phasing, and neutral faults have specific characteristics. Three-phase testers help characterise these faults."
  }
];

const Level3Module5Section6_2 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <Link to="/study-centre/apprentice/level3-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Safety:</strong> Always prove dead before investigating</li>
              <li><strong>Information:</strong> Gather symptoms and history first</li>
              <li><strong>Method:</strong> Use half-split for efficient location</li>
              <li><strong>Document:</strong> Record all findings and actions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Symptoms, test results, physical evidence</li>
              <li><strong>Use:</strong> Systematic elimination techniques</li>
              <li><strong>Apply:</strong> Find root cause, not just symptoms</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Investigation Approach */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Systematic Investigation Approach
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective fault investigation follows a logical process. Random troubleshooting wastes time and may miss the real fault. A systematic approach ensures you find and fix the actual problem, not just a symptom.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Investigation steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Gather information:</strong> Symptoms, history, when it started, what changed</li>
                <li><strong>2. Analyse:</strong> What type of fault could cause these symptoms?</li>
                <li><strong>3. Isolate safely:</strong> Prove dead before hands-on investigation</li>
                <li><strong>4. Test systematically:</strong> Use half-split or other efficient methods</li>
                <li><strong>5. Locate precisely:</strong> Narrow down to exact fault location</li>
                <li><strong>6. Identify cause:</strong> Understand why the fault occurred</li>
                <li><strong>7. Rectify:</strong> Repair properly, addressing root cause</li>
                <li><strong>8. Verify:</strong> Retest to confirm successful repair</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Think First</p>
                <p className="text-white/90 text-xs">Analyse before touching</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Work Safely</p>
                <p className="text-white/90 text-xs">Isolate and prove dead</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The symptoms tell you about the fault. Low IR between L-E means line-to-earth breakdown. Open circuit continuity means broken conductor. Match symptoms to likely causes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Safety During Investigation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safety During Investigation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fault investigation often requires accessing parts of installations that might otherwise remain untouched. Maintain rigorous safety practices throughout, especially when dealing with unknown fault conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Before Investigation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Isolate the circuit properly</li>
                  <li>Prove dead at point of work</li>
                  <li>Lock off where possible</li>
                  <li>Display warning notices</li>
                  <li>Use insulated tools</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">During Investigation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Re-prove if you leave and return</li>
                  <li>Assume other circuits are live</li>
                  <li>Use CAT before drilling/penetrating</li>
                  <li>Watch for stored energy (capacitors)</li>
                  <li>Be aware of other services</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">If live testing is required:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Only if absolutely necessary and dead testing cannot achieve the objective</li>
                <li>Use appropriate PPE and insulated tools</li>
                <li>Work with a second person if possible</li>
                <li>Have emergency procedures in place</li>
                <li>Be competent in live working requirements</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Warning:</strong> Some faults (intermittent, load-related) may require energised investigation. This should be a last resort, performed only by those competent in live working, with proper risk assessment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Common Fault Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Fault Types and Symptoms
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding fault types helps you interpret test results and focus investigation. Different faults produce distinctive symptoms in testing and operation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Short Circuit (L-N)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>MCB/fuse operates immediately</li>
                  <li>Very low resistance L-N</li>
                  <li>Damaged insulation between conductors</li>
                  <li>Often at accessories or damage points</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earth Fault (L-E or N-E)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>RCD trips or MCB operates</li>
                  <li>Low IR between affected conductors</li>
                  <li>Line or neutral contacting earth</li>
                  <li>Moisture, damage, or equipment fault</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Open Circuit</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Circuit doesn't work</li>
                  <li>Infinite/very high continuity reading</li>
                  <li>Broken conductor or poor connection</li>
                  <li>Located by section testing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">High Resistance Joint</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Intermittent operation, overheating</li>
                  <li>Higher than expected resistance</li>
                  <li>Loose or corroded connections</li>
                  <li>Shows discolouration/damage</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Tip:</strong> The test that revealed the fault often indicates the fault type. Low IR L-E = earth fault. Open circuit continuity = break in conductor. Match the test to the fault type.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Location Techniques */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fault Location Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once you've identified the fault type, use appropriate techniques to locate its precise position. The half-split method is particularly efficient for faults in cable runs.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Half-split method:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1.</strong> Access the circuit at its approximate midpoint</li>
                <li><strong>2.</strong> Disconnect and test each half separately</li>
                <li><strong>3.</strong> The faulty half will show the abnormal reading</li>
                <li><strong>4.</strong> Subdivide the faulty half and repeat</li>
                <li><strong>5.</strong> Continue until you've pinpointed the fault</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">100m Run</p>
                <p className="text-white/90 text-xs">Max 7 tests to locate</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">50m Run</p>
                <p className="text-white/90 text-xs">Max 6 tests to locate</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">10m Run</p>
                <p className="text-white/90 text-xs">Max 4 tests to locate</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Other techniques:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Sequential testing:</strong> Test from one end towards the other (slower but simpler)</li>
                <li><strong>Equipment isolation:</strong> Disconnect equipment to identify if fault is in wiring or equipment</li>
                <li><strong>Thermal imaging:</strong> Identifies hot spots from high resistance joints</li>
                <li><strong>Cable locators:</strong> Trace cable routes and identify damage locations</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Fault on 80m SWA cable. Test at 40m - fault in first half. Test at 20m - fault in second quarter. Test at 30m - fault between 20m and 30m. A few more tests pinpoint to within 1-2m.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Information Gathering Questions</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>When did the problem first occur?</li>
                <li>Did anything change before it started?</li>
                <li>Is it constant or intermittent?</li>
                <li>Does it relate to specific times, weather, or loads?</li>
                <li>Have any repairs been attempted?</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Signs of Faults</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Discolouration - overheating at connections</li>
                <li>Burning smell - insulation breakdown</li>
                <li>Arc marks - flashover damage</li>
                <li>Moisture - source of earth faults</li>
                <li>Physical damage - cable struck, crushed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Investigation Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing:</strong> Take time to gather information first</li>
                <li><strong>Assumptions:</strong> Test to verify, don't assume</li>
                <li><strong>Ignoring safety:</strong> Always prove dead</li>
                <li><strong>Treating symptoms:</strong> Find the root cause</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Fault Type Indicators</p>
                <ul className="space-y-0.5">
                  <li>Low IR L-E: Earth fault on line</li>
                  <li>Low IR L-N: Short circuit</li>
                  <li>Open continuity: Broken conductor</li>
                  <li>High Zs: Loose/poor connections</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Half-Split Benefits</p>
                <ul className="space-y-0.5">
                  <li>Reduces search area 50% each test</li>
                  <li>Logarithmic efficiency (log2 tests)</li>
                  <li>Works for any cable length</li>
                  <li>Minimises access requirements</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section6-6-3">
              Next: Rectification and Repair
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section6_2;
