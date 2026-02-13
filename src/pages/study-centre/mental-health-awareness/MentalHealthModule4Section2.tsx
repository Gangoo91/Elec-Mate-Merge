import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Phone, Heart, Shield, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh4s2-professional-help",
    question: "When should you signpost a colleague to professional mental health support rather than continuing to offer peer support alone?",
    options: [
      "Only when they specifically ask you for a referral to a therapist or counsellor",
      "When their difficulties are persistent, worsening, or affecting their ability to function — peer support has limitations and professional help can offer specialist treatment",
      "You should never suggest professional help because it implies their problems are serious",
      "Immediately after the first conversation, because you are not qualified to offer any support"
    ],
    correctIndex: 1,
    explanation: "Peer support is valuable but has clear limitations. When someone's difficulties are persistent (lasting more than a few weeks), worsening over time, or significantly affecting their ability to work, sleep, eat, or maintain relationships, professional support should be encouraged. This is not about your competence — it is about ensuring the person gets the right level of help. A GP, counsellor, or therapist can offer specialist treatments (CBT, medication, structured therapy) that peer support cannot."
  },
  {
    id: "mh4s2-nhs-services",
    question: "How can someone in England access NHS Talking Therapies (formerly IAPT) for mental health support?",
    options: [
      "Only through a GP referral — you cannot self-refer",
      "Only by attending A&E and requesting a psychiatric assessment",
      "Through self-referral directly to the service, or through a GP referral — both routes are available",
      "Only through an employer referral as part of occupational health"
    ],
    correctIndex: 2,
    explanation: "NHS Talking Therapies (formerly known as IAPT — Improving Access to Psychological Therapies) accepts both self-referrals and GP referrals. This is an important point to communicate, because many people assume they need to see their GP first. Self-referral means someone can contact the service directly, usually through an online form or phone call, without needing to visit their doctor. This removes a significant barrier for people who find it difficult to see their GP."
  },
  {
    id: "mh4s2-construction-resources",
    question: "Which of the following is a 24/7 construction industry-specific helpline that offers emotional support, financial assistance, and legal advice?",
    options: [
      "CITB Technical Helpline",
      "JIB Disputes Service",
      "The Lighthouse Club Construction Industry Helpline",
      "Building Control Advisory Service"
    ],
    correctIndex: 2,
    explanation: "The Lighthouse Club is the construction industry's dedicated charity, providing a 24/7 helpline that offers emotional support, financial assistance (grants for those in financial hardship), legal advice, and wellbeing support specifically for construction workers and their families. It is free, confidential, and staffed by people who understand the unique pressures of the construction industry. Their helpline number is 0345 605 1956."
  }
];

const faqs = [
  {
    question: "What if someone refuses to seek professional help?",
    answer: "You cannot force anyone to seek professional help, and attempting to do so can damage the trust you have built. If someone refuses, respect their decision but keep the door open. You might say: 'That's absolutely fine — there's no pressure. But the offer is always there if you change your mind, and I can help you access it whenever you're ready.' Continue offering peer support in the meantime. Sometimes it takes several conversations before someone feels ready to take that step. The most common reasons people refuse are fear of stigma, belief that they should be able to cope alone, previous negative experiences with services, or simply not feeling ready. Gently challenging these barriers over time — without pressure — can help."
  },
  {
    question: "How long are NHS waiting times for mental health services?",
    answer: "Waiting times vary significantly depending on the service and the area. For NHS Talking Therapies (formerly IAPT), the NHS target is that 75% of people should start treatment within six weeks and 95% within 18 weeks. In practice, many areas achieve this for initial assessment, but the wait for actual therapy sessions can be longer — sometimes three to six months for CBT in some areas. For secondary mental health services (community mental health teams, psychiatric services), waits can be longer still. This is why it is important to know about alternative routes: EAPs typically offer sessions within one to two weeks, the Lighthouse Club can provide immediate support, and crisis services are available 24/7 for urgent situations."
  },
  {
    question: "Are EAP sessions really confidential?",
    answer: "Yes. Employee Assistance Programmes are bound by strict confidentiality rules. Your employer will not be told that you have used the service, what you discussed, or any details about your situation. The only exception is if there is an immediate risk of serious harm to you or someone else — this is the same ethical duty that applies to all counsellors and therapists. Your employer receives only anonymised, aggregate usage data (for example, '47 employees used the EAP this quarter') with no identifying information. Many people in construction are understandably cautious about confidentiality, so emphasising this point when signposting can help overcome reluctance."
  },
  {
    question: "What if I do not know which service to signpost someone to?",
    answer: "You do not need to be an expert in mental health services to signpost effectively. If you are unsure, the safest starting points are: (1) Their GP — a GP can assess the situation and refer to the appropriate service. (2) Their EAP if their employer has one — the EAP will triage and direct them. (3) The Construction Industry Helpline (0345 605 1956) or Lighthouse Club — these services are designed for construction workers and can guide them to the right support. For any crisis situation, the Samaritans (116 123) and the crisis text line (text SHOUT to 85258) are available 24/7. You do not need to diagnose or assess — you just need to know enough to point them in the right direction."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is a key limitation of peer support compared to professional mental health services?",
    options: [
      "Peer support is always harmful and should be avoided",
      "Peer supporters cannot prescribe medication, deliver structured therapy (such as CBT), or provide clinical assessment",
      "Peer support only works for people who are already fully recovered",
      "Professional help is only available to people with a formal diagnosis"
    ],
    correctAnswer: 1,
    explanation: "Peer support is extremely valuable — being listened to, understood, and supported by a colleague can make an enormous difference. However, it has clear limitations: peer supporters are not trained therapists, cannot deliver structured treatments like CBT, cannot prescribe or manage medication, and cannot provide clinical assessment or diagnosis. For persistent, worsening, or severe mental health difficulties, professional help offers specialist interventions that go beyond what peer support can provide."
  },
  {
    id: 2,
    question: "NHS Talking Therapies (formerly IAPT) primarily offers which type of treatment?",
    options: [
      "Psychiatric medication management",
      "Long-term psychoanalytic therapy",
      "Evidence-based talking therapies including CBT, counselling, and guided self-help",
      "Residential inpatient treatment for severe mental illness"
    ],
    correctAnswer: 2,
    explanation: "NHS Talking Therapies (formerly IAPT — Improving Access to Psychological Therapies) primarily offers evidence-based talking therapies for common mental health problems such as depression and anxiety. The main treatments available include Cognitive Behavioural Therapy (CBT), counselling, guided self-help, and other NICE-recommended therapies. The service uses a stepped care model, starting with less intensive treatments and stepping up to more intensive therapy if needed."
  },
  {
    id: 3,
    question: "An Employee Assistance Programme (EAP) typically offers how many free counselling sessions?",
    options: [
      "1-2 sessions",
      "6-8 sessions",
      "12-16 sessions",
      "Unlimited sessions for as long as needed"
    ],
    correctAnswer: 1,
    explanation: "Most EAPs offer between 6 and 8 free counselling sessions per issue, per year. This is enough for many people to work through a specific difficulty with professional support. If more sessions are needed, the EAP counsellor can help the person access further support through the NHS or private services. EAPs also typically cover more than just mental health — most include support for debt, legal issues, relationship problems, and other life challenges."
  },
  {
    id: 4,
    question: "The Lighthouse Club Construction Industry Helpline provides which of the following services?",
    options: [
      "Only financial grants for construction workers who have been made redundant",
      "Emotional support, financial assistance, legal advice, and wellbeing support specifically for construction workers and their families",
      "Only telephone counselling for site managers and directors",
      "Certification and training for mental health first aiders in construction"
    ],
    correctAnswer: 1,
    explanation: "The Lighthouse Club is the construction industry's dedicated charity. Their helpline (0345 605 1956) offers a comprehensive range of support: emotional support and listening, financial assistance (including emergency grants for those in hardship), legal advice, wellbeing programmes, and family support. The service is free, confidential, and available 24/7. It is specifically designed for construction workers at all levels, and their team understands the unique pressures of the industry."
  },
  {
    id: 5,
    question: "When should you direct someone to call 999 for a mental health crisis?",
    options: [
      "Whenever someone mentions feeling stressed or anxious at work",
      "Only if they have already been diagnosed with a severe mental illness",
      "When there is immediate risk to life — for example, they are actively self-harming, have a plan to end their life and the means to do so, or are experiencing a psychotic episode that puts them in danger",
      "Never — mental health crises should only be handled by mental health professionals, not emergency services"
    ],
    correctAnswer: 2,
    explanation: "999 should be called when there is an immediate risk to life. This includes situations where someone is actively self-harming, has expressed suicidal intent with a plan and access to means, is experiencing a psychotic episode that puts them or others in danger, or has made a suicide attempt. When calling, state that it is a 'mental health crisis' so the appropriate response can be dispatched. Mental health crises are medical emergencies and emergency services are trained to respond to them."
  },
  {
    id: 6,
    question: "The Samaritans helpline (116 123) is available:",
    options: [
      "Monday to Friday, 9am to 5pm",
      "24 hours a day, 7 days a week, 365 days a year — free and anonymous from any phone",
      "Only during evenings and weekends when GP surgeries are closed",
      "Only to people who have been referred by their GP or a mental health professional"
    ],
    correctAnswer: 1,
    explanation: "The Samaritans helpline (116 123) is available 24 hours a day, 7 days a week, 365 days a year. It is free to call from any phone (including mobiles, even with no credit), and the call will not appear on phone bills. The service is completely anonymous — you do not need to give your name. Samaritans are trained volunteer listeners who provide emotional support for anyone who is struggling, not just those who are suicidal. You can also email jo@samaritans.org."
  },
  {
    id: 7,
    question: "What is the correct way to access the crisis text service in the UK?",
    options: [
      "Call SHOUT on 0800 123 456",
      "Text SHOUT to 85258 for free, confidential, 24/7 crisis support via text message",
      "Download the SHOUT app from the App Store and create an account",
      "Email crisis@shout.org with your details and a volunteer will call you back"
    ],
    correctAnswer: 1,
    explanation: "The Shout crisis text service is accessed by texting the word SHOUT to 85258. It is free on all major UK networks, available 24/7, and provides confidential support via text message with trained volunteers. This service is particularly useful for people who find it difficult to speak on the phone — which is common during a crisis, and especially relevant for construction workers who may be on a noisy site or who feel more comfortable texting than talking."
  },
  {
    id: 8,
    question: "The 'stepped care model' used by NHS mental health services means:",
    options: [
      "Patients must climb a physical set of steps to access each level of the mental health building",
      "Treatment starts with the least intensive, evidence-based intervention appropriate for the condition, and steps up to more intensive treatment only if the initial approach is not sufficient",
      "Each patient receives exactly the same treatment regardless of their condition",
      "Mental health treatment is only available after completing a series of mandatory online courses"
    ],
    correctAnswer: 1,
    explanation: "The stepped care model is the framework used by NHS mental health services (including NHS Talking Therapies). It means that treatment starts at the lowest appropriate intensity — for example, guided self-help or computerised CBT for mild depression — and steps up to more intensive interventions (such as face-to-face CBT, counselling, or referral to secondary services) only if the initial treatment is not sufficient. This ensures that people get the right level of treatment for their needs while making efficient use of NHS resources."
  }
];

export default function MentalHealthModule4Section2() {
  useSEO({
    title: "Signposting to Professional Help | Mental Health Awareness Module 4.2",
    description: "Learn how to signpost colleagues to professional mental health support including NHS services, EAPs, construction-specific resources like the Lighthouse Club, and crisis services including Samaritans.",
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
            <Link to="../mental-health-module-4">
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
            <Phone className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Signposting to Professional Help
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Knowing when peer support is not enough, and how to guide colleagues towards the right professional services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Peer support has limits:</strong> Know when to signpost onwards</li>
              <li><strong>Multiple routes exist:</strong> GP, self-referral, EAP, helplines</li>
              <li><strong>Construction-specific:</strong> Lighthouse Club, Mates in Mind</li>
              <li><strong>Crisis services:</strong> Samaritans 116 123, SHOUT 85258</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Key Numbers to Know</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Samaritans:</strong> 116 123 (24/7, free)</li>
              <li><strong>Crisis text:</strong> Text SHOUT to 85258</li>
              <li><strong>Lighthouse Club:</strong> 0345 605 1956</li>
              <li><strong>NHS 111:</strong> Option 2 for mental health crisis</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Recognise the limitations of peer support and when professional help is needed",
              "Describe how to access NHS mental health services including self-referral routes",
              "Explain what Employee Assistance Programmes offer and how to use them",
              "Identify construction-specific mental health resources and helplines",
              "Know when and how to direct someone to crisis services",
              "Signpost confidently without making someone feel pressured or judged"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Professional Help Matters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Why Professional Help Matters
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Peer support &mdash; being there for a colleague, listening, checking in, offering practical
                help &mdash; is enormously valuable. Research by Mind and MHFA England consistently shows
                that peer support improves outcomes and reduces isolation. However, peer support has
                <strong> clear limitations</strong>, and recognising these is not a sign of failure. It is
                a sign of maturity and responsibility.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Limits of Peer Support</p>
                <p className="text-base text-white leading-relaxed">
                  You are not a therapist. You are not a doctor. You are not a counsellor. You are a
                  <strong> colleague who cares</strong> &mdash; and that matters enormously. But some
                  conditions require specialist interventions that go beyond what any peer can provide.
                </p>
              </div>

              <p>
                Professional mental health support includes a range of services that offer what peer
                support cannot: <strong>clinical assessment</strong> (identifying what condition someone
                has and how severe it is), <strong>evidence-based treatment</strong> (structured therapies
                like Cognitive Behavioural Therapy that have been proven to work), <strong>medication</strong>
                (which can be essential for conditions like severe depression, bipolar disorder, or psychosis),
                and <strong>crisis management</strong> (specialist support during acute mental health
                emergencies).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">When Someone Likely Needs Professional Help</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Symptoms are persistent</strong> &mdash; difficulties lasting more than two to four weeks without improvement despite support.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Symptoms are worsening</strong> &mdash; the person is getting worse rather than better, or new symptoms are appearing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Functioning is significantly affected</strong> &mdash; unable to work, unable to sleep, unable to eat, withdrawing from all relationships.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Self-harm or suicidal thoughts</strong> &mdash; any mention of wanting to end their life, self-harm, or feeling that others would be better off without them.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Substance use is escalating</strong> &mdash; using alcohol or drugs to cope, especially if this is new or increasing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>They are expressing hopelessness</strong> &mdash; &ldquo;Nothing will help&rdquo;, &ldquo;There is no point&rdquo;, &ldquo;Things will never get better.&rdquo;</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Myth of Weakness</p>
                </div>
                <p className="text-sm text-white">
                  In construction culture, there is a persistent myth that seeking professional help for
                  mental health means you are weak, soft, or unable to cope. This is not only wrong &mdash;
                  it is dangerous. <strong>Seeking professional help takes courage, not weakness.</strong>
                  Asking for help when you are drowning is strength. The toughest thing a person can do
                  is admit they are struggling and reach out for support. As a supporter, actively challenging
                  this myth when you hear it can save lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: NHS Mental Health Services */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            NHS Mental Health Services
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The NHS provides a range of mental health services, from talking therapies for common
                conditions like depression and anxiety, through to specialist services for severe and
                complex mental illness. Understanding how these services work &mdash; and crucially, how
                to access them &mdash; is essential for effective signposting.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">How to Access NHS Mental Health Support</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Route 1: GP Referral</p>
                    <p>The traditional route. Book an appointment with the GP, explain how you are feeling, and the GP can refer you to the appropriate service. The GP can also prescribe medication if needed. Many people find this the easiest starting point because the GP can assess the situation and direct them.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Route 2: Self-Referral (NHS Talking Therapies)</p>
                    <p>Many people do not realise they can self-refer directly to NHS Talking Therapies (formerly IAPT) without seeing a GP. Search &ldquo;NHS Talking Therapies [your area]&rdquo; online or call 111 for details. This bypasses the need for a GP appointment and can be faster.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What to Expect at a GP Appointment</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>The GP will ask about your symptoms, how long they have lasted, and how they are affecting your daily life.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>They may use a questionnaire (PHQ-9 for depression, GAD-7 for anxiety) to assess severity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>They may suggest medication, talking therapy, or both, depending on severity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>They may refer you to specialist services if needed. A fit note (formerly sick note) can be issued if needed for time off work.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span><strong>Tip for construction workers:</strong> Many GP surgeries now offer early morning, evening, and weekend appointments. Phone and video consultations are also widely available, making it easier to access without taking a full day off site.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Stepped Care Model</p>
                <p className="text-sm text-white">
                  NHS mental health services use a <strong>stepped care model</strong>. This means treatment
                  starts at the lowest appropriate intensity and steps up if needed. <strong>Step 1:</strong> Recognition
                  and monitoring by the GP. <strong>Step 2:</strong> Low-intensity interventions (guided self-help,
                  computerised CBT, psychoeducation groups). <strong>Step 3:</strong> High-intensity interventions
                  (face-to-face CBT, counselling, structured therapy). <strong>Step 4:</strong> Specialist
                  services for complex or severe conditions. Most people with depression and anxiety will
                  be treated at Steps 2 and 3.
                </p>
              </div>

              <p>
                A common barrier is the perception of long waiting times. While waits for NHS talking
                therapies can be several weeks to several months depending on the area, it is important
                that people are not discouraged from seeking help. The assessment process itself can
                begin quickly, and being on the waiting list does not prevent someone from accessing
                other forms of support (EAP, helplines, peer support) in the meantime. For urgent or
                crisis situations, faster routes are available.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Employee Assistance Programmes (EAPs) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Employee Assistance Programmes (EAPs)
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Employee Assistance Programmes are one of the most underused and undervalued resources
                available to construction workers. Many employers &mdash; including most large contractors
                and many medium-sized firms &mdash; provide an EAP as part of their employee benefits,
                yet the vast majority of workers either do not know it exists or do not understand what
                it offers.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">What an EAP Offers</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Counselling Sessions</p>
                    <p>Typically 6 to 8 free, confidential counselling sessions per issue, per year. Sessions are with qualified counsellors and can be face-to-face, by phone, or by video. No referral needed &mdash; self-referral is standard.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">24/7 Helpline</p>
                    <p>Most EAPs include a 24/7 telephone helpline for immediate support. This means that at 2am on a Saturday, when GP surgeries are closed and the wait for NHS services feels too long, someone can pick up the phone and talk to a professional.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Financial Advice</p>
                    <p>Debt and financial worries are one of the biggest triggers for mental health problems in construction. Most EAPs offer access to qualified financial advisers who can help with budgeting, debt management, and benefits entitlements.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-rose-400 font-medium mb-1">Legal Advice</p>
                    <p>Access to legal advice on personal matters (not employment disputes with the EAP-providing employer) including family law, housing, consumer rights, and more. This removes a common source of stress and worry.</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Confidentiality &mdash; The Number One Concern</p>
                </div>
                <p className="text-sm text-white">
                  The most common reason construction workers do not use their EAP is fear that their
                  employer will find out. <strong>EAPs are strictly confidential.</strong> Your employer
                  will not be told that you have used the service, what you discussed, or any personal
                  details. The only exception is if there is an immediate risk of serious harm to you or
                  someone else. Your employer receives only anonymised, aggregate usage statistics with
                  no identifying information.
                </p>
              </div>

              <p>
                To find out if your employer has an EAP, check your employee handbook, staff intranet,
                site notice boards, or ask your HR department or site manager. If you are a subcontractor,
                check both your own company&rsquo;s benefits and the main contractor&rsquo;s &mdash; some
                main contractors extend their EAP to all workers on their sites. <strong>The process is
                typically simple:</strong> call the EAP number, explain what you need, and they will
                arrange the appropriate support. Most first appointments can be scheduled within one to
                two weeks &mdash; significantly faster than NHS waiting times.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Construction-Specific Resources */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Construction-Specific Resources
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The construction industry has developed a number of specialist resources that understand
                the unique pressures, culture, and working patterns of the sector. These organisations
                exist specifically because generic mental health services do not always meet the needs
                of construction workers &mdash; people who work long hours, travel away from home, face
                job insecurity, and operate in a culture that has historically stigmatised mental health.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Construction Industry Resources</p>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-5 w-5 text-rose-400" />
                      <p className="text-rose-400 font-semibold text-sm">The Lighthouse Club</p>
                    </div>
                    <p className="text-sm text-white mb-2">
                      The construction industry&rsquo;s dedicated charity. Provides a 24/7 helpline
                      (<strong>0345 605 1956</strong>) offering emotional support, financial assistance
                      (emergency grants for those in hardship), legal advice, and wellbeing programmes.
                      Free, confidential, and staffed by people who understand construction.
                    </p>
                    <p className="text-sm text-white">
                      The Lighthouse Club also offers the <strong>Construction Industry Helpline app</strong>,
                      self-help resources, and a network of volunteer &ldquo;ambassadors&rdquo; on sites
                      across the UK.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">Mates in Mind</p>
                    <p className="text-sm text-white">
                      A UK charity specifically focused on improving mental health in the construction
                      industry. Mates in Mind provides training, toolkits, and resources to help
                      organisations build mentally healthy workplaces. They work with employers to create
                      Mental Health at Work plans and provide evidence-based training at all levels from
                      site operatives to board directors. Their website has free resources for individuals
                      and organisations.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-2">Building Mental Health</p>
                    <p className="text-sm text-white">
                      The Building Mental Health Charter and Framework provide a structured approach for
                      construction organisations to assess, improve, and demonstrate their commitment to
                      mental health. It includes practical actions at individual, team, and organisational
                      level.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-rose-400 font-semibold text-sm mb-1">CALM</p>
                      <p className="text-sm text-white">Campaign Against Living Miserably. Helpline: <strong>0800 58 58 58</strong> (5pm-midnight daily). Webchat also available. Specifically focused on preventing male suicide &mdash; highly relevant given that construction has one of the highest male suicide rates of any UK industry.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-rose-400 font-semibold text-sm mb-1">Andy&rsquo;s Man Club</p>
                      <p className="text-sm text-white">Free peer-support groups for men, meeting weekly across the UK. Based on the principle of &ldquo;It&rsquo;s OK to talk.&rdquo; Groups meet on Monday evenings in community venues. No referral needed &mdash; just turn up. Many construction workers attend and find the group format less intimidating than one-to-one therapy.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Why Construction-Specific Services Matter</p>
                <p className="text-sm text-white">
                  Construction workers are more likely to engage with services that understand their world.
                  Generic mental health services may not appreciate the realities of working on a building
                  site: the early starts, the physical demands, the job insecurity, the culture, the travel,
                  the pressure. <strong>Construction-specific services speak the same language</strong> and
                  understand the barriers that prevent construction workers from seeking help. When signposting,
                  offering a construction-specific option alongside mainstream services can significantly
                  increase the likelihood that someone will actually reach out.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Crisis Services */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Crisis Services
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When someone is in acute distress, experiencing suicidal thoughts, actively self-harming,
                or in immediate danger, they need crisis-level support. Knowing which service to direct
                them to &mdash; and the differences between them &mdash; can be the difference between
                life and death. Every person in the construction industry should know these numbers.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Crisis Services &mdash; When to Use Each</p>
                <div className="space-y-3">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                    <p className="text-rose-400 font-semibold text-sm mb-1">Samaritans &mdash; 116 123</p>
                    <p className="text-sm text-white">
                      <strong>24/7, free from any phone, anonymous.</strong> Call will not appear on phone bills.
                      For anyone who is struggling emotionally &mdash; not just people who are suicidal.
                      Trained volunteer listeners provide non-judgemental emotional support. You can also
                      email <strong>jo@samaritans.org</strong> (response within 24 hours). Use when: someone
                      needs to talk, is in emotional distress, is having suicidal thoughts but is not in
                      immediate danger.
                    </p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-blue-400 font-semibold text-sm mb-1">Crisis Text Line &mdash; Text SHOUT to 85258</p>
                    <p className="text-sm text-white">
                      <strong>24/7, free on all major UK networks.</strong> Provides crisis support via text
                      message with trained volunteers. Especially useful for people who cannot or do not want
                      to speak on the phone &mdash; common on a noisy construction site or for people who
                      find talking harder than texting. Use when: someone is in crisis but prefers text-based
                      communication.
                    </p>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                    <p className="text-amber-400 font-semibold text-sm mb-1">NHS 111 &mdash; Option 2 for Mental Health Crisis</p>
                    <p className="text-sm text-white">
                      <strong>24/7, free from any phone.</strong> Pressing option 2 connects to a mental
                      health crisis team. Trained mental health professionals can assess the situation and
                      arrange urgent support, including dispatching a crisis team if needed. Use when: someone
                      needs urgent professional mental health assessment but is not in immediate physical danger.
                    </p>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-1">999 &mdash; Emergency Services</p>
                    <p className="text-sm text-white">
                      <strong>For immediate risk to life.</strong> Call when someone is actively self-harming,
                      has made a suicide attempt, has a plan and means to end their life and is about to act,
                      or is experiencing a psychotic episode that puts them or others in immediate danger.
                      Tell the operator it is a &ldquo;mental health crisis&rdquo; so the appropriate response
                      is dispatched.
                    </p>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                    <p className="text-purple-400 font-semibold text-sm mb-1">A&amp;E (Accident &amp; Emergency)</p>
                    <p className="text-sm text-white">
                      <strong>For active self-harm, suicide attempts, or severe psychiatric emergencies.</strong>
                      If someone has injured themselves, taken an overdose, or is in a severe mental health
                      crisis, A&amp;E provides immediate medical assessment and access to psychiatric liaison
                      teams. Many A&amp;E departments now have dedicated mental health practitioners.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Additionally, many areas now have <strong>crisis cafes</strong> and <strong>safe havens</strong>
                &mdash; drop-in spaces (usually open in the evenings and at weekends) where people in
                distress can go without needing an appointment. They are staffed by trained support workers
                and volunteers. These can be an alternative to A&amp;E for people who are in crisis but
                do not need emergency medical treatment. Search &ldquo;mental health crisis cafe [your area]&rdquo;
                to find local options.
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
                This section has equipped you with the knowledge to signpost colleagues to the right
                professional support at the right time. The key points to remember are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Peer support has limits</strong> &mdash; know when to encourage professional help (persistent, worsening, or severe symptoms).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>NHS services</strong> &mdash; accessible via GP referral or self-referral to NHS Talking Therapies. The stepped care model ensures the right level of treatment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>EAPs</strong> &mdash; free, confidential, fast access (1-2 weeks), covering counselling, financial advice, legal advice, and more. Check if your employer has one.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Construction-specific</strong> &mdash; Lighthouse Club (0345 605 1956), Mates in Mind, CALM, Andy&rsquo;s Man Club all understand the unique pressures of the industry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Crisis services</strong> &mdash; Samaritans (116 123), SHOUT (text 85258), NHS 111 option 2, 999 for immediate danger.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong>Seeking help is strength</strong> &mdash; actively challenge the myth that professional help equals weakness.</span>
                </li>
              </ul>

              {/* Prominent Helpline Box */}
              <div className="bg-rose-500/10 border-2 border-rose-500/50 p-5 rounded-lg">
                <p className="text-base font-semibold text-rose-400 mb-3">Key Helplines &mdash; Save These Numbers</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span><strong>Samaritans:</strong> 116 123 (24/7, free)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span><strong>Crisis text:</strong> SHOUT to 85258</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span><strong>Lighthouse Club:</strong> 0345 605 1956</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span><strong>CALM:</strong> 0800 58 58 58</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span><strong>NHS 111:</strong> Option 2 for MH crisis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-rose-400 flex-shrink-0" />
                    <span><strong>Emergency:</strong> 999 (life at risk)</span>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will cover
                  <strong> responding to a crisis</strong> &mdash; what to do when someone is in acute
                  danger, suicide first aid principles, keeping someone safe on a construction site, and
                  when to call emergency services.
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
            <Link to="../mental-health-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Providing Ongoing Support
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-4-section-3">
              Next: Responding to a Crisis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
