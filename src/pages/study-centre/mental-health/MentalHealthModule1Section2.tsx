import {
  ArrowLeft,
  Brain,
  CheckCircle,
  AlertTriangle,
  Users,
  Shield,
  Lock,
  Scale,
  Heart,
  FileText,
  HandHeart,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "algee-first-step",
    question:
      "In the ALGEE action plan, what does the first 'A' stand for, and what does it involve?",
    options: [
      "Assess the situation and call 999 immediately",
      "Approach, assess, and assist with any crisis",
      "Ask the person what medication they are taking",
      "Advise the person to see their GP within 24 hours",
    ],
    correctIndex: 1,
    explanation:
      "The first step in ALGEE is 'Approach, assess, and assist with any crisis'. This means approaching the person in a non-threatening way, assessing whether they may be at risk of harm to themselves or others, and assisting with any immediate crisis such as suicidal thoughts or self-harm. It does not mean calling 999 automatically — that depends on the level of risk assessed.",
  },
  {
    id: "mhfa-boundary",
    question:
      "A colleague discloses they have been feeling severely depressed for several months. As a Mental Health First Aider, what is the most appropriate response?",
    options: [
      "Diagnose them with clinical depression and recommend antidepressants",
      "Tell their manager immediately so they can arrange time off",
      "Listen non-judgementally, offer reassurance, and encourage them to seek professional help",
      "Tell them everyone feels down sometimes and they should try to think more positively",
    ],
    correctIndex: 2,
    explanation:
      "A Mental Health First Aider is trained to listen without judgement, provide reassurance and information, and encourage the person to access appropriate professional support. An MHFA is NOT qualified to diagnose, prescribe, or provide therapy. Minimising someone's experience ('everyone feels down') is harmful and dismissive. Disclosing to a manager without consent would breach confidentiality unless there is immediate risk.",
  },
  {
    id: "confidentiality-breach",
    question:
      "Under what circumstances can a Mental Health First Aider break confidentiality?",
    options: [
      "Whenever their line manager asks for an update",
      "When the person's work performance is affected",
      "When there is an immediate risk of serious harm to the person or others",
      "When a colleague asks whether the person is OK",
    ],
    correctIndex: 2,
    explanation:
      "Confidentiality can only be broken when there is an immediate and serious risk of harm to the individual or to others. This includes active suicidal intent, plans to harm someone else, or disclosures of abuse involving children or vulnerable adults. Work performance, managerial curiosity, or colleague concern do not justify breaking confidentiality without the person's explicit consent.",
  },
];

const faqs = [
  {
    question: "Do I need to be a qualified counsellor to be a Mental Health First Aider?",
    answer:
      "No. Mental Health First Aiders are not counsellors, therapists, or mental health professionals. The MHFA role is analogous to a physical first aider — you are trained to recognise the early signs of mental ill health, provide initial support, and guide the person towards appropriate professional help. You do not provide ongoing treatment, therapy, or clinical advice. The two-day MHFA England course equips you with the knowledge and confidence to have supportive conversations, but it does not make you a mental health clinician.",
  },
  {
    question: "What should I do if someone tells me they are thinking about suicide?",
    answer:
      "Take every mention of suicide seriously. Do not panic, and do not avoid the subject. Ask directly: 'Are you thinking about ending your life?' Research shows that asking about suicide does not increase risk — it can provide relief. Listen calmly, without judgement. Do not leave the person alone. If there is an immediate risk, call 999 or take them to A&E. If the risk is not immediate, encourage them to contact their GP, the Samaritans (116 123, free 24/7), or Crisis Text Line (text SHOUT to 85258). Follow your organisation's escalation procedure and ensure the person has a safety plan.",
  },
  {
    question: "Am I legally liable if I give mental health first aid and something goes wrong?",
    answer:
      "There is no specific legislation governing Mental Health First Aiders in the UK, and the role is voluntary. The Social Action, Responsibility and Heroism Act 2015 (SARAH Act) provides reassurance that courts will consider the context of someone acting heroically, for the benefit of society, or responsibly when a negligence claim arises. As long as you act within the boundaries of your training, in good faith, and do not attempt to diagnose or treat, the risk of personal legal liability is extremely low. Your employer retains the primary duty of care under the Health and Safety at Work etc. Act 1974.",
  },
  {
    question: "How does GDPR apply to mental health first aid conversations?",
    answer:
      "Information about a person's mental health is classified as 'special category data' under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. This means it receives the highest level of protection. You should only record what is strictly necessary, store any notes securely, share information only with the person's explicit consent (unless there is immediate risk of harm), and not keep records longer than needed. Many organisations provide secure, designated forms for MHFA interactions. Always follow your employer's data protection policy and seek guidance from your data protection officer if unsure.",
  },
  {
    question:
      "What is the difference between an Employee Assistance Programme (EAP) and an MHFA?",
    answer:
      "An Employee Assistance Programme (EAP) is a confidential service provided by an employer, typically through a third-party provider, that offers professional counselling, legal advice, financial guidance, and wellbeing support. An MHFA is a trained colleague within the workplace who provides immediate, initial support and signposts to services like the EAP. Think of the MHFA as the bridge — they notice someone struggling, have a supportive conversation, and encourage the person to access professional support, which may include the EAP. The MHFA does not replace the EAP; they complement each other.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "According to MHFA England, what is the primary role of a Mental Health First Aider?",
    options: [
      "To diagnose mental health conditions in the workplace",
      "To provide ongoing counselling support to colleagues",
      "To spot early signs of mental ill health, provide initial support, and guide towards professional help",
      "To replace the need for professional mental health services",
    ],
    correctAnswer: 2,
    explanation:
      "The primary role of a Mental Health First Aider is to recognise the early signs of mental ill health, provide initial reassurance and support, and encourage the person to seek appropriate professional help. An MHFA does not diagnose, treat, counsel, or replace professional services.",
  },
  {
    id: 2,
    question: "What does the 'L' in the ALGEE action plan stand for?",
    options: [
      "Look for warning signs",
      "Listen non-judgementally",
      "Lead the person to a GP",
      "Log the conversation in writing",
    ],
    correctAnswer: 1,
    explanation:
      "The 'L' in ALGEE stands for 'Listen non-judgementally'. This is a core skill for Mental Health First Aiders — active listening without making assumptions, criticising, or dismissing the person's feelings. Non-judgemental listening helps the person feel heard, validated, and more likely to accept support.",
  },
  {
    id: 3,
    question:
      "Which of the following is NOT within the boundaries of the Mental Health First Aider's role?",
    options: [
      "Listening to a colleague who is feeling anxious",
      "Providing reassurance and information about support services",
      "Prescribing a course of cognitive behavioural therapy",
      "Encouraging someone to contact their GP",
    ],
    correctAnswer: 2,
    explanation:
      "Prescribing therapy of any kind — including CBT — is outside the scope of an MHFA. Only qualified mental health professionals (psychiatrists, clinical psychologists, counsellors) can prescribe or deliver therapeutic interventions. The MHFA's role is to listen, reassure, inform, and encourage professional help.",
  },
  {
    id: 4,
    question:
      "A colleague tells you in confidence that they are self-harming. Their manager then asks you directly whether the colleague is 'having problems'. What should you do?",
    options: [
      "Tell the manager everything the colleague disclosed",
      "Deny any knowledge of the situation entirely",
      "Explain that you cannot share details without the person's consent, but encourage the manager to check in with them directly",
      "Share a summary but leave out the self-harm details",
    ],
    correctAnswer: 2,
    explanation:
      "You must maintain confidentiality. You cannot share what someone has told you without their explicit consent, unless there is an immediate risk of serious harm. The appropriate response is to explain that you cannot disclose personal information, while encouraging the manager to have a direct supportive conversation with the colleague. You should also continue supporting the colleague and encourage them to seek professional help.",
  },
  {
    id: 5,
    question:
      "Under which UK legislation does an employer have a general duty of care for employee health, safety, and welfare at work?",
    options: [
      "Equality Act 2010",
      "Health and Safety at Work etc. Act 1974",
      "Mental Health Act 1983",
      "Social Action, Responsibility and Heroism Act 2015",
    ],
    correctAnswer: 1,
    explanation:
      "The Health and Safety at Work etc. Act 1974 (HSWA) places a general duty on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees. This includes mental health. The Management of Health and Safety at Work Regulations 1999 require employers to assess risks, including psychosocial risks, to employees.",
  },
  {
    id: 6,
    question:
      "What protection does the Social Action, Responsibility and Heroism Act 2015 (SARAH Act) offer to Mental Health First Aiders?",
    options: [
      "It grants full legal immunity from prosecution",
      "It requires courts to consider whether the person was acting for the benefit of society and responsibly when assessing negligence claims",
      "It makes the MHFA role a legally protected position",
      "It removes any requirement for confidentiality",
    ],
    correctAnswer: 1,
    explanation:
      "The SARAH Act 2015 does not grant immunity, but it does require courts to take into account whether a person was acting heroically, for the benefit of society, or demonstrated a generally responsible approach when determining negligence. This provides reassurance to those acting voluntarily in good faith, including Mental Health First Aiders.",
  },
  {
    id: 7,
    question:
      "When encouraging professional help (the second 'E' in ALGEE), which of the following would be the MOST appropriate referral pathway?",
    options: [
      "Suggest they search online for advice",
      "Recommend a specific therapist you know personally",
      "Encourage them to speak to their GP as a first step, and provide information about the EAP, Samaritans, and other relevant services",
      "Tell them they need to be referred by their manager",
    ],
    correctAnswer: 2,
    explanation:
      "The most appropriate approach is to encourage the person to see their GP as a primary point of contact, and to provide information about other support services such as the Employee Assistance Programme, Samaritans (116 123), Mind, and relevant local services. You should present options rather than dictate a single pathway, as the person should feel empowered to choose what feels right for them.",
  },
  {
    id: 8,
    question:
      "Which of the following statements about the legal position of Mental Health First Aiders in the UK is correct?",
    options: [
      "MHFAs are regulated by the Health and Care Professions Council",
      "There is specific UK legislation that governs the MHFA role",
      "The MHFA role is voluntary, and there is no specific legislation governing it in the UK",
      "MHFAs have the same legal status as registered mental health nurses",
    ],
    correctAnswer: 2,
    explanation:
      "The Mental Health First Aider role is entirely voluntary in the UK. There is no specific legislation that governs, regulates, or mandates the role. MHFAs are not registered professionals and are not regulated by any professional body such as the HCPC. The role is comparable to that of a physical first aider — a trained volunteer who provides initial support until professional help is available.",
  },
];

export default function MentalHealthModule1Section2() {
  useSEO({
    title: "The Mental Health First Aider's Role | Mental Health Module 1.2",
    description:
      "The MHFA role and ALGEE action plan, boundaries of the role, confidentiality, duty of care vs duty to refer, and the legal position of Mental Health First Aiders in the UK.",
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
            <span className="text-purple-400 text-xs font-semibold">
              MODULE 1 &middot; SECTION 2
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Mental Health First Aider&rsquo;s Role
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            What a Mental Health First Aider does, the ALGEE action plan,
            boundaries of the role, confidentiality obligations, duty of care,
            and the legal position in the UK
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
                <strong>MHFA:</strong> Spot signs, provide initial support,
                guide to professional help
              </li>
              <li>
                <strong>ALGEE:</strong> Approach, Listen, Give reassurance,
                Encourage professional help, Encourage other supports
              </li>
              <li>
                <strong>Not a therapist:</strong> Do not diagnose, treat, or
                counsel
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
            <p className="text-purple-400/90 text-base font-medium mb-2">
              Key Boundaries
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Confidential:</strong> Only break when there is
                immediate risk of serious harm
              </li>
              <li>
                <strong>Voluntary:</strong> No specific UK legislation governs
                the MHFA role
              </li>
              <li>
                <strong>Refer:</strong> GP, EAP, Samaritans (116 123), crisis
                services
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
              "Define the role of a Mental Health First Aider according to MHFA England",
              "Explain each step of the ALGEE action plan with practical examples",
              "Identify the boundaries of the MHFA role and distinguish it from professional mental health support",
              "Describe when confidentiality can and cannot be broken",
              "Differentiate between an employer's duty of care and the MHFA's duty to refer",
              "Outline the legal position of Mental Health First Aiders in the UK, including the SARAH Act 2015",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-purple-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is a Mental Health First Aider? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">01</span>
            What is a Mental Health First Aider?
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A Mental Health First Aider (MHFA) is someone who has completed
                a training course approved by{" "}
                <strong>MHFA England</strong> &mdash; the national authority for
                Mental Health First Aid in England. The concept originated in
                Australia in 2000, created by Betty Kitchener and Professor Tony
                Jorm, and was introduced to England in 2007.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">MHFA England Definition:</strong>{" "}
                  A Mental Health First Aider is trained to{" "}
                  <strong>spot the early signs and symptoms</strong> of mental
                  ill health, <strong>provide initial support</strong> through
                  non-judgemental listening and reassurance, and{" "}
                  <strong>guide the person towards appropriate professional help</strong>.
                </p>
              </div>

              <p>
                The role is analogous to a physical first aider. Just as a
                workplace first aider is not a doctor or paramedic, a Mental
                Health First Aider is{" "}
                <strong>not a therapist, counsellor, psychologist, or psychiatrist</strong>.
                They provide the crucial first response &mdash; a bridge between
                noticing that someone is struggling and connecting them with the
                professional support they need.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Three Core Functions of an MHFA
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-purple-400">
                      1
                    </span>
                    <span>
                      <strong className="text-white">Spot the signs</strong>{" "}
                      &mdash; Recognise changes in behaviour, mood, or
                      performance that may indicate mental ill health. This
                      includes withdrawal from social interaction, changes in
                      appearance, increased absence, irritability, or
                      uncharacteristic behaviour.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-purple-400">
                      2
                    </span>
                    <span>
                      <strong className="text-white">Provide initial support</strong>{" "}
                      &mdash; Have a supportive, non-judgemental conversation.
                      Offer reassurance, reduce stigma, and let the person know
                      they are not alone. Provide practical information about
                      mental health and available support.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center flex-shrink-0 text-xs font-bold text-purple-400">
                      3
                    </span>
                    <span>
                      <strong className="text-white">Guide towards help</strong>{" "}
                      &mdash; Encourage the person to seek professional support.
                      Signpost to their GP, Employee Assistance Programme (EAP),
                      Samaritans, Mind, or other relevant services. Support them
                      in taking that first step.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    In the Construction &amp; Electrical Trades
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  The construction industry has one of the highest suicide rates
                  of any sector in the UK. According to the Office for National
                  Statistics, male construction workers are{" "}
                  <strong className="text-white">
                    three times more likely to die by suicide
                  </strong>{" "}
                  than the male national average. Electricians and other trades
                  workers often face long hours, job insecurity, physically
                  demanding work, time away from family, and a culture where
                  discussing mental health is still stigmatised. Having trained
                  MHFAs on site can genuinely save lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The ALGEE Action Plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">02</span>
            The ALGEE Action Plan
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>ALGEE action plan</strong> is the core framework
                taught on the MHFA England course. It provides a structured,
                step-by-step approach for responding when you believe someone
                may be experiencing a mental health issue or crisis. The acronym
                stands for:
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">Key Principle:</strong>{" "}
                  ALGEE is not a rigid sequence that must always be followed in
                  strict order. In a crisis (e.g. active suicidal intent), you
                  may need to start with &lsquo;A&rsquo; and stay there. In a
                  non-crisis situation, you might move through all five steps
                  across several conversations. Use your judgement and adapt to
                  the situation.
                </p>
              </div>

              {/* ALGEE Flowchart Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  The ALGEE Action Plan
                </p>
                <div className="flex flex-col items-center gap-0">
                  {/* A - Approach */}
                  <div className="w-full max-w-sm bg-gradient-to-r from-purple-500/20 to-purple-400/20 border border-purple-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-purple-400">A</p>
                    <p className="text-sm font-semibold text-white">
                      Approach, Assess &amp; Assist
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Approach the person. Assess for risk of suicide or harm.
                      Assist with any immediate crisis before moving on.
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3 bg-white/30" />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/30" />
                  </div>

                  {/* L - Listen */}
                  <div className="w-full max-w-sm bg-gradient-to-r from-violet-500/20 to-violet-400/20 border border-violet-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-violet-400">L</p>
                    <p className="text-sm font-semibold text-white">
                      Listen Non-judgementally
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Give the person your full attention. Use active listening.
                      Do not criticise, dismiss, or give unsolicited advice.
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3 bg-white/30" />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/30" />
                  </div>

                  {/* G - Give */}
                  <div className="w-full max-w-sm bg-gradient-to-r from-purple-500/20 to-purple-400/20 border border-purple-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-purple-400">G</p>
                    <p className="text-sm font-semibold text-white">
                      Give Reassurance &amp; Information
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Validate their feelings. Provide information about mental
                      health. Challenge stigma. Let them know help is available.
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3 bg-white/30" />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/30" />
                  </div>

                  {/* E - Encourage professional help */}
                  <div className="w-full max-w-sm bg-gradient-to-r from-violet-500/20 to-violet-400/20 border border-violet-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-violet-400">E</p>
                    <p className="text-sm font-semibold text-white">
                      Encourage Professional Help
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Signpost to GP, EAP, counselling, or specialist services.
                      Offer to help make the first appointment. Present options.
                    </p>
                  </div>
                  <div className="flex flex-col items-center py-1">
                    <div className="w-0.5 h-3 bg-white/30" />
                    <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/30" />
                  </div>

                  {/* E - Encourage other supports */}
                  <div className="w-full max-w-sm bg-gradient-to-r from-purple-500/20 to-purple-400/20 border border-purple-500/40 rounded-xl p-4 text-center">
                    <p className="text-lg font-bold text-purple-400">E</p>
                    <p className="text-sm font-semibold text-white">
                      Encourage Other Supports
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Self-help strategies, exercise, social connections, peer
                      support groups, family, friends, and community resources.
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed breakdown of each ALGEE step */}
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HandHeart className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      A &mdash; Approach, Assess &amp; Assist with Any Crisis
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The first step is to approach the person in a
                    non-threatening, caring way. Find a quiet, private space
                    where you will not be overheard. Then assess whether the
                    person may be at risk:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Are they having thoughts of suicide or self-harm?
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Are they experiencing a panic attack or acute distress?
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Are they at risk of harm from themselves or others?
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Have they experienced a traumatic event?
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-white/80 mt-2">
                    <strong className="text-white">Practical example:</strong>{" "}
                    &ldquo;I&rsquo;ve noticed you seem a bit different lately,
                    and I wanted to check in with you. Is there somewhere quiet
                    we can talk?&rdquo;
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      L &mdash; Listen Non-judgementally
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Non-judgemental listening is the single most important skill
                    for a Mental Health First Aider. It means giving the person
                    your full, undivided attention and creating a space where
                    they feel safe to share openly:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Use open body language &mdash; face them, maintain
                        appropriate eye contact, nod to show understanding
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Use minimal encouragers: &ldquo;I see&rdquo;,
                        &ldquo;Go on&rdquo;, &ldquo;Tell me more&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Do not</strong>
                        &nbsp;interrupt, give advice, share your own stories, or
                        say &ldquo;I know how you feel&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Reflect back what they have said to show you have heard
                        them: &ldquo;It sounds like you&rsquo;ve been feeling
                        overwhelmed for a while&rdquo;
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      G &mdash; Give Reassurance &amp; Information
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Many people experiencing mental health difficulties feel
                    ashamed, isolated, or believe they are the only one
                    struggling. Your role is to normalise their experience,
                    reduce stigma, and provide helpful information:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Validate their feelings: &ldquo;It takes courage to
                        talk about this, and I&rsquo;m glad you did&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Share factual information: &ldquo;1 in 4 people in the
                        UK will experience a mental health problem each
                        year&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Challenge myths: &ldquo;Mental health conditions are
                        treatable &mdash; recovery is possible with the right
                        support&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Do not</strong>
                        &nbsp;minimise: never say &ldquo;cheer up&rdquo;,
                        &ldquo;just think positive&rdquo;, or &ldquo;others
                        have it worse&rdquo;
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      E &mdash; Encourage Professional Help
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Encourage the person to seek appropriate professional
                    support. Present options rather than dictating a single
                    pathway:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">GP:</strong> The primary
                        point of contact for mental health support in the UK.
                        Can refer to talking therapies, prescribe medication, or
                        make specialist referrals.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">EAP:</strong> Many
                        employers provide a free, confidential Employee
                        Assistance Programme with counselling and support.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">NHS Talking Therapies:</strong>{" "}
                        Self-referral is available in England for anxiety and
                        depression via NHS Talking Therapies (formerly IAPT).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Crisis services:</strong>{" "}
                        Samaritans (116 123), Crisis Text Line (text SHOUT to
                        85258), or 999 if in immediate danger.
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-white/80 mt-2">
                    <strong className="text-white">Practical example:</strong>{" "}
                    &ldquo;Would it help if I sat with you while you called your
                    GP? Or I can give you the number for the EAP if
                    you&rsquo;d prefer to speak to someone confidentially.&rdquo;
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      E &mdash; Encourage Other Supports
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Recovery from mental ill health is supported by a broad
                    network of self-help strategies and social connections, not
                    just professional treatment:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Physical activity &mdash; even short walks can
                        significantly improve mood
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Maintaining social connections with friends, family, and
                        colleagues
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Peer support groups (Mind, SANE, Rethink Mental Illness)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Mindfulness and relaxation techniques
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Workplace adjustments &mdash; phased return, flexible
                        hours, reduced workload (with consent)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Construction-specific support: Mates in Mind, the
                        Lighthouse Club, Electrical Industries Charity
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Boundaries of the Role */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">03</span>
            Boundaries of the Role
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the boundaries of the MHFA role is essential. Well-intentioned
                but poorly boundaried support can cause harm &mdash; to the person you are
                supporting, and to yourself. The MHFA role is defined as much by what it
                is <strong>not</strong> as by what it is.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">
                    An MHFA IS...
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>A trained point of first contact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>A non-judgemental listener</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>A signpost to professional services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>An advocate for reducing stigma</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>A bridge to professional help</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">
                    An MHFA is NOT...
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>A therapist, counsellor, or psychiatrist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Qualified to diagnose mental health conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>A substitute for professional treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Someone who prescribes medication or therapy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>Expected to &ldquo;fix&rdquo; someone&rsquo;s problems</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Recognising Your Own Limitations:
                  </strong>{" "}
                  MHFAs must know when to step back. If you feel out of your
                  depth, if the person&rsquo;s needs exceed your training, or if
                  supporting them is affecting your own mental health, it is
                  appropriate &mdash; and responsible &mdash; to refer to a
                  professional and seek support for yourself. You cannot pour
                  from an empty cup.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Protecting Your Own Wellbeing
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Access regular supervision or debriefing with another
                      MHFA or a line manager
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Set clear time boundaries for conversations &mdash; you
                      are not available 24/7
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Use the EAP or Samaritans yourself if you need to
                      debrief after a difficult conversation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Recognise the signs of compassion fatigue and
                      vicarious trauma in yourself
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Remember: the outcome is not your responsibility
                      &mdash; you can only offer support, not force someone to
                      accept it
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Confidentiality */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">04</span>
            Confidentiality
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Confidentiality is the foundation of trust between a Mental
                Health First Aider and the person they are supporting. Without
                confidence that their disclosure will be treated with respect
                and privacy, people will not open up. Breaking confidentiality
                without justification can cause serious harm and destroy trust
                in the MHFA programme across the organisation.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    General Rule
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Everything a person shares with you in an MHFA conversation
                  is confidential. You must not share it with managers,
                  colleagues, HR, or anyone else without the person&rsquo;s{" "}
                  <strong className="text-white">explicit consent</strong>.
                  This applies even if you believe sharing would be helpful.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    When Confidentiality Can Be Broken
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  Confidentiality may be broken in a limited number of serious
                  circumstances. These are:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Immediate risk of suicide or self-harm:
                      </strong>{" "}
                      If you believe the person is at imminent risk of ending
                      their life or seriously injuring themselves
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Risk of harm to others:
                      </strong>{" "}
                      If the person discloses plans to harm another person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Safeguarding concerns:
                      </strong>{" "}
                      If the disclosure involves abuse, neglect, or exploitation
                      of children or vulnerable adults
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/60 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        Terrorism or serious crime:
                      </strong>{" "}
                      If the person discloses information relating to terrorism
                      or a serious criminal offence
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white/80 mt-2">
                  Even when breaking confidentiality, share only the minimum
                  information necessary, with the appropriate person (e.g. line
                  manager, safeguarding lead, or emergency services), and
                  wherever possible, inform the person that you need to share
                  this information and explain why.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">
                    Data Protection &amp; GDPR
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-2">
                  Mental health information is classified as{" "}
                  <strong className="text-white">special category data</strong>{" "}
                  under the UK General Data Protection Regulation (UK GDPR) and
                  the Data Protection Act 2018. This means:
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Only record what is strictly necessary &mdash; date, brief
                      summary of concern, and any actions agreed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Store any notes securely &mdash; locked cabinet or
                      encrypted digital storage, not loose paper on a desk
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Do not retain records longer than necessary &mdash; follow
                      your organisation&rsquo;s retention policy
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      Never share information by text message, WhatsApp, or
                      unsecured email
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>
                      If asked by a manager for details, explain that you can
                      only confirm that a conversation took place if the
                      individual consents
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Sharing with Managers (With Consent):
                  </strong>{" "}
                  If the person agrees, you can share a summary with their
                  manager to facilitate workplace adjustments (e.g. reduced
                  workload, flexible hours, time off for appointments). Always
                  get explicit verbal consent, ideally confirmed in writing. The
                  person chooses what is shared and what is not. They may want
                  their manager to know they are &ldquo;having a difficult
                  time&rdquo; without disclosing the details.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Duty of Care vs Duty to Refer */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">05</span>
            Duty of Care vs Duty to Refer
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is an important distinction between an employer&rsquo;s
                legal duty of care and the MHFA&rsquo;s moral and practical
                responsibility to refer someone to professional help. Understanding
                this distinction protects both you and the people you support.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Employer&rsquo;s Duty of Care
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    Under the{" "}
                    <strong className="text-white">
                      Health and Safety at Work etc. Act 1974 (HSWA)
                    </strong>
                    , employers have a general duty to ensure, so far as is
                    reasonably practicable, the health, safety, and welfare at
                    work of all employees. This explicitly includes mental
                    health. Key obligations include:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Conducting risk assessments that include psychosocial
                        hazards (stress, bullying, excessive workload)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Providing a safe working environment, both physically
                        and psychologically
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Making reasonable adjustments for employees with mental
                        health conditions (Equality Act 2010)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The{" "}
                        <strong className="text-white">
                          Management of Health and Safety at Work Regulations
                          1999
                        </strong>{" "}
                        require employers to assess all risks, including
                        work-related stress
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HandHeart className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      The MHFA&rsquo;s Responsibility to Refer
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The MHFA does not hold a formal legal duty of care as an
                    employer does. However, having accepted the role and
                    received training, there is a moral and practical
                    responsibility to act competently and within the boundaries
                    of your training. This means:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Recognising when a situation is beyond your training
                        and referring to professional help
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Not attempting to provide ongoing support in place of
                        a qualified professional
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Escalating to emergency services (999) if there is
                        immediate risk to life
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        Following your organisation&rsquo;s escalation
                        procedures and policies
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Referral Pathways
                  </p>
                  <p className="text-sm text-white/80 mb-2">
                    Knowing where to refer is as important as knowing when. Key
                    referral pathways in the UK include:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">GP:</strong> Primary
                        referral point &mdash; can assess, prescribe, refer to
                        talking therapies or specialist secondary care
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">EAP:</strong> Employer
                        -funded, confidential, often available 24/7, typically
                        offers 6&ndash;8 counselling sessions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          NHS Talking Therapies:
                        </strong>{" "}
                        Self-referral for anxiety and depression without needing
                        a GP appointment
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Crisis services:
                        </strong>{" "}
                        999, Samaritans (116 123), Crisis Text Line (text SHOUT
                        to 85258), local crisis teams
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Industry-specific:
                        </strong>{" "}
                        Mates in Mind, Lighthouse Club (construction helpline:
                        0345 605 1956), Electrical Industries Charity
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Documentation
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    Keep a brief, factual record of each MHFA interaction:
                    the date and time, the nature of the concern (in general
                    terms), any actions agreed, and whether a referral was made.
                    This protects both you and the individual, provides an audit
                    trail, and can help demonstrate that the organisation is
                    meeting its duty of care. Store records securely in
                    accordance with your organisation&rsquo;s data protection
                    policy. Never include unnecessary personal details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Legal Position */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-purple-400/80 text-sm font-normal">06</span>
            Legal Position
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A common concern for those considering the MHFA role is legal
                liability: &ldquo;What if I say the wrong thing? Could I be
                sued?&rdquo; Understanding the legal position provides
                reassurance and clarity.
              </p>

              <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-purple-400">
                    Key Point:
                  </strong>{" "}
                  There is no specific UK legislation that governs, regulates,
                  or mandates the Mental Health First Aider role. It is an
                  entirely <strong>voluntary</strong> role. You are not a
                  registered professional, and you are not held to the same
                  standards as a psychiatrist, psychologist, or counsellor. The
                  legal framework relies on general principles of negligence
                  law and specific protective legislation.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Good Samaritan Principles
                    </p>
                  </div>
                  <p className="text-sm text-white/80">
                    UK law has long recognised that people who act in good
                    faith to help others should not be unfairly penalised. While
                    the UK does not have a specific &ldquo;Good Samaritan
                    law&rdquo; as some other countries do, the courts have
                    consistently held that a person who voluntarily offers
                    assistance in an emergency, without being reckless or
                    grossly negligent, is unlikely to face legal liability.
                    The standard applied is whether the person acted as a{" "}
                    <strong className="text-white">
                      reasonable person
                    </strong>{" "}
                    would in the same circumstances.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-5 w-5 text-violet-400" />
                    <p className="text-sm font-medium text-violet-400">
                      Social Action, Responsibility and Heroism Act 2015
                      (SARAH Act)
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The{" "}
                    <strong className="text-white">
                      Social Action, Responsibility and Heroism Act 2015
                    </strong>{" "}
                    (commonly known as the SARAH Act) was introduced
                    specifically to protect volunteers and those who act to
                    help others. When determining a negligence claim, the court
                    must consider whether:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The person was acting{" "}
                        <strong className="text-white">
                          for the benefit of society
                        </strong>{" "}
                        or any of its members
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The person demonstrated a{" "}
                        <strong className="text-white">
                          predominantly responsible approach
                        </strong>{" "}
                        towards protecting the safety of others
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        The person was acting{" "}
                        <strong className="text-white">heroically</strong> by
                        intervening in an emergency
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-white/80 mt-2">
                    The SARAH Act does <strong className="text-white">not</strong>{" "}
                    grant immunity from prosecution. It does, however, require
                    courts to weigh these factors in favour of the person who
                    acted. For MHFAs acting within their training and in good
                    faith, this provides significant protection.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-medium text-purple-400">
                      Employer Liability
                    </p>
                  </div>
                  <p className="text-sm text-white/80 mb-2">
                    The primary duty of care rests with the{" "}
                    <strong className="text-white">employer</strong>, not the
                    individual MHFA. Key considerations for employers include:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Vicarious liability:
                        </strong>{" "}
                        An employer can be held vicariously liable for the
                        actions of employees carried out during the course of
                        their employment &mdash; this includes the MHFA role
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Adequate training:
                        </strong>{" "}
                        Employers must ensure MHFAs receive proper, accredited
                        training (MHFA England two-day course) and regular
                        refresher training
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Support and supervision:
                        </strong>{" "}
                        Employers should provide ongoing supervision, peer
                        support, and access to debriefing for MHFAs
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">
                          Clear policies:
                        </strong>{" "}
                        The organisation should have a clear mental health
                        policy, escalation procedures, and defined scope for the
                        MHFA role
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>
                        <strong className="text-white">Insurance:</strong>{" "}
                        Employers should ensure their liability insurance covers
                        the activities of MHFAs
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <p className="text-sm text-white">
                    <strong className="text-purple-400">
                      In Summary:
                    </strong>{" "}
                    As a Mental Health First Aider, the risk of personal legal
                    liability is extremely low, provided you act within the
                    boundaries of your training, in good faith, and do not
                    attempt to diagnose, treat, or provide therapy. The SARAH
                    Act 2015 provides additional reassurance. Your employer
                    holds the primary duty of care and should provide the
                    training, support, and policies needed for you to perform
                    the role safely.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

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
              Back to Module 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-purple-500 text-white hover:bg-purple-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../mental-health-module-1-section-3">
              Next: Recognising Mental Health Conditions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
