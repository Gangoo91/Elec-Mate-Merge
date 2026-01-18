import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Record-Keeping and Documentation | Data Cabling Module 6.4";
const DESCRIPTION = "Learn documentation standards for structured cabling systems including test records, labelling schemes, and change management procedures.";

const quickCheckQuestions = [
  {
    id: "datacabling-m6s4-check1",
    question: "What is the minimum retention period for cabling test records according to standards?",
    options: ["1 year", "5 years", "10 years", "Life of the installation"],
    correctIndex: 3,
    explanation: "Test records should be retained for the life of the installation. They provide baseline performance data for troubleshooting, support warranty claims, and demonstrate compliance with standards."
  },
  {
    id: "datacabling-m6s4-check2",
    question: "What information must be included on cable labels?",
    options: ["Cable length only", "Destination and cable ID", "Installation date only", "Installer name only"],
    correctIndex: 1,
    explanation: "Cable labels must include the destination information and unique cable identifier. This enables proper identification, traceability, and efficient troubleshooting throughout the installation's lifetime."
  },
  {
    id: "datacabling-m6s4-check3",
    question: "How often should cabling infrastructure documentation be updated?",
    options: ["Annually", "Every 5 years", "When changes are made", "Only during renovations"],
    correctIndex: 2,
    explanation: "Documentation must be updated whenever changes are made to the cabling infrastructure. This maintains accuracy, supports troubleshooting, and ensures compliance with standards."
  }
];

const faqs = [
  {
    question: "What should I do if test records from the original installation are missing?",
    answer: "Re-test affected cables to establish baseline performance data. Document the re-test with current equipment (including calibration certificates), note which cables were tested post-installation, and update all records. This protects warranty coverage and provides troubleshooting baselines."
  },
  {
    question: "How should I organise digital documentation for a large installation?",
    answer: "Use a structured database or document management system with hierarchical organisation (building/floor/room/outlet). Include version control, backup procedures, and defined access permissions. Link test records to cable IDs for quick retrieval."
  },
  {
    question: "What labelling scheme works best for multi-building campuses?",
    answer: "Use hierarchical numbering: Building.Floor.Room.Outlet (e.g., B1.02.TR.001). This is logical, scalable, and allows staff to locate any cable from the label. Document the scheme and use it consistently across all records and drawings."
  },
  {
    question: "Are colour-coded patch cords sufficient for documentation?",
    answer: "Colour coding helps visual identification but is not sufficient alone. You still need proper labelling, cable schedules, and drawings. Document your colour scheme in the administration records so all staff understand the conventions."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An insurance audit finds 40% of test records missing from an 8-year-old hospital installation. What is the most critical immediate action?",
  options: [
    "Update the as-built drawings first",
    "Re-test critical systems and document results",
    "Install new labelling throughout",
    "Wait for the next scheduled maintenance"
  ],
  correctAnswer: 1,
  explanation: "Re-testing critical systems is the priority. Healthcare facilities require verified network performance for patient safety systems. New test records establish current baselines, support insurance compliance, and identify any degraded links requiring remediation."
  }
];

const DataCablingModule6Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Record-Keeping and Documentation
          </h1>
          <p className="text-white/80">
            Documentation standards and record maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Test records:</strong> Retain for life of installation</li>
              <li><strong>As-built drawings:</strong> Update with every change</li>
              <li><strong>Labelling:</strong> Destination + unique cable ID</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cable labels, test reports, rack elevations</li>
              <li><strong>Use:</strong> Hierarchical naming (Building.Floor.Room.Outlet)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Documentation requirements per standards",
              "Types of required documentation",
              "Proper labelling and identification schemes",
              "Test record requirements and retention",
              "Administration and change management",
              "Apply documentation standards practically"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            As-Built Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation is the backbone of any successful structured cabling system.
              It ensures maintainability, supports troubleshooting, enables future modifications,
              and provides legal protection for warranty and insurance claims.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Drawings and Plans</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Site plans:</strong> Building locations, connectivity</li>
                  <li><strong>Floor plans:</strong> TR locations, outlet positions</li>
                  <li><strong>Rack elevations:</strong> Equipment placement</li>
                  <li><strong>Pathway routing:</strong> Cable run paths</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Schematic Documentation</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Network topology:</strong> Logical hierarchy</li>
                  <li><strong>Port mapping:</strong> Panel to outlet assignments</li>
                  <li><strong>Cross-connect:</strong> Patch field relationships</li>
                  <li><strong>Cable schedules:</strong> Complete cable listings</li>
                </ul>
              </div>
            </div>

            <p>
              All documentation must be maintained as "as-built" records, updated whenever
              changes are made. Original design documents are valuable but must be marked
              to distinguish from current as-built status.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Labelling and Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Consistent labelling enables efficient troubleshooting, accurate moves/adds/changes,
              and clear communication between technicians. Every component should be uniquely
              identifiable from its label.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Component Labelling</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Horizontal cables:</strong> Both ends, 150mm from termination</li>
                  <li><strong>Backbone cables:</strong> Source/destination, fibre count</li>
                  <li><strong>Outlets:</strong> Unique ID visible on faceplate</li>
                  <li><strong>Patch panels:</strong> Panel ID and port numbers</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Label Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Durability:</strong> Survive environment for installation life</li>
                  <li><strong>Legibility:</strong> Clear print, appropriate size</li>
                  <li><strong>Adhesion:</strong> Permanent attachment method</li>
                  <li><strong>Consistency:</strong> Same scheme throughout</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hierarchical Numbering Scheme:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Format:</strong> Building.Floor.Room.Outlet (e.g., B1.02.TR.001)</li>
                <li><strong>Scalable:</strong> Accommodates future expansion</li>
                <li><strong>Logical:</strong> Location derivable from identifier</li>
                <li><strong>Consistent:</strong> Same scheme in all documentation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Test Records and Performance Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test records provide baseline performance data essential for troubleshooting,
              warranty claims, and demonstrating compliance. They must be retained for the
              life of the installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Copper Cable Tests</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Wire map and continuity</li>
                  <li>Length measurements</li>
                  <li>Insertion loss (attenuation)</li>
                  <li>NEXT and PSNEXT</li>
                  <li>ELFEXT and PSELFEXT</li>
                  <li>Return loss</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fibre Optic Tests</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Continuity and polarity</li>
                  <li>Length measurements</li>
                  <li>Insertion loss (Tier 1)</li>
                  <li>OTDR traces (Tier 2)</li>
                  <li>Connector inspection results</li>
                  <li>Optical return loss</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Report Contents:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Header:</strong> Project name, date, technician, equipment used</li>
                <li><strong>Equipment:</strong> Make/model, serial number, calibration date</li>
                <li><strong>Standard:</strong> Test standard applied (e.g., TIA-568.2-D)</li>
                <li><strong>Results:</strong> Pass/fail, measured values, margin to limit</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Calibration Records:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable analysers:</strong> Annual calibration, NIST traceable</li>
                <li><strong>OTDR units:</strong> Annual calibration with reference standard</li>
                <li><strong>Power meters:</strong> Annual calibration, NIST traceable</li>
                <li><strong>Light sources:</strong> Annual stability verification</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Administration and Change Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ongoing administration keeps documentation current and accurate. Every change
              to the cabling infrastructure must be documented through a controlled process
              to maintain system integrity and compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Configuration Management</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cable database:</strong> Assignments and status</li>
                  <li><strong>Port utilisation:</strong> Tracking available capacity</li>
                  <li><strong>Service allocation:</strong> User/device assignments</li>
                  <li><strong>Equipment inventory:</strong> Active and passive</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Change Control Process</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Work order:</strong> Request and approval</li>
                  <li><strong>Impact assessment:</strong> Before implementation</li>
                  <li><strong>Implementation:</strong> Documented procedure</li>
                  <li><strong>Verification:</strong> Testing and sign-off</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Record Retention Schedule:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Test records:</strong> Life of installation (digital + backup)</li>
                <li><strong>As-built drawings:</strong> Life of building (version controlled)</li>
                <li><strong>Change orders:</strong> 7-10 years minimum (audit trail)</li>
                <li><strong>Warranty documents:</strong> Warranty period + 1 year</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Create documentation as you install, not afterwards</li>
                <li>Use digital systems with automatic backup and version control</li>
                <li>Include calibration certificates with every test report</li>
                <li>Update drawings within 24 hours of any change</li>
                <li>Train all staff on labelling scheme and documentation procedures</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Deferring documentation:</strong> — Creates gaps and errors</li>
                <li><strong>Inconsistent labelling:</strong> — Causes confusion and mistakes</li>
                <li><strong>No backup strategy:</strong> — Single point of failure for records</li>
                <li><strong>Ignoring change control:</strong> — Documentation becomes unreliable</li>
              </ul>
            </div>
          </div>
        </section>

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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Essential Documents</p>
              <ul className="space-y-0.5">
                <li>As-built drawings</li>
                <li>Test reports with calibration</li>
                <li>Cable schedules</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Label Requirements</p>
              <ul className="space-y-0.5">
                <li>Unique cable ID</li>
                <li>Destination information</li>
                <li>Both ends labelled</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
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
            <Link to="/electrician/upskilling/data-cabling-module-6-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-6">
              Complete Module 6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule6Section4;