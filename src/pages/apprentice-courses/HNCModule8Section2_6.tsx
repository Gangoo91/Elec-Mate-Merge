import { ArrowLeft, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "System Balancing - HNC Module 8 Section 2.6";
const DESCRIPTION = "Master air balancing procedures, commissioning processes, performance verification and O&M documentation requirements for ventilation systems in accordance with BSRIA guides.";

const quickCheckQuestions = [
  {
    id: "proportional-balancing",
    question: "In the proportional balancing method, what is the first step after measuring all terminal air flow rates?",
    options: ["Adjust all dampers equally", "Identify the terminal with the lowest percentage of design flow", "Close all dampers fully", "Increase fan speed to maximum"],
    correctIndex: 1,
    explanation: "The proportional balancing method starts by identifying the index terminal - the one with the lowest percentage of design flow. This becomes the reference against which all other terminals are balanced."
  },
  {
    id: "commissioning-sequence",
    question: "According to BSRIA guidelines, when should air balancing be carried out in relation to water system commissioning?",
    options: ["Before water systems are commissioned", "After water systems are commissioned", "Simultaneously with water systems", "Only after the building is occupied"],
    correctIndex: 1,
    explanation: "Air balancing should be carried out after water systems (heating and cooling coils) are commissioned. This ensures that coil capacities are proven before air volumes are finalised, as coil performance affects air-side heat transfer."
  },
  {
    id: "measurement-tolerance",
    question: "What is the typical acceptable tolerance for measured air flow rates compared to design values in commissioning?",
    options: ["+/- 1%", "+/- 5%", "+/- 10%", "+/- 20%"],
    correctIndex: 2,
    explanation: "The industry standard tolerance for air flow measurement during commissioning is typically +/- 10% of design values for individual terminals, with +/- 5% acceptable for main branches and total system air flow."
  },
  {
    id: "om-documentation",
    question: "Which document provides a permanent record of the as-commissioned system performance?",
    options: ["The design specification", "The commissioning certificate", "The O&M manual", "The tender documents"],
    correctIndex: 2,
    explanation: "The O&M (Operation and Maintenance) manual provides a permanent record of as-commissioned performance data. This allows future comparison during maintenance and troubleshooting to identify system degradation or faults."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of air balancing in a ventilation system?",
    options: [
      "To reduce the cost of the installation",
      "To ensure design air flow rates are achieved at all terminals",
      "To maximise fan energy consumption",
      "To eliminate the need for dampers"
    ],
    correctAnswer: 1,
    explanation: "Air balancing ensures that the design air flow rates are achieved at all terminals throughout the system. This is essential for maintaining indoor air quality, thermal comfort, and energy efficiency."
  },
  {
    id: 2,
    question: "Which BSRIA guide specifically covers air distribution system commissioning?",
    options: [
      "BSRIA BG 49 - Commissioning Water Systems",
      "BSRIA BG 29 - Pre-commission Cleaning",
      "BSRIA BG 35/2021 - Commissioning Air Systems",
      "BSRIA BG 2 - Commissioning of Building Services"
    ],
    correctAnswer: 2,
    explanation: "BSRIA BG 35/2021 'Commissioning Air Systems' is the specific guide covering air distribution system commissioning, including balancing procedures, measurement methods, and documentation requirements."
  },
  {
    id: 3,
    question: "What instrument is most commonly used to measure air velocity in ductwork?",
    options: [
      "Manometer",
      "Pitot tube with manometer",
      "Thermometer",
      "Hygrometer"
    ],
    correctAnswer: 1,
    explanation: "A pitot tube connected to a manometer (or digital differential pressure gauge) is the standard method for measuring air velocity in ductwork. It measures the difference between total and static pressure to derive velocity pressure."
  },
  {
    id: 4,
    question: "In proportional balancing, what percentage of design flow should the index terminal achieve before balancing begins?",
    options: [
      "50%",
      "75%",
      "90%",
      "100%"
    ],
    correctAnswer: 3,
    explanation: "The index terminal (lowest percentage of design) should achieve as close to 100% of design flow as possible before balancing other terminals. If it cannot reach 100%, fan speed may need adjustment or system issues investigated."
  },
  {
    id: 5,
    question: "What type of damper is specifically designed for air balancing purposes?",
    options: [
      "Fire damper",
      "Volume control damper (VCD) or balancing damper",
      "Non-return damper",
      "Smoke damper"
    ],
    correctAnswer: 1,
    explanation: "Volume control dampers (VCDs) or balancing dampers are specifically designed for air balancing. They have graduated scales or memory stops to allow accurate setting and future reference during maintenance."
  },
  {
    id: 6,
    question: "What is the purpose of a traverse measurement in ductwork?",
    options: [
      "To measure duct surface temperature",
      "To obtain an accurate average air velocity across the duct cross-section",
      "To check duct insulation thickness",
      "To measure noise levels"
    ],
    correctAnswer: 1,
    explanation: "A traverse measurement involves taking multiple velocity readings across the duct cross-section in a grid pattern. This accounts for the velocity profile (faster in centre, slower near walls) to calculate an accurate average velocity."
  },
  {
    id: 7,
    question: "According to good practice, what minimum straight duct length should precede a measurement point?",
    options: [
      "1-2 duct diameters",
      "5-10 duct diameters",
      "15-20 duct diameters",
      "30 duct diameters"
    ],
    correctAnswer: 1,
    explanation: "A minimum of 5-10 duct diameters of straight duct should precede the measurement point to allow flow to develop a stable profile. Turbulence from bends, transitions, or dampers can significantly affect accuracy."
  },
  {
    id: 8,
    question: "What is the commissioning tolerance typically specified for total system supply air volume?",
    options: [
      "+/- 2%",
      "+/- 5%",
      "+/- 10%",
      "+/- 15%"
    ],
    correctAnswer: 1,
    explanation: "Total system supply air volume typically has a tighter tolerance of +/- 5% compared to individual terminals (+/- 10%). This ensures overall system performance meets design intent while allowing some flexibility at branch level."
  },
  {
    id: 9,
    question: "Which document should be completed to formally record that commissioning has been satisfactorily completed?",
    options: [
      "Design calculation sheet",
      "Commissioning certificate or witness record",
      "Purchase order",
      "Site instruction"
    ],
    correctAnswer: 1,
    explanation: "A commissioning certificate or witness record formally documents that commissioning has been satisfactorily completed. It should be signed by the commissioning engineer and witnessed by the client or their representative."
  },
  {
    id: 10,
    question: "What information must be recorded for each balancing damper in the commissioning records?",
    options: [
      "Only the damper manufacturer",
      "Damper position/setting and measured air flow rate",
      "Only the damper cost",
      "Only the installation date"
    ],
    correctAnswer: 1,
    explanation: "Commissioning records must include damper identification, its final position or setting (blade angle, turns open), and the measured air flow rate. This allows settings to be restored if dampers are disturbed during maintenance."
  },
  {
    id: 11,
    question: "What is the purpose of pre-commissioning checks before air balancing?",
    options: [
      "To delay the project",
      "To ensure the system is complete, clean, and ready for balancing",
      "To increase costs",
      "To avoid using test equipment"
    ],
    correctAnswer: 1,
    explanation: "Pre-commissioning checks verify that ductwork is complete and sealed, access doors are fitted, filters are installed, dampers operate freely, and the system is clean. Attempting to balance an incomplete system wastes time and produces invalid results."
  },
  {
    id: 12,
    question: "In the O&M manual, what should be included regarding the ventilation system?",
    options: [
      "Only the original tender price",
      "As-installed drawings, commissioning results, maintenance schedules, and operating procedures",
      "Only the architect's contact details",
      "Only the paint specification"
    ],
    correctAnswer: 1,
    explanation: "The O&M manual should include as-installed drawings, commissioning data and certificates, equipment schedules with nameplate data, maintenance requirements, operating procedures, and spare parts lists. This provides a complete reference for ongoing operation."
  }
];

const faqs = [
  {
    question: "What is the difference between commissioning and balancing?",
    answer: "Balancing is the process of adjusting air flow rates to match design values using dampers and fan speed adjustments. Commissioning is a broader process that includes balancing but also encompasses pre-commissioning checks, functional testing of controls, verification of all system components, documentation, and handover. Balancing is one element within the overall commissioning process."
  },
  {
    question: "Why is the proportional balancing method preferred over the stepwise method?",
    answer: "Proportional balancing is more efficient because it adjusts all terminals relative to the index (lowest percentage) terminal in one pass. The stepwise method adjusts terminals sequentially, but each adjustment affects other terminals, often requiring multiple passes through the system. Proportional balancing typically reduces commissioning time by 30-50%."
  },
  {
    question: "How often should ventilation systems be re-commissioned?",
    answer: "Building Regulations Approved Document F recommends periodic inspection of ventilation systems, typically every 5 years for non-domestic buildings. Re-commissioning should also be undertaken after any significant modifications, if occupancy patterns change substantially, or if problems with air quality or comfort are reported."
  },
  {
    question: "What causes air flow to deviate from design values over time?",
    answer: "Common causes include: filter loading increasing resistance, belt wear reducing fan speed, damper positions being disturbed during maintenance, duct leakage increasing, grille and diffuser blockage, changes to the building or system, and control system drift. Regular maintenance and periodic verification help identify these issues."
  },
  {
    question: "Can balancing be carried out with the BMS controlling the system?",
    answer: "During initial commissioning, the BMS should typically be in manual override mode to provide stable conditions. Variable air volume (VAV) terminals should be set to maximum flow. Once balancing is complete, the BMS can be commissioned to modulate flows correctly. The BMS commissioning records should reference the balancing data."
  },
  {
    question: "What qualifications should a commissioning engineer hold?",
    answer: "Commissioning engineers should ideally hold the Commissioning Specialists Association (CSA) certification or equivalent. They should have completed BSRIA or CIBSE commissioning training and have demonstrated practical experience. For witness testing, the engineer may need to be approved by the client's representative or the Commissioning Management organisation."
  }
];

const HNCModule8Section2_6 = () => {
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
            <Settings className="h-4 w-4" />
            <span>Module 8.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            System Balancing
          </h1>
          <p className="text-white/80">
            Air balancing procedures, commissioning processes, and documentation requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Balancing:</strong> Adjusting air flows to match design values</li>
              <li className="pl-1"><strong>Proportional method:</strong> Most efficient balancing approach</li>
              <li className="pl-1"><strong>Commissioning:</strong> Complete verification and handover process</li>
              <li className="pl-1"><strong>Documentation:</strong> O&amp;M manuals and commissioning records</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BSRIA BG 35:</strong> Commissioning Air Systems</li>
              <li className="pl-1"><strong>BSRIA BG 2:</strong> Commissioning Building Services</li>
              <li className="pl-1"><strong>CIBSE Code W:</strong> Water &amp; Air Commissioning</li>
              <li className="pl-1"><strong>Building Regs F:</strong> Ventilation requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the proportional balancing method to ventilation systems",
              "Select and use appropriate air flow measurement instruments",
              "Understand BSRIA commissioning procedures and requirements",
              "Set up and adjust balancing dampers correctly",
              "Complete commissioning records and documentation",
              "Verify system performance against design criteria",
              "Prepare O&M documentation for handover",
              "Identify common balancing problems and solutions"
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

        {/* Section 1: Air Balancing Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Air Balancing Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Air balancing is the systematic process of adjusting the air flow rates in a ventilation system
              to match the design values. Without proper balancing, some areas may receive excessive air
              while others are starved, leading to comfort complaints, poor indoor air quality, and
              wasted energy.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Air Balancing is Essential</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Thermal comfort:</strong> Correct air flow ensures heating/cooling capacity reaches each zone</li>
                <li className="pl-1"><strong>Indoor air quality:</strong> Fresh air is distributed to all occupied spaces</li>
                <li className="pl-1"><strong>Energy efficiency:</strong> Prevents over-supply to some areas requiring fan energy to be wasted</li>
                <li className="pl-1"><strong>Noise control:</strong> Excessive velocities cause noise; balancing keeps flows within design limits</li>
                <li className="pl-1"><strong>Pressure relationships:</strong> Maintains correct pressure differentials between spaces</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Balancing Hierarchy</p>
              <p className="text-sm text-white/90 mb-3">
                Air balancing should proceed in a logical sequence from the fan to the terminals:
              </p>
              <div className="grid sm:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-elec-yellow font-bold">1</span>
                  </div>
                  <p className="font-medium text-white">Fan</p>
                  <p className="text-xs text-white/70">Set total system flow</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-elec-yellow font-bold">2</span>
                  </div>
                  <p className="font-medium text-white">Main branches</p>
                  <p className="text-xs text-white/70">Balance major duct runs</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-elec-yellow font-bold">3</span>
                  </div>
                  <p className="font-medium text-white">Sub-branches</p>
                  <p className="text-xs text-white/70">Fine-tune distribution</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-elec-yellow font-bold">4</span>
                  </div>
                  <p className="font-medium text-white">Terminals</p>
                  <p className="text-xs text-white/70">Final adjustment</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Air Flow Measurement Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Pitot tube traverse</td>
                      <td className="border border-white/10 px-3 py-2">Rectangular and circular ducts</td>
                      <td className="border border-white/10 px-3 py-2">+/- 3-5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Rotating vane anemometer</td>
                      <td className="border border-white/10 px-3 py-2">Grilles, louvres, open ducts</td>
                      <td className="border border-white/10 px-3 py-2">+/- 5-10%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Thermal anemometer</td>
                      <td className="border border-white/10 px-3 py-2">Low velocities, directional measurement</td>
                      <td className="border border-white/10 px-3 py-2">+/- 3-5%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Flow hood (capture hood)</td>
                      <td className="border border-white/10 px-3 py-2">Ceiling diffusers, grilles</td>
                      <td className="border border-white/10 px-3 py-2">+/- 5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Always allow instruments to acclimatise to ambient conditions
              before taking measurements. Sudden temperature changes can affect readings, particularly
              for thermal anemometers.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: The Proportional Balancing Method */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Proportional Balancing Method
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The proportional balancing method, as described in BSRIA guides, is the most efficient
              approach for balancing air distribution systems. It minimises the number of adjustments
              required by working relative to an index terminal rather than absolute values.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Proportional Balancing Procedure</p>
              <ol className="text-sm text-white space-y-3 list-decimal list-outside ml-5">
                <li className="pl-2">
                  <strong>Pre-commissioning checks:</strong> Verify system is complete, clean, filters installed,
                  dampers operational, and access available
                </li>
                <li className="pl-2">
                  <strong>Set all dampers:</strong> Open all balancing dampers and regulating dampers fully
                </li>
                <li className="pl-2">
                  <strong>Adjust fan to design total:</strong> Set fan speed so total system air flow matches
                  design (typically using main duct measurement)
                </li>
                <li className="pl-2">
                  <strong>Measure all terminals:</strong> Record air flow at every terminal and calculate
                  percentage of design flow for each
                </li>
                <li className="pl-2">
                  <strong>Identify index terminal:</strong> Find the terminal with the lowest percentage of
                  design flow - this is the index
                </li>
                <li className="pl-2">
                  <strong>Balance remaining terminals:</strong> Adjust each other terminal's damper until its
                  percentage matches the index terminal
                </li>
                <li className="pl-2">
                  <strong>Increase fan speed:</strong> If index is below 100%, increase fan speed to bring
                  index to design flow
                </li>
                <li className="pl-2">
                  <strong>Final check:</strong> Re-measure all terminals to verify they are within tolerance
                </li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-elec-yellow mb-2">Calculating Proportional Balance</p>
                <div className="text-sm text-white/90 space-y-2">
                  <p>For each terminal, calculate:</p>
                  <p className="font-mono bg-black/30 p-2 rounded">% of design = (Measured / Design) x 100</p>
                  <p className="mt-2 text-xs text-white/70">
                    Example: If design is 100 l/s and measured is 85 l/s,
                    the percentage is 85%.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="font-medium text-elec-yellow mb-2">Adjusting to Match Index</p>
                <div className="text-sm text-white/90 space-y-2">
                  <p>Target flow for non-index terminals:</p>
                  <p className="font-mono bg-black/30 p-2 rounded">Target = Design x (Index % / 100)</p>
                  <p className="mt-2 text-xs text-white/70">
                    Example: If index is at 85% and design is 150 l/s,
                    target = 150 x 0.85 = 127.5 l/s
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Balancing Damper Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Damper Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristics</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Single blade (butterfly)</td>
                      <td className="border border-white/10 px-3 py-2">Simple, economical, can cause turbulence</td>
                      <td className="border border-white/10 px-3 py-2">Branch takeoffs, small ducts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Multi-blade opposed</td>
                      <td className="border border-white/10 px-3 py-2">Better flow control, lower turbulence</td>
                      <td className="border border-white/10 px-3 py-2">Main branches, large ducts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Iris damper</td>
                      <td className="border border-white/10 px-3 py-2">Concentrates flow centrally, good measurement point</td>
                      <td className="border border-white/10 px-3 py-2">Terminal units, laboratory systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Constant volume regulator</td>
                      <td className="border border-white/10 px-3 py-2">Self-adjusting to maintain set flow</td>
                      <td className="border border-white/10 px-3 py-2">Critical spaces, clean rooms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Always record damper positions (blade angle, turns open, or scale reading)
              on the commissioning sheets. This allows settings to be restored if dampers are disturbed
              during maintenance.
            </p>
          </div>
        </section>

        {/* Section 3: Commissioning Procedures (BSRIA) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Commissioning Procedures (BSRIA Guidelines)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BSRIA (Building Services Research and Information Association) publishes comprehensive
              guides for commissioning building services. BSRIA BG 35/2021 specifically covers air
              distribution systems, while BG 2 provides an overall framework for commissioning management.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BSRIA Commissioning Phases</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">Phase 1: Pre-commissioning</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Review design documentation and specifications</li>
                    <li>Inspect installation for completeness</li>
                    <li>Verify ductwork is sealed and pressure tested</li>
                    <li>Check filter installation and cleanliness</li>
                    <li>Confirm damper operation and accessibility</li>
                    <li>Verify electrical supplies and controls</li>
                    <li>Complete pre-commissioning checklists</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">Phase 2: Setting to Work</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Energise and run plant safely</li>
                    <li>Check fan rotation and operation</li>
                    <li>Verify motor currents within limits</li>
                    <li>Set fan speed for design total flow</li>
                    <li>Check safety devices operate correctly</li>
                    <li>Verify control sequences function</li>
                    <li>Run system continuously to stabilise</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">Phase 3: Regulation (Balancing)</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Measure air flows throughout system</li>
                    <li>Apply proportional balancing method</li>
                    <li>Adjust dampers to achieve design flows</li>
                    <li>Lock damper positions after final adjustment</li>
                    <li>Record all settings and measurements</li>
                    <li>Re-check after damper locking</li>
                    <li>Verify tolerances are achieved</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="font-medium text-elec-yellow mb-2">Phase 4: Testing and Verification</p>
                  <ul className="text-xs text-white/90 space-y-1 list-disc list-outside ml-4">
                    <li>Witness testing with client representative</li>
                    <li>Verify performance against specification</li>
                    <li>Test control sequences under various conditions</li>
                    <li>Check noise levels at critical locations</li>
                    <li>Verify building pressurisation</li>
                    <li>Issue commissioning certificates</li>
                    <li>Compile O&amp;M documentation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-commissioning Checklist Items</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Ductwork</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>Installation complete and sealed</li>
                    <li>Pressure test passed (Class B or C)</li>
                    <li>Fire dampers installed and accessible</li>
                    <li>Flexible connections in place</li>
                    <li>Access doors fitted and sealed</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Air handling unit</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>Filters installed (correct grade)</li>
                    <li>Fan belts tensioned correctly</li>
                    <li>Coils clean and connected</li>
                    <li>Drain traps primed</li>
                    <li>Vibration isolators released</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Controls</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>Sensors installed and connected</li>
                    <li>Actuators installed and stroked</li>
                    <li>BMS points commissioned</li>
                    <li>Interlocks tested</li>
                    <li>Safety devices functional</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Terminals</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>All grilles and diffusers installed</li>
                    <li>Balancing dampers accessible</li>
                    <li>VAV boxes connected and calibrated</li>
                    <li>Ceiling tiles in place</li>
                    <li>Room sealed and weather-tight</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-1">Commissioning Tolerances</p>
              <p className="text-sm text-white/90">
                Typical commissioning tolerances per BSRIA guidelines:
                <br />
                <strong>Individual terminals:</strong> +/- 10% of design flow
                <br />
                <strong>Branch air flow:</strong> +/- 10% of design flow
                <br />
                <strong>Total system air flow:</strong> +/- 5% of design flow
                <br />
                Tighter tolerances may be specified for critical applications such as laboratories or clean rooms.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Performance Verification and O&M Documentation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Performance Verification and O&amp;M Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Performance verification confirms that the installed and commissioned system meets the design
              intent and specification requirements. This is documented through commissioning records and
              compiled into the O&amp;M (Operation and Maintenance) manual for handover to the client.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance Verification Against Design</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Verification Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Acceptance Criteria</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Total supply air volume</td>
                      <td className="border border-white/10 px-3 py-2">Pitot traverse at main duct</td>
                      <td className="border border-white/10 px-3 py-2">+/- 5% of design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Total extract air volume</td>
                      <td className="border border-white/10 px-3 py-2">Pitot traverse at main duct</td>
                      <td className="border border-white/10 px-3 py-2">+/- 5% of design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Fresh air quantity</td>
                      <td className="border border-white/10 px-3 py-2">Measurement at intake or CO2 analysis</td>
                      <td className="border border-white/10 px-3 py-2">&gt; minimum required by Building Regs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Individual terminal flows</td>
                      <td className="border border-white/10 px-3 py-2">Flow hood or anemometer traverse</td>
                      <td className="border border-white/10 px-3 py-2">+/- 10% of design</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Room pressurisation</td>
                      <td className="border border-white/10 px-3 py-2">Differential pressure measurement</td>
                      <td className="border border-white/10 px-3 py-2">As specified (e.g., +10 Pa)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Fan external static pressure</td>
                      <td className="border border-white/10 px-3 py-2">Manometer at fan inlet/outlet</td>
                      <td className="border border-white/10 px-3 py-2">Within fan curve capability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Noise levels</td>
                      <td className="border border-white/10 px-3 py-2">Sound level meter in occupied spaces</td>
                      <td className="border border-white/10 px-3 py-2">Meet NR criteria specified</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Record Requirements</p>
              <p className="text-sm text-white/90 mb-3">
                Each commissioning record sheet should include the following information:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Project information</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>Project name and address</li>
                    <li>System reference and description</li>
                    <li>Commissioning engineer name and company</li>
                    <li>Date of commissioning</li>
                    <li>Witness name (if applicable)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Equipment data</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>AHU/fan reference and location</li>
                    <li>Fan motor details and measured current</li>
                    <li>Fan speed setting</li>
                    <li>Filter pressure drop</li>
                    <li>Coil on/off flows and temperatures</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Air flow measurements</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>Terminal/grille reference</li>
                    <li>Location description</li>
                    <li>Design air flow rate</li>
                    <li>Measured air flow rate</li>
                    <li>Percentage of design achieved</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Damper settings</p>
                  <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                    <li>Damper reference/location</li>
                    <li>Final position (angle/turns/scale)</li>
                    <li>Confirmation damper locked</li>
                    <li>Instrument used and calibration date</li>
                    <li>Signature of commissioning engineer</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">O&amp;M Manual Contents</p>
              <p className="text-sm text-white/90 mb-3">
                The Operation and Maintenance manual should include:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Section</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Contents</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">System description</td>
                      <td className="border border-white/10 px-3 py-2">Overview of system function, design parameters, operating principles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">As-installed drawings</td>
                      <td className="border border-white/10 px-3 py-2">Updated layout drawings, schematics, wiring diagrams reflecting installation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Equipment schedules</td>
                      <td className="border border-white/10 px-3 py-2">All equipment with model numbers, serial numbers, nameplate data</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Commissioning data</td>
                      <td className="border border-white/10 px-3 py-2">All commissioning record sheets and certificates</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Operating procedures</td>
                      <td className="border border-white/10 px-3 py-2">Start-up, shutdown, seasonal changeover, emergency procedures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Maintenance schedules</td>
                      <td className="border border-white/10 px-3 py-2">Routine maintenance tasks, frequencies, and procedures</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Manufacturer data</td>
                      <td className="border border-white/10 px-3 py-2">Product data sheets, installation manuals, technical literature</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Spare parts</td>
                      <td className="border border-white/10 px-3 py-2">Recommended spares list with part numbers and suppliers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Warranties and contacts</td>
                      <td className="border border-white/10 px-3 py-2">Warranty information, supplier contacts, service agreements</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-1">Building Regulations Compliance</p>
              <p className="text-sm text-white/90">
                Approved Document F requires that commissioning notice be given to Building Control and that
                a commissioning certificate is provided demonstrating the ventilation system has been properly
                commissioned. The O&amp;M manual forms part of the building log book required under Part L.
              </p>
            </div>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Proportional Balancing Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A system has four terminals with the following design and measured flows:
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 mb-3">
                <p>Terminal A: Design 200 l/s, Measured 190 l/s = 95%</p>
                <p>Terminal B: Design 150 l/s, Measured 160 l/s = 107%</p>
                <p>Terminal C: Design 100 l/s, Measured 78 l/s = 78% (INDEX)</p>
                <p>Terminal D: Design 150 l/s, Measured 142 l/s = 95%</p>
              </div>
              <p className="text-sm text-white mb-2">
                <strong>Solution:</strong> Terminal C at 78% is the index. Adjust other terminals to 78%:
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Terminal A target: 200 x 0.78 = 156 l/s (reduce from 190)</p>
                <p>Terminal B target: 150 x 0.78 = 117 l/s (reduce from 160)</p>
                <p>Terminal D target: 150 x 0.78 = 117 l/s (reduce from 142)</p>
                <p className="mt-2 text-white/60">After balancing, increase fan speed to bring index to 100 l/s</p>
                <p className="text-white/60">All terminals will then rise proportionally to design values</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Pitot Tube Traverse Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A rectangular duct measuring 600mm x 400mm has the following velocity
                pressure readings from a 9-point traverse:
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90 mb-3">
                <p>Velocity pressures (Pa): 45, 52, 48, 50, 58, 52, 44, 50, 46</p>
                <p className="mt-2">Step 1: Calculate velocity from each pressure:</p>
                <p>v = 1.29 x sqrt(Pv) for standard air density</p>
                <p className="mt-2">Velocities (m/s): 8.65, 9.30, 8.94, 9.12, 9.82, 9.30, 8.56, 9.12, 8.75</p>
              </div>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 2: Calculate average velocity:</p>
                <p>v_avg = (8.65+9.30+8.94+9.12+9.82+9.30+8.56+9.12+8.75) / 9 = 9.06 m/s</p>
                <p className="mt-2">Step 3: Calculate volume flow rate:</p>
                <p>Q = A x v = (0.6 x 0.4) x 9.06 = 0.24 x 9.06 = 2.17 m3/s</p>
                <p>Q = <strong>2170 l/s</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Verifying Fresh Air Percentage</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> An AHU has total supply of 5000 l/s. The minimum fresh air requirement
                is 20% (1000 l/s). Measured fresh air intake is 1150 l/s.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Actual fresh air percentage:</p>
                <p>% Fresh air = (1150 / 5000) x 100 = 23%</p>
                <p className="mt-2">Verification:</p>
                <p>Measured: 1150 l/s</p>
                <p>Required minimum: 1000 l/s</p>
                <p>Excess: 1150 - 1000 = 150 l/s (15% above minimum)</p>
                <p className="mt-2 text-green-400">Result: PASS - exceeds minimum fresh air requirement</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Problems and Solutions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Balancing Problems and Solutions</h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Problem: Index Terminal Cannot Reach Design Flow</h3>
              <p className="text-sm text-white/90 mb-2">
                <strong>Possible causes:</strong>
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5 mb-2">
                <li className="pl-1">Undersized ductwork on the index branch</li>
                <li className="pl-1">Excessive resistance (elbows, transitions) in branch</li>
                <li className="pl-1">Blockage or closed fire damper in branch</li>
                <li className="pl-1">Fan undersized or operating below design speed</li>
              </ul>
              <p className="text-sm text-elec-yellow/70">
                <strong>Solution:</strong> Investigate branch for restrictions. Check fan duty against design.
                May require design review if system cannot be balanced.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Problem: Excessive Noise at Balanced Terminals</h3>
              <p className="text-sm text-white/90 mb-2">
                <strong>Possible causes:</strong>
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5 mb-2">
                <li className="pl-1">Dampers throttled too far creating turbulence</li>
                <li className="pl-1">Velocity at grille face exceeds design limits</li>
                <li className="pl-1">Damper location too close to terminal</li>
                <li className="pl-1">Incorrect grille selection for the application</li>
              </ul>
              <p className="text-sm text-elec-yellow/70">
                <strong>Solution:</strong> Move restriction upstream using branch dampers rather than terminal
                dampers. Check face velocities against manufacturer limits. Consider acoustic treatment.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Problem: System Flow Changes After Balancing</h3>
              <p className="text-sm text-white/90 mb-2">
                <strong>Possible causes:</strong>
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5 mb-2">
                <li className="pl-1">Filter loading increasing system resistance</li>
                <li className="pl-1">Damper positions disturbed during other work</li>
                <li className="pl-1">BMS control overriding manual settings</li>
                <li className="pl-1">Belt slip or wear reducing fan speed</li>
              </ul>
              <p className="text-sm text-elec-yellow/70">
                <strong>Solution:</strong> Establish regular maintenance schedules. Lock damper positions.
                Document settings clearly. Check fan and motor regularly.
              </p>
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
                <p className="font-medium text-white mb-1">Key BSRIA Guides</p>
                <ul className="space-y-0.5">
                  <li>BG 35/2021: Commissioning Air Systems</li>
                  <li>BG 2: Commissioning Building Services</li>
                  <li>BG 29: Pre-commission Cleaning</li>
                  <li>BG 49: Commissioning Water Systems</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Commissioning Tolerances</p>
                <ul className="space-y-0.5">
                  <li>Total system flow: +/- 5%</li>
                  <li>Branch flows: +/- 10%</li>
                  <li>Individual terminals: +/- 10%</li>
                  <li>Fresh air: &gt; minimum specified</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Measurement Instruments</p>
                <ul className="space-y-0.5">
                  <li>Pitot tube + manometer: Duct traverse</li>
                  <li>Rotating vane: Grilles, open areas</li>
                  <li>Flow hood: Ceiling diffusers</li>
                  <li>Thermal anemometer: Low velocity</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Proportional Balancing Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Open all dampers, set total flow</li>
                  <li>2. Measure all terminals</li>
                  <li>3. Identify index (lowest %)</li>
                  <li>4. Balance others to match index</li>
                  <li>5. Increase fan to bring index to 100%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Quiz */}
        <section className="mb-10 mt-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Ductwork Design
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section2">
              Complete Section
              <CheckCircle className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section2_6;
