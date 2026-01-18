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
    question: "What is condition-based maintenance?",
    options: [
      "Maintenance only when failures occur",
      "Maintenance based on monitoring data and component condition",
      "Fixed-schedule maintenance regardless of condition",
      "Maintenance required by regulations",
    ],
    correctAnswer: 1,
    explanation:
      "Condition-based maintenance uses monitoring data and inspections to determine when maintenance is needed, optimising intervention timing based on actual component condition.",
  },
  {
    id: 6,
    question: "What factor most affects the required cleaning frequency for PV modules?",
    options: [
      "Module type",
      "Inverter brand",
      "Local environment (dust, pollen, bird activity)",
      "System size",
    ],
    correctAnswer: 2,
    explanation:
      "Local environmental factors including dust, pollen, bird activity, proximity to trees, and rainfall patterns have the greatest impact on required cleaning frequency.",
  },
  {
    id: 7,
    question: "How should spare parts inventory be managed?",
    options: [
      "No spare parts needed",
      "Stock critical components with long lead times",
      "Only order when failures occur",
      "Stock one of everything",
    ],
    correctAnswer: 1,
    explanation:
      "Effective spare parts management stocks critical components with long lead times (fuses, contactors, communication modules) to minimise downtime when failures occur.",
  },
  {
    id: 8,
    question: "What documentation should be maintained for preventive maintenance?",
    options: [
      "None required",
      "Schedules, completed tasks, findings, and recommendations",
      "Photographs only",
      "Energy production data only",
    ],
    correctAnswer: 1,
    explanation:
      "Comprehensive documentation including schedules, completed tasks, findings, test results, parts used, and recommendations supports warranty claims and trend analysis.",
  },
  {
    id: 9,
    question: "When should preventive maintenance schedules be reviewed?",
    options: [
      "Never once established",
      "Annually based on experience and performance data",
      "Only when failures occur",
      "Every 10 years",
    ],
    correctAnswer: 1,
    explanation:
      "Maintenance schedules should be reviewed annually, adjusting frequencies and tasks based on experience, performance trends, and any changes to site conditions.",
  },
  {
    id: 10,
    question: "What is the benefit of manufacturer maintenance training?",
    options: [
      "No benefit - general skills are sufficient",
      "Equipment-specific knowledge and warranty compliance",
      "Lower insurance premiums only",
      "Required for all installations",
    ],
    correctAnswer: 1,
    explanation:
      "Manufacturer training provides equipment-specific knowledge, access to technical support, and may be required for warranty compliance on complex systems.",
  },
];

const faqs = [
  {
    question: "How do I develop a maintenance programme for a new installation?",
    answer:
      "Start with manufacturer recommendations as a baseline. Consider local environmental factors (coastal, industrial, rural). Review similar site experience if available. Include initial more frequent inspections during the first year, then adjust based on findings. Document everything to refine the programme over time.",
  },
  {
    question: "What is the economic case for preventive maintenance?",
    answer:
      "Preventive maintenance typically costs 1-2% of system value annually but prevents much more expensive reactive repairs and production losses. Studies show every pound spent on preventive maintenance saves three to five pounds in avoided failures and lost production.",
  },
  {
    question: "How do I clean PV modules safely?",
    answer:
      "Clean during early morning or evening when modules are cool. Use deionised water and soft brushes or squeegees. Avoid high-pressure washers that can damage seals. Never walk on modules. Consider robotic cleaning for large arrays. Document cleaning dates and compare performance before/after.",
  },
  {
    question: "What should be included in a maintenance contract?",
    answer:
      "A good maintenance contract specifies visit frequency, tasks to be completed, response times for reactive calls, spare parts arrangements, reporting requirements, performance guarantees (availability, PR), and escalation procedures. Ensure it covers both routine maintenance and emergency response.",
  },
  {
    question: "How do environmental conditions affect maintenance requirements?",
    answer:
      "Coastal sites need more frequent corrosion checks. Dusty or agricultural areas need more cleaning. Bird-prone sites may need deterrent measures. Areas with temperature extremes need connection torque checks. Sites with vegetation need regular shading assessment and clearance.",
  },
  {
    question: "When should I recommend inverter replacement rather than repair?",
    answer:
      "Consider replacement when repair costs exceed 50% of replacement cost, when parts are obsolete, when efficiency has declined significantly, or when the inverter is approaching end of life. Newer inverters often offer better efficiency and features that improve the business case.",
  },
];

const RenewableEnergyModule7Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/renewable-energy-module-7">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Preventive Maintenance Programmes</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 7 - Section 2</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Preventive Maintenance Programmes
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Comprehensive maintenance planning for renewable energy system reliability and longevity
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">In 30 Seconds:</span> Preventive maintenance prevents failures and maintains optimal performance
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Spot it:</span> Quarterly visual inspections, annual thermal imaging
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Use it:</span> Condition-based cleaning rather than fixed schedules
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Key Component:</span> Inverters typically need replacement at 10-15 years
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Design effective preventive maintenance programmes",
            "Establish appropriate inspection frequencies",
            "Develop condition-based cleaning strategies",
            "Plan for component replacement cycles",
            "Document maintenance activities effectively",
            "Optimise maintenance costs versus reliability",
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
            <h2 className="text-xl font-semibold text-white">Maintenance Programme Fundamentals</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              A well-designed preventive maintenance programme is essential for maximising system reliability, performance, and lifespan whilst minimising unexpected failures and costly repairs.
            </p>
            <p>
              <span className="text-white font-medium">Programme Objectives:</span> The primary goals are to prevent unexpected failures that cause downtime, maintain optimal energy production through system cleanliness and tuning, extend equipment lifespan through proactive care, ensure continued compliance with safety requirements, and protect warranty entitlements through documented maintenance.
            </p>
            <p>
              <span className="text-white font-medium">Maintenance Types:</span> Preventive maintenance includes scheduled inspections and servicing to prevent failures. Predictive maintenance uses monitoring data to anticipate issues before they cause problems. Corrective maintenance addresses faults and failures as they occur. A good programme balances all three, targeting 80% planned and 20% reactive maintenance.
            </p>
            <p>
              <span className="text-white font-medium">Programme Development:</span> Start with manufacturer recommendations as a baseline. Adjust for local environmental conditions such as coastal, industrial, or agricultural settings. Consider system age and technology type, as newer systems may need less frequent attention. Review and refine annually based on experience and performance data.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Inspection Schedules and Procedures</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Regular inspections form the backbone of preventive maintenance, enabling early detection of developing issues before they cause system failures or safety hazards.
            </p>
            <p>
              <span className="text-white font-medium">Visual Inspections (Quarterly):</span> Check module surfaces for soiling, damage, discolouration, or delamination. Inspect mounting structures for corrosion, loose fixings, and structural integrity. Verify cable management and protection. Check inverter and combiner enclosures for damage or water ingress. Assess vegetation growth and shading changes.
            </p>
            <p>
              <span className="text-white font-medium">Thermal Imaging (Annual):</span> Conduct during high-irradiance conditions (minimum 500 W/m², ideally above 700 W/m²). Identify hot spots indicating cell defects, bypass diode failures, or loose connections. Document anomalies with location and severity. Compare year-on-year to track developing issues. Schedule repairs based on severity and safety risk.
            </p>
            <p>
              <span className="text-white font-medium">Electrical Testing (Annual):</span> Insulation resistance testing confirms cable and connection integrity. Open circuit voltage verification checks module health. String current comparison identifies underperforming strings. Earth continuity testing verifies safety of exposed metalwork. Protection device testing confirms safety systems function correctly.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Cleaning Strategies</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Module cleaning should be based on actual soiling impact rather than fixed schedules, as optimal cleaning frequency varies significantly with local environmental conditions.
            </p>
            <p>
              <span className="text-white font-medium">Soiling Assessment:</span> Monitor performance ratio trends to quantify soiling impact. Compare dirty versus clean module output during the same conditions. Consider seasonal patterns such as higher pollen in spring. Assess cost-benefit by comparing cleaning cost versus recovered production.
            </p>
            <p>
              <span className="text-white font-medium">Cleaning Methods:</span> Use deionised water to prevent mineral deposits. Clean during cool periods such as early morning to avoid thermal shock. Use soft brushes or squeegees and avoid abrasive materials. Never use high-pressure washers that can damage seals and frames. Consider robotic cleaning systems for large commercial arrays.
            </p>
            <p>
              <span className="text-white font-medium">Environmental Considerations:</span> Coastal sites may need salt deposit removal. Agricultural areas face seasonal pollen and dust challenges. Urban sites may accumulate traffic pollutants. Areas with bird activity may need more frequent cleaning. Sites with adequate rainfall may need minimal intervention.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Component Lifecycle Management</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Understanding component lifespans enables proactive replacement planning, avoiding unexpected failures and minimising system downtime.
            </p>
            <p>
              <span className="text-white font-medium">PV Modules (25-30+ years):</span> Modules degrade gradually at 0.5-0.8% per year. Performance warranties typically guarantee 80% output at 25 years. Most module failures occur in first year (infant mortality) or late life. Plan financial provisions for eventual replacement.
            </p>
            <p>
              <span className="text-white font-medium">Inverters (10-15 years):</span> String inverters typically last 10-15 years. Microinverters and optimisers may last longer but are harder to replace. Capacitor degradation is a common failure mode. Plan for at least one replacement during system lifetime. Consider extended warranties or service contracts.
            </p>
            <p>
              <span className="text-white font-medium">Balance of System:</span> Mounting structures should last the system lifetime with proper maintenance. DC cables may degrade in harsh UV environments. Isolators and protection devices need periodic testing and eventual replacement. Combiner boxes and enclosures need seal maintenance.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[3]]} />

        {/* Section 05 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">05</span>
            <h2 className="text-xl font-semibold text-white">Documentation and Continuous Improvement</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Comprehensive documentation supports warranty claims, enables trend analysis, and provides the foundation for continuous programme improvement.
            </p>
            <p>
              <span className="text-white font-medium">Maintenance Records:</span> Document every maintenance visit with date, time, personnel, and conditions. Record all findings including both issues and confirmation of good condition. List actions taken and parts used with serial numbers where applicable. Note any recommendations for future attention.
            </p>
            <p>
              <span className="text-white font-medium">Performance Tracking:</span> Maintain performance records to track degradation trends. Compare actual versus expected output over time. Document any performance changes following maintenance. Use data to justify maintenance investment and optimise schedules.
            </p>
            <p>
              <span className="text-white font-medium">Programme Review:</span> Review maintenance programmes annually. Assess effectiveness of current schedules and tasks. Incorporate lessons learned from failures and near-misses. Update for any changes to site conditions or equipment. Benchmark against industry best practice.
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
              <span className="text-white font-medium">Starting a maintenance programme:</span> Begin with manufacturer recommendations and adjust based on site experience. More frequent initial inspections help establish baseline condition and appropriate ongoing frequencies.
            </p>
            <p>
              <span className="text-white font-medium">Cost optimisation:</span> Every pound spent on preventive maintenance typically saves three to five pounds in avoided failures. Focus resources on high-impact activities and use monitoring data to prioritise interventions.
            </p>
            <p>
              <span className="text-white font-medium">Building customer relationships:</span> Regular maintenance visits provide opportunities to discuss system performance, identify upgrade opportunities, and build long-term customer relationships.
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
          title="Preventive Maintenance Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-1">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-3">
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

export default RenewableEnergyModule7Section2;
