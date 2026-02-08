import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Oil and Fluid Analysis - MOET Module 4.2.5";
const DESCRIPTION = "Oil and fluid analysis techniques for condition monitoring: sampling procedures, laboratory tests, wear particle analysis, contamination detection, transformer oil testing and lubricant condition assessment for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "oil-sampling",
    question: "When taking an oil sample from a gearbox for analysis, the most important consideration is:",
    options: [
      "Using the largest sample bottle available",
      "Taking the sample from a consistent, representative location while the equipment is at operating temperature",
      "Taking the sample immediately after an oil change",
      "Filtering the sample before sending to the laboratory"
    ],
    correctIndex: 1,
    explanation: "Consistent sampling location and technique are critical for meaningful trending. The sample must be representative of the oil circulating in the system — taken from a mid-stream location, not from the drain plug or surface. The equipment should be at normal operating temperature to ensure contaminants are suspended. Filtering the sample would remove the very particles you are trying to analyse."
  },
  {
    id: "wear-metals",
    question: "An oil analysis report shows elevated levels of iron and chromium particles in a gearbox oil sample. This most likely indicates:",
    options: [
      "Normal oil degradation",
      "Water contamination",
      "Wear of steel gears and bearings — the iron and chromium come from the gear and bearing materials",
      "Incorrect oil grade being used"
    ],
    correctIndex: 2,
    explanation: "Different metals in wear debris indicate which components are wearing. Iron typically comes from gears, shafts and rolling element bearings. Chromium often accompanies iron from hardened steel components. Copper and tin indicate bronze bush or cage wear. Aluminium may come from bearing shells. The pattern of metals helps identify which specific component is deteriorating."
  },
  {
    id: "transformer-oil-dga",
    question: "Dissolved gas analysis (DGA) of transformer oil can detect:",
    options: [
      "The colour of the transformer",
      "Internal faults such as overheating, arcing and partial discharge by analysing gases dissolved in the oil",
      "The external ambient temperature",
      "The transformer's power rating"
    ],
    correctIndex: 1,
    explanation: "DGA is the most important diagnostic test for oil-filled transformers. Internal faults generate specific gases: hydrogen indicates partial discharge, acetylene indicates arcing, ethylene indicates severe overheating, and carbon monoxide/dioxide indicate cellulose (paper insulation) degradation. The pattern and quantity of gases allow diagnosis of the fault type and severity."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Oil analysis is classified as which type of maintenance approach?",
    options: [
      "Reactive maintenance",
      "Condition-based predictive maintenance",
      "Time-based preventive maintenance only",
      "Design-out maintenance"
    ],
    correctAnswer: 1,
    explanation: "Oil analysis is a condition-based predictive maintenance technique. It detects the actual condition of the oil and the equipment it lubricates, enabling maintenance to be scheduled based on measured deterioration rather than fixed time intervals."
  },
  {
    id: 2,
    question: "Which test measures the acidity of lubricating oil and indicates oxidation?",
    options: [
      "Viscosity test",
      "Total acid number (TAN)",
      "Flash point test",
      "Specific gravity test"
    ],
    correctAnswer: 1,
    explanation: "Total acid number (TAN) measures the concentration of acidic compounds in the oil, primarily formed through oxidation. Rising TAN indicates the oil is degrading and acidic by-products may corrode metal surfaces. A significant increase in TAN from the baseline indicates the oil needs changing or the cause of accelerated oxidation needs investigation."
  },
  {
    id: 3,
    question: "Water contamination in lubricating oil is harmful because:",
    options: [
      "It improves the oil's cooling properties",
      "It promotes corrosion, reduces film strength, accelerates oxidation and causes hydrogen embrittlement of bearings",
      "It has no significant effect on equipment",
      "It only affects the oil's colour"
    ],
    correctAnswer: 1,
    explanation: "Even small amounts of water in oil are extremely damaging. Water promotes rust and corrosion of metal surfaces, reduces the oil film strength (leading to metal-to-metal contact), accelerates chemical oxidation of the oil, and can cause hydrogen embrittlement of bearing steels. For rolling element bearings, as little as 0.1% water can halve the bearing life."
  },
  {
    id: 4,
    question: "Ferrography differs from spectrometric oil analysis because it:",
    options: [
      "Is cheaper and faster",
      "Can detect and characterise larger wear particles (above 10 microns) that spectrometry misses",
      "Only measures oil viscosity",
      "Does not require an oil sample"
    ],
    correctAnswer: 1,
    explanation: "Spectrometric analysis (ICP/AES) is excellent for detecting dissolved metals and small particles (below approximately 8-10 microns) but misses larger particles. Ferrography separates wear particles magnetically, allowing visual examination of particle size, shape and composition under a microscope. Large, abnormal particles indicate advanced wear — exactly when spectrometry may understate the severity."
  },
  {
    id: 5,
    question: "For transformer oil, the breakdown voltage test (BDV) measures:",
    options: [
      "The oil's viscosity",
      "The dielectric strength — the voltage at which the oil breaks down and conducts electricity",
      "The oil's flash point",
      "The dissolved gas content"
    ],
    correctAnswer: 1,
    explanation: "The breakdown voltage test measures the dielectric strength of transformer oil — the voltage at which the oil fails to insulate and an arc forms between the test electrodes. Low BDV indicates contamination with water, particles or dissolved gases that reduce the oil's insulating capability. New transformer oil typically has a BDV above 60 kV; values below 30 kV indicate the oil needs treatment."
  },
  {
    id: 6,
    question: "The ISO cleanliness code (e.g., ISO 4406:21/18/15) refers to:",
    options: [
      "The oil's chemical composition",
      "The number and size distribution of solid particles per millilitre of oil",
      "The oil's temperature rating",
      "The manufacturer's quality certification"
    ],
    correctAnswer: 1,
    explanation: "The ISO 4406 cleanliness code quantifies particle contamination using three numbers representing the count of particles larger than 4 microns, 6 microns and 14 microns per millilitre. Lower numbers indicate cleaner oil. Target cleanliness levels depend on the equipment — hydraulic servo valves need very clean oil (e.g., 16/14/11), while gearboxes may tolerate higher levels (e.g., 20/18/15)."
  },
  {
    id: 7,
    question: "An oil sample from a motor bearing housing shows a milky white appearance. The most likely cause is:",
    options: [
      "Normal oil condition",
      "Water contamination — water emulsified in the oil gives a milky appearance",
      "Excessive wear metals",
      "Oil additive depletion"
    ],
    correctAnswer: 1,
    explanation: "A milky or cloudy appearance is a classic visual indicator of water contamination. The water has emulsified with the oil, creating a suspension that appears milky. This level of contamination (typically above 0.1% water) is severely damaging to bearings and gears. The source of water ingress must be identified and eliminated, and the oil changed."
  },
  {
    id: 8,
    question: "In dissolved gas analysis of transformer oil, the presence of acetylene (C2H2) typically indicates:",
    options: [
      "Normal transformer operation",
      "Low-temperature overheating of cellulose insulation",
      "High-energy arcing within the transformer",
      "External contamination of the oil"
    ],
    correctAnswer: 2,
    explanation: "Acetylene is generated only at very high temperatures (above 700 degrees C), which occur during electrical arcing. Its presence in transformer oil is always significant and indicates an internal arcing fault that requires urgent investigation. Even small amounts of acetylene should be treated seriously, as arcing can lead to catastrophic transformer failure."
  },
  {
    id: 9,
    question: "How often should transformer oil samples typically be taken for DGA?",
    options: [
      "Only when a fault is suspected",
      "Annually for critical transformers, with increased frequency if gas levels are rising",
      "Every five years",
      "Only during commissioning"
    ],
    correctAnswer: 1,
    explanation: "Critical transformers should be sampled at least annually for DGA, with results trended over time. If gas levels show an increasing trend, the sampling frequency should be increased — quarterly or even monthly for rapidly developing faults. Online DGA monitors provide continuous monitoring for the most critical assets."
  },
  {
    id: 10,
    question: "Viscosity is the most important physical property of a lubricant because:",
    options: [
      "It determines the oil's colour",
      "It determines the oil film thickness that separates moving surfaces — too thin and metal contact occurs, too thick and energy is wasted",
      "It affects the oil's smell",
      "It determines how quickly the oil can be changed"
    ],
    correctAnswer: 1,
    explanation: "Viscosity is the measure of a fluid's resistance to flow and is the single most important property of a lubricant. It determines the thickness of the oil film that separates moving metal surfaces. If viscosity is too low, the film breaks down and metal-to-metal contact causes wear. If too high, excessive friction generates heat and wastes energy. Viscosity changes over time indicate oxidation, contamination or thermal degradation."
  },
  {
    id: 11,
    question: "Particle counting in oil analysis is used to:",
    options: [
      "Measure the oil's chemical composition",
      "Quantify the number and size distribution of solid contaminant particles in the oil",
      "Determine the oil's flash point",
      "Measure dissolved gases"
    ],
    correctAnswer: 1,
    explanation: "Particle counting measures the concentration of solid particles in different size ranges. This is reported as an ISO cleanliness code. Trending particle counts reveals whether contamination is increasing (ingression exceeding filtration) or decreasing. A sudden increase may indicate a developing component failure releasing wear debris or a seal failure allowing external contamination."
  },
  {
    id: 12,
    question: "Under ST1426, oil and fluid analysis knowledge supports which maintenance competence?",
    options: [
      "Electrical installation design",
      "Condition monitoring and predictive maintenance strategies",
      "Commercial tendering",
      "Fire safety management"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to understand condition monitoring techniques as part of predictive maintenance strategies. Oil and fluid analysis is one of the key condition monitoring methods alongside vibration analysis, thermal imaging and electrical testing."
  }
];

const faqs = [
  {
    question: "Is oil analysis relevant for electrical maintenance technicians?",
    answer: "Yes. Electrical maintenance technicians often work with oil-filled transformers, oil-filled switchgear, motor bearings with oil lubrication, hydraulic systems on electrical actuators, and gearboxes coupled to electric motors. Dissolved gas analysis of transformer oil is particularly critical for HV maintenance. Understanding oil analysis helps you interpret reports and make informed maintenance decisions."
  },
  {
    question: "How long does it take to get oil analysis results?",
    answer: "Standard laboratory analysis typically takes 3-5 working days from receipt of the sample. Urgent or emergency samples can often be processed within 24 hours at additional cost. For critical transformers, online dissolved gas monitors provide continuous real-time analysis without the need for manual sampling."
  },
  {
    question: "Can I assess oil condition on site without laboratory analysis?",
    answer: "Basic on-site checks include visual inspection (colour, clarity, milkiness), the 'crackle test' for water (heating a small sample on a hot plate — crackling indicates water), and portable particle counters. However, these do not replace laboratory analysis for detailed wear metal identification, dissolved gas analysis or accurate contamination quantification."
  },
  {
    question: "What is the most important transformer oil test?",
    answer: "Dissolved gas analysis (DGA) is widely regarded as the most important transformer oil test. It can detect developing internal faults — overheating, arcing, partial discharge and cellulose degradation — long before they cause failure or are detectable by other means. It is often called the 'blood test' for transformers."
  },
  {
    question: "How should oil samples be stored and transported?",
    answer: "Samples must be taken in clean, laboratory-supplied bottles with no headspace (air exposure causes oxidation). They should be labelled immediately with date, equipment identification, operating temperature and oil type. Transport to the laboratory should be as quick as possible — ideally within 24-48 hours. Protect samples from extreme temperatures and direct sunlight during transport."
  }
];

const MOETModule4Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 4.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Oil and Fluid Analysis</h1>
          <p className="text-white/80">Detecting equipment deterioration through lubricant and insulating oil condition monitoring</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>What:</strong> Laboratory analysis of oils and fluids to detect wear and contamination</li>
              <li className="pl-1"><strong>Tests:</strong> Wear metals, viscosity, TAN, water content, particle count</li>
              <li className="pl-1"><strong>Transformer:</strong> Dissolved gas analysis (DGA) for internal fault detection</li>
              <li className="pl-1"><strong>Trending:</strong> Regular sampling builds a deterioration profile</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Transformers:</strong> DGA detects arcing, overheating and PD</li>
              <li className="pl-1"><strong>Gearboxes:</strong> Wear metals reveal gear and bearing condition</li>
              <li className="pl-1"><strong>Hydraulics:</strong> Particle count and cleanliness codes</li>
              <li className="pl-1"><strong>ST1426:</strong> Condition monitoring knowledge requirement</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the principles of oil and fluid analysis for condition monitoring",
              "Describe correct sampling procedures to obtain representative samples",
              "Identify key laboratory tests and what each reveals about equipment condition",
              "Interpret wear metal results to diagnose specific component deterioration",
              "Understand dissolved gas analysis for transformer oil monitoring",
              "Link oil analysis to ST1426 predictive maintenance requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Principles of Oil and Fluid Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Oil and fluid analysis works on the principle that lubricating oils, hydraulic fluids and transformer oils carry information about the condition of both the fluid itself and the equipment it serves. As components wear, microscopic metal particles are released into the oil. As the oil degrades, its chemical properties change. As contaminants enter the system, they can be detected in the oil sample.</p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What Oil Analysis Reveals</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Equipment condition:</strong> Wear metals indicate which components are wearing and how fast</li>
                <li className="pl-1"><strong>Oil condition:</strong> Viscosity, acidity, oxidation and additive depletion show whether the oil is still fit for service</li>
                <li className="pl-1"><strong>Contamination:</strong> Water, fuel dilution, coolant leaks, external dirt and process contaminants</li>
                <li className="pl-1"><strong>Internal faults (transformers):</strong> Dissolved gases reveal overheating, arcing and insulation degradation</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Laboratory Tests</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Measures</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Significance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Spectrometric analysis</td><td className="border border-white/10 px-3 py-2">Wear metals and contaminants (ppm)</td><td className="border border-white/10 px-3 py-2">Identifies which components are wearing</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Viscosity</td><td className="border border-white/10 px-3 py-2">Oil film thickness capability</td><td className="border border-white/10 px-3 py-2">Changes indicate contamination or degradation</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Total acid number</td><td className="border border-white/10 px-3 py-2">Acidity from oxidation</td><td className="border border-white/10 px-3 py-2">Rising TAN indicates oil degradation</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Water content</td><td className="border border-white/10 px-3 py-2">Dissolved and free water (ppm)</td><td className="border border-white/10 px-3 py-2">Even trace water is highly damaging</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Particle count</td><td className="border border-white/10 px-3 py-2">Solid contamination (ISO 4406)</td><td className="border border-white/10 px-3 py-2">Cleanliness affects component life</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Dissolved gas (DGA)</td><td className="border border-white/10 px-3 py-2">Gases from internal faults</td><td className="border border-white/10 px-3 py-2">Transformer-specific fault diagnosis</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-elec-yellow/70"><strong>Key point:</strong> A single oil analysis result tells you the current condition. Regular sampling and trending reveals the rate of change — which is far more valuable for maintenance planning.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Sampling Procedures and Best Practice
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>The quality of oil analysis results depends entirely on the quality of the sample. A poorly taken sample can lead to incorrect diagnoses, unnecessary maintenance or missed developing faults. Consistent sampling procedures are essential.</p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sampling Best Practice</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Consistent location:</strong> Always sample from the same point — ideally a dedicated sample valve in the return line or mid-stream</li>
                <li className="pl-1"><strong>Operating temperature:</strong> Take samples while equipment is at normal operating temperature to ensure particles are suspended</li>
                <li className="pl-1"><strong>Clean bottles:</strong> Use laboratory-supplied clean sample bottles. Never reuse bottles or use workshop containers</li>
                <li className="pl-1"><strong>Flush first:</strong> Before taking the sample, flush a small amount of oil through the sample valve to clear any stagnant oil</li>
                <li className="pl-1"><strong>Label immediately:</strong> Record date, equipment ID, operating hours, oil type and any observations</li>
                <li className="pl-1"><strong>Minimise contamination:</strong> Keep bottle caps on until the moment of sampling. Replace immediately after filling</li>
              </ul>
            </div>
            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Sampling Errors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Sampling from the drain plug (collects settled debris — not representative)</li>
                <li className="pl-1">Sampling when equipment is cold (particles have settled)</li>
                <li className="pl-1">Using dirty or contaminated sample bottles</li>
                <li className="pl-1">Leaving the sample exposed to air (causes oxidation)</li>
                <li className="pl-1">Inconsistent sampling locations between tests (makes trending meaningless)</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Wear Metal Analysis and Contamination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Spectrometric wear metal analysis identifies the concentration of metallic elements in the oil, measured in parts per million (ppm). Each metal can be traced to specific component materials, enabling targeted diagnosis of which part is wearing.</p>
            <div className="my-6">
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Metal</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Iron (Fe)</td><td className="border border-white/10 px-3 py-2">Gears, shafts, rolling elements, cylinder liners</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Copper (Cu)</td><td className="border border-white/10 px-3 py-2">Bronze bushes, bearing cages, thrust washers</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Chromium (Cr)</td><td className="border border-white/10 px-3 py-2">Hardened steel components, piston rings</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Aluminium (Al)</td><td className="border border-white/10 px-3 py-2">Bearing shells, pistons, pump housings</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Lead (Pb)</td><td className="border border-white/10 px-3 py-2">Plain bearing overlay, solder</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Silicon (Si)</td><td className="border border-white/10 px-3 py-2">External dirt ingression, sealant contamination</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-sm text-elec-yellow/70"><strong>Remember:</strong> Absolute values matter less than the trend. A steady iron level of 20 ppm may be normal for a particular gearbox. A sudden increase from 20 to 80 ppm indicates accelerating wear requiring investigation.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Transformer Oil Analysis and DGA
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>For electrical maintenance technicians, transformer oil analysis is arguably the most critical application of fluid analysis. Oil-filled transformers rely on the oil for both insulation and cooling. Dissolved gas analysis provides an early warning system for internal faults that would otherwise be undetectable until catastrophic failure.</p>
            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key DGA Gases and Their Meaning</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Hydrogen (H2):</strong> Partial discharge, low-energy sparking</li>
                <li className="pl-1"><strong>Methane (CH4):</strong> Low-temperature oil overheating (below 300 degrees C)</li>
                <li className="pl-1"><strong>Ethane (C2H6):</strong> Low to moderate oil overheating</li>
                <li className="pl-1"><strong>Ethylene (C2H4):</strong> Severe oil overheating (above 500 degrees C)</li>
                <li className="pl-1"><strong>Acetylene (C2H2):</strong> High-energy arcing (above 700 degrees C) — always significant</li>
                <li className="pl-1"><strong>CO/CO2:</strong> Cellulose (paper) insulation degradation</li>
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Oil Tests</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Breakdown voltage (BDV): dielectric strength</li>
                  <li className="pl-1">Water content: moisture in ppm</li>
                  <li className="pl-1">Acidity: oil degradation indicator</li>
                  <li className="pl-1">Interfacial tension: contamination marker</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">DGA Interpretation Methods</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Duval triangle: fault classification</li>
                  <li className="pl-1">Rogers ratios: gas ratio analysis</li>
                  <li className="pl-1">Key gas method: dominant gas identification</li>
                  <li className="pl-1">IEC 60599: international standard guidance</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-elec-yellow/70"><strong>ST1426 link:</strong> Understanding oil and fluid analysis contributes to the condition monitoring and predictive maintenance knowledge required under the maintenance technician standard. For the electrical pathway, transformer oil testing is particularly relevant.</p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Oil Tests</p>
                <ul className="space-y-0.5">
                  <li>Spectrometry — wear metals (ppm)</li>
                  <li>Viscosity — film thickness capability</li>
                  <li>TAN — acidity/oxidation</li>
                  <li>Water content — ppm or %</li>
                  <li>ISO 4406 — particle cleanliness code</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Transformer DGA</p>
                <ul className="space-y-0.5">
                  <li>H2 = partial discharge</li>
                  <li>C2H2 = arcing (always serious)</li>
                  <li>C2H4 = severe overheating</li>
                  <li>CO/CO2 = cellulose degradation</li>
                  <li>IEC 60599 / Duval triangle</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Insulation Resistance Testing
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2-6">
              Next: Trend Analysis and Predictive Maintenance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section2_5;
