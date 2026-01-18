import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Generating Test Reports - Fibre Optics Technology";
const DESCRIPTION = "Learn professional documentation practices for fibre optic test reports including OTDR trace storage, certification requirements, client deliverables, and record retention standards.";

const quickCheckQuestions = [
  {
    id: "reports-qc1",
    question: "What is the minimum information that must be included in a fibre test report?",
    options: [
      "Just the pass/fail result",
      "Test date, technician name, and equipment used",
      "Project details, test parameters, results, equipment calibration dates, and technician certification",
      "Only OTDR traces"
    ],
    correctIndex: 2,
    explanation: "Professional fibre test reports must include comprehensive information: project identification, test parameters, measured results, equipment details including calibration dates, and the testing technician's qualifications to ensure traceability and validity."
  },
  {
    id: "reports-qc2",
    question: "What is the recommended naming convention for OTDR trace files?",
    options: [
      "Random numbers for security",
      "Date only",
      "Project-cable-fibre-direction-date format",
      "Technician initials only"
    ],
    correctIndex: 2,
    explanation: "A systematic naming convention like Project-Cable-Fibre-Direction-Date ensures traces can be easily identified, organised, and retrieved. This typically includes: project code, cable ID, fibre number, test direction (A-B or B-A), and test date."
  },
  {
    id: "reports-qc3",
    question: "How long should fibre optic test records typically be retained?",
    options: [
      "6 months",
      "1 year",
      "Duration of warranty plus 7 years minimum, often longer for infrastructure",
      "No requirement exists"
    ],
    correctIndex: 2,
    explanation: "Test records should be retained for the warranty period plus at least 7 years. Critical infrastructure projects may require longer retention (20+ years). Records prove installation quality for warranty claims and future troubleshooting."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What distinguishes a certification report from a characterisation report?",
    options: [
      "Certification is for singlemode only",
      "Certification provides pass/fail against standards, characterisation provides detailed diagnostic data",
      "They are identical documents",
      "Characterisation is required by law"
    ],
    correctAnswer: 1,
    explanation: "Certification reports provide pass/fail results against defined standards, while characterisation reports include detailed OTDR analysis with individual event data for diagnostics."
  },
  {
    id: 2,
    question: "Which file format is standard for OTDR trace storage?",
    options: [
      "PDF only",
      "SOR (Standard OTDR Record) format per SR-4731",
      "JPEG images",
      "Plain text files"
    ],
    correctAnswer: 1,
    explanation: "The SOR (Standard OTDR Record) format defined by Telcordia SR-4731 is the industry standard for OTDR traces, ensuring cross-platform compatibility and complete data preservation."
  },
  {
    id: 3,
    question: "What information should the report header contain?",
    options: [
      "Test results only",
      "Project name, client, location, date, and testing company details",
      "Equipment serial numbers only",
      "Fibre counts only"
    ],
    correctAnswer: 1,
    explanation: "Report headers must include complete project identification, client details, site location, test date, and testing company information for proper documentation and traceability."
  },
  {
    id: 4,
    question: "Why must equipment calibration dates be included in reports?",
    options: [
      "For insurance purposes only",
      "To verify measurements were taken with properly calibrated equipment within valid calibration period",
      "It's optional information",
      "Only for OTDR equipment"
    ],
    correctAnswer: 1,
    explanation: "Calibration dates verify that test equipment was within its valid calibration period when measurements were taken, ensuring accuracy and validity of results."
  },
  {
    id: 5,
    question: "What should be included in client deliverables package?",
    options: [
      "Summary report only",
      "Summary report, detailed results, OTDR traces (SOR files), splice records, and as-built drawings",
      "Invoice only",
      "Equipment manuals"
    ],
    correctAnswer: 1,
    explanation: "A complete deliverables package includes all documentation needed for the client to understand, verify, and maintain the installation throughout its operational life."
  },
  {
    id: 6,
    question: "How should test data be backed up?",
    options: [
      "Single copy on tester is sufficient",
      "Multiple copies in different locations using 3-2-1 backup strategy",
      "Paper copies only",
      "No backup required"
    ],
    correctAnswer: 1,
    explanation: "The 3-2-1 backup strategy (3 copies, 2 media types, 1 offsite) protects against data loss and ensures long-term availability of critical test records."
  },
  {
    id: 7,
    question: "What wavelengths must typically be documented for singlemode certification?",
    options: [
      "850nm only",
      "1310nm and 1550nm minimum, often 1625nm for PON",
      "Any single wavelength",
      "Visible light only"
    ],
    correctAnswer: 1,
    explanation: "Singlemode certification requires testing at 1310nm and 1550nm minimum. PON applications often require 1625nm testing as well for complete wavelength coverage."
  },
  {
    id: 8,
    question: "What regulatory standard governs fibre testing documentation in Australia?",
    options: [
      "No standards exist",
      "AS/CA S008 and S009 for telecommunications cabling",
      "Only manufacturer guidelines",
      "Building codes only"
    ],
    correctAnswer: 1,
    explanation: "AS/CA S008 (requirements for customer cabling products) and S009 (installation requirements) are the Australian standards governing telecommunications cabling documentation."
  },
  {
    id: 9,
    question: "When should test reports be generated?",
    options: [
      "Only if client requests them",
      "Immediately after testing while data is fresh and before leaving site",
      "Within one year of testing",
      "Only for failed tests"
    ],
    correctAnswer: 1,
    explanation: "Reports should be generated immediately after testing while information is fresh, ensuring accuracy and enabling prompt identification of any issues requiring remediation."
  },
  {
    id: 10,
    question: "What must be documented when a fibre fails testing?",
    options: [
      "Delete the record and re-test",
      "Failure details, root cause if known, remediation actions, and re-test results",
      "Nothing - failures are not reported",
      "Only the final passing result"
    ],
    correctAnswer: 1,
    explanation: "Complete documentation of failures, remediation, and successful re-tests demonstrates quality assurance and provides valuable troubleshooting data for future reference."
  }
];

const faqs = [
  {
    question: "What software should I use for generating fibre test reports?",
    answer: "Most professional OTDR and certification testers include companion software (e.g., Fluke LinkWare, VIAVI StrataSync, EXFO FastReporter). These import native test data and generate formatted reports. Cloud-based platforms enable team collaboration and centralised storage. Choose software that maintains data integrity and exports to standard formats (PDF, SOR)."
  },
  {
    question: "How do I handle tests that initially fail but pass after rework?",
    answer: "Document the complete history: original test showing failure, description of fault found, remediation performed (re-splice, re-terminate, etc.), and final passing test. This demonstrates quality assurance process and provides valuable troubleshooting data for future reference. Never delete failed test records."
  },
  {
    question: "What's the difference between Tier 1 and Tier 2 certification?",
    answer: "Tier 1 (Basic) certification uses insertion loss testing with pass/fail results against standards. Tier 2 (Extended) adds OTDR testing for complete link characterisation including event location, splice loss, and reflectance. Many specifications now require Tier 2 for infrastructure installations."
  },
  {
    question: "How should I organise OTDR traces for a large project?",
    answer: "Use a hierarchical folder structure: Project > Building/Area > Cable/Route > Individual fibres. Maintain consistent file naming with meaningful identifiers. Include a master index spreadsheet linking physical locations to file names. Back up regularly and verify file integrity."
  },
  {
    question: "What if my client doesn't request test reports?",
    answer: "Generate and retain reports regardless of client requests. They protect you legally by proving work quality, support warranty claims, aid future troubleshooting, and demonstrate professional practice. The cost of documentation is minimal compared to potential liability without it."
  },
  {
    question: "How do I ensure report authenticity and prevent tampering?",
    answer: "Use software that embeds digital signatures and timestamps. Export to PDF/A format for long-term archiving. Maintain secure backup systems with access controls. Some platforms provide blockchain-verified records. Keep original SOR files - they contain embedded metadata that's difficult to falsify."
  }
];

const FiberOpticsModule5Section6 = () => {
  useSEO({
    title: TITLE,
    description: DESCRIPTION,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5 Section 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Generating Test Reports
          </h1>
          <p className="text-white/80">
            Professional documentation practices for fibre optic installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Reports:</strong> Permanent record of installation quality</li>
              <li><strong>Contents:</strong> Project info, parameters, results, calibration</li>
              <li><strong>Timing:</strong> Generate immediately after testing</li>
              <li><strong>Retention:</strong> Warranty period plus 7+ years</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> SOR files for OTDR traces (industry standard)</li>
              <li><strong>Use:</strong> 3-2-1 backup strategy for all test data</li>
              <li><strong>Remember:</strong> Never delete failed test records</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Report content requirements and standards",
              "Software and data management workflows",
              "OTDR trace storage and naming conventions",
              "Certification vs characterisation reports",
              "Client deliverables and handover packages",
              "Record retention requirements and best practices"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Report Content Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Report Content Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional fibre optic test reports must contain comprehensive information that
              enables verification, traceability, and future reference. Reports serve as legal
              documents proving installation quality and compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential report elements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Project identification:</strong> Client name, project name/number, site address, building/area</li>
                <li><strong>Test information:</strong> Date, time, test type (certification/characterisation), standards applied</li>
                <li><strong>Link identification:</strong> Cable ID, fibre number, endpoints (A and B locations)</li>
                <li><strong>Test parameters:</strong> Wavelengths, test limits, reference values, test method</li>
                <li><strong>Results:</strong> Measured values, pass/fail status, margin to limit</li>
                <li><strong>Equipment details:</strong> Make, model, serial number, calibration date, next calibration due</li>
                <li><strong>Personnel:</strong> Technician name, certification/licence number, signature</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Australian Standards Reference</p>
              <p className="text-sm text-white">
                Reports should reference applicable standards: AS/CA S008 (requirements for customer
                cabling products), AS/CA S009 (installation requirements), AS/NZS 3080 (telecommunications
                pathways and spaces). Include the specific clauses tested against and the acceptance
                criteria applied.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Software and Data Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Software and Data Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern test equipment generates digital data that must be properly managed, backed up,
              and converted into professional reports. The right software workflow ensures data
              integrity and efficient report generation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common reporting software:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Fluke LinkWare PC/Live:</strong> For Fluke testers, cloud-enabled, team management</li>
                <li><strong>VIAVI StrataSync:</strong> Cloud platform for VIAVI equipment, centralised data</li>
                <li><strong>EXFO FastReporter:</strong> Comprehensive analysis for EXFO OTDRs</li>
                <li><strong>AFL TRM:</strong> Test Results Manager for AFL equipment</li>
                <li><strong>Generic viewers:</strong> SOR file viewers for cross-platform compatibility</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Data management workflow:</p>
              <ol className="text-sm text-white space-y-1 ml-4 list-decimal list-inside">
                <li><strong>Capture:</strong> Save all tests on instrument with proper naming</li>
                <li><strong>Transfer:</strong> Upload to PC/cloud same day if possible</li>
                <li><strong>Verify:</strong> Check all files transferred successfully</li>
                <li><strong>Organise:</strong> Sort into project folder structure</li>
                <li><strong>Analyse:</strong> Review results, identify any issues</li>
                <li><strong>Generate:</strong> Create reports using software templates</li>
                <li><strong>Backup:</strong> Store copies in multiple locations</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">3-2-1 Backup Strategy</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>3 copies:</strong> Keep at least three copies of all data</li>
                <li><strong>2 media types:</strong> Store on different media (local + cloud)</li>
                <li><strong>1 offsite:</strong> Keep one copy in a different physical location</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: OTDR Trace Storage and Naming */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            OTDR Trace Storage and Naming
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              OTDR traces are the detailed diagnostic records of each fibre link. Proper storage
              and consistent naming conventions ensure traces can be retrieved and understood
              years after the original testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">SOR file format:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Standard format:</strong> SOR (Standard OTDR Record) per Telcordia SR-4731</li>
                <li><strong>Industry standard:</strong> Readable by most OTDR analysis software</li>
                <li><strong>Complete data:</strong> Contains raw trace data, settings, events, analysis</li>
                <li><strong>Metadata:</strong> Embedded test parameters, timestamps, equipment info</li>
                <li><strong>Long-term storage:</strong> Binary format suitable for archival</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended naming convention:</p>
              <p className="text-sm text-white font-mono bg-white/5 p-2 rounded mb-2">
                [Project]-[Cable]-[Fibre]-[Direction]-[Wavelength]-[Date].sor
              </p>
              <p className="text-sm text-white mb-2">
                Example: BLDG42-BC03-F12-AB-1310-20240115.sor
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Project:</strong> Unique project identifier or building code</li>
                <li><strong>Cable:</strong> Backbone cable or route identifier</li>
                <li><strong>Fibre:</strong> Individual fibre number within cable</li>
                <li><strong>Direction:</strong> Test direction (AB = A to B, BA = B to A)</li>
                <li><strong>Wavelength:</strong> Test wavelength (1310, 1550, 1625)</li>
                <li><strong>Date:</strong> Test date in YYYYMMDD format</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Bidirectional testing:</p>
              <p className="text-sm text-white">
                Always save traces from both directions for each fibre. Bidirectional traces enable
                accurate averaging and reveal directional-dependent events like gainers. Name files
                clearly to indicate direction (AB vs BA) and ensure pairs are easily matched.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Certification vs Characterisation Reports */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Certification vs Characterisation Reports
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding the difference between certification and characterisation reports is
              essential for meeting project specifications and client expectations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Certification (Tier 1):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Pass/fail against defined standards</li>
                <li>Insertion loss measurement</li>
                <li>Length verification</li>
                <li>Polarity confirmation</li>
                <li>End-to-end performance verification</li>
                <li>Suitable for acceptance testing</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Characterisation (Tier 2):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete OTDR analysis</li>
                <li>Individual event identification</li>
                <li>Splice loss values for each splice</li>
                <li>Connector reflectance measurements</li>
                <li>Distance to every event</li>
                <li>Required for infrastructure installations</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When each report type is required:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Tier 1 only:</strong> Premises cabling, short horizontal runs, basic compliance verification</li>
                <li><strong>Tier 2 only:</strong> Backbone installations, outside plant, data centres, critical infrastructure</li>
                <li><strong>Combined Tier 1 + 2:</strong> Most commercial projects now specify both levels</li>
                <li><strong>Extended testing:</strong> High-speed applications may require additional parameters (PMD, chromatic dispersion)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Client Deliverables and Handover */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Client Deliverables and Handover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The handover package represents the culmination of your professional work. A comprehensive
              deliverables package demonstrates quality, supports the client's ongoing operations,
              and protects all parties.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standard deliverables package:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Executive summary:</strong> Overall pass/fail, fibre count, project scope, key findings</li>
                <li><strong>Detailed test report:</strong> Individual results for every fibre tested</li>
                <li><strong>OTDR traces:</strong> SOR files organised by route/cable, plus PDF exports</li>
                <li><strong>Splice records:</strong> Loss values for each splice, fusion splicer logs</li>
                <li><strong>As-built drawings:</strong> Updated cable routes, panel layouts, labelling scheme</li>
                <li><strong>Equipment list:</strong> Testers used, calibration certificates</li>
                <li><strong>Warranty documentation:</strong> Installer warranty, material warranties</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Handover meeting checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Review results:</strong> Walk through summary and any notable findings</li>
                <li><strong>Explain documentation:</strong> Show how to navigate reports and traces</li>
                <li><strong>Demonstrate software:</strong> If providing analysis software access</li>
                <li><strong>Discuss warranties:</strong> Coverage period and claim procedures</li>
                <li><strong>Obtain sign-off:</strong> Client acceptance of deliverables</li>
                <li><strong>Contact information:</strong> Support contacts for questions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Record Retention Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Record Retention Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test records must be retained for extended periods to support warranty claims, future
              troubleshooting, and potential legal requirements. Proper retention policies protect
              your business and serve your clients.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Minimum retention periods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>General installations:</strong> Warranty period + 7 years minimum</li>
                <li><strong>Critical infrastructure:</strong> 20+ years (life of installation)</li>
                <li><strong>Government/defence:</strong> As specified in contract, often 25+ years</li>
                <li><strong>Healthcare facilities:</strong> Facility operational life</li>
                <li><strong>Data centres:</strong> Installation life plus contractual period</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why long-term retention matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Warranty claims:</strong> Original test data proves installation was correct</li>
                <li><strong>Troubleshooting:</strong> Compare current tests to baseline data</li>
                <li><strong>Liability protection:</strong> Evidence of professional installation standards</li>
                <li><strong>Upgrades:</strong> Existing test data aids capacity planning</li>
                <li><strong>Asset transfer:</strong> Documentation adds value to property</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Long-term storage best practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Use stable formats:</strong> SOR for traces, PDF/A for reports (archival standard)</li>
                <li><strong>Multiple locations:</strong> On-premise + cloud storage in different regions</li>
                <li><strong>Regular verification:</strong> Check file integrity annually</li>
                <li><strong>Migration planning:</strong> Update storage media before obsolescence</li>
                <li><strong>Access security:</strong> Maintain access controls and audit logs</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Report Generation Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Generate reports immediately while still on site or same day</li>
                <li>Verify completeness - check all fibres tested before leaving</li>
                <li>Review for errors and proofread before client delivery</li>
                <li>Use templates for consistent formatting</li>
                <li>Include context - photos of installation, cable routes, equipment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missing calibration dates</strong> - always record equipment calibration status</li>
                <li><strong>Inconsistent naming</strong> - establish convention before testing starts</li>
                <li><strong>Incomplete records</strong> - test all fibres, both directions</li>
                <li><strong>Poor organisation</strong> - disorganised files are useless for retrieval</li>
                <li><strong>No backup</strong> - single copy on tester is not sufficient</li>
                <li><strong>Deleting failed tests</strong> - never delete failure records, document remediation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Maintain a calibration calendar for all test equipment</li>
                <li>Keep template reports updated with current standards</li>
                <li>Train team members on consistent documentation practices</li>
                <li>Archive completed projects promptly with proper indexing</li>
                <li>Review client feedback to improve documentation quality</li>
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

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Test Report Essentials</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Report Must Include</p>
                <ul className="space-y-0.5">
                  <li>Project and client identification</li>
                  <li>Test date, time, and technician</li>
                  <li>Equipment details and calibration</li>
                  <li>Test parameters and standards</li>
                  <li>Results with pass/fail status</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">File Management</p>
                <ul className="space-y-0.5">
                  <li>Use consistent naming convention</li>
                  <li>Save SOR files for OTDR traces</li>
                  <li>Backup using 3-2-1 strategy</li>
                  <li>Retain for warranty + 7 years</li>
                  <li>Organise by project/location</li>
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

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../../module-6">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default FiberOpticsModule5Section6;
