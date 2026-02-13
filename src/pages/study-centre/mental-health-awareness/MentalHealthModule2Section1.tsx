import { ArrowLeft, Heart, CheckCircle, AlertTriangle, Eye, Brain, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "early-intervention-1",
    question: "Why does early intervention matter when recognising signs of mental ill health?",
    options: [
      "Because mental health problems always get worse without treatment",
      "Because early support can prevent escalation and improve outcomes significantly",
      "Because you can diagnose mental health conditions if you catch them early",
      "Because it's easier to deal with small problems than big ones"
    ],
    correctIndex: 1,
    explanation: "Early intervention matters because research consistently shows that early support can prevent escalation, improve outcomes, reduce suffering, and help people recover faster. This doesn't mean problems always get worse without treatment, but that timely support makes a significant difference. You're not diagnosing — you're noticing changes and helping someone access appropriate support."
  },
  {
    id: "behavioural-changes-1",
    question: "A colleague who is usually sociable has stopped joining the team for breaks and seems withdrawn. What does this suggest?",
    options: [
      "They're being antisocial and need to make more effort",
      "This is a normal behavioural change that happens to everyone",
      "This could be an early warning sign of mental distress worth noting",
      "They definitely have a mental health condition and need professional help"
    ],
    correctIndex: 2,
    explanation: "Withdrawal from social activities and the team is a recognised early warning sign of possible mental distress. It doesn't mean they definitely have a mental health condition, but it's worth noting — especially if it represents a change from their usual behaviour. The key is to notice the change, not to diagnose or judge."
  },
  {
    id: "stress-bucket-1",
    question: "According to the Stress Vulnerability Model (stress bucket), why does the same stressful event affect different people differently?",
    options: [
      "Some people are mentally stronger than others",
      "Everyone has different sized stress buckets (vulnerability thresholds) based on genetics, life experiences, current circumstances, and support systems",
      "People who struggle with stress are just not trying hard enough to cope",
      "The difference is entirely due to personality type"
    ],
    correctIndex: 1,
    explanation: "The Stress Vulnerability Model explains that everyone has a different-sized 'stress bucket' (capacity to handle stress) based on factors like genetics, past experiences, current life circumstances, physical health, sleep, support networks, and coping skills. This isn't about mental strength or effort — it's about understanding that vulnerability is individual and can change over time."
  }
];

const faqs = [
  {
    question: "Do I need to be a mental health professional to notice warning signs?",
    answer: "No. You don't need any qualifications to notice that a colleague seems different, withdrawn, or struggling. You're not diagnosing or treating anything — you're simply noticing changes in behaviour, mood, or performance. Think of it like noticing someone limping — you don't need to be a doctor to see they might need help. The professional assessment comes later, from appropriate services. Your role is to notice, check in, and signpost if needed."
  },
  {
    question: "What if I notice signs but the person says they're fine when I ask?",
    answer: "People often say they're fine even when they're not — especially men, and especially in construction where there's still stigma around mental health. If you've noticed changes, trust your instincts. You might say: 'I've noticed you seem different lately — not yourself. I'm here if you ever want to chat.' Then leave the door open. Check in again a few days later. Sometimes people need time, or multiple opportunities, before they're ready to open up. The fact you've asked plants the seed that you care and you've noticed."
  },
  {
    question: "How do I tell the difference between a bad day and something more serious?",
    answer: "It's about pattern, duration, and severity. Everyone has bad days — that's normal. What matters is: How long has this been going on? (Days? Weeks? Months?) How severe is it? (Mild irritability or complete withdrawal?) Is it getting worse? Is it affecting their work, safety, or relationships? If you're seeing persistent changes over two weeks or more, it's worth a conversation. You're not deciding if it's 'serious enough' — you're noticing a change and offering support."
  },
  {
    question: "Can stress actually be dangerous on a construction site?",
    answer: "Yes — and the research is clear. The HSE reports that stress, anxiety, and depression affect concentration, decision-making, reaction times, and risk awareness. On a construction site where you're working with electricity, height, machinery, and vehicles, impaired concentration is genuinely dangerous. Stress also suppresses the immune system, raises blood pressure, and increases the risk of heart disease. When someone is chronically stressed, they're more likely to make mistakes, have accidents, or miss hazards. This isn't about being dramatic — it's about recognising that mental health and physical safety are deeply connected."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The 'notice and act' principle means:",
    options: [
      "Noticing problems and immediately calling emergency services",
      "Noticing changes in someone and taking appropriate action — which might just be a conversation",
      "Noticing signs of mental illness and diagnosing the condition yourself",
      "Acting on your instincts without waiting to notice patterns"
    ],
    correctAnswer: 1,
    explanation: "The 'notice and act' principle is about paying attention to changes in colleagues and then taking appropriate action. That action might be as simple as a caring conversation, checking in, or signposting to support. It doesn't mean diagnosing, fixing, or calling emergency services unless there's immediate danger. It's about noticing and responding with care."
  },
  {
    id: 2,
    question: "Which of the following is a behavioural warning sign worth noting?",
    options: [
      "Someone having one bad day after receiving difficult news",
      "A usually punctual worker being late three times in the last two weeks with no explanation",
      "A colleague preferring to work alone on a solo task",
      "Someone being quiet during their lunch break"
    ],
    correctAnswer: 1,
    explanation: "Increased lateness or absence — especially when it represents a change from someone's usual pattern — can be a warning sign of mental distress. One bad day after difficult news is normal. Preferring to work alone on a solo task is fine. Being quiet at lunch could be personality. But persistent lateness, especially with no explanation, suggests something might be wrong and is worth a gentle check-in."
  },
  {
    id: 3,
    question: "A colleague's work quality has declined noticeably over the past month. Their installations are taking longer and have more errors than before. This could indicate:",
    options: [
      "They're lazy and need to be managed more strictly",
      "They need retraining on technical skills",
      "This could be a sign of mental distress affecting concentration and performance",
      "Nothing — everyone's performance varies"
    ],
    correctAnswer: 2,
    explanation: "A noticeable decline in work quality — especially when it's sustained over time and represents a change from someone's usual standard — can be a sign of mental distress. Depression, anxiety, and stress all affect concentration, memory, decision-making, and motivation, which directly impacts work performance. This doesn't mean they're lazy or need retraining — it means something might be affecting their wellbeing, and it's worth checking in."
  },
  {
    id: 4,
    question: "Physical warning signs of mental distress can include:",
    options: [
      "One headache after working in the heat",
      "Persistent fatigue despite rest, unexplained aches and pains, and changes in appetite",
      "Getting a cold during winter",
      "Being tired after a long shift"
    ],
    correctAnswer: 1,
    explanation: "Persistent physical symptoms — especially when there's no obvious physical cause — can be manifestations of mental distress. These include chronic fatigue (not relieved by rest), unexplained aches and pains, changes in appetite or weight, and sleep problems. One headache, a winter cold, or tiredness after a long shift are normal. Persistent, unexplained symptoms are worth noting."
  },
  {
    id: 5,
    question: "Cognitive changes associated with mental distress include:",
    options: [
      "Forgetting one thing on a busy day",
      "Persistent difficulty concentrating, increased forgetfulness, indecision, and more frequent errors",
      "Thinking carefully before making an important decision",
      "Having a different opinion from colleagues"
    ],
    correctAnswer: 1,
    explanation: "Mental distress — particularly stress, anxiety, and depression — affects cognitive function. Warning signs include persistent difficulty concentrating, increased forgetfulness, indecisiveness even on small matters, more errors and mistakes, difficulty processing information, and negative thinking patterns. Occasional forgetfulness on a busy day is normal. Persistent cognitive changes are a warning sign."
  },
  {
    id: 6,
    question: "The Stress Vulnerability Model (stress bucket) teaches us that:",
    options: [
      "Everyone has exactly the same capacity to handle stress",
      "If you struggle with stress, it's because you're not strong enough",
      "Everyone has different vulnerability thresholds (bucket sizes) based on genetics, experiences, and current circumstances",
      "Stress only affects people who are already mentally ill"
    ],
    correctAnswer: 2,
    explanation: "The Stress Vulnerability Model explains that everyone has a different capacity to handle stress — like buckets of different sizes. Your bucket size is influenced by genetics, childhood experiences, past trauma, current life circumstances, physical health, sleep quality, support networks, and coping skills. This isn't about strength or weakness — it's about recognising that vulnerability is individual and can change. Understanding this helps explain why the same event affects people differently."
  },
  {
    id: 7,
    question: "A worker is showing increased irritability, snapping at colleagues over small issues. Previously, they were calm and easy-going. This suggests:",
    options: [
      "They're just a difficult person and always have been",
      "This is normal behaviour and nothing to worry about",
      "This represents a behavioural change that could indicate stress or mental distress",
      "They need disciplinary action for unprofessional conduct"
    ],
    correctAnswer: 2,
    explanation: "Increased irritability, aggression, or a short temper — especially when it represents a change from someone's usual demeanour — can be a warning sign of stress, anxiety, or depression (particularly in men, who are more likely to express distress as anger). The key is that it's a change. Before jumping to discipline, it's worth checking if something is wrong."
  },
  {
    id: 8,
    question: "Why is it important to understand that protective factors can raise someone's stress threshold?",
    options: [
      "Because it means people with good support networks never experience mental health problems",
      "Because it shows that building support systems, improving sleep, and developing coping skills can genuinely increase resilience",
      "Because it proves that mental health is entirely under individual control",
      "Because it means you should tell struggling people to just get more sleep"
    ],
    correctAnswer: 1,
    explanation: "Understanding protective factors (good sleep, strong support networks, healthy coping skills, regular exercise, meaningful work) is empowering because it shows that resilience can be built. It doesn't mean people with support never struggle, or that mental health is entirely controllable, but it does mean that strengthening these factors can genuinely help. This informs how we support colleagues — not by telling them to 'just sleep more', but by recognising these factors and helping where we can (e.g., building a supportive team culture)."
  }
];

export default function MentalHealthModule2Section1() {
  useSEO({
    title: "Warning Signs and Symptoms — Recognising Mental Health Problems | Mental Health Module 2.1",
    description: "Learn to recognise the behavioural, physical, emotional, and cognitive warning signs of mental distress in construction colleagues, and understand the Stress Vulnerability Model.",
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
            <Link to="../mental-health-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Heart className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Warning Signs and Symptoms
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Recognising the behavioural, physical, emotional, and cognitive signs of mental distress in your colleagues
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Early intervention saves lives</strong> — noticing changes early matters</li>
              <li><strong>You don't need qualifications</strong> — just care and attention</li>
              <li><strong>Look for changes</strong> — behaviour, mood, work quality, appearance</li>
              <li><strong>Trust your instincts</strong> — if something seems off, it probably is</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>You could save a life</strong> — early support prevents escalation</li>
              <li><strong>Mental health affects safety</strong> — stress impairs judgement</li>
              <li><strong>2 workers die by suicide daily</strong> — in UK construction</li>
              <li><strong>You're not diagnosing</strong> — you're noticing and caring</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain why early recognition of mental health warning signs matters",
              "Identify behavioural changes that may indicate mental distress",
              "Recognise physical and emotional signs of psychological problems",
              "Describe cognitive changes associated with stress, anxiety, and depression",
              "Apply the Stress Vulnerability Model to understand individual differences",
              "Use the 'notice and act' principle in your daily work on site"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Recognising Signs Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Recognising Signs Matters
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In the UK construction industry, <strong>two workers take their own life every single working day</strong>.
                That's over 500 deaths per year — more than triple the number of people killed in workplace accidents.
                Behind each of these statistics is a person, a family, a team of colleagues, and a series of warning
                signs that were either missed or not acted upon.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Window of Opportunity</p>
                </div>
                <p className="text-sm text-white">
                  Research from the mental health charity Mind shows that people experiencing mental health problems
                  typically show warning signs for weeks or months before reaching crisis point. <strong>This is the
                  window of opportunity.</strong> Early intervention — which can be as simple as a caring conversation
                  and signposting to support — can prevent escalation, reduce suffering, and save lives.
                </p>
              </div>

              <p>
                Here's what you need to understand: <strong>you don't need to be a mental health professional to
                notice that something has changed</strong>. You don't need qualifications, training, or special
                knowledge. You just need to care enough to pay attention. If you've worked with someone for weeks,
                months, or years, you know what 'normal' looks like for them. When that changes — when someone who's
                usually chatty goes quiet, when someone who's always punctual starts turning up late, when someone
                who takes pride in their work starts making careless mistakes — you notice.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The 'Notice and Act' Principle</p>
                <p className="text-sm text-white">
                  This isn't about diagnosing mental health conditions. It's not about becoming a therapist or fixing
                  people's problems. It's about <strong>noticing changes and taking appropriate action</strong>. That
                  action might be:
                </p>
                <ul className="text-sm text-white space-y-2 mt-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Having a quiet word: 'You don't seem yourself lately — everything alright?'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Checking in regularly: 'How are you doing? Really?'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Signposting to support: 'Have you thought about calling the Construction Industry Helpline? They're brilliant and confidential.'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Flagging concerns to a supervisor or HR if the person is clearly struggling and safety is a concern</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>In crisis situations (suicidal thoughts, immediate danger): ensuring they're not alone and getting professional help immediately</span>
                  </li>
                </ul>
              </div>

              <p>
                Your duty of care as a colleague — and especially as a supervisor or manager — extends beyond physical
                safety. The Health and Safety at Work Act 1974 requires employers to ensure the health, safety, and
                welfare of employees. <strong>Health includes mental health.</strong> When you notice signs of mental
                distress and do nothing, you're not just failing as a colleague — you're potentially failing in your
                legal duty of care.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Why Construction Workers Are at Higher Risk</p>
                <p className="text-sm text-white mb-2">
                  Construction has a male-dominated workforce (99% male in electrical trades), and men are three times
                  more likely to die by suicide than women. Add to this:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Job insecurity (especially for self-employed/CIS workers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Time away from home and family support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Physical demands and chronic pain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>A culture where 'toughness' is valued and asking for help is seen as weakness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Access to means (height, electricity, vehicles)</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  This combination creates a perfect storm. Recognising the signs and creating a culture where it's
                  okay to not be okay is quite literally a matter of life and death.
                </p>
              </div>

              <p>
                The good news is that <strong>suicide is preventable</strong>. Research from Samaritans shows that
                the majority of people who contemplate suicide don't actually want to die — they want the pain to stop.
                With timely intervention, compassionate support, and access to appropriate help, lives can be saved.
                Your role in this is simple: notice the signs, check in, listen without judgement, and help connect
                people to support.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Behavioural Changes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Behavioural Changes
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Behavioural changes are often the first and most visible warning signs of mental distress. These are
                changes in how someone acts, interacts, and goes about their day-to-day work. The key word is
                <strong> change</strong> — you're looking for deviations from what's normal for that individual.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Withdrawal from the Team</p>
                <p className="text-sm text-white mb-2">
                  One of the most common early signs of depression, anxiety, or stress is social withdrawal. On a
                  construction site, this might look like:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Someone who usually joins the team for breaks now eating lunch alone in their van</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Avoiding conversations, giving one-word answers, putting headphones in to signal 'leave me alone'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Not joining in with the usual banter or site humour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Declining invitations to after-work activities they'd normally attend</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Working alone when the job doesn't require it, or actively avoiding working with others</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>Why it matters:</strong> Isolation is both a symptom and a risk factor. When people withdraw,
                  they lose their support network right when they need it most. They also become harder to check in on.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Increased Absence or Lateness</p>
                <p className="text-sm text-white mb-2">
                  Poor mental health often manifests as increased sickness absence (physical symptoms like fatigue,
                  headaches, stomach problems) or persistent lateness. Warning signs include:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>More frequent sick days, especially single days or Mondays/Fridays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Vague reasons for absence ('not feeling well', 'under the weather')</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Persistent lateness, especially if they used to be punctual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Leaving site early more frequently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Increased time off for medical appointments (which might be mental health-related)</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Context matters. One late arrival after a car breakdown is nothing. A pattern of persistent lateness
                  from someone who's usually punctual is worth noting.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Decline in Work Quality and Performance</p>
                <p className="text-sm text-white mb-2">
                  Mental health problems affect concentration, memory, motivation, and decision-making — all of which
                  directly impact work quality. Signs include:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Tasks taking longer than they used to, even routine jobs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>More errors and mistakes — wiring mistakes, missed items, incorrect measurements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Installations that don't meet their usual standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Difficulty making decisions, even about straightforward matters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Needing to be told things repeatedly, forgetting conversations or instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Loss of pride in their work — someone who used to care deeply now seeming apathetic</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  This isn't about incompetence or laziness. Depression saps motivation and energy. Anxiety makes it
                  hard to concentrate. Stress impairs judgement. If you're seeing a pattern of declining performance
                  from someone who's usually capable, consider that something might be affecting their wellbeing.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Changes in Appearance and Personal Hygiene</p>
                <p className="text-sm text-white mb-2">
                  When someone is struggling mentally, self-care often slips. Warning signs include:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Looking dishevelled or unkempt when they're usually well-presented</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Wearing the same clothes multiple days in a row</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Poor personal hygiene (this is difficult to raise but can be a significant warning sign)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Significant weight loss or gain over a short period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Looking tired, drawn, or unwell consistently</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Again, context matters. Someone working a dirty job will obviously look different at 4pm than 7am.
                  You're looking for a persistent change from their usual standard of self-presentation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Increased Risk-Taking or Safety Violations</p>
                <p className="text-sm text-white mb-2">
                  This is particularly concerning on a construction site. Mental distress can manifest as:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Working at height without harnesses when they always used to follow procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Working on live circuits when isolation would be safer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Not wearing PPE they'd normally use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Taking shortcuts that create unnecessary risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>A pattern of near-misses or minor accidents</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Sometimes this is apathy (depression making someone not care about consequences). Sometimes it's
                  impaired judgement (stress affecting risk perception). In the worst cases, it can be a form of
                  passive self-harm. Whatever the cause, increased risk-taking combined with other warning signs
                  requires immediate attention — both for safety and for wellbeing.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Irritability, Aggression, or Emotional Outbursts</p>
                <p className="text-sm text-white mb-2">
                  Men in particular are more likely to express mental distress as anger rather than sadness. Warning signs:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Having a short fuse, snapping at colleagues over minor issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Reacting disproportionately to small frustrations (tools not being where they should be, materials delayed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Increased conflict with other trades, supervisors, or team members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Verbal outbursts or losing their temper when they're usually calm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Physical aggression (throwing tools, slamming things) even if not directed at people</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Before labelling someone as 'difficult' or 'aggressive', consider whether this represents a change.
                  Research shows that depression in men often manifests as irritability, anger, and risk-taking rather
                  than the 'classic' symptoms of low mood and tearfulness. What looks like anger might actually be distress.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Working Excessively to Avoid Going Home</p>
                <p className="text-sm text-white">
                  This is less obvious but can be significant. If someone is staying late every day, volunteering for
                  weekend work constantly, or seems reluctant to go home, it might indicate problems at home
                  (relationship breakdown, financial stress, family conflict) or an attempt to avoid being alone with
                  their thoughts. While dedication is admirable, excessive overwork — especially when combined with
                  other warning signs — can be a red flag.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Physical and Emotional Signs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Physical and Emotional Signs
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mental health problems don't just affect the mind — they affect the body too. The connection between
                psychological distress and physical symptoms is well-established in medical research. Understanding
                these physical manifestations is crucial because people are often more willing to acknowledge physical
                symptoms than mental health struggles.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Persistent Fatigue and Exhaustion</p>
                <p className="text-sm text-white mb-2">
                  This is one of the most common symptoms of depression, anxiety, and chronic stress. Key features:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Not relieved by rest:</strong> They're sleeping but still exhausted. Weekend rest doesn't help.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Physical and mental:</strong> Both bodily fatigue and mental exhaustion ('brain fog')</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Persistent:</strong> Lasting weeks or months, not just a few tired days after a busy period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Disproportionate:</strong> Feeling completely drained after tasks that wouldn't normally tire them</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  On site, this might look like someone moving slower, needing more breaks, struggling to get through
                  the day, or repeatedly mentioning how tired they are. Depression in particular causes profound
                  fatigue — getting out of bed can feel like climbing a mountain.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Unexplained Aches, Pains, and Physical Symptoms</p>
                <p className="text-sm text-white mb-2">
                  Psychological distress often manifests as physical symptoms (called 'somatisation'). Common examples:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Chronic headaches or migraines</strong> with no clear physical cause</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Stomach problems</strong> — nausea, digestive issues, IBS-type symptoms (anxiety often affects the gut)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Chest tightness or pain</strong> (can be anxiety — always get chest pain checked medically, but if tests come back clear, consider anxiety)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Muscle tension and pain</strong> — particularly neck, shoulders, back (chronic stress keeps muscles tense)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Dizziness or light-headedness</strong> (can be panic attacks or anxiety)</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  What makes these symptoms noteworthy is that medical investigations find nothing wrong, or the
                  severity seems disproportionate to any physical cause. Construction workers are used to physical
                  aches and pains, which can actually mask psychological symptoms. If someone is frequently complaining
                  of physical problems that don't have a clear cause, mental health might be the missing piece.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Sleep Problems</p>
                <p className="text-sm text-white mb-2">
                  Sleep disturbance is a hallmark of almost all mental health problems. Patterns vary:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Insomnia</strong> — difficulty falling asleep, racing thoughts, lying awake for hours (common in anxiety)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Early morning waking</strong> — waking at 3am or 4am and being unable to get back to sleep (classic symptom of depression)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Hypersomnia</strong> — sleeping excessively but never feeling rested (can occur in depression)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Nightmares or disturbed sleep</strong> (can occur with PTSD, anxiety, stress)</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  If a colleague frequently mentions they're not sleeping well, it's worth asking how long it's been
                  going on. Short-term sleep problems after a stressful event are normal. Chronic sleep problems
                  lasting weeks or months are a warning sign and also make mental health worse (sleep deprivation
                  exacerbates anxiety, depression, and stress — it becomes a vicious cycle).
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Changes in Appetite and Weight</p>
                <p className="text-sm text-white mb-2">
                  Mental distress often affects eating patterns:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Loss of appetite</strong> — food loses its appeal, forgetting to eat, skipping meals (common in depression and anxiety)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Comfort eating</strong> — using food to manage emotions, especially high-sugar or high-fat foods (common in stress and depression)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Noticeable weight loss or gain</strong> — particularly rapid changes over a few weeks or months</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  On site, you might notice someone skipping lunch, eating very little, or the opposite — eating
                  significantly more than usual. Sudden weight changes combined with other symptoms are worth noting.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Emotional Signs</p>
                <p className="text-sm text-white mb-2">
                  Emotional changes are often harder to spot in a workplace setting, but they include:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Persistent low mood</strong> — seeming sad, down, or hopeless for extended periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Tearfulness</strong> — crying at work (highly unusual in construction and a significant warning sign)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Emotional flatness</strong> — showing no emotion, seeming 'checked out' or numb</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Mood swings</strong> — emotions that seem disproportionate or changeable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Loss of interest</strong> — not caring about things they used to enjoy (hobbies, football, family activities)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Anxiety or worry</strong> — seeming on edge, tense, worried about things that wouldn't normally bother them</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Increased Smoking, Drinking, or Substance Use</p>
                <p className="text-sm text-white mb-2">
                  Using substances to cope with distress is extremely common. Warning signs include:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Smoking more</strong> — chain smoking during breaks, increased vaping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Drinking more</strong> — mentioning drinking alone, drinking to sleep, needing a drink to relax</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Coming to work hungover</strong> frequently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Using drugs</strong> (cannabis, cocaine) to manage stress or escape</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Substance use often starts as a coping mechanism ('I can't sleep without a few beers') but quickly
                  becomes part of the problem, making mental health worse and creating dependency. If someone's use is
                  noticeably increasing, it may signal underlying distress.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Mind-Body Connection</p>
                <p className="text-sm text-white">
                  The relationship between mental and physical health is bidirectional. Mental distress causes physical
                  symptoms (tension headaches, fatigue, stomach problems). And physical health problems (chronic pain,
                  illness) increase the risk of mental health problems. In construction, where physical demands are
                  high and chronic pain is common, this creates particular risk. Someone with ongoing back pain is
                  more vulnerable to depression. Someone with depression is more sensitive to pain. Understanding this
                  connection helps explain why mental and physical symptoms often occur together.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Cognitive Changes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Cognitive Changes
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cognitive changes refer to alterations in thinking, concentration, memory, and decision-making. These
                are often the most impairing symptoms of mental health problems because they directly affect someone's
                ability to function at work. They're also particularly dangerous on a construction site where
                concentration, judgement, and quick decision-making are essential for safety.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Difficulty Concentrating</p>
                <p className="text-sm text-white mb-2">
                  This is one of the hallmark symptoms of anxiety, depression, and stress. It manifests as:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Struggling to focus</strong> on tasks that require sustained attention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Being easily distracted</strong> — mind wandering, losing track of what they were doing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Needing to re-read</strong> method statements, drawings, or regulations multiple times without absorbing the information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Starting tasks and not finishing them</strong>, jumping between jobs without completing any</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Taking much longer</strong> to complete work that would normally be straightforward</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  On a construction site, impaired concentration is dangerous. Missing a step in a method statement,
                  forgetting to check for voltage, or losing focus while working at height can have fatal consequences.
                  If you notice someone's concentration has deteriorated, it's a safety issue as well as a wellbeing concern.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Forgetfulness and Memory Problems</p>
                <p className="text-sm text-white mb-2">
                  Mental distress affects both short-term (working) memory and the ability to form new memories:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Forgetting conversations</strong> — you tell them something and they have no recollection hours later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Missing appointments or meetings</strong> they would normally remember</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Forgetting tools, equipment, or materials</strong> — repeatedly returning to the van or store</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Losing track of what they were doing</strong> mid-task</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Needing constant reminders</strong> about tasks or deadlines</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  This isn't early-onset dementia — it's the effect of stress hormones and mental exhaustion on brain
                  function. When the brain is overwhelmed with worry, there's less capacity left for forming and
                  retrieving memories. The good news is that this usually improves when the underlying mental health
                  problem is treated.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Indecision and Difficulty Making Decisions</p>
                <p className="text-sm text-white mb-2">
                  Depression and anxiety both impair decision-making, creating a paralysis where even small choices feel overwhelming:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Agonising over small decisions</strong> — which cable route to take, which tool to use — when they'd normally decide instantly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Constantly seeking reassurance</strong> — checking and rechecking decisions with supervisors or colleagues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Procrastination</strong> — avoiding making decisions altogether, waiting for someone else to decide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Second-guessing themselves</strong> — changing their mind repeatedly, lacking confidence in their judgement</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Anxiety makes people catastrophise decisions ('What if I get this wrong? What if something bad
                  happens?'). Depression saps confidence ('I can't do anything right anyway, what's the point?'). Both
                  create decision paralysis. On site, this slows work and can frustrate colleagues, but the person
                  isn't being difficult — they're genuinely struggling.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Increased Errors and Mistakes</p>
                <p className="text-sm text-white mb-2">
                  When concentration, memory, and decision-making are all impaired, mistakes increase:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Wiring errors</strong> — getting polarity wrong, incorrect connections, missing circuits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Calculation mistakes</strong> — cable sizing, voltage drop, load calculations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Missing steps</strong> — forgetting to test, forgetting to isolate, skipping parts of procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Measurement errors</strong> — cutting cables to wrong lengths, drilling holes in wrong places</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Rework required</strong> — installations that don't meet spec and need redoing</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Occasional mistakes are normal. A pattern of increasing errors from someone who's usually competent
                  and careful is a warning sign. Before assuming incompetence or carelessness, consider whether mental
                  health might be affecting their cognitive function.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Negative Thinking Patterns</p>
                <p className="text-sm text-white mb-2">
                  Depression and anxiety create characteristic thinking patterns that can sometimes be observed in what people say:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>All-or-nothing thinking:</strong> 'If this isn't perfect, it's worthless' (perfectionism that creates paralysis)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Catastrophising:</strong> 'If I get this wrong, I'll be sacked, I'll lose my house, my life will be over'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Personalisation:</strong> 'This is all my fault' (blaming themselves for things beyond their control)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Overgeneralisation:</strong> 'I always mess things up' or 'Nothing ever works out for me'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Hopelessness:</strong> 'There's no point' or 'Things will never get better'</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  These thinking patterns are symptoms of the condition, not character flaws. Cognitive Behavioural
                  Therapy (CBT) is specifically designed to address these patterns, and is highly effective for anxiety
                  and depression.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Difficulty Processing Information</p>
                <p className="text-sm text-white mb-2">
                  Stress and anxiety can make it harder to understand and process complex information:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Struggling with new information</strong> — finding it hard to learn new procedures or understand changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Needing things explained multiple times</strong> before they 'click'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Confusion</strong> — seeming lost or unclear even on familiar tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Mental 'slowing'</strong> — thoughts and speech that seem slower than usual (psychomotor retardation, common in depression)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Why Cognitive Changes Are Dangerous on Site</p>
                </div>
                <p className="text-sm text-white">
                  Construction work requires sustained concentration, accurate decision-making, good memory, and quick
                  reactions. When someone's cognitive function is impaired by stress, anxiety, or depression, they are
                  at significantly higher risk of accidents. Research from the HSE confirms that stress impairs
                  judgement, reduces situational awareness, slows reaction times, and increases the likelihood of
                  errors. If you notice cognitive changes in a colleague — particularly when combined with safety-critical
                  work — it's essential to check in and, if necessary, consider whether they should be doing high-risk
                  tasks until they're feeling better. This isn't about blame or punishment — it's about keeping everyone safe.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: The Stress Vulnerability Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Stress Vulnerability Model
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Why does the same stressful event (redundancy, relationship breakdown, bereavement, work pressure)
                affect different people differently? Why does one person cope with immense pressure while another
                struggles with seemingly minor stress? The <strong>Stress Vulnerability Model</strong> (also called
                the Diathesis-Stress Model) provides a powerful framework for understanding this.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Stress Bucket Analogy</p>
                <p className="text-sm text-white mb-2">
                  Imagine everyone has a bucket that represents their capacity to handle stress. The model works like this:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>The bucket</strong> represents your stress capacity (vulnerability threshold). Some people have large buckets (high resilience), others have smaller buckets (higher vulnerability).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>The tap</strong> represents stressors — events, pressures, and demands that flow into the bucket. Work pressure, money worries, relationship problems, bereavement, illness, etc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>The valve at the bottom</strong> represents your coping mechanisms — things that drain stress out of the bucket. Exercise, sleep, social support, hobbies, talking, problem-solving, relaxation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>When the bucket overflows</strong>, you experience symptoms — anxiety, depression, physical illness, burnout, breakdown.</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  The goal is to keep the bucket below overflow. You can do this by: (1) Reducing the flow of stress
                  into the bucket (addressing stressors), (2) Opening the valve wider (improving coping mechanisms),
                  or (3) Increasing the size of the bucket (building resilience).
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What Determines Bucket Size (Vulnerability)?</p>
                <p className="text-sm text-white mb-2">
                  Why do some people have bigger buckets than others? Vulnerability is influenced by multiple factors:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Genetics:</strong> Family history of mental health problems increases vulnerability (it's not destiny, but it raises risk)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Childhood experiences:</strong> Adverse childhood experiences (trauma, abuse, neglect, parental mental illness, poverty) reduce bucket size. Stable, supportive childhoods increase it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Past trauma:</strong> Previous traumatic events (bereavement, assault, accidents) can reduce resilience and increase vulnerability to future stress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Physical health:</strong> Chronic pain, illness, disability, sleep deprivation, poor nutrition all reduce capacity to handle stress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Current life circumstances:</strong> Financial insecurity, housing problems, relationship issues, caring responsibilities all add to the baseline stress level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Personality traits:</strong> Some traits (neuroticism, perfectionism) are associated with higher vulnerability; others (optimism, self-efficacy) with higher resilience</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>Crucially, vulnerability is not fixed.</strong> Your bucket size can change. Poor sleep,
                  isolation, and chronic stress shrink your bucket over time. Good sleep, strong relationships,
                  physical activity, and meaning in work can increase it.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Protective Factors (Opening the Valve)</p>
                <p className="text-sm text-white mb-2">
                  Protective factors are things that help drain stress from the bucket — coping mechanisms and resilience-building activities:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Strong social support:</strong> Friends, family, a supportive team at work — having people you can talk to and rely on</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Good quality sleep:</strong> 7-9 hours per night — one of the most powerful protective factors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Regular physical activity:</strong> Exercise reduces stress hormones, improves mood, aids sleep</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Healthy coping strategies:</strong> Talking about problems, problem-solving, seeking help, relaxation techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Meaning and purpose:</strong> Feeling your work matters, having goals, connection to something bigger than yourself</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Financial security:</strong> Not being in crisis about money (doesn't mean being rich — means having enough to meet basic needs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Sense of control:</strong> Feeling you have some influence over your life and circumstances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Hobbies and interests:</strong> Things you do for enjoyment, not productivity</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  The more protective factors someone has, the wider their valve — stress drains out more quickly.
                  When someone is isolated, sleep-deprived, financially insecure, and has no coping strategies, the
                  valve is tiny — stress accumulates rapidly.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Why This Model Matters for Construction</p>
                <p className="text-sm text-white mb-2">
                  Understanding the Stress Vulnerability Model helps you:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Stop judging:</strong> 'Why can't they cope when I can?' Because their bucket is different. Their baseline stress is different. Their coping mechanisms are different.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Recognise risk factors:</strong> Someone working away from home (no social support), with money worries (financial insecurity), chronic back pain (physical health), and poor sleep has multiple vulnerability factors — their bucket is small and their valve is narrow. They're at higher risk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Support effectively:</strong> You can help by addressing stressors where possible (workload, flexibility) and strengthening protective factors (building team support, signposting to help).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Understand relapse:</strong> Even after recovery, if someone's bucket fills again (new stressors, loss of protective factors), symptoms can return. It's not failure — it's the model in action.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Applying the Model on Site</p>
                <p className="text-sm text-white mb-2">
                  Imagine two electricians facing the same stressor — being told on Monday that the job is ending
                  on Friday and they're not being kept on:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-medium text-sm mb-2">Electrician A</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Large bucket: stable childhood, no history of mental illness, physically healthy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Protective factors: Strong support from partner, financially stable with savings, sleeps well, active social life</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Outcome:</strong> Disappointed and a bit worried, but copes. Updates CV, calls contacts, finds new work within a week.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-medium text-sm mb-2">Electrician B</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Smaller bucket: history of depression, chronic back pain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Vulnerability factors: Relationship just broke down, behind on rent, no savings, isolated (working away from home), already stressed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>Outcome:</strong> Bucket overflows. Experiences severe anxiety, can't sleep, catastrophises ('I'll lose my flat, end up homeless'). Depression returns. Struggles to function.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-white mt-3">
                  Same stressor. Completely different outcomes. Not because B is 'weak' or A is 'strong' — because
                  their buckets, current stress levels, and coping resources are different. Understanding this creates
                  compassion and helps you see who might need extra support when difficult things happen on site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You now understand why recognising the warning signs of mental distress matters, and what those signs
                look like in a construction setting. The key points to remember are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Early intervention saves lives.</strong> Two construction workers die by suicide every working day in the UK. Noticing signs early and offering support can prevent escalation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>You don't need qualifications to notice changes.</strong> You just need to care and pay attention. Trust your instincts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Behavioural warning signs</strong> include withdrawal, increased absence/lateness, declining work quality, changes in appearance, increased risk-taking, and irritability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Physical and emotional signs</strong> include persistent fatigue, unexplained aches and pains, sleep problems, appetite changes, low mood, tearfulness, and increased substance use.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Cognitive changes</strong> include difficulty concentrating, forgetfulness, indecision, increased errors, and negative thinking patterns. These are particularly dangerous on construction sites where concentration is essential for safety.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The Stress Vulnerability Model</strong> explains why the same event affects people differently. Everyone has a different-sized 'stress bucket' based on genetics, experiences, physical health, and protective factors. Understanding this creates compassion and helps you identify who might need extra support.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we'll focus specifically on understanding
                  stress — the difference between pressure and stress, the Stress Container Model, the HSE's six management
                  standards, and the common stressors in construction that put our workforce at particular risk.
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
            <Link to="../mental-health-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-2-section-2">
              Next: Understanding Stress
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
