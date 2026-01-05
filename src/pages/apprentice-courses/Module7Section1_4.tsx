import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Wrench, Layers, BookOpen, Clipboard, Clock, Settings, Hammer, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Categories of Electrical Faults - Module 7.1.4 | Level 2 Electrical Course";
const DESCRIPTION = "Learn about the four main categories of electrical faults: design, installation, deterioration, and external damage faults.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What type of fault occurs due to inadequate circuit design?",
    options: ["Installation fault", "Design fault", "Deterioration fault", "External damage fault"],
    correctIndex: 1,
    explanation: "Design faults occur when circuits are inadequately designed, such as insufficient cable ratings or inadequate protection."
  },
  {
    id: 2,
    question: "Which category of fault typically results from poor workmanship?",
    options: ["Design fault", "Installation fault", "Deterioration fault", "External damage fault"],
    correctIndex: 1,
    explanation: "Installation faults result from poor workmanship during installation, such as loose connections or incorrect wiring."
  },
  {
    id: 3,
    question: "What causes deterioration faults over time?",
    options: ["Poor design", "Bad installation", "Age, wear, and environmental factors", "Physical damage"],
    correctIndex: 2,
    explanation: "Deterioration faults develop over time due to age, wear, environmental factors, and normal operational stresses."
  },
  {
    id: 4,
    question: "Give an example of external damage that could cause electrical faults.",
    options: ["Loose connections", "Inadequate cable size", "Construction work damaging cables", "Old insulation"],
    correctIndex: 2,
    explanation: "External damage includes physical damage from construction work, impact damage, or deliberate interference with electrical equipment."
  }
];

const Module7Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What type of fault occurs due to inadequate circuit design?",
      options: ["Installation fault", "Design fault", "Deterioration fault", "External damage fault"],
      correctAnswer: 1,
      explanation: "Design faults occur when circuits are inadequately designed, such as insufficient cable ratings or inadequate protection."
    },
    {
      id: 2,
      question: "Which category of fault typically results from poor workmanship?",
      options: ["Design fault", "Installation fault", "Deterioration fault", "External damage fault"],
      correctAnswer: 1,
      explanation: "Installation faults result from poor workmanship during installation, such as loose connections or incorrect wiring."
    },
    {
      id: 3,
      question: "What is a common example of a design fault?",
      options: ["Loose terminal", "Cable damaged by drill", "Insufficient cable rating for load", "Corroded connection"],
      correctAnswer: 2,
      explanation: "Insufficient cable rating for the intended load is a classic design fault that can lead to overheating and fire risks."
    },
    {
      id: 4,
      question: "Which of these is an installation fault?",
      options: ["Cable too small for load", "Incorrect polarity connections", "Insulation degradation", "Impact damage"],
      correctAnswer: 1,
      explanation: "Incorrect polarity connections are installation faults resulting from poor workmanship during the installation process."
    },
    {
      id: 5,
      question: "What causes deterioration faults over time?",
      options: ["Poor design", "Bad installation", "Age, wear, and environmental factors", "Physical damage"],
      correctAnswer: 2,
      explanation: "Deterioration faults develop over time due to age, wear, environmental factors, and normal operational stresses."
    },
    {
      id: 6,
      question: "Give an example of external damage that could cause electrical faults.",
      options: ["Loose connections", "Inadequate cable size", "Construction work damaging cables", "Old insulation"],
      correctAnswer: 2,
      explanation: "External damage includes physical damage from construction work, impact damage, or deliberate interference with electrical equipment."
    },
    {
      id: 7,
      question: "Which fault category is most likely to cause immediate danger?",
      options: ["Design faults only", "Any category can cause immediate danger", "Only external damage", "Only deterioration faults"],
      correctAnswer: 1,
      explanation: "Any category of fault can create immediate danger depending on the specific circumstances and location of the fault."
    },
    {
      id: 8,
      question: "What is the key difference between design and installation faults?",
      options: ["No difference", "Design faults occur during planning, installation faults during construction", "Only timing", "Only severity"],
      correctAnswer: 1,
      explanation: "Design faults occur during the planning/design phase, while installation faults happen during the actual construction/installation work."
    },
    {
      id: 9,
      question: "How can deterioration faults be prevented?",
      options: ["They cannot be prevented", "Regular inspection and maintenance", "Better installation only", "Improved design only"],
      correctAnswer: 1,
      explanation: "Deterioration faults can be prevented or delayed through regular inspection, maintenance, and timely replacement of aging components."
    },
    {
      id: 10,
      question: "Why is it important to understand fault categories?",
      options: ["Academic interest only", "Helps determine prevention strategies and responsibility", "No practical benefit", "Only for insurance claims"],
      correctAnswer: 1,
      explanation: "Understanding fault categories helps determine appropriate prevention strategies, assign responsibility, and implement effective maintenance programs."
    }
  ];

  const faqs = [
    {
      question: "Can one installation contain multiple fault categories?",
      answer: "Yes, it's common to find design, installation, deterioration, and external damage faults in the same electrical system."
    },
    {
      question: "Which fault category is most common during initial testing?",
      answer: "Installation faults are most common during initial testing because they result from workmanship issues during construction."
    },
    {
      question: "Which fault category usually requires complete redesign to fix?",
      answer: "Design faults typically cannot be corrected without significant redesign and modification of the electrical system."
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
      <main className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-8">
        {/* Header */}
        <header className="mb-4 md:mb-6 lg:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="p-1.5 md:p-2 rounded-lg bg-card">
              <Layers className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs md:text-sm">
              Section 7.1.4
            </Badge>
          </div>
          <h1 className="text-lg md:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">
            Categories of Electrical Faults
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-3xl">
            Learn about the four main categories of electrical faults and their characteristics.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-4 md:mb-6 lg:mb-8 p-3 md:p-4 lg:p-6 bg-card border-border/20">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 lg:mb-6">
            <Target className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-foreground" />
            <h2 className="text-base md:text-lg lg:text-lg sm:text-xl font-semibold text-foreground">Introduction</h2>
          </div>
          <div className="grid gap-3 md:gap-4 lg:gap-6 md:grid-cols-2 text-xs md:text-sm lg:text-base text-foreground">
            <div className="rounded-lg p-2 md:p-3 lg:p-4 bg-card border border-border/30">
              <p className="font-medium mb-1 md:mb-2 text-xs md:text-sm">In 30 seconds</p>
              <ul className="list-disc pl-4 md:pl-6 space-y-0.5 md:space-y-1">
                <li>Four main categories: design, installation, deterioration, external damage.</li>
                <li>Each category has different causes and prevention strategies.</li>
                <li>Understanding categories helps with fault finding and responsibility.</li>
              </ul>
            </div>
            <div className="rounded-lg p-2 md:p-3 lg:p-4 bg-card border border-emerald-500/30">
              <p className="font-medium mb-1 md:mb-2 text-xs md:text-sm">Spot it / Use it</p>
              <ul className="list-disc pl-4 md:pl-6 space-y-0.5 md:space-y-1">
                <li><strong>Spot:</strong> When faults occurred, how they developed, what caused them.</li>
                <li><strong>Use:</strong> Category knowledge for prevention strategies and responsibility.</li>
                <li><strong>Check:</strong> Design adequacy, installation quality, maintenance needs.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-4 md:mb-6 lg:mb-8 p-3 md:p-4 lg:p-6 bg-card border-border/20">
          <h2 className="text-base md:text-lg lg:text-lg sm:text-xl font-semibold text-foreground mb-3 md:mb-4">Introduction</h2>
          <p className="text-sm md:text-base text-foreground mb-3 md:mb-4">
            Not all electrical faults are the same—they arise from different causes and require different approaches for prevention and correction. Understanding the four main categories of electrical faults helps electricians identify root causes, assign responsibility, and implement effective prevention strategies. This classification system is essential for proper fault diagnosis and long-term system reliability.
          </p>
          
          <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-400 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Why This Matters</p>
                <p className="text-xs sm:text-sm text-foreground">
                  Proper fault categorisation helps determine liability, guides maintenance strategies, and prevents recurrence. It's the difference between reactive repairs and proactive system management.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-base text-foreground">
              <strong>Professional Benefit:</strong> Understanding fault categories allows electricians to provide better advice to clients, implement targeted prevention measures, and maintain safer electrical systems.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Industry Standard:</strong> BS 7671 emphasises the importance of understanding fault origins to ensure appropriate protective measures and maintenance schedules are implemented.
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Legal Importance:</strong> Fault categorisation helps establish liability and demonstrates due diligence in maintenance and safety management under EAWR 1989.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-base text-foreground mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Identify and describe the four main categories of electrical faults.</li>
            <li>Explain how each category of fault develops and their typical characteristics.</li>
            <li>Recognise real-world examples of each fault type in electrical installations.</li>
            <li>Appreciate why classification helps with fault finding, prevention, and responsibility.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Design Faults */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Design Faults</h3>
            <p className="text-base text-foreground mb-4">
              Design faults occur before installation begins—they are errors in the planning and specification phase:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Design Fault Characteristics</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm md:text-base text-foreground mb-2"><strong>Common Design Faults:</strong></p>
                        <div className="grid gap-3 sm:grid-cols-2 mb-3">
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Undersized Cables</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Cable ratings insufficient for intended loads</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Inadequate Protection</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Protective devices not sized for fault conditions</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Poor Load Assessment</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Incorrect calculation of anticipated loads</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-sm md:text-base">Environmental Neglect</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Failure to account for environmental conditions</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Key Characteristics:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-foreground">
                            <li>Present from day one of installation</li>
                            <li>Often require complete redesign to correct</li>
                            <li>Can be detected through proper design review</li>
                            <li>May not be apparent until systems are loaded</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Prevention Strategy</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Design faults are prevented through proper design review, adequate load assessment, compliance with BS 7671, and consideration of future requirements and environmental factors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="design-faults-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Installation Faults */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Installation Faults</h3>
            <p className="text-base text-foreground mb-4">
              Installation faults arise during construction and are typically caused by poor workmanship:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3">Installation Fault Types</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Common Installation Faults:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-3">
                          <div className="grid gap-3 lg:grid-cols-2">
                            <div>
                              <p className="font-medium text-foreground mb-2 text-sm md:text-base">Workmanship Issues</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-foreground">
                                <li>Loose terminal connections</li>
                                <li>Incorrect polarity connections</li>
                                <li>Damaged cables during installation</li>
                                <li>Poor cable management</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2 text-sm md:text-base">System Errors</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-foreground">
                                <li>Missing or incorrect earthing</li>
                                <li>Cross-connected circuits</li>
                                <li>Inadequate IP ratings for location</li>
                                <li>Non-compliance with BS 7671</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Detection and Prevention:</strong></p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-2">Detection Methods</p>
                            <p className="text-xs sm:text-sm text-foreground">Initial testing and inspection reveals most installation faults</p>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-2">Prevention</p>
                            <p className="text-xs sm:text-sm text-foreground">Proper training, supervision, and quality control procedures</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                        <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Important Note</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Installation faults are the most preventable category through proper training, supervision, and adherence to installation standards and procedures.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="installation-faults-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Deterioration Faults */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Deterioration Faults</h3>
            <p className="text-base text-foreground mb-4">
              Deterioration faults develop over time as systems age and components degrade:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Deterioration Processes</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Environmental Factors</p>
                          <p className="text-xs sm:text-sm text-foreground">Heat, moisture, chemicals, and UV causing material degradation</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Operational Stress</p>
                          <p className="text-xs sm:text-sm text-foreground">Thermal cycling, vibration, and electrical stress over time</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Material Aging</p>
                          <p className="text-xs sm:text-sm text-foreground">Natural degradation of insulation, conductors, and protective devices</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Corrosion</p>
                          <p className="text-xs sm:text-sm text-foreground">Electrochemical processes affecting connections and components</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Management Strategy:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Regular inspection and testing programs</li>
                          <li>Planned maintenance and component replacement</li>
                          <li>Environmental protection measures</li>
                          <li>Monitoring of system performance indicators</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Key Understanding</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Deterioration is inevitable but manageable. Regular inspection and maintenance can identify degradation before it becomes dangerous or causes system failure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="deterioration-faults-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* External Damage Faults */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. External Damage Faults</h3>
            <p className="text-base text-foreground mb-4">
              External damage faults are caused by influences outside the electrical system itself:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3">External Damage Sources</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Physical Impact</p>
                          <p className="text-xs sm:text-sm text-foreground">Construction work, vehicle impact, or accidental damage to equipment</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Penetration Damage</p>
                          <p className="text-xs sm:text-sm text-foreground">Nails, screws, or drilling through concealed cables</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Animal Damage</p>
                          <p className="text-xs sm:text-sm text-foreground">Rodents chewing through cables or nesting in equipment</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Environmental Events</p>
                          <p className="text-xs sm:text-sm text-foreground">Flooding, fire, lightning, or extreme weather damage</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Protection Strategies:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Proper cable routing and mechanical protection</li>
                          <li>Adequate IP ratings for environmental conditions</li>
                          <li>Physical barriers and enclosures</li>
                          <li>Clear marking and identification of electrical services</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Critical Point</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          While external damage may be unpredictable, proper installation practices and protective measures can significantly reduce the risk and severity of such incidents.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="external-damage-check"
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
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Fault Identification and Classification:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Always determine the fault category as part of the investigation process.</li>
                <li>Consider when the fault likely occurred and what may have caused it.</li>
                <li>Document the category in fault reports to help with prevention strategies.</li>
                <li>Use categorisation to guide discussions about responsibility and liability.</li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Prevention Strategies by Category:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li><strong>Design:</strong> Thorough design review, proper load assessment, compliance verification.</li>
                <li><strong>Installation:</strong> Skilled tradespeople, proper supervision, quality control procedures.</li>
                <li><strong>Deterioration:</strong> Regular inspection, planned maintenance, environmental protection.</li>
                <li><strong>External Damage:</strong> Proper protection, clear marking, risk assessment.</li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Professional Application:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Use fault categories to advise clients on prevention and maintenance needs.</li>
                <li>Implement targeted inspection procedures based on likely fault categories.</li>
                <li>Establish responsibility and liability through proper fault categorisation.</li>
                <li>Develop maintenance schedules appropriate to fault risk categories.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-medium text-foreground mb-3">Case Study: Office Building Fault Investigation</h3>
              <p className="text-base text-foreground mb-4">
                During testing of an office refurbishment, electricians found multiple faults that clearly demonstrated all four categories:
              </p>
              <ul className="space-y-3 text-base text-foreground">
                <li><strong>Design Fault:</strong> The main distribution board cables were consistently overheating because they were undersized for the connected load—a design error that existed from day one.</li>
                <li><strong>Installation Fault:</strong> Several socket circuits had loose earth connections at terminals, clearly resulting from poor workmanship during installation.</li>
                <li><strong>Deterioration Fault:</strong> Lighting circuits in the roof space showed degraded insulation due to prolonged exposure to heat from poorly ventilated areas.</li>
                <li><strong>External Damage Fault:</strong> One circuit was completely dead due to a cable damaged by a contractor's screw during recent partition installation work.</li>
              </ul>
              <p className="text-base text-foreground mt-4">
                <strong>Outcome:</strong> Each fault category required a different response—redesign for the undersized cables, repair work for installation faults, planned replacement for deteriorated circuits, and protection measures to prevent future external damage.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-base font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Design faults occur during planning and typically require redesign to correct properly.</li>
            <li>Installation faults result from poor workmanship and are preventable through proper training and supervision.</li>
            <li>Deterioration faults develop over time and require regular inspection and maintenance to manage effectively.</li>
            <li>External damage faults are caused by outside influences but can be minimised through proper protection and installation practices.</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz</h2>
          <Quiz questions={quizQuestions} title="Categories of Electrical Faults" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Previous: Risks and Consequences</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../1-5">
              <span className="hidden sm:inline">Legal Responsibilities</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section1_4;