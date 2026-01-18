import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "event-based-logging",
    question: "Why is event-based data logging useful in fault diagnosis?",
    options: [
      "It records data faster than continuous logging",
      "It captures the exact timing of system changes (pump starts, alarms) to identify the sequence of events",
      "It uses less storage space"
    ],
    correctIndex: 1,
    explanation: "Event-based logging captures the exact timing of system changes which helps engineers understand the sequence of events leading to a fault. This timeline is crucial for identifying root causes."
  },
  {
    id: "trend-energy-waste",
    question: "How can trend logs help reduce energy waste?",
    options: [
      "By automatically fixing energy problems",
      "By revealing patterns like equipment running during unoccupied hours",
      "By increasing system efficiency directly"
    ],
    correctIndex: 1,
    explanation: "Trend logs reveal patterns of energy waste such as equipment running during unoccupied hours, systems operating at inefficient settings, or simultaneous heating and cooling."
  },
  {
    id: "sensor-calibration-data",
    question: "Why is sensor calibration critical for reliable historical data?",
    options: [
      "It makes sensors last longer",
      "It creates systematic errors that make historical analysis unreliable",
      "It reduces installation costs"
    ],
    correctIndex: 1,
    explanation: "Inaccurate sensor calibration creates systematic errors in logged data. A miscalibrated sensor might show normal readings when conditions are actually problematic, compromising fault diagnosis and compliance reporting."
  },
  {
    id: "logging-frequency",
    question: "Why should logging frequencies be chosen carefully?",
    options: [
      "To save money on sensors",
      "Because too frequent creates data overload while too slow misses important events",
      "To comply with colour coding standards"
    ],
    correctIndex: 1,
    explanation: "Logging frequency must balance data quality with storage requirements. Too frequent logging creates excessive data storage overhead, while too slow logging might miss important events or rapid changes."
  }
];

const faqs = [
  {
    question: "How long should trend data be retained?",
    answer: "Typically 1-2 years for operational data, longer for compliance records. Some critical safety data may need retention for 5+ years. Consider storage capacity and regulatory requirements."
  },
  {
    question: "What happens if a sensor fails during logging?",
    answer: "The BMS should flag sensor faults and log error states rather than false readings. This prevents misleading historical data and alerts operators to sensor problems."
  },
  {
    question: "Can trend data be exported for analysis?",
    answer: "Most BMS systems allow data export to CSV or Excel formats for detailed analysis, compliance reporting, or integration with energy management software."
  },
  {
    question: "What logging frequency should be used for different parameters?",
    answer: "Room temperature: 15-30 minutes. Critical equipment: 1-5 minutes. Energy meters: hourly. Status changes: immediate (event-based). Balance data quality with storage requirements."
  }
];

const quizQuestion = {
  question: "An office building logged CO2 levels as constant 400 ppm for weeks, despite air quality complaints. Investigation found the sensor was wired but never powered. What does this demonstrate?",
  options: [
    "The BMS software had a bug",
    "CO2 sensors are unreliable",
    "Commissioning verification of the entire signal path is essential for reliable data",
    "Air quality complaints are usually exaggerated"
  ],
  correctAnswer: 2,
  explanation: "The case study shows why commissioning must verify the entire signal path from sensor to logged data. Simply checking wiring continuity isn't enough - you must confirm sensors are powered and readings are accurate."
};

const BMSModule6Section2 = () => {
  useSEO({
    title: "BMS Trend Logging and Historical Data | Module 6.2",
    description: "Learn about data logging and historical analysis for Building Management Systems including sensor installation, calibration, and data reliability."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bms-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Trend Logging and Historical Data
          </h1>
          <p className="text-white">
            Recording and analysing BMS data for fault diagnosis and optimisation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Continuous:</strong> Regular intervals (temp every 15 min)</li>
              <li><strong>Event-based:</strong> On change (pump on/off, alarms)</li>
              <li><strong>Uses:</strong> Fault diagnosis, energy saving, compliance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Trend graphs showing temperature over time</li>
              <li><strong>Use:</strong> Shielded cabling for analog signals</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose of trend logging in a BMS",
              "Describe how historical data supports energy management and compliance",
              "Identify the electrician's role in ensuring accurate logged data",
              "Apply best practices for sensor installation and data reliability"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: What is Trend Logging */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Trend Logging?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Trend logging is the <strong>process of recording values at set intervals</strong> to create a historical record. Think of it as creating a diary for your building systems - every temperature reading, pressure measurement, and equipment status is recorded with a timestamp.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm font-medium text-blue-300 mb-2">Continuous Logging</p>
                <p className="text-sm text-white">Captures measurements at regular intervals - every 5 minutes, hourly, etc. Used for temperature, humidity, CO2 levels, and energy consumption.</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-300 mb-2">Event-Based Logging</p>
                <p className="text-sm text-white">Only records when something changes or events occur. Pump on/off, alarms triggering, valve positions. Saves storage while capturing key behaviour.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <p className="text-sm font-medium text-purple-300 mb-2">Practical Example</p>
              <p className="text-sm text-white">A chiller's flow temperature is logged every 10 minutes. When it trips on a fault, engineers can review the historical graph to see if low flow or high return temperature caused the problem - essential for root cause analysis.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Why Collect Historical Data */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Why Collect Historical Data?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Historical data transforms your BMS from a simple control system into a powerful analytical tool. It's like having a witness that never sleeps, recording everything that happens in your building.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-300 mb-2">Fault Diagnosis</p>
                <p className="text-sm text-white">Trace back through logs to see exactly what conditions led to a problem. Was it gradual deterioration or sudden failure? Did other systems contribute?</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-300 mb-2">Energy Optimisation</p>
                <p className="text-sm text-white">Identify wasteful patterns: equipment running during unoccupied hours, heating and cooling simultaneously, inefficient schedules costing thousands annually.</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-sm font-medium text-yellow-300 mb-2">Compliance Evidence</p>
                <p className="text-sm text-white">Legionella prevention, energy reporting, safety system testing - all require documented proof. Historical data provides evidence automatically.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-300 mb-2">Real Success Story</p>
              <p className="text-sm text-white">A school discovered through trend analysis that their boilers were running overnight due to incorrect scheduling. One simple correction saved £3,000 annually.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Electrician's Role */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrician's Role in Data Reliability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As an electrician, you're the foundation of reliable data logging. Every sensor you install, every wire you connect, and every calibration you perform directly impacts the quality of historical data.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Essentials</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Correct wiring:</strong> Sensors to correct input types</li>
                  <li><strong>Sensor calibration:</strong> Verify before connecting</li>
                  <li><strong>Shielded cabling:</strong> For analog signals (0-10V, 4-20mA)</li>
                  <li><strong>Clear labelling:</strong> Every wire, terminal, input</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Verification</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Test signal path:</strong> Sensor to logged data</li>
                  <li><strong>Simulate conditions:</strong> Heat sensors, apply pressure</li>
                  <li><strong>Verify timestamps:</strong> Correct time and date</li>
                  <li><strong>Compare readings:</strong> Against independent instruments</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-300 mb-2">Critical Point</p>
              <p className="text-sm text-white">If source signals are wrong, stored history becomes useless. A sensor wired to the wrong input type will give meaningless data that corrupts the entire historical record.</p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Best Practices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Best Practices for Reliable Logging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Sensor Location Matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Temperature sensors: Away from direct sunlight, heat sources, air currents</li>
                <li>Pressure sensors: Straight pipe runs without turbulence</li>
                <li>Flow sensors: Proper straight lengths upstream and downstream</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Logging Frequencies</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Room temperature: 15-30 minutes</li>
                  <li>Critical equipment: 1-5 minutes</li>
                  <li>Energy meters: Hourly</li>
                  <li>Status changes: Event-based (immediate)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Data Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Local storage: Several days capacity</li>
                  <li>Central servers: Automated backup</li>
                  <li>Cloud storage: Additional redundancy</li>
                  <li>UPS systems: Protect against power loss</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 5: Common Data Quality Issues */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Troubleshooting Data Quality Issues
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-red-300 mb-2">Flat Line Data</p>
                <p className="text-sm text-white">Indicates sensor power issues, wiring problems, or sensor failures. Check power supply, wiring integrity, and sensor operation.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-orange-300 mb-2">Noisy/Erratic Data</p>
                <p className="text-sm text-white">Points to interference, poor connections, or improper grounding. Analog signals are susceptible to noise from motors, VFDs, or switching equipment.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-yellow-300 mb-2">Out-of-Range Readings</p>
                <p className="text-sm text-white">Suggests calibration problems, incorrect sensor selection, or input configuration errors. A -40C reading in a heated building indicates issues.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-2">Troubleshooting Tip</p>
              <p className="text-sm text-white">Always verify data quality during commissioning by comparing logged values with independent measurements. Use a separate thermometer, pressure gauge, or multimeter to confirm sensor readings match reality.</p>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Case Study: The Phantom CO2 Problem</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-300 mb-2">Problem</p>
              <p className="text-sm text-white">An office building logged CO2 levels as constant 400 ppm for weeks, despite air quality complaints from occupants.</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-300 mb-2">Investigation</p>
              <p className="text-sm text-white">The CO2 sensor was wired to the BMS but never powered - the system logged default values instead of actual readings.</p>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-300 mb-2">Result</p>
              <p className="text-sm text-white">Once powered and calibrated, logs showed peaks above 1500 ppm, triggering necessary ventilation improvements.</p>
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
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Logging Types</p>
              <ul className="space-y-0.5">
                <li>Continuous: Regular intervals (temp, pressure)</li>
                <li>Event-based: On change (pump, alarms)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Benefits</p>
              <ul className="space-y-0.5">
                <li>Fault diagnosis and root cause analysis</li>
                <li>Energy optimisation and compliance evidence</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-6-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Alarm Priorities
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bms-module-6-section-3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule6Section2;
