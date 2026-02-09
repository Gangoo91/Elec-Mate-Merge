import {
  ArrowLeft,
  Flame,
  CheckCircle,
  AlertTriangle,
  Brain,
  TrendingUp,
  Battery,
  Heart,
  Shield,
  Users,
  Clock,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

/* ------------------------------------------------------------------ */
/*  Quiz questions (8)                                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "According to the HSE, what is stress defined as?",
    options: [
      "A medical condition requiring immediate treatment",
      "The adverse reaction people have to excessive pressures or demands placed upon them",
      "A normal emotional response that is always beneficial",
      "A personality trait that some people are born with",
    ],
    correctAnswer: 1,
    explanation:
      "The HSE defines stress as 'the adverse reaction people have to excessive pressures or other types of demand placed upon them.' It is not an illness itself, but prolonged stress can lead to both physical and mental illness. The key word is 'adverse' \u2014 distinguishing harmful stress from normal, motivating pressure.",
  },
  {
    id: 2,
    question:
      "Which of the following best describes the difference between pressure and stress?",
    options: [
      "They are the same thing \u2014 the terms are interchangeable",
      "Pressure is motivating and helps performance; stress occurs when demands exceed a person's ability to cope and becomes harmful",
      "Stress is always short-term; pressure is always long-term",
      "Pressure only affects the body; stress only affects the mind",
    ],
    correctAnswer: 1,
    explanation:
      "Pressure, within reasonable limits, can be motivating and help people perform well. Stress occurs when the demands placed on a person exceed their perceived ability to cope, causing an adverse reaction. The distinction is crucial for workplace management \u2014 the goal is not to eliminate all pressure, but to prevent it becoming harmful stress.",
  },
  {
    id: 3,
    question:
      "What are the three dimensions of the Maslach Burnout Model?",
    options: [
      "Anxiety, Depression, Fatigue",
      "Emotional Exhaustion, Depersonalisation/Cynicism, Reduced Personal Accomplishment",
      "Physical Stress, Mental Stress, Social Stress",
      "Workload, Control, Reward",
    ],
    correctAnswer: 1,
    explanation:
      "The Maslach Burnout Inventory (MBI) measures burnout across three dimensions: Emotional Exhaustion (feeling drained and overwhelmed), Depersonalisation/Cynicism (detachment from work and colleagues), and Reduced Personal Accomplishment/Inefficacy (feeling ineffective and doubting the value of your work). All three dimensions must be considered together.",
  },
  {
    id: 4,
    question:
      "Which hormone is most associated with chronic stress and long-term health damage?",
    options: [
      "Insulin",
      "Testosterone",
      "Cortisol",
      "Melatonin",
    ],
    correctAnswer: 2,
    explanation:
      "Cortisol is the primary stress hormone released during the stress response. While short-term cortisol release is a normal survival mechanism, chronically elevated cortisol levels damage the cardiovascular system, suppress the immune system, disrupt digestion, and contribute to anxiety and depression. Adrenaline is also released during acute stress but has shorter-term effects.",
  },
  {
    id: 5,
    question:
      "How many Management Standards does the HSE use for stress risk assessment?",
    options: [
      "4 \u2014 Demands, Control, Support, Change",
      "5 \u2014 Demands, Control, Support, Role, Change",
      "6 \u2014 Demands, Control, Support, Relationships, Role, Change",
      "8 \u2014 Demands, Control, Support, Relationships, Role, Change, Pay, Hours",
    ],
    correctAnswer: 2,
    explanation:
      "The HSE Management Standards cover six key areas of work design that, if not properly managed, are associated with poor health, lower productivity, and increased sickness absence. They are: Demands, Control, Support, Relationships, Role, and Change. These standards represent a framework, not a legal requirement, but they reflect best practice.",
  },
  {
    id: 6,
    question:
      "Which of the following is a behavioural sign of stress?",
    options: [
      "Headaches and muscle tension",
      "Irritability and mood swings",
      "Withdrawal from colleagues and increased substance use",
      "Poor concentration and indecisiveness",
    ],
    correctAnswer: 2,
    explanation:
      "Withdrawal from colleagues and increased substance use are behavioural signs of stress \u2014 they are observable changes in what a person does. Headaches and muscle tension are physical signs. Irritability and mood swings are emotional signs. Poor concentration and indecisiveness are cognitive signs. Recognising the category helps you identify stress early across different domains.",
  },
  {
    id: 7,
    question:
      "Which construction-specific stressor is linked to the industry's 'macho culture'?",
    options: [
      "Tight deadlines and programme pressure",
      "Reluctance to seek help or admit to struggling, for fear of being seen as weak",
      "Physical demands of manual labour",
      "Exposure to adverse weather conditions",
    ],
    correctAnswer: 1,
    explanation:
      "The construction industry has a well-documented 'macho culture' that discourages workers from admitting to stress, mental health difficulties, or asking for help. This reluctance to seek support means problems often escalate to crisis point before they are addressed. Changing this culture through open conversation and visible leadership support is essential.",
  },
  {
    id: 8,
    question:
      "What is the HSE Indicator Tool used for?",
    options: [
      "Measuring blood pressure of stressed workers",
      "Calculating overtime hours to prevent burnout",
      "A survey-based tool to help organisations assess how well they are managing the six Management Standards for work-related stress",
      "Identifying individual employees who are most likely to develop stress",
    ],
    correctAnswer: 2,
    explanation:
      "The HSE Indicator Tool is a 35-item survey that asks employees about their working conditions across the six Management Standards. It produces scores that can be benchmarked against national data, helping organisations identify which areas need improvement. It is an organisational-level tool \u2014 it assesses working conditions, not individual vulnerability.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quick-check questions (3) \u2014 placed after sections 2, 4, 6    */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: "acute-vs-chronic-check",
    question:
      "A construction worker has been dealing with job insecurity, long hours, and financial worries for the past 18 months. He has started getting frequent colds and his blood pressure has increased. Is this person experiencing acute or chronic stress, and why?",
    options: [
      "Acute stress \u2014 because the physical symptoms show it is severe",
      "Chronic stress \u2014 because the stressors are ongoing and cumulative over a prolonged period, and the health effects (suppressed immune system, elevated blood pressure) are consistent with long-term cortisol exposure",
      "Neither \u2014 this is just normal pressure that everyone experiences",
      "Acute stress \u2014 because it has a specific trigger (job insecurity)",
    ],
    correctIndex: 1,
    explanation:
      "This is chronic stress. The key indicators are: the stressors have been ongoing for 18 months (not a single, short-term event), they are cumulative (multiple stressors compounding), and the health effects \u2014 frequent infections (immune suppression) and raised blood pressure (cardiovascular strain) \u2014 are classic consequences of prolonged cortisol elevation associated with chronic stress.",
  },
  {
    id: "construction-stressors-check",
    question:
      "A site manager notices that several of his team are arriving late, taking more sick days, and seem irritable and withdrawn. One worker has started drinking more heavily after shifts. Using your knowledge of stress signs, which categories of signs are being displayed here?",
    options: [
      "Only physical signs \u2014 the sickness absence proves they are physically ill",
      "Behavioural signs (lateness, withdrawal, increased alcohol use, sickness absence) and emotional signs (irritability)",
      "Cognitive signs only \u2014 they cannot concentrate on timekeeping",
      "These are not signs of stress \u2014 the workers are just being lazy",
    ],
    correctIndex: 1,
    explanation:
      "The site manager is observing behavioural signs (lateness, withdrawal from the team, increased alcohol consumption, rising sickness absence) alongside emotional signs (irritability). A good manager trained in mental health awareness would recognise this cluster of changes as potential indicators of stress and initiate a supportive conversation rather than jumping to disciplinary action.",
  },
  {
    id: "hse-standards-check",
    question:
      "An electrician tells you: 'I never know what's expected of me on site \u2014 every foreman tells me something different, and nobody explained my actual responsibilities when I started.' Which HSE Management Standard does this problem fall under?",
    options: [
      "Demands \u2014 the workload is too high",
      "Control \u2014 the worker has no autonomy",
      "Role \u2014 the worker does not have a clear understanding of their role and responsibilities, and conflicting demands are being placed on them",
      "Change \u2014 things keep changing on site",
    ],
    correctIndex: 2,
    explanation:
      "This falls under the 'Role' Management Standard. The HSE states that workers should understand their role and that the organisation should ensure they do not have conflicting roles. This electrician has not been given clear responsibilities (role ambiguity) and is receiving contradictory instructions from different foremen (role conflict). Both are significant stressors.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (5)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      "Is stress always bad? I thought some stress was good for you?",
    answer:
      "You are right that some pressure is beneficial \u2014 it can motivate, sharpen focus, and improve performance. The HSE distinguishes between pressure (which is motivating when proportionate to a person\u2019s abilities) and stress (which occurs when demands exceed a person\u2019s ability to cope). The term \u2018eustress\u2019 is sometimes used for positive pressure. However, when pressure becomes excessive, unrelenting, or feels uncontrollable, it becomes harmful stress. The tipping point varies between individuals and even within the same person at different times, depending on factors like sleep, physical health, social support, and other life pressures.",
  },
  {
    question:
      "Can stress actually cause physical illness, or is it all in your head?",
    answer:
      "Chronic stress causes measurable, objective physical changes in the body. Prolonged cortisol elevation increases blood pressure, raises cholesterol, suppresses the immune system (making you more vulnerable to infections and slower to heal), disrupts the digestive system (contributing to IBS, acid reflux, and ulcers), increases inflammation (linked to heart disease and stroke), and can even alter brain structure, shrinking the prefrontal cortex and enlarging the amygdala. The HSE recognises that work-related stress contributes to cardiovascular disease, musculoskeletal disorders, and mental health conditions. It is emphatically not \u2018all in your head\u2019.",
  },
  {
    question:
      "What is the difference between stress and burnout?",
    answer:
      "Stress is characterised by overengagement \u2014 you feel there is too much to do and not enough time or resources. You are hyper-reactive, anxious, and urgently trying to cope. Burnout is characterised by disengagement \u2014 you have given up trying. The Maslach model describes burnout as the end-stage of chronic, unmanaged stress, involving emotional exhaustion (completely drained), depersonalisation (cynical detachment from work and people), and reduced personal accomplishment (feeling nothing you do matters). Stress says \u2018I can\u2019t keep up\u2019; burnout says \u2018I no longer care\u2019.",
  },
  {
    question:
      "Are employers legally required to do stress risk assessments?",
    answer:
      "Under the Health and Safety at Work etc. Act 1974 and the Management of Health and Safety at Work Regulations 1999, employers have a legal duty to assess and manage risks to health \u2014 including risks from work-related stress. The HSE Management Standards are not themselves legally enforceable, but they represent the recognised good-practice framework for meeting this legal duty. If an employer fails to assess and manage stress risks and a worker suffers harm as a result, they could face enforcement action from the HSE, civil claims, or both. Employers with five or more employees must record their risk assessments.",
  },
  {
    question:
      "What should I do if I recognise signs of stress in a colleague on site?",
    answer:
      "Approach the conversation with genuine concern, not judgement. Choose a quiet moment, not in front of others. You might say something like \u2018I\u2019ve noticed you seem a bit different lately \u2014 is everything alright?\u2019 Listen more than you talk. Do not try to diagnose or fix the problem. Let them know support is available \u2014 their GP, the company\u2019s Employee Assistance Programme (EAP) if one exists, or charities like the Construction Industry Helpline (0345 605 1956), Mates in Mind, or Samaritans (116 123). Sometimes just knowing someone has noticed and cares is enough to break the silence.",
  },
];

/* ------------------------------------------------------------------ */
/*  Border colours for alternating sections                            */
/* ------------------------------------------------------------------ */
const borderColours = [
  "border-purple-500/50",   // 01
  "border-violet-500/50",   // 02
  "border-purple-400/50",   // 03
  "border-violet-400/50",   // 04
  "border-purple-500/50",   // 05
  "border-violet-500/50",   // 06
];

const numColours = [
  "text-purple-400/80",
  "text-violet-400/80",
  "text-purple-400/80",
  "text-violet-400/80",
  "text-purple-400/80",
  "text-violet-400/80",
];

const headingColours = [
  "text-purple-300",
  "text-violet-300",
  "text-purple-300",
  "text-violet-300",
  "text-purple-300",
  "text-violet-300",
];

/* ------------------------------------------------------------------ */
/*  Maslach Burnout Model data                                         */
/* ------------------------------------------------------------------ */
const burnoutDimensions = [
  {
    dimension: "Emotional Exhaustion",
    colour: "red",
    borderClass: "border-red-400/30",
    bgClass: "bg-red-400/10",
    textClass: "text-red-400",
    icon: Battery,
    description:
      "Feeling emotionally drained, depleted, and overwhelmed. A sense that you have nothing left to give. The dominant feeling is exhaustion \u2014 both emotional and physical.",
    signs: [
      "Constant fatigue that sleep does not resolve",
      "Dreading going to work each day",
      "Feeling unable to face another day's demands",
      "Physical symptoms: headaches, stomach problems, frequent illness",
      "Crying easily or feeling on the edge of tears",
      "Emotional numbness \u2014 feeling unable to care about anything",
    ],
  },
  {
    dimension: "Depersonalisation / Cynicism",
    colour: "amber",
    borderClass: "border-amber-400/30",
    bgClass: "bg-amber-400/10",
    textClass: "text-amber-400",
    icon: Users,
    description:
      "Developing a detached, cynical, or callous attitude towards work, colleagues, and clients. An emotional distancing as a coping mechanism to protect against further exhaustion.",
    signs: [
      "Treating colleagues or clients as objects rather than people",
      "Cynical comments about the job, the company, or the industry",
      "Withdrawing from team interactions and social events",
      "Loss of empathy \u2014 not caring about others' problems",
      "Increased irritability and short temper with colleagues",
      "Negative or sarcastic attitude that was not there before",
    ],
  },
  {
    dimension: "Reduced Personal Accomplishment / Inefficacy",
    colour: "blue",
    borderClass: "border-blue-400/30",
    bgClass: "bg-blue-400/10",
    textClass: "text-blue-400",
    icon: TrendingUp,
    description:
      "A growing sense of incompetence and lack of achievement. Feeling that nothing you do makes a difference. Doubting your own abilities and the value of your work.",
    signs: [
      "Feeling that your work no longer has meaning or purpose",
      "Believing you are not making a difference",
      "Doubting your professional competence despite evidence",
      "Reduced productivity and declining quality of work",
      "Avoiding challenging tasks you previously handled well",
      "Feeling trapped \u2014 unable to see a way forward",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  HSE Management Standards data                                      */
/* ------------------------------------------------------------------ */
const managementStandards = [
  {
    standard: "Demands",
    description:
      "Workload, work patterns, and the working environment. Includes issues such as hours of work, shift patterns, and the volume and pace of tasks.",
    example:
      "An electrician is given unrealistic deadlines for a rewire, working 12-hour days 6 days a week with no time for breaks.",
  },
  {
    standard: "Control",
    description:
      "How much say a person has in the way they do their work. Includes autonomy, decision-making, skill use, and initiative.",
    example:
      "A site electrician is micro-managed with no input into how tasks are sequenced, despite 15 years of experience.",
  },
  {
    standard: "Support",
    description:
      "The encouragement, sponsorship, and resources provided by the organisation, line management, and colleagues.",
    example:
      "A new apprentice is left to work alone without supervision, guidance, or regular check-ins from their mentor.",
  },
  {
    standard: "Relationships",
    description:
      "Promoting positive working to avoid conflict and dealing with unacceptable behaviour. Includes bullying and harassment.",
    example:
      "A worker is subjected to constant mockery and exclusion by a clique on site, but management dismisses it as \u2018banter\u2019.",
  },
  {
    standard: "Role",
    description:
      "Whether people understand their role within the organisation and whether the organisation ensures they do not have conflicting roles.",
    example:
      "An electrician is told to supervise other trades while also completing their own installation work, with no clarity on priorities.",
  },
  {
    standard: "Change",
    description:
      "How organisational change (large or small) is managed and communicated. Includes consultation and engagement during periods of change.",
    example:
      "A company restructures with no consultation, and workers learn about redundancies through rumours rather than official communication.",
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
const MentalHealthModule2Section3 = () => {
  useSEO({
    title:
      "Stress & Burnout | Mental Health Module 2 Section 3",
    description:
      "Understanding workplace stress, acute vs chronic stress, the Maslach Burnout Model, stress in construction, HSE stress risk assessment and Management Standards, and recognising stress in yourself and others.",
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* -- Header ------------------------------------------------- */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* -- Main Content ------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <Flame className="h-8 w-8 text-purple-400" />
          </div>
          <div>
            <span className="inline-block bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
              MODULE 2 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Stress &amp; Burnout
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Understanding workplace stress, the difference between pressure and
            harm, the science of chronic stress, the Maslach Burnout Model, and
            how to recognise and assess stress using HSE frameworks
          </p>
        </div>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
            <Brain className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm mb-1">
              Understand Stress
            </h3>
            <p className="text-white/70 text-xs">
              HSE definition, the stress process, and the critical difference
              between motivating pressure and harmful stress
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
            <Flame className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm mb-1">
              Recognise Burnout
            </h3>
            <p className="text-white/70 text-xs">
              The three dimensions of burnout and how chronic, unmanaged stress
              progresses to complete disengagement
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
            <Shield className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm mb-1">
              Assess &amp; Manage
            </h3>
            <p className="text-white/70 text-xs">
              Apply the HSE Management Standards and recognise physical,
              emotional, behavioural, and cognitive signs of stress
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-purple-500/30 rounded-lg p-4 sm:p-6 mb-10">
          <h2 className="text-lg font-semibold text-purple-300 mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Learning Outcomes
          </h2>
          <p className="text-white/60 text-sm mb-3">
            By the end of this section you will be able to:
          </p>
          <ul className="space-y-2 text-sm text-white">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
              <span>
                Define workplace stress using the HSE definition and explain
                the difference between pressure and stress
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
              <span>
                Distinguish between acute and chronic stress and explain how
                prolonged cortisol exposure damages health
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
              <span>
                Describe the three dimensions of the Maslach Burnout Model and
                identify signs of each
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
              <span>
                Identify construction-specific stressors and explain why the
                industry has elevated rates of work-related stress
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
              <span>
                List and explain the six HSE Management Standards for
                work-related stress
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
              <span>
                Recognise physical, emotional, behavioural, and cognitive signs
                of stress in yourself and others
              </span>
            </li>
          </ul>
        </div>

        {/* -------------------------------------------------------- */}
        {/* SECTION 01 \u2014 Understanding Workplace Stress            */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[0]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[0]} text-sm font-normal`}>01</span>
              Understanding Workplace Stress
            </h2>

            <div className="space-y-4 text-white">
              <p>
                The Health and Safety Executive (HSE) defines work-related
                stress as{" "}
                <strong>
                  &ldquo;the adverse reaction people have to excessive
                  pressures or other types of demand placed upon them.&rdquo;
                </strong>{" "}
                This definition is important because it makes clear that stress
                is a <em>reaction</em> &mdash; it is the body and mind&rsquo;s
                response to demands, not the demands themselves.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">
                  Key Principle
                </h3>
                <p className="text-white/80 text-sm">
                  Stress is <strong>not an illness</strong>, but prolonged or
                  severe stress can lead to both physical and mental illness. It
                  is the body&rsquo;s alarm system telling you that the demands
                  being placed upon you are exceeding your ability to cope. Left
                  unmanaged, it becomes a pathway to serious health conditions
                  including cardiovascular disease, depression, and anxiety
                  disorders.
                </p>
              </div>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[0]} font-medium mb-3`}>
                  Pressure vs Stress
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Understanding the difference between pressure and stress is
                  fundamental to managing workplace wellbeing:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      <h4 className="text-green-300 font-semibold text-sm">
                        Pressure (Motivating)
                      </h4>
                    </div>
                    <ul className="text-white/80 text-xs space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                        <span>Proportionate to abilities and resources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                        <span>Energising and motivating</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                        <span>Sharpens focus and concentration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                        <span>Improves performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                        <span>Feels manageable and time-limited</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <h4 className="text-red-300 font-semibold text-sm">
                        Stress (Harmful)
                      </h4>
                    </div>
                    <ul className="text-white/80 text-xs space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                        <span>Exceeds perceived ability to cope</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                        <span>Draining and exhausting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                        <span>Impairs concentration and decision-making</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                        <span>Reduces performance and increases errors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                        <span>
                          Feels overwhelming, uncontrollable, and relentless
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-2">
                  Stress as a Process, Not an Event
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  Stress is not a single moment &mdash; it is a dynamic process
                  that unfolds over time. It involves a continuous interaction
                  between the demands placed on a person and their perception
                  of their ability to meet those demands. This is why two people
                  in the same role can respond very differently to the same
                  workload: their resources, support systems, coping strategies,
                  and personal circumstances all affect the equation.
                </p>
                <p className="text-white/80 text-sm">
                  Recognising stress as a process means understanding that early
                  intervention is possible. If you can identify the warning
                  signs before a person reaches crisis point, you can adjust
                  demands, increase support, or improve coping resources to
                  prevent escalation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 02 \u2014 Acute vs Chronic Stress                   */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[1]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[1]} text-sm font-normal`}>02</span>
              Acute vs Chronic Stress
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Understanding the difference between acute and chronic stress
                is essential because they have very different causes, durations,
                and health consequences. Both involve the same physiological
                stress response, but the timeline and cumulative impact differ
                dramatically.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-violet-500/10 border border-violet-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-violet-400" />
                    <h4 className="text-violet-300 font-semibold text-sm">
                      Acute Stress
                    </h4>
                  </div>
                  <p className="text-white/80 text-xs mb-3">
                    Short-term stress triggered by a specific event or
                    situation. The body activates its &ldquo;fight or
                    flight&rdquo; response, then returns to normal once the
                    threat passes.
                  </p>
                  <ul className="text-white/70 text-xs space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                      <span>Specific, identifiable trigger</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                      <span>Short duration (minutes to hours)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                      <span>Body recovers afterwards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                      <span>
                        Examples: near-miss on site, client confrontation,
                        inspection deadline
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-red-400" />
                    <h4 className="text-red-300 font-semibold text-sm">
                      Chronic Stress
                    </h4>
                  </div>
                  <p className="text-white/80 text-xs mb-3">
                    Long-term, ongoing stress where the body&rsquo;s stress
                    response is constantly activated. There is no recovery
                    period. The cumulative effect causes progressive damage.
                  </p>
                  <ul className="text-white/70 text-xs space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      <span>Multiple or ongoing stressors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      <span>Weeks, months, or years in duration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      <span>Body never fully recovers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      <span>
                        Examples: ongoing job insecurity, persistent bullying,
                        unmanageable workload over months
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-violet-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[1]} font-medium mb-3`}>
                  The Stress Response: Cortisol &amp; Adrenaline
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  When the brain perceives a threat, the hypothalamic-pituitary-adrenal
                  (HPA) axis activates, releasing two key hormones:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <h4 className="text-violet-300 font-semibold text-sm mb-1">
                      Adrenaline (Epinephrine)
                    </h4>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Released immediately. Increases heart rate, blood
                      pressure, and breathing rate. Diverts blood to muscles.
                      Sharpens senses. Prepares the body for &ldquo;fight or
                      flight.&rdquo; Effects are short-lived and subside once
                      the threat passes.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                    <h4 className="text-violet-300 font-semibold text-sm mb-1">
                      Cortisol
                    </h4>
                    <p className="text-white/70 text-xs leading-relaxed">
                      Released more slowly, lasts longer. Maintains elevated
                      blood sugar for energy. Suppresses non-essential functions
                      (immune system, digestion, reproduction). In chronic
                      stress, cortisol remains permanently elevated, causing
                      progressive damage to multiple body systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    How Chronic Stress Damages Health
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  {[
                    {
                      system: "Cardiovascular",
                      effect:
                        "Elevated blood pressure, increased cholesterol, higher risk of heart attack and stroke",
                    },
                    {
                      system: "Immune",
                      effect:
                        "Suppressed immune function, frequent infections, slower wound healing, increased inflammation",
                    },
                    {
                      system: "Digestive",
                      effect:
                        "IBS, acid reflux, stomach ulcers, changes in appetite, weight gain (particularly visceral fat)",
                    },
                    {
                      system: "Mental Health",
                      effect:
                        "Anxiety disorders, depression, insomnia, cognitive impairment, increased risk of substance misuse",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <h4 className="text-red-300 font-semibold text-xs mb-1">
                        {item.system} System
                      </h4>
                      <p className="text-white/70 text-xs leading-relaxed">
                        {item.effect}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 03 \u2014 The Maslach Burnout Model                 */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[2]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[2]} text-sm font-normal`}>03</span>
              The Maslach Burnout Model
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Burnout is the end-stage of chronic, unmanaged workplace stress.
                The most widely used and researched framework for understanding
                burnout is the <strong>Maslach Burnout Inventory (MBI)</strong>,
                developed by Christina Maslach and Susan Jackson in 1981. It
                identifies three interconnected dimensions that, together,
                define the burnout syndrome.
              </p>

              {/* ---- Maslach Burnout Model Diagram ---- */}
              <div className="bg-white/5 border border-purple-400/30 rounded-lg p-4 sm:p-6">
                <h3 className="text-purple-300 font-semibold mb-4 flex items-center gap-2">
                  <Flame className="h-5 w-5" />
                  Maslach Burnout Model &mdash; Three Dimensions
                </h3>

                {/* Visual diagram */}
                <div className="relative mb-6">
                  {/* Central burnout circle */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-violet-500/30 border-2 border-purple-400/50 flex items-center justify-center">
                      <div className="text-center">
                        <Flame className="h-8 w-8 text-purple-400 mx-auto mb-1" />
                        <span className="text-purple-300 font-bold text-sm sm:text-base">
                          BURNOUT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Three dimension arrows and boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {burnoutDimensions.map((dim) => {
                      const Icon = dim.icon;
                      return (
                        <div
                          key={dim.dimension}
                          className="relative"
                        >
                          {/* Arrow connector (visible on sm+) */}
                          <div className="hidden sm:block absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-purple-400/40" />
                          <div
                            className={`${dim.bgClass} border ${dim.borderClass} rounded-lg p-4`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${dim.bgClass} border ${dim.borderClass}`}
                              >
                                <Icon className={`h-4 w-4 ${dim.textClass}`} />
                              </div>
                              <span
                                className={`font-semibold text-xs sm:text-sm ${dim.textClass}`}
                              >
                                {dim.dimension}
                              </span>
                            </div>
                            <p className="text-white/70 text-xs leading-relaxed">
                              {dim.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Flow label */}
                  <div className="mt-4 text-center">
                    <p className="text-white/50 text-xs italic">
                      Chronic unmanaged stress &rarr; Emotional Exhaustion
                      &rarr; Depersonalisation &rarr; Reduced Accomplishment
                      &rarr; Full Burnout
                    </p>
                  </div>
                </div>

                {/* Detailed signs for each dimension */}
                <div className="space-y-4">
                  {burnoutDimensions.map((dim) => (
                    <div
                      key={dim.dimension}
                      className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4"
                    >
                      <h4
                        className={`${dim.textClass} font-semibold text-sm mb-3`}
                      >
                        Signs of {dim.dimension}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {dim.signs.map((sign, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-xs"
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full bg-${dim.colour}-400 mt-1.5 flex-shrink-0`}
                              style={{
                                backgroundColor:
                                  dim.colour === "red"
                                    ? "rgb(248 113 113)"
                                    : dim.colour === "amber"
                                    ? "rgb(251 191 36)"
                                    : "rgb(96 165 250)",
                              }}
                            />
                            <span className="text-white/80">{sign}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-400">
                  Key Insight
                </h3>
                <p className="text-white/80 text-sm">
                  Burnout is not simply &ldquo;being tired.&rdquo; It is a
                  recognised occupational phenomenon included in the{" "}
                  <strong>WHO International Classification of Diseases
                  (ICD-11)</strong> as a syndrome resulting from chronic
                  workplace stress that has not been successfully managed. It
                  develops gradually and often goes unrecognised until the
                  person reaches crisis point. Early recognition of the warning
                  signs in each dimension is essential for prevention.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 04 \u2014 Stress in Construction                    */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[3]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[3]} text-sm font-normal`}>04</span>
              Stress in Construction
            </h2>

            <div className="space-y-4 text-white">
              <p>
                The construction industry has specific characteristics that
                make it a high-risk environment for work-related stress. While
                all industries face stress challenges, construction workers are
                exposed to a unique combination of physical, environmental,
                organisational, and cultural stressors.
              </p>

              <div className="bg-white/5 border border-violet-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[3]} font-medium mb-3`}>
                  Construction-Specific Stressors
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      stressor: "Tight deadlines and programme pressure",
                      detail:
                        "Construction projects run to strict programmes with contractual penalties for delays. Pressure to work faster often compromises safety and quality.",
                    },
                    {
                      stressor: "Adverse weather conditions",
                      detail:
                        "Working outdoors in rain, wind, cold, and heat. Weather can halt progress, increasing programme pressure. Physical discomfort adds to stress.",
                    },
                    {
                      stressor: "Physical demands",
                      detail:
                        "Heavy manual labour, repetitive movements, working at height, confined spaces. Physical exhaustion reduces resilience to psychological stress.",
                    },
                    {
                      stressor: "Job insecurity",
                      detail:
                        "Project-based employment, short-term contracts, self-employment without sick pay or holiday pay. Constant uncertainty about future work.",
                    },
                    {
                      stressor: "Long commutes and travel",
                      detail:
                        "Workers often travel significant distances to sites, adding hours to the working day and reducing time for rest and recovery.",
                    },
                    {
                      stressor: "Time away from family",
                      detail:
                        "Working away from home for weeks at a time. Missing family events, children growing up, relationship strain.",
                    },
                    {
                      stressor: "Macho culture",
                      detail:
                        "Deeply embedded culture that discourages admitting to struggles, seeking help, or showing vulnerability. 'Man up' attitudes silence those who need support most.",
                    },
                    {
                      stressor: "Financial pressures",
                      detail:
                        "Subcontractor payment delays, disputes over variations, gaps between contracts. Financial stress is one of the strongest predictors of mental health crisis.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <h4 className="text-white font-semibold text-sm mb-1">
                        {item.stressor}
                      </h4>
                      <p className="text-white/70 text-xs leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-violet-400">
                  HSE Statistics: Stress in Construction
                </h3>
                <ul className="text-white/80 text-sm space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                    <span>
                      According to HSE data, stress, depression, and anxiety
                      account for a significant proportion of all
                      work-related ill health cases in the construction
                      sector
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                    <span>
                      The construction industry consistently reports high
                      rates of working days lost to stress compared to other
                      sectors
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                    <span>
                      Male construction workers are at{" "}
                      <strong>significantly elevated risk of suicide</strong>{" "}
                      compared to the general male population &mdash; the
                      ONS reports that male construction workers have one of
                      the highest suicide rates of any occupational group in
                      England and Wales
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                    <span>
                      Presenteeism (working while unwell) is widespread in
                      construction, masking the true scale of stress-related
                      illness and reducing productivity further
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Heart className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Breaking the Silence
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  Organisations like{" "}
                  <strong>Mates in Mind</strong>,{" "}
                  <strong>the Lighthouse Construction Industry Charity</strong>,
                  and the{" "}
                  <strong>Construction Industry Helpline (0345 605 1956)</strong>{" "}
                  are working to change the culture around mental health in
                  construction. As a Mental Health First Aider, you can
                  contribute by modelling openness, checking in on colleagues,
                  and challenging stigma when you see it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 05 \u2014 HSE Stress Risk Assessment                */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[4]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[4]} text-sm font-normal`}>05</span>
              HSE Stress Risk Assessment
            </h2>

            <div className="space-y-4 text-white">
              <p>
                The HSE has developed a comprehensive framework for assessing
                and managing work-related stress. At its core are the{" "}
                <strong>six Management Standards</strong> &mdash; areas of work
                design that, if not properly managed, are associated with poor
                health, lower productivity, and increased sickness absence.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className={`${headingColours[4]} font-semibold mb-4`}>
                  The Six Management Standards
                </h3>
                <div className="space-y-4">
                  {managementStandards.map((standard, idx) => (
                    <div
                      key={standard.standard}
                      className="bg-[#1a1a1a] border border-white/10 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-300 text-xs font-mono font-bold">
                            {idx + 1}
                          </span>
                        </div>
                        <h4 className="text-purple-300 font-semibold text-sm">
                          {standard.standard}
                        </h4>
                      </div>
                      <p className="text-white/80 text-sm mb-2">
                        {standard.description}
                      </p>
                      <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-3">
                        <p className="text-white/60 text-xs">
                          <strong className="text-purple-300">
                            Construction example:
                          </strong>{" "}
                          {standard.example}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-violet-400/30 p-4 rounded-lg">
                <h3 className="text-violet-300 font-medium mb-3">
                  Conducting a Stress Risk Assessment
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  The HSE recommends a five-step approach to stress risk
                  assessment, aligned with the general principles of risk
                  assessment:
                </p>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-400/20 border border-violet-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-300 text-xs font-mono font-bold">
                        1
                      </span>
                    </div>
                    <div>
                      <strong>Identify the hazards:</strong> Use the six
                      Management Standards as your framework. Gather data
                      through surveys, focus groups, sickness absence records,
                      and one-to-one conversations
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-400/20 border border-violet-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-300 text-xs font-mono font-bold">
                        2
                      </span>
                    </div>
                    <div>
                      <strong>Decide who might be harmed and how:</strong>{" "}
                      Consider all workers, including those on temporary
                      contracts, agency workers, apprentices, and lone workers.
                      Some groups may be at higher risk
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-400/20 border border-violet-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-300 text-xs font-mono font-bold">
                        3
                      </span>
                    </div>
                    <div>
                      <strong>Evaluate the risks:</strong> Compare your
                      findings against the Management Standards. Are current
                      controls adequate? What more needs to be done?
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-400/20 border border-violet-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-300 text-xs font-mono font-bold">
                        4
                      </span>
                    </div>
                    <div>
                      <strong>Record and implement findings:</strong> Document
                      identified risks and the actions you will take. Assign
                      responsibility and set timescales for implementation
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-400/20 border border-violet-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-violet-300 text-xs font-mono font-bold">
                        5
                      </span>
                    </div>
                    <div>
                      <strong>Review and update regularly:</strong> Stress
                      risks change as projects, teams, and circumstances
                      evolve. Review your assessment at least annually, or
                      whenever significant changes occur
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-purple-500/30 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-2">
                  The HSE Indicator Tool
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  The HSE Indicator Tool is a <strong>35-item
                  questionnaire</strong> that asks employees about their working
                  conditions across the six Management Standards. It is designed
                  to be anonymous and confidential, encouraging honest
                  responses.
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                    <span>
                      Results can be benchmarked against national data to see
                      how your organisation compares
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                    <span>
                      Identifies which of the six standards need the most
                      attention in your workplace
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                    <span>
                      It is an <strong>organisational-level tool</strong>{" "}
                      &mdash; it assesses working conditions, not individual
                      vulnerability
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                    <span>
                      Available free from the HSE website and can be
                      administered online or on paper
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 06 \u2014 Recognising Stress in Yourself & Others   */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[5]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[5]} text-sm font-normal`}>06</span>
              Recognising Stress in Yourself &amp; Others
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Stress manifests across four domains: physical, emotional,
                behavioural, and cognitive. Learning to recognise these signs
                &mdash; in yourself and in the people around you &mdash; is one
                of the most important skills a Mental Health First Aider can
                develop. Early recognition allows early intervention, before
                problems escalate to crisis point.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Physical Signs */}
                <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="h-5 w-5 text-red-400" />
                    <h4 className="text-red-300 font-semibold text-sm">
                      Physical Signs
                    </h4>
                  </div>
                  <ul className="text-white/80 text-xs space-y-2">
                    {[
                      "Persistent headaches and migraines",
                      "Chronic fatigue and exhaustion",
                      "Sleep problems (insomnia, early waking, oversleeping)",
                      "Muscle tension, neck and back pain",
                      "Digestive problems (stomach aches, IBS, nausea)",
                      "Frequent colds and infections",
                      "Chest tightness or palpitations",
                      "Changes in appetite (eating more or less)",
                    ].map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Emotional Signs */}
                <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-5 w-5 text-amber-400" />
                    <h4 className="text-amber-300 font-semibold text-sm">
                      Emotional Signs
                    </h4>
                  </div>
                  <ul className="text-white/80 text-xs space-y-2">
                    {[
                      "Irritability and short temper",
                      "Anxiety and constant worry",
                      "Low mood and feelings of hopelessness",
                      "Feeling overwhelmed and unable to cope",
                      "Loss of motivation and interest",
                      "Tearfulness or emotional outbursts",
                      "Feelings of inadequacy and low self-esteem",
                      "Sense of dread about the future",
                    ].map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Behavioural Signs */}
                <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-purple-400" />
                    <h4 className="text-purple-300 font-semibold text-sm">
                      Behavioural Signs
                    </h4>
                  </div>
                  <ul className="text-white/80 text-xs space-y-2">
                    {[
                      "Withdrawal from colleagues and social activities",
                      "Increased alcohol, tobacco, or substance use",
                      "Decline in work performance and quality",
                      "More accidents, near-misses, and errors",
                      "Increased sickness absence or lateness",
                      "Neglecting personal hygiene or appearance",
                      "Aggressive or confrontational behaviour",
                      "Inability to relax or switch off from work",
                    ].map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cognitive Signs */}
                <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="h-5 w-5 text-blue-400" />
                    <h4 className="text-blue-300 font-semibold text-sm">
                      Cognitive Signs
                    </h4>
                  </div>
                  <ul className="text-white/80 text-xs space-y-2">
                    {[
                      "Poor concentration and forgetfulness",
                      "Difficulty making decisions (indecisiveness)",
                      "Racing thoughts or inability to switch off",
                      "Negative or catastrophic thinking patterns",
                      "Reduced ability to problem-solve",
                      "Mental fog and confusion",
                      "Constant worrying and rumination",
                      "Difficulty learning new information",
                    ].map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-violet-400">
                  Recognising Stress in Others on Site
                </h3>
                <p className="text-white/80 text-sm mb-3">
                  As a Mental Health First Aider, you should be alert to
                  <strong> changes in behaviour</strong> rather than
                  single symptoms. It is the pattern of change that matters:
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Look for change:</strong> A previously
                      punctual worker arriving late. A sociable person
                      becoming withdrawn. A careful electrician making
                      unusual mistakes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Notice clusters:</strong> One bad day is
                      normal. Multiple signs across different domains
                      (physical + behavioural + emotional) sustained over
                      weeks is a warning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Trust your instinct:</strong> If someone
                      &ldquo;doesn&rsquo;t seem right,&rdquo; they probably
                      aren&rsquo;t. A gentle, private conversation can make
                      all the difference
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Safety-Critical Warning
                  </h3>
                </div>
                <p className="text-white/80 text-sm">
                  In construction, stress does not just affect wellbeing
                  &mdash; it affects <strong>safety</strong>. A stressed
                  worker with poor concentration, impaired decision-making,
                  and fatigue is more likely to have an accident, make a
                  wiring error, or fail to follow safety procedures. The HSE
                  recognises that work-related stress is a contributing
                  factor in many workplace incidents. Managing stress is
                  therefore not just a welfare issue &mdash; it is a{" "}
                  <strong>safety-critical issue</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* -------------------------------------------------------- */}
        {/* FAQs                                                      */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-purple-400/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Quiz                                                      */}
        {/* -------------------------------------------------------- */}
        <div className="mt-12">
          <Quiz
            title="Stress & Burnout Quiz"
            questions={quizQuestions}
          />
        </div>

        {/* -------------------------------------------------------- */}
        {/* Navigation                                                */}
        {/* -------------------------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-2-section-4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default MentalHealthModule2Section3;
