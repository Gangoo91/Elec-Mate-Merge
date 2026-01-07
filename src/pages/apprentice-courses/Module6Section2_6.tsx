import { ArrowLeft, ClipboardCheck, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section2_6 = () => {
  useSEO(
    "Visual Inspection Checklist and Record-Keeping - Level 2 Electrical Installation",
    "BS 7671 inspection checklists, documentation requirements and record-keeping procedures"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of a visual inspection checklist?",
      options: [
        "To reduce inspection time",
        "To ensure all items are systematically checked",
        "To impress clients",
        "To reduce costs"
      ],
      correctAnswer: 1,
      explanation: "The main purpose is to ensure systematic coverage of all inspection items without oversight."
    },
    {
      id: 2,
      question: "Which appendix in BS 7671 contains the model inspection schedule?",
      options: [
        "Appendix 4",
        "Appendix 5",
        "Appendix 6",
        "Appendix 7"
      ],
      correctAnswer: 2,
      explanation: "Appendix 6 of BS 7671 contains the model forms for inspection and testing."
    },
    {
      id: 3,
      question: "Name two items that should be included in an inspection checklist.",
      options: [
        "Only cable colours",
        "Condition of accessories and earthing/bonding",
        "Only switch positions",
        "Only circuit numbers"
      ],
      correctAnswer: 1,
      explanation: "Inspection checklists must include condition of accessories, earthing and bonding, circuit labelling, cable routing, and IP ratings."
    },
    {
      id: 4,
      question: "True or False: Relying on memory is acceptable for visual inspections.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False — visual inspections must be systematic and documented. Memory is unreliable and provides no audit trail."
    },
    {
      id: 5,
      question: "Which certificates include inspection records?",
      options: [
        "Only test certificates",
        "Electrical Installation Certificate (EIC) and Minor Works Certificate",
        "Only compliance certificates",
        "Building control certificates"
      ],
      correctAnswer: 1,
      explanation: "Both EIC and Minor Works Certificates include inspection records as integral components."
    },
    {
      id: 6,
      question: "Why should cosmetic defects not always be recorded?",
      options: [
        "They are not important",
        "Only safety or compliance issues must be documented",
        "To save time",
        "To reduce paperwork"
      ],
      correctAnswer: 1,
      explanation: "Inspection records should focus on safety-critical and compliance issues, not purely cosmetic defects."
    },
    {
      id: 7,
      question: "What should be done if a safety-critical issue is found?",
      options: [
        "Ignore it if minor",
        "Record it clearly and arrange remedial action before energising",
        "Note it for later",
        "Let the client decide"
      ],
      correctAnswer: 1,
      explanation: "Safety-critical issues must be recorded clearly and remediated before the installation is energised."
    },
    {
      id: 8,
      question: "Give one benefit of proper inspection record-keeping.",
      options: [
        "Faster installations",
        "Legal protection and supports maintenance",
        "Lower material costs",
        "Reduced testing time"
      ],
      correctAnswer: 1,
      explanation: "Proper records provide legal protection, support ongoing maintenance, and build client trust."
    },
    {
      id: 9,
      question: "In the real-world example, what was missed due to lack of a checklist?",
      options: [
        "Cable labelling",
        "Bonding to exposed structural steelwork",
        "RCD testing",
        "Circuit numbering"
      ],
      correctAnswer: 1,
      explanation: "The inspector missed checking bonding to exposed structural steelwork, creating a dangerous potential difference."
    },
    {
      id: 10,
      question: "How should completed inspection records be stored?",
      options: [
        "In the office only",
        "Securely with certificates and test results",
        "On the client's desk",
        "In the van"
      ],
      correctAnswer: 1,
      explanation: "Inspection records must be stored securely with test results and certificates as permanent documentation."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.2.6
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Visual Inspection Checklist and Record-Keeping
          </h1>
          <p className="text-white">
            BS 7671 inspection checklists, documentation requirements and record-keeping procedures
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Checklist presence: systematic inspection schedule being used</li>
                <li>Documentation: findings recorded clearly and immediately</li>
                <li>Completeness: all items checked off, none missed</li>
                <li>Professional records: clear language, proper format</li>
                <li>Safety flags: critical issues highlighted for action</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Missing checklists, incomplete records, illegible notes, memory-based inspections</li>
                <li><strong>Use:</strong> BS 7671 Appendix 6 schedule; clear documentation; immediate recording</li>
                <li><strong>Check:</strong> All items covered; safety issues flagged; records stored securely</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Visual inspections are only effective if they are structured, consistent, and properly recorded. Using a checklist ensures that no item is overlooked, while accurate record-keeping provides evidence of compliance and safety. This process is critical under BS 7671 and the Electricity at Work Regulations (EAWR 1989).
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain the purpose of a visual inspection checklist.</li>
            <li>Identify the main items that must be recorded during inspection.</li>
            <li>Recognise why documentation is essential for compliance.</li>
            <li>Complete inspection records clearly and accurately.</li>
            <li>Understand how checklists support later testing and certification.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Purpose of a Checklist */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. Purpose of a Checklist</h3>
            <p className="text-base text-white mb-4">
              Inspection checklists provide a systematic framework ensuring comprehensive coverage of all safety and compliance requirements during visual inspection.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-3">Systematic Inspection Benefits</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Coverage and Consistency:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Ensures systematic coverage of all inspection items</li>
                          <li>Prevents missed hazards or oversight during inspection</li>
                          <li>Provides consistent approach across different installers</li>
                          <li>Supports training and competency development</li>
                          <li>Creates audit trail for quality assurance</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Professional Standards:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Provides structured method for learners and professionals</li>
                          <li>Demonstrates competent inspection practices</li>
                          <li>Supports continuous professional development</li>
                          <li>Enhances credibility with clients and inspectors</li>
                          <li>Facilitates peer review and quality control</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Legal and Compliance Benefits:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Supports BS 7671 inspection requirements</li>
                          <li>Provides evidence of due diligence</li>
                          <li>Facilitates insurance and warranty claims</li>
                          <li>Supports regulatory compliance demonstrations</li>
                          <li>Creates defensible inspection records</li>
                        </ul>
                      </div>

                      <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 text-elec-yellow mb-2">Memory vs. Checklists</p>
                        <p className="text-xs sm:text-sm text-white">
                          Human memory is unreliable under pressure. Checklists provide systematic coverage regardless of experience level or working conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="checklist-purpose-check"
            question="Why is a checklist important in visual inspections?"
            options={["To save time", "To ensure systematic coverage and prevent missed items", "To reduce costs", "To look professional"]}
            correctIndex={1}
            explanation="Checklists ensure systematic coverage of all inspection items, preventing missed hazards or oversight."
          />
          <Separator className="my-6" />

          {/* 2. Typical Checklist Items */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Typical Checklist Items</h3>
            <p className="text-base text-white mb-4">
              Inspection checklists must comprehensively cover all visual aspects of electrical installations as specified in BS 7671 Appendix 6.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-3">Essential Inspection Items</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Accessories and Equipment:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Condition of accessories (sockets, switches, outlets)</li>
                          <li>Secure fixing and mounting of equipment</li>
                          <li>Correct IP ratings for environmental conditions</li>
                          <li>Evidence of damage, overheating, or deterioration</li>
                          <li>Appropriate certification markings and compliance</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Cables and Containment:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Integrity of cables (insulation, sheathing, support)</li>
                          <li>Correct routing in safe zones and appropriate depths</li>
                          <li>Secure fixings of enclosures and containment systems</li>
                          <li>Protection against mechanical damage</li>
                          <li>Appropriate cable selection for installation method</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Safety Systems:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Presence and condition of earthing and bonding</li>
                          <li>RCD/RCBO protection where required</li>
                          <li>Labelling and identification of circuits</li>
                          <li>Emergency stopping and isolation facilities</li>
                          <li>Warning notices and safety signs</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 text-elec-yellow mb-2">BS 7671 Appendix 6</p>
                        <p className="text-xs sm:text-sm text-white">
                          Use the model inspection schedule in BS 7671 Appendix 6 as the minimum standard for all visual inspections.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="checklist-items-check"
            question="Give two examples of items that must be included in an inspection checklist."
            options={["Only cable colours", "Condition of accessories and earthing/bonding", "Only device ratings", "Only circuit numbers"]}
            correctIndex={1}
            explanation="Inspection checklists must include condition of accessories, integrity of cables, earthing and bonding, and circuit labelling among other items."
          />
          <Separator className="my-6" />

          {/* 3. Record-Keeping */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Record-Keeping</h3>
            <p className="text-base text-white mb-4">
              Comprehensive documentation of inspection findings provides legal protection, supports compliance, and facilitates future maintenance activities.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Documentation Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Recording Standards:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Findings must be documented in schedules or inspection sheets</li>
                          <li>Records form integral part of EIC or Minor Works Certificate</li>
                          <li>Clear distinction between cosmetic and safety-critical issues</li>
                          <li>Professional language avoiding slang or ambiguous terms</li>
                          <li>Immediate documentation preventing memory-based errors</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Compliance Documentation:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Non-compliance clearly flagged for remedial action</li>
                          <li>Cross-reference to relevant BS 7671 regulations</li>
                          <li>Priority levels assigned to different findings</li>
                          <li>Remedial work requirements clearly specified</li>
                          <li>Follow-up inspection schedules where necessary</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Record Management:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Secure storage with test results and certificates</li>
                          <li>Digital backup systems for long-term retention</li>
                          <li>Access controls for confidential client information</li>
                          <li>Version control for revised or updated records</li>
                          <li>Handover documentation packages for clients</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Legal Protection</p>
                        <p className="text-xs sm:text-sm text-white">
                          Proper records provide crucial legal protection. They demonstrate due diligence and professional competence if accidents occur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="record-keeping-check"
            question="What certificate forms part of inspection and record-keeping for new work?"
            options={["Test Certificate only", "Electrical Installation Certificate (EIC)", "Building Certificate", "Compliance Certificate"]}
            correctIndex={1}
            explanation="The Electrical Installation Certificate (EIC) includes inspection records as an integral component for new installations."
          />
          <Separator className="my-6" />

          {/* 4. Benefits of Record-Keeping */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Benefits of Record-Keeping</h3>
            <p className="text-base text-white mb-4">
              Systematic record-keeping provides multiple benefits beyond basic compliance, supporting professional practice and risk management.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-3">Professional and Legal Benefits</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Legal and Insurance Protection:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Provides legal protection if accidents occur</li>
                          <li>Supports insurance claims and liability defences</li>
                          <li>Demonstrates professional competence and due diligence</li>
                          <li>Evidence of compliance with statutory requirements</li>
                          <li>Protection against negligence claims</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Operational Benefits:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Supports ongoing maintenance and future inspections</li>
                          <li>Facilitates efficient fault-finding and troubleshooting</li>
                          <li>Enables planned maintenance scheduling</li>
                          <li>Supports system modifications and extensions</li>
                          <li>Reduces future inspection and testing time</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Client and Business Benefits:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Creates transparent record for clients and inspectors</li>
                          <li>Enhances professional standards and reputation</li>
                          <li>Supports warranty and guarantee provision</li>
                          <li>Facilitates building sales and insurance arrangements</li>
                          <li>Demonstrates value-added professional service</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 text-elec-yellow mb-2">Reputation and Trust</p>
                        <p className="text-xs sm:text-sm text-white">
                          Comprehensive records demonstrate professionalism and build client trust, leading to repeat business and referrals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Core Inspection Process</h3>
              <ul className="list-disc pl-6 space-y-2 text-base text-white">
                <li>Always use the official BS 7671 inspection schedule (Appendix 6)</li>
                <li>Record observations immediately — don't rely on memory</li>
                <li>Write in clear, professional language (avoid slang)</li>
                <li>Mark "satisfactory" or "requires improvement" against each checklist item</li>
                <li>Store completed inspection records securely with test results and certificates</li>
              </ul>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-3">Tools & Techniques</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">Documentation Tools:</p>
                  <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                    <li>BS 7671 standard forms and schedules</li>
                    <li>Digital tablets for immediate electronic recording</li>
                    <li>Waterproof clipboards for site conditions</li>
                    <li>High-quality pens resistant to environmental conditions</li>
                    <li>Camera for photographic evidence of defects</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Recording Techniques:</p>
                  <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                    <li>Sequential inspection following logical building layout</li>
                    <li>Colour-coded marking systems for different finding types</li>
                    <li>Cross-referencing to circuit schedules and drawings</li>
                    <li>Priority ranking for remedial actions required</li>
                    <li>Digital backup and cloud storage systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-3">Quality Assurance & Maintenance</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">Quality Control:</p>
                  <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                    <li>Peer review of inspection records before submission</li>
                    <li>Cross-check against test results and certificates</li>
                    <li>Client review meetings to discuss findings</li>
                    <li>Follow-up inspections to verify remedial work</li>
                    <li>Continuous improvement of inspection procedures</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Record Maintenance:</p>
                  <ul className="text-xs sm:text-sm text-white list-disc pl-4 space-y-1">
                    <li>Regular backup and archive procedures</li>
                    <li>Version control for updated or revised records</li>
                    <li>Secure storage with controlled access</li>
                    <li>Integration with project management systems</li>
                    <li>Long-term retention schedules for compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
            <p className="text-base text-white mb-4">
              On a warehouse project, an inspector relied on memory instead of a checklist. They missed checking bonding to exposed structural steelwork. Weeks later, during fault conditions, the lack of bonding caused a dangerous potential difference across metalwork. This highlighted the importance of systematic checklists and proper record-keeping.
            </p>
            <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/40 rounded border-l-4 border-l-amber-500">
              <p className="font-medium text-amber-800 dark:text-white mb-1">Key Learning Point</p>
              <p className="text-xs sm:text-sm text-white">
                Memory-based inspections create unacceptable safety risks. Systematic checklists and documentation prevent potentially fatal oversights.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-l-elec-yellow pl-4">
              <p className="font-medium text-white mb-1">Q: Can I make my own inspection checklist?</p>
              <p className="text-base text-white">A: Yes, but it must align with BS 7671's Appendix 6 requirements and cover all mandatory inspection items.</p>
            </div>
            <div className="border-l-4 border-l-elec-yellow pl-4">
              <p className="font-medium text-white mb-1">Q: What if I spot a minor cosmetic issue (e.g., scratched faceplate)?</p>
              <p className="text-base text-white">A: Record only issues that affect safety or compliance. Cosmetic defects that don't impact safety shouldn't be documented.</p>
            </div>
            <div className="border-l-4 border-l-elec-yellow pl-4">
              <p className="font-medium text-white mb-1">Q: Do inspection records need to be kept after handover?</p>
              <p className="text-base text-white">A: Yes — they form part of the installation's permanent documentation and must be retained for legal and maintenance purposes.</p>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-elec-yellow/10 via-elec-yellow/5 to-transparent border border-elec-yellow/30">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide – Inspection & Records</h2>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-base text-white">Use BS 7671 checklist (Appendix 6).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-base text-white">Inspect condition, routing, earthing, and labelling.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-base text-white">Record findings clearly and immediately.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-base text-white">Flag safety-critical defects for action.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-base text-white">Store records with certificates.</span>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6">Recap</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center p-4 rounded-lg bg-elec-yellow/5 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
              <Shield className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
              <p className="font-medium text-blue-700 text-elec-yellow mb-1">Systematic Coverage</p>
              <p className="text-xs text-white">Checklists ensure all items inspected</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
              <ClipboardCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-purple-700 text-elec-yellow mb-1">BS 7671 Compliance</p>
              <p className="text-xs text-white">Appendix 6 inspection standards</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-green-700 dark:text-green-300 mb-1">Documentation</p>
              <p className="text-xs text-white">Clear, immediate record-keeping</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700">
              <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="font-medium text-orange-700 text-elec-yellow mb-1">Legal Protection</p>
              <p className="text-xs text-white">Professional due diligence</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700">
              <AlertTriangle className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="font-medium text-indigo-700 dark:text-indigo-300 mb-1">Safety Focus</p>
              <p className="text-xs text-white">Critical issues flagged</p>
            </div>
          </div>
          <p className="text-base text-white mt-6">
            Visual inspection checklists ensure nothing is overlooked, while record-keeping provides evidence of compliance and safety. Together, they ensure professional standards, protect against legal risks, and support future maintenance.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz questions={quizQuestions} title="Section 6.2.6 Knowledge Check" />
        </Card>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="text-white hover:text-white w-full sm:w-auto" asChild>
            <Link to="../2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Subsection 5
            </Link>
          </Button>
          <Button variant="outline" className="text-white hover:text-white w-full sm:w-auto" asChild>
            <Link to="..">
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section2_6;
