/**
 * Level 3 Module 8 Section 3.4 - Stress Management
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 * Techniques for managing exam stress and maintaining peak performance
 */

import { ArrowLeft, Zap, CheckCircle, Heart, Brain, AlertTriangle, Target, Shield, Coffee, Moon, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Stress Management - Level 3 Module 8 Section 3.4";
const DESCRIPTION = "Master stress management techniques for electrical exams. Learn to control exam anxiety, maintain focus under pressure, and perform at your best when it matters most.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the 4-7-8 breathing technique used for during exam stress?",
    options: [
      "Counting questions in the exam",
      "A breathing pattern (4 seconds in, 7 hold, 8 out) to activate relaxation response",
      "A memory technique for numbers",
      "A time allocation strategy"
    ],
    correctIndex: 1,
    explanation: "The 4-7-8 technique involves breathing in for 4 seconds, holding for 7 seconds, and exhaling for 8 seconds. This activates the parasympathetic nervous system, reducing heart rate and promoting calm. It can be used discreetly during exams."
  },
  {
    id: "check-2",
    question: "Why is adequate sleep particularly important the week before an exam?",
    options: [
      "It helps you dream about the answers",
      "Sleep consolidates memories and lack of sleep impairs cognitive function",
      "Examiners check if you look tired",
      "It doesn't matter as long as you study enough"
    ],
    correctIndex: 1,
    explanation: "Sleep is essential for memory consolidation - the process of transferring information from short-term to long-term memory. Sleep deprivation also impairs concentration, decision-making, and recall. One good night's sleep is more valuable than an all-night study session."
  },
  {
    id: "check-3",
    question: "What is 'cognitive reframing' in stress management?",
    options: [
      "Building a frame of reference for answers",
      "Changing your picture frame",
      "Changing how you think about a stressful situation to reduce its impact",
      "A memory technique using picture frames"
    ],
    correctIndex: 2,
    explanation: "Cognitive reframing involves changing your interpretation of a situation. Instead of 'This exam will ruin my career', reframe to 'This exam is one step in my journey - I can retake if needed'. This reduces the perceived threat and associated stress."
  },
  {
    id: "check-4",
    question: "If you experience sudden anxiety during an exam, what should you do FIRST?",
    options: [
      "Leave the exam room immediately",
      "Panic and rush through questions",
      "Pause, take slow deep breaths, and ground yourself before continuing",
      "Ask the invigilator to help with the question"
    ],
    correctIndex: 2,
    explanation: "Pause and breathe before anything else. Taking 30-60 seconds to calm your physiological response prevents panic from escalating. Grounding (feeling your feet on floor, chair beneath you) returns focus to the present. Then continue - a brief pause costs less than a panic spiral."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the 'fight or flight' response and how does it affect exam performance?",
    options: [
      "It helps you answer questions faster",
      "It's the body's stress response that can impair memory recall and clear thinking",
      "It only affects people with anxiety disorders",
      "It improves performance under pressure"
    ],
    correctAnswer: 1,
    explanation: "The fight or flight response releases stress hormones that redirect blood from the brain to muscles, impairing memory recall and complex thinking. While helpful for physical danger, it's counterproductive for exams. Learning to manage it improves performance."
  },
  {
    id: 2,
    question: "What is the recommended caffeine strategy for exam day?",
    options: [
      "Drink as much coffee as possible to stay alert",
      "Avoid all caffeine to prevent nervousness",
      "Consume your normal amount - not more, not less",
      "Have caffeine only after finishing the exam"
    ],
    correctAnswer: 2,
    explanation: "Stick to your normal caffeine routine. Sudden increase causes jitteriness and increased anxiety. Sudden reduction can cause withdrawal headaches and fatigue. Your body performs best when conditions are familiar."
  },
  {
    id: 3,
    question: "Why is physical exercise beneficial for managing exam stress?",
    options: [
      "It makes you too tired to feel anxious",
      "It releases endorphins and reduces cortisol (stress hormone) levels",
      "Examiners give bonus marks for fitness",
      "It's not beneficial - save energy for studying"
    ],
    correctAnswer: 1,
    explanation: "Exercise releases endorphins (natural mood boosters) and reduces cortisol (stress hormone). Even a 20-minute walk can significantly reduce anxiety. Regular exercise during revision improves sleep, mood, and cognitive function."
  },
  {
    id: 4,
    question: "What is 'catastrophising' and why should you avoid it?",
    options: [
      "Planning for exam catastrophes like fire drills",
      "Imagining worst-case scenarios that increase anxiety disproportionately",
      "A studying technique for disaster scenarios",
      "A type of exam question"
    ],
    correctAnswer: 1,
    explanation: "Catastrophising is imagining worst-case scenarios (failing exam = ruined career = life over). This amplifies stress beyond what's warranted. Counter it by asking: 'What's actually likely to happen?' and 'What would I do if the worst happened?'"
  },
  {
    id: 5,
    question: "What role does preparation play in reducing exam stress?",
    options: [
      "No role - stress is unavoidable",
      "Thorough preparation increases confidence and reduces anxiety about unknown content",
      "Preparation increases stress by reminding you of the exam",
      "Only last-minute preparation helps"
    ],
    correctAnswer: 1,
    explanation: "Preparation is the most effective stress reducer. Knowing you've covered the material thoroughly builds genuine confidence. Much exam anxiety comes from uncertainty about content - systematic preparation addresses this directly."
  },
  {
    id: 6,
    question: "What is the recommended approach to the night before an exam?",
    options: [
      "Study as late as possible to maximise learning",
      "Light revision, early dinner, relaxation, and early bed",
      "Complete a full mock exam",
      "Go out to distract yourself from the exam"
    ],
    correctAnswer: 1,
    explanation: "The night before should focus on rest, not cramming. Light revision of key points, an early dinner (easy to digest), relaxing activity, and 7-8 hours sleep. New learning attempted this late won't consolidate and cramming increases anxiety."
  },
  {
    id: 7,
    question: "What is 'grounding' and when should you use it?",
    options: [
      "Electrical safety practice for exam equipment",
      "A technique to return focus to the present moment when feeling overwhelmed",
      "Sitting on the ground to study",
      "A punishment for poor exam performance"
    ],
    correctAnswer: 1,
    explanation: "Grounding techniques bring attention to the present moment: feel feet on floor, hands on desk, notice five things you can see. This interrupts spiralling thoughts and restores focus. Use when feeling overwhelmed or losing focus during exams."
  },
  {
    id: 8,
    question: "How does negative self-talk affect exam performance?",
    options: [
      "It has no effect on performance",
      "It motivates you to try harder",
      "It creates anxiety and can become a self-fulfilling prophecy",
      "It only affects sensitive people"
    ],
    correctAnswer: 2,
    explanation: "Negative self-talk ('I'm going to fail', 'I'm not smart enough') creates anxiety that impairs performance, potentially becoming a self-fulfilling prophecy. Replace with realistic positive statements: 'I've prepared well', 'I'll do my best'."
  },
  {
    id: 9,
    question: "What is the 'Yerkes-Dodson law' as it applies to exam stress?",
    options: [
      "More stress always means better performance",
      "Moderate stress optimises performance; too little or too much impairs it",
      "No stress is the ideal state for exams",
      "Stress and performance are unrelated"
    ],
    correctAnswer: 1,
    explanation: "The Yerkes-Dodson law shows performance follows an inverted-U curve: moderate stress/arousal optimises performance, but too little (boredom) or too much (anxiety) impairs it. Goal is finding your optimal arousal level, not eliminating stress entirely."
  },
  {
    id: 10,
    question: "Why is visualisation an effective stress management technique?",
    options: [
      "It replaces the need for actual revision",
      "The brain responds similarly to imagined and real experiences, building confidence",
      "Examiners use visualisation too",
      "It only works for visual learners"
    ],
    correctAnswer: 1,
    explanation: "Visualising successful performance (calm arrival, confident answering, positive completion) activates similar brain pathways as actual experience. This builds familiarity and confidence, reducing fear of the unknown. Athletes use this extensively."
  },
  {
    id: 11,
    question: "What should you do if you feel panic rising during an exam?",
    options: [
      "Power through as quickly as possible",
      "Tell the invigilator you're having a panic attack",
      "Stop, breathe deeply, ground yourself, then return to easier questions first",
      "Leave and attempt a resit"
    ],
    correctAnswer: 2,
    explanation: "Stop what you're doing and breathe slowly and deeply for 30-60 seconds. Use grounding (feel chair, floor, notice surroundings). Then return to an easier question to rebuild confidence. This brief pause prevents a full panic spiral and is worth the time investment."
  },
  {
    id: 12,
    question: "What is the benefit of arriving early on exam day?",
    options: [
      "You can study more in the waiting area",
      "Time to settle, use bathroom, reduce rush anxiety, and enter calm",
      "Early arrivals get easier questions",
      "No benefit - it just increases waiting time"
    ],
    correctAnswer: 1,
    explanation: "Arriving 20-30 minutes early allows time to find the room, use the bathroom, settle nerves, and enter the exam calmly. Rushing increases cortisol levels and starts the exam in a stressed state. Being early shows self-care and preparation."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "I always blank out in exams - what can I do?",
    answer: "Blanking is usually caused by high anxiety triggering the fight-or-flight response. Practice relaxation techniques during revision so they're automatic. In the exam, if you blank, stop, breathe slowly for 30 seconds, then start with the easiest question you can find. Movement helps too - shift in your seat, stretch fingers."
  },
  {
    question: "Is some stress actually helpful for exams?",
    answer: "Yes - moderate stress (sometimes called 'eustress') improves alertness and performance. The goal isn't zero stress but optimal stress. Too little and you may be complacent; too much and performance drops. View some nervousness as your body preparing to perform."
  },
  {
    question: "How do I stop negative thoughts before an exam?",
    answer: "Notice when negative thoughts occur and actively challenge them. Ask: 'Is this thought true? Is it helpful?' Replace with realistic alternatives: 'I've prepared as well as I can' rather than 'I'm definitely going to fail'. This takes practice but becomes easier."
  },
  {
    question: "What if I didn't prepare enough and feel panicked?",
    answer: "Accept the situation - you cannot change the past. Focus on maximising performance with what you know. Read questions carefully, eliminate wrong answers, and attempt every question. Post-exam, reflect on preparation strategies for next time."
  },
  {
    question: "Should I talk to others about exam stress?",
    answer: "Sharing concerns can help, but avoid 'stress contagion' from very anxious peers. Talk to supportive people who help you feel calmer. If stress is severe or persistent, professional support (counsellor, GP) is available and nothing to be ashamed of."
  },
  {
    question: "Can I take medication for exam anxiety?",
    answer: "Some people use beta-blockers or anti-anxiety medication prescribed by a GP. However, medication is not a substitute for preparation and coping strategies. Any medication should be trialled before exam day to understand its effects on you. Always consult a healthcare professional."
  }
];

// ============================================
// STRESS SIGNS DATA
// ============================================
const stressSigns = {
  physical: [
    "Racing heartbeat",
    "Sweaty palms",
    "Shallow breathing",
    "Tight shoulders/neck",
    "Upset stomach",
    "Headaches"
  ],
  mental: [
    "Racing thoughts",
    "Difficulty concentrating",
    "Memory blanks",
    "Catastrophising",
    "Negative self-talk",
    "Feeling overwhelmed"
  ],
  behavioural: [
    "Avoidance of revision",
    "Poor sleep",
    "Over/under eating",
    "Irritability",
    "Procrastination",
    "Social withdrawal"
  ]
};

// ============================================
// COPING TECHNIQUES DATA
// ============================================
const copingTechniques = [
  {
    technique: "Deep Breathing (4-7-8)",
    description: "Breathe in for 4 counts, hold for 7, exhale for 8",
    when: "When feeling anxious, before and during exams",
    benefit: "Activates parasympathetic nervous system, reduces heart rate",
    icon: Wind
  },
  {
    technique: "Progressive Muscle Relaxation",
    description: "Systematically tense and release muscle groups",
    when: "Before bed, during revision breaks",
    benefit: "Releases physical tension, promotes relaxation",
    icon: Heart
  },
  {
    technique: "Grounding (5-4-3-2-1)",
    description: "Notice 5 things you see, 4 hear, 3 feel, 2 smell, 1 taste",
    when: "When feeling detached or panicked",
    benefit: "Returns focus to present moment, interrupts anxiety spiral",
    icon: Shield
  },
  {
    technique: "Positive Visualisation",
    description: "Imagine yourself calmly succeeding in the exam",
    when: "Daily during revision, morning of exam",
    benefit: "Builds confidence, familiarises brain with success",
    icon: Brain
  },
  {
    technique: "Cognitive Reframing",
    description: "Challenge and change negative thought patterns",
    when: "When catching negative self-talk",
    benefit: "Reduces catastrophising, promotes realistic thinking",
    icon: Target
  },
  {
    technique: "Physical Exercise",
    description: "20-30 minutes of moderate activity",
    when: "Daily during revision period, not exam morning",
    benefit: "Releases endorphins, reduces cortisol, improves sleep",
    icon: Heart
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Stress Management
          </h1>
          <p className="text-white/80">
            Perform at your best when the pressure is on
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Some stress is good:</strong> Moderate arousal improves performance</li>
              <li><strong>Breathe:</strong> 4-7-8 technique activates calm</li>
              <li><strong>Prepare:</strong> Best anxiety reducer is thorough preparation</li>
              <li><strong>Sleep:</strong> Essential for memory and clear thinking</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Racing heart, shallow breathing, negative thoughts</li>
              <li><strong>Use:</strong> Deep breathing to restore calm</li>
              <li><strong>Apply:</strong> Grounding when feeling overwhelmed</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Recognise signs of exam stress in yourself",
              "Apply effective relaxation techniques",
              "Use cognitive strategies to manage anxious thoughts",
              "Prepare physically and mentally for exam day",
              "Handle sudden anxiety during exams",
              "Build long-term resilience to exam pressure"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Exam Stress
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Exam stress is a normal response to a challenging situation. Your body's 'fight or flight' system evolved to help you survive physical threats, but it can be triggered by psychological challenges like exams. Understanding this response helps you manage it effectively.
            </p>

            <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/20 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Yerkes-Dodson Law</p>
              <p className="text-xs text-white/90 mb-2">
                Performance follows an inverted-U curve with arousal. Too little stress (boredom, complacency) leads to poor performance. Too much stress (anxiety, panic) also impairs performance. Moderate stress optimises performance.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs mt-3">
                <span className="px-2 py-1 rounded bg-red-500/20 text-red-400">Low arousal (bored)</span>
                <span className="text-white/50">→</span>
                <span className="px-2 py-1 rounded bg-green-500/20 text-green-400">Optimal (alert)</span>
                <span className="text-white/50">→</span>
                <span className="px-2 py-1 rounded bg-red-500/20 text-red-400">High arousal (anxious)</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Physical Signs</p>
                <ul className="text-xs text-white/80 space-y-1">
                  {stressSigns.physical.map((sign, i) => (
                    <li key={i}>{sign}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Mental Signs</p>
                <ul className="text-xs text-white/80 space-y-1">
                  {stressSigns.mental.map((sign, i) => (
                    <li key={i}>{sign}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-white mb-2">Behavioural Signs</p>
                <ul className="text-xs text-white/80 space-y-1">
                  {stressSigns.behavioural.map((sign, i) => (
                    <li key={i}>{sign}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Insight:</strong> Some stress is beneficial - it's your body's way of preparing to perform. The goal is not zero stress, but optimal stress. Learn to interpret nervous feelings as readiness, not weakness.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Relaxation Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Relaxation techniques work by activating your parasympathetic nervous system - the 'rest and digest' response that counteracts 'fight or flight'. With practice, these techniques become automatic tools you can deploy whenever stress rises.
            </p>

            <div className="space-y-4 my-6">
              {copingTechniques.slice(0, 4).map((tech, index) => (
                <div key={index} className="p-4 rounded-lg bg-transparent border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <tech.icon className="w-4 h-4 text-elec-yellow" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white mb-1">{tech.technique}</p>
                      <p className="text-xs text-white/80 mb-2">{tech.description}</p>
                      <div className="grid sm:grid-cols-2 gap-2 text-xs">
                        <span className="text-blue-400">When: <span className="text-white/60">{tech.when}</span></span>
                        <span className="text-green-400">Benefit: <span className="text-white/60">{tech.benefit}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <div className="flex items-start gap-3">
                <Wind className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-400 mb-1">The 4-7-8 Breath - Step by Step</p>
                  <ol className="text-xs text-white/90 space-y-1">
                    <li>1. Empty lungs completely through mouth</li>
                    <li>2. Breathe in quietly through nose for 4 seconds</li>
                    <li>3. Hold breath for 7 seconds</li>
                    <li>4. Exhale completely through mouth for 8 seconds (with whoosh)</li>
                    <li>5. Repeat 3-4 times</li>
                  </ol>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practice Required:</strong> These techniques work best when practised regularly, not just in emergencies. Spend 5 minutes daily during revision practising breathing exercises. Then they'll be automatic when you need them in the exam.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Managing Anxious Thoughts
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Much exam anxiety comes from unhelpful thought patterns rather than the exam itself. Catastrophising, negative self-talk, and perfectionism amplify stress beyond what's warranted. Cognitive techniques help you think more realistically and helpfully.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Unhelpful Thought Patterns:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-xs font-medium text-red-400 mb-2">Catastrophising</p>
                  <p className="text-xs text-white/70">"If I fail this exam, my career is over and I'll never amount to anything"</p>
                </div>
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-xs font-medium text-red-400 mb-2">All-or-Nothing</p>
                  <p className="text-xs text-white/70">"If I don't get 100%, I've completely failed"</p>
                </div>
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-xs font-medium text-red-400 mb-2">Fortune Telling</p>
                  <p className="text-xs text-white/70">"I just know I'm going to fail"</p>
                </div>
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-xs font-medium text-red-400 mb-2">Mind Reading</p>
                  <p className="text-xs text-white/70">"Everyone will think I'm stupid if I don't pass"</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-elec-yellow/20 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cognitive Reframing Process</p>
              <ol className="text-xs text-white/90 space-y-1">
                <li>1. <strong>Notice</strong> the anxious thought ("I'm going to fail")</li>
                <li>2. <strong>Question</strong> it ("Is this definitely true? What's the evidence?")</li>
                <li>3. <strong>Challenge</strong> it ("What would I tell a friend thinking this?")</li>
                <li>4. <strong>Replace</strong> with a realistic alternative ("I've prepared well. Whatever happens, I'll cope.")</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-xs font-medium text-red-400 mb-1">Unhelpful:</p>
                <p className="text-xs text-white/70">"I'm going to fail and everyone will judge me"</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-xs font-medium text-green-400 mb-1">Realistic:</p>
                <p className="text-xs text-white/70">"I've prepared as well as I can. I'll do my best and handle whatever comes."</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Reality Check:</strong> Even if you did fail, what would actually happen? You could retake. Your career wouldn't be over. Most people won't even know. Examining worst-case scenarios often reveals they're not as catastrophic as anxiety suggests.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Exam Day Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              How you manage the exam day itself significantly affects performance. A calm, prepared approach sets you up for success. These strategies cover before, during, and (if needed) recovering from moments of anxiety.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Moon className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Night Before</p>
                </div>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Light revision only - key facts/mnemonics</li>
                  <li>Prepare everything: ID, equipment, route</li>
                  <li>Easy-to-digest dinner</li>
                  <li>Relaxing activity (not intense revision)</li>
                  <li>Aim for 7-8 hours sleep</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Coffee className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Morning Of</p>
                </div>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Normal breakfast (not too heavy)</li>
                  <li>Normal caffeine amount (not extra)</li>
                  <li>Brief review of key mnemonics only</li>
                  <li>Leave in plenty of time</li>
                  <li>Practice breathing en route</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">During the Exam: If Panic Rises</p>
              <ol className="text-xs text-white/90 space-y-2">
                <li><strong>1. STOP</strong> - Put your pen down. Don't try to power through panic.</li>
                <li><strong>2. BREATHE</strong> - 30-60 seconds of slow, deep breathing (4-7-8 if you've practised it).</li>
                <li><strong>3. GROUND</strong> - Feel feet on floor, hands on desk. Notice 5 things you can see.</li>
                <li><strong>4. RESTART EASY</strong> - Return to an easier question to rebuild confidence.</li>
                <li><strong>5. PROCEED</strong> - Continue systematically. Brief pause was worth it.</li>
              </ol>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-400 mb-1">Avoid These Exam Day Mistakes</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>Cramming new material - creates anxiety, won't consolidate</li>
                    <li>Excessive caffeine - increases jitteriness</li>
                    <li>Discussing difficult topics with anxious peers</li>
                    <li>Arriving late - rush elevates cortisol</li>
                    <li>Skipping breakfast - brain needs fuel</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Arrive Early:</strong> Being at the venue 20-30 minutes early allows time to settle, use bathroom, and enter the exam calm. This small investment pays huge dividends in reduced stress.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building Stress Resilience</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Practice relaxation techniques daily during revision period</li>
                <li>Regular physical exercise (reduces baseline cortisol)</li>
                <li>Maintain social connections - don't isolate during revision</li>
                <li>Keep perspective - exams are important but not everything</li>
                <li>Celebrate small wins and progress, not just final results</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sleep Optimisation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consistent sleep/wake times (including weekends)</li>
                <li>No screens 1 hour before bed</li>
                <li>Cool, dark, quiet sleeping environment</li>
                <li>Avoid caffeine after early afternoon</li>
                <li>Light exercise during day (not late evening)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">When to Seek Help</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Anxiety persists despite self-help techniques</li>
                <li>Sleep disruption affecting daily functioning</li>
                <li>Physical symptoms (chest pain, severe headaches)</li>
                <li>Feeling hopeless or overwhelmed consistently</li>
                <li>Consider speaking to GP, counsellor, or support services</li>
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

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Stress Management</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">In-Exam Techniques</p>
                <ul className="space-y-0.5">
                  <li>4-7-8 breathing for immediate calm</li>
                  <li>5-4-3-2-1 grounding for overwhelm</li>
                  <li>Start with easier questions</li>
                  <li>Brief pause beats panic spiral</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Preparation Phase</p>
                <ul className="space-y-0.5">
                  <li>Daily relaxation practice</li>
                  <li>Regular exercise</li>
                  <li>7-8 hours sleep nightly</li>
                  <li>Challenge negative thoughts</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Memory Techniques
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8-section4-1">
              Next: Score Analysis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section3_4;
