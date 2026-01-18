import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fibre Testing and Certification | Data Cabling Module 3.5";
const DESCRIPTION = "Learn OLTS and OTDR testing procedures, reference methods, pass/fail thresholds, and certification requirements for fibre optic links.";

const quickCheckQuestions = [
  {
    id: "datacabling-m3s5-check1",
    question: "Which reference method can include test cords at both ends?",
    options: ["1-jumper", "2-jumper", "3-jumper", "No reference needed"],
    correctIndex: 2,
    explanation: "The 3-jumper reference method includes test cords at both ends and best represents the patching configuration in service."
  },
  {
    id: "datacabling-m3s5-check2",
    question: "For a short link, which pulse width should you choose?",
    options: [
      "Very long to see far events",
      "Short to improve near-end resolution",
      "Any value is fine",
      "Based on connector colour"
    ],
    correctIndex: 1,
    explanation: "Short pulse widths improve near-end event resolution and reduce dead zones, making them ideal for short links."
  },
  {
    id: "datacabling-m3s5-check3",
    question: "Pass/fail limits for OLTS should be set from:",
    options: [
      "Installer preference",
      "Random default",
      "The design loss budget",
      "OTDR auto mode only"
    ],
    correctIndex: 2,
    explanation: "Use the pre-calculated loss budget so OLTS thresholds are meaningful, auditable, and aligned with system requirements."
  }
];

const faqs = [
  {
    question: "What's the difference between OLTS and OTDR testing?",
    answer: "OLTS (Optical Loss Test Set) measures total end-to-end insertion loss with high accuracy - it's the definitive pass/fail test. OTDR characterises events along the fibre, showing location and estimated loss of each component. Use both for comprehensive certification."
  },
  {
    question: "How do I choose between 1, 2, and 3-jumper reference methods?",
    answer: "1-jumper references out the test cord at one end only. 2-jumper references out both test cords. 3-jumper includes permanent link connectors in the measurement. Choose based on what you want to include/exclude from measurements per standard requirements."
  },
  {
    question: "What wavelengths should I test at?",
    answer: "For multimode: 850nm and 1300nm. For singlemode: 1310nm and 1550nm. Testing at multiple wavelengths reveals wavelength-dependent issues like bend losses that may affect certain applications."
  },
  {
    question: "How do I handle failed test results?",
    answer: "First clean and retest - dirt causes most failures. If still failing, use OTDR to locate the problem. Common causes are contaminated connectors, poor splices, tight bends, or crushed cable. Remediate and retest until pass."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A fibre certification test shows the link passes OLTS but fails Tier 2 OTDR alien crosstalk requirements. What is the most likely action?",
  options: [
    "Accept the result - OLTS pass is sufficient",
    "Investigate cable routing and separation from adjacent cables",
    "Replace all connectors",
    "Use different wavelength"
  ],
  correctAnswer: 1,
  explanation: "OTDR can reveal issues not visible in end-to-end testing. Poor cable separation or routing near EMI sources can cause issues that require physical investigation and possible re-routing."
  }
];

const DataCablingModule3Section5 = () => {
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
            <Link to="/electrician/upskilling/data-cabling-module-3">
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
            <span>Module 3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fibre Testing and Certification
          </h1>
          <p className="text-white/80">
            OLTS and OTDR certification procedures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>OLTS:</strong> End-to-end loss, definitive pass/fail</li>
              <li><strong>OTDR:</strong> Event location and characterisation</li>
              <li><strong>Tier 1 + 2:</strong> Complete certification requires both</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Reference method used noted in results</li>
              <li><strong>Use:</strong> Set pass/fail from loss budget, not defaults</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Prepare and run OLTS tests correctly",
              "Apply correct reference methods",
              "Set up OTDR with proper settings",
              "Apply pass/fail thresholds from design",
              "Document results for certification",
              "Troubleshoot failed tests"
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
            OLTS Testing Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              OLTS (Optical Loss Test Set) provides definitive end-to-end insertion loss measurements.
              This is the primary pass/fail test for fibre certification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">OLTS Procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Check calibration and battery level; warm up light source</li>
                <li>2. Clean and inspect all connectors and reference leads</li>
                <li>3. Select wavelengths and set reference using agreed method</li>
                <li>4. Test each core bi-directionally for averaged results</li>
                <li>5. Compare to design limits; mark pass/fail</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reference Methods</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>1-Jumper:</strong> One test cord referenced out</li>
                  <li><strong>2-Jumper:</strong> Both test cords referenced out</li>
                  <li><strong>3-Jumper:</strong> Includes both patch connections</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wavelengths</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Multimode:</strong> 850nm and 1300nm</li>
                  <li><strong>Singlemode:</strong> 1310nm and 1550nm</li>
                  <li>Test both for full characterisation</li>
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
            OTDR Configuration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              OTDR characterises individual events along the fibre. Proper configuration ensures
              accurate event detection and loss measurement.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Settings</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Range:</strong> Slightly beyond known link length</li>
                  <li><strong>Pulse width:</strong> Short for short links</li>
                  <li><strong>Averaging:</strong> Balance noise vs time</li>
                  <li><strong>IOR:</strong> Per cable manufacturer data</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Setup</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Always use launch and receive leads</li>
                  <li>Select correct fibre type profile</li>
                  <li>Configure thresholds per design</li>
                  <li>Enable auto-analysis where appropriate</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Tier 1</p>
                <p className="text-white/90 text-xs">OLTS pass/fail</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Tier 2</p>
                <p className="text-white/90 text-xs">OTDR + OLTS</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Full Cert</p>
                <p className="text-white/90 text-xs">Both required</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Documentation and Handover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation supports warranty claims, future maintenance, and demonstrates
              compliance with standards and specifications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Record Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Link identification:</strong> Unique IDs, core numbers, routes</li>
                <li><strong>Test settings:</strong> Wavelengths, reference method, thresholds</li>
                <li><strong>Equipment:</strong> Model, serial, calibration date, firmware</li>
                <li><strong>Results:</strong> Pass/fail, measured values, bi-directional averages</li>
                <li><strong>Traces:</strong> Save .sor files and PDF exports</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Standards</p>
                <ul className="text-sm text-white space-y-1">
                  <li>BS EN 50174 (installation)</li>
                  <li>BS EN 50173 (performance)</li>
                  <li>TIA-568 (North American)</li>
                  <li>ISO/IEC 11801 (international)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Notes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Never look into live fibre</li>
                  <li>Use power meter to verify no light</li>
                  <li>Segregate from LV per BS7671</li>
                  <li>Follow BS EN 50174 routing requirements</li>
                </ul>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Certification Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Design budget agreed and documented</li>
                <li>Clean, inspect, connect protocol followed</li>
                <li>Launch/receive fibres verified good</li>
                <li>Bi-directional results captured</li>
                <li>All records exported and backed up</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Dirty connectors:</strong> — Number one cause of failures</li>
                <li><strong>Wrong reference:</strong> — Results don't reflect actual performance</li>
                <li><strong>Missing wavelengths:</strong> — Incomplete characterisation</li>
                <li><strong>Poor documentation:</strong> — Warranty and handover issues</li>
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
              <p className="font-medium text-white mb-1">Test Wavelengths</p>
              <ul className="space-y-0.5">
                <li>MM: 850nm + 1300nm</li>
                <li>SM: 1310nm + 1550nm</li>
                <li>Test both directions</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Documentation</p>
              <ul className="space-y-0.5">
                <li>Save .sor traces</li>
                <li>Export PDF reports</li>
                <li>Record calibration dates</li>
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
            <Link to="/electrician/upskilling/data-cabling-module-3-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/data-cabling-module-3-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule3Section5;