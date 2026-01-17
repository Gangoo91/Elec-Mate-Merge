import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule4Section4 = () => {
  useSEO({
    title: "Testing Sensitive Equipment (SERDs) | Inspection & Testing",
    description: "Learn how to safely test circuits with sensitive electronic equipment using SERDs and reduced test voltages."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "SERDs (Surge and Electronically Rated Devices) cannot withstand standard 500V DC test voltage",
    "Options: disconnect equipment, use SERD test function, or accept limitations and document",
    "Many modern instruments have a dedicated low-current or SERD test mode"
  ];

  const learningOutcomes = [
    { title: "Identify SERDs", desc: "Recognise sensitive equipment" },
    { title: "Understand Risks", desc: "Why 500V damages electronics" },
    { title: "SERD Test Mode", desc: "Use instrument features" },
    { title: "Alternative Methods", desc: "Other testing approaches" },
    { title: "Documentation", desc: "Record limitations properly" },
    { title: "Practical Solutions", desc: "Work around constraints" }
  ];

  const faqs = [
    {
      q: "What exactly is a SERD?",
      a: "SERD stands for Surge and Electronically Rated Device. It refers to equipment containing electronic components that can be damaged by the high test voltages used in insulation resistance testing. This includes most modern electronic equipment."
    },
    {
      q: "What does SERD test mode do?",
      a: "SERD mode limits the test voltage to 250V DC or less, and limits the output current to prevent damage. This allows basic insulation testing of circuits with connected electronics, though readings may be affected by the equipment."
    },
    {
      q: "Can I just disconnect everything?",
      a: "Ideally yes, but in practice some equipment is hard-wired or disconnection would cause other problems. SERD mode is a compromise allowing testing without disconnection, though with some limitations on accuracy."
    },
    {
      q: "Will SERD mode give accurate readings?",
      a: "Not always. Connected electronics may have components that create parallel paths, reducing apparent insulation resistance. Results should be interpreted with this in mind - you're testing cable insulation plus whatever the equipment adds."
    },
    {
      q: "What if my instrument doesn't have SERD mode?",
      a: "Options: use 250V range (if available), disconnect all sensitive equipment, or document that standard testing couldn't be performed due to sensitive equipment and explain what alternative verification was done."
    },
    {
      q: "Is it acceptable to skip IR testing of circuits with electronics?",
      a: "Not ideal, but if testing genuinely cannot be performed safely, document this clearly. State what equipment prevented testing, what alternative checks were made, and recommend re-testing if equipment is replaced."
    }
  ];

  const quizQuestions = [
    {
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
      question: "Why can 500V DC damage electronic equipment?",
      options: [
        "It's too low a voltage",
        "Electronic components are rated for lower voltages",
        "It creates too much heat",
        "The frequency is wrong"
      ],
      correctIndex: 1,
      explanation: "Electronic components (MOVs, capacitors, semiconductors) are often rated for much lower voltages and can be permanently damaged by 500V DC."
    },
    {
      question: "SERD test mode typically limits voltage to:",
      options: ["500V DC", "1000V DC", "250V DC or less", "12V DC"],
      correctIndex: 2,
      explanation: "SERD mode limits test voltage to 250V DC or lower, and often limits current too, to prevent damage to sensitive equipment."
    },
    {
      question: "Which is NOT considered a SERD?",
      options: ["LED driver", "SPD", "Incandescent lamp", "PIR sensor"],
      correctIndex: 2,
      explanation: "Incandescent lamps are simple resistive loads with no sensitive electronics. LED drivers, SPDs, and PIR sensors all contain electronic components."
    },
    {
      question: "When using SERD mode, readings may be:",
      options: [
        "Always higher than actual",
        "Lower due to parallel paths in electronics",
        "Always exactly accurate",
        "In kilohms instead of megohms"
      ],
      correctIndex: 1,
      explanation: "Connected electronics may create parallel resistance paths, causing lower readings than the actual cable insulation resistance."
    },
    {
      question: "If IR testing cannot be performed due to SERDs, you should:",
      options: [
        "Just write 'PASS'",
        "Leave the result blank",
        "Document the limitation and alternative checks",
        "Use 1000V to override"
      ],
      correctIndex: 2,
      explanation: "Document why testing couldn't be performed, what equipment prevented it, and what alternative verification was carried out."
    },
    {
      question: "SPDs (Surge Protection Devices) contain:",
      options: [
        "Only resistors",
        "MOVs designed to conduct at overvoltage",
        "No electronic components",
        "High-voltage capacitors"
      ],
      correctIndex: 1,
      explanation: "SPDs contain Metal Oxide Varistors (MOVs) specifically designed to conduct at elevated voltages - exactly what IR test voltage triggers."
    },
    {
      question: "The best approach for circuits with fixed electronics is:",
      options: [
        "Skip IR testing entirely",
        "Use SERD mode or disconnect and test separately",
        "Always use 1000V",
        "Test with the circuit live"
      ],
      correctIndex: 1,
      explanation: "Use SERD mode for a basic test, or where possible disconnect electronics and test the wiring separately, then reconnect."
    },
    {
      question: "Smart home devices should be:",
      options: [
        "Left connected - they're designed for testing",
        "Disconnected or isolated during IR testing",
        "Tested at 1000V",
        "Powered on during testing"
      ],
      correctIndex: 1,
      explanation: "Smart home devices contain sensitive microprocessors and may be damaged by IR test voltages. Disconnect before standard testing."
    },
    {
      question: "If using 250V on a 230V circuit with SERDs connected:",
      options: [
        "This provides a compliant test",
        "Results should note reduced test voltage",
        "The circuit will be damaged",
        "This is not permitted"
      ],
      correctIndex: 1,
      explanation: "While 500V is standard for 230V circuits, using 250V with SERDs connected is a reasonable compromise - but document it clearly."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module-4')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 4</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 4 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-3xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 rounded-full">
            <span className="text-purple-400 text-sm font-medium">Module 4 • Insulation Resistance</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Testing Sensitive Equipment
          </h1>
          <p className="text-ios-body text-white/70">
            How to safely test circuits containing SERDs and electronic equipment.
          </p>
        </section>

        {/* In 30 Seconds */}
        <Card variant="ios-elevated" className="p-5">
          <h2 className="text-ios-headline font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-elec-yellow" />
            In 30 Seconds
          </h2>
          <ul className="space-y-3">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-base">{point}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Learning Outcomes */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white">Learning Outcomes</h2>
          <div className="grid grid-cols-2 gap-3">
            {learningOutcomes.map((outcome, i) => (
              <Card key={i} variant="ios" className="p-4">
                <p className="text-elec-yellow font-semibold text-sm mb-1">{outcome.title}</p>
                <p className="text-white/60 text-sm">{outcome.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Content Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-ios-title-2 font-bold text-white">What are SERDs?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <Shield className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-purple-400 font-semibold">SERD</p>
                <p className="text-white/60 text-sm">Surge and Electronically Rated Device</p>
              </div>
            </div>
            <p className="text-white/80">
              SERDs are any equipment containing electronic components that could be damaged by the high DC
              voltages used in insulation resistance testing. Modern buildings contain many such devices.
            </p>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">Common SERDs</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "SPDs", reason: "MOVs conduct at overvoltage" },
                { name: "LED Drivers", reason: "Capacitors, semiconductors" },
                { name: "Dimmers", reason: "TRIAC and control circuits" },
                { name: "PIR Sensors", reason: "Detection circuitry" },
                { name: "Smoke Detectors", reason: "Ionisation chambers" },
                { name: "Smart Switches", reason: "Microprocessors" },
                { name: "HVAC Controls", reason: "Electronic thermostats" },
                { name: "EV Chargers", reason: "Charging controllers" },
                { name: "Door Entry", reason: "Communication electronics" },
                { name: "Alarm Panels", reason: "Complex electronics" }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3">
                  <p className="text-purple-400 font-semibold text-sm">{item.name}</p>
                  <p className="text-white/60 text-xs">{item.reason}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <InlineCheck
          question="What does SERD stand for?"
          options={[
            "Standard Electrical Resistance Device",
            "Surge and Electronically Rated Device",
            "Safety Equipment Rating Device",
            "Switched Electronic Relay Device"
          ]}
          correctIndex={1}
          explanation="SERD = Surge and Electronically Rated Device - equipment containing electronics that may be damaged by test voltages."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Why 500V is a Problem</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Electronic components are often rated for much lower voltages than the 500V DC test voltage:
            </p>
            <div className="space-y-3">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 font-semibold mb-1">MOVs (in SPDs)</p>
                <p className="text-white/70 text-sm">Designed to conduct at 275-400V. 500V test voltage triggers them repeatedly.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Capacitors</p>
                <p className="text-white/70 text-sm">Often rated 250-400V. 500V can cause breakdown or reduced lifespan.</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-semibold mb-1">Semiconductors</p>
                <p className="text-white/70 text-sm">Gate voltages often under 50V. 500V causes immediate damage.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">SERD Test Mode</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Many modern multifunction testers include a <strong className="text-white">SERD test mode</strong> with:
            </p>
            <ul className="space-y-2">
              {[
                "Reduced test voltage (typically 250V or lower)",
                "Current limiting (prevents damage to components)",
                "Faster discharge (safer for connected equipment)",
                "Clear indication that SERD mode is active"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Check your instrument:</strong> Look for a SERD button or menu option. Consult the manual for your specific model's capabilities.
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="SERD test mode typically limits voltage to:"
          options={["500V DC", "1000V DC", "250V DC or less", "12V DC"]}
          correctIndex={2}
          explanation="SERD mode reduces test voltage to 250V DC or lower to prevent damage to sensitive electronics."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Alternative Approaches</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">Option 1: Disconnect</p>
                <p className="text-white/70 text-sm">Physically disconnect all SERDs, test wiring at 500V, then reconnect. Best for accurate results.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-blue-400 font-semibold">Option 2: SERD Mode</p>
                <p className="text-white/70 text-sm">Use instrument's SERD function. Quick but readings may be affected by connected electronics.</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4">
                <p className="text-amber-400 font-semibold">Option 3: 250V Range</p>
                <p className="text-white/70 text-sm">If no SERD mode, use 250V setting. Less stress on equipment but not full compliance.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-purple-400 font-semibold">Option 4: Document Limitation</p>
                <p className="text-white/70 text-sm">If testing cannot be safely performed, document this clearly with reasons.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Documentation</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              When testing circuits with SERDs, always document:
            </p>
            <ul className="space-y-2">
              {[
                "What equipment was present on the circuit",
                "Whether equipment was disconnected or left connected",
                "Test voltage used (500V, 250V, or SERD mode)",
                "Any limitations affecting results",
                "Alternative checks performed if standard testing wasn't possible"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <p className="text-elec-yellow text-sm font-semibold">Certificate Note Example:</p>
              <p className="text-white/70 text-sm mt-1">
                "Circuit 5: IR test at 250V DC (SERD mode) due to integral LED drivers.
                Reading &gt;200MΩ with equipment connected."
              </p>
            </div>
          </Card>
        </section>

        <InlineCheck
          question="If IR testing cannot be performed due to SERDs, you should:"
          options={[
            "Just write 'PASS'",
            "Leave the result blank",
            "Document the limitation and alternatives",
            "Use 1000V to override"
          ]}
          correctIndex={2}
          explanation="Always document why testing couldn't be performed as standard, what alternatives were used, and any limitations."
        />

        {/* Practical Tips */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <Wrench className="w-6 h-6 text-elec-yellow" />
            Practical Tips
          </h2>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold mb-1">Test Before Installing</p>
                <p className="text-white/70 text-sm">IR test cables before connecting equipment. Much easier than disconnecting later.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Fused Connection Units</p>
                <p className="text-white/70 text-sm">Where FCUs supply SERDs, remove the fuse to isolate equipment while testing the circuit wiring.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">SPD Location</p>
                <p className="text-white/70 text-sm">SPDs at the consumer unit affect all circuits. Disconnect the SPD before whole-installation IR testing.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-elec-yellow" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                variant="ios"
                className="overflow-hidden"
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              >
                <button className="w-full p-4 flex items-center justify-between text-left touch-manipulation">
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-elec-yellow flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-white/70 text-sm">{faq.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Reference Card */}
        <UnitsPocketCard
          title="SERD Testing Reference"
          items={[
            { term: "SERD Definition", definition: "Surge & Electronically Rated Device" },
            { term: "Standard Voltage", definition: "500V DC (may damage SERDs)" },
            { term: "SERD Mode", definition: "≤250V DC, current-limited" },
            { term: "Best Approach", definition: "Disconnect before testing" },
            { term: "Must Document", definition: "Test method and limitations" },
            { term: "Common SERDs", definition: "SPDs, LEDs, dimmers, PIRs" }
          ]}
        />

        {/* Quiz */}
        <section className="space-y-4">
          <h2 className="text-ios-title-2 font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-elec-yellow" />
            Section Quiz
          </h2>
          <Quiz
            questions={quizQuestions}
            onComplete={() => {}}
          />
        </section>

        {/* Navigation */}
        <nav className="flex gap-3 pt-6 pb-safe">
          <Button
            variant="ios-secondary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module-4/section-3')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module-4/section-5')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule4Section4;
