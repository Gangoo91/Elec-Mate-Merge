import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Polarity Testing - PAT Testing Course";
const DESCRIPTION = "Learn polarity testing procedures for extension leads, adapters, and IEC leads to verify correct wiring.";

const quickCheckQuestions = [
  {
    id: "m4s3-check1",
    question: "What could result from reversed polarity in a switched extension lead?",
    options: ["The fuse would blow immediately", "The switch would only disconnect neutral, leaving live connected", "The equipment would run in reverse", "There would be no effect on safety"],
    correctIndex: 1,
    explanation: "If polarity is reversed, the switch would disconnect neutral instead of live. This means the connected equipment would still have live voltage present even when switched off - a dangerous situation."
  },
  {
    id: "m4s3-check2",
    question: "When testing an extension lead, what should show continuity from plug live pin?",
    options: ["Socket neutral hole", "Socket earth hole", "Socket live hole", "All three holes"],
    correctIndex: 2,
    explanation: "The plug live pin should show continuity only to the socket live hole. Any other result indicates incorrect wiring or a fault."
  },
  {
    id: "m4s3-check3",
    question: "An IEC lead with the earth conductor swapped with neutral would:",
    options: ["Still work safely as both are at 0V", "Present a serious shock hazard", "Not fit into the equipment", "Blow the fuse immediately"],
    correctIndex: 1,
    explanation: "If earth and neutral are swapped, equipment cases that should be earthed would be connected to neutral. If neutral becomes disconnected, the case could become live - a serious shock hazard."
  }
];

const quizQuestions = [
  { id: 1, question: "What is the primary purpose of polarity testing?", options: ["To measure resistance", "To verify conductors are connected to correct terminals", "To test insulation", "To check earth continuity"], correctAnswer: 1, explanation: "Polarity testing verifies that each conductor is connected to the correct terminal throughout the lead." },
  { id: 2, question: "Which items particularly require polarity testing?", options: ["All appliances", "Only Class II equipment", "Extension leads, adapters, and IEC leads", "Only power tools"], correctAnswer: 2, explanation: "Extension leads, adapters, and IEC leads are the main items requiring polarity testing." },
  { id: 3, question: "What could happen with reversed polarity in a switched extension?", options: ["Equipment runs backwards", "Switch disconnects neutral instead of live", "Fuse blows immediately", "No effect"], correctAnswer: 1, explanation: "Reversed polarity means the switch would break neutral, leaving live connected when 'off'." },
  { id: 4, question: "How is polarity typically verified?", options: ["Visual inspection only", "Insulation resistance test", "Continuity test from each pin to corresponding socket hole", "Earth continuity test"], correctAnswer: 2, explanation: "Polarity is verified by checking continuity between each plug pin and its corresponding socket hole." },
  { id: 5, question: "The live conductor should be:", options: ["Brown", "Blue", "Green/yellow", "Black"], correctAnswer: 0, explanation: "Brown is the current UK colour code for the live conductor." },
  { id: 6, question: "The neutral conductor should be:", options: ["Brown", "Blue", "Green/yellow", "Red"], correctAnswer: 1, explanation: "Blue is the current UK colour code for the neutral conductor." },
  { id: 7, question: "If polarity is incorrect in an IEC lead, you should:", options: ["Use it anyway as it will still work", "Rewire it correctly or replace", "Just label it as faulty", "Test it again later"], correctAnswer: 1, explanation: "Incorrect polarity must be corrected by rewiring or replacing the lead." },
  { id: 8, question: "A PAT tester checks polarity by:", options: ["Applying mains voltage", "Measuring insulation resistance", "Using low-voltage continuity between terminals", "Visual inspection"], correctAnswer: 2, explanation: "PAT testers use low-voltage continuity testing to verify polarity." },
  { id: 9, question: "Modern wiring colours in the UK are:", options: ["Red, black, green", "Brown, blue, green/yellow", "White, black, green", "Brown, black, yellow"], correctAnswer: 1, explanation: "Current UK wiring colours are brown (L), blue (N), and green/yellow (E)." },
  { id: 10, question: "Why is polarity important for single-pole switches?", options: ["They look better when correctly wired", "The switch must break the live conductor for safety", "To prevent overheating", "For warranty purposes"], correctAnswer: 1, explanation: "Single-pole switches must break the live conductor to ensure equipment is safe when switched off." }
];

const faqs = [
  { question: "Do all appliances need polarity testing?", answer: "No. Polarity testing is mainly for extension leads, adapters, and detachable leads (IEC type). Standard appliances with fixed cables are tested during manufacture and rarely have polarity issues." },
  { question: "What if I find reversed polarity?", answer: "The item should be withdrawn from use immediately. It should either be rewired correctly by a competent person or replaced. Never use equipment with incorrect polarity." },
  { question: "Can PAT testers check polarity automatically?", answer: "Most modern PAT testers include automatic polarity checks for extension leads. Some display L-N-E indicator lights that should illuminate in the correct pattern." },
  { question: "Does polarity matter for non-switched leads?", answer: "While less critical for non-switched leads, correct polarity is still important. Neutral-earth swap is dangerous, and correct wiring maintains safety standards." },
  { question: "How can polarity become reversed?", answer: "Usually through incorrect rewiring - either at manufacture or after repair. Sometimes through damage that causes internal short circuits between conductors." },
  { question: "What about two-pin equipment (no earth)?", answer: "Two-pin Class II equipment is usually non-polarised by design. The plug can be inserted either way. Polarity testing is not required for these items." }
];

const PATTestingModule4Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-4">
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
            <span>Module 4 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Polarity Testing
          </h1>
          <p className="text-white/80">
            Verifying correct wiring polarity in extension leads and cables
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Verify correct conductor connections</li>
              <li><strong>Test:</strong> Continuity pin-to-socket each conductor</li>
              <li><strong>Critical:</strong> Reversed polarity leaves live when off</li>
              <li><strong>Items:</strong> Extension leads, adapters, IEC leads</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Brown:</strong> Live (right pin)</li>
              <li><strong>Blue:</strong> Neutral (left pin)</li>
              <li><strong>Green/Yellow:</strong> Earth (top pin)</li>
              <li><strong>Check:</strong> All sockets on multi-way boards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why polarity testing is important",
              "Identify correct conductor colours and positions",
              "Describe polarity test procedures for extension leads",
              "Recognise the hazards of reversed polarity",
              "Use PAT tester polarity functions",
              "Decide when polarity testing is required"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Polarity Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Polarity Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct polarity ensures that each conductor performs its intended function.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Conductor Functions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Live (Brown):</strong> Carries current to the load. Should be interrupted by switches and protected by fuses.</li>
                <li><strong>Neutral (Blue):</strong> Return path for current. At or near earth potential during normal operation.</li>
                <li><strong>Earth (Green/Yellow):</strong> Safety conductor. Carries fault current to operate protective devices.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Reversed Polarity Hazards:</strong>
              </p>
              <ul className="text-sm text-white space-y-1 mt-2">
                <li><strong>L-N swap:</strong> Switches disconnect neutral instead of live - equipment stays live when off</li>
                <li><strong>L-E swap:</strong> Metal cases become live - immediate shock hazard</li>
                <li><strong>N-E swap:</strong> Cases connected to neutral can become live if neutral fails</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Items Requiring Polarity Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Items Requiring Polarity Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Polarity testing is primarily required for items that could have been incorrectly wired during manufacture or repair.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test These:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Extension leads (especially multi-socket)</li>
                <li>Trailing socket boards</li>
                <li>IEC detachable leads</li>
                <li>Appliance couplers</li>
                <li>Adapters and converters</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Usually Not Required:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Appliances with factory-fitted cables</li>
                <li>Equipment with moulded plugs</li>
                <li>Class II two-pin equipment</li>
                <li>Fixed wiring installations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 03: Test Procedure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Test Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Polarity is verified using continuity testing between plug pins and socket outlets.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Step-by-Step Procedure:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Step 1:</strong> Insert plug into PAT tester. The tester connects to the plug pins (L, N, E).</li>
                <li><strong>Step 2:</strong> Insert the test probe into each socket hole in turn, or use a flying lead adapter.</li>
                <li><strong>Step 3:</strong> Check that Live pin connects only to Live socket, Neutral to Neutral, Earth to Earth.</li>
                <li><strong>Step 4:</strong> Verify there is NO continuity between different conductors (no short circuits).</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Automatic Testing:</strong> Many PAT testers have automatic polarity check with L-N-E indicator lights. All three should illuminate correctly when a properly wired lead is connected.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: IEC Lead Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            IEC Lead Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              IEC leads (kettle leads, computer power cords) require polarity testing because they can be rewired incorrectly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test Method:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Plug into PAT tester socket</li>
                <li>2. Use IEC adapter on free end</li>
                <li>3. Check L-L, N-N, E-E continuity</li>
                <li>4. Verify no cross-connections</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Faults:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>L-N reversal at plug or IEC end</li>
                <li>Earth connected to wrong terminal</li>
                <li>Poor or missing earth connection</li>
                <li>Internal conductor damage</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test all extension leads and multi-socket boards</li>
                <li>Pay special attention to rewired or repaired items</li>
                <li>Check all sockets on multi-way extensions</li>
                <li>Use correct adapters for IEC and other connectors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming factory items are always correct</strong></li>
                <li><strong>Only testing one socket</strong> - on multi-way extensions</li>
                <li><strong>Ignoring polarity faults</strong> - as minor issues</li>
                <li><strong>Not testing after repairs</strong> - or modifications</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference: Polarity Testing</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">CONDUCTOR COLOURS</p>
                <ul className="space-y-0.5">
                  <li>Brown = Live (L)</li>
                  <li>Blue = Neutral (N)</li>
                  <li>Green/Yellow = Earth (E)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">PLUG PIN POSITIONS</p>
                <ul className="space-y-0.5">
                  <li>Right pin = Live (facing plug)</li>
                  <li>Left pin = Neutral</li>
                  <li>Top pin = Earth</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">ACTION ON FAULT</p>
                <ul className="space-y-0.5">
                  <li>Withdraw from use</li>
                  <li>Rewire correctly or replace</li>
                  <li>Retest before returning to service</li>
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
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule4Section3;
