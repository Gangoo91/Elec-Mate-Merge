import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "kW vs kVA vs kWh Explained - Energy Efficiency Module 2";
const DESCRIPTION = "Understand the differences between kW (real power), kVA (apparent power), and kWh (energy consumption). Learn about power factor, the power triangle, and UK billing implications.";

const quickCheckQuestions = [
  {
    id: "m2s3-qc1",
    question: "A motor draws 10 kVA from the supply but only produces 8 kW of useful work. What is the power factor?",
    options: ["0.6", "0.8", "1.0", "1.25"],
    correctIndex: 1,
    explanation: "Power Factor = kW / kVA = 8 / 10 = 0.8. This means 80% of the apparent power is converted to useful work, while 20% is reactive power circulating in the system."
  },
  {
    id: "m2s3-qc2",
    question: "A 3 kW heater runs for 5 hours. How many kWh of energy does it consume?",
    options: ["0.6 kWh", "3 kWh", "8 kWh", "15 kWh"],
    correctIndex: 3,
    explanation: "Energy (kWh) = Power (kW) x Time (hours) = 3 kW x 5 h = 15 kWh. This is the actual energy consumed and what you would be billed for on a domestic tariff."
  },
  {
    id: "m2s3-qc3",
    question: "Why do DNOs size transformers and cables based on kVA rather than kW?",
    options: ["kVA is easier to calculate", "kVA represents the total current flow that heats conductors", "kW is only used for DC circuits", "DNOs do not consider power factor"],
    correctIndex: 1,
    explanation: "DNOs use kVA because it represents the total current flowing through their equipment. Even reactive current (which does no useful work) still heats cables and transformers, so equipment must be sized for the full apparent power (kVA)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does kW (kilowatt) measure?",
    options: ["The total power drawn from the supply", "The real power that performs useful work", "The energy consumed over time", "The reactive power in the circuit"],
    correctAnswer: 1,
    explanation: "kW measures real power - the power that actually performs useful work like heating, turning motor shafts, or producing light."
  },
  {
    id: 2,
    question: "A circuit has 12 kVA apparent power and 9 kW real power. What is the reactive power (kVAr)?",
    options: ["3 kVAr", "7.94 kVAr", "21 kVAr", "15 kVAr"],
    correctAnswer: 1,
    explanation: "Using Pythagoras: kVAr = sqrt(kVA squared - kW squared) = sqrt(144 - 81) = sqrt(63) = 7.94 kVAr."
  },
  {
    id: 3,
    question: "What is the unit of energy consumption that appears on electricity bills?",
    options: ["kW", "kVA", "kWh", "kVAr"],
    correctAnswer: 2,
    explanation: "kWh (kilowatt-hours) measures energy consumed over time and is the standard billing unit for electricity."
  },
  {
    id: 4,
    question: "In the power triangle, which side represents apparent power (kVA)?",
    options: ["The adjacent side (horizontal)", "The opposite side (vertical)", "The hypotenuse", "It is not shown on the triangle"],
    correctAnswer: 2,
    explanation: "In the power triangle, kVA (apparent power) is the hypotenuse, kW (real power) is the adjacent side, and kVAr (reactive power) is the opposite side."
  },
  {
    id: 5,
    question: "A facility has a power factor of 0.7. What does this indicate?",
    options: ["70% of apparent power is doing useful work", "The supply voltage is 70% of nominal", "Energy consumption is 70% efficient", "The equipment is 70% loaded"],
    correctAnswer: 0,
    explanation: "A power factor of 0.7 means that only 70% of the apparent power drawn is converted to useful work. The remaining 30% is reactive power."
  },
  {
    id: 6,
    question: "Why might a commercial customer face power factor surcharges from their supplier?",
    options: ["They are using too much energy", "Their low power factor increases current flow and network losses", "Power factor surcharges are mandatory for all businesses", "They have too many resistive loads"],
    correctAnswer: 1,
    explanation: "Low power factor means higher currents for the same useful power, causing increased losses and requiring larger infrastructure. Suppliers charge for this extra burden."
  },
  {
    id: 7,
    question: "Which type of load typically has a power factor close to 1.0?",
    options: ["Induction motors", "Fluorescent lighting with magnetic ballasts", "Resistive heaters and incandescent lamps", "Air conditioning compressors"],
    correctAnswer: 2,
    explanation: "Resistive loads like heaters and incandescent lamps have power factor close to 1.0 because current and voltage are in phase - all power drawn does useful work."
  },
  {
    id: 8,
    question: "A 50 kVA transformer operates at 0.85 power factor. What is the maximum kW load it can supply?",
    options: ["50 kW", "42.5 kW", "58.8 kW", "85 kW"],
    correctAnswer: 1,
    explanation: "kW = kVA x Power Factor = 50 x 0.85 = 42.5 kW. The transformer's kVA rating limits the real power it can deliver."
  },
  {
    id: 9,
    question: "What happens to the current drawn when power factor decreases (for the same kW load)?",
    options: ["Current decreases", "Current stays the same", "Current increases", "Current becomes DC"],
    correctAnswer: 2,
    explanation: "Lower power factor means higher current for the same real power. Current = kVA / Voltage, and kVA = kW / PF, so as PF decreases, current increases."
  },
  {
    id: 10,
    question: "Power factor correction capacitors work by:",
    options: ["Reducing the real power consumed", "Increasing the supply voltage", "Supplying reactive power locally to reduce current from the supply", "Converting AC to DC"],
    correctAnswer: 2,
    explanation: "Capacitors supply reactive power locally, reducing the reactive power that needs to flow from the supply. This reduces total current and improves power factor."
  }
];

const faqs = [
  {
    question: "Why is my generator rated in kVA but my appliances rated in kW?",
    answer: "Generators are rated in kVA because they must supply the total current demanded, regardless of power factor. The actual kW they can deliver depends on the connected load's power factor. For example, a 10 kVA generator with loads at 0.8 power factor can only deliver 8 kW of real power. Appliances are rated in kW because this shows the actual power consumption/output."
  },
  {
    question: "Do domestic customers pay for kVA or kWh?",
    answer: "Domestic customers in the UK pay for kWh (energy consumed) only. The electricity meter measures real energy consumption, not apparent power. However, commercial and industrial customers with maximum demand metering may face kVA-based charges or power factor penalties if their power factor falls below a threshold (typically 0.95 or 0.9)."
  },
  {
    question: "What causes poor power factor in buildings?",
    answer: "Poor power factor is primarily caused by inductive loads that require reactive power to create magnetic fields. Common culprits include: induction motors (lifts, pumps, HVAC), older fluorescent lighting with magnetic ballasts, welding equipment, and transformers operating at light load. Buildings with many motors often have power factors around 0.7-0.85."
  },
  {
    question: "How do I calculate the required capacitor size for power factor correction?",
    answer: "To calculate capacitor kVAr needed: 1) Find current kW and power factor, 2) Calculate current kVAr using the power triangle, 3) Calculate target kVAr at desired power factor, 4) The difference is the capacitor size needed. Always consult specialists as oversized capacitors can cause leading power factor and resonance issues."
  },
  {
    question: "Why do DNOs have maximum kVA limits on supplies?",
    answer: "DNOs set kVA limits because their infrastructure must carry the full apparent current, not just the real power component. A customer drawing 100 kVA at 0.7 power factor requires the same cable size as one drawing 100 kVA at unity power factor, even though the first only uses 70 kW of real power."
  }
];

const EnergyEfficiencyModule2Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            kW vs kVA vs kWh Explained
          </h1>
          <p className="text-white/80">
            Understanding real power, apparent power, and energy consumption
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>kW:</strong> Real power - does useful work</li>
              <li><strong>kVA:</strong> Apparent power - total current flow</li>
              <li><strong>kWh:</strong> Energy consumed over time</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> High kVA for low kW = poor power factor</li>
              <li><strong>Use:</strong> Power factor correction, cable sizing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The difference between kW, kVA, and kWh",
              "How power factor affects electrical systems",
              "The power triangle and its calculations",
              "UK billing structures for different customer types",
              "Why DNOs size equipment in kVA",
              "Power factor correction principles"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Real Power (kW) - What Actually Does Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Real power, measured in kilowatts (kW), is the power that actually performs useful work. It is what heats your kettle, turns your motor shaft, and lights up your bulbs. This is the "working" power.
            </p>
            <p>
              Think of real power as the water that actually comes out of your tap and fills your glass. It is the useful output you are paying for and the work being accomplished.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Points:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measured by wattmeters and kWh meters (over time)</li>
                <li>For resistive loads (heaters, kettles), real power equals apparent power</li>
                <li>Formula: Real Power (P) = V x I x cos(angle) = V x I x PF</li>
              </ul>
            </div>
            <p>
              For purely resistive loads like heaters, incandescent bulbs, and kettles, real power equals apparent power - all the power drawn is converted to useful work (as heat or light). The power factor is 1.0 or "unity".
            </p>
          </div>
        </section>

        {/* Section 02 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Apparent Power (kVA) - Total Power from Supply
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Apparent power, measured in kilovolt-amperes (kVA), is the total power drawn from the electrical supply. It is the product of voltage and current, regardless of whether that power does useful work. This is what your cables and transformers must be sized to handle.
            </p>
            <p>
              Apparent power is like the total water flowing through the pipe - including any water that sloshes back and forth without leaving the tap. The pipe must be big enough to handle all this flow, even if some of it does not reach your glass.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Equipment Sized in kVA:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Transformers</li>
                <li>Generators</li>
                <li>UPS systems</li>
                <li>Cable ratings</li>
              </ul>
            </div>
            <p>
              In AC circuits with motors, transformers, and other inductive or capacitive loads, the current and voltage get out of sync (out of phase). The result is that more current flows than strictly necessary to deliver the useful power. This extra current does no useful work but still heats your cables.
            </p>
            <p>
              Formula: Apparent Power (S) = V x I - simply voltage times current, no power factor involved.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Reactive Power and Power Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Reactive power, measured in kilovolt-amperes reactive (kVAr), is the "wasted" power that oscillates between the source and load, doing no useful work. It is essential for creating magnetic fields in motors and transformers, but it does not turn shafts or produce heat.
            </p>
            <p>
              Imagine pouring a pint of beer. The liquid beer is your real power (kW) - it is what you actually drink. The frothy head is your reactive power (kVAr) - it takes up space in the glass but does not quench your thirst. The total volume (liquid + head) is your apparent power (kVA).
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power Factor Explained:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Formula:</strong> Power Factor (PF) = kW / kVA</li>
                <li><strong>PF = 1.0:</strong> All power is useful (purely resistive - heaters, kettles)</li>
                <li><strong>PF = 0.8:</strong> 80% useful, 20% reactive (typical motor load)</li>
                <li><strong>PF = 0.5:</strong> Only 50% useful - very inefficient</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Lagging vs Leading Power Factor:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lagging:</strong> Current lags behind voltage - caused by inductive loads (motors, transformers). Most common in industry.</li>
                <li><strong>Leading:</strong> Current leads voltage - caused by capacitive loads or over-correction with capacitors. Can cause voltage rise issues.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Energy Consumption (kWh) and Billing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Energy, measured in kilowatt-hours (kWh), is power consumed over time. While kW and kVA measure instantaneous power (rate of energy flow), kWh measures the total energy used. This is what domestic customers see on their electricity bills.
            </p>
            <p>
              Think of kW as your car's speed (how fast you are travelling) and kWh as the distance covered (how far you have gone). A 100 kW motor running for 1 hour uses 100 kWh, just like a car at 100 km/h travels 100 km in an hour.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UK Billing Structures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Domestic:</strong> Pay per kWh consumed (typically 25-35p/kWh) - simple energy only</li>
                <li><strong>Small Commercial:</strong> Pay per kWh, possibly with day/night rates and standing charges</li>
                <li><strong>Large Commercial/Industrial:</strong> Pay for kWh plus capacity charges based on maximum kVA demand. May face power factor penalties if PF falls below 0.95</li>
              </ul>
            </div>
            <p>
              Formula: Energy (kWh) = Power (kW) x Time (hours). 1 kWh = 1 "unit" of electricity on your bill.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            The Power Triangle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The power triangle is a visual representation of the relationship between real power (kW), reactive power (kVAr), and apparent power (kVA). Understanding this triangle is essential for power factor correction calculations.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power Triangle Relationships:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>kW (Real Power):</strong> Adjacent side (horizontal)</li>
                <li><strong>kVAr (Reactive Power):</strong> Opposite side (vertical)</li>
                <li><strong>kVA (Apparent Power):</strong> Hypotenuse</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Formulas (Pythagoras):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>kVA = sqrt(kW squared + kVAr squared)</li>
                <li>kVAr = sqrt(kVA squared - kW squared)</li>
                <li>Power Factor = kW / kVA = cos(angle)</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Worked Example:</p>
              <p className="text-sm text-white">A factory draws 80 kW of real power with a power factor of 0.8 lagging:</p>
              <ul className="text-sm text-white space-y-1 ml-4 mt-2">
                <li>kVA = kW / PF = 80 / 0.8 = 100 kVA</li>
                <li>kVAr = sqrt(100 squared - 80 squared) = sqrt(3600) = 60 kVAr</li>
              </ul>
              <p className="text-sm text-white mt-2">This means 60 kVAr of reactive power is circulating in the system, requiring larger cables and transformers than if the load were purely resistive.</p>
            </div>
          </div>
        </section>

        {/* Section 06 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Why DNOs Care About kVA
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Distribution Network Operators (DNOs) size their infrastructure based on kVA, not kW. Understanding why this matters is crucial for electricians designing installations and advising customers on supply upgrades.
            </p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Problems with Low Power Factor:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Higher currents for the same useful power</li>
                <li>Larger cables required (more copper = more cost)</li>
                <li>Increased I squared R losses in conductors</li>
                <li>Voltage drop issues</li>
                <li>Reduced transformer capacity</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Real-World Impact Example:</p>
              <p className="text-sm text-white">A customer needs 80 kW of power:</p>
              <ul className="text-sm text-white space-y-1 ml-4 mt-2">
                <li><strong>At PF = 0.7:</strong> kVA = 80 / 0.7 = 114 kVA, Current = 285A - needs 120 kVA supply</li>
                <li><strong>At PF = 0.95:</strong> kVA = 80 / 0.95 = 84 kVA, Current = 210A - 100 kVA supply is fine</li>
              </ul>
              <p className="text-sm text-white mt-2">The difference could mean a costly supply upgrade, or simply fitting power factor correction capacitors.</p>
            </div>
            <p>
              Many UK suppliers penalise customers with poor power factor. Charges may apply if PF falls below 0.95 or 0.90, adding 5-15% to electricity bills. Power factor correction equipment often pays for itself in 1-3 years.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Sizing Equipment</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always size cables and switchgear for kVA, not kW</li>
                <li>If power factor is unknown, assume 0.8 for general loads</li>
                <li>Check DNO supply capacity is adequate for the kVA demand</li>
                <li>Consider power factor correction to avoid costly supply upgrades</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Advising Clients</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check their bills for reactive power charges or power factor penalties</li>
                <li>Calculate payback period for power factor correction equipment</li>
                <li>Explain that improving power factor frees up capacity for additional loads</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Confusing kW with kVA</strong> - they are only equal at unity power factor</li>
                <li><strong>Over-sizing capacitors</strong> - can cause leading power factor and resonance issues</li>
                <li><strong>Ignoring harmonics</strong> - distorted waveforms affect power factor readings</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent border border-white/10">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Definitions</p>
                <ul className="space-y-0.5">
                  <li>Real Power (P) = kW</li>
                  <li>Apparent Power (S) = kVA</li>
                  <li>Reactive Power (Q) = kVAr</li>
                  <li>Energy = kWh</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Essential Formulas</p>
                <ul className="space-y-0.5">
                  <li>PF = kW / kVA</li>
                  <li>kW = kVA x PF</li>
                  <li>kVA = kW / PF</li>
                  <li>kWh = kW x hours</li>
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

export default EnergyEfficiencyModule2Section3;
