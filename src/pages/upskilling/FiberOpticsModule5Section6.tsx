import { useState } from "react";
import { ArrowLeft, Zap, CheckCircle, ChevronDown, FileText, Database, FolderOpen, Award, Users, Clock, BookOpen, Shield, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Generating Test Reports - Fiber Optics Technology";
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
    question: "What distinguishes a certification report from a characterisation report?",
    options: [
      "Certification is for singlemode only",
      "Certification provides pass/fail against standards, characterisation provides detailed diagnostic data",
      "They are identical documents",
      "Characterisation is required by law"
    ],
    correctAnswer: 1
  },
  {
    question: "Which file format is standard for OTDR trace storage?",
    options: [
      "PDF only",
      "SOR (Standard OTDR Record) format per SR-4731",
      "JPEG images",
      "Plain text files"
    ],
    correctAnswer: 1
  },
  {
    question: "What information should the report header contain?",
    options: [
      "Test results only",
      "Project name, client, location, date, and testing company details",
      "Equipment serial numbers only",
      "Fibre counts only"
    ],
    correctAnswer: 1
  },
  {
    question: "Why must equipment calibration dates be included in reports?",
    options: [
      "For insurance purposes only",
      "To verify measurements were taken with properly calibrated equipment within valid calibration period",
      "It's optional information",
      "Only for OTDR equipment"
    ],
    correctAnswer: 1
  },
  {
    question: "What should be included in client deliverables package?",
    options: [
      "Summary report only",
      "Summary report, detailed results, OTDR traces (SOR files), splice records, and as-built drawings",
      "Invoice only",
      "Equipment manuals"
    ],
    correctAnswer: 1
  },
  {
    question: "How should test data be backed up?",
    options: [
      "Single copy on tester is sufficient",
      "Multiple copies in different locations using 3-2-1 backup strategy",
      "Paper copies only",
      "No backup required"
    ],
    correctAnswer: 1
  },
  {
    question: "What wavelengths must typically be documented for singlemode certification?",
    options: [
      "850nm only",
      "1310nm and 1550nm minimum, often 1625nm for PON",
      "Any single wavelength",
      "Visible light only"
    ],
    correctAnswer: 1
  },
  {
    question: "What regulatory standard governs fibre testing documentation in Australia?",
    options: [
      "No standards exist",
      "AS/CA S008 and S009 for telecommunications cabling",
      "Only manufacturer guidelines",
      "Building codes only"
    ],
    correctAnswer: 1
  },
  {
    question: "When should test reports be generated?",
    options: [
      "Only if client requests them",
      "Immediately after testing while data is fresh and before leaving site",
      "Within one year of testing",
      "Only for failed tests"
    ],
    correctAnswer: 1
  },
  {
    question: "What must be documented when a fibre fails testing?",
    options: [
      "Delete the record and re-test",
      "Failure details, root cause if known, remediation actions, and re-test results",
      "Nothing - failures are not reported",
      "Only the final passing result"
    ],
    correctAnswer: 1
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

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module5"
            className="flex items-center gap-2 text-white/70 hover:text-white active:scale-[0.98] touch-manipulation min-h-[44px]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Module 5</span>
          </Link>
          <span className="text-xs text-white/40 hidden sm:block">Section 6 of 6</span>
        </div>
      </header>

      <main className="pt-20 pb-24 px-4 max-w-4xl mx-auto">
        {/* Module Number Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-elec-yellow">
            <CheckCircle className="w-4 h-4" />
            Module 5 - Section 6
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Generating Test Reports
        </h1>

        {/* Quick Summary Card */}
        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-5 border border-blue-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Professional test reports are the permanent record of installation quality. They must include
            complete project information, test parameters, measured results, equipment calibration status,
            and technician qualifications. Proper documentation protects all parties, supports warranty
            claims, and enables future troubleshooting. Reports should be generated immediately after
            testing and retained for the life of the installation.
          </p>
        </div>

        {/* Spot it / Use it Card */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl p-5 border border-indigo-500/20 mb-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-indigo-400 mb-2">Report Components</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Summary with pass/fail status</li>
                <li>- Detailed test results per fibre</li>
                <li>- OTDR traces in SOR format</li>
                <li>- Equipment and calibration data</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">Client Expectations</h3>
              <ul className="text-white/70 text-sm space-y-1">
                <li>- Professional formatted documents</li>
                <li>- Complete data package</li>
                <li>- Digital and physical copies</li>
                <li>- Warranty documentation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            What You'll Learn
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Report content requirements",
              "Software and data management",
              "OTDR trace storage and naming",
              "Certification vs characterisation",
              "Client deliverables and handover",
              "Record retention requirements"
            ].map((outcome, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <span className="text-sm text-white/80">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 1: Report Content Requirements */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">01</span>
            </div>
            <h2 className="text-xl font-bold">Report Content Requirements</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Professional fibre optic test reports must contain comprehensive information that
              enables verification, traceability, and future reference. Reports serve as legal
              documents proving installation quality and compliance.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Essential Report Elements
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Project identification:</strong> Client name, project name/number, site address, building/area</li>
                <li><strong>Test information:</strong> Date, time, test type (certification/characterisation), standards applied</li>
                <li><strong>Link identification:</strong> Cable ID, fibre number, endpoints (A and B locations)</li>
                <li><strong>Test parameters:</strong> Wavelengths, test limits, reference values, test method</li>
                <li><strong>Results:</strong> Measured values, pass/fail status, margin to limit</li>
                <li><strong>Equipment details:</strong> Make, model, serial number, calibration date, next calibration due</li>
                <li><strong>Personnel:</strong> Technician name, certification/licence number, signature</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Report Header Information</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-white/70">
                <div>
                  <p className="text-blue-300 font-medium mb-1">Company Details</p>
                  <ul className="space-y-1">
                    <li>- Testing company name</li>
                    <li>- ABN/ACN number</li>
                    <li>- Contact details</li>
                    <li>- Licence/registration numbers</li>
                  </ul>
                </div>
                <div>
                  <p className="text-indigo-300 font-medium mb-1">Project Details</p>
                  <ul className="space-y-1">
                    <li>- Client/principal contractor</li>
                    <li>- Project reference number</li>
                    <li>- Site location details</li>
                    <li>- Specification reference</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Australian Standards Reference</h4>
              <p className="text-sm text-white/80">
                Reports should reference applicable standards: AS/CA S008 (requirements for customer
                cabling products), AS/CA S009 (installation requirements), AS/NZS 3080 (telecommunications
                pathways and spaces). Include the specific clauses tested against and the acceptance
                criteria applied.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Software and Data Management */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">02</span>
            </div>
            <h2 className="text-xl font-bold">Software and Data Management</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Modern test equipment generates digital data that must be properly managed, backed up,
              and converted into professional reports. The right software workflow ensures data
              integrity and efficient report generation.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                Common Reporting Software
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Fluke LinkWare PC/Live:</strong> For Fluke testers, cloud-enabled, team management</li>
                <li><strong>VIAVI StrataSync:</strong> Cloud platform for VIAVI equipment, centralised data</li>
                <li><strong>EXFO FastReporter:</strong> Comprehensive analysis for EXFO OTDRs</li>
                <li><strong>AFL TRM:</strong> Test Results Manager for AFL equipment</li>
                <li><strong>Generic viewers:</strong> SOR file viewers for cross-platform compatibility</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Data Management Workflow</h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Capture:</strong> Save all tests on instrument with proper naming</li>
                <li><strong>2. Transfer:</strong> Upload to PC/cloud same day if possible</li>
                <li><strong>3. Verify:</strong> Check all files transferred successfully</li>
                <li><strong>4. Organise:</strong> Sort into project folder structure</li>
                <li><strong>5. Analyse:</strong> Review results, identify any issues</li>
                <li><strong>6. Generate:</strong> Create reports using software templates</li>
                <li><strong>7. Backup:</strong> Store copies in multiple locations</li>
              </ol>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">3-2-1 Backup Strategy</h4>
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <p className="text-blue-400 font-semibold mb-1">3 Copies</p>
                  <p className="text-white/60 text-xs">Keep at least three copies of all data</p>
                </div>
                <div className="bg-indigo-500/10 rounded-lg p-3">
                  <p className="text-indigo-400 font-semibold mb-1">2 Media Types</p>
                  <p className="text-white/60 text-xs">Store on different media (local + cloud)</p>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold mb-1">1 Offsite</p>
                  <p className="text-white/60 text-xs">Keep one copy in different location</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-2">Data Security Considerations</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>- Encrypt sensitive project data at rest and in transit</li>
                <li>- Use secure cloud platforms with proper access controls</li>
                <li>- Maintain access logs for regulatory compliance</li>
                <li>- Consider client data privacy requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 1 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
        </div>

        {/* Section 3: OTDR Trace Storage and Naming */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">03</span>
            </div>
            <h2 className="text-xl font-bold">OTDR Trace Storage and Naming</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              OTDR traces are the detailed diagnostic records of each fibre link. Proper storage
              and consistent naming conventions ensure traces can be retrieved and understood
              years after the original testing.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-blue-400" />
                SOR File Format
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Standard format:</strong> SOR (Standard OTDR Record) per Telcordia SR-4731</li>
                <li><strong>Industry standard:</strong> Readable by most OTDR analysis software</li>
                <li><strong>Complete data:</strong> Contains raw trace data, settings, events, analysis</li>
                <li><strong>Metadata:</strong> Embedded test parameters, timestamps, equipment info</li>
                <li><strong>Long-term storage:</strong> Binary format suitable for archival</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Recommended Naming Convention</h4>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-sm mb-3">
                <p className="text-green-400">[Project]-[Cable]-[Fibre]-[Direction]-[Wavelength]-[Date]</p>
                <p className="text-white/60 mt-2">Example: BLDG42-BC03-F12-AB-1310-20240115.sor</p>
              </div>
              <ul className="text-sm text-white/70 space-y-1">
                <li><strong>Project:</strong> Unique project identifier or building code</li>
                <li><strong>Cable:</strong> Backbone cable or route identifier</li>
                <li><strong>Fibre:</strong> Individual fibre number within cable</li>
                <li><strong>Direction:</strong> Test direction (AB = A to B, BA = B to A)</li>
                <li><strong>Wavelength:</strong> Test wavelength (1310, 1550, 1625)</li>
                <li><strong>Date:</strong> Test date in YYYYMMDD format</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Folder Structure Example</h4>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-xs text-white/70">
                <p>ProjectName_2024/</p>
                <p className="ml-4">Building_A/</p>
                <p className="ml-8">Backbone_Riser/</p>
                <p className="ml-12">BC01_Level1-Level5/</p>
                <p className="ml-16">Fibre_01/</p>
                <p className="ml-16">Fibre_02/</p>
                <p className="ml-8">Horizontal_Level3/</p>
                <p className="ml-4">Building_B/</p>
                <p className="ml-4">Reports/</p>
                <p className="ml-4">Index_Master.xlsx</p>
              </div>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Bidirectional Testing</h4>
              <p className="text-sm text-white/80">
                Always save traces from both directions for each fibre. Bidirectional traces enable
                accurate averaging and reveal directional-dependent events like gainers. Name files
                clearly to indicate direction (AB vs BA) and ensure pairs are easily matched.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Certification vs Characterisation Reports */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">04</span>
            </div>
            <h2 className="text-xl font-bold">Certification vs Characterisation Reports</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Understanding the difference between certification and characterisation reports is
              essential for meeting project specifications and client expectations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Certification (Tier 1)
                </h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>- Pass/fail against standards</li>
                  <li>- Insertion loss measurement</li>
                  <li>- Length verification</li>
                  <li>- Polarity confirmation</li>
                  <li>- End-to-end performance</li>
                  <li>- Suitable for acceptance testing</li>
                </ul>
              </div>
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4" />
                  Characterisation (Tier 2)
                </h4>
                <ul className="text-sm space-y-1 text-white/70">
                  <li>- Complete OTDR analysis</li>
                  <li>- Individual event identification</li>
                  <li>- Splice loss values</li>
                  <li>- Connector reflectance</li>
                  <li>- Distance to events</li>
                  <li>- Required for infrastructure</li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">When Each Report Type is Required</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Tier 1 Certification:</strong> Premises cabling, short horizontal runs, basic compliance verification</li>
                <li><strong>Tier 2 Characterisation:</strong> Backbone installations, outside plant, data centres, critical infrastructure</li>
                <li><strong>Combined Tier 1 + 2:</strong> Most commercial projects now specify both levels</li>
                <li><strong>Extended testing:</strong> High-speed applications may require additional parameters (PMD, chromatic dispersion)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">Report Content Comparison</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-white/60">
                    <th className="pb-2">Element</th>
                    <th className="pb-2">Tier 1</th>
                    <th className="pb-2">Tier 2</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr>
                    <td className="py-1">Insertion Loss</td>
                    <td className="text-green-400">Yes</td>
                    <td className="text-green-400">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-1">Link Length</td>
                    <td className="text-green-400">Yes</td>
                    <td className="text-green-400">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-1">OTDR Trace</td>
                    <td className="text-red-400">No</td>
                    <td className="text-green-400">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-1">Event Analysis</td>
                    <td className="text-red-400">No</td>
                    <td className="text-green-400">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-1">Splice Loss</td>
                    <td className="text-red-400">No</td>
                    <td className="text-green-400">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quick Check 2 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
        </div>

        {/* Section 5: Client Deliverables and Handover */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">05</span>
            </div>
            <h2 className="text-xl font-bold">Client Deliverables and Handover</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              The handover package represents the culmination of your professional work. A comprehensive
              deliverables package demonstrates quality, supports the client's ongoing operations,
              and protects all parties.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                Standard Deliverables Package
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Executive Summary:</strong> Overall pass/fail, fibre count, project scope, key findings</li>
                <li><strong>Detailed Test Report:</strong> Individual results for every fibre tested</li>
                <li><strong>OTDR Traces:</strong> SOR files organised by route/cable, plus PDF exports</li>
                <li><strong>Splice Records:</strong> Loss values for each splice, fusion splicer logs</li>
                <li><strong>As-Built Drawings:</strong> Updated cable routes, panel layouts, labelling scheme</li>
                <li><strong>Equipment List:</strong> Testers used, calibration certificates</li>
                <li><strong>Warranty Documentation:</strong> Installer warranty, material warranties</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Deliverables Format</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-blue-300 font-medium mb-1">Digital Delivery</p>
                  <ul className="text-white/60 space-y-1">
                    <li>- PDF reports for viewing/printing</li>
                    <li>- Native SOR files for analysis</li>
                    <li>- USB drive or secure cloud link</li>
                    <li>- Searchable and indexed</li>
                  </ul>
                </div>
                <div>
                  <p className="text-indigo-300 font-medium mb-1">Physical Delivery</p>
                  <ul className="text-white/60 space-y-1">
                    <li>- Bound report document</li>
                    <li>- Cable labels and diagrams</li>
                    <li>- Site copy for O&M manual</li>
                    <li>- Sign-off documentation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Handover Meeting Checklist</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Review results:</strong> Walk through summary and any notable findings</li>
                <li><strong>Explain documentation:</strong> Show how to navigate reports and traces</li>
                <li><strong>Demonstrate software:</strong> If providing analysis software access</li>
                <li><strong>Discuss warranties:</strong> Coverage period and claim procedures</li>
                <li><strong>Obtain sign-off:</strong> Client acceptance of deliverables</li>
                <li><strong>Contact information:</strong> Support contacts for questions</li>
              </ul>
            </div>

            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/30">
              <h4 className="font-semibold text-elec-yellow mb-2">Client Expectations</h4>
              <p className="text-sm text-white/80">
                Clients expect professional, organised documentation that they can understand and use.
                Avoid excessive jargon, provide clear summaries, and ensure all test failures and
                remediation are clearly documented. The report should enable facility managers to
                understand the installation without needing specialised training.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Record Retention Requirements */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <span className="text-lg font-bold">06</span>
            </div>
            <h2 className="text-xl font-bold">Record Retention Requirements</h2>
          </div>

          <div className="space-y-4 text-white/80">
            <p>
              Test records must be retained for extended periods to support warranty claims, future
              troubleshooting, and potential legal requirements. Proper retention policies protect
              your business and serve your clients.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Minimum Retention Periods
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>General installations:</strong> Warranty period + 7 years minimum</li>
                <li><strong>Critical infrastructure:</strong> 20+ years (life of installation)</li>
                <li><strong>Government/defence:</strong> As specified in contract, often 25+ years</li>
                <li><strong>Healthcare facilities:</strong> Facility operational life</li>
                <li><strong>Data centres:</strong> Installation life plus contractual period</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-3">Why Long-Term Retention Matters</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Warranty claims:</strong> Original test data proves installation was correct</li>
                <li><strong>Troubleshooting:</strong> Compare current tests to baseline data</li>
                <li><strong>Liability protection:</strong> Evidence of professional installation standards</li>
                <li><strong>Upgrades:</strong> Existing test data aids capacity planning</li>
                <li><strong>Asset transfer:</strong> Documentation adds value to property</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                Long-Term Storage Best Practices
              </h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Use stable formats:</strong> SOR for traces, PDF/A for reports (archival standard)</li>
                <li><strong>Multiple locations:</strong> On-premise + cloud storage in different regions</li>
                <li><strong>Regular verification:</strong> Check file integrity annually</li>
                <li><strong>Migration planning:</strong> Update storage media before obsolescence</li>
                <li><strong>Access security:</strong> Maintain access controls and audit logs</li>
              </ul>
            </div>

            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
              <h4 className="font-semibold text-red-400 mb-2">Legal Considerations</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>- Records may be required as evidence in disputes or litigation</li>
                <li>- Destruction of records during active disputes is illegal</li>
                <li>- Some contracts specify retention requirements exceeding general guidelines</li>
                <li>- Consult with legal advisors for complex projects</li>
              </ul>
            </div>

            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
              <h4 className="font-semibold text-green-400 mb-2">Digital Preservation Strategies</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>- Use cloud services with redundancy (AWS, Azure, Google Cloud)</li>
                <li>- Implement automated backup verification</li>
                <li>- Maintain offline copies for disaster recovery</li>
                <li>- Document retention policies and procedures</li>
                <li>- Plan for format migration as technology evolves</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Check 3 */}
        <div className="mb-10">
          <InlineCheck
            id={quickCheckQuestions[2].id}
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
        </div>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Practical Guidance</h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 border border-blue-500/20">
              <h4 className="font-semibold text-blue-400 mb-2">Report Generation Best Practices</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>- <strong>Generate immediately:</strong> Create reports while still on site or same day</li>
                <li>- <strong>Verify completeness:</strong> Check all fibres tested before leaving</li>
                <li>- <strong>Review for errors:</strong> Proofread before client delivery</li>
                <li>- <strong>Use templates:</strong> Consistent formatting improves professionalism</li>
                <li>- <strong>Include context:</strong> Photos of installation, cable routes, equipment</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-400 mb-2">Common Documentation Mistakes</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>- <strong>Missing calibration dates:</strong> Always record equipment calibration status</li>
                <li>- <strong>Inconsistent naming:</strong> Establish convention before testing starts</li>
                <li>- <strong>Incomplete records:</strong> Test all fibres, both directions</li>
                <li>- <strong>Poor organisation:</strong> Disorganised files are useless for retrieval</li>
                <li>- <strong>No backup:</strong> Single copy on tester is not sufficient</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
              <h4 className="font-semibold text-green-400 mb-2">Professional Tips</h4>
              <ul className="text-sm text-white/70 space-y-2">
                <li>- Maintain a calibration calendar for all test equipment</li>
                <li>- Keep template reports updated with current standards</li>
                <li>- Train team members on consistent documentation practices</li>
                <li>- Archive completed projects promptly with proper indexing</li>
                <li>- Review client feedback to improve documentation quality</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  className="w-full px-4 py-3 flex items-center justify-between text-left min-h-[44px] touch-manipulation"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-sm font-medium text-white/90">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/60 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-3">
                    <p className="text-sm text-white/70">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-5 border border-blue-500/30">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Quick Reference: Test Report Essentials
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-2">Report Must Include</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>- Project and client identification</li>
                  <li>- Test date, time, and technician</li>
                  <li>- Equipment details and calibration</li>
                  <li>- Test parameters and standards</li>
                  <li>- Results with pass/fail status</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-indigo-300 mb-2">File Management</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>- Use consistent naming convention</li>
                  <li>- Save SOR files for OTDR traces</li>
                  <li>- Backup using 3-2-1 strategy</li>
                  <li>- Retain for warranty + 7 years</li>
                  <li>- Organise by project/location</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                Generate reports immediately after testing | Always include equipment calibration dates | Never delete failed test records
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <Quiz
            title="Section Quiz"
            questions={quizQuestions}
            onComplete={(score, total) => {
              console.log(`Quiz completed: ${score}/${total}`);
            }}
          />
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module5/section5"
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto gap-2 text-white/70 hover:text-white min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Pass/Fail Criteria
            </Button>
          </Link>
          <Link
            to="/apprentice/study-centre/upskilling/fiber-optics/module6"
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] touch-manipulation"
            >
              Next Module: Troubleshooting
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FiberOpticsModule5Section6;
