import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safe Access and Work at Height - MOET Module 1.1.4";
const DESCRIPTION = "Comprehensive guide to the Work at Height Regulations 2005 for electrical maintenance technicians: hierarchy of controls, access equipment, inspection requirements, harness systems, rescue plans and electrical-specific height work.";

const quickCheckQuestions = [
  {
    id: "wah-hierarchy",
    question: "Under the Work at Height Regulations 2005, what is the FIRST step in the hierarchy of controls for working at height?",
    options: [
      "Use a safety harness to prevent falls",
      "Erect scaffolding around the work area",
      "Avoid working at height altogether where it is reasonably practicable to do so",
      "Place crash mats below the work area to mitigate falls"
    ],
    correctIndex: 2,
    explanation: "The Work at Height Regulations 2005 establish a clear hierarchy: (1) Avoid working at height where reasonably practicable; (2) Prevent falls using guardrails, platforms, or scaffolds; (3) Mitigate the consequences of falls using nets, airbags, or harnesses. You must always start at the top of the hierarchy and only move to the next level when the higher level is not reasonably practicable."
  },
  {
    id: "ladder-use",
    question: "Under the Work at Height Regulations 2005, when is it acceptable to use a ladder for maintenance work?",
    options: [
      "At any time, as ladders are always the safest option",
      "Only when the task is of short duration, low risk, and the site conditions are suitable",
      "Only when the maintenance manager gives verbal approval",
      "Whenever scaffolding is not available on site"
    ],
    correctIndex: 1,
    explanation: "The Regulations permit ladder use only where a risk assessment shows the task is of short duration (minutes, not hours), the risk is low, and conditions at the site are suitable (firm, level base, protection from vehicle impact, weather conditions acceptable). Ladders must never be the default choice — they are a last resort when higher-level controls are not reasonably practicable."
  },
  {
    id: "fragile-surface",
    question: "What is a 'fragile surface' in the context of work at height?",
    options: [
      "Any surface that is wet or slippery",
      "A surface that would be liable to fail if a person's weight were to be applied to it",
      "A surface that has been damaged by weather",
      "Any surface above 2 metres from ground level"
    ],
    correctIndex: 1,
    explanation: "A fragile surface is one that would be liable to fail if any person's weight (including the weight of anything they are carrying) were applied to it. Common examples include fibre-cement roof sheets, rooflights, skylights, liner panels, and corroded metal decking. Falls through fragile surfaces are one of the leading causes of fatal falls from height in the UK."
  },
  {
    id: "rescue-plan",
    question: "When must a rescue plan be in place for work at height?",
    options: [
      "Only when working above 10 metres",
      "Only when using rope access systems",
      "Before any work at height begins, as required by the Work at Height Regulations",
      "Only when the HSE is expected to inspect the site"
    ],
    correctIndex: 2,
    explanation: "Regulation 4 of the Work at Height Regulations 2005 requires that emergency rescue procedures are in place before any work at height begins. This applies regardless of the height, equipment used, or duration of the task. A person suspended in a harness after a fall can suffer suspension trauma (harness hang syndrome) within minutes — rescue must be rapid."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Falls from height are consistently one of the leading causes of workplace fatalities in the UK. On average, how many workers die from falls each year?",
    options: [
      "Around 5 per year",
      "Around 20-30 per year",
      "Around 35-40 per year",
      "Over 100 per year"
    ],
    correctAnswer: 2,
    explanation: "HSE statistics consistently show that falls from height account for approximately 35-40 workplace fatalities per year in the UK, making it one of the top causes of death at work. Many hundreds more suffer life-changing injuries. The Work at Height Regulations 2005 were introduced specifically to address this unacceptable toll."
  },
  {
    id: 2,
    question: "The Work at Height Regulations 2005 define 'work at height' as:",
    options: [
      "Any work carried out above 2 metres from ground level",
      "Any work where a person could fall a distance liable to cause personal injury, regardless of height",
      "Only work on roofs and scaffolds",
      "Work on ladders above 3 metres"
    ],
    correctAnswer: 1,
    explanation: "The Regulations define work at height as work in any place where a person could fall a distance liable to cause personal injury. This includes working on a ladder, on a flat roof with no edge protection, on a scaffold, near an open edge, or even at ground level near an excavation. There is no minimum height threshold — a fall from a stepladder can be fatal."
  },
  {
    id: 3,
    question: "Which of the following is the correct hierarchy of controls for work at height?",
    options: [
      "Mitigate falls, prevent falls, avoid working at height",
      "Avoid working at height, mitigate falls, prevent falls",
      "Avoid working at height, prevent falls, mitigate falls",
      "Prevent falls, avoid working at height, mitigate falls"
    ],
    correctAnswer: 2,
    explanation: "The hierarchy is: (1) AVOID working at height where reasonably practicable; (2) PREVENT falls using guardrails, scaffolds, or platforms when height work cannot be avoided; (3) MITIGATE the consequences of falls using nets, airbags, or personal fall protection when falls cannot be prevented. This follows the general principles of prevention in Schedule 1 of the Management of Health and Safety at Work Regulations 1999."
  },
  {
    id: 4,
    question: "A podium step is preferable to a stepladder for electrical maintenance because:",
    options: [
      "It is lighter and easier to carry",
      "It provides a stable, guarded platform allowing two-handed working at height",
      "It does not count as work at height",
      "It is cheaper to hire"
    ],
    correctAnswer: 1,
    explanation: "A podium step provides a full platform with guardrails on all sides, allowing the worker to stand comfortably and work with both hands free. This is critical for electrical maintenance tasks such as installing cable tray, terminating luminaires, or working in ceiling voids — tasks that require two hands and sustained time at height. A stepladder provides no guardrails and limits the worker to short-duration, one-handed tasks."
  },
  {
    id: 5,
    question: "Before using a ladder on site, the pre-use inspection must check for:",
    options: [
      "The manufacturer's logo only",
      "Stiles for cracks/bends, rungs for damage/security, feet for wear/grip, and overall condition",
      "The ladder's colour and age",
      "Only that it reaches the required height"
    ],
    correctAnswer: 1,
    explanation: "Pre-use inspection must check: stiles for cracks, splits, bends, or corrosion; rungs for damage, looseness, or contamination; feet for wear and grip condition; locking mechanisms (for stepladders) for proper function; and overall condition including labels and markings. Any defect means the ladder must be taken out of service immediately."
  },
  {
    id: 6,
    question: "A Mobile Elevating Work Platform (MEWP) must be operated by:",
    options: [
      "Any worker who has read the user manual",
      "A person who holds a current IPAF or equivalent operator licence for the specific MEWP category",
      "Only the site manager",
      "Anyone over the age of 18"
    ],
    correctAnswer: 1,
    explanation: "MEWPs must be operated by persons who have received appropriate training and hold a current operator licence — typically IPAF (International Powered Access Federation) certification for the specific category of MEWP being used (e.g., Category 3a for scissor lifts, 3b for boom lifts). Operating a MEWP without proper training is both dangerous and a breach of the Work at Height Regulations."
  },
  {
    id: 7,
    question: "When installing cable tray at height, what is the preferred access equipment?",
    options: [
      "A ladder leaned against the wall",
      "A scaffold, tower scaffold, or MEWP that provides a stable working platform with edge protection",
      "Standing on a table or desk",
      "A colleague's shoulders"
    ],
    correctAnswer: 1,
    explanation: "Cable tray installation requires sustained work at height with both hands, often carrying heavy materials. This demands a stable working platform with edge protection — a scaffold, tower scaffold, or MEWP. Ladders are not suitable because the task is not short duration, requires two-handed working, and involves carrying materials."
  },
  {
    id: 8,
    question: "What is 'suspension trauma' (harness hang syndrome)?",
    options: [
      "Damage to the harness caused by UV exposure",
      "A life-threatening condition caused by prolonged suspension in a safety harness after a fall",
      "The discomfort of wearing a harness for an extended period",
      "A psychological fear of heights"
    ],
    correctAnswer: 1,
    explanation: "Suspension trauma (harness hang syndrome) occurs when a person is suspended motionless in a harness after a fall. The leg straps restrict blood flow, causing blood to pool in the legs. This can lead to renal failure, cardiac arrest, and death — potentially within 15-30 minutes. This is why rapid rescue is essential, and every harness user must have a rescue plan in place before starting work."
  },
  {
    id: 9,
    question: "An exclusion zone below work at height is required to:",
    options: [
      "Prevent unauthorised access to the building",
      "Protect people below from falling objects, tools, and materials",
      "Keep the work area tidy",
      "Prevent noise disturbance to nearby offices"
    ],
    correctAnswer: 1,
    explanation: "An exclusion zone (also called a drop zone) must be established below any work at height to protect people from falling objects, tools, and materials. The zone must be clearly marked with barriers and warning signs. Tool lanyards, toe boards on scaffolds, and covered walkways are additional controls to prevent objects from falling."
  },
  {
    id: 10,
    question: "How often must scaffolding be formally inspected under the Work at Height Regulations?",
    options: [
      "Only when first erected",
      "Before first use, at intervals not exceeding 7 days, and after any event that could affect stability",
      "Monthly by the scaffold contractor",
      "Annually by an independent inspector"
    ],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations 2005 (Schedule 7) require scaffolding to be inspected: before first use; at intervals not exceeding 7 days thereafter; and after any event liable to affect stability (such as high winds, collision, or modification). Each inspection must be recorded, and the scaffold must not be used if any defects are found."
  },
  {
    id: 11,
    question: "When working near overhead busbars or busbar trunking at height, what additional electrical hazard must be considered?",
    options: [
      "The colour of the busbar insulation",
      "Proximity to live conductors — which could cause electrocution or arc flash even without direct contact",
      "The weight of the busbars",
      "The temperature of the room"
    ],
    correctAnswer: 1,
    explanation: "Overhead busbars may be energised and present a risk of electrocution through direct contact or arc flash from proximity. At high voltages, flashover can occur across an air gap without physical contact. Before working near busbars at height, the busbars must be confirmed as isolated and proved dead, or suitable barriers and exclusion distances must be established and maintained."
  },
  {
    id: 12,
    question: "A tower scaffold must not be used outdoors in wind speeds exceeding:",
    options: [
      "Any wind at all",
      "Approximately 17 mph (force 4 on the Beaufort scale) for standard lightweight towers",
      "50 mph",
      "There is no wind speed limit for scaffolding"
    ],
    correctAnswer: 1,
    explanation: "Standard lightweight aluminium tower scaffolds should not be used in wind speeds exceeding approximately 17 mph (force 4 — moderate breeze). At higher wind speeds, the tower becomes unstable and could overturn. Sheeted or enclosed scaffolds have even lower wind speed limits. Always check the manufacturer's guidance and monitor weather conditions throughout the work."
  }
];

const faqs = [
  {
    question: "At what height do the Work at Height Regulations apply?",
    answer: "There is no minimum height threshold. The Work at Height Regulations 2005 apply to all work where a person could fall a distance liable to cause personal injury. A fall from a stepladder at 1 metre can cause serious head injuries or fractures. Even working at ground level near an open trench or excavation is 'work at height' under the Regulations."
  },
  {
    question: "Can I use a ladder for electrical maintenance work?",
    answer: "Ladders should only be used when a risk assessment confirms the task is of short duration (typically minutes, not hours), the risk is low, and site conditions are suitable. For most electrical maintenance tasks — cable tray installation, luminaire replacement, cable containment work — the duration and need for two-handed working means a scaffold, tower scaffold, podium step, or MEWP is more appropriate. Ladders are a last resort, not a default choice."
  },
  {
    question: "Do I need harness training to use a safety harness?",
    answer: "Yes. The Work at Height Regulations require that anyone using personal fall protection equipment, including harnesses, must be trained and competent in its correct fitting, use, limitations, and inspection. Training must also cover rescue procedures. Using a harness incorrectly — for example, connecting to an inadequate anchor point or using an incompatible lanyard — can be as dangerous as not wearing one at all."
  },
  {
    question: "What is the difference between a safety net and a safety harness?",
    answer: "Safety nets are collective fall protection — they protect everyone in the area below and require no action from individual workers. They catch falling persons and arrest their fall. Safety harnesses are personal fall protection — each worker must be individually equipped, trained, and connected to an anchor point. The hierarchy of controls generally favours collective protection (nets) over personal protection (harnesses) because collective measures do not rely on individual compliance."
  },
  {
    question: "Who can erect a tower scaffold?",
    answer: "Tower scaffolds must be erected, altered, and dismantled by persons who have received appropriate training. The industry standard is the PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) training course, which covers safe erection, use, and dismantling of mobile access towers. The tower must be erected in accordance with the manufacturer's instruction manual and inspected before use."
  }
];

const MOETModule1Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1">
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
            <Shield className="h-4 w-4" />
            <span>Module 1.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Access and Work at Height
          </h1>
          <p className="text-white/80">
            Preventing falls and managing access equipment for electrical maintenance at height
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Hierarchy:</strong> Avoid &gt; Prevent falls &gt; Mitigate consequences</li>
              <li className="pl-1"><strong>Law:</strong> Work at Height Regulations 2005 — no minimum height threshold</li>
              <li className="pl-1"><strong>Equipment:</strong> Scaffolds, MEWPs, podium steps preferred over ladders</li>
              <li className="pl-1"><strong>Rescue:</strong> Must be planned BEFORE any work at height begins</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Cable tray:</strong> Often at 3-4m — requires scaffold or MEWP, not ladders</li>
              <li className="pl-1"><strong>Busbars:</strong> Proximity to live conductors adds electrocution/arc flash risk</li>
              <li className="pl-1"><strong>Lighting:</strong> Luminaire maintenance often involves ceiling access</li>
              <li className="pl-1"><strong>ST1426:</strong> Safe access and work at height is a core KSB</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "State the requirements of the Work at Height Regulations 2005",
              "Apply the hierarchy of controls: avoid, prevent, mitigate",
              "Select appropriate access equipment for electrical maintenance tasks",
              "Describe inspection requirements for ladders, scaffolds, and MEWPs",
              "Explain the risks of fragile surfaces, falling objects, and suspension trauma",
              "Plan rescue arrangements and apply height-work controls to electrical tasks"
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

        {/* Section 01: The Work at Height Regulations 2005 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Work at Height Regulations 2005
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Falls from height are consistently one of the biggest single causes of workplace fatalities
              in the UK. HSE data shows that approximately 35-40 workers die each year from falls, with
              many hundreds more suffering life-changing injuries — spinal fractures, traumatic brain
              injuries, and permanent disability. The Work at Height Regulations 2005 were introduced to
              provide a comprehensive legal framework for managing this risk.
            </p>
            <p>
              For electrical maintenance technicians, work at height is a routine part of the job. Cable
              tray runs at 3-4 metres, luminaire replacement, overhead busbar maintenance, cable
              containment installation, and access to plant rooms on mezzanines or rooftops all involve
              working at height. Understanding the Regulations and selecting the right equipment is not
              optional — it is a legal duty and a daily survival skill.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Key Statistic</p>
              <p className="text-sm text-white">
                Falls from height account for approximately 25% of all workplace fatalities in the UK
                each year. Over 30% of these fatal falls are from a height of less than 2 metres. A fall
                from a stepladder onto a concrete floor can cause a fatal head injury. There is no 'safe'
                height from which to fall.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Key Requirements of the Regulations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Regulation 4:</strong> Every employer must ensure work at height is properly planned, appropriately supervised, and carried out safely. This includes planning for emergencies and rescue.</li>
                <li className="pl-1"><strong>Regulation 6:</strong> Apply the hierarchy — avoid work at height; where it cannot be avoided, prevent falls; where falls cannot be prevented, mitigate consequences.</li>
                <li className="pl-1"><strong>Regulation 7:</strong> Select work equipment appropriate to the task, considering the working conditions, distance and consequences of a fall, duration and frequency of use, and ease of rescue.</li>
                <li className="pl-1"><strong>Regulation 8:</strong> Particular requirements for specific types of equipment — guardrails, working platforms, personal fall protection, ladders.</li>
                <li className="pl-1"><strong>Regulation 9:</strong> Specific requirements for fragile surfaces — no one shall pass near or work on a fragile surface unless it is necessary and safe means of support are provided.</li>
                <li className="pl-1"><strong>Regulation 10:</strong> Protect people from falling objects — toe boards, brick guards, fans, exclusion zones, tool lanyards.</li>
                <li className="pl-1"><strong>Regulation 12:</strong> All work at height equipment must be inspected at suitable intervals, by a competent person, and inspection records retained.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
              <p className="text-sm font-medium text-elec-yellow mb-2">The Hierarchy of Controls</p>
              <div className="space-y-2 mt-3">
                <div className="flex items-start gap-3 p-3 rounded bg-green-500/10 border border-green-500/20">
                  <span className="text-green-400 font-bold text-lg">1</span>
                  <div>
                    <p className="text-sm font-medium text-green-400">AVOID working at height</p>
                    <p className="text-xs text-white/80">Can the work be done from ground level? Use extendable tools, ground-level assembly, prefabrication, or redesign the task to eliminate height work entirely.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded bg-amber-500/10 border border-amber-500/20">
                  <span className="text-amber-400 font-bold text-lg">2</span>
                  <div>
                    <p className="text-sm font-medium text-amber-400">PREVENT falls</p>
                    <p className="text-xs text-white/80">Use collective protection: guardrails, scaffolds, working platforms, MEWPs. These prevent the fall from happening and protect everyone in the area.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded bg-red-500/10 border border-red-500/20">
                  <span className="text-red-400 font-bold text-lg">3</span>
                  <div>
                    <p className="text-sm font-medium text-red-400">MITIGATE the consequences</p>
                    <p className="text-xs text-white/80">Use personal fall protection: safety harnesses and lanyards, safety nets, airbags, soft-landing systems. These reduce injury severity after a fall occurs.</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> You must always start at the top of the hierarchy. Only move to
              the next level when you can demonstrate that the higher level is not reasonably practicable.
              A risk assessment must document this decision.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Access Equipment for Electrical Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Access Equipment for Electrical Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the right access equipment is one of the most important decisions in planning
              work at height. The choice depends on the nature of the task, its duration, the working
              environment, the load to be carried, and the number of workers involved. For electrical
              maintenance, the need for two-handed working and carrying materials and tools makes
              platform-based solutions preferable in most situations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Access Equipment Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Limitations</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Training</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Podium Steps</td>
                      <td className="border border-white/10 px-3 py-2">Light tasks up to ~3m, two-handed work, luminaire replacement</td>
                      <td className="border border-white/10 px-3 py-2">Limited height range, not for heavy materials</td>
                      <td className="border border-white/10 px-3 py-2">User familiarisation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Tower Scaffold</td>
                      <td className="border border-white/10 px-3 py-2">Sustained work at height, cable tray, containment runs</td>
                      <td className="border border-white/10 px-3 py-2">Assembly time, floor space, wind limits (~17mph)</td>
                      <td className="border border-white/10 px-3 py-2">PASMA trained</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Fixed Scaffold</td>
                      <td className="border border-white/10 px-3 py-2">Large-scale, long-duration work — cable risers, busbar runs</td>
                      <td className="border border-white/10 px-3 py-2">Cost, lead time, requires scaffold contractor</td>
                      <td className="border border-white/10 px-3 py-2">CISRS scaffolders erect; users need awareness</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Scissor Lift (MEWP)</td>
                      <td className="border border-white/10 px-3 py-2">Medium-to-high work, firm flat floors, warehouse lighting</td>
                      <td className="border border-white/10 px-3 py-2">Floor loading, headroom, level surface only</td>
                      <td className="border border-white/10 px-3 py-2">IPAF Category 3a</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Boom Lift (MEWP)</td>
                      <td className="border border-white/10 px-3 py-2">High reach, obstacles, outdoor work, overhead lines</td>
                      <td className="border border-white/10 px-3 py-2">Ground conditions, wind, outrigger space</td>
                      <td className="border border-white/10 px-3 py-2">IPAF Category 3b</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Stepladder</td>
                      <td className="border border-white/10 px-3 py-2">Very short duration, low risk, light inspection tasks only</td>
                      <td className="border border-white/10 px-3 py-2">No guardrails, one-hand working, fatigue</td>
                      <td className="border border-white/10 px-3 py-2">User training</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">Leaning Ladder</td>
                      <td className="border border-white/10 px-3 py-2">Access only (getting onto/off a platform), not as a workstation</td>
                      <td className="border border-white/10 px-3 py-2">Last resort; strict conditions; no sustained work</td>
                      <td className="border border-white/10 px-3 py-2">User training + supervision</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Ladder Safety — When Ladders Are Permitted</h3>
              <p className="text-sm text-white mb-3">
                The Work at Height Regulations do not ban ladders, but they restrict their use to situations
                where a risk assessment justifies them. Ladders are only acceptable when:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Short duration:</strong> The task takes minutes, not hours. If you need to be up there for more than 15-30 minutes, use a platform.</li>
                <li className="pl-1"><strong>Low risk:</strong> The task is simple and does not involve carrying heavy materials, using power tools, or working near open edges.</li>
                <li className="pl-1"><strong>Three points of contact:</strong> The worker can maintain three points of contact (two hands and one foot, or two feet and one hand) at all times.</li>
                <li className="pl-1"><strong>Secure base:</strong> The ladder is placed on a firm, level surface, at the correct angle (1:4 ratio for leaning ladders), and secured to prevent slipping.</li>
                <li className="pl-1"><strong>Not near live equipment:</strong> Metal ladders must never be used near live electrical equipment. Fibreglass or timber ladders are preferred for electrical work.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Inspection Requirements</h3>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Pre-Use Check</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formal Inspection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Record Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ladders/Stepladders</td>
                      <td className="border border-white/10 px-3 py-2">Before every use</td>
                      <td className="border border-white/10 px-3 py-2">Regular intervals (condition-based)</td>
                      <td className="border border-white/10 px-3 py-2">Asset register recommended</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Tower Scaffold</td>
                      <td className="border border-white/10 px-3 py-2">After erection, before use</td>
                      <td className="border border-white/10 px-3 py-2">Every 7 days and after any event affecting stability</td>
                      <td className="border border-white/10 px-3 py-2">Yes — written record</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fixed Scaffold</td>
                      <td className="border border-white/10 px-3 py-2">Before first use</td>
                      <td className="border border-white/10 px-3 py-2">Every 7 days, after modification or adverse weather</td>
                      <td className="border border-white/10 px-3 py-2">Yes — scaffold inspection register</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MEWP</td>
                      <td className="border border-white/10 px-3 py-2">Daily pre-start checks by operator</td>
                      <td className="border border-white/10 px-3 py-2">LOLER thorough examination every 6 months</td>
                      <td className="border border-white/10 px-3 py-2">Yes — LOLER report</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Safety Harness</td>
                      <td className="border border-white/10 px-3 py-2">Before every use (visual + tactile)</td>
                      <td className="border border-white/10 px-3 py-2">Every 6-12 months by a competent person</td>
                      <td className="border border-white/10 px-3 py-2">Yes — harness inspection register</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A pre-use check is YOUR responsibility. Even if the equipment
              passed a formal inspection last week, you must check it before each use. Conditions change,
              damage can occur between inspections, and you are the last line of defence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Fragile Surfaces, Falling Objects and Exclusion Zones */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Fragile Surfaces, Falling Objects and Exclusion Zones
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Two of the most dangerous aspects of work at height are fragile surfaces and falling objects.
              Falls through fragile roofing materials account for a significant proportion of fatal falls,
              and objects dropped from height can cause serious or fatal injuries to people below. Electrical
              maintenance technicians frequently encounter both hazards — accessing plant rooms on rooftops,
              working in ceiling voids, and carrying tools and materials at height.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-3">Fragile Surfaces — A Hidden Killer</p>
              <p className="text-sm text-white mb-3">
                A fragile surface is any surface that would be liable to fail if a person's weight were applied
                to it. Falls through fragile surfaces cause approximately 5-7 deaths and many serious injuries
                each year in the UK. The danger is that many fragile surfaces appear solid — until the moment
                they collapse.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <div className="p-3 rounded bg-black/30">
                  <p className="text-xs font-medium text-red-400 mb-1">Common Fragile Materials</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Fibre-cement roof sheets (including asbestos cement)</li>
                    <li>Rooflights (GRP, polycarbonate, glass)</li>
                    <li>Liner panels on built-up metal roofs</li>
                    <li>Corroded metal decking</li>
                    <li>Chipboard or plywood ceiling panels</li>
                    <li>Glass skylights and atriums</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-black/30">
                  <p className="text-xs font-medium text-red-400 mb-1">Electrical Maintenance Scenarios</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Accessing rooftop plant rooms — crossing fragile roofing</li>
                    <li>Working in ceiling voids — stepping off joists onto tiles</li>
                    <li>Rooftop PV installations — walking on fragile rooflights</li>
                    <li>Lightning protection — testing on industrial roofs</li>
                    <li>Exterior lighting maintenance — accessing canopy roofs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Controls for Fragile Surfaces</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Avoid:</strong> Can the work be done without going on or near the fragile surface? Use MEWPs to access from below, or extend equipment reach from a safe position.</li>
                <li className="pl-1"><strong>Warning signs:</strong> All fragile surfaces must be clearly marked with warning signs visible to anyone who might approach them.</li>
                <li className="pl-1"><strong>Barriers:</strong> Physical barriers must prevent anyone from accidentally walking onto a fragile surface. A sign alone is not sufficient.</li>
                <li className="pl-1"><strong>Crawling boards:</strong> If work on or near a fragile surface is unavoidable, use crawling boards or staging that spreads the load and provides a safe working surface.</li>
                <li className="pl-1"><strong>Safety nets:</strong> Where there is a risk of falling through, safety nets should be installed below the fragile surface to arrest falls.</li>
                <li className="pl-1"><strong>Assume fragile:</strong> If you cannot confirm a surface is not fragile, treat it as fragile. This applies particularly to older industrial roofs where materials may have deteriorated.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Falling Object Protection</h3>
              <p className="text-sm text-white mb-3">
                Regulation 10 of the Work at Height Regulations requires that steps are taken to prevent
                objects falling from height and to protect people from being struck by falling objects.
                For electrical maintenance, dropped tools, cable offcuts, fixings, and equipment are common
                falling object hazards.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Prevent Objects Falling</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Tool lanyards — attach tools to harness or platform</li>
                    <li>Toe boards on scaffolds (minimum 150mm high)</li>
                    <li>Brick guards or mesh panels on scaffold edges</li>
                    <li>Enclosed tool buckets for raising/lowering tools</li>
                    <li>Debris netting on scaffold exterior</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-2">Protect People Below</p>
                  <ul className="text-xs text-white/80 space-y-1 list-disc list-outside ml-4">
                    <li>Exclusion zones — barriered areas below the work</li>
                    <li>Covered walkways — tunnel protection for pedestrians</li>
                    <li>Hard hats for all persons in the area</li>
                    <li>Warning signs — 'Danger: overhead work in progress'</li>
                    <li>Banksmen to manage pedestrian traffic</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Always set up your exclusion zone BEFORE starting work at
              height, not after. Use cones, barrier tape, and signs to mark the area. Brief any other
              workers in the vicinity. A dropped ratchet spanner from 4 metres can cause a fatal head injury.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Harness Systems and Rescue Planning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Harness Systems and Rescue Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Personal fall protection — safety harnesses, lanyards, and anchor systems — sits at the
              bottom of the hierarchy of controls. It should only be used when collective protection
              (guardrails, platforms) is not reasonably practicable. However, there are electrical
              maintenance scenarios where harness use is necessary: working from boom lifts, accessing
              unprotected edges during building services installation, and rope access for specialist work.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Components of a Personal Fall Protection System</h3>
              <div className="space-y-3">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">Full Body Harness</p>
                  <p className="text-xs text-white/80">
                    Distributes fall arrest forces across the thighs, pelvis, chest, and shoulders. Must
                    be correctly sized and adjusted to the individual wearer. The dorsal (back) D-ring is
                    the primary fall arrest attachment point. Front (sternal) D-rings are used for work
                    positioning. Side D-rings are used for work restraint.
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">Connecting Lanyards</p>
                  <p className="text-xs text-white/80">
                    The link between the harness and the anchor point. Types include: shock-absorbing
                    lanyards (energy absorber deploys to limit fall arrest forces to 6kN maximum),
                    retractable fall arresters (self-retracting lifelines), and work-positioning lanyards
                    (adjustable, for maintaining position rather than arresting falls).
                  </p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">Anchor Points</p>
                  <p className="text-xs text-white/80">
                    Must be capable of withstanding the forces generated during fall arrest — typically
                    rated at 12kN for a single person. Types include: permanent roof anchors, structural
                    steelwork clamps, anchor slings around beams, and horizontal lifelines. The anchor
                    must be at or above the level of the D-ring to minimise free-fall distance.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <h3 className="text-sm font-medium text-red-400 mb-3">Suspension Trauma — The Urgent Rescue Requirement</h3>
              <p className="text-sm text-white mb-3">
                Suspension trauma (also called harness hang syndrome or orthostatic intolerance) is a
                life-threatening condition that can occur when a person is suspended motionless in a
                harness after a fall. The leg straps compress the femoral veins, reducing blood return to
                the heart. Blood pools in the legs, leading to:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">Loss of consciousness within 5-15 minutes</li>
                <li className="pl-1">Renal failure from toxin buildup in pooled blood</li>
                <li className="pl-1">Cardiac arrest — potentially within 15-30 minutes</li>
                <li className="pl-1">'Rescue death' — if rescued incorrectly, sudden release of pooled blood can cause fatal cardiac overload</li>
              </ul>
              <p className="text-sm text-white mt-3">
                <strong>This is why rescue planning is not optional.</strong> Every person using a harness
                must have a rescue plan that can recover them within minutes, not hours. Calling the fire
                brigade is not a rescue plan — response times are typically 10-20 minutes.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Rescue Plan Requirements</h3>
              <p className="text-sm text-white mb-3">
                Regulation 4 of the Work at Height Regulations requires that rescue arrangements are in
                place before any work at height begins. A rescue plan must address:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Method:</strong> How will the person be rescued? Self-rescue devices, rescue from above (winch systems), rescue from below (MEWP), or assisted descent?</li>
                <li className="pl-1"><strong>Equipment:</strong> Is rescue equipment immediately available, not stored in a distant location? Is it compatible with the harness and anchor system?</li>
                <li className="pl-1"><strong>Competence:</strong> Are the designated rescuers trained and practised in the rescue method? When did they last practise?</li>
                <li className="pl-1"><strong>Time:</strong> Can rescue be achieved within a safe timeframe (ideally less than 10 minutes)?</li>
                <li className="pl-1"><strong>Communication:</strong> How will a fall be detected and the alarm raised? Is there constant visual or radio contact?</li>
                <li className="pl-1"><strong>First aid:</strong> Is a trained first aider available who understands the specific risks of suspension trauma?</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Harness Pre-Use Inspection Checklist</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Webbing — cuts, fraying, abrasion, chemical damage</li>
                  <li className="pl-1">Stitching — intact, no pulled or broken threads</li>
                  <li className="pl-1">D-rings — no deformation, corrosion, or sharp edges</li>
                  <li className="pl-1">Buckles — function correctly, no distortion</li>
                </ul>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Labels — legible, within service life</li>
                  <li className="pl-1">Energy absorber — not deployed (check indicator)</li>
                  <li className="pl-1">Connectors — gates close and lock properly</li>
                  <li className="pl-1">Previous fall arrest — remove from service</li>
                </ul>
              </div>
              <p className="text-xs text-white/60 mt-3">
                Any harness that has arrested a fall must be immediately removed from service and returned
                to the manufacturer or a competent person for inspection. Internal damage may not be visible.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Electrical-Specific Work at Height */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Electrical-Specific Work at Height
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical maintenance technicians face a unique combination of hazards when working at
              height: the fall risk is compounded by electrical hazards. A worker who receives an electric
              shock at height is likely to fall as well — the involuntary muscular contraction caused by
              the shock can throw them from a ladder or cause them to lose grip on a platform edge.
              Planning must address both hazards simultaneously.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-blue-400 mb-3">Cable Tray and Containment at Height</h3>
                <p className="text-sm text-white mb-3">
                  Cable tray and basket installation is one of the most common height tasks for electrical
                  maintenance technicians. Runs are typically at 3-4 metres, requiring sustained two-handed
                  work while carrying heavy materials.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Preferred access:</strong> Tower scaffold or MEWP — provides a stable platform with edge protection</li>
                  <li className="pl-1"><strong>Not acceptable:</strong> Ladders — the task duration, two-handed work, and material handling rule out ladder use</li>
                  <li className="pl-1"><strong>Isolation:</strong> If working near existing live cables, isolate and prove dead before disturbing containment</li>
                  <li className="pl-1"><strong>Manual handling:</strong> Cable tray sections are heavy and awkward — plan lifting and passing sequences</li>
                  <li className="pl-1"><strong>Tool management:</strong> Use tool lanyards and bucket hoists — do not carry loose tools up scaffolds</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-purple-400 mb-3">Overhead Busbars and Busbar Trunking</h3>
                <p className="text-sm text-white mb-3">
                  Working near overhead busbars combines height and electrical hazards in a particularly
                  dangerous way. Even without direct contact, arc flash from proximity to energised busbars
                  can cause severe burns.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Isolation:</strong> Busbars must be isolated and proved dead before any work within the exclusion distance</li>
                  <li className="pl-1"><strong>Exclusion distance:</strong> Maintain safe clearance from energised conductors — consult BS EN 50110 for minimum distances</li>
                  <li className="pl-1"><strong>Permit to work:</strong> Work near HV busbars typically requires a formal permit to work</li>
                  <li className="pl-1"><strong>Access equipment:</strong> Use non-conductive (fibreglass) access equipment where possible</li>
                  <li className="pl-1"><strong>Arc flash PPE:</strong> Where isolation is not possible, appropriate arc-rated PPE must be worn</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-green-400 mb-3">Lighting Maintenance at Height</h3>
                <p className="text-sm text-white mb-3">
                  Luminaire replacement, relamping, and emergency lighting testing frequently involve work
                  at height. The range of installations — from office suspended ceilings to warehouse
                  high-bay lighting at 10+ metres — demands different access solutions.
                </p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Office/retail:</strong> Podium steps (up to ~3m) or tower scaffold for sustained work</li>
                  <li className="pl-1"><strong>Warehouse/industrial:</strong> Scissor lift or boom lift for high-bay fixtures</li>
                  <li className="pl-1"><strong>Outdoor:</strong> MEWP (boom lift) for column-mounted or building-mounted luminaires</li>
                  <li className="pl-1"><strong>Isolation:</strong> Always isolate the lighting circuit before accessing luminaires — even for 'just changing a lamp'</li>
                  <li className="pl-1"><strong>Ceiling voids:</strong> Check load-bearing capacity before entering; use crawling boards; identify fragile surfaces</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <h3 className="text-sm font-medium text-orange-400 mb-3">Combined Risk: Shock + Fall</h3>
              <p className="text-sm text-white">
                When planning electrical work at height, always consider the combined scenario: what happens
                if the worker receives an electric shock while at height? An involuntary muscular reaction can
                throw a person off a ladder, over a platform edge, or cause them to drop tools. The safe
                isolation procedure must be completed BEFORE ascending to the work position. Never assume
                a circuit is dead just because the switch is off — follow the full Prove-Test-Prove sequence
                at the point of work. Where this is not possible from the access equipment (e.g., the
                isolation point is at ground level but the work is at 4 metres), ensure the isolation is
                verified and secured with personal locks before ascending.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Weather Considerations</h3>
              <p className="text-sm text-white mb-3">
                Weather conditions significantly affect the safety of work at height. For electrical
                maintenance, the following conditions require work to be postponed or additional controls
                to be implemented:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Wind:</strong> Tower scaffolds ~17mph max; MEWPs have specific limits</li>
                  <li className="pl-1"><strong>Rain/ice:</strong> Slippery surfaces, reduced grip, visibility</li>
                  <li className="pl-1"><strong>Lightning:</strong> Stop all outdoor height work immediately</li>
                </ul>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Temperature:</strong> Cold reduces dexterity; heat causes fatigue</li>
                  <li className="pl-1"><strong>Low light:</strong> Ensure adequate task lighting at height</li>
                  <li className="pl-1"><strong>UV exposure:</strong> Sun protection for prolonged rooftop work</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 link:</strong> The Maintenance and Operations Engineering Technician standard
              requires you to demonstrate competence in selecting and using access equipment, understanding
              work at height regulations, and conducting risk assessments for height work. This is a core
              knowledge and skills requirement assessed during your End-Point Assessment.
            </p>
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
                <p className="font-medium text-white mb-1">Hierarchy of Controls</p>
                <ul className="space-y-0.5">
                  <li>1. AVOID — work from ground level where possible</li>
                  <li>2. PREVENT — guardrails, scaffolds, platforms, MEWPs</li>
                  <li>3. MITIGATE — harnesses, nets, airbags</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Inspection Frequencies</p>
                <ul className="space-y-0.5">
                  <li>Ladders — before every use + regular formal</li>
                  <li>Tower scaffold — after erection + every 7 days</li>
                  <li>MEWP — daily pre-start + 6-monthly LOLER</li>
                  <li>Harness — before every use + 6-12 monthly formal</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Training Requirements</p>
                <ul className="space-y-0.5">
                  <li>Tower scaffold — PASMA certification</li>
                  <li>MEWP — IPAF Category 3a/3b</li>
                  <li>Harness — harness user training + rescue</li>
                  <li>All users — awareness of WAHR 2005</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Legislation</p>
                <ul className="space-y-0.5">
                  <li>Work at Height Regulations 2005</li>
                  <li>LOLER 1998 — MEWPs, hoists, lifting equipment</li>
                  <li>PUWER 1998 — all work equipment</li>
                  <li>CDM 2015 — construction-specific duties</li>
                  <li>BS 7671:2018+A3:2024 — electrical safety</li>
                </ul>
              </div>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Lock-Out / Tag-Out
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module1-section1-5">
              Next: Confined Spaces
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule1Section1_4;
