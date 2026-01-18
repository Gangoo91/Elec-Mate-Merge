import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const RenewableEnergyModule2Section5 = () => {
  useSEO({
    title: "PV System Layouts: DC Side, AC Side & Isolation | Solar PV",
    description: "Understanding DC and AC system layouts with isolation requirements for safe operation."
  });

  const quizQuestions = [
    {
      question: "What component combines multiple string outputs?",
      options: ["Inverter", "Combiner box", "DC isolator", "Surge protector"],
      correctAnswer: 1,
      explanation: "Combiner boxes combine multiple string outputs into a single connection to the inverter."
    },
    {
      question: "Where should DC isolators be located?",
      options: ["Inside the building only", "Near the PV array, accessible and visible", "At the distribution board", "Underground"],
      correctAnswer: 1,
      explanation: "DC isolators should be located near the PV array and be accessible and visible for safety."
    },
    {
      question: "What is the purpose of anti-islanding protection?",
      options: ["Prevent over-voltage", "Stop grid export", "Prevent generation during grid outage", "Limit current"],
      correctAnswer: 2,
      explanation: "Anti-islanding protection prevents the system from generating power during grid outages to protect utility workers."
    },
    {
      question: "What colour is used for DC positive cables?",
      options: ["Black", "Blue", "Red", "Green"],
      correctAnswer: 2,
      explanation: "DC positive cables are coloured red, while DC negative cables are black."
    },
    {
      question: "What does rapid shutdown achieve?",
      options: ["Faster inverter startup", "Voltage reduction to less than 80V within 10 seconds", "Higher system efficiency", "Better monitoring"],
      correctAnswer: 1,
      explanation: "Rapid shutdown systems reduce voltage to less than 80V within 10 seconds for firefighter safety."
    },
    {
      question: "Which architecture offers panel-level MPPT?",
      options: ["Centralised", "Distributed", "Module-level with microinverters", "Single string"],
      correctAnswer: 2,
      explanation: "Module-level architecture with microinverters or optimisers provides panel-level MPPT and monitoring."
    },
    {
      question: "What is the advantage of AC coupling for battery storage?",
      options: ["Higher efficiency", "Lower cost", "Works with any existing inverter", "Simpler installation"],
      correctAnswer: 2,
      explanation: "AC coupling allows battery storage to work with any existing inverter, making retrofits easier."
    },
    {
      question: "What standard covers grid-connected PV safety?",
      options: ["BS 7671 only", "IEC 60364", "IEC 61730 only", "BS 5839"],
      correctAnswer: 1,
      explanation: "IEC 60364 is the international standard for electrical installations including grid-connected PV systems."
    },
    {
      question: "What communication protocol is standard for PV monitoring?",
      options: ["Bluetooth only", "Modbus RTU/TCP", "WiFi only", "Zigbee"],
      correctAnswer: 1,
      explanation: "Modbus RTU/TCP is the industrial standard protocol for PV system monitoring and integration."
    },
    {
      question: "What must isolation devices be capable of?",
      options: ["Remote operation only", "Automatic reset", "Being locked in open position", "Wireless control"],
      correctAnswer: 2,
      explanation: "Isolation devices must be lockable in the open position to ensure safe working conditions during maintenance."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Minimal Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 -ml-2" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-4">
            <Zap className="w-6 h-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            PV System Layouts: DC Side, AC Side &amp; Isolation
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Safety &amp; System Architecture
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">DC Cable</div>
            <div className="text-white font-semibold">Red (+) / Black (-)</div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Rapid Shutdown</div>
            <div className="text-white font-semibold">&lt; 80V in 10s</div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-white font-semibold mb-3">Learning Outcomes</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Differentiate between DC and AC system layouts and components</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Understand isolation requirements and safety procedures</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Plan for safe maintenance access and system operation</span>
            </div>
          </div>
        </div>

        {/* Section 01 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DC Side Layout &amp; Components
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Layout planning is about safety and performance. A clear, well-labelled system is easier to operate, maintain, and inspect - and legally compliant.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">DC Wiring Components</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">String cables:</strong> DC panel connections</li>
                  <li>• <strong className="text-white">Combiner boxes:</strong> Multiple strings</li>
                  <li>• <strong className="text-white">DC isolators:</strong> Safety isolation</li>
                  <li>• <strong className="text-white">Surge protection:</strong> DC SPDs</li>
                  <li>• <strong className="text-white">Monitoring:</strong> Current/voltage</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">DC System Layout</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Panel strings:</strong> Series-connected</li>
                  <li>• <strong className="text-white">String routing:</strong> Array to inverter</li>
                  <li>• <strong className="text-white">Polarity:</strong> Separate DC+/DC-</li>
                  <li>• <strong className="text-white">Grounding:</strong> EGC conductor</li>
                  <li>• <strong className="text-white">Labelling:</strong> Clear circuit ID</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="Where should DC isolators be located?"
          options={["Inside the building only", "Near the PV array, accessible and visible", "At the distribution board"]}
          correctIndex={1}
          explanation="DC isolators must be located near the PV array and be accessible and visible for safety."
        />

        {/* Section 02 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            AC Side Layout &amp; Components
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              The AC side handles the converted power from inverters to building loads and grid export.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">AC Output Components</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Inverters:</strong> DC to AC conversion</li>
                  <li>• <strong className="text-white">AC isolators:</strong> Load-break switches</li>
                  <li>• <strong className="text-white">Generation meters:</strong> PV output</li>
                  <li>• <strong className="text-white">Distribution boards:</strong> Protection</li>
                  <li>• <strong className="text-white">Grid connection:</strong> Export meter</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">AC System Flow</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Inverter output:</strong> Single/three-phase</li>
                  <li>• <strong className="text-white">AC isolation:</strong> Switching/protection</li>
                  <li>• <strong className="text-white">Metering:</strong> Generation/consumption</li>
                  <li>• <strong className="text-white">Distribution:</strong> Loads and export</li>
                  <li>• <strong className="text-white">Protection:</strong> RCD and OCPD</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What colour is used for DC positive cables?"
          options={["Black", "Blue", "Red"]}
          correctIndex={2}
          explanation="DC positive cables are coloured red, while DC negative cables are black."
        />

        {/* Section 03 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            System Architectures
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Modern PV systems employ various architectural approaches to optimise performance and reliability.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Centralised</h4>
                <ul className="text-sm space-y-1">
                  <li>• Multiple strings to one inverter</li>
                  <li>• Lower cost, fewer components</li>
                  <li>• Single point of failure</li>
                  <li>• Utility-scale applications</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Distributed</h4>
                <ul className="text-sm space-y-1">
                  <li>• Multiple string inverters</li>
                  <li>• Redundancy, flexible</li>
                  <li>• Higher initial cost</li>
                  <li>• Commercial installations</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Module-Level</h4>
                <ul className="text-sm space-y-1">
                  <li>• Microinverters/optimisers</li>
                  <li>• Panel-level MPPT</li>
                  <li>• Highest cost, complexity</li>
                  <li>• Residential, complex shading</li>
                </ul>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Hybrid System Considerations:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">AC coupling:</strong> Battery on AC side - works with any inverter</li>
                <li>• <strong className="text-white">DC coupling:</strong> Direct DC connection - higher efficiency</li>
                <li>• <strong className="text-white">Critical loads:</strong> Backup power circuit design</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="Which architecture offers panel-level MPPT?"
          options={["Centralised", "Distributed", "Module-level with microinverters"]}
          correctIndex={2}
          explanation="Module-level architecture with microinverters or optimisers provides panel-level MPPT and monitoring."
        />

        {/* Section 04 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Isolation Requirements &amp; Safety
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Proper isolation is critical for safe maintenance and emergency response.
            </p>
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <h4 className="text-red-400 font-medium mb-3">Essential Isolation Points:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">DC isolators:</strong> Near PV array, accessible and visible</li>
                <li>• <strong className="text-white">AC isolators:</strong> Before distribution board connection</li>
                <li>• <strong className="text-white">Emergency isolation:</strong> Rapid shutdown capability</li>
                <li>• <strong className="text-white">Maintenance isolation:</strong> Safe working procedures</li>
                <li>• <strong className="text-white">Grid isolation:</strong> DNO-controlled main switch</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">IEC 60364 Compliance:</h4>
              <ul className="text-sm space-y-1">
                <li>• Isolation devices must be lockable in the open position</li>
                <li>• Clear labelling with purpose and operating instructions</li>
                <li>• Accessible location for maintenance personnel</li>
                <li>• Suitable for installed environment and current ratings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 05 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Rapid Shutdown &amp; Arc Fault Protection
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Modern PV systems incorporate sophisticated safety mechanisms to protect against electrical hazards and fire risks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Rapid Shutdown Systems</h4>
                <ul className="text-sm space-y-1">
                  <li>• Voltage reduction to &lt;80V in 10s</li>
                  <li>• 1m boundary around array perimeter</li>
                  <li>• Fire service accessible controls</li>
                  <li>• Grid loss auto-triggers</li>
                  <li>• Required for insurance/compliance</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Arc Fault Detection</h4>
                <ul className="text-sm space-y-1">
                  <li>• High-frequency signature analysis</li>
                  <li>• Current waveform monitoring</li>
                  <li>• Temperature gradient sensing</li>
                  <li>• Immediate string isolation</li>
                  <li>• Alarm notification systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 06 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Labelling &amp; Signage
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Clear labelling ensures safe operation and maintenance throughout the system lifecycle.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Required Labels</h4>
                <ul className="text-sm space-y-1">
                  <li>• PV installation present warning</li>
                  <li>• Dual supply warning</li>
                  <li>• DC isolation identification</li>
                  <li>• Emergency shutdown procedures</li>
                  <li>• System data and ratings</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Cable Identification</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">DC cables:</strong> Red (+), Black (-)</li>
                  <li>• <strong className="text-white">AC cables:</strong> Standard coding</li>
                  <li>• <strong className="text-white">Earth:</strong> Green/yellow</li>
                  <li>• <strong className="text-white">Markers:</strong> Every 3m</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Guidance */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
          <h3 className="text-white font-semibold mb-3">Practical Guidance</h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <strong className="text-white">Always verify isolation:</strong> Use a DC clamp meter to confirm zero current before working on any DC circuit - panels generate whenever there is light.
            </p>
            <p>
              <strong className="text-white">Label everything:</strong> Future maintenance workers will thank you. Use durable labels that withstand UV and weather exposure.
            </p>
            <p>
              <strong className="text-white">Document as-built:</strong> Keep accurate records of actual cable routes, component locations, and any deviations from design drawings.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Why are DC isolators required near the array?</h4>
              <p className="text-white/70 text-sm">Panels generate DC voltage whenever exposed to light and cannot be completely turned off. A DC isolator near the array allows isolation before any internal building wiring for safe maintenance and emergency response.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What is anti-islanding protection?</h4>
              <p className="text-white/70 text-sm">Anti-islanding prevents the PV system from exporting power during a grid outage, protecting utility workers who may be repairing the network. Grid-tie inverters must detect loss of mains and disconnect within specified times.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">When should I choose AC coupling over DC coupling for batteries?</h4>
              <p className="text-white/70 text-sm">AC coupling is ideal for retrofitting to existing systems as it works with any inverter. DC coupling is more efficient for new installations but requires a hybrid inverter. Consider existing equipment, efficiency needs, and budget.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What communication protocols do monitoring systems use?</h4>
              <p className="text-white/70 text-sm">Modbus RTU/TCP is the industrial standard. SunSpec Alliance provides standardised interfaces. Modern systems also use WiFi, cellular, and cloud platforms for remote monitoring and control.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How does rapid shutdown improve safety?</h4>
              <p className="text-white/70 text-sm">Rapid shutdown reduces array voltage to less than 80V within 10 seconds of activation, making it safer for firefighters to work near the array during emergencies without risk of electric shock.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What labels are legally required at the consumer unit?</h4>
              <p className="text-white/70 text-sm">BS 7671 requires warning labels indicating that the installation has a dual supply (grid and PV), location of DC isolator, and emergency switching instructions. These must be durable and clearly visible.</p>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz
            title="Section 5 Quiz: System Layouts"
            questions={quizQuestions}
            passingScore={70}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10" asChild>
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="../section-6">
              Next Section
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section5;
