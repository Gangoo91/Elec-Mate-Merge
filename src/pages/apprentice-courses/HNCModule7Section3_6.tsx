import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "CIBSE Standards - HNC Module 7 Section 3.6";
const DESCRIPTION = "Master CIBSE lighting standards for building services: Lighting Guides LG3, LG7, LG10, SLL Code for Lighting, maintained illuminance requirements, BS EN 12464-1 compliance, and workplace lighting design.";

const quickCheckQuestions = [
  {
    id: "cibse-lg7-purpose",
    question: "What is the primary focus of CIBSE Lighting Guide LG7?",
    options: ["Industrial lighting", "Office lighting", "Emergency lighting", "Exterior lighting"],
    correctIndex: 1,
    explanation: "CIBSE LG7 specifically addresses office lighting, providing detailed guidance on illuminance levels, glare control, daylight integration, and visual comfort for office environments."
  },
  {
    id: "maintained-illuminance",
    question: "What does 'maintained illuminance' (Em) represent?",
    options: ["The initial illuminance when luminaires are new", "The average illuminance below which the value should not fall", "The maximum illuminance at any point", "The illuminance at the walls only"],
    correctIndex: 1,
    explanation: "Maintained illuminance (Em) is the average illuminance on a specified surface at the time when maintenance must be carried out. It accounts for lamp lumen depreciation and luminaire dirt accumulation over time."
  },
  {
    id: "ugr-limit",
    question: "For a typical office environment, what is the recommended UGR limit according to CIBSE/BS EN 12464-1?",
    options: ["UGR &lt; 25", "UGR &lt; 22", "UGR &lt; 19", "UGR &lt; 16"],
    correctIndex: 2,
    explanation: "For office work involving writing, typing, reading, and data processing, the UGR limit should be 19 or less. This ensures visual comfort and reduces the risk of discomfort glare from luminaires."
  },
  {
    id: "colour-rendering",
    question: "What minimum colour rendering index (Ra) is required for offices under CIBSE guidelines?",
    options: ["Ra &gt; 60", "Ra &gt; 70", "Ra &gt; 80", "Ra &gt; 90"],
    correctIndex: 2,
    explanation: "A minimum colour rendering index of Ra &gt; 80 is required for most office and commercial environments. This ensures accurate colour perception for tasks and maintains a pleasant visual environment."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which CIBSE Lighting Guide covers recommendations for areas associated with visual display terminals?",
    options: [
      "LG3 - The Visual Environment",
      "LG7 - Office Lighting",
      "LG10 - Daylighting",
      "LG14 - Control of Electric Lighting"
    ],
    correctAnswer: 1,
    explanation: "CIBSE LG7 (Office Lighting) provides comprehensive guidance for areas with VDTs, including screen reflections, luminaire positioning, and maintaining appropriate luminance ratios."
  },
  {
    id: 2,
    question: "According to BS EN 12464-1, what is the maintained illuminance requirement for general office areas?",
    options: ["200 lux", "300 lux", "500 lux", "750 lux"],
    correctAnswer: 2,
    explanation: "BS EN 12464-1 specifies a maintained illuminance of 500 lux for general office work including writing, typing, reading, and data processing. This aligns with CIBSE LG7 recommendations."
  },
  {
    id: 3,
    question: "What is the purpose of the maintenance factor (MF) in lighting design?",
    options: [
      "To increase initial light output",
      "To account for light loss over the installation's service life",
      "To calculate energy consumption",
      "To determine cable sizes"
    ],
    correctAnswer: 1,
    explanation: "The maintenance factor accounts for reduced light output over time due to lamp lumen depreciation, luminaire dirt accumulation, and room surface deterioration. MF = LLMF x LSF x LMF x RSMF."
  },
  {
    id: 4,
    question: "CIBSE LG3 'The Visual Environment' primarily addresses:",
    options: [
      "Specific lighting applications",
      "Fundamental principles of how light affects human vision and comfort",
      "Emergency lighting requirements",
      "Daylight harvesting techniques"
    ],
    correctAnswer: 1,
    explanation: "LG3 covers fundamental visual science including how the eye works, visual performance, visual comfort, and the relationship between lighting and health. It underpins all other lighting guides."
  },
  {
    id: 5,
    question: "What maintained illuminance does BS EN 12464-1 specify for technical drawing tasks?",
    options: ["300 lux", "500 lux", "750 lux", "1000 lux"],
    correctAnswer: 2,
    explanation: "Technical drawing requires 750 lux maintained illuminance due to the fine detail and precision required. This is higher than general office work to support accurate visual tasks."
  },
  {
    id: 6,
    question: "The SLL Code for Lighting is published by which organisation?",
    options: [
      "British Standards Institution",
      "Institution of Engineering and Technology",
      "Society of Light and Lighting (part of CIBSE)",
      "Health and Safety Executive"
    ],
    correctAnswer: 2,
    explanation: "The SLL Code for Lighting is published by the Society of Light and Lighting, which is part of CIBSE. It provides comprehensive guidance on interior and exterior lighting design."
  },
  {
    id: 7,
    question: "For an assembly area (educational), what is the recommended maintained illuminance?",
    options: ["150 lux", "200 lux", "300 lux", "500 lux"],
    correctAnswer: 2,
    explanation: "Assembly halls and similar gathering spaces require 300 lux maintained illuminance according to BS EN 12464-1, suitable for general activities without detailed visual tasks."
  },
  {
    id: 8,
    question: "CIBSE LG10 focuses specifically on:",
    options: [
      "Emergency lighting design",
      "Daylighting and window design",
      "Industrial lighting applications",
      "Sports lighting requirements"
    ],
    correctAnswer: 1,
    explanation: "CIBSE LG10 covers daylighting, including window design, daylight factor calculations, solar control, and integration of daylight with electric lighting systems."
  },
  {
    id: 9,
    question: "What uniformity ratio (Uo) is typically required for office task areas under CIBSE guidance?",
    options: ["Uo &gt; 0.3", "Uo &gt; 0.4", "Uo &gt; 0.6", "Uo &gt; 0.8"],
    correctAnswer: 2,
    explanation: "A uniformity ratio of at least 0.6 is required for task areas, meaning the minimum illuminance should be at least 60% of the average. This prevents excessive contrast across the working plane."
  },
  {
    id: 10,
    question: "Which standard specifically addresses workplace lighting requirements in the European Union?",
    options: [
      "BS 5266",
      "BS EN 12464-1",
      "BS 7671",
      "BS EN 1838"
    ],
    correctAnswer: 1,
    explanation: "BS EN 12464-1 'Light and lighting - Lighting of work places - Part 1: Indoor work places' is the European standard adopted in the UK for workplace lighting requirements."
  },
  {
    id: 11,
    question: "For circulation areas (corridors) in buildings, what is the minimum maintained illuminance?",
    options: ["50 lux", "100 lux", "150 lux", "200 lux"],
    correctAnswer: 1,
    explanation: "Corridors and circulation areas require a minimum of 100 lux maintained illuminance according to BS EN 12464-1, sufficient for safe movement but lower than task areas."
  },
  {
    id: 12,
    question: "What does LLMF stand for in lighting maintenance calculations?",
    options: [
      "Lamp Lumen Maintenance Factor",
      "Light Level Measurement Factor",
      "Luminaire Lumen Maintenance Factor",
      "Low Light Modification Factor"
    ],
    correctAnswer: 0,
    explanation: "LLMF (Lamp Lumen Maintenance Factor) represents the proportion of initial lamp lumens remaining at the end of the maintenance period due to lamp ageing and lumen depreciation."
  }
];

const faqs = [
  {
    question: "What is the difference between CIBSE Lighting Guides and BS EN 12464-1?",
    answer: "BS EN 12464-1 is the European standard that sets minimum legal requirements for workplace lighting, specifying illuminance levels, uniformity, and glare limits. CIBSE Lighting Guides provide more detailed design guidance, best practices, and worked examples that help designers exceed minimum standards and achieve optimal lighting quality. Use BS EN 12464-1 for compliance requirements and CIBSE guides for design methodology."
  },
  {
    question: "How do I calculate the maintenance factor for a lighting installation?",
    answer: "Maintenance Factor (MF) = LLMF x LSF x LMF x RSMF, where LLMF is Lamp Lumen Maintenance Factor (typically 0.8-0.9 for LED), LSF is Lamp Survival Factor (1.0 for planned replacement), LMF is Luminaire Maintenance Factor (0.8-0.95 depending on IP rating and environment), and RSMF is Room Surface Maintenance Factor (0.9-0.95 for clean environments). Combined MF typically ranges from 0.6 to 0.8 for office environments."
  },
  {
    question: "Why is UGR important in office lighting design?",
    answer: "Unified Glare Rating (UGR) quantifies discomfort glare from luminaires in an observer's field of view. In offices, excessive glare causes visual discomfort, eye strain, headaches, and reduced productivity. UGR limits (typically 19 for offices) ensure luminaires are appropriately shielded and positioned. Modern LED luminaires often have UGR &lt; 19 built into their design through optical control."
  },
  {
    question: "What is the relationship between task lighting and ambient lighting?",
    answer: "Task lighting provides higher illuminance at specific work locations (e.g., desk lamps providing 300-500 lux additional light), while ambient lighting provides general illumination throughout the space (typically 300 lux in offices). CIBSE recommends the ratio between task and surrounding areas should not exceed 3:1 to avoid excessive adaptation demands on the eye. Combined systems can reduce energy consumption while maintaining visual comfort."
  },
  {
    question: "How does CIBSE LG10 relate to electric lighting design?",
    answer: "LG10 (Daylighting) directly impacts electric lighting by determining daylight availability, which affects: lighting control strategies (daylight-linked dimming), luminaire positioning (avoiding window glare reflections), and energy calculations (daylight reduces electric lighting hours). Designers must integrate daylight analysis with electric lighting to optimise both visual environment and energy performance."
  },
  {
    question: "What colour temperature is recommended for office environments?",
    answer: "CIBSE and SLL recommend 4000K (neutral white) for most office environments, providing good visual comfort for extended periods. Warmer temperatures (3000K) may be used in relaxation areas, while cooler temperatures (5000-6500K) suit task-intensive areas like drawing offices. The key is consistency - avoid mixing significantly different colour temperatures in the same space to prevent visual discord."
  }
];

const HNCModule7Section3_6 = () => {
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
            <span>Module 7.3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            CIBSE Standards
          </h1>
          <p className="text-white/80">
            Lighting Guide requirements, workplace standards, task lighting and SLL recommendations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIBSE LG:</strong> Detailed guidance for lighting applications</li>
              <li className="pl-1"><strong>BS EN 12464-1:</strong> Workplace illuminance requirements</li>
              <li className="pl-1"><strong>Maintained illuminance:</strong> Minimum average over service life</li>
              <li className="pl-1"><strong>UGR limits:</strong> Glare control for visual comfort</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>LG3:</strong> The Visual Environment</li>
              <li className="pl-1"><strong>LG7:</strong> Office lighting (500 lux typical)</li>
              <li className="pl-1"><strong>LG10:</strong> Daylighting and window design</li>
              <li className="pl-1"><strong>SLL Code:</strong> Comprehensive lighting guidance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply CIBSE Lighting Guides LG3, LG7, and LG10 to design projects",
              "Determine maintained illuminance levels for different workplace tasks",
              "Calculate and apply maintenance factors to lighting designs",
              "Specify appropriate UGR limits for visual comfort",
              "Use BS EN 12464-1 for workplace lighting compliance",
              "Integrate SLL Code recommendations into lighting schemes"
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

        {/* Section 1: CIBSE Lighting Guides Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            CIBSE Lighting Guides Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Chartered Institution of Building Services Engineers (CIBSE) publishes a comprehensive
              series of Lighting Guides that provide detailed technical guidance for lighting designers
              and engineers. These guides complement the statutory requirements of BS EN 12464-1 with
              practical design methodologies and best practice recommendations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key CIBSE Lighting Guides:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>LG3 - The Visual Environment:</strong> Fundamental principles of vision, visual performance, and lighting quality</li>
                <li className="pl-1"><strong>LG7 - Office Lighting:</strong> Comprehensive guidance for office environments including VDT areas</li>
                <li className="pl-1"><strong>LG10 - Daylighting:</strong> Window design, daylight factors, and integration with electric lighting</li>
                <li className="pl-1"><strong>LG14 - Control of Electric Lighting:</strong> Lighting control systems and energy management</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Lighting Guide Summary</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Guide</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Title</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LG1</td>
                      <td className="border border-white/10 px-3 py-2">Industrial Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Manufacturing, warehouses, heavy industry</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LG3</td>
                      <td className="border border-white/10 px-3 py-2">The Visual Environment</td>
                      <td className="border border-white/10 px-3 py-2">Vision science, visual comfort, health effects</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LG5</td>
                      <td className="border border-white/10 px-3 py-2">Lighting for Education</td>
                      <td className="border border-white/10 px-3 py-2">Schools, colleges, universities</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LG7</td>
                      <td className="border border-white/10 px-3 py-2">Office Lighting</td>
                      <td className="border border-white/10 px-3 py-2">General offices, VDT areas, meeting rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LG10</td>
                      <td className="border border-white/10 px-3 py-2">Daylighting</td>
                      <td className="border border-white/10 px-3 py-2">Windows, rooflights, daylight factors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Professional practice:</strong> CIBSE guides represent current best practice and are regularly updated to reflect advances in lighting technology and research.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: BS EN 12464-1 and Maintained Illuminance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BS EN 12464-1 and Maintained Illuminance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS EN 12464-1 'Light and lighting - Lighting of work places - Part 1: Indoor work places'
              is the European standard adopted in the UK that specifies lighting requirements for indoor
              workplaces. It defines minimum maintained illuminance levels, uniformity ratios, and glare
              limits for different tasks and activities.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintained Illuminance (Em)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Average illuminance on task plane</li>
                  <li className="pl-1">Value at maintenance point</li>
                  <li className="pl-1">Accounts for depreciation</li>
                  <li className="pl-1">Must not fall below stated value</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Illuminance Uniformity (Uo)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Ratio: Emin / Eaverage</li>
                  <li className="pl-1">Task area: Uo &gt; 0.6</li>
                  <li className="pl-1">Immediate surround: Uo &gt; 0.4</li>
                  <li className="pl-1">Prevents excessive contrast</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Unified Glare Rating (UGR)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Measures discomfort glare</li>
                  <li className="pl-1">Offices typically UGR &lt; 19</li>
                  <li className="pl-1">Industrial may be UGR &lt; 25</li>
                  <li className="pl-1">Lower = better glare control</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Workplace Illuminance Requirements (BS EN 12464-1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Area/Task</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Em (lux)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">UGR</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Ra (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Corridors and circulation</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">28</td>
                      <td className="border border-white/10 px-3 py-2">40</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stairs and escalators</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2">40</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Reception areas</td>
                      <td className="border border-white/10 px-3 py-2">300</td>
                      <td className="border border-white/10 px-3 py-2">22</td>
                      <td className="border border-white/10 px-3 py-2">80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">General office work</td>
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
                      <td className="border border-white/10 px-3 py-2">CAD workstations</td>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">19</td>
                      <td className="border border-white/10 px-3 py-2">80</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Conference rooms</td>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">19</td>
                      <td className="border border-white/10 px-3 py-2">80</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Compliance note:</strong> These are minimum maintained values. Designers may specify higher levels where task demands or occupant preferences require improved visual conditions.
            </p>
          </div>
        </section>

        {/* Section 3: Maintenance Factors and Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Maintenance Factors and Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting installations depreciate over time due to lamp ageing, dirt accumulation on
              luminaires, and deterioration of room surfaces. The maintenance factor (MF) accounts for
              these effects, ensuring that the required maintained illuminance is achieved throughout
              the maintenance cycle.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Maintenance Factor Formula</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white">MF = LLMF x LSF x LMF x RSMF</span></p>
                <p className="mt-2"><span className="text-white/60">Where:</span></p>
                <p><span className="text-white/60">LLMF</span> = Lamp Lumen Maintenance Factor (LED typical: 0.90)</p>
                <p><span className="text-white/60">LSF</span> = Lamp Survival Factor (planned replacement: 1.0)</p>
                <p><span className="text-white/60">LMF</span> = Luminaire Maintenance Factor (clean office: 0.90)</p>
                <p><span className="text-white/60">RSMF</span> = Room Surface Maintenance Factor (typical: 0.95)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Maintenance Factor Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Environment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cleaning Interval</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical MF (LED)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical MF (FL)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clean office</td>
                      <td className="border border-white/10 px-3 py-2">3 years</td>
                      <td className="border border-white/10 px-3 py-2">0.77</td>
                      <td className="border border-white/10 px-3 py-2">0.67</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Normal office</td>
                      <td className="border border-white/10 px-3 py-2">2 years</td>
                      <td className="border border-white/10 px-3 py-2">0.74</td>
                      <td className="border border-white/10 px-3 py-2">0.64</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Light industrial</td>
                      <td className="border border-white/10 px-3 py-2">2 years</td>
                      <td className="border border-white/10 px-3 py-2">0.68</td>
                      <td className="border border-white/10 px-3 py-2">0.58</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Heavy industrial</td>
                      <td className="border border-white/10 px-3 py-2">1 year</td>
                      <td className="border border-white/10 px-3 py-2">0.60</td>
                      <td className="border border-white/10 px-3 py-2">0.52</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Component Factors Breakdown</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>LLMF:</strong> LED sources 0.85-0.95 at L70 life; fluorescent 0.80-0.90 at rated life</li>
                <li className="pl-1"><strong>LSF:</strong> Group replacement = 1.0; spot replacement typically 0.95</li>
                <li className="pl-1"><strong>LMF:</strong> IP20 open = 0.80-0.90; IP65 sealed = 0.90-0.95</li>
                <li className="pl-1"><strong>RSMF:</strong> Clean rooms 0.95; dirty environments 0.85-0.90</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Use conservative MF values for critical applications. Over-specifying by 10% provides margin for unexpected conditions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: SLL Code and Task Lighting */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            SLL Code for Lighting and Task Lighting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Society of Light and Lighting (SLL), part of CIBSE, publishes the SLL Code for
              Lighting, which provides comprehensive guidance on interior and exterior lighting.
              Task lighting recommendations ensure appropriate illuminance for specific visual
              activities while considering energy efficiency and occupant comfort.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Task Illuminance Scale (SLL Code)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Illuminance (lux)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Task Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50</td>
                      <td className="border border-white/10 px-3 py-2">Orientation/safety</td>
                      <td className="border border-white/10 px-3 py-2">Storage areas, cable routes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">Movement and basic tasks</td>
                      <td className="border border-white/10 px-3 py-2">Corridors, loading bays</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">200</td>
                      <td className="border border-white/10 px-3 py-2">Routine work, low detail</td>
                      <td className="border border-white/10 px-3 py-2">Foyers, rest rooms, archives</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">300</td>
                      <td className="border border-white/10 px-3 py-2">Moderate visual tasks</td>
                      <td className="border border-white/10 px-3 py-2">Classrooms, retail areas</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">500</td>
                      <td className="border border-white/10 px-3 py-2">Standard office tasks</td>
                      <td className="border border-white/10 px-3 py-2">Offices, control rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">750</td>
                      <td className="border border-white/10 px-3 py-2">Demanding visual tasks</td>
                      <td className="border border-white/10 px-3 py-2">Drawing, inspection work</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1000</td>
                      <td className="border border-white/10 px-3 py-2">Very fine detail tasks</td>
                      <td className="border border-white/10 px-3 py-2">Colour matching, fine assembly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-2">Task Lighting Benefits</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Higher illuminance where needed</li>
                  <li>Individual control for occupants</li>
                  <li>Energy savings vs. high ambient</li>
                  <li>Reduced eye strain for detail work</li>
                  <li>Flexibility for changing layouts</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <p className="font-medium text-white mb-2">Design Considerations</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Task:surround ratio max 3:1</li>
                  <li>Avoid veiling reflections on screens</li>
                  <li>Position to avoid shadows</li>
                  <li>Consider colour temperature consistency</li>
                  <li>Provide switching/dimming control</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Illuminance Ratios (SLL Recommendations)</p>
              <div className="text-sm space-y-2">
                <p><strong>Task area to immediate surround:</strong> Max 3:1</p>
                <p><strong>Task area to background:</strong> Max 10:1</p>
                <p><strong>Luminaire luminance to ceiling:</strong> Max 20:1</p>
                <p><strong>Window to adjacent wall:</strong> Max 20:1</p>
                <p className="text-white/70 mt-2">These ratios ensure comfortable adaptation and prevent excessive contrast that causes visual fatigue.</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Energy efficiency:</strong> Combining 300 lux ambient lighting with task lighting for desk work can reduce installed load by 20-30% compared to 500 lux uniform ambient.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Office Lighting Specification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Specify lighting requirements for a 200m² open-plan office with VDT workstations.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Requirements from BS EN 12464-1 / CIBSE LG7:</p>
                <p className="mt-2 ml-4">Maintained illuminance (Em): 500 lux</p>
                <p className="ml-4">Uniformity on task area (Uo): &gt; 0.6</p>
                <p className="ml-4">Unified Glare Rating (UGR): &lt; 19</p>
                <p className="ml-4">Colour rendering index (Ra): &gt; 80</p>
                <p className="ml-4">Colour temperature: 4000K (neutral white)</p>
                <p className="mt-2">Additional considerations:</p>
                <p className="ml-4">- Luminaire mounting: Recessed or suspended</p>
                <p className="ml-4">- Screen glare: Position to avoid reflections</p>
                <p className="ml-4">- Controls: Daylight dimming, occupancy sensing</p>
                <p className="mt-2 text-green-400">Compliant specification meets LG7 best practice</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Maintenance Factor Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate MF for LED luminaires in a normal office with 3-year maintenance cycle.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Component factors (from CIBSE tables):</p>
                <p className="mt-2 ml-4">LLMF (LED at 30,000 hrs): 0.90</p>
                <p className="ml-4">LSF (group replacement): 1.0</p>
                <p className="ml-4">LMF (IP20, normal environment): 0.87</p>
                <p className="ml-4">RSMF (3-year cycle): 0.95</p>
                <p className="mt-2">Calculation:</p>
                <p className="ml-4">MF = 0.90 x 1.0 x 0.87 x 0.95</p>
                <p className="ml-4 text-green-400">MF = 0.74</p>
                <p className="mt-2">Design illuminance required:</p>
                <p className="ml-4">Initial = 500 / 0.74 = 676 lux</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Task and Ambient Lighting Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design combined ambient and task lighting for a drawing office.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Requirements (technical drawing):</p>
                <p className="ml-4">Total illuminance required: 750 lux</p>
                <p className="ml-4">UGR limit: 16</p>
                <p className="mt-2">Combined approach:</p>
                <p className="ml-4">Ambient lighting: 300 lux (uniform ceiling grid)</p>
                <p className="ml-4">Task lighting: 450 lux (adjustable desk lamps)</p>
                <p className="ml-4">Total at task: 750 lux</p>
                <p className="mt-2">Compliance check:</p>
                <p className="ml-4">Task:surround ratio = 750:300 = 2.5:1 &lt; 3:1</p>
                <p className="ml-4 text-green-400">Compliant with SLL recommendations</p>
                <p className="mt-2">Energy benefit:</p>
                <p className="ml-4">300 lux ambient vs 750 lux uniform = 40% lower installed load</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Standards Compliance Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify task types and corresponding BS EN 12464-1 requirements</li>
                <li className="pl-1">Calculate appropriate maintenance factor for the environment</li>
                <li className="pl-1">Verify UGR compliance using luminaire data and room dimensions</li>
                <li className="pl-1">Check uniformity ratios meet minimum requirements</li>
                <li className="pl-1">Confirm colour rendering (Ra) meets task needs</li>
                <li className="pl-1">Document assumptions in lighting design report</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">General office: <strong>500 lux, UGR &lt; 19, Ra &gt; 80</strong></li>
                <li className="pl-1">Technical drawing: <strong>750 lux, UGR &lt; 16, Ra &gt; 80</strong></li>
                <li className="pl-1">Corridors: <strong>100 lux, UGR &lt; 28, Ra &gt; 40</strong></li>
                <li className="pl-1">Task uniformity: <strong>Uo &gt; 0.6</strong></li>
                <li className="pl-1">Typical office MF: <strong>0.70-0.80 (LED)</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using initial illuminance as maintained:</strong> Always apply maintenance factor</li>
                <li className="pl-1"><strong>Ignoring UGR in calculations:</strong> Glare significantly affects comfort</li>
                <li className="pl-1"><strong>Uniform lighting everywhere:</strong> Task/ambient approach often more efficient</li>
                <li className="pl-1"><strong>Wrong Ra for colour-critical tasks:</strong> Check minimum requirements</li>
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
                <p className="font-medium text-white mb-1">CIBSE Lighting Guides</p>
                <ul className="space-y-0.5">
                  <li>LG3 - Visual Environment fundamentals</li>
                  <li>LG7 - Office lighting (500 lux standard)</li>
                  <li>LG10 - Daylighting design</li>
                  <li>SLL Code - Comprehensive reference</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">BS EN 12464-1 Key Values</p>
                <ul className="space-y-0.5">
                  <li>Office: 500 lux, UGR &lt; 19</li>
                  <li>Drawing: 750 lux, UGR &lt; 16</li>
                  <li>Uniformity Uo &gt; 0.6 (task area)</li>
                  <li>Colour rendering Ra &gt; 80 (most tasks)</li>
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
            <Link to="../h-n-c-module7-section4-1">
              Next: Section 4.1
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section3_6;
