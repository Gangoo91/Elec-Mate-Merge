import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_6 = () => {
  useSEO(
    "Visual Inspection Checklist and Record-Keeping - Level 2 Electrical Installation",
    "BS 7671 inspection checklists, documentation requirements and record-keeping procedures"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of a visual inspection checklist?",
      options: ["To reduce inspection time", "To ensure all items are systematically checked", "To impress clients", "To reduce costs"],
      correctAnswer: 1,
      explanation: "The main purpose is to ensure systematic coverage of all inspection items without oversight."
    },
    {
      id: 2,
      question: "Which appendix in BS 7671 contains the model inspection schedule?",
      options: ["Appendix 4", "Appendix 5", "Appendix 6", "Appendix 7"],
      correctAnswer: 2,
      explanation: "Appendix 6 of BS 7671 contains the model forms for inspection and testing."
    },
    {
      id: 3,
      question: "Name two items that should be included in an inspection checklist.",
      options: ["Only cable colours", "Condition of accessories and earthing/bonding", "Only switch positions", "Only circuit numbers"],
      correctAnswer: 1,
      explanation: "Inspection checklists must include condition of accessories, earthing and bonding, circuit labelling, cable routing, and IP ratings."
    },
    {
      id: 4,
      question: "True or False: Relying on memory is acceptable for visual inspections.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False — visual inspections must be systematic and documented. Memory is unreliable and provides no audit trail."
    },
    {
      id: 5,
      question: "Which certificates include inspection records?",
      options: ["Only test certificates", "Electrical Installation Certificate (EIC) and Minor Works Certificate", "Only compliance certificates", "Building control certificates"],
      correctAnswer: 1,
      explanation: "Both EIC and Minor Works Certificates include inspection records as integral components."
    },
    {
      id: 6,
      question: "Why should cosmetic defects not always be recorded?",
      options: ["They are not important", "Only safety or compliance issues must be documented", "To save time", "To reduce paperwork"],
      correctAnswer: 1,
      explanation: "Inspection records should focus on safety-critical and compliance issues, not purely cosmetic defects."
    },
    {
      id: 7,
      question: "What should be done if a safety-critical issue is found?",
      options: ["Ignore it if minor", "Record it clearly and arrange remedial action before energising", "Note it for later", "Let the client decide"],
      correctAnswer: 1,
      explanation: "Safety-critical issues must be recorded clearly and remediated before the installation is energised."
    },
    {
      id: 8,
      question: "Give one benefit of proper inspection record-keeping.",
      options: ["Faster installations", "Legal protection and supports maintenance", "Lower material costs", "Reduced testing time"],
      correctAnswer: 1,
      explanation: "Proper records provide legal protection, support ongoing maintenance, and build client trust."
    },
    {
      id: 9,
      question: "In the real-world example, what was missed due to lack of a checklist?",
      options: ["Cable labelling", "Bonding to exposed structural steelwork", "RCD testing", "Circuit numbering"],
      correctAnswer: 1,
      explanation: "The inspector missed checking bonding to exposed structural steelwork, creating a dangerous potential difference."
    },
    {
      id: 10,
      question: "How should completed inspection records be stored?",
      options: ["In the office only", "Securely with certificates and test results", "On the client's desk", "In the van"],
      correctAnswer: 1,
      explanation: "Inspection records must be stored securely with test results and certificates as permanent documentation."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
              Back to Section 6.2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.2.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Visual Inspection Checklist and Record-Keeping
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              BS 7671 inspection checklists, documentation requirements and record-keeping procedures
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">Quick Reference</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div>
                <p className="font-medium text-white mb-1">In 30 Seconds</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Checklist presence: systematic inspection schedule being used</li>
                  <li>Documentation: findings recorded clearly and immediately</li>
                  <li>Completeness: all items checked off, none missed</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Spot it / Use it</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Spot:</strong> Missing checklists, incomplete records, memory-based inspections</li>
                  <li><strong>Use:</strong> BS 7671 Appendix 6 schedule; clear documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Visual inspections are only effective if they are structured, consistent, and properly recorded. Using a checklist ensures that no item is overlooked, while accurate record-keeping provides evidence of compliance and safety. This process is critical under BS 7671 and the Electricity at Work Regulations (EAWR 1989).
              </p>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Explain the purpose of a visual inspection checklist</li>
              <li>Identify the main items that must be recorded during inspection</li>
              <li>Recognise why documentation is essential for compliance</li>
              <li>Complete inspection records clearly and accurately</li>
              <li>Understand how checklists support later testing and certification</li>
            </ul>
          </section>

          {/* Purpose of a Checklist */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Purpose of a Checklist
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Coverage and Consistency:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Ensures systematic coverage of all inspection items</li>
                  <li>Prevents missed hazards or oversight during inspection</li>
                  <li>Provides consistent approach across different installers</li>
                  <li>Supports training and competency development</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Professional Standards:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Provides structured method for learners and professionals</li>
                  <li>Demonstrates competent inspection practices</li>
                  <li>Enhances credibility with clients and inspectors</li>
                  <li>Facilitates peer review and quality control</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Legal and Compliance Benefits:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Supports BS 7671 inspection requirements</li>
                  <li>Provides evidence of due diligence</li>
                  <li>Facilitates insurance and warranty claims</li>
                  <li>Creates defensible inspection records</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Memory vs. Checklists</p>
                <p className="text-sm">
                  Human memory is unreliable under pressure. Checklists provide systematic coverage regardless of experience level or working conditions.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="checklist-purpose-check"
                question="Why is a checklist important in visual inspections?"
                options={["To save time", "To ensure systematic coverage and prevent missed items", "To reduce costs", "To look professional"]}
                correctIndex={1}
                explanation="Checklists ensure systematic coverage of all inspection items, preventing missed hazards or oversight."
              />
            </div>
          </section>

          {/* Typical Checklist Items */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Typical Checklist Items
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Accessories and Equipment:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Condition of accessories (sockets, switches, outlets)</li>
                  <li>Secure fixing and mounting of equipment</li>
                  <li>Correct IP ratings for environmental conditions</li>
                  <li>Evidence of damage, overheating, or deterioration</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Cables and Containment:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Integrity of cables (insulation, sheathing, support)</li>
                  <li>Correct routing in safe zones and appropriate depths</li>
                  <li>Secure fixings of enclosures and containment systems</li>
                  <li>Protection against mechanical damage</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Safety Systems:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Presence and condition of earthing and bonding</li>
                  <li>RCD/RCBO protection where required</li>
                  <li>Labelling and identification of circuits</li>
                  <li>Emergency stopping and isolation facilities</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">BS 7671 Appendix 6</p>
                <p className="text-sm">
                  Use the model inspection schedule in BS 7671 Appendix 6 as the minimum standard for all visual inspections.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="checklist-items-check"
                question="Give two examples of items that must be included in an inspection checklist."
                options={["Only cable colours", "Condition of accessories and earthing/bonding", "Only device ratings", "Only circuit numbers"]}
                correctIndex={1}
                explanation="Inspection checklists must include condition of accessories, integrity of cables, earthing and bonding, and circuit labelling among other items."
              />
            </div>
          </section>

          {/* Record-Keeping */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Record-Keeping
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Recording Standards:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Findings must be documented in schedules or inspection sheets</li>
                  <li>Records form integral part of EIC or Minor Works Certificate</li>
                  <li>Clear distinction between cosmetic and safety-critical issues</li>
                  <li>Professional language avoiding slang or ambiguous terms</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Compliance Documentation:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Non-compliance clearly flagged for remedial action</li>
                  <li>Cross-reference to relevant BS 7671 regulations</li>
                  <li>Priority levels assigned to different findings</li>
                  <li>Remedial work requirements clearly specified</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Record Management:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Secure storage with test results and certificates</li>
                  <li>Digital backup systems for long-term retention</li>
                  <li>Access controls for confidential client information</li>
                  <li>Handover documentation packages for clients</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Legal Protection</p>
                <p className="text-sm">
                  Proper records provide crucial legal protection. They demonstrate due diligence and professional competence if accidents occur.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="record-keeping-check"
                question="What certificate forms part of inspection and record-keeping for new work?"
                options={["Test Certificate only", "Electrical Installation Certificate (EIC)", "Building Certificate", "Compliance Certificate"]}
                correctIndex={1}
                explanation="The Electrical Installation Certificate (EIC) includes inspection records as an integral component for new installations."
              />
            </div>
          </section>

          {/* Benefits of Record-Keeping */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Benefits of Record-Keeping
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Legal and Insurance Protection:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Provides legal protection if accidents occur</li>
                  <li>Supports insurance claims and liability defences</li>
                  <li>Demonstrates professional competence and due diligence</li>
                  <li>Evidence of compliance with statutory requirements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Operational Benefits:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Supports ongoing maintenance and future inspections</li>
                  <li>Facilitates efficient fault-finding and troubleshooting</li>
                  <li>Enables planned maintenance scheduling</li>
                  <li>Reduces future inspection and testing time</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Client and Business Benefits:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Creates transparent record for clients and inspectors</li>
                  <li>Enhances professional standards and reputation</li>
                  <li>Supports warranty and guarantee provision</li>
                  <li>Facilitates building sales and insurance arrangements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Reputation and Trust</p>
                <p className="text-sm">
                  Comprehensive records demonstrate professionalism and build client trust, leading to repeat business and referrals.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-3">Core Inspection Process:</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Always use the official BS 7671 inspection schedule (Appendix 6)</li>
                  <li>Record observations immediately - don't rely on memory</li>
                  <li>Write in clear, professional language (avoid slang)</li>
                  <li>Mark "satisfactory" or "requires improvement" against each item</li>
                  <li>Store completed records securely with test results and certificates</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow mb-2">Documentation Tools</p>
                <div className="text-sm space-y-1">
                  <p><strong>BS 7671 Forms:</strong> Standard forms and schedules for consistency</p>
                  <p><strong>Digital Tablets:</strong> Immediate electronic recording on site</p>
                  <p><strong>Camera:</strong> Photographic evidence of defects</p>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="font-medium text-red-400 mb-3">Warehouse Bonding Incident</p>
              <p className="text-sm text-white/80 mb-3">
                On a warehouse project, an inspector relied on memory instead of a checklist. They missed checking bonding to exposed structural steelwork. Weeks later, during fault conditions, the lack of bonding caused a dangerous potential difference across metalwork.
              </p>
              <p className="text-sm font-medium text-white">
                Key Learning: Memory-based inspections create unacceptable safety risks. Systematic checklists and documentation prevent potentially fatal oversights.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Q: Can I make my own inspection checklist?</p>
                <p className="text-sm text-white/80">A: Yes, but it must align with BS 7671's Appendix 6 requirements and cover all mandatory inspection items.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Q: What if I spot a minor cosmetic issue?</p>
                <p className="text-sm text-white/80">A: Record only issues that affect safety or compliance. Cosmetic defects that don't impact safety shouldn't be documented.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white mb-2">Q: Do inspection records need to be kept after handover?</p>
                <p className="text-sm text-white/80">A: Yes - they form part of the installation's permanent documentation and must be retained for legal and maintenance purposes.</p>
              </div>
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Pocket Guide - Inspection & Records
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400">✓</span>
                <span>Use BS 7671 checklist (Appendix 6)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400">✓</span>
                <span>Inspect condition, routing, earthing, and labelling</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400">✓</span>
                <span>Record findings clearly and immediately</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400">✓</span>
                <span>Flag safety-critical defects for action</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-green-400">✓</span>
                <span>Store records with certificates</span>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Section 6.2.6 Knowledge Check" />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../2-5">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Circuit Labelling
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Back to Section 6.2
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section2_6;
