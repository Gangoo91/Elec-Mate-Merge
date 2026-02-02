import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, FileText, Users, Gavel, Briefcase, ClipboardList, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "RIDDOR, PUWER & COSHH - Module 1.1.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master essential UK safety regulations for electrical work. Learn RIDDOR reporting, PUWER equipment safety, and COSHH hazardous substance controls.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is RIDDOR primarily concerned with?",
    options: [
      "Providing PPE",
      "Reporting certain work-related injuries, diseases and dangerous occurrences",
      "Approving contractors",
      "Testing electrical installations"
    ],
    correctIndex: 1,
    explanation: "RIDDOR sets legal duties to report specified incidents to the enforcing authority."
  },
  {
    id: 2,
    question: "Under PUWER, employers must ensure that work equipment is:",
    options: [
      "Used only by managers",
      "Suitable, maintained, and used by trained/competent persons",
      "Second-hand only",
      "Imported from the EU"
    ],
    correctIndex: 1,
    explanation: "PUWER requires equipment to be suitable, safe, maintained and used by competent persons with information and instruction."
  },
  {
    id: 3,
    question: "Which is a key requirement of COSHH?",
    options: [
      "Always store chemicals outside",
      "Assess and control exposure to hazardous substances",
      "Never use any cleaning products",
      "Test RCDs weekly"
    ],
    correctIndex: 1,
    explanation: "COSHH requires assessment and control of exposure to hazardous substances."
  }
];

const Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is RIDDOR primarily concerned with?",
      options: [
        "Providing PPE",
        "Reporting certain work-related injuries, diseases and dangerous occurrences",
        "Approving contractors",
        "Testing electrical installations"
      ],
      correctAnswer: 1,
      explanation: "RIDDOR sets legal duties to report specified incidents to the enforcing authority."
    },
    {
      id: 2,
      question: "Under PUWER, employers must ensure that work equipment is:",
      options: [
        "Used only by managers",
        "Suitable, maintained, and used by trained/competent persons",
        "Second-hand only",
        "Imported from the EU"
      ],
      correctAnswer: 1,
      explanation: "PUWER requires equipment to be suitable, safe, maintained and used by competent persons with information and instruction."
    },
    {
      id: 3,
      question: "Which is a key requirement of COSHH?",
      options: [
        "Always store chemicals outside",
        "Assess and control exposure to hazardous substances",
        "Never use any cleaning products",
        "Test RCDs weekly"
      ],
      correctAnswer: 1,
      explanation: "COSHH requires assessment and control of exposure to hazardous substances."
    },
    {
      id: 4,
      question: "An example of a dangerous occurrence under RIDDOR could be:",
      options: [
        "Tea spilt on a desk",
        "Accidental contact with live conductor causing serious burn",
        "Late arrival",
        "Broken pencil"
      ],
      correctAnswer: 1,
      explanation: "Serious electrical incidents can be reportable dangerous occurrences depending on circumstances."
    },
    {
      id: 5,
      question: "How do these regs relate to BS 7671?",
      options: [
        "They are unrelated",
        "They sit above BS 7671, and following BS 7671 helps meet legal duties to prevent danger and control risk",
        "They replace BS 7671 entirely",
        "They only apply in factories"
      ],
      correctAnswer: 1,
      explanation: "Legal regulations require preventing danger and controlling risks; BS 7671 offers technical means to achieve electrical safety."
    },
    {
      id: 6,
      question: "What should you do if you're exposed to hazardous substances?",
      options: [
        "Continue working normally",
        "Follow the Safety Data Sheet guidance and report to supervisor",
        "Ignore it if you feel fine",
        "Wait until the end of the shift"
      ],
      correctAnswer: 1,
      explanation: "Always follow Safety Data Sheet guidance and report exposures to your supervisor immediately."
    },
    {
      id: 7,
      question: "Before using electrical equipment, you should check:",
      options: [
        "Only if it looks damaged",
        "That it's suitable, inspected, and you're trained to use it",
        "The colour only",
        "Just plug it in and try"
      ],
      correctAnswer: 1,
      explanation: "PUWER requires equipment to be suitable, maintained, and used by competent persons."
    },
    {
      id: 8,
      question: "Which incident would likely require RIDDOR reporting?",
      options: [
        "Minor cut requiring plaster",
        "Electrical shock causing serious burn and hospital treatment",
        "Dropped tool with no injury",
        "Spilled tea on paperwork"
      ],
      correctAnswer: 1,
      explanation: "Serious injuries requiring hospital treatment are typically reportable under RIDDOR."
    }
  ];

  const faqs = [
    {
      question: "How do I know if an incident needs RIDDOR reporting?",
      answer: "RIDDOR reporting is required for specified injuries (fractures, amputations, serious burns), over-7-day incapacitation, dangerous occurrences, and specified occupational diseases. Your supervisor will determine if reporting is needed."
    },
    {
      question: "What's the difference between PUWER and electrical safety regulations?",
      answer: "PUWER covers all work equipment safety, while EAWR specifically covers electrical safety. Both apply to electrical equipment - PUWER for general equipment safety, EAWR for electrical-specific hazards."
    },
    {
      question: "Where do I find Safety Data Sheets (SDS)?",
      answer: "SDS should be readily available where hazardous substances are stored or used. Your employer must provide access to them. They contain vital information about hazards, handling, and emergency procedures."
    },
    {
      question: "Can apprentices use all types of electrical equipment?",
      answer: "Only if they're trained and competent on that specific equipment. PUWER requires training and competence. Complex or high-risk equipment may require additional authorisation."
    },
    {
      question: "What PPE is required under COSHH?",
      answer: "PPE depends on the specific hazardous substance and exposure route. Common electrical trade PPE includes safety glasses, gloves (chemical-resistant for solvents), and respiratory protection for dust. Follow the COSHH assessment."
    }
  ];

  return (
    <div className="bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 1.1.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            RIDDOR, PUWER & COSHH
          </h1>
          <p className="text-white/80">
            Master essential UK safety regulations for electrical work. Learn incident reporting, equipment safety, and hazardous substance controls.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Three key UK regulations work alongside EAWR and HASAWA.</li>
                <li>RIDDOR (incident reporting), PUWER (equipment safety), COSHH (hazardous substances).</li>
                <li>All electrical apprentices need to understand these supporting regulations.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Incident reporting procedures, equipment checks, safety data sheets.</li>
                <li><strong>Use:</strong> Pre-use equipment checks, proper substance handling, incident reporting.</li>
                <li><strong>Check:</strong> COSHH assessments, equipment inspection dates, reporting requirements.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Understand what incidents must be reported under RIDDOR and reporting procedures.</li>
            <li>Identify PUWER equipment safety requirements and pre-use checks.</li>
            <li>Apply COSHH principles to control hazardous substance exposure.</li>
            <li>Recognize how these regulations integrate with electrical safety practices.</li>
            <li>Follow proper procedures for incident reporting, equipment use, and substance handling.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* RIDDOR Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">RIDDOR - Reporting of Injuries, Diseases and Dangerous Occurrences</h3>
            <p className="text-base text-foreground mb-4">
              RIDDOR sets legal duties to report specified work-related injuries, diseases, and dangerous occurrences to the enforcing authority:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-1">RIDDOR Reporting Requirements and Process</p>
                    <p className="text-base text-foreground mb-2"><strong>What must be reported:</strong> Specified injuries, diseases and dangerous occurrences.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Specified injuries (fractures, amputations, serious burns, loss of consciousness)</li>
                      <li>Over-7-day incapacitation from work-related injury</li>
                      <li>Dangerous occurrences (electrical short circuits causing fire/explosion)</li>
                      <li>Specified occupational diseases diagnosed by a doctor</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Reporting process:</strong> Use HSE systems with proper timescales.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Report immediately for fatal/specified injuries (within 10 days for over-7-day injuries)</li>
                      <li>Use HSE's online reporting system or telephone</li>
                      <li>Keep records of all reportable incidents for 3 years</li>
                      <li>Responsible person (usually employer) makes the report</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Electrical context:</strong> Many electrical incidents are reportable under RIDDOR.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Electrical shock causing serious burns or hospital treatment</li>
                      <li>Fire or explosion from electrical short circuits</li>
                      <li>Falls from height during electrical work causing fractures</li>
                      <li>Over-7-day absence from electrical injuries</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Report serious incidents to help prevent future occurrences and meet legal duties
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="riddor-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <Separator className="my-6" />

          {/* PUWER Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">PUWER - Provision and Use of Work Equipment</h3>
            <p className="text-base text-foreground mb-4">
              PUWER ensures that work equipment is suitable, safe, inspected, maintained, and used by competent persons:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">PUWER Equipment Safety Requirements</p>
                    <p className="text-base text-foreground mb-2"><strong>Equipment suitability:</strong> All equipment must be suitable for its intended use.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Equipment must be suitable for the purpose and conditions of use</li>
                      <li>Regular inspection, testing, and maintenance required</li>
                      <li>Guards, protection devices, and safety features must be fitted and used</li>
                      <li>Only trained/competent persons may use equipment</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Pre-use equipment checks:</strong> Essential safety verification before use.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Visual inspection for damage and wear</li>
                      <li>Check leads, plugs, and connections for integrity</li>
                      <li>Verify guards and safety devices are fitted and functional</li>
                      <li>Confirm equipment is within test/inspection date</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Common electrical equipment:</strong> Examples requiring PUWER compliance.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Power tools (drills, grinders, saws) require regular PAT testing</li>
                      <li>Test equipment and meters need calibration and inspection</li>
                      <li>Extension leads and adaptors must be suitable for environment</li>
                      <li>Lifting equipment and access platforms need statutory inspections</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Equipment must be suitable, maintained, and used by competent persons with proper training
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="puwer-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Separator className="my-6" />

          {/* COSHH Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">COSHH - Control of Substances Hazardous to Health</h3>
            <p className="text-base text-foreground mb-4">
              COSHH requires employers to assess and control exposure to hazardous substances that could harm health:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">COSHH Assessment and Control Process</p>
                    <p className="text-base text-foreground mb-2"><strong>The COSHH process:</strong> Five-step approach to hazardous substance control.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Assess: Identify hazardous substances and exposure risks</li>
                      <li>Control: Implement hierarchy of controls (eliminate, substitute, enclose, ventilate, PPE)</li>
                      <li>Monitor: Check control measures are working effectively</li>
                      <li>Inform: Provide information, instruction, and training</li>
                      <li>Plan: Emergency procedures and health surveillance where needed</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Common electrical trade substances:</strong> Typical hazardous materials encountered.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Silica dust from drilling/chasing masonry - requires extraction and RPE</li>
                      <li>Solvents and cleaning agents - need ventilation and skin protection</li>
                      <li>Adhesives, resins, and sealants - avoid skin contact, use gloves</li>
                      <li>Lead dust from old paint/cables - specialist controls required</li>
                      <li>Asbestos in older buildings - specialist removal required</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Control measures:</strong> Hierarchy of protection methods.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Use on-tool extraction for drilling to control dust at source</li>
                      <li>Provide adequate ventilation in confined spaces</li>
                      <li>Use water suppression to control dust generation</li>
                      <li>Wear appropriate PPE (gloves, masks, goggles) as last resort</li>
                      <li>Maintain good personal hygiene and decontamination</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Safety Data Sheets (SDS):</strong> Every hazardous substance must have an SDS with hazard identification, safe handling, and emergency procedures
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="coshh-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </Card>

        {/* FAQ Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-base text-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz */}
        <Quiz title="RIDDOR, PUWER, COSHH Quiz" questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="/study-centre/apprentice/level2/module1/section1/1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>

          <Button className="flex-1" asChild>
            <Link to="/study-centre/apprentice/level2/module1/section1/1-4">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section1_3;