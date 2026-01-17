import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Testing Sensitive Equipment (SERDs) - Module 4 Section 4";
const DESCRIPTION = "Learn how to safely test circuits with sensitive electronic equipment using SERDs and reduced test voltages.";

const quickCheckQuestions = [
  {
    id: "serd-meaning",
    question: "What does SERD stand for?",
    options: [
      "Standard Electrical Resistance Device",
      "Surge and Electronically Rated Device",
      "Safety Equipment Rating Device",
      "Switched Electronic Relay Device"
    ],
    correctIndex: 1,
    explanation: "SERD = Surge and Electronically Rated Device - equipment containing sensitive electronics that may be damaged by high test voltages."
  },
  {
    id: "serd-voltage",
    question: "SERD test mode typically limits voltage to:",
    options: ["500V DC", "1000V DC", "250V DC or less", "12V DC"],
    correctIndex: 2,
    explanation: "SERD mode limits test voltage to 250V DC or lower, and often limits current too, to prevent damage to sensitive equipment."
  },
  {
    id: "serd-documentation",
    question: "If IR testing cannot be performed due to SERDs, you should:",
    options: [
      "Just write 'PASS'",
      "Leave the result blank",
      "Document the limitation and alternative checks",
      "Use 1000V to override"
    ],
    correctIndex: 2,
    explanation: "Always document why testing couldn't be performed as standard, what alternatives were used, and any limitations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does SERD stand for?",
    options: [
      "Standard Electrical Resistance Device",
      "Surge and Electronically Rated Device",
      "Safety Equipment Rating Device",
      "Switched Electronic Relay Device"
    ],
    correctAnswer: 1,
    explanation: "SERD = Surge and Electronically Rated Device - equipment containing electronics that may be damaged by test voltages."
  },
  {
    id: 2,
    question: "Why can 500V DC damage electronic equipment?",
    options: [
      "It's too low a voltage",
      "Electronic components are rated for lower voltages",
      "It creates too much heat",
      "The frequency is wrong"
    ],
    correctAnswer: 1,
    explanation: "Electronic components (MOVs, capacitors, semiconductors) are often rated for much lower voltages and can be permanently damaged by 500V DC."
  },
  {
    id: 3,
    question: "SERD test mode typically limits voltage to:",
    options: ["500V DC", "1000V DC", "250V DC or less", "12V DC"],
    correctAnswer: 2,
    explanation: "SERD mode limits test voltage to 250V DC or lower, and often limits current too, to prevent damage to sensitive equipment."
  },
  {
    id: 4,
    question: "Which is NOT considered a SERD?",
    options: ["LED driver", "SPD", "Incandescent lamp", "PIR sensor"],
    correctAnswer: 2,
    explanation: "Incandescent lamps are simple resistive loads with no sensitive electronics. LED drivers, SPDs, and PIR sensors all contain electronic components."
  },
  {
    id: 5,
    question: "When using SERD mode, readings may be:",
    options: [
      "Always higher than actual",
      "Lower due to parallel paths in electronics",
      "Always exactly accurate",
      "In kilohms instead of megohms"
    ],
    correctAnswer: 1,
    explanation: "Connected electronics may create parallel resistance paths, causing lower readings than the actual cable insulation resistance."
  },
  {
    id: 6,
    question: "If IR testing cannot be performed due to SERDs, you should:",
    options: [
      "Just write 'PASS'",
      "Leave the result blank",
      "Document the limitation and alternative checks",
      "Use 1000V to override"
    ],
    correctAnswer: 2,
    explanation: "Document why testing couldn't be performed, what equipment prevented it, and what alternative verification was carried out."
  },
  {
    id: 7,
    question: "SPDs (Surge Protection Devices) contain:",
    options: [
      "Only resistors",
      "MOVs designed to conduct at overvoltage",
      "No electronic components",
      "High-voltage capacitors"
    ],
    correctAnswer: 1,
    explanation: "SPDs contain Metal Oxide Varistors (MOVs) specifically designed to conduct at elevated voltages - exactly what IR test voltage triggers."
  },
  {
    id: 8,
    question: "The best approach for circuits with fixed electronics is:",
    options: [
      "Skip IR testing entirely",
      "Use SERD mode or disconnect and test separately",
      "Always use 1000V",
      "Test with the circuit live"
    ],
    correctAnswer: 1,
    explanation: "Use SERD mode for a basic test, or where possible disconnect electronics and test the wiring separately, then reconnect."
  },
  {
    id: 9,
    question: "Smart home devices should be:",
    options: [
      "Left connected - they're designed for testing",
      "Disconnected or isolated during IR testing",
      "Tested at 1000V",
      "Powered on during testing"
    ],
    correctAnswer: 1,
    explanation: "Smart home devices contain sensitive microprocessors and may be damaged by IR test voltages. Disconnect before standard testing."
  },
  {
    id: 10,
    question: "If using 250V on a 230V circuit with SERDs connected:",
    options: [
      "This provides a compliant test",
      "Results should note reduced test voltage",
      "The circuit will be damaged",
      "This is not permitted"
    ],
    correctAnswer: 1,
    explanation: "While 500V is standard for 230V circuits, using 250V with SERDs connected is a reasonable compromise - but document it clearly."
  }
];

const faqs = [
  {
    question: "What exactly is a SERD?",
    answer: "SERD stands for Surge and Electronically Rated Device. It refers to equipment containing electronic components that can be damaged by the high test voltages used in insulation resistance testing. This includes most modern electronic equipment."
  },
  {
    question: "What does SERD test mode do?",
    answer: "SERD mode limits the test voltage to 250V DC or less, and limits the output current to prevent damage. This allows basic insulation testing of circuits with connected electronics, though readings may be affected by the equipment."
  },
  {
    question: "Can I just disconnect everything?",
    answer: "Ideally yes, but in practice some equipment is hard-wired or disconnection would cause other problems. SERD mode is a compromise allowing testing without disconnection, though with some limitations on accuracy."
  },
  {
    question: "Will SERD mode give accurate readings?",
    answer: "Not always. Connected electronics may have components that create parallel paths, reducing apparent insulation resistance. Results should be interpreted with this in mind - you're testing cable insulation plus whatever the equipment adds."
  },
  {
    question: "What if my instrument doesn't have SERD mode?",
    answer: "Options: use 250V range (if available), disconnect all sensitive equipment, or document that standard testing couldn't be performed due to sensitive equipment and explain what alternative verification was done."
  },
  {
    question: "Is it acceptable to skip IR testing of circuits with electronics?",
    answer: "Not ideal, but if testing genuinely cannot be performed safely, document this clearly. State what equipment prevented testing, what alternative checks were made, and recommend re-testing if equipment is replaced."
  }
];

const InspectionTestingModule4Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Testing Sensitive Equipment
          </h1>
          <p className="text-white/80">
            How to safely test circuits containing SERDs and electronic equipment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Problem:</strong> SERDs can't withstand 500V DC</li>
              <li><strong>Solution:</strong> SERD mode, disconnect, or document</li>
              <li><strong>Instruments:</strong> Many have dedicated SERD test mode</li>
              <li><strong>Always:</strong> Document any limitations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Common SERDs</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>SPDs:</strong> MOVs conduct at overvoltage</li>
              <li><strong>LED Drivers:</strong> Capacitors, semiconductors</li>
              <li><strong>Dimmers:</strong> TRIAC and control circuits</li>
              <li><strong>PIRs/Alarms:</strong> Detection circuitry</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify SERDs and sensitive equipment",
              "Understand why 500V damages electronics",
              "Use instrument SERD test mode",
              "Know alternative testing methods",
              "Document limitations properly",
              "Apply practical workarounds"
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

        {/* Section 1: What are SERDs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What are SERDs?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10">
              <p className="text-elec-yellow font-semibold">SERD</p>
              <p className="text-white/60 text-sm">Surge and Electronically Rated Device</p>
            </div>

            <p>
              SERDs are any equipment containing electronic components that could be damaged by the high DC
              voltages used in insulation resistance testing. Modern buildings contain many such devices.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Examples of SERDs:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "LED drivers",
                  "Dimmer switches",
                  "PIR sensors",
                  "Smoke detectors",
                  "Timers/programmers",
                  "SPDs",
                  "Electronic starters",
                  "Control gear",
                  "Thermostats",
                  "Door bells",
                  "Alarm panels",
                  "Smart home devices"
                ].map((item, i) => (
                  <div key={i} className="text-sm text-white/80">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why 500V is a Problem */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Why 500V is a Problem
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electronic components are often rated for much lower voltages than the 500V DC test voltage:
            </p>

            <div className="space-y-3 my-6">
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-medium text-sm">MOVs (in SPDs)</p>
                <p className="text-white/70 text-sm">Designed to conduct at 275-400V. 500V test voltage triggers them repeatedly.</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-medium text-sm">Capacitors</p>
                <p className="text-white/70 text-sm">Often rated 250-400V. 500V can cause breakdown or reduced lifespan.</p>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/10">
                <p className="text-elec-yellow font-medium text-sm">Semiconductors</p>
                <p className="text-white/70 text-sm">Gate voltages often under 50V. 500V causes immediate damage.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: SERD Test Mode */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            SERD Test Mode
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Many modern multifunction testers include a <strong className="text-white">SERD test mode</strong> with:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Reduced test voltage (typically 250V or lower)</li>
                <li>Current limiting (prevents damage to components)</li>
                <li>Faster discharge (safer for connected equipment)</li>
                <li>Clear indication that SERD mode is active</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Check your instrument:</strong> Look for a SERD button or menu option. Consult the manual for your specific model's capabilities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Alternative Approaches */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Alternative Approaches
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="space-y-4 my-6">
              <div className="border-l-2 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-medium text-sm">Option 1: Disconnect</p>
                <p className="text-white/70 text-sm">Physically disconnect all SERDs, test wiring at 500V, then reconnect. Best for accurate results.</p>
              </div>
              <div className="border-l-2 border-blue-400 pl-4">
                <p className="text-blue-400 font-medium text-sm">Option 2: SERD Mode</p>
                <p className="text-white/70 text-sm">Use instrument's SERD function. Quick but readings may be affected by connected electronics.</p>
              </div>
              <div className="border-l-2 border-amber-400 pl-4">
                <p className="text-amber-400 font-medium text-sm">Option 3: 250V Range</p>
                <p className="text-white/70 text-sm">If no SERD mode, use 250V setting. Less stress on equipment but not full compliance.</p>
              </div>
              <div className="border-l-2 border-elec-yellow pl-4">
                <p className="text-elec-yellow font-medium text-sm">Option 4: Document Limitation</p>
                <p className="text-white/70 text-sm">If testing cannot be safely performed, document this clearly with reasons.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When testing circuits with SERDs, always document:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>What equipment was present on the circuit</li>
                <li>Whether equipment was disconnected or left connected</li>
                <li>Test voltage used (500V, 250V, or SERD mode)</li>
                <li>Any limitations affecting results</li>
                <li>Alternative checks performed if standard testing wasn't possible</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10">
              <p className="text-elec-yellow text-sm font-semibold">Certificate Note Example:</p>
              <p className="text-white/70 text-sm mt-1">
                "Circuit 5: IR test at 250V DC (SERD mode) due to integral LED drivers.
                Reading &gt;200MΩ with equipment connected."
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Practical Tips */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Practical Tips
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="space-y-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Test Before Installing</p>
                <p className="text-sm text-white/80">IR test cables before connecting equipment. Much easier than disconnecting later.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Fused Connection Units</p>
                <p className="text-sm text-white/80">Where FCUs supply SERDs, remove the fuse to isolate equipment while testing the circuit wiring.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">SPD Location</p>
                <p className="text-sm text-white/80">SPDs at the consumer unit affect all circuits. Disconnect the SPD before whole-installation IR testing.</p>
              </div>
            </div>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">SERD Testing</p>
                <ul className="space-y-0.5">
                  <li>SERD = Surge & Electronically Rated Device</li>
                  <li>Standard: 500V DC (may damage SERDs)</li>
                  <li>SERD Mode: &le;250V DC, current-limited</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Best Practice</p>
                <ul className="space-y-0.5">
                  <li>Disconnect before testing if possible</li>
                  <li>Use SERD mode when available</li>
                  <li>Always document limitations</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-4/section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule4Section4;
