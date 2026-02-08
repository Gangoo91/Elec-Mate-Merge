import { ArrowLeft, FileCheck, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Documentation and Sign-Off - MOET Module 4.4.5";
const DESCRIPTION = "Comprehensive guide to documentation and sign-off procedures in testing and commissioning for electrical maintenance: completion certificates, handover documentation, regulatory compliance, and stakeholder sign-off processes.";

const quickCheckQuestions = [
  {
    id: "doc-signoff-purpose",
    question: "What is the primary purpose of completion documentation in electrical maintenance?",
    options: [
      "To create paperwork that satisfies management requirements",
      "To provide a verifiable record that work has been completed safely, tested, and meets the required standard",
      "To protect the technician from blame if something goes wrong",
      "To delay the handover process until all stakeholders are available"
    ],
    correctIndex: 1,
    explanation: "Completion documentation serves as a verifiable record that the work has been carried out safely, that appropriate tests have been conducted, and that the installation or repair meets the required standards. It protects all parties by providing evidence of compliance and creates a baseline for future maintenance activities."
  },
  {
    id: "doc-signoff-bs7671",
    question: "Under BS 7671, which document must be issued upon completion of new electrical work or significant alterations?",
    options: [
      "A verbal confirmation to the client",
      "An Electrical Installation Certificate (EIC) signed by the designer, installer, and inspector/tester",
      "A manufacturer's warranty certificate",
      "A risk assessment document only"
    ],
    correctIndex: 1,
    explanation: "BS 7671 requires an Electrical Installation Certificate (EIC) to be issued upon completion of new installations or significant alterations. The certificate must be signed by the competent persons responsible for the design, construction (installation), and inspection and testing of the work. This three-signature requirement ensures accountability across all aspects of the work."
  },
  {
    id: "doc-signoff-handover",
    question: "Which of the following is NOT typically included in a handover documentation pack?",
    options: [
      "As-built drawings reflecting the completed installation",
      "Test results and certificates",
      "The personal mobile number of every technician who worked on the project",
      "Operation and maintenance manuals for installed equipment"
    ],
    correctIndex: 2,
    explanation: "A handover documentation pack typically includes as-built drawings, test results and certificates, operation and maintenance manuals, warranty information, and emergency contact details for the responsible organisation. Personal mobile numbers of individual technicians are not appropriate — contact should be through the organisation's official channels."
  },
  {
    id: "doc-signoff-minor-works",
    question: "When is a Minor Works Certificate appropriate instead of a full Electrical Installation Certificate?",
    options: [
      "Whenever the client requests it to save time",
      "For work that does not include the provision of a new circuit, such as adding a socket outlet to an existing circuit",
      "For any work valued under £500",
      "Only for domestic properties"
    ],
    correctIndex: 1,
    explanation: "A Minor Electrical Installation Works Certificate is appropriate for small-scale work that does not include the provision of a new circuit — for example, adding a socket outlet or lighting point to an existing circuit, or replacing a consumer unit on a like-for-like basis. The value of the work or the type of property does not determine which certificate is required; it is the nature and extent of the work that matters."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The three signatories required on an Electrical Installation Certificate under BS 7671 are:",
    options: [
      "The client, the contractor, and the local authority",
      "The designer, the installer (constructor), and the inspector/tester",
      "The project manager, the health and safety officer, and the electrician",
      "The building owner, the insurance company, and the electrician"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires the EIC to be signed by three competent persons: the designer (responsible for the design of the electrical installation), the installer/constructor (responsible for the construction/installation), and the inspector/tester (responsible for the inspection and testing). One person may fulfil more than one role if competent to do so."
  },
  {
    id: 2,
    question: "Which regulation requires that electrical installations are maintained to prevent danger?",
    options: [
      "The Building Regulations Part P only",
      "The Electricity at Work Regulations 1989, Regulation 4(2)",
      "The Health and Safety at Work Act Section 7 only",
      "The Construction (Design and Management) Regulations 2015"
    ],
    correctAnswer: 1,
    explanation: "The Electricity at Work Regulations 1989, Regulation 4(2) states that electrical systems shall be maintained so as to prevent danger. This places a legal duty on the duty holder to ensure ongoing maintenance, and completion documentation provides evidence of compliance with this requirement."
  },
  {
    id: 3,
    question: "An Electrical Installation Condition Report (EICR) uses coding to classify observations. Code C2 indicates:",
    options: [
      "The installation is satisfactory and no action is required",
      "An observation requiring improvement but not posing immediate danger",
      "A potentially dangerous condition where urgent remedial action is required",
      "A limitation preventing full inspection of the installation"
    ],
    correctAnswer: 2,
    explanation: "Code C2 indicates a condition that is potentially dangerous and requires urgent remedial action. C1 indicates danger is present and immediate action is required, C3 indicates improvement is recommended, and FI indicates further investigation is required without delay. Understanding these codes is essential for accurate documentation."
  },
  {
    id: 4,
    question: "What is the purpose of as-built drawings in handover documentation?",
    options: [
      "To show the original design intent before construction began",
      "To accurately reflect the installation as actually constructed, including any variations from the original design",
      "To demonstrate the architect's vision for the building",
      "To provide a marketing tool for the contractor"
    ],
    correctAnswer: 1,
    explanation: "As-built (or as-installed) drawings accurately reflect the installation as it was actually constructed, including any variations, modifications, or deviations from the original design drawings. These are essential for future maintenance, fault finding, and any subsequent modifications, as they show the true layout, cable routes, and equipment locations."
  },
  {
    id: 5,
    question: "Under the Construction (Design and Management) Regulations 2015, who is responsible for compiling the health and safety file?",
    options: [
      "The electrical contractor",
      "The principal designer",
      "The building owner",
      "The local authority building control"
    ],
    correctAnswer: 1,
    explanation: "Under CDM 2015, the principal designer is responsible for preparing, reviewing, updating, and revising the health and safety file. This file must contain information about the project that is likely to be needed to ensure health and safety during any subsequent work, including maintenance. Electrical documentation forms part of this file."
  },
  {
    id: 6,
    question: "Which of the following test results must be recorded on the Schedule of Test Results that accompanies an EIC?",
    options: [
      "Only insulation resistance values",
      "Continuity, insulation resistance, polarity, earth fault loop impedance, RCD operation, and prospective fault current",
      "Only the results that indicate a pass",
      "A summary statement of whether tests passed or failed"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Test Results must record all relevant test results for each circuit, including continuity of protective conductors (R1+R2), insulation resistance, polarity verification, earth fault loop impedance (Zs), RCD operation times, and prospective fault current (Ipf). All results — whether satisfactory or not — must be recorded accurately."
  },
  {
    id: 7,
    question: "When documenting a repair to an existing installation, a maintenance technician should:",
    options: [
      "Only record the repair in their personal notebook",
      "Complete the appropriate certificate or report, update maintenance records, mark up any drawing changes, and inform the duty holder",
      "Send an email to their supervisor and consider the matter closed",
      "Wait until the next scheduled inspection to record the work"
    ],
    correctAnswer: 1,
    explanation: "Thorough documentation of repairs is essential. The technician should complete the appropriate electrical certificate (Minor Works or EIC as applicable), update the site maintenance records and logbooks, mark up any drawing changes for incorporation into as-built drawings, and formally inform the duty holder of the completed work and any recommendations."
  },
  {
    id: 8,
    question: "The purpose of a commissioning checklist is to:",
    options: [
      "Provide a list of tools required for the job",
      "Ensure that all required checks, tests, and verifications are completed in a systematic order before equipment is energised or handed over",
      "Record the names of all personnel on site",
      "Calculate the final cost of the project"
    ],
    correctAnswer: 1,
    explanation: "A commissioning checklist provides a structured, systematic approach to verifying that all required pre-commissioning checks, functional tests, safety verifications, and performance tests have been completed before equipment is energised or the installation is handed over. It prevents steps being missed and provides documented evidence of the commissioning process."
  },
  {
    id: 9,
    question: "Under Building Regulations Part P (England), notification to building control is required for:",
    options: [
      "All electrical work regardless of scope",
      "Notifiable work as defined in the regulations, unless carried out by a registered competent person scheme member who can self-certify",
      "Only work carried out by unqualified persons",
      "Only commercial installations"
    ],
    correctAnswer: 1,
    explanation: "Building Regulations Part P requires notification of notifiable electrical work (new circuits, work in special locations such as bathrooms, consumer unit replacements) to building control. Members of registered competent person schemes (such as NICEIC, NAPIT, or ELECSA) can self-certify their work without separate building control notification, but they must still issue the required certificates."
  },
  {
    id: 10,
    question: "Why is it important to include limitations in an EICR?",
    options: [
      "To reduce the workload of the inspector",
      "To clearly document areas that could not be inspected or tested, so that the client and future inspectors understand the scope and boundaries of the report",
      "To provide excuses for incomplete work",
      "Limitations are not required on an EICR"
    ],
    correctAnswer: 1,
    explanation: "Documenting limitations is essential for transparency. Limitations record areas that could not be inspected or tested — for example, circuits concealed behind fixed finishes, locked areas, or equipment that could not be isolated. This ensures the client understands the scope of the inspection and that future inspectors know which areas still require assessment."
  },
  {
    id: 11,
    question: "What is the recommended retention period for electrical test certificates and maintenance records?",
    options: [
      "One year after the work is completed",
      "They should be retained for the lifetime of the installation and made available to subsequent duty holders",
      "Five years as required by law",
      "Until the next inspection, at which point old records can be destroyed"
    ],
    correctAnswer: 1,
    explanation: "Electrical test certificates and maintenance records should be retained for the lifetime of the installation. There is no defined maximum retention period in the regulations. These records provide valuable historical data for future maintenance, fault investigation, and compliance evidence. When a property changes hands, records should be passed to the new duty holder."
  },
  {
    id: 12,
    question: "A technician completes a repair but the sign-off is delayed because the responsible person is unavailable. The correct action is to:",
    options: [
      "Forge the responsible person's signature to avoid delay",
      "Complete and sign the documentation for their own scope of responsibility, clearly note the outstanding sign-off, and arrange for the responsible person to review and sign at the earliest opportunity",
      "Leave the site without any documentation and return later",
      "Hand the installation back to service without any documentation"
    ],
    correctAnswer: 1,
    explanation: "The technician should complete all documentation within their scope of responsibility, clearly noting that the final sign-off by the responsible person is outstanding. The installation should not be returned to service if the responsible person's review is a safety-critical step. Forging signatures is never acceptable and may constitute fraud."
  }
];

const faqs = [
  {
    question: "Can one person sign all three sections of an Electrical Installation Certificate?",
    answer: "Yes, one person can sign as designer, installer, and inspector/tester provided they are competent in all three roles. This is common for small-scale work carried out by a single qualified electrician. However, for larger or more complex installations, these roles are typically fulfilled by different individuals to provide independent verification, particularly for the inspection and testing function."
  },
  {
    question: "What happens if documentation is not provided after electrical work?",
    answer: "Failure to provide the required certification is a breach of BS 7671 and, for notifiable work under Part P (England), a breach of Building Regulations. The client has no evidence that the work has been properly designed, installed, and tested. This can cause problems with property sales, insurance claims, and future maintenance. The duty holder may also be unable to demonstrate compliance with the Electricity at Work Regulations 1989."
  },
  {
    question: "How do digital documentation systems compare to paper-based systems?",
    answer: "Digital documentation systems offer significant advantages: instant backup and storage, searchability, trending of test results over time, automatic flagging of out-of-tolerance readings, and easy distribution to stakeholders. However, they must maintain the same level of detail and accuracy as paper systems. Digital signatures must comply with the Electronic Communications Act 2000. Many organisations now use tablet-based systems that allow technicians to complete documentation on site with photographic evidence."
  },
  {
    question: "Who should receive copies of completion certificates?",
    answer: "The person ordering the work (the client) must receive the original certificates. Copies should be retained by the contractor, provided to the building owner or duty holder if different from the client, and for notifiable work, submitted to the relevant building control body or competent person scheme. For rented properties, both the landlord and the managing agent should receive copies."
  },
  {
    question: "What is the difference between a certificate and a report in electrical documentation?",
    answer: "A certificate (EIC or Minor Works) is issued after the completion of new work or alterations and certifies that the work complies with BS 7671 at the time of completion. A report (EICR) is issued after inspecting and testing an existing installation and reports on its condition at the time of inspection. The certificate confirms compliance of new work; the report assesses the condition of existing work."
  }
];

const MOETModule4Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4">
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
            <FileCheck className="h-4 w-4" />
            <span>Module 4.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Documentation and Sign-Off
          </h1>
          <p className="text-white/80">
            Completion documentation, handover procedures, and regulatory sign-off for electrical maintenance work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Certificates:</strong> EIC, Minor Works, and EICR — each has a specific purpose and format</li>
              <li className="pl-1"><strong>Handover:</strong> As-built drawings, test results, O&M manuals, warranties</li>
              <li className="pl-1"><strong>Sign-off:</strong> Competent persons must verify and sign within their scope of responsibility</li>
              <li className="pl-1"><strong>Retention:</strong> Records kept for the lifetime of the installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>BS 7671:</strong> Defines certificate requirements for all electrical work</li>
              <li className="pl-1"><strong>EAWR 1989:</strong> Legal duty to maintain and document electrical systems</li>
              <li className="pl-1"><strong>Part P:</strong> Building regulation notification for notifiable domestic work</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to quality assurance and documentation competencies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the correct certificate type (EIC, Minor Works, EICR) for different scopes of work",
              "Describe the information required on each certificate and who must sign it",
              "Explain the handover documentation process and its components",
              "Understand the regulatory framework governing electrical documentation",
              "Apply proper procedures for recording test results on Schedules of Test Results",
              "Describe document retention requirements and responsibilities under EAWR 1989"
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
            The Importance of Documentation in Electrical Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Documentation is not an afterthought in electrical maintenance — it is an integral part of the work itself. Every repair, modification, test, and inspection must be recorded accurately and completely. This documentation serves multiple critical purposes: it provides evidence of compliance with legal and regulatory requirements, creates a historical record for future maintenance and fault investigation, confirms that work has been completed to the required standard, and protects both the technician and the organisation in the event of a dispute or incident.
            </p>
            <p>
              Under the Electricity at Work Regulations 1989 (EAWR), Regulation 4(2), there is a legal duty to maintain electrical systems so as to prevent danger. While the regulations do not explicitly mandate specific documentation formats, the ability to demonstrate compliance with this duty relies entirely on having adequate records. Without documentation, the duty holder cannot prove that maintenance has been carried out, that tests have been conducted, or that the installation remains safe. In the event of an incident, the absence of records creates a presumption of non-compliance.
            </p>
            <p>
              BS 7671 (the IET Wiring Regulations) provides the technical framework for electrical documentation. It specifies the certificates and reports that must be issued for different types of work, the information that must be recorded, and the competent persons who must sign them. For maintenance technicians working to the ST1426 standard, understanding these documentation requirements is a core competency — not an optional administrative skill.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Framework — Key Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard/Regulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Documentation Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS 7671 Part 6</td>
                      <td className="border border-white/10 px-3 py-2">Electrical Installation Certificates, Minor Works Certificates, EICRs, Schedules of Test Results</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EAWR 1989 Reg 4(2)</td>
                      <td className="border border-white/10 px-3 py-2">Maintenance records demonstrating systems are maintained to prevent danger</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Building Regs Part P</td>
                      <td className="border border-white/10 px-3 py-2">Building control notification or self-certification for notifiable domestic work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CDM 2015</td>
                      <td className="border border-white/10 px-3 py-2">Health and safety file including electrical information for future maintenance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Cost of Poor Documentation</p>
              <p className="text-sm text-white">
                Inadequate documentation has real consequences. Property sales can be delayed or fail due to missing electrical certificates. Insurance claims may be refused if the insurer cannot verify that the electrical installation was properly maintained. In the event of a fire or electrocution, the absence of documentation may be treated as evidence of negligence. For competent person scheme members, failure to issue certificates can result in removal from the scheme and loss of the right to self-certify.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of Electrical Certificates and Reports
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 defines three principal document types for electrical work: the Electrical Installation Certificate (EIC), the Minor Electrical Installation Works Certificate, and the Electrical Installation Condition Report (EICR). Each serves a distinct purpose and is appropriate for a specific scope of work. Selecting the correct document is the first step in proper documentation.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Certificate (EIC)</h3>
                <p className="text-sm text-white mb-3">
                  The EIC is required for all new installations and for alterations or additions that include the provision of new circuits. It certifies that the design, construction, and inspection and testing of the work comply with BS 7671. The certificate must be signed by three competent persons (or by one person fulfilling all three roles):
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Designer:</strong> Confirms that the design of the installation complies with BS 7671</li>
                  <li className="pl-1"><strong>Installer (constructor):</strong> Confirms that the installation has been constructed in accordance with the design</li>
                  <li className="pl-1"><strong>Inspector/tester:</strong> Confirms that the installation has been inspected and tested in accordance with BS 7671 Part 6</li>
                </ul>
                <p className="text-sm text-white mt-3">
                  The EIC must be accompanied by a Schedule of Inspections and a Schedule of Test Results for every circuit in the installation.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Minor Electrical Installation Works Certificate</h3>
                <p className="text-sm text-white mb-3">
                  The Minor Works Certificate is appropriate for small-scale work that does not include the provision of a new circuit. Typical examples include adding a socket outlet to an existing circuit, replacing a light fitting, or installing a fused connection unit. The certificate requires only one signature — the person who designed, installed, inspected, and tested the minor work.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Adding a socket outlet or lighting point to an existing circuit</li>
                  <li className="pl-1">Replacing accessories such as switches, socket outlets, or fused connection units</li>
                  <li className="pl-1">Like-for-like replacement of a consumer unit (though some competent person schemes now require an EIC for this work)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Installation Condition Report (EICR)</h3>
                <p className="text-sm text-white mb-3">
                  The EICR is used to report on the condition of an existing electrical installation. It does not certify new work — it assesses whether the installation is safe for continued use. The report uses a classification coding system to categorise observations:
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>C1 — Danger present:</strong> Risk of injury. Immediate remedial action required</li>
                  <li className="pl-1"><strong>C2 — Potentially dangerous:</strong> Urgent remedial action required</li>
                  <li className="pl-1"><strong>C3 — Improvement recommended:</strong> Not immediately dangerous but improvement would enhance safety</li>
                  <li className="pl-1"><strong>FI — Further investigation:</strong> Investigation required without delay to determine the nature and extent of the deficiency</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The selection of the correct certificate type is not discretionary. Using a Minor Works Certificate for work that requires an EIC, or failing to issue any certificate at all, is a breach of BS 7671 and potentially a regulatory offence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Handover Documentation and As-Built Records
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The handover process marks the formal transfer of responsibility for the completed work from the contractor or maintenance team to the client or duty holder. A thorough handover ensures that the receiving party has all the information needed to operate, maintain, and manage the electrical installation safely and effectively. Incomplete handover documentation is one of the most common sources of problems in ongoing maintenance — missing drawings, absent test records, and unknown modification histories make future work more difficult, more time-consuming, and potentially more dangerous.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Documentation Pack — Contents</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Electrical certificates:</strong> EIC, Minor Works Certificates, or EICR as appropriate, with all accompanying schedules</li>
                <li className="pl-1"><strong>As-built drawings:</strong> Schematic diagrams, distribution board schedules, cable route drawings, and layout drawings updated to reflect the actual installation</li>
                <li className="pl-1"><strong>Test results:</strong> Full Schedule of Test Results, functional test records, and commissioning data</li>
                <li className="pl-1"><strong>Operation and maintenance manuals:</strong> Manufacturer's documentation for all installed equipment, including operating instructions, maintenance schedules, and spare parts lists</li>
                <li className="pl-1"><strong>Warranty information:</strong> Product warranties, extended warranty certificates, and warranty conditions</li>
                <li className="pl-1"><strong>Risk assessments and method statements:</strong> Relevant documents for ongoing maintenance activities</li>
                <li className="pl-1"><strong>Training records:</strong> Evidence that operators have been trained on the installed systems where applicable</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">As-Built Drawings — Why They Matter</h3>
              <p className="text-sm text-white mb-3">
                Design drawings show what was intended; as-built drawings show what was actually installed. During construction or maintenance, variations from the original design are common — cable routes may change due to unforeseen obstacles, equipment locations may shift, additional circuits may be added, or protective device ratings may be adjusted. If these changes are not captured in updated drawings, future maintenance technicians will be working from inaccurate information.
              </p>
              <p className="text-sm text-white">
                The consequences of inaccurate drawings can be severe: incorrect circuit identification leading to work on live conductors, inability to locate cables before drilling or excavating, wrong protective device settings after a replacement, or failure to account for circuits during an isolation procedure. Every modification, no matter how small, should be marked up and incorporated into the as-built drawing set.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">CDM 2015 Health and Safety File</p>
              <p className="text-sm text-white">
                For projects falling under the Construction (Design and Management) Regulations 2015, electrical documentation must be included in the health and safety file compiled by the principal designer. This file is a living document that should be updated throughout the life of the building and passed on whenever the building changes hands. It must contain information about the design, construction, and maintenance of the electrical installation that will be needed by anyone carrying out future work on the building.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Sign-Off Procedures and Responsibilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The sign-off process is more than just putting a signature on a piece of paper. It is a formal declaration that the signatory is satisfied that the work within their scope of responsibility has been completed correctly and in compliance with the relevant standards. Signing a certificate carries significant legal and professional responsibility — the signatory is personally accountable for the accuracy of the information on the certificate and the quality of the work they are certifying.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Who Can Sign?</h3>
                <p className="text-sm text-white mb-3">
                  Only competent persons can sign electrical certificates. Competence in this context means having the appropriate knowledge, skills, and experience for the specific aspect of work being certified. BS 7671 and the relevant guidance notes provide detailed requirements for the competence of designers, installers, and inspectors/testers.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Designer:</strong> Must have adequate knowledge of electrical design principles, BS 7671, and the specific application</li>
                  <li className="pl-1"><strong>Installer:</strong> Must be a skilled person (electrically) or be adequately supervised by a skilled person</li>
                  <li className="pl-1"><strong>Inspector/tester:</strong> Must hold a recognised inspection and testing qualification (e.g., City & Guilds 2391/2394/2395 or equivalent) and have experience of the type of installation being inspected</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">The Sign-Off Process</h3>
                <p className="text-sm text-white">
                  Before signing, each signatory must satisfy themselves that the work within their responsibility has been completed to the required standard. For the inspector/tester, this means personally conducting or supervising the inspection and testing — not simply reviewing paperwork completed by someone else. The sign-off should follow a clear process: review of all documentation, physical verification where appropriate, resolution of any outstanding issues or deficiencies, and formal signature with date. Any conditions, limitations, or reservations should be clearly noted on the certificate.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Party Sign-Off</h3>
                <p className="text-sm text-white">
                  On larger projects, the sign-off process involves multiple parties: the electrical contractor's competent persons, the principal contractor, the client's representative, and potentially building control or the competent person scheme. Each party signs off on their area of responsibility in a defined sequence. Delays in this process can hold up project completion, so proactive management of the sign-off chain is important. Digital documentation systems can expedite this by allowing remote review and electronic signature.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Professional responsibility:</strong> Never sign a certificate for work you have not personally verified. Signing a certificate you know to be inaccurate, or signing for work that has not been properly completed, is professional misconduct. It also creates personal legal liability in the event of an incident resulting from the certified work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Record Keeping and Document Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective record keeping extends beyond the initial certification. Electrical documentation forms a living record that grows throughout the life of the installation, capturing every inspection, test, modification, and repair. A well-maintained documentation system enables efficient maintenance planning, rapid fault diagnosis, compliance demonstration, and informed decision-making about equipment replacement and upgrade.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Records for Ongoing Maintenance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Original certificates:</strong> EIC, Minor Works, and EICR from initial installation and all subsequent work</li>
                <li className="pl-1"><strong>Maintenance logbook:</strong> Chronological record of all maintenance activities, inspections, tests, and repairs</li>
                <li className="pl-1"><strong>Test result trends:</strong> Historical insulation resistance, earth fault loop impedance, and RCD operation times to identify deterioration trends</li>
                <li className="pl-1"><strong>Modification register:</strong> Record of all modifications to the original installation, with reasons, authorisation, and updated drawings</li>
                <li className="pl-1"><strong>Fault/incident log:</strong> Record of all faults, failures, and incidents with root cause analysis and corrective actions taken</li>
                <li className="pl-1"><strong>Equipment inventory:</strong> List of all major items of electrical equipment with specifications, installation dates, and expected life</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Digital vs Paper Documentation</h3>
              <p className="text-sm text-white">
                The shift from paper-based to digital documentation systems is well underway in the electrical industry. Digital systems offer powerful advantages: automatic backup and disaster recovery, instant searchability, trend analysis of test results over time, integration with maintenance management systems, and easy distribution to stakeholders. Mobile devices allow technicians to complete documentation on site, attach photographs, and submit records in real time. However, digital systems must be properly managed — they require robust access controls, regular backups, data integrity checks, and compliance with data protection legislation. Whatever system is used, the fundamental requirement remains the same: accurate, complete, and retrievable records.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Retention and Transfer of Records</h3>
              <p className="text-sm text-white">
                Electrical records should be retained for the lifetime of the installation. When a property changes ownership, the documentation pack should be transferred to the new duty holder as part of the handover process. For commercial properties, this is typically managed through the property transaction process. For domestic properties, the homeowner should receive all certificates and retain them with their property documents. Lost certificates can sometimes be recovered from the issuing contractor, the competent person scheme, or local authority building control, but prevention through proper record keeping is always preferable to retrospective recovery.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in maintaining accurate maintenance records, using documentation systems, and contributing to continuous improvement through proper record keeping. Your ability to demonstrate thorough documentation practices is assessed as part of the end-point assessment.
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
                <p className="font-medium text-white mb-1">Certificate Selection Guide</p>
                <ul className="space-y-0.5">
                  <li>New installation or new circuit → EIC</li>
                  <li>Minor work, no new circuit → Minor Works</li>
                  <li>Condition assessment of existing installation → EICR</li>
                  <li>All certificates must include Schedule of Test Results</li>
                  <li>EIC requires three signatures (design, install, inspect/test)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Handover Essentials</p>
                <ul className="space-y-0.5">
                  <li>As-built drawings (not design drawings)</li>
                  <li>All electrical certificates and test schedules</li>
                  <li>Operation and maintenance manuals</li>
                  <li>Warranty documentation</li>
                  <li>Training records for operators</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Assembly Techniques
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section4">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section4_5;