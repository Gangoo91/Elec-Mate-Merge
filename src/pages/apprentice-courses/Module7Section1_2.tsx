import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Settings, BookOpen, Clipboard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Why Faults Occur in Electrical Installations - Module 7.1.2 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding the common causes of electrical faults including poor workmanship, material failure, environmental influences, and misuse.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "How can a loose connection during installation lead to a future electrical fault?",
    options: ["It cannot cause problems", "Loose connections cause overheating, arcing, and eventual failure", "It makes connections stronger", "It improves current flow"],
    correctIndex: 1,
    explanation: "Loose connections cause overheating and arcing due to increased resistance, which can lead to insulation damage and fire risks."
  },
  {
    id: 2,
    question: "Why is periodic inspection necessary even if an installation was originally safe?",
    options: ["It's not necessary", "Materials deteriorate over time due to heat, UV, and wear", "To create more work", "To use more equipment"],
    correctIndex: 1,
    explanation: "Even correctly installed materials deteriorate over time due to heat, UV exposure, mechanical wear, and ageing, making periodic inspection essential."
  },
  {
    id: 3,
    question: "Name two environmental conditions that can contribute to electrical faults.",
    options: ["Good lighting and clean air", "Moisture ingress and excessive heat", "Low humidity and stable temperature", "Fresh air and dry conditions"],
    correctIndex: 1,
    explanation: "Moisture ingress and excessive heat are major environmental factors that can cause insulation breakdown and electrical faults."
  },
  {
    id: 4,
    question: "What can happen if a socket outlet is consistently overloaded?",
    options: ["Nothing happens", "Overheating leading to insulation breakdown and fire risk", "It becomes more efficient", "It uses less electricity"],
    correctIndex: 1,
    explanation: "Consistent overloading causes overheating, which accelerates insulation breakdown and creates serious fire risks."
  }
];

const Module7Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is one of the most common causes of electrical faults in new installations?",
      options: ["Good materials", "Poor workmanship and installation practices", "Expensive equipment", "Proper testing"],
      correctAnswer: 1,
      explanation: "Poor workmanship during installation, such as loose connections and damaged insulation, is one of the leading causes of electrical faults."
    },
    {
      id: 2,
      question: "How can a loose connection cause a fault over time?",
      options: ["It improves with age", "Increased resistance causes overheating, arcing, and eventual failure", "It has no effect", "It reduces electricity usage"],
      correctAnswer: 1,
      explanation: "Loose connections create increased resistance, leading to overheating and arcing that can cause insulation damage and fire."
    },
    {
      id: 3,
      question: "Why is periodic inspection important?",
      options: ["To create extra work", "To identify faults caused by ageing or deterioration before they become dangerous", "To increase costs", "To use more equipment"],
      correctAnswer: 1,
      explanation: "Periodic inspection (EICR) identifies faults caused by material ageing or deterioration before they create dangerous conditions."
    },
    {
      id: 4,
      question: "What effect can heat have on cable insulation?",
      options: ["Makes it stronger", "Can cause insulation to dry out, crack, and break down", "No effect", "Improves flexibility"],
      correctAnswer: 1,
      explanation: "Excessive heat causes cable insulation to dry out, crack, and break down, reducing its effectiveness and creating fault conditions."
    },
    {
      id: 5,
      question: "Name two environmental factors that can reduce insulation resistance.",
      options: ["Good ventilation and dry conditions", "Moisture ingress and excessive heat", "Clean air and stable temperature", "Low humidity and cool temperature"],
      correctAnswer: 1,
      explanation: "Moisture ingress and excessive heat are major environmental factors that can significantly reduce insulation resistance and cause faults."
    },
    {
      id: 6,
      question: "True or False: Once installed, electrical systems will not develop faults unless damaged.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Even properly installed systems develop faults over time due to material ageing, environmental conditions, and normal wear."
    },
    {
      id: 7,
      question: "What is the main risk of overloading sockets?",
      options: ["Nothing happens", "Overheating leading to insulation breakdown and fire", "Better performance", "Lower electricity bills"],
      correctAnswer: 1,
      explanation: "Overloading sockets causes overheating, which accelerates insulation breakdown and creates serious fire risks."
    },
    {
      id: 8,
      question: "How can rodents create electrical faults?",
      options: ["They cannot affect electrical systems", "By chewing through cable insulation and damaging conductors", "They improve cable performance", "They clean the cables"],
      correctAnswer: 1,
      explanation: "Rodents can chew through cable insulation and damage conductors, creating short circuits, earth faults, and fire risks."
    },
    {
      id: 9,
      question: "Why must installers select materials suitable for the environment?",
      options: ["To increase costs", "To prevent premature failure due to environmental conditions", "To look professional", "To use more materials"],
      correctAnswer: 1,
      explanation: "Selecting environment-appropriate materials prevents premature failure and ensures long-term safety and reliability of the installation."
    },
    {
      id: 10,
      question: "In the real-world example, what mistake led to cable deterioration near the cooker point?",
      options: ["Using expensive cable", "Using standard PVC cable too close to a heat source", "Proper installation", "Good workmanship"],
      correctAnswer: 1,
      explanation: "The installer used standard PVC cable too close to a heat source instead of heat-resistant cable, causing premature deterioration."
    }
  ];

  const faqs = [
    {
      question: "Can faults develop in a brand-new installation?",
      answer: "Yes — if workmanship is poor or the wrong materials are used. Even new installations can have faults if not properly designed, installed, or tested."
    },
    {
      question: "Do materials fail even if installed correctly?",
      answer: "Over time, yes. Ageing, heat, UV exposure, and mechanical wear can all cause properly installed materials to deteriorate and eventually fail."
    },
    {
      question: "Why do electricians carry out EICRs?",
      answer: "To identify faults caused by ageing or deterioration before they become dangerous. EICRs help maintain electrical safety throughout the installation's life."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
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
            <div className="p-2 rounded-lg ">
              <Settings className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs md:text-sm">
              Section 7.1.2
            </Badge>
          </div>
          <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Why Faults Occur in Electrical Installations
          </h1>
          <p className="text-sm md:text-base text-white max-w-3xl">
            Understanding the common causes of electrical faults and how to prevent them through proper practices.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
            <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-white">Introduction</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 text-sm md:text-base text-white">
            <div className="rounded-lg p-3 md:p-4 bg-transparent border border-border/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Faults occur due to poor workmanship, material failure, and environmental factors.</li>
                <li>Most faults are preventable with correct practices.</li>
                <li>Understanding causes helps prevent future problems.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 md:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Loose connections, wrong materials, environmental stress.</li>
                <li><strong>Use:</strong> Proper installation techniques, suitable materials, maintenance.</li>
                <li><strong>Check:</strong> Environmental conditions, material suitability, workmanship quality.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-transparent border-white/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-sm md:text-base text-white mb-4">
            Electrical faults don't happen by accident — they occur because of underlying causes such as poor workmanship, material failure, or external influences like heat, water, or physical damage. Understanding why faults occur helps electricians prevent them in the first place and recognise the conditions that increase risk. This knowledge is essential for developing professional competence and ensuring long-term system reliability.
          </p>
          
          <div className="rounded-lg p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-elec-yellow dark:text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Why This Matters</p>
                <p className="text-xs md:text-xs sm:text-sm text-white">
                  Industry research shows that over 80% of electrical faults are caused by preventable factors during installation or maintenance. 
                  Understanding these causes enables electricians to implement prevention strategies that can reduce fault occurrence by up to 90% in properly managed installations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <p className="text-sm md:text-base text-white">
              <strong>Economic Impact:</strong> The average cost of rectifying electrical faults in commercial installations ranges from £500-£5,000 per incident, 
              not including potential business disruption, safety risks, or legal costs. Prevention through understanding root causes is always more cost-effective than correction.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs md:text-xs sm:text-sm text-white">
                <strong>Industry Standard:</strong> BS 7671:2018+A2:2022 Section 134 requires that installations be designed and installed to facilitate proper inspection, testing, and maintenance. 
                Understanding potential fault causes is essential for meeting these requirements and ensuring compliance throughout the installation's operational life.
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
              <p className="text-xs md:text-xs sm:text-sm text-white">
                <strong>Professional Responsibility:</strong> Under the Construction (Design and Management) Regulations 2015, designers and installers have a duty to consider foreseeable risks. 
                Understanding fault causes is essential for fulfilling this legal obligation and protecting both workers and end users.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-transparent border-white/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-sm md:text-base text-white mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-white">
            <li>Explain the common causes of electrical faults.</li>
            <li>Understand how poor installation practices create faults.</li>
            <li>Recognise how materials and equipment can deteriorate over time.</li>
            <li>Appreciate the role of external influences (e.g., moisture, heat, damage) in fault development.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-transparent border-white/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Poor Workmanship */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Poor Workmanship and Installation Practices</h3>
            <p className="text-sm md:text-base text-white mb-4">
              Poor installation practices are the leading cause of electrical faults in new installations, accounting for approximately 45% of all faults discovered during initial testing and commissioning:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Installation Quality Impact</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm md:text-base text-white mb-2"><strong>Common Installation Faults and Their Consequences:</strong></p>
                        <div className="grid gap-3 sm:grid-cols-2 mb-3">
                          <div className="bg-[#121212]/50 p-3 rounded border">
                            <p className="font-medium text-white mb-1 text-sm md:text-base">Loose Connections</p>
                            <p className="text-xs md:text-xs sm:text-sm text-white">Terminal screws not tightened to manufacturer's torque settings</p>
                            <p className="text-xs text-red-600 dark:text-elec-yellow mt-1">→ Overheating, arcing, fire risk</p>
                          </div>
                          <div className="bg-[#121212]/50 p-3 rounded border">
                            <p className="font-medium text-white mb-1 text-sm md:text-base">Poor Terminations</p>
                            <p className="text-xs md:text-xs sm:text-sm text-white">Inadequate conductor preparation or wrong terminal type</p>
                            <p className="text-xs text-red-600 dark:text-elec-yellow mt-1">→ High resistance joints, equipment failure</p>
                          </div>
                          <div className="bg-[#121212]/50 p-3 rounded border">
                            <p className="font-medium text-white mb-1 text-sm md:text-base">Polarity Errors</p>
                            <p className="text-xs md:text-xs sm:text-sm text-white">Line and neutral conductors incorrectly connected</p>
                            <p className="text-xs text-red-600 dark:text-elec-yellow mt-1">→ Shock risk, equipment malfunction</p>
                          </div>
                          <div className="bg-[#121212]/50 p-3 rounded border">
                            <p className="font-medium text-white mb-1 text-sm md:text-base">Installation Damage</p>
                            <p className="text-xs md:text-xs sm:text-sm text-white">Cable insulation damaged during installation</p>
                            <p className="text-xs text-red-600 dark:text-elec-yellow mt-1">→ Earth faults, insulation failure</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm md:text-base text-white mb-2"><strong>Root Causes of Poor Workmanship:</strong></p>
                        <ul className="text-xs md:text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Inadequate training:</strong> Insufficient knowledge of BS 7671 requirements and proper techniques</li>
                          <li><strong>Time pressure:</strong> Rushing work to meet unrealistic deadlines</li>
                          <li><strong>Poor supervision:</strong> Lack of quality control and inspection during installation</li>
                          <li><strong>Wrong tools:</strong> Using inappropriate or damaged tools for connections</li>
                          <li><strong>Environmental factors:</strong> Working in difficult conditions without proper precautions</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Prevention Key</p>
                        <p className="text-xs sm:text-sm text-white">
                          Careful workmanship and adherence to BS 7671 standards prevent many faults before they occur. Quality installation is the first line of defence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="workmanship-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Material Failure */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Material Failure and Deterioration</h3>
            <p className="text-base text-white mb-4">
              Even correctly installed materials can deteriorate over time due to various factors:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Material Ageing Process</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm md:text-base text-white mb-2"><strong>Material Degradation Mechanisms:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-3">
                          <div className="grid gap-3 lg:grid-cols-2">
                            <div>
                              <p className="font-medium text-white mb-2 text-sm md:text-base">Environmental Factors</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-white">
                                <li><strong>Heat Exposure:</strong> Accelerates polymer degradation, causes insulation to become brittle</li>
                                <li><strong>UV Radiation:</strong> Breaks down molecular bonds in outdoor cable sheaths</li>
                                <li><strong>Moisture:</strong> Causes metal corrosion and reduces insulation properties</li>
                                <li><strong>Chemical Attack:</strong> Industrial environments with acids, alkalis, or solvents</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2 text-sm md:text-base">Mechanical Stress</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-white">
                                <li><strong>Vibration:</strong> Gradual loosening of connections and conductor fatigue</li>
                                <li><strong>Thermal Cycling:</strong> Expansion and contraction causing stress</li>
                                <li><strong>Cable Movement:</strong> Flexing in service causing conductor breakage</li>
                                <li><strong>Physical Loading:</strong> Weight or impact damage over time</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm md:text-base text-white mb-2"><strong>Predictable Failure Patterns:</strong></p>
                        <div className="space-y-3">
                          <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                            <p className="font-medium text-amber-700 dark:text-amber-400 mb-2 text-sm md:text-base">PVC Cable Insulation (Typical Lifespan: 25-30 years)</p>
                            <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-white">
                              <li>Years 1-10: Minimal degradation under normal conditions</li>
                              <li>Years 10-20: Gradual hardening and loss of flexibility</li>
                              <li>Years 20+: Cracking, especially at terminations and bends</li>
                            </ul>
                          </div>
                          <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                            <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2 text-sm md:text-base">Protective Devices (Typical Lifespan: 20-25 years)</p>
                            <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-white">
                              <li>Years 1-15: Reliable operation with minimal maintenance</li>
                              <li>Years 15-20: Increased operating times, contact wear</li>
                              <li>Years 20+: Risk of failure to operate or nuisance tripping</li>
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
            id="material-failure-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Environmental Influences */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Environmental and External Influences</h3>
            <p className="text-base text-white mb-4">
              External factors are another major cause of electrical faults:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3">Environmental Hazards</p>
                    
                    <div className="space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-[#121212]/50 p-3 rounded border">
                          <p className="font-medium text-white mb-2 text-sm md:text-base">Moisture Problems</p>
                          <ul className="text-xs md:text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Water ingress from leaks or flooding</li>
                            <li>Condensation in cold environments</li>
                            <li>High humidity reducing insulation resistance</li>
                            <li>Corrosion of metalwork and connections</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/50 p-3 rounded border">
                          <p className="font-medium text-white mb-2 text-sm md:text-base">Heat Problems</p>
                          <ul className="text-xs md:text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Excessive ambient temperatures</li>
                            <li>Heat from nearby equipment or processes</li>
                            <li>Solar heating of outdoor installations</li>
                            <li>Poor ventilation in enclosures</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/50 p-3 rounded border">
                          <p className="font-medium text-white mb-2 text-sm md:text-base">Physical Damage</p>
                          <ul className="text-xs md:text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Rodents chewing cable insulation</li>
                            <li>Accidental drilling or nailing</li>
                            <li>Impact damage during construction</li>
                            <li>Excavation damage to underground cables</li>
                          </ul>
                        </div>
                        <div className="bg-[#121212]/50 p-3 rounded border">
                          <p className="font-medium text-white mb-2 text-sm md:text-base">Chemical Attack</p>
                          <ul className="text-xs md:text-xs sm:text-sm text-white list-disc ml-4 space-y-1">
                            <li>Corrosive atmospheres in industrial areas</li>
                            <li>Salt spray in coastal locations</li>
                            <li>Chemical spills and contamination</li>
                            <li>Cleaning agents affecting materials</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-elec-yellow mb-2">Design Consideration</p>
                        <p className="text-xs sm:text-sm text-white">
                          Electrical systems must be designed and installed with environmental risks in mind, using suitable materials and protective measures.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="environmental-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Overloading and Misuse */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Overloading and Misuse</h3>
            <p className="text-base text-white mb-4">
              Circuits are designed with specific limits, and exceeding those limits creates fault conditions:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-3">Usage-Related Faults</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Common Misuse Examples:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Overloading socket outlets with too many appliances</li>
                          <li>Running equipment beyond its rated capacity</li>
                          <li>Modifying circuits without proper knowledge or approval</li>
                          <li>Using inappropriate extension leads or adaptors</li>
                          <li>Ignoring manufacturer's operating instructions</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Consequences of Overloading:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-white">
                            <li>Overheating of conductors and accessories</li>
                            <li>Accelerated insulation breakdown</li>
                            <li>Increased fire risk</li>
                            <li>Premature failure of protective devices</li>
                            <li>Reduced lifespan of electrical equipment</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Education Importance</p>
                        <p className="text-xs sm:text-sm text-white">
                          Educating clients and users about proper electrical usage is just as important as correct installation for preventing faults.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="overloading-check"
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-transparent border-white/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-white">
            <li>Always carry out neat, accurate, and careful installation work to minimise future faults.</li>
            <li>Select materials suited to the environment (e.g., armoured cable outdoors, heat-resistant cable near boilers).</li>
            <li>Encourage clients to avoid misuse, such as overloading extensions or modifying circuits.</li>
            <li>Remember: many faults are preventable with correct design, good workmanship, and appropriate maintenance.</li>
          </ul>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-transparent border-white/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-base text-white mb-4">
              A community centre experienced repeated tripping on its kitchen ring circuit. Investigation revealed that the cable insulation had degraded near a cooker point. The original installation used standard PVC cable too close to a heat source, which accelerated deterioration. The installer had not considered the environmental conditions. The cable had to be replaced with heat-resistant cable at extra cost.
            </p>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-white">
                <strong>Lesson:</strong> Most faults are not random — they are caused by preventable factors such as poor installation practices, unsuitable materials, or environmental stress.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-transparent border-white/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg p-4 bg-muted/50 border border-border/30">
                <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                <p className="text-xs sm:text-sm text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-transparent border-white/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide</h2>
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="rounded-lg p-3 md:p-4 bg-transparent border border-elec-yellow/30">
              <h3 className="font-medium text-white mb-3 text-sm md:text-base">Prevention Checklist</h3>
              <ul className="text-xs md:text-xs sm:text-sm text-white space-y-1">
                <li>• Use proper installation techniques</li>
                <li>• Select environment-appropriate materials</li>
                <li>• Make secure, tight connections</li>
                <li>• Protect cables from damage</li>
                <li>• Consider heat, moisture, and chemical exposure</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 md:p-4 bg-transparent border border-border/30">
              <h3 className="font-medium text-white mb-3 text-sm md:text-base">Warning Signs</h3>
              <ul className="text-xs md:text-xs sm:text-sm text-white space-y-1">
                <li>• Overheating at connections</li>
                <li>• Discoloration or burning smells</li>
                <li>• Brittle or cracked insulation</li>
                <li>• Corrosion on metalwork</li>
                <li>• Moisture ingress indicators</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-transparent border-white/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-sm md:text-base text-white">
            Faults occur because of poor workmanship, material failure, environmental influences, or misuse. They are rarely random — most are predictable and preventable. Understanding why faults occur helps electricians design better, install carefully, and maintain systems safely. The key is to consider all factors during installation and to educate users about proper electrical system use.
          </p>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-transparent border-white/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check</h2>
          <Quiz questions={quizQuestions} title="Test your understanding of why electrical faults occur" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: What Is a Fault?
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../1-3">
              Next: Subsection 1.3
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section1_2;