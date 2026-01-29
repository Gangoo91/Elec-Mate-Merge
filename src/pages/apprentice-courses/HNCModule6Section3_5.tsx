import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BREEAM Health and Wellbeing - HNC Module 6 Section 3.5";
const DESCRIPTION = "Master BREEAM Health and Wellbeing assessment criteria: daylighting, artificial lighting quality, indoor air quality, thermal comfort, acoustic performance, and occupant wellbeing standards.";

const quickCheckQuestions = [
  {
    id: "hea01-criteria",
    question: "What does BREEAM Hea 01 (Visual Comfort) primarily assess?",
    options: ["Emergency lighting provision", "Daylighting levels and glare control in occupied spaces", "External lighting pollution", "Security lighting coverage"],
    correctIndex: 1,
    explanation: "Hea 01 Visual Comfort assesses daylighting provision, view out, and glare control to ensure occupied spaces receive adequate natural light whilst minimising visual discomfort from excessive brightness or reflections."
  },
  {
    id: "air-quality-rates",
    question: "What is the minimum fresh air supply rate for office spaces under BREEAM Hea 04?",
    options: ["5 litres per second per person", "10 litres per second per person", "12 litres per second per person", "15 litres per second per person"],
    correctIndex: 1,
    explanation: "BREEAM Hea 04 Indoor Air Quality requires a minimum fresh air supply of 10 litres per second per person for office spaces, aligned with CIBSE Guide A recommendations for good indoor air quality."
  },
  {
    id: "thermal-comfort",
    question: "Which standard does BREEAM Hea 05 reference for thermal comfort criteria?",
    options: ["BS EN 15251 / BS EN 16798", "BS 7671", "CIBSE TM52", "Building Regulations Part L"],
    correctIndex: 0,
    explanation: "BREEAM Hea 05 Thermal Comfort references BS EN 15251 (now superseded by BS EN 16798) for comfort criteria, including operative temperature ranges and adaptive comfort approaches for naturally ventilated buildings."
  },
  {
    id: "acoustic-criteria",
    question: "What acoustic parameter does BREEAM Hea 06 primarily address for office environments?",
    options: ["Reverberation time only", "Sound insulation between spaces and ambient noise levels", "External noise from traffic only", "Plant room noise isolation only"],
    correctIndex: 1,
    explanation: "Hea 06 Acoustic Performance addresses both sound insulation between spaces (partitions, floors) and ambient noise levels from building services, ensuring appropriate conditions for the intended use of each space."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What minimum average daylight factor does BREEAM typically require for a compliant office space?",
    options: [
      "1% average daylight factor",
      "2% average daylight factor",
      "3% average daylight factor",
      "5% average daylight factor"
    ],
    correctAnswer: 1,
    explanation: "BREEAM typically requires a minimum 2% average daylight factor for office spaces to achieve credits under Hea 01. Higher targets (3%+) may be needed for schools or healthcare spaces."
  },
  {
    id: 2,
    question: "Under BREEAM Hea 02 (View Out), what percentage of floor area must have a view of the sky or landscape?",
    options: ["50% of the net internal area", "80% of the net internal area", "95% of the net internal area", "100% of the net internal area"],
    correctAnswer: 2,
    explanation: "Hea 02 requires that 95% of the net internal area has a direct view to the external environment, with views of the sky or landscape from a seated or standing position as appropriate."
  },
  {
    id: 3,
    question: "What is the purpose of glare control under BREEAM Hea 03?",
    options: [
      "To reduce daylight entering the building",
      "To provide adjustable shading to prevent visual discomfort",
      "To eliminate all natural light",
      "To increase artificial lighting usage"
    ],
    correctAnswer: 1,
    explanation: "Hea 03 Glare Control requires adjustable shading or screening devices to prevent excessive brightness and visual discomfort while maintaining the benefits of daylighting and views."
  },
  {
    id: 4,
    question: "Which pollutant concentration must be monitored for BREEAM Hea 04 credits?",
    options: [
      "Ozone (O3)",
      "Carbon dioxide (CO2)",
      "Nitrogen oxide (NOx)",
      "Sulphur dioxide (SO2)"
    ],
    correctAnswer: 1,
    explanation: "BREEAM Hea 04 requires CO2 monitoring with sensors linked to ventilation systems. CO2 levels indicate occupancy and ventilation effectiveness, with a typical target of maintaining levels below 1000 ppm."
  },
  {
    id: 5,
    question: "What does BREEAM require regarding VOC emissions from internal finishes?",
    options: [
      "No restrictions on VOC content",
      "VOC content below specified limits or certified low-emission products",
      "Only natural materials permitted",
      "Testing only after 12 months occupancy"
    ],
    correctAnswer: 1,
    explanation: "BREEAM requires internal finishes (paints, adhesives, flooring) to meet specified VOC emission limits or be certified to recognised low-emission standards to protect indoor air quality."
  },
  {
    id: 6,
    question: "For naturally ventilated buildings, which thermal comfort approach does BREEAM accept?",
    options: [
      "Fixed temperature setpoints only",
      "Adaptive comfort model allowing higher temperatures in summer",
      "Mechanical cooling override required",
      "No thermal comfort criteria apply"
    ],
    correctAnswer: 1,
    explanation: "BREEAM accepts the adaptive comfort model (BS EN 15251 Category II) for naturally ventilated buildings, recognising that occupants tolerate higher temperatures when they have control and outdoor temperatures are elevated."
  },
  {
    id: 7,
    question: "What is the typical ambient noise criterion for open-plan offices under BREEAM Hea 06?",
    options: [
      "NR 25",
      "NR 35",
      "NR 40",
      "NR 45"
    ],
    correctAnswer: 2,
    explanation: "BREEAM typically specifies NR 40 as the maximum background noise level for open-plan offices from building services. Private offices require lower levels (NR 35), and libraries or lecture theatres require NR 30 or lower."
  },
  {
    id: 8,
    question: "What does the 'uniformity ratio' measure in BREEAM lighting assessments?",
    options: [
      "The colour rendering index of lamps",
      "The ratio of minimum to average illuminance",
      "The number of luminaires per square metre",
      "The daylight factor at the perimeter"
    ],
    correctAnswer: 1,
    explanation: "Uniformity ratio is the ratio of minimum illuminance to average illuminance across a task area. BREEAM requires a minimum uniformity of 0.4 for general lighting and 0.6 for task areas to ensure consistent light distribution."
  },
  {
    id: 9,
    question: "Which CIBSE document provides guidance on lighting quality referenced by BREEAM?",
    options: [
      "CIBSE Guide A",
      "CIBSE Guide B",
      "CIBSE LG7 (SLL Lighting Guide 7)",
      "CIBSE TM52"
    ],
    correctAnswer: 2,
    explanation: "CIBSE LG7 (now SLL Lighting Guide 7 - Offices) provides detailed guidance on lighting quality for offices, including illuminance levels, uniformity, glare ratings, and colour rendering requirements referenced by BREEAM."
  },
  {
    id: 10,
    question: "What is the Unified Glare Rating (UGR) limit typically specified for office lighting?",
    options: [
      "UGR < 16",
      "UGR < 19",
      "UGR < 22",
      "UGR < 28"
    ],
    correctAnswer: 1,
    explanation: "BREEAM and lighting standards typically specify UGR < 19 for office environments. Lower values (UGR < 16) apply to detailed drawing work, while higher values (UGR < 22) may be acceptable for circulation areas."
  },
  {
    id: 11,
    question: "What is the purpose of post-occupancy evaluation (POE) under BREEAM Health and Wellbeing?",
    options: [
      "To verify construction quality only",
      "To assess occupant satisfaction and building performance after handover",
      "To calculate energy consumption",
      "To complete snagging lists"
    ],
    correctAnswer: 1,
    explanation: "Post-occupancy evaluation assesses actual occupant satisfaction with comfort conditions, identifies performance gaps between design intent and reality, and provides feedback for continuous improvement."
  },
  {
    id: 12,
    question: "Under BREEAM, what fresh air rate applies to high-occupancy spaces like meeting rooms?",
    options: [
      "8 litres per second per person",
      "10 litres per second per person",
      "12 litres per second per person",
      "Based on CO2 demand control only"
    ],
    correctAnswer: 2,
    explanation: "High-occupancy spaces like meeting rooms typically require 12 litres per second per person to maintain air quality during peak occupancy. CO2 demand control can modulate rates between minimum and design maximum."
  }
];

const faqs = [
  {
    question: "How does BREEAM balance daylighting with overheating risk?",
    answer: "BREEAM requires a holistic approach: adequate daylight factors must be achieved alongside glare control (Hea 03) and thermal comfort (Hea 05). Large glazed areas that provide good daylight must incorporate solar shading, high-performance glazing (low g-values), or automated blinds. The thermal model must demonstrate compliance with overheating criteria (CIBSE TM52/TM59) while maintaining daylight targets. This often requires careful facade design with external shading, fritted glass, or electrochromic glazing."
  },
  {
    question: "What evidence is required for BREEAM indoor air quality credits?",
    answer: "Evidence includes: specification of ventilation rates meeting CIBSE Guide A or BS EN 16798-1; CO2 monitoring strategy with sensors in high-occupancy zones; product certifications for low-VOC materials (paints, adhesives, sealants, flooring); filtration grades for air handling units (typically F7 or higher); and commissioning records demonstrating achieved air flow rates. Post-construction IAQ testing may be required for higher credit levels."
  },
  {
    question: "How do acoustic requirements vary by space type?",
    answer: "BREEAM acoustic criteria align with Building Bulletin 93 (schools), HTM 08-01 (healthcare), and BS 8233 (general buildings). Offices typically require NR 40 open-plan, NR 35 cellular. Classrooms need NR 30-35 with reverberation time under 0.8s. Healthcare consulting rooms need sound insulation DnT,w ≥ 45 dB. Each space type has specific criteria for ambient noise, sound insulation, and reverberation appropriate to its function."
  },
  {
    question: "What is the relationship between BREEAM and WELL Building Standard?",
    answer: "BREEAM and WELL both address occupant health but with different emphases. BREEAM covers broader sustainability (energy, water, ecology) with Health and Wellbeing as one category. WELL focuses exclusively on occupant health with more detailed requirements (air, water, nourishment, light, fitness, comfort, mind). Many projects pursue both certifications. Credits can overlap - good daylighting, IAQ, and thermal comfort strategies serve both. WELL generally has stricter health-focused thresholds."
  },
  {
    question: "How does demand-controlled ventilation affect BREEAM compliance?",
    answer: "Demand-controlled ventilation (DCV) using CO2 sensors can earn additional credits by optimising air quality while reducing energy use. However, the system must maintain minimum fresh air rates regardless of occupancy (typically 0.1-0.15 l/s/m2 or specific per-person minimums). CO2 setpoints should be 800-1000 ppm with ramp-up to design ventilation rates. DCV must be commissioned to demonstrate responsiveness and minimum rates, with sensors calibrated and located appropriately."
  },
  {
    question: "What lighting controls are required for BREEAM Health and Wellbeing credits?",
    answer: "BREEAM requires lighting controls that allow occupants to adjust illuminance to suit their needs. This includes: zoning controls (separate switching for daylit and non-daylit zones); occupancy/absence detection in appropriate spaces; daylight-linked dimming to maintain illuminance while reducing energy use; and manual override capability. Task lighting at workstations provides individual control. The goal is to balance energy efficiency with occupant satisfaction and visual comfort."
  }
];

const HNCModule6Section3_5 = () => {
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
            <Zap className="h-4 w-4" />
            <span>Module 6.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BREEAM Health and Wellbeing
          </h1>
          <p className="text-white/80">
            Daylighting, artificial lighting quality, indoor air quality, thermal comfort, and acoustic performance assessment
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Hea 01-03:</strong> Visual comfort - daylight, views, glare control</li>
              <li className="pl-1"><strong>Hea 04:</strong> Indoor air quality - ventilation rates, pollutants</li>
              <li className="pl-1"><strong>Hea 05:</strong> Thermal comfort - temperature, humidity, control</li>
              <li className="pl-1"><strong>Hea 06:</strong> Acoustic performance - noise, insulation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Assessment Criteria</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Daylight factor:</strong> Typically 2% average for offices</li>
              <li className="pl-1"><strong>Fresh air:</strong> 10 l/s/person minimum (offices)</li>
              <li className="pl-1"><strong>Thermal:</strong> BS EN 16798 comfort categories</li>
              <li className="pl-1"><strong>Noise:</strong> NR ratings per space type</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply BREEAM Hea 01-03 visual comfort criteria for daylighting and views",
              "Specify ventilation systems meeting Hea 04 indoor air quality requirements",
              "Design for Hea 05 thermal comfort using adaptive and PMV models",
              "Achieve Hea 06 acoustic performance targets for various building types",
              "Integrate artificial lighting quality with energy efficiency objectives",
              "Evaluate occupant wellbeing through post-occupancy assessment"
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

        {/* Section 1: Visual Comfort - Daylighting and Views */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Visual Comfort - Daylighting and Views (Hea 01-03)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM Health and Wellbeing addresses occupant comfort through multiple interconnected criteria.
              Visual comfort encompasses daylighting provision (Hea 01), view out to the external environment
              (Hea 02), and glare control to prevent discomfort (Hea 03). These criteria recognise that
              natural light and external views significantly impact occupant wellbeing and productivity.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hea 01 - Visual Comfort (Daylighting)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Average daylight factor:</strong> Minimum 2% for offices, 2.5% for schools, 3% for hospitals</li>
                <li className="pl-1"><strong>Uniformity:</strong> Minimum daylight factor at least 0.4 times the average</li>
                <li className="pl-1"><strong>Room depth criterion:</strong> No part of working plane further than 6m from window</li>
                <li className="pl-1"><strong>Daylight assessment:</strong> Climate-based daylight modelling (CBDM) preferred</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Daylight Assessment Methods</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">BREEAM Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Daylight Factor (DF)</td>
                      <td className="border border-white/10 px-3 py-2">Ratio of internal to external illuminance (%)</td>
                      <td className="border border-white/10 px-3 py-2">Baseline compliance route</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Spatial Daylight Autonomy (sDA)</td>
                      <td className="border border-white/10 px-3 py-2">% floor area receiving 300 lux for 50% of hours</td>
                      <td className="border border-white/10 px-3 py-2">Alternative CBDM route</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annual Sunlight Exposure (ASE)</td>
                      <td className="border border-white/10 px-3 py-2">% area receiving 1000 lux for 250+ hours</td>
                      <td className="border border-white/10 px-3 py-2">Overheating/glare indicator</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Useful Daylight Illuminance (UDI)</td>
                      <td className="border border-white/10 px-3 py-2">Hours within 100-3000 lux range</td>
                      <td className="border border-white/10 px-3 py-2">Comfort-based metric</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Hea 02 - View Out Requirements</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">Coverage:</span> <span className="text-white">95% of net internal area must have adequate view</span></p>
                <p><span className="text-white/60">View quality:</span> <span className="text-white">Direct line of sight to sky, ground, or landscape</span></p>
                <p><span className="text-white/60">Glazing:</span> <span className="text-white">Clear glass at eye level (minimum visible light transmittance 50%)</span></p>
                <p><span className="text-white/60">Distance:</span> <span className="text-white">Workstations within 7m of perimeter glazing</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hea 03 - Glare Control Strategies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Internal blinds:</strong> Adjustable venetian, roller, or vertical blinds</li>
                <li className="pl-1"><strong>External shading:</strong> Brise soleil, overhangs, external louvres</li>
                <li className="pl-1"><strong>Mid-pane blinds:</strong> Integral blinds within double-glazed units</li>
                <li className="pl-1"><strong>Automated systems:</strong> Solar-tracking blinds or electrochromic glass</li>
                <li className="pl-1"><strong>Manual override:</strong> Occupant control required regardless of automation</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design integration:</strong> Balance daylight, views, and glare control with thermal performance - excessive glazing increases cooling loads whilst inadequate glazing limits daylight and views.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Indoor Air Quality */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Indoor Air Quality (Hea 04)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM Hea 04 addresses indoor air quality through ventilation provision, pollutant control,
              and monitoring systems. Poor IAQ affects occupant health, comfort, and cognitive performance.
              The criteria ensure adequate fresh air supply whilst minimising exposure to internal and
              external pollution sources.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ventilation Rates</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Offices: 10 l/s/person</li>
                  <li className="pl-1">Meeting rooms: 12 l/s/person</li>
                  <li className="pl-1">Classrooms: 8-10 l/s/person</li>
                  <li className="pl-1">Retail: 10-15 l/s/person</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CO2 Monitoring</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Target: Below 1000 ppm</li>
                  <li className="pl-1">Alert threshold: 1200 ppm</li>
                  <li className="pl-1">Sensor locations: Breathing zone</li>
                  <li className="pl-1">BMS integration required</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Filtration</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">AHU filters: Minimum F7</li>
                  <li className="pl-1">Higher pollution: F8/F9</li>
                  <li className="pl-1">Pre-filters for protection</li>
                  <li className="pl-1">Access for maintenance</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pollutant Source Control</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pollutant Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">BREEAM Requirement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Paints and coatings</td>
                      <td className="border border-white/10 px-3 py-2">Low VOC specification</td>
                      <td className="border border-white/10 px-3 py-2">EU Ecolabel or equivalent</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Adhesives and sealants</td>
                      <td className="border border-white/10 px-3 py-2">VOC content limits</td>
                      <td className="border border-white/10 px-3 py-2">EC1 Plus certification</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flooring</td>
                      <td className="border border-white/10 px-3 py-2">Emission testing required</td>
                      <td className="border border-white/10 px-3 py-2">FloorScore or M1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Formaldehyde (wood products)</td>
                      <td className="border border-white/10 px-3 py-2">Low emission boards</td>
                      <td className="border border-white/10 px-3 py-2">E1 classification maximum</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External pollution</td>
                      <td className="border border-white/10 px-3 py-2">Air intake location</td>
                      <td className="border border-white/10 px-3 py-2">Away from traffic, exhausts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Demand-Controlled Ventilation (DCV)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CO2 sensors:</strong> NDIR type, calibrated accuracy ±75 ppm</li>
                <li className="pl-1"><strong>Setpoint:</strong> Typically 800-1000 ppm to ramp up ventilation</li>
                <li className="pl-1"><strong>Minimum rate:</strong> Maintain base ventilation regardless of occupancy</li>
                <li className="pl-1"><strong>Response time:</strong> System should respond within 5-10 minutes</li>
                <li className="pl-1"><strong>Energy benefit:</strong> 20-40% HVAC energy savings versus fixed rate</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Commissioning requirement:</strong> Air flow rates must be measured and documented during commissioning, with results within 10% of design values.
            </p>
          </div>
        </section>

        {/* Section 3: Thermal Comfort */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Thermal Comfort (Hea 05)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM Hea 05 ensures buildings provide appropriate thermal conditions for occupant comfort
              and productivity. The criteria reference BS EN 16798-1 (formerly BS EN 15251) and recognise
              different comfort models for mechanically cooled and naturally ventilated buildings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">BS EN 16798-1 Comfort Categories</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Category I:</span> <span className="text-white">High expectation - PPD &lt; 6% (23-26°C summer, 21-23°C winter)</span></p>
                <p><span className="text-white/60">Category II:</span> <span className="text-white">Normal expectation - PPD &lt; 10% (22-27°C summer, 20-24°C winter)</span></p>
                <p><span className="text-white/60">Category III:</span> <span className="text-white">Moderate expectation - PPD &lt; 15% (21-28°C summer, 19-25°C winter)</span></p>
                <p><span className="text-white/60">Category IV:</span> <span className="text-white">Outside normal criteria (only for limited periods)</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Comfort Models</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Model</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Parameters</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PMV/PPD (Fanger)</td>
                      <td className="border border-white/10 px-3 py-2">Mechanically conditioned spaces</td>
                      <td className="border border-white/10 px-3 py-2">Fixed temperature bands, RH 40-60%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Adaptive Comfort</td>
                      <td className="border border-white/10 px-3 py-2">Naturally ventilated buildings</td>
                      <td className="border border-white/10 px-3 py-2">Running mean outdoor temperature linked</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mixed Mode</td>
                      <td className="border border-white/10 px-3 py-2">Combined natural/mechanical</td>
                      <td className="border border-white/10 px-3 py-2">Changeover strategy defined</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BREEAM Thermal Comfort Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Thermal modelling:</strong> Dynamic simulation demonstrating comfort compliance</li>
                <li className="pl-1"><strong>Overheating analysis:</strong> CIBSE TM52 (non-domestic) or TM59 (domestic) criteria</li>
                <li className="pl-1"><strong>Zoning:</strong> Separate thermal zones for perimeter/core, different orientations</li>
                <li className="pl-1"><strong>Control:</strong> User-adjustable thermostats, maximum 4°C adjustment range</li>
                <li className="pl-1"><strong>Humidity:</strong> Maintained within 40-60% RH where humidification provided</li>
                <li className="pl-1"><strong>Air velocity:</strong> Less than 0.25 m/s in occupied zone (winter heating)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE TM52 Overheating Criteria</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Criterion 1:</strong> Hours exceeding threshold &lt; 3%</li>
                  <li className="pl-1"><strong>Criterion 2:</strong> Daily weighted exceedance ≤ 6</li>
                  <li className="pl-1"><strong>Criterion 3:</strong> Absolute maximum 4K above threshold</li>
                  <li className="pl-1">Fail if 2 or more criteria exceeded</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Strategies</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Passive:</strong> Thermal mass, night purge, shading</li>
                  <li className="pl-1"><strong>Active:</strong> Mechanical cooling, heat pumps</li>
                  <li className="pl-1"><strong>Controls:</strong> Optimiser, weather compensation</li>
                  <li className="pl-1"><strong>User:</strong> Openable windows, local adjustment</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Adaptive comfort advantage:</strong> Naturally ventilated buildings can accept higher summer temperatures (up to 28°C+) when occupants have control, reducing or eliminating cooling energy requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Acoustic Performance and Lighting Quality */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Acoustic Performance and Lighting Quality (Hea 06)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BREEAM Hea 06 addresses acoustic comfort through ambient noise control, sound insulation between
              spaces, and reverberation management. Combined with artificial lighting quality requirements,
              these criteria ensure buildings provide comfortable environments for their intended activities.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ambient Noise Criteria (NR Ratings)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">NR Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Sources</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Concert hall</td>
                      <td className="border border-white/10 px-3 py-2">NR 15-20</td>
                      <td className="border border-white/10 px-3 py-2">HVAC, external ingress</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Library / lecture theatre</td>
                      <td className="border border-white/10 px-3 py-2">NR 25-30</td>
                      <td className="border border-white/10 px-3 py-2">Terminal units, lighting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Classroom</td>
                      <td className="border border-white/10 px-3 py-2">NR 30-35</td>
                      <td className="border border-white/10 px-3 py-2">Ventilation, corridor noise</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Private office</td>
                      <td className="border border-white/10 px-3 py-2">NR 35</td>
                      <td className="border border-white/10 px-3 py-2">FCUs, diffusers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open-plan office</td>
                      <td className="border border-white/10 px-3 py-2">NR 40</td>
                      <td className="border border-white/10 px-3 py-2">AHU breakout, grilles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail / circulation</td>
                      <td className="border border-white/10 px-3 py-2">NR 45-50</td>
                      <td className="border border-white/10 px-3 py-2">General building services</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sound Insulation Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Office partitions:</strong> DnT,w ≥ 35-40 dB (cellular offices)</li>
                <li className="pl-1"><strong>Meeting rooms:</strong> DnT,w ≥ 45 dB for confidential discussions</li>
                <li className="pl-1"><strong>Healthcare consulting:</strong> DnT,w ≥ 45-50 dB (patient privacy)</li>
                <li className="pl-1"><strong>Floor separations:</strong> L'nT,w ≤ 55-60 dB (impact sound)</li>
                <li className="pl-1"><strong>Plant rooms:</strong> Rated enclosures, anti-vibration mounts</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Artificial Lighting Quality Metrics</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">Illuminance Requirements</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>General office: 300-500 lux</li>
                    <li>Drawing/CAD: 500-750 lux</li>
                    <li>Corridors: 100-150 lux</li>
                    <li>Retail: 300-750 lux</li>
                    <li>Uniformity: ≥ 0.4 general, ≥ 0.6 task</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Quality Parameters</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>UGR: ≤ 19 (offices), ≤ 16 (drawing)</li>
                    <li>CRI: ≥ 80 general, ≥ 90 colour-critical</li>
                    <li>CCT: 3000-4000K typical offices</li>
                    <li>Flicker: ≤ 3% at 100Hz</li>
                    <li>Circadian consideration for 24hr spaces</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Reverberation Control</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Target RT (mid-frequency)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Treatment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Classroom</td>
                      <td className="border border-white/10 px-3 py-2">0.4-0.8 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Acoustic ceiling, wall panels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open-plan office</td>
                      <td className="border border-white/10 px-3 py-2">0.5-0.8 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Suspended ceiling, carpet</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Meeting room</td>
                      <td className="border border-white/10 px-3 py-2">0.4-0.6 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Wall absorption, ceiling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Atrium / reception</td>
                      <td className="border border-white/10 px-3 py-2">1.0-1.5 seconds</td>
                      <td className="border border-white/10 px-3 py-2">Baffles, soffit treatment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Building services noise:</strong> Early coordination with mechanical design is essential - ductwork velocities, attenuator positions, and equipment selections significantly impact achievable NR levels.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Daylighting Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Verify BREEAM Hea 01 compliance for a 12m deep office floor plate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p>Floor depth: 12m from facade</p>
                <p>Floor-to-ceiling height: 2.7m</p>
                <p>Window head height: 2.5m</p>
                <p>Glazing ratio: 50% of facade</p>
                <p>Visible light transmittance: 65%</p>
                <p className="mt-2 text-white/60">Daylight factor calculation (simplified):</p>
                <p>Average DF = (A_window × VLT × 0.85) / (A_floor × (1 - R_mean))</p>
                <p>Perimeter zone (0-6m): DF ≈ 3.2%</p>
                <p>Core zone (6-12m): DF ≈ 1.1%</p>
                <p className="mt-2 text-white/60">Assessment:</p>
                <p>Average across floor: 2.15% - <span className="text-green-400">COMPLIANT</span></p>
                <p>Uniformity: 1.1/2.15 = 0.51 - <span className="text-green-400">COMPLIANT (≥0.4)</span></p>
                <p className="text-orange-400">Note: Core requires supplementary artificial lighting</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Ventilation Rate Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Determine fresh air requirement for a 50-person meeting room.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">BREEAM Hea 04 requirement:</p>
                <p>Meeting room rate: 12 l/s/person</p>
                <p className="mt-2">Fresh air = 50 persons × 12 l/s</p>
                <p>Fresh air = 600 l/s = 0.6 m³/s</p>
                <p className="mt-2 text-white/60">Air changes (room 100m², 3m height):</p>
                <p>Room volume: 300 m³</p>
                <p>ACH = (0.6 × 3600) / 300 = 7.2 air changes/hour</p>
                <p className="mt-2 text-white/60">CO2 monitoring setpoints:</p>
                <p>Minimum ventilation (unoccupied): 150 l/s (0.5 l/s/m²)</p>
                <p>Ramp-up trigger: 800 ppm CO2</p>
                <p>Design ventilation: 600 l/s at 1000 ppm</p>
                <p className="text-green-400">System sized for peak with DCV for part-load efficiency</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Acoustic Design for Open-Plan Office</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify building services to achieve NR 40 in open-plan office.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Noise budget (summing to NR 40):</p>
                <p>Supply air diffusers: NR 32 (NC 30)</p>
                <p>Return air grilles: NR 30</p>
                <p>FCU/chilled beams: NR 28</p>
                <p>Lighting (LED drivers): NR 20</p>
                <p>External ingress: NR 25</p>
                <p className="mt-2 text-white/60">Logarithmic addition:</p>
                <p>Combined = 10 × log10(10^3.2 + 10^3.0 + 10^2.8 + 10^2.0 + 10^2.5)</p>
                <p>Combined ≈ NR 36</p>
                <p className="text-green-400">Result: NR 36 achieved, within NR 40 target</p>
                <p className="mt-2 text-white/60">Key specifications:</p>
                <p>- Diffuser velocity: Max 2.5 m/s neck velocity</p>
                <p>- Duct attenuation: 1m lined duct before diffuser</p>
                <p>- FCU selection: Low-noise units, silent mode capability</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BREEAM Health and Wellbeing Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Complete daylight modelling early in design - facade changes are costly</li>
                <li className="pl-1">Specify low-VOC materials throughout - obtain certifications pre-construction</li>
                <li className="pl-1">Coordinate acoustic requirements with MEP consultant from RIBA Stage 2</li>
                <li className="pl-1">Include CO2 sensors in BMS specification with clear control strategy</li>
                <li className="pl-1">Verify glare control meets both manual override and automation requirements</li>
                <li className="pl-1">Commission thermal comfort and ventilation systems before occupation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Daylight factor: <strong>2% average</strong> for offices (minimum)</li>
                <li className="pl-1">Fresh air: <strong>10 l/s/person</strong> offices, <strong>12 l/s/person</strong> meeting rooms</li>
                <li className="pl-1">CO2 target: <strong>Below 1000 ppm</strong> (alert at 1200 ppm)</li>
                <li className="pl-1">Office noise: <strong>NR 40</strong> open-plan, <strong>NR 35</strong> cellular</li>
                <li className="pl-1">Lighting UGR: <strong>≤ 19</strong> for VDU work</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Late daylight assessment</strong> - modelling after facade design fixed limits options</li>
                <li className="pl-1"><strong>Ignoring glare</strong> - high daylight factors without shading cause discomfort</li>
                <li className="pl-1"><strong>Undersized ventilation</strong> - design for peak occupancy, not typical</li>
                <li className="pl-1"><strong>Acoustic afterthought</strong> - attenuators and treatments cost more when retrofitted</li>
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
                <p className="font-medium text-white mb-1">BREEAM Hea Categories</p>
                <ul className="space-y-0.5">
                  <li>Hea 01: Visual comfort (daylighting)</li>
                  <li>Hea 02: View out (external views)</li>
                  <li>Hea 03: Glare control (shading)</li>
                  <li>Hea 04: Indoor air quality</li>
                  <li>Hea 05: Thermal comfort</li>
                  <li>Hea 06: Acoustic performance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 16798-1: Thermal comfort</li>
                  <li>CIBSE TM52/59: Overheating</li>
                  <li>CIBSE LG7/SLL: Lighting</li>
                  <li>BS 8233: Sound in buildings</li>
                  <li>BB93: School acoustics</li>
                  <li>HTM 08-01: Healthcare acoustics</li>
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
            <Link to="../h-n-c-module6-section3-6">
              Next: BREEAM Energy and Materials
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule6Section3_5;
