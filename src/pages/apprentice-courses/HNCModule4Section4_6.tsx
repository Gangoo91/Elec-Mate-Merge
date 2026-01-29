import { ArrowLeft, Leaf, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Energy Efficient Lighting - HNC Module 4 Section 4.6";
const DESCRIPTION = "Master energy efficient lighting design for building services: LED selection criteria, efficacy targets, Part L requirements, controls strategies, and LENI calculations for compliance.";

const quickCheckQuestions = [
  {
    id: "led-efficacy",
    question: "What is a typical efficacy for modern commercial LED luminaires?",
    options: ["50 lm/W", "80 lm/W", "120-150 lm/W", "200 lm/W"],
    correctIndex: 2,
    explanation: "Modern commercial LED luminaires typically achieve 120-150 lumens per watt efficacy. This is a significant improvement over fluorescent (60-100 lm/W) and has driven the rapid adoption of LED technology in building services."
  },
  {
    id: "part-l-efficacy",
    question: "What is the minimum luminaire efficacy required by Part L for general lighting?",
    options: ["50 llm/W", "70 llm/W", "95 llm/W", "120 llm/W"],
    correctIndex: 2,
    explanation: "Part L 2021 requires minimum 95 luminaire lumens per circuit-watt for general lighting in new buildings. This is an increase from the previous 60 llm/W requirement, reflecting improved LED technology."
  },
  {
    id: "leni-definition",
    question: "What does LENI measure in building performance?",
    options: [
      "Luminaire efficiency",
      "Annual lighting energy consumption per unit floor area",
      "Light level uniformity",
      "Lamp lumen maintenance"
    ],
    correctIndex: 1,
    explanation: "LENI (Lighting Energy Numeric Indicator) measures annual lighting energy consumption in kWh per square metre per year (kWh/m²/year). It enables comparison between buildings and verification of Part L compliance."
  },
  {
    id: "controls-savings",
    question: "What combined energy saving can typically be achieved with occupancy and daylight controls?",
    options: ["10-20%", "30-40%", "50-70%", "80-90%"],
    correctIndex: 2,
    explanation: "Combined occupancy detection and daylight-linked dimming typically achieves 50-70% energy savings compared to manually controlled lighting. This assumes well-designed, properly commissioned controls in appropriate applications."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does L70 mean when specifying LED lamp life?",
    options: [
      "70,000 hours total life",
      "70% of luminaires will still be working",
      "Output has reduced to 70% of initial",
      "70% power consumption"
    ],
    correctAnswer: 2,
    explanation: "L70 is the rated life at which light output has depreciated to 70% of initial lumens. For example, L70 = 50,000 hours means the LED will produce 70% of its initial output after 50,000 hours of operation."
  },
  {
    id: 2,
    question: "What is the formula for calculating LENI?",
    options: [
      "LENI = Total power / Floor area",
      "LENI = (Installed power × Annual hours × Controls factor) / Floor area",
      "LENI = Lumens / Watts",
      "LENI = Illuminance × Area × Hours"
    ],
    correctAnswer: 1,
    explanation: "LENI = W × (tD × FD × FO) + (tN × FO) divided by floor area, where W is installed power, tD/tN are day/night hours, FD is daylight factor, and FO is occupancy factor. This accounts for controls savings."
  },
  {
    id: 3,
    question: "What Part L requirement relates to lighting controls in spaces over 30m²?",
    options: [
      "Time scheduling only",
      "Occupancy sensing and/or daylight dimming",
      "Manual switching only",
      "No specific requirement"
    ],
    correctAnswer: 1,
    explanation: "Part L requires presence/absence detection in office spaces over 30m². Additionally, daylight-linked dimming is required for luminaires within 3m of windows. These measures are credited in LENI calculations."
  },
  {
    id: 4,
    question: "What is the typical payback period for LED retrofit in a commercial building?",
    options: ["1-2 years", "2-4 years", "5-7 years", "10+ years"],
    correctAnswer: 1,
    explanation: "LED retrofits typically achieve payback in 2-4 years through energy savings and reduced maintenance. Actual payback depends on operating hours, existing system efficiency, and electricity costs."
  },
  {
    id: 5,
    question: "Why is colour rendering index (CRI) important when selecting energy efficient lighting?",
    options: [
      "Higher CRI means higher efficacy",
      "CRI affects energy consumption directly",
      "Good CRI ensures visual quality despite lower illuminance",
      "CRI determines lamp life"
    ],
    correctAnswer: 2,
    explanation: "Good CRI (Ra ≥ 80) maintains visual quality even when optimising for energy efficiency. Lower illuminance may be acceptable with good colour rendering. Specifying CRI prevents sacrificing visual quality for efficiency."
  },
  {
    id: 6,
    question: "What is the purpose of constant light output (CLO) control?",
    options: [
      "Maintaining colour temperature",
      "Compensating for lamp depreciation to save energy",
      "Emergency lighting backup",
      "Preventing flicker"
    ],
    correctAnswer: 1,
    explanation: "CLO starts LEDs at reduced power when new, gradually increasing output as lumen depreciation occurs. This maintains consistent illuminance while saving energy over the lamp life (typically 10-15% saving)."
  },
  {
    id: 7,
    question: "What does 'parasitic power' refer to in lighting systems?",
    options: [
      "Power consumed by controls, sensors and standby",
      "Power lost as heat in luminaires",
      "Emergency lighting power",
      "Motor power in automated blinds"
    ],
    correctAnswer: 0,
    explanation: "Parasitic power is consumed by controls, sensors, and luminaires in standby mode even when lights are off. LENI calculations include parasitic loads. Well-designed systems minimise parasitic consumption."
  },
  {
    id: 8,
    question: "What approach does Part L recommend for demonstrating lighting compliance?",
    options: [
      "Prescriptive power density only",
      "LENI calculation with target benchmarks",
      "Visual inspection only",
      "Manufacturer certification"
    ],
    correctAnswer: 1,
    explanation: "Part L uses LENI to demonstrate compliance against benchmark values. The calculation accounts for installed power, operating hours, and control factors. The result must not exceed the target LENI for the building type."
  },
  {
    id: 9,
    question: "What is a typical LENI target for a new office building?",
    options: [
      "10 kWh/m²/year",
      "25 kWh/m²/year",
      "50 kWh/m²/year",
      "100 kWh/m²/year"
    ],
    correctAnswer: 1,
    explanation: "Typical LENI targets for new offices are around 25 kWh/m²/year. This assumes modern LED luminaires, good controls, and reasonable operating hours. Actual values vary by building type and use pattern."
  },
  {
    id: 10,
    question: "What LED driver feature improves energy efficiency at reduced light levels?",
    options: [
      "Emergency backup",
      "DALI compatibility",
      "High power factor at all dim levels",
      "Wireless connectivity"
    ],
    correctAnswer: 2,
    explanation: "Maintaining high power factor across the dimming range ensures efficient power conversion even at low light levels. Poor drivers may have reduced efficiency when dimmed, wasting energy. Specify quality drivers for dimming applications."
  }
];

const faqs = [
  {
    question: "How do I balance efficacy with other lighting quality factors?",
    answer: "Don't sacrifice visual quality for efficiency alone. Specify minimum CRI (Ra ≥ 80 for offices, Ra ≥ 90 for colour-critical), appropriate colour temperature, good glare control (UGR), and adequate illuminance. Modern high-efficacy LEDs can achieve all these requirements. The most efficient lamp is not always the best choice if it compromises visual comfort."
  },
  {
    question: "What are the key factors in selecting LED luminaires for retrofit?",
    answer: "Consider: existing mounting and ceiling system compatibility, electrical supply requirements, control system integration (DALI, 1-10V), thermal management (LED life affected by temperature), optical distribution match to room geometry, aesthetic match to building character, warranty and manufacturer support. Also verify electrical installation will support new luminaires without rewiring."
  },
  {
    question: "How does Part L treat display lighting differently?",
    answer: "Display lighting in retail has separate requirements recognising higher illuminance needs. The efficacy requirement may be relaxed, but the overall LENI target still applies. Accent and feature lighting should use efficient sources where possible. Emergency lighting and external lighting also have separate provisions."
  },
  {
    question: "What documentation is required for Part L lighting compliance?",
    answer: "Submit: LENI calculation showing compliance with target, luminaire schedules with efficacy data, controls specification and commissioning evidence, photometric calculations demonstrating illuminance requirements met, and declarations that the installation complies with the specification. Building control may request evidence during final inspection."
  },
  {
    question: "How do I calculate annual operating hours for LENI?",
    answer: "Use BS EN 15193-1 Annex F which provides standard annual operating hours by building type. For example, offices typically use 2500 daylight hours and 250 non-daylight hours. Actual values should reflect the specific building usage pattern. Controls factors (FD for daylight, FO for occupancy) further modify effective operating hours."
  },
  {
    question: "What is the role of commissioning in achieving energy efficient lighting?",
    answer: "Commissioning is essential - controls only save energy when properly set up. Commission daylight sensors in representative conditions, adjust time schedules to actual use patterns, set appropriate hold-on times for occupancy sensors, verify scene settings match requirements, and train building operators. Poor commissioning can result in controls being overridden or bypassed."
  }
];

const HNCModule4Section4_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Leaf className="h-4 w-4" />
            <span>Module 4.4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Efficient Lighting
          </h1>
          <p className="text-white/80">
            Designing sustainable lighting systems that meet Part L requirements while maintaining visual quality
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>LED efficacy:</strong> 120-150 lm/W typical</li>
              <li className="pl-1"><strong>Part L minimum:</strong> 95 luminaire lm/W</li>
              <li className="pl-1"><strong>LENI:</strong> kWh/m²/year metric for compliance</li>
              <li className="pl-1"><strong>Controls:</strong> 50-70% savings potential</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Strategies</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>High-efficacy LEDs:</strong> Maximise lumens per watt</li>
              <li className="pl-1"><strong>Smart controls:</strong> Occupancy + daylight linking</li>
              <li className="pl-1"><strong>Task-ambient:</strong> Light where needed</li>
              <li className="pl-1"><strong>CLO:</strong> Constant light output control</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select LED luminaires based on efficacy and quality criteria",
              "Understand Part L requirements for lighting installations",
              "Calculate LENI for compliance demonstration",
              "Design control strategies for maximum energy savings",
              "Apply constant light output and other efficiency features",
              "Document and commission energy efficient lighting systems"
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

        {/* Section 1: LED Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            LED Selection and Efficacy Targets
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LED technology has transformed lighting energy efficiency. Modern LEDs achieve efficacies
              that were unthinkable with traditional sources, while providing excellent colour quality
              and controllability. Selecting the right LED involves balancing efficacy with other
              quality parameters.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key LED selection criteria:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Efficacy (lm/W):</strong> Higher is better, but not at expense of quality</li>
                <li className="pl-1"><strong>CRI (Ra):</strong> Minimum 80 for offices, 90 for colour-critical</li>
                <li className="pl-1"><strong>CCT:</strong> Appropriate colour temperature for application</li>
                <li className="pl-1"><strong>L70 life:</strong> Rated hours to 70% lumen maintenance</li>
                <li className="pl-1"><strong>Warranty:</strong> Minimum 5 years for commercial applications</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Light Source Efficacy Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Source Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Efficacy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical CRI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Incandescent</td>
                      <td className="border border-white/10 px-3 py-2">10-15 lm/W</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Halogen</td>
                      <td className="border border-white/10 px-3 py-2">15-25 lm/W</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent T8</td>
                      <td className="border border-white/10 px-3 py-2">60-80 lm/W</td>
                      <td className="border border-white/10 px-3 py-2">80-90</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fluorescent T5</td>
                      <td className="border border-white/10 px-3 py-2">80-100 lm/W</td>
                      <td className="border border-white/10 px-3 py-2">80-90</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED (standard)</td>
                      <td className="border border-white/10 px-3 py-2">100-130 lm/W</td>
                      <td className="border border-white/10 px-3 py-2">80-90</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED (high efficacy)</td>
                      <td className="border border-white/10 px-3 py-2">150-200 lm/W</td>
                      <td className="border border-white/10 px-3 py-2">80-90</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Life Rating (Lumen Maintenance)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>L70:</strong> Hours until 70% of initial lumens (common rating)</li>
                <li className="pl-1"><strong>L80:</strong> Hours until 80% of initial lumens (premium rating)</li>
                <li className="pl-1"><strong>B10:</strong> 10% of population will fall below L value</li>
                <li className="pl-1">Example: L70B10 = 50,000h means 90% of LEDs will still produce 70% output at 50,000h</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Specification tip:</strong> Request IES TM-21 projections for LED life claims. Be wary of manufacturers claiming very long lives without supporting test data.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Part L Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Part L Requirements for Lighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Approved Document L sets mandatory requirements for lighting energy
              efficiency in new and refurbished buildings. Compliance is demonstrated through the
              LENI (Lighting Energy Numeric Indicator) calculation methodology.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part L Lighting Requirements Summary</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Minimum luminaire efficacy (general)</td>
                      <td className="border border-white/10 px-3 py-2">95 luminaire lumens/circuit-watt</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Minimum luminaire efficacy (display)</td>
                      <td className="border border-white/10 px-3 py-2">70 luminaire lumens/circuit-watt</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External lighting efficacy</td>
                      <td className="border border-white/10 px-3 py-2">70 luminaire lumens/circuit-watt</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupancy control (spaces &gt;30m²)</td>
                      <td className="border border-white/10 px-3 py-2">Required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daylight control (within 3m of windows)</td>
                      <td className="border border-white/10 px-3 py-2">Required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Local manual switching</td>
                      <td className="border border-white/10 px-3 py-2">Accessible from task position</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lighting Zones (Part L)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Perimeter zone:</strong> Within 3m of external windows</li>
                  <li className="pl-1"><strong>Core zone:</strong> Areas without significant daylight</li>
                  <li className="pl-1"><strong>Circulation:</strong> Corridors, stairs, lobbies</li>
                  <li className="pl-1"><strong>Task areas:</strong> Workstations, desks</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Perimeter: Daylight-linked dimming</li>
                  <li className="pl-1">Spaces &gt;30m²: Occupancy detection</li>
                  <li className="pl-1">All areas: Manual override capability</li>
                  <li className="pl-1">External: Photocell + time scheduling</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> Part L requirements vary between new buildings, extensions, and refurbishments. Check the specific requirements for your project type in the current Approved Document L.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: LENI Calculation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            LENI Calculations for Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              LENI (Lighting Energy Numeric Indicator) is the method used to demonstrate Part L compliance.
              It calculates annual lighting energy consumption per unit floor area, accounting for
              installed power, operating hours, and control system effectiveness.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LENI Calculation Formula (BS EN 15193-1)</p>
              <p className="font-mono text-center text-lg mb-4">LENI = W × (t<sub>D</sub> × F<sub>D</sub> × F<sub>O</sub>) + (t<sub>N</sub> × F<sub>O</sub>) / A</p>
              <div className="text-sm">
                <ul className="space-y-1">
                  <li><strong>W</strong> = Total installed lighting power (W)</li>
                  <li><strong>t<sub>D</sub></strong> = Annual daylight time hours</li>
                  <li><strong>t<sub>N</sub></strong> = Annual non-daylight time hours</li>
                  <li><strong>F<sub>D</sub></strong> = Daylight dependency factor (0-1)</li>
                  <li><strong>F<sub>O</sub></strong> = Occupancy dependency factor (0-1)</li>
                  <li><strong>A</strong> = Floor area (m²)</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical LENI Targets by Building Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">LENI Target</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (air-conditioned)</td>
                      <td className="border border-white/10 px-3 py-2">25 kWh/m²/year</td>
                      <td className="border border-white/10 px-3 py-2">Typical 2500 operating hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Office (naturally ventilated)</td>
                      <td className="border border-white/10 px-3 py-2">22 kWh/m²/year</td>
                      <td className="border border-white/10 px-3 py-2">More daylight opportunity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail (non-food)</td>
                      <td className="border border-white/10 px-3 py-2">45 kWh/m²/year</td>
                      <td className="border border-white/10 px-3 py-2">Higher display lighting load</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Warehouse</td>
                      <td className="border border-white/10 px-3 py-2">15 kWh/m²/year</td>
                      <td className="border border-white/10 px-3 py-2">Lower illuminance, good height</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">School</td>
                      <td className="border border-white/10 px-3 py-2">18 kWh/m²/year</td>
                      <td className="border border-white/10 px-3 py-2">Limited occupied hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital (24hr areas)</td>
                      <td className="border border-white/10 px-3 py-2">55 kWh/m²/year</td>
                      <td className="border border-white/10 px-3 py-2">Continuous operation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Factors for LENI</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>F<sub>O</sub> (Occupancy):</strong> 0.9-1.0 (manual), 0.7-0.9 (presence), 0.6-0.8 (absence)</li>
                <li className="pl-1"><strong>F<sub>D</sub> (Daylight):</strong> 0.5-0.7 (dimming within 3m), 0.8-0.9 (switching), 1.0 (no control)</li>
                <li className="pl-1">Lower factors = better controls = lower LENI</li>
                <li className="pl-1">Must be supported by compliant control specification</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> LENI calculation must use actual installed power, not design allowance. Verify luminaire quantities and wattages match the as-installed condition.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Control Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Controls Strategy for Energy Efficiency
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting controls are essential for achieving energy efficiency targets. The right
              combination of occupancy sensing, daylight linking, scheduling, and constant light
              output can deliver savings of 50-70% compared to manually controlled systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Control Strategy Energy Savings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Control Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Saving</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Presence detection (auto on/off)</td>
                      <td className="border border-white/10 px-3 py-2">20-30%</td>
                      <td className="border border-white/10 px-3 py-2">Toilets, corridors, stores</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Absence detection (manual on)</td>
                      <td className="border border-white/10 px-3 py-2">30-50%</td>
                      <td className="border border-white/10 px-3 py-2">Offices, meeting rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daylight-linked dimming</td>
                      <td className="border border-white/10 px-3 py-2">20-40%</td>
                      <td className="border border-white/10 px-3 py-2">Perimeter zones (within 6m)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Time scheduling</td>
                      <td className="border border-white/10 px-3 py-2">10-20%</td>
                      <td className="border border-white/10 px-3 py-2">All areas with fixed schedules</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Constant light output (CLO)</td>
                      <td className="border border-white/10 px-3 py-2">10-15%</td>
                      <td className="border border-white/10 px-3 py-2">Areas with long operating hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Task-ambient lighting</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">Open plan offices</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Constant Light Output (CLO)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">New LEDs start at reduced power (~80%)</li>
                  <li className="pl-1">Output increases as lumens depreciate</li>
                  <li className="pl-1">Maintains consistent illuminance</li>
                  <li className="pl-1">Saves 10-15% over luminaire life</li>
                  <li className="pl-1">Requires DALI or compatible dimming</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Task-Ambient Approach</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Lower ambient level (300 lux typical)</li>
                  <li className="pl-1">Task lighting at workstations (500 lux)</li>
                  <li className="pl-1">User control of task light</li>
                  <li className="pl-1">Reduces total installed power</li>
                  <li className="pl-1">Provides individual control</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Set daylight sensor target illuminance and verify response</li>
                <li className="pl-1">Adjust occupancy sensor sensitivity and time delays</li>
                <li className="pl-1">Configure time schedules to match actual building use</li>
                <li className="pl-1">Enable and verify CLO functionality</li>
                <li className="pl-1">Test scene settings and document for users</li>
                <li className="pl-1">Provide building operator training</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Controls only save energy when properly commissioned. Budget adequate time and resource for setup and user training. Monitor post-occupancy to verify performance.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: LENI Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Calculate LENI for a 500m² office with 5kW installed lighting, daylight dimming and absence detection.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given data:</p>
                <p>- Floor area (A) = 500m²</p>
                <p>- Installed power (W) = 5000W</p>
                <p>- Operating hours: tD = 2250h, tN = 250h (from BS EN 15193)</p>
                <p>- FD = 0.6 (daylight dimming)</p>
                <p>- FO = 0.7 (absence detection)</p>
                <p className="mt-2">LENI = W × [(tD × FD × FO) + (tN × FO)] / A</p>
                <p className="mt-2">= 5000 × [(2250 × 0.6 × 0.7) + (250 × 0.7)] / 500</p>
                <p>= 5000 × [945 + 175] / 500</p>
                <p>= 5000 × 1120 / 500</p>
                <p>= 5,600,000 / 500</p>
                <p>= <strong>11,200 Wh/m²/year = 11.2 kWh/m²/year</strong></p>
                <p className="mt-2">Target for office: 25 kWh/m²/year</p>
                <p className="text-green-400">✓ COMPLIANT (11.2 &lt; 25)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Part L Efficacy Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A luminaire produces 4000 luminaire lumens and consumes 38W (including driver). Does it comply?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Luminaire efficacy = Luminaire lumens / Circuit watts</p>
                <p>= 4000 / 38</p>
                <p>= <strong>105 luminaire lm/W</strong></p>
                <p className="mt-2">Part L minimum (general lighting): 95 llm/W</p>
                <p className="mt-2 text-green-400">✓ COMPLIANT (105 &gt; 95)</p>
                <p className="mt-2 text-white/60">Note: Circuit watts includes driver/control gear losses</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Control Strategy Energy Saving</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Estimate annual energy saving from adding absence detection to a 10kW office lighting load.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Base case (manual control): FO = 1.0</p>
                <p>With absence detection: FO = 0.7</p>
                <p className="mt-2">Annual hours: 2500h</p>
                <p className="mt-2">Base energy = 10kW × 2500h × 1.0 = 25,000 kWh/year</p>
                <p>With controls = 10kW × 2500h × 0.7 = 17,500 kWh/year</p>
                <p className="mt-2">Saving = 25,000 - 17,500 = <strong>7,500 kWh/year</strong></p>
                <p>= <strong>30% reduction</strong></p>
                <p className="mt-2 text-white/60">At £0.30/kWh = £2,250/year cost saving</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design for Efficiency Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Specify high-efficacy LEDs (≥100 lm/W system)</li>
                <li className="pl-1">Design to target illuminance (avoid over-lighting)</li>
                <li className="pl-1">Maximise daylight contribution where possible</li>
                <li className="pl-1">Zone controls appropriately (perimeter/core/task)</li>
                <li className="pl-1">Include CLO for areas with long operating hours</li>
                <li className="pl-1">Calculate LENI to verify compliance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Documentation</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">LENI calculation with assumptions</li>
                <li className="pl-1">Luminaire schedule with efficacy data</li>
                <li className="pl-1">Controls specification and zone drawings</li>
                <li className="pl-1">Commissioning records and certificates</li>
                <li className="pl-1">Building log book information</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring parasitic loads:</strong> Include standby power in calculations</li>
                <li className="pl-1"><strong>Poor commissioning:</strong> Controls need proper setup to save energy</li>
                <li className="pl-1"><strong>Over-lighting:</strong> Designing above required illuminance wastes energy</li>
                <li className="pl-1"><strong>Wrong control factors:</strong> Use realistic FD and FO values</li>
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
                <p className="font-medium text-white mb-1">Part L Requirements</p>
                <ul className="space-y-0.5">
                  <li>General efficacy: ≥95 llm/W</li>
                  <li>Display efficacy: ≥70 llm/W</li>
                  <li>Occupancy: spaces &gt;30m²</li>
                  <li>Daylight: within 3m of windows</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Savings</p>
                <ul className="space-y-0.5">
                  <li>Absence detection: 30-50%</li>
                  <li>Daylight linking: 20-40%</li>
                  <li>Combined: 50-70%</li>
                  <li>CLO: 10-15%</li>
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
            <Link to="../h-n-c-module4-section4-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: External Lighting
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5">
              Next: Section 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section4_6;
