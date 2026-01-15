import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section1_3 = () => {
  useSEO(
    "When Testing Is Required - New Work, Alterations, Faults | Level 2 Electrical",
    "Understanding when electrical testing is legally required for new work, alterations, and fault diagnosis under BS7671 and EAWR"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What certificate is required for new electrical installations?",
      options: [
        "Minor Works Certificate",
        "Electrical Installation Certificate (EIC)",
        "Electrical Installation Condition Report (EICR)",
        "Inspection Certificate"
      ],
      correctAnswer: 1,
      explanation: "An Electrical Installation Certificate (EIC) is required for all new electrical installations to confirm they meet BS 7671 standards."
    },
    {
      id: 2,
      question: "What must be carried out before energising any new system?",
      options: [
        "Visual inspection only",
        "Initial verification (inspection and testing)",
        "Periodic inspection",
        "Risk assessment"
      ],
      correctAnswer: 1,
      explanation: "Initial verification, which includes both inspection and testing, must be completed before any new electrical system is energised."
    },
    {
      id: 3,
      question: "What certificate is usually issued for small alterations?",
      options: [
        "Electrical Installation Certificate (EIC)",
        "Electrical Installation Condition Report (EICR)",
        "Minor Works Certificate",
        "Compliance Certificate"
      ],
      correctAnswer: 2,
      explanation: "A Minor Works Certificate is typically issued for small alterations and additions to existing installations."
    },
    {
      id: 4,
      question: "True or False: You can energise an alteration without testing if the original installation was recently tested.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. All alterations must be tested before being energised, regardless of when the original installation was last tested."
    },
    {
      id: 5,
      question: "Give one example of when testing is required for fault diagnosis.",
      options: [
        "Annual maintenance",
        "Tripping RCD",
        "New meter installation",
        "Property sale"
      ],
      correctAnswer: 1,
      explanation: "Testing is required for fault diagnosis when issues like tripping RCDs, flickering lights, or overheating cables occur."
    },
    {
      id: 6,
      question: "How often should domestic dwellings be periodically inspected under BS 7671?",
      options: [
        "Every 5 years",
        "Every 10 years or on change of occupancy",
        "Every 15 years",
        "Only when faults occur"
      ],
      correctAnswer: 1,
      explanation: "Domestic dwellings should be inspected every 10 years or on change of occupancy according to BS 7671."
    },
    {
      id: 7,
      question: "How often should commercial installations be inspected?",
      options: [
        "Every 3 years",
        "Every 5 years (or sooner depending on risk)",
        "Every 10 years",
        "Every 12 years"
      ],
      correctAnswer: 1,
      explanation: "Commercial installations should typically be inspected every 5 years, or more frequently depending on the risk assessment."
    },
    {
      id: 8,
      question: "What is the outcome of a periodic inspection and test?",
      options: [
        "Electrical Installation Certificate (EIC)",
        "Minor Works Certificate",
        "Electrical Installation Condition Report (EICR)",
        "Compliance Report"
      ],
      correctAnswer: 2,
      explanation: "An Electrical Installation Condition Report (EICR) is the outcome of a periodic inspection and test of an existing installation."
    },
    {
      id: 9,
      question: "Why must alterations be tested before being put into service?",
      options: [
        "To comply with insurance requirements",
        "To ensure the new work has not compromised the safety of the installation",
        "To update the electrical drawings",
        "To calculate the electrical load"
      ],
      correctAnswer: 1,
      explanation: "Alterations must be tested to ensure the new work has not compromised the safety of the existing installation."
    },
    {
      id: 10,
      question: "What is the first step before carrying out any electrical testing?",
      options: [
        "Notify the DNO",
        "Safe isolation",
        "Visual inspection",
        "Continuity testing"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation is the first and most critical step before carrying out any electrical testing to ensure safety."
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
              <span className="text-white/60">Section 6.1.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              When Testing Is Required (New Work, Alterations, Faults)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding when electrical testing is legally required for new work, alterations, and fault diagnosis
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-sm space-y-1 list-disc pl-5">
              <li>Testing mandatory for ALL new work before energising - never switch on untested circuits.</li>
              <li>ANY alteration requires testing before use - no exceptions for "small" changes.</li>
              <li>Fault diagnosis testing essential for RCD trips, flickering, overheating symptoms.</li>
              <li>Periodic testing: domestic 10 years, commercial 5 years - issue appropriate certificates always.</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-2 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>Identify when testing is legally required under BS 7671 and EAWR.</li>
                <li>Distinguish between testing for new work, alterations, and faults.</li>
                <li>Understand why certification must accompany all new and modified work.</li>
                <li>Recognise the risks of energising an untested installation.</li>
                <li>Know the certification requirements for different types of electrical work.</li>
                <li>Understand periodic inspection intervals for different property types.</li>
              </ul>
            </div>
          </section>

          {/* New Work */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              New Work
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                All new electrical installations must undergo initial verification before being energised. This is a fundamental safety requirement that protects both users and installers from electrical dangers.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Mandatory Testing Before Energising:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Initial Verification</strong> must be performed before energising a new installation</li>
                  <li>Includes both <strong>inspection</strong> (visual checks) and <strong>testing</strong> (measured checks)</li>
                  <li>Testing ensures correct polarity, insulation resistance, continuity, and protective devices</li>
                  <li>NEVER energise a circuit until all initial verification is complete and satisfactory</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Essential Tests (in order):</p>
                  <ul className="text-sm space-y-1">
                    <li>1. Continuity of protective conductors</li>
                    <li>2. Continuity of ring final circuit conductors</li>
                    <li>3. Insulation resistance</li>
                    <li>4. Polarity</li>
                    <li>5. Earth electrode resistance (if applicable)</li>
                    <li>6. Earth fault loop impedance</li>
                    <li>7. Functional testing (RCDs, switches, etc.)</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Pass Criteria Examples:</p>
                  <ul className="text-sm space-y-1">
                    <li>Insulation resistance: ≥1MΩ at 500V DC</li>
                    <li>Continuity: &lt;0.05Ω for protective conductors</li>
                    <li>RCD operation: 1x, 5x rated current</li>
                    <li>Polarity: Correct at all points</li>
                    <li>Earth fault loop: Within limits for protective device</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 mb-2">Critical Safety Point</p>
                <p className="text-sm">
                  Energising an untested installation can result in electric shock, fire, or equipment damage. Initial verification is a legal requirement under EAWR and professional duty under BS 7671.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="new-work-check"
            question="What is the correct sequence for testing a new installation?"
            options={["Energise first, then test", "Test insulation first, then continuity", "Complete all dead tests before energising", "Test only if problems occur"]}
            correctIndex={2}
            explanation="All dead tests (continuity, insulation, polarity) must be completed before energising. Live tests (earth fault loop impedance, RCD testing) follow after safe energising."
          />

          {/* Alterations and Additions */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Alterations and Additions
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Any modification to an existing electrical installation requires testing to ensure the alteration has not compromised the safety of the original installation and that the new work meets current standards.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Scope of Testing for Alterations:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Any change to an existing system must be tested before being put into service</li>
                  <li><strong>Example:</strong> Adding a socket to an existing ring final circuit requires continuity, polarity, and R1+R2 checks</li>
                  <li>Must verify the alteration has not adversely affected the existing installation</li>
                  <li>Test both the new work AND relevant parts of the existing installation</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Minor Works Certificate:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Small alterations and additions</li>
                    <li>• Single circuit modifications</li>
                    <li>• Socket outlets, lighting points</li>
                    <li>• Replacement of accessories</li>
                    <li>• Adding to existing circuits</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Full EIC Required:</p>
                  <ul className="text-sm space-y-1">
                    <li>• New circuits added to existing installation</li>
                    <li>• Consumer unit replacements</li>
                    <li>• Major alterations affecting multiple circuits</li>
                    <li>• Work requiring design calculations</li>
                    <li>• Installation of new distribution boards</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Important Legal Point</p>
                <p className="text-sm">
                  When you alter an existing installation, you become responsible for ensuring that your work does not make the existing installation unsafe. This means testing may reveal pre-existing faults that you must address or formally report.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="alteration-scope-check"
            question="Which of the following alterations would require a full EIC rather than a Minor Works Certificate?"
            options={["Adding a socket to existing ring", "Replacing a light switch", "Installing a new consumer unit", "Changing a lamp holder"]}
            correctIndex={2}
            explanation="Installing a new consumer unit is a major alteration affecting multiple circuits and requires a full EIC, not just a Minor Works Certificate."
          />

          {/* Fault Diagnosis */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Fault Diagnosis
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                When electrical systems show signs of faults or abnormal operation, systematic testing is essential to identify the cause and confirm safe remedial action has been taken.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Common Fault Symptoms Requiring Testing:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Tripping RCDs:</strong> May indicate earth leakage, damaged cables, or moisture ingress</li>
                  <li><strong>Flickering lights:</strong> Could suggest loose connections or overloading</li>
                  <li><strong>Overheating cables/accessories:</strong> May indicate overloading or high resistance joints</li>
                  <li><strong>Electric shock from metalwork:</strong> Potential earth fault requiring immediate investigation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Systematic Testing Approach:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Safe isolation first</strong> - never test live circuits for fault diagnosis</li>
                  <li><strong>Continuity tests:</strong> Check protective conductor integrity and circuit continuity</li>
                  <li><strong>Insulation resistance:</strong> Identify deteriorated insulation or moisture damage</li>
                  <li><strong>Earth fault loop impedance:</strong> Verify protective device operation</li>
                  <li><strong>RCD testing:</strong> Confirm correct operation and sensitivity</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fault-diagnosis-check"
            question="What should be the FIRST step when investigating a fault that causes an RCD to trip repeatedly?"
            options={["Test the RCD operation", "Check for earth leakage", "Safe isolation of the circuit", "Measure insulation resistance"]}
            correctIndex={2}
            explanation="Safe isolation must always be the first step before any fault diagnosis testing can be carried out safely."
          />

          {/* Periodic Inspection */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Periodic Inspection and Testing
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Existing installations deteriorate over time and must be periodically inspected and tested to ensure they remain safe for continued use.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Domestic Properties:</p>
                  <ul className="text-sm space-y-1">
                    <li><strong>Interval:</strong> Every 10 years maximum</li>
                    <li><strong>Change of occupancy:</strong> Before new tenant/owner</li>
                    <li><strong>Insurance requirements:</strong> May require more frequent testing</li>
                    <li><strong>Rental properties:</strong> Every 5 years in some regions</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Commercial/Industrial:</p>
                  <ul className="text-sm space-y-1">
                    <li><strong>Standard interval:</strong> Every 5 years maximum</li>
                    <li><strong>High-risk environments:</strong> Annual or more frequent</li>
                    <li><strong>Risk assessment driven:</strong> May require shorter intervals</li>
                    <li><strong>Construction sites:</strong> Every 3 months</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Outcome and Reporting:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>EICR:</strong> Electrical Installation Condition Report must be issued</li>
                  <li><strong>Condition codes:</strong> C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended)</li>
                  <li><strong>Recommendations:</strong> Clear guidance on required remedial work</li>
                  <li><strong>Next inspection date:</strong> Must be specified based on condition found</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Case Study */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Case Study: The Cost of Cutting Corners
            </h2>
            <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
              <div className="text-white/80 text-sm space-y-3">
                <p>
                  <strong>Background:</strong> A retail shop owner hired an unqualified person to add several socket outlets to accommodate new equipment. No testing was performed and no certificates were issued to save time and money.
                </p>
                <p>
                  <strong>The Incident:</strong> Six months later, a socket outlet overheated due to a poor connection, causing a fire that destroyed £50,000 worth of stock and forced the business to close for three weeks.
                </p>
                <p>
                  <strong>Investigation:</strong> HSE investigation revealed the additional sockets were not properly connected to the ring circuit, creating a high-resistance joint that overheated under load.
                </p>
                <p>
                  <strong>Consequences:</strong> Shop owner prosecuted under EAWR 1989, fined £15,000, insurance claim rejected due to non-compliance, business reputation severely damaged. Total cost exceeded £100,000 - far more than proper testing would have cost.
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
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">When Testing Required:</p>
                <ul className="text-sm space-y-1 text-white/80">
                  <li><strong>New work</strong> = Full inspection + testing → EIC required</li>
                  <li><strong>Alterations</strong> = Test before energising → Minor Works or EIC</li>
                  <li><strong>Faults</strong> = Test to diagnose safely → Record results</li>
                  <li><strong>Periodic</strong> = EICR → every 5 or 10 years</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Key Remember Points:</p>
                <ul className="text-sm space-y-1 text-white/80">
                  <li>• Safe isolation before all testing</li>
                  <li>• Never energise untested circuits</li>
                  <li>• Issue correct certificate type</li>
                  <li>• Only sign what you've tested</li>
                </ul>
              </div>
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
                Testing is essential whenever new work is installed, when existing circuits are altered, or when faults occur. It confirms the system is safe, compliant, and fit for use. Certificates must always be issued, and periodic inspections are critical to maintaining long-term safety.
              </p>
              <p className="text-sm text-elec-yellow/80">
                Remember: safe isolation first, test systematically, and never energise untested circuits.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Knowledge Check: When Testing Is Required" />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Legal and Safety Reasons
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-4">
                Next: Inspection vs Testing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section1_3;
