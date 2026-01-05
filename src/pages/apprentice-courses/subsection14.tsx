import { ArrowLeft, Shield, CheckCircle, HardHat, Eye, Zap, Wrench, AlertTriangle, Calendar, Users, BookOpen, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Personal Protective Equipment (PPE) - Section 4.1 | Level 2 Electrical Course";
const DESCRIPTION = "Learn about PPE types, standards, and best practices for electrical work safety compliance.";

const Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: 1,
      question: "What is the primary role of PPE in electrical safety?",
      options: [
        "To replace all other safety measures",
        "As a last line of defense when other controls fail",
        "To make electrical work faster",
        "To reduce the need for risk assessments"
      ],
      correctIndex: 1,
      explanation: "PPE is the last line of defense in the hierarchy of control, used when other safety measures cannot completely eliminate risks."
    },
    {
      id: 2,
      question: "Which PPE item is essential for all electrical work?",
      options: [
        "Hard hat",
        "Safety gloves",
        "Safety boots",
        "High-visibility vest"
      ],
      correctIndex: 2,
      explanation: "Safety boots with electrical insulation are essential for all electrical work to protect against electric shock through the feet."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What does PPE stand for?",
      options: [
        "Personal Protection Equipment",
        "Personal Protective Equipment", 
        "Professional Protection Equipment",
        "Public Protective Equipment"
      ],
      correctAnswer: 1,
      explanation: "PPE stands for Personal Protective Equipment - clothing or gear designed to protect you from injury or exposure to hazards on site."
    },
    {
      id: 2,
      question: "Name three types of PPE an electrician might use.",
      options: [
        "Hard hat, safety boots, toolbox",
        "Insulated gloves, safety glasses, flame-resistant clothing",
        "Ladder, multimeter, wire strippers", 
        "First aid kit, mobile phone, clipboard"
      ],
      correctAnswer: 1,
      explanation: "Insulated gloves, safety glasses, and flame-resistant clothing are all essential PPE for electrical work to protect against various hazards."
    },
    {
      id: 3,
      question: "Why is it important to wear flame-resistant clothing?",
      options: [
        "To look professional",
        "To stay warm in cold weather",
        "To protect against arc flash burns",
        "To comply with uniform requirements"
      ],
      correctAnswer: 2,
      explanation: "Flame-resistant clothing protects against arc flash burns by using materials that won't melt onto the skin during an electrical arc event."
    },
    {
      id: 4,
      question: "Who is responsible for providing PPE on site?",
      options: [
        "The individual worker",
        "The employer",
        "The site manager only",
        "The insurance company"
      ],
      correctAnswer: 1,
      explanation: "Under UK law, the employer is responsible for providing PPE free of charge to workers."
    },
    {
      id: 5,
      question: "True or False: PPE replaces the need for safe working procedures.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. PPE should never replace good safety practices - it's the last line of defence when other safety measures aren't enough."
    }
  ];

  const faqs = [
    {
      question: "How often should PPE be inspected?",
      answer: "PPE should be inspected before each use for visible damage, wear, or contamination. Additionally, formal periodic inspections should be carried out according to manufacturer guidelines and workplace procedures."
    },
    {
      question: "Who is responsible for providing PPE?",
      answer: "Employers are legally required to provide suitable PPE free of charge when risks cannot be adequately controlled by other means. This includes initial provision, replacement when worn out, and maintenance."
    },
    {
      question: "Can I use my own PPE instead of company-provided equipment?",
      answer: "You can only use personal PPE if it meets the same standards as company-provided equipment and has been approved by your employer. All PPE must be suitable for the specific risks and work environment."
    },
    {
      question: "What should I do if my PPE is damaged?",
      answer: "Stop work immediately if the damage affects protection, report the damage to your supervisor, and obtain replacement PPE before continuing. Damaged PPE must be taken out of service and properly disposed of."
    },
    {
      question: "Is training required for PPE use?",
      answer: "Yes, employers must provide information, instruction, and training on proper PPE selection, use, maintenance, and storage. Workers must understand how to inspect PPE and recognise when replacement is needed."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 4.1
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Personal Protective Equipment (PPE)
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Understanding PPE selection, use, and maintenance for electrical safety
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Last Line:</strong> PPE is the final defense when other controls fail.</li>
                <li><strong>Standards:</strong> Must meet BS EN standards for electrical protection.</li>
                <li><strong>Essential:</strong> Safety boots, gloves, and eye protection are key items.</li>
                <li><strong>Inspection:</strong> Check before each use for damage or wear.</li>
                <li><strong>Training:</strong> Proper use and maintenance training is mandatory.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Live work, arc flash risks, overhead lines, confined spaces.</li>
                <li><strong>Use:</strong> Risk assessments, method statements, job briefings.</li>
                <li><strong>Apply:</strong> Right PPE for right risk, proper fit, regular inspection.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Understand the role of PPE in the hierarchy of control</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Identify essential PPE items for different electrical work scenarios</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Know the relevant BS EN standards for electrical PPE</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Understand proper PPE inspection, maintenance, and replacement procedures</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Recognise common PPE mistakes and how to avoid them</span>
            </li>
          </ul>
        </Card>

        {/* What is PPE */}
        <div className="mb-8 border-l-4 border-emerald-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">What is PPE?</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-emerald-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200 font-medium">
                Personal Protective Equipment (PPE) is specialised clothing or equipment worn by individuals to protect against safety and health risks. 
                In electrical work, PPE serves as the last line of defence when other safety measures cannot completely eliminate risks.
              </p>
            </div>
            
            <p className="text-muted-foreground">
              PPE should never be the first choice for risk control. According to the hierarchy of control, you should first try to eliminate, 
              substitute, or engineer out the hazard. PPE is used when these primary methods cannot adequately reduce the risk to an acceptable level.
            </p>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2 text-amber-800 dark:text-amber-200">
                <AlertTriangle className="h-4 w-4" />
                Remember: PPE as Last Resort
              </h4>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                PPE should be considered only after elimination, substitution, engineering controls, and administrative controls 
                have been assessed and implemented where reasonably practicable.
              </p>
            </div>
          </div>
        </div>

        <InlineCheck
          id="ppe-basic"
          question="What is the primary role of PPE in electrical safety?"
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Common PPE for Electrical Work */}
        <div className="mb-8 border-l-4 border-emerald-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Common PPE for Electrical Work</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <HardHat className="h-4 w-4 text-emerald-400" />
                  Safety Helmet/Hard Hat
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Protects against falling objects and impact injuries.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Must comply with BS EN 397</li>
                  <li>• Check for cracks before each use</li>
                  <li>• Replace every 3-5 years or after impact</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-emerald-400" />
                  Safety Glasses/Goggles
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Protects eyes from arc flash, debris, and chemical splashes.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Must comply with BS EN 166</li>
                  <li>• Side protection recommended</li>
                  <li>• Anti-fog coating for comfort</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-emerald-400" />
                  Insulating Gloves
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Essential for live work and protection against electric shock.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Must comply with BS EN 60903</li>
                  <li>• Class 0: Up to 1kV AC / 1.5kV DC</li>
                  <li>• Test every 6 months</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  Safety Footwear
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Provides electrical insulation and protection from falling objects.
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Must comply with BS EN 50321</li>
                  <li>• 18kV electrical resistance minimum</li>
                  <li>• Composite toe caps for live work</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional PPE in Certain Situations */}
        <div className="mb-8 border-l-4 border-purple-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Additional PPE in Certain Situations</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-1 gap-4">
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">Arc Flash Protection</h4>
                <p className="text-sm text-red-700 dark:text-emerald-400 mb-2">
                  Required when risk assessment identifies potential for arc flash incidents.
                </p>
                <ul className="text-xs text-red-600 dark:text-emerald-400 space-y-1">
                  <li>• Arc-rated face shields (BS EN 61482)</li>
                  <li>• Flame-resistant clothing</li>
                  <li>• Full body coverage required</li>
                  <li>• Minimum 8 cal/cm² for most electrical work</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">High Voltage Work</h4>
                <p className="text-sm text-purple-700 dark:text-emerald-400 mb-2">
                  Enhanced protection required for work above 1kV.
                </p>
                <ul className="text-xs text-purple-600 dark:text-emerald-400 space-y-1">
                  <li>• Class 2 or higher insulating gloves</li>
                  <li>• Insulating mats and blankets</li>
                  <li>• Arc flash suits</li>
                  <li>• Specialist rescue equipment nearby</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          id="ppe-essential"
          question="Which PPE item is essential for all electrical work?"
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* PPE Standards and Classifications */}
        <div className="mb-8 border-l-4 border-orange-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">PPE Standards and Classifications</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Insulating Gloves Classifications</h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-2 text-left">Class</th>
                      <th className="border border-border p-2 text-left">Max AC Voltage</th>
                      <th className="border border-border p-2 text-left">Max DC Voltage</th>
                      <th className="border border-border p-2 text-left">Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="border border-border p-2">Class 0</td>
                      <td className="border border-border p-2">1,000V</td>
                      <td className="border border-border p-2">1,500V</td>
                      <td className="border border-border p-2">Low voltage work</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Class 1</td>
                      <td className="border border-border p-2">7,500V</td>
                      <td className="border border-border p-2">11,250V</td>
                      <td className="border border-border p-2">HV distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Class 2</td>
                      <td className="border border-border p-2">17,000V</td>
                      <td className="border border-border p-2">25,500V</td>
                      <td className="border border-border p-2">HV transmission</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Arc Flash Protection Levels</h4>
              <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <p className="text-orange-800 dark:text-orange-200 text-sm mb-2">
                  Arc flash protection is categorised by energy levels measured in calories per square centimetre (cal/cm²):
                </p>
                <ul className="text-orange-700 dark:text-emerald-400 text-xs space-y-1">
                  <li>• <strong>Category 1:</strong> 4 cal/cm² - Minimum for electrical work</li>
                  <li>• <strong>Category 2:</strong> 8 cal/cm² - Standard for most electrical installations</li>
                  <li>• <strong>Category 3:</strong> 25 cal/cm² - High-energy systems</li>
                  <li>• <strong>Category 4:</strong> 40 cal/cm² - Maximum protection available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Common PPE Mistakes to Avoid */}
        <div className="mb-8 border-l-4 border-red-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Common PPE Mistakes to Avoid</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">❌ Wrong Size/Fit</h4>
                <p className="text-red-700 dark:text-emerald-400 text-sm">
                  PPE that doesn't fit properly provides inadequate protection and can be dangerous.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">❌ Skipping Inspection</h4>
                <p className="text-red-700 dark:text-emerald-400 text-sm">
                  Using damaged or worn PPE can be worse than using none at all.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">❌ Wrong PPE for Task</h4>
                <p className="text-red-700 dark:text-emerald-400 text-sm">
                  Using inappropriate PPE for the specific electrical hazard present.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">❌ Poor Maintenance</h4>
                <p className="text-red-700 dark:text-emerald-400 text-sm">
                  Not cleaning, storing, or maintaining PPE according to manufacturer instructions.
                </p>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">✅ Best Practices</h4>
              <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                <li>• Always inspect before use</li>
                <li>• Choose the right protection level for the hazard</li>
                <li>• Ensure proper fit and comfort</li>
                <li>• Follow manufacturer's care instructions</li>
                <li>• Replace when damaged or expired</li>
                <li>• Get proper training on use and maintenance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real World Example */}
        <div className="mb-8 border-l-4 border-emerald-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">6</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Real World Example</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              <strong>Scenario:</strong> An electrician was called to fault-find on a commercial lighting circuit. 
              The circuit kept tripping the RCD, and the client was pressuring for a quick fix as it was affecting their business.
            </p>
            
            <p className="text-muted-foreground">
              <strong>The Problem:</strong> The electrician wore his regular work gloves instead of Class 0 insulating gloves, 
              thinking the circuit was isolated. When testing revealed the circuit was still live, he received a shock through his non-insulating gloves.
            </p>
            
            <p className="text-muted-foreground">
              <strong>The Learning:</strong> Always assume circuits are live until proven otherwise. The right PPE (insulating gloves) 
              would have prevented this incident. PPE standards exist for a reason - they are the minimum requirement, not the maximum.
            </p>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Key Takeaway:</strong> Never compromise on PPE standards due to time pressure or assumptions about circuit state. 
                Proper PPE inspection and selection takes minutes but can prevent life-changing injuries.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border pb-4 last:border-b-0">
                <h4 className="font-semibold mb-2 text-emerald-400">{faq.question}</h4>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>PPE is the last line of defence in the hierarchy of control</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Essential PPE includes safety boots, gloves, eye protection, and hard hats</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>All electrical PPE must meet relevant BS EN standards</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Pre-use inspection is mandatory for all PPE</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Arc flash protection may be required for specific high-risk tasks</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Proper training in PPE use and maintenance is legally required</span>
            </li>
          </ul>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section4_1;