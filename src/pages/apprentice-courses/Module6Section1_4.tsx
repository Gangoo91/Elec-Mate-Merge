import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section1_4 = () => {
  useSEO(
    "Difference Between Inspection and Testing | Level 2 Electrical",
    "Understanding the distinct roles of visual inspection and instrumental testing in electrical verification under BS7671"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is inspection in electrical work?",
      options: [
        "Measuring electrical characteristics",
        "A visual check to confirm compliance and workmanship",
        "Testing with instruments",
        "Energising the circuit"
      ],
      correctAnswer: 1,
      explanation: "Inspection is a careful visual check of the installation to ensure compliance with design and BS 7671 standards."
    },
    {
      id: 2,
      question: "Name one example of an inspection task.",
      options: [
        "Measuring insulation resistance",
        "Testing RCD operation",
        "Checking cable routes are in safe zones",
        "Earth fault loop impedance testing"
      ],
      correctAnswer: 2,
      explanation: "Checking that cable routes comply with safe zones is a visual inspection task that doesn't require instruments."
    },
    {
      id: 3,
      question: "What is testing in electrical work?",
      options: [
        "Visual checking of cables",
        "Measuring electrical characteristics using instruments",
        "Looking at protective devices",
        "Checking cable containment"
      ],
      correctAnswer: 1,
      explanation: "Testing involves measuring electrical characteristics using instruments to confirm the installation is electrically safe."
    },
    {
      id: 4,
      question: "Name one example of a test.",
      options: [
        "Checking cable damage",
        "Insulation resistance testing",
        "Verifying cable routes",
        "Checking labels"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance testing is an instrumental test that measures the electrical integrity between conductors."
    },
    {
      id: 5,
      question: "True or False: Testing can replace the need for inspection.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Testing cannot reveal poor workmanship or construction issues that are visible - both inspection and testing are essential."
    },
    {
      id: 6,
      question: "Why can inspection alone not ensure safety?",
      options: [
        "It takes too long",
        "It cannot detect hidden faults like loose connections or insulation breakdown",
        "It requires expensive equipment",
        "It's not required by regulations"
      ],
      correctAnswer: 1,
      explanation: "Inspection alone cannot detect hidden electrical faults such as loose terminations inside accessories or insulation breakdown."
    },
    {
      id: 7,
      question: "Which BS 7671 document includes inspection checklists?",
      options: [
        "Appendix 3",
        "Appendix 6",
        "Appendix 1",
        "Appendix 9"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 Appendix 6 provides detailed inspection checklists for various types of electrical installations."
    },
    {
      id: 8,
      question: "What certificate records inspection and testing results?",
      options: [
        "Health and Safety Certificate",
        "Electrical Installation Certificate (EIC) or Minor Works Certificate",
        "Building Regulations Certificate",
        "Insurance Certificate"
      ],
      correctAnswer: 1,
      explanation: "Both inspection and testing results are recorded on either an Electrical Installation Certificate (EIC) or Minor Works Certificate."
    },
    {
      id: 9,
      question: "What tool is typically used for continuity testing?",
      options: [
        "Torch and mirror",
        "A multifunction tester or continuity tester",
        "Visual inspection only",
        "Screwdriver"
      ],
      correctAnswer: 1,
      explanation: "Continuity testing requires electrical instruments such as a multifunction tester or dedicated continuity tester."
    },
    {
      id: 10,
      question: "Why must both inspection and testing be completed before energising?",
      options: [
        "To save time",
        "To ensure both visible construction and hidden electrical integrity are safe and compliant",
        "To reduce costs",
        "It's optional"
      ],
      correctAnswer: 1,
      explanation: "Both processes are essential to verify that the installation is properly constructed (inspection) and electrically safe (testing)."
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
              <span className="text-white/60">Section 6.1.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Difference Between Inspection and Testing
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding the distinct roles of visual inspection and instrumental testing in electrical verification
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 text-sm space-y-1 list-disc pl-5">
              <li>Inspection = Visual checks of construction, routing, labelling - what you can SEE.</li>
              <li>Testing = Instrumental measurements of electrical characteristics - what you can MEASURE.</li>
              <li>Both essential for compliance - inspection finds visible faults, testing finds hidden ones.</li>
              <li>Never energise based on inspection alone - hidden faults can be deadly.</li>
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
                <li>Define what is meant by inspection and testing.</li>
                <li>Identify the key tasks involved in each process.</li>
                <li>Understand why both are necessary for compliance with BS 7671.</li>
                <li>Recognise situations where visual inspection alone is insufficient.</li>
                <li>Apply correct procedures for combining inspection and testing.</li>
                <li>Use appropriate tools and documentation for each process.</li>
              </ul>
            </div>
          </section>

          {/* What is Inspection? */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              What is Inspection?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Inspection is a systematic visual examination of an electrical installation to verify that it has been constructed according to the design and complies with BS 7671 requirements. It focuses on aspects that can be observed without the use of electrical test instruments.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Definition and Purpose:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Definition:</strong> A careful visual check of the installation without energising</li>
                  <li><strong>Purpose:</strong> To ensure compliance with design and BS 7671 standards</li>
                  <li><strong>Timing:</strong> Must be completed before any testing or energising takes place</li>
                  <li><strong>Scope:</strong> Covers all accessible parts of the installation</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Cable and Wiring Checks:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Checking that cables are not damaged</li>
                    <li>• Confirming correct routing (safe zones)</li>
                    <li>• Verifying adequate support and fixing</li>
                    <li>• Checking bend radii are not exceeded</li>
                    <li>• Ensuring proper cable selection for environment</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Equipment and Accessories:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Protective devices correctly selected</li>
                    <li>• Accessories properly fixed and undamaged</li>
                    <li>• Correct IP ratings for location</li>
                    <li>• Proper labelling and identification</li>
                    <li>• Adequate access for maintenance</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Inspection Tools and Equipment:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Basic tools:</strong> Torch, mirror, measuring tape, magnifying glass</li>
                  <li><strong>Documentation:</strong> BS 7671 Appendix 6 checklists, installation drawings</li>
                  <li><strong>Safety equipment:</strong> Hard hat, safety glasses, appropriate PPE</li>
                  <li><strong>No electrical instruments</strong> - inspection relies purely on visual observation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 mb-2">Key Limitation of Inspection</p>
                <p className="text-sm">
                  Visual inspection cannot detect hidden faults such as loose connections inside accessories, degraded insulation, or incorrect internal wiring. This is why testing with instruments is essential to complete the verification process.
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="inspection-purpose-check"
            question="What is the main purpose of electrical inspection?"
            options={["To measure electrical characteristics", "To test protective devices", "To ensure visual compliance with design and BS 7671", "To energise the installation"]}
            correctIndex={2}
            explanation="Inspection is a visual process to ensure the installation complies with the design and BS 7671 standards before any testing or energising takes place."
          />

          {/* What is Testing? */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              What is Testing?
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Testing involves the measurement of electrical characteristics using calibrated instruments to verify that the installation meets the electrical safety requirements specified in BS 7671. Testing reveals hidden electrical faults that cannot be detected by visual inspection alone.
              </p>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Definition and Purpose:</p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li><strong>Definition:</strong> Measurement of electrical characteristics using calibrated instruments</li>
                  <li><strong>Purpose:</strong> To confirm that the installation is electrically safe and meets BS 7671 requirements</li>
                  <li><strong>Timing:</strong> Follows inspection and must be completed before energising</li>
                  <li><strong>Verification:</strong> Proves the electrical integrity of circuits and protective systems</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Dead Tests (Before Energising):</p>
                  <ul className="text-sm space-y-1">
                    <li>1. Continuity of protective conductors</li>
                    <li>2. Continuity of ring final circuits</li>
                    <li>3. Insulation resistance testing</li>
                    <li>4. Protection by SELV, PELV or electrical separation</li>
                    <li>5. Protection by barriers or enclosures</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Live Tests (After Safe Energising):</p>
                  <ul className="text-sm space-y-1">
                    <li>6. Insulation of floors and walls</li>
                    <li>7. Polarity testing</li>
                    <li>8. Earth electrode resistance</li>
                    <li>9. Earth fault loop impedance</li>
                    <li>10. Additional protection (RCD testing)</li>
                    <li>11. Phase sequence</li>
                    <li>12. Functional testing</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Test Instruments and Equipment:</p>
                <div className="grid md:grid-cols-2 gap-2">
                  <p className="text-sm p-2 rounded bg-green-500/10"><strong>Multifunction Tester:</strong> Primary instrument for most tests</p>
                  <p className="text-sm p-2 rounded bg-blue-500/10"><strong>RCD Tester:</strong> Dedicated testing at various currents</p>
                  <p className="text-sm p-2 rounded bg-purple-500/10"><strong>Phase Rotation Indicator:</strong> For three-phase systems</p>
                  <p className="text-sm p-2 rounded bg-orange-500/10"><strong>Calibration:</strong> All instruments must be within calibration date</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Typical Acceptance Criteria:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Continuity:</strong> Protective conductors &lt; 0.05Ω, ring circuits within 0.05Ω variation</li>
                  <li><strong>Insulation resistance:</strong> ≥ 1MΩ between live conductors and earth at 500V DC</li>
                  <li><strong>Earth fault loop impedance:</strong> Must not exceed values in BS 7671 tables for protective device operation</li>
                  <li><strong>RCD operation:</strong> Trip within specified time at test currents (½x, 1x, 5x rated)</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="testing-sequence-check"
            question="When should electrical testing be carried out in relation to inspection?"
            options={["Before inspection", "At the same time as inspection", "After inspection is completed", "Testing is optional"]}
            correctIndex={2}
            explanation="Testing must follow inspection. BS 7671 requires that inspection shall precede testing to ensure the installation is properly constructed before electrical verification begins."
          />

          {/* Why Both Are Needed */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Why Both Are Needed
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Neither inspection nor testing alone provides complete verification of an electrical installation. Each process has specific capabilities and limitations, and both are essential for ensuring comprehensive safety and compliance.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Limitations of Inspection Alone:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Cannot detect loose terminations inside accessories</li>
                    <li>• Cannot see damaged insulation inside conduits</li>
                    <li>• Cannot verify high resistance joints look correct</li>
                    <li>• Cannot confirm MCBs or RCDs will operate</li>
                    <li>• Cannot detect cross-connections between circuits</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-2">Limitations of Testing Alone:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Cannot reveal poor workmanship</li>
                    <li>• Cannot verify cable routing compliance</li>
                    <li>• Cannot detect physical damage that may cause future failures</li>
                    <li>• Cannot assess environmental suitability</li>
                    <li>• Cannot verify adequate maintenance access</li>
                  </ul>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-2">What Inspection Provides:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Verification of visible construction quality</li>
                    <li>• Compliance with design requirements</li>
                    <li>• Appropriate equipment selection</li>
                    <li>• Correct installation methods</li>
                    <li>• Environmental protection adequacy</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-2">What Testing Provides:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Electrical integrity verification</li>
                    <li>• Hidden fault detection</li>
                    <li>• Protective system operation confirmation</li>
                    <li>• Insulation quality assessment</li>
                    <li>• Connection reliability verification</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Real-World Integration Examples:</p>
                <div className="space-y-2 text-sm">
                  <p className="p-2 rounded bg-green-500/10"><strong>Socket Outlet Circuit:</strong> Inspection verifies correct mounting and cable routing. Testing confirms ring continuity and correct polarity.</p>
                  <p className="p-2 rounded bg-blue-500/10"><strong>Consumer Unit:</strong> Inspection checks appropriate MCB ratings and labelling. Testing verifies earth fault loop impedance for each circuit.</p>
                  <p className="p-2 rounded bg-purple-500/10"><strong>Lighting Circuit:</strong> Inspection confirms switch drop routing. Testing verifies continuity and correct switching arrangements.</p>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="both-needed-check"
            question="Why cannot testing alone ensure electrical safety?"
            options={["Testing takes too long", "Testing cannot reveal poor workmanship or construction issues", "Testing is too expensive", "Testing requires special qualifications"]}
            correctIndex={1}
            explanation="Testing alone cannot reveal poor workmanship, incorrect installation methods, or construction issues that are visible to inspection but don't affect electrical measurements."
          />

          {/* Case Study */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Case Study: When Inspection Reveals What Testing Cannot
            </h2>
            <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-500/50">
              <div className="text-white/80 text-sm space-y-3">
                <p>
                  <strong>Background:</strong> A commercial kitchen installation passed all electrical tests with flying colours - continuity, insulation resistance, and earth fault loop impedance were all within acceptable limits.
                </p>
                <p>
                  <strong>The Problem:</strong> During inspection, it was discovered that standard PVC cables had been used in areas where temperatures regularly exceeded 60°C, and IP20 rated accessories were installed in areas subject to steam and water spray.
                </p>
                <p>
                  <strong>The Discovery:</strong> While the installation was electrically sound, the environmental conditions would cause rapid deterioration of cable insulation and ingress protection failures within months.
                </p>
                <p>
                  <strong>The Solution:</strong> Inspection identified the need for high-temperature rated cables and IP65 rated accessories - problems that testing alone could never have revealed.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50 mt-4">
              <p className="font-medium text-white mb-2">Key Learning Points</p>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• Electrical testing confirmed circuit integrity but couldn't assess environmental suitability</li>
                <li>• Visual inspection identified inappropriate component selection for the application</li>
                <li>• Both processes were essential for identifying different types of compliance issues</li>
              </ul>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Pocket Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Quick Reference:</p>
                <ul className="text-sm space-y-1 text-white/80">
                  <li><strong>Inspection</strong> = Visual (What you see)</li>
                  <li><strong>Testing</strong> = Instrumental (What you measure)</li>
                  <li><strong>Both</strong> must be completed for compliance</li>
                  <li><strong>Certification</strong> requires results of both</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Process Sequence:</p>
                <ul className="text-sm space-y-1 text-white/80">
                  <li>1. Inspection first (de-energised)</li>
                  <li>2. Resolve any inspection issues</li>
                  <li>3. Testing second (dead then live)</li>
                  <li>4. Certificate completion</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Inspection confirms correct construction and visible compliance through careful visual examination. Testing verifies the hidden electrical integrity through instrumental measurement. Together, they provide confidence that the system is safe, functional, and compliant with BS 7671.
              </p>
              <p className="text-sm text-elec-yellow/80">
                Neither process is complete without the other - inspection reveals what testing cannot see, while testing detects what inspection cannot measure.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Knowledge Check: Inspection vs Testing" />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: When Testing Is Required
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-5">
                Next: Level 2 Expectations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section1_4;
