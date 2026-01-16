import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, Wrench, Lightbulb, HelpCircle, ChevronDown, ChevronUp, BookOpen, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useSEO from '@/hooks/useSEO';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';

const InspectionTestingModule3Section5 = () => {
  useSEO({
    title: "Low Resistance Measurement Techniques | Inspection & Testing",
    description: "Master low-resistance measurement techniques including lead nulling, four-terminal testing, and minimising errors."
  });

  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const keyPoints = [
    "Low-resistance ohmmeters generate high test currents (typically 200mA) to measure milliohm values",
    "Test lead resistance must be nulled/zeroed before testing to ensure accurate readings",
    "Four-terminal (Kelvin) measurement eliminates lead and contact resistance errors"
  ];

  const learningOutcomes = [
    { title: "Understand Instruments", desc: "Know how low-resistance ohmmeters work" },
    { title: "Null Test Leads", desc: "Zero out lead resistance correctly" },
    { title: "Minimise Errors", desc: "Identify and avoid measurement errors" },
    { title: "Four-Terminal Testing", desc: "Apply Kelvin measurement technique" },
    { title: "Interpret Results", desc: "Understand what readings mean" },
    { title: "Maintain Accuracy", desc: "Care for and verify test equipment" }
  ];

  const faqs = [
    {
      q: "Why do low-resistance ohmmeters use high test currents?",
      a: "Standard multimeters use very small currents which are insufficient to measure milliohm resistances accurately. A 200mA test current generates a measurable voltage drop even across very low resistances, following Ohm's law (V=IR)."
    },
    {
      q: "What is lead nulling and why is it important?",
      a: "Lead nulling subtracts the resistance of the test leads themselves from the measurement. Test leads typically have 0.01-0.05Ω resistance. Without nulling, this would be added to every reading, causing significant errors when measuring values under 1Ω."
    },
    {
      q: "How does four-terminal (Kelvin) measurement work?",
      a: "Two terminals carry the test current through the resistance, while two separate terminals measure the voltage drop. Because the voltage-sensing terminals carry almost no current, lead and contact resistances don't affect the measurement."
    },
    {
      q: "What test current should be used for continuity testing?",
      a: "BS 7671 requires a test current of no less than 200mA. This current is sufficient to break down resistive oxide layers on connections and provide accurate readings of the true metallic resistance."
    },
    {
      q: "How do dirty or corroded connections affect readings?",
      a: "Oxidation and contamination create a resistive layer on connection surfaces. The 200mA test current helps penetrate light corrosion, but heavy contamination will cause elevated readings. Clean connection points if results seem inconsistent."
    },
    {
      q: "What causes fluctuating readings?",
      a: "Common causes: poor probe contact, loose connections in the circuit under test, inductive effects on long cable runs, or interference from nearby equipment. Ensure firm probe pressure and re-test for consistent results."
    }
  ];

  const quizQuestions = [
    {
      question: "What is the minimum test current required for continuity testing per BS 7671?",
      options: ["50mA", "100mA", "200mA", "500mA"],
      correctIndex: 2,
      explanation: "BS 7671 specifies a minimum test current of 200mA for continuity testing to ensure oxide layers are penetrated and true resistance is measured."
    },
    {
      question: "Why must test leads be nulled before taking measurements?",
      options: [
        "To charge the instrument's battery",
        "To subtract lead resistance from readings",
        "To calibrate the display",
        "To test the fuse"
      ],
      correctIndex: 1,
      explanation: "Nulling subtracts the inherent resistance of the test leads from all subsequent measurements, ensuring only the circuit resistance is measured."
    },
    {
      question: "What does a four-terminal (Kelvin) measurement eliminate?",
      options: [
        "Capacitive reactance",
        "Inductive reactance",
        "Lead and contact resistance errors",
        "Temperature effects"
      ],
      correctIndex: 2,
      explanation: "Four-terminal measurement uses separate current and voltage sensing leads, eliminating lead and contact resistance from the measurement."
    },
    {
      question: "What would cause an unexpectedly high continuity reading?",
      options: [
        "Short test leads",
        "Corroded or loose connections",
        "Excess test current",
        "Cold conductor temperature"
      ],
      correctIndex: 1,
      explanation: "Corroded or loose connections add resistance to the circuit, causing higher than expected readings. This could indicate a potentially dangerous connection."
    },
    {
      question: "Before testing, test leads should be:",
      options: [
        "Extended to full length",
        "Shorted together and nulled",
        "Connected to mains earth",
        "Wound into a coil"
      ],
      correctIndex: 1,
      explanation: "Test leads should be connected together (shorted) and the instrument nulled to zero to subtract their resistance from subsequent measurements."
    },
    {
      question: "What resistance value would typically indicate an open circuit?",
      options: ["0.00Ω", "0.50Ω", "1.00Ω", "OL or ∞"],
      correctIndex: 3,
      explanation: "OL (Over Limit) or ∞ (infinity) indicates an open circuit with no continuous path. Good connections should read in the milliohm to low ohm range."
    },
    {
      question: "Why does BS 7671 specify a minimum 200mA test current?",
      options: [
        "To heat the conductor",
        "To magnetise the core",
        "To break down oxide layers",
        "To trip protective devices"
      ],
      correctIndex: 2,
      explanation: "The 200mA current is sufficient to break through thin oxide films on connections, revealing the true resistance of the metallic path."
    },
    {
      question: "Which affects low-resistance readings most significantly?",
      options: [
        "Ambient humidity",
        "Barometric pressure",
        "Conductor temperature",
        "Time of day"
      ],
      correctIndex: 2,
      explanation: "Conductor resistance varies with temperature. Copper has a positive temperature coefficient - resistance increases with temperature."
    },
    {
      question: "What is the typical resolution needed for continuity testing?",
      options: ["1Ω", "0.1Ω", "0.01Ω", "100Ω"],
      correctIndex: 2,
      explanation: "Continuity tests measure milliohm values. A resolution of 0.01Ω (10mΩ) is typically needed to accurately assess conductor and connection quality."
    },
    {
      question: "When using a standard 2-wire measurement, lead resistance:",
      options: [
        "Has no effect",
        "Is added to the measured value",
        "Is subtracted automatically",
        "Only affects AC readings"
      ],
      correctIndex: 1,
      explanation: "In 2-wire measurement, lead resistance is included in the reading. This is why nulling is essential - it compensates for the lead resistance."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* iOS Header */}
      <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module3')}
            className="flex items-center gap-2 text-elec-yellow active:opacity-70 transition-opacity touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Module 3</span>
          </button>
          <span className="text-sm text-white/50 font-medium">Section 5 of 6</span>
        </div>
      </header>

      <main className="px-4 py-6 pb-safe space-y-8 max-w-2xl mx-auto">
        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
            <span className="text-emerald-400 text-sm font-medium">Module 3 • Continuity Testing</span>
          </div>
          <h1 className="text-ios-title-large font-bold text-white">
            Low Resistance Measurement Techniques
          </h1>
          <p className="text-ios-body text-white/70">
            Master accurate low-resistance measurements with proper techniques, lead nulling, and error minimisation.
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
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
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
            <h2 className="text-ios-title-2 font-bold text-white">Why Low-Resistance Testing?</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Continuity testing measures very small resistances - typically in the <strong className="text-white">milliohm
              (mΩ) range</strong>. Standard multimeters cannot accurately measure such low values because they use
              insufficient test current and lack the necessary resolution.
            </p>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-sm text-white/70">
                <strong className="text-elec-yellow">Example:</strong> A 20m length of 2.5mm² copper conductor has a
                theoretical resistance of about 0.15Ω. You need equipment that can resolve 0.01Ω to measure this accurately.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-ios-title-2 font-bold text-white">The 200mA Requirement</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="flex items-center gap-4 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
              <Gauge className="w-12 h-12 text-elec-yellow" />
              <div>
                <p className="text-elec-yellow font-semibold">BS 7671 Requirement</p>
                <p className="text-white/70 text-sm">Minimum test current of 200mA</p>
              </div>
            </div>
            <p className="text-white/80">
              The 200mA current serves critical purposes:
            </p>
            <ul className="space-y-2">
              {[
                "Breaks through thin oxide films on connections",
                "Generates measurable voltage across low resistances",
                "Reveals poor connections that lighter currents might miss",
                "Provides consistent, repeatable results"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <InlineCheck
          question="Why does BS 7671 specify a 200mA minimum test current?"
          options={[
            "To heat the conductor for thermal testing",
            "To break through oxide layers on connections",
            "To trip the circuit breaker",
            "To magnetise protective devices"
          ]}
          correctIndex={1}
          explanation="The 200mA test current is specified to break through thin oxide films that naturally form on metal surfaces, revealing the true resistance of the connection."
        />

        {/* Content Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-ios-title-2 font-bold text-white">Lead Nulling (Zeroing)</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              Test leads have their own resistance (typically 0.01-0.05Ω). Without nulling, this is added
              to every measurement, causing significant errors on low readings.
            </p>
            <div className="space-y-3">
              <p className="text-white font-semibold">Nulling Procedure:</p>
              {[
                { step: 1, text: "Connect test leads together (short circuit)" },
                { step: 2, text: "Press the NULL or ZERO button on instrument" },
                { step: 3, text: "Display should read 0.00Ω" },
                { step: 4, text: "All subsequent readings exclude lead resistance" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 text-sm">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Re-null whenever you change test leads or at the start of each test sequence.
              </p>
            </div>
          </Card>
        </section>

        {/* Content Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-ios-title-2 font-bold text-white">Four-Terminal (Kelvin) Measurement</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <p className="text-white/80">
              For the most accurate low-resistance measurements, four-terminal (Kelvin) testing eliminates
              lead and contact resistance entirely.
            </p>
            <div className="grid gap-3">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-2">Current Terminals (C)</p>
                <p className="text-white/70 text-sm">Two leads inject the test current through the resistance being measured.</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-semibold mb-2">Potential Terminals (P)</p>
                <p className="text-white/70 text-sm">Two separate leads sense the voltage drop. Since almost no current flows in these leads, their resistance doesn't affect the reading.</p>
              </div>
            </div>
            <p className="text-white/60 text-sm">
              Four-terminal measurement is essential when measuring very low resistances (under 1Ω) or when
              high accuracy is required.
            </p>
          </Card>
        </section>

        <InlineCheck
          question="Before taking measurements, test leads should be:"
          options={[
            "Connected to mains earth",
            "Extended to maximum length",
            "Shorted together and nulled",
            "Coiled to reduce inductance"
          ]}
          correctIndex={2}
          explanation="Shorting leads together and nulling subtracts their inherent resistance, ensuring accurate measurements of the circuit under test."
        />

        {/* Content Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-ios-title-2 font-bold text-white">Sources of Error</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="space-y-3">
              {[
                {
                  title: "Un-nulled leads",
                  desc: "Lead resistance added to all readings",
                  color: "red"
                },
                {
                  title: "Poor probe contact",
                  desc: "Adds contact resistance, gives fluctuating readings",
                  color: "red"
                },
                {
                  title: "Temperature variation",
                  desc: "Copper resistance changes ~0.4% per °C",
                  color: "amber"
                },
                {
                  title: "Dirty connections",
                  desc: "Oxide films increase resistance",
                  color: "amber"
                },
                {
                  title: "Loose terminations",
                  desc: "Intermittent contact causes unstable readings",
                  color: "red"
                }
              ].map((error, i) => (
                <div key={i} className={`bg-${error.color}-500/10 border border-${error.color}-500/30 rounded-lg p-3`}>
                  <p className={`text-${error.color}-400 font-semibold text-sm`}>{error.title}</p>
                  <p className="text-white/70 text-xs">{error.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Content Section 06 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">06</span>
            <h2 className="text-ios-title-2 font-bold text-white">Interpreting Results</h2>
          </div>
          <Card variant="ios" className="p-5 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Reading</th>
                    <th className="text-left py-2 text-white/60">Indication</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">0.00 - 0.05Ω</td>
                    <td className="py-2">Excellent - sound connections</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">0.05 - 0.50Ω</td>
                    <td className="py-2">Normal for typical circuits</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">0.50 - 1.00Ω</td>
                    <td className="py-2">Acceptable but investigate if unexpected</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2 font-mono">&gt;1.00Ω</td>
                    <td className="py-2">High - check connections</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono">OL / ∞</td>
                    <td className="py-2">Open circuit - no continuity</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-white/60 text-sm">
              Always compare readings against expected values calculated from conductor length and CSA
              using tabulated resistance values.
            </p>
          </Card>
        </section>

        <InlineCheck
          question="What reading indicates an open circuit (no continuity)?"
          options={["0.00Ω", "0.50Ω", "1.00Ω", "OL or ∞"]}
          correctIndex={3}
          explanation="OL (Over Limit) or ∞ (infinity) symbol indicates the resistance is too high to measure - meaning there is no continuous path (open circuit)."
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
                <p className="text-emerald-400 font-semibold mb-1">Firm Probe Pressure</p>
                <p className="text-white/70 text-sm">Press probes firmly to ensure good contact. Light contact adds resistance and causes fluctuating readings.</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-400 font-semibold mb-1">Wait for Stability</p>
                <p className="text-white/70 text-sm">Allow readings to stabilise before recording. Initial readings may fluctuate as contact settles.</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-amber-400 font-semibold mb-1">Check Calibration</p>
                <p className="text-white/70 text-sm">Verify instrument calibration periodically. Use a known resistance to check accuracy.</p>
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
          title="Low-Resistance Testing Reference"
          items={[
            { term: "Min Test Current", definition: "200mA (BS 7671)" },
            { term: "Typical Resolution", definition: "0.01Ω (10mΩ)" },
            { term: "Lead Nulling", definition: "Short leads → press NULL" },
            { term: "Four-Terminal", definition: "C+P eliminate lead errors" },
            { term: "Good Connection", definition: "<0.05Ω" },
            { term: "Open Circuit", definition: "OL or ∞ display" }
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
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module3/section4')}
          >
            Previous
          </Button>
          <Button
            variant="ios-primary"
            className="flex-1 h-12 touch-manipulation"
            onClick={() => navigate('/study-centre/upskilling/inspection-testing/module3/section6')}
          >
            Next Section
          </Button>
        </nav>
      </main>
    </div>
  );
};

export default InspectionTestingModule3Section5;
