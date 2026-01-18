/**
 * Level 3 Module 1 Section 4.2 - Working at Height
 *
 * Covers scaffolds, ladders, MEWPs and working at height regulations
 * following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Working at Height - Level 3 Module 1 Section 4.2";
const DESCRIPTION = "Understanding Work at Height Regulations 2005, safe use of scaffolds, ladders and MEWPs for electrical apprentices in the UK construction industry.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Under the Work at Height Regulations 2005, what should be the first consideration?",
    options: [
      "Use the best ladder available",
      "Avoid work at height altogether if possible",
      "Always use a harness",
      "Work quickly to minimise time at height"
    ],
    correctIndex: 1,
    explanation: "The hierarchy of control requires avoiding work at height if reasonably practicable. Only when this is not possible should you move to other control measures such as collective protection (scaffolds, guard rails) or personal protection (harnesses)."
  },
  {
    id: "check-2",
    question: "How often must scaffolds be inspected under the Work at Height Regulations?",
    options: [
      "Monthly",
      "Before first use and then at least every 7 days",
      "Only when damage is visible",
      "Annually by a competent person"
    ],
    correctIndex: 1,
    explanation: "Scaffolds must be inspected before first use, after any event likely to have affected stability (high winds, collision), and at intervals not exceeding 7 days. Inspections must be recorded, and a scaffold tag system is commonly used."
  },
  {
    id: "check-3",
    question: "What is the maximum safe angle for a ladder against a wall?",
    options: [
      "45 degrees",
      "60 degrees",
      "75 degrees (1:4 ratio)",
      "90 degrees (vertical)"
    ],
    correctIndex: 2,
    explanation: "The correct angle is 75 degrees, achieved using the 1:4 ratio - for every 4 units up, the base should be 1 unit out from the wall. Too steep risks falling backwards; too shallow risks the ladder sliding out at the base."
  },
  {
    id: "check-4",
    question: "What is a MEWP and when might you use one?",
    options: [
      "Manual Elevated Work Platform - for carrying heavy loads",
      "Mobile Elevating Work Platform - for safe access to work at height",
      "Mechanical Electrical Work Permit - for live working",
      "Mobile Equipment Working Procedure - for site vehicles"
    ],
    correctIndex: 1,
    explanation: "A MEWP (Mobile Elevating Work Platform) includes cherry pickers and scissor lifts. They provide a safer alternative to ladders for work at height, offering a stable platform, fall protection, and the ability to carry tools and materials."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main cause of fatal injuries on UK construction sites?",
    options: [
      "Electrical shock",
      "Falls from height",
      "Being struck by moving vehicles",
      "Collapse of structures"
    ],
    correctAnswer: 1,
    explanation: "Falls from height are the single biggest cause of fatal injuries in UK construction, accounting for approximately 40% of all construction deaths. This is why the Work at Height Regulations are so important."
  },
  {
    id: 2,
    question: "The Work at Height Regulations 2005 apply to work at what height?",
    options: [
      "Above 2 metres only",
      "Above 3 metres only",
      "Any height where a fall could cause injury",
      "Above 1.5 metres only"
    ],
    correctAnswer: 2,
    explanation: "The regulations apply to all work at height where there is a risk of a fall liable to cause personal injury, regardless of the actual height. Even falls from stepladders can cause serious injury."
  },
  {
    id: 3,
    question: "What is the correct hierarchy for controlling risks when working at height?",
    options: [
      "Use PPE first, then collective protection, then avoid height work",
      "Avoid height work, then collective protection, then personal protection",
      "Use ladders first, then scaffolds, then MEWPs",
      "Work quickly, use any available equipment"
    ],
    correctAnswer: 1,
    explanation: "The hierarchy is: 1) Avoid work at height if possible, 2) Prevent falls using collective protection (guard rails, scaffolds), 3) Minimise consequences using personal protection (harnesses, nets), 4) Minimise distance and consequences of a fall."
  },
  {
    id: 4,
    question: "Who can erect scaffolding on a construction site?",
    options: [
      "Any competent worker",
      "Only the site manager",
      "Scaffolders trained to CISRS or equivalent standard",
      "Anyone who has watched it done before"
    ],
    correctAnswer: 2,
    explanation: "Scaffolding must be erected by competent scaffolders, typically trained and certificated to CISRS (Construction Industry Scaffolders Record Scheme) standards. Incorrect assembly can cause collapse and fatalities."
  },
  {
    id: 5,
    question: "What must be displayed on a scaffold that has been inspected and is safe to use?",
    options: [
      "Nothing - verbal confirmation is sufficient",
      "A green scaffold tag showing inspection date and who inspected it",
      "The scaffolders name only",
      "A red warning sign"
    ],
    correctAnswer: 1,
    explanation: "A scaffold tag system is used - green tags indicate the scaffold has been inspected and is safe to use, showing the date of inspection and inspector's name. Red tags indicate scaffolds are incomplete or unsafe."
  },
  {
    id: 6,
    question: "What is the minimum height for guard rails on scaffolds?",
    options: [
      "750mm",
      "900mm",
      "950mm",
      "1100mm"
    ],
    correctAnswer: 2,
    explanation: "Guard rails must be at a minimum height of 950mm above the working platform. A mid-rail should be fitted to prevent people falling through the gap, and toe boards (minimum 150mm) prevent materials falling."
  },
  {
    id: 7,
    question: "When can a ladder be used as a work platform rather than just for access?",
    options: [
      "Never - ladders are access equipment only",
      "Only for work lasting up to 30 minutes if other factors are also met",
      "Whenever it is more convenient",
      "Only at heights below 3 metres"
    ],
    correctAnswer: 1,
    explanation: "Ladders can be used for light work of short duration (typically up to 30 minutes) where risk assessment shows it is appropriate, the ladder can be safely secured, three points of contact can be maintained, and the work is not heavy or complex."
  },
  {
    id: 8,
    question: "What should you check before using a ladder?",
    options: [
      "Only that it is the right length",
      "Stiles, rungs, feet, locking mechanisms, and that it is appropriate for the task",
      "Only that it looks OK visually",
      "That it has been painted recently"
    ],
    correctAnswer: 1,
    explanation: "Pre-use checks include: stiles are not bent or cracked, rungs are not damaged or missing, feet are present and in good condition, locking mechanisms work (stepladders), it has the correct load rating, and it is suitable for the task and environment."
  },
  {
    id: 9,
    question: "What training is required to operate a MEWP?",
    options: [
      "No training required",
      "Training by a manufacturer or accredited provider (e.g., IPAF)",
      "Just reading the manual",
      "Watching someone else use it"
    ],
    correctAnswer: 1,
    explanation: "MEWP operators must be trained and competent. IPAF (International Powered Access Federation) provides the industry-standard training certification. Familiarisation with specific machines is also required even if generally trained."
  },
  {
    id: 10,
    question: "What should you do if you discover a scaffold has a red tag or no tag?",
    options: [
      "Use it carefully",
      "Do not use it - it is incomplete, damaged, or not inspected",
      "Use it if you are confident it looks safe",
      "Add a green tag yourself"
    ],
    correctAnswer: 1,
    explanation: "A red tag indicates the scaffold is not safe to use - it may be incomplete, damaged, or requires inspection. No tag means the scaffold's status is unknown. In both cases, do not use it and report to the site supervisor."
  },
  {
    id: 11,
    question: "What is edge protection and when is it required?",
    options: [
      "Soft bumpers around furniture - always required in offices",
      "Guard rails, toe boards and barriers at edges where falls could occur",
      "Warning tape around holes - only required outdoors",
      "Rubber strips on sharp edges - only in domestic properties"
    ],
    correctAnswer: 1,
    explanation: "Edge protection (guard rails, toe boards, barriers) is required at any edge from which people could fall and be injured. This includes scaffold platforms, mezzanine floors, roof edges, stairwell openings, and floor openings."
  },
  {
    id: 12,
    question: "How far should a ladder extend above the landing point for safe egress?",
    options: [
      "Level with the landing",
      "At least 1 metre (approximately 3 rungs)",
      "500mm above the landing",
      "Extension above landing is not required"
    ],
    correctAnswer: 1,
    explanation: "Ladders should extend at least 1 metre (approximately 3 rungs) above the landing point to provide a secure handhold when stepping on and off. If this is not possible, an alternative secure handhold must be provided."
  }
];

const faqs = [
  {
    question: "Can I use a ladder to install a light fitting?",
    answer: "It depends on the risk assessment. For very brief, light work where three points of contact can be maintained and the ladder can be secured, it may be acceptable. However, for any extended work, work requiring both hands, or work above fragile surfaces, alternative access equipment such as a tower scaffold or MEWP should be used."
  },
  {
    question: "Do I need a harness when working on a scaffold?",
    answer: "If the scaffold is correctly erected with full edge protection (guard rails, mid-rails, toe boards), a harness is not normally required. Harnesses are used for additional protection on scaffolds without full edge protection, when leaning out beyond guard rails, or when working on mobile scaffolds in certain conditions."
  },
  {
    question: "Who is responsible for scaffold safety on site?",
    answer: "The scaffold should only be altered by competent scaffolders. However, everyone using the scaffold has responsibilities: checking the green tag is valid, not overloading platforms, not removing guard rails or boards, reporting damage or concerns, and not using scaffolds that are tagged red or not tagged."
  },
  {
    question: "What should I do if there is no safe access to where I need to work at height?",
    answer: "Stop and assess. Do not improvise unsafe access. Report to your supervisor that suitable access equipment is needed. Work should not proceed until proper access is provided. This might require a scaffold, MEWP, or tower scaffold to be brought to site."
  },
  {
    question: "Can I use any MEWP I find on site?",
    answer: "No. You must be trained and competent to use MEWPs, typically holding an IPAF certificate. Even if trained, you need familiarisation with the specific machine and authorisation to use it. Different types of MEWPs have different characteristics and hazards."
  },
  {
    question: "What is the three-point contact rule for ladders?",
    answer: "Three-point contact means always having three limbs in contact with the ladder - typically two hands and one foot, or two feet and one hand. This provides stability and reduces the risk of falling. You should not carry tools or materials in your hands while climbing - use a tool belt or raise materials separately."
  }
];

const Level3Module1Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Working at Height
          </h1>
          <p className="text-white/80">
            Scaffolds, ladders, MEWPs and the Work at Height Regulations - preventing falls that kill
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Falls = #1 killer:</strong> Approximately 40% of construction deaths are from falls</li>
              <li><strong>Hierarchy:</strong> Avoid height work, then guard rails, then harnesses</li>
              <li><strong>Scaffolds:</strong> Must be inspected every 7 days and tagged</li>
              <li><strong>Ladders:</strong> Last resort for short duration work only</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Scaffold tags, missing guard rails, unsecured ladders</li>
              <li><strong>Use:</strong> Correct access equipment for the task, check before use</li>
              <li><strong>Check:</strong> Green tag, all boards in place, secure base</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the Work at Height Regulations 2005 hierarchy",
              "Identify scaffold safety requirements and tagging systems",
              "Know when and how to use ladders safely",
              "Understand MEWP types and training requirements",
              "Recognise edge protection requirements",
              "Apply risk assessment principles to height work"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 - Work at Height Regulations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Work at Height Regulations 2005
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Falls from height are the single biggest cause of fatal injuries in the UK construction industry, accounting for approximately 40% of all construction deaths each year. The Work at Height Regulations 2005 were introduced to prevent these deaths by establishing a clear hierarchy for managing work at height. Understanding these regulations is essential for every electrician, as our work frequently involves heights - from installing ceiling fittings to routing cables in roof spaces.
            </p>

            <p>
              <strong>What counts as work at height?</strong> The regulations apply to any work where a person could fall a distance liable to cause personal injury. This includes working on ladders, scaffolds, roofs, MEWPs, and even stepladders. There is no minimum height threshold - falls from even low heights can cause serious injuries. The key question is whether a fall could hurt you, not how high you are.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The hierarchy of control for work at height:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Avoid</strong> - Can the work be done from ground level? Can prefabrication reduce height work?</li>
                <li><strong>2. Prevent</strong> - Use collective protection: scaffolds, guard rails, platforms with edge protection</li>
                <li><strong>3. Minimise</strong> - If falls cannot be prevented, minimise consequences: safety nets, harnesses</li>
                <li><strong>4. Distance</strong> - Minimise the distance that could be fallen and its consequences</li>
              </ul>
            </div>

            <p>
              Employers must ensure all work at height is properly planned, supervised by competent persons, and carried out safely. Equipment must be suitable for the task, properly maintained, and inspected. Workers must be trained and competent in using access equipment and understanding the risks.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A ladder should be a last resort, not a first choice. Always ask: can this task be done from the ground? Can we use a scaffold or MEWP instead? The few minutes saved by using a ladder instead of proper equipment are not worth a life-changing fall.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 - Scaffolds */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Scaffold Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Scaffolds provide the safest means of working at height when properly erected, inspected, and maintained. Unlike ladders, scaffolds offer a stable working platform, space for tools and materials, and edge protection to prevent falls. As an electrician, you will often work from scaffolds erected by others, so understanding scaffold safety is essential even if you never erect one yourself.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scaffold requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Erected by CISRS-trained scaffolders</li>
                  <li>Guard rails at minimum 950mm height</li>
                  <li>Mid-rails to prevent falling through gaps</li>
                  <li>Toe boards at minimum 150mm height</li>
                  <li>Full boarding - no gaps to fall through</li>
                  <li>Safe access via internal ladders or stairs</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scaffold tag system</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Green tag:</strong> Inspected and safe to use</li>
                  <li><strong>Red tag:</strong> Incomplete or unsafe - do NOT use</li>
                  <li><strong>No tag:</strong> Status unknown - do NOT use</li>
                  <li>Tag shows inspection date and inspector</li>
                  <li>Check the tag every time you use a scaffold</li>
                  <li>Report missing or out-of-date tags</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Inspection requirements:</strong> Under the Work at Height Regulations, scaffolds must be inspected before first use, after any event likely to have affected stability (such as high winds, impact damage, or modification), and at intervals not exceeding 7 days. Inspection must be by a competent person and results recorded. The scaffold tag should show the date of the last inspection.
            </p>

            <p>
              <strong>Your responsibilities as a scaffold user:</strong> Check the green tag is valid before each use. Do not overload the platform - check the safe working load. Do not remove guard rails, toe boards, or ladder ties. Do not alter the scaffold in any way. Report any damage, defects, or concerns immediately. If a scaffold does not look right, do not use it.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician stepped onto a scaffold platform to install a cable tray. The scaffold had a valid green tag. However, during the night, another trade had removed boards from an adjacent bay to pass materials through and not replaced them. The electrician stepped into the gap and fell 4 metres. Lesson: even with a green tag, always look before you step.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 - Ladders */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Safe Use of Ladders
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ladders are the most commonly misused access equipment and feature in many fall-from-height accidents. Under the Work at Height Regulations, ladders should only be used when a risk assessment has shown that other equipment is not justified because of the low risk, short duration, or site features that prevent other equipment being used. A ladder is a means of access, not a work platform.
            </p>

            <p>
              <strong>When can ladders be used for work?</strong> Ladders may be acceptable for light work of short duration (typically up to 30 minutes in one position) where: the ladder can be safely tied or footed, three points of contact can be maintained, the work does not require heavy effort or both hands free, and no safer alternative is reasonably practicable. Ladders should never be used for complex work, heavy loads, or extended periods.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-use ladder checks:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Stiles are not bent, cracked, or corroded</li>
                <li>Rungs are not damaged, loose, or missing</li>
                <li>Feet are present and not worn through or damaged</li>
                <li>Locking mechanisms work properly (stepladders)</li>
                <li>No damage from being dropped, struck, or overloaded</li>
                <li>Correct duty rating for the work (Class 1 for industrial use)</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">75 Degree Angle</p>
                <p className="text-white/90 text-xs">1:4 ratio - base 1 unit out for every 4 up. Use the standing test.</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">1 Metre Extension</p>
                <p className="text-white/90 text-xs">Extend at least 1m (3 rungs) above landing for safe handhold.</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">3 Point Contact</p>
                <p className="text-white/90 text-xs">Always maintain three limbs in contact while climbing.</p>
              </div>
            </div>

            <p>
              <strong>Securing ladders:</strong> Ladders must be secured to prevent slipping or falling. The preferred method is tying at the top. If this is not possible, tie at the base, stake the base, wedge against a wall, or use a ladder stay. As a last resort, have a second person foot the ladder. Never rely on friction alone.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Many ladder falls happen because workers overreach, carry loads up the ladder, use the wrong ladder for the task, or work on damaged ladders. Keep your belt buckle within the stiles, use a tool belt rather than carrying tools in your hands, and inspect the ladder every time before use.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 - MEWPs */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Mobile Elevating Work Platforms (MEWPs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mobile Elevating Work Platforms (MEWPs) include cherry pickers, scissor lifts, and boom lifts. They provide a safer alternative to ladders for many electrical tasks, offering a stable platform, fall protection through guard rails and harness anchor points, and the ability to carry tools and materials. As electrical work increasingly takes place at height - from installing EV chargers to data cabling in high ceilings - MEWP competency is becoming more important.
            </p>

            <p>
              <strong>Types of MEWPs:</strong> Scissor lifts provide vertical lift only and are stable platforms for work directly above the base. Boom lifts (cherry pickers) can reach out and over obstacles, useful when the base cannot be positioned directly below the work. Static platforms are fixed in position, while mobile platforms can be driven while raised (push-around types) or self-propelled.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">MEWP training and competency:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IPAF certification:</strong> The industry standard training provider</li>
                <li><strong>Category specific:</strong> Different categories for different MEWP types</li>
                <li><strong>Familiarisation:</strong> Required for each specific machine even if trained</li>
                <li><strong>Site specific:</strong> Understanding ground conditions, overhead hazards</li>
                <li><strong>Rescue training:</strong> Knowing how to rescue someone from a stuck MEWP</li>
                <li><strong>Pre-use checks:</strong> Daily checks before operation</li>
              </ul>
            </div>

            <p>
              <strong>Safe MEWP operation:</strong> Before use, conduct pre-use checks as per manufacturer instructions. Check ground conditions - MEWPs can tip over on soft, sloping, or uneven ground. Identify overhead hazards including power lines, structural beams, and other obstructions. Use outriggers where fitted. Wear a harness attached to the anchor point in boom-type MEWPs. Do not exceed the safe working load. Do not override safety systems.
            </p>

            <p>
              <strong>Common MEWP hazards:</strong> Electrocution from contact with overhead power lines is a leading cause of MEWP fatalities - maintain safe clearance distances. Crushing between the platform and fixed structures occurs when operators are not aware of their surroundings. Tip-over due to overloading, poor ground conditions, or exceeding capacity is another serious risk. Falls from the platform can occur if harnesses are not worn in boom lifts.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An electrician was working from a cherry picker to install external lighting on a warehouse. The site had recently had heavy rain. As the boom extended, the outrigger on one side sank into soft ground. The MEWP became unstable and the operator was thrown from the basket. He was not wearing a harness. Lesson: always assess ground conditions and always wear your harness.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Any Height Work</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Risk assess - can the work be done from ground level?</li>
                <li>Select the most appropriate access equipment</li>
                <li>Inspect equipment before use</li>
                <li>Check for overhead hazards including power lines</li>
                <li>Plan rescue procedures if something goes wrong</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Using Scaffolds</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check the green tag is valid and recent</li>
                <li>Visually inspect the scaffold before climbing</li>
                <li>Check all boards are in place before stepping</li>
                <li>Do not overload platforms</li>
                <li>Report any defects immediately</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Overreaching from ladders</strong> - move the ladder rather than stretch</li>
                <li><strong>Using scaffolds without checking the tag</strong> - always check before climbing</li>
                <li><strong>Not tying ladders</strong> - secure at top, or foot as minimum</li>
                <li><strong>Operating MEWPs near live power lines</strong> - maintain safe clearance</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Measurements</p>
                <ul className="space-y-0.5">
                  <li>Guard rail height: minimum 950mm</li>
                  <li>Toe board height: minimum 150mm</li>
                  <li>Ladder angle: 75 degrees (1:4 ratio)</li>
                  <li>Ladder extension: 1m above landing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Scaffold Inspection Intervals</p>
                <ul className="space-y-0.5">
                  <li>Before first use</li>
                  <li>After any event affecting stability</li>
                  <li>Maximum every 7 days</li>
                  <li>Results must be recorded</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Construction Hazards
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section4-3">
              Next: Confined Spaces
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section4_2;
