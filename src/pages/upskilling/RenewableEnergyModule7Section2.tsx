import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Preventive Maintenance Programmes - Renewable Energy Module 7";
const DESCRIPTION =
  "Develop comprehensive preventive maintenance programmes for renewable energy systems including inspection schedules, cleaning protocols, and component replacement planning.";

const quickCheckQuestions = [
  {
    id: "prev-maint-qc1",
    question: "What is the recommended frequency for visual inspections of PV systems?",
    options: ["Weekly", "Monthly", "Quarterly", "Annually"],
    correctIndex: 2,
    explanation:
      "Quarterly visual inspections are typically recommended for PV systems, with more frequent checks after severe weather events. This balances thoroughness with practical resource constraints.",
  },
  {
    id: "prev-maint-qc2",
    question: "What is the typical recommended interval for thermal imaging inspections?",
    options: ["Monthly", "Quarterly", "Annually", "Every 5 years"],
    correctIndex: 2,
    explanation:
      "Annual thermal imaging inspections are typically recommended, ideally during summer months when systems operate at higher power and thermal anomalies are more visible.",
  },
  {
    id: "prev-maint-qc3",
    question: "When should PV module cleaning be scheduled?",
    options: [
      "Fixed monthly schedule",
      "Based on soiling assessment and performance data",
      "Only when output drops to zero",
      "Never - rain is sufficient",
    ],
    correctIndex: 1,
    explanation:
      "Cleaning should be based on soiling assessment and performance impact, not fixed schedules. Some sites need frequent cleaning whilst others with adequate rainfall need minimal intervention.",
  },
  {
    id: "prev-maint-qc4",
    question: "What component typically requires replacement every 10-15 years in PV systems?",
    options: ["Modules", "Mounting structures", "Inverters", "DC cables"],
    correctIndex: 2,
    explanation:
      "Inverters typically have a lifespan of 10-15 years and often require replacement during the system lifetime, whilst modules are warranted for 25-30 years.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary goal of preventive maintenance?",
    options: [
      "Reduce initial installation costs",
      "Prevent failures and maintain optimal performance",
      "Increase system capacity",
      "Meet warranty requirements only",
    ],
    correctAnswer: 1,
    explanation:
      "Preventive maintenance aims to prevent unexpected failures, maintain optimal performance, and extend equipment lifespan through regular inspection and servicing.",
  },
  {
    id: 2,
    question: "What should be checked during a visual inspection of PV mounting systems?",
    options: [
      "Electrical output only",
      "Corrosion, loose fixings, and structural integrity",
      "Inverter settings only",
      "Energy production data",
    ],
    correctAnswer: 1,
    explanation:
      "Visual inspection of mounting systems should check for corrosion, loose or missing fixings, structural damage, and any signs of movement or settling.",
  },
  {
    id: 3,
    question: "How often should inverter air filters typically be cleaned or replaced?",
    options: ["Weekly", "Monthly", "Every 6-12 months", "Never"],
    correctAnswer: 2,
    explanation:
      "Inverter air filters should be cleaned every 6-12 months depending on environmental conditions. Dusty environments may require more frequent attention.",
  },
  {
    id: 4,
    question: "What electrical test should be performed annually on PV systems?",
    options: [
      "Visual inspection only",
      "Insulation resistance testing",
      "Module temperature measurement",
      "Irradiance measurement",
    ],
    correctAnswer: 1,
    explanation:
      "Annual insulation resistance testing verifies cable and connection integrity, helping identify degradation before it causes system failure or safety issues.",
  },
  {
    id: 5,
    question: "What is the recommended approach for managing spare parts?",
    options: [
      "Order parts only when failures occur",
      "Stock critical spares based on failure probability",
      "Replace all components annually",
      "Spare parts are not needed for renewable systems",
    ],
    correctAnswer: 1,
    explanation:
      "Critical spares should be stocked based on component criticality and failure probability, reducing downtime when failures occur.",
  },
  {
    id: 6,
    question: "What documentation should be maintained for maintenance activities?",
    options: [
      "Invoices only",
      "Comprehensive records of inspections, tests, and repairs",
      "Photographs only",
      "No documentation required",
    ],
    correctAnswer: 1,
    explanation:
      "Comprehensive maintenance records support warranty claims, track component history, identify recurring issues, and demonstrate compliance with O&M requirements.",
  },
  {
    id: 7,
    question: "What is condition-based maintenance?",
    options: [
      "Maintenance on a fixed calendar schedule",
      "Maintenance triggered by monitored condition indicators",
      "Maintenance only after failure",
      "Maintenance based on weather forecasts",
    ],
    correctAnswer: 1,
    explanation:
      "Condition-based maintenance uses monitoring data and inspections to trigger maintenance when conditions indicate it is needed, optimising resource use.",
  },
  {
    id: 8,
    question: "What should be checked on battery systems during routine maintenance?",
    options: [
      "Visual appearance only",
      "Cell voltages, temperatures, and state of health",
      "External dimensions",
      "Colour of casing",
    ],
    correctAnswer: 1,
    explanation:
      "Battery maintenance should include checking cell voltage balance, operating temperatures, state of health indicators, and any warning messages from the BMS.",
  },
  {
    id: 9,
    question: "How should vegetation management be approached for ground-mount systems?",
    options: [
      "Remove all vegetation permanently",
      "Regular scheduled cutting based on growth patterns",
      "Ignore vegetation unless it touches panels",
      "Plant fast-growing species",
    ],
    correctAnswer: 1,
    explanation:
      "Regular vegetation management based on growth patterns prevents shading whilst maintaining ground stability. Some vegetation is beneficial for dust suppression.",
  },
  {
    id: 10,
    question: "What is the purpose of torque checking electrical connections?",
    options: [
      "To make connections tighter",
      "To verify connections meet specifications and prevent loosening",
      "To test cable strength",
      "To measure current flow",
    ],
    correctAnswer: 1,
    explanation:
      "Torque checking verifies connections meet manufacturer specifications and identifies loosening due to thermal cycling, preventing high-resistance joints and potential fire hazards.",
  },
];

const faqs = [
  {
    question: "How do I develop a maintenance schedule for a new system?",
    answer:
      "Start with manufacturer recommendations for all components, then adjust based on site conditions (environment, accessibility, criticality). Include visual inspections, electrical testing, cleaning assessments, and component-specific maintenance. Review and refine the schedule based on operational experience.",
  },
  {
    question: "What is the cost-benefit of preventive maintenance?",
    answer:
      "Studies show preventive maintenance typically costs 1-2% of system value annually but can increase energy yield by 5-10% and extend system life significantly. The return on investment typically exceeds 5:1 through avoided failures and optimised performance.",
  },
  {
    question: "Should I clean my solar panels after every dust storm?",
    answer:
      "Not necessarily. Assess the performance impact using monitoring data before committing to cleaning. Minor soiling may not justify cleaning costs. Develop site-specific thresholds based on historical cleaning response and cost-benefit analysis.",
  },
  {
    question: "How do I know when an inverter needs replacing rather than repairing?",
    answer:
      "Consider age, repair cost vs replacement cost, availability of parts, efficiency compared to modern units, and remaining system life. Generally, if repair costs exceed 50% of replacement and the unit is over 10 years old, replacement may be more economical.",
  },
  {
    question: "What qualifications are needed for maintenance technicians?",
    answer:
      "Technicians should hold relevant electrical qualifications (e.g., City & Guilds 2391), have manufacturer-specific training for the equipment installed, and maintain current competence through ongoing training. Additional certifications may be required for specific tasks like working at height.",
  },
  {
    question: "How do I handle maintenance on systems still under warranty?",
    answer:
      "Follow manufacturer maintenance requirements precisely to maintain warranty validity. Use approved parts and techniques. Document all maintenance thoroughly. For any issues potentially covered by warranty, contact the manufacturer before attempting repairs.",
  },
];

const RenewableEnergyModule7Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to=".."
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module Overview
          </Link>
          <span className="text-sm text-white">Module 7 • Section 2</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-elec-yellow/10 px-4 py-1.5 text-sm font-medium text-elec-yellow">
              <Zap className="h-4 w-4" />
              Operation and Maintenance
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Preventive Maintenance Programmes
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Developing and implementing effective maintenance strategies to maximise system reliability and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Scheduled Maintenance</h3>
              <p className="text-sm text-white">
                Regular inspections, cleaning, and testing at planned intervals prevent unexpected failures and maintain optimal performance.
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Condition-Based Approach</h3>
              <p className="text-sm text-white">
                Using monitoring data and inspection findings to trigger maintenance when needed optimises resource allocation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Learning Outcomes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Develop comprehensive maintenance schedules",
                "Specify appropriate inspection and testing intervals",
                "Plan cleaning and vegetation management",
                "Manage spare parts and component replacement",
                "Document maintenance activities effectively",
                "Optimise maintenance resource allocation",
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-elec-yellow" />
                  <span className="text-sm text-white">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Section 01 */}
          <section className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                01
              </span>
              <h2 className="text-2xl font-bold text-white">Maintenance Strategy Framework</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Effective maintenance combines scheduled activities, condition-based interventions, and rapid response to failures. The optimal mix depends on system characteristics and operational requirements.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Maintenance Types</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Preventive:</strong> Scheduled activities to prevent failures (inspections, cleaning, testing)</li>
                  <li><strong>Condition-based:</strong> Triggered by monitoring data or inspection findings</li>
                  <li><strong>Corrective:</strong> Response to identified faults or failures</li>
                  <li><strong>Predictive:</strong> Using data analysis to forecast maintenance needs</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Target Maintenance Ratio</h4>
                <p className="mb-2">
                  Well-managed systems typically achieve:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>80% planned maintenance (preventive + condition-based)</li>
                  <li>20% unplanned maintenance (corrective response)</li>
                </ul>
                <p className="mt-2 text-sm">
                  Higher unplanned ratios indicate insufficient preventive maintenance or underlying system issues.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Maintenance Planning Factors</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>Equipment manufacturer recommendations</li>
                  <li>Site environmental conditions</li>
                  <li>System criticality and revenue impact</li>
                  <li>Access constraints and safety requirements</li>
                  <li>Available resources and budget</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 02 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                02
              </span>
              <h2 className="text-2xl font-bold text-white">Inspection Schedules</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Regular inspections identify developing issues before they cause failures or significant performance losses.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Visual Inspection Schedule</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 text-left text-white">Frequency</th>
                        <th className="py-2 text-left text-white">Scope</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/10">
                        <td className="py-2">Monthly</td>
                        <td className="py-2">Remote monitoring review, inverter indicators</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Quarterly</td>
                        <td className="py-2">Site walkthrough, module condition, mounting systems</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Annually</td>
                        <td className="py-2">Comprehensive inspection, all components</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Post-event</td>
                        <td className="py-2">After storms, flooding, or other significant events</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Electrical Testing Schedule</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Annually:</strong> Insulation resistance, earth continuity, RCD operation</li>
                  <li><strong>Annually:</strong> String Voc and Isc measurements (weather permitting)</li>
                  <li><strong>Bi-annually:</strong> Thermal imaging inspection</li>
                  <li><strong>Five-yearly:</strong> Full periodic inspection and test</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Thermal Imaging Best Practice</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>Conduct during high irradiance periods (ideally greater than 700 W/m²)</li>
                  <li>Allow system to reach thermal equilibrium (minimum 1 hour operation)</li>
                  <li>Inspect both front and rear of modules where accessible</li>
                  <li>Document all anomalies with images and location reference</li>
                  <li>Compare with previous inspections to track trends</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 03 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                03
              </span>
              <h2 className="text-2xl font-bold text-white">Cleaning and Vegetation Management</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Soiling and vegetation shading are common causes of performance loss. Effective management balances costs against performance benefits.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Soiling Assessment</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Monitor performance ratio for soiling-related decline</li>
                  <li>Consider local factors: dust, pollen, bird activity, industrial emissions</li>
                  <li>Compare clean vs soiled module performance</li>
                  <li>Establish site-specific cleaning thresholds</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Cleaning Methods</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Water only:</strong> Demineralised water to avoid mineral deposits</li>
                  <li><strong>Soft brush:</strong> Non-abrasive cleaning tools</li>
                  <li><strong>Specialist cleaners:</strong> For stubborn contamination (bird droppings, lichen)</li>
                  <li><strong>Robotic systems:</strong> For large commercial installations</li>
                </ul>
                <p className="mt-2 text-sm text-elec-yellow">
                  Never use abrasive materials, high-pressure water, or harsh chemicals that could damage anti-reflective coatings.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Vegetation Management</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Monitor for new shading from tree growth</li>
                  <li>Schedule vegetation cutting before growth season</li>
                  <li>Consider grazing animals for ground-mount sites</li>
                  <li>Balance ground cover benefits against shading risk</li>
                  <li>Address bird nesting and pest issues promptly</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 04 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                04
              </span>
              <h2 className="text-2xl font-bold text-white">Component Replacement Planning</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Planning for component replacement ensures minimal system downtime and optimal lifecycle costs.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Expected Component Lifespans</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 text-left text-white">Component</th>
                        <th className="py-2 text-left text-white">Typical Lifespan</th>
                        <th className="py-2 text-left text-white">Planning Note</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/10">
                        <td className="py-2">PV Modules</td>
                        <td className="py-2">25-30 years</td>
                        <td className="py-2">Gradual degradation</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">String Inverters</td>
                        <td className="py-2">10-15 years</td>
                        <td className="py-2">Plan mid-life replacement</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Optimisers</td>
                        <td className="py-2">25 years</td>
                        <td className="py-2">Match module warranty</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Batteries (Li-ion)</td>
                        <td className="py-2">10-15 years</td>
                        <td className="py-2">Capacity-dependent</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Mounting Systems</td>
                        <td className="py-2">25+ years</td>
                        <td className="py-2">Material-dependent</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Spare Parts Strategy</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Critical spares:</strong> Hold on-site or ensure rapid availability (fuses, isolators)</li>
                  <li><strong>Major components:</strong> Supplier agreements for rapid delivery (inverters)</li>
                  <li><strong>Obsolete equipment:</strong> Plan ahead for discontinued models</li>
                  <li><strong>Compatibility:</strong> Document specifications for future replacement</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Replacement Decision Factors</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>Repair cost vs replacement cost</li>
                  <li>Component age and remaining useful life</li>
                  <li>Availability of spare parts</li>
                  <li>Performance improvement with newer technology</li>
                  <li>System remaining operational life</li>
                  <li>Warranty implications</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          {/* Section 05 */}
          <section className="mb-12 mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elec-yellow text-lg font-bold text-black">
                05
              </span>
              <h2 className="text-2xl font-bold text-white">Documentation and Record Keeping</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Comprehensive maintenance records support warranty claims, enable trend analysis, and demonstrate compliance with O&M requirements.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Essential Records</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Installation records:</strong> Commissioning data, as-built drawings, equipment specifications</li>
                  <li><strong>Inspection reports:</strong> Findings, photographs, recommendations</li>
                  <li><strong>Test results:</strong> Electrical test data with dates and technician details</li>
                  <li><strong>Work orders:</strong> Maintenance performed, parts used, time spent</li>
                  <li><strong>Fault logs:</strong> Issues identified, root cause, resolution</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Documentation Best Practice</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Use standardised forms and checklists</li>
                  <li>Include photographs with location references</li>
                  <li>Record environmental conditions during testing</li>
                  <li>Maintain equipment serial number tracking</li>
                  <li>Store records securely with backup</li>
                  <li>Make records accessible to authorised personnel</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Digital Maintenance Management</h4>
                <p className="mb-2">
                  Modern CMMS (Computerised Maintenance Management Systems) provide:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Automated scheduling and work order generation</li>
                  <li>Mobile access for field technicians</li>
                  <li>Integration with monitoring platforms</li>
                  <li>KPI tracking and reporting</li>
                  <li>Spare parts inventory management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-12 mt-12">
            <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/5 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Practical Guidance</h2>
              <div className="space-y-4 text-white">
                <div>
                  <h4 className="font-semibold text-elec-yellow">Building a Maintenance Schedule</h4>
                  <p className="mt-1 text-sm">
                    Start with manufacturer requirements for all components, then overlay site-specific needs. Create a calendar showing all scheduled activities and resource requirements. Review and adjust based on operational experience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Cost-Effective Maintenance</h4>
                  <p className="mt-1 text-sm">
                    Combine maintenance activities to reduce site visits. Use monitoring data to prioritise interventions. Balance thoroughness against cost - not every site needs the same intensity of maintenance.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Continuous Improvement</h4>
                  <p className="mt-1 text-sm">
                    Track maintenance metrics (cost per kWh, fault rates, response times). Analyse failure patterns to improve preventive measures. Share learnings across similar systems to improve overall maintenance effectiveness.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-semibold text-elec-yellow">{faq.question}</h3>
                  <p className="text-sm text-white">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Preventive Maintenance Quiz"
              questions={quizQuestions}
              onComplete={(score) => console.log("Quiz completed with score:", score)}
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <Link to="/upskilling/renewable-energy/module-7/section-1">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/upskilling/renewable-energy/module-7/section-3">
              <Button className="w-full gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 sm:w-auto">
                Next Section
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section2;
