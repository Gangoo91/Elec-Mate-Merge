import {
  ArrowLeft,
  UserCheck,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  Moon,
  Heart,
  ShieldAlert,
  Baby,
  Clock,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const quickCheckQuestions = [
  {
    id: "fitness-technique",
    question:
      "A physically strong worker lifts a 30 kg load with poor technique — bending at the waist with a twisted spine. Why is this still a significant injury risk?",
    options: [
      "Physical strength eliminates all manual handling risk",
      "Strength does not protect the spine — poor technique exposes the lumbar discs to dangerous shear forces regardless of muscle strength",
      "The load is too light to cause any injury regardless of technique",
      "Only workers over 50 are at risk from poor technique",
    ],
    correctIndex: 1,
    explanation:
      "Physical strength does NOT compensate for poor technique. When the spine is bent and twisted under load, the lumbar discs are exposed to dangerous shear and compressive forces that no amount of muscle strength can protect against. A strong worker using poor technique is just as likely to herniate a disc as a weaker worker. Good technique is essential regardless of physical capability.",
  },
  {
    id: "pregnancy-mh",
    question:
      "Under which regulation must a specific manual handling assessment be carried out for a pregnant worker?",
    options: [
      "The Health and Safety at Work Act 1974 only",
      "The Manual Handling Operations Regulations 1992 (MHOR), with specific reference to the Management of Health and Safety at Work Regulations 1999",
      "The Lifting Operations and Lifting Equipment Regulations 1998 (LOLER)",
      "The Personal Protective Equipment Regulations 2002",
    ],
    correctIndex: 1,
    explanation:
      "The MHOR 1992 requires specific assessment for all manual handling tasks, and the Management of Health and Safety at Work Regulations 1999 (Regulation 16) specifically requires a risk assessment for new and expectant mothers. This assessment must consider the effects of pregnancy on manual handling capacity, including the impact of the relaxin hormone on ligament stability and the changed centre of gravity.",
  },
  {
    id: "fatigue-management",
    question:
      "Which of the following is the most effective way to manage fatigue-related manual handling risk on a construction site?",
    options: [
      "Provide energy drinks to keep workers alert",
      "Schedule the heaviest manual handling tasks for the end of the shift",
      "Plan adequate rest breaks, rotate tasks, and schedule demanding manual handling earlier in the shift when workers are freshest",
      "Allow workers to skip manual handling training to save time",
    ],
    correctIndex: 2,
    explanation:
      "Effective fatigue management involves planning rest breaks, rotating tasks between workers, and scheduling the most physically demanding manual handling tasks earlier in the shift when workers are freshest and most alert. Fatigue reduces grip strength, impairs judgement, and slows reaction times — all of which increase injury risk.",
  },
];

const faqs = [
  {
    question:
      "Can my employer require me to lift heavy loads even though I have a pre-existing back condition?",
    answer:
      "No. Under the MHOR 1992, your employer must assess manual handling tasks and take account of individual capability, including pre-existing conditions. If you have a known back condition, your employer must modify the task, provide mechanical aids, or allocate you to different work. You have a duty to inform your employer of any pre-existing condition that affects your ability to carry out manual handling safely. Withholding this information puts you at risk and may affect any future claim.",
  },
  {
    question:
      "I am over 50 and have noticed I cannot lift as easily as I used to. Is this normal?",
    answer:
      "Yes, it is a normal part of ageing. From your 30s onwards, intervertebral discs begin to lose water content and elasticity, reducing their shock-absorbing capacity. Muscle mass naturally decreases (sarcopenia), flexibility reduces, and recovery time after physical exertion increases. This does not mean you cannot do manual handling work — but it does mean that tasks should be assessed with your individual capability in mind, mechanical aids should be used more readily, and you should pay particular attention to technique and rest breaks.",
  },
  {
    question:
      "Does taking painkillers before manual handling make the task safer?",
    answer:
      "No — painkillers can actually make manual handling MORE dangerous. Pain is the body's warning system. If painkillers mask the pain from an existing injury, you will not feel the warning signals that tell you to stop or reduce the load. This can lead to significantly worse injury because you continue to stress damaged tissue without realising it. Additionally, some painkillers cause drowsiness, reduced coordination, and slower reaction times, all of which increase injury risk. Never take painkillers to enable you to carry out manual handling that would otherwise be too painful.",
  },
  {
    question:
      "How should new or young workers be supervised during manual handling tasks?",
    answer:
      "New and young workers require closer supervision because they typically have less experience in recognising risks, may not have fully developed physical strength, and are statistically more likely to take shortcuts or underestimate loads. Supervision should include: direct observation during initial manual handling tasks, regular check-ins to ensure correct technique is being used, pairing with experienced workers for team lifts, clear instruction on when to ask for help, and encouragement to report any difficulties without fear of criticism. Supervision should be gradually reduced as competence is demonstrated, but never removed entirely for the highest-risk tasks.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Why does physical fitness alone NOT eliminate manual handling injury risk?",
    options: [
      "Because physical fitness has no impact on manual handling at all",
      "Because even strong workers are vulnerable to spinal injury from poor technique — strength does not protect the discs",
      "Because only young workers benefit from fitness",
      "Because fitness only helps with mental health, not physical tasks",
    ],
    correctAnswer: 1,
    explanation:
      "Physical fitness improves endurance and overall capacity, but it does NOT protect the intervertebral discs from the shear and compressive forces generated by poor lifting technique. A strong worker who lifts with a bent, twisted spine is just as vulnerable to disc herniation as anyone else. Good technique is essential regardless of fitness level.",
  },
  {
    id: 2,
    question:
      "What happens to intervertebral discs as a person ages from their 30s onwards?",
    options: [
      "They become stronger and more resilient",
      "They lose water content and elasticity, reducing their shock-absorbing capacity",
      "They are completely replaced by new tissue every 10 years",
      "There is no change — discs remain the same throughout life",
    ],
    correctAnswer: 1,
    explanation:
      "From the 30s onwards, intervertebral discs undergo natural degeneration — they lose water content, become less elastic, and their shock-absorbing capacity reduces. This process is gradual but means that loads that could be handled without issue at age 25 may pose a greater risk at age 50. This is a normal part of ageing and must be factored into manual handling assessments.",
  },
  {
    id: 3,
    question:
      "What is the effect of the hormone relaxin during pregnancy on manual handling capacity?",
    options: [
      "It makes muscles stronger",
      "It loosens ligaments throughout the body, reducing joint stability and increasing injury risk",
      "It has no effect on the musculoskeletal system",
      "It increases bone density",
    ],
    correctAnswer: 1,
    explanation:
      "Relaxin is a hormone produced during pregnancy that loosens ligaments throughout the body to prepare the pelvis for childbirth. However, it does not only affect the pelvic ligaments — it loosens ligaments in the spine, knees, and other joints, reducing their stability and increasing the risk of injury during manual handling. This is why a specific manual handling assessment is required for pregnant workers.",
  },
  {
    id: 4,
    question:
      "A worker takes strong painkillers for an existing back injury and then carries out manual handling. Why does this increase injury risk?",
    options: [
      "Painkillers have no effect on injury risk",
      "The painkillers mask warning pain signals, causing the worker to stress damaged tissue without realising it",
      "Painkillers make the worker physically stronger",
      "Painkillers only affect the worker's mood, not their physical function",
    ],
    correctAnswer: 1,
    explanation:
      "Painkillers mask the body's warning system. Pain tells you when tissue is being damaged or overstressed. If this signal is suppressed by medication, the worker will continue to load damaged structures without feeling the warning, leading to significantly worse injury. Some painkillers also cause drowsiness and reduced coordination, further compounding the risk.",
  },
  {
    id: 5,
    question:
      "Which factor MOST increases fatigue-related manual handling injury risk?",
    options: [
      "Working in warm weather",
      "Wearing steel-toe-capped boots",
      "Long shifts without adequate rest breaks, combined with poor sleep quality",
      "Listening to music while working",
    ],
    correctAnswer: 2,
    explanation:
      "Long shifts without adequate rest breaks, compounded by poor sleep quality, are the primary drivers of fatigue-related injury. Fatigue reduces grip strength, impairs concentration and judgement, slows reaction times, and causes workers to adopt poor postures as their muscles tire. Rest breaks, adequate hydration, and good sleep hygiene are essential countermeasures.",
  },
  {
    id: 6,
    question:
      "Why are new and young workers at greater risk of manual handling injury?",
    options: [
      "They are always physically weaker than experienced workers",
      "They have less experience recognising risks, may not have developed full physical strength, and are more likely to take shortcuts",
      "They are not required to follow manual handling procedures",
      "Young workers cannot be injured because they are naturally flexible",
    ],
    correctAnswer: 1,
    explanation:
      "New and young workers face a combination of risk factors: less experience in recognising hazards and assessing loads, potentially incomplete physical development, a tendency to want to prove themselves (leading to taking on loads that are too heavy), less familiarity with correct technique, and a reluctance to ask for help. This is why closer supervision and mentoring are essential.",
  },
  {
    id: 7,
    question:
      "Under what circumstance must an employer carry out a specific manual handling risk assessment for a pregnant worker?",
    options: [
      "Only if the worker requests it in writing",
      "Only after the worker has been injured",
      "As soon as the employer is informed of the pregnancy — it is a legal requirement",
      "Only in the final month of pregnancy",
    ],
    correctAnswer: 2,
    explanation:
      "Under the Management of Health and Safety at Work Regulations 1999 (Regulation 16), an employer must carry out a specific risk assessment for a new or expectant mother as soon as they are notified of the pregnancy. This assessment must consider all workplace hazards including manual handling and must be reviewed as the pregnancy progresses and the worker's physical capabilities change.",
  },
  {
    id: 8,
    question:
      "What is the relationship between hydration and manual handling injury risk?",
    options: [
      "Hydration has no effect on manual handling",
      "Dehydration reduces muscle performance, impairs concentration, and increases fatigue — all of which elevate injury risk",
      "Drinking water only helps if the weather is hot",
      "Workers should avoid drinking during shifts to reduce the need for toilet breaks",
    ],
    correctAnswer: 1,
    explanation:
      "Dehydration has a direct impact on manual handling capacity. Even mild dehydration (2% body weight loss) reduces muscle performance by up to 20%, impairs concentration and reaction times, increases fatigue, and can cause dizziness. Workers carrying out physical manual handling must have access to drinking water and be encouraged to hydrate regularly throughout the shift.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ManualHandlingModule5Section2() {
  useSEO({
    title:
      "Fitness, Fatigue & Personal Factors | Manual Handling Module 5.2",
    description:
      "Physical fitness, age considerations, pregnancy, pre-existing conditions, medication effects, fatigue management, new workers, and individual capability assessment for manual handling.",
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
            <Link to="../manual-handling-module-5">
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
            <UserCheck className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 5 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fitness, Fatigue &amp; Personal Factors
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How physical fitness, age, pregnancy, pre-existing conditions,
            medication, fatigue, and individual experience affect manual
            handling capacity and injury risk
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Strength &ne; safety:</strong> strong workers still
                  need good technique
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Disc degeneration</strong> begins naturally from
                  the 30s
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Pregnancy:</strong> specific MH assessment legally
                  required
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Painkillers</strong> mask warning pain &mdash;
                  increasing risk
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Fatigue:</strong> reduces grip strength, impairs
                  judgement
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Young workers:</strong> more likely to take shortcuts
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-400" />
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why physical fitness alone does not eliminate manual handling injury risk",
              "Describe the age-related changes that affect manual handling capacity",
              "Identify the specific risks pregnancy poses for manual handling and the legal requirements",
              "Recognise how pre-existing conditions and medication affect safe manual handling",
              "Outline effective fatigue management strategies for manual handling tasks",
              "Explain why new and young workers require additional supervision and support",
              "Understand the principles of individual capability assessment under the MHOR 1992",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Physical Fitness & Manual Handling Capacity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            Physical Fitness &amp; Manual Handling Capacity
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Physical fitness undeniably improves a worker&rsquo;s capacity
                for manual handling. Stronger muscles, better cardiovascular
                endurance, and greater flexibility all contribute to an
                increased ability to perform physical tasks. However, there is
                a critical misconception that needs to be addressed:{" "}
                <strong>
                  physical strength does NOT protect you from spinal injury
                  caused by poor technique
                </strong>
                .
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    The Strength Misconception
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  A physically strong worker who lifts with a bent, twisted
                  spine generates the same dangerous shear forces on the
                  lumbar discs as a weaker worker. The intervertebral discs
                  have no muscular protection &mdash; they rely on{" "}
                  <strong className="text-white">correct spinal alignment</strong>{" "}
                  to distribute forces safely. No amount of strength
                  compensates for poor technique.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What Fitness DOES Help With
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Endurance:</strong>{" "}
                      fitter workers can sustain physical work for longer
                      before fatigue sets in
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Recovery:</strong> fitter
                      workers recover more quickly between tasks and between
                      shifts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Core stability:</strong>{" "}
                      strong core muscles support the spine during lifting
                      (but only when good technique is used)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Flexibility:</strong>{" "}
                      allows the body to move through the correct range of
                      motion without strain
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Key Principle:</strong>{" "}
                  Fitness <strong>supports</strong> safe manual handling but
                  does not <strong>replace</strong> good technique, proper
                  planning, or the use of mechanical aids. The hierarchy of
                  controls under the MHOR 1992 remains the same regardless of
                  a worker&rsquo;s fitness level.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Age Considerations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            Age Considerations
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The body&rsquo;s capacity for manual handling changes
                throughout a person&rsquo;s working life. Understanding these
                changes is essential for both workers and employers when
                assessing manual handling risks.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Age-Related Changes Affecting Manual Handling
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Disc degeneration from 30s:
                      </strong>{" "}
                      intervertebral discs lose water content and elasticity
                      naturally from the early 30s, reducing shock absorption
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduced muscle mass:
                      </strong>{" "}
                      sarcopenia (age-related muscle loss) begins from
                      approximately age 40 and accelerates from 60
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduced flexibility:
                      </strong>{" "}
                      tendons and ligaments become stiffer with age, reducing
                      range of motion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Slower recovery:
                      </strong>{" "}
                      older workers take longer to recover from physical
                      exertion and minor injuries
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduced bone density:
                      </strong>{" "}
                      bones become more brittle, increasing fracture risk
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    Experience vs Capability:
                  </strong>{" "}
                  Older workers bring invaluable experience &mdash; they are
                  often better at assessing risks, planning lifts, and using
                  correct technique. However, experience does not change the
                  physical reality of age-related degeneration. The best
                  approach is to combine the experience of older workers with
                  appropriate mechanical aids and task modifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Pregnancy & Manual Handling */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            Pregnancy &amp; Manual Handling
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Pregnancy creates{" "}
                <strong>specific and significant changes</strong> to the body
                that directly affect manual handling capacity. These changes
                require a dedicated risk assessment under the MHOR 1992 and
                the Management of Health and Safety at Work Regulations 1999
                (Regulation 16).
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Baby className="h-4 w-4 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Physical Changes During Pregnancy
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Relaxin hormone:
                      </strong>{" "}
                      loosens ligaments throughout the body (not just the
                      pelvis), reducing stability in the spine, knees, and
                      other joints
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Changed centre of gravity:
                      </strong>{" "}
                      the growing abdomen shifts the centre of gravity
                      forward, increasing the load on the lumbar spine and
                      affecting balance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduced abdominal muscle support:
                      </strong>{" "}
                      the abdominal muscles stretch as the pregnancy
                      progresses, reducing the core stability needed for safe
                      lifting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Increased fatigue:
                      </strong>{" "}
                      pregnancy increases metabolic demands, leading to
                      earlier onset of fatigue
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Legal Requirement
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The Management of Health and Safety at Work Regulations 1999
                  (Regulation 16) requires a{" "}
                  <strong className="text-white">
                    specific risk assessment for new and expectant mothers
                  </strong>{" "}
                  as soon as the employer is informed of the pregnancy. This
                  assessment must consider manual handling risks and be{" "}
                  <strong className="text-white">
                    reviewed as the pregnancy progresses
                  </strong>{" "}
                  because the worker&rsquo;s physical capabilities change
                  throughout each trimester.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 04: Pre-Existing Conditions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Pre-Existing Conditions
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Workers with pre-existing conditions are at{" "}
                <strong>significantly greater risk</strong> of injury during
                manual handling. The MHOR 1992 explicitly requires that
                individual capability &mdash; including pre-existing
                conditions &mdash; is considered as part of the risk
                assessment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Pre-Existing Conditions That Affect Manual Handling
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Previous back injury:
                      </strong>{" "}
                      weakened disc or muscle tissue is more susceptible to
                      re-injury
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Arthritis:</strong>{" "}
                      joint inflammation reduces range of motion and increases
                      pain under load
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hernias:</strong>{" "}
                      increased intra-abdominal pressure from lifting can
                      worsen or trigger recurrence
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Cardiovascular conditions:
                      </strong>{" "}
                      heavy lifting increases blood pressure and cardiac demand
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Previous joint surgery:
                      </strong>{" "}
                      operated joints may have reduced stability or restricted
                      movement
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Osteoporosis:</strong>{" "}
                      reduced bone density increases the risk of fractures
                      under load
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Duty to Disclose:</strong>{" "}
                  Workers have a responsibility to inform their employer of
                  any pre-existing condition that may affect their ability to
                  carry out manual handling safely. This is not about
                  discrimination &mdash; it is about ensuring that the right
                  adjustments are made to protect the worker&rsquo;s health.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Medication Effects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Medication Effects
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Medication can have a{" "}
                <strong>significant and often underestimated impact</strong> on
                manual handling safety. Both prescription and over-the-counter
                medications can affect a worker&rsquo;s ability to carry out
                manual handling safely.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Painkillers Masking Warning Pain
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  This is the most dangerous medication-related risk in
                  manual handling. Pain is the body&rsquo;s{" "}
                  <strong className="text-white">warning system</strong>.
                  When painkillers suppress this warning:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>The worker continues to stress damaged tissue without realising it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>A minor injury can rapidly become a severe injury</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>The worker may lift loads they would otherwise recognise as too heavy</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Other Medication Effects on Manual Handling
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Drowsiness:</strong>{" "}
                      many medications (antihistamines, some painkillers,
                      muscle relaxants) cause drowsiness and reduced alertness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduced coordination:
                      </strong>{" "}
                      some medications affect balance and fine motor control
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Dizziness:</strong>{" "}
                      blood pressure medications can cause dizziness,
                      particularly when standing from a crouched position
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Muscle weakness:
                      </strong>{" "}
                      some medications (statins, for example) can cause muscle
                      weakness or pain
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Fatigue Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Fatigue Management
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fatigue is one of the most significant — and most
                underestimated — risk factors for manual handling injury. A
                fatigued worker is a <strong>dangerous worker</strong>, not
                because of any personal failing, but because fatigue
                fundamentally impairs the body&rsquo;s ability to perform
                physical tasks safely.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Moon className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    How Fatigue Affects Manual Handling
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Reduced grip strength:</strong>{" "}
                      tired hands are weaker — loads are more likely to slip
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Poor posture:</strong>{" "}
                      muscles tire and workers adopt poor lifting postures to
                      compensate
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Impaired concentration:
                      </strong>{" "}
                      workers make poor decisions about loads, routes, and
                      techniques
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Slower reaction times:
                      </strong>{" "}
                      less able to respond to shifting loads or unexpected
                      hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shortcut-taking:</strong>{" "}
                      fatigue increases the temptation to skip proper
                      procedure to &ldquo;get it done&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    Effective Fatigue Management Strategies
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shift patterns:</strong>{" "}
                      avoid scheduling the heaviest manual handling at the end
                      of long shifts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rest breaks:</strong>{" "}
                      regular breaks are essential &mdash; short, frequent
                      breaks are more effective than one long break
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hydration:</strong>{" "}
                      even mild dehydration (2% body weight loss) reduces
                      muscle performance by up to 20%
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sleep quality:</strong>{" "}
                      workers should be encouraged to maintain good sleep
                      hygiene &mdash; 7&ndash;9 hours per night
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Task rotation:</strong>{" "}
                      rotate between heavy and light tasks to allow muscle
                      recovery
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: New & Young Workers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            New &amp; Young Workers
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                New and young workers (under 18, or new to the industry) are
                statistically at <strong>greater risk</strong> of manual
                handling injury. This is not simply about physical strength
                &mdash; it is about experience, awareness, and workplace
                culture.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    Why New &amp; Young Workers Are at Greater Risk
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Less experience:
                      </strong>{" "}
                      they cannot &ldquo;read&rdquo; a load or a task the way
                      an experienced worker can
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Poor risk recognition:
                      </strong>{" "}
                      they may not recognise an unstable load, an awkward
                      route, or a task that requires a team lift
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Desire to prove themselves:
                      </strong>{" "}
                      may take on loads that are too heavy rather than ask for
                      help
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        More likely to take shortcuts:
                      </strong>{" "}
                      less ingrained safety habits and a tendency towards
                      speed over safety
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reluctance to report:
                      </strong>{" "}
                      may not report symptoms or difficulties for fear of
                      appearing incapable
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    Supervision Requirement:
                  </strong>{" "}
                  New and young workers must receive closer supervision during
                  manual handling tasks. This includes direct observation,
                  pairing with experienced colleagues, clear instruction on
                  when to ask for help, and regular feedback on technique.
                  Supervision should be gradually reduced as competence is
                  demonstrated, not removed on day one.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Individual Capability Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">08</span>
            Individual Capability Assessment
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The &ldquo;I&rdquo; in the{" "}
                <strong>TILE assessment</strong> stands for{" "}
                <strong>Individual capability</strong>. This is not a
                tick-box exercise &mdash; it requires genuine consideration
                of the specific worker who will be carrying out each manual
                handling task.
              </p>

              {/* Personal Risk Factors Checklist Diagram */}
              <div className="bg-gradient-to-b from-emerald-500/5 to-emerald-500/15 border border-emerald-500/20 rounded-xl p-5 sm:p-6">
                <h4 className="text-sm font-bold text-emerald-400 mb-4 text-center">
                  Personal Risk Factors Checklist
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Age & Fitness */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-emerald-400">1</span>
                      </div>
                      <span className="text-xs font-semibold text-emerald-400">AGE &amp; FITNESS</span>
                    </div>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Age-related degeneration?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>General physical fitness level?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Body weight &amp; build?</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pre-Existing Conditions */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-amber-400">2</span>
                      </div>
                      <span className="text-xs font-semibold text-amber-400">PRE-EXISTING CONDITIONS</span>
                    </div>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Previous back/joint injury?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Arthritis, hernia, heart condition?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Recent surgery or treatment?</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pregnancy & Medication */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-red-400">3</span>
                      </div>
                      <span className="text-xs font-semibold text-red-400">PREGNANCY &amp; MEDICATION</span>
                    </div>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Pregnant or recently given birth?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Taking medication with side effects?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Painkillers masking symptoms?</span>
                      </li>
                    </ul>
                  </div>

                  {/* Experience & Training */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-blue-400">4</span>
                      </div>
                      <span className="text-xs font-semibold text-blue-400">EXPERIENCE &amp; TRAINING</span>
                    </div>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>New worker or experienced?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Manual handling training current?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Familiar with this specific task?</span>
                      </li>
                    </ul>
                  </div>

                  {/* Fatigue & Wellbeing */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-purple-400">5</span>
                      </div>
                      <span className="text-xs font-semibold text-purple-400">FATIGUE &amp; WELLBEING</span>
                    </div>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>End of a long shift?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Adequate rest &amp; hydration?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Sleep quality adequate?</span>
                      </li>
                    </ul>
                  </div>

                  {/* PPE & Clothing */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-teal-400">6</span>
                      </div>
                      <span className="text-xs font-semibold text-teal-400">PPE &amp; CLOTHING</span>
                    </div>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>PPE restricting movement?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Gloves reducing grip?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        <span>Footwear appropriate for task?</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-white/50 text-xs italic text-center mt-4">
                  All personal risk factors must be assessed for each individual
                  worker as part of the TILE assessment under MHOR 1992.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Musculoskeletal Disorders
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-5-section-3">
              Next: Incident Reporting &amp; Investigation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
