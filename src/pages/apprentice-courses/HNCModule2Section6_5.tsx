import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "System Integration - HNC Module 2 Section 6.5";
const DESCRIPTION = "Master multi-service coordination in building services: system integration, optimisation strategies, commissioning processes, handover procedures, and building log books.";

const quickCheckQuestions = [
  {
    id: "commissioning-purpose",
    question: "What is the primary purpose of commissioning?",
    options: ["To complete paperwork", "To verify systems perform as designed", "To train maintenance staff", "To satisfy planning conditions"],
    correctIndex: 1,
    explanation: "Commissioning verifies that installed systems perform according to design intent, achieving specified capacities, efficiencies, and control responses. It bridges the gap between installation and operation."
  },
  {
    id: "bms-integration",
    question: "Which protocol is most commonly used for BMS integration of multiple building services?",
    options: ["Modbus only", "BACnet", "Bluetooth", "WiFi"],
    correctIndex: 1,
    explanation: "BACnet (Building Automation and Control Network) is the ISO standard protocol for building services integration, allowing different manufacturers' equipment to communicate on a common network."
  },
  {
    id: "log-book-content",
    question: "A building log book should contain:",
    options: ["Architectural drawings only", "Operating and maintenance instructions for all systems", "Tenant contact details", "Planning permission documents"],
    correctIndex: 1,
    explanation: "CIBSE TM31 specifies that building log books should contain essential operating and maintenance information for all building services, enabling effective ongoing management."
  },
  {
    id: "soft-landings",
    question: "Soft Landings extended aftercare typically lasts:",
    options: ["1 month", "6 months", "3 years", "10 years"],
    correctIndex: 2,
    explanation: "The Soft Landings framework specifies a 3-year aftercare period with regular reviews, allowing building performance to be monitored, optimised, and issues resolved as they emerge in actual operation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "BSRIA BG6 'A Design Framework for Building Services' recommends coordination meetings at which stage?",
    options: [
      "Only at tender stage",
      "Throughout design, construction, and commissioning",
      "Only during commissioning",
      "After practical completion"
    ],
    correctAnswer: 1,
    explanation: "BG6 recommends regular coordination meetings throughout the project lifecycle - design workshops, installation reviews, and commissioning coordination to ensure integrated outcomes."
  },
  {
    id: 2,
    question: "Which document typically defines commissioning responsibilities and procedures?",
    options: [
      "Building Regulations Approved Document L",
      "CIBSE Commissioning Codes",
      "Architect's specification",
      "Health and Safety file"
    ],
    correctAnswer: 1,
    explanation: "CIBSE Commissioning Codes (A for Air systems, W for Water, R for Refrigeration, etc.) define standard procedures, acceptable tolerances, and documentation requirements for commissioning."
  },
  {
    id: 3,
    question: "What is 'witness testing' in commissioning?",
    options: [
      "Testing in the presence of the design team or client",
      "Testing individual components",
      "Testing by a single witness",
      "Legal documentation of tests"
    ],
    correctAnswer: 0,
    explanation: "Witness testing involves demonstrations of system performance in the presence of the client, design team, or commissioning manager to verify critical parameters meet specification."
  },
  {
    id: 4,
    question: "The Building Log Book (CIBSE TM31) is required for:",
    options: [
      "All buildings",
      "Buildings requiring an EPC under Part L",
      "Domestic buildings only",
      "Historic buildings only"
    ],
    correctAnswer: 1,
    explanation: "Part L requires a building log book for non-domestic buildings to facilitate energy-efficient operation. TM31 provides guidance on content and format."
  },
  {
    id: 5,
    question: "What is 'seasonal commissioning'?",
    options: [
      "Commissioning only in summer",
      "Testing systems under both heating and cooling conditions",
      "Annual recommissioning",
      "Commissioning seasonal equipment"
    ],
    correctAnswer: 1,
    explanation: "Seasonal commissioning tests building services under both heating and cooling conditions, which may require returning to site after initial handover to verify winter/summer performance."
  },
  {
    id: 6,
    question: "BIM Level 2 requires handover of:",
    options: [
      "Paper drawings only",
      "COBie data and digital asset information",
      "BIM models only with no data",
      "Verbal instructions"
    ],
    correctAnswer: 1,
    explanation: "BIM Level 2 (now UK BIM Framework) requires structured data handover using COBie (Construction Operations Building Information Exchange) format for asset management."
  },
  {
    id: 7,
    question: "System optimisation during the first year typically includes:",
    options: [
      "Major equipment replacement",
      "BMS setpoint and schedule adjustment based on actual use",
      "Architectural modifications",
      "Changing the design intent"
    ],
    correctAnswer: 1,
    explanation: "First-year optimisation involves fine-tuning BMS control strategies, adjusting schedules to match actual occupancy, and optimising setpoints - not changing fundamental design or equipment."
  },
  {
    id: 8,
    question: "CIBSE Code W covers commissioning of:",
    options: [
      "Windows",
      "Water distribution systems",
      "Wireless controls",
      "Weather stations"
    ],
    correctAnswer: 1,
    explanation: "CIBSE Commissioning Code W covers water distribution systems including heating, chilled water, and condenser water pipework - flow rates, balancing, and pressure testing."
  },
  {
    id: 9,
    question: "What information should O&M manuals contain?",
    options: [
      "Design calculations only",
      "Equipment schedules, maintenance procedures, and spare parts",
      "Tender documents",
      "Meeting minutes"
    ],
    correctAnswer: 1,
    explanation: "O&M manuals should contain: equipment schedules with model numbers, maintenance procedures and frequencies, spare parts lists, as-built drawings, and commissioning records."
  },
  {
    id: 10,
    question: "Why is coordination between mechanical and electrical services critical?",
    options: [
      "To reduce paperwork",
      "To ensure electrical supplies match equipment needs and controls integrate",
      "To minimise site visits",
      "To satisfy planning requirements"
    ],
    correctAnswer: 1,
    explanation: "M&E coordination ensures electrical supplies (capacity, protection, phase) match mechanical equipment; control interfaces work correctly; and cable routes don't clash with ductwork/pipework."
  },
  {
    id: 11,
    question: "The 'defects liability period' typically lasts:",
    options: [
      "1 week",
      "6 months",
      "12 months",
      "5 years"
    ],
    correctAnswer: 2,
    explanation: "The standard defects liability period is 12 months from practical completion, during which the contractor must rectify defects at their cost. This period is essential for seasonal commissioning."
  },
  {
    id: 12,
    question: "What is a 'snagging list'?",
    options: [
      "A list of design changes",
      "A list of defects and incomplete items to be rectified",
      "A commissioning record",
      "A maintenance schedule"
    ],
    correctAnswer: 1,
    explanation: "A snagging list documents defects, incomplete works, and items not meeting specification, compiled during inspections prior to or after practical completion for contractor rectification."
  }
];

const faqs = [
  {
    question: "Why does commissioning often get compressed at the end of projects?",
    answer: "Programme delays during construction typically eat into commissioning time while the completion date remains fixed. This is a major cause of building performance problems. Best practice is to protect commissioning time in programmes, start commissioning progressively as systems complete, and resist pressure to shortcut procedures. Inadequate commissioning creates long-term operational problems."
  },
  {
    question: "What's the difference between commissioning and testing?",
    answer: "Testing verifies individual components work (e.g., a fan runs, a valve opens). Commissioning verifies the complete system achieves design intent - correct airflows throughout the building, proper temperature control, systems working together. Commissioning includes testing but goes further to demonstrate integrated performance."
  },
  {
    question: "How should the building log book be maintained after handover?",
    answer: "The building operator should keep the log book updated with: any changes to systems or controls; maintenance records; energy consumption data; and occupancy changes. CIBSE TM31 recommends annual log book reviews. The log book should be a living document that reflects current building operation, not just as-built information."
  },
  {
    question: "What is progressive commissioning and when should it be used?",
    answer: "Progressive commissioning starts testing individual systems as they're installed rather than waiting for all systems to be complete. It's especially valuable for large buildings or phased handovers. Benefits include: early identification of problems; spreading commissioning workload; allowing time for seasonal testing; and reducing end-of-project pressure."
  },
  {
    question: "How do I handle commissioning when multiple contractors are involved?",
    answer: "Appoint a commissioning manager to coordinate across packages. Establish clear interface responsibilities in contracts. Hold regular commissioning coordination meetings. Define witness test requirements and notification procedures. Ensure all parties understand their commissioning scope and how it interfaces with others."
  },
  {
    question: "What training should building operators receive at handover?",
    answer: "Operators should receive training on: BMS operation and common adjustments; system start-up and shutdown procedures; filter changes and basic maintenance; alarm response procedures; energy monitoring interpretation; and emergency procedures. Training should be hands-on with the actual installed systems, not just generic instruction."
  }
];

const HNCModule2Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6">
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
            <span>Module 2.6.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            System Integration
          </h1>
          <p className="text-white/80">
            Multi-service coordination, commissioning, handover, and building log books
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Integration:</strong> All services must work together</li>
              <li className="pl-1"><strong>Commissioning:</strong> Verifies systems meet design intent</li>
              <li className="pl-1"><strong>Handover:</strong> O&M manuals, training, documentation</li>
              <li className="pl-1"><strong>Log books:</strong> Required for Part L compliance</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Documents</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>CIBSE Codes A/W/R:</strong> Commissioning procedures</li>
              <li className="pl-1"><strong>CIBSE TM31:</strong> Building log book guidance</li>
              <li className="pl-1"><strong>BSRIA BG6:</strong> Design framework</li>
              <li className="pl-1"><strong>Soft Landings:</strong> 3-year aftercare</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand multi-service coordination requirements",
              "Describe commissioning processes and documentation",
              "Explain handover procedures and O&M requirements",
              "Understand building log book content and purpose",
              "Apply Soft Landings principles for aftercare",
              "Recognise system optimisation opportunities"
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

        {/* Section 1: Multi-Service Coordination */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Multi-Service Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern buildings contain multiple interacting services - heating, cooling, ventilation,
              lighting, fire safety, security, and lifts. Effective coordination ensures these systems
              work together efficiently without conflicts.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Coordination Areas:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Spatial:</strong> Ductwork, pipework, cables sharing routes</li>
                <li className="pl-1"><strong>Electrical:</strong> Power supplies matching equipment needs</li>
                <li className="pl-1"><strong>Controls:</strong> BMS integration of all services</li>
                <li className="pl-1"><strong>Structural:</strong> Plant room loading, penetrations</li>
                <li className="pl-1"><strong>Fire:</strong> Dampers, barriers, smoke control integration</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Integration Protocols</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Protocol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet</td>
                      <td className="border border-white/10 px-3 py-2">Building automation</td>
                      <td className="border border-white/10 px-3 py-2">ISO 16484-5, most common</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modbus</td>
                      <td className="border border-white/10 px-3 py-2">Industrial equipment</td>
                      <td className="border border-white/10 px-3 py-2">Simple, widely supported</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LON</td>
                      <td className="border border-white/10 px-3 py-2">Distributed control</td>
                      <td className="border border-white/10 px-3 py-2">Peer-to-peer network</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">KNX</td>
                      <td className="border border-white/10 px-3 py-2">Lighting, blinds</td>
                      <td className="border border-white/10 px-3 py-2">European standard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DALI</td>
                      <td className="border border-white/10 px-3 py-2">Lighting control</td>
                      <td className="border border-white/10 px-3 py-2">Digital addressable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Workflow (BSRIA BG6)</p>
              <ol className="text-sm text-white space-y-1 list-decimal list-outside ml-5">
                <li>Design coordination workshops (RIBA Stage 3)</li>
                <li>Spatial coordination (clash detection)</li>
                <li>Interface schedules between packages</li>
                <li>Commissioning coordination meetings</li>
                <li>Integrated witness testing</li>
                <li>Handover coordination</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Coordination costs time and money during design but saves
              far more during construction and operation. Early investment in coordination pays dividends.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 2: Commissioning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Commissioning Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Commissioning verifies that installed building services perform according to design intent.
              It's not simply testing - it's the systematic process of achieving, verifying, and
              documenting performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CIBSE Commissioning Codes</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Code</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Coverage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Tests</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Code A</td>
                      <td className="border border-white/10 px-3 py-2">Air distribution</td>
                      <td className="border border-white/10 px-3 py-2">Airflow, pressure, duct leakage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Code W</td>
                      <td className="border border-white/10 px-3 py-2">Water distribution</td>
                      <td className="border border-white/10 px-3 py-2">Flow rates, balancing, pressure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Code R</td>
                      <td className="border border-white/10 px-3 py-2">Refrigeration</td>
                      <td className="border border-white/10 px-3 py-2">Capacity, efficiency, charge</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Code B</td>
                      <td className="border border-white/10 px-3 py-2">Boilers</td>
                      <td className="border border-white/10 px-3 py-2">Output, efficiency, controls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Code C</td>
                      <td className="border border-white/10 px-3 py-2">Controls/BMS</td>
                      <td className="border border-white/10 px-3 py-2">Point-to-point, sequences</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Code L</td>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">Lux levels, controls</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Commissioning Stages:</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Pre-commissioning:</strong> Visual checks, cleaning, flushing</li>
                <li className="pl-1"><strong>Static commissioning:</strong> Individual component tests</li>
                <li className="pl-1"><strong>Dynamic commissioning:</strong> System running tests</li>
                <li className="pl-1"><strong>Regulation:</strong> Balancing, setpoint adjustment</li>
                <li className="pl-1"><strong>Witness testing:</strong> Demonstrations to client</li>
                <li className="pl-1"><strong>Seasonal:</strong> Testing in heating and cooling modes</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Commissioning Tolerances</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Airflow (main duct):</strong> ±5% of design</li>
                <li className="pl-1"><strong>Airflow (terminals):</strong> ±10% of design</li>
                <li className="pl-1"><strong>Water flow:</strong> ±10% of design</li>
                <li className="pl-1"><strong>Room temperature:</strong> ±1°C of setpoint</li>
                <li className="pl-1"><strong>Illuminance:</strong> 0.9 × design (minimum)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical success factor:</strong> Allow adequate time for commissioning. Compressed
              commissioning is a primary cause of building performance problems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Handover and O&M */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Handover and O&M Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective handover transfers knowledge from the design and construction team to those
              who will operate and maintain the building. Poor handover leads to inefficient operation
              and performance degradation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">O&M Manual Contents</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white/60 mb-2">Equipment Information</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li>Equipment schedules with model numbers</li>
                    <li>Data sheets and specifications</li>
                    <li>Installation certificates</li>
                    <li>Warranty information</li>
                    <li>Spare parts lists</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60 mb-2">Operating Information</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li>Operating procedures</li>
                    <li>Maintenance schedules</li>
                    <li>As-built drawings</li>
                    <li>Commissioning records</li>
                    <li>BMS points list and graphics</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Handover Process:</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Draft O&M manuals reviewed before practical completion</li>
                <li className="pl-1">Witness tests completed and documented</li>
                <li className="pl-1">Operator training delivered (hands-on with systems)</li>
                <li className="pl-1">Snagging inspection completed</li>
                <li className="pl-1">Final O&M manuals and as-builts delivered</li>
                <li className="pl-1">Building log book handed over</li>
                <li className="pl-1">Practical completion certificate issued</li>
                <li className="pl-1">Defects liability period begins (typically 12 months)</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Training Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">BMS operation and common adjustments</li>
                <li className="pl-1">System start-up and shutdown procedures</li>
                <li className="pl-1">Routine maintenance (filter changes, etc.)</li>
                <li className="pl-1">Alarm response procedures</li>
                <li className="pl-1">Emergency procedures</li>
                <li className="pl-1">Energy monitoring interpretation</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Video record training sessions for future reference and
              new staff members.
            </p>
          </div>
        </section>

        {/* Section 4: Building Log Books and Soft Landings */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Log Books and Soft Landings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The building log book is a regulatory requirement under Part L, providing essential
              information for energy-efficient operation. Soft Landings extends this with structured
              aftercare to close the performance gap.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building Log Book Contents (CIBSE TM31)</p>
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
                      <td className="border border-white/10 px-3 py-2">Building description</td>
                      <td className="border border-white/10 px-3 py-2">Floor areas, use, occupancy</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy systems</td>
                      <td className="border border-white/10 px-3 py-2">Plant schedules, efficiencies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control strategies</td>
                      <td className="border border-white/10 px-3 py-2">Setpoints, schedules, optimisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Metering</td>
                      <td className="border border-white/10 px-3 py-2">Meter locations, what they measure</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Target performance</td>
                      <td className="border border-white/10 px-3 py-2">Design energy, benchmarks</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Key maintenance affecting energy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Landings Framework</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Stage 1:</strong> Inception and briefing - set performance targets</li>
                <li className="pl-1"><strong>Stage 2:</strong> Design development - reality checks on targets</li>
                <li className="pl-1"><strong>Stage 3:</strong> Pre-handover - prepare for operation</li>
                <li className="pl-1"><strong>Stage 4:</strong> Initial aftercare (first month) - intensive support</li>
                <li className="pl-1"><strong>Stage 5:</strong> Extended aftercare (3 years) - monitoring and tuning</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-400 mb-2">Soft Landings Benefits</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Reduced performance gap through early identification of issues</li>
                <li className="pl-1">Better operator understanding of design intent</li>
                <li className="pl-1">Continuous improvement over first 3 years</li>
                <li className="pl-1">Feedback to design teams for future projects</li>
                <li className="pl-1">Aligns with BREEAM Man 01 credits</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Industry direction:</strong> Soft Landings is increasingly required for public
              sector projects and BREEAM assessments, recognising that design intent only matters
              if achieved in operation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />
        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Commissioning Schedule</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A new 3-storey office building with VAV air conditioning.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Commissioning sequence:</p>
                <p className="mt-2">Week 1-2: Pre-commissioning</p>
                <p>- Ductwork leakage tests</p>
                <p>- Pipework pressure tests</p>
                <p>- Electrical continuity and IR tests</p>
                <p className="mt-2">Week 3-4: Static commissioning</p>
                <p>- Individual fan rotation checks</p>
                <p>- Pump rotation and isolation</p>
                <p>- Damper and valve stroke tests</p>
                <p className="mt-2">Week 5-6: Dynamic commissioning</p>
                <p>- AHU commissioning (Code A)</p>
                <p>- CHW system balancing (Code W)</p>
                <p>- VAV terminal commissioning</p>
                <p className="mt-2">Week 7-8: Controls and integration</p>
                <p>- BMS point-to-point verification</p>
                <p>- Control sequence testing</p>
                <p>- Integrated system tests</p>
                <p className="mt-2">Note: Allow 6 months for seasonal commissioning</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Interface Coordination</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Coordinating fire alarm and HVAC systems.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Interface requirements:</p>
                <p className="mt-2">Fire alarm → BMS:</p>
                <p>- Fire signal stops AHUs</p>
                <p>- Fire dampers close automatically</p>
                <p>- Smoke extract fans start</p>
                <p>- Lifts return to ground</p>
                <p className="mt-2">Coordination checklist:</p>
                <p>✓ Interface cable route agreed</p>
                <p>✓ Signal type defined (volt-free contact)</p>
                <p>✓ Response time requirements specified</p>
                <p>✓ Testing procedure agreed</p>
                <p>✓ Witness test scheduled</p>
                <p className="mt-2 text-green-400">Result: Integrated fire/HVAC test passes</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: First Year Optimisation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> New office building energy higher than predicted after 6 months.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Investigation findings:</p>
                <p>- Heating running 6am-8pm (design: 7am-6pm)</p>
                <p>- Night setback not activating</p>
                <p>- Cooling setpoint 21°C (design: 24°C)</p>
                <p>- Optimiser not enabled</p>
                <p className="mt-2">Optimisation actions:</p>
                <p>1. Adjust schedules to match actual occupancy</p>
                <p>2. Enable night setback (16°C heating)</p>
                <p>3. Reset cooling setpoint to 24°C</p>
                <p>4. Enable optimum start/stop</p>
                <p>5. Review holiday schedules</p>
                <p className="mt-2">Result:</p>
                <p className="text-green-400">Energy reduced 25% to near design target</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Success Factors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Protect commissioning time in programme</li>
                <li className="pl-1">Appoint commissioning manager early</li>
                <li className="pl-1">Define witness test requirements clearly</li>
                <li className="pl-1">Complete pre-commissioning before dynamic tests</li>
                <li className="pl-1">Document everything contemporaneously</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">O&M manuals complete and reviewed</li>
                <li className="pl-1">As-built drawings provided</li>
                <li className="pl-1">Building log book handed over</li>
                <li className="pl-1">Operator training completed</li>
                <li className="pl-1">Warranties and certificates collected</li>
                <li className="pl-1">BMS access credentials provided</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Problems to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Compressed commissioning:</strong> Protect time in programme</li>
                <li className="pl-1"><strong>Poor documentation:</strong> Complete records as you go</li>
                <li className="pl-1"><strong>No seasonal testing:</strong> Plan for winter/summer return</li>
                <li className="pl-1"><strong>Inadequate training:</strong> Hands-on, not just manual handover</li>
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
                <p className="font-medium text-white mb-1">CIBSE Commissioning Codes</p>
                <ul className="space-y-0.5">
                  <li>Code A - Air systems</li>
                  <li>Code W - Water systems</li>
                  <li>Code R - Refrigeration</li>
                  <li>Code B - Boilers</li>
                  <li>Code C - Controls</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Soft Landings Timeline</p>
                <ul className="space-y-0.5">
                  <li>Initial aftercare: First month</li>
                  <li>Extended aftercare: 3 years</li>
                  <li>Regular reviews and optimisation</li>
                  <li>Energy monitoring vs targets</li>
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
            <Link to="../h-n-c-module2-section6-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section6-6">
              Next: Compliance and Verification
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section6_5;
