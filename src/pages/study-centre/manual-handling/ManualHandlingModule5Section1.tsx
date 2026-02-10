import {
  ArrowLeft,
  Activity,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  Heart,
  ShieldAlert,
  Stethoscope,
  Bone,
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
    id: "msd-definition",
    question:
      "Which of the following is NOT classified as a musculoskeletal disorder?",
    options: [
      "Carpal tunnel syndrome",
      "Disc herniation in the lumbar spine",
      "Asthma caused by dust inhalation",
      "Lateral epicondylitis (tennis elbow)",
    ],
    correctIndex: 2,
    explanation:
      "Asthma is a respiratory condition, not a musculoskeletal disorder. MSDs affect the muscles, tendons, ligaments, nerves, joints, cartilage, and spinal discs. Carpal tunnel syndrome, disc herniation, and lateral epicondylitis are all recognised MSDs that commonly result from manual handling activities.",
  },
  {
    id: "early-reporting",
    question:
      "Why is early reporting of MSD symptoms so important in the workplace?",
    options: [
      "It allows the employer to dismiss the worker before the condition worsens",
      "Early intervention leads to significantly better treatment outcomes and faster recovery",
      "It is only important for insurance purposes and has no medical benefit",
      "Early reporting is optional and only required for serious injuries",
    ],
    correctIndex: 1,
    explanation:
      "Early reporting is critical because early intervention leads to significantly better treatment outcomes. Many MSDs are progressive — they worsen over time if not addressed. Catching symptoms early allows for modified duties, ergonomic adjustments, physiotherapy referral, and other interventions that can prevent a minor issue from becoming a chronic, life-altering condition.",
  },
  {
    id: "return-to-work",
    question:
      "What is the primary purpose of a phased return-to-work programme after an MSD?",
    options: [
      "To test whether the worker is faking their injury",
      "To gradually increase workload and allow the body to readapt while monitoring recovery",
      "To ensure the worker returns to full duties on their first day back",
      "To reduce the employer's sick pay liability as quickly as possible",
    ],
    correctIndex: 1,
    explanation:
      "A phased return-to-work programme gradually increases the worker's hours and task demands over a period of weeks, allowing the body to readapt to physical work while the condition is monitored. This approach reduces the risk of re-injury, builds confidence, and typically results in a more sustainable long-term return to full duties.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between an acute MSD and a chronic MSD?",
    answer:
      "An acute MSD is a sudden injury — for example, a muscle tear from lifting a heavy load with poor technique. The onset is immediate and usually linked to a specific event. A chronic MSD develops gradually over weeks, months, or even years due to repetitive strain, sustained awkward postures, or cumulative overloading. Chronic MSDs are far more common in the workplace and are often harder to treat because the damage has accumulated over time before symptoms become noticeable.",
  },
  {
    question:
      "Can MSDs from manual handling be permanently disabling?",
    answer:
      "Yes. Severe or untreated MSDs can result in permanent disability. Chronic lower back pain is the leading cause of long-term sickness absence in the UK construction industry. Severe disc herniations can cause permanent nerve damage, leading to loss of sensation or muscle wasting in the legs. Untreated carpal tunnel syndrome can result in permanent loss of grip strength and fine motor control. This is why early reporting, proper treatment, and workplace adjustments are so important — they prevent minor issues from becoming life-changing conditions.",
  },
  {
    question:
      "Should I continue working if I have mild MSD symptoms like occasional back stiffness?",
    answer:
      "You should report any symptoms to your supervisor, no matter how mild they seem. Mild stiffness can be the early stage of a progressive condition. Your employer has a duty to assess your work and consider adjustments — this might include task rotation, lighter loads, more frequent rest breaks, or different equipment. Continuing to work through pain without reporting it allows the condition to worsen and makes it much harder to treat later. Reporting early is not a sign of weakness; it is the professional and responsible thing to do.",
  },
  {
    question:
      "What is the role of physiotherapy in treating workplace MSDs?",
    answer:
      "Physiotherapy is the most common and effective first-line treatment for workplace MSDs. A physiotherapist will assess the specific condition, identify contributing factors (such as muscle weakness, poor flexibility, or movement patterns), and design a tailored exercise and rehabilitation programme. Treatment may include manual therapy (hands-on treatment), specific strengthening exercises, stretching routines, posture correction, and ergonomic advice. Many employers provide occupational health physiotherapy services, and early referral significantly improves outcomes. Physiotherapy aims to restore function, reduce pain, and prevent recurrence.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following body structures are affected by musculoskeletal disorders?",
    options: [
      "Only bones and joints",
      "Muscles, tendons, ligaments, nerves, joints, cartilage, and spinal discs",
      "Only the spine and surrounding muscles",
      "Skin, blood vessels, and lymph nodes",
    ],
    correctAnswer: 1,
    explanation:
      "MSDs affect a wide range of structures in the musculoskeletal system: muscles, tendons, ligaments, nerves, joints, cartilage, and spinal discs. This is why they can present with such varied symptoms — from back pain and stiffness to tingling, numbness, and weakness in the extremities.",
  },
  {
    id: 2,
    question:
      "What is the medical term for the condition commonly known as 'tennis elbow'?",
    options: [
      "Carpal tunnel syndrome",
      "Rotator cuff tear",
      "Lateral epicondylitis",
      "Plantar fasciitis",
    ],
    correctAnswer: 2,
    explanation:
      "Lateral epicondylitis is the medical name for tennis elbow. It is caused by inflammation of the tendons on the outside of the elbow, typically from repetitive gripping, twisting, or lifting movements. It is a common MSD in electrical work due to the frequent use of hand tools and cable pulling.",
  },
  {
    id: 3,
    question:
      "Which MSD symptom should be treated as a warning sign that the condition may be worsening?",
    options: [
      "Feeling tired after a long shift",
      "Tingling or numbness in the hands or fingers",
      "Mild hunger during a physical task",
      "Sweating during heavy manual work",
    ],
    correctAnswer: 1,
    explanation:
      "Tingling or numbness indicates nerve involvement — this is a significant warning sign that the condition is affecting nerve function and may be progressing. It can indicate carpal tunnel syndrome, nerve compression from disc herniation, or other serious conditions that require prompt medical attention.",
  },
  {
    id: 4,
    question:
      "Lower back pain from manual handling most commonly involves which spinal structure?",
    options: [
      "The cervical vertebrae (neck)",
      "The thoracic vertebrae (mid-back)",
      "The lumbar intervertebral discs (L4/L5 and L5/S1)",
      "The coccyx (tailbone)",
    ],
    correctAnswer: 2,
    explanation:
      "The lumbar intervertebral discs, particularly at L4/L5 and L5/S1, are the most commonly affected structures in manual handling-related back pain. These discs bear the greatest load during lifting, bending, and twisting movements, making them vulnerable to bulging, herniation, and degeneration.",
  },
  {
    id: 5,
    question:
      "What is the FIRST step in managing an MSD that has been reported by a worker?",
    options: [
      "Send the worker for immediate surgery",
      "Assess the work activity and consider temporary modifications to reduce the risk",
      "Tell the worker to take painkillers and continue working",
      "Dismiss the worker from the task permanently",
    ],
    correctAnswer: 1,
    explanation:
      "The first step is to assess the work activity that may be causing or aggravating the condition and consider temporary modifications. This might include lighter loads, task rotation, more rest breaks, or the use of mechanical aids. Surgery is a last resort, and simply masking pain with medication allows the condition to worsen.",
  },
  {
    id: 6,
    question:
      "Which of the following is a key component of a phased return-to-work programme?",
    options: [
      "Returning to full duties immediately on the first day back",
      "Working only night shifts to avoid heavy lifting",
      "Gradually increasing hours and task demands over several weeks while monitoring recovery",
      "Performing only administrative tasks permanently",
    ],
    correctAnswer: 2,
    explanation:
      "A phased return gradually increases the worker's hours and the physical demands of their tasks over a period of weeks. This allows the body to readapt, builds confidence, and enables monitoring of the condition. The goal is a sustainable return to full duties, not a sudden jump back to demanding work.",
  },
  {
    id: 7,
    question:
      "Shoulder impingement syndrome is commonly caused by which type of manual handling activity?",
    options: [
      "Carrying loads at waist height",
      "Repeated overhead work — lifting, reaching, and working with arms above shoulder height",
      "Walking long distances while carrying light loads",
      "Sitting at a desk for extended periods",
    ],
    correctAnswer: 1,
    explanation:
      "Shoulder impingement is caused by repeated overhead movements that compress the tendons and bursa in the shoulder joint. Electricians are particularly at risk due to frequent overhead work — installing trunking, pulling cables through ceiling voids, and working on distribution boards mounted at height.",
  },
  {
    id: 8,
    question:
      "What is the long-term consequence of ignoring persistent MSD symptoms and continuing to work without modification?",
    options: [
      "The condition will always heal on its own given enough time",
      "Progressive damage leading to chronic pain, reduced function, and potentially permanent disability",
      "The body will adapt and the pain will disappear naturally",
      "There are no long-term consequences if the work is completed quickly",
    ],
    correctAnswer: 1,
    explanation:
      "Ignoring persistent MSD symptoms allows progressive damage to accumulate. Tendons become increasingly inflamed and can tear, discs continue to degenerate and can herniate further, and nerves become increasingly compressed. This can lead to chronic pain, permanent loss of function, and disability that could have been prevented with early intervention.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function ManualHandlingModule5Section1() {
  useSEO({
    title:
      "Musculoskeletal Disorders | Manual Handling Module 5.1",
    description:
      "Types of MSDs, symptoms, early reporting, treatment approaches, return-to-work programmes, and long-term management of musculoskeletal disorders from manual handling.",
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
            <Activity className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">
              MODULE 5 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Musculoskeletal Disorders
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the types, symptoms, treatment, and long-term
            management of musculoskeletal disorders caused by manual handling
            activities in the workplace
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
                  <strong>MSDs</strong> affect muscles, tendons, ligaments,
                  nerves, joints, cartilage &amp; spinal discs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Early reporting</strong> = better outcomes and faster
                  recovery
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Treatment:</strong> rest, physio, medication &mdash;
                  surgery only as last resort
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
                  <strong>Back pain</strong> is the #1 cause of long-term
                  sickness in construction
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Phased return:</strong> gradual increase in duties
                  over weeks
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Untreated MSDs</strong> can lead to permanent
                  disability
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
              "Define what musculoskeletal disorders are and which body structures they affect",
              "Identify the most common types of MSDs caused by manual handling",
              "Recognise the key symptoms that indicate an MSD is developing",
              "Explain why early reporting leads to better treatment outcomes",
              "Describe the treatment pathway from conservative management to surgery",
              "Outline the components of an effective return-to-work programme",
              "Understand the importance of long-term MSD management and prevention of recurrence",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Are Musculoskeletal Disorders? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            What Are Musculoskeletal Disorders?
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Musculoskeletal disorders (MSDs) are injuries or conditions that
                affect the{" "}
                <strong>
                  muscles, tendons, ligaments, nerves, joints, cartilage, and
                  spinal discs
                </strong>
                . They are the most common type of workplace injury in the UK,
                accounting for a significant proportion of all work-related
                ill-health cases reported to the HSE each year.
              </p>

              <p>
                In the context of manual handling, MSDs typically develop through
                two mechanisms: <strong>acute injury</strong> (a sudden event
                such as a muscle tear from lifting too heavy a load) or{" "}
                <strong>cumulative strain</strong> (gradual damage from
                repetitive movements, sustained awkward postures, or long-term
                overloading of the body).
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-2">
                  Structures Affected by MSDs
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Muscles</strong> &mdash;
                      strains, tears, chronic fatigue
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tendons</strong> &mdash;
                      tendinitis, tendinopathy, rupture
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ligaments</strong> &mdash;
                      sprains, instability, chronic laxity
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Nerves</strong> &mdash;
                      compression, entrapment, neuropathy
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Joints</strong> &mdash;
                      inflammation, arthritis, impingement
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cartilage</strong> &mdash;
                      wear, degeneration, meniscal tears
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Spinal discs</strong>{" "}
                      &mdash; bulging, herniation, degeneration
                    </span>
                  </div>
                </div>
              </div>

              <p>
                MSDs are not a single condition &mdash; they are a{" "}
                <strong>broad category of disorders</strong> that range from
                mild, temporary discomfort to severe, permanent disability. The
                earlier they are identified and managed, the better the
                outcome.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Common Types of MSDs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            Common Types of MSDs from Manual Handling
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following are the most common musculoskeletal disorders
                associated with manual handling activities in the electrical
                and construction industries.
              </p>

              {/* Back Pain & Disc Herniation */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Bone className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-white">
                    Back Pain &amp; Disc Herniation
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  The most common MSD in manual handling. The lumbar spine
                  (lower back) bears the greatest load during lifting, bending,
                  and twisting. The intervertebral discs at{" "}
                  <strong className="text-white">L4/L5</strong> and{" "}
                  <strong className="text-white">L5/S1</strong> are most
                  frequently affected.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Disc bulge:</strong> disc
                      wall weakens and bulges outward, pressing on nerves
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Disc herniation:</strong>{" "}
                      disc wall ruptures and the gel-like nucleus pushes out,
                      compressing the spinal nerve root
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sciatica:</strong> pain
                      radiating down the leg from nerve compression &mdash;
                      often caused by disc herniation at L4/L5 or L5/S1
                    </span>
                  </li>
                </ul>
              </div>

              {/* Shoulder Impingement */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Shoulder Impingement
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Caused by repeated overhead work &mdash; the tendons and
                  bursa in the shoulder become compressed between the bones of
                  the joint. Electricians are particularly at risk due to
                  frequent overhead cable installation, trunking work, and
                  distribution board mounting.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Pain when lifting the arm above shoulder height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Weakness in the affected arm, particularly when reaching</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Can progress to rotator cuff tears if untreated</span>
                  </li>
                </ul>
              </div>

              {/* Carpal Tunnel Syndrome */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Carpal Tunnel Syndrome
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Compression of the median nerve as it passes through the
                  carpal tunnel in the wrist. Caused by repetitive hand and
                  wrist movements, vibrating tools, and sustained gripping.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Tingling and numbness in the thumb, index, and middle fingers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Weakness in grip strength &mdash; dropping objects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Symptoms often worse at night and first thing in the morning</span>
                  </li>
                </ul>
              </div>

              {/* Tennis Elbow */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Lateral Epicondylitis (Tennis Elbow)
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Inflammation of the tendons on the outside of the elbow,
                  caused by repetitive gripping, twisting, and lifting
                  movements. Common in trades that involve frequent use of
                  hand tools, screwdrivers, and cable pulling.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Pain on the outer elbow that radiates down the forearm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Difficulty gripping objects &mdash; turning door handles, using tools</span>
                  </li>
                </ul>
              </div>

              {/* Knee Injuries */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Knee Injuries
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Prolonged kneeling, squatting, and carrying heavy loads all
                  place strain on the knee joints. Electricians frequently
                  kneel to install floor-level sockets, under-floor cabling,
                  and ground-level distribution equipment.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Bursitis:</strong>{" "}
                      inflammation of the fluid-filled sacs that cushion the
                      knee
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Meniscal tears:</strong>{" "}
                      damage to the cartilage from twisting under load
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Ligament strain:</strong>{" "}
                      from sudden movements or awkward positions
                    </span>
                  </li>
                </ul>
              </div>

              {/* Neck Pain */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Neck Pain (Cervical Strain)
                </p>
                <p className="text-sm text-white/80 mb-2">
                  Sustained awkward neck positions &mdash; looking up at
                  ceiling work, looking down at floor-level tasks, or carrying
                  loads on one shoulder &mdash; strain the cervical spine and
                  surrounding muscles.
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Stiffness and restricted movement of the neck</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Headaches originating from the base of the skull</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Pain radiating into the shoulders and arms if nerves are involved</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MSD Types & Affected Areas Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Stethoscope className="h-5 w-5 text-emerald-400" />
            MSD Types &amp; Affected Areas
          </h2>

          <div className="bg-gradient-to-b from-emerald-500/5 to-emerald-500/15 border border-emerald-500/20 rounded-xl p-5 sm:p-6">
            <h4 className="text-sm font-bold text-emerald-400 mb-5 text-center">
              Body Diagram &mdash; Common MSD Injury Locations
            </h4>

            {/* Body diagram using styled divs */}
            <div className="max-w-md mx-auto relative">
              {/* Head / Neck */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 text-right">
                  <span className="text-xs text-emerald-400 font-semibold">NECK</span>
                  <p className="text-xs text-white/60">Cervical strain</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-400 text-xs font-bold">C</span>
                </div>
                <div className="flex-1">
                  <span className="text-xs text-white/50 font-semibold">Headaches</span>
                  <p className="text-xs text-white/40">Nerve referral pain</p>
                </div>
              </div>

              {/* Shoulders */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 text-right">
                  <span className="text-xs text-amber-400 font-semibold">SHOULDER</span>
                  <p className="text-xs text-white/60">Impingement / rotator cuff</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-400 text-xs font-bold">S</span>
                  </div>
                  <div className="w-[2px] h-6 bg-white/10" />
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-400 text-xs font-bold">S</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-xs text-amber-400 font-semibold">SHOULDER</span>
                  <p className="text-xs text-white/60">Overhead work risk</p>
                </div>
              </div>

              {/* Elbow */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 text-right">
                  <span className="text-xs text-orange-400 font-semibold">ELBOW</span>
                  <p className="text-xs text-white/60">Tennis elbow</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-400 text-xs font-bold">E</span>
                </div>
                <div className="flex-1">
                  <span className="text-xs text-white/50 font-semibold">Lateral epicondylitis</span>
                  <p className="text-xs text-white/40">Repetitive gripping</p>
                </div>
              </div>

              {/* Wrist / Hand */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 text-right">
                  <span className="text-xs text-purple-400 font-semibold">WRIST &amp; HAND</span>
                  <p className="text-xs text-white/60">Carpal tunnel</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 text-xs font-bold">W</span>
                </div>
                <div className="flex-1">
                  <span className="text-xs text-white/50 font-semibold">Median nerve</span>
                  <p className="text-xs text-white/40">Tingling &amp; numbness</p>
                </div>
              </div>

              {/* Lower Back */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 text-right">
                  <span className="text-xs text-red-400 font-semibold">LOWER BACK</span>
                  <p className="text-xs text-white/60">L4/L5 &amp; L5/S1 discs</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 text-sm font-bold">LB</span>
                </div>
                <div className="flex-1">
                  <span className="text-xs text-red-400 font-semibold">HIGHEST RISK</span>
                  <p className="text-xs text-white/60">Herniation &amp; sciatica</p>
                </div>
              </div>

              {/* Knee */}
              <div className="flex items-center gap-3">
                <div className="flex-1 text-right">
                  <span className="text-xs text-blue-400 font-semibold">KNEE</span>
                  <p className="text-xs text-white/60">Bursitis &amp; meniscal</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-xs font-bold">K</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-500/40 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-xs font-bold">K</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-xs text-blue-400 font-semibold">KNEE</span>
                  <p className="text-xs text-white/60">Kneeling &amp; squatting</p>
                </div>
              </div>
            </div>

            <p className="text-white/50 text-xs italic text-center mt-5">
              The lower back (lumbar spine) is the highest-risk area for manual
              handling injuries, followed by the shoulders and knees.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Recognising MSD Symptoms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            Recognising MSD Symptoms
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Recognising the early symptoms of an MSD is critical. Many
                workers dismiss early warning signs as &ldquo;just a bit of
                ache&rdquo; or &ldquo;normal for the job.&rdquo; This attitude
                allows conditions to progress from treatable to chronic and
                potentially disabling.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Key MSD Symptoms to Watch For
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pain</strong> &mdash;
                      aching, sharp, burning, or throbbing in muscles or joints
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stiffness</strong> &mdash;
                      difficulty moving a joint or muscle, especially in the
                      morning
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Tingling</strong> &mdash;
                      pins and needles sensation, often in hands or feet
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Numbness</strong> &mdash;
                      loss of sensation, indicating nerve compression
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Weakness</strong> &mdash;
                      reduced strength, difficulty gripping or lifting
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Swelling</strong> &mdash;
                      visible inflammation around joints or tendons
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-white/80">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reduced range of motion
                      </strong>{" "}
                      &mdash; inability to move a joint through its full range
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Red Flag Symptoms &mdash; Seek Immediate Medical Attention
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Sudden severe pain during lifting &mdash; possible disc rupture or muscle tear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Loss of bladder or bowel control &mdash; cauda equina syndrome (medical emergency)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Progressive numbness or weakness in both legs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>Complete loss of grip strength in one or both hands</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Importance of Early Reporting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            The Importance of Early Reporting
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Early reporting is the single most important factor in
                achieving a good outcome from an MSD.{" "}
                <strong>
                  Early intervention = better outcomes
                </strong>
                . This is not just a health and safety slogan &mdash; it is
                backed by extensive medical evidence.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Why Early Reporting Matters
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Prevents progression:
                      </strong>{" "}
                      mild symptoms can be managed before they become chronic
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Enables workplace adjustments:
                      </strong>{" "}
                      your employer can modify tasks, provide mechanical aids,
                      or rotate duties
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Faster access to treatment:
                      </strong>{" "}
                      occupational health referral and physiotherapy can begin
                      promptly
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Protects your long-term health:
                      </strong>{" "}
                      avoids permanent damage that could end your career
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Creates a record:
                      </strong>{" "}
                      documented reports support any future claims and help
                      identify workplace trends
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-amber-400">Common Barriers to Reporting:</strong>{" "}
                  Many workers avoid reporting MSD symptoms because they fear
                  being seen as &ldquo;weak,&rdquo; worry about losing
                  overtime or being moved off a job, or believe the pain is
                  &ldquo;normal&rdquo; for the trade. These barriers are
                  dangerous. A culture where reporting is encouraged and acted
                  upon without penalty is essential for preventing serious
                  injury.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Treatment Approaches */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Treatment Approaches
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Treatment for MSDs follows a{" "}
                <strong>stepped approach</strong>, starting with the least
                invasive options and progressing only if necessary. Surgery is
                always a <strong>last resort</strong>.
              </p>

              <div className="space-y-3">
                {/* Step 1 */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-emerald-400">1</span>
                    </div>
                    <p className="text-sm font-medium text-emerald-400">
                      Rest &amp; Activity Modification
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Reduce or avoid the aggravating activity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Short-term rest &mdash; but NOT prolonged bed rest (this can worsen back pain)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Ice/heat therapy for acute inflammation</span>
                    </li>
                  </ul>
                </div>

                {/* Step 2 */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-emerald-400">2</span>
                    </div>
                    <p className="text-sm font-medium text-emerald-400">
                      Physiotherapy
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Tailored exercise programmes to strengthen and rehabilitate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Manual therapy &mdash; hands-on treatment by a physiotherapist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Posture correction and ergonomic advice</span>
                    </li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-amber-500/30 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-amber-400">3</span>
                    </div>
                    <p className="text-sm font-medium text-amber-400">
                      Medication
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Anti-inflammatory medication (NSAIDs) to reduce swelling and pain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Muscle relaxants for severe muscle spasm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Corticosteroid injections for persistent inflammation</span>
                    </li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-red-500/30 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-red-400">4</span>
                    </div>
                    <p className="text-sm font-medium text-red-400">
                      Surgery (Last Resort)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Disc surgery (discectomy/microdiscectomy) for severe herniation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Carpal tunnel release for persistent nerve compression</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Rotator cuff repair for complete tears</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Only considered when conservative treatment has failed over months</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Return-to-Work Programmes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Return-to-Work Programmes
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                After an MSD-related absence, a{" "}
                <strong>phased return-to-work programme</strong> is the gold
                standard for getting workers back to full duties safely and
                sustainably. Rushing back too quickly risks re-injury and
                longer-term absence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Components of a Phased Return
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Gradual increase in hours:
                      </strong>{" "}
                      start with reduced hours and build up over 2&ndash;6
                      weeks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Modified duties:
                      </strong>{" "}
                      lighter tasks initially, avoiding the specific movements
                      that caused the MSD
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Workplace adjustments:
                      </strong>{" "}
                      provision of mechanical aids, ergonomic equipment, or
                      task rotation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Regular review meetings:
                      </strong>{" "}
                      with the worker, supervisor, and occupational health
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ongoing physiotherapy:
                      </strong>{" "}
                      continued rehabilitation exercises alongside work
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">
                    The Goal:
                  </strong>{" "}
                  A phased return aims for a{" "}
                  <strong>sustainable return to full duties</strong> &mdash;
                  not the fastest possible return. Workers who return too
                  quickly often suffer re-injury and end up absent for even
                  longer. A well-managed phased return protects both the
                  worker and the employer.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Long-Term Management */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Long-Term Management
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many MSDs, particularly chronic conditions, require{" "}
                <strong>ongoing management</strong> even after the initial
                treatment phase is complete. Long-term management is about
                maintaining function, preventing recurrence, and adapting work
                practices for the future.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Long-Term Management Strategies
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Continued exercise:
                      </strong>{" "}
                      maintaining the strengthening and flexibility exercises
                      prescribed during rehabilitation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Technique awareness:
                      </strong>{" "}
                      consistently applying correct manual handling technique
                      to prevent re-injury
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Workplace modifications:
                      </strong>{" "}
                      permanent changes to tasks, equipment, or working
                      patterns where necessary
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Regular health monitoring:
                      </strong>{" "}
                      periodic occupational health reviews for workers with a
                      history of MSDs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Weight management:
                      </strong>{" "}
                      maintaining a healthy weight reduces load on the spine
                      and joints
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Prompt reporting of flare-ups:
                      </strong>{" "}
                      any return of symptoms should be reported immediately to
                      prevent a full relapse
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Remember:</strong>{" "}
                  An MSD that has occurred once is more likely to recur. The
                  tissue that was damaged is often weaker than before, even
                  after full recovery. Long-term management is not about
                  living in fear &mdash; it is about being{" "}
                  <strong>informed and proactive</strong> so you can continue
                  working safely throughout your career.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-4-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Mechanical Handling Aids
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-5-section-2">
              Next: Fitness, Fatigue &amp; Personal Factors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
