import { ArrowLeft, Snowflake, CheckCircle, Thermometer, Wind, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Refrigeration Fundamentals - HNC Module 8 Section 3.1";
const DESCRIPTION = "Comprehensive guide to refrigeration systems for building services: vapour compression cycle, P-h diagrams, refrigerant types (R32, R410A, R290), GWP values, F-Gas regulations, compressor types, condensers, evaporators and expansion devices.";

const quickCheckQuestions = [
  {
    id: "vapour-compression-stages",
    question: "What are the four main stages of the vapour compression refrigeration cycle in order?",
    options: [
      "Compression, condensation, expansion, evaporation",
      "Evaporation, compression, condensation, expansion",
      "Condensation, expansion, evaporation, compression",
      "Expansion, evaporation, compression, condensation"
    ],
    correctIndex: 0,
    explanation: "The vapour compression cycle follows: Compression (low pressure vapour to high pressure vapour), Condensation (high pressure vapour to high pressure liquid), Expansion (high pressure liquid to low pressure liquid), Evaporation (low pressure liquid to low pressure vapour). This cycle continuously removes heat from the evaporator and rejects it at the condenser."
  },
  {
    id: "refrigerant-gwp",
    question: "Which refrigerant has the lowest Global Warming Potential (GWP)?",
    options: ["R410A (GWP 2088)", "R32 (GWP 675)", "R134a (GWP 1430)", "R290 Propane (GWP 3)"],
    correctIndex: 3,
    explanation: "R290 (propane) has a GWP of only 3, making it the most environmentally friendly option. However, it is highly flammable (A3 classification) and requires special safety measures. R32 (GWP 675) is a popular lower-GWP alternative to R410A (GWP 2088) in split systems."
  },
  {
    id: "compressor-type",
    question: "Which compressor type is most commonly used in domestic and light commercial air conditioning systems?",
    options: ["Reciprocating compressor", "Scroll compressor", "Screw compressor", "Centrifugal compressor"],
    correctIndex: 1,
    explanation: "Scroll compressors dominate domestic and light commercial AC due to their quiet operation, high efficiency, fewer moving parts and reliability. Reciprocating compressors are used in smaller systems, screw compressors in large commercial applications, and centrifugal in industrial chillers."
  },
  {
    id: "f-gas-certification",
    question: "Under F-Gas regulations, what is the minimum charge requiring an F-Gas certificate to handle refrigerants?",
    options: ["Any amount requires certification", "5 kg or more", "10 kg or more", "Only systems over 50 kW"],
    correctIndex: 0,
    explanation: "F-Gas regulations require anyone handling fluorinated refrigerants (HFCs) to hold an appropriate F-Gas certificate, regardless of the charge amount. This applies to installation, maintenance, servicing, recovery and leak checking activities. The regulations aim to reduce emissions of potent greenhouse gases."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In a P-h (pressure-enthalpy) diagram, which process is represented by a vertical line?",
    options: [
      "Evaporation at constant pressure",
      "Isentropic compression",
      "Throttling through expansion device",
      "Condensation at constant pressure"
    ],
    correctAnswer: 2,
    explanation: "Throttling through an expansion device is an isenthalpic (constant enthalpy) process, represented by a vertical line on a P-h diagram. The refrigerant drops in pressure without changing enthalpy because no work is done and minimal heat is transferred during this rapid expansion."
  },
  {
    id: 2,
    question: "What is the primary function of the condenser in a refrigeration system?",
    options: [
      "To increase refrigerant pressure",
      "To absorb heat from the cooled space",
      "To reject heat from the refrigerant to the surroundings",
      "To reduce refrigerant pressure"
    ],
    correctAnswer: 2,
    explanation: "The condenser rejects heat from the high-pressure, high-temperature refrigerant vapour to the surrounding air or water. This causes the refrigerant to condense from vapour to liquid while maintaining high pressure. Heat rejection equals the heat absorbed at the evaporator plus the compressor work input."
  },
  {
    id: 3,
    question: "R32 refrigerant is classified as A2L. What does this classification indicate?",
    options: [
      "Non-flammable, high toxicity",
      "Lower flammability, lower toxicity",
      "Highly flammable, non-toxic",
      "Non-flammable, non-toxic"
    ],
    correctAnswer: 1,
    explanation: "A2L indicates lower flammability and lower toxicity. The 'A' means lower toxicity (occupational exposure limit &gt;400 ppm), '2' indicates flammable, and 'L' denotes lower flammability (burning velocity &lt;10 cm/s). R32 requires special handling but is safer than A3 (highly flammable) refrigerants like R290."
  },
  {
    id: 4,
    question: "What is the purpose of superheat in a refrigeration system?",
    options: [
      "To increase system efficiency",
      "To ensure only vapour enters the compressor",
      "To reduce condensing temperature",
      "To increase cooling capacity"
    ],
    correctAnswer: 1,
    explanation: "Superheat ensures that only dry vapour (no liquid) enters the compressor. Liquid refrigerant entering the compressor causes 'liquid slugging' which can severely damage compressor valves and bearings. Typical superheat is 5-10K above saturation temperature at evaporator pressure."
  },
  {
    id: 5,
    question: "Which expansion device automatically adjusts to maintain constant superheat?",
    options: [
      "Capillary tube",
      "Fixed orifice",
      "Thermostatic expansion valve (TXV)",
      "Manual expansion valve"
    ],
    correctAnswer: 2,
    explanation: "A thermostatic expansion valve (TXV or TEV) uses a sensing bulb to measure suction line temperature and automatically adjusts refrigerant flow to maintain constant superheat regardless of load conditions. Capillary tubes and fixed orifices cannot adjust to changing conditions."
  },
  {
    id: 6,
    question: "Under the EU F-Gas Regulation phase-down, what is the GWP limit for single split AC systems containing less than 3 kg from 2025?",
    options: ["GWP &lt;2500", "GWP &lt;750", "GWP &lt;150", "No GWP limit applies"],
    correctAnswer: 1,
    explanation: "From January 2025, single split AC systems containing less than 3 kg of refrigerant must use refrigerants with GWP &lt;750. This effectively bans R410A (GWP 2088) in new equipment in this category, pushing the market towards R32 (GWP 675) and other lower-GWP alternatives."
  },
  {
    id: 7,
    question: "What is the typical coefficient of performance (COP) for a modern air-cooled split system in cooling mode?",
    options: ["1.0 - 1.5", "2.5 - 4.0", "6.0 - 8.0", "10.0 - 15.0"],
    correctAnswer: 1,
    explanation: "Modern air-cooled split systems typically achieve COPs of 2.5-4.0 in cooling mode, meaning they move 2.5-4 kW of heat for every 1 kW of electrical input. Higher efficiency units and water-cooled systems can achieve COPs of 5-6. Heat pumps in heating mode often achieve COPs of 3-5."
  },
  {
    id: 8,
    question: "Which compressor type uses two spiral-shaped scrolls to compress refrigerant?",
    options: [
      "Reciprocating compressor",
      "Rotary vane compressor",
      "Scroll compressor",
      "Screw compressor"
    ],
    correctAnswer: 2,
    explanation: "Scroll compressors use two interleaving spiral scrolls - one fixed, one orbiting. As the orbiting scroll moves, pockets of refrigerant are progressively compressed from the outer edge toward the centre discharge port. This design provides smooth, quiet operation with minimal vibration."
  },
  {
    id: 9,
    question: "What is subcooling in a refrigeration system?",
    options: [
      "Cooling below the evaporating temperature",
      "Cooling the liquid refrigerant below its saturation temperature",
      "Reducing superheat at the compressor inlet",
      "Cooling the compressor motor"
    ],
    correctAnswer: 1,
    explanation: "Subcooling is cooling the liquid refrigerant below its saturation (condensing) temperature. Typical subcooling is 5-10K. Subcooling ensures fully liquid refrigerant reaches the expansion device and increases system capacity by increasing the enthalpy difference in the evaporator."
  },
  {
    id: 10,
    question: "R290 (propane) refrigerant requires which safety classification considerations?",
    options: [
      "Standard installation - no special requirements",
      "ATEX compliant equipment and charge limits in occupied spaces",
      "Only for outdoor installation",
      "Requires oxygen monitoring only"
    ],
    correctAnswer: 1,
    explanation: "R290 is classified A3 (highly flammable), requiring ATEX compliant electrical equipment in equipment rooms, charge limits in occupied spaces (typically 150g for direct systems), leak detection, and adequate ventilation. Despite restrictions, R290 is increasingly used due to its GWP of only 3 and excellent thermodynamic properties."
  },
  {
    id: 11,
    question: "What is the main advantage of an electronic expansion valve (EEV) over a TXV?",
    options: [
      "Lower cost",
      "No moving parts",
      "Precise control via BMS integration and wider operating range",
      "Works without electricity"
    ],
    correctAnswer: 2,
    explanation: "Electronic expansion valves offer precise stepper motor or pulse-width modulation control, BMS integration capability, wider operating range, and faster response to load changes. They enable sophisticated control strategies like optimised superheat and can adapt to variable speed compressor systems."
  },
  {
    id: 12,
    question: "In a screw compressor, what is the function of the oil injection?",
    options: [
      "Lubrication only",
      "Sealing, lubrication, and cooling",
      "Preventing liquid slugging",
      "Increasing discharge pressure"
    ],
    correctAnswer: 1,
    explanation: "Oil in screw compressors performs three critical functions: sealing the clearances between rotors for efficient compression, lubricating the rotors and bearings, and cooling the compressed gas to prevent overheating. An oil separator removes oil from the discharge gas before the condenser."
  },
  {
    id: 13,
    question: "What happens to refrigerant pressure and temperature during the evaporation process?",
    options: [
      "Both increase",
      "Pressure increases, temperature stays constant",
      "Both stay relatively constant as heat is absorbed",
      "Both decrease"
    ],
    correctAnswer: 2,
    explanation: "During evaporation, the refrigerant absorbs latent heat from the cooled space while changing from liquid to vapour. Pressure and temperature remain relatively constant (at saturation conditions) until all liquid has evaporated. Only then does temperature increase as superheat develops."
  },
  {
    id: 14,
    question: "What is the maximum leak check interval for systems containing 50-500 tonnes CO2 equivalent under F-Gas regulations?",
    options: ["Monthly", "Quarterly", "Every 6 months", "Annually"],
    correctAnswer: 3,
    explanation: "Systems containing 50-500 tonnes CO2 equivalent must be leak checked at least annually. Systems with 500+ tonnes require 6-monthly checks, unless automatic leak detection is fitted (which extends intervals). CO2 equivalent = refrigerant charge (kg) x GWP."
  }
];

const faqs = [
  {
    question: "Why is R410A being phased out in favour of R32?",
    answer: "R410A has a GWP of 2088, making it a significant contributor to climate change. The EU F-Gas Regulation phase-down requires lower-GWP refrigerants for new equipment. R32 (GWP 675) offers similar performance to R410A but with 68% lower GWP. R32 also requires approximately 30% less charge for the same capacity, operates at slightly higher pressures, and has better heat transfer properties. However, R32 is mildly flammable (A2L), requiring updated installation practices and safety measures."
  },
  {
    question: "What qualifications do I need to work with refrigerants in the UK?",
    answer: "Working with fluorinated greenhouse gases (F-gases) in the UK requires an F-Gas certificate under EU Regulation 517/2014 (retained in UK law). Categories include: Category I (all activities), Category II (maintenance/recovery where no breach of refrigerant circuit), Category III (recovery from equipment with less than 3 kg charge), and Category IV (leak checking). Natural refrigerants like R290 don't require F-Gas certification but do require competency in handling flammable substances. City & Guilds 2079 is the most common F-Gas qualification."
  },
  {
    question: "How do I calculate the CO2 equivalent of a refrigeration system?",
    answer: "CO2 equivalent (tonnes) = Refrigerant charge (kg) x GWP / 1000. For example, a system with 8 kg of R410A: 8 x 2088 / 1000 = 16.7 tonnes CO2 equivalent. This determines leak check frequency and record-keeping requirements under F-Gas regulations. Systems with 5 tonnes CO2e or more require records to be maintained for 5 years, including refrigerant type, quantity, dates of service, and technician details."
  },
  {
    question: "What is the difference between an air-cooled and water-cooled condenser?",
    answer: "Air-cooled condensers reject heat directly to ambient air using fans, are simpler to install, require less maintenance, but operate at higher condensing temperatures (typically 10-15K above ambient). Water-cooled condensers use cooling towers or ground loops, achieving lower condensing temperatures (approaching wet-bulb temperature), resulting in 15-25% higher efficiency. However, water-cooled systems have higher capital costs, require water treatment, and need freeze protection. Water-cooled is typically chosen for systems above 100 kW or where high efficiency is critical."
  },
  {
    question: "Why do refrigeration systems need both superheat and subcooling?",
    answer: "Superheat (typically 5-10K) at the evaporator outlet ensures only vapour enters the compressor, preventing liquid slugging damage to compressor valves and bearings. Subcooling (typically 5-10K) at the condenser outlet ensures fully liquid refrigerant reaches the expansion device, preventing flash gas that reduces system capacity. Both are measured as temperature differences from saturation conditions and are key diagnostic parameters for system performance and refrigerant charge verification."
  },
  {
    question: "What are the main considerations when selecting a refrigerant for a new installation?",
    answer: "Key considerations include: GWP and F-Gas regulation compliance (current and future), safety classification (toxicity and flammability), thermodynamic properties for the application, compatibility with oils and materials, operating pressures and temperatures, availability and cost, training and equipment requirements for handling, and charge limits for occupied spaces. No single refrigerant is ideal for all applications - selection involves balancing environmental impact, safety, efficiency, and practicality for the specific building services application."
  }
];

const HNCModule8Section3_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3">
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
            <Snowflake className="h-4 w-4" />
            <span>Module 8.3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Refrigeration Fundamentals
          </h1>
          <p className="text-white/80">
            Understanding refrigeration cycles, refrigerants, components and F-Gas regulations for building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Vapour compression:</strong> Compress, condense, expand, evaporate</li>
              <li className="pl-1"><strong>Low-GWP shift:</strong> R410A (2088) to R32 (675) to R290 (3)</li>
              <li className="pl-1"><strong>F-Gas certification:</strong> Required for all HFC handling</li>
              <li className="pl-1"><strong>COP:</strong> Typically 2.5-4.0 for air-cooled systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>AC systems:</strong> Scroll compressors, R32 refrigerant dominant</li>
              <li className="pl-1"><strong>Heat pumps:</strong> Same cycle, heating COP 3-5 typical</li>
              <li className="pl-1"><strong>Chillers:</strong> Screw or centrifugal, water-cooled for efficiency</li>
              <li className="pl-1"><strong>Compliance:</strong> F-Gas records, leak checks, recovery</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the vapour compression refrigeration cycle and P-h diagrams",
              "Compare refrigerant types, GWP values and safety classifications",
              "Explain F-Gas regulations and compliance requirements",
              "Identify compressor types and their applications",
              "Understand condenser, evaporator and expansion device operation",
              "Calculate system performance parameters including COP"
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

        {/* Section 1: The Vapour Compression Refrigeration Cycle */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Vapour Compression Refrigeration Cycle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The vapour compression cycle is the fundamental thermodynamic process used in virtually all
              air conditioning, heat pump and refrigeration systems. It exploits the latent heat of
              vaporisation to move thermal energy from a low-temperature source to a high-temperature sink.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Four Stages of the Cycle:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Compression (1&gt;2):</strong> Low-pressure vapour is compressed to high-pressure, high-temperature vapour</li>
                <li className="pl-1"><strong>Condensation (2&gt;3):</strong> High-pressure vapour releases heat and condenses to high-pressure liquid</li>
                <li className="pl-1"><strong>Expansion (3&gt;4):</strong> High-pressure liquid passes through expansion device, dropping to low pressure</li>
                <li className="pl-1"><strong>Evaporation (4&gt;1):</strong> Low-pressure liquid absorbs heat and evaporates to low-pressure vapour</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Energy Balance</p>
              <p className="font-mono text-center text-lg mb-2">Q<sub>condenser</sub> = Q<sub>evaporator</sub> + W<sub>compressor</sub></p>
              <div className="grid grid-cols-2 gap-2 text-xs text-white/70 mt-3">
                <div><strong>Q<sub>cond</sub></strong> = Heat rejected at condenser (kW)</div>
                <div><strong>Q<sub>evap</sub></strong> = Heat absorbed at evaporator (kW)</div>
                <div><strong>W<sub>comp</sub></strong> = Compressor work input (kW)</div>
                <div><strong>COP</strong> = Q<sub>evap</sub> / W<sub>comp</sub> (cooling)</div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure-Enthalpy (P-h) Diagram</p>
              <p className="text-sm text-white/90 mb-3">
                The P-h diagram is essential for analysing refrigeration cycles. The x-axis shows specific
                enthalpy (kJ/kg), the y-axis shows pressure (bar). The saturation dome divides liquid,
                two-phase and vapour regions.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Process</th>
                      <th className="border border-white/10 px-3 py-2 text-left">P-h Line</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Compression</td>
                      <td className="border border-white/10 px-3 py-2">Curved, rising right</td>
                      <td className="border border-white/10 px-3 py-2">Isentropic (constant entropy) - pressure and enthalpy increase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Condensation</td>
                      <td className="border border-white/10 px-3 py-2">Horizontal, left</td>
                      <td className="border border-white/10 px-3 py-2">Isobaric (constant pressure) - enthalpy decreases as heat is rejected</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Expansion</td>
                      <td className="border border-white/10 px-3 py-2">Vertical, down</td>
                      <td className="border border-white/10 px-3 py-2">Isenthalpic (constant enthalpy) - pressure drops, some flash gas forms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Evaporation</td>
                      <td className="border border-white/10 px-3 py-2">Horizontal, right</td>
                      <td className="border border-white/10 px-3 py-2">Isobaric (constant pressure) - enthalpy increases as heat is absorbed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Cycle Parameters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Evaporating temperature:</strong> Typically 5-10K below desired cooling temperature</li>
                <li className="pl-1"><strong>Condensing temperature:</strong> Typically 10-15K above ambient (air-cooled)</li>
                <li className="pl-1"><strong>Superheat:</strong> 5-10K above evaporating temperature at compressor inlet</li>
                <li className="pl-1"><strong>Subcooling:</strong> 5-10K below condensing temperature at expansion device inlet</li>
                <li className="pl-1"><strong>Pressure ratio:</strong> P<sub>discharge</sub> / P<sub>suction</sub> - typically 2.5-4 for AC systems</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Heat always flows from hot to cold naturally. The refrigeration cycle uses work (compressor) to move heat against this natural direction - from the cold evaporator to the hot condenser.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Refrigerants and Environmental Impact */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Refrigerants and Environmental Impact
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Refrigerant selection is critical in modern building services, balancing thermodynamic
              performance, safety, environmental impact and regulatory compliance. The industry is
              transitioning from high-GWP HFCs towards lower-GWP alternatives and natural refrigerants.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Refrigerants Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Refrigerant</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">GWP</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Safety</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R410A</td>
                      <td className="border border-white/10 px-3 py-2">HFC blend</td>
                      <td className="border border-white/10 px-3 py-2">2088</td>
                      <td className="border border-white/10 px-3 py-2">A1</td>
                      <td className="border border-white/10 px-3 py-2">Split AC (being phased out)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R32</td>
                      <td className="border border-white/10 px-3 py-2">HFC</td>
                      <td className="border border-white/10 px-3 py-2">675</td>
                      <td className="border border-white/10 px-3 py-2">A2L</td>
                      <td className="border border-white/10 px-3 py-2">Split AC, heat pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R134a</td>
                      <td className="border border-white/10 px-3 py-2">HFC</td>
                      <td className="border border-white/10 px-3 py-2">1430</td>
                      <td className="border border-white/10 px-3 py-2">A1</td>
                      <td className="border border-white/10 px-3 py-2">Chillers, automotive</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R290 (Propane)</td>
                      <td className="border border-white/10 px-3 py-2">HC (Natural)</td>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">A3</td>
                      <td className="border border-white/10 px-3 py-2">Small systems, heat pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R744 (CO2)</td>
                      <td className="border border-white/10 px-3 py-2">Natural</td>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">A1</td>
                      <td className="border border-white/10 px-3 py-2">Commercial refrigeration, heat pumps</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">R717 (Ammonia)</td>
                      <td className="border border-white/10 px-3 py-2">Natural</td>
                      <td className="border border-white/10 px-3 py-2">0</td>
                      <td className="border border-white/10 px-3 py-2">B2L</td>
                      <td className="border border-white/10 px-3 py-2">Industrial refrigeration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Classification (ASHRAE 34)</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Toxicity</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li><strong>A</strong> = Lower toxicity (OEL &gt;400 ppm)</li>
                    <li><strong>B</strong> = Higher toxicity (OEL &lt;400 ppm)</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Flammability</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li><strong>1</strong> = No flame propagation</li>
                    <li><strong>2L</strong> = Lower flammability (&lt;10 cm/s)</li>
                    <li><strong>2</strong> = Flammable</li>
                    <li><strong>3</strong> = Higher flammability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-300 mb-1">Global Warming Potential (GWP)</p>
                  <p className="text-sm text-white/90">
                    GWP measures a gas's ability to trap heat relative to CO2 (GWP=1) over 100 years.
                    R410A with GWP of 2088 means 1 kg leaked is equivalent to 2088 kg of CO2 emissions.
                    This is why F-Gas regulations are driving the transition to lower-GWP refrigerants.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">R32 vs R410A - Key Differences:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>GWP:</strong> R32 (675) is 68% lower than R410A (2088)</li>
                <li className="pl-1"><strong>Charge:</strong> R32 requires approximately 30% less refrigerant</li>
                <li className="pl-1"><strong>Pressure:</strong> R32 operates at slightly higher discharge pressures</li>
                <li className="pl-1"><strong>Temperature:</strong> R32 has higher discharge temperatures - affects compressor design</li>
                <li className="pl-1"><strong>Safety:</strong> R32 is A2L (mildly flammable) vs R410A A1 (non-flammable)</li>
                <li className="pl-1"><strong>Efficiency:</strong> R32 has approximately 5% better energy efficiency</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The refrigerant landscape is evolving rapidly. Building services engineers must stay current with regulations, understand refrigerant properties, and consider future service availability when specifying new systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Compressors and System Components */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Compressors and System Components
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The compressor is the "heart" of the refrigeration system, providing the pressure difference
              that drives refrigerant flow. Different compressor types suit different capacities and
              applications, each with distinct characteristics.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compressor Types Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Capacity Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Advantages</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reciprocating</td>
                      <td className="border border-white/10 px-3 py-2">0.5-100 kW</td>
                      <td className="border border-white/10 px-3 py-2">Simple, repairable, wide pressure ratio</td>
                      <td className="border border-white/10 px-3 py-2">Small commercial, transport</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scroll</td>
                      <td className="border border-white/10 px-3 py-2">3-60 kW</td>
                      <td className="border border-white/10 px-3 py-2">Quiet, efficient, reliable, few parts</td>
                      <td className="border border-white/10 px-3 py-2">Split AC, heat pumps, light commercial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rotary</td>
                      <td className="border border-white/10 px-3 py-2">1-15 kW</td>
                      <td className="border border-white/10 px-3 py-2">Compact, quiet, low vibration</td>
                      <td className="border border-white/10 px-3 py-2">Domestic AC, small splits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Screw</td>
                      <td className="border border-white/10 px-3 py-2">50-1500 kW</td>
                      <td className="border border-white/10 px-3 py-2">High capacity, variable speed capable</td>
                      <td className="border border-white/10 px-3 py-2">Large commercial, industrial chillers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Centrifugal</td>
                      <td className="border border-white/10 px-3 py-2">300-10,000+ kW</td>
                      <td className="border border-white/10 px-3 py-2">Very high efficiency at full load</td>
                      <td className="border border-white/10 px-3 py-2">Large chillers, district cooling</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scroll Compressor Operation</p>
              <p className="text-sm text-white/90 mb-3">
                Scroll compressors use two interleaved spiral scrolls - one stationary, one orbiting.
                As the orbiting scroll moves eccentrically, crescent-shaped pockets trap and progressively
                compress refrigerant vapour from the outer edge toward the central discharge port.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Continuous compression with minimal pulsation</li>
                <li className="pl-1">Fewer moving parts than reciprocating (higher reliability)</li>
                <li className="pl-1">Tolerant of liquid refrigerant (compliant mechanism)</li>
                <li className="pl-1">Cannot reverse direction - important for installation</li>
                <li className="pl-1">Variable speed versions available (inverter-driven)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Condensers</p>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-xs text-white/70 mb-2">Reject heat from high-pressure refrigerant</p>
                  <ul className="text-xs text-white space-y-1">
                    <li><strong>Air-cooled:</strong> Fans over finned coils, simple, common</li>
                    <li><strong>Water-cooled:</strong> Shell-and-tube, higher efficiency</li>
                    <li><strong>Evaporative:</strong> Water spray + air, approaching wet-bulb</li>
                    <li><strong>Microchannel:</strong> Compact, lower charge, modern units</li>
                  </ul>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Evaporators</p>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-xs text-white/70 mb-2">Absorb heat into low-pressure refrigerant</p>
                  <ul className="text-xs text-white space-y-1">
                    <li><strong>Direct expansion (DX):</strong> Air over refrigerant coils</li>
                    <li><strong>Flooded:</strong> Shell-and-tube for chillers</li>
                    <li><strong>Plate heat exchanger:</strong> Compact, high efficiency</li>
                    <li><strong>Fan coil units:</strong> Terminal units with DX or chilled water</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Expansion Devices</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Control Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capillary tube</td>
                      <td className="border border-white/10 px-3 py-2">Fixed restriction (length/diameter)</td>
                      <td className="border border-white/10 px-3 py-2">Small domestic, simple systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fixed orifice</td>
                      <td className="border border-white/10 px-3 py-2">Fixed opening size</td>
                      <td className="border border-white/10 px-3 py-2">Residential heat pumps (piston type)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TXV/TEV</td>
                      <td className="border border-white/10 px-3 py-2">Thermostatic - maintains superheat</td>
                      <td className="border border-white/10 px-3 py-2">Commercial AC, refrigeration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">EEV</td>
                      <td className="border border-white/10 px-3 py-2">Electronic - stepper motor/PWM</td>
                      <td className="border border-white/10 px-3 py-2">VRF systems, precision control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Modern inverter-driven compressors require electronic expansion valves (EEVs) that can respond quickly to capacity changes. Fixed devices cannot maintain correct superheat across the wide operating range of variable-speed systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: F-Gas Regulations and Compliance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            F-Gas Regulations and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The F-Gas Regulation (EU 517/2014, retained in UK law) controls the use of fluorinated
              greenhouse gases (HFCs) to reduce their contribution to climate change. Building services
              engineers must understand and comply with these requirements.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key F-Gas Requirements</p>
              <ul className="text-sm text-white space-y-2 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Certification:</strong> All personnel handling F-gases must hold appropriate F-Gas certificates</li>
                <li className="pl-1"><strong>Leak checking:</strong> Mandatory for systems above 5 tonnes CO2e (frequency depends on charge)</li>
                <li className="pl-1"><strong>Record keeping:</strong> Equipment records for 5 years minimum</li>
                <li className="pl-1"><strong>Recovery:</strong> F-gases must be properly recovered during service/decommissioning</li>
                <li className="pl-1"><strong>Labelling:</strong> Equipment must be labelled with refrigerant type and charge</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Leak Check Frequency (Based on CO2 Equivalent)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">CO2 Equivalent</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Standard Interval</th>
                      <th className="border border-white/10 px-3 py-2 text-left">With Leak Detection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&lt;5 tonnes</td>
                      <td className="border border-white/10 px-3 py-2">No requirement</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5-50 tonnes</td>
                      <td className="border border-white/10 px-3 py-2">12 months</td>
                      <td className="border border-white/10 px-3 py-2">24 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50-500 tonnes</td>
                      <td className="border border-white/10 px-3 py-2">6 months</td>
                      <td className="border border-white/10 px-3 py-2">12 months</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;500 tonnes</td>
                      <td className="border border-white/10 px-3 py-2">3 months</td>
                      <td className="border border-white/10 px-3 py-2">6 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GWP Phase-Down and Bans</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>2020:</strong> Domestic refrigerators/freezers GWP &gt;150 banned</li>
                <li className="pl-1"><strong>2020:</strong> Moveable AC GWP &gt;150 banned</li>
                <li className="pl-1"><strong>2022:</strong> Commercial refrigeration &lt;40 kW GWP &gt;150 banned</li>
                <li className="pl-1"><strong>2025:</strong> Single split AC &lt;3 kg charge GWP &gt;750 banned</li>
                <li className="pl-1"><strong>2025:</strong> Multipack centralised refrigeration &gt;40 kW GWP &gt;150 banned</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CO2 Equivalent Calculation</p>
              <p className="font-mono text-center text-lg mb-2">CO2e (tonnes) = Charge (kg) x GWP / 1000</p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs text-white/70 mt-3">
                <div className="p-2 bg-black/30 rounded">
                  <p className="font-medium mb-1">Example: R410A System</p>
                  <p>Charge: 8 kg</p>
                  <p>GWP: 2088</p>
                  <p>CO2e = 8 x 2088 / 1000 = <strong>16.7 tonnes</strong></p>
                  <p className="mt-1 text-white/50">Requires 6-monthly leak checks</p>
                </div>
                <div className="p-2 bg-black/30 rounded">
                  <p className="font-medium mb-1">Example: R32 System</p>
                  <p>Charge: 5.5 kg (30% less than R410A)</p>
                  <p>GWP: 675</p>
                  <p>CO2e = 5.5 x 675 / 1000 = <strong>3.7 tonnes</strong></p>
                  <p className="mt-1 text-white/50">Below 5 tonnes - no leak check required</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">F-Gas Certificate Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities Permitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">I</td>
                      <td className="border border-white/10 px-3 py-2">All activities including leak checking, recovery, installation, maintenance, servicing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">II</td>
                      <td className="border border-white/10 px-3 py-2">Recovery, installation, maintenance where refrigerant circuit is not breached</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">III</td>
                      <td className="border border-white/10 px-3 py-2">Recovery from equipment with &lt;3 kg charge (or &lt;6 kg hermetically sealed)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IV</td>
                      <td className="border border-white/10 px-3 py-2">Leak checking only (not involving breaking into refrigerant circuit)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Record Keeping Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Quantity and type of F-gas installed</li>
                <li className="pl-1">Quantity added during installation, maintenance or servicing</li>
                <li className="pl-1">Quantity recovered</li>
                <li className="pl-1">Identity of company/technician who performed work</li>
                <li className="pl-1">Dates and results of leak checks</li>
                <li className="pl-1">Records retained for minimum 5 years</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> Natural refrigerants (R290, R744, R717) are not covered by F-Gas regulations as they are not fluorinated gases. However, they have their own safety requirements - R290 requires compliance with flammable substance regulations, R717 with toxic substance handling.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: COP Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A split system air conditioner has a cooling capacity of 7 kW and consumes 2.2 kW of electrical power. Calculate the COP.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>COP (cooling) = Cooling capacity / Power input</p>
                <p className="mt-2">COP = Q<sub>evap</sub> / W<sub>comp</sub></p>
                <p>COP = 7 kW / 2.2 kW = <strong>3.18</strong></p>
                <p className="mt-2">For every 1 kW of electrical input, the system moves 3.18 kW of heat.</p>
                <p className="mt-2 text-white/60">Heat rejected at condenser = 7 + 2.2 = 9.2 kW</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: CO2 Equivalent Determination</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A VRF system contains 25 kg of R410A. Calculate the CO2 equivalent and determine leak check frequency.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>CO2e = Charge x GWP / 1000</p>
                <p className="mt-2">CO2e = 25 kg x 2088 / 1000 = <strong>52.2 tonnes CO2e</strong></p>
                <p className="mt-2">52.2 tonnes falls in 50-500 tonnes bracket:</p>
                <p>- Standard leak check interval: <strong>6 months</strong></p>
                <p>- With automatic leak detection: <strong>12 months</strong></p>
                <p className="mt-2 text-white/60">Records must be maintained for 5 years</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Superheat Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An evaporator operates at 5 bar with R32. The saturation temperature at 5 bar is 2 degrees C. The suction line temperature measures 10 degrees C. What is the superheat?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Superheat = Suction temperature - Saturation temperature</p>
                <p className="mt-2">Superheat = 10 degrees C - 2 degrees C = <strong>8K</strong></p>
                <p className="mt-2">This is within the typical 5-10K range:</p>
                <p className="text-green-400">System operating correctly - dry vapour entering compressor</p>
                <p className="mt-2 text-white/60">Low superheat (&lt;3K) indicates risk of liquid return</p>
                <p className="text-white/60">High superheat (&gt;15K) indicates insufficient refrigerant or TXV issue</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Refrigerant Comparison for New Installation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A contractor is specifying a 10 kW split system. Compare R410A and R32 options for F-Gas compliance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Typical charges for 10 kW system:</p>
                <p>R410A: approximately 3.5 kg</p>
                <p>R32: approximately 2.5 kg (30% less)</p>
                <p className="mt-2">CO2 equivalent:</p>
                <p>R410A: 3.5 x 2088 / 1000 = 7.3 tonnes CO2e</p>
                <p>R32: 2.5 x 675 / 1000 = 1.7 tonnes CO2e</p>
                <p className="mt-2">Implications:</p>
                <p>R410A: <strong>Above 5 tonnes - annual leak checks required</strong></p>
                <p>R32: <strong>Below 5 tonnes - no mandatory leak checks</strong></p>
                <p className="mt-2 text-white/60">From 2025: R410A banned in single splits &lt;3 kg charge (GWP &gt;750)</p>
                <p className="text-white/60">R32 (GWP 675) complies with new regulations</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 5: Heat Pump Heating COP</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A heat pump has a heating capacity of 12 kW and compressor power of 3.2 kW. Calculate the heating COP.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>For heating mode:</p>
                <p>COP (heating) = Heating capacity / Power input</p>
                <p>COP = Q<sub>condenser</sub> / W<sub>comp</sub></p>
                <p className="mt-2">COP = 12 kW / 3.2 kW = <strong>3.75</strong></p>
                <p className="mt-2">Heat absorbed from outside air:</p>
                <p>Q<sub>evap</sub> = Q<sub>cond</sub> - W<sub>comp</sub> = 12 - 3.2 = 8.8 kW</p>
                <p className="mt-2 text-white/60">Note: Heating COP &gt; Cooling COP because useful output includes compressor work</p>
                <p className="text-white/60">Heating COP = Cooling COP + 1 (ideally)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Refrigeration Parameters</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Superheat:</strong> 5-10K typical - ensures dry vapour to compressor</li>
                <li className="pl-1"><strong>Subcooling:</strong> 5-10K typical - ensures liquid to expansion device</li>
                <li className="pl-1"><strong>Suction pressure:</strong> Determines evaporating temperature</li>
                <li className="pl-1"><strong>Discharge pressure:</strong> Determines condensing temperature</li>
                <li className="pl-1"><strong>Pressure ratio:</strong> 2.5-4 typical for AC - affects efficiency and compressor life</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">System Efficiency Factors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lower condensing temperature:</strong> Improves COP - keep condensers clean</li>
                <li className="pl-1"><strong>Higher evaporating temperature:</strong> Improves COP - correctly size evaporators</li>
                <li className="pl-1"><strong>Correct refrigerant charge:</strong> Both under and overcharge reduce efficiency</li>
                <li className="pl-1"><strong>Adequate subcooling:</strong> Maximises evaporator capacity</li>
                <li className="pl-1"><strong>Clean filters and coils:</strong> Essential for airflow and heat transfer</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Diagnosis from Pressures</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Low suction, low discharge:</strong> Low charge or restricted liquid line</li>
                <li className="pl-1"><strong>High suction, low discharge:</strong> Compressor valve damage</li>
                <li className="pl-1"><strong>High suction, high discharge:</strong> Overcharge or condenser airflow restriction</li>
                <li className="pl-1"><strong>Low suction, high discharge:</strong> Evaporator airflow restriction or iced coil</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mixing refrigerants:</strong> Never mix different refrigerant types in a system</li>
                <li className="pl-1"><strong>Venting refrigerant:</strong> Illegal under F-Gas regulations - always recover</li>
                <li className="pl-1"><strong>Wrong oil:</strong> Each refrigerant requires specific oil type (POE, PVE, mineral)</li>
                <li className="pl-1"><strong>Ignoring flammability:</strong> A2L and A3 refrigerants need specific handling</li>
                <li className="pl-1"><strong>Working without certification:</strong> F-Gas certificate required for HFC handling</li>
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
                <p className="font-medium text-white mb-1">Refrigerant GWP Values</p>
                <ul className="space-y-0.5">
                  <li>R410A: 2088 (being phased out)</li>
                  <li>R32: 675 (A2L - mildly flammable)</li>
                  <li>R134a: 1430 (chillers)</li>
                  <li>R290 (Propane): 3 (A3 - flammable)</li>
                  <li>R744 (CO2): 1 (high pressure)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical System Parameters</p>
                <ul className="space-y-0.5">
                  <li>Superheat: 5-10K</li>
                  <li>Subcooling: 5-10K</li>
                  <li>COP (cooling): 2.5-4.0</li>
                  <li>COP (heating): 3.0-5.0</li>
                  <li>CO2e = kg x GWP / 1000</li>
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
            <Link to="../h-n-c-module8-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section3-2">
              Next: Section 3.2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section3_1;
