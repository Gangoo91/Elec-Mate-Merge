import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Resource Planning - HNC Module 5 Section 1.4";
const DESCRIPTION = "Master resource planning for building services: labour allocation, materials procurement, plant requirements, resource levelling and productivity factors for MEP installations.";

const quickCheckQuestions = [
  {
    id: "resource-histogram",
    question: "What does a resource histogram display?",
    options: ["Material costs over time", "Resource requirements plotted against time periods", "Equipment depreciation rates", "Subcontractor payment schedules"],
    correctIndex: 1,
    explanation: "A resource histogram is a bar chart showing resource requirements (typically labour hours or personnel numbers) plotted against time periods, enabling project managers to visualise demand peaks and troughs."
  },
  {
    id: "resource-levelling",
    question: "The primary purpose of resource levelling is to:",
    options: ["Increase project duration", "Reduce resource demand peaks by adjusting activity timing", "Eliminate all float from the programme", "Maximise overtime working"],
    correctIndex: 1,
    explanation: "Resource levelling aims to smooth out peaks in resource demand by adjusting activity timing within available float, avoiding excessive hiring/firing cycles and overtime costs."
  },
  {
    id: "productivity-rate",
    question: "An electrician installing containment achieves 25 metres per day. If 200 metres are required, what labour duration is needed?",
    options: ["5 days", "8 days", "10 days", "25 days"],
    correctIndex: 1,
    explanation: "Labour duration = Quantity required / Productivity rate = 200m / 25m per day = 8 days. Always verify productivity rates against project-specific conditions."
  },
  {
    id: "lead-time",
    question: "Which item typically has the longest procurement lead time?",
    options: ["Standard trunking", "Twin and earth cable", "Bespoke LV switchgear panels", "Modular wiring accessories"],
    correctIndex: 2,
    explanation: "Bespoke LV switchgear panels typically require 12-16 weeks lead time due to design approval, manufacturing, and testing requirements. Standard materials are usually available within days."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the relationship between resource loading and resource levelling?",
    options: [
      "They are identical processes",
      "Loading identifies requirements; levelling optimises timing",
      "Levelling identifies requirements; loading optimises timing",
      "Neither affects programme duration"
    ],
    correctAnswer: 1,
    explanation: "Resource loading determines the resource requirements for each activity. Resource levelling then adjusts activity timing within float to smooth demand peaks and optimise resource utilisation."
  },
  {
    id: 2,
    question: "A project requires 3 electricians for 4 weeks. What is the total labour resource in person-weeks?",
    options: ["4 person-weeks", "7 person-weeks", "12 person-weeks", "16 person-weeks"],
    correctAnswer: 2,
    explanation: "Total labour = Number of resources x Duration = 3 electricians x 4 weeks = 12 person-weeks. This metric helps compare different resource/duration combinations."
  },
  {
    id: 3,
    question: "Which factor most significantly affects electrical installation productivity rates?",
    options: ["Weather conditions", "Working at height and access restrictions", "Day of the week", "Number of socket outlets"],
    correctAnswer: 1,
    explanation: "Working at height, scaffold access, occupied buildings, and coordination with other trades significantly impact productivity. MEWP use can reduce productivity by 30-40% compared to working at floor level."
  },
  {
    id: 4,
    question: "When should long lead time items be ordered on a building services project?",
    options: [
      "After all design is complete",
      "When site work begins",
      "At tender stage with confirmed lead times",
      "Two weeks before required on site"
    ],
    correctAnswer: 2,
    explanation: "Long lead items (switchgear, generators, chillers) must be identified at tender stage with confirmed lead times. Orders should be placed immediately after contract award to avoid programme delays."
  },
  {
    id: 5,
    question: "A resource histogram shows a peak of 15 electricians but only 10 are available. What is the resource conflict?",
    options: ["5 electricians short", "15 electricians short", "10 electricians excess", "No conflict exists"],
    correctAnswer: 0,
    explanation: "Resource conflict = Peak demand - Available resources = 15 - 10 = 5 electricians short. This must be resolved through levelling, overtime, subcontracting, or programme extension."
  },
  {
    id: 6,
    question: "What is the typical productivity allowance for working in an occupied hospital?",
    options: ["No allowance needed", "10-15% reduction", "30-50% reduction", "100% reduction"],
    correctAnswer: 2,
    explanation: "Working in occupied hospitals typically reduces productivity by 30-50% due to access restrictions, infection control, noise limitations, and coordination with clinical activities."
  },
  {
    id: 7,
    question: "Which document forms the basis for material procurement planning?",
    options: ["The tender submission", "The bill of quantities or material schedule", "The health and safety plan", "The commissioning specification"],
    correctAnswer: 1,
    explanation: "The bill of quantities or material schedule lists all materials required with quantities, forming the basis for procurement planning, ordering schedules, and cost control."
  },
  {
    id: 8,
    question: "Plant utilisation rate measures:",
    options: [
      "How fast equipment operates",
      "The percentage of available time equipment is productively used",
      "Equipment purchase cost",
      "Maintenance frequency"
    ],
    correctAnswer: 1,
    explanation: "Plant utilisation = (Productive time / Available time) x 100%. High utilisation improves cost-effectiveness; low utilisation indicates poor planning or over-allocation."
  },
  {
    id: 9,
    question: "Why is resource levelling performed within float rather than extending the programme?",
    options: [
      "Float is free time that costs nothing",
      "Extending the programme increases costs and may breach contract dates",
      "Float cannot be used for other purposes",
      "Programme extension is not permitted"
    ],
    correctAnswer: 1,
    explanation: "Programme extension typically incurs preliminary costs, may attract liquidated damages, and delays client occupation. Levelling within float achieves smoother resource demand without these penalties."
  },
  {
    id: 10,
    question: "A cable installation requires 500m at a productivity rate of 40m/hour. With two electricians, how many hours to complete?",
    options: ["6.25 hours", "12.5 hours", "25 hours", "50 hours"],
    correctAnswer: 0,
    explanation: "Total hours = Quantity / (Rate x Number of workers) = 500m / (40m/hr x 2) = 500/80 = 6.25 hours. Doubling resources halves the duration for linear work."
  },
  {
    id: 11,
    question: "Which procurement strategy minimises storage costs on a congested city centre site?",
    options: ["Bulk ordering at project start", "Just-in-time delivery", "Owner-furnished materials", "Consignment stock"],
    correctAnswer: 1,
    explanation: "Just-in-time (JIT) delivery schedules materials to arrive as needed, minimising on-site storage requirements - essential on congested sites with limited lay-down areas."
  },
  {
    id: 12,
    question: "What is the effect of learning curve on productivity rates?",
    options: [
      "No effect on productivity",
      "Productivity decreases as work progresses",
      "Productivity improves as workers gain familiarity",
      "Learning curve only applies to manufacturing"
    ],
    correctAnswer: 2,
    explanation: "The learning curve shows productivity improvement as workers become familiar with the work, site, and methods. First-fix in initial areas takes longer than later, repetitive work."
  }
];

const faqs = [
  {
    question: "How do I estimate labour requirements for an electrical installation?",
    answer: "Start with a detailed material schedule, then apply productivity rates (metres per hour for containment/cables, hours per point for accessories). Factor in site-specific conditions: working height, access, occupied premises, coordination with other trades. Build up from activity level to weekly resource histograms. Always include supervision, testing, and commissioning labour."
  },
  {
    question: "What causes productivity rates to vary so significantly between projects?",
    answer: "Key factors include: access conditions (floor level vs MEWP vs scaffold), building occupancy (empty vs operational), complexity (standard vs complex containment routes), coordination requirements (single trade vs multi-trade congestion), location (urban vs rural), and worker experience. A 2:1 productivity variation between best and worst conditions is common."
  },
  {
    question: "How far ahead should I plan material deliveries?",
    answer: "For standard materials (cables, accessories): 2-4 weeks. For distribution boards and consumer units: 4-8 weeks. For bespoke switchgear: 12-16 weeks. For generators and transformers: 16-26 weeks. Always confirm lead times at tender and reconfirm at order - supply chain issues can significantly extend times."
  },
  {
    question: "What is the difference between resource smoothing and resource levelling?",
    answer: "Resource smoothing adjusts activities within total float to reduce peaks while maintaining the original completion date - the programme end date is fixed. Resource levelling allows the programme to extend if necessary to achieve an acceptable resource profile. Smoothing is preferred; levelling is a last resort when smoothing cannot resolve conflicts."
  },
  {
    question: "How do I handle resource conflicts when activities cannot be delayed?",
    answer: "Options include: increase shift length (overtime), add weekend working, bring in additional subcontract labour, split activities to use available resources in parallel, pre-fabricate off-site, or re-sequence work to use different trade resources. Each option has cost and quality implications requiring careful evaluation."
  },
  {
    question: "What plant is typically required for building services installation?",
    answer: "Common plant includes: MEWPs (scissor lifts, boom lifts), hand tools (battery drills, cable cutters), specialist equipment (cable pulling winches, crimping tools), testing instruments (insulation testers, multifunction testers), and temporary services (lighting, power). Plan availability to match programme peaks and minimise idle time charges."
  }
];

const HNCModule5Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section1">
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
            <span>Module 5.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Resource Planning
          </h1>
          <p className="text-white/80">
            Labour allocation, materials procurement, plant requirements and resource optimisation for building services projects
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Resource planning:</strong> Matching resources to programme requirements</li>
              <li className="pl-1"><strong>Key resources:</strong> Labour, materials, plant/equipment</li>
              <li className="pl-1"><strong>Resource histogram:</strong> Visual demand profile over time</li>
              <li className="pl-1"><strong>Levelling:</strong> Smoothing peaks within available float</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Typical productivity:</strong> 25-40m/day containment</li>
              <li className="pl-1"><strong>Switchgear lead time:</strong> 12-16 weeks</li>
              <li className="pl-1"><strong>MEWP impact:</strong> 30-40% productivity reduction</li>
              <li className="pl-1"><strong>Labour build-up:</strong> Peak at first-fix stage</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate labour requirements using productivity rates",
              "Develop resource histograms for building services projects",
              "Apply resource levelling techniques within programme float",
              "Plan material procurement with appropriate lead times",
              "Schedule plant and equipment to match programme peaks",
              "Adjust productivity rates for site-specific conditions"
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

        {/* Section 1: Labour Planning Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Labour Planning Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Labour is typically the largest controllable cost on building services projects, representing 40-60% of
              installation value. Effective labour planning ensures the right number of workers with appropriate skills
              are available when needed, avoiding costly over-manning or programme-threatening under-resourcing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Labour planning process:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Activity identification:</strong> Break work into measurable activities</li>
                <li className="pl-1"><strong>Quantity take-off:</strong> Measure work content for each activity</li>
                <li className="pl-1"><strong>Productivity application:</strong> Apply appropriate output rates</li>
                <li className="pl-1"><strong>Duration calculation:</strong> Hours = Quantity / Productivity rate</li>
                <li className="pl-1"><strong>Resource aggregation:</strong> Sum requirements by time period</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Electrical Installation Productivity Rates</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good Conditions</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Difficult Conditions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable tray installation</td>
                      <td className="border border-white/10 px-3 py-2">m/day</td>
                      <td className="border border-white/10 px-3 py-2">35-45</td>
                      <td className="border border-white/10 px-3 py-2">15-25</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Conduit installation</td>
                      <td className="border border-white/10 px-3 py-2">m/day</td>
                      <td className="border border-white/10 px-3 py-2">25-35</td>
                      <td className="border border-white/10 px-3 py-2">12-18</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SWA cable pulling</td>
                      <td className="border border-white/10 px-3 py-2">m/day (pair)</td>
                      <td className="border border-white/10 px-3 py-2">80-120</td>
                      <td className="border border-white/10 px-3 py-2">40-60</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting point complete</td>
                      <td className="border border-white/10 px-3 py-2">points/day</td>
                      <td className="border border-white/10 px-3 py-2">8-12</td>
                      <td className="border border-white/10 px-3 py-2">4-6</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Socket outlet complete</td>
                      <td className="border border-white/10 px-3 py-2">points/day</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                      <td className="border border-white/10 px-3 py-2">5-8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution board install</td>
                      <td className="border border-white/10 px-3 py-2">hours each</td>
                      <td className="border border-white/10 px-3 py-2">4-6</td>
                      <td className="border border-white/10 px-3 py-2">6-10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Productivity rates vary significantly with conditions. Always adjust base rates for project-specific factors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Resource Histograms and Levelling */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Resource Histograms and Levelling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A resource histogram displays resource requirements over time, revealing demand peaks and troughs.
              Resource levelling adjusts activity timing to smooth these variations, optimising workforce
              utilisation and reducing costly fluctuations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Resource Histogram Elements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">X-axis: Time periods (weeks/days)</li>
                  <li className="pl-1">Y-axis: Resource quantity (persons)</li>
                  <li className="pl-1">Bars: Demand per period</li>
                  <li className="pl-1">Availability line: Maximum resources</li>
                  <li className="pl-1">Cumulative curve: Total person-days</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Levelling Techniques</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Delay non-critical activities</li>
                  <li className="pl-1">Split activities where practical</li>
                  <li className="pl-1">Extend durations with fewer resources</li>
                  <li className="pl-1">Accelerate to fill troughs</li>
                  <li className="pl-1">Re-sequence within constraints</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Resource Levelling Example</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Week</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Before Levelling</th>
                      <th className="border border-white/10 px-3 py-2 text-left">After Levelling</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">12</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">14</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/70 mt-2">By delaying non-critical activities and extending durations, peaks of 12-14 are reduced to maximum 8, matching available resources.</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Resource Conflict Resolution</p>
              <p className="text-sm text-white">When demand exceeds availability and levelling within float is insufficient, options include:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                <li className="pl-1">Authorised overtime (cost premium: 1.5-2.0x)</li>
                <li className="pl-1">Weekend working (requires client consent)</li>
                <li className="pl-1">Additional subcontract labour (mobilisation lead time)</li>
                <li className="pl-1">Programme extension (last resort - cost/contractual implications)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Level resources early in planning. It becomes increasingly difficult to resolve conflicts as the project progresses and float is consumed.
            </p>
          </div>
        </section>

        {/* Section 3: Materials Procurement Planning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Materials Procurement Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective material procurement ensures items arrive when needed without excessive early delivery
              consuming storage space and working capital. Lead time management is critical for long lead
              items that can delay the entire project if not ordered promptly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Building Services Lead Times</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Item Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Lead Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Order Trigger</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard cables, accessories</td>
                      <td className="border border-white/10 px-3 py-2">1-2 weeks</td>
                      <td className="border border-white/10 px-3 py-2">As required (call-off)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Containment systems</td>
                      <td className="border border-white/10 px-3 py-2">2-4 weeks</td>
                      <td className="border border-white/10 px-3 py-2">2 weeks before first-fix</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution boards</td>
                      <td className="border border-white/10 px-3 py-2">4-8 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Design approval + 1 week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bespoke LV switchgear</td>
                      <td className="border border-white/10 px-3 py-2">12-16 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Contract award</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standby generators</td>
                      <td className="border border-white/10 px-3 py-2">16-26 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Contract award</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformers (HV/LV)</td>
                      <td className="border border-white/10 px-3 py-2">20-30 weeks</td>
                      <td className="border border-white/10 px-3 py-2">Pre-contract if possible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Procurement Strategies</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Bulk order:</strong> Volume discount, requires storage</li>
                  <li className="pl-1"><strong>Call-off:</strong> Agreed price, deliver as needed</li>
                  <li className="pl-1"><strong>JIT:</strong> Minimal storage, supplier reliability critical</li>
                  <li className="pl-1"><strong>Consignment:</strong> Pay on use, wholesaler holds stock</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Material Schedule Contents</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Item description and specification</li>
                  <li className="pl-1">Quantity with waste allowance</li>
                  <li className="pl-1">Required delivery date</li>
                  <li className="pl-1">Approved supplier/manufacturer</li>
                  <li className="pl-1">Order status tracking</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical action:</strong> Identify and order long lead items immediately after contract award. A 16-week switchgear delay cannot be recovered.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Plant Requirements and Productivity Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Plant Requirements and Productivity Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Plant and equipment requirements must be planned to match programme needs while avoiding
              excessive hire costs from over-ordering. Productivity factors adjust base rates for
              site-specific conditions that affect output.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Building Services Plant</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Plant Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Hire Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scissor lift (electric)</td>
                      <td className="border border-white/10 px-3 py-2">Internal high-level work</td>
                      <td className="border border-white/10 px-3 py-2">£150-250/week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Boom lift (diesel)</td>
                      <td className="border border-white/10 px-3 py-2">External/reach-over work</td>
                      <td className="border border-white/10 px-3 py-2">£400-600/week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable pulling winch</td>
                      <td className="border border-white/10 px-3 py-2">Large cable installation</td>
                      <td className="border border-white/10 px-3 py-2">£200-350/week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hydraulic crimping tools</td>
                      <td className="border border-white/10 px-3 py-2">Cable termination</td>
                      <td className="border border-white/10 px-3 py-2">£80-120/week</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multifunction tester</td>
                      <td className="border border-white/10 px-3 py-2">Testing and commissioning</td>
                      <td className="border border-white/10 px-3 py-2">£75-100/week</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Productivity Adjustment Factors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Condition</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect on Base Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Working at floor level</td>
                      <td className="border border-white/10 px-3 py-2">1.0</td>
                      <td className="border border-white/10 px-3 py-2">Base rate applies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Stepladder access (under 3m)</td>
                      <td className="border border-white/10 px-3 py-2">0.85</td>
                      <td className="border border-white/10 px-3 py-2">15% reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MEWP access required</td>
                      <td className="border border-white/10 px-3 py-2">0.60-0.70</td>
                      <td className="border border-white/10 px-3 py-2">30-40% reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scaffold tower</td>
                      <td className="border border-white/10 px-3 py-2">0.65-0.75</td>
                      <td className="border border-white/10 px-3 py-2">25-35% reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Occupied building</td>
                      <td className="border border-white/10 px-3 py-2">0.70-0.85</td>
                      <td className="border border-white/10 px-3 py-2">15-30% reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hospital/clean room</td>
                      <td className="border border-white/10 px-3 py-2">0.50-0.70</td>
                      <td className="border border-white/10 px-3 py-2">30-50% reduction</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Confined spaces</td>
                      <td className="border border-white/10 px-3 py-2">0.50-0.65</td>
                      <td className="border border-white/10 px-3 py-2">35-50% reduction</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Adjusted Productivity Calculation</p>
              <p className="font-mono text-center text-lg mb-2">Adjusted Rate = Base Rate × Access Factor × Occupancy Factor</p>
              <p className="text-xs text-white/70 text-center">Example: 40m/day × 0.65 (MEWP) × 0.80 (occupied) = 20.8m/day</p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Planning tip:</strong> Match plant hire periods to actual need. A scissor lift needed for 3 weeks of first-fix should not be on hire for the entire project duration.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Labour Duration Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the labour duration for installing 450m of cable tray at 4m height using scissor lifts. Base productivity is 40m/day.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Base productivity: 40m/day</p>
                <p>MEWP factor: 0.65</p>
                <p className="mt-2">Adjusted productivity = 40 × 0.65 = <strong>26m/day</strong></p>
                <p className="mt-2">Duration = Quantity / Adjusted rate</p>
                <p>Duration = 450m / 26m/day = <strong>17.3 days</strong></p>
                <p className="mt-2 text-green-400">→ Allow 18 days (round up for planning)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Resource Levelling</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Week 3 shows demand for 14 electricians but only 10 are available. Activity B has 2 weeks float. How can this be resolved?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Resource conflict = 14 - 10 = 4 electricians over capacity</p>
                <p className="mt-2">Activity B requires 5 electricians</p>
                <p>Activity B has 2 weeks total float</p>
                <p className="mt-2">Solution: Delay Activity B by 1 week</p>
                <p>- Week 3 demand reduces from 14 to 9 (within capacity)</p>
                <p>- Week 4 demand increases by 5 to accommodate B</p>
                <p>- Float consumed: 1 week (1 week remaining)</p>
                <p className="mt-2 text-green-400">→ Conflict resolved within float, no programme extension</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Material Delivery Schedule</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Main LV switchgear is required on site by Week 20. Lead time is 14 weeks. When must the order be placed and what precedes it?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Required on site: Week 20</p>
                <p>Manufacturing lead time: 14 weeks</p>
                <p className="mt-2">Latest order date = Week 20 - 14 = <strong>Week 6</strong></p>
                <p className="mt-2">Prerequisites before ordering:</p>
                <p>- Design approval (allow 2-3 weeks)</p>
                <p>- Technical submittal review (allow 2 weeks)</p>
                <p className="mt-2">Design completion required by: Week 1-2</p>
                <p className="mt-2 text-green-400">→ Design must be finalised at contract start for Week 20 delivery</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Resource Planning Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Identify all activities from WBS with durations</li>
                <li className="pl-1">Assign resource requirements to each activity</li>
                <li className="pl-1">Aggregate resources by time period (histogram)</li>
                <li className="pl-1">Identify peaks exceeding availability</li>
                <li className="pl-1">Level within float where possible</li>
                <li className="pl-1">Plan overtime/additional resources for remaining conflicts</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Cable tray: <strong>35-45m/day</strong> (floor level)</li>
                <li className="pl-1">MEWP productivity impact: <strong>30-40% reduction</strong></li>
                <li className="pl-1">Switchgear lead time: <strong>12-16 weeks</strong></li>
                <li className="pl-1">Generator lead time: <strong>16-26 weeks</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Using unadjusted productivity rates</strong> — Always factor in access and conditions</li>
                <li className="pl-1"><strong>Ignoring long lead items</strong> — Order immediately after contract award</li>
                <li className="pl-1"><strong>Over-manning without benefit</strong> — More workers do not always mean faster completion</li>
                <li className="pl-1"><strong>Late levelling</strong> — Level early when float is available</li>
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
                <p className="font-medium text-white mb-1">Labour Planning</p>
                <ul className="space-y-0.5">
                  <li>Duration = Quantity / Productivity rate</li>
                  <li>Adjust for access and occupancy factors</li>
                  <li>Build histograms by time period</li>
                  <li>Level within float first</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Procurement Planning</p>
                <ul className="space-y-0.5">
                  <li>Identify long lead items at tender</li>
                  <li>Order switchgear at contract award</li>
                  <li>Use call-off for standard materials</li>
                  <li>JIT for congested sites</li>
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
            <Link to="../h-n-c-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section1-5">
              Next: Risk Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section1_4;
