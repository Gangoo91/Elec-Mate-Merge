import { ArrowLeft, Shield, CheckCircle, Calendar, FileCheck, AlertTriangle, RefreshCw, Users, Wrench, Eye, Settings, BookOpen, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "PPE Selection, Maintenance and Inspection - Section 4.2 | Level 2 Electrical Course";
const DESCRIPTION = "Master PPE selection criteria, maintenance schedules, and inspection procedures for electrical safety compliance.";

const Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: 1,
      question: "How often should PPE be formally inspected?",
      options: [
        "Once a year",
        "Every 6 months",
        "Before each use and periodically as per manufacturer guidelines",
        "Only when it looks damaged"
      ],
      correctIndex: 2,
      explanation: "PPE should be inspected before each use and undergo formal periodic inspections according to manufacturer guidelines and workplace procedures."
    },
    {
      id: 2,
      question: "Who is responsible for providing PPE in the workplace?",
      options: [
        "The individual worker",
        "The employer",
        "The safety representative",
        "The equipment manufacturer"
      ],
      correctIndex: 1,
      explanation: "Employers are legally responsible for providing suitable PPE free of charge when risks cannot be adequately controlled by other means."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Name two factors to consider when selecting PPE.",
      options: [
        "Price and colour",
        "Hazard and task",
        "Brand and availability", 
        "Size and weight"
      ],
      correctAnswer: 1,
      explanation: "When selecting PPE, you must consider the hazard (what could cause harm) and the task (what work is being performed) to ensure appropriate protection."
    },
    {
      id: 2,
      question: "Who is responsible for maintaining PPE?",
      options: [
        "Only the employer",
        "Only the employee",
        "Both employer and employee have responsibilities",
        "The manufacturer only"
      ],
      correctAnswer: 2,
      explanation: "Both employers and employees have responsibilities: employers must provide, replace, and maintain PPE, while employees must use it correctly, check it, and report issues."
    },
    {
      id: 3,
      question: "When should PPE be taken out of use?",
      options: [
        "Only when it's completely broken",
        "When it's damaged, doesn't fit, or is past its expiry date",
        "Only at the end of the project",
        "When it looks dirty"
      ],
      correctAnswer: 1,
      explanation: "PPE should be taken out of use when damaged, when it no longer fits properly, after its expiry or test date, or when visibly contaminated or worn."
    },
    {
      id: 4,
      question: "What markings must approved PPE have?",
      options: [
        "Made in UK marking",
        "CE or UKCA markings",
        "Company logo",
        "Serial number only"
      ],
      correctAnswer: 1,
      explanation: "Approved PPE must have CE or UKCA markings to ensure it's legally approved and tested to meet safety standards."
    },
    {
      id: 5,
      question: "True or False: If PPE looks clean, it's always safe to use.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. PPE that looks clean may still be damaged, past its expiry date, or have invisible defects that compromise its protective capability."
    }
  ];

  const faqs = [
    {
      question: "What should I do if PPE doesn't fit properly?",
      answer: "Never use PPE that doesn't fit correctly. Inform your supervisor immediately and request properly fitting equipment. Ill-fitting PPE can provide inadequate protection or create additional hazards."
    },
    {
      question: "Can I modify PPE to make it more comfortable?",
      answer: "No, never modify PPE as this can compromise its protective properties and void certifications. If comfort is an issue, speak to your supervisor about alternative approved options that provide the same level of protection."
    },
    {
      question: "How do I know when insulating gloves need testing?",
      answer: "Insulating gloves must be tested every 6 months or after any suspected damage. Many gloves have test dates marked on them. If in doubt, don't use them - get them tested or replaced."
    },
    {
      question: "What records should be kept for PPE?",
      answer: "Keep records of issue dates, inspection schedules, test results (for items like insulating gloves), replacement dates, and any training provided. This helps demonstrate compliance and track equipment lifecycle."
    },
    {
      question: "Can I take work PPE home for personal use?",
      answer: "Generally no, unless specifically authorised. Work PPE is provided for workplace hazards and should remain in the workplace. Personal use may lead to contamination, damage, or the equipment not being available when needed for work."
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
                Module 4.2
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                PPE Selection, Maintenance and Inspection
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Ensuring PPE effectiveness through proper selection, care, and regular inspection
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
                <li><strong>Selection:</strong> Choose PPE based on risk assessment and task requirements.</li>
                <li><strong>Inspection:</strong> Before each use plus formal periodic checks.</li>
                <li><strong>Maintenance:</strong> Clean, store, and maintain per manufacturer instructions.</li>
                <li><strong>Records:</strong> Keep documentation of inspections, tests, and replacements.</li>
                <li><strong>Training:</strong> Ensure all users understand proper use and care.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Worn PPE, wrong protection level, poor storage, missed inspections.</li>
                <li><strong>Use:</strong> PPE assessments, maintenance schedules, training records.</li>
                <li><strong>Apply:</strong> Right PPE for right risk, regular checks, proper care.</li>
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
              <span>Select appropriate PPE based on risk assessment and task analysis</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Understand inspection requirements and procedures for different PPE types</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Know when PPE should be replaced and disposal procedures</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Understand employer and employee responsibilities for PPE management</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Apply proper maintenance and storage procedures to extend PPE life</span>
            </li>
          </ul>
        </Card>

        {/* PPE Selection Criteria */}
        <div className="mb-8 border-l-4 border-emerald-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">PPE Selection Criteria</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-emerald-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="font-medium text-blue-800 dark:text-blue-200 mb-3">
                Selecting the right PPE requires careful analysis of the work environment, tasks, and potential hazards. 
                The selection must be based on a thorough risk assessment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-emerald-400" />
                  Risk Assessment Factors
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Voltage levels and arc flash potential</li>
                  <li>• Environmental conditions (wet, confined spaces)</li>
                  <li>• Duration and frequency of exposure</li>
                  <li>• Physical demands of the task</li>
                  <li>• Compatibility with other PPE</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-400" />
                  Personal Factors
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Individual fit and comfort</li>
                  <li>• Medical conditions or allergies</li>
                  <li>• Training and competence level</li>
                  <li>• Job role and responsibilities</li>
                  <li>• Previous incident history</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Selection Process</h4>
              <ol className="text-green-700 dark:text-green-300 text-sm space-y-1 list-decimal list-inside">
                <li>Conduct detailed risk assessment</li>
                <li>Identify specific protection requirements</li>
                <li>Research suitable PPE options and standards</li>
                <li>Consider user requirements and constraints</li>
                <li>Trial and evaluate options with users</li>
                <li>Select and specify appropriate PPE</li>
                <li>Provide training and documentation</li>
              </ol>
            </div>
          </div>
        </div>

        <InlineCheck
          id="ppe-inspection"
          question="How often should PPE be formally inspected?"
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Maintenance Requirements */}
        <div className="mb-8 border-l-4 border-emerald-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Maintenance Requirements</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-emerald-400" />
                  Daily Inspection
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check for visible damage or wear</li>
                  <li>• Ensure proper fit and function</li>
                  <li>• Look for contamination or degradation</li>
                  <li>• Verify expiry dates and test dates</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  Periodic Inspection
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Formal inspection per manufacturer schedule</li>
                  <li>• Electrical testing for insulating equipment</li>
                  <li>• Documentation of inspection results</li>
                  <li>• Professional assessment of condition</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-emerald-400" />
                  Cleaning & Care
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Follow manufacturer cleaning instructions</li>
                  <li>• Use appropriate cleaning materials only</li>
                  <li>• Allow complete drying before storage</li>
                  <li>• Avoid harsh chemicals or solvents</li>
                </ul>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-emerald-400" />
                  Storage Requirements
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Store in clean, dry conditions</li>
                  <li>• Protect from UV light and ozone</li>
                  <li>• Avoid extreme temperatures</li>
                  <li>• Keep away from sharp objects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Replacement Criteria */}
        <div className="mb-8 border-l-4 border-purple-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">When to Replace PPE</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-red-800 dark:text-red-200">Immediate Replacement Required</h4>
              <ul className="text-red-700 dark:text-emerald-400 text-sm space-y-1">
                <li>• Visible damage (cracks, tears, holes)</li>
                <li>• Failed electrical test</li>
                <li>• Contamination that cannot be cleaned</li>
                <li>• Poor fit after sizing changes</li>
                <li>• After exposure to chemicals or extreme heat</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">Scheduled Replacement</h4>
              <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
                <li>• Reached manufacturer's expiry date</li>
                <li>• Exceeded recommended usage period</li>
                <li>• Normal wear and tear affecting function</li>
                <li>• Updated standards require newer equipment</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          id="ppe-responsibility"
          question="Who is responsible for providing PPE in the workplace?"
          options={quickCheckQuestions[1].options}
          correctIndex={quickCheckQuestions[1].correctIndex}
          explanation={quickCheckQuestions[1].explanation}
        />

        {/* Responsibilities */}
        <div className="mb-8 border-l-4 border-orange-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Responsibilities for PPE Management</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Employer Responsibilities</h4>
                <ul className="text-blue-700 dark:text-emerald-400 text-sm space-y-1">
                  <li>• Provide suitable PPE free of charge</li>
                  <li>• Ensure PPE meets relevant standards</li>
                  <li>• Provide training on proper use</li>
                  <li>• Maintain and replace when necessary</li>
                  <li>• Establish inspection schedules</li>
                  <li>• Keep records of provision and training</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Employee Responsibilities</h4>
                <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                  <li>• Use PPE correctly as trained</li>
                  <li>• Inspect before each use</li>
                  <li>• Report defects immediately</li>
                  <li>• Store and maintain properly</li>
                  <li>• Attend training sessions</li>
                  <li>• Follow workplace PPE policies</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">Legal Requirements</h4>
              <p className="text-amber-700 dark:text-amber-300 text-sm mb-2">
                The Personal Protective Equipment at Work Regulations 1992 require:
              </p>
              <ul className="text-amber-700 dark:text-amber-300 text-sm space-y-1">
                <li>• PPE to be provided when risks cannot be controlled by other means</li>
                <li>• PPE to be suitable for the risks and the individual</li>
                <li>• Information, instruction, and training to be provided</li>
                <li>• PPE to be properly maintained and kept in good repair</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Testing and Certification */}
        <div className="mb-8 border-l-4 border-red-500 p-6 bg-card rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Testing and Certification</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-purple-800 dark:text-purple-200">Electrical Testing Requirements</h4>
              <div className="overflow-x-auto mt-2">
                <table className="w-full border border-border text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-2 text-left">PPE Type</th>
                      <th className="border border-border p-2 text-left">Test Frequency</th>
                      <th className="border border-border p-2 text-left">Test Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2">Insulating Gloves</td>
                      <td className="border border-border p-2">Every 6 months</td>
                      <td className="border border-border p-2">BS EN 60903</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Insulating Sleeves</td>
                      <td className="border border-border p-2">Every 12 months</td>
                      <td className="border border-border p-2">BS EN 60984</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Insulating Blankets</td>
                      <td className="border border-border p-2">Every 12 months</td>
                      <td className="border border-border p-2">BS EN 61112</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">Certification Requirements</h4>
              <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                <li>• All PPE must carry CE or UKCA marking</li>
                <li>• Manufacturer's certificate of conformity required</li>
                <li>• Test certificates for electrical PPE must be current</li>
                <li>• Documentation should be readily available for inspection</li>
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
              <strong>Scenario:</strong> A maintenance electrician had been using the same pair of insulating gloves for over a year. 
              The gloves looked fine and felt comfortable, so he saw no reason to replace them.
            </p>
            
            <p className="text-muted-foreground">
              <strong>The Problem:</strong> During a routine safety audit, it was discovered that the gloves were three months overdue for their 
              6-monthly electrical test. When finally tested, they failed the dielectric test, showing they provided no electrical protection.
            </p>
            
            <p className="text-muted-foreground">
              <strong>The Learning:</strong> The electrician had been working on live circuits with no protection for months without realising it. 
              Visual inspection alone is not sufficient for electrical PPE - formal testing is essential to verify continued protection.
            </p>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Key Takeaway:</strong> Always check test dates on electrical PPE and never use equipment that is overdue for testing. 
                Electrical protection can fail invisibly, making regular testing critical for safety.
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
              <span>PPE selection must be based on thorough risk assessment</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Daily inspection before use and periodic formal inspection are both required</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Electrical PPE requires regular testing to verify continued protection</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Both employers and employees have specific responsibilities for PPE</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Proper maintenance and storage are essential for PPE effectiveness</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Damaged or expired PPE must be immediately removed from service</span>
            </li>
          </ul>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />
      </div>
    </div>
  );
};

export default Section4_2;