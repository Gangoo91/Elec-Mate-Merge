import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const Module6Section1_1 = () => {
  useSEO(
    "Why Electrical Installations Must Be Inspected and Tested | Level 2 Electrical",
    "Why inspection and testing are essential for safety and compliance with BS 7671 and EAWR 1989"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What regulation requires electrical systems to be safe to use?",
      options: ["BS 7671", "Electricity at Work Regulations (EAWR 1989)", "Building Regulations", "IET Code of Practice"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations (EAWR 1989) requires all electrical systems to be safe to use."
    },
    {
      id: 2,
      question: "What is the main purpose of inspection?",
      options: [
        "To check cable sizes",
        "To verify safety, compliance and workmanship through visual checks", 
        "To test circuit operation",
        "To measure voltage"
      ],
      correctAnswer: 1,
      explanation: "Inspection involves visual checks to verify safety, compliance with BS 7671, and workmanship quality."
    },
    {
      id: 3,
      question: "What does testing confirm about polarity?",
      options: [
        "That cables are the correct size",
        "That live, neutral, and earth conductors are correctly connected",
        "That voltage is correct",
        "That insulation is adequate"
      ],
      correctAnswer: 1,
      explanation: "Polarity testing confirms that live, neutral, and earth conductors are correctly connected and not reversed."
    },
    {
      id: 4,
      question: "True or False: Testing can be skipped if the installation looks neat and tidy.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False – Testing is essential regardless of appearance, as hidden faults may not be visible."
    },
    {
      id: 5,
      question: "Give one hidden fault that testing can reveal.",
      options: [
        "Damaged cable sheath",
        "Insulation breakdown or poor earth connections",
        "Missing cable clips",
        "Untidy wiring"
      ],
      correctAnswer: 1,
      explanation: "Testing can reveal hidden faults such as insulation breakdown or poor earth connections that aren't visible."
    },
    {
      id: 6,
      question: "Which standard defines inspection and testing as part of compliance?",
      options: ["EAWR 1989", "BS 7671 Wiring Regulations", "Building Regulations", "HSE Guidance"],
      correctAnswer: 1,
      explanation: "BS 7671 Wiring Regulations establishes inspection and testing as a key part of compliance."
    },
    {
      id: 7,
      question: "Why should all tests be recorded on paperwork?",
      options: [
        "For filing purposes",
        "To provide evidence of compliance and safety",
        "Because it's tradition",
        "To calculate costs"
      ],
      correctAnswer: 1,
      explanation: "Recording test results provides documented evidence of compliance and safety for clients and regulators."
    },
    {
      id: 8,
      question: "What is the consequence of not inspecting and testing?",
      options: [
        "Nothing happens",
        "Increased risk of shock, fire, injury, or legal action",
        "Faster completion",
        "Lower costs"
      ],
      correctAnswer: 1,
      explanation: "Not inspecting and testing increases the risk of electric shock, fire, injury, and potential legal action."
    },
    {
      id: 9,
      question: "Who is responsible for ensuring installations are safe before energising?",
      options: [
        "The client",
        "The installer or responsible person signing the certificate",
        "The supply company",
        "The building owner"
      ],
      correctAnswer: 1,
      explanation: "The installer or responsible person signing the certificate must ensure installations are safe before energising."
    },
    {
      id: 10,
      question: "Why is inspection and testing important for professional reputation?",
      options: [
        "It's not important",
        "It demonstrates competence, compliance and builds client trust",
        "It increases costs",
        "It delays completion"
      ],
      correctAnswer: 1,
      explanation: "Proper inspection and testing demonstrates competence, ensures compliance, and builds client trust and professional reputation."
    }
  ];

  // Inline knowledge check
  const quickCheck = {
    id: "polarity-check",
    question: "Which test confirms that conductors are correctly connected (L, N, E)?",
    options: ["Continuity", "Insulation resistance", "Polarity", "Earth fault loop impedance"],
    correctIndex: 2,
    explanation: "Polarity testing specifically confirms that live, neutral, and earth conductors are correctly connected and not reversed."
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
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
              <ShieldCheck className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 6.1.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Why Electrical Installations Must Be Inspected and Tested
          </h1>
          <p className="text-muted-foreground">
            Why inspection and testing are essential for safety and compliance with BS 7671 and EAWR 1989
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ensures safety and compliance (BS 7671, EAWR 1989) before energising.</li>
                <li>Finds hidden issues (polarity, continuity, insulation, earth) that prevent shock/fire.</li>
                <li>Creates documented assurance for clients, employers and regulators.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> BS 7671 refs, test instrument labels, certificate forms (EIC/EICR).</li>
                <li><strong>Use:</strong> Plan inspections and tests before energising; verify polarity, continuity, insulation, Zs, and functional checks; record results.</li>
                <li><strong>Check:</strong> Legal duties, instrument calibration, signature authority.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <p className="text-base text-muted-foreground mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-3 text-base text-foreground">
            <li>Explain the main reasons why inspection and testing are necessary for electrical installations.</li>
            <li>Identify the specific risks that inspections and testing help prevent in both domestic and commercial environments.</li>
            <li>Understand the legal requirements for inspection and testing under BS 7671 and EAWR 1989.</li>
            <li>Recognise how proper inspection and testing protect users, property, and the electrical industry's reputation.</li>
            <li>Distinguish between the purposes of inspection (visual checks) and testing (instrument verification).</li>
            <li>Appreciate the documentation requirements and their importance in demonstrating compliance.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. The Purpose of Inspection */}
          <section className="mb-8">
            <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" /> 1. The Purpose of Inspection
            </h3>
            <p className="text-base text-muted-foreground mb-4">
              Visual inspection is the first line of defence in electrical safety. It involves systematically examining the installation using only your eyes and basic tools, without the need for electrical instruments. This process is crucial for identifying obvious defects and ensuring the installation meets basic safety requirements.
            </p>
            <div className="rounded-lg p-5 bg-card border border-border/30 text-base mb-4">
              <p className="font-medium mb-3">Key aspects of inspection include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Compliance verification:</strong> Confirms the installation meets BS 7671 Wiring Regulations requirements for cable routing, protection, and accessibility.</li>
                <li><strong>Safety assessment:</strong> Ensures electrical work is safe, neat, and correctly installed with proper cable support and protection.</li>
                <li><strong>Environmental suitability:</strong> Confirms equipment is appropriate for its location (IP ratings for damp areas, fire-resistant cables in escape routes).</li>
                <li><strong>Workmanship quality:</strong> Detects poor installation practices, incorrect materials, damaged components, or unsafe working methods.</li>
                <li><strong>Documentation check:</strong> Verifies that circuit charts, labels, and warning notices are correctly fitted and legible.</li>
              </ul>
            </div>
            <p className="text-base text-muted-foreground">
              <strong>Critical point:</strong> Inspection must be carried out before any testing begins, and the installation must be de-energised during the inspection process for safety.
            </p>
          </section>

          <InlineCheck
            id="inspection-purpose-check"
            question="What is the main purpose of visual inspection?"
            options={["To test electrical circuits", "To verify safety, compliance and workmanship through visual checks", "To measure voltage", "To calibrate instruments"]}
            correctIndex={1}
            explanation="Visual inspection verifies safety, compliance with BS 7671, and workmanship quality through systematic visual examination."
          />
          <Separator className="my-6" />

          {/* 2. The Purpose of Testing */}
          <section className="mb-8">
            <h3 className="text-lg font-medium text-foreground mb-4">2. The Purpose of Testing</h3>
            <p className="text-base text-muted-foreground mb-4">
              Electrical testing goes beyond what the eye can see. Using calibrated instruments, testing verifies that circuits perform correctly and safely under electrical conditions. This process reveals hidden faults that could cause serious harm if left undetected.
            </p>
            <div className="rounded-lg p-5 bg-card border border-border/30 text-base mb-4">
              <p className="font-medium mb-3">Essential testing functions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Electrical continuity:</strong> Confirms protective conductors (earth) provide an unbroken path for fault current.</li>
                <li><strong>Polarity verification:</strong> Ensures live, neutral, and earth conductors are correctly connected throughout the installation.</li>
                <li><strong>Insulation resistance:</strong> Tests that cables and equipment maintain adequate insulation to prevent dangerous leakage currents.</li>
                <li><strong>Earth fault loop impedance:</strong> Verifies that protective devices will operate quickly enough to prevent dangerous touch voltages.</li>
                <li><strong>RCD operation:</strong> Confirms residual current devices trip within safe time limits to protect against earth leakage.</li>
                <li><strong>Functional testing:</strong> Checks that all controls, switches, and safety devices operate as intended.</li>
              </ul>
            </div>
            <p className="text-base text-muted-foreground">
              <strong>Remember:</strong> Testing provides measurable, documented proof that safety requirements are met, creating legal evidence of due diligence.
            </p>
          </section>

          <InlineCheck
            id="testing-purpose-check"
            question="Which test confirms that conductors are correctly connected (L, N, E)?"
            options={["Continuity", "Insulation resistance", "Polarity", "Earth fault loop impedance"]}
            correctIndex={2}
            explanation="Polarity testing specifically confirms that live, neutral, and earth conductors are correctly connected and not reversed."
          />
          <Separator className="my-6" />

          {/* 3. Legal and Safety Obligations */}
          <section className="mb-8">
            <h3 className="text-lg font-medium text-foreground mb-4">3. Legal and Safety Obligations</h3>
            <p className="text-base text-muted-foreground mb-4">
              Electrical safety isn't just good practice – it's a legal requirement. Multiple regulations and standards create a framework of obligations that every electrical worker must understand and follow.
            </p>
            <div className="rounded-lg p-5 bg-card border border-border/30 text-base mb-4">
              <p className="font-medium mb-3">Key legal requirements:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Electricity at Work Regulations (EAWR 1989):</strong> Requires all electrical systems to be constructed, maintained, and used safely. Places absolute duty on employers and employees to prevent danger.</li>
                <li><strong>BS 7671 Wiring Regulations:</strong> Establishes inspection and testing as mandatory requirements for compliance. Provides detailed procedures and acceptance criteria.</li>
                <li><strong>Health and Safety at Work Act 1974:</strong> Creates general duty to ensure workplace safety, including electrical installations.</li>
                <li><strong>Building Regulations Part P:</strong> Requires certification of electrical work in dwellings, including proper testing procedures.</li>
                <li><strong>Management of Health and Safety at Work Regulations:</strong> Requires risk assessments that must consider electrical hazards.</li>
              </ul>
            </div>
            <p className="text-base text-muted-foreground mb-4">
              <strong>Personal responsibility:</strong> As an electrical worker, you have both legal and moral obligations to ensure installations are safe. Cutting corners on inspection and testing isn't just unprofessional – it could result in criminal prosecution if someone is injured.
            </p>
            <p className="text-base text-muted-foreground">
              <strong>Employer duties:</strong> Employers must ensure workers are competent, have proper equipment, and follow safe systems of work including mandatory inspection and testing procedures.
            </p>
          </section>

          <InlineCheck
            id="legal-obligations-check"
            question="Which regulation places an absolute duty to prevent electrical danger?"
            options={["BS 7671", "Electricity at Work Regulations (EAWR 1989)", "Building Regulations Part P", "Health and Safety at Work Act"]}
            correctIndex={1}
            explanation="The Electricity at Work Regulations (EAWR 1989) places an absolute duty on employers and employees to prevent electrical danger."
          />
          <Separator className="my-6" />

          {/* 4. Benefits of Inspection and Testing */}
          <section className="mb-6">
            <h3 className="text-lg font-medium text-foreground mb-4">4. Benefits of Inspection and Testing</h3>
            <p className="text-base text-muted-foreground mb-4">
              Beyond legal compliance, proper inspection and testing delivers tangible benefits to installers, clients, and the wider electrical industry.
            </p>
            <div className="rounded-lg p-5 bg-card border border-emerald-500/30 text-base mb-4">
              <p className="font-medium mb-3">Professional and business benefits:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Life and property protection:</strong> Prevents electrical fires, shocks, and deaths that devastate families and communities.</li>
                <li><strong>Installation reliability:</strong> Ensures systems operate efficiently and have maximum service life, reducing maintenance costs.</li>
                <li><strong>Quality assurance:</strong> Eliminates costly rework, call-backs, and warranty claims that damage profitability.</li>
                <li><strong>Professional reputation:</strong> Builds client confidence and generates referrals through demonstrated competence and reliability.</li>
                <li><strong>Insurance protection:</strong> Proper certification may be required for insurance claims and can reduce premiums.</li>
                <li><strong>Legal defence:</strong> Documented compliance provides protection against claims and prosecution.</li>
                <li><strong>Industry standards:</strong> Maintains the reputation of the electrical trade and supports professional recognition.</li>
              </ul>
            </div>
            <p className="text-base text-muted-foreground">
              <strong>Financial reality:</strong> The cost of proper inspection and testing is tiny compared to the potential costs of electrical accidents, legal action, or loss of professional reputation.
            </p>
          </section>

          <InlineCheck
            id="benefits-check"
            question="What is one key professional benefit of proper inspection and testing?"
            options={["Faster installation", "Lower material costs", "Building client confidence and professional reputation", "Simpler paperwork"]}
            correctIndex={2}
            explanation="Proper inspection and testing builds client confidence, demonstrates competence, and enhances professional reputation through documented quality assurance."
          />
          <Separator className="my-6" />
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card mb-4">
            <h4 className="font-medium text-foreground mb-2">Case Study: Office Building Lighting Circuit</h4>
            <p className="text-base text-foreground mb-4">
              An office building had a new lighting circuit installed by a contractor who was running behind schedule. To save time, the contractor skipped the formal testing process and simply checked that the lights switched on correctly. The installation was energised and handed over to the client.
            </p>
            <p className="text-base text-foreground mb-4">
              Three weeks later, an employee received an electric shock from a light fitting while changing a bulb. The incident was reported to the HSE, who launched a full investigation. Testing revealed that polarity had been reversed on several lighting points, with live and neutral conductors swapped over.
            </p>
            <p className="text-base text-foreground mb-4">
              <strong>The consequences were severe:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 text-base text-foreground mb-4">
              <li>The employee suffered burns and lost time from work</li>
              <li>The contractor faced HSE prosecution and heavy fines</li>
              <li>Professional indemnity insurance was invalidated due to non-compliance</li>
              <li>The contractor lost their preferred contractor status with multiple clients</li>
              <li>Reputation damage led to significant loss of future business</li>
            </ul>
            <p className="text-base text-foreground">
              <strong>Prevention:</strong> If proper polarity testing had been completed using a simple voltage indicator or multimeter, the reversed connections would have been identified immediately. The 30 minutes required for testing would have prevented months of legal proceedings and business damage.
            </p>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          <p className="text-base text-muted-foreground mb-4">
            Effective inspection and testing requires proper planning, correct procedures, and the right mindset. Here's how to approach it professionally:
          </p>
          <div className="rounded-lg p-5 bg-emerald-500/10 border border-emerald-500/30 text-base mb-4">
            <p className="font-medium mb-3">Essential practices:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Plan ahead:</strong> Always schedule inspections and tests before energising any system. Never leave testing until after handover pressure builds.</li>
              <li><strong>Use proper instruments:</strong> Invest in quality, calibrated test equipment (insulation resistance tester, continuity tester, earth loop impedance tester, RCD tester).</li>
              <li><strong>Follow the sequence:</strong> Complete visual inspection first, then dead tests, then live tests in the correct BS 7671 order.</li>
              <li><strong>Document everything:</strong> Record all results on appropriate certificates (EIC for new work, EICR for existing installations).</li>
              <li><strong>Take responsibility:</strong> Never sign certificates unless you've personally carried out the inspection or directly supervised the work.</li>
              <li><strong>Check calibration:</strong> Ensure all test instruments have valid calibration certificates and check battery levels before starting.</li>
              <li><strong>Safety first:</strong> Treat every test as a potential safety hazard – assume circuits are live until proven otherwise.</li>
            </ul>
          </div>
          <div className="bg-card border border-border/30 rounded-lg p-4 text-base">
            <p className="font-medium mb-2">Professional mindset:</p>
            <p>View inspection and testing as skilled professional work, not just a bureaucratic requirement. Each test is a safety check that could prevent serious harm. Take pride in thorough, methodical work that protects people and property.</p>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Pocket Guide</h2>
          <div className="rounded-lg p-5 bg-elec-blue/10 border border-elec-blue/30 text-base">
            <p className="font-medium mb-3 text-lg">Quick Reference:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Inspection</strong> = Visual checks of safety, compliance, and workmanship quality.</li>
              <li><strong>Testing</strong> = Instrument verification of electrical safety and functionality.</li>
              <li><strong>Legal requirement</strong> = Both mandated by BS 7671 and EAWR 1989.</li>
              <li><strong>Timing</strong> = Always complete before energising and handover.</li>
              <li><strong>Documentation</strong> = Record results on EIC/EICR certificates.</li>
              <li><strong>Responsibility</strong> = Only sign what you've done or directly supervised.</li>
              <li><strong>Purpose</strong> = Protects life, property, and professional integrity.</li>
            </ul>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Recap</h2>
          <p className="text-base text-foreground mb-4">
            Inspection and testing are not optional – they are legal and professional requirements that form the foundation of electrical safety. They ensure installations are safe, compliant, and reliable before being put into service.
          </p>
          <p className="text-base text-foreground mb-4">
            Visual inspection catches obvious defects and confirms compliance with wiring regulations, while electrical testing reveals hidden faults that could cause serious harm. Together, they create a comprehensive safety verification process.
          </p>
          <p className="text-base text-foreground">
            Without proper inspection and testing, hidden faults remain undetected, putting people and property at serious risk. Every electrical worker has both legal and professional obligations to ensure these vital safety checks are completed thoroughly and documented properly.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Quiz: Why Electrical Installations Must Be Inspected and Tested" />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/20">
          <Button variant="ghost" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section1_1;