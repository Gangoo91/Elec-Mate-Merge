import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Zap, BookOpen, Clipboard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "What Is a Fault? - Module 7.1.1 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding the definition of electrical faults and distinguishing between normal operation and fault conditions in electrical installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the general definition of an electrical fault?",
    options: ["A minor problem that can be ignored", "Any defect that prevents a circuit from functioning safely or correctly", "A temporary power cut", "Normal wear and tear"],
    correctIndex: 1,
    explanation: "A fault is any defect that prevents a circuit from functioning safely or correctly according to BS 7671 standards."
  },
  {
    id: 2,
    question: "How does a fault condition differ from normal operation in a circuit?",
    options: ["No difference", "Fault conditions create abnormal current flow and safety risks", "Faults make circuits work better", "Faults only affect old installations"],
    correctIndex: 1,
    explanation: "Fault conditions create abnormal current flow, introduce safety risks, and mean the system is no longer operating within safe limits."
  },
  {
    id: 3,
    question: "Give two examples of common electrical faults.",
    options: ["Good connections and proper polarity", "Short circuits and earth faults", "New cables and clean terminals", "Correct voltage and frequency"],
    correctIndex: 1,
    explanation: "Short circuits and earth faults are two common types of electrical faults that create safety hazards."
  },
  {
    id: 4,
    question: "Why is it essential for electricians to clearly understand what a fault is?",
    options: ["To work faster", "To identify hazards early and prevent accidents", "To use more expensive tools", "To avoid paperwork"],
    correctIndex: 1,
    explanation: "Understanding faults allows electricians to test intelligently, interpret results correctly, and recognise unsafe conditions before they cause accidents."
  }
];

const Module7Section1_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the general definition of an electrical fault?",
      options: ["A broken light bulb", "Any defect that prevents a circuit from functioning safely or correctly", "A power cut from the supplier", "Normal equipment wear"],
      correctAnswer: 1,
      explanation: "A fault is any defect that prevents a circuit from functioning safely or correctly according to BS 7671 standards."
    },
    {
      id: 2,
      question: "What makes a fault different from normal circuit operation?",
      options: ["Faults are louder", "Faults introduce abnormal conditions and safety risks", "Faults use more electricity", "Faults are always visible"],
      correctAnswer: 1,
      explanation: "Fault conditions create abnormal current flow, safety risks, and mean the system is no longer operating within safe limits set by BS 7671."
    },
    {
      id: 3,
      question: "What does a short circuit involve?",
      options: ["Normal current flow", "Unintended contact between line and neutral or line-to-line conductors", "Slow current flow", "No current flow"],
      correctAnswer: 1,
      explanation: "A short circuit occurs when line and neutral or line-to-line conductors make unintended contact, creating dangerous current levels."
    },
    {
      id: 4,
      question: "What is an earth fault?",
      options: ["Normal earthing", "When live conductors make contact with earth or earthed metalwork", "A broken earth cable", "Good earth connection"],
      correctAnswer: 1,
      explanation: "An earth fault occurs when live conductors make unintended contact with earth or earthed metalwork, creating a safety hazard."
    },
    {
      id: 5,
      question: "What is an open circuit?",
      options: ["A circuit that's switched on", "When a conductor is broken or disconnected, stopping current flow", "A circuit without protection", "A very long circuit"],
      correctAnswer: 1,
      explanation: "An open circuit occurs when a conductor is broken or disconnected, preventing current from flowing to complete the circuit."
    },
    {
      id: 6,
      question: "What happens when insulation breaks down in a cable?",
      options: ["The cable works better", "Leakage currents can flow, creating safety hazards", "Nothing happens", "The cable becomes stronger"],
      correctAnswer: 1,
      explanation: "When insulation breaks down, leakage currents can flow between conductors or to earth, creating safety hazards and potential shock risks."
    },
    {
      id: 7,
      question: "Why is reversed polarity considered a fault?",
      options: ["It makes no difference", "Conductors are connected incorrectly, creating safety risks", "It improves performance", "It's just a preference"],
      correctAnswer: 1,
      explanation: "Reversed polarity means conductors are connected incorrectly, which can create safety risks and equipment malfunction even if the circuit appears to work."
    },
    {
      id: 8,
      question: "True or False: If equipment still works, there cannot be a fault.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. A system can appear to function while being unsafe - for example, reversed polarity may not stop equipment working but creates hidden dangers."
    },
    {
      id: 9,
      question: "Why is it important to correctly identify faults during testing?",
      options: ["To use more equipment", "To prevent accidents, legal non-compliance, and property damage", "To take longer on jobs", "To charge more money"],
      correctAnswer: 1,
      explanation: "Identifying faults prevents accidents, ensures legal compliance with BS 7671, and prevents costly damage to property and equipment."
    },
    {
      id: 10,
      question: "In the real-world example, what mistake did the apprentice make when investigating the tripping circuit?",
      options: ["He tested too much", "He assumed the breaker was faulty instead of recognising a possible short circuit", "He worked too slowly", "He called for help"],
      correctAnswer: 1,
      explanation: "The apprentice incorrectly assumed the breaker was faulty instead of recognising the repeated tripping as a sign of a possible short circuit fault."
    }
  ];

  const faqs = [
    {
      question: "Is a tripped circuit breaker always a sign of a fault?",
      answer: "Not always — it could be due to overload or a one-off event, but repeated tripping usually indicates a fault that needs investigation."
    },
    {
      question: "Are all faults dangerous?",
      answer: "Yes, even minor faults can escalate into serious hazards if left uncorrected. All faults represent a breakdown in safe operation and should be addressed."
    },
    {
      question: "Do hidden faults still count as faults if the installation appears to work?",
      answer: "Yes. A system can appear to function while being unsafe — for example, reversed polarity. Hidden faults are often the most dangerous because they're not immediately obvious."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs md:text-sm">
              Section 7.1.1
            </Badge>
          </div>
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            What Is a Fault?
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl">
            Understanding the definition of electrical faults and distinguishing between normal operation and fault conditions.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground">Introduction</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 text-sm md:text-base text-foreground">
            <div className="rounded-lg p-3 md:p-4 bg-card border border-border/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A fault is any defect preventing safe circuit operation.</li>
                <li>Common types: short circuits, earth faults, open circuits.</li>
                <li>Faults create safety risks even if equipment appears to work.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 md:p-4 bg-card border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Repeated tripping, abnormal readings, unusual behaviour.</li>
                <li><strong>Use:</strong> Test equipment, visual inspection, correct terminology.</li>
                <li><strong>Check:</strong> All circuits before energising, test results against standards.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground mb-4">
            In electrical systems, a fault is any condition where the circuit does not operate as intended. Faults may involve unexpected connections, breaks in continuity, or abnormal current flow that creates danger or disruption. Understanding what constitutes a fault is the foundation of fault diagnosis and rectification. Without this basic knowledge, electricians cannot properly test, interpret results, or carry out safe corrective action.
          </p>
          
          <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-400 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-foreground">
                  According to industry statistics, approximately 60% of electrical accidents are caused by unidentified or misunderstood faults. 
                  Proper fault recognition and understanding can prevent serious injuries, fatalities, and property damage worth millions of pounds annually.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-foreground">
              <strong>Real Impact:</strong> The Health and Safety Executive (HSE) reports that electrical faults contribute to over 1,000 workplace accidents per year in the UK. 
              Many of these could be prevented through proper fault identification and understanding of what constitutes unsafe conditions.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Industry Standard:</strong> BS 7671:2018+A2:2022 (18th Edition Wiring Regulations) sets clear requirements for fault protection 
                and defines the standards that electrical installations must meet. Any deviation from these standards constitutes a fault requiring immediate attention.
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Legal Requirement:</strong> Under the Electricity at Work Regulations 1989, employers have a legal duty to ensure electrical systems are safe. 
                Understanding and identifying faults is not just good practice—it's a legal obligation for anyone working with electrical installations.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-base text-foreground mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Define what an electrical fault is.</li>
            <li>Distinguish between normal circuit operation and fault conditions.</li>
            <li>Identify the different ways faults may appear in an installation.</li>
            <li>Appreciate why recognising faults is critical to safety and compliance.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Definition of a Fault */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Definition of a Fault</h3>
            <p className="text-base text-foreground mb-4">
              A fault in electrical terms is any defect that prevents a circuit from functioning safely or correctly according to BS 7671 standards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">What Constitutes a Fault</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm md:text-base text-foreground mb-2"><strong>Primary Types of Electrical Faults:</strong></p>
                        <div className="grid gap-3 sm:grid-cols-2 mb-3">
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Short Circuits</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Unintended connection between line and neutral or between phases</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Earth Faults</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Live conductors making contact with earth or earthed metalwork</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Open Circuits</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Broken or disconnected conductors preventing current flow</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Insulation Breakdown</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Deteriorated insulation allowing dangerous leakage currents</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Secondary Fault Types:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Polarity faults:</strong> Incorrect connection of line and neutral conductors</li>
                          <li><strong>High resistance connections:</strong> Loose or corroded joints creating heat</li>
                          <li><strong>Cross-connections:</strong> Wires connected to wrong terminals or circuits</li>
                          <li><strong>Mechanical damage:</strong> Physical damage affecting conductor integrity</li>
                          <li><strong>Overloading:</strong> Current demand exceeding design capacity</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>BS 7671 Requirements:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-foreground">
                            <li>All circuits must be protected against overcurrent (Regulation 433.1)</li>
                            <li>Fault protection must be provided for all circuits (Chapter 41)</li>
                            <li>Earth fault loop impedance must not exceed specified values (Regulation 411.4.5)</li>
                            <li>Insulation resistance must meet minimum standards (Regulation 612.3)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Critical Understanding</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          A fault represents any deviation from the safe operating parameters defined in BS 7671. 
                          Even if equipment appears to function normally, hidden faults can create serious safety risks and must be identified and corrected.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fault-definition-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Normal Operation vs Fault Conditions */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Difference Between Normal Operation and Fault Conditions</h3>
            <p className="text-base text-foreground mb-4">
              Understanding the clear distinction between normal and fault conditions is essential for safe electrical work and proper testing:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Normal vs Fault Operation</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Normal Operation Characteristics:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-3">
                          <div className="grid gap-3 lg:grid-cols-2">
                            <div>
                              <p className="font-medium text-foreground mb-2 text-sm md:text-base">Electrical Parameters</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-foreground">
                                <li>Current flows only along intended paths</li>
                                <li>Voltage levels within ±10% of nominal</li>
                                <li>Insulation resistance &gt;1MΩ for most circuits</li>
                                <li>Earth fault loop impedance within limits</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2 text-sm md:text-base">Protective Systems</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-foreground">
                                <li>Protective devices remain inactive</li>
                                <li>RCDs do not trip under normal loads</li>
                                <li>No unwanted voltages on exposed metalwork</li>
                                <li>Temperature rises within acceptable limits</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Fault Condition Indicators:</strong></p>
                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800 mb-3">
                          <div className="grid gap-3 lg:grid-cols-2">
                            <div>
                              <p className="font-medium text-red-700 dark:text-emerald-400 mb-2 text-sm md:text-base">Immediate Dangers</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-foreground">
                                <li>Current flowing through unintended paths</li>
                                <li>Dangerous voltages on metalwork</li>
                                <li>Excessive current causing overheating</li>
                                <li>Loss of protective earthing integrity</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-red-700 dark:text-emerald-400 mb-2 text-sm md:text-base">Risk Consequences</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-foreground">
                                <li>Electric shock or electrocution risk</li>
                                <li>Fire risk from overheating</li>
                                <li>Equipment damage or failure</li>
                                <li>Legal non-compliance with BS 7671</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Hidden vs Obvious Faults:</strong></p>
                        <div className="grid gap-3 lg:grid-cols-2">
                          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                            <p className="font-medium text-amber-700 dark:text-amber-400 mb-2 text-sm md:text-base">Obvious Faults</p>
                            <ul className="text-xs md:text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                              <li>Circuit breakers tripping immediately</li>
                              <li>RCDs operating under load</li>
                              <li>Visible sparking or burning</li>
                              <li>Complete loss of supply</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                            <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2 text-sm md:text-base">Hidden Faults</p>
                            <ul className="text-xs md:text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                              <li>Reversed polarity connections</li>
                              <li>High resistance earth faults</li>
                              <li>Degraded insulation (still &gt;1MΩ)</li>
                              <li>Loose connections causing heating</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="normal-vs-fault-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Common Ways Faults Appear */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Common Ways Faults Appear</h3>
            <p className="text-base text-foreground mb-4">
              Electrical faults can take many different forms, each with unique characteristics:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3">Types of Electrical Faults</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Short Circuit</p>
                          <p className="text-xs sm:text-sm text-foreground">Line and neutral or line-to-line conductors make unintended contact</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Earth Fault</p>
                          <p className="text-xs sm:text-sm text-foreground">Live conductors make contact with earth or earthed metalwork</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Open Circuit</p>
                          <p className="text-xs sm:text-sm text-foreground">Conductor is broken or disconnected, stopping current flow</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Insulation Fault</p>
                          <p className="text-xs sm:text-sm text-foreground">Insulation breaks down, allowing leakage currents</p>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                        <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Important Note</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Each type of fault has unique characteristics, but all represent a breakdown in safe operation that must be investigated and corrected.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fault-types-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Why Understanding Faults Matters */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Why Understanding Faults Matters</h3>
            <p className="text-base text-foreground mb-4">
              Clear understanding of faults is essential for safe electrical practice:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3">Critical Importance</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Professional Benefits:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Enables intelligent testing and accurate result interpretation</li>
                          <li>Allows recognition of unsafe circuit conditions</li>
                          <li>Builds foundation for safe working practices</li>
                          <li>Supports proper communication with supervisors and clients</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Safety Impact:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Prevents accidents and injuries</li>
                          <li>Ensures legal compliance with BS 7671</li>
                          <li>Protects property from fire and damage</li>
                          <li>Maintains electrical system reliability</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Remember</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Faults are not just technical issues — they are direct hazards that can cause serious injury or death if not properly identified and corrected.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="importance-check"
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">On-Site Best Practices:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Treat all unexplained test results or abnormal circuit behaviour as a potential fault until proven otherwise.</li>
                <li>Always isolate and prove dead before investigating suspected faults.</li>
                <li>Use systematic testing procedures following BS 7671 guidance documents.</li>
                <li>Document all fault findings with photographs and detailed notes where possible.</li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Communication and Reporting:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Use correct technical terminology when describing faults to supervisors, clients, or inspectors.</li>
                <li>Clearly explain safety implications to non-technical personnel.</li>
                <li>Provide recommendations for fault rectification with priority levels.</li>
                <li>Follow company procedures for reporting dangerous conditions immediately.</li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Professional Development:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Build experience by observing real fault conditions under supervision during training.</li>
                <li>Practice fault identification on training rigs and simulation equipment.</li>
                <li>Study case studies of common faults and their causes.</li>
                <li>Stay updated with amendments to BS 7671 and industry best practices.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-medium text-foreground mb-3">Case Study: Misdiagnosed Circuit Breaker Problem</h3>
              <p className="text-base text-foreground mb-4">
                An apprentice was asked to investigate a socket circuit that repeatedly tripped the 32A Type B MCB within minutes of being reset. 
                Instead of recognising this pattern as indicating a possible short circuit fault, he assumed the circuit breaker itself was faulty and replaced it with a new one. 
                The problem continued with the new MCB also tripping repeatedly.
              </p>
              
              <p className="text-base text-foreground mb-4">
                A qualified electrician then conducted proper fault-finding procedures:
              </p>
              
              <ol className="list-decimal ml-6 space-y-2 text-xs sm:text-sm text-foreground mb-4">
                <li>Isolated the circuit and proved dead</li>
                <li>Conducted insulation resistance tests between conductors</li>
                <li>Found very low resistance (0.02Ω) between line and neutral conductors</li>
                <li>Traced the fault to a socket outlet where two conductors had been pinched together behind the faceplate during installation</li>
                <li>Rectified the fault by repositioning the conductors and ensuring adequate space</li>
              </ol>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800 mb-3">
                <p className="text-xs sm:text-sm text-foreground">
                  <strong>Cost of Misdiagnosis:</strong> The incorrect assumption resulted in wasted time (4 hours), unnecessary parts cost (£45 for new MCB), 
                  and potential safety risks from the unresolved short circuit fault.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-foreground">
                  <strong>Key Lessons:</strong> Understanding what constitutes a fault and following systematic fault-finding procedures prevents misdiagnosis. 
                  Repeated protective device operation almost always indicates an underlying fault, not device failure. 
                  Proper testing procedures would have quickly identified the short circuit condition.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-muted/50 border border-border/30">
              <p className="font-medium text-foreground mb-2">Q: Is a tripped circuit breaker always a sign of a fault?</p>
              <p className="text-xs sm:text-sm text-foreground">A: Not always — it could be due to overload or a one-off event, but repeated tripping usually indicates a fault that needs investigation. A single trip might be caused by starting current from motors or temporary overload, but consistent tripping indicates an underlying problem.</p>
            </div>
            <div className="rounded-lg p-4 bg-muted/50 border border-border/30">
              <p className="font-medium text-foreground mb-2">Q: Are all faults dangerous?</p>
              <p className="text-xs sm:text-sm text-foreground">A: Yes, even minor faults can escalate into serious hazards if left uncorrected. All faults represent a breakdown in safe operation and should be addressed promptly. What appears minor today could become life-threatening tomorrow.</p>
            </div>
            <div className="rounded-lg p-4 bg-muted/50 border border-border/30">
              <p className="font-medium text-foreground mb-2">Q: Do hidden faults still count as faults if the installation appears to work?</p>
              <p className="text-xs sm:text-sm text-foreground">A: Yes. A system can appear to function while being unsafe — for example, reversed polarity. Hidden faults are often the most dangerous because they're not immediately obvious but still create safety risks.</p>
            </div>
            <div className="rounded-lg p-4 bg-muted/50 border border-border/30">
              <p className="font-medium text-foreground mb-2">Q: How can I tell the difference between a fault and normal wear?</p>
              <p className="text-xs sm:text-sm text-foreground">A: Normal wear is gradual degradation that doesn't immediately compromise safety (like slight contact wear in switches). A fault is any condition that takes the system outside safe operating parameters defined in BS 7671, regardless of whether it affects apparent operation.</p>
            </div>
            <div className="rounded-lg p-4 bg-muted/50 border border-border/30">
              <p className="font-medium text-foreground mb-2">Q: What should I do if I suspect a fault but can't confirm it?</p>
              <p className="text-xs sm:text-sm text-foreground">A: Always err on the side of caution. Isolate the circuit if safe to do so, and seek guidance from a qualified person. Never ignore unexplained symptoms or assume they will resolve themselves.</p>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Pocket Guide</h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="rounded-lg p-3 md:p-4 bg-card border border-emerald-500/30">
              <h3 className="font-medium text-foreground mb-3 text-sm md:text-base">Quick Fault Recognition</h3>
              <ul className="text-xs md:text-xs sm:text-sm text-foreground space-y-1">
                <li>• Repeated circuit breaker tripping</li>
                <li>• Unusual readings during testing</li>
                <li>• Equipment not working as expected</li>
                <li>• Signs of overheating or burning</li>
                <li>• Unexpected voltages on metalwork</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 md:p-4 bg-card border border-border/30">
              <h3 className="font-medium text-foreground mb-3 text-sm md:text-base">Action Steps</h3>
              <ul className="text-xs md:text-xs sm:text-sm text-foreground space-y-1">
                <li>• Isolate the circuit immediately</li>
                <li>• Document the fault symptoms</li>
                <li>• Use correct test procedures</li>
                <li>• Report findings accurately</li>
                <li>• Never ignore unexplained results</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <p className="text-base text-foreground">
            A fault is any defect or abnormal condition that prevents a circuit from operating safely and correctly. Common examples include short circuits, earth faults, open circuits, insulation breakdown, and polarity faults. Recognising faults is critical because they create risks of shock, fire, or equipment damage. Understanding the definition of a fault is the first step in learning how to test, diagnose, and correct problems in electrical installations.
          </p>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Knowledge Check</h2>
          <Quiz questions={quizQuestions} title="Test your understanding of electrical faults" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../1-2">
              Next: Why Faults Occur
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section1_1;