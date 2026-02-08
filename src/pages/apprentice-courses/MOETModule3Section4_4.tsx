import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Energy-Efficient Lighting Technologies - MOET Module 3.4.4";
const DESCRIPTION = "Comprehensive guide to energy-efficient lighting technologies for maintenance technicians: LED technology, efficacy, colour temperature, CRI, LED drivers, retrofit vs new-build, payback calculations, smart lighting, IoT integration and lamp disposal under ST1426.";

const quickCheckQuestions = [
  {
    id: "led-efficacy",
    question: "What is luminous efficacy and how is it measured?",
    options: [
      "The brightness of a lamp measured in watts",
      "The ratio of luminous flux (lumens) to power consumed (watts), measured in lm/W",
      "The colour temperature of the light output",
      "The lifespan of the lamp in hours"
    ],
    correctIndex: 1,
    explanation: "Luminous efficacy is the ratio of luminous flux (measured in lumens) to the electrical power consumed (measured in watts), expressed as lm/W. It is the primary measure of how efficiently a light source converts electrical energy into visible light. Modern LED lamps achieve efficacies of 100-200 lm/W, compared with approximately 15 lm/W for incandescent lamps."
  },
  {
    id: "cct",
    question: "A colour temperature of 4000 K would be described as:",
    options: [
      "Warm white (yellowish)",
      "Cool white (neutral)",
      "Daylight (bluish-white)",
      "Ultra-warm (amber)"
    ],
    correctIndex: 1,
    explanation: "4000 K is classified as cool white or neutral white. Colour temperature is measured in Kelvin (K) and describes the appearance of the light: 2700-3000 K is warm white (yellowish, similar to incandescent), 4000 K is cool white (neutral, commonly used in offices), and 5000-6500 K is daylight (bluish-white, used in task and industrial areas)."
  },
  {
    id: "cri",
    question: "What does a CRI (Colour Rendering Index) of 90 indicate?",
    options: [
      "The lamp is 90% efficient",
      "The lamp renders colours very accurately compared to a reference light source",
      "The lamp has a colour temperature of 90 K",
      "The lamp will last 90,000 hours"
    ],
    correctIndex: 1,
    explanation: "A CRI of 90 indicates excellent colour rendering — objects illuminated by this lamp will appear very close to their true colours as seen under a reference light source (natural daylight or incandescent lamp, depending on the colour temperature). CRI ranges from 0 to 100, with 80+ considered good for general use and 90+ considered excellent for colour-critical applications."
  },
  {
    id: "mercury-disposal",
    question: "Why must fluorescent lamps be disposed of as hazardous waste?",
    options: [
      "They contain lead in the glass",
      "They contain mercury vapour which is toxic",
      "They are radioactive",
      "They contain asbestos"
    ],
    correctIndex: 1,
    explanation: "Fluorescent lamps (tubes and CFLs) contain mercury vapour, which is a toxic heavy metal. When a fluorescent lamp breaks, mercury vapour is released. Under the WEEE Regulations and Hazardous Waste Regulations, fluorescent lamps must be collected separately and recycled through specialist contractors who can safely recover the mercury. They must never be placed in general waste."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Compared to a 100 W incandescent lamp, an LED lamp producing the same luminous flux (approximately 1,500 lumens) typically consumes:",
    options: [
      "80-90 W",
      "40-60 W",
      "10-15 W",
      "1-2 W"
    ],
    correctAnswer: 2,
    explanation: "An LED lamp producing approximately 1,500 lumens (equivalent to a 100 W incandescent) typically consumes only 10-15 W, representing an energy saving of 85-90%. This dramatic improvement in efficacy is the primary driver for the widespread adoption of LED technology in both new installations and retrofit applications."
  },
  {
    id: 2,
    question: "What is the typical rated life of a quality commercial LED luminaire?",
    options: [
      "5,000 hours",
      "10,000-15,000 hours",
      "50,000-100,000 hours",
      "500,000 hours"
    ],
    correctAnswer: 2,
    explanation: "Quality commercial LED luminaires typically have a rated life of 50,000-100,000 hours (L70), meaning the LED will produce at least 70% of its initial light output at the rated hour point. At 12 hours per day operation, 50,000 hours equates to approximately 11 years. This significantly exceeds the life of fluorescent (15,000-20,000 hours) and incandescent (1,000-2,000 hours) lamps."
  },
  {
    id: 3,
    question: "An LED driver performs which function?",
    options: [
      "Increases the light output of the LED",
      "Converts the mains AC supply to the regulated DC current required by the LED",
      "Controls the colour temperature of the LED",
      "Provides emergency battery backup"
    ],
    correctAnswer: 1,
    explanation: "An LED driver converts the mains AC supply (230 V, 50 Hz) to the regulated DC current required by the LED module. LEDs are current-driven devices — they require a constant current (typically 350 mA, 500 mA or 700 mA) at a specific voltage. The driver also provides power factor correction, surge protection and, in dimmable versions, the interface for dimming control (DALI, 1-10 V, etc.)."
  },
  {
    id: 4,
    question: "When retrofitting LED lamps into existing fluorescent luminaires, what must be considered regarding the existing control gear?",
    options: [
      "Nothing — LED lamps are direct replacements in all cases",
      "The existing ballast must be bypassed or the LED tube must be compatible with the existing ballast type",
      "The luminaire must always be completely replaced",
      "Only the starter needs to be replaced"
    ],
    correctAnswer: 1,
    explanation: "LED retrofit tubes are available in several types: those that work with the existing magnetic ballast (with starter replacement), those that work with existing electronic ballasts, and those that require the ballast to be bypassed (direct mains connection). Using the wrong type can cause flickering, reduced lamp life, overheating or failure. Always check compatibility and follow the manufacturer's instructions."
  },
  {
    id: 5,
    question: "The 'L70' rating of an LED indicates:",
    options: [
      "The LED operates at 70% power",
      "The point at which the LED output has depreciated to 70% of its initial lumens",
      "The LED has a CRI of 70",
      "The LED operates at 70°C maximum"
    ],
    correctAnswer: 1,
    explanation: "L70 is the industry standard measure of LED lumen depreciation. It indicates the number of hours at which the LED's light output has fallen to 70% of its initial value. For example, L70 = 50,000 hours means the LED will still produce 70% of its original lumens after 50,000 hours of operation. This gradual depreciation (rather than sudden failure) is a key characteristic of LED technology."
  },
  {
    id: 6,
    question: "Which lighting control strategy typically provides the greatest energy saving in a daylit office?",
    options: [
      "Manual switching only",
      "Time-clock scheduling",
      "Daylight-linked dimming with occupancy sensing",
      "Constant-output lighting"
    ],
    correctAnswer: 2,
    explanation: "Daylight-linked dimming combined with occupancy sensing provides the greatest energy savings — typically 50-70% compared to manually switched constant-output lighting. The daylight sensor reduces artificial light output as natural daylight increases, while the occupancy sensor switches off or dims lights in unoccupied areas. Together, they ensure lighting energy is used only when and where it is needed."
  },
  {
    id: 7,
    question: "A simple payback calculation for an LED retrofit project divides:",
    options: [
      "The total energy saving by the installation cost",
      "The total installation cost by the annual energy cost saving",
      "The lamp life by the number of lamps",
      "The wattage reduction by the electricity tariff"
    ],
    correctAnswer: 1,
    explanation: "Simple payback period = Total installation cost / Annual energy cost saving. For example, if an LED retrofit costs £10,000 and saves £4,000 per year in energy costs, the simple payback period is 2.5 years. More sophisticated calculations also consider maintenance cost savings (fewer lamp replacements), carbon reduction, and the time value of money (discounted payback or NPV)."
  },
  {
    id: 8,
    question: "Smart lighting systems using IoT (Internet of Things) can provide which additional benefit beyond energy saving?",
    options: [
      "Increased light output from each luminaire",
      "Space utilisation data, occupancy analytics and environmental monitoring",
      "Reduced installation costs",
      "Elimination of the need for emergency lighting"
    ],
    correctAnswer: 1,
    explanation: "IoT-enabled smart lighting systems incorporate sensors that collect data on occupancy patterns, space utilisation, temperature, humidity and air quality. This data can be used for facilities management, workspace planning, HVAC optimisation and compliance monitoring. The luminaire becomes a platform for building intelligence, not just a light source. Maintenance teams can receive real-time fault notifications."
  },
  {
    id: 9,
    question: "What is the primary advantage of LED technology for maintenance compared to fluorescent?",
    options: [
      "LEDs are cheaper to purchase",
      "LEDs have significantly longer life, reducing lamp replacement frequency and maintenance costs",
      "LEDs do not require any electrical connection",
      "LEDs can be disposed of in general waste"
    ],
    correctAnswer: 1,
    explanation: "The significantly longer life of LEDs (50,000-100,000 hours vs 15,000-20,000 hours for fluorescent) dramatically reduces the frequency of lamp replacement, which is one of the largest ongoing maintenance costs in building lighting. In high-ceiling or difficult-access areas, the reduced replacement frequency also reduces the need for access equipment, working at height, and associated safety risks."
  },
  {
    id: 10,
    question: "Under the WEEE Regulations, which of the following lamps must be recycled through a specialist waste stream?",
    options: [
      "LED lamps only",
      "Incandescent lamps only",
      "Fluorescent tubes and compact fluorescent lamps (due to mercury content)",
      "Halogen lamps only"
    ],
    correctAnswer: 2,
    explanation: "Fluorescent tubes and compact fluorescent lamps (CFLs) contain mercury and must be recycled through specialist WEEE-compliant contractors. LED lamps also contain electronic components and should be recycled through WEEE routes, but they do not contain mercury. Incandescent and halogen lamps do not contain hazardous substances and can be disposed of in general waste, though recycling is preferred."
  },
  {
    id: 11,
    question: "Tunable white LED technology allows:",
    options: [
      "The LED to change between different colours (red, green, blue)",
      "The colour temperature (CCT) to be adjusted, for example from warm white to cool white",
      "The LED to operate at different voltages",
      "The CRI to be increased above 100"
    ],
    correctAnswer: 1,
    explanation: "Tunable white LED technology allows the colour temperature (CCT) to be adjusted across a range, typically from warm white (2700 K) to cool white (6500 K). This is achieved by mixing the output of warm and cool LED arrays. Tunable white systems are used in healthcare, education and workplaces to support circadian rhythm (human-centric lighting) and to adapt the lighting to different tasks and times of day."
  },
  {
    id: 12,
    question: "When specifying LED luminaires for a retrofit project, which parameter should be matched to the existing installation to maintain visual consistency?",
    options: [
      "The wattage of the existing lamps",
      "The colour temperature (CCT) and colour rendering index (CRI)",
      "The physical size of the ballast",
      "The manufacturer of the existing luminaires"
    ],
    correctAnswer: 1,
    explanation: "When retrofitting, the colour temperature (CCT) and CRI of the replacement LEDs should be matched to the existing installation to maintain visual consistency. Mismatched CCT creates an obviously different light appearance. Wattage is not the correct parameter to match — you should match the lumen output (lumens) not the power consumption (watts), as LEDs produce far more lumens per watt than the lamps they replace."
  }
];

const faqs = [
  {
    question: "Are LED lamps always a suitable replacement for fluorescent?",
    answer: "In most cases, yes — but compatibility must be checked. LED retrofit tubes must be compatible with the existing control gear (ballast) type. Some LED tubes work with magnetic ballasts, some with electronic ballasts, and some require the ballast to be bypassed entirely. Using the wrong type can cause flickering, overheating, or premature failure. For older luminaires, it is often more cost-effective and safer to replace the entire luminaire with a purpose-built LED unit rather than retrofitting LED tubes."
  },
  {
    question: "What is human-centric lighting?",
    answer: "Human-centric lighting (HCL) uses tunable white LED technology to adjust the colour temperature and intensity of artificial light throughout the day to support the human circadian rhythm. Cool, bright light (5000-6500 K) in the morning promotes alertness, while warm, dimmer light (2700-3000 K) in the evening supports relaxation and sleep preparation. HCL is increasingly specified in healthcare facilities, schools and offices to improve occupant wellbeing, productivity and sleep quality."
  },
  {
    question: "How do I calculate the energy saving from an LED retrofit?",
    answer: "Annual energy saving (kWh) = (Old wattage - New wattage) x Number of luminaires x Annual operating hours / 1000. Annual cost saving = kWh saving x Electricity unit rate (£/kWh). For example: replacing 100 x 58 W fluorescent fittings with 100 x 25 W LED panels, operating 2,500 hours/year: Saving = (58-25) x 100 x 2500 / 1000 = 8,250 kWh/year. At £0.30/kWh = £2,475/year. Include control gear losses (add approx. 15% to fluorescent wattage) for a more accurate calculation."
  },
  {
    question: "What is the difference between a constant-current and constant-voltage LED driver?",
    answer: "A constant-current driver maintains a fixed output current (e.g., 350 mA, 700 mA) regardless of the connected LED load — this is the most common type for commercial LED luminaires. A constant-voltage driver maintains a fixed output voltage (typically 12 V or 24 V DC) and is used for LED strip lighting and signage where multiple LEDs are connected in parallel. Using the wrong driver type will cause incorrect operation, flickering or damage to the LEDs."
  },
  {
    question: "Do LEDs generate heat?",
    answer: "Yes — LEDs generate heat, but primarily through conduction at the junction (not radiation like incandescent lamps). Effective heat management (heat sinking) is critical for LED performance and longevity. Excessive junction temperature reduces light output, shifts colour, and shortens LED life. This is why LED luminaires must not be covered or installed in enclosed spaces without adequate ventilation, and why thermal management is a key consideration in luminaire design."
  }
];

const MOETModule3Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy-Efficient Lighting Technologies
          </h1>
          <p className="text-white/80">
            LED technology, efficacy, colour metrics, smart controls and disposal
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>LED efficacy:</strong> 100-200 lm/W vs 15 lm/W incandescent</li>
              <li className="pl-1"><strong>LED life:</strong> 50,000-100,000 hours (L70) — up to 10x fluorescent</li>
              <li className="pl-1"><strong>CCT:</strong> 2700 K warm, 4000 K cool, 6500 K daylight</li>
              <li className="pl-1"><strong>Disposal:</strong> Fluorescent = hazardous waste (mercury); LED = WEEE</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Regulatory Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Building Regs Part L:</strong> Minimum lighting efficacy standards</li>
              <li className="pl-1"><strong>WEEE Regulations:</strong> Lamp disposal and recycling requirements</li>
              <li className="pl-1"><strong>EU Ecodesign:</strong> Phase-out of inefficient lighting products</li>
              <li className="pl-1"><strong>ST1426:</strong> Maintain energy-efficient systems, record data</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain LED technology principles including efficacy, CCT and CRI",
              "Compare LED performance with fluorescent and incandescent technologies",
              "Describe LED driver types and dimming compatibility",
              "Evaluate retrofit vs new-build LED options for different applications",
              "Calculate simple payback for LED lighting projects",
              "Explain smart lighting controls, IoT integration and lamp disposal requirements"
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
            LED Technology and Performance Metrics
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Light Emitting Diodes (LEDs) have revolutionised the lighting industry, offering dramatic
              improvements in energy efficiency, longevity and controllability compared to traditional
              light sources. For maintenance technicians, understanding LED technology is essential as
              the majority of new lighting installations and retrofit projects now specify LED luminaires.
            </p>
            <p>
              An LED is a semiconductor device that emits light when current flows through it. White light
              is typically produced by coating a blue LED chip with a yellow phosphor layer, which converts
              some of the blue light to yellow. The combination of blue and yellow creates the perception
              of white light. The composition of the phosphor determines the colour temperature and colour
              rendering properties of the LED.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Light Source Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Technology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficacy (lm/W)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rated Life (hrs)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">CRI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Incandescent</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                      <td className="border border-white/10 px-3 py-2">1,000-2,000</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Halogen</td>
                      <td className="border border-white/10 px-3 py-2">15-25</td>
                      <td className="border border-white/10 px-3 py-2">2,000-4,000</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CFL</td>
                      <td className="border border-white/10 px-3 py-2">50-70</td>
                      <td className="border border-white/10 px-3 py-2">6,000-15,000</td>
                      <td className="border border-white/10 px-3 py-2">80-90</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">T8 fluorescent</td>
                      <td className="border border-white/10 px-3 py-2">80-100</td>
                      <td className="border border-white/10 px-3 py-2">15,000-20,000</td>
                      <td className="border border-white/10 px-3 py-2">80-90</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LED (current)</td>
                      <td className="border border-white/10 px-3 py-2">100-200</td>
                      <td className="border border-white/10 px-3 py-2">50,000-100,000</td>
                      <td className="border border-white/10 px-3 py-2">80-98</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Performance Metrics</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Luminous efficacy (lm/W):</strong> Light output per watt consumed — the primary efficiency measure</li>
                <li className="pl-1"><strong>Colour temperature (CCT):</strong> Measured in Kelvin (K). Warm white: 2700-3000 K; Cool white: 4000 K; Daylight: 5000-6500 K</li>
                <li className="pl-1"><strong>CRI (Colour Rendering Index):</strong> 0-100 scale measuring colour accuracy. 80+ for general use, 90+ for colour-critical areas</li>
                <li className="pl-1"><strong>L70 life:</strong> Hours at which light output has depreciated to 70% of initial lumens</li>
                <li className="pl-1"><strong>Power factor:</strong> A measure of how efficiently the driver draws current from the supply. Should be &gt;0.9 for commercial luminaires</li>
                <li className="pl-1"><strong>UGR (Unified Glare Rating):</strong> Measure of discomfort glare. Must not exceed 19 for offices (CIBSE SLL)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When specifying LEDs, always compare lumens (light output) not watts
              (power consumption). A 10 W LED can produce the same light as a 60 W incandescent lamp. The
              lumen output determines the lighting level; the wattage determines the energy cost.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            LED Drivers and Retrofit Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every LED luminaire requires a driver — the electronic component that converts the mains AC
              supply to the regulated DC current required by the LED module. The driver is the most critical
              component for LED reliability and performance, and is often the first component to fail in an
              LED luminaire. Understanding driver types, dimming compatibility and retrofit options is
              essential for maintenance technicians.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">LED Driver Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Constant-current driver:</strong> Maintains a fixed output current (e.g., 350 mA, 500 mA, 700 mA). Output voltage varies with the connected LED load. Most common type for commercial luminaires</li>
                <li className="pl-1"><strong>Constant-voltage driver:</strong> Maintains a fixed output voltage (typically 12 V or 24 V DC). Current varies with the connected load. Used for LED strip, signage and display lighting</li>
                <li className="pl-1"><strong>Dimmable drivers:</strong> Available with DALI, 1-10 V, phase-cut (leading/trailing edge), or wireless (Bluetooth/Zigbee) dimming interfaces</li>
                <li className="pl-1"><strong>Emergency drivers:</strong> Combined LED driver and emergency battery pack in a single unit. Provides maintained or non-maintained emergency lighting function</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Retrofit vs New-Build</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Retrofit LED tube:</strong> LED tube designed to fit existing fluorescent luminaire. May require ballast bypass or be compatible with existing ballast. Lowest upfront cost but potential compatibility issues</li>
                <li className="pl-1"><strong>Retrofit LED panel:</strong> LED panel designed to fit existing 600x600 mm ceiling grid, replacing the complete fluorescent luminaire. Better performance and warranty than tube retrofit</li>
                <li className="pl-1"><strong>New-build LED luminaire:</strong> Purpose-designed LED luminaire with integrated driver and optics. Best performance, longest warranty, but highest upfront cost</li>
                <li className="pl-1"><strong>Conversion kit:</strong> LED module and driver kit that can be fitted inside an existing luminaire body, replacing the lamp and control gear. Reuses the existing housing</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Retrofit Safety Warning</p>
              <p className="text-sm text-white">
                When retrofitting LED tubes into existing fluorescent luminaires, the existing wiring may need
                to be modified (ballast bypass). This modification changes the luminaire from its original
                design, which may affect the CE/UKCA marking and the manufacturer's warranty. The person
                carrying out the modification takes responsibility for the safety of the modified luminaire.
                Always follow the LED tube manufacturer's installation instructions precisely and label the
                modified luminaire accordingly.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> LED driver failure is the most common cause of LED luminaire
              failure. Symptoms include flickering, dimming, colour shift, or complete failure. Many drivers
              are replaceable — check if the driver is a standard component before condemning the entire
              luminaire.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Smart Lighting and IoT Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart lighting systems extend beyond simple energy saving to provide building intelligence,
              occupant comfort and facilities management data. The integration of LED luminaires with
              IoT (Internet of Things) technology, wireless sensors and cloud-based analytics is
              transforming the role of the luminaire from a simple light source to a data-gathering
              platform.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Smart Lighting Features</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wireless control:</strong> Bluetooth Mesh, Zigbee or Thread protocols for wireless commissioning and control without dedicated control wiring</li>
                <li className="pl-1"><strong>Occupancy analytics:</strong> Built-in sensors track space utilisation patterns — desk occupancy, meeting room usage, traffic flow</li>
                <li className="pl-1"><strong>Daylight harvesting:</strong> Integrated photocells automatically dim luminaires in response to available daylight</li>
                <li className="pl-1"><strong>Tunable white:</strong> Adjustable CCT (2700-6500 K) for human-centric lighting programmes that follow the circadian rhythm</li>
                <li className="pl-1"><strong>Asset tracking:</strong> Bluetooth beacons in luminaires enable indoor positioning and asset tracking</li>
                <li className="pl-1"><strong>Predictive maintenance:</strong> Real-time monitoring of driver temperature, operating hours and light output to predict failure before it occurs</li>
                <li className="pl-1"><strong>Cloud dashboards:</strong> Centralised monitoring of energy consumption, fault status and maintenance scheduling</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Payback Calculation Example</p>
              <p className="text-sm text-white mb-3">
                Replacing 200 x 4ft T8 fluorescent fittings (58 W + 15% ballast loss = 67 W each) with
                200 x LED panels (30 W each), operating 2,750 hours/year:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Old consumption:</strong> 200 x 67 W x 2,750 hrs = 36,850 kWh/year</li>
                <li className="pl-1"><strong>New consumption:</strong> 200 x 30 W x 2,750 hrs = 16,500 kWh/year</li>
                <li className="pl-1"><strong>Annual saving:</strong> 20,350 kWh x £0.30/kWh = £6,105/year</li>
                <li className="pl-1"><strong>Installation cost:</strong> 200 x £85 (supply and fit) = £17,000</li>
                <li className="pl-1"><strong>Simple payback:</strong> £17,000 / £6,105 = 2.8 years</li>
                <li className="pl-1"><strong>Carbon saving:</strong> 20,350 kWh x 0.207 kg CO₂/kWh = 4,212 kg CO₂/year</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Smart lighting systems require maintenance technicians to develop
              new skills in networking, wireless protocols and software configuration, in addition to
              traditional electrical skills. The convergence of IT and OT (operational technology) in
              building services is a significant trend in the maintenance sector.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Lamp Disposal and Environmental Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The disposal of lighting products is governed by the Waste Electrical and Electronic Equipment
              (WEEE) Regulations and the Hazardous Waste Regulations. Different lamp types have different
              disposal requirements, and maintenance technicians must understand which products require
              specialist handling and recycling.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lamp Disposal Categories</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mercury-containing lamps (hazardous waste):</strong> Fluorescent tubes, CFLs, metal halide, sodium lamps. Must be collected in approved containers, stored safely, and disposed of through a WEEE-compliant contractor. Breakage releases mercury vapour — handle with care</li>
                <li className="pl-1"><strong>LED lamps (WEEE waste):</strong> Contain electronic components (driver, capacitors, semiconductors). Should be recycled through WEEE routes. Do not contain mercury but may contain small quantities of other materials requiring controlled disposal</li>
                <li className="pl-1"><strong>Incandescent and halogen (general waste):</strong> Do not contain hazardous substances and can be disposed of in general waste. However, recycling is environmentally preferred where facilities exist</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Broken Fluorescent Lamp Procedure</p>
              <p className="text-sm text-white">
                If a fluorescent lamp breaks: ventilate the area immediately (open windows, turn off HVAC to
                prevent mercury vapour being distributed through the building); do not use a vacuum cleaner
                (this disperses mercury vapour); use damp paper towels or sticky tape to pick up glass fragments
                and phosphor powder; place all debris in a sealed plastic bag; dispose of through the hazardous
                waste route. Wear gloves during clean-up. If a large number of lamps break, evacuate the area
                and seek specialist advice.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Benefits of LED</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Energy reduction:</strong> 50-90% less energy than the technology replaced — direct carbon emission reduction</li>
                <li className="pl-1"><strong>No mercury:</strong> LEDs contain no mercury, eliminating the hazardous waste issue associated with fluorescent lamps</li>
                <li className="pl-1"><strong>Longer life:</strong> Fewer lamp replacements means less manufacturing, transport and disposal</li>
                <li className="pl-1"><strong>Reduced maintenance:</strong> Less frequent access equipment use, fewer vehicle trips, reduced working at height risk</li>
                <li className="pl-1"><strong>Better controllability:</strong> Instant dimming, no warm-up time, full compatibility with daylight and occupancy controls</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> The maintenance technician standard requires awareness of
              environmental legislation affecting electrical maintenance, including waste disposal
              requirements. You must be able to correctly identify lamp types and ensure they are
              disposed of through the appropriate waste stream.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

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
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Socket Outlet Circuits
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section4">
              Back to Section 4 Hub
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section4_4;