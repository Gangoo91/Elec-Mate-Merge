import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Brain, Heart, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-continuum-movement",
    question: "According to the mental health continuum model, which of the following statements is MOST accurate?",
    options: [
      "Once you develop a mental health problem, you stay at that point on the continuum permanently",
      "Everyone sits at a fixed point on the continuum determined by their genetics",
      "People move back and forth along the continuum throughout their lives depending on circumstances, support, and coping strategies",
      "The continuum only applies to people who have been diagnosed with a mental illness"
    ],
    correctIndex: 2,
    explanation: "The mental health continuum is dynamic, not fixed. Everyone moves along it throughout their life. Factors like stress, support, sleep, physical health, relationships, and life events all influence where you sit at any given time. This is one of the most important concepts in mental health awareness — your position on the continuum can change, and there are things you can do to move towards the thriving end."
  },
  {
    id: "mh-vs-mi-distinction",
    question: "A colleague has been diagnosed with depression but is managing well with treatment and support. According to the dual continuum model, where would they sit?",
    options: [
      "They must have poor mental health because they have a diagnosis",
      "They could have good mental health despite having a mental illness diagnosis — the two are separate dimensions",
      "They cannot have good mental health until the diagnosis is removed",
      "The dual continuum model does not apply to people with diagnosed conditions"
    ],
    correctIndex: 1,
    explanation: "The dual continuum model (developed by Corey Keyes) shows that mental health and mental illness are two separate dimensions. You can have a diagnosed mental illness and still experience good mental health — feeling positive, functioning well, and contributing to your community. Equally, you can have no diagnosis but still experience poor mental health. This is why the distinction matters: treatment for illness AND promotion of wellbeing are both important."
  },
  {
    id: "mh-biopsychosocial",
    question: "The biopsychosocial model explains mental health as the interaction of three types of factors. Which combination is correct?",
    options: [
      "Biological, pharmaceutical, and social factors",
      "Physical, psychological, and financial factors",
      "Biological, psychological, and social factors",
      "Genetic, behavioural, and environmental factors"
    ],
    correctIndex: 2,
    explanation: "The biopsychosocial model, developed by George Engel in 1977, explains that mental health is influenced by the interaction of biological factors (genetics, brain chemistry, physical health), psychological factors (thoughts, emotions, coping skills, trauma history), and social factors (relationships, work environment, finances, housing, community). No single factor causes mental health problems — it is always the interaction between all three that matters."
  }
];

const faqs = [
  {
    question: "Is mental health the same as mental illness?",
    answer: "No — and this is one of the most important distinctions to understand. Mental health refers to our overall psychological wellbeing: how we think, feel, and cope with life. Everyone has mental health, just as everyone has physical health. Mental illness refers to diagnosable conditions that significantly affect thinking, mood, or behaviour (such as depression, anxiety disorders, or schizophrenia). You can have poor mental health without having a mental illness — for example, going through a stressful period at work that affects your sleep, mood, and concentration. And you can have a diagnosed mental illness while still maintaining good overall mental health through treatment, support, and healthy coping strategies."
  },
  {
    question: "Can mental health problems affect anyone, or are some people immune?",
    answer: "Mental health problems can affect absolutely anyone, regardless of age, gender, ethnicity, income, education, or occupation. There is no immunity. Research shows that 1 in 4 people in the UK will experience a mental health problem in any given year, and roughly 1 in 6 people experience a common mental health problem (such as anxiety or depression) in any given week. Factors like genetics, life experiences, and social circumstances can make some people more vulnerable, but no one is immune. Construction workers face additional risk factors including job insecurity, long hours, physical demands, and a culture that can discourage help-seeking."
  },
  {
    question: "If I am feeling stressed or low, does that mean I have a mental health problem?",
    answer: "Not necessarily. Feeling stressed, low, anxious, or overwhelmed is a normal part of the human experience — these are natural responses to difficult circumstances. The question is one of degree, duration, and impact. If these feelings are temporary, manageable, and do not significantly affect your ability to function day-to-day, they are likely normal emotional responses. However, if they persist for weeks, feel overwhelming, start affecting your work, relationships, sleep, or daily functioning, or if you feel unable to cope, it is worth seeking support. You do not need to wait until you are in crisis — early support can prevent problems from escalating."
  },
  {
    question: "What is the most important thing I can take away from this section?",
    answer: "The single most important takeaway is that mental health is not a fixed state — it is a continuum that everyone moves along throughout their lives. Just as your physical health fluctuates depending on how you look after yourself and what life throws at you, your mental health changes too. This means that struggling is not a permanent condition, recovery is always possible, and there are practical things you can do every day to protect and improve your mental health. It also means that anyone — including you, your colleagues, your family — can find themselves struggling at some point. Understanding this removes the shame and makes it easier to ask for help when you need it."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The World Health Organisation defines mental health as:",
    options: [
      "The absence of any mental illness or psychological disorder",
      "A state of wellbeing in which an individual realises their own abilities, can cope with normal stresses, can work productively, and can contribute to their community",
      "Being happy and positive at all times regardless of circumstances",
      "Having no stress, anxiety, or negative emotions in your daily life"
    ],
    correctAnswer: 1,
    explanation: "The WHO definition is deliberately broad and positive. It frames mental health not as the absence of illness, but as a positive state of wellbeing that enables people to function, cope, work, and contribute. This definition emphasises that mental health is about flourishing, not just surviving — and it applies to everyone, not just those with diagnosed conditions."
  },
  {
    id: 2,
    question: "On the mental health continuum, which of the following represents the correct order from best to worst?",
    options: [
      "Crisis → Unwell → Struggling → Thriving",
      "Thriving → Struggling → Unwell → Crisis",
      "Unwell → Crisis → Thriving → Struggling",
      "Struggling → Thriving → Crisis → Unwell"
    ],
    correctAnswer: 1,
    explanation: "The mental health continuum runs from Thriving (optimal mental health — feeling good, functioning well, resilient) through Struggling (finding things difficult, some symptoms, coping but not easily) to Unwell (significant symptoms, functioning impaired, needing support) to Crisis (severe symptoms, unable to function, immediate help needed). Everyone moves along this continuum throughout their life."
  },
  {
    id: 3,
    question: "According to the dual continuum model developed by Corey Keyes, which statement is TRUE?",
    options: [
      "If you have a mental illness diagnosis, you cannot have good mental health",
      "Mental health and mental illness exist on two separate dimensions — you can have a diagnosis and still experience good mental health",
      "Mental health and mental illness are the same thing measured on the same scale",
      "The dual continuum model only applies to people receiving professional treatment"
    ],
    correctAnswer: 1,
    explanation: "Keyes's dual continuum model is a breakthrough in how we understand mental health. It shows that mental health (flourishing vs languishing) and mental illness (present vs absent) are two separate dimensions. This means someone with a diagnosis of depression who is receiving good treatment and support can still experience positive mental health. Equally, someone with no diagnosis can be languishing and experiencing poor mental health."
  },
  {
    id: 4,
    question: "Approximately how many people in the UK will experience a mental health problem in any given year?",
    options: [
      "1 in 10",
      "1 in 20",
      "1 in 4",
      "1 in 50"
    ],
    correctAnswer: 2,
    explanation: "According to Mind, approximately 1 in 4 people in the UK will experience a mental health problem in any given year. This statistic — based on extensive research including the Adult Psychiatric Morbidity Survey — means that in a team of 12 construction workers, statistically 3 of them could be experiencing a mental health problem at any given time. On a large construction site with hundreds of workers, the numbers are significant."
  },
  {
    id: 5,
    question: "The biopsychosocial model of mental health includes three categories of factors. Which of the following is an example of a SOCIAL factor?",
    options: [
      "Having a family history of depression (genetic predisposition)",
      "Developing negative thinking patterns after repeated setbacks",
      "Working on a construction site with poor job security and a toxic culture",
      "An imbalance in serotonin levels in the brain"
    ],
    correctAnswer: 2,
    explanation: "Working in an environment with poor job security and toxic culture is a social factor — it relates to your external environment, relationships, and social circumstances. A family history of depression is a biological factor (genetics). Negative thinking patterns are a psychological factor. Serotonin imbalance is a biological factor (brain chemistry). The biopsychosocial model shows that all three types of factors interact to influence mental health."
  },
  {
    id: 6,
    question: "Which of the following is a MYTH about mental health?",
    options: [
      "Mental health problems are common and can affect anyone",
      "People with mental health problems can recover and lead fulfilling lives",
      "Mental health problems are a sign of personal weakness or character flaw",
      "Early intervention improves outcomes for mental health problems"
    ],
    correctAnswer: 2,
    explanation: "The idea that mental health problems are a sign of weakness is one of the most damaging and persistent myths. Mental health problems are not caused by weakness, lack of willpower, or character flaws — they result from complex interactions between biological, psychological, and social factors. Believing this myth prevents people from seeking help and perpetuates stigma. In reality, acknowledging you are struggling and asking for help requires considerable strength and courage."
  },
  {
    id: 7,
    question: "According to the HSE, approximately how many working days are lost each year in the UK due to work-related stress, depression, and anxiety?",
    options: [
      "Around 2 million days",
      "Around 7 million days",
      "Around 17 million days",
      "Around 50 million days"
    ],
    correctAnswer: 2,
    explanation: "The Health and Safety Executive (HSE) reports that approximately 17 million working days are lost each year in the UK due to work-related stress, depression, and anxiety. This makes mental health the single largest cause of work-related illness in the country. The economic cost is staggering — estimated at over £118 billion per year when you include lost productivity, NHS costs, and benefits payments. For the construction industry specifically, the impact on productivity, safety, and workforce retention is enormous."
  },
  {
    id: 8,
    question: "A colleague tells you: 'I don't believe in mental health problems — people just need to toughen up.' Based on what you have learned, what is the BEST response?",
    options: [
      "Agree with them to avoid conflict — it is not your place to challenge their views",
      "Tell them they are wrong and uninformed about mental health",
      "Acknowledge their perspective but gently explain that mental health problems are medical conditions caused by biological, psychological, and social factors, not a lack of toughness",
      "Report them to management for holding stigmatising views"
    ],
    correctAnswer: 2,
    explanation: "The best approach is to acknowledge their perspective (people's views are often shaped by their upbringing and experiences) while gently providing accurate information. Confrontation and reporting are unlikely to change attitudes. Agreeing reinforces harmful myths. By calmly explaining that mental health problems have recognised causes and are not about toughness, you are helping to reduce stigma. This kind of everyday conversation is one of the most powerful ways to shift attitudes in the construction industry."
  }
];

export default function MentalHealthModule1Section1() {
  useSEO({
    title: "What Is Mental Health? | Mental Health Awareness Module 1.1",
    description: "Understand the mental health continuum, the difference between mental health and mental illness, UK prevalence statistics, and the biopsychosocial model.",
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
            <Link to="../mental-health-module-1">
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
            <BookOpen className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is Mental Health?
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the continuum, the difference between mental health and mental illness, and why it matters for every construction worker
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Mental health:</strong> A continuum everyone sits on, not a fixed state</li>
              <li><strong>Key fact:</strong> Mental health is NOT the same as mental illness</li>
              <li><strong>1 in 4:</strong> UK adults experience a mental health problem each year</li>
              <li><strong>It matters:</strong> Construction has the highest suicide rate of any UK sector</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Everyone:</strong> Has mental health &mdash; it affects every person on site</li>
              <li><strong>Safety:</strong> Poor mental health increases accident risk significantly</li>
              <li><strong>Culture:</strong> Understanding reduces stigma and saves lives</li>
              <li><strong>You:</strong> Can make a difference by understanding the basics</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Explain what mental health is using the WHO definition",
              "Describe the mental health continuum and how people move along it",
              "Distinguish between mental health and mental illness using the dual continuum model",
              "Cite key UK statistics on mental health prevalence and impact",
              "Explain the biopsychosocial model and its three factor categories",
              "Identify and challenge at least five common myths about mental health"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Mental Health Continuum */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Mental Health Continuum
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Before we can talk about mental health in construction, we need to establish a shared
                understanding of what mental health actually <em>is</em>. This matters because the way most
                people think about mental health is incomplete &mdash; and that incomplete understanding is
                one of the reasons so many people in our industry suffer in silence.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">World Health Organisation Definition</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>&ldquo;Mental health is a state of wellbeing in which an individual realises their own
                  abilities, can cope with the normal stresses of life, can work productively and fruitfully,
                  and is able to make a contribution to their community.&rdquo;</strong>
                </p>
                <p className="text-sm text-white mt-2">
                  Notice what this definition does NOT say. It does not say &ldquo;the absence of mental
                  illness.&rdquo; It defines mental health as a <strong>positive state</strong> &mdash;
                  something you actively have, not something defined by what you lack.
                </p>
              </div>

              <p>
                This is a crucial starting point. <strong>Mental health is not simply the absence of
                illness.</strong> Just as physical health is more than just &ldquo;not being sick&rdquo;
                &mdash; it includes fitness, energy, strength, flexibility, and resilience &mdash; mental
                health encompasses your emotional wellbeing, your ability to cope with challenges, your
                capacity to form and maintain relationships, your sense of purpose, and your ability to
                adapt to change.
              </p>

              <p>
                The <strong>mental health continuum</strong> is a model that helps us understand this.
                Rather than thinking of mental health as a binary state (you either have good mental health
                or you do not), the continuum model presents mental health as a <strong>spectrum that
                everyone sits on</strong>, and everyone moves along, throughout their lives.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Four Zones of the Continuum</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-green-400 font-medium mb-1">Thriving</p>
                    <p className="text-white">Feeling good, functioning well, resilient to setbacks. Good
                    sleep, positive relationships, sense of purpose. Able to cope with normal stresses and
                    enjoy life. This does not mean being happy all the time &mdash; it means having the
                    resources to handle what life throws at you.</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-amber-400 font-medium mb-1">Struggling</p>
                    <p className="text-white">Finding things more difficult than usual. Sleep may be
                    disrupted, concentration affected, mood lower. Still functioning but it takes more
                    effort. May be irritable, withdrawn, or less productive. This is where early
                    intervention makes the biggest difference.</p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-lg">
                    <p className="text-orange-400 font-medium mb-1">Unwell</p>
                    <p className="text-white">Significant symptoms affecting daily life. May meet criteria
                    for a diagnosable condition. Functioning is impaired &mdash; work performance drops,
                    relationships suffer, self-care declines. Professional support is needed at this
                    stage. Recovery is absolutely possible with the right help.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-medium mb-1">Crisis</p>
                    <p className="text-white">Severe symptoms, unable to function normally. May include
                    suicidal thoughts, self-harm, psychosis, or complete inability to cope. Immediate
                    professional help is essential. This is a medical emergency, just as a heart attack
                    or severe injury would be. Call 999 or Samaritans on 116 123.</p>
                  </div>
                </div>
              </div>

              <p>
                The most important thing about the continuum is that it is <strong>dynamic</strong>. You do
                not sit at one point permanently. Life events, work pressures, relationships, physical health,
                sleep, support systems, and coping strategies all influence where you sit at any given time.
                Someone who is thriving today could be struggling next month if they experience a significant
                stressor &mdash; a relationship breakdown, a bereavement, a job loss, a financial crisis. And
                someone who is unwell today can, with the right support, move back towards thriving.
              </p>

              <p>
                On a construction site, this means that at any given time, your colleagues are sitting at
                different points on the continuum. Some are thriving. Some are struggling but hiding it. Some
                may be unwell. And tragically, some may be in crisis without anyone knowing. Understanding
                this continuum is the first step towards being able to recognise when someone is moving in
                the wrong direction &mdash; and knowing what to do about it.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaway</p>
                </div>
                <p className="text-sm text-white">
                  Everyone has mental health. Everyone moves along the continuum. Where you sit right now is
                  not where you will always be. This understanding removes the &ldquo;us and them&rdquo;
                  thinking that creates stigma &mdash; mental health is not something that only affects
                  &ldquo;other people.&rdquo; It affects <strong>all of us</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Mental Health vs Mental Illness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Mental Health vs Mental Illness
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common and most harmful misunderstandings about mental health is confusing it
                with mental illness. These are <strong>not the same thing</strong>, and understanding the
                distinction is essential for anyone working in construction &mdash; an industry where this
                confusion directly contributes to people not seeking help.
              </p>

              <p>
                <strong>Mental health</strong> is something everyone has. It refers to your overall
                psychological and emotional wellbeing &mdash; your ability to cope, to function, to enjoy
                life, and to navigate challenges. It fluctuates over time depending on circumstances and
                support. <strong>Mental illness</strong> (also called mental disorder or mental health
                condition) refers to diagnosable conditions that significantly affect a person&rsquo;s
                thinking, feeling, mood, or behaviour. Examples include depression, anxiety disorders,
                bipolar disorder, schizophrenia, and post-traumatic stress disorder.
              </p>

              <p>
                The key insight is this: <strong>you can have poor mental health without having a mental
                illness, and you can have a mental illness while still maintaining good mental health.</strong>
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Understanding the Distinction</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Poor Mental Health, No Diagnosis</p>
                    <p className="text-white">A site electrician going through a messy divorce, sleeping
                    badly, unable to concentrate, snapping at colleagues, dreading each day. He does not
                    have a diagnosable mental illness &mdash; but his mental health is poor. He needs support,
                    understanding, and possibly professional help before things get worse.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Good Mental Health, With a Diagnosis</p>
                    <p className="text-white">A project manager who was diagnosed with depression three years
                    ago. She is on medication, sees a counsellor monthly, exercises regularly, and has strong
                    support from family and friends. She is functioning well, enjoying her work, and feels
                    positive about the future. She has a diagnosis but her mental health is good.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Dual Continuum Model (Corey Keyes)</p>
                </div>
                <p className="text-sm text-white mb-3">
                  American sociologist Corey Keyes developed the <strong>dual continuum model</strong> which
                  represents this distinction visually. Instead of a single line from &ldquo;well&rdquo; to
                  &ldquo;ill,&rdquo; the model uses two separate axes:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Vertical axis:</strong> Mental health (from languishing at the bottom to flourishing at the top)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Horizontal axis:</strong> Mental illness (from no symptoms on the left to severe symptoms on the right)</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  This creates four possible quadrants: flourishing with no illness (optimal), flourishing
                  with illness (managing well despite a diagnosis), languishing with no illness (struggling
                  but no diagnosis), and languishing with illness (most in need of support). The model shows
                  that treatment for illness and promotion of wellbeing are <strong>both</strong> important
                  and independent goals.
                </p>
              </div>

              <p>
                Why does this distinction matter on a construction site? Because the traditional view &mdash;
                that mental health is the same as mental illness &mdash; means that many workers who are
                struggling but do not have a diagnosis believe that their problems &ldquo;don&rsquo;t
                count&rdquo; or &ldquo;aren&rsquo;t serious enough&rdquo; to seek help. They think mental
                health support is only for people with &ldquo;real&rdquo; problems. This misunderstanding
                keeps thousands of construction workers suffering in silence when early support could make
                all the difference.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Common Misconceptions to Challenge</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;You&rsquo;re either mentally well or mentally ill.&rdquo;</strong> &mdash; False. Mental health exists on a spectrum, and everyone moves along it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;If you can&rsquo;t diagnose it, it&rsquo;s not real.&rdquo;</strong> &mdash; False. Poor mental health is real and impactful whether or not it meets diagnostic criteria.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;Once you have a mental illness, you can never be well again.&rdquo;</strong> &mdash; False. Many people recover fully; many others manage their condition and live fulfilling lives.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>&ldquo;Mental health only matters for people with a diagnosis.&rdquo;</strong> &mdash; False. Everyone has mental health, and everyone benefits from protecting it.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Mental Health in Numbers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Mental Health in Numbers
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Sometimes numbers speak louder than words. The scale of mental health problems in the UK
                &mdash; and particularly in the construction industry &mdash; is staggering. These are not
                abstract statistics. Behind every number is a real person: a colleague, a friend, a family
                member, possibly you.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">UK-Wide Mental Health Statistics</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-2xl mb-1">1 in 4</p>
                    <p className="text-white">People in the UK will experience a mental health problem in
                    any given year (Mind). That is approximately 16 million people.</p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-2xl mb-1">1 in 6</p>
                    <p className="text-white">People experience a common mental health problem such as
                    anxiety or depression in any given week (McManus et al, Adult Psychiatric Morbidity
                    Survey).</p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-2xl mb-1">~17 million</p>
                    <p className="text-white">Working days lost each year in the UK due to work-related
                    stress, depression, and anxiety (HSE). Mental health is the single largest cause of
                    work-related illness.</p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-rose-400 font-bold text-2xl mb-1">&pound;118 billion</p>
                    <p className="text-white">Estimated annual cost of mental health problems to the UK
                    economy, including lost productivity, NHS treatment costs, and benefits payments
                    (Centre for Mental Health).</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Construction-Specific Data</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-bold text-2xl mb-1">3.7x</p>
                    <p className="text-white">Male construction workers are 3.7 times more likely to die
                    by suicide than the national male average (ONS). Construction has the highest number of
                    suicides of any occupation in the UK.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-bold text-2xl mb-1">2 per day</p>
                    <p className="text-white">On average, two construction workers in the UK take their own
                    life every working day. That is roughly 400-500 deaths per year &mdash; far more than
                    die from on-site accidents.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-bold text-2xl mb-1">91%</p>
                    <p className="text-white">Of construction workers have felt overwhelmed by stress at
                    some point in their career (Mates in Mind / CIOB survey). This is significantly higher
                    than the general working population.</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-red-400 font-bold text-2xl mb-1">26%</p>
                    <p className="text-white">Of construction workers have considered taking their own life
                    (CIOB survey). Over a quarter of the workforce has had suicidal thoughts at some point.
                    This is a crisis that demands action.</p>
                  </div>
                </div>
              </div>

              <p>
                These numbers are not presented to shock or frighten you. They are presented because
                understanding the scale of the problem is essential for understanding why mental health
                awareness matters in construction. This is not a niche issue affecting a small number of
                people &mdash; it is the single biggest health crisis facing the UK construction industry.
                More construction workers die from suicide than from falls, electrocution, and all other
                site accidents combined.
              </p>

              <p>
                Think about your own site. If you work with 20 people, statistically 5 of them will
                experience a mental health problem this year. At least 4 or 5 will have felt overwhelmed
                by stress. And at least one will have had thoughts of suicide at some point in their life.
                These are not strangers &mdash; they are the people you have tea with, work alongside, and
                share a site with every day.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Economic Argument</p>
                <p className="text-sm text-white">
                  For those who need a business case: Deloitte research shows that for every &pound;1 invested
                  in mental health support in the workplace, employers get an average return of &pound;5 through
                  reduced absenteeism, lower staff turnover, and increased productivity. Mental health is not
                  just the right thing to support &mdash; it makes financial sense for every construction company.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Biopsychosocial Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Biopsychosocial Model
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                So what causes mental health problems? This is one of the most common questions people ask,
                and the answer is both simple and complex: <strong>there is never a single cause.</strong>
                Mental health is influenced by the interaction of multiple factors, and the best framework
                for understanding this is the <strong>biopsychosocial model</strong>.
              </p>

              <p>
                Developed by psychiatrist George Engel in 1977, the biopsychosocial model replaced the older
                &ldquo;biomedical model&rdquo; which saw mental illness as purely a brain disease. Engel
                argued that to understand mental health, you must consider three categories of factors that
                constantly interact with each other: biological, psychological, and social.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Three Factor Categories</p>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-5 w-5 text-blue-400" />
                      <p className="text-blue-400 font-medium">Biological Factors</p>
                    </div>
                    <p className="text-white mb-2">
                      These are the physical and genetic factors that influence your mental health:
                    </p>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span><strong>Genetics:</strong> Mental health conditions can run in families. Having a parent or sibling with depression, for example, increases your risk &mdash; though it does not make it inevitable.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span><strong>Brain chemistry:</strong> Neurotransmitters like serotonin, dopamine, and noradrenaline play a role in mood regulation. Imbalances can contribute to conditions like depression and anxiety.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span><strong>Physical health:</strong> Chronic pain, long-term physical conditions, hormonal changes, head injuries, and substance use all affect mental health. In construction, chronic pain from physical labour is a significant factor.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span><strong>Sleep:</strong> Disrupted sleep is both a symptom and a cause of poor mental health. Early starts, shift work, and noisy digs can all affect sleep quality for construction workers.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-purple-400" />
                      <p className="text-purple-400 font-medium">Psychological Factors</p>
                    </div>
                    <p className="text-white mb-2">
                      These relate to your thoughts, emotions, personality, and psychological history:
                    </p>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span><strong>Coping skills:</strong> How you handle stress, setbacks, and difficult emotions. Some people have developed effective coping strategies; others have not. This is learnable.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span><strong>Resilience:</strong> Your ability to bounce back from adversity. Resilience is not a fixed trait &mdash; it can be built and strengthened over time.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span><strong>Trauma history:</strong> Past traumatic experiences &mdash; including childhood adversity, accidents, violence, or loss &mdash; can have lasting effects on mental health.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span><strong>Thinking patterns:</strong> Negative thinking styles (catastrophising, black-and-white thinking, personalisation) can make you more vulnerable to anxiety and depression.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span><strong>Self-esteem:</strong> How you see yourself and your worth. Low self-esteem is both a risk factor for and a consequence of poor mental health.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-5 w-5 text-green-400" />
                      <p className="text-green-400 font-medium">Social Factors</p>
                    </div>
                    <p className="text-white mb-2">
                      These are the external circumstances and relationships that influence your mental health:
                    </p>
                    <ul className="text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Relationships:</strong> The quality of your relationships &mdash; with partners, family, friends, and colleagues &mdash; is one of the strongest predictors of mental health.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Work environment:</strong> Job security, workload, autonomy, support from managers, workplace culture, and relationships with colleagues all significantly impact mental health.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Finances:</strong> Financial stress is a major contributor to poor mental health. In construction, the feast-or-famine nature of work, CIS tax, and self-employment pressures add to this.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Housing and living conditions:</strong> Poor housing, working away from home in temporary accommodation, and unstable living situations all affect mental health.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span><strong>Community and belonging:</strong> Having a sense of belonging, purpose, and connection to others is protective. Isolation and loneliness are risk factors.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The critical insight of the biopsychosocial model is that these three categories <strong>do
                not work independently</strong> &mdash; they interact constantly. A construction worker with
                a genetic predisposition to depression (biological) who has poor coping skills (psychological)
                and is working on a site with a toxic culture and job insecurity (social) is at much higher
                risk than someone with only one of these factors. Equally, strong social support can protect
                someone with biological vulnerability. Good coping skills can buffer the impact of difficult
                social circumstances.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Why This Matters for Construction</p>
                <p className="text-sm text-white">
                  The biopsychosocial model shows us that mental health is not just an individual problem &mdash;
                  it is also a workplace and social issue. While we cannot change someone&rsquo;s genetics or past
                  trauma, we <strong>can</strong> influence the social factors: creating supportive workplace
                  cultures, reducing unnecessary stressors, providing access to support, and building environments
                  where people feel safe to ask for help. This is why workplace mental health initiatives are so
                  important in construction.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Myths and Facts About Mental Health */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Myths and Facts About Mental Health
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mental health is surrounded by myths, misconceptions, and outdated beliefs. These myths are
                not harmless &mdash; they are one of the primary reasons people do not seek help when they
                need it. In the construction industry, where macho culture can reinforce these myths, they
                are particularly dangerous. Let us confront the most common ones head-on.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-1">MYTH: &ldquo;Mental health problems are a sign of weakness.&rdquo;</p>
                  <p className="text-sm text-white">
                    <strong className="text-green-400">FACT:</strong> Mental health problems are caused by
                    complex interactions between biological, psychological, and social factors &mdash; not by
                    weakness, lack of willpower, or character flaws. Some of the toughest, most resilient people
                    in the world experience mental health problems. Many elite athletes, military veterans, and
                    emergency service workers &mdash; people whose toughness is beyond question &mdash; have
                    spoken openly about their mental health struggles. Acknowledging you are struggling and
                    seeking help is an act of <strong>strength</strong>, not weakness.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-1">MYTH: &ldquo;You can just snap out of it if you try hard enough.&rdquo;</p>
                  <p className="text-sm text-white">
                    <strong className="text-green-400">FACT:</strong> You would never tell someone with a
                    broken leg to &ldquo;just walk it off.&rdquo; Mental health conditions are no different.
                    Depression is not sadness that you can simply choose to stop feeling. Anxiety is not
                    worry that you can switch off with willpower. These are conditions involving changes in
                    brain chemistry, neural pathways, and psychological patterns that require proper support
                    and often professional treatment. Telling someone to &ldquo;snap out of it&rdquo; is not
                    only unhelpful &mdash; it can make them feel worse and less likely to seek the help they
                    actually need.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-1">MYTH: &ldquo;Mental health problems only affect certain types of people.&rdquo;</p>
                  <p className="text-sm text-white">
                    <strong className="text-green-400">FACT:</strong> Mental health problems do not
                    discriminate. They affect people of every age, gender, ethnicity, income level,
                    education, and occupation. The idea that only &ldquo;certain&rdquo; people get mental
                    health problems &mdash; and that you are not one of those people &mdash; is one of
                    the most dangerous beliefs in construction. It stops people recognising their own
                    symptoms and creates an &ldquo;us and them&rdquo; divide that fuels stigma.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-1">MYTH: &ldquo;Mental health problems are always visible.&rdquo;</p>
                  <p className="text-sm text-white">
                    <strong className="text-green-400">FACT:</strong> Many people experiencing mental
                    health problems appear completely &ldquo;normal&rdquo; on the outside. They go to work,
                    do their job, laugh with colleagues, and give no visible sign that they are struggling.
                    This is particularly true in construction, where workers often feel pressure to put on a
                    brave face. This is why the phrase &ldquo;you never know what someone is going through&rdquo;
                    is so important &mdash; and why asking &ldquo;are you OK?&rdquo; matters even when someone
                    seems fine.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-1">MYTH: &ldquo;People with mental health problems cannot work.&rdquo;</p>
                  <p className="text-sm text-white">
                    <strong className="text-green-400">FACT:</strong> The vast majority of people with
                    mental health problems can and do work. With the right support, reasonable adjustments,
                    and understanding from employers and colleagues, people with mental health conditions
                    are productive, reliable, and valuable members of the workforce. In fact, for many
                    people, work is a protective factor for mental health &mdash; it provides routine,
                    purpose, social connection, and income.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-1">MYTH: &ldquo;Mental health problems are permanent &mdash; once you have one, you have it for life.&rdquo;</p>
                  <p className="text-sm text-white">
                    <strong className="text-green-400">FACT:</strong> Many mental health problems are
                    treatable, and many people recover fully. Even for longer-term conditions, effective
                    management means people can live fulfilling, productive lives. Recovery looks different
                    for different people &mdash; for some it means being completely symptom-free, for others
                    it means managing symptoms effectively. But the key message is that mental health problems
                    are <strong>not</strong> a life sentence.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-1">MYTH: &ldquo;Mental health problems are caused by one single thing.&rdquo;</p>
                  <p className="text-sm text-white">
                    <strong className="text-green-400">FACT:</strong> As the biopsychosocial model shows,
                    mental health problems are caused by the interaction of multiple factors. There is
                    rarely a single cause. A combination of genetic vulnerability, life experiences,
                    psychological factors, and social circumstances typically contribute. This means that
                    blaming any single factor &mdash; &ldquo;it&rsquo;s because you drink too much,&rdquo;
                    &ldquo;it&rsquo;s because your marriage broke down&rdquo; &mdash; is always an
                    oversimplification.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-1">MYTH: &ldquo;Talking about mental health makes things worse.&rdquo;</p>
                  <p className="text-sm text-white">
                    <strong className="text-green-400">FACT:</strong> Research consistently shows the
                    opposite. Talking about mental health &mdash; whether with a friend, colleague, family
                    member, or professional &mdash; is one of the most effective ways to process difficult
                    emotions and begin recovery. Silence and isolation are what make things worse. You do not
                    need to be a trained counsellor to have a helpful conversation &mdash; simply listening
                    without judgement can make an enormous difference to someone who is struggling.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Remember:</strong> Every myth you challenge helps to
                  reduce stigma. Every time you correct a misconception &mdash; calmly, respectfully, and
                  with accurate information &mdash; you are helping to create a culture where people feel
                  safer to seek help. That can save lives.
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
                This section has established the foundational knowledge you need to understand mental health.
                These are the concepts that everything else in this course builds upon. Let us recap the key
                points:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Mental health is a continuum</strong> that everyone sits on and moves along throughout their lives. It ranges from thriving through struggling and unwell to crisis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Mental health is not mental illness.</strong> The dual continuum model shows these are separate dimensions &mdash; you can have a diagnosis and good mental health, or no diagnosis and poor mental health.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The numbers are stark:</strong> 1 in 4 UK adults, 17 million lost working days, &pound;118bn annual cost. In construction, male workers are 3.7x more likely to die by suicide.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>The biopsychosocial model</strong> shows that mental health is influenced by biological (genetics, brain chemistry), psychological (coping skills, trauma), and social (relationships, work, finances) factors working together.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Myths are dangerous.</strong> Beliefs like &ldquo;it&rsquo;s weakness&rdquo; or &ldquo;just snap out of it&rdquo; prevent people from seeking help and can cost lives.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Understanding is the first step.</strong> By understanding these fundamentals, you are already better equipped to support yourself and your colleagues.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will look at the most
                  common mental health conditions you are likely to encounter in the construction industry
                  &mdash; depression, anxiety, stress-related conditions, PTSD, and substance misuse. You
                  will learn what these conditions are, how they present, and how they show up on a
                  construction site.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">If You Are Struggling Right Now</p>
                <p className="text-sm text-white">
                  If anything in this section has resonated with you personally, please know that support is
                  available. You do not need to face this alone.
                </p>
                <ul className="text-sm text-white space-y-1.5 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Samaritans:</strong> 116 123 (free, 24/7, confidential)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Construction Industry Helpline:</strong> 0345 605 1956</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Mates in Mind:</strong> matesinmind.org</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Mind Infoline:</strong> 0300 123 3393</span>
                  </li>
                </ul>
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
            <Link to="../mental-health-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-1-section-2">
              Next: Common Mental Health Conditions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
