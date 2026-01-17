/**
 * Level 3 Module 4 Section 5.3 - Recording Remedial Works
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Recording Remedial Works - Level 3 Module 4 Section 5.3";
const DESCRIPTION = "Master the documentation requirements for electrical remedial work including proper recording methods, certificate selection, and maintaining accurate records for compliance and professional practice.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why is accurate documentation of remedial work essential?",
    options: [
      "Only for billing purposes",
      "To provide evidence of compliance, enable future maintenance, and protect both electrician and customer",
      "Just to satisfy the customer's curiosity",
      "It's optional for repair work"
    ],
    correctIndex: 1,
    explanation: "Documentation serves multiple purposes: it provides legal evidence that work was done to standard, enables future electricians to understand the installation, helps with warranty claims, and protects both parties if disputes arise. BS 7671 requires appropriate certification for all electrical work."
  },
  {
    id: "check-2",
    question: "What information must be recorded on a Minor Works Certificate?",
    options: [
      "Only the electrician's name",
      "Description of work, circuit details, test results, and departures from BS 7671",
      "Just the date and customer signature",
      "Only the materials used"
    ],
    correctIndex: 1,
    explanation: "The Minor Works Certificate requires: description of the work, circuit affected, test results (continuity, insulation resistance, polarity, Zs, RCD tests), any departures from BS 7671, and signatures. This provides a complete record of what was done and verified."
  },
  {
    id: "check-3",
    question: "When should observations about the existing installation be recorded?",
    options: [
      "Never - only record your own work",
      "Only if the customer asks",
      "Whenever you discover issues that could affect safety, documented on the certificate",
      "Only for commercial installations"
    ],
    correctIndex: 2,
    explanation: "Any observations about the existing installation that could affect safety should be recorded on the certificate. This protects you by documenting what you found, and informs the customer of issues requiring attention. It's both good practice and often a legal requirement."
  },
  {
    id: "check-4",
    question: "How long should records of electrical work be retained?",
    options: [
      "1 year",
      "Until the next inspection",
      "Indefinitely or as long as practically possible - at least the life of the installation",
      "Only until the warranty expires"
    ],
    correctIndex: 2,
    explanation: "Records should be retained for the life of the installation where possible. They may be needed for future maintenance, sales, insurance claims, or legal proceedings. Digital storage makes long-term retention practical. Some schemes require minimum retention periods (often 6+ years)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which document is required when adding a new circuit to an existing installation?",
    options: [
      "Minor Electrical Installation Works Certificate only",
      "Electrical Installation Certificate (EIC)",
      "Electrical Installation Condition Report",
      "No documentation required"
    ],
    correctAnswer: 1,
    explanation: "New circuits require an Electrical Installation Certificate (EIC) because they involve design considerations. The EIC has sections for design, construction, and inspection/testing, covering all aspects of the new circuit work."
  },
  {
    id: 2,
    question: "What details must be recorded about test instruments used during verification?",
    options: [
      "Just the manufacturer name",
      "Make, model, serial number, and calibration date",
      "Only the colour of the instrument",
      "No instrument details are required"
    ],
    correctAnswer: 1,
    explanation: "Recording instrument details (make, model, serial number, calibration date) provides traceability and evidence that calibrated instruments were used. This is essential for the validity of test results and may be required in any legal proceedings."
  },
  {
    id: 3,
    question: "On a Minor Works Certificate, where should departures from BS 7671 be recorded?",
    options: [
      "They should never be recorded",
      "In the 'Departures' section with justification",
      "On a separate piece of paper",
      "Verbally to the customer only"
    ],
    correctAnswer: 1,
    explanation: "The Minor Works Certificate has a specific section for recording any departures from BS 7671. Each departure must be described and justified - explaining why the departure was made and why equivalent safety is maintained."
  },
  {
    id: 4,
    question: "Who should receive the original certificate after completion of remedial work?",
    options: [
      "The electrician keeps it",
      "The person ordering the work",
      "The local authority",
      "The electricity supplier"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires that the original certificate be given to the person ordering the work. The electrician should retain a copy. For notifiable work, copies may also go to building control or the scheme provider."
  },
  {
    id: 5,
    question: "What should be recorded if test results are higher than expected but still within acceptable limits?",
    options: [
      "Nothing - only failures need recording",
      "The actual values measured, allowing comparison with future tests",
      "Just write 'acceptable'",
      "Record the minimum acceptable value instead"
    ],
    correctAnswer: 1,
    explanation: "Always record actual measured values, not just 'pass/fail'. This allows comparison with future tests to identify deterioration trends. A value that's acceptable now but higher than expected may indicate an issue worth monitoring."
  },
  {
    id: 6,
    question: "When completing repairs during an EICR inspection, how should this be documented?",
    options: [
      "On a separate Minor Works Certificate with reference to the EICR",
      "Just update the EICR to show satisfactory",
      "No documentation needed for repairs during inspection",
      "Only record if the customer requests it"
    ],
    correctAnswer: 0,
    explanation: "Repairs carried out during an EICR inspection should be documented on an appropriate certificate (Minor Works or EIC depending on work scope), cross-referenced to the EICR. This provides clear evidence of what was done and when."
  },
  {
    id: 7,
    question: "What must be documented if you cannot complete all recommended repairs?",
    options: [
      "Nothing - incomplete work isn't recorded",
      "A clear list of outstanding items with recommendations and priorities",
      "Just tell the customer verbally",
      "Wait until all work is complete before documenting"
    ],
    correctAnswer: 1,
    explanation: "Outstanding items must be documented in writing, with clear descriptions and priority recommendations. This protects you by proving you advised the customer, and gives them a clear record of what still needs attention."
  },
  {
    id: 8,
    question: "For Building Regulations compliance (Part P), what additional documentation may be required?",
    options: [
      "No additional documentation",
      "Notification to building control or certificate from a competent person scheme",
      "Just the standard electrical certificate",
      "A letter to the local MP"
    ],
    correctAnswer: 1,
    explanation: "Notifiable work under Part P requires either notification to building control or completion by a member of a competent person scheme who can self-certify. The scheme provides a Building Regulations Compliance Certificate to the customer and notifies the local authority."
  },
  {
    id: 9,
    question: "What should be included in a job record sheet beyond the formal certificate?",
    options: [
      "Nothing else is needed",
      "Time on site, materials used, customer instructions, before/after photos, and any complications",
      "Only what the customer can see",
      "Just the invoice"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive job records help with future reference, warranty queries, and disputes. Include: time records, materials with costs, specific customer instructions, photographs of work, complications encountered, and any recommendations made."
  },
  {
    id: 10,
    question: "How should digital photographs be used in documentation?",
    options: [
      "Photos are never required",
      "Before and after photos with timestamps provide valuable evidence of work completed",
      "Only use photos for marketing",
      "Photos replace written documentation"
    ],
    correctAnswer: 1,
    explanation: "Digital photos with timestamps provide valuable evidence: 'before' photos show original condition, 'after' photos prove work completed, and both help with any future queries or disputes. They supplement but don't replace written documentation."
  },
  {
    id: 11,
    question: "When recording test results, what format is most appropriate?",
    options: [
      "Any format the electrician prefers",
      "Using standard forms that include all required information and are clearly legible",
      "Rough notes that only the electrician can read",
      "Recording only results that passed"
    ],
    correctAnswer: 1,
    explanation: "Standard forms (official certificates and schedules) ensure all required information is captured and can be understood by others. Results must be legible, complete, and use appropriate units. The forms provide legal evidence of compliance."
  },
  {
    id: 12,
    question: "What documentation is appropriate for emergency repairs that restore power temporarily?",
    options: [
      "No documentation for temporary repairs",
      "A record of the temporary measures taken, limitations, and follow-up actions required",
      "Full certification as if permanent",
      "Just a verbal explanation"
    ],
    correctAnswer: 1,
    explanation: "Temporary repairs must be documented: describe what was done, state clearly it's temporary, note any limitations or risks, and specify when permanent repair is required. This protects you and ensures the customer understands the situation."
  }
];

const faqs = [
  {
    question: "Can I use my own documentation format instead of official certificates?",
    answer: "For electrical certification (EIC, Minor Works, EICR), you must use formats that meet BS 7671 requirements - typically the model forms or approved equivalents. Your own supplementary documentation (job sheets, photos) can enhance these but not replace them. Competent person schemes may have specific requirements."
  },
  {
    question: "What if I make a mistake on a certificate?",
    answer: "Never alter a completed certificate by overwriting or using correction fluid. If you make an error, draw a single line through it, write the correction, and initial and date the change. If errors are significant, complete a new certificate. Keep the spoiled version in your records with a note explaining the issue."
  },
  {
    question: "Do I need to keep paper copies of all certificates?",
    answer: "You can keep digital copies provided they're secure, backed up, and easily retrievable. Many electricians use digital systems for efficiency. However, ensure you can produce copies when needed and that the digital format preserves all original information including signatures and any handwritten notes."
  },
  {
    question: "How do I document work where the customer refused recommended repairs?",
    answer: "Record all recommendations made, note that the customer declined specific items, and have the customer sign acknowledging this if possible. Keep a copy of this record. Your duty is to inform - if they decline non-urgent work, that's their choice, but you need evidence you advised them properly."
  },
  {
    question: "What should I do if I discover someone else's poor work during my repair?",
    answer: "Document your observations clearly, including photographs if possible. Note the issues on your certificate or in an accompanying letter. Advise the customer of the concerns and recommended actions. You're not responsible for others' work, but you must not ignore safety issues you discover."
  },
  {
    question: "Is a verbal description of work acceptable to customers?",
    answer: "No - verbal descriptions alone are never sufficient. Written certification provides legal evidence, enables future reference, is required by BS 7671, and protects both parties. Always provide appropriate written documentation, even for small jobs. Professional practice requires proper paperwork."
  }
];

const Level3Module4Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Recording Remedial Works
          </h1>
          <p className="text-white/80">
            Documentation requirements and professional record-keeping practices
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EIC:</strong> New circuits and major alterations</li>
              <li><strong>Minor Works:</strong> Repairs, additions to existing circuits</li>
              <li><strong>Test results:</strong> Record actual values, not just pass/fail</li>
              <li><strong>Observations:</strong> Document issues found in existing work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Why It Matters</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Legal protection:</strong> Evidence of compliance</li>
              <li><strong>Future reference:</strong> Helps future maintenance</li>
              <li><strong>Professionalism:</strong> Demonstrates competence</li>
              <li><strong>Requirements:</strong> BS 7671 mandates certification</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select the correct certificate type for different repair scenarios",
              "Complete certificates accurately with all required information",
              "Record test results in appropriate format",
              "Document observations about existing installations",
              "Maintain professional records for business and legal purposes",
              "Understand retention requirements for electrical documentation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Selecting the Right Certificate */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Selecting the Right Certificate
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Chapter 63 requires that appropriate certification be issued for all electrical work. Selecting the correct certificate type depends on the nature and scope of the work. Using the wrong certificate can create legal issues and doesn't properly document the work done.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Certificate types and when to use them:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electrical Installation Certificate (EIC):</strong> New installations, new circuits, consumer unit changes, additions involving design decisions</li>
                <li><strong>Minor Electrical Installation Works Certificate:</strong> Repairs to existing circuits, like-for-like replacements, additions that don't require new circuit design</li>
                <li><strong>Electrical Installation Condition Report (EICR):</strong> Assessment of existing installation condition - not for recording new work</li>
              </ul>
            </div>

            <p>
              The key distinction is whether design is involved. If you're making design decisions - circuit routing, cable sizing calculations, protective device selection for a new circuit - an EIC is required. If you're working on an existing circuit without changing its fundamental design, Minor Works is appropriate.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> When in doubt, use the more comprehensive certificate (EIC). It's better to over-document than under-document. An EIC can cover minor work, but a Minor Works Certificate can't cover work requiring design certification.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Completing the Minor Works Certificate */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Completing the Minor Works Certificate
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Minor Electrical Installation Works Certificate is the most commonly used document for repair work. It's a single-page form that covers both the declaration of work done and the test results. Every section must be completed properly.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part 1: Description of Work</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Client's name and address</li>
                  <li>Description of the minor works</li>
                  <li>Details of departure from BS 7671</li>
                  <li>Comments on existing installation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part 2: Installation Details</p>
                <ul className="text-sm text-white space-y-1">
                  <li>System type (TN-S, TN-C-S, TT)</li>
                  <li>Method of protection (RCD, etc.)</li>
                  <li>Circuit details and DB reference</li>
                  <li>Protective device details</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part 3: Test Results</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Continuity (R1+R2 or R2)</li>
                  <li>Insulation resistance</li>
                  <li>Polarity confirmation</li>
                  <li>Earth fault loop impedance (Zs)</li>
                  <li>RCD operating time</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part 4: Declaration</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Confirmation work complies with BS 7671</li>
                  <li>Name and signature of responsible person</li>
                  <li>Position and company details</li>
                  <li>Date of completion</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> For a socket outlet replacement: "Replaced faulty single socket outlet in lounge. Checked and re-terminated existing wiring. Circuit: Ring 1, 32A RCBO. Tests confirmed acceptable continuity, IR greater than 200M ohm, correct polarity, Zs 0.45 ohm."
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Recording Test Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Recording Test Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test results must be recorded accurately, using actual measured values rather than simply 'pass' or 'fail'. This provides meaningful data for comparison with future tests and demonstrates due diligence in verifying the work.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Best practices for recording test results:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Use actual values:</strong> "IR = 250 M ohm" not just "satisfactory"</li>
                <li><strong>Include units:</strong> Ohms, megohms, milliseconds, amperes</li>
                <li><strong>Note test conditions:</strong> Test voltage, ambient conditions if relevant</li>
                <li><strong>Record instrument details:</strong> Make, model, serial number, calibration date</li>
                <li><strong>Compare to limits:</strong> Show you understand what values are acceptable</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Continuity (R1+R2)</p>
                <p className="text-white/90 text-xs">Record in ohms - compare to tabulated values for cable type/length</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Insulation Resistance</p>
                <p className="text-white/90 text-xs">Record in megohms - minimum 1 M ohm at 500V DC for LV circuits</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Loop Impedance (Zs)</p>
                <p className="text-white/90 text-xs">Record in ohms - must not exceed max for protective device</p>
              </div>
            </div>

            <p>
              For RCD tests, record the trip time at the test current used. For example: "30mA RCD tested at 30mA, trip time 18ms" is more useful than "RCD OK". This confirms the device operates within specification (must trip in less than 300ms at rated current, less than 40ms at 5x rated current).
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Test results become legal evidence of your work. Accurate, detailed records protect you if questions arise later. They also help the next electrician understand the installation's baseline condition.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Documenting Observations and Limitations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Documenting Observations and Limitations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Repair work often reveals issues with the existing installation that weren't part of your original scope. Recording these observations protects you legally and provides the customer with valuable information about their installation's condition.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">What to document in observations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Safety concerns:</strong> Any conditions that could present shock or fire risk</li>
                <li><strong>Non-compliances:</strong> Items that don't meet current or original standards</li>
                <li><strong>Deterioration:</strong> Signs of wear or aging that may need future attention</li>
                <li><strong>Limitations:</strong> Areas you couldn't access or test during your work</li>
                <li><strong>Recommendations:</strong> Suggested improvements or follow-up work</li>
              </ul>
            </div>

            <p>
              Write observations clearly and factually. Describe what you observed, not your opinion about who's responsible. For example: "Observed: three socket outlets on ring circuit with crossed polarity" is factual. Avoid "Previous electrician wired these wrong" which is accusatory.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example observation:</strong> "During socket replacement, noted that ring circuit appears to have been broken - only one cable present at position. Recommend full circuit testing to verify ring integrity. Customer advised of finding and recommendation."
            </p>

            <p>
              If you couldn't fully test something due to access limitations, record this. For example: "Zs test at socket position only - could not access to test at extremity of circuit." This documents the limitation while still providing the test data you could obtain.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Section 05: Business Records and Retention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Business Records and Retention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond formal certification, good business practice requires maintaining comprehensive records of all work undertaken. These records support warranty queries, help with repeat customers, and provide evidence if disputes arise.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Job Records Should Include</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Date(s) and time spent on site</li>
                  <li>Customer contact details</li>
                  <li>Description of fault reported and found</li>
                  <li>Work undertaken and materials used</li>
                  <li>Photographs before and after</li>
                  <li>Copy of certificate issued</li>
                  <li>Any follow-up recommendations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retention Periods</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Minimum 6 years (limitation period for contract claims)</li>
                  <li>Preferably life of installation</li>
                  <li>Competent person schemes may specify minimums</li>
                  <li>Digital storage makes long-term retention practical</li>
                  <li>Keep originals where signatures are relevant</li>
                  <li>Ensure backups for digital records</li>
                </ul>
              </div>
            </div>

            <p>
              Photographs are particularly valuable for repair work. A 'before' photo showing the fault condition, and 'after' photos showing the completed repair, provide visual evidence of what was done. Ensure photos have timestamps and are stored with the job records.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Leaving Site</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete all sections of the appropriate certificate</li>
                <li>Ensure test results are recorded with actual values</li>
                <li>Document any observations about the existing installation</li>
                <li>Have the customer sign to acknowledge receipt where appropriate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Digital Documentation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use certification apps that capture all required information</li>
                <li>Email copies to customers for immediate record</li>
                <li>Back up digital records to cloud storage</li>
                <li>Organise by customer/address for easy retrieval</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Documentation Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Incomplete forms:</strong> Every section must be completed or marked N/A</li>
                <li><strong>Missing signatures:</strong> Both contractor and customer sections</li>
                <li><strong>Vague descriptions:</strong> Be specific about what was done</li>
                <li><strong>No instrument details:</strong> Record test equipment used</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Certificate Selection</p>
                <ul className="space-y-0.5">
                  <li>New circuit = EIC</li>
                  <li>Consumer unit change = EIC</li>
                  <li>Socket addition = Minor Works</li>
                  <li>Like-for-like replacement = Minor Works</li>
                  <li>Condition assessment = EICR</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Essential Record Items</p>
                <ul className="space-y-0.5">
                  <li>Actual test values with units</li>
                  <li>Instrument details and cal date</li>
                  <li>Clear work description</li>
                  <li>Observations and recommendations</li>
                  <li>Signatures and date</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: BS 7671 Compliance
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section5-4">
              Next: Re-testing and Certification
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section5_3;
