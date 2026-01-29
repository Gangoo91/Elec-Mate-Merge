import { ArrowLeft, Droplets, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BREEAM Water Category - HNC Module 6 Section 3.2";
const DESCRIPTION = "Master BREEAM Water assessment methodology: Wat 01 water consumption calculations, efficient sanitary fittings, flow rate specifications, metering requirements, leak detection systems, rainwater harvesting, and greywater recycling for sustainable buildings.";

const quickCheckQuestions = [
  {
    id: "wat01-baseline",
    question: "What does the BREEAM water calculator compare a building's consumption against?",
    options: ["EU Water Framework Directive limits", "A baseline building using standard fittings", "Historic consumption data from similar buildings", "Local water authority targets"],
    correctIndex: 1,
    explanation: "The BREEAM water calculator compares the assessed building's predicted water consumption against a notional baseline building fitted with standard sanitary components at specified flow rates and flush volumes."
  },
  {
    id: "water-metering",
    question: "What is the primary purpose of water metering in BREEAM assessments?",
    options: ["To calculate water bills accurately", "To enable monitoring of consumption and identification of leaks", "To meet Building Regulations requirements", "To qualify for water company discounts"],
    correctIndex: 1,
    explanation: "Water metering enables building occupants and managers to monitor consumption patterns, identify abnormal usage indicating leaks, and implement water management strategies to reduce consumption over time."
  },
  {
    id: "efficient-wc",
    question: "What maximum effective flush volume qualifies as 'best practice' for WCs under BREEAM?",
    options: ["6.0 litres", "4.5 litres", "4.0 litres", "3.0 litres"],
    correctIndex: 2,
    explanation: "BREEAM best practice for WCs is an effective flush volume of 4.0 litres or less. The effective flush volume accounts for dual flush mechanisms using the formula: (full flush + reduced flush) / 3."
  },
  {
    id: "greywater-definition",
    question: "Which water sources are classified as greywater for recycling purposes?",
    options: ["Rainwater from roofs only", "Water from WCs and urinals", "Wastewater from basins, showers, and baths", "All wastewater including kitchen sinks"],
    correctIndex: 2,
    explanation: "Greywater is lightly contaminated wastewater from basins, showers, and baths. It excludes blackwater (WCs/urinals) and water from kitchen sinks which contains fats and food waste."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "How many BREEAM credits are available under Wat 01 (Water Consumption)?",
    options: [
      "3 credits",
      "5 credits",
      "6 credits",
      "9 credits"
    ],
    correctAnswer: 1,
    explanation: "Wat 01 Water Consumption offers up to 5 credits based on the percentage improvement in water efficiency compared to the baseline building. Additional credits may be available through innovation."
  },
  {
    id: 2,
    question: "What is the baseline flow rate for wash hand basin taps in the BREEAM water calculator?",
    options: ["3 litres/minute", "6 litres/minute", "8 litres/minute", "12 litres/minute"],
    correctAnswer: 1,
    explanation: "The BREEAM baseline flow rate for wash hand basin taps is 6 litres/minute. Best practice fittings achieve 4 litres/minute or less through flow restrictors or aerators."
  },
  {
    id: 3,
    question: "To achieve maximum credits for water consumption, what percentage improvement over baseline is required?",
    options: ["25% improvement", "40% improvement", "55% improvement", "65% improvement"],
    correctAnswer: 2,
    explanation: "Maximum credits (5 credits) require a 55% or greater improvement in water efficiency compared to the baseline building. The credit thresholds are graduated: 12.5% (1 credit), 25% (2 credits), 40% (3 credits), 50% (4 credits), 55% (5 credits)."
  },
  {
    id: 4,
    question: "What type of meter is required to achieve credits under Wat 02 (Water Monitoring)?",
    options: [
      "Manual read meters only",
      "Pulsed output meters connected to BMS or data logger",
      "Standard utility meters with monthly readings",
      "Mechanical dial meters with quarterly inspections"
    ],
    correctAnswer: 1,
    explanation: "Wat 02 requires pulsed output water meters connected to a BMS or data logging system capable of identifying abnormal consumption patterns and potential leaks through automated monitoring."
  },
  {
    id: 5,
    question: "Which BREEAM issue addresses leak detection systems?",
    options: [
      "Wat 01 Water Consumption",
      "Wat 02 Water Monitoring",
      "Wat 03 Water Leak Detection",
      "Wat 04 Water Efficient Equipment"
    ],
    correctAnswer: 2,
    explanation: "Wat 03 Water Leak Detection specifically addresses the installation of leak detection systems on the mains water supply to minimise water wastage from undetected leaks."
  },
  {
    id: 6,
    question: "What is the effective flush volume formula for dual flush WCs?",
    options: [
      "(Full flush + Reduced flush) / 2",
      "(Full flush + Reduced flush) / 3",
      "(Full flush x 2 + Reduced flush) / 3",
      "Full flush x 0.67"
    ],
    correctAnswer: 1,
    explanation: "The effective flush volume for dual flush WCs is calculated as (full flush volume + reduced flush volume) / 3. This formula accounts for typical usage patterns where the reduced flush is used more frequently."
  },
  {
    id: 7,
    question: "For a non-domestic building, which areas must have sub-metering for full Wat 02 credits?",
    options: [
      "WCs only",
      "Kitchen and WCs",
      "All major water uses including WCs, kitchens, and any process uses",
      "External irrigation only"
    ],
    correctAnswer: 2,
    explanation: "Full Wat 02 credits require sub-metering of all major water uses including WCs/washrooms, kitchens/catering, any process or industrial water use, and external irrigation systems where installed."
  },
  {
    id: 8,
    question: "What is the typical payback period for rainwater harvesting systems in UK commercial buildings?",
    options: ["1-2 years", "5-10 years", "15-20 years", "Over 25 years"],
    correctAnswer: 1,
    explanation: "Rainwater harvesting systems in UK commercial buildings typically achieve payback periods of 5-10 years depending on building size, rainfall catchment area, water demand profile, and local water costs."
  },
  {
    id: 9,
    question: "What evidence is required for Wat 01 compliance at design stage?",
    options: [
      "Water bills from similar buildings",
      "Completed BREEAM water calculator with specified fittings",
      "Manufacturer declarations only",
      "Site water meter readings"
    ],
    correctAnswer: 1,
    explanation: "Design stage evidence requires a completed BREEAM water calculator showing all specified sanitary fittings with their flow rates/flush volumes, plus specifications or schedules confirming the fittings to be installed."
  },
  {
    id: 10,
    question: "Which water source is NOT suitable for WC flushing without treatment?",
    options: ["Rainwater from non-trafficked roofs", "Greywater from showers", "Surface water from SUDS attenuation", "Blackwater from urinals"],
    correctAnswer: 3,
    explanation: "Blackwater (from WCs and urinals) requires extensive treatment before reuse and is not suitable for simple recycling systems. Rainwater, greywater, and surface water can be used for WC flushing with appropriate filtration and treatment."
  },
  {
    id: 11,
    question: "What is the baseline shower flow rate in the BREEAM water calculator?",
    options: ["6 litres/minute", "8 litres/minute", "10 litres/minute", "12 litres/minute"],
    correctAnswer: 2,
    explanation: "The baseline shower flow rate is 10 litres/minute. Best practice showers achieve 6 litres/minute or less while maintaining adequate performance through optimised spray patterns and aeration."
  },
  {
    id: 12,
    question: "A leak detection system must be capable of detecting flow rates as low as:",
    options: ["0.1 litres/second", "1 litre/minute", "10 litres/minute", "No minimum specified"],
    correctAnswer: 1,
    explanation: "BREEAM leak detection systems must be capable of detecting continuous flow rates as low as 1 litre/minute to identify small but persistent leaks that could result in significant water wastage over time."
  }
];

const faqs = [
  {
    question: "How does the BREEAM water calculator handle mixed-use buildings?",
    answer: "Mixed-use buildings are assessed by calculating water consumption for each use type separately using the appropriate activity data (occupancy, operating hours, etc.). The calculator allows different sanitary fitting specifications for different zones, then combines the results to determine overall improvement against a mixed-use baseline. Each distinct use must be identified with its floor area, occupancy, and operating pattern."
  },
  {
    question: "Can greywater recycling achieve additional credits beyond Wat 01?",
    answer: "Greywater recycling contributes to Wat 01 credits by reducing mains water consumption - the recycled water offsets demand for flushing/irrigation. While there are no separate credits specifically for greywater systems, they may contribute to innovation credits if the approach is exemplary or novel. The water calculator includes inputs for alternative water sources including recycled water volumes."
  },
  {
    question: "What happens if specified fittings are substituted during construction?",
    answer: "Post-construction assessment requires evidence that installed fittings match or exceed the specification used in the water calculator. If substitutions occur, the calculator must be updated with actual flow rates/flush volumes. If performance is reduced, fewer credits may be achieved. Assessors require product data sheets, test certificates, or site verification of installed flow rates to confirm compliance."
  },
  {
    question: "Are waterless urinals always the best choice for BREEAM credits?",
    answer: "Waterless urinals offer the lowest water consumption and contribute to maximum Wat 01 credits. However, they require appropriate maintenance regimes and compatible drainage systems. Some clients prefer low-flush urinals (0.5-1.0 litres/bowl/hour) which still achieve significant improvements over baseline (7.5 litres/bowl/hour) while using conventional maintenance approaches. The choice depends on maintenance capabilities and client preferences."
  },
  {
    question: "How do I demonstrate leak detection compliance at design stage?",
    answer: "Design stage evidence includes: specifications for the leak detection system showing detection sensitivity (1 litre/minute minimum), system schematic showing meter and flow switch locations on the mains supply, BMS or alarm system connection details, and confirmation of automatic shut-off or alert capability. Post-construction evidence requires commissioning records demonstrating the system can detect the specified flow rates."
  },
  {
    question: "What maintenance requirements apply to rainwater harvesting systems?",
    answer: "BREEAM requires building user guides to include maintenance schedules for rainwater systems covering: filter cleaning/replacement (typically 3-6 monthly), tank inspection and cleaning (annual), pump maintenance, UV treatment system servicing (if fitted), and first flush device checking. The O&M manual must specify responsibilities and frequencies to ensure long-term system performance."
  }
];

const HNCModule6Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section3">
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
            <Droplets className="h-4 w-4" />
            <span>Module 6.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BREEAM Water Category
          </h1>
          <p className="text-white/80">
            Water consumption targets, efficient fittings, metering, leak detection, and water recycling systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Wat 01:</strong> Up to 5 credits for water efficiency improvement</li>
              <li className="pl-1"><strong>Calculator:</strong> Compares building against baseline consumption</li>
              <li className="pl-1"><strong>Metering:</strong> Pulsed output meters connected to BMS</li>
              <li className="pl-1"><strong>Leak detection:</strong> Must detect flows as low as 1 litre/min</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Flow rates:</strong> WHB taps 6 l/min baseline, 4 l/min best practice</li>
              <li className="pl-1"><strong>WC flush:</strong> 6 litres baseline, 4 litres best practice</li>
              <li className="pl-1"><strong>Sub-metering:</strong> Required for major water uses</li>
              <li className="pl-1"><strong>Recycling:</strong> Rainwater and greywater systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate water consumption using the BREEAM water calculator",
              "Specify efficient sanitary fittings to achieve credit thresholds",
              "Design water metering strategies for monitoring and sub-metering",
              "Specify leak detection systems meeting BREEAM requirements",
              "Evaluate rainwater harvesting and greywater recycling options",
              "Prepare evidence documentation for design and post-construction stages"
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

        {/* Section 1: Wat 01 Water Consumption */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Wat 01: Water Consumption
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Water Consumption issue (Wat 01) is the primary credit-generating opportunity within the
              BREEAM Water category. It uses a standardised calculator methodology to compare the assessed
              building's predicted water consumption against a notional baseline building fitted with
              conventional sanitary components.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Credit Thresholds for Wat 01:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Improvement Over Baseline</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Credits Available</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">12.5% improvement</td>
                      <td className="border border-white/10 px-3 py-2">1 credit</td>
                      <td className="border border-white/10 px-3 py-2">Standard efficient fittings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25% improvement</td>
                      <td className="border border-white/10 px-3 py-2">2 credits</td>
                      <td className="border border-white/10 px-3 py-2">Good practice fittings throughout</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">40% improvement</td>
                      <td className="border border-white/10 px-3 py-2">3 credits</td>
                      <td className="border border-white/10 px-3 py-2">Best practice fittings</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50% improvement</td>
                      <td className="border border-white/10 px-3 py-2">4 credits</td>
                      <td className="border border-white/10 px-3 py-2">Best practice + low-flush WCs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">55% improvement</td>
                      <td className="border border-white/10 px-3 py-2">5 credits</td>
                      <td className="border border-white/10 px-3 py-2">Best practice + waterless urinals/recycled water</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BREEAM Water Calculator Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Building data:</strong> Floor area, occupancy levels, operating hours by use type</li>
                <li className="pl-1"><strong>Sanitary fittings:</strong> WCs, urinals, WHB taps, showers, kitchen taps, baths</li>
                <li className="pl-1"><strong>Flow rates/flush volumes:</strong> Specified for each fitting type</li>
                <li className="pl-1"><strong>Alternative water sources:</strong> Rainwater, greywater, borehole water</li>
                <li className="pl-1"><strong>Process water:</strong> Cooling towers, laboratories, specialist uses</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> The water calculator automatically compares actual specifications against baseline values - specify efficient fittings throughout to maximise improvement percentage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Efficient Sanitary Fittings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Efficient Sanitary Fittings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting appropriate sanitary fittings is the primary mechanism for achieving water
              efficiency credits. Each fitting type has baseline and best practice flow rates or
              flush volumes defined in the BREEAM methodology.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Rates and Flush Volumes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fitting Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Baseline</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Practice</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">WC (single flush)</td>
                      <td className="border border-white/10 px-3 py-2">6.0 litres</td>
                      <td className="border border-white/10 px-3 py-2">4.0 litres</td>
                      <td className="border border-white/10 px-3 py-2">Per flush volume</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">WC (dual flush)</td>
                      <td className="border border-white/10 px-3 py-2">6.0 litres effective</td>
                      <td className="border border-white/10 px-3 py-2">4.0 litres effective</td>
                      <td className="border border-white/10 px-3 py-2">(Full + Reduced) / 3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Urinal (per bowl/hour)</td>
                      <td className="border border-white/10 px-3 py-2">7.5 litres</td>
                      <td className="border border-white/10 px-3 py-2">0 litres (waterless)</td>
                      <td className="border border-white/10 px-3 py-2">Or demand-flush systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">WHB tap</td>
                      <td className="border border-white/10 px-3 py-2">6 l/min</td>
                      <td className="border border-white/10 px-3 py-2">4 l/min</td>
                      <td className="border border-white/10 px-3 py-2">Flow restrictors or aerators</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Shower</td>
                      <td className="border border-white/10 px-3 py-2">10 l/min</td>
                      <td className="border border-white/10 px-3 py-2">6 l/min</td>
                      <td className="border border-white/10 px-3 py-2">Low-flow showerheads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kitchen tap</td>
                      <td className="border border-white/10 px-3 py-2">12 l/min</td>
                      <td className="border border-white/10 px-3 py-2">8 l/min</td>
                      <td className="border border-white/10 px-3 py-2">Higher flow needed for filling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bath</td>
                      <td className="border border-white/10 px-3 py-2">No flow limit</td>
                      <td className="border border-white/10 px-3 py-2">Volume limit</td>
                      <td className="border border-white/10 px-3 py-2">Based on bath capacity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Flow Control Technologies</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Aerators (mix air with water)</li>
                  <li className="pl-1">Flow restrictors (fixed orifice)</li>
                  <li className="pl-1">Pressure compensating valves</li>
                  <li className="pl-1">Spray taps for WHB</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">WC Technologies</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Dual flush mechanisms</li>
                  <li className="pl-1">Reduced trapway designs</li>
                  <li className="pl-1">Vacuum-assist systems</li>
                  <li className="pl-1">Pressure-assist flushing</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Urinal Options</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Waterless (cartridge systems)</li>
                  <li className="pl-1">Demand flush (per use)</li>
                  <li className="pl-1">Timed flush (reduced cycle)</li>
                  <li className="pl-1">Presence-sensing controls</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Effective Flush Volume Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Dual flush WC:</span> 4.5 litre full / 3.0 litre reduced</p>
                <p><span className="text-white/60">Formula:</span> (Full + Reduced) / 3</p>
                <p><span className="text-white/60">Calculation:</span> (4.5 + 3.0) / 3 = 2.5 litres effective</p>
                <p className="text-green-400 mt-2">This exceeds best practice (4.0L) requirement</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Specify dual flush WCs with 4.5/3.0 litre or lower flush volumes - the effective flush of 2.5 litres significantly exceeds the best practice threshold.
            </p>
          </div>
        </section>

        {/* Section 3: Water Metering and Leak Detection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Water Metering and Leak Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Water monitoring (Wat 02) and leak detection (Wat 03) are essential for ongoing water
              management. These issues recognise that specifying efficient fittings alone is insufficient
              - buildings need monitoring systems to identify problems and verify actual consumption.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wat 02: Water Monitoring Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Credit Level</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Technical Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1 credit</td>
                      <td className="border border-white/10 px-3 py-2">Pulsed output meter on mains supply</td>
                      <td className="border border-white/10 px-3 py-2">Connected to BMS or data logger</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2 credits</td>
                      <td className="border border-white/10 px-3 py-2">Sub-metering of major water uses</td>
                      <td className="border border-white/10 px-3 py-2">WCs, kitchens, process uses, irrigation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Metering System Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pulsed output meters:</strong> Typically 1 pulse per litre or 10 litres depending on flow range</li>
                <li className="pl-1"><strong>BMS integration:</strong> Pulse counting, data logging, alarm generation on abnormal consumption</li>
                <li className="pl-1"><strong>Sub-meters:</strong> Located on branches to WC cores, kitchens, plant rooms, external taps</li>
                <li className="pl-1"><strong>Data analysis:</strong> Capable of generating consumption reports and identifying trends</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wat 03: Leak Detection Systems</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Technical Requirements:</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Detect flows as low as 1 litre/minute</li>
                    <li className="pl-1">Located on mains supply after meter</li>
                    <li className="pl-1">Connected to BMS or alarm system</li>
                    <li className="pl-1">Automatic shut-off or manual alert</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">System Types:</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1">Flow-based detection (sustained low flow)</li>
                    <li className="pl-1">Pressure monitoring (pressure drop)</li>
                    <li className="pl-1">Acoustic detection (pipe noise analysis)</li>
                    <li className="pl-1">Combination systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Metering Strategy Example - Office Building</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Location | Meter Type | Purpose</p>
                <p>---------|------------|--------</p>
                <p>Incoming main | Pulsed output + leak detection | Total consumption + leak alert</p>
                <p>Core WC riser | Sub-meter | Sanitary water use</p>
                <p>Kitchen/tea point | Sub-meter | Catering consumption</p>
                <p>Plant room | Sub-meter | Cooling/heating water use</p>
                <p>External tap | Sub-meter | Irrigation/cleaning</p>
                <p className="mt-2 text-green-400">Total: 5 meters providing full consumption breakdown</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> Specify leak detection sensitivity in the BMS functional specification - the system must be programmed to recognise sustained low flows (e.g., 1 l/min for 30 minutes) as potential leaks.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Water Recycling Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Water Recycling Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Rainwater harvesting and greywater recycling systems can significantly reduce mains water
              consumption, contributing to higher Wat 01 credit achievement. These systems capture
              water that would otherwise be discharged and treat it for non-potable uses.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Rainwater Harvesting</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Source:</strong> Roof drainage from non-trafficked areas</li>
                  <li className="pl-1"><strong>Collection:</strong> First flush diverter, filter, storage tank</li>
                  <li className="pl-1"><strong>Treatment:</strong> Filtration, UV disinfection (optional)</li>
                  <li className="pl-1"><strong>Uses:</strong> WC flushing, irrigation, cooling towers</li>
                  <li className="pl-1"><strong>Mains backup:</strong> Type AA/AB air gap required</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Greywater Recycling</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Source:</strong> Showers, basins, baths (not kitchen)</li>
                  <li className="pl-1"><strong>Collection:</strong> Separate drainage to treatment plant</li>
                  <li className="pl-1"><strong>Treatment:</strong> Biological treatment, filtration, disinfection</li>
                  <li className="pl-1"><strong>Uses:</strong> WC flushing, irrigation (sub-surface only)</li>
                  <li className="pl-1"><strong>Standards:</strong> BS 8525-1 for greywater systems</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Components Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rainwater Harvesting</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Greywater Recycling</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Storage tank</td>
                      <td className="border border-white/10 px-3 py-2">Underground or above ground</td>
                      <td className="border border-white/10 px-3 py-2">Smaller, internal plant room</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Treatment level</td>
                      <td className="border border-white/10 px-3 py-2">Filtration + optional UV</td>
                      <td className="border border-white/10 px-3 py-2">Biological + filtration + disinfection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pump system</td>
                      <td className="border border-white/10 px-3 py-2">Header tank or direct pumped</td>
                      <td className="border border-white/10 px-3 py-2">Direct pumped with pressure set</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">6-monthly filter clean, annual inspection</td>
                      <td className="border border-white/10 px-3 py-2">Monthly checks, quarterly servicing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical payback</td>
                      <td className="border border-white/10 px-3 py-2">5-10 years</td>
                      <td className="border border-white/10 px-3 py-2">8-15 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Rainwater Yield Calculation Example</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Roof area:</span> 2,000 m2</p>
                <p><span className="text-white/60">Annual rainfall:</span> 800 mm (0.8 m)</p>
                <p><span className="text-white/60">Collection efficiency:</span> 80%</p>
                <p><span className="text-white/60">Calculation:</span> 2,000 x 0.8 x 0.8 = 1,280 m3/year</p>
                <p className="mt-2"><span className="text-white/60">WC demand (200 people):</span> 200 x 6 flushes x 4L x 250 days = 1,200 m3/year</p>
                <p className="text-green-400 mt-2">Rainwater can supply approximately 100% of WC flushing demand</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Considerations for Recycled Water Systems</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pipework marking:</strong> Non-potable pipework must be clearly identified (green with black text)</li>
                <li className="pl-1"><strong>Backflow prevention:</strong> Type AA or AB air gap for mains water backup connections</li>
                <li className="pl-1"><strong>Storage sizing:</strong> Balance between yield capture and demand matching</li>
                <li className="pl-1"><strong>Overflow:</strong> Connected to surface water drainage (not foul)</li>
                <li className="pl-1"><strong>Controls:</strong> Automatic switchover to mains when recycled water depleted</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Regulatory note:</strong> Recycled water systems must comply with Water Supply (Water Fittings) Regulations and WRAS requirements. Building Control notification is required for all non-potable water systems.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Water Calculator Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Office building, 500 occupants, calculate water consumption improvement.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Fitting Schedule:</p>
                <p className="mt-2">WCs (50 nr) | Baseline 6.0L | Proposed 4.5/3.0L dual (effective 2.5L)</p>
                <p>WHB taps (60 nr) | Baseline 6 l/min | Proposed 4 l/min spray taps</p>
                <p>Urinals (20 nr) | Baseline 7.5 l/bowl/hr | Proposed waterless</p>
                <p>Kitchen taps (5 nr) | Baseline 12 l/min | Proposed 8 l/min</p>
                <p className="mt-2">Annual consumption calculation (simplified):</p>
                <p>Baseline: 4,500 m3/year</p>
                <p>Proposed: 1,800 m3/year</p>
                <p className="mt-2 text-green-400">Improvement: (4,500 - 1,800) / 4,500 = 60%</p>
                <p className="text-green-400">Result: 5 credits achieved (exceeds 55% threshold)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Sub-metering Strategy</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Develop metering strategy for mixed-use building (retail + office).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Metering hierarchy:</p>
                <p className="mt-2">Level 1 - Building main</p>
                <p className="ml-4">M1: Pulsed meter + leak detection on incoming main</p>
                <p className="mt-2">Level 2 - Major use types</p>
                <p className="ml-4">M2: Office floors (combined)</p>
                <p className="ml-4">M3: Retail units (combined)</p>
                <p className="ml-4">M4: Common areas/WCs</p>
                <p className="mt-2">Level 3 - Specific uses</p>
                <p className="ml-4">M5: Cooling towers (if present)</p>
                <p className="ml-4">M6: External/irrigation</p>
                <p className="mt-2 text-green-400">Verification: M1 = M2 + M3 + M4 + M5 + M6 (within tolerance)</p>
                <p className="text-green-400">Result: 2 credits for comprehensive sub-metering</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Rainwater System Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size rainwater harvesting system for school building.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Building data:</p>
                <p className="ml-4">Roof catchment: 1,500 m2</p>
                <p className="ml-4">Annual rainfall: 700 mm</p>
                <p className="ml-4">Students + staff: 400</p>
                <p className="ml-4">Operating days: 190/year</p>
                <p className="mt-2">Yield calculation:</p>
                <p className="ml-4">Annual yield: 1,500 x 0.7 x 0.8 = 840 m3</p>
                <p className="ml-4">Daily average: 840 / 365 = 2.3 m3/day</p>
                <p className="mt-2">Demand calculation (WC flushing):</p>
                <p className="ml-4">400 users x 3 flushes x 4L = 4,800 L/day = 4.8 m3/day</p>
                <p className="mt-2">Storage sizing (18 days cover):</p>
                <p className="ml-4">2.3 x 18 = 41 m3 minimum tank capacity</p>
                <p className="mt-2 text-green-400">Supply ratio: 840 / (4.8 x 190) = 92% of WC demand</p>
                <p className="text-green-400">Enter 774 m3 alternative water in BREEAM calculator</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Evidence Requirements Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Design stage:</strong> Completed BREEAM water calculator, sanitary fitting schedules, metering schematics</li>
                <li className="pl-1"><strong>Post-construction:</strong> Product data sheets confirming flow rates, commissioning records for meters</li>
                <li className="pl-1"><strong>Leak detection:</strong> System specification, commissioning certificate, BMS alarm configuration</li>
                <li className="pl-1"><strong>Water recycling:</strong> System design, treatment specification, mains backup arrangement</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">WHB tap baseline: <strong>6 l/min</strong>, best practice: <strong>4 l/min</strong></li>
                <li className="pl-1">Shower baseline: <strong>10 l/min</strong>, best practice: <strong>6 l/min</strong></li>
                <li className="pl-1">WC effective flush: <strong>(Full + Reduced) / 3</strong></li>
                <li className="pl-1">Leak detection sensitivity: <strong>1 litre/minute</strong></li>
                <li className="pl-1">Maximum credits (Wat 01): <strong>55% improvement = 5 credits</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Incorrect flush calculation:</strong> Using average instead of effective flush formula</li>
                <li className="pl-1"><strong>Missing sub-meters:</strong> Failing to meter all major water uses</li>
                <li className="pl-1"><strong>Inadequate leak detection:</strong> System cannot detect 1 l/min flows</li>
                <li className="pl-1"><strong>No mains backup:</strong> Recycled water systems without automatic switchover</li>
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
                <p className="font-medium text-white mb-1">Wat 01 Credit Thresholds</p>
                <ul className="space-y-0.5">
                  <li>12.5% improvement = 1 credit</li>
                  <li>25% improvement = 2 credits</li>
                  <li>40% improvement = 3 credits</li>
                  <li>50% improvement = 4 credits</li>
                  <li>55% improvement = 5 credits</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Best Practice Flow Rates</p>
                <ul className="space-y-0.5">
                  <li>WHB taps: 4 l/min or less</li>
                  <li>Showers: 6 l/min or less</li>
                  <li>Kitchen taps: 8 l/min or less</li>
                  <li>WC effective flush: 4.0 litres or less</li>
                  <li>Urinals: Waterless or demand flush</li>
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
            <Link to="../h-n-c-module6-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module6-section3-3">
              Next: BREEAM Pollution Category
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section3_2;
