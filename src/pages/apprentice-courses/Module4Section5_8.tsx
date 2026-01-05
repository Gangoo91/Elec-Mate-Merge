import { ArrowLeft, ArrowRight, Wrench, Target, CheckCircle, AlertTriangle, Eye, TrendingUp, Shield, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Common Faults and How to Correct Them - Module 4.5.8 | Level 2 Electrical Course";
const DESCRIPTION = "Master systematic fault-finding and correction techniques for electrical installations. Learn to identify, diagnose, and safely rectify common electrical faults while preventing recurrence.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main danger of a loose connection?",
    options: ["Reduced voltage", "Overheating and potential fire risk", "Increased current", "Faster wear"],
    correctIndex: 1,
    explanation: "Loose connections create high resistance, leading to overheating, arcing, and potential fire hazards. They can also cause intermittent faults and equipment damage."
  },
  {
    id: 2,
    question: "Name one piece of test equipment used to locate open circuits.",
    options: ["Voltage indicator", "Continuity tester", "Current clamp", "Power analyser"],
    correctIndex: 1,
    explanation: "Continuity testers (including low resistance ohmmeters and multimeters) are used to verify complete electrical paths and identify open circuits."
  },
  {
    id: 3,
    question: "Why should you record all fault rectification work?",
    options: ["For billing purposes", "For site documentation and quality assurance", "To impress clients", "For tool inventory"],
    correctIndex: 1,
    explanation: "Recording fault rectification provides quality assurance, helps identify recurring problems, supports certification, and assists with future maintenance."
  }
];

const Module4Section5_8 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following is a dangerous fault caused by swapping live and neutral conductors?",
      options: [
        "Open circuit",
        "Short circuit",
        "Reversed polarity",
        "Earth fault"
      ],
      correctAnswer: 2,
      explanation: "Reversed polarity occurs when live and neutral conductors are incorrectly connected, creating serious safety hazards."
    },
    {
      id: 2,
      question: "True or False: You should re-test the installation after correcting a fault.",
      options: [
        "True",
        "False",
        "Only for major faults",
        "Only if required by regulations"
      ],
      correctAnswer: 0,
      explanation: "True - Re-testing after fault correction verifies the repair and ensures no new faults were introduced."
    },
    {
      id: 3,
      question: "Name two causes of short circuits.",
      options: [
        "Insulation damage and conductor contact",
        "High voltage and low current",
        "Poor earthing and loose connections",
        "Wrong cable size and overloading"
      ],
      correctAnswer: 0,
      explanation: "Short circuits are typically caused by insulation damage allowing direct contact between live conductors."
    },
    {
      id: 4,
      question: "What is the first step before attempting to repair a fault?",
      options: [
        "Gather tools",
        "Isolate and prove dead",
        "Order replacement parts",
        "Call supervisor"
      ],
      correctAnswer: 1,
      explanation: "Safety requires complete isolation and verification that circuits are dead before any repair work begins."
    },
    {
      id: 5,
      question: "Which test instrument is used to check insulation condition?",
      options: [
        "Multimeter",
        "Insulation resistance tester",
        "Clamp meter",
        "Voltage stick"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance testers apply high voltage to detect insulation breakdown and deterioration."
    },
    {
      id: 6,
      question: "Why is it important to tighten terminals to the manufacturer's torque settings?",
      options: [
        "To prevent loose connections and ensure optimal contact",
        "To speed up installation",
        "To reduce material costs",
        "To comply with colour coding"
      ],
      correctAnswer: 0,
      explanation: "Correct torque prevents loose connections while avoiding over-tightening damage, ensuring safe and reliable connections."
    },
    {
      id: 7,
      question: "Give one reason to test at both first fix and second fix stages.",
      options: [
        "To identify faults early before they become expensive",
        "To use test equipment regularly",
        "To satisfy insurance requirements",
        "To train apprentices"
      ],
      correctAnswer: 0,
      explanation: "Early testing identifies faults when they are easier and less expensive to correct, before final installation is complete."
    },
    {
      id: 8,
      question: "Why should you address only one fault at a time?",
      options: [
        "To save time",
        "To avoid confusion and ensure each repair is verified",
        "To use fewer tools",
        "To reduce paperwork"
      ],
      correctAnswer: 1,
      explanation: "Addressing one fault at a time prevents confusion, allows proper verification of each repair, and avoids introducing new problems."
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
              Back to Section 5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Wrench className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 4.5.8
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Common Faults and How to Correct Them
          </h1>
          <p className="text-muted-foreground">
            Master systematic fault-finding and correction techniques to ensure safe, compliant, and reliable electrical installations.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Faults can occur during or after installation despite careful work.</li>
                <li>Common causes include poor workmanship, damaged materials, and inadequate testing.</li>
                <li>Systematic fault-finding and correction ensures safety and prevents recurrence.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Fault symptoms, potential causes, safety hazards.</li>
                <li><strong>Use:</strong> Systematic methods, proper test equipment, safe procedures.</li>
                <li><strong>Check:</strong> Complete repairs, verify function, prevent recurrence.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Recognise common electrical installation faults and understand their potential consequences.</li>
            <li>Understand the likely causes of faults and how to prevent them through good practice.</li>
            <li>Apply safe and systematic fault-finding techniques using appropriate test equipment.</li>
            <li>Correct faults safely and effectively to restore proper operation and compliance.</li>
            <li>Prevent fault recurrence through improved working methods and quality control procedures.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Common Electrical Faults */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Identification of Common Electrical Faults</h3>
            <p className="text-base text-foreground mb-4">
              Understanding common fault types enables rapid identification and appropriate corrective action:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Common Fault Categories and Symptoms</p>
                    <p className="text-base text-foreground mb-2"><strong>Loose connections:</strong> High resistance faults causing overheating and intermittent operation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Symptoms: Flickering lights, intermittent power loss, burning smells, hot terminals</li>
                      <li>Locations: Terminal blocks, junction boxes, accessory connections, distribution boards</li>
                      <li>Detection: Visual inspection for burn marks, thermal imaging, resistance testing</li>
                      <li>Consequences: Fire risk, equipment damage, protection device operation</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Reversed polarity:</strong> Dangerous condition with live and neutral conductors incorrectly connected.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Symptoms: Incorrect operation of equipment, failed polarity tests, safety hazards</li>
                      <li>Common locations: Junction boxes, switch connections, distribution board terminations</li>
                      <li>Detection: Polarity testing with multimeter or dedicated test instruments</li>
                      <li>Consequences: Shock risk, equipment damage, regulatory non-compliance</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Open circuits:</strong> Complete loss of electrical continuity through broken conductors or failed connections.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Symptoms: Complete loss of power, failed continuity tests, non-functioning circuits</li>
                      <li>Causes: Broken conductors, failed terminations, damaged cables, loose connections</li>
                      <li>Detection: Continuity testing, visual inspection, voltage measurements</li>
                      <li>Impact: Circuit malfunction, inability to energise, failed commissioning</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Short circuits and earth faults:</strong> Direct connections between conductors or to earth.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Short circuits: Direct contact between live conductors causing protective device operation</li>
                      <li>Earth faults: Live conductor contact with earthed metalwork creating shock risk</li>
                      <li>Detection: Insulation resistance testing, visual inspection for cable damage</li>
                      <li>Immediate action: Isolation, identification of fault location, safe repair procedures</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Safety priority:</strong> All faults present potential safety hazards requiring immediate assessment and appropriate action
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fault-danger-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Causes of Faults */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Root Causes and Contributing Factors</h3>
            <p className="text-xs sm:text-sm text-foreground mb-4">
              Understanding fault causes enables prevention strategies and improved working practices:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Systematic Analysis of Fault Causes</p>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Poor workmanship factors:</strong> Human errors during installation affecting quality and safety.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Insufficient terminal tightening leading to high resistance connections</li>
                      <li>Incorrect cable stripping causing damaged conductors or inadequate insertion</li>
                      <li>Poor cable routing creating stress points and potential damage</li>
                      <li>Inadequate support allowing movement and connection stress</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Material and component issues:</strong> Defective or inappropriate materials affecting installation integrity.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Damaged cables with compromised insulation or conductor integrity</li>
                      <li>Incorrect cable specifications for application requirements</li>
                      <li>Defective accessories with manufacturing faults or damage</li>
                      <li>Incompatible materials causing galvanic corrosion or connection problems</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>Process and procedural failures:</strong> Inadequate quality control and testing procedures.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Insufficient testing during installation stages missing early fault detection</li>
                      <li>Lack of systematic inspection procedures allowing errors to progress</li>
                      <li>Poor documentation leading to confusion and incorrect connections</li>
                      <li>Inadequate supervision and quality assurance processes</li>
                    </ul>
                    <p className="text-xs sm:text-sm text-foreground mb-2"><strong>External damage factors:</strong> Damage from other activities affecting electrical installations.</p>
                    <ul className="text-xs text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Physical damage from tools, machinery, or construction activities</li>
                      <li>Contamination from building materials, moisture, or chemical exposure</li>
                      <li>Mechanical stress from building movement or settlement</li>
                      <li>Environmental factors including temperature extremes and corrosion</li>
                    </ul>
                    <div className="text-xs text-foreground bg-background/50 p-2 rounded border">
                      <strong>Prevention focus:</strong> Most faults are preventable through proper procedures, quality control, and protection measures
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="test-equipment-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Fault-Finding Methods */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Systematic Fault-Finding Methodologies</h3>
            <p className="text-base text-foreground mb-4">
              Structured approaches to fault-finding ensure safety, efficiency, and complete problem resolution:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Professional Diagnostic Procedures</p>
                    <p className="text-base text-foreground mb-2"><strong>Visual inspection methodology:</strong> Systematic examination for obvious defects and damage.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Look for burn marks, discolouration, or heat damage around connections</li>
                      <li>Check for loose, damaged, or incorrectly connected conductors</li>
                      <li>Inspect cable routing for damage, stress points, or inadequate support</li>
                      <li>Examine accessories for cracks, damage, or incorrect installation</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Test equipment applications:</strong> Appropriate instruments for specific fault types.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Continuity testers: Low resistance ohmmeters for open circuit detection</li>
                      <li>Insulation resistance testers: High voltage testing for insulation breakdown</li>
                      <li>Polarity testers: Multimeters and dedicated instruments for connection verification</li>
                      <li>Thermal imaging: Advanced detection of overheating connections</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Safety procedures during testing:</strong> Essential requirements for safe fault investigation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Complete circuit isolation using lock-off procedures before investigation</li>
                      <li>Prove dead using approved voltage indicators and proving units</li>
                      <li>Apply appropriate personal protective equipment for all activities</li>
                      <li>Use barriers and warning signs to protect others from investigation areas</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Logical fault location process:</strong> Systematic narrowing of fault location.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Start with distribution board and work towards load end</li>
                      <li>Use sectional testing to isolate fault location progressively</li>
                      <li>Test each junction point and connection systematically</li>
                      <li>Document findings and test results for analysis and future reference</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Systematic approach:</strong> Methodical testing prevents missed faults and ensures complete problem resolution
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="recording-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Corrective Actions */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Professional Fault Correction Techniques</h3>
            <p className="text-base text-foreground mb-4">
              Effective fault correction requires proper techniques, quality materials, and verification procedures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Systematic Correction Procedures</p>
                    <p className="text-base text-foreground mb-2"><strong>Terminal and connection repairs:</strong> Professional standards for reliable connections.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Re-make loose terminations to manufacturer specified torque values</li>
                      <li>Strip and re-prepare damaged conductors using appropriate techniques</li>
                      <li>Clean oxidised or corroded connections before remaking</li>
                      <li>Apply appropriate jointing compounds where specified</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Component replacement procedures:</strong> Safe removal and installation of damaged items.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Replace damaged cables with equivalent or superior specifications</li>
                      <li>Install new accessories ensuring correct ratings and compatibility</li>
                      <li>Use appropriate containment and protection for replacement installations</li>
                      <li>Maintain original installation methods unless improvement is required</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Polarity and connection correction:</strong> Safe methods for correcting wiring errors.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Identify all affected connection points requiring correction</li>
                      <li>Swap conductors to correct terminals using proper identification</li>
                      <li>Verify corrections at both ends of affected circuits</li>
                      <li>Re-test polarity throughout entire affected circuit</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Containment and support repairs:</strong> Maintaining mechanical protection and support.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Re-secure or replace damaged cable supports and fixings</li>
                      <li>Repair or replace damaged conduit, trunking, or cable tray systems</li>
                      <li>Restore environmental protection to required IP ratings</li>
                      <li>Ensure continued compliance with cable support spacing requirements</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Quality standard:</strong> All repairs must meet or exceed original installation standards and current regulations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Prevention Strategies */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Comprehensive Fault Prevention Strategies</h3>
            <p className="text-base text-foreground mb-4">
              Proactive prevention reduces faults, improves reliability, and maintains professional standards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-1">Systematic Prevention Methods</p>
                    <p className="text-base text-foreground mb-2"><strong>Quality control procedures:</strong> Built-in checks to prevent faults reaching later stages.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Double-check all connections before progressing to next installation stage</li>
                      <li>Implement systematic testing at first fix, second fix, and final stages</li>
                      <li>Use quality checklists and inspection procedures throughout installation</li>
                      <li>Apply peer review processes for critical or complex installations</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Protection during construction:</strong> Maintaining installation integrity throughout build process.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Keep cables protected using appropriate covers and barriers during building work</li>
                      <li>Coordinate with other trades to prevent damage from their activities</li>
                      <li>Monitor installation areas for potential damage and take preventive action</li>
                      <li>Maintain clean working conditions to prevent contamination of electrical components</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Standards compliance:</strong> Adherence to regulations and manufacturer requirements.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Follow BS 7671 requirements at all stages of installation and testing</li>
                      <li>Comply with manufacturer instructions for all products and systems</li>
                      <li>Maintain current knowledge of regulations and best practice guidance</li>
                      <li>Use appropriate tools, materials, and techniques for all installation work</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Continuous improvement processes:</strong> Learning from experience to prevent future problems.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Analyse fault patterns to identify recurring issues and root causes</li>
                      <li>Update procedures and training based on lessons learned from faults</li>
                      <li>Share knowledge and experience within teams and across projects</li>
                      <li>Invest in better tools, training, and procedures to improve quality</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Professional development:</strong> Continuous learning and improvement prevent faults and enhance career prospects
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          
          {/* Safety Procedures */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Safety Procedures and Risk Management</h3>
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-foreground mb-2">Essential Safety Requirements</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Always lock-off and prove dead before attempting any fault rectification work</li>
                  <li>Use approved voltage indicators and proving units to verify isolation</li>
                  <li>Apply appropriate personal protective equipment including safety glasses and insulated gloves</li>
                  <li>Display warning notices and barriers to protect others from investigation and repair areas</li>
                  <li>Never work alone on potentially dangerous fault investigation activities</li>
                  <li>Maintain emergency procedures and first aid capabilities in work areas</li>
                </ul>
              </div>

              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium text-foreground mb-2">Fault Investigation Best Practices</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Label any circuits under investigation to prevent accidental energisation by others</li>
                  <li>Strip insulation carefully when remaking terminations to avoid further conductor damage</li>
                  <li>Use appropriate tools and techniques for each type of repair or replacement work</li>
                  <li>Keep spare accessories and connectors readily available to allow quick replacements</li>
                  <li>Document all findings, actions taken, and test results for site records</li>
                  <li>Photograph fault conditions before correction for training and analysis purposes</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-card border border-green-400/30">
                <p className="font-medium text-foreground mb-2">Systematic Approach Guidelines</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1 list-disc pl-4">
                  <li>Address only one fault at a time to avoid confusion and ensure proper verification</li>
                  <li>Re-test the installation after each correction to verify repair effectiveness</li>
                  <li>Record all fault-finding and correction work for quality assurance and future reference</li>
                  <li>Review fault patterns to identify potential systemic issues requiring broader action</li>
                  <li>Communicate findings to supervisors and team members to prevent similar problems</li>
                  <li>Update procedures and checklists based on lessons learned from fault investigation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Detailed Repair Procedures */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Detailed Repair and Correction Procedures</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-card border border-amber-400/30">
                <p className="font-medium text-foreground mb-2">Loose Connection Correction Process</p>
                <ol className="text-xs sm:text-sm text-foreground space-y-1 list-decimal pl-4">
                  <li>Isolate affected circuit and verify isolation using approved procedures</li>
                  <li>Visually inspect connection for burn marks, corrosion, or physical damage</li>
                  <li>Loosen terminal completely and inspect conductor condition</li>
                  <li>Clean terminal block and conductor surfaces if contamination is present</li>
                  <li>Re-strip conductor if damage is found, ensuring correct strip length</li>
                  <li>Re-insert conductor ensuring full engagement with terminal</li>
                  <li>Tighten to manufacturer specification using calibrated tools where available</li>
                  <li>Perform tug test to verify mechanical security of connection</li>
                  <li>Check adjacent connections for similar problems</li>
                  <li>Re-test circuit continuity and functionality before re-energising</li>
                </ol>
              </div>

              <div className="rounded-lg p-4 bg-card border border-cyan-400/30">
                <p className="font-medium text-foreground mb-2">Polarity Fault Correction Procedure</p>
                <ol className="text-xs text-foreground space-y-1 list-decimal pl-4">
                  <li>Identify all locations where incorrect polarity exists using systematic testing</li>
                  <li>Trace circuit routing to determine optimal correction point (usually at source)</li>
                  <li>Ensure complete isolation of all affected circuits and related systems</li>
                  <li>Label conductors clearly before disconnection to prevent further errors</li>
                  <li>Disconnect conductors and swap to correct terminals according to colour coding</li>
                  <li>Verify conductor identification throughout the affected circuit</li>
                  <li>Remake all connections using proper techniques and torque values</li>
                  <li>Test polarity at multiple points to confirm complete correction</li>
                  <li>Check that correction has not affected other circuits or systems</li>
                  <li>Document correction work and update circuit records as required</li>
                </ol>
              </div>

              <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
                <p className="font-medium text-foreground mb-2">Cable Damage Repair Process</p>
                <ol className="text-xs text-foreground space-y-1 list-decimal pl-4">
                  <li>Assess extent of damage to determine if repair or replacement is required</li>
                  <li>For minor damage, use appropriate jointing methods following manufacturer guidance</li>
                  <li>For extensive damage, plan complete cable replacement with appropriate routing</li>
                  <li>Select replacement cable with equivalent or superior specifications</li>
                  <li>Install new cable using original routing or improved path where possible</li>
                  <li>Ensure adequate support and protection throughout cable run</li>
                  <li>Make terminations using correct techniques and appropriate accessories</li>
                  <li>Test new installation for continuity, polarity, and insulation resistance</li>
                  <li>Verify that replacement maintains original system performance</li>
                  <li>Update installation records and as-built drawings to reflect changes</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Quality Assurance Framework */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Quality Assurance and Verification Procedures</h3>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="text-base text-foreground mb-3"><strong>Post-repair verification checklist:</strong></p>
              <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm text-foreground">
                <div>
                  <p className="font-medium mb-2">Electrical Verification:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>□ Continuity test confirms complete electrical path</li>
                    <li>□ Polarity test verifies correct conductor connections</li>
                    <li>□ Insulation resistance meets required standards</li>
                    <li>□ Earth continuity verified where applicable</li>
                    <li>□ Functional testing confirms proper operation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Physical and Safety Checks:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>□ All connections mechanically secure</li>
                    <li>□ No exposed conductors or damaged insulation</li>
                    <li>□ Proper cable support and protection maintained</li>
                    <li>□ Access for future maintenance preserved</li>
                    <li>□ Documentation updated to reflect changes</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-2 bg-background/50 rounded border">
                <p className="text-xs sm:text-sm text-foreground"><strong>Professional standard:</strong> All repairs must meet current standards even if original installation was to earlier requirements.</p>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Examples</h2>
          
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-card border border-amber-400/30">
              <p className="text-base text-foreground mb-2">
                <strong>Case Study 1: Commercial Office Polarity Error</strong>
              </p>
              <p className="text-base text-foreground">
                During a commercial office installation, a lighting circuit failed its initial polarity test during commissioning. Investigation revealed that live and neutral conductors were reversed at a switch connection in the ceiling void. The error occurred during second fix when the electrician working in poor lighting conditions misidentified the conductors. While the fault was corrected quickly by swapping the connections, the lack of double-checking before testing meant the error was not caught until the formal testing stage. This delayed the commissioning schedule by two days and required additional inspection of similar connections throughout the building. The incident led to improved lighting for working areas and mandatory double-checking procedures.
              </p>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="text-base text-foreground mb-2">
                <strong>Case Study 2: Industrial Loose Connection Failure</strong>
              </p>
              <p className="text-base text-foreground">
                A manufacturing facility experienced repeated tripping of a motor starter after six months of operation. Investigation using thermal imaging revealed a severely overheated connection at the distribution board, with temperatures exceeding 80°C. The loose connection was caused by inadequate tightening during installation, compounded by vibration from nearby machinery. The high resistance connection was drawing 15A more current than normal, causing the motor protection to operate. Emergency repair required the connection to be completely remade with a new terminal block, as the original was heat damaged. The repair took 4 hours of production downtime costing £12,000. Implementation of torque checking procedures and regular thermal imaging surveys prevented similar failures.
              </p>
            </div>

            <div className="rounded-lg p-4 bg-card border border-green-400/30">
              <p className="text-base text-foreground mb-2">
                <strong>Case Study 3: Residential Cable Damage Prevention Success</strong>
              </p>
              <p className="text-base text-foreground">
                During a house renovation, systematic testing at first fix stage identified an open circuit in a ring main. Investigation found that a cable had been accidentally nicked during wall chasing, reducing the conductor cross-section by 40%. Although the circuit was still continuous, the damage would have caused overheating under load. The damaged section was replaced immediately, and additional protective measures were installed to prevent similar damage. The early detection through systematic testing prevented a potential fire hazard and costly remedial work after decoration. The incident highlighted the value of intermediate testing and proper cable protection during construction work.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: If a fault is found, should I always repair it immediately?</h4>
              <p className="text-base text-muted-foreground">A: Only if it can be done safely and without breaching other site rules. Otherwise, isolate and make safe until proper repair can be scheduled with appropriate resources and safety measures.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: Can a single fault cause multiple symptoms?</h4>
              <p className="text-base text-muted-foreground">A: Yes — for example, a loose neutral connection can cause intermittent power loss, voltage fluctuations, flickering lights, and equipment malfunction. Always consider interconnected effects when investigating faults.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: How often should I test for faults during installation?</h4>
              <p className="text-base text-muted-foreground">A: At minimum during first fix, second fix, and final testing stages, plus after any rework or areas where damage might have occurred. Regular testing identifies problems early when they are easier to correct.</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium text-foreground mb-2">Q: What should I do if I find multiple faults in the same circuit?</h4>
              <p className="text-base text-muted-foreground">A: Address one fault at a time and re-test after each correction to verify the repair and ensure no new problems are introduced. This systematic approach prevents confusion and ensures thorough resolution.</p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-base text-foreground">
            Faults in electrical installations can cause serious safety hazards, equipment damage, and costly delays. A systematic approach to fault-finding, correction, and prevention ensures installations are safe, compliant, and reliable. Professional electricians develop expertise in rapid fault diagnosis and effective correction techniques, while implementing quality control procedures that prevent most faults from occurring. This combination of diagnostic skills and prevention strategies ensures high-quality installations and enhances professional reputation.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz (8 Questions)</h2>
          <p className="text-base text-muted-foreground mb-6">
            Test your understanding of fault identification, diagnosis, and correction techniques
          </p>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button asChild variant="outline">
            <Link to="../5-7" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to=".." className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section5_8;