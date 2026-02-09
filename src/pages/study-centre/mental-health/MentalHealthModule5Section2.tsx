import {
  ArrowLeft,
  CheckCircle,
  Phone,
  Heart,
  Building2,
  ShieldCheck,
  AlertTriangle,
  Signpost,
  Users,
  Stethoscope,
  HardHat,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "nhs-talking-therapies-referral",
    question:
      "A colleague tells you they have been struggling with anxiety for weeks but does not want to 'bother their GP.' They ask if there is any other way to get help through the NHS. What do you tell them?",
    options: [
      "They must see their GP first before they can access any NHS mental health service",
      "They can self-refer directly to NHS Talking Therapies (formerly IAPT) without needing a GP referral",
      "They need to go to A&E to be assessed for anxiety",
      "NHS mental health services are only available for people with severe conditions like psychosis",
    ],
    correctIndex: 1,
    explanation:
      "NHS Talking Therapies (formerly known as IAPT \u2014 Improving Access to Psychological Therapies) accepts self-referrals. Anyone aged 18 or over can refer themselves directly, without needing a GP appointment first. The service offers evidence-based treatments including cognitive behavioural therapy (CBT) for conditions such as anxiety, depression, phobias, and PTSD. This is one of the most important signposting facts for a Mental Health First Aider to know, because many people are unaware they can bypass the GP gatekeeping step for talking therapies.",
  },
  {
    id: "crisis-number-priority",
    question:
      "You are on site and a colleague tells you they are going to end their life tonight. They have a plan. Which number should you call first?",
    options: [
      "Samaritans (116 123) \u2014 they are the main suicide prevention charity",
      "NHS 111, option 2 \u2014 for urgent mental health support",
      "999 \u2014 there is an immediate risk to life",
      "The Lighthouse Club helpline (0345 605 1956) \u2014 a construction industry service",
    ],
    correctIndex: 2,
    explanation:
      "When someone has disclosed a plan to end their life and there is immediate risk to life, call 999. This is a medical emergency. Samaritans provide invaluable emotional support, and NHS 111 option 2 is appropriate for urgent (but not immediately life-threatening) mental health crises, but when someone has a specific plan and the intent to act on it imminently, emergency services are the correct first response. Stay with the person, remove means of harm if safe to do so, and keep them talking until help arrives.",
  },
  {
    id: "eap-signposting",
    question:
      "A colleague confides that they are going through a difficult divorce and it is affecting their concentration on site. They do not think they need a therapist but mention money worries and feeling overwhelmed. What single resource covers the widest range of their needs?",
    options: [
      "Suggest they call Samaritans for a listening ear",
      "Recommend they ask their employer about the Employee Assistance Programme (EAP), which typically covers counselling, legal advice, and financial guidance",
      "Tell them to speak to their GP about antidepressants",
      "Suggest they contact Mind for information about anxiety",
    ],
    correctIndex: 1,
    explanation:
      "Employee Assistance Programmes (EAPs) are one of the most underused workplace resources. Most EAPs offer free, confidential support covering counselling, legal advice, financial guidance, and family issues \u2014 all under one service, typically available 24/7. For someone dealing with relationship breakdown, money worries, and work stress simultaneously, the EAP is the single resource that addresses the widest range of needs. As an MHFA, knowing about and actively signposting to EAPs is one of your most practical tools.",
  },
];

const faqs = [
  {
    question:
      "What is the difference between NHS Talking Therapies and a Community Mental Health Team (CMHT)?",
    answer:
      "NHS Talking Therapies (formerly IAPT) provides treatment for common mental health conditions such as anxiety, depression, OCD, PTSD, and phobias. It is a high-volume, relatively short-wait service that accepts self-referrals and primarily delivers talking therapies such as CBT. Community Mental Health Teams (CMHTs), by contrast, support people with more severe and enduring mental health conditions \u2014 such as schizophrenia, bipolar disorder, personality disorders, and complex PTSD. CMHTs are multidisciplinary teams including psychiatrists, community psychiatric nurses (CPNs), social workers, and occupational therapists. Access to a CMHT usually requires a GP or specialist referral, and the team provides ongoing, longer-term care. As an MHFA, you would typically signpost to NHS Talking Therapies for common conditions and mention CMHTs only when someone is already under secondary care or has a known severe condition.",
  },
  {
    question:
      "Can I call the Samaritans on behalf of someone else, or do they only speak to the person in distress?",
    answer:
      "You can absolutely call Samaritans (116 123) on behalf of someone else, or to get advice about how to support someone you are worried about. Samaritans are there for anyone who is struggling \u2014 including people who are worried about someone else. You do not need to be suicidal or in crisis to contact them. You can also email them at jo@samaritans.org (response times are typically within 24 hours) or visit a local Samaritans branch in person. The service is available 24 hours a day, 365 days a year, and calls are free from any phone. They operate on a principle of non-judgement and confidentiality, and will listen without pressuring you to take any particular action.",
  },
  {
    question:
      "What should I do if someone does not want to contact any service I suggest?",
    answer:
      "Respect their autonomy. As an MHFA, your role is to signpost \u2014 not to force. If someone does not want to contact a service, do not pressure them. Instead, acknowledge their feelings ('I understand you are not ready for that right now'), leave the door open ('If you change your mind, I can help you make that call'), and gently provide the information in a low-pressure way (for example, writing a number on a card rather than making them call in front of you). Continue to check in on them regularly. Sometimes it takes multiple conversations before someone feels ready to seek help. If you believe someone is in immediate danger, that changes the situation \u2014 you may need to call emergency services even if the person does not want you to.",
  },
  {
    question:
      "Are Employee Assistance Programmes (EAPs) really confidential? Can my employer find out I used one?",
    answer:
      "Yes, EAPs are genuinely confidential. The EAP provider is a separate, independent organisation and is bound by data protection law (UK GDPR) and professional confidentiality obligations. Your employer pays for the service but does not receive any information about who uses it or what issues they discuss. The employer typically receives only anonymised, aggregated usage data (for example, '47 employees used the service this quarter, and the most common issue was workplace stress'). No individual is ever identified. The only exception to confidentiality is if there is a serious and imminent risk to life \u2014 the same exception that applies to all healthcare professionals. This is one of the most common barriers to EAP usage: people assume their employer will find out. As an MHFA, reassuring people about confidentiality is one of the most helpful things you can do when signposting to an EAP.",
  },
  {
    question:
      "What is Section 136 and should I be worried if police attend a mental health crisis?",
    answer:
      "Section 136 of the Mental Health Act 1983 gives police officers the power to take a person from a public place to a place of safety if they appear to be suffering from a mental disorder and are in immediate need of care or control. The purpose is protective, not punitive \u2014 it is designed to ensure the person receives a mental health assessment. The place of safety is usually a designated suite in a hospital (sometimes called a Section 136 suite or health-based place of safety), not a police cell. The person must be assessed by a doctor and an approved mental health professional within 24 hours. If police attend a mental health crisis on site, they are there to help, not to arrest. Understanding this can help you reassure a colleague who may be frightened by the presence of police during a crisis.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which NHS service can be accessed by self-referral, without a GP appointment, for conditions such as anxiety and depression?",
    options: [
      "Community Mental Health Team (CMHT)",
      "Crisis Resolution and Home Treatment Team",
      "NHS Talking Therapies (formerly IAPT)",
      "Inpatient psychiatric services",
    ],
    correctAnswer: 2,
    explanation:
      "NHS Talking Therapies (formerly IAPT \u2014 Improving Access to Psychological Therapies) is the main NHS service that accepts self-referrals for common mental health conditions. Adults aged 18 and over can refer themselves directly via the NHS website or by contacting their local service. It provides evidence-based talking therapies including CBT, counselling, and guided self-help for anxiety, depression, OCD, phobias, and PTSD.",
  },
  {
    id: 2,
    question:
      "A colleague is experiencing a mental health crisis but is not in immediate physical danger. Which is the most appropriate number to call?",
    options: [
      "999",
      "NHS 111, then select the mental health option (option 2)",
      "Samaritans (116 123)",
      "Their GP surgery",
    ],
    correctAnswer: 1,
    explanation:
      "NHS 111 with the mental health option (option 2) is the most appropriate service for an urgent mental health crisis that is not immediately life-threatening. It connects callers to trained mental health professionals who can provide immediate telephone support and arrange further care, including referral to a crisis team if needed. 999 is for immediate danger to life, Samaritans provides emotional listening support, and a GP surgery is not appropriate for an acute crisis.",
  },
  {
    id: 3,
    question:
      "What standardised questionnaire is commonly used by GPs to assess the severity of depression?",
    options: [
      "GAD-7",
      "PHQ-9",
      "AUDIT-C",
      "CAGE",
    ],
    correctAnswer: 1,
    explanation:
      "The PHQ-9 (Patient Health Questionnaire-9) is the standard screening and severity measure for depression used in primary care across the NHS. It consists of 9 questions scored 0\u20133, giving a total score of 0\u201327. Scores of 5, 10, 15, and 20 represent the thresholds for mild, moderate, moderately severe, and severe depression respectively. The GAD-7 is used for anxiety, AUDIT-C for alcohol, and CAGE is an older alcohol screening tool.",
  },
  {
    id: 4,
    question:
      "Which construction-specific charity provides a dedicated helpline (0345 605 1956) offering emotional, financial, and legal support to construction workers and their families?",
    options: [
      "Mates in Mind",
      "Building Mental Health",
      "Lighthouse Club Construction Industry Charity",
      "CITB (Construction Industry Training Board)",
    ],
    correctAnswer: 2,
    explanation:
      "The Lighthouse Club is the construction industry's dedicated charity, operating a 24/7 helpline (0345 605 1956) that provides free, confidential emotional, financial, and legal support to construction workers and their families. Mates in Mind is an awareness and training programme, Building Mental Health is a framework for managing mental health on projects, and CITB is the sector training board.",
  },
  {
    id: 5,
    question:
      "What does the text service SHOUT offer, and how do you access it?",
    options: [
      "Legal advice for workers \u2014 email advice@shout.org",
      "24/7 crisis text support \u2014 text 'SHOUT' to 85258",
      "Financial hardship grants \u2014 apply online at shout.org.uk",
      "Bereavement counselling \u2014 call 0800 123 4567",
    ],
    correctAnswer: 1,
    explanation:
      "SHOUT is the UK's first 24/7 crisis text service. Anyone experiencing a mental health crisis or emotional distress can text the word 'SHOUT' to 85258 to be connected with a trained volunteer. It is free on all major mobile networks. This is particularly valuable for people who find it difficult to talk on the phone \u2014 including younger workers, people in shared spaces with no privacy, or those who feel more comfortable communicating by text.",
  },
  {
    id: 6,
    question:
      "Which of the following is NOT typically covered by an Employee Assistance Programme (EAP)?",
    options: [
      "Short-term counselling",
      "Legal advice",
      "Long-term psychiatric medication management",
      "Financial guidance",
    ],
    correctAnswer: 2,
    explanation:
      "EAPs typically cover short-term counselling (usually 6\u20138 sessions), legal advice, financial guidance, family and relationship support, and manager consultations. They do NOT provide long-term psychiatric medication management, which falls under GP and secondary mental health care. EAPs are designed as an early-intervention, short-term support service that can help people before problems escalate, or signpost them to longer-term services when needed.",
  },
  {
    id: 7,
    question:
      "A colleague mentions they are struggling but asks you not to tell anyone. Under what circumstance would you need to break that confidence?",
    options: [
      "If they have been off work for more than two weeks",
      "If you think their manager should know",
      "If there is a serious and imminent risk to their life or someone else's life",
      "If their work performance has declined",
    ],
    correctAnswer: 2,
    explanation:
      "Confidentiality is a cornerstone of the MHFA role, but it has one clear boundary: if there is a serious and imminent risk to the person's life or someone else's life, you must act. This may mean calling 999, informing a first aider, or alerting a manager about an immediate safety concern. Poor performance, absence, or a manager 'needing to know' are NOT reasons to break confidence. Always explain to the person why you need to act and, wherever possible, involve them in decisions about who to tell.",
  },
  {
    id: 8,
    question:
      "CALM (Campaign Against Living Miserably) primarily focuses on which demographic, and what is their helpline number?",
    options: [
      "Women over 50 \u2014 0800 58 58 58",
      "People of all ages and genders who are struggling or in crisis \u2014 0800 58 58 58",
      "Construction workers only \u2014 0345 605 1956",
      "Young people under 25 \u2014 0800 068 4141",
    ],
    correctAnswer: 1,
    explanation:
      "CALM (Campaign Against Living Miserably) was originally founded to address the high rate of male suicide in the UK, but now supports people of all ages and genders who are struggling, in crisis, or thinking about suicide. Their helpline (0800 58 58 58) is open 5pm\u2013midnight every day, and their webchat is available at thecalmzone.net. CALM's messaging is particularly effective at reaching men who may be reluctant to seek help through traditional services.",
  },
];

export default function MentalHealthModule5Section2() {
  useSEO({
    title:
      "Signposting & Support Services | Mental Health First Aid Module 5.2",
    description:
      "NHS mental health services, GP pathway, crisis services, voluntary sector helplines, construction-specific support, and Employee Assistance Programmes for Mental Health First Aiders.",
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
            <Signpost className="h-7 w-7 text-purple-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 mx-auto">
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 5 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Signposting &amp; Support Services
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Knowing where to direct someone for help is one of the most
            practical skills a Mental Health First Aider can have &mdash; this
            section covers the full landscape from NHS services to
            construction-specific charities
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
                <strong>NHS Talking Therapies:</strong> Self-refer for anxiety,
                depression, OCD, PTSD &mdash; no GP needed
              </li>
              <li>
                <strong>Crisis:</strong> 999 for immediate danger, NHS 111
                option 2 for urgent mental health
              </li>
              <li>
                <strong>Text support:</strong> Text SHOUT to 85258 for 24/7
                crisis text line
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Construction helpline:</strong> Lighthouse Club 0345
                605 1956 &mdash; emotional, financial &amp; legal support
              </li>
              <li>
                <strong>EAP:</strong> Most employers provide free, confidential
                counselling &mdash; ask HR
              </li>
              <li>
                <strong>Samaritans:</strong> 116 123, free, 24/7, for anyone
                struggling
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
              "Describe the key NHS mental health services and how to access them, including self-referral to Talking Therapies",
              "Explain the GP pathway for mental health, including PHQ-9 and GAD-7 assessments",
              "Identify the correct service to contact in a mental health crisis and prioritise accordingly",
              "List the major voluntary sector organisations and their contact details",
              "Signpost to construction-specific services including the Lighthouse Club and Mates in Mind",
              "Explain what Employee Assistance Programmes (EAPs) offer and how to encourage their use",
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

        {/* Section 01: NHS Mental Health Services */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            NHS Mental Health Services
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The NHS provides a wide range of mental health services, from
                talking therapies for common conditions like anxiety and
                depression through to specialist inpatient care for severe mental
                illness. Understanding the structure of these services helps you
                signpost people to the right place, reducing frustration and
                delays.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="h-5 w-5 text-purple-400" />
                  <p className="text-base font-semibold text-purple-400">
                    NHS Talking Therapies (Formerly IAPT)
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    NHS Talking Therapies (previously known as IAPT &mdash;
                    Improving Access to Psychological Therapies) is the NHS's
                    flagship programme for treating common mental health
                    conditions. It provides evidence-based talking therapies
                    including <strong className="text-white">cognitive behavioural therapy (CBT)</strong>,
                    counselling, interpersonal therapy, and guided self-help.
                  </p>
                  <p>
                    <strong className="text-purple-400">
                      Self-referral is available:
                    </strong>{" "}
                    Anyone aged 18 or over in England can refer themselves
                    directly to their local NHS Talking Therapies service
                    without needing a GP referral. This is done online through
                    the NHS website or by contacting the local service directly.
                    This is one of the most important facts for an MHFA to know,
                    because many people believe they must see their GP first.
                  </p>
                  <p>
                    <strong className="text-white">Conditions treated:</strong>{" "}
                    Depression, generalised anxiety disorder (GAD), social
                    anxiety, panic disorder, OCD, PTSD, phobias, health anxiety,
                    and body dysmorphic disorder.
                  </p>
                  <p>
                    <strong className="text-white">Waiting times:</strong>{" "}
                    The NHS Constitution sets a target of 6 weeks from referral
                    to first treatment, with a maximum wait of 18 weeks.
                    However, waits vary significantly by area. If the wait is
                    long, people can explore other options in parallel (voluntary
                    sector, EAP, private therapy) while remaining on the NHS
                    waiting list.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Other NHS Mental Health Services
                </p>
                <div className="space-y-3">
                  {[
                    {
                      service: "Community Mental Health Teams (CMHTs)",
                      detail:
                        "Multidisciplinary teams (psychiatrists, CPNs, social workers, OTs) providing ongoing care for people with severe and enduring mental health conditions such as schizophrenia, bipolar disorder, and complex PTSD. Access is by GP or specialist referral.",
                    },
                    {
                      service:
                        "Crisis Resolution and Home Treatment Teams (CRHTTs)",
                      detail:
                        "Provide intensive, short-term support to people experiencing a mental health crisis in their own home, as an alternative to hospital admission. Typically available 24/7. Referral is usually through a GP, A&E, NHS 111, or a CMHT.",
                    },
                    {
                      service: "Inpatient Services",
                      detail:
                        "Psychiatric hospital admission for people who cannot be safely managed in the community. Admission may be voluntary or under the Mental Health Act (sectioning). These are for the most acute and severe presentations.",
                    },
                    {
                      service: "NHS 111 Mental Health Option",
                      detail:
                        "Calling NHS 111 and selecting option 2 connects you to trained mental health professionals who can provide immediate telephone support and arrange crisis care. This is the correct route for urgent (but not immediately life-threatening) mental health crises.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 p-3 rounded-lg"
                    >
                      <p className="text-sm font-medium text-purple-300 mb-1">
                        {item.service}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Navigating NHS Waiting Times:
                  </strong>{" "}
                  Waiting for NHS mental health treatment can be frustrating and
                  demoralising. As an MHFA, you can help by reassuring the
                  person that being on a waiting list <strong>does not</strong>{" "}
                  mean their condition is not being taken seriously, encouraging
                  them to access voluntary sector support or their EAP while
                  they wait, and reminding them they can contact NHS 111 (option
                  2) if their condition worsens. If someone is deteriorating
                  while waiting, their GP can request an urgent or priority
                  assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: GP Pathway */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            GP Pathway
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                For many people, the GP (general practitioner) is the first
                point of contact for mental health concerns. GPs act as
                gatekeepers to most NHS mental health services and can provide
                direct treatment for common conditions. Understanding what
                happens at a GP mental health appointment can help you
                prepare someone and reduce their anxiety about attending.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4">
                  What Happens at a GP Mental Health Appointment
                </p>
                <div className="space-y-2">
                  {[
                    "The GP will ask about symptoms, their duration, and their impact on daily life and work",
                    "They will usually complete standardised questionnaires \u2014 the PHQ-9 (Patient Health Questionnaire-9) for depression and the GAD-7 (Generalised Anxiety Disorder-7) for anxiety",
                    "The PHQ-9 scores 0\u201327: mild (5\u20139), moderate (10\u201314), moderately severe (15\u201319), severe (20\u201327). The GAD-7 scores 0\u201321: mild (5\u20139), moderate (10\u201314), severe (15\u201321)",
                    "Based on the assessment, the GP may recommend self-help resources, refer to NHS Talking Therapies, prescribe medication (typically SSRIs for anxiety/depression), or refer to specialist services",
                    "The GP can issue a fit note (formerly sick note) and recommend reasonable workplace adjustments such as phased return, reduced hours, or temporary redeployment",
                    "Follow-up appointments are typically scheduled at 2\u20134 week intervals to monitor progress, particularly if medication has been started",
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

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  Encouraging Someone to Visit Their GP
                </p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Many people are reluctant to see their GP about mental
                    health. Common barriers include embarrassment, fear of being
                    judged, concern about being prescribed medication they do not
                    want, worry about it affecting their job, and not feeling
                    &ldquo;ill enough&rdquo; to warrant a GP visit.
                  </p>
                  <p>
                    As an MHFA, you can help by normalising the visit
                    (&ldquo;GPs see people for mental health every day &mdash;
                    it is one of the most common reasons for appointments&rdquo;),
                    explaining what will happen (reducing uncertainty),
                    reassuring them about confidentiality, and offering practical
                    support (&ldquo;Would it help if I sat with you while you
                    made the call?&rdquo;). Never promise outcomes or give
                    medical advice.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Fit Notes &amp; Workplace Adjustments
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    A GP can issue a <strong className="text-white">fit note</strong>{" "}
                    (Statement of Fitness for Work) if someone is unable to work
                    or needs adjustments due to their mental health. The fit note
                    has two options: &ldquo;not fit for work&rdquo; or &ldquo;may
                    be fit for work&rdquo; with recommended adjustments.
                  </p>
                  <p>
                    Common adjustments for mental health include phased return to
                    work, amended duties, altered hours, workplace support, and
                    regular check-ins with a manager. Under the Equality Act
                    2010, employers have a duty to make reasonable adjustments
                    for employees with disabilities, which can include long-term
                    mental health conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Crisis Services */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Crisis Services
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Knowing which service to contact in a mental health crisis
                &mdash; and in what order of priority &mdash; is one of the
                most critical skills for a Mental Health First Aider.
                Different situations require different responses, and using
                the right service ensures the fastest and most appropriate
                help.
              </p>

              {/* Crisis Priority Ladder */}
              <div className="bg-red-500/10 border border-red-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <p className="text-lg font-semibold text-red-400">
                    Crisis Services Priority
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      level: "IMMEDIATE DANGER",
                      number: "999",
                      colour: "red",
                      detail:
                        "Call 999 when there is an immediate risk to life \u2014 someone is actively attempting suicide, has seriously self-harmed, is unconscious, has taken an overdose, or is posing an immediate threat to themselves or others. Ask for Ambulance. In some areas, police may also attend under Section 136 powers if the person is in a public place.",
                    },
                    {
                      level: "URGENT CRISIS",
                      number: "NHS 111 (option 2)",
                      colour: "amber",
                      detail:
                        "For urgent mental health crises that are not immediately life-threatening \u2014 someone in severe distress, experiencing psychotic symptoms, expressing suicidal thoughts without immediate intent, or needing urgent professional assessment. Connects to trained mental health professionals.",
                    },
                    {
                      level: "CRISIS SUPPORT",
                      number: "Crisis teams / A&E",
                      colour: "yellow",
                      detail:
                        "Crisis Resolution and Home Treatment Teams can provide intensive support at home. A&E departments can assess and provide immediate psychiatric care for walk-in mental health emergencies. Some areas also have crisis cafes and safe havens \u2014 community spaces staffed by trained workers where people can go for support without a formal referral.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border ${
                        item.colour === "red"
                          ? "bg-red-500/10 border-red-500/30"
                          : item.colour === "amber"
                          ? "bg-amber-500/10 border-amber-500/30"
                          : "bg-yellow-500/10 border-yellow-500/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            item.colour === "red"
                              ? "bg-red-500/20 text-red-400"
                              : item.colour === "amber"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {item.level}
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            item.colour === "red"
                              ? "text-red-300"
                              : item.colour === "amber"
                              ? "text-amber-300"
                              : "text-yellow-300"
                          }`}
                        >
                          {item.number}
                        </span>
                      </div>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Section 136 &mdash; Police Powers for Mental Health
                </p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    Section 136 of the Mental Health Act 1983 gives police
                    officers the power to take a person from a{" "}
                    <strong className="text-white">public place</strong> to a
                    place of safety if they appear to be suffering from a mental
                    disorder and are in immediate need of care or control. The
                    purpose is protective &mdash; it ensures the person receives
                    a mental health assessment within 24 hours.
                  </p>
                  <p>
                    The place of safety is usually a designated suite in a
                    hospital (a &ldquo;Section 136 suite&rdquo;), not a police
                    cell. If police attend a mental health incident on site,
                    they are there to help and to ensure safety &mdash; not to
                    arrest or criminalise the person. Understanding this helps
                    you reassure colleagues who may be frightened by police
                    involvement during a crisis.
                  </p>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-2">
                  Crisis Cafes &amp; Safe Havens
                </p>
                <p className="text-sm text-white/80">
                  A growing number of areas now offer <strong className="text-white">crisis cafes</strong>{" "}
                  and <strong className="text-white">safe havens</strong>{" "}
                  &mdash; community-based spaces, often open in the evenings
                  and at weekends, where people experiencing a mental health
                  crisis can walk in without an appointment or referral. They
                  are staffed by trained mental health workers and provide a
                  calm, supportive environment as an alternative to A&amp;E.
                  Check your local area for availability &mdash; the NHS website
                  and local Mind branches can help you find what is available
                  near you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Voluntary Sector */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Voluntary Sector Organisations
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The voluntary sector provides a vital safety net alongside NHS
                services. Many of these organisations offer immediate,
                free, confidential support without waiting lists or referrals.
                As an MHFA, knowing the key organisations and their contact
                details by heart is essential &mdash; you may need to
                signpost someone in a moment when they cannot easily search for
                information themselves.
              </p>

              {/* Helpline Directory Diagram */}
              <div className="bg-purple-500/10 border border-purple-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-6 w-6 text-purple-400" />
                  <p className="text-lg font-semibold text-purple-400">
                    Key Helplines Directory
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      name: "Samaritans",
                      contact: "116 123 (free, 24/7)",
                      alt: "Email: jo@samaritans.org",
                      desc: "Emotional support for anyone struggling or in distress. Non-judgmental listening.",
                      accent: "violet",
                    },
                    {
                      name: "CALM",
                      contact: "0800 58 58 58 (5pm\u2013midnight)",
                      alt: "Webchat: thecalmzone.net",
                      desc: "Campaign Against Living Miserably. Support for anyone in crisis. Originally focused on male suicide prevention.",
                      accent: "blue",
                    },
                    {
                      name: "Mind",
                      contact: "0300 123 3393 (Mon\u2013Fri 9am\u20136pm)",
                      alt: "Email: info@mind.org.uk",
                      desc: "Information, advice, and local support services for all mental health conditions.",
                      accent: "green",
                    },
                    {
                      name: "Papyrus HOPELINEUK",
                      contact: "0800 068 4141 (9am\u2013midnight)",
                      alt: "Text: 07860 039967",
                      desc: "Prevention of young suicide (under 35). Support for young people with thoughts of suicide.",
                      accent: "amber",
                    },
                    {
                      name: "SHOUT",
                      contact: "Text SHOUT to 85258 (24/7)",
                      alt: "Free on all major networks",
                      desc: "UK's first 24/7 crisis text service. For anyone in crisis or emotional distress who prefers texting.",
                      accent: "purple",
                    },
                    {
                      name: "Anxiety UK",
                      contact: "03444 775 774 (Mon\u2013Fri 9:30am\u201317:30)",
                      alt: "Text: 07537 416 905",
                      desc: "Support and treatment access for anxiety, OCD, phobias, and related conditions.",
                      accent: "teal",
                    },
                    {
                      name: "Rethink Mental Illness",
                      contact: "0808 801 0525 (Mon\u2013Fri 9:30am\u201316:00)",
                      alt: "Email: advice@rethink.org",
                      desc: "Advice and support for people with severe mental illness and their carers.",
                      accent: "rose",
                    },
                    {
                      name: "Young Minds",
                      contact: "Parents helpline: 0808 802 5544",
                      alt: "For young people: text YM to 85258",
                      desc: "Support for children and young people's mental health and for parents/carers.",
                      accent: "orange",
                    },
                  ].map((org, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 p-3 rounded-lg"
                    >
                      <p className="text-sm font-bold text-purple-300 mb-1">
                        {org.name}
                      </p>
                      <p className="text-xs font-semibold text-violet-400 mb-0.5">
                        {org.contact}
                      </p>
                      <p className="text-[11px] text-white/50 mb-1.5">
                        {org.alt}
                      </p>
                      <p className="text-xs text-white/70">{org.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Tip for MHFAs:
                  </strong>{" "}
                  Consider keeping a small card or note in your wallet with the
                  key helpline numbers. In a crisis, you may not have time to
                  search online. At minimum, memorise{" "}
                  <strong>Samaritans (116 123)</strong> and{" "}
                  <strong>SHOUT (text 85258)</strong> &mdash; these two cover
                  phone and text support, both available 24/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Construction-Specific Services */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Construction-Specific Services
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction industry has one of the highest rates of
                suicide of any sector in the UK &mdash; approximately two
                construction workers take their own lives every working day.
                Recognising this crisis, several organisations provide
                services specifically tailored to the needs of construction
                workers and their families.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Mates in Mind */}
                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Mates in Mind
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        A leading UK charity raising awareness and addressing
                        the stigma of poor mental health in the construction
                        and related industries
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Provides training, resources, and a framework for
                        organisations to improve workplace mental health
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Partners with major construction firms and trade bodies
                        to create systemic change
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Focuses on awareness, understanding, and creating
                        cultures where people feel able to talk about mental
                        health
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Lighthouse Club */}
                <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Lighthouse Club (0345 605 1956)
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The construction industry&rsquo;s dedicated charity,
                        operating a{" "}
                        <strong className="text-white">
                          24/7 helpline (0345 605 1956)
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Provides free, confidential emotional, financial, and
                        legal support to construction workers and their
                        families
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Can help with financial hardship, debt advice,
                        bereavement, family breakdown, and mental health
                        support
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Also offers emergency financial grants for
                        construction workers facing crisis
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Building Mental Health */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Building Mental Health Framework
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        A practical framework for managing mental health on
                        construction projects, developed by the Construction
                        Leadership Council
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Provides clear, free guidance on identifying and
                        supporting workers with mental health needs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Includes toolbox talk resources, posters, and an
                        online assessment tool for organisations
                      </span>
                    </li>
                  </ul>
                </div>

                {/* CITB */}
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <HardHat className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      CITB Mental Health Resources
                    </p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The Construction Industry Training Board (CITB)
                        provides mental health awareness training and
                        resources
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Offers funded training courses including mental health
                        awareness for construction supervisors and managers
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The Construction Industry Helpline provides support
                        for a range of personal and professional issues
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Why Construction-Specific Matters:
                  </strong>{" "}
                  Construction workers are more likely to engage with services
                  that understand their industry. The culture of construction
                  &mdash; long hours, physical demands, job insecurity, time
                  away from home, and a traditionally stoic &ldquo;get on with
                  it&rdquo; attitude &mdash; creates unique pressures. Services
                  like the Lighthouse Club and Mates in Mind understand these
                  pressures and tailor their support accordingly. As an MHFA on
                  a construction site, always mention these alongside generic
                  services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Employee Assistance Programmes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Employee Assistance Programmes (EAPs)
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Employee Assistance Programmes (EAPs) are one of the most
                underused resources in the workplace. Most medium and large
                employers provide one, but research consistently shows that
                the majority of employees either do not know their
                organisation has an EAP, or do not understand what it offers.
                As an MHFA, actively signposting to EAPs is one of the most
                practical things you can do.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 sm:p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-purple-400" />
                  <p className="text-base font-semibold text-purple-400">
                    What EAPs Typically Offer
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      area: "Counselling",
                      detail:
                        "Short-term counselling (typically 6\u20138 sessions per issue per year), delivered by qualified counsellors. Covers stress, anxiety, depression, bereavement, trauma, relationship difficulties, and more.",
                    },
                    {
                      area: "Legal Advice",
                      detail:
                        "Free initial legal advice on personal matters \u2014 family law, housing, consumer rights, employment disputes (where not a conflict of interest with the employer), and debt.",
                    },
                    {
                      area: "Financial Guidance",
                      detail:
                        "Support with budgeting, debt management, understanding benefits, and financial planning. Not financial advice in the FCA-regulated sense, but practical guidance.",
                    },
                    {
                      area: "Family &amp; Relationship Support",
                      detail:
                        "Mediation services, parenting support, eldercare advice, relationship counselling, and support during separation or divorce.",
                    },
                    {
                      area: "Manager Support Line",
                      detail:
                        "A confidential line for managers dealing with difficult workplace situations \u2014 how to support a struggling team member, managing absence, or handling a crisis.",
                    },
                    {
                      area: "24/7 Telephone Support",
                      detail:
                        "Most EAPs operate a 24-hour, 7-day telephone line staffed by trained counsellors, available for immediate support at any time.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 p-3 rounded-lg"
                    >
                      <p className="text-sm font-medium text-purple-300 mb-1">
                        {item.area}
                      </p>
                      <p className="text-xs text-white/70">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  How EAPs Work
                </p>
                <div className="space-y-2">
                  {[
                    "The employer contracts an independent EAP provider (such as Health Assured, Workplace Options, or CiC) and pays for the service on behalf of all employees",
                    "Employees contact the EAP directly \u2014 typically by phone, online, or via an app \u2014 using a code or company name provided by their employer",
                    "The EAP provider conducts an initial assessment and directs the employee to the most appropriate support (counselling, legal, financial, etc.)",
                    "All contact is confidential. The employer receives only anonymised aggregate data \u2014 they never know which individuals have used the service or what issues were discussed",
                    "The service is free for employees and usually extends to immediate family members living at the same address",
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

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-400 mb-3">
                  Overcoming Barriers to EAP Use
                </p>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    The most common barriers to EAP usage are:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      {
                        barrier: "\"I didn't know we had one\"",
                        response:
                          "Check with HR. Most medium/large employers have an EAP. The number is often on notice boards, payslips, or the company intranet.",
                      },
                      {
                        barrier: "\"My boss will find out\"",
                        response:
                          "EAPs are provided by an independent external company. Your employer never receives any individual data. Contact is completely confidential.",
                      },
                      {
                        barrier: "\"It won't help with my problem\"",
                        response:
                          "EAPs cover a surprisingly wide range: mental health, legal, financial, family, bereavement, addiction, and workplace issues.",
                      },
                      {
                        barrier: "\"I'm not ill enough for counselling\"",
                        response:
                          "EAPs are designed for early intervention. You do not need to be in crisis. Getting support early prevents problems from escalating.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white/5 border border-white/10 p-3 rounded-lg"
                      >
                        <p className="text-xs font-medium text-violet-300 mb-1">
                          {item.barrier}
                        </p>
                        <p className="text-xs text-white/60">
                          {item.response}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    The MHFA&rsquo;s Role in Signposting to EAPs
                  </p>
                </div>
                <div className="text-sm text-white/80 space-y-2">
                  <p>
                    As an MHFA, you are not a counsellor or therapist &mdash;
                    your role is to provide initial support and signpost to
                    appropriate professional help. The EAP is often the fastest
                    route to professional support because there is typically no
                    waiting list and no referral process.
                  </p>
                  <p>
                    <strong className="text-white">
                      Practical steps you can take:
                    </strong>{" "}
                    Find out your organisation&rsquo;s EAP details and keep them
                    to hand. When signposting, explain what the EAP is, reassure
                    about confidentiality, and offer practical support
                    (&ldquo;Would you like me to find the number for
                    you?&rdquo;). Include EAP details on any wellbeing notice
                    boards or toolbox talk handouts. Normalise usage by
                    mentioning the EAP routinely, not just when someone is in
                    crisis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
          title="Section 2 Knowledge Check"
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
            <Link to="../mental-health-module-5-section-3">
              Next: Building a Mentally Healthy Workplace
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
