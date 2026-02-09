import { ArrowLeft, CloudRain, CheckCircle, AlertTriangle, Brain, Heart, Users, Activity, BookOpen, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "depression-duration",
    question: "How long must symptoms persist for a diagnosis of clinical depression (Major Depressive Disorder)?",
    options: [
      "A few days",
      "At least 1 week",
      "At least 2 weeks, most of the day, nearly every day",
      "At least 6 months"
    ],
    correctIndex: 2,
    explanation: "According to ICD-11 and NICE guidelines, symptoms of depression must be present most of the day, nearly every day, for at least 2 weeks to meet the threshold for a diagnosis of Major Depressive Disorder. This duration criterion is what distinguishes clinical depression from normal low mood or sadness."
  },
  {
    id: "depression-type",
    question: "Which type of depression is characterised by episodes recurring at the same time each year, typically during autumn and winter?",
    options: [
      "Persistent Depressive Disorder (dysthymia)",
      "Postnatal Depression",
      "Seasonal Affective Disorder (SAD)",
      "Bipolar Depression"
    ],
    correctIndex: 2,
    explanation: "Seasonal Affective Disorder (SAD) is a form of depression that follows a seasonal pattern, most commonly beginning in autumn and continuing through winter when daylight hours are reduced. It is thought to be linked to reduced exposure to sunlight affecting the body&rsquo;s production of melatonin and serotonin."
  },
  {
    id: "nice-stepped-care",
    question: "In the NICE stepped care model for depression, what is typically the first intervention offered at Step 1?",
    options: [
      "Antidepressant medication (SSRIs)",
      "Intensive inpatient psychiatric care",
      "Active monitoring, psychoeducation, and guided self-help",
      "Electroconvulsive therapy (ECT)"
    ],
    correctIndex: 2,
    explanation: "Step 1 of the NICE stepped care model involves recognition, assessment, and active monitoring. For mild depression, this includes guided self-help, psychoeducation (helping the person understand their condition), sleep hygiene advice, and lifestyle changes such as exercise. Medication is typically introduced at Step 2 or above if symptoms persist or worsen."
  }
];

const faqs = [
  {
    question: "How is depression different from just feeling sad or having a bad week?",
    answer: "Normal sadness is a healthy emotional response to difficult events such as bereavement, relationship breakdown, or work problems. It is usually proportionate to the situation, temporary, and resolves on its own or with support from friends and family. Clinical depression, by contrast, is a persistent medical condition that lasts at least 2 weeks, affects most areas of life, often has no clear external trigger, and does not simply go away with willpower. Depression impairs your ability to function at work, maintain relationships, and carry out daily activities. It involves physical symptoms (fatigue, sleep disturbance, appetite changes) alongside emotional ones. If someone has been experiencing low mood, loss of interest, and several other symptoms for more than 2 weeks, they should speak to their GP."
  },
  {
    question: "Can depression affect your ability to work safely on site?",
    answer: "Yes, depression can significantly impact workplace safety, particularly in high-risk environments like construction and electrical work. Depression causes poor concentration, slowed reaction times, difficulty making decisions, fatigue, and reduced motivation. All of these impairments increase the risk of accidents and errors. A depressed electrician may misread a wiring diagram, forget to isolate a circuit, or fail to notice a hazard. The HSE recognises that mental health conditions, including depression, are a significant factor in workplace accidents. Employers have a duty of care to support employees experiencing mental health difficulties and to ensure that no one is working in conditions that are unsafe due to their mental state."
  },
  {
    question: "What should I do if I think a colleague might be depressed?",
    answer: "The most important thing you can do is start a conversation. Choose a private, quiet moment and express your concern in a non-judgemental way. You might say something like, 'I've noticed you don't seem yourself lately &mdash; is everything alright?' Listen without trying to fix the problem or offer quick solutions. Do not diagnose them or tell them to 'cheer up'. Let them know you are there for them and encourage them to speak to their GP or call a helpline such as the Samaritans (116 123). If your workplace has a Mental Health First Aider or Employee Assistance Programme (EAP), signpost them to these resources. Follow up with them afterwards &mdash; checking in shows you care. If you believe they are in immediate danger of harming themselves, do not leave them alone and call 999."
  },
  {
    question: "Are antidepressants addictive? Will they change my personality?",
    answer: "Antidepressants (such as SSRIs and SNRIs) are not addictive in the way that substances like alcohol or opioids are. They do not cause cravings or compulsive use. However, they can cause discontinuation symptoms if stopped suddenly, which is why they should always be reduced gradually under GP supervision. Antidepressants do not change your personality or make you a different person. They work by correcting chemical imbalances in the brain (primarily serotonin and noradrenaline) that contribute to depression. Most people describe feeling 'more like themselves' once the medication takes effect, typically after 2&ndash;4 weeks. Common side effects include nausea, headaches, and sleep changes, but these usually settle within the first 1&ndash;2 weeks."
  },
  {
    question: "Is depression more common in the construction industry?",
    answer: "Research consistently shows that construction workers experience higher rates of depression, anxiety, and suicide compared to the general population. A 2019 study by the Chartered Institute of Building (CIOB) found that 26% of construction professionals had experienced suicidal thoughts, and 97% had experienced stress. Factors include long working hours, job insecurity, time away from family, a culture of toughness that discourages help-seeking, physical demands, financial pressures, and exposure to traumatic incidents. Male construction workers in the UK are three times more likely to die by suicide than the national male average. Organisations such as Mates in Mind and the Lighthouse Club provide targeted mental health support for the construction sector."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the key difference between normal low mood and clinical depression?",
    options: [
      "Low mood only affects your emotions, while depression also affects your body",
      "Clinical depression lasts at least 2 weeks, affects most of the day nearly every day, and impairs daily functioning",
      "Low mood is caused by life events, while depression has no cause",
      "There is no real difference &mdash; they are the same thing"
    ],
    correctAnswer: 1,
    explanation: "Clinical depression is distinguished from normal low mood by its duration (at least 2 weeks), pervasiveness (most of the day, nearly every day), severity (significantly impairs daily functioning), and the presence of multiple symptoms across emotional, physical, cognitive, and behavioural domains. Normal sadness is usually proportionate, temporary, and does not prevent someone from functioning."
  },
  {
    id: 2,
    question: "Which of the following is a cognitive symptom of depression?",
    options: [
      "Fatigue and low energy",
      "Withdrawal from social activities",
      "Poor concentration and indecisiveness",
      "Changes in appetite and weight"
    ],
    correctAnswer: 2,
    explanation: "Poor concentration, indecisiveness, negative thinking patterns, and memory problems are cognitive symptoms of depression. Fatigue is a physical symptom, withdrawal is a behavioural symptom, and appetite changes are physical symptoms. Understanding the four categories of symptoms (emotional, physical, cognitive, behavioural) helps in recognising depression."
  },
  {
    id: 3,
    question: "What is Persistent Depressive Disorder (dysthymia)?",
    options: [
      "A severe episode of depression lasting less than 2 weeks",
      "Depression caused by the changing seasons",
      "A chronic, lower-grade form of depression lasting 2 years or more",
      "Depression that only occurs after childbirth"
    ],
    correctAnswer: 2,
    explanation: "Persistent Depressive Disorder (formerly called dysthymia) is a chronic form of depression where symptoms are present most days for at least 2 years. While the symptoms may be less severe than Major Depressive Disorder, the long duration means it can be equally disabling over time. People with dysthymia may experience periods of major depression on top of their chronic symptoms (known as 'double depression')."
  },
  {
    id: 4,
    question: "Which of the following is a risk factor for depression that is particularly relevant to the construction industry?",
    options: [
      "Working in a well-lit office environment",
      "Regular social contact with colleagues",
      "Job insecurity, long hours, a culture of toughness, and time away from family",
      "Having access to an Employee Assistance Programme"
    ],
    correctAnswer: 2,
    explanation: "Construction-specific risk factors include job insecurity (particularly for subcontractors and agency workers), long and unpredictable hours, a macho culture that discourages help-seeking, physical demands and chronic pain, time away from family on remote sites, financial pressures, and exposure to accidents or fatalities. These factors contribute to the construction industry having one of the highest rates of depression and suicide."
  },
  {
    id: 5,
    question: "In the NICE stepped care model, at which step are antidepressant medications typically first introduced?",
    options: [
      "Step 1 &mdash; for all cases of low mood",
      "Step 2 &mdash; for persistent sub-threshold or mild to moderate depression",
      "Step 3 &mdash; for moderate to severe depression that has not responded to psychological therapy alone",
      "Step 4 &mdash; only in crisis situations"
    ],
    correctAnswer: 1,
    explanation: "NICE guidelines recommend that antidepressants (typically SSRIs such as sertraline or fluoxetine) may be considered at Step 2 for persistent sub-threshold depressive symptoms or mild to moderate depression that has not responded to initial interventions. At Step 3, antidepressants are more routinely offered alongside psychological therapy for moderate to severe depression. Step 1 focuses on active monitoring and self-help, while Step 4 is for severe, complex, or treatment-resistant cases."
  },
  {
    id: 6,
    question: "What does 'presenteeism' mean in the context of depression in the workplace?",
    options: [
      "Being absent from work due to depression",
      "Attending work while depressed, resulting in significantly reduced productivity and increased risk of errors",
      "Presenting a happy face to colleagues to hide depression",
      "Being present at all workplace mental health training sessions"
    ],
    correctAnswer: 1,
    explanation: "Presenteeism refers to attending work while unwell (physically or mentally), resulting in reduced productivity, impaired concentration, and increased risk of errors and accidents. Research suggests presenteeism from depression costs UK employers more than absenteeism because depressed workers may be at work but functioning at a fraction of their capacity. In safety-critical industries like electrical work, presenteeism can also pose a direct safety risk."
  },
  {
    id: 7,
    question: "Which of the following best describes Seasonal Affective Disorder (SAD)?",
    options: [
      "A form of depression triggered by a traumatic life event that occurs in any season",
      "A recurrent pattern of depression that follows a seasonal cycle, most commonly in autumn and winter",
      "A type of anxiety disorder that causes seasonal mood swings",
      "A mild form of depression that only affects people who work outdoors"
    ],
    correctAnswer: 1,
    explanation: "Seasonal Affective Disorder (SAD) is a form of depression that follows a seasonal pattern, most commonly beginning in autumn and persisting through winter. It is linked to reduced sunlight exposure, which affects the body's production of melatonin (sleep hormone) and serotonin (mood-regulating neurotransmitter). Symptoms include low mood, fatigue, oversleeping, carbohydrate cravings, and social withdrawal. Treatment includes light therapy, CBT, and sometimes antidepressants."
  },
  {
    id: 8,
    question: "According to UK guidelines, what is the recommended first point of contact for someone who thinks they may be experiencing depression?",
    options: [
      "Accident and Emergency (A&E)",
      "Their employer's HR department",
      "Their GP (General Practitioner)",
      "A private psychiatrist"
    ],
    correctAnswer: 2,
    explanation: "The GP is the recommended first point of contact for anyone experiencing symptoms of depression. The GP can carry out an initial assessment (often using tools like the PHQ-9 questionnaire), rule out physical causes, discuss treatment options, and refer to talking therapies (via IAPT/NHS Talking Therapies) or specialist mental health services if needed. The GP acts as the gatekeeper to the NHS stepped care model for depression."
  }
];

export default function MentalHealthModule2Section1() {
  useSEO({
    title: "Understanding Depression | Mental Health Module 2.1",
    description: "Learn about clinical depression versus low mood, types of depression, symptoms across four categories, risk factors including construction-specific factors, workplace impact, and NICE guidelines for treatment.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../mental-health-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <CloudRain className="h-10 w-10 text-purple-400 mx-auto mb-4" />
          <span className="inline-block bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Understanding Depression
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Recognising clinical depression, understanding its types and symptoms, identifying risk factors, and knowing how the NICE stepped care model guides treatment in the UK
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400/80 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-purple-500/10 border-l-2 border-l-purple-500/50 border border-purple-500/30">
              <p className="font-semibold text-base text-purple-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Not the same as sadness:</strong> Clinical depression is a medical condition, not a character weakness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Duration matters:</strong> Symptoms must persist for at least 2 weeks, most of the day, nearly every day.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Four symptom types:</strong> Emotional, physical, cognitive, and behavioural.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>GP first:</strong> The GP is the gateway to NHS treatment via the stepped care model.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Recovery is possible:</strong> With the right support, most people recover from depression.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-purple-500/10 border-l-2 border-l-purple-500/50 border border-purple-500/30">
              <p className="font-semibold text-base text-purple-400 mb-2">In the Workplace</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Construction high-risk:</strong> Male construction workers are 3x more likely to die by suicide than the national average.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Hidden condition:</strong> Depression is often invisible &mdash; colleagues may mask symptoms on site.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Safety critical:</strong> Depression impairs concentration, decision-making, and reaction time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                  <span><strong>Start a conversation:</strong> Asking &ldquo;Are you OK?&rdquo; can be the first step to saving a life.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-purple-400/80 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Distinguish between normal low mood and clinical depression using diagnostic criteria</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Identify the main types of depression: MDD, dysthymia, SAD, postnatal, and bipolar depression</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Recognise symptoms of depression across four categories: emotional, physical, cognitive, and behavioural</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Explain risk factors for depression, including those specific to construction and electrical trades</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Describe how depression affects workplace safety, productivity, and colleague relationships</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>Outline the NICE stepped care model and the main treatment options available through the NHS</span>
            </li>
          </ul>
        </section>

        <hr className="border-white/10 mb-10" />

        {/* Section 01: Clinical Depression vs Low Mood */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">01</span>
              Clinical Depression vs Low Mood
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Everyone experiences periods of low mood. Feeling sad after a bereavement, stressed before a deadline,
                or down after a setback is a normal part of being human. These feelings are usually proportionate to the
                situation, temporary, and manageable with everyday coping strategies such as talking to friends, exercising,
                or simply waiting for the feeling to pass.
              </p>

              <p>
                <strong>Clinical depression</strong> (also known as Major Depressive Disorder) is fundamentally different.
                It is a recognised medical condition with specific diagnostic criteria, not a sign of weakness or something
                you can simply &ldquo;snap out of&rdquo;. Depression affects the brain&rsquo;s chemistry, particularly the
                neurotransmitters serotonin, noradrenaline, and dopamine, and produces symptoms that are persistent,
                pervasive, and disabling.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">Definition: Clinical Depression</h3>
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Clinical depression</strong> is a mood disorder characterised by persistent
                  low mood and/or loss of interest or pleasure in activities (anhedonia), lasting at least <strong className="text-white">2
                  weeks</strong>, present <strong className="text-white">most of the day, nearly every day</strong>, and
                  causing significant impairment in social, occupational, or other important areas of functioning. Diagnosis
                  is based on criteria set out in the ICD-11 (International Classification of Diseases) used in UK clinical
                  practice.
                </p>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">Low Mood vs Clinical Depression</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-3 text-center">Normal Low Mood</h4>
                    <ul className="text-white/80 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Usually linked to a specific cause or event</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Lifts after a few days or when circumstances change</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>You can still enjoy some activities and laugh</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Does not usually affect your ability to work or function</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Responds to everyday support (friends, rest, time)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <h4 className="text-purple-300 font-semibold mb-3 text-center">Clinical Depression</h4>
                    <ul className="text-white/80 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>May have no obvious trigger or be disproportionate to events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Persists for at least 2 weeks, often months or longer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Loss of interest or pleasure in things you normally enjoy (anhedonia)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Significantly impairs work, relationships, and daily life</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Requires professional treatment (therapy, medication, or both)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  The 2-week, most-of-the-day, nearly-every-day threshold is used by GPs to distinguish between normal low mood and clinical depression.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Depression Is Not a Choice</h3>
                </div>
                <p className="text-white/80 text-sm">
                  One of the most damaging myths about depression is that people can simply &ldquo;choose to be happy&rdquo;
                  or &ldquo;pull themselves together&rdquo;. Depression involves measurable changes in brain chemistry and
                  function. Telling someone with depression to cheer up is as unhelpful as telling someone with a broken
                  leg to walk it off. This myth is particularly prevalent in male-dominated industries like construction,
                  where it prevents people from seeking the help they need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Types of Depression */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">02</span>
              Types of Depression
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Depression is not a single condition &mdash; it encompasses several related disorders, each with distinct
                characteristics. Understanding the different types helps Mental Health First Aiders recognise that depression
                can present in many ways and that treatment approaches may vary.
              </p>

              {/* Types of Depression Comparison Table Diagram */}
              <div className="bg-white/5 border border-purple-400/30 p-4 sm:p-6 rounded-lg overflow-x-auto">
                <h3 className="text-purple-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">Types of Depression &mdash; Comparison</h3>
                <div className="space-y-3 min-w-0">
                  {/* MDD */}
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-400/60 flex items-center justify-center">
                          <CloudRain className="w-5 h-5 text-purple-300" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-semibold mb-1">Major Depressive Disorder (MDD)</h4>
                        <p className="text-white/70 text-sm mb-2"><strong className="text-white/90">Duration:</strong> At least 2 weeks per episode</p>
                        <p className="text-white/70 text-sm mb-2"><strong className="text-white/90">Key features:</strong> Severe episodes of persistent low mood, anhedonia, and multiple associated symptoms. Can be a single episode or recurrent. Most common form of depression.</p>
                        <p className="text-white/70 text-sm"><strong className="text-white/90">Severity:</strong> Mild, moderate, or severe (with or without psychotic features)</p>
                      </div>
                    </div>
                  </div>

                  {/* Dysthymia */}
                  <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-violet-500/20 border-2 border-violet-400/60 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-violet-300" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-violet-300 font-semibold mb-1">Persistent Depressive Disorder (Dysthymia)</h4>
                        <p className="text-white/70 text-sm mb-2"><strong className="text-white/90">Duration:</strong> At least 2 years of chronic low mood</p>
                        <p className="text-white/70 text-sm mb-2"><strong className="text-white/90">Key features:</strong> Lower-grade but long-lasting depression. May feel like &ldquo;this is just how I am&rdquo;. Can have episodes of major depression on top (&ldquo;double depression&rdquo;).</p>
                        <p className="text-white/70 text-sm"><strong className="text-white/90">Severity:</strong> Generally milder than MDD but equally disabling due to chronicity</p>
                      </div>
                    </div>
                  </div>

                  {/* SAD */}
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-400/60 flex items-center justify-center">
                          <span className="text-purple-300 text-lg">&#9729;</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-semibold mb-1">Seasonal Affective Disorder (SAD)</h4>
                        <p className="text-white/70 text-sm mb-2"><strong className="text-white/90">Duration:</strong> Seasonal pattern, typically autumn/winter onset, remitting in spring</p>
                        <p className="text-white/70 text-sm mb-2"><strong className="text-white/90">Key features:</strong> Depression linked to reduced daylight. Symptoms include oversleeping, carbohydrate cravings, weight gain, and lethargy. Affects up to 6% of the UK population. Particularly relevant for those working indoors or on sites with limited natural light.</p>
                        <p className="text-white/70 text-sm"><strong className="text-white/90">Treatment:</strong> Light therapy (SAD lamps), CBT, antidepressants</p>
                      </div>
                    </div>
                  </div>

                  {/* Postnatal */}
                  <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-violet-500/20 border-2 border-violet-400/60 flex items-center justify-center">
                          <Heart className="w-5 h-5 text-violet-300" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-violet-300 font-semibold mb-1">Postnatal Depression</h4>
                        <p className="text-white/70 text-sm mb-2"><strong className="text-white/90">Duration:</strong> Develops within 12 months of giving birth; can last months if untreated</p>
                        <p className="text-white/70 text-sm mb-2"><strong className="text-white/90">Key features:</strong> More severe and persistent than &ldquo;baby blues&rdquo;. Affects 1 in 10 women and can also affect fathers/partners. Feelings of sadness, inadequacy, difficulty bonding with the baby, and anxiety.</p>
                        <p className="text-white/70 text-sm"><strong className="text-white/90">Note:</strong> As a MHFA, you may encounter colleagues whose partners are affected</p>
                      </div>
                    </div>
                  </div>

                  {/* Bipolar Depression */}
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-400/60 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-purple-300" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-semibold mb-1">Bipolar Depression</h4>
                        <p className="text-white/70 text-sm mb-2"><strong className="text-white/90">Duration:</strong> Depressive episodes alternate with periods of mania or hypomania</p>
                        <p className="text-white/70 text-sm mb-2"><strong className="text-white/90">Key features:</strong> The depressive episodes in bipolar disorder are identical to MDD. The crucial difference is the presence of manic/hypomanic episodes (elevated mood, reduced need for sleep, grandiosity, risky behaviour). Treatment differs significantly from unipolar depression.</p>
                        <p className="text-white/70 text-sm"><strong className="text-white/90">Note:</strong> Covered in more detail in Module 4. Antidepressants alone can trigger mania.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  All types of depression are treatable. The GP should always be the first point of contact for assessment and diagnosis.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Symptoms of Depression */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">03</span>
              Symptoms of Depression
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Depression affects the whole person &mdash; not just their mood. Symptoms are typically grouped into four
                categories. As a Mental Health First Aider, understanding all four categories helps you recognise depression
                even when someone is not obviously &ldquo;sad&rdquo;. Many people with depression present primarily with
                physical or behavioural symptoms, particularly men in workplace settings.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">Four Categories of Depressive Symptoms</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Emotional */}
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="h-5 w-5 text-purple-400" />
                      <h4 className="text-purple-300 font-semibold">Emotional Symptoms</h4>
                    </div>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Persistent sadness or &ldquo;empty&rdquo; feeling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Feelings of hopelessness about the future</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Excessive guilt, often disproportionate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Feelings of worthlessness or low self-esteem</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Irritability, frustration, or tearfulness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Loss of interest or pleasure (anhedonia)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Physical */}
                  <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="h-5 w-5 text-violet-400" />
                      <h4 className="text-violet-300 font-semibold">Physical Symptoms</h4>
                    </div>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Persistent fatigue, even after rest</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Sleep changes (insomnia or oversleeping)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Appetite changes (loss of appetite or overeating)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Psychomotor retardation (slowed movement/speech) or agitation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Unexplained aches and pains (headaches, backache, stomach problems)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Reduced libido</span>
                      </li>
                    </ul>
                  </div>

                  {/* Cognitive */}
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="h-5 w-5 text-purple-400" />
                      <h4 className="text-purple-300 font-semibold">Cognitive Symptoms</h4>
                    </div>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Poor concentration and difficulty focusing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Indecisiveness &mdash; even about small things</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Persistent negative thinking patterns</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Memory problems and forgetfulness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Rumination (going over the same thoughts repeatedly)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Thoughts of death or suicide</span>
                      </li>
                    </ul>
                  </div>

                  {/* Behavioural */}
                  <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-violet-400" />
                      <h4 className="text-violet-300 font-semibold">Behavioural Symptoms</h4>
                    </div>
                    <ul className="text-white/80 text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Social withdrawal and isolation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Reduced activity &mdash; stopping hobbies and interests</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Neglecting responsibilities (work, home, self-care)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Increased use of alcohol or other substances</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Avoiding contact with others, cancelling plans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                        <span>Self-harm or suicidal behaviour</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Suicide Risk</h3>
                </div>
                <p className="text-white/80 text-sm">
                  Depression is the leading risk factor for suicide. If someone expresses thoughts of suicide or self-harm,
                  take it seriously. Do not be afraid to ask directly: &ldquo;Are you thinking about ending your life?&rdquo;
                  Asking does not plant the idea &mdash; it gives the person permission to talk. If there is an immediate
                  risk, stay with them and call 999. Samaritans are available 24/7 on <strong className="text-white">116 123</strong> (free from any phone).
                  Module 3 covers suicide awareness and intervention in detail.
                </p>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">Men and Depression</h3>
                <p className="text-white/80 text-sm">
                  Men often experience and express depression differently from women. Rather than reporting sadness, men
                  may present with <strong className="text-white">irritability, anger, aggression, risk-taking behaviour,
                  and increased alcohol use</strong>. Physical symptoms such as headaches, digestive problems, and chronic
                  pain may dominate. Men are less likely to seek help and more likely to use substances as a coping mechanism.
                  In the construction industry, the culture of &ldquo;getting on with it&rdquo; means many men suffer in
                  silence. Recognising these atypical presentations is crucial for Mental Health First Aiders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Risk Factors */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">04</span>
              Risk Factors for Depression
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Depression rarely has a single cause. It typically results from a combination of biological, psychological,
                and social factors. Understanding risk factors helps Mental Health First Aiders identify people who may be
                more vulnerable and recognise situations that may trigger or worsen depression.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">
                  <Brain className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Biological &amp; Genetic Factors
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Family history:</strong> Having a first-degree relative (parent, sibling) with depression
                      increases your risk by 2&ndash;3 times. Depression has a significant genetic component, though no
                      single gene is responsible.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Brain chemistry:</strong> Imbalances in neurotransmitters (serotonin, noradrenaline, dopamine)
                      play a role in depression. This is the basis for antidepressant medication.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Chronic physical health conditions:</strong> Long-term conditions such as chronic pain,
                      heart disease, diabetes, and neurological conditions significantly increase the risk of depression.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Hormonal changes:</strong> Postnatal hormonal shifts, thyroid disorders, and menopause can
                      trigger or contribute to depression.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">
                  <Heart className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Psychological Factors
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Negative thinking patterns:</strong> Habitual self-criticism, catastrophising, and black-and-white
                      thinking create a cognitive vulnerability to depression. CBT specifically targets these patterns.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Childhood trauma or abuse:</strong> Adverse childhood experiences (ACEs) such as neglect,
                      physical or sexual abuse, and parental mental illness are strong predictors of adult depression.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Personality traits:</strong> Perfectionism, low self-esteem, and excessive self-reliance
                      (difficulty asking for help) increase vulnerability.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Previous episodes:</strong> Having had one episode of depression significantly increases
                      the risk of future episodes. After two episodes, the recurrence rate exceeds 70%.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">
                  <Users className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Social &amp; Environmental Factors
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Social isolation and loneliness:</strong> Lack of meaningful social connections is one of
                      the strongest social risk factors for depression, particularly for those who work away from home.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Relationship breakdown:</strong> Divorce, separation, and family conflict are significant triggers.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Bereavement:</strong> While grief is normal, prolonged or complicated grief can develop into
                      clinical depression. Losing someone to suicide is a particularly strong risk factor.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Financial problems:</strong> Debt, poverty, and financial insecurity are consistently linked
                      to higher rates of depression.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">
                  <Shield className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Construction &amp; Electrical Trade-Specific Factors
                </h3>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">Job insecurity:</strong> Short-term contracts, agency work, and the &ldquo;feast or famine&rdquo; cycle of construction work create chronic uncertainty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">Long and unpredictable hours:</strong> Early starts, overtime pressure, and weekend work disrupt sleep, family life, and social connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">Working away from home:</strong> Staying in digs or hotels, away from family and friends, increases isolation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">Macho culture:</strong> A prevailing attitude that discourages emotional expression and help-seeking. &ldquo;Man up&rdquo; and &ldquo;get on with it&rdquo; remain common responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">Bullying and harassment:</strong> Workplace bullying is a significant but under-reported problem in construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">Physical demands and chronic pain:</strong> Musculoskeletal problems from manual work can contribute to depression through chronic pain and reduced mobility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong className="text-white">Exposure to traumatic incidents:</strong> Witnessing accidents or fatalities on site can trigger depression and PTSD</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Depression in the Workplace */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">05</span>
              Depression in the Workplace
            </h2>
            <div className="space-y-4 text-white">
              <p>
                Depression is the leading cause of disability worldwide (WHO) and one of the most common reasons for
                long-term sickness absence in the UK. In construction and electrical trades, the impact of depression
                extends beyond lost productivity &mdash; it directly affects safety. Understanding how depression manifests
                in the workplace helps Mental Health First Aiders identify colleagues who may be struggling and take
                appropriate action.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">Presenteeism vs Absenteeism</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
                    <h4 className="text-purple-300 font-semibold text-sm mb-2">Presenteeism</h4>
                    <p className="text-white/80 text-sm">
                      Attending work while depressed. The person is physically present but functioning at a fraction of
                      their capacity. They may make more errors, take longer to complete tasks, struggle with decisions,
                      and be more prone to accidents. Research suggests presenteeism from depression costs UK employers
                      <strong className="text-white"> 1.5 to 2 times more</strong> than absenteeism because it is invisible
                      and prolonged.
                    </p>
                  </div>
                  <div className="bg-violet-500/10 border border-violet-500/30 p-3 rounded-lg">
                    <h4 className="text-violet-300 font-semibold text-sm mb-2">Absenteeism</h4>
                    <p className="text-white/80 text-sm">
                      Being absent from work due to depression. In the UK, depression and anxiety account for
                      approximately <strong className="text-white">17.1 million working days lost per year</strong> (HSE,
                      2023/24). Many depressed workers do not disclose the true reason for absence, citing physical
                      illnesses instead due to stigma. This under-reporting makes the true scale of the problem difficult
                      to measure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">
                  <AlertTriangle className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Impact on Safety
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  In safety-critical environments like electrical installation and construction, depression poses a direct
                  risk to life. A depressed worker may experience:
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Impaired concentration:</strong> Missing critical safety checks, misreading wiring diagrams, or overlooking hazards</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Slowed reaction time:</strong> Delayed response to dangerous situations such as a flash or unexpected energisation</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Poor decision-making:</strong> Taking shortcuts, failing to follow safe systems of work, or forgetting to isolate circuits</div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                    <div><strong>Fatigue:</strong> Depression-related fatigue compounds the physical demands of site work, increasing the risk of slips, trips, and falls</div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">Signs a Colleague May Be Depressed</h3>
                <p className="text-white/80 text-sm mb-3">
                  As a Mental Health First Aider, you do not need to diagnose depression. Instead, look for changes in a
                  colleague&rsquo;s usual behaviour. These may include:
                </p>
                <ul className="text-white/80 text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Becoming quieter or more withdrawn than usual</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Increased irritability, anger, or short temper (particularly in men)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Arriving late, leaving early, or increased absences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Neglecting personal appearance or hygiene</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Decline in the quality or speed of their work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Eating alone, avoiding the tea break, or isolating themselves on site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Talking about feeling hopeless, worthless, or &ldquo;not seeing the point&rdquo;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>Increased alcohol consumption, smoking, or other substance use</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">The Hidden Nature of Depression in Male-Dominated Industries</h3>
                <p className="text-white/80 text-sm">
                  In industries like construction and electrical contracting, depression is often hidden behind a mask of
                  competence. Many men have been socialised to equate emotional expression with weakness. They may use
                  humour to deflect, work harder to compensate, or self-medicate with alcohol. The result is that colleagues,
                  supervisors, and even family members may have no idea someone is suffering. This is why the construction
                  sector has one of the highest suicide rates of any UK industry &mdash; by the time depression becomes
                  visible, it has often reached crisis point. Creating a workplace culture where it is safe to talk about
                  mental health is not a &ldquo;nice to have&rdquo; &mdash; it saves lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: NICE Guidelines */}
        <section className="mb-10">
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400/80 text-sm font-normal">06</span>
              NICE Guidelines &amp; Treatment
            </h2>
            <div className="space-y-4 text-white">
              <p>
                The National Institute for Health and Care Excellence (NICE) publishes the clinical guidelines for the
                treatment of depression in the UK. The current guidelines (CG90/CG91, updated 2022) recommend a
                <strong> stepped care model</strong> &mdash; a framework that matches the intensity of treatment to the
                severity of depression. This ensures that people receive the least intrusive, most effective treatment first,
                with more intensive options available if needed.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">
                  <BookOpen className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  The GP as First Point of Contact
                </h3>
                <p className="text-white/80 text-sm">
                  The GP is the gateway to NHS treatment for depression. They will carry out an initial assessment,
                  often using validated screening tools such as the <strong className="text-white">PHQ-9</strong> (Patient
                  Health Questionnaire) which asks nine questions about depressive symptoms over the past two weeks. The
                  GP can diagnose depression, rule out physical causes (such as thyroid disorders or anaemia), and refer
                  to appropriate treatment. As a Mental Health First Aider, your role is to encourage people to see their
                  GP &mdash; not to diagnose or treat.
                </p>
              </div>

              {/* Stepped Care Model */}
              <div className="bg-white/5 border border-purple-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">NICE Stepped Care Model for Depression</h3>
                <div className="space-y-3">
                  {/* Step 4 */}
                  <div className="bg-purple-500/20 border border-purple-500/40 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/30 border-2 border-purple-400/60 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">4</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Severe, Complex, or Treatment-Resistant Depression</h4>
                        <p className="text-white/80 text-sm">
                          Specialist mental health services, crisis teams, inpatient care, electroconvulsive therapy (ECT),
                          combination medication strategies, intensive psychological therapy. For people who have not
                          responded to previous steps or who are at significant risk of harm.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-purple-500/15 border border-purple-500/35 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/25 border-2 border-purple-400/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Moderate to Severe Depression</h4>
                        <p className="text-white/80 text-sm">
                          High-intensity psychological interventions: <strong className="text-white">CBT</strong> (Cognitive
                          Behavioural Therapy), <strong className="text-white">IPT</strong> (Interpersonal Therapy),
                          behavioural activation, or couples therapy. <strong className="text-white">Antidepressant
                          medication</strong> (SSRIs as first line) offered alongside or as an alternative. Combination
                          therapy (medication + talking therapy) is often most effective at this stage.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-400/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-300 font-bold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-purple-300 font-medium mb-1">Persistent Sub-threshold or Mild to Moderate Depression</h4>
                        <p className="text-white/80 text-sm">
                          Low-intensity psychological interventions: guided self-help based on CBT principles, computerised
                          CBT (e.g. Beating the Blues, SilverCloud), structured group physical activity, group-based peer
                          support. <strong className="text-white">NHS Talking Therapies</strong> (formerly IAPT) provides
                          these services. Antidepressants may be considered, particularly <strong className="text-white">SSRIs</strong> (e.g.
                          sertraline, fluoxetine) if the person prefers medication or psychological therapy is not available.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 1 */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-white/70 font-bold text-sm">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white/90 font-medium mb-1">Recognition, Assessment &amp; Active Monitoring</h4>
                        <p className="text-white/80 text-sm">
                          All known and suspected cases of depression. GP assessment using validated tools (PHQ-9),
                          psychoeducation (helping the person understand their condition), sleep hygiene advice, lifestyle
                          guidance (exercise, routine, reducing alcohol), and active monitoring (reviewing symptoms at
                          2-week intervals). For sub-threshold symptoms, watchful waiting may be appropriate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-white/50 text-xs text-center mt-4 italic">
                  The model is &ldquo;stepped&rdquo; &mdash; people move up if they do not respond to treatment at a lower step, and down as they recover.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">Medication: SSRIs and SNRIs</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>SSRIs (Selective Serotonin Reuptake Inhibitors)</strong> are the first-line medication for
                      depression. Common examples include sertraline, fluoxetine, citalopram, and escitalopram. They work
                      by increasing serotonin levels in the brain.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>SNRIs (Serotonin and Noradrenaline Reuptake Inhibitors)</strong> such as venlafaxine and
                      duloxetine may be offered if SSRIs are not effective. They target both serotonin and noradrenaline.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Timeline:</strong> Antidepressants typically take <strong>2&ndash;4 weeks</strong> to show
                      benefit. Side effects (nausea, headache, sleep disturbance) often settle within 1&ndash;2 weeks.
                      Treatment should continue for at least <strong>6 months after remission</strong> to reduce relapse risk.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Never stop suddenly:</strong> Antidepressants should be tapered gradually under GP supervision
                      to avoid discontinuation symptoms (dizziness, nausea, anxiety, flu-like sensations).
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-400 font-medium mb-3">Talking Therapies</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>CBT (Cognitive Behavioural Therapy):</strong> The most extensively evidenced talking therapy
                      for depression. Focuses on identifying and changing negative thought patterns and behaviours.
                      Typically 12&ndash;20 sessions. Available through NHS Talking Therapies (self-referral in most areas).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Counselling:</strong> Person-centred approach that provides a safe space to explore feelings
                      and experiences. Often preferred by people who find CBT too structured. Usually 6&ndash;12 sessions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>IPT (Interpersonal Therapy):</strong> Focuses on improving relationships and communication
                      patterns that may be contributing to depression. Particularly effective for depression triggered by
                      relationship difficulties, role transitions, or bereavement. Usually 12&ndash;16 sessions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Behavioural Activation:</strong> Focuses on gradually increasing engagement in meaningful
                      activities to break the cycle of withdrawal and low mood. Can be particularly accessible and
                      practical for people who struggle with the cognitive focus of CBT.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">Recovery Is Possible</h3>
                <p className="text-white/80 text-sm">
                  With the right treatment, <strong className="text-white">the majority of people recover from depression</strong>.
                  Recovery rates with appropriate treatment are high: approximately 50% of people recover from a first episode
                  within 6 months, and the combination of medication and psychological therapy is the most effective approach
                  for moderate to severe depression. Recovery is not always linear &mdash; there may be setbacks &mdash; but
                  with persistence and the right support, most people return to full functioning. As a Mental Health First
                  Aider, one of the most important things you can communicate to someone experiencing depression is that
                  <strong className="text-white"> it does get better</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-purple-400/80 text-sm font-normal">&nbsp;</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz
            title="Section 1 Knowledge Check"
            questions={quizQuestions}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../mental-health-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../mental-health-module-2-section-2">
              Next: Section 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
