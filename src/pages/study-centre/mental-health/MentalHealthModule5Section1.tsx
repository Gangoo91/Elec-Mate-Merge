import {
  ArrowLeft,
  Building2,
  CheckCircle,
  AlertTriangle,
  Users,
  Eye,
  ShieldCheck,
  Star,
  BarChart3,
  TrendingUp,
  ClipboardList,
  HeartHandshake,
  Megaphone,
  BadgeCheck,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-m5s1-business-case",
    question:
      "According to the Deloitte 2020 research, what is the average return on investment for every \u00a31 spent on mental health interventions in the workplace?",
    options: [
      "\u00a32 for every \u00a31 spent",
      "\u00a35 for every \u00a31 spent",
      "\u00a310 for every \u00a31 spent",
      "\u00a31.50 for every \u00a31 spent",
    ],
    correctIndex: 1,
    explanation:
      "Deloitte\u2019s 2020 report \u2018Mental Health and Employers: Refreshing the Case for Investment\u2019 found that for every \u00a31 invested in mental health support in the workplace, employers received an average return of \u00a35. This return comes from reduced absenteeism, lower presenteeism, reduced staff turnover, and fewer workplace incidents. The business case for investing in mental health is now well established and compelling.",
  },
  {
    id: "mh-m5s1-mhfa-numbers",
    question:
      "What is the MHFA England starting-point recommendation for the number of Mental Health First Aiders per workforce?",
    options: [
      "1 MHFA per 50 employees",
      "1 MHFA per 25 employees",
      "1 MHFA per 10 employees",
      "1 MHFA per 100 employees",
    ],
    correctIndex: 2,
    explanation:
      "MHFA England recommends a starting point of 1 trained Mental Health First Aider for every 10 employees. However, this is a guideline, not a fixed rule. The actual number needed depends on factors such as shift patterns, multi-site working, the proportion of remote workers, the nature of the work, and the specific risk profile of the workforce. Construction sites, for example, may need a higher ratio due to dispersed working locations and the physically demanding, high-pressure nature of the work.",
  },
  {
    id: "mh-m5s1-core-standards",
    question:
      "How many core standards were set out in the Stevenson/Farmer \u2018Thriving at Work\u2019 review (2017) for employers to adopt as a minimum?",
    options: [
      "4 core standards",
      "6 core standards",
      "8 core standards",
      "10 core standards",
    ],
    correctIndex: 1,
    explanation:
      "The Stevenson/Farmer \u2018Thriving at Work\u2019 review (2017) set out 6 core standards that all employers, regardless of size or sector, should adopt as a minimum. These are: (1) produce, implement and communicate a mental health at work plan, (2) develop mental health awareness among employees, (3) encourage open conversations about mental health, (4) provide good working conditions, (5) promote effective people management, and (6) routinely monitor employee mental health and wellbeing with signposting to support.",
  },
];

const faqs = [
  {
    question:
      "Do Mental Health First Aiders need to be formally qualified or certified?",
    answer:
      "Yes. To be recognised as a Mental Health First Aider, an individual must complete an MHFA England-approved two-day (16-hour) training course delivered by a licensed MHFA instructor. Upon completion, they receive a certificate valid for three years. To maintain their status, MHFAs must complete a half-day refresher course before their certificate expires. It is important to distinguish between Mental Health First Aiders (who have completed the full two-day course) and Mental Health Champions (who have completed a shorter awareness course, typically one day or half a day). Champions raise awareness but are not trained to provide mental health first aid interventions.",
  },
  {
    question:
      "How is an MHFA programme different from an Employee Assistance Programme (EAP)?",
    answer:
      "An MHFA programme and an EAP serve complementary but different purposes. MHFAs are colleagues trained to spot the signs of mental health issues, offer initial support, and guide a person towards appropriate help. They provide a visible, immediate, peer-level first point of contact. An EAP, by contrast, is typically a confidential telephone or online counselling service provided by an external organisation, accessible 24/7. EAPs offer professional counselling sessions, legal advice, financial guidance, and other support services. Ideally, a workplace should have both \u2014 MHFAs provide the face-to-face, on-the-ground initial support, while the EAP provides the professional follow-up and specialist support that the MHFA can signpost to.",
  },
  {
    question:
      "What if management are not supportive of implementing an MHFA programme?",
    answer:
      "Securing management buy-in is essential for a successful programme. If there is resistance, focus on the evidence base: the Deloitte 2020 report shows a \u00a35 return for every \u00a31 invested. Present data on sickness absence, staff turnover, and the cost of replacing employees. Use case studies from similar organisations or competitors who have implemented programmes successfully. Reference the HSE Management Standards, the Stevenson/Farmer review, and the legal duty of care under the Health and Safety at Work etc. Act 1974, which includes mental health. Starting small \u2014 perhaps with a pilot programme in one department \u2014 can demonstrate impact and build momentum for wider rollout.",
  },
  {
    question:
      "How should an MHFA programme be adapted for construction sites specifically?",
    answer:
      "Construction presents unique challenges for mental health support. Workers are often dispersed across multiple sites, may work for subcontractors rather than the main contractor, and the workforce changes frequently as projects progress. Key adaptations include: training MHFAs on every active site (not just head office), ensuring MHFAs are visible via hard hat stickers, hi-vis identifiers, and site notice boards. Toolbox talks should regularly include mental health topics. Consider the specific stressors of construction \u2014 job insecurity, time away from family, physical exhaustion, and the pressure of tight deadlines. Mates in Mind, the Lighthouse Club, and CALM all offer construction-specific resources. The culture of \u2018toughness\u2019 in construction means extra effort is needed to normalise conversations about mental health.",
  },
  {
    question:
      "What KPIs should we track to measure whether the programme is working?",
    answer:
      "A combination of quantitative and qualitative measures provides the most complete picture. Quantitative KPIs include: sickness absence rates (total and mental-health-specific), EAP usage rates, staff turnover and retention, return-to-work success rates, near-miss and incident reporting rates, and the number of MHFA interactions logged (anonymised). Qualitative measures include: staff survey responses on wellbeing and psychological safety, feedback from MHFAs on common themes and barriers, manager observations, and case studies (anonymised). Track these over time \u2014 improvement may be gradual. An annual review that compares data year-on-year provides the clearest picture of impact. Remember that an increase in people seeking help is initially a positive sign \u2014 it means people feel safe enough to come forward.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What is the first and most critical step when setting up an MHFA programme in a workplace?",
    options: [
      "Immediately training all employees as Mental Health First Aiders",
      "Securing management buy-in and commitment at the highest level",
      "Purchasing mental health posters for the canteen",
      "Hiring an external counsellor to attend the office once a week",
    ],
    correctAnswer: 1,
    explanation:
      "Securing management buy-in is the essential first step. Without visible commitment and support from senior leadership, the programme is unlikely to receive adequate funding, time allocation, or organisational priority. Management must champion the programme, allocate resources, and model supportive behaviours. A top-down commitment signals to the entire workforce that mental health is taken seriously.",
  },
  {
    id: 2,
    question:
      "MHFA England recommends a starting ratio of how many trained MHFAs per employees?",
    options: [
      "1 per 50 employees",
      "1 per 100 employees",
      "1 per 10 employees",
      "1 per 5 employees",
    ],
    correctAnswer: 2,
    explanation:
      "MHFA England recommends 1 trained Mental Health First Aider for every 10 employees as a starting point. This ratio may need to be adjusted based on factors such as shift patterns (ensuring coverage on all shifts), multi-site working, the proportion of remote workers, and the specific risk factors present in the workplace.",
  },
  {
    id: 3,
    question:
      "What is the key difference between a Mental Health First Aider and a Mental Health Champion?",
    options: [
      "There is no difference \u2014 the terms are interchangeable",
      "Champions have completed the full two-day MHFA course, while MHFAs have only completed a half-day awareness session",
      "MHFAs have completed the full two-day training and are equipped to provide initial support; Champions have completed a shorter awareness course to promote understanding",
      "MHFAs are professionally qualified counsellors, while Champions are volunteers",
    ],
    correctAnswer: 2,
    explanation:
      "Mental Health First Aiders complete the full two-day (16-hour) MHFA England course and are trained to recognise signs of mental ill health, provide initial support using the ALGEE action plan, and guide people towards professional help. Mental Health Champions complete a shorter awareness course (typically one day or half a day) and are equipped to raise awareness, reduce stigma, and encourage open conversations \u2014 but they are not trained to deliver the MHFA intervention itself.",
  },
  {
    id: 4,
    question:
      "Which of the following is NOT one of the 6 core standards from the Stevenson/Farmer \u2018Thriving at Work\u2019 review?",
    options: [
      "Produce, implement and communicate a mental health at work plan",
      "Provide a qualified psychologist on site at all times",
      "Encourage open conversations about mental health and the support available",
      "Routinely monitor employee mental health and wellbeing",
    ],
    correctAnswer: 1,
    explanation:
      "The Thriving at Work review does not require employers to provide a qualified psychologist on site. The 6 core standards are: (1) produce/implement/communicate a mental health at work plan, (2) develop mental health awareness, (3) encourage open conversations, (4) provide good working conditions, (5) promote effective people management, and (6) routinely monitor and signpost. These are achievable minimum standards for all employers, regardless of size.",
  },
  {
    id: 5,
    question:
      "How can employees identify who the Mental Health First Aiders are in their workplace?",
    options: [
      "MHFAs should remain anonymous to protect their privacy",
      "Through a combination of lanyards/badges, posters, intranet listings, toolbox talk introductions, and regular communication",
      "Only through the HR department, who can provide names on request",
      "MHFAs should only be known to management, not to the general workforce",
    ],
    correctAnswer: 1,
    explanation:
      "Visibility and accessibility are essential for MHFAs to be effective. If employees do not know who the MHFAs are, they cannot access support. Strategies include MHFA-branded lanyards and badges, posters and notice boards listing MHFAs with photos, intranet pages, introductions at inductions and toolbox talks, and regular reminders through internal communications. MHFAs must be approachable and their identity must be widely known.",
  },
  {
    id: 6,
    question:
      "How should mental health be integrated with existing health and safety arrangements?",
    options: [
      "Mental health should be kept entirely separate from physical health and safety",
      "By adding mental health to risk assessments, H&S committee agendas, inductions, toolbox talks, and aligning with HSE Management Standards",
      "By replacing all physical health and safety measures with mental health initiatives",
      "Mental health is not relevant to health and safety and should be managed by HR only",
    ],
    correctAnswer: 1,
    explanation:
      "Mental health should be fully integrated with existing health and safety systems, not treated as a separate initiative. This means including mental health hazards (such as excessive workload, lack of control, and poor relationships) in risk assessments, adding mental health as a standing item on H&S committee agendas, covering mental health in inductions and toolbox talks, and aligning with the HSE Management Standards which explicitly address psychosocial hazards.",
  },
  {
    id: 7,
    question:
      "Which of the following is a quantitative KPI for measuring the impact of a mental health programme?",
    options: [
      "The colour scheme of the mental health awareness posters",
      "Sickness absence rates, EAP usage rates, and staff retention figures",
      "The number of mental health posters displayed in the building",
      "The personal opinions of the CEO about mental health",
    ],
    correctAnswer: 1,
    explanation:
      "Quantitative KPIs are measurable, numerical indicators that can be tracked over time. Sickness absence rates (particularly mental-health-related absence), EAP usage rates, staff turnover and retention rates, return-to-work success rates, and near-miss reporting figures are all quantitative KPIs. These should be supplemented with qualitative data such as staff survey feedback and anonymised MHFA interaction themes.",
  },
  {
    id: 8,
    question:
      "The Deloitte 2020 report found that the average return on investment for workplace mental health interventions was \u00a35 for every \u00a31 spent. Where does this return primarily come from?",
    options: [
      "Government subsidies and tax rebates for mental health programmes",
      "Reduced absenteeism, lower presenteeism, reduced staff turnover, and fewer workplace incidents",
      "Increased sales revenue from happier customers",
      "Savings on physical health and safety equipment",
    ],
    correctAnswer: 1,
    explanation:
      "The \u00a35 return on every \u00a31 invested comes primarily from four sources: reduced absenteeism (fewer days lost to mental health-related sickness), reduced presenteeism (employees who are present but not functioning at full capacity due to mental health issues), lower staff turnover (retaining experienced employees saves significant recruitment and training costs), and fewer workplace incidents (poor mental health is associated with reduced concentration and increased accident risk).",
  },
];

export default function MentalHealthModule5Section1() {
  useSEO({
    title:
      "Implementing MHFA in the Workplace | Mental Health Module 5.1",
    description:
      "Creating an MHFA programme, determining MHFA numbers, visibility and accessibility, integrating with H&S, Thriving at Work core standards, and measuring impact.",
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 mb-4">
            <Building2 className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Implementing MHFA in the Workplace
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            How to create, launch, and sustain a Mental Health First Aid
            programme &mdash; from securing management buy-in to measuring
            long-term impact
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
                <strong>ROI:</strong> &pound;5 return for every &pound;1
                invested (Deloitte 2020)
              </li>
              <li>
                <strong>Ratio:</strong> 1 MHFA per 10 employees as a
                starting point
              </li>
              <li>
                <strong>Standards:</strong> 6 Thriving at Work core
                standards for all employers
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Visibility:</strong> Lanyards, badges, posters,
                toolbox talks
              </li>
              <li>
                <strong>Integration:</strong> Add mental health to risk
                assessments &amp; inductions
              </li>
              <li>
                <strong>Measure:</strong> Absence, EAP usage, surveys,
                retention rates
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
              "Describe the key steps to implementing an MHFA programme in a workplace, from needs assessment to ongoing review",
              "Present the business case for mental health investment using the Deloitte 2020 ROI evidence",
              "Apply MHFA England guidance to determine how many MHFAs are needed for a given workforce",
              "Explain strategies for making MHFAs visible and accessible to all employees",
              "Describe how mental health should be integrated with existing health and safety arrangements",
              "List the 6 core standards from the Stevenson/Farmer \u2018Thriving at Work\u2019 review",
              "Identify appropriate KPIs for measuring the impact of a workplace mental health programme",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Creating an MHFA Programme */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            Creating an MHFA Programme
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Implementing a Mental Health First Aid programme is not simply
                a matter of sending a few people on a training course.
                A successful programme requires careful planning, organisational
                commitment, adequate resources, and a clear strategy for
                embedding mental health support into the culture of the
                workplace. Without these foundations, even the best-trained
                MHFAs will struggle to make an impact.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Steps to Implementation
                </p>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        1. Secure management buy-in
                      </strong>{" "}
                      &mdash; without visible support from senior leadership,
                      the programme will lack credibility, funding, and
                      organisational priority. Present the business case,
                      reference the legal duty of care under the Health and
                      Safety at Work etc. Act 1974, and highlight the
                      Deloitte ROI evidence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        2. Identify the need
                      </strong>{" "}
                      &mdash; conduct a baseline assessment of mental health
                      in the workplace. Review sickness absence data, staff
                      survey results, EAP usage, and turnover rates. Identify
                      specific risk factors in your workforce (e.g. shift
                      work, isolation, high-pressure deadlines, physical
                      demands)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        3. Select and train MHFAs
                      </strong>{" "}
                      &mdash; choose individuals who are genuinely interested,
                      approachable, trusted by colleagues, and representative
                      of the workforce in terms of age, gender, and
                      background. Ensure they attend the full two-day
                      MHFA England course with a licensed instructor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        4. Promote the programme
                      </strong>{" "}
                      &mdash; ensure every employee knows that the programme
                      exists, who the MHFAs are, and how to access support.
                      Use inductions, toolbox talks, posters, the intranet,
                      email communications, and team meetings to spread the
                      message
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        5. Maintain and review
                      </strong>{" "}
                      &mdash; the programme is not a one-off initiative. It
                      requires ongoing support, refresher training for MHFAs,
                      regular supervision sessions, data collection, and at
                      least an annual review to assess effectiveness and make
                      improvements
                    </span>
                  </li>
                </ul>
              </div>

              {/* Business Case Box */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    The Business Case for Mental Health Investment
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    The evidence for investing in workplace mental health is
                    now overwhelming. The Deloitte 2020 report{" "}
                    <em>
                      &lsquo;Mental Health and Employers: Refreshing the Case
                      for Investment&rsquo;
                    </em>{" "}
                    found that:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-400 mb-1">
                        &pound;5
                      </p>
                      <p className="text-xs text-white/60">
                        average return for every &pound;1 spent on mental
                        health interventions
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-400 mb-1">
                        &pound;45bn
                      </p>
                      <p className="text-xs text-white/60">
                        annual cost of poor mental health to UK employers
                        (2019 figures)
                      </p>
                    </div>
                  </div>
                  <p>
                    The return on investment comes from four main areas:{" "}
                    <strong className="text-white">
                      reduced absenteeism
                    </strong>{" "}
                    (fewer sick days),{" "}
                    <strong className="text-white">
                      reduced presenteeism
                    </strong>{" "}
                    (employees present but not functioning at full capacity),{" "}
                    <strong className="text-white">
                      lower staff turnover
                    </strong>{" "}
                    (retaining experienced workers saves recruitment and
                    training costs), and{" "}
                    <strong className="text-white">
                      fewer workplace incidents
                    </strong>{" "}
                    (poor mental health is linked to reduced concentration
                    and higher accident risk).
                  </p>
                </div>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-violet-400">
                    Construction Context:
                  </strong>{" "}
                  In the construction industry, where male suicide rates are
                  disproportionately high and the culture has historically
                  discouraged talking about feelings, an MHFA programme sends
                  a powerful signal that mental health matters. Organisations
                  like Mates in Mind, the Lighthouse Club, and CALM provide
                  construction-specific resources to support implementation.
                  The &lsquo;hard hat and hi-vis&rsquo; environment does not
                  have to mean a &lsquo;toughen up&rsquo; culture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: How Many MHFAs Are Needed? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            How Many MHFAs Are Needed?
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Determining the right number of Mental Health First Aiders
                is not a one-size-fits-all calculation. MHFA England provides
                a starting guideline, but the actual number must be tailored
                to the specific characteristics and risks of each workplace.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    MHFA England Guidance
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  <strong className="text-white">
                    1 trained MHFA per 10 employees
                  </strong>{" "}
                  is the recommended starting point. This mirrors the
                  traditional first aid ratio and ensures reasonable coverage
                  across a workforce. However, this is a{" "}
                  <strong className="text-white">minimum guideline</strong>,
                  not a maximum &mdash; many workplaces will need more,
                  depending on their specific circumstances.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Factors Affecting the Number of MHFAs Needed
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Shift patterns</strong>{" "}
                      &mdash; if the workforce operates across multiple
                      shifts, there must be at least one MHFA available on
                      every shift. A single MHFA who works 9&ndash;5 provides
                      no coverage for night shift workers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Multi-site working
                      </strong>{" "}
                      &mdash; organisations with multiple locations must have
                      MHFAs at each site. Centralised MHFAs at head office
                      do not help a worker on a remote construction site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Remote workers</strong>{" "}
                      &mdash; home workers and lone workers may need access
                      to MHFAs via phone or video call. Consider training
                      MHFAs in remote support techniques
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Nature of the work
                      </strong>{" "}
                      &mdash; high-stress, high-risk, or emotionally
                      demanding work may require a higher ratio of MHFAs.
                      Construction, emergency services, and healthcare are
                      examples of sectors where higher ratios are advisable
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Workforce demographics
                      </strong>{" "}
                      &mdash; a predominantly young male workforce (common
                      in construction) may have different mental health risk
                      factors and engagement preferences compared to a mixed
                      office-based workforce
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        MHFA availability
                      </strong>{" "}
                      &mdash; account for annual leave, sickness, and
                      staff turnover. Having exactly the minimum number
                      means coverage gaps when MHFAs are absent
                    </span>
                  </li>
                </ul>
              </div>

              {/* Construction Site Considerations */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Construction Site Considerations
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Construction sites present particular challenges for MHFA
                  coverage. Workers are spread across large areas, the
                  workforce changes as subcontractors come and go, and
                  many workers are self-employed or employed by subcontractors
                  rather than the main contractor. Best practice includes:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      At least one trained MHFA on every active site, regardless
                      of the headcount on that individual site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Encourage subcontractors to train their own MHFAs as
                      a condition of working on major projects
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Consider training supervisors and foremen, as they
                      have regular contact with all workers and can spot
                      changes in behaviour early
                    </span>
                  </li>
                </ul>
              </div>

              {/* MHFAs vs Champions */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <BadgeCheck className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Mental Health First Aider
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Completed the{" "}
                        <strong className="text-white">
                          full two-day (16-hour) MHFA England course
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Trained to recognise signs of mental ill health and
                        apply the ALGEE action plan
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Can provide initial support and guide towards
                        professional help
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                      <span>
                        Certificate valid for 3 years, refresher training
                        required
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <HeartHandshake className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Mental Health Champion
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Completed a{" "}
                        <strong className="text-white">
                          shorter awareness course (typically 1 day or half day)
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Equipped to raise awareness, reduce stigma, and
                        encourage open conversations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Not trained to deliver the full MHFA intervention
                        </strong>{" "}
                        &mdash; awareness role only
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                      <span>
                        Valuable alongside MHFAs to create a broader culture
                        of understanding
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Best Practice:
                  </strong>{" "}
                  The most effective approach combines both &mdash; a core
                  group of fully trained MHFAs (at the 1:10 ratio or higher)
                  supported by a wider network of Mental Health Champions
                  across the organisation. This creates multiple layers of
                  awareness and support. Champions can identify issues early
                  and signpost to MHFAs, who can then provide the trained
                  first aid response and signpost to professional services.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Visibility and Accessibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Visibility &amp; Accessibility
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                An MHFA programme can only be effective if employees know
                it exists, know who the MHFAs are, and feel comfortable
                approaching them. Visibility and accessibility are not
                optional extras &mdash; they are fundamental to the success
                of the programme.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    How Employees Know Who the MHFAs Are
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        MHFA lanyards and badges
                      </strong>{" "}
                      &mdash; the green MHFA England badge or lanyard is
                      instantly recognisable and signals that the wearer is
                      a trained Mental Health First Aider. On construction
                      sites, hard hat stickers and hi-vis identifiers serve
                      the same purpose
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Posters and notice boards
                      </strong>{" "}
                      &mdash; display the names, photos, and contact details
                      of MHFAs in communal areas: canteens, welfare units,
                      changing rooms, corridors, and site cabins. Include
                      information about what MHFAs do and how they can help
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Intranet and digital channels
                      </strong>{" "}
                      &mdash; a dedicated mental health page on the company
                      intranet listing all MHFAs with their contact details,
                      availability, and location. Regular features in
                      internal newsletters and email communications
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Toolbox talks and team briefings
                      </strong>{" "}
                      &mdash; MHFAs should introduce themselves at toolbox
                      talks and be present at site inductions for new
                      starters. Regular reminders during team meetings keep
                      the programme visible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Drop-in availability
                      </strong>{" "}
                      &mdash; where possible, establish regular drop-in
                      times and a quiet space where employees can speak to
                      an MHFA without needing to make a formal appointment
                      or attract attention
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Megaphone className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Being Approachable
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Visibility alone is not enough &mdash; MHFAs must also be
                  genuinely approachable. This means:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Being open and non-judgemental in all interactions,
                      not just when acting in the MHFA role
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Making time for people &mdash; not appearing too busy
                      or rushed to talk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Being discreet and maintaining confidentiality, so
                      that people trust them with sensitive information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      Proactively checking in with colleagues, rather than
                      waiting to be approached
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Diversity of MHFAs
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Consider the diversity of your MHFA team. People are more
                  likely to approach someone they feel understands their
                  experiences. Aim for a mix of{" "}
                  <strong className="text-white">
                    ages, genders, ethnic backgrounds, and seniority levels
                  </strong>.
                  A young apprentice may feel more comfortable speaking to
                  a peer than to a senior manager. Conversely, a manager
                  may prefer to speak to someone at a similar level. Having
                  a diverse MHFA team increases the likelihood that every
                  employee can find someone they feel comfortable approaching.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Integrating with Existing H&S */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Integrating with Existing Health &amp; Safety
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mental health should not exist as a standalone initiative,
                disconnected from the organisation&rsquo;s wider health and
                safety arrangements. The most effective approach is to embed
                mental health into the existing health and safety framework,
                ensuring it receives the same attention, governance, and
                systematic management as physical safety.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Integration Points
                  </p>
                </div>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Risk assessments
                      </strong>{" "}
                      &mdash; add psychosocial hazards to existing risk
                      assessments. Identify stressors such as excessive
                      workload, lack of control, poor relationships, role
                      ambiguity, change management, and inadequate support.
                      The HSE Management Standards provide a framework for
                      assessing these hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        H&amp;S committee involvement
                      </strong>{" "}
                      &mdash; make mental health a standing item on the
                      health and safety committee agenda. Include MHFA
                      programme updates, mental health incident data
                      (anonymised), and planned initiatives
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Inductions</strong>{" "}
                      &mdash; include mental health support information in
                      all new starter inductions, just as you include fire
                      safety, first aid, and emergency procedures. Introduce
                      MHFAs by name and explain how to access support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Toolbox talks and site briefings
                      </strong>{" "}
                      &mdash; incorporate mental health topics into the
                      regular toolbox talk schedule. Aim for at least one
                      mental health toolbox talk per quarter, covering topics
                      such as stress awareness, the five signs, and how to
                      support a colleague
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Reporting and monitoring
                      </strong>{" "}
                      &mdash; establish a confidential reporting mechanism
                      for mental health concerns, similar to near-miss
                      reporting for physical safety. Track trends,
                      hotspots, and the effectiveness of interventions
                      over time
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    HSE Management Standards
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The HSE Management Standards for work-related stress
                  identify six key areas of work design that, if not
                  properly managed, are associated with poor health,
                  lower productivity, and increased accident rates:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { title: "Demands", desc: "Workload, work patterns, and the work environment" },
                    { title: "Control", desc: "How much say a person has in the way they do their work" },
                    { title: "Support", desc: "Encouragement, sponsorship, and resources provided by the organisation and colleagues" },
                    { title: "Relationships", desc: "Promoting positive working, avoiding conflict and dealing with unacceptable behaviour" },
                    { title: "Role", desc: "Whether people understand their role and whether the organisation avoids conflicting roles" },
                    { title: "Change", desc: "How organisational change is managed and communicated" },
                  ].map((standard, i) => (
                    <div
                      key={i}
                      className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg"
                    >
                      <p className="text-xs font-medium text-purple-400 mb-0.5">
                        {standard.title}
                      </p>
                      <p className="text-xs text-white/60">
                        {standard.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Legal Context
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The{" "}
                  <strong className="text-white">
                    Health and Safety at Work etc. Act 1974
                  </strong>{" "}
                  places a duty on employers to ensure, so far as is
                  reasonably practicable, the health, safety, and welfare
                  of their employees. &lsquo;Health&rsquo; includes mental
                  health. The{" "}
                  <strong className="text-white">
                    Management of Health and Safety at Work Regulations 1999
                  </strong>{" "}
                  require employers to assess all risks to health &mdash;
                  again, including mental health. Integrating mental health
                  into existing H&amp;S systems is not just good practice;
                  it is a legal requirement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Thriving at Work Core Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Thriving at Work Core Standards
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 2017, the UK Government commissioned Lord Dennis Stevenson
                and Paul Farmer (CEO of Mind) to conduct an independent review
                of mental health and employers. The resulting report,{" "}
                <em>&lsquo;Thriving at Work&rsquo;</em>, set out a framework
                of core standards that all employers &mdash; regardless of
                size or sector &mdash; should implement as a minimum.
              </p>

              <p>
                The 6 core standards are designed to be achievable by every
                employer and form the foundation upon which more advanced
                (&lsquo;enhanced&rsquo;) standards can be built. For any
                organisation implementing an MHFA programme, these standards
                provide the strategic framework within which that programme
                should sit.
              </p>

              {/* Styled Diagram of 6 Core Standards */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 border-b border-purple-500/20 px-4 py-3">
                  <p className="text-sm font-semibold text-purple-400">
                    The 6 Core Standards &mdash; Stevenson/Farmer Review 2017
                  </p>
                  <p className="text-xs text-white/50 mt-0.5">
                    Minimum standards for all employers, regardless of size
                    or sector
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                  <div className="p-4 bg-[#1a1a1a]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 text-sm font-bold">
                          1
                        </span>
                      </div>
                      <p className="text-sm font-medium text-purple-400">
                        Mental Health Plan
                      </p>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Produce, implement, and communicate a mental health
                      at work plan that promotes good mental health of all
                      employees and outlines the support available for those
                      who may need it
                    </p>
                  </div>

                  <div className="p-4 bg-[#1a1a1a]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 text-sm font-bold">
                          2
                        </span>
                      </div>
                      <p className="text-sm font-medium text-purple-400">
                        Develop Awareness
                      </p>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Develop mental health awareness among employees by
                      making information, tools, and support accessible
                      to all, helping people understand mental health and
                      how to look after their own wellbeing
                    </p>
                  </div>

                  <div className="p-4 bg-[#1a1a1a]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-violet-400 text-sm font-bold">
                          3
                        </span>
                      </div>
                      <p className="text-sm font-medium text-violet-400">
                        Open Conversations
                      </p>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Encourage open conversations about mental health and
                      the support available when employees are struggling,
                      during the recruitment process, and at regular
                      intervals throughout employment
                    </p>
                  </div>

                  <div className="p-4 bg-[#1a1a1a]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-violet-400 text-sm font-bold">
                          4
                        </span>
                      </div>
                      <p className="text-sm font-medium text-violet-400">
                        Good Working Conditions
                      </p>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Provide employees with good working conditions and
                      ensure they have a healthy work-life balance and
                      opportunities for development, with a focus on
                      preventing stress and promoting wellbeing
                    </p>
                  </div>

                  <div className="p-4 bg-[#1a1a1a]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 text-sm font-bold">
                          5
                        </span>
                      </div>
                      <p className="text-sm font-medium text-purple-400">
                        Promote Wellbeing
                      </p>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Promote effective people management through line
                      managers and supervisors, ensuring they have the
                      knowledge, skills, and confidence to have sensitive
                      conversations and signpost to support
                    </p>
                  </div>

                  <div className="p-4 bg-[#1a1a1a]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 text-sm font-bold">
                          6
                        </span>
                      </div>
                      <p className="text-sm font-medium text-purple-400">
                        Monitor &amp; Signpost
                      </p>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Routinely monitor employee mental health and wellbeing
                      by understanding available data, talking to employees
                      regularly, and providing appropriate signposting to
                      support services
                    </p>
                  </div>
                </div>
              </div>

              {/* Core vs Enhanced Standards */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Core Standards vs Enhanced Standards
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The Thriving at Work review also outlined{" "}
                  <strong className="text-white">enhanced standards</strong>{" "}
                  for larger employers and the public sector. These build
                  upon the core standards and include:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Increasing transparency and accountability through
                      internal and external reporting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Demonstrating accountability by nominating a health
                      and wellbeing lead at board or senior leadership level
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Improving the disclosure process to make it easier
                      for employees to share information about their mental
                      health
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Ensuring provision of tailored in-house mental health
                      support and signposting to clinical help
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Key Point:
                  </strong>{" "}
                  The 6 core standards are intended as a{" "}
                  <strong>minimum starting point</strong>, not a ceiling.
                  The review emphasised that employers should aspire to go
                  beyond the core standards as their programmes mature. An
                  MHFA programme is one of the most tangible ways an employer
                  can demonstrate commitment to standards 2, 3, and 6 in
                  particular &mdash; developing awareness, encouraging
                  conversations, and providing signposting to support.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Measuring Impact */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Measuring Impact
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Any programme requires measurement to demonstrate its value,
                identify areas for improvement, and secure continued
                investment. Measuring the impact of a mental health programme
                requires a combination of quantitative data (numbers) and
                qualitative feedback (experiences and perceptions).
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-purple-500/10 border-b border-purple-500/20 px-4 py-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-semibold text-purple-400">
                      Quantitative KPIs
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-purple-400 flex-shrink-0" />
                        <p className="text-xs font-medium text-purple-400">
                          Sickness Absence
                        </p>
                      </div>
                      <p className="text-xs text-white/60">
                        Track total sickness absence and mental-health-specific
                        absence separately. Compare rates before and after
                        programme implementation. Monitor trends over time.
                      </p>
                    </div>
                    <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-purple-400 flex-shrink-0" />
                        <p className="text-xs font-medium text-purple-400">
                          EAP Usage
                        </p>
                      </div>
                      <p className="text-xs text-white/60">
                        Monitor the rate at which employees access the Employee
                        Assistance Programme. An initial increase may be
                        positive &mdash; it indicates people feel safe to
                        seek help.
                      </p>
                    </div>
                    <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-violet-400 flex-shrink-0" />
                        <p className="text-xs font-medium text-violet-400">
                          Staff Surveys
                        </p>
                      </div>
                      <p className="text-xs text-white/60">
                        Include questions on wellbeing, psychological safety,
                        and awareness of mental health support in annual or
                        pulse surveys. Track scores over time for meaningful
                        trends.
                      </p>
                    </div>
                    <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-violet-400 flex-shrink-0" />
                        <p className="text-xs font-medium text-violet-400">
                          Retention Rates
                        </p>
                      </div>
                      <p className="text-xs text-white/60">
                        Monitor staff turnover, particularly voluntary
                        resignations. Exit interviews should ask about
                        workplace wellbeing and mental health support
                        as factors in the decision to leave.
                      </p>
                    </div>
                    <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-purple-400 flex-shrink-0" />
                        <p className="text-xs font-medium text-purple-400">
                          Near-Miss Reporting
                        </p>
                      </div>
                      <p className="text-xs text-white/60">
                        Track near-miss and incident reporting rates. Improved
                        mental health is associated with better concentration,
                        improved risk awareness, and reduced accidents.
                      </p>
                    </div>
                    <div className="bg-purple-500/5 border border-purple-500/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="h-4 w-4 text-purple-400 flex-shrink-0" />
                        <p className="text-xs font-medium text-purple-400">
                          MHFA Interactions
                        </p>
                      </div>
                      <p className="text-xs text-white/60">
                        Log the number of MHFA interactions (anonymised).
                        Track common themes and referral destinations to
                        identify recurring issues and gaps in support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-5 w-5 text-violet-400" />
                  <p className="text-sm font-medium text-violet-400">
                    Qualitative Feedback
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Numbers alone do not tell the full story. Qualitative
                  feedback provides context, depth, and insight that
                  quantitative data cannot capture:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Feedback from MHFAs
                      </strong>{" "}
                      &mdash; what themes are emerging from conversations?
                      What barriers are people reporting? What support is
                      missing? MHFAs have a unique window into the lived
                      experience of the workforce
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Manager observations
                      </strong>{" "}
                      &mdash; are managers noticing changes in team morale,
                      openness, and willingness to seek support? Are
                      conversations about mental health becoming more
                      normalised?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Anonymised case studies
                      </strong>{" "}
                      &mdash; with appropriate consent and anonymisation,
                      real stories of how the MHFA programme helped an
                      individual can be powerful evidence of impact and
                      can encourage others to seek support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Focus groups
                      </strong>{" "}
                      &mdash; facilitated discussions with employees about
                      their experience of the programme, what is working,
                      and what could be improved
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Annual Review &amp; Continuous Improvement
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The MHFA programme should be formally reviewed at least
                  annually. The review should include:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Analysis of all quantitative KPIs compared to baseline
                      and previous years
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Review of qualitative feedback from MHFAs, managers,
                      and employees
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Assessment of MHFA coverage &mdash; are there enough
                      MHFAs? Are they distributed appropriately across sites,
                      shifts, and departments?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      MHFA wellbeing check &mdash; are the MHFAs themselves
                      receiving adequate support and supervision?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Identification of gaps in support and action plan for
                      the following year
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                    <span>
                      Progress against the Thriving at Work core standards
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Important: Interpreting the Data
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Be careful when interpreting early data. An{" "}
                  <strong className="text-white">
                    initial increase in people seeking help
                  </strong>{" "}
                  is typically a{" "}
                  <strong className="text-white">positive sign</strong>,
                  not a negative one. It means employees feel safe enough
                  to come forward, which is the whole point of the programme.
                  Similarly, an increase in EAP referrals or MHFA interactions
                  in the first year suggests the programme is reaching people
                  who previously had no support. Over time, as the programme
                  matures, you should see improvements in absence rates,
                  survey scores, and retention &mdash; but this may take 18
                  to 24 months to become visible in the data.
                </p>
              </div>

              {/* Continuous Improvement Cycle */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-violet-500/10 border-b border-violet-500/20 px-4 py-2">
                  <p className="text-sm font-semibold text-violet-400">
                    Continuous Improvement Cycle
                  </p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-purple-400 text-lg font-bold">
                          1
                        </span>
                      </div>
                      <p className="text-xs font-medium text-purple-400 mb-0.5">
                        Plan
                      </p>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Set objectives, identify KPIs, establish baseline
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-purple-400 text-lg font-bold">
                          2
                        </span>
                      </div>
                      <p className="text-xs font-medium text-purple-400 mb-0.5">
                        Do
                      </p>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Implement programme, train MHFAs, promote and embed
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-violet-400 text-lg font-bold">
                          3
                        </span>
                      </div>
                      <p className="text-xs font-medium text-violet-400 mb-0.5">
                        Check
                      </p>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Collect data, review KPIs, gather qualitative feedback
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-2">
                        <span className="text-violet-400 text-lg font-bold">
                          4
                        </span>
                      </div>
                      <p className="text-xs font-medium text-violet-400 mb-0.5">
                        Act
                      </p>
                      <p className="text-[11px] text-white/50 leading-relaxed">
                        Identify improvements, update plan, repeat the cycle
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-white/40 text-center mt-3">
                    Based on the Plan&ndash;Do&ndash;Check&ndash;Act (PDCA)
                    continuous improvement model
                  </p>
                </div>
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-5-section-2">
              Next: Signposting &amp; Support Services
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
