import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Uniformity and Quality - HNC Module 7 Section 3.5";
const DESCRIPTION = "Master lighting uniformity and quality metrics for building services: uniformity ratios, diversity, cylindrical illuminance, modelling, and visual comfort per CIBSE LG7 standards.";

const quickCheckQuestions = [
  {
    id: "uniformity-ratio",
    question: "What is the uniformity ratio (Uo) formula?",
    options: ["Emax / Emin", "Emin / Eav", "Eav / Emax", "Emin / Emax"],
    correctIndex: 1,
    explanation: "Uniformity ratio (Uo) is calculated as Emin / Eav (minimum illuminance divided by average illuminance). This ratio indicates how evenly light is distributed across a task area."
  },
  {
    id: "cylindrical-illuminance",
    question: "What does cylindrical illuminance (Ez) primarily assess?",
    options: ["Task visibility on horizontal surfaces", "The ability to recognise faces and expressions", "Emergency lighting levels", "Energy efficiency of luminaires"],
    correctIndex: 1,
    explanation: "Cylindrical illuminance (Ez) measures the mean illuminance on the curved surface of a vertical cylinder, which correlates with our ability to recognise faces and perceive three-dimensional objects in a space."
  },
  {
    id: "modelling-ratio",
    question: "What is the recommended modelling ratio range for good facial recognition?",
    options: ["0.1 to 0.2", "0.3 to 0.6", "0.7 to 0.9", "1.0 to 1.5"],
    correctIndex: 1,
    explanation: "A modelling ratio between 0.3 and 0.6 provides good three-dimensional perception and facial recognition. Values below 0.3 create flat, shadowless lighting; values above 0.6 can create harsh shadows."
  },
  {
    id: "ugr-limit",
    question: "What is the typical UGR limit for office work per CIBSE recommendations?",
    options: ["UGR ≤ 13", "UGR ≤ 16", "UGR ≤ 19", "UGR ≤ 25"],
    correctIndex: 2,
    explanation: "For typical office work, CIBSE recommends a Unified Glare Rating (UGR) of 19 or less. More demanding visual tasks may require UGR ≤ 16, whilst industrial spaces may permit UGR ≤ 25."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "If the minimum illuminance in an office is 320 lux and the average is 500 lux, what is the uniformity ratio?",
    options: [
      "Uo = 0.50",
      "Uo = 0.64",
      "Uo = 1.56",
      "Uo = 0.36"
    ],
    correctAnswer: 1,
    explanation: "Uo = Emin / Eav = 320 / 500 = 0.64. This meets the CIBSE minimum requirement of Uo ≥ 0.6 for office task areas."
  },
  {
    id: 2,
    question: "What is the CIBSE LG7 minimum uniformity ratio for office task areas?",
    options: ["Uo ≥ 0.4", "Uo ≥ 0.5", "Uo ≥ 0.6", "Uo ≥ 0.8"],
    correctAnswer: 2,
    explanation: "CIBSE LG7 specifies a minimum uniformity ratio of Uo ≥ 0.6 for office task areas. The immediate surrounding area should have Uo ≥ 0.4."
  },
  {
    id: 3,
    question: "Diversity ratio is the inverse of uniformity ratio. If Uo = 0.5, what is the diversity ratio?",
    options: ["0.5", "1.5", "2.0", "0.25"],
    correctAnswer: 2,
    explanation: "Diversity ratio = 1 / Uo = 1 / 0.5 = 2.0. This means the maximum illuminance is twice the minimum. Lower diversity (closer to 1.0) indicates more uniform lighting."
  },
  {
    id: 4,
    question: "Which factor does NOT directly affect the Unified Glare Rating (UGR)?",
    options: [
      "Luminaire luminance",
      "Background luminance",
      "Solid angle of luminaires",
      "Colour temperature of light"
    ],
    correctAnswer: 3,
    explanation: "UGR is calculated from luminaire luminance, background luminance, solid angle subtended by luminaires, and their position relative to the line of sight. Colour temperature does not feature in the UGR formula."
  },
  {
    id: 5,
    question: "What is the recommended cylindrical illuminance (Ez) for general office areas?",
    options: ["50 lux", "100 lux", "150 lux", "200 lux"],
    correctAnswer: 2,
    explanation: "CIBSE recommends a cylindrical illuminance of 150 lux at 1.2m height for general office areas to ensure good facial recognition and visual communication between occupants."
  },
  {
    id: 6,
    question: "The modelling ratio is defined as:",
    options: [
      "Horizontal illuminance / Vertical illuminance",
      "Cylindrical illuminance / Horizontal illuminance",
      "Vertical illuminance / Horizontal illuminance",
      "Minimum illuminance / Maximum illuminance"
    ],
    correctAnswer: 1,
    explanation: "Modelling ratio = Ez / Eh (cylindrical illuminance divided by horizontal illuminance). This ratio indicates how well the lighting reveals three-dimensional form and facial features."
  },
  {
    id: 7,
    question: "For a circulation area, what is the minimum uniformity ratio (Uo) requirement?",
    options: ["Uo ≥ 0.2", "Uo ≥ 0.4", "Uo ≥ 0.6", "Uo ≥ 0.8"],
    correctAnswer: 1,
    explanation: "Circulation areas and corridors require a minimum Uo ≥ 0.4. This lower requirement reflects that precise visual tasks are not typically performed in these spaces."
  },
  {
    id: 8,
    question: "What spacing-to-height ratio (SHR) typically produces uniform lighting from recessed luminaires?",
    options: ["SHR ≤ 1.0", "SHR = 1.0 to 1.5", "SHR = 2.0 to 2.5", "SHR &gt; 3.0"],
    correctAnswer: 1,
    explanation: "A spacing-to-height ratio of 1.0 to 1.5 typically provides good uniformity. The exact SHR depends on the luminaire's light distribution and the manufacturer's recommendations."
  },
  {
    id: 9,
    question: "Which visual comfort issue is caused by excessive luminance contrast in the field of view?",
    options: ["Flicker", "Glare", "Colour distortion", "Shadow banding"],
    correctAnswer: 1,
    explanation: "Glare is caused by excessive luminance contrast in the visual field. This can be from bright luminaires (direct glare) or reflections from surfaces (reflected/veiling glare)."
  },
  {
    id: 10,
    question: "What is the minimum reflectance recommendation for office ceilings per CIBSE?",
    options: ["30-50%", "50-70%", "70-90%", "90-95%"],
    correctAnswer: 2,
    explanation: "CIBSE recommends ceiling reflectance of 70-90% for offices. This high reflectance improves uniformity by increasing the inter-reflected component of light and reduces contrast with luminaires."
  },
  {
    id: 11,
    question: "Veiling reflections primarily affect:",
    options: [
      "Walking in corridors",
      "Reading from glossy or screen surfaces",
      "General ambient perception",
      "Emergency escape routes"
    ],
    correctAnswer: 1,
    explanation: "Veiling reflections occur when light reflects from glossy surfaces (paper, screens) into the viewer's eyes, reducing contrast and legibility. Luminaire positioning and screen orientation can mitigate this."
  },
  {
    id: 12,
    question: "If Ez = 120 lux and Eh = 400 lux, what is the modelling ratio and is it acceptable?",
    options: [
      "0.30 - at the lower acceptable limit",
      "0.30 - below acceptable levels",
      "3.33 - above acceptable levels",
      "0.30 - ideal for most applications"
    ],
    correctAnswer: 0,
    explanation: "Modelling ratio = Ez / Eh = 120 / 400 = 0.30. This is at the lower boundary of the recommended 0.3-0.6 range, meaning it may appear slightly flat but is still acceptable."
  }
];

const faqs = [
  {
    question: "Why is uniformity more important than simply achieving the required average illuminance?",
    answer: "Achieving average illuminance alone can mask significant variations. A space with 500 lux average could have areas of 800 lux and 200 lux, causing visual fatigue as eyes constantly adapt. High uniformity ensures comfortable visual conditions throughout the space, reduces accident risk from poorly lit areas, and prevents energy waste from over-lighting to compensate for dark spots."
  },
  {
    question: "How do I improve uniformity without increasing energy consumption?",
    answer: "Improve uniformity by optimising luminaire spacing (follow manufacturer's SHR recommendations), using luminaires with appropriate light distributions for the mounting height, increasing room surface reflectances (light-coloured ceilings and walls), and considering indirect lighting components. Lighting simulation software can optimise layouts for uniformity without over-specifying luminaires."
  },
  {
    question: "What's the relationship between cylindrical illuminance and horizontal illuminance in practice?",
    answer: "Cylindrical illuminance is typically 30-60% of horizontal illuminance in well-designed schemes. Purely downward-directed lighting gives low Ez (poor modelling), whilst heavily diffused or indirect lighting gives high Ez. The modelling ratio Ez/Eh should be 0.3-0.6 for most applications. Values outside this range indicate lighting that's either too directional (harsh) or too diffuse (flat)."
  },
  {
    question: "When should I specify UGR 16 instead of UGR 19?",
    answer: "Specify UGR 16 for visually demanding tasks requiring sustained concentration: CAD workstations, detailed drawing offices, control rooms, and medical examination areas. UGR 19 is acceptable for general office work, meeting rooms, and reception areas. For industrial and warehouse spaces where precise visual tasks aren't required, UGR 22-25 may be acceptable."
  },
  {
    question: "How do surface reflectances affect lighting quality metrics?",
    answer: "Surface reflectances significantly impact uniformity, modelling, and glare. High ceiling reflectance (70-90%) improves uniformity and reduces contrast with luminaires. Wall reflectance (50-70%) contributes to cylindrical illuminance and modelling. Floor reflectance (20-40%) affects overall light levels. Dark surfaces absorb light, requiring more luminaires and potentially creating uniformity problems near walls."
  },
  {
    question: "Can lighting simulation software accurately predict UGR?",
    answer: "Modern lighting software (DIALux, Relux, AGi32) calculates UGR at specified observer positions using luminaire photometric data. Accuracy depends on quality of photometric files and correct modelling of room geometry and reflectances. Software typically calculates UGR for standardised positions; actual comfort depends on where occupants sit relative to luminaires. Always verify critical positions."
  }
];

const HNCModule7Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section3">
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
            <span>Module 7.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Uniformity and Quality
          </h1>
          <p className="text-white/80">
            Uniformity ratios, diversity, cylindrical illuminance, modelling, and visual comfort per CIBSE LG7
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Uniformity (Uo):</strong> Emin / Eav ≥ 0.6 for task areas</li>
              <li className="pl-1"><strong>Cylindrical (Ez):</strong> 150 lux for facial recognition</li>
              <li className="pl-1"><strong>Modelling ratio:</strong> Ez / Eh = 0.3 to 0.6</li>
              <li className="pl-1"><strong>UGR limit:</strong> ≤ 19 for office work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIBSE LG7:</strong> Office lighting standard</li>
              <li className="pl-1"><strong>Surface reflectance:</strong> Ceiling 70-90%, walls 50-70%</li>
              <li className="pl-1"><strong>SHR:</strong> Spacing-to-height ratio 1.0-1.5</li>
              <li className="pl-1"><strong>Simulation:</strong> DIALux, Relux verification</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate and interpret uniformity and diversity ratios",
              "Understand cylindrical illuminance and its role in visual communication",
              "Apply modelling ratio principles for three-dimensional perception",
              "Specify appropriate UGR limits for different task requirements",
              "Evaluate surface reflectances and their impact on lighting quality",
              "Use lighting quality metrics in design verification per CIBSE standards"
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

        {/* Section 1: Uniformity Ratios */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Uniformity Ratios
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Uniformity describes how evenly illuminance is distributed across a surface. Good uniformity ensures
              comfortable visual conditions, reduces eye strain from adapting to varying light levels, and
              prevents safety hazards from poorly lit areas within an otherwise adequate space.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Uniformity Ratio Formula</p>
              <div className="font-mono text-lg text-white">
                <p>Uo = Emin / Eav</p>
              </div>
              <p className="text-sm text-white/70 mt-2">
                Where Emin is minimum illuminance and Eav is average illuminance across the reference plane
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE LG7 Uniformity Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Area Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Uniformity (Uo)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Task area</td>
                      <td className="border border-white/10 px-3 py-2">Uo ≥ 0.6</td>
                      <td className="border border-white/10 px-3 py-2">Primary work surface</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Immediate surrounding</td>
                      <td className="border border-white/10 px-3 py-2">Uo ≥ 0.4</td>
                      <td className="border border-white/10 px-3 py-2">0.5m band around task area</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Background area</td>
                      <td className="border border-white/10 px-3 py-2">Uo ≥ 0.1</td>
                      <td className="border border-white/10 px-3 py-2">Remainder of room</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circulation areas</td>
                      <td className="border border-white/10 px-3 py-2">Uo ≥ 0.4</td>
                      <td className="border border-white/10 px-3 py-2">Corridors, stairs, lobbies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Diversity ratio:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Diversity = 1 / Uo</strong> or alternatively Emax / Emin</li>
                <li className="pl-1">Lower diversity (closer to 1.0) means more uniform lighting</li>
                <li className="pl-1">Diversity of 2.0 means brightest point is twice the dimmest</li>
                <li className="pl-1">Some standards quote diversity rather than uniformity ratios</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design consideration:</strong> Uniformity can be improved by optimising luminaire spacing, selecting appropriate light distributions, and maximising room surface reflectances.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Cylindrical Illuminance and Modelling */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cylindrical Illuminance and Modelling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cylindrical illuminance (Ez) quantifies the lighting on vertical surfaces, which is essential
              for recognising faces and perceiving three-dimensional form. The modelling ratio relates
              cylindrical to horizontal illuminance, indicating how well lighting reveals depth and texture.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cylindrical Illuminance (Ez)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Mean illuminance on vertical cylinder surface</li>
                  <li className="pl-1">Measured at 1.2m height (seated eye level)</li>
                  <li className="pl-1">Correlates with facial recognition ability</li>
                  <li className="pl-1">Recommended: 150 lux for offices</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Modelling Ratio</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Formula: Ez / Eh (cylindrical / horizontal)</li>
                  <li className="pl-1">Recommended range: 0.3 to 0.6</li>
                  <li className="pl-1">&lt; 0.3: Flat, shadowless appearance</li>
                  <li className="pl-1">&gt; 0.6: Harsh shadows, dramatic</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cylindrical Illuminance Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ez (lux)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">Visual communication</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reception areas</td>
                      <td className="border border-white/10 px-3 py-2">150-200</td>
                      <td className="border border-white/10 px-3 py-2">Welcoming atmosphere</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Meeting rooms</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">Face-to-face interaction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circulation</td>
                      <td className="border border-white/10 px-3 py-2">75-100</td>
                      <td className="border border-white/10 px-3 py-2">Recognition of people</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-2">Modelling Example</p>
              <div className="text-sm text-white space-y-1">
                <p><strong>Scenario:</strong> Office with 500 lux horizontal and 175 lux cylindrical</p>
                <p><strong>Calculation:</strong> Modelling ratio = 175 / 500 = 0.35</p>
                <p><strong>Assessment:</strong> Within 0.3-0.6 range - acceptable three-dimensional perception</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Purely downward lighting gives poor modelling (low Ez). Add indirect or wall-washing components to improve cylindrical illuminance without significantly increasing horizontal levels.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Visual Comfort and UGR */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Visual Comfort and UGR
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Visual comfort encompasses freedom from glare, appropriate contrast, and absence of flicker.
              The Unified Glare Rating (UGR) is the primary metric for discomfort glare from luminaires,
              with lower values indicating less glare discomfort.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">UGR Formula Factors</p>
              <p className="text-sm text-white/80 mb-2">UGR depends on:</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Luminaire luminance (L) - higher = more glare</li>
                <li className="pl-1">Background luminance (Lb) - higher = less perceived glare</li>
                <li className="pl-1">Solid angle (ω) of luminaire as seen by observer</li>
                <li className="pl-1">Position index (p) - related to viewing angle</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE UGR Limits by Application</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity/Area</th>
                      <th className="border border-white/10 px-3 py-2 text-left">UGR Limit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Technical drawing</td>
                      <td className="border border-white/10 px-3 py-2">≤ 16</td>
                      <td className="border border-white/10 px-3 py-2">CAD workstations, drawing offices</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reading, writing, VDU</td>
                      <td className="border border-white/10 px-3 py-2">≤ 19</td>
                      <td className="border border-white/10 px-3 py-2">General offices, classrooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial work</td>
                      <td className="border border-white/10 px-3 py-2">≤ 22</td>
                      <td className="border border-white/10 px-3 py-2">Assembly, machine work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rough work, storage</td>
                      <td className="border border-white/10 px-3 py-2">≤ 25</td>
                      <td className="border border-white/10 px-3 py-2">Warehouses, plant rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circulation</td>
                      <td className="border border-white/10 px-3 py-2">≤ 28</td>
                      <td className="border border-white/10 px-3 py-2">Corridors (no prolonged viewing)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Types of glare:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Discomfort glare:</strong> Causes discomfort without necessarily impairing vision (assessed by UGR)</li>
                <li className="pl-1"><strong>Disability glare:</strong> Impairs vision by reducing contrast (e.g., oncoming headlights)</li>
                <li className="pl-1"><strong>Direct glare:</strong> From luminaires directly in field of view</li>
                <li className="pl-1"><strong>Reflected/veiling glare:</strong> Reflections from glossy surfaces reducing contrast</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>VDU considerations:</strong> For workstations with screens, luminaires should be positioned to avoid reflections. Cross-baffled or low-brightness louvred luminaires help control both direct glare and screen reflections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Surface Reflectances and Design Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Surface Reflectances and Design Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Room surface reflectances significantly influence all lighting quality metrics. High reflectance
              surfaces increase the inter-reflected light component, improving uniformity, modelling, and
              reducing contrast between luminaires and background.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Recommended Reflectances</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Surface</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reflectance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ceiling</td>
                      <td className="border border-white/10 px-3 py-2">70-90%</td>
                      <td className="border border-white/10 px-3 py-2">Improves uniformity, reduces luminaire contrast</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Walls</td>
                      <td className="border border-white/10 px-3 py-2">50-70%</td>
                      <td className="border border-white/10 px-3 py-2">Enhances cylindrical illuminance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Floor</td>
                      <td className="border border-white/10 px-3 py-2">20-40%</td>
                      <td className="border border-white/10 px-3 py-2">Contributes to overall light levels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Furniture</td>
                      <td className="border border-white/10 px-3 py-2">25-45%</td>
                      <td className="border border-white/10 px-3 py-2">Avoids excessive contrast with paper</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Spacing-to-Height Ratio (SHR)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">SHR = spacing / mounting height above WP</li>
                  <li className="pl-1">Typical range: 1.0 to 1.5</li>
                  <li className="pl-1">Manufacturer's SHRmax ensures uniformity</li>
                  <li className="pl-1">Lower SHR = better uniformity, more luminaires</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Luminaire Selection Factors</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Light distribution (narrow, medium, wide)</li>
                  <li className="pl-1">UGR rating at specified room dimensions</li>
                  <li className="pl-1">Uplight/downlight ratio for modelling</li>
                  <li className="pl-1">Luminaire luminance (glare control)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Verification Checklist</p>
              <div className="text-sm space-y-2">
                <p><strong>Uniformity:</strong> Uo ≥ 0.6 on task area, ≥ 0.4 on surroundings</p>
                <p><strong>Cylindrical illuminance:</strong> Ez ≥ 150 lux at 1.2m height</p>
                <p><strong>Modelling ratio:</strong> Ez/Eh between 0.3 and 0.6</p>
                <p><strong>UGR:</strong> Within limit for task type (typically ≤ 19 for offices)</p>
                <p><strong>Surface reflectances:</strong> Ceiling 70-90%, walls 50-70%</p>
                <p><strong>Spacing:</strong> Within manufacturer's SHRmax</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Software verification:</strong> Always use lighting calculation software (DIALux, Relux) to verify uniformity, UGR, and illuminance levels at design stage. Check critical observer positions for UGR compliance.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Uniformity Assessment</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> An open-plan office has measured illuminances of: Emax = 650 lux, Emin = 380 lux, Eav = 520 lux
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Uniformity ratio calculation:</p>
                <p className="mt-2">Uo = Emin / Eav</p>
                <p>Uo = 380 / 520</p>
                <p>Uo = 0.73</p>
                <p className="mt-2">Diversity ratio (alternative expression):</p>
                <p>Diversity = Emax / Emin = 650 / 380 = 1.71</p>
                <p className="mt-2 text-green-400">Result: Uo = 0.73 exceeds minimum 0.6 requirement</p>
                <p className="text-green-400">The lighting provides good uniformity across the task area</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Modelling Ratio Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A meeting room has Eh = 400 lux and Ez = 100 lux. Assess the modelling quality.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Modelling ratio calculation:</p>
                <p className="mt-2">Modelling ratio = Ez / Eh</p>
                <p>Modelling ratio = 100 / 400</p>
                <p>Modelling ratio = 0.25</p>
                <p className="mt-2 text-red-400">Result: 0.25 is below the recommended 0.3-0.6 range</p>
                <p className="text-amber-400">Assessment: Lighting appears flat with poor 3D perception</p>
                <p className="mt-2">Remedial action:</p>
                <p className="text-white/70">- Add wall-washing luminaires</p>
                <p className="text-white/70">- Include indirect lighting component</p>
                <p className="text-white/70">- Increase wall reflectance (light colours)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: SHR and Layout Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Recessed luminaires in a 3.0m ceiling height office, working plane at 0.75m. Luminaire SHRmax = 1.4. Proposed spacing = 3.0m.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Mounting height calculation:</p>
                <p className="mt-2">Hm = Ceiling height - Working plane height</p>
                <p>Hm = 3.0 - 0.75 = 2.25m</p>
                <p className="mt-2">Actual SHR calculation:</p>
                <p>SHR = Spacing / Hm</p>
                <p>SHR = 3.0 / 2.25 = 1.33</p>
                <p className="mt-2 text-green-400">Result: SHR 1.33 is within SHRmax 1.4</p>
                <p className="text-green-400">Layout will achieve acceptable uniformity</p>
                <p className="mt-2 text-white/70">Note: Consider edge spacing to walls (typically 0.5 × spacing)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Metrics Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify uniformity Uo ≥ 0.6 on task areas using calculation software</li>
                <li className="pl-1">Check cylindrical illuminance Ez meets 150 lux at 1.2m height</li>
                <li className="pl-1">Calculate modelling ratio and confirm within 0.3-0.6 range</li>
                <li className="pl-1">Verify UGR at typical viewing positions meets task requirements</li>
                <li className="pl-1">Confirm luminaire spacing within manufacturer's SHRmax</li>
                <li className="pl-1">Specify surface reflectances in design documentation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Task area uniformity: <strong>Uo ≥ 0.6</strong></li>
                <li className="pl-1">Surrounding area uniformity: <strong>Uo ≥ 0.4</strong></li>
                <li className="pl-1">Office cylindrical illuminance: <strong>Ez = 150 lux</strong></li>
                <li className="pl-1">Modelling ratio: <strong>0.3 to 0.6</strong></li>
                <li className="pl-1">Office UGR limit: <strong>≤ 19</strong></li>
                <li className="pl-1">Ceiling reflectance: <strong>70-90%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Design Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring edge zones</strong> - luminaires too far from walls create dark perimeters</li>
                <li className="pl-1"><strong>Exceeding SHRmax</strong> - causes poor uniformity despite adequate average lux</li>
                <li className="pl-1"><strong>All-downlight schemes</strong> - poor modelling and low cylindrical illuminance</li>
                <li className="pl-1"><strong>Dark surfaces</strong> - low reflectances require more luminaires and create contrast issues</li>
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
                <p className="font-medium text-white mb-1">Uniformity Requirements</p>
                <ul className="space-y-0.5">
                  <li>Task area: Uo ≥ 0.6</li>
                  <li>Immediate surrounding: Uo ≥ 0.4</li>
                  <li>Background: Uo ≥ 0.1</li>
                  <li>Circulation: Uo ≥ 0.4</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Quality Metrics</p>
                <ul className="space-y-0.5">
                  <li>Cylindrical Ez: 150 lux (offices)</li>
                  <li>Modelling ratio: 0.3 to 0.6</li>
                  <li>UGR office work: ≤ 19</li>
                  <li>UGR technical: ≤ 16</li>
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
            <Link to="../h-n-c-module7-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section3-6">
              Next: Section 3.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section3_5;
