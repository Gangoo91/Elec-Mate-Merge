import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule2Section6QuizData } from "@/data/upskilling/bmsModule2Section6QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "cabling-check1",
    question: "Why are analog BMS signals more vulnerable to interference than digital signals?",
    options: [
      "Analog signals use higher voltages than digital signals",
      "Analog signal values are directly affected by any noise, while digital signals have switching thresholds",
      "Analog cables are longer than digital cables",
      "Analog signals require more power to operate"
    ],
    correctIndex: 1,
    explanation: "Analog signals are continuous voltage/current levels where any interference directly affects the signal value. Digital signals have defined switching thresholds, so interference must be significant to cause false switching between logic levels."
  },
  {
    id: "cabling-check2",
    question: "Why should signal cables not be run parallel with high-voltage cables?",
    options: [
      "High-voltage cables are physically larger and take up more space",
      "Electromagnetic fields from high-voltage cables induce interference in signal cables",
      "High-voltage cables generate more heat than signal cables",
      "Signal cables are more expensive and need protection"
    ],
    correctIndex: 1,
    explanation: "High-voltage cables carrying large currents generate electromagnetic fields that can induce interference in nearby signal cables, causing noise and signal corruption. Maintaining separation prevents this electromagnetic coupling."
  },
  {
    id: "cabling-check3",
    question: "Why should shields usually be earthed at one end only?",
    options: [
      "To save on earth cable and installation costs",
      "To prevent ground loop currents that can make interference worse",
      "To comply with electrical safety regulations",
      "To reduce the total resistance of the shielding system"
    ],
    correctIndex: 1,
    explanation: "Earthing shields at both ends can create ground loop currents if earth potentials differ between the two points. These circulating currents can actually make interference worse and should be avoided by earthing at one end only."
  },
  {
    id: "cabling-check4",
    question: "What test tool can be used to confirm analog signal stability during commissioning?",
    options: [
      "Insulation resistance tester",
      "Multimeter with data logging capability",
      "Earth loop impedance tester",
      "Phase rotation indicator"
    ],
    correctIndex: 1,
    explanation: "A multimeter with data logging capability can monitor analog signal levels over time to confirm stability and detect fluctuations that may indicate interference problems during commissioning."
  }
];

const faqs = [
  {
    question: "What's the minimum separation between power and signal cables?",
    answer: "A minimum 300mm separation is recommended where parallel runs are unavoidable. Greater separation is preferable, and when cables must cross, they should cross at 90 degrees to minimise electromagnetic coupling."
  },
  {
    question: "When should I use shielded cable?",
    answer: "Use shielded cable for analog signals, in environments with high EMI (near VSDs, motors, or power switching equipment), for long cable runs, and where the manufacturer specifies shielded cable. Always earth the shield at one end only."
  },
  {
    question: "How do I identify interference problems in a BMS?",
    answer: "Look for intermittent faults, fluctuating sensor readings without corresponding physical changes, time-correlated issues (problems at specific times), or readings that vary when nearby equipment switches. Use a multimeter with data logging to monitor signal stability."
  },
  {
    question: "What cable impedance should be used for RS-485 networks?",
    answer: "RS-485 networks typically require 120Ω impedance cable. Ethernet networks use 100Ω impedance cable (Cat5e or Cat6). Always match cable impedance to system requirements and use proper line termination."
  }
];

const BMSModule2Section6 = () => {
  useSEO({
    title: "Cabling, Interference, and Shielding | BMS Module 2.6",
    description: "Learn proper cabling, interference protection and shielding techniques for BMS installations. Understand signal integrity, EMI mitigation, and BS 7671 compliance."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cabling, Interference, and Shielding
          </h1>
          <p className="text-white/80">
            Maintaining signal integrity through proper cable installation and protection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Segregation:</strong> Keep power and signal cables separate (300mm min)</li>
              <li><strong>Shielding:</strong> Earth at one end only to prevent ground loops</li>
              <li><strong>Twisted pair:</strong> Use for analog signals to cancel interference</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Fluctuating sensor readings without cause</li>
              <li><strong>Use:</strong> Shielded twisted-pair for analog signals</li>
              <li><strong>Test:</strong> Multimeter with data logging for stability</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Why interference affects BMS signals",
              "Best practices for cabling in control systems",
              "When and how to use shielding to protect signals",
              "Apply BS 7671 and manufacturer requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Why Interference is a Problem */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Interference is a Problem
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BMS signals are often low-voltage analog (0–10V, 4–20mA), making them vulnerable to electrical noise
              and interference. Understanding why interference occurs helps prevent installation problems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signal Vulnerabilities:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Low signal levels:</strong> 0-10V and 4-20mA signals are easily affected by external noise</li>
                <li><strong>Long cable runs:</strong> Extended cables act as antennas picking up EMI</li>
                <li><strong>Shared pathways:</strong> Signal cables near power cables are exposed to switching noise</li>
                <li><strong>Environmental factors:</strong> Temperature, humidity, and vibration affect cable performance</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Common Interference Sources</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Electrical:</strong> Motors, VSDs, switching power supplies</li>
                  <li><strong>Lighting:</strong> Fluorescent ballasts, LED drivers, dimmers</li>
                  <li><strong>Radio frequency:</strong> Wi-Fi, mobile phones, transmitters</li>
                  <li><strong>Mechanical:</strong> Lift motors, AHU motors, pumps</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effects of Interference</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Inaccurate readings:</strong> Sensor values fluctuate</li>
                  <li><strong>Unstable control:</strong> Actuators hunt and oscillate</li>
                  <li><strong>Communication errors:</strong> Data corruption and timeouts</li>
                  <li><strong>System instability:</strong> Frequent alarms and service calls</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Digital vs Analog Vulnerability:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Analog:</strong> Continuous levels where any noise directly affects the signal value</li>
                <li><strong>Digital:</strong> Discrete on/off states with switching thresholds — more robust</li>
                <li><strong>Error detection:</strong> Digital protocols often include checksums; analog has none</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        {/* Section 2: Best Practices for Cabling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Best Practices for Cabling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper cable routing and installation practices are fundamental to maintaining signal integrity and
              preventing interference-related problems in BMS installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Segregation Principles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Power/control separation:</strong> Different containment systems, 300mm minimum separation</li>
                <li><strong>Voltage level segregation:</strong> Separate high (&gt;50V), low (12-50V), extra-low (&lt;12V)</li>
                <li><strong>Signal type grouping:</strong> Group AI, DI, AO, and communication cables</li>
                <li><strong>Crossing technique:</strong> Cross at 90 degrees to minimise coupling</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Selection</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Twisted pair:</strong> Cancels EMI through balanced impedance</li>
                  <li><strong>Impedance:</strong> 120Ω for RS-485, 100Ω for Ethernet</li>
                  <li><strong>Conductor:</strong> Use copper, avoid aluminium for signals</li>
                  <li><strong>Sheath:</strong> PVC, LSOH, or PE based on environment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Containment Selection</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Metallic:</strong> Steel conduit/trunking for high EMI protection</li>
                  <li><strong>Non-metallic:</strong> PVC conduit for general protection</li>
                  <li><strong>Earth path:</strong> Metallic systems provide continuous earthing</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature:</strong> Select cables rated for expected range</li>
                <li><strong>Moisture:</strong> Use appropriate IP ratings in damp locations</li>
                <li><strong>Mechanical:</strong> Protect against physical damage</li>
                <li><strong>Chemical:</strong> Consider exposure from cleaning agents</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        {/* Section 3: Shielding Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Shielding Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Shielded cables provide an additional layer of protection against electromagnetic interference (EMI).
              Proper selection, installation, and termination of shields is critical for effective protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Shield Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Foil shields:</strong> 100% coverage for high-frequency protection</li>
                <li><strong>Braided shields:</strong> 70-95% coverage, excellent low-frequency protection</li>
                <li><strong>Combination:</strong> Foil plus braid for comprehensive protection</li>
                <li><strong>Armoured:</strong> Steel wire/tape for severe EMI and mechanical protection</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Shield Earthing Principles</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Single-point:</strong> Earth at one end only (preferred)</li>
                  <li><strong>Ground loops:</strong> Both ends can create circulating currents</li>
                  <li><strong>Long runs (&gt;300m):</strong> Consider capacitor-coupled earthing</li>
                  <li><strong>Continuity:</strong> Maintain shield through junction boxes</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">High-Noise Solutions</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Double-shielded:</strong> Two shields for VSD environments</li>
                  <li><strong>Metallic conduit:</strong> Additional shield layer</li>
                  <li><strong>Increased separation:</strong> Beyond minimum requirements</li>
                  <li><strong>Fibre optic:</strong> Complete electrical isolation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Manufacturer Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cable specifications:</strong> Follow recommended types, impedance, max lengths</li>
                <li><strong>Termination methods:</strong> Use proper glands and cable boots</li>
                <li><strong>Installation guidelines:</strong> Adhere to bend radius and pulling tensions</li>
                <li><strong>Testing requirements:</strong> Perform continuity, insulation, and shield tests</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        {/* Section 4: Testing and Maintenance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Testing and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regular testing and maintenance of cabling systems ensures ongoing signal integrity and helps
              identify potential problems before they cause system failures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Tests:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Signal stability:</strong> Use multimeter to monitor for fluctuations</li>
                <li><strong>Continuity:</strong> Test all cores, verify no shorts</li>
                <li><strong>Insulation resistance:</strong> Minimum 2MΩ for low voltage systems</li>
                <li><strong>Shield integrity:</strong> Verify continuity and earth connections</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interference Detection</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Signal monitoring:</strong> Oscilloscope or data logger</li>
                  <li><strong>Load switching:</strong> Monitor during equipment switching</li>
                  <li><strong>Frequency analysis:</strong> Spectrum analyser for source ID</li>
                  <li><strong>Correlation:</strong> Compare with equipment schedules</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Common Fault Indicators</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Intermittent faults:</strong> Varying readings without physical cause</li>
                  <li><strong>Time-correlated:</strong> Problems at specific times</li>
                  <li><strong>Weather-related:</strong> Issues during wet conditions</li>
                  <li><strong>Progressive:</strong> Gradually worsening signal quality</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ongoing Maintenance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Regular inspections:</strong> Check containment, earth connections, glands</li>
                <li><strong>Performance monitoring:</strong> Track signal quality trends</li>
                <li><strong>Documentation:</strong> Keep cable schedules and test records updated</li>
                <li><strong>Fault history:</strong> Log interference faults and resolutions</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">As an Electrician</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always route signal cabling away from high-current circuits and VSDs</li>
                <li>Use proper containment for physical and electromagnetic protection</li>
                <li>Clearly label signal, power, and network cables</li>
                <li>Document shielding and earthing practices in as-built drawings</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Earthing shields at both ends</strong> — creates ground loops</li>
                <li><strong>Running signal cables with power</strong> — causes interference</li>
                <li><strong>Poor shield termination</strong> — negates shielding effectiveness</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-red-400/80 mb-2">Office Building Temperature Sensor Interference</h3>
            <div className="text-sm text-white space-y-3">
              <p><strong>Problem:</strong> Temperature sensors throughout an office building gave fluctuating readings, causing the HVAC system to hunt and waste energy.</p>
              <p><strong>Investigation:</strong> Sensor cables had been installed in the same cable tray as HVAC fan and pump power cables. High switching currents were generating EMI that affected the unshielded sensor cables.</p>
              <p><strong>Solution:</strong> Sensor cables were rerouted into separate containment with proper segregation. Shielded twisted-pair cables were installed with shields earthed at the controller end only. Metallic trunking was added near motor control panels.</p>
              <p><strong>Result:</strong> Stable and accurate temperature readings. HVAC performance improved dramatically with precise control and reduced energy consumption.</p>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Segregation Requirements</p>
              <ul className="space-y-0.5">
                <li>Power/signal separation: 300mm minimum</li>
                <li>Crossings: 90 degrees only</li>
                <li>Use separate containment systems</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Shielding Guidelines</p>
              <ul className="space-y-0.5">
                <li>Earth shield at one end only</li>
                <li>Use foil + braid for complete protection</li>
                <li>Maintain continuity through junction boxes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="my-10">
          <SingleQuestionQuiz
            questions={bmsModule2Section6QuizData}
            title="Test Your Knowledge"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-2-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../bms-module-3">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule2Section6;
