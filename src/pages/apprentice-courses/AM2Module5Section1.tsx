import { AlertTriangle, CheckCircle, Target, Search, Lightbulb, BookOpen, Wrench, Zap, Eye, Settings } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module5Section1 = () => {
  useSEO(
    "Typical Faults Set in the AM2 Assessment | AM2 Module 5 Section 1",
    "Master recognition and diagnosis of common electrical faults encountered in AM2 assessments. Learn symptoms, testing methods and what assessors expect."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "open-circuit",
      question: "What is the most common symptom of an open circuit fault?",
      options: [
        "Lights dimming",
        "Circuit completely dead, no power at all",
        "RCD tripping",
        "MCB tripping on overload"
      ],
      correctIndex: 1,
      explanation: "Open circuits break the electrical path completely, resulting in no power reaching the load."
    },
    {
      id: "high-resistance",
      question: "Which test would most likely detect a high resistance connection?",
      options: [
        "Insulation resistance test",
        "RCD test",
        "Continuity test showing higher than expected resistance",
        "Polarity test"
      ],
      correctIndex: 2,
      explanation: "High resistance connections show up as unexpectedly high readings during continuity testing."
    },
    {
      id: "short-circuit",
      question: "What happens when you test insulation resistance on a circuit with a short circuit fault?",
      options: [
        "Reading over 1MΩ",
        "Reading close to zero or very low resistance",
        "No reading at all",
        "Meter shows error"
      ],
      correctIndex: 1,
      explanation: "Short circuits provide a direct path between conductors, resulting in very low or zero insulation resistance."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the most common type of fault deliberately set in AM2 assessments?",
      options: ["High resistance connections", "Open circuit faults", "Short circuit faults", "Earth faults"],
      correctAnswer: 1,
      explanation: "Open circuit faults are most commonly set as they're realistic, safe to create, and easy for assessors to verify."
    },
    {
      id: 2,
      question: "If a circuit shows infinite resistance during insulation testing, what type of fault is likely present?",
      options: ["Short circuit", "Open circuit", "High resistance connection", "Earth fault"],
      correctAnswer: 1,
      explanation: "Open circuits break the path completely, so insulation testing between conductors shows infinite resistance."
    },
    {
      id: 3,
      question: "What would you expect to find during continuity testing on a high resistance connection?",
      options: ["Zero resistance", "Infinite resistance", "Higher than expected resistance reading", "Normal resistance reading"],
      correctAnswer: 2,
      explanation: "High resistance connections show elevated resistance readings during continuity testing."
    },
    {
      id: 4,
      question: "Where are open circuit faults typically introduced in AM2 setups?",
      options: ["Inside consumer units", "At junction boxes or connection points", "Within cables", "At the meter"],
      correctAnswer: 1,
      explanation: "Junction boxes and connection points are the safest and most realistic places to introduce open circuit faults."
    },
    {
      id: 5,
      question: "What is the main symptom of a short circuit fault?",
      options: ["No power to circuit", "Lights dimming", "Protective device operates (MCB trips)", "High resistance readings"],
      correctAnswer: 2,
      explanation: "Short circuits cause excessive current flow, which trips protective devices like MCBs or fuses."
    },
    {
      id: 6,
      question: "During RCD testing, what would indicate a possible earth fault?",
      options: ["RCD operates correctly", "RCD fails to operate", "RCD operates too quickly", "RCD test gives inconsistent results"],
      correctAnswer: 3,
      explanation: "Inconsistent RCD operation or unexpected tripping can indicate earth fault issues."
    },
    {
      id: 7,
      question: "What should you do if you discover a genuine fault during AM2 testing?",
      options: ["Fix it immediately", "Ignore it and continue", "Report it to the assessor", "Mark it as a deliberate fault"],
      correctAnswer: 2,
      explanation: "Any genuine faults discovered must be reported to the assessor immediately for safety."
    },
    {
      id: 8,
      question: "How are high resistance connections typically created in AM2 setups?",
      options: ["Cutting wires", "Loose terminals or poor connections", "Adding resistors", "Using wrong cable sizes"],
      correctAnswer: 1,
      explanation: "Loose terminals or deliberately poor connections create realistic high resistance faults."
    },
    {
      id: 9,
      question: "What's the key difference between open circuit and high resistance faults?",
      options: ["No difference", "Open circuit = no continuity, high resistance = poor continuity", "High resistance affects only live conductors", "Open circuits only occur in neutral conductors"],
      correctAnswer: 1,
      explanation: "Open circuits completely break continuity, while high resistance faults allow current flow but with increased resistance."
    },
    {
      id: 10,
      question: "True or false: All AM2 installations will have exactly one deliberate fault.",
      options: ["True", "False - there may be multiple faults", "True - but only in circuits under test", "False - some may have no faults"],
      correctAnswer: 1,
      explanation: "AM2 installations may contain multiple deliberate faults to thoroughly test diagnostic skills."
    }
  ];

  const learningOutcomes = [
    "Identify the most common types of faults set in AM2 assessments",
    "Recognise symptoms and testing methods for each fault type",
    "Understand where faults are typically located in test installations",
    "Apply systematic diagnosis techniques rather than random testing",
    "Know what assessors expect in fault-finding demonstrations"
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module5"
      breadcrumbs={[
        { label: "AM2", href: "/study-centre/apprentice/am2" },
        { label: "Module 5", href: "/study-centre/apprentice/am2/module5" },
        { label: "Section 1" }
      ]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Search}
        title="Typical Faults Set in the AM2 Assessment"
        description="The AM2 assessment deliberately includes electrical faults that you must identify, test, and document. These aren't random - they're carefully selected realistic faults that electricians encounter in the field."
        badge="Module 5 - Section 1"
      />

      {/* Additional Context */}
      <p className="text-ios-body text-white/80 leading-relaxed -mt-4 mb-6">
        Understanding common fault types, their symptoms, and appropriate testing methods is essential for AM2 success. Assessors want to see systematic diagnosis, not guesswork.
      </p>

      {/* Critical Warning */}
      <AM2CriticalWarning
        title="CRITICAL: Real vs Deliberate Faults"
        message="If you discover what appears to be a genuine safety fault (not a deliberate test fault), stop work immediately and report it to your assessor. Never assume all faults are deliberate. Your safety assessment skills are being tested - both in finding deliberate faults and recognising genuine hazards."
      />

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Common Fault Types */}
      <AM2ContentCard
        title="1. Common Fault Types in AM2"
        icon={Target}
        accent
      >
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-ios-headline text-white/90 mb-3">TOP 4 Fault Categories You Must Know:</h4>
          <ul className="space-y-3 text-ios-callout text-white/80">
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">1.</span>
              <span><strong className="text-white/90">Open Circuits:</strong> Complete break in conductor - circuit appears dead</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">2.</span>
              <span><strong className="text-white/90">High Resistance Connections:</strong> Poor joints - circuit works but resistance too high</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">3.</span>
              <span><strong className="text-white/90">Short Circuits:</strong> Direct L-N or L-E contact - protective devices trip</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">4.</span>
              <span><strong className="text-white/90">Polarity Errors:</strong> Incorrect connections - switches in neutral, reversed sockets</span>
            </li>
          </ul>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[0].id}
        question={quickCheckQuestions[0].question}
        options={quickCheckQuestions[0].options}
        correctIndex={quickCheckQuestions[0].correctIndex}
        explanation={quickCheckQuestions[0].explanation}
      />

      {/* How to Test for Each Fault Type */}
      <AM2ContentCard
        title="2. How to Test for Each Fault Type"
        icon={Eye}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Open Circuit Testing:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Primary test:</strong> Continuity between conductor ends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Expected result:</strong> Infinite resistance/no reading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Symptom:</strong> Circuit completely dead, no power</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Location:</strong> Half-split method at junction boxes</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">High Resistance Testing:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Primary test:</strong> Continuity with 200mA current</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Expected result:</strong> Higher than normal resistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Symptom:</strong> Circuit works but poor performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Also check:</strong> Earth fault loop impedance (Zs)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Short Circuit Testing:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Primary test:</strong> Insulation resistance L-N at 500V</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Expected result:</strong> Very low/zero reading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Symptom:</strong> MCB trips immediately when energised</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Safety:</strong> Never energise confirmed short circuits</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Earth Fault Testing:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Primary test:</strong> Insulation resistance L-E and N-E</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Expected result:</strong> Below 1MΩ to earth</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Symptom:</strong> RCD trips when circuit energised</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Also check:</strong> RCD sensitivity and operation time</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[1].id}
        question={quickCheckQuestions[1].question}
        options={quickCheckQuestions[1].options}
        correctIndex={quickCheckQuestions[1].correctIndex}
        explanation={quickCheckQuestions[1].explanation}
      />

      {/* Advanced Fault-Finding Techniques */}
      <AM2ContentCard
        title="3. Advanced Fault-Finding Techniques"
        icon={Lightbulb}
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3">The "Half-Split" Method:</h4>
            <p className="text-ios-callout text-white/70 mb-3">
              The most efficient way to locate faults in long circuits. Start testing at the midpoint, then eliminate half the circuit each time.
            </p>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span><strong className="text-white/90">Step 1:</strong> Test continuity from origin to circuit midpoint</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span><strong className="text-white/90">Step 2:</strong> If fault present, check first half; if clear, check second half</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span><strong className="text-white/90">Step 3:</strong> Repeat halving process until fault section isolated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span><strong className="text-white/90">Result:</strong> Locate fault in minimum number of tests</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-amber-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-amber-400 mb-3">Visual Inspection Priorities:</h4>
            <p className="text-ios-callout text-white/70 mb-3">
              Before touching test instruments, your eyes are your best diagnostic tool. Look for obvious issues first.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-ios-headline text-amber-400 mb-2">At Outlets:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Loose terminal screws</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Burned/discoloured terminals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Missing earth connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Incorrect wire positions</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-ios-headline text-amber-400 mb-2">In Junction Boxes:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Disconnected conductors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Poor strip connector joints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Exposed conductors touching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Wrong colour coding</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-red-400 mb-3">Dangerous Assumptions to Avoid:</h4>
            <ul className="text-ios-callout text-white/80 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span><strong className="text-white/90">Never assume</strong> all circuits are the same - test each individually</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span><strong className="text-white/90">Never assume</strong> cables follow logical routes - physically trace them</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span><strong className="text-white/90">Never assume</strong> colours indicate function - verify with testing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span><strong className="text-white/90">Never assume</strong> a circuit is dead - always test before working</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span><strong className="text-white/90">Never assume</strong> one fault = no other faults present</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Real-World Fault Scenarios */}
      <AM2ContentCard
        title="4. Real-World Fault Scenarios"
        icon={Wrench}
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-blue-400 mb-3">Scenario 1: "Lighting Circuit Dead"</h4>
            <div className="text-ios-callout text-white/70 space-y-2">
              <p><strong className="text-white/90">Customer complaint:</strong> "Half the downstairs lights stopped working this morning"</p>
              <p><strong className="text-white/90">Your observation:</strong> MCB hasn't tripped, other circuits working normally</p>
              <p><strong className="text-white/90">Likely fault:</strong> Open circuit in lighting final circuit</p>
              <p><strong className="text-white/90">Test approach:</strong> R1+R2 continuity from consumer unit to each light position</p>
              <p><strong className="text-white/90">Common location:</strong> Junction box under floorboards where cable has been damaged</p>
            </div>
          </div>

          <div className="bg-white/5 border border-orange-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-orange-400 mb-3">Scenario 2: "Socket Keeps Tripping RCD"</h4>
            <div className="text-ios-callout text-white/70 space-y-2">
              <p><strong className="text-white/90">Customer complaint:</strong> "RCD trips every time I plug anything into the kitchen socket"</p>
              <p><strong className="text-white/90">Your observation:</strong> RCD operates immediately, other sockets work fine</p>
              <p><strong className="text-white/90">Likely fault:</strong> Earth fault on that socket circuit</p>
              <p><strong className="text-white/90">Test approach:</strong> Insulation resistance L-E and N-E with socket isolated</p>
              <p><strong className="text-white/90">Common cause:</strong> Moisture ingress or damaged cable insulation</p>
            </div>
          </div>

          <div className="bg-white/5 border border-purple-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-purple-400 mb-3">Scenario 3: "Lights Work But Dim"</h4>
            <div className="text-ios-callout text-white/70 space-y-2">
              <p><strong className="text-white/90">Customer complaint:</strong> "Lights come on but they're much dimmer than normal"</p>
              <p><strong className="text-white/90">Your observation:</strong> All lights on circuit affected equally</p>
              <p><strong className="text-white/90">Likely fault:</strong> High resistance in neutral or live conductor</p>
              <p><strong className="text-white/90">Test approach:</strong> Line and neutral continuity tests with 200mA</p>
              <p><strong className="text-white/90">Common cause:</strong> Loose neutral connection in consumer unit or junction box</p>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Where NET Typically Places Faults */}
      <AM2ContentCard
        title="5. Where NET Typically Places Faults"
        icon={Settings}
      >
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-ios-headline text-white/90 mb-3">Most Common Locations:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ul className="text-ios-callout text-white/70 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Junction boxes:</strong> Easy assessor access, realistic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Socket outlets:</strong> Terminal connections visible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Light fittings:</strong> Switch and rose connections</span>
              </li>
            </ul>
            <ul className="text-ios-callout text-white/70 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Consumer unit:</strong> MCB and neutral bar connections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Cooker outlets:</strong> High current connections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong className="text-white/90">Motor controls:</strong> Stop/start and overload settings</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[2].id}
        question={quickCheckQuestions[2].question}
        options={quickCheckQuestions[2].options}
        correctIndex={quickCheckQuestions[2].correctIndex}
        explanation={quickCheckQuestions[2].explanation}
      />

      {/* What Assessors Look For */}
      <AM2ContentCard
        title="6. What Assessors Look For"
        icon={Eye}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3">What Assessors Want to See:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Systematic testing sequence - no random checking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Clear explanation of each test and its purpose</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Proper isolation procedures before all testing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Accurate documentation of all findings</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Professional Qualities Demonstrated:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Methodical diagnosis under assessment pressure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Safety prioritised throughout testing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Clear communication of technical findings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Logical reasoning from test results</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Professional Testing Techniques */}
      <AM2ContentCard
        title="7. Professional Testing Techniques"
        icon={Zap}
        accent
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3">Test Equipment Mastery:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-ios-headline text-green-400 mb-2">Continuity Testing:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Use 200mA test current for accurate results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Always null test leads first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Test from origin to each point individually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Record actual Ohm readings, not just pass/fail</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-ios-headline text-green-400 mb-2">Safe Isolation:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Test-Prove-Test sequence essential</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Two-pole voltage testing L-N and L-E</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>GS38 compliant test probes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Lock-off isolation points when possible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Industry-Standard Approach:</h4>
            <p className="text-ios-callout text-white/70 mb-3">
              Professional electricians follow this systematic sequence for any fault-finding scenario:
            </p>
            <ol className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">1.</span>
                <span><strong className="text-white/90">Visual inspection</strong> - Check obvious issues first (finds 70% of faults)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">2.</span>
                <span><strong className="text-white/90">Safe isolation</strong> - Proper isolation and proving procedures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">3.</span>
                <span><strong className="text-white/90">Dead testing</strong> - Continuity and insulation resistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">4.</span>
                <span><strong className="text-white/90">Live testing</strong> - Only when circuits proven safe</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">5.</span>
                <span><strong className="text-white/90">Documentation</strong> - Record results as you test</span>
              </li>
            </ol>
          </div>
        </div>
      </AM2ContentCard>

      {/* Section Summary */}
      <AM2ContentCard
        title="8. Section Summary: AM2 Fault-Finding Success"
        icon={BookOpen}
      >
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h4 className="text-ios-headline text-white/90 mb-3">Key Takeaways:</h4>
          <ul className="text-ios-callout text-white/70 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Most AM2 faults are open circuits - complete breaks in continuity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>High resistance connections show as elevated resistance readings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Short circuits cause protective devices to operate immediately</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Earth faults affect RCD operation and show low insulation to earth</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Systematic approach and clear communication are as important as technical skills</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/5 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow mb-3">Remember:</h4>
          <p className="text-ios-callout text-white/80">
            Fault-finding in AM2 demonstrates your professional competence. Assessors want to see safe, systematic diagnosis - the same skills you'll use as a qualified electrician.
          </p>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz
        title="Test Your Knowledge: AM2 Fault Types"
        questions={quizQuestions}
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        previousHref="/study-centre/apprentice/am2/module4/section6"
        previousLabel="Time Management"
        nextHref="/study-centre/apprentice/am2/module5/section2"
        nextLabel="Fault-Finding Techniques"
        currentSection={1}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module5Section1;
