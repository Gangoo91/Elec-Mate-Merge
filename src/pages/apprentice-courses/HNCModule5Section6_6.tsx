import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Practical Completion - HNC Module 5 Section 6.6";
const DESCRIPTION = "Master practical completion requirements for building services: pre-completion inspections, sectional completion, partial possession, defects liability period, making good defects, and final handover procedures.";

const quickCheckQuestions = [
  {
    id: "practical-completion-def",
    question: "What does practical completion mean in building contracts?",
    options: ["All works 100% finished with no defects", "Works substantially complete and fit for occupation", "Final account agreed and paid", "All snagging completed"],
    correctIndex: 1,
    explanation: "Practical completion means works are substantially complete and the building is fit for occupation/use, even if minor defects remain. It triggers key contractual events including the start of the defects liability period."
  },
  {
    id: "defects-liability-typical",
    question: "What is the typical defects liability period for building services installations?",
    options: ["6 months", "12 months", "24 months", "36 months"],
    correctIndex: 1,
    explanation: "The defects liability period (also called rectification period) is typically 12 months for building services, allowing one full seasonal cycle to identify any operational defects."
  },
  {
    id: "sectional-completion",
    question: "Sectional completion provisions allow:",
    options: ["Work to be completed in random order", "Client to take possession of defined sections before overall completion", "Contractor to delay certain sections indefinitely", "Omission of commissioning on early sections"],
    correctIndex: 1,
    explanation: "Sectional completion allows the client to take possession of defined sections of the works before overall completion, each section having its own completion date and defects liability period."
  },
  {
    id: "o-and-m-manuals",
    question: "Operation and maintenance manuals should be provided:",
    options: ["After the defects liability period", "Only if requested by the client", "At or before practical completion", "Within 6 months of completion"],
    correctIndex: 2,
    explanation: "O&M manuals must be provided at or before practical completion to enable the client/end user to operate and maintain the building services systems safely and effectively."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which document formally certifies that practical completion has been achieved?",
    options: [
      "Completion notice from contractor",
      "Practical completion certificate issued by contract administrator",
      "Building control completion certificate",
      "Client acceptance letter"
    ],
    correctAnswer: 1,
    explanation: "The contract administrator (architect or project manager) issues the practical completion certificate, which triggers contractual consequences including release of retention and start of the defects liability period."
  },
  {
    id: 2,
    question: "What percentage of retention is typically released at practical completion?",
    options: ["25%", "50%", "75%", "100%"],
    correctAnswer: 1,
    explanation: "Half (50%) of the retention is typically released at practical completion, with the remaining 50% held until the end of the defects liability period (often called 'making good defects' certificate)."
  },
  {
    id: 3,
    question: "Which of the following is NOT typically required for practical completion of building services?",
    options: ["Commissioning completion certificates", "O&M manuals", "Final account agreement", "As-built drawings"],
    correctAnswer: 2,
    explanation: "Final account agreement is typically completed after practical completion. Commissioning certificates, O&M manuals, and as-built drawings are required before or at practical completion."
  },
  {
    id: 4,
    question: "Partial possession differs from sectional completion because:",
    options: [
      "Partial possession is not planned from contract start",
      "Sectional completion requires client consent",
      "Partial possession has no contractual effect",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "Sectional completion is planned from contract commencement with defined sections and dates. Partial possession occurs when the client takes early possession of part of the works not originally planned as a section."
  },
  {
    id: 5,
    question: "During the defects liability period, the contractor must:",
    options: [
      "Make good all defects free of charge",
      "Only repair defects if paid extra",
      "Provide 24/7 maintenance cover",
      "Replace any failed equipment with upgrades"
    ],
    correctAnswer: 0,
    explanation: "The contractor must make good any defects that appear during the defects liability period at their own cost, provided the defects arise from materials or workmanship not in accordance with the contract."
  },
  {
    id: 6,
    question: "A 'snagging list' is prepared:",
    options: [
      "At contract commencement",
      "Before practical completion inspection",
      "After practical completion is certified",
      "Only if the client requests it"
    ],
    correctAnswer: 1,
    explanation: "The snagging list (schedule of defects) is prepared during the pre-completion inspection, listing minor defects that must be rectified but do not prevent practical completion being certified."
  },
  {
    id: 7,
    question: "Which building services documentation forms part of the health and safety file?",
    options: [
      "Original tender documents",
      "As-built drawings and maintenance requirements",
      "Contractor payment applications",
      "Design team meeting minutes"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, the health and safety file must contain as-built drawings, maintenance requirements, and information needed for future construction work - essential for building services."
  },
  {
    id: 8,
    question: "If defects are discovered after the defects liability period ends:",
    options: [
      "The contractor has no further liability",
      "Contractor may still be liable under the Limitation Act",
      "The client must claim on their insurance only",
      "Building control must be notified"
    ],
    correctAnswer: 1,
    explanation: "Contractors remain liable for latent defects under the Limitation Act (6 years for simple contracts, 12 years for deeds) even after the defects liability period ends."
  },
  {
    id: 9,
    question: "For building services, seasonal commissioning may require:",
    options: [
      "Completion in summer only",
      "Return visits to commission heating in winter and cooling in summer",
      "Delaying practical completion by 12 months",
      "Third-party commissioning only"
    ],
    correctAnswer: 1,
    explanation: "Building services systems may require seasonal commissioning - returning to commission heating systems in winter conditions and cooling systems in summer conditions - which may extend beyond practical completion."
  },
  {
    id: 10,
    question: "The certificate of making good defects:",
    options: [
      "Is issued at practical completion",
      "Triggers release of remaining retention",
      "Can only be issued after 24 months",
      "Is optional under JCT contracts"
    ],
    correctAnswer: 1,
    explanation: "The certificate of making good defects is issued at the end of the defects liability period when all defects have been rectified, triggering release of the remaining retention money."
  }
];

const faqs = [
  {
    question: "What happens if the contractor disputes that practical completion should be certified?",
    answer: "If the contractor believes works are complete but the contract administrator refuses to certify, the contractor may request inspection or refer the dispute to adjudication. The contract administrator must act fairly and cannot unreasonably withhold the certificate - minor defects that can be included on a snagging list should not prevent certification."
  },
  {
    question: "Can the client use the building before practical completion?",
    answer: "Yes, through partial possession provisions. However, this triggers partial release of retention, starts a proportionate defects liability period for that part, and may complicate insurance arrangements. The contractor's site control is reduced, and the client takes responsibility for the occupied area."
  },
  {
    question: "How should building services defects be recorded during the defects liability period?",
    answer: "Maintain a formal defects register with date reported, description, location, trade responsible, date notified to contractor, agreed rectification date, completion date, and sign-off. Notify defects promptly in writing to ensure they are addressed within the contractual period."
  },
  {
    question: "What if seasonal commissioning cannot be completed before practical completion?",
    answer: "The contract should allow for seasonal commissioning visits during the defects liability period. A provisional commissioning certificate is issued at practical completion with full commissioning completed when seasonal conditions allow. This is common for HVAC systems in the UK where heating cannot be fully commissioned in summer."
  },
  {
    question: "Who is responsible for maintaining building services during the defects liability period?",
    answer: "Generally, the client takes responsibility for maintenance from practical completion (routine servicing, consumables, wear and tear). The contractor remains responsible for making good defects arising from poor workmanship or defective materials, not normal wear and tear or user damage."
  },
  {
    question: "What documentation should an electrical contractor provide at handover?",
    answer: "Electrical installation certificates (EIC), test results, BS 7671 periodic inspection schedules, as-built drawings, equipment data sheets, O&M manuals, warranty certificates, spare parts lists, emergency contact details, and training records for client staff. All should be compiled in the building manual and referenced in the health and safety file."
  }
];

const HNCModule5Section6_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section6">
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
            <span>Module 5.6.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Practical Completion
          </h1>
          <p className="text-white/80">
            Completion requirements, defects liability period, sectional completion and handover procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Practical completion:</strong> Works substantially complete and fit for use</li>
              <li className="pl-1"><strong>Defects liability:</strong> Typically 12 months for building services</li>
              <li className="pl-1"><strong>Key trigger:</strong> Releases 50% retention, starts DLP</li>
              <li className="pl-1"><strong>Documentation:</strong> O&M manuals, as-builts, test certificates</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Commissioning:</strong> Must be complete before handover</li>
              <li className="pl-1"><strong>Seasonal testing:</strong> May extend into DLP</li>
              <li className="pl-1"><strong>Training:</strong> Staff must be trained on systems</li>
              <li className="pl-1"><strong>Warranties:</strong> Start from practical completion</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define practical completion and its contractual significance",
              "Understand defects liability period obligations",
              "Distinguish between sectional completion and partial possession",
              "Apply pre-completion inspection procedures",
              "Identify handover documentation requirements",
              "Manage the making good of defects process"
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

        {/* Section 1: Practical Completion Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Practical Completion Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Practical completion is a pivotal milestone in construction contracts, marking when the works
              are substantially complete and the building is fit for occupation or use. For building services
              contractors, this moment triggers significant contractual and commercial consequences.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of practical completion:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Substantial completion:</strong> Works complete except minor defects</li>
                <li className="pl-1"><strong>Fit for purpose:</strong> Building can be safely occupied and used</li>
                <li className="pl-1"><strong>Not perfection:</strong> Minor snagging items do not prevent certification</li>
                <li className="pl-1"><strong>Contractually defined:</strong> Certificate issued by contract administrator</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contractual Effects of Practical Completion</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Effect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consequence</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Building Services Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Possession transfers</td>
                      <td className="border border-white/10 px-3 py-2">Client takes control of building</td>
                      <td className="border border-white/10 px-3 py-2">Access for defects only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Half retention released</td>
                      <td className="border border-white/10 px-3 py-2">Typically 50% of retention fund</td>
                      <td className="border border-white/10 px-3 py-2">Improves cash flow</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DLP commences</td>
                      <td className="border border-white/10 px-3 py-2">Defects liability period starts</td>
                      <td className="border border-white/10 px-3 py-2">12-month defects obligation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LADs cease</td>
                      <td className="border border-white/10 px-3 py-2">Liquidated damages no longer apply</td>
                      <td className="border border-white/10 px-3 py-2">Financial risk reduces</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insurance responsibility</td>
                      <td className="border border-white/10 px-3 py-2">Client insures the works</td>
                      <td className="border border-white/10 px-3 py-2">Contractor liability changes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Practical completion is a matter of fact, not opinion. The contract administrator must certify when works objectively meet the criteria, not when it is convenient.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Pre-Completion Inspections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pre-Completion Inspections and Snagging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before practical completion can be certified, systematic inspections identify any outstanding
              defects or incomplete works. For building services, these inspections cover installation quality,
              commissioning status, and documentation completeness.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contractor Self-Inspection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Internal quality check before handover</li>
                  <li className="pl-1">Verify all systems commissioned</li>
                  <li className="pl-1">Confirm documentation complete</li>
                  <li className="pl-1">Rectify defects before formal inspection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Formal Pre-Completion Inspection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Contract administrator leads walkthrough</li>
                  <li className="pl-1">Client representative attends</li>
                  <li className="pl-1">Building services engineer inspects systems</li>
                  <li className="pl-1">Snagging list produced</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services Inspection Checklist</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Inspection Items</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Documentation Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical</td>
                      <td className="border border-white/10 px-3 py-2">Distribution boards, accessories, containment</td>
                      <td className="border border-white/10 px-3 py-2">EIC, test results, as-builts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">Plant operation, controls, air balancing</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning certs, BMS log</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm</td>
                      <td className="border border-white/10 px-3 py-2">Detection coverage, sounders, cause and effect</td>
                      <td className="border border-white/10 px-3 py-2">BS 5839 certificate, zone plan</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">Luminaire positions, duration test</td>
                      <td className="border border-white/10 px-3 py-2">BS 5266 certificate, test log</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data/comms</td>
                      <td className="border border-white/10 px-3 py-2">Outlet installation, patch panels</td>
                      <td className="border border-white/10 px-3 py-2">Test results, schedule</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-2">Snagging vs Prevention of Practical Completion</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Snagging items:</strong> Minor defects that do not prevent occupation - can be listed for rectification</li>
                <li className="pl-1"><strong>Preventing items:</strong> Significant defects affecting safety, compliance, or usability - must be completed first</li>
                <li className="pl-1"><strong>Example:</strong> Missing socket outlet cover = snagging; non-functional fire alarm = preventing</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Conduct internal snagging 2-3 weeks before target completion to allow time for rectification before formal inspection.
            </p>
          </div>
        </section>

        {/* Section 3: Sectional and Partial Completion */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sectional Completion and Partial Possession
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Large building projects are often completed in phases, allowing clients to occupy and use
              parts of the building before overall completion. Understanding the distinction between
              sectional completion and partial possession is essential for managing contractual obligations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sectional Completion vs Partial Possession</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Sectional Completion</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Partial Possession</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Planning</td>
                      <td className="border border-white/10 px-3 py-2">Defined in contract from start</td>
                      <td className="border border-white/10 px-3 py-2">Arises during construction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Completion dates</td>
                      <td className="border border-white/10 px-3 py-2">Each section has defined date</td>
                      <td className="border border-white/10 px-3 py-2">No pre-defined dates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LADs</td>
                      <td className="border border-white/10 px-3 py-2">Apply to each section separately</td>
                      <td className="border border-white/10 px-3 py-2">Reduced proportionally</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DLP</td>
                      <td className="border border-white/10 px-3 py-2">Starts for each section separately</td>
                      <td className="border border-white/10 px-3 py-2">Proportionate period for possessed part</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Consent</td>
                      <td className="border border-white/10 px-3 py-2">Part of contract</td>
                      <td className="border border-white/10 px-3 py-2">Requires contractor consent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Building Services Considerations for Phased Handover</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>System isolation:</strong> Sections must be independently operable - separate distribution boards, controls</li>
                <li className="pl-1"><strong>Commissioning:</strong> Each section requires full commissioning before handover</li>
                <li className="pl-1"><strong>Fire systems:</strong> Fire alarm zones may need temporary modifications for phased occupation</li>
                <li className="pl-1"><strong>Shared plant:</strong> Central plant serving multiple sections creates interface complexity</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example: Hospital Wing Sectional Completion</p>
              <div className="p-3 rounded bg-white/5">
                <p className="text-sm text-white mb-2">A new hospital building with three wings:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li><strong>Section 1 (Outpatients):</strong> Completion 1st March - Must have independent power, lighting, fire alarm, HVAC</li>
                  <li><strong>Section 2 (Diagnostics):</strong> Completion 1st June - Medical gas, specialist ventilation, UPS systems</li>
                  <li><strong>Section 3 (Wards):</strong> Completion 1st September - Nurse call, bed-head services, final plantroom handover</li>
                </ul>
                <p className="text-sm text-elec-yellow/70 mt-2">Each section has its own 12-month DLP running from its completion date.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Planning tip:</strong> Sectional completion requires careful coordination of building services - ensure contract documents clearly define what systems and documentation are required for each section.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Defects Liability Period */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Defects Liability Period and Making Good
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The defects liability period (DLP), also called the rectification period, runs from practical
              completion and provides the client with protection against defects in materials or workmanship.
              For building services, this period is critical for identifying operational defects that only
              become apparent during normal use.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Defects Liability Period Overview</p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Typical Duration</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Building services: <strong>12 months</strong></li>
                    <li>General building: 12 months</li>
                    <li>Infrastructure: Up to 24 months</li>
                    <li>Some specialist: 6 months</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Contractor Obligations</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Make good notified defects</li>
                    <li>At own cost</li>
                    <li>Within reasonable time</li>
                    <li>Defects from workmanship/materials</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Client Responsibilities</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>Routine maintenance</li>
                    <li>Prompt notification of defects</li>
                    <li>Allow reasonable access</li>
                    <li>Not cause damage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Constitutes a Defect?</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-400 mb-1">Contractor Liability</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Poor workmanship (loose connections, incorrect installation)</li>
                    <li className="pl-1">Defective materials (faulty component, sub-standard cable)</li>
                    <li className="pl-1">Non-compliance with specification</li>
                    <li className="pl-1">Incomplete commissioning</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Not Contractor Liability</p>
                  <ul className="text-sm text-white/80 space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">Normal wear and tear</li>
                    <li className="pl-1">User damage or misuse</li>
                    <li className="pl-1">Consumables (lamps, filters, fuses)</li>
                    <li className="pl-1">Lack of routine maintenance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Services - Common DLP Defects</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Defects</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Root Cause</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical</td>
                      <td className="border border-white/10 px-3 py-2">Nuisance tripping, loose connections</td>
                      <td className="border border-white/10 px-3 py-2">Poor terminations, incorrect protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting controls</td>
                      <td className="border border-white/10 px-3 py-2">Sensor failures, incorrect zoning</td>
                      <td className="border border-white/10 px-3 py-2">Commissioning issues, component quality</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC</td>
                      <td className="border border-white/10 px-3 py-2">Temperature control problems, noise</td>
                      <td className="border border-white/10 px-3 py-2">Balancing, control strategy, vibration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm</td>
                      <td className="border border-white/10 px-3 py-2">False alarms, non-detection</td>
                      <td className="border border-white/10 px-3 py-2">Detector selection, cause and effect</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS</td>
                      <td className="border border-white/10 px-3 py-2">Control failures, communication errors</td>
                      <td className="border border-white/10 px-3 py-2">Programming, integration, sensors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Certificate of Making Good Defects</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Issued by contract administrator at end of DLP</li>
                <li className="pl-1">Confirms all notified defects have been rectified</li>
                <li className="pl-1">Triggers release of remaining retention (typically 50%)</li>
                <li className="pl-1">Does not end liability - Limitation Act still applies</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Commercial tip:</strong> Maintain detailed records of all defect notifications, responses, and rectification work. Disputes often arise about whether defects were notified within the DLP.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Practical Completion Documentation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Electrical subcontractor preparing for practical completion of a 10,000m² office building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-elec-yellow/80">Documentation checklist:</p>
                <p className="mt-2">1. Electrical Installation Certificate (BS 7671)</p>
                <p>2. Schedule of test results - all circuits</p>
                <p>3. As-built drawings - distribution, small power, lighting</p>
                <p>4. O&M manuals - all equipment with data sheets</p>
                <p>5. Fire alarm BS 5839 certificate and zone plan</p>
                <p>6. Emergency lighting BS 5266 certificate</p>
                <p>7. Commissioning certificates - lighting controls, BMS points</p>
                <p>8. Warranty certificates and spare parts lists</p>
                <p className="mt-2 text-green-400">All documentation must be compiled and submitted before formal inspection.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Defects Liability Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Building with sectional completion - when does each section's DLP end?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Section A practical completion: 15th January 2024</p>
                <p>Section B practical completion: 1st April 2024</p>
                <p>Section C practical completion: 1st July 2024</p>
                <p className="mt-2">12-month DLP for each section:</p>
                <p className="mt-1"><strong>Section A DLP ends:</strong> 15th January 2025</p>
                <p><strong>Section B DLP ends:</strong> 1st April 2025</p>
                <p><strong>Section C DLP ends:</strong> 1st July 2025</p>
                <p className="mt-2 text-amber-400">Note: Each section has independent retention release dates.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Partial Possession Effect</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Client takes early possession of ground floor (25% of building value) 8 weeks before planned completion.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Contract value: £4,000,000</p>
                <p>Retention: 3% = £120,000</p>
                <p>Liquidated damages: £10,000 per week</p>
                <p className="mt-2 text-elec-yellow/80">Effects of partial possession:</p>
                <p className="mt-1">1. Retention released proportionally: 25% × £120,000 = £30,000</p>
                <p>2. LADs reduced: 25% × £10,000 = £7,500 per week applies to remaining works</p>
                <p>3. Ground floor DLP starts from possession date</p>
                <p>4. Insurance responsibility transfers for ground floor</p>
                <p className="mt-2 text-green-400">Ground floor requires fully commissioned, independent building services.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Completion Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complete internal snagging 2-3 weeks before target date</li>
                <li className="pl-1">Compile all documentation in building manual format</li>
                <li className="pl-1">Verify all systems commissioned with certificates</li>
                <li className="pl-1">Arrange staff training sessions</li>
                <li className="pl-1">Prepare health and safety file contribution</li>
                <li className="pl-1">Confirm all statutory compliance certificates obtained</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Typical DLP: <strong>12 months</strong> for building services</li>
                <li className="pl-1">Retention at PC: <strong>50%</strong> released</li>
                <li className="pl-1">Limitation period: <strong>6 years</strong> (simple contract) / <strong>12 years</strong> (deed)</li>
                <li className="pl-1">Certificate issuer: <strong>Contract administrator</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Incomplete documentation</strong> - Delays certification and retention release</li>
                <li className="pl-1"><strong>Late snagging</strong> - Insufficient time to rectify before handover</li>
                <li className="pl-1"><strong>Poor defects records</strong> - Disputes about liability and timing</li>
                <li className="pl-1"><strong>Ignoring seasonal commissioning</strong> - Systems fail when conditions change</li>
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
                <p className="font-medium text-white mb-1">Practical Completion Requirements</p>
                <ul className="space-y-0.5">
                  <li>Works substantially complete</li>
                  <li>Building fit for occupation/use</li>
                  <li>All commissioning complete</li>
                  <li>Documentation provided</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">DLP Obligations</p>
                <ul className="space-y-0.5">
                  <li>Make good defects at own cost</li>
                  <li>Respond within reasonable time</li>
                  <li>Defects from workmanship/materials</li>
                  <li>Seasonal commissioning visits</li>
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
            <Link to="../h-n-c-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section6_6;
