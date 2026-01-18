import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fault Finding, Handover and Maintenance | Data Cabling Module 3.6";
const DESCRIPTION = "Learn systematic fibre troubleshooting, OTDR fault signatures, handover documentation requirements, and preventative maintenance practices.";

const quickCheckQuestions = [
  {
    id: "datacabling-m3s6-check1",
    question: "Which tool quickly locates near-end breaks or mispatches?",
    options: ["OTDR", "VFL (Visual Fault Locator)", "OLTS only", "Fusion splicer"],
    correctIndex: 1,
    explanation: "A VFL (Visual Fault Locator) injects visible red light to show breaks, bends, or mismatches close to the end-face - ideal for quick visual inspection."
  },
  {
    id: "datacabling-m3s6-check2",
    question: "A non-reflective step loss on OTDR most likely indicates:",
    options: ["Connector reflection", "Fibre break", "Fusion splice or bend", "Power failure"],
    correctIndex: 2,
    explanation: "Splices and bends present as non-reflective losses - they attenuate the signal without causing a reflection spike."
  },
  {
    id: "datacabling-m3s6-check3",
    question: "Why keep baseline traces?",
    options: [
      "To reduce loss",
      "To compare future tests and identify changes",
      "For marketing",
      "They are not useful"
    ],
    correctIndex: 1,
    explanation: "Baseline traces make deviations obvious and speed up troubleshooting by showing exactly what has changed since installation."
  }
];

const faqs = [
  {
    question: "What's the first step when troubleshooting a fibre fault?",
    answer: "Start with visual inspection: check labels, patching, tray routing, bend radius, and visible damage. Then clean and inspect both end-faces. Many faults are simply dirty connectors - always clean and retest before changing anything else."
  },
  {
    question: "How do I interpret a high reflectance spike on OTDR?",
    answer: "A high reflectance spike typically indicates a damaged connector, air gap, or break. If at a known connector location, clean and inspect first. If within the cable, it may indicate a break or severe damage requiring repair."
  },
  {
    question: "What should be included in a handover documentation pack?",
    answer: "Include as-built drawings, fibre schedules with unique IDs, OLTS tables and OTDR traces (.sor files), equipment calibration details, cleaning records, photos of key terminations, labelling scheme, and panel maps."
  },
  {
    question: "How often should fibre links be re-tested?",
    answer: "Re-test when performance issues arise, after any modifications, or as part of scheduled maintenance (typically annually for critical links). Always compare to baseline traces to identify degradation trends."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An existing SM link shows intermittent errors. OLTS passes but OTDR reveals periodic non-reflective steps every ~20m. What is the most likely cause?",
  options: [
    "Dirty connectors",
    "Fibre type mismatch",
    "Cable being compressed or bent at supports",
    "Wrong wavelength used"
  ],
  correctAnswer: 2,
  explanation: "Periodic non-reflective steps at regular intervals suggest mechanical stress at support points. Investigation often reveals tight containment lids, cable ties, or supports compressing the cable and causing bend losses."
  }
];

const DataCablingModule3Section6 = () => {
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
            <Link to="..">
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
            <span>Module 3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fault Finding, Handover and Maintenance
          </h1>
          <p className="text-white/80">
            Systematic troubleshooting and documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>VFL:</strong> Quick visual fault location</li>
              <li><strong>OTDR signatures:</strong> Identify fault types</li>
              <li><strong>Baseline:</strong> Compare future tests to original</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Red light from VFL escaping at faults</li>
              <li><strong>Use:</strong> Clean first, then test systematically</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply systematic troubleshooting methodology",
              "Interpret common OTDR fault signatures",
              "Use VFL for quick fault location",
              "Create comprehensive handover packs",
              "Implement preventative maintenance",
              "Maintain baseline trace libraries"
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
            Systematic Troubleshooting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A methodical approach to fault finding saves time and ensures the root cause is identified
              rather than just treating symptoms.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Troubleshooting Flow:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. <strong>Visual:</strong> Check labels, patching, routing, bend radius</li>
                <li>2. <strong>Clean & inspect:</strong> Both end-faces before changing anything</li>
                <li>3. <strong>Continuity:</strong> Use VFL for near-end breaks/mispatches</li>
                <li>4. <strong>OLTS:</strong> Measure end-to-end at relevant wavelengths</li>
                <li>5. <strong>OTDR:</strong> Locate events; compare to baseline traces</li>
                <li>6. <strong>Isolate:</strong> Swap jumpers, move ports to narrow down</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">VFL Usage</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Visible red light (650nm typically)</li>
                  <li>Light escapes at breaks/bends</li>
                  <li>Quick visual confirmation</li>
                  <li>Limited range (~5km SM, ~2km MM)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Principle</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Change one variable at a time</li>
                  <li>Document each step taken</li>
                  <li>Return to known-good state</li>
                  <li>Verify fix with full test</li>
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
            OTDR Fault Signatures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding common OTDR signatures helps quickly identify fault types and determine
              appropriate remediation actions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">High Reflectance Spike</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Damaged connector or air gap</li>
                  <li>Clean or replace connector</li>
                  <li>Re-terminate if internal damage</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Non-Reflective Step</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Micro/macro bend or poor splice</li>
                  <li>Re-route with correct radius</li>
                  <li>Re-splice if required</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Slope Change</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fibre type mismatch</li>
                  <li>Wrong launch conditions</li>
                  <li>Verify components match</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Large End Reflection + Loss</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Open connector or break</li>
                  <li>Inspect connector and tail lead</li>
                  <li>May need repair/splice</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Reflective</p>
                <p className="text-white/90 text-xs">Connector/break</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Non-reflective</p>
                <p className="text-white/90 text-xs">Splice/bend</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Slope</p>
                <p className="text-white/90 text-xs">Fibre mismatch</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Handover and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Comprehensive documentation ensures smooth handover, supports warranty claims, and
              enables effective ongoing maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Pack Contents:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>As-built drawings and fibre schedules with unique IDs</li>
                <li>OLTS tables and OTDR traces per core and wavelength</li>
                <li>Equipment details: model, serial, calibration dates</li>
                <li>Cleaning and inspection records with photos</li>
                <li>Labelling scheme and panel maps</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Preventative Maintenance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Clean-before-connect policy</li>
                  <li>Keep caps on unused ports</li>
                  <li>Annual bend radius checks</li>
                  <li>Maintain baseline trace library</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Alignment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Routing per BS EN 50174</li>
                  <li>Segregation from LV per BS7671</li>
                  <li>Risk assess hot works for splicing</li>
                  <li>Follow site permits and COSHH</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Store baseline traces securely for future comparison</li>
                <li>Schedule periodic visual inspections of splice trays</li>
                <li>Re-tidy patching annually to prevent stress</li>
                <li>Update documentation after any modifications</li>
                <li>Train maintenance staff on fibre handling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping cleaning:</strong> — Most faults are dirt-related</li>
                <li><strong>No baseline:</strong> — Cannot compare to original state</li>
                <li><strong>Incomplete records:</strong> — Warranty and handover issues</li>
                <li><strong>Random changes:</strong> — Change one variable at a time</li>
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
              <p className="font-medium text-white mb-1">Troubleshooting Order</p>
              <ul className="space-y-0.5">
                <li>1. Visual inspection</li>
                <li>2. Clean and inspect</li>
                <li>3. VFL → OLTS → OTDR</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">OTDR Signatures</p>
              <ul className="space-y-0.5">
                <li>Reflective: connector/break</li>
                <li>Non-reflective: splice/bend</li>
                <li>Slope: fibre mismatch</li>
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
            <Link to="../section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../../module-4">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule3Section6;