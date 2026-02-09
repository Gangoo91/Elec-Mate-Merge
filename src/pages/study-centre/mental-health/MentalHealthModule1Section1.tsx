import {
  ArrowLeft,
  Brain,
  CheckCircle,
  AlertTriangle,
  Heart,
  Users,
  MessageCircle,
  ShieldCheck,
  TrendingDown,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-spectrum-definition",
    question:
      "According to the World Health Organisation, mental health is best described as:",
    options: [
      "The absence of any mental illness or disorder",
      "A state of wellbeing in which a person can cope with normal stresses, work productively, and contribute to their community",
      "Feeling happy and positive most of the time",
      "Being free from stress and anxiety at work",
    ],
    correctIndex: 1,
    explanation:
      "The WHO defines mental health as a state of wellbeing in which every individual realises their own potential, can cope with the normal stresses of life, can work productively and fruitfully, and is able to make a contribution to their community. It is far more than the absence of illness.",
  },
  {
    id: "mh-prevalence-stat",
    question:
      "According to Mind, approximately how many adults in the UK experience a mental health problem each year?",
    options: ["1 in 10", "1 in 6", "1 in 4", "1 in 2"],
    correctIndex: 2,
    explanation:
      "Mind reports that approximately 1 in 4 adults in England will experience a mental health problem of some kind each year. This makes mental health conditions one of the most common health challenges in the UK.",
  },
  {
    id: "mh-stigma-type",
    question:
      "Which type of stigma occurs when a person with a mental health condition internalises negative beliefs about themselves?",
    options: [
      "Public stigma",
      "Structural stigma",
      "Self-stigma",
      "Institutional stigma",
    ],
    correctIndex: 2,
    explanation:
      "Self-stigma (also called internalised stigma) happens when someone with a mental health condition absorbs the negative stereotypes and prejudice from society, leading them to feel shame, low self-worth, and reluctance to seek help.",
  },
];

const faqs = [
  {
    question: "Is mental health the same as mental illness?",
    answer:
      "No. Mental health and mental illness are related but distinct concepts. Everyone has mental health, just as everyone has physical health. Mental health exists on a spectrum and fluctuates throughout life. Mental illness refers to diagnosable conditions that significantly affect how a person thinks, feels, or behaves. You can have poor mental health without having a diagnosable mental illness, and conversely, someone living with a diagnosed condition can still experience good mental health with the right support.",
  },
  {
    question:
      "Why does construction have such a high rate of mental health problems?",
    answer:
      "The construction industry faces several unique risk factors: long and unpredictable working hours, physically demanding labour, time away from family, job insecurity (especially for subcontractors), pressure to meet tight deadlines, a traditionally 'macho' culture that discourages vulnerability, exposure to traumatic incidents on site, and financial pressures from self-employment. These factors combine to create an environment where mental health problems can develop and go unaddressed. The Office for National Statistics consistently identifies construction as having one of the highest suicide rates of any UK industry.",
  },
  {
    question: "What is the Mental Health Continuum?",
    answer:
      "The Mental Health Continuum is a model that represents mental health as a spectrum rather than a binary state of 'well' or 'unwell'. It typically ranges from thriving (healthy, resilient, functioning well) through surviving (managing but under strain) and struggling (noticeable difficulty, emerging symptoms) to in crisis (unable to cope, may need urgent support). Everyone moves along this continuum throughout their life depending on circumstances, stressors, coping resources, and support available. Understanding the continuum helps us recognise early warning signs in ourselves and others.",
  },
  {
    question: "How can I help reduce stigma around mental health on site?",
    answer:
      "Start by using person-first, non-judgemental language (for example, 'a person experiencing depression' rather than 'a depressive'). Normalise conversations about mental health during toolbox talks, breaks, and team check-ins. Share your own experiences if you feel comfortable doing so — leading by example is powerful. Challenge inappropriate comments or jokes about mental health when you hear them. Signpost colleagues to support services such as the Samaritans (116 123), Mates in Mind, or the Construction Industry Helpline (0345 605 1956). As an MHFA, simply being visible and approachable can make a significant difference.",
  },
  {
    question:
      "Can you fully recover from a mental health condition?",
    answer:
      "Yes. Many people recover fully from mental health conditions, and many more learn to manage their condition effectively and live fulfilling, productive lives. Recovery is not always linear — there may be setbacks — but with the right combination of professional support, self-care, social connection, and (where appropriate) medication, people can and do recover. The myth that mental illness is permanent and untreatable is one of the most damaging misconceptions and a significant barrier to people seeking help.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following best describes the Mental Health Continuum?",
    options: [
      "A binary state: you either have mental health problems or you do not",
      "A spectrum ranging from thriving to in crisis that everyone moves along",
      "A medical diagnosis tool used only by psychiatrists",
      "A government policy document on workplace wellbeing",
    ],
    correctAnswer: 1,
    explanation:
      "The Mental Health Continuum represents mental health as a spectrum that everyone moves along throughout their life, ranging from thriving through surviving and struggling to in crisis. It is not binary.",
  },
  {
    id: 2,
    question:
      "According to the Health and Safety Executive, approximately how many workers experience work-related depression, anxiety, or stress?",
    options: ["1 in 20", "1 in 10", "1 in 6", "1 in 3"],
    correctAnswer: 2,
    explanation:
      "HSE data shows that approximately 1 in 6 workers in the UK experience work-related depression, anxiety, or stress at any given time, making it one of the most significant occupational health challenges.",
  },
  {
    id: 3,
    question: "Which UK industry has the highest suicide rate?",
    options: [
      "Healthcare",
      "Financial services",
      "Construction",
      "Agriculture",
    ],
    correctAnswer: 2,
    explanation:
      "The Office for National Statistics consistently identifies construction as having one of the highest suicide rates of any UK industry. Male construction workers are approximately three times more likely to die by suicide than the national male average.",
  },
  {
    id: 4,
    question:
      "Which of the following is a myth about mental health?",
    options: [
      "Mental health fluctuates throughout a person's life",
      "Mental health problems only affect certain types of people",
      "Early intervention improves outcomes significantly",
      "Everyone has mental health, just as everyone has physical health",
    ],
    correctAnswer: 1,
    explanation:
      "The belief that mental health problems only affect certain types of people is a harmful myth. Mental health conditions can affect anyone regardless of age, gender, ethnicity, income, or occupation. 1 in 4 adults will experience a mental health problem in any given year.",
  },
  {
    id: 5,
    question:
      "What does 'person-first language' mean in the context of mental health?",
    options: [
      "Always putting the manager's opinion first when discussing mental health",
      "Referring to the person before their condition, e.g. 'a person with depression' rather than 'a depressive'",
      "Ensuring the person with the mental health problem speaks first in meetings",
      "Prioritising mental health over physical health in risk assessments",
    ],
    correctAnswer: 1,
    explanation:
      "Person-first language means referring to the person before their condition — for example, saying 'a person experiencing anxiety' rather than 'an anxious person'. This approach recognises that people are not defined by their mental health condition and helps reduce stigma.",
  },
  {
    id: 6,
    question:
      "According to Deloitte (2022), what is the estimated annual cost of poor mental health to UK employers?",
    options: [
      "£12 billion",
      "£28 billion",
      "£56 billion",
      "£90 billion",
    ],
    correctAnswer: 2,
    explanation:
      "Deloitte's 2022 research estimated that poor mental health costs UK employers approximately £56 billion per year through absenteeism, presenteeism (working while unwell), and staff turnover. This represents a significant increase from previous estimates.",
  },
  {
    id: 7,
    question:
      "Which of the following is NOT a type of stigma associated with mental health?",
    options: [
      "Public stigma — negative attitudes from society",
      "Self-stigma — internalised shame and negative beliefs",
      "Structural stigma — institutional policies that disadvantage people",
      "Clinical stigma — stigma caused by receiving a diagnosis",
    ],
    correctAnswer: 3,
    explanation:
      "The three main types of mental health stigma are public stigma (negative attitudes held by society), self-stigma (internalised shame and negative self-beliefs), and structural/institutional stigma (policies, practices, and systems that disadvantage people with mental health conditions). 'Clinical stigma' is not a recognised category.",
  },
  {
    id: 8,
    question:
      "Which campaign, originally led by Mind and Rethink Mental Illness, encouraged people to have open conversations about mental health?",
    options: [
      "Heads Together",
      "Time to Change / Time to Talk",
      "Mind Over Matter",
      "Mental Health Matters UK",
    ],
    correctAnswer: 1,
    explanation:
      "Time to Change was England's largest programme to challenge mental health stigma and discrimination, led by the charities Mind and Rethink Mental Illness. Its annual 'Time to Talk Day' encouraged people to have open, honest conversations about mental health. Although the campaign formally ended in 2021, its legacy continues through ongoing initiatives.",
  },
];

export default function MentalHealthModule1Section1() {
  useSEO({
    title: "Mental Health Awareness & the Spectrum | MHFA Module 1.1",
    description:
      "Understanding mental health as a spectrum, the Mental Health Continuum, UK prevalence statistics, common myths, workplace stigma, and strategies for reducing stigma as a Mental Health First Aider.",
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 mb-4">
            <Brain className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mental Health Awareness &amp; the Spectrum
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding what mental health is, how it exists on a continuum,
            the scale of the challenge in the UK, and how stigma prevents people
            from getting help
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Spectrum:</strong> Mental health is a continuum, not
                binary
              </li>
              <li>
                <strong>Prevalence:</strong> 1 in 4 UK adults affected each year
              </li>
              <li>
                <strong>Construction:</strong> Highest suicide rate of any UK
                industry
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              In Practice
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Recognise:</strong> Everyone has mental health &mdash;
                check in regularly
              </li>
              <li>
                <strong>Challenge:</strong> Myths and stigma that prevent help-seeking
              </li>
              <li>
                <strong>Normalise:</strong> Open conversations about mental
                health on site
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define mental health using the WHO definition",
              "Explain the Mental Health Continuum model",
              "State key UK prevalence statistics for mental health conditions",
              "Identify and debunk common myths about mental health",
              "Describe the three types of stigma and their impact",
              "Explain how an MHFA can help reduce workplace stigma",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is Mental Health? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            What is Mental Health?
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mental health is a fundamental part of our overall health and
                wellbeing. Just as we all have physical health, we all have
                mental health &mdash; and it affects how we think, feel, and
                act. It influences how we handle stress, relate to others, and
                make decisions. Mental health is important at every stage of
                life, from childhood through to adulthood.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">WHO Definition:</strong>{" "}
                  The World Health Organisation defines mental health as{" "}
                  <em>
                    &ldquo;a state of wellbeing in which every individual
                    realises their own potential, can cope with the normal
                    stresses of life, can work productively and fruitfully, and
                    is able to make a contribution to their community.&rdquo;
                  </em>{" "}
                  This definition makes clear that mental health is far more
                  than the absence of mental illness.
                </p>
              </div>

              <p>
                A critical concept for any Mental Health First Aider to
                understand is that mental health is <strong>not binary</strong>.
                It is not a case of &ldquo;well&rdquo; or &ldquo;unwell&rdquo;.
                Instead, mental health exists on a <strong>spectrum</strong> (or
                continuum) that everyone moves along throughout their life. Your
                position on this spectrum can shift depending on what is
                happening in your life, the stresses you are facing, the support
                you have available, and your own coping resources.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Key Principles:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Everyone has mental health</strong>{" "}
                      &mdash; it is not something only some people have
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fluctuations are normal</strong>{" "}
                      &mdash; we all move along the spectrum depending on
                      circumstances
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Mental health is not the same as mental illness
                      </strong>{" "}
                      &mdash; you can have poor mental health without a
                      diagnosis
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        It affects everything
                      </strong>{" "}
                      &mdash; our thoughts, emotions, behaviour, relationships,
                      and work performance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Prevention and early intervention matter
                      </strong>{" "}
                      &mdash; recognising changes early leads to better outcomes
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                As a Mental Health First Aider, understanding this foundation is
                essential. Your role is not to diagnose or treat &mdash; it is
                to recognise the signs that someone may be moving along the
                continuum towards difficulty, and to provide initial support and
                signposting. Just as a physical first aider does not perform
                surgery, an MHFA does not provide therapy &mdash; but they can
                make a life-changing difference through early recognition and
                compassionate support.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Mental Health Continuum */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            The Mental Health Continuum
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Mental Health Continuum is a widely used model that
                represents mental health as a spectrum with four broad zones.
                Everyone sits somewhere on this continuum at any given time, and
                our position shifts in response to life events, stressors, coping
                strategies, and the support we receive. Understanding this model
                helps you recognise when someone &mdash; including yourself
                &mdash; may be moving from one zone to another.
              </p>

              {/* Mental Health Continuum Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-4 text-center">
                  The Mental Health Continuum
                </p>

                {/* Spectrum Bar */}
                <div className="relative mb-6">
                  <div className="flex rounded-full overflow-hidden h-4 sm:h-5">
                    <div className="flex-1 bg-gradient-to-r from-green-500 to-green-400" />
                    <div className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500" />
                    <div className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500" />
                    <div className="flex-1 bg-gradient-to-r from-red-500 to-red-600" />
                  </div>
                  {/* Arrow */}
                  <div className="flex justify-between mt-1 px-1">
                    <span className="text-[10px] sm:text-xs text-green-400 font-medium">
                      Thriving
                    </span>
                    <span className="text-[10px] sm:text-xs text-yellow-400 font-medium">
                      Surviving
                    </span>
                    <span className="text-[10px] sm:text-xs text-orange-400 font-medium">
                      Struggling
                    </span>
                    <span className="text-[10px] sm:text-xs text-red-400 font-medium">
                      In Crisis
                    </span>
                  </div>
                </div>

                {/* Zone Details */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-green-400">
                        Thriving
                      </p>
                    </div>
                    <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                      <li>Feeling good and functioning well</li>
                      <li>Good energy and motivation</li>
                      <li>Healthy relationships and social life</li>
                      <li>Sleeping well, eating well</li>
                      <li>Resilient when faced with challenges</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-yellow-400">
                        Surviving
                      </p>
                    </div>
                    <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                      <li>Getting by, but under strain</li>
                      <li>Increased tiredness or irritability</li>
                      <li>Reduced concentration or motivation</li>
                      <li>Minor sleep or appetite changes</li>
                      <li>Starting to withdraw socially</li>
                    </ul>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-orange-400">
                        Struggling
                      </p>
                    </div>
                    <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                      <li>Noticeable difficulty coping</li>
                      <li>Persistent low mood or anxiety</li>
                      <li>Significant changes in behaviour</li>
                      <li>Difficulty performing at work</li>
                      <li>Avoiding people and responsibilities</li>
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
                      <p className="text-sm font-medium text-red-400">
                        In Crisis
                      </p>
                    </div>
                    <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                      <li>Unable to cope with daily life</li>
                      <li>May be experiencing suicidal thoughts</li>
                      <li>Significant risk to self or others</li>
                      <li>May need urgent professional support</li>
                      <li>Complete withdrawal or erratic behaviour</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                It is important to understand that movement along this continuum
                is <strong>fluid and normal</strong>. A person who is generally
                thriving might move to surviving during a period of high workload
                or personal difficulty, and then move back to thriving once the
                situation improves. Equally, someone who is struggling can move
                back towards thriving with the right support and intervention.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  Factors That Affect Your Position on the Continuum
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium text-green-400 mb-1">
                      Protective Factors (move you towards thriving)
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                        <span>Strong social connections and support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                        <span>Physical activity and good sleep</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                        <span>Sense of purpose and belonging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                        <span>Healthy coping strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400/60 flex-shrink-0" />
                        <span>Access to professional help when needed</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-400 mb-1">
                      Risk Factors (move you towards crisis)
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                        <span>Social isolation and loneliness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                        <span>Financial stress or job insecurity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                        <span>Relationship breakdown or bereavement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                        <span>Substance misuse (alcohol, drugs)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                        <span>Workplace bullying or excessive pressure</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                As a Mental Health First Aider, your ability to recognise which
                zone someone is in &mdash; and crucially, whether they are
                moving in the wrong direction &mdash; is one of the most
                valuable skills you will develop. Early recognition and a
                simple, empathetic conversation can prevent someone from
                sliding further along the continuum towards crisis.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Prevalence and Impact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Prevalence and Impact
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mental health conditions are among the most common health
                challenges in the United Kingdom. Understanding the scale of
                the problem is essential for any Mental Health First Aider
                &mdash; it reinforces why this work matters and helps challenge
                the misconception that mental health problems are rare or only
                affect a small number of people.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  Key UK Statistics
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                        1 in 4
                      </p>
                      <p className="text-sm text-white/80">
                        Adults in England experience a mental health problem
                        each year (Mind)
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                        1 in 6
                      </p>
                      <p className="text-sm text-white/80">
                        Workers experience work-related depression, anxiety, or
                        stress (HSE)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                        70M
                      </p>
                      <p className="text-sm text-white/80">
                        Working days lost per year to mental health conditions
                        in the UK
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                        &pound;56bn
                      </p>
                      <p className="text-sm text-white/80">
                        Annual cost to UK employers from poor mental health
                        (Deloitte, 2022)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Construction Industry
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The construction industry faces a mental health crisis that
                  demands urgent attention:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      Construction has the{" "}
                      <strong className="text-red-300">
                        highest suicide rate
                      </strong>{" "}
                      of any UK industry (Office for National Statistics)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      Male construction workers are approximately{" "}
                      <strong className="text-red-300">
                        three times more likely
                      </strong>{" "}
                      to die by suicide than the national male average
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      In an average year, more construction workers die by
                      suicide than from falls from height, the industry&rsquo;s
                      leading cause of workplace fatality
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      Risk factors include long hours, time away from family,
                      job insecurity, physical demands, and a culture that
                      discourages vulnerability
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                These statistics demonstrate that mental health is not a niche
                issue &mdash; it is a workplace health priority on par with
                physical safety. For those working in construction and the
                electrical trades, the need for Mental Health First Aiders is
                particularly acute. The Deloitte (2022) research also found
                that for every &pound;1 invested in mental health support by
                employers, there is an average return of &pound;5.30 through
                reduced absence, increased productivity, and improved retention.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    The Breakdown of Employer Costs
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Presenteeism</strong>{" "}
                      (working while unwell) &mdash; accounts for the largest
                      share of costs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Absenteeism</strong>{" "}
                      (sickness absence) &mdash; 70 million working days lost
                      per year
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Staff turnover</strong>{" "}
                      &mdash; recruitment and training costs when employees
                      leave due to poor wellbeing
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Common Myths and Misconceptions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Common Myths and Misconceptions
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important roles of a Mental Health First Aider
                is to challenge myths and misconceptions that prevent people from
                understanding mental health and seeking help. These myths are
                deeply embedded in society and contribute directly to stigma.
                Let us examine and debunk the most common ones.
              </p>

              <div className="space-y-4">
                {/* Myth 1 */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-400">
                      Myth: &ldquo;Mental health problems are rare&rdquo;
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-white/80">
                      <strong className="text-green-400">Reality:</strong> 1 in
                      4 adults experience a mental health problem each year.
                      Mental health conditions are among the most common health
                      issues in the UK. You almost certainly know someone who has
                      been affected, even if they have not told you.
                    </p>
                  </div>
                </div>

                {/* Myth 2 */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-400">
                      Myth: &ldquo;They only affect certain types of
                      people&rdquo;
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-white/80">
                      <strong className="text-green-400">Reality:</strong>{" "}
                      Mental health conditions can affect anyone, regardless of
                      age, gender, ethnicity, income, education, or occupation.
                      They do not discriminate. A company director is just as
                      susceptible as an apprentice. Wealth and success do not
                      provide immunity.
                    </p>
                  </div>
                </div>

                {/* Myth 3 */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-400">
                      Myth: &ldquo;People with mental health problems are
                      dangerous&rdquo;
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-white/80">
                      <strong className="text-green-400">Reality:</strong> The
                      vast majority of people experiencing mental health problems
                      are not violent or dangerous. In fact, people with mental
                      health conditions are far more likely to be{" "}
                      <strong>victims</strong> of violence than perpetrators.
                      Research consistently shows that only a very small
                      percentage of violent incidents involve people with mental
                      illness, and these are often linked to other factors such
                      as substance misuse.
                    </p>
                  </div>
                </div>

                {/* Myth 4 */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-400">
                      Myth: &ldquo;It&rsquo;s just a phase &mdash; they&rsquo;ll
                      snap out of it&rdquo;
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-white/80">
                      <strong className="text-green-400">Reality:</strong>{" "}
                      Mental health conditions are real medical conditions, not
                      choices or character flaws. Telling someone to &ldquo;cheer
                      up&rdquo; or &ldquo;pull yourself together&rdquo; is as
                      unhelpful as telling someone with a broken leg to
                      &ldquo;walk it off&rdquo;. Many conditions require
                      professional support, therapy, or medication &mdash; and
                      early intervention significantly improves outcomes.
                    </p>
                  </div>
                </div>

                {/* Myth 5 */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium text-red-400">
                      Myth: &ldquo;You can&rsquo;t recover from mental
                      illness&rdquo;
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-white/80">
                      <strong className="text-green-400">Reality:</strong> Many
                      people recover fully from mental health conditions, and
                      many others learn to manage their condition effectively and
                      live fulfilling, productive lives. Recovery is not always
                      linear &mdash; there may be setbacks &mdash; but with the
                      right support, including professional help, self-care, and
                      social connection, people can and do recover. This myth is
                      one of the most damaging barriers to help-seeking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Why Myths Matter:
                  </strong>{" "}
                  These misconceptions do real harm. They stop people from
                  talking about their struggles, delay help-seeking, reinforce
                  stigma, and can lead to discrimination. As an MHFA, you are
                  in a unique position to challenge these myths whenever you
                  encounter them &mdash; in conversations, in toolbox talks, and
                  through your own behaviour and attitudes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Stigma in the Workplace */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Stigma in the Workplace
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Stigma is one of the biggest barriers to people seeking help for
                mental health difficulties. In the workplace, stigma can mean
                the difference between someone getting support early and someone
                suffering in silence until they reach crisis point. Understanding
                the different types of stigma and how they operate is essential
                for any Mental Health First Aider.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  Three Types of Stigma
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">
                        Public Stigma
                      </p>
                      <p className="text-sm text-white/80">
                        The negative attitudes, stereotypes, and prejudice that
                        society holds about people with mental health conditions.
                        This includes beliefs that people with mental illness are
                        weak, unreliable, or dangerous. Public stigma leads to
                        discrimination in employment, housing, relationships, and
                        access to services.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">
                        Self-Stigma
                      </p>
                      <p className="text-sm text-white/80">
                        When a person with a mental health condition internalises
                        the negative beliefs from society and applies them to
                        themselves. This leads to shame, low self-esteem, and
                        reluctance to seek help or disclose their condition. A
                        person experiencing self-stigma might think &ldquo;I
                        should be able to handle this on my own&rdquo; or
                        &ldquo;What will people think of me?&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-purple-400">
                        Structural / Institutional Stigma
                      </p>
                      <p className="text-sm text-white/80">
                        Policies, practices, and systems within organisations and
                        institutions that disadvantage people with mental health
                        conditions. Examples include lack of mental health
                        policies, inadequate absence support, managers
                        untrained in having wellbeing conversations, and
                        workplace cultures that punish vulnerability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">
                    Stigma in Construction &amp; the Trades
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The construction industry and skilled trades face particular
                  challenges with mental health stigma:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        &ldquo;Macho&rdquo; culture
                      </strong>{" "}
                      &mdash; an expectation to be tough, stoic, and
                      self-reliant. Showing vulnerability is often seen as
                      weakness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        &ldquo;Man up&rdquo; mentality
                      </strong>{" "}
                      &mdash; dismissive phrases that shut down conversations
                      about feelings and discourage help-seeking
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Predominantly male workforce
                      </strong>{" "}
                      &mdash; men are statistically less likely to seek help for
                      mental health and more likely to use unhealthy coping
                      mechanisms such as alcohol
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Transient workforce
                      </strong>{" "}
                      &mdash; frequent changes of site and team make it harder
                      to build trusting relationships where people feel safe to
                      open up
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Fear of consequences
                      </strong>{" "}
                      &mdash; worry that disclosing mental health difficulties
                      could lead to loss of work, especially for
                      self-employed tradespeople
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Consequences of Stigma
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      For the Individual
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Delays in seeking help</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Increased isolation and withdrawal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Worsening symptoms over time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Reduced self-esteem and confidence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Increased risk of crisis, self-harm, or suicide
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      For the Workplace
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Higher sickness absence rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Reduced productivity and quality of work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Increased staff turnover</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>
                          Safety risks from distracted or unwell workers
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>Toxic culture that affects everyone</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Stigma creates a vicious cycle: people do not talk about mental
                health because of stigma, and the silence reinforces the stigma.
                Breaking this cycle requires active effort &mdash; and as a
                Mental Health First Aider, you are at the forefront of that
                effort in your workplace.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Reducing Stigma */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Reducing Stigma
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Reducing stigma is not just about changing attitudes &mdash; it
                is about creating an environment where people feel safe to talk
                about their mental health, seek help early, and support one
                another. As a Mental Health First Aider, you have a direct role
                in making this happen in your workplace.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Language Matters
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The words we use shape how people feel about mental health.
                  Small changes in language can make a significant difference:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">
                      Avoid
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>&ldquo;He&rsquo;s a schizophrenic&rdquo;</li>
                      <li>&ldquo;She&rsquo;s so OCD&rdquo;</li>
                      <li>&ldquo;That&rsquo;s mental&rdquo;</li>
                      <li>&ldquo;Committed suicide&rdquo;</li>
                      <li>&ldquo;Nutter&rdquo; / &ldquo;psycho&rdquo;</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      Use Instead
                    </p>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>&ldquo;He has schizophrenia&rdquo;</li>
                      <li>&ldquo;She&rsquo;s very particular about...&rdquo;</li>
                      <li>&ldquo;That&rsquo;s surprising / unbelievable&rdquo;</li>
                      <li>&ldquo;Died by suicide&rdquo;</li>
                      <li>&ldquo;A person with a mental health condition&rdquo;</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-white/70 mt-3">
                  <strong className="text-purple-400">
                    Person-first language
                  </strong>{" "}
                  means putting the person before their condition. A person is
                  not their diagnosis &mdash; they are a person who happens to
                  have a particular condition. This small shift in language
                  humanises the individual and reduces stigma.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Normalising Conversations
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Talk about it</strong>{" "}
                      &mdash; Include mental health in regular conversations,
                      toolbox talks, and team meetings. The more it is discussed,
                      the less taboo it becomes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Lead by example
                      </strong>{" "}
                      &mdash; If you feel comfortable doing so, share your own
                      experiences. When leaders and respected colleagues talk
                      openly, it gives others permission to do the same
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Ask &ldquo;How are you, really?&rdquo;
                      </strong>{" "}
                      &mdash; Go beyond the superficial. A genuine follow-up
                      question shows you actually care about the answer
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Challenge inappropriate comments
                      </strong>{" "}
                      &mdash; When you hear stigmatising language or jokes,
                      calmly address it. You do not need to lecture &mdash;
                      sometimes a simple &ldquo;that&rsquo;s not helpful&rdquo;
                      is enough
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Be visible</strong> &mdash;
                      As an MHFA, make sure people know you are there and
                      approachable. Display your MHFA status, remind people in
                      inductions and meetings
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Key Campaigns &amp; Organisations
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white">
                      Time to Change / Time to Talk Day
                    </p>
                    <p className="text-sm text-white/80">
                      England&rsquo;s largest programme to challenge mental
                      health stigma and discrimination, led by Mind and Rethink
                      Mental Illness. Although the campaign formally ended in
                      2021, Time to Talk Day continues annually, encouraging
                      people to have open conversations about mental health.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Mates in Mind
                    </p>
                    <p className="text-sm text-white/80">
                      A UK charity focused on improving and supporting mental
                      health in the construction and related industries.
                      Provides training, resources, and a framework for
                      organisations to address mental health in the workplace.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Construction Industry Helpline
                    </p>
                    <p className="text-sm text-white/80">
                      A free, confidential service available 24/7 on{" "}
                      <strong className="text-purple-400">
                        0345 605 1956
                      </strong>
                      . Provides emotional, financial, and practical support for
                      anyone working in the construction industry and their
                      families.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      Samaritans
                    </p>
                    <p className="text-sm text-white/80">
                      Available 24/7, free to call on{" "}
                      <strong className="text-purple-400">116 123</strong>. You
                      do not have to be suicidal to contact the Samaritans
                      &mdash; they are there for anyone who is struggling or
                      needs someone to talk to.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    What an MHFA Can Do to Reduce Workplace Stigma
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Be a visible, approachable point of contact for anyone
                      experiencing mental health difficulties
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Initiate and support mental health awareness activities on
                      site (e.g. Time to Talk Day, Mental Health Awareness Week)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Signpost colleagues to appropriate professional help and
                      support services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Challenge stigmatising language and behaviour when it
                      occurs, in a calm and non-confrontational way
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Share information and resources to improve understanding
                      across the team
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Encourage the organisation to develop and implement mental
                      health policies and training
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Model healthy behaviours &mdash; taking breaks, managing
                      workload, talking about wellbeing
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Remember:
                  </strong>{" "}
                  You do not need to have all the answers. The most powerful
                  thing you can do as a Mental Health First Aider is simply be
                  there &mdash; to listen without judgement, to show that you
                  care, and to help someone take the first step towards getting
                  the support they need. That alone can be transformational.
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
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-1-section-2">
              Next: Recognising Signs &amp; Symptoms
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
