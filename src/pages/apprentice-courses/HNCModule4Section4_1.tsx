import { ArrowLeft, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Lighting Design Criteria - HNC Module 4 Section 4.1";
const DESCRIPTION = "Master lighting design criteria for building services: task illuminance levels from CIBSE SLL, uniformity ratios, glare control (UGR), colour rendering and visual comfort requirements.";

const quickCheckQuestions = [
  {
    id: "office-illuminance",
    question: "What is the recommended maintained illuminance for a general office to CIBSE SLL?",
    options: ["150 lux", "300 lux", "500 lux", "750 lux"],
    correctIndex: 2,
    explanation: "CIBSE SLL recommends 500 lux maintained illuminance for general office work. This provides adequate light for tasks including reading, writing and computer work whilst maintaining visual comfort."
  },
  {
    id: "ugr-limit",
    question: "What is the maximum Unified Glare Rating (UGR) permitted for an office environment?",
    options: ["16", "19", "22", "25"],
    correctIndex: 1,
    explanation: "UGR 19 is the maximum permitted for office environments. Lower values indicate better glare control. UGR 16 is required for technical drawing offices where visual tasks are more demanding."
  },
  {
    id: "colour-rendering",
    question: "What minimum Colour Rendering Index (CRI or Ra) is required for office lighting?",
    options: ["Ra 60", "Ra 70", "Ra 80", "Ra 90"],
    correctIndex: 2,
    explanation: "A minimum CRI of Ra 80 is required for offices to ensure accurate colour perception. Higher values (Ra 90+) are needed for colour-critical tasks such as art studios or medical examination rooms."
  },
  {
    id: "uniformity-ratio",
    question: "What is the minimum uniformity ratio (Uo) required for task area lighting?",
    options: ["0.4", "0.6", "0.7", "0.8"],
    correctIndex: 2,
    explanation: "A minimum uniformity ratio of 0.7 (Emin/Eav) is required for the task area. The immediate surrounding area requires Uo of 0.5 minimum. This prevents excessive contrast that causes visual fatigue."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does CIBSE SLL stand for?",
    options: [
      "Chartered Institution of Building Services Engineers Society of Lighting Laboratories",
      "Chartered Institution of Building Services Engineers Society of Light and Lighting",
      "Construction Industry Building Services Engineering Standard Lighting Levels",
      "Commercial and Industrial Building Services Electrical Standard Lighting Levels"
    ],
    correctAnswer: 1,
    explanation: "CIBSE SLL is the Chartered Institution of Building Services Engineers Society of Light and Lighting. They publish the authoritative UK guidance on lighting design including the Lighting Handbook and Code for Lighting."
  },
  {
    id: 2,
    question: "Which illuminance level is recommended for a corridor in a commercial building?",
    options: ["50 lux", "100 lux", "200 lux", "300 lux"],
    correctAnswer: 1,
    explanation: "CIBSE SLL recommends 100 lux for corridors. This provides adequate light for safe movement whilst being significantly lower than task areas to reduce energy consumption."
  },
  {
    id: 3,
    question: "What is the relationship between the task area and immediate surrounding area illuminance?",
    options: [
      "Surrounding must be at least equal to task area",
      "Surrounding must be at least 50% of task area",
      "Surrounding can be any value below task area",
      "Surrounding must be at least 30% of task area"
    ],
    correctAnswer: 3,
    explanation: "The immediate surrounding area should have illuminance of at least 30% of the task area (but not less than 200 lux). This prevents excessive brightness contrast which causes visual discomfort and adaptation problems."
  },
  {
    id: 4,
    question: "What does the Unified Glare Rating (UGR) measure?",
    options: [
      "The total light output of luminaires",
      "The psychological discomfort caused by bright luminaires in the field of view",
      "The colour temperature of light sources",
      "The energy efficiency of the lighting installation"
    ],
    correctAnswer: 1,
    explanation: "UGR quantifies the psychological discomfort glare from luminaires. It considers luminaire luminance, position, background luminance and solid angle. Lower UGR values indicate better glare control."
  },
  {
    id: 5,
    question: "What is the recommended illuminance for a hospital operating theatre?",
    options: ["500 lux", "1000 lux", "10,000-100,000 lux", "300 lux"],
    correctAnswer: 2,
    explanation: "Operating theatres require very high illuminance levels of 10,000-100,000 lux at the surgical site. This is provided by specialist surgical luminaires with adjustable positioning and intensity."
  },
  {
    id: 6,
    question: "What correlated colour temperature (CCT) range is typically recommended for office environments?",
    options: ["2700K-3000K (warm white)", "4000K-5000K (neutral to cool white)", "6000K-6500K (daylight)", "Any CCT is acceptable"],
    correctAnswer: 1,
    explanation: "4000K-5000K is typically recommended for offices. This neutral to cool white appearance promotes alertness and productivity. Warmer temperatures (2700K-3000K) are preferred for relaxation areas."
  },
  {
    id: 7,
    question: "What is meant by 'maintained illuminance'?",
    options: [
      "The illuminance when luminaires are new",
      "The illuminance required during maintenance",
      "The minimum illuminance throughout the maintenance period",
      "The average illuminance during peak hours"
    ],
    correctAnswer: 2,
    explanation: "Maintained illuminance (Em) is the minimum value to which illuminance should not fall. Initial illuminance must be higher to account for lamp lumen depreciation, luminaire dirt accumulation and room surface degradation."
  },
  {
    id: 8,
    question: "What is the minimum CRI required for areas where accurate colour matching is essential?",
    options: ["Ra 70", "Ra 80", "Ra 90", "Ra 95"],
    correctAnswer: 2,
    explanation: "Ra 90 or above is required for colour-critical applications such as art studios, textile inspection, printing facilities and medical examination rooms where accurate colour perception is essential."
  },
  {
    id: 9,
    question: "How does room surface reflectance affect lighting design?",
    options: [
      "It has no effect on lighting calculations",
      "Higher reflectances increase utilisation factor and reduce luminaire quantity",
      "Lower reflectances always improve visual comfort",
      "Reflectance only affects emergency lighting"
    ],
    correctAnswer: 1,
    explanation: "Higher room surface reflectances improve the utilisation factor (UF), meaning more of the emitted light reaches the working plane. This reduces the number of luminaires required and improves energy efficiency."
  },
  {
    id: 10,
    question: "What illuminance level is recommended for a retail sales area?",
    options: ["150 lux", "300 lux", "500 lux", "750 lux"],
    correctAnswer: 1,
    explanation: "300 lux is recommended for general retail sales areas. However, accent lighting at much higher levels (up to 5000 lux) may be used on feature displays to attract attention and create visual hierarchy."
  }
];

const faqs = [
  {
    question: "Why do lighting standards specify 'maintained' illuminance rather than initial?",
    answer: "Maintained illuminance ensures the space continues to meet requirements throughout the maintenance period. Light output reduces over time due to lamp lumen depreciation (LLD), luminaire dirt depreciation (LDD) and room surface degradation. The maintenance factor (MF = LLD × LDD × RSDD) is applied to calculate initial illuminance needed to achieve the maintained value."
  },
  {
    question: "How do I select the appropriate UGR limit for a space?",
    answer: "UGR limits are determined by the visual tasks performed. UGR 16 is required for demanding tasks like technical drawing. UGR 19 applies to offices, classrooms and similar. UGR 22 is acceptable for industrial areas. UGR 25 is permitted for corridors and circulation. These values are specified in CIBSE SLL Code for Lighting and EN 12464-1."
  },
  {
    question: "What is the difference between Ra and CRI?",
    answer: "Ra (General Colour Rendering Index) and CRI (Colour Rendering Index) refer to the same measurement. Ra is the average of the first 8 test colour samples (R1-R8) from the CIE test method. Values range from 0-100, with higher values indicating better colour rendering. Modern specifications sometimes also consider R9 (saturated red) separately."
  },
  {
    question: "How does circadian lighting affect design criteria?",
    answer: "Circadian or human-centric lighting considers the non-visual effects of light on human biology. It typically involves varying colour temperature and intensity throughout the day - cooler, brighter light in the morning and warmer, dimmer light in the evening. This requires tuneable white luminaires and sophisticated control systems. Current guidance recommends melanopic equivalent daylight illuminance (M-EDI) targets."
  },
  {
    question: "Why is uniformity important and how is it calculated?",
    answer: "Good uniformity prevents the visual discomfort caused by bright and dark patches, which forces the eye to constantly adapt. Uniformity ratio Uo = Emin/Eav (minimum illuminance divided by average). For task areas Uo should be at least 0.7. For surrounding areas Uo should be at least 0.5. Poor uniformity can also create safety hazards by obscuring obstacles."
  },
  {
    question: "What are the typical room surface reflectances used in lighting calculations?",
    answer: "Standard reflectances for lighting calculations are: ceiling 0.7 (70%), walls 0.5 (50%), floor 0.2 (20%). These are typical values for light-coloured surfaces. Dark surfaces have lower reflectances - a dark ceiling might be 0.3. These values significantly affect the utilisation factor and should be verified or adjusted for the actual room finishes."
  }
];

const HNCModule4Section4_1 = () => {
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
            <Target className="h-4 w-4" />
            <span>Module 4.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Lighting Design Criteria
          </h1>
          <p className="text-white/80">
            Establishing the quantitative and qualitative requirements for effective lighting design in building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Illuminance:</strong> Task-appropriate light levels from CIBSE SLL</li>
              <li className="pl-1"><strong>Uniformity:</strong> Uo ≥ 0.7 task area, ≥ 0.5 surrounding</li>
              <li className="pl-1"><strong>Glare:</strong> UGR limits based on visual task demands</li>
              <li className="pl-1"><strong>Colour:</strong> CRI Ra 80+ offices, Ra 90+ colour-critical</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIBSE SLL:</strong> Code for Lighting, Lighting Handbook</li>
              <li className="pl-1"><strong>EN 12464-1:</strong> Indoor workplace lighting</li>
              <li className="pl-1"><strong>EN 12464-2:</strong> Outdoor workplace lighting</li>
              <li className="pl-1"><strong>Part L:</strong> Energy performance requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Determine appropriate illuminance levels for different tasks and spaces",
              "Understand and apply uniformity requirements for visual comfort",
              "Calculate and specify UGR limits for glare control",
              "Select appropriate colour rendering indices for applications",
              "Apply CIBSE SLL and EN 12464 recommendations",
              "Consider human factors in lighting design criteria"
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

        {/* Section 1: Task Illuminance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Task Illuminance - CIBSE SLL Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Illuminance is the quantity of light falling on a surface, measured in lux (lumens per square metre).
              The CIBSE Society of Light and Lighting publishes recommendations for maintained illuminance levels
              based on the visual tasks to be performed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key principles of illuminance specification:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Values are 'maintained' - minimum throughout maintenance cycle</li>
                <li className="pl-1">Measured on the horizontal working plane (typically 0.85m height)</li>
                <li className="pl-1">Higher values needed for fine detail or extended duration tasks</li>
                <li className="pl-1">Age of occupants affects requirements (older eyes need more light)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Illuminance Levels (CIBSE SLL)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Space Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Em (lux)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">UGR</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ra</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">19</td>
                      <td className="border border-white/10 px-3 py-2">80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Technical drawing</td>
                      <td className="border border-white/10 px-3 py-2">750</td>
                      <td className="border border-white/10 px-3 py-2">16</td>
                      <td className="border border-white/10 px-3 py-2">80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Classroom</td>
                      <td className="border border-white/10 px-3 py-2">300</td>
                      <td className="border border-white/10 px-3 py-2">19</td>
                      <td className="border border-white/10 px-3 py-2">80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridor</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2">40</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Retail sales area</td>
                      <td className="border border-white/10 px-3 py-2">300</td>
                      <td className="border border-white/10 px-3 py-2">22</td>
                      <td className="border border-white/10 px-3 py-2">80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial assembly</td>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">22</td>
                      <td className="border border-white/10 px-3 py-2">80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital examination</td>
                      <td className="border border-white/10 px-3 py-2">1000</td>
                      <td className="border border-white/10 px-3 py-2">19</td>
                      <td className="border border-white/10 px-3 py-2">90</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> These are maintained illuminance values. Initial illuminance must be higher to account for the maintenance factor (typically MF = 0.7-0.8).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Uniformity */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Uniformity Ratios - Even Light Distribution
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Uniformity ensures light is evenly distributed across the working area, preventing excessive
              contrast between bright and dark areas. Poor uniformity causes visual fatigue as the eye
              constantly adapts to different light levels.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Uniformity definitions:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Uo (Uniformity ratio):</strong> Emin / Eav (minimum / average illuminance)</li>
                <li className="pl-1"><strong>Ud (Diversity):</strong> Emin / Emax (minimum / maximum illuminance)</li>
                <li className="pl-1">Task area: Uo ≥ 0.7 required</li>
                <li className="pl-1">Immediate surrounding: Uo ≥ 0.5 required</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Task Area Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Width minimum 0.6m × depth 0.6m</li>
                  <li className="pl-1">Centred on visual task position</li>
                  <li className="pl-1">Uniformity Uo ≥ 0.7</li>
                  <li className="pl-1">Must achieve maintained illuminance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Surrounding Area Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">0.5m band around task area</li>
                  <li className="pl-1">Illuminance ≥ 0.3 × task area</li>
                  <li className="pl-1">Never less than 200 lux</li>
                  <li className="pl-1">Uniformity Uo ≥ 0.5</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Luminance Ratios in the Visual Field</p>
              <p className="text-sm text-white mb-2">To prevent adaptation problems, luminance ratios should not exceed:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Task to immediate surroundings: 3:1</li>
                <li className="pl-1">Task to general background: 10:1</li>
                <li className="pl-1">Light source to adjacent surface: 20:1</li>
                <li className="pl-1">Anywhere in field of view: 40:1 maximum</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Achieve good uniformity by spacing luminaires appropriately - typically spacing-to-height ratio (SHR) of 1.0-1.5 depending on luminaire type.
            </p>
          </div>
        </section>

        {/* Section 3: Glare Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Glare Control - Unified Glare Rating (UGR)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Glare occurs when bright sources in the field of view cause discomfort or reduce the ability
              to see. The Unified Glare Rating (UGR) system quantifies discomfort glare from luminaires,
              with lower values indicating better glare control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of glare:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Discomfort glare:</strong> Causes annoyance without necessarily reducing visibility (measured by UGR)</li>
                <li className="pl-1"><strong>Disability glare:</strong> Reduces visibility of the task (veiling reflections)</li>
                <li className="pl-1"><strong>Direct glare:</strong> From luminaires or windows in field of view</li>
                <li className="pl-1"><strong>Reflected glare:</strong> From reflections on glossy surfaces</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UGR Limits by Application</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">UGR Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UGR ≤ 16</td>
                      <td className="border border-white/10 px-3 py-2">Technical drawing, fine assembly, CAD workstations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UGR ≤ 19</td>
                      <td className="border border-white/10 px-3 py-2">Offices, classrooms, laboratories, meeting rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UGR ≤ 22</td>
                      <td className="border border-white/10 px-3 py-2">Industrial work, retail, sports halls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UGR ≤ 25</td>
                      <td className="border border-white/10 px-3 py-2">Corridors, circulation areas, plant rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UGR ≤ 28</td>
                      <td className="border border-white/10 px-3 py-2">Heavy industrial, storage areas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting UGR</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/70 mb-1">Increase UGR (worse):</p>
                  <ul className="text-white space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">Higher luminaire luminance</li>
                    <li className="pl-1">Larger luminaire area</li>
                    <li className="pl-1">Dark room surfaces</li>
                    <li className="pl-1">Luminaire in direct line of sight</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white/70 mb-1">Reduce UGR (better):</p>
                  <ul className="text-white space-y-0.5 list-disc list-outside ml-5">
                    <li className="pl-1">Low-brightness diffusers/louvres</li>
                    <li className="pl-1">Indirect lighting component</li>
                    <li className="pl-1">Light room surfaces</li>
                    <li className="pl-1">Luminaires outside critical viewing zone</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>VDU workstations:</strong> Luminaires in the 'offending zone' (reflected in screens) should have luminance below 1500 cd/m² at relevant angles to prevent reflected glare.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Colour Rendering */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Colour Rendering and Visual Comfort
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Colour rendering describes how accurately a light source reveals the true colours of objects.
              It is measured by the Colour Rendering Index (CRI or Ra) on a scale of 0-100, where 100 represents
              perfect colour rendering equivalent to natural daylight.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Colour quality parameters:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CRI/Ra:</strong> General Colour Rendering Index (average of R1-R8)</li>
                <li className="pl-1"><strong>R9:</strong> Saturated red rendering (important for skin tones, food)</li>
                <li className="pl-1"><strong>CCT:</strong> Correlated Colour Temperature in Kelvin</li>
                <li className="pl-1"><strong>Duv:</strong> Distance from black-body curve (colour consistency)</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Minimum CRI Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Ra ≥ 90:</strong> Colour matching, medical, art</li>
                  <li className="pl-1"><strong>Ra ≥ 80:</strong> Offices, schools, retail, homes</li>
                  <li className="pl-1"><strong>Ra ≥ 60:</strong> Industrial, warehouses</li>
                  <li className="pl-1"><strong>Ra ≥ 40:</strong> Outdoor, car parks</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Colour Temperature Guidance</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>2700-3000K:</strong> Warm, relaxing (hospitality)</li>
                  <li className="pl-1"><strong>3500-4000K:</strong> Neutral (retail, healthcare)</li>
                  <li className="pl-1"><strong>4000-5000K:</strong> Cool white (offices, schools)</li>
                  <li className="pl-1"><strong>5000-6500K:</strong> Daylight (colour matching)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Comfort Considerations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Flicker:</strong> LED drivers should provide flicker-free operation (IEEE 1789 compliant)</li>
                <li className="pl-1"><strong>Modelling:</strong> Directional light should reveal 3D form without harsh shadows</li>
                <li className="pl-1"><strong>Daylight integration:</strong> Electric lighting should complement natural light</li>
                <li className="pl-1"><strong>View:</strong> Windows and visual relief from uniform artificial environments</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Kruithof curve:</strong> Visual comfort depends on the relationship between illuminance and colour temperature - higher illuminance levels are more acceptable with cooler colour temperatures.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Lighting Criteria</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Specify lighting criteria for a new open-plan office with VDU workstations.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>From CIBSE SLL and EN 12464-1:</p>
                <p className="mt-2">Maintained illuminance: <strong>500 lux</strong> on working plane (0.85m)</p>
                <p>Uniformity: <strong>Uo ≥ 0.7</strong> (task area)</p>
                <p>Glare rating: <strong>UGR ≤ 19</strong></p>
                <p>Colour rendering: <strong>Ra ≥ 80</strong></p>
                <p>Colour temperature: <strong>4000K</strong> (neutral white)</p>
                <p className="mt-2 text-white/60">Additional VDU requirements:</p>
                <p>Luminaire luminance in offending zone: &lt;1500 cd/m²</p>
                <p>Ceiling luminance ratio: ≤3:1</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Calculating Uniformity</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A task area has illuminance measurements of: min 420 lux, max 580 lux, average 510 lux. Check compliance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Uniformity ratio Uo = Emin / Eav</p>
                <p>Uo = 420 / 510 = <strong>0.82</strong></p>
                <p className="mt-2 text-green-400">✓ Compliant (Uo ≥ 0.7 required)</p>
                <p className="mt-2">Diversity Ud = Emin / Emax</p>
                <p>Ud = 420 / 580 = <strong>0.72</strong></p>
                <p className="mt-2">Average illuminance check:</p>
                <p>510 lux <strong>&gt; 500 lux maintained</strong></p>
                <p className="text-green-400">✓ Compliant with illuminance requirement</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Surrounding Area Requirements</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Task area illuminance is 750 lux. What is the minimum surrounding area illuminance?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Surrounding area requirement: ≥30% of task area</p>
                <p className="mt-2">Minimum = 750 × 0.3 = <strong>225 lux</strong></p>
                <p className="mt-2">Check against absolute minimum:</p>
                <p>225 lux &gt; 200 lux (absolute minimum)</p>
                <p className="mt-2 text-green-400">✓ Surrounding area requires minimum <strong>225 lux</strong></p>
                <p className="mt-2 text-white/60">Uniformity in surrounding: Uo ≥ 0.5</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Criteria Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Illuminance:</strong> Identify tasks, specify maintained lux from CIBSE SLL</li>
                <li className="pl-1"><strong>Uniformity:</strong> Uo ≥ 0.7 task, ≥ 0.5 surrounding area</li>
                <li className="pl-1"><strong>Glare:</strong> Specify UGR limit for visual task demands</li>
                <li className="pl-1"><strong>Colour:</strong> CRI and CCT appropriate to application</li>
                <li className="pl-1"><strong>Maintenance:</strong> Specify maintenance factor assumptions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Reference Documents</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>CIBSE LG7:</strong> Office Lighting</li>
                <li className="pl-1"><strong>CIBSE LG5:</strong> Lighting for Education</li>
                <li className="pl-1"><strong>CIBSE LG2:</strong> Hospital Lighting</li>
                <li className="pl-1"><strong>EN 12464-1:</strong> Indoor workplaces</li>
                <li className="pl-1"><strong>SLL Code for Lighting:</strong> General guidance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Confusing initial and maintained:</strong> Always specify maintained illuminance</li>
                <li className="pl-1"><strong>Ignoring surroundings:</strong> Design must include surrounding area criteria</li>
                <li className="pl-1"><strong>UGR calculation errors:</strong> UGR varies with viewing position and room proportions</li>
                <li className="pl-1"><strong>Poor colour choices:</strong> Match CCT to application and illuminance level</li>
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
                <p className="font-medium text-white mb-1">Typical Office Requirements</p>
                <ul className="space-y-0.5">
                  <li>Illuminance: 500 lux maintained</li>
                  <li>Uniformity: Uo ≥ 0.7</li>
                  <li>Glare: UGR ≤ 19</li>
                  <li>Colour: Ra ≥ 80, 4000K</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Relationships</p>
                <ul className="space-y-0.5">
                  <li>Surrounding ≥ 30% of task (min 200 lux)</li>
                  <li>Task to background ratio ≤ 10:1</li>
                  <li>VDU zone luminance &lt;1500 cd/m²</li>
                  <li>Spacing ratio 1.0-1.5 typical</li>
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
            <Link to="../h-n-c-module4-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section4-2">
              Next: Interior Lighting Calculations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section4_1;
