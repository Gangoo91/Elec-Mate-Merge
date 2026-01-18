import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Loss Budgets and OTDR Basics | Data Cabling Module 3.4";
const DESCRIPTION = "Learn to calculate optical loss budgets and understand OTDR testing, including setup, trace interpretation, and pass/fail guidance.";

const quickCheckQuestions = [
  {
    id: "datacabling-m3s4-check1",
    question: "What is the typical singlemode attenuation at 1310nm?",
    options: ["0.1 dB/km", "0.35 dB/km", "1.5 dB/km", "3.5 dB/km"],
    correctIndex: 1,
    explanation: "OS2 singlemode attenuation is typically 0.35 dB/km at 1310nm and approximately 0.25 dB/km at 1550nm."
  },
  {
    id: "datacabling-m3s4-check2",
    question: "What is an OTDR dead zone?",
    options: [
      "A zone where fibres cannot be connected",
      "A section near the instrument where events cannot be resolved",
      "The part of fibre with no attenuation",
      "A fault that stops all transmission"
    ],
    correctIndex: 1,
    explanation: "The dead zone is the region after the launch pulse where near-end events are not resolvable. Use launch/receive leads to move dead zones away from the first/last connectors."
  },
  {
    id: "datacabling-m3s4-check3",
    question: "Why use both launch and receive fibres for OTDR tests?",
    options: [
      "To increase measured loss",
      "To reduce wavelength",
      "To characterise the first and last connectors accurately",
      "To avoid using a power meter"
    ],
    correctIndex: 2,
    explanation: "Launch and receive leads allow the OTDR to separate the first and last connectors from the dead zones for accurate measurement."
  }
];

const faqs = [
  {
    question: "How do I calculate a fibre link loss budget?",
    answer: "Sum fibre attenuation (length × dB/km), connector losses (typically 0.3 dB each), splice losses (0.1 dB fusion), and add a design margin (1-3 dB). Compare against transceiver power budget to ensure link viability."
  },
  {
    question: "What pulse width should I use for OTDR testing?",
    answer: "Use short pulse widths for better near-end resolution on short links, and longer pulse widths for better signal-to-noise ratio on long links. Start with auto mode, then refine manually based on link characteristics."
  },
  {
    question: "Why is bi-directional OTDR testing important?",
    answer: "Bi-directional testing allows averaging of splice losses to eliminate direction-dependent variations caused by differences in core diameter between fibres. This provides more accurate loss values for splices."
  },
  {
    question: "What causes a gain or apparent negative loss in an OTDR trace?",
    answer: "This occurs at splices between fibres with different backscatter coefficients or core sizes. The larger-core fibre produces more backscatter, making the splice appear as a gain. Bi-directional averaging eliminates this artefact."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A 2 km OS2 link with two connectors (0.3 dB each) and one fusion splice (0.1 dB) has what expected loss at 1310nm?",
  options: [
    "0.8 dB",
    "1.0 dB",
    "1.4 dB",
    "2.0 dB"
  ],
  correctAnswer: 2,
  explanation: "Fibre loss: 2 km × 0.35 dB/km = 0.70 dB. Connectors: 2 × 0.3 dB = 0.6 dB. Splice: 0.1 dB. Total = 0.70 + 0.6 + 0.1 = 1.4 dB."
  }
];

const DataCablingModule3Section4 = () => {
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
            <span>Module 3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Loss Budgets and OTDR Basics
          </h1>
          <p className="text-white/80">
            Practical loss calculations and OTDR trace interpretation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>SM 1310nm:</strong> 0.35 dB/km typical attenuation</li>
              <li><strong>Connector:</strong> ≤0.3 dB (Grade A)</li>
              <li><strong>Fusion splice:</strong> ≤0.1 dB typical</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Launch/receive leads on OTDR setup</li>
              <li><strong>Use:</strong> Calculate budget before installation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Build complete loss budgets with design margin",
              "Use OTDR with launch/receive fibres correctly",
              "Identify events on traces and estimate losses",
              "Set pass/fail thresholds from budgets",
              "Interpret bi-directional test results",
              "Document results for handover"
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
            Building a Loss Budget
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Loss budgets confirm whether a link will support the intended application before equipment
              is connected. They combine fibre attenuation, connector and splice losses, and design margin.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Attenuation Values</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>MM 850nm:</strong> 3.5 dB/km</li>
                  <li><strong>MM 1300nm:</strong> 1.5 dB/km</li>
                  <li><strong>SM 1310nm:</strong> 0.35 dB/km</li>
                  <li><strong>SM 1550nm:</strong> 0.25 dB/km</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Component Losses</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Connector (Grade A):</strong> ≤0.3 dB</li>
                  <li><strong>Connector (Grade B):</strong> ≤0.5 dB</li>
                  <li><strong>Fusion splice:</strong> ≤0.1 dB</li>
                  <li><strong>Design margin:</strong> 1-3 dB</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Calculation:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Link: 550m OM4 @ 850nm, two connectors, no splices</li>
                <li>Fibre: 0.55 km × 3.5 dB/km = 1.93 dB</li>
                <li>Connectors: 2 × 0.3 dB = 0.6 dB</li>
                <li>Design margin: 1.0 dB</li>
                <li><strong>Total budget: 3.53 dB</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            OTDR Setup and Operation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An OTDR sends optical pulses and measures backscatter to map events along a fibre.
              Proper setup is essential for accurate measurements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Configuration</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use launch and receive leads</li>
                  <li>Select wavelengths: 850/1300nm (MM), 1310/1550nm (SM)</li>
                  <li>Choose pulse width for link length</li>
                  <li>Set index of refraction per cable datasheet</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Launch/Receive Leads?</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Move dead zones away from link ends</li>
                  <li>Accurately measure first connector</li>
                  <li>Characterise last connector</li>
                  <li>Typically 100-500m each</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Launch</p>
                <p className="text-white/90 text-xs">Clear first dead zone</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Link Under Test</p>
                <p className="text-white/90 text-xs">Events mapped</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Receive</p>
                <p className="text-white/90 text-xs">Clear end dead zone</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Trace Interpretation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding OTDR traces allows you to identify and locate events along the fibre,
              diagnose faults, and verify installation quality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Event Signatures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Connector:</strong> Reflective spike at an event (reflection + loss)</li>
                <li><strong>Splice:</strong> Small non-reflective step (loss only)</li>
                <li><strong>Break:</strong> Large reflective end event</li>
                <li><strong>Macro-bend:</strong> Gradual slope increase</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Good Results</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Connector: ~0.2-0.5 dB loss</li>
                  <li>Fusion splice: ~0.05-0.1 dB loss</li>
                  <li>Consistent attenuation slope</li>
                  <li>Clean end reflection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Investigate These</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Connector: &gt;0.75 dB (clean/replace)</li>
                  <li>Splice: &gt;0.2 dB (rework)</li>
                  <li>Unexpected events (kinks, bends)</li>
                  <li>High back reflection</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test Procedure</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate loss budget before testing</li>
                <li>Clean all connectors including launch/receive leads</li>
                <li>Test bi-directionally and average results</li>
                <li>Save traces and export PDFs for records</li>
                <li>Set pass/fail thresholds from design budget</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping launch/receive leads:</strong> — First/last connectors not measured</li>
                <li><strong>Wrong pulse width:</strong> — Too long hides near events</li>
                <li><strong>One-direction only:</strong> — Splice losses inaccurate</li>
                <li><strong>Ignoring reflections:</strong> — Can indicate connector damage</li>
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
              <p className="font-medium text-white mb-1">Attenuation (dB/km)</p>
              <ul className="space-y-0.5">
                <li>SM 1310nm: 0.35</li>
                <li>SM 1550nm: 0.25</li>
                <li>MM 850nm: 3.5</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Loss Limits</p>
              <ul className="space-y-0.5">
                <li>Connector: ≤0.3 dB (Grade A)</li>
                <li>Fusion splice: ≤0.1 dB</li>
                <li>Design margin: 1-3 dB</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule3Section4;