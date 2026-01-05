import { ArrowLeft, ArrowRight, Target, CheckCircle, AlertTriangle, Shield, Zap, BookOpen, Clipboard, Clock, TrendingDown, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Risks and Consequences of Electrical Faults - Module 7.1.3 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding the safety, legal, and business risks associated with electrical faults and their potential consequences.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the most serious direct safety risk from electrical faults?",
    options: ["Equipment damage", "Electric shock and electrocution", "Higher electricity bills", "Noisy equipment"],
    correctIndex: 1,
    explanation: "Electric shock and electrocution represent the most serious direct safety risks, potentially causing serious injury or death."
  },
  {
    id: 2,
    question: "What legal framework governs electrical safety in UK workplaces?",
    options: ["Building Regulations", "Electricity at Work Regulations 1989", "Health and Safety Act", "Fire Safety Order"],
    correctIndex: 1,
    explanation: "The Electricity at Work Regulations 1989 specifically govern electrical safety in UK workplaces and place legal duties on employers and employees."
  },
  {
    id: 3,
    question: "How can electrical faults impact business operations?",
    options: ["No impact on business", "Only affect electrical bills", "Cause production downtime and reputation damage", "Make equipment work better"],
    correctIndex: 2,
    explanation: "Electrical faults can cause significant production downtime, data loss, and damage to business reputation if not properly managed."
  }
];

const Module7Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What is the most serious direct safety risk from electrical faults?",
      options: ["Equipment damage", "Electric shock and electrocution", "Higher electricity bills", "Noisy equipment"],
      correctAnswer: 1,
      explanation: "Electric shock and electrocution represent the most serious direct safety risks, potentially causing serious injury or death."
    },
    {
      id: 2,
      question: "What percentage of UK workplace accidents involve electrical hazards according to HSE data?",
      options: ["Less than 1%", "Around 3%", "Over 10%", "Around 25%"],
      correctAnswer: 1,
      explanation: "HSE statistics show that electrical hazards are involved in approximately 3% of workplace accidents, representing over 1,000 incidents annually."
    },
    {
      id: 3,
      question: "What legal framework governs electrical safety in UK workplaces?",
      options: ["Building Regulations", "Electricity at Work Regulations 1989", "Health and Safety Act", "Fire Safety Order"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 specifically govern electrical safety in UK workplaces and place legal duties on employers and employees."
    },
    {
      id: 4,
      question: "What is the maximum fine for serious breaches of electrical safety regulations?",
      options: ["£1,000", "£10,000", "£50,000", "Unlimited"],
      correctAnswer: 3,
      explanation: "Serious breaches of electrical safety regulations can result in unlimited fines in Crown Court, plus potential imprisonment."
    },
    {
      id: 5,
      question: "What percentage of UK fires are caused by electrical faults?",
      options: ["Around 10%", "Around 20%", "Around 30%", "Around 50%"],
      correctAnswer: 2,
      explanation: "Approximately 30% of UK fires are caused by electrical faults, making it one of the leading causes of structural fires."
    },
    {
      id: 6,
      question: "How can electrical faults impact business operations?",
      options: ["No impact on business", "Only affect electrical bills", "Cause production downtime and reputation damage", "Make equipment work better"],
      correctAnswer: 2,
      explanation: "Electrical faults can cause significant production downtime, data loss, and damage to business reputation if not properly managed."
    },
    {
      id: 7,
      question: "What is arc flash and why is it dangerous?",
      options: ["A type of light bulb", "An explosive release of electrical energy", "Normal electrical operation", "A safety feature"],
      correctAnswer: 1,
      explanation: "Arc flash is an explosive release of electrical energy that can reach temperatures of 19,000°C and cause severe burns or death."
    },
    {
      id: 8,
      question: "Who can be held personally liable for electrical safety breaches?",
      options: ["Only company directors", "Only electricians", "Any employee with electrical responsibilities", "No one personally"],
      correctAnswer: 2,
      explanation: "Under EAWR 1989, any employee with electrical responsibilities can be held personally liable for safety breaches, facing fines and imprisonment."
    },
    {
      id: 9,
      question: "What should be the immediate response to discovering a serious electrical fault?",
      options: ["Continue working carefully", "Isolate the circuit and report immediately", "Fix it quickly", "Ignore if equipment still works"],
      correctAnswer: 1,
      explanation: "Serious electrical faults require immediate isolation of the circuit and reporting to prevent accidents and legal consequences."
    },
    {
      id: 10,
      question: "How do insurance companies typically respond to electrical fault-related claims?",
      options: ["Always pay full claims", "May reduce or refuse claims if proper maintenance wasn't carried out", "Insurance doesn't cover electrical faults", "Double the payout"],
      correctAnswer: 1,
      explanation: "Insurance companies may reduce or refuse claims if they find that proper electrical maintenance and testing wasn't carried out as required."
    }
  ];

  const faqs = [
    {
      question: "What is the most common cause of electrical accidents?",
      answer: "Contact with live parts due to poor isolation procedures or unidentified faults is the leading cause of electrical accidents in the workplace."
    },
    {
      question: "How much can electrical faults cost a business?",
      answer: "Costs can range from thousands for equipment damage to millions for major fire damage, plus legal costs, compensation claims, and lost business."
    },
    {
      question: "Can electrical faults affect insurance coverage?",
      answer: "Yes, insurance companies may refuse claims or increase premiums if they find that proper electrical maintenance and fault management wasn't carried out."
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
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs md:text-sm">
              Section 7.1.3
            </Badge>
          </div>
          <h1 className="text-lg md:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">
            Risks and Consequences of Electrical Faults
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-muted-foreground max-w-3xl">
            Understanding the safety, legal, and business risks associated with electrical faults and their potential consequences.
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
                <li>Electrical faults can cause shock, fire, and property damage.</li>
                <li>Legal consequences include prosecution and liability.</li>
                <li>Business impacts include downtime and reputation damage.</li>
              </ul>
            </div>
            <div className="rounded-lg p-2 md:p-3 lg:p-4 bg-card border border-emerald-500/30">
              <p className="font-medium mb-1 md:mb-2 text-xs md:text-sm">Spot it / Use it</p>
              <ul className="list-disc pl-4 md:pl-6 space-y-0.5 md:space-y-1">
                <li><strong>Spot:</strong> Burning smells, sparks, repeated tripping, hot surfaces.</li>
                <li><strong>Use:</strong> Immediate isolation, risk assessment, proper PPE.</li>
                <li><strong>Check:</strong> Insurance implications, legal compliance, safety procedures.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-4 md:mb-6 lg:mb-8 p-3 md:p-4 lg:p-6 bg-card border-border/20">
          <h2 className="text-base md:text-lg lg:text-lg sm:text-xl font-semibold text-foreground mb-3 md:mb-4">Introduction</h2>
          <p className="text-sm md:text-base text-foreground mb-3 md:mb-4">
            Electrical faults are not just technical problems—they represent serious risks that can have devastating consequences for safety, legal compliance, and business operations. Understanding these risks is essential for every electrician, as it drives the urgency and care required when dealing with electrical installations. This section examines the three main categories of consequences: immediate safety risks, legal and financial implications, and business impact.
          </p>
          
          <div className="rounded-lg p-3 md:p-4 bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 mt-3 md:mt-4">
            <div className="flex items-start gap-2 md:gap-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700 dark:text-emerald-400 mb-1 md:mb-2 text-sm md:text-base">Why This Matters</p>
                <p className="text-xs md:text-xs sm:text-sm text-foreground">
                  HSE statistics show that electrical incidents cause over 1,000 workplace accidents annually in the UK, with approximately 30% of structural fires being electrical in origin. Understanding consequences helps prioritise safety and drives proper fault management practices.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-3 md:mt-4 space-y-2 md:space-y-3">
            <p className="text-sm md:text-base text-foreground">
              <strong>Real Impact:</strong> A single electrical fault can escalate from a minor inconvenience to a major incident causing injury, prosecution, and business failure if not properly managed.
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 md:p-3 rounded border border-emerald-200 dark:border-emerald-800">
              <p className="text-xs md:text-xs sm:text-sm text-foreground">
                <strong>Industry Standard:</strong> BS 7671 requires that installations are safe for persons, livestock, and property. Any fault that compromises this safety must be treated as a priority requiring immediate action.
              </p>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-2 md:p-3 rounded border border-amber-200 dark:border-amber-800">
              <p className="text-xs md:text-xs sm:text-sm text-foreground">
                <strong>Legal Requirement:</strong> Under EAWR 1989, employers must ensure electrical systems are safe and maintained. Failing to address known faults can result in prosecution and unlimited fines.
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 md:p-3 rounded border border-purple-200 dark:border-purple-800">
              <p className="text-xs md:text-xs sm:text-sm text-foreground">
                <strong>Cost Factor:</strong> The average cost of electrical accidents to UK businesses exceeds £15 million annually when including insurance, legal costs, lost production, and reputation damage.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-4 md:mb-6 lg:mb-8 p-3 md:p-4 lg:p-6 bg-card border-border/20">
          <h2 className="text-base md:text-lg lg:text-lg sm:text-xl font-semibold text-foreground mb-3 md:mb-4">Learning Outcomes</h2>
          <p className="text-sm md:text-base text-foreground mb-3 md:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-4 md:pl-6 space-y-1 md:space-y-2 text-sm md:text-base text-foreground">
            <li>Identify immediate safety risks from electrical faults including shock, fire, and arc flash hazards.</li>
            <li>Understand legal and financial consequences of fault-related incidents including prosecution and liability.</li>
            <li>Recognise impacts on business operations including downtime, data loss, and reputation damage.</li>
            <li>Appreciate why immediate action is required when faults are discovered to prevent escalation.</li>
            <li>Evaluate the cost-benefit relationship between preventive maintenance and incident response.</li>
            <li>Apply risk assessment principles to electrical fault scenarios in different environments.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-4 md:mb-6 lg:mb-8 p-3 md:p-4 lg:p-6 bg-card border-border/20">
          <h2 className="text-base md:text-lg lg:text-lg sm:text-xl font-semibold text-foreground mb-3 md:mb-4">Content / Learning</h2>

          {/* Safety Risks */}
          <section className="mb-4 md:mb-6">
            <h3 className="font-medium text-foreground mb-3 md:mb-4 text-sm md:text-base">1. Safety Risks</h3>
            <p className="text-sm md:text-base text-foreground mb-3 md:mb-4">
              Electrical faults pose immediate and serious safety risks that can result in injury or death. Understanding these risks is crucial for maintaining workplace safety and protecting both workers and the general public:
            </p>
            
            <div className="space-y-3 md:space-y-4">
              <div className="rounded-lg p-3 md:p-4 lg:p-5 border-l-4 border-l-red-500 bg-card">
                <div className="flex items-start gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-emerald-400 mb-2 md:mb-3 text-sm md:text-base">Immediate Safety Hazards</p>
                    
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <p className="text-xs md:text-sm lg:text-base text-foreground mb-1 md:mb-2"><strong>Primary Safety Risks:</strong></p>
                        <div className="grid gap-2 md:gap-3 sm:grid-cols-2 mb-2 md:mb-3">
                          <div className="bg-background/50 p-2 md:p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-xs md:text-sm lg:text-base">Electric Shock</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Direct contact with live parts can cause cardiac arrest and death</p>
                          </div>
                          <div className="bg-background/50 p-2 md:p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-xs md:text-sm lg:text-base">Fire Hazards</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Overheating and arcing can ignite surrounding materials</p>
                          </div>
                          <div className="bg-background/50 p-2 md:p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-xs md:text-sm lg:text-base">Arc Flash</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Explosive energy release reaching 19,000°C temperatures</p>
                          </div>
                          <div className="bg-background/50 p-2 md:p-3 rounded border">
                            <p className="font-medium text-foreground mb-1 text-xs md:text-sm lg:text-base">Secondary Injuries</p>
                            <p className="text-xs md:text-xs sm:text-sm text-foreground">Falls, burns, and trauma from shock incidents</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>HSE Statistics:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-foreground">
                            <li>Over 1,000 electrical workplace accidents annually in the UK</li>
                            <li>Approximately 30% of UK structural fires are electrical in origin</li>
                            <li>Voltages as low as 50V can be lethal under certain conditions</li>
                            <li>Electric shock is the leading cause of electrical workplace fatalities</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Critical Understanding</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Electrical faults create unpredictable hazards that can escalate rapidly. Even apparently minor faults can become life-threatening under certain conditions, making immediate action essential.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="safety-risks-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Legal and Financial Consequences */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Legal and Financial Consequences</h3>
            <p className="text-base text-foreground mb-4">
              Electrical faults that cause injury or damage can result in severe legal and financial penalties:
            </p>
            
            <div className="space-y-3 md:space-y-4">
              <div className="rounded-lg p-3 md:p-4 lg:p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3">Legal and Financial Impact</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Legal Consequences:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-3">
                          <div className="grid gap-3 lg:grid-cols-2">
                            <div>
                              <p className="font-medium text-foreground mb-2 text-sm md:text-base">Criminal Prosecution</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-foreground">
                                <li>Electricity at Work Regulations 1989 breaches</li>
                                <li>Health and Safety at Work Act violations</li>
                                <li>Corporate manslaughter in severe cases</li>
                                <li>Unlimited fines and imprisonment possible</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2 text-sm md:text-base">Civil Liability</p>
                              <ul className="list-disc ml-4 space-y-1 text-xs md:text-xs sm:text-sm text-foreground">
                                <li>Compensation claims for injury and damage</li>
                                <li>Property damage costs</li>
                                <li>Loss of earnings claims</li>
                                <li>Legal costs and expert witness fees</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Financial Impact:</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-3">
                          <ul className="list-disc ml-4 space-y-1 text-xs sm:text-sm text-foreground">
                            <li><strong>Fines:</strong> Unlimited in Crown Court for serious EAWR breaches</li>
                            <li><strong>Compensation:</strong> Can reach millions for serious injury cases</li>
                            <li><strong>Insurance:</strong> Policies may be invalidated if proper maintenance not carried out</li>
                            <li><strong>Property damage:</strong> Fire damage can cost millions to rectify</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                        <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Important Note</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Personal liability applies to individuals as well as companies. Electricians can face personal prosecution, fines, and imprisonment for safety breaches under EAWR 1989.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="legal-consequences-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Business Impact */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Impact on Business Operations and Reputation</h3>
            <p className="text-base text-foreground mb-4">
              Electrical faults can severely disrupt business operations and cause lasting damage to reputation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Business and Operational Impact</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Production Losses</p>
                          <p className="text-xs sm:text-sm text-foreground">Equipment downtime, missed deadlines, and lost production capacity</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Data Loss</p>
                          <p className="text-xs sm:text-sm text-foreground">Power surges and outages causing data corruption and system failures</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Reputation Damage</p>
                          <p className="text-xs sm:text-sm text-foreground">Public incidents damaging company reputation and customer confidence</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded border">
                          <p className="font-medium text-foreground mb-2">Regulatory Scrutiny</p>
                          <p className="text-xs sm:text-sm text-foreground">Increased inspection and monitoring by HSE and other authorities</p>
                        </div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Long-term Consequences</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Business impact extends beyond immediate costs. Loss of customer confidence, difficulty obtaining insurance, and regulatory restrictions can affect operations for years after an electrical incident.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="business-impact-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Risk Assessment and Management:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Treat all electrical faults as potential safety hazards until proven otherwise.</li>
                <li>Isolate faulty circuits immediately and secure against unauthorised energisation.</li>
                <li>Assess the potential for escalation and take appropriate precautions.</li>
                <li>Communicate risks clearly to all affected parties.</li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Legal Compliance:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Document all faults and corrective actions taken with timestamps and details.</li>
                <li>Report serious faults to supervisors and duty holders immediately.</li>
                <li>Ensure compliance with EAWR 1989 and BS 7671 requirements.</li>
                <li>Maintain evidence of due diligence through proper record keeping.</li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm md:text-base text-foreground font-medium mb-2">Business Protection:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground">
                <li>Prioritise safety over production deadlines or convenience.</li>
                <li>Implement proper fault management procedures and training.</li>
                <li>Maintain appropriate insurance coverage with proper electrical maintenance records.</li>
                <li>Establish clear communication channels for reporting electrical hazards.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <h3 className="font-medium text-foreground mb-3">Case Study: Manufacturing Plant Fire</h3>
              <p className="text-base text-foreground mb-4">
                A manufacturing plant ignored a recurring earth fault indication on their main distribution board for several weeks, assuming it was a "nuisance trip." The fault eventually escalated when moisture ingress combined with the existing earth fault to create a sustained arc. The resulting fire destroyed a significant portion of the facility, injured two employees, and led to a six-month production shutdown.
              </p>
              <p className="text-base text-foreground mb-4">
                <strong>Consequences:</strong> The company faced £2.4 million in direct fire damage, £1.8 million in lost production, £500,000 in legal costs, and unlimited fines for EAWR 1989 breaches. Two employees required hospital treatment for smoke inhalation, and the company's insurance claim was partially rejected due to inadequate electrical maintenance records.
              </p>
              <p className="text-base text-foreground mb-2">
                <strong>The Reality:</strong> What started as a minor earth fault that could have been corrected for a few hundred pounds ultimately cost the business over £5 million and resulted in criminal prosecution of the facilities manager.
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
            <li>Electrical faults pose serious safety risks including shock, fire, and arc flash hazards that can cause injury or death.</li>
            <li>Legal consequences include prosecution under EAWR 1989 with unlimited fines, imprisonment, and civil liability for damages.</li>
            <li>Business impacts include production losses, data loss, reputation damage, and long-term regulatory scrutiny.</li>
            <li>Immediate action is required when faults are discovered to prevent escalation and protect people, property, and business operations.</li>
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 md:mb-8 p-4 md:p-6 bg-card border-border/20">
          <h2 className="text-lg md:text-lg sm:text-xl font-semibold text-foreground mb-4">Quiz</h2>
          <Quiz questions={quizQuestions} title="Risks and Consequences of Electrical Faults" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Types of Faults
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../1-4">
              <span className="hidden sm:inline">Fault Categories</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section1_3;