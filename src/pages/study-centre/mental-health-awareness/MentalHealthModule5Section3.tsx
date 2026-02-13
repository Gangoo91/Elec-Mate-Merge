import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, FileText, ClipboardCheck, BarChart3, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh5s3-policy-purpose",
    question: "What is the PRIMARY purpose of a workplace mental health policy?",
    options: [
      "To satisfy HSE inspectors during site audits",
      "To provide a clear framework that demonstrates the organisation's commitment to mental health and outlines support available",
      "To allow the company to discipline employees who take time off for mental health",
      "To transfer responsibility for mental health from the employer to the employee"
    ],
    correctIndex: 1,
    explanation: "A mental health policy provides a clear, documented framework that demonstrates the organisation's commitment to supporting mental health, outlines the support available, defines roles and responsibilities, and sets expectations for how mental health will be addressed. It is not about compliance or discipline — it is about creating a foundation for a supportive culture. A good policy is developed collaboratively, reviewed annually, and genuinely embedded in how the company operates."
  },
  {
    id: "mh5s3-hse-standards",
    question: "The HSE's Management Standards approach identifies six key areas of work design that affect mental health. Which of the following is NOT one of the six areas?",
    options: [
      "Demands — workload, work patterns, and the work environment",
      "Salary — pay rates, bonuses, and financial incentives",
      "Support — encouragement, sponsorship, and resources provided by the organisation and colleagues",
      "Relationships — promoting positive working and avoiding conflict and unacceptable behaviour"
    ],
    correctIndex: 1,
    explanation: "The HSE's six Management Standards are: Demands, Control, Support, Relationships, Role, and Change. While salary and financial concerns can certainly contribute to stress, 'Salary' is not one of the six Management Standards. The six areas focus on how work is designed, organised, and managed — factors that are within the employer's control and that, if not properly managed, are associated with poor health, lower productivity, and increased sickness absence."
  },
  {
    id: "mh5s3-wellbeing-plan",
    question: "A Wellbeing Action Plan should ideally be created:",
    options: [
      "Only after someone has been off sick with a mental health condition",
      "Proactively, when someone is well, so support is already in place if difficulties arise",
      "Only for employees who have a diagnosed mental health condition",
      "By the HR department without the employee's involvement"
    ],
    correctIndex: 1,
    explanation: "Wellbeing Action Plans are most effective when created proactively — when someone is well, not in crisis. This allows for calm, thoughtful discussion about potential triggers, early warning signs, and what support would help. Creating a plan during a crisis is like writing a fire evacuation plan while the building is already on fire. Proactive plans mean that when difficulties do arise, the support is already understood and can be activated immediately. They should always be co-created with the employee, not imposed by management or HR."
  }
];

const faqs = [
  {
    question: "Our company is too small for a formal mental health policy — does it still matter?",
    answer: "Yes, absolutely. Even if your company has just five people, having a clear commitment to mental health matters. It does not need to be a 50-page document — it can be a single page that states your commitment, outlines the support available (even if that is just signposting to external resources like the Lighthouse Club helpline), and makes clear that people will be supported if they are struggling. What matters is not the length of the document but the genuineness of the commitment behind it. In small companies, culture is often set by the owner or director — if they take mental health seriously, the whole company will."
  },
  {
    question: "How do you conduct a stress risk assessment on a construction site?",
    answer: "Start by using the HSE's Management Standards approach. Look at the six areas: Demands (are workloads realistic?), Control (do people have a say in how they do their work?), Support (is training, encouragement, and resource adequate?), Relationships (is there bullying or conflict?), Role (do people understand what is expected of them?), and Change (is change managed and communicated well?). Use staff surveys, one-to-one conversations, and observation to gather information. Identify the hazards, assess who might be harmed and how, and create an action plan. Review it regularly. The HSE website has free tools and templates specifically for this purpose."
  },
  {
    question: "What are the Thriving at Work standards and are they legally binding?",
    answer: "The Thriving at Work standards come from the Stevenson-Farmer review, commissioned by the UK government and published in 2017. They set out six core standards that all employers should adopt (produce a mental health plan, develop awareness, encourage conversations, provide good working conditions, promote effective management, routinely monitor) and four enhanced standards for larger organisations. The standards are not legally binding in themselves, but they represent recognised good practice that courts and tribunals will reference when assessing whether an employer has met their legal duties under the Health and Safety at Work Act 1974 and the Equality Act 2010. Increasingly, they are becoming the benchmark against which employers are judged."
  },
  {
    question: "What should we measure to understand the state of mental health in our workforce?",
    answer: "Use a combination of leading and lagging indicators. Lagging indicators tell you what has already happened: absence rates (especially stress-related), EAP usage, staff turnover, exit interview themes, and formal complaints. Leading indicators help you predict and prevent future problems: anonymous pulse survey results, toolbox talk attendance and engagement, the number of trained Mental Health First Aiders, near-miss reporting rates (high reporting often indicates good psychological safety), and manager confidence in having mental health conversations. The key is to use data to drive improvement, not to blame or punish. If absence rates are rising, the question should be 'what do we need to change?' not 'who is taking too much time off?'"
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A workplace mental health policy should include all of the following EXCEPT:",
    options: [
      "A commitment statement from senior leadership",
      "Details of the support available to employees",
      "A list of employees who have disclosed mental health conditions",
      "Confidentiality provisions and return-to-work procedures"
    ],
    correctAnswer: 2,
    explanation: "A mental health policy should never include a list of employees who have disclosed mental health conditions — this would be a serious breach of confidentiality and would violate data protection law (GDPR). A good policy should include a commitment statement, roles and responsibilities, details of support available, confidentiality provisions, return-to-work procedures, the organisation's training commitment, and a review date. It should be developed collaboratively, communicated widely, and reviewed annually."
  },
  {
    id: 2,
    question: "The HSE's six Management Standards for stress cover which areas?",
    options: [
      "Demands, Control, Support, Relationships, Role, and Change",
      "Salary, Hours, Leave, Training, Progression, and Benefits",
      "Physical, Chemical, Biological, Ergonomic, Psychosocial, and Organisational",
      "Planning, Organising, Staffing, Directing, Coordinating, and Reporting"
    ],
    correctAnswer: 0,
    explanation: "The HSE's six Management Standards are: Demands (workload, work patterns, work environment), Control (how much say people have in how they do their work), Support (encouragement, sponsorship, resources), Relationships (promoting positive working, avoiding conflict), Role (whether people understand their role and do not have conflicting responsibilities), and Change (how organisational change is managed and communicated). These six areas represent the key aspects of work design that, if not properly managed, are associated with poor health and increased absence."
  },
  {
    id: 3,
    question: "Under the HSE's approach, stress is classified as:",
    options: [
      "A personal weakness that employees should manage themselves",
      "A recognised workplace hazard that must be included in risk assessments",
      "A medical condition that only doctors can address",
      "An unavoidable consequence of working in construction"
    ],
    correctAnswer: 1,
    explanation: "The HSE is clear that work-related stress is a recognised workplace hazard. Just like any other hazard (working at height, manual handling, electrical risk), it must be included in risk assessments and managed through appropriate control measures. Employers who fail to assess and manage psychosocial hazards are in breach of the Management of Health and Safety at Work Regulations 1999. Stress is not a personal weakness or an inevitable consequence of construction work — it is a hazard that can and must be managed."
  },
  {
    id: 4,
    question: "The Stevenson-Farmer review 'Thriving at Work' recommended how many CORE standards that ALL employers should adopt?",
    options: [
      "Three core standards",
      "Six core standards",
      "Ten core standards",
      "Twelve core standards"
    ],
    correctAnswer: 1,
    explanation: "The Stevenson-Farmer review (2017) recommended six core standards that all employers, regardless of size, should adopt: (1) Produce, implement, and communicate a mental health at work plan, (2) Develop mental health awareness among employees, (3) Encourage open conversations about mental health, (4) Provide employees with good working conditions, (5) Promote effective people management, (6) Routinely monitor employee mental health and wellbeing. Additionally, the review set out four enhanced standards for larger organisations and public sector employers."
  },
  {
    id: 5,
    question: "A Wellbeing Action Plan typically includes:",
    options: [
      "A diagnosis from a doctor and a prescribed medication list",
      "Triggers, early warning signs, support that helps, and what the manager and employee can each do",
      "A performance improvement plan with targets and deadlines",
      "A referral to occupational health and a phased return-to-work timetable"
    ],
    correctAnswer: 1,
    explanation: "A Wellbeing Action Plan is a personalised document co-created by the employee and their manager. It typically includes: known triggers that can affect their mental health, early warning signs that they might be struggling, support that helps them (both self-help strategies and workplace adjustments), what the manager can do to support them, and what the employee will do to look after their own wellbeing. It is not a clinical document (no diagnosis or medication) and not a performance tool. It is best created proactively, when the person is well."
  },
  {
    id: 6,
    question: "Which of the following is a LEADING indicator of workforce mental health (predicts future problems) rather than a LAGGING indicator (measures what has already happened)?",
    options: [
      "Sickness absence rates for stress-related conditions",
      "The number of employees accessing the Employee Assistance Programme",
      "Anonymous pulse survey scores measuring employee confidence in seeking mental health support",
      "The number of formal grievances related to bullying or harassment"
    ],
    correctAnswer: 2,
    explanation: "Anonymous pulse survey scores are a leading indicator because they measure current attitudes and confidence levels, which can predict future behaviour. If survey scores show that employees do not feel confident seeking support, this predicts that problems will go unreported and may escalate. The other options are all lagging indicators — they measure things that have already happened (absence, EAP usage, grievances). Effective mental health monitoring uses both types of indicator: leading indicators to anticipate and prevent, and lagging indicators to learn and improve."
  },
  {
    id: 7,
    question: "When conducting a stress risk assessment, the FIRST step should be to:",
    options: [
      "Implement control measures immediately based on management's best guess",
      "Identify the hazards — the aspects of work that could cause stress — using the six Management Standards as a framework",
      "Send all employees to a stress management training course",
      "Hire an external consultant to conduct the entire assessment"
    ],
    correctAnswer: 1,
    explanation: "Like any risk assessment, a stress risk assessment starts with identifying the hazards. Using the HSE's six Management Standards (Demands, Control, Support, Relationships, Role, Change) as a framework, you identify which aspects of work could cause stress. This is done through staff surveys, focus groups, one-to-one conversations, and observation. Only once you understand the hazards can you assess who is at risk, what the current controls are, and what additional measures are needed. Jumping straight to control measures without understanding the hazards is like treating symptoms without diagnosing the illness."
  },
  {
    id: 8,
    question: "How often should a workplace mental health policy be reviewed?",
    options: [
      "Only when there is a mental health-related incident",
      "Every five years, in line with company strategy reviews",
      "At least annually, and whenever there are significant changes to the organisation or workforce",
      "It only needs to be written once and does not require review"
    ],
    correctAnswer: 2,
    explanation: "A mental health policy should be reviewed at least annually to ensure it remains relevant, effective, and aligned with current best practice and legislation. It should also be reviewed whenever there are significant changes — such as organisational restructuring, a merger or acquisition, a significant incident, or new legislation. A policy that was written three years ago and has never been reviewed is unlikely to reflect the current needs of the workforce or the latest good practice. Regular review also sends the message that mental health is an ongoing priority, not a one-off exercise."
  }
];

export default function MentalHealthModule5Section3() {
  useSEO({
    title: "Policies and Risk Assessment | Mental Health Module 5.3",
    description: "Learn about workplace mental health policies, stress risk assessments, the Thriving at Work standards, wellbeing action plans, and how to monitor and measure workforce mental health.",
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <BookOpen className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Policies and Risk Assessment
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The practical frameworks that turn good intentions into effective action &mdash; from written policies to stress risk assessments and individual wellbeing plans
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Policy:</strong> Written commitment with clear roles and support</li>
              <li><strong>Risk assessment:</strong> Stress IS a workplace hazard (HSE)</li>
              <li><strong>Standards:</strong> Thriving at Work &mdash; 6 core + 4 enhanced</li>
              <li><strong>Monitoring:</strong> Leading + lagging indicators drive improvement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On a Construction Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>HSE 6 Standards:</strong> Demands, Control, Support, Relationships, Role, Change</li>
              <li><strong>WAPs:</strong> Individual plans created when people are well</li>
              <li><strong>Surveys:</strong> Anonymous pulse checks reveal the real picture</li>
              <li><strong>Review:</strong> At least annually &mdash; policies must stay alive</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Describe the key components of an effective workplace mental health policy",
              "Explain the HSE's six Management Standards approach to stress risk assessment",
              "Outline the Stevenson-Farmer review's core and enhanced standards",
              "Develop or contribute to a Wellbeing Action Plan for an individual employee",
              "Distinguish between leading and lagging indicators for workforce mental health",
              "Apply monitoring and measurement strategies to drive continuous improvement"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Mental Health Policy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Mental Health Policy
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A mental health policy is the <strong>written foundation</strong> of your organisation&rsquo;s
                approach to workplace mental health. It is not a magic solution on its own &mdash; a policy
                gathering dust in a filing cabinet helps nobody &mdash; but it provides the framework,
                clarity, and accountability that effective action requires.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Why You Need a Mental Health Policy</p>
                </div>
                <p className="text-sm text-white">
                  Without a policy, mental health support is ad hoc, inconsistent, and dependent on
                  individual managers&rsquo; attitudes and knowledge. One supervisor might be brilliant at
                  supporting someone who is struggling; another might tell them to &ldquo;man up.&rdquo; A
                  policy creates a <strong>consistent baseline</strong> &mdash; a minimum standard of
                  support that applies across the entire organisation, regardless of who your manager is.
                  It also demonstrates to employees, clients, and regulators that mental health is taken
                  seriously at an organisational level.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What a Mental Health Policy Should Contain</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Commitment statement</strong> &mdash; A clear statement from senior leadership that the organisation is committed to supporting the mental health and wellbeing of all employees. This sets the tone and demonstrates that it is a priority from the top.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Roles and responsibilities</strong> &mdash; Who is responsible for what? This should cover senior leadership (strategic commitment and resource allocation), managers (day-to-day support, early identification, creating a supportive environment), HR (policy implementation, training coordination, data monitoring), Mental Health First Aiders (initial support and signposting), and employees themselves (looking after their own wellbeing and seeking help when needed).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Support available</strong> &mdash; A clear description of all the support available, including internal resources (Employee Assistance Programme, Mental Health First Aiders, occupational health) and external resources (Lighthouse Club helpline, Samaritans, Mind, GP services). Include contact details and how to access each service.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Confidentiality</strong> &mdash; A clear commitment that any information shared about mental health will be treated confidentially, with explicit guidance on the limited circumstances in which confidentiality might need to be broken (imminent risk to life). People will not seek help if they fear their private struggles will become public knowledge.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Return-to-work procedures</strong> &mdash; Clear, supportive procedures for people returning after mental health-related absence. This should include phased returns, reasonable adjustments, regular check-ins, and a focus on helping the person reintegrate successfully rather than rushing them back to full duties.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Training commitment</strong> &mdash; What training will be provided? This might include Mental Health First Aid training, manager awareness sessions, whole-workforce awareness, and specialist training for HR and occupational health staff.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Review date</strong> &mdash; The policy should be reviewed at least annually, and whenever there are significant changes to the organisation, workforce, or relevant legislation. A dated review schedule shows this is a living document, not a one-off exercise.</span>
                  </li>
                </ul>
              </div>

              <p>
                The policy should be developed collaboratively &mdash; involving employees, managers,
                union representatives (where applicable), and ideally people with lived experience of
                mental health conditions. A policy written by HR behind closed doors and imposed on the
                workforce will lack credibility and buy-in. A policy co-created with the workforce will
                be more relevant, more practical, and more likely to be used.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Stress Risk Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Stress Risk Assessment
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HSE is unequivocal: <strong>work-related stress is a recognised workplace
                hazard</strong>. Just like working at height, manual handling, or electrical risk,
                it must be assessed and managed. The Management of Health and Safety at Work
                Regulations 1999 require employers to carry out suitable and sufficient risk
                assessments for all significant hazards &mdash; and stress qualifies.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The HSE Management Standards Approach</p>
                </div>
                <p className="text-sm text-white">
                  The HSE has developed the Management Standards approach to help employers assess and
                  manage work-related stress. The approach identifies <strong>six key areas of work
                  design</strong> that, if not properly managed, are associated with poor health, lower
                  productivity, and increased sickness absence. The six standards are not aspirational
                  targets &mdash; they represent the <strong>minimum conditions</strong> that should exist
                  in any well-managed workplace.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Six Management Standards</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">1. Demands</p>
                    <p className="text-sm text-white">Workload, work patterns, and the work environment. Employees should be able to cope with the demands of their job. On construction sites, this includes realistic programme targets, adequate resources, and reasonable working hours.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">2. Control</p>
                    <p className="text-sm text-white">How much say the person has in how they do their work. Employees should have a degree of autonomy and input. On site, this means involving workers in planning their tasks, listening to their ideas, and avoiding micromanagement.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">3. Support</p>
                    <p className="text-sm text-white">Encouragement, sponsorship, and resources provided by the organisation, line management, and colleagues. This includes training, tools, information, and emotional support when things are difficult.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">4. Relationships</p>
                    <p className="text-sm text-white">Promoting positive working to avoid conflict and dealing with unacceptable behaviour. On construction sites, this means addressing bullying, harassment, and toxic behaviour proactively &mdash; not waiting for a formal complaint.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">5. Role</p>
                    <p className="text-sm text-white">Whether people understand their role within the organisation and whether the organisation ensures they do not have conflicting responsibilities. On site, this means clear task briefings, defined responsibilities, and avoiding role ambiguity.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium text-sm mb-1">6. Change</p>
                    <p className="text-sm text-white">How organisational change (large or small) is managed and communicated. In construction, where change is constant (programme changes, design changes, personnel changes), effective communication and consultation are essential to prevent stress.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How to Conduct a Stress Risk Assessment</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Step 1: Identify the hazards</strong> &mdash; Use the six Management Standards as your framework. For each standard, identify the specific aspects of work that could cause stress. Use staff surveys, focus groups, one-to-one conversations, and your own observations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Step 2: Decide who might be harmed and how</strong> &mdash; Consider whether certain groups are at higher risk (new starters, lone workers, people going through personal difficulties, those with existing mental health conditions).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Step 3: Evaluate the risks and decide on actions</strong> &mdash; What are you already doing? Is it enough? What more could you do? Create a clear action plan with responsibilities and timescales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Step 4: Record your findings</strong> &mdash; Document the assessment, the actions taken, and the rationale. This is both good practice and a legal requirement if you have five or more employees.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Step 5: Review and update</strong> &mdash; Risk assessments are living documents. Review them regularly (at least annually) and whenever there are significant changes to the work, the workforce, or the organisation.</span>
                  </li>
                </ul>
              </div>

              <p>
                A stress risk assessment is not a box-ticking exercise. Done properly, it reveals the
                real pressures your workforce faces and gives you a clear roadmap for addressing them.
                It also provides evidence that you are meeting your legal obligations &mdash; which is
                invaluable if you ever face an HSE investigation or an employment tribunal claim.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Thriving at Work Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Thriving at Work Standards
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 2017, the UK government commissioned Lord Dennis Stevenson and Paul Farmer (Chief
                Executive of Mind) to conduct an independent review into mental health and employers.
                The resulting report &mdash; <strong>&ldquo;Thriving at Work&rdquo;</strong> &mdash;
                set out a framework of standards that has become the benchmark for workplace mental
                health in the UK.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Six Core Standards (All Employers)</p>
                </div>
                <p className="text-sm text-white mb-3">
                  These six standards are recommended for all employers, regardless of size or sector:
                </p>
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white"><strong className="text-rose-400">1.</strong> <strong>Produce, implement, and communicate</strong> a mental health at work plan that promotes good mental health of all employees and outlines the support available for those who need it.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white"><strong className="text-rose-400">2.</strong> <strong>Develop mental health awareness</strong> among employees by making information, tools, and support accessible.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white"><strong className="text-rose-400">3.</strong> <strong>Encourage open conversations</strong> about mental health and the support available when employees are struggling, during the recruitment process, and at regular intervals throughout employment.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white"><strong className="text-rose-400">4.</strong> <strong>Provide employees with good working conditions</strong> and ensure they have a healthy work-life balance and opportunities for development.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white"><strong className="text-rose-400">5.</strong> <strong>Promote effective people management</strong> through line managers and supervisors, ensuring they have the skills, knowledge, and confidence to support the mental health of those they manage.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white"><strong className="text-rose-400">6.</strong> <strong>Routinely monitor</strong> employee mental health and wellbeing by understanding available data, talking to employees regularly, and taking action to address any identified issues.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Four Enhanced Standards (Larger Organisations)</p>
                <p className="text-sm text-white mb-3">
                  For larger organisations and public sector employers, the review recommended four
                  additional enhanced standards:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Increase transparency and accountability</strong> through internal and external reporting on mental health (including in annual reports)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Demonstrate accountability</strong> by nominating a senior leader as the mental health champion, with board-level responsibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Improve the disclosure process</strong> to encourage employees to seek support by making it safe and straightforward to disclose mental health difficulties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Ensure provision of tailored in-house mental health support</strong> and signposting to clinical help, including access to psychological therapies</span>
                  </li>
                </ul>
              </div>

              <p>
                While the Thriving at Work standards are not legally binding, they represent recognised
                good practice and are increasingly referenced by courts, tribunals, and regulators when
                assessing whether an employer has met their legal duties. Many construction companies are
                now using these standards as their framework for developing mental health strategies.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Wellbeing Action Plans */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Wellbeing Action Plans
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While policies and risk assessments operate at the organisational level, <strong>Wellbeing
                Action Plans (WAPs)</strong> operate at the individual level. They are personalised
                documents co-created by an employee and their manager that outline what support the
                person needs to stay well at work and what to do if they start to struggle.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Key Principle: Create Them Proactively</p>
                <p className="text-sm text-white">
                  The most effective Wellbeing Action Plans are created <strong>when someone is well</strong>,
                  not when they are in crisis. Creating a plan during a crisis is like writing a fire
                  evacuation plan while the building is on fire. When someone is well, they can think
                  clearly about their triggers, their early warning signs, and the support that works
                  for them. The plan is then ready to be activated if and when difficulties arise.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What a Wellbeing Action Plan Contains</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Known triggers</strong> &mdash; What situations, events, or circumstances can negatively affect the person&rsquo;s mental health? Examples might include: tight deadlines, conflict with colleagues, working away from home for extended periods, financial pressures, anniversary dates, or changes to routine.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Early warning signs</strong> &mdash; How can the person (and their manager) recognise that things are starting to deteriorate? Examples might include: withdrawing from the team, becoming more irritable, losing concentration, making more errors, changes in attendance patterns, or changes in appearance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Support that helps</strong> &mdash; What has helped the person in the past? This might include: talking to someone they trust, taking a short break, adjusting their workload temporarily, working with specific colleagues, exercising, attending counselling, or contacting a helpline.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>What the manager can do</strong> &mdash; Specific, practical actions the manager can take. Examples: check in more frequently, temporarily reduce workload, offer flexible working, make a referral to occupational health, or simply listen without trying to fix everything.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>What the employee will do</strong> &mdash; The employee&rsquo;s own commitments to looking after their wellbeing. Examples: maintain regular exercise, attend GP appointments, use the EAP, take proper breaks, communicate honestly with their manager about how they are feeling.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Wellness Recovery Action Plans (WRAP)</p>
                <p className="text-sm text-white mb-3">
                  The WRAP model, developed by Mary Ellen Copeland, is a more detailed version of a
                  wellbeing action plan. Originally designed for people with serious mental health
                  conditions, it has been widely adapted for workplace use. A WRAP includes:
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>A daily maintenance plan (what the person does every day to stay well)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Triggers and an action plan for each trigger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Early warning signs and actions to take</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>A crisis plan (what to do if things become severe)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>A post-crisis plan (how to recover and return to wellness)</span>
                  </li>
                </ul>
              </div>

              <p>
                Wellbeing Action Plans are not just for people with diagnosed mental health conditions.
                They can be offered to <strong>all employees</strong> as part of a proactive wellbeing
                approach. When everyone has a plan, it normalises the conversation and removes the
                stigma of being singled out. It sends the message: &ldquo;We care about the wellbeing
                of every person in this organisation, not just those who are already struggling.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Monitoring and Measuring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Monitoring and Measuring
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You cannot improve what you do not measure. Effective mental health support requires
                <strong> ongoing monitoring</strong> to understand the current state of workforce wellbeing,
                identify trends, evaluate the impact of interventions, and drive continuous improvement.
                The key is to use data to <strong>drive improvement, not blame</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">What to Measure</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">Lagging Indicators</p>
                    <p className="text-sm text-white mb-2">
                      Measure what has already happened:
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Sickness absence rates (especially stress-related)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Employee Assistance Programme (EAP) usage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Staff turnover rates and exit interview themes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Formal grievances and complaints</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Accident and near-miss reports (stress-related)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                    <p className="text-green-400 font-semibold text-sm mb-2">Leading Indicators</p>
                    <p className="text-sm text-white mb-2">
                      Predict and prevent future problems:
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Anonymous pulse survey results on wellbeing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Number of trained Mental Health First Aiders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Manager confidence in MH conversations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Near-miss reporting rates (high = good safety culture)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Toolbox talk attendance and engagement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Data for Improvement, Not Blame</p>
                </div>
                <p className="text-sm text-white">
                  The most important principle in monitoring workforce mental health is that
                  <strong> data should drive improvement, not blame</strong>. If absence rates
                  are rising, the question should be &ldquo;what do we need to change in our working
                  environment?&rdquo; not &ldquo;who is taking too much time off?&rdquo; If EAP usage
                  is increasing, it might be a sign that people feel comfortable seeking help (positive)
                  or that the workplace is generating more stress (negative). Context matters. Use data
                  to understand, not to punish.
                </p>
              </div>

              <p>
                Anonymous pulse surveys are one of the most powerful tools available. They give you a
                snapshot of how your workforce is really feeling &mdash; something that absence data
                alone cannot reveal. Keep them short (5&ndash;10 questions maximum), run them regularly
                (quarterly is ideal), and &mdash; crucially &mdash; <strong>act on the results</strong>.
                Nothing destroys trust faster than asking people how they feel and then doing nothing
                about it. Share the results openly, explain what you plan to do, and follow through.
              </p>
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
                This section has covered the practical frameworks that turn mental health commitment
                into effective action. Policies, risk assessments, standards, and monitoring systems
                are the scaffolding that supports a mentally healthy workplace.
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Mental health policy:</strong> The written foundation &mdash; commitment, roles, support, confidentiality, return-to-work, training, and annual review.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Stress risk assessment:</strong> Stress IS a workplace hazard. Use the HSE&rsquo;s six Management Standards (Demands, Control, Support, Relationships, Role, Change).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Thriving at Work:</strong> Six core standards for all employers, four enhanced standards for larger organisations. Increasingly the benchmark for good practice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Wellbeing Action Plans:</strong> Individual, proactive plans co-created when people are well. Triggers, warning signs, support, and actions for both employee and manager.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Monitoring:</strong> Use both leading and lagging indicators. Anonymous pulse surveys are powerful. Data drives improvement, not blame.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Living documents:</strong> Policies and plans must be reviewed regularly, acted upon, and genuinely embedded &mdash; not filed and forgotten.</span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will explore the
                  industry initiatives and resources that are available to support mental health in
                  construction &mdash; from Mates in Mind and the Lighthouse Club to the Building
                  Mental Health framework. You will also learn what YOU can do, starting today, to
                  make a difference.
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
            <Link to="../mental-health-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Culture of Openness
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-5-section-4">
              Next: Industry Initiatives and Resources
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}