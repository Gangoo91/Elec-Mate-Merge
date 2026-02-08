import { ArrowLeft, HeartPulse, CheckCircle, AlertTriangle, PersonStanding, Thermometer, HardHat, ShieldCheck, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "fitness-3-point-contact",
    question: "What does the '3-point contact' rule mean when climbing a mobile tower?",
    options: [
      "Contact three people before climbing",
      "Always maintain three points of contact with the ladder — two hands and one foot, or two feet and one hand",
      "Climb three rungs at a time for speed",
      "Touch three different tower components during the climb"
    ],
    correctIndex: 1,
    explanation: "The 3-point contact rule requires that you always maintain contact with the ladder at three points simultaneously: either two hands and one foot, or two feet and one hand. This ensures stability and prevents falls during climbing. It also means you must never carry tools or materials while climbing — use a hoisting line instead."
  },
  {
    id: "fitness-wind-cease-work",
    question: "At what wind speed should work on a mobile tower cease?",
    options: [
      "Beaufort Force 2 (light breeze, 7 mph)",
      "Beaufort Force 4 (moderate breeze, 17 mph)",
      "Beaufort Force 8 (gale, 40 mph)",
      "Work should continue regardless of wind speed"
    ],
    correctIndex: 1,
    explanation: "Work on a mobile tower should cease at Beaufort Force 4 — a moderate breeze of approximately 17 mph (28 km/h). At this level, loose paper is blown about, small branches move, and dust is raised. At Beaufort Force 6 (28 mph / 45 km/h), the tower should be dismantled or tied to a permanent structure. Wind loads increase with the square of the wind speed, meaning even modest increases in wind create significantly greater forces on the tower."
  },
  {
    id: "fitness-tile-assessment",
    question: "What does the TILE acronym stand for in manual handling assessment?",
    options: [
      "Time, Instruction, Lifting, Equipment",
      "Task, Individual, Load, Environment",
      "Tower, Inspection, Level, Elevation",
      "Training, Implementation, Legislation, Enforcement"
    ],
    correctIndex: 1,
    explanation: "TILE stands for Task (what does the activity involve?), Individual (who is doing it — are they fit and trained?), Load (how heavy, how awkward, can it be gripped?), and Environment (ground conditions, space, temperature, lighting). This structured assessment helps identify manual handling risks before they cause injury."
  }
];

const faqs = [
  {
    question: "Can someone with a fear of heights work on a mobile tower?",
    answer: "A fear of heights (acrophobia) or vertigo does not automatically prevent someone from working on a mobile tower, but it must be assessed honestly. If the condition causes dizziness, nausea, freezing, or panic at height, the person should not work on the tower — these reactions could lead to a fall. Mild anxiety that is manageable and does not impair function may be acceptable, but the individual must make an honest self-assessment. If in doubt, seek medical guidance. No one should feel pressured to work at height if they are not comfortable doing so."
  },
  {
    question: "What PPE is required for working on a mobile tower?",
    answer: "The minimum PPE during assembly and dismantling includes a safety helmet to EN 397 (with chin strap where there is a risk of the helmet being dislodged), safety footwear to EN ISO 20345 with toe protection, and work gloves suitable for handling metal components. Near traffic routes, high-visibility clothing is required. A fall-arrest harness is only required when specified by the method statement — for example, during the assembly of the guardrail level when guardrails are not yet in place. During normal use of a fully assembled tower with guardrails, a harness is not typically required."
  },
  {
    question: "What should I do if I feel unwell while working on a mobile tower?",
    answer: "Stop working immediately and descend the tower using the internal ladder while you are still able to do so (self-rescue). Do not try to 'push through it.' Symptoms like dizziness, nausea, blurred vision, chest pain, or sudden weakness could deteriorate rapidly, and being incapacitated at height creates a far more dangerous rescue situation than descending early. Once at ground level, inform your supervisor, rest, and seek medical attention if needed. Do not return to the tower until you are confident you are fit to do so."
  },
  {
    question: "Is there a maximum age for working on mobile towers?",
    answer: "There is no maximum age limit for working on mobile towers. Fitness to work at height is based on physical and mental capability, not age. Some 60-year-olds are more capable than some 25-year-olds. The key considerations are: can the person climb safely, maintain balance, handle components, concentrate for extended periods, and respond to emergencies? If the answer to all of these is yes, age is not a barrier. However, age-related conditions (reduced balance, joint problems, medication side effects) must be considered in the fitness assessment."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Who is primarily responsible for assessing whether an operative is physically fit to work at height?",
    options: [
      "The tower manufacturer",
      "The Health and Safety Executive",
      "Both the employer (through fitness assessment) and the individual (through honest self-assessment)",
      "No one — fitness is not relevant to tower work"
    ],
    correctAnswer: 2,
    explanation: "Fitness for work at height is a shared responsibility. The employer has a duty to assess whether workers are fit for the task (including arranging medical assessments where appropriate). The individual has a responsibility to honestly assess their own condition each day, report any medical conditions or medication that may affect their ability, and decline to work at height if they feel unfit."
  },
  {
    id: 2,
    question: "Which of the following medical conditions may affect a person's ability to work safely at height?",
    options: [
      "A common cold with no other symptoms",
      "Vertigo, epilepsy, heart conditions, balance disorders, and medication causing drowsiness",
      "A minor skin rash on the arm",
      "Previous dental surgery"
    ],
    correctAnswer: 1,
    explanation: "Conditions that affect balance (vertigo, inner ear disorders), consciousness (epilepsy, fainting disorders), cardiovascular function (heart conditions, blood pressure problems), or mental alertness (medication side effects causing drowsiness or dizziness) can all impair the ability to work safely at height. These conditions do not necessarily prevent tower work, but they require medical assessment and guidance."
  },
  {
    id: 3,
    question: "When climbing the internal ladder of a mobile tower, what must you NEVER do?",
    options: [
      "Face the ladder rungs",
      "Carry tools or materials in your hands, as this breaks the 3-point contact rule",
      "Use both hands on the ladder",
      "Climb one rung at a time"
    ],
    correctAnswer: 1,
    explanation: "You must never carry tools or materials in your hands while climbing. This breaks the 3-point contact rule, as you can only maintain two points of contact with one hand occupied. All tools and materials must be raised and lowered using a hoisting line, tool bag, or gin wheel. Face the ladder, climb one rung at a time, and maintain three points of contact at all times."
  },
  {
    id: 4,
    question: "In the TILE manual handling assessment, what does the 'I' stand for?",
    options: [
      "Instruction — what training has been provided",
      "Individual — the person doing the lifting, their fitness, strength, and any conditions",
      "Inspection — checking the load before lifting",
      "Insurance — whether the company has liability cover"
    ],
    correctAnswer: 1,
    explanation: "The 'I' in TILE stands for Individual. This considers the person doing the lifting: are they physically capable, do they have any medical conditions that affect lifting (back problems, pregnancy, recent surgery), have they been trained in correct lifting technique, and are they experiencing fatigue that could increase injury risk?"
  },
  {
    id: 5,
    question: "At Beaufort Force 6 (approximately 28 mph), what action should be taken regarding a mobile tower?",
    options: [
      "Continue working but wear a high-visibility jacket",
      "The tower should be dismantled or tied to a permanent structure to prevent overturning",
      "Move the tower to a sheltered location and continue working",
      "Add more weight to the platform to counteract the wind"
    ],
    correctAnswer: 1,
    explanation: "At Beaufort Force 6 (approximately 28 mph / 45 km/h — a strong breeze that makes umbrellas difficult to use), the tower should be dismantled down to a safe height or tied to a permanent structure. Wind forces at this speed create significant lateral loads on the tower. Adding weight to the platform is dangerous as it raises the centre of gravity and increases the risk of structural failure."
  },
  {
    id: 6,
    question: "What is the correct standard for a safety helmet used during tower assembly?",
    options: [
      "EN 166 (eye protection)",
      "EN 397 (industrial safety helmets)",
      "EN 388 (protective gloves)",
      "There is no standard — any hat will do"
    ],
    correctAnswer: 1,
    explanation: "Safety helmets used during tower assembly and dismantling must comply with EN 397, which covers industrial safety helmets. This standard specifies requirements for shock absorption, penetration resistance, and flame resistance. A chin strap should be used where there is a risk of the helmet being dislodged — for example, when looking up during assembly or in windy conditions."
  },
  {
    id: 7,
    question: "What should you do if you observe a colleague taking a shortcut that compromises safety on a mobile tower?",
    options: [
      "Ignore it — it is not your responsibility",
      "Wait until something goes wrong and then report it",
      "Challenge the unsafe practice constructively, stop the work if necessary, and report it to the supervisor",
      "Take a photograph and post it on social media"
    ],
    correctAnswer: 2,
    explanation: "Every operative has a duty to challenge unsafe practices. This should be done constructively — explain what you have observed and why it is dangerous. If the person does not stop, exercise your stop-work authority. Report the incident to the supervisor so that it can be addressed through further training, briefing, or disciplinary action if appropriate. A culture where people feel comfortable challenging unsafe behaviour saves lives."
  },
  {
    id: 8,
    question: "Why is hydration particularly important when working at height on a mobile tower?",
    options: [
      "Water makes the tower weigh more and increases stability",
      "Dehydration impairs concentration, reaction time, and grip strength — all critical for safe work at height",
      "Drinking water prevents sunburn",
      "Hydration is not important for tower work"
    ],
    correctAnswer: 1,
    explanation: "Even mild dehydration (2% body mass loss) measurably impairs cognitive function, concentration, reaction time, and physical grip strength. When working at height, a momentary lapse in concentration or a weakened grip can result in a fall or a dropped tool. Exposed platforms increase fluid loss through sweating and wind. Regular water intake is a genuine safety measure, not just a comfort."
  }
];

export default function PasmaModule6Section4() {
  useSEO({
    title: "Physical Fitness & Safe Working | PASMA Module 6.4",
    description: "PASMA fitness requirements, medical conditions affecting work at height, 3-point contact rule, TILE manual handling assessment, adverse weather procedures, PPE standards, and safe working habits.",
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
            <Link to="../pasma-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <HeartPulse className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 6 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Physical Fitness &amp; Safe Working
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Fitness requirements, medical considerations, climbing rules, manual handling, weather limits, PPE standards, and the professional habits that keep tower operatives safe
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Fitness:</strong> Self-assessment + employer assessment before height work</li>
              <li><strong>Climbing:</strong> 3-point contact always, never carry items in hands</li>
              <li><strong>Weather:</strong> Cease work at Force 4 (17 mph), dismantle at Force 6</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>PPE:</strong> EN 397 helmet, EN ISO 20345 boots, gloves, hi-vis if needed</li>
              <li><strong>Handling:</strong> TILE assessment, team lifts for heavy components</li>
              <li><strong>Culture:</strong> Challenge unsafe practice, report near-misses, lead by example</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Assess your own physical fitness for working at height",
              "Identify medical conditions that may affect safe tower work",
              "Apply the 3-point contact rule when climbing a mobile tower",
              "Use the TILE method for manual handling risk assessment",
              "Recognise adverse weather thresholds for ceasing tower work",
              "Develop safe working habits and challenge unsafe practices"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: PASMA Fitness Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            PASMA Fitness Requirements
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Working at height on a mobile tower is physically demanding. Operatives must climb repeatedly, carry and position heavy components, maintain balance on an elevated platform, concentrate for extended periods, and be capable of self-rescue if conditions deteriorate. Both the employer and the individual have responsibilities for ensuring fitness.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Physical Demands of Tower Work</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Climbing:</strong> Repeated ascent and descent of the internal ladder, potentially dozens of times during assembly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Carrying:</strong> Moving tower components from storage to the assembly area, often over uneven ground or up stairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Positioning:</strong> Lifting and manoeuvring frames, braces, and platforms into place, often overhead or at arm&rsquo;s length</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Balance:</strong> Working on a platform at height, maintaining stability in wind, and moving carefully in a confined space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Concentration:</strong> Following the assembly sequence precisely, monitoring conditions, communicating with the team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Emergency response:</strong> Ability to descend quickly in an emergency or assist with a colleague&rsquo;s rescue</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Employer&rsquo;s Duty</p>
                  <p className="text-sm text-white/80">
                    The employer must assess whether each operative is physically capable of the work. This may include pre-employment medical screening, periodic health surveillance, and specific fitness-for-height assessments. The employer should also consider the demands of the specific task — a 2-metre tower in a warm indoor environment places different demands than a 12-metre tower on an exposed rooftop in winter.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Individual&rsquo;s Responsibility</p>
                  <p className="text-sm text-white/80">
                    Every operative must honestly assess their own fitness each day before beginning work at height. This means: did you sleep well? Have you eaten and hydrated adequately? Are you taking any medication that could cause drowsiness or dizziness? Do you feel physically capable of the demands? If the honest answer to any of these is no, you should not work at height that day.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Age, Experience, and Fitness</p>
                <p className="text-sm text-white/80">
                  Physical fitness for tower work is not determined by age alone. A fit 55-year-old with decades of experience may be far more capable than an unfit 25-year-old. However, age-related conditions &mdash; reduced balance, joint stiffness, slower recovery from exertion, and the increased likelihood of medical conditions requiring medication &mdash; must be factored into the assessment. Experience is valuable, but it does not compensate for physical limitations. An honest conversation between the operative and their employer, supported by medical assessment where needed, ensures the right people are doing the right tasks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Conditions That May Affect Safe Working */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Conditions That May Affect Safe Working
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Certain medical conditions can affect a person&rsquo;s ability to work safely at height. Having a condition does not necessarily mean a complete ban from tower work, but it does require proper assessment and, in most cases, medical guidance. The key question is: could this condition cause sudden incapacitation, impaired balance, or reduced awareness while at height?
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Conditions Requiring Assessment</p>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">Vertigo and fear of heights:</strong> Vertigo causes a sensation of spinning or imbalance, which can be severely disorienting at height. Fear of heights may cause panic, freezing, or irrational behaviour. Both require honest self-assessment and may need medical input.</p>
                  <p><strong className="text-white">Epilepsy:</strong> Seizures at height can be fatal. The risk depends on seizure frequency, control by medication, and any warning signs (aura). Medical clearance from a specialist is essential.</p>
                  <p><strong className="text-white">Heart conditions:</strong> Conditions causing sudden dizziness, fainting, chest pain, or breathlessness could incapacitate a person at height. Strenuous climbing and manual handling increase cardiovascular demand.</p>
                  <p><strong className="text-white">Balance disorders:</strong> Inner ear conditions, Meniere&rsquo;s disease, and neurological conditions affecting balance present obvious risks at height.</p>
                  <p><strong className="text-white">Recent surgery:</strong> Post-operative restrictions on lifting, climbing, and physical exertion must be respected. Return to height work should follow medical advice.</p>
                  <p><strong className="text-white">Medication side effects:</strong> Many common medications cause drowsiness, dizziness, blurred vision, or impaired reaction times. Always check the patient information leaflet and consult a pharmacist or GP if unsure.</p>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Alcohol and Drugs</p>
                </div>
                <p className="text-sm text-white/80">
                  Working at height under the influence of alcohol or drugs — including legal highs and prescription medication that impairs function — is extremely dangerous and is grounds for immediate removal from site under most construction site rules. Even residual effects from the previous evening can impair performance. If you would not drive a car in your current state, you should not climb a tower.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Mental Health and Working at Height</p>
                <p className="text-sm text-white/80">
                  Mental health conditions can also affect safe working at height. Anxiety, depression, severe stress, sleep disorders, and the side effects of medications prescribed for these conditions can all impair concentration, decision-making, and physical coordination. The construction industry has historically been poor at acknowledging mental health, but it is increasingly recognised as a genuine occupational health factor. If you are struggling, speak to your GP, your employer&rsquo;s occupational health service, or a confidential support line. Working at height when your mind is not on the job puts both you and your colleagues at risk.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Confidential Disclosure</p>
                <p className="text-sm text-white/80">
                  If you have a medical condition that may affect your ability to work at height, you have a duty to disclose it to your employer. This does not automatically mean you will be prevented from working &mdash; it means the risk can be properly assessed and, if appropriate, adjustments can be made. Many conditions are manageable with the right controls. Concealing a condition and having an incident at height is far worse than an honest conversation with your supervisor or occupational health professional.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Temporary Conditions</p>
                <p className="text-sm text-white/80">
                  Some conditions affecting fitness for height work are temporary: a bad night&rsquo;s sleep, a stomach upset, recovery from a minor illness, or short-term medication for an infection. These do not permanently prevent tower work but do require honest self-assessment on the day. If a temporary condition means you cannot climb safely, maintain concentration, or respond to an emergency, you should not work at height that day. There is no shame in this &mdash; recognising your own limitations is a professional strength, not a weakness. Inform your supervisor so that the work can be reassigned rather than left undone.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Occupational Health Assessment</p>
                <p className="text-sm text-white/80">
                  For routine height work, employers should arrange periodic occupational health assessments. These typically include checks on vision, hearing, balance, cardiovascular fitness, and a review of current medications. The assessment is confidential between the operative and the occupational health professional, who provides a &ldquo;fit/unfit/fit with restrictions&rdquo; outcome to the employer without disclosing specific medical details. This protects both the operative&rsquo;s privacy and the employer&rsquo;s duty of care.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: 3-Point Contact Climbing Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            3-Point Contact Climbing Rule
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 3-point contact rule is one of the most fundamental safety principles for climbing any ladder or tower. It is simple, absolute, and non-negotiable: at all times while climbing, you must maintain three points of contact with the ladder — either two hands and one foot, or two feet and one hand.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <PersonStanding className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">3-Point Contact &mdash; The Rules</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Always face the ladder:</strong> Climb with your body facing the rungs, never with your back to the ladder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Three points at all times:</strong> Two hands + one foot, or two feet + one hand. Move only one limb at a time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Never carry items:</strong> Both hands must be free. Tools, materials, drinks, and phones go up by hoisting line, not in your hands or pockets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Climb one rung at a time:</strong> Do not skip rungs, even when descending. Each foot placement should be deliberate and confirmed before moving the next limb</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Grip the rungs, not the stiles:</strong> Gripping the rungs gives a more secure hold than gripping the side rails (stiles), especially with wet or greasy hands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Use the internal ladder only:</strong> Never climb the outside of the tower. The internal ladder provides protection on all sides and allows you to rest safely at each platform level</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Hoisting Line for Tools &amp; Materials</p>
                <p className="text-sm text-white/80">
                  A hoisting line (or gin wheel if available) must be used to raise and lower all tools and materials. The hoisting line should be attached to a secure point on the tower, and items should be placed in a tool bag or bucket — not tied loosely to the rope. When hoisting, stand clear of the load path, and ensure no one is below. Lower items under control; never throw anything from the platform.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Common 3-Point Contact Violations</p>
                </div>
                <p className="text-sm text-white/80">
                  The most frequently observed violations of the 3-point contact rule are: carrying a drill in one hand while climbing, tucking a spirit level under one arm, putting a phone in a back pocket that falls out during climbing, carrying a drinks bottle, and attempting to hold a torch while descending in poor light. Every one of these can be solved by using a hoisting line, tool belt, or leaving the item on the platform. If it does not fit in your hand while maintaining three points of contact, it does not go up the ladder with you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Manual Handling Best Practices */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Manual Handling Best Practices
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Manual handling injuries — particularly back injuries — are among the most common causes of lost working days in the construction industry. Tower components are heavy (frames typically 10&ndash;20 kg each) and awkward to carry. The TILE assessment provides a structured approach to managing these risks.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Dumbbell className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">TILE Assessment</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">T — Task:</strong> What does the activity involve? Lifting, carrying, pushing, pulling? Over what distance? How often? Is twisting, stooping, or reaching involved? Can the task be redesigned to reduce the risk?</p>
                  <p><strong className="text-white">I — Individual:</strong> Who is doing the lifting? Are they physically fit? Do they have any medical conditions affecting their ability to lift? Have they been trained in correct technique? Are they fatigued from previous activity?</p>
                  <p><strong className="text-white">L — Load:</strong> How heavy is it? Is it bulky, awkward, or difficult to grip? Is the weight evenly distributed? Could it shift during carrying? Can it be broken down into smaller components?</p>
                  <p><strong className="text-white">E — Environment:</strong> Is the ground even and dry? Is there sufficient space to adopt a good posture? Is the lighting adequate? Is it hot (causing sweat and reduced grip) or cold (reducing dexterity)? Are there obstacles in the carry route?</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Correct Lifting Technique</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Plan the lift: route clear, destination ready</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Feet shoulder-width apart, one slightly forward</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Bend at the knees, keep back straight</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Get a secure grip before lifting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Lift with legs, not back</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Keep the load close to your body</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Do not twist — move your feet to turn</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">When to Use Team Lifts</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Component weighs more than 20&ndash;25 kg</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Component is too long for one person to balance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Awkward shape prevents a secure single-person grip</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The carry route involves stairs or uneven ground</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>The operative is fatigued from previous lifts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>One person leads the lift with clear commands</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Mechanical Aids for Tower Components</p>
                <p className="text-sm text-white/80">
                  Where the assembly area is at a different level from the vehicle (upper floors, basements, rooftops), mechanical aids should be considered. Stair-climbing trolleys can carry frames up flights of stairs. Platform lifts and goods hoists can move components between floors. For rooftop work, a crane or hoist may be needed to lift the components to the working level. The cost of a mechanical aid is far less than the cost of a back injury that takes an operative off work for months. Discuss mechanical aid options during the planning stage, not after someone has already hurt themselves carrying components up four flights of stairs.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Repetitive Strain During Extended Assembly</p>
                </div>
                <p className="text-sm text-white/80">
                  When assembling large towers or multiple towers in a day, the repetitive nature of the lifting, carrying, and connecting can cause cumulative strain injuries. Grip strength reduces over the course of a day, back muscles fatigue, and technique deteriorates as tiredness builds. Rotate tasks between team members so that no one person does all the heavy lifting. Take breaks between tower assemblies. If you notice your technique slipping &mdash; hunching over, lifting with your back, rushing connections &mdash; take a break and reset before continuing. The last lift of the day should be as careful as the first.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Adverse Weather Conditions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Adverse Weather Conditions
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Weather is one of the most variable and dangerous factors in tower work. Conditions can change rapidly, and what was a safe working environment an hour ago can become life-threatening. Knowing the thresholds and having the discipline to act on them is essential.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Thermometer className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Weather Thresholds for Tower Work</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">Wind — Beaufort Force 4 (17 mph / 28 km/h):</strong> Cease all work on the tower. This is a moderate breeze — dust and loose paper are raised, small branches move. At platform height, where wind is stronger than at ground level, this creates significant balance and component-handling risks.</p>
                  <p><strong className="text-white">Wind — Beaufort Force 6 (28 mph / 45 km/h):</strong> The tower must be dismantled to a safe height or tied to a permanent structure. At this wind speed, large branches move and umbrellas are difficult to use. Wind loads increase with the square of the wind speed — doubling the wind speed quadruples the force.</p>
                  <p><strong className="text-white">Rain:</strong> Wet platforms, ladder rungs, and components become slippery. Reduced visibility and the psychological pressure to &ldquo;finish quickly&rdquo; both increase accident risk. Consider whether the work can be postponed. If proceeding, ensure anti-slip measures and extra caution.</p>
                  <p><strong className="text-white">Ice and frost:</strong> Do not use a mobile tower when platforms or ladder rungs are icy. Ice creates an extreme slip hazard that cannot be adequately controlled on a tower. Wait for conditions to improve or apply de-icing measures before the tower is climbed.</p>
                  <p><strong className="text-white">Lightning:</strong> Descend from the tower immediately if lightning is observed or thunder is heard. A metal tower at height is an excellent lightning conductor. Do not wait for the storm to be directly overhead — lightning can strike from a storm cell 10 miles away.</p>
                  <p><strong className="text-white">Extreme heat:</strong> Ensure adequate hydration, rest breaks, and sun protection. Exposed metal platforms can reach temperatures that cause contact burns in direct sunlight. Monitor operatives for signs of heat stress.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Monitoring Weather Conditions</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Check the forecast before starting work each day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use a handheld anemometer to measure wind speed at ground level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Remember: wind at platform height is typically stronger than at ground level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Monitor conditions throughout the day, not just at the start</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Weather apps provide wind speed updates but do not replace on-site observation</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Recognising Beaufort Force 4</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Dust and loose paper raised from the ground</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Small branches moving on trees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Small flags extended from poles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Difficulty reading a newspaper outdoors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Hair blowing about constantly</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Sheeting and Sail Effect</p>
                </div>
                <p className="text-sm text-white/80">
                  Never attach tarpaulins, plastic sheeting, or advertising banners to a mobile tower unless specifically authorised by the manufacturer. These create a &ldquo;sail effect&rdquo; that dramatically increases the wind load on the tower. A tower that is stable in moderate wind without sheeting can be blown over by the same wind with sheeting attached. This also applies to large sheets of plywood, plasterboard, or other flat materials stored on the platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: PPE Requirements for Tower Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            PPE Requirements for Tower Work
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Personal protective equipment is the last line of defence — it does not eliminate hazards but provides a final layer of protection when higher-level controls are in place. For tower work, specific PPE items are required at different stages, and all must comply with the relevant European/British standards.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Required PPE and Standards</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p><strong className="text-white">Safety helmet — EN 397:</strong> Required during assembly and dismantling when there is a risk of head injury from falling objects or contact with components. A chin strap should be fitted when looking upward (during assembly) or in windy conditions. Must be replaced after any significant impact or according to the manufacturer&rsquo;s lifespan guidance.</p>
                  <p><strong className="text-white">Safety footwear — EN ISO 20345:</strong> Boots with toe protection (at minimum S1P — toe cap + penetration-resistant midsole) are required at all times. Ankle support is recommended for the climbing and carrying demands of tower work. Non-slip soles are essential for wet platforms and ladder rungs.</p>
                  <p><strong className="text-white">Gloves:</strong> Suitable work gloves for handling metal components. Must protect against sharp edges, pinch points, and cold metal, while allowing sufficient dexterity to operate locks and pins. Oversized or bulky gloves that reduce dexterity can be more dangerous than no gloves at all.</p>
                  <p><strong className="text-white">High-visibility clothing:</strong> Required when working near vehicle routes, on public highways, or on sites with mobile plant. Must comply with EN ISO 20471 and be appropriate for the lighting conditions.</p>
                  <p><strong className="text-white">Fall-arrest harness:</strong> Not routinely required for normal use of a fully assembled tower with guardrails. However, a harness may be specified in the method statement for certain assembly stages (e.g., installing guardrails at the leading edge) or for work on complex or bespoke tower configurations.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">PPE Inspection &amp; Maintenance</p>
                <p className="text-sm text-white/80">
                  All PPE must be inspected before each use. Check helmets for cracks, dents, or UV degradation. Check boots for sole damage, worn treads, and compromised toe caps. Check gloves for tears, worn areas, and loss of grip. Check harnesses for frayed webbing, damaged stitching, and functional buckles. Defective PPE must be taken out of service immediately — damaged PPE can give a false sense of security.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">PPE Storage &amp; Care</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Store helmets away from direct sunlight (UV degrades the shell)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Dry wet boots naturally, not with direct heat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Clean gloves regularly to maintain grip</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Store harnesses hung up, not folded or compressed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Replace PPE within the manufacturer&rsquo;s recommended lifespan</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">When a Harness Is Required</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>During advance guardrail installation on the leading edge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>When the method statement specifically requires it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>On complex or bespoke tower configurations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>When working on a tower with incomplete guardrails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Must be connected to a suitable anchor point at all times</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">PPE Is the Last Line — Not the First</p>
                </div>
                <p className="text-sm text-white/80">
                  A common mistake is to treat PPE as the primary control measure. A hard hat does not prevent objects from falling &mdash; toeboards and tool tethering do that. Safety boots do not prevent components being dropped &mdash; correct manual handling technique does. PPE mitigates the consequences when higher-level controls fail. If your safety strategy starts with &ldquo;wear PPE,&rdquo; your hierarchy of control is upside down.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Developing Safe Working Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Developing Safe Working Habits
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Safety is not just about rules, regulations, and equipment. It is fundamentally about culture — the habits, attitudes, and behaviours that people adopt every day. A safe culture is one where doing things correctly is the norm, not the exception. Every operative contributes to this culture through their personal conduct.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">Professional Standards</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Personal responsibility:</strong> You are responsible for your own safety and the safety of those around you. Do not wait for someone else to fix a problem — if you see a hazard, deal with it or report it immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Challenging unsafe practices:</strong> If you see a colleague cutting corners, climbing the outside of the tower, or skipping steps in the assembly sequence, say something. Do it respectfully but firmly. Silence is complicity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Reporting near-misses:</strong> Every near-miss is a future accident that almost happened. Reporting near-misses allows the risk assessment to be updated and prevents the same situation from causing actual harm next time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span><strong className="text-white">Continuous learning:</strong> Stay up to date with PASMA guidance, HSE publications, and industry best practice. Attend refresher training. Learn from incidents — both your own and those of others</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Supporting Colleagues</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Look out for signs of fatigue in your team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Offer to share physical tasks when someone is struggling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mentor less experienced operatives patiently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Create an environment where people feel safe raising concerns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Celebrate good practice, not just fast completion</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Leading by Example</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Always wear your PPE — even for &ldquo;quick jobs&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Follow the method statement every time, not just when supervised</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use the hoisting line, never climb with tools in hand</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Take rest breaks without being told to</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Treat every tower assembly as if it will be inspected</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Goal: Unconscious Competence</p>
                <p className="text-sm text-white/80">
                  Safe working should become second nature — so ingrained that you do it automatically, without having to consciously think about each step. This is the state of &ldquo;unconscious competence,&rdquo; and it is achieved only through consistent practice, honest self-reflection, and a genuine commitment to getting it right. When safe behaviour is habitual, it happens even when you are tired, under pressure, or working without supervision. That is the standard to aim for.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">The Four Stages of Competence</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">1. Unconscious incompetence:</strong> You do not know what you do not know. You may take risks without realising they are risks. This is the most dangerous stage.</p>
                  <p><strong className="text-white">2. Conscious incompetence:</strong> You recognise what you do not know. You understand the risks but do not yet have the skills to manage them. This is where learning begins.</p>
                  <p><strong className="text-white">3. Conscious competence:</strong> You can do the job safely, but it requires concentration and deliberate effort. Each step requires active thought.</p>
                  <p><strong className="text-white">4. Unconscious competence:</strong> Safe working is automatic. You lock the castors without being reminded, check the guardrails without a checklist, and maintain 3-point contact without thinking about it. This is the goal.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Your PASMA Card &mdash; A Starting Point, Not an End Point</p>
                <p className="text-sm text-white/80">
                  Completing the PASMA course and receiving your card is not the end of your training &mdash; it is the beginning. The card demonstrates that you have been trained to a recognised standard at a specific point in time. Maintaining competence requires ongoing practice, staying up to date with changes in guidance and regulations, learning from each tower you assemble, and being open to feedback from colleagues. A PASMA card holder who has not assembled a tower for two years is not as competent as one who works with towers daily. Refresher training, continued professional development, and honest self-assessment keep your skills sharp and your practice safe.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Industry Resources for Ongoing Learning</p>
                <p className="text-sm text-white/80">
                  Stay current with these resources: PASMA technical bulletins and guidance notes (available on the PASMA website), HSE Alerts for work at height incidents, your employer&rsquo;s in-house training and toolbox talks, manufacturer&rsquo;s updates to instruction manuals, and industry events and conferences. The work at height industry evolves continuously &mdash; new equipment, updated regulations, lessons learned from incidents, and improved techniques. Operatives who engage with ongoing learning are safer, more efficient, and more valuable to their employers.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-2">Your Responsibility, Your Career</p>
                <p className="text-sm text-white/80">
                  Ultimately, safe working at height is about protecting your own life, your colleagues&rsquo; lives, and your career. A serious accident affects not just the person injured but their family, their employer, their colleagues who witnessed it, and the wider industry&rsquo;s reputation. Every tower you assemble correctly, every hazard you identify and control, every near-miss you report, and every unsafe practice you challenge contributes to a safer industry for everyone. That is the professional standard, and it starts with you.
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
          title="Section 4 Knowledge Check"
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
            <Link to="../pasma-module-6-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Rescue Procedures
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-7">
              Next: Module 7 &mdash; Mock Exam &rarr;
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}