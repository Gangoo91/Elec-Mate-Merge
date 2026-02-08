import { ArrowLeft, Scale, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Balancing PPM and Corrective Maintenance - MOET Module 4 Section 7.2";
const DESCRIPTION = "Understanding the balance between planned preventive maintenance (PPM) and corrective (reactive) maintenance, including cost-benefit analysis, the maintenance ratio, optimising PM frequencies, and developing a balanced maintenance strategy for electrical systems aligned to ST1426.";

const quickCheckQuestions = [
  {
    id: "ppm-purpose",
    question: "The primary purpose of planned preventive maintenance (PPM) is to:",
    options: [
      "Create additional work for the maintenance team",
      "Reduce the probability of failure by performing scheduled tasks that maintain equipment condition, detect deterioration, or replace wear-out components before they fail in service",
      "Eliminate the need for spare parts",
      "Increase the number of maintenance records"
    ],
    correctIndex: 1,
    explanation: "PPM aims to prevent unplanned failures by performing proactive tasks at scheduled intervals. These tasks may include condition monitoring (detecting deterioration before it causes failure), scheduled servicing (lubrication, cleaning, filter changes), scheduled component replacement (replacing wear-out items before they fail), and inspection (visual checks for deterioration, damage or abnormal conditions). The economic justification is that the cost of planned maintenance is less than the cost of the unplanned failures it prevents."
  },
  {
    id: "reactive-acceptable",
    question: "Corrective (reactive) maintenance is an acceptable strategy when:",
    options: [
      "It is never acceptable — all equipment should have preventive maintenance",
      "The consequences of the failure are low (no safety or environmental impact, minimal operational disruption) and the cost of preventive maintenance would exceed the cost of allowing the failure to occur and repairing it",
      "The equipment is brand new",
      "The maintenance budget has been exhausted"
    ],
    correctIndex: 1,
    explanation: "Corrective maintenance is a deliberate, justified strategy for failure modes where the consequences are acceptable — typically non-critical equipment where the failure does not affect safety, the environment, or production significantly, and where the cost of preventive maintenance would exceed the cost of the occasional repair. This is the 'run-to-failure' strategy in RCM terms. It is a conscious decision, not a failure of the maintenance programme. Examples include non-critical lighting, convenience sockets in low-use areas, and redundant systems where backup is available."
  },
  {
    id: "maintenance-ratio",
    question: "A typical target for the ratio of planned to unplanned maintenance in a well-managed electrical maintenance organisation is:",
    options: [
      "10% planned, 90% unplanned",
      "50% planned, 50% unplanned",
      "80% planned (or higher), 20% unplanned (or lower) — measured by work orders or labour hours",
      "100% planned, 0% unplanned — every failure must be prevented"
    ],
    correctIndex: 2,
    explanation: "World-class maintenance organisations typically target 80% or more planned work (PPM, condition-based, scheduled tasks) and 20% or less unplanned work (emergency breakdowns). This ratio indicates that the preventive programme is effective at catching most failures before they occur, while acknowledging that some unplanned work will always exist (genuinely random failures, run-to-failure items, unforeseen events). An organisation with a high proportion of unplanned work is typically spending more on maintenance overall due to emergency call-outs, expedited parts, overtime and secondary damage."
  },
  {
    id: "over-maintenance",
    question: "Over-maintenance (performing preventive maintenance too frequently or on equipment that does not need it) is a problem because:",
    options: [
      "It is not a problem — more maintenance is always better",
      "It wastes resources that could be better spent on critical equipment, and can actually increase the failure rate by introducing infant mortality through unnecessary intervention (disturbing working equipment)",
      "It makes the maintenance team too busy to take breaks",
      "It uses too much paper for work orders"
    ],
    correctIndex: 1,
    explanation: "Over-maintenance is a significant and common problem. Every maintenance intervention carries a risk of introducing a new fault (incorrect reassembly, contamination, overtightening, wrong component, human error). RCM research showed that 68% of failure modes have a higher probability of failure immediately after maintenance (infant mortality). Additionally, excessive PM consumes technician time, spare parts and shutdown time that could be directed to more critical tasks. The goal is the right amount of maintenance, not the maximum amount."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Planned preventive maintenance (PPM) includes which of the following task types?",
    options: [
      "Only emergency breakdown repairs",
      "Scheduled inspections, condition monitoring, lubrication, cleaning, calibration, component replacement at fixed intervals, and functional tests of protective devices",
      "Only tasks performed by external contractors",
      "Only tasks that require a complete shutdown"
    ],
    correctAnswer: 1,
    explanation: "PPM encompasses a wide range of proactive tasks: visual inspections (checking for damage, deterioration, overheating), condition monitoring (vibration analysis, thermography, insulation resistance testing), routine servicing (lubrication, cleaning, filter replacement), calibration of instruments and protective devices, scheduled component replacement (contactors, belts, bearings at planned intervals), and functional testing (RCD trip tests, emergency lighting tests, standby generator tests). All are planned, scheduled and documented."
  },
  {
    id: 2,
    question: "The key difference between time-based maintenance and condition-based maintenance is:",
    options: [
      "Time-based maintenance is always more effective",
      "Time-based tasks are performed at fixed calendar or usage intervals regardless of condition, while condition-based tasks are triggered by evidence of deterioration detected through monitoring",
      "Condition-based maintenance does not require any equipment",
      "There is no difference — they are the same thing"
    ],
    correctAnswer: 1,
    explanation: "Time-based maintenance (scheduled restoration or discard) is performed at fixed intervals — for example, replace motor bearings every 5 years or replace contactor tips every 100,000 operations, regardless of the current condition of the component. Condition-based maintenance is triggered by evidence of deterioration: the task is only performed when monitoring indicates that the component is approaching the end of its useful life. Condition-based maintenance is generally more efficient because it avoids replacing components that still have useful life remaining, but it is only feasible when deterioration can be detected reliably (the P-F interval is long enough)."
  },
  {
    id: 3,
    question: "The 'bathtub curve' describes a failure pattern where:",
    options: [
      "Failures only occur in bathrooms",
      "There is a period of high early failure (infant mortality), then a period of low constant failure rate, then an increasing failure rate as the component wears out",
      "The failure rate is constant throughout the component's life",
      "Failures only occur at the end of the component's life"
    ],
    correctAnswer: 1,
    explanation: "The bathtub curve has three phases: (1) infant mortality — a high failure rate when the component is new, caused by manufacturing defects, installation errors, or quality issues; (2) useful life — a low, relatively constant failure rate where failures are essentially random; (3) wear-out — an increasing failure rate as the component reaches the end of its useful life. However, RCM research showed that only about 4% of failure modes follow this classic bathtub pattern. Most failure modes show either random failure or infant mortality followed by a constant rate."
  },
  {
    id: 4,
    question: "If a maintenance team is spending 60% of its time on unplanned (reactive) work and 40% on planned work, this suggests:",
    options: [
      "The team is performing optimally",
      "The preventive maintenance programme is not effective enough — too many failures are occurring that should be prevented by proactive tasks, or the PPM programme is not targeting the right failure modes",
      "The team has too many people",
      "The equipment is too new to need preventive maintenance"
    ],
    correctAnswer: 1,
    explanation: "A 60/40 reactive-to-planned ratio indicates a maintenance programme that is predominantly firefighting rather than preventing. This typically means: the PPM programme does not cover the most common failure modes, PM intervals are set incorrectly (too long between tasks), condition monitoring is not being used where it would be effective, or known failure modes are not being addressed. The goal is to progressively increase the planned ratio to 80% or above by analysing the causes of unplanned work and adding targeted preventive tasks."
  },
  {
    id: 5,
    question: "An effective way to determine whether a PPM task should be performed more or less frequently is to:",
    options: [
      "Ask the equipment manufacturer only",
      "Analyse the failure and condition monitoring history: if failures are occurring between PM intervals the frequency should be increased; if components are consistently in good condition at PM time the interval may be too short and can be extended",
      "Always use the shortest possible interval",
      "Never change the interval once it has been set"
    ],
    correctAnswer: 1,
    explanation: "PM optimisation is an ongoing process. If a bearing is consistently found in good condition at its 12-monthly inspection, the interval could potentially be extended to 18 or 24 months, freeing resources for other tasks. Conversely, if bearings are failing between inspections, the interval needs to be shortened or the monitoring technique changed. The key data sources are: CMMS failure records (when and why failures occur), condition monitoring trends (rate of deterioration), and PM task feedback (what the technician finds during each PM visit)."
  },
  {
    id: 6,
    question: "The total cost of a reactive (unplanned) breakdown typically exceeds the cost of a planned repair for the same failure because:",
    options: [
      "The spare parts cost more for planned work",
      "Unplanned breakdowns incur additional costs: emergency call-out charges, expedited parts delivery, overtime, lost production, secondary damage to adjacent components, safety risks, and the disruption of other planned work",
      "Planned work takes longer to complete",
      "There is no cost difference"
    ],
    correctAnswer: 1,
    explanation: "The true cost of an unplanned breakdown includes many factors beyond the direct repair cost: lost production during unplanned downtime (often the largest cost), emergency call-out and overtime rates, expedited or emergency parts delivery charges, secondary damage (a failed bearing can damage the shaft, housing and motor winding), disruption to other planned maintenance work, potential safety incidents during emergency work, and customer impact. Studies consistently show that the total cost of reactive maintenance is 3-10 times the cost of the equivalent planned repair."
  },
  {
    id: 7,
    question: "A maintenance strategy that combines condition-based monitoring for critical failure modes, time-based replacement for wear-out failure modes, failure-finding for hidden failures, and run-to-failure for low-consequence items is an example of:",
    options: [
      "A reactive maintenance programme",
      "A balanced, RCM-informed maintenance strategy that applies the most appropriate technique to each failure mode based on its characteristics and consequences",
      "Over-maintenance",
      "No maintenance programme at all"
    ],
    correctAnswer: 1,
    explanation: "This describes the ideal outcome of an RCM-informed maintenance strategy: each failure mode is managed by the technique that is most technically appropriate and economically justified. Critical bearings are condition-monitored (vibration analysis), wear-out items like contactor tips are replaced on a schedule, protective devices are periodically tested (failure-finding), and non-critical items are allowed to run to failure. This balanced approach delivers higher reliability at lower total cost than either a purely preventive or purely reactive approach."
  },
  {
    id: 8,
    question: "Maintenance key performance indicators (KPIs) that help monitor the balance between planned and reactive work include:",
    options: [
      "Only the total maintenance budget",
      "Planned maintenance compliance (percentage of scheduled PMs completed on time), reactive-to-planned work ratio, mean time between failures (MTBF), mean time to repair (MTTR), and maintenance cost as a percentage of asset replacement value",
      "Only the number of maintenance staff",
      "Only the number of work orders raised"
    ],
    correctAnswer: 1,
    explanation: "Effective maintenance management requires monitoring multiple KPIs: PM compliance (are scheduled tasks being completed on time — target >90%), planned-to-reactive ratio (target >80% planned), MTBF (is it increasing over time, indicating improving reliability?), MTTR (is it decreasing, indicating better planning and parts availability?), and maintenance cost as a percentage of replacement asset value (RAV) — typically 2-5% for electrical systems. These KPIs together provide a comprehensive picture of maintenance effectiveness."
  },
  {
    id: 9,
    question: "When introducing condition-based maintenance to replace time-based PM on a motor, the first step should be:",
    options: [
      "Immediately stop all time-based maintenance",
      "Establish a baseline condition reading (vibration signature, insulation resistance, thermal profile) while the motor is in known good condition, then monitor at appropriate intervals to track changes from the baseline",
      "Wait for the motor to fail to understand the failure mode",
      "Only monitor the motor during shutdowns"
    ],
    correctAnswer: 1,
    explanation: "Baseline readings are essential for condition-based maintenance. A vibration signature, insulation resistance value, or thermal profile only becomes meaningful when compared to a known good baseline and tracked over time. The baseline should be taken when the equipment is in known good condition (ideally after maintenance or commissioning). Subsequent readings are compared to the baseline and to previous readings to identify trends. The transition from time-based to condition-based should be gradual — continue time-based tasks until sufficient condition monitoring data confirms the new approach is effective."
  },
  {
    id: 10,
    question: "A common mistake when developing a PPM programme is:",
    options: [
      "Including too many condition monitoring tasks",
      "Applying the same maintenance strategy and frequency to all equipment regardless of criticality, function, failure modes, or operating context — the 'one size fits all' approach",
      "Consulting the equipment manufacturer for guidance",
      "Training technicians in maintenance techniques"
    ],
    correctAnswer: 1,
    explanation: "The 'one size fits all' approach is a common and costly mistake: applying the same PM schedule to every motor, every panel, every drive, regardless of how critical it is, how it fails, or how it is used. A 150 kW motor on a critical production line has very different maintenance requirements from a 0.75 kW motor on a non-critical ventilation fan. RCM addresses this by analysing each asset in its operating context and selecting the most appropriate strategy for each failure mode. The result is more maintenance on critical equipment and less on non-critical equipment."
  },
  {
    id: 11,
    question: "The concept of 'maintenance-induced failures' refers to:",
    options: [
      "Failures caused by lack of maintenance",
      "Failures that are introduced by the maintenance activity itself — incorrect reassembly, contamination, overtightening, wrong parts, or disturbance of previously satisfactory components",
      "Failures during the warranty period",
      "Failures reported incorrectly in the CMMS"
    ],
    correctAnswer: 1,
    explanation: "Maintenance-induced failures are a significant concern and a key reason why 'more maintenance' is not always better. Every time a technician opens a panel, disassembles a motor, or replaces a component, there is a risk of introducing a new fault. Common examples include: cross-threaded bolts, incorrect torque, contamination during bearing replacement, cable connections not properly tightened, wrong fuse rating fitted, and O-rings damaged during reassembly. This is the 'infant mortality' effect that RCM research identified — it is why unnecessary PM interventions should be avoided."
  },
  {
    id: 12,
    question: "In the context of ST1426, a maintenance technician should be able to:",
    options: [
      "Only perform reactive repairs",
      "Explain the rationale for different maintenance strategies, carry out both planned and reactive maintenance tasks competently, provide feedback on equipment condition during PM visits, and contribute to continuous improvement of the maintenance programme",
      "Only follow written PM instructions without understanding why",
      "Only perform condition monitoring with specialist equipment"
    ],
    correctAnswer: 1,
    explanation: "ST1426 expects maintenance technicians to understand maintenance principles, not just follow instructions. This includes: understanding why a particular strategy (PPM, condition-based, run-to-failure) has been chosen for each asset; carrying out PM tasks to the required standard and documenting findings accurately; providing feedback when PM tasks reveal unexpected conditions or when the PM frequency appears too long or too short; and contributing to the continuous improvement of the maintenance programme through root cause analysis, FMEA participation, and maintenance review meetings."
  }
];

const faqs = [
  {
    question: "What is the right balance between planned and reactive maintenance?",
    answer: "There is no single 'right' answer — it depends on the criticality of the assets, the consequences of failure, the age and condition of the equipment, and the resources available. However, world-class maintenance organisations typically achieve 80-90% planned work and 10-20% reactive work. The key is not to eliminate all reactive work (some run-to-failure is deliberate and justified) but to minimise unplanned, emergency breakdowns on critical equipment. Start by analysing your current breakdown data, identify the most common and costly failure modes, and develop targeted preventive tasks for those specific failure modes."
  },
  {
    question: "How do I know if a PM task is adding value or just costing money?",
    answer: "A PM task adds value if it detects deterioration that would otherwise lead to an unplanned failure, or if it restores or replaces a component that is approaching wear-out. It is not adding value if the component is consistently found in good condition with no sign of deterioration — in this case the interval may be too short. Review the PM task feedback: what does the technician find each time? If the answer is consistently 'no issues found', consider extending the interval. If components are occasionally found deteriorated, the interval is about right. If failures are occurring between PM visits, the interval is too long or the wrong technique is being used."
  },
  {
    question: "Should I follow the manufacturer's recommended maintenance intervals exactly?",
    answer: "Manufacturer's recommendations are a good starting point but should not be followed blindly. The manufacturer does not know your specific operating context: how heavily the equipment is loaded, the ambient conditions, the quality of the power supply, or how critical the equipment is to your operation. Use the manufacturer's intervals as a baseline, then adjust based on your own failure history, condition monitoring data, and operating experience. An equipment item running lightly loaded in a clean, cool environment may need less maintenance than the manufacturer suggests, while one running heavily loaded in a harsh environment may need more."
  },
  {
    question: "How do I justify the cost of condition monitoring equipment to my manager?",
    answer: "Build a business case based on the cost of the failures you aim to prevent. Calculate the total cost of recent unplanned breakdowns on the target equipment (including lost production, overtime, parts, secondary damage). Compare this to the cost of the monitoring equipment and the technician time to perform the monitoring. For critical equipment, condition monitoring typically pays for itself within 1-2 years through avoided breakdowns. Present specific examples: 'The motor bearing failure on Line 3 in October cost the business an estimated amount in lost production and emergency repair. Monthly vibration monitoring, costing a fraction of that annually, would have detected the deterioration 3 months before failure.'"
  },
  {
    question: "What should I do when I find something unexpected during a PM visit?",
    answer: "Document it immediately and report it to your supervisor. If it presents an immediate safety risk, make the area safe and isolate the equipment. If it is deterioration that is not yet critical, raise a follow-up work order with appropriate priority. Take photographs if possible. Update the CMMS record with your findings. This feedback is invaluable for the continuous improvement of the maintenance programme — it may indicate that the PM interval needs adjusting, that additional tasks are needed, or that a design modification would prevent the issue. Never ignore unexpected findings, even if they seem minor."
  }
];

const MOETModule4Section7_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section7">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Scale className="h-4 w-4" />
            <span>Module 4.7.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Balancing PPM and Corrective Maintenance
          </h1>
          <p className="text-white/80">
            Finding the right mix of planned and reactive maintenance for maximum reliability at minimum cost
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>PPM reduces failures:</strong> Planned tasks catch deterioration before it becomes a breakdown</li>
              <li className="pl-1"><strong>Not all reactive is bad:</strong> Deliberate run-to-failure is valid for low-consequence items</li>
              <li className="pl-1"><strong>Target ratio:</strong> World-class aims for 80%+ planned, 20% or less reactive</li>
              <li className="pl-1"><strong>Over-maintenance:</strong> Too much PM wastes resources and can introduce failures</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>PM feedback:</strong> Report what you find during PM visits — it drives improvement</li>
              <li className="pl-1"><strong>Cost awareness:</strong> Understand the true cost difference between planned and reactive work</li>
              <li className="pl-1"><strong>Optimisation:</strong> Help refine PM intervals based on equipment condition data</li>
              <li className="pl-1"><strong>ST1426:</strong> Demonstrates understanding of maintenance strategy and continuous improvement</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the difference between planned preventive and corrective maintenance strategies",
              "Describe the cost-benefit case for preventive maintenance on critical equipment",
              "Identify when corrective (run-to-failure) maintenance is an appropriate strategy",
              "Interpret maintenance KPIs including the planned-to-reactive ratio",
              "Explain how PM optimisation improves both reliability and cost-effectiveness",
              "Contribute to continuous improvement of the maintenance programme through task feedback"
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
            The Maintenance Strategy Spectrum
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Maintenance strategies exist on a spectrum from purely reactive (fix it when it breaks) to purely proactive (prevent every possible failure). Neither extreme is optimal. A purely reactive approach results in excessive downtime, emergency costs, safety risks and secondary damage. A purely preventive approach wastes resources on unnecessary tasks, introduces maintenance-induced failures, and still cannot prevent truly random failure modes. The goal is to find the right balance — applying the most appropriate strategy to each failure mode based on its characteristics and consequences.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Maintenance Strategy Spectrum</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-24 text-right text-xs text-red-400 font-medium">Reactive Only</div>
                  <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-red-500/50 via-yellow-500/50 to-green-500/50"></div>
                  <div className="w-24 text-left text-xs text-green-400 font-medium">Proactive Only</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 text-right text-xs text-white/50">High cost</div>
                  <div className="flex-1 text-center text-xs text-elec-yellow/80 font-medium">Optimum balance</div>
                  <div className="w-24 text-left text-xs text-white/50">High cost</div>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2">Total maintenance cost is minimised at the optimum balance point — enough preventive maintenance to avoid costly breakdowns, but not so much that it wastes resources or introduces new failures.</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Maintenance Strategy Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reactive (Corrective)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Planned Preventive (PPM)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Condition-Based (CBM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Trigger</td>
                      <td className="border border-white/10 px-3 py-2">Equipment fails</td>
                      <td className="border border-white/10 px-3 py-2">Calendar or usage interval</td>
                      <td className="border border-white/10 px-3 py-2">Detected deterioration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Planning</td>
                      <td className="border border-white/10 px-3 py-2">Unplanned, emergency</td>
                      <td className="border border-white/10 px-3 py-2">Scheduled in advance</td>
                      <td className="border border-white/10 px-3 py-2">Planned once detected</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Cost per event</td>
                      <td className="border border-white/10 px-3 py-2">High (emergency rates, overtime, lost production)</td>
                      <td className="border border-white/10 px-3 py-2">Moderate (planned, scheduled)</td>
                      <td className="border border-white/10 px-3 py-2">Moderate (planned repair + monitoring cost)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Component life usage</td>
                      <td className="border border-white/10 px-3 py-2">100% (runs to failure)</td>
                      <td className="border border-white/10 px-3 py-2">Partial (replaced before end of life)</td>
                      <td className="border border-white/10 px-3 py-2">Near 100% (replaced when needed)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Best for</td>
                      <td className="border border-white/10 px-3 py-2">Low-consequence, non-critical items</td>
                      <td className="border border-white/10 px-3 py-2">Wear-out failure modes</td>
                      <td className="border border-white/10 px-3 py-2">Random failures with detectable P-F interval</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The question is not "should we do preventive or reactive maintenance?" but rather "which failure modes should be managed preventively and which can be managed reactively?" The answer is different for every asset, every failure mode, and every operating context.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The True Cost of Reactive Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The direct repair cost of fixing a breakdown is only a fraction of the true total cost. Understanding the full cost of reactive maintenance is essential for building the business case for preventive investment. Studies consistently show that the total cost of an unplanned breakdown is 3-10 times the cost of the equivalent planned repair. On critical production equipment, the ratio can be even higher.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Iceberg Model of Breakdown Costs</p>
              <p className="text-sm text-white mb-3">The visible cost (direct repair) is only the tip of the iceberg. Below the surface:</p>
              <div className="space-y-2">
                <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-white"><strong>Direct costs (visible):</strong> Labour, spare parts, contractor charges</p>
                </div>
                <div className="p-2 rounded bg-orange-500/10 border border-orange-500/20">
                  <p className="text-sm text-white"><strong>Emergency premiums:</strong> Overtime rates, emergency call-out fees, expedited parts delivery</p>
                </div>
                <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-sm text-white"><strong>Production losses:</strong> Lost output, missed orders, customer penalties, reduced quality</p>
                </div>
                <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm text-white"><strong>Secondary damage:</strong> Failed bearing damages shaft, winding burn-out from overheating, water damage from pump failure</p>
                </div>
                <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm text-white"><strong>Indirect costs:</strong> Disrupted planned work, investigation time, management attention, safety incidents</p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Worked Example: VSD Failure on a Critical Pump</p>
              <p className="text-sm text-white mb-2">A variable speed drive fails on a critical cooling water pump at 02:00 on a Saturday:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Direct repair:</strong> Replacement VSD module + 4 hours labour = moderate cost</li>
                <li className="pl-1"><strong>Emergency call-out:</strong> Weekend overtime rate (double time + call-out premium)</li>
                <li className="pl-1"><strong>Expedited parts:</strong> Next-day delivery surcharge for the VSD module</li>
                <li className="pl-1"><strong>Production loss:</strong> 6 hours downtime on the production line at significant hourly cost</li>
                <li className="pl-1"><strong>Secondary damage:</strong> Overheated process due to loss of cooling — damaged product batch</li>
                <li className="pl-1"><strong>Investigation:</strong> Root cause analysis, reporting, management review</li>
              </ul>
              <p className="text-sm text-white mt-2 italic">
                The total cost is typically many times the direct repair cost. A quarterly thermographic survey of the VSD would have detected the overheating connection that caused the failure, at a fraction of the total breakdown cost.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When justifying preventive maintenance investment, always compare the full cost of the breakdowns it prevents (including production losses and secondary damage), not just the direct repair cost. The business case for preventive maintenance on critical equipment is almost always compelling when the full cost of failure is considered.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Optimising PM Intervals and Tasks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An effective preventive maintenance programme is not static — it evolves continuously based on equipment condition data, failure history and operational experience. PM optimisation is the process of refining task frequencies, task content and task techniques to achieve the best balance between reliability and cost. This is a core aspect of continuous improvement in maintenance management.
            </p>

            <div className="my-6 space-y-3">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Extending PM Intervals</h3>
                <p className="text-sm text-white">
                  If a PM task consistently finds the component in good condition with no sign of deterioration, the interval may be too short. Gradually extend the interval (for example, from 6-monthly to 9-monthly) and monitor the results. If the component continues to be found in good condition, extend further. This process is sometimes called "age exploration" — finding the optimal point where the PM frequency matches the actual deterioration rate.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Shortening PM Intervals</h3>
                <p className="text-sm text-white">
                  If failures are occurring between PM visits, the interval is too long. Analyse the failure data to determine the actual deterioration rate, and set the PM interval accordingly. Alternatively, consider switching to a more sensitive monitoring technique — for example, moving from visual inspection (which may only detect late-stage deterioration) to vibration monitoring (which can detect early-stage bearing deterioration).
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Changing PM Techniques</h3>
                <p className="text-sm text-white">
                  Sometimes the PM task itself is not the most effective approach. For example, a time-based motor bearing replacement every 3 years could be replaced with vibration monitoring — this detects actual deterioration rather than assuming it, maximises bearing life, and avoids the risk of maintenance-induced failure from unnecessary disassembly. The key question is: "Is there a better way to manage this failure mode?"
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Eliminating Non-Value Tasks</h3>
                <p className="text-sm text-white">
                  Some PM tasks in legacy programmes may have no clear purpose — they were added historically and never reviewed. Every task should be challenged: "What failure mode does this task manage? What would happen if we stopped doing it?" If the task does not manage a specific failure mode with unacceptable consequences, it should be eliminated or replaced with something more effective.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">PM Optimisation Data Sources</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Data Source</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Tells You</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">CMMS failure records</td>
                      <td className="border border-white/10 px-3 py-2">Which failure modes are occurring, how often, and on which equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">PM task feedback</td>
                      <td className="border border-white/10 px-3 py-2">What technicians find during PM visits — good condition, deterioration, unexpected issues</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Condition monitoring trends</td>
                      <td className="border border-white/10 px-3 py-2">Rate of deterioration, time from baseline to action level</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Root cause analyses</td>
                      <td className="border border-white/10 px-3 py-2">Whether failures are PM-preventable, and if so, what tasks would be effective</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Manufacturer updates</td>
                      <td className="border border-white/10 px-3 py-2">Service bulletins, known issues, revised maintenance recommendations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The technician performing the PM task is the most important source of optimisation data. Accurate, detailed feedback on what was found during each PM visit enables the maintenance planner to adjust intervals and techniques. "No issues found" is valuable feedback — it means the interval may be extendable. "Bearing showing early signs of wear" is equally valuable — it confirms the task is catching deterioration at the right time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Measuring and Improving the Maintenance Balance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Achieving the right balance between planned and reactive maintenance requires measurement, analysis and continuous improvement. Key performance indicators (KPIs) provide visibility of the current state, trend analysis shows whether improvement is occurring, and structured review processes drive the actions needed to close the gap between current performance and the target.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Maintenance KPIs</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[100px]">PM Compliance</span>
                  <span>Percentage of scheduled PM tasks completed on time. Target: &gt;90%. Low compliance means the preventive programme is not being executed — failures will follow.</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[100px]">Planned Ratio</span>
                  <span>Planned work as a percentage of total work (by work orders or labour hours). Target: &gt;80%. Measures the effectiveness of the preventive programme.</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[100px]">MTBF</span>
                  <span>Mean Time Between Failures. Should be increasing if the maintenance programme is improving. Track per asset or asset class.</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[100px]">MTTR</span>
                  <span>Mean Time To Repair. Should be decreasing as planning, parts availability and technician skills improve.</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-elec-yellow/80 font-medium min-w-[100px]">Availability</span>
                  <span>Percentage of time the asset is available for production. MTBF / (MTBF + MTTR) x 100. The ultimate measure of maintenance effectiveness.</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Improving the Planned Ratio</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Analyse each reactive work order: was this failure preventable?</li>
                  <li className="pl-1">For preventable failures, add targeted PM or CBM tasks</li>
                  <li className="pl-1">Ensure PM compliance is high (schedule adherence)</li>
                  <li className="pl-1">Review PM task quality (are tasks being done properly?)</li>
                  <li className="pl-1">Address the top 5 breakdown causes each quarter</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Signs of Good Balance</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Breakdowns on critical equipment are rare</li>
                  <li className="pl-1">Most repairs are planned and scheduled in advance</li>
                  <li className="pl-1">PM tasks detect deterioration that leads to planned repairs</li>
                  <li className="pl-1">Run-to-failure items are documented and justified</li>
                  <li className="pl-1">Maintenance costs are stable or decreasing while reliability improves</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Improving the maintenance balance is a journey, not a destination. Even world-class organisations continue to refine their maintenance programmes. The key is to have a structured process for analysing failures, adjusting preventive tasks, and measuring the results. Every breakdown is a learning opportunity — it either confirms the current strategy or points to an improvement that should be made.
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
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Maintenance Strategy Selection</p>
                <ul className="space-y-0.5">
                  <li>Safety/environmental consequence = proactive task mandatory</li>
                  <li>Hidden failure = failure-finding task required</li>
                  <li>Operational consequence = proactive if cost-justified</li>
                  <li>Non-operational = run-to-failure acceptable</li>
                  <li>Wear-out pattern = time-based replacement</li>
                  <li>Random with P-F interval = condition-based monitoring</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Target KPIs</p>
                <ul className="space-y-0.5">
                  <li>PM compliance: &gt;90% on time</li>
                  <li>Planned ratio: &gt;80% of work</li>
                  <li>MTBF: increasing trend</li>
                  <li>MTTR: decreasing trend</li>
                  <li>Availability: &gt;95% for critical assets</li>
                  <li>Maintenance cost: 2-5% of RAV</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section7-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Principles of RCM
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section7-3">
              Next: Criticality Analysis of Equipment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule4Section7_2;
