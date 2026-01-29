import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Standby Generator Systems - HNC Module 7 Section 2.4";
const DESCRIPTION = "Master standby generator systems for building services: generator sizing, fuel systems, starting sequences, automatic mains failure panels, load shedding, and maintenance requirements.";

const quickCheckQuestions = [
  {
    id: "generator-sizing",
    question: "When sizing a standby generator, what factor accounts for motor starting currents?",
    options: ["Power factor correction", "Voltage regulation", "Starting kVA allowance", "Fuel consumption rate"],
    correctIndex: 2,
    explanation: "Starting kVA allowance must be included when sizing generators because motor starting currents can be 6-8 times the full load current. Without this allowance, voltage dip during motor starting could cause equipment malfunction or generator overload."
  },
  {
    id: "amf-panel",
    question: "What is the primary function of an Automatic Mains Failure (AMF) panel?",
    options: ["To regulate generator output voltage", "To detect mains failure and automatically start the generator", "To synchronise multiple generators", "To measure fuel consumption"],
    correctIndex: 1,
    explanation: "An AMF panel monitors mains supply and automatically starts the standby generator when mains power fails or falls outside acceptable parameters. It also manages the transfer of load and monitors generator operation."
  },
  {
    id: "fuel-storage",
    question: "For a diesel generator installation, what determines the minimum fuel storage requirement?",
    options: ["Generator physical size", "Required autonomy period plus safety margin", "Fuel supplier delivery schedule", "Building floor area"],
    correctIndex: 1,
    explanation: "Fuel storage is determined by the required autonomy period (how long the generator must run without refuelling) plus a safety margin. Critical facilities may require 24-72 hours autonomy, calculated from fuel consumption rate multiplied by time."
  },
  {
    id: "maintenance-testing",
    question: "How often should standby generators undergo load testing according to best practice?",
    options: ["Annually only", "When installed and after major repairs", "Monthly with weekly no-load runs", "Only when mains failure occurs"],
    correctIndex: 2,
    explanation: "Best practice requires weekly no-load test runs to ensure starting reliability, plus monthly load testing to prevent wet stacking (carbon buildup from prolonged light-load operation) and verify full load capability."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A building has a connected load of 400 kW with a power factor of 0.8. What is the minimum generator kVA rating required before applying any diversity or starting allowances?",
    options: [
      "320 kVA",
      "400 kVA",
      "500 kVA",
      "640 kVA"
    ],
    correctAnswer: 2,
    explanation: "kVA = kW ÷ power factor = 400 ÷ 0.8 = 500 kVA. This is the base rating before considering starting currents, future growth, or altitude derating factors."
  },
  {
    id: 2,
    question: "What is 'wet stacking' in diesel generators and how is it prevented?",
    options: ["Coolant overflow prevented by regular draining", "Fuel contamination prevented by filtration", "Carbon buildup from light loading prevented by regular load testing", "Battery acid spillage prevented by proper mounting"],
    correctAnswer: 2,
    explanation: "Wet stacking occurs when diesel generators run at light loads for extended periods, causing unburnt fuel and carbon to accumulate in the exhaust system. It is prevented by regular load testing at 70-80% of rated capacity."
  },
  {
    id: 3,
    question: "In an AMF panel, what is the typical mains failure detection time before initiating generator start?",
    options: ["Instantaneous (0 seconds)", "1-3 seconds", "10-15 seconds", "30-60 seconds"],
    correctAnswer: 1,
    explanation: "AMF panels typically have a 1-3 second delay before initiating generator start to filter out momentary voltage dips and avoid unnecessary starts. Critical loads may require shorter delays with UPS support."
  },
  {
    id: 4,
    question: "What is the purpose of load shedding in a standby generator system?",
    options: [
      "To reduce fuel consumption during normal operation",
      "To prevent generator overload by disconnecting non-essential loads",
      "To balance load between multiple generators",
      "To reduce noise levels during night operation"
    ],
    correctAnswer: 1,
    explanation: "Load shedding disconnects non-essential loads during generator operation to prevent overload and ensure essential loads receive power. Loads are prioritised and shed in sequence based on criticality."
  },
  {
    id: 5,
    question: "For a hospital standby generator installation, what autonomy period is typically required?",
    options: [
      "4 hours",
      "8 hours",
      "24-72 hours",
      "168 hours (1 week)"
    ],
    correctAnswer: 2,
    explanation: "Healthcare Technical Memoranda (HTM) typically require 24-72 hours fuel autonomy for hospital generators to maintain essential services during extended outages, though specific requirements depend on facility criticality."
  },
  {
    id: 6,
    question: "What is the function of the 'cool down' period in a generator shutdown sequence?",
    options: [
      "To allow the building to switch back to mains gradually",
      "To allow the engine to cool before stopping to prevent damage",
      "To complete fuel line purging",
      "To reset the AMF panel"
    ],
    correctAnswer: 1,
    explanation: "The cool down period allows the engine to run at no load for 3-5 minutes, enabling gradual temperature reduction. Stopping a hot engine immediately can cause thermal shock and bearing damage."
  },
  {
    id: 7,
    question: "Which component in a diesel generator provides cranking power for engine starting?",
    options: ["The alternator", "The battery charger", "The starter motor and battery bank", "The fuel injection pump"],
    correctAnswer: 2,
    explanation: "The starter motor, powered by a dedicated battery bank, provides the cranking power to start the diesel engine. The battery charger maintains battery condition during standby periods."
  },
  {
    id: 8,
    question: "What derating factor should be applied to a generator installed at 1,000m above sea level?",
    options: ["No derating required", "Approximately 3-4% per 300m above 150m", "10% flat rate", "25% flat rate"],
    correctAnswer: 1,
    explanation: "Generator output must be derated approximately 3-4% for every 300m above 150m altitude due to reduced air density affecting engine combustion and alternator cooling. At 1,000m, this equates to roughly 9-12% derating."
  },
  {
    id: 9,
    question: "In a two-generator parallel system, what prevents reverse power flow when one generator fails?",
    options: ["The AMF panel", "Reverse power relays", "The governor", "Load shedding contactors"],
    correctAnswer: 1,
    explanation: "Reverse power relays detect when a generator becomes a motor (consuming rather than producing power) and disconnect it from the busbar to prevent damage and protect the remaining generator from overload."
  },
  {
    id: 10,
    question: "What is the typical transfer time from mains failure to generator supplying load?",
    options: ["Under 1 second", "10-15 seconds", "30-60 seconds", "2-3 minutes"],
    correctAnswer: 1,
    explanation: "Typical total transfer time is 10-15 seconds comprising: mains failure detection (1-3s), engine cranking and start (5-8s), and load transfer (2-4s). Critical loads requiring faster transfer need UPS support."
  },
  {
    id: 11,
    question: "Gas generators compared to diesel generators typically offer:",
    options: [
      "Higher power density and lower emissions",
      "Lower emissions but slower starting times",
      "Better fuel storage and faster response",
      "Lower capital cost and higher maintenance"
    ],
    correctAnswer: 1,
    explanation: "Gas generators produce lower NOx and particulate emissions than diesel but have slower starting times (may require continuous pilot flame or preheating) and require mains gas supply or LPG storage."
  },
  {
    id: 12,
    question: "What documentation must be maintained for a standby generator installation under BS 7671?",
    options: [
      "Only the original installation certificate",
      "Test records, maintenance logs, and periodic inspection reports",
      "Fuel delivery receipts only",
      "Manufacturer warranty documents"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation including installation certification, regular test records (weekly/monthly), maintenance logs, fuel quality records, and periodic inspection reports must be maintained to demonstrate compliance and ensure reliability."
  }
];

const faqs = [
  {
    question: "How do I calculate the correct generator size for a building?",
    answer: "Generator sizing follows a systematic process: (1) Calculate total connected load in kW, (2) Apply diversity factors based on load types, (3) Convert to kVA using power factor (typically 0.8), (4) Add starting kVA for largest motor (6-8× FLC), (5) Apply altitude and temperature derating if applicable, (6) Add 10-20% growth margin. Example: 300 kW load at 0.8 pf = 375 kVA, plus 50 kW motor starting allowance = 425 kVA minimum, rounded to 500 kVA standard size."
  },
  {
    question: "What is the difference between standby and prime rated generators?",
    answer: "Standby rated generators are designed for emergency use with limited annual running hours (typically under 200 hours) and can deliver 100% rated output during outages. Prime rated generators are designed for continuous operation as the primary power source, typically rated at 70-80% of standby rating for unlimited hours. Using a standby-rated generator for prime power will significantly reduce its lifespan."
  },
  {
    question: "How does an AMF panel sequence the generator start and load transfer?",
    answer: "The AMF sequence typically operates as: (1) Mains failure detected, timer starts (1-3s), (2) Mains confirmed failed, generator start signal sent, (3) Engine cranks and starts (5-8s), (4) Generator reaches rated voltage and frequency, (5) Generator ready signal confirmed, (6) Load transfer initiated via changeover contactor, (7) Essential loads energised. Return to mains follows similar sequence with cool-down period before generator stops."
  },
  {
    question: "What are the fuel storage regulations for diesel generators?",
    answer: "Diesel fuel storage must comply with the Control of Pollution (Oil Storage) (England) Regulations and building regulations. Key requirements include: secondary containment (bund) at 110% of tank capacity, separation from buildings and boundaries, fire-resistant construction for indoor installations, overfill protection, and regular fuel quality testing. Biofuel blends may require more frequent replacement due to degradation."
  },
  {
    question: "Why do hospitals require multiple generators rather than one large unit?",
    answer: "Hospitals use N+1 redundancy (multiple generators where N can handle full essential load) because: (1) Maintenance can occur without losing backup capability, (2) Single point of failure is eliminated, (3) Load can be distributed for efficiency, (4) Staged loading reduces voltage transients, (5) Critical care areas can have dedicated supply. Healthcare Technical Memoranda (HTM 06-01) specify redundancy requirements for different facility categories."
  },
  {
    question: "What causes generator hunting and how is it corrected?",
    answer: "Hunting (cyclic speed variation) is caused by governor instability, typically from incorrect gain settings, load fluctuations, or mechanical wear. Correction involves: adjusting governor sensitivity settings, checking for air in fuel lines, inspecting linkages for wear, ensuring stable load connection, and verifying compatible load characteristics. Isochronous governors are more prone to hunting than droop governors in parallel operation."
  }
];

const HNCModule7Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 7.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Standby Generator Systems
          </h1>
          <p className="text-white/80">
            Generator sizing, fuel systems, starting sequences, AMF panels, and maintenance requirements for standby power installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Generator sizing:</strong> kVA = kW ÷ power factor + starting allowance</li>
              <li className="pl-1"><strong>AMF panels:</strong> Detect mains failure and auto-start generator</li>
              <li className="pl-1"><strong>Transfer time:</strong> Typically 10-15 seconds total</li>
              <li className="pl-1"><strong>Testing:</strong> Weekly no-load, monthly on-load</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Critical facilities:</strong> Hospitals, data centres require N+1 redundancy</li>
              <li className="pl-1"><strong>Fuel storage:</strong> 24-72 hours autonomy typical</li>
              <li className="pl-1"><strong>Load shedding:</strong> Priority-based load management</li>
              <li className="pl-1"><strong>Compliance:</strong> BS 7671, HTM 06-01 for healthcare</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate generator sizing including kVA rating, power factor, and starting allowances",
              "Compare diesel and gas generator characteristics for different applications",
              "Design fuel storage systems meeting regulatory requirements",
              "Explain AMF panel operation and starting sequences",
              "Implement load shedding strategies for generator systems",
              "Specify testing and maintenance regimes for reliable operation"
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

        {/* Section 1: Generator Sizing and Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Generator Sizing and Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct generator sizing is critical for reliable standby power. Undersized generators
              suffer from overloading and poor voltage regulation, whilst oversized units operate
              inefficiently and may experience wet stacking from prolonged light-load operation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Generator Sizing Methodology</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Calculate total connected load in kW from distribution board schedules</li>
                <li className="pl-1"><strong>Step 2:</strong> Apply diversity factors (typically 0.7-0.9 for commercial buildings)</li>
                <li className="pl-1"><strong>Step 3:</strong> Convert to kVA: kVA = kW ÷ power factor (typically 0.8)</li>
                <li className="pl-1"><strong>Step 4:</strong> Add motor starting allowance (largest motor × 6-8 for DOL start)</li>
                <li className="pl-1"><strong>Step 5:</strong> Apply derating factors for altitude and ambient temperature</li>
                <li className="pl-1"><strong>Step 6:</strong> Add 10-20% growth margin and select next standard size</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Sizing Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Impact on Sizing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power factor</td>
                      <td className="border border-white/10 px-3 py-2">0.8 lagging</td>
                      <td className="border border-white/10 px-3 py-2">kVA = kW ÷ 0.8 (25% larger than kW)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Motor starting</td>
                      <td className="border border-white/10 px-3 py-2">6-8× FLC (DOL)</td>
                      <td className="border border-white/10 px-3 py-2">Add starting kVA to running load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Altitude derating</td>
                      <td className="border border-white/10 px-3 py-2">3-4% per 300m above 150m</td>
                      <td className="border border-white/10 px-3 py-2">Reduced air density affects combustion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temperature derating</td>
                      <td className="border border-white/10 px-3 py-2">2% per 5°C above 25°C</td>
                      <td className="border border-white/10 px-3 py-2">Higher ambient reduces cooling efficiency</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage regulation</td>
                      <td className="border border-white/10 px-3 py-2">±2.5% steady state</td>
                      <td className="border border-white/10 px-3 py-2">Affects sensitive equipment operation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Sizing Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Connected load:</span> <span className="text-white">250 kW</span></p>
                <p><span className="text-white/60">Diversity factor:</span> <span className="text-white">0.8</span></p>
                <p><span className="text-white/60">Maximum demand:</span> <span className="text-white">250 × 0.8 = 200 kW</span></p>
                <p><span className="text-white/60">Power factor:</span> <span className="text-white">0.8</span></p>
                <p><span className="text-white/60">Base kVA:</span> <span className="text-white">200 ÷ 0.8 = 250 kVA</span></p>
                <p><span className="text-white/60">Largest motor:</span> <span className="text-white">30 kW (DOL start)</span></p>
                <p><span className="text-white/60">Starting kVA:</span> <span className="text-white">30 × 6 = 180 kVA additional</span></p>
                <p><span className="text-white/60">Total requirement:</span> <span className="text-white">250 + 90 = 340 kVA</span></p>
                <p><span className="text-green-400">Selected generator: 400 kVA (next standard size with margin)</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design note:</strong> Always verify generator voltage dip during motor starting remains within 15% to prevent nuisance tripping of other equipment.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fuel Systems and Generator Types */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fuel Systems and Generator Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice between diesel and gas generators depends on application requirements,
              emissions regulations, fuel availability, and starting speed requirements. Each
              fuel type has distinct characteristics affecting system design.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diesel Generators</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Fast starting (8-10 seconds typical)</li>
                  <li className="pl-1">High power density (compact size)</li>
                  <li className="pl-1">Reliable cold starting</li>
                  <li className="pl-1">On-site fuel storage required</li>
                  <li className="pl-1">Higher NOx and particulate emissions</li>
                  <li className="pl-1">Fuel degradation over time (2-3 years)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gas Generators</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lower emissions (reduced NOx)</li>
                  <li className="pl-1">Slower starting (may need pilot flame)</li>
                  <li className="pl-1">Mains gas supply required (or LPG)</li>
                  <li className="pl-1">No fuel degradation concerns</li>
                  <li className="pl-1">Lower power density than diesel</li>
                  <li className="pl-1">Not suitable where gas supply uncertain</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diesel Fuel Storage Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Regulatory Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Secondary containment</td>
                      <td className="border border-white/10 px-3 py-2">110% of tank capacity minimum</td>
                      <td className="border border-white/10 px-3 py-2">Oil Storage Regulations 2001</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire separation</td>
                      <td className="border border-white/10 px-3 py-2">4-hour fire-rated enclosure indoor</td>
                      <td className="border border-white/10 px-3 py-2">Building Regulations Part B</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Overfill protection</td>
                      <td className="border border-white/10 px-3 py-2">Automatic shut-off at 95% capacity</td>
                      <td className="border border-white/10 px-3 py-2">Oil Storage Regulations 2001</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fuel quality</td>
                      <td className="border border-white/10 px-3 py-2">Annual testing, polishing if required</td>
                      <td className="border border-white/10 px-3 py-2">BS 2869 (fuel specification)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tank labelling</td>
                      <td className="border border-white/10 px-3 py-2">Contents, capacity, emergency contact</td>
                      <td className="border border-white/10 px-3 py-2">Oil Storage Regulations 2001</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fuel Storage Calculation</p>
              <div className="text-sm space-y-2">
                <p><strong>Required autonomy:</strong> 48 hours (critical facility)</p>
                <p><strong>Generator rating:</strong> 500 kVA at 0.8 pf = 400 kW</p>
                <p><strong>Average load:</strong> 70% = 280 kW</p>
                <p><strong>Fuel consumption:</strong> 0.25 litres/kWh (typical diesel)</p>
                <p><strong>Hourly consumption:</strong> 280 × 0.25 = 70 litres/hour</p>
                <p><strong>48-hour requirement:</strong> 70 × 48 = 3,360 litres</p>
                <p><strong>With 20% margin:</strong> 3,360 × 1.2 = 4,032 litres</p>
                <p className="text-green-400"><strong>Specified tank:</strong> 5,000 litres (standard size)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Fuel management:</strong> DERV (diesel) containing biofuel blends (FAME) degrades faster - implement fuel polishing or replacement schedules.
            </p>
          </div>
        </section>

        {/* Section 3: AMF Panels and Starting Sequences */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            AMF Panels and Starting Sequences
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Automatic Mains Failure (AMF) panels are the intelligence centre of standby generator
              systems. They monitor mains supply, control generator starting, manage load transfer,
              and provide comprehensive system monitoring and protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">AMF Panel Functions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mains monitoring:</strong> Voltage, frequency, phase sequence, and phase loss detection</li>
                <li className="pl-1"><strong>Generator control:</strong> Start, stop, speed governing, and voltage regulation</li>
                <li className="pl-1"><strong>Load transfer:</strong> Changeover contactor control with break-before-make operation</li>
                <li className="pl-1"><strong>Protection:</strong> Overcurrent, reverse power, earth fault, and over/under voltage</li>
                <li className="pl-1"><strong>Engine monitoring:</strong> Oil pressure, coolant temperature, battery voltage, fuel level</li>
                <li className="pl-1"><strong>Remote monitoring:</strong> BMS interface, SMS/email alerts, remote start capability</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Mains Failure Starting Sequence</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">T+0s:</span> <span className="text-white">Mains failure detected (voltage &lt;80% or &gt;110%)</span></p>
                <p><span className="text-white/60">T+1-3s:</span> <span className="text-white">Failure confirmed (filters transients)</span></p>
                <p><span className="text-white/60">T+3s:</span> <span className="text-white">Generator start signal sent, glow plugs energise</span></p>
                <p><span className="text-white/60">T+5-10s:</span> <span className="text-white">Engine cranking, starter motor engaged</span></p>
                <p><span className="text-white/60">T+8-12s:</span> <span className="text-white">Engine running, voltage building</span></p>
                <p><span className="text-white/60">T+10-12s:</span> <span className="text-white">Generator ready (voltage and frequency stable)</span></p>
                <p><span className="text-white/60">T+12-15s:</span> <span className="text-white">Load transfer - changeover operates</span></p>
                <p><span className="text-green-400">Total transfer time: 10-15 seconds typical</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Changeover System Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Operation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open transition</td>
                      <td className="border border-white/10 px-3 py-2">Break-before-make (momentary outage)</td>
                      <td className="border border-white/10 px-3 py-2">Most installations, simplest design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Closed transition</td>
                      <td className="border border-white/10 px-3 py-2">Make-before-break (no outage)</td>
                      <td className="border border-white/10 px-3 py-2">Sensitive loads, requires synchronisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Soft loading</td>
                      <td className="border border-white/10 px-3 py-2">Gradual load transfer via synchronising</td>
                      <td className="border border-white/10 px-3 py-2">Large motors, reducing transients</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bypass isolation</td>
                      <td className="border border-white/10 px-3 py-2">Manual bypass for maintenance</td>
                      <td className="border border-white/10 px-3 py-2">All critical installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Return to Mains Sequence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Mains restored and stable for minimum 30 seconds (adjustable)</li>
                <li className="pl-1">Mains voltage and frequency within acceptable limits confirmed</li>
                <li className="pl-1">Load transfer back to mains (open or closed transition)</li>
                <li className="pl-1">Generator runs at no load for cool-down period (3-5 minutes)</li>
                <li className="pl-1">Generator stops, system returns to standby mode</li>
                <li className="pl-1">Battery charger maintains batteries for next start</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical requirement:</strong> Mechanical and electrical interlocking must prevent paralleling of mains and generator unless designed for closed transition operation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Load Management and Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Load Management and Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective load management ensures generator capacity serves essential loads during
              outages. Combined with rigorous maintenance schedules, this approach maximises
              system reliability when backup power is needed most.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Shedding Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Load priority classification:</strong> Essential, important, and non-essential categories</li>
                <li className="pl-1"><strong>Staged shedding:</strong> Progressive disconnection as load increases</li>
                <li className="pl-1"><strong>Automatic operation:</strong> Frequency or power-based triggers</li>
                <li className="pl-1"><strong>Manual override:</strong> Operator control for exceptional circumstances</li>
                <li className="pl-1"><strong>Restoration sequence:</strong> Staged reconnection when capacity allows</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Load Priority Classification</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Shedding Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Priority 1 (Essential)</td>
                      <td className="border border-white/10 px-3 py-2">Life safety, fire systems, emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">Never shed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Priority 2 (Critical)</td>
                      <td className="border border-white/10 px-3 py-2">Security, BMS, IT infrastructure, lifts</td>
                      <td className="border border-white/10 px-3 py-2">Last resort only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Priority 3 (Important)</td>
                      <td className="border border-white/10 px-3 py-2">Comfort cooling, general lighting</td>
                      <td className="border border-white/10 px-3 py-2">Shed second</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Priority 4 (Non-essential)</td>
                      <td className="border border-white/10 px-3 py-2">Catering, water heaters, EV charging</td>
                      <td className="border border-white/10 px-3 py-2">Shed first</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Weekly Maintenance</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Visual inspection of generator and surroundings</li>
                  <li className="pl-1">Check oil, coolant, and fuel levels</li>
                  <li className="pl-1">Battery condition and electrolyte check</li>
                  <li className="pl-1">No-load test run (15-30 minutes)</li>
                  <li className="pl-1">Record all meter readings and alarms</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monthly Maintenance</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Load test (minimum 50% rated load, 1 hour)</li>
                  <li className="pl-1">Transfer test (simulate mains failure)</li>
                  <li className="pl-1">Check all protective device operation</li>
                  <li className="pl-1">Inspect fuel system for leaks</li>
                  <li className="pl-1">Verify remote monitoring operation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual/Periodic Maintenance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Task</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Full load test (100%)</td>
                      <td className="border border-white/10 px-3 py-2">Annual</td>
                      <td className="border border-white/10 px-3 py-2">Load bank or building load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Oil and filter change</td>
                      <td className="border border-white/10 px-3 py-2">250-500 hours or annual</td>
                      <td className="border border-white/10 px-3 py-2">Per manufacturer specification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Coolant replacement</td>
                      <td className="border border-white/10 px-3 py-2">2-3 years</td>
                      <td className="border border-white/10 px-3 py-2">Test annually for degradation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fuel polishing/replacement</td>
                      <td className="border border-white/10 px-3 py-2">Annual test, replace if degraded</td>
                      <td className="border border-white/10 px-3 py-2">Critical for reliability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Battery replacement</td>
                      <td className="border border-white/10 px-3 py-2">3-5 years</td>
                      <td className="border border-white/10 px-3 py-2">Load test before replacement due</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical inspection</td>
                      <td className="border border-white/10 px-3 py-2">Annual (BS 7671)</td>
                      <td className="border border-white/10 px-3 py-2">Include in building EICR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Documentation requirement:</strong> Maintain comprehensive logs of all tests, maintenance activities, and running hours for compliance and reliability analysis.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Hospital Generator Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size a standby generator for a district hospital with essential load of 800 kW, including a 75 kW chiller motor (DOL start).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Base load calculation</p>
                <p className="ml-4">Essential load: 800 kW</p>
                <p className="ml-4">Power factor: 0.8</p>
                <p className="ml-4">Base kVA: 800 ÷ 0.8 = 1,000 kVA</p>
                <p className="mt-2 text-white/60">Step 2: Motor starting allowance</p>
                <p className="ml-4">Chiller motor: 75 kW at 0.85 pf = 88 kVA running</p>
                <p className="ml-4">Starting current: 6× FLC</p>
                <p className="ml-4">Starting kVA: 88 × 6 = 528 kVA</p>
                <p className="ml-4">Net additional (starting minus running): 528 - 88 = 440 kVA</p>
                <p className="mt-2 text-white/60">Step 3: Total requirement</p>
                <p className="ml-4">Peak kVA: 1,000 + 440 = 1,440 kVA</p>
                <p className="ml-4">With 15% margin: 1,440 × 1.15 = 1,656 kVA</p>
                <p className="mt-2 text-green-400">Specify: 2 × 1,000 kVA generators (N+1 redundancy per HTM 06-01)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: AMF Panel Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify AMF panel requirements for a data centre with 10-second maximum transfer time.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>AMF Panel Specification:</p>
                <p className="mt-2">Mains Monitoring:</p>
                <p className="ml-4">- Undervoltage: &lt;85% for &gt;0.5 seconds</p>
                <p className="ml-4">- Overvoltage: &gt;110% for &gt;0.5 seconds</p>
                <p className="ml-4">- Underfrequency: &lt;47.5 Hz</p>
                <p className="ml-4">- Phase loss/sequence detection</p>
                <p className="mt-2">Timing Sequence:</p>
                <p className="ml-4">- Mains fail detection: 0.5 seconds max</p>
                <p className="ml-4">- Engine start: 3 seconds (pre-heated)</p>
                <p className="ml-4">- Run up to speed: 4 seconds</p>
                <p className="ml-4">- Load transfer: 2 seconds</p>
                <p className="ml-4 text-green-400">- Total: 9.5 seconds (within 10s requirement)</p>
                <p className="mt-2">Additional Requirements:</p>
                <p className="ml-4">- Closed transition capability for return to mains</p>
                <p className="ml-4">- Modbus interface to BMS</p>
                <p className="ml-4">- Remote monitoring with SMS/email alerts</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Load Shedding Scheme</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design load shedding for 500 kVA generator serving 600 kW connected load.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Generator capacity: 500 kVA × 0.8 pf = 400 kW</p>
                <p>Connected load: 600 kW (must shed 200 kW minimum)</p>
                <p className="mt-2">Load Shedding Schedule:</p>
                <p className="mt-2">Priority 1 - Never shed (250 kW):</p>
                <p className="ml-4">- Emergency lighting: 15 kW</p>
                <p className="ml-4">- Fire systems: 25 kW</p>
                <p className="ml-4">- Life safety equipment: 50 kW</p>
                <p className="ml-4">- Security systems: 20 kW</p>
                <p className="ml-4">- IT/Comms rooms: 140 kW</p>
                <p className="mt-2">Priority 2 - Shed at 95% load (100 kW):</p>
                <p className="ml-4">- General office lighting: 60 kW</p>
                <p className="ml-4">- Selected socket circuits: 40 kW</p>
                <p className="mt-2">Priority 3 - Shed at 85% load (150 kW):</p>
                <p className="ml-4">- Comfort cooling: 80 kW</p>
                <p className="ml-4">- Water heating: 30 kW</p>
                <p className="ml-4">- EV charging: 40 kW</p>
                <p className="mt-2 text-green-400">Essential load (250 kW) well within 400 kW capacity</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Generator Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Adequate ventilation for combustion air and cooling (typically 10× engine displacement/minute)</li>
                <li className="pl-1">Exhaust routing with thermal insulation and rain protection</li>
                <li className="pl-1">Anti-vibration mounting to prevent structural transmission</li>
                <li className="pl-1">Acoustic treatment to meet planning/environmental requirements</li>
                <li className="pl-1">Fuel storage compliant with Oil Storage Regulations</li>
                <li className="pl-1">Adequate access for maintenance and component replacement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Motor starting current: <strong>6-8× FLC</strong> (DOL start)</li>
                <li className="pl-1">Typical transfer time: <strong>10-15 seconds</strong></li>
                <li className="pl-1">Altitude derating: <strong>3-4% per 300m</strong> above 150m</li>
                <li className="pl-1">Diesel consumption: <strong>0.25 litres/kWh</strong> typical</li>
                <li className="pl-1">Cool-down period: <strong>3-5 minutes</strong> at no load</li>
                <li className="pl-1">Load test frequency: <strong>Monthly</strong> minimum</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersizing for motor starting:</strong> Always add starting kVA allowance</li>
                <li className="pl-1"><strong>Neglecting fuel quality:</strong> Degraded fuel is the leading cause of start failures</li>
                <li className="pl-1"><strong>Insufficient testing:</strong> Monthly load tests prevent wet stacking</li>
                <li className="pl-1"><strong>Poor documentation:</strong> Maintain comprehensive maintenance records</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Generator Sizing Formula</p>
                <ul className="space-y-0.5">
                  <li>kVA = kW ÷ power factor</li>
                  <li>Add motor starting kVA (6-8× FLC)</li>
                  <li>Apply altitude/temperature derating</li>
                  <li>Add 10-20% growth margin</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Testing Requirements</p>
                <ul className="space-y-0.5">
                  <li>Weekly: No-load run (15-30 mins)</li>
                  <li>Monthly: Load test (&gt;50%, 1 hour)</li>
                  <li>Annual: Full load test (100%)</li>
                  <li>Annual: Electrical inspection</li>
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
            <Link to="../h-n-c-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2-5">
              Next: Section 2.5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section2_4;
