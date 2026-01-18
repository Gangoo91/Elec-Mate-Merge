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
      "Harsh environments (coastal, industrial, agricultural) require more frequent inspections and environment-specific checks such as corrosion monitoring or pollution assessment.",
  },
  {
    id: 5,
    question: "What determines the appropriate cleaning schedule for a PV system?",
    options: [
      "Manufacturer recommendation only",
      "Fixed monthly schedule",
      "Performance monitoring data and site conditions",
      "No cleaning is necessary",
    ],
    correctAnswer: 2,
    explanation:
      "Cleaning schedules should be based on performance monitoring (PR decline) and site-specific soiling factors rather than arbitrary fixed intervals.",
  },
  {
    id: 6,
    question: "What should be checked monthly on battery energy storage systems?",
    options: [
      "Cell replacement",
      "Cooling system function and general condition",
      "Complete rewiring",
      "Nothing - annual checks only",
    ],
    correctAnswer: 1,
    explanation:
      "Monthly BESS checks should verify cooling system operation, inspect for leaks or damage, review warning lights/alarms, and confirm environmental controls are functioning.",
  },
  {
    id: 7,
    question: "How should firmware updates be managed?",
    options: [
      "Apply immediately without review",
      "Never update firmware",
      "Review release notes, test if possible, schedule during low-risk periods",
      "Wait until equipment fails",
    ],
    correctAnswer: 2,
    explanation:
      "Firmware updates should be reviewed for relevance, tested in non-critical systems where possible, and scheduled for low-production periods to minimise risk of issues.",
  },
  {
    id: 8,
    question: "What is the purpose of maintaining a maintenance log?",
    options: [
      "Regulatory requirement only",
      "Support warranty claims, track trends, and plan future work",
      "Tax purposes only",
      "No real purpose",
    ],
    correctAnswer: 1,
    explanation:
      "Maintenance logs support warranty claims with documented evidence, enable trend analysis of developing issues, and inform future maintenance planning.",
  },
  {
    id: 9,
    question: "When should protection device testing be performed?",
    options: [
      "Never",
      "During annual comprehensive maintenance",
      "Only after failures",
      "Monthly",
    ],
    correctAnswer: 1,
    explanation:
      "Protection devices (isolators, RCDs, surge protection) should be tested during annual comprehensive maintenance to verify they function correctly when needed.",
  },
  {
    id: 10,
    question: "How should seasonal variations affect maintenance schedules?",
    options: [
      "No effect",
      "Schedule intensive work in lower-production months",
      "Only work in summer",
      "Only work in winter",
    ],
    correctAnswer: 1,
    explanation:
      "Intensive maintenance should be scheduled during lower-production months (winter in UK) to minimise lost generation, whilst lighter checks can occur year-round.",
  },
];

const faqs = [
  {
    question: "How do I create a maintenance schedule for a new system?",
    answer:
      "Start with manufacturer requirements and recommendations. Consider local conditions (coastal, dusty, agricultural). Include initial intensive commissioning checks, then transition to routine schedules. Build in flexibility to adjust based on early findings and performance data.",
  },
  {
    question: "What maintenance tasks can be performed remotely?",
    answer:
      "Remote monitoring allows performance tracking, fault detection, and some inverter diagnostics. Firmware updates can often be applied remotely. However, physical inspections, cleaning, electrical testing, and mechanical checks require site visits.",
  },
  {
    question: "How should I schedule maintenance for multi-site portfolios?",
    answer:
      "Group geographically close sites for efficient travel. Schedule similar tasks together. Use portfolio-wide monitoring to prioritise sites needing attention. Consider specialist contractors for specific tasks across multiple sites. Standardise documentation across the portfolio.",
  },
  {
    question: "What triggers an unscheduled maintenance visit?",
    answer:
      "Triggers include significant performance drops, monitoring alerts, reported faults, severe weather events, and insurance or warranty inspection requirements. Have clear escalation procedures defining response times for different alert severities.",
  },
  {
    question: "How do warranty requirements affect maintenance schedules?",
    answer:
      "Review all warranty documents for maintenance requirements - some require specific inspection intervals, qualified personnel, or documented maintenance records. Non-compliance may void warranties. Build warranty requirements into your baseline maintenance schedule.",
  },
  {
    question: "Should I maintain different schedules for different system sizes?",
    answer:
      "Yes. Large commercial systems typically need more frequent attention and dedicated O&M contracts. Residential systems can often manage with annual professional visits supplemented by owner monitoring. However, all systems benefit from structured maintenance regardless of size.",
  },
];

const RenewableEnergyModule7Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="..">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Maintenance Schedules</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 7 - Section 3</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Maintenance Schedules
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Structured schedules for visual, electrical, and firmware maintenance of renewable energy systems
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">In 30 Seconds:</span> Target 80% planned maintenance, 20% reactive
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Spot it:</span> Visual quarterly, electrical annually, firmware quarterly
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Use it:</span> Document findings, actions, and recommendations every visit
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Key Task:</span> Schedule intensive work during low-production months
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Create structured maintenance schedules",
            "Balance planned and reactive maintenance",
            "Schedule tasks appropriate to system type and environment",
            "Document maintenance activities effectively",
            "Adjust schedules for seasonal variations",
            "Manage firmware updates safely",
          ].map((outcome, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">Schedule Structure and Planning</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Effective maintenance schedules balance thoroughness with practicality, ensuring critical tasks are completed without excessive cost or disruption.
            </p>
            <p>
              <span className="text-white font-medium">Maintenance Tiers:</span> Daily involves remote monitoring checks and alarm review. Weekly includes performance data analysis and trend review. Monthly covers basic visual inspection and cleaning assessment. Quarterly involves detailed visual inspection and performance analysis. Annually is comprehensive maintenance including electrical testing.
            </p>
            <p>
              <span className="text-white font-medium">Schedule Development:</span> Base schedules on manufacturer requirements, industry standards, site-specific factors, and operational experience. Build in flexibility for weather-dependent tasks. Consider site access constraints such as farm cycles or building access times. Align with warranty requirements.
            </p>
            <p>
              <span className="text-white font-medium">Resource Planning:</span> Identify required skills for each task tier. Plan tool and equipment requirements. Schedule qualified personnel availability. Allow contingency time for unexpected findings.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Visual Inspection Schedules</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Visual inspections are the first line of defence against developing issues, enabling early identification before problems cause failures.
            </p>
            <p>
              <span className="text-white font-medium">Monthly Walkthrough:</span> Check for obvious damage or disturbance. Verify security of enclosures and access points. Note any vegetation encroachment. Check for new shading sources. Review monitoring system health.
            </p>
            <p>
              <span className="text-white font-medium">Quarterly Detailed Inspection:</span> Inspect all module surfaces for damage, soiling, and discolouration. Check mounting structure integrity and fixings. Examine cables and conduits for damage or degradation. Verify labelling remains legible. Assess drainage and water management.
            </p>
            <p>
              <span className="text-white font-medium">Documentation Standards:</span> Use standardised checklists for consistency. Photograph any concerns with location reference. Record weather conditions during inspection. Note any changes since previous visit. Recommend follow-up actions with priority ratings.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Electrical Maintenance Schedules</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Electrical testing verifies system safety and performance, identifying issues that may not be visible during routine inspection.
            </p>
            <p>
              <span className="text-white font-medium">Annual Electrical Testing:</span> Insulation resistance testing on all DC circuits. Open circuit voltage measurements for all strings. String current comparison under consistent conditions. Earth continuity verification. Protection device functional testing including RCDs.
            </p>
            <p>
              <span className="text-white font-medium">Thermal Imaging (Annual):</span> Schedule during high-irradiance period for best results. Cover all modules, connections, and combiner boxes. Document anomalies with severity classification. Compare with previous surveys to track changes. Prioritise remedial actions based on risk.
            </p>
            <p>
              <span className="text-white font-medium">Connection Integrity:</span> Torque-check DC connections annually or after thermal anomalies. Verify MC4 and terminal connections are secure. Check combiner box connections and fuse contacts. Examine AC connection points and distribution equipment.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Firmware and Software Maintenance</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Firmware and software maintenance ensures equipment operates with latest features, bug fixes, and security patches whilst managing update risks.
            </p>
            <p>
              <span className="text-white font-medium">Quarterly Firmware Review:</span> Check manufacturer websites for available updates. Review release notes for relevant improvements or fixes. Assess security updates for urgency. Plan update schedule during appropriate periods. Test on non-critical equipment first where possible.
            </p>
            <p>
              <span className="text-white font-medium">Update Procedures:</span> Document current firmware versions before updating. Create backup of settings where possible. Schedule updates during low-production periods. Apply updates systematically, verifying operation after each. Document successful updates and any issues encountered.
            </p>
            <p>
              <span className="text-white font-medium">Monitoring Software:</span> Keep monitoring platforms updated. Verify data integrity and accuracy regularly. Check alert thresholds remain appropriate. Review user access and security settings. Ensure data backup procedures are functioning.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Schedule Optimisation and Review</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Maintenance schedules should evolve based on experience, performance data, and changing conditions to optimise effectiveness and cost.
            </p>
            <p>
              <span className="text-white font-medium">Performance-Based Adjustment:</span> Use monitoring data to identify systems needing more attention. Reduce frequency for consistently well-performing systems. Increase inspection of problem-prone equipment. Adjust cleaning schedules based on soiling impact data.
            </p>
            <p>
              <span className="text-white font-medium">Seasonal Considerations:</span> Schedule intensive maintenance during low-production months such as winter in the UK. Plan cleaning before peak production season. Consider weather impacts on outdoor work. Adjust vegetation management for growing seasons.
            </p>
            <p>
              <span className="text-white font-medium">Annual Schedule Review:</span> Assess effectiveness of current programme. Review failure and near-miss incidents. Update for any equipment or site changes. Benchmark against industry developments. Incorporate lessons learned and best practices.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Balancing thoroughness and cost:</span> Focus resources on tasks with highest impact. Use monitoring data to prioritise attention. Consider risk-based approaches for large portfolios.
            </p>
            <p>
              <span className="text-white font-medium">Documentation discipline:</span> Consistent documentation enables trend analysis and supports warranty claims. Use standardised forms and checklists. Store records securely with appropriate backup.
            </p>
            <p>
              <span className="text-white font-medium">Communication with stakeholders:</span> Keep system owners informed of maintenance activities and findings. Provide clear recommendations with rationale. Build maintenance into long-term asset management discussions.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Maintenance Schedules Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-2">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-4">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule7Section3;
