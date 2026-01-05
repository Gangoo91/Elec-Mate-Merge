import { ArrowLeft, ArrowRight, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module7Section5_3 = () => {
  useSEO(
    "GS38-Compliant Testing Practices - Level 2 Module 7 Section 5.3",
    "Master GS38 safety standards for electrical test equipment, including fused leads, shrouded probes, and compliance requirements for safe electrical testing practices."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What does GS38 cover?",
      options: [
        "Installation methods for electrical circuits",
        "Safety requirements for electrical test equipment",
        "Certification procedures for electricians", 
        "Maintenance schedules for electrical systems"
      ],
      correctAnswer: 1,
      explanation: "GS38 is a Health and Safety Executive guidance note that sets minimum safety requirements for electrical test equipment in the UK."
    },
    {
      id: 2,
      question: "Why must test leads be fused?",
      options: [
        "To improve measurement accuracy",
        "To protect the user from high fault currents if a short circuit occurs",
        "To extend the life of the test equipment",
        "To comply with insurance requirements"
      ],
      correctAnswer: 1,
      explanation: "Fused leads with high-breaking capacity (HBC) fuses protect the user from dangerous fault currents during short circuit conditions."
    },
    {
      id: 3,
      question: "How much exposed metal is permitted at a probe tip under GS38?",
      options: [
        "No more than 1 mm",
        "No more than 2 mm", 
        "No more than 4 mm",
        "No more than 6 mm"
      ],
      correctAnswer: 1,
      explanation: "GS38 requires that only 2 mm of exposed metal should be visible at the probe tip to reduce risk of accidental contact with live parts."
    },
    {
      id: 4,
      question: "What is the purpose of finger guards on probes?",
      options: [
        "To improve grip on the probe",
        "To prevent fingers from slipping forward onto live conductors",
        "To protect the probe from damage",
        "To identify different probe types"
      ],
      correctAnswer: 1,
      explanation: "Finger guards prevent the user's fingers from accidentally sliding forward and making contact with live conductors during testing."
    },
    {
      id: 5,
      question: "Why is double insulation required on leads?",
      options: [
        "To reduce electrical noise in measurements",
        "To provide protection against cuts, abrasion, and heat",
        "To improve flexibility of the leads",
        "To meet colour coding requirements"
      ],
      correctAnswer: 1,
      explanation: "Double insulation provides robust protection against physical damage and ensures safety even if the outer insulation is compromised."
    },
    {
      id: 6,
      question: "What do CAT II, CAT III, and CAT IV ratings indicate?",
      options: [
        "The accuracy class of the instrument",
        "The type of electrical system the equipment is rated for",
        "The manufacturer's quality grade",
        "The calibration frequency required"
      ],
      correctAnswer: 1,
      explanation: "Category ratings (CAT II, III, IV) indicate the type and severity of electrical environment the test equipment is designed to safely operate in."
    },
    {
      id: 7,
      question: "True or False: Homemade or modified test leads are acceptable if they work.",
      options: [
        "True - if they function correctly",
        "False - homemade or modified test equipment must never be used",
        "True - if approved by a supervisor",
        "False - only for apprentices, qualified electricians can use them"
      ],
      correctAnswer: 1,
      explanation: "GS38 explicitly prohibits the use of homemade or modified test equipment as they cannot guarantee compliance with safety standards."
    },
    {
      id: 8,
      question: "What regulation underpins the need for GS38 compliance?",
      options: [
        "BS 7671 Wiring Regulations",
        "Building Regulations Part P",
        "Electricity at Work Regulations 1989",
        "Health and Safety at Work Act 1974"
      ],
      correctAnswer: 2,
      explanation: "The Electricity at Work Regulations 1989 provide the legal framework that makes GS38 compliance a legal expectation for safe working."
    },
    {
      id: 9,
      question: "In the real-world example, what fault occurred due to non-compliant probes?",
      options: [
        "Electric shock to the electrician",
        "Incorrect readings leading to misdiagnosis",
        "Short circuit causing flashover and burns",
        "Damage to the test instrument"
      ],
      correctAnswer: 2,
      explanation: "The long, exposed metal tips on non-compliant probes slipped and created a short circuit, causing a flashover that resulted in burns and equipment damage."
    },
    {
      id: 10,
      question: "How did the apprentice in the second example apply GS38 correctly?",
      options: [
        "Used the damaged probes carefully",
        "Repaired the insulation damage himself",
        "Reported the damaged probes and got compliant replacements",
        "Borrowed probes from another electrician"
      ],
      correctAnswer: 2,
      explanation: "The apprentice correctly identified the insulation damage, reported it to his supervisor, and was provided with GS38-compliant replacement equipment."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg bg-card">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs sm:text-sm">
              Section 7.5.3
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            GS38-Compliant Testing Practices
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Master GS38 safety standards for electrical test equipment, including fused leads, shrouded probes, and compliance requirements for safe electrical testing practices.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Check test leads have fuses fitted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Verify probe tips show maximum 2mm exposed metal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Confirm finger guards are present on probes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Check leads are double-insulated and undamaged</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Damaged insulation, excessive exposed tips, missing fuses, homemade equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Only GS38-compliant test equipment with proper ratings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> Visual inspection before each use, report non-compliant equipment</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-foreground mb-4">
            When using test equipment, safety depends not only on the electrician but also on the design and condition of the instruments themselves. The Health and Safety Executive's GS38 guidance note sets out the minimum safety requirements for electrical test equipment in the UK. Compliance with GS38 protects electricians from shock, burns, and arc flash injuries during testing. Apprentices must become familiar with these requirements and treat them as standard practice in every situation, not just during formal inspections.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-foreground mb-3 sm:mb-4">By the end of this subsection, you should be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain what GS38 requires for electrical test equipment</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Describe the design features of GS38-compliant equipment</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Apply these principles in everyday testing to maintain personal safety</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Content / Learning</h2>
          
          {/* Section 1: GS38 Safety Requirements */}
          <div className="border-l-4 border-emerald-500 pl-4 sm:pl-6 space-y-3 sm:space-y-4 mb-6">
            <h3 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400">1. GS38 Safety Requirements</h3>
            <p className="text-sm sm:text-base text-foreground">
              GS38 focuses on the safe design of test leads, probes, and instruments used for electrical testing. The key requirements are designed to protect electricians from electrical shock, arc flash, and related injuries during routine testing work.
            </p>
            <div className="bg-card border border-emerald-500/20 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
              <h4 className="font-semibold text-emerald-400 text-sm sm:text-base">Essential GS38 Features:</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
                <li><strong>Fused leads:</strong> Test leads must contain high-breaking capacity (HBC) fuses to protect the user if a short circuit occurs during testing</li>
                <li><strong>Shrouded probes:</strong> Only 2 mm of exposed metal should be visible at the probe tip to reduce accidental contact risk</li>
                <li><strong>Finger guards:</strong> Probes must have guards to prevent fingers from slipping forward onto live conductors</li>
                <li><strong>Double insulation:</strong> Leads should be flexible, robust, and resistant to cuts, abrasion, and heat</li>
                <li><strong>Category ratings:</strong> Equipment must be rated (CAT II, III, or IV) for the electrical system being tested</li>
              </ul>
            </div>
            <InlineCheck
              id="gs38-requirements"
              question="Which of these is NOT a GS38 requirement for test equipment?"
              options={[
                "Fused leads with HBC fuses",
                "Shrouded probes with 2mm maximum exposure", 
                "Digital display with backlight",
                "Finger guards on probes"
              ]}
              correctIndex={2}
              explanation="Digital displays with backlights are convenience features, not GS38 safety requirements. GS38 focuses on physical safety features like fused leads, shrouded probes, and finger guards."
            />
          </div>

          {/* Section 2: Prohibited Equipment */}
          <div className="border-l-4 border-green-500 pl-4 sm:pl-6 space-y-3 sm:space-y-4 mb-6">
            <h3 className="text-lg sm:text-lg sm:text-xl font-semibold text-green-400">2. Prohibited Equipment and Practices</h3>
            <p className="text-sm sm:text-base text-foreground">
              GS38 explicitly prohibits the use of certain types of equipment and modifications that compromise safety standards. Understanding what cannot be used is as important as knowing what should be used.
            </p>
            <div className="bg-card border border-green-500/20 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
              <h4 className="font-semibold text-green-400 text-sm sm:text-base">Never Use:</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
                <li><strong>Homemade test equipment:</strong> Cannot guarantee compliance with safety standards</li>
                <li><strong>Modified equipment:</strong> Alterations may compromise safety features</li>
                <li><strong>Damaged leads:</strong> Cracked insulation or exposed conductors are dangerous</li>
                <li><strong>Incorrect fuses:</strong> Wrong ratings won't provide adequate protection</li>
                <li><strong>Excessive probe tips:</strong> More than 2mm exposure increases contact risk</li>
              </ul>
            </div>
            <InlineCheck
              id="prohibited-equipment"
              question="Why does GS38 prohibit homemade or modified test equipment?"
              options={[
                "They are too expensive to maintain",
                "They cannot guarantee compliance with safety standards",
                "They are not accurate enough for testing",
                "They void manufacturer warranties"
              ]}
              correctIndex={1}
              explanation="Homemade or modified equipment cannot guarantee compliance with safety standards, making them potentially dangerous to use in electrical testing situations."
            />
          </div>

          {/* Section 3: Legal Compliance */}
          <div className="border-l-4 border-amber-500 pl-4 sm:pl-6 space-y-3 sm:space-y-4 mb-6">
            <h3 className="text-lg sm:text-lg sm:text-xl font-semibold text-amber-400">3. Legal Framework and Compliance</h3>
            <p className="text-sm sm:text-base text-foreground">
              GS38 compliance is not optional—it is underpinned by legal requirements that make adherence to these standards a duty for all electrical workers. Understanding the legal context helps emphasise why these standards matter.
            </p>
            <div className="bg-card border border-amber-500/20 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
              <h4 className="font-semibold text-amber-400 text-sm sm:text-base">Legal Requirements:</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
                <li><strong>Electricity at Work Regulations 1989:</strong> Provides the legal framework requiring safe electrical work practices</li>
                <li><strong>Daily inspection duty:</strong> Electricians must visually inspect test equipment before each use</li>
                <li><strong>Employer responsibilities:</strong> Must provide GS38-compliant equipment and training</li>
                <li><strong>Individual accountability:</strong> Each electrician is personally responsible for refusing non-compliant equipment</li>
                <li><strong>Reporting requirements:</strong> Non-compliant equipment must be reported and removed from service</li>
              </ul>
            </div>
            <InlineCheck
              id="legal-compliance"
              question="What regulation makes GS38 compliance a legal requirement?"
              options={[
                "BS 7671 Wiring Regulations",
                "Building Regulations Part P",
                "Electricity at Work Regulations 1989",
                "Health and Safety at Work Act 1974"
              ]}
              correctIndex={2}
              explanation="The Electricity at Work Regulations 1989 provide the legal framework that makes GS38 compliance a legal expectation for safe electrical work."
            />
          </div>

          {/* Section 4: Professional Practice */}
          <div className="border-l-4 border-purple-500 pl-4 sm:pl-6 space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-lg sm:text-xl font-semibold text-emerald-400">4. Professional Practice and Implementation</h3>
            <p className="text-sm sm:text-base text-foreground">
              Developing professional habits around GS38 compliance ensures that safety becomes automatic rather than an afterthought. This section covers how to integrate these standards into daily electrical work.
            </p>
            <div className="bg-card border border-purple-500/20 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
              <h4 className="font-semibold text-emerald-400 text-sm sm:text-base">Daily Practice Routine:</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-xs sm:text-sm text-foreground">
                <li><strong>Pre-use inspection:</strong> Check every piece of test equipment before starting work</li>
                <li><strong>Equipment selection:</strong> Choose appropriate category-rated instruments for the system being tested</li>
                <li><strong>Damage reporting:</strong> Immediately report and remove any non-compliant equipment from service</li>
                <li><strong>Refusal protocols:</strong> Know how to professionally refuse unsafe equipment and escalate concerns</li>
                <li><strong>Continuous learning:</strong> Stay updated on GS38 requirements and best practices</li>
              </ul>
            </div>
            <InlineCheck
              id="professional-practice"
              question="What should an apprentice do if asked to use non-compliant test equipment?"
              options={[
                "Use it carefully with extra precautions",
                "Refuse to use it and escalate the issue",
                "Use it only for low-voltage testing",
                "Modify it to make it safer"
              ]}
              correctIndex={1}
              explanation="The correct professional response is to refuse to use non-compliant equipment and escalate the issue to ensure proper GS38-compliant equipment is provided."
            />
          </div>
        </Card>

        {/* Real-World Applications */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-green-500/5 to-emerald-500/10 border-green-500/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Applications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
              <h3 className="font-semibold text-foreground mb-2">Case Study 1: Non-Compliant Probes</h3>
              <p className="text-sm text-muted-foreground mb-2">
                An electrician using old test probes with 8mm exposed tips was testing a distribution board. The long metal tips slipped and created a short circuit between phases, causing a flashover that resulted in burns and equipment damage.
              </p>
              <p className="text-xs text-amber-400 font-medium">
                GS38-compliant probes with 2mm tips and finger guards would have prevented this accident.
              </p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
              <h3 className="font-semibold text-foreground mb-2">Case Study 2: Proper Equipment Management</h3>
              <p className="text-sm text-muted-foreground mb-2">
                An apprentice noticed damaged insulation on test leads and immediately reported it to his supervisor. He was provided with GS38-compliant replacement equipment and commended for following safety protocols.
              </p>
              <p className="text-xs text-green-400 font-medium">
                Professional approach to equipment safety protects everyone on site.
              </p>
            </div>
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-purple-500/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Key Takeaways</h2>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span>GS38 sets mandatory safety standards for electrical test equipment in the UK</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span>Key features include fused leads, shrouded probes, finger guards, and proper category ratings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span>Non-compliant equipment must never be used, regardless of convenience or pressure</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span>Legal compliance is backed by the Electricity at Work Regulations 1989</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <span>Daily inspection and professional equipment management are essential practices</span>
            </li>
          </ul>
        </Card>

        {/* Test Your Knowledge */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground mb-4">Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} title="GS38-Compliant Testing Practices Quiz" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="outline" className="flex-1" asChild>
            <Link to="../5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Instrument Checks
            </Link>
          </Button>
          
          <Button className="flex-1" asChild>
            <Link to="../5-4">
              Next: PPE & Environment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section5_3;