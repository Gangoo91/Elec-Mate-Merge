import { BookOpen, CheckCircle, AlertTriangle, Zap, Shield, Calculator, FileText, Lightbulb, Eye } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import useSEO from "@/hooks/useSEO";

const AM2Module6Section2 = () => {
  useSEO(
    "Core Topics Covered (Regs, Science, Safety) | AM2 Module 6 Section 2",
    "Essential knowledge areas for AM2 online test - regulations, electrical science, and safety requirements with practical examples"
  );

  const learningOutcomes = [
    "Identify the three main categories of knowledge assessed: regulations, science, and safety",
    "Explain the specific regulation topics most likely to appear",
    "Recall key scientific principles relevant to electrical installation",
    "Understand the safety requirements that form the backbone of AM2 knowledge",
    "Prioritise revision effectively based on NET's published expectations"
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "insulation-resistance",
      question: "What is the minimum acceptable insulation resistance for a circuit in AM2?",
      options: [
        "0.5 MO",
        "1 MO",
        "2 MO",
        "5 MO"
      ],
      correctIndex: 1,
      explanation: "The minimum acceptable insulation resistance for a circuit is 1 MO according to BS 7671."
    },
    {
      id: "safe-isolation-regulation",
      question: "Which regulation makes safe isolation a legal requirement?",
      options: [
        "BS 7671",
        "CDM Regulations 2015",
        "Electricity at Work Regulations 1989",
        "Health and Safety at Work Act 1974"
      ],
      correctIndex: 2,
      explanation: "The Electricity at Work Regulations 1989 make safe isolation a legal duty for all electrical work."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the minimum acceptable insulation resistance value?",
      options: ["0.5 MO", "1 MO", "2 MO", "5 MO"],
      correctAnswer: 1,
      explanation: "1 MO is the minimum acceptable insulation resistance value for circuits."
    },
    {
      id: 2,
      question: "Which of these is NOT a key regulation topic tested in AM2?",
      options: ["Maximum Zs values", "RCD requirements", "Bathroom zones", "Cable colour codes"],
      correctAnswer: 3,
      explanation: "Cable colour codes are not a key regulation topic in AM2 - focus on Zs values, RCDs, and zones."
    },
    {
      id: 3,
      question: "State Ohm's law in formula form:",
      options: ["P = VI", "V = IR", "P = I squared R", "I = V/R"],
      correctAnswer: 1,
      explanation: "Ohm's law states that Voltage = Current x Resistance (V = IR)."
    },
    {
      id: 4,
      question: "A 2 kW heater on 230 V supply draws how many amps?",
      options: ["6.7 A", "8.7 A", "10.2 A", "12.5 A"],
      correctAnswer: 1,
      explanation: "Using P = VI, therefore I = P/V = 2000/230 = 8.7 A approximately."
    },
    {
      id: 5,
      question: "What's the maximum disconnection time for a socket circuit?",
      options: ["0.2 seconds", "0.4 seconds", "5 seconds", "No requirement"],
      correctAnswer: 1,
      explanation: "Socket circuits require disconnection within 0.4 seconds under BS 7671."
    },
    {
      id: 6,
      question: "Which regulation makes safe isolation a legal duty?",
      options: ["BS 7671", "EAWR 1989", "CDM 2015", "HASAWA 1974"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 make safe isolation legally mandatory."
    },
    {
      id: 7,
      question: "What is the difference between line and phase voltage in three-phase?",
      options: ["Line is 1.732 times phase", "Phase is 1.732 times line", "They are equal", "Line is twice phase"],
      correctAnswer: 0,
      explanation: "In three-phase systems, line voltage is 1.732 times the phase voltage."
    },
    {
      id: 8,
      question: "Which TWO are examples of PPE relevant to electrical work?",
      options: ["Safety boots and hard hat", "Voltage detector and multimeter", "Isolation locks and tags", "Risk assessment forms"],
      correctAnswer: 0,
      explanation: "Safety boots and hard hats are Personal Protective Equipment (PPE) for electrical work."
    },
    {
      id: 9,
      question: "True or false: The AM2 knowledge test is open book.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - the AM2 knowledge test is closed book, you cannot use BS 7671 during the exam."
    },
    {
      id: 10,
      question: "What are the three core categories of questions in the online test?",
      options: ["Theory, practical, safety", "Regulations, science, safety", "Installation, testing, maintenance", "Design, install, inspect"],
      correctAnswer: 1,
      explanation: "The three core categories are regulations (BS 7671), electrical science, and safety."
    }
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module6"
      breadcrumbs={["AM2", "Module 6", "Section 2"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={BookOpen}
        title="Core Topics Covered (Regs, Science, Safety)"
        description="The AM2 online knowledge test checks whether you can apply electrical theory, regulations, and safety knowledge to real-world practice. It's not just memory - questions are designed to see if you understand principles and can use BS 7671, science, and safety rules in practical contexts. Knowing the core subject areas makes revision focused and efficient."
        badge="Module 6 • Section 2"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning title="CRITICAL: Focus Your Revision">
        <p className="text-ios-callout text-white/80 mb-2">
          The AM2 knowledge test covers three specific areas. Trying to revise everything will waste time and reduce your chances of success.
        </p>
        <p className="text-ios-callout text-white/90 font-medium">
          Focus on these core topics: Regulations (BS 7671), Electrical Science, and Safety. These form 100% of the test content.
        </p>
      </AM2CriticalWarning>

      {/* Learning Outcomes */}
      <AM2ContentCard accent>
        <AM2LearningOutcomes outcomes={learningOutcomes} />
      </AM2ContentCard>

      {/* Regulations Section */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          1. Regulations (BS 7671 Knowledge)
        </h2>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <p className="text-white/80">
            The test includes questions from the IET Wiring Regulations. You don't have the book in the exam, so you need to recall core principles and specific values from memory.
          </p>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Key Regulation Areas:</h3>
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Maximum Zs values for protective devices:</strong> Know the specific values for different MCB types and RCBOs</li>
            <li>- <strong className="text-white">RCD requirements:</strong> Where they must be fitted, trip times (30mA/0.3s), and applications</li>
            <li>- <strong className="text-white">Bathroom zones and IP ratings:</strong> Zone 0, 1, 2 boundaries and required IP protection levels</li>
            <li>- <strong className="text-white">Cable sizing principles:</strong> Volt drop limitations, current carrying capacity, and grouping factors</li>
            <li>- <strong className="text-white">Earthing and bonding requirements:</strong> Main equipotential bonding, supplementary bonding, and conductor sizes</li>
            <li>- <strong className="text-white">Inspection & testing sequence:</strong> GN3 order and specific test procedures</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Common Regulation Question Types:</h3>
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">"What is the maximum Zs value for..."</strong> - Direct recall of tabulated values</li>
            <li>- <strong className="text-white">"Where must RCDs be fitted?"</strong> - Application requirements from Part 7</li>
            <li>- <strong className="text-white">"What IP rating is required in..."</strong> - Special location requirements</li>
            <li>- <strong className="text-white">"What is the maximum volt drop permitted?"</strong> - Design criteria from Appendix 4</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Essential Values to Memorise:</h3>
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Maximum Zs values:</strong> 7.28O (6A Type B), 2.73O (16A Type B), 1.37O (32A Type B)</li>
            <li>- <strong className="text-white">Bathroom zones:</strong> Zone 0 (inside bath), Zone 1 (above bath to 2.25m), Zone 2 (0.6m from Zone 1)</li>
            <li>- <strong className="text-white">Volt drop limits:</strong> 3% (lighting), 5% (other uses), from origin of installation</li>
            <li>- <strong className="text-white">RCD ratings:</strong> 30mA for socket outlets, 0.3s maximum disconnection time</li>
            <li>- <strong className="text-white">Insulation resistance:</strong> Minimum 1MO between live conductors and earth</li>
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

      {/* Electrical Science Section */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          2. Electrical Science
        </h2>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <p className="text-white/80">
            Science questions test whether you understand the fundamental principles behind electrical behaviour. These aren't advanced calculations but core concepts that underpin all electrical work.
          </p>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Essential Scientific Principles:</h3>
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Ohm's Law (V = IR):</strong> The fundamental relationship between voltage, current, and resistance</li>
            <li>- <strong className="text-white">Power calculations:</strong> P = VI (apparent power), P = I squared R (power loss in resistance)</li>
            <li>- <strong className="text-white">Resistance combinations:</strong> Series (R1 + R2 + R3), Parallel (1/R = 1/R1 + 1/R2 + 1/R3)</li>
            <li>- <strong className="text-white">Effects of current:</strong> Heating effect (I squared Rt), magnetic effect (motor action)</li>
            <li>- <strong className="text-white">Units and conversions:</strong> Amps, volts, watts, ohms, kilowatts, kilowatt-hours</li>
            <li>- <strong className="text-white">Three-phase fundamentals:</strong> Line voltage = 1.732 x phase voltage (400V/230V relationship)</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Typical Science Questions:</h3>
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">"A 3kW heater operates at 230V. What current does it draw?"</strong> Answer: I = P/V = 3000/230 = 13A</li>
            <li>- <strong className="text-white">"What is the total resistance of 4O and 6O in parallel?"</strong> Answer: 1/R = 1/4 + 1/6 = 2.4O</li>
            <li>- <strong className="text-white">"If voltage doubles and resistance stays constant, what happens to power?"</strong> Answer: Power increases 4 times (P = V squared/R)</li>
            <li>- <strong className="text-white">"Convert 2.5kW to watts"</strong> Answer: 2500W (multiply by 1000)</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Key Formulas to Know by Heart:</h3>
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Ohm's Law:</strong> V = IR, I = V/R, R = V/I</li>
            <li>- <strong className="text-white">Power:</strong> P = VI, P = I squared R, P = V squared/R</li>
            <li>- <strong className="text-white">Energy:</strong> E = Pt (Energy = Power x time in hours = kWh)</li>
            <li>- <strong className="text-white">Three-phase:</strong> Line voltage = 1.732 x Phase voltage (1.732 x 230V = 400V)</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Calculation Tips:</h3>
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">No calculator allowed:</strong> Practice mental arithmetic and use round numbers for estimates</li>
            <li>- <strong className="text-white">Check your units:</strong> Ensure answers make practical sense (e.g., domestic current rarely exceeds 50A)</li>
            <li>- <strong className="text-white">Use elimination:</strong> Obviously wrong answers help narrow down correct options</li>
            <li>- <strong className="text-white">Know common values:</strong> 13A for 3kW at 230V, 2.5mm squared cable = 27A current capacity</li>
          </ul>
        </div>
      </AM2ContentCard>

      {/* Health & Safety Section */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          3. Health & Safety
        </h2>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed">
          <p className="text-white/80">
            The knowledge test checks your understanding of legal and safe working practices. Safety questions are not just about knowing procedures but understanding why they exist and when they apply.
          </p>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Key Safety Legislation:</h3>
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Electricity at Work Regulations (EAWR) 1989:</strong> Legal framework for electrical safety</li>
            <li>- <strong className="text-white">Risk assessments and method statements (RAMS):</strong> Required planning for all electrical work</li>
            <li>- <strong className="text-white">Safe isolation procedures:</strong> The 10-step sequence for making installations safe</li>
            <li>- <strong className="text-white">PPE requirements:</strong> Selection and use of appropriate personal protective equipment</li>
            <li>- <strong className="text-white">Manual handling:</strong> Safe lifting and moving of electrical equipment</li>
            <li>- <strong className="text-white">Working at height and confined spaces:</strong> Additional safety requirements for special environments</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">EAWR 1989 Key Regulations:</h3>
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Regulation 4:</strong> Systems, work activities and protective equipment must be constructed, maintained and used to prevent danger</li>
            <li>- <strong className="text-white">Regulation 12:</strong> Adequate precautions must be taken to prevent electrical equipment becoming electrically charged</li>
            <li>- <strong className="text-white">Regulation 13:</strong> Adequate precautions must be taken to prevent danger from work on or near live conductors</li>
            <li>- <strong className="text-white">Regulation 14:</strong> No work on live equipment except where safe to do so and reasonably practicable</li>
          </ul>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Safe Isolation Sequence:</h3>
          <ol className="space-y-2 ml-4 text-white/80 list-decimal list-inside">
            <li>Identify circuit to be worked on</li>
            <li>Identify means of isolation</li>
            <li>Isolate the circuit</li>
            <li>Secure isolation (lock/tag)</li>
            <li>Test voltage indicator on known live supply</li>
            <li>Test voltage indicator on circuit to be worked</li>
            <li>Test voltage indicator on known live supply again</li>
            <li>Begin work only if tests confirm dead circuit</li>
            <li>Complete work safely</li>
            <li>Remove isolation and restore supply</li>
          </ol>

          <h3 className="text-base sm:text-lg font-semibold text-elec-yellow mt-6 mb-3">Essential PPE for Electrical Work:</h3>
          <ul className="space-y-2 ml-4 text-white/80">
            <li>- <strong className="text-white">Safety footwear:</strong> Insulated boots/shoes to prevent electric shock</li>
            <li>- <strong className="text-white">Hard hat:</strong> Protection from falling objects and head impact</li>
            <li>- <strong className="text-white">Safety glasses:</strong> Eye protection from arcing and debris</li>
            <li>- <strong className="text-white">Insulated tools:</strong> Tools rated for electrical work (1000V rating)</li>
            <li>- <strong className="text-white">Voltage indicator:</strong> Properly maintained and tested proving unit</li>
            <li>- <strong className="text-white">High-visibility clothing:</strong> When working in areas with vehicle movement</li>
          </ul>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[1].id}
        question={quickCheckQuestions[1].question}
        options={quickCheckQuestions[1].options}
        correctIndex={quickCheckQuestions[1].correctIndex}
        explanation={quickCheckQuestions[1].explanation}
      />

      {/* Question Style Examples */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          4. Question Style Examples in Core Topics
        </h2>

        <div className="space-y-4">
          <div className="bg-blue-950/20 border border-blue-800/30 rounded-lg p-4">
            <h4 className="font-medium text-blue-200 mb-2">Regulations Example</h4>
            <div className="bg-blue-900/30 rounded p-3 text-sm text-blue-300">
              <strong>Question:</strong> "What is the maximum disconnection time for a socket circuit under BS 7671?"<br/>
              <strong>Answer:</strong> 0.4 seconds (for TN systems)
            </div>
          </div>

          <div className="bg-green-950/20 border border-green-800/30 rounded-lg p-4">
            <h4 className="font-medium text-green-200 mb-2">Science Example</h4>
            <div className="bg-green-900/30 rounded p-3 text-sm text-green-300">
              <strong>Question:</strong> "If a heater is rated at 2 kW on a 230 V supply, what current will it draw?"<br/>
              <strong>Calculation:</strong> I = P/V = 2000/230 = 8.7A
            </div>
          </div>

          <div className="bg-purple-950/20 border border-purple-800/30 rounded-lg p-4">
            <h4 className="font-medium text-purple-200 mb-2">Safety Example</h4>
            <div className="bg-purple-900/30 rounded p-3 text-sm text-purple-300">
              <strong>Question:</strong> "Which document sets out your duty to carry out a risk assessment?"<br/>
              <strong>Answer:</strong> The Management of Health and Safety at Work Regulations 1999
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Practical Guidance */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Practical Guidance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-950/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-green-200">
                <strong>Make revision checklists:</strong> Create separate lists for each category to track your progress
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-950/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-blue-200">
                <strong>Practice science problems:</strong> Calculate quickly without a calculator until it becomes automatic
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-950/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-purple-200">
                <strong>Memorise critical values:</strong> Zs values, RCD times, bathroom zones must be recalled instantly
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-orange-950/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-orange-200">
                <strong>Revise safety regulations:</strong> EAWR questions appear frequently and are high-scoring
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-red-950/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
              <p className="text-sm text-red-200">
                <strong>Use mock questions:</strong> Build confidence under exam conditions with timed practice tests
              </p>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Real-world Examples */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Real-world Examples
        </h2>

        <div className="space-y-4">
          <div className="bg-red-950/20 border-l-4 border-l-red-500 p-4 rounded-r-lg">
            <h4 className="font-medium text-red-200 mb-2">Example 1: Weak Science Knowledge</h4>
            <p className="text-sm text-elec-yellow">
              Candidate didn't revise science, failed questions on resistance and Ohm's law - missed pass mark by 3%.
            </p>
          </div>

          <div className="bg-green-950/20 border-l-4 border-green-500 p-4 rounded-r-lg">
            <h4 className="font-medium text-green-200 mb-2">Example 2: Smart Memorisation</h4>
            <p className="text-sm text-green-300">
              Candidate memorised Zs tables from BS 7671, passed regulation-based questions easily and built confidence for other areas.
            </p>
          </div>

          <div className="bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
            <h4 className="font-medium text-amber-200 mb-2">Example 3: Safety Knowledge Gap</h4>
            <p className="text-sm text-amber-300">
              Candidate confused safe isolation steps, answered incorrectly, lost valuable safety marks that could have secured a pass.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQs */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <h4 className="font-medium text-white mb-1">Q1: Do I need to memorise all of BS 7671?</h4>
            <p className="text-sm text-white/80">A: No - focus on key requirements like Zs, RCDs, zones, earthing, and bonding.</p>
          </div>

          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <h4 className="font-medium text-white mb-1">Q2: Are science questions advanced maths?</h4>
            <p className="text-sm text-white/80">A: No - only core formulas and units (Ohm's law, power, resistance).</p>
          </div>

          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <h4 className="font-medium text-white mb-1">Q3: How many questions are on safety?</h4>
            <p className="text-sm text-white/80">A: Roughly a third of the paper includes safety or regulations.</p>
          </div>

          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <h4 className="font-medium text-white mb-1">Q4: Do I get to use BS 7671 book in the test?</h4>
            <p className="text-sm text-white/80">A: No - it's closed book.</p>
          </div>

          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <h4 className="font-medium text-white mb-1">Q5: Will there be trick questions?</h4>
            <p className="text-sm text-white/80">A: No - but some are worded to test understanding, not memory.</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Summary
        </h2>

        <div className="space-y-4 text-sm text-white leading-relaxed">
          <p>
            The AM2 knowledge test focuses on three main areas:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-950/20 border border-blue-800/30 rounded-lg p-4">
              <h4 className="font-medium text-blue-200 mb-2">Regulations</h4>
              <p className="text-sm text-blue-300">
                Zs, RCDs, bathroom zones, cable sizes, earthing/bonding, test sequences
              </p>
            </div>

            <div className="bg-green-950/20 border border-green-800/30 rounded-lg p-4">
              <h4 className="font-medium text-green-200 mb-2">Science</h4>
              <p className="text-sm text-green-300">
                Ohm's law, power, resistance, units, three-phase basics
              </p>
            </div>

            <div className="bg-purple-950/20 border border-purple-800/30 rounded-lg p-4">
              <h4 className="font-medium text-purple-200 mb-2">Safety</h4>
              <p className="text-sm text-purple-300">
                EAWR 1989, RAMS, safe isolation, PPE, site safety
              </p>
            </div>
          </div>

          <p className="text-center font-medium text-elec-yellow">
            Strong preparation in these areas means you can answer confidently and reach the pass mark.
          </p>
        </div>
      </AM2ContentCard>

      {/* Quiz */}
      <Quiz questions={quizQuestions} title="10-Question Quiz" />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref="../section1"
        prevLabel="Test Format"
        nextHref="../section3"
        nextLabel="Time Management"
        currentSection={2}
        totalSections={4}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module6Section2;
