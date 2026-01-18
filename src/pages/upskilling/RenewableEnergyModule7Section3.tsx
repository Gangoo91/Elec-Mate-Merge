import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Maintenance Schedules - Renewable Energy Module 7";
const DESCRIPTION =
  "Creating structured maintenance schedules encompassing visual, electrical, and firmware maintenance tasks for renewable energy systems to ensure optimal performance and safety.";

const quickCheckQuestions = [
  {
    id: "maint-sched-qc1",
    question: "What percentage of maintenance should ideally be planned rather than reactive?",
    options: ["50%", "60%", "80%", "100%"],
    correctIndex: 2,
    explanation:
      "Industry best practice targets 80% planned maintenance and 20% reactive. Higher reactive percentages indicate inadequate preventive maintenance programmes.",
  },
  {
    id: "maint-sched-qc2",
    question: "How often should inverter firmware be checked for updates?",
    options: ["Weekly", "Monthly", "Quarterly", "Annually"],
    correctIndex: 2,
    explanation:
      "Quarterly firmware checks are typically recommended, though critical security updates should be applied promptly. Always review release notes before applying updates.",
  },
  {
    id: "maint-sched-qc3",
    question: "What is the primary purpose of regular visual inspections?",
    options: [
      "To clean the panels",
      "To identify developing issues before they cause failures",
      "To measure energy output",
      "To satisfy insurance requirements only",
    ],
    correctIndex: 1,
    explanation:
      "Visual inspections identify developing issues such as corrosion, damage, or environmental factors before they cause system failures or safety hazards.",
  },
  {
    id: "maint-sched-qc4",
    question: "What should be documented after every maintenance visit?",
    options: [
      "Time spent only",
      "Findings, actions taken, and recommendations",
      "Photographs only",
      "Weather conditions only",
    ],
    correctIndex: 1,
    explanation:
      "Complete documentation including findings, actions taken, parts used, test results, and recommendations supports warranty claims, trend analysis, and compliance.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What type of inspection frequency is recommended for checking PV module glass condition?",
    options: ["Weekly", "Monthly", "Quarterly", "Bi-annually"],
    correctAnswer: 2,
    explanation:
      "Quarterly visual inspections should include checking module glass for cracks, chips, delamination, or discolouration that could indicate cell damage.",
  },
  {
    id: 2,
    question: "When should electrical connections be torque-checked?",
    options: [
      "Only during initial installation",
      "Annually or after thermal anomalies are detected",
      "Weekly",
      "Never after initial installation",
    ],
    correctAnswer: 1,
    explanation:
      "Connection torque should be verified annually and whenever thermal imaging identifies potential loose connections. Thermal cycling causes connections to loosen over time.",
  },
  {
    id: 3,
    question: "What is included in a comprehensive annual maintenance visit?",
    options: [
      "Visual inspection only",
      "Electrical tests only",
      "Visual, electrical, and functional testing combined",
      "Cleaning only",
    ],
    correctAnswer: 2,
    explanation:
      "Annual comprehensive maintenance combines detailed visual inspection, electrical testing (IR, Voc, Isc), functional testing of protection devices, and firmware review.",
  },
  {
    id: 4,
    question: "How should maintenance schedules be adjusted for harsh environments?",
    options: [
      "No adjustment needed",
      "Increase inspection frequency and add specific checks",
      "Decrease maintenance to reduce costs",
      "Only maintain when failures occur",
    ],
    correctAnswer: 1,
    explanation:
      "Harsh environments (coastal, industrial, dusty) require increased inspection frequency and additional checks for corrosion, soiling, and environmental damage.",
  },
  {
    id: 5,
    question: "What documentation is essential for warranty claims?",
    options: [
      "Verbal descriptions of issues",
      "Timestamped records, test data, and photographs",
      "Estimates of performance loss",
      "Customer complaints only",
    ],
    correctAnswer: 1,
    explanation:
      "Warranty claims require documented evidence including dated inspection records, measured test data, photographs, and environmental conditions at the time of issue discovery.",
  },
  {
    id: 6,
    question: "What should trigger an unscheduled maintenance visit?",
    options: [
      "Regular calendar reminder",
      "Monitoring alerts, severe weather, or user reports",
      "Annual review meeting",
      "Equipment age milestones",
    ],
    correctAnswer: 1,
    explanation:
      "Unscheduled maintenance responds to monitoring system alerts indicating faults, severe weather events that could cause damage, or user reports of issues.",
  },
  {
    id: 7,
    question: "How should firmware updates be managed?",
    options: [
      "Apply all updates immediately without review",
      "Review release notes, test if possible, then apply systematically",
      "Never update firmware",
      "Only update when problems occur",
    ],
    correctAnswer: 1,
    explanation:
      "Firmware updates should be reviewed for relevance and potential issues, tested where possible, and applied systematically with rollback plans if problems occur.",
  },
  {
    id: 8,
    question: "What is the recommended approach to maintenance scheduling software?",
    options: [
      "Paper-based systems are always sufficient",
      "Use CMMS for automated scheduling and record keeping",
      "Email reminders only",
      "Rely on memory",
    ],
    correctAnswer: 1,
    explanation:
      "Computerised Maintenance Management Systems (CMMS) automate scheduling, track work orders, maintain records, and support analysis - essential for professional O&M.",
  },
  {
    id: 9,
    question: "How should seasonal factors affect maintenance planning?",
    options: [
      "Maintain the same schedule year-round",
      "Schedule intensive maintenance during lower production periods",
      "Only maintain in summer",
      "Only maintain in winter",
    ],
    correctAnswer: 1,
    explanation:
      "Intensive maintenance requiring system shutdown should be scheduled during lower production periods (winter in UK) to minimise revenue impact.",
  },
  {
    id: 10,
    question: "What is the purpose of maintaining baseline test data?",
    options: [
      "To satisfy regulatory requirements only",
      "To enable comparison and trend identification",
      "To prove installation quality",
      "For insurance purposes only",
    ],
    correctAnswer: 1,
    explanation:
      "Baseline data from commissioning enables comparison with subsequent tests to identify degradation, detect faults, and track system health over time.",
  },
];

const faqs = [
  {
    question: "How do I balance maintenance thoroughness with budget constraints?",
    answer:
      "Prioritise activities based on risk and impact. Critical safety checks and high-value interventions (thermal imaging, electrical testing) should not be compromised. Adjust frequency of lower-priority activities based on system condition and performance data.",
  },
  {
    question: "Should maintenance schedules differ for commercial vs residential systems?",
    answer:
      "Yes. Commercial systems typically warrant more frequent and comprehensive maintenance due to higher value, contractual obligations, and complexity. Residential systems may use simplified schedules with annual visits supplemented by remote monitoring.",
  },
  {
    question: "How do I handle maintenance for systems with multiple technologies?",
    answer:
      "Create integrated schedules that coordinate maintenance across PV, battery, EV charging, and other systems. Group activities to minimise site visits whilst ensuring appropriate expertise is available for each technology.",
  },
  {
    question: "What maintenance records should be retained and for how long?",
    answer:
      "Retain all maintenance records for the system lifetime plus any statutory retention period. Key records include inspection reports, test certificates, work orders, fault logs, and component replacement history. Electronic storage with backup is recommended.",
  },
  {
    question: "How do I ensure maintenance consistency across a portfolio of systems?",
    answer:
      "Develop standardised procedures and checklists, use CMMS for scheduling and tracking, provide consistent training to technicians, and conduct regular audits of maintenance quality. Benchmark performance across sites to identify best practices.",
  },
  {
    question: "When should I involve the equipment manufacturer in maintenance?",
    answer:
      "Involve manufacturers for warranty-related issues, complex fault diagnosis, firmware updates with significant changes, and any work that could void warranties. Maintain relationships with technical support contacts for each major equipment supplier.",
  },
];

const RenewableEnergyModule7Section3 = () => {
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
          <span className="text-sm text-white">Module 7 • Section 3</span>
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
              Maintenance Schedules
            </h1>
            <p className="text-lg text-white sm:text-xl">
              Creating proactive maintenance plans encompassing visual, electrical, and firmware maintenance tasks.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Visual Maintenance</h3>
              <p className="text-sm text-white">
                Regular visual inspections identify physical damage, corrosion, soiling, and environmental issues before they impact performance.
              </p>
            </div>
            <div className="rounded-lg border-l-2 border-elec-yellow/50 bg-elec-yellow/5 p-4">
              <h3 className="mb-2 font-semibold text-white">Electrical and Firmware</h3>
              <p className="text-sm text-white">
                Periodic electrical testing validates system health whilst firmware updates maintain functionality and security.
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
                "Create and follow proactive maintenance plans",
                "Distinguish between visual, electrical, and software tasks",
                "Recognise signs of system degradation",
                "Schedule maintenance activities effectively",
                "Document maintenance for compliance and analysis",
                "Coordinate planned and reactive maintenance",
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
              <h2 className="text-2xl font-bold text-white">Visual Maintenance Tasks</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Regular visual inspections are the first line of defence against system problems. They identify physical issues that monitoring cannot detect.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Panel and Mounting Inspection</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Corrosion assessment:</strong> Check mounting hardware, rails, and clamps for rust or galvanic corrosion</li>
                  <li><strong>Frame integrity:</strong> Inspect for cracks, warping, or loose corner keys in panel frames</li>
                  <li><strong>Glass condition:</strong> Look for cracks, chips, or delamination around edges</li>
                  <li><strong>Junction box security:</strong> Verify tight sealing and cable strain relief</li>
                  <li><strong>Grounding system:</strong> Check equipment grounding conductors and bond connections</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Environmental Factors</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Vegetation monitoring:</strong> Document new shading from tree growth</li>
                  <li><strong>Soiling analysis:</strong> Assess bird droppings, dust, pollen accumulation</li>
                  <li><strong>Pest control:</strong> Check for bird nesting or rodent intrusion</li>
                  <li><strong>Weather damage:</strong> Look for hail damage, wind lifting, or displacement</li>
                  <li><strong>Thermal effects:</strong> Check for discolouration indicating overheating</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Cable and Connection Assessment</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>UV degradation of cable jackets</li>
                  <li>Mechanical damage from wildlife</li>
                  <li>Connector corrosion or looseness</li>
                  <li>Cable support adequacy</li>
                  <li>Conduit integrity and sealing</li>
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
              <h2 className="text-2xl font-bold text-white">Electrical Testing Schedule</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Systematic electrical testing validates system performance and identifies degradation before it affects safety or energy yield.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Essential Electrical Tests</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Insulation resistance:</strong> Minimum 1 MOhm at 500V DC, test annually or after faults</li>
                  <li><strong>String performance:</strong> Voc and Isc measurements under known irradiance</li>
                  <li><strong>Earth fault loop impedance:</strong> Verify protective device operation times</li>
                  <li><strong>Voltage drop assessment:</strong> DC and AC side measurements under load</li>
                  <li><strong>RCD operation:</strong> Test at rated current and 5x rated</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Performance Benchmarks</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Performance ratio:</strong> Target greater than 80% for well-maintained systems</li>
                  <li><strong>String current balancing:</strong> Variations greater than 5% indicate issues</li>
                  <li><strong>Inverter efficiency:</strong> Monitor conversion efficiency trends</li>
                  <li><strong>Degradation rates:</strong> Expect 0.5-0.8% annual decline for crystalline silicon</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Testing Frequency Guide</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 text-left text-white">Test</th>
                        <th className="py-2 text-left text-white">Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/10">
                        <td className="py-2">Insulation resistance</td>
                        <td className="py-2">Annually</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">String Voc/Isc</td>
                        <td className="py-2">Annually</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Earth continuity</td>
                        <td className="py-2">Annually</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">I-V curve tracing</td>
                        <td className="py-2">As required</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Thermal imaging</td>
                        <td className="py-2">Annually</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
              <h2 className="text-2xl font-bold text-white">Firmware and Software Maintenance</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Modern renewable energy systems rely on firmware and software that require regular updates for optimal operation, security, and grid compliance.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Firmware Update Targets</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Inverter firmware:</strong> Grid compliance updates, efficiency improvements</li>
                  <li><strong>Optimiser firmware:</strong> Communication protocols, safety features</li>
                  <li><strong>Battery BMS:</strong> Cell management algorithms, safety parameters</li>
                  <li><strong>Smart meters:</strong> Tariff updates, communication improvements</li>
                  <li><strong>Monitoring systems:</strong> Feature updates, security patches</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Update Management Process</h4>
                <ol className="list-inside list-decimal space-y-2">
                  <li>Monitor manufacturer release announcements</li>
                  <li>Review release notes for changes and requirements</li>
                  <li>Assess applicability and urgency for each system</li>
                  <li>Test on non-critical systems if possible</li>
                  <li>Schedule updates during low production periods</li>
                  <li>Verify successful installation and system operation</li>
                  <li>Document update completion and any issues</li>
                </ol>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Data System Maintenance</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>Monitoring platform configuration verification</li>
                  <li>Data logging accuracy checks</li>
                  <li>Communication pathway testing</li>
                  <li>Alert threshold calibration</li>
                  <li>Historical data backup procedures</li>
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
              <h2 className="text-2xl font-bold text-white">Maintenance Planning and Coordination</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Effective maintenance planning balances thoroughness with efficiency, ensuring all necessary tasks are completed whilst minimising system downtime and costs.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Annual Maintenance Calendar</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 text-left text-white">Period</th>
                        <th className="py-2 text-left text-white">Activities</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/10">
                        <td className="py-2">Spring</td>
                        <td className="py-2">Post-winter inspection, cleaning assessment</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Summer</td>
                        <td className="py-2">Thermal imaging, performance testing</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Autumn</td>
                        <td className="py-2">Pre-winter preparation, vegetation management</td>
                      </tr>
                      <tr className="border-b border-white/10">
                        <td className="py-2">Winter</td>
                        <td className="py-2">Comprehensive annual maintenance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Resource Planning</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li><strong>Personnel:</strong> Ensure qualified technicians are available</li>
                  <li><strong>Equipment:</strong> Schedule test equipment and specialist tools</li>
                  <li><strong>Parts:</strong> Order consumables and anticipated replacement parts</li>
                  <li><strong>Access:</strong> Arrange site access and any required permits</li>
                  <li><strong>Safety:</strong> Prepare risk assessments and method statements</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Combining Activities</h4>
                <p className="mb-2">
                  Efficient maintenance groups related activities:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Combine visual inspection with cleaning assessment</li>
                  <li>Perform electrical tests during same visit as thermal imaging</li>
                  <li>Update firmware during scheduled maintenance windows</li>
                  <li>Address multiple minor issues in single visit</li>
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
              <h2 className="text-2xl font-bold text-white">Documentation Requirements</h2>
            </div>
            <div className="space-y-4 text-white">
              <p>
                Comprehensive documentation supports warranty claims, enables trend analysis, and demonstrates compliance with maintenance obligations.
              </p>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Technical Records</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Installation certificates and commissioning reports</li>
                  <li>As-built drawings and equipment specifications</li>
                  <li>Test results with date stamps and technician details</li>
                  <li>Performance trending and degradation analysis</li>
                  <li>Component serial numbers and installation dates</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Operational Records</h4>
                <ul className="list-inside list-disc space-y-2">
                  <li>Maintenance schedules and completed work orders</li>
                  <li>Fault reports and corrective actions taken</li>
                  <li>Parts replacement history and costs</li>
                  <li>Weather events and impact assessments</li>
                  <li>Training records for maintenance personnel</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h4 className="mb-3 font-semibold text-elec-yellow">Digital Tools</h4>
                <ul className="list-inside list-disc space-y-1">
                  <li>CMMS for automated scheduling and tracking</li>
                  <li>Mobile apps for field data collection</li>
                  <li>Cloud-based document storage and access</li>
                  <li>Automated reporting and compliance tracking</li>
                  <li>Integration with monitoring platforms</li>
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
                  <h4 className="font-semibold text-elec-yellow">Creating Effective Schedules</h4>
                  <p className="mt-1 text-sm">
                    Start with manufacturer requirements, adjust for site conditions, and refine based on operational experience. Document the rationale for schedule decisions to support future reviews.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Managing Multiple Systems</h4>
                  <p className="mt-1 text-sm">
                    Group systems by geography for efficient route planning. Standardise procedures across similar systems whilst accommodating site-specific requirements.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-elec-yellow">Continuous Improvement</h4>
                  <p className="mt-1 text-sm">
                    Review maintenance effectiveness annually. Track metrics like fault rates, response times, and costs. Adjust schedules based on findings and industry best practices.
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
              title="Maintenance Schedules Quiz"
              questions={quizQuestions}
              onComplete={(score) => console.log("Quiz completed with score:", score)}
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <Link to="/upskilling/renewable-energy/module-7/section-2">
              <Button variant="outline" className="w-full gap-2 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                <ArrowLeft className="h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="/upskilling/renewable-energy/module-7/section-4">
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

export default RenewableEnergyModule7Section3;
