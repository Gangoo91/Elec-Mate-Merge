import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Passive Design Principles - HNC Module 6 Section 6.1";
const DESCRIPTION = "Master passive design principles for building services: solar orientation, natural ventilation, daylighting strategies, thermal mass utilisation, and passive cooling techniques for energy-efficient buildings.";

const quickCheckQuestions = [
  {
    id: "passive-design-definition",
    question: "What is the primary objective of passive design in buildings?",
    options: ["To maximise mechanical system efficiency", "To reduce energy demand through building form and fabric", "To eliminate all electrical systems", "To increase renewable energy generation"],
    correctIndex: 1,
    explanation: "Passive design aims to reduce energy demand by utilising building form, orientation, fabric, and natural forces (sun, wind, thermal mass) to provide heating, cooling, and lighting with minimal mechanical intervention."
  },
  {
    id: "solar-orientation",
    question: "For a building in the UK, which facade orientation receives the most consistent solar gain throughout the year?",
    options: ["North-facing", "South-facing", "East-facing", "West-facing"],
    correctIndex: 1,
    explanation: "South-facing facades in the UK (and Northern Hemisphere) receive the most consistent solar gain. The sun's path is lower in winter, allowing deeper penetration, while summer sun angles are higher and easier to shade."
  },
  {
    id: "stack-ventilation",
    question: "Stack effect ventilation relies primarily on:",
    options: ["Wind pressure differences", "Mechanical fans at low speed", "Temperature differences creating buoyancy", "Humidity gradients"],
    correctIndex: 2,
    explanation: "Stack effect (or buoyancy-driven ventilation) relies on warm air being less dense than cool air. Warm air rises and exits at high level, drawing in cooler replacement air at low level - creating natural air movement without mechanical assistance."
  },
  {
    id: "thermal-mass",
    question: "High thermal mass materials in buildings help to:",
    options: ["Increase instantaneous heating response", "Moderate temperature swings by absorbing and releasing heat", "Reduce the need for insulation", "Increase air infiltration rates"],
    correctIndex: 1,
    explanation: "Thermal mass (concrete, masonry, water) absorbs heat when surroundings are warm and releases it when cooler. This moderates temperature swings, reducing peak heating and cooling loads and improving thermal comfort."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The 'fabric first' approach to building design prioritises:",
    options: [
      "Installing the largest possible heating system",
      "Reducing energy demand through building envelope performance",
      "Using renewable energy to offset poor fabric",
      "Maximising window areas for views"
    ],
    correctAnswer: 1,
    explanation: "Fabric first prioritises reducing energy demand through excellent insulation, airtightness, and thermal bridging reduction before sizing mechanical systems. This approach results in smaller, more efficient building services."
  },
  {
    id: 2,
    question: "In the UK, what solar altitude angle should be used when designing summer shading for south-facing windows?",
    options: ["23.5°", "45°", "60-65°", "90°"],
    correctAnswer: 2,
    explanation: "At UK latitudes (51-56°N), the summer sun altitude reaches approximately 60-65° at solar noon in June. Horizontal overhangs should be designed to shade windows at these angles while allowing lower winter sun to penetrate."
  },
  {
    id: 3,
    question: "Cross ventilation in buildings is most effective when:",
    options: [
      "Openings are on the same wall",
      "Openings are on opposite or adjacent walls with clear internal paths",
      "The building has no internal partitions",
      "Windows are kept closed during the day"
    ],
    correctAnswer: 1,
    explanation: "Cross ventilation requires inlet and outlet openings on opposite or adjacent walls, with clear internal air paths. Wind pressure differences drive airflow through the space, providing effective natural cooling and fresh air."
  },
  {
    id: 4,
    question: "A daylight factor of 5% in an office space indicates:",
    options: [
      "Poor daylight provision requiring artificial lighting",
      "Adequate daylight for most office tasks",
      "Excessive daylight likely to cause glare",
      "Daylight only sufficient for circulation areas"
    ],
    correctAnswer: 1,
    explanation: "Daylight factor is the ratio of internal to external illuminance. 5% is generally adequate for office work (2% minimum for circulation, 5% for working areas). Higher values may require glare control measures."
  },
  {
    id: 5,
    question: "Night purge ventilation is a passive cooling strategy that:",
    options: [
      "Cools the building structure overnight using cool night air",
      "Operates mechanical cooling only at night",
      "Removes pollutants accumulated during the day",
      "Increases thermal mass effectiveness"
    ],
    correctAnswer: 0,
    explanation: "Night purge ventilation uses cooler night-time air to remove heat stored in the building's thermal mass during the day. The cooled mass then absorbs heat gains the following day, reducing peak temperatures."
  },
  {
    id: 6,
    question: "Which glazing property is most important for controlling solar heat gain?",
    options: [
      "U-value",
      "g-value (solar factor)",
      "Visible light transmittance",
      "Frame material"
    ],
    correctAnswer: 1,
    explanation: "The g-value (solar factor or SHGC) indicates the proportion of solar radiation transmitted through glazing. Lower g-values reduce solar heat gain - critical for preventing overheating in highly glazed buildings."
  },
  {
    id: 7,
    question: "Exposed concrete soffits in offices contribute to passive design by:",
    options: [
      "Reducing acoustic reverberation",
      "Providing accessible thermal mass",
      "Improving fire resistance",
      "Reducing floor-to-floor heights"
    ],
    correctAnswer: 1,
    explanation: "Exposed concrete soffits provide accessible thermal mass that can absorb heat during the day and release it at night. Suspended ceilings isolate the thermal mass, reducing its effectiveness in moderating temperatures."
  },
  {
    id: 8,
    question: "The optimum depth for daylit spaces in side-lit buildings is typically:",
    options: [
      "Equal to window head height",
      "1.5 to 2.5 times the window head height",
      "3 to 4 times the window head height",
      "Unlimited with adequate glazing"
    ],
    correctAnswer: 1,
    explanation: "Useful daylight penetration is typically limited to 1.5-2.5 times the window head height from the facade. Deeper spaces require toplighting (rooflights) or light shelves to achieve adequate daylight levels."
  },
  {
    id: 9,
    question: "A building designed with a narrow floor plate (12-15m) primarily enables:",
    options: [
      "Maximum lettable floor area",
      "Cross ventilation and daylight penetration from both sides",
      "Reduced structural costs",
      "Higher occupant densities"
    ],
    correctAnswer: 1,
    explanation: "Narrow floor plates (12-15m) allow natural ventilation airflow paths and daylight penetration from both facades to the building core. This is a fundamental passive design strategy reducing mechanical cooling and lighting energy."
  },
  {
    id: 10,
    question: "Solar shading on west-facing facades is particularly challenging because:",
    options: [
      "West facades receive no direct sunlight",
      "Low afternoon sun angles make horizontal shading ineffective",
      "Wind loads are highest on west facades",
      "Rain penetration is most common on west facades"
    ],
    correctAnswer: 1,
    explanation: "West-facing facades receive intense, low-angle afternoon sun when buildings are already warm from the day's heat gains. Horizontal overhangs are ineffective; vertical fins or internal blinds are typically required."
  },
  {
    id: 11,
    question: "Phase Change Materials (PCMs) enhance passive design by:",
    options: [
      "Generating electricity from temperature differences",
      "Storing latent heat during phase transitions",
      "Improving window insulation",
      "Increasing ventilation rates"
    ],
    correctAnswer: 1,
    explanation: "PCMs absorb significant heat energy during melting (latent heat) without temperature rise. This increases effective thermal mass in lightweight construction, helping to moderate temperature swings and reduce cooling loads."
  },
  {
    id: 12,
    question: "The Passivhaus standard primarily focuses on:",
    options: [
      "Renewable energy generation",
      "Ultra-low energy demand through exceptional fabric and airtightness",
      "Natural ventilation only",
      "Thermal mass construction"
    ],
    correctAnswer: 1,
    explanation: "Passivhaus achieves ultra-low energy demand (≤15 kWh/m²/yr heating) through exceptional insulation (U-values ~0.1 W/m²K), airtightness (≤0.6 ACH@50Pa), thermal bridge-free design, and mechanical ventilation with heat recovery."
  }
];

const faqs = [
  {
    question: "How do passive design principles affect building services sizing?",
    answer: "Effective passive design significantly reduces building services requirements. Solar shading, thermal mass, and natural ventilation can reduce peak cooling loads by 30-50%, allowing smaller chillers, reduced ductwork, and lower electrical loads. Good daylighting design reduces artificial lighting requirements by 40-60%. This translates to smaller plant rooms, reduced riser sizes, lower capital costs, and substantially reduced operational energy consumption throughout the building's life."
  },
  {
    question: "Can natural ventilation work in UK urban environments?",
    answer: "Natural ventilation is viable in many UK urban settings with careful design. Key considerations include: acoustic attenuation for openings near busy roads, air filtration for polluted areas, security for accessible openings, and wind analysis for tall buildings. Mixed-mode designs combining natural and mechanical ventilation offer flexibility - operating naturally when conditions permit and switching to mechanical when needed for comfort or air quality."
  },
  {
    question: "What is the relationship between glazing ratio and energy performance?",
    answer: "Glazing ratio significantly impacts energy balance. While windows provide daylight (reducing lighting energy) and solar gains (reducing winter heating), excessive glazing causes overheating and heat loss. Optimal glazing ratios are typically 25-40% of facade area in UK climates. South-facing glazing with shading is preferred; north glazing provides diffuse light without overheating risk. High-performance glazing (low U-value, appropriate g-value) enables larger window areas while maintaining energy efficiency."
  },
  {
    question: "How do Building Regulations address passive design?",
    answer: "Part L of the Building Regulations increasingly promotes passive design through fabric energy efficiency standards, limiting air permeability, requiring consideration of overheating risk (CIBSE TM59), and setting targets for operational energy. The Future Homes Standard (2025) will require even higher fabric performance and low-carbon heating. SAP and SBEM calculations reward passive measures through reduced energy demand, often enabling compliance with smaller or simpler mechanical systems."
  },
  {
    question: "What monitoring systems support passive building operation?",
    answer: "Effective passive buildings require monitoring to verify performance and guide occupant behaviour. Key systems include: temperature sensors (multiple zones), CO₂ monitoring (ventilation adequacy), window/vent position sensors (BMS integration), weather stations (external conditions), occupancy sensors (demand-controlled ventilation), and energy sub-metering. BMS systems can automate night purge, window operation, and blind control based on sensor inputs and weather forecasts."
  },
  {
    question: "How does climate change affect passive design strategies?",
    answer: "Climate projections for the UK indicate warmer summers, milder winters, and more extreme weather events. Passive designs should be future-proofed by: designing for higher cooling degree days than current climate, incorporating robust overheating mitigation, using thermal mass for summer cooling resilience, ensuring natural ventilation can handle higher external temperatures, and allowing for future mechanical cooling installation if needed. CIBSE TM59 overheating assessments now require future climate scenarios."
  }
];

const HNCModule6Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section6">
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
            <span>Module 6.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Passive Design Principles
          </h1>
          <p className="text-white/80">
            Solar orientation, natural ventilation, daylighting, thermal mass and passive cooling strategies for energy-efficient buildings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Passive design:</strong> Reduces energy demand through building form and fabric</li>
              <li className="pl-1"><strong>Solar orientation:</strong> South-facing glazing maximises useful solar gain</li>
              <li className="pl-1"><strong>Natural ventilation:</strong> Cross-flow and stack effect strategies</li>
              <li className="pl-1"><strong>Thermal mass:</strong> Moderates temperature swings, enables night cooling</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Impact</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Reduced loads:</strong> 30-50% smaller heating/cooling plant</li>
              <li className="pl-1"><strong>Daylighting:</strong> 40-60% less artificial lighting energy</li>
              <li className="pl-1"><strong>Controls integration:</strong> BMS-automated passive systems</li>
              <li className="pl-1"><strong>Mixed-mode:</strong> Natural and mechanical working together</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain passive design principles and the fabric first approach",
              "Apply solar orientation strategies for UK building design",
              "Design natural ventilation systems using cross-flow and stack effect",
              "Calculate daylight factors and specify daylighting strategies",
              "Utilise thermal mass and phase change materials for temperature control",
              "Implement passive cooling strategies including night purge and solar shading"
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

        {/* Section 1: Passive Design Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Passive Design Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Passive design utilises building form, orientation, and fabric to provide heating, cooling, ventilation,
              and lighting with minimal mechanical intervention. This approach prioritises reducing energy demand
              before considering how remaining demand is met - the foundation of sustainable building design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key passive design principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fabric first:</strong> Invest in building envelope before mechanical systems</li>
                <li className="pl-1"><strong>Climate response:</strong> Design responds to local climate conditions</li>
                <li className="pl-1"><strong>Natural forces:</strong> Harness sun, wind, and buoyancy for comfort</li>
                <li className="pl-1"><strong>Occupant interaction:</strong> Enable user control of natural systems</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Passive vs Active Design Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Aspect</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Passive Approach</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Active Approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heating</td>
                      <td className="border border-white/10 px-3 py-2">Solar gain, insulation, thermal mass</td>
                      <td className="border border-white/10 px-3 py-2">Boilers, heat pumps, radiators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cooling</td>
                      <td className="border border-white/10 px-3 py-2">Shading, ventilation, night purge</td>
                      <td className="border border-white/10 px-3 py-2">Chillers, air conditioning, FCUs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Natural cross-flow, stack effect</td>
                      <td className="border border-white/10 px-3 py-2">AHUs, extract fans, ductwork</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Daylighting, light shelves, rooflights</td>
                      <td className="border border-white/10 px-3 py-2">LED luminaires, control systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy use</td>
                      <td className="border border-white/10 px-3 py-2">Minimal operational energy</td>
                      <td className="border border-white/10 px-3 py-2">Continuous energy consumption</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">The Energy Hierarchy</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">1. Reduce demand:</span> <span className="text-white">Passive design, fabric performance</span></p>
                <p><span className="text-white/60">2. Use energy efficiently:</span> <span className="text-white">High-efficiency systems, heat recovery</span></p>
                <p><span className="text-white/60">3. Supply from renewables:</span> <span className="text-white">PV, solar thermal, heat pumps</span></p>
                <p><span className="text-white/60">4. Offset remaining carbon:</span> <span className="text-white">Green tariffs, carbon credits</span></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Every kWh of demand reduced through passive measures is worth more than a kWh generated - it saves capital cost, maintenance, and space throughout the building's life.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Solar Orientation and Daylighting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Solar Orientation and Daylighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Solar orientation determines how buildings interact with the sun throughout the day and year.
              Optimal orientation maximises beneficial winter solar gain whilst minimising summer overheating
              risk, while providing adequate daylight to reduce artificial lighting requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">South-Facing (UK)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Maximum solar gain potential</li>
                  <li className="pl-1">High winter sun penetration</li>
                  <li className="pl-1">Easily shaded in summer</li>
                  <li className="pl-1">Ideal for living spaces, offices</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">North-Facing (UK)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">No direct solar gain</li>
                  <li className="pl-1">Diffuse, even daylight</li>
                  <li className="pl-1">No overheating risk</li>
                  <li className="pl-1">Ideal for studios, galleries</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">East-Facing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Morning sun, cooler afternoons</li>
                  <li className="pl-1">Lower overheating risk</li>
                  <li className="pl-1">Moderate shading needed</li>
                  <li className="pl-1">Good for bedrooms, kitchens</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">West-Facing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Intense afternoon/evening sun</li>
                  <li className="pl-1">Highest overheating risk</li>
                  <li className="pl-1">Difficult to shade (low angles)</li>
                  <li className="pl-1">Minimise glazing or use vertical fins</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Daylighting Design Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target Values</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daylight Factor</td>
                      <td className="border border-white/10 px-3 py-2">Internal/external illuminance ratio</td>
                      <td className="border border-white/10 px-3 py-2">2% minimum, 5% for tasks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Uniformity Ratio</td>
                      <td className="border border-white/10 px-3 py-2">Min/average daylight factor</td>
                      <td className="border border-white/10 px-3 py-2">≥0.4 for good distribution</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daylit Depth</td>
                      <td className="border border-white/10 px-3 py-2">Distance daylight penetrates</td>
                      <td className="border border-white/10 px-3 py-2">1.5-2.5 × window head height</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Glazing Ratio</td>
                      <td className="border border-white/10 px-3 py-2">Window area / floor area</td>
                      <td className="border border-white/10 px-3 py-2">15-25% typical office</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">View Out</td>
                      <td className="border border-white/10 px-3 py-2">Visual connection to outside</td>
                      <td className="border border-white/10 px-3 py-2">75% of floor area with view</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Daylighting strategies:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Light shelves:</strong> Horizontal reflectors bounce daylight deeper into rooms</li>
                <li className="pl-1"><strong>Clerestory windows:</strong> High-level glazing provides even illumination</li>
                <li className="pl-1"><strong>Rooflights:</strong> 3× more effective than vertical glazing (per m²)</li>
                <li className="pl-1"><strong>Atria:</strong> Bring daylight to deep-plan building cores</li>
                <li className="pl-1"><strong>Light tubes:</strong> Channel daylight to internal rooms via reflective ducts</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Design for 300-500 lux average daylight in workspaces. Provide daylight-linked dimming controls to maximise energy savings from natural light.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Natural Ventilation Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Natural Ventilation Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Natural ventilation uses wind pressure and buoyancy (stack effect) to move air through buildings
              without mechanical fans. When designed correctly, natural ventilation provides fresh air,
              removes heat and pollutants, and significantly reduces energy consumption compared to
              fully air-conditioned buildings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Natural Ventilation Driving Forces</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Wind-Driven (Cross Ventilation)</p>
                  <ul className="text-white/80 space-y-1">
                    <li>• Pressure difference across building</li>
                    <li>• Requires openings on opposite facades</li>
                    <li>• Effective to ~5× ceiling height depth</li>
                    <li>• Depends on wind speed and direction</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Buoyancy-Driven (Stack Effect)</p>
                  <ul className="text-white/80 space-y-1">
                    <li>• Warm air rises, exits at high level</li>
                    <li>• Cool air drawn in at low level</li>
                    <li>• Requires vertical height difference</li>
                    <li>• Works even in calm conditions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ventilation Strategy Options</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single-Sided</td>
                      <td className="border border-white/10 px-3 py-2">Openings on one facade only</td>
                      <td className="border border-white/10 px-3 py-2">Rooms ≤2.5× ceiling height deep</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cross Ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Openings on opposite/adjacent walls</td>
                      <td className="border border-white/10 px-3 py-2">Narrow plan buildings (≤15m)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stack Ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Vertical shafts or atria</td>
                      <td className="border border-white/10 px-3 py-2">Multi-storey, deep plan buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Wind Towers</td>
                      <td className="border border-white/10 px-3 py-2">Roof-mounted wind catchers</td>
                      <td className="border border-white/10 px-3 py-2">Hot climates, traditional buildings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mixed Mode</td>
                      <td className="border border-white/10 px-3 py-2">Natural with mechanical backup</td>
                      <td className="border border-white/10 px-3 py-2">UK offices, schools, hospitals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design requirements for natural ventilation:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Opening area:</strong> Typically 5% of floor area for background, 10% for rapid cooling</li>
                <li className="pl-1"><strong>Inlet/outlet ratio:</strong> 1:1 for cross-flow; outlets larger for stack effect</li>
                <li className="pl-1"><strong>Clear air paths:</strong> Internal doors, transfer grilles, open plan layouts</li>
                <li className="pl-1"><strong>Controls:</strong> Actuated windows, BMS integration, weather monitoring</li>
                <li className="pl-1"><strong>Acoustic treatment:</strong> Attenuators for urban sites, sound-resistant vents</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ventilation Rate Calculation (Stack Effect)</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Q = Cd × A × √(2 × g × H × ΔT / Tavg)</p>
                <p className="mt-2 text-white/60">Where:</p>
                <p className="ml-4">Q = Volume flow rate (m³/s)</p>
                <p className="ml-4">Cd = Discharge coefficient (typically 0.6)</p>
                <p className="ml-4">A = Free opening area (m²)</p>
                <p className="ml-4">g = 9.81 m/s²</p>
                <p className="ml-4">H = Height between openings (m)</p>
                <p className="ml-4">ΔT = Temperature difference (K)</p>
                <p className="ml-4">Tavg = Average absolute temperature (K)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> Natural ventilation requires BMS integration for automated window/damper control, weather monitoring, and changeover to mechanical systems when natural ventilation cannot maintain comfort conditions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Thermal Mass and Passive Cooling */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Thermal Mass and Passive Cooling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermal mass refers to a material's ability to absorb, store, and release heat. When combined
              with night ventilation, thermal mass provides effective passive cooling - storing heat during
              the day and releasing it at night, significantly reducing or eliminating mechanical cooling
              requirements in UK buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Mass Properties of Common Materials</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Material</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Density (kg/m³)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specific Heat (J/kgK)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Thermal Mass Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dense concrete</td>
                      <td className="border border-white/10 px-3 py-2">2400</td>
                      <td className="border border-white/10 px-3 py-2">1000</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Brick</td>
                      <td className="border border-white/10 px-3 py-2">1700</td>
                      <td className="border border-white/10 px-3 py-2">800</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water</td>
                      <td className="border border-white/10 px-3 py-2">1000</td>
                      <td className="border border-white/10 px-3 py-2">4186</td>
                      <td className="border border-white/10 px-3 py-2">Very high</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Timber</td>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">1600</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Steel</td>
                      <td className="border border-white/10 px-3 py-2">7800</td>
                      <td className="border border-white/10 px-3 py-2">450</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Accessing Thermal Mass</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Exposed concrete soffits (no suspended ceilings)</li>
                  <li className="pl-1">Fair-faced blockwork walls</li>
                  <li className="pl-1">Screed floors with hard finishes</li>
                  <li className="pl-1">Internal masonry partitions</li>
                  <li className="pl-1">Phase change material panels</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Night Purge Ventilation</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cool night air flushes stored heat</li>
                  <li className="pl-1">Requires 6-10 ACH for 4-8 hours</li>
                  <li className="pl-1">External temp must be ≥3°C below mass</li>
                  <li className="pl-1">Secure, weather-protected openings</li>
                  <li className="pl-1">BMS-controlled automatic operation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Passive Cooling Strategies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Mechanism</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Peak Load Reduction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External solar shading</td>
                      <td className="border border-white/10 px-3 py-2">Prevents solar gain entering</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Night purge ventilation</td>
                      <td className="border border-white/10 px-3 py-2">Pre-cools thermal mass</td>
                      <td className="border border-white/10 px-3 py-2">20-40%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Exposed thermal mass</td>
                      <td className="border border-white/10 px-3 py-2">Absorbs peak gains</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Solar control glazing</td>
                      <td className="border border-white/10 px-3 py-2">Reduces transmitted radiation</td>
                      <td className="border border-white/10 px-3 py-2">20-35%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Green roofs/walls</td>
                      <td className="border border-white/10 px-3 py-2">Evaporative cooling, insulation</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Solar Shading Design</p>
              <div className="text-sm space-y-2">
                <p><strong>South facades:</strong> Horizontal overhangs or brise-soleil - effective against high summer sun</p>
                <p><strong>East/West facades:</strong> Vertical fins or adjustable louvres - needed for low-angle sun</p>
                <p><strong>Sizing rule:</strong> Overhang depth = window height × (1 / tan(summer sun altitude))</p>
                <p><strong>Example:</strong> 1.5m high window at 52°N latitude, June noon sun at 62°</p>
                <p className="font-mono bg-black/30 p-2 rounded">Overhang = 1.5 / tan(62°) = 1.5 / 1.88 = 0.8m projection</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Phase Change Materials (PCMs)</p>
              <p className="text-sm text-white/90">
                PCMs (typically paraffin waxes or salt hydrates) melt at around 21-25°C, absorbing significant latent heat without temperature rise. When incorporated into ceiling tiles, plasterboard, or dedicated panels, PCMs provide thermal mass equivalent to much heavier concrete. Particularly valuable in lightweight construction where traditional thermal mass is impractical. PCM systems can absorb 100-200 Wh/m² of ceiling area.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Services integration:</strong> Passive cooling strategies significantly reduce chiller sizing. A well-designed passive office in the UK may need only 40-60 W/m² cooling capacity versus 80-120 W/m² for a conventional air-conditioned building.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Daylight Factor Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate average daylight factor for a 6m × 8m office with a south-facing window 4m wide × 1.8m high, head height 2.7m from floor.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Simplified average daylight factor formula:</p>
                <p className="mt-2">DF = (Aw × T × θ) / (A × (1 - R²))</p>
                <p className="mt-2 text-white/60">Where:</p>
                <p className="ml-4">Aw = Window area = 4 × 1.8 = 7.2 m²</p>
                <p className="ml-4">T = Glass transmittance = 0.7 (double glazed)</p>
                <p className="ml-4">θ = Angle of visible sky = 0.5 (assume 50% unobstructed)</p>
                <p className="ml-4">A = Total room surface area = 2(6×8) + 2(6×3) + 2(8×3) = 180 m²</p>
                <p className="ml-4">R = Average surface reflectance = 0.5</p>
                <p className="mt-2">DF = (7.2 × 0.7 × 0.5) / (180 × (1 - 0.25))</p>
                <p className="ml-4">= 2.52 / 135 = 0.019 = 1.9%</p>
                <p className="mt-2 text-white/60">Daylit depth check: 2.5 × 2.7m = 6.75m (adequate for 6m room depth)</p>
                <p className="mt-2 text-green-400">Result: DF ~2% meets minimum; supplementary artificial lighting needed for task areas</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Natural Ventilation Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size openings for stack ventilation in a 4m high atrium serving offices with 50 occupants requiring 10 l/s per person.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Required ventilation rate:</p>
                <p className="ml-4">Q = 50 × 10 l/s = 500 l/s = 0.5 m³/s</p>
                <p className="mt-2">Stack effect formula rearranged for area:</p>
                <p className="ml-4">A = Q / (Cd × √(2gHΔT/Tavg))</p>
                <p className="mt-2 text-white/60">Assumptions:</p>
                <p className="ml-4">H = 4m (height difference)</p>
                <p className="ml-4">ΔT = 3°C (internal-external difference)</p>
                <p className="ml-4">Tavg = 293K (20°C average)</p>
                <p className="ml-4">Cd = 0.6</p>
                <p className="mt-2">A = 0.5 / (0.6 × √(2 × 9.81 × 4 × 3 / 293))</p>
                <p className="ml-4">= 0.5 / (0.6 × √(0.804))</p>
                <p className="ml-4">= 0.5 / (0.6 × 0.897)</p>
                <p className="ml-4">= 0.5 / 0.538 = 0.93 m²</p>
                <p className="mt-2 text-green-400">Result: Minimum 0.93 m² free opening area at both inlet and outlet</p>
                <p className="text-white/60 mt-1">Specify 1.2 m² to allow for reduced ΔT conditions</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Thermal Mass Night Cooling Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Assess thermal mass capacity of exposed 200mm concrete soffit in a 100m² office to absorb next-day heat gains.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Thermal storage capacity:</p>
                <p className="ml-4">Q = m × c × ΔT</p>
                <p className="mt-2 text-white/60">Parameters:</p>
                <p className="ml-4">Concrete density = 2400 kg/m³</p>
                <p className="ml-4">Specific heat = 1000 J/kgK</p>
                <p className="ml-4">Effective depth = 75mm (first 75mm participates in diurnal cycle)</p>
                <p className="ml-4">Temperature swing = 4°C (assumed)</p>
                <p className="mt-2">Mass participating:</p>
                <p className="ml-4">m = 100 m² × 0.075m × 2400 kg/m³ = 18,000 kg</p>
                <p className="mt-2">Heat storage:</p>
                <p className="ml-4">Q = 18,000 × 1000 × 4 = 72,000,000 J = 72 MJ</p>
                <p className="ml-4">= 72 MJ / 3.6 = 20 kWh</p>
                <p className="mt-2">Heat absorption rate (over 8-hour day):</p>
                <p className="ml-4">= 20 kWh / 8h = 2.5 kW = 25 W/m²</p>
                <p className="mt-2 text-green-400">Result: Soffit can absorb 25 W/m² of heat gains - significant contribution to cooling</p>
                <p className="text-white/60 mt-1">Combined with 35 W/m² internal gains = substantial peak reduction</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Passive Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Analyse site orientation and optimise building position for solar access</li>
                <li className="pl-1">Design narrow floor plates (≤15m) to enable cross-ventilation</li>
                <li className="pl-1">Maximise south-facing glazing with appropriate shading</li>
                <li className="pl-1">Minimise west-facing glazing or provide robust shading</li>
                <li className="pl-1">Expose thermal mass internally (avoid suspended ceilings where possible)</li>
                <li className="pl-1">Provide openable windows/vents for natural ventilation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Daylight factor targets: <strong>2% minimum, 5% for task areas</strong></li>
                <li className="pl-1">Daylit depth: <strong>1.5-2.5 × window head height</strong></li>
                <li className="pl-1">Cross-ventilation depth: <strong>≤5 × ceiling height</strong></li>
                <li className="pl-1">Night purge rate: <strong>6-10 ACH for 4-8 hours</strong></li>
                <li className="pl-1">Effective thermal mass depth: <strong>~75mm for diurnal cycle</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Suspended ceilings hiding thermal mass</strong> - coordinate with acoustics early</li>
                <li className="pl-1"><strong>Relying on internal blinds for solar control</strong> - heat already inside</li>
                <li className="pl-1"><strong>Deep floor plates without toplighting</strong> - creates permanently dark cores</li>
                <li className="pl-1"><strong>Ignoring security/weather for night ventilation</strong> - openings must be secure and rain-proof</li>
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
                <p className="font-medium text-white mb-1">Passive Design Hierarchy</p>
                <ul className="space-y-0.5">
                  <li>1. Reduce demand (fabric, orientation)</li>
                  <li>2. Passive heating/cooling (sun, mass, ventilation)</li>
                  <li>3. Efficient active systems (if needed)</li>
                  <li>4. Renewable supply (PV, heat pumps)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Services Impact</p>
                <ul className="space-y-0.5">
                  <li>Cooling load reduction: 30-50%</li>
                  <li>Lighting energy savings: 40-60%</li>
                  <li>Smaller plant rooms and risers</li>
                  <li>Requires BMS integration for control</li>
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
            <Link to="../h-n-c-module6-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section6-2">
              Next: Active Systems Integration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section6_1;
