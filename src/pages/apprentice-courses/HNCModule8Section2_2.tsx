import { ArrowLeft, Box, CheckCircle, Wind, Thermometer, Filter, Volume2, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Air Handling Units - HNC Module 8 Section 2.2";
const DESCRIPTION = "Master air handling unit design and selection: AHU components, configurations, heating and cooling coil selection, filtration grades (G4, F7, F9, HEPA), acoustic considerations and electrical requirements for building services ventilation systems.";

const quickCheckQuestions = [
  {
    id: "ahu-component-sequence",
    question: "In a typical AHU, what is the correct sequence of components from inlet to outlet?",
    options: ["Fan, filter, coils, damper", "Damper, filter, coils, fan", "Filter, damper, fan, coils", "Coils, filter, damper, fan"],
    correctIndex: 1,
    explanation: "The standard AHU component sequence is: inlet damper (for air control and isolation), filter section (to protect coils and improve air quality), heating/cooling coils (for temperature conditioning), then the supply fan (to distribute conditioned air). This sequence ensures the fan handles clean, conditioned air."
  },
  {
    id: "filter-grade-selection",
    question: "Which filter grade combination would be appropriate for a hospital operating theatre?",
    options: ["G4 only", "G4 pre-filter with F7 main filter", "G4 pre-filter, F7 intermediate, HEPA terminal", "F7 only"],
    correctIndex: 2,
    explanation: "Operating theatres require multi-stage filtration: G4 pre-filter to remove coarse particles and protect subsequent stages, F7 intermediate filter for fine particles, and HEPA terminal filters (H13 or H14) to achieve the required air cleanliness. This achieves ISO Class 5 or better air quality."
  },
  {
    id: "coil-selection-factor",
    question: "When selecting a cooling coil, what is the primary factor that determines the coil face velocity?",
    options: ["Refrigerant type", "Air volume flow rate and coil face area", "Pipe material", "Insulation thickness"],
    correctIndex: 1,
    explanation: "Coil face velocity is calculated by dividing the air volume flow rate by the coil face area (V = Q/A). Typical face velocities are 2.0-2.5 m/s for cooling coils to ensure adequate heat transfer whilst avoiding moisture carryover. Higher velocities increase pressure drop and risk condensate entrainment."
  },
  {
    id: "acoustic-attenuation",
    question: "What is the primary purpose of attenuators in an AHU system?",
    options: ["To increase airflow velocity", "To filter particles from the air", "To reduce noise transmission through ductwork", "To balance air distribution"],
    correctIndex: 2,
    explanation: "Attenuators (silencers) reduce noise transmission through the ductwork system. They typically use acoustic absorption materials to attenuate fan noise and prevent it from reaching occupied spaces. Selection is based on required noise reduction across frequency bands and acceptable pressure drop."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which component in an AHU controls the proportion of fresh air to recirculated air?",
    options: [
      "Supply fan",
      "Mixing dampers",
      "Heating coil",
      "Filter section"
    ],
    correctAnswer: 1,
    explanation: "Mixing dampers control the proportion of fresh (outside) air to recirculated (return) air. They work in conjunction with each other - as fresh air dampers open, recirculation dampers close proportionally. This enables economiser control for free cooling when outside conditions are suitable."
  },
  {
    id: 2,
    question: "What is the typical face velocity range for a heating coil in an AHU?",
    options: [
      "0.5-1.0 m/s",
      "1.5-2.0 m/s",
      "2.5-3.5 m/s",
      "4.0-5.0 m/s"
    ],
    correctAnswer: 2,
    explanation: "Heating coils typically operate at face velocities of 2.5-3.5 m/s. Unlike cooling coils, there is no moisture carryover concern, so slightly higher velocities are acceptable. However, excessive velocity increases pressure drop and can cause noise issues."
  },
  {
    id: 3,
    question: "A G4 filter is classified as which type?",
    options: [
      "HEPA filter",
      "Coarse filter",
      "Fine filter",
      "Ultra-fine filter"
    ],
    correctAnswer: 1,
    explanation: "G4 is classified as a coarse filter under EN ISO 16890 (replacing the older EN 779 standard). G-class filters (G1-G4) are coarse filters used as pre-filters to protect more efficient downstream filters and HVAC equipment from larger particles."
  },
  {
    id: 4,
    question: "What is the primary purpose of a droplet eliminator after a cooling coil?",
    options: [
      "To increase cooling capacity",
      "To prevent condensate carryover into the ductwork",
      "To reduce fan power consumption",
      "To improve filtration efficiency"
    ],
    correctAnswer: 1,
    explanation: "Droplet eliminators (also called moisture eliminators) prevent condensate droplets from being carried into the supply ductwork. They are essential after cooling coils operating below the dew point, as water carryover can cause duct corrosion, microbial growth, and water damage."
  },
  {
    id: 5,
    question: "Which AHU configuration is most appropriate for a building requiring close temperature and humidity control?",
    options: [
      "Single duct constant volume",
      "Variable air volume (VAV)",
      "Dual duct",
      "Heat recovery only"
    ],
    correctAnswer: 2,
    explanation: "Dual duct systems provide hot and cold air streams that are mixed at zone level, offering excellent temperature control. They are particularly suited to applications requiring precise conditions, such as laboratories or museums, though they have higher capital and energy costs."
  },
  {
    id: 6,
    question: "What minimum filter efficiency is typically required for supply air to general office spaces?",
    options: [
      "G4 (coarse)",
      "F7 (fine)",
      "H13 (HEPA)",
      "No filtration required"
    ],
    correctAnswer: 1,
    explanation: "F7 filters (ePM1 50-65% under ISO 16890) are typically specified for office and commercial spaces. They provide good protection against fine particles and allergens whilst maintaining reasonable pressure drop. G4 pre-filters extend F7 filter life."
  },
  {
    id: 7,
    question: "When specifying the electrical supply for an AHU, what factor primarily determines motor starter type?",
    options: [
      "Filter type",
      "Motor power rating",
      "Ductwork material",
      "Building height"
    ],
    correctAnswer: 1,
    explanation: "Motor power rating is the primary factor in starter selection. Small motors (&lt;7.5 kW) typically use DOL starters, medium motors may use star-delta starters, and larger motors often require soft starters or VSDs to limit starting current and mechanical stress."
  },
  {
    id: 8,
    question: "What is the typical sound power level reduction expected from a standard rectangular attenuator?",
    options: [
      "5-10 dB",
      "15-25 dB",
      "35-45 dB",
      "50-60 dB"
    ],
    correctAnswer: 1,
    explanation: "Standard rectangular attenuators typically achieve 15-25 dB sound power level reduction, depending on length, splitter spacing, and frequency. Multiple attenuators or longer units may be needed for critical applications. Selection must balance acoustic performance against pressure drop."
  },
  {
    id: 9,
    question: "What is the primary advantage of a draw-through AHU configuration compared to blow-through?",
    options: [
      "Lower capital cost",
      "Better filter access",
      "Fan motor heat added after coils does not affect supply temperature",
      "Smaller footprint"
    ],
    correctAnswer: 2,
    explanation: "In draw-through configuration, the fan is located downstream of the coils, so fan motor heat (typically 2-3°C rise) is added to already conditioned air. This must be accounted for in coil sizing. Blow-through places the fan before coils, avoiding this issue but requiring more robust filters."
  },
  {
    id: 10,
    question: "Which control strategy optimises AHU energy consumption by using outdoor air for cooling when conditions permit?",
    options: [
      "Night setback",
      "Economiser control",
      "Demand control ventilation",
      "Zone reset"
    ],
    correctAnswer: 1,
    explanation: "Economiser control (free cooling) uses outdoor air for cooling when the outside temperature and humidity are suitable, reducing mechanical cooling load. Mixed air dampers modulate to introduce maximum fresh air when outdoor conditions are favourable, significantly reducing energy consumption."
  },
  {
    id: 11,
    question: "What document must be provided for AHU commissioning to verify system performance?",
    options: [
      "Only the manufacturer's brochure",
      "Design data including air volumes, pressures, temperatures and electrical loads",
      "Just the installation manual",
      "Building regulations approval only"
    ],
    correctAnswer: 1,
    explanation: "Commissioning requires comprehensive design data including design air volumes, system pressures (fan total pressure, component pressure drops), design temperatures (on/off coils), electrical loads, and noise criteria. This enables verification that installed performance matches design intent."
  },
  {
    id: 12,
    question: "What is the typical maintenance interval for replacing F7 filters in a commercial AHU?",
    options: [
      "Monthly",
      "Quarterly",
      "6-12 months depending on loading",
      "Every 5 years"
    ],
    correctAnswer: 2,
    explanation: "F7 filters typically require replacement every 6-12 months, depending on air quality, operating hours, and filter loading. Differential pressure monitoring indicates when filters approach their final pressure drop limit and require replacement. Pre-filters extend main filter life."
  }
];

const faqs = [
  {
    question: "What is the difference between draw-through and blow-through AHU configurations?",
    answer: "In a draw-through configuration, air is pulled through the filter and coil sections by the fan located downstream. This means the coil section is under negative pressure. In blow-through, the fan pushes air through the components. Draw-through is more common as it provides even airflow across coils, but the fan motor heat is added to supply air. Blow-through keeps motor heat separate but requires more robust filter frames to handle positive pressure."
  },
  {
    question: "How do I select the correct filter grades for my application?",
    answer: "Filter selection depends on the application and air quality requirements. General ventilation uses G4 pre-filter with F7 main filter. Healthcare requires F7 with potential HEPA terminals. Cleanrooms need HEPA or ULPA filters. Always use pre-filters to protect expensive fine filters. Consider pressure drop impact on fan energy and maintenance access for filter replacement when selecting housing size."
  },
  {
    question: "What electrical supplies and controls are typically required for an AHU?",
    answer: "AHUs require electrical supplies for fans (largest load), damper actuators (typically 24V AC or 230V), control panel, sensors, and potentially electric heaters. The control panel houses motor starters/VSDs, BMS interface, safety interlocks, and protection devices. Three-phase supply is common for larger fans. Provision for differential pressure switches, temperature sensors, and fire/smoke detection is essential."
  },
  {
    question: "Why is acoustic treatment important in AHU design?",
    answer: "AHU fans generate significant noise across a range of frequencies. Without attenuation, this noise transmits through ductwork to occupied spaces, causing discomfort and failing to meet building regulations (Approved Document E) or BREEAM requirements. Attenuators, acoustic lining, and anti-vibration mounts are essential. Breakout noise from AHU casings and ductwork must also be considered, particularly for plant rooms adjacent to occupied spaces."
  },
  {
    question: "How is cooling coil capacity calculated?",
    answer: "Cooling coil capacity is determined by the air volume flow rate and required temperature drop, using Q = m × Cp × ΔT for sensible cooling. For dehumidification, latent heat removal must also be calculated. Coil selection considers face velocity (typically 2.0-2.5 m/s), rows depth, fin spacing, and water flow rate. Manufacturers' selection software calculates performance for specific coil geometries and operating conditions."
  },
  {
    question: "What commissioning tests are required for AHUs?",
    answer: "AHU commissioning includes: verifying air volume flow rates match design, measuring fan total pressure and comparing to design, checking coil on/off temperatures and capacities, confirming filter pressure drops, testing all safety interlocks (fire dampers, smoke detection, frost protection), verifying control sequences operate correctly, measuring electrical loads, and conducting noise surveys. Results are recorded on commissioning sheets and included in O&M documentation."
  }
];

const HNCModule8Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section2">
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
            <Box className="h-4 w-4" />
            <span>Module 8.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Air Handling Units
          </h1>
          <p className="text-white/80">
            AHU components, configurations, coil selection, filtration and acoustic considerations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Components:</strong> Dampers, filters, coils, fans, attenuators</li>
              <li className="pl-1"><strong>Configurations:</strong> Draw-through, blow-through, modular</li>
              <li className="pl-1"><strong>Filtration:</strong> G4 coarse, F7 fine, HEPA for critical</li>
              <li className="pl-1"><strong>Electrical:</strong> VSDs, BMS integration, safety interlocks</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Selection:</strong> Based on air volume, heating/cooling loads</li>
              <li className="pl-1"><strong>Acoustics:</strong> Attenuators critical for occupied spaces</li>
              <li className="pl-1"><strong>Controls:</strong> Economiser, demand ventilation, frost protection</li>
              <li className="pl-1"><strong>Compliance:</strong> Part L energy, Part F ventilation rates</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify and explain the function of all AHU components",
              "Select appropriate filter grades for different applications",
              "Understand heating and cooling coil selection criteria",
              "Specify acoustic treatment for noise control",
              "Design electrical supplies and control systems for AHUs",
              "Commission and verify AHU performance against design data"
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

        {/* Section 1: AHU Components */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            AHU Components and Functions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Air Handling Units (AHUs) are factory-assembled enclosures containing components
              to condition and distribute air for heating, ventilation and air conditioning
              systems. Understanding each component's function is essential for proper selection,
              installation and maintenance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Primary AHU Components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Intake/mixing section:</strong> Fresh air inlet with weather louvres, mixing dampers for recirculated air</li>
                <li className="pl-1"><strong>Filter section:</strong> Pre-filters (G4) and main filters (F7/F9) to remove airborne particles</li>
                <li className="pl-1"><strong>Heating coil:</strong> LTHW, steam, or electric heater battery for air heating</li>
                <li className="pl-1"><strong>Cooling coil:</strong> Chilled water or DX refrigerant coil for cooling and dehumidification</li>
                <li className="pl-1"><strong>Humidifier:</strong> Steam injection or evaporative humidifier for moisture addition</li>
                <li className="pl-1"><strong>Supply fan:</strong> Centrifugal or plug fan to deliver air at required volume and pressure</li>
                <li className="pl-1"><strong>Attenuators:</strong> Acoustic silencers to reduce noise transmission</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Component Arrangement - Typical Sequence</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Position</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">Intake louvre/damper</td>
                      <td className="border border-white/10 px-3 py-2">Weather protection, isolation, air volume control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Mixing box</td>
                      <td className="border border-white/10 px-3 py-2">Blend fresh and recirculated air</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">Pre-filter (G4)</td>
                      <td className="border border-white/10 px-3 py-2">Remove coarse particles, protect main filter</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Heating coil</td>
                      <td className="border border-white/10 px-3 py-2">Pre-heat (frost protection), main heating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Cooling coil</td>
                      <td className="border border-white/10 px-3 py-2">Sensible and latent cooling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">Droplet eliminator</td>
                      <td className="border border-white/10 px-3 py-2">Prevent condensate carryover</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7</td>
                      <td className="border border-white/10 px-3 py-2">Main filter (F7)</td>
                      <td className="border border-white/10 px-3 py-2">Fine particle filtration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">Supply fan</td>
                      <td className="border border-white/10 px-3 py-2">Air movement at design volume/pressure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">9</td>
                      <td className="border border-white/10 px-3 py-2">Attenuator</td>
                      <td className="border border-white/10 px-3 py-2">Noise reduction before distribution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Damper Types and Applications</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/80">Volume Control Dampers:</p>
                  <ul className="text-white/70 space-y-1 mt-2">
                    <li>• Opposed blade - linear characteristic</li>
                    <li>• Parallel blade - quick acting</li>
                    <li>• Modulating for flow control</li>
                    <li>• Two-position for isolation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/80">Fire and Smoke Dampers:</p>
                  <ul className="text-white/70 space-y-1 mt-2">
                    <li>• Fire dampers - fusible link/motorised</li>
                    <li>• Smoke dampers - BMS controlled</li>
                    <li>• Combined fire/smoke dampers</li>
                    <li>• Require regular testing (6/12 monthly)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> AHU component arrangement affects performance and maintenance. Ensure adequate access for filter changes, coil cleaning, and fan belt adjustment. Minimum 600mm clear space is required for service access.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Heating and Cooling Coils */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Heating and Cooling Coil Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Coil selection is critical to AHU performance. Heating and cooling coils must be
              sized to meet design loads whilst maintaining acceptable face velocities and
              pressure drops. Understanding coil characteristics enables optimal selection.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Heating Coils</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">LTHW (low temperature hot water) most common</li>
                  <li className="pl-1">Typical flow temperature: 70-80°C</li>
                  <li className="pl-1">Face velocity: 2.5-3.5 m/s acceptable</li>
                  <li className="pl-1">Steam coils for rapid response</li>
                  <li className="pl-1">Electric heaters for small loads/no pipework</li>
                  <li className="pl-1">Frost coil for outdoor air pre-heat</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cooling Coils</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Chilled water (CHW) most common</li>
                  <li className="pl-1">Typical flow temperature: 6-12°C</li>
                  <li className="pl-1">Face velocity: 2.0-2.5 m/s maximum</li>
                  <li className="pl-1">Direct expansion (DX) for smaller units</li>
                  <li className="pl-1">Condensate drainage essential</li>
                  <li className="pl-1">Droplet eliminator required below dew point</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coil Selection Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Heating Coil</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cooling Coil</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Face velocity</td>
                      <td className="border border-white/10 px-3 py-2">2.5-3.5 m/s</td>
                      <td className="border border-white/10 px-3 py-2">2.0-2.5 m/s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rows typical</td>
                      <td className="border border-white/10 px-3 py-2">1-2 rows</td>
                      <td className="border border-white/10 px-3 py-2">4-8 rows</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fin spacing</td>
                      <td className="border border-white/10 px-3 py-2">2.5-4 fins/cm</td>
                      <td className="border border-white/10 px-3 py-2">3-5 fins/cm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pressure drop (air)</td>
                      <td className="border border-white/10 px-3 py-2">50-100 Pa</td>
                      <td className="border border-white/10 px-3 py-2">100-200 Pa</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Water velocity</td>
                      <td className="border border-white/10 px-3 py-2">0.5-1.5 m/s</td>
                      <td className="border border-white/10 px-3 py-2">0.5-1.5 m/s</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coil Capacity Calculation</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Sensible heat transfer:</p>
                <p>Q = m × Cp × ΔT</p>
                <p className="mt-2">Where:</p>
                <p>Q = Heat transfer rate (kW)</p>
                <p>m = Mass flow rate of air (kg/s)</p>
                <p>Cp = Specific heat capacity (1.02 kJ/kg·K for air)</p>
                <p>ΔT = Temperature difference (K or °C)</p>
                <p className="mt-2 text-white/60">Example: 2.5 m³/s at 1.2 kg/m³, heating from 10°C to 20°C</p>
                <p>m = 2.5 × 1.2 = 3.0 kg/s</p>
                <p>Q = 3.0 × 1.02 × 10 = 30.6 kW</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Critical Design Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Frost protection:</strong> Pre-heat coil or face/bypass damper for sub-zero outdoor air</li>
                <li className="pl-1"><strong>Condensate:</strong> Cooling coils must drain to trapped condensate line</li>
                <li className="pl-1"><strong>Carryover:</strong> Keep cooling coil face velocity &lt;2.5 m/s to prevent droplet carryover</li>
                <li className="pl-1"><strong>Control valves:</strong> Size for design flow with authority &gt;0.5</li>
                <li className="pl-1"><strong>Water treatment:</strong> Essential to prevent coil fouling and corrosion</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection tip:</strong> Use manufacturer's selection software for accurate coil sizing. Input design conditions and verify that selected coil meets duty within acceptable pressure drop limits for both air and water sides.
            </p>
          </div>
        </section>

        {/* Section 3: Filtration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Filtration Systems and Filter Grades
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Air filtration protects building occupants, maintains indoor air quality, and
              preserves HVAC equipment. Filter selection depends on application requirements,
              with multi-stage filtration providing optimal performance and economy.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Filter Classifications (EN ISO 16890)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Old Class</th>
                      <th className="border border-white/10 px-3 py-2 text-left">ISO 16890</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">G4</td>
                      <td className="border border-white/10 px-3 py-2">ISO Coarse &gt;50%</td>
                      <td className="border border-white/10 px-3 py-2">Coarse</td>
                      <td className="border border-white/10 px-3 py-2">Pre-filter, equipment protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">F7</td>
                      <td className="border border-white/10 px-3 py-2">ePM1 50-65%</td>
                      <td className="border border-white/10 px-3 py-2">Fine</td>
                      <td className="border border-white/10 px-3 py-2">Offices, retail, general HVAC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">F9</td>
                      <td className="border border-white/10 px-3 py-2">ePM1 &gt;80%</td>
                      <td className="border border-white/10 px-3 py-2">Fine</td>
                      <td className="border border-white/10 px-3 py-2">Healthcare, laboratories</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">H13</td>
                      <td className="border border-white/10 px-3 py-2">HEPA 99.95%</td>
                      <td className="border border-white/10 px-3 py-2">HEPA</td>
                      <td className="border border-white/10 px-3 py-2">Operating theatres, cleanrooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">H14</td>
                      <td className="border border-white/10 px-3 py-2">HEPA 99.995%</td>
                      <td className="border border-white/10 px-3 py-2">HEPA</td>
                      <td className="border border-white/10 px-3 py-2">Pharmaceutical, aseptic areas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Multi-Stage Filtration Strategy</p>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-white font-medium mb-1">Stage 1: Pre-filter</p>
                  <ul className="text-white/70 space-y-1">
                    <li>• G4 panel or bag filter</li>
                    <li>• Removes coarse particles (&gt;10μm)</li>
                    <li>• Protects main filter</li>
                    <li>• Low cost, easy replacement</li>
                    <li>• Change every 1-3 months</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Stage 2: Main Filter</p>
                  <ul className="text-white/70 space-y-1">
                    <li>• F7 or F9 bag/compact filter</li>
                    <li>• Removes fine particles (1-10μm)</li>
                    <li>• Main air quality protection</li>
                    <li>• Higher cost, longer life</li>
                    <li>• Change every 6-12 months</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Stage 3: Final Filter</p>
                  <ul className="text-white/70 space-y-1">
                    <li>• HEPA terminal filter</li>
                    <li>• Removes ultrafine particles</li>
                    <li>• Critical applications only</li>
                    <li>• Highest cost</li>
                    <li>• Change every 2-5 years</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Application Filter Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Pre-filter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Main Filter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Terminal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office/retail</td>
                      <td className="border border-white/10 px-3 py-2">G4</td>
                      <td className="border border-white/10 px-3 py-2">F7</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital wards</td>
                      <td className="border border-white/10 px-3 py-2">G4</td>
                      <td className="border border-white/10 px-3 py-2">F7/F9</td>
                      <td className="border border-white/10 px-3 py-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Operating theatre</td>
                      <td className="border border-white/10 px-3 py-2">G4</td>
                      <td className="border border-white/10 px-3 py-2">F9</td>
                      <td className="border border-white/10 px-3 py-2">H13/H14</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cleanroom ISO 7</td>
                      <td className="border border-white/10 px-3 py-2">G4</td>
                      <td className="border border-white/10 px-3 py-2">F9</td>
                      <td className="border border-white/10 px-3 py-2">H13</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cleanroom ISO 5</td>
                      <td className="border border-white/10 px-3 py-2">G4</td>
                      <td className="border border-white/10 px-3 py-2">F9</td>
                      <td className="border border-white/10 px-3 py-2">H14/ULPA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Filter Pressure Drop Monitoring</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Initial pressure drop:</strong> Clean filter pressure drop at design velocity</li>
                <li className="pl-1"><strong>Final pressure drop:</strong> Maximum allowable before replacement (typically 2-3× initial)</li>
                <li className="pl-1"><strong>Differential pressure switch:</strong> Provides alarm when filter approaches final pressure drop</li>
                <li className="pl-1"><strong>BMS integration:</strong> Continuous monitoring enables predictive maintenance</li>
                <li className="pl-1"><strong>Energy impact:</strong> Dirty filters increase fan energy consumption significantly</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance note:</strong> Filter replacement is a significant operational cost. Using pre-filters extends main filter life by 50% or more. Always replace pre-filters before they become fully loaded to protect downstream components.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Acoustic Considerations and Electrical Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Acoustic Treatment and Electrical Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              AHU acoustic treatment and electrical systems are essential for occupant comfort
              and reliable operation. Noise control must be designed holistically, considering
              all transmission paths. Electrical systems must provide safe, efficient power
              distribution with appropriate controls.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Acoustic Treatment Components</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Function</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Attenuation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rectangular attenuator</td>
                      <td className="border border-white/10 px-3 py-2">Ductwork noise reduction</td>
                      <td className="border border-white/10 px-3 py-2">15-25 dB (frequency dependent)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circular attenuator</td>
                      <td className="border border-white/10 px-3 py-2">Spigot/branch attenuation</td>
                      <td className="border border-white/10 px-3 py-2">10-20 dB</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Acoustic lining</td>
                      <td className="border border-white/10 px-3 py-2">Ductwork internal absorption</td>
                      <td className="border border-white/10 px-3 py-2">3-10 dB per metre</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flexible connection</td>
                      <td className="border border-white/10 px-3 py-2">Vibration isolation</td>
                      <td className="border border-white/10 px-3 py-2">Structure-borne break</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Anti-vibration mounts</td>
                      <td className="border border-white/10 px-3 py-2">Fan/motor isolation</td>
                      <td className="border border-white/10 px-3 py-2">85-95% vibration reduction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Noise Transmission Paths</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/80">Airborne Paths:</p>
                  <ul className="text-white/70 space-y-1 mt-2">
                    <li>• Supply ductwork to diffusers</li>
                    <li>• Return ductwork from grilles</li>
                    <li>• AHU casing breakout</li>
                    <li>• Ductwork breakout through walls</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/80">Structure-borne Paths:</p>
                  <ul className="text-white/70 space-y-1 mt-2">
                    <li>• Fan vibration through mounts</li>
                    <li>• Ductwork connections</li>
                    <li>• Pipework connections</li>
                    <li>• Building structure transmission</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">AHU Electrical Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Supply</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply fan motor</td>
                      <td className="border border-white/10 px-3 py-2">400V 3-phase</td>
                      <td className="border border-white/10 px-3 py-2">Largest electrical load, VSD recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Extract fan motor</td>
                      <td className="border border-white/10 px-3 py-2">400V 3-phase</td>
                      <td className="border border-white/10 px-3 py-2">VSD for VAV systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control panel</td>
                      <td className="border border-white/10 px-3 py-2">230V single-phase</td>
                      <td className="border border-white/10 px-3 py-2">BMS interface, safety circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Damper actuators</td>
                      <td className="border border-white/10 px-3 py-2">24V AC or 230V</td>
                      <td className="border border-white/10 px-3 py-2">Spring-return for fire dampers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electric heater</td>
                      <td className="border border-white/10 px-3 py-2">400V 3-phase</td>
                      <td className="border border-white/10 px-3 py-2">SCR control, airflow interlock required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Humidifier</td>
                      <td className="border border-white/10 px-3 py-2">400V 3-phase</td>
                      <td className="border border-white/10 px-3 py-2">Steam generator has high power demand</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Panel Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white font-medium mb-1">Power Components</p>
                  <ul className="text-white/80 space-y-1">
                    <li>• Main isolator (lockable)</li>
                    <li>• Motor starters or VSDs</li>
                    <li>• Motor protection (overload, phase loss)</li>
                    <li>• Control circuit transformer</li>
                    <li>• Circuit breakers for auxiliaries</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Control Components</p>
                  <ul className="text-white/80 space-y-1">
                    <li>• BMS interface (BACnet/Modbus)</li>
                    <li>• Safety interlock relay</li>
                    <li>• Fire alarm interface</li>
                    <li>• Differential pressure switches</li>
                    <li>• Temperature sensors/transmitters</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Interlocks Required</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Airflow proving:</strong> Electric heater disabled without adequate airflow</li>
                <li className="pl-1"><strong>Frost protection:</strong> Coil frost stat stops fan, opens LTHW valve</li>
                <li className="pl-1"><strong>Fire alarm:</strong> Fans stop, fire dampers close on fire signal</li>
                <li className="pl-1"><strong>Smoke detection:</strong> Duct smoke detectors stop AHU</li>
                <li className="pl-1"><strong>Filter alarm:</strong> High differential pressure indicates blocked filter</li>
                <li className="pl-1"><strong>Motor protection:</strong> Overload and phase failure protection</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">VSD Benefits for AHU Fans</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energy savings:</strong> Fan power varies with cube of speed (affinity laws)</li>
                <li className="pl-1"><strong>Soft start:</strong> Reduced mechanical stress, no starting current surge</li>
                <li className="pl-1"><strong>Precise control:</strong> Maintain duct pressure or CO₂ setpoint</li>
                <li className="pl-1"><strong>Noise reduction:</strong> Lower speed = lower noise</li>
                <li className="pl-1"><strong>Extended belt life:</strong> Gradual acceleration reduces wear</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Commissioning requirement:</strong> All safety interlocks must be tested and witnessed during commissioning. Document test results including: fire alarm response, frost stat operation, filter pressure switch setpoints, and motor protection settings.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* AHU Configurations Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">AHU Configurations</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Draw-Through vs Blow-Through</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white font-medium mb-1">Draw-Through Configuration</p>
                  <ul className="text-white/80 space-y-1">
                    <li>• Fan downstream of coils/filters</li>
                    <li>• Coil section under negative pressure</li>
                    <li>• More even airflow across coil face</li>
                    <li>• Fan motor heat added to supply air</li>
                    <li>• Most common configuration</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Blow-Through Configuration</p>
                  <ul className="text-white/80 space-y-1">
                    <li>• Fan upstream of coils/filters</li>
                    <li>• Coil section under positive pressure</li>
                    <li>• Fan heat absorbed by coils</li>
                    <li>• Requires stronger filter frames</li>
                    <li>• Used where precise temperature control needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">System Types</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Constant Volume (CAV)</td>
                      <td className="border border-white/10 px-3 py-2">Fixed airflow, variable temperature</td>
                      <td className="border border-white/10 px-3 py-2">Single zone, simple requirements</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Variable Air Volume (VAV)</td>
                      <td className="border border-white/10 px-3 py-2">Variable airflow via terminal boxes</td>
                      <td className="border border-white/10 px-3 py-2">Multi-zone offices, energy efficient</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dual Duct</td>
                      <td className="border border-white/10 px-3 py-2">Separate hot and cold ducts, zone mixing</td>
                      <td className="border border-white/10 px-3 py-2">Laboratories, precise control needed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multi-zone</td>
                      <td className="border border-white/10 px-3 py-2">Zone dampers at AHU, hot/cold decks</td>
                      <td className="border border-white/10 px-3 py-2">Multiple zones from single AHU</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100% Fresh Air</td>
                      <td className="border border-white/10 px-3 py-2">No recirculation, heat recovery</td>
                      <td className="border border-white/10 px-3 py-2">Laboratories, kitchens, hospitals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Commissioning Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Commissioning Requirements</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Commissioning Checks</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify AHU installation complete and all access panels fitted</li>
                <li className="pl-1">Check filter installation - correct grade, secure fitting, no bypass</li>
                <li className="pl-1">Confirm coil pipework complete, flushed, and filled</li>
                <li className="pl-1">Verify condensate drainage trapped and connected</li>
                <li className="pl-1">Check fan belt tension and alignment</li>
                <li className="pl-1">Confirm all dampers operate freely through full range</li>
                <li className="pl-1">Verify electrical connections complete, correctly phased</li>
                <li className="pl-1">Check anti-vibration mounts and flexible connections</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Tests</h3>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">AHU Commissioning Record</p>
                <p className="mt-2">AHU Reference: _____________ Location: _____________</p>
                <p className="mt-2">Test | Design | Measured | Acceptable</p>
                <p>-----|--------|----------|----------</p>
                <p>Supply air volume (m³/s) | _____ | _____ | ±10%</p>
                <p>Fan total pressure (Pa) | _____ | _____ | ±10%</p>
                <p>Motor current (A) | _____ | _____ | &lt;FLC</p>
                <p>Filter ΔP - clean (Pa) | _____ | _____ | Per spec</p>
                <p>Heating coil on/off (°C) | ___/__ | ___/__ | ±1°C</p>
                <p>Cooling coil on/off (°C) | ___/__ | ___/__ | ±1°C</p>
                <p>Fresh air % | _____ | _____ | Per design</p>
                <p>Noise level (dB(A)) | _____ | _____ | Per spec</p>
                <p className="mt-2 text-white/60">Safety interlocks tested: Fire □ Frost □ Smoke □ Filter □</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Verification Points</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Air volume:</strong> Measure at AHU discharge or key branch take-offs</li>
                <li className="pl-1"><strong>Fan pressure:</strong> Measure total pressure rise across fan</li>
                <li className="pl-1"><strong>Coil performance:</strong> On/off temperatures at design load conditions</li>
                <li className="pl-1"><strong>Control response:</strong> Verify BMS setpoints achieve stable control</li>
                <li className="pl-1"><strong>Noise:</strong> Sound pressure level in nearest occupied space</li>
                <li className="pl-1"><strong>Vibration:</strong> Confirm isolation effective, no transmission</li>
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
                <p className="font-medium text-white mb-1">Filter Grades</p>
                <ul className="space-y-0.5">
                  <li>G4 - Coarse (pre-filter)</li>
                  <li>F7 - Fine (offices, retail)</li>
                  <li>F9 - Very fine (healthcare)</li>
                  <li>H13/H14 - HEPA (theatres, cleanrooms)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Coil Face Velocities</p>
                <ul className="space-y-0.5">
                  <li>Heating coils: 2.5-3.5 m/s</li>
                  <li>Cooling coils: 2.0-2.5 m/s max</li>
                  <li>Higher = more pressure drop</li>
                  <li>Lower = larger coil face area</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Components</p>
                <ul className="space-y-0.5">
                  <li>Dampers (mixing, fire, volume)</li>
                  <li>Filters (multi-stage)</li>
                  <li>Coils (heating, cooling)</li>
                  <li>Fan (supply, extract)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Safety Interlocks</p>
                <ul className="space-y-0.5">
                  <li>Airflow proving (electric heater)</li>
                  <li>Frost protection (coils)</li>
                  <li>Fire alarm interface</li>
                  <li>Smoke detection</li>
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
        <nav className="flex justify-between pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section2_2;
