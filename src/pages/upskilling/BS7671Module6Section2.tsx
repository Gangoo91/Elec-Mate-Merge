import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m6s2-check1",
    question: "Why must visual inspection be completed before electrical testing?",
    options: [
      "It reduces the cost of testing",
      "BS 7671 requires it for proper documentation",
      "It identifies defects that could make testing unsafe or provide false results",
      "It is only required for commercial installations"
    ],
    correctIndex: 2,
    explanation: "Visual inspection identifies defects that could make testing unsafe or mask underlying problems. Testing faulty installations can damage equipment, cause injury, or produce invalid results. BS 7671 Regulation 611 requires visual inspection to be completed with the installation disconnected before any electrical testing begins."
  },
  {
    id: "bs7671-m6s2-check2",
    question: "What are two items that must be checked during visual inspection?",
    options: [
      "Cable colours and brand names",
      "Conductor selection and protective devices",
      "Building materials and paint colours",
      "Weather conditions and time of day"
    ],
    correctIndex: 1,
    explanation: "Visual inspection must include checking conductor selection (current-carrying capacity, voltage rating, environmental suitability) and protective devices (current rating, type characteristics, breaking capacity, RCD protection). These are critical for installation safety."
  },
  {
    id: "bs7671-m6s2-check3",
    question: "Who is legally responsible for inspection and testing results once a certificate is signed?",
    options: [
      "The client who commissioned the work",
      "The building control officer",
      "The competent person signing the certificate",
      "The electricity supplier"
    ],
    correctIndex: 2,
    explanation: "The competent person signing the certificate is personally responsible for all test results and their accuracy. This includes ensuring correct test methods, calibrated instruments, proper interpretation of results, and comprehensive documentation."
  }
];

const faqs = [
  {
    question: "Can I skip visual inspection if the installation looks new?",
    answer: "No. Visual inspection is mandatory for all installations regardless of age. Even new installations may have installation errors, incorrect protective device selections, or non-compliant workmanship that only systematic inspection will reveal."
  },
  {
    question: "What happens if I find defects during inspection?",
    answer: "All defects must be recorded and communicated to the client. Depending on severity, the installation may need rectification before testing can proceed. C1 (danger present) and C2 (potentially dangerous) codes require immediate or urgent action."
  },
  {
    question: "How do I document areas I couldn't inspect?",
    answer: "Record all limitations clearly on the certificate, specifying which areas couldn't be accessed and why. This protects you legally and informs the client of scope restrictions. Extensive limitations may affect certificate validity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What must an electrician do if test results fall outside BS 7671 limits?",
    options: [
      "Ignore the results if they're close to the limits",
      "Continue with the next test in the sequence",
      "Rectify the defect and re-test before energising",
      "Document the result but proceed with certification"
    ],
    correctAnswer: 2,
    explanation: "If test results fall outside BS 7671 limits, mandatory corrective action is required. The installation must remain isolated, defects must be rectified completely, and re-testing is required after corrections. The installation cannot be energised or certified until compliance is achieved."
  }
];

const BS7671Module6Section2 = () => {
  useSEO({
    title: "Visual Inspection and Testing Responsibilities | BS7671 Module 6.2",
    description: "Learn about visual inspection requirements, key inspection items, and electrician responsibilities during testing under BS 7671."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/bs7671-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Visual Inspection and Testing Responsibilities
          </h1>
          <p className="text-white/80">
            BS 7671 requirements for inspection, testing procedures, and professional accountability
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Visual First:</strong> Always complete visual inspection before testing</li>
              <li><strong>Safety Critical:</strong> Identifies hazards that could make testing dangerous</li>
              <li><strong>Legal Requirement:</strong> BS 7671 Regulation 611 mandates systematic inspection</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Damaged cables, loose terminations, incorrect protective devices</li>
              <li><strong>Use:</strong> Schedule of Inspections (BS 7671 Appendix 6) as your checklist</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Why visual inspection must precede testing",
              "Key items to check during inspection",
              "Responsibilities during testing",
              "Link between inspection, testing, and certification"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Purpose of Visual Inspection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of Visual Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual inspection represents the first and most crucial phase of initial verification. Under BS 7671
              Regulation 611, this systematic examination must be completed with the installation completely
              disconnected from the supply. The inspection serves multiple critical purposes: ensuring tester safety,
              identifying defects that could compromise subsequent electrical testing, and verifying compliance with
              design specifications and regulatory requirements.
            </p>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Critical Safety Protocol</p>
              <p className="text-sm text-white">
                Electrical testing must NEVER be carried out without first completing a thorough visual inspection.
                Testing faulty installations can result in equipment damage, personal injury, or invalidate test results.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Verification</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Ensures installation is safe to test and energise</li>
                  <li>Identifies immediate safety hazards</li>
                  <li>Verifies isolation and safety procedures</li>
                  <li>Confirms protective measures are in place</li>
                  <li>Validates emergency provisions and signage</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Defect Identification</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Damaged cables and insulation breaches</li>
                  <li>Loose or inadequate terminations</li>
                  <li>Incorrect protective device selections</li>
                  <li>Missing or inadequate earthing/bonding</li>
                  <li>Non-compliant installation methods</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Systematic Inspection Methodology:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-elec-yellow/70 mb-1">Supply to Load Path</p>
                  <ul className="text-sm text-white space-y-0.5 ml-4">
                    <li>1. Incoming supply arrangements</li>
                    <li>2. Main switchgear and distribution</li>
                    <li>3. Distribution boards and protective devices</li>
                    <li>4. Circuit wiring and containment</li>
                    <li>5. Final circuits and accessories</li>
                    <li>6. Load connections and terminations</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-elec-yellow/70 mb-1">Safety Systems Check</p>
                  <ul className="text-sm text-white space-y-0.5 ml-4">
                    <li>1. Earthing system integrity</li>
                    <li>2. Equipotential bonding completeness</li>
                    <li>3. RCD and protective device presence</li>
                    <li>4. Fire barriers and segregation</li>
                    <li>5. Emergency switching provisions</li>
                    <li>6. Warning notices and identification</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 2: Key Items to Inspect */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Key Items to Inspect
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Appendix 6 provides the definitive Schedule of Inspections that must be completed for all
              installations. This checklist ensures consistency and completeness across all verification activities.
              Every item marked as applicable must be inspected and recorded as satisfactory before proceeding to testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Equipment Selection and Suitability:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-elec-yellow/70 mb-1">Conductor Selection</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li><strong>Current-carrying capacity:</strong> Cable size adequate for design current</li>
                    <li><strong>Voltage rating:</strong> Insulation suitable for system voltage</li>
                    <li><strong>Environmental suitability:</strong> Temperature, chemical, UV resistance</li>
                    <li><strong>Identification:</strong> Core colours comply with BS 7671 Table 51</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-elec-yellow/70 mb-1">Protective Devices</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li><strong>Current rating:</strong> Device rating ≥ design current</li>
                    <li><strong>Type characteristics:</strong> B, C, D curves appropriate for load</li>
                    <li><strong>Breaking capacity:</strong> Adequate for prospective fault current</li>
                    <li><strong>RCD protection:</strong> Type and sensitivity appropriate</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">IP Rating Verification by Environment:</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Standard</p>
                  <p className="text-white/90 text-xs">Domestic: IP2X min</p>
                  <p className="text-white/90 text-xs">Office: IP2X</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Wet Locations</p>
                  <p className="text-white/90 text-xs">Bathrooms: IPX4</p>
                  <p className="text-white/90 text-xs">External: IP44</p>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="font-medium text-white mb-1">Harsh</p>
                  <p className="text-white/90 text-xs">Agriculture: IP54</p>
                  <p className="text-white/90 text-xs">Wash-down: IP65</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Special Location Requirements (Section 7):</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-elec-yellow/70 mb-1">Bathrooms (Section 701)</p>
                  <ul className="text-sm text-white space-y-0.5 ml-4">
                    <li>Zone 0: No electrical equipment</li>
                    <li>Zone 1: IPX4, SELV only</li>
                    <li>Zone 2: IPX4, Class II or RCD protected</li>
                    <li>Supplementary bonding verification</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-elec-yellow/70 mb-1">Swimming Pools (Section 702)</p>
                  <ul className="text-sm text-white space-y-0.5 ml-4">
                    <li>Zone 0: 12V SELV maximum</li>
                    <li>Zone 1: IPX5, SELV circuits only</li>
                    <li>Zone 2: IPX2, RCD protection mandatory</li>
                    <li>Equipotential bonding essential</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 3: Responsibilities During Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Responsibilities During Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The electrician conducting testing assumes full legal responsibility for safety and accuracy.
              This includes criminal liability under health and safety legislation and professional accountability
              for all recorded results and safety assessments.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Mandatory Testing Sequence (Regulation 612):</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-transparent border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Dead Testing Phase</p>
                  <ul className="text-sm text-white space-y-1">
                    <li><strong>1-2. Continuity Tests:</strong> Protective conductors, ring circuits, bonding</li>
                    <li><strong>3. Insulation Resistance:</strong> Minimum ≥1MΩ at specified test voltages</li>
                    <li><strong>4. Polarity Check:</strong> Single-pole device connections, socket verification</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-transparent border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Live Testing Phase</p>
                  <ul className="text-sm text-white space-y-1">
                    <li><strong>5. Earth Fault Loop Impedance:</strong> Ze and Zs verification</li>
                    <li><strong>6-7. Protection Testing:</strong> RCD operation times, phase sequence</li>
                    <li><strong>Functional Testing:</strong> Device operation, emergency systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400/80 mb-2">Acceptable Results</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All values within BS 7671 limits</li>
                  <li>No safety concerns identified</li>
                  <li>Protective devices operate correctly</li>
                  <li>Documentation complete and accurate</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400/80 mb-2">Unsatisfactory Results</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Mandatory corrective action required</li>
                  <li>Installation must remain isolated</li>
                  <li>Defects must be rectified completely</li>
                  <li>Re-testing required after corrections</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 4: Recording and Accountability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Recording and Accountability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The person signing inspection and testing certificates assumes full legal responsibility for all
              recorded information. This creates both professional accountability and potential criminal liability
              under health and safety legislation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Recording (EIC/MEIWC)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All inspection results documented</li>
                  <li>Complete test results recorded</li>
                  <li>Defects clearly identified</li>
                  <li>Limitations of inspection noted</li>
                  <li>Recommendations for improvement</li>
                  <li>Next inspection date specified</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Individual Accountability</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Formal electrical qualifications required</li>
                  <li>Current BS 7671 knowledge essential</li>
                  <li>Risk assessment abilities</li>
                  <li>Instrument operation skills</li>
                  <li>Professional indemnity insurance</li>
                  <li>Continuous professional development</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Practical Guidance Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Inspection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify IP rating appropriate for location and environment</li>
                <li>Check all protective devices correctly rated and type-tested</li>
                <li>Confirm RCD/RCBO placement meets BS 7671 requirements</li>
                <li>Inspect all terminations for tightness and corrosion</li>
                <li>Verify labelling clear, permanent, and corresponds to circuit layout</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping visual inspection:</strong> Never skip under time pressure - safety is paramount</li>
                <li><strong>Testing out of sequence:</strong> Can lead to dangerous situations and invalid results</li>
                <li><strong>Incomplete documentation:</strong> All results must be recorded accurately at the time of testing</li>
                <li><strong>Signing without verification:</strong> Never sign certificates for work you haven't personally verified</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Dead Tests (Installation Isolated)</p>
              <ul className="space-y-0.5">
                <li>1. Protective conductor continuity</li>
                <li>2. Ring final circuit continuity</li>
                <li>3. Insulation resistance (≥1MΩ at 500V)</li>
                <li>4. Polarity verification</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Live Tests (After Energisation)</p>
              <ul className="space-y-0.5">
                <li>5. Earth fault loop impedance (Zs)</li>
                <li>6. RCD operation times</li>
                <li>7. Prospective fault current</li>
                <li>8. Functional testing</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-white/5 my-12" />

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            questions={quizQuestions}
            title="Section Quiz"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-6-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-6-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module6Section2;
