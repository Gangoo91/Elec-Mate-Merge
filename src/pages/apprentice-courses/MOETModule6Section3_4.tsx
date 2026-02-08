import { ArrowLeft, LinkIcon, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Traceability and Compliance Requirements - MOET Module 6 Section 3.4";
const DESCRIPTION = "Audit trails, regulatory compliance, traceability documentation, record retention and quality management for electrical maintenance technicians under ST1426.";

const quickCheckQuestions = [
  {
    id: "traceability-purpose",
    question: "What does 'traceability' mean in the context of maintenance records?",
    options: [
      "Tracking where technicians are on site",
      "The ability to trace the complete history of an asset's maintenance back to specific dates, personnel and documentation",
      "Tracing electrical cables through a building",
      "Tracking spare parts delivery times"
    ],
    correctIndex: 1,
    explanation: "Traceability means being able to trace every maintenance intervention back to when it was done, who did it, what was found, what action was taken, and what documentation was produced. It creates an unbroken chain of evidence demonstrating that maintenance was properly carried out."
  },
  {
    id: "audit-trail",
    question: "An audit trail in a CMMS provides:",
    options: [
      "A map of fire escape routes",
      "A chronological record of all data entries, modifications and approvals, showing who did what and when",
      "A list of all auditors who have visited",
      "The financial cost of each task"
    ],
    correctIndex: 1,
    explanation: "An audit trail traces every action — who created a record, who modified it, when changes were made, and what approvals were given. Essential for regulatory compliance and incident investigation."
  },
  {
    id: "retention-period",
    question: "Under BS 7671, electrical installation records should be retained for:",
    options: [
      "One year after the work",
      "The life of the installation — available for inspection at all times",
      "Only until the next periodic inspection",
      "Six months"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 132.13 requires records to be maintained and available for inspection throughout the life of the installation. Previous inspection records should also be retained for comparison during subsequent periodic inspections."
  },
  {
    id: "calibration-trace",
    question: "Why must test instrument calibration be traceable to national standards?",
    options: [
      "Marketing requirement for manufacturers",
      "Traceable calibration ensures measurement accuracy, legal defensibility of test results, and GS38/BS 7671 compliance",
      "Only needed for expensive instruments",
      "Only required for HV instruments"
    ],
    correctIndex: 1,
    explanation: "Traceable calibration ensures measurements are accurate and legally defensible. If test results are challenged — in court, by an insurer, or by an HSE inspector — you must demonstrate the instrument was calibrated to a traceable standard at the time of testing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Traceability in maintenance means:",
    options: [
      "Following cable routes",
      "Tracing every maintenance activity back to specific dates, personnel, procedures and documentation",
      "Tracking staff attendance",
      "Finding lost tools"
    ],
    correctAnswer: 1,
    explanation: "Traceability creates a complete chain of evidence linking every activity to dates, personnel, procedures, parts used, and documentation."
  },
  {
    id: 2,
    question: "A regulatory compliance audit typically checks for:",
    options: [
      "Neatness of handwriting",
      "Evidence that maintenance was planned, executed by competent persons, documented accurately, and statutory requirements met",
      "Number of tasks completed",
      "Whether CMMS software is latest version"
    ],
    correctAnswer: 1,
    explanation: "Auditors check that maintenance was systematically planned, carried out by competent persons, properly documented, and all statutory requirements met."
  },
  {
    id: 3,
    question: "EAWR 1989 requires:",
    options: [
      "Only purchasing from approved suppliers",
      "Electrical systems maintained to prevent danger, with records providing evidence of compliance",
      "Only visual inspections once per year",
      "All maintenance done by the original installer"
    ],
    correctAnswer: 1,
    explanation: "EAWR Reg 4(2) requires systems to be maintained to prevent danger. HSE Guidance Note HSR25 makes clear that records are the primary means of demonstrating compliance."
  },
  {
    id: 4,
    question: "Document retention policies ensure:",
    options: [
      "Filing cabinets are regularly emptied",
      "Records are available for the required period for audits, investigations and legal proceedings",
      "All documents are kept forever",
      "Old documents are destroyed quickly"
    ],
    correctAnswer: 1,
    explanation: "Retention policies ensure records are available for regulatory audits, incident investigations, legal proceedings, and operational decisions throughout the required period."
  },
  {
    id: 5,
    question: "Calibration certificates for test instruments should be:",
    options: [
      "Kept in the instrument case only",
      "Filed in the quality system with instrument identity, calibration date, due date and traceability reference",
      "Discarded after recalibration",
      "Only needed for first calibration"
    ],
    correctAnswer: 1,
    explanation: "Certificates must be filed and linked to the specific instrument by serial number, showing calibration date, next due date, and traceability chain."
  },
  {
    id: 6,
    question: "ISO 55001 relates to:",
    options: [
      "Electrical wiring regulations",
      "Asset management systems — managing assets throughout their lifecycle",
      "Food safety standards",
      "Fire alarm maintenance"
    ],
    correctAnswer: 1,
    explanation: "ISO 55001 provides a framework for managing physical assets effectively throughout their lifecycle, including maintenance documentation and traceability."
  },
  {
    id: 7,
    question: "A non-conformance in a quality audit means:",
    options: [
      "The audit has been cancelled",
      "A requirement has not been met, and corrective action is needed",
      "The auditor made an error",
      "The organisation has failed entirely"
    ],
    correctAnswer: 1,
    explanation: "A non-conformance identifies where a requirement has not been met. It requires corrective action within a defined timescale and must be formally closed out."
  },
  {
    id: 8,
    question: "Version control of maintenance procedures ensures:",
    options: [
      "Procedures look attractive",
      "Everyone works to the current, approved version and obsolete versions are withdrawn",
      "Multiple versions are available",
      "Procedures are updated daily"
    ],
    correctAnswer: 1,
    explanation: "Version control ensures only the current, approved version is in use. Obsolete versions must be withdrawn to prevent following outdated procedures."
  },
  {
    id: 9,
    question: "An EICR C2 code means:",
    options: [
      "Installation satisfactory",
      "Potentially dangerous — urgent remedial action required",
      "Improvement recommended",
      "Further investigation required"
    ],
    correctAnswer: 1,
    explanation: "C2 means potentially dangerous with urgent remedial action required. This must be communicated to the duty holder and tracked to completion."
  },
  {
    id: 10,
    question: "A document management system (DMS) in maintenance:",
    options: [
      "Replaces the CMMS",
      "Controls, stores, organises and provides access to all documentation in a structured, searchable system",
      "Prints documents automatically",
      "Reduces the number of documents"
    ],
    correctAnswer: 1,
    explanation: "A DMS provides structured storage, version control, access management, and search capability for all documentation with full audit trail."
  },
  {
    id: 11,
    question: "Under ST1426, demonstrating compliance awareness means:",
    options: [
      "Memorising every regulation number",
      "Understanding which regulations apply, how to access them, and how daily practices ensure compliance",
      "Only following instructions",
      "Leaving compliance to the safety department"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires understanding the regulatory framework, knowing which regulations apply, and demonstrating compliance through daily practices."
  },
  {
    id: 12,
    question: "If a maintenance record contains an error, the correct procedure is to:",
    options: [
      "Delete and start again",
      "Make a clear, dated correction preserving the original entry and audit trail",
      "Ignore it if minor",
      "Ask someone else to change it anonymously"
    ],
    correctAnswer: 1,
    explanation: "Errors must be corrected transparently with the original entry preserved, the correction dated and signed, and the reason recorded."
  }
];

const faqs = [
  {
    question: "How long must I keep electrical test certificates?",
    answer: "Electrical test certificates should be retained for the life of the installation. Most organisations retain certificates for a minimum of 25 years or until the installation is permanently decommissioned. Previous certificates are valuable for comparison during subsequent periodic inspections."
  },
  {
    question: "What is the difference between compliance and conformance?",
    answer: "Compliance refers to meeting statutory (legal) requirements such as EAWR 1989. Conformance refers to meeting requirements of a standard such as BS 7671 or ISO 9001. Non-compliance can result in criminal prosecution; non-conformance results in audit findings."
  },
  {
    question: "Do I need to keep records of failed tests?",
    answer: "Absolutely. Failed results demonstrate thorough testing, fault identification, and corrective action. Selectively recording only passes is dishonest and could constitute fraud. All results, including failures and subsequent retests, must be recorded."
  },
  {
    question: "What happens during a regulatory audit?",
    answer: "An auditor selects sample assets and traces their maintenance history. They check planned maintenance was on schedule, competent persons performed the work, findings were documented, corrective actions tracked to completion, and instruments were calibrated."
  },
  {
    question: "Is an electronic signature legally equivalent to a wet signature?",
    answer: "Yes, under the Electronic Communications Act 2000 and eIDAS Regulation, electronic signatures are legally valid. The system must provide adequate identity verification and audit trail. Some specific documents may still require wet signatures."
  }
];

const MOETModule6Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3">
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
            <LinkIcon className="h-4 w-4" />
            <span>Module 6.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Traceability and Compliance Requirements
          </h1>
          <p className="text-white/80">
            Audit trails, regulatory compliance and documentation standards for electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Traceability:</strong> Complete history linked to dates, personnel and documents</li>
              <li className="pl-1"><strong>Audit trails:</strong> Who did what, when, and what was approved</li>
              <li className="pl-1"><strong>Retention:</strong> Records kept for the life of the installation</li>
              <li className="pl-1"><strong>Calibration:</strong> Test instruments traceable to national standards</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>EAWR 1989:</strong> Records demonstrate Reg 4(2) compliance</li>
              <li className="pl-1"><strong>BS 7671:</strong> Reg 132.13 requires maintained records</li>
              <li className="pl-1"><strong>EICR codes:</strong> C1/C2/C3/FI tracked to completion</li>
              <li className="pl-1"><strong>ST1426:</strong> Compliance awareness assessed in EPA</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the importance of traceability in maintenance documentation",
              "Describe audit trail requirements for digital and paper records",
              "Apply record retention requirements for electrical installations",
              "Understand calibration traceability for test instruments",
              "Navigate regulatory compliance requirements for maintenance records",
              "Demonstrate compliance awareness as required by ST1426"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Traceability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Traceability in maintenance means the ability to trace every intervention on an asset back to specific dates, personnel, procedures, parts and documentation. It creates an unbroken chain of evidence that proves maintenance was carried out properly by competent people using correct methods and materials. Without traceability, maintenance records are little more than a list of activities — they cannot answer the critical questions that arise during audits, investigations, or legal proceedings.
            </p>
            <p>
              The concept of traceability extends beyond simply recording what was done. It encompasses who did it (verified competence), when it was done (exact date and time), how it was done (which procedure was followed), what was used (parts with batch numbers, instruments with calibration status), what was found (detailed findings and measurements), and what was decided (actions taken and rationale). Each link in this chain must be documented and verifiable.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Traceability Chain</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Who:</strong> Named, competent technician with verifiable qualifications</li>
                <li className="pl-1"><strong>What:</strong> Specific maintenance task with detailed description of work performed</li>
                <li className="pl-1"><strong>When:</strong> Date and time of intervention, duration of work</li>
                <li className="pl-1"><strong>Where:</strong> Exact asset identification, location code, circuit reference</li>
                <li className="pl-1"><strong>How:</strong> Procedure followed, tools and instruments used (with calibration status)</li>
                <li className="pl-1"><strong>Results:</strong> Findings, measurements, test results, condition assessment</li>
                <li className="pl-1"><strong>Materials:</strong> Parts used with part numbers, batch numbers where applicable</li>
                <li className="pl-1"><strong>Outcome:</strong> Actions taken, verification results, outstanding items</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">When Traceability Fails</p>
              <p className="text-sm text-white">
                In an HSE investigation following a workplace electrical fatality, investigators found maintenance records were incomplete — no technician name, no calibration references, no test results. The organisation could not demonstrate maintenance had been properly carried out. The absence of traceable records was a significant aggravating factor in the prosecution. The lesson is clear: if it is not documented with full traceability, it effectively did not happen.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Audit Trails and Record Integrity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An audit trail shows every action taken on a record — who created it, who modified it, when, and what approvals were given. In digital systems, audit trails are automatic and tamper-proof. In paper systems, they rely on signing, dating and sequential numbering. The integrity of the audit trail determines whether the records can be relied upon as evidence of compliance.
            </p>
            <p>
              Record integrity means that the records accurately represent what actually happened, have not been altered without authorisation, and can be trusted by anyone who reads them. This is not merely an administrative concern — it is a legal and ethical requirement. Records that lack integrity undermine the entire maintenance management system and expose the organisation and individual technicians to legal liability.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintaining Record Integrity</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Never alter records retrospectively</strong> without a clear, dated correction and explanation</li>
                <li className="pl-1"><strong>Never backdate entries</strong> — if a record is late, note the actual date of entry alongside the date of the work</li>
                <li className="pl-1"><strong>Never destroy records</strong> without authorisation and in accordance with retention policy</li>
                <li className="pl-1"><strong>Paper records:</strong> Use indelible ink, single-line strikethroughs for corrections, initial and date all changes</li>
                <li className="pl-1"><strong>Digital records:</strong> Use the system's formal amendment process; do not create new records to replace originals</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Digital vs Paper Audit Trails</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Digital</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Paper</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Creation</td>
                      <td className="border border-white/10 px-3 py-2">Automatic timestamp and user ID</td>
                      <td className="border border-white/10 px-3 py-2">Manual date and signature</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Modifications</td>
                      <td className="border border-white/10 px-3 py-2">All changes logged automatically</td>
                      <td className="border border-white/10 px-3 py-2">Depends on discipline of the writer</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Tamper evidence</td>
                      <td className="border border-white/10 px-3 py-2">Difficult to alter without detection</td>
                      <td className="border border-white/10 px-3 py-2">Physical alterations may be visible</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Retrieval</td>
                      <td className="border border-white/10 px-3 py-2">Full history retrievable instantly</td>
                      <td className="border border-white/10 px-3 py-2">Requires physical access to files</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Regulatory Framework and Retention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multiple regulations impose requirements on maintenance record keeping. Understanding these ensures your records meet the standard expected during audits and investigations. The regulatory framework is not a bureaucratic inconvenience — it exists because inadequate maintenance records have been a factor in serious incidents, and the records you create today may be scrutinised years or decades from now.
            </p>

            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">EAWR 1989</td>
                      <td className="border border-white/10 px-3 py-2">Evidence of maintenance to prevent danger</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">BS 7671</td>
                      <td className="border border-white/10 px-3 py-2">Records maintained and available for inspection</td>
                      <td className="border border-white/10 px-3 py-2">Life of installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">PUWER 1998</td>
                      <td className="border border-white/10 px-3 py-2">Maintenance log kept up to date</td>
                      <td className="border border-white/10 px-3 py-2">Life of equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">LOLER 1998</td>
                      <td className="border border-white/10 px-3 py-2">Examination records for lifting equipment</td>
                      <td className="border border-white/10 px-3 py-2">Next exam + 2 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">DSEAR 2002</td>
                      <td className="border border-white/10 px-3 py-2">Records of ATEX equipment maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Life of equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">MHSWR 1999</td>
                      <td className="border border-white/10 px-3 py-2">Risk assessments reviewed after incidents</td>
                      <td className="border border-white/10 px-3 py-2">40 years (health surveillance)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Practical Retention Guidance</p>
              <p className="text-sm text-white">
                Where no specific retention period is mandated, a good rule is to retain all maintenance records for the life of the asset plus a reasonable period after decommissioning (typically 6 years, which aligns with the limitation period for civil claims). Digital storage makes long-term retention practical and cost-effective. Never destroy records without written authorisation and a documented retention policy.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Calibration Traceability and Quality Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every measurement is only as reliable as the instrument used. Calibration traceability ensures instruments are accurate and readings can be defended if challenged. This is not just a technical requirement — it is fundamental to the legal validity of your test results and the credibility of your professional work.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Requirements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">All test instruments must have a current calibration certificate</li>
                <li className="pl-1">Calibration must be traceable to national standards (UKAS in the UK)</li>
                <li className="pl-1">Never use an out-of-calibration instrument for certification testing</li>
                <li className="pl-1">GS38 requires voltage indicators proved before and after use</li>
                <li className="pl-1">Records must link specific test results to the instrument (by serial number)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Standards</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">ISO 9001 — Quality management</li>
                  <li className="pl-1">ISO 55001 — Asset management</li>
                  <li className="pl-1">ISO 17025 — Calibration lab competence</li>
                  <li className="pl-1">PAS 55 — Asset management specification</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Your Role as a Technician</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Check calibration dates before use</li>
                  <li className="pl-1">Record instrument serial numbers on test records</li>
                  <li className="pl-1">Report suspected instrument inaccuracy</li>
                  <li className="pl-1">Follow calibration management procedure</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Building a Compliance Culture
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Compliance is not a separate activity bolted onto maintenance work — it should be embedded in every task you perform. A compliance culture means that every technician understands why traceability matters, takes personal responsibility for the quality of their records, and views documentation as an integral part of the job rather than an administrative burden.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Steps for Every Technician</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Document as you work:</strong> Record findings and actions at the point of work, not from memory later</li>
                <li className="pl-1"><strong>Be specific:</strong> Record actual values, part numbers, and instrument serial numbers — not vague summaries</li>
                <li className="pl-1"><strong>Be honest:</strong> Record what you actually found, including problems and limitations</li>
                <li className="pl-1"><strong>Follow procedures:</strong> Use the correct forms, follow the defined process, get the required sign-offs</li>
                <li className="pl-1"><strong>Raise concerns:</strong> If you identify compliance gaps, report them — do not work around them</li>
                <li className="pl-1"><strong>Continuous improvement:</strong> Suggest improvements to documentation processes where you see opportunities</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Understanding traceability and compliance demonstrates the professional behaviours and regulatory awareness that are directly assessed in the EPA professional discussion. Showing that you understand not just what to do, but why the documentation matters, distinguishes you as a competent, professional technician.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">Traceability Chain</p>
                <ul className="space-y-0.5">
                  <li>Who — named competent person</li>
                  <li>What — specific task description</li>
                  <li>When — date, time, duration</li>
                  <li>Where — asset ID, location</li>
                  <li>How — procedure, instruments</li>
                  <li>Results — findings, measurements</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>EAWR 1989 — statutory maintenance</li>
                  <li>BS 7671 — Reg 132.13 records</li>
                  <li>GS38 — test instrument requirements</li>
                  <li>ISO 9001 — quality management</li>
                  <li>ISO 55001 — asset management</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Digital vs Paper
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module6-section3-5">
              Next: Maintenance Management Systems
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule6Section3_4;
