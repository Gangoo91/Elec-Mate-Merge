import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Activity, BarChart3, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-definition",
    question: "According to the Manual Handling Operations Regulations 1992, which of the following best describes manual handling?",
    options: [
      "Any activity that involves using machinery to move a load",
      "Transporting or supporting a load by hand or bodily force, including lifting, lowering, pushing, pulling, carrying, or moving",
      "Only the lifting and carrying of heavy objects weighing more than 25 kg",
      "Moving objects using mechanical aids such as trolleys and hoists"
    ],
    correctIndex: 1,
    explanation: "The MHOR 1992 defines manual handling as any transporting or supporting of a load (including lifting, putting down, pushing, pulling, carrying, or moving) by hand or bodily force. There is no minimum weight threshold — the definition covers all loads where bodily force is used."
  },
  {
    id: "mh-injury-stats",
    question: "Approximately what percentage of workplace injuries reported in the UK are related to manual handling?",
    options: [
      "Around 10%",
      "Around 20%",
      "Around 30%",
      "Around 50%"
    ],
    correctIndex: 2,
    explanation: "Approximately 30% of all workplace injuries reported to the HSE are related to manual handling. This makes musculoskeletal disorders (MSDs) from manual handling one of the single largest categories of workplace injury in the UK, accounting for around 500,000 affected workers each year."
  },
  {
    id: "mh-electrician-tasks",
    question: "Which of the following is a common manual handling task for an electrician?",
    options: [
      "Reading a wiring diagram at a desk",
      "Carrying cable drums and pulling heavy cables through containment",
      "Using a laptop to complete test certificates",
      "Discussing a project plan with the site manager"
    ],
    correctIndex: 1,
    explanation: "Carrying cable drums, pulling heavy cables through conduit and trunking, lifting distribution boards, and moving ladders and tools are all common manual handling tasks for electricians. These activities involve transporting or supporting a load by hand or bodily force and therefore fall within the scope of the MHOR 1992."
  }
];

const faqs = [
  {
    question: "Is there a maximum weight that a person can legally lift at work?",
    answer: "No. The Manual Handling Operations Regulations 1992 do not specify a maximum weight limit. This is a very common misconception. The regulations require employers to assess the risk of each manual handling task by considering the Task, Individual, Load, and Environment (TILE). The HSE provides guideline figures (e.g. 25 kg for men lifting close to the body at waist height) but these are not legal limits — they are filters to help identify tasks that need a detailed risk assessment. A 10 kg load could be high-risk if the task involves twisting, reaching, or repetition, while a 30 kg load might be acceptable if conditions are ideal."
  },
  {
    question: "What counts as a 'load' under the Manual Handling Operations Regulations?",
    answer: "A load is any discrete movable object, including boxes, tools, equipment, cable drums, materials, and even a person or animal. It also includes any object being held or restrained, such as holding a distribution board in position while it is being fixed to a wall. Importantly, applying force to a fixed object — such as pulling a stuck lever or pushing against a jammed door — may also involve manual handling risk factors such as awkward posture and sustained force, even though there is no discrete load being moved."
  },
  {
    question: "Do the Manual Handling Operations Regulations only apply to heavy loads?",
    answer: "No. The regulations apply to all manual handling operations where there is a risk of injury, regardless of the weight of the load. Repetitive handling of light loads can cause cumulative musculoskeletal damage over time. For example, an electrician repeatedly lifting junction boxes weighing only 2-3 kg, but doing so hundreds of times a day in awkward positions (above head height, in cramped ceiling voids), is carrying out a manual handling operation that requires assessment and control measures."
  },
  {
    question: "Are musculoskeletal disorders from manual handling always caused by a single incident?",
    answer: "No. While acute injuries can occur from a single event (such as a sudden disc prolapse from lifting a heavy distribution board), the majority of musculoskeletal disorders develop gradually over weeks, months, or years of repeated manual handling. Cumulative strain from poor posture, repetitive lifting, sustained awkward positions, and vibration exposure all contribute. This is why the regulations require assessment of frequency and duration, not just weight. An electrician who lifts moderate loads hundreds of times per week is at significant risk even if no single lift seems particularly demanding."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Manual Handling Operations Regulations 1992 define manual handling as:",
    options: [
      "Any lifting operation involving loads over 20 kg",
      "Transporting or supporting a load by hand or bodily force",
      "Using mechanical equipment to move materials on site",
      "Any activity that causes back pain"
    ],
    correctAnswer: 1,
    explanation: "The MHOR 1992 defines manual handling as any transporting or supporting of a load (including lifting, putting down, pushing, pulling, carrying, or moving) by hand or bodily force. There is no minimum weight threshold."
  },
  {
    id: 2,
    question: "Approximately how many UK workers suffer from musculoskeletal disorders related to manual handling each year?",
    options: [
      "Around 50,000",
      "Around 150,000",
      "Around 500,000",
      "Around 1,000,000"
    ],
    correctAnswer: 2,
    explanation: "Approximately 500,000 UK workers suffer from work-related musculoskeletal disorders each year, with manual handling being a leading cause. This results in millions of lost working days and significant costs to individuals, employers, and the economy."
  },
  {
    id: 3,
    question: "Which body region is most commonly injured in manual handling incidents?",
    options: [
      "Upper limbs (shoulders, arms, wrists)",
      "Lower limbs (knees, ankles, feet)",
      "The lower back (lumbar region)",
      "The neck (cervical region)"
    ],
    correctAnswer: 2,
    explanation: "The lower back (lumbar region) is the most commonly injured body region in manual handling incidents, accounting for approximately 40% of all manual handling injuries. The lumbar spine bears the greatest compressive load during lifting and is particularly vulnerable when the spine is flexed or twisted."
  },
  {
    id: 4,
    question: "Which of the following activities is NOT considered manual handling?",
    options: [
      "Pulling a cable through conduit by hand",
      "Carrying a toolbox across site",
      "Pressing a button to operate a hoist",
      "Pushing a loaded trolley along a corridor"
    ],
    correctAnswer: 2,
    explanation: "Pressing a button to operate a hoist does not involve transporting or supporting a load by hand or bodily force — the mechanical equipment does the work. All the other options involve the application of bodily force to move or support a load and therefore constitute manual handling."
  },
  {
    id: 5,
    question: "The HSE guideline figure of 25 kg for a man lifting close to the body at waist height is:",
    options: [
      "A legal maximum weight limit that must never be exceeded",
      "A filter to identify tasks that need a detailed risk assessment, not a safe limit",
      "The maximum weight for any manual handling task on a construction site",
      "Only applicable to workers aged over 18"
    ],
    correctAnswer: 1,
    explanation: "The HSE guideline figures are filters, not legal limits. They help identify manual handling tasks that need a more detailed risk assessment. A load below the guideline figure is not automatically safe, and a load above it is not automatically prohibited. The actual risk depends on all the TILE factors — Task, Individual, Load, and Environment."
  },
  {
    id: 6,
    question: "Which of the following is a common manual handling hazard specific to electricians?",
    options: [
      "Reading circuit diagrams",
      "Carrying cable drums and pulling heavy SWA cable",
      "Using a multimeter to test circuits",
      "Writing risk assessments at a desk"
    ],
    correctAnswer: 1,
    explanation: "Carrying cable drums (which can weigh 50 kg or more) and pulling heavy steel wire armoured (SWA) cable through containment are common manual handling hazards for electricians. These tasks involve significant force, awkward postures, and sustained effort."
  },
  {
    id: 7,
    question: "Musculoskeletal disorders from manual handling:",
    options: [
      "Always result from a single heavy lift",
      "Only affect workers over the age of 50",
      "Can develop gradually from repeated handling over weeks, months, or years",
      "Are only caused by lifting, not by pushing or pulling"
    ],
    correctAnswer: 2,
    explanation: "Most musculoskeletal disorders develop gradually from repeated manual handling over time — cumulative strain from poor posture, repetitive lifting, sustained awkward positions, and vibration exposure. Acute injuries from a single event do occur, but gradual onset is far more common."
  },
  {
    id: 8,
    question: "Approximately what percentage of all workplace injuries reported in the UK are related to manual handling?",
    options: [
      "About 10%",
      "About 20%",
      "About 30%",
      "About 50%"
    ],
    correctAnswer: 2,
    explanation: "Approximately 30% of all workplace injuries reported to the HSE are related to manual handling, making it one of the largest single categories of workplace injury. This figure has remained broadly consistent over many years, demonstrating the ongoing scale of the problem."
  }
];

export default function ManualHandlingModule1Section1() {
  useSEO({
    title: "What Is Manual Handling? | Manual Handling Module 1.1",
    description: "MHOR 1992 definition, UK injury statistics, common electrician manual handling tasks, and musculoskeletal disorder risk factors.",
  });

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
            <Link to="../manual-handling-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <BookOpen className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is Manual Handling?
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The legal definition, the scale of the problem in UK workplaces, and why manual handling injuries remain the most common cause of occupational ill health
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Definition:</strong> Transporting or supporting a load by hand or bodily force</li>
              <li><strong>Includes:</strong> Lifting, lowering, pushing, pulling, carrying, moving</li>
              <li><strong>Scale:</strong> ~500,000 UK workers affected by MSDs each year</li>
              <li><strong>Key fact:</strong> ~30% of all workplace injuries are manual handling related</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">For Electricians</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Cable drums:</strong> Heavy drums (25&ndash;80 kg+) requiring team lifts</li>
              <li><strong>Distribution boards:</strong> Awkward shape, overhead installation</li>
              <li><strong>Cable pulling:</strong> Sustained force through conduit and trunking</li>
              <li><strong>Tools &amp; ladders:</strong> Repeated carrying across large sites</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "State the legal definition of manual handling under the MHOR 1992",
              "List the six types of manual handling activity covered by the regulations",
              "Describe the scale of manual handling injuries in UK workplaces",
              "Identify common manual handling tasks carried out by electricians",
              "Explain why there is no legal maximum weight limit for manual handling",
              "Distinguish between acute injuries and cumulative musculoskeletal disorders"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Legal Definition */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            The Legal Definition
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Manual Handling Operations Regulations 1992</strong> (MHOR 1992, as amended
                2002) provide the legal framework for managing manual handling risks in all UK workplaces.
                These regulations were made under the Health and Safety at Work Act 1974 and implement
                European Council Directive 90/269/EEC on manual handling of loads.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-500 mb-2">Legal Definition</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;Manual handling operations&rdquo;</strong> means any transporting or
                  supporting of a load (including the lifting, putting down, pushing, pulling, carrying,
                  or moving thereof) by hand or by bodily force.
                </p>
              </div>

              <p>
                This definition is deliberately broad and encompasses far more than simply picking
                something up and putting it down. It covers <strong>six distinct types of activity</strong>,
                each of which carries its own pattern of risk:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Six Types of Manual Handling</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">1. Lifting</p>
                    <p>Raising a load from a lower level to a higher level. Examples include picking up
                      a toolbox from the floor, lifting a distribution board onto a wall bracket, or
                      raising a cable drum onto a stand.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">2. Lowering</p>
                    <p>Moving a load from a higher level to a lower level in a controlled manner.
                      Examples include lowering a luminaire from a ceiling, placing a heavy tool bag
                      on the floor, or lowering materials from a scaffold platform.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">3. Pushing</p>
                    <p>Applying force to move a load away from the body. Examples include pushing a
                      loaded trolley, pushing cable trunking into position, or pushing a heavy door
                      open while carrying tools.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">4. Pulling</p>
                    <p>Applying force to move a load towards the body or along a path. Examples include
                      pulling cables through conduit, pulling a cable drum on a trolley, or hauling
                      a rope to raise materials.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">5. Carrying</p>
                    <p>Transporting a load from one place to another while supporting its weight.
                      Examples include carrying lengths of conduit or trunking, transporting tool bags
                      across site, or carrying cable drums between work areas.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">6. Moving</p>
                    <p>Changing the position or orientation of a load. This is a catch-all that covers
                      activities like sliding, rolling, tilting, turning, or repositioning a load.
                      Examples include rolling a cable drum, tilting a distribution board, or sliding
                      a panel into position.</p>
                  </div>
                </div>
              </div>

              <p>
                A critical point is that there is <strong>no minimum weight threshold</strong> in the
                regulations. A load of any weight can present a manual handling risk if the task involves
                awkward postures, repetitive movements, long carrying distances, or poor environmental
                conditions. The definition focuses on the <strong>activity</strong> (transporting or
                supporting by bodily force), not on the weight of the load.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Common Misconception</p>
                </div>
                <p className="text-sm text-white/80">
                  Many workers believe there is a legal maximum weight limit for manual handling &mdash;
                  often cited as 25 kg for men or 16 kg for women. <strong className="text-white">This
                  is not true.</strong> The HSE provides guideline filter figures to help identify tasks
                  that need a detailed risk assessment, but these are not legal limits. A task involving
                  a 10 kg load can be high-risk if it involves twisting, reaching overhead, or being
                  repeated hundreds of times a day. Conversely, a single lift of 30 kg in ideal
                  conditions may be acceptable.
                </p>
              </div>

              <p>
                The regulations also define a <strong>&ldquo;load&rdquo;</strong> as any discrete
                movable object. This includes inanimate objects (tools, materials, equipment), living
                things (a person being assisted or rescued), and anything being held in position or
                restrained (such as holding a fitting against a ceiling while fixing it). Even a person
                &mdash; for example, an injured colleague being moved &mdash; is a load under the
                regulations.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Statistics — The Scale of the Problem */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            The Statistics &mdash; The Scale of the Problem
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Manual handling injuries represent one of the <strong>largest categories of workplace
                ill health</strong> in the United Kingdom. The numbers are substantial and persistent,
                demonstrating that despite decades of legislation and guidance, manual handling remains
                a major occupational health challenge.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">UK Manual Handling &mdash; Key Statistics</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~500,000</p>
                    <p className="text-white/70 text-xs">workers suffering from work-related MSDs each year</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">~30%</p>
                    <p className="text-white/70 text-xs">of all workplace injuries are manual handling related</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">7.3m</p>
                    <p className="text-white/70 text-xs">working days lost to MSDs each year in the UK</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-2xl font-bold text-red-400">&pound;5bn+</p>
                    <p className="text-white/70 text-xs">estimated annual cost to the UK economy</p>
                  </div>
                </div>
              </div>

              <p>
                According to the Health and Safety Executive (HSE), musculoskeletal disorders (MSDs) are
                the <strong>most common type of occupational ill health</strong> in the UK. Each year,
                approximately 500,000 workers report suffering from a work-related musculoskeletal
                condition &mdash; affecting the back, neck, shoulders, arms, wrists, hips, knees, or
                other joints and soft tissues.
              </p>

              <p>
                Of all injuries reported under RIDDOR (Reporting of Injuries, Diseases and Dangerous
                Occurrences Regulations), manual handling accounts for approximately <strong>30% of
                all reported injuries</strong>. This proportion has remained broadly consistent over
                many years, indicating that the problem is deeply embedded in the way work is organised
                and carried out across all industries.
              </p>

              {/* Manual Handling Injury Statistics Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-white">Manual Handling Injury Statistics &mdash; By Body Region</p>
                </div>
                <div className="space-y-4">
                  {/* Back injuries */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">Back (lumbar region)</span>
                      <span className="text-sm font-bold text-red-400">~40%</span>
                    </div>
                    <div className="h-6 sm:h-8 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full flex items-center justify-end pr-2" style={{ width: "40%" }}>
                        <span className="text-[10px] font-bold text-white hidden sm:inline">MOST COMMON</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Disc injuries, muscle strains, ligament sprains, sciatica</p>
                  </div>
                  {/* Upper limbs */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">Upper limbs (shoulders, arms, wrists)</span>
                      <span className="text-sm font-bold text-emerald-400">~25%</span>
                    </div>
                    <div className="h-6 sm:h-8 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: "25%" }}>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Rotator cuff tears, tennis elbow, carpal tunnel, tendonitis</p>
                  </div>
                  {/* Lower limbs */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">Lower limbs (knees, ankles, feet)</span>
                      <span className="text-sm font-bold text-blue-400">~20%</span>
                    </div>
                    <div className="h-6 sm:h-8 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: "20%" }}>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Knee meniscus injuries, ankle sprains, foot crush injuries</p>
                  </div>
                  {/* Other */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">Other (neck, abdomen, multiple regions)</span>
                      <span className="text-sm font-bold text-amber-400">~15%</span>
                    </div>
                    <div className="h-6 sm:h-8 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: "15%" }}>
                      </div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Cervical disc problems, hernias, multi-site pain syndromes</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Activity className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-white/80">
                      <strong className="text-red-400">Critical insight:</strong> The lower back accounts
                      for approximately 40% of all manual handling injuries. The lumbar spine (particularly
                      the L4/L5 and L5/S1 vertebral segments) bears the greatest compressive and shear
                      forces during lifting, bending, and twisting. This is why correct lifting technique
                      and task design are so critical.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The <strong>construction industry</strong>, including electrical installation, has one
                of the highest rates of musculoskeletal disorders of any sector. The physical nature
                of the work &mdash; lifting heavy materials, working in confined spaces, adopting
                awkward postures, and performing repetitive tasks &mdash; means that electricians are
                at particularly high risk. HSE data shows that construction workers are approximately
                twice as likely to develop a work-related MSD compared to the average across all
                industries.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">The Hidden Cost</p>
                </div>
                <p className="text-sm text-white/80">
                  Beyond the headline statistics, manual handling injuries have a devastating impact on
                  individuals. Chronic back pain can last for years or become permanent, preventing
                  workers from continuing in their trade. Many electricians who develop serious MSDs
                  are forced to change career, take early retirement, or live with chronic pain and
                  reduced mobility. The personal, financial, and emotional cost is immense &mdash; and
                  in most cases, the injury was entirely preventable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Common Manual Handling Tasks for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Common Manual Handling Tasks for Electricians
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Electricians perform a wide range of manual handling tasks on a daily basis. Many
                of these are so routine that they may not even be recognised as manual handling
                operations &mdash; yet each one carries a risk of musculoskeletal injury if it is
                not properly assessed and managed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Typical Electrician Manual Handling Tasks</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/80">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Cable Drums &amp; Reels</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Lifting cable drums from delivery pallets (25&ndash;80 kg+)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Rolling and manoeuvring drums across uneven ground</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Mounting drums on cable stands for pulling off</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Distribution Boards &amp; Panels</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Lifting boards into position on wall brackets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Holding heavy panels overhead while fixing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Carrying packaged boards up stairs and through corridors</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Cable Pulling</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Pulling SWA cable through underground ducts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Drawing cables through conduit and trunking runs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Feeding cables through ceiling voids and risers</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Tools, Ladders &amp; Equipment</p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Carrying heavy tool bags and power tools across site</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Transporting stepladders and extension ladders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Moving tower scaffold components between locations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Each of these tasks involves the application of bodily force to transport or support
                a load, and therefore falls within the definition of a manual handling operation. The
                specific risks will vary depending on the weight, shape, and size of the load; the
                distance it must be moved; the posture required; the frequency of the task; and the
                environmental conditions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Additional Electrician Manual Handling Hazards</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Containment installation</strong> &mdash; lifting and fixing cable tray, basket, and trunking at ceiling height, often requiring overhead reaching and sustained arm elevation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Trench work</strong> &mdash; bending, kneeling, and lifting in confined trenches when laying underground cables and ducts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Ceiling void work</strong> &mdash; crawling, twisting, and manoeuvring in restricted spaces above suspended ceilings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Switchgear installation</strong> &mdash; manoeuvring heavy switchgear panels (100 kg+) into plant rooms, often through narrow doorways</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Repetitive wiring</strong> &mdash; sustained gripping, pulling, and twisting of cables during termination and connection work</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Electrician-Specific Risk Factors</p>
                </div>
                <p className="text-sm text-white/80">
                  Electricians face particular manual handling risks because their work frequently
                  involves <strong className="text-white">awkward postures</strong> (overhead reaching,
                  kneeling, bending into voids), <strong className="text-white">confined spaces</strong>
                  (ceiling voids, risers, ducts, under-floor zones), <strong className="text-white">
                  repetitive movements</strong> (cable stripping, terminating, pulling), and
                  <strong className="text-white"> asymmetric loads</strong> (long lengths of conduit,
                  oddly shaped fittings, flexible cables). These factors significantly increase the
                  risk of musculoskeletal injury compared to straightforward lifting of compact,
                  symmetrical loads.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: What Are Musculoskeletal Disorders (MSDs)? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            What Are Musculoskeletal Disorders (MSDs)?
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Musculoskeletal disorders (MSDs)</strong> are conditions that affect the muscles,
                joints, tendons, ligaments, nerves, and intervertebral discs. They range from mild
                aches and stiffness to severe, disabling conditions that prevent a person from working.
                MSDs from manual handling can be <strong>acute</strong> (resulting from a single event)
                or <strong>chronic</strong> (developing gradually over time).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Manual Handling Injuries</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-emerald-400 text-xs font-semibold mb-1">Back Injuries</p>
                    <p className="text-white/80 text-xs">Disc prolapse (slipped disc), muscle strains, ligament sprains, facet joint dysfunction, sciatica (nerve compression). The lumbar spine is the most vulnerable region.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-emerald-400 text-xs font-semibold mb-1">Shoulder Injuries</p>
                    <p className="text-white/80 text-xs">Rotator cuff tears, impingement syndrome, frozen shoulder. Common in electricians who work with arms raised overhead for prolonged periods.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-emerald-400 text-xs font-semibold mb-1">Upper Limb Disorders</p>
                    <p className="text-white/80 text-xs">Tennis elbow (lateral epicondylitis), carpal tunnel syndrome, tendonitis, De Quervain&rsquo;s tenosynovitis. Often caused by repetitive gripping and twisting.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-emerald-400 text-xs font-semibold mb-1">Knee &amp; Lower Limb</p>
                    <p className="text-white/80 text-xs">Knee bursitis (&ldquo;carpet layer&rsquo;s knee&rdquo;), meniscus tears, ankle ligament sprains. Common in electricians who kneel for floor-level work.</p>
                  </div>
                </div>
              </div>

              <p>
                The distinction between <strong>acute</strong> and <strong>chronic</strong> injuries
                is important for understanding how manual handling causes harm:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-2">Acute Injuries</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Result from a single event or incident</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Sudden onset of pain, often with a clear &ldquo;mechanism&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Example: disc prolapse from lifting a heavy load with a twisted spine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Example: muscle tear from a sudden, unexpected load shift</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-amber-400 font-semibold text-sm mb-2">Chronic / Cumulative Injuries</p>
                    <ul className="text-sm text-white/80 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Develop gradually over weeks, months, or years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>No single identifiable incident &mdash; cumulative damage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Example: chronic low back pain from years of poor lifting posture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Example: carpal tunnel syndrome from repetitive cable termination</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Research consistently shows that the <strong>majority of MSDs are cumulative</strong>
                rather than resulting from a single incident. This is why the regulations focus on
                assessing not just the weight of loads, but also the frequency, duration, posture,
                and environmental factors involved in manual handling tasks. An electrician who lifts
                moderate loads dozens of times per day, in awkward positions, over months and years,
                is at very high risk of developing a chronic MSD &mdash; even if no single lift
                seems particularly demanding.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Long-Term Consequences</p>
                </div>
                <p className="text-sm text-white/80">
                  Chronic MSDs can be life-changing. Severe back injuries may require surgery and
                  lengthy rehabilitation. Nerve damage can cause permanent numbness, weakness, or
                  pain. Many affected workers are unable to return to manual trades, face reduced
                  earning capacity, and experience significant impacts on their quality of life. In
                  the electrical industry, where physical fitness is essential, a disabling MSD can
                  end a career.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Key Risk Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Key Risk Factors for Manual Handling Injury
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Manual handling injuries do not occur randomly. They result from a combination of
                identifiable risk factors that, when present together, significantly increase the
                likelihood of harm. Understanding these risk factors is the first step towards
                preventing injury.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Primary Risk Factors</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Heavy loads</strong> &mdash; the greater the weight, the greater the compressive force on the spine and the strain on muscles and ligaments. Cable drums, switchgear panels, and bundles of conduit can all be extremely heavy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Awkward postures</strong> &mdash; bending, twisting, reaching overhead, stooping, and kneeling all increase spinal loading and muscle fatigue. Electricians frequently adopt these postures when working in confined spaces, ceiling voids, and at floor level.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Repetitive handling</strong> &mdash; performing the same manual handling movement repeatedly causes cumulative micro-damage to muscles, tendons, and discs. Even light loads become hazardous when handled hundreds of times a day.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Long carrying distances</strong> &mdash; carrying loads over long distances increases fatigue, changes gait patterns, and prolongs the duration of spinal loading. Large construction sites can require materials to be carried hundreds of metres.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Unstable or unpredictable loads</strong> &mdash; loads that shift, swing, or change shape during handling (such as coiled cables or liquid-filled containers) create sudden, unexpected forces that the body must absorb.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Poor grip</strong> &mdash; smooth, slippery, or awkwardly shaped loads that are difficult to grip securely increase the risk of dropping the load or compensating with excessive muscular effort.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Environmental factors</strong> &mdash; slippery floors, uneven surfaces, poor lighting, extreme temperatures, confined spaces, and obstacles in the path all increase manual handling risk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Individual factors</strong> &mdash; age, fitness, existing health conditions, fatigue, pregnancy, and experience all affect an individual&rsquo;s capacity for manual handling. These must be considered in every risk assessment.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Key principle:</strong> It is the
                  <strong> combination</strong> of risk factors that determines the overall level of
                  risk. A moderate-weight load lifted in an ideal posture, on a flat surface, once per
                  day, is low-risk. The same load lifted in a twisted posture, on an uneven surface,
                  50 times per day, is high-risk. Effective risk assessment must consider all factors
                  together, not just the weight of the load.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established the foundational understanding of what manual handling
                is, why it matters, and how it affects the daily work of electricians. The key
                points to remember are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Definition:</strong> Manual handling means transporting or supporting a load by hand or bodily force &mdash; including lifting, lowering, pushing, pulling, carrying, and moving</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">No weight limit:</strong> There is no legal maximum weight &mdash; risk depends on the combination of task, individual, load, and environment factors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Statistics:</strong> ~500,000 workers affected, ~30% of all injuries, ~7.3 million working days lost, over &pound;5 billion annual cost</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Back injuries dominate:</strong> The lower back accounts for ~40% of all manual handling injuries</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Electrician relevance:</strong> Cable drums, distribution boards, cable pulling, containment, tools, and ladders are all common manual handling tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Cumulative damage:</strong> Most MSDs develop gradually from repeated handling, not from a single incident</span>
                </li>
              </ul>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Next:</strong> In Section 2, we will examine
                  the legal framework in detail &mdash; the Manual Handling Operations Regulations
                  1992, the Health and Safety at Work Act 1974, employer and employee duties, and the
                  hierarchy of control measures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-1-section-2">
              Next: The Legal Framework
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
