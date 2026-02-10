import {
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  Clock,
  Shuffle,
  Activity,
  Wrench,
  Eye,
  HeartPulse,
  Timer,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-m4s4-rsi",
    question:
      "What does WRULD stand for, and why is it significant for electricians?",
    options: [
      "Work-Related Uniform Lighting Directive — it governs site lighting",
      "Work-Related Upper Limb Disorders — a group of conditions affecting the hands, wrists, arms, shoulders, and neck caused by repetitive or sustained work postures",
      "Weekly Report on Unsafe Ladder Deployment — a site inspection form",
      "Workplace Regulation for Underground Line Distribution — a cable standard",
    ],
    correctIndex: 1,
    explanation:
      "WRULD stands for Work-Related Upper Limb Disorders. This term covers a range of conditions including carpal tunnel syndrome, tendinitis, tennis elbow, and shoulder impingement that develop from repetitive hand/arm movements, sustained awkward postures, and forceful gripping. Electricians are at particular risk because their work involves repetitive use of hand tools, sustained overhead reaching, and forceful gripping of cables and connectors.",
  },
  {
    id: "mh-m4s4-micro-breaks",
    question:
      "What is the recommended micro-break protocol for repetitive manual handling tasks?",
    options: [
      "One 60-minute break at the end of the shift",
      "A 5-minute break every 30 minutes of repetitive handling, with a change of posture or task",
      "No breaks are needed if the load is under 25 kg",
      "A 2-hour break after 6 hours of continuous work",
    ],
    correctIndex: 1,
    explanation:
      "HSE guidance recommends a micro-break of approximately 5 minutes every 30 minutes for tasks involving repetitive manual handling. During the break, the worker should change posture, move around, and if possible switch to a different type of task. These short, frequent breaks are more effective at preventing fatigue and injury than a single long break because they interrupt the cumulative loading cycle before tissue damage accumulates.",
  },
  {
    id: "mh-m4s4-warm-up",
    question:
      "Why is a warm-up before the start of a physical shift beneficial for reducing manual handling injuries?",
    options: [
      "It helps the worker decide what to wear for the day",
      "It increases blood flow to muscles, improves flexibility, and prepares joints for loading, reducing the risk of strains and sprains",
      "It is a legal requirement under the Manual Handling Operations Regulations 1992",
      "It makes the worker sweat, which improves grip",
    ],
    correctIndex: 1,
    explanation:
      "A warm-up increases blood flow to the muscles, raises muscle temperature, improves joint flexibility, and activates the neuromuscular system. Cold, stiff muscles are significantly more prone to strain and tear. A 5-10 minute warm-up of gentle stretching and movement at the start of a shift prepares the body for the physical demands ahead. While not a legal requirement, it is a recognised best practice endorsed by the HSE, occupational health professionals, and physiotherapists.",
  },
];

const faqs = [
  {
    question:
      "Can repetitive manual handling cause permanent damage, or does it always heal with rest?",
    answer:
      "Repetitive manual handling can cause permanent damage if the early warning signs are ignored and the exposure continues. Conditions such as carpal tunnel syndrome, chronic tendinitis, and degenerative disc disease can progress to a point where full recovery is not possible, even with treatment and prolonged rest. The key is early intervention — if you experience persistent pain, numbness, tingling, or weakness after repetitive handling tasks, report it to your employer and seek medical advice promptly. Early treatment (rest, physiotherapy, ergonomic adjustments) is far more effective than treating an established chronic condition.",
  },
  {
    question:
      "Is job rotation effective, or does it just move the problem to a different body part?",
    answer:
      "Job rotation is effective when it is designed to alternate the muscle groups and postures used, not just the task name. Rotating from one repetitive task (such as cable stripping) to a different repetitive task that uses the same hand and wrist muscles provides little benefit. Effective rotation alternates between tasks that use different body regions and different types of movement — for example, rotating between overhead cable tray installation (shoulders and arms), conduit bending at a workbench (upper body and core), and cable pulling (back and legs). The rotation schedule should be planned with input from the workers and, ideally, an occupational health professional.",
  },
  {
    question:
      "How do I know if I am developing a repetitive strain injury?",
    answer:
      "Early warning signs include persistent aching, pain, or tenderness in the hands, wrists, forearms, elbows, shoulders, or neck that develops during or after repetitive work. Other signs include tingling or numbness (especially in the fingers), reduced grip strength, stiffness in the joints (particularly in the morning or after rest), and swelling or inflammation around the tendons. These symptoms may initially appear only during work and ease with rest, but as the condition progresses they may become constant. If you notice any of these symptoms, report them early — waiting until the pain is severe significantly reduces the chances of a full recovery.",
  },
  {
    question:
      "Should my employer provide ergonomic tools, or is that my responsibility?",
    answer:
      "Under the Manual Handling Operations Regulations 1992 and the Provision and Use of Work Equipment Regulations 1998 (PUWER), the employer has a duty to provide suitable work equipment that minimises risk. This includes providing ergonomic tool options where they are available and reasonably practicable. For example, if a powered cable cutter reduces the repetitive gripping force required compared to a manual cutter, the employer should consider providing it for tasks that involve prolonged or repetitive cable cutting. However, the worker also has a responsibility to use the equipment provided correctly and to report any tools that are causing discomfort or difficulty.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary mechanism by which repetitive manual handling causes injury?",
    options: [
      "A single heavy lift that exceeds the body's capacity",
      "Cumulative micro-damage to muscles, tendons, ligaments, and spinal discs that exceeds the body's ability to repair between exposures",
      "Sudden impact from a dropped load",
      "Allergic reaction to the materials being handled",
    ],
    correctAnswer: 1,
    explanation:
      "Repetitive manual handling causes injury through the accumulation of micro-damage. Each individual lift or movement may be within safe limits, but when repeated hundreds or thousands of times, the small amounts of tissue stress accumulate faster than the body can repair them. Over time, this leads to inflammation, tissue breakdown, and chronic conditions. This is fundamentally different from an acute injury caused by a single excessive lift.",
  },
  {
    id: 2,
    question:
      "Which of the following is NOT a recognised work-related upper limb disorder (WRULD)?",
    options: [
      "Carpal tunnel syndrome",
      "Lateral epicondylitis (tennis elbow)",
      "De Quervain's tenosynovitis",
      "Seasonal affective disorder (SAD)",
    ],
    correctAnswer: 3,
    explanation:
      "Seasonal affective disorder (SAD) is a mood disorder related to seasonal changes in light, not a musculoskeletal condition caused by repetitive work. Carpal tunnel syndrome (compression of the median nerve in the wrist), lateral epicondylitis (inflammation of the tendons on the outside of the elbow), and De Quervain's tenosynovitis (inflammation of the tendons on the thumb side of the wrist) are all recognised WRULDs commonly associated with repetitive hand and arm work.",
  },
  {
    id: 3,
    question:
      "How does fatigue affect manual handling technique?",
    options: [
      "Fatigue has no effect on technique if the worker has been properly trained",
      "Fatigue causes the worker to unconsciously adopt shortcuts — bending from the back instead of squatting, twisting instead of stepping, and rushing to finish sooner",
      "Fatigue only affects workers over 50 years of age",
      "Fatigue improves technique because tired workers are more careful",
    ],
    correctAnswer: 1,
    explanation:
      "As fatigue develops, the body's ability to maintain correct posture and technique deteriorates. Tired muscles cannot sustain the controlled movements required for safe lifting. Workers begin to bend from the back (easier in the short term but higher risk) instead of squatting, twist the torso to avoid stepping around, and rush to complete the task sooner. This form deterioration is involuntary — even well-trained workers will adopt poor technique when fatigued. This is why rest breaks and task rotation are essential controls.",
  },
  {
    id: 4,
    question:
      "What is cumulative spinal loading?",
    options: [
      "The total weight of the spine itself",
      "The progressive accumulation of compressive and shear forces on the spinal discs from repeated lifting, which causes micro-damage over time",
      "The weight of a load when stacked on top of the head",
      "A condition that only affects people who never exercise",
    ],
    correctAnswer: 1,
    explanation:
      "Cumulative spinal loading refers to the progressive accumulation of forces on the spinal discs from repeated lifting and handling. Each lift creates compressive and shear forces on the lumbar discs. While a single lift within safe limits does not cause damage, hundreds of lifts per day, day after day, can cause micro-tears in the disc annulus (outer ring), gradual loss of disc height, and degeneration. Over months and years, this leads to chronic lower back pain, disc bulges, and prolapsed discs.",
  },
  {
    id: 5,
    question:
      "How frequently should job rotation occur to be effective as a manual handling control?",
    options: [
      "Once per week is sufficient",
      "Every 1-2 hours, alternating between tasks that use different muscle groups and postures",
      "Only when the worker requests a change",
      "Every 8 hours (once per shift)",
    ],
    correctAnswer: 1,
    explanation:
      "For job rotation to be effective as a manual handling control, it should occur every 1-2 hours. This frequency is based on the time it takes for cumulative fatigue to develop in specific muscle groups. The rotation must alternate between tasks that genuinely use different body regions — rotating between two tasks that both involve heavy lifting provides no meaningful muscle recovery. A rotation schedule should be planned in advance and adhered to, not left to individual discretion.",
  },
  {
    id: 6,
    question:
      "Which warm-up activity is most appropriate before a shift involving repetitive manual handling?",
    options: [
      "Static stretching of the hamstrings for 60 seconds",
      "Gentle dynamic movements including arm circles, torso rotations, squats, and walking, followed by light stretching of the major muscle groups",
      "Sprinting 100 metres to raise the heart rate quickly",
      "Sitting quietly for 10 minutes to conserve energy",
    ],
    correctAnswer: 1,
    explanation:
      "A dynamic warm-up is most appropriate before physical work. This involves gentle movement that progressively increases blood flow and muscle temperature — arm circles, torso rotations, squats, calf raises, and walking. This prepares the muscles, joints, and cardiovascular system for the demands ahead. Static stretching (holding a stretch position) is more appropriate after work or during breaks. Intense exercise like sprinting is inappropriate as it causes fatigue rather than preparing the body.",
  },
  {
    id: 7,
    question:
      "What is the advantage of a powered cable cutter over a manual ratchet cutter from a repetitive handling perspective?",
    options: [
      "Powered cutters are always cheaper to purchase",
      "Powered cutters eliminate the repetitive high-force gripping required by manual cutters, reducing the cumulative loading on the hand, wrist, and forearm",
      "Powered cutters cut cables less neatly",
      "There is no advantage — both create the same level of strain",
    ],
    correctAnswer: 1,
    explanation:
      "Manual ratchet cable cutters require the operator to repeatedly squeeze a high-resistance handle, generating significant gripping force with each cut. Over dozens or hundreds of cuts per day, this creates cumulative loading on the intrinsic hand muscles, the flexor tendons of the fingers, the wrist, and the forearm. A powered cable cutter performs the cutting action mechanically, requiring only a light trigger squeeze from the operator. This dramatically reduces the cumulative force transmitted through the hand and wrist.",
  },
  {
    id: 8,
    question:
      "Why is early reporting of symptoms important for repetitive handling injuries?",
    options: [
      "Because early symptoms are always more painful than late symptoms",
      "Because early intervention (rest, physiotherapy, ergonomic changes) is far more likely to achieve full recovery than treatment of an established chronic condition",
      "Because the HSE fines workers who do not report symptoms within 24 hours",
      "Because early reporting automatically qualifies the worker for compensation",
    ],
    correctAnswer: 1,
    explanation:
      "Repetitive handling injuries progress through stages. In the early stage, symptoms (pain, tingling, stiffness) appear during work but ease with rest — at this point, relatively simple interventions (modified duties, physiotherapy, ergonomic changes) can often achieve full recovery. In the intermediate stage, symptoms persist outside work and take longer to resolve. In the advanced stage, the condition may be chronic and permanent, with limited treatment options. Early reporting starts the intervention process at the stage where it is most likely to succeed.",
  },
];

export default function ManualHandlingModule4Section4() {
  useSEO({
    title:
      "Repetitive Handling & Cumulative Risk | Manual Handling Module 4.4",
    description:
      "Repetitive strain injuries, cumulative spinal loading, fatigue effects, job rotation, micro-breaks, warm-ups, ergonomic tools, and early intervention for electricians.",
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
            <Link to="../manual-handling-module-4">
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
            <RefreshCw className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 4 &middot; SECTION 4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Repetitive Handling &amp; Cumulative Risk
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding repetitive strain, cumulative spinal loading, fatigue
            management, job rotation, micro-breaks, warm-up protocols,
            ergonomic tools, and early intervention
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
                  <strong>RSI/WRULD:</strong> repetitive work damages muscles,
                  tendons, nerves
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Cumulative:</strong> many small lifts cause more
                  damage than one heavy one
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Fatigue:</strong> tired workers adopt poor technique
                  unconsciously
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Breaks:</strong> 5 min every 30 min for repetitive
                  tasks
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Rotate:</strong> switch tasks every 1&ndash;2 hours,
                  different muscles
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Report early:</strong> pain, tingling, numbness =
                  seek help now
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain what RSI and WRULD are and how they develop in electrical work",
              "Describe the mechanism of cumulative spinal loading from repeated lifts",
              "Identify how fatigue causes deterioration of lifting technique",
              "Apply job rotation and micro-break protocols to reduce cumulative risk",
              "Describe the benefits of warm-up and stretching before physical work",
              "Select ergonomic tool alternatives to reduce repetitive strain",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Repetitive Strain Injuries (RSI / WRULD) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            Repetitive Strain Injuries (RSI / WRULD)
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Repetitive strain injury (RSI)</strong> is a general
                term for pain and damage in muscles, tendons, and nerves caused
                by repetitive movement and overuse. In occupational health, the
                more precise term is{" "}
                <strong>WRULD &mdash; Work-Related Upper Limb
                Disorders</strong>. This covers a group of conditions affecting
                the fingers, hands, wrists, forearms, elbows, shoulders, and
                neck.
              </p>

              <p>
                Electricians are at <strong>particular risk</strong> of WRULD
                because their daily work involves repetitive use of hand tools
                (screwdrivers, pliers, strippers, crimpers), sustained gripping
                of cables and connectors, prolonged overhead reaching (cable
                tray installation, ceiling work), and forceful hand movements
                (tightening fixings, pulling cable). These activities, repeated
                hundreds or thousands of times per day, create cumulative
                loading on the tendons, tendon sheaths, and nerves of the
                upper limbs.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Common WRULDs in Electricians
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">
                      Carpal tunnel syndrome:
                    </strong>{" "}
                    Compression of the median nerve in the wrist. Causes
                    tingling, numbness, and weakness in the thumb, index, and
                    middle fingers. Associated with repetitive flexion/extension
                    of the wrist and sustained gripping.
                  </p>
                  <p>
                    <strong className="text-white">
                      Lateral epicondylitis (tennis elbow):
                    </strong>{" "}
                    Inflammation of the tendons on the outside of the elbow.
                    Causes pain when gripping, twisting, or lifting. Associated
                    with repetitive use of screwdrivers, wrenches, and pliers.
                  </p>
                  <p>
                    <strong className="text-white">
                      Tenosynovitis:
                    </strong>{" "}
                    Inflammation of the tendon sheath, often in the wrist or
                    thumb. Causes pain, swelling, and a grating sensation when
                    moving the affected tendon. Associated with repetitive
                    gripping and twisting movements.
                  </p>
                  <p>
                    <strong className="text-white">
                      Shoulder impingement:
                    </strong>{" "}
                    Compression of the rotator cuff tendons in the shoulder.
                    Causes pain when reaching overhead or behind the body.
                    Associated with prolonged overhead work such as ceiling
                    installation and cable tray fitting.
                  </p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  WRULDs develop gradually and can become <strong>permanent
                  and disabling</strong> if not addressed early. Many
                  electricians dismiss early symptoms (&ldquo;just a bit of
                  aching&rdquo;) and continue working. By the time they seek
                  medical help, the condition may have progressed to a point
                  where full recovery is not possible. Early reporting and
                  early intervention are critical.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Cumulative Spinal Loading */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            Cumulative Spinal Loading
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The concept of cumulative spinal loading explains why many
                manual handling injuries develop over months and years rather
                than from a single incident. Each time a person lifts a load,
                compressive and shear forces are applied to the{" "}
                <strong>intervertebral discs</strong> of the lumbar spine. A
                single lift within safe limits does not cause damage &mdash;
                the disc is designed to absorb and distribute these forces.
              </p>

              <p>
                However, when lifts are repeated <strong>hundreds of times
                per day</strong>, the cumulative effect exceeds the disc&rsquo;s
                ability to recover between exposures. Each lift causes a tiny
                amount of micro-damage to the <strong>annulus fibrosus</strong>{" "}
                (the outer ring of the disc). Over time, these micro-tears
                accumulate, the annulus weakens, and the disc becomes vulnerable
                to <strong>bulging or prolapse</strong> (commonly called a
                &ldquo;slipped disc&rdquo;). This can compress nerves, causing
                pain, numbness, and weakness in the legs (sciatica).
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-emerald-400">Key Point:</strong> The
                  dangerous aspect of cumulative loading is that it is{" "}
                  <strong>painless in the early stages</strong>. The micro-damage
                  accumulates without symptoms. By the time pain appears, the
                  disc has already suffered significant degeneration. This is
                  why preventive controls (rotation, breaks, correct technique)
                  must be applied <em>before</em> symptoms develop, not in
                  response to them.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Factors That Accelerate Cumulative Spinal Loading
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      High frequency of lifts &mdash; more lifts per hour means
                      faster accumulation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Heavier loads &mdash; higher force per lift means more
                      damage per exposure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Poor technique &mdash; bending from the back increases
                      disc pressure by 40&ndash;60% compared to squatting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Twisting while lifting &mdash; adds shear forces that the
                      disc is least able to resist
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      Insufficient recovery time &mdash; short breaks between
                      lifts do not allow disc rehydration
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Fatigue and Technique Deterioration */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Fatigue &amp; Technique Deterioration
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fatigue is the silent underminer of safe manual handling. A
                worker who demonstrates perfect lifting technique during a
                training session in the morning may be lifting with dangerous
                form by mid-afternoon. This is not laziness or carelessness
                &mdash; it is a <strong>physiological consequence of muscle
                fatigue</strong>. Tired muscles cannot sustain the controlled,
                coordinated movements required for safe lifting.
              </p>

              <p>
                As fatigue develops, several changes occur in lifting behaviour:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How Fatigue Changes Lifting Behaviour
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Back bending replaces squatting:</strong> tired
                      leg muscles make it easier to bend from the back, which
                      places 40&ndash;60% more load on the lumbar discs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Twisting replaces stepping:</strong> instead of
                      moving the feet to face the target, the tired worker
                      twists the torso while holding the load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Rushing replaces control:</strong> the desire to
                      finish the task leads to faster, less controlled movements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Grip weakens:</strong> forearm muscles fatigue
                      first, increasing the risk of load slippage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Reaction time slows:</strong> a shifting load that
                      would be corrected immediately when fresh may not be
                      caught in time when fatigued
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Recognising the onset of fatigue is a skill that must be
                developed alongside lifting technique. The early signs include
                a burning or heavy sensation in the working muscles, increasing
                effort to maintain posture, and a growing temptation to
                &ldquo;just get it done&rdquo; rather than following the
                correct method. When these signs appear, it is time to take a
                break or switch to a different task.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Job Rotation Strategies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Job Rotation Strategies
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Job rotation is a systematic approach to reducing cumulative
                loading by alternating workers between tasks that use{" "}
                <strong>different muscle groups and postures</strong>.
                Effective rotation allows the muscles used in one task to
                recover while the worker performs a different task using
                different muscles. The key word is <em>different</em> &mdash;
                rotating between two tasks that both involve overhead reaching
                provides no recovery for the shoulders.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shuffle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Effective Rotation Examples for Electricians
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Morning (2 hours):</strong>{" "}
                    Cable tray installation &mdash; overhead work using
                    shoulders and arms, standing on scaffold platform.
                  </p>
                  <p>
                    <strong className="text-white">Mid-morning (2 hours):</strong>{" "}
                    Conduit bending and fixing at waist height &mdash; different
                    posture, different muscle groups, workbench-based.
                  </p>
                  <p>
                    <strong className="text-white">Afternoon (2 hours):</strong>{" "}
                    Cable pulling &mdash; whole-body effort using legs and back,
                    ground-level work.
                  </p>
                  <p>
                    <strong className="text-white">Late afternoon (2 hours):</strong>{" "}
                    Testing and inspection &mdash; light physical work, mainly
                    walking between test points with a lightweight instrument.
                  </p>
                </div>
              </div>

              <p>
                In practice, rotation is not always possible on every site or
                every day. When rotation between different tasks is not
                feasible, the alternative is to vary the <em>posture</em>{" "}
                within the same task. For example, when running cable in a long
                corridor, alternate between working at different sections to
                avoid sustained overhead reaching in one position. Even small
                changes in body position provide some relief to the loaded
                muscles.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Micro-Break Protocols */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Micro-Break Protocols
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>micro-break</strong> is a short break of
                approximately <strong>5 minutes every 30 minutes</strong>{" "}
                during repetitive or sustained manual handling tasks. Research
                consistently shows that short, frequent breaks are{" "}
                <strong>significantly more effective</strong> at preventing
                fatigue and injury than a single long break at the end of a
                period of work. This is because they interrupt the cumulative
                loading cycle before tissue damage accumulates to a harmful
                level.
              </p>

              <p>
                During a micro-break, the worker should:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What to Do During a Micro-Break
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Stop the repetitive task</strong> completely
                      &mdash; do not just slow down
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Change posture</strong> &mdash; if you were
                      standing, sit briefly; if overhead, lower your arms
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Gently stretch</strong> the muscles that were
                      working &mdash; wrists, forearms, shoulders, back
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Hydrate</strong> &mdash; drink water regularly
                      throughout the shift
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Assess</strong> how you feel &mdash; any new pain,
                      tingling, or stiffness should be noted and reported if
                      persistent
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-emerald-400">Key Point:</strong> Micro-
                  breaks are not &ldquo;time off&rdquo; &mdash; they are a{" "}
                  <strong>productivity and safety measure</strong>. Workers who
                  take regular micro-breaks maintain better technique, make fewer
                  errors, sustain a higher quality of work, and are significantly
                  less likely to develop musculoskeletal injuries. The 5 minutes
                  invested in a break is recovered many times over through
                  reduced injury absence and sustained performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Warm-Up and Stretching */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Warm-Up &amp; Stretching
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>warm-up before the start of a physical shift</strong>{" "}
                prepares the body for the demands ahead. Cold, stiff muscles are
                significantly more prone to strain and tear than warm, flexible
                muscles. The first hour of the morning shift &mdash;
                particularly in cold weather &mdash; is when the highest
                proportion of manual handling strains occur, because workers
                start lifting heavy items before their muscles are ready.
              </p>

              <p>
                An effective pre-shift warm-up takes <strong>5&ndash;10
                minutes</strong> and consists of two phases:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Pre-Shift Warm-Up Protocol
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">
                      Phase 1 &mdash; Dynamic movement (3&ndash;5 minutes):
                    </strong>{" "}
                    Brisk walking, arm circles (forward and backward), torso
                    rotations, bodyweight squats, calf raises, and gentle
                    lunges. The purpose is to raise heart rate, increase blood
                    flow to muscles, and raise muscle temperature. Movements
                    should be gentle and progressive &mdash; not intense.
                  </p>
                  <p>
                    <strong className="text-white">
                      Phase 2 &mdash; Light stretching (2&ndash;5 minutes):
                    </strong>{" "}
                    Gentle stretches targeting the hamstrings, quadriceps, hip
                    flexors, lower back, shoulders, wrists, and forearms. Hold
                    each stretch for 10&ndash;15 seconds &mdash; this is not
                    deep static stretching (which is more appropriate after
                    work). The goal is to take each muscle group through its
                    range of motion and ensure there are no restrictions or
                    pain before starting work.
                  </p>
                </div>
              </div>

              <p>
                Mid-shift stretching during breaks is also beneficial. After
                sustained work in one posture, gentle stretching of the
                working muscles helps restore blood flow, remove metabolic
                waste products, and maintain flexibility. Stretching at the
                end of the shift helps with recovery and reduces next-day
                stiffness.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Ergonomic Tool Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">07</span>
            Ergonomic Tool Selection
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Selecting the right tools can <strong>dramatically reduce</strong>{" "}
                the repetitive forces transmitted through the hands, wrists,
                and arms. In many cases, a powered alternative exists that
                performs the same task with a fraction of the manual effort.
                While powered tools have an upfront cost, the reduction in
                musculoskeletal injury risk and the improvement in productivity
                make them a sound investment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Ergonomic Tool Alternatives
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Manual cable cutters &rarr; powered cable
                      cutters:</strong> eliminates high-force repetitive
                      gripping
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Manual crimpers &rarr; battery crimping
                      tools:</strong> reduces the squeeze force from 30&ndash;50
                      kg to a light trigger press
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Manual screwdrivers &rarr; cordless impact
                      drivers:</strong> reduces wrist torque for repetitive
                      fixing tasks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Standard pliers &rarr; spring-loaded or
                      ratcheting pliers:</strong> reduces the sustained grip
                      force required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Manual cable strippers &rarr; automatic
                      strippers:</strong> reduces repetitive wrist twisting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Standard hand tools &rarr; padded-grip
                      versions:</strong> reduces contact pressure on the palm
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Tool weight also matters. A lighter tool reduces the sustained
                load on the arm and shoulder, particularly for overhead work.
                When choosing between tools of similar capability, select the
                lighter option. Lithium-ion battery tools have become
                significantly lighter than their predecessors, making them
                more suitable for sustained and overhead use.
              </p>
            </div>
          </div>
        </section>

        {/* Section 08: Monitoring and Early Intervention */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">08</span>
            Monitoring &amp; Early Intervention
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Monitoring for early signs of repetitive handling injury is a
                shared responsibility between the employer and the worker. The
                employer should have systems in place to identify patterns of
                musculoskeletal complaints, track sickness absence related to
                manual handling, and provide access to occupational health
                assessment. The worker should be vigilant for symptoms in
                themselves and their colleagues and report them promptly.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Early Warning Signs to Report
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Stage 1 (early):</strong>{" "}
                    Aching, tiredness, or discomfort in the hands, wrists,
                    arms, shoulders, or back that appears during work but eases
                    completely with overnight rest. Performance and strength
                    are not yet affected.
                  </p>
                  <p>
                    <strong className="text-white">Stage 2 (intermediate):</strong>{" "}
                    Symptoms persist outside work hours and may disturb sleep.
                    Reduced capacity for repetitive tasks. Tingling or numbness
                    may appear. Symptoms take longer to ease with rest (days
                    rather than hours).
                  </p>
                  <p>
                    <strong className="text-white">Stage 3 (advanced):</strong>{" "}
                    Constant pain, weakness, or numbness. Difficulty performing
                    normal daily activities. Sleep is significantly disrupted.
                    Work capacity is substantially reduced. Full recovery may
                    not be achievable.
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Act at Stage 1
                  </p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  The window for effective intervention is at{" "}
                  <strong>Stage 1</strong>. At this point, simple changes
                  &mdash; modified duties, additional breaks, ergonomic tool
                  changes, physiotherapy &mdash; can often achieve full
                  recovery. By Stage 3, the condition may be chronic and
                  irreversible. Do not wait for symptoms to become severe before
                  reporting them. Early reporting is not a sign of weakness
                  &mdash; it is a sign of professional self-awareness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagram: Fatigue Curve */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">09</span>
            Fatigue Curve: Performance vs Time
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following diagram illustrates how performance and technique
                quality decline over time during sustained repetitive handling,
                and how micro-breaks and task rotation interrupt this decline.
              </p>

              {/* Styled-div diagram */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <TrendingDown className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">
                      Fatigue Curve &mdash; Performance vs Time
                    </span>
                  </div>
                </div>

                {/* Visual fatigue curve using styled divs */}
                <div className="space-y-3">
                  {/* Without breaks */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingDown className="h-5 w-5 text-red-400" />
                      <p className="text-sm font-semibold text-red-400">
                        Without Breaks (Continuous Work)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-16 flex-shrink-0">0&ndash;30 min</span>
                        <div className="flex-1 h-4 bg-emerald-500/30 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "95%" }} />
                        </div>
                        <span className="text-xs text-white/60 w-12 text-right flex-shrink-0">95%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-16 flex-shrink-0">30&ndash;60 min</span>
                        <div className="flex-1 h-4 bg-emerald-500/30 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: "80%" }} />
                        </div>
                        <span className="text-xs text-white/60 w-12 text-right flex-shrink-0">80%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-16 flex-shrink-0">1&ndash;2 hrs</span>
                        <div className="flex-1 h-4 bg-emerald-500/30 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "60%" }} />
                        </div>
                        <span className="text-xs text-white/60 w-12 text-right flex-shrink-0">60%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-16 flex-shrink-0">2&ndash;4 hrs</span>
                        <div className="flex-1 h-4 bg-emerald-500/30 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "35%" }} />
                        </div>
                        <span className="text-xs text-white/60 w-12 text-right flex-shrink-0">35%</span>
                      </div>
                    </div>
                    <p className="text-xs text-red-400/80 mt-2">
                      Technique deteriorates steadily. Injury risk increases
                      sharply after 1 hour of continuous repetitive handling.
                    </p>
                  </div>

                  {/* With breaks */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Timer className="h-5 w-5 text-emerald-400" />
                      <p className="text-sm font-semibold text-emerald-400">
                        With Micro-Breaks (5 min every 30 min)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-16 flex-shrink-0">0&ndash;30 min</span>
                        <div className="flex-1 h-4 bg-emerald-500/30 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "95%" }} />
                        </div>
                        <span className="text-xs text-white/60 w-12 text-right flex-shrink-0">95%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-emerald-400/50 w-16 flex-shrink-0 font-medium">BREAK</span>
                        <div className="flex-1 h-2 border-t border-dashed border-emerald-400/30" />
                        <span className="text-xs text-emerald-400/50 w-12 text-right flex-shrink-0">reset</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-16 flex-shrink-0">35&ndash;65 min</span>
                        <div className="flex-1 h-4 bg-emerald-500/30 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "90%" }} />
                        </div>
                        <span className="text-xs text-white/60 w-12 text-right flex-shrink-0">90%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-emerald-400/50 w-16 flex-shrink-0 font-medium">BREAK</span>
                        <div className="flex-1 h-2 border-t border-dashed border-emerald-400/30" />
                        <span className="text-xs text-emerald-400/50 w-12 text-right flex-shrink-0">reset</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-16 flex-shrink-0">70&ndash;100 min</span>
                        <div className="flex-1 h-4 bg-emerald-500/30 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "85%" }} />
                        </div>
                        <span className="text-xs text-white/60 w-12 text-right flex-shrink-0">85%</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-emerald-400/50 w-16 flex-shrink-0 font-medium">BREAK</span>
                        <div className="flex-1 h-2 border-t border-dashed border-emerald-400/30" />
                        <span className="text-xs text-emerald-400/50 w-12 text-right flex-shrink-0">reset</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/50 w-16 flex-shrink-0">2&ndash;4 hrs</span>
                        <div className="flex-1 h-4 bg-emerald-500/30 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500/80 rounded-full" style={{ width: "80%" }} />
                        </div>
                        <span className="text-xs text-white/60 w-12 text-right flex-shrink-0">80%</span>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-400/80 mt-2">
                      Performance remains high throughout. Technique is
                      maintained. Injury risk stays low. Total productive output
                      is higher despite the break time.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-xs text-white/60 leading-relaxed">
                    <strong className="text-emerald-400">Key Insight:</strong>{" "}
                    After 4 hours of continuous work, performance drops to
                    approximately 35% &mdash; meaning the worker is operating
                    at barely one-third capacity with significantly increased
                    injury risk. With micro-breaks, performance at the 4-hour
                    mark remains at approximately 80%. The total work output
                    with breaks is <em>higher</em> than without breaks, because
                    the sustained high performance more than compensates for the
                    break time.
                  </p>
                </div>
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-[#1a1a1a] hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-5">
              Next: Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
