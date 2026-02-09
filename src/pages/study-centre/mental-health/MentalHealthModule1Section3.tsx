import { ArrowLeft, Brain, CheckCircle, AlertTriangle, Briefcase, Scale, Shield, FileText, Users, Building2, Heart, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-hasawa-duty",
    question: "Under the Health & Safety at Work Act 1974 (Section 2), what is the employer's general duty regarding employees' mental health?",
    options: [
      "Employers have no legal duty regarding mental health, only physical safety",
      "Employers must ensure, so far as is reasonably practicable, the health, safety and welfare of all employees — including mental health",
      "Employers must provide counselling services to all employees",
      "Employers are only responsible for mental health if an employee has a diagnosed condition"
    ],
    correctIndex: 1,
    explanation: "Section 2 of HASAWA 1974 places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees. The courts have consistently interpreted 'health' to include mental health. This means employers must assess and manage psychological hazards alongside physical ones."
  },
  {
    id: "mh-hse-standards",
    question: "How many key areas do the HSE Management Standards for work-related stress cover?",
    options: [
      "4 areas: Demands, Control, Support, Relationships",
      "5 areas: Demands, Control, Support, Role, Change",
      "6 areas: Demands, Control, Support, Relationships, Role, Change",
      "8 areas: Demands, Control, Support, Relationships, Role, Change, Pay, Hours"
    ],
    correctIndex: 2,
    explanation: "The HSE Management Standards cover 6 key areas that, if not properly managed, are associated with poor health, lower productivity, and increased sickness absence. These are: Demands, Control, Support, Relationships, Role, and Change. Each standard describes what good management practice looks like in that area."
  },
  {
    id: "mh-equality-act",
    question: "Under the Equality Act 2010, when is a mental health condition considered a disability?",
    options: [
      "Only when the person is unable to work at all",
      "When it has a substantial and long-term adverse effect on the person's ability to carry out normal day-to-day activities",
      "Only if the person has been formally sectioned under the Mental Health Act",
      "When a GP provides a fit note for more than 4 weeks"
    ],
    correctIndex: 1,
    explanation: "The Equality Act 2010 defines disability as a physical or mental impairment that has a substantial and long-term adverse effect on a person's ability to carry out normal day-to-day activities. 'Long-term' means lasting or likely to last 12 months or more. Conditions such as depression, anxiety, bipolar disorder, and PTSD can all qualify."
  }
];

const faqs = [
  {
    question: "Are employers legally required to have a Mental Health First Aider?",
    answer: "There is currently no specific legal requirement for employers to appoint Mental Health First Aiders (MHFAiders). However, employers do have a general duty under HASAWA 1974 to protect employees' health, which includes mental health. The HSE recommends that organisations consider mental health as part of their first aid needs assessment. Many employers now appoint MHFAiders as best practice, particularly since the Stevenson/Farmer 'Thriving at Work' review recommended it as a core standard."
  },
  {
    question: "Can an employer dismiss someone for having a mental health condition?",
    answer: "If the mental health condition qualifies as a disability under the Equality Act 2010 (substantial and long-term), dismissal purely on the grounds of that condition would likely constitute disability discrimination. Employers must first consider and implement reasonable adjustments. Dismissal could only be lawful if the employer can demonstrate that all reasonable adjustments have been made and the person still cannot fulfil the essential requirements of the role, and even then, proper procedures must be followed."
  },
  {
    question: "What is the difference between the HSE Management Standards and a legal requirement?",
    answer: "The HSE Management Standards are not themselves legally enforceable regulations. They are a framework and recommended approach for managing work-related stress. However, employers do have legal duties under HASAWA 1974 and the Management of Health and Safety at Work Regulations 1999 to assess and manage risks to health, including stress. The Management Standards provide a practical methodology for meeting those legal duties. If an employer fails to manage stress risks and an employee suffers harm, the Standards would be used as evidence of what 'reasonably practicable' steps should have been taken."
  },
  {
    question: "How does the Thriving at Work review apply to small construction firms?",
    answer: "The Stevenson/Farmer 'Thriving at Work' review (2017) set out 6 core standards that all employers, regardless of size, should adopt. For small construction firms, this means: producing a mental health at work plan, developing mental health awareness among employees, encouraging open conversations, providing good working conditions, promoting effective people management, and routinely monitoring employee mental health. The review recognised that implementation should be proportionate to the size of the organisation — a sole trader will approach this differently to a large contractor."
  },
  {
    question: "What reasonable adjustments might apply in the electrical trade?",
    answer: "Reasonable adjustments for electricians with mental health conditions might include: adjusting shift patterns to avoid excessive overtime, providing predictability in work schedules, ensuring they are not isolated on remote sites for extended periods, allowing flexible start times for those whose medication affects morning alertness, providing a quiet space for breaks on larger sites, adjusting workload during periods of poor mental health, allowing time off for therapy appointments, and ensuring the site supervisor checks in regularly. The key is that adjustments are tailored to the individual."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which section of the Health & Safety at Work Act 1974 sets out the employer's general duty to employees?",
    options: [
      "Section 1 — General purposes of the Act",
      "Section 2 — General duties of employers to employees",
      "Section 7 — General duties of employees",
      "Section 37 — Offences by bodies corporate"
    ],
    correctAnswer: 1,
    explanation: "Section 2 of HASAWA 1974 sets out the general duty of employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all their employees. This includes mental health, and requires risk assessment of psychological hazards."
  },
  {
    id: 2,
    question: "Which of the following is NOT one of the six HSE Management Standards for work-related stress?",
    options: [
      "Demands",
      "Control",
      "Pay",
      "Relationships"
    ],
    correctAnswer: 2,
    explanation: "The six HSE Management Standards are: Demands, Control, Support, Relationships, Role, and Change. Pay is not one of the six standards, though financial concerns can contribute to stress. The Standards focus on organisational and management factors that are within the employer's control."
  },
  {
    id: 3,
    question: "Under the Equality Act 2010, what does 'long-term' mean when determining whether a mental health condition is a disability?",
    options: [
      "Lasting more than 4 weeks",
      "Lasting more than 6 months",
      "Lasting or likely to last 12 months or more",
      "Lasting or likely to last 24 months or more"
    ],
    correctAnswer: 2,
    explanation: "Under the Equality Act 2010, 'long-term' means the condition has lasted or is likely to last 12 months or more, or is likely to last for the rest of the person's life. A recurring condition (such as depression that comes and goes) can still be considered long-term if it is likely to recur."
  },
  {
    id: 4,
    question: "The Stevenson/Farmer 'Thriving at Work' review (2017) recommended how many core standards for ALL employers?",
    options: [
      "4 core standards",
      "6 core standards",
      "8 core standards",
      "10 core standards"
    ],
    correctAnswer: 1,
    explanation: "The Thriving at Work review set out 6 core standards that all employers, regardless of size or sector, should implement. These are: (1) produce a mental health at work plan, (2) develop mental health awareness, (3) encourage open conversations, (4) provide good working conditions, (5) promote effective people management, and (6) routinely monitor employee mental health."
  },
  {
    id: 5,
    question: "Which of these is an example of a 'reasonable adjustment' under the Equality Act for an electrician with depression?",
    options: [
      "Reducing their pay to reflect reduced productivity",
      "Permanently removing them from all site work",
      "Allowing flexible start times to accommodate medication side-effects",
      "Telling all colleagues about their condition so they can offer support"
    ],
    correctAnswer: 2,
    explanation: "Allowing flexible start times is a reasonable adjustment — it addresses a practical barrier caused by the condition (medication side-effects on alertness) without fundamentally changing the role. Reducing pay would be discrimination, permanent removal from site work is disproportionate, and disclosing the condition to colleagues without consent would breach confidentiality and potentially the Equality Act itself."
  },
  {
    id: 6,
    question: "Which HSE Management Standard is concerned with whether employees understand their role and whether the organisation ensures they do not have conflicting roles?",
    options: [
      "Demands",
      "Control",
      "Role",
      "Change"
    ],
    correctAnswer: 2,
    explanation: "The 'Role' standard addresses whether people understand their role within the organisation and whether the organisation ensures that they do not have conflicting roles. Good practice means employees have a clear job description, understand how their work contributes to the organisation, and do not receive contradictory instructions from different managers."
  },
  {
    id: 7,
    question: "The Management of Health and Safety at Work Regulations 1999 require employers to carry out what specific activity?",
    options: [
      "Provide free counselling to all staff",
      "Carry out a suitable and sufficient risk assessment, including psychological hazards",
      "Appoint a Mental Health First Aider for every 50 employees",
      "Provide annual mental health screening for all workers"
    ],
    correctAnswer: 1,
    explanation: "Regulation 3 of the Management of Health and Safety at Work Regulations 1999 requires employers to carry out a suitable and sufficient assessment of risks to the health and safety of employees. This includes psychological hazards and stress risks. The risk assessment must be reviewed regularly and whenever there is reason to believe it is no longer valid."
  },
  {
    id: 8,
    question: "Which construction-specific initiative focuses on improving mental health and wellbeing across the UK building industry?",
    options: [
      "CSCS Card Scheme",
      "Mates in Mind",
      "CITB Apprenticeship Levy",
      "Construction Design and Management Regulations"
    ],
    correctAnswer: 1,
    explanation: "Mates in Mind is a UK charity that works across the construction industry to improve mental health and wellbeing. It was established in 2017 by the Health in Construction Leadership Group and provides training, resources, and support to help organisations address mental health on site. It is endorsed by major industry bodies including the CITB and Build UK."
  }
];

export default function MentalHealthModule1Section3() {
  useSEO({
    title: "Workplace Mental Health Framework | Mental Health Module 1.3",
    description: "UK workplace mental health legislation and frameworks: HASAWA 1974, HSE Management Standards, Equality Act 2010, Thriving at Work review, and construction industry context for Mental Health First Aiders.",
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-400/20 border border-purple-500/30 mb-4">
            <Brain className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Workplace Mental Health Framework
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            UK legislation, HSE Management Standards, the Equality Act 2010, the Thriving at Work review, and how these frameworks apply to the construction and electrical industry
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>HASAWA 1974:</strong> Employer duty of care includes mental health</li>
              <li><strong>HSE Standards:</strong> 6 areas &mdash; Demands, Control, Support, Relationships, Role, Change</li>
              <li><strong>Equality Act 2010:</strong> Mental health conditions can be a protected disability</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Assess:</strong> Psychological risks alongside physical hazards</li>
              <li><strong>Adjust:</strong> Reasonable adjustments for workers with mental health conditions</li>
              <li><strong>Support:</strong> Integrate MHFA into existing H&amp;S systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the employer's duty of care for mental health under HASAWA 1974",
              "List and describe the six HSE Management Standards for work-related stress",
              "Describe how the Equality Act 2010 protects employees with mental health conditions",
              "Summarise the core and enhanced standards from the Thriving at Work review",
              "Explain how to integrate Mental Health First Aid into a workplace H&S framework",
              "Identify construction-specific mental health challenges and industry initiatives"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Health & Safety at Work Act 1974 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            Health &amp; Safety at Work Act 1974
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Health &amp; Safety at Work Act 1974</strong> (HASAWA) is the primary piece of
                legislation covering occupational health and safety in the United Kingdom. It places a
                broad, overarching duty on employers to protect the health, safety and welfare of their
                employees &mdash; and this duty explicitly includes <strong>mental health</strong>.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Key Definition &mdash; Section 2: General Duty of Employers</p>
                <p className="text-sm text-white">
                  Section 2(1) states: &ldquo;It shall be the duty of every employer to ensure, so far as is
                  reasonably practicable, the health, safety and welfare at work of all his employees.&rdquo;
                  The courts have interpreted &lsquo;health&rsquo; to encompass <strong>both physical and
                  mental health</strong>. This means employers cannot lawfully ignore psychological hazards
                  in the workplace.
                </p>
              </div>

              <p>
                The Act does not prescribe exactly what employers must do for mental health. Instead, it
                sets a broad standard of <strong>&ldquo;reasonably practicable&rdquo;</strong> measures.
                What is reasonably practicable depends on the size and nature of the organisation, the
                risks involved, and the resources available. For a construction company sending electricians
                to remote sites for long shifts, what is reasonably practicable will differ from what is
                expected of an office-based firm.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Provisions Relevant to Mental Health</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { provision: "Section 2(1)", detail: "General duty to ensure health, safety and welfare of employees — includes mental health" },
                    { provision: "Section 2(2)(a)", detail: "Provision and maintenance of safe systems of work — workload and shift patterns affect mental health" },
                    { provision: "Section 2(2)(c)", detail: "Provision of information, instruction, training and supervision — includes mental health awareness training" },
                    { provision: "Section 2(2)(e)", detail: "Provision and maintenance of a safe working environment — includes psychosocial environment (bullying, harassment, isolation)" },
                    { provision: "Section 2(3)", detail: "Employers must prepare a written health & safety policy — should reference mental health" },
                    { provision: "Section 3", detail: "Duty to non-employees — employers must also consider the mental health impact of their operations on contractors and visitors" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-purple-400 mb-1">{item.provision}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-2">Management of Health &amp; Safety at Work Regulations 1999</p>
                <p className="text-sm text-white/80">
                  Made under HASAWA, these regulations give more specific duties. <strong>Regulation 3</strong> requires
                  employers to carry out a <strong>suitable and sufficient risk assessment</strong> of all risks to
                  employees&apos; health &mdash; including psychological hazards such as excessive workload, bullying,
                  poor management, lack of control, and isolation. The assessment must be reviewed regularly and updated
                  whenever there are significant changes to working practices. For employers with 5 or more employees,
                  the significant findings of the risk assessment must be recorded in writing.
                </p>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Enforcement</p>
                </div>
                <p className="text-sm text-white/80">
                  Breach of HASAWA is a <strong>criminal offence</strong>. The HSE can issue Improvement Notices
                  or Prohibition Notices and can prosecute employers who fail to manage risks to employees&apos;
                  mental health. In serious cases, individual directors and managers can also be personally
                  liable under Section 37. Fines are unlimited in the Crown Court.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: HSE Management Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            HSE Management Standards for Work-Related Stress
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The HSE developed the <strong>Management Standards</strong> approach to help employers manage
                the causes of work-related stress. They define the characteristics of an organisation where
                stress risks are being effectively managed. The Standards cover <strong>six key areas</strong> that,
                if not properly managed, are associated with poor health, lower productivity, and increased
                sickness absence.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Key Definition &mdash; Management Standards</p>
                <p className="text-sm text-white">
                  The HSE Management Standards are not legally binding regulations in themselves. They represent
                  a set of conditions that, if present, reflect <strong>good management practice</strong> and a
                  healthy working environment. They provide a framework that employers can use to demonstrate
                  they are meeting their legal duties under HASAWA 1974 and the Management Regulations 1999.
                </p>
              </div>

              {/* HSE 6 Management Standards Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-purple-500/20 border-b border-purple-500/30 px-4 py-3">
                  <p className="text-sm font-semibold text-purple-300">The 6 HSE Management Standards</p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {/* Standard 1: Demands */}
                    <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 mb-2">
                        <ClipboardList className="h-5 w-5 text-red-400" />
                      </div>
                      <p className="text-sm font-semibold text-red-400 mb-1">1. Demands</p>
                      <p className="text-xs text-white/60">Workload, work patterns, work environment</p>
                    </div>
                    {/* Standard 2: Control */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 mb-2">
                        <Scale className="h-5 w-5 text-amber-400" />
                      </div>
                      <p className="text-sm font-semibold text-amber-400 mb-1">2. Control</p>
                      <p className="text-xs text-white/60">How much say a person has in the way they work</p>
                    </div>
                    {/* Standard 3: Support */}
                    <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 mb-2">
                        <Heart className="h-5 w-5 text-green-400" />
                      </div>
                      <p className="text-sm font-semibold text-green-400 mb-1">3. Support</p>
                      <p className="text-xs text-white/60">Encouragement, resources and sponsorship from the organisation</p>
                    </div>
                    {/* Standard 4: Relationships */}
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 mb-2">
                        <Users className="h-5 w-5 text-blue-400" />
                      </div>
                      <p className="text-sm font-semibold text-blue-400 mb-1">4. Relationships</p>
                      <p className="text-xs text-white/60">Positive working to avoid conflict and bullying</p>
                    </div>
                    {/* Standard 5: Role */}
                    <div className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/20 rounded-xl p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 mb-2">
                        <Briefcase className="h-5 w-5 text-violet-400" />
                      </div>
                      <p className="text-sm font-semibold text-violet-400 mb-1">5. Role</p>
                      <p className="text-xs text-white/60">Understanding of role and no conflicting responsibilities</p>
                    </div>
                    {/* Standard 6: Change */}
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 mb-2">
                        <Building2 className="h-5 w-5 text-purple-400" />
                      </div>
                      <p className="text-sm font-semibold text-purple-400 mb-1">6. Change</p>
                      <p className="text-xs text-white/60">How organisational change is managed and communicated</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed breakdown: Good vs Poor */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 border-b border-purple-500/20 px-4 py-3">
                  <p className="text-sm font-semibold text-white">What Good Looks Like vs What Poor Looks Like</p>
                </div>

                {/* Demands */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-semibold text-red-400 mb-2">1. Demands</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-500/5 border border-green-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">Good Practice</p>
                      <p className="text-xs text-white/70">Realistic deadlines, workload matched to capability, adequate staffing levels, achievable targets</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">Poor Practice</p>
                      <p className="text-xs text-white/70">Excessive hours, unrealistic deadlines, constant time pressure, inability to take breaks, understaffing</p>
                    </div>
                  </div>
                </div>

                {/* Control */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-semibold text-amber-400 mb-2">2. Control</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-500/5 border border-green-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">Good Practice</p>
                      <p className="text-xs text-white/70">Workers have input on how they do their work, can take breaks when needed, have some say over shift patterns</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">Poor Practice</p>
                      <p className="text-xs text-white/70">Micromanagement, no flexibility, rigid schedules with no input, no autonomy over work methods</p>
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-semibold text-green-400 mb-2">3. Support</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-500/5 border border-green-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">Good Practice</p>
                      <p className="text-xs text-white/70">Line managers trained to have supportive conversations, EAP available, peer support, regular check-ins</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">Poor Practice</p>
                      <p className="text-xs text-white/70">No support systems, &ldquo;just get on with it&rdquo; culture, no access to occupational health, workers feel they cannot ask for help</p>
                    </div>
                  </div>
                </div>

                {/* Relationships */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-semibold text-blue-400 mb-2">4. Relationships</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-500/5 border border-green-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">Good Practice</p>
                      <p className="text-xs text-white/70">Clear anti-bullying policies, positive workplace culture, effective conflict resolution, mutual respect</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">Poor Practice</p>
                      <p className="text-xs text-white/70">Tolerated bullying, &ldquo;banter&rdquo; that is actually harassment, unresolved conflicts, intimidation, isolation of workers</p>
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-sm font-semibold text-violet-400 mb-2">5. Role</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-500/5 border border-green-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">Good Practice</p>
                      <p className="text-xs text-white/70">Clear job descriptions, workers understand their responsibilities, no conflicting instructions from different managers</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">Poor Practice</p>
                      <p className="text-xs text-white/70">Vague responsibilities, conflicting demands from multiple supervisors, asked to do tasks outside competence without training</p>
                    </div>
                  </div>
                </div>

                {/* Change */}
                <div className="p-4">
                  <p className="text-sm font-semibold text-purple-400 mb-2">6. Change</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-green-500/5 border border-green-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-green-400 mb-1">Good Practice</p>
                      <p className="text-xs text-white/70">Changes communicated clearly and in advance, workers consulted, adequate time to adjust, support during transitions</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/15 rounded-lg p-3">
                      <p className="text-xs font-medium text-red-400 mb-1">Poor Practice</p>
                      <p className="text-xs text-white/70">Sudden changes with no warning, no consultation, constant restructuring, job insecurity with no communication</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">HSE Stress Risk Assessment Process</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The HSE recommends a 5-step approach to managing stress using the Management Standards:
                </p>
                <div className="space-y-2">
                  {[
                    "Identify the stress risk factors in your workplace (use the 6 Standards as a framework)",
                    "Decide who might be harmed and how — consider different groups (new starters, lone workers, apprentices)",
                    "Evaluate the risks — use surveys, focus groups, absence data, and one-to-one conversations",
                    "Record your findings and develop an action plan with realistic timescales",
                    "Monitor and review — regularly check whether your actions are working and update the assessment"
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xs font-bold text-purple-400">{i + 1}</div>
                      <p className="text-xs text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Equality Act 2010 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Equality Act 2010 &amp; Mental Health
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Equality Act 2010</strong> is the primary UK legislation protecting individuals
                from discrimination. Under the Act, mental health conditions can qualify as a
                <strong> disability</strong> &mdash; giving the affected person significant legal protections
                in the workplace.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Key Definition &mdash; Disability Under the Equality Act</p>
                <p className="text-sm text-white">
                  A person has a disability if they have a physical or mental impairment that has a
                  <strong> substantial</strong> and <strong>long-term</strong> adverse effect on their ability
                  to carry out <strong>normal day-to-day activities</strong>. &lsquo;Substantial&rsquo; means more than
                  minor or trivial. &lsquo;Long-term&rsquo; means lasting or likely to last 12 months or more, or
                  for the rest of the person&apos;s life. Recurring conditions (such as episodes of depression)
                  are treated as continuing even during periods of remission.
                </p>
              </div>

              <p>
                Conditions such as <strong>depression</strong>, <strong>anxiety disorders</strong>,
                <strong> bipolar disorder</strong>, <strong>PTSD</strong>, <strong>OCD</strong>, and
                <strong> schizophrenia</strong> can all meet this definition. Importantly, the person does not need
                a formal diagnosis for the Act to apply &mdash; the test is functional (what effect does the
                condition have on their daily life?), not diagnostic.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Employer Duties Under the Equality Act</p>
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-purple-400 mb-1">Duty Not to Discriminate</p>
                    <p className="text-xs text-white/70">
                      Employers must not treat an employee less favourably because of their mental health condition.
                      This includes direct discrimination (treating someone worse because of their condition),
                      indirect discrimination (applying a policy that disproportionately disadvantages people with
                      mental health conditions), and discrimination arising from disability (treating someone
                      unfavourably because of something connected to their disability, such as sickness absence).
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-purple-400 mb-1">Duty to Make Reasonable Adjustments</p>
                    <p className="text-xs text-white/70">
                      Where a provision, criterion, or practice puts a disabled person at a substantial disadvantage,
                      the employer must take reasonable steps to avoid that disadvantage. For mental health, this
                      might mean adjusting working hours, providing a quiet workspace, allowing regular breaks,
                      or adjusting workload during difficult periods. The duty applies even if the employer does
                      not know about the condition, if they ought reasonably to have known.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-xs font-medium text-purple-400 mb-1">Protected Characteristics</p>
                    <p className="text-xs text-white/70">
                      Disability is one of 9 protected characteristics under the Equality Act. The others are age,
                      gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion
                      or belief, sex, and sexual orientation. A mental health condition that meets the disability
                      definition is protected regardless of the specific diagnosis.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-white">Examples of Reasonable Adjustments for Mental Health</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { adjustment: "Flexible working hours", detail: "Allowing later start times for employees whose medication affects morning alertness or sleep patterns" },
                    { adjustment: "Modified duties", detail: "Temporarily reducing workload or complexity of tasks during periods of acute difficulty" },
                    { adjustment: "Regular check-ins", detail: "Scheduling brief, private conversations with a supervisor to monitor wellbeing" },
                    { adjustment: "Quiet workspace", detail: "Providing access to a calm area for breaks — particularly important on busy, noisy construction sites" },
                    { adjustment: "Time off for appointments", detail: "Allowing paid or unpaid time off for therapy, counselling, or psychiatric appointments" },
                    { adjustment: "Adjusted absence triggers", detail: "Discounting disability-related absence from disciplinary procedures and attendance targets" },
                    { adjustment: "Buddy system", detail: "Pairing the worker with a supportive colleague, especially on remote sites or during night shifts" },
                    { adjustment: "Phased return to work", detail: "Allowing a gradual increase in hours and responsibilities after a period of mental health-related absence" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-purple-400 mb-1">{item.adjustment}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Important &mdash; Knowledge vs Constructive Knowledge</p>
                </div>
                <p className="text-sm text-white/80">
                  The duty to make reasonable adjustments applies not only when the employer <strong>knows</strong> about
                  the disability, but also when they <strong>ought reasonably to have known</strong>. If a worker
                  shows visible signs of distress, has frequent absences, or their performance has deteriorated
                  significantly, a tribunal may find the employer had &ldquo;constructive knowledge&rdquo; of the
                  condition &mdash; even if the worker never disclosed it. This is why Mental Health First Aiders
                  and line managers must be trained to recognise the signs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Thriving at Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Thriving at Work &mdash; Stevenson/Farmer Review 2017
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 2017, the UK Government commissioned Lord Dennis Stevenson and Paul Farmer (CEO of Mind)
                to conduct an independent review of mental health and employers. The resulting report,
                <strong> &ldquo;Thriving at Work&rdquo;</strong>, set out a framework of standards that all UK
                employers should adopt. It was a landmark moment for workplace mental health policy.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">The 6 Core Standards (for ALL employers)</p>
                <p className="text-xs text-white/60 mb-3">These standards are recommended for every employer, regardless of size or sector:</p>
                <div className="space-y-2">
                  {[
                    { num: "1", standard: "Produce, implement and communicate a mental health at work plan" },
                    { num: "2", standard: "Develop mental health awareness among employees by making information, tools and support accessible" },
                    { num: "3", standard: "Encourage open conversations about mental health and the support available when employees are struggling" },
                    { num: "4", standard: "Provide good working conditions that ensure employees have a healthy work-life balance and opportunities for development" },
                    { num: "5", standard: "Promote effective people management through line managers and supervisors, ensuring they have the training to have supportive conversations" },
                    { num: "6", standard: "Routinely monitor employee mental health and wellbeing by collecting and analysing data on absence, presenteeism and employee feedback" }
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xs font-bold text-purple-400">{item.num}</div>
                      <p className="text-sm text-white/80">{item.standard}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-violet-400 mb-3">The 4 Enhanced Standards (for larger employers and public sector)</p>
                <p className="text-xs text-white/60 mb-3">In addition to the 6 core standards, larger organisations should also:</p>
                <div className="space-y-2">
                  {[
                    { num: "1", standard: "Increase transparency and accountability through internal and external reporting on mental health" },
                    { num: "2", standard: "Demonstrate accountability by nominating a senior leader as the 'mental health champion' at board level" },
                    { num: "3", standard: "Improve the disclosure process to make it easier for employees to talk about mental health without fear of discrimination" },
                    { num: "4", standard: "Ensure provision of tailored, in-house mental health support and signposting to clinical help" }
                  ].map((item) => (
                    <div key={item.num} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-xs font-bold text-violet-400">{item.num}</div>
                      <p className="text-sm text-white/80">{item.standard}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-white">What This Means for Construction &amp; Electrical Work</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong>Mental health plan:</strong> Even small electrical firms should have a written plan addressing how they support workers&apos; mental health, who to go to for help, and what resources are available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong>Open conversation culture:</strong> The construction industry&apos;s traditional &ldquo;tough it out&rdquo; mentality must be actively challenged &mdash; toolbox talks on mental health are a practical way to start</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong>Supervisor training:</strong> Site supervisors and gang leaders should receive training in how to recognise signs of poor mental health and have supportive conversations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong>Working conditions:</strong> Long hours, excessive travel, uncertain contracts, and working away from home all affect mental health &mdash; employers should address these proactively</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span><strong>Data monitoring:</strong> Track sickness absence patterns, staff turnover, and survey feedback to identify emerging mental health issues before they become crises</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: First Aid Needs Assessment for Mental Health */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            First Aid Needs Assessment for Mental Health
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Just as employers must conduct a <strong>first aid needs assessment</strong> for physical first aid
                (under the Health &amp; Safety (First-Aid) Regulations 1981), a growing body of guidance
                recommends applying the same principle to <strong>mental health first aid</strong>. The goal is
                to integrate MHFA provision into your existing health and safety framework, not to treat it
                as a separate initiative.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Integrating MHFA into Existing H&amp;S Systems</p>
                <p className="text-sm text-white/80">
                  MHFA should be embedded alongside physical first aid &mdash; not bolted on as an afterthought.
                  Consider updating your company health and safety policy to reference mental health explicitly,
                  include mental health in site inductions, and display the names and photographs of MHFAiders
                  alongside physical first aiders on site notice boards.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How Many MHFAiders Do You Need?</p>
                <p className="text-sm text-white/80 mb-3">
                  There is no prescriptive legal ratio. MHFA England recommends aiming for <strong>1 MHFAider
                  per 10 employees</strong> as a starting point, but the actual number should be determined
                  by your risk assessment. Factors to consider include:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { factor: "Workforce size", detail: "Larger workforces need more MHFAiders to ensure coverage across shifts and locations" },
                    { factor: "Working patterns", detail: "Shift work, night work, and weekend work all require MHFAider availability at those times" },
                    { factor: "Remote or isolated sites", detail: "Workers on remote sites may have limited access to external support — on-site MHFAiders are critical" },
                    { factor: "Nature of work", detail: "High-risk trades, physically demanding work, and jobs with exposure to traumatic events increase the need" },
                    { factor: "Known risk factors", detail: "If your workforce has high absence rates, high turnover, or previous incidents of mental ill health, increase provision" },
                    { factor: "Holiday and absence cover", detail: "Ensure cover is maintained when MHFAiders are on leave, sick, or have left the organisation" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-purple-400 mb-1">{item.factor}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-white">Practical Steps for Implementation</p>
                </div>
                <div className="space-y-2">
                  {[
                    "Conduct a mental health needs assessment alongside your physical first aid needs assessment",
                    "Train a proportionate number of MHFAiders and ensure they are refreshed every 3 years",
                    "Update your H&S policy and risk assessments to include psychosocial hazards",
                    "Display MHFAider details on site notice boards and in induction packs",
                    "Provide MHFAiders with a private space to have confidential conversations",
                    "Establish a referral pathway so MHFAiders know where to signpost people (GP, EAP, crisis services)",
                    "Ensure MHFAiders are supported themselves — debrief processes and supervision should be in place",
                    "Monitor and review the effectiveness of your MHFA provision at least annually"
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xs font-bold text-purple-400">{i + 1}</div>
                      <p className="text-xs text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-2">HSE Guidance on Stress Risk Assessment</p>
                <p className="text-sm text-white/80">
                  The HSE&apos;s <strong>stress risk assessment</strong> process should be used alongside your MHFA
                  provision. Use the HSE&apos;s free Stress Indicator Tool (a staff survey) to identify which of the
                  6 Management Standards areas need attention. The results can inform your mental health plan,
                  guide MHFAider training priorities, and provide baseline data to measure improvement over time.
                  For construction sites, consider supplementing the survey with informal toolbox talks and
                  one-to-one conversations, as not all workers will feel comfortable completing a written survey.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Construction Industry Context */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Construction Industry Context
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction industry faces <strong>unique mental health challenges</strong>. Workers in
                construction are significantly more likely to experience poor mental health and to die by
                suicide than the general working population. Understanding these industry-specific factors
                is essential for any Mental Health First Aider working in the electrical or construction trades.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">Key Statistic</p>
                <p className="text-sm text-white">
                  Male construction workers in the UK are <strong>3 times more likely to die by suicide</strong> than
                  men in the general population (ONS). The construction sector also has among the highest rates
                  of work-related stress, depression, and anxiety of any UK industry. These figures make a
                  compelling case for proactive mental health support on every construction site.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction-Specific Mental Health Challenges</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { challenge: "Transient workforce", detail: "Workers move between sites and employers frequently, making it difficult to build relationships, access consistent support, or feel a sense of belonging" },
                    { challenge: "Long and unsociable hours", detail: "Early starts, late finishes, weekend work, and overtime culture disrupt sleep, family life, and social connections — all protective factors for mental health" },
                    { challenge: "Physical demands", detail: "Heavy physical work, working at height, and exposure to weather extremes are physically exhausting and contribute to mental fatigue and low mood" },
                    { challenge: "Job insecurity", detail: "Short-term contracts, self-employment, and 'feast or famine' workloads create chronic financial anxiety and uncertainty about the future" },
                    { challenge: "Remote and isolated sites", detail: "Working away from home for extended periods, living in temporary accommodation, and being separated from family and friends" },
                    { challenge: "Macho culture", detail: "A traditional culture of 'toughness' discourages workers from talking about their feelings or seeking help, leading to suffering in silence" },
                    { challenge: "Substance misuse", detail: "Higher-than-average rates of alcohol and drug use in the industry, often as a coping mechanism for stress, pain, or low mood" },
                    { challenge: "Financial pressures", detail: "Self-employed workers receive no sick pay, so taking time off for mental health feels financially impossible — leading to presenteeism" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs font-medium text-purple-400 mb-1">{item.challenge}</p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-white">Industry Initiatives &amp; Partnerships</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-violet-400 mb-1">Mates in Mind</p>
                    <p className="text-xs text-white/70">
                      Established in 2017 by the Health in Construction Leadership Group (HCLG), Mates in Mind
                      is a registered charity that provides workplace mental health training, resources, and
                      support specifically for the construction, related industries, and associated trades.
                      It is endorsed by Build UK, the CITB, and major contractors. Mates in Mind offers a
                      structured approach: Awareness (general workforce), Advocate (site champions), and
                      Manage (line managers and supervisors).
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-violet-400 mb-1">Building Mental Health Framework</p>
                    <p className="text-xs text-white/70">
                      The Building Mental Health framework provides guidance and charter commitments for
                      construction employers. Organisations sign a charter pledging to promote awareness of
                      mental health, provide information about support, and create an environment where
                      people feel able to talk about their mental health. It provides practical toolkits,
                      template policies, and example toolbox talks for use on site.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-violet-400 mb-1">Lighthouse Construction Industry Charity</p>
                    <p className="text-xs text-white/70">
                      The Lighthouse Club provides emotional, physical, and financial wellbeing support to
                      construction workers and their families. Their 24/7 helpline, text service, and online
                      resources are free to all construction workers. The charity also provides emergency
                      financial assistance and counselling referrals.
                    </p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <p className="text-sm font-medium text-violet-400 mb-1">CITB &amp; Health in Construction Leadership Group</p>
                    <p className="text-xs text-white/70">
                      The CITB (Construction Industry Training Board) funds mental health training and research
                      across the sector. The Health in Construction Leadership Group brings together clients,
                      contractors, and professional bodies to drive improvements in health and wellbeing standards.
                      Together, they champion the message that mental health must be treated with the same
                      priority as physical safety on every site.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">As an MHFA in Construction &mdash; Remember</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Many workers will never have spoken about their mental health before &mdash; approach conversations with patience and without judgement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Consider cultural backgrounds &mdash; attitudes to mental health vary significantly across different communities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>Self-employed workers may have no access to employer-provided support &mdash; know the free resources available (Lighthouse Club helpline, Samaritans, NHS crisis services)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                    <span>If someone is working at height or with live electricity and you believe they are in acute mental distress, the immediate physical safety risk must be managed first</span>
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
            <Link to="../mental-health-module-1-section-4">
              Next: Recognising Mental Health Conditions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
