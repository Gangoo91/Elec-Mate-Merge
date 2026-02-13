import { ArrowLeft, Heart, CheckCircle, TrendingUp, Container, Shield, Zap, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pressure-vs-stress-1",
    question: "According to the Yerkes-Dodson Law (performance curve), what happens when pressure increases beyond the optimal point?",
    options: [
      "Performance continues to improve indefinitely",
      "Performance plateaus and stays steady at maximum efficiency",
      "Performance begins to decline as pressure turns into distress",
      "Pressure has no relationship with performance — they're unrelated"
    ],
    correctIndex: 2,
    explanation: "The Yerkes-Dodson Law shows that performance improves with pressure up to an optimal point (where you're challenged but not overwhelmed), then begins to decline as pressure becomes excessive stress (distress). Too little pressure leads to boredom and underperformance. Too much pressure leads to anxiety, mistakes, and declining performance. The sweet spot is in the middle."
  },
  {
    id: "stress-container-1",
    question: "In the Stress Container Model, what does the 'valve' represent?",
    options: [
      "The stressors flowing into your life",
      "Your innate capacity to handle stress",
      "Your coping mechanisms — the ways you release stress",
      "The symptoms you experience when stressed"
    ],
    correctIndex: 2,
    explanation: "In Brabban & Turkington's Stress Container Model, the valve at the bottom represents your coping mechanisms — the ways you drain stress out of the container. Helpful valves include exercise, talking, problem-solving, sleep, hobbies. Unhelpful valves include alcohol, avoidance, isolation (they might feel like they help short-term but actually make things worse). Opening the valve wider — developing better coping strategies — is a key way to manage stress."
  },
  {
    id: "hse-standards-1",
    question: "The HSE's Management Standard for 'Control' is about:",
    options: [
      "How much your manager controls and monitors your every move",
      "Controlling your emotions and not showing stress at work",
      "How much say and influence you have over your work and how you do it",
      "Keeping control of costs and budgets on projects"
    ],
    correctIndex: 2,
    explanation: "The HSE's 'Control' standard is about employee autonomy — how much say people have over their work, how it's done, work patterns, and decision-making. Low control (being micromanaged, having no input, rigid rules) increases stress. High control (autonomy, flexibility, being trusted to make decisions) reduces stress and improves wellbeing. Research consistently shows that lack of control at work is one of the strongest predictors of stress and mental ill health."
  }
];

const faqs = [
  {
    question: "Is all stress bad?",
    answer: "No. Short-term pressure (eustress) is actually beneficial — it motivates us, focuses our attention, and improves performance. The problem is chronic, unrelenting stress (distress) where the body and mind never get a chance to recover. Think of stress like exercise: short bursts followed by recovery make you stronger. Constant, unrelenting exercise with no rest breaks you down. The same is true of psychological stress. The goal isn't to eliminate all pressure — it's to prevent chronic, overwhelming stress and ensure adequate recovery."
  },
  {
    question: "What's the difference between feeling stressed and having a stress-related mental health condition?",
    answer: "Everyone feels stressed sometimes — that's normal. Stress becomes a mental health problem when it's: (1) Severe — significantly affecting your ability to function, (2) Persistent — lasting weeks or months without relief, (3) Impairing — stopping you doing things you need or want to do. At that point, stress can develop into anxiety disorders, depression, or physical illness. The HSE defines work-related stress as 'the adverse reaction people have to excessive pressures or other types of demand placed on them.' If you're persistently overwhelmed, unable to cope, and experiencing symptoms that affect your life, it's time to seek help."
  },
  {
    question: "How can I tell if a colleague's stress has become dangerous?",
    answer: "Warning signs that stress has reached a dangerous level include: inability to concentrate (especially concerning on site), making frequent mistakes, near-misses or accidents, physical symptoms (chest pain, panic attacks, severe headaches), extreme irritability or aggression, talking about not being able to cope or feeling overwhelmed, risk-taking behaviour, significant decline in work quality, persistent absence, and signs of self-harm or suicidal thoughts. If you see these signs, it's essential to check in, and if safety is a concern, speak to a supervisor. This isn't about getting someone in trouble — it's about keeping them and everyone else safe."
  },
  {
    question: "What should I do if I notice stressors on site that are affecting the team?",
    answer: "If you're seeing stress-related problems across the team (not just one individual), there's likely a systemic issue that needs addressing. Use the HSE's six management standards as a framework: Are demands unrealistic? Do people have control over their work? Is support available? Are relationships respectful? Are roles clear? Is change managed well? Raise concerns with your supervisor, site manager, or HR. Document what you're seeing. Good employers will want to know because work-related stress is a legal health and safety issue. If you're a supervisor yourself, you have a responsibility to address work-related stress as part of your duty of care."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Yerkes-Dodson Law (performance curve) demonstrates that:",
    options: [
      "More pressure always leads to better performance",
      "There is an optimal level of pressure for peak performance — too little or too much reduces effectiveness",
      "Pressure has no relationship with performance in construction work",
      "Only people who can't handle pressure experience stress"
    ],
    correctAnswer: 1,
    explanation: "The Yerkes-Dodson Law shows an inverted U-shaped relationship between pressure and performance. At low pressure, we're bored and underperforming. At moderate pressure (the optimal zone), we're challenged and performing at our best. At high pressure (distress zone), performance declines due to anxiety, overwhelm, and impaired functioning. The key insight is that some pressure is good — but there's a tipping point."
  },
  {
    id: 2,
    question: "Eustress refers to:",
    options: [
      "The negative, harmful type of stress that makes you ill",
      "Positive, motivating pressure that enhances performance and feels challenging but manageable",
      "A medical condition requiring treatment",
      "Stress that only affects Europeans"
    ],
    correctAnswer: 1,
    explanation: "Eustress (from the Greek 'eu' meaning good) is positive stress — the kind of pressure that motivates you, focuses your attention, and helps you perform well. Examples include the excitement before a presentation, the challenge of a new project, or the pressure of a deadline that pushes you to focus. It feels demanding but manageable, and is followed by a sense of achievement. The opposite is distress — overwhelming, chronic stress that harms health and performance."
  },
  {
    id: 3,
    question: "In the Stress Container Model (Brabban & Turkington), what are 'unhelpful coping strategies'?",
    options: [
      "Strategies that make you feel better immediately but worsen the problem long-term, such as alcohol, avoidance, and isolation",
      "Strategies recommended by mental health professionals",
      "Any coping strategy that involves asking for help",
      "Strategies that take too much time or effort"
    ],
    correctAnswer: 0,
    explanation: "Unhelpful coping strategies are those that might provide short-term relief but actually make the problem worse over time. Examples include: drinking alcohol to relax (leads to dependency, disrupts sleep, worsens anxiety), avoiding problems (they escalate), isolating yourself (loneliness worsens mental health), comfort eating (leads to physical health problems), aggression (damages relationships). Helpful strategies include exercise, talking, problem-solving, sleep, social connection, and seeking professional help."
  },
  {
    id: 4,
    question: "The HSE's Management Standard for 'Demands' covers:",
    options: [
      "How demanding your manager is as a person",
      "Workload, work patterns, and the work environment — ensuring they're reasonable and manageable",
      "Only physical demands like lifting and manual handling",
      "Demanding that employees work harder to meet deadlines"
    ],
    correctAnswer: 1,
    explanation: "The HSE's 'Demands' standard addresses issues like workload (is it achievable?), work patterns (hours, shifts, breaks), and the work environment (noise, temperature, hazards). The goal is to ensure demands are reasonable and that employees can cope. Indicators of good practice include realistic deadlines, adequate resources, manageable workload, and workers' concerns about demands being listened to and addressed."
  },
  {
    id: 5,
    question: "Which of the HSE's six management standards is about ensuring employees have a voice in their work?",
    options: [
      "Demands",
      "Support",
      "Control",
      "Role"
    ],
    correctAnswer: 2,
    explanation: "The 'Control' standard is about how much say people have in the way they do their work. Indicators include: having a say in work pace and schedules, being encouraged to develop skills, being consulted about changes that affect them. Research shows that lack of control at work is one of the strongest predictors of work-related stress. People who feel powerless, micromanaged, and unable to influence their work are at significantly higher risk of stress, anxiety, and depression."
  },
  {
    id: 6,
    question: "According to the HSE standards, 'Support' at work should include:",
    options: [
      "Only support from your immediate manager",
      "Support from the organisation, line management, and colleagues — including emotional support, resources, and clear expectations",
      "Financial support in the form of bonuses",
      "Support is not the employer's responsibility — it should come from family"
    ],
    correctAnswer: 1,
    explanation: "The HSE's 'Support' standard covers three areas: organisational support (policies, procedures, resources), line management support (approachable managers who listen and support), and colleague support (a supportive team culture). Good support includes having systems in place to respond to concerns, managers who are accessible and supportive, and colleagues who help each other. Lack of support — particularly from management — is a major source of work-related stress."
  },
  {
    id: 7,
    question: "Common stressors specific to construction work include:",
    options: [
      "Working in comfortable office environments with regular hours",
      "Job security, stable income, and working close to home",
      "Job insecurity (especially for CIS/self-employed), time away from home, deadline pressure, physical demands, and a culture where asking for help is seen as weakness",
      "Low physical demands and minimal safety concerns"
    ],
    correctAnswer: 2,
    explanation: "Construction workers face multiple specific stressors: job insecurity (particularly for self-employed/CIS workers who can be laid off with no notice), financial insecurity (irregular income, payment delays), working away from home (losing family/social support), deadline and programme pressure, physical demands and chronic pain, noise and harsh environments, conflict between trades, and a culture that values 'toughness' and stigmatises help-seeking. Understanding these industry-specific stressors is essential for recognising and addressing stress in construction."
  },
  {
    id: 8,
    question: "When does stress become genuinely dangerous and require immediate action?",
    options: [
      "As soon as someone mentions feeling stressed about anything",
      "When stress is affecting concentration, judgement, and safety on site, or when someone expresses thoughts of self-harm or suicide",
      "Stress is never dangerous — it's just a normal part of life",
      "Only when someone has a diagnosed mental health condition"
    ],
    correctAnswer: 1,
    explanation: "Stress becomes dangerous when: (1) It's impairing safety-critical abilities — concentration, judgement, reaction time, decision-making — particularly on construction sites where these are essential, (2) It's causing severe physical symptoms like chest pain or panic attacks, (3) The person is expressing suicidal thoughts or engaging in self-harm, (4) It's causing complete inability to function. In these situations, action is needed — which might mean medical attention, time off, risk assessment, or emergency support. Stress isn't 'just part of life' when it reaches dangerous levels."
  }
];

export default function MentalHealthModule2Section2() {
  useSEO({
    title: "Understanding Stress — Pressure, Distress, and Construction-Specific Stressors | Mental Health Module 2.2",
    description: "Learn the difference between healthy pressure and harmful stress, understand the Stress Container Model and HSE management standards, and recognise construction-specific stressors.",
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
            <span className="text-rose-400 text-xs font-semibold">MODULE 2 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Understanding Stress
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The difference between pressure and stress, the Stress Container Model, and the specific stressors affecting construction workers
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Some pressure is good</strong> — it motivates and improves performance</li>
              <li><strong>Chronic stress is harmful</strong> — affects health, safety, and wellbeing</li>
              <li><strong>Construction has specific stressors</strong> — job insecurity, time away from home</li>
              <li><strong>Stress is manageable</strong> — with the right understanding and support</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Stress affects safety</strong> — impairs concentration and judgement</li>
              <li><strong>Stress causes physical illness</strong> — heart disease, weakened immunity</li>
              <li><strong>Stress leads to mental health problems</strong> — anxiety, depression, burnout</li>
              <li><strong>You can reduce stressors</strong> — by understanding the HSE standards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Distinguish between healthy pressure (eustress) and harmful stress (distress)",
              "Explain the Yerkes-Dodson Law and the performance curve",
              "Describe the Stress Container Model and how coping mechanisms work",
              "Apply the HSE's six management standards to construction sites",
              "Identify construction-specific stressors and their impact on workers",
              "Recognise when stress has become dangerous and requires intervention"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Pressure vs Stress */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Pressure vs Stress — The Performance Curve
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all stress is bad. In fact, <strong>some pressure is essential for peak performance</strong>. The
                problem arises when pressure becomes excessive and turns into chronic, overwhelming stress. Understanding
                the difference — and recognising the tipping point — is crucial for managing your own wellbeing and
                supporting colleagues.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Yerkes-Dodson Law (1908)</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Psychologists Robert Yerkes and John Dodson discovered that there is an inverted U-shaped relationship
                  between pressure (arousal) and performance. This has profound implications for understanding stress:
                </p>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Zone 1: Low Pressure (Boredom)</p>
                    <p className="text-sm text-white">
                      When demands are too low, we're bored, unmotivated, and underperforming. There's no challenge, no
                      urgency, no reason to focus. Performance is poor. Think of a highly skilled electrician being
                      asked to do nothing but carry materials all day — they'll be disengaged and unproductive.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Zone 2: Optimal Pressure (Eustress)</p>
                    <p className="text-sm text-white">
                      This is the 'sweet spot' where pressure is challenging but manageable. You're focused, energised,
                      motivated, and performing at your best. The deadline pushes you to work efficiently, but you have
                      the time and resources to do quality work. This is <strong>eustress</strong> — positive,
                      performance-enhancing pressure. You feel challenged but capable.
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm mb-1">Zone 3: Excessive Pressure (Distress)</p>
                    <p className="text-sm text-white">
                      Beyond the optimal point, pressure becomes overwhelming. You're anxious, making mistakes,
                      forgetting things, unable to concentrate. Performance declines sharply. This is <strong>distress</strong> —
                      harmful, performance-impairing stress. The deadline is so tight you're rushing, cutting corners,
                      and making errors. You feel overwhelmed and unable to cope.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white mt-3">
                  <strong>The key insight:</strong> The relationship between pressure and performance isn't linear
                  (more pressure = better performance). There's an optimal level. Too little pressure and you
                  underperform. Too much pressure and you underperform. The goal is to stay in the optimal zone where
                  you're challenged but not overwhelmed.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Eustress vs Distress</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold text-sm mb-2">Eustress (Good Stress)</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Feels challenging but achievable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Motivates and energises you</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Improves focus and concentration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Short-term and followed by recovery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Leads to a sense of achievement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Example: The excitement and focus before an important inspection</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">Distress (Harmful Stress)</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Feels overwhelming and unmanageable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Causes anxiety and dread</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Impairs concentration and judgement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Chronic and unrelenting — no recovery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Leads to exhaustion and burnout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Example: Working 70-hour weeks for months with impossible deadlines and no support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The tipping point from eustress to distress varies by individual (remember the Stress Vulnerability
                Model from Section 1). What one person finds challenging and motivating, another might find overwhelming.
                Factors that affect the tipping point include:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span><strong>Control:</strong> If you have some control over the situation, you can tolerate more pressure. If you're powerless, the tipping point is lower.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span><strong>Support:</strong> With good support, you can handle more pressure. Isolated and unsupported, you reach overwhelm faster.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span><strong>Duration:</strong> Short bursts of high pressure are tolerable. Unrelenting pressure with no recovery becomes toxic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span><strong>Meaning:</strong> If the work feels meaningful and worthwhile, you can tolerate more pressure. If it feels pointless, the tipping point is lower.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span><strong>Current state:</strong> If you're already tired, unwell, or dealing with stress in other areas of life, your capacity for work pressure is reduced.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Why This Matters for Construction</p>
                <p className="text-sm text-white">
                  Construction sites often operate in the distress zone — unrealistic deadlines, insufficient resources,
                  lack of control, poor communication. Recognising the difference between healthy pressure and harmful
                  stress helps supervisors calibrate workload and helps individuals recognise when they need to speak
                  up or seek support. The goal isn't to eliminate all pressure (that would create boredom). The goal
                  is to keep pressure in the optimal zone where people are challenged, motivated, and performing well
                  — not overwhelmed, anxious, and making mistakes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Stress Container Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Stress Container Model
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Clinical psychologists Frank Brabban and Douglas Turkington developed the <strong>Stress Container Model</strong> as
                a simple, visual way to understand how stress accumulates and how we manage it. This model is widely
                used in mental health services and is particularly helpful for explaining stress to people who might
                not engage with more abstract psychological theories.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Container className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">How the Model Works</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Imagine a container (like a bucket or a glass) that represents your capacity to handle stress. The model has three key elements:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-sm mb-1">1. The Container (Your Vulnerability/Capacity)</p>
                    <p className="text-sm text-white">
                      The size of your container represents your stress capacity — how much stress you can hold before
                      experiencing symptoms. As we discussed in Section 1 (Stress Vulnerability Model), everyone's
                      container is a different size based on genetics, experiences, physical health, sleep, support
                      systems, and current circumstances. Your container size can change — chronic stress, poor sleep,
                      and isolation shrink it. Good sleep, exercise, support, and recovery time expand it.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-sm mb-1">2. The Tap (Stressors Flowing In)</p>
                    <p className="text-sm text-white">
                      The tap at the top represents stressors — all the pressures, demands, and difficulties flowing
                      into your life. On a construction site, this includes: work deadlines, difficult supervisors,
                      conflict with other trades, financial worries, relationship problems, health concerns, bereavement,
                      noise, poor weather, unsafe working conditions. The tap can flow at different rates — sometimes
                      it's a trickle, sometimes it's a torrent. When multiple stressors hit at once (redundancy + relationship
                      breakdown + money worries), the tap is fully open.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium text-sm mb-1">3. The Valve (Coping Mechanisms)</p>
                    <p className="text-sm text-white">
                      The valve at the bottom of the container represents your coping mechanisms — the ways you drain
                      stress out. When the valve is wide open (effective coping), stress drains out quickly and the
                      container stays manageable. When the valve is narrow or blocked (poor coping), stress accumulates.
                      <strong> When the container overflows, you experience symptoms</strong> — anxiety, depression,
                      panic attacks, physical illness, burnout, breakdown.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Helpful vs Unhelpful Coping Mechanisms</p>
                <p className="text-sm text-white mb-3">
                  Not all coping mechanisms are equal. Some genuinely drain stress and improve wellbeing (helpful
                  coping). Others provide short-term relief but actually make the problem worse (unhelpful coping).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-semibold text-sm mb-2">Helpful Coping Mechanisms (Open the Valve)</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Talking to someone:</strong> Friend, family, colleague, GP, counsellor, helpline</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Physical activity:</strong> Exercise, walking, sports, gym — reduces stress hormones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Problem-solving:</strong> Identifying what you can change and taking action</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Sleep:</strong> Prioritising rest and recovery — essential for mental health</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Relaxation:</strong> Breathing exercises, mindfulness, time in nature, hobbies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Social connection:</strong> Spending time with friends, family, team — not isolating</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Setting boundaries:</strong> Learning to say no, protecting your time and energy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Seeking professional help:</strong> GP, counselling, therapy when needed</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">Unhelpful Coping Mechanisms (Block the Valve)</p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>Alcohol and drugs:</strong> Short-term relief, long-term worsening of anxiety/depression, dependency risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>Avoidance:</strong> Ignoring problems — they escalate and become worse</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>Isolation:</strong> Withdrawing from people who could support you</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>Overworking:</strong> Using work to avoid thinking about problems — leads to burnout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>Comfort eating:</strong> Short-term comfort, long-term physical health problems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>Aggression:</strong> Lashing out, blaming others — damages relationships</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>Self-harm:</strong> Provides momentary relief but doesn't address the problem and creates additional harm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span><strong>Denial:</strong> 'I'm fine' when you're clearly not — prevents you getting help</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-white mt-3">
                  The challenge is that unhelpful coping mechanisms often <em>feel</em> helpful in the short term. A few
                  pints help you relax and forget your problems — tonight. But alcohol disrupts sleep, worsens anxiety
                  the next day, and if you rely on it regularly, you're creating a new problem. Recognising the difference
                  between helpful and unhelpful coping is essential for managing stress effectively.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Three Ways to Prevent Overflow</p>
                <p className="text-sm text-white mb-2">
                  If your stress container is getting too full, you have three options:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Turn down the tap:</strong> Reduce the stressors coming in. This might mean: addressing workload with your supervisor, setting boundaries, delegating, solving problems that are within your control, reducing commitments. You can't control everything, but you can often influence some stressors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Open the valve wider:</strong> Improve your coping mechanisms. Replace unhelpful coping (alcohol, avoidance) with helpful coping (exercise, talking, sleep, problem-solving). Develop new stress-management skills. Access support.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Increase container size:</strong> Build resilience over time. Good sleep, regular exercise, strong relationships, meaningful work, and recovery time all increase your capacity to handle stress. This is long-term work but genuinely effective.</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Most people focus only on turning down the tap (reducing stressors). But sometimes stressors are
                  unavoidable. Opening the valve (better coping) and increasing container size (building resilience)
                  are equally important.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: HSE's Six Management Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            HSE's Six Management Standards for Work-Related Stress
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety Executive (HSE) recognises that work-related stress is a serious health and safety
                issue. In response, they developed the <strong>Management Standards for Work-Related Stress</strong> —
                a framework that identifies six key areas where, if not managed properly, stress is likely to occur.
                These standards apply to all workplaces, including construction sites.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Legal Context</p>
                </div>
                <p className="text-sm text-white">
                  The Management of Health and Safety at Work Regulations 1999 require employers to assess and control
                  risks to health — including mental health. Work-related stress is not just a 'personal problem' —
                  it's a workplace hazard that employers have a legal duty to manage. The HSE standards provide a
                  practical framework for doing this. If you're a supervisor, manager, or employer, you should be
                  familiar with these standards and actively working to meet them.
                </p>
              </div>

              <div className="space-y-4 mt-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-medium text-base mb-2">1. Demands</p>
                  <p className="text-sm text-white mb-3">
                    <strong>Definition:</strong> This includes issues like workload, work patterns, and the work environment.
                    Employees should be able to cope with the demands of their job, and concerns about their work environment
                    should be addressed.
                  </p>
                  <p className="text-sm font-medium text-white mb-2">What good looks like on a construction site:</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Realistic deadlines and achievable programmes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Adequate resources (labour, materials, equipment) to complete the work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Reasonable working hours with proper breaks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Work environment risks (noise, weather, hazards) are assessed and controlled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Workers' concerns about excessive demands are listened to and addressed</span>
                    </li>
                  </ul>
                  <p className="text-sm text-white mt-3">
                    <strong>Common problems in construction:</strong> Unrealistic deadlines, insufficient labour, poor
                    programme planning leading to last-minute rushes, excessive overtime, no allowance for delays or problems.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-medium text-base mb-2">2. Control</p>
                  <p className="text-sm text-white mb-3">
                    <strong>Definition:</strong> How much say a person has in the way they do their work. Employees should
                    have a say in the way they do their work, including work pace, work scheduling, and decision-making.
                  </p>
                  <p className="text-sm font-medium text-white mb-2">What good looks like on a construction site:</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Workers have a say in how they complete tasks (within safety and quality requirements)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Input into work scheduling and sequencing where appropriate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Encouraged to develop skills and take on new challenges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Consulted about changes that will affect them</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Autonomy to make decisions within their level of responsibility</span>
                    </li>
                  </ul>
                  <p className="text-sm text-white mt-3">
                    <strong>Common problems in construction:</strong> Micromanagement, no autonomy, rigid rules with no
                    flexibility, being told exactly how to do everything with no room for professional judgement, no
                    consultation about changes. Research consistently shows that lack of control is one of the strongest
                    predictors of work-related stress.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-medium text-base mb-2">3. Support</p>
                  <p className="text-sm text-white mb-3">
                    <strong>Definition:</strong> This includes encouragement, resources, and assistance provided by the
                    organisation, line management, and colleagues. Employees should receive adequate information and
                    support from their colleagues and superiors.
                  </p>
                  <p className="text-sm font-medium text-white mb-2">What good looks like on a construction site:</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Clear policies and procedures for managing stress and mental health</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Line managers who are approachable, supportive, and listen to concerns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>A supportive team culture where colleagues look out for each other</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Systems in place to respond to individual concerns (e.g., HR, occupational health, EAP)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Regular communication and feedback</span>
                    </li>
                  </ul>
                  <p className="text-sm text-white mt-3">
                    <strong>Common problems in construction:</strong> Absent or unapproachable managers, no support when
                    problems arise, 'tough it out' culture that stigmatises help-seeking, no clear route to raise concerns,
                    isolation (especially for workers on small sites or working alone).
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-medium text-base mb-2">4. Relationships</p>
                  <p className="text-sm text-white mb-3">
                    <strong>Definition:</strong> This includes promoting positive working to avoid conflict and dealing
                    with unacceptable behaviour such as bullying and harassment. Employees should not be subjected to
                    unacceptable behaviours like bullying or harassment.
                  </p>
                  <p className="text-sm font-medium text-white mb-2">What good looks like on a construction site:</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Clear policies on bullying, harassment, and discrimination — actively enforced</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Respectful communication and professional behaviour expected from everyone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Conflicts are addressed early and fairly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Positive team culture where people feel valued and included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Systems for reporting and addressing unacceptable behaviour</span>
                    </li>
                  </ul>
                  <p className="text-sm text-white mt-3">
                    <strong>Common problems in construction:</strong> 'Banter' that crosses into bullying or harassment,
                    discrimination, aggressive communication, conflicts between trades left to fester, power imbalances
                    being abused, complaints not taken seriously.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-medium text-base mb-2">5. Role</p>
                  <p className="text-sm text-white mb-3">
                    <strong>Definition:</strong> Whether people understand their role within the organisation and whether
                    the organisation ensures that they do not have conflicting roles. Employees should understand their
                    role and responsibilities, and the organisation should ensure that there is no conflict in roles.
                  </p>
                  <p className="text-sm font-medium text-white mb-2">What good looks like on a construction site:</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Clear job descriptions and responsibilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Everyone knows what is expected of them and who they report to</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>No conflicting demands from different managers or clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Reporting lines and decision-making authority are clear</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Role ambiguity is addressed quickly</span>
                    </li>
                  </ul>
                  <p className="text-sm text-white mt-3">
                    <strong>Common problems in construction:</strong> Unclear responsibilities ('Is that my job or theirs?'),
                    conflicting instructions from different people, role creep (being expected to do things outside your
                    role with no discussion), lack of clarity about authority and decision-making.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white font-medium text-base mb-2">6. Change</p>
                  <p className="text-sm text-white mb-3">
                    <strong>Definition:</strong> How organisational change (large or small) is managed and communicated.
                    Employees should be engaged when organisational changes are being planned and implemented, and they
                    should understand the reasons for changes.
                  </p>
                  <p className="text-sm font-medium text-white mb-2">What good looks like on a construction site:</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Changes are communicated early and clearly — not sprung on people</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>The reasons for changes are explained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>People are consulted and involved where appropriate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Support is provided during transitions (training, information, time to adjust)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Concerns about changes are listened to and addressed</span>
                    </li>
                  </ul>
                  <p className="text-sm text-white mt-3">
                    <strong>Common problems in construction:</strong> Changes imposed with no warning (programme changes,
                    new procedures, redundancies), no explanation for why changes are happening, no consultation, workers
                    left in the dark about their future, constant uncertainty.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg mt-6">
                <p className="text-sm font-medium text-rose-400 mb-2">Using the Standards</p>
                <p className="text-sm text-white">
                  If you're experiencing work-related stress, these standards give you a framework to identify what's
                  wrong. Is it demands (unrealistic workload)? Lack of control (micromanagement)? Poor support (absent
                  manager)? Bad relationships (bullying)? Role ambiguity? Poorly managed change? Identifying the specific
                  problem helps you articulate it when raising concerns. If you're a supervisor or manager, these
                  standards give you a roadmap for creating a healthier workplace. The HSE provides free tools and
                  guidance on their website for assessing and improving performance against these standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Common Stressors in Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Common Stressors in Construction
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction workers face unique stressors that make them particularly vulnerable to mental health
                problems. Understanding these industry-specific pressures helps explain why construction has such high
                rates of stress, anxiety, depression, and suicide.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">1. Deadlines and Programme Pressure</p>
                </div>
                <p className="text-sm text-white mb-2">
                  Construction programmes are often unrealistic from the outset, with insufficient float for delays.
                  When (not if) delays occur, the pressure to make up time is intense:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Working excessive hours (60-70+ hour weeks) for extended periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Pressure to rush, cut corners, or compromise quality/safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Blame culture when delays happen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Penalty clauses creating financial pressure on employers (passed down to workers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Last-minute changes to programme with no additional time or resources</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  This chronic time pressure keeps workers in the 'distress' zone of the performance curve for months
                  on end. The body and mind never get adequate recovery.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">2. Working Away from Home</p>
                <p className="text-sm text-white mb-2">
                  Many construction workers spend weeks or months away from home, living in digs or hotels:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Loss of family support:</strong> Can't see partner, children, or family regularly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Isolation:</strong> Alone in evenings and weekends, no social network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Relationship strain:</strong> Relationships can break down under the pressure of separation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Missing important events:</strong> Children's birthdays, school events, family occasions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Poor living conditions:</strong> Cramped, noisy accommodation, poor facilities</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  In the Stress Container Model, working away removes multiple protective factors (family support,
                  social connection, familiar environment) while adding stressors (loneliness, relationship strain).
                  This significantly increases vulnerability.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">3. Financial Insecurity</p>
                <p className="text-sm text-white mb-2">
                  Construction employment is often precarious, especially for self-employed and CIS workers:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Job insecurity:</strong> Can be laid off with little or no notice when jobs finish</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Irregular income:</strong> Feast and famine — busy periods followed by no work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Payment delays:</strong> Waiting weeks or months for invoices to be paid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>No sick pay:</strong> If you can't work, you don't get paid — pressure to work when unwell</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Uncertain future:</strong> Never knowing if there will be work next month</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  Financial worry is one of the most potent stressors. Research shows that financial insecurity is
                  strongly associated with anxiety, depression, and suicide. The construction employment model creates
                  chronic financial insecurity for many workers.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">4. Physical Demands and Chronic Pain</p>
                <p className="text-sm text-white mb-2">
                  Construction is physically demanding, leading to high rates of musculoskeletal problems:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Chronic back, knee, and shoulder pain</strong> from years of physical work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Fatigue</strong> from physically demanding days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Injuries</strong> that affect ability to work and earn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Fear about long-term health</strong> — 'Will my body last until I can retire?'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Impact on quality of life</strong> outside work — too tired or in too much pain to enjoy time off</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  The connection between chronic pain and mental health is well-established. Persistent pain increases
                  the risk of depression and anxiety. Pain also disrupts sleep, which further worsens mental health.
                  Many construction workers are living with pain that would have them signed off in other industries.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">5. Noise and Environmental Factors</p>
                <p className="text-sm text-white mb-2">
                  Construction sites are often harsh, unpleasant environments:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Constant noise</strong> from machinery, drilling, cutting — chronic noise is a proven stressor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Extreme temperatures</strong> — working in heat or cold for extended periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Poor facilities</strong> — inadequate toilets, washing, rest areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Hazardous conditions</strong> — dust, fumes, wet, muddy, cramped spaces</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">6. Conflict with Other Trades and Poor Communication</p>
                <p className="text-sm text-white mb-2">
                  Construction projects involve multiple trades and contractors, creating friction:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Interface problems</strong> — one trade's work blocking another, causing frustration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Blame culture</strong> — when things go wrong, everyone points fingers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Poor coordination</strong> — lack of clear communication about sequencing and access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Competitive rather than collaborative culture</strong></span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">7. The 'Man Up' Culture</p>
                <p className="text-sm text-white mb-2">
                  Perhaps the most insidious stressor is the cultural expectation that you should be 'tough':
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Stigma around mental health</strong> — asking for help seen as weakness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Pressure to appear strong and capable at all times</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Fear of ridicule</strong> if you admit you're struggling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Normalisation of suffering</strong> — 'Everyone's stressed, just get on with it'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Lack of awareness</strong> that mental health problems are real, treatable medical conditions</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  This culture prevents help-seeking, meaning problems escalate until they reach crisis point. It's
                  one of the main reasons construction has such high suicide rates — men are struggling but not asking
                  for help until it's too late.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Cumulative Effect</p>
                <p className="text-sm text-white">
                  These stressors don't exist in isolation — they compound. A worker who is: working away from home
                  (isolation), on a CIS contract (financial insecurity), on a job running late (deadline pressure),
                  with chronic back pain (physical health), in a culture where asking for help is stigmatised — has
                  multiple vulnerability factors and few protective factors. Their stress bucket is small and their
                  valve is narrow. They are at significant risk. Understanding these construction-specific stressors
                  helps explain why mental health in this industry is a crisis, not just an individual problem.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: When Stress Becomes Dangerous */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            When Stress Becomes Dangerous
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There's a critical point where stress stops being a performance issue and becomes a safety issue,
                a health issue, and potentially a life-threatening issue. Recognising when stress has crossed this
                threshold is essential for knowing when to intervene.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Chronic Stress Symptoms</p>
                <p className="text-sm text-white mb-2">
                  When stress is unrelenting over weeks and months, it causes persistent symptoms:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Physical:</strong> Chronic fatigue, headaches, digestive problems, muscle tension, weakened immune system (frequent illness), chest pain, high blood pressure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Cognitive:</strong> Persistent difficulty concentrating, memory problems, indecision, mental 'fog', intrusive worrying thoughts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Emotional:</strong> Constant anxiety or dread, low mood, irritability, emotional numbness, feeling overwhelmed and unable to cope</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Behavioural:</strong> Sleep problems, appetite changes, increased substance use, withdrawal, risk-taking, aggression</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  If these symptoms persist for weeks or months, stress has likely progressed into anxiety disorder,
                  depression, or burnout. This requires professional support, not just 'toughing it out'.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Impact on Decision-Making and Safety</p>
                <p className="text-sm text-white mb-2">
                  The HSE's research is clear: stress impairs the cognitive functions essential for safe construction work:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Reduced concentration:</strong> Missing hazards, not noticing warning signs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Impaired judgement:</strong> Poor risk assessment, bad decisions about safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Slower reactions:</strong> Can't respond quickly to hazards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Memory failures:</strong> Forgetting steps in procedures, forgetting to test or isolate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Increased errors:</strong> More mistakes, more near-misses, higher accident risk</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  <strong>On a construction site, this is genuinely dangerous.</strong> Someone who is chronically
                  stressed and can't concentrate should not be working at height, with live electricity, or operating
                  machinery. This isn't about blame — it's about recognising that mental state affects physical safety.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Stress-Related Physical Illness</p>
                <p className="text-sm text-white mb-2">
                  Chronic stress doesn't just affect mental health — it causes serious physical disease:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Cardiovascular disease:</strong> Chronic stress raises blood pressure, increases heart attack and stroke risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Immune suppression:</strong> Stress hormones suppress immune function, making you more vulnerable to illness and infection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Gastrointestinal problems:</strong> IBS, ulcers, digestive issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Chronic pain:</strong> Stress exacerbates musculoskeletal pain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Metabolic problems:</strong> Increased risk of diabetes, weight gain</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  This isn't about being 'soft' or 'weak'. The physiological effects of chronic stress on the body are
                  well-documented in medical research. Stress kills — not just through suicide, but through heart disease,
                  stroke, and other stress-related illnesses.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Link Between Stress and Mental Health Conditions</p>
                <p className="text-sm text-white mb-2">
                  Chronic, unmanaged stress is a major risk factor for developing mental health conditions:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Generalised Anxiety Disorder (GAD):</strong> Chronic worry and anxiety that becomes a clinical condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Depression:</strong> Chronic stress is one of the strongest predictors of developing depression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Panic Disorder:</strong> Stress can trigger panic attacks which may develop into panic disorder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Burnout:</strong> A state of emotional, physical, and mental exhaustion caused by prolonged stress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>PTSD:</strong> Traumatic events at work (accidents, fatalities witnessed) combined with chronic stress can lead to Post-Traumatic Stress Disorder</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-2">
                  What starts as 'normal' work stress can, if unaddressed, progress into diagnosable mental health
                  conditions that require professional treatment. This is why early intervention matters.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">When to Take Action</p>
                </div>
                <p className="text-sm text-white mb-2">
                  Stress requires immediate action when:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>It's affecting safety-critical abilities (concentration, judgement, reaction time)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Someone is experiencing severe physical symptoms (chest pain, panic attacks)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Someone expresses thoughts of self-harm or suicide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Symptoms are persistent (lasting weeks/months) and severe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Someone is completely unable to function or cope</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Actions might include: medical assessment (GP, occupational health), time off work, risk assessment,
                  adjustment to duties, signposting to specialist support, or in crisis situations, emergency services.
                  This isn't about being dramatic — it's about recognising when stress has become dangerous and responding appropriately.
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
                You now understand the difference between healthy pressure and harmful stress, the models that explain
                how stress works, the standards for managing it, and the specific stressors affecting construction
                workers. Key takeaways:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The Yerkes-Dodson Law</strong> shows there's an optimal level of pressure for performance. Too little = boredom, too much = distress. The goal is to stay in the optimal zone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Eustress (good stress)</strong> is short-term, challenging, motivating. Distress (bad stress) is chronic, overwhelming, harmful. Understanding the difference helps you recognise when pressure has become toxic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The Stress Container Model</strong> explains how stress accumulates (the tap), your capacity (the container), and your coping mechanisms (the valve). You can manage stress by reducing stressors, improving coping, and building resilience.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The HSE's six management standards</strong> (Demands, Control, Support, Relationships, Role, Change) provide a framework for identifying and addressing work-related stress. Employers have a legal duty to manage these.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Construction-specific stressors</strong> include deadline pressure, working away from home, financial insecurity, physical demands, harsh environments, conflict, and a culture that stigmatises help-seeking. These compound to create high vulnerability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Chronic stress becomes dangerous</strong> when it affects safety, causes physical illness, leads to mental health conditions, or reaches crisis point. Recognising this threshold is essential for timely intervention.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we'll focus specifically on depression
                  and anxiety — what they are, how they manifest in construction workers (especially men), what they
                  look like on site, and the PHQ-9 and GAD-7 screening tools that GPs use to assess severity.
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
          title="Section 2 Knowledge Check"
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
            <Link to="../mental-health-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Warning Signs
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-2-section-3">
              Next: Depression and Anxiety
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
