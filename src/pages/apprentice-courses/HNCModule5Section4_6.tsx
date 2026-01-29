import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Defects and Snagging - HNC Module 5 Section 4.6";
const DESCRIPTION = "Master defect identification and snagging procedures for building services: walkthrough protocols, defect categorisation (A/B/C), tracking systems, rectification management, and close-out documentation.";

const quickCheckQuestions = [
  {
    id: "snagging-definition",
    question: "What is the primary purpose of a snagging walkthrough?",
    options: ["To delay practical completion", "To identify incomplete or defective work before handover", "To increase the final account value", "To extend the construction programme"],
    correctIndex: 1,
    explanation: "A snagging walkthrough systematically identifies incomplete, damaged, or defective work that must be rectified before the client takes possession. It protects both parties by documenting the installation's condition at handover."
  },
  {
    id: "category-a-defect",
    question: "A Category A defect typically requires:",
    options: ["Rectification within 28 days", "Immediate attention before occupation", "Monitoring only", "Rectification during the defects liability period"],
    correctIndex: 1,
    explanation: "Category A defects are critical issues affecting safety, security, or essential building function. They must be rectified before practical completion or occupation is permitted."
  },
  {
    id: "dlp-duration",
    question: "What is the typical defects liability period for building services installations?",
    options: ["6 months", "12 months", "24 months", "36 months"],
    correctIndex: 1,
    explanation: "The standard defects liability period (also called rectification period) is 12 months from practical completion, allowing one full seasonal cycle to identify any latent defects."
  },
  {
    id: "snag-responsibility",
    question: "Who typically leads the snagging walkthrough on a building services project?",
    options: ["The client's representative only", "The main contractor's site manager", "The M&E subcontractor's project manager", "A joint team including client, contractor, and M&E representatives"],
    correctIndex: 3,
    explanation: "Snagging walkthroughs are most effective when conducted jointly, with representatives from the client, main contractor, and M&E subcontractor. This ensures all parties agree on defect identification and reduces disputes."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What distinguishes a defect from a variation in building services work?",
    options: [
      "Defects cost more to rectify",
      "Defects are work not complying with specification; variations are authorised changes",
      "Variations are discovered after handover",
      "Defects are always safety-related"
    ],
    correctAnswer: 1,
    explanation: "A defect is work that fails to meet the contract specification or quality standards. A variation is an authorised change to the original scope. Defects are rectified at the contractor's cost; variations may incur additional charges."
  },
  {
    id: 2,
    question: "Which category would a non-functioning emergency lighting fitting be classified as?",
    options: ["Category A - Critical", "Category B - Major", "Category C - Minor", "Not classified as a defect"],
    correctAnswer: 0,
    explanation: "Non-functioning emergency lighting is a Category A (Critical) defect as it directly affects life safety. It must be rectified immediately before the building can be occupied."
  },
  {
    id: 3,
    question: "A snagging list should include all of the following EXCEPT:",
    options: ["Unique reference number for each item", "Precise location of defect", "Estimated rectification cost", "Clear description of the defect"],
    correctAnswer: 2,
    explanation: "Snagging lists document defect reference, location, description, category, responsible party, and target rectification date. Costing is not typically included as defects are rectified at the contractor's cost."
  },
  {
    id: 4,
    question: "What percentage of defects typically originate from design issues rather than installation?",
    options: ["5-10%", "20-30%", "40-50%", "70-80%"],
    correctAnswer: 1,
    explanation: "Industry studies indicate approximately 20-30% of defects originate from design errors or omissions rather than poor workmanship. Robust design review processes help reduce this proportion."
  },
  {
    id: 5,
    question: "When should the first snagging walkthrough typically occur?",
    options: [
      "At practical completion",
      "2-4 weeks before anticipated practical completion",
      "6 months after handover",
      "Only when requested by the client"
    ],
    correctAnswer: 1,
    explanation: "Initial snagging should occur 2-4 weeks before anticipated practical completion, allowing time for rectification before handover. Leaving it until practical completion causes delays and disputes."
  },
  {
    id: 6,
    question: "Which software feature is most critical in a defect tracking system?",
    options: [
      "3D visualisation",
      "Unique defect numbering and audit trail",
      "Automatic cost calculation",
      "Social media integration"
    ],
    correctAnswer: 1,
    explanation: "Unique defect numbering ensures traceability, while a complete audit trail records all status changes, responsibilities, and communications. This provides essential evidence if disputes arise."
  },
  {
    id: 7,
    question: "A latent defect is one that:",
    options: [
      "Is immediately visible during snagging",
      "Is not discoverable through reasonable inspection at handover",
      "Only occurs in mechanical services",
      "Cannot be rectified"
    ],
    correctAnswer: 1,
    explanation: "Latent defects are hidden issues not discoverable through reasonable inspection at handover. They may only become apparent during operation, which is why defects liability periods exist."
  },
  {
    id: 8,
    question: "What document formally closes out a defect after rectification?",
    options: [
      "Variation order",
      "Snagging list",
      "Defect sign-off certificate or close-out report",
      "Practical completion certificate"
    ],
    correctAnswer: 2,
    explanation: "A defect sign-off certificate or close-out report formally confirms rectification is complete and accepted. It should be signed by the inspecting party and filed for audit purposes."
  },
  {
    id: 9,
    question: "During the defects liability period, the contractor must:",
    options: [
      "Remain on site full-time",
      "Return to rectify defects notified by the client at no additional cost",
      "Pay the client damages for any defects found",
      "Replace all installed equipment"
    ],
    correctAnswer: 1,
    explanation: "During the DLP, the contractor is obligated to return and rectify any defects notified by the client at no additional cost, provided the defects relate to original workmanship or materials, not misuse or wear."
  },
  {
    id: 10,
    question: "Which is the correct sequence for defect management?",
    options: [
      "Identify, Categorise, Assign, Track, Rectify, Verify, Close",
      "Rectify, Identify, Track, Close",
      "Assign, Categorise, Identify, Rectify",
      "Track, Identify, Categorise, Assign"
    ],
    correctAnswer: 0,
    explanation: "The systematic defect management process follows: Identify (find the defect), Categorise (A/B/C), Assign (allocate responsibility), Track (monitor progress), Rectify (complete work), Verify (inspect), Close (formal sign-off)."
  },
  {
    id: 11,
    question: "Photographic evidence in snagging should include:",
    options: [
      "Only the defect itself",
      "The defect, its location context, and any reference markers",
      "The contractor's staff",
      "Equipment serial numbers only"
    ],
    correctAnswer: 1,
    explanation: "Effective photographic evidence includes the defect in detail, wider context showing its location, and reference markers (room numbers, drawings) to enable anyone to locate and verify the issue."
  },
  {
    id: 12,
    question: "What is the Making Good Defects Certificate?",
    options: [
      "A certificate issued at practical completion",
      "A certificate confirming all DLP defects have been satisfactorily rectified",
      "A warranty document from equipment manufacturers",
      "An insurance certificate"
    ],
    correctAnswer: 1,
    explanation: "The Making Good Defects Certificate (or Final Certificate under some contracts) confirms that all defects notified during the defects liability period have been satisfactorily rectified, triggering final payment release."
  }
];

const faqs = [
  {
    question: "What is the difference between snagging and defects liability?",
    answer: "Snagging is the process of identifying incomplete or defective work before or at practical completion. The defects liability period (typically 12 months) follows practical completion, during which the contractor must return to rectify any defects that emerge during normal operation. Snagging aims to achieve a clean handover; DLP catches issues that only become apparent over time."
  },
  {
    question: "Can the client withhold payment for snags?",
    answer: "Yes, under most standard contracts the client can retain a percentage (typically 2.5-5%) of the contract sum until defects are rectified. This retention provides leverage to ensure the contractor returns to complete snagging items. Half is typically released at practical completion, the remainder after the defects liability period."
  },
  {
    question: "How should I handle disputed snags?",
    answer: "Document thoroughly with photographs, specification references, and manufacturer's installation requirements. Refer to the contract specification and drawings as the benchmark. If agreement cannot be reached, most contracts provide for the Contract Administrator to make a binding determination. Avoid verbal agreements - always confirm disputed items in writing."
  },
  {
    question: "What happens if defects are not rectified within the agreed timeframe?",
    answer: "If the contractor fails to rectify defects within reasonable timeframes, the client can: (1) issue a formal notice requiring action, (2) employ others to carry out the work and recover costs from retention or final payment, (3) pursue contractual remedies including liquidated damages where applicable. Early escalation and clear communication usually resolve issues before these steps are needed."
  },
  {
    question: "Should M&E subcontractors conduct their own snagging before the main contractor's inspection?",
    answer: "Absolutely. Pre-inspection snagging by the M&E subcontractor demonstrates professionalism, reduces the formal snag list length, and avoids embarrassment. Supervisors should walk their work weekly in the final weeks, progressively closing out issues before the formal inspection."
  },
  {
    question: "How long should snagging records be retained?",
    answer: "Snagging and defect records should be retained for at least 12 years (the limitation period for contracts under seal) or 6 years (simple contracts). Many organisations retain them longer for latent defect claims. Digital systems make long-term storage practical and support Building Safety Act compliance."
  }
];

const HNCModule5Section4_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Defects and Snagging
          </h1>
          <p className="text-white/80">
            Defect identification, snagging procedures, tracking systems, rectification management and close-out documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Snagging:</strong> Systematic identification of incomplete/defective work</li>
              <li className="pl-1"><strong>Categories:</strong> A (Critical), B (Major), C (Minor)</li>
              <li className="pl-1"><strong>DLP:</strong> Typically 12 months post-practical completion</li>
              <li className="pl-1"><strong>Close-out:</strong> Formal sign-off and documentation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Electrical:</strong> Labelling, testing, terminations, containment</li>
              <li className="pl-1"><strong>Mechanical:</strong> Commissioning values, insulation, brackets</li>
              <li className="pl-1"><strong>Controls:</strong> BMS points, sensor calibration, graphics</li>
              <li className="pl-1"><strong>Coordination:</strong> Clashes, access, maintainability</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Plan and conduct effective snagging walkthroughs",
              "Categorise defects using industry-standard A/B/C classification",
              "Implement defect tracking systems and software",
              "Manage rectification timeframes and responsibilities",
              "Complete formal close-out documentation",
              "Understand defects liability period obligations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Snagging Walkthrough Procedures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Snagging Walkthrough Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Snagging is the systematic process of identifying work that is incomplete, damaged, or does not
              comply with the contract specification. Effective snagging protects all parties by creating a
              clear record of the installation's condition at handover.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Walkthrough timing:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pre-snagging (internal):</strong> 4-6 weeks before PC - contractor's own QA inspection</li>
                <li className="pl-1"><strong>Initial snagging:</strong> 2-4 weeks before PC - joint walkthrough with client</li>
                <li className="pl-1"><strong>Pre-completion snagging:</strong> 1 week before PC - verify rectification</li>
                <li className="pl-1"><strong>Practical completion:</strong> Final inspection and handover</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Walkthrough Protocol</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Participants</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Preparation</td>
                      <td className="border border-white/10 px-3 py-2">Review drawings, specifications, O&M requirements</td>
                      <td className="border border-white/10 px-3 py-2">M&E supervisor, QA manager</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Walkthrough</td>
                      <td className="border border-white/10 px-3 py-2">Systematic inspection room-by-room or system-by-system</td>
                      <td className="border border-white/10 px-3 py-2">Client, contractor, M&E subcontractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Recording</td>
                      <td className="border border-white/10 px-3 py-2">Document defects with photos, location, description</td>
                      <td className="border border-white/10 px-3 py-2">Designated recorder (tablet/app)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Review</td>
                      <td className="border border-white/10 px-3 py-2">Agree categorisation, responsibilities, timeframes</td>
                      <td className="border border-white/10 px-3 py-2">All parties together</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution</td>
                      <td className="border border-white/10 px-3 py-2">Issue formal snagging list within 24-48 hours</td>
                      <td className="border border-white/10 px-3 py-2">QA manager or contract administrator</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Inspection Checklist</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Electrical</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Distribution board labelling complete</li>
                    <li className="pl-1">Circuit identification schedules fitted</li>
                    <li className="pl-1">Test certificates available</li>
                    <li className="pl-1">Containment lids and covers in place</li>
                    <li className="pl-1">Fire stopping around penetrations</li>
                    <li className="pl-1">Emergency lighting functional</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Mechanical</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Valves labelled and accessible</li>
                    <li className="pl-1">Insulation complete and tagged</li>
                    <li className="pl-1">Brackets and supports painted</li>
                    <li className="pl-1">Commissioning values achieved</li>
                    <li className="pl-1">Grilles and diffusers clean</li>
                    <li className="pl-1">Access panels identified</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Conduct walkthroughs in consistent lighting conditions. Bring a torch for ceiling voids and risers.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Defect Categorisation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Defect Categorisation (A/B/C)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Categorising defects ensures critical issues are addressed first and resources are allocated
              appropriately. The A/B/C system is widely used across the UK construction industry.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium text-red-400 mb-2">Category A - Critical</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Affects safety or security</li>
                  <li className="pl-1">Prevents building operation</li>
                  <li className="pl-1">Must rectify before occupation</li>
                  <li className="pl-1">Timeframe: Immediate</li>
                </ul>
                <p className="text-xs text-white/60 mt-2 italic">Example: Non-functional emergency lighting, exposed live conductors</p>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="text-sm font-medium text-amber-400 mb-2">Category B - Major</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Affects function or quality</li>
                  <li className="pl-1">Does not prevent occupation</li>
                  <li className="pl-1">Should rectify promptly</li>
                  <li className="pl-1">Timeframe: Within 14 days</li>
                </ul>
                <p className="text-xs text-white/60 mt-2 italic">Example: BMS point not commissioned, incorrect valve setting</p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <p className="text-sm font-medium text-blue-400 mb-2">Category C - Minor</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cosmetic or minor incomplete</li>
                  <li className="pl-1">Does not affect function</li>
                  <li className="pl-1">Rectify within DLP</li>
                  <li className="pl-1">Timeframe: Within 28 days</li>
                </ul>
                <p className="text-xs text-white/60 mt-2 italic">Example: Missing cable label, minor paintwork damage</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Defect Examples by Category</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cat A (Critical)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cat B (Major)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cat C (Minor)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical</td>
                      <td className="border border-white/10 px-3 py-2">Fire alarm fault, RCD not tripping</td>
                      <td className="border border-white/10 px-3 py-2">Missing test certs, incorrect glands</td>
                      <td className="border border-white/10 px-3 py-2">Cable ties untrimmed, minor labelling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mechanical</td>
                      <td className="border border-white/10 px-3 py-2">No heating/cooling, water leak</td>
                      <td className="border border-white/10 px-3 py-2">Flow rates incorrect, noise issues</td>
                      <td className="border border-white/10 px-3 py-2">Valve tag missing, insulation damage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire Systems</td>
                      <td className="border border-white/10 px-3 py-2">Detector not responding, damper stuck</td>
                      <td className="border border-white/10 px-3 py-2">Cause and effect incomplete</td>
                      <td className="border border-white/10 px-3 py-2">Device address label faded</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Controls/BMS</td>
                      <td className="border border-white/10 px-3 py-2">Critical alarm not reporting</td>
                      <td className="border border-white/10 px-3 py-2">Setpoint incorrect, trend not logging</td>
                      <td className="border border-white/10 px-3 py-2">Graphic text error, icon colour wrong</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Category boundaries should be agreed at project start. What is critical for a hospital may be minor for a warehouse.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Tracking Systems and Rectification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Tracking Systems and Rectification Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern defect tracking systems replace paper-based snagging lists, providing real-time
              visibility, automatic notifications, and comprehensive audit trails essential for
              project close-out and potential dispute resolution.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Snagging Software</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Snagstream</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Mobile app with offline capability</li>
                    <li>Photo/video attachment</li>
                    <li>Drawing mark-up</li>
                    <li>Automatic contractor notifications</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Procore / Aconex / Viewpoint</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Integrated project management</li>
                    <li>Workflow automation</li>
                    <li>Dashboard reporting</li>
                    <li>Document linking (specs, drawings)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Defect Tracking Workflow</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Status</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open</td>
                      <td className="border border-white/10 px-3 py-2">Defect raised, awaiting assignment</td>
                      <td className="border border-white/10 px-3 py-2">Contract administrator</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Assigned</td>
                      <td className="border border-white/10 px-3 py-2">Allocated to responsible party</td>
                      <td className="border border-white/10 px-3 py-2">Main contractor / subcontractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">In Progress</td>
                      <td className="border border-white/10 px-3 py-2">Rectification work underway</td>
                      <td className="border border-white/10 px-3 py-2">Subcontractor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ready for Inspection</td>
                      <td className="border border-white/10 px-3 py-2">Work complete, awaiting sign-off</td>
                      <td className="border border-white/10 px-3 py-2">Client / CA to inspect</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Closed</td>
                      <td className="border border-white/10 px-3 py-2">Verified and formally accepted</td>
                      <td className="border border-white/10 px-3 py-2">Contract administrator</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rejected</td>
                      <td className="border border-white/10 px-3 py-2">Rectification not accepted, returns to Assigned</td>
                      <td className="border border-white/10 px-3 py-2">Subcontractor to redo</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rectification Timeframes (Typical)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Category A:</strong> Immediate / before occupation (0-48 hours)</li>
                <li className="pl-1"><strong>Category B:</strong> Within 14 days of notification</li>
                <li className="pl-1"><strong>Category C:</strong> Within 28 days of notification</li>
                <li className="pl-1"><strong>DLP defects:</strong> Within 28 days unless complex</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Performance Indicators (KPIs)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">KPI</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Measurement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Snag-free areas</td>
                      <td className="border border-white/10 px-3 py-2">&gt;80% at first inspection</td>
                      <td className="border border-white/10 px-3 py-2">Areas passed / areas inspected</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">First-time fix rate</td>
                      <td className="border border-white/10 px-3 py-2">&gt;90%</td>
                      <td className="border border-white/10 px-3 py-2">Closed first attempt / total closed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Average close-out time</td>
                      <td className="border border-white/10 px-3 py-2">&lt;7 days</td>
                      <td className="border border-white/10 px-3 py-2">Days from raised to closed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overdue defects</td>
                      <td className="border border-white/10 px-3 py-2">&lt;5%</td>
                      <td className="border border-white/10 px-3 py-2">Past target date / total open</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Project tip:</strong> Weekly defect status meetings with all parties keeps momentum. Display live dashboard statistics to drive accountability.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Close-out Documentation and DLP */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Close-out Documentation and Defects Liability Period
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Formal close-out documentation provides the audit trail confirming all defects have been
              addressed. The defects liability period extends the contractor's obligations beyond
              practical completion to catch latent issues that emerge during operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Close-out Documentation Package</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Snagging register:</strong> Complete list with all items closed</li>
                <li className="pl-1"><strong>Defect sign-off certificates:</strong> Individual or batch sign-off</li>
                <li className="pl-1"><strong>Photographic evidence:</strong> Before and after rectification</li>
                <li className="pl-1"><strong>Re-test certificates:</strong> Where defects affected tested systems</li>
                <li className="pl-1"><strong>Updated O&M manuals:</strong> Reflecting any changes during rectification</li>
                <li className="pl-1"><strong>Close-out report:</strong> Summary of defect quantities, categories, resolution times</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Defects Liability Period (DLP)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Standard duration:</strong> 12 months from Practical Completion</li>
                <li className="pl-1"><strong>Extended DLP:</strong> Some clients specify 24 months for complex M&E</li>
                <li className="pl-1"><strong>Contractor obligation:</strong> Return to rectify defects notified during period</li>
                <li className="pl-1"><strong>Exclusions:</strong> Damage from misuse, fair wear and tear, third-party interference</li>
                <li className="pl-1"><strong>Retention release:</strong> Final retention released at end of DLP (Making Good certificate)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DLP Management Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Timing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DLP commencement</td>
                      <td className="border border-white/10 px-3 py-2">At Practical Completion</td>
                      <td className="border border-white/10 px-3 py-2">Confirm start date, contact details, reporting procedure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ongoing monitoring</td>
                      <td className="border border-white/10 px-3 py-2">Throughout DLP</td>
                      <td className="border border-white/10 px-3 py-2">Client reports defects, contractor responds</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Seasonal commissioning</td>
                      <td className="border border-white/10 px-3 py-2">6 months post-PC</td>
                      <td className="border border-white/10 px-3 py-2">Verify heating/cooling in opposite season</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pre-DLP expiry inspection</td>
                      <td className="border border-white/10 px-3 py-2">Month 11</td>
                      <td className="border border-white/10 px-3 py-2">Final joint inspection to identify outstanding issues</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Making Good certificate</td>
                      <td className="border border-white/10 px-3 py-2">End of DLP</td>
                      <td className="border border-white/10 px-3 py-2">CA confirms all defects rectified, triggers final retention release</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Latent Defects and Limitation Periods</p>
              <p className="text-sm text-white mb-2">
                Beyond the DLP, contractors may still be liable for latent defects (hidden issues) under:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Contract (simple):</strong> 6 years from breach</li>
                <li className="pl-1"><strong>Contract (under seal/deed):</strong> 12 years from breach</li>
                <li className="pl-1"><strong>Negligence (tort):</strong> 6 years from damage becoming apparent</li>
                <li className="pl-1"><strong>Building Safety Act 2022:</strong> Extended liability for higher-risk buildings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Record retention:</strong> Keep all defect records for at least 12 years for contracts under deed, longer for higher-risk buildings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Defect Categorisation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> During snagging of a new office building, the following electrical issues are found. Categorise each.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>1. Emergency exit sign not illuminated</p>
                <p className="text-red-400">   → Category A (Critical) - Safety system non-functional</p>
                <p className="mt-2">2. Distribution board schedule shows incorrect circuit descriptions</p>
                <p className="text-amber-400">   → Category B (Major) - Affects operation/maintenance</p>
                <p className="mt-2">3. Cable tray lid missing in riser cupboard</p>
                <p className="text-blue-400">   → Category C (Minor) - Does not affect function</p>
                <p className="mt-2">4. Final circuit test certificate not provided</p>
                <p className="text-amber-400">   → Category B (Major) - Compliance documentation missing</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: DLP Timeline</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Practical Completion achieved 15 March 2024. When does the DLP expire and what are key milestones?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Practical Completion: 15 March 2024</p>
                <p>DLP Duration: 12 months (standard)</p>
                <p className="mt-2">Key dates:</p>
                <p>• Seasonal commissioning (summer): September 2024</p>
                <p>• Pre-expiry inspection: February 2025 (Month 11)</p>
                <p>• DLP expiry: <strong>15 March 2025</strong></p>
                <p>• Making Good Certificate issued: March 2025</p>
                <p>• Final retention released: March 2025</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Defect Close-out</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Defect #247 - BMS point for AHU-01 supply fan showing incorrect status. Document the close-out.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Defect Reference:</strong> SNL-247</p>
                <p><strong>Category:</strong> B (Major)</p>
                <p><strong>Location:</strong> Rooftop plant, AHU-01</p>
                <p><strong>Description:</strong> BMS graphic shows supply fan OFF when physically running</p>
                <p><strong>Root cause:</strong> Digital input wired to NC contact instead of NO</p>
                <p className="mt-2"><strong>Rectification:</strong></p>
                <p>• Controls engineer rewired DI to NO contact</p>
                <p>• Tested fan start/stop sequence - status now correct</p>
                <p>• BMS trend verified over 24 hours</p>
                <p className="mt-2"><strong>Evidence:</strong> Photos before/after, trend log extract</p>
                <p><strong>Sign-off:</strong> Inspected by J. Smith (Client FM) - 12/03/2025</p>
                <p className="text-green-400"><strong>Status:</strong> CLOSED</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Snagging Walkthrough Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Bring current drawings, specifications, and O&M requirements</li>
                <li className="pl-1">Use tablet/smartphone with snagging app for efficiency</li>
                <li className="pl-1">Photograph every defect with location context</li>
                <li className="pl-1">Agree categorisation and responsibility on the spot where possible</li>
                <li className="pl-1">Issue formal list within 24-48 hours while memory is fresh</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Standard DLP: <strong>12 months</strong></li>
                <li className="pl-1">Retention typically held: <strong>2.5-5%</strong></li>
                <li className="pl-1">Category A rectification: <strong>Immediate</strong></li>
                <li className="pl-1">Category B rectification: <strong>14 days</strong></li>
                <li className="pl-1">Category C rectification: <strong>28 days</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late snagging</strong> — Start too late, no time for rectification before PC</li>
                <li className="pl-1"><strong>Poor documentation</strong> — Vague descriptions make disputes likely</li>
                <li className="pl-1"><strong>No photographs</strong> — Losing evidence if defect disputed</li>
                <li className="pl-1"><strong>Verbal agreements</strong> — Always confirm in writing</li>
                <li className="pl-1"><strong>Ignoring DLP obligations</strong> — Failing to respond damages reputation and triggers retention withholding</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Defect Categories</p>
                <ul className="space-y-0.5">
                  <li>Cat A - Critical - Safety/security - Immediate</li>
                  <li>Cat B - Major - Function affected - 14 days</li>
                  <li>Cat C - Minor - Cosmetic - 28 days</li>
                  <li>Always agree categories at project start</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Close-out Process</p>
                <ul className="space-y-0.5">
                  <li>Identify → Categorise → Assign → Track</li>
                  <li>Rectify → Verify → Close</li>
                  <li>Photographic evidence essential</li>
                  <li>Formal sign-off for audit trail</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quality Management
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section4_6;
