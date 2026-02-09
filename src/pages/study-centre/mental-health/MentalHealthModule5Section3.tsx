import {
  ArrowLeft,
  Heart,
  CheckCircle,
  Users,
  Activity,
  Eye,
  BookOpen,
  HandHeart,
  FileText,
  MessageSquare,
  Megaphone,
  Clock,
  Brain,
  Apple,
  Moon,
  Dumbbell,
  Shield,
  Scale,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "five-ways-wellbeing",
    question:
      "The New Economics Foundation's Five Ways to Wellbeing are Connect, Be Active, Take Notice, Keep Learning, and Give. A site manager starts a weekly 'skills swap' lunchtime session where electricians teach each other new techniques. Which of the Five Ways does this BEST represent?",
    options: [
      "Connect — because the team is socialising together",
      "Be Active — because they are doing something during their break",
      "Keep Learning — because they are developing new skills and satisfying curiosity",
      "Give — because they are volunteering their knowledge to help others",
    ],
    correctIndex: 2,
    explanation:
      "While a skills swap session involves elements of Connect (social interaction) and Give (sharing knowledge), it BEST represents Keep Learning. The core purpose is developing new skills and satisfying curiosity — both of which are central to the Keep Learning pillar. The New Economics Foundation's research shows that continued learning throughout life enhances self-esteem, encourages social interaction, and promotes a more active life. Workplace initiatives that foster learning also improve engagement and job satisfaction.",
  },
  {
    id: "mental-health-policy",
    question:
      "Your employer is developing a workplace mental health policy. Which of the following is the LEAST appropriate element to include?",
    options: [
      "A commitment statement from senior leadership supporting mental health at work",
      "Details of disciplinary consequences for employees who take time off for mental health conditions",
      "Information about available support such as EAP, occupational health, and mental health first aiders",
      "A clear confidentiality statement explaining how disclosures will be handled",
    ],
    correctIndex: 1,
    explanation:
      "A mental health policy should NEVER include punitive or disciplinary measures for employees experiencing mental health difficulties. This would be discriminatory and potentially unlawful under the Equality Act 2010, as many mental health conditions qualify as disabilities under the Act. A good policy should include a commitment statement, roles and responsibilities, details of support available, confidentiality assurances, return-to-work procedures, and reasonable adjustment processes. The purpose of a mental health policy is to create a supportive environment, not a punitive one.",
  },
  {
    id: "presenteeism-cost",
    question:
      "Research suggests that presenteeism (working while unwell) costs UK employers significantly more than absenteeism. Why is presenteeism considered MORE costly than absenteeism?",
    options: [
      "Because employees who are present but unwell are paid more than absent employees",
      "Because presenteeism is easier to measure and track than absenteeism",
      "Because employees working while unwell have reduced productivity, make more errors, are at greater risk of accidents, and may worsen their condition leading to longer-term absence",
      "Because the Equality Act 2010 requires employers to pay double wages to employees with mental health conditions",
    ],
    correctIndex: 2,
    explanation:
      "Presenteeism is estimated to cost UK employers between 1.5 and 2 times more than absenteeism. When employees work while unwell — whether physically or mentally — their productivity is significantly reduced, they make more mistakes, they are at higher risk of workplace accidents (particularly dangerous on construction sites), and they may worsen their condition, ultimately leading to longer-term absence. Unlike absenteeism, presenteeism is harder to measure because the employee is physically present, making it an invisible but substantial cost to organisations.",
  },
];

const faqs = [
  {
    question:
      "How do I raise mental health in a toolbox talk without people switching off or getting uncomfortable?",
    answer:
      "Start with facts and statistics relevant to the trade — for example, construction workers are three times more likely to die by suicide than the national average. Use real (anonymised) examples where possible. Keep it short (10-15 minutes maximum), use plain language, and avoid clinical jargon. Frame mental health as a safety issue, not a personal weakness. Provide practical takeaways — for example, the signs to look out for in a mate, and what to say if you're worried about someone. Having a senior figure or respected team member lead the talk can help normalise the conversation. The key is to make it feel like a normal part of the safety briefing, not a separate 'special' event.",
  },
  {
    question:
      "What reasonable adjustments can an employer make for someone with a mental health condition?",
    answer:
      "Under the Equality Act 2010, employers have a legal duty to make reasonable adjustments for employees with disabilities, which includes many mental health conditions. Examples include: flexible working hours (allowing someone to start later if medication causes morning drowsiness), phased return to work after absence, temporary reallocation of duties that are particularly stressful, provision of a quiet space for breaks, regular check-ins with a line manager, time off for therapy appointments, adjustments to workload during periods of difficulty, and changes to the physical working environment (such as reducing noise or providing a more predictable work pattern). What is 'reasonable' depends on the size and resources of the employer, but the duty applies to all employers regardless of size.",
  },
  {
    question:
      "Is it true that exercise is as effective as antidepressants for mild to moderate depression?",
    answer:
      "There is strong evidence that regular physical activity is effective in treating mild to moderate depression, and some studies have shown effects comparable to antidepressant medication. NICE (National Institute for Health and Care Excellence) recommends structured exercise programmes as a treatment option for mild to moderate depression. The evidence suggests that 30-45 minutes of moderate-intensity exercise, three to five times per week, can produce significant improvements in mood and wellbeing. However, this does not mean that exercise should replace medication for everyone — treatment should be individualised, and many people benefit from a combination of medication, therapy, and lifestyle changes including exercise. The important message for workplace health is that supporting employees to be physically active has clear mental health benefits.",
  },
  {
    question:
      "What is the difference between a Mental Health First Aider and an Employee Assistance Programme (EAP)?",
    answer:
      "A Mental Health First Aider (MHFA) is a trained colleague in the workplace who can recognise the signs of mental health difficulties, provide initial support, and guide a person towards appropriate professional help. They are not therapists or counsellors — their role is analogous to a physical first aider who stabilises a casualty before professional help arrives. An Employee Assistance Programme (EAP) is a confidential service, usually provided by an external organisation, that offers free counselling, advice, and support to employees on a range of issues including mental health, financial worries, relationship difficulties, and legal concerns. EAP services are typically accessed by telephone or online and are available 24/7. The two complement each other: an MHFA can signpost a colleague to the EAP, and the EAP provides the professional support that is beyond the MHFA's scope.",
  },
  {
    question:
      "How can small electrical contractors implement mental health support with limited resources?",
    answer:
      "Small businesses can take meaningful steps without large budgets. Start with awareness: train at least one person as a Mental Health First Aider (two-day course, typically around 300 pounds). Create a simple mental health policy — templates are available free from MHFA England and Mind. Promote free resources: the Samaritans (116 123), Shout text service (text SHOUT to 85258), and the Mates in Mind helpline. Normalise conversations by raising mental health in regular toolbox talks. Consider joining industry initiatives such as Mates in Mind or the Lighthouse Construction Industry Charity, which provide free resources tailored to construction. Even simple gestures — regular check-ins, flexible working when possible, and a culture where it is acceptable to say 'I'm struggling' — can make a significant difference.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT one of the New Economics Foundation's Five Ways to Wellbeing?",
    options: [
      "Connect — maintain social relationships",
      "Be Active — engage in physical activity",
      "Compete — strive to outperform colleagues",
      "Take Notice — practise mindfulness and awareness",
    ],
    correctAnswer: 2,
    explanation:
      "The Five Ways to Wellbeing are Connect, Be Active, Take Notice, Keep Learning, and Give. 'Compete' is not one of the five ways. The framework is based on evidence of what promotes individual wellbeing and is designed to be accessible to everyone. Competition and comparison with others can actually be detrimental to mental health, whereas the five evidence-based actions focus on positive engagement with life and others.",
  },
  {
    id: 2,
    question:
      "A workplace mental health policy should include all of the following EXCEPT:",
    options: [
      "A commitment statement from senior leadership",
      "Details of support available including EAP and occupational health",
      "A requirement for employees to disclose all mental health diagnoses to their line manager",
      "A confidentiality statement explaining how disclosures will be handled",
    ],
    correctAnswer: 2,
    explanation:
      "A mental health policy should NEVER require employees to disclose mental health diagnoses. Disclosure must always be voluntary and handled with strict confidentiality. Requiring disclosure would be a breach of data protection law and could discourage people from seeking help. A good policy creates an environment where people feel safe to disclose if they choose to, but it must never be mandatory. The policy should include a commitment statement, roles and responsibilities, available support, confidentiality procedures, return-to-work guidance, and reasonable adjustment processes.",
  },
  {
    id: 3,
    question:
      "What is the most effective way to introduce mental health topics into toolbox talks in a male-dominated construction environment?",
    options: [
      "Use clinical language and medical terminology to demonstrate expertise",
      "Frame mental health as a safety issue, use trade-relevant statistics, keep it short and practical, and have respected team members lead the discussion",
      "Make attendance at mental health toolbox talks voluntary so that only interested workers attend",
      "Focus exclusively on severe mental illness such as schizophrenia and bipolar disorder",
    ],
    correctAnswer: 1,
    explanation:
      "In male-dominated environments like construction, framing mental health as a safety issue (not a personal weakness) is most effective. Using trade-relevant statistics (such as the fact that construction workers are three times more likely to die by suicide than the national average) makes the topic directly relevant. Keeping talks short and practical (10-15 minutes), using plain language rather than clinical jargon, and having respected senior figures or team members lead the discussion all help to normalise the conversation and overcome resistance.",
  },
  {
    id: 4,
    question:
      "Under the Equality Act 2010, which of the following statements about reasonable adjustments for mental health conditions is correct?",
    options: [
      "Reasonable adjustments only apply to physical disabilities, not mental health conditions",
      "Employers must make reasonable adjustments for employees whose mental health condition has a substantial and long-term adverse effect on their ability to carry out normal day-to-day activities",
      "Reasonable adjustments only apply to employers with more than 50 employees",
      "Employees must have been formally diagnosed by a psychiatrist before reasonable adjustments apply",
    ],
    correctAnswer: 1,
    explanation:
      "Under the Equality Act 2010, a disability is defined as a physical or mental impairment that has a substantial and long-term (12 months or more) adverse effect on a person's ability to carry out normal day-to-day activities. This includes many mental health conditions such as depression, anxiety, PTSD, and bipolar disorder. The duty to make reasonable adjustments applies to ALL employers regardless of size. A formal psychiatric diagnosis is not required — what matters is the effect of the condition on the person's daily activities.",
  },
  {
    id: 5,
    question:
      "Presenteeism is estimated to cost UK employers approximately how much more than absenteeism?",
    options: [
      "About the same amount",
      "1.5 to 2 times more",
      "5 to 10 times more",
      "Presenteeism has no measurable cost",
    ],
    correctAnswer: 1,
    explanation:
      "Research consistently estimates that presenteeism costs UK employers between 1.5 and 2 times more than absenteeism. The Centre for Mental Health estimated that presenteeism costs UK employers approximately 21.2 billion pounds per year, compared to 10.6 billion pounds for absenteeism. Presenteeism is harder to identify because the employee is physically present, but their reduced productivity, increased error rate, and risk of worsening their condition make it a significant hidden cost to organisations.",
  },
  {
    id: 6,
    question:
      "According to NICE guidelines, what level of exercise has been shown to be effective in treating mild to moderate depression?",
    options: [
      "10 minutes of gentle stretching once a week",
      "30 to 45 minutes of moderate-intensity exercise, three to five times per week",
      "Two hours of intense exercise every day",
      "Exercise has no evidence base for treating depression",
    ],
    correctAnswer: 1,
    explanation:
      "NICE recommends structured exercise programmes as a treatment option for mild to moderate depression. The evidence suggests that 30 to 45 minutes of moderate-intensity exercise (such as brisk walking, cycling, or swimming), three to five times per week, can produce significant improvements in mood and wellbeing. Exercise triggers the release of endorphins, reduces cortisol levels, improves sleep quality, and provides a sense of achievement — all of which contribute to better mental health.",
  },
  {
    id: 7,
    question:
      "Which of the following BEST describes the role of a Mental Health First Aider in the workplace?",
    options: [
      "To diagnose mental health conditions and prescribe treatment",
      "To provide ongoing counselling and therapy to colleagues",
      "To recognise the signs of mental health difficulties, provide initial support, and guide the person towards appropriate professional help",
      "To report employees with mental health problems to management for disciplinary action",
    ],
    correctAnswer: 2,
    explanation:
      "A Mental Health First Aider's role is to recognise the signs and symptoms of common mental health conditions, provide initial non-judgemental support (listening, reassuring, and offering practical help), and guide the person towards appropriate professional help (such as their GP, the EAP, or specialist services). They are NOT counsellors, therapists, or diagnosticians. Their role is analogous to a physical first aider who stabilises a casualty and calls for professional help — they provide first-line support, not ongoing treatment.",
  },
  {
    id: 8,
    question:
      "Which workplace initiative BEST demonstrates the 'whole-person approach' to employee wellbeing?",
    options: [
      "Providing a gym membership discount to all employees",
      "A comprehensive programme that addresses physical health (exercise, nutrition, sleep), mental health support (EAP, MHFA), social connection (team activities), and work-life balance (flexible working)",
      "Sending all employees on a one-day stress management course",
      "Putting up mental health awareness posters in the canteen",
    ],
    correctAnswer: 1,
    explanation:
      "The whole-person approach recognises that physical health, mental health, social connection, and work-life balance are all interconnected. A comprehensive wellbeing programme addresses all of these areas rather than treating them in isolation. While individual initiatives (gym access, training courses, posters) can each be helpful, a truly effective approach combines physical health support, mental health resources, social connection opportunities, and flexible working arrangements into a joined-up strategy.",
  },
];

export default function MentalHealthModule5Section3() {
  useSEO({
    title:
      "Building a Mentally Healthy Workplace | Mental Health Module 5.3",
    description:
      "Five Ways to Wellbeing, mental health policy development, toolbox talks, promoting openness, reducing presenteeism, and the physical-mental health connection in the construction industry.",
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
            <Link to="../mental-health-module-5">
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
            <Heart className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building a Mentally Healthy Workplace
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Five Ways to Wellbeing, mental health policy development,
            toolbox talks on mental health, promoting openness, reducing
            presenteeism, and the physical-mental health connection
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
                <strong>Five Ways:</strong> Connect, Be Active, Take
                Notice, Keep Learning, Give
              </li>
              <li>
                <strong>Policy:</strong> Every workplace needs a written
                mental health policy
              </li>
              <li>
                <strong>Toolbox Talks:</strong> Frame mental health as a
                safety issue, not a weakness
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              Key Facts
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Presenteeism:</strong> Costs 1.5&ndash;2x more
                than absenteeism
              </li>
              <li>
                <strong>Exercise:</strong> 30&ndash;45 mins, 3&ndash;5x
                per week improves mood
              </li>
              <li>
                <strong>Equality Act:</strong> Mental health conditions
                can be disabilities
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
              "Explain the New Economics Foundation's Five Ways to Wellbeing and apply them to a workplace setting",
              "Identify the key elements of an effective workplace mental health policy",
              "Describe how to adapt toolbox talks for mental health topics in construction environments",
              "Explain strategies for promoting openness and reducing stigma around mental health at work",
              "Define presenteeism and describe its impact compared to absenteeism",
              "Discuss the evidence base for the connection between physical and mental health",
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

        {/* Section 01: Five Ways to Wellbeing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            Five Ways to Wellbeing
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Five Ways to Wellbeing</strong> is an
                evidence-based framework developed by the{" "}
                <strong>New Economics Foundation (NEF)</strong> as part of
                the UK Government&rsquo;s Foresight Project on Mental
                Capital and Wellbeing. It identifies five simple,
                evidence-based actions that individuals can take every day
                to improve their mental wellbeing. When adopted at a
                workplace level, these five actions form the foundation of
                a mentally healthy work environment.
              </p>

              {/* Five Ways Diagram */}
              <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-lg overflow-hidden">
                <div className="bg-purple-500/15 px-4 py-3 border-b border-purple-500/20">
                  <p className="text-base font-semibold text-purple-400 text-center">
                    The Five Ways to Wellbeing
                  </p>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="grid sm:grid-cols-5 gap-3">
                    {[
                      {
                        icon: Users,
                        label: "Connect",
                        colour: "text-blue-400",
                        bg: "bg-blue-500/10",
                        border: "border-blue-500/30",
                        desc: "Social relationships",
                      },
                      {
                        icon: Activity,
                        label: "Be Active",
                        colour: "text-green-400",
                        bg: "bg-green-500/10",
                        border: "border-green-500/30",
                        desc: "Physical activity",
                      },
                      {
                        icon: Eye,
                        label: "Take Notice",
                        colour: "text-amber-400",
                        bg: "bg-amber-500/10",
                        border: "border-amber-500/30",
                        desc: "Mindfulness & awareness",
                      },
                      {
                        icon: BookOpen,
                        label: "Keep Learning",
                        colour: "text-violet-400",
                        bg: "bg-violet-500/10",
                        border: "border-violet-500/30",
                        desc: "New skills & curiosity",
                      },
                      {
                        icon: HandHeart,
                        label: "Give",
                        colour: "text-rose-400",
                        bg: "bg-rose-500/10",
                        border: "border-rose-500/30",
                        desc: "Helping others",
                      },
                    ].map((way) => (
                      <div
                        key={way.label}
                        className={`${way.bg} border ${way.border} p-3 rounded-lg text-center flex flex-col items-center gap-2`}
                      >
                        <div className={`${way.bg} p-2 rounded-full`}>
                          <way.icon className={`h-6 w-6 ${way.colour}`} />
                        </div>
                        <p className={`text-sm font-semibold ${way.colour}`}>
                          {way.label}
                        </p>
                        <p className="text-xs text-white/60">{way.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed breakdown of each Way */}
              <div className="space-y-3">
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">
                      1. Connect &mdash; Build Social Relationships
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Strong social connections are one of the most important
                    protective factors for mental health. Feeling connected
                    to others reduces feelings of isolation and provides a
                    support network during difficult times.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1.5">
                      Workplace Examples:
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      {[
                        "Team lunches and informal breaks together on site",
                        "Buddy systems for new starters and apprentices",
                        "Regular team meetings that include time for non-work conversation",
                        "Social events (site barbecues, charity fundraisers, sports teams)",
                        "Mentoring programmes pairing experienced and junior workers",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">
                      2. Be Active &mdash; Engage in Physical Activity
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Regular physical activity is strongly linked to improved
                    mental health. Exercise releases endorphins, reduces
                    cortisol, improves sleep quality, and provides a sense
                    of achievement. Even small amounts of physical activity
                    can make a measurable difference.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1.5">
                      Workplace Examples:
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      {[
                        "Walking meetings instead of sitting in a site cabin",
                        "Encouraging active commuting (cycling, walking to site)",
                        "Lunchtime walking groups or on-site stretching sessions",
                        "Subsidised gym memberships or access to workplace fitness facilities",
                        "Five-minute morning stretch routines before work begins",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">
                      3. Take Notice &mdash; Practise Mindfulness and Awareness
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Taking notice means being aware of the world around you,
                    savouring the moment, and reflecting on your experiences.
                    It is closely linked to mindfulness &mdash; paying
                    attention to the present moment without judgement.
                    Research shows this can improve mental wellbeing and help
                    people respond more effectively to stress.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1.5">
                      Workplace Examples:
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      {[
                        "Encouraging workers to take proper breaks rather than eating at their workstation",
                        "Brief end-of-day reflections — 'What went well today?'",
                        "Recognising and celebrating team achievements, however small",
                        "Encouraging workers to notice changes in their own mood and energy levels",
                        "Promoting awareness of the natural environment around the site",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      4. Keep Learning &mdash; Develop New Skills and Curiosity
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Continued learning throughout life enhances self-esteem,
                    encourages social interaction, and promotes a more active
                    and engaged life. It does not have to be formal education
                    &mdash; learning a new skill, taking on a new challenge,
                    or simply reading about a topic of interest all count.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1.5">
                      Workplace Examples:
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      {[
                        "Skills swap sessions where team members teach each other new techniques",
                        "Support for professional development and qualifications (e.g., 18th Edition, AM2)",
                        "Cross-training in different trades or specialisms",
                        "Encouraging apprentices and providing meaningful learning opportunities",
                        "Toolbox talks on new products, regulations, or industry developments",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HandHeart className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      5. Give &mdash; Help Others and Volunteer
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Acts of giving &mdash; whether time, effort, words of
                    encouragement, or practical help &mdash; are strongly
                    linked to improved mental wellbeing for the giver as
                    well as the receiver. Helping others creates a sense of
                    purpose and connection.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-white mb-1.5">
                      Workplace Examples:
                    </p>
                    <ul className="text-xs text-white/70 space-y-1">
                      {[
                        "Mentoring apprentices and new starters — sharing knowledge and experience",
                        "Team charity events (sponsored walks, Movember, construction industry fundraisers)",
                        "Volunteering for community projects as a team",
                        "Simply thanking colleagues and acknowledging good work",
                        "Offering to help a struggling colleague with their workload",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Why It Works:
                  </strong>{" "}
                  The Five Ways to Wellbeing are based on robust evidence
                  from across the behavioural sciences. Each of the five
                  actions has been shown to improve subjective wellbeing
                  independently. When combined, they create a powerful
                  framework for building and maintaining good mental health.
                  Importantly, they are free, accessible, and can be
                  practised by anyone, regardless of their starting point.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Mental Health Policy Development */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            Mental Health Policy Development
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every workplace should have a written{" "}
                <strong>mental health policy</strong>. Just as organisations
                have policies for physical health and safety, a mental
                health policy sets out the organisation&rsquo;s commitment
                to supporting the mental wellbeing of its employees. It
                provides a framework for prevention, early intervention,
                and support, and ensures consistency in how mental health
                issues are handled across the organisation.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Why Every Workplace Needs a Mental Health Policy
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    "Demonstrates organisational commitment to employee mental health — not just words, but a documented standard",
                    "Provides a clear framework for managers and employees to follow when mental health issues arise",
                    "Helps meet legal obligations under the Health and Safety at Work Act 1974 and the Equality Act 2010",
                    "Reduces stigma by making mental health a formal, acknowledged part of workplace health and safety",
                    "Improves recruitment and retention — employees increasingly value employers who take mental health seriously",
                    "Provides consistency in how mental health disclosures, reasonable adjustments, and return-to-work processes are handled",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Include */}
              <div className="bg-white/5 border-2 border-purple-500/30 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 px-4 py-3 border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <p className="text-base font-semibold text-purple-400">
                      Key Elements of a Mental Health Policy
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    {
                      title: "Commitment Statement",
                      text: "A clear statement from senior leadership committing the organisation to supporting mental health at work. This sets the tone from the top and signals that mental health is a priority.",
                      colour: "text-purple-400",
                      bg: "bg-purple-500/10",
                      border: "border-purple-500/30",
                    },
                    {
                      title: "Roles and Responsibilities",
                      text: "Who is responsible for what — senior management, line managers, HR, occupational health, Mental Health First Aiders, and employees themselves. Clear accountability ensures the policy is implemented, not just written.",
                      colour: "text-blue-400",
                      bg: "bg-blue-500/10",
                      border: "border-blue-500/30",
                    },
                    {
                      title: "Support Available",
                      text: "Details of all support mechanisms: Employee Assistance Programme (EAP), occupational health referrals, Mental Health First Aiders, GP referral pathways, external helplines (Samaritans, Shout, Mind), and any in-house counselling.",
                      colour: "text-green-400",
                      bg: "bg-green-500/10",
                      border: "border-green-500/30",
                    },
                    {
                      title: "Confidentiality",
                      text: "A clear statement on how mental health disclosures will be handled. Employees must know that disclosing a mental health condition will be treated with the same confidentiality as any other health matter, and will not be shared without consent (except where there is an immediate risk to safety).",
                      colour: "text-amber-400",
                      bg: "bg-amber-500/10",
                      border: "border-amber-500/30",
                    },
                    {
                      title: "Return to Work",
                      text: "Procedures for supporting employees returning to work after mental health-related absence. This should include phased returns, regular check-ins, workload adjustments, and a named point of contact.",
                      colour: "text-teal-400",
                      bg: "bg-teal-500/10",
                      border: "border-teal-500/30",
                    },
                    {
                      title: "Reasonable Adjustments",
                      text: "The organisation's commitment to making reasonable adjustments under the Equality Act 2010 for employees with mental health conditions. Examples should be provided to help managers understand what adjustments look like in practice.",
                      colour: "text-violet-400",
                      bg: "bg-violet-500/10",
                      border: "border-violet-500/30",
                    },
                  ].map((element, i) => (
                    <div
                      key={i}
                      className={`${element.bg} border ${element.border} p-3 rounded-lg`}
                    >
                      <p
                        className={`text-xs font-semibold ${element.colour} mb-1`}
                      >
                        {element.title}
                      </p>
                      <p className="text-sm text-white/80">{element.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Reviewing and Updating
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    {[
                      "Review the policy at least annually",
                      "Update after any significant incident or organisational change",
                      "Review in light of new legislation or guidance",
                      "Use data (sickness absence, EAP usage, staff surveys) to assess effectiveness",
                      "Benchmark against industry best practice (e.g., Mates in Mind standards)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Employee Input
                  </p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    {[
                      "Consult employees during policy development — they know what support they need",
                      "Include trade union representatives where applicable",
                      "Use anonymous surveys to understand current wellbeing challenges",
                      "Create feedback mechanisms so employees can suggest improvements",
                      "Ensure the policy is communicated clearly to all staff, not buried in a handbook",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Important:
                  </strong>{" "}
                  A mental health policy is only as good as its
                  implementation. Writing a policy and filing it away
                  achieves nothing. Senior leaders must champion it, line
                  managers must be trained to use it, and employees must
                  know it exists and how to access it. The policy should
                  be a living document that drives genuine cultural change,
                  not a tick-box exercise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Toolbox Talks on Mental Health */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Toolbox Talks on Mental Health
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Toolbox talks are short, focused safety briefings that are
                already a familiar part of construction site culture. They
                are typically delivered at the start of a shift and last
                10&ndash;15 minutes. Adapting this well-established format
                for mental health topics is one of the most effective ways
                to normalise conversations about mental wellbeing in
                male-dominated construction environments.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Example Toolbox Talk Topics
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    {
                      topic: "Stress Awareness",
                      detail: "Recognising the signs of stress in yourself and others, the difference between pressure and stress, practical coping strategies",
                    },
                    {
                      topic: "Suicide Prevention",
                      detail: "Construction suicide statistics, warning signs, how to have a conversation if you're worried about someone, helpline numbers",
                    },
                    {
                      topic: "Substance Misuse",
                      detail: "Alcohol and drugs as coping mechanisms, the impact on mental health and safety, where to get confidential help",
                    },
                    {
                      topic: "Where to Get Help",
                      detail: "GP, EAP, Samaritans (116 123), Shout (text SHOUT to 85258), Mates in Mind, Lighthouse Charity",
                    },
                    {
                      topic: "Sleep and Mental Health",
                      detail: "How poor sleep affects mood and concentration, sleep hygiene tips, the safety risk of fatigue on site",
                    },
                    {
                      topic: "Financial Wellbeing",
                      detail: "Money worries and mental health, budgeting basics, free debt advice services, avoiding loan sharks",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 p-3 rounded-lg"
                    >
                      <p className="text-xs font-semibold text-purple-400 mb-1">
                        {item.topic}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  How to Deliver a Mental Health Toolbox Talk Effectively
                </p>
                <div className="space-y-2">
                  {[
                    "Keep it short — 10 to 15 minutes maximum. Attention fades after that, especially on cold or early morning sites.",
                    "Use plain language — avoid clinical jargon. Say 'feeling down' not 'experiencing a depressive episode'. Speak to the room, not at them.",
                    "Use trade-relevant statistics — construction workers are 3x more likely to die by suicide than the national average. Two construction workers take their own lives every working day in the UK.",
                    "Frame it as safety — mental health affects concentration, decision-making, and reaction time. Poor mental health is a safety risk on site, just like fatigue or distraction.",
                    "Provide practical takeaways — what to say if you're worried about a mate, helpline numbers on pocket cards, where the EAP details are posted on site.",
                    "Have a respected figure lead it — a site foreman or senior tradesperson carrying the message normalises it far more effectively than an outside trainer.",
                    "Do not force disclosure — never put anyone on the spot. The goal is to open the door, not push people through it.",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Overcoming Resistance in Male-Dominated Environments
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Construction remains one of the most male-dominated
                    industries in the UK. Traditional masculine norms
                    &mdash; &ldquo;toughing it out&rdquo;, not showing
                    weakness, self-reliance &mdash; can create significant
                    barriers to talking about mental health. Overcoming
                    this requires a considered approach:
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Use language that resonates — 'looking out for your mates' rather than 'emotional support'",
                      "Lead with facts and safety data, not feelings",
                      "Share stories from respected industry figures who have spoken openly about their own struggles",
                      "Normalise the conversation through repetition — one toolbox talk will not change a culture, but regular inclusion will",
                      "Challenge the 'man up' culture directly but respectfully — point out that ignoring a problem does not make it go away, and that asking for help takes strength, not weakness",
                      "Use peer-to-peer influence — when one respected worker speaks openly, it gives others permission to do the same",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Promoting Openness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Promoting Openness
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Creating a workplace culture where people feel safe to talk
                about mental health is essential. Openness does not mean
                forcing people to share their personal difficulties &mdash;
                it means creating an environment where they{" "}
                <strong>can</strong> if they choose to, without fear of
                judgement, discrimination, or negative consequences.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Megaphone className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Leadership Role-Modelling
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Culture change starts at the top. When senior leaders
                    and managers are open about the importance of mental
                    health &mdash; and, where they choose to, about their
                    own experiences &mdash; it sends a powerful signal that
                    mental health is taken seriously.
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Senior leaders should visibly champion mental health — attending awareness events, referencing mental health in communications, and modelling healthy behaviours (taking breaks, leaving on time, using their own annual leave)",
                      "Line managers should be trained to have conversations about mental health — not as therapists, but as supportive managers who can signpost to professional help",
                      "Leaders who share their own experiences (with appropriate boundaries) normalise mental health challenges and reduce stigma more powerfully than any poster campaign",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Sharing Stories (With Consent)
                </p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Personal stories are one of the most powerful tools for
                    reducing stigma. When a colleague, a manager, or an
                    industry figure shares their experience of a mental
                    health challenge, it shows others that they are not
                    alone and that it is possible to recover and thrive.
                  </p>
                  <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-amber-400">
                        Consent is Essential:
                      </strong>{" "}
                      Stories should only ever be shared with the full,
                      informed consent of the person involved. They should
                      have control over what is shared, with whom, and in
                      what format. No one should ever feel pressured to
                      share their story, and they should be able to
                      withdraw consent at any time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Mental Health Awareness Events
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Participating in national awareness events provides
                    ready-made content and a reason to start conversations.
                    Key dates include:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      {
                        event: "World Mental Health Day",
                        date: "10 October each year",
                        detail: "Global awareness day set by the WHO — a chance to highlight workplace mental health initiatives",
                      },
                      {
                        event: "Time to Talk Day",
                        date: "First Thursday in February",
                        detail: "Run by Time to Change / Mind — encourages people to have a conversation about mental health",
                      },
                      {
                        event: "Mental Health Awareness Week",
                        date: "May each year (set by the Mental Health Foundation)",
                        detail: "A full week of awareness activities — workplaces can run events, toolbox talks, and campaigns",
                      },
                      {
                        event: "Movember",
                        date: "November",
                        detail: "Focuses on men's mental health and suicide prevention — particularly relevant in construction",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/5 border border-white/10 p-3 rounded-lg"
                      >
                        <p className="text-xs font-semibold text-violet-400">
                          {item.event}
                        </p>
                        <p className="text-xs text-white/60 mb-1">
                          {item.date}
                        </p>
                        <p className="text-xs text-white/70">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Normalising Conversations:
                  </strong>{" "}
                  The ultimate goal is to make asking &ldquo;How are you
                  doing &mdash; really?&rdquo; as natural as asking
                  &ldquo;Have you done your risk assessment?&rdquo;.
                  Mental health should not be treated as a special topic
                  that requires a special event &mdash; it should be woven
                  into everyday workplace culture through regular
                  conversations, visible support, and consistent messaging
                  that it is acceptable to not be acceptable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Reducing Presenteeism */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Reducing Presenteeism
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Presenteeism</strong> is the practice of attending
                work while unwell &mdash; physically or mentally &mdash;
                resulting in reduced productivity and increased risk.
                Research consistently shows that presenteeism costs UK
                employers significantly more than absenteeism, yet it
                receives far less attention because the employee is
                physically present.
              </p>

              <div className="bg-red-500/10 border-2 border-red-500/40 p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-6 w-6 text-red-400" />
                  <p className="text-base font-bold text-red-400">
                    The Hidden Cost of Presenteeism
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-white mb-2">
                      Presenteeism Costs
                    </p>
                    <p className="text-2xl font-bold text-red-400 mb-1">
                      &pound;21.2 billion
                    </p>
                    <p className="text-xs text-white/60">
                      per year to UK employers (Centre for Mental Health)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-2">
                      Absenteeism Costs
                    </p>
                    <p className="text-2xl font-bold text-amber-400 mb-1">
                      &pound;10.6 billion
                    </p>
                    <p className="text-xs text-white/60">
                      per year to UK employers (Centre for Mental Health)
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/80 mt-3">
                  Presenteeism costs approximately{" "}
                  <strong className="text-white">1.5 to 2 times more</strong>{" "}
                  than absenteeism. Yet most organisations focus their
                  attention and monitoring on absence, while presenteeism
                  goes largely unmeasured and unaddressed.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Why Presenteeism Is So Costly
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  {[
                    "Reduced productivity — employees working while unwell are significantly less productive, but the reduction is invisible because they are at their workstation",
                    "Increased error rate — poor concentration and cognitive impairment (common in depression, anxiety, and sleep deprivation) lead to more mistakes and rework",
                    "Safety risk — on construction sites, reduced concentration and slower reaction times directly increase the risk of accidents and injuries",
                    "Worsening of condition — working through illness (physical or mental) delays recovery and can turn a short-term problem into a long-term absence",
                    "Contagion — for physical illness, attending work while infectious spreads illness to colleagues; for mental health, a culture of 'working through it' discourages others from seeking help",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Scale className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Strategies to Reduce Presenteeism
                  </p>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      strategy: "Flexible Working Options",
                      detail: "Where possible, offer flexible start and finish times, part-time arrangements, or the ability to work from home for office-based tasks. For site-based workers, consider flexible shift patterns or shorter days during recovery periods.",
                    },
                    {
                      strategy: "Phased Return to Work",
                      detail: "After a period of absence, allow employees to return gradually — starting with reduced hours and building up over weeks. This is more effective than an immediate full-time return and reduces the risk of relapse.",
                    },
                    {
                      strategy: "Reasonable Adjustments Under the Equality Act 2010",
                      detail: "For employees with mental health conditions that qualify as disabilities (substantial, long-term effect on daily activities), employers have a legal duty to make reasonable adjustments. This may include modified duties, altered working hours, additional breaks, or changes to the work environment.",
                    },
                    {
                      strategy: "Line Manager Training",
                      detail: "Train line managers to recognise the signs of presenteeism, have supportive conversations, and take action early. Managers are the most important link between policy and practice.",
                    },
                    {
                      strategy: "Early Intervention",
                      detail: "Address problems early before they escalate. Regular check-ins, access to occupational health, and a culture where it is acceptable to say 'I'm not coping' all contribute to catching issues before they become crises.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 p-3 rounded-lg"
                    >
                      <p className="text-xs font-semibold text-purple-400 mb-1">
                        {item.strategy}
                      </p>
                      <p className="text-sm text-white/80">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Construction Context:
                  </strong>{" "}
                  Presenteeism is particularly dangerous in construction
                  because the work is physically demanding and often
                  involves working at height, with electricity, or with
                  heavy machinery. An electrician who is distracted by
                  depression, exhausted from insomnia, or impaired by
                  anxiety is a safety risk to themselves and to everyone
                  around them. Encouraging people to take time to recover
                  properly is not a luxury &mdash; it is a safety measure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Physical-Mental Health Connection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            The Physical-Mental Health Connection
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Physical and mental health are deeply interconnected.
                Physical health problems increase the risk of mental health
                difficulties, and mental health problems increase the risk
                of physical illness. This{" "}
                <strong>whole-person approach</strong> recognises that you
                cannot effectively address one without considering the
                other, and that workplace health initiatives should
                encompass both.
              </p>

              {/* Physical-Mental Health Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Dumbbell className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">
                      Exercise and Mental Health
                    </p>
                  </div>
                  <div className="text-sm text-white/80 space-y-2">
                    <p>
                      The evidence base for exercise as a treatment for
                      mental health conditions is strong and growing:
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "NICE recommends structured exercise for mild to moderate depression",
                        "30-45 minutes of moderate-intensity exercise, 3-5 times per week, produces significant mood improvements",
                        "Exercise releases endorphins (natural mood enhancers) and reduces cortisol (the stress hormone)",
                        "Regular exercise improves sleep quality — a critical factor in mental health",
                        "Group exercise provides social connection as well as physical benefits",
                        "Even a single bout of exercise can produce immediate improvements in mood and anxiety",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Apple className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">
                      Nutrition and Mental Health
                    </p>
                  </div>
                  <div className="text-sm text-white/80 space-y-2">
                    <p>
                      Emerging research in nutritional psychiatry shows a
                      clear link between diet and mental health:
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "A Mediterranean-style diet (rich in vegetables, fruit, whole grains, fish, and olive oil) is associated with reduced risk of depression",
                        "Highly processed diets high in sugar and refined carbohydrates are associated with increased risk of depression and anxiety",
                        "Gut health (the gut microbiome) is increasingly linked to mental health through the gut-brain axis",
                        "Skipping meals and relying on sugary snacks causes blood sugar spikes and crashes that affect mood and energy",
                        "Adequate hydration is important for cognitive function and mood regulation",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Moon className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">
                      Sleep and Mental Health
                    </p>
                  </div>
                  <div className="text-sm text-white/80 space-y-2">
                    <p>
                      Sleep and mental health have a bidirectional
                      relationship &mdash; poor sleep worsens mental health,
                      and poor mental health disrupts sleep:
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "Insomnia is both a symptom of and a risk factor for depression and anxiety",
                        "Adults need 7-9 hours of sleep per night for optimal mental and physical health",
                        "Shift work, early starts, and long commutes (common in construction) all disrupt sleep patterns",
                        "Poor sleep impairs cognitive function, emotional regulation, and decision-making — all critical for safety on site",
                        "Sleep hygiene education (consistent bedtime, limiting screens before sleep, avoiding caffeine after midday) can significantly improve sleep quality",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <p className="text-sm font-medium text-red-400">
                      Substance Use and Mental Health
                    </p>
                  </div>
                  <div className="text-sm text-white/80 space-y-2">
                    <p>
                      Alcohol and drug use are closely intertwined with
                      mental health, particularly in the construction
                      industry:
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "Alcohol is a depressant — while it may temporarily reduce anxiety, it worsens depression and anxiety in the medium and long term",
                        "Self-medication with alcohol or drugs is common among people experiencing mental health difficulties",
                        "Cannabis use is associated with increased risk of psychosis, particularly in younger users",
                        "Cocaine and amphetamine use can trigger anxiety, paranoia, and psychotic episodes",
                        "Withdrawal from alcohol or drugs can itself cause severe anxiety, depression, and in some cases medical emergencies",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Chronic Pain and Depression */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-white">
                    Chronic Pain and Depression
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Chronic pain and depression frequently co-occur and
                    create a vicious cycle. Chronic pain (lasting 12 weeks
                    or more) is extremely common in construction workers due
                    to the physical demands of the trade &mdash;
                    musculoskeletal injuries, back pain, and joint problems
                    are widespread.
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Up to 50% of people with chronic pain also experience depression",
                      "Pain reduces activity levels, disrupts sleep, and limits social interaction — all of which worsen mental health",
                      "Depression lowers the pain threshold, making existing pain feel worse and harder to manage",
                      "Effective treatment requires addressing BOTH the pain and the mental health condition, not one in isolation",
                      "Multidisciplinary approaches (combining physiotherapy, psychological therapy, and where appropriate medication) are most effective",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* The Whole-Person Approach */}
              <div className="bg-purple-500/10 border-2 border-purple-500/30 rounded-lg overflow-hidden">
                <div className="bg-purple-500/15 px-4 py-3 border-b border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-purple-400" />
                    <p className="text-base font-semibold text-purple-400">
                      The Whole-Person Approach
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-white/80 mb-3">
                    The whole-person approach recognises that physical
                    health, mental health, social connection, and
                    environmental factors are all interconnected. Effective
                    workplace wellbeing programmes address all of these
                    areas rather than treating them in isolation:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      {
                        area: "Physical Health",
                        examples: "Exercise facilities or gym discounts, healthy eating options in canteens, manual handling training, ergonomic assessments",
                        colour: "text-green-400",
                        bg: "bg-green-500/10",
                        border: "border-green-500/30",
                      },
                      {
                        area: "Mental Health",
                        examples: "EAP access, Mental Health First Aiders, stress management training, resilience workshops, manager training",
                        colour: "text-purple-400",
                        bg: "bg-purple-500/10",
                        border: "border-purple-500/30",
                      },
                      {
                        area: "Social Connection",
                        examples: "Team events, buddy systems, mentoring programmes, inclusive workplace culture, recognition and appreciation",
                        colour: "text-blue-400",
                        bg: "bg-blue-500/10",
                        border: "border-blue-500/30",
                      },
                      {
                        area: "Work-Life Balance",
                        examples: "Flexible working where possible, realistic workload management, proper breaks enforced, annual leave encouraged, travel time considered",
                        colour: "text-amber-400",
                        bg: "bg-amber-500/10",
                        border: "border-amber-500/30",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`${item.bg} border ${item.border} p-3 rounded-lg`}
                      >
                        <p className={`text-xs font-semibold ${item.colour} mb-1`}>
                          {item.area}
                        </p>
                        <p className="text-xs text-white/70">
                          {item.examples}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Workplace Health Initiatives */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Workplace Health Initiatives
                </p>
                <div className="space-y-2">
                  {[
                    {
                      initiative: "Gym Access and Exercise Programmes",
                      detail: "Subsidised gym memberships, on-site fitness equipment, lunchtime walking groups, or workplace sports teams. Even simple measures like providing a secure place to store bikes encourage active commuting.",
                    },
                    {
                      initiative: "Healthy Eating Options",
                      detail: "Healthy options in canteens and vending machines, free fruit in welfare facilities, access to clean drinking water, and reducing reliance on sugary drinks and processed snacks common on construction sites.",
                    },
                    {
                      initiative: "Sleep Hygiene Education",
                      detail: "Toolbox talks on the importance of sleep, practical tips for improving sleep quality, awareness of the impact of shift patterns and early starts on sleep, and consideration of travel time when planning shift schedules.",
                    },
                    {
                      initiative: "Substance Awareness Programmes",
                      detail: "Education about the mental health impact of alcohol and drug use, confidential support for those struggling with substance misuse, clear referral pathways to specialist services, and a non-punitive approach that encourages help-seeking.",
                    },
                    {
                      initiative: "Health Checks and Screening",
                      detail: "On-site health checks (blood pressure, BMI, cholesterol), mental health screening tools, occupational health assessments, and referral pathways to GPs for identified health concerns.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg"
                    >
                      <p className="text-xs font-semibold text-purple-400 mb-1">
                        {item.initiative}
                      </p>
                      <p className="text-sm text-white/80">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    The Business Case:
                  </strong>{" "}
                  Research by Deloitte found that for every &pound;1 spent
                  on workplace mental health interventions, employers
                  receive an average return of &pound;5.30 in reduced
                  absence, presenteeism, and staff turnover. Investing in
                  employee wellbeing is not just the right thing to do
                  &mdash; it makes clear business sense. The most
                  effective employers understand that a healthy workforce
                  is a productive workforce, and that physical and mental
                  health are inseparable.
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
            <Link to="../mental-health-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-5-section-4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
