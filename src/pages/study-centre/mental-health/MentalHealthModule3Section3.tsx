import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Shield,
  Heart,
  Users,
  TrendingDown,
  HardHat,
  Ban,
  Phone,
  Lock,
  Brain,
  BarChart3,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "suicide-highest-rate-group",
    question:
      "According to ONS data, which demographic group has the highest suicide rate in the UK?",
    options: [
      "Women aged 20-24",
      "Men aged 45-49",
      "Men aged 18-24",
      "Women aged 50-54",
    ],
    correctIndex: 1,
    explanation:
      "ONS data consistently shows that men aged 45-49 have the highest suicide rate of any demographic group in the UK. Male suicides account for approximately three-quarters of all suicides. This age group may face a combination of risk factors including relationship breakdown, financial stress, job insecurity, social isolation, and a reluctance to seek help.",
  },
  {
    id: "suicide-strongest-predictor",
    question:
      "Which of the following is the single strongest predictor of future suicide?",
    options: [
      "Being in the construction industry",
      "Having a mental health condition",
      "A previous suicide attempt",
      "Social isolation",
    ],
    correctIndex: 2,
    explanation:
      "A previous suicide attempt is consistently identified in the research as the single strongest predictor of future suicide. A person who has made a previous attempt is significantly more likely to die by suicide than someone who has never attempted. This is why anyone who has previously attempted suicide should be considered at elevated risk and offered ongoing support and monitoring.",
  },
  {
    id: "suicide-talking-myth",
    question:
      "A colleague tells you they are worried about a mate on site who has been making comments about 'not being around much longer.' They say they do not want to ask him about suicide because 'talking about it might put the idea in his head.' How should you respond?",
    options: [
      "Agree — it is safer not to mention suicide directly in case it encourages it",
      "Explain that this is a common myth — research consistently shows that asking someone directly about suicide does NOT increase risk and can actually save lives",
      "Suggest they wait and see if the comments continue before doing anything",
      "Tell them to report it to HR and let professionals handle it",
    ],
    correctIndex: 1,
    explanation:
      "The belief that talking about suicide encourages it is one of the most dangerous and persistent myths. Decades of research consistently show that asking someone directly about suicidal thoughts does NOT increase risk — in fact, it can reduce distress by showing the person that someone cares and is willing to listen. The right response is to ask directly, listen without judgement, and help them access support. Waiting or avoiding the conversation can allow the situation to escalate.",
  },
];

const faqs = [
  {
    question:
      "Should I ask someone directly if they are thinking about suicide?",
    answer:
      "Yes. Asking directly and compassionately about suicidal thoughts does not increase risk — this is one of the most well-evidenced findings in suicide prevention research. Asking shows the person that someone has noticed their distress and is willing to listen. Use clear, direct language: 'Are you thinking about suicide?' or 'Are you having thoughts of ending your life?' Avoid vague or euphemistic language. If the person says yes, listen without judgement, stay with them, and help them access professional support (call 999 if they are in immediate danger, or contact the Samaritans on 116 123).",
  },
  {
    question:
      "What should I do if a colleague on site tells me they are having suicidal thoughts?",
    answer:
      "First, stay calm and listen. Do not panic, dismiss their feelings, or promise to keep it a secret. Take them to a quiet, safe space. Ask them directly whether they have a plan and whether they have access to the means to carry it out. If they are in immediate danger (they have a plan and means), call 999. If they are not in immediate danger, help them contact a crisis helpline (Samaritans: 116 123, free, 24/7) or their GP. Stay with them until professional support is engaged. Follow up with them in the days and weeks afterwards — ongoing connection is protective.",
  },
  {
    question:
      "Why is the construction industry's suicide rate so much higher than the national average?",
    answer:
      "Construction has the highest suicide rate of any UK industry — approximately 3.7 times the national average for men. Multiple factors contribute: the workforce is predominantly male (and male gender is a risk factor in the UK); the work is physically demanding with long, irregular hours; workers are often away from home and family, increasing social isolation; the industry has a deeply embedded culture of stoicism ('man up' attitudes) that discourages help-seeking; substance misuse rates are higher than average; work can be precarious with periods of unemployment between contracts; and workers have access to means (heights, tools, substances). Organisations like Mates in Mind and the Lighthouse Club are working to change the culture and improve access to support in the industry.",
  },
  {
    question:
      "What is means restriction and why is it important in suicide prevention?",
    answer:
      "Means restriction is the strategy of reducing access to the means by which people take their own lives. It is one of the most effective evidence-based suicide prevention strategies. Research shows that suicidal crises are often brief — if a person cannot access a lethal method during the acute crisis, they frequently do not go on to attempt suicide by another method. Examples include barriers on bridges, blister packs for medication (instead of bottles), restricting access to firearms, and — on construction sites — controlling access to heights, safe storage of tools and substances, and ensuring edge protection is in place. As an MHFA, you can advocate for safer site environments that reduce access to means.",
  },
  {
    question:
      "What helplines are available for someone in suicidal crisis in the UK?",
    answer:
      "Several free, confidential helplines are available 24 hours a day, 7 days a week: Samaritans — 116 123 (free from any phone, 24/7); SHOUT Crisis Text Line — text 'SHOUT' to 85258 (free, 24/7); CALM (Campaign Against Living Miserably) — 0800 58 58 58 (for men, 5pm-midnight daily); Papyrus HOPELINEUK — 0800 068 4141 (for under 35s, 9am-midnight daily); Lighthouse Club Construction Industry Helpline — 0345 605 1956 (construction-specific, 24/7). In an immediate emergency where someone has harmed themselves or is about to, call 999.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Approximately how many suicides occur each year in the UK, according to ONS data?",
    options: [
      "Approximately 1,000",
      "Approximately 3,000",
      "Approximately 6,000",
      "Approximately 12,000",
    ],
    correctAnswer: 2,
    explanation:
      "ONS data records approximately 6,000 suicides per year in the UK. Male suicides account for approximately three-quarters of this figure. The actual number may be higher, as some deaths recorded as 'undetermined intent' or 'accidental' may in fact be suicides.",
  },
  {
    id: 2,
    question:
      "The construction industry has a suicide rate that is approximately how many times the national average for men?",
    options: [
      "1.5 times the national average",
      "2.0 times the national average",
      "3.7 times the national average",
      "5.0 times the national average",
    ],
    correctAnswer: 2,
    explanation:
      "Construction has the highest suicide rate of any UK industry, at approximately 3.7 times the national average for men. This is driven by a combination of factors: a predominantly male workforce, a culture of stoicism, physically demanding and often precarious work, social isolation from family, higher rates of substance misuse, and access to means (heights, tools, substances).",
  },
  {
    id: 3,
    question:
      "Which of the following is a PROTECTIVE factor against suicide?",
    options: [
      "Social isolation",
      "Access to lethal means",
      "Strong social connections and a sense of purpose",
      "Previous suicide attempt",
    ],
    correctAnswer: 2,
    explanation:
      "Strong social connections and a sense of purpose are among the most important protective factors against suicide. Feeling connected to other people — family, friends, colleagues — reduces the likelihood of suicidal behaviour. This is why social connection at work, including checking in on colleagues and fostering a supportive team culture, is a genuine suicide prevention strategy.",
  },
  {
    id: 4,
    question:
      "Which of the following is a common warning sign that someone may be considering suicide?",
    options: [
      "Starting a new hobby",
      "Talking about wanting to die or being a burden to others",
      "Taking on extra responsibilities at work",
      "Becoming more sociable than usual",
    ],
    correctAnswer: 1,
    explanation:
      "Talking about wanting to die or being a burden to others is one of the most direct and important warning signs of suicidal intent. Other warning signs include withdrawal from friends and activities, giving away possessions, increased substance use, dramatic mood changes, recklessness, putting affairs in order, hopelessness, and saying goodbye to people. Any of these signs should be taken seriously.",
  },
  {
    id: 5,
    question:
      "The myth that 'talking about suicide encourages it' is:",
    options: [
      "True — discussing suicide can plant the idea in someone's mind",
      "Partially true — it depends on the person's mental state",
      "FALSE — research consistently shows that asking about suicide does NOT increase risk and can reduce distress",
      "True for young people, but false for adults",
    ],
    correctAnswer: 2,
    explanation:
      "This is one of the most dangerous myths about suicide. Decades of research consistently show that asking someone directly and compassionately about suicidal thoughts does NOT increase risk, does NOT 'plant the idea,' and can actually reduce distress by showing the person that someone cares. Avoiding the conversation leaves the person isolated with their thoughts and can allow the crisis to escalate.",
  },
  {
    id: 6,
    question:
      "What is 'means restriction' in the context of suicide prevention?",
    options: [
      "Restricting someone from leaving their workplace during a crisis",
      "Reducing access to the methods by which people take their own lives, as an evidence-based prevention strategy",
      "Preventing people from talking about suicide at work",
      "Locking away all personal belongings on construction sites",
    ],
    correctAnswer: 1,
    explanation:
      "Means restriction is the strategy of reducing access to the methods (means) by which people die by suicide. It is one of the most effective evidence-based suicide prevention strategies. Because suicidal crises are often brief, if a person cannot access a lethal method during the acute crisis, they frequently do not go on to attempt by another method. On construction sites, this includes controlling access to heights, safe storage of medications and hazardous substances, ensuring edge protection is in place, and maintaining barriers.",
  },
  {
    id: 7,
    question:
      "A colleague gives away his favourite tools to other workers on site, says 'you lot will be better off without me,' and has been withdrawing from the group for several weeks. What should you do?",
    options: [
      "Respect his privacy and assume he is just having a bad day",
      "Wait to see if his behaviour improves over the next few weeks",
      "Take these warning signs seriously — find a quiet moment to ask directly if he is thinking about suicide, listen without judgement, and help him access support",
      "Report him to the site manager for behaving unusually",
    ],
    correctAnswer: 2,
    explanation:
      "Giving away possessions, expressing that others would be 'better off without me' (feeling like a burden), and withdrawal from social connections are all recognised warning signs of suicidal intent. The correct response is to take these signs seriously, find a private and safe moment to ask directly about suicide ('Are you thinking about ending your life?'), listen without judgement, stay with the person, and help them access support. Do not assume it will pass on its own — these are signs that the person needs help now.",
  },
  {
    id: 8,
    question:
      "On a construction site, which of the following is an example of means restriction as a suicide prevention measure?",
    options: [
      "Requiring all workers to attend mental health awareness training",
      "Installing barriers at height, ensuring edge protection is in place, and safely storing hazardous substances and medications",
      "Displaying helpline numbers in the welfare facilities",
      "Encouraging workers to talk about their feelings during toolbox talks",
    ],
    correctAnswer: 1,
    explanation:
      "Means restriction on a construction site includes physical measures that reduce access to the methods of suicide: installing barriers at height, ensuring edge protection is maintained even when work is not being done at that level, securely storing hazardous substances, locking away medications, and controlling access to areas where falls from height are possible. While mental health training, helpline posters, and toolbox talks are all valuable prevention measures, they are not examples of means restriction — means restriction specifically refers to reducing physical access to lethal methods.",
  },
];

export default function MentalHealthModule3Section3() {
  useSEO({
    title:
      "Suicide Awareness & Prevention | Mental Health Module 3.3",
    description:
      "UK suicide statistics, construction industry rates, risk factors and protective factors, warning signs, myths about suicide, means restriction, and the role of the MHFA in suicide prevention.",
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
            <Link to="../mental-health-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-400/20 border border-purple-500/30 mb-4">
            <AlertTriangle className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 3 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Suicide Awareness &amp; Prevention
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            UK suicide statistics, construction industry rates, risk factors
            and protective factors, warning signs, myths about suicide, means
            restriction, and the role of the Mental Health First Aider in
            suicide prevention
          </p>
        </header>

        {/* Sensitive Topic Notice */}
        <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg mb-8">
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-purple-400 mb-1">
                Sensitive Topic
              </p>
              <p className="text-sm text-white/80">
                This section covers suicide awareness and prevention. The
                content is factual, evidence-based, and written with
                compassion. If you find any of this material distressing, you
                can take a break at any time. If you or someone you know is
                affected by suicidal thoughts, contact the{" "}
                <strong className="text-white">Samaritans</strong> free on{" "}
                <strong className="text-purple-300">116 123</strong> (24/7)
                or text <strong className="text-purple-300">SHOUT</strong>{" "}
                to <strong className="text-purple-300">85258</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>~6,000</strong> suicides per year in the UK
                (ONS data)
              </li>
              <li>
                <strong>3 in 4</strong> suicides are male &mdash; highest
                rate in men aged 45&ndash;49
              </li>
              <li>
                <strong>Construction:</strong> 3.7&times; the national
                average suicide rate for men
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Ask directly:</strong> &ldquo;Are you thinking
                about suicide?&rdquo; saves lives
              </li>
              <li>
                <strong>Means restriction:</strong> control access to
                heights, substances, tools
              </li>
              <li>
                <strong>Connect:</strong> check in on mates &mdash; social
                connection is protective
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
              "State key UK suicide statistics and explain why construction is a high-risk industry",
              "Identify the major risk factors and protective factors for suicide",
              "Recognise the warning signs that someone may be considering suicide",
              "Challenge common myths about suicide with evidence-based facts",
              "Explain the concept of means restriction and its application on construction sites",
              "Describe the role of the Mental Health First Aider in encouraging safer environments",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: UK Suicide Statistics */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            UK Suicide Statistics
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Suicide is a significant public health issue in the United
                Kingdom. Understanding the scale and patterns of suicide is
                essential for anyone working in a Mental Health First Aid
                role, particularly in high-risk industries such as
                construction.
              </p>

              {/* Key Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-400">~6,000</p>
                  <p className="text-[11px] text-white/60">
                    Suicides per year in the UK
                  </p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-400">~75%</p>
                  <p className="text-[11px] text-white/60">
                    Of suicides are male
                  </p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-400">45&ndash;49</p>
                  <p className="text-[11px] text-white/60">
                    Highest rate age group (men)
                  </p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-400">3.7&times;</p>
                  <p className="text-[11px] text-white/60">
                    Construction vs national average
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    ONS Data &mdash; Key Findings
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    "Approximately 6,000 people die by suicide each year in the UK — that is around 16 people every day",
                    "Male suicides account for approximately three-quarters of all suicides — this disparity has been consistent for decades",
                    "The highest suicide rate is in men aged 45-49, though rates are also elevated in men aged 50-54",
                    "Suicide is the leading cause of death in men under 50 in England and Wales",
                    "The actual figure may be higher — some deaths recorded as 'undetermined intent' or 'accidental' may in fact be suicides",
                    "Rates vary by region, with higher rates in some areas of northern England and Scotland",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Construction Industry Focus */}
              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-6 w-6 text-red-400" />
                  <p className="text-base font-bold text-red-400">
                    Construction Industry &mdash; Highest Risk
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  Construction has the <strong className="text-white">highest
                  suicide rate of any UK industry</strong>. ONS data shows that
                  men working in construction are approximately{" "}
                  <strong className="text-white">3.7 times more likely to die
                  by suicide</strong> than the national average for men.
                </p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Why Is Construction So High-Risk?
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    {[
                      "Predominantly male workforce — male gender is a risk factor for suicide in the UK",
                      "Deeply embedded culture of stoicism — 'man up' attitudes discourage help-seeking",
                      "Physically demanding work with long, irregular hours",
                      "Periods away from home and family — increasing social isolation",
                      "Precarious employment — contract work with periods of unemployment between jobs",
                      "Higher-than-average rates of substance misuse (alcohol and drugs)",
                      "Access to means — heights, tools, hazardous substances are part of the daily work environment",
                      "Financial pressures, particularly for self-employed and subcontracted workers",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Why This Matters for You:
                  </strong>{" "}
                  As someone working in the construction industry and training
                  in Mental Health First Aid, you are in a uniquely important
                  position. You work alongside the demographic group most
                  affected by suicide. Your awareness, your willingness to
                  have difficult conversations, and your ability to spot
                  warning signs could genuinely save a life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Risk Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            Risk Factors
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Risk factors are characteristics or circumstances that
                increase the likelihood of suicidal behaviour. No single risk
                factor causes suicide — it is usually a combination of
                factors that overwhelms a person&rsquo;s capacity to cope.
                Understanding these factors helps the MHFA identify people
                who may be at elevated risk and offer early support.
              </p>

              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Key Risk Factors for Suicide
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      factor: "Previous suicide attempt",
                      detail:
                        "The single strongest predictor of future suicide. A person who has previously attempted is at significantly elevated risk.",
                      highlight: true,
                    },
                    {
                      factor: "Mental health conditions",
                      detail:
                        "Depression, bipolar disorder, schizophrenia, personality disorders, PTSD, and anxiety disorders all increase risk.",
                      highlight: false,
                    },
                    {
                      factor: "Substance misuse",
                      detail:
                        "Alcohol and drug misuse increase impulsivity, worsen depression, and reduce inhibition — all of which increase suicide risk.",
                      highlight: false,
                    },
                    {
                      factor: "Relationship breakdown",
                      detail:
                        "Separation, divorce, or the end of a significant relationship is a common trigger, particularly in men.",
                      highlight: false,
                    },
                    {
                      factor: "Financial problems",
                      detail:
                        "Debt, job loss, business failure, and financial insecurity are significant risk factors.",
                      highlight: false,
                    },
                    {
                      factor: "Bereavement",
                      detail:
                        "Loss of a loved one — particularly loss of a child, partner, or close friend to suicide — increases risk.",
                      highlight: false,
                    },
                    {
                      factor: "Social isolation",
                      detail:
                        "Living alone, having few social connections, and feeling disconnected from others.",
                      highlight: false,
                    },
                    {
                      factor: "Chronic pain or illness",
                      detail:
                        "Long-term physical health conditions, chronic pain, and terminal illness increase risk.",
                      highlight: false,
                    },
                    {
                      factor: "Job loss or unemployment",
                      detail:
                        "Loss of employment — and the identity, purpose, and income it provides — is a significant risk factor.",
                      highlight: false,
                    },
                    {
                      factor: "Access to means",
                      detail:
                        "Having access to lethal methods (firearms, medications, heights) increases the likelihood that a suicidal thought becomes a suicidal act.",
                      highlight: false,
                    },
                    {
                      factor: "Male gender (in the UK)",
                      detail:
                        "Men are approximately three times more likely to die by suicide than women in the UK.",
                      highlight: false,
                    },
                    {
                      factor: "Being in the construction industry",
                      detail:
                        "Construction workers face multiple compounding risk factors — male workforce, stoic culture, precarious work, isolation, access to means.",
                      highlight: true,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-2 rounded-lg ${
                        item.highlight
                          ? "bg-red-500/10 border border-red-500/30"
                          : ""
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 ${
                          item.highlight
                            ? "bg-red-500/20 text-red-400"
                            : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            item.highlight ? "text-red-300" : "text-white"
                          }`}
                        >
                          {item.factor}
                        </p>
                        <p className="text-sm text-white/70 mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Important:
                  </strong>{" "}
                  Risk factors are not a checklist. A person may have several
                  risk factors and never become suicidal. Equally, a person
                  may have few obvious risk factors and still be at risk.
                  Risk factors help you be more aware, but they do not
                  replace the importance of actually asking someone how they
                  are feeling.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Protective Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Protective Factors
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Protective factors are characteristics and circumstances that
                reduce the likelihood of suicidal behaviour. While risk
                factors increase vulnerability, protective factors build
                resilience. As a Mental Health First Aider, strengthening
                protective factors is just as important as identifying risk
                factors.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    factor: "Strong social connections",
                    detail:
                      "Meaningful relationships with family, friends, and colleagues provide a sense of belonging and reduce isolation.",
                    icon: Users,
                    colour: "text-green-400",
                    bg: "bg-green-500/10",
                    border: "border-green-500/30",
                  },
                  {
                    factor: "Sense of purpose",
                    detail:
                      "Feeling that life has meaning — through work, family, hobbies, faith, or community involvement.",
                    icon: Heart,
                    colour: "text-pink-400",
                    bg: "bg-pink-500/10",
                    border: "border-pink-500/30",
                  },
                  {
                    factor: "Access to mental health support",
                    detail:
                      "Knowing where to get help and being willing to use it — GP, counselling, helplines, EAP services.",
                    icon: Phone,
                    colour: "text-blue-400",
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/30",
                  },
                  {
                    factor: "Restricted access to means",
                    detail:
                      "Physical barriers that make it harder to act on suicidal impulses during a crisis — barriers at heights, safe medication storage.",
                    icon: Lock,
                    colour: "text-amber-400",
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/30",
                  },
                  {
                    factor: "Cultural or religious beliefs",
                    detail:
                      "Beliefs that provide hope, meaning, or a moral framework against self-harm can be protective.",
                    icon: Shield,
                    colour: "text-violet-400",
                    bg: "bg-violet-500/10",
                    border: "border-violet-500/30",
                  },
                  {
                    factor: "Problem-solving skills",
                    detail:
                      "The ability to think through difficulties, see alternatives, and believe that problems can be resolved.",
                    icon: Brain,
                    colour: "text-teal-400",
                    bg: "bg-teal-500/10",
                    border: "border-teal-500/30",
                  },
                  {
                    factor: "Feeling connected to colleagues",
                    detail:
                      "On-site camaraderie, being part of a team, knowing that people would notice and care if something was wrong.",
                    icon: HardHat,
                    colour: "text-orange-400",
                    bg: "bg-orange-500/10",
                    border: "border-orange-500/30",
                  },
                  {
                    factor: "Having children",
                    detail:
                      "For many people, responsibility for their children is a strong protective factor against acting on suicidal thoughts.",
                    icon: Heart,
                    colour: "text-rose-400",
                    bg: "bg-rose-500/10",
                    border: "border-rose-500/30",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`${item.bg} border ${item.border} p-4 rounded-lg`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className={`h-5 w-5 ${item.colour}`} />
                      <p className={`text-sm font-medium ${item.colour}`}>
                        {item.factor}
                      </p>
                    </div>
                    <p className="text-sm text-white/80">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Your Role as MHFA:
                  </strong>{" "}
                  Every time you check in on a colleague, include someone in
                  a conversation, or foster a sense of team belonging on
                  site, you are strengthening protective factors. These
                  everyday interactions are genuine suicide prevention —
                  they keep people connected and reduce the isolation that
                  is so dangerous.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Warning Signs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Warning Signs
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Warning signs are observable changes in behaviour, speech, or
                mood that may indicate someone is considering suicide. Not
                everyone who is suicidal will show warning signs, but most
                people do give some indication — the key is knowing what
                to look for and taking it seriously.
              </p>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <p className="text-base font-bold text-red-400">
                    Warning Signs to Watch For
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      sign: "Talking about wanting to die or being a burden",
                      detail:
                        "Statements like 'I wish I were dead,' 'Everyone would be better off without me,' 'I can't go on,' or 'What's the point?' These may be direct or indirect.",
                      severity: "high",
                    },
                    {
                      sign: "Withdrawal from friends and activities",
                      detail:
                        "Pulling away from social contact, stopping activities they used to enjoy, not responding to messages, avoiding the canteen or break times.",
                      severity: "medium",
                    },
                    {
                      sign: "Giving away possessions",
                      detail:
                        "Giving away valued belongings, tools, or personal items without explanation. On a construction site, giving away favourite tools is a significant sign.",
                      severity: "high",
                    },
                    {
                      sign: "Increased substance use",
                      detail:
                        "Drinking more heavily, using drugs, or starting to use substances they did not use before. Substance use increases impulsivity and lowers inhibition.",
                      severity: "medium",
                    },
                    {
                      sign: "Dramatic mood changes",
                      detail:
                        "Sudden shifts in mood — particularly sudden calmness after a period of depression (this may indicate a decision has been made).",
                      severity: "high",
                    },
                    {
                      sign: "Recklessness",
                      detail:
                        "Taking unnecessary risks, ignoring safety procedures, acting as though personal safety does not matter.",
                      severity: "medium",
                    },
                    {
                      sign: "Putting affairs in order",
                      detail:
                        "Writing a will, settling debts, arranging care for dependants, or making other preparations that suggest they do not expect to be around.",
                      severity: "high",
                    },
                    {
                      sign: "Previous attempt",
                      detail:
                        "A previous suicide attempt is the strongest predictor of future suicide. Any person who has previously attempted should be considered at elevated risk.",
                      severity: "high",
                    },
                    {
                      sign: "Hopelessness",
                      detail:
                        "Expressing hopelessness about the future — 'Nothing will ever get better,' 'There's no way out,' 'I'm trapped.' Hopelessness is one of the strongest psychological predictors of suicide.",
                      severity: "high",
                    },
                    {
                      sign: "Saying goodbye",
                      detail:
                        "Making unusual or unexpected contact with people to say goodbye, expressing gratitude out of context, or behaving as though they are tying up loose ends.",
                      severity: "high",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        item.severity === "high"
                          ? "bg-red-500/10 border border-red-500/30"
                          : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          item.severity === "high"
                            ? "text-red-400"
                            : "text-amber-400"
                        }`}
                      />
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            item.severity === "high"
                              ? "text-red-300"
                              : "text-white"
                          }`}
                        >
                          {item.sign}
                        </p>
                        <p className="text-sm text-white/70 mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Critical Point:
                  </strong>{" "}
                  Be particularly alert to{" "}
                  <strong>sudden calmness after a period of depression
                  </strong>. This can indicate that the person has made a
                  decision and feels a sense of relief — not that they are
                  &ldquo;getting better.&rdquo; It can be the most dangerous
                  phase. If a colleague who has been visibly struggling
                  suddenly appears peaceful and resolved, do not assume the
                  crisis has passed — check in with them directly.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  What to Look for on Site
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    "Changes in work performance — becoming careless, missing deadlines, or losing interest",
                    "Arriving late or not turning up, particularly if previously reliable",
                    "Increased arguments or conflict with colleagues",
                    "Neglecting personal appearance or hygiene",
                    "Expressions of feeling trapped, like there is no way out",
                    "Changes in eating habits — eating much more or much less",
                    "Sleeping problems — appearing exhausted or saying they cannot sleep",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Myths About Suicide */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Myths About Suicide
          </h2>
          <div className="border-l-2 border-violet-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Myths and misconceptions about suicide are widespread and
                dangerous. They prevent people from seeking help, discourage
                others from intervening, and contribute to the stigma that
                surrounds suicidal distress. As a Mental Health First Aider,
                you must be able to challenge these myths with evidence-based
                facts.
              </p>

              {/* Myth-Busting Diagram */}
              <div className="bg-white/5 border-2 border-purple-500/30 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 px-4 py-3 border-b border-purple-500/20">
                  <p className="text-base font-semibold text-purple-400 text-center">
                    Myths vs Facts &mdash; What the Evidence Says
                  </p>
                </div>
                <div className="p-4 space-y-4">
                  {[
                    {
                      myth: "Talking about suicide encourages it",
                      fact: "Asking someone directly about suicide does NOT increase risk. Research consistently shows it can reduce distress and save lives. Avoiding the conversation is what is dangerous.",
                      mythLabel: "MYTH",
                    },
                    {
                      myth: "People who talk about suicide don't do it",
                      fact: "Many people who die by suicide have previously told someone about their thoughts or intentions. Every mention of suicide or desire to die must be taken seriously.",
                      mythLabel: "MYTH",
                    },
                    {
                      myth: "Suicide is selfish",
                      fact: "People who are suicidal typically believe they are a burden to others and that their loved ones would be better off without them. From their perspective, they are removing a problem, not creating one. Calling it 'selfish' increases shame and prevents help-seeking.",
                      mythLabel: "MYTH",
                    },
                    {
                      myth: "It happens without warning",
                      fact: "Most people who die by suicide give some warning signs beforehand — changes in behaviour, mood, or speech. The signs may be subtle, but they are usually present for those who know what to look for.",
                      mythLabel: "MYTH",
                    },
                    {
                      myth: "Nothing can be done — if someone is determined, they will do it",
                      fact: "Suicidal crises are usually temporary. Intervention works. Most people who survive a suicide attempt do not go on to die by suicide. Reducing access to means, providing support, and staying connected can and does save lives.",
                      mythLabel: "MYTH",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      {/* Myth */}
                      <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                            <XCircle className="h-4 w-4 text-red-400" />
                            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                              {item.mythLabel}
                            </span>
                          </div>
                          <p className="text-sm text-white/80 italic">
                            &ldquo;{item.myth}&rdquo;
                          </p>
                        </div>
                      </div>
                      {/* Fact */}
                      <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
                              FACT
                            </span>
                          </div>
                          <p className="text-sm text-white/80">{item.fact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Key Takeaway:
                  </strong>{" "}
                  The single most important myth to challenge is the belief
                  that talking about suicide encourages it. This myth stops
                  people from having the conversations that could save lives.
                  The evidence is clear:{" "}
                  <strong>
                    asking someone directly about suicidal thoughts is one of
                    the most important things you can do
                  </strong>. It shows the person that someone has noticed,
                  someone cares, and someone is willing to listen.
                </p>
              </div>

              {/* Additional Myths */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  More Myths to Be Aware Of
                </p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <Ban className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-red-300">
                        &ldquo;Only people with mental health conditions die by
                        suicide&rdquo;
                      </strong>{" "}
                      &mdash; FALSE. While mental health conditions are a risk
                      factor, many people who die by suicide do not have a
                      diagnosed condition. Life events such as relationship
                      breakdown, financial crisis, or bereavement can trigger
                      suicidal thoughts in anyone.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Ban className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-red-300">
                        &ldquo;Suicide only affects certain types of
                        people&rdquo;
                      </strong>{" "}
                      &mdash; FALSE. Suicide affects people of all ages,
                      backgrounds, ethnicities, and socioeconomic groups. It can
                      affect your colleague, your friend, your family member, or
                      you.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Ban className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-red-300">
                        &ldquo;If someone is going to do it, they will find a
                        way regardless&rdquo;
                      </strong>{" "}
                      &mdash; FALSE. Most suicidal crises last minutes to
                      hours. If the person cannot access a lethal method
                      during that window, the crisis often passes. This is why
                      means restriction is so effective.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Means Restriction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Means Restriction
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Means restriction</strong> is the strategy of reducing
                access to the methods by which people die by suicide. It is
                one of the most effective and evidence-based suicide
                prevention strategies available. The principle is
                straightforward: if a person in suicidal crisis cannot
                access a lethal method, the crisis frequently passes without
                a suicide attempt.
              </p>

              <div className="bg-green-500/10 border-2 border-green-500/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-6 w-6 text-green-400" />
                  <p className="text-base font-bold text-green-400">
                    Why Means Restriction Works
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Research consistently shows that suicidal crises are
                    usually <strong className="text-white">brief and
                    time-limited</strong>. The period of acute suicidal
                    intent often lasts only minutes to hours. During this
                    window, the person may act impulsively — but if the
                    means are not readily available, the impulse frequently
                    passes.
                  </p>
                  <p>
                    Studies of survivors of serious suicide attempts
                    consistently show that many people{" "}
                    <strong className="text-white">do not go on to die by
                    suicide</strong>. The crisis was temporary, even though
                    it felt permanent at the time. Restricting access to
                    means during the critical window saves lives.
                  </p>
                  <p>
                    Critically, when access to one method is restricted,
                    people generally{" "}
                    <strong className="text-white">do not simply switch to
                    another method</strong>. This &ldquo;method
                    substitution&rdquo; is far less common than many
                    people assume.
                  </p>
                </div>
              </div>

              {/* Evidence Base */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Evidence for Means Restriction
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    "Barriers on bridges — installing barriers at known suicide locations has consistently reduced deaths, without significant increases at nearby locations",
                    "Medication packaging — the switch from bottles to blister packs for paracetamol in the UK (1998) led to a significant reduction in paracetamol-related suicide deaths",
                    "Detoxification of domestic gas — when the UK switched from toxic coal gas to natural gas (1960s-70s), the overall suicide rate fell substantially, not just gas-related deaths",
                    "Firearms legislation — countries with stricter firearms legislation have lower rates of suicide by firearms, without corresponding increases by other methods",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safe Storage */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Safe Storage of Medications
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Safe storage of medications is a simple but effective means
                    restriction measure. On construction sites, this includes:
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Keeping first aid medications (paracetamol, ibuprofen) in locked first aid kits, not freely accessible",
                      "Storing prescription medications securely — workers should not leave medications in open bags or lockers",
                      "COSHH substances and hazardous chemicals stored securely with controlled access",
                      "Awareness that over-the-counter painkillers can be lethal in overdose — do not stockpile large quantities on site",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Barriers at Heights */}
              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Barriers at Heights
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Falls from height are a recognised method of suicide.
                    On construction sites, workers have regular access to
                    elevated positions — scaffolding, rooftops, open
                    stairwells, and MEWPs. Means restriction measures include:
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Maintaining edge protection even when work is not actively being done at that level",
                      "Securing access to rooftops and elevated areas outside working hours",
                      "Ensuring scaffolding access points are gated and controlled",
                      "Closing off incomplete structures that could provide access to height",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Construction Site Considerations */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <HardHat className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Construction Site Considerations
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Construction sites present unique means restriction
                    challenges because the working environment inherently
                    includes access to heights, tools, and substances. As an
                    MHFA, you should be aware of the following:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-red-300 mb-2">
                        Access to Heights
                      </p>
                      <ul className="text-xs text-white/70 space-y-1">
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Scaffolding and working platforms</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Incomplete structures and open voids</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Rooftops and parapets</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>MEWPs and tower cranes</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-red-300 mb-2">
                        Tools &amp; Equipment
                      </p>
                      <ul className="text-xs text-white/70 space-y-1">
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Cutting tools and power tools</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Electrical equipment and cables</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Rope, cable, and ligature materials</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Heavy machinery and vehicles</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-red-300 mb-2">
                        Substances
                      </p>
                      <ul className="text-xs text-white/70 space-y-1">
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>COSHH chemicals and solvents</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Fuels and flammable liquids</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>First aid medications</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <span className="mt-1 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>Pesticides and herbicides</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role of the MHFA */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    The Role of the MHFA in Encouraging Safer Environments
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    As a Mental Health First Aider, you can advocate for means
                    restriction on your site. This does not mean implementing
                    changes yourself — it means raising awareness and
                    encouraging site management to consider suicide prevention
                    as part of the site safety plan.
                  </p>
                  <div className="space-y-2">
                    {[
                      "Encourage site managers to consider means restriction in the site safety plan — not just as a health and safety measure, but as a suicide prevention measure",
                      "Advocate for edge protection to be maintained at all times, not just during active work at height",
                      "Support secure storage of medications, chemicals, and hazardous substances",
                      "Promote a culture where checking in on colleagues is normalised — social connection is itself a form of prevention",
                      "Ensure helpline numbers and support information are visible in welfare facilities, toilets, and break areas",
                      "Challenge the 'man up' culture and encourage open conversations about mental health",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-white/80">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Remember:
                  </strong>{" "}
                  Means restriction is not about eliminating every possible
                  risk — that would be impossible on a construction site. It
                  is about making it harder for a person to act on a suicidal
                  impulse during the brief window of acute crisis. Even small
                  barriers — a locked gate, a secured store, edge protection
                  left in place overnight — can be the difference between
                  life and death.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Helplines Box */}
        <div className="bg-purple-500/10 border-2 border-purple-500/40 p-5 rounded-lg mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-6 w-6 text-purple-400" />
            <p className="text-base font-bold text-purple-400">
              Crisis Helplines &mdash; Free &amp; Confidential
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
              <p className="text-sm font-medium text-white">Samaritans</p>
              <p className="text-purple-300 font-bold">116 123</p>
              <p className="text-xs text-white/60">
                Free from any phone, 24 hours, 7 days
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
              <p className="text-sm font-medium text-white">
                SHOUT Crisis Text Line
              </p>
              <p className="text-purple-300 font-bold">
                Text &ldquo;SHOUT&rdquo; to 85258
              </p>
              <p className="text-xs text-white/60">Free, 24/7, confidential</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
              <p className="text-sm font-medium text-white">
                CALM (Campaign Against Living Miserably)
              </p>
              <p className="text-purple-300 font-bold">0800 58 58 58</p>
              <p className="text-xs text-white/60">
                For men, 5pm&ndash;midnight daily
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
              <p className="text-sm font-medium text-white">
                Lighthouse Club (Construction)
              </p>
              <p className="text-purple-300 font-bold">0345 605 1956</p>
              <p className="text-xs text-white/60">
                Construction-specific, 24/7
              </p>
            </div>
          </div>
          <p className="text-xs text-white/50 mt-3">
            In an immediate emergency where someone has harmed themselves or
            is about to, always call <strong className="text-white">999</strong>.
          </p>
        </div>

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
          title="Section 3 Knowledge Check"
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
            <Link to="../mental-health-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-3-section-4">
              Next: Suicide First Aid &amp; Crisis Response
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
