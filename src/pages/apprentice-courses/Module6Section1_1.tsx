import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const Module6Section1_1 = () => {
  useSEO(
    "Why Electrical Installations Must Be Inspected and Tested | Level 2 Electrical",
    "Why inspection and testing are essential for safety and compliance with BS 7671 and EAWR 1989"
  );

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

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.1.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Why Electrical Installations Must Be Inspected and Tested
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Why inspection and testing are essential for safety and compliance with BS 7671 and EAWR 1989
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-sm space-y-1 list-disc pl-5">
              <li>Ensures safety and compliance (BS 7671, EAWR 1989) before energising.</li>
              <li>Finds hidden issues (polarity, continuity, insulation, earth) that prevent shock/fire.</li>
              <li>Creates documented assurance for clients, employers and regulators.</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-2 leading-relaxed">
              <p>By the end of this subsection, you will be able to:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Explain the main reasons why inspection and testing are necessary for electrical installations.</li>
                <li>Identify the specific risks that inspections and testing help prevent in both domestic and commercial environments.</li>
                <li>Understand the legal requirements for inspection and testing under BS 7671 and EAWR 1989.</li>
                <li>Recognise how proper inspection and testing protect users, property, and the electrical industry's reputation.</li>
                <li>Distinguish between the purposes of inspection (visual checks) and testing (instrument verification).</li>
                <li>Appreciate the documentation requirements and their importance in demonstrating compliance.</li>
              </ul>
            </div>
          </section>

          {/* The Purpose of Inspection */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              The Purpose of Inspection
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Visual inspection is the first line of defence in electrical safety. It involves systematically examining the installation using only your eyes and basic tools, without the need for electrical instruments. This process is crucial for identifying obvious defects and ensuring the installation meets basic safety requirements.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Key aspects of inspection include:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Compliance verification:</strong> Confirms the installation meets BS 7671 Wiring Regulations requirements for cable routing, protection, and accessibility.</li>
                  <li><strong>Safety assessment:</strong> Ensures electrical work is safe, neat, and correctly installed with proper cable support and protection.</li>
                  <li><strong>Environmental suitability:</strong> Confirms equipment is appropriate for its location (IP ratings for damp areas, fire-resistant cables in escape routes).</li>
                  <li><strong>Workmanship quality:</strong> Detects poor installation practices, incorrect materials, damaged components, or unsafe working methods.</li>
                  <li><strong>Documentation check:</strong> Verifies that circuit charts, labels, and warning notices are correctly fitted and legible.</li>
                </ul>
              </div>
              <p className="text-sm text-elec-yellow/80">
                <strong>Critical point:</strong> Inspection must be carried out before any testing begins, and the installation must be de-energised during the inspection process for safety.
              </p>
            </div>
          </section>

          <InlineCheck
            id="inspection-purpose-check"
            question="What is the main purpose of visual inspection?"
            options={["To test electrical circuits", "To verify safety, compliance and workmanship through visual checks", "To measure voltage", "To calibrate instruments"]}
            correctIndex={1}
            explanation="Visual inspection verifies safety, compliance with BS 7671, and workmanship quality through systematic visual examination."
          />

          {/* The Purpose of Testing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              The Purpose of Testing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical testing goes beyond what the eye can see. Using calibrated instruments, testing verifies that circuits perform correctly and safely under electrical conditions. This process reveals hidden faults that could cause serious harm if left undetected.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Essential testing functions:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Electrical continuity:</strong> Confirms protective conductors (earth) provide an unbroken path for fault current.</li>
                  <li><strong>Polarity verification:</strong> Ensures live, neutral, and earth conductors are correctly connected throughout the installation.</li>
                  <li><strong>Insulation resistance:</strong> Tests that cables and equipment maintain adequate insulation to prevent dangerous leakage currents.</li>
                  <li><strong>Earth fault loop impedance:</strong> Verifies that protective devices will operate quickly enough to prevent dangerous touch voltages.</li>
                  <li><strong>RCD operation:</strong> Confirms residual current devices trip within safe time limits to protect against earth leakage.</li>
                  <li><strong>Functional testing:</strong> Checks that all controls, switches, and safety devices operate as intended.</li>
                </ul>
              </div>
              <p className="text-sm text-elec-yellow/80">
                <strong>Remember:</strong> Testing provides measurable, documented proof that safety requirements are met, creating legal evidence of due diligence.
              </p>
            </div>
          </section>

          <InlineCheck
            id="testing-purpose-check"
            question="Which test confirms that conductors are correctly connected (L, N, E)?"
            options={["Continuity", "Insulation resistance", "Polarity", "Earth fault loop impedance"]}
            correctIndex={2}
            explanation="Polarity testing specifically confirms that live, neutral, and earth conductors are correctly connected and not reversed."
          />

          {/* Legal and Safety Obligations */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Legal and Safety Obligations
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical safety isn't just good practice – it's a legal requirement. Multiple regulations and standards create a framework of obligations that every electrical worker must understand and follow.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Key legal requirements:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Electricity at Work Regulations (EAWR 1989):</strong> Requires all electrical systems to be constructed, maintained, and used safely. Places absolute duty on employers and employees to prevent danger.</li>
                  <li><strong>BS 7671 Wiring Regulations:</strong> Establishes inspection and testing as mandatory requirements for compliance. Provides detailed procedures and acceptance criteria.</li>
                  <li><strong>Health and Safety at Work Act 1974:</strong> Creates general duty to ensure workplace safety, including electrical installations.</li>
                  <li><strong>Building Regulations Part P:</strong> Requires certification of electrical work in dwellings, including proper testing procedures.</li>
                  <li><strong>Management of Health and Safety at Work Regulations:</strong> Requires risk assessments that must consider electrical hazards.</li>
                </ul>
              </div>
              <p className="text-sm">
                <strong>Personal responsibility:</strong> As an electrical worker, you have both legal and moral obligations to ensure installations are safe. Cutting corners on inspection and testing isn't just unprofessional – it could result in criminal prosecution if someone is injured.
              </p>
            </div>
          </section>

          <InlineCheck
            id="legal-obligations-check"
            question="Which regulation places an absolute duty to prevent electrical danger?"
            options={["BS 7671", "Electricity at Work Regulations (EAWR 1989)", "Building Regulations Part P", "Health and Safety at Work Act"]}
            correctIndex={1}
            explanation="The Electricity at Work Regulations (EAWR 1989) places an absolute duty on employers and employees to prevent electrical danger."
          />

          {/* Benefits of Inspection and Testing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Benefits of Inspection and Testing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Beyond legal compliance, proper inspection and testing delivers tangible benefits to installers, clients, and the wider electrical industry.
              </p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-3">Professional and business benefits:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Life and property protection:</strong> Prevents electrical fires, shocks, and deaths that devastate families and communities.</li>
                  <li><strong>Installation reliability:</strong> Ensures systems operate efficiently and have maximum service life, reducing maintenance costs.</li>
                  <li><strong>Quality assurance:</strong> Eliminates costly rework, call-backs, and warranty claims that damage profitability.</li>
                  <li><strong>Professional reputation:</strong> Builds client confidence and generates referrals through demonstrated competence and reliability.</li>
                  <li><strong>Insurance protection:</strong> Proper certification may be required for insurance claims and can reduce premiums.</li>
                  <li><strong>Legal defence:</strong> Documented compliance provides protection against claims and prosecution.</li>
                </ul>
              </div>
              <p className="text-sm">
                <strong>Financial reality:</strong> The cost of proper inspection and testing is tiny compared to the potential costs of electrical accidents, legal action, or loss of professional reputation.
              </p>
            </div>
          </section>

          <InlineCheck
            id="benefits-check"
            question="What is one key professional benefit of proper inspection and testing?"
            options={["Faster installation", "Lower material costs", "Building client confidence and professional reputation", "Simpler paperwork"]}
            correctIndex={2}
            explanation="Proper inspection and testing builds client confidence, demonstrates competence, and enhances professional reputation through documented quality assurance."
          />

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
              <h3 className="font-medium text-white mb-2">Case Study: Office Building Lighting Circuit</h3>
              <div className="text-white/80 text-sm space-y-3">
                <p>
                  An office building had a new lighting circuit installed by a contractor who was running behind schedule. To save time, the contractor skipped the formal testing process and simply checked that the lights switched on correctly. The installation was energised and handed over to the client.
                </p>
                <p>
                  Three weeks later, an employee received an electric shock from a light fitting while changing a bulb. The incident was reported to the HSE, who launched a full investigation. Testing revealed that polarity had been reversed on several lighting points, with live and neutral conductors swapped over.
                </p>
                <p><strong>The consequences were severe:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>The employee suffered burns and lost time from work</li>
                  <li>The contractor faced HSE prosecution and heavy fines</li>
                  <li>Professional indemnity insurance was invalidated due to non-compliance</li>
                  <li>The contractor lost their preferred contractor status with multiple clients</li>
                  <li>Reputation damage led to significant loss of future business</li>
                </ul>
                <p>
                  <strong>Prevention:</strong> If proper polarity testing had been completed using a simple voltage indicator or multimeter, the reversed connections would have been identified immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-500/50">
              <p className="font-medium text-white mb-3">Quick Reference:</p>
              <ul className="text-white/80 text-sm space-y-2 list-disc pl-5">
                <li><strong>Inspection</strong> = Visual checks of safety, compliance, and workmanship quality.</li>
                <li><strong>Testing</strong> = Instrument verification of electrical safety and functionality.</li>
                <li><strong>Legal requirement</strong> = Both mandated by BS 7671 and EAWR 1989.</li>
                <li><strong>Timing</strong> = Always complete before energising and handover.</li>
                <li><strong>Documentation</strong> = Record results on EIC/EICR certificates.</li>
                <li><strong>Responsibility</strong> = Only sign what you've done or directly supervised.</li>
                <li><strong>Purpose</strong> = Protects life, property, and professional integrity.</li>
              </ul>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Inspection and testing are not optional – they are legal and professional requirements that form the foundation of electrical safety. They ensure installations are safe, compliant, and reliable before being put into service.
              </p>
              <p>
                Visual inspection catches obvious defects and confirms compliance with wiring regulations, while electrical testing reveals hidden faults that could cause serious harm. Together, they create a comprehensive safety verification process.
              </p>
              <p>
                Without proper inspection and testing, hidden faults remain undetected, putting people and property at serious risk. Every electrical worker has both legal and professional obligations to ensure these vital safety checks are completed thoroughly and documented properly.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Quiz: Why Electrical Installations Must Be Inspected and Tested" />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 6.1
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-2">
                Next: Legal and Safety Reasons
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section1_1;
