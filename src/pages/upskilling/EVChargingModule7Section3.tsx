import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m7s3-check1",
    question: "What is the preferred file format for uploading documents to the OZEV portal?",
    options: ["Word (.docx)", "PDF", "JPEG only", "Any format"],
    correctIndex: 1,
    explanation: "PDF is the preferred format for document uploads as it maintains quality and formatting. High-resolution JPEGs are acceptable for photographs. Documents should be minimum 300 DPI resolution."
  },
  {
    id: "evcharging-m7s3-check2",
    question: "Within how many days of installation completion must evidence be submitted?",
    options: ["7 days", "14 days", "30 days", "60 days"],
    correctIndex: 2,
    explanation: "Evidence must be submitted within 30 days of installation completion. Document uploads should follow within 14 days of evidence submission. Missing deadlines can result in claim rejection."
  },
  {
    id: "evcharging-m7s3-check3",
    question: "What photo evidence is required for charging point serial numbers?",
    options: ["Not required", "Distance shot only", "Clear close-up of label", "Hand-drawn sketch"],
    correctIndex: 2,
    explanation: "A clear close-up photograph showing the equipment serial number plate is required. This verifies the correct equipment was installed and enables warranty tracking."
  }
];

const faqs = [
  {
    question: "How long does grant payment processing take?",
    answer: "From submission to payment typically takes 4-8 weeks. Initial review is 5-10 days, technical assessment 10-15 days, and payment processing 10-15 working days after approval."
  },
  {
    question: "What happens if documents are rejected?",
    answer: "You'll receive notification of the issue and have 7 days to respond with corrected documents. Common issues include poor image quality, incomplete information, or missing mandatory documents."
  },
  {
    question: "Can I claim before the customer has paid?",
    answer: "For WCS claims, you need proof of payment to installer. For EVHS, the customer must have completed their contribution. Payment evidence is mandatory for claim submission."
  },
  {
    question: "What if photos don't meet quality standards?",
    answer: "Retake photos in good lighting with minimum 2MP resolution. Ensure equipment is fully visible, in focus, and includes date/time metadata. Multiple angles are recommended."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An installer completes a WCS installation on March 1st. What is the absolute latest date they can submit their evidence?",
  options: [
    "March 15th (14 days)",
    "March 31st (30 days)",
    "April 30th (60 days)",
    "August 31st (6 months)"
  ],
  correctAnswer: 1,
  explanation: "Evidence must be submitted within 30 days of completion, making March 31st the deadline. Document uploads must follow within 14 days of evidence submission. Final claim deadline is 60 days post-installation."
  }
];

const EVChargingModule7Section3 = () => {
  useSEO({
    title: "Uploading Documents and Claiming Grants | EV Charging Module 7.3",
    description: "Master the grant application process including document upload, evidence submission, and successful grant claims for EV charging installations."
  });

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
            <Link to="/electrician/upskilling/ev-charging-module-7">
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
            <span>Module 7.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Uploading Documents and Claiming Grants
          </h1>
          <p className="text-white/80">
            Grant application processes and document submission for successful funding claims
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Format:</strong> PDF preferred, 300+ DPI</li>
              <li><strong>Deadline:</strong> 30 days after completion</li>
              <li><strong>Processing:</strong> 4-8 weeks typical</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Critical Documents</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EIC:</strong> Electrical Installation Certificate</li>
              <li><strong>Photos:</strong> Before, during, after sequence</li>
              <li><strong>Invoice:</strong> Itemised with payment proof</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Prepare high-quality documentation for grants",
              "Navigate the OZEV portal efficiently",
              "Understand evidence requirements by grant type",
              "Manage claims from submission to payment",
              "Avoid common documentation errors",
              "Maintain records for audit compliance"
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
            Document Preparation Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successfully claiming OZEV grants requires meticulous documentation. Understanding
              the specific requirements for file format, quality, and organisation is essential
              for first-time submission success.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Technical Specifications</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Format:</strong> PDF preferred, high-res JPEG</li>
                  <li><strong>Resolution:</strong> Minimum 300 DPI</li>
                  <li><strong>File size:</strong> Maximum 10MB per document</li>
                  <li><strong>Clarity:</strong> All text must be legible</li>
                  <li><strong>Orientation:</strong> Correct rotation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Naming Convention</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Project reference number</li>
                  <li>Document type identifier</li>
                  <li>Date in YYYY-MM-DD format</li>
                  <li>Version number if applicable</li>
                  <li>Example: WCS2024001_EIC_2024-03-15.pdf</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Evidence Requirements by Grant Type
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different grant schemes have specific evidence requirements. Ensure you understand
              and collect all mandatory documentation for the scheme you're claiming under.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Workplace Charging Scheme (WCS)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electrical Installation Certificate</li>
                  <li>Photos: before/during/after</li>
                  <li>Equipment serial numbers</li>
                  <li>Commissioning test results</li>
                  <li>Itemised invoice with payment proof</li>
                  <li>Site plan showing locations</li>
                  <li>DNO approval (if required)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV Homecharge Scheme (EVHS)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electrical Installation Certificate</li>
                  <li>Off-street parking photos</li>
                  <li>Charge point installation photos</li>
                  <li>Equipment specifications</li>
                  <li>Vehicle registration (V5C)</li>
                  <li>Lease agreement (if applicable)</li>
                  <li>Customer declaration form</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Photographic Evidence Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              High-quality photographic evidence is critical for successful grant claims.
              Photos must clearly document the installation process and final result.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Photo Quality Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Resolution:</strong> Minimum 2MP</li>
                  <li><strong>Lighting:</strong> Good, even illumination</li>
                  <li><strong>Focus:</strong> Sharp throughout</li>
                  <li><strong>Angles:</strong> Multiple views provided</li>
                  <li><strong>Metadata:</strong> Date/time stamp intact</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Required Photo Sequence</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Pre-install:</strong> Site overview, supply point</li>
                  <li><strong>During:</strong> Cable routes, connections</li>
                  <li><strong>Post-install:</strong> Final installation</li>
                  <li><strong>Detail:</strong> Serial numbers, labelling</li>
                  <li><strong>Context:</strong> Parking area, signage</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Pre-Install</p>
                <p className="text-white text-xs">Site conditions</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">During</p>
                <p className="text-white text-xs">Progress shots</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Post-Install</p>
                <p className="text-white text-xs">Completed work</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Claim Timeline</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Installation completion: Within 6 months of approval</li>
                <li>Evidence submission: Within 30 days of completion</li>
                <li>Document upload: Within 14 days of evidence submission</li>
                <li>Query response: Within 7 days of receipt</li>
                <li>Final claim deadline: 60 days post-installation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Submission Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor image quality:</strong> — Use good lighting and steady camera</li>
                <li><strong>Incomplete documentation:</strong> — Use OZEV checklist before submission</li>
                <li><strong>Wrong file format:</strong> — Convert to PDF or JPEG, max 10MB</li>
                <li><strong>Missing serial numbers:</strong> — Close-up photos of equipment labels</li>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Critical Deadlines</p>
              <ul className="space-y-0.5">
                <li>Evidence: 30 days post-completion</li>
                <li>Documents: 14 days after evidence</li>
                <li>Final claim: 60 days post-install</li>
                <li>Query response: 7 days</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Processing Times</p>
              <ul className="space-y-0.5">
                <li>Initial review: 5-10 days</li>
                <li>Technical assessment: 10-15 days</li>
                <li>Payment: 10-15 days after approval</li>
                <li>Total: 4-8 weeks typical</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
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
            <Link to="/study-centre/upskilling/ev-charging-module-7-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/ev-charging-module-7-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule7Section3;