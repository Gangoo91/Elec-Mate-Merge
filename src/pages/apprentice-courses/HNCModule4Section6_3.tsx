import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Schedules and Data Sheets - HNC Module 4 Section 6.3";
const DESCRIPTION = "Master electrical schedules and data sheets for building services: equipment schedules, cable schedules, luminaire schedules, data sheets and documentation coordination.";

const quickCheckQuestions = [
  {
    id: "schedule-purpose",
    question: "What is the primary purpose of an equipment schedule?",
    options: ["To replace drawings", "To provide detailed tabular data complementing drawings", "To calculate costs", "To list manufacturers only"],
    correctIndex: 1,
    explanation: "Equipment schedules provide detailed tabular information (specifications, quantities, ratings) that complements graphical information shown on drawings."
  },
  {
    id: "cable-schedule",
    question: "What information must a cable schedule include?",
    options: ["Only cable sizes", "Cable reference, size, type, route, length and protective device", "Just start and end points", "Only the cable manufacturer"],
    correctIndex: 1,
    explanation: "Cable schedules must include circuit reference, cable size, type, route details, length, and the associated protective device to enable correct installation and verification."
  },
  {
    id: "luminaire-schedule",
    question: "Why do luminaire schedules include lighting calculation references?",
    options: ["For decoration", "To link specified luminaires to design calculations proving compliance", "They don't need this", "Only for large projects"],
    correctIndex: 1,
    explanation: "Linking luminaires to calculation references demonstrates that the specified products have been verified to meet lighting requirements (lux levels, uniformity, etc.)."
  },
  {
    id: "data-sheet",
    question: "What distinguishes a data sheet from a schedule?",
    options: ["Nothing - they are the same", "Data sheets give detailed technical specifications for a single product type", "Schedules are more detailed", "Data sheets are only from manufacturers"],
    correctIndex: 1,
    explanation: "Data sheets provide comprehensive technical details for a specific product type, while schedules list multiple items in tabular form with key parameters."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT typically included in an equipment schedule?",
    options: [
      "Equipment reference tag",
      "Manufacturer and model",
      "Installation labour hours",
      "Rating and capacity"
    ],
    correctAnswer: 2,
    explanation: "Equipment schedules focus on technical specifications, not labour estimates. Labour hours are typically part of pricing/programme documents, not design schedules."
  },
  {
    id: 2,
    question: "What format is commonly used for schedules in building services?",
    options: [
      "Continuous prose",
      "Tabular format with columns and rows",
      "Diagrams only",
      "Audio recordings"
    ],
    correctAnswer: 1,
    explanation: "Schedules use tabular format with defined columns (parameters) and rows (individual items), allowing clear, organised presentation of data."
  },
  {
    id: 3,
    question: "A cable schedule shows '2c 6mm² LSF' - what does LSF stand for?",
    options: [
      "Low Smoke Flame",
      "Low Smoke and Fume",
      "Light Single Flex",
      "Long Service Factor"
    ],
    correctAnswer: 1,
    explanation: "LSF stands for Low Smoke and Fume, indicating cable sheathing that emits reduced smoke and toxic fumes in fire, required in many building applications."
  },
  {
    id: 4,
    question: "What should a luminaire schedule include for emergency lighting?",
    options: [
      "Only the maintained/non-maintained status",
      "Emergency duration, type, battery test information and location",
      "Just the price",
      "Only the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Emergency luminaire schedules need duration (1hr/3hr), type (maintained/non-maintained/sustained), test provisions, and location for compliance verification."
  },
  {
    id: 5,
    question: "How should schedule references link to layout drawings?",
    options: [
      "They don't need to link",
      "Using unique tags that appear on both documents",
      "By colour coding only",
      "Through verbal description"
    ],
    correctAnswer: 1,
    explanation: "Unique equipment tags (e.g., DB-01, LUM-A1) provide the link between schedule entries and drawing symbols, enabling cross-referencing."
  },
  {
    id: 6,
    question: "What is the purpose of a distribution board schedule?",
    options: [
      "To show the board location only",
      "To detail all circuits, protective devices, cable sizes and loads",
      "To list the board manufacturer only",
      "To provide installation instructions"
    ],
    correctAnswer: 1,
    explanation: "DB schedules detail every circuit including way number, description, protective device type/rating, cable size, and connected load - essential for installation and verification."
  },
  {
    id: 7,
    question: "When should data sheets be requested from manufacturers?",
    options: [
      "Only after installation",
      "During design development to verify equipment meets requirements",
      "Never - specifications are sufficient",
      "Only for expensive items"
    ],
    correctAnswer: 1,
    explanation: "Data sheets should be obtained during design to verify products meet specifications and to provide detailed information for design coordination and O&M documentation."
  },
  {
    id: 8,
    question: "What does 'IP rating' on an equipment data sheet indicate?",
    options: [
      "Internet Protocol compatibility",
      "Ingress Protection against solids and liquids",
      "Installation Priority",
      "Inspection Period"
    ],
    correctAnswer: 1,
    explanation: "IP (Ingress Protection) rating indicates protection against solid objects (first digit) and water (second digit), e.g., IP65 = dust-tight and protected against water jets."
  },
  {
    id: 9,
    question: "How should schedule revisions be managed?",
    options: [
      "Create entirely new schedules each time",
      "Track changes with revision numbers and dates, highlight amendments",
      "Revisions are not necessary",
      "Only update verbally"
    ],
    correctAnswer: 1,
    explanation: "Schedules should follow the same revision control as drawings - revision numbers, dates, and clear identification of changes to maintain document integrity."
  },
  {
    id: 10,
    question: "What coordination check should be performed between schedules and specifications?",
    options: [
      "No check needed",
      "Verify scheduled items match specification requirements",
      "Just check the dates match",
      "Only check manufacturer names"
    ],
    correctAnswer: 1,
    explanation: "Scheduled items must meet specification requirements (IP rating, efficiency, standards compliance, etc.). This coordination check prevents installation of non-compliant equipment."
  }
];

const faqs = [
  {
    question: "Should schedules include quantities?",
    answer: "Yes, schedules typically include quantities for each item type. This helps with procurement, installation planning and cost verification. However, the quantities should be verified against drawings as the primary source of 'what and where'."
  },
  {
    question: "How detailed should cable schedules be?",
    answer: "Cable schedules should include: circuit reference, origin, destination, cable type and size, number of cores, length (measured + allowance), route reference, and associated protective device. For complex routes, include containment references and any specific routing requirements."
  },
  {
    question: "What is the difference between a schedule and a bill of quantities?",
    answer: "Schedules are technical documents defining what equipment is required. Bills of quantities are commercial documents for pricing, often derived from schedules but including rates and totals. Schedules focus on specifications, BoQs on measurement and cost."
  },
  {
    question: "Should I create separate schedules for each floor?",
    answer: "This depends on project size and complexity. Large buildings often have floor-by-floor schedules for clarity. Smaller projects may combine into single schedules. The key is clarity and ease of use - if a single schedule becomes unwieldy, split it."
  },
  {
    question: "How do schedules integrate with BIM?",
    answer: "In BIM workflows, schedules are typically generated automatically from model data. The model contains equipment parameters (ratings, manufacturers, etc.) which export to schedule format. This ensures consistency between 3D model and documentation, reducing errors."
  }
];

const HNCModule4Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6">
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
            <Zap className="h-4 w-4" />
            <span>Module 4.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Schedules and Data Sheets
          </h1>
          <p className="text-white/80">
            Creating comprehensive tabular documentation for building services electrical installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Schedules:</strong> Tabular lists of equipment with specifications</li>
              <li className="pl-1"><strong>Data sheets:</strong> Detailed specs for specific products</li>
              <li className="pl-1"><strong>Purpose:</strong> Complement drawings with detailed data</li>
              <li className="pl-1"><strong>Coordination:</strong> Must align with drawings and specs</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Equipment:</strong> DBs, switchgear, controls</li>
              <li className="pl-1"><strong>Cables:</strong> Routes, sizes, types</li>
              <li className="pl-1"><strong>Luminaires:</strong> Types, quantities, emergency</li>
              <li className="pl-1"><strong>Small power:</strong> Socket outlets, FCUs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Create comprehensive equipment schedules",
              "Develop cable schedules with all required information",
              "Produce luminaire schedules including emergency lighting",
              "Understand data sheet requirements and applications",
              "Coordinate schedules with drawings and specifications",
              "Apply consistent formatting and cross-referencing"
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

        {/* Section 1: Equipment Schedules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Equipment Schedules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Equipment schedules provide tabular summaries of all electrical equipment, linking
              to drawings through unique tags and to specifications through product requirements.
              They enable procurement, installation verification and O&M documentation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical equipment schedule content:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Equipment tag:</strong> Unique reference matching drawings</li>
                <li className="pl-1"><strong>Description:</strong> Equipment type and function</li>
                <li className="pl-1"><strong>Location:</strong> Room/area reference</li>
                <li className="pl-1"><strong>Manufacturer/model:</strong> Specified product (if prescriptive)</li>
                <li className="pl-1"><strong>Rating/capacity:</strong> Key technical parameters</li>
                <li className="pl-1"><strong>Quantity:</strong> Number of units</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Schedule Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Way</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Protection</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Cable</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Load</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">1</td>
                      <td className="border border-white/10 px-2 py-2">Lighting - Office Area</td>
                      <td className="border border-white/10 px-2 py-2">6A Type B MCB</td>
                      <td className="border border-white/10 px-2 py-2">1.5mm² T&E</td>
                      <td className="border border-white/10 px-2 py-2">0.8kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">2</td>
                      <td className="border border-white/10 px-2 py-2">Socket Ring - North</td>
                      <td className="border border-white/10 px-2 py-2">32A Type B RCBO</td>
                      <td className="border border-white/10 px-2 py-2">2.5mm² T&E</td>
                      <td className="border border-white/10 px-2 py-2">2.4kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">3</td>
                      <td className="border border-white/10 px-2 py-2">FCU - Server Rack</td>
                      <td className="border border-white/10 px-2 py-2">20A Type B MCB</td>
                      <td className="border border-white/10 px-2 py-2">2.5mm² T&E</td>
                      <td className="border border-white/10 px-2 py-2">3.0kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">4</td>
                      <td className="border border-white/10 px-2 py-2">Emergency Lighting</td>
                      <td className="border border-white/10 px-2 py-2">6A Type B MCB</td>
                      <td className="border border-white/10 px-2 py-2">1.5mm² FP200</td>
                      <td className="border border-white/10 px-2 py-2">0.2kW</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> DB schedules should match the physical board layout, showing incomer and all outgoing ways.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Cable Schedules */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Schedules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable schedules document all cables in the installation, providing essential
              information for procurement, installation and testing. They link circuit design
              to physical implementation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Cable schedule requirements:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cable reference:</strong> Unique identifier</li>
                <li className="pl-1"><strong>Circuit:</strong> Associated circuit description</li>
                <li className="pl-1"><strong>From/To:</strong> Origin and destination equipment</li>
                <li className="pl-1"><strong>Type:</strong> Cable construction (T&E, SWA, LSF, etc.)</li>
                <li className="pl-1"><strong>Size:</strong> Conductor cross-section (mm²)</li>
                <li className="pl-1"><strong>Cores:</strong> Number of conductors</li>
                <li className="pl-1"><strong>Length:</strong> Route length including allowances</li>
                <li className="pl-1"><strong>Protective device:</strong> Associated MCB/MCCB rating</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Schedule Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Ref</th>
                      <th className="border border-white/10 px-2 py-2 text-left">From</th>
                      <th className="border border-white/10 px-2 py-2 text-left">To</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Cable Type</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">C001</td>
                      <td className="border border-white/10 px-2 py-2">MSB</td>
                      <td className="border border-white/10 px-2 py-2">DB-01</td>
                      <td className="border border-white/10 px-2 py-2">4c 25mm² LSF/SWA</td>
                      <td className="border border-white/10 px-2 py-2">45m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">C002</td>
                      <td className="border border-white/10 px-2 py-2">MSB</td>
                      <td className="border border-white/10 px-2 py-2">DB-02</td>
                      <td className="border border-white/10 px-2 py-2">4c 16mm² LSF/SWA</td>
                      <td className="border border-white/10 px-2 py-2">32m</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">C003</td>
                      <td className="border border-white/10 px-2 py-2">DB-01/3</td>
                      <td className="border border-white/10 px-2 py-2">AHU-01</td>
                      <td className="border border-white/10 px-2 py-2">5c 4mm² LSF/SWA</td>
                      <td className="border border-white/10 px-2 py-2">28m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Length Calculation</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li>Measure route from drawing or model</li>
                <li>Add vertical drops/rises</li>
                <li>Include termination allowances (typically 2m each end)</li>
                <li>Apply contingency (typically 5-10%)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Cable schedules must align with DB schedules and single-line diagrams for consistency.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Luminaire Schedules */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Luminaire Schedules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Luminaire schedules document all lighting equipment, linking lighting design
              calculations to specified products. They are essential for procurement, installation
              and demonstrating compliance with lighting standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Luminaire schedule content:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Type reference:</strong> Schedule tag (Type A, B, C...)</li>
                <li className="pl-1"><strong>Description:</strong> Luminaire type and application</li>
                <li className="pl-1"><strong>Manufacturer/model:</strong> Specified product</li>
                <li className="pl-1"><strong>Lamp/LED data:</strong> Source type, wattage, colour temp</li>
                <li className="pl-1"><strong>Lumen output:</strong> Delivered lumens</li>
                <li className="pl-1"><strong>IP rating:</strong> Ingress protection</li>
                <li className="pl-1"><strong>Mounting:</strong> Recessed, surface, suspended</li>
                <li className="pl-1"><strong>Controls:</strong> DALI, switching, sensors</li>
                <li className="pl-1"><strong>Quantity:</strong> Total number</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Lighting Schedule Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Duration</td>
                      <td className="border border-white/10 px-2 py-2">1 hour or 3 hour rating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Mode</td>
                      <td className="border border-white/10 px-2 py-2">Maintained / Non-maintained / Sustained</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Test facility</td>
                      <td className="border border-white/10 px-2 py-2">Manual / Automatic / Self-test</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Output</td>
                      <td className="border border-white/10 px-2 py-2">Emergency lumens</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Battery</td>
                      <td className="border border-white/10 px-2 py-2">NiCd / NiMH / Li-ion</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Link</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Reference DIALux/Relux calc number</li>
                  <li className="pl-1">Show achieved lux level</li>
                  <li className="pl-1">Note uniformity compliance</li>
                  <li className="pl-1">Include glare rating (UGR)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Match types to layout drawings</li>
                  <li className="pl-1">Coordinate with ceiling grid</li>
                  <li className="pl-1">Verify mounting heights</li>
                  <li className="pl-1">Check HVAC coordination</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BS 5266-1:</strong> Requires emergency lighting schedules to demonstrate compliance with escape route and open area requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Data Sheets */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Data Sheets and Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Data sheets provide comprehensive technical information for specific products,
              enabling design verification, installation planning and maintenance. They supplement
              schedules with detailed specifications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Data sheet content (typical for switchgear):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>General:</strong> Manufacturer, model, type designation</li>
                <li className="pl-1"><strong>Ratings:</strong> Voltage, current, fault level (Icw, Ics, Icu)</li>
                <li className="pl-1"><strong>Standards:</strong> BS EN 61439 compliance details</li>
                <li className="pl-1"><strong>Dimensions:</strong> Height, width, depth, weight</li>
                <li className="pl-1"><strong>Environmental:</strong> IP rating, temperature range</li>
                <li className="pl-1"><strong>Accessories:</strong> Available options and modifications</li>
                <li className="pl-1"><strong>Certifications:</strong> CE marking, third-party approvals</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Document Coordination Matrix</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-2 py-2 text-left">Document</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Shows</th>
                      <th className="border border-white/10 px-2 py-2 text-left">Links To</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Drawings</td>
                      <td className="border border-white/10 px-2 py-2">Location, quantity</td>
                      <td className="border border-white/10 px-2 py-2">Schedules via tags</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Schedules</td>
                      <td className="border border-white/10 px-2 py-2">Summary specs, quantities</td>
                      <td className="border border-white/10 px-2 py-2">Specifications, data sheets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Specifications</td>
                      <td className="border border-white/10 px-2 py-2">Performance requirements</td>
                      <td className="border border-white/10 px-2 py-2">Standards, schedules</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-2 py-2">Data sheets</td>
                      <td className="border border-white/10 px-2 py-2">Detailed product data</td>
                      <td className="border border-white/10 px-2 py-2">Manufacturer literature</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Checks</p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li>Equipment tags consistent across all documents</li>
                <li>Schedule quantities match drawing count</li>
                <li>Specified products meet specification requirements</li>
                <li>Cable schedules align with DB schedules</li>
                <li>Data sheet dimensions allow for spatial coordination</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Create a document coordination matrix and check all links before issue.
            </p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Schedule Formatting</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Use consistent column widths and alignment</li>
                <li className="pl-1">Include clear headers and units</li>
                <li className="pl-1">Group related items logically</li>
                <li className="pl-1">Add subtotals and grand totals where appropriate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Tagging Convention</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DB-01, DB-02:</strong> Distribution boards</li>
                <li className="pl-1"><strong>LUM-A, LUM-B:</strong> Luminaire types</li>
                <li className="pl-1"><strong>C001, C002:</strong> Cable references</li>
                <li className="pl-1"><strong>AHU-01:</strong> Equipment (linked to mechanical)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Mismatched quantities</strong> - Schedule says 10, drawing shows 12</li>
                <li className="pl-1"><strong>Missing information</strong> - Incomplete data for procurement</li>
                <li className="pl-1"><strong>Inconsistent tags</strong> - DB01 vs DB-01 vs DB.01</li>
                <li className="pl-1"><strong>Outdated revisions</strong> - Schedule not updated with drawing changes</li>
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
                <p className="font-medium text-white mb-1">Schedule Types</p>
                <ul className="space-y-0.5">
                  <li>Equipment schedule - General items</li>
                  <li>DB schedule - Circuit details</li>
                  <li>Cable schedule - Wiring data</li>
                  <li>Luminaire schedule - Lighting</li>
                  <li>Small power schedule - Outlets</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Data Sheet Items</p>
                <ul className="space-y-0.5">
                  <li>Ratings (voltage, current, fault)</li>
                  <li>Dimensions and weight</li>
                  <li>IP rating and environment</li>
                  <li>Standards compliance</li>
                  <li>Certifications</li>
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
            <Link to="../h-n-c-module4-section6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section6-4">
              Next: Design Calculations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section6_3;
