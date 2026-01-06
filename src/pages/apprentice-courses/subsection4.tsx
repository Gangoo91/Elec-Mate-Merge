import { ArrowLeft, ArrowRight, Shield, Target, CheckCircle, AlertTriangle, FileText, Users, Gavel, Briefcase, ClipboardList, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "The Role of Regulatory Bodies - Module 1.1.4 | Level 2 Electrical Course";
const DESCRIPTION = "Understand the role of regulatory bodies in electrical safety. Learn about HSE enforcement, local authority powers, and compliance responsibilities.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the HSE's primary role in electrical safety?",
    options: [
      "Providing free electrical training",
      "Enforcing health and safety law and providing guidance",
      "Installing electrical systems",
      "Selling electrical equipment"
    ],
    correctIndex: 1,
    explanation: "The HSE enforces health and safety law, provides guidance, and investigates serious incidents."
  },
  {
    id: 2,
    question: "Which body typically enforces electrical safety in shops and offices?",
    options: [
      "Fire brigade",
      "Police",
      "Local authority",
      "Electricity supplier"
    ],
    correctIndex: 2,
    explanation: "Local authorities typically enforce health and safety law in shops, offices, and most service sector premises."
  },
  {
    id: 3,
    question: "What can happen if an employer fails to comply with electrical safety regulations?",
    options: [
      "Nothing happens",
      "Written warning only",
      "Prosecution, fines, imprisonment, or prohibition notices",
      "Free training courses"
    ],
    correctIndex: 2,
    explanation: "Non-compliance can result in prosecution, substantial fines, imprisonment, prohibition notices, or improvement notices."
  }
];

const Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the HSE's primary role in electrical safety?",
      options: [
        "Providing free electrical training",
        "Enforcing health and safety law and providing guidance",
        "Installing electrical systems",
        "Selling electrical equipment"
      ],
      correctAnswer: 1,
      explanation: "The HSE enforces health and safety law, provides guidance, and investigates serious incidents."
    },
    {
      id: 2,
      question: "Which body typically enforces electrical safety in shops and offices?",
      options: [
        "Fire brigade",
        "Police",
        "Local authority",
        "Electricity supplier"
      ],
      correctAnswer: 2,
      explanation: "Local authorities typically enforce health and safety law in shops, offices, and most service sector premises."
    },
    {
      id: 3,
      question: "What can happen if an employer fails to comply with electrical safety regulations?",
      options: [
        "Nothing happens",
        "Written warning only",
        "Prosecution, fines, imprisonment, or prohibition notices",
        "Free training courses"
      ],
      correctAnswer: 2,
      explanation: "Non-compliance can result in prosecution, substantial fines, imprisonment, prohibition notices, or improvement notices."
    },
    {
      id: 4,
      question: "What enforcement powers do HSE inspectors have?",
      options: [
        "Advisory powers only",
        "Can issue improvement notices, prohibition notices, and prosecute",
        "Can only observe and report",
        "No legal powers"
      ],
      correctAnswer: 1,
      explanation: "HSE inspectors have strong legal powers including issuing notices and bringing prosecutions."
    },
    {
      id: 5,
      question: "Who is responsible for ensuring electrical safety compliance in a workplace?",
      options: [
        "Apprentices only",
        "The HSE",
        "Employers (and employees have duties too)",
        "Local council"
      ],
      correctAnswer: 2,
      explanation: "Employers have primary responsibility for compliance, though employees also have duties under the law."
    },
    {
      id: 6,
      question: "What should you do if you believe electrical safety is being compromised?",
      options: [
        "Ignore it if you're not in charge",
        "Report to supervisor or, if necessary, the enforcing authority",
        "Continue working normally",
        "Wait for someone else to notice"
      ],
      correctAnswer: 1,
      explanation: "Safety concerns should be reported through proper channels, and workers have a duty to report dangers."
    },
    {
      id: 7,
      question: "Which regulatory body would investigate a fatal electrical accident in a factory?",
      options: [
        "Local authority",
        "Police only",
        "HSE",
        "Electricity supplier"
      ],
      correctAnswer: 2,
      explanation: "The HSE investigates serious workplace accidents in industrial premises."
    },
    {
      id: 8,
      question: "What is a prohibition notice?",
      options: [
        "A friendly suggestion",
        "An order to stop dangerous work immediately",
        "A training requirement",
        "A planning permission"
      ],
      correctAnswer: 1,
      explanation: "A prohibition notice legally requires dangerous work to stop immediately until safety issues are resolved."
    }
  ];

  const faqs = [
    {
      question: "How do I know which regulatory body enforces safety in my workplace?",
      answer: "Generally, HSE covers factories, construction sites, and heavy industry. Local authorities cover shops, offices, hotels, and most service sectors. Your employer should know who the enforcing authority is for your workplace."
    },
    {
      question: "Can regulatory bodies enter workplaces unannounced?",
      answer: "Yes, HSE and local authority inspectors have legal powers to enter workplaces during working hours without prior notice to carry out inspections and investigations."
    },
    {
      question: "What happens during a regulatory inspection?",
      answer: "Inspectors examine working practices, equipment, documentation, and may speak to workers. They can take photographs, samples, and measurements. They may issue advice, notices, or in serious cases, take prosecution action."
    },
    {
      question: "Can individual workers be prosecuted under health and safety law?",
      answer: "Yes, employees have legal duties too. Workers can be prosecuted if they deliberately breach safety rules or endanger themselves or others through reckless behaviour."
    },
    {
      question: "How can I report safety concerns to regulatory bodies?",
      answer: "Contact HSE through their website, phone line, or email. For premises regulated by local authorities, contact the local council's environmental health department. You can report anonymously if preferred."
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
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 1.1.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            The Role of Regulatory Bodies
          </h1>
          <p className="text-muted-foreground">
            Understand how regulatory bodies enforce electrical safety law, their powers, and your responsibilities for compliance.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>HSE and local authorities enforce electrical safety law in different workplace types.</li>
                <li>They have strong legal powers including prosecution and stopping dangerous work.</li>
                <li>Understanding enforcement helps ensure compliance and workplace safety.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> HSE notices, local authority letters, inspector visits, compliance certificates.</li>
                <li><strong>Use:</strong> Compliance checklists, safety reporting procedures, enforcement guidance.</li>
                <li><strong>Check:</strong> Who enforces safety in your workplace, current compliance status.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Identify the main regulatory bodies that enforce electrical safety law.</li>
            <li>Understand the different enforcement powers and how they are used.</li>
            <li>Recognise employer and employee responsibilities for compliance.</li>
            <li>Know how to report safety concerns to appropriate authorities.</li>
            <li>Understand the consequences of non-compliance with electrical safety law.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* HSE Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Health and Safety Executive (HSE)</h3>
            <p className="text-base text-foreground mb-4">
              The HSE is Britain's national regulator for workplace health and safety, with specific responsibilities for electrical safety:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">HSE Powers and Responsibilities</p>
                    <p className="text-base text-foreground mb-2"><strong>Primary enforcement role:</strong> HSE enforces safety law in high-risk industries.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Factories, construction sites, chemical plants, offshore installations</li>
                      <li>Heavy manufacturing, engineering works, and industrial premises</li>
                      <li>Nuclear facilities, mines, quarries, and major hazard sites</li>
                      <li>Railways, airports, and docks (safety aspects)</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Inspector powers:</strong> HSE inspectors have extensive legal powers.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Enter premises at any reasonable time (including unannounced visits)</li>
                      <li>Examine, investigate, and take measurements/photographs</li>
                      <li>Take samples of articles and substances</li>
                      <li>Interview workers and examine documents/records</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Enforcement actions:</strong> Range from advice to prosecution.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Improvement notices (time to fix problems)</li>
                      <li>Prohibition notices (stop dangerous work immediately)</li>
                      <li>Prosecution in courts (fines and imprisonment possible)</li>
                      <li>Fee for intervention (charging for time spent on serious breaches)</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> HSE focuses on preventing work-related death, injury and ill health
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="hse-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <Separator className="my-6" />

          {/* Local Authority Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Local Authority Enforcement</h3>
            <p className="text-base text-foreground mb-4">
              Local councils enforce health and safety law in lower-risk service sector premises:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Local Authority Powers and Scope</p>
                    <p className="text-base text-foreground mb-2"><strong>Enforcement scope:</strong> Local authorities cover service and retail sectors.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Shops, supermarkets, retail outlets</li>
                      <li>Offices, banks, call centres</li>
                      <li>Hotels, restaurants, pubs, leisure facilities</li>
                      <li>Schools (non-maintained), care homes, hospitals (limited)</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Environmental Health Officers:</strong> Qualified professionals with enforcement powers.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Similar powers to HSE inspectors within their scope</li>
                      <li>Can enter premises, investigate, and take enforcement action</li>
                      <li>Issue improvement and prohibition notices</li>
                      <li>Prosecute for breaches of health and safety law</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Local focus:</strong> Understanding local business and community needs.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Work closely with local businesses to promote compliance</li>
                      <li>Provide advice and guidance tailored to local conditions</li>
                      <li>Respond to complaints and incidents in their area</li>
                      <li>Coordinate with HSE on complex or serious matters</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Local authorities bring health and safety enforcement closer to communities
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="la-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Separator className="my-6" />

          {/* Compliance Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Compliance Responsibilities and Consequences</h3>
            <p className="text-base text-foreground mb-4">
              Understanding your responsibilities and the consequences of non-compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">Responsibilities and Enforcement Consequences</p>
                    <p className="text-base text-foreground mb-2"><strong>Employer responsibilities:</strong> Primary duty to ensure safety.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Ensure electrical systems are designed, installed, and maintained safely</li>
                      <li>Provide adequate training and information to workers</li>
                      <li>Carry out risk assessments and implement control measures</li>
                      <li>Cooperate with enforcing authorities and comply with notices</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Worker responsibilities:</strong> Contributing to workplace safety.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Follow safety instructions and use equipment properly</li>
                      <li>Report dangers and defects to supervisors</li>
                      <li>Not deliberately interfere with safety equipment</li>
                      <li>Cooperate with employer's safety arrangements</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Consequences of non-compliance:</strong> Serious legal and financial penalties.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Prosecution in Magistrates' Court (up to £20,000 fine and 6 months imprisonment)</li>
                      <li>Crown Court prosecution (unlimited fines and up to 2 years imprisonment)</li>
                      <li>Company directors can be personally prosecuted</li>
                      <li>Civil claims for compensation from injured workers</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> Everyone has responsibilities - compliance protects workers and businesses
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="compliance-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </Card>

        {/* Real-world scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-elec-yellow" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Real-world scenario: Multi-agency response</h2>
          </div>
          <div className="space-y-4 text-base text-foreground">
            <p>
              <strong>Scenario:</strong> An electrical fire at a retail park shopping centre causes evacuation and minor injuries to shoppers.
            </p>
            <p>
              <strong>Response:</strong> Multiple agencies become involved:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Fire Brigade:</strong> Emergency response and fire investigation</li>
              <li><strong>Local Authority:</strong> Enforces health and safety law for the shops affected</li>
              <li><strong>HSE:</strong> May become involved if construction work was taking place</li>
              <li><strong>Police:</strong> Crowd control and potentially criminal investigation</li>
              <li><strong>Building Control:</strong> Structural safety and building regulation compliance</li>
            </ul>
            <p>
              This shows how different regulatory bodies work together to ensure comprehensive investigation and appropriate enforcement action.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Frequently asked questions</h2>
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-medium text-foreground">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                {index < faqs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-elec-yellow/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="space-y-3 text-base text-foreground">
            <p>
              Regulatory bodies play a crucial role in enforcing electrical safety law. The HSE covers high-risk industrial premises while local authorities enforce safety in shops, offices, and service sectors.
            </p>
            <p>
              Both have strong legal powers including issuing notices and prosecution. Employers have primary responsibility for compliance, but workers also have important duties.
            </p>
            <p>
              Understanding who enforces safety in your workplace and your responsibilities helps ensure compliance and protects everyone from electrical hazards.
            </p>
          </div>
        </Card>

        {/* Apprentice do's and don'ts */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <Card className="p-6 bg-card border-green-500/20">
            <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Do's for apprentices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground">
              <li>• Know who the enforcing authority is for your workplace</li>
              <li>• Report safety concerns through proper channels</li>
              <li>• Cooperate fully with inspector visits and investigations</li>
              <li>• Understand your responsibilities under health and safety law</li>
              <li>• Support your employer's compliance efforts</li>
            </ul>
          </Card>
          <Card className="p-6 bg-card border-red-500/20">
            <h3 className="font-semibold text-red-600 dark:text-elec-yellow mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Don'ts for apprentices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground">
              <li>• Never ignore safety concerns or assume someone else will report them</li>
              <li>• Don't interfere with safety equipment or procedures</li>
              <li>• Never provide false information to inspectors</li>
              <li>• Don't assume all workplaces have the same enforcing authority</li>
              <li>• Never think regulatory compliance is someone else's responsibility</li>
            </ul>
          </Card>
        </div>

        {/* Quick reference pocket card */}
        <Card className="mb-8 p-6 bg-card border-elec-yellow/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-elec-yellow" />
            Pocket card: Regulatory bodies quick reference
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">HSE enforces in:</h3>
              <ul className="text-foreground space-y-1">
                <li>• Factories and manufacturing</li>
                <li>• Construction sites</li>
                <li>• Chemical plants and heavy industry</li>
                <li>• Nuclear, mining, offshore</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Local authorities enforce in:</h3>
              <ul className="text-foreground space-y-1">
                <li>• Shops and retail outlets</li>
                <li>• Offices and banks</li>
                <li>• Hotels and restaurants</li>
                <li>• Most service sector premises</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Inspector powers:</h3>
              <ul className="text-foreground space-y-1">
                <li>• Enter premises unannounced</li>
                <li>• Investigate and take evidence</li>
                <li>• Issue notices and prosecute</li>
                <li>• Stop dangerous work immediately</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Report concerns to:</h3>
              <ul className="text-foreground space-y-1">
                <li>• HSE: Factories, construction, industry</li>
                <li>• Local council: Shops, offices, services</li>
                <li>• Through supervisor or direct contact</li>
                <li>• Can report anonymously if preferred</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz title="The Role of Regulatory Bodies Quiz" questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="../subsection3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          
          <Button className="flex-1" asChild>
            <Link to="../subsection5">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section1_4;